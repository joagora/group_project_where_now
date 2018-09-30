const PubSub = require('../helpers/pub_sub.js');

const CountriesFilter = function() {
  this.countriesDetails = null;
  this.sortedFormValues = null;
  this.filteredCountries = null;
}

CountriesFilter.prototype.bindEvents = function() {
  PubSub.subscribe('FormView:form-submitted', (event) => {
    const sortedValues = this.sortFormValues(event.detail);
    const filteredCountries = this.getFilteredCountries(this.countriesDetails, sortedValues);


    PubSub.publish('CountriesFilter:Form-result-calculated', filteredCountries);
  })

  PubSub.subscribe('CountriesProperties:countries-properties-ready', (event) => {
    this.countriesDetails = event.detail;
  })
}

CountriesFilter.prototype.getFilteredCountries = function(countries, attributesToSortBy) {
  const filteredByQualityOfLife = this.filterByQualityOfLife(countries, attributesToSortBy);
  const filteredByPreferences = this.filterCountriesByPrefences(filteredByQualityOfLife, attributesToSortBy);
  const maxMinValues = this.getMaxMinOfIndexes(filteredByQualityOfLife, attributesToSortBy);
  const countriesWithTransformedValues = this.transformIndexedOfFilteredCountriesIntoPercentages(filteredByPreferences, attributesToSortBy, maxMinValues);
  return countriesWithTransformedValues;
}

CountriesFilter.prototype.sortFormValues = function(valuesToSort) {
  const sortedValues = valuesToSort.sort( (a, b) => {
    return b.value - a.value;
  })
  return sortedValues;
}


CountriesFilter.prototype.filterByQualityOfLife = function(countriesToSort) {
  let validCountries = this.filterInvalidCountries(countriesToSort, "quality_of_life_index");
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
  let filteredCountries = countriesToSort;
  console.log("filteredCountries", filteredCountries);
  // let attributesToSortBy = attributes;
  for(attribute of attributes) {
    const attributeName = attribute.attribute;
    console.log(attributeName);
    if(filteredCountries.length < 10){
      const countriesToDisplay = filteredCountries.slice(0, 5);
      console.log("COUNTRIES AFTER FILTERING", countriesToDisplay);
      return countriesToDisplay;
    }else {
      //TODO: change naming of attribute to attributeName in the object
      let validCountries = this.filterInvalidCountries(filteredCountries, attributeName);

      if(attribute === ("health_care_index" || "climate_index")) {
        filteredCountries = validCountries.sort((a, b) => {
          return b.details[`${attributeName}`] - a.details[`${attributeName}`];
        })
      } else {
        filteredCountries = validCountries.sort((a, b) => {
          return a.details[`${attributeName}`] - b.details[`${attributeName}`];
        })
      }

      filteredCountries = this.halfDataSet(filteredCountries);
      console.log(`FILTERED COUNTRIES by ${attributeName}`, filteredCountries);
      // attributesToSortBy.shift();
      // return this.filterCountriesByPrefences(filteredCountries, attributes);
    }
  }


  }



  // return this.filteredCountries;



CountriesFilter.prototype.getMaxMinOfIndexes = function(countriesToSort, attributes) {

  const attributesArray = attributes.map(function(attribute) {
    return attribute.attribute;
  });

  let maxMinForAttribute = null;
  let countryAttributes = {}
  attributesArray.forEach((attribute) => {
    const attributeObject = {};
    maxMinForAttribute = countriesToSort.map((country) => {
      return country.details[attribute];
    })

    const attributeMaxMinValues = {}
    const max = Math.max(...maxMinForAttribute);
    const min = Math.min(...maxMinForAttribute);
    attributeMaxMinValues['max'] = max;
    attributeMaxMinValues['min'] = min;

    attributeObject['attributeName'] = attribute;
    attributeObject['attributeValues'] = attributeMaxMinValues;
    countryAttributes[attribute] = attributeObject;
  })
  return countryAttributes;
}

CountriesFilter.prototype.transformIndexedOfFilteredCountriesIntoPercentages = function(countries, attributes, maxMinValues) {

  countries.forEach((country) => {
    const attributesArray = attributes.map(function(attribute) {
      return attribute.attribute;
    });
    let percentages = {};
    // attributesArray.forEach((attributeName) => {
    attributesArray.forEach((attribute) => {
      const currentAttribute = attribute;
      const indexValueForCountry = country.details[currentAttribute];
      const maxValueForIndex = maxMinValues[currentAttribute].attributeValues.max;
      const minValueForIndex = maxMinValues[currentAttribute].attributeValues.min;
      const spectrum = maxValueForIndex - minValueForIndex;
      const result = ((indexValueForCountry - minValueForIndex) / spectrum) * 100;
      const resultRoundedDown = Math.floor(result);
      percentages[currentAttribute] = resultRoundedDown;
    })



    country['percentageValues'] = percentages;

  })
  return countries;
}

CountriesFilter.prototype.halfDataSet = function(dataToHalf) {
  const halfLengthRoundedDown = Math.floor(dataToHalf.length/2);
  const newDataSet = dataToHalf.slice(0, halfLengthRoundedDown);
  return newDataSet;
}



module.exports = CountriesFilter;
