// Bump the version (e.g. counter-v2) to force re-caching after updating assets
const CACHE_NAME = 'counter-v1';
const ASSETS = ['./', './index.html', './styles.css', './manifest.json'];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(c => c.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        Promise.all([
            caches.keys().then(keys =>
                Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
            ),
            self.clients.claim()
        ])
    );
});

self.addEventListener('fetch', (e) => {
    // Only handle GET requests; let non-GET requests fall through to the network.
    if (e.request.method !== 'GET') {
        return;
    }

    // For navigations, try the network first and fall back to the cached app shell.
    if (e.request.mode === 'navigate') {
        e.respondWith(
            fetch(e.request).catch(() =>
                caches.match('./index.html').then((response) => response || caches.match('./'))
            )
        );
        return;
    }

    // For other GET requests (assets), use cache first, then network.
    e.respondWith(
        caches.match(e.request)
            .then((response) => response || fetch(e.request))
            // On failure, fall back to any cached response instead of a generic text/plain 503.
            .catch(() => caches.match(e.request))
    );
});
