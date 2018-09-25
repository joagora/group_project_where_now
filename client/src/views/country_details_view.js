const PubSub = require('../helpers/pub_sub.js');

const CountryDetailsView = function() {

};

CountryDetailsView.prototype.bindEvents = function() {
  PubSub.subscribe('CountriesFilter:Form-result-calculated', (event) => {

  })
};
