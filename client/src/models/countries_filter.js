const PubSub = require('../helpers/pub_sub.js');

const CountriesFilter = function() {
  this.countriesDetails = null;
  this.formDetails = null;
}

CountriesFilter.prototype.bindEvents = function() {
  PubSub.subscribe('FormView:form-submitted', (event) => {
    console.log(event.detail);
    let valuesToSort = event.detail;
    console.log(valuesToSort);
    const sortedValues = valuesToSort.sort( (a, b) => {
      return b.value - a.value;
    })
    console.log(sortedValues);
  })
  PubSub.subscribe('CountriesProperties:countries-properties-ready', (event) => {
    this.countriesDetails = event.detail;

  })
}


module.exports = CountriesFilter;
