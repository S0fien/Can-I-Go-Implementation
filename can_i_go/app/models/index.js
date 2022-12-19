const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require('./user.model')(mongoose);
db.places = require('./place.model')(mongoose);
db.passes = require('./pass.model')(mongoose);

module.exports = db;
