const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
//__dirname = current folder
const publicPath = path.join(__dirname, '../client/public');
const createRouter = require('./helpers/create_router.js');
//tell express where path is.
app.use(express.static(publicPath));
//for POST Creates
app.use(bodyParser.json());

const countries = [
    {name: "Afghanistan"},
    {name: "Aland Islands"}
    ];

const countriesRouter = createRouter(countries);
app.use('/api/countries', countriesRouter);

app.listen(3000, function () {
  console.log(`App running on port ${ this.address().port }`);
});
