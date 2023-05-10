const express = require('express');
const router = express.Router();
const lessonController = require('../../app/Controllers/LessonController');

router.get('/:slug/create', lessonController.create);
router.post('/:slug/store', lessonController.store);

router.get('/:id/edit', lessonController.edit);
router.patch('/:id', lessonController.update);
router.delete('/:id', lessonController.destroy);

router.patch('/:id/restore', lessonController.restore);
router.delete('/:id/force', lessonController.forceDelete);


router.get('/stored/:id', lessonController.storedLesson);
router.get('/strash/:id', lessonController.strashLesson);


module.exports = router;