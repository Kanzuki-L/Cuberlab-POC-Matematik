const cacheName = "Cuberlab-POC-Matematik-0.0.1";
const contentToCache = [
    "Build/59bc3d745da429681080f3722415b6dd.loader.js",
    "Build/df1dfb0c2d397f8888b8dbffd6cf4568.framework.js.unityweb",
    "Build/baa0a2bcdaec6d93deb338f4f494c751.data.unityweb",
    "Build/23030616d36fb2d84f75e8441abe9860.wasm.unityweb",
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
