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
    values = ["safety_index"];
    country1 = {"name": "Afganistan", "details": {
    "safety_index": 63.608357498169745}};
    country2 = {"name": "Poland", "details": {
    "safety_index": 69.608357498169745}};
    country3 = {"name": "Japan", "details": {
    "safety_index": 33.608357498169745}}
    country4 = {"name": "Greece", "details": {
    "safety_index": 45.608357498169745}}
    countries = [country1, country2, country3, country4];
  });

  it('should be able filter countries by one category', function () {
  const sortedCountries = countriesFilter.filterCountries(countries, values);
  const actual = sortedCountries;
  assert.deepStrictEqual(actual, [country2, country1, country4, country3]);
});
})
