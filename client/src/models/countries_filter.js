const PubSub = require('../helpers/pub_sub.js');

const CountriesFilter = function() {
  this.countriesDetails = null;
  this.sortedFormValues = null;
  this.filteredCountries = null;
}

CountriesFilter.prototype.bindEvents = function() {
  PubSub.subscribe('FormView:form-submitted', (event) => {
    const sortedValues = this.sortFormValues(event.detail);
    this.sortedFormValues = sortedValues;
    console.log("this.countriesDetails in bind events before sorting", this.countriesDetails);
    const filteredByQualityOfLife = this.filteredByQualityOfLife(this.countriesDetails);
    console.log("filteredByQualityOfLife", filteredByQualityOfLife);
    const filteredByPreferences = this.filterCountriesByPrefences(filteredByQualityOfLife, sortedValues);
    console.log("filtered by preferences", filteredByPreferences);
    const transformedValues = this.transformValuesToPercentages(filteredByPreferences);
    PubSub.publish('CountriesFilter:Form-result-calculated', filteredByPreferences);
  })

  PubSub.subscribe('CountriesProperties:countries-properties-ready', (event) => {
    console.log(event.detail);
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
  console.log("countries to sort in filter quality", countriesToSort);
  let validCountries = this.filterInvalidCountries(countriesToSort, "quality_of_life_index");
  console.log("valid countries in filter quality", validCountries);
  const sortedCountries = validCountries.sort((a, b) => {
    return b.details["quality_of_life_index"] - a.details["quality_of_life_index"];
  })
  return sortedCountries;
}

CountriesFilter.prototype.filterInvalidCountries = function(countries, attribute) {
  console.log("countries in filterInvalid", countries);
  let validCountries = [];
  countries.forEach((country) => {
    console.log("country in the forloop", country);
    const detailsKeys = Object.keys(country.details);

    if(detailsKeys.includes(attribute) === true) {
      validCountries.push(country);
    }
  })

  return validCountries;
}

CountriesFilter.prototype.filterCountriesByPrefences = function(countriesToSort, attributes) {
  let filteredCountries = [];
  if(countriesToSort.length < 10){
    const countriesToDisplay = this.filteredCountries.slice(0, 5);
    return countriesToDisplay;
  }else {

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
    this.filteredCountries = filteredCountries;
    return this.filterCountriesByPrefences(filteredCountries, attributes);
  }

  // return this.filteredCountries;

}

CountriesFilter.prototype.halfDataSet = function(dataToHalf) {
  const halfLengthRoundedDown = Math.floor(dataToHalf.length/2);
  const newDataSet = dataToHalf.slice(0, halfLengthRoundedDown);
  return newDataSet;
}

CountriesFilter.prototype.transformValuesToPercentages = function(countries) {
  countries.forEach((country) => {
    const details = country.details;
    //finish transforming data
  })
}

module.exports = CountriesFilter;
