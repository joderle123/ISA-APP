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
  const bingo = el('div', 'ly-bingo hud-interactive'); bingo.hidden = true; hud.appendChild(bingo);
  const knoepfe = el('div', 'ly-knoepfe', '<button type="button" data-k="raus" title="Kurz raus (P)" aria-label="Kurz raus">⏸</button><button type="button" data-k="journal" title="Journal (Tab)" aria-label="Journal">☰</button>'); hud.appendChild(knoepfe);
  const mutEl = el('div', 'ly-mut'); mutEl.hidden = true; hud.appendChild(mutEl);   // Anspannung während einer Mutprobe
  const skateEl = el('div', 'ly-skate'); skateEl.hidden = true; hud.appendChild(skateEl);   // Skate-Session: Zeit, Punkte, Trick
  const skateKn = el('div', 'ly-skate-knoepfe hud-interactive'); skateKn.hidden = true; hud.appendChild(skateKn);
  const dialog = el('div', 'ly-dialog hud-interactive'); dialog.hidden = true; root.appendChild(dialog);
  const ebene = el('div', 'ly-ebene hud-interactive'); ebene.hidden = true; root.appendChild(ebene);
  // Touch: Joystick-Bild und Aktionsknopf
  const stick = el('div', 'ly-stick', '<span></span>'); hud.appendChild(stick);
  const akt = el('button', 'ly-akt', 'E'); akt.type = 'button'; akt.setAttribute('aria-label', 'Reden / weiter'); hud.appendChild(akt);
  let dialogOffen = false, weiterFn = null, wahlFn = null, wahlReihe = [];
  const ui = { dialogOffen: () => dialogOffen || !ebene.hidden, onJournal: null, onAktion: null, onRaus: null };

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
  ui.uhr = (h, tag) => { const hh = Math.floor(h), mm = Math.floor((h - hh) * 60); uhr.textContent = (tag ? tag.slice(0, 2) + ' ' : '') + String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0'); };
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
    dialogOffen = true; dialog.hidden = false; root.classList.add('ly-im-dialog');
    dialog.className = 'ly-dialog hud-interactive' + (wer ? '' : ' ly-erz');
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
    dialogOffen = true; dialog.hidden = false; root.classList.add('ly-im-dialog'); dialog.className = 'ly-dialog hud-interactive ly-wahl';
    dialog.innerHTML = (frage ? '<div class="ly-d-text">' + esc(frage) + '</div>' : '<div class="ly-d-frage">Was machst du?</div>') +
      '<div class="ly-d-optionen"></div>';
    // gemischte Reihenfolge: die „vernünftige“ Antwort steht nicht immer oben (Jugend-Kritik). data-i = Platz in den Daten.
    wahlReihe = optionen.map((o, i) => i);
    if (!ui.festeReihenfolge) for (let i = wahlReihe.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = wahlReihe[i]; wahlReihe[i] = wahlReihe[j]; wahlReihe[j] = t; }
    dialog.querySelector('.ly-d-optionen').innerHTML = wahlReihe.map((i, pos) => '<button type="button" data-i="' + i + '"><kbd>' + (pos + 1) + '</kbd><span>' + esc(optionen[i]) + '</span></button>').join('');
    wahlFn = (i) => { if (i < 0 || i >= optionen.length) return; wahlFn = null; ok(i); };
    dialog.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => wahlFn && wahlFn(+b.dataset.i); });
    const b0 = dialog.querySelector('[data-i]'); if (b0) setTimeout(() => { try { b0.focus({ preventScroll: true }); } catch (e) { /* egal */ } }, 30);
  });
  ui.dialogZu = () => { dialogOffen = false; dialog.hidden = true; root.classList.remove('ly-im-dialog'); weiterFn = null; wahlFn = null; if (speech) speech.cancel(); };
  function vorlesen(t) { if (speech && speech.available) speech.speak(t, { interrupt: true }); }

  // Tasten: im Gespräch E/Enter/Leertaste = weiter, 1–3 = Antwort; sonst Tab = Journal
  document.addEventListener('keydown', (e) => {
    const art = ebene.hidden ? '' : ebene.dataset.art;
    if (art && e.code === 'Escape') { if (art === 'journal') { ebeneZu(); e.preventDefault(); } else if (art === 'raus' && ui.rausZu) { ui.rausZu(); e.preventDefault(); } return; }
    if (e.target && e.target.closest && e.target.closest('input, textarea, select')) return;   // Tippen in Feldern (Name, Lehrpersonen-Editor)
    if (art === 'lehrer') return;
    if (e.code === 'Tab') { e.preventDefault(); if (ebene.hidden && !dialogOffen) ui.onJournal && ui.onJournal(); else if (ebene.dataset.art === 'journal') ebeneZu(); return; }
    if (e.code === 'KeyP' && ebene.hidden && !dialogOffen) { e.preventDefault(); ui.onRaus && ui.onRaus(); return; }
    if (!dialogOffen) return;
    // Taste hier verbrauchen: sonst sieht die Spielsteuerung dasselbe E und startet gleich das nächste Gespräch
    if (wahlFn && /^Digit[1-5]$/.test(e.code)) { e.preventDefault(); e.stopPropagation(); const i = wahlReihe[+e.code.slice(5) - 1]; if (i !== undefined) wahlFn(i); return; }
    if (weiterFn && (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space')) { e.preventDefault(); e.stopPropagation(); weiterFn(); }
    else if (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); e.stopPropagation(); }
  }, true);
  dialog.addEventListener('click', (e) => { if (weiterFn && !e.target.closest('button')) weiterFn(); });
  akt.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); if (weiterFn) weiterFn(); else if (ui.onAktion) ui.onAktion(); });
  knoepfe.querySelector('[data-k="raus"]').onclick = () => { if (ebene.hidden && !dialogOffen) ui.onRaus && ui.onRaus(); else if (ebene.dataset.art === 'raus' && ui.rausZu) ui.rausZu(); };
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

  // Menschen im Journal: Freundschaft als Balken (0–100) mit Stufe, Typ, Hobby und Gründen; oben dein Freundeskreis und Profil
  const menschenListe = (leute) => '<ul class="ly-j-leute ly-j-freunde">' + leute.map((l) => '<li><span class="ly-j-name" style="--f:' + esc(l.farbe) + '">' + esc(l.name) + (l.typ ? ' <em>' + esc(l.typ) + '</em>' : '') + '</span>' +
    (l.punkte != null ? '<span class="ly-fr-balken" title="' + l.punkte + ' von 100"><i style="width:' + l.punkte + '%"></i></span><b class="ly-fr-stufe">' + esc(l.stufe) + '</b>' : '<span class="ly-herzen" aria-label="' + l.herz + ' von 5">' + '♥'.repeat(Math.max(0, Math.min(5, l.herz))) + '<i>' + '♥'.repeat(5 - Math.max(0, Math.min(5, l.herz))) + '</i></span>') +
    '<small>' + [l.hobby ? 'Hobby: ' + esc(l.hobby) : '', l.mag ? 'Mag: ' + esc(l.mag) : '', l.gruende ? esc(l.gruende) : '', l.notiz ? 'Gespräche: ' + esc(l.notiz) : ''].filter(Boolean).join('<br>') + '</small></li>').join('') + '</ul>';
  const freundesKreis = (f) => !f ? '' : '<div class="ly-fr-kreis"><b>Dein Freundeskreis</b>' +
    (f.beste.length ? '<p>' + f.beste.map((b) => '<span class="ly-j-name" style="--f:' + esc(b.farbe) + '">' + esc(b.name) + '</span> ' + esc(b.stufe)).join(' · ') + '</p>' : '<p>Noch niemand über „Kumpel“. Reden, helfen, zusammen spielen – das zählt.</p>') +
    (f.profil.length ? '<p>Du verstehst dich vor allem mit Leuten, die <b>' + f.profil.map(esc).join('</b>, <b>') + '</b> sind.</p>' : '') +
    (f.unbekannt ? '<p class="ly-leer">' + f.unbekannt + ' aus der Klasse kennst du noch nicht.</p>' : '') + '</div>';
  ui.journal = ({ name, stundenplan, leute, freunde = null, staerken, geheimnisse, gesamt, lernkarten = [], leiter = null }) => {
    const k = ebeneAuf('journal', '<button type="button" class="ly-zu" aria-label="Schließen">✕</button><h2>Journal von ' + esc(name) + '</h2>' +
      '<div class="ly-j-reiter"><button type="button" data-r="leute" class="an">Menschen</button><button type="button" data-r="staerken">Stärken</button><button type="button" data-r="plan">Stundenplan</button><button type="button" data-r="ent">Entdeckt ' + geheimnisse.length + '/' + gesamt + '</button>' + (leiter ? '<button type="button" data-r="leiter">Meine Liste</button>' : '') + '</div><div class="ly-j-inhalt"></div>');
    const inhalt = k.querySelector('.ly-j-inhalt');
    const zeige = (r) => {
      k.querySelectorAll('[data-r]').forEach((b) => b.classList.toggle('an', b.dataset.r === r));
      if (r === 'leute') inhalt.innerHTML = freundesKreis(freunde) + (leute.length ? menschenListe(leute) : '<p class="ly-leer">Noch niemanden kennengelernt.</p>');
      if (r === 'staerken') inhalt.innerHTML = staerken.length ? '<ul class="ly-j-staerken">' + staerken.map((s) => '<li><b>' + esc(s.name) + (s.n > 1 ? ' <span>×' + s.n + '</span>' : '') + '</b><small>' + esc(s.text) + '</small></li>').join('') + '</ul>' : '<p class="ly-leer">Stärken erscheinen hier, sobald du sie zeigst.</p>';
      if (r === 'plan') inhalt.innerHTML = stundenplan ? '<table class="ly-plan"><tr><th></th><th>Mo</th><th>Di</th><th>Mi</th></tr><tr><td>8:00</td><td>Klassenstunde</td><td>Mathe</td><td>Deutsch</td></tr><tr><td>10:15</td><td>Französisch</td><td>Sport</td><td>Atelier</td></tr><tr><td>13:30</td><td>Projekt</td><td>Englisch</td><td>–</td></tr></table><p class="ly-leer">Saal 1.04 · Klassenlehrer M. Hoffmann</p>' + (lernkarten.length ? '<h3>Gelernt</h3><ul class="ly-j-staerken">' + lernkarten.map((l) => '<li><b>' + esc(l) + '</b></li>').join('') + '</ul>' : '') : '<p class="ly-leer">Den Stundenplan gibt es im Sekretariat.</p>';
      if (r === 'leiter' && leiter) inhalt.innerHTML = '<ol class="ly-leiter">' + leiter.stufen.slice().reverse().map((l) => '<li class="' + (l.status || '') + '"><b>' + esc(l.t) + '</b><small>' + esc(l.notiz || '') + '</small></li>').join('') + '</ol><p class="ly-leer">Oben das Schwerste. ✓ = geschafft, ◐ = probiert. Probiert zählt.</p>';
      if (r === 'ent') inhalt.innerHTML = geheimnisse.length ? '<ul class="ly-j-staerken">' + geheimnisse.map((g) => '<li><b>' + esc(g.titel) + '</b><small>' + esc(g.text) + '</small></li>').join('') + '</ul>' : '<p class="ly-leer">Schau dich um! Im Lycée gibt es einiges zu entdecken.</p>';
    };
    k.querySelectorAll('[data-r]').forEach((b) => { b.onclick = () => zeige(b.dataset.r); });
    k.querySelector('.ly-zu').onclick = ebeneZu;
    zeige('leute');
  };

  // Titelbild: Weiter / Neu, Figur und Name wählen
  ui.titel = ({ gespeichert, figuren, lehrer }) => new Promise((ok) => {
   const zeigeTitel = () => {
    const k = ebeneAuf('titel', '<div class="ly-t-kicker">Ein Schulsimulator</div><h1 class="ly-t-name">Annexe<br><span>Junglinster</span></h1>' +
      '<p class="ly-t-sub">Vier Kapitel · Rentrée · Die erste Woche · Der Schnuppertag · Nein sagen</p><div class="ly-t-knoepfe">' +
      (gespeichert ? '<button type="button" class="ly-btn ly-primaer" data-a="weiter">Weiterspielen</button><button type="button" class="ly-btn" data-a="neu">Neu anfangen</button>' : '<button type="button" class="ly-btn ly-primaer" data-a="neu">Los geht’s</button>') +
      '</div><p class="ly-t-fuss">' + (matchMedia('(pointer: coarse)').matches ? 'Links wischen = laufen · rechts wischen = umschauen · E = reden · ☰ = Journal' : 'WASD / Pfeile laufen · Maus ziehen = umschauen · E = reden · Tab = Journal') + '</p>' +
      (lehrer ? '<button type="button" class="ly-link" data-a="lehrer">Für Lehrpersonen: eigene Aufgaben</button>' : ''));
    k.querySelectorAll('[data-a]').forEach((b) => { b.onclick = () => {
      if (b.dataset.a === 'weiter') { ebeneZu(); ok({ weiter: true }); return; }
      if (b.dataset.a === 'lehrer') { lehrer().then(zeigeTitel); return; }
      // Figur und Name
      const k2 = ebeneAuf('wer', '<h2>Wer bist du?</h2><div class="ly-w-figuren">' + figuren.map((f, i) => '<button type="button" data-f="' + i + '" class="' + (i === 0 ? 'an' : '') + '"><span class="ly-w-bild" style="--o:' + f.oben + ';--h:' + f.haut + ';--r:' + f.haar + '"><i></i></span>' + esc(f.titel) + '</button>').join('') + '</div>' +
        '<label class="ly-w-name">Dein Name im Spiel<input maxlength="16" value="Sam" autocomplete="off"></label><p class="ly-leer">Du kannst einen ausgedachten Namen nehmen.</p><button type="button" class="ly-btn ly-primaer" data-a="start">Starten</button>');
      let wahl = 0;
      k2.querySelectorAll('[data-f]').forEach((x) => { x.onclick = () => { wahl = +x.dataset.f; k2.querySelectorAll('[data-f]').forEach((y) => y.classList.toggle('an', y === x)); }; });
      const inp = k2.querySelector('input');
      k2.querySelector('[data-a="start"]').onclick = () => { const name = inp.value.replace(/[<>]/g, '').trim().slice(0, 16) || 'Sam'; ebeneZu(); ok({ neu: true, figur: wahl, name }); };
      inp.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter') k2.querySelector('[data-a="start"]').click(); });
    }; });
   };
   zeigeTitel();
  });

  ui.ende = ({ leute, freunde = null, brief = null, staerken, entdeckt, gesamt, kap = 1, ueberschrift = 'Geschafft', weiter = '' }) => new Promise((ok) => {
    const k = ebeneAuf('ende', '<div class="ly-t-kicker">Kapitel ' + kap + ' geschafft</div><h2>' + esc(ueberschrift) + '</h2>' +
      (brief ? '<div class="ly-e-brief"><span class="ly-j-name" style="--f:' + esc(brief.farbe) + '">' + esc(brief.von) + '</span> schreibt dir: „' + esc(brief.text) + '“</div>' : '') + freundesKreis(freunde) + '<div class="ly-e-spalten"><section><h3>Menschen</h3><ul class="ly-j-leute">' + leute.map((l) => '<li><span class="ly-j-name" style="--f:' + esc(l.farbe) + '">' + esc(l.name) + '</span><span class="ly-herzen">' + '♥'.repeat(Math.max(0, Math.min(5, l.herz))) + '<i>' + '♥'.repeat(5 - Math.max(0, Math.min(5, l.herz))) + '</i></span></li>').join('') + '</ul></section>' +
      '<section><h3>Deine Stärken heute</h3><ul class="ly-j-staerken">' + (staerken.length ? staerken.map((s) => '<li><b>' + esc(s.name) + '</b><small>' + esc(s.text) + '</small></li>').join('') : '<li><small>Heute nix Besonderes. Passiert.</small></li>') + '</ul>' +
      '<p class="ly-leer">Entdeckt: ' + entdeckt + ' von ' + gesamt + ' Orten</p></section></div>' +
      (weiter ? '' : '<p class="ly-e-weiter">Das nächste Kapitel kommt bald.</p>') + '<div class="ly-t-knoepfe">' +
      (weiter ? '<button type="button" class="ly-btn ly-primaer" data-a="weiter">' + esc(weiter) + '</button>' : '<button type="button" class="ly-btn ly-primaer" data-a="frei">Weiter herumlaufen</button>') +
      '<button type="button" class="ly-btn" data-a="neu">Kapitel nochmal spielen</button></div>');
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
      const dt = Math.min(0.25, (now - last) / 1000); last = now; t += dt;   // Echtzeit: auch auf langsamen Geräten gleich schnell
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

  // Tischtennis (Hof): von oben gesehen. Tippen / E / Leertaste, wenn der Ball in deiner Zone ist. Drei Bälle; es zählt der
  // längste Ballwechsel. Der Ball wird mit jedem Treffer etwas schneller. Echtzeit (gleich schnell auf jedem Gerät).
  ui.tischtennis = ({ gegner = '' } = {}) => new Promise((ok) => {
    const k = ebeneAuf('spiel', '<h2>Tischtennis' + (gegner ? ' mit ' + esc(gegner) : '') + '</h2><p class="ly-leer">Tippe (oder <kbd>E</kbd>), wenn der Ball im hellen Feld vor deinem Schläger ist.</p>' +
      '<canvas width="520" height="300"></canvas><div class="ly-fw-stand"></div><button type="button" class="ly-btn ly-primaer ly-fw-wurf">Schlagen</button>');
    const cv = k.querySelector('canvas'), x = cv.getContext('2d'), stand = k.querySelector('.ly-fw-stand'), btn = k.querySelector('.ly-fw-wurf');
    const ZONE = [34, 104];
    let bx = 470, by = 150, vx = -260, vy = 60, ballwechsel = 0, best = 0, baelle = 3, pause = 0.8, fertig = false, last = performance.now(), meldung = '', mT = 0, schlag = 0;
    const zeige = () => { stand.textContent = 'Ballwechsel: ' + ballwechsel + ' · Bester: ' + best + ' · Bälle: ' + '●'.repeat(baelle) + '○'.repeat(3 - baelle); };
    const neu = () => { bx = 470; by = 90 + Math.random() * 120; vx = -260; vy = (Math.random() - 0.5) * 140; ballwechsel = 0; pause = 0.9; };
    const fehler = (t) => { meldung = t; mT = 1.2; baelle--; zeige(); if (baelle <= 0) { fertig = true; setTimeout(() => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok(best); }, 900); } else neu(); };
    const draw = (now) => {
      const dt = Math.min(0.25, (now - last) / 1000); last = now;   // Echtzeit, auch auf langsamen Geräten
      if (!fertig && pause <= 0) {
        bx += vx * dt; by += vy * dt;
        if (by < 40 || by > 260) { vy = -vy; by = Math.max(40, Math.min(260, by)); }
        if (vx > 0 && bx > 478) { vx = -Math.abs(vx); vy = (Math.random() - 0.5) * 220; }   // das Gegenüber spielt zurück
        if (vx < 0 && bx < 22) fehler('Vorbei!');
      } else pause -= dt;
      schlag = Math.max(0, schlag - dt * 4); mT -= dt;
      x.clearRect(0, 0, 520, 300);
      x.fillStyle = '#2f6b57'; x.fillRect(20, 30, 480, 240); x.strokeStyle = '#ffffff'; x.lineWidth = 3; x.strokeRect(20, 30, 480, 240);
      x.beginPath(); x.moveTo(20, 150); x.lineTo(500, 150); x.lineWidth = 1.5; x.stroke();
      x.fillStyle = '#2b2b33'; x.fillRect(258, 22, 4, 256);   // Netz
      x.fillStyle = 'rgba(255,255,255,0.16)'; x.fillRect(ZONE[0], 30, ZONE[1] - ZONE[0], 240);
      const py = Math.max(60, Math.min(240, by));
      x.fillStyle = '#d9523c'; x.beginPath(); x.ellipse(28 + schlag * 14, py, 9, 26, 0, 0, 7); x.fill();      // dein Schläger
      x.fillStyle = '#2f6db0'; x.beginPath(); x.ellipse(492, Math.max(60, Math.min(240, by)), 9, 26, 0, 0, 7); x.fill();
      x.fillStyle = '#fff6e0'; x.beginPath(); x.arc(bx, by, 8, 0, 7); x.fill();
      if (mT > 0) { x.fillStyle = '#ffffff'; x.font = 'bold 30px system-ui'; x.textAlign = 'center'; x.fillText(meldung, 260, 160); }
      if (!fertig || mT > 0) requestAnimationFrame(draw);
    };
    const schlagen = () => {
      if (fertig || pause > 0) return;
      schlag = 1;
      if (vx < 0 && bx >= ZONE[0] && bx <= ZONE[1]) {
        ballwechsel++; best = Math.max(best, ballwechsel);
        vx = Math.min(900, Math.abs(vx) * 1.07); vy = (by - 150) * 1.6 + (Math.random() - 0.5) * 80;
        meldung = ballwechsel % 5 === 0 ? ballwechsel + '!' : ''; mT = meldung ? 0.8 : 0; zeige();
      } else if (vx < 0 && bx > ZONE[1] && bx < 200) fehler('Zu früh!');
    };
    const taste = (e) => { if (e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); schlagen(); } };
    btn.onclick = schlagen; cv.onpointerdown = schlagen;
    document.addEventListener('keydown', taste, true);
    zeige(); requestAnimationFrame(draw);
  });

  // Handy: Klassenchat ansehen (nur lesen), „Handy weg“
  ui.handy = (nachrichten) => new Promise((ok) => {
    const k = ebeneAuf('handy', '<div class="ly-h-kopf">7P2 Klasse 💬</div><div class="ly-h-verlauf">' + nachrichten.map((n) =>
      '<div class="ly-h-msg"><b>' + esc(n.wer) + '</b>' + (n.bild ? '<div class="ly-h-bild" aria-label="Foto">📷 Foto</div>' : '') + '<span>' + esc(n.text) + '</span></div>').join('') +
      '</div><button type="button" class="ly-btn ly-primaer" data-a="weg">Handy weg <kbd>E</kbd></button>');
    const zu = () => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok(); };
    const taste = (e) => { if (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); e.stopPropagation(); zu(); } };
    document.addEventListener('keydown', taste, true);
    k.querySelector('[data-a="weg"]').onclick = zu;
  });

  // Atmen gegen Aufregung: Kreis wird groß (einatmen, 4 s) und klein (ausatmen, 4 s), drei Mal. Nichts kann schiefgehen.
  ui.atem = () => new Promise((ok) => {
    const k = ebeneAuf('atem', '<h2>Ruhig atmen</h2><div class="ly-atem"><div class="ly-atem-kreis"></div><div class="ly-atem-text">Bereit?</div></div><p class="ly-leer ly-atem-zahl">Atme mit dem Kreis.</p><button type="button" class="ly-btn" data-a="weiter" hidden>Weiter <kbd>E</kbd></button>');
    const kreis = k.querySelector('.ly-atem-kreis'), text = k.querySelector('.ly-atem-text'), zahl = k.querySelector('.ly-atem-zahl'), btn = k.querySelector('[data-a="weiter"]');
    let runde = 0, fertig = false;
    const fertigMachen = () => { if (fertig) return; fertig = true; document.removeEventListener('keydown', taste, true); ebeneZu(); ok(); };
    const taste = (e) => { if (!btn.hidden && (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space')) { e.preventDefault(); e.stopPropagation(); fertigMachen(); } };
    document.addEventListener('keydown', taste, true);
    btn.onclick = fertigMachen;
    const schritt = () => {
      if (fertig) return;
      if (runde >= 3) { text.textContent = 'Gut so.'; zahl.textContent = 'Dein Herz ist ruhiger.'; btn.hidden = false; return; }
      kreis.className = 'ly-atem-kreis ein'; text.textContent = 'Einatmen …'; zahl.textContent = 'Runde ' + (runde + 1) + ' von 3';
      setTimeout(() => { if (fertig) return; kreis.className = 'ly-atem-kreis aus'; text.textContent = 'Ausatmen …'; setTimeout(() => { runde++; schritt(); }, ui.atemMs || 4000); }, ui.atemMs || 4000);
    };
    setTimeout(schritt, 600);
  });

  // Ich-Botschaft bauen: drei Teile; ein Vorwurf wird freundlich zurückgegeben (Tipp), dann neu wählen
  ui.ichBotschaft = (thema) => new Promise((ok) => {
    const k = ebeneAuf('ich', '<div class="ly-t-kicker">Klartext</div><h2>' + esc(thema.thema) + '</h2><div class="ly-ich-satz"></div><div class="ly-ich-teil"></div>');
    const satzEl = k.querySelector('.ly-ich-satz'), teilEl = k.querySelector('.ly-ich-teil');
    const gewaehlt = [];
    const zeige = (i, tipp) => {
      satzEl.innerHTML = gewaehlt.map((g) => '<span>' + esc(g) + '</span>').join(' ') || '<span class="ly-leer">Dein Satz entsteht hier.</span>';
      if (i >= thema.teile.length) {
        const satz = gewaehlt.join(' ');
        teilEl.innerHTML = '<p class="ly-ich-gut">Sitzt. Da kann Jo nichts gegen sagen.</p><button type="button" class="ly-btn ly-primaer" data-a="sagen">Laut sagen <kbd>E</kbd></button>';
        const sag = () => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok(satz); };
        const taste = (e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); sag(); } };
        document.addEventListener('keydown', taste, true);
        teilEl.querySelector('[data-a]').onclick = sag;
        return;
      }
      const t = thema.teile[i];
      teilEl.innerHTML = '<div class="ly-d-frage">' + esc(t.start) + '</div>' + (tipp ? '<p class="ly-ich-tipp">💡 ' + esc(tipp) + '</p>' : '') +
        '<div class="ly-d-optionen">' + t.optionen.map((o, j) => '<button type="button" data-j="' + j + '"><kbd>' + (j + 1) + '</kbd><span>' + esc(o.t) + '</span></button>').join('') + '</div>';
      const waehle = (j) => {
        const o = t.optionen[j]; if (!o) return;
        document.removeEventListener('keydown', taste, true);
        if (!o.gut) { zeige(i, o.tipp); return; }
        gewaehlt.push(i === 0 ? 'Ich fühle mich ' + o.t + ',' : i === 1 ? 'wenn ' + o.t : 'Ich wünsche mir, ' + o.t);
        zeige(i + 1);
      };
      const taste = (e) => { if (/^Digit[1-4]$/.test(e.code)) { e.preventDefault(); e.stopPropagation(); waehle(+e.code.slice(5) - 1); } };
      document.addEventListener('keydown', taste, true);
      teilEl.querySelectorAll('[data-j]').forEach((b) => { b.onclick = () => waehle(+b.dataset.j); });
    };
    zeige(0);
  });

  // Messen und sägen: Bleistift wandert am Zollstock hin und her; bei 30 cm E drücken (oder tippen). Ergebnis: Abweichung in cm.
  ui.saege = () => new Promise((ok) => {
    const k = ebeneAuf('saege', '<h2>Messen: 30 cm</h2><p class="ly-leer">Drück <kbd>E</kbd> (oder tippe), wenn der Bleistift genau bei 30 steht.</p>' +
      '<canvas width="560" height="220"></canvas><div class="ly-fw-stand">Ganz ruhig. Erst messen, dann sägen.</div><button type="button" class="ly-btn ly-primaer" data-a="mark">Anzeichnen</button>');
    const cv = k.querySelector('canvas'), x = cv.getContext('2d'), stand = k.querySelector('.ly-fw-stand'), btn = k.querySelector('[data-a="mark"]');
    const L = 40, X0 = 40, BREIT = 480, cm = (c) => X0 + c / L * BREIT;
    let t = 0, last = performance.now(), wert = null, fertig = false, saegeT = 0;
    const pos = () => 20 + Math.sin(t * 1.15) * 18;   // 2 … 38 cm
    const draw = (now) => {
      if (fertig) return;
      const dt = Math.min(0.25, (now - last) / 1000); last = now; t += dt;
      x.clearRect(0, 0, 560, 220);
      x.fillStyle = '#d4a373'; x.fillRect(X0, 90, BREIT, 70);   // Brett
      x.fillStyle = '#c08a5a'; for (let i = 0; i < 6; i++) x.fillRect(X0, 98 + i * 11, BREIT, 2);
      x.fillStyle = '#ffd166'; x.fillRect(X0, 50, BREIT, 30);   // Zollstock
      x.fillStyle = '#2b3a55'; x.font = 'bold 12px system-ui'; x.textAlign = 'center';
      for (let c = 0; c <= L; c++) { const px = cm(c); x.fillRect(px, 50, 1, c % 5 ? 8 : 14); if (c % 10 === 0) x.fillText(String(c), px, 76); }
      x.fillStyle = 'rgba(63,166,107,.25)'; x.fillRect(cm(29), 84, cm(31) - cm(29), 82);
      const p = wert == null ? pos() : wert;
      x.fillStyle = '#c0392b'; x.beginPath(); x.moveTo(cm(p), 86); x.lineTo(cm(p) - 7, 70); x.lineTo(cm(p) + 7, 70); x.fill();
      x.fillRect(cm(p) - 4, 20, 8, 50);
      if (wert != null) {
        x.strokeStyle = '#2b3a55'; x.setLineDash([5, 4]); x.beginPath(); x.moveTo(cm(wert), 90); x.lineTo(cm(wert), 160); x.stroke(); x.setLineDash([]);
        saegeT += dt;
        x.fillStyle = '#8d96a3'; x.fillRect(cm(wert) - 2, 160 - Math.min(70, saegeT * 90), 4, 70);   // Sägeblatt
        if (saegeT > 1.1 && !fertig) { fertig = true; setTimeout(() => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok(Math.round(Math.abs(wert - 30))); }, 600); }
      }
      requestAnimationFrame(draw);
    };
    const markieren = () => {
      if (wert != null) return;
      wert = Math.round(pos() * 2) / 2;
      const a = Math.abs(wert - 30);
      stand.textContent = 'Angezeichnet bei ' + String(wert).replace('.', ',') + ' cm' + (a <= 1 ? ' – genau!' : '') + '. Jetzt wird gesägt …';
      btn.hidden = true;
    };
    const taste = (e) => { if (e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); markieren(); } };
    document.addEventListener('keydown', taste, true);
    btn.onclick = markieren; cv.onpointerdown = markieren;
    requestAnimationFrame(draw);
  });

  // Lernmoment (Phase 2): Aufgaben nacheinander. Falsch → Erklärung, neuer Versuch. pflicht: erst weiter, wenn richtig;
  // sonst nach zwei Fehlversuchen die Lösung zeigen. Ergebnis: { geloest: [ids], richtigErsterVersuch }
  ui.quiz = (aufgaben, { titel = 'Lernzeit', pflicht = false } = {}) => new Promise((ok) => {
    const geloest = []; let erster = 0, i = 0;
    const k = ebeneAuf('quiz', '<div class="ly-t-kicker">' + esc(titel) + '</div><div class="ly-q-fort"></div><div class="ly-q-inhalt"></div>');
    const fort = k.querySelector('.ly-q-fort'), inhalt = k.querySelector('.ly-q-inhalt');
    let taste = null;
    const setzeTaste = (fn) => { if (taste) document.removeEventListener('keydown', taste, true); taste = fn; if (fn) document.addEventListener('keydown', fn, true); };
    const ende = () => { setzeTaste(null); ebeneZu(); ok({ geloest, richtigErsterVersuch: erster }); };
    const zeige = () => {
      if (i >= aufgaben.length) {
        fort.textContent = '';
        inhalt.innerHTML = '<h2>Geschafft!</h2><p class="ly-ich-gut">' + geloest.length + ' von ' + aufgaben.length + ' Aufgaben gelöst.</p><button type="button" class="ly-btn ly-primaer" data-a="ende">Weiter <kbd>E</kbd></button>';
        inhalt.querySelector('[data-a]').onclick = ende;
        setzeTaste((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); ende(); } });
        return;
      }
      const a = aufgaben[i]; let fehler = 0;
      fort.textContent = 'Aufgabe ' + (i + 1) + ' von ' + aufgaben.length + ' · ' + a.fach;
      const frage = (hinweis) => {
        inhalt.innerHTML = '<h2 class="ly-q-frage">' + esc(a.frage) + '</h2>' + (hinweis ? '<p class="ly-ich-tipp">💡 ' + esc(hinweis) + '</p>' : '') +
          '<div class="ly-d-optionen">' + a.antworten.map((t, j) => '<button type="button" data-j="' + j + '"><kbd>' + (j + 1) + '</kbd><span>' + esc(t) + '</span></button>').join('') + '</div>';
        const antwort = (j) => {
          if (j < 0 || j >= a.antworten.length) return;
          if (j === a.richtig) {
            if (!fehler) erster++;
            geloest.push(a.id);
            weiter('<p class="ly-ich-gut">✓ Richtig!</p>' + (a.erklaerung ? '<p>' + esc(a.erklaerung) + '</p>' : ''));
            return;
          }
          fehler++;
          if (fehler >= 2 && !pflicht) { weiter('<p class="ly-q-loesung">Die Lösung ist: <b>' + esc(a.antworten[a.richtig]) + '</b></p>' + (a.erklaerung ? '<p>' + esc(a.erklaerung) + '</p>' : '')); return; }
          frage(fehler === 1 ? 'Noch nicht. Schau nochmal genau hin.' + (a.erklaerung && fehler >= 1 && pflicht ? '' : '') : (a.erklaerung || 'Probier eine andere Antwort.'));
        };
        inhalt.querySelectorAll('[data-j]').forEach((b) => { b.onclick = () => antwort(+b.dataset.j); });
        setzeTaste((e) => { if (/^Digit[1-4]$/.test(e.code)) { e.preventDefault(); e.stopPropagation(); antwort(+e.code.slice(5) - 1); } });
      };
      const weiter = (html) => {
        inhalt.innerHTML = '<h2 class="ly-q-frage">' + esc(a.frage) + '</h2>' + html + '<button type="button" class="ly-btn ly-primaer" data-a="w">Weiter <kbd>E</kbd></button>';
        const w = () => { i++; zeige(); };
        inhalt.querySelector('[data-a]').onclick = w;
        setzeTaste((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); w(); } });
      };
      frage('');
    };
    zeige();
  });

  // Editor für Lehrpersonen: Aufgabenpaket anlegen, ändern, als Datei speichern oder laden
  ui.lehrer = ({ paket, speichern, zuruecksetzen, bereinige }) => new Promise((ok) => {
    let p = JSON.parse(JSON.stringify(paket)); if (!p.eigen) { p = { v: 1, titel: 'Meine Aufgaben', pflicht: false, eigen: true, aufgaben: p.aufgaben.slice() }; }
    let bearbeite = -1;
    const k = ebeneAuf('lehrer', '<button type="button" class="ly-zu" aria-label="Schließen">✕</button><div class="ly-t-kicker">Für Lehrpersonen</div><h2>Aufgaben aus dem Unterricht</h2>' +
      '<p class="ly-leer">Die Aufgaben kommen an der Lernstation im CDI (Mme Laurent) und in Lernmomenten der Geschichte. Nur Aufgaben – keine Namen, keine Daten. Gespeichert auf diesem Gerät; mit „Als Datei speichern“ auf andere Geräte bringen.</p>' +
      '<div class="ly-l-kopf"><label>Titel <input data-f="titel" maxlength="60"></label><label class="ly-l-pflicht"><input type="checkbox" data-f="pflicht"> Geschichte geht erst weiter, wenn die Aufgaben richtig gelöst sind</label></div>' +
      '<ol class="ly-l-liste"></ol><div class="ly-l-form"></div>' +
      '<div class="ly-t-knoepfe ly-l-knoepfe"><button type="button" class="ly-btn ly-primaer" data-a="speichern">Speichern</button><button type="button" class="ly-btn" data-a="export">Als Datei speichern</button>' +
      '<label class="ly-btn ly-l-datei">Datei laden<input type="file" accept=".json,application/json" hidden></label><button type="button" class="ly-btn" data-a="beispiel">Beispiel-Aufgaben</button></div><p class="ly-l-meldung" role="status"></p>');
    const $ = (s2) => k.querySelector(s2), meldung = (t) => { $('.ly-l-meldung').textContent = t; };
    $('[data-f="titel"]').value = p.titel; $('[data-f="pflicht"]').checked = !!p.pflicht;
    const liste = () => {
      $('.ly-l-liste').innerHTML = p.aufgaben.map((a, i) => '<li><span><b>' + esc(a.fach) + '</b> · ' + esc(a.frage) + '<small>✓ ' + esc(a.antworten[a.richtig]) + '</small></span>' +
        '<button type="button" class="ly-link" data-e="' + i + '">Ändern</button><button type="button" class="ly-link" data-d="' + i + '">Löschen</button></li>').join('') || '<li class="ly-leer">Noch keine Aufgaben.</li>';
      k.querySelectorAll('[data-e]').forEach((b) => { b.onclick = () => { bearbeite = +b.dataset.e; formular(); }; });
      k.querySelectorAll('[data-d]').forEach((b) => { b.onclick = () => { p.aufgaben.splice(+b.dataset.d, 1); bearbeite = -1; liste(); formular(); }; });
    };
    const formular = () => {
      const a = bearbeite >= 0 ? p.aufgaben[bearbeite] : { fach: 'Mathe', frage: '', antworten: ['', '', ''], richtig: 0, erklaerung: '' };
      const ant = [0, 1, 2, 3].map((j) => a.antworten[j] || '');
      $('.ly-l-form').innerHTML = '<h3>' + (bearbeite >= 0 ? 'Aufgabe ändern' : 'Neue Aufgabe') + '</h3>' +
        '<label>Fach <input data-f="fach" maxlength="30" value="' + esc(a.fach) + '"></label>' +
        '<label>Frage <textarea data-f="frage" maxlength="220" rows="2">' + esc(a.frage) + '</textarea></label>' +
        ant.map((t, j) => '<label class="ly-l-ant"><input type="radio" name="ly-richtig" value="' + j + '"' + (a.richtig === j ? ' checked' : '') + ' aria-label="Antwort ' + (j + 1) + ' ist richtig"><input data-f="a' + j + '" maxlength="90" placeholder="Antwort ' + (j + 1) + (j > 1 ? ' (frei lassen = keine)' : '') + '" value="' + esc(t) + '"></label>').join('') +
        '<p class="ly-leer">Den Punkt vor die richtige Antwort setzen.</p>' +
        '<label>Erklärung (kommt nach der Antwort) <textarea data-f="erklaerung" maxlength="260" rows="2">' + esc(a.erklaerung) + '</textarea></label>' +
        '<button type="button" class="ly-btn" data-a="aufnehmen">' + (bearbeite >= 0 ? 'Änderung übernehmen' : 'Aufgabe hinzufügen') + '</button>';
      $('[data-a="aufnehmen"]').onclick = () => {
        const roh = [0, 1, 2, 3].map((j) => $('[data-f="a' + j + '"]').value.trim());
        const r = +((k.querySelector('input[name="ly-richtig"]:checked') || {}).value || 0);
        if (!roh[r]) { meldung('Die richtige Antwort darf nicht leer sein.'); return; }
        const antworten = [], richtigText = roh[r];
        roh.forEach((t) => { if (t) antworten.push(t); });
        const neu = { id: bearbeite >= 0 ? p.aufgaben[bearbeite].id : 'l' + Date.now().toString(36), fach: $('[data-f="fach"]').value.trim() || 'Unterricht', frage: $('[data-f="frage"]').value.trim(), antworten, richtig: antworten.indexOf(richtigText), erklaerung: $('[data-f="erklaerung"]').value.trim() };
        if (!neu.frage || antworten.length < 2) { meldung('Bitte eine Frage und mindestens zwei Antworten eintragen.'); return; }
        if (bearbeite >= 0) p.aufgaben[bearbeite] = neu; else p.aufgaben.push(neu);
        bearbeite = -1; meldung('Aufgabe übernommen. „Speichern“ nicht vergessen.'); liste(); formular();
      };
    };
    const holen = () => { p.titel = $('[data-f="titel"]').value.trim() || 'Meine Aufgaben'; p.pflicht = $('[data-f="pflicht"]').checked; return bereinige(p); };
    $('[data-a="speichern"]').onclick = () => { const b = holen(); if (!b) { meldung('Es braucht mindestens eine vollständige Aufgabe.'); return; } speichern(b); meldung('Gespeichert: ' + b.aufgaben.length + ' Aufgaben.'); };
    $('[data-a="export"]').onclick = () => {
      const b = holen(); if (!b) { meldung('Es braucht mindestens eine vollständige Aufgabe.'); return; }
      const url = URL.createObjectURL(new Blob([JSON.stringify(b, null, 1)], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url; a.download = 'lycee-aufgaben.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
    };
    k.querySelector('.ly-l-datei input').onchange = (e) => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      if (f.size > 200000) { meldung('Die Datei ist zu groß.'); return; }
      f.text().then((t) => { let b = null; try { b = bereinige(JSON.parse(t)); } catch (x) { b = null; }
        if (!b) { meldung('Diese Datei enthält keine Aufgaben für das Spiel.'); return; }
        p = b; $('[data-f="titel"]').value = p.titel; $('[data-f="pflicht"]').checked = p.pflicht; bearbeite = -1; liste(); formular(); meldung('Geladen: ' + p.aufgaben.length + ' Aufgaben. „Speichern“ übernimmt sie.'); });
    };
    $('[data-a="beispiel"]').onclick = () => { zuruecksetzen(); p = JSON.parse(JSON.stringify(paket.eigen ? paket : paket)); meldung('Beispiel-Aufgaben wieder aktiv. Eigene Aufgaben auf diesem Gerät gelöscht.'); ebeneZu(); ok(); };
    $('.ly-zu').onclick = () => { ebeneZu(); ok(); };
    liste(); formular();
  });

  // Reihenfolge-Spiel (z. B. Streit schlichten): Schritte in eine gute Reihenfolge bringen. Falsch → freundlicher Tipp.
  ui.reihenfolge = (def) => new Promise((ok) => {
    const ord = def.schritte.map((s2, i) => i); for (let i = ord.length - 1; i > 0; i--) { const j = (i * 7 + 3) % (i + 1); const t = ord[i]; ord[i] = ord[j]; ord[j] = t; }
    const k = ebeneAuf('reihe', '<div class="ly-t-kicker">' + esc(def.titel) + '</div><h2>' + esc(def.frage) + '</h2><ol class="ly-r-fertig"></ol><p class="ly-ich-tipp" hidden></p><div class="ly-d-optionen"></div>');
    let n = 0;
    const liste = k.querySelector('.ly-r-fertig'), tipp = k.querySelector('.ly-ich-tipp'), opt = k.querySelector('.ly-d-optionen');
    const zeige = () => {
      opt.innerHTML = ord.filter((i) => i >= n).map((i, j) => '<button type="button" data-k="' + i + '"><kbd>' + (j + 1) + '</kbd><span>' + esc(def.schritte[i].t) + '</span></button>').join('');
      opt.querySelectorAll('[data-k]').forEach((b) => { b.onclick = () => waehle(+b.dataset.k); });
    };
    const fertig = () => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok(); };
    const waehle = (i) => {
      if (n >= def.schritte.length) return;
      if (i !== n) { tipp.hidden = false; tipp.textContent = '💡 ' + (def.schritte[i].tipp || 'Probier einen anderen Schritt zuerst.'); return; }
      tipp.hidden = true; liste.insertAdjacentHTML('beforeend', '<li>' + esc(def.schritte[i].t) + '</li>'); n++;
      if (n >= def.schritte.length) { opt.innerHTML = '<p class="ly-ich-gut">So klappt es.</p><button type="button" class="ly-btn ly-primaer" data-a="w">Weiter <kbd>E</kbd></button>'; opt.querySelector('[data-a]').onclick = fertig; return; }
      zeige();
    };
    const taste = (e) => {
      if (n >= def.schritte.length) { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); fertig(); } return; }
      if (/^Digit[1-4]$/.test(e.code)) { e.preventDefault(); e.stopPropagation(); const b = opt.querySelectorAll('[data-k]')[+e.code.slice(5) - 1]; if (b) waehle(+b.dataset.k); }
    };
    document.addEventListener('keydown', taste, true);
    zeige();
  });

  // ---------- Kapitel 6: kleine Schritte ----------
  // Skala 1–5 („Wie stark ist es gerade?“): kein Richtig oder Falsch, nur ein kurzer Blick nach innen
  ui.skala = ({ kicker = 'Kurzer Check', frage, links = 'ganz ruhig', rechts = 'sehr stark' }) => new Promise((ok) => {
    const k = ebeneAuf('skala', '<div class="ly-t-kicker">' + esc(kicker) + '</div><h2>' + esc(frage) + '</h2><div class="ly-skala">' +
      [1, 2, 3, 4, 5].map((n) => '<button type="button" data-s="' + n + '" style="--n:' + n + '"><kbd>' + n + '</kbd></button>').join('') +
      '</div><div class="ly-skala-ende"><span>' + esc(links) + '</span><span>' + esc(rechts) + '</span></div>');
    const fertig = (n) => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok(n); };
    const taste = (e) => { if (/^Digit[1-5]$/.test(e.code)) { e.preventDefault(); e.stopPropagation(); fertig(+e.code.slice(5)); } };
    document.addEventListener('keydown', taste, true);
    k.querySelectorAll('[data-s]').forEach((b) => { b.onclick = () => fertig(+b.dataset.s); });
  });

  // Eigene Reihenfolge (Mutleiter): leichtestes zuerst antippen. Es gibt keine richtige Reihenfolge.
  ui.sortieren = ({ titel, frage, teile }) => new Promise((ok) => {
    const k = ebeneAuf('sort', '<div class="ly-t-kicker">' + esc(titel) + '</div><h2>' + esc(frage) + '</h2><ol class="ly-r-fertig"></ol><div class="ly-d-optionen"></div>');
    const liste = k.querySelector('.ly-r-fertig'), opt = k.querySelector('.ly-d-optionen'), gewaehlt = [];
    const fertig = () => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok(gewaehlt.slice()); };
    const rest = () => teile.filter((t) => !gewaehlt.includes(t.id));
    const zeige = () => {
      liste.innerHTML = gewaehlt.map((id, i) => '<li>' + (i === 0 ? '<b>Unten:</b> ' : '') + esc(teile.find((t) => t.id === id).t) + '</li>').join('');
      if (!rest().length) { opt.innerHTML = '<p class="ly-ich-gut">Deine Liste. Oben das Härteste.</p><button type="button" class="ly-btn ly-primaer" data-a="w">Weiter <kbd>E</kbd></button>'; opt.querySelector('[data-a]').onclick = fertig; return; }
      opt.innerHTML = rest().map((t, j) => '<button type="button" data-k="' + esc(t.id) + '"><kbd>' + (j + 1) + '</kbd><span>' + esc(t.t) + '</span></button>').join('');
      opt.querySelectorAll('[data-k]').forEach((b) => { b.onclick = () => { gewaehlt.push(b.dataset.k); zeige(); }; });
    };
    const taste = (e) => {
      if (!rest().length) { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); fertig(); } return; }
      if (/^Digit[1-5]$/.test(e.code)) { e.preventDefault(); e.stopPropagation(); const t = rest()[+e.code.slice(5) - 1]; if (t) { gewaehlt.push(t.id); zeige(); } }
    };
    document.addEventListener('keydown', taste, true);
    zeige();
  });

  // Skate-Session: oben Zeit, Punkte und der letzte Trick; unten rechts große Knöpfe „Sprung“ und „Absteigen“ (Tablet)
  let skateWeg = null;
  ui.skate = (z) => {
    skateEl.parentNode.classList.toggle('ly-minispiel', !!z);   // Auftragsbox ausblenden, solange man skatet (Handy: sonst überdeckt)
    if (!z) { skateEl.hidden = true; skateKn.hidden = true; skateEl.innerHTML = ''; skateKn.innerHTML = ''; skateWeg = null; return; }
    if (skateEl.hidden) {
      skateEl.hidden = false; skateKn.hidden = false;
      skateEl.innerHTML = '<div class="ly-skate-kopf">Skate-Session</div><div class="ly-skate-werte"><span data-s="zeit"></span><b data-s="punkte"></b></div><div class="ly-skate-trick" data-s="trick">Springen: Leertaste oder Knopf</div>';
      skateKn.innerHTML = '<button type="button" data-s="sprung">Sprung<kbd>Leertaste</kbd></button><button type="button" data-s="weg">Absteigen<kbd>E</kbd></button>';
      const sp = skateKn.querySelector('[data-s="sprung"]');
      sp.addEventListener('pointerdown', (e) => { e.preventDefault(); input.press('jump'); });
      for (const t of ['pointerup', 'pointerleave', 'pointercancel']) sp.addEventListener(t, () => input.release('jump'));
      skateKn.querySelector('[data-s="weg"]').onclick = () => { if (skateWeg) skateWeg(); };
    }
    if (z.weg) skateWeg = z.weg;
    if (z.rest != null) skateEl.querySelector('[data-s="zeit"]').textContent = '⏱ ' + Math.max(0, Math.ceil(z.rest)) + ' s';
    if (z.punkte != null) skateEl.querySelector('[data-s="punkte"]').textContent = z.punkte + (z.punkte === 1 ? ' Punkt' : ' Punkte');
    if (z.trick) { const t = skateEl.querySelector('[data-s="trick"]'); t.textContent = z.trick; t.classList.remove('neu'); void t.offsetWidth; t.classList.add('neu'); }
  };

  // Anspannung live (oben in der Mitte): Zahl, Balken und Verlauf. Sie steigt erst und fällt dann – wenn man bleibt.
  ui.mut = (m) => {
    if (!m) { mutEl.hidden = true; mutEl.innerHTML = ''; return; }
    mutEl.hidden = false;
    const v = m.verlauf || [], n = Math.max(2, v.length);
    const pkt = v.map((w, i) => (i / (n - 1) * 120).toFixed(1) + ',' + (34 - w / 10 * 32).toFixed(1)).join(' ');
    mutEl.innerHTML = '<div class="ly-mut-kopf">' + esc(m.titel) + '</div>' +
      '<div class="ly-mut-zeile"><span class="ly-mut-wort">Anspannung</span><b>' + Math.round(m.wert) + '</b><span class="ly-mut-bar"><i style="width:' + Math.round(m.wert * 10) + '%"></i></span></div>' +
      '<svg class="ly-mut-kurve" viewBox="0 0 120 36" aria-hidden="true"><polyline points="' + pkt + '"/></svg>' +
      '<div class="ly-mut-fuss">' + esc(m.hinweis || '') + (m.rest > 0 ? ' · noch ' + m.rest + ' s' : '') + '</div>';
  };

  // „Kurz raus“: Das Spiel wartet. Atmen, 5-4-3-2-1 oder einfach zurück. Jederzeit, außer mitten im Gespräch.
  ui.kurzRaus = () => new Promise((ok) => {
    const SINNE = ['Schau dich um. Finde 5 Dinge, die du siehst.', 'Hör hin. 4 Geräusche, ganz egal welche.', 'Spür 3 Dinge: Füße am Boden, Stuhl, Ärmel.', '2 Dinge, die du riechst. Oder 2 Lieblingsgerüche.', 'Ein Atemzug. Ganz langsam aus.'];
    let zu = false;
    const ende = () => { if (zu) return; zu = true; ui.rausZu = null; ebeneZu(); ok(); };
    ui.rausZu = ende;
    const start = () => {
      const k = ebeneAuf('raus', '<div class="ly-t-kicker">Kurz raus</div><h2>Das Spiel wartet.</h2><p class="ly-leer">Was hilft dir gerade?</p><div class="ly-d-optionen">' +
        '<button type="button" data-w="atem"><kbd>1</kbd><span>Atmen mit dem Kreis</span></button>' +
        '<button type="button" data-w="sinne"><kbd>2</kbd><span>5-4-3-2-1: zurück ins Hier</span></button>' +
        '<button type="button" data-w="zu"><kbd>3</kbd><span>Zurück ins Spiel</span></button></div>');
      k.querySelectorAll('[data-w]').forEach((b) => { b.onclick = () => wahl(b.dataset.w); });
    };
    const sinne = (i) => {
      if (i >= SINNE.length) { start(); return; }
      const k = ebeneAuf('raus', '<div class="ly-t-kicker">5-4-3-2-1</div><h2>' + esc(SINNE[i]) + '</h2><p class="ly-leer">Lass dir Zeit. Niemand wartet.</p><button type="button" class="ly-btn ly-primaer" data-a="w">Weiter</button>');
      k.querySelector('[data-a]').onclick = () => sinne(i + 1);
    };
    const wahl = async (w) => {
      if (w === 'atem') { await ui.atem(); if (!zu) start(); }
      else if (w === 'sinne') sinne(0);
      else ende();
    };
    start();
  });

  // Wochenrückblick: vorher und nachher, ohne Bewertung
  ui.woche = (eintraege) => new Promise((ok) => {
    const balken = (n, max) => '<span class="ly-w-bar"><i style="width:' + Math.round(n / max * 100) + '%"></i></span>';
    const k = ebeneAuf('woche', '<div class="ly-t-kicker">Deine Woche</div><h2>Vorher und nachher</h2>' + (eintraege.length ? '<ul class="ly-woche">' + eintraege.map((e) =>
      '<li><b>' + esc(e.titel) + '</b><div><small>vorher</small>' + balken(e.vorher, 5) + '<em>' + e.vorher + '</em></div><div><small>nachher</small>' + balken(e.nachher, 5) + '<em>' + e.nachher + '</em></div><small class="ly-w-notiz">' + esc(e.notiz || '') + '</small></li>').join('') + '</ul>' : '<p class="ly-leer">Diese Woche gab es keine Stufe. Auch okay.</p>') +
      '<button type="button" class="ly-btn ly-primaer" data-a="w">Weiter <kbd>E</kbd></button>');
    const fertig = () => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok(); };
    const taste = (e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); fertig(); } };
    document.addEventListener('keydown', taste, true);
    k.querySelector('[data-a]').onclick = fertig;
  });

  // ---------- Arbeitsblatt am eigenen Platz (Aufgaben aus den Kernkompetenz-Blättern der Toolbox) ----------
  // Wahl: welches Blatt? (mit Fortschritt) – eigene Aufgaben der Lehrperson zuerst
  ui.blattWahl = ({ blaetter, stand = {}, lehrer = null, faecher = [], fach = 'mathe' }) => new Promise((ok) => {
    const k = ebeneAuf('blattwahl', '<button type="button" class="ly-zu" aria-label="Schließen">✕</button><div class="ly-t-kicker">Dein Platz</div><h2>Was machst du?</h2><div class="ly-bw-liste"></div>');
    const liste = k.querySelector('.ly-bw-liste');
    const knopf = (wert, titel, unter, fertig) => '<button type="button" data-b="' + esc(wert) + '"><b>' + esc(titel) + '</b><small>' + esc(unter) + '</small>' + (fertig ? '<i class="' + (fertig.richtig === fertig.gesamt ? 'voll' : '') + '">' + fertig.richtig + '/' + fertig.gesamt + '</i>' : '') + '</button>';
    let f = faecher.find((x) => x.id === fach) || faecher[0], modul = f ? f.modul : 1;
    const zeige = () => {
      let h = '';
      if (lehrer) h += '<h3 class="ly-bw-h">Von deiner Lehrperson</h3>' + knopf('lehrer', lehrer.titel, 'Aufgaben aus dem Unterricht', null);
      if (f) {
        const m = f.module.find((x) => x.nr === modul) || f.module[0];
        h += '<div class="ly-bw-faecher">' + faecher.map((x) => '<button type="button" data-fach="' + x.id + '" class="' + (x === f ? 'an' : '') + '">' + esc(x.name) + '</button>').join('') + '</div>' +
          '<h3 class="ly-bw-h">' + esc(f.name) + ' – in welchem Modul bist du?</h3><div class="ly-bw-module">' + f.module.map((x) => '<button type="button" data-m="' + x.nr + '" class="' + (x.nr === m.nr ? 'an' : '') + '">' + x.nr + '</button>').join('') + '</div>' +
          '<p class="ly-bw-ziel"><b>Modul ' + m.nr + ': ' + esc(m.titel) + '</b> · ' + esc(m.ziele.join(' · ')) + '</p>' +
          ((f.lektionen || []).find((x) => x.nr === m.nr) ? '<h3 class="ly-bw-h">Unterricht – Lektionen</h3>' + (f.lektionen.find((x) => x.nr === m.nr).lektionen.map((l, i) => { const st = (f.lstand || {})[l.id];
            return knopf('lektion:' + f.id + ':' + m.nr + ':' + l.id, 'Lektion ' + (i + 1) + ': ' + l.titel, l.ziel, st ? { richtig: st.richtig, gesamt: st.gesamt } : null); }).join('')) + '<h3 class="ly-bw-h">Training</h3>' : '') +
          m.blaetter.map((b) => knopf(f.id + ':' + m.nr + ':' + b.id, b.titel, f.id === 'mathe' ? 'Mit Erklärung · neue Zahlen bei jedem Mal' : 'Mit Erklärung · neue Aufgaben bei jedem Mal', (f.stand || {})[b.id])).join('');
      }
      h += '<h3 class="ly-bw-h">Kernkompetenzen (Toolbox)</h3>' + blaetter.map((b) => knopf(b.id, b.modul + ' · ' + b.titel, b.aufgaben.length + ' Aufgaben', stand[b.id])).join('');
      h += knopf('nix', 'Nur sitzen', 'Kurz durchatmen. Niemand will was.', null);
      liste.innerHTML = h;
      liste.querySelectorAll('[data-b]').forEach((b) => { b.onclick = () => fertig(b.dataset.b); });
      liste.querySelectorAll('[data-m]').forEach((b) => { b.onclick = () => { modul = +b.dataset.m; zeige(); }; });
      liste.querySelectorAll('[data-fach]').forEach((b) => { b.onclick = () => { f = faecher.find((x) => x.id === b.dataset.fach); modul = f.modul; zeige(); }; });
    };
    const fertig = (w) => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok(w === 'nix' ? 'nix' : w + (w.startsWith('mathe:') ? '' : '')); };
    const taste = (e) => { if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); fertig('nix'); } };
    document.addEventListener('keydown', taste, true);
    k.querySelector('.ly-zu').onclick = () => fertig('nix');
    zeige();
  });

  // ---------- Lernformen im Unterricht (am eigenen Platz). Alle geben { fehler } zurück; Fehler sind erlaubt, es geht weiter. ----------
  const mische = (l) => { const a = l.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const lernKopf = (kicker, titel, hilfe) => '<div class="ly-t-kicker">' + esc(kicker) + '</div><h2>' + esc(titel) + '</h2>' + (hilfe ? '<p class="ly-leer">' + esc(hilfe) + '</p>' : '');
  const weiterKnopf = '<button type="button" class="ly-btn ly-primaer" data-a="w">Weiter <kbd>E</kbd></button>';
  const mitWeiter = (k, zu) => { const t = (e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); document.removeEventListener('keydown', t, true); zu(); } }; document.addEventListener('keydown', t, true); k.querySelector('[data-a="w"]').onclick = () => { document.removeEventListener('keydown', t, true); zu(); }; };

  // Satzbau-Puzzle: Wörter in die richtige Reihenfolge tippen (Satzstellung sichtbar machen)
  ui.satzbau = ({ titel = 'Satzbau', saetze }) => new Promise((ok) => {
    const k = ebeneAuf('lern', lernKopf(titel, 'Tippe die Wörter in der richtigen Reihenfolge.', '') + '<div class="ly-sb-satz"></div><div class="ly-sb-teile"></div><p class="ly-ich-tipp" hidden></p><div class="ly-sb-fuss"></div>');
    let nr = 0, pos = 0, fehler = 0, teile = [];
    const satz = k.querySelector('.ly-sb-satz'), box = k.querySelector('.ly-sb-teile'), tipp = k.querySelector('.ly-ich-tipp'), fuss = k.querySelector('.ly-sb-fuss');
    const zeige = () => {
      const s = saetze[nr]; pos = 0; tipp.hidden = true; fuss.innerHTML = '<small>Satz ' + (nr + 1) + ' von ' + saetze.length + '</small>';
      satz.innerHTML = s.woerter.map(() => '<span class="ly-sb-luecke"></span>').join('');
      teile = mische(s.woerter.map((w, i) => ({ w, i })));
      box.innerHTML = teile.map((t, j) => '<button type="button" data-j="' + j + '">' + esc(t.w) + '</button>').join('');
      box.querySelectorAll('[data-j]').forEach((b) => { b.onclick = () => tippe(+b.dataset.j, b); });
    };
    const tippe = (j, b) => {
      const s = saetze[nr], t = teile[j];
      if (s.woerter[pos] !== t.w) { fehler++; b.classList.remove('falsch'); void b.offsetWidth; b.classList.add('falsch'); tipp.hidden = false; tipp.textContent = '💡 ' + (s.tipp || 'Welches Wort kommt jetzt?'); return; }
      satz.children[pos].textContent = t.w; satz.children[pos].classList.add('gut'); b.disabled = true; pos++; tipp.hidden = true;
      if (pos === s.woerter.length) {
        nr++;
        if (nr < saetze.length) { fuss.innerHTML = '<p class="ly-ich-gut">✓ Richtig!</p>'; setTimeout(zeige, 800); }
        else { fuss.innerHTML = '<p class="ly-ich-gut">✓ Alle Sätze gebaut.</p>' + weiterKnopf; mitWeiter(k, () => { ebeneZu(); ok({ fehler }); }); }
      }
    };
    zeige();
  });

  // Paare finden: links antippen, dann das passende rechts
  ui.paare = ({ titel = 'Paare finden', frage = 'Was gehört zusammen?', paare }) => new Promise((ok) => {
    const rechts = mische(paare.map((p, i) => i));
    const k = ebeneAuf('lern', lernKopf(titel, frage, 'Erst links tippen, dann rechts.') + '<div class="ly-pa"><div class="ly-pa-sp">' + paare.map((p, i) => '<button type="button" data-l="' + i + '"' + ([...p[0]].length <= 3 ? ' class="symbol"' : '') + '>' + esc(p[0]) + '</button>').join('') +
      '</div><div class="ly-pa-sp">' + rechts.map((i) => '<button type="button" data-r="' + i + '">' + esc(paare[i][1]) + '</button>').join('') + '</div></div><div class="ly-sb-fuss"></div>');
    let links = null, fertig = 0, fehler = 0;
    k.querySelectorAll('[data-l]').forEach((b) => { b.onclick = () => { if (b.disabled) return; k.querySelectorAll('[data-l]').forEach((x) => x.classList.remove('an')); b.classList.add('an'); links = +b.dataset.l; }; });
    k.querySelectorAll('[data-r]').forEach((b) => { b.onclick = () => {
      if (links == null || b.disabled) return;
      const lb = k.querySelector('[data-l="' + links + '"]');
      if (+b.dataset.r === links) { b.disabled = lb.disabled = true; b.classList.add('gut'); lb.classList.add('gut'); lb.classList.remove('an'); links = null; fertig++;
        if (fertig === paare.length) { k.querySelector('.ly-sb-fuss').innerHTML = '<p class="ly-ich-gut">✓ Alle Paare gefunden.</p>' + weiterKnopf; mitWeiter(k, () => { ebeneZu(); ok({ fehler }); }); } }
      else { fehler++; b.classList.remove('falsch'); void b.offsetWidth; b.classList.add('falsch'); }
    }; });
  });

  // Hörübung: der Satz wird vorgelesen (🔊, nochmal möglich); ohne Sprachausgabe steht er da. Dann die Frage beantworten.
  ui.hoeren = ({ titel = 'Hören', items }) => new Promise((ok) => {
    const k = ebeneAuf('lern', lernKopf(titel, 'Hör gut zu.', '') + '<div class="ly-ho"><button type="button" class="ly-ho-play" data-a="play">🔊 Anhören</button><p class="ly-ho-text" hidden></p><h3 class="ly-ho-frage"></h3><div class="ly-d-optionen"></div></div><div class="ly-sb-fuss"></div>');
    let nr = 0, fehler = 0, versucht = false;
    const kannSprechen = !!(speech && speech.available);
    const sag = () => { const it = items[nr]; if (kannSprechen) speech.speak(it.sagen, { interrupt: true }); else { const t = k.querySelector('.ly-ho-text'); t.hidden = false; t.textContent = '„' + it.sagen + '“'; } };
    const zeige = () => {
      const it = items[nr]; versucht = false;
      k.querySelector('.ly-ho-text').hidden = true; k.querySelector('.ly-ho-frage').textContent = it.frage;
      k.querySelector('.ly-sb-fuss').innerHTML = '<small>' + (nr + 1) + ' von ' + items.length + (kannSprechen ? '' : ' · ohne Ton: lies den Satz') + '</small>';
      const opt = k.querySelector('.ly-d-optionen'), reihe = mische(it.optionen.map((o, i) => i));
      opt.innerHTML = reihe.map((i, p) => '<button type="button" data-i="' + i + '"><kbd>' + (p + 1) + '</kbd><span>' + esc(it.optionen[i]) + '</span></button>').join('');
      opt.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => antwort(+b.dataset.i, b); });
      setTimeout(sag, 350);
    };
    const antwort = (i, b) => {
      const it = items[nr];
      if (i !== it.richtig) { fehler++; versucht = true; b.classList.add('falsch'); b.disabled = true; const t = k.querySelector('.ly-ho-text'); t.hidden = false; t.textContent = '„' + it.sagen + '“'; return; }
      b.classList.add('gut'); nr++;
      if (nr < items.length) setTimeout(zeige, 700);
      else { k.querySelector('.ly-sb-fuss').innerHTML = '<p class="ly-ich-gut">✓ Gut zugehört.</p>' + weiterKnopf; mitWeiter(k, () => { if (speech) speech.cancel(); ebeneZu(); ok({ fehler }); }); }
    };
    k.querySelector('[data-a="play"]').onclick = sag;
    zeige();
  });

  // Uhr lesen: analoge Uhr, die passende Uhrzeit in Worten wählen
  ui.uhrspiel = ({ titel = 'Uhr lesen', items }) => new Promise((ok) => {
    const k = ebeneAuf('lern', lernKopf(titel, 'Wie spät ist es?', '') + '<div class="ly-uh"><svg viewBox="-110 -110 220 220" class="ly-uh-uhr"></svg><div class="ly-d-optionen"></div></div><div class="ly-sb-fuss"></div>');
    let nr = 0, fehler = 0;
    const zeichne = (zeit) => {
      const [h, m] = zeit.split(':').map(Number), aw = (m / 60) * 360, hw = ((h % 12) / 12) * 360 + m / 2;
      const zeiger = (w, l, d, f) => { const r = (w - 90) * Math.PI / 180; return '<line x1="0" y1="0" x2="' + (Math.cos(r) * l).toFixed(1) + '" y2="' + (Math.sin(r) * l).toFixed(1) + '" stroke="' + f + '" stroke-width="' + d + '" stroke-linecap="round"/>'; };
      let striche = ''; for (let i = 0; i < 60; i++) { const r = i * 6 * Math.PI / 180, a = i % 5 ? 92 : 84; striche += '<line x1="' + (Math.cos(r) * a).toFixed(1) + '" y1="' + (Math.sin(r) * a).toFixed(1) + '" x2="' + (Math.cos(r) * 98).toFixed(1) + '" y2="' + (Math.sin(r) * 98).toFixed(1) + '" stroke="#2b3a55" stroke-width="' + (i % 5 ? 1.5 : 4) + '"/>'; }
      let zahlen = ''; for (let i = 1; i <= 12; i++) { const r = (i * 30 - 90) * Math.PI / 180; zahlen += '<text x="' + (Math.cos(r) * 70).toFixed(1) + '" y="' + (Math.sin(r) * 70 + 7).toFixed(1) + '" text-anchor="middle" font-size="19" font-weight="800" fill="#2b3a55">' + i + '</text>'; }
      k.querySelector('.ly-uh-uhr').innerHTML = '<circle r="104" fill="#fffaf0" stroke="#2b3a55" stroke-width="6"/>' + striche + zahlen + zeiger(hw, 50, 9, '#2b3a55') + zeiger(aw, 80, 5, '#d9523c') + '<circle r="7" fill="#2b3a55"/>';
    };
    const zeige = () => {
      const it = items[nr]; zeichne(it.zeit);
      k.querySelector('.ly-sb-fuss').innerHTML = '<small>Uhr ' + (nr + 1) + ' von ' + items.length + (it.hinweis ? ' · ' + esc(it.hinweis) : '') + '</small>';
      const opt = k.querySelector('.ly-d-optionen'), reihe = mische(it.optionen.map((o, i) => i));
      opt.innerHTML = reihe.map((i, p) => '<button type="button" data-i="' + i + '"><kbd>' + (p + 1) + '</kbd><span>' + esc(it.optionen[i]) + '</span></button>').join('');
      opt.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => { if (+b.dataset.i !== it.richtig) { fehler++; b.classList.add('falsch'); b.disabled = true; return; } b.classList.add('gut'); nr++;
        if (nr < items.length) setTimeout(zeige, 650); else { k.querySelector('.ly-sb-fuss').innerHTML = '<p class="ly-ich-gut">✓ Alle Uhren gelesen.</p>' + weiterKnopf; mitWeiter(k, () => { ebeneZu(); ok({ fehler }); }); } }; });
    };
    zeige();
  });

  // Groß oder klein: die Wörter antippen, die man großschreibt (Nomen, Namen, Satzanfang), dann prüfen
  ui.grossKlein = ({ titel = 'Groß oder klein?', saetze }) => new Promise((ok) => {
    const k = ebeneAuf('lern', lernKopf(titel, 'Tippe alle Wörter an, die man großschreibt.', 'Nomen (der/die/das passt davor), Namen und der Satzanfang.') + '<div class="ly-gk"></div><div class="ly-sb-fuss"></div>');
    let nr = 0, fehler = 0;
    const zeige = () => {
      const s = saetze[nr], box = k.querySelector('.ly-gk');
      box.innerHTML = s.woerter.map((w, i) => '<button type="button" data-i="' + i + '">' + esc(w.toLowerCase()) + '</button>').join(' ');
      box.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => b.classList.toggle('an'); });
      k.querySelector('.ly-sb-fuss').innerHTML = '<small>Satz ' + (nr + 1) + ' von ' + saetze.length + '</small> <button type="button" class="ly-btn ly-primaer" data-a="p">Prüfen</button>';
      k.querySelector('[data-a="p"]').onclick = pruefe;
    };
    const pruefe = () => {
      const s = saetze[nr], box = k.querySelector('.ly-gk'); let ok2 = true;
      box.querySelectorAll('[data-i]').forEach((b) => { const w = s.woerter[+b.dataset.i], gross = w[0] !== w[0].toLowerCase(), an = b.classList.contains('an');
        if (gross !== an) { ok2 = false; b.classList.add('falsch'); } else b.classList.remove('falsch'); });
      if (!ok2) { fehler++; return; }
      box.querySelectorAll('[data-i]').forEach((b) => { b.textContent = s.woerter[+b.dataset.i]; b.classList.add('gut'); b.disabled = true; });
      nr++;
      if (nr < saetze.length) { k.querySelector('.ly-sb-fuss').innerHTML = '<p class="ly-ich-gut">✓ Richtig!</p>'; setTimeout(zeige, 900); }
      else { k.querySelector('.ly-sb-fuss').innerHTML = '<p class="ly-ich-gut">✓ Alles richtig geschrieben.</p>' + weiterKnopf; mitWeiter(k, () => { ebeneZu(); ok({ fehler }); }); }
    };
    zeige();
  });

  // Tafelkarte im Unterricht: Ziel und Regel der Lektion, „Verstanden“ (E/Enter)
  ui.merke = ({ titel, punkte = [], ziel = '', fach = '' }) => new Promise((ok) => {
    const k = ebeneAuf('merke', '<div class="ly-mk-tafel"><div class="ly-mk-fach">' + esc(fach) + '</div>' + (ziel ? '<p class="ly-mk-ziel">Mein Ziel: ' + esc(ziel) + '</p>' : '') +
      '<h2>' + esc(titel) + '</h2><ul>' + punkte.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul></div><button type="button" class="ly-btn ly-primaer" data-a="ok">Verstanden <kbd>E</kbd></button>');
    const zu = () => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok(); };
    const taste = (e) => { if (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); e.stopPropagation(); zu(); } };
    document.addEventListener('keydown', taste, true);
    k.querySelector('[data-a="ok"]').onclick = zu;
  });

  // Das Blatt: Papier, Kopfzeile, Merkkasten, Aufgaben mit Lücken (Zahlenfeld) oder Zeichen (< = >). Prüfen → richtig ist
  // grün und bleibt, falsch darf man nochmal. Keine Noten.
  ui.arbeitsblatt = ({ blatt, name = '', datum = '', neu = false }) => new Promise((ok) => {
    const aufg = blatt.aufgaben;
    const zeile = (a, i) => {
      if (a.wahl) return '<li data-i="' + i + '"><span class="ly-ab-nr">' + (i + 1) + '</span><span class="ly-ab-t">' + esc(a.t).replace('◻', '<span class="ly-ab-zeichen" data-z="">' + (a.wahl.includes('?') ? '…' : '?') + '</span>') + '</span><span class="ly-ab-wahl">' + a.wahl.map((w) => '<button type="button" data-w="' + esc(w) + '">' + esc(w) + '</button>').join('') + '</span><span class="ly-ab-ok"></span></li>';
      let n = 0;
      const t = esc(a.t).replace(/_{2,}/g, () => '<input type="text" inputmode="decimal" autocomplete="off" data-l="' + (n++) + '" aria-label="Lücke">');
      return '<li data-i="' + i + '"><span class="ly-ab-nr">' + (i + 1) + '</span><span class="ly-ab-t">' + t + '</span><span class="ly-ab-ok"></span>' + (a.tipp ? '<small class="ly-ab-tipp" hidden>💡 ' + esc(a.tipp) + '</small>' : '') + '</li>';
    };
    const fragen = []; aufg.forEach((a) => { if (a.frage && !fragen.includes(a.frage)) fragen.push(a.frage); });
    const k = ebeneAuf('blatt', '<div class="ly-ab-papier"><div class="ly-ab-kopf"><span>Annexe Junglinster · ' + esc(blatt.modul) + '</span><span>Name: <u>' + esc(name) + '</u></span><span>' + esc(datum) + '</span></div>' +
      '<h2>' + esc(blatt.titel) + '</h2><p class="ly-ab-unter">' + esc(blatt.untertitel || '') + '</p>' +
      (blatt.erkl ? '<details class="ly-ab-erkl" open><summary>So geht\'s</summary><p class="ly-ab-idee">' + esc(blatt.erkl.idee) + '</p><ol>' + blatt.erkl.schritte.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ol><p class="ly-ab-bsp"><b>Beispiel:</b> ' + esc(blatt.erkl.beispiel) + '</p></details>' : '') +
      (blatt.info && blatt.info.length ? '<div class="ly-ab-merke"><b>Merke</b>' + blatt.info.map((p) => '<span>' + esc(p) + '</span>').join('') + '</div>' : '') +
      (fragen.length ? '<p class="ly-ab-frage">' + esc(fragen.join(' · ')) + '</p>' : '') +
      '<ol class="ly-ab-liste">' + aufg.map(zeile).join('') + '</ol>' +
      '<div class="ly-ab-fuss"><span class="ly-ab-stand"></span><button type="button" class="ly-btn" data-a="weg">Weglegen</button>' + (neu ? '<button type="button" class="ly-btn" data-a="neu">' + (/^Mathe/.test(blatt.modul || '') ? 'Neue Zahlen' : 'Neue Aufgaben') + '</button>' : '') + '<button type="button" class="ly-btn ly-primaer" data-a="pruefen">Prüfen</button></div></div>');
    const stand = k.querySelector('.ly-ab-stand');
    k.querySelectorAll('.ly-ab-wahl').forEach((w) => w.querySelectorAll('[data-w]').forEach((b) => { b.onclick = () => { const z = w.parentNode.querySelector('.ly-ab-zeichen'); z.textContent = b.dataset.w; z.dataset.z = b.dataset.w; w.querySelectorAll('[data-w]').forEach((x) => x.classList.toggle('an', x === b)); }; }));
    const norm = (v) => String(v || '').trim().replace(/\s/g, '').replace('.', ',');
    const gleich = (v, soll) => { const a = norm(v), b = norm(soll); if (a === b) return true; const x = parseFloat(a.replace(',', '.')), y = parseFloat(b.replace(',', '.')); return a !== '' && /^-?[\d,]+$/.test(a) && !isNaN(x) && x === y; };
    let richtig = 0;
    const pruefen = () => {
      richtig = 0;
      aufg.forEach((a, i) => {
        const li = k.querySelector('li[data-i="' + i + '"]'), okEl = li.querySelector('.ly-ab-ok');
        let gut;
        if (a.wahl) gut = li.querySelector('.ly-ab-zeichen').dataset.z === a.a;
        else { const f = [...li.querySelectorAll('input')]; gut = f.length === a.a.length && f.every((x, j) => gleich(x.value, a.a[j])); if (gut) f.forEach((x) => { x.readOnly = true; }); }
        li.classList.toggle('gut', gut); li.classList.toggle('nochmal', !gut);
        okEl.textContent = gut ? '✓' : '·';
        const tp = li.querySelector('.ly-ab-tipp'); if (tp) tp.hidden = gut;
        if (gut) richtig++;
      });
      stand.textContent = richtig + ' von ' + aufg.length + (richtig === aufg.length ? ' – alles richtig!' : ' – die anderen nochmal?');
      if (richtig === aufg.length) k.querySelector('[data-a="pruefen"]').textContent = 'Fertig';
    };
    const ende = () => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok({ richtig, gesamt: aufg.length }); };
    const taste = (e) => { if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); ende(); } };
    document.addEventListener('keydown', taste, true);
    k.querySelector('[data-a="weg"]').onclick = ende;
    const nb = k.querySelector('[data-a="neu"]'); if (nb) nb.onclick = () => { document.removeEventListener('keydown', taste, true); ebeneZu(); ok({ richtig, gesamt: aufg.length, neu: true }); };
    k.querySelector('[data-a="pruefen"]').onclick = () => { if (richtig === aufg.length && k.querySelector('[data-a="pruefen"]').textContent === 'Fertig') ende(); else pruefen(); };
    const f0 = k.querySelector('input'); if (f0) setTimeout(() => { try { f0.focus({ preventScroll: true }); } catch (e) { /* egal */ } }, 60);
  });

  // Tagesrückblick beim Tageswechsel: wer dir näher oder ferner ist (statt sofortiger Herzen nach jeder Antwort)
  ui.rueckblick = (titel, untertitel, eintraege) => new Promise((ok) => {
    const k = ebeneAuf('bild', '<h2>' + esc(titel) + '</h2><p>' + esc(untertitel) + '</p>' + (eintraege.length ? '<div class="ly-t-kicker">Was hängen bleibt</div><ul class="ly-rb">' +
      eintraege.map((e) => '<li><span class="ly-j-name" style="--f:' + esc(e.farbe) + '">' + esc(e.name) + '</span><b class="' + (e.n > 0 ? 'auf' : 'ab') + '">' + (e.n > 0 ? (e.n > 1 ? 'mag dich mehr' : 'mag dich ein bisschen mehr') : (e.n < -1 ? 'ist sauer auf dich' : 'ist etwas kühler')) + '</b></li>').join('') + '</ul>' : ''));
    let zu = false; const fertig = () => { if (zu) return; zu = true; ebeneZu(); ok(); };
    k.onclick = fertig; setTimeout(fertig, eintraege.length ? 4200 : 2400);
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
