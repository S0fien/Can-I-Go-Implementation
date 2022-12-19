const router = require('express').Router();
const controller = require('../controllers/auth.controller');

module.exports = (app) => {
  router.post('/login', controller.login);

  app.use('/api/auth', router);
};
