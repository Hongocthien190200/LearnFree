const express = require('express');
const router = express.Router();
const courseController = require('../../app/Controllers/CourseController');
const adminCourseController = require('../../app/Controllers/AdminCourseController');

router.get('/stored', adminCourseController.storedCourses);
router.get('/trash', adminCourseController.strashCourses);

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.patch('/:id', courseController.update);
router.delete('/:id', courseController.destroy);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/force', courseController.forceDelete);



module.exports = router;