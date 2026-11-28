// Annexe Junglinster – Situations-Spiele. In einem wichtigen Moment geht ein Fenster auf, und man SPIELT die Situation,
// statt nur eine Antwort anzuklicken. Angelehnt an CREW, aber eigene Spiele nur für dieses Spiel.
// Kein richtig/falsch, keine Punkte, keine Noten: die Menschen reagieren, und der Ausgang verändert die Geschichte.
//   ui.hitzeDuell(def)   – Streit: Antwortkarten mit Zeitdruck, Hitze-Balken, Kopf/Bauch/Stolz schlagen Karten vor
//   ui.liveChat(def)     – Handy: Klassenchat in Echtzeit, man kann jederzeit eingreifen (oder nicht)
// Alle: E / Enter = weiter bzw. Standard-Wahl; Zeit läuft ab = Schweigen (zählt auch). „Ruhiger Modus“ = mehr Zeit.
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const warte = (ms) => new Promise((ok) => setTimeout(ok, ms));
const STIMME = { kopf: ['Kopf', '#5f7d9e'], bauch: ['Bauch', '#b0784a'], stolz: ['Stolz', '#b5485d'] };

export function situationen(ui, { name = () => 'Du', ersetze = (t) => t, speech = null, ton = () => {} } = {}) {
  const tasten = new Set();
  const halte = (f) => { const h = (e) => f(e); document.addEventListener('keydown', h, true); tasten.add(h); return h; };
  const loesche = () => { tasten.forEach((h) => document.removeEventListener('keydown', h, true)); tasten.clear(); };
  const zeitFaktor = () => (ui.zeitlos ? 60 : 1) * (ui.ruhig ? 1.8 : 1) * (ui.einstellungen && ui.einstellungen().text !== 'normal' ? 1.3 : 1);

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
      const lesen = Math.min(3000, lesezeit(...r.karten.map((c) => c.t)) * 0.35);   // erst lesen, dann läuft die Zeit
      let aus = false;
      const tick = () => { if (aus) return; const f = Math.min(1, 1 - (performance.now() - t0 - lesen) / ms); zeitEl.style.width = Math.max(0, f * 100) + '%'; zeitEl.parentNode.classList.toggle('lesen', performance.now() - t0 < lesen); if (f <= 0) ende(-1); else requestAnimationFrame(tick); };
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
  const chatErklaert = (setzen) => { try { if (setzen) localStorage.setItem('lycee.chatErklaert', '1'); return localStorage.getItem('lycee.chatErklaert') === '1'; } catch (e) { return true; } };
  ui.liveChat = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz sz-chat"><div class="sz-handy"><div class="ly-h-kopf">' + esc(def.titel) + '<small>' + esc(def.mitglieder || '') + ' Mitglieder · online</small></div>' +
      '<div class="sz-verlauf-wrap"><div class="ly-h-verlauf sz-verlauf" aria-live="polite"></div><button type="button" class="sz-neu" hidden>↓ Neue Nachricht</button></div><div class="ly-h-tippt" hidden></div>' +
      (def.info || !chatErklaert() ? '<p class="sz-chat-info">' + esc(def.info || 'Nachrichten kommen nach und nach. Tippen oder nicht. Beides zählt.') + '</p>' : '') +
      '<div class="sz-aktionen ly-d-optionen"></div><div class="sz-unten"><span class="sz-uhr"></span>' + (def.klingel && !ui.zeitlos ? '' : '<button type="button" class="ly-link" data-x="pause">⏸ Pause</button>') + '<button type="button" class="ly-link" data-x="weg">Handy weg <kbd>Esc</kbd></button></div></div></div>');
    chatErklaert(true);
    const verlauf = k.querySelector('.sz-verlauf'), tippt = k.querySelector('.ly-h-tippt'), leiste = k.querySelector('.sz-aktionen'), neuChip = k.querySelector('.sz-neu');
    const flags = {}, gemacht = [], schlange = [];
    // Kapitel 5: Umfrage im Chat ({ umfrage: { frage, optionen: [{ id, t }] } }) – Stimmen kommen als eigene Einträge ({ stimme: { opt, wer } }),
    // mit Namen unter dem Balken. Die Blase (def.blase) hält den Chat an: ein Gedanke, 📷 prüfen oder weiter.
    let umf = null, blaseDa = false, stoerDa = false;
    const umfZeig = () => {
      if (!umf || !umf.el) return; const ges = umf.opts.reduce((a, o) => a + o.namen.length, 0) || 1;
      umf.el.querySelector('.k5-u-opts').innerHTML = umf.opts.map((o) => '<div class="k5-u-opt"><i style="width:' + Math.round(o.namen.length / ges * 100) + '%"></i><span>' + esc(ersetze(o.t)) + '</span><b>' + o.namen.length + '</b>' +
        (o.namen.length ? '<small>' + esc(o.namen.slice(-4).join(', ') + (o.namen.length > 4 ? ' +' + (o.namen.length - 4) : '')) + '</small>' : '') + '</div>').join('');
    };
    const stimmen = (id) => (umf ? (umf.opts.find((o) => o.id === id) || { namen: [] }).namen.length : 0);
    let ersteDa = false;   // Knöpfe erst, wenn die erste Nachricht von jemandem da ist (sonst „Gelesen“ vor der Nachricht)
    const mitUmfrage = def.nachrichten.some((n) => n.umfrage);   // Kapitel 5: dann erst mit der Umfrage (sonst ist die Szene vorbei, bevor sie anfängt)
    let t = 0, zu = false, endet = false, lacher = 0, letzt = performance.now(), wahlOffen = false, pause = false, wartBis = 0;
    // Lesetempo: die nächste Nachricht kommt frühestens, wenn man die vorige lesen konnte (langsame Leser mitgedacht)
    const lesedauer = (n) => (0.9 + String(ersetze(n.text || '')).split(/\s+/).filter(Boolean).length * 0.3 + (n.bild ? 1.2 : 0)) * (ui.ruhig ? 1.4 : 1) * (ui.einstellungen && ui.einstellungen().text !== 'normal' ? 1.2 : 1);
    // Nachlesen: nur nach unten springen, wenn man unten ist – sonst ein Hinweis „Neue Nachricht“
    const unten = () => verlauf.scrollHeight - verlauf.scrollTop - verlauf.clientHeight < 40;
    verlauf.addEventListener('scroll', () => { if (unten()) neuChip.hidden = true; });
    neuChip.onclick = () => { verlauf.scrollTop = verlauf.scrollHeight; neuChip.hidden = true; };
    const dauer = (def.dauer || 45) * (ui.ruhig ? 1.4 : 1);
    // klingel: sichtbarer Countdown (Sekunden), danach ist der Chat zu. stillstand: so viele Sekunden steht ab stillstandAb alles still (ohne Hinweis)
    const klingel = def.klingel ? def.klingel * (ui.ruhig ? 1.4 : 1) * (ui.zeitlos ? 2 : 1) : 0, steh = def.stillstand || 0, stehAb = def.stillstandAb || 0; let gestanden = 0;
    const plan = (n, ab) => schlange.push({ ...n, at: ab + (n.nach || 0) });
    def.nachrichten.forEach((n) => plan(n, 0));
    const lach = [];   // Nachrichten mit wachsenden Reaktionen
    const zeig = (n) => {
      if (n.stimme) {   // eine Stimme: kein eigener Eintrag, nur der Balken wächst (Name sichtbar)
        if (umf) { const o = umf.opts.find((x) => x.id === n.stimme.opt); if (o && !umf.opts.some((x) => x.namen.includes(ersetze(n.stimme.wer)))) { o.namen.push(ersetze(n.stimme.wer)); umfZeig(); ton && ton('klick'); } }
        if (n.setzt) { flags[n.setzt] = true; leisteNeu(); }
        return;
      }
      if (n.umfrage) {
        const warUnten2 = unten();
        verlauf.insertAdjacentHTML('beforeend', '<div class="ly-h-msg k5-umf"><b>' + esc(n.wer || '') + '</b><span>📊 ' + esc(ersetze(n.umfrage.frage)) + '</span><div class="k5-u-opts"></div><em>Umfrage · ' + esc(n.umfrage.info || 'Namen sichtbar') + '</em></div>');
        umf = { opts: n.umfrage.optionen.map((o) => ({ ...o, namen: [] })), el: verlauf.lastElementChild }; umfZeig();
        if (warUnten2) verlauf.scrollTop = verlauf.scrollHeight; else neuChip.hidden = false;
        wartBis = t + lesedauer({ text: n.umfrage.frage }); if (!ersteDa) { ersteDa = true; leisteNeu(); }
        if (n.setzt) { flags[n.setzt] = true; leisteNeu(); }
        return;
      }
      const ich = n.ich;
      const html = n.system ? '<div class="ly-h-sys">' + esc(ersetze(typeof n.system === 'string' ? n.system : n.text)) + '</div>'
        : '<div class="ly-h-msg' + (ich ? ' ich' : '') + '"><b>' + esc(ich ? 'Du' : n.wer) + '</b>' + (n.bildUrl ? '<div class="ly-h-bild sz-foto mit-bild"><img alt="' + esc(ersetze(n.bild || 'Foto')) + '" src="' + n.bildUrl + '"></div>' : n.bild ? '<div class="ly-h-bild sz-foto">📷 ' + esc(ersetze(n.bild)) + '</div>' : '') + '<span>' + esc(ersetze(n.text)) + '</span>' +
          (n.lacher ? '<i class="ly-h-reakt" data-l="' + lach.length + '">😂 ' + n.lacher.start + '</i>' : '') + '</div>';
      const warUnten = unten() || ich;
      verlauf.insertAdjacentHTML('beforeend', html);
      if (warUnten) verlauf.scrollTop = verlauf.scrollHeight; else neuChip.hidden = false;
      if (!n.system && !ich) { wartBis = t + lesedauer(n); if (!ersteDa && !mitUmfrage) { ersteDa = true; leisteNeu(); } }
      if (n.lacher) lach.push({ ...n.lacher, n: n.lacher.start, el: verlauf.querySelector('[data-l="' + (lach.length) + '"]') });
      if (n.setzt) { flags[n.setzt] = true; leisteNeu(); }
    };
    const leisteNeu = () => {
      if (wahlOffen) return;
      if (endet) { leiste.innerHTML = ''; return; }
      leiste.innerHTML = def.aktionen.filter((a) => !gemacht.includes(a.id) && (a.ab ? t >= a.ab : (ersteDa || a.sofort)) && (!a.wenn || flags[a.wenn]) && (!a.wennNicht || !flags[a.wennNicht])).map((a) => '<button type="button" data-ak="' + a.id + '"><kbd>' + a.symbol + '</kbd><span>' + esc(a.t) + '</span></button>').join('');
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
      // Aktion mit Ende (Blockieren, Posten, Stumm …): sofort keine weiteren Knöpfe und keine fremden Nachrichten mehr
      if (x.ende) { endet = true; schlange.length = 0; leiste.innerHTML = ''; }
      (x.folgen || []).forEach((n) => plan(n, t));
      if (x.ende) setTimeout(fertig, Math.max(900, ...(x.folgen || []).map((n) => (n.nach || 0) * 1000 + 1600)));
    };
    const aktion = (a) => {
      if (zu || endet || !a) return;
      if (a.wahl) {
        wahlOffen = true;
        // Unterpunkte mit Bedingung (w.wenn / w.wennNicht: Chat-Flags) – Kapitel 5: „Ayla und ich: Nein.“ erst nach dem Kamera-Check
        const sichtbar = a.wahl.map((w, i) => [w, i]).filter(([w]) => (!w.wenn || flags[w.wenn]) && (!w.wennNicht || !flags[w.wennNicht]));
        leiste.innerHTML = sichtbar.map(([w, i], n) => '<button type="button" data-w="' + i + '"><kbd>' + (n + 1) + '</kbd><span>' + esc(ersetze(w.t)) + '</span></button>').join('') + '<button type="button" data-w="-1"><kbd>✕</kbd><span>Doch nicht</span></button>';
        leiste.querySelectorAll('[data-w]').forEach((b) => { b.onclick = () => { wahlOffen = false; const i = +b.dataset.w; if (i >= 0) ausfuehren(a, { id: i, ...a.wahl[i] }); leisteNeu(); }; });
        return;
      }
      ausfuehren(a); leisteNeu();
    };
    const fertig = () => {
      if (zu) return; zu = true; loesche();
      ui.ebeneZu(); ok({ flags, aktionen: gemacht, lacher: lach.reduce((s, l) => s + Math.round(l.n), 0), ich: lacher, stimmen: umf ? Object.fromEntries(umf.opts.map((o) => [o.id, o.namen.length])) : null, namen: umf ? Object.fromEntries(umf.opts.map((o) => [o.id, o.namen.slice()])) : null, gesehen: gesehenJetzt() });
    };
    // E = schneller (nächste Nachricht sofort; am Ende: weiter). Nur Esc oder der Knopf legen das Handy weg – sonst
    // würde, wer aus Gewohnheit E drückt, still eine Entscheidung verlieren.
    halte((e) => {
      if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); flags.weg = true; fertig(); return; }
      if (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); e.stopPropagation();
        const n = schlange.slice().sort((a, b) => a.at - b.at)[0];
        wartBis = 0; if (pause) pauseUm(false);
        if (n) { if (n.at > t) beginn -= (n.at - t) * 1000; } else fertig(); }
    });
    k.querySelector('[data-x="weg"]').onclick = () => { flags.weg = true; fertig(); };
    const pk = k.querySelector('[data-x="pause"]');
    const pauseUm = (an) => { pause = an; k.firstChild.classList.toggle('pausiert', pause); if (pk) pk.textContent = pause ? '▶ Weiter' : '⏸ Pause'; };
    if (pk) pk.onclick = () => pauseUm(!pause);
    leisteNeu();
    const gesehenJetzt = () => Math.min(def.gesehenMax || def.mitglieder || 19, Math.round(3 + t * 0.6));
    // Kopf-Blase im Chat: der Chat steht. 📷 = Kamera-Check (erst was echt ist, dann die Zahlen, dann eine ungelesene Nachricht)
    const blaseZeigen = () => {
      const B = def.blase; pauseUm(true);
      const box = document.createElement('div'); box.className = 'k5-chat-blase';
      box.innerHTML = '<div class="k5-blase"><span class="k5-b-icon">💭</span><b>' + esc(ersetze(B.t)) + '</b></div><div class="k5-cb-knoepfe"><button type="button" class="k5-kamera" data-b="c" aria-label="Kamera-Check">📷</button><button type="button" class="ly-link" data-b="w">Weiter</button></div>';
      k.querySelector('.sz-handy').appendChild(box);
      const zu = () => { box.remove(); pauseUm(false); leisteNeu(); };
      box.querySelector('[data-b="w"]').onclick = () => { flags.blaseWeiter = true; zu(); };
      box.querySelector('[data-b="c"]').onclick = () => {
        flags.geprueft = true; ton && ton('kamera');
        const ja = stimmen(B.ja || 'ja'), nein = stimmen(B.nein || 'nein'), gs = gesehenJetzt(), still = Math.max(0, gs - ja - nein - stimmen('weiss'));
        flags.pruefZahlen = { ja, gs, still };
        const zeilen = [['📷 Echt', ersetze(B.echt || '')], ['🗳 Ja', String(ja)], ['👁 Gesehen', String(gs)], ['🤐 Nichts gedrückt', String(still)], ...(B.gehoert ? [['📢 Nur gehört', ersetze(B.gehoert)]] : [])];
        box.innerHTML = '<div class="k5-check"><b class="k5-c-titel">📷 Kamera-Check</b>' + zeilen.map(([a, b], i) => '<div class="k5-c-zeile" style="animation-delay:' + (i * 0.35) + 's"><small>' + esc(a) + '</small><b>' + esc(b) + '</b></div>').join('') +
          (B.ungelesen ? '<button type="button" class="k5-c-ungelesen" data-b="u">✉️ 1 ungelesen · ' + esc(B.ungelesen.wer) + ' (privat)</button>' : '') + '<p class="k5-c-kopf">' + esc(ersetze(B.kopf || 'Was sie denken, sieht keine Kamera.')) + '</p>' +
          '<div class="k5-cb-knoepfe"><button type="button" class="sz-weiter" data-b="w">Weiter <kbd>E</kbd></button></div></div>';
        const u = box.querySelector('[data-b="u"]');
        if (u) u.onclick = () => { flags[B.ungelesen.setzt || 'ungelesenGelesen'] = true; u.outerHTML = '<div class="k5-c-privat"><b>' + esc(B.ungelesen.wer) + '</b> ' + esc(ersetze(B.ungelesen.t)) + '</div>'; ton && ton('pling'); leisteNeu(); };
        box.querySelector('[data-b="w"]').onclick = zu;
      };
    };
    // Störung mitten im Chat (Kapitel 5: Mme Tidderich in der Tür): der Chat steht, drei Wahlen, Zeit läuft – Zeit um = def.stoerung.standard
    const stoerZeigen = () => {
      const D = def.stoerung; pauseUm(true);
      const box = document.createElement('div'); box.className = 'k5-chat-blase k5-chat-stoer';
      box.innerHTML = '<div class="k5-stoer"><b>' + esc(ersetze(D.t)) + '</b><div class="mv-zeit"><i></i></div><div class="k5-stoer-k">' +
        D.optionen.map((o, i) => '<button type="button" data-s="' + i + '"><kbd>' + (i + 1) + '</kbd>' + esc(ersetze(o.t)) + '</button>').join('') + '</div></div>';
      k.querySelector('.sz-handy').appendChild(box);
      const bar = box.querySelector('.mv-zeit i'), dauerS = (D.zeit || 4) * (ui.ruhig ? 1.4 : 1) * (ui.zeitlos ? 3 : 1), t0 = performance.now(); let fertigS = false;
      const waehle = (i, zeitUm) => { if (fertigS) return; fertigS = true; box.remove(); pauseUm(false); const o = D.optionen[i]; flags.stoerung = o.id; if (zeitUm) flags.stoerungZeitUm = true; ausfuehren({ id: 'stoerung' }, { ...o, id: i }); leisteNeu(); };
      box.querySelectorAll('[data-s]').forEach((b) => { b.onclick = () => waehle(+b.dataset.s); });
      const lauf = () => { if (fertigS || zu) return; const r = Math.max(0, 1 - (performance.now() - t0) / (dauerS * 1000)); bar.style.transform = 'scaleX(' + r + ')'; if (r <= 0) { waehle(Math.max(0, D.optionen.findIndex((o) => o.id === D.standard)), true); return; } requestAnimationFrame(lauf); };
      requestAnimationFrame(lauf);
    };
    let tipptBis = 0, beginn = performance.now();
    const loop = () => {
      if (zu) return;
      const jetzt = performance.now(), roh = jetzt - letzt, dt = Math.min(0.25, roh / 1000); letzt = jetzt;
      if (pause || (wahlOffen && def.wahlHaelt)) { beginn += roh; requestAnimationFrame(loop); return; }   // Pause (oder: Schreib-Menü offen bei def.wahlHaelt): die Uhr steht ganz
      t = (jetzt - beginn) / 1000;   // echte Uhr, auch auf langsamen Geräten
      if (steh && t >= stehAb && gestanden < steh) { const d = Math.min(dt, steh - gestanden); gestanden += d; beginn += d * 1000; t = (jetzt - beginn) / 1000; k.firstChild.classList.add('steht'); } else if (gestanden) k.firstChild.classList.remove('steht');
      schlange.sort((a, b) => a.at - b.at);
      const n = schlange[0];
      if (n && n.at - 1.1 <= t && !n.system && !n.ich && n.wer && (!n.wenn || flags[n.wenn]) && (!n.wennNicht || !flags[n.wennNicht])) { tippt.hidden = false; tippt.textContent = n.wer + ' tippt …'; tipptBis = t + 0.3; }
      else if (t > tipptBis) tippt.hidden = true;
      while (schlange.length && schlange[0].at <= t) {
        const m = schlange[0];
        if ((m.wenn && !flags[m.wenn]) || (m.wennNicht && flags[m.wennNicht])) { schlange.shift(); continue; }
        if (!m.system && !m.ich && t < wartBis) break;   // erst lesen lassen
        schlange.shift(); zeig(m); leisteNeu();
      }
      for (const l of lach) { if (l.stopp && [].concat(l.stopp).some((f) => flags[f])) continue; l.n += l.proSek * dt * (1 + lacher); if (l.el) l.el.textContent = '😂 ' + Math.round(l.n); }
      k.querySelector('.sz-uhr').textContent = (klingel ? '🔔 ' + Math.max(0, Math.ceil(klingel - t)) + ' s · ' : '') + 'gesehen von ' + gesehenJetzt();
      if (def.blase && !blaseDa && t >= def.blase.ab && !endet) { blaseDa = true; blaseZeigen(); }
      else if (def.stoerung && !stoerDa && t >= def.stoerung.ab && !endet && !pause && !wahlOffen && ![].concat(def.stoerung.wennNicht || []).some((f) => flags[f])) { stoerDa = true; stoerZeigen(); }
      if (klingel && t >= klingel) { flags.klingel = true; fertig(); return; }
      if (!klingel && t > dauer && !schlange.length && t >= wartBis + 1.5) { fertig(); return; }   // die letzte Nachricht noch lesen lassen
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });

  // ---------- Check-in am Handy (Kurs-Ritual Gefühlsrad) ----------
  // def: { frage, posts: [ { wer, wort, farbe } ], reaktion: (wort) => [ { wer, text } ] } → { wort, gefuehl }
  const RAD = [
    ['Freude', '#f2b134', ['gut drauf', 'aufgeregt', 'stolz']], ['Ruhe', '#5fb07a', ['entspannt', 'müde', 'okay']],
    ['Angst', '#8a7bc8', ['nervös', 'unsicher', 'überfordert']], ['Wut', '#d6452f', ['genervt', 'sauer', 'gereizt']],
    ['Trauer', '#4f88c8', ['down', 'leer', 'enttäuscht']], ['Ekel', '#5fa04a', ['angeekelt', 'bäh', 'abgestoßen']], ['Überraschung', '#e9734a', ['verwirrt', 'neugierig', 'baff']],
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
    // Zwei Schritte statt 21 kleiner Wörter: erst das Gefühl (großes Gesicht), dann das genauere Wort
    const EMO = { Freude: '😄', Ruhe: '😌', Angst: '😟', Wut: '😠', Trauer: '😢', Ekel: '🤢', Überraschung: '😲' };
    const rad = k.querySelector('.sz-rad'), frageP = rad.querySelector('p').outerHTML;
    const stufe1 = () => {
      rad.innerHTML = frageP + '<div class="sz-rad-gef">' + RAD.map(([g, f]) => '<button type="button" data-gg="' + g + '" style="--f:' + f + '"><i>' + EMO[g] + '</i><small>' + g + '</small></button>').join('') + '</div>';
      rad.querySelectorAll('[data-gg]').forEach((b) => { b.onclick = () => stufe2(b.dataset.gg); });
    };
    const stufe2 = (g) => {
      const [, f, w] = RAD.find((r) => r[0] === g);
      rad.innerHTML = '<p>' + EMO[g] + ' ' + esc(g) + ' – welches Wort passt genauer?</p><div class="sz-rad-reihe" style="--f:' + f + '">' + w.map((x) => '<button type="button" data-w="' + esc(x) + '" data-g="' + g + '">' + esc(x) + '</button>').join('') + '</div><button type="button" class="ly-link" data-zur>← anderes Gefühl</button>';
      rad.querySelectorAll('[data-w]').forEach((b) => { b.onclick = () => waehle(b.dataset.w, b.dataset.g); });
      rad.querySelector('[data-zur]').onclick = stufe1;
    };
    stufe1();
    k.querySelectorAll('[data-w]').forEach((b) => { b.onclick = () => waehle(b.dataset.w, b.dataset.g); });
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); waehle('okay', 'Ruhe'); } });
  });

  // ---------- Namen-Rekord (Kurs E01: Ball-Rekord) ----------
  // def: { leute: [ { id, name, farbe, geste } ], runden: 3, proRunde: 5 } → { treffer, gesamt, rekordZeit, gelernt: [ids] }
  ui.namenRekord = (def) => new Promise((ok) => {
    const L = def.leute, runden = def.runden || 3, pro = def.proRunde || 5;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">Skills-Stunde · Aula</span><b>Namen-Rekord</b></div>' +
      '<p class="sz-info">Erst zeigt jeder eine Geste. Dann fliegt der Ball. Du rufst den Namen. Jede Runde schneller.</p>' +
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
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Skills-Stunde · Aula') + '</span><b>Zwei Wahrheiten, eine Lüge</b></div>' +
      '<p class="sz-info">Ein Kennenlern-Spiel. Lügen sieht man schwer. Rate einfach.</p><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
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
    const k = ui.ebeneAuf('szene', '<div class="sz sz-lotsen"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Hof') + ' · Blind-Parcours</span><b>Lotsen</b></div>' +
      '<p class="sz-info">' + esc(P.name) + ' hat die Augen verbunden. Lotse ' + (P.weib ? 'sie' : 'ihn') + ' mit Ansagen bis ins Tor. Zu hektisch? Dann bleibt ' + esc(P.name) + ' stehen.</p>' +
      '<canvas width="520" height="300"></canvas><div class="sz-balken sz-vertrauen"><div class="sz-balken-f"></div><span>Vertrauen</span></div>' +
      '<div class="sz-steuer ly-d-optionen"><button type="button" data-k="l">⬅ Links</button><button type="button" data-k="g">⬆ Geradeaus</button><button type="button" data-k="r">Rechts ➡</button><button type="button" data-k="s">✋ Stopp</button></div><div class="sz-stand"></div></div>');
    const cv = k.querySelector('canvas'), x = cv.getContext('2d'), fill = k.querySelector('.sz-vertrauen .sz-balken-f'), stand = k.querySelector('.sz-stand');
    const HUET = [[150, 90], [170, 210], [260, 140], [300, 60], [330, 240], [390, 160], [220, 270], [240, 30]];
    let px = 40, py = 150, ri = 0, laeuft = false, vertrauen = 70, stoesse = 0, stopps = 0, hektik = 0, fertig = false, sagt = '', sT = 0;
    // „Stopp gilt sofort“ (def.stoppMoment): einmal sagt die geführte Person selbst Stopp. Wer dann weiter Ansagen macht, übergeht sie.
    let stoppBis = 0, stoppDa = false, stoppAus = false, stoppIgnoriert = 0, stoppGewartet = false, spielT = 0;
    cv.__st = () => ({ px, py, ri, laeuft, fertig, stoppAktiv: !!stoppBis && performance.now() < stoppBis });   // nur für Tests
    const ansagen = []; let last = performance.now();
    const tor = { x: 488, y: 150, r: 34 }, halle = /Turnhalle/.test(def.wo || '');   // Hallenboden statt Rasen
    const zeige = () => { fill.style.width = Math.max(3, vertrauen) + '%'; fill.style.background = vertrauen > 55 ? '#5fb07a' : vertrauen > 30 ? '#e9a23b' : '#d6452f'; };
    const sprech = (t) => { sagt = t; sT = 1.6; };
    const befehl = (b) => {
      if (fertig) return;
      if (stoppBis && performance.now() < stoppBis && b !== 's') { stoppIgnoriert++; vertrauen -= 14; laeuft = false; sprech('Ich hab Stopp gesagt!'); stand.classList.add('sz-stopp'); zeige(); return; }
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
      setTimeout(() => { loesche(); ui.ebeneZu(); ok({ vertrauen: Math.max(0, Math.round(vertrauen)), angekommen, zusammenstoesse: stoesse, stopps, hektik, stoppIgnoriert, stoppGewartet }); }, 1500);
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
      if (def.stoppMoment && !stoppDa && !fertig && laeuft && spielT > 8) { stoppDa = true; laeuft = false; stoppBis = now + 3200; sprech('Stopp. Kurz warten. Mein Tuch rutscht.'); }
      if (stoppBis && !stoppAus && now >= stoppBis) { stoppAus = true; stand.classList.remove('sz-stopp'); if (!stoppIgnoriert) { stoppGewartet = true; vertrauen = Math.min(100, vertrauen + 8); sprech('Okay. Danke fürs Warten. Weiter.'); } else sprech('… Okay. Weiter.'); zeige(); }
      if (!fertig) spielT += dt;
      if (!fertig && spielT > 75 * zeitFaktor()) { sprech('Ich nehm die Augenbinde ab, okay?'); schluss(false); }
      if (!fertig && vertrauen <= 0) { sprech('Ich mach nicht mehr mit. Sorry.'); schluss(false); }
      x.fillStyle = halle ? '#d9b47c' : '#7fb36a'; x.fillRect(0, 0, 520, 300);
      if (halle) { x.strokeStyle = 'rgba(255,255,255,.7)'; x.lineWidth = 2; x.beginPath(); x.moveTo(260, 0); x.lineTo(260, 300); x.stroke(); x.beginPath(); x.arc(260, 150, 44, 0, 7); x.stroke(); }
      x.fillStyle = '#ffffff'; x.fillRect(tor.x + 10, tor.y - 40, 8, 80); x.strokeStyle = '#ffffff'; x.lineWidth = 3; x.strokeRect(tor.x - 6, tor.y - 40, 24, 80);
      for (const [hx, hy] of HUET) { x.fillStyle = '#e9734a'; x.beginPath(); x.moveTo(hx, hy - 14); x.lineTo(hx - 11, hy + 10); x.lineTo(hx + 11, hy + 10); x.closePath(); x.fill(); x.fillStyle = '#fff'; x.fillRect(hx - 7, hy - 2, 14, 3); }
      x.save(); x.translate(px, py); x.rotate(ri);
      x.fillStyle = P.farbe; x.beginPath(); x.arc(0, 0, 13, 0, 7); x.fill(); x.fillStyle = '#1b1d26'; x.fillRect(-4, -11, 8, 22);   // Augenbinde
      x.fillStyle = '#fff'; x.beginPath(); x.moveTo(17, 0); x.lineTo(9, -5); x.lineTo(9, 5); x.fill(); x.restore();
      if (sT > 0) { sT -= dt; x.fillStyle = 'rgba(255,255,255,.92)'; x.font = 'bold 15px system-ui'; const w = x.measureText(sagt).width + 16; const bx = Math.min(520 - w - 4, Math.max(4, px - w / 2)); x.fillRect(bx, py - 48, w, 24); x.fillStyle = '#1b1d26'; x.fillText(sagt, bx + 8, py - 31); }
      stand.textContent = stoppBis && now < stoppBis ? '✋ ' + P.name + ' hat Stopp gesagt. Warte.' : 'Zusammenstöße: ' + stoesse + ' · Ansagen ruhig halten';
      if (!fertig || sT > 0) requestAnimationFrame(draw);
    };
    zeige(); sprech('Ich seh nix. Gar nix. Okay. Los.'); requestAnimationFrame(draw);
  });

  // ---------- Geführt werden (Sport, Kapitel 1: „Wer führt, trägt“) ----------
  // Du siehst nichts. Die andere Person sagt an, du drehst, gehst, hältst an. Einmal ruft eine fremde Stimme dazwischen,
  // einmal rollt ein Ball. Stopp gilt sofort – auch deins. Am Ende siehst du deinen Weg.
  // def: { partner: { id, name, farbe }, stoerer: { name }, wo } → { angekommen, stoesse, eigeneStopps, nachgefragt, joErkannt, fremdGefolgt, ballGestoppt, ballGetroffen, zeit, bild }
  ui.gefuehrt = (def) => new Promise((ok) => {
    const P = def.partner, J = def.stoerer || { name: 'Jemand' };
    const k = ui.ebeneAuf('szene', '<div class="sz sz-dunkel"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Turnhalle') + ' · Augen zu</span><b>Geführt werden</b></div>' +
      '<p class="sz-info">Du siehst nichts. ' + esc(P.name) + ' sagt dir, wohin. Zu schnell oder unsicher? ✋ Stopp – das gilt sofort. Nicht sicher, wer gerade spricht? ❓ Nachfragen.</p>' +
      '<canvas width="520" height="300"></canvas><div class="sz-stimme" aria-live="polite"></div>' +
      '<div class="sz-steuer sz-steuer5 ly-d-optionen"><button type="button" data-k="l">⬅ Links</button><button type="button" data-k="g">⬆ Gehen</button><button type="button" data-k="r">Rechts ➡</button><button type="button" data-k="s">✋ Stopp</button><button type="button" data-k="f">❓ Nachfragen</button></div><div class="sz-stand"></div></div>');
    const cv = k.querySelector('canvas'), x = cv.getContext('2d'), stimme = k.querySelector('.sz-stimme'), stand = k.querySelector('.sz-stand'), steuer = k.querySelector('.sz-steuer');
    const HUET = [[110, 70], [250, 40], [230, 222], [120, 232], [420, 100], [420, 200], [330, 262], [470, 262]];
    const BANK = { x0: 160, x1: 280, y0: 134, y1: 166 };
    const WEG = [[120, 150], [190, 80], [300, 80], [370, 150], [496, 150]];
    const norm = (a) => Math.atan2(Math.sin(a), Math.cos(a));
    const stoesst = (nx, ny) => HUET.some(([hx, hy]) => Math.hypot(nx - hx, ny - hy) < 18) || (nx > BANK.x0 - 9 && nx < BANK.x1 + 9 && ny > BANK.y0 - 9 && ny < BANK.y1 + 9) || ny < 12 || ny > 288 || nx < 12;
    let px = 40, py = 150, ri = 0, laeuft = false, wi = 0, fertig = false, stoesse = 0, eigeneStopps = 0, nachgefragt = 0, fremdGefolgt = 0, joErkannt = false;
    let ballGestoppt = false, ballGetroffen = false, cd = 2.2, still = 0, erwartet = '', letzte = '', jo = 0, ball = 0, ballT = 0, puls = 72, phase = 0;
    const spur = [[px, py]], treffer = [];
    let last = performance.now(), spurT = 0, spielT = 0;   // spielT: Spielzeit (langsame Geräte bekommen nicht weniger Zeit)
    const t0 = last;
    cv.__st = () => ({ px, py, ri, laeuft, wi, fertig, erwartet, jo, ball });   // nur für Tests
    const sag = (wer, t, art) => {   // wer: 'p' (Partner), 'x' (fremde Stimme), 'g' (Geräusch)
      stimme.dataset.wer = wer; stimme.dataset.ansage = art || ''; stimme.dataset.n = (+stimme.dataset.n || 0) + 1; stimme.className = 'sz-stimme sz-st-' + wer;
      stimme.innerHTML = wer === 'p' ? '<b style="color:' + P.farbe + '">' + esc(P.name) + '</b> ' + esc(t) : wer === 'x' ? '<b>Eine Stimme von rechts</b> ' + esc(t) : '<i>' + esc(t) + '</i>';
      if (wer === 'p') { letzte = t; erwartet = art || ''; }
    };
    const schritt = () => { const [wx, wy] = WEG[wi]; return { d: Math.hypot(wx - px, wy - py), soll: Math.atan2(wy - py, wx - px) }; };
    const vorne = (dist) => { for (let s = 8; s <= dist; s += 6) if (stoesst(px + Math.cos(ri) * s, py + Math.sin(ri) * s)) return true; return false; };
    const partner = () => {   // ruhig, eine Ansage nach der anderen
      let { d, soll } = schritt();
      if (d < 22 && wi < WEG.length - 1) { wi++; ({ d, soll } = schritt()); }
      const diff = norm(soll - ri);
      if (laeuft) {
        const naechste = wi < WEG.length - 1 && d < 24 && Math.abs(norm(Math.atan2(WEG[wi + 1][1] - WEG[wi][1], WEG[wi + 1][0] - WEG[wi][0]) - ri)) > 0.4;
        if (vorne(48) || Math.abs(diff) > 0.5 || naechste) { sag('p', erwartet === 's' ? 'STOPP!' : 'Stopp.', 's'); cd = erwartet === 's' ? 0.8 : 1.0; }
        return;
      }
      if (Math.abs(diff) > 0.42) {
        // Die fremde Stimme: an der dritten Ecke, genau wenn eine Drehung kommt
        if (wi === 3 && jo === 0) { jo = 1; still = 2.0; sag('x', 'Links! Jetzt links, schnell!'); return; }
        sag('p', diff < 0 ? 'Links.' : 'Rechts.', diff < 0 ? 'l' : 'r'); cd = 1.3; return;
      }
      sag('p', wi === WEG.length - 1 ? 'Geradeaus. Bis zur Matte.' : 'Geradeaus. Geh.', 'g'); cd = 1.5;
    };
    const befehl = (b) => {
      if (fertig) return;
      if (b === 'f') {   // nachfragen
        nachgefragt++;
        if (jo === 1) { joErkannt = true; jo = 2; still = 0.9; sag('p', 'Das war ' + J.name + '. Hör nur auf mich.'); cd = 0.9; return; }
        sag('p', letzte ? 'Nochmal: ' + letzte.replace(/^Nochmal: /, '') : 'Ich bin hier. Hinter dir.', erwartet); cd = 1.2; return;
      }
      if (b === 's') {
        if (!laeuft) return;
        laeuft = false;
        if (ball === 1) { ballGestoppt = true; ball = 2; sag('p', 'Gut, dass du stehst. Da war ein Ball. Jetzt ist er weg.'); cd = 1.6; return; }
        if (erwartet === 's') { erwartet = ''; cd = 0.7; return; }
        eigeneStopps++; still = 2.2; sag('p', 'Okay. Ich warte. Sag, wenn’s weitergeht.'); return;
      }
      if (jo === 1 && b === 'l') { fremdGefolgt++; jo = 2; ri -= Math.PI / 4; still = 0.6; setTimeout(() => sag('p', 'Nicht links! Das war nicht ich. Das war ' + J.name + '.'), 450); cd = 1.6; return; }
      if (b === 'g') { laeuft = true; if (erwartet === 'g') erwartet = ''; return; }
      ri += (b === 'l' ? -1 : 1) * Math.PI / 4; if (erwartet === b) { erwartet = ''; cd = Math.min(cd, 0.9); }
    };
    steuer.querySelectorAll('[data-k]').forEach((b) => { b.onclick = () => befehl(b.dataset.k); });
    halte((e) => { const m = { ArrowLeft: 'l', KeyA: 'l', ArrowUp: 'g', KeyW: 'g', ArrowRight: 'r', KeyD: 'r', Space: 's', KeyS: 's', ArrowDown: 's', KeyQ: 'f', KeyE: 'g' }[e.code]; if (m) { e.preventDefault(); e.stopPropagation(); befehl(m); } });
    const zeigeWeg = () => {   // Tuch ab: die Halle von oben, dein Weg
      x.fillStyle = '#d8b27a'; x.fillRect(0, 0, 520, 300);
      x.strokeStyle = 'rgba(255,255,255,.75)'; x.lineWidth = 2; x.strokeRect(8, 8, 504, 284); x.beginPath(); x.arc(260, 150, 46, 0, 7); x.stroke(); x.beginPath(); x.moveTo(260, 8); x.lineTo(260, 292); x.stroke();
      x.fillStyle = '#7a5532'; x.fillRect(BANK.x0, BANK.y0, BANK.x1 - BANK.x0, BANK.y1 - BANK.y0);
      x.fillStyle = '#3c78c8'; x.fillRect(470, 104, 44, 92);
      for (const [hx, hy] of HUET) { x.fillStyle = '#e9734a'; x.beginPath(); x.moveTo(hx, hy - 12); x.lineTo(hx - 9, hy + 8); x.lineTo(hx + 9, hy + 8); x.closePath(); x.fill(); }
      x.strokeStyle = P.farbe; x.lineWidth = 4; x.lineJoin = 'round'; x.setLineDash([9, 6]); x.beginPath(); spur.forEach(([a, b2], i) => (i ? x.lineTo(a, b2) : x.moveTo(a, b2))); x.stroke(); x.setLineDash([]);
      for (const [a, b2] of treffer) { x.strokeStyle = '#d6452f'; x.lineWidth = 4; x.beginPath(); x.moveTo(a - 7, b2 - 7); x.lineTo(a + 7, b2 + 7); x.moveTo(a + 7, b2 - 7); x.lineTo(a - 7, b2 + 7); x.stroke(); }
      x.fillStyle = '#1b1d26'; x.beginPath(); x.arc(spur[0][0], spur[0][1], 6, 0, 7); x.fill();
      x.fillStyle = 'rgba(27,29,38,.82)'; x.fillRect(0, 0, 520, 30); x.fillStyle = '#fff'; x.font = 'bold 15px system-ui'; x.fillText('Tuch ab. So bist du gelaufen.', 12, 20);
    };
    const schluss = (angekommen) => {
      if (fertig) return; fertig = true; laeuft = false;
      setTimeout(() => {
        zeigeWeg(); let bild = ''; try { bild = cv.toDataURL('image/jpeg', 0.82); } catch (e) { /* egal */ }
        k.querySelector('.sz').classList.remove('sz-dunkel');
        stand.textContent = (angekommen ? 'Angekommen. ' : 'Nicht ganz angekommen. ') + 'Zusammenstöße: ' + stoesse + (eigeneStopps ? ' · Du hast ' + eigeneStopps + '× selbst Stopp gesagt.' : '');
        steuer.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>'; steuer.classList.remove('sz-steuer', 'sz-steuer5');
        const zu = () => { loesche(); ui.ebeneZu(); ok({ angekommen, stoesse, eigeneStopps, nachgefragt, joErkannt, fremdGefolgt, ballGestoppt, ballGetroffen, zeit: Math.round((performance.now() - t0) / 1000), bild }); };
        steuer.querySelector('[data-a="w"]').onclick = zu;
        loesche(); halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
      }, 1400);
    };
    const draw = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      if (!fertig) {
        if (still > 0) { still -= dt; if (still <= 0 && jo === 1) { jo = 2; sag('p', 'Das eben war nicht ich. Nur ich sag an.'); cd = 1.2; } }
        else if (cd > 0) cd -= dt; else partner();
        if (laeuft) {
          const nx = px + Math.cos(ri) * 38 * dt, ny = py + Math.sin(ri) * 38 * dt;
          if (stoesst(nx, ny)) { laeuft = false; stoesse++; treffer.push([px, py]); puls = 128; sag('p', 'Sorry! Mein Fehler. Alles okay?'); erwartet = ''; cd = 1.4; px -= Math.cos(ri) * 6; py -= Math.sin(ri) * 6; }
          else { px = nx; py = ny; }
          spurT += dt; if (spurT > 0.2) { spurT = 0; spur.push([px, py]); }
          if (wi === 2 && ball === 0 && px > 214) { ball = 1; ballT = 1.7; still = 1.7; sag('g', 'Ein Ball rollt. Ganz nah. ' + P.name + ': „Warte –“'); }
          if (px >= 468 && Math.abs(py - 150) < 48) { spur.push([px, py]); sag('p', 'Matte. Du bist da. Tuch ab.'); schluss(true); }
        }
        if (ball === 1) { ballT -= dt; if (ballT <= 0) { ball = 2; if (laeuft) { ballGetroffen = true; puls = 118; sag('g', 'Der Ball tippt an deinen Fuß. Du zuckst. Nichts passiert.'); } } }
        spielT += dt; if (spielT > 110 * zeitFaktor()) { sag('p', 'Wir hören hier auf. Du kannst das Tuch abnehmen.'); schluss(false); }
      }
      if (!fertig) {
        // Augen zu: fast schwarz. Nur dein Puls, deine Schritte und die Stimmen.
        puls += ((laeuft ? 92 : 74) - puls) * dt * 0.6; phase += dt * puls / 60 * Math.PI * 2;
        x.fillStyle = '#07080c'; x.fillRect(0, 0, 520, 300);
        const g = x.createRadialGradient(260, 150, 10, 260, 150, 260); g.addColorStop(0, 'rgba(70,24,30,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 520, 300);
        const sch = Math.max(0, Math.sin(phase)) ** 6; x.strokeStyle = 'rgba(214,69,47,' + (0.18 + sch * 0.5) + ')'; x.lineWidth = 3; x.beginPath(); x.arc(260, 150, 34 + sch * 14, 0, 7); x.stroke();
        if (laeuft) { const f = Math.floor(now / 380) % 2; x.fillStyle = 'rgba(255,255,255,.22)'; x.beginPath(); x.ellipse(248 + f * 24, 258 - f * 10, 7, 11, 0, 0, 7); x.fill(); }
        const st = stimme.dataset.wer, links = st === 'g', rechts = st === 'x';
        if (st) { x.fillStyle = rechts ? 'rgba(200,200,210,.28)' : links ? 'rgba(160,190,255,.2)' : 'rgba(255,255,255,.12)'; x.beginPath(); x.arc(rechts ? 470 : links ? 50 : 260, rechts || links ? 150 : 268, 26 + Math.sin(now / 90) * 3, 0, 7); x.fill(); }
        x.fillStyle = 'rgba(255,255,255,.55)'; x.font = '13px system-ui'; x.fillText(laeuft ? 'Du gehst …' : 'Du stehst.', 14, 22);
        stand.textContent = 'Zusammenstöße: ' + stoesse;
      }
      if (!fertig) requestAnimationFrame(draw);
    };
    sag('p', 'Ich bin hinter dir. Ich sag an. Erst mal stehen bleiben.'); requestAnimationFrame(draw);
  });

  // ---------- Tank-Raten (Kurs E04: Glas der Bedürfnisse, Warnlicht-Raten) ----------
  // Die sechs Tanks aus dem Kurs. def: { faelle: [ { wer: { id, name, farbe }, szene, zeichen: [..], tank, tankstellen: [ { t, passt, antwort } ], falsch } ] }
  // → { richtig: [ids], geholfen: [ids] }
  const TANKS = [['koerper', 'Körper', '🍎'], ['sicherheit', 'Sicherheit', '🛡️'], ['dazu', 'Dazugehören', '🤝'], ['ernst', 'Ernst genommen werden', '👂'], ['selbst', 'Selbst entscheiden', '🧭'], ['spass', 'Spaß und Neues', '🎉']];
  ui.TANKS = TANKS;
  ui.tankRaten = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Skills-Stunde') + '</span><b>Warnlicht: Welcher Tank ist leer?</b></div>' +
      '<div class="sz-bühne"></div><div class="sz-warn-tanks">' + TANKS.map(([id, n, sy]) => '<div data-t="' + id + '"><span><i></i></span><b>' + sy + '</b></div>').join('') + '</div><div class="sz-karten sz-raster ly-d-optionen"></div><div class="sz-stand"></div></div>');
    const bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten'), stand = k.querySelector('.sz-stand');
    const richtig = [], geholfen = [];
    const tank = (id, voll, farbe, blink) => { const el = k.querySelector('.sz-warn-tanks [data-t="' + id + '"]'); if (!el) return; el.querySelector('i').style.height = voll + '%'; el.querySelector('i').style.background = farbe; el.classList.toggle('blink', !!blink); };
    const tanksReset = () => TANKS.forEach(([id]) => tank(id, 60, '#c9d2de', false));
    const wahl = (html, n) => new Promise((fertig) => { karten.innerHTML = html; let aus = false; const ende = (j) => { if (aus) return; aus = true; loesche(); fertig(j); };
      karten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
      halte((e) => { const m = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Digit5: 4, Digit6: 5 }[e.code]; if (m != null && m < n) { e.preventDefault(); e.stopPropagation(); ende(m); } else if (e.code === 'KeyE') { e.preventDefault(); e.stopPropagation(); ende(0); } }); });
    (async () => {
      for (const f of def.faelle) {
        bühne.innerHTML = '<div class="sz-fall" style="--f:' + f.wer.farbe + '"><b>' + esc(f.wer.name) + '</b><p>' + esc(ersetze(f.szene)) + '</p>' + f.zeichen.map((z) => '<em>' + esc(z) + '</em>').join('') + '</div>';
        tanksReset(); stand.textContent = 'Welcher Tank blinkt bei ' + f.wer.name + '?';
        const i = await wahl(TANKS.map(([id, n, sy], j) => '<button type="button" data-i="' + j + '"><span>' + sy + ' ' + esc(n) + '</span></button>').join(''), 6);
        const treffer = TANKS[i] && TANKS[i][0] === f.tank;
        if (treffer) richtig.push(f.wer.id); else if (TANKS[i]) tank(TANKS[i][0], 85, '#3fa66b', false);
        tank(f.tank, 12, '#d6452f', true); pop(k, treffer ? '🎯' : '🤔');
        bühne.insertAdjacentHTML('beforeend', '<div class="sz-sys">' + (treffer ? 'Ja. ' + TANKS.find((t) => t[0] === f.tank)[1] + ' ist leer.' : esc(ersetze(f.falsch || 'Hm. Eher nicht.'))) + '</div>');
        await warte(900);
        stand.textContent = 'Was würde ' + f.wer.name + ' in zehn Minuten helfen?';
        const j = await wahl(f.tankstellen.map((t, m) => '<button type="button" data-i="' + m + '"><span>' + esc(ersetze(t.t)) + '</span></button>').join(''), f.tankstellen.length);
        const t = f.tankstellen[j] || f.tankstellen[0];
        if (t.passt) { geholfen.push(f.wer.id); tank(f.tank, 90, '#3fa66b', false); pop(k, '⛽'); } else { tank(f.tank, 25, '#e9a23b', false); pop(k, '😕'); }
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
      for (const a0 of def.an) {
        const a = { ...a0, karten: a0.karten.slice().sort(() => Math.random() - 0.5) };   // die genaue Karte steht nicht immer oben
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
    let offen = def.startOffen || 0, z = 0, schnell = 0; const arten = {};
    const zeige = () => { fill.style.width = Math.max(4, Math.min(100, offen * 20)) + '%'; fill.style.background = '#5fa0d0'; zeilen.textContent = z; };
    const blase = (wer, text, farbe, ich) => { bühne.insertAdjacentHTML('beforeend', '<div class="sz-blase' + (ich ? ' ich' : '') + '" style="--f:' + farbe + '"><b>' + esc(wer) + '</b>' + esc(ersetze(text)) + '</div>'); while (bühne.children.length > 4) bühne.firstChild.remove(); };
    (async () => {
      zeige(); blase(W.name, def.start, W.farbe); await warte(700);
      for (const r of def.runden) {
        const opt = typeof r.fragen === 'function' ? r.fragen(offen) : r.fragen, t0 = performance.now();
        const i = await new Promise((fertig) => {
          karten.innerHTML = opt.map((f, j) => '<button type="button" data-i="' + j + '"><span>' + esc(ersetze(f.t)) + '</span></button>').join('');
          let aus = false; const ende = (j) => { if (aus) return; aus = true; loesche(); fertig(j); };
          karten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
          halte((e) => { const m = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3 }[e.code]; if (m != null && m < opt.length) { e.preventDefault(); e.stopPropagation(); ende(m); } else if (e.code === 'KeyE') { e.preventDefault(); e.stopPropagation(); ende(0); } });
        });
        const f = opt[i]; arten[f.art] = (arten[f.art] || 0) + 1;
        if (performance.now() - t0 < Math.max(1000, opt.map((x) => ersetze(x.t)).join(' ').split(/\s+/).length * 60)) schnell++;   // Fragen nicht gelesen
        karten.innerHTML = '';
        blase('Du', f.t, '#2b3a55', true); await warte(600);
        offen = Math.max(0, offen + (f.offen || 0)); if ((f.offen || 0) > 0) z += f.offen; zeige();
        blase(W.name, typeof f.antwort === 'function' ? f.antwort(offen) : f.antwort, W.farbe); await warte(1500);
      }
      karten.innerHTML = '<div class="sz-sys">' + esc((def.stufen || [])[Math.min((def.stufen || []).length - 1, offen)] || '') + '</div><button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      const zu = () => { loesche(); ui.ebeneZu(); ok({ offen, arten, zeilen: z, schnell, runden: def.runden.length }); };
      karten.querySelector('[data-a="w"]').onclick = zu;
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
    })();
  });

  // ---------- Werkzeug-Karte (Gesamtkonzept: Theorie in 20 Sekunden, für die Hosentasche) ----------
  // def: { von, titel, text, zeilen: [[symbol, name, info]], fuss } → {}
  ui.werkzeugKarte = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz sz-werkzeug"><div class="sz-kopf"><span class="sz-wo">' + esc(def.von || 'Werkzeug') + '</span><b>🃏 ' + esc(def.titel) + '</b></div>' +
      (def.text ? '<p class="sz-info">' + esc(ersetze(def.text)) + '</p>' : '') +
      '<div class="sz-wz-zeilen">' + (def.zeilen || []).map(([sy, n, info]) => '<div><b>' + sy + '</b><span><strong>' + esc(n) + '</strong> ' + esc(info) + '</span></div>').join('') + '</div>' +
      (def.fuss ? '<p class="sz-wz-fuss">' + esc(ersetze(def.fuss)) + '</p>' : '') +
      '<div class="sz-karten"><button type="button" class="sz-weiter" data-a="w">Einstecken <kbd>E</kbd></button></div></div>');
    const zu = () => { loesche(); ui.ebeneZu(); ok({}); };
    k.querySelector('[data-a="w"]').onclick = zu;
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
  });

  // ---------- Werkbank (Atelier, Gesamtkonzept K2): anzeichnen, sägen im Takt, schrauben. Zweimal messen, einmal sägen. ----------
  // Wer hetzt, sägt schief. Ein falsches Maß kann man vor dem Sägen noch stoppen („Moment. Auf dem Plan steht …“).
  // def: { wo, soll (cm laut Plan), start (angesagtes Maß), wer (wer anzeichnet: Name oder 'du'), hetzen: { wer, ab } }
  // → { mass, massOk, korrigiert, takt (gute Züge von 10), schrauben (gute von 4), gerade }
  ui.werkbank = (def) => new Promise((ok) => {
    const SOLL = def.soll || 42, CM0 = 30, PX = 8.4;
    const k = ui.ebeneAuf('szene', '<div class="sz sz-werkbank"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Werkstatt') + '</span><b>🪚 Werkbank</b></div>' +
      '<p class="sz-info sz-wb-schritt"></p><div class="sz-wb-plan">📐 Plan: Bein <b>' + SOLL + ' cm</b></div><canvas class="sz-wb-brett" width="560" height="180"></canvas>' +
      '<div class="sz-wb-leiste"></div><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div><div class="sz-stand"></div></div>');
    const cv = k.querySelector('canvas'), x = cv.getContext('2d'), info = k.querySelector('.sz-wb-schritt'), leiste = k.querySelector('.sz-wb-leiste'),
      karten = k.querySelector('.sz-karten'), stand = k.querySelector('.sz-stand'), bühne = k.querySelector('.sz-bühne');
    let mass = def.wer === 'du' ? 36 : def.start || SOLL, korrigiert = false, schnitt = [], schrauben = [];
    const sag = (wer, t, farbe) => { bühne.innerHTML = '<div class="sz-blase" style="--f:' + (farbe || '#4f6170') + '"><b>' + esc(wer) + '</b>' + esc(ersetze(t)) + '</div>'; };
    const zeichne = () => {
      x.clearRect(0, 0, 560, 180);
      x.fillStyle = '#d9b07a'; x.fillRect(CM0, 62, 60 * PX, 66); x.strokeStyle = 'rgba(140,100,60,.45)'; x.lineWidth = 1;
      for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(CM0, 70 + i * 10); x.bezierCurveTo(CM0 + 160, 66 + i * 10, CM0 + 330, 76 + i * 10, CM0 + 60 * PX, 69 + i * 10); x.stroke(); }
      x.fillStyle = '#f2d23c'; x.fillRect(CM0, 24, 60 * PX, 26); x.fillStyle = '#2b2b33'; x.font = '11px system-ui'; x.textAlign = 'center';
      for (let c = 0; c <= 60; c++) { const px = CM0 + c * PX, lang = c % 10 === 0 ? 14 : c % 5 === 0 ? 10 : 5; x.fillRect(px - 0.5, 24, 1, lang); if (c % 10 === 0) x.fillText(String(c), px, 47); }
      const px = CM0 + mass * PX;
      x.strokeStyle = '#2b3a55'; x.lineWidth = 2; x.setLineDash([5, 4]); x.beginPath(); x.moveTo(px, 54); x.lineTo(px, 134); x.stroke(); x.setLineDash([]);
      x.fillStyle = '#2b3a55'; x.font = 'bold 13px system-ui'; x.fillText((Math.round(mass * 2) / 2).toString().replace('.', ',') + ' cm', px, 152);
      if (schnitt.length) {
        x.strokeStyle = '#4a2c14'; x.lineWidth = 3; x.beginPath(); let dx = 0;
        schnitt.forEach((d, i) => { dx += d; const yy = 62 + ((i + 1) / 10) * 66; if (!i) x.moveTo(px, 62); x.lineTo(px + dx, yy); }); x.stroke();
      }
      schrauben.forEach((g, i) => { const sx = CM0 + 6 * PX + i * 13 * PX, sy = 95; x.fillStyle = g === 'gut' ? '#3fa66b' : g === 'locker' ? '#e9a23b' : '#d6452f'; x.beginPath(); x.arc(sx, sy, 6, 0, 7); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(sx - 4, sy); x.lineTo(sx + 4, sy); x.stroke(); });
    };
    const knopf = (html) => new Promise((fertig) => {
      karten.innerHTML = html; let aus = false; const ende = (a) => { if (aus) return; aus = true; loesche(); karten.innerHTML = ''; fertig(a); };
      karten.querySelectorAll('[data-a]').forEach((b) => { b.onclick = () => ende(b.dataset.a); });
      halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); const b = karten.querySelector('[data-a]'); if (b) ende(b.dataset.a); } });
    });
    (async () => {
      zeichne();
      // 1 · Anzeichnen
      if (def.wer === 'du') {
        info.textContent = '1 · Anzeichnen. Schieb den Strich auf das Maß vom Plan.';
        leiste.innerHTML = '<button type="button" class="sz-wb-fein" data-d="-0.5">−</button><input type="range" min="20" max="55" step="0.5" value="' + mass + '" aria-label="Maß in Zentimetern"><button type="button" class="sz-wb-fein" data-d="0.5">+</button>';
        const r = leiste.querySelector('input'); r.addEventListener('keydown', (e) => e.stopPropagation());
        r.oninput = () => { mass = +r.value; zeichne(); };
        leiste.querySelectorAll('[data-d]').forEach((b) => { b.onclick = () => { mass = Math.max(20, Math.min(55, mass + +b.dataset.d)); r.value = mass; zeichne(); }; });
        for (let mal = 1; ; mal++) {
          const a = await knopf('<button type="button" class="sz-weiter" data-a="fertig">Angezeichnet <kbd>E</kbd></button>' + (mal === 1 ? '<button type="button" data-a="nochmal"><span>Noch mal messen</span></button>' : ''));
          if (a !== 'nochmal') break;
          stand.textContent = Math.abs(mass - SOLL) < 0.26 ? 'Gemessen: passt genau.' : 'Gemessen: ' + String(mass).replace('.', ',') + ' cm. Auf dem Plan stehen ' + SOLL + '.';
        }
        leiste.innerHTML = ''; stand.textContent = '';
      } else {
        info.textContent = '1 · Anzeichnen. ' + (def.wer || 'Jemand') + ' zeichnet an.';
        sag(def.wer || 'Jo', mass === SOLL ? 'Zweiundvierzig. Strich. Fertig.' : String(mass) + '. Passt. Säg los.', def.farbe);
        const a = await knopf('<button type="button" class="sz-weiter" data-a="weiter">Sägen <kbd>E</kbd></button>' + (mass !== SOLL ? '<button type="button" data-a="stopp"><span>„Moment. Auf dem Plan steht ' + SOLL + '.“</span></button>' : ''));
        if (a === 'stopp') { korrigiert = true; mass = SOLL; zeichne(); sag(def.wer || 'Jo', '(schaut auf den Plan) … Okay. ' + SOLL + '. Dann eben ' + SOLL + '.', def.farbe); await warte(1600); }
      }
      bühne.innerHTML = '';
      // 2 · Sägen im Takt
      info.textContent = '2 · Sägen. Ein Zug, wenn der Kreis aufleuchtet. Nicht hetzen.';
      leiste.innerHTML = '<div class="sz-wb-takt"><i></i></div><button type="button" class="sz-wb-saege">🪚 Zug <kbd>Leertaste</kbd></button>';
      const takt = leiste.querySelector('.sz-wb-takt i'), saege = leiste.querySelector('.sz-wb-saege');
      let gut = 0;
      await new Promise((fertig) => {
        const N = 10, t0 = performance.now() + 900, schlaege = []; let tb = t0, aus = false;
        for (let i = 0; i < N; i++) { const iv = def.hetzen && i >= (def.hetzen.ab || 5) ? 540 : 820; schlaege.push(tb); tb += iv; }
        const getroffen = new Array(N).fill(null);
        // Gewertet wird der Moment des Tippens (Zeitstempel des Ereignisses), nicht wann das iPad dazu kommt, es zu verarbeiten
        const zug = (e) => {
          if (aus) return; const jetzt = performance.now(), t = e && e.timeStamp > 0 && jetzt - e.timeStamp >= 0 && jetzt - e.timeStamp < 500 ? e.timeStamp : jetzt;
          let j = -1, best = 1e9; schlaege.forEach((s, i) => { if (getroffen[i] == null && Math.abs(t - s) < best) { best = Math.abs(t - s); j = i; } });
          if (j < 0 || best > 420) return;
          getroffen[j] = best < 150 ? 0 : best < 290 ? (j % 2 ? -2 : 2) : (j % 2 ? -6 : 6);
          if (best < 150) gut++;
          saege.classList.remove('zug'); void saege.offsetWidth; saege.classList.add('zug');
          schnitt = getroffen.filter((v) => v != null); zeichne();
        };
        // Touch: schon beim Aufsetzen des Fingers (ein Klick kommt erst beim Loslassen, also zu spät für den Takt)
        let perFinger = 0;
        saege.onpointerdown = (e) => { if (e.pointerType === 'mouse' && e.button) return; e.preventDefault(); perFinger = performance.now(); zug(e); };
        saege.onclick = (e) => { if (performance.now() - perFinger < 600) return; zug(e); };
        halte((e) => { if (e.code === 'Space' || e.code === 'KeyE') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) zug(e); } });
        ui.taktRuhe = true;   // die 3D-Welt hinter dem Fenster ruht, solange im Takt gesägt wird (gleichmäßige Bilder auf dem iPad)
        let gehetzt = false;
        const tick = () => {
          if (aus) return; const t = performance.now();
          const nah = schlaege.some((s) => Math.abs(t - s) < 110);
          takt.classList.toggle('an', nah);
          if (def.hetzen && !gehetzt && t > schlaege[def.hetzen.ab || 5] - 900) { gehetzt = true; sag(def.hetzen.wer || 'Jo', 'Schneller! Die anderen sind schon beim Schrauben.', def.hetzen.farbe); }
          if (t > schlaege[N - 1] + 450) { aus = true; ui.taktRuhe = false; loesche(); schlaege.forEach((s, i) => { if (getroffen[i] == null) getroffen[i] = i % 2 ? -3 : 3; });
            // Bild passend zur Wertung: gerade = kleine Zacken, die sich ausgleichen; sonst läuft der Schnitt zu einer Seite weg
            schnitt = gut >= 6 ? getroffen.map((v, i) => (v ? (i % 2 ? -1 : 1) * Math.min(Math.abs(v), 2) : 0)) : getroffen.map((v) => Math.abs(v)); zeichne(); fertig(); return; }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      leiste.innerHTML = ''; bühne.innerHTML = '';
      // Fair (Test 26.11.): Ob der Schnitt gerade ist, hängt nur an den sauberen Zügen – nicht am Zufall der Abweichungen
      const schnittGerade = gut >= 6;
      stand.textContent = schnittGerade ? 'Der Schnitt ist gerade.' : gut >= 3 ? 'Der Schnitt läuft ein bisschen.' : 'Der Schnitt ist schief.';
      await warte(1200);
      // 3 · Schrauben: halten, im grünen Bereich loslassen
      info.textContent = '3 · Schrauben. Halten, bis die Anzeige im grünen Feld ist. Dann loslassen.';
      leiste.innerHTML = '<div class="sz-wb-kraft"><span class="gruen"></span><i></i></div><button type="button" class="sz-wb-saege">🔩 Halten <kbd>Leertaste</kbd></button>';
      const kraft = leiste.querySelector('.sz-wb-kraft i'), dreh = leiste.querySelector('.sz-wb-saege');
      ui.taktRuhe = true;   // auch beim Schrauben ruht die 3D-Welt dahinter
      for (let s = 0; s < 4; s++) {
        stand.textContent = 'Schraube ' + (s + 1) + ' von 4';
        const g = await new Promise((fertig) => {
          let start = 0, an = false, aus = false, v = 0;
          // Zeit des Ereignisses (Finger auf / Finger weg), nicht des nächsten Bildes – fair auch auf einem langsamen iPad
          const zeit = (e) => { const j = performance.now(); return e && e.timeStamp > 0 && j - e.timeStamp >= 0 && j - e.timeStamp < 500 ? e.timeStamp : j; };
          const auf = (e) => { if (e.code === 'Space' || e.code === 'KeyE') lass(e); };
          const los = (e) => { if (aus || an) return; an = true; start = zeit(e); requestAnimationFrame(fuell); };
          const lass = (e) => { if (aus || !an) return; aus = true; if (e) { v = Math.min(100, Math.max(0, (zeit(e) - start) / 1000 * 62)); kraft.style.width = v + '%'; } loesche(); document.removeEventListener('keyup', auf, true); dreh.onpointerdown = dreh.onpointerup = dreh.onpointerleave = null; fertig(v < 62 ? 'locker' : v <= 84 ? 'gut' : 'zu'); };
          const fuell = () => { if (aus) return; v = Math.min(100, (performance.now() - start) / 1000 * 62); kraft.style.width = v + '%'; kraft.style.background = v < 62 ? '#e9a23b' : v <= 84 ? '#3fa66b' : '#d6452f'; if (v >= 100) { lass(); return; } requestAnimationFrame(fuell); };
          kraft.style.width = '0%';
          dreh.onpointerdown = (e) => { e.preventDefault(); los(e); }; dreh.onpointerup = lass; dreh.onpointerleave = lass;
          halte((e) => { if (e.code === 'Space' || e.code === 'KeyE') { e.preventDefault(); e.stopPropagation(); if (e.type === 'keydown' && !e.repeat) los(e); } });
          document.addEventListener('keyup', auf, true);
        });
        schrauben.push(g); zeichne();
        stand.textContent = g === 'gut' ? 'Sitzt.' : g === 'locker' ? 'Zu locker. Wackelt.' : 'Zu fest. Das Holz ist gerissen.';
        await warte(700);
      }
      leiste.innerHTML = ''; ui.taktRuhe = false;
      const massOk = Math.abs(mass - SOLL) < 0.6, schraubenGut = schrauben.filter((g) => g === 'gut').length;
      const gerade = massOk && schnittGerade && schraubenGut >= 3;
      info.textContent = gerade ? 'Fertig. Die Bank steht gerade.' : !massOk ? 'Fertig. Ein Bein ist ' + Math.abs(Math.round((mass - SOLL) * 10) / 10).toString().replace('.', ',') + ' cm ' + (mass > SOLL ? 'länger' : 'kürzer') + '. Die Bank wackelt.' : 'Fertig. Die Bank wackelt ein bisschen.';
      stand.textContent = 'Saubere Züge: ' + gut + ' von 10 · Schrauben, die sitzen: ' + schraubenGut + ' von 4';
      await knopf('<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>');
      ui.ebeneZu(); ok({ mass, massOk, korrigiert, takt: gut, schrauben: schraubenGut, gerade });
    })();
  });

  // ---------- Steckbrief (Deutsch, Gesamtkonzept K2): nur schreiben, was die Person gesagt hat. Drei Zeilen. ----------
  // Sätze mit „immer“, „alle“, „nie“ werden markiert. Was einem jemand anvertraut hat, ist NICHT markiert – das merkt man selbst (oder später).
  // def: { wo, wer: { name, farbe }, bildUrl, fakten: [{ t, gesagt: true|false, geheim }], max } → { gewaehlt: [i], geheim, gedacht, verallg }
  ui.steckbrief = (def) => new Promise((ok) => {
    const MAX = def.max || 3, gew = [];
    const k = ui.ebeneAuf('szene', '<div class="sz sz-steckbrief"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Deutsch') + '</span><b>📝 Steckbrief für die Annexe News</b></div>' +
      '<div class="sz-sb-karte"><div class="sz-sb-foto">' + (def.bildUrl ? '<img alt="Foto" src="' + def.bildUrl + '">' : '<i>' + esc(def.wer.name[0]) + '</i>') + '</div><div><b class="sz-sb-name" style="color:' + esc(def.wer.farbe) + '">' + esc(def.wer.name) + ' · 7P2</b><ol class="sz-sb-zeilen"></ol></div></div>' +
      '<p class="sz-info">Wähl ' + MAX + ' Sätze für den Steckbrief. Er hängt danach das ganze Jahr im Saal.</p><div class="sz-sb-fakten"></div><div class="sz-karten"></div></div>');
    const zeilen = k.querySelector('.sz-sb-zeilen'), fakten = k.querySelector('.sz-sb-fakten'), karten = k.querySelector('.sz-karten');
    const allg = (t) => /\b(immer|alle|nie|niemand|jeder)\b/i.test(t);
    const zeig = () => {
      zeilen.innerHTML = [0, 1, 2].slice(0, MAX).map((i) => { const f = def.fakten[gew[i]]; return '<li class="' + (f ? '' : 'leer') + '">' + (f ? esc(ersetze(f.t)) + (allg(f.t) ? ' <em class="sz-sb-warn">„' + esc((/\b(immer|alle|nie|niemand|jeder)\b/i.exec(f.t) || [''])[0]) + '“ – stimmt das?</em>' : '') : '…') + '</li>'; }).join('');
      fakten.innerHTML = def.fakten.map((f, i) => '<button type="button" data-i="' + i + '" class="' + (gew.includes(i) ? 'an' : '') + '"><span>' + esc(ersetze(f.t)) + '</span><small>' + (f.gesagt ? '💬 hat ' + esc(def.wer.name) + ' gesagt' : '💭 denkst du') + '</small></button>').join('');
      fakten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => { const i = +b.dataset.i, j = gew.indexOf(i); if (j >= 0) gew.splice(j, 1); else if (gew.length < MAX) gew.push(i); zeig(); }; });
      karten.innerHTML = gew.length === MAX ? '<button type="button" class="sz-weiter" data-a="w">Aufhängen <kbd>E</kbd></button>' : '';
      const w = karten.querySelector('[data-a="w"]'); if (w) w.onclick = fertig;
    };
    const fertig = () => {
      if (gew.length < MAX) return;
      loesche(); ui.ebeneZu();
      const f = gew.map((i) => def.fakten[i]);
      ok({ gewaehlt: gew.slice(), geheim: f.some((x) => x.geheim), gedacht: f.filter((x) => !x.gesagt).length, verallg: f.filter((x) => allg(x.t)).length });
    };
    zeig();
    halte((e) => { if ((e.code === 'KeyE' || e.code === 'Enter') && gew.length === MAX) { e.preventDefault(); e.stopPropagation(); fertig(); } });
  });

  // ---------- Teams wählen (Sport): du bist Kapitän:in, abwechselnd mit jemand anderem ----------
  // def: { gegner: { name, farbe }, leute: [ { id, name, farbe, info } ], gegnerWahl: [ids in Reihenfolge] } → { team: [ids], letzte: id, zuerst: id }
  ui.teamsWaehlen = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">Turnhalle · Basket</span><b>Teams wählen</b></div>' +
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
  // Gesichter lesen (Kurs E07/E09): eine gezeichnete Figur friert ein. Gesicht, Hände und Haltung sind verdeckt –
  // man deckt so wenig wie möglich auf und rät dann das Gefühl. Wenig aufgedeckt + richtig = 🔍.
  // def: { wo, titel, leute: [{ wer, zeichen: [Gesicht, Hände, Haltung], gefuehl, aufloesung }] } → { richtig, falsch, lupen }
  const FIG = {
    freude: { brauen: 'M41 18 Q45 15 48 18 M52 18 Q55 15 59 18', mund: 'M43 30 Q50 38 57 30', augen: 1.8, arme: [[32, 20], [68, 20]], dy: -5, rot: 0 },
    trauer: { brauen: 'M41 20 L47 17 M53 17 L59 20', mund: 'M44 34 Q50 28 56 34', augen: 1.6, arme: [[39, 76], [61, 76]], dy: 4, rot: 0, kopf: 5 },
    wut: { brauen: 'M40 17 L48 21 M52 21 L60 17', mund: 'M44 32 L56 32', augen: 1.7, arme: [[33, 60], [67, 60]], faust: true, dy: 0, rot: 0 },
    angst: { brauen: 'M41 16 Q45 14 48 16 M52 16 Q55 14 59 16', mund: 'M47 32 Q50 29 53 32 Q50 35 47 32', augen: 2.8, arme: [[45, 33], [55, 33]], dy: 2, rot: 0, schultern: -4 },
    ekel: { brauen: 'M41 18 L48 19 M52 17 L59 15', mund: 'M43 31 Q47 28 51 32 Q54 34 57 29', augen: 1.5, arme: [[50, 31], [62, 74]], dy: 0, rot: 7, nase: true },
    ueberraschung: { brauen: 'M41 14 Q45 11 48 14 M52 14 Q55 11 59 14', mund: 'M46 31 Q50 25 54 31 Q50 38 46 31', augen: 3, arme: [[27, 46], [73, 46]], dy: 0, rot: -6 },
  };
  const figurSvg = (gef, farbe, offen) => {
    const f = FIG[gef] || FIG.freude, h = offen.haltung, a = offen.haende, g = offen.gesicht;
    const dy = h ? f.dy : 0, rot = h ? f.rot : 0, sch = h ? (f.schultern || 0) : 0, kopf = h ? (f.kopf || 0) : 0;
    const arm = (x, y, sx) => '<path d="M' + sx + ' ' + (46 + sch) + ' L' + x + ' ' + y + '" stroke="' + farbe + '" stroke-width="6" stroke-linecap="round" fill="none"/>' + (f.faust ? '<circle cx="' + x + '" cy="' + y + '" r="4.2" fill="#e0b48c" stroke="#2b3a55" stroke-width="1.2"/>' : '<circle cx="' + x + '" cy="' + y + '" r="3.4" fill="#e0b48c"/>');
    const arme = a ? arm(f.arme[0][0], f.arme[0][1], 42) + arm(f.arme[1][0], f.arme[1][1], 58) : '<path d="M42 46 L38 72 M58 46 L62 72" stroke="#c9d2de" stroke-width="6" stroke-linecap="round"/>';
    const gesicht = g ? '<g stroke="#2b3a55" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="' + f.brauen + '"/><path d="' + f.mund + '"/>' + (f.nase ? '<path d="M48 26 l2 -1.5 l2 1.5"/>' : '') + '</g><circle cx="45" cy="23" r="' + f.augen + '" fill="#2b3a55"/><circle cx="55" cy="23" r="' + f.augen + '" fill="#2b3a55"/>'
      : '<text x="50" y="30" text-anchor="middle" font-size="14" font-weight="900" fill="#9aa3ad">?</text>';
    return '<svg viewBox="0 0 100 120" class="sz-figur"><g transform="translate(0 ' + dy + ') rotate(' + rot + ' 50 100)">' +
      '<path d="M44 76 L41 108 M56 76 L59 108" stroke="#3a3f4b" stroke-width="7" stroke-linecap="round"/>' +
      '<rect x="39" y="' + (42 + sch) + '" width="22" height="' + (36 - sch) + '" rx="8" fill="' + (h ? farbe : '#c9d2de') + '"/>' + arme +
      '<g transform="translate(0 ' + (kopf + sch) + ')"><circle cx="50" cy="25" r="15" fill="' + (g ? '#e0b48c' : '#e4e8ee') + '"/>' + gesicht + '</g></g></svg>';
  };
  ui.gesichterLesen = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>' + esc(def.titel || 'Gesichter lesen') + '</b></div>' +
      '<p class="sz-info">Die Szene friert ein. Deck so wenig wie möglich auf – dann rate das Gefühl.</p>' +
      '<div class="sz-lesen"><div class="sz-lesen-fig"></div><div class="sz-lesen-tipps"></div></div><div class="sz-bühne"></div><div class="sz-karten sz-raster ly-d-optionen"></div></div>');
    const fig = k.querySelector('.sz-lesen-fig'), tipps = k.querySelector('.sz-lesen-tipps'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const richtig = [], falsch = []; let lupen = 0;
    const TEILE = [['gesicht', '👀 Gesicht'], ['haende', '✋ Hände'], ['haltung', '🧍 Haltung']];
    (async () => {
      for (const p of def.leute) {
        const ziel = [].concat(p.gefuehl)[0], offen = {}; let auf = 0;
        const zeig = () => {
          fig.innerHTML = '<b style="color:' + esc(p.wer.farbe) + '">' + esc(p.wer.name) + '</b>' + figurSvg(ziel, p.wer.farbe, offen);
          tipps.innerHTML = TEILE.map(([id, t], n) => offen[id] ? '<em>' + esc(ersetze((p.zeichen || [])[n] || '')) + '</em>' : '<button type="button" class="sz-tipp-auf" data-t="' + id + '">' + t + '</button>').join('');
          tipps.querySelectorAll('[data-t]').forEach((b) => { b.onclick = () => { offen[b.dataset.t] = true; auf++; zeig(); }; });
        };
        zeig(); bühne.innerHTML = '';
        const ids = Object.keys(GEF);
        const j = await karteWahl(karten, ids.map((id, n) => '<button type="button" data-i="' + n + '" style="--f:' + GEF[id][1] + '"><span>' + GEF[id][2] + ' ' + GEF[id][0] + '</span></button>').join(''), ids.length, { eTaste: 0 });
        const g = ids[j]; karten.innerHTML = '';
        const passt = [].concat(p.gefuehl).includes(g); (passt ? richtig : falsch).push(p.wer.id);
        TEILE.forEach(([id]) => { offen[id] = true; }); zeig();
        const lupe = passt && auf <= 1; if (lupe) lupen++;
        pop(k, lupe ? '🔍' : passt ? '✅' : '🤔');
        bühne.innerHTML = '<div class="sz-sys">' + (passt ? (lupe ? '🔍 Mit ' + auf + ' Hinweis' + (auf === 1 ? '' : 'en') + '! ' : '✓ ') : 'Du: ' + GEF[g][2] + ' ' + GEF[g][0] + ' · ') + esc(ersetze(p.aufloesung || '')) + '</div>';
        await warte(lesezeit(p.aufloesung || 'x x x x'));
      }
      weiterKnopf(karten, { richtig, falsch, lupen }, ok, '<div class="sz-sys">' + richtig.length + ' von ' + def.leute.length + ' gelesen' + (lupen ? ' · ' + lupen + '× 🔍' : '') + '.</div>');
    })();
  });

  // ---------- Mischpult (Kurs E10: gemischte Gefühle, 0–10) ----------
  // def: { wo, ereignis, gefuehle: [ids], vergleich: { wer: { name, farbe }, werte: { id: n }, satz } } → { werte, staerkstes, gemischt }
  ui.mischpult = (def) => new Promise((ok) => {
    const G = { ...GEF, ...(def.extra || {}) };   // z. B. Scham (Kapitel 3) – nur in dieser Szene
    const ids = def.gefuehle || Object.keys(GEF), werte = Object.fromEntries(ids.map((id) => [id, 0]));
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>Mischpult</b></div>' +
      '<div class="sz-fall" style="--f:#2b3a55"><p>' + esc(ersetze(def.ereignis)) + '</p></div><p class="sz-info">Oft sind mehrere Gefühle gleichzeitig da. Das ist normal. Was ist alles da? Schieb jeden Regler von 0 bis 10.</p>' +
      '<div class="sz-mischpult">' + ids.map((id) => '<label style="--f:' + G[id][1] + '"><span>' + G[id][2] + '</span><input type="range" min="0" max="10" step="1" value="0" data-g="' + id + '"><b data-z="' + id + '">0</b><small>' + G[id][0] + '</small><i class="sz-fremd" data-f="' + id + '"></i></label>').join('') + '</div>' +
      '<div class="sz-karten"><button type="button" class="sz-weiter" data-a="w">So ist es <kbd>E</kbd></button></div></div>');
    k.querySelectorAll('[data-g]').forEach((r) => { r.addEventListener('keydown', (e) => e.stopPropagation()); r.oninput = () => { werte[r.dataset.g] = +r.value; k.querySelector('[data-z="' + r.dataset.g + '"]').textContent = r.value; }; });
    // −/+ für Finger (senkrechte Regler sind auf Handys schwer zu treffen)
    k.querySelectorAll('.sz-mischpult label').forEach((l) => { const r = l.querySelector('[data-g]');
      l.insertAdjacentHTML('beforeend', '<div class="sz-mp-knopf"><button type="button" data-d="-1">−</button><button type="button" data-d="1">+</button></div>');
      l.querySelectorAll('[data-d]').forEach((b) => { b.onclick = (e) => { e.preventDefault(); if (r.disabled) return; r.value = Math.max(0, Math.min(10, +r.value + +b.dataset.d)); r.oninput(); }; }); });
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
  const karteWahl = (box, html, n, { zeit = 0, still = null, zeitEl = null, eTaste = null, lesen = 0, steuer = null } = {}) => new Promise((fertig) => {
    box.innerHTML = html; let aus = false, tm = null, extra = lesen; const ab = performance.now() + 400;
    if (steuer) steuer.pause = (ms) => { extra += ms; if (zeitEl) zeitEl.parentNode.classList.add('pause'); setTimeout(() => zeitEl && zeitEl.parentNode.classList.remove('pause'), ms); };
    const ende = (j) => { if (aus) return; aus = true; clearTimeout(tm); if (zeitEl) zeitEl.style.width = '0%'; loesche(); fertig(j); };
    box.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
    halte((e) => { if (e.repeat || performance.now() < ab) { e.stopPropagation(); return; } const m = /^Digit([1-9])$/.exec(e.code); if (m && +m[1] <= n) { e.preventDefault(); e.stopPropagation(); ende(+m[1] - 1); } else if ((e.code === 'KeyE' || e.code === 'Enter') && eTaste != null) { e.preventDefault(); e.stopPropagation(); ende(eTaste); } else if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); } });
    if (zeit) { const ms = zeit * 1000 * zeitFaktor(), t0 = performance.now();
      const tick = () => { if (aus) return; const f = Math.min(1, 1 - (performance.now() - t0 - extra) / ms); if (zeitEl) { zeitEl.style.width = Math.max(0, f * 100) + '%'; zeitEl.parentNode.classList.toggle('lesen', performance.now() - t0 < lesen); } if (f <= 0) ende(still); else requestAnimationFrame(tick); }; tick(); }
  });
  const weiterKnopf = (box, ergebnis, ok, vorher = '') => {
    box.innerHTML = vorher + '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
    const zu = () => { loesche(); ui.ebeneZu(); ok(ergebnis); };
    box.querySelector('[data-a="w"]').onclick = zu;
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); zu(); } });
  };
  const pop = (k, sy) => { const el = document.createElement('div'); el.className = 'sz-pop'; el.textContent = sy; (k.closest('.ly-karte') || k).appendChild(el); setTimeout(() => el.remove(), 950); };
  // Lesepausen: „Ohne Zeitdruck“ verlängert Zeitlimits, nicht die Pausen (sonst 60-mal so lange warten). Ruhig und große Schrift: etwas länger.
  const lesezeit = (...t) => Math.max(1600, t.join(' ').split(/\s+/).length * 330) * (ui.ruhig ? 1.8 : 1) * (ui.einstellungen && ui.einstellungen().text !== 'normal' ? 1.3 : 1);
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
    const antworten = []; let passend = 0, strittig = 0, offen = 0, serie = 0;
    let wisch = null;
    karte.addEventListener('pointerdown', (e) => { wisch = { x: e.clientX }; karte.setPointerCapture(e.pointerId); });
    karte.addEventListener('pointermove', (e) => { if (wisch && zwei) karte.style.transform = 'translateX(' + (e.clientX - wisch.x) * 0.6 + 'px) rotate(' + (e.clientX - wisch.x) * 0.05 + 'deg)'; });
    karte.addEventListener('pointerup', (e) => { if (!wisch) return; const dx = e.clientX - wisch.x; wisch = null; karte.style.transform = ''; if (zwei && Math.abs(dx) > 60) { const b = faecher.querySelector('[data-i="' + (dx < 0 ? 0 : 1) + '"]'); if (b) b.click(); } });
    (async () => {
      for (let n = 0; n < def.karten.length; n++) {
        const c = def.karten[n];
        zahl.textContent = (n + 1) + ' / ' + def.karten.length + (serie >= 2 ? '  ·  🔥 ' + serie + ' in Folge' : '');
        karte.textContent = ersetze(c.t); karte.classList.remove('neu'); void karte.offsetWidth; karte.classList.add('neu');
        const html = F.map((f, j) => '<button type="button" data-i="' + j + '" style="--f:' + esc(f.f || '#2b3a55') + '"><span>' + (f.sy ? f.sy + ' ' : '') + esc(f.t) + (F.length <= 9 ? ' <kbd>' + (zwei ? (j ? '→' : '←') : j + 1) + '</kbd>' : '') + '</span></button>').join('');
        const pfeil = zwei ? halte((e) => { if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); const b = faecher.querySelector('[data-i="' + (e.code === 'ArrowLeft' ? 0 : 1) + '"]'); if (b) b.click(); } }) : null;
        const j = await karteWahl(faecher, html, F.length, { zeit: def.zeit || 6, still: null, zeitEl, lesen: Math.min(2500, lesezeit(c.t) * 0.45) });
        const ziel = j == null ? null : faecher.querySelector('[data-i="' + j + '"]');
        if (ziel) { const a = karte.getBoundingClientRect(), b = ziel.getBoundingClientRect(); karte.style.transition = 'transform .28s ease-in, opacity .28s'; karte.style.transform = 'translate(' + (b.left + b.width / 2 - a.left - a.width / 2) + 'px,' + (b.top + b.height / 2 - a.top - a.height / 2) + 'px) scale(.3)'; karte.style.opacity = '.3'; await warte(280); karte.style.transition = ''; karte.style.transform = ''; karte.style.opacity = ''; }
        if (pfeil) { document.removeEventListener('keydown', pfeil, true); tasten.delete(pfeil); }
        const id = j == null ? null : F[j].id; antworten.push(id);
        const ziele = c.ziel == null ? null : [].concat(c.ziel);
        let sys;
        if (id == null) { offen++; sys = '⏱ Zu langsam – liegt jetzt auf dem Stapel „später“.'; }
        else if (c.hinter) { if (!ziele) strittig++; else if (ziele.includes(id)) passend++; sys = '🫙 Dahinter steckt: ' + c.hinter; }
        else if (!ziele) { strittig++; sys = '🤔 Strittig. Kann man so oder so sehen.'; }
        else if (ziele.includes(id)) { passend++; serie++; sys = '✓ ' + F[j].t; pop(k, serie >= 3 ? '🔥' : '✅'); }
        else { serie = 0; sys = 'Hm. Andere würden das zu „' + F.find((f) => f.id === ziele[0]).t + '“ legen.'; pop(k, '🤨'); }
        if (id == null) serie = 0;
        faecher.innerHTML = '';
        // c.falsch: eigene Antwort der Figur, wenn die Karte im falschen Fach landet (Kapitel 5: Mila „Das hätte eine Kamera gesehen. Bleibt.“)
        const falschGelegt = id != null && ziele && !ziele.includes(id), sagtJetzt = falschGelegt && c.falsch ? c.falsch : c.sagt;
        rede.innerHTML = '<div class="sz-sys">' + esc(sys) + '</div>' + (sagtJetzt ? blaseHtml(c.wer, sagtJetzt) : '');
        await warte(lesezeit(sys, sagtJetzt || ''));
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
    let phase = 0, leerGefragt = false;
    const weiter = () => {
      if (phase === 0) {
        // Erster Druck ohne Tipp: nicht still „Weiß nicht“ zählen – einmal freundlich fragen (schnelle Klicker)
        if (!an.size && !leerGefragt) { leerGefragt = true; const i = k.querySelector('.sz-info'); if (i) { i.textContent = 'Tipp eine Stelle an. Oder „Weiß nicht“.'; i.classList.add('sz-info-an'); } return; }
        phase = 1; loesche();
        if (!an.size) { an.add('nirgends'); k.querySelector('[data-z="nirgends"]').classList.add('an'); }
        k.querySelectorAll('[data-z]').forEach((b) => { b.disabled = true; });
        const fremd = k.querySelector('.sz-k-fremd');
        (def.vergleich || []).forEach((v, i) => v.zonen.forEach((z) => { const Z = ZONEN[z]; if (Z) fremd.insertAdjacentHTML('beforeend', '<i style="--f:' + esc(v.wer.farbe) + ';left:calc(' + Z[1] + '% + ' + (18 + i * 14) + 'px);top:' + Z[2] + '%">' + esc(v.wer.name[0]) + '</i>'); }));
        k.querySelector('.sz-bühne').innerHTML = (def.vergleich || []).map((v) => blaseHtml(v.wer, v.satz)).join('');
        const gleich = (def.vergleich || []).filter((v) => v.zonen.some((z) => an.has(z))).map((v) => v.wer.name);
        weiterKnopf(k.querySelector('.sz-karten'), { zonen: [...an] }, ok, '<div class="sz-sys">' + esc(an.has('nirgends') && an.size === 1 ? 'Weiß nicht ist okay. Achte mal drauf, wo es anfängt.' : gleich.length ? 'Gleiche Stelle wie du: ' + gleich.join(', ') + '.' : (!(def.vergleich || []).length ? 'Merk dir die Stelle. Sie meldet sich wieder.' : ((def.vergleich || []).length === 1 ? 'Bei ' + def.vergleich[0].wer.name + ' woanders.' : 'Bei den anderen woanders.') + ' Jeder Körper meldet sich anders.')) + '</div>');
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
    // Echte Stimme (Vorlese-Stimme des Geräts): Tempo und Tonhöhe je Gefühl, Pausen über „…“. Ohne Stimme: nur Regie-Text.
    const STIMMLAGE = { freude: { rate: 1.35, pitch: 1.5, txt: (x) => x + '!' }, trauer: { rate: 0.6, pitch: 0.7, txt: (x) => x.replace(/ (\S+)\.?$/, ' … $1.') },
      wut: { rate: 1.15, pitch: 0.75, txt: (x) => x.split(' ').join('. ') + '!' }, angst: { rate: 1.25, pitch: 1.3, txt: (x) => x.replace(/ /, ' … ') + '?' },
      ekel: { rate: 0.7, pitch: 0.6, txt: (x) => x.replace(/e/, 'eee') }, ueberraschung: { rate: 1.05, pitch: 1.7, txt: (x) => x.replace(/ (\S+)\.?$/, ' … $1?!') } };
    const kannHoeren = !!(speech && speech.available);
    const sprich = (g) => { if (!kannHoeren) return; const v = STIMMLAGE[g] || {}; speech.speak((v.txt || ((x) => x))(def.satz.replace(/\.$/, '')), { interrupt: true, voice: { rate: v.rate, pitch: v.pitch } }); };
    const hoerKnopf = (g) => (kannHoeren ? '<button type="button" class="sz-hoer" data-g="' + g + '">🔊 Nochmal hören</button>' : '');
    take.addEventListener('click', (e) => { const b = e.target.closest('.sz-hoer'); if (b) { e.stopPropagation(); sprich(b.dataset.g); } });
    const gefKnoepfe = () => ids.map((id, j) => '<button type="button" data-i="' + j + '" style="--f:' + GEF[id][1] + '"><span>' + GEF[id][2] + ' ' + GEF[id][0] + '</span></button>').join('');
    (async () => {
      for (let n = 0; n < def.takes.length; n++) {
        const t = def.takes[n];
        take.innerHTML = '<small>Take ' + (n + 1) + ' · ' + esc(t.wer.name) + '</small><b>„' + esc(def.satz) + '“</b><em>🔊 ' + esc(ersetze(t.regie)) + '</em>' + hoerKnopf(t.gefuehl);
        bühne.innerHTML = ''; sprich(t.gefuehl);
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
      take.innerHTML = '<small>Dein Take</small><b class="sz-take-' + eigene + '">„' + esc(def.satz) + '“</b>' + hoerKnopf(eigene); sprich(eigene);
      const r = (def.reaktion || {})[eigene];
      bühne.innerHTML = r ? blaseHtml(r[0], r[1]) : '';
      await warte(1200);
      await warte(kannHoeren ? 1800 : 0);
      weiterKnopf(karten, { richtig, falsch, eigene }, (r) => { if (speech) speech.cancel(); ok(r); }, '<div class="sz-sys">' + esc('Gleicher Satz, ' + def.takes.length + ' Gefühle. Die Wörter sagen wenig – die Stimme sagt viel.') + '</div>');
    })();
  });

  // ---------- Spuren-Wand (Kurs E28: Fakten prüfen, mit falschen Fährten) ----------
  // def: { wo, frage, helfer: { name, farbe }, spuren: [{ id, t, sy, echt, kommentar }], schluesse: [{ key, t, braucht: [ids] }] }
  // → { gepinnt: [ids], heringe: n, schluss: key }
  // „Noch mal“: Eine Szene wurde durchgeklickt oder nicht geschafft. Kurz sagen, woran es lag, und wie es besser geht.
  // def: { sy, t, tipp, versuch, max } → Promise (nach „Noch mal versuchen“)
  ui.nochmal = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">Versuch ' + def.versuch + ' von ' + def.max + '</span><b>🔁 Noch mal</b></div>' +
      '<div class="sz-nochmal"><div class="sz-nm-sy">' + (def.sy || '🔁') + '</div><h3>' + esc(def.t) + '</h3><p>' + esc(def.tipp || '') + '</p><small>Hängen bleiben gehört dazu. So lernt man es.</small></div>' +
      '<div class="sz-karten"><button type="button" class="sz-weiter sr-lies" style="--lesen:1800ms" data-a="w">Noch mal versuchen <kbd>E</kbd></button></div></div>');
    const b = k.querySelector('[data-a="w"]'), ab = performance.now() + 1800; setTimeout(() => b.classList.remove('sr-lies'), 1800);
    const zu = () => { if (performance.now() < ab) return; loesche(); ui.ebeneZu(); ok(); };
    b.onclick = zu;
    halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) zu(); } });
  });

  ui.spurenWand = (def) => new Promise((ok) => {
    const h = def.helfer;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>🧷 Spuren-Wand</b></div>' +
      '<div class="sz-fall" style="--f:' + esc(h.farbe) + '"><p>' + esc(ersetze(def.frage)) + '</p></div><div class="sz-pinnwand"></div>' +
      '<div class="sz-sort-karte sz-spur"></div><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const wand = k.querySelector('.sz-pinnwand'), spur = k.querySelector('.sz-spur'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    const gepinnt = [], wahlen = []; let heringe = 0, verworfen = 0, schnell = 0;
    (async () => {
      for (const s of def.spuren) {
        spur.innerHTML = (s.sy ? '<i>' + s.sy + '</i> ' : '') + esc(ersetze(s.t)); bühne.innerHTML = '';
        const t0 = performance.now();
        const j = await karteWahl(karten, '<button type="button" data-i="0"><span>📌 An die Wand – das zählt</span></button><button type="button" data-i="1"><span>🗑️ Weg – das beweist nichts</span></button>', 2);
        karten.innerHTML = '';
        if (performance.now() - t0 < Math.max(1100, ersetze(s.t).split(/\s+/).length * 110)) schnell++;   // schneller, als man die Spur lesen kann
        wahlen.push(j); if (j === 1 && s.echt) verworfen++;
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
      const gemischt = def.spuren.some((x) => x.echt) && def.spuren.some((x) => !x.echt);
      weiterKnopf(karten, { gepinnt, heringe, verworfen, schnell, gleich: gemischt && def.spuren.length >= 4 && wahlen.every((x) => x === wahlen[0]), schluss: sch.key }, ok);
    })();
  });

  // ---------- Gedanken antippen (Kapitel 5): Ein Gedanke fühlt sich an wie eine Tatsache. Antippen = genau hinschauen. ----------
  // def: { wo, intro, gedanke, gruppen: [ { t, n, farbe, sy } ], schluss, frage, saetze: [ { key, t, antwort? } ], wer? } → { satz: key }
  ui.gedankeAntippen = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>Ein Gedanke</b></div>' +
      '<p class="sz-info">' + esc(ersetze(def.intro || '')) + '</p><div class="sz-ged-feld"><button type="button" class="sz-ged-blase">' + esc(ersetze(def.gedanke)) + '<small>antippen</small></button></div>' +
      '<div class="sz-ged-zaehl"></div><div class="sz-bühne"></div><div class="sz-karten ly-d-optionen"></div></div>');
    const blase = k.querySelector('.sz-ged-blase'), zaehl = k.querySelector('.sz-ged-zaehl'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    let los = false;
    const aufloesen = async () => {
      if (los) return; los = true; loesche(); blase.disabled = true; blase.classList.add('offen');
      const summe = def.gruppen.reduce((x, g) => x + g.n, 0) || 1;
      for (const g of def.gruppen) {
        zaehl.insertAdjacentHTML('beforeend', '<div class="sz-ged-zeile" style="--f:' + esc(g.farbe || '#5b6472') + '"><b>' + g.n + '</b><span>' + (g.sy ? g.sy + ' ' : '') + esc(ersetze(g.t)) + '</span><i style="width:' + Math.round(g.n / summe * 100) + '%"></i></div>');
        await warte(1150);
      }
      if (def.schluss) { bühne.innerHTML = '<div class="sz-sys">' + esc(ersetze(def.schluss)) + '</div>'; await warte(1600); }
      if (def.frage) bühne.insertAdjacentHTML('beforeend', '<p class="sz-info">' + esc(ersetze(def.frage)) + '</p>');
      const i = await karteWahl(karten, def.saetze.map((x, j) => '<button type="button" data-i="' + j + '"><span>' + esc(ersetze(x.t)) + '</span></button>').join(''), def.saetze.length);
      const satz = def.saetze[Math.max(0, i)]; karten.innerHTML = '';
      bühne.innerHTML = '<div class="sz-sys">„' + esc(ersetze(satz.t)) + '“</div>' + (satz.antwort && def.wer ? blaseHtml(def.wer, satz.antwort) : '');
      await warte(1300);
      weiterKnopf(karten, { satz: satz.key }, ok);
    };
    blase.onclick = aufloesen;
    halte((e) => { if (['KeyE', 'Enter', 'Space'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); aufloesen(); } });
  });

  // ---------- Mut-Balken (Kapitel 6): Er füllt sich, solange du hinschaust. Je länger du bleibst, desto mehr Wege gehen auf. ----------
  // def: { wo, titel, situation, dauer (s), info, stufen: [ { ab: 0–1, optionen: [ { key, t } ] } ] } → { key, mut }
  ui.mutBalken = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>' + esc(def.titel || 'Hinschauen') + '</b></div>' +
      '<div class="sz-fall" style="--f:#2b3a55"><p>' + esc(ersetze(def.situation || '')) + '</p></div>' +
      '<div class="sz-mut"><span>' + esc(def.balken || 'Mut') + '</span><div><i></i></div></div><p class="sz-info">' + esc(def.info || 'Der Balken füllt sich, solange du hinschaust.') + '</p>' +
      '<div class="sz-karten ly-d-optionen"></div></div>');
    const fill = k.querySelector('.sz-mut i'), karten = k.querySelector('.sz-karten');
    const alle = []; let mut = 0, aus = false, gezeigt = -1;
    // def.rec: Sekunden Video (Kapitel 6) – die Beschriftung zählt live mit. def.warte: so lange steht der Balken, damit man erst lesen kann
    const t0 = performance.now() + (def.warte || 0) * 1000 * (ui.ruhig ? 1.4 : 1), ms = (def.dauer || 5) * 1000 * (ui.ruhig ? 1.4 : 1), recEl = k.querySelector('.sz-mut span');
    const zeig = () => {
      const offen = def.stufen.filter((st) => st.ab <= mut + 1e-6);
      if (offen.length === gezeigt) return; gezeigt = offen.length;
      alle.length = 0; offen.forEach((st) => alle.push(...st.optionen));
      karten.innerHTML = alle.map((o, i) => '<button type="button" data-i="' + i + '"' + (i >= alle.length - (offen[offen.length - 1] || { optionen: [] }).optionen.length && offen.length > 1 ? ' class="neu"' : '') + '><kbd>' + (i + 1) + '</kbd><span>' + esc(ersetze(o.t)) + '</span></button>').join('');
      karten.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => ende(+b.dataset.i); });
    };
    const ende = (i) => { if (aus || !alle[i]) return; aus = true; loesche(); ui.ebeneZu(); ok({ key: alle[i].key, mut: Math.round(mut * 100) }); };
    halte((e) => { const m = /^Digit([1-9])$/.exec(e.code); if (m) { e.preventDefault(); e.stopPropagation(); ende(+m[1] - 1); } });
    const tick = () => { if (aus) return; mut = Math.max(0, Math.min(1, (performance.now() - t0) / ms)); fill.style.width = (mut * 100).toFixed(1) + '%';
      if (def.rec && recEl) recEl.textContent = '🔴 0:' + String(Math.round(mut * def.rec)).padStart(2, '0');
      zeig(); if (mut < 1) requestAnimationFrame(tick); };
    zeig(); requestAnimationFrame(tick);
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
        const c = j < 0 ? { typ: 'nix', wirkung: 0, antwort: 'Du wartest. Die Zahl bleibt.' } : e.karten[j];
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
    (async () => {
      for (const c of def.karten) {
        karte.textContent = ersetze(c.t); punkte.innerHTML = ''; bühne.innerHTML = '';
        // Schritt 1: den eigenen Stein auf die Linie setzen (tippen oder ziehen)
        frage.textContent = 'Wo stehst DU? Tipp auf die Linie.';
        let wert = 50; const linie = k.querySelector('.sz-zw-linie');
        punkte.innerHTML = '<i class="du" style="left:50%;top:-20px"></i>';
        const setze = (e) => { const r = linie.getBoundingClientRect(); wert = Math.round(Math.max(2, Math.min(98, (e.clientX - r.left) / r.width * 100))); punkte.querySelector('.du').style.left = wert + '%'; };
        let zieht = false;
        linie.onpointerdown = (e) => { zieht = true; linie.setPointerCapture(e.pointerId); setze(e); };
        linie.onpointermove = (e) => { if (zieht) setze(e); };
        linie.onpointerup = () => { zieht = false; };
        halte((e) => { if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); wert = Math.max(2, Math.min(98, wert + (e.code === 'ArrowLeft' ? -5 : 5))); punkte.querySelector('.du').style.left = wert + '%'; } });
        await karteWahl(karten, '<button type="button" data-i="0"><span>✔ Hier stehe ich</span></button>', 1, { eTaste: 0 });
        linie.onpointerdown = linie.onpointermove = linie.onpointerup = null;
        const ich = wert < 30 ? 0 : wert < 70 ? 1 : 2;
        // Schritt 2: Wette auf die Klasse
        frage.textContent = 'Und die meisten aus der Klasse? Wette!';
        const wette = await karteWahl(karten, ZN.map(([, n, f], q) => '<button type="button" data-i="' + q + '" style="--f:' + f + '"><span>' + ['🟢', '🟡', '🔴'][q] + ' Die meisten: ' + n.split(' ')[0] + '</span></button>').join(''), 3);
        karten.innerHTML = '';
        eigene.push(ZN[ich][0]);
        const zonen = ids.map((id) => (c.zahlen[id] < 30 ? 0 : c.zahlen[id] < 70 ? 1 : 2));
        const zaehl = [0, 1, 2].map((q) => zonen.filter((x) => x === q).length), meist = zaehl.indexOf(Math.max(...zaehl));
        if (meist === wette) treffer++;
        // die anderen fliegen nacheinander auf ihren Platz
        for (const [n, id] of ids.entries()) {
          punkte.insertAdjacentHTML('beforeend', '<i style="--f:' + esc(L[id].farbe) + ';left:50%;top:' + ((n % 3) * 12) + 'px;transition:left .45s ease-out" title="' + esc(L[id].name) + '">' + esc(L[id].name[0]) + '</i>');
          const el = punkte.lastElementChild; void el.offsetWidth; el.style.left = c.zahlen[id] + '%'; await warte(170);
        }
        pop(k, meist === wette ? '🎯' : '😮');
        const weit = ids.filter((id) => Math.abs(c.zahlen[id] - wert) >= 50).map((id) => L[id].name);
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
      '<div class="sz-puls"><span>Dein Körper</span><div><i></i></div><b>–</b></div>' +
      '<div class="sz-t-feld"><div class="sz-t-aufgabe"></div><div class="sz-t-gedanken"></div></div>' +
      '<div class="sz-karten sz-raster ly-d-optionen sz-t-antw"></div><div class="sz-t-skills"></div>' + (def.parkschein ? '<div class="sz-t-park">🅿️ Parkschein: <b>nach dem Test</b> <span>0</span></div>' : '') + '<div class="sz-t-fuss"></div></div>');
    const auf = k.querySelector('.sz-t-aufgabe'), antw = k.querySelector('.sz-t-antw'), ged = k.querySelector('.sz-t-gedanken'), sk = k.querySelector('.sz-t-skills'), fuss = k.querySelector('.sz-t-fuss');
    const pulsF = k.querySelector('.sz-puls i'), pulsZ = k.querySelector('.sz-puls b'), uhr = k.querySelector('.sz-t-uhr'), feld = k.querySelector('.sz-t-feld');
    let puls = def.start || 35, max = puls, n = 0, richtig = 0, gedankenWeg = 0, ende = false, sperre = 0, abzug = 0, bremse = false, kopfRot = 0, schnell = false, geparkt = 0, zurueck = 0, blickZeit = 0, ermahnt = false;
    const benutzt = [], gesehen = [], t0 = performance.now(), ZEIT = (def.zeit || 80) * zeitFaktor() * 1000;
    // Kapitel 4: Ereignisse während des Tests ({ bei: 0–1, text, plus, blitz, blick: { t, key, text } }), Uhrzeit statt Sekunden (def.uhr: { von, bis } in Minuten)
    const ER = (def.ereignisse || []).map((e) => ({ ...e, fertig: false }));
    const ereignis = (e) => {
      if (e.plus) puls = Math.min(100, puls + e.plus);
      if (e.blitz) { k.querySelector('.sz-test').classList.add('sz-blitz'); setTimeout(() => k.querySelector('.sz-test') && k.querySelector('.sz-test').classList.remove('sz-blitz'), 450); }
      const el = document.createElement('div'); el.className = 'sz-t-ereignis'; el.innerHTML = '<span>' + esc(ersetze(e.text)) + '</span>';
      if (e.blick) {
        const b = document.createElement('button'); b.type = 'button'; b.innerHTML = '👁 ' + esc(e.blick.t || 'Hinschauen');
        // Aufschauen kostet Testzeit (e.blick.kosten Sekunden), bringt aber etwas, das man später weiß
        b.onclick = () => { if (ende) return; gesehen.push(e.blick.key); sperre = performance.now() + 2200; puls = Math.min(100, puls + 2); const ko = (e.blick.kosten || 0); if (ko) { abzug += ko * 1000 * zeitFaktor(); blickZeit += ko; } el.querySelector('span').textContent = ersetze(e.blick.text) + (ko ? ' (−' + ko + ' s)' : ''); b.remove(); zeigPuls(); };
        el.appendChild(b);
      }
      feld.before(el); zeigPuls();
      setTimeout(() => el.remove(), (e.blick ? 4200 : 3200) * zeitFaktor());
    };
    // keine Zahl (Heft #03: die Zahl schätzt man selbst) – nur Farbe und Wort
    let rotGezeigt = false;
    const zeigPuls = () => { const Z = ZONE(puls); pulsF.style.width = puls + '%'; pulsF.style.background = Z[2]; pulsZ.textContent = Z[1]; pulsZ.style.color = Z[2]; max = Math.max(max, puls);
      feld.classList.toggle('verschwommen', puls >= 70 && puls < 90); feld.classList.toggle('blackout', puls >= 90);
      // Beim ersten Rot einmal zeigen, wo der eigene Plan liegt (schnelle Klicker übersehen die Leiste unten)
      if (puls >= 70 && !rotGezeigt && def.rotTipp) { rotGezeigt = true; const el = document.createElement('div'); el.className = 'sz-t-ereignis sz-t-rot'; el.innerHTML = '<span>' + esc(ersetze(def.rotTipp)) + '</span>'; feld.before(el); sk.classList.add('sz-t-hinweis');
        setTimeout(() => { el.remove(); sk.classList.remove('sz-t-hinweis'); }, 4000 * zeitFaktor()); } };
    const aufgabe = () => {
      if (n >= def.aufgaben.length) {
        if (!def.uhr) return fertig();
        schnell = true; auf.innerHTML = '<small>Fertig</small>Du drehst das Blatt um. Du wartest, bis Mme Lenning einsammelt.'; antw.innerHTML = ''; return;
      }
      const a = def.aufgaben[n];
      auf.innerHTML = '<small>Aufgabe ' + (n + 1) + ' von ' + def.aufgaben.length + '</small>' + esc(a.f);
      antw.innerHTML = a.a.map((x, i) => '<button type="button" data-i="' + i + '"><span>' + esc(x) + '</span></button>').join('');
      antw.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => { if (ende || puls >= 90 || performance.now() < sperre) return; const gut = +b.dataset.i === a.r; if (gut) richtig++; else puls = Math.min(100, puls + 6); n++; zeigPuls(); aufgabe(); }; });
    };
    sk.innerHTML = '<small>' + esc(def.skillsTitel || 'Dein Koffer:') + '</small>' + def.skills.map((s) => '<button type="button" data-s="' + esc(s.id) + '">' + (s.sy || '') + ' ' + esc(s.t) + '</button>').join('');
    sk.querySelectorAll('[data-s]').forEach((b) => { b.onclick = () => {
      if (ende || b.disabled) return; const s = def.skills.find((x) => x.id === b.dataset.s);
      if (s.kopf && puls >= 70) { kopfRot++; fuss.innerHTML = '<div class="sz-sys">' + esc(s.rot || (s.t + ' … nichts. Die Zahlen rutschen weg.')) + '</div>'; puls = Math.min(100, puls + 2); zeigPuls(); return; }
      b.disabled = true; benutzt.push(s.id);
      if (def.wiederholbar) setTimeout(() => { if (!ende) b.disabled = false; }, def.wiederholbar * 1000 * zeitFaktor());   // Kapitel 4: der eigene Plan geht mehrmals, mit kurzer Pause
      sperre = performance.now() + 2500; fuss.innerHTML = '<div class="sz-sys">' + esc(ersetze(s.wie || s.t)) + ' …</div>';
      const ziel = Math.max(10, puls - (s.wirkung || 25)); const a = puls; let i = 0;
      const sinke = () => { if (ende) return; i++; puls = a + (ziel - a) * i / 25; zeigPuls(); if (i < 25) setTimeout(sinke, 100); else fuss.innerHTML = ''; }; sinke();
    }; });
    if (def.notbremse) {
      const nb = document.createElement('button'); nb.type = 'button'; nb.className = 'sz-notbremse'; nb.innerHTML = '✋ Notbremse: eine Minute raus';
      nb.onclick = () => {
        if (ende || bremse) return; bremse = true; nb.disabled = true; feld.classList.add('raus'); sperre = performance.now() + 2600;
        fuss.innerHTML = '<div class="sz-sys">' + esc(def.notbremse.text || 'Handzeichen. Mme Lenning nickt. Eine Minute vor der Tür. Kalte Luft. Dann zurück.') + '</div>';
        abzug += ZEIT * 0.15;
        setTimeout(() => { feld.classList.remove('raus'); puls = Math.max(25, puls - 35); zeigPuls(); fuss.innerHTML = ''; }, 2600);
      };
      sk.appendChild(nb);
    }
    const gedanke = (fest, extra) => {
      if (ende) return;
      let t = fest || def.gedanken[Math.floor(Math.random() * def.gedanken.length)];
      const da = [...ged.querySelectorAll('.sz-gedanke:not(.weg)')].map((x) => x.textContent);
      if (da.length >= 4) { if (!extra) setTimeout(() => gedanke(), 2500); return; }   // nie mehr als vier Blasen auf einmal
      if (fest && da.filter((d) => d === t).length >= 2) return;   // auch Rückkehrer: nie mehr als zwei gleiche auf einmal
      if (!fest) {   // höchstens zweimal derselbe Gedanke auf einmal
        const frei = def.gedanken.filter((g) => da.filter((d) => d === g).length < 2);
        if (!frei.length) { setTimeout(() => gedanke(), 2500); return; }
        if (!frei.includes(t)) t = frei[Math.floor(Math.random() * frei.length)];
      }
      const el = document.createElement('button'); el.type = 'button'; el.className = 'sz-gedanke'; el.textContent = t;
      el.style.left = (5 + Math.random() * 55) + '%'; el.style.top = (10 + Math.random() * 60) + '%';
      el.onclick = () => {
        if (el.classList.contains('weg')) return;
        // Parkschein (Heft #03): ab Gelb parkt man einen Gedanken „bis nach dem Test“ – er bleibt weg. Auf Rot geht Parken nicht.
        // Ohne Parkschein: wegdrücken – und er kommt doppelt zurück (der blaue Elefant).
        if (def.parkschein && puls < 70) { geparkt++; gedankenWeg++; el.classList.add('weg', 'geparkt'); puls = Math.max(5, puls - 4); const pk = k.querySelector('.sz-t-park span'); if (pk) pk.textContent = geparkt; zeigPuls(); setTimeout(() => el.remove(), 600); return; }
        gedankenWeg++; el.classList.add('weg'); puls = Math.max(5, puls - 2); zeigPuls(); setTimeout(() => el.remove(), 600);
        // Parkschein für alle (Heft #03): Wer ihn nicht im Plan hatte, findet ihn nach dem zweiten „doppelt“ am Blattrand
        const parkNeu = def.elefant && def.parkFuerAlle && !def.parkschein && zurueck >= 1;
        if (parkNeu) { def.parkschein = true; k.querySelector('.sz-t-skills') && k.querySelector('.sz-t-skills').insertAdjacentHTML('afterend', '<div class="sz-t-park">🅿️ Am Blattrand: <b>nach dem Test</b> <span>0</span></div>'); }
        if (def.elefant) { zurueck++; fuss.innerHTML = '<div class="sz-sys">' + esc(parkNeu ? 'Wegdrücken geht nicht. Am Blattrand steht: „nach dem Test“. Tipp ihn an – dann wartet er.' : def.parkschein ? 'Auf Rot geht Parken nicht. Er kommt zurück.' : 'Weggedrückt … er kommt zurück. Doppelt.') + '</div>'; setTimeout(() => { if (ende) return; gedanke(t, true); gedanke(t, true); }, 1400); }
      };
      ged.appendChild(el); puls = Math.min(100, puls + 5); zeigPuls();
      setTimeout(() => { if (el.isConnected) el.remove(); }, 6000);
      if (!extra) setTimeout(() => gedanke(), 3500 + Math.random() * 3000);   // zurückgekommene Gedanken starten keine neue Kette
    };
    const tick = () => {
      if (ende) return; if (schnell) abzug += 45; const t = performance.now() - t0 + abzug, f = Math.min(1, t / ZEIT);
      for (const e of ER) {
        if (e.fertig) continue;
        if (e.nichtWenn && gesehen.includes(e.nichtWenn)) { e.fertig = true; continue; }
        // Wer schnell ist, verpasst nichts: ab Aufgabe e.ab springt die Uhr auf den Moment (die Zeit fliegt)
        if (e.ab != null && n >= e.ab && f < e.bei) { abzug += e.bei * ZEIT - t; e.fertig = true; ereignis(e); break; }
        if (f >= e.bei) { e.fertig = true; ereignis(e); }
      }
      { const t2 = performance.now() - t0 + abzug, f2 = Math.min(1, t2 / ZEIT);   // nach einem Sprung stimmt die Uhr sofort
        if (def.uhr) { const mn = Math.floor(def.uhr.von + (def.uhr.bis - def.uhr.von) * f2); uhr.textContent = Math.floor(mn / 60) + ':' + String(mn % 60).padStart(2, '0'); }
        else uhr.textContent = Math.max(0, Math.ceil((ZEIT - t2) / 1000)) + ' s'; }
      if (def.ermahnung && !ermahnt && gesehen.length >= (def.ermahnung.ab || 2)) {
        ermahnt = true; puls = Math.min(100, puls + (def.ermahnung.plus || 6)); ereignis({ text: def.ermahnung.text, plus: 0 });
      }
      if (puls >= 90) { puls = Math.max(75, puls - 0.06); }   // Blackout: kommt von selbst nur langsam runter
      else puls = Math.min(100, puls + (def.drift != null ? def.drift : 0.035));   // die Uhr läuft, die Zahl steigt leise
      zeigPuls();
      if (t >= ZEIT) fertig(); else requestAnimationFrame(tick);
    };
    function fertig() {
      if (ende) return; ende = true; ged.innerHTML = ''; feld.classList.remove('verschwommen', 'blackout');
      auf.innerHTML = '<small>Abgabe</small>Du hast ' + n + ' von ' + def.aufgaben.length + ' Aufgaben bearbeitet.'; antw.innerHTML = '';
      sk.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      weiterKnopf(fuss, { beantwortet: n, richtig, max: Math.round(max), skills: benutzt, gedankenWeg, gesehen, notbremse: bremse, kopfRot, geparkt, zurueck, blickZeit, blicke: gesehen.length, ende: Math.round(puls), ermahnt }, ok, '<div class="sz-sys">Am höchsten: ' + ZONE(max)[1] + (geparkt ? ' · 🅿️ ' + geparkt + ' geparkt' : '') + (blickZeit ? ' · Aufgeschaut: −' + blickZeit + ' s' : '') + '</div>');
    }
    halte((e) => { const m = /^Digit([1-9])$/.exec(e.code); if (m && !ende) { const b = antw.querySelector('[data-i="' + (+m[1] - 1) + '"]'); if (b) { e.preventDefault(); e.stopPropagation(); if (!e.repeat) b.click(); } } });
    zeigPuls(); aufgabe(); setTimeout(() => gedanke(), 2500); requestAnimationFrame(tick);
  });

  // Gemeinsam atmen (E12 Partneratmung): Jemand ist bei Rot. Halten = einatmen (Kreis wird groß), loslassen = ausatmen.
  // Ruhiger, gleichmäßiger Takt bringt die andere Person mit runter. def: { wer: { name, farbe }, start, ziel, saetze: { zahl: text } }
  // → { zahl, gut, runden }
  ui.atemSync = (def) => new Promise((ok) => {
    const w = def.wer;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>' + esc(def.titel || 'Gemeinsam atmen') + '</b></div>' +
      '<p class="sz-info">' + (def.info ? esc(def.info) + ' ' : esc(w.name) + ' atmet sehr schnell. Atme ruhig vor – er macht mit. ') + '<b>Halten</b> = normal ein. <b>Loslassen</b> = lange aus.</p>' +
      '<div class="sz-atem"><div class="sz-atem-ring"></div><div class="sz-atem-ich"></div><div class="sz-atem-er"' + (def.allein ? ' hidden' : '') + ' style="--f:' + esc(w.farbe) + '">' + esc(w.name[0]) + '</div><b class="sz-atem-z"></b></div>' +
      '<div class="sz-bühne"></div><div class="sz-karten"><button type="button" class="sz-atem-knopf">Halten zum Einatmen <kbd>Leertaste</kbd></button></div></div>');
    const ich = k.querySelector('.sz-atem-ich'), er = k.querySelector('.sz-atem-er'), zEl = k.querySelector('.sz-atem-z'), bühne = k.querySelector('.sz-bühne'), knopf = k.querySelector('.sz-atem-knopf'), karten = k.querySelector('.sz-karten');
    let zahl = def.start || 95, gut = 0, runden = 0, ein = null, aus = null, groesse = 0.3, ende = false; const gesagt = new Set();
    const zeig = () => { zEl.textContent = def.allein ? '●' : Math.round(zahl); zEl.style.color = ZONE(zahl)[2]; };   // eigenes Atmen: keine Zahl (die schätzt man selbst)
    const sag = () => { for (const [g, t] of Object.entries(def.saetze || {}).sort((a, b) => b[0] - a[0])) if (zahl <= +g && !gesagt.has(g)) { gesagt.add(g); bühne.innerHTML = blaseHtml(w, t); break; } };
    const runter = () => { if (ende || ein) return; const jetzt = performance.now(); if (aus) { const d = (jetzt - aus) / 1000; runden++; const passt = d >= 3 && d <= 8; const einD = aus - (ein0 || aus); const einOk = einD >= 1800 && einD <= 6000;
        if (passt && einOk) { gut++; zahl = Math.max(def.ziel || 35, zahl - 12); if (gut === 1 || w.name !== 'Du') bühne.insertAdjacentHTML('afterbegin', '<div class="sz-sys">' + (w.name === 'Du' ? 'Genau so.' : 'Ruhig. ' + esc(w.name) + ' atmet mit.') + '</div>'); }
        else { zahl = Math.max(def.ziel || 35, zahl - 3); bühne.insertAdjacentHTML('afterbegin', '<div class="sz-sys">' + (einD < 1800 ? 'Ruhig weiter. Normal einatmen.' : d < 3 ? 'Das Ausatmen darf länger sein.' : 'Nicht zu lange warten.') + '</div>'); }
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
    function fertig() { if (ende) return; ende = true; loesche(); document.removeEventListener('keyup', los, true); weiterKnopf(karten, { zahl: Math.round(zahl), gut, runden }, ok, '<div class="sz-sys">' + (def.allein ? (gut >= 3 ? 'Länger aus als ein. Es geht.' : 'Noch nicht ganz. Aber es wird.') : esc(w.name) + ' ist bei ' + Math.round(zahl) + '. ' + (gut >= 3 ? 'Ihr habt zusammen runtergeatmet.' : 'Langsam wird es besser.')) + '</div>'); }
    zeig(); sag(); anim();
  });

  // Skills-Koffer (E15): Aus fünf Fächern je bis zu zwei Skills einpacken, dann drei für die Notfallkarte (Rot) wählen.
  // def: { faecher: [{ id, t, sy }], karten: [{ id, t, fach }] } → { koffer: [ids], notfall: [ids] }
  ui.koffer = (def) => new Promise((ok) => {
    const drin = new Set(), not = new Set();
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Aula · Koffer-Markt') + '</span><b>Mein Skills-Koffer</b></div>' +
      '<p class="sz-info sz-k-info">Pack ein, was bei DIR wirkt. Bis zu zwei pro Fach. Danach testen wir.</p><div class="sz-koffer"></div><div class="sz-karten"></div></div>');
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
        phase = 1; info.textContent = 'Welche drei helfen dir bei Rot? Wähl. Dann testen wir.'; zeig();
        karten.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Notfallkarte fertig <kbd>E</kbd></button>'; karten.querySelector('[data-a="w"]').onclick = weiter; return;
      }
      if (!not.size) [...drin].slice(0, 3).forEach((id) => not.add(id));
      rotTest();
    };
    // Rot-Test: drei kurze Rot-Momente. Die Notfallkarte wird ausprobiert – Kopf-Skills fallen bei Rot oft aus.
    let treffer = 0, runden = 0;
    const rotTest = async () => {
      loesche(); phase = 2; treffer = 0;
      const MOM = def.rot || ['Jemand lacht dich vor allen aus.', 'Der Test liegt vor dir. Alles weg.', 'Streit im Bus. Du kochst.'];
      info.textContent = 'Test: Rot-Alarm! Welche Karte ziehst du?';
      for (const m of MOM) {
        box.innerHTML = '<div class="sz-fall" style="--f:#d6452f"><b>🚨 ROT</b><p>' + esc(ersetze(m)) + '</p></div><div class="sz-voll sz-puls"><i style="width:95%;background:#d6452f"></i></div>';
        const karteN = [...not].map((id) => def.karten.find((c) => c.id === id));
        const j = await karteWahl(karten, karteN.map((c, n) => '<button type="button" data-i="' + n + '"><span>' + esc(c.t) + '</span></button>').join(''), karteN.length, { eTaste: 0 });
        const c = karteN[j]; karten.innerHTML = '';
        const puls = box.querySelector('.sz-puls i');
        let t;
        if (c.fach === 'kopf') { t = '🤔 Bei Rot ist das für viele schwer. Bei dir auch?'; puls.style.width = '82%'; pop(k, '🤔'); }
        else if (c.fach === 'aktiv') { t = '⏳ Hilft später. Aber nicht hier, nicht jetzt.'; puls.style.width = '75%'; pop(k, '⏳'); }
        else { t = '✅ Wirkt. Der Puls geht runter.'; puls.style.width = '40%'; puls.style.background = '#3fa66b'; treffer++; pop(k, '✅'); }
        box.insertAdjacentHTML('beforeend', '<div class="sz-sys">' + esc(t) + '</div>');
        await warte(lesezeit(t));
      }
      runden++;
      box.innerHTML = '<div class="sz-sys">' + treffer + ' von ' + MOM.length + ' Rot-Momenten geschafft.</div>';
      info.textContent = treffer === MOM.length ? 'Deine Notfallkarte hält. Stark.' : 'Umpacken ist erlaubt. Auch Profis packen um.';
      const opts = (treffer < MOM.length && runden < 3 ? ['🔁 Notfallkarte umpacken'] : []).concat(['✔ Passt so']);
      const j = await karteWahl(karten, opts.map((o, n) => '<button type="button" data-i="' + n + '"><span>' + o + '</span></button>').join(''), opts.length, { eTaste: opts.length - 1 });
      if (opts[j].startsWith('🔁')) { phase = 1; info.textContent = 'Welche drei helfen dir bei ROT? Körper, Sinne, Menschen.'; zeig(); karten.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Notfallkarte fertig <kbd>E</kbd></button>'; karten.querySelector('[data-a="w"]').onclick = weiter; halte((e) => { if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); weiter(); } }); return; }
      loesche(); ui.ebeneZu(); ok({ koffer: [...drin], notfall: [...not], rotTreffer: treffer });
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
      '<div class="sz-fall" style="--f:#2b3a55"><p>' + esc(ersetze(def.situation)) + '</p></div><p class="sz-info sz-gw-info">Welcher Gedanke kommt zuerst? Der kommt von allein.</p>' +
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
      karten.innerHTML = ''; info.textContent = 'Den ersten Gedanken wählt man nicht. Den zweiten kann man prüfen.';
      weiterKnopf(karten, { gewaehlt, final }, ok);
    })();
  });

  // Bohnen-Wette (E17): Fünf Bohnen, anonym auf bremsende Sätze verteilen, die man von sich kennt. Dann sieht man die Becher
  // der ganzen Klasse. Botschaft: Viele kennen dieselben Sätze. def: { saetze: [t…], klasse: [n…] } → { bohnen: [n…], top }
  ui.bohnenWette = (def) => new Promise((ok) => {
    const b = def.saetze.map(() => 0); let frei = 5;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Aula') + '</span><b>🫘 Bohnen-Wette</b></div>' +
      '<p class="sz-info">Anonym. Leg alle fünf Bohnen zu Sätzen, die du kennst. Von dir oder anderen.</p>' +
      '<div class="sz-becher"></div><div class="sz-karten"></div></div>');
    const box = k.querySelector('.sz-becher'), karten = k.querySelector('.sz-karten');
    let zeigeKlasse = false;
    const zeig = () => {
      const max = Math.max(1, ...def.klasse.map((n, i) => n + b[i]));
      box.innerHTML = def.saetze.map((t, i) => '<button type="button" data-i="' + i + '"' + (zeigeKlasse ? ' disabled' : '') + '><span>„' + esc(t) + '“</span><i>' + '🫘'.repeat(b[i]) + '</i>' +
        (zeigeKlasse ? '<em style="width:0;transition:width .7s ease-out ' + (i * 0.35) + 's" data-w="' + Math.round((def.klasse[i] + b[i]) / max * 100) + '"></em><b>' + (def.klasse[i] + b[i]) + '</b>' : '') + '</button>').join('');
      box.querySelectorAll('[data-i]').forEach((x) => { x.onclick = () => { const i = +x.dataset.i; if (frei > 0) { b[i]++; frei--; } else if (b[i]) { b[i]--; frei++; } zeig(); }; });
      if (!zeigeKlasse) { karten.innerHTML = '<div class="sz-sys">Noch ' + frei + ' 🫘' + (frei ? '' : ' · antippen nimmt eine zurück') + '</div><button type="button" class="ly-link" data-a="neu">Alle zurück</button>' + (frei ? '' : '<button type="button" class="sz-weiter" data-a="w">Becher leeren <kbd>E</kbd></button>'); karten.querySelector('[data-a="neu"]').onclick = () => { b.fill(0); frei = 5; zeig(); }; }
      const w = karten.querySelector('[data-a="w"]'); if (w) w.onclick = weiter;
    };
    const weiter = () => {
      if (!zeigeKlasse) {
        zeigeKlasse = true; loesche(); zeig();
        requestAnimationFrame(() => requestAnimationFrame(() => box.querySelectorAll('em[data-w]').forEach((em) => { em.style.width = em.dataset.w + '%'; })));
        const top = def.klasse.map((n, i) => n + b[i]).reduce((m, n, i, a) => (n > a[m] ? i : m), 0);
        setTimeout(() => pop(k, '🫘'), def.saetze.length * 350 + 400);
        weiterKnopf(karten, { bohnen: b, top }, ok, '<div class="sz-sys">' + esc('Die meisten Bohnen: „' + def.saetze[top] + '“. Du bist mit keinem Satz allein.') + '</div>');
        return;
      }
    };
    zeig();
    halte((e) => { if ((e.code === 'KeyE' || e.code === 'Enter') && !zeigeKlasse && !frei) { e.preventDefault(); e.stopPropagation(); weiter(); } });
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
    const wahl = def.teile.map(() => -1); let gezeigt = false;
    const REG = def.regeln || [['real', 'realistisch'], ['ohneImmer', 'kein „immer/nie/alle“'], ['freundlich', 'freundlich zu dir'], ['schritt', 'mit einem nächsten Schritt']];
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>' + esc(def.titel || '🔧 Neuer Satz') + '</b></div>' +
      '<div class="sz-fall" style="--f:#8a93a3"><b>' + esc(def.altTitel || 'Alter Satz') + '</b><p>„' + esc(ersetze(def.alt)) + '“</p></div>' +
      '<div class="sz-satz"></div><div class="sz-regeln"></div><div class="sz-teile"></div><div class="sz-karten"></div></div>');
    const satz = k.querySelector('.sz-satz'), regeln = k.querySelector('.sz-regeln'), teile = k.querySelector('.sz-teile'), karten = k.querySelector('.sz-karten');
    const pruef = () => { const r = {}; REG.forEach(([id]) => { r[id] = wahl.every((w, i) => w >= 0 && def.teile[i][w].regeln[id] !== false) && wahl.some((w, i) => w >= 0 && def.teile[i][w].regeln[id]); }); return r; };
    const zeig = () => {
      satz.innerHTML = wahl.map((w, i) => '<span class="' + (w < 0 ? 'leer' : '') + '">' + (w < 0 ? '…' : esc(ersetze(def.teile[i][w].t))) + '</span>').join(' ');
      const r = pruef(); regeln.innerHTML = gezeigt ? REG.map(([id, n]) => '<i class="' + (r[id] ? 'ok' : '') + '">' + (r[id] ? '✓' : '○') + ' ' + n + '</i>').join('') : '';
      teile.innerHTML = def.teile.map((reihe, i) => '<div>' + reihe.map((t, j) => '<button type="button" data-i="' + i + '" data-j="' + j + '" class="' + (wahl[i] === j ? 'an' : '') + '">' + esc(ersetze(t.t)) + '</button>').join('') + '</div>').join('');
      teile.querySelectorAll('[data-j]').forEach((b) => { b.onclick = () => { wahl[+b.dataset.i] = +b.dataset.j; zeig(); }; });
      karten.innerHTML = wahl.every((w) => w >= 0) ? '<button type="button" class="sz-weiter" data-a="w">' + (gezeigt ? 'Fertig' : 'Das ist mein Satz') + ' <kbd>E</kbd></button>' + (gezeigt ? '<div class="sz-sys">Ändern geht noch. Tipp einen Teil an.</div>' : '') : '';
      const w = karten.querySelector('[data-a="w"]'); if (w) w.onclick = fertig;
    };
    const fertig = () => {
      if (wahl.some((w) => w < 0)) wahl.forEach((w, i) => { if (w < 0) wahl[i] = def.teile[i].findIndex((t) => Object.values(t.regeln).every(Boolean)); });
      if (!gezeigt) { gezeigt = true; zeig(); return; }
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
      weiterKnopf(karten, { abstaende }, ok, '<div class="sz-sys">Abstand ist bei jedem anders. Bei Mila wär’s mehr.</div>');
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
      weiterKnopf(karten, { klarheit, art }, ok, '<div class="sz-sys">' + ({ klar: 'Klar. Ruhig. Ernst genommen.', mittel: 'Halb angekommen. Ein Teil hat gewackelt.', unklar: 'Er hat es gehört. Weitermachen war seine Entscheidung.', angriff: 'Angekommen – aber als Angriff. Jetzt geht es um den Streit, nicht ums Foto.' })[art] + '</div>');
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
      '<div class="sz-bühne"></div><div class="sz-zeit"><i></i></div><div class="sz-karten ly-d-optionen"></div></div>');
    const bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten'), zeitT = k.querySelector('.sz-zeit i');
    let stufe = 0, ausgestiegen = false;
    (async () => {
      for (let i = 0; i < def.stufen.length && !ausgestiegen; i++) {
        stufe = i + 1; const s = def.stufen[i];
        k.querySelectorAll('.sz-stufe').forEach((el) => el.classList.toggle('an', +el.dataset.i <= i));
        bühne.innerHTML = '';
        for (const [seite, t] of s.sagt) { bühne.insertAdjacentHTML('beforeend', blaseHtml(P[seite], t)); while (bühne.children.length > 3) bühne.firstChild.remove(); await warte(lesezeit(t)); }
        const opts = s.ausstiege.concat([{ t: '(Weiter zuschauen.)', zusehen: true }]);
        const j = await karteWahl(karten, opts.map((o, n) => '<button type="button" data-i="' + n + '"><span>' + esc(ersetze(o.t)) + '</span></button>').join(''), opts.length, { zeit: def.zeit || 12, still: opts.length - 1, zeitEl: zeitT, lesen: 1200 });
        karten.innerHTML = '';
        const o = opts[j];
        if (!o.zusehen) {
          bühne.insertAdjacentHTML('beforeend', blaseHtml(null, ersetze(o.t), true));
          if (o.antwort) { await warte(500); bühne.insertAdjacentHTML('beforeend', blaseHtml(P[o.antwort[0]] || null, o.antwort[1])); }
          await warte(lesezeit(o.antwort ? o.antwort[1] : 'x x x x'));
          if (o.wirkt) { ausgestiegen = true; pop(k, '🛑'); }
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
        let j; const steuer = {};
        const wahl = karteWahl(karten, r.karten.map((c, n) => '<button type="button" data-i="' + n + '"><span>' + esc(ersetze(c.t)) + '</span></button>').join(''), r.karten.length, { zeit: def.zeit || 9, still: -1, zeitEl, steuer, lesen: 800 });
        if (ankerDa) anker.hidden = false;
        anker.onclick = () => { if (!ankerDa) return; ankerDa = false; anker.hidden = true; ich = Math.min(100, ich + 10); zeig(); if (steuer.pause) steuer.pause(5000); pop(k, '⚓'); bühne.insertAdjacentHTML('beforeend', '<div class="sz-sys">⚓ ' + esc(ersetze(def.anker)) + '</div>'); };
        j = await wahl; anker.hidden = true; karten.innerHTML = '';
        const c = j < 0 ? { t: '(…)', art: 'still', druck: 6, ich: -6, antwort: 'Du schweigst. Die Gruppe tut so, als wär das ein Ja.' } : r.karten[j];
        if (c.art === 'ja') ja++; if (c.art === 'nein') nein++;
        druck = Math.max(0, Math.min(100, druck + (c.druck || 0))); ich = Math.max(0, Math.min(100, ich + (c.ich || 0))); zeig();
        if (j >= 0) bühne.insertAdjacentHTML('beforeend', blaseHtml(null, ersetze(c.t), true));
        if (c.antwort) { await warte(450); bühne.insertAdjacentHTML('beforeend', j < 0 ? '<div class="sz-sys">' + esc(c.antwort) + '</div>' : blaseHtml(G[c.wer || r.wer], c.antwort)); }
        await warte(lesezeit(c.antwort || 'x x'));
        if (c.art === 'gehen') break;
      }
      anker.hidden = true;
      weiterKnopf(karten, { druck, ich, ja, nein }, ok, '<div class="sz-sys">' + (ich >= druck ? 'Du bist bei dir geblieben.' : 'Der Druck war stark. Das passiert. Ein Nein geht auch später.') + '</div>');
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
        const j = await karteWahl(karten, offen.map((x, n) => '<button type="button" data-i="' + n + '"><span>' + esc(ersetze(x.a.t)) + '</span></button>').join(''), offen.length);
        karten.innerHTML = ''; const { a, i } = offen[j]; benutzt.add(i); stufen.push(a.stufe);
        bühne.innerHTML = blaseHtml(null, ersetze(a.t), true);
        let n = a.wirkt || 0; const neu = []; for (const p of pub) { if (n > 0 && p.seite === 'l' && p.mut <= a.stufe + r) { p.seite = 'r'; n--; neu.push(p.name); } }
        await warte(400); zeig();
        R.querySelectorAll('i[title]').forEach((el) => { if (neu.includes(el.title)) el.classList.add('hopp'); });
        if (neu.length) { pop(k, '👏'); bühne.insertAdjacentHTML('beforeend', '<div class="sz-sys">' + esc(neu.join(', ')) + ' ' + (neu.length > 1 ? 'kommen' : 'kommt') + ' rüber.</div>'); } else pop(k, '😶');
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
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>📱 Du gegen die App</b></div>' +
      '<p class="sz-info">Wisch durch deinen Feed. ❤️ = gefällt mir, ⏭ = weiter. Langes Gucken merkt sich die App auch.</p>' +
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
        // Lesezeit zählt nicht als Interesse: erst wer NACH dem Lesen hängen bleibt, „füttert“ die App (langsames Lesen ist okay)
        const grenze = 3.5 + ersetze(p.t).split(/\s+/).length * 0.4 + (ui.autoVorlesen ? 2 : 0);
        const t0 = performance.now(); const auge = document.createElement('em'); auge.className = 'sz-auge'; feed.firstChild.appendChild(auge);
        const blick = setInterval(() => { const s = (performance.now() - t0) / 1000; auge.textContent = '👁 ' + s.toFixed(1) + ' s' + (s > grenze ? ' · die App merkt sich das' : ''); auge.classList.toggle('merkt', s > grenze); }, 100);
        const j = await karteWahl(karten, '<button type="button" data-i="0"><span>❤️ Gefällt mir</span></button><button type="button" data-i="1"><span>⏭ Weiter</span></button>', 2, { zeit: Math.max(6, grenze + 2.5), still: 2 });
        clearInterval(blick);
        const verweilt = (performance.now() - t0) / 1000;
        if (j === 0) { gewicht[p.art] += 2; geliked++; } else if (j === 2 || verweilt > grenze) gewicht[p.art] += 1;   // Hängenbleiben zählt auch
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
      '<div class="sz-rs"><div class="sz-rs-sack"><i></i><b>0 🪨</b></div><div class="sz-rs-lauf"><span class="sz-rs-figur">🚶</span></div></div>' +
      '<div class="sz-sort-karte sz-spur"></div><div class="sz-bühne"></div><div class="sz-karten sz-raster ly-d-optionen"></div></div>');
    const sack = k.querySelector('.sz-rs-sack i'), kgEl = k.querySelector('.sz-rs-sack b'), figur = k.querySelector('.sz-rs-figur'), karte = k.querySelector('.sz-spur'), bühne = k.querySelector('.sz-bühne'), karten = k.querySelector('.sz-karten');
    let kg = 0, geteilt = 0, richtig = 0; const max = def.dinge.reduce((s, d) => s + d.kg, 0);
    const zeig = () => { sack.style.height = Math.min(100, kg / max * 100) + '%'; kgEl.textContent = kg + ' 🪨'; figur.style.animationDuration = (0.6 + kg / max * 2.4) + 's'; figur.textContent = kg / max > 0.6 ? '🧍' : '🚶'; };
    zeig();
    (async () => {
      for (const d of def.dinge) {
        karte.innerHTML = '<i>' + (d.sy || '📦') + '</i> ' + esc(ersetze(d.t)) + ' <small>' + '🪨'.repeat(d.kg) + '</small>'; bühne.innerHTML = '';
        kg += d.kg; zeig(); await warte(350);
        const j = await karteWahl(karten, ARTEN.map(([, n], i) => '<button type="button" data-i="' + i + '"><span>' + n + '</span></button>').join(''), 4);
        karten.innerHTML = ''; const art = ARTEN[j][0];
        if (art === 'warten') kg -= Math.ceil(d.kg / 2); else if (art === 'teilen') { kg -= Math.ceil(d.kg * 0.6); geteilt++; } else if (art === 'nicht') kg -= d.kg;
        kg = Math.max(0, kg); zeig(); pop(k, art === 'tragen' ? '💪' : art === 'warten' ? '⏳' : art === 'teilen' ? '🤝' : '🪶');
        if ((d.passt || []).includes(art)) richtig++;
        bühne.innerHTML = '<div class="sz-sys">' + ((d.passt || []).includes(art) ? '✓ ' : '') + esc(ersetze(d.warum || '')) + '</div>';
        await warte(lesezeit(d.warum || 'x x x'));
      }
      karte.style.display = 'none';
      weiterKnopf(karten, { kg, geteilt, richtig }, ok, '<div class="sz-sys">Im Rucksack: noch ' + kg + ' von ' + max + ' Steinen. Was man teilt, wird leichter.</div>');
    })();
  });

  // Akku-Tag (E29): Ein Tag von morgens bis nachts. Jede Entscheidung lädt den Akku – oder zieht ihn leer.
  // Am Ende: Wie voll startest du in den nächsten Morgen? def: { start, stationen: [{ zeit, t, wahl: [{ t, akku, antwort }] }] } → { akku, morgen }
  ui.akkuTag = (def) => new Promise((ok) => {
    let akku = def.start || 70;
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || '') + '</span><b>🔋 ' + esc(def.titel || 'Dein Akku-Tag') + '</b></div>' +
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
        akku = Math.max(0, Math.min(100, akku + w.akku)); zeig(); pop(k, w.akku >= 0 ? '🔋' : '🪫');
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

    // Mini-Aufgaben statt „Gemacht“-Knopf: tippen (n-mal), halten (n Sekunden), still (n Sekunden nichts anfassen), wahl (ein Satz)
    const mikro = (a) => new Promise((fertig) => {
      const art = a.art || 'tippen', n = a.n || (art === 'tippen' ? 10 : 3);
      const box = karten; let aus = false, wert = 0; const t0 = performance.now();
      const ende = (gut) => { if (aus) return; aus = true; loesche(); clearInterval(iv); box.innerHTML = ''; pop(k, gut ? (a.sy || '✅') : '😅'); setTimeout(() => fertig(gut), 500); };
      let iv = null;
      if (art === 'wahl') {
        karteWahl(box, a.optionen.map((o, m) => '<button type="button" data-i="' + m + '"><span>' + esc(ersetze(o)) + '</span></button>').join(''), a.optionen.length).then(() => ende(true));
        return;
      }
      if (art === 'tippen') {
        box.innerHTML = '<button type="button" class="sz-tipp">👆 Tippen! <b>0 / ' + n + '</b></button><div class="sz-zeit"><i style="width:100%"></i></div>';
        const b = box.querySelector('button'), z = box.querySelector('.sz-zeit i'), dauer = (a.zeit || 7) * 1000 * zeitFaktor();
        const tipp = () => { if (aus) return; wert++; b.querySelector('b').textContent = wert + ' / ' + n; w.classList.remove('hupf'); void w.offsetWidth; w.classList.add('hupf'); if (wert >= n) ende(true); };
        b.onpointerdown = (e) => { e.preventDefault(); tipp(); }; b.onclick = (e) => { if (e.detail === 0) tipp(); };
        halte((e) => { if (e.repeat) return; if (e.code === 'Space' || e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); tipp(); } });
        iv = setInterval(() => { const f = 1 - (performance.now() - t0) / dauer; z.style.width = Math.max(0, f * 100) + '%'; if (f <= 0) ende(wert >= n * 0.6); }, 50);
        return;
      }
      if (art === 'halten') {
        box.innerHTML = '<button type="button" class="sz-tipp">✊ Gedrückt halten</button><div class="sz-voll"><i></i></div>';
        const b = box.querySelector('button'), f = box.querySelector('.sz-voll i'); let drueck = false;
        b.onpointerdown = (e) => { e.preventDefault(); drueck = true; }; b.onpointerup = b.onpointerleave = () => { drueck = false; };
        b.onclick = () => { wert += 0.34; };   // Tippen geht auch (langsamer)
        halte((e) => { if (e.code === 'Space' || e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); wert += 0.12; } });
        iv = setInterval(() => { if (drueck) wert += 0.05 / n * 3; f.style.width = Math.min(100, wert * 100) + '%'; if (wert >= 1) ende(true); }, 50);
        return;
      }
      // still: nichts anfassen. Anfassen kostet etwas Fortschritt; nach spätestens 3×n Sekunden ist es geschafft.
      box.innerHTML = '<div class="sz-sys">🤫 Nichts anfassen. ' + n + ' Sekunden.</div><div class="sz-voll"><i></i></div>';
      const f = box.querySelector('.sz-voll i'), dauer = n * 1000;
      let start = performance.now();
      const stoer = () => { start = Math.min(performance.now(), start + dauer * 0.35); pop(k, '👀'); };
      const ebene = k; ebene.addEventListener('pointerdown', stoer);
      halte((e) => { e.preventDefault(); e.stopPropagation(); stoer(); });
      iv = setInterval(() => { const q = (performance.now() - start) / dauer; f.style.width = Math.min(100, q * 100) + '%'; if (q >= 1 || performance.now() - t0 > dauer * 3) { ebene.removeEventListener('pointerdown', stoer); ende(true); } }, 50);
    });
    const AUGEN = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    (async () => {
      for (let r = 0; r < (def.runden || 3); r++) {
        karte.textContent = ''; bühne.innerHTML = '';
        await karteWahl(karten, '<button type="button" data-i="0"><span>🎲 Würfeln</span></button>', 1);
        karten.innerHTML = ''; let z = 0;
        for (let i = 0; i < 8; i++) { z = Math.floor(Math.random() * 6); w.textContent = AUGEN[z]; await warte(70 + i * 15); }
        let a = def.aufgaben[z];
        karte.innerHTML = '<i>' + a.sy + '</i> ' + esc(ersetze(a.t));
        let j = await karteWahl(karten, '<button type="button" data-i="0"><span>▶ Los</span></button>' + (tausch ? '<button type="button" data-i="1"><span>🔁 Tauschen (einmal)</span></button>' : ''), tausch ? 2 : 1);
        if (j === 1) { tausch = 0; getauscht++; z = (z + 3) % 6; w.textContent = AUGEN[z]; a = def.aufgaben[z]; karte.innerHTML = '<i>' + a.sy + '</i> ' + esc(ersetze(a.t)); j = await karteWahl(karten, '<button type="button" data-i="0"><span>▶ Los</span></button>', 1); }
        karten.innerHTML = ''; if (await mikro(a)) erledigt++;
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

  // ---------- Wegweiser (Français, Kapitel 3): Manon lotsen. Sie tut genau, was du sagst – auch wenn es falsch ist. ----------
  // Plan als Gitter: Gang mit zwei Kreuzungen, Räume an den Enden. Ansagen nur auf Französisch (vorher 20 Sekunden Theorie).
  // def: { wer: { name, farbe }, ziel: 'salle', wo } → { angekommen, umwege, ansagen, falschRaum: [...] }
  ui.wegweiser = (def) => new Promise((ok) => {
    const W = def.wer || { name: 'Manon', farbe: '#e07b39' };
    const k = ui.ebeneAuf('szene', '<div class="sz sz-lotsen sz-weg"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Français') + ' · Wegweiser</span><b>' + esc(W.name) + ' lotsen</b></div>' +
      '<p class="sz-info">' + esc(def.info || (W.name + ' steht vor dem Sekretariat. Sie muss in die Salle 1.04. Sag ihr den Weg – auf Französisch. Sie geht bis zur nächsten Kreuzung.')) + '</p>' +
      '<canvas width="520" height="300"></canvas>' +
      '<div class="sz-steuer ly-d-optionen"><button type="button" data-k="g">⬅ à gauche</button><button type="button" data-k="t">⬆ tout droit</button><button type="button" data-k="d">à droite ➡</button><button type="button" data-k="u">↩ demi-tour</button></div><div class="sz-stand"></div></div>');
    const cv = k.querySelector('canvas'), x = cv.getContext('2d'), stand = k.querySelector('.sz-stand');
    // Gitter 13 × 7, Zelle 40 px. Gang in Reihe 3, Querwege in Spalte 4 und 8.
    const Z = 40, OX = 0, OY = 10;
    const RAUM = { '1,3': ['Secrétariat', 'start'], '4,1': ['CDI', 'cdi'], '4,5': ['WC', 'wc'], '8,1': ['Salle 1.04', 'salle'], '8,5': ['Cantine', 'cantine'], '11,3': ['Escalier', 'escalier'] };
    const geh = (cx, cy) => (cy === 3 && cx >= 1 && cx <= 11) || ((cx === 4 || cx === 8) && cy >= 1 && cy <= 5);
    const DIR = [[1, 0], [0, 1], [-1, 0], [0, -1]];   // Osten, Süden, Westen, Norden
    let mx = 1, my = 3, ri = 0, ziehX = mx, ziehY = my, laeuft = null, fertig = false, sagt = 'Bonjour ! Je vais où ?', sT = 2.4, ansagen = 0, umwege = 0;
    const falsch = []; const kreuzung = (cx, cy) => DIR.filter(([dx, dy]) => geh(cx + dx, cy + dy)).length > 2;
    cv.__st = () => ({ mx, my, ri, fertig, laeuft: !!laeuft });   // nur für Tests
    const sprech = (t) => { sagt = t; sT = 2.2; };
    const SAETZE = { cdi: 'C’est le CDI ? Des livres…', wc: 'Euh… ce sont les toilettes.', cantine: 'La cantine ? Il est 8 heures…', escalier: 'L’escalier ? On monte ?', start: 'Le secrétariat. Encore.' };
    const schluss = (ja) => { if (fertig) return; fertig = true; setTimeout(() => { loesche(); ui.ebeneZu(); ok({ angekommen: ja, umwege, ansagen, falschRaum: falsch }); }, 1600); };
    // Weg bis zur nächsten Kreuzung, einem Raum oder einer Wand
    const weg = () => {
      const pfad = []; let cx = mx, cy = my;
      for (let i = 0; i < 12; i++) {
        const nx = cx + DIR[ri][0], ny = cy + DIR[ri][1];
        if (!geh(nx, ny)) break;
        cx = nx; cy = ny; pfad.push([cx, cy]);
        if (RAUM[cx + ',' + cy] || kreuzung(cx, cy)) break;
      }
      return pfad;
    };
    const befehl = (b) => {
      if (fertig || laeuft) return;
      ansagen++;
      if (b === 'g') ri = (ri + 3) % 4; else if (b === 'd') ri = (ri + 1) % 4; else if (b === 'u') ri = (ri + 2) % 4;
      const p = weg();
      if (!p.length) { sprech(b === 't' ? 'Euh… il y a un mur.' : 'Par là ? C’est un mur.'); umwege++; return; }
      sprech(b === 'g' ? 'À gauche. D’accord.' : b === 'd' ? 'À droite. D’accord.' : b === 'u' ? 'Demi-tour. Okay.' : 'Tout droit…');
      laeuft = { pfad: p, i: 0, t: 0 };
    };
    k.querySelectorAll('[data-k]').forEach((b) => { b.onclick = () => befehl(b.dataset.k); });
    halte((e) => { const m = { ArrowLeft: 'g', KeyA: 'g', ArrowUp: 't', KeyW: 't', ArrowRight: 'd', KeyD: 'd', ArrowDown: 'u', KeyS: 'u', KeyE: 't' }[e.code]; if (m) { e.preventDefault(); e.stopPropagation(); befehl(m); } });
    let last = performance.now(), zeit = 0;
    const draw = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000); last = now; zeit += dt;
      if (laeuft && !fertig) {
        laeuft.t += dt * 2.6;
        const [zx, zy] = laeuft.pfad[laeuft.i]; const fx = laeuft.i ? laeuft.pfad[laeuft.i - 1][0] : mx, fy = laeuft.i ? laeuft.pfad[laeuft.i - 1][1] : my;
        const a = Math.min(1, laeuft.t); ziehX = fx + (zx - fx) * a; ziehY = fy + (zy - fy) * a;
        if (laeuft.t >= 1) {
          laeuft.t = 0; laeuft.i++;
          if (laeuft.i >= laeuft.pfad.length) {
            [mx, my] = laeuft.pfad[laeuft.pfad.length - 1]; ziehX = mx; ziehY = my; laeuft = null;
            const r = RAUM[mx + ',' + my];
            if (r && r[1] === (def.ziel || 'salle')) { sprech('Salle 1.04 ! Merci !'); schluss(true); }
            else if (r) { umwege++; if (!falsch.includes(r[1])) falsch.push(r[1]); sprech(SAETZE[r[1]] || 'Ici ?'); }
            else sprech('Et maintenant ?');
          }
        }
      }
      if (!fertig && zeit > 70 * zeitFaktor()) { sprech('Je demande à quelqu’un d’autre. Merci quand même.'); schluss(false); }
      x.fillStyle = '#e9e4da'; x.fillRect(0, 0, 520, 300);
      for (let cy = 0; cy < 7; cy++) for (let cx = 0; cx < 13; cx++) if (geh(cx, cy)) { x.fillStyle = '#ffffff'; x.fillRect(OX + cx * Z + 2, OY + cy * Z + 2, Z - 4, Z - 4); }
      for (const [key, [name]] of Object.entries(RAUM)) {
        const [cx, cy] = key.split(',').map(Number);
        x.fillStyle = name === 'Salle 1.04' ? '#ffd98a' : '#cfd8e6'; x.fillRect(OX + cx * Z + 2, OY + cy * Z + 2, Z - 4, Z - 4);
        x.fillStyle = '#1b1d26'; x.font = 'bold 11px system-ui'; const w = x.measureText(name).width;
        const ty = cy === 1 ? OY + cy * Z - 2 : cy === 5 ? OY + (cy + 1) * Z + 11 : OY + cy * Z - 4;
        x.fillText(name, Math.min(518 - w, Math.max(2, OX + cx * Z + Z / 2 - w / 2)), ty);
      }
      const px = OX + ziehX * Z + Z / 2, py = OY + ziehY * Z + Z / 2;
      x.save(); x.translate(px, py); x.rotate(ri * Math.PI / 2);
      x.fillStyle = W.farbe; x.beginPath(); x.arc(0, 0, 12, 0, 7); x.fill();
      x.fillStyle = '#fff'; x.beginPath(); x.moveTo(16, 0); x.lineTo(8, -5); x.lineTo(8, 5); x.fill(); x.restore();
      if (sT > 0) { sT -= dt; x.font = 'bold 14px system-ui'; const w = x.measureText(sagt).width + 16; const bx = Math.min(520 - w - 4, Math.max(4, px - w / 2)); const by = Math.max(2, py - 44);
        x.fillStyle = 'rgba(255,255,255,.95)'; x.fillRect(bx, by, w, 24); x.strokeStyle = W.farbe; x.lineWidth = 2; x.strokeRect(bx, by, w, 24); x.fillStyle = '#1b1d26'; x.fillText(sagt, bx + 8, by + 17); }
      stand.textContent = 'Ansagen: ' + ansagen + ' · Umwege: ' + umwege;
      if (!fertig || sT > 0) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  });

  // ---------- Aufstellung (Sport, Kapitel 3): Zehn stehen an der Wand, du stellst fünf auf. Wer übrig bleibt, merkt es sich. ----------
  // def: { wo, leute: [{ id, name, farbe, info, blick? }], anzahl: 5 } → { team: [ids], uebrig: [ids], angeschaut: [ids] }
  ui.aufstellung = (def) => new Promise((ok) => {
    const N = def.anzahl || 5, team = [], angeschaut = [];
    const k = ui.ebeneAuf('szene', '<div class="sz"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Turnhalle') + '</span><b>Aufstellung</b></div>' +
      '<p class="sz-info">' + (def.schnell ? 'Frau Sommer zählt runter. Tipp ' + N + ' Namen an.' : (def.leute.length === 9 ? 'Neun' : def.leute.length) + ' warten an der Wand. Du spielst selbst mit und stellst ' + N + ' dazu. Einmal tippen: genauer hinschauen. Zweimal: aufstellen.') + '</p>' + (def.schnell ? '<div class="mv-zeit sz-auf-zeit"><i></i></div>' : '') + '<div class="sz-wand"></div><div class="sz-blick-text sz-sys"></div><div class="sz-teams"><div><b>Deine Fünf</b><span data-t="ich"></span></div></div><div class="sz-karten"></div></div>');
    const wand = k.querySelector('.sz-wand'), blick = k.querySelector('.sz-blick-text'), karten = k.querySelector('.sz-karten');
    let fokus = null;
    const zeig = () => {
      wand.innerHTML = def.leute.map((p) => '<button type="button" data-p="' + p.id + '" style="--f:' + p.farbe + '" class="' + (team.includes(p.id) ? 'an' : '') + (fokus === p.id ? ' fokus' : '') + '"><i>' + esc(p.name[0]) + '</i><span>' + esc(p.name) + '</span><small>' + (team.includes(p.id) ? '✓ aufgestellt' : '') + '</small></button>').join('');
      k.querySelector('[data-t="ich"]').textContent = team.map((id) => def.leute.find((p) => p.id === id).name).join(', ') || '–';
      wand.querySelectorAll('[data-p]').forEach((b) => { b.onclick = () => tipp(b.dataset.p); });
      karten.innerHTML = team.length === N ? '<button type="button" class="sz-weiter" data-a="w">Aufstellung steht <kbd>E</kbd></button>' : '';
      const w = karten.querySelector('[data-a="w"]'); if (w) w.onclick = fertig;
    };
    const tipp = (id) => {
      const p = def.leute.find((q) => q.id === id);
      if (team.includes(id)) { team.splice(team.indexOf(id), 1); fokus = id; blick.textContent = p.name + ' geht zurück an die Wand.'; zeig(); return; }
      if (fokus !== id && !def.schnell) { fokus = id; if (!angeschaut.includes(id)) angeschaut.push(id); blick.textContent = p.name + ': ' + (p.blick || p.info || 'wartet.'); zeig(); return; }
      if (team.length >= N) { blick.textContent = 'Fünf stehen schon. Nimm erst jemanden raus.'; return; }
      team.push(id); fokus = null; blick.textContent = p.name + ' kommt nach vorne.'; zeig();
    };
    let aus = false, uhr = 0;
    const fertig = () => { if (aus || team.length !== N) return; aus = true; clearTimeout(uhr); loesche(); ui.ebeneZu(); ok({ team: team.slice(), uebrig: def.leute.map((p) => p.id).filter((id) => !team.includes(id)), angeschaut, zeitUm: !!fertig.zeitUm }); };
    halte((e) => { if ((e.code === 'KeyE' || e.code === 'Enter') && team.length === N) { e.preventDefault(); e.stopPropagation(); fertig(); } });
    zeig();
    if (def.schnell) {   // Zeit um: Frau Sommer füllt auf – mit denen, die am nächsten an ihr stehen (Reihenfolge der Wand)
      const sek = (def.zeit || 10) * zeitFaktor(), bar = k.querySelector('.sz-auf-zeit i');
      if (bar) { bar.style.transition = 'transform ' + sek + 's linear'; requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transform = 'scaleX(0)'; })); }
      uhr = setTimeout(() => { if (aus) return; for (const p of def.leute) if (team.length < N && !team.includes(p.id)) team.push(p.id); fertig.zeitUm = true; blick.textContent = 'Zeit! Frau Sommer nimmt den Rest.'; zeig(); setTimeout(fertig, 1100); }, sek * 1000);
    }
  });

  // ---------- Pass-Spiel (Hallenturnier, Kapitel 3): Wer steht frei? Hinschauen unter Zeitdruck. ----------
  // Runden: der Ball ist bei dir, zwei Sekunden, die Gegner decken – tippe auf den, der frei ist. Am Ende der letzte Pass.
  // def: { wo, team: [{ id, name, farbe }], letzter: id (wer den letzten Pass nicht fängt), runden: 6 } → { gute, abgefangen, zuLang, stand: [a, b], letzter }
  // Seit Serie 2: wer den Ball verliert, ergibt sich aus den eigenen Pässen (kein fester Patzer). def.muede: [ids] – wer müde ist,
  // lässt einen freien Ball manchmal durchrutschen. def.ohneStart: erster Angriff ohne dich (du warst an der Wand). def.tausch: { rein, nach }.
  // def.bank: so viele Angriffe sitzt du auf der Bank (Platz abgegeben) – die laufen von selbst, etwas schlechter.
  ui.passSpiel = (def) => new Promise((ok) => {
    const T = def.team.slice(), R = def.runden || 6, muede = def.muede || [];
    const k = ui.ebeneAuf('szene', '<div class="sz sz-lotsen"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Turnhalle') + ' · 7P2 gegen 7P1</span><b>Wer steht frei?</b></div>' +
      '<p class="sz-info">Du hast den Ball. Tippe auf den, um den gerade niemand steht. Du hast nur einen Moment.</p>' +
      '<canvas width="520" height="300"></canvas><div class="sz-stand"></div></div>');
    const cv = k.querySelector('canvas'), x = cv.getContext('2d'), stand = k.querySelector('.sz-stand');
    let runde = 0, gute = 0, abgefangen = 0, zuLang = 0, wir = 4, sie = 5, fehlerVon = '', phase = 'zeig', t = 0, frei = -1, pos = [], gegner = [], text = '', textT = 0, fertig = false, warten = false;
    const ich = { x: 70, y: 150 };
    cv.__st = () => ({ runde, frei, phase, pos: pos.map((p) => [p.x, p.y]) });   // nur für Tests
    const zufall = (a, b) => a + Math.random() * (b - a);
    const neueRunde = () => {
      runde++; t = 0; phase = 'spiel';
      const letzte = runde === R;
      pos = T.map((p, i) => ({ ...p, x: zufall(170, 480), y: 62 + i * 46 + zufall(-9, 9) }));
      // Letzter Angriff: Wer bisher alles richtig gelesen hat, spielt zum Müdesten aus der eigenen Aufstellung – der Ball rutscht durch (Folge der Aufstellung).
      frei = letzte && def.letzter && !fehlerVon ? Math.max(0, T.findIndex((p) => p.id === def.letzter)) : Math.floor(Math.random() * T.length);
      gegner = pos.map((p, i) => (i === frei ? { x: Math.min(500, p.x + zufall(70, 110) * (p.x > 330 ? -1 : 1)), y: Math.max(52, Math.min(270, p.y + zufall(-50, 50))) } : { x: p.x + zufall(-16, 16), y: p.y + zufall(-16, 16) }));
      text = letzte ? 'Letzter Angriff. Noch 20 Sekunden. ' + wir + ' : ' + sie + '.' : 'Angriff ' + runde + ' von ' + R; textT = 1.4;
      if (runde === 1 && def.ohneStart) { phase = 'aus'; sie++; text = 'Du bist noch an der Wand. Die 7P1 trifft.'; textT = 2.2; weiter(); }
      else if (def.bank && runde <= def.bank) {   // du hast deinen Platz abgegeben: die erste Hälfte läuft ohne dich
        phase = 'aus'; const tor = Math.random() < 0.4; if (tor) wir++; else sie++;
        text = 'Du sitzt auf der Bank. ' + (tor ? 'Die 7P2 trifft.' : 'Die 7P1 trifft.') + (runde === def.bank ? ' Halbzeit – du gehst rein.' : ''); textT = 2.2; weiter();
      }
    };
    const zeitMax = () => 2.2 * zeitFaktor();
    const wahl = (i) => {
      if (phase !== 'spiel' || fertig) return;
      phase = 'aus'; const letzte = runde === R;
      if (i === frei) {
        if (letzte && def.letzter && !fehlerVon) { text = T[i].name + ' ist frei … der Ball kommt … und rutscht ihm durch die Hände.'; sie++; fehlerVon = T[i].id; }
        else if (muede.includes(T[i].id) && Math.random() < 0.5) { text = T[i].name + ' ist frei … gähnt … der Ball rutscht durch.'; sie++; fehlerVon = T[i].id; }
        else { gute++; wir++; text = 'Pass zu ' + T[i].name + ' – Tor!'; }
      } else { abgefangen++; sie++; fehlerVon = T[i].id; text = 'Abgefangen. ' + T[i].name + ' war gedeckt.'; }
      textT = 2.2; weiter();
    };
    const weiter = () => { warten = true; setTimeout(() => {
      warten = false; if (runde >= R) return ende();
      if (def.tausch && def.tausch.rein && runde === (def.tausch.nach || Math.floor(R / 2)) && !T.some((p) => p.id === def.tausch.rein.id)) {   // Halbzeit: wie versprochen
        const raus = T[T.length - 1]; T[T.length - 1] = def.tausch.rein; text = 'Halbzeit. ' + def.tausch.rein.name + ' kommt rein. ' + raus.name + ' geht raus.'; textT = 2.4;
        warten = true; setTimeout(() => { warten = false; neueRunde(); }, 2200); return;
      }
      neueRunde(); }, letzteRunde() ? 2600 : 1500); };
    const letzteRunde = () => runde >= R;
    const ende = () => {
      if (fertig) return; fertig = true;   // ehrlicher Spielstand: jeder gute Pass ein Tor, jeder Fehler ein Gegentor
      text = 'Abpfiff. ' + wir + ' : ' + sie + '.'; textT = 3;
      setTimeout(() => { loesche(); ui.ebeneZu(); ok({ gute, abgefangen, zuLang, stand: [wir, sie], letzter: fehlerVon || def.letzter || null, getauscht: !!def.bank || !!(def.tausch && T.some((p) => p.id === def.tausch.rein.id)) }); }, 2200);
    };
    cv.addEventListener('pointerdown', (e) => {
      const r = cv.getBoundingClientRect(), sx = (e.clientX - r.left) * (520 / r.width), sy = (e.clientY - r.top) * (300 / r.height);
      let best = -1, bd = 40; pos.forEach((p, i) => { const d = Math.hypot(p.x - sx, p.y - sy); if (d < bd) { bd = d; best = i; } });
      if (best >= 0) wahl(best);
    });
    halte((e) => { const n = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Digit5: 4 }[e.code]; if (n != null) { e.preventDefault(); e.stopPropagation(); wahl(n); } });
    let last = performance.now();
    const draw = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      if (phase === 'spiel' && !warten) { t += dt; if (t > zeitMax()) { phase = 'aus'; zuLang++; text = 'Zu lange gewartet. Ballverlust.'; textT = 1.8; if (Math.random() < 0.5) sie++; weiter(); } }
      x.fillStyle = '#d9b47c'; x.fillRect(0, 0, 520, 300);
      x.strokeStyle = 'rgba(255,255,255,.75)'; x.lineWidth = 2; x.strokeRect(10, 10, 500, 280); x.beginPath(); x.moveTo(260, 10); x.lineTo(260, 290); x.stroke(); x.beginPath(); x.arc(260, 150, 40, 0, 7); x.stroke();
      x.fillStyle = '#fff'; x.fillRect(504, 120, 6, 60);
      for (const g of gegner) { x.fillStyle = '#7a8090'; x.beginPath(); x.arc(g.x, g.y, 12, 0, 7); x.fill(); }
      pos.forEach((p, i) => { x.fillStyle = p.farbe; x.beginPath(); x.arc(p.x, p.y, 14, 0, 7); x.fill(); x.fillStyle = '#fff'; x.font = 'bold 12px system-ui'; x.fillText(p.name[0], p.x - 4, p.y + 4);
        x.fillStyle = '#1b1d26'; x.font = '11px system-ui'; x.fillText((i + 1) + ' ' + p.name, p.x - 18, p.y + 28); });
      x.fillStyle = '#3f78b8'; x.beginPath(); x.arc(ich.x, ich.y, 15, 0, 7); x.fill(); x.fillStyle = '#e9734a'; x.beginPath(); x.arc(ich.x + 14, ich.y - 10, 7, 0, 7); x.fill();
      x.fillStyle = '#fff'; x.font = 'bold 12px system-ui'; x.fillText('Du', ich.x - 8, ich.y + 4);
      if (phase === 'spiel') { const rest = Math.max(0, 1 - t / zeitMax()); x.fillStyle = rest > 0.35 ? '#3fa66b' : '#d6452f'; x.fillRect(10, 292, 500 * rest, 6); }
      x.fillStyle = 'rgba(27,29,38,.82)'; x.fillRect(200, 14, 120, 26); x.fillStyle = '#fff'; x.font = 'bold 15px system-ui'; x.fillText('7P2 ' + wir + ' : ' + sie + ' 7P1', 208, 32);
      if (textT > 0) { textT -= dt; x.font = 'bold 14px system-ui'; const w = Math.min(500, x.measureText(text).width + 16); x.fillStyle = 'rgba(255,255,255,.95)'; x.fillRect(260 - w / 2, 250, w, 26); x.fillStyle = '#1b1d26'; x.fillText(text, 260 - w / 2 + 8, 268, 484); }
      stand.textContent = 'Gute Pässe: ' + gute + ' · abgefangen: ' + abgefangen;
      if (!fertig || textT > 0) requestAnimationFrame(draw);
    };
    setTimeout(neueRunde, 900); requestAnimationFrame(draw);
  });

  // ---------- Eisrutsche (Kapitel 4, Pause): Anlauf wird schneller – rechtzeitig vor der Kante abspringen. Drei Versuche, der beste zählt.
  // def: { rekord, rekordVon } → { best, versuche: [m, …] }
  ui.rutsche = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz sz-rutsche"><div class="sz-kopf"><span class="sz-wo">Hof · Eisrutsche</span><b>Drei Versuche</b></div>' +
      '<p class="sz-info">Anlauf läuft. Tippe <b>Jetzt!</b> kurz vor der roten Kante. Zu spät = Hintern.</p>' +
      '<canvas width="520" height="200"></canvas><div class="sz-karten"><button type="button" class="sz-ducken">⛸ Jetzt! <kbd>Leertaste</kbd></button></div><div class="sz-stand"></div></div>');
    const cv = k.querySelector('canvas'), x = cv.getContext('2d'), stand = k.querySelector('.sz-stand'), knopf = k.querySelector('.sz-ducken');
    const F = Math.min(zeitFaktor(), 1.8), KANTE = 420, REK = def.rekord || 3.2;
    let versuch = 0, pos = 40, v = 0, phase = 'lauf', text = 'Versuch 1 von 3', textT = 1.2, warte = 0, best = 0, rutsch = 0, weit = 0;
    const versuche = [];
    cv.__st = () => ({ pos, phase, versuch, kante: KANTE });   // nur für Tests
    const neu = () => { pos = 40; v = 60; phase = 'lauf'; rutsch = 0; weit = 0; };
    const los = () => {
      if (phase !== 'lauf') return;
      const rest = KANTE - pos;
      if (rest < 0) return;
      weit = Math.round((1.4 + 2.4 * Math.max(0, 1 - rest / 140)) * 10) / 10;   // je näher an der Kante, desto weiter
      phase = 'rutscht'; rutsch = 0;
    };
    knopf.addEventListener('pointerdown', (e) => { e.preventDefault(); los(); });
    halte((e) => { if (e.code === 'Space') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) los(); } });
    neu();
    let last = performance.now();
    const ende = () => { phase = 'aus'; setTimeout(() => { loesche(); ui.ebeneZu(); ok({ best, versuche }); }, 2200); };
    const draw = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      if (phase === 'lauf') { v += dt * 95 / F; pos += v * dt / F;
        if (pos > KANTE) { phase = 'fall'; versuche.push(0.8); text = 'Zu spät! Hintern. 0,8 m.'; textT = 1.6; warte = 1.8; } }
      else if (phase === 'rutscht') { rutsch = Math.min(1, rutsch + dt / 1.1);
        if (rutsch >= 1) { phase = 'fertig'; versuche.push(weit); best = Math.max(best, weit); text = String(weit).replace('.', ',') + ' m' + (weit > REK ? ' – Hofrekord!' : ''); textT = 1.6; warte = 1.8; } }
      else if (phase === 'fall' || phase === 'fertig') { warte -= dt;
        if (warte <= 0) { versuch++; best = Math.max(best, ...versuche); if (versuch >= 3) { text = 'Bester Versuch: ' + String(best).replace('.', ',') + ' m'; textT = 3; ende(); } else { text = 'Versuch ' + (versuch + 1) + ' von 3'; textT = 1.2; neu(); } } }
      x.fillStyle = '#dfe9f3'; x.fillRect(0, 0, 520, 200); x.fillStyle = '#eaf4ff'; x.fillRect(0, 110, 520, 60);
      x.fillStyle = '#bcd7f0'; x.fillRect(KANTE, 110, 100, 60);   // Eis
      x.fillStyle = '#d6452f'; x.fillRect(KANTE - 3, 104, 4, 72);   // Kante
      x.fillStyle = 'rgba(27,29,38,.25)'; x.fillRect(KANTE + REK / 4.2 * 100 - 1, 112, 2, 56); x.font = '11px system-ui'; x.fillText('Rekord', KANTE + REK / 4.2 * 100 - 18, 186);
      const px = phase === 'rutscht' || phase === 'fertig' ? KANTE + (weit / 4.2) * 100 * (phase === 'fertig' ? 1 : rutsch) : Math.min(pos, KANTE + 30);
      x.fillStyle = '#2f6db0'; x.beginPath(); x.arc(px, phase === 'fall' ? 158 : 128, 12, 0, 7); x.fill();
      if (textT > 0) { textT -= dt; x.font = 'bold 15px system-ui'; const w = Math.min(500, x.measureText(text).width + 16); x.fillStyle = 'rgba(255,255,255,.95)'; x.fillRect(260 - w / 2, 18, w, 26); x.fillStyle = '#1b1d26'; x.fillText(text, 260 - w / 2 + 8, 36); }
      stand.textContent = 'Versuche: ' + (versuche.map((m) => String(m).replace('.', ',') + ' m').join(' · ') || '–') + ' · Rekord: ' + String(REK).replace('.', ',') + ' m' + (def.rekordVon ? ' (' + def.rekordVon + ')' : '');
      if (phase !== 'aus' || textT > 0) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  });

  // ---------- Schneeballschlacht (Kapitel 4): 7P2 gegen 7P1 im Hof. Hinter drei Schneewällen tauchen Köpfe auf –
  // antippen = werfen (trifft nur, wenn der Kopf noch oben ist). Wird ein Ball auf dich geworfen, leuchtet der Rand rot:
  // „Ducken“ (Knopf oder Leertaste) rechtzeitig, sonst Treffer. Mitspieler werfen auch. Man kann verlieren. def.schutz: Namen, die je einen Ball abfangen. Dreimal erwischt = 10 s Bank.
  // def: { wo, zeit: s, team: [{ id, name, farbe }], gegner: [{ name, farbe }] } → { treffer, getroffen, ausgewichen, wuerfe, stand: [wir, sie] }
  ui.schneeball = (def) => new Promise((ok) => {
    const k = ui.ebeneAuf('szene', '<div class="sz sz-schnee"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Hof') + ' · 7P2 gegen 7P1</span><b>Schneeballschlacht</b></div>' +
      '<p class="sz-info">Tippe auf einen Kopf, der hinter dem Wall auftaucht. Wird der Rand rot: <b>Ducken!</b></p>' +
      '<canvas width="520" height="300"></canvas><div class="sz-karten"><button type="button" class="sz-ducken">⬇ Ducken <kbd>Leertaste</kbd></button></div><div class="sz-stand"></div></div>');
    const cv = k.querySelector('canvas'), x = cv.getContext('2d'), stand = k.querySelector('.sz-stand'), duckKnopf = k.querySelector('.sz-ducken');
    const ZEIT = (def.zeit || 45) * zeitFaktor(), G = def.gegner && def.gegner.length ? def.gegner : [{ name: 'Tom', farbe: '#c0392b' }, { name: 'Sami', farbe: '#8e44ad' }, { name: 'Lea', farbe: '#16a085' }];
    const WALL = [110, 260, 410];
    let t = 0, treffer = 0, getroffen = 0, ausgewichen = 0, wuerfe = 0, wir = 0, sie = 0, fertig = false, duck = 0, text = 'Los!', textT = 1.2, naechster = 0.8, angriff = null, splat = 0;
    const koepfe = WALL.map((wx, i) => ({ x: wx, y: 92, auf: 0, bis: 0, g: G[i % G.length] }));
    const baelle = [];   // { x0, y0, x1, y1, t, dauer, wer: 'ich' | 'team', ziel }
    cv.__st = () => ({ koepfe: koepfe.map((q) => [q.x, q.y - 22 * q.auf, q.auf > 0.6]), warn: !!angriff && !angriff.fertig, t, fertig });   // nur für Tests
    const zufall = (a, b) => a + Math.random() * (b - a);
    const schutz = (def.schutz || []).slice(); let bank = 0, serie = 0;   // wer neben dir steht, fängt je einen Ball ab
    let rufDa = false, rufBtn = null, rufBis = 0, rufGenutzt = false, offen = 0;   // def.ruf: mitten im Spiel jemanden reinholen – kostet kurz die Deckung
    const werfen = (sx, sy) => {
      if (fertig || duck > 0 || bank > 0) return;
      let ziel = -1, bd = 42; koepfe.forEach((q, i) => { const d = Math.hypot(q.x - sx, q.y - 22 * q.auf - sy); if (d < bd) { bd = d; ziel = i; } });
      wuerfe++; baelle.push({ x0: 260, y0: 286, x1: sx, y1: sy, t: 0, dauer: 0.38, wer: 'ich', ziel });
    };
    const ducken = () => { if (fertig) return; duck = 0.75; if (offen <= 0 && angriff && !angriff.fertig && angriff.t < angriff.dauer) { angriff.fertig = true; ausgewichen++; text = 'Weggeduckt! Der Ball zischt über dich.'; textT = 1.3; } };
    duckKnopf.addEventListener('pointerdown', (e) => { e.preventDefault(); ducken(); });
    cv.addEventListener('pointerdown', (e) => { const r = cv.getBoundingClientRect(); werfen((e.clientX - r.left) * (520 / r.width), (e.clientY - r.top) * (300 / r.height)); });
    halte((e) => { if (e.code === 'Space') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) ducken(); } });
    let last = performance.now();
    const draw = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      if (!fertig) {
        t += dt; duck = Math.max(0, duck - dt); splat = Math.max(0, splat - dt);
        // Köpfe tauchen auf und ab
        naechster -= dt;
        if (naechster <= 0) { const q = koepfe[Math.floor(Math.random() * 3)]; if (q.bis <= t) { q.bis = t + zufall(0.7, 1.1) * zeitFaktor(); } naechster = zufall(0.8, 1.5); }
        for (const q of koepfe) q.auf = q.bis > t ? Math.min(1, q.auf + dt * 6) : Math.max(0, q.auf - dt * 5);
        // die 7P1 wirft auf dich (mit Warnung)
        if (bank > 0) { bank -= dt; if (bank <= 0) { text = 'Wieder dabei!'; textT = 1; } }
        offen = Math.max(0, offen - dt);
        if (def.ruf && !rufDa && t >= (def.ruf.bei || 10) * zeitFaktor()) {
          rufDa = true; rufBis = t + (def.ruf.dauer || 4) * zeitFaktor(); text = def.ruf.t; textT = (def.ruf.dauer || 4) * zeitFaktor();
          rufBtn = document.createElement('button'); rufBtn.type = 'button'; rufBtn.className = 'sz-ruf'; rufBtn.textContent = def.ruf.knopf || 'Hier!';
          k.querySelector('.sz-karten').appendChild(rufBtn);
          rufBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); if (rufGenutzt || fertig) return; rufGenutzt = true; rufBtn.remove(); rufBtn = null; offen = 3 * zeitFaktor();
            text = def.ruf.danach || 'Er rennt rüber. Du stehst kurz ohne Deckung.'; textT = 1.8; if (def.team && def.ruf.wer) def.team.push(def.ruf.wer);
            angriff = { t: 0, dauer: 0.7, fertig: false, x: 260, von: '' }; });
        }
        if (rufBtn && t > rufBis) { rufBtn.remove(); rufBtn = null; sie += 2; text = def.ruf.sonst || 'Keiner ruft ihn.'; textT = 1.8; }
        if (!angriff || angriff.fertig && angriff.t > angriff.dauer + 0.8) { if (Math.random() < dt * (0.75 + (def.gegen ? 0.35 : 0))) angriff = { t: 0, dauer: 0.95 * zeitFaktor(), fertig: false, x: zufall(150, 370), von: def.gegen && Math.random() < 0.4 ? def.gegen : '' }; }
        if (angriff) { angriff.t += dt; if (!angriff.fertig && angriff.t >= angriff.dauer) { angriff.fertig = true; if (duck > 0 && offen <= 0) { ausgewichen++; text = 'Weggeduckt!'; } else { if (schutz.length && !angriff.von && offen <= 0) { const w = schutz.shift(); ausgewichen++; text = w + ' fängt den Ball für dich ab.'; } else { getroffen++; sie++; splat = 0.9; serie++; text = angriff.von ? angriff.von + ' trifft dich. Hart. Von der Seite.' : 'Treffer! Schnee im Kragen.'; if (serie >= 3) { serie = 0; bank = 10 * zeitFaktor(); text = 'Dreimal erwischt. Zehn Sekunden Bank.'; } } } textT = 1.2; } }
        // Mitspieler werfen ab und zu
        if (Math.random() < dt * 0.45 && def.team && def.team.length) { const m = def.team[Math.floor(Math.random() * def.team.length)], ziel = Math.floor(Math.random() * 3); baelle.push({ x0: zufall(60, 460), y0: 282, x1: koepfe[ziel].x + zufall(-8, 8), y1: 74, t: 0, dauer: 0.5, wer: m.name, ziel }); }
        // Die 7P1 trifft auch deine Leute – sonst steht es am Ende 47 : 0 (Jugend-Kritik: zu leicht)
        if (Math.random() < dt * 0.42 && def.team && def.team.length) { const m = def.team[Math.floor(Math.random() * def.team.length)], g = G[Math.floor(Math.random() * G.length)]; sie++; if (textT <= 0.2) { text = g.name + ' trifft ' + m.name + '.'; textT = 0.9; } }
        for (const b of baelle) {
          b.t += dt;
          if (!b.aus && b.t >= b.dauer) { b.aus = true; const q = koepfe[b.ziel];
            if (q && q.auf > 0.55) { q.bis = t; if (b.wer === 'ich') { treffer++; wir++; text = 'Treffer! ' + q.g.name + ' taucht ab.'; textT = 1.1; } else if (Math.random() < 0.5) { wir++; text = b.wer + ' trifft ' + q.g.name + '.'; textT = 1.1; } } }
        }
        while (baelle.length && baelle[0].aus && baelle[0].t > baelle[0].dauer + 0.3) baelle.shift();
        if (t >= ZEIT) { fertig = true; text = 'Es klingelt. ' + wir + ' : ' + sie + (wir >= sie ? '. Alle sind nass. Alle grinsen.' : '. Verloren. Nass sind trotzdem alle.'); textT = 3; setTimeout(() => { loesche(); ui.ebeneZu(); if (rufBtn) rufBtn.remove(); ok({ treffer, getroffen, ausgewichen, wuerfe, stand: [wir, sie], ruf: rufGenutzt, rufDa }); }, 2400); }
      }
      // Bild: Himmel, Hof mit Schnee, drei Wälle
      x.fillStyle = '#dfe9f3'; x.fillRect(0, 0, 520, 300); x.fillStyle = '#f7fbff'; x.fillRect(0, 120, 520, 180);
      for (const q of koepfe) {
        const y = q.y - 22 * q.auf; x.fillStyle = q.g.farbe; x.beginPath(); x.arc(q.x, y, 15, 0, 7); x.fill();
        x.fillStyle = '#fff'; x.font = 'bold 11px system-ui'; x.fillText(q.g.name[0], q.x - 4, y + 4);
      }
      for (const wx of WALL) { x.fillStyle = '#ffffff'; x.strokeStyle = '#c9d6e4'; x.lineWidth = 2; x.beginPath(); x.ellipse(wx, 108, 62, 22, 0, Math.PI, 0); x.lineTo(wx + 62, 118); x.lineTo(wx - 62, 118); x.closePath(); x.fill(); x.stroke(); }
      for (const b of baelle) { if (b.aus) continue; const f = Math.min(1, b.t / b.dauer), bx = b.x0 + (b.x1 - b.x0) * f, by = b.y0 + (b.y1 - b.y0) * f - Math.sin(f * Math.PI) * 50; x.fillStyle = '#fff'; x.strokeStyle = '#9fb3c8'; x.beginPath(); x.arc(bx, by, b.wer === 'ich' ? 7 : 5, 0, 7); x.fill(); x.stroke(); }
      // eigener Wall unten, ducken = tiefer
      x.fillStyle = '#ffffff'; x.strokeStyle = '#c9d6e4'; x.beginPath(); x.ellipse(260, 300, 240, duck > 0 ? 70 : 46, 0, Math.PI, 0); x.fill(); x.stroke();
      if (angriff && !angriff.fertig) { const f = Math.min(1, angriff.t / angriff.dauer); x.strokeStyle = 'rgba(214,69,47,' + (0.35 + f * 0.6) + ')'; x.lineWidth = 8 + f * 6; x.strokeRect(4, 4, 512, 292); x.fillStyle = '#fff'; x.beginPath(); x.arc(angriff.x + (260 - angriff.x) * f, 110 + 140 * f, 5 + f * 9, 0, 7); x.fill(); }
      if (splat > 0) { x.fillStyle = 'rgba(255,255,255,' + Math.min(0.85, splat) + ')'; for (let i = 0; i < 7; i++) { x.beginPath(); x.arc(220 + Math.sin(i * 2.1) * 90, 170 + Math.cos(i * 1.7) * 60, 26 + (i % 3) * 10, 0, 7); x.fill(); } }
      x.fillStyle = 'rgba(27,29,38,.82)'; x.fillRect(190, 10, 140, 26); x.fillStyle = '#fff'; x.font = 'bold 15px system-ui'; x.fillText('7P2 ' + wir + ' : ' + sie + ' 7P1', 200, 28);
      x.fillStyle = '#3fa66b'; x.fillRect(10, 4, 500 * Math.max(0, 1 - t / ZEIT), 4);
      if (textT > 0) { textT -= dt; x.font = 'bold 14px system-ui'; const w = Math.min(500, x.measureText(text).width + 16); x.fillStyle = 'rgba(255,255,255,.95)'; x.fillRect(260 - w / 2, 236, w, 26); x.fillStyle = '#1b1d26'; x.fillText(text, 260 - w / 2 + 8, 254); }
      stand.textContent = 'Deine Treffer: ' + treffer + ' · weggeduckt: ' + ausgewichen + ' · erwischt: ' + getroffen;
      if (!fertig || textT > 0) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  });

  return ui;
}
