const router = require('express').Router();
const controller = require('../controllers/pass.controller');
const { authJwt } = require('../middlewares');

module.exports = (app) => {
  router.post('/', [authJwt.verifyToken], controller.create);
  router.get('/', [authJwt.verifyToken], controller.findAll);
  router.get('/:id', [authJwt.verifyToken], controller.findOne);
  router.put('/:id', [authJwt.verifyToken], controller.update);
  router.delete('/:id', [authJwt.verifyToken], controller.delete);

  app.use('/api/passes', router);
};
