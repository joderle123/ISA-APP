// Kleine Begegnungen in der offenen Welt (wie zufällige Begegnungen in großen Spielen) – keine Füller: jede übt eine
// soziale Fähigkeit, ohne Zeigefinger. Höchstens eine gleichzeitig, nur beim freien Herumlaufen, alle 70–140 s.
//  · Bücher fallen gelassen  → helfen (Hilfsbereitschaft)
//  · Handy auf der Bank      → ehrlich abgeben, nicht reinschauen (Privatsphäre)
//  · Jemand sitzt allein     → dazusetzen, nichts sagen müssen (Dazugehören)
import * as THREE from 'three';

export function createZufall({ scene, steuerung, welt, statisten, blase, sag, waehle, dialogZu, ton, zustand, sichern, toast }) {
  let akt = null, warte = 45 + Math.random() * 30, nr = 0;
  const ARTEN = ['buecher', 'handy', 'allein'];
  const buchMat = ['#c0392b', '#2f6db0', '#3fa66b', '#e9c46a'].map((c) => new THREE.MeshLambertMaterial({ color: c }));
  const buchGeo = new THREE.BoxGeometry(0.22, 0.04, 0.3);
  const handyMesh = (() => {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.012, 0.16), new THREE.MeshLambertMaterial({ color: '#1b1b22' })));
    const sch = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 0.145), new THREE.MeshBasicMaterial({ color: '#7fb8ff', toneMapped: false }));
    sch.rotation.x = -Math.PI / 2; sch.position.y = 0.007; g.add(sch); g.userData.schirm = sch;
    return g;
  })();
  const S = () => zustand();
  const frei = (x) => x && !x.weg && x.f.group.visible && x.f.group.children[0] && x.f.group.children[0].visible;
  const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

  function starte() {
    const p = steuerung.pos, art = ARTEN[nr++ % ARTEN.length];
    if (art === 'buecher') {
      const x = statisten().find((s) => frei(s) && s.d.weg && !s.d.skate && dist(s.f.group.position, p) > 5 && dist(s.f.group.position, p) < 14);
      if (!x) return false;
      const g = x.f.group.position, teile = [];
      for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(buchGeo, buchMat[i % buchMat.length]); b.position.set(g.x + (Math.random() - 0.5) * 0.9, 0.03 + i * 0.002, g.z + (Math.random() - 0.5) * 0.9); b.rotation.y = Math.random() * 3; scene.add(b); teile.push(b); }
      x.warte = 40; x.f.spiele('Idle_Neutral');
      blase(x, 'Ach nee … alles runtergefallen.', 3500);
      akt = { art, x, teile, ort: { x: g.x, z: g.z }, text: 'Beim Aufheben helfen', t: 0, max: 28 };
      return true;
    }
    if (art === 'handy') {
      const bank = (welt.sitze || []).filter((s) => s.bank && dist(s, p) > 6 && dist(s, p) < 22 && !welt.raumBei(s.x, s.z));
      if (!bank.length) return false;
      const s = bank[Math.floor(Math.random() * bank.length)];
      const h = handyMesh.clone(); h.position.set(s.x, 0.47, s.z); h.rotation.y = Math.random() * 3; scene.add(h);
      akt = { art, teile: [h], ort: { x: s.x, z: s.z }, text: 'Handy anschauen', t: 0, max: 90 };
      return true;
    }
    if (art === 'allein') {
      const x = statisten().find((s) => frei(s) && s.d.steht && s.d.steht[3] === 'sitzt' && dist(s.f.group.position, p) > 4 && dist(s.f.group.position, p) < 18
        && !statisten().some((o) => o !== s && frei(o) && dist(o.f.group.position, s.f.group.position) < 2.5));
      if (!x) return false;
      blase(x, '…', 2500);
      akt = { art, x, teile: [], ort: { x: x.f.group.position.x, z: x.f.group.position.z }, text: 'Sich dazusetzen', t: 0, max: 60 };
      return true;
    }
    return false;
  }
  function weg() { if (!akt) return; for (const t of akt.teile) scene.remove(t); if (akt.x && akt.art === 'buecher') { akt.x.warte = 0; } akt = null; warte = 70 + Math.random() * 70; }

  const z = {
    get aktiv() { return !!akt; },
    tick(dt, darf) {
      if (akt) {
        akt.t += dt;
        if (akt.art === 'handy') { const sch = akt.teile[0].children[1]; if (sch) sch.visible = Math.sin(akt.t * 5) > -0.2 || akt.t % 6 > 1; }
        if (akt.t > akt.max && !akt.bei) {
          if (akt.art === 'buecher') blase(akt.x, 'Okay … mach ich halt allein.', 2600);
          weg();
        }
        return;
      }
      if (!darf) return;
      warte -= dt;
      if (warte <= 0) { if (!starte()) warte = 20; }
    },
    naechste(p) { if (!akt || akt.bei) return null; return dist(akt.ort, p) < (akt.art === 'allein' ? 2 : 1.7) ? { tu: 'zufall', text: akt.text, x: akt.ort.x, z: akt.ort.z } : null; },
    async tu() {
      if (!akt) return; akt.bei = true; const a = akt, s = S(); s.merke = s.merke || {};
      if (a.art === 'buecher') {
        for (const b of a.teile) { await new Promise((r) => setTimeout(r, 280)); scene.remove(b); ton('pling'); }
        a.teile = [];
        blase(a.x, ['Danke! Echt.', 'Oh, danke. Hätte ewig gedauert.', 'Merci! Du bist nett.'][Math.floor(Math.random() * 3)], 3000);
        s.merke.geholfen = (s.merke.geholfen || 0) + 1; sichern();
        if (s.merke.geholfen === 3) toast('<b>🤝 Hilfsbereit</b><span>Dreimal einfach geholfen. Ohne dass jemand gefragt hat.</span>', 'ly-t-ent');
        a.x.warte = 1.5; weg(); return;
      }
      if (a.art === 'handy') {
        await sag('erzaehler', 'Ein Handy. Jemand hat es liegen lassen. Es vibriert.');
        await sag('erzaehler', 'Auf dem Sperrbildschirm: „Wo bist du?? Melde dich!“');
        const w = await waehle(['Zum Sekretariat bringen', 'Kurz reinschauen, wem es gehört', 'Liegen lassen']);
        if (w === 1) {
          await sag('erzaehler', 'Gesperrt. Zum Glück. Fremde Nachrichten lesen ist wie fremde Briefe öffnen.');
          await sag('erzaehler', 'Du bringst es ins Sekretariat.');
        }
        if (w <= 1) {
          await sag('weber', 'Ein Handy? Gefunden? Und abgegeben? … Das passiert hier nicht jeden Tag. Danke.');
          s.merke.handyAbgegeben = (s.merke.handyAbgegeben || 0) + 1; if (w === 1) s.merke.handyReingeschaut = true; sichern();
          dialogZu(); weg(); return;
        }
        await sag('erzaehler', 'Vielleicht kommt die Person ja zurück.'); dialogZu(); akt.bei = false; akt.t = akt.max - 8; return;
      }
      if (a.art === 'allein') {
        const sitz = (welt.sitze || []).filter((q) => dist(q, a.ort) < 1.6 && dist(q, a.ort) > 0.4).sort((m, n) => dist(m, steuerung.pos) - dist(n, steuerung.pos))[0];
        if (sitz && steuerung.setzen) steuerung.setzen(sitz.x, sitz.z, sitz.rot);
        await new Promise((r) => setTimeout(r, 4500));
        if (!steuerung.sitzt) { akt.bei = false; return; }
        blase(a.x, ['… danke. Heute ist ein blöder Tag.', 'Du musst nichts sagen. Ist trotzdem besser.', '(lächelt kurz) Hey.'][Math.floor(Math.random() * 3)], 3800);
        s.merke.dazugesetzt = (s.merke.dazugesetzt || 0) + 1; sichern();
        weg();
      }
    },
    weg,
  };
  return z;
}
