const Request = require('../helpers/request');
const PubSub = require('../helpers/pub_sub');


const JobsSelectView = function(container){
  this.container = container;
}

JobsSelectView.prototype.bindEvents = function(){
  PubSub.subscribe('Jobs:categories-labels-ready', (event) => {
    const categories = event.detail;
    this.populateDropdown(categories);
  })
  this.container.addEventListener('change', (event) => {
    const selectedJobTitle = event.target.value;
    PubSub.publish('JobsSelectView:selected-job-title-ready', selectedJobTitle);
  });
}

JobsSelectView.prototype.populateDropdown = function (categories){
  categories.forEach((label) => {
    const option = document.createElement('option');
    option.textContent = label;
    option.value = label;
    this.container.appendChild(option);
  });
}

JobsSelectView.prototype.getValueFromDropdown = function(event) {

}

module.exports = JobsSelectView;
