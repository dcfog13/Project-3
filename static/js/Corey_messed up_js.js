function init() {
    // Initialize dropdown menus
    let stateDropdown = d3.select("#stateDataset");
    let stateList = ['(all)','Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    for (let i=0; i < stateList.length; i++) {
        stateDropdown.append("option").text(stateList[i]);
    };
    let yearDropdown = d3.select("#yearDataset");
    let yearList = ['2018-2023','2018','2019','2020','2021','2022','2023'];
    for (let i=0; i < yearList.length; i++) {
        yearDropdown.append("option").text(yearList[i]);
    };
    // Initialize functions with default entries
    getInfo('(all)','2018-2023');
    barChart('(all)','2018-2023');
    pieChart('(all)','2018-2023')

};

function getInfo(state,year) {
    d3.json("clinical.json").then((data)=> {
        // Log json
        console.log(data);
        // Set total case variables
        let totalCases = 0;
        let totalA = 0;
        let totalB = 0;
        // Logic for state/year selections
        if (state === '(all)') {
            if (year === '2018-2023') {
                // All states, all years
                for (let i=0; i < data.length; i++) {
                    totalCases += data[i].total_specimens;
                    totalA += data[i].total_a;
                    totalB += data[i].total_b;
                };
            } else {
                // All states, one year
                for (let i=0; i < data.length; i++) {
                    if (data[i].year === parseInt(year)) {
                        totalCases += data[i].total_specimens;
                        totalA += data[i].total_a;
                        totalB += data[i].total_b;
                    };
                };
            };
        } else {
            if (year === '2018-2023') {
                // One state, all years
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        totalCases += data[i].total_specimens;
                        totalA += data[i].total_a;
                        totalB += data[i].total_b;
                    };
                };
            } else {
                // One state, one year
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        if (data[i].year === parseInt(year)) {
                            totalCases += data[i].total_specimens;
                            totalA += data[i].total_a;
                            totalB += data[i].total_b;
                        };
                    };
                };
            };
        };
        console.log(state);
        console.log(year);
        // Reset overview panel
        let Info = d3.select("#sample-metadata");
        Info.html("");
        // Create key-value pair
        let totalCasesKey = {};
        totalCasesKey.Total = totalCases;
        totalCasesKey.A = totalA;
        totalCasesKey.B = totalB;
        // Write to overview panel
        Object.entries(totalCasesKey).forEach((key) => {   
            Info.append("h5").text("Confirmed " + key[0] + " Cases: " + key[1] + "\n");  
        });
    });
}

function barChart(state,year) {
    d3.json("clinical.json").then((data)=> {
        // Declare arrays to hold bar chart data
        let weeks = [];
        let casesOverall = [];
        let casesA = [];
        let casesB = [];
        // Logic for state/year selections
        if (state === '(all)') {
            // Declare temp counters to total all states data
            let casesOverallCounter = 0;
            let casesACounter = 0;
            let casesBCounter = 0;
            if (year === '2018-2023') {
                // All states, all years
                let yearMarker = 2018;
                for (let i=0; i < data.length; i++) {
                    if (data[i].week === 1 && data[i].region === 'Alabama') {
                        yearMarker += 1;
                    };
                    casesOverallCounter += data[i].total_specimens;
                    casesACounter += data[i].total_a;
                    casesBCounter += data[i].total_b;
                    if (i === data.length-1) {
                        weeks.push(data[i].week.toString() + "-" + yearMarker.toString());
                        casesOverall.push(casesOverallCounter);
                        casesA.push(casesACounter);
                        casesB.push(casesBCounter);
                        casesOverallCounter = 0;
                        casesACounter = 0;
                        casesBCounter = 0;
                    } else if (data[i+1].week != data[i].week) {
                        weeks.push(data[i].week.toString() + "-" + yearMarker.toString());
                        casesOverall.push(casesOverallCounter);
                        casesA.push(casesACounter);
                        casesB.push(casesBCounter);
                        casesOverallCounter = 0;
                        casesACounter = 0;
                        casesBCounter = 0;
                    };
                };
            } else {
                // All states, one year
                for (let i=0; i < data.length; i++) {
                    casesOverallCounter += data[i].total_specimens;
                    casesACounter += data[i].total_a;
                    casesBCounter += data[i].total_b;
                    if (i === data.length-1) {
                        weeks.push(data[i].week.toString());
                        casesOverall.push(casesOverallCounter);
                        casesA.push(casesACounter);
                        casesB.push(casesBCounter);
                        casesOverallCounter = 0;
                        casesACounter = 0;
                        casesBCounter = 0;
                    } else if (data[i+1].week != data[i].week) {
                        weeks.push(data[i].week.toString());
                        casesOverall.push(casesOverallCounter);
                        casesA.push(casesACounter);
                        casesB.push(casesBCounter);
                        casesOverallCounter = 0;
                        casesACounter = 0;
                        casesBCounter = 0;
                    };
                };
            };
        } else {
            if (year === '2018-2023') {
                // One state, all years
                let yearMarker = 2018;
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        if (data[i].week === 1) {
                            yearMarker += 1;
                        };
                        weeks.push(data[i].week.toString() + "-" + yearMarker.toString());
                        casesOverall.push(data[i].total_specimens);
                        casesA.push(data[i].total_a);
                        casesB.push(data[i].total_b);
                    };
                };
            } else {
                // One state, one year
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        if (data[i].year === parseInt(year)) {
                            weeks.push(data[i].week.toString());
                            casesOverall.push(data[i].total_specimens);
                            casesA.push(data[i].total_a);
                            casesB.push(data[i].total_b);
                        };
                    };
                };
            };
        };
        console.log(casesA);
        console.log(casesB);
        // Create traces for both A and B variants
        let trace1 = {
            x: weeks,
            y: casesA,
            name: 'Confirmed A Cases',
            type: 'bar'
        };
        let trace2 = {
            x: weeks,
            y: casesB,
            name: 'Confirmed B Cases',
            type: 'bar'
        };
        let barData = [trace1, trace2];
        let layout = {
            title: 'Confirmed Weekly A and B Cases',
            barmode: 'stack'
        };
        // Create plot
        Plotly.newPlot('bar',barData,layout);
    });
};

