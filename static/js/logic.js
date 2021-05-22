// Store our API endpoint inside queryUrl
let url="/api/v1.0/states"
console.log("hello");

function buildPlot() {

  // Perform a GET request to the query URL
  d3.json(url, function(data) {
    console.log(data);

    let FilteredData = data.filter(item => item.State);
    console.log(FilteredData);

    let mapElement = {'state_name':[],
                      'lat':[],
                      'lon':[],
                      'total_cases':[],
                      'total_death':[]
    };
    FilteredData.forEach(item => {
      mapElement.state_name.push(item.State),
      mapElement.lat.push(item.Lat),
      mapElement.lon.push(item.Long),
      mapElement.total_cases.push(item.Total_cases),
      mapElement.total_death.push(item.Total_deaths)
    });

    let hoverText = mapElement['total_death'];
    console.log(hoverText);

    let mapData = [{
      type: "choropleth",
      locationmode: "USA-states",
      locations: mapElement['state_name'],
    //   geojson: mapElement['state_name'],
    //   z: mapElement[cat],
      lat: mapElement['lat'],
      lon: mapElement['lon'],
      color: mapElement['total_cases'],
      text: hoverText,
      hoverinfo: "text",
      marker: {
          size: 50,
          line: {
              color: "rgb(8,8,8)",
              width: 1
          },
      }
    }]

    let layout = {
      scope: "usa",
      title: "USA COVID-19 Infection Map",
      showlegend: false,
      height: 600,
            // width: 980,
      geo: {
        scope: "usa",
        projection: {
          type: "albers usa"
        },
        showland: true,
        // landcolor: "rgb(217, 217, 217)",
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: "rgb(255,255,255)",
        countrycolor: "rgb(255,255,255)"
      }
    };

    Plotly.newPlot("myMap", mapData, layout);
  });
}

buildPlot();




