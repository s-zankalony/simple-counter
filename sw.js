// Bump the version (e.g. counter-v2) to force re-caching after updating assets
const CACHE_NAME = 'counter-v1';
const ASSETS = ['./', './index.html', './styles.css'];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(r => r || fetch(e.request))
            .catch(() => new Response('Offline — please reconnect and reload.', {
                status: 503,
                headers: { 'Content-Type': 'text/plain' }
            }))
    );
});
