const Request = require('../helpers/request');
const PubSub = require('../helpers/pub_sub');
const ADZUNA_API_KEY = require('../helpers/api_keys/adzuna_api_key.js');
const ADZUNA_ID = require('../helpers/api_keys/adzuna_id.js');

const Jobs = function(){
  this.jobsData = null;
}

Jobs.prototype.bindEvents = function(){
  this.getData();
}

Jobs.prototype.getData = function(){
  const url = `http://api.adzuna.com/v1/api/jobs/gb/categories?app_id=${ADZUNA_ID}&app_key=${ADZUNA_API_KEY}&&content-type=application/json`;
  const request = new Request(url);
  request.get()
    .then((data) => {
      this.jobsData = data;
    })
    .then((data) => {
      const categoriesDetails = this.jobsData.results;
      const categoriesLabels = categoriesDetails.map((category) => {
        return category.label;
      })
      PubSub.publish('Jobs:categories-labels-ready', categoriesLabels);
    })
}


  module.exports = Jobs;
