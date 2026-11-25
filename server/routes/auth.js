const express = require('express');
const axios = require('axios');
const router = express.Router();
const languageAnalyse = require('../services/analytics/languageAnalysis')
const {getLanguageFromFile,getLanguagesFromFiles} = require('../services/analytics/fileLanguage');
const languageRecency = require('../services/analytics/languageRecency');
const decodePackageJson = require('../services/analytics/packageAnalysis');
const detectTechnologies = require('../services/analytics/technologyDetection');
const detectSourceTechnologies = require('../services/analytics/sourceAnalysis');
const {isEligibleSourceFile,getFilePriority} = require('../services/analytics/sourceFileSelection');
const findSkillsToInvestigate = require('../services/analytics/skillMatching');

router.get('/github', (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user,public_repo`;
  res.redirect(githubAuthUrl);
});

router.get('/github/callback', async (req, res) => {
  const { code } = req.query;
  try{

  const response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  }, {
    headers: { Accept: 'application/json' }
  });

  const accessToken = response.data.access_token;

    if (!accessToken) {
      return res.status(401).json({
        error: 'GitHub authentication failed'
      });
    }

    // Store the token in the user's server-side session
    req.session.githubAccessToken = accessToken;

    // Save the session before redirecting
    req.session.save((err) => {
      if (err) {
        console.error('Session save failed:', err);
        return res.status(500).json({
          error: 'Failed to save session'
        });
      }

      res.redirect('http://localhost:5173');
    });

  } catch (error) {
    console.error('GitHub OAuth error:', error.response?.data || error.message);

    res.status(500).json({
      error: 'GitHub authentication failed'
    });
  }
});

router.get('/github/user', async (req, res) => {
  const token = req.session.githubAccessToken;

  if (!token) {
    return res.status(401).json({
      error: 'GitHub not connected'
    });
  }

  try {
    const response = await axios.get(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error('GitHub user request failed:', error.message);

    res.status(500).json({
      error: 'Failed to fetch GitHub user'
    });
  }
});

router.get('/github/repos', async (req, res) => {
  const token = req.session.githubAccessToken;

  if (!token) {
    return res.status(401).json({
      error: 'GitHub not connected'
    });
  }

  try {
    const response = await axios.get(
      'https://api.github.com/user/repos',
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          per_page: 100,
          sort: 'updated',
          type: 'public'
        }
      }
    );

    const repos = response.data.map((repo) => ({
      name: repo.name,
      language: repo.language,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
      description: repo.description,
      fork: repo.fork
    }));

    const languageCount = languageAnalyse(repos);

    res.json({ repos, languageCount });

  } catch (error) {
    console.error('GitHub repositories request failed:', error.message);

    res.status(500).json({
      error: 'Failed to fetch GitHub repositories'
    });
  }
});

router.get('/github/repo/tree', async (req, res) => {
  const token = req.session.githubAccessToken;

  if (!token) {
    return res.status(401).json({
      error: 'GitHub not connected'
    });
  }

  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res.status(400).json({
      error: 'owner and repo are required'
    });
  }

  try {
    const treeResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const packageFile = treeResponse.data.tree.filter(
      file =>
        file.path === 'package.json' ||
        file.path.endsWith('/package.json')
    );

    if (packageFile.length === 0) {
      return res.json({
        message: 'No package.json found'
      });
    }

    const allTechnologies = await Promise.all(
      packageFile.map(async (file) => {
        const blobResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/git/blobs/${file.sha}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const packageJson = decodePackageJson(
          blobResponse.data.content
        );

        return detectTechnologies(packageJson,sourceFiles);
      })
    );

    const technologies = [...new Set(allTechnologies.flat())];

    return res.json({ technologies });

  } catch (error) {
    console.error(
      'Repository tree analysis failed:',
      error.response?.data || error.message
    );

    return res.status(error.response?.status || 500).json({
      error: 'Failed to analyze repository tree'
    });
  }
});

function allSkillsSourceVerified(resumeSkills, technologyEvidence) {
  const results = findSkillsToInvestigate(
    resumeSkills,
    technologyEvidence
  );

  return (
    results.length > 0 &&
    results.every(result => result.status === 'source_verified')
  );
}

router.post('/github/analyze', async (req, res) => {
  const token = req.session.githubAccessToken;
  const resumeSkills = req.body.resumeSkills;

  const hasResumeSkills =
    resumeSkills &&
    Object.values(resumeSkills).some(
      skills => Array.isArray(skills) && skills.length > 0
    );

  if (!hasResumeSkills) {
    return res.status(400).json({
      error: 'Resume skills are required for repository analysis.'
    });
  }

  if (!token) {
    return res.status(401).json({
      error: 'GitHub not connected'
    });
  }

  try {
    const response = await axios.get(
      'https://api.github.com/user/repos',
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          per_page: 10,
          sort: 'updated',
          type: 'owner'
        }
      }
    );

    const repos = response.data;

    const repoResults = [];
    const combinedTech = {};

    const BATCH_SIZE = 10;

    // Process repositories sequentially.
    for (const repo of repos) {

      // Check whether every resume skill is already source verified.
      if (allSkillsSourceVerified(resumeSkills, combinedTech)) {
        console.log(
          'All resume skills are already source verified. Stopping repository analysis.'
        );
        break;
      }

      try {
        const treeResponse = await axios.get(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/trees/${repo.default_branch}?recursive=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const excludedDirs = new Set([
          'node_modules',
          'dist',
          'build',
          'coverage',
          '.git',
          '.next',
          '.vite',
          '.turbo',
          '.cache',
          'vendor',
          'venv',
          '.venv',
          '__pycache__',
          'target',
          'out'
        ]);

        // Find package.json files.
        const packageFiles = treeResponse.data.tree.filter((file) => {
          const pathParts = file.path.split('/');

          const isExcluded = pathParts.some((part) =>
            excludedDirs.has(part)
          );

          const isPackageJson =
            file.path === 'package.json' ||
            file.path.endsWith('/package.json');

          return (
            isPackageJson &&
            !isExcluded &&
            file.type === 'blob'
          );
        });

        // Select eligible source files in priority order.
        const sourceFiles = treeResponse.data.tree
          .filter((file) =>
            file.type === 'blob' &&
            isEligibleSourceFile(file.path)
          )
          .sort(
            (a, b) =>
              getFilePriority(a.path) - getFilePriority(b.path)
          );

        console.log(
          `Total eligible source files in ${repo.name}:`,
          sourceFiles.length
        );

        // Collect dependency evidence.
        const allTechnologies = await Promise.all(
          packageFiles.map(async (file) => {
            const blobResponse = await axios.get(
              `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/blobs/${file.sha}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );

            const packageJson = decodePackageJson(
              blobResponse.data.content
            );

            const technologies = detectTechnologies(packageJson);

            return technologies.map((tech) => ({
              name: tech,
              evidence: {
                type: 'dependency',
                source: file.path,
                details: `${tech} is declared in ${file.path}`
              }
            }));
          })
        );

        const technologies = allTechnologies.flat();

        // Add dependency evidence to global technology evidence.
        technologies.forEach(({ name, evidence }) => {
          if (!combinedTech[name]) {
            combinedTech[name] = {
              repositories: []
            };
          }

          let repository = combinedTech[name].repositories.find(
            item =>
              item.name === repo.name &&
              item.owner === repo.owner.login
          );

          if (!repository) {
            repository = {
              name: repo.name,
              owner: repo.owner.login,
              evidence: []
            };

            combinedTech[name].repositories.push(repository);
          }

          repository.evidence.push(evidence);
        });

        let sourceTechnologies = [];
        let analyzedSourceFiles = [];

        // Process source files in batches of 10.
        for (
          let i = 0;
          i < sourceFiles.length;
          i += BATCH_SIZE
        ) {
          const batch = sourceFiles.slice(i, i + BATCH_SIZE);

          console.log(
            `Analyzing batch ${Math.floor(i / BATCH_SIZE) + 1} from ${repo.name}:`,
            batch.map(file => file.path)
          );

          // Fetch current batch.
          const sourceFilesWithContent = await Promise.all(
            batch.map(async (file) => {
              try {
                const blobResponse = await axios.get(
                  `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/blobs/${file.sha}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  }
                );

                const content = Buffer.from(
                  blobResponse.data.content,
                  'base64'
                ).toString('utf-8');

                return {
                  path: file.path,
                  content
                };

              } catch (error) {
                console.error(
                  `Failed to fetch ${file.path}:`,
                  error.message
                );

                return {
                  path: file.path,
                  content: null
                };
              }
            })
          );

          analyzedSourceFiles.push(...batch);

          // Detect technologies in current batch.
          const batchTechnologies = sourceFilesWithContent.flatMap(
            (file) => {
              if (!file.content) return [];

              const detectedTechnologies = detectSourceTechnologies(
                file.content,
                file.path
              );

              return detectedTechnologies.map((technology) => ({
                name: technology,
                evidence: {
                  type: 'source_code',
                  source: file.path,
                  details: `${technology} is referenced in ${file.path}`
                }
              }));
            }
          );

          // Preserve source evidence from previous batches.
          sourceTechnologies.push(...batchTechnologies);

          console.log(
            `Source technologies found in batch ${Math.floor(i / BATCH_SIZE) + 1}:`,
            batchTechnologies
          );

          // Add current batch evidence to global technology evidence.
          batchTechnologies.forEach(({ name, evidence }) => {
            if (!combinedTech[name]) {
              combinedTech[name] = {
                repositories: []
              };
            }

            let repository = combinedTech[name].repositories.find(
              item =>
                item.name === repo.name &&
                item.owner === repo.owner.login
            );

            if (!repository) {
              repository = {
                name: repo.name,
                owner: repo.owner.login,
                evidence: []
              };

              combinedTech[name].repositories.push(repository);
            }

            repository.evidence.push(evidence);
          });

          // Check all resume skills across all repositories.
          const currentMatches = findSkillsToInvestigate(
            resumeSkills,
            combinedTech
          );

          console.log(
            'Current skill statuses:',
            currentMatches.map(result => ({
              skill: result.skill,
              status: result.status
            }))
          );

          // Stop if every resume skill has source evidence.
          if (
            allSkillsSourceVerified(
              resumeSkills,
              combinedTech
            )
          ) {
            console.log(
              'All resume skills have source evidence across repositories. Stopping analysis.'
            );

            break;
          }

          console.log(
            `Some skills still need source evidence. Checking the next batch in ${repo.name}.`
          );
        }

        console.log(
          `Retrieved ${
            analyzedSourceFiles.filter(
              file => file.content !== null
            ).length
          } source files from ${repo.name}`
        );

        // Save the processed repository.
        repoResults.push({
          repoName: repo.name,
          owner: repo.owner.login,
          sourceFiles: analyzedSourceFiles,
          technologies,
          sourceTechnologies
        });

      } catch (error) {
        console.error(
          `Failed on repo: ${repo.name}`,
          error.response?.data?.message || error.message
        );

        repoResults.push({
          repoName: repo.name,
          owner: repo.owner.login,
          sourceFiles: [],
          technologies: [],
          sourceTechnologies: []
        });
      }
    }

    // Final skill matching across all processed repositories.
    const skillMatches = findSkillsToInvestigate(
      resumeSkills,
      combinedTech
    );

    return res.json({
      repositoriesAnalyzed: repoResults.length,
      repositories: repoResults,
      technologyEvidence: combinedTech,
      skillMatches
    });

  } catch (error) {
    console.error(
      'Repository analysis failed:',
      error.response?.data || error.message
    );

    return res.status(500).json({
      error: 'Failed to analyze repositories'
    });
  }
});

router.post('/github/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout failed:', err);

      return res.status(500).json({
        error: 'Failed to log out'
      });
    }

    res.clearCookie('connect.sid', {
      path: '/'
    });

    return res.json({
      message: 'Logged out successfully'
    });
  });
});
module.exports = router;
