const PubSub = require('../helpers/pub_sub');

const FormView = function(formContainer) {
  this.formContainer = formContainer;
}

FormView.prototype.bindEvents = function() {
  this.formContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    const formValues = this.getSubmittedValues(event.target);
    PubSub.publish('FormView:form-submitted', formValues);
  })
}

FormView.prototype.getSubmittedValues = function(form) {
  const preferenceSliders = this.grabSliders(form);

  const sliderValues = this.getSlidersValues(preferenceSliders)
  console.log(sliderValues);
}

FormView.prototype.grabSliders = function(form) {
  const sliders = document.querySelectorAll('.preference-slider');
  return sliders;
}

FormView.prototype.getSlidersValues = function(sliders) {
  const sliderArray = Array.from(sliders);
  console.log(sliderArray);
  const valuesObject = sliderArray.map((element) => {
    let object = {};
    object[element.id] = element.value;
    return object;
  });
  return valuesObject;
}


module.exports = FormView;
