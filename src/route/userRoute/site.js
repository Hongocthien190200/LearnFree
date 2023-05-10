const express = require('express');
const router = express.Router();
const siteController = require('../../app/Controllers/siteController');
const registerController = require('../../app/Controllers/registerController')
const loginController = require('../../app/Controllers/loginController')
const authMiddleware =  require('../../app/Middleware/auth.middleware');

router.get('/', siteController.show);

router.get('/register',authMiddleware.isAuth, registerController.show)
router.post('/create',registerController.create)
router.get('/login',authMiddleware.isAuth,loginController.show)
router.post('/check',loginController.check)

router.get('/logout',authMiddleware.loggedin,loginController.logout)

module.exports = router;
