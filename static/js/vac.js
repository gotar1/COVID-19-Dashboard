// Store our API endpoint inside queryUrl
let url="/api/v1.0/vaccine"
console.log("hello");

// create dropdown menu that changes map
// create dropdown menu options and map options to variable names in data
let dropItems = ['Total Vaccine Doses Distibuted', 'Vaccine Distributed per 100k', 'Total Vaccine Doses Administered', 'Vaccine Administered per 100k']
let dataSet = {'Total Vaccine Doses Distibuted':'vac_dist', 'Vaccine Distributed per 100k':'vac_per_100k', 'Total Vaccine Doses Administered': 'vac_admin', 'Vaccine Administered per 100k': 'admin_per_100k'}

dropItems.forEach(dropDownMenu => {
  d3.select("#selDataset")
  // option is the html element
    .append("option")
    .text(dropDownMenu)
    .property("value", dropDownMenu)
});

// specify inital selected variable in dropdown menu 
let selectedObj = 'vac_dist'

// listens for when there is a change to the selDataset, when there is a change then it runs function updateDisplay
d3.selectAll('#selDataset').on("change", handleSubmit); 

// handler for user selections in dropdown
function handleSubmit() {
  // use this to prevent the page from refreshing... may or may not be necessary.
  // d3.event.preventDefault();
  // select the value from the dropdown.node().value
  selectedId = d3.select('#selDataset').property('value');
  let selectedObj = dataSet[selectedId] 
  // console.log(selectedObj);
  // build map
  buildMap(selectedObj);
};

// code for map building
function buildMap(cat) {
  // Perform a GET request to the query URL
  d3.json(url, function(data) {
    // console.log(data);

    let mapElement = {'state_name':[],
                      'vac_dist':[],
                      'vac_per_100k':[],
                      'vac_admin':[],
                      'admin_per_100k':[]
    };
    data.forEach(item => {
      mapElement.state_name.push(item.State),
      mapElement.vac_dist.push(item.Distributed),
      mapElement.vac_per_100k.push(item.Dist_per_100k)
      mapElement.vac_admin.push(item.Administered),
      mapElement.admin_per_100k.push(item.Admin_per_100k)
    });

    // let hoverText = mapElement['total_death'];
    // console.log(hoverText);
    // console.log(mapElement['state_name']);
    // console.log(cat);

    let mapData = [{
      type: "choropleth",
      locationmode: "USA-states",
      locations: mapElement['state_name'],
      // geojson: mapElement['state_name'],
      z: mapElement[cat],
      color: mapElement['vac_dist'],
      text: mapElement['state_name'],
      // mode: 'text',
      // hoverinfo: z,
      marker: {
          size: 50,
          line: {
              color: "rgb(8,8,8)",
              width: 1
          },
      }
    }];

    let layout = {
      title: "USA COVID-19 Vaccine Distribution Map",
      showlegend: false,
      height: 600,
            width: 980,
      geo: {
        scope: "usa",
        projection: {
          type: "albersUsaTerritories"
          // "albers usa"
        },
        showland: true,
        landcolor: "rgb(217, 217, 217)",
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: "rgb(255,255,255)",
        countrycolor: "rgb(255,255,255)"
      }
    };

    Plotly.newPlot("myMap", mapData, layout);

    let update = {
      width: 900,  
      height: 600  
    };
    
    Plotly.relayout('myMap', update);
  })
  // .catch(err => console.log(err));
};

function optionChanged(cat) {
  buildMap(cat);
}

buildMap(selectedObj);





