// base url for API call
let url="/api/v1.0/monthly"

// function to create plots based on State
function createPlots(State) {

    // querry API using base url
    d3.json(url).then(function(data) {

        // filter data by State and use the filter to extract need information to build charts
        let covidData = data.filter(item => item.State.toString() === State);
        console.log(covidData);

        // create empy list and append states to it
        let states = [];
        covidData.forEach(item => states.push(item.State));
        console.log(states);

        // append average cases to an empty list
        let averageCases = [];
        covidData.forEach(item => averageCases.push(item.Average_cases));
        console.log(averageCases);

        // append dates to an empty list
        let dates= [];
        covidData.forEach(item => dates.push(item.Date));
        console.log(dates);

        // append average deaths to an empty list
        let averageDeaths = [];
        covidData.forEach(item => averageDeaths.push(item.Average_death));
        console.log(averageDeaths);

        // append death percentage to an empty list
        let deathPercent = [];
        covidData.forEach(item => deathPercent.push(item.Death_percent));
        console.log(deathPercent);
        
        // build horizontal bar chart to show monthly status
        let barTrace = {
            x: averageCases.reverse(),
            y: dates.reverse(),
            orientation: 'h',
            type: 'bar',
            text: averageDeaths.reverse()
        };

        let dataTrace = [barTrace];
    
        let barLayout = {
            title: "COVID-19 Average Cases And Deaths",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
    
        Plotly.newPlot('bar', dataTrace, barLayout); 

       // build gauge chart t show recovery percentage   
        let filteredRecovery = covidData.filter(item => item.State.toString() === State);
        console.log(filteredRecovery);

        // append recovery percentage to an empty list
        let recovery = [];
        filteredRecovery.forEach(item => recovery.push(item.Recovery_percent));
        console.log(recovery);

        // Enter the recovery between 0 and 180
        let level = parseFloat(recovery)*1.7;

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
                text: ["99-100", "98-99", "97-98", "96-97", "95-96", "94-95", "93-94", "92-93", "91-92", "90-91", ""],
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
                labels: ["99-100", "98-99", "97-98", "96-97", "95-96", "94-95", "93-94", "92-93", "91-92", "90-91", ""],
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

        // build line chart to show trend of average cases and death percentage during time period
       let lineTrace = {
           x: dates,
           y: averageCases,
           mode: "lines",
           marker: {
               size:averageCases ,
            //    color: averageDeaths
           },
           text: deathPercent.reverse()
       };

       let lineData = [lineTrace];

       let lineLayout = {
           xaxis: {title: "Dates"},
           yaxis: {title: "Average Cases"},
           height: 500,
           width: 900,
           title: "State Covid-19 Curve 'Average Cases and Death Percent'"
        };

       Plotly.newPlot('line', lineData, lineLayout);
    }).catch(err => console.log(err));
};

// function to display pandemic data information for selected State..
function createData(State) {

    // API call
    d3.json(url).then(data => {
        let dataCopy1 = data;

        // filter by State and use filter to generate needed data
        let filteredData = dataCopy1.filter(item => item.State.toString() === State)[12];
        console.log(filteredData);
        
        // build pandemic data for selected state
        let stateInfo = d3.select("#sample-metadata");
        stateInfo.html("");
        Object.entries(filteredData).forEach(key => {
            stateInfo
                .append("h5")
                .text(key[0] + ": " + key[1])         
        });
    });
};

// update function for state selection button..
function optionChanged(State) {
    createPlots(State);
    createData(State);
}

// fuction to calculate unique characters in a string
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// intial function for updating charts based on State selected..
function init() {
    let stateIdButton = d3.select("#selDataset");

    // API call
    d3.json(url).then(function(data) {
        let dataCopy2 = data;
        console.log(dataCopy2);

        // append states in an smpty list
        let states = [];
        dataCopy2.forEach(item => states.push(item.State));

        // select only unique state names
        let uniqueStates = states.filter((onlyUnique));
        console.log(uniqueStates);

        // update values based on selected state
        uniqueStates.forEach(name => {
        stateIdButton.append("option")         
            .text(name)        
            .property("value")
    
    });
        
        // call functions to build charts and state data based on selected state
        createPlots(uniqueStates[0]);
        createData(uniqueStates[0]);
    });
};

// execute initial function
init();