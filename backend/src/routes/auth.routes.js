const router = require('express-promise-router')();
const authController = require('../controllers/auth.controller');
const env = require('../middlewares/env.middleware');

router.post('/login', env, authController.loginAuth);
router.get('/active', env, authController.activeAuth);
router.post('/forgot-password', env, authController.forgotPasswordAuth);
router.post('/reset-password/:token', env, authController.resetPasswordAuth);

module.exports = router;