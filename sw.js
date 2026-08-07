const CACHE_NAME = "portfolio-v1";

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/offline.html"
];

// Install
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

// Fetch
self.addEventListener("fetch", event => {

    if (event.request.mode === "navigate") {

        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match("/offline.html");
            })
        );

    }

});