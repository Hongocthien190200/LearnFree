const express = require('express');
const router = express.Router();
const roadController = require('../../app/Controllers/roadController');
// router.get('/roadmap/front-end',frontend)
router.get('/back-end',roadController.backend);
router.get('/front-end',roadController.frontend);
router.get('/', roadController.show);

module.exports = router;
