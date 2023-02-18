const router = require('express-promise-router')();
const cypressController = require('../controllers/cypress.controller');
const env = require('../middlewares/env.middleware');

router.get('/reset-test-db', env, cypressController.resets);

module.exports = router;