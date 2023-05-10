const express = require('express');
const router = express.Router();
const registerController = require('../../app/Controllers/registerController')
const loginController = require('../../app/Controllers/loginController')
const authMiddleware =  require('../../app/Controllers/auth.middleware');

router.get('/register',authMiddleware.isAuth, registerController.show)
router.post('/create',registerController.create)
router.get('/login',authMiddleware.isAuth,loginController.show)
router.post('/check',loginController.check)

router.get('/logout',authMiddleware.loggedin,loginController.logout)




module.exports = router;