const router = require('express').Router();
const controller = require('../controllers/access.controller');
const { authJwt } = require('../middlewares');

module.exports = (app) => {
  router.get('/', [authJwt.verifyToken], controller.isAuthorized);

  app.use('/api/access', router);
};
