const GraphView = function(graphContainer) {
  this.graphContainer = graphContainer;

}

GraphView.prototype.createGraph = function(country, height, width) {
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
        renderTo: this.graphContainer,
        height: height,
        width: width,
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
  responsive: {
    rules: [{
        condition: {
            maxWidth: 400
        },
        chartOptions: {
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal'
            },
            yAxis: {
                labels: {
                    align: 'left',
                    x: 0,
                    y: -5
                },
                title: {
                    text: null
                }
            },
            subtitle: {
                text: null
            },
            credits: {
                enabled: false
            }
        }
    }]
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

  return window.chart;
}

module.exports = GraphView;
