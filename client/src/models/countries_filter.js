const PubSub = require('../helpers/pub_sub.js');

const CountriesFilter = function() {
  this.countriesDetails = null;
  this.sortedFormValues = null;
}

CountriesFilter.prototype.bindEvents = function() {
  PubSub.subscribe('FormView:form-submitted', (event) => {
    const sortedValues = this.sortFormValues(event.detail);
    this.sortedFormValues = sortedValues;
  })
  PubSub.subscribe('CountriesProperties:countries-properties-ready', (event) => {
    this.countriesDetails = event.detail;
    //we got an array of countries ready, write filter method
    this.filterCountries(this.countriesDetails, this.sortedFormValues);

  })
}

CountriesFilter.prototype.sortFormValues = function(valuesToSort) {
  const sortedValues = valuesToSort.sort( (a, b) => {
    return b.value - a.value;
  })
  return sortedValues;
}

CountriesFilter.prototype.filterCountries = function(countriesToSort, attributes) {
  let attributeToSortBy = attributes[0];
  const countriesSorted = countriesToSort.sort((a, b) => {
    return b.details[`${attributeToSortBy}`] - a.details[`${attributeToSortBy}`];
  })
  const filteredCountries = this.halfDataSet(countriesSorted);
  attributes.shift();
  return filteredCountries;



}

CountriesFilter.prototype.halfDataSet = function(dataToHalf) {
  const halfLengthRoundedDown = Math.floor(dataToHalf.length/2);
  const newDataSet = dataToHalf.splice(0, halfLengthRoundedDown);
  return newDataSet;
}

module.exports = CountriesFilter;
