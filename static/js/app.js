// base url for API call
let url="/api/v1.0/monthly"

// function to create plots based on State
function createPlots(State) {

    // querry API using base url
    d3.json(url).then(function(data) {

        // filter data by State and use the filter to extract need information to build charts
        let covidData = data.filter(item => item.State.toString() === State);
        // console.log(covidData);

        // create empy list and append states to it
        let states = [];
        covidData.forEach(item => states.push(item.State));
        // console.log(states);

        // append total cases to an empty list
        let totalCases = [];
        covidData.forEach(item => totalCases.push(item.Total_cases));
        // console.log(totalCases);

        // append dates to an empty list
        let dates= [];
        covidData.forEach(item => dates.push(item.Date));
        // console.log(dates);

        // append total deaths to an empty list
        let totalDeaths = [];
        covidData.forEach(item => totalDeaths.push(item.Total_death));
        // console.log(totalDeaths);

        // append death percentage to an empty list
        let deathPercent = [];
        covidData.forEach(item => deathPercent.push(item.Death_percent));
        // console.log(deathPercent);
        
        // build horizontal bar chart to show monthly status
        let barTrace = {
            x: totalCases.reverse(),
            y: dates.reverse(),
            orientation: 'h',
            type: 'bar',
            text: totalDeaths.reverse()
        };

        let dataTrace = [barTrace];
    
        let barLayout = {
            title: "COVID-19 Total Cases And Deaths",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
    
        Plotly.newPlot('bar', dataTrace, barLayout); 

        // build line chart to show trend of total cases and death percentage during time period
       let lineTrace = {
           x: dates,
           y: totalCases,
           mode: "lines",
           marker: {
               size:totalCases ,
            //    color: totalDeaths
           },
           text: deathPercent.reverse()
       };

       let lineData = [lineTrace];

       let lineLayout = {
           xaxis: {title: "Dates"},
           yaxis: {title: "Total Cases"},
           height: 500,
           width: 900,
           title: "State Covid-19 Curve 'Total Cases and Death Percent'"
        };

       Plotly.newPlot('line', lineData, lineLayout);
    }).catch(err => console.log(err));
};

// function to build gauge chart to show recovery percentage for selcted State and Date
function buildGauge(gauge) {

    // extract the recovery percent from list
    let recovery = gauge.Recovery_percent;
    // console.log(recovery);

    // Enter the recovery between 0 and 180 for the gauge needle has a 180 degrees movement
    let level = parseFloat(recovery)*1.78;

    // Trig to calc meter point
    let degrees = 180 - level;
    let radius = 0.5;
    let radians = (degrees * Math.PI) / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    let mainPath = "M -.0 -0.05 L .0 0.05 L ";
    let pathX = String(x);
    let space = " ";
    let pathY = String(y);
    let pathEnd = " Z";
    let path = mainPath.concat(pathX, space, pathY, pathEnd);
    let gaugeData = [
        {
            type: "scatter",
            x: [0],
            y: [0],
            marker: { size: 12, color: "850000" },
            showlegend: false,
            name: "Freq",
            text: level,
            hoverinfo: "text+name"
        },
        {
            values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
            rotation: 90,
            text: ["90-100", "80-90", "70-80", "60-70", "50-60", "40-50", "30-40", "20-30", "10-20", "0-10", ""],
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: [
                    "rgba(0, 100, 11, .5)",
                    "rgba(0, 105, 11, .5)",
                    "rgba(10, 120, 22, .5)",
                    "rgba(14, 127, 0, .5)",
                    "rgba(110, 154, 22, .5)",
                    "rgba(170, 202, 42, .5)",
                    "rgba(202, 209, 95, .5)",
                    "rgba(210, 206, 145, .5)",
                    "rgba(232, 226, 202, .5)",
                    "rgba(240, 230, 215, .5)",
                    "rgba(255, 255, 255, 0)"
                ]
            },
            labels: ["90-100", "80-90", "70-80", "60-70", "50-60", "40-50", "30-40", "20-30", "10-20", "0-10", ""],
            hoverinfo: "label",
            hole: 0.5,
            type: "pie",
            showlegend: false
        }
    ];

    let gaugeLayout = {
        shapes: [
            {
                type: "path",
                path: path,
                fillcolor: "850000",
                line: {
                    color: "850000"
                }
            }
        ],
        title: "<b>Recovery Percentage</b> <br> Per Total Confirmed Cases",
        height: 500,
        width: 500,
        xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        },
        yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        }           
    };

    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
};

