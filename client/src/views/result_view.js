const PubSub = require('../helpers/pub_sub.js');

const ResultView = function(resultContainer) {
    this.resultContainer = resultContainer;
    this.marginValuesOfIndexed = null;
};

ResultView.prototype.bindEvents = function () {
    PubSub.subscribe('Jobs:countries-with-salary-ready', (event) => {
      console.log("countries with salary", event.detail);
      this.render(event.detail);
    })

};

ResultView.prototype.render = function(countries) {
  this.resultContainer.textContent = "";
  const resultWrapper = document.querySelector('#wrapper');
  wrapper.classList.toggle('visible');
  const formView = document.querySelector('#instructions');
  formView.classList.toggle('hidden');
  formView.classList.remove('visible');
  const detailsContainer = this.createDetailsContainer(countries);


}

ResultView.prototype.createDetailsContainer = function(countries) {


  countries.forEach((country) => {
    this.createCountryDiv(country);
  })
}

ResultView.prototype.createCountryDiv = function(country) {
  const countryDiv = document.createElement('div');
  countryDiv.setAttribute('class', 'country-details');
  this.resultContainer.appendChild(countryDiv);

  const countryHeader = this.createCountryHeader(country);
  countryDiv.appendChild(countryHeader);



  const countryGraph = this.createGraph(country);
  countryDiv.appendChild(countryGraph);

  const moreButton = this.createButton();
  countryDiv.appendChild(moreButton);
  moreButton.addEventListener('click', (event) => {
    PubSub.publish('ResultView:selected-country', country);
  })

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
        height: 250,
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
    text: "asdas",
  },

    categories: ['Crime', 'Transport', 'Healthcare', 'Pollution', 'Weather', 'Restaurants', 'Rent'],
    labels: {
      style: {
        color: '#A9A9A9',
        fontSize: '20px'
      }
    }
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
    colors: ['#E27D60', '#60c5e2', '#E8A87C', '#C38D9E', '#41B3A3', '#E27D60', '#60c5e2', '#E8A87C', '#C38D9E'],
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

ResultView.prototype.createButton = function() {

  const button = document.createElement('a');
  button.setAttribute('class', 'more-button');
  button.setAttribute('href', '#popup')
  const icon = document.createElement('i');

  icon.setAttribute('class', 'fas fa-arrow-circle-right');
  const paragraph = document.createElement('p');
  icon.appendChild(paragraph);
  paragraph.textContent = "View more details";
  button.appendChild(icon);

  return button;
}
module.exports = ResultView;
