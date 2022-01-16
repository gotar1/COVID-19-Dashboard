// Store our API endpoint inside queryUrl
let url="/api/v1.0/vaccine"
console.log("hello");

// d3.json(url2, function(dog) {
//   console.log(dog);

// });

let dropItems = ['Total Vaccine Doses Distibuted', 'Vaccine Distributed per 100k', 'Total Vaccine Doses Administered', 'Vaccine Administered per 100k']
let dataSet = {'Total Vaccine Doses Distibuted':'vac_dist', 'Vaccine Distributed per 100k':'vac_per_100k', 'Total Vaccine Doses Administered': 'vac_admin', 'Vaccine Administered per 100k': 'admin_per_100k'}

// dropItems.forEach(dropDownMenu => {
//     d3.select("#selDataset")
//     // option is the html element
//     .append("option")
//     .text(dropDownMenu)
//     .property("value")
// });
// listens for when there is a change to the selDataset, when there is a change then it runs function updateDisplay
// d3.selectAll('#selDataset').on("change", handleSubmit); 
// function handleSubmit() {
//     // use this to prevent the page from refreshing... may or may not be necessary.
//     // d3.event.preventDefault();
//     // select the value from the dropdown.node().value
//     selectedId = d3.select('#selDataset').node().value;
//     let selectedObj = dataSet[selectedId] 
//     console.log(selectedObj);
//     // build map
//     buildMap(selectedObj);
// };

function buildMap(cat) {

  // Perform a GET request to the query URL
  d3.json(url, function(data) {
    // console.log(data);

    // Next two functions to return data for last month only.

    //It will return dates diff in no. if months
    // function monthDiff(d1, d2) {
    //   let months;
    //   months = (d2.getFullYear() - d1.getFullYear()) * 12;
    //   months -= d1.getMonth() + 1;
    //   months += d2.getMonth(); 
    //   return months <= 0 ? 0 : months;
    // };
    // //It will gets the last month date
    // function getLastMonth(){
    //   let x = new Date();
    //   x.setDate(1);
    //   x.setMonth(x.getMonth()-1);
    //   return x;
    // };
    // let prevMonthDate = getLastMonth();
    // let lastMonthData = data.filter(function(v){
    //   return monthDiff(new Date(v.Date),prevMonthDate) < 1;
    // });

    //This is the data for last one Month
    // console.log(lastMonthData);

    let mapElement = {'state_name':[],
                      'vac_dist':[],
                      'vac_per_100k':[],
                      'vac_admin':[],
                      'admin_per_100k':[]
                    //   'total_recovery':[]
    };
    data.forEach(item => {
      mapElement.state_name.push(item.State),
      mapElement.vac_dist.push(item.Distributed),
      mapElement.vac_per_100k.push(item.Dist_per_100k)
      mapElement.vac_admin.push(item.Administered),
      mapElement.admin_per_100k.push(item.Admin_per_100k)
    //   mapElement.total_death.push(item.Total_death)
    });

    // let hoverText = mapElement['total_death'];
    // console.log(hoverText);
    // console.log(mapElement['state_name']);
    // console.log(mapElement[cat]);

    let mapData = [{
      type: "choropleth",
      locationmode: "USA-states",
      locations: mapElement['state_name'],
      // geojson: mapElement['state_name'],
      z: mapElement[cat],
      color: mapElement['vac_dist'],
      text: mapElement['state_name'],
      // mode: 'text',
      // hoverinfo: "z",
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

function handleSubmit() {
    // use this to prevent the page from refreshing... may or may not be necessary.
    // d3.event.preventDefault();
    // select the value from the dropdown.node().value
    selectedId = d3.select('#selDataset').node().value;
    let selectedObj = dataSet[selectedId] 
    // console.log(selectedObj);
    // build map
    buildMap(selectedObj)[0];
};

d3.selectAll('#selDataset').on("change", handleSubmit); 

function init() {
  let dataButton = d3.select("#selDataset");

  dropItems.forEach(dropDownMenu => {
    // option is the html element
    dataButton.append("option")
      .text(dropDownMenu)
      .property("value")
  });

  buildMap(dropItems)
};

init();

buildMap();





