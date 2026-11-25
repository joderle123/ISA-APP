// Fotos aus dem Spiel (Schnappschuss, „Das war auch“, Rückblick in Bildern) dauerhaft auf dem Gerät: IndexedDB, je Spielstand.
// Nichts verlässt das Gerät. Ohne IndexedDB (privater Modus) bleibt alles wie vorher: Fotos nur für diese Sitzung.
const DB = 'lycee-fotos', ST = 'fotos';
let dbP = null;
const db = () => dbP || (dbP = new Promise((ok, no) => {
  try {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains(ST)) r.result.createObjectStore(ST); };
    r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error);
  } catch (e) { no(e); }
}));
const fertig = (t) => new Promise((ok) => { t.oncomplete = () => ok(true); t.onerror = () => ok(false); t.onabort = () => ok(false); });

export async function fotoSpeichern(platz, id, url) {
  if (!url) return false;
  try { const d = await db(), t = d.transaction(ST, 'readwrite'); t.objectStore(ST).put({ url, zeit: Date.now() }, platz + ':' + id); return await fertig(t); } catch (e) { return false; }
}

export async function fotosLaden(platz) {
  try {
    const d = await db();
    return await new Promise((ok) => {
      const aus = {}, vor = platz + ':', t = d.transaction(ST, 'readonly'), req = t.objectStore(ST).openCursor();
      req.onsuccess = () => { const c = req.result; if (!c) { ok(aus); return; } const k = String(c.key); if (k.startsWith(vor) && c.value && c.value.url) aus[k.slice(vor.length)] = c.value.url; c.continue(); };
      req.onerror = () => ok(aus);
    });
  } catch (e) { return {}; }
}

export async function fotosLoeschen(platz) {
  try {
    const d = await db(), t = d.transaction(ST, 'readwrite'), s = t.objectStore(ST), vor = platz + ':';
    const req = s.openCursor();
    req.onsuccess = () => { const c = req.result; if (!c) return; if (String(c.key).startsWith(vor)) c.delete(); c.continue(); };
    return await fertig(t);
  } catch (e) { return false; }
}
