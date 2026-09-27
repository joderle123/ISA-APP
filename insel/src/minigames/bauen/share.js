// Regie-Share-Code (WP39), rein: eine gebaute Szene (Plätze, Rollen, Reihenfolge) als kurzer Code ohne Personendaten.
//   encodeScene({ id, cells:[…], seed }) → 'LUMO1-…' · decodeScene(code) → { id, cells, seed } | null
// Kompakt: JSON → UTF-8 → Base64url. Es landen nur IDs und Zahlen aus dem Spiel darin, nie Namen oder Freitext.
const PREFIX = 'LUMO1-';
const clean = (v) => {
  if (typeof v === 'number') return Number.isFinite(v) ? Math.round(v * 100) / 100 : 0;
  if (typeof v === 'string') return /^[a-z0-9-]{1,32}$/.test(v) ? v : '';
  if (Array.isArray(v)) return v.slice(0, 400).map(clean);
  if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v).slice(0, 12)) if (/^[a-z]{1,12}$/.test(k)) o[k] = clean(v[k]); return o; }
  return null;
};
function b64(s) {
  const bytes = new TextEncoder().encode(s);
  let bin = ''; for (const b of bytes) bin += String.fromCharCode(b);
  const B = typeof btoa === 'function' ? btoa(bin) : Buffer.from(bin, 'binary').toString('base64');
  return B.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function unb64(s) {
  const b = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
  const bin = typeof atob === 'function' ? atob(b) : Buffer.from(b, 'base64').toString('binary');
  const bytes = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}
export function encodeScene(scene) { return PREFIX + b64(JSON.stringify(clean(scene))); }
export function decodeScene(code) {
  const s = String(code || '').trim();
  if (!s.startsWith(PREFIX)) return null;
  try { const o = JSON.parse(unb64(s.slice(PREFIX.length))); return o && typeof o === 'object' ? clean(o) : null; } catch (e) { return null; }
}
