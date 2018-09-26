const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

<<<<<<< HEAD
const CountryDetailsView = function(container) {
  this.container = container;
};

CountryDetailsView.prototype.bindEvents = function() {
  PubSub.subscribe('ResultView:selected-country', (event) => {
=======
const CountryDetailsView = function(countryContainer) {
  this.countryContainer = countryContainer;
};

CountryDetailsView.prototype.bindEvents = function() {
  PubSub.subscribe('CountriesFilter:Form-result-calculated', (event) => {
>>>>>>> feature/map
    this.render(event.detail);
  })
};

<<<<<<< HEAD
CountryDetailsView.prototype.render = function(country) {
  const countryHeader = document.querySelector('.country-header');
  countryHeader.textContent = country.name;

  const capitalCityHeader = document.querySelector('.city-header');
  capitalCityHeader.textContent = country.capital;



  // PubSub.subscribe('Cities:cities-details-ready', (event) => {
  //     const cityDetails = this.createCityDetails(event.detail);
  // })

}

// CountryDetailsView.prototype.createCityDetails = function(city) {
//
//   const cityDetails = document.querySelector('.city-details');
//   const cityDescription = document.createElement('p');
//   cityDescription.setAttribute('class', 'city-description');
//   const description = this.prepareForDisplay(city.description);
//   cityDescription.textContent = description;
//   cityDetails.appendChild(cityDescription)
//   const widget = this.createCityWidget(city);
//
// }

// CountryDetailsView.prototype.prepareForDisplay = function(description) {
//
// }
//
// CountryDetailsView.prototype.createCityWidget = function(city) {
//   const aElement = document.querySelector('.widget');
//   console.log(city);
//   const cityName = city.name;
//   console.log(city.name);
//   const url = `https://teleport.org/cities/${cityName}/`;
//   const request = new Request(url);
//   request.get()
//     .then((data) => {
//
//       console.log(city.name);
//       aElement.innerHTML = '<a class="teleport-widget-link" href="https://teleport.org/cities/' + cityName + '/">Life quality score ' + cityName + '</a><script async class="teleport-widget-script" data-url="https://teleport.org/cities/' + cityName + '/widget/scores/?currency=USD" data-max-width="770" data-height="500" src="https://teleport.org/assets/firefly/widget-snippet.min.js"></script>'
//     })
//
//
// }
=======
CountryDetailsView.prototype.render = function() {
  this.countryContainer.textContent = '';
  const detailsContainer = this.createDetailsContainer(country);
}

CountryDetailsView.prototype.createDetailsContainer = function(country) {
  const deatilsContainer = document.createElement('div');
  detailsContainer.setAttribute('id')
}

>>>>>>> feature/map
module.exports = CountryDetailsView;
