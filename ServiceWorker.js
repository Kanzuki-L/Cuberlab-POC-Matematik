const cacheName = "Cuberlab-POC-Matematik-0.0.1";
const contentToCache = [
    "Build/f8a9cd48da2abd97611cb0f13001ac4d.loader.js",
    "Build/3acae42a723270c6c72a9e1239ed1069.framework.js.unityweb",
    "Build/5f0e72591104f8e402ebccaa50b7eb31.data.unityweb",
    "Build/8592ef3a36a8930def1d29e61ca5870c.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
