const Request = require('../helpers/request');
const PubSub = require('../helpers/pub_sub');
const ADZUNA_API_KEY = require('../helpers/api_keys/adzuna_api_key.js');
const ADZUNA_ID = require('../helpers/api_keys/adzuna_id.js');

const Jobs = function(){
  this.jobsSalaries = null;
}

Jobs.prototype.bindEvents = function(){
  this.getData();
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


  module.exports = Jobs;
