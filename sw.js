const CACHE_NAME = 'camino-portugues-v1';

const ARCHIVOS_CACHE = [
  '/camino--portugues/',
  '/camino--portugues/index.html',
  '/camino--portugues/mapa4.html',
  '/camino--portugues/mapa5.html',
  '/camino--portugues/mapa6.html',
  '/camino--portugues/mapa7.html',
  '/camino--portugues/mapa8.html',
  '/camino--portugues/mapa9.html',
  '/camino--portugues/lugar1b.html',
  '/camino--portugues/lugar2b.html',
  '/camino--portugues/lugar3b.html',
  '/camino--portugues/lugar4b.html',
  '/camino--portugues/lugar5b.html',
  '/camino--portugues/lugar6b.html',
  '/camino--portugues/lugar7b.html',
  '/camino--portugues/lugar8b.html',
  '/camino--portugues/lugar9b.html',
  '/camino--portugues/lugar10b.html',
  '/camino--portugues/lugar11b.html',
  '/camino--portugues/lugar12b.html',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ARCHIVOS_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(nombres => {
      return Promise.all(
        nombres
          .filter(nombre => nombre !== CACHE_NAME)
          .map(nombre => caches.delete(nombre))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(respuesta => {
        if (respuesta) return respuesta;
        return fetch(event.request).catch(() => {
          return new Response(
            `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>O Camiño — Sin conexión</title>
<style>
body { font-family: Georgia, serif; background: #1a1a2e; color: #c8a96e;
       display: flex; flex-direction: column; align-items: center;
       justify-content: center; min-height: 100vh; margin: 0;
       text-align: center; padding: 2rem; }
h1 { font-size: 2rem; margin-bottom: 1rem; }
p  { color: #a89070; line-height: 1.7; max-width: 340px; }
a  { color: #c8a96e; }
</style></head><body>
<div style="font-size:3rem">🐚</div>
<h1>O Camiño</h1>
<p>No tienes conexión en este momento.</p>
<p>Vuelve a la <a href="/camino--portugues/">página principal</a> — si ya la abriste con WiFi, funcionará sin conexión.</p>
<p><em>"El Camino no se detiene por la lluvia ni por la cobertura."</em></p>
</body></html>`,
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        });
      })
  );
});
