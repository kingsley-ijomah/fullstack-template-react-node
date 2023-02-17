const dotenv = require('dotenv');
dotenv.config();

const addEnvironemt = (req, res, next) => {
  try {
    // if process.env.NODE_ENV is not set, throw error
    if (!process.env.NODE_ENV) {
      throw new Error('Oops! NODE_ENV is not set! contact your administrator.');
    }

    // check if req.header('X-Environment') is set or empty
    if (!req.header('X-Environment') || req.header('X-Environment') === '') {
      // if not set, set it to process.env.NODE_ENV
      req.header('X-Environment', process.env.NODE_ENV);
    }

    // set req.environment to req.header('X-Environment')
    req.environment = req.header('X-Environment');

    // continue to next middleware
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

module.exports = addEnvironemt;
