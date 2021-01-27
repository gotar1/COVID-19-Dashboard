// Store our API endpoint inside queryUrl
let url="/api/v1.0/states"
console.log("hello")

// Perform a GET request to the query URL
d3.json(url, function(data) {
  console.log(data)
//   // Once we get a response, send the data.features object to the createFeatures function
//   // createFeatures(data.features);
//   // console.log(data.features)
});

// function createMap(States) {

//   // Define outdoormap layers
//   let outdoormap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/outdoors-v11",
//     accessToken: API_KEY
//   });

//   // Define darkmap layers
//   let darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/dark-v10",
//     accessToken: API_KEY
//   });

//   // Define satellitemap layers
//   let satellitemap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/satellite-v9",
//     accessToken: API_KEY
//   });

//   // Define a baseMaps object to hold our base layers
//   let baseMaps = {
//     "outdoor Map": outdoormap,
//     "Dark Map": darkmap,
//     "satellite Map": satellitemap
//   };

//   // Create overlay object to hold our overlay layer
//   let overlayMaps = {
//     Covid: covids
//   };

//   // Create our map, giving it the outdoormap and earthquakes layers to display on load
//   let myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [outdoormap, covids]
//   });

//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

//    // function to assign colors for legend markers
//   function getColor(magnitude) {
//     return magnitude > 5 ? '#f06b6b':
//       magnitude > 4 ? '#f0936b':
//       magnitude > 3 ? '#f3ba4e':
//       magnitude > 2 ? '#f3db4c':
//       magnitude > 1 ? '#e1f34c':
//                       '#b7f34d';
//   }

//   // position legend on map bottim left corner
//   let legend = L.control({position: 'bottomleft'});

//   legend.onAdd = function() {
//     let div = L.DomUtil.create('div', 'legend');
//     let magnitudes = [0, 1, 2, 3, 4, 5];
//     // legendLabels = [];
//     div.innerHTML = 'Magnitude<br><hr>' 

//     for (let i = 0; i < magnitudes.length; i++) {
//       div.innerHTML +=
//       '<i style="background:' + getColor(magnitudes[i] + 1) + '"></i>' + magnitudes[i] + (magnitudes[i + 1] ?
//       '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
//     }
//     return div
//   };
//   legend.addTo(myMap);
// }

