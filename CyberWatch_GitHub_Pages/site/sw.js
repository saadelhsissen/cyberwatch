const CACHE = 'cyberwatch-v1';
const SHELL = ['./','./index.html','./assets/styles.css','./assets/app.js','./manifest.webmanifest'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  const url = new URL(event.request.url);
  if(url.pathname.endsWith('/data/articles.json')) {
    event.respondWith(fetch(event.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return res;}).catch(()=>caches.match(event.request)));
  } else {
    event.respondWith(caches.match(event.request).then(cached=>cached || fetch(event.request)));
  }
});
