const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { uploadFiles } = require('../controllers/uploadController');

// POST /api/upload - Handle file upload
router.post(
  '/upload',
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'jd', maxCount: 1 }
  ]),
  uploadFiles
);

module.exports = router;
