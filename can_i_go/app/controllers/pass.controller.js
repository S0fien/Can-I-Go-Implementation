const db = require('../models');

const { users: User, passes: Pass } = db;

exports.create = async (req, res) => {
  const { level, owner } = req.body;

  const pass = new Pass({
    level,
    owner,
  });

  try {
    const data = await pass.save(pass);
    const user = await User.findById(owner);
    user.passes.push(data);
    await user.save(user);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message:
          err.message || 'Error while creating the Pass.',
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Pass.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while retrieving list of Passes.',
    });
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Pass.findById(id).populate('owner');
    if (!data) {
      res.status(404).send({
        message: `Pass with id ${id} cannot be found.`,
      });
    } else res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error while retrieving Pass with id ${id}`,
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
    const data = await Pass.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    if (!data) {
      res.status(404).send({
        message: `Pass with id ${id} cannot be found.`,
      });
    } else res.status(204).send({ message: 'Pass was updated successfully.' });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating Pass with id ${id}`,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Pass.findByIdAndRemove(id, { useFindAndModify: false });
    if (!data) {
      res.status(404).send({
        message: `Pass with id ${id} cannot be found.`,
      });
    } else {
      res.status(204).send({
        message: 'Pass was deleted successfully.',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error deleting Pass with id ${id}`,
    });
  }
};
