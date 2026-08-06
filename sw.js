self.__SIMPLE_GOLF_BUILD__ = 'v181-retired';

const NEW_SITE = 'https://zxj088.github.io/jfk/';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    self.clients.claim().then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      .then(clients => Promise.all(clients.map(client => client.navigate(NEW_SITE).catch(() => null))))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith(Response.redirect(NEW_SITE, 302));
});
