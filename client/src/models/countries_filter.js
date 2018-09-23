const PubSub = require('../helpers/pub_sub.js');

const CountriesFilter = function() {
  this.countriesDetails = null;
  this.sortedFormValues = null;
}

CountriesFilter.prototype.bindEvents = function() {
  PubSub.subscribe('FormView:form-submitted', (event) => {
    const sortedValues = this.sortFormValues(event.detail);
    this.sortedFormValues = sortedValues;
    const filteredByQualityOfLife = this.filteredByQualityOfLife(this.countriesDetails)
    const filteredByPreferences = this.filterCountriesByPrefences(filteredByQualityOfLife, sortedValues);
    console.log(filteredByPreferences);
  })
  PubSub.subscribe('CountriesProperties:countries-properties-ready', (event) => {
    this.countriesDetails = event.detail;

  })
}

CountriesFilter.prototype.sortFormValues = function(valuesToSort) {
  const sortedValues = valuesToSort.sort( (a, b) => {
    return b.value - a.value;
  })
  return sortedValues;
}


CountriesFilter.prototype.filteredByQualityOfLife = function(countriesToSort) {
  let validCountries = this.filterInvalidCountries(countriesToSort, "quality_of_life_index");
  console.log(validCountries);
  const sortedCountries = validCountries.sort((a, b) => {
    return b.details["quality_of_life_index"] - a.details["quality_of_life_index"];
  })
  return sortedCountries;
}

CountriesFilter.prototype.filterInvalidCountries = function(countries, attribute) {
  let validCountries = [];
  countries.forEach((country) => {
    const detailsKeys = Object.keys(country.details);

    if(detailsKeys.includes(attribute) === true) {
      validCountries.push(country);
    }
  })
  return validCountries;
}

CountriesFilter.prototype.filterCountriesByPrefences = function(countriesToSort, attributes) {
  let filteredCountries = [];

  if(countriesToSort.length >= 6) {
    let attributeToSortBy = attributes[0].attribute;
    let validCountries = this.filterInvalidCountries(countriesToSort, attributeToSortBy);

    let countriesSorted = null;
    if(attributeToSortBy === "health_care_index") {
      countriesSorted = validCountries.sort((a, b) => {
        return b.details[`${attributeToSortBy}`] - a.details[`${attributeToSortBy}`];
      })
    } else {
      countriesSorted = validCountries.sort((a, b) => {
        return a.details[`${attributeToSortBy}`] - b.details[`${attributeToSortBy}`];
      })
    }

    filteredCountries = this.halfDataSet(countriesSorted);
    attributes.shift();
    console.log(attributeToSortBy);
    console.log(filteredCountries);
    return this.filterCountriesByPrefences(filteredCountries, attributes);
  }
  return filteredCountries;

}

CountriesFilter.prototype.halfDataSet = function(dataToHalf) {
  const halfLengthRoundedDown = Math.floor(dataToHalf.length/2);
  const newDataSet = dataToHalf.slice(0, halfLengthRoundedDown);
  return newDataSet;
}

module.exports = CountriesFilter;
