document.addEventListener("DOMContentLoaded", async() => {
    const ctxBar = document.getElementById("climateChart").getContext("2d");
    const ctxLine = document.getElementById("trendChart").getContext("2d");
    const ctxPie = document.getElementById("impactChart").getContext("2d");
    const citySelector = document.getElementById("citySelector");

    try {
        const response = await fetch("http://127.0.0.1:5000/api/predictions");
        let data = await response.json();

        // Populate dropdown
        citySelector.innerHTML = `<option value="all">All Cities</option>`;
        data.forEach(item => {
            citySelector.innerHTML += `<option value="${item.location}">${item.location}</option>`;
        });

        function updateCharts(filteredData) {
            const locations = filteredData.map(item => item.location);
            const temperatures = filteredData.map(item => item.temperature);
            const rainfall = filteredData.map(item => item.rainfall);
            const impactLevels = filteredData.map(item => item.impact_level);

            const impactCounts = { Low: 0, Moderate: 0, Severe: 0 };
            impactLevels.forEach(level => impactCounts[level]++);

            // Bar Chart (Temperature & Rainfall)
            new Chart(ctxBar, {
                type: "bar",
                data: {
                    labels: locations,
                    datasets: [{
                            label: "Temperature (°C)",
                            data: temperatures,
                            backgroundColor: "rgba(0, 87, 183, 0.7)"
                        },
                        {
                            label: "Rainfall (mm)",
                            data: rainfall,
                            backgroundColor: "rgba(255, 99, 132, 0.7)"
                        }
                    ]
                },
                options: { responsive: true }
            });

            // Line Chart (Temperature Trend)
            new Chart(ctxLine, {
                type: "line",
                data: {
                    labels: locations,
                    datasets: [{
                        label: "Temperature Trend (°C)",
                        data: temperatures,
                        borderColor: "rgba(0, 183, 87, 1)",
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: { responsive: true }
            });

            // Pie Chart (Impact Levels)
            new Chart(ctxPie, {
                type: "pie",
                data: {
                    labels: Object.keys(impactCounts),
                    datasets: [{
                        data: Object.values(impactCounts),
                        backgroundColor: ["green", "yellow", "red"]
                    }]
                },
                options: { responsive: true }
            });
        }

        updateCharts(data);

        // Filter based on city selection
        citySelector.addEventListener("change", () => {
            const selectedCity = citySelector.value;
            const filteredData = selectedCity === "all" ? data : data.filter(item => item.location === selectedCity);
            updateCharts(filteredData);
        });

    } catch (error) {
        console.error("Error loading chart data:", error);
    }
});