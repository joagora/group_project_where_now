const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const CountryDetailsView = function(container) {
  this.container = container;
};

CountryDetailsView.prototype.bindEvents = function() {
  PubSub.subscribe('ResultView:selected-country', (event) => {
    this.render(event.detail);
  })
};

CountryDetailsView.prototype.render = function(country) {
  this.container.innerHTML = ''

  const closeButtonContainer = document.createElement('a')
  const closeButtonIcon = document.createElement('i');
  closeButtonIcon.setAttribute('class', 'fas fa-times')
  closeButtonContainer.appendChild(closeButtonIcon)
  closeButtonContainer.setAttribute('href', "#");
  this.container.appendChild(closeButtonContainer);

  const countryHeader = document.createElement('h1')
  countryHeader.setAttribute('class', 'country-header');
  countryHeader.textContent = country.name;
  this.container.appendChild(countryHeader)

  const countryPopulation = document.createElement('h2');
  countryPopulation.setAttribute('class', 'country-population');
  const populationText = `Population : ${country.population}`;
  countryPopulation.textContent = populationText;
  this.container.appendChild(countryPopulation)

  const countryCurrencies = document.createElement('h2');
  countryCurrencies.setAttribute('class', 'country-currencies');
  const currenciesText = `Currency: ${country.currencies[0]['symbol']}, ${country.currencies[0]['name']}`;
  countryCurrencies.textContent = currenciesText;
  this.container.appendChild(countryCurrencies)

  const countryRegion = document.createElement('h2');
  countryRegion.setAttribute('class', 'country-region');
  const regionText = `Region: ${country.region}`;
  countryRegion.textContent = regionText;
  this.container.appendChild(countryRegion)

  const countryTimezones = document.createElement('h2');
  countryTimezones.setAttribute('class', 'country-timezone');
  const timezonesText = `Timezone: ${country.timezones}`;
  countryTimezones.textContent = timezonesText;
  this.container.appendChild(countryTimezones)

  const countrySalary = document.createElement('h2');
  countrySalary.setAttribute('class', 'country-salary');
  const salaryText = `The Average Salary for a ${_____________}: ${country.salary}`;
  countrySalary.textContent = salaryText;
  this.container.appendChild(countrySalary);

  const countryCapital = document.createElement('h2');
  countryCapital.setAttribute('class', 'country-capital');
  const capitalText = `Capital City : ${country.capital}`
  countryCapital.textContent = capitalText;
  this.container.appendChild(countryCapital)












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
module.exports = CountryDetailsView;
