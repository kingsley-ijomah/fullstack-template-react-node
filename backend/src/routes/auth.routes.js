const router = require('express-promise-router')();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.loginAuth);
router.post('/logout', authController.logoutAuth);
router.get('/active', authController.activeAuth);
router.post('/forgot-password', authController.forgotPasswordAuth);
router.post('/reset-password/:token', authController.resetPasswordAuth);

module.exports = router;