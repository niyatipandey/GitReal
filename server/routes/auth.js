const express = require('express');
const axios = require('axios');
const router = express.Router();
const languageAnalyse = require('../services/analytics/languageAnalysis')

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

router.get('/github/repos/:owner/:repo/commits/:sha', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const { owner, repo , sha } = req.params;

  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        per_page: 10
      }
    }
  );

  res.json(response.data);
});



module.exports = router;