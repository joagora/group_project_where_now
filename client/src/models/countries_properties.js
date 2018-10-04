const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const CountriesProperties = function() {
  this.countriesList = null;
  this.countriesDetailsArray = [];
}

CountriesProperties.prototype.bindEvents = function() {
  PubSub.subscribe('Countries:countries-list-ready', (event) => {
    this.getData(event.detail);
  });
}

CountriesProperties.prototype.getData = function(countries) {
  this.countriesList = countries;
  const countryProperties = countries.forEach((country) => {
    const countryName = country.name;
    // const url = `http://localhost:3000/numbeo?countryName=${countryName}`;
    const url = `https://where-now-app.herokuapp.com/numbeo?countryName=${countryName}`;
    const request = new Request(url);
    request.get()
      .then((data) => {
        country['details'] = data;
        this.countriesDetailsArray.push(country);
        return this.countriesDetailsArray;
      })
      .then((data) => {
        PubSub.publish(`CountriesProperties:countries-properties-ready`, this.countriesDetailsArray);
      })

  })


}

module.exports = CountriesProperties;