// update function for state selection button..
function optionChanged(State) {
    createPlots(State);
    buildGauge(State);
}

// fuction to calculate unique characters in a string
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// intial function for updating charts based on State selected..
function init() {
    let stateIdButton = d3.select("#State");

    // API call
    d3.json(url).then(function(data) {
        let dataCopy2 = data;
        // console.log(dataCopy2);

        // set filteredInitData
        let filteredInitData = dataCopy2.filter(item => item.State);
        // console.log(filteredData7);

        // append states in an empty list
        let states = [];
        filteredInitData.forEach(item => states.push(item.State));

        // select only unique state names
        let uniqueStates = states.filter((onlyUnique));
        // console.log(uniqueStates);

        // update values based on selected state
        uniqueStates.forEach(name => {
            // console.log(name)
        stateIdButton.append("option")         
            .text(name)        
            .property("value")
    
    });
        
        // call functions to build charts of selected State
        createPlots(uniqueStates[0]);

        // initialize the demographic info and gauge chart
        createData(filteredInitData[0]);
        buildGauge(filteredInitData[0]);
    }).catch(err => console.log(err));
};
// execute intial function
init();

// intial function for updating COVID-19 information based on Date selected..
function demoInit() {
    let dateIdButton = d3.select("#Date");
    d3.json(url).then(function(data) {
        let dataCopy3 = data;

        // append dates in an smpty list
        let dates = [];
        dataCopy3.forEach(item => dates.push(item.Date));
        // console.log(dates);

        // select only unique dates
        let uniqueDates = dates.filter((onlyUnique));
        // console.log(uniqueDates)

        // update values based on selected date
        uniqueDates.forEach(date => {
            dateIdButton
                .append("option")         
                .text(date)        
                .property("value")
        });
    }).catch(err => console.log(err));     
};
// execute intial function
demoInit();

// here we are gonna build a filter to store State and Date from select buttons 
// empty holder for filtered values
let filters = {};
// console.log(filters);

// function to update filters list
function updateFilters() {
  // Save the element, value, and id of the filter that was changed
  let changedElement = d3.select(this).select("select");
  let elementValue = changedElement.property("value");
  let filterId = changedElement.attr("id");

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (elementValue) {
    filters[filterId] = elementValue;
    console.log(filters)
  }
  else {
    delete filters[filterId];
  }

  // Call function to apply all filters and rebuild the demographic info
  filterDemo();
}

// function to apply all filters and rebuild the demographic info
function filterDemo() {
    d3.json(url).then(function(data) {
        let dataCopy5 = data;

        // Set the filteredDemoData
        let filteredDemoData = dataCopy5.filter(item => item.State);
        // console.log(filteredDemoData)

        // Loop through all of the filters and keep any data that
        // matches the filter values
        Object.entries(filters).forEach(([key, value]) => {
        filteredDemoData = filteredDemoData.filter(row => row[key] === value);
        // console.log(filteredDemoData)
        });

        // Finally, rebuild the demographic info and gauge using the filtered Data
        createData(filteredDemoData[0]);
        buildGauge(filteredDemoData[0]);
    }).catch(err => console.log(err));
};

// function to create pandemic data information for selected State and Date..
function createData(file) {
    
    // build pandemic data for selected filtered state and date
    let stateInfo = d3.select("#sample-statedata");
    stateInfo.html("");
    Object.entries(file).forEach(key => {
        stateInfo
            .append("h5")
            .text(key[0] + ": " + key[1])         
    });

};

// Attach an event to listen for changes to each filter
d3.selectAll(".well").on("change", updateFilters);


