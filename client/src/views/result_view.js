const PubSub = require('../helpers/pub_sub.js');

const ResultView = function(resultContainer) {
    this.resultContainer = resultContainer;
};

ResultView.prototype.bindEvents = function () {
    PubSub.subscribe('Countries:Form-result-calculated', (event) => {
      const countries = event.detail;
      console.log(countries);

      this.render(countries);
    })
};

ResultView.prototype.render = function(countries) {
  this.resultContainer.textContent = "";
  //
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
  window.chart = new Highcharts.Chart({
    chart: {
        renderTo: graphContainer,
        height: 200,
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

    categories: ['Safety', 'Transportation', 'Healthcare', 'Weather', 'Living', 'Rent']
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
      [1, 10.3],
      [1, 8.5],
      [1, 11.8],
      [1, 12.2],
      [1, 12.2],
          [1, 12.2]
    ],
      colorByPoint: true

  }]

});

  return graphContainer;
}
module.exports = ResultView;
