const cacheName = 'ptripari2020';

const cacheAssets = [
    '/ptripari2020/index.html',
    '/ptripari2020/laulut.html',
    '/ptripari2020/opiskelut.html',
    '/ptripari2020/main.js',
    '/ptripari2020/css/main.css',
    '/ptripari2020/images/kuvakkeet/kirja.svg',
    '/ptripari2020/images/kuvakkeet/logoB.svg',
    '/ptripari2020/images/kuvakkeet/nuotti.svg',
    '/ptripari2020/images/kuvakkeet/koti.svg'
]

// Call Install Event
self.addEventListener('install', (e) => {
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
  self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
      caches.keys().then((cacheNames) => {
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
  self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  });  