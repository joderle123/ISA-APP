// Annexe Junglinster – das Dorf um die Schule: Häuser wie in Luxemburg (heller Putz, Fensterläden, Schieferdach,
// Kamin, Vorgarten mit Hecke), ein Kirchturm und in der Ferne die Sendemasten von Junglinster (Opa Nik erzählt davon).
// Alles aus Kästen und Prismen, Eckpunktfarben wie der Rest der Welt. Wird VOR details.js gebaut, damit Bäume und
// Gras den Häusern ausweichen.
import * as THREE from 'three';

export function baueDorf({ B, C, schild, schilder }) {
  const { box } = B;
  const hex = (h) => new THREE.Color(h);
  const geo = (g, c, art = 'fest') => {
    g = g.index ? g.toNonIndexed() : g;
    if (g.attributes.uv) g.deleteAttribute('uv');
    const n = g.attributes.position.count, col = new Float32Array(n * 3), nor = g.attributes.normal;
    for (let i = 0; i < n; i++) { const k = nor.getY(i) > 0.5 ? 1 : nor.getY(i) < -0.5 ? 0.86 : 0.93; col[i * 3] = c.r * k; col[i * 3 + 1] = c.g * k; col[i * 3 + 2] = c.b * k; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    B.teile[art].push(g);
  };
  let sz = 1312; const rnd = () => { sz = (sz * 16807) % 2147483647; return sz / 2147483647; };
  const belegt = (x0, x1, z0, z1) => B.alle.some((k) => k.y1 > 0.3 && (k.x1 - k.x0) * (k.z1 - k.z0) < 4000 && x1 > k.x0 && x0 < k.x1 && z1 > k.z0 && z0 < k.z1);

  const PUTZ = ['#f1e6cf', '#efe2b8', '#e8d9c4', '#dfe3e0', '#f2dccb', '#e9e3d0', '#d9cfb8'];
  const LADEN = ['#3f6f5a', '#2f5f9a', '#8a5a3a', '#6b6f78', '#a0522d', '#4a7a8c'];
  const SCHIEFER = hex('#454b5e'), FIRST = hex('#5a6178'), RAHMEN = hex('#f7f5ee'), GLAS = hex('#7fa6bf'), SOCKEL = hex('#9a8f80');

  // Satteldach mit First längs x (Traufe vorne/hinten), Giebeldreiecke an den Seiten
  function dach(x0, x1, z0, z1, y, h, putz) {
    const tief = (z1 - z0) / 2 + 0.5, zc = (z0 + z1) / 2, neig = Math.atan2(h, tief), lang = Math.hypot(h, tief);
    for (const s of [1, -1]) { const g = new THREE.BoxGeometry(x1 - x0 + 0.8, 0.25, lang); g.rotateX(s * neig); g.translate((x0 + x1) / 2, y + h / 2, zc + s * tief / 2); geo(g, SCHIEFER); }
    for (const x of [x0, x1]) {
      const sh = new THREE.Shape(); sh.moveTo(-(z1 - z0) / 2, 0); sh.lineTo((z1 - z0) / 2, 0); sh.lineTo(0, h - 0.15); sh.closePath();
      const g = new THREE.ExtrudeGeometry(sh, { depth: 0.2, bevelEnabled: false }); g.rotateY(Math.PI / 2); g.translate(x - 0.1, y, zc); geo(g, putz);
    }
    box(x0 - 0.45, x1 + 0.45, y + h - 0.08, y + h + 0.12, zc - 0.14, zc + 0.14, FIRST);
  }

  // Haus mit Front nach Norden (vorne = −z) oder Süden (vorne = +z)
  function haus(xc, zc, w, d, stock, vorn = -1) {
    const x0 = xc - w / 2, x1 = xc + w / 2, z0 = zc - d / 2, z1 = zc + d / 2, H = stock * 2.9 + 0.4;
    if (belegt(x0 - 1.5, x1 + 1.5, z0 - 3, z1 + 1)) return false;
    const putz = hex(PUTZ[Math.floor(rnd() * PUTZ.length)]), laden = hex(LADEN[Math.floor(rnd() * LADEN.length)]);
    box(x0, x1, 0, H, z0, z1, putz, { stoss: true });
    box(x0 - 0.05, x1 + 0.05, 0, 0.55, z0 - 0.05, z1 + 0.05, SOCKEL);
    box(x0 - 0.1, x1 + 0.1, H - 0.18, H, z0 - 0.15, z1 + 0.15, hex('#e9e3d8'));   // Traufgesims
    const fz = vorn < 0 ? z0 : z1, s = vorn;   // Frontfläche
    const n = Math.max(2, Math.floor(w / 2.4));
    for (let f = 0; f < stock; f++) for (let i = 0; i < n; i++) {
      const x = x0 + (i + 0.5) * w / n, y0 = 0.9 + f * 2.9, tuer = f === 0 && i === Math.floor(n / 2);
      for (const zf of [z0, z1]) {
        const so = zf === z0 ? -1 : 1, front = zf === fz;
        if (tuer && front) {   // Haustür mit Vordach
          box(x - 0.5, x + 0.5, 0.05, 2.2, zf + so * 0.0, zf + so * 0.06, hex(LADEN[(i + 2) % LADEN.length]));
          box(x - 0.8, x + 0.8, 2.35, 2.45, zf, zf + so * 0.7, hex('#5d6573')); box(x - 0.7, x + 0.7, 0, 0.18, zf, zf + so * 0.9, SOCKEL);
          continue;
        }
        box(x - 0.45, x + 0.45, y0, y0 + 1.3, zf + so * 0.0, zf + so * 0.04, GLAS, { art: 'glas' });
        box(x - 0.52, x + 0.52, y0 - 0.08, y0, zf, zf + so * 0.12, RAHMEN); box(x - 0.52, x + 0.52, y0 + 1.3, y0 + 1.37, zf, zf + so * 0.06, RAHMEN);
        box(x - 0.025, x + 0.025, y0, y0 + 1.3, zf, zf + so * 0.06, RAHMEN);
        if (front || rnd() < 0.5) for (const sx of [-1, 1]) box(x + sx * 0.52 - (sx < 0 ? 0.42 : 0), x + sx * 0.52 + (sx > 0 ? 0.42 : 0), y0, y0 + 1.3, zf + so * 0.03, zf + so * 0.08, laden);
        if (front && f > 0 && rnd() < 0.35) box(x - 0.45, x + 0.45, y0 - 0.02, y0 + 0.2, zf + so * 0.1, zf + so * 0.32, hex(['#c0392b', '#e9b949', '#e85d75'][i % 3]));   // Blumenkasten
      }
    }
    dach(x0, x1, z0, z1, H, Math.min(4.2, d * 0.45), putz);
    const kx = x0 + w * (0.2 + rnd() * 0.6); box(kx - 0.3, kx + 0.3, H + 1.2, H + Math.min(4.2, d * 0.45) + 0.9, zc + 0.6, zc + 1.2, hex('#8a7a6a'));   // Kamin
    // Vorgarten: Hecke mit Lücke, Weg, Briefkasten
    const gz = fz + s * 2.6, mx = xc;
    for (const [a0, a1] of [[x0 - 0.5, mx - 0.8], [mx + 0.8, x1 + 0.5]]) box(a0, a1, 0, 0.9, Math.min(gz, gz + s * 0.6), Math.max(gz, gz + s * 0.6), hex('#4f8a4a'), { stoss: true });
    box(mx - 0.7, mx + 0.7, 0.01, 0.04, Math.min(fz, gz + s * 0.6), Math.max(fz, gz + s * 0.6), hex('#cfc7b8'));
    box(mx + 1.0, mx + 1.3, 0, 1.1, gz - s * 0.2, gz - s * 0.0, hex('#5d6573')); box(mx + 0.95, mx + 1.35, 1.1, 1.4, gz - s * 0.25, gz + s * 0.05, hex('#e9b949'));
    return true;
  }

  // Südseite der Straße: Häuserzeile hinter den Straßenbäumen (Bäckerei bleibt frei)
  let anz = 0;
  for (let x = -100; x <= 100; ) {
    const w = 8 + Math.floor(rnd() * 4) * 1.5, d = 8 + rnd() * 2;
    if (!(x + w > -10 && x < 14) && haus(x + w / 2, 62 + d / 2 + rnd() * 1.5, w, d, rnd() < 0.7 ? 2 : 3, -1)) anz++;
    x += w + 3 + rnd() * 4;
  }
  // Ost- und Westrand: ein paar Häuser mit Blick zur Schule
  for (const [x, z] of [[78, 20], [92, 4], [78, -10], [-82, 30], [-96, 34]]) if (haus(x, z, 9 + rnd() * 3, 8.5, 2, rnd() < 0.5 ? -1 : 1)) anz++;

  // Kirchturm mit Spitzhelm (Dorfmitte im Südwesten)
  { const kx = -70, kz = 70;
    box(kx - 6, kx + 6, 0, 9, kz - 2, kz + 9, hex('#efe6d6'), { stoss: true });
    dach(kx - 6, kx + 6, kz - 2, kz + 9, 9, 4.5, hex('#efe6d6'));
    box(kx - 2.6, kx + 2.6, 0, 24, kz - 6.6, kz - 1.4, hex('#e9dfcc'), { stoss: true });
    for (const y of [8, 15, 21]) for (const zf of [kz - 6.62]) box(kx - 0.5, kx + 0.5, y, y + 1.8, zf - 0.02, zf, hex('#3a3f4a'));
    const sp = new THREE.ConeGeometry(3.4, 11, 4); sp.rotateY(Math.PI / 4); sp.translate(kx, 24 + 5.5, kz - 4); geo(sp, SCHIEFER);
    box(kx - 0.08, kx + 0.08, 35, 37.2, kz - 4.08, kz - 3.92, hex('#c9a227')); box(kx - 0.6, kx + 0.6, 36.2, 36.4, kz - 4.08, kz - 3.92, hex('#c9a227'));
    const uhr = schild('XII', 1.6, 1.6, { bg: '#f7f5ee', fg: '#2b3a55', rand: '#2b3a55', schrift: 'bold 120px Georgia, serif' }); uhr.position.set(kx, 18.2, kz - 6.65); uhr.rotation.y = Math.PI; schilder.push(uhr);
  }

  // Sendemasten von Junglinster (rot-weiß, rotes Licht oben) – hinter dem Wald im Nordosten
  for (const [mx, mz, h] of [[86, -114, 66], [100, -106, 58], [74, -118, 50]]) {
    for (let y = 0, i = 0; y < h; y += 6, i++) box(mx - 0.35, mx + 0.35, y, Math.min(h, y + 6), mz - 0.35, mz + 0.35, hex(i % 2 ? '#d9523c' : '#f2f2f2'));
    for (const y of [h * 0.35, h * 0.7]) box(mx - 1.2, mx + 1.2, y, y + 0.25, mz - 1.2, mz + 1.2, hex('#8d96a3'));
    box(mx - 0.4, mx + 0.4, h, h + 0.6, mz - 0.4, mz + 0.4, hex('#ff3b30'), { art: 'licht' });
    // Abspannseile (dünne schräge Balken)
    for (const a of [0.4, 2.5, 4.6]) {
      const A = new THREE.Vector3(mx + Math.cos(a) * 18, 0, mz + Math.sin(a) * 18), T = new THREE.Vector3(mx, h * 0.7, mz), d = T.clone().sub(A), L = d.length();
      const g = new THREE.BoxGeometry(0.06, L, 0.06); g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize())); g.translate((A.x + T.x) / 2, (A.y + T.y) / 2, (A.z + T.z) / 2); geo(g, hex('#9aa3ad'));
    }
  }
  return { haeuser: anz };
}
