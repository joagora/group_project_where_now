const assert = require('assert');
const CountriesFilter = require('../countries_filter.js');

describe('CountriesFilter', function () {
  let countriesFilter;
  let country1;
  let country2;
  let country3;
  let country4;
  let countries;

  beforeEach(function () {
    countriesFilter = new CountriesFilter();
    values1 = ["safety_index"];
    values = ["safety_index", "pollution_index"];
    country1 = {
      "name": "Afganistan", "details": {
      "safety_index": 63.608357498169745,
      "pollution_index": 12.608357498169745}
    };
    country2 = {
      "name": "Poland", "details": {
      "safety_index": 69.608357498169745,
      "pollution_index": 14.608357498169745}
    };
    country3 = {
      "name": "Japan", "details": {
        "safety_index": 33.608357498169745,
        "pollution_index": 16.608357498169745}
      };
    country4 = {
      "name": "Greece", "details": {
        "safety_index": 45.608357498169745,
        "pollution_index": 18.608357498169745}
      };
    country5 = {"name": "Syria", "details": {
    "safety_index": 19.608357498169745,
    "pollution_index": 20.608357498169745}
    };
    country6 = {"name": "Germany", "details": {
    "safety_index": 52.608357498169745,
    "pollution_index": 22.608357498169745}
    };
    country7 = {"name": "UK", "details": {
    "safety_index": 70.608357498169745,
    "pollution_index": 34.608357498169745}
    };
    country8 = {"name": "Austria", "details": {
    "safety_index": 55.608357498169745,
    "pollution_index": 36.608357498169745}
    };
    country9 = {"name": "Brazil", "details": {
    "safety_index": 7.608357498169745,
    "pollution_index": 38.608357498169745}
    };
    country10 = {"name": "France", "details": {
    "safety_index": 47.608357498169745,
    "pollution_index": 40.608357498169745}
    };
    country11 = {"name": "Spain", "details": {
    "safety_index": 14.608357498169745,
    "pollution_index": 42.608357498169745}
    };
    country12 = {"name": "Russia", "details": {
    "safety_index": 3.608357498169745,
    "pollution_index": 44.608357498169745}
    };
    country13 = {"name": "Switzerland", "details": {
    "safety_index": 13.608357498169745,
    "pollution_index": 46.608357498169745}
    };
    countries = [country1, country2, country3, country4, country5, country6, country7];
    countries2 = [country1, country2, country3, country4, country5, country6, country7, country8, country10, country11, country12, country13];
  });

//   it('should be able filter countries by one category', function () {
//   const sortedCountries = countriesFilter.filterCountries(countries, values1);
//   const actual = sortedCountries;
//   assert.deepStrictEqual(actual, [country7, country2, country1]);
// });
//
//   it('should get half of the data', function () {
//     const dataInHalf = countriesFilter.halfDataSet(countries);
//     const actual = dataInHalf.length;
//     assert.deepStrictEqual(actual, 3)
//   })
//
//   it('should remove the attribute that has been used', function () {
//     countriesFilter.filterCountries(countries, values);
//     const actual = values[0];
//     assert.deepStrictEqual(actual, "pollution_index");
//   })
//
//   it('should filter countries by more than one attribute', function() {
//     const actual = countriesFilter.filterCountries(countries2, values);
//     assert.deepStrictEqual(actual, [country10, country8, country7]);
//   })
})
