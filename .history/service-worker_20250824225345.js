const CACHE_NAME = 'elegance-salon-v4'; // <-- NOVA VERZIJA!
const urlsToCache = [
    '/',
    'index.html',
    'style-v2.css',
    'script.js',
    'manifest.json',
    'images/pozadina.jpg',
    'images/sisanje.jpg',
    'images/farbanje.jpg',
    'images/svecane-frizure.jpg',
    'images/frizura1.jpg',
    'images/frizura2.jpg',
    'images/frizura3.jpg',
    'images/frizura4.jpg',
    'icons/android-chrome-192x192.png',
    'icons/android-chrome-512x512.png'
];

// Instalacija i keširanje
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// Aktivacija i čišćenje starih keševa
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Presretanje zahteva - Network falling back to cache
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});