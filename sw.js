// Network-first for HTML documents so OTA updates appear immediately on app launch
self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.mode === "navigate" || (req.headers.get("accept") || "").indexOf("text/html") !== -1) {
    event.respondWith(
      fetch(req, { cache: "no-store" })
        .then(function (res) {
          var copy = res.clone();
          caches.open("bangla-ocr-v20261120212614").then(function (c) { c.put(req, copy); });
          return res;
        })
        .catch(function () { return caches.match(req); })
    );
  }
});
// Network-first for HTML documents so OTA updates appear immediately on app launch
self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.mode === "navigate" || (req.headers.get("accept") || "").indexOf("text/html") !== -1) {
    event.respondWith(
      fetch(req, { cache: "no-store" })
        .then(function (res) {
          var copy = res.clone();
          caches.open("bangla-ocr-v20261120212614").then(function (c) { c.put(req, copy); });
          return res;
        })
        .catch(function () { return caches.match(req); })
    );
  }
});
const CACHE_NAME = "bangla-ocr-v20261120212614";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-512.png",
  "./class_names.json",
  "./tfjs_model/model.json",
  "./tfjs_model/group1-shard1of1.bin",
  "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cached => {
      return cached || fetch(event.request);
    })
  );
});