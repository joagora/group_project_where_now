const PubSub = require('../helpers/pub_sub');

const FormView = function(formContainer) {
  this.formContainer = formContainer;
}

FormView.prototype.bindEvents = function() {
  this.formContainer.addEventListener('#submit-form', (event) => {
    event.preventDefault();
    const completedForm = this.getSubmittedValues(event.target);
    PubSub.publish('FormView:form-submitted', completedForm)
  })
}

FormView.prototype.getSubmittedValues = function(form) {
  const checkboxes = this.grabCheckboxes(form);
  const checkedCheckboxes = this.getCheckedCheckboxes(checkboxes)
  console.log(checkedCheckboxes);
}

FormView.prototype.grabCheckboxes = function(form) {
  const checkboxes = document.querySelectorAll('.preference-button')
  return checkboxes
}

FormView.prototype.getCheckedCheckboxes = function(checkboxes) {
  const checkboxArray = Array.form(checkboxes);
  return checkboxArray.filter((checkbox) => {
    return checkbox.checked === true;
  })
}


//TODO: map the values , return array

module.exports = FormView;
