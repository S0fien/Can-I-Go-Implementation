const db = require('../models');

const { users: Users, places: Places } = db;

exports.isAuthorized = async (req, res) => {
  const { userId, placeId } = req.body;

  try {
    const user = await Users.findById(userId).populate('passes');
    const place = await Places.findById(placeId);

    const ageCheck = place.ageRating > user.age;

    const acceptedPasses = user.passes.filter((pass) => pass.level > place.minimumSecurityLevel);
    const passCheck = (acceptedPasses.length === 0) && place.minimumSecurityLevel < 0;
    const response = ageCheck || passCheck;

    res.status(200).send(!response);
  } catch (err) {
    res.status(500).send(err.message || 'Error while checking authorization of User.');
  }
};
