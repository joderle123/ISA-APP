/* CREW – Partyspiele, zweite Staffel (ein iPad): Kritzel-Blitz, Verboten!, Ohne Worte, Tauziehen, Blink-Kette, Zehn Sekunden.
   Reine Spiele mit Uhr, Punkten und Crew-Rekord. Nebenbei geübt (nur im Lehrer-Finder): erklären ohne das naheliegende
   Wort, Körpersprache, sich etwas zusammen merken, Zeit einschätzen, fair gewinnen und verlieren. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;
  const P = () => CREW.party;
  const ui = () => CREW.ui;
  const leere = (el) => { while (el.firstChild) el.removeChild(el.firstChild); };

  /* Karten-Runde: Eine Person hält das iPad. Die Karte wechselt per Knopf, die Uhr läuft durch.
     o: { karten, sekunden, zeige(karte) → Element, eyebrow, badge, jaText, neinText, strafe } → { ok, weiter } */
  async function kartenRunde(ctx, o) {
    const platz = h('div', { class: 'p-platz' });
    const zahl = P().stand('0 erraten');
    const reihe = h('div', { class: 'p-knopfreihe' });
    const w = ctx.scr([platz, reihe], { eyebrow: o.eyebrow, center: true, badge: zahl, noPass: true });
    const bk = P().balken(ctx, o.sekunden, { auto: 0.5 });
    w.insertBefore(bk.el, platz);
    let i = 0, ok = 0, weiter = 0, aus = false;
    const zeig = () => { leere(platz); platz.appendChild(o.zeige(o.karten[i % o.karten.length])); };
    const tipp = (gut) => {
      if (aus) return;
      if (gut) { ok++; CREW.sound.play('good'); } else { weiter++; CREW.sound.play('whoosh'); }
      zahl.textContent = ok + ' erraten';
      i++; zeig();
    };
    reihe.appendChild(ui().btn(o.jaText || 'Erraten!', () => tipp(true), { big: true, icon: 'check', id: 'btn-erraten' }));
    reihe.appendChild(ui().btn(o.neinText || 'Weiter', () => tipp(false), { variant: 'ghost', id: 'btn-ueberspringen' }));
    zeig();
    if (ctx.auto) setTimeout(() => { tipp(true); tipp(false); tipp(true); }, 40);
    const r = await ctx.waitFor(bk.promise);
    aus = true; bk.stop();
    if (r !== ctx.SKIP) P().stempel('ZEIT UM!', 'neutral');
    return { ok, weiter, n: i };
  }
  /* Alle der Reihe nach: Deckblatt → Karten-Runde → weitergeben. → Summe der erratenen Karten */
  async function reihum(ctx, o) {
    const n = await P().anzahl(ctx, 2, 6, 'Wie viele sind dran?');
    const karten = ctx.rshuffle(o.karten);
    let summe = 0, von = 0;
    for (let p = 0; p < n; p++) {
      const c = await ctx.T.cover({ who: 'Person ' + (p + 1) + ' ' + o.verb, hint: o.hint, label: 'Los!' });
      if (c === ctx.SKIP) continue;
      const r = await kartenRunde(ctx, { karten: karten.slice(von).concat(karten.slice(0, von)), sekunden: o.sekunden, zeige: o.zeige, eyebrow: 'Person ' + (p + 1) + ' / ' + n, neinText: o.neinText });
      von = (von + r.n) % karten.length; summe += r.ok;
      const w2 = ctx.scr([P().karte('Person ' + (p + 1), r.ok + ' erraten', h('p', { class: 'muted' }, 'Zusammen: ' + summe))], { eyebrow: 'Zwischenstand', center: true, noPass: true });
      await ctx.next(w2, p < n - 1 ? 'iPad weitergeben' : 'Fertig');
    }
    return summe;
  }

  /* ---------- Verboten! ---------- */
  const VB = [['Pizza', 'Käse', 'Italien', 'rund'], ['Handy', 'telefonieren', 'Bildschirm', 'App'], ['Schule', 'Lehrer', 'lernen', 'Klasse'], ['Fußball', 'Tor', 'Ball', 'schießen'],
    ['Zahnbürste', 'Zähne', 'putzen', 'Bad'], ['Regenschirm', 'Regen', 'nass', 'aufspannen'], ['Geburtstag', 'Kuchen', 'Geschenk', 'feiern'], ['Kopfhörer', 'Musik', 'Ohren', 'hören'],
    ['Fahrrad', 'Räder', 'treten', 'Helm'], ['Schwimmbad', 'Wasser', 'schwimmen', 'Rutsche'], ['Wecker', 'aufstehen', 'klingeln', 'morgens'], ['Döner', 'Fleisch', 'Brot', 'Soße'],
    ['Zug', 'Bahnhof', 'Schienen', 'fahren'], ['Hund', 'bellen', 'Leine', 'Tier'], ['Eis', 'kalt', 'Kugel', 'Sommer'], ['Brille', 'Augen', 'sehen', 'Nase'],
    ['Rucksack', 'tragen', 'Rücken', 'Tasche'], ['Pause', 'Schulhof', 'Klingel', 'essen'], ['Winter', 'Schnee', 'kalt', 'Jacke'], ['Kino', 'Film', 'Popcorn', 'Leinwand'],
    ['Aufzug', 'Knopf', 'hoch', 'Stockwerk'], ['Gitarre', 'Saiten', 'Musik', 'spielen'], ['Zelt', 'campen', 'schlafen', 'draußen'], ['Ketchup', 'rot', 'Pommes', 'Tomate'],
    ['Bibliothek', 'Bücher', 'leise', 'ausleihen'], ['Astronaut', 'Weltall', 'Rakete', 'Mond'], ['Friseur', 'Haare', 'schneiden', 'Schere'], ['Skateboard', 'Rollen', 'Brett', 'Trick'],
    ['Spiegel', 'sehen', 'Bad', 'Gesicht'], ['Kühlschrank', 'kalt', 'Essen', 'Küche'], ['Ampel', 'rot', 'grün', 'Straße'], ['Trampolin', 'springen', 'hoch', 'Netz'],
    ['Pirat', 'Schiff', 'Schatz', 'Augenklappe'], ['Passwort', 'geheim', 'Handy', 'eingeben'], ['Mücke', 'stechen', 'jucken', 'summen'], ['Hausaufgaben', 'Schule', 'zu Hause', 'machen'],
    ['Regenbogen', 'Farben', 'Regen', 'Sonne'], ['Zahnarzt', 'Zähne', 'bohren', 'Arzt'], ['Schlüssel', 'Tür', 'aufschließen', 'Schloss'], ['Taschenlampe', 'Licht', 'dunkel', 'Batterie'],
    ['Achterbahn', 'schnell', 'Freizeitpark', 'Looping'], ['Pinguin', 'Eis', 'Vogel', 'schwarz'], ['Bäcker', 'Brot', 'Brötchen', 'backen'], ['Feuerwehr', 'Feuer', 'löschen', 'rot'],
    ['Stau', 'Autos', 'Autobahn', 'warten'], ['Mülltonne', 'wegwerfen', 'Abfall', 'stinken'], ['Kissen', 'Bett', 'weich', 'Kopf'], ['Spinne', 'Netz', 'acht', 'Beine'],
    ['Schere', 'schneiden', 'Papier', 'scharf'], ['Dusche', 'Wasser', 'waschen', 'Bad'], ['Geheimnis', 'verraten', 'niemand', 'sagen'], ['Ferien', 'Schule', 'frei', 'Urlaub'],
    ['Stadion', 'Fußball', 'Fans', 'Spiel'], ['Lagerfeuer', 'Holz', 'brennen', 'Marshmallow'], ['Selfie', 'Foto', 'Handy', 'Gesicht'], ['Bushaltestelle', 'Bus', 'warten', 'Fahrplan'],
    ['Gänsehaut', 'kalt', 'Haut', 'Angst'], ['Zwilling', 'gleich', 'Geschwister', 'zwei'], ['Kaugummi', 'kauen', 'Blase', 'kleben'], ['Lieblingslied', 'Musik', 'hören', 'singen']];
  CREW.registerGame({
    id: 'verboten', template: 'T5', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Erklär das Wort oben. Die drei roten Wörter darfst du nicht sagen. 45 Sekunden pro Person.' });
      const summe = await reihum(ctx, { karten: VB, sekunden: 45, verb: 'erklärt', hint: 'Halte das iPad so, dass nur du es siehst.', neinText: 'Verbotenes gesagt – weiter',
        zeige: (k) => P().karte('Erklär', k[0], h('div', { class: 'p-verboten' }, k.slice(1).map((v) => h('span', null, v)))) });
      return P().ergebnis(summe, 'Wörter erraten');
    },
  });

  /* ---------- Ohne Worte ---------- */
  const OW = ['Zähne putzen', 'Einen Pfannkuchen wenden', 'Im Bus stehen, der bremst', 'Eine Mücke jagen', 'Einen Hund baden', 'Auf Eis laufen', 'Ein Selfie machen', 'Angeln', 'Einen Schrank aufbauen',
    'Spaghetti essen', 'Einen Drachen steigen lassen', 'Im Regen ohne Schirm', 'Gewichte heben', 'Ein Baby wickeln', 'Auf heißem Sand laufen', 'Ein Zelt aufbauen', 'Tischtennis spielen',
    'Den Bus verpassen', 'Einen Luftballon aufblasen', 'In eine Zitrone beißen', 'Schlittschuh laufen', 'Einen Koffer zukriegen', 'Popcorn im Kino essen', 'Ein Pferd reiten', 'Fenster putzen',
    'Im Dunkeln den Lichtschalter suchen', 'Karaoke singen', 'Eine Katze streicheln, die nicht will', 'Schlafwandeln', 'Einen Torwart spielen', 'Rasen mähen', 'Etwas Scharfes essen',
    'Auf dem Handy tippen und stolpern', 'Eine Achterbahn fahren', 'Einen Schneemann bauen', 'Haare föhnen', 'Ein Geschenk auspacken', 'Kaugummi vom Schuh kratzen', 'Surfen', 'Einen Wecker ausmachen',
    'Schuhe binden', 'Eine heiße Kartoffel halten', 'Auf einen Bus warten, der nicht kommt', 'Im Sturm einen Schirm halten', 'Einen Schrank schieben', 'Seilspringen',
    'Einen Fisch halten, der zappelt', 'Auf Zehenspitzen schleichen', 'Ein Kartenhaus bauen', 'Eine Spinne entdecken', 'Kopfhörer entwirren', 'Trampolin springen',
    'Einen schweren Rucksack tragen', 'Ein Eis essen, das tropft', 'Gegen eine Glastür laufen', 'Eine Sprachnachricht aufnehmen', 'Auf Glatteis ausrutschen', 'Einen Luftballon platzen lassen',
    'Den Wecker überhören', 'Eine Mütze gegen den Wind festhalten'];
  CREW.registerGame({
    id: 'ohne-worte', template: 'T5', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Spiel vor, was auf der Karte steht – ohne ein Wort, ohne Geräusch. 45 Sekunden pro Person.' });
      const summe = await reihum(ctx, { karten: OW, sekunden: 45, verb: 'spielt vor', hint: 'Lies die Karte heimlich. Dann leg das iPad vor dich.', neinText: 'Zu schwer – weiter',
        zeige: (k) => P().karte('Spiel vor', k, null, { mittel: true }) });
      return P().ergebnis(summe, 'Karten erraten');
    },
  });

  /* ---------- Kritzel-Blitz ---------- */
  const KB = ['Giraffe', 'Fahrrad', 'Pizza', 'Leuchtturm', 'Kaktus', 'Rakete', 'Schnecke', 'Brille', 'Gitarre', 'Hubschrauber', 'Schneemann', 'Krone', 'Elefant', 'Regenschirm', 'Burger', 'Pinguin',
    'Spinne', 'Zahnbürste', 'Segelboot', 'Vulkan', 'Kopfhörer', 'Schmetterling', 'Leiter', 'Eis am Stiel', 'Dinosaurier', 'Fußballtor', 'Wecker', 'Banane', 'Krokodil', 'Zelt', 'Roboter',
    'Sonnenbrille', 'Baumhaus', 'Qualle', 'Trompete', 'Riesenrad', 'Schlüssel', 'Hai', 'Ampel', 'Skateboard',
    'Schere', 'Trampolin', 'Kerze', 'Pilz', 'Wal', 'Brücke', 'Kamel', 'Windrad', 'Rucksack', 'Anker', 'Igel', 'Brezel', 'Burg', 'Gewitterwolke', 'Kran', 'Flamingo', 'Schlitten',
    'Lokomotive', 'Mikrofon', 'Fallschirm'];
  function leinwand(ctx) {
    // am Handy (hochkant) eine fast quadratische Fläche, sonst quer
    const schmal = window.innerWidth < 700;
    const c = h('canvas', { class: 'p-leinwand' + (schmal ? ' schmal' : ''), id: 'kb-leinwand', width: schmal ? '600' : '900', height: schmal ? '640' : '520', 'aria-label': 'Zeichenfläche' });
    const g = c.getContext('2d');
    const putzen = () => { g.fillStyle = '#fffdf6'; g.fillRect(0, 0, c.width, c.height); };
    putzen();
    g.lineCap = 'round'; g.lineJoin = 'round'; g.lineWidth = schmal ? 8 : 7; g.strokeStyle = '#1b1d26';
    let an = false, striche = 0;
    const ort = (e) => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * c.width / r.width, (e.clientY - r.top) * c.height / r.height]; };
    c.addEventListener('pointerdown', (e) => { e.preventDefault(); an = true; striche++; try { c.setPointerCapture(e.pointerId); } catch (x) { /* ohne Zeiger-Bindung geht es auch */ } const [x, y] = ort(e); g.beginPath(); g.moveTo(x, y); g.lineTo(x + 0.1, y + 0.1); g.stroke(); });
    c.addEventListener('pointermove', (e) => { if (!an) return; e.preventDefault(); const [x, y] = ort(e); g.lineTo(x, y); g.stroke(); });
    const ende = () => { an = false; };
    c.addEventListener('pointerup', ende); c.addEventListener('pointercancel', ende);
    return { el: c, putzen: () => { putzen(); striche = 0; }, striche: () => striche };
  }
  CREW.registerGame({
    id: 'kritzel-blitz', template: 'T5', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Eine Person zeichnet ein geheimes Wort mit dem Finger. Die Crew rät laut. 40 Sekunden.' });
      const n = await P().anzahl(ctx, 2, 6, 'Wie viele zeichnen?');
      const woerter = ctx.rshuffle(KB);
      let erraten = 0;
      for (let p = 0; p < n; p++) {
        const wort = woerter[p % woerter.length];
        const g = await P().geheim(ctx, 'Person ' + (p + 1) + ' zeichnet', P().karte('Zeichne', wort, h('p', { class: 'muted' }, 'Keine Buchstaben, keine Zahlen.')), { label: 'Gemerkt – los geht’s' });
        if (g === ctx.SKIP) continue;
        const L = leinwand(ctx);
        const w = ctx.scr([L.el], { eyebrow: 'Bild ' + (p + 1) + ' / ' + n, badge: P().stand(erraten + ' erraten'), noPass: true });
        const a = await P().zeitOderKnopf(ctx, w, 40, [{ label: 'Erraten!', value: 'ok', icon: 'check', id: 'btn-erraten' }, { label: 'Neu anfangen', value: 'neu', variant: 'ghost', id: 'btn-neu', auto: false }], { auto: 0.4 });
        // „Neu anfangen“ wischt nur die Fläche – die Uhr fängt dabei nicht neu an (ein zweiter Knopfdruck zählt als Ende)
        let ergebnis = a;
        if (a === 'neu') { L.putzen(); const w3 = ctx.scr([L.el], { eyebrow: 'Bild ' + (p + 1) + ' / ' + n, badge: P().stand(erraten + ' erraten'), noPass: true }); ergebnis = await P().zeitOderKnopf(ctx, w3, 25, [{ label: 'Erraten!', value: 'ok', icon: 'check', id: 'btn-erraten' }], { auto: 0.3 }); }
        if (ergebnis === 'ok') { erraten++; P().stempel('ERRATEN!', 'gut'); } else if (ergebnis !== ctx.SKIP) P().stempel('ZEIT UM!', 'schlecht');
        const w2 = ctx.scr([P().karte('Es war', wort, null)], { eyebrow: 'Auflösung', center: true, noPass: true });
        await ctx.next(w2, p < n - 1 ? 'Nächste Person zeichnet' : 'Fertig');
      }
      return P().ergebnis(erraten, 'von ' + n + ' Bildern erraten');
    },
  });

  /* ---------- Tauziehen (zu zweit, iPad liegt in der Mitte) ---------- */
  CREW.registerGame({
    id: 'tauziehen', template: 'T3', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Tippt so schnell ihr könnt auf eure Seite. Wer das Tau zu sich zieht, gewinnt. Drei Runden.' });
      const ZIEL = 14, RUNDEN = 3;
      const oben = h('div', { class: 'p-seite oben a' }), unten = h('div', { class: 'p-seite b' });
      const knoten = h('i', { class: 'p-tau-knoten' });
      const tau = h('div', { class: 'p-tau' }, knoten);
      const anzeige = h('span', { class: 'p-mittel' }, '0 : 0');
      const mitte = h('div', { class: 'p-mitte' }, anzeige);
      ctx.scr([h('div', { class: 'p-duell p-tau-feld' }, oben, mitte, unten, tau)], { eyebrow: 'Duell', noPass: true });
      const siege = { a: 0, b: 0 };
      let schnellste = Infinity;
      for (let r = 0; r < RUNDEN && siege.a < 2 && siege.b < 2; r++) {
        let pos = 0, laeuft = false, t0 = 0, sieger = null, fertig = null;
        const ende = new Promise((res) => { fertig = res; });
        const stell = () => { knoten.style.top = (50 + (pos / ZIEL) * 44) + '%'; };
        stell();
        const zieh = (s) => (e) => {
          if (e) e.preventDefault();
          if (!laeuft || sieger) return;
          pos += s === 'a' ? -1 : 1; stell(); CREW.sound.play('tick');
          if (Math.abs(pos) >= ZIEL) { sieger = pos < 0 ? 'a' : 'b'; fertig(sieger); }
        };
        for (const [el, s] of [[oben, 'a'], [unten, 'b']]) {
          leere(el); el.className = 'p-seite ' + (s === 'a' ? 'oben a' : 'b') + ' warte';
          el.appendChild(h('b', { class: 'p-gross' }, 'Bereit?'));
          el.onpointerdown = zieh(s);
        }
        for (const z of ['3', '2', '1']) { P().stempel(z, 'neutral'); await ctx.hold(ctx.auto ? 30 : 750); }
        if (!ctx.alive()) return P().ergebnis(0, 'Sekunden');
        P().stempel('ZIEHT!', 'gut');
        for (const el of [oben, unten]) { el.classList.remove('warte'); el.classList.add('los'); el.firstChild.textContent = 'TIPPEN!'; }
        laeuft = true; t0 = performance.now();
        if (ctx.auto) { const seite = ctx.autoRng() < 0.5 ? 'a' : 'b'; for (let k = 0; k < ZIEL; k++) zieh(seite)(null); }
        const s = await ctx.waitFor(ende);
        laeuft = false;
        if (s === ctx.SKIP) break;
        const sek = Math.round((performance.now() - t0) / 100) / 10;
        if (!ctx.auto) schnellste = Math.min(schnellste, sek); else schnellste = Math.min(schnellste, 9.9);
        siege[s]++;
        anzeige.textContent = siege.a + ' : ' + siege.b;
        (s === 'a' ? oben : unten).classList.add('sieg');
        (s === 'a' ? oben : unten).firstChild.textContent = 'GEWONNEN!';
        (s === 'a' ? unten : oben).firstChild.textContent = 'Knapp!';
        CREW.sound.play('great');
        await ctx.hold(1400);
        oben.classList.remove('sieg'); unten.classList.remove('sieg');
      }
      oben.onpointerdown = null; unten.onpointerdown = null;
      const sek = Number.isFinite(schnellste) ? schnellste : 0;
      return P().ergebnis(sek, 'Sekunden – schnellster Sieg', { kleiner: true, stats: [[siege.a + ' : ' + siege.b, 'Endstand'], [String(sek).replace('.', ','), 'Sekunden – schnellster Sieg']] });
    },
  });

  /* ---------- Blink-Kette ---------- */
  const BK_FARBEN = ['var(--teamA)', 'var(--yellow)', 'var(--good)', 'var(--teamB)'];
  CREW.registerGame({
    id: 'blink-kette', template: 'T5', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Merkt euch die Reihenfolge und tippt sie nach. Jede Runde eine Farbe mehr – und eine andere Person tippt.' });
      const felder = BK_FARBEN.map((f, i) => h('button', { type: 'button', class: 'p-blink', 'data-i': String(i), style: { '--f': f }, 'aria-label': 'Feld ' + (i + 1) }));
      const ansage = h('p', { class: 'p-mittel', id: 'bk-ansage' }, 'Schaut genau hin …');
      const zahl = P().stand('Kette 0');
      ctx.scr([ansage, h('div', { class: 'p-blink-feld' }, felder)], { eyebrow: 'Zusammen', center: true, badge: zahl, noPass: true });
      const kette = [];
      const blink = async (i, ms) => { felder[i].classList.add('an'); CREW.sound.play('pad' + i); await ctx.hold(ms); felder[i].classList.remove('an'); await ctx.hold(ctx.auto ? 5 : 140); };
      let geschafft = 0, person = 0;
      for (;;) {
        kette.push(Math.floor(ctx.rng() * 4));
        if (kette.length < 2) kette.push(Math.floor(ctx.rng() * 4));
        felder.forEach((f) => { f.disabled = true; });
        ansage.textContent = 'Schaut genau hin …';
        await ctx.hold(ctx.auto ? 10 : 700);
        const tempo = Math.max(260, 560 - kette.length * 22);
        for (const k of kette) { if (!ctx.alive()) return P().ergebnis(geschafft, 'Farben am Stück gemerkt'); await blink(k, ctx.auto ? 5 : tempo); }
        person++;
        ansage.textContent = 'Person ' + (((person - 1) % 6) + 1) + ' tippt nach';
        let stelle = 0, fertig = null;
        const runde = new Promise((res) => { fertig = res; });
        felder.forEach((f, i) => {
          f.disabled = false;
          f.onclick = () => {
            f.classList.add('an'); setTimeout(() => f.classList.remove('an'), 160); CREW.sound.play('pad' + i);
            if (kette[stelle] !== i) { fertig(false); return; }
            stelle++; if (stelle === kette.length) fertig(true);
          };
        });
        // Probelauf: bis Kette 4 richtig, dann ein Fehler
        if (ctx.auto) setTimeout(() => { if (kette.length <= 4) kette.forEach((k) => felder[k].click()); else felder[(kette[0] + 1) % 4].click(); }, 30);
        const ok = await ctx.waitFor(runde);
        felder.forEach((f) => { f.onclick = null; f.disabled = true; });
        if (ok === ctx.SKIP) break;
        if (!ok) { P().stempel('FALSCH!', 'schlecht'); P().wackeln(); await ctx.hold(900); break; }
        geschafft = kette.length; zahl.textContent = 'Kette ' + geschafft;
        P().stempel(geschafft + ' GEMERKT!', 'gut');
        await ctx.hold(ctx.auto ? 20 : 900);
      }
      return P().ergebnis(geschafft, 'Farben am Stück gemerkt');
    },
  });

  /* ---------- Zehn Sekunden ---------- */
  CREW.registerGame({
    id: 'zehn-sekunden', template: 'T5', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Stopp die Uhr bei genau 10 Sekunden. Nach drei Sekunden verschwindet die Anzeige. Wer ist am nächsten dran?' });
      const n = await P().anzahl(ctx, 2, 8, 'Wie viele stoppen?');
      const werte = [];
      for (let p = 0; p < n; p++) {
        const uhr = h('b', { class: 'p-zahl', id: 'zs-uhr' }, '0,0');
        const w = ctx.scr([P().karte('Person ' + (p + 1), 'Ziel: 10,0 Sekunden', uhr, { mittel: true })], { eyebrow: 'Versuch ' + (p + 1) + ' / ' + n, center: true, noPass: true });
        const s = await ctx.ask(w, [{ label: 'Start', value: 'go', icon: 'play', id: 'btn-start' }]);
        if (s === ctx.SKIP) continue;
        const t0 = performance.now();
        const iv = setInterval(() => { const t = (performance.now() - t0) / 1000; uhr.textContent = t < 3 ? t.toFixed(1).replace('.', ',') : '?,?'; }, 50);
        ctx.onCleanup(() => clearInterval(iv));
        const w2 = ctx.scr([P().karte('Person ' + (p + 1), 'Ziel: 10,0 Sekunden', uhr, { mittel: true })], { eyebrow: 'Die Uhr läuft', center: true, noPass: true });
        const a = await ctx.ask(w2, [{ label: 'STOPP!', value: 'stop', id: 'btn-stopp' }]);
        clearInterval(iv);
        if (a === ctx.SKIP) continue;
        const t = ctx.auto ? 8.5 + ctx.autoRng() * 3 : (performance.now() - t0) / 1000;
        const diff = Math.round(Math.abs(t - 10) * 100) / 100;
        werte.push({ p: p + 1, t, diff });
        const text = t.toFixed(2).replace('.', ',') + ' s';
        P().stempel(diff <= 0.15 ? 'PERFEKT!' : diff <= 0.6 ? 'NAH DRAN' : t < 10 ? 'ZU FRÜH' : 'ZU SPÄT', diff <= 0.6 ? 'gut' : 'neutral');
        const w3 = ctx.scr([P().karte('Person ' + (p + 1) + ' hat gestoppt bei', text, h('p', { class: 'p-mittel' }, String(diff.toFixed(2)).replace('.', ',') + ' daneben'))], { eyebrow: 'Auflösung', center: true, noPass: true });
        await ctx.next(w3, p < n - 1 ? 'Nächste Person' : 'Fertig');
      }
      if (!werte.length) return P().ergebnis(0, 'Sekunden daneben', { kleiner: true });
      werte.sort((a, b) => a.diff - b.diff);
      const best = werte[0];
      return P().ergebnis(best.diff, 'Sekunden daneben (beste Person)', { kleiner: true, stats: [[String(best.diff.toFixed(2)).replace('.', ','), 'Sekunden daneben – Person ' + best.p], [werte.length, 'Versuche']] });
    },
  });
})();
