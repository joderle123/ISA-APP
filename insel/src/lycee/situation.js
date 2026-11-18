// Annexe Junglinster – Situations-Spiele. In einem wichtigen Moment geht ein Fenster auf, und man SPIELT die Situation,
// statt nur eine Antwort anzuklicken. Angelehnt an CREW, aber eigene Spiele nur für dieses Spiel.
// Kein richtig/falsch, keine Punkte, keine Noten: die Menschen reagieren, und der Ausgang verändert die Geschichte.
//   ui.hitzeDuell(def)   – Streit: Antwortkarten mit Zeitdruck, Hitze-Balken, Kopf/Bauch/Stolz schlagen Karten vor
//   ui.liveChat(def)     – Handy: Klassenchat in Echtzeit, man kann jederzeit eingreifen (oder nicht)
// Alle: E / Enter = weiter bzw. Standard-Wahl; Zeit läuft ab = Schweigen (zählt auch). „Ruhiger Modus“ = mehr Zeit.
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const warte = (ms) => new Promise((ok) => setTimeout(ok, ms));
const STIMME = { kopf: ['Kopf', '#5f7d9e'], bauch: ['Bauch', '#b0784a'], stolz: ['Stolz', '#b5485d'] };

export function situationen(ui, { name = () => 'Du', ersetze = (t) => t } = {}) {
  const tasten = new Set();
  const halte = (f) => { const h = (e) => f(e); document.addEventListener('keydown', h, true); tasten.add(h); return h; };
  const loesche = () => { tasten.forEach((h) => document.removeEventListener('keydown', h, true)); tasten.clear(); };
  const zeitFaktor = () => (ui.ruhig ? 1.8 : 1) * (ui.einstellungen && ui.einstellungen().text !== 'normal' ? 1.3 : 1);

  // ---------- Hitze-Duell ----------
  // def: { gegner: { name, farbe }, wo, hitze: 0–100, zeit: s, publikum?: 'Text', runden: [ { sagt, karten: [ { t, stimme?, hitze, respekt?, art, antwort } ], still: { antwort, hitze, respekt? } } ] }
  // Rückgabe: { hitze, respekt, knall, arten: { klar: n, … }, wege: [art …] }
  ui.hitzeDuell = (def) => new Promise((ok) => {
    const g = def.gegner;
    const k = ui.ebeneAuf('szene', '<div class="sz sz-hitze">' +
      '<div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Streit') + '</span><b>Hitze-Duell</b></div>' +
      '<div class="sz-leute"><div class="sz-person" style="--f:' + esc(g.farbe) + '"><i class="sz-ava">' + esc(g.name[0]) + '</i><span>' + esc(g.name) + '</span><em class="sz-mimik">😐</em></div>' +
      (def.publikum ? '<div class="sz-publikum">👀 ' + esc(def.publikum) + '</div>' : '') + '</div>' +
      '<div class="sz-balken"><div class="sz-balken-f"></div><span>Hitze</span></div>' +
      '<div class="sz-bühne"></div><div class="sz-zeit"><i></i></div><div class="sz-karten ly-d-optionen"></div></div>');
    const bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten'), fill = k.querySelector('.sz-balken-f'), mimik = k.querySelector('.sz-mimik'), zeitEl = k.querySelector('.sz-zeit i');
    let hitze = def.hitze == null ? 35 : def.hitze, respekt = 0, knall = false;
    const arten = {}, wege = [];
    const zeigeHitze = () => {
      fill.style.width = Math.max(3, Math.min(100, hitze)) + '%';
      fill.style.background = hitze < 35 ? '#5fb07a' : hitze < 70 ? '#e9a23b' : '#d6452f';
      mimik.textContent = hitze < 25 ? '🙂' : hitze < 50 ? '😐' : hitze < 75 ? '😠' : '😡';
      k.querySelector('.sz-hitze').classList.toggle('sz-heiss', hitze >= 75);
    };
    const blase = (wer, text, farbe, ich = false) => {
      bühne.insertAdjacentHTML('beforeend', '<div class="sz-blase' + (ich ? ' ich' : '') + '" style="--f:' + esc(farbe) + '"><b>' + esc(wer) + '</b>' + esc(ersetze(text)) + '</div>');
      while (bühne.children.length > 3) bühne.firstChild.remove();
    };
    const wahl = (r) => new Promise((fertig) => {
      karten.innerHTML = r.karten.map((c, i) => '<button type="button" data-i="' + i + '" style="--f:' + (c.stimme ? STIMME[c.stimme][1] : '#2b3a55') + '">' +
        (c.stimme ? '<small>' + STIMME[c.stimme][0] + ' sagt:</small>' : '') + '<span>' + esc(ersetze(c.t)) + '</span></button>').join('');
      const ms = (def.zeit || 7) * 1000 * zeitFaktor(), t0 = performance.now();
      let aus = false;
      const tick = () => { if (aus) return; const f = 1 - (performance.now() - t0) / ms; zeitEl.style.width = Math.max(0, f * 100) + '%'; if (f <= 0) ende(-1); else requestAnimationFrame(tick); };
      const ende = (i) => { if (aus) return; aus = true; karten.innerHTML = ''; zeitEl.style.width = '0%'; fertig(i); };
      karten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
      halte((e) => { if (aus) return; const n = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3 }[e.code]; if (n != null && n < r.karten.length) { e.preventDefault(); e.stopPropagation(); ende(n); } else if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); ende(0); } });
      requestAnimationFrame(tick);
    });
    (async () => {
      zeigeHitze();
      for (const r of def.runden) {
        if (r.wenn && !r.wenn({ hitze, respekt, arten })) continue;
        blase(g.name, r.sagt, g.farbe);
        await warte(500);
        const i = await wahl(r);
        loesche();
        const c = i >= 0 ? r.karten[i] : { t: '(… nichts sagen)', art: 'still', ...(r.still || {}) };
        arten[c.art] = (arten[c.art] || 0) + 1; wege.push(c.art);
        blase(name(), c.t, '#2b3a55', true);
        hitze = Math.max(0, Math.min(100, hitze + (c.hitze || 0))); respekt += c.respekt || 0;
        zeigeHitze();
        await warte(650);
        if (hitze >= 100) { knall = true; break; }
        if (c.antwort) { blase(g.name, c.antwort, g.farbe); await warte(1500); }
      }
      if (knall) { bühne.insertAdjacentHTML('beforeend', '<div class="sz-knall">KRACH!</div>'); await warte(1400); }
      karten.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      const zu = () => { loesche(); ui.ebeneZu(); ok({ hitze, respekt, knall, arten, wege }); };
      karten.querySelector('[data-a="w"]').onclick = zu;
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
    })();
  });

  // ---------- Live-Chat ----------
  // def: { titel, mitglieder, dauer, nachrichten: [ { nach: s, wer, text, bild?, id?, wenn?: flag, wennNicht?: flag, lacher?: { start, proSek, stopp?: flag } } ],
  //        aktionen: [ { id, t, symbol, setzt?, ich?: 'Text', folgen?: [nachricht …], wahl?: [ { t, setzt?, ich, folgen? } ] } ] }
  // Rückgabe: { flags: { … }, aktionen: [ids], lacher, weg: bool }
  ui.liveChat = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz sz-chat"><div class="sz-handy"><div class="ly-h-kopf">' + esc(def.titel) + '<small>' + esc(def.mitglieder || '') + ' Mitglieder · online</small></div>' +
      '<div class="ly-h-verlauf sz-verlauf" aria-live="polite"></div><div class="ly-h-tippt" hidden></div>' +
      '<div class="sz-aktionen ly-d-optionen"></div><div class="sz-unten"><span class="sz-uhr"></span><button type="button" class="ly-link" data-x="weg">Handy weg <kbd>E</kbd></button></div></div></div>');
    const verlauf = k.querySelector('.sz-verlauf'), tippt = k.querySelector('.ly-h-tippt'), leiste = k.querySelector('.sz-aktionen');
    const flags = {}, gemacht = [], schlange = [];
    let t = 0, zu = false, lacher = 0, letzt = performance.now(), wahlOffen = false;
    const dauer = (def.dauer || 45) * (ui.ruhig ? 1.4 : 1);
    const plan = (n, ab) => schlange.push({ ...n, at: ab + (n.nach || 0) });
    def.nachrichten.forEach((n) => plan(n, 0));
    const lach = [];   // Nachrichten mit wachsenden Reaktionen
    const zeig = (n) => {
      const ich = n.ich;
      const html = n.system ? '<div class="ly-h-sys">' + esc(ersetze(n.text)) + '</div>'
        : '<div class="ly-h-msg' + (ich ? ' ich' : '') + '"><b>' + esc(ich ? 'Du' : n.wer) + '</b>' + (n.bild ? '<div class="ly-h-bild sz-foto">📷 ' + esc(n.bild) + '</div>' : '') + '<span>' + esc(ersetze(n.text)) + '</span>' +
          (n.lacher ? '<i class="ly-h-reakt" data-l="' + lach.length + '">😂 ' + n.lacher.start + '</i>' : '') + '</div>';
      verlauf.insertAdjacentHTML('beforeend', html); verlauf.scrollTop = verlauf.scrollHeight;
      if (n.lacher) lach.push({ ...n.lacher, n: n.lacher.start, el: verlauf.querySelector('[data-l="' + (lach.length) + '"]') });
      if (n.setzt) flags[n.setzt] = true;
    };
    const leisteNeu = () => {
      if (wahlOffen) return;
      leiste.innerHTML = def.aktionen.filter((a) => !gemacht.includes(a.id) && (!a.wenn || flags[a.wenn])).map((a) => '<button type="button" data-ak="' + a.id + '"><kbd>' + a.symbol + '</kbd><span>' + esc(a.t) + '</span></button>').join('');
      leiste.querySelectorAll('[data-ak]').forEach((b) => { b.onclick = () => aktion(def.aktionen.find((a) => a.id === b.dataset.ak)); });
    };
    const ausfuehren = (a, w) => {
      gemacht.push(a.id + (w ? ':' + w.id : ''));
      if (!gemacht.includes(a.id)) gemacht.push(a.id);
      const x = w || a;
      if (x.setzt) [].concat(x.setzt).forEach((f) => { flags[f] = true; });
      if (a.id === 'lachen') lacher++;
      if (x.ich) zeig({ ich: true, text: x.ich });
      if (x.sys) zeig({ system: true, text: x.sys });
      (x.folgen || []).forEach((n) => plan(n, t));
      if (x.ende) { setTimeout(fertig, 900); }
    };
    const aktion = (a) => {
      if (zu || !a) return;
      if (a.wahl) {
        wahlOffen = true;
        leiste.innerHTML = a.wahl.map((w, i) => '<button type="button" data-w="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + esc(ersetze(w.t)) + '</span></button>').join('') + '<button type="button" data-w="-1"><kbd>✕</kbd><span>Doch nicht</span></button>';
        leiste.querySelectorAll('[data-w]').forEach((b) => { b.onclick = () => { wahlOffen = false; const i = +b.dataset.w; if (i >= 0) ausfuehren(a, { id: i, ...a.wahl[i] }); leisteNeu(); }; });
        return;
      }
      ausfuehren(a); leisteNeu();
    };
    const fertig = () => {
      if (zu) return; zu = true; loesche();
      ui.ebeneZu(); ok({ flags, aktionen: gemacht, lacher: lach.reduce((s, l) => s + Math.round(l.n), 0), ich: lacher });
    };
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); if (!flags.__weg) { flags.weg = true; } fertig(); } });
    k.querySelector('[data-x="weg"]').onclick = () => { flags.weg = true; fertig(); };
    leisteNeu();
    let tipptBis = 0; const beginn = performance.now();
    const loop = () => {
      if (zu) return;
      const jetzt = performance.now(), dt = Math.min(0.25, (jetzt - letzt) / 1000); letzt = jetzt; t = (jetzt - beginn) / 1000;   // echte Uhr, auch auf langsamen Geräten
      schlange.sort((a, b) => a.at - b.at);
      const n = schlange[0];
      if (n && n.at - 1.1 <= t && !n.system && !n.ich && n.wer && (!n.wenn || flags[n.wenn]) && (!n.wennNicht || !flags[n.wennNicht])) { tippt.hidden = false; tippt.textContent = n.wer + ' tippt …'; tipptBis = t + 0.3; }
      else if (t > tipptBis) tippt.hidden = true;
      while (schlange.length && schlange[0].at <= t) {
        const m = schlange.shift();
        if ((m.wenn && !flags[m.wenn]) || (m.wennNicht && flags[m.wennNicht])) continue;
        zeig(m); leisteNeu();
      }
      for (const l of lach) { if (l.stopp && flags[l.stopp]) continue; l.n += l.proSek * dt * (1 + lacher); if (l.el) l.el.textContent = '😂 ' + Math.round(l.n); }
      k.querySelector('.sz-uhr').textContent = 'gesehen von ' + Math.min(def.mitglieder || 19, Math.round(3 + t * 0.6));
      if (t > dauer && !schlange.length) { fertig(); return; }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });

  // ---------- Check-in am Handy (Kurs-Ritual Gefühlsrad) ----------
  // def: { frage, posts: [ { wer, wort, farbe } ], reaktion: (wort) => [ { wer, text } ] } → { wort, gefuehl }
  const RAD = [
    ['Freude', '#f2b134', ['gut drauf', 'aufgeregt', 'stolz']], ['Ruhe', '#5fb07a', ['entspannt', 'müde', 'okay']],
    ['Angst', '#8a7bc8', ['nervös', 'unsicher', 'mulmig']], ['Wut', '#d6452f', ['genervt', 'sauer', 'gereizt']],
    ['Trauer', '#4f88c8', ['down', 'leer', 'enttäuscht']], ['Überraschung', '#e9734a', ['verwirrt', 'neugierig', 'baff']],
  ];
  ui.checkIn = (def = {}) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz sz-chat"><div class="sz-handy"><div class="ly-h-kopf">7P2 😎 · Check-in<small>Wetter von heute</small></div>' +
      '<div class="ly-h-verlauf sz-verlauf sz-kurz">' + (def.posts || []).map((p) => '<div class="ly-h-msg"><b>' + esc(p.wer) + '</b><span class="sz-wort" style="--f:' + p.farbe + '">' + esc(p.wort) + '</span></div>').join('') + '</div>' +
      '<div class="sz-rad"><p>' + esc(def.frage || 'Und du? Ein Wort für heute.') + '</p>' + RAD.map(([g, f, w]) => '<div class="sz-rad-reihe" style="--f:' + f + '"><b>' + g + '</b>' + w.map((x) => '<button type="button" data-w="' + esc(x) + '" data-g="' + g + '">' + esc(x) + '</button>').join('') + '</div>').join('') + '</div></div></div>');
    const verlauf = k.querySelector('.sz-verlauf');
    let fertig = false;
    const waehle = async (wort, g) => {
      if (fertig) return; fertig = true; loesche();
      k.querySelector('.sz-rad').innerHTML = '';
      const f = (RAD.find((r) => r[0] === g) || RAD[1])[1];
      verlauf.insertAdjacentHTML('beforeend', '<div class="ly-h-msg ich"><b>Du</b><span class="sz-wort" style="--f:' + f + '">' + esc(wort) + '</span></div>');
      for (const r of (def.reaktion ? def.reaktion(wort, g) : [])) { await warte(1100); verlauf.insertAdjacentHTML('beforeend', '<div class="ly-h-msg"><b>' + esc(r.wer) + '</b><span>' + esc(ersetze(r.text)) + '</span></div>'); verlauf.scrollTop = 9999; }
      await warte(1300); ui.ebeneZu(); ok({ wort, gefuehl: g });
    };
    k.querySelectorAll('[data-w]').forEach((b) => { b.onclick = () => waehle(b.dataset.w, b.dataset.g); });
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); waehle('okay', 'Ruhe'); } });
  });

  // ---------- Namen-Rekord (Kurs E01: Ball-Rekord) ----------
  // def: { leute: [ { id, name, farbe, geste } ], runden: 3, proRunde: 5 } → { treffer, gesamt, rekordZeit, gelernt: [ids] }
  ui.namenRekord = (def) => new Promise((ok) => {
    const L = def.leute, runden = def.runden || 3, pro = def.proRunde || 5;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">Skills-Stunde · Aula</span><b>Namen-Rekord</b></div>' +
      '<p class="sz-info">Erst stellt sich jede:r mit einer Geste vor. Dann fliegt der Ball – du rufst, wer ihn fängt. Jede Runde schneller.</p>' +
      '<div class="sz-kreis"></div><div class="sz-zeit"><i></i></div><div class="sz-karten sz-raster ly-d-optionen"></div><div class="sz-stand"></div></div>');
    const kreis = k.querySelector('.sz-kreis'), karten = k.querySelector('.sz-karten'), stand = k.querySelector('.sz-stand'), zeitEl = k.querySelector('.sz-zeit i');
    kreis.innerHTML = L.map((p, i) => { const w = i / L.length * Math.PI * 2 - Math.PI / 2; return '<div class="sz-platz" data-p="' + p.id + '" style="--f:' + p.farbe + ';left:' + (50 + Math.cos(w) * 40) + '%;top:' + (50 + Math.sin(w) * 38) + '%"><i>' + p.geste + '</i><span>' + esc(p.name) + '</span></div>'; }).join('') + '<div class="sz-ball">🏐</div>';
    const ball = k.querySelector('.sz-ball');
    let treffer = 0, gesamt = 0; const zeiten = [], richtig = {};
    const zuBall = (id) => { const el = kreis.querySelector('[data-p="' + id + '"]'); ball.style.left = el.style.left; ball.style.top = el.style.top; };
    (async () => {
      // Vorstellung
      for (const p of L) { kreis.querySelector('[data-p="' + p.id + '"]').classList.add('an'); zuBall(p.id); stand.textContent = p.name + ': ' + p.geste; await warte(950); }
      kreis.classList.add('verdeckt');
      for (let r = 0; r < runden; r++) {
        const zeit = (4.2 - r * 0.8) * 1000 * zeitFaktor();
        stand.textContent = 'Runde ' + (r + 1) + ' von ' + runden + ' · ' + (zeit / 1000).toFixed(1) + ' s pro Wurf';
        await warte(900);
        let letzte = null;
        for (let n = 0; n < pro; n++) {
          let p; do { p = L[Math.floor(Math.random() * L.length)]; } while (p === letzte); letzte = p;
          zuBall(p.id); kreis.querySelectorAll('.sz-platz').forEach((x) => x.classList.toggle('fang', x.dataset.p === p.id));
          const auswahl = [p, ...L.filter((x) => x !== p).sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5);
          const t0 = performance.now();
          const i = await new Promise((fertig) => {
            karten.innerHTML = auswahl.map((x, j) => '<button type="button" data-i="' + j + '"><span>' + esc(x.name) + '</span></button>').join('');
            let aus = false; const ende = (j) => { if (aus) return; aus = true; loesche(); fertig(j); };
            karten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
            halte((e) => { const m = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3 }[e.code]; if (m != null) { e.preventDefault(); e.stopPropagation(); ende(m); } else if (e.code === 'KeyE') { e.preventDefault(); e.stopPropagation(); ende(0); } });
            const tick = () => { if (aus) return; const f = 1 - (performance.now() - t0) / zeit; zeitEl.style.width = Math.max(0, f * 100) + '%'; if (f <= 0) ende(-1); else requestAnimationFrame(tick); }; tick();
          });
          gesamt++;
          const ok2 = i >= 0 && auswahl[i] === p;
          if (ok2) { treffer++; zeiten.push(performance.now() - t0); richtig[p.id] = (richtig[p.id] || 0) + 1; }
          karten.innerHTML = '<div class="sz-rueck ' + (ok2 ? 'gut' : '') + '">' + (ok2 ? p.name + '! Gefangen.' : 'Das war ' + p.name + '.') + '</div>';
          await warte(650);
        }
      }
      kreis.classList.remove('verdeckt');
      const schnitt = zeiten.length ? zeiten.reduce((a, b) => a + b, 0) / zeiten.length / 1000 : 0;
      stand.textContent = treffer + ' von ' + gesamt + ' Namen' + (schnitt ? ' · im Schnitt ' + schnitt.toFixed(1) + ' s' : '');
      karten.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      const zu = () => { loesche(); ui.ebeneZu(); ok({ treffer, gesamt, schnitt, gelernt: Object.keys(richtig) }); };
      karten.querySelector('[data-a="w"]').onclick = zu;
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
    })();
  });

  // ---------- Zwei Wahrheiten, eine Lüge (Kurs E02) ----------
  // def: { runden: [ { wer: { id, name, farbe }, saetze: [ { t, zeichen } ×3 ], luege: index, aufloesung } ], eigene: [ { t } ], eigeneRater: [ { id, name } ] }
  // → { erraten: [ids], eigeneLuege, reingelegt: [ids] }
  ui.zweiWahrheiten = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">Skills-Stunde · Aula</span><b>Zwei Wahrheiten, eine Lüge</b></div>' +
      '<p class="sz-info">Achte auf die kleinen Zeichen. Wer lügt, verrät sich manchmal – manchmal auch nicht.</p><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const erraten = [], reingelegt = [];
    const klick = (n, inhalt) => new Promise((fertig) => {
      karten.innerHTML = inhalt;
      let aus = false; const ende = (j) => { if (aus) return; aus = true; loesche(); fertig(j); };
      karten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
      halte((e) => { const m = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3 }[e.code]; if (m != null && m < n) { e.preventDefault(); e.stopPropagation(); ende(m); } else if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); ende(0); } });
    });
    (async () => {
      for (const r of def.runden) {
        bühne.innerHTML = '';
        for (const sz of r.saetze) { bühne.insertAdjacentHTML('beforeend', '<div class="sz-blase" style="--f:' + r.wer.farbe + '"><b>' + esc(r.wer.name) + '</b>' + esc(ersetze(sz.t)) + (sz.zeichen ? '<em class="sz-zeichen">' + esc(sz.zeichen) + '</em>' : '') + '</div>'); await warte(900); }
        const i = await klick(3, r.saetze.map((sz, j) => '<button type="button" data-i="' + j + '"><small>Das ist gelogen:</small><span>' + esc(ersetze(sz.t)) + '</span></button>').join(''));
        const getroffen = i === r.luege; if (getroffen) erraten.push(r.wer.id);
        bühne.insertAdjacentHTML('beforeend', '<div class="sz-blase" style="--f:' + r.wer.farbe + '"><b>' + esc(r.wer.name) + '</b>' + esc(ersetze(getroffen ? r.treffer || 'Mist. Erwischt.' : r.daneben || 'Haha! Nein.')) + '</div>');
        if (r.aufloesung) bühne.insertAdjacentHTML('beforeend', '<div class="sz-sys">' + esc(ersetze(r.aufloesung)) + '</div>');
        karten.innerHTML = ''; await warte(2200);
      }
      // Du bist dran: zwei Wahrheiten und eine Lüge über dich (alles ausgedacht)
      bühne.innerHTML = '<div class="sz-sys">Du bist dran. Such dir einen Satz aus, der gelogen ist. Die anderen raten.</div>';
      const e = def.eigene || [];
      const li = await klick(e.length, e.map((x, j) => '<button type="button" data-i="' + j + '"><small>Meine Lüge:</small><span>' + esc(ersetze(x.t)) + '</span></button>').join(''));
      karten.innerHTML = '';
      for (const p of def.eigeneRater || []) {
        const tipp = Math.random() < (p.gut || 0.4) ? li : (li + 1 + Math.floor(Math.random() * (e.length - 1))) % e.length;
        if (tipp !== li) reingelegt.push(p.id);
        bühne.insertAdjacentHTML('beforeend', '<div class="sz-blase" style="--f:' + p.farbe + '"><b>' + esc(p.name) + '</b>' + esc(tipp === li ? (p.richtig || 'Nummer ' + (li + 1) + '. Ich seh das.') : (p.falsch || 'Nummer ' + (tipp + 1) + '. Sicher.')) + '</div>');
        await warte(1100);
      }
      bühne.insertAdjacentHTML('beforeend', '<div class="sz-sys">' + (reingelegt.length ? reingelegt.length + ' reingelegt. Pokerface.' : 'Alle haben es gemerkt. Du lügst schlecht. Ist eigentlich gut.') + '</div>');
      karten.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      const zu = () => { loesche(); ui.ebeneZu(); ok({ erraten, eigeneLuege: li, reingelegt }); };
      karten.querySelector('[data-a="w"]').onclick = zu;
      halte((ev) => { if (ev.code === 'KeyE' || ev.code === 'Enter') { ev.preventDefault(); ev.stopPropagation(); zu(); } });
    })();
  });

  // ---------- Blind-Parcours (Kurs E03) ----------
  // def: { partner: { id, name, farbe }, ziel: 'Tor' } → { vertrauen 0–100, angekommen, zusammenstoesse, stopps, hektik }
  ui.blindParcours = (def) => new Promise((ok) => {
    const P = def.partner;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">Hof · Blind-Parcours</span><b>Lotsen</b></div>' +
      '<p class="sz-info">' + esc(P.name) + ' hat die Augen verbunden. Lotse ' + (P.weib ? 'sie' : 'ihn') + ' mit Ansagen bis ins Tor. Zu hektisch? Dann bleibt ' + esc(P.name) + ' stehen.</p>' +
      '<canvas width="520" height="300"></canvas><div class="sz-balken sz-vertrauen"><div class="sz-balken-f"></div><span>Vertrauen</span></div>' +
      '<div class="sz-steuer ly-d-optionen"><button type="button" data-k="l">⬅ Links</button><button type="button" data-k="g">⬆ Geradeaus</button><button type="button" data-k="r">Rechts ➡</button><button type="button" data-k="s">✋ Stopp</button></div><div class="sz-stand"></div></div>');
    const cv = k.querySelector('canvas'), x = cv.getContext('2d'), fill = k.querySelector('.sz-vertrauen .sz-balken-f'), stand = k.querySelector('.sz-stand');
    const HUET = [[150, 90], [170, 210], [260, 140], [300, 60], [330, 240], [390, 160], [220, 270], [240, 30]];
    let px = 40, py = 150, ri = 0, laeuft = false, vertrauen = 70, stoesse = 0, stopps = 0, hektik = 0, fertig = false, sagt = '', sT = 0;
    const ansagen = []; let last = performance.now();
    const tor = { x: 488, y: 150, r: 34 };
    const zeige = () => { fill.style.width = Math.max(3, vertrauen) + '%'; fill.style.background = vertrauen > 55 ? '#5fb07a' : vertrauen > 30 ? '#e9a23b' : '#d6452f'; };
    const sprech = (t) => { sagt = t; sT = 1.6; };
    const befehl = (b) => {
      if (fertig) return;
      const jetzt = performance.now(); ansagen.push(jetzt); while (ansagen.length && jetzt - ansagen[0] > 1600) ansagen.shift();
      if (ansagen.length > 4) { hektik++; vertrauen -= 8; laeuft = false; sprech('Zu schnell! Stopp. Ich bleib stehen.'); zeige(); return; }
      if (b === 's') { laeuft = false; stopps++; sprech('Okay. Ich steh.'); }
      else if (b === 'g') { laeuft = true; sprech('Geradeaus …'); }
      else { ri += (b === 'l' ? -1 : 1) * Math.PI / 4; sprech(b === 'l' ? 'Links. Okay.' : 'Rechts. Okay.'); }
      zeige();
    };
    k.querySelectorAll('[data-k]').forEach((b) => { b.onclick = () => befehl(b.dataset.k); });
    halte((e) => { const m = { ArrowLeft: 'l', KeyA: 'l', ArrowUp: 'g', KeyW: 'g', ArrowRight: 'r', KeyD: 'r', Space: 's', KeyS: 's', ArrowDown: 's', KeyE: 'g' }[e.code]; if (m) { e.preventDefault(); e.stopPropagation(); befehl(m); } });
    const schluss = (angekommen) => {
      if (fertig) return; fertig = true;
      setTimeout(() => { loesche(); ui.ebeneZu(); ok({ vertrauen: Math.max(0, Math.round(vertrauen)), angekommen, zusammenstoesse: stoesse, stopps, hektik }); }, 1500);
    };
    const t0 = performance.now();
    const draw = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      if (!fertig && laeuft) {
        const nx = px + Math.cos(ri) * 46 * dt, ny = py + Math.sin(ri) * 46 * dt;
        const stoss = HUET.some(([hx, hy]) => Math.hypot(nx - hx, ny - hy) < 20) || ny < 14 || ny > 286 || nx < 12;
        if (stoss) { laeuft = false; stoesse++; vertrauen -= 12; sprech('AU! Da war was!'); zeige(); px -= Math.cos(ri) * 8; py -= Math.sin(ri) * 8; }
        else { px = nx; py = ny; }
        if (Math.hypot(px - tor.x, py - tor.y) < tor.r) { sprech('TOR! Ich hab nichts gesehen und trotzdem!'); schluss(true); }
      }
      if (!fertig && (now - t0) / 1000 > 75 * zeitFaktor()) { sprech('Ich nehm die Augenbinde ab, okay?'); schluss(false); }
      if (!fertig && vertrauen <= 0) { sprech('Ich mach nicht mehr mit. Sorry.'); schluss(false); }
      x.fillStyle = '#7fb36a'; x.fillRect(0, 0, 520, 300);
      x.fillStyle = '#ffffff'; x.fillRect(tor.x + 10, tor.y - 40, 8, 80); x.strokeStyle = '#ffffff'; x.lineWidth = 3; x.strokeRect(tor.x - 6, tor.y - 40, 24, 80);
      for (const [hx, hy] of HUET) { x.fillStyle = '#e9734a'; x.beginPath(); x.moveTo(hx, hy - 14); x.lineTo(hx - 11, hy + 10); x.lineTo(hx + 11, hy + 10); x.closePath(); x.fill(); x.fillStyle = '#fff'; x.fillRect(hx - 7, hy - 2, 14, 3); }
      x.save(); x.translate(px, py); x.rotate(ri);
      x.fillStyle = P.farbe; x.beginPath(); x.arc(0, 0, 13, 0, 7); x.fill(); x.fillStyle = '#1b1d26'; x.fillRect(-4, -11, 8, 22);   // Augenbinde
      x.fillStyle = '#fff'; x.beginPath(); x.moveTo(17, 0); x.lineTo(9, -5); x.lineTo(9, 5); x.fill(); x.restore();
      if (sT > 0) { sT -= dt; x.fillStyle = 'rgba(255,255,255,.92)'; x.font = 'bold 15px system-ui'; const w = x.measureText(sagt).width + 16; const bx = Math.min(520 - w - 4, Math.max(4, px - w / 2)); x.fillRect(bx, py - 48, w, 24); x.fillStyle = '#1b1d26'; x.fillText(sagt, bx + 8, py - 31); }
      stand.textContent = 'Zusammenstöße: ' + stoesse + ' · Ansagen ruhig halten';
      if (!fertig || sT > 0) requestAnimationFrame(draw);
    };
    zeige(); sprech('Ich seh nix. Gar nix. Okay. Los.'); requestAnimationFrame(draw);
  });

  // ---------- Tank-Raten (Kurs E04: Glas der Bedürfnisse, Warnlicht-Raten) ----------
  // Die sechs Tanks aus dem Kurs. def: { faelle: [ { wer: { id, name, farbe }, szene, zeichen: [..], tank, tankstellen: [ { t, passt, antwort } ], falsch } ] }
  // → { richtig: [ids], geholfen: [ids] }
  const TANKS = [['koerper', 'Körper', '🍎'], ['sicherheit', 'Sicherheit', '🛡️'], ['dazu', 'Dazugehören', '🤝'], ['ernst', 'Ernst genommen werden', '👂'], ['selbst', 'Selbst entscheiden', '🧭'], ['spass', 'Spaß und Neues', '🎉']];
  ui.TANKS = TANKS;
  ui.tankRaten = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Skills-Stunde') + '</span><b>Warnlicht: Welcher Tank ist leer?</b></div>' +
      '<div class="sz-bühne"></div><div class="sz-karten sz-raster ly-d-optionen"></div><div class="sz-stand"></div></div>');
    const bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten'), stand = k.querySelector('.sz-stand');
    const richtig = [], geholfen = [];
    const wahl = (html, n) => new Promise((fertig) => { karten.innerHTML = html; let aus = false; const ende = (j) => { if (aus) return; aus = true; loesche(); fertig(j); };
      karten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
      halte((e) => { const m = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Digit5: 4, Digit6: 5 }[e.code]; if (m != null && m < n) { e.preventDefault(); e.stopPropagation(); ende(m); } else if (e.code === 'KeyE') { e.preventDefault(); e.stopPropagation(); ende(0); } }); });
    (async () => {
      for (const f of def.faelle) {
        bühne.innerHTML = '<div class="sz-fall" style="--f:' + f.wer.farbe + '"><b>' + esc(f.wer.name) + '</b><p>' + esc(ersetze(f.szene)) + '</p>' + f.zeichen.map((z) => '<em>' + esc(z) + '</em>').join('') + '</div>';
        stand.textContent = 'Welcher Tank blinkt bei ' + f.wer.name + '?';
        const i = await wahl(TANKS.map(([id, n, sy], j) => '<button type="button" data-i="' + j + '"><span>' + sy + ' ' + esc(n) + '</span></button>').join(''), 6);
        const treffer = TANKS[i] && TANKS[i][0] === f.tank;
        if (treffer) richtig.push(f.wer.id);
        bühne.insertAdjacentHTML('beforeend', '<div class="sz-sys">' + (treffer ? 'Ja. ' + TANKS.find((t) => t[0] === f.tank)[1] + ' ist leer.' : esc(ersetze(f.falsch || 'Hm. Eher nicht.'))) + '</div>');
        await warte(900);
        stand.textContent = 'Was würde ' + f.wer.name + ' in zehn Minuten helfen?';
        const j = await wahl(f.tankstellen.map((t, m) => '<button type="button" data-i="' + m + '"><span>' + esc(ersetze(t.t)) + '</span></button>').join(''), f.tankstellen.length);
        const t = f.tankstellen[j] || f.tankstellen[0];
        if (t.passt) geholfen.push(f.wer.id);
        bühne.insertAdjacentHTML('beforeend', '<div class="sz-blase" style="--f:' + f.wer.farbe + '"><b>' + esc(f.wer.name) + '</b>' + esc(ersetze(t.antwort)) + '</div>');
        karten.innerHTML = ''; await warte(2300);
      }
      stand.textContent = '';
      karten.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      const zu = () => { loesche(); ui.ebeneZu(); ok({ richtig, geholfen }); };
      karten.querySelector('[data-a="w"]').onclick = zu;
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
    })();
  });

  // Meine Tanks: privat einschätzen (wird nie gezeigt oder bewertet). → { werte: { id: 0–4 }, blinkt: id }
  ui.meineTanks = () => new Promise((ok) => {
    const werte = Object.fromEntries(TANKS.map(([id]) => [id, 2]));
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">Meine Tanks</span><b>Privat · sieht niemand</b></div>' +
      '<p class="sz-info">Wie voll ist jeder Tank heute? Tippe so oft, bis es passt.</p><div class="sz-tanks"></div>' +
      '<div class="sz-karten"><button type="button" class="sz-weiter" data-a="w">Fertig <kbd>E</kbd></button></div></div>');
    const box = k.querySelector('.sz-tanks');
    const zeig = () => { box.innerHTML = TANKS.map(([id, n, sy]) => '<button type="button" data-t="' + id + '" class="sz-tank"><i style="height:' + (werte[id] * 25) + '%"></i><span>' + sy + '<br>' + esc(n) + '</span></button>').join('');
      box.querySelectorAll('[data-t]').forEach((b) => { b.onclick = () => { werte[b.dataset.t] = (werte[b.dataset.t] + 1) % 5; zeig(); }; }); };
    zeig();
    const zu = () => { loesche(); ui.ebeneZu(); const blinkt = Object.entries(werte).sort((a, b) => a[1] - b[1])[0][0]; ok({ werte, blinkt }); };
    k.querySelector('[data-a="w"]').onclick = zu;
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
  });

  // ---------- Die Linie (Kurs E05: Zwischen laut und leise, Selbst- und Fremdbild) ----------
  // def: { paare: [ [links, rechts] … ], fremd: [ { wer: { name, farbe }, werte: [0–4 …] } ] } → { selbst: [0–4], abweichung: [ { paar, wer, diff } ] }
  ui.linie = (def) => new Promise((ok) => {
    const P = def.paare, selbst = P.map(() => 2);
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">Aula · Die Linie</span><b>Wo stehst du?</b></div>' +
      '<p class="sz-info">Stell dich auf jede Linie. Es gibt kein Besser. Danach zeigen drei aus der Klasse, wo SIE dich sehen.</p><div class="sz-linien"></div>' +
      '<div class="sz-karten"><button type="button" class="sz-weiter" data-a="w">So steh ich <kbd>E</kbd></button></div></div>');
    const box = k.querySelector('.sz-linien'), karten = k.querySelector('.sz-karten');
    const zeig = (mitFremd) => {
      box.innerHTML = P.map(([l, r], i) => '<div class="sz-linie"><span>' + esc(l) + '</span><div class="sz-strich">' +
        [0, 1, 2, 3, 4].map((v) => '<button type="button" data-p="' + i + '" data-v="' + v + '" class="' + (selbst[i] === v ? 'ich' : '') + '"></button>').join('') +
        (mitFremd ? def.fremd.map((f, j) => '<i class="sz-punkt" style="--f:' + f.wer.farbe + ';left:' + (f.werte[i] * 25) + '%;top:' + (-6 + j * 6) + 'px" title="' + esc(f.wer.name) + '">' + esc(f.wer.name[0]) + '</i>').join('') : '') +
        '</div><span>' + esc(r) + '</span></div>').join('') + (mitFremd ? '<div class="sz-legende">' + def.fremd.map((f) => '<i style="--f:' + f.wer.farbe + '">' + esc(f.wer.name[0]) + '</i> ' + esc(f.wer.name)).join(' · ') + ' · <b>●</b> du</div>' : '');
      if (!mitFremd) box.querySelectorAll('[data-p]').forEach((b) => { b.onclick = () => { selbst[+b.dataset.p] = +b.dataset.v; zeig(false); }; });
    };
    zeig(false);
    let phase = 0;
    const weiter = () => {
      if (phase === 0) {
        phase = 1; loesche(); zeig(true);
        const abw = []; P.forEach((p, i) => def.fremd.forEach((f) => { const d = f.werte[i] - selbst[i]; if (Math.abs(d) >= 2) abw.push({ paar: i, wer: f.wer.name, diff: d }); }));
        const top = abw.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))[0];
        karten.innerHTML = '<div class="sz-sys">' + (top ? esc(top.wer + ' sieht dich viel ' + (top.diff > 0 ? P[top.paar][1] : P[top.paar][0]) + ', als du denkst.') : 'Die anderen sehen dich ziemlich so wie du dich.') + '</div><button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
        karten.querySelector('[data-a="w"]').onclick = () => { loesche(); ui.ebeneZu(); ok({ selbst, abweichung: abw }); };
        halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); loesche(); ui.ebeneZu(); ok({ selbst, abweichung: abw }); } });
      }
    };
    karten.querySelector('[data-a="w"]').onclick = weiter;
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); weiter(); } });
  });

  // ---------- Stärken verschenken (Kurs E06: Baum der Stärke) ----------
  // def: { an: [ { wer: { id, name, farbe }, karten: [ { t, konkret, antwort } ] } ], bekommen: [ { wer: { name, farbe }, t } ] } → { konkret: [ids], allgemein: [ids] }
  ui.staerkenSchenken = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">Aula · Baum der Stärke</span><b>Stärken verschenken</b></div>' +
      '<p class="sz-info">Eine Karte für jede Person. Am besten mit etwas, das du wirklich gesehen hast.</p><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const konkret = [], allgemein = [];
    const wahl = (html, n) => new Promise((fertig) => { karten.innerHTML = html; let aus = false; const ende = (j) => { if (aus) return; aus = true; loesche(); fertig(j); };
      karten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
      halte((e) => { const m = { Digit1: 0, Digit2: 1, Digit3: 2 }[e.code]; if (m != null && m < n) { e.preventDefault(); e.stopPropagation(); ende(m); } else if (e.code === 'KeyE') { e.preventDefault(); e.stopPropagation(); ende(0); } }); });
    (async () => {
      for (const a of def.an) {
        bühne.innerHTML = '<div class="sz-sys">Karte für ' + esc(a.wer.name) + '</div>';
        const i = await wahl(a.karten.map((c, j) => '<button type="button" data-i="' + j + '" class="sz-skarte"><small>Stärken-Karte für ' + esc(a.wer.name) + '</small><span>' + esc(ersetze(c.t)) + '</span></button>').join(''), a.karten.length);
        const c = a.karten[i] || a.karten[0];
        (c.konkret ? konkret : allgemein).push(a.wer.id);
        bühne.insertAdjacentHTML('beforeend', '<div class="sz-blase" style="--f:' + a.wer.farbe + '"><b>' + esc(a.wer.name) + '</b>' + esc(ersetze(c.antwort)) + '</div>');
        karten.innerHTML = ''; await warte(2200);
      }
      bühne.innerHTML = '<div class="sz-sys">Und du bekommst auch Karten.</div>';
      for (const g of def.bekommen || []) { await warte(900); bühne.insertAdjacentHTML('beforeend', '<div class="sz-skarte sz-bekommen" style="--f:' + g.wer.farbe + '"><small>von ' + esc(g.wer.name) + '</small><span>' + esc(ersetze(g.t)) + '</span></div>'); }
      await warte(600);
      karten.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      const zu = () => { loesche(); ui.ebeneZu(); ok({ konkret, allgemein }); };
      karten.querySelector('[data-a="w"]').onclick = zu;
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
    })();
  });

  // ---------- Nachhaken (Kurs E02: Fragen stellen und nachhaken) ----------
  // def: { wo, wer: { id, name, farbe }, start, runden: [ { fragen: [ { t, art: 'offen'|'zu'|'nachhaken'|'ueber-mich', antwort, offen: +n } ] } ], stufen: [ 'Text bei 0', '…bei 1', … ] }
  // Die Person „öffnet“ sich mit guten Fragen (Balken). → { offen, arten }
  ui.nachhaken = (def) => new Promise((ok) => {
    const W = def.wer;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Interview') + '</span><b>Nachhaken</b></div>' +
      '<div class="sz-leute"><div class="sz-person" style="--f:' + esc(W.farbe) + '"><i class="sz-ava">' + esc(W.name[0]) + '</i><span>' + esc(W.name) + '</span></div><div class="sz-publikum">Steckbrief: <b class="sz-zeilen">0</b> Zeilen</div></div>' +
      '<div class="sz-balken"><div class="sz-balken-f"></div><span>erzählt</span></div><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten'), fill = k.querySelector('.sz-balken-f'), zeilen = k.querySelector('.sz-zeilen');
    let offen = 0, z = 0; const arten = {};
    const zeige = () => { fill.style.width = Math.max(4, Math.min(100, offen * 20)) + '%'; fill.style.background = '#5fa0d0'; zeilen.textContent = z; };
    const blase = (wer, text, farbe, ich) => { bühne.insertAdjacentHTML('beforeend', '<div class="sz-blase' + (ich ? ' ich' : '') + '" style="--f:' + farbe + '"><b>' + esc(wer) + '</b>' + esc(ersetze(text)) + '</div>'); while (bühne.children.length > 4) bühne.firstChild.remove(); };
    (async () => {
      zeige(); blase(W.name, def.start, W.farbe); await warte(700);
      for (const r of def.runden) {
        const opt = typeof r.fragen === 'function' ? r.fragen(offen) : r.fragen;
        const i = await new Promise((fertig) => {
          karten.innerHTML = opt.map((f, j) => '<button type="button" data-i="' + j + '"><span>' + esc(ersetze(f.t)) + '</span></button>').join('');
          let aus = false; const ende = (j) => { if (aus) return; aus = true; loesche(); fertig(j); };
          karten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
          halte((e) => { const m = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3 }[e.code]; if (m != null && m < opt.length) { e.preventDefault(); e.stopPropagation(); ende(m); } else if (e.code === 'KeyE') { e.preventDefault(); e.stopPropagation(); ende(0); } });
        });
        const f = opt[i]; arten[f.art] = (arten[f.art] || 0) + 1;
        karten.innerHTML = '';
        blase('Du', f.t, '#2b3a55', true); await warte(600);
        offen = Math.max(0, offen + (f.offen || 0)); if ((f.offen || 0) > 0) z += f.offen; zeige();
        blase(W.name, typeof f.antwort === 'function' ? f.antwort(offen) : f.antwort, W.farbe); await warte(1500);
      }
      karten.innerHTML = '<div class="sz-sys">' + esc((def.stufen || [])[Math.min((def.stufen || []).length - 1, offen)] || '') + '</div><button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      const zu = () => { loesche(); ui.ebeneZu(); ok({ offen, arten, zeilen: z }); };
      karten.querySelector('[data-a="w"]').onclick = zu;
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
    })();
  });

  // ---------- Teams wählen (Sport): du bist Kapitän:in, abwechselnd mit jemand anderem ----------
  // def: { gegner: { name, farbe }, leute: [ { id, name, farbe, info } ], gegnerWahl: [ids in Reihenfolge] } → { team: [ids], letzte: id, zuerst: id }
  ui.teamsWaehlen = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">Turnhalle · Korbball</span><b>Teams wählen</b></div>' +
      '<p class="sz-info">Du und ' + esc(def.gegner.name) + ' wählt abwechselnd. Alle stehen an der Wand und warten.</p><div class="sz-wand"></div><div class="sz-teams"><div><b>Dein Team</b><span data-t="ich"></span></div><div><b>' + esc(def.gegner.name) + '</b><span data-t="er"></span></div></div><div class="sz-stand"></div></div>');
    const wand = k.querySelector('.sz-wand'), stand = k.querySelector('.sz-stand');
    const frei = def.leute.slice(), team = [], gegner = []; let zuerst = null;
    const zeig = (meinZug) => {
      wand.innerHTML = frei.map((p) => '<button type="button" data-p="' + p.id + '" style="--f:' + p.farbe + '"' + (meinZug ? '' : ' disabled') + '><i>' + esc(p.name[0]) + '</i><span>' + esc(p.name) + '</span><small>' + esc(p.info || '') + '</small></button>').join('');
      k.querySelector('[data-t="ich"]').textContent = team.map((id) => def.leute.find((p) => p.id === id).name).join(', ');
      k.querySelector('[data-t="er"]').textContent = gegner.map((id) => def.leute.find((p) => p.id === id).name).join(', ');
    };
    const meinZug = () => new Promise((fertig) => {
      zeig(true); stand.textContent = 'Du wählst.' + (frei.length === 2 ? ' Noch zwei an der Wand.' : '');
      let aus = false; const ende = (id) => { if (aus) return; aus = true; loesche(); fertig(id); };
      wand.querySelectorAll('[data-p]').forEach((b) => { b.onclick = () => ende(b.dataset.p); });
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); ende(frei[0].id); } });
    });
    (async () => {
      let ich = true;
      while (frei.length > 1) {
        if (ich) { const id = await meinZug(); if (!zuerst) zuerst = id; team.push(id); frei.splice(frei.findIndex((p) => p.id === id), 1); }
        else { zeig(false); stand.textContent = def.gegner.name + ' wählt …'; await warte(1100); const id = def.gegnerWahl.find((x) => frei.some((p) => p.id === x)) || frei[0].id; gegner.push(id); frei.splice(frei.findIndex((p) => p.id === id), 1); }
        ich = !ich;
      }
      const letzte = frei[0]; (ich ? team : gegner).push(letzte.id); frei.length = 0; zeig(false);
      stand.textContent = letzte.name + ' bleibt übrig – und geht ' + (ich ? 'in dein Team.' : 'zu ' + def.gegner.name + '.');
      await warte(1400);
      k.insertAdjacentHTML('beforeend', '<div class="sz-karten"><button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button></div>');
      const zu = () => { loesche(); ui.ebeneZu(); ok({ team, letzte: letzte.id, zuerst }); };
      k.querySelector('[data-a="w"]').onclick = zu;
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
    })();
  });

  // ---------- Stempel im Skills-Pass (Kurs-Ritual am Ende jedes Kapitels) ----------
  ui.skillsStempel = ({ modul, titel, gelernt = [], mission }) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz sz-pass"><div class="sz-kopf"><span class="sz-wo">Skills-Pass</span><b>' + esc(modul) + '</b></div>' +
      '<div class="sz-stempel">' + esc(titel) + '<i>✔</i></div>' + (gelernt.length ? '<ul class="sz-gelernt">' + gelernt.map((g) => '<li>' + esc(g) + '</li>').join('') + '</ul>' : '') +
      (mission ? '<div class="sz-mission"><b>Mission</b>' + esc(mission) + '</div>' : '') + '<div class="sz-karten"><button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button></div></div>');
    const zu = () => { loesche(); ui.ebeneZu(); ok(); };
    k.querySelector('[data-a="w"]').onclick = zu;
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
  });

  return ui;
}
