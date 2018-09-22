const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function () {
  this.countryList = null;
  this.request = new Request("http://localhost:3000/api/countries");
};


Countries.prototype.bindEvents = function () {
  this.getData();
};

Countries.prototype.getData = function() {
  this.request.get()
    .then((countryList) => {
      PubSub.publish('Countries:countries-list-ready', countryList);
    })
    .catch(console.error);
};
//interate over each country and collect data for forEach
//[{"country": "Azerbaijan",
//"indexes": {
//"safety":
//}
//"country": "Azerbaijan",
//"safety": "1232"}]

//send it over to filter function
//the filter will listen to the form then grab the array of preferencesForm
//the filter will listen to the countryDataCollection model
//the values that we want from the form is the keys from the api
//it should call a filter method which will take array of prefences in order of importance and pass in as argument
//once it is finished filtering its data set it should pop the first value
//get
//take country data set passed in as argument

//take first preference and for each country create an object with country name and values


module.exports = Countries;
