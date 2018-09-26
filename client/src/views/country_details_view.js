const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const CountryDetailsView = function(container) {
  this.container = container;
};

CountryDetailsView.prototype.bindEvents = function() {
  PubSub.subscribe('ResultView:selected-country', (event) => {
    this.render(event.detail);
  })
};

CountryDetailsView.prototype.render = function(country) {
  const countryHeader = document.querySelector('.country-header');
  countryHeader.textContent = country.name;

  const capitalCityHeader = document.querySelector('.city-header');
  capitalCityHeader.textContent = country.capital;
}


module.exports = CountryDetailsView;
