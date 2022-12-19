const router = require('express').Router();
const controller = require('../controllers/user.controller');
const { authJwt, checkDuplicateAccount } = require('../middlewares');

module.exports = (app) => {
  router.post(
    '/',
    [
      authJwt.verifyToken,
      checkDuplicateAccount.checkDuplicateAccount,
    ],
    controller.create,
  );
  router.get('/', [authJwt.verifyToken], controller.findAll);
  router.get('/:id', [authJwt.verifyToken], controller.findOne);
  router.put('/:id', [authJwt.verifyToken], controller.update);
  router.delete('/:id', [authJwt.verifyToken], controller.delete);

  app.use('/api/users', router);
};
