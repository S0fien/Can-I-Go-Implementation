const db = require('../models');

const Place = db.places;

exports.create = async (req, res) => {
  const {
    address, name, phone, minimumSecurityLevel, ageRating,
  } = req.body;

  const place = new Place({
    address,
    name,
    phone,
    minimumSecurityLevel,
    ageRating,
  });

  try {
    const data = await place.save(place);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message:
          err.message || 'Error while creating the Place.',
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Place.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error while retrieving list of Places.',
    });
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Place.findById(id);
    if (!data) {
      res.status(404).send({
        message: `Place with id ${id} cannot be found.`,
      });
    } else res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error while retrieving Place with id ${id}`,
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
    const data = await Place.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    if (!data) {
      res.status(404).send({
        message: `Place with id ${id} cannot be found.`,
      });
    } else res.status(200).send({ message: 'Place was updated successfully.' });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating Place with id ${id}`,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Place.findByIdAndRemove(id, { useFindAndModify: false });
    if (!data) {
      res.status(404).send({
        message: `Place with id ${id} cannot be found.`,
      });
    } else {
      res.status(204).send({
        message: 'Place was deleted successfully.',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error deleting Place with id ${id}`,
    });
  }
};
