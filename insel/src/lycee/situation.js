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
    let hitze = def.hitze == null ? 35 : def.hitze, respekt = 0, knall = false, bemerkt = 0;
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
      halte((e) => { if (aus) return; const n = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Digit5: 4 }[e.code]; if (n != null && n < r.karten.length) { e.preventDefault(); e.stopPropagation(); ende(n); } else if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); ende(0); } });
      // Frühwarn-Signal (Kurs E09): kurz sichtbar; wer es antippt, merkt es rechtzeitig und bekommt eine ruhige Extra-Karte
      if (r.warn) setTimeout(() => {
        if (aus) return;
        const w = document.createElement('button'); w.type = 'button'; w.className = 'sz-warn'; w.innerHTML = '⚠ <b>' + esc(r.warn) + '</b><small>Tippen, wenn du es merkst</small>';
        karten.before(w);
        const weg = setTimeout(() => w.remove(), 2600 * zeitFaktor());
        w.onclick = () => { clearTimeout(weg); w.remove(); bemerkt++; hitze = Math.max(0, hitze - 10); zeigeHitze();
          r.karten.push({ t: r.skill || '(Kurz weggucken. Ausatmen. Dann reden.)', art: 'skill', hitze: -18, respekt: 1, antwort: r.skillAntwort || '(wartet) … Okay. Was?' });
          const j = r.karten.length - 1; karten.insertAdjacentHTML('beforeend', '<button type="button" data-i="' + j + '" class="sz-skill" style="--f:#5fb07a"><small>Skill</small><span>' + esc(ersetze(r.karten[j].t)) + '</span></button>');
          karten.querySelector('[data-i="' + j + '"]').onclick = () => ende(j); };
      }, 1300);
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
        k.querySelectorAll('.sz-warn').forEach((w) => w.remove());
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
      const zu = () => { loesche(); ui.ebeneZu(); ok({ hitze, respekt, knall, arten, wege, bemerkt }); };
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
        : '<div class="ly-h-msg' + (ich ? ' ich' : '') + '"><b>' + esc(ich ? 'Du' : n.wer) + '</b>' + (n.bild ? '<div class="ly-h-bild sz-foto">📷 ' + esc(ersetze(n.bild)) + '</div>' : '') + '<span>' + esc(ersetze(n.text)) + '</span>' +
          (n.lacher ? '<i class="ly-h-reakt" data-l="' + lach.length + '">😂 ' + n.lacher.start + '</i>' : '') + '</div>';
      verlauf.insertAdjacentHTML('beforeend', html); verlauf.scrollTop = verlauf.scrollHeight;
      if (n.lacher) lach.push({ ...n.lacher, n: n.lacher.start, el: verlauf.querySelector('[data-l="' + (lach.length) + '"]') });
      if (n.setzt) { flags[n.setzt] = true; leisteNeu(); }
    };
    const leisteNeu = () => {
      if (wahlOffen) return;
      leiste.innerHTML = def.aktionen.filter((a) => !gemacht.includes(a.id) && (!a.wenn || flags[a.wenn]) && (!a.wennNicht || !flags[a.wennNicht])).map((a) => '<button type="button" data-ak="' + a.id + '"><kbd>' + a.symbol + '</kbd><span>' + esc(a.t) + '</span></button>').join('');
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
      for (const l of lach) { if (l.stopp && [].concat(l.stopp).some((f) => flags[f])) continue; l.n += l.proSek * dt * (1 + lacher); if (l.el) l.el.textContent = '😂 ' + Math.round(l.n); }
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
    ['Trauer', '#4f88c8', ['down', 'leer', 'enttäuscht']], ['Ekel', '#5fa04a', ['angeekelt', 'bäh', 'zu viel']], ['Überraschung', '#e9734a', ['verwirrt', 'neugierig', 'baff']],
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
    let treffer = 0, gesamt = 0; const zeiten = [], richtig = {}, rundenZeit = [];
    const zuBall = (id) => { const el = kreis.querySelector('[data-p="' + id + '"]'); ball.style.left = el.style.left; ball.style.top = el.style.top; };
    (async () => {
      // Vorstellung
      for (const p of L) { kreis.querySelector('[data-p="' + p.id + '"]').classList.add('an'); zuBall(p.id); stand.textContent = p.name + ': ' + p.geste; await warte(950); }
      kreis.classList.add('verdeckt');
      for (let r = 0; r < runden; r++) {
        const zeit = 4 * 1000 * zeitFaktor();   // gleiche Zeit jede Runde – man sieht, wie man selbst schneller wird (Üben wirkt)
        stand.textContent = 'Runde ' + (r + 1) + ' von ' + runden + (rundenZeit.length ? ' · bisher: ' + rundenZeit.map((z) => z.toFixed(1) + ' s').join(' → ') : '');
        const vorher = zeiten.length;
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
        const neu = zeiten.slice(vorher); if (neu.length) rundenZeit.push(neu.reduce((a, b) => a + b, 0) / neu.length / 1000);
      }
      kreis.classList.remove('verdeckt');
      const schnitt = zeiten.length ? zeiten.reduce((a, b) => a + b, 0) / zeiten.length / 1000 : 0;
      stand.textContent = treffer + ' von ' + gesamt + ' Namen' + (rundenZeit.length ? ' · Zeit je Wurf: ' + rundenZeit.map((z) => z.toFixed(1) + ' s').join(' → ') : '');
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
        karten.innerHTML = '<div class="sz-sys">' + (top ? esc(top.wer + ' sieht dich mehr bei „' + (top.diff > 0 ? P[top.paar][1] : P[top.paar][0]) + '“ als du dich.') : 'Die anderen sehen dich ziemlich so wie du dich.') + '</div><button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
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
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Aula · Baum der Stärke') + '</span><b>' + esc(def.titel || 'Stärken verschenken') + '</b></div>' +
      '<p class="sz-info">' + esc(def.info || 'Eine Karte für jede Person. Am besten mit etwas, das du wirklich gesehen hast.') + '</p><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
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

  // ---------- Gefühle (Kurs Modul 2): sechs Grundgefühle mit Farbe und Zeichen ----------
  const GEF = { freude: ['Freude', '#f2b134', '😄'], trauer: ['Trauer', '#4f88c8', '😢'], wut: ['Wut', '#d6452f', '😠'], angst: ['Angst', '#8a7bc8', '😨'], ekel: ['Ekel', '#5fa04a', '🤢'], ueberraschung: ['Überraschung', '#e9734a', '😲'] };
  ui.GEF = GEF;

  // ---------- Gefühls-Pult (Kurs E08: Wer greift zum Steuer?) ----------
  // def: { wo, szene, versionen: { wut: [ ['wer', 'Text'] … ], … }, maxSehen: 2 } → { gesehen: [ids], final: id }
  ui.gefuehlsPult = (def) => new Promise((ok) => {
    const ids = Object.keys(def.versionen);
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>Gefühls-Pult</b></div>' +
      '<div class="sz-fall" style="--f:#2b3a55"><p>' + esc(ersetze(def.szene)) + '</p></div><p class="sz-info">Welches Gefühl greift zum Steuer? Du kannst zurückspulen und eine zweite Version ansehen.</p>' +
      '<div class="sz-pult"></div><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const pultEl = k.querySelector('.sz-pult'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const gesehen = [];
    const pult = (nur, text) => new Promise((fertig) => {
      pultEl.innerHTML = ids.map((id) => '<button type="button" data-g="' + id + '" style="--f:' + GEF[id][1] + '"' + (nur && !nur.includes(id) ? ' disabled' : '') + (gesehen.includes(id) ? ' class="gesehen"' : '') + '><i>' + GEF[id][2] + '</i><span>' + GEF[id][0] + '</span></button>').join('');
      karten.innerHTML = text ? '<div class="sz-sys">' + esc(text) + '</div>' : '';
      let aus = false; const ende = (id) => { if (aus) return; aus = true; loesche(); fertig(id); };
      pultEl.querySelectorAll('[data-g]:not([disabled])').forEach((b) => { b.onclick = () => ende(b.dataset.g); });
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); ende((nur || ids).find((x) => !gesehen.includes(x)) || (nur || ids)[0]); } });
    });
    const spiele = async (id) => {
      bühne.innerHTML = '<div class="sz-sys" style="background:' + GEF[id][1] + ';color:#fff">' + GEF[id][2] + ' ' + GEF[id][0] + ' am Steuer</div>';
      for (const [wer, t] of def.versionen[id]) { await warte(1000); bühne.insertAdjacentHTML('beforeend', '<div class="sz-blase' + (wer === 'du' ? ' ich' : '') + '" style="--f:' + (wer === 'du' ? '#2b3a55' : GEF[id][1]) + '"><b>' + esc(wer === 'du' ? 'Du' : wer === 'erzaehler' ? '' : wer) + '</b>' + esc(ersetze(t)) + '</div>'); }
      await warte(1300);
    };
    (async () => {
      const a = await pult(null); gesehen.push(a); pultEl.innerHTML = ''; await spiele(a);
      const nochmal = await new Promise((fertig) => {
        karten.innerHTML = '<button type="button" data-i="0"><span>⏪ Zurückspulen: anderes Gefühl ans Steuer</span></button><button type="button" data-i="1"><span>So lassen</span></button>';
        let aus = false; const ende = (j) => { if (aus) return; aus = true; loesche(); fertig(j); };
        karten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
        halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); ende(0); } });
      });
      let final = a;
      if (nochmal === 0) {
        const b2 = await pult(ids.filter((x) => x !== a)); gesehen.push(b2); pultEl.innerHTML = ''; await spiele(b2);
        final = await pult([a, b2], 'Welche Version passiert wirklich?');
      }
      pultEl.innerHTML = ''; bühne.innerHTML = '<div class="sz-sys" style="background:' + GEF[final][1] + ';color:#fff">So passiert es: ' + GEF[final][0] + ' war am Steuer.</div>';
      karten.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      const zu = () => { loesche(); ui.ebeneZu(); ok({ gesehen, final }); };
      karten.querySelector('[data-a="w"]').onclick = zu;
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
    })();
  });

  // ---------- Gesichter lesen (Kurs E07 Pantomime, E09 Statuen) ----------
  // def: { wo, titel, leute: [ { wer: { id, name, farbe }, zeichen: [..], gefuehl: id, aufloesung } ] } → { richtig: [ids], falsch: [ids] }
  ui.gesichterLesen = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>' + esc(def.titel || 'Gesichter lesen') + '</b></div>' +
      '<p class="sz-info">Die Szene friert ein. Schau auf Hände, Blick, Haltung. Was fühlt die Person?</p><div class="sz-bühne"></div><div class="sz-karten sz-raster ly-d-optionen"></div></div>');
    const bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const richtig = [], falsch = [];
    (async () => {
      for (const p of def.leute) {
        bühne.innerHTML = '<div class="sz-statue" style="--f:' + p.wer.farbe + '"><i>' + esc(p.wer.name[0]) + '</i><div><b>' + esc(p.wer.name) + '</b>' + p.zeichen.map((z) => '<em>' + esc(z) + '</em>').join('') + '</div></div>';
        const ids = Object.keys(GEF);
        const g = await new Promise((fertig) => {
          karten.innerHTML = ids.map((id, j) => '<button type="button" data-i="' + j + '" style="--f:' + GEF[id][1] + '"><span>' + GEF[id][2] + ' ' + GEF[id][0] + '</span></button>').join('');
          let aus = false; const ende = (j) => { if (aus) return; aus = true; loesche(); fertig(ids[j]); };
          karten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
          halte((e) => { const m = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Digit5: 4, Digit6: 5 }[e.code]; if (m != null) { e.preventDefault(); e.stopPropagation(); ende(m); } else if (e.code === 'KeyE') { e.preventDefault(); e.stopPropagation(); ende(0); } });
        });
        const passt = [].concat(p.gefuehl).includes(g); (passt ? richtig : falsch).push(p.wer.id);
        karten.innerHTML = '';
        bühne.insertAdjacentHTML('beforeend', '<div class="sz-sys">Du: ' + GEF[g][2] + ' ' + GEF[g][0] + ' · ' + esc(ersetze(p.aufloesung || '')) + '</div>');
        await warte(2300);
      }
      karten.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      const zu = () => { loesche(); ui.ebeneZu(); ok({ richtig, falsch }); };
      karten.querySelector('[data-a="w"]').onclick = zu;
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
    })();
  });

  // ---------- Mischpult (Kurs E10: gemischte Gefühle, 0–10) ----------
  // def: { wo, ereignis, gefuehle: [ids], vergleich: { wer: { name, farbe }, werte: { id: n }, satz } } → { werte, staerkstes, gemischt }
  ui.mischpult = (def) => new Promise((ok) => {
    const ids = def.gefuehle || Object.keys(GEF), werte = Object.fromEntries(ids.map((id) => [id, 0]));
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>Mischpult</b></div>' +
      '<div class="sz-fall" style="--f:#2b3a55"><p>' + esc(ersetze(def.ereignis)) + '</p></div><p class="sz-info">Was ist alles da? Mehrere Gefühle gleichzeitig sind normal. Schieb jeden Regler von 0 bis 10.</p>' +
      '<div class="sz-mischpult">' + ids.map((id) => '<label style="--f:' + GEF[id][1] + '"><span>' + GEF[id][2] + '</span><input type="range" min="0" max="10" step="1" value="0" data-g="' + id + '"><b data-z="' + id + '">0</b><small>' + GEF[id][0] + '</small><i class="sz-fremd" data-f="' + id + '"></i></label>').join('') + '</div>' +
      '<div class="sz-karten"><button type="button" class="sz-weiter" data-a="w">So ist es <kbd>E</kbd></button></div></div>');
    k.querySelectorAll('[data-g]').forEach((r) => { r.addEventListener('keydown', (e) => e.stopPropagation()); r.oninput = () => { werte[r.dataset.g] = +r.value; k.querySelector('[data-z="' + r.dataset.g + '"]').textContent = r.value; }; });
    let phase = 0;
    const weiter = () => {
      if (phase === 0 && def.vergleich) {
        phase = 1; loesche();
        for (const id of ids) { const v = def.vergleich.werte[id] || 0; const el = k.querySelector('[data-f="' + id + '"]'); el.style.bottom = (v * 10) + '%'; el.textContent = def.vergleich.wer.name[0]; el.style.setProperty('--w', def.vergleich.wer.farbe); el.title = def.vergleich.wer.name + ': ' + v; }
        k.querySelectorAll('[data-g]').forEach((r) => { r.disabled = true; });
        k.querySelector('.sz-karten').innerHTML = '<div class="sz-sys">' + esc(def.vergleich.wer.name) + ': „' + esc(ersetze(def.vergleich.satz || 'Bei mir war es anders.')) + '“</div><button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
        k.querySelector('[data-a="w"]').onclick = weiter;
        halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); weiter(); } });
        return;
      }
      loesche(); ui.ebeneZu();
      const sort = Object.entries(werte).sort((a, b) => b[1] - a[1]);
      ok({ werte, staerkstes: sort[0][1] ? sort[0][0] : null, gemischt: sort.filter(([, v]) => v >= 3).length >= 2 });
    };
    k.querySelector('[data-a="w"]').onclick = weiter;
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); weiter(); } });
  });

  // ---------- Stempel im Skills-Pass (Kurs-Ritual am Ende jedes Kapitels) ----------
  ui.skillsStempel = ({ modul, titel, gelernt = [], mission }) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz sz-pass"><div class="sz-kopf"><span class="sz-wo">Skills-Pass</span><b>' + esc(modul) + '</b></div>' +
      '<div class="sz-stempel">' + esc(titel) + '<i>✔</i></div>' + (gelernt.length ? '<p class="sz-info">Diese Woche:</p><ul class="sz-gelernt">' + gelernt.map((g) => '<li>' + esc(g) + '</li>').join('') + '</ul>' : '') +
      (mission ? '<div class="sz-mission"><b>Mission</b>' + esc(mission) + '</div>' : '') + '<div class="sz-karten"><button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button></div></div>');
    const zu = () => { loesche(); ui.ebeneZu(); ok(); };
    k.querySelector('[data-a="w"]').onclick = zu;
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
  });

  // Kleine Helfer für die neuen Spiele: Auswahl-Karten (Klick, Ziffern, E = erste) und „Weiter“
  const karteWahl = (box, html, n, { zeit = 0, still = null, zeitEl = null, eTaste = null } = {}) => new Promise((fertig) => {
    box.innerHTML = html; let aus = false, tm = null; const ab = performance.now() + 400;
    const ende = (j) => { if (aus) return; aus = true; clearTimeout(tm); if (zeitEl) zeitEl.style.width = '0%'; loesche(); fertig(j); };
    box.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
    halte((e) => { if (e.repeat || performance.now() < ab) { e.stopPropagation(); return; } const m = /^Digit([1-9])$/.exec(e.code); if (m && +m[1] <= n) { e.preventDefault(); e.stopPropagation(); ende(+m[1] - 1); } else if ((e.code === 'KeyE' || e.code === 'Enter') && eTaste != null) { e.preventDefault(); e.stopPropagation(); ende(eTaste); } else if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); } });
    if (zeit) { const ms = zeit * 1000 * zeitFaktor(), t0 = performance.now();
      const tick = () => { if (aus) return; const f = 1 - (performance.now() - t0) / ms; if (zeitEl) zeitEl.style.width = Math.max(0, f * 100) + '%'; if (f <= 0) ende(still); else requestAnimationFrame(tick); }; tick(); }
  });
  const weiterKnopf = (box, ergebnis, ok, vorher = '') => {
    box.innerHTML = vorher + '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
    const zu = () => { loesche(); ui.ebeneZu(); ok(ergebnis); };
    box.querySelector('[data-a="w"]').onclick = zu;
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
  };
  const lesezeit = (...t) => Math.max(1600, t.join(' ').split(/\s+/).length * 330) * zeitFaktor();
  const blaseHtml = (wer, t, ich = false) => '<div class="sz-blase' + (ich ? ' ich' : '') + '" style="--f:' + esc(wer ? wer.farbe : '#2b3a55') + '"><b>' + esc(wer ? wer.name : 'Du') + '</b>' + esc(ersetze(t)) + '</div>';

  // ---------- Sortier-Sprint (Kurs E04 „Bedürfnis oder Wunsch?“, Modul 2 Gefühlswörter) ----------
  // Karten kommen schnell; man wischt/tippt sie in ein Fach. Strittige Karten (ziel: null) sind ausdrücklich erlaubt –
  // dann redet die Klasse kurz darüber. Keine Punkte, nur Zählen. def: { wo, titel, info, faecher: [{ id, t, sy, f }],
  // karten: [{ t, ziel: id|[ids]|null, wer?, sagt? }], zeit } → { antworten: [id|null], passend, strittig, offen }
  ui.sortSprint = (def) => new Promise((ok) => {
    const F = def.faecher, zwei = F.length === 2;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>' + esc(def.titel || 'Sortier-Sprint') + '</b></div>' +
      '<p class="sz-info">' + esc(ersetze(def.info || 'Schnell entscheiden. Bauchgefühl zählt.')) + (zwei ? ' Wischen geht auch: ← links, rechts →.' : '') + '</p>' +
      '<div class="sz-sort-zahl"></div><div class="sz-sort-karte"></div><div class="sz-zeit"><i></i></div><div class="sz-bühne sz-sort-rede"></div>' +
      '<div class="sz-karten sz-sort-faecher ly-d-optionen' + (zwei ? ' zwei' : '') + '"></div></div>');
    const karte = k.querySelector('.sz-sort-karte'), faecher = k.querySelector('.sz-sort-faecher'), rede = k.querySelector('.sz-sort-rede'), zahl = k.querySelector('.sz-sort-zahl'), zeitEl = k.querySelector('.sz-zeit i');
    const antworten = []; let passend = 0, strittig = 0, offen = 0;
    let wisch = null;
    karte.addEventListener('pointerdown', (e) => { wisch = { x: e.clientX }; karte.setPointerCapture(e.pointerId); });
    karte.addEventListener('pointermove', (e) => { if (wisch && zwei) karte.style.transform = 'translateX(' + (e.clientX - wisch.x) * 0.6 + 'px) rotate(' + (e.clientX - wisch.x) * 0.05 + 'deg)'; });
    karte.addEventListener('pointerup', (e) => { if (!wisch) return; const dx = e.clientX - wisch.x; wisch = null; karte.style.transform = ''; if (zwei && Math.abs(dx) > 60) { const b = faecher.querySelector('[data-i="' + (dx < 0 ? 0 : 1) + '"]'); if (b) b.click(); } });
    (async () => {
      for (let n = 0; n < def.karten.length; n++) {
        const c = def.karten[n];
        zahl.textContent = (n + 1) + ' / ' + def.karten.length;
        karte.textContent = ersetze(c.t); karte.classList.remove('neu'); void karte.offsetWidth; karte.classList.add('neu');
        const html = F.map((f, j) => '<button type="button" data-i="' + j + '" style="--f:' + esc(f.f || '#2b3a55') + '"><span>' + (f.sy ? f.sy + ' ' : '') + esc(f.t) + (F.length <= 9 ? ' <kbd>' + (zwei ? (j ? '→' : '←') : j + 1) + '</kbd>' : '') + '</span></button>').join('');
        const pfeil = zwei ? halte((e) => { if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); const b = faecher.querySelector('[data-i="' + (e.code === 'ArrowLeft' ? 0 : 1) + '"]'); if (b) b.click(); } }) : null;
        const j = await karteWahl(faecher, html, F.length, { zeit: def.zeit || 6, still: null, zeitEl });
        if (pfeil) { document.removeEventListener('keydown', pfeil, true); tasten.delete(pfeil); }
        const id = j == null ? null : F[j].id; antworten.push(id);
        const ziele = c.ziel == null ? null : [].concat(c.ziel);
        let sys;
        if (id == null) { offen++; sys = '⏱ Zu langsam – liegt jetzt auf dem Stapel „später“.'; }
        else if (c.hinter) { if (!ziele) strittig++; else if (ziele.includes(id)) passend++; sys = '🫙 Dahinter steckt: ' + c.hinter; }
        else if (!ziele) { strittig++; sys = '🤔 Strittig. Kann man so oder so sehen.'; }
        else if (ziele.includes(id)) { passend++; sys = '✓ ' + F[j].t; }
        else sys = 'Hm. Die meisten legen das zu „' + F.find((f) => f.id === ziele[0]).t + '“.';
        faecher.innerHTML = '';
        rede.innerHTML = '<div class="sz-sys">' + esc(sys) + '</div>' + (c.sagt ? blaseHtml(c.wer, c.sagt) : '');
        await warte(lesezeit(sys, c.sagt || ''));
        rede.innerHTML = '';
      }
      karte.textContent = ''; zahl.textContent = '';
      weiterKnopf(faecher, { antworten, passend, strittig, offen }, ok, '<div class="sz-sys">' + esc(def.ende ? ersetze(def.ende) : 'Fertig. ' + strittig + ' strittige Karten – darüber kann man reden.') + '</div>');
    })();
  });

  // ---------- Platzwechsel „Alle, die …“ (Kurs E01/E05) ----------
  // Ein Satz wird gerufen; wer ihn für sich passend findet, steht auf und wechselt den Platz. Man sieht, wer noch aufsteht.
  // def: { wo, leute: { id: { name, farbe } }, saetze: [{ t, stehen: [ids] }], eigene: [{ t, stehen: [ids], sagt? }] }
  // → { gemeinsam: { id: n }, top: id, aufgestanden: n, eigener: index }
  ui.platzwechsel = (def) => new Promise((ok) => {
    const L = def.leute, ids = Object.keys(L);
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Stuhlkreis') + '</span><b>Platzwechsel: Alle, die …</b></div>' +
      '<p class="sz-info">Wenn der Satz auf dich passt: aufstehen und Platz wechseln. Wenn nicht: sitzen bleiben. Niemand muss etwas erklären.</p>' +
      '<div class="sz-fall sz-pw-satz" style="--f:#2b3a55"><p></p></div><div class="sz-kreis-leute">' + ids.map((id) => '<i data-p="' + id + '" style="--f:' + esc(L[id].farbe) + '">' + esc(L[id].name[0]) + '<small>' + esc(L[id].name) + '</small></i>').join('') + '<i data-p="du" class="du" style="--f:#2b3a55">●<small>Du</small></i></div>' +
      '<div class="sz-zeit"><i></i></div><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const satz = k.querySelector('.sz-pw-satz p'), karten = k.querySelector('.sz-karten'), bühne = k.querySelector('.sz-bühne'), zeitEl = k.querySelector('.sz-zeit i');
    const gemeinsam = Object.fromEntries(ids.map((id) => [id, 0])); let auf = 0, eigener = -1;
    const zeigeStehen = (wer, ich) => { k.querySelectorAll('[data-p]').forEach((el) => { el.classList.toggle('steht', el.dataset.p === 'du' ? ich : wer.includes(el.dataset.p)); }); };
    (async () => {
      for (const s of def.saetze) {
        zeigeStehen([], false); bühne.innerHTML = '';
        satz.textContent = 'Alle, die ' + ersetze(s.t);
        const j = await karteWahl(karten, '<button type="button" data-i="0"><span>🧍 Aufstehen</span></button><button type="button" data-i="1"><span>🪑 Sitzen bleiben</span></button>', 2, { zeit: def.zeit || 6, still: 1, zeitEl });
        karten.innerHTML = '';
        const ich = j === 0; if (ich) { auf++; s.stehen.forEach((id) => { gemeinsam[id]++; }); }
        zeigeStehen(s.stehen, ich);
        const namen = s.stehen.map((id) => L[id].name);
        bühne.innerHTML = '<div class="sz-sys">' + esc(namen.length ? (ich ? 'Mit dir stehen auf: ' : 'Es stehen auf: ') + namen.join(', ') + '.' : (ich ? 'Nur du stehst. Mutig.' : 'Niemand steht auf.')) + '</div>' + (s.sagt ? blaseHtml(L[s.sagt[0]] || null, s.sagt[1]) : '');
        await warte(lesezeit(s.sagt ? s.sagt[1] : '', 'Es stehen auf: x y z'));
      }
      if (def.eigene && def.eigene.length) {
        zeigeStehen([], false); bühne.innerHTML = ''; satz.textContent = 'Du stehst in der Mitte. Dein Satz: „Alle, die …“';
        eigener = await karteWahl(karten, def.eigene.map((e, i) => '<button type="button" data-i="' + i + '"><span>„… ' + esc(ersetze(e.t)) + '“</span></button>').join(''), def.eigene.length);
        const e = def.eigene[eigener]; karten.innerHTML = ''; satz.textContent = 'Alle, die ' + ersetze(e.t);
        e.stehen.forEach((id) => { gemeinsam[id]++; }); zeigeStehen(e.stehen, true);
        bühne.innerHTML = '<div class="sz-sys">' + esc(e.stehen.length ? 'Es stehen auf: ' + e.stehen.map((id) => L[id].name).join(', ') + '.' : 'Niemand steht auf. Dafür lacht Ben.') + '</div>' + (e.sagt ? blaseHtml(L[e.sagt[0]] || null, e.sagt[1]) : '');
        await warte(2300);
      }
      const top = Object.entries(gemeinsam).sort((a, b) => b[1] - a[1])[0];
      weiterKnopf(karten, { gemeinsam, top: top && top[1] ? top[0] : null, aufgestanden: auf, eigener }, ok,
        '<div class="sz-sys">' + esc(top && top[1] ? 'Am meisten gemeinsam: ' + L[top[0]].name + ' (' + top[1] + '×). Hättest du das gedacht?' : 'Du bist sitzen geblieben. Auch eine Antwort.') + '</div>');
    })();
  });

  // ---------- Körper-Karte (Kurs E09 Frühwarn-System: Wo spüre ich das Gefühl?) ----------
  // def: { wo, frage, vergleich: [{ wer: { name, farbe }, zonen: [ids], satz }] } → { zonen: [ids] }
  const ZONEN = { kopf: ['Kopf', 50, 13], hals: ['Hals', 50, 24], brust: ['Brust', 50, 34], bauch: ['Bauch', 50, 47], haende: ['Hände', 20, 50], beine: ['Knie / Beine', 50, 75], nirgends: ['Weiß nicht', 85, 92] };
  ui.koerperKarte = (def) => new Promise((ok) => {
    const an = new Set();
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>Körper-Karte</b></div>' +
      '<div class="sz-fall" style="--f:#8a7bc8"><p>' + esc(ersetze(def.frage)) + '</p></div><p class="sz-info">Tippe an, wo du es spürst. Mehrere Stellen gehen. Privat – bis du es zeigst.</p>' +
      '<div class="sz-koerper"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="13" r="8"/><path d="M38 24h24l6 28-8 2-3-16v26l4 32h-9l-2-26-2 26h-9l4-32V38l-3 16-8-2z"/></svg>' +
      Object.entries(ZONEN).map(([id, [n, x, y]]) => '<button type="button" data-z="' + id + '" style="left:' + x + '%;top:' + y + '%"><span>' + esc(n) + '</span></button>').join('') + '<div class="sz-k-fremd"></div></div>' +
      '<div class="sz-bühne"></div><div class="sz-karten"><button type="button" class="sz-weiter" data-a="w">Zeigen <kbd>E</kbd></button></div></div>');
    k.querySelectorAll('[data-z]').forEach((b) => { b.onclick = () => { const z = b.dataset.z; if (an.has(z)) an.delete(z); else an.add(z); b.classList.toggle('an', an.has(z)); }; });
    let phase = 0;
    const weiter = () => {
      if (phase === 0) {
        phase = 1; loesche();
        if (!an.size) { an.add('nirgends'); k.querySelector('[data-z="nirgends"]').classList.add('an'); }
        k.querySelectorAll('[data-z]').forEach((b) => { b.disabled = true; });
        const fremd = k.querySelector('.sz-k-fremd');
        (def.vergleich || []).forEach((v, i) => v.zonen.forEach((z) => { const Z = ZONEN[z]; if (Z) fremd.insertAdjacentHTML('beforeend', '<i style="--f:' + esc(v.wer.farbe) + ';left:calc(' + Z[1] + '% + ' + (18 + i * 14) + 'px);top:' + Z[2] + '%">' + esc(v.wer.name[0]) + '</i>'); }));
        k.querySelector('.sz-bühne').innerHTML = (def.vergleich || []).map((v) => blaseHtml(v.wer, v.satz)).join('');
        const gleich = (def.vergleich || []).filter((v) => v.zonen.some((z) => an.has(z))).map((v) => v.wer.name);
        weiterKnopf(k.querySelector('.sz-karten'), { zonen: [...an] }, ok, '<div class="sz-sys">' + esc(gleich.length ? 'Gleiche Stelle wie du: ' + gleich.join(', ') + '.' : 'Bei allen woanders. Jeder Körper meldet sich anders.') + '</div>');
      }
    };
    k.querySelector('[data-a="w"]').onclick = weiter;
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); weiter(); } });
  });

  // ---------- Synchronstudio (Kurs E07: derselbe Satz, andere Gefühle) ----------
  // def: { wo, satz, takes: [{ wer, gefuehl, regie }], reaktion: { gefuehlId: [wer, text] } } → { richtig, falsch, eigene }
  ui.synchron = (def) => new Promise((ok) => {
    const ids = Object.keys(GEF);
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Synchronstudio') + '</span><b>🎙️ Synchronstudio</b></div>' +
      '<p class="sz-info">Immer derselbe Satz. Lies, WIE er gesagt wird: Tempo, Lautstärke, Pausen. Welches Gefühl spricht?</p>' +
      '<div class="sz-take"></div><div class="sz-bühne"></div><div class="sz-karten sz-raster ly-d-optionen"></div></div>');
    const take = k.querySelector('.sz-take'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    let richtig = 0, falsch = 0;
    const gefKnoepfe = () => ids.map((id, j) => '<button type="button" data-i="' + j + '" style="--f:' + GEF[id][1] + '"><span>' + GEF[id][2] + ' ' + GEF[id][0] + '</span></button>').join('');
    (async () => {
      for (let n = 0; n < def.takes.length; n++) {
        const t = def.takes[n];
        take.innerHTML = '<small>Take ' + (n + 1) + ' · ' + esc(t.wer.name) + '</small><b>„' + esc(def.satz) + '“</b><em>🔊 ' + esc(ersetze(t.regie)) + '</em>';
        bühne.innerHTML = '';
        const j = await karteWahl(karten, gefKnoepfe(), 6);
        const g = ids[j]; karten.innerHTML = '';
        if (g === t.gefuehl) richtig++; else falsch++;
        take.querySelector('b').className = 'sz-take-' + t.gefuehl;
        bühne.innerHTML = '<div class="sz-sys">Du: ' + GEF[g][2] + ' ' + GEF[g][0] + ' · ' + esc(t.wer.name) + ' meinte: ' + GEF[t.gefuehl][2] + ' ' + GEF[t.gefuehl][0] + (g === t.gefuehl ? ' ✓' : '') + '</div>';
        await warte(lesezeit('x x x x x x x x x'));
      }
      take.innerHTML = '<small>Dein Take</small><b>„' + esc(def.satz) + '“</b><em>Jetzt du. Mit welchem Gefühl sprichst du ihn?</em>'; bühne.innerHTML = '';
      const j = await karteWahl(karten, gefKnoepfe(), 6);
      const eigene = ids[j]; karten.innerHTML = '';
      take.innerHTML = '<small>Dein Take</small><b class="sz-take-' + eigene + '">„' + esc(def.satz) + '“</b>';
      const r = (def.reaktion || {})[eigene];
      bühne.innerHTML = r ? blaseHtml(r[0], r[1]) : '';
      await warte(1200);
      weiterKnopf(karten, { richtig, falsch, eigene }, ok, '<div class="sz-sys">' + esc('Gleicher Satz, ' + def.takes.length + ' Gefühle. Die Wörter sagen wenig – die Stimme sagt viel.') + '</div>');
    })();
  });

  // ---------- Spuren-Wand (Kurs E28: Fakten prüfen, mit falschen Fährten) ----------
  // def: { wo, frage, helfer: { name, farbe }, spuren: [{ id, t, sy, echt, kommentar }], schluesse: [{ key, t, braucht: [ids] }] }
  // → { gepinnt: [ids], heringe: n, schluss: key }
  ui.spurenWand = (def) => new Promise((ok) => {
    const h = def.helfer;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>🧷 Spuren-Wand</b></div>' +
      '<div class="sz-fall" style="--f:' + esc(h.farbe) + '"><p>' + esc(ersetze(def.frage)) + '</p></div><div class="sz-pinnwand"></div>' +
      '<div class="sz-sort-karte sz-spur"></div><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const wand = k.querySelector('.sz-pinnwand'), spur = k.querySelector('.sz-spur'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const gepinnt = []; let heringe = 0;
    (async () => {
      for (const s of def.spuren) {
        spur.innerHTML = (s.sy ? '<i>' + s.sy + '</i> ' : '') + esc(ersetze(s.t)); bühne.innerHTML = '';
        const j = await karteWahl(karten, '<button type="button" data-i="0"><span>📌 An die Wand – das zählt</span></button><button type="button" data-i="1"><span>🗑️ Weg – das beweist nichts</span></button>', 2);
        karten.innerHTML = '';
        if (j === 0) { gepinnt.push(s.id); if (!s.echt) heringe++; wand.insertAdjacentHTML('beforeend', '<span class="sz-zettel' + (s.echt ? '' : ' wackelt') + '">' + (s.sy || '📄') + ' ' + esc(ersetze(s.kurz || s.t)) + '</span>'); }
        const kom = (j === 0) === s.echt ? s.kommentar[0] : s.kommentar[1];
        bühne.innerHTML = blaseHtml(h, kom);
        await warte(lesezeit(kom));
      }
      spur.innerHTML = ''; spur.style.display = 'none'; bühne.innerHTML = blaseHtml(h, def.frageEnde || 'Und? Was sagt die Wand?');
      const moegl = def.schluesse.map((s) => ({ ...s, geht: s.braucht.every((b) => gepinnt.includes(b)) }));
      const html = moegl.map((s, i) => '<button type="button" data-i="' + i + '"' + (s.geht ? '' : ' disabled') + '><span>' + esc(ersetze(s.t)) + (s.geht ? '' : ' <small>– dafür fehlt eine Spur</small>') + '</span></button>').join('');
      const erste = moegl.findIndex((s) => s.geht);
      let j = await new Promise((fertig) => { karten.innerHTML = html; let aus = false; const ende = (x) => { if (aus) return; aus = true; loesche(); fertig(x); };
        karten.querySelectorAll('[data-i]:not([disabled])').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
        halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) ende(moegl.length - 1); } }); });
      if (j < 0) j = moegl.length - 1;
      const sch = moegl[j]; karten.innerHTML = '';
      bühne.innerHTML = '<div class="sz-sys">' + esc(ersetze(sch.t)) + '</div>' + (sch.antwort ? blaseHtml(h, sch.antwort) : '');
      await warte(1500);
      weiterKnopf(karten, { gepinnt, heringe, schluss: sch.key }, ok);
    })();
  });

  // ---------- Kurs Modul 3 (Gefühle regulieren): Anspannung 0–100, drei Zonen ----------
  const ZONE = (z) => (z < 30 ? ['gruen', 'Grün', '#3fa66b'] : z < 70 ? ['gelb', 'Gelb', '#e9a23b'] : ['rot', 'Rot', '#d6452f']);
  const thermoHtml = '<div class="sz-thermo"><div class="sz-thermo-rohr"><i class="sz-thermo-f"></i><b class="sz-thermo-z">0</b></div><div class="sz-thermo-skala"><i style="bottom:100%">100</i><i style="bottom:70%">70</i><i style="bottom:30%">30</i><i style="bottom:0">0</i></div></div>';
  const setzeThermo = (k, z) => { const f = k.querySelector('.sz-thermo-f'), b = k.querySelector('.sz-thermo-z'); const Z = ZONE(z); f.style.height = Math.max(3, z) + '%'; f.style.background = Z[2]; b.textContent = Math.round(z); b.style.bottom = Math.max(0, Math.min(92, z - 4)) + '%'; };

  // Anspannungs-Leiter (E11): Ein Morgen wird schlimmer. Nach jedem Ereignis eine Reaktion – Skills senken die Zahl.
  // Bei Rot (ab 70) helfen Kopf-Skills kaum („Deckel weg“), Körper und Sinne schon.
  // def: { wo, titel, start, ereignisse: [{ t, plus, karten: [{ t, typ: 'koerper'|'sinne'|'kopf'|'menschen'|'gegen'|'nix', wirkung, antwort? }] }] }
  // → { wert, max, rot, typen: [..] }
  ui.thermometer = (def) => new Promise((ok) => {
    let z = def.start || 15, max = z; const typen = [];
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>' + esc(def.titel || 'Anspannung 0–100') + '</b></div>' +
      '<div class="sz-thermo-reihe">' + thermoHtml + '<div class="sz-thermo-text"><div class="sz-fall" style="--f:#2b3a55"><p class="sz-ereignis"></p></div><div class="sz-bühne"></div></div></div>' +
      '<div class="sz-zeit"><i></i></div><div class="sz-karten ly-d-optionen"></div></div>');
    const ereignis = k.querySelector('.sz-ereignis'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten'), zeitEl = k.querySelector('.sz-zeit i');
    const geh = async (ziel) => { const a = z, n = 14; for (let i = 1; i <= n; i++) { z = a + (ziel - a) * i / n; setzeThermo(k, z); await warte(35); } z = ziel; max = Math.max(max, z); setzeThermo(k, z); };
    setzeThermo(k, z);
    (async () => {
      for (const e of def.ereignisse) {
        ereignis.textContent = ersetze(e.t); bühne.innerHTML = '';
        await geh(Math.min(100, z + e.plus));
        const Z = ZONE(z);
        bühne.innerHTML = '<div class="sz-sys" style="background:' + Z[2] + ';color:#fff">Du bist bei ' + Math.round(z) + ' · Zone ' + Z[1] + '</div>';
        const j = await karteWahl(karten, e.karten.map((c, i) => '<button type="button" data-i="' + i + '"><span>' + esc(ersetze(c.t)) + '</span></button>').join(''), e.karten.length, { zeit: def.zeit || 9, still: -1, zeitEl });
        karten.innerHTML = '';
        const c = j < 0 ? { typ: 'nix', wirkung: 4, antwort: 'Du machst nichts. Die Zahl wartet nicht.' } : e.karten[j];
        typen.push(c.typ);
        let w = c.wirkung || 0, hinweis = c.antwort || '';
        if (c.typ === 'kopf' && z >= 70) { w = Math.round(w * 0.2); hinweis = 'Bei Rot hört der Kopf schlecht zu. Erst den Körper runterbringen, dann denken.'; }
        if (hinweis) bühne.insertAdjacentHTML('beforeend', '<div class="sz-sys">' + esc(ersetze(hinweis)) + '</div>');
        await geh(Math.max(0, Math.min(100, z + w)));
        await warte(1300);
      }
      const Z = ZONE(z);
      weiterKnopf(karten, { wert: Math.round(z), max: Math.round(max), rot: max >= 70, typen }, ok, '<div class="sz-sys">Höchster Wert: ' + Math.round(max) + ' · jetzt: ' + Math.round(z) + ' (' + Z[1] + ')</div>');
    })();
  });

  // Zonen-Wette (E11): Bei welcher Zahl stehst DU – und wo stehen die meisten? Dann zeigen alle ihre Zahl.
  // def: { wo, leute: { id: { name, farbe } }, karten: [{ t, zahlen: { id: 0–100 } }] } → { eigene: [zonen], treffer, anders: [namen] }
  ui.zonenWette = (def) => new Promise((ok) => {
    const L = def.leute, ids = Object.keys(L), ZN = [['gruen', 'Grün (0–30)', '#3fa66b', 15], ['gelb', 'Gelb (30–70)', '#e9a23b', 50], ['rot', 'Rot (70–100)', '#d6452f', 85]];
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>Zonen-Wette</b></div>' +
      '<div class="sz-fall" style="--f:#2b3a55"><p class="sz-zw-karte"></p></div><div class="sz-zw-linie"><i style="left:0;width:30%;background:#3fa66b"></i><i style="left:30%;width:40%;background:#e9a23b"></i><i style="left:70%;width:30%;background:#d6452f"></i><div class="sz-zw-punkte"></div></div>' +
      '<p class="sz-info sz-zw-frage"></p><div class="sz-bühne"></div><div class="sz-karten sz-raster ly-d-optionen"></div></div>');
    const karte = k.querySelector('.sz-zw-karte'), frage = k.querySelector('.sz-zw-frage'), punkte = k.querySelector('.sz-zw-punkte'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const eigene = [], anders = []; let treffer = 0;
    const knoepfe = () => ZN.map(([, n, f], i) => '<button type="button" data-i="' + i + '" style="--f:' + f + '"><span>' + n + '</span></button>').join('');
    (async () => {
      for (const c of def.karten) {
        karte.textContent = ersetze(c.t); punkte.innerHTML = ''; bühne.innerHTML = '';
        frage.textContent = 'Wo stehst DU bei diesem Satz?';
        const ich = await karteWahl(karten, knoepfe(), 3);
        frage.textContent = 'Und die meisten aus der Klasse? Wette!';
        const wette = await karteWahl(karten, knoepfe(), 3);
        karten.innerHTML = '';
        eigene.push(ZN[ich][0]);
        const zonen = ids.map((id) => (c.zahlen[id] < 30 ? 0 : c.zahlen[id] < 70 ? 1 : 2));
        const zaehl = [0, 1, 2].map((q) => zonen.filter((x) => x === q).length), meist = zaehl.indexOf(Math.max(...zaehl));
        if (meist === wette) treffer++;
        punkte.innerHTML = ids.map((id, i) => '<i style="--f:' + esc(L[id].farbe) + ';left:' + c.zahlen[id] + '%;top:' + ((i % 3) * 12) + 'px" title="' + esc(L[id].name) + '">' + esc(L[id].name[0]) + '</i>').join('') +
          '<i class="du" style="left:' + ZN[ich][3] + '%;top:36px">●</i>';
        const weit = ids.filter((id) => Math.abs(c.zahlen[id] - ZN[ich][3]) >= 50).map((id) => L[id].name);
        anders.push(...weit);
        bühne.innerHTML = '<div class="sz-sys">' + (meist === wette ? '✓ Gewettet richtig. ' : '') + 'Die meisten: ' + ZN[meist][1].split(' ')[0] + '.' + (weit.length ? ' Ganz woanders als du: ' + weit.join(', ') + '.' : '') + '</div>' +
          (c.sagt ? blaseHtml(L[c.sagt[0]] || null, c.sagt[1]) : '');
        await warte(c.sagt ? 2600 : 1800);
      }
      weiterKnopf(karten, { eigene, treffer, anders: [...new Set(anders)] }, ok, '<div class="sz-sys">Gleicher Satz – ganz andere Zahlen. Das ist normal.</div>');
    })();
  });

  // Test mit Puls (E11–E14): Aufgaben lösen, während die Anspannung steigt. Grübel-Gedanken tauchen auf (antippen = ziehen
  // lassen). Skills aus dem Koffer senken die Zahl. Ab 70 verschwimmt die Aufgabe, ab 90 Blackout (der Körper kommt von selbst
  // nur langsam runter). Keine Note. def: { wo, aufgaben: [{ f, a: [..], r }], gedanken: [..], skills: [{ id, t, sy, wirkung }], zeit }
  // → { beantwortet, richtig, max, skills: [ids], gedankenWeg }
  ui.mathTest = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz sz-test"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Mathe-Test') + '</span><b>Test · <span class="sz-t-uhr"></span></b></div>' +
      '<div class="sz-puls"><span>Anspannung</span><div><i></i></div><b>0</b></div>' +
      '<div class="sz-t-feld"><div class="sz-t-aufgabe"></div><div class="sz-t-gedanken"></div></div>' +
      '<div class="sz-karten sz-raster ly-d-optionen sz-t-antw"></div><div class="sz-t-skills"></div><div class="sz-t-fuss"></div></div>');
    const auf = k.querySelector('.sz-t-aufgabe'), antw = k.querySelector('.sz-t-antw'), ged = k.querySelector('.sz-t-gedanken'), sk = k.querySelector('.sz-t-skills'), fuss = k.querySelector('.sz-t-fuss');
    const pulsF = k.querySelector('.sz-puls i'), pulsZ = k.querySelector('.sz-puls b'), uhr = k.querySelector('.sz-t-uhr'), feld = k.querySelector('.sz-t-feld');
    let puls = def.start || 35, max = puls, n = 0, richtig = 0, gedankenWeg = 0, ende = false, sperre = 0;
    const benutzt = [], t0 = performance.now(), ZEIT = (def.zeit || 80) * zeitFaktor() * 1000;
    const zeigPuls = () => { const Z = ZONE(puls); pulsF.style.width = puls + '%'; pulsF.style.background = Z[2]; pulsZ.textContent = Math.round(puls); max = Math.max(max, puls);
      feld.classList.toggle('verschwommen', puls >= 70 && puls < 90); feld.classList.toggle('blackout', puls >= 90); };
    const aufgabe = () => {
      if (n >= def.aufgaben.length) return fertig();
      const a = def.aufgaben[n];
      auf.innerHTML = '<small>Aufgabe ' + (n + 1) + ' von ' + def.aufgaben.length + '</small>' + esc(a.f);
      antw.innerHTML = a.a.map((x, i) => '<button type="button" data-i="' + i + '"><span>' + esc(x) + '</span></button>').join('');
      antw.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => { if (ende || puls >= 90 || performance.now() < sperre) return; const gut = +b.dataset.i === a.r; if (gut) richtig++; else puls = Math.min(100, puls + 6); n++; zeigPuls(); aufgabe(); }; });
    };
    sk.innerHTML = '<small>Dein Koffer:</small>' + def.skills.map((s) => '<button type="button" data-s="' + esc(s.id) + '">' + (s.sy || '') + ' ' + esc(s.t) + '</button>').join('');
    sk.querySelectorAll('[data-s]').forEach((b) => { b.onclick = () => {
      if (ende || b.disabled) return; const s = def.skills.find((x) => x.id === b.dataset.s); b.disabled = true; benutzt.push(s.id);
      sperre = performance.now() + 2500; fuss.innerHTML = '<div class="sz-sys">' + esc(ersetze(s.wie || s.t)) + ' …</div>';
      const ziel = Math.max(10, puls - (s.wirkung || 25)); const a = puls; let i = 0;
      const sinke = () => { if (ende) return; i++; puls = a + (ziel - a) * i / 25; zeigPuls(); if (i < 25) setTimeout(sinke, 100); else fuss.innerHTML = ''; }; sinke();
    }; });
    const gedanke = () => {
      if (ende) return;
      const t = def.gedanken[Math.floor(Math.random() * def.gedanken.length)];
      const el = document.createElement('button'); el.type = 'button'; el.className = 'sz-gedanke'; el.textContent = t;
      el.style.left = (5 + Math.random() * 55) + '%'; el.style.top = (10 + Math.random() * 60) + '%';
      el.onclick = () => { gedankenWeg++; el.classList.add('weg'); puls = Math.max(5, puls - 4); zeigPuls(); setTimeout(() => el.remove(), 600); };
      ged.appendChild(el); puls = Math.min(100, puls + 5); zeigPuls();
      setTimeout(() => { if (el.isConnected) el.remove(); }, 6000);
      setTimeout(gedanke, 3500 + Math.random() * 3000);
    };
    const tick = () => {
      if (ende) return; const t = performance.now() - t0;
      uhr.textContent = Math.max(0, Math.ceil((ZEIT - t) / 1000)) + ' s';
      if (puls >= 90) { puls = Math.max(75, puls - 0.06); }   // Blackout: kommt von selbst nur langsam runter
      else puls = Math.min(100, puls + 0.035);   // die Uhr läuft, die Zahl steigt leise
      zeigPuls();
      if (t >= ZEIT) fertig(); else requestAnimationFrame(tick);
    };
    function fertig() {
      if (ende) return; ende = true; ged.innerHTML = ''; feld.classList.remove('verschwommen', 'blackout');
      auf.innerHTML = '<small>Abgabe</small>Du hast ' + n + ' von ' + def.aufgaben.length + ' Aufgaben bearbeitet.'; antw.innerHTML = '';
      sk.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      weiterKnopf(fuss, { beantwortet: n, richtig, max: Math.round(max), skills: benutzt, gedankenWeg }, ok, '<div class="sz-sys">Höchste Anspannung: ' + Math.round(max) + (benutzt.length ? ' · Skills benutzt: ' + benutzt.length : '') + '</div>');
    }
    halte((e) => { const m = /^Digit([1-9])$/.exec(e.code); if (m && !ende) { const b = antw.querySelector('[data-i="' + (+m[1] - 1) + '"]'); if (b) { e.preventDefault(); e.stopPropagation(); if (!e.repeat) b.click(); } } });
    zeigPuls(); aufgabe(); setTimeout(gedanke, 2500); requestAnimationFrame(tick);
  });

  // Gemeinsam atmen (E12 Partneratmung): Jemand ist bei Rot. Halten = einatmen (Kreis wird groß), loslassen = ausatmen.
  // Ruhiger, gleichmäßiger Takt bringt die andere Person mit runter. def: { wer: { name, farbe }, start, ziel, saetze: { zahl: text } }
  // → { zahl, gut, runden }
  ui.atemSync = (def) => new Promise((ok) => {
    const w = def.wer;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>Gemeinsam atmen</b></div>' +
      '<p class="sz-info">' + esc(w.name) + ' atmet sehr schnell. Atme ruhig vor – er macht mit. <b>Halten</b> = einatmen (bis der Ring voll ist), <b>loslassen</b> = langsam ausatmen.</p>' +
      '<div class="sz-atem"><div class="sz-atem-ring"></div><div class="sz-atem-ich"></div><div class="sz-atem-er" style="--f:' + esc(w.farbe) + '">' + esc(w.name[0]) + '</div><b class="sz-atem-z"></b></div>' +
      '<div class="sz-bühne"></div><div class="sz-karten"><button type="button" class="sz-atem-knopf">Halten zum Einatmen <kbd>Leertaste</kbd></button></div></div>');
    const ich = k.querySelector('.sz-atem-ich'), er = k.querySelector('.sz-atem-er'), zEl = k.querySelector('.sz-atem-z'), bühne = k.querySelector('.sz-bühne'), knopf = k.querySelector('.sz-atem-knopf'), karten = k.querySelector('.sz-karten');
    let zahl = def.start || 95, gut = 0, runden = 0, ein = null, aus = null, groesse = 0.3, ende = false; const gesagt = new Set();
    const zeig = () => { zEl.textContent = Math.round(zahl); zEl.style.color = ZONE(zahl)[2]; };
    const sag = () => { for (const [g, t] of Object.entries(def.saetze || {}).sort((a, b) => b[0] - a[0])) if (zahl <= +g && !gesagt.has(g)) { gesagt.add(g); bühne.innerHTML = blaseHtml(w, t); break; } };
    const runter = () => { if (ende || ein) return; const jetzt = performance.now(); if (aus) { const d = (jetzt - aus) / 1000; runden++; const passt = d >= 3 && d <= 8; const einD = aus - (ein0 || aus); const einOk = einD >= 2500 && einD <= 6000;
        if (passt && einOk) { gut++; zahl = Math.max(def.ziel || 35, zahl - 12); bühne.insertAdjacentHTML('afterbegin', '<div class="sz-sys">Ruhig. ' + esc(w.name) + ' atmet mit.</div>'); }
        else { zahl = Math.max(def.ziel || 35, zahl - 3); bühne.insertAdjacentHTML('afterbegin', '<div class="sz-sys">' + (einD < 2500 ? 'Etwas länger einatmen.' : d < 3 ? 'Langsamer ausatmen. Länger als einatmen.' : 'Nicht zu lange warten.') + '</div>'); }
        while (bühne.children.length > 2) bühne.lastChild.remove();
        zeig(); sag(); if (zahl <= (def.ziel || 35) || runden >= 8) return fertig(); }
      ein = jetzt; ein0 = jetzt; aus = null; knopf.classList.add('an'); knopf.firstChild.textContent = 'Einatmen … ';
    };
    let ein0 = 0;
    const hoch = () => { if (ende || !ein) return; aus = performance.now(); ein = null; knopf.classList.remove('an'); knopf.firstChild.textContent = 'Ausatmen … (dann wieder halten) '; };
    knopf.addEventListener('pointerdown', (e) => { e.preventDefault(); runter(); }); knopf.addEventListener('pointerup', hoch); knopf.addEventListener('pointerleave', hoch);
    halte((e) => { if (['Space', 'KeyE', 'Enter'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); if (!e.repeat) runter(); } });
    const los = (e) => { if (['Space', 'KeyE', 'Enter'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); hoch(); } };
    document.addEventListener('keyup', los, true);
    const anim = () => {
      if (ende) return; const t = performance.now() / 1000;
      if (ein && performance.now() - ein > 7000) hoch();   // nicht ewig halten
      if (ein) groesse = Math.min(1, groesse + 0.006); else groesse = Math.max(0.3, groesse - 0.004);
      ich.style.transform = 'scale(' + groesse.toFixed(3) + ')';
      const tempo = 0.6 + (zahl / 100) * 2.4;   // je höher die Zahl, desto schneller atmet er
      er.style.transform = 'scale(' + (0.75 + 0.2 * Math.sin(t * tempo * 2)).toFixed(3) + ')';
      requestAnimationFrame(anim);
    };
    function fertig() { if (ende) return; ende = true; loesche(); document.removeEventListener('keyup', los, true); weiterKnopf(karten, { zahl: Math.round(zahl), gut, runden }, ok, '<div class="sz-sys">' + esc(w.name) + ' ist bei ' + Math.round(zahl) + '. ' + (gut >= 3 ? 'Ihr habt zusammen runtergeatmet.' : 'Langsam wird es besser.') + '</div>'); }
    zeig(); sag(); anim();
  });

  // Skills-Koffer (E15): Aus fünf Fächern je bis zu zwei Skills einpacken, dann drei für die Notfallkarte (Rot) wählen.
  // def: { faecher: [{ id, t, sy }], karten: [{ id, t, fach }] } → { koffer: [ids], notfall: [ids] }
  ui.koffer = (def) => new Promise((ok) => {
    const drin = new Set(), not = new Set();
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Aula · Koffer-Markt') + '</span><b>Mein Skills-Koffer</b></div>' +
      '<p class="sz-info sz-k-info">Pack ein, was bei DIR wirkt. Bis zu zwei pro Fach. Niemand bewertet das.</p><div class="sz-koffer"></div><div class="sz-karten"></div></div>');
    const box = k.querySelector('.sz-koffer'), karten = k.querySelector('.sz-karten'), info = k.querySelector('.sz-k-info');
    let phase = 0;
    const zeig = () => {
      box.innerHTML = def.faecher.map((f) => '<div class="sz-fach"><b>' + f.sy + ' ' + esc(f.t) + '</b>' + def.karten.filter((c) => c.fach === f.id && (phase === 0 || drin.has(c.id))).map((c) =>
        '<button type="button" data-c="' + c.id + '" class="' + ((phase === 0 ? drin : not).has(c.id) ? 'an' : '') + '">' + esc(c.t) + '</button>').join('') + '</div>').join('');
      box.querySelectorAll('[data-c]').forEach((b) => { b.onclick = () => {
        const c = def.karten.find((x) => x.id === b.dataset.c);
        if (phase === 0) { if (drin.has(c.id)) drin.delete(c.id); else if (def.karten.filter((x) => x.fach === c.fach && drin.has(x.id)).length < 2) drin.add(c.id); }
        else { if (not.has(c.id)) not.delete(c.id); else if (not.size < 3) not.add(c.id); }
        zeig();
      }; });
    };
    const weiter = () => {
      if (phase === 0) {
        if (drin.size < 3) def.karten.filter((c) => !drin.has(c.id)).slice(0, 3 - drin.size).forEach((c) => drin.add(c.id));
        phase = 1; info.textContent = 'Jetzt die Notfallkarte: Welche drei helfen dir bei ROT? Tipp: Bei Rot wirken Körper, Sinne und Menschen am besten.'; zeig();
        karten.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Notfallkarte fertig <kbd>E</kbd></button>'; karten.querySelector('[data-a="w"]').onclick = weiter; return;
      }
      if (!not.size) [...drin].slice(0, 3).forEach((id) => not.add(id));
      loesche(); ui.ebeneZu(); ok({ koffer: [...drin], notfall: [...not] });
    };
    zeig();
    karten.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Koffer zu <kbd>E</kbd></button>'; karten.querySelector('[data-a="w"]').onclick = weiter;
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); weiter(); } });
  });

  // ---------- Kurs Modul 4 (Meine Gedanken) ----------
  // Gedanken-Weiche (E16 Kopfkino): Eine Situation fährt auf eine Weiche zu. Du stellst sie auf einen Gedanken –
  // und siehst, wohin der Zug fährt: Gefühl → Körper → was du tust → was passiert. Danach darfst du zurückspulen.
  // def: { wo, situation, gedanken: [{ t, gefuehl, koerper, tun, folge }] } → { gewaehlt: [i…], final: i }
  ui.gedankenWeiche = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>🚂 Gedanken-Weiche</b></div>' +
      '<div class="sz-fall" style="--f:#2b3a55"><p>' + esc(ersetze(def.situation)) + '</p></div><p class="sz-info sz-gw-info">Welcher Gedanke kommt? Stell die Weiche.</p>' +
      '<div class="sz-gleis"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const gleis = k.querySelector('.sz-gleis'), karten = k.querySelector('.sz-karten'), info = k.querySelector('.sz-gw-info');
    const gewaehlt = [];
    const fahre = async (g) => {
      const st = [['💭 Gedanke', g.t], ['❤️ Gefühl', g.gefuehl], ['🫀 Körper', g.koerper], ['🏃 Du', g.tun], ['➡️ Dann', g.folge]];
      gleis.innerHTML = st.map(([a, b], i) => '<div class="sz-station" data-i="' + i + '"><small>' + a + '</small><span>' + esc(ersetze(b)) + '</span></div>').join('<i class="sz-schiene"></i>');
      for (let i = 0; i < st.length; i++) { await warte(i ? lesezeit(st[i - 1][1]) * 0.8 : 300); gleis.querySelector('[data-i="' + i + '"]').classList.add('an'); }
      await warte(lesezeit(st[st.length - 1][1]));
    };
    const wahlHtml = (nur) => def.gedanken.map((g, i) => (nur && !nur.includes(i)) ? '' : '<button type="button" data-i="' + i + '"><small>Gedanke ' + 'ABC'[i] + '</small><span>„' + esc(ersetze(g.t)) + '“</span></button>').join('');
    (async () => {
      let i = await karteWahl(karten, wahlHtml(), def.gedanken.length); karten.innerHTML = ''; gewaehlt.push(i); info.textContent = 'Der Zug fährt …';
      await fahre(def.gedanken[i]);
      info.textContent = 'Zurückspulen? Gleiche Situation, anderer Gedanke.';
      const rest = def.gedanken.map((_, j) => j).filter((j) => j !== i);
      const j = await karteWahl(karten, '<button type="button" data-i="0"><span>⏪ Anderen Gedanken ausprobieren</span></button><button type="button" data-i="1"><span>So lassen</span></button>', 2);
      let final = i;
      if (j === 0) {
        info.textContent = 'Welcher andere Gedanke?';
        const w = await karteWahl(karten, rest.map((r, n) => '<button type="button" data-i="' + n + '"><small>Gedanke ' + 'ABC'[r] + '</small><span>„' + esc(ersetze(def.gedanken[r].t)) + '“</span></button>').join(''), rest.length);
        const b = rest[w]; karten.innerHTML = ''; gewaehlt.push(b); info.textContent = 'Der Zug fährt …'; await fahre(def.gedanken[b]);
        info.textContent = 'Mit welchem Gedanken gehst du wirklich rein?';
        const f = await karteWahl(karten, [i, b].map((x, n) => '<button type="button" data-i="' + n + '"><span>„' + esc(ersetze(def.gedanken[x].t)) + '“</span></button>').join(''), 2);
        final = [i, b][f];
      }
      karten.innerHTML = ''; info.textContent = 'Gleiche Situation. Anderer Gedanke. Anderer Tag.';
      weiterKnopf(karten, { gewaehlt, final }, ok);
    })();
  });

  // Bohnen-Wette (E17): Fünf Bohnen, anonym auf bremsende Sätze verteilen, die man von sich kennt. Dann sieht man die Becher
  // der ganzen Klasse. Botschaft: Viele kennen dieselben Sätze. def: { saetze: [t…], klasse: [n…] } → { bohnen: [n…], top }
  ui.bohnenWette = (def) => new Promise((ok) => {
    const b = def.saetze.map(() => 0); let frei = 5;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Aula') + '</span><b>🫘 Bohnen-Wette</b></div>' +
      '<p class="sz-info">Anonym. Niemand sieht, wo deine Bohnen landen. Leg sie zu Sätzen, die du von dir selbst kennst. Antippen = Bohne rein, noch mal = raus.</p>' +
      '<div class="sz-becher"></div><div class="sz-karten"></div></div>');
    const box = k.querySelector('.sz-becher'), karten = k.querySelector('.sz-karten');
    let zeigeKlasse = false;
    const zeig = () => {
      const max = Math.max(1, ...def.klasse.map((n, i) => n + b[i]));
      box.innerHTML = def.saetze.map((t, i) => '<button type="button" data-i="' + i + '"' + (zeigeKlasse ? ' disabled' : '') + '><span>„' + esc(t) + '“</span><i>' + '🫘'.repeat(b[i]) + '</i>' +
        (zeigeKlasse ? '<em style="width:' + Math.round((def.klasse[i] + b[i]) / max * 100) + '%"></em><b>' + (def.klasse[i] + b[i]) + '</b>' : '') + '</button>').join('');
      box.querySelectorAll('[data-i]').forEach((x) => { x.onclick = () => { const i = +x.dataset.i; if (frei > 0) { b[i]++; frei--; } else if (b[i]) { b[i]--; frei++; } zeig(); }; });
      if (!zeigeKlasse) { karten.innerHTML = '<div class="sz-sys">Noch ' + frei + ' 🫘' + (frei ? '' : ' · antippen nimmt eine zurück') + '</div><button type="button" class="ly-link" data-a="neu">Alle zurück</button><button type="button" class="sz-weiter" data-a="w">Becher leeren <kbd>E</kbd></button>'; karten.querySelector('[data-a="neu"]').onclick = () => { b.fill(0); frei = 5; zeig(); }; }
      const w = karten.querySelector('[data-a="w"]'); if (w) w.onclick = weiter;
    };
    const weiter = () => {
      if (!zeigeKlasse) {
        zeigeKlasse = true; loesche(); zeig();
        const top = def.klasse.map((n, i) => n + b[i]).reduce((m, n, i, a) => (n > a[m] ? i : m), 0);
        weiterKnopf(karten, { bohnen: b, top }, ok, '<div class="sz-sys">' + esc('Die meisten Bohnen: „' + def.saetze[top] + '“. Du bist mit keinem Satz allein.') + '</div>');
        return;
      }
    };
    zeig();
    halte((e) => { if ((e.code === 'KeyE' || e.code === 'Enter') && !zeigeKlasse) { e.preventDefault(); e.stopPropagation(); weiter(); } });
  });

  // Beweis-Waage (E18 Kritischer Detektiv): Ein Satz steht auf dem Prüfstand. Hinweise kommen; jeder ist ein Beweis DAFÜR,
  // DAGEGEN oder KEIN Beweis (nur Gefühl, Spruch, Vermutung). Die Waage kippt. Am Ende: Wie sehr glaubst du den Satz jetzt?
  // def: { wo, satz, vorher, hinweise: [{ t, art: 'dafuer'|'dagegen'|'kein', warum }] } → { vorher, nachher, richtig, dafuer, dagegen }
  ui.beweisWaage = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>🔍 Kritischer Detektiv</b></div>' +
      '<div class="sz-fall" style="--f:#b5485d"><b>Auf dem Prüfstand</b><p>„' + esc(ersetze(def.satz)) + '“</p></div>' +
      '<div class="sz-waage"><div class="sz-w-balken"><div class="sz-w-schale l"><small>dafür</small><div></div></div><div class="sz-w-schale r"><small>dagegen</small><div></div></div></div><i class="sz-w-fuss"></i></div>' +
      '<div class="sz-sort-karte sz-spur"></div><div class="sz-bühne"></div><div class="sz-karten sz-raster ly-d-optionen"></div></div>');
    const balken = k.querySelector('.sz-w-balken'), L = k.querySelector('.sz-w-schale.l div'), R = k.querySelector('.sz-w-schale.r div'), spur = k.querySelector('.sz-spur'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    let dafuer = 0, dagegen = 0, richtig = 0;
    const kipp = () => { balken.style.transform = 'rotate(' + Math.max(-14, Math.min(14, (dagegen - dafuer) * 4)) + 'deg)'; };
    const regler = (text) => new Promise((fertig) => {
      karten.innerHTML = '<label class="sz-glaube"><span>' + esc(text) + '</span><input type="range" min="0" max="100" step="10" value="' + (def.vorher || 80) + '"><b>' + (def.vorher || 80) + ' %</b></label><button type="button" class="sz-weiter" data-a="w">So sehr <kbd>E</kbd></button>';
      const r = karten.querySelector('input'), z = karten.querySelector('.sz-glaube b');
      r.addEventListener('keydown', (e) => e.stopPropagation()); r.oninput = () => { z.textContent = r.value + ' %'; };
      const fertig2 = () => { loesche(); fertig(+r.value); };
      karten.querySelector('[data-a="w"]').onclick = fertig2;
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); fertig2(); } });
    });
    (async () => {
      const vorher = await regler('Wie sehr glaubst du den Satz gerade?');
      for (const h of def.hinweise) {
        spur.textContent = ersetze(h.t); bühne.innerHTML = '';
        const j = await karteWahl(karten, '<button type="button" data-i="0" style="--f:#b5485d"><span>⚖️ Beweis dafür</span></button><button type="button" data-i="1" style="--f:#3fa66b"><span>⚖️ Beweis dagegen</span></button><button type="button" data-i="2" style="--f:#8a93a3"><span>💨 Kein Beweis</span></button>', 3);
        karten.innerHTML = '';
        const art = ['dafuer', 'dagegen', 'kein'][j];
        if (art === h.art) richtig++;
        if (h.art === 'dafuer') { dafuer++; L.insertAdjacentHTML('beforeend', '<i>■</i>'); } else if (h.art === 'dagegen') { dagegen++; R.insertAdjacentHTML('beforeend', '<i>■</i>'); }
        kipp();
        bühne.innerHTML = '<div class="sz-sys">' + (art === h.art ? '✓ ' : '') + esc(ersetze(h.warum)) + '</div>';
        await warte(lesezeit(h.warum, 'x x x'));
      }
      spur.textContent = ''; spur.style.display = 'none';
      bühne.innerHTML = '<div class="sz-sys">Dafür: ' + dafuer + ' · Dagegen: ' + dagegen + '</div>';
      const nachher = await regler('Und jetzt? Wie sehr glaubst du den Satz noch?');
      weiterKnopf(karten, { vorher, nachher, richtig, dafuer, dagegen }, ok, '<div class="sz-sys">Vorher ' + vorher + ' % · jetzt ' + nachher + ' %</div>');
    })();
  });

  // Satz-Bau (E18 Prüfstand): Aus Bausteinen einen neuen, hilfreichen Satz bauen. Sechs Regeln werden live geprüft
  // (realistisch, keine „immer/nie“, freundlich, Ich-Form, ein nächster Schritt, man glaubt ihn wenigstens ein bisschen).
  // def: { alt, teile: [[{ t, regeln: { … } }…] × 3] } → { satz, regeln: n }
  ui.satzBau = (def) => new Promise((ok) => {
    const wahl = def.teile.map(() => -1);
    const REG = def.regeln || [['real', 'realistisch'], ['ohneImmer', 'kein „immer/nie/alle“'], ['freundlich', 'freundlich zu dir'], ['schritt', 'mit einem nächsten Schritt']];
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>' + esc(def.titel || '🔧 Neuer Satz') + '</b></div>' +
      '<div class="sz-fall" style="--f:#8a93a3"><b>' + esc(def.altTitel || 'Alter Satz') + '</b><p>„' + esc(ersetze(def.alt)) + '“</p></div>' +
      '<div class="sz-satz"></div><div class="sz-regeln"></div><div class="sz-teile"></div><div class="sz-karten"></div></div>');
    const satz = k.querySelector('.sz-satz'), regeln = k.querySelector('.sz-regeln'), teile = k.querySelector('.sz-teile'), karten = k.querySelector('.sz-karten');
    const pruef = () => { const r = {}; REG.forEach(([id]) => { r[id] = wahl.every((w, i) => w >= 0 && def.teile[i][w].regeln[id] !== false) && wahl.some((w, i) => w >= 0 && def.teile[i][w].regeln[id]); }); return r; };
    const zeig = () => {
      satz.innerHTML = wahl.map((w, i) => '<span class="' + (w < 0 ? 'leer' : '') + '">' + (w < 0 ? '…' : esc(ersetze(def.teile[i][w].t))) + '</span>').join(' ');
      const r = pruef(); regeln.innerHTML = REG.map(([id, n]) => '<i class="' + (r[id] ? 'ok' : '') + '">' + (r[id] ? '✓' : '○') + ' ' + n + '</i>').join('');
      teile.innerHTML = def.teile.map((reihe, i) => '<div>' + reihe.map((t, j) => '<button type="button" data-i="' + i + '" data-j="' + j + '" class="' + (wahl[i] === j ? 'an' : '') + '">' + esc(ersetze(t.t)) + '</button>').join('') + '</div>').join('');
      teile.querySelectorAll('[data-j]').forEach((b) => { b.onclick = () => { wahl[+b.dataset.i] = +b.dataset.j; zeig(); }; });
      karten.innerHTML = wahl.every((w) => w >= 0) ? '<button type="button" class="sz-weiter" data-a="w">Das ist mein Satz <kbd>E</kbd></button>' : '';
      const w = karten.querySelector('[data-a="w"]'); if (w) w.onclick = fertig;
    };
    const fertig = () => {
      if (wahl.some((w) => w < 0)) wahl.forEach((w, i) => { if (w < 0) wahl[i] = def.teile[i].findIndex((t) => Object.values(t.regeln).every(Boolean)); });
      loesche(); ui.ebeneZu(); const r = pruef();
      ok({ satz: wahl.map((w, i) => ersetze(def.teile[i][w].t)).join(' '), regeln: Object.values(r).filter(Boolean).length, wahl });
    };
    zeig();
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); if (wahl.every((w) => w >= 0) || e.code === 'KeyE') fertig(); } });
  });

  // ---------- Zettel-Krimi (Kurs M0 Ankommen, ersetzt das Bingo): Wer hat welchen Zettel geschrieben? ----------
  // Die Lehrerin liest anonyme Zettel vor. Man schaut sich die Leute an (kleine Hinweise) und tippt, von wem er ist.
  // Falsch geraten: die Person reagiert, man darf nochmal. Richtig: die Person erzählt kurz.
  // def: { wo, leute: [{ id, name, farbe, hinweis, falsch }], zettel: [{ von, t, sagt: [[wer, text]…] }] } → { richtig: [ids], versuche }
  ui.wenRaten = (def) => new Promise((ok) => {
    const L = Object.fromEntries(def.leute.map((p) => [p.id, p]));
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>📝 Zettel-Krimi</b></div>' +
      '<div class="sz-zettel-gross"></div><p class="sz-info sz-wr-info">Von wem ist der Zettel? Schau genau hin.</p>' +
      '<div class="sz-wr-leute ly-d-optionen"></div><div class="sz-bühne"></div><div class="sz-karten"></div></div>');
    const zettel = k.querySelector('.sz-zettel-gross'), leute = k.querySelector('.sz-wr-leute'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten'), info = k.querySelector('.sz-wr-info');
    const richtig = []; let versuche = 0;
    const raster = (weg = []) => def.leute.map((p, i) => '<button type="button" data-i="' + i + '" style="--f:' + esc(p.farbe) + '"' + (weg.includes(p.id) ? ' disabled' : '') + '><i>' + esc(p.name[0]) + '</i><b>' + esc(p.name) + '</b><small>' + esc(p.hinweis) + '</small></button>').join('');
    (async () => {
      for (let n = 0; n < def.zettel.length; n++) {
        const z = def.zettel[n]; const falschGetippt = [];
        zettel.innerHTML = '<small>Zettel ' + (n + 1) + ' von ' + def.zettel.length + '</small>„' + esc(ersetze(z.t)) + '“'; bühne.innerHTML = ''; info.textContent = 'Von wem ist der Zettel? Schau genau hin.';
        let geschafft = false;
        for (let v = 0; v < 2 && !geschafft; v++) {
          const i = await karteWahl(leute, raster([...richtig, ...falschGetippt]), def.leute.length);
          const p = def.leute[i]; versuche++;
          if (p.id === z.von) { geschafft = true; richtig.push(p.id); }
          else { falschGetippt.push(p.id); bühne.innerHTML = blaseHtml(p, p.falsch || 'Ich? Nein.'); info.textContent = v === 0 ? 'Nochmal!' : ''; await warte(lesezeit(p.falsch || 'x x x')); }
        }
        leute.innerHTML = '';
        const von = L[z.von];
        bühne.innerHTML = '<div class="sz-sys">' + (geschafft ? '✓ ' : 'Aufgelöst: ') + esc(von.name) + '</div>' + z.sagt.map(([w, t]) => blaseHtml(L[w] || von, t)).join('');
        await warte(lesezeit(...z.sagt.map((s) => s[1])) + 400);
      }
      zettel.innerHTML = ''; info.textContent = '';
      weiterKnopf(karten, { richtig, versuche }, ok, '<div class="sz-sys">' + richtig.length + ' von ' + def.zettel.length + ' gleich erkannt. Jetzt kennst du schon ein bisschen von allen.</div>');
    })();
  });

  // ---------- Kurs Modul 5 (Kommunikation und Grenzen) ----------
  // Stopp-Abstand (E22): Jemand geht langsam auf dich zu. Du sagst „Stopp“, wenn es sich richtig anfühlt.
  // Danach siehst du: Der Abstand ist bei jedem Menschen anders – und jeder ist okay. Die Person nimmt das Stopp an.
  // def: { wo, leute: [{ id, name, farbe, okay, zuNah }] } → { abstaende: { id: Meter } }
  ui.stoppAbstand = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>✋ Stopp-Abstand</b></div>' +
      '<p class="sz-info">Die Person kommt langsam auf dich zu. Sag „Stopp“, sobald es sich richtig anfühlt. Es gibt kein Falsch.</p>' +
      '<div class="sz-bahn"><i class="sz-bahn-ich">Du</i><i class="sz-bahn-er"></i><div class="sz-bahn-m"></div></div>' +
      '<div class="sz-bühne"></div><div class="sz-karten"><button type="button" class="sz-stopp" data-a="stopp">✋ Stopp <kbd>Leertaste</kbd></button></div></div>');
    const er = k.querySelector('.sz-bahn-er'), mEl = k.querySelector('.sz-bahn-m'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const abstaende = {}; const MAX = 6;
    const runde = (p) => new Promise((fertig) => {
      er.textContent = p.name[0]; er.style.setProperty('--f', p.farbe); bühne.innerHTML = '<div class="sz-sys">' + esc(p.name) + ' kommt …</div>';
      karten.innerHTML = '<button type="button" class="sz-stopp" data-a="stopp">✋ Stopp <kbd>Leertaste</kbd></button>';
      const t0 = performance.now(), dauer = 5200 * zeitFaktor(); let aus = false, d = MAX;
      const ende = (gestoppt) => { if (aus) return; aus = true; loesche(); fertig({ d, gestoppt }); };
      karten.querySelector('[data-a="stopp"]').onclick = () => ende(true);
      halte((e) => { if (['Space', 'KeyE', 'Enter'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); if (!e.repeat) ende(true); } });
      const tick = () => { if (aus) return; const u = Math.min(1, (performance.now() - t0) / dauer); d = MAX - u * (MAX - 0.3);
        er.style.left = (u * 82) + '%'; mEl.textContent = d.toFixed(1).replace('.', ',') + ' m'; if (u >= 1) ende(false); else requestAnimationFrame(tick); };
      tick();
    });
    (async () => {
      for (const p of def.leute) {
        const r = await runde(p);
        abstaende[p.id] = Math.round(r.d * 10) / 10;
        karten.innerHTML = '';
        bühne.innerHTML = blaseHtml(p, r.gestoppt ? p.okay : p.zuNah);
        await warte(lesezeit(r.gestoppt ? p.okay : p.zuNah) + 300);
      }
      er.style.left = '-40px';
      bühne.innerHTML = '<div class="sz-abstaende">' + def.leute.map((p) => '<span style="--f:' + esc(p.farbe) + '"><b>' + esc(p.name) + '</b>' + String(abstaende[p.id]).replace('.', ',') + ' m</span>').join('') + '</div>';
      weiterKnopf(karten, { abstaende }, ok, '<div class="sz-sys">Jeder Abstand ist okay. Er ist nur bei jedem Menschen anders.</div>');
    })();
  });

  // Stopp bauen (E23 Stopp-Jury): Blick, Stimme und Worte wählen. Wie klar kommt das Stopp an? Die andere Person reagiert.
  // def: { wo, situation, gegner: { name, farbe }, teile: [{ titel, optionen: [{ t, klar: 0–2, angriff? }] }], reaktion: { klar, mittel, unklar, angriff } }
  // → { klarheit, art }
  ui.stoppBau = (def) => new Promise((ok) => {
    const wahl = def.teile.map(() => -1);
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>🛑 Dein Stopp</b></div>' +
      '<div class="sz-fall" style="--f:#b5485d"><p>' + esc(ersetze(def.situation)) + '</p></div><p class="sz-info">Bau dein Stopp. Was macht es klar?</p>' +
      '<div class="sz-teile"></div><div class="sz-bühne"></div><div class="sz-karten"></div></div>');
    const teile = k.querySelector('.sz-teile'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    let fertig = false;
    const zeig = () => {
      teile.innerHTML = def.teile.map((tl, i) => '<div><small class="sz-teil-t">' + esc(tl.titel) + '</small>' + tl.optionen.map((o, j) => '<button type="button" data-i="' + i + '" data-j="' + j + '" class="' + (wahl[i] === j ? 'an' : '') + '">' + esc(ersetze(o.t)) + '</button>').join('') + '</div>').join('');
      teile.querySelectorAll('[data-j]').forEach((b) => { b.onclick = () => { if (fertig) return; wahl[+b.dataset.i] = +b.dataset.j; zeig(); }; });
      karten.innerHTML = wahl.every((w) => w >= 0) ? '<button type="button" class="sz-weiter" data-a="w">Stopp sagen <kbd>E</kbd></button>' : '';
      const w = karten.querySelector('[data-a="w"]'); if (w) w.onclick = sagen;
    };
    const sagen = async () => {
      if (fertig) return; fertig = true; loesche();
      wahl.forEach((w, i) => { if (w < 0) wahl[i] = 0; });
      const o = wahl.map((w, i) => def.teile[i].optionen[w]);
      const klarheit = o.reduce((s, x) => s + (x.klar || 0), 0), angriff = o.some((x) => x.angriff);
      const art = angriff ? 'angriff' : klarheit >= def.teile.length * 2 - 1 ? 'klar' : klarheit >= def.teile.length ? 'mittel' : 'unklar';
      teile.innerHTML = '<div class="sz-sys">Du: ' + esc(o.map((x) => ersetze(x.t)).join(' · ')) + '</div>';
      const r = def.reaktion[art] || [];
      for (const t of r) { bühne.insertAdjacentHTML('beforeend', blaseHtml(def.gegner, t)); await warte(lesezeit(t)); }
      weiterKnopf(karten, { klarheit, art }, ok, '<div class="sz-sys">' + ({ klar: 'Klar. Ruhig. Ernst genommen.', mittel: 'Halb angekommen. Ein Teil hat gewackelt.', unklar: 'Das Lächeln hat das Stopp weggenommen.', angriff: 'Angekommen – aber als Angriff. Jetzt geht es um den Streit, nicht ums Foto.' })[art] + '</div>');
    };
    zeig();
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); sagen(); } });
  });

  // ---------- Kurs Modul 6 (Wenn es schwierig wird) ----------
  // Konflikt-Treppe (E24): Ein Streit steigt Stufe für Stufe. Auf jeder Stufe kannst du einen Ausstieg versuchen –
  // oder weiter zuschauen. Je früher der Ausstieg, desto weniger kaputt. def: { wo, links, rechts, stufen: [{ titel, sagt: [[seite, text]…],
  // ausstiege: [{ t, wirkt, antwort: [seite, text] }] }] } → { stufe, ausgestiegen }
  ui.treppe = (def) => new Promise((ok) => {
    const P = { l: def.links, r: def.rechts };
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>🪜 Konflikt-Treppe</b></div>' +
      '<div class="sz-treppe">' + def.stufen.map((s, i) => '<div class="sz-stufe" data-i="' + i + '" style="--h:' + (i + 1) + '"><span>' + esc(s.titel) + '</span></div>').join('') + '</div>' +
      '<div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    let stufe = 0, ausgestiegen = false;
    (async () => {
      for (let i = 0; i < def.stufen.length && !ausgestiegen; i++) {
        stufe = i + 1; const s = def.stufen[i];
        k.querySelectorAll('.sz-stufe').forEach((el) => el.classList.toggle('an', +el.dataset.i <= i));
        bühne.innerHTML = '';
        for (const [seite, t] of s.sagt) { bühne.insertAdjacentHTML('beforeend', blaseHtml(P[seite], t)); while (bühne.children.length > 3) bühne.firstChild.remove(); await warte(lesezeit(t)); }
        const opts = s.ausstiege.concat([{ t: '(Weiter zuschauen.)', zusehen: true }]);
        const j = await karteWahl(karten, opts.map((o, n) => '<button type="button" data-i="' + n + '"><span>' + esc(ersetze(o.t)) + '</span></button>').join(''), opts.length, { zeit: def.zeit || 12, still: opts.length - 1, zeitEl: null });
        karten.innerHTML = '';
        const o = opts[j];
        if (!o.zusehen) {
          bühne.insertAdjacentHTML('beforeend', blaseHtml(null, ersetze(o.t), true));
          if (o.antwort) { await warte(500); bühne.insertAdjacentHTML('beforeend', blaseHtml(P[o.antwort[0]] || null, o.antwort[1])); }
          await warte(lesezeit(o.antwort ? o.antwort[1] : 'x x x x'));
          if (o.wirkt) ausgestiegen = true;
        }
      }
      const txt = ausgestiegen ? 'Ausgestiegen auf Stufe ' + stufe + ' von ' + def.stufen.length + '.' : 'Oben angekommen. Jetzt knallt es.';
      k.querySelectorAll('.sz-stufe').forEach((el) => el.classList.toggle('knall', !ausgestiegen && +el.dataset.i === def.stufen.length - 1));
      weiterKnopf(karten, { stufe, ausgestiegen }, ok, '<div class="sz-sys">' + esc(txt) + '</div>');
    })();
  });

  // Druck-Runde (E25 Gruppendruck): Mehrere reden auf dich ein. Zwei Balken: Druck der Gruppe und dein Ich.
  // Einmal darfst du den Anker werfen (Atmen, Füße, Nein-Satz): Die Zeit hält an. def: { wo, gruppe: { id: { name, farbe } },
  // runden: [{ wer, sagt, karten: [{ t, art, druck, ich, antwort }] }], anker } → { druck, ich, ja, nein }
  ui.druckRunde = (def) => new Promise((ok) => {
    const G = def.gruppe;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>🌀 Druck-Runde</b></div>' +
      '<div class="sz-druck"><div><small>Druck</small><i class="d"></i></div><div><small>Dein Ich</small><i class="i"></i></div></div>' +
      '<div class="sz-kreis-leute">' + Object.entries(G).map(([id, p]) => '<i data-p="' + id + '" style="--f:' + esc(p.farbe) + '">' + esc(p.name[0]) + '<small>' + esc(p.name) + '</small></i>').join('') + '</div>' +
      '<div class="sz-bühne"></div><div class="sz-zeit"><i></i></div><div class="sz-karten ly-d-optionen"></div><button type="button" class="ly-link sz-anker">⚓ Anker werfen (einmal)</button></div>');
    const bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten'), zeitEl = k.querySelector('.sz-zeit i'), anker = k.querySelector('.sz-anker');
    let druck = 30, ich = 60, ja = 0, nein = 0, ankerDa = true;
    const zeig = () => { k.querySelector('.sz-druck .d').style.width = druck + '%'; k.querySelector('.sz-druck .i').style.width = ich + '%'; };
    zeig();
    (async () => {
      for (const r of def.runden) {
        k.querySelectorAll('[data-p]').forEach((el) => el.classList.toggle('steht', el.dataset.p === r.wer));
        bühne.innerHTML = blaseHtml(G[r.wer], r.sagt); druck = Math.min(100, druck + 8); zeig();
        await warte(lesezeit(r.sagt) * 0.7);
        let j;
        const wahl = karteWahl(karten, r.karten.map((c, n) => '<button type="button" data-i="' + n + '"><span>' + esc(ersetze(c.t)) + '</span></button>').join(''), r.karten.length, { zeit: def.zeit || 9, still: -1, zeitEl });
        if (ankerDa) anker.hidden = false;
        anker.onclick = () => { if (!ankerDa) return; ankerDa = false; anker.hidden = true; ich = Math.min(100, ich + 10); zeig(); bühne.insertAdjacentHTML('beforeend', '<div class="sz-sys">⚓ ' + esc(ersetze(def.anker)) + '</div>'); };
        j = await wahl; anker.hidden = true; karten.innerHTML = '';
        const c = j < 0 ? { t: '(…)', art: 'still', druck: 6, ich: -6, antwort: 'Keine Antwort ist für die Gruppe ein Ja.' } : r.karten[j];
        if (c.art === 'ja') ja++; if (c.art === 'nein') nein++;
        druck = Math.max(0, Math.min(100, druck + (c.druck || 0))); ich = Math.max(0, Math.min(100, ich + (c.ich || 0))); zeig();
        if (j >= 0) bühne.insertAdjacentHTML('beforeend', blaseHtml(null, ersetze(c.t), true));
        if (c.antwort) { await warte(450); bühne.insertAdjacentHTML('beforeend', j < 0 ? '<div class="sz-sys">' + esc(c.antwort) + '</div>' : blaseHtml(G[c.wer || r.wer], c.antwort)); }
        await warte(lesezeit(c.antwort || 'x x'));
        if (c.art === 'gehen') break;
      }
      anker.hidden = true;
      weiterKnopf(karten, { druck, ich, ja, nein }, ok, '<div class="sz-sys">Dein Ich: ' + ich + ' · Druck: ' + druck + '</div>');
    })();
  });

  // Bühne kippen (E26 Mobbing und Zivilcourage): Jemand wird vor Publikum fertiggemacht. Mit jeder Stufe der Zivilcourage-
  // Leiter wechseln Zuschauende die Seite. Die Bühne kippt. def: { wo, opfer, taeter, publikum: [{ name, farbe, mut }],
  // aktionen: [{ t, stufe, wirkt, antwort: [wer, text] }], runden } → { gekippt, stufen: [..] }
  ui.buehneKippen = (def) => new Promise((ok) => {
    const pub = def.publikum.map((p) => ({ ...p, seite: 'l' }));
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>⚖️ Kipp die Bühne</b></div>' +
      '<div class="sz-buehne-k"><div class="sz-bk-brett"><div class="sz-bk-l"><b>' + esc(def.taeter.name) + '</b><div></div></div><div class="sz-bk-r"><b>' + esc(def.opfer.name) + '</b><div></div></div></div><i class="sz-bk-fuss"></i></div>' +
      '<div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const brett = k.querySelector('.sz-bk-brett'), L = k.querySelector('.sz-bk-l div'), R = k.querySelector('.sz-bk-r div'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const zeig = () => {
      L.innerHTML = pub.filter((p) => p.seite === 'l').map((p) => '<i style="--f:' + esc(p.farbe) + '" title="' + esc(p.name) + '">' + esc(p.name[0]) + '</i>').join('');
      R.innerHTML = '<i class="du">●</i>' + pub.filter((p) => p.seite === 'r').map((p) => '<i style="--f:' + esc(p.farbe) + '" title="' + esc(p.name) + '">' + esc(p.name[0]) + '</i>').join('');
      const n = pub.filter((p) => p.seite === 'r').length + 1, m = pub.filter((p) => p.seite === 'l').length + 1;
      brett.style.transform = 'rotate(' + Math.max(-12, Math.min(12, (n - m) * 3)) + 'deg)';
    };
    zeig();
    const stufen = []; const benutzt = new Set();
    (async () => {
      for (const [w, t] of def.start || []) { bühne.insertAdjacentHTML('beforeend', blaseHtml(w === 'opfer' ? def.opfer : def.taeter, t)); await warte(lesezeit(t)); }
      for (let r = 0; r < (def.runden || 3); r++) {
        const offen = def.aktionen.map((a, i) => ({ a, i })).filter((x) => !benutzt.has(x.i));
        const j = await karteWahl(karten, offen.map((x, n) => '<button type="button" data-i="' + n + '"><small>Stufe ' + x.a.stufe + '</small><span>' + esc(ersetze(x.a.t)) + '</span></button>').join(''), offen.length);
        karten.innerHTML = ''; const { a, i } = offen[j]; benutzt.add(i); stufen.push(a.stufe);
        bühne.innerHTML = blaseHtml(null, ersetze(a.t), true);
        let n = a.wirkt || 0; for (const p of pub) { if (n > 0 && p.seite === 'l' && p.mut <= a.stufe + r) { p.seite = 'r'; n--; } }
        await warte(400); zeig();
        if (a.antwort) { bühne.insertAdjacentHTML('beforeend', blaseHtml(a.antwort[0] === 'opfer' ? def.opfer : a.antwort[0] === 'taeter' ? def.taeter : (pub.find((p) => p.name === a.antwort[0]) || null), a.antwort[1])); await warte(lesezeit(a.antwort[1])); }
      }
      const gekippt = pub.filter((p) => p.seite === 'r').length;
      weiterKnopf(karten, { gekippt, stufen }, ok, '<div class="sz-sys">' + esc(gekippt >= pub.length / 2 ? 'Die Bühne ist gekippt. ' + gekippt + ' stehen jetzt auf der anderen Seite.' : gekippt + ' sind rübergekommen. Jeder einzelne zählt.') + '</div>');
    })();
  });

  // ---------- Kurs Modul 7 (Digitale Welt) ----------
  // Feed-Duell gegen den Algorithmus (E27): Du wischst durch einen Feed. Was du likest – und wo du hängen bleibst –
  // bekommst du öfter. Am Ende siehst du, woraus dein Feed geworden ist. def: { arten: { id: [name, farbe] }, posts: [{ art, t, sy }], runden }
  // → { anteile: { art: % }, top, geliked: n }
  ui.feedSim = (def) => new Promise((ok) => {
    const A = def.arten, ids = Object.keys(A), gewicht = Object.fromEntries(ids.map((a) => [a, 1])), gezeigt = Object.fromEntries(ids.map((a) => [a, 0]));
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>📱 Du gegen den Algorithmus</b></div>' +
      '<p class="sz-info">Wisch durch deinen Feed. ❤️ = gefällt mir, ⏭ = weiter. Wer lange guckt, sagt dem Algorithmus auch was.</p>' +
      '<div class="sz-feed"></div><div class="sz-feed-balken"></div><div class="sz-karten ly-d-optionen sz-raster"></div></div>');
    const feed = k.querySelector('.sz-feed'), balken = k.querySelector('.sz-feed-balken'), karten = k.querySelector('.sz-karten');
    const benutzt = new Set(); let geliked = 0;
    const zieh = () => {
      const summe = ids.reduce((s, a) => s + gewicht[a], 0); let r = Math.random() * summe, art = ids[0];
      for (const a of ids) { r -= gewicht[a]; if (r <= 0) { art = a; break; } }
      const p = def.posts.find((x) => x.art === art && !benutzt.has(x)) || def.posts.find((x) => !benutzt.has(x)) || def.posts[0];
      benutzt.add(p); return p;
    };
    const zeigBalken = () => { const n = ids.reduce((s, a) => s + gezeigt[a], 0) || 1;
      balken.innerHTML = ids.map((a) => '<i style="width:' + (gezeigt[a] / n * 100) + '%;background:' + A[a][1] + '" title="' + esc(A[a][0]) + '"></i>').join(''); };
    (async () => {
      for (let n = 0; n < (def.runden || 10); n++) {
        const p = zieh(); gezeigt[p.art]++;
        feed.innerHTML = '<div class="sz-post" style="--f:' + A[p.art][1] + '"><small>' + esc(A[p.art][0]) + '</small><i>' + (p.sy || '📷') + '</i><b>' + esc(ersetze(p.t)) + '</b></div>';
        zeigBalken();
        const t0 = performance.now();
        const j = await karteWahl(karten, '<button type="button" data-i="0"><span>❤️ Gefällt mir</span></button><button type="button" data-i="1"><span>⏭ Weiter</span></button>', 2, { zeit: 6, still: 2 });
        const verweilt = (performance.now() - t0) / 1000;
        if (j === 0) { gewicht[p.art] += 2; geliked++; } else if (j === 2 || verweilt > 3.5) gewicht[p.art] += 1;   // Hängenbleiben zählt auch
        else gewicht[p.art] = Math.max(0.4, gewicht[p.art] - 0.3);
        karten.innerHTML = '';
        await warte(250);
      }
      const n = ids.reduce((s, a) => s + gezeigt[a], 0) || 1;
      const anteile = Object.fromEntries(ids.map((a) => [a, Math.round(gezeigt[a] / n * 100)]));
      const top = ids.reduce((m, a) => (gewicht[a] > gewicht[m] ? a : m), ids[0]);
      feed.innerHTML = '<div class="sz-post" style="--f:' + A[top][1] + '"><small>Dein nächster Feed</small><i>🔮</i><b>Ab jetzt vor allem: ' + esc(A[top][0]) + '</b></div>';
      weiterKnopf(karten, { anteile, top, geliked }, ok, '<div class="sz-sys">Du hast den Feed gebaut. Mit jedem ❤️ – und mit jedem langen Blick.</div>');
    })();
  });

  // ---------- Kurs Modul 8 (Gesund und stark) ----------
  // Stress-Rucksack (E29): Dinge kommen in den Rucksack. Für jedes entscheidest du: selbst tragen, kann warten, mit jemandem
  // teilen – oder: gehört gar nicht mir. Der Rucksack wird leichter oder schwerer; die Figur läuft schneller oder langsamer.
  // def: { wo, wer, dinge: [{ t, sy, kg, passt: [arten], warum }] } → { kg, geteilt, richtig }
  ui.rucksack = (def) => new Promise((ok) => {
    const ARTEN = [['tragen', '💪 Trag ich'], ['warten', '⏳ Kann warten'], ['teilen', '🤝 Teil ich'], ['nicht', '🚫 Nicht meins']];
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>🎒 ' + esc(def.titel || 'Stress-Rucksack') + '</b></div>' +
      '<div class="sz-rs"><div class="sz-rs-sack"><i></i><b>0 kg</b></div><div class="sz-rs-lauf"><span class="sz-rs-figur">🚶</span></div></div>' +
      '<div class="sz-sort-karte sz-spur"></div><div class="sz-bühne"></div><div class="sz-karten sz-raster ly-d-optionen"></div></div>');
    const sack = k.querySelector('.sz-rs-sack i'), kgEl = k.querySelector('.sz-rs-sack b'), figur = k.querySelector('.sz-rs-figur'), karte = k.querySelector('.sz-spur'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    let kg = 0, geteilt = 0, richtig = 0; const max = def.dinge.reduce((s, d) => s + d.kg, 0);
    const zeig = () => { sack.style.height = Math.min(100, kg / max * 100) + '%'; kgEl.textContent = kg + ' kg'; figur.style.animationDuration = (0.6 + kg / max * 2.4) + 's'; figur.textContent = kg / max > 0.6 ? '🧍' : '🚶'; };
    zeig();
    (async () => {
      for (const d of def.dinge) {
        karte.innerHTML = '<i>' + (d.sy || '📦') + '</i> ' + esc(ersetze(d.t)) + ' <small>(' + d.kg + ' kg)</small>'; bühne.innerHTML = '';
        kg += d.kg; zeig(); await warte(350);
        const j = await karteWahl(karten, ARTEN.map(([, n], i) => '<button type="button" data-i="' + i + '"><span>' + n + '</span></button>').join(''), 4);
        karten.innerHTML = ''; const art = ARTEN[j][0];
        if (art === 'warten') kg -= Math.ceil(d.kg / 2); else if (art === 'teilen') { kg -= Math.ceil(d.kg * 0.6); geteilt++; } else if (art === 'nicht') kg -= d.kg;
        kg = Math.max(0, kg); zeig();
        if ((d.passt || []).includes(art)) richtig++;
        bühne.innerHTML = '<div class="sz-sys">' + ((d.passt || []).includes(art) ? '✓ ' : '') + esc(ersetze(d.warum || '')) + '</div>';
        await warte(lesezeit(d.warum || 'x x x'));
      }
      karte.style.display = 'none';
      weiterKnopf(karten, { kg, geteilt, richtig }, ok, '<div class="sz-sys">Im Rucksack: ' + kg + ' von ' + max + ' kg. Was man teilt, wird leichter.</div>');
    })();
  });

  // Akku-Tag (E29): Ein Tag von morgens bis nachts. Jede Entscheidung lädt den Akku – oder zieht ihn leer.
  // Am Ende: Wie voll startest du in den nächsten Morgen? def: { start, stationen: [{ zeit, t, wahl: [{ t, akku, antwort }] }] } → { akku, morgen }
  ui.akkuTag = (def) => new Promise((ok) => {
    let akku = def.start || 70;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>🔋 Dein Akku-Tag</b></div>' +
      '<div class="sz-akku"><div class="sz-akku-k"><i></i></div><b>70 %</b></div><div class="sz-tag"></div>' +
      '<div class="sz-fall" style="--f:#2b3a55"><b class="sz-akku-zeit"></b><p class="sz-akku-t"></p></div><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const fuell = k.querySelector('.sz-akku-k i'), proz = k.querySelector('.sz-akku b'), zeit = k.querySelector('.sz-akku-zeit'), text = k.querySelector('.sz-akku-t'), tag = k.querySelector('.sz-tag'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const zeig = () => { fuell.style.width = akku + '%'; fuell.style.background = akku < 25 ? '#d6452f' : akku < 55 ? '#e9a23b' : '#3fa66b'; proz.textContent = Math.round(akku) + ' %'; };
    tag.innerHTML = def.stationen.map((s, i) => '<i data-i="' + i + '">' + esc(s.zeit) + '</i>').join('');
    zeig();
    (async () => {
      for (let n = 0; n < def.stationen.length; n++) {
        const s = def.stationen[n];
        tag.querySelectorAll('i').forEach((el) => el.classList.toggle('an', +el.dataset.i <= n));
        zeit.textContent = s.zeit; text.textContent = ersetze(s.t); bühne.innerHTML = '';
        akku = Math.max(0, akku - (s.verbrauch || 6)); zeig();
        const j = await karteWahl(karten, s.wahl.map((w, i) => '<button type="button" data-i="' + i + '"><span>' + esc(ersetze(w.t)) + '</span></button>').join(''), s.wahl.length);
        karten.innerHTML = ''; const w = s.wahl[j];
        akku = Math.max(0, Math.min(100, akku + w.akku)); zeig();
        bühne.innerHTML = '<div class="sz-sys">' + (w.akku >= 0 ? '+' : '') + w.akku + ' % · ' + esc(ersetze(w.antwort || '')) + '</div>';
        await warte(lesezeit(w.antwort || 'x x x'));
      }
      const morgen = Math.round(Math.min(100, akku + (def.nacht || 0)));
      zeit.textContent = 'Nächster Morgen'; text.textContent = morgen >= 60 ? 'Du wachst auf, bevor der Wecker klingelt. Fast.' : morgen >= 35 ? 'Müde. Aber es geht.' : 'Der Wecker klingelt. Du hörst ihn erst beim dritten Mal.';
      akku = morgen; zeig();
      weiterKnopf(karten, { akku: morgen, morgen }, ok, '<div class="sz-sys">Du startest mit ' + morgen + ' % in den Tag.</div>');
    })();
  });

  // Gesund-Würfel (E29): Würfeln, kleine Aufgabe, erledigt. Man darf eine Aufgabe tauschen. def: { aufgaben: [6× { t, sy, wer?, sagt? }], runden }
  // → { erledigt, getauscht }
  ui.gesundWuerfel = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>🎲 Gesund-Würfel</b></div>' +
      '<div class="sz-wuerfel">🎲</div><div class="sz-sort-karte sz-spur"></div><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const w = k.querySelector('.sz-wuerfel'), karte = k.querySelector('.sz-spur'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    let erledigt = 0, getauscht = 0, tausch = 1;
    const AUGEN = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    (async () => {
      for (let r = 0; r < (def.runden || 3); r++) {
        karte.textContent = ''; bühne.innerHTML = '';
        await karteWahl(karten, '<button type="button" data-i="0"><span>🎲 Würfeln</span></button>', 1);
        karten.innerHTML = ''; let z = 0;
        for (let i = 0; i < 8; i++) { z = Math.floor(Math.random() * 6); w.textContent = AUGEN[z]; await warte(70 + i * 15); }
        let a = def.aufgaben[z];
        karte.innerHTML = '<i>' + a.sy + '</i> ' + esc(ersetze(a.t));
        let j = await karteWahl(karten, '<button type="button" data-i="0"><span>✅ Gemacht</span></button>' + (tausch ? '<button type="button" data-i="1"><span>🔁 Tauschen (einmal)</span></button>' : ''), tausch ? 2 : 1);
        if (j === 1) { tausch = 0; getauscht++; z = (z + 3) % 6; w.textContent = AUGEN[z]; a = def.aufgaben[z]; karte.innerHTML = '<i>' + a.sy + '</i> ' + esc(ersetze(a.t)); j = await karteWahl(karten, '<button type="button" data-i="0"><span>✅ Gemacht</span></button>', 1); }
        karten.innerHTML = ''; erledigt++;
        if (a.sagt) { bühne.innerHTML = blaseHtml(a.wer, a.sagt); await warte(lesezeit(a.sagt)); } else await warte(500);
      }
      karte.style.display = 'none';
      weiterKnopf(karten, { erledigt, getauscht }, ok, '<div class="sz-sys">' + erledigt + ' kleine Schritte. Klein zählt.</div>');
    })();
  });

  // ---------- Kurs Modul 9 (Abschluss) ----------
  // Jahres-Kurve (Rückblick): Momente des Jahres kommen als Polaroids. Für jeden sagst du, wie es sich angefühlt hat.
  // Daraus wird deine Kurve. Kein Jahr ist eine gerade Linie. def: { wo, momente: [{ t, sy, dein }] } → { werte: [0..3], hoch, tief }
  ui.jahresKurve = (def) => new Promise((ok) => {
    const M = def.momente, GES = [['😣', 'schwer'], ['😕', 'gemischt'], ['🙂', 'okay'], ['😄', 'richtig gut']];
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>📈 Deine Jahres-Kurve</b></div>' +
      '<div class="sz-kurve"><svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path class="sz-kurve-l" d=""/></svg><div class="sz-kurve-p"></div></div>' +
      '<div class="sz-polaroid"></div><div class="sz-bühne"></div><div class="sz-karten sz-raster ly-d-optionen"></div></div>');
    const pfad = k.querySelector('.sz-kurve-l'), punkte = k.querySelector('.sz-kurve-p'), pol = k.querySelector('.sz-polaroid'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const werte = [];
    const x = (i) => (M.length < 2 ? 50 : 4 + i * 92 / (M.length - 1)), y = (v) => 34 - v * 10;
    const zeichne = () => {
      pfad.setAttribute('d', werte.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v)).join(' '));
      punkte.innerHTML = werte.map((v, i) => '<i style="left:' + x(i) + '%;top:' + (y(v) / 40 * 100) + '%">' + GES[v][0] + '</i>').join('');
    };
    (async () => {
      for (let n = 0; n < M.length; n++) {
        const m = M[n]; bühne.innerHTML = '';
        pol.innerHTML = '<i>' + (m.sy || '📷') + '</i><b>' + esc(ersetze(m.t)) + '</b>' + (m.dein ? '<small>' + esc(ersetze(m.dein)) + '</small>' : '');
        pol.classList.remove('neu'); void pol.offsetWidth; pol.classList.add('neu');
        await warte(Math.min(2600, lesezeit(m.t, m.dein || '') * 0.5));
        const j = await karteWahl(karten, GES.map(([sy, t], i) => '<button type="button" data-i="' + i + '"><span>' + sy + ' ' + t + '</span></button>').join(''), 4);
        karten.innerHTML = ''; werte.push(j); zeichne();
        await warte(350);
      }
      const hoch = werte.indexOf(Math.max(...werte)), tief = werte.indexOf(Math.min(...werte));
      pol.innerHTML = '<i>🗓️</i><b>Dein Jahr</b><small>Oben: ' + esc(ersetze(M[hoch].t)) + ' · Unten: ' + esc(ersetze(M[tief].t)) + '</small>';
      weiterKnopf(karten, { werte, hoch, tief }, ok, '<div class="sz-sys">Rauf und runter. So sieht ein echtes Jahr aus.</div>');
    })();
  });

  // Brief an mich (Abschluss): Du baust einen Brief an dein Ich in einem Jahr. Satz für Satz, aus Bausteinen.
  // Der Brief wird verschlossen – und kommt in der 6ème zurück. def: { wo, an, teile: [{ frage, optionen: [t] }], gruss } → { saetze, text }
  ui.briefAnMich = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>✉️ Brief an mich</b></div>' +
      '<div class="sz-brief"><p class="sz-brief-an">' + esc(ersetze(def.an || 'Liebes Ich,')) + '</p><div class="sz-brief-t"></div><p class="sz-brief-gruss"></p></div>' +
      '<p class="sz-info sz-brief-frage"></p><div class="sz-karten ly-d-optionen"></div></div>');
    const brief = k.querySelector('.sz-brief'), text = k.querySelector('.sz-brief-t'), frage = k.querySelector('.sz-brief-frage'), karten = k.querySelector('.sz-karten'), gruss = k.querySelector('.sz-brief-gruss');
    const saetze = [];
    (async () => {
      for (const t of def.teile) {
        frage.textContent = ersetze(t.frage);
        const j = await karteWahl(karten, t.optionen.map((o, i) => '<button type="button" data-i="' + i + '"><span>' + esc(ersetze(o)) + '</span></button>').join(''), t.optionen.length);
        karten.innerHTML = ''; const s = ersetze(t.optionen[j]); saetze.push(s);
        const p = document.createElement('p'); text.appendChild(p);
        for (let i = 1; i <= s.length; i += 2) { p.textContent = s.slice(0, i); await warte(18); }
        p.textContent = s; await warte(500);
      }
      frage.textContent = '';
      gruss.textContent = ersetze(def.gruss || 'Bis in einem Jahr. Dein {name}');
      await warte(1300);
      brief.classList.add('zu');
      await warte(900);
      weiterKnopf(karten, { saetze, text: saetze.join(' ') }, ok, '<div class="sz-sys">Verschlossen. Du bekommst ihn in der 6ème zurück.</div>');
    })();
  });

  return ui;
}
