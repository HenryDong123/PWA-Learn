// selfQ       全局
const CACHE_NAME = 'cache-v2'
self.addEventListener('install', e => {
    console.log('install', e)
    // 参数是Promise在Promise完成后触发，延迟activate
    e.waitUntil(caches.open(CACHE_NAME).then(cache => {
        cache.addAll(['/', './index.css'])
    }))
    //TEST
})
self.addEventListener('activate', e => {
    console.log('activate', e)
    e.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME){
                return caches.delete(cacheName)
            }
        }))
    }))
})
self.addEventListener('fetch', e => {
    console.log('fetch', e)
    e.respondWith(caches.open(CACHE_NAME).then(cache => {
        return cache.match(e.request).then(response => {
            if (response) {
                return response
            }
            return fetch(e.request).then(response => {
                cache.put(e.request, response.clone())
                return response
            })
        })
    }))
})