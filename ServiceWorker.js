const cacheName = "Cuberlab-POC-Matematik-0.0.1";
const contentToCache = [
    "Build/84ebafb0d096faa64bbe52ca7686ffd9.loader.js",
    "Build/3acae42a723270c6c72a9e1239ed1069.framework.js.unityweb",
    "Build/1d3b932153c74083d2b6d0817fefd7ff.data.unityweb",
    "Build/4e2587672032964fe42efdd52c0f7715.wasm.unityweb",
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