// Corey
function pieChart(state,year) {
    d3.json("clinical.json").then((data)=> {
        // Declare arrays to hold bar chart data
        let weeks = [];
        let casesOverall = [];
        let percA = [];
        let percB = [];
        // Logic for state/year selections
        if (state === '(all)') {
            // Declare temp counters to total all states data
            let casesOverallCounter = 0;
            let percACounter = 0;
            let percBCounter = 0;
            if (year === '2018-2023') {
                // All states, all years
                let yearMarker = 2018;
                for (let i=0; i < data.length; i++) {
                    if (data[i].week === 1 && data[i].region === 'Alabama') {
                        yearMarker += 1;
                    };
                    casesOverallCounter += data[i].total_specimens;
                    percACounter += data[i].percent_a;
                    percBCounter += data[i].percent_b;
                    if (i === data.length-1) {
                        weeks.push(data[i].week.toString() + "-" + yearMarker.toString());
                        casesOverall.push(casesOverallCounter);
                        percA.push(percACounter);
                        percB.push(percBCounter);
                        casesOverallCounter = 0;
                        percACounter = 0;
                        percBCounter = 0;
                    } else if (data[i+1].week != data[i].week) {
                        weeks.push(data[i].week.toString() + "-" + yearMarker.toString());
                        casesOverall.push(casesOverallCounter);
                        percA.push(percACounter);
                        percB.push(percBCounter);
                        casesOverallCounter = 0;
                        percACounter = 0;
                        percBCounter = 0;
                    };
                };
            } else {
                // All states, one year
                for (let i=0; i < data.length; i++) {
                    casesOverallCounter += data[i].total_specimens;
                    percACounter += data[i].percent_a;
                    percBCounter += data[i].percent_b;
                    if (i === data.length-1) {
                        weeks.push(data[i].week.toString());
                        casesOverall.push(casesOverallCounter);
                        percA.push(percACounter);
                        percB.push(percBCounter);
                        casesOverallCounter = 0;
                        percACounter = 0;
                        percBCounter = 0;
                    } else if (data[i+1].week != data[i].week) {
                        weeks.push(data[i].week.toString());
                        casesOverall.push(casesOverallCounter);
                        percA.push(percACounter);
                        percB.push(percBCounter);
                        casesOverallCounter = 0;
                        percACounter = 0;
                        percBCounter = 0;
                    };
                };
            };
        } else {
            if (year === '2018-2023') {
                // One state, all years
                let yearMarker = 2018;
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        if (data[i].week === 1) {
                            yearMarker += 1;
                        };
                        weeks.push(data[i].week.toString() + "-" + yearMarker.toString());
                        casesOverall.push(data[i].total_specimens);
                        percA.push(data[i].percent_a);
                        percB.push(data[i].percent_b);
                    };
                };
            } else {
                // One state, one year
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        if (data[i].year === parseInt(year)) {
                            weeks.push(data[i].week.toString());
                            casesOverall.push(data[i].total_specimens);
                            percA.push(data[i].perc_a);
                            percB.push(data[i].perc_b);
                        };
                    };
                };
            };
        };
        console.log(percA);
        console.log(percB);
        // Create traces for both A and B variants
        let trace1 = {
            labels: regions,
            values: percA,
            name: 'Percent A Cases',
            type: 'pie'
        };
        let trace2 = {
            labels: regions,
            values: percB,
            name: 'Percent B Cases',
            type: 'pie'
        };
        let pieData = [trace1, trace2];
        let layout = {
            title: 'Percent A and B Cases',
        };
        // Create plot
        Plotly.newPlot('pie',pieData,layout);
    });
};

function optionChanged(state,year) {
    // Change data and plots on state or year change
    year = '2018-2023';
    getInfo(state,year);
    barChart(state,year);
    pieChart(state,year);

};


init();