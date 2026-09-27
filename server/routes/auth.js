const express = require('express');
const axios = require('axios');
const router = express.Router();

// Step 1 — Send user to GitHub
router.get('/github', (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user,public_repo`;
  res.redirect(githubAuthUrl);
});

// Step 3 — GitHub sends user back with a code, we exchange it for a token
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

// Step 4 — Fetch GitHub user profile
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

module.exports = router;