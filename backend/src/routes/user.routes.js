const router = require('express-promise-router')();
const userController = require('../controllers/user.controller');

router.post('/users', userController.createUser);
router.get('/users', userController.fetchAllUsers);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;