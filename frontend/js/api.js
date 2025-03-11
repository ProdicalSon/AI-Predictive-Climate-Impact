document.addEventListener("DOMContentLoaded", () => {
    const fetchDataBtn = document.getElementById("fetchData");
    const tableBody = document.querySelector("#predictionTable tbody");

    fetchDataBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("http://localhost:5000/api/predictions"); // Backend API
            const data = await response.json();

            tableBody.innerHTML = ""; // Clear existing data

            data.forEach(prediction => {
                const row = `
                    <tr>
                        <td>${prediction.location}</td>
                        <td>${prediction.temperature}°C</td>
                        <td>${prediction.rainfall} mm</td>
                        <td>${prediction.impact_level}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });
});
