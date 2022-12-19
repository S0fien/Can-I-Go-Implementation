const db = require('../models');

const User = db.users;

const checkDuplicateAccount = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) res.status(400).send({ message: 'Failed! Email is already in use!' });
  } catch (err) {
    res.status(500).send({ message: err });
  }

  next();
};

module.exports = checkDuplicateAccount;
