const PubSub = require('../helpers/pub_sub.js');
const GraphView = require('./graph_view.js');
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
  const graphView = new GraphView(graphContainer);
  graphView.createGraph(country, 350, 400);
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
