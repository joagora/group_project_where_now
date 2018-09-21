const PubSub = require('../helpers/pub_sub.js');

const ResultView = function(resultContainer) {
    this.resultContainer = resultContainer;
};

ResultView.prototype.bindEvents = function () {
    console.log("Result view bindEvents Function");
    PubSub.subscribe('Countries:Form-result-calculated', (event) => {
        console.log(event);
        const countries = event.detail;
        console.log("Countries are in Result View here");
        console.log(countries);
    })
};

module.exports = ResultView;