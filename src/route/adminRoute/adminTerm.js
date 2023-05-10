const express = require('express');
const router = express.Router();
const termController = require('../../app/Controllers/TermController');

router.get('/:slug/create', termController.create);
router.post('/:slug/store', termController.store);

router.get('/:id/edit', termController.edit);
router.patch('/:id', termController.update);
router.delete('/:id', termController.destroy);
router.patch('/:id/restore', termController.restore);
router.delete('/:id/force', termController.forceDelete);


router.get('/stored/:id', termController.storedTerm);
router.get('/strash/:id', termController.strashTerm);


module.exports = router;