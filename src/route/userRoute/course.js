const express = require('express');
const router = express.Router();
const courseController = require('../../app/Controllers/CourseController');

router.get('/:slug', courseController.show);

module.exports = router;
