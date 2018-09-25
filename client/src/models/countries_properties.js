const PubSub = require('../helpers/pub_sub.js');
const NUMBEO_API_KEY = require('../helpers/api_keys/numbeo_api_key.js');
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
    const url = `https://www.numbeo.com/api/country_indices?api_key=${NUMBEO_API_KEY}&country=${countryName}`;
    const request = new Request(url);
    request.get()
      .then((data) => {
        country['details'] = data;
        this.countriesDetailsArray.push(country);

      })

  })
  PubSub.publish(`CountriesProperties:countries-properties-ready`, this.countriesDetailsArray);

}

module.exports = CountriesProperties;
