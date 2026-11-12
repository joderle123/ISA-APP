/* CREW – Partyspiele zu zweit an einem iPad (das iPad liegt zwischen euch, die obere Hälfte steht für die Person gegenüber
   auf dem Kopf): Gleicher Kopf?, Nicht zucken!, Fehler im Bild. Reine Spiele mit Uhr, Punkten und Crew-Rekord.
   Nebenbei geübt (nur im Lehrer-Finder): andere einschätzen, abwarten, genau hinsehen, fair verlieren. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;
  const P = () => CREW.party;

  /* Zwei Hälften + Mitte. → { wrap, oben, unten, mitte } */
  function duell(ctx, o) {
    const oben = h('div', { class: 'p-seite oben a', 'data-seite': 'a' });
    const unten = h('div', { class: 'p-seite b', 'data-seite': 'b' });
    const mitte = h('div', { class: 'p-mitte' });
    const wrap = ctx.scr([h('div', { class: 'p-duell' }, oben, mitte, unten)], Object.assign({ noPass: false }, o || {}));
    return { wrap, oben, unten, mitte, seite: { a: oben, b: unten } };
  }
  const leere = (el) => { while (el.firstChild) el.removeChild(el.firstChild); };
  const stand = (a, b) => h('span', { class: 'p-mittel' }, h('b', { style: { color: 'var(--teamA)' } }, String(a)), ' : ', h('b', { style: { color: 'var(--teamB)' } }, String(b)));

  /* ---------- Gleicher Kopf? ---------- */
  const GK_PAARE = [['Pizza', 'Döner'], ['Meer', 'Berge'], ['Hund', 'Katze'], ['Früh aufstehen', 'Lang aufbleiben'], ['Süß', 'Salzig'], ['Sommer', 'Winter'], ['Zocken', 'Draußen sein'],
    ['Film', 'Serie'], ['Rad', 'Roller'], ['Nutella', 'Marmelade'], ['Cola', 'Eistee'], ['Fußball', 'Basketball'], ['Pommes', 'Nudeln'], ['Zelt', 'Hotel'], ['Stadt', 'Dorf'],
    ['Kopfhörer', 'Lautsprecher'], ['Schwimmbad', 'See'], ['Burger', 'Sushi'], ['Fliegen können', 'Unsichtbar sein'], ['Nie mehr Musik', 'Nie mehr Handy'], ['Regen', 'Schnee'],
    ['Achterbahn', 'Riesenrad'], ['Chips', 'Schokolade'], ['Duschen', 'Baden'], ['Mütze', 'Kapuze'], ['Ketchup', 'Mayo'], ['Zug', 'Auto'], ['Ananas auf Pizza', 'Niemals'],
    ['Sneaker', 'Schlappen'], ['Gruppenarbeit', 'Allein arbeiten'], ['Sprachnachricht', 'Tippen'], ['Hell', 'Dunkel'], ['Scharf', 'Mild'], ['Frühstück', 'Abendessen'],
    ['Konzert', 'Kino'], ['Katzenvideo', 'Fail-Video'], ['Popcorn süß', 'Popcorn salzig'], ['Erster sein', 'Letzter sein'], ['Hausaufgaben sofort', 'Hausaufgaben nie'], ['Lift', 'Treppe'],
    ['Bus', 'Fahrrad'], ['Apfel', 'Banane'], ['Pfannkuchen', 'Waffeln'], ['Zelten', 'Sofa'], ['Schwimmen', 'Klettern'], ['Wecker', 'Ausschlafen'], ['Vorne sitzen', 'Hinten sitzen'],
    ['Kakao', 'Tee'], ['Mütze', 'Stirnband'], ['Lesen', 'Hörbuch'], ['Wald', 'Strand'], ['Rutsche', 'Schaukel'], ['Samstag', 'Sonntag'], ['Tiere', 'Technik'], ['Zeichnen', 'Bauen'],
    ['Frühling', 'Herbst'], ['Tisch decken', 'Abräumen'], ['Schnell', 'Gemütlich'], ['Allein zocken', 'Zusammen zocken'], ['Brettspiel', 'Kartenspiel']];
  CREW.registerGame({
    id: 'gleicher-kopf', template: 'T3', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Beide tippen gleichzeitig. Gleich getippt gibt einen Punkt. 60 Sekunden.' });
      const paare = ctx.rshuffle(GK_PAARE);
      const D = duell(ctx, { eyebrow: 'Blitz' });
      const bk = P().balken(ctx, 60, { auto: 0.7 });
      let aus = false; bk.promise.then(() => { aus = true; });
      let punkte = 0, serie = 0, besteSerie = 0;
      const zahl = h('span', { class: 'pill accent p-stand' }, '0 gleich');
      D.mitte.appendChild(bk.el); D.mitte.appendChild(zahl);
      for (let i = 0; !aus; i++) {
        const [x, y] = paare[i % paare.length];
        const wahl = { a: null, b: null };
        const fertig = new Promise((resolve) => {
          for (const s of ['a', 'b']) {
            const el = D.seite[s]; leere(el);
            const box = h('div', { class: 'p-wahl' });
            [x, y].forEach((t, k) => {
              const b = h('button', { type: 'button', 'data-k': String(k) }, t);
              b.addEventListener('pointerdown', (e) => { e.preventDefault(); if (wahl[s] !== null) return; wahl[s] = k; CREW.sound.play('tap'); leere(el); el.appendChild(h('b', { class: 'p-gross' }, '✓')); if (wahl.a !== null && wahl.b !== null) resolve(true); });
              box.appendChild(b);
            });
            el.appendChild(box);
          }
          if (ctx.auto) setTimeout(() => { wahl.a = Math.floor(ctx.autoRng() * 2); wahl.b = Math.floor(ctx.autoRng() * 2); resolve(true); }, 40);
        });
        const r = await Promise.race([bk.promise.then(() => 'zeit'), ctx.waitFor(fertig)]);
        if (r === 'zeit' || aus) break;
        if (r === ctx.SKIP) continue;
        const gleich = wahl.a === wahl.b;
        if (gleich) { punkte++; serie++; besteSerie = Math.max(besteSerie, serie); P().stempel(serie >= 3 ? serie + '× GLEICH!' : 'GLEICH!', 'gut'); } else { serie = 0; P().stempel('ANDERS', 'neutral'); }
        zahl.textContent = punkte + ' gleich';
        for (const s of ['a', 'b']) { leere(D.seite[s]); D.seite[s].appendChild(h('b', { class: 'p-mittel' }, [x, y][wahl[s]])); }
        await ctx.hold(700);
      }
      bk.stop();
      return P().ergebnis(punkte, 'mal gleich gedacht', { stats: [[punkte, 'mal gleich gedacht'], [besteSerie, 'gleich in Folge']] });
    },
  });

  /* ---------- Nicht zucken! ---------- */
  CREW.registerGame({
    id: 'nicht-zucken', template: 'T3', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Tippt erst bei GRÜN. Wer vorher zuckt, schenkt den Punkt her. Sieben Runden.' });
      const RUNDEN = 7;
      const D = duell(ctx, { eyebrow: 'Duell' });
      const pk = { a: 0, b: 0 };
      let best = null;
      const zeige = (klasse, text) => { for (const s of ['a', 'b']) { const el = D.seite[s]; el.className = 'p-seite ' + (s === 'a' ? 'oben a' : 'b') + ' ' + klasse; leere(el); el.appendChild(h('b', { class: 'p-gross' }, text)); } };
      const mitte = () => { leere(D.mitte); D.mitte.appendChild(stand(pk.a, pk.b)); };
      // wartet auf einen Tipp oder das Ende der Zeit: → { s: 'a'|'b' } oder null
      const tipp = (ms) => new Promise((resolve) => {
        let fertig = false;
        const ab = (v) => { if (fertig) return; fertig = true; for (const s of ['a', 'b']) D.seite[s].onpointerdown = null; resolve(v); };
        for (const s of ['a', 'b']) D.seite[s].onpointerdown = (e) => { e.preventDefault(); ab({ s }); };
        ctx.sleep(ms).then(() => ab(null), () => ab(null));
      });
      for (let r = 1; r <= RUNDEN; r++) {
        mitte();
        zeige('warte', 'Warte …');
        let gezuckt = await tipp(ctx.auto ? 30 : 1200 + ctx.rng() * 2400);
        if (!gezuckt && ctx.rng() < 0.4) {   // Falle: Rot heißt NICHT
          zeige('falle', 'NICHT!');
          gezuckt = await tipp(ctx.auto ? 20 : 500);
          if (!gezuckt) { zeige('warte', 'Warte …'); gezuckt = await tipp(ctx.auto ? 20 : 700 + ctx.rng() * 1500); }
        }
        if (gezuckt) {
          const andere = gezuckt.s === 'a' ? 'b' : 'a';
          pk[andere]++; CREW.sound.play('fail'); P().stempel('GEZUCKT!', 'schlecht');
          D.seite[andere].classList.add('sieg');
        } else {
          zeige('los', 'JETZT!'); CREW.sound.play('go');
          const t0 = performance.now();
          if (ctx.auto) setTimeout(() => { const el = D.seite[ctx.autoRng() < 0.5 ? 'a' : 'b']; if (el.onpointerdown) el.onpointerdown({ preventDefault() {} }); }, 25);
          const t = await tipp(ctx.auto ? 400 : 4000);
          if (t) {
            const ms = Math.round(performance.now() - t0);
            pk[t.s]++; if (best === null || ms < best) best = ms;
            D.seite[t.s].classList.add('sieg'); leere(D.seite[t.s]); D.seite[t.s].appendChild(h('b', { class: 'p-gross' }, ms + ' ms'));
            CREW.sound.play('good');
          }
        }
        mitte();
        await ctx.hold(1100);
      }
      const sieger = pk.a === pk.b ? 'Unentschieden' : (pk.a > pk.b ? 'Oben gewinnt' : 'Unten gewinnt');
      return P().ergebnis(best === null ? 999 : best, 'Millisekunden – schnellste Reaktion', { kleiner: true, summary: sieger, stats: [[pk.a, 'Punkte oben'], [pk.b, 'Punkte unten'], [best === null ? '–' : best, 'ms Bestzeit']] });
    },
  });

  /* ---------- Fehler im Bild ---------- */
  const FB_ZEICHEN = [['O', 'Q'], ['b', 'd'], ['6', '9'], ['E', 'F'], ['M', 'N'], ['p', 'q'], ['8', 'B'], ['C', 'G'], ['V', 'U'], ['5', 'S'], ['2', 'Z'], ['n', 'm'], ['i', 'j'], ['T', 'Y'], ['X', 'K'], ['W', 'M'], ['R', 'P'], ['3', '8'], ['a', 'o'], ['h', 'n']];
  CREW.registerGame({
    id: 'fehler-im-bild', template: 'T3', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Ein Zeichen ist anders. Wer es zuerst antippt, punktet. Falsch getippt: zwei Sekunden Pause.' });
      const ZIEL = 5, SP = 6, ZL = 4;
      const D = duell(ctx, { eyebrow: 'Duell' });
      const pk = { a: 0, b: 0 };
      let best = null;
      const paare = ctx.rshuffle(FB_ZEICHEN);
      for (let r = 0; pk.a < ZIEL && pk.b < ZIEL && r < 14; r++) {
        leere(D.mitte); D.mitte.appendChild(stand(pk.a, pk.b));
        const [viel, eins] = ctx.rng() < 0.5 ? paare[r % paare.length] : paare[r % paare.length].slice().reverse();
        const wo = Math.floor(ctx.rng() * SP * ZL);
        const gesperrt = { a: false, b: false };
        const t0 = performance.now();
        const fund = new Promise((resolve) => {
          for (const s of ['a', 'b']) {
            const el = D.seite[s]; el.className = 'p-seite ' + (s === 'a' ? 'oben a' : 'b'); leere(el);
            const g = h('div', { class: 'p-gitter', style: { gridTemplateColumns: 'repeat(' + SP + ', 1fr)' } });
            for (let i = 0; i < SP * ZL; i++) {
              const b = h('button', { type: 'button', 'data-i': String(i) }, i === wo ? eins : viel);
              b.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                if (gesperrt[s]) return;
                if (i === wo) { b.classList.add('treffer'); resolve(s); return; }
                gesperrt[s] = true; el.classList.add('gesperrt'); CREW.sound.play('fail');
                setTimeout(() => { gesperrt[s] = false; el.classList.remove('gesperrt'); }, 2000);
              });
              g.appendChild(b);
            }
            el.appendChild(g);
          }
          if (ctx.auto) setTimeout(() => resolve(ctx.autoRng() < 0.5 ? 'a' : 'b'), 40);
        });
        const s = await ctx.waitFor(fund);
        if (s === ctx.SKIP) continue;
        const sek = Math.round((performance.now() - t0) / 100) / 10;
        if (best === null || sek < best) best = sek;
        pk[s]++; D.seite[s].classList.add('sieg'); CREW.sound.play('good');
        P().stempel(sek + ' s', 'gut');
        await ctx.hold(900);
      }
      const sieger = pk.a === pk.b ? 'Unentschieden' : (pk.a > pk.b ? 'Oben gewinnt' : 'Unten gewinnt');
      return P().ergebnis(best === null ? 99 : best, 'Sekunden – schnellster Fund', { kleiner: true, summary: sieger, stats: [[pk.a, 'Punkte oben'], [pk.b, 'Punkte unten'], [best === null ? '–' : best, 'Sekunden Bestzeit']] });
    },
  });
})();
