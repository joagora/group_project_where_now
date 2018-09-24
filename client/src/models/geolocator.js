const PubSub = require('../helpers/pub_sub.js');
const GEOCODE_API_KEY = require('../helpers/api_keys/geocoding_api_key.js');
const Request = require('../helpers/request.js');

const Geolocator = function() {
  this.data = null;
  this.geocodedCountries = [];
}


Geolocator.prototype.bindEvents = function() {
  PubSub.subscribe('Countries:Form-result-calculated', (event) => {
    const countriesDetails = event.detail;
    this.data = countriesDetails;

    const detailsWithGeolocation = this.addGeolocation(countriesDetails);
  })
}

Geolocator.prototype.addGeolocation = function(countries) {
  let promisesArray = [];
  countries.forEach((country) => {
    const countryName = country.name;
    const preparedCountryName = this.prepareInput(countryName);
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${GEOCODE_API_KEY}&location=${preparedCountryName}`;
    const request = new Request(url);

    promisesArray.push(request.get()
    .then((data) => {
      const countryCode = data.results[0].locations[0].adminArea1;
      const longitude = data.results[0].locations[0].latLng.lng;
      const latitude = data.results[0].locations[0].latLng.lat;
      geocode = {
        countryCode: countryCode,
        longitude: longitude,
        latitude: latitude
      }
      country['geocode'] = geocode;
      this.geocodedCountries.push(country);
    })

    .catch(console.error))

  });
  Promise.all(promisesArray)
    .then((data) => {
      PubSub.publish('Geolocator:geocoded-countries-ready', this.geocodedCountries);
    })
}
Geolocator.prototype.prepareInput = function(string) {
  const preparedString = string.replace(' ', '+');
  return preparedString;
}



module.exports = Geolocator;
