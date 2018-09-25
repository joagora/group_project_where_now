const PubSub = require('../helpers/pub_sub.js');

const CountryDetailsView = function(countryContainer) {
  this.countryContainer = countryContainer;
};

CountryDetailsView.prototype.bindEvents = function() {
  PubSub.subscribe('CountriesFilter:Form-result-calculated', (event) => {
    this.render(event.detail);
  })
};

CountryDetailsView.prototype.render = function() {
  this.countryContainer.textContent = '';
  const detailsContainer = this.createDetailsContainer(country);
}

CountryDetailsView.prototype.createDetailsContainer = function(country) {
  const deatilsContainer = document.createElement('div');
  detailsContainer.setAttribute('id')
}

module.exports = CountryDetailsView;
