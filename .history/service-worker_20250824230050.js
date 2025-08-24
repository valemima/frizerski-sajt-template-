const CACHE_NAME = 'elegance-salon-v2'; // <-- VAŽNO: Promenili smo ime keša u "v2"
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

// 1. Instalacija i keširanje
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting(); // Forsira da novi Service Worker postane aktivan odmah
});

// 2. Aktivacija i čišćenje starog keša
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim(); // Preuzima kontrolu nad stranicom odmah
});

// 3. Presretanje zahteva i serviranje (Cache First strategija)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Ako postoji u kešu, serviraj iz keša. Ako ne, preuzmi sa mreže.
                return response || fetch(event.request);
            })
    );
});