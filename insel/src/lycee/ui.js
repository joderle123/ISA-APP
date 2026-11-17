// Lycée-Simulator – Oberfläche: Auftrag oben links, Raumname, Hinweis „E – reden“, Gespräche mit Auswahl, Stärken-Abzeichen,
// Bingo-Karte, Journal (Tab), Titelbild mit Figur und Name, Kapitel-Ende, Freiwurf-Spiel. Alles im DOM über der 3D-Ansicht.
// Bedienung: Maus/Tastatur (E, Enter, Leertaste = weiter; 1–3 = Antwort) und Finger (Joystick links, Knopf rechts).
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

export function createUI({ root, input, speech }) {
  const hud = el('div', 'ly-hud'); root.appendChild(hud);
  const auftrag = el('div', 'ly-auftrag', ''); hud.appendChild(auftrag);
  const raum = el('div', 'ly-raum'); hud.appendChild(raum);
  const uhr = el('div', 'ly-uhr'); hud.appendChild(uhr);
  const hinweis = el('button', 'ly-hinweis'); hinweis.type = 'button'; hinweis.hidden = true; hud.appendChild(hinweis);
  const toastBox = el('div', 'ly-toasts'); hud.appendChild(toastBox);
  const bingo = el('div', 'ly-bingo'); bingo.hidden = true; hud.appendChild(bingo);
  const knoepfe = el('div', 'ly-knoepfe', '<button type="button" data-k="journal" title="Journal (Tab)" aria-label="Journal">☰</button>'); hud.appendChild(knoepfe);
  const dialog = el('div', 'ly-dialog'); dialog.hidden = true; root.appendChild(dialog);
  const ebene = el('div', 'ly-ebene'); ebene.hidden = true; root.appendChild(ebene);
  // Touch: Joystick-Bild und Aktionsknopf
  const stick = el('div', 'ly-stick', '<span></span>'); hud.appendChild(stick);
  const akt = el('button', 'ly-akt', 'E'); akt.type = 'button'; akt.setAttribute('aria-label', 'Reden / weiter'); hud.appendChild(akt);
  let dialogOffen = false, weiterFn = null, wahlFn = null;
  const ui = { dialogOffen: () => dialogOffen || !ebene.hidden, onJournal: null, onAktion: null };

  // ---------- Auftrag, Raum, Uhr, Hinweis, Toasts ----------
  ui.auftrag = ({ kapitel, titel, ziel, dist } = {}) => {
    if (!titel) { auftrag.hidden = true; return; }
    auftrag.hidden = false;
    auftrag.innerHTML = '<div class="ly-a-kap">' + esc(kapitel) + '</div><div class="ly-a-titel">' + esc(titel) + '</div><div class="ly-a-ziel"><span class="ly-a-punkt"></span>' + esc(ziel) +
      (dist != null ? ' <span class="ly-a-dist">' + Math.round(dist) + ' m</span>' : '') + '</div>';
  };
  ui.dist = (d) => { const s = auftrag.querySelector('.ly-a-dist'); const z = auftrag.querySelector('.ly-a-ziel'); if (!z) return; if (d == null) { if (s) s.remove(); return; } if (s) s.textContent = Math.round(d) + ' m'; else z.insertAdjacentHTML('beforeend', ' <span class="ly-a-dist">' + Math.round(d) + ' m</span>'); };
  let raumT = 0;
  ui.raum = (name) => { raum.textContent = name; raum.classList.remove('an'); void raum.offsetWidth; raum.classList.add('an'); clearTimeout(raumT); raumT = setTimeout(() => raum.classList.remove('an'), 2600); };
  ui.uhr = (h) => { const hh = Math.floor(h), mm = Math.floor((h - hh) * 60); uhr.textContent = String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0'); };
  ui.hinweis = (t) => { if (!t) { hinweis.hidden = true; return; } hinweis.hidden = false; hinweis.innerHTML = '<kbd>E</kbd>' + esc(t); };
  hinweis.addEventListener('click', () => ui.onAktion && ui.onAktion());
  ui.toast = (t, art = '') => {
    const x = el('div', 'ly-toast ' + art, t); toastBox.appendChild(x);
    setTimeout(() => x.classList.add('weg'), 3200); setTimeout(() => x.remove(), 3800);
  };
  ui.staerke = (s) => ui.toast('<b>Stärke: ' + esc(s.name) + '</b><span>' + esc(s.text) + '</span>', 'ly-t-staerke');
  ui.herz = (name, n) => ui.toast((n > 0 ? '♥ ' : '') + esc(name) + (n > 0 ? ' mag dich ein bisschen mehr' : ' ist etwas verstimmt'), n > 0 ? 'ly-t-herz' : 'ly-t-kalt');

  // ---------- Gespräch ----------
  // zeile: { wer, farbe, text } → wartet auf „weiter“
  ui.sprich = ({ wer = '', farbe = '#2b3a55', text = '' }) => new Promise((ok) => {
    dialogOffen = true; dialog.hidden = false;
    dialog.className = 'ly-dialog' + (wer ? '' : ' ly-erz');
    dialog.innerHTML = (wer ? '<div class="ly-d-wer" style="--f:' + esc(farbe) + '">' + esc(wer) + '</div>' : '') +
      '<div class="ly-d-text">' + esc(text) + '</div><div class="ly-d-fuss"><button type="button" class="ly-d-vor" aria-label="Vorlesen" title="Vorlesen">🔊</button><button type="button" class="ly-d-weiter">Weiter <kbd>E</kbd></button></div>';
    let fertig = false;
    weiterFn = () => { if (fertig) return; fertig = true; weiterFn = null; ok(); };
    dialog.querySelector('.ly-d-weiter').onclick = () => weiterFn && weiterFn();
    dialog.querySelector('.ly-d-vor').onclick = (e) => { e.stopPropagation(); vorlesen(text); };
    if (ui.autoVorlesen) vorlesen(text);
  });
  // optionen: [text] → Index
  ui.waehle = (optionen, frage = '') => new Promise((ok) => {
    dialogOffen = true; dialog.hidden = false; dialog.className = 'ly-dialog ly-wahl';
    dialog.innerHTML = (frage ? '<div class="ly-d-text">' + esc(frage) + '</div>' : '<div class="ly-d-frage">Was machst du?</div>') +
      '<div class="ly-d-optionen">' + optionen.map((o, i) => '<button type="button" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + esc(o) + '</span></button>').join('') + '</div>';
    wahlFn = (i) => { if (i < 0 || i >= optionen.length) return; wahlFn = null; ok(i); };
    dialog.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => wahlFn && wahlFn(+b.dataset.i); });
    const b0 = dialog.querySelector('[data-i]'); if (b0) setTimeout(() => { try { b0.focus({ preventScroll: true }); } catch (e) { /* egal */ } }, 30);
  });
  ui.dialogZu = () => { dialogOffen = false; dialog.hidden = true; weiterFn = null; wahlFn = null; if (speech) speech.cancel(); };
  function vorlesen(t) { if (speech && speech.available) speech.speak(t, { interrupt: true }); }

  // Tasten: im Gespräch E/Enter/Leertaste = weiter, 1–3 = Antwort; sonst Tab = Journal
  document.addEventListener('keydown', (e) => {
    if (!ebene.hidden && e.code === 'Escape') { ebeneZu(); e.preventDefault(); return; }
    if (e.code === 'Tab') { e.preventDefault(); if (ebene.hidden && !dialogOffen) ui.onJournal && ui.onJournal(); else if (ebene.dataset.art === 'journal') ebeneZu(); return; }
    if (!dialogOffen) return;
    // Taste hier verbrauchen: sonst sieht die Spielsteuerung dasselbe E und startet gleich das nächste Gespräch
    if (wahlFn && /^Digit[1-4]$/.test(e.code)) { e.preventDefault(); e.stopPropagation(); wahlFn(+e.code.slice(5) - 1); return; }
    if (weiterFn && (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space')) { e.preventDefault(); e.stopPropagation(); weiterFn(); }
    else if (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); e.stopPropagation(); }
  }, true);
  dialog.addEventListener('click', (e) => { if (weiterFn && !e.target.closest('button')) weiterFn(); });
  akt.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); if (weiterFn) weiterFn(); else if (ui.onAktion) ui.onAktion(); });
  knoepfe.querySelector('[data-k="journal"]').onclick = () => { if (ebene.hidden) ui.onJournal && ui.onJournal(); else ebeneZu(); };

  // ---------- Bingo-Karte ----------
  ui.bingo = (felder) => {
    if (!felder) { bingo.hidden = true; return; }
    bingo.hidden = false;
    bingo.innerHTML = '<div class="ly-b-kopf">Klassen-Bingo · Finde jemanden, der …</div><div class="ly-b-feld">' +
      felder.map((f) => '<div class="' + (f.wer ? 'ok' : '') + '"><span>' + esc(f.text) + '</span><b>' + (f.wer ? '✓ ' + esc(f.wer) : '?') + '</b></div>').join('') + '</div>';
  };

  // ---------- Ebenen (Journal, Titel, Ende, Spiele) ----------
  function ebeneAuf(art, html) { ebene.hidden = false; ebene.dataset.art = art; ebene.innerHTML = '<div class="ly-karte ly-k-' + art + '">' + html + '</div>'; return ebene.firstChild; }
  function ebeneZu() { ebene.hidden = true; ebene.innerHTML = ''; ebene.dataset.art = ''; }
  ui.ebeneZu = ebeneZu;

  ui.journal = ({ name, stundenplan, leute, staerken, geheimnisse, gesamt }) => {
    const k = ebeneAuf('journal', '<button type="button" class="ly-zu" aria-label="Schließen">✕</button><h2>Journal von ' + esc(name) + '</h2>' +
      '<div class="ly-j-reiter"><button type="button" data-r="leute" class="an">Menschen</button><button type="button" data-r="staerken">Stärken</button><button type="button" data-r="plan">Stundenplan</button><button type="button" data-r="ent">Entdeckt ' + geheimnisse.length + '/' + gesamt + '</button></div><div class="ly-j-inhalt"></div>');
    const inhalt = k.querySelector('.ly-j-inhalt');
    const zeige = (r) => {
      k.querySelectorAll('[data-r]').forEach((b) => b.classList.toggle('an', b.dataset.r === r));
      if (r === 'leute') inhalt.innerHTML = leute.length ? '<ul class="ly-j-leute">' + leute.map((l) => '<li><span class="ly-j-name" style="--f:' + esc(l.farbe) + '">' + esc(l.name) + '</span><span class="ly-herzen" aria-label="' + l.herz + ' von 5">' + '♥'.repeat(Math.max(0, Math.min(5, l.herz))) + '<i>' + '♥'.repeat(5 - Math.max(0, Math.min(5, l.herz))) + '</i></span><small>' + esc(l.notiz || '') + '</small></li>').join('') + '</ul>' : '<p class="ly-leer">Noch niemanden kennengelernt.</p>';
      if (r === 'staerken') inhalt.innerHTML = staerken.length ? '<ul class="ly-j-staerken">' + staerken.map((s) => '<li><b>' + esc(s.name) + (s.n > 1 ? ' <span>×' + s.n + '</span>' : '') + '</b><small>' + esc(s.text) + '</small></li>').join('') + '</ul>' : '<p class="ly-leer">Stärken erscheinen hier, sobald du sie zeigst.</p>';
      if (r === 'plan') inhalt.innerHTML = stundenplan ? '<table class="ly-plan"><tr><th></th><th>Mo</th><th>Di</th><th>Mi</th></tr><tr><td>8:00</td><td>Klassenstunde</td><td>Mathe</td><td>Deutsch</td></tr><tr><td>10:15</td><td>Französisch</td><td>Sport</td><td>Atelier</td></tr><tr><td>13:30</td><td>Projekt</td><td>Englisch</td><td>–</td></tr></table><p class="ly-leer">Saal 1.04 · Klassenlehrer M. Hoffmann</p>' : '<p class="ly-leer">Den Stundenplan gibt es im Sekretariat.</p>';
      if (r === 'ent') inhalt.innerHTML = geheimnisse.length ? '<ul class="ly-j-staerken">' + geheimnisse.map((g) => '<li><b>' + esc(g.titel) + '</b><small>' + esc(g.text) + '</small></li>').join('') + '</ul>' : '<p class="ly-leer">Schau dich um! Im Lycée gibt es einiges zu entdecken.</p>';
    };
    k.querySelectorAll('[data-r]').forEach((b) => { b.onclick = () => zeige(b.dataset.r); });
    k.querySelector('.ly-zu').onclick = ebeneZu;
    zeige('leute');
  };

  // Titelbild: Weiter / Neu, Figur und Name wählen
  ui.titel = ({ gespeichert, figuren }) => new Promise((ok) => {
    const k = ebeneAuf('titel', '<div class="ly-t-kicker">Ein Schulsimulator</div><h1 class="ly-t-name">Lycée<br><span>des Collines</span></h1>' +
      '<p class="ly-t-sub">Kapitel 1 · Rentrée</p><div class="ly-t-knoepfe">' +
      (gespeichert ? '<button type="button" class="ly-btn ly-primaer" data-a="weiter">Weiterspielen</button><button type="button" class="ly-btn" data-a="neu">Neu anfangen</button>' : '<button type="button" class="ly-btn ly-primaer" data-a="neu">Los geht’s</button>') +
      '</div><p class="ly-t-fuss">WASD / Pfeile laufen · Maus ziehen = umschauen · E = reden · Tab = Journal</p>');
    k.querySelectorAll('[data-a]').forEach((b) => { b.onclick = () => {
      if (b.dataset.a === 'weiter') { ebeneZu(); ok({ weiter: true }); return; }
      // Figur und Name
      const k2 = ebeneAuf('wer', '<h2>Wer bist du?</h2><div class="ly-w-figuren">' + figuren.map((f, i) => '<button type="button" data-f="' + i + '" class="' + (i === 0 ? 'an' : '') + '"><span class="ly-w-bild" style="--o:' + f.oben + ';--h:' + f.haut + ';--r:' + f.haar + '"><i></i></span>' + esc(f.titel) + '</button>').join('') + '</div>' +
        '<label class="ly-w-name">Dein Name im Spiel<input maxlength="16" value="Sam" autocomplete="off"></label><p class="ly-leer">Du kannst einen ausgedachten Namen nehmen.</p><button type="button" class="ly-btn ly-primaer" data-a="start">Starten</button>');
      let wahl = 0;
      k2.querySelectorAll('[data-f]').forEach((x) => { x.onclick = () => { wahl = +x.dataset.f; k2.querySelectorAll('[data-f]').forEach((y) => y.classList.toggle('an', y === x)); }; });
      const inp = k2.querySelector('input');
      k2.querySelector('[data-a="start"]').onclick = () => { const name = inp.value.replace(/[<>]/g, '').trim().slice(0, 16) || 'Sam'; ebeneZu(); ok({ neu: true, figur: wahl, name }); };
      inp.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter') k2.querySelector('[data-a="start"]').click(); });
    }; });
  });

  ui.ende = ({ name, leute, staerken, entdeckt, gesamt }) => new Promise((ok) => {
    const k = ebeneAuf('ende', '<div class="ly-t-kicker">Kapitel 1 geschafft</div><h2>Dein erster Tag</h2>' +
      '<div class="ly-e-spalten"><section><h3>Menschen</h3><ul class="ly-j-leute">' + leute.map((l) => '<li><span class="ly-j-name" style="--f:' + esc(l.farbe) + '">' + esc(l.name) + '</span><span class="ly-herzen">' + '♥'.repeat(Math.max(0, Math.min(5, l.herz))) + '<i>' + '♥'.repeat(5 - Math.max(0, Math.min(5, l.herz))) + '</i></span></li>').join('') + '</ul></section>' +
      '<section><h3>Deine Stärken heute</h3><ul class="ly-j-staerken">' + (staerken.length ? staerken.map((s) => '<li><b>' + esc(s.name) + '</b><small>' + esc(s.text) + '</small></li>').join('') : '<li><small>Morgen ist ein neuer Tag.</small></li>') + '</ul>' +
      '<p class="ly-leer">Entdeckt: ' + entdeckt + ' von ' + gesamt + ' Orten</p></section></div>' +
      '<p class="ly-e-weiter">Kapitel 2 „Die erste Woche“ kommt bald.</p><div class="ly-t-knoepfe"><button type="button" class="ly-btn ly-primaer" data-a="frei">Weiter herumlaufen</button><button type="button" class="ly-btn" data-a="neu">Kapitel neu spielen</button></div>');
    k.querySelectorAll('[data-a]').forEach((b) => { b.onclick = () => { ebeneZu(); ok(b.dataset.a); }; });
  });

  // Freiwurf: Kraft-Balken pendelt, im grünen Bereich drücken. 5 Würfe.
  ui.freiwurf = () => new Promise((ok) => {
    const k = ebeneAuf('spiel', '<h2>Freiwürfe</h2><p class="ly-leer">Drück <kbd>E</kbd> (oder tippe), wenn der Strich im grünen Bereich ist.</p>' +
      '<canvas width="520" height="300"></canvas><div class="ly-fw-stand"></div><button type="button" class="ly-btn ly-primaer ly-fw-wurf">Werfen</button>');
    const cv = k.querySelector('canvas'), x = cv.getContext('2d'), stand = k.querySelector('.ly-fw-stand'), wurfBtn = k.querySelector('.ly-fw-wurf');
    let wurf = 0, treffer = 0, t = 0, fliegt = null, fertig = false, last = performance.now();
    const ZONE = [0.62, 0.78];
    const draw = (now) => {
      if (fertig) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
      const p = fliegt ? fliegt.p : (Math.sin(t * (2.2 + wurf * 0.35)) + 1) / 2;
      x.clearRect(0, 0, 520, 300);
      x.fillStyle = '#d8693f'; x.fillRect(0, 250, 520, 50);
      // Korb
      x.fillStyle = '#ffffff'; x.fillRect(430, 40, 10, 90); x.fillStyle = '#d9523c'; x.fillRect(372, 98, 60, 6);
      x.strokeStyle = '#ffffff'; x.lineWidth = 2; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(374 + i * 14, 104); x.lineTo(380 + i * 10, 130); x.stroke(); }
      // Balken
      x.fillStyle = '#e8e1d4'; x.fillRect(30, 30, 24, 200); x.fillStyle = '#3fa66b'; x.fillRect(30, 30 + (1 - ZONE[1]) * 200, 24, (ZONE[1] - ZONE[0]) * 200);
      x.fillStyle = '#2b3a55'; x.fillRect(24, 30 + (1 - p) * 200 - 2, 36, 5);
      // Ball
      let bx = 110, by = 210;
      if (fliegt) {
        fliegt.u = Math.min(1, fliegt.u + dt * 1.4);
        const u = fliegt.u, weit = 0.55 + fliegt.p * 0.62;
        bx = 110 + u * 290 * weit; by = 210 - Math.sin(u * Math.PI) * (150 + fliegt.p * 40) + u * (fliegt.drin ? -110 : -60) * 0.9;
        if (u >= 1) { fliegt = null; if (wurf >= 5) { fertig = true; setTimeout(() => { ebeneZu(); ok(treffer); }, 700); } }
      }
      x.fillStyle = '#e07b39'; x.beginPath(); x.arc(bx, by, 13, 0, 7); x.fill(); x.strokeStyle = '#7a3a12'; x.lineWidth = 1.5; x.beginPath(); x.arc(bx, by, 13, 0, 7); x.moveTo(bx - 13, by); x.lineTo(bx + 13, by); x.stroke();
      requestAnimationFrame(draw);
    };
    const wirf = () => {
      if (fliegt || fertig || wurf >= 5) return;
      const p = (Math.sin(t * (2.2 + wurf * 0.35)) + 1) / 2, drin = p >= ZONE[0] && p <= ZONE[1];
      wurf++; if (drin) treffer++;
      fliegt = { p, u: 0, drin };
      stand.textContent = 'Wurf ' + wurf + ' von 5 · Treffer: ' + treffer + (drin ? ' – drin!' : '');
    };
    stand.textContent = 'Wurf 0 von 5';
    wurfBtn.onclick = wirf; cv.onpointerdown = wirf;
    const taste = (e) => { if (e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); wirf(); } if (fertig) document.removeEventListener('keydown', taste, true); };
    document.addEventListener('keydown', taste, true);
    requestAnimationFrame(draw);
  });

  // Plakat-Arbeit: kurzes Zwischenbild
  ui.bild = (titel, text, sek = 2.4) => new Promise((ok) => {
    ebeneAuf('bild', '<h2>' + esc(titel) + '</h2><p>' + esc(text) + '</p>');
    setTimeout(() => { ebeneZu(); ok(); }, sek * 1000);
  });

  // Joystick-Bild (Touch)
  ui.update = () => {
    const js = input.state.joystick;
    stick.classList.toggle('an', !!js.active);
    if (js.active) { stick.style.left = js.x + 'px'; stick.style.top = js.y + 'px'; stick.firstChild.style.transform = 'translate(' + (js.kx || 0) + 'px,' + (js.ky || 0) + 'px)'; }
    root.classList.toggle('ly-touch', input.state.lastDevice === 'touch');
  };
  return ui;
}
