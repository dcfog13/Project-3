const url = "clinical.json";

// Function to initialize dropdowns and dashboard
function initializeDashboard() {
    let stateDropdown = d3.select("#selstateDataset");
    let yearDropdown = d3.select("#selyearDataset");

    // Load data and populate dropdowns
    d3.json(url).then((data) => {
        // Assuming data contains states and years information
        let states = [...new Set(data.map(entry => entry.region))];
        let years = [...new Set(data.map(entry => entry.year))];

        states.forEach(state => stateDropdown.append("option").text(state));
        years.forEach(year => yearDropdown.append("option").text(year));

        // Call functions with default entries
        optionChanged();
    });
}

// Function to update bubble chart based on dropdown selections
function optionChanged() {
    let selectedState = d3.select("#selstateDataset").property("value");
    let selectedYear = parseInt(d3.select("#selyearDataset").property("value"));

    d3.json(url).then((data) => {
        // Filter data based on selected state and year
        let filteredData = data.filter(entry => {
            return (entry.region === selectedState || selectedState === "All") &&
                (entry.year === selectedYear || selectedYear === 0);
        });

        // Create bubble chart data
        let bubbleData = {
            x: filteredData.map(entry => entry.total_specimens),
            y: filteredData.map(entry => entry.percent_positive),
            text: filteredData.map(entry => `${entry.region}, ${entry.year}, Week ${entry.week}`),
            mode: 'markers',
            marker: {
                size: filteredData.map(entry => entry.total_a + entry.total_b),
                color: filteredData.map(entry => entry.total_a),
                colorscale: 'Viridis',
                opacity: 0.5,
            }
        };

        // Layout for the bubble chart
        let layout = {
            title: 'Flu Data Bubble Chart',
            xaxis: { title: 'Total Specimens' },
            yaxis: { title: 'Percent Positive' }
        };

        // Plot bubble chart
        Plotly.newPlot('bubble', [bubbleData], layout);
    });
}

// Call initializeDashboard function when the page loads
initializeDashboard();


function getInfo(state, year, data) {
    // Use the passed data directly, no need for another d3.json call
    let totalCases = 0;
    let totalA = 0;
    let totalB = 0;

    if (state === '(all)') {
        if (year === '2018-2023') {
            // All states, all years
            for (let i = 0; i < data.length; i++) {
                totalCases += data[i].total_specimens;
                totalA += data[i].total_a;
                totalB += data[i].total_b;
            }
        } else {
            // All states, one year
            for (let i = 0; i < data.length; i++) {
                if (data[i].year === parseInt(year)) {
                    totalCases += data[i].total_specimens;
                    totalA += data[i].total_a;
                    totalB += data[i].total_b;
                }
            }
        }
    } else {
        if (year === '2018-2023') {
            // One state, all years
            for (let i = 0; i < data.length; i++) {
                if (data[i].region === state) {
                    totalCases += data[i].total_specimens;
                    totalA += data[i].total_a;
                    totalB += data[i].total_b;
                }
            }
        } else {
            // One state, one year
            for (let i = 0; i < data.length; i++) {
                if (data[i].region === state && data[i].year === parseInt(year)) {
                    totalCases += data[i].total_specimens;
                    totalA += data[i].total_a;
                    totalB += data[i].total_b;
                }
            }
        }
    }

    console.log(state);
    console.log(year);

    let Info = d3.select("#sample-metadata");
    Info.html("");

    let totalCasesKey = {
        Total: totalCases,
        A: totalA,
        B: totalB,
    };

    Object.entries(totalCasesKey).forEach((key) => {
        Info.append("h5").text("Confirmed " + key[0] + " Cases: " + key[1] + "\n");
    });
}

function buildBubbleChart(sample, data) {
    let sampleData = data.samples.find(item => item.id === sample);

    let otu_ids = sampleData.otu_ids;
    let otu_labels = sampleData.otu_labels;
    let sample_values = sampleData.sample_values;

    let trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
        }
    };

    let layout = {
        title: "Bacteria Per Sample",
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
    };

    Plotly.newPlot("bubble", [trace1], layout)
}

function optionChanged(value, data) {
    buildBubbleChart(value, data);
}

function initializeDashboard() {
    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {
        let names = data.names;

        names.forEach((id) => {
            dropdownMenu.append("option")
                .text(id)
                .property("value", id);
        });

        dropdownMenu.on("change", function () {
            let selectedSample = d3.select(this).property("value");
            optionChanged(selectedSample, data);
        });

        let sample_one = names[0];
        buildBubbleChart(sample_one, data);
    });
}

initializeDropdowns();
initializeDashboard();
