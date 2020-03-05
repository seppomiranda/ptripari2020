const cacheName = 'ptripari2020';

const cacheAssets = [
    'index.html',
    'laulut.html',
    'opiskelut.html',
    'main.js',
    '/css/main.css',
    '/images/kappaleet/meilleAurinkoPaistaa.PNG',
    '/images/kappaleet/meilleAurinkoPaistaa2&3.PNG',
    '/images/kappaleet/samaTaivas-samaMaa1.PNG',
    '/images/kappaleet/samaTaivas-samaMaa2&3.PNG',
    '/images/kappaleet/tartuKateenJumalan1.PNG',
    '/images/kappaleet/tartuKateenJumalan2&3.PNG',
    '/images/kappaleet/tuleNuotionLoimuun1.PNG',
    '/images/kappaleet/tuleNuotionLoimuun2&3.PNG',
    '/images/kuvakkeet/ig-color.svg',
    '/images/kuvakkeet/kirja.svg',
    '/images/kuvakkeet/logo.svg',
    '/images/kuvakkeet/logoB.svg',
    '/images/kuvakkeet/nuotti.svg',
    '/images/kuvakkeet/koti.svg',
]

// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
  
    e.waitUntil(
      caches
        .open(cacheName)
        .then(cache => {
          console.log('Service Worker: Caching Files');
          cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
  });
  
  // Call Activate Event
  self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              console.log('Service Worker: Clearing Old Cache');
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });
  
  // Call Fetch Event
  self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  });  