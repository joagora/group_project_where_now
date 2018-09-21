const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function (url) {
  this.url = 'http://localhost:3000/api/countries';
  this.request = new Request(this.url);
};

//
// Countries.prototype.bindEvents = function () {
//
//   PubSub.subscribe('CountriesView:form-submitted', (evt) => {
//     this.postSighting(evt.detail);
//   })
// };

Countries.prototype.getData = function (data) {
    const url = (``);   //TODO Put  here
    console.log(url);
    const request = new Request(url);
    request.get()
        .then((data) => {
            this.data = data;
            //publish data to result_view
            PubSub.publish('Countries:Form-result-calculated', this.data);
            //Prove data are here
            console.log('Countries.JS - Test API works' , this.data)
        })
        .catch((message) => {
            console.error(message);
        });
};

// Countries.prototype.getData = function () {
//   this.request.get()
//     .then((sightings) => {
//       PubSub.publish('Countries:data-loaded', sightings);
//     })
//     .catch(console.error);
// };


module.exports = Countries;
