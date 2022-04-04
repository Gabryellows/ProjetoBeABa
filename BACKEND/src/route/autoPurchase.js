const express = require('express');
const upload = require('../app/middleware/UploadMiddleware');

const router = express.Router();

router.post('/', upload.single('csvFile'));

module.exports = router;
