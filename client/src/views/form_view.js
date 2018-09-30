const PubSub = require('../helpers/pub_sub');

const FormView = function(formContainer) {
  this.formContainer = formContainer;
}

FormView.prototype.bindEvents = function() {
  this.formContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    const formValues = this.getSubmittedValues(event.target);
    PubSub.publish('FormView:form-submitted', formValues);
    this.hideForm()
  })

  this.listenForFormIconClick();


}

FormView.prototype.hideForm = function() {
  const form = document.querySelector('#preferences-form');
  form.classList.toggle('hidden');
  form.classList.remove('visible');

  const formContainer = document.querySelector('#form-container');
  formContainer.classList.toggle('hidden');
  formContainer.classList.remove('visible');
}

FormView.prototype.listenForFormIconClick = function() {
  const iconContainer = document.querySelector('#icon-container');
  iconContainer.addEventListener('click', (event) => {
    iconContainer.classList.toggle('hidden');

    const form = document.querySelector('#form-container');
    form.classList.remove('hidden');
    const instructionsParagraph = document.querySelector('#instructions');
    instructionsParagraph.classList.toggle('hidden');
    instructionsParagraph.classList.remove('visible');

    this.slideInForm();
    this.moveDisplayUp();
  })
}


FormView.prototype.slideInForm = function() {
  const formParent = document.querySelector('#preferences-form');
  formParent.classList.toggle('visible');
}

FormView.prototype.moveDisplayUp = function() {
  const displayContainer = document.querySelector('#display-container');
  displayContainer.classList.toggle('move-display');
}
FormView.prototype.getSubmittedValues = function(form) {
  const preferenceSliders = this.grabSliders(form);

  const sliderValues = this.getSlidersValues(preferenceSliders);
  return sliderValues;
}

FormView.prototype.grabSliders = function(form) {
  const sliders = document.querySelectorAll('.preference-slider');
  return sliders;
}

FormView.prototype.getSlidersValues = function(sliders) {
  const sliderArray = Array.from(sliders);
  const valuesObject = sliderArray.map((element) => {
    let object = {};
    object['attributeName'] = element.id;
    object['value'] = element.value;
    return object;
  });
  return valuesObject;
}


module.exports = FormView;
