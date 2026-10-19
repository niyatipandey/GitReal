const express = require('express');
const axios = require('axios');
const router = express.Router();
const languageAnalyse = require('../services/analytics/languageAnalysis')
const {getLanguageFromFile,getLanguagesFromFiles} = require('../services/analytics/fileLanguage');
const languageRecency = require('../services/analytics/languageRecency');
const decodePackageJson = require('../services/analytics/packageAnalysis');
const detectTechnologies = require('../services/analytics/technologyDetection');
const detectSourceTechnologies = require('../services/analytics/sourceAnalysis');

router.get('/github', (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user,public_repo`;
  res.redirect(githubAuthUrl);
});

router.get('/github/callback', async (req, res) => {
  const { code } = req.query;

  const response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  }, {
    headers: { Accept: 'application/json' }
  });

  const accessToken = response.data.access_token;
  res.json({ accessToken });
});

router.get('/github/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  res.json(response.data);
});

router.get('/github/repos', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const response = await axios.get('https://api.github.com/user/repos', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      per_page: 100,
      sort: 'updated',
      type: 'public'
    }
  });

  const repos = response.data.map((repo)=>{
    return {
      name: repo.name,
      language: repo.language,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
      description: repo.description,
      fork: repo.fork
    }
  })

  const languageCount = languageAnalyse(repos);
  res.json({repos,languageCount});
});

router.get('/github/repo/tree', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const {owner, repo} = req.query;

  if(!owner || !repo){
    return res.status(400).json({ error: 'owner and repo are required' });
  }

  const treeResponse = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const packageFile = treeResponse.data.tree.filter(
    file => file.path === 'package.json' || file.path.endsWith('/package.json')
  );

  if (!packageFile) {
    return res.json({
      message: 'No package.json found'
    });
  }

  const allTechnologies = await Promise.all(
    packageFile.map(async (file)=>{
      const blobResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/git/blobs/${file.sha}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const packageJson = decodePackageJson(blobResponse.data.content);

    const technologies = detectTechnologies(packageJson);
    return technologies;
    
    })
  )

  const technologies = [...new Set(allTechnologies.flat())];
  res.json({ technologies });
});


router.get('/github/analyze', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const response = await axios.get('https://api.github.com/user/repos', {
      headers: { Authorization: `Bearer ${token}` },
      params: { per_page: 10, sort: 'updated', type: 'owner' }
    });

    const repos = response.data;

    const repoResults = await Promise.all(
      repos.map(async (repo) => {
        try {
          const treeResponse = await axios.get(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/trees/${repo.default_branch}?recursive=1`,
            { headers: { Authorization: `Bearer ${token}` } }
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


          if (packageFiles.length === 0) {
            return { repoName: repo.name, technologies: [] };
          }

        const allTechnologies = await Promise.all(
          packageFiles.map(async (file) => {
            const blobResponse = await axios.get(
              `https://api.github.com/repos/${repo.owner.login}/${repo.name}/git/blobs/${file.sha}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            const packageJson = decodePackageJson(blobResponse.data.content);
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

        return { repoName: repo.name, technologies };


        } catch (error) {
          console.error(`Failed on repo: ${repo.name}`, error.response?.data?.message);
          return { repoName: repo.name, technologies: [] };
        }
      })
    );

    
    const combinedTech = {};

    repoResults.forEach(({ repoName, technologies }) => {
      technologies.forEach(({ name, evidence }) => {
        if (!combinedTech[name]) {
          combinedTech[name] = { repositories: [] };
        }

        let repository = combinedTech[name].repositories.find(
          (item) => item.name === repoName
        );

        if (!repository) {
          repository = { name: repoName, evidence: [] };
          combinedTech[name].repositories.push(repository);
        }

        repository.evidence.push(evidence);
      });
    });


    return res.json({
      repositoriesAnalyzed: repos.length,
      technologyEvidence: combinedTech
    });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to analyze repositories' });
  }
});


module.exports = router;