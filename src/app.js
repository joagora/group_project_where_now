const FormView = require('./views/form_view.js')
//require dependencies

document.addEventListener('DOMContentLoaded', () => {

  const preferencesForm = document.querySelector('#preferences-form');
  const formView = new FormView(preferencesForm);
  formView.bindEvents();


})
