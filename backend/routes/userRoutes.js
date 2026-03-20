const express = require('express');
const router = express.Router();

// Mock user data for now
let mockUser = {
  name: "Synthetix Unit 01",
  email: "core@neural.ai",
  role: "Neural Architect",
  avatar: "/user_portrait_ai_1773946741731.png",
  stats: {
    nodesCompleted: 12,
    synthesisRate: "94%",
    activePaths: 3
  },
  settings: {
    notifications: true,
    darkMode: true,
    privacyLevel: "High"
  }
};

// Get User Profile
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    data: mockUser
  });
});

// Update User Profile
router.put('/profile', (req, res) => {
  mockUser = { ...mockUser, ...req.body };
  res.json({
    success: true,
    message: "Profile updated successfully",
    data: mockUser
  });
});

// Get User Settings
router.get('/settings', (req, res) => {
  res.json({
    success: true,
    data: mockUser.settings
  });
});

// Update User Settings
router.put('/settings', (req, res) => {
  mockUser.settings = { ...mockUser.settings, ...req.body };
  res.json({
    success: true,
    message: "Settings updated successfully",
    data: mockUser.settings
  });
});

module.exports = router;
