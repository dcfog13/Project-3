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
    pieChart('(all)','2018-2023');
    barChart('(all)','2018-2023');
    bubblePlot('(all)','2018-2023');
};

function getInfo(state,year) {
    // Read json
    d3.json("clinical.json").then((data)=> {
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
};

function pieChart(state,year) {
    d3.json("clinical.json").then((data)=> {
        // Log json
        //console.log(data);
        // Declare variables to hold pie chart data
        let casesA = 0;
        let casesB = 0;
        if (state === '(all)') {
            if (year === '2018-2023') {
                // All states, all years
                for (let i=0; i < data.length; i++) {
                    casesA += data[i].total_a;
                    casesB += data[i].total_b;
                };
            } else {
                // All states, one year
                for (let i=0; i < data.length; i++) {
                    if (data[i].year === parseInt(year)) {
                        casesA += data[i].total_a;
                        casesB += data[i].total_b;
                    };
                };
            };
        } else {
            if (year === '2018-2023') {
                // One state, all years
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        casesA += data[i].total_a;
                        casesB += data[i].total_b;
                    };
                };
            } else {
                // One state, one year
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        if (data[i].year === parseInt(year)) {
                            casesA += data[i].total_a;
                            casesB += data[i].total_b;
                        };
                    };
                };
            };
        };
        // Set up pie chart
        let pieDataClinical = [{
            values: [casesA, casesB],
            labels: ['Confirmed A Cases', 'Confirmed B Cases'],
            type: 'pie'
        }];
        let layoutClinical = {
            title: 'Clinical Labs Data for ' + year + ' ' + state,
            height: 400,
            width: 500
        }
        // Create chart
        Plotly.newPlot('pie-clinical',pieDataClinical,layoutClinical);
    });

    d3.json("public_health.json").then((data)=> {
        // Log json
        //console.log(data);
        // Declare variables to hold pie chart data
        let a_h1n1 = 0;
        let a_h3 = 0;
        let a_noSubtype = 0;
        let b = 0;
        let bVic = 0;
        let bYam = 0;
        let h3n2v = 0;
        let totalSpecimens = 0;
        if (state === '(all)') {
            if (year === '2018-2023') {
                // All states, all years
                for (let i=0; i < data.length; i++) {
                    a_h1n1 += data[i].a_h1n1;
                    a_h3 += data[i].a_h3;
                    a_noSubtype += data[i].a_noSubtype;
                    b += data[i].b;
                    bVic += data[i].bvic;
                    bYam += data[i].byam;
                    h3n2v += data[i].h3n2v;
                    totalSpecimens += data[i].total_specimens;
                };
            } else {
                // All states, one year
                // Create new matching string to match json format
                season = "Season " + year + '-' + (parseInt(year)-1999).toString();
                // Fix for extra space at end of 2023-2024 season data
                if (year === '2023') {
                    season = season + ' ';
                };
                for (let i=0; i < data.length; i++) {
                    if (data[i].season_description === season) {
                        a_h1n1 += data[i].a_h1n1;
                        a_h3 += data[i].a_h3;
                        a_noSubtype += data[i].a_noSubtype;
                        b += data[i].b;
                        bVic += data[i].bvic;
                        bYam += data[i].byam;
                        h3n2v += data[i].h3n2v;
                        totalSpecimens += data[i].total_specimens;
                    };
                };
            };
        } else {
            if (year === '2018-2023') {
                // One state, all years
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        a_h1n1 += data[i].a_h1n1;
                        a_h3 += data[i].a_h3;
                        a_noSubtype += data[i].a_noSubtype;
                        b += data[i].b;
                        bVic += data[i].bvic;
                        bYam += data[i].byam;
                        h3n2v += data[i].h3n2v;
                        totalSpecimens += data[i].total_specimens;
                    };
                };
            } else {
                // One state, one year
                // Create new matching string to match json format
                season = "Season " + year + '-' + (parseInt(year)-1999).toString();
                // Fix for extra space at end of 2023-2024 season data
                if (year === '2023') {
                    season = season + ' ';
                };
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        if (data[i].season_description === season) {
                            a_h1n1 += data[i].a_h1n1;
                            a_h3 += data[i].a_h3;
                            a_noSubtype += data[i].a_noSubtype;
                            b += data[i].b;
                            bVic += data[i].bvic;
                            bYam += data[i].byam;
                            h3n2v += data[i].h3n2v;
                            totalSpecimens += data[i].total_specimens;
                        };
                    };
                };
            };
        };
        // Set up pie chart
        let pieDataPublic = [{
            values: [a_h1n1, a_h3, a_noSubtype, b, bVic, bYam, h3n2v],
            labels: ['A (H1N1)', 'A (H3)', 'A (Unknown Subtype)', 'B (Unknown Lineage)', 'B (Victoria Lineage)', 'B (Yamagata Lineage)', 'H3N2v'],
            type: 'pie'
        }];
        let layoutPublic = {
            title: 'Public Health Labs Data for ' + year + ' ' + state,
            height: 400,
            width: 500
        }
        // Create chart
        Plotly.newPlot('pie-public-health',pieDataPublic,layoutPublic);
    });
};

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
                    // Reset year marker on first Alabama data point of new year
                    if (data[i].week === 1 && data[i].region === 'Alabama') {
                        yearMarker += 1;
                    };
                    // Increment counters
                    casesOverallCounter += data[i].total_specimens;
                    casesACounter += data[i].total_a;
                    casesBCounter += data[i].total_b;
                    if (i === data.length-1) {
                        // Add data at end of json
                        weeks.push(data[i].week.toString() + "-" + yearMarker.toString());
                        casesOverall.push(casesOverallCounter);
                        casesA.push(casesACounter);
                        casesB.push(casesBCounter);
                        // Reset counters
                        casesOverallCounter = 0;
                        casesACounter = 0;
                        casesBCounter = 0;
                    } else if (data[i+1].week != data[i].week) {
                        // Add data at week change
                        weeks.push(data[i].week.toString() + "-" + yearMarker.toString());
                        casesOverall.push(casesOverallCounter);
                        casesA.push(casesACounter);
                        casesB.push(casesBCounter);
                        // Reset counters
                        casesOverallCounter = 0;
                        casesACounter = 0;
                        casesBCounter = 0;
                    };
                };
            } else {
                // All states, one year
                for (let i=0; i < data.length; i++) {
                    if (data[i].year === parseInt(year)) {
                        // Increment counters
                        casesOverallCounter += data[i].total_specimens;
                        casesACounter += data[i].total_a;
                        casesBCounter += data[i].total_b;
                        if (i === data.length-1) {
                            // Add data at end of json
                            weeks.push(data[i].week.toString());
                            casesOverall.push(casesOverallCounter);
                            casesA.push(casesACounter);
                            casesB.push(casesBCounter);
                            // Reset counters
                            casesOverallCounter = 0;
                            casesACounter = 0;
                            casesBCounter = 0;
                        } else if (data[i+1].week != data[i].week) {
                            // Add data at week change
                            weeks.push(data[i].week.toString());
                            casesOverall.push(casesOverallCounter);
                            casesA.push(casesACounter);
                            casesB.push(casesBCounter);
                            // Reset counters
                            casesOverallCounter = 0;
                            casesACounter = 0;
                            casesBCounter = 0;
                        };
                    };
                };
            };
        } else {
            if (year === '2018-2023') {
                // One state, all years
                let yearMarker = 2018;
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        // Advance year at each week 1
                        if (data[i].week === 1) {
                            yearMarker += 1;
                        };
                        // Add data at week change
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
                            // Add data at week change
                            weeks.push(data[i].week.toString());
                            casesOverall.push(data[i].total_specimens);
                            casesA.push(data[i].total_a);
                            casesB.push(data[i].total_b);
                        };
                    };
                };
            };
        };
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
            title: 'Confirmed Weekly A and B Cases for ' + year + ' ' + state,
            barmode: 'stack'
        };
        // Create plot
        Plotly.newPlot('bar',barData,layout);
    });
};

