const CACHE_NAME = 'elegance-salon-v2'; // PROMENJENA VERZIJA NA v2!
const urlsToCache = [
    '/',
    '/index.html',
    '/style-v2.css',
    '/script.js',
    '/manifest.json',
    '/images/pozadina.jpg',
    '/images/sisanje.jpg',
    '/images/farbanje.jpg',
    '/images/svecane-frizure.jpg',
    '/images/frizura1.jpg',
    '/images/frizura2.jpg',
    '/images/frizura3.jpg',
    '/images/frizura4.jpg',
    '/icons/android-chrome-192x192.png',
    '/icons/android-chrome-512x512.png'
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

// Presretanje zahteva - sa izuzetkom za Live Server
self.addEventListener('fetch', event => {
    // Ako je zahtev od Live Server-a, ignoriši ga i pusti da prođe
    if (event.request.url.includes('socket.io')) {
        return;
    }

    event.respondWith(
        fetch(event.request).catch(() => {
            // Ako preuzimanje sa mreže ne uspe, nađi odgovor u kešu.
            return caches.match(event.request);
        })
    );
});