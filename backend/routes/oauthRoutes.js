const express = require('express');
const router = express.Router();
const passport = require('../services/oauthService');

// Get frontend URL from environment variable
const FRONTEND_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const token = req.user.token;
    const user = encodeURIComponent(JSON.stringify({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    }));
    res.redirect(`${FRONTEND_URL}/oauth-callback?token=${token}&user=${user}`);
  }
);

// GitHub OAuth routes
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const token = req.user.token;
    const user = encodeURIComponent(JSON.stringify({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    }));
    res.redirect(`${FRONTEND_URL}/oauth-callback?token=${token}&user=${user}`);
  }
);

module.exports = router;
