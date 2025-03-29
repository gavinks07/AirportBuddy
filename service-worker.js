const CACHE_NAME = "airport-buddy-cache-v1";
const urlsToCache = [
    "./index.html",
    "./styles.css",
    "./app.js",
    "./airports.json",
    "./manifest.json",
    "./images/icon-192.png",
    "./images/icon-512.png"
];

// Install Service Worker and Cache Files
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Serve Cached Files When Offline
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
