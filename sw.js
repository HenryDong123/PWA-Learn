// selfQ       全局
self.addEventListener('install', e => {
    console.log('install', e)
    // 参数是Promise在Promise完成后触发，延迟activate
    e.waitUntil(self.skipWaiting())
    //TEST
})
self.addEventListener('activate', e => {
    console.log('activate', e)
    e.waitUntil(self.clients.claim())
})
self.addEventListener('fetch', e => {
    console.log('fetch', e)
})