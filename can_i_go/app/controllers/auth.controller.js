const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const db = require('../models');

const { users: Users } = db;

exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({
      email: req.body.email,
    });

    if (user) {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );
      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          message: 'Invalid password.',
        });
      } else {
        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 172800,
        });
        res.status(200).send({
          id: user._id,
          email: user.email,
          accessToken: token,
        });
      }
    } else {
      res.status(404).send({ message: 'User cannot be found.' });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
