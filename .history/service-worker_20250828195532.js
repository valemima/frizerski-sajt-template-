const CACHE_NAME = 'elegance-salon-v3'; // Povećao sam verziju na v3!
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

// PRESRETANJE ZAHTEVA - ISPRAVLJENA VERZIJA
self.addEventListener('fetch', event => {
    // Ignoriši zahteve koje ne želiš da keširaš (npr. Live Server)
    if (event.request.url.includes('socket.io')) {
        return;
    }

    event.respondWith(
        // 2. Prvo pokušaj da preuzmeš sa mreže (najsvežiji podaci)
        fetch(event.request)
            .then(networkResponse => {
                // Uspeo si da preuzmeš sa neta
                // Opciono: Ako je response dobar, ažuriraj keš
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                }
                return networkResponse; // Vrati podatke sa mreže
            })
            .catch(() => {
                // Ako mreža ne uspe, pokušaj iz keša
                return caches.match(event.request)
                    .then(cachedResponse => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        // Ako nema ni u kešu, vrati 'Offline' response
                        return new Response('Offline');
                    });
            })
    );
});