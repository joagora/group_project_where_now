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
}

JobsSelectView.prototype.populateDropdown = function (categories){
  console.log(categories);
  categories.forEach((label) => {
    const option = document.createElement('option');
    option.textContent = label;
    option.value = label;
    this.container.appendChild(option);
  });
}

module.exports = JobsSelectView;
