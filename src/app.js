const Request = require('./helpers/request');
const PubSub = require('./helpers/pub_sub');
const Jobs = require('./models/jobs');
const JobsSelectView = require('./views/jobs_select_view.js')

document.addEventListener('DOMContentLoaded', () => {
  const categoriesElement = document.querySelector('select#occupation-select')
  const jobsSelectView = new JobsSelectView(categoriesElement);
  jobsSelectView.bindEvents();

  const jobs = new Jobs();
  jobs.bindEvents();

})
