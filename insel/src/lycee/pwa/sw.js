// Service Worker für die iPad-App (nur wenn lycee.html über http(s) geladen wird, z. B. GitHub Pages).
// Strategie: erst aus dem Speicher starten (geht ohne Netz), im Hintergrund nach einer neuen Version schauen.
// Ist eine neue da, wird sie gespeichert und die Seite bekommt die Nachricht 'neu' (Hinweis „Neue Version“).
// Spielstände liegen NICHT hier, sondern im localStorage – ein Update löscht sie nicht.
const CACHE = 'annexe-v1';
const KERN = ['lycee.html', 'lycee.webmanifest', 'lycee-pwa/icon-180.png', 'lycee-pwa/icon-192.png', 'lycee-pwa/icon-512.png'];
const EIGEN = /\/(lycee\.html|lycee\.webmanifest|lycee-pwa\/[\w.-]+)$/;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(KERN)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('annexe-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
const kennung = (r) => (r && (r.headers.get('etag') || r.headers.get('last-modified') || r.headers.get('content-length'))) || '';

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !EIGEN.test(url.pathname)) return;
  const schluessel = url.origin + url.pathname;          // ohne ?test usw.
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const alt = await c.match(schluessel);
    const netz = fetch(schluessel, { cache: 'no-cache' }).then(async (r) => {
      if (r && r.ok) {
        const geaendert = !!alt && kennung(alt) !== kennung(r);
        await c.put(schluessel, r.clone());
        if (geaendert && /lycee\.html$/.test(url.pathname)) {
          for (const k of await self.clients.matchAll({ includeUncontrolled: true })) k.postMessage('neu');
        }
      }
      return r;
    }).catch(() => null);
    if (alt) { e.waitUntil(netz); return alt; }
    return (await netz) || new Response('Annexe ist noch nicht gespeichert. Bitte einmal mit Internet öffnen.', { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  })());
});
