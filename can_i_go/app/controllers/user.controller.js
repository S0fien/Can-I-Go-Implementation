const bcrypt = require('bcryptjs');
const db = require('../models');

const User = db.users;

exports.create = async (req, res) => {
  const {
    firstName,
    lastName,
    password,
    email,
    age,
    phone,
    address,
    passes,
  } = req.body;

  const user = new User({
    firstName,
    lastName,
    password: bcrypt.hashSync(password, 8),
    email,
    age,
    phone,
    address,
    passes,
  });

  try {
    const data = await user.save(user);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message:
          err.message || 'Error while creating the User.',
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while retrieving list of Users.',
    });
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await User.findById(id).populate('passes');
    if (!data) {
      res.status(404).send({
        message: `User with id ${id} cannot be found.`,
      });
    } else res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error while retrieving User with id ${id}`,
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data to update cannot be empty!',
    });
  }

  const { id } = req.params;

  try {
    const data = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    if (!data) {
      res.status(404).send({
        message: `User with id ${id} cannot be found.`,
      });
    } else res.status(200).send({ message: 'User was updated successfully.' });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating User with id ${id}`,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await User.findByIdAndRemove(id, { useFindAndModify: false });
    if (!data) {
      res.status(404).send({
        message: `User with id ${id} cannot be found.`,
      });
    } else {
      res.status(204).send({
        message: 'User was deleted successfully.',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error deleting User with id ${id}`,
    });
  }
};
