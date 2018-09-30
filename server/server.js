const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const fetch = require('node-fetch');
const NUMBEO_API_KEY = require('./helpers/api_keys/numbeo_api_key.js');
const GEOCODE_API_KEY = require('./helpers/api_keys/geocoding_api_key.js');
const publicPath = path.join(__dirname, '../client/public');
const createRouter = require('./helpers/create_router.js');

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/numbeo', (req, res) => {
  const countryName =  req.query.countryName;
  const url = `https://www.numbeo.com/api/country_indices?api_key=${NUMBEO_API_KEY}&country=${countryName}`;
  fetch(url)
   .then(jsonData => jsonData.json())
   .then(data => res.json(data));
});

app.get('/geolocation', (req, res) => {
  const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${GEOCODE_API_KEY}&location=${preparedCountryName}`;
  fetch(url)
   .then(jsonData => jsonData.json())
   .then(data => res.json(data));
});

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('countries');
    const countryListCollection = db.collection('country_list');
    const countriesRouter = createRouter(countryListCollection);
    app.use('/api/countries', countriesRouter);

  })
  .catch(console.error);


app.listen(3000, function () {
  console.log(`App running on port ${ this.address().port }`);
});
