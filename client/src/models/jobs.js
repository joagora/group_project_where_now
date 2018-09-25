const Request = require('../helpers/request');
const PubSub = require('../helpers/pub_sub');
const ADZUNA_API_KEY = require('../helpers/api_keys/adzuna_api_key.js');
const ADZUNA_ID = require('../helpers/api_keys/adzuna_id.js');

const Jobs = function(){
  this.jobsSalaries = null;
  this.jobTitleSelected = null;
}

Jobs.prototype.bindEvents = function(){
  this.getData();
  PubSub.subscribe('Countries:Form-result-calculated', (event) => {
    const countriesDetails = event.detail;
    this.countriesArray = countriesDetails;
    this.getSalaryDetails(countriesDetails);

  })
  PubSub.subscribe('JobsSelectView:selected-job-title-ready', (event) => {
    this.jobTitleSelected = event.detail;
  })

}

Jobs.prototype.getData = function(){
  const url = `https://api.teleport.org/api/countries/iso_alpha2:PL/salaries/`;
  const request = new Request(url);
  request.get()
    .then((data) => {
      this.jobsSalaries = data.salaries;
    })
    .then((data) => {
      const jobTitles = this.jobsSalaries.map((jobElement) => {
        return jobElement.job.title;
      })
      PubSub.publish('Jobs:categories-labels-ready', jobTitles);
    })
}

Jobs.prototype.getSalaryDetails = function(countries) {

  let promisesArray = [];
  countries.forEach((country) => {
    let countriesWithSalaries = [];
    const countryCode = country.geocode.countryCode;
    const url = `https://api.teleport.org/api/countries/iso_alpha2:${countryCode}/salaries/`;
    const request = new Request(url);
    promisesArray.push(request.get()
    .then((data) => {
      const salary = data.salaries;
      const salaryForJobTitle = this.findSalaryForJobTitle(salary, this.jobTitleSelected);
      country['salary'] = salaryForJobTitle;
    })
    .catch(console.error));
  })
  Promise.all(promisesArray)
    .then((data) => {
      console.log(countries);
      PubSub.publish('Jobs:countries-with-salary-ready', countries);
    })
}


//salaries is an array of hashes received from request with job and salary_percentiles
Jobs.prototype.findSalaryForJobTitle = function(salaries, jobTitle) {
  let foundSalary = null;
  salaries.forEach((salary) => {
    const jobName = salary.job.title;
    if(jobName === jobTitle) {
      foundSalary = salary;
    }
  })
  return foundSalary;
}
  module.exports = Jobs;
