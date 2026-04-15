// Self-destruct: clear all caches and unregister
self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(k) {
      return Promise.all(k.map(function(n) { return caches.delete(n); }));
    }).then(function() {
      return self.registration.unregister();
    })
  );
});
self.addEventListener('fetch', function(e) { e.respondWith(fetch(e.request)); });
