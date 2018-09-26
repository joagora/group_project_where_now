const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const CountryDetailsView = function(container) {
  this.container = container;

};

CountryDetailsView.prototype.bindEvents = function() {
  PubSub.subscribe('ResultView:selected-country', (event) => {
    this.render(event.detail);
    this.renderGraph(event.detail);
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
  this.container.appendChild(countryHeader);




  const countryLanguages = document.createElement('h1')
  countryLanguages.setAttribute('class', 'country-languages');
  countryLanguages.textContent = `You better start learning ${country.languages[0]['name']}!`;
  this.container.appendChild(countryLanguages);

  const countryPopulation = document.createElement('h2');
  countryPopulation.setAttribute('class', 'country-population');
  const populationText = `Population : ${country.population}`;
  countryPopulation.textContent = populationText;
  this.container.appendChild(countryPopulation);

  const countryTimezones = document.createElement('h2');
  countryTimezones.setAttribute('class', 'country-timezone');
  const timezonesText = `Timezone: ${country.timezones}`;
  countryTimezones.textContent = timezonesText;
  this.container.appendChild(countryTimezones);

  const countryCurrencies = document.createElement('h2');
  countryCurrencies.setAttribute('class', 'country-currencies');
  const currenciesText = `Currency: ${country.currencies[0]['symbol']}, ${country.currencies[0]['name']}`;
  countryCurrencies.textContent = currenciesText;
  this.container.appendChild(countryCurrencies);

  const countryRegion = document.createElement('h2');
  countryRegion.setAttribute('class', 'country-region');
  const regionText = `Region: ${country.region}`;
  countryRegion.textContent = regionText;
  this.container.appendChild(countryRegion);

  const countryCapital = document.createElement('h2');
  countryCapital.setAttribute('class', 'country-capital');
  const capitalText = `Capital City : ${country.capital}`
  countryCapital.textContent = capitalText;
  this.container.appendChild(countryCapital);

  const countrySalary = document.createElement('h2');
  countrySalary.setAttribute('class', 'country-salary');
  const salaryShortened = Math.floor(country.salary.salary_percentiles['percentile_50'])
  const salaryText = `The Average Salary for a ${country.salary.job['title']}: $ ${salaryShortened} USD`;
  countrySalary.textContent = salaryText;
  this.container.appendChild(countrySalary);

  const countryFlag = document.createElement('img');
  countryFlag.setAttribute('class','country-flag');
  countryFlag.src = country.flag;
  console.log(country.flag);
  this.container.appendChild(countryFlag);
}

CountryDetailsView.prototype.renderGraph = function(country) {
  const graphContainer = document.createElement('div');
  graphContainer.setAttribute('class', 'graph-container');
  graphContainer.classList.add('graph-big');
  console.log(country.percentageValues);
  const crime = country.percentageValues.crime_index;
  const transport = country.percentageValues.traffic_inefficiency_index;
  const healthcare = country.percentageValues.health_care_index;
  const pollution = country.percentageValues.pollution_index;
  const weather = country.percentageValues.climate_index;
  const restaurant = country.percentageValues.restaurant_price_index
  const rent = country.percentageValues.rent_index;
  window.chart = new Highcharts.Chart({
    chart: {
      renderTo: graphContainer,
      height: 500,
      width: 1500,
      type: 'columnrange',
      inverted: true,
    },
    exporting: {
      enabled: false
    },
    xAxis: {
      gridLineColor: 'transparent',
      lineColor: 'transparent',
      lineWidth: 0,
      title: {
        text: "asdas "
      },
      categories: ['Crime', 'Transportation', 'Healthcare', 'Pollution', 'Weather', 'Restaurants', 'Rent']
    },
    yAxis: {
      gridLineColor: 'transparent',
      lineColor: 'transparent',
      lineWidth: 0,
      style: {
        display: 'none'
      },
      labels: {
        enabled: false
      },
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    series: [{
      data: [
        [-1, crime],
        [-1, transport],
        [-1, healthcare],
        [-1, pollution],
        [-1, weather],
        [-1, restaurant],
        [-1, rent]
      ],
      colorByPoint: true
    }]
  });
  this.container.appendChild(graphContainer);
  return graphContainer;
}

module.exports = CountryDetailsView;
