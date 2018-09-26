const Request = require('./helpers/request');
const PubSub = require('./helpers/pub_sub');
const Jobs = require('./models/jobs');
const JobsSelectView = require('./views/jobs_select_view.js')
const FormView = require('./views/form_view.js')
const Countries = require('./models/countries');
const CountriesProperties = require('./models/countries_properties.js');
const CountriesFilter = require('./models/countries_filter.js');
const ResultView = require('./views/result_view.js');
const Geolocator = require('./models/geolocator.js');
const Map = require('./models/map.js');
const Cities = require('./models/cities.js');
const CountryDetailsView = require('./views/country_details_view.js');
document.addEventListener('DOMContentLoaded', () => {

  const categoriesElement = document.querySelector('select#occupation-select')
  const jobsSelectView = new JobsSelectView(categoriesElement);
  jobsSelectView.bindEvents();

  const jobs = new Jobs();
  jobs.bindEvents();

  const preferencesForm = document.querySelector('#preferences-form');
  const formView = new FormView(preferencesForm);
  formView.bindEvents();

  const countries = new Countries();
  countries.bindEvents();

  const countriesProperties = new CountriesProperties();
  countriesProperties.bindEvents();

  const countriesFilter = new CountriesFilter();
  countriesFilter.bindEvents();

  const resultDiv = document.querySelector('#result');
  const resultView = new ResultView(resultDiv);
  resultView.bindEvents();

  const geolocator = new Geolocator();
  geolocator.bindEvents();

  const map = new Map();
  map.bindEvents();

  const cities = new Cities();
  cities.bindEvents();

  const countryViewContainer = document.querySelector('.popup')
  const countryDetailsView = new CountryDetailsView(countryViewContainer);
  countryDetailsView.bindEvents();
})
