const cacheName = "Cuberlab-POC-Matematik-0.0.1";
const contentToCache = [
    "Build/f8571913e6247e4f9f779d12a49aca95.loader.js",
    "Build/df1dfb0c2d397f8888b8dbffd6cf4568.framework.js.unityweb",
    "Build/8d4997cddf55ab62bdb04dc9da16ea1c.data.unityweb",
    "Build/dfcab67bcd5ce2cb69ec0192a030ece3.wasm.unityweb",
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
