//координаты центра

var mapOptions = {
   center: [53.905180, 27.431962],
   zoom: 10
}

var map = new L.map('map', mapOptions);


var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

L.marker([53.905180, 27.431962]).addTo(map);
map.addLayer(layer);
