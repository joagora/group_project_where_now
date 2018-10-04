const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.load();
const numbeoKey = process.env.NUMBEO_API_KEY;
console.log(numbeoKey);
// const GEOCODE_API_KEY = require('./helpers/api_keys/geocoding_api_key.js');
const publicPath = path.join(__dirname, '../client/public');
const createRouter = require('./helpers/create_router.js');

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/numbeo', (req, res) => {

  const countryName =  req.query.countryName;
  const url = `https://www.numbeo.com/api/country_indices?api_key=${numbeoKey}&country=${countryName}`;
  fetch(url)
   .then(jsonData => jsonData.json())
   .then(data => res.json(data));
});

app.listen(3000, function () {
  console.log(`App running on port ${ this.address().port }`);
});
