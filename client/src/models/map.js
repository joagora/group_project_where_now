// create the map DONE
// get map to on;y appear after 'submit' DONE
// get countries from the final result DONE
// subscribe DONE

// from the results top countries we want to get the latitude, longitude and name for the pins

const Leaflet = require('leaflet')
const PubSub = require('../helpers/pub_sub');
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1Ijoic3R1YXJ0YmxhY2siLCJhIjoiY2ptaHVxZDY5MzA3NDNwbm82YnFnMjcxeCJ9.jCiJpdmvWanM5sS8ls1gTw';

const Map = function(){
  this.myMap = new mapboxgl.Map({ container: 'mapid',
    style: 'mapbox://styles/mapbox/streets-v9'
  // this.myMap = L.map('mapid').setView([55.95, 0], 2, {
  
  });
  this.geoCountries = null;
};

Map.prototype.bindEvents = function() {
  PubSub.subscribe('Geolocator:geocoded-countries-ready', (event) => {
    this.renderMap(event.detail);
  })
};

Map.prototype.renderMap = function (countries) {
  
 

//   // this.myMap = L.map('mapid').setView([55.95, -3.1883], 1);
//   L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//     maxZoom: 15,
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//     '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     id: 'mapbox.streets'
//   }).addTo(this.myMap);
  this.createLocationPins(countries)
};


Map.prototype.createLocationPins = function(countries) {
  console.log('Pin Function')
  console.log(countries);

  let nums = countries.length

  for (let i=0; i<nums;i++  ){
  let lat = countries[i].geocode['latitude'];
  let lon = countries[i].geocode['longitude'];
  let name = countries[i]['name'];

  L.marker([lat , lon]).addTo(this.myMap)
  .bindPopup(`<b>No.${i+1} Choice</b><br/>${name}`).openPopup();
 
  // lat = countries[1].geocode['latitude'];
  //  lon = countries[1].geocode['longitude'];
  // console.log(lat,lon)

  // L.marker([lat , lon]).addTo(this.myMap)
  // .bindPopup("<b>Third Choice</b><br />MELBOURNE").openPopup();

}
};

module.exports = Map;
