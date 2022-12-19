const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyToken = (req, res, next) => {
  const token = req.headers['access-token'];

  if (!token) {
    res.status(403).send({ message: 'No token found.' });
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: 'Unauthorized.' });
      }
      req.userId = decoded.id;
    });
  }
  next();
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
