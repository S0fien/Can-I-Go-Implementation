/* eslint-disable no-console */
const Users = require('../constants/users');
const Places = require('../constants/places');
const Passes = require('../constants/passes');

const db = require('../models');

const { users: User, places: Place, passes: Pass } = db;

const generateFakeData = async () => {
  console.log('Generating fake data...');

  await Place.deleteMany({});
  const placesPromises = Places.map((place) => {
    const data = new Place(place);
    return data.save(data);
  });
  await Promise.all(placesPromises);

  await User.deleteMany({});
  const usersPromises = Users.map((user) => {
    const data = new User(user);
    return data.save(data);
  });
  const usersResult = await Promise.all(usersPromises);

  await Pass.deleteMany({});
  const passesPromises = Passes.map((pass, index) => {
    const data = new Pass(pass);
    data.owner = usersResult[index]._id;
    return data.save(data);
  });
  const passesResult = await Promise.all(passesPromises);

  const updateUsersPromises = usersResult.map((user, index) => {
    user.passes.push(passesResult[index]);
    return user.save();
  });
  await Promise.all(updateUsersPromises);

  console.log('Fake data generated.');
};

module.exports = generateFakeData;
