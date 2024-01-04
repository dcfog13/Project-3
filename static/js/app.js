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
    // Call plotting functions
    getInfo('(all)','2018-2023');
    barChart('(all)','2018-2023');

};

function getInfo(state,year) {
    d3.json("clinical.json").then((data)=> {
        let totalCases = 0;
        let totalA = 0;
        let totalB = 0;
        if (state === '(all)') {
            if (year === '2018-2023') {
                for (let i=0; i < data.length; i++) {
                    totalCases += data[i].total_specimens;
                    totalA += data[i].total_a;
                    totalB += data[i].total_b;
                };
            } else {

            };
        } else {
            if (year === '2018-2023') {

            } else {

            };
        };
        let Info = d3.select("#sample-metadata");
        Info.html("");
        Object.entries(totalCases).forEach((key) => {   
            Info.append("h5").text(key[0] + ": " + key[1] + "\n");  
        });
    });
}

function barChart(state,year) {
    d3.json("clinical.json").then((data)=> {
        console.log(data);

    });
};





function optionChanged(state,year) {
    // Change demographic data and plots on state or year change
    getInfo(state,year);
    barPlot(state,year);
};

init();