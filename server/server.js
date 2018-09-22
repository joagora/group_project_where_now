const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const publicPath = path.join(__dirname, '../client/public');
const createRouter = require('./helpers/create_router.js');
app.use(express.static(publicPath));
app.use(bodyParser.json());

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
