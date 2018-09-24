const GraphView = function() {
}

GraphView.prototype.createGraph = function(country) {
  const graphContainer = document.querySelector('div');
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
  console.log(graphContainer);
  return graphContainer;
}

module.exports = GraphView;
