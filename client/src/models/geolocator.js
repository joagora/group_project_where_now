const PubSub = require('../helpers/pub_sub.js');
// const GEOCODE_API_KEY = require('../helpers/api_keys/geocoding_api_key.js');
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
    // const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${GEOCODE_API_KEY}&location=${preparedCountryName}`;
    const url = `http://localhost:3000/geolocation?countryName=${preparedCountryName}`

    const request = new Request(url);

    promisesArray.push(request.get()
    .then((data) => {
      const validLocation = this.validateLocation(data.results[0].locations);
      console.log(validLocation);
      const countryCode = validLocation.adminArea1;
      const longitude = validLocation.latLng.lng;
      const latitude = validLocation.latLng.lat;
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
      console.log(this.geocodedCountries);
      PubSub.publish('Geolocator:geocoded-countries-ready', this.geocodedCountries);
    })
}
Geolocator.prototype.prepareInput = function(string) {
  const preparedString = string.replace(' ', '+');
  return preparedString;
}

Geolocator.prototype.validateLocation = function(locations) {
  let validLocation = null;
  locations.forEach((location) => {
    if(location.geocodeQuality === "COUNTRY") {
      validLocation = location;
    }

  })
  return validLocation;
}



module.exports = Geolocator;
