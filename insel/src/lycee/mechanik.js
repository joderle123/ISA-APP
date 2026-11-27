// Annexe Junglinster – neue Mechaniken nach der Jugend-Kritik (Umbau, Runde 2).
// Raus sind: Hinschauen mit Texten über Gesichter, freie Momente mit Uhr, Tank-Blick, Mischpult, Pult-Zahl.
// Neu (jede Mechanik ist ein kurzes, klares Spiel mit sofortiger Folge):
//   ui.vorausblende(def) – 8 Sekunden aus der Zukunft: dein Foto, die Umfrage läuft. Dann „Sechs Stunden früher.“
//   ui.suchbild(def)     – Standbild aus der Welt, Zeit läuft: tipp an, was gefragt ist. Gefundenes = Beweis (📎).
//   ui.ortWahl(def)      – Pause = ein Ort. Vier Live-Bilder, du gehst an EINEN Ort. Der Rest passiert ohne dich.
//   ui.stoerung(def)     – mitten in etwas: ein Bild, ein Satz, „Hingehen“ oder „Bleiben“. Zeit läuft.
//   ui.schnitt(def)      – „Währenddessen …“: ein Bild von dort, wo du nicht warst. Vier Sekunden.
//   ui.verdachtWand(def) – Verdachts-Wand: Wer war es? Nur Spuren zählen. „Noch zu früh“ ist eine echte Antwort.
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const warte = (ms) => new Promise((ok) => setTimeout(ok, ms));

