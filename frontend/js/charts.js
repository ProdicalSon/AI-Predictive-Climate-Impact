document.addEventListener("DOMContentLoaded", async () => {
    const ctx = document.getElementById("climateChart").getContext("2d");

    try {
        const response = await fetch("http://localhost:5000/api/predictions");
        const data = await response.json();

        const locations = data.map(item => item.location);
        const temperatures = data.map(item => item.temperature);

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: locations,
                datasets: [{
                    label: "Temperature (°C)",
                    data: temperatures,
                    backgroundColor: "rgba(0, 87, 183, 0.7)"
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error loading chart data:", error);
    }
});
