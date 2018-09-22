const Request = require('./helpers/request');
const PubSub = require('./helpers/pub_sub');
const Jobs = require('./models/jobs');
const JobsSelectView = require('./views/jobs_select_view.js')
const FormView = require('./views/form_view.js')
const Countries = require('./models/countries');
const CountriesProperties = require('./models/countries_properties.js');

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
})