export function mechaniken(ui, { ersetze = (t) => t, ton = () => {} } = {}) {
  const tasten = new Set();
  const halte = (f) => { const h = (e) => f(e); document.addEventListener('keydown', h, true); tasten.add(h); return h; };
  const loesche = () => { tasten.forEach((h) => document.removeEventListener('keydown', h, true)); tasten.clear(); };
  const zeitFaktor = () => (ui.zeitlos ? 60 : 1) * (ui.ruhig ? 1.6 : 1) * (ui.einstellungen && ui.einstellungen().text !== 'normal' ? 1.3 : 1);
  const taste = (codes, f) => halte((e) => { if (codes.includes(e.code)) { e.preventDefault(); e.stopPropagation(); f(e.code); } });
  // Zeitbalken: läuft rückwärts; Rückgabe { stopp, rest }
  const zeitBalken = (el, sek, fertig) => {
    const t0 = performance.now(), ges = sek * 1000; let an = true, halt = 0, letzt = t0;
    // hängt das Gerät (langsames iPad, Bild wird gerechnet), läuft die Zeit nicht weiter
    const lauf = () => { if (!an) return; const j = performance.now(); if (j - letzt > 250) halt += j - letzt - 50; letzt = j; const r = Math.max(0, 1 - (performance.now() - t0 - halt) / ges); el.style.transform = 'scaleX(' + r + ')'; el.classList.toggle('knapp', r < 0.3); if (r <= 0) { an = false; fertig(); return; } requestAnimationFrame(lauf); };
    requestAnimationFrame(lauf);
    return { stopp: () => { an = false; }, rest: () => Math.max(0, ges - (performance.now() - t0 - halt)) / 1000, warte: (ms) => { halt += ms; } };
  };

  // ---------- Vorausblende ----------
  // def: { bildUrl, konto, text, umfrage: { a, b, von, bis }, zeit: '13:31', schnitt: 'Montag. 7:25.', unter: 'Sechs Stunden früher.' }
  ui.vorausblende = (def) => new Promise((ok) => {
    const u = def.umfrage || { a: 'cringe', b: 'cool', von: 50, bis: 58 };
    const k = ui.ebeneAuf('voraus', '<div class="mv-voraus"><div class="mv-v-handy"><div class="mv-v-kopf"><b>' + esc(def.konto || '@annexe.cam') + '</b><span>' + esc(def.zeit || 'gerade eben') + '</span></div>' +
      (def.bildUrl ? '<div class="mv-v-bild"><img alt="Ein Foto. Unscharf. Jemand auf dem Hof." src="' + def.bildUrl + '"></div>' : '<div class="mv-v-bild leer"></div>') +
      '<div class="mv-v-text">' + esc(ersetze(def.text || '')) + '</div>' +
      (def.du ? '<div class="mv-v-du">' + esc(ersetze(def.du)) + '</div>' : '') +
      '<div class="mv-v-umfrage"><div class="mv-v-bar a"><i></i><span>' + esc(u.a) + ' <b></b></span></div><div class="mv-v-bar b"><i></i><span>' + esc(u.b) + ' <b></b></span></div><small><em>● live</em> <span class="n">0</span> Stimmen</small></div></div>' +
      '<div class="mv-v-schnitt" hidden><b>' + esc(def.schnitt || '') + '</b><span>' + esc(def.unter || '') + '</span></div><small class="mv-v-skip">E = weiter</small></div>');
    const handy = k.querySelector('.mv-v-handy'), schnitt = k.querySelector('.mv-v-schnitt');
    let aus = false, n = 3, pa = u.von || 50;
    const zeig = () => { const qa = Math.round(pa); k.querySelector('.a i').style.width = qa + '%'; k.querySelector('.a b').textContent = qa + ' %'; k.querySelector('.b i').style.width = (100 - qa) + '%'; k.querySelector('.b b').textContent = (100 - qa) + ' %'; k.querySelector('.n').textContent = n; };
    zeig(); ton('summen');
    const iv = setInterval(() => { n += 2 + Math.floor(Math.random() * 4); pa += ((u.bis || 58) - pa) * 0.25 + (Math.random() - 0.5); zeig(); if (Math.random() < 0.3) ton('pling'); }, 420);
    const ende = () => { if (aus) return; aus = true; clearInterval(iv); loesche(); ui.ebeneZu(); ok(); };
    (async () => {
      await warte(4600); if (aus) return;
      clearInterval(iv); handy.classList.add('weg'); await warte(500); if (aus) return;
      handy.hidden = true; schnitt.hidden = false; ton('rueck');
      await warte(2600); ende();
    })();
    k.onclick = ende; taste(['KeyE', 'Enter', 'Space', 'Escape'], ende);
  });

  // ---------- Schnappschuss-Suchbild ----------
  // def: { wo, frage, zeit, bildUrl, ziele: [{ id, x, y, r, t, richtig }], finde }  (x, y, r: 0–1 vom Bild; r relativ zur Breite)
  // Rückgabe: { gefunden: [id], falsch: [id], daneben: n, zeitUm, alle, sek }
  ui.suchbild = (def) => new Promise((ok) => {
    const ziele = (def.ziele || []).filter((z) => z && z.x != null && z.x >= -0.02 && z.x <= 1.02 && z.y >= -0.02 && z.y <= 1.02);
    const richtige = ziele.filter((z) => z.richtig !== false), finde = Math.min(def.finde || richtige.length, richtige.length);
    const k = ui.ebeneAuf('szene', '<div class="sz mv-such"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Schnappschuss') + '</span><b>📸 Standbild</b></div>' +
      '<div class="mv-frage">' + esc(ersetze(def.frage)) + (finde > 1 ? ' <small>(' + finde + ')</small>' : '') + '</div><div class="mv-zeit"><i></i></div>' +
      '<div class="mv-bild"><img alt="Standbild aus dem Spiel" src="' + (def.bildUrl || '') + '" draggable="false">' + (def.streifen ? '<i class="ly-hk-streifen"></i>' : '') + (def.gruen ? '<i class="ly-hk-gruen"></i>' : '') +
        (def.kreis ? '<i class="ly-hk-kreis" style="left:' + (+(def.kreis.x) || 50) + '%;top:' + (+(def.kreis.y) || 50) + '%;--r:' + (+(def.kreis.r) || 15) + '%"></i>' : '') + '<div class="mv-marken"></div><div class="mv-blitz"></div></div>' +
      '<div class="mv-unten"><span class="mv-stand">0 / ' + finde + '</span><span class="mv-tipp">Tipp aufs Bild.</span></div><div class="sz-karten mv-knopf"></div></div>');
    const bild = k.querySelector('.mv-bild'), marken = k.querySelector('.mv-marken'), stand = k.querySelector('.mv-stand'), tipp = k.querySelector('.mv-tipp');
    bild.dataset.ziele = JSON.stringify(ziele.map((z) => [z.id, +z.x.toFixed(3), +z.y.toFixed(3), z.richtig !== false]));   // für den Testlauf
    const gefunden = [], falsch = []; let daneben = 0, sperre = 0, aus = false; const t0 = performance.now();
    const marke = (z, art, txt) => { marken.insertAdjacentHTML('beforeend', '<span class="mv-marke ' + art + '" style="left:' + (z.x * 100) + '%;top:' + (z.y * 100) + '%;--r:' + ((z.r || 0.075) * 100) + '%">' + (txt ? '<em>' + esc(ersetze(txt)) + '</em>' : '') + '</span>'); };
    const zb = zeitBalken(k.querySelector('.mv-zeit i'), (def.zeit || 12) * zeitFaktor(), () => fertig(true));
    const fertig = (zeitUm) => {
      if (aus) return; aus = true; zb.stopp(); bild.classList.add('aus');
      for (const z of richtige) if (!gefunden.includes(z.id)) marke(z, 'verpasst', z.t);
      const n = gefunden.length;
      tipp.textContent = n >= finde ? (def.gut || 'Alles gefunden.') : zeitUm ? 'Zeit um. ' + (def.verpasst || 'Gelb: das hast du nicht gesehen.') : '';
      stand.textContent = n + ' / ' + finde;
      const kn = k.querySelector('.mv-knopf');
      kn.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      let zuA = false; const zu = () => { if (zuA) return; zuA = true; loesche(); ui.ebeneZu(); ok({ gefunden, falsch, daneben, zeitUm: !!zeitUm, alle: n >= finde, sek: Math.round((performance.now() - t0) / 100) / 10 }); };
      kn.querySelector('[data-a="w"]').onclick = zu;
      setTimeout(() => { if (!zuA) taste(['KeyE', 'Enter'], zu); }, 400);
    };
    bild.addEventListener('pointerdown', (e) => {
      if (aus) return; e.preventDefault();
      const r = bild.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height, asp = r.height / r.width;
      if (performance.now() < sperre) { tipp.textContent = 'Nicht raten. Schau hin.'; return; }
      let best = null, bd = 1e9;
      for (const z of ziele) { const d = Math.hypot(z.x - x, (z.y - y) * asp); if (d < (z.r || 0.075) * 1.15 && d < bd) { best = z; bd = d; } }
      if (best && best.richtig !== false) {
        if (gefunden.includes(best.id)) return;
        gefunden.push(best.id); marke(best, 'ja', best.t); ton('pling'); stand.textContent = gefunden.length + ' / ' + finde; tipp.textContent = '✓ ' + ersetze(best.kurz || best.t || 'Gefunden.');
        if (gefunden.length >= finde) setTimeout(() => fertig(false), 700);
      } else if (best) {
        if (falsch.includes(best.id)) return;
        falsch.push(best.id); marke(best, 'nein', best.t); ton('falsch'); tipp.textContent = '✗ ' + ersetze(best.t || 'Nein.');
      } else {
        daneben++; marke({ x, y, r: 0.03 }, 'miss'); bild.classList.remove('wackel'); void bild.offsetWidth; bild.classList.add('wackel');
        if (daneben % 3 === 0) { sperre = performance.now() + 1200; tipp.textContent = 'Nicht raten. Schau hin.'; }
      }
    });
    taste(['Escape'], () => fertig(true));
  });

  // ---------- Pause = ein Ort ----------
  // def: { titel, info, orte: [{ id, name, wer, sy, bildUrl }] } → { ort }
  ui.ortWahl = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz mv-orte"><div class="sz-kopf"><span class="sz-wo">' + esc(def.titel || 'Pause') + '</span><b>Wo bist du?</b></div>' +
      '<p class="sz-info">' + esc(ersetze(def.info || 'Du kannst nur an einem Ort sein.')) + '</p><div class="mv-o-gitter">' +
      def.orte.map((o, j) => '<button type="button" class="mv-o-karte" data-i="' + j + '"><span class="mv-o-bild">' + (o.bildUrl ? '<img alt="' + esc(o.name) + '" src="' + o.bildUrl + '">' : '<span class="sy">' + esc(o.sy || '📍') + '</span>') + '<em>● live</em></span>' +
        '<span class="mv-o-text"><kbd>' + (j + 1) + '</kbd><b>' + esc((o.sy ? o.sy + ' ' : '') + o.name) + '</b><small>' + esc(ersetze(o.wer || '')) + '</small></span></button>').join('') + '</div></div>');
    let aus = false; const ende = (j) => { if (aus || j < 0 || j >= def.orte.length) return; aus = true; loesche(); k.querySelectorAll('.mv-o-karte').forEach((b, x) => b.classList.toggle(x === j ? 'gewaehlt' : 'weg', true)); ton('klick'); setTimeout(() => { ui.ebeneZu(); ok({ ort: def.orte[j].id }); }, 650); };
    k.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
    taste(['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4'], (c) => ende(+c.slice(-1) - 1));
  });

  // ---------- Störung: mitten in etwas ----------
  // def: { bildUrl, t, hin, bleib, zeit } → { hin: bool, sek }
  ui.stoerung = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('stoerung', '<div class="mv-stoer"><div class="mv-s-bild">' + (def.bildUrl ? '<img alt="' + esc(def.t) + '" src="' + def.bildUrl + '">' : '') + '<b>' + esc(ersetze(def.t)) + '</b></div>' +
      '<div class="mv-zeit"><i></i></div><div class="mv-s-knoepfe"><button type="button" class="mv-s-hin" data-i="1"><kbd>1</kbd>' + esc(ersetze(def.hin || 'Hingehen')) + '</button><button type="button" class="mv-s-bleib" data-i="0"><kbd>2</kbd>' + esc(ersetze(def.bleib || 'Bleiben')) + '</button></div></div>');
    ton('summen'); const t0 = performance.now();
    let aus = false; const ende = (hin) => { if (aus) return; aus = true; zb.stopp(); loesche(); ui.ebeneZu(); ok({ hin, sek: Math.round((performance.now() - t0) / 100) / 10 }); };
    const zb = zeitBalken(k.querySelector('.mv-zeit i'), (def.zeit || 6) * zeitFaktor(), () => ende(false));
    k.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(b.dataset.i === '1'); });
    taste(['Digit1', 'Numpad1'], () => ende(true)); taste(['Digit2', 'Numpad2'], () => ende(false));
  });

  // ---------- Währenddessen ----------
  // def: { bildUrl, ort, t, ms } → Promise
  ui.schnitt = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('schnitt', '<div class="mv-schnitt">' + (def.bildUrl ? '<img alt="' + esc(def.t || def.ort) + '" src="' + def.bildUrl + '">' : '') +
      '<div class="mv-sch-ort">Währenddessen · ' + esc(def.ort || '') + '</div>' + (def.t ? '<div class="mv-sch-text">' + esc(ersetze(def.t)) + '</div>' : '') + '</div>');
    let aus = false; const ende = () => { if (aus) return; aus = true; loesche(); ui.ebeneZu(); ok(); };
    setTimeout(ende, def.ms || 4300);
    setTimeout(() => { if (aus) return; k.onclick = ende; taste(['KeyE', 'Enter', 'Space'], ende); }, 900);
  });

  // ---------- Verdachts-Wand ----------
  // def: { titel, frage, leute: [{ id, name, farbe, spuren: ['…'] }], offen: 'Noch zu früh' } → { wahl: id|'offen', spuren: n (der Gewählten), alle: { id: n } }
  ui.verdachtWand = (def) => new Promise((ok) => {
    const L = def.leute || [];
    const k = ui.ebeneAuf('szene', '<div class="sz mv-wand"><div class="sz-kopf"><span class="sz-wo">' + esc(def.titel || 'Verdachts-Wand') + '</span><b>📌 Wer war es?</b></div>' +
      '<p class="sz-info">' + esc(ersetze(def.frage || 'Wer hat das Foto gemacht? Nur Spuren zählen.')) + '</p><div class="mv-w-brett">' +
      L.map((p, j) => '<button type="button" class="mv-w-karte" data-i="' + j + '" style="--f:' + p.farbe + '"><span class="mv-w-name"><kbd>' + (j + 1) + '</kbd>' + esc(p.name) + '</span>' + (p.info ? '<span class="mv-w-info">' + esc(ersetze(p.info)) + '</span>' : '') +
        '<span class="mv-w-spuren">' + (p.spuren.length ? p.spuren.map((s) => '<span>📎 ' + esc(ersetze(s)) + '</span>').join('') : '<span class="leer">keine Spur</span>') + '</span></button>').join('') +
      '</div><div class="sz-karten"><button type="button" class="mv-w-offen" data-i="-1"><kbd>' + (L.length + 1) + '</kbd>' + esc(def.offen || 'Noch zu früh. Ich brauche mehr Spuren.') + '</button></div><div class="mv-w-nach"></div></div>');
    let aus = false;
    const ende = (j) => {
      if (aus) return; aus = true; loesche();
      const p = L[j], alle = Object.fromEntries(L.map((x) => [x.id, x.spuren.length]));
      k.querySelectorAll('[data-i]').forEach((b) => b.classList.toggle('gewaehlt', +b.dataset.i === j));
      const n = p ? p.spuren.length : 0, max = Math.max(0, ...L.map((x) => x.spuren.length));
      const satz = !p ? (def.offenSatz || 'Kein Name ohne Beweis. Das ist schwer. Und fair.') : n === 0 ? 'Du hast ' + p.name + ' gewählt. Ohne eine einzige Spur. Nur ein Gefühl.' : n < max ? p.name + ': ' + n + ' Spur' + (n > 1 ? 'en' : '') + '. Bei jemand anderem sind es mehr.' : p.name + ': ' + n + ' Spur' + (n > 1 ? 'en' : '') + '. Ein Verdacht. Noch kein Beweis.';
      k.querySelector('.mv-w-nach').innerHTML = '<div class="mv-f-urteil">' + esc(satz) + '</div><button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      let zuA = false; const zu = () => { if (zuA) return; zuA = true; loesche(); ui.ebeneZu(); ok({ wahl: p ? p.id : 'offen', spuren: n, alle }); };
      k.querySelector('[data-a="w"]').onclick = zu; setTimeout(() => { if (!zuA) taste(['KeyE', 'Enter'], zu); }, 300);
    };
    k.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
    taste(['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5'], (c) => { const j = +c.slice(-1) - 1; ende(j >= L.length ? -1 : j); });
  });
}
