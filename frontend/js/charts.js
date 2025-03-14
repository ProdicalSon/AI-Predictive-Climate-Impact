document.addEventListener("DOMContentLoaded", function() {
    const fetchDataButton = document.getElementById("fetchData");
    const citySelector = document.getElementById("citySelector");

    fetchDataButton.addEventListener("click", fetchPredictions);

    async function fetchPredictions() {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/predictions");
            const data = await response.json();
            updateTable(data);
            updateCityFilter(data);
            renderCharts(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function updateTable(data) {
        const tableBody = document.querySelector("#predictionTable tbody");
        tableBody.innerHTML = "";
        data.forEach(entry => {
            const row = `
                <tr>
                    <td>${entry.location}</td>
                    <td>${entry.temperature}°C</td>
                    <td>${entry.rainfall} mm</td>
                    <td>${entry.impact_level}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    function updateCityFilter(data) {
        const uniqueCities = [...new Set(data.map(entry => entry.location))];
        citySelector.innerHTML = '<option value="all">All Cities</option>';
        uniqueCities.forEach(city => {
            citySelector.innerHTML += `<option value="${city}">${city}</option>`;
        });

        citySelector.addEventListener("change", function() {
            const selectedCity = citySelector.value;
            const filteredData = selectedCity === "all" ?
                data :
                data.filter(entry => entry.location === selectedCity);
            updateTable(filteredData);
            renderCharts(filteredData);
        });
    }

    function renderCharts(data) {
        const labels = data.map(entry => entry.location);
        const temperatures = data.map(entry => entry.temperature);
        const rainfalls = data.map(entry => entry.rainfall);
        const impactLevels = data.map(entry => entry.impact_level);

        // Destroy existing charts before rendering new ones
        if (window.climateChart) window.climateChart.destroy();
        if (window.trendChart) window.trendChart.destroy();
        if (window.impactChart) window.impactChart.destroy();

        // Line chart for temperature trends over time
        const ctxTrend = document.getElementById("trendChart").getContext("2d");
        window.trendChart = new Chart(ctxTrend, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                        label: "Temperature (°C)",
                        data: temperatures,
                        borderColor: "blue",
                        backgroundColor: "rgba(0, 0, 255, 0.2)",
                        fill: true,
                    },
                    {
                        label: "Rainfall (mm)",
                        data: rainfalls,
                        borderColor: "green",
                        backgroundColor: "rgba(0, 255, 0, 0.2)",
                        fill: true,
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Bar chart for climate comparison
        const ctxClimate = document.getElementById("climateChart").getContext("2d");
        window.climateChart = new Chart(ctxClimate, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                        label: "Temperature (°C)",
                        data: temperatures,
                        backgroundColor: "blue"
                    },
                    {
                        label: "Rainfall (mm)",
                        data: rainfalls,
                        backgroundColor: "green"
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Pie chart for impact levels
        const impactCounts = {};
        impactLevels.forEach(level => {
            impactCounts[level] = (impactCounts[level] || 0) + 1;
        });

        const impactLabels = Object.keys(impactCounts);
        const impactValues = Object.values(impactCounts);

        const ctxImpact = document.getElementById("impactChart").getContext("2d");
        window.impactChart = new Chart(ctxImpact, {
            type: "pie",
            data: {
                labels: impactLabels,
                datasets: [{
                    data: impactValues,
                    backgroundColor: ["red", "yellow", "green"]
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});