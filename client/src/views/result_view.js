const PubSub = require('../helpers/pub_sub.js');

const ResultView = function(resultContainer) {
    this.resultContainer = resultContainer;
    this.marginValuesOfIndexed = null;
};

ResultView.prototype.bindEvents = function () {
    PubSub.subscribe('Jobs:countries-with-salary-ready', (event) => {
      this.render(event.detail);
    })

};

ResultView.prototype.render = function(countries) {
  this.resultContainer.textContent = "";
  this.resultContainer.classList.toggle('visible');
  const formView = document.querySelector('#content-container');
  formView.classList.toggle('hidden');
  // const mapContainer = this.createMapDiv(countries);
  const detailsContainer = this.createDetailsContainer(countries);


}

ResultView.prototype.createDetailsContainer = function(countries) {
  const detailsContainer = document.createElement('div');
  detailsContainer.setAttribute('id', 'details-container');
  this.resultContainer.appendChild(detailsContainer);

  countries.forEach((country) => {
    this.createCountryDiv(country);
  })
}

ResultView.prototype.createCountryDiv = function(country) {
  const countryDiv = document.createElement('div');
  this.resultContainer.appendChild(countryDiv);

  const countryHeader = this.createCountryHeader(country);
  countryDiv.appendChild(countryHeader);


  const countryGraph = this.createGraph(country);
  countryDiv.appendChild(countryGraph);



}

ResultView.prototype.createCountryHeader = function(country) {
  const countryHeader = document.createElement('h1');
  countryHeader.textContent = country.name;
  return countryHeader;

}

ResultView.prototype.createGraph = function(country) {
  const graphContainer = document.createElement('div');
  graphContainer.setAttribute('class', 'graph-container');
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
        height: 150,
        width: 400,
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

  return graphContainer;
}
module.exports = ResultView;
