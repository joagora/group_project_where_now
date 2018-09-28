const Leaflet = require('leaflet')
const PubSub = require('../helpers/pub_sub');
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const Map = function () {
  L.mapbox.accessToken = 'pk.eyJ1Ijoic3R1YXJ0YmxhY2siLCJhIjoiY2ptaHVxZDY5MzA3NDNwbm82YnFnMjcxeCJ9.jCiJpdmvWanM5sS8ls1gTw';
};

Map.prototype.bindEvents = function () {
  PubSub.subscribe('CountriesFilter:Form-result-calculated', (event) => {
    this.renderMap(event.detail);
  })
};

Map.prototype.renderMap = function (countries) {
  let mapGeo = L.mapbox.map('mapid', 'mapbox.streets', { zoomControl: false })
    .setView([45, 20], 2);
    let popUps = L.mapbox.featureLayer().addTo(mapGeo)

  let nums = countries.length;
  for (let i = 0; i < nums; i++) {
    let lat = countries[i].latlng[0];
    let lon = countries[i].latlng[1];
    let name = countries[i]['name'];

    let geojson = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lon, lat]
      },
      properties: {
        title: name,
        description: `Your No. ${i+1} choice`,
        'marker-color': '#DC143C',
        'marker-symbol': (i + 1),
        'marker-size': 'large'
      }
    }
    popUps.setGeoJSON(geojson)
    myLayer = L.mapbox.featureLayer().setGeoJSON(geojson).addTo(mapGeo);
    // mapGeo.scrollWheelZoom.disable();
  }
}

module.exports = Map;
