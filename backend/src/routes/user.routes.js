const router = require('express-promise-router')();
const userController = require('../controllers/user.controller');
const env = require('../middlewares/env.middleware');
const auth = require('../middlewares/auth.middleware');

router.post('/users', env, userController.createUser);
router.get('/users', env, auth, userController.fetchAllUsers);
router.delete('/users/:id', env, auth, userController.deleteUser);
router.put('/users/:id', env, auth, userController.editUser);
router.get('/users/:id', env, auth, userController.fetchUserById);

module.exports = router;