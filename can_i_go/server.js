require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const generateFakeData = require('./app/scripts/generateFakeData');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
    generateFakeData();
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Can I Go ? A REST API in nodeJS.' });
});

require('./app/routes/place.routes')(app);
require('./app/routes/pass.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/access.routes')(app);

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
