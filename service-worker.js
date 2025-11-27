const CACHE_NAME = "tarot-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./icon.png"
];

// 安裝 SW，並快取資源
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// 啟用 SW
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => 
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// 攔截網路請求，提供快取資源
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});