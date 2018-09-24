// create the map

//get countries from the final result
//subscribe

//call another api on the country names to get latitude, longitude
const Leaflet = require('leaflet')
const PubSub = require('../helpers/pub_sub');

const Map = function(){
    this.mapData = null;
    this.myMap = L.map('mapid').setView([55.95, -3.1883], 1);
}

Map.prototype.renderMap = function () {
    // this.mymap.remove()
   
        
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 15,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(this.myMap);
        
        
    L.marker.on('click', function(e){
        map.setView(e.latlng, 13);

        L.marker([-37.813932, 14.962463]).addTo(this.myMap)
        .bindPopup("<b>Third Choice</b><br />MELBOURNE").openPopup();

        L.marker([37.770715, -122.431641]).addTo(this.myMap)
        .bindPopup("<b>Second Choice</b><br />SAN FRANCISCO").openPopup();

        L.marker([55.9533, -3.1883]).addTo(this.myMap)
        .bindPopup("<b>YOU GOT</b><br />EDINBURGH").openPopup();
    });
};



module.exports = Map;