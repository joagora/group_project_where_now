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
module.exports = Countries;
