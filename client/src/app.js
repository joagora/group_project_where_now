const Countries = require("./models/countries");
//require dependencies
document.addEventListener('DOMContentLoaded', () => {
    // const countriesForm = document.querySelector('form#countries-form');
    // const countriesFormView = new countriesFormView(countriesForm);
    // countriesFormView.bindEvents();

    const countries = new Countries();
    //countries.bindEvents();
    countries.getData();

});
