
var CACHE_STATIC_NAME = 'static-v2';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        cache.addAll([
          '/',
          '/index.html',
          '/src/css/app.css',
          '/src/css/main.css',
          '/src/js/main.js',
          '/src/js/material.min.js',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME) {
            return caches.delete(key);
          }
        }));
      })
  );
});

/*task 1: cache => network fallback

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                });
            })
            .catch(function(err) {

            });
        }
      })
  );
});*/


/*task 2: network only

self.addEventListener("fetch", function (e){
  e.respondWith(
    fetch (e.request)
    .catch( function (err){
      console.log(err);
    })
  );
});*/


/* task 3: cache only

self.addEventListener("fetch", function (e){
  e.respondWith(
    caches.match(e.request)
      .then (function (response){
          return response;
        })
      );      
    })*/


/* task 4: network => cache fallback

self.addEventListener("fetch", function(e){
     e.respondWith(
       fetch(e.request)
         .then(function(responseNetwork) {
            return caches.open(CACHE_DYNAMIC_NAME)
                    .then(function(cache) {
                      cache.put(e.request.url, responseNetwork.clone());
                      return responseNetwork;
                      })
         })
         .catch(function(fallback) {
           return caches.match(e.request)
              .then(function(responseCache){
                return responseCache;
              })
         })
     );
   });*/


/* task 5: cache => network

self.addEventListener ("fetch" , function (e){
  e.respondWith(    
    fetch(e.request)
      .then(function (response) {
        return caches.open(CACHE_DYNAMIC_NAME)
          .then(function (cache){
            cache.put(e.request.url, response.clone());
            return response;
          })
      })
      .catch(function () {
            return caches.match(e.request)            
              .then( function (responseCache){
                if (responseCache){
                  return responseCache
                }                
              })
        })
  );
})*/