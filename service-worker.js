const CACHE_NAME = 'elegance-salon-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/images/sisanje.jpg',
    '/images/farbanje.jpg',
    '/images/svecane-frizure.jpg'
];

// 1. Instalacija Service Worker-a i keširanje osnovnih fajlova
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 2. Presretanje zahteva i serviranje iz keša
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Ako fajl postoji u kešu, serviraj ga odatle
                if (response) {
                    return response;
                }
                // Ako ne postoji, preuzmi ga sa mreže
                return fetch(event.request);
            })
    );
});