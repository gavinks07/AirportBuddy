let airports = {};

// Load airport data before search
async function loadAirports() {
    try {
        const response = await fetch("airports.json");
        airports = await response.json();
        console.log("Airport data loaded successfully.");
    } catch (error) {
        console.error("Error loading airport data:", error);
    }
}

// Search function
function searchAirport() {
    const input = document.getElementById("airportCodeInput").value.trim().toUpperCase();
    const resultElement = document.getElementById("result");

    if (input === "") {
        resultElement.textContent = "Please enter an airport code.";
        return;
    }

    // Find the airport by ICAO or IATA
    let airport = airports[input] || Object.values(airports).find(a => a.iata === input);

    if (airport) {
        resultElement.innerHTML = `
            <strong>${airport.name}</strong><br>
            <b>ICAO:</b> ${airport.icao} | <b>IATA:</b> ${airport.iata}<br>
            <b>City:</b> ${airport.city}, ${airport.state || airport.country}<br>
            <b>Elevation:</b> ${airport.elevation} ft<br>
            <b>Coordinates:</b> ${airport.lat}, ${airport.lon}<br>
            <b>Time Zone:</b> ${airport.tz}
        `;
    } else {
        resultElement.textContent = "Airport code not found.";
    }
}

// Allow pressing "Enter" to search
document.getElementById("airportCodeInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchAirport();
    }
});

// Limit the input to 4 characters and allow only letters and numbers
document.getElementById("airportCodeInput").addEventListener("input", function(event) {
    const input = event.target.value;
    const sanitizedInput = input.replace(/[^A-Za-z0-9]/g, "").slice(0, 4); // Allow only letters and numbers, max 4 characters
    event.target.value = sanitizedInput;
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker Registered"))
        .catch(error => console.error("Service Worker Registration Failed:", error));
}

// Load data on page load
window.onload = function() {
    loadAirports();
    document.getElementById("searchButton").addEventListener("click", searchAirport);
};
