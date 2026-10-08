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

router.get('/github/repos/:owner/:repo/commits', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const { owner, repo , sha } = req.params;

  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/commits`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        per_page: 10
      }
    }
  );

  const commits = response.data.map(commit =>({
    sha : commit.sha,
    date : commit.commit.author.date
  }))


  const files = response.data.files.map(file =>({
    filename : file.filename,
    language: getLanguageFromFile(file.filename)
  }));

  const languages = getLanguagesFromFiles(files);

  res.json({
    commits,
    sha,
    date: response.data.commit.author.date,
    languages,
    files
  });
});

router.get('/github/repo/tree', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const treeResponse = await axios.get(
    'https://api.github.com/repos/niyatipandey/Layrd/git/trees/main?recursive=1',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const relevantFiles = treeResponse.data.tree.filter(file => {
    if (file.type !== 'blob') return false;

    if (file.path.includes('node_modules/')) return false;

    return (
      file.path.endsWith('.js') ||
      file.path.endsWith('.jsx') ||
      file.path.endsWith('.ts') ||
      file.path.endsWith('.tsx')
    );
  });

  const packageFile = treeResponse.data.tree.find(
    file => file.path === 'client/package.json'
  );

  if (!packageFile) {
    return res.json({
      message: 'No package.json found'
    });
  }

  const blobResponse = await axios.get(
    `https://api.github.com/repos/niyatipandey/Layrd/git/blobs/${packageFile.sha}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const packageJson = decodePackageJson(blobResponse.data.content);

  const technologies = detectTechnologies(packageJson);

  const files = await Promise.all(
  relevantFiles.map(async (file) => {
    const blobResponse = await axios.get(
      `https://api.github.com/repos/niyatipandey/Layrd/git/blobs/${file.sha}`,
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
  })
);

res.json({ files });
});

router.get('/github/repo/file', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const response = await axios.get(
    'https://api.github.com/repos/niyatipandey/Layrd/git/blobs/e1a6f554b865747da5407e7d686d753de25e687a',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const content = Buffer.from(
    response.data.content,
    'base64'
  ).toString('utf-8');

  const technologies = detectSourceTechnologies(content);

  res.json({
    filename: 'client/src/App.jsx',
    technologies
  });
});



module.exports = router;