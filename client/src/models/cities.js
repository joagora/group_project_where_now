// const PubSub = require('../helpers/pub_sub.js');
// const Request = require('../helpers/request.js');
// const Cities = function() {
//
// }
//
// Cities.prototype.bindEvents = function() {
//   PubSub.subscribe('ResultView:selected-country', (event) => {
//     this.getData(event.detail);
//   })
//
// }
//
// Cities.prototype.getData = function(country) {
//     const cityName = country.capital;
//     const lowerCasedCity = cityName.toLowerCase();
//     const url = `https://api.teleport.org/api/urban_areas/slug:${lowerCasedCity}/scores/`;
//     const request = new Request(url);
//     request.get()
//       .then((data) => {
//         const city = {};
//         city['qualityOfLife'] = data.categories;
//         city['description'] = data.summary;
//         city['name'] = lowerCasedCity;
//         country['cityDetails'] = city;
//         console.log(country);
//         return city;
//       })
//       .then((data) => {
//         PubSub.publish('Cities:cities-details-ready', data);
//       })
//
// }
//
// module.exports = Cities;
