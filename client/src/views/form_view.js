const PubSub = require('../helpers/pub_sub');

const FormView = function(formContainer) {
  this.formContainer = formContainer;
}

FormView.prototype.bindEvents = function() {
  this.formContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    const completedForm = this.getSubmittedValues(event.target);
    console.log(event);
    PubSub.publish('FormView:form-submitted', completedForm)
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
    console.log(element.id);
    object[element.id] = element.value;
    return object;
  });
  return valuesObject;

}


//TODO: map the values , return array

module.exports = FormView;
