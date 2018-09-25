const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function () {
  this.countryList = null;
  this.request = new Request("https://restcountries.eu/rest/v2/all");
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
module.exports = Countries;