function bubblePlot(state,year) {
    d3.json("clinical.json").then((data)=> {
        // Declare arrays to hold bubble chart data
        let weeks = [];
        let casesOverall = [];
        let percentPositive = [];
        // Logic for state/year selections
        if (state === '(all)') {
            // Declare temp counters to total all states data
            let casesOverallCounter = 0;
            let percentPositiveCounter = 0;
            let j = 0;
            if (year === '2018-2023') {
                // All states, all years
                let yearMarker = 2018;
                for (let i=0; i < data.length; i++) {
                    // Reset year marker on first Alabama data point of new year
                    if (data[i].week === 1 && data[i].region === 'Alabama') {
                        yearMarker += 1;
                    };
                    // Increment counters (j used to calculate overall positive percentage)
                    casesOverallCounter += data[i].total_specimens;
                    percentPositiveCounter += data[i].percent_positive;
                    j += 1;
                    if (i === data.length-1) {
                        // Add data at end of json
                        weeks.push(data[i].week.toString() + "-" + yearMarker.toString());
                        casesOverall.push(casesOverallCounter);
                        percentPositive.push((percentPositiveCounter/j)/100);
                        // Reset counters
                        casesOverallCounter = 0;
                        percentPositiveCounter = 0;
                        j = 0;
                    } else if (data[i+1].week != data[i].week) {
                        // Add data at week change
                        weeks.push(data[i].week.toString() + "-" + yearMarker.toString());
                        casesOverall.push(casesOverallCounter);
                        percentPositive.push((percentPositiveCounter/j)/100);
                        // Reset counters
                        casesOverallCounter = 0;
                        percentPositiveCounter = 0;
                        j = 0;
                    };
                };
            } else {
                // All states, one year
                for (let i=0; i < data.length; i++) {
                    if (data[i].year === parseInt(year)) {
                        // Increment counters (j used to calculate overall positive percentage)
                        casesOverallCounter += data[i].total_specimens;
                        percentPositiveCounter += data[i].percent_positive;
                        j += 1;
                        if (i === data.length-1) {
                            // Add data at end of json
                            weeks.push(data[i].week.toString());
                            casesOverall.push(casesOverallCounter);
                            percentPositive.push((percentPositiveCounter/j)/100);
                            // Reset counters
                            casesOverallCounter = 0;
                            percentPositiveCounter = 0;
                            j = 0;
                        } else if (data[i+1].week != data[i].week) {
                            // Add data at week change
                            weeks.push(data[i].week.toString());
                            casesOverall.push(casesOverallCounter);
                            percentPositive.push((percentPositiveCounter/j)/100);
                            // Reset counters
                            casesOverallCounter = 0;
                            percentPositiveCounter = 0;
                            j = 0;
                        };
                    };
                };
            };
        } else {
            if (year === '2018-2023') {
                // One state, all years
                let yearMarker = 2018;
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        // Advance year at each week 1
                        if (data[i].week === 1) {
                            yearMarker += 1;
                        };
                        // Add data at week change
                        weeks.push(data[i].week.toString() + "-" + yearMarker.toString());
                        casesOverall.push(data[i].total_specimens);
                        percentPositive.push(data[i].percent_positive/100);
                    };
                };
            } else {
                // One state, one year
                for (let i=0; i < data.length; i++) {
                    if (data[i].region === state) {
                        if (data[i].year === parseInt(year)) {
                            // Add data at week change
                            weeks.push(data[i].week.toString());
                            casesOverall.push(data[i].total_specimens);
                            percentPositive.push(data[i].percent_positive/100);
                        };
                    };
                };
            };
        };
        // Create traces for both A and B variants
        let bubbleData = [{
            x: casesOverall,
            y: percentPositive,
            mode: 'markers',
            marker: {
                size: casesOverall,
                sizeref: 25,
                sizemode: 'area',
                color: percentPositive,
                colorscale: 'Jet',
                opacity: 0.75
            }
        }];
        let layout = {
            title: 'Flu Data Bubble Plot for ' + year + ' ' + state,
            xaxis: { title: 'Total Specimens'},
            yaxis: { title: 'Percent Positive'}
        };
        Plotly.newPlot('bubble',bubbleData,layout);
    });
};

function stateChanged(state) {
    // Change data and plots on state change
    year = document.getElementById("yearDataset").value.toString();
    getInfo(state,year);
    pieChart(state,year);
    barChart(state,year);
    bubblePlot(state,year);
};

function yearChanged(year) {
    // Change data and plots on year change
    state = document.getElementById("stateDataset").value;
    getInfo(state,year);
    pieChart(state,year);
    barChart(state,year);
    bubblePlot(state,year);
};

init();