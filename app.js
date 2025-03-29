let airports = {};

// Load airport data from cache or network
async function loadAirports() {
    try {
        const cache = await caches.open("airport-buddy-cache-v1");
        const cachedResponse = await cache.match("./airports.json");

        if (cachedResponse) {
            airports = await cachedResponse.json();
        } else {
            const response = await fetch("./airports.json");
            airports = await response.json();
        }
    } catch (error) {
        console.error("Error loading airport data:", error);
    }
}

function searchAirport() {
    const input = document.getElementById("airportCodeInput").value.trim().toUpperCase();
    const resultElement = document.getElementById("result");

    if (input === "") {
        resultElement.textContent = "Please enter an airport code.";
        return;
    }

    const airport = airports[input];
    if (airport) {
        resultElement.textContent = `${input}: ${airport}`;
    } else {
        resultElement.textContent = "Airport code not found.";
    }
}

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./service-worker.js")
        .then(() => console.log("Service Worker Registered"))
        .catch(error => console.error("Service Worker Registration Failed:", error));
}

// Load data when the page is loaded
window.onload = loadAirports;
