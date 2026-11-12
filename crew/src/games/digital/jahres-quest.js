/* Spiel „Jahres-Quest“ (Thema: Digital, Gesundheit & Abschluss) · Vorlage T3 Zu zweit an einem iPad · j1-e30
   Das Abschlussspiel des Jahres. Neu (Lücke Rückblick): Die 30 Einheiten als Weg über acht Inseln (die acht Themen)
   mit den Crew-Stempeln aus dem HQ (jedes gespielte Spiel = ein Stempel). Das Paar läuft den Weg ab und tippt pro
   Insel ein Andenken an: einen Moment, ein Spiel oder einen Skill, der hängen geblieben ist (kein neuer Stoff,
   „weiß nicht“ geht immer). Level 2: Euer Jahr in Zahlen und der Crew-Moment des Jahres (zwei Finger).
   Level 3, solo: „Welche drei Skills kommen mit in den Sommer?“ als Postkarte „Grüße aus 2031“, dazu die
   Sommer-Notfallkarte mit Hilfenummern. Finale: Abspann mit dem HQ der Crew. Nichts wird gespeichert
   (nur der Sticker dieses Spiels, wie bei allen Spielen). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Der Weg', 'Unser Jahr', 'Postkarte 2031'];
  /* Acht Inseln = acht Themen. units: die Einheiten j1-e01 … j1-e30 (jede genau einmal), momente aus den Stunden. */
  const INSELN = [
    { thema: 'ankommen', insel: 'Startbucht', icon: 'users', monat: 'Herbst', units: ['j1-e01', 'j1-e02', 'j1-e03'], momente: ['Den Crew-Vertrag unterschreiben', 'Das Kennenlern-Bingo', 'Blind geführt werden'] },
    { thema: 'ich', insel: 'Stärken-Insel', icon: 'star', units: ['j1-e04', 'j1-e05', 'j1-e06'], momente: ['Das Glas der Bedürfnisse', 'Laut und leise in der Galerie', 'Der Baum der Stärke'] },
    { thema: 'gefuehle', insel: 'Gefühls-Berge', icon: 'heart', units: ['j1-e07', 'j1-e08', 'j1-e09', 'j1-e10'], momente: ['Die Gefühls-Mindmap', 'Der Film mit dem Steuerpult', 'Gefühlsstatuen bauen'] },
    { thema: 'skills', insel: 'Skill-Wald', icon: 'leaf', monat: 'Winter', units: ['j1-e11', 'j1-e12', 'j1-e13', 'j1-e14', 'j1-e15'], momente: ['Die Linie im Raum: 0 bis 100', 'Der Skills-Tester', 'Der eigene Skills-Koffer'] },
    { thema: 'gedanken', insel: 'Gedanken-Leuchtturm', icon: 'sparkle', units: ['j1-e16', 'j1-e17', 'j1-e18', 'j1-e19'], momente: ['Situation, Gedanke, Gefühl, Verhalten', 'Der kritische Detektiv', 'Die Beweis-Challenge'] },
    { thema: 'kommunikation', insel: 'Funk-Station', icon: 'chat', monat: 'Frühling', units: ['j1-e20', 'j1-e21', 'j1-e22', 'j1-e23'], momente: ['Die Emoji-Übung', 'Die Ich-Botschaft-Formel', 'Die drei Stopps'] },
    { thema: 'konflikt', insel: 'Friedensbrücke', icon: 'shield', units: ['j1-e24', 'j1-e25', 'j1-e26'], momente: ['Die Konflikt-Tiere', 'Nein sagen im Rollenspiel', 'Die Zivilcourage-Leiter'] },
    { thema: 'digital', insel: 'Sommerhafen', icon: 'phone', monat: 'Sommer', units: ['j1-e27', 'j1-e28', 'j1-e29', 'j1-e30'], momente: ['Der Bildschirmzeit-Vergleich', 'Die Teilen-Bremse', 'Das Vier-Ecken-Spiel'] },
  ];
  // Knoten der Karte (viewBox 0 0 800 300)
  const KNOTEN = [[70, 222], [170, 108], [280, 206], [385, 92], [490, 204], [590, 98], [690, 210], [748, 88]];
  /* Der Rucksack für den Sommer: Skills aus dem Jahr (Skill-Karten des Kurses) */
  const RUCKSACK = [
    { id: 'runter', name: 'Runter unter 70', icon: 'leaf' }, { id: 'stand', name: 'Fester Stand', icon: 'user' },
    { id: 'stimme', name: 'Die freundliche Stimme', icon: 'heart' }, { id: 'schiff', name: 'Gedanken\u00ADschiffchen', icon: 'sparkle' },
    { id: 'anker', name: 'Anker vor dem Nein', icon: 'shield' }, { id: 'sinne', name: '5-4-3-2-1', icon: 'eye' },
    { id: 'ballon', name: 'Luftballon-Atem', icon: 'bolt' }, { id: 'handy', name: 'Drei Atemzüge vorm Handy', icon: 'phone' },
    { id: 'pult', name: 'Wer steht am Pult?', icon: 'star' }, { id: 'satz', name: 'Satz für schwere Tage', icon: 'chat' },
    { id: 'bremse', name: 'Teilen-Bremse', icon: 'right' }, { id: 'energie', name: 'Energie-Check', icon: 'target' },
  ];

  const S = () => CREW.state;
  const gespielt = (id) => !!(S().stickers && S().stickers[id]);
  const titelVon = (u) => { const e = (CREW.katalog.einheiten || []).find((x) => x.id === u); return e ? e.titel : u; };
  /* Andenken-Auswahl einer Insel: Momente, Spiele (gespielte zuerst), Skills aus der Didaktik der Spiele */
  function andenken(ins) {
    const t = CREW.katalog.themen.find((x) => x.id === ins.thema) || { spiele: [] };
    const gebaut = t.spiele.filter((id) => CREW.games.get(id));
    const spiele = gebaut.filter(gespielt).concat(gebaut.filter((id) => !gespielt(id))).slice(0, 3).map((id) => ({ art: 'spiel', id, t: CREW.games.get(id).name, stempel: gespielt(id) }));
    const D = (CREW.didaktik && CREW.didaktik.games) || {};
    const skills = Array.from(new Set(gebaut.map((id) => D[id] && D[id].skill).filter(Boolean))).slice(0, 3).map((s) => ({ art: 'skill', id: s, t: s }));
    return { momente: ins.momente.map((m) => ({ art: 'moment', id: m, t: m })), spiele, skills, stempel: t.spiele.filter(gespielt).map((id) => (CREW.games.get(id) || { name: id }).name) };
  }

  /* Die Karte: Weg mit acht Inseln, Andenken als Stempel, Token an der aktuellen Insel */
  function karte(ctx, aktuell, gewaehlt) {
    let d = 'M' + KNOTEN[0].join(' ');
    for (let i = 1; i < KNOTEN.length; i++) { const [x0, y0] = KNOTEN[i - 1], [x1, y1] = KNOTEN[i]; const mx = (x0 + x1) / 2; d += ` C${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`; }
    const svg = `<svg viewBox="0 0 800 300" aria-hidden="true"><defs><linearGradient id="jqsee" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b4b8f"/><stop offset="1" stop-color="#0f2f63"/></linearGradient></defs>
      <rect x="0" y="0" width="800" height="300" rx="22" fill="url(#jqsee)"/>
      ${Array.from({ length: 18 }, (_, i) => `<path d="M${(i * 47) % 780 + 10} ${(i * 83) % 260 + 20} q8 -6 16 0 q8 6 16 0" fill="none" stroke="#3d7bd1" stroke-width="2" opacity=".5"/>`).join('')}
      <path d="${d}" fill="none" stroke="#fff8ee" stroke-width="5" stroke-dasharray="2 14" stroke-linecap="round" opacity=".9"/>
      ${KNOTEN.map(([x, y], i) => `<g class="jq-insel${i < aktuell ? ' done' : i === aktuell ? ' now' : ''}"><ellipse cx="${x}" cy="${y + 10}" rx="44" ry="20" fill="#e8c27a"/><ellipse cx="${x}" cy="${y + 4}" rx="38" ry="18" fill="${i < aktuell ? '#2ee6c5' : '#5fbf6a'}"/><text x="${x}" y="${y + 42}" text-anchor="middle" class="jq-label">${INSELN[i].insel}</text>${INSELN[i].monat ? `<text x="${x}" y="${y - 30}" text-anchor="middle" class="jq-monat">${INSELN[i].monat}</text>` : ''}</g>`).join('')}
    </svg>`;
    const el = h('div', { class: 'jq-karte' + (aktuell >= KNOTEN.length ? ' gross' : '') }, h('div', { class: 'jq-svg', html: svg }));
    // Andenken-Stempel und Token als HTML über der Karte (Prozent-Koordinaten)
    KNOTEN.forEach(([x, y], i) => {
      const g = gewaehlt[i];
      if (g) el.appendChild(h('span', { class: 'jq-stempel', 'data-art': g.art, style: { left: (x / 8) + '%', top: ((y - 6) / 3) + '%' }, title: g.t }, CREW.icon(g.art === 'spiel' ? 'star' : g.art === 'skill' ? 'leaf' : g.art === 'moment' ? 'heart' : 'help', 16)));
      else el.appendChild(h('span', { class: 'jq-icon', style: { left: (x / 8) + '%', top: ((y - 6) / 3) + '%' } }, CREW.icon(INSELN[i].icon, 16)));
    });
    if (aktuell < KNOTEN.length) {
      const [x, y] = KNOTEN[Math.max(0, aktuell)];
      el.appendChild(h('span', { class: 'jq-token', style: { left: (x / 8) + '%', top: ((y - 34) / 3) + '%' } }, h('span', { class: 'jq-token-in' }, h('span', null, (S().crew && S().crew.name ? S().crew.name : 'Crew').slice(0, 1).toUpperCase()))));
    }
    return el;
  }

  /* Postkarte „Grüße aus 2031“ – nur auf dem Bildschirm */
  function postkarte(ctx, auswahl, wer) {
    const crew = (S().crew && S().crew.name) || 'Crew';
    return h('div', { class: 'jq-post' },
      h('div', { class: 'jq-post-l' },
        h('b', { class: 'jq-post-gruss' }, 'Grüße aus 2031!'),
        h('p', null, auswahl.length ? 'Ich hab mitgenommen:' : 'Was ich mitgenommen habe? Weiß ich noch nicht. Ist auch eine Antwort.'),
        auswahl.length ? h('div', { class: 'jq-post-icons' }, auswahl.map((s) => h('span', { class: 'jq-post-ic' }, CREW.icon(s.icon, 26), h('span', null, s.name)))) : null,
        h('p', { class: 'jq-post-ps' }, 'PS: Damals in der ' + crew + ' hat das angefangen.')),
      h('div', { class: 'jq-post-r' },
        h('div', { class: 'jq-marke' }, CREW.icon('star', 30), h('span', null, '2031')),
        h('div', { class: 'jq-post-an' }, h('span', null, 'An:'), h('b', null, wer), h('i'), h('i'))));
  }

  CREW.registerGame({
    id: 'jahres-quest',
    inseln: INSELN, rucksack: RUCKSACK, // für den Test
    template: 'T3',
    icon: 'trophy',
    themen: ['Rückblick', 'Skills als Ausrüstung', 'Zukunft', 'Abschied'],
    safety: ['freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Euer Jahr als Weg über acht Inseln. Zu zweit lauft ihr ihn ab und sammelt pro Insel ein Andenken. Am Ende schreibt jede:r eine Postkarte aus 2031.',
        levels: LEVELS,
        steps: [
          { icon: 'calendar', title: 'Der Weg', text: '30 Stunden, 8 Inseln: Moment, Spiel oder Skill?' },
          { icon: 'trophy', title: 'Unser Jahr', text: 'Eure Zahlen und der Crew-Moment des Jahres.' },
          { icon: 'star', title: 'Postkarte 2031', text: 'Drei Skills für den Sommer. „Weiß nicht“ geht.' },
        ],
        probe: ctx.T.probeCard('Probe: Was ist von heute Morgen hängen geblieben? Tippt irgendwas – zählt nicht.', [{ label: 'Ein Moment', value: 1, variant: 'ghost', icon: 'heart' }, { label: 'Weiß nicht', value: 2, variant: 'ghost', icon: 'help' }]),
      });
      // Level 1: Der Weg – acht Inseln, je ein Andenken
      const gewaehlt = [];
      let andenkenZahl = 0;
      for (let i = 0; i < INSELN.length; i++) {
        const ins = INSELN[i];
        const a = andenken(ins);
        let pick = null;
        const chipRow = (titel, icon, liste) => liste.length ? h('div', { class: 'stack', style: { gap: '6px' } }, h('span', { class: 'eyebrow' }, titel),
          h('div', { class: 'row', style: { gap: '8px' } }, liste.map((x) => {
            const c = h('button', { type: 'button', class: 'chip jq-chip', 'data-art': x.art }, CREW.icon(icon, 16), ' ' + x.t, x.stempel ? h('span', { class: 'jq-mini-stempel', title: 'Crew-Stempel: gespielt' }, '✓') : null);
            c.addEventListener('click', () => { CREW.sound.play('tap'); pick = pick === x ? null : x; wrap.querySelectorAll('.jq-chip').forEach((y) => y.classList.toggle('sel', y === c && !!pick)); });
            return c;
          }))) : null;
        const wrap = ctx.scr([
          karte(ctx, i, gewaehlt),
          h('div', { class: 'jq-station' },
            h('div', { class: 'jq-station-head' }, h('span', { class: 'jq-station-ic' }, CREW.icon(ins.icon, 26)),
              h('div', { class: 'stack', style: { gap: '2px', minWidth: 0 } }, h('span', { class: 'eyebrow' }, 'Insel ' + (i + 1) + ' von 8' + (ins.monat ? ' · ' + ins.monat : '')), h('b', { class: 'jq-station-name' }, ins.insel)),
              ctx.readBtn(ins.insel + '. Stunden: ' + ins.units.map(titelVon).join(', ') + '. Was ist hängen geblieben?')),
            h('p', { class: 'muted small', style: { margin: 0 } }, ins.units.map((u) => titelVon(u)).join(' · ')),
            a.stempel.length ? h('div', { class: 'row', style: { gap: '6px' } }, h('span', { class: 'small' }, 'Crew-Stempel:'), a.stempel.map((n) => h('span', { class: 'jq-stempel-chip' }, CREW.icon('check', 14), n))) : h('span', { class: 'muted small' }, 'Hier hat die Crew noch keinen Spiel-Stempel – Momente zählen genauso.'),
            h('b', null, 'Was ist hängen geblieben? Einigt euch auf eins.'),
            chipRow('Ein Moment', 'heart', a.momente), chipRow('Ein Spiel', 'star', a.spiele), chipRow('Ein Skill', 'leaf', a.skills)),
        ], { eyebrow: 'Der Weg · ' + ins.insel, step: i + 1, badge: ctx.stufe(1, LEVELS) });
        if (ctx.auto) { const cs = wrap.querySelectorAll('.jq-chip'); if (cs.length && ctx.autoRng() < 0.85) cs[Math.floor(ctx.autoRng() * cs.length)].click(); }
        const r = await ctx.ask(wrap, [{ label: 'Weiß nicht', value: 'weiss', variant: 'ghost', icon: 'help', id: 'jq-weiss', auto: false }, { label: i + 1 < INSELN.length ? 'Weiter zur nächsten Insel' : 'Ans Ziel', value: 'ok', iconRight: 'right', id: 'jq-weiter' }]);
        if (r === ctx.SKIP || r === 'weiss' || !pick) { gewaehlt.push({ art: 'weiss', t: 'weiß nicht' }); continue; }
        gewaehlt.push(pick); andenkenZahl++;
        CREW.sound.play('tick');
      }
      // Ziel erreicht: die ganze Karte mit allen Andenken
      const wz = ctx.scr([
        karte(ctx, INSELN.length, gewaehlt),
        h('div', { class: 'jq-andenken' }, gewaehlt.map((g, i) => h('div', { class: 'jq-and', 'data-art': g.art }, h('span', { class: 'muted small' }, INSELN[i].insel), h('b', null, g.t)))),
      ], { eyebrow: 'Der Weg · Ziel', badge: ctx.stufe(1, LEVELS) });
      CREW.sound.play('great');
      await ctx.next(wz, 'Unser Jahr');

      // Level 2: Unser Jahr in Zahlen + Crew-Moment des Jahres (zwei Finger)
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Euer Jahr in Zahlen – und dann wählt ihr den Crew-Moment des Jahres.' });
      const st = S();
      const stickerZahl = Object.keys(st.stickers || {}).length;
      const li = CREW.levelInfo(st.energy || 0);
      const teile = (st.hq && st.hq.owned ? st.hq.owned : []).map((n) => (CREW.base.items[n - 1] || {}).name).filter(Boolean);
      const zahlen = [
        { n: (st.history || []).length, t: 'Sessions zusammen' },
        { n: stickerZahl, t: 'Spiele mit Sticker' },
        { n: st.energy || 0, t: 'Energie gesammelt' },
        { n: li.level, t: li.level ? 'HQ-Level' : 'HQ-Level (Rohbau)' },
      ];
      const kandidaten = gewaehlt.filter((g) => g.art !== 'weiss');
      let crewMoment = null;
      const row = h('div', { class: 'row', style: { gap: '8px' } }, (kandidaten.length ? kandidaten : INSELN.map((x) => ({ art: 'moment', t: x.momente[0] }))).map((g) => {
        const c = h('button', { type: 'button', class: 'chip jq-chip', 'data-art': g.art }, g.t);
        c.addEventListener('click', () => { CREW.sound.play('tap'); crewMoment = g; row.querySelectorAll('.chip').forEach((y) => y.classList.toggle('sel', y === c)); });
        return c;
      }));
      if (ctx.auto) { const cs = row.querySelectorAll('.chip'); cs[Math.floor(ctx.autoRng() * cs.length)].click(); }
      const wj = ctx.scr([
        h('div', { class: 'jq-zahlen' }, zahlen.map((z) => h('div', { class: 'jq-zahl' }, h('b', { class: 'display' }, String(z.n)), h('span', null, z.t)))),
        h('div', { class: 'card stack' }, h('b', null, 'Euer HQ'), h('span', { class: 'muted small' }, teile.length ? teile.join(' · ') : 'Noch ein Rohbau – Platz für Staffel 2.')),
        h('div', { class: 'card stack' }, h('b', null, 'Crew-Moment des Jahres – einigt euch zu zweit:'), row),
      ], { eyebrow: 'Unser Jahr', badge: ctx.stufe(2, LEVELS) });
      if ((await ctx.T.twoFinger(wj, { label: 'Beide: Finger drauf', hint: 'Erst einen Moment wählen, dann zwei Finger.' })) !== ctx.SKIP && crewMoment) {
        const wm = ctx.scr([
          h('div', { class: 'jq-moment' }, CREW.icon('trophy', 44), h('span', { class: 'eyebrow' }, 'Crew-Moment des Jahres'), h('b', { class: 'display' }, crewMoment.t),
            h('p', { class: 'muted', style: { margin: 0 } }, 'Erzählt kurz: Was war da los? Wer will, sagt einen Satz. Pass ist okay.')),
        ], { eyebrow: 'Unser Jahr', center: true, badge: ctx.stufe(2, LEVELS) });
        CREW.sound.play('great');
        if (!ctx.fast) CREW.ui.confetti(60);
        await ctx.next(wm, 'Weiter');
      }

      // Level 3: Postkarte aus 2031 – solo, nacheinander, die andere Person schaut weg. Nichts wird gespeichert.
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Jetzt jede:r allein: Welche drei Skills kommen mit in den Sommer? Eine Postkarte aus 2031. Nichts wird gespeichert.' });
      let karten = 0;
      for (const seite of ['Links', 'Rechts']) {
        const c = await ctx.T.cover({ who: seite + ': Nur du schaust', hint: 'Die andere Person schaut weg. Deine Postkarte bleibt auf diesem Bildschirm – nichts wird gespeichert.', eyebrow: 'Postkarte · ' + seite, label: 'Ich bin bereit' });
        if (c === ctx.SKIP) continue;
        const sel = [];
        const pack = h('div', { class: 'jq-rucksack' }, RUCKSACK.map((s) => {
          const b = h('button', { type: 'button', class: 'jq-skill', 'data-skill': s.id }, CREW.icon(s.icon, 26), h('span', null, s.name));
          b.addEventListener('click', () => {
            const k = sel.indexOf(s);
            if (k >= 0) sel.splice(k, 1); else if (sel.length < 3) sel.push(s); else { CREW.ui.toast('Drei passen in den Rucksack.'); return; }
            CREW.sound.play('tap');
            pack.querySelectorAll('.jq-skill').forEach((x) => x.classList.toggle('sel', sel.some((y) => y.id === x.dataset.skill)));
          });
          return b;
        }));
        if (ctx.auto) pack.querySelectorAll('.jq-skill').forEach((b, i) => { if (i % 4 === 0) b.click(); });
        const wr = ctx.scr([
          ctx.say('Welche drei Skills kommen mit in den Sommer? Tipp bis zu drei an. „Weiß nicht“ ist auch eine Antwort.', { eyebrow: 'Dein Rucksack', small: true }),
          pack,
          ctx.safetyLine('freiwillig'),
        ], { eyebrow: 'Postkarte · ' + seite, badge: ctx.stufe(3, LEVELS) });
        const r = await ctx.ask(wr, [{ label: 'Weiß nicht', value: 'weiss', variant: 'ghost', icon: 'help', auto: false, id: 'jq-pk-weiss' }, { label: 'Postkarte schreiben', value: 'ok', iconRight: 'right', id: 'jq-pk-ok' }]);
        if (r === ctx.SKIP) continue;
        const auswahl = r === 'weiss' ? [] : sel.slice();
        karten++;
        const wp = ctx.scr([
          postkarte(ctx, auswahl, 'Mich, im Sommer'),
          h('div', { class: 'row center' }, ctx.readBtn('Grüße aus 2031! ' + (auswahl.length ? 'Ich hab mitgenommen: ' + auswahl.map((s) => s.name).join(', ') : 'Weiß ich noch nicht. Ist auch eine Antwort.'))),
        ], { eyebrow: 'Postkarte · ' + seite, center: true, badge: ctx.stufe(3, LEVELS) });
        CREW.sound.play('good');
        await ctx.next(wp, 'Karte umdrehen');
        // Rückseite: Sommer-Notfallkarte
        const wn = ctx.scr([
          h('div', { class: 'jq-notfall' },
            h('div', { class: 'row between' }, h('b', { class: 'jq-post-gruss' }, 'Sommer-Notfallkarte'), CREW.icon('heart', 28)),
            h('p', { style: { margin: 0 } }, auswahl.length ? 'Wenn es zu viel wird, hilft mir: ' + auswahl.map((s) => s.name).join(' · ') + (/[?!]$/.test(auswahl[auswahl.length - 1].name) ? '' : '.') : 'Wenn es zu viel wird: erst runterkommen, dann reden.'),
            h('p', { class: 'muted small', style: { margin: 0 } }, 'Und wenn das nicht reicht: Reden hilft. Auch in den Ferien.')),
          ctx.helpCard({ title: 'Auch im Sommer erreichbar', text: 'Anonym und kostenlos. Notruf: 112 · Polizei: 113.' }),
        ], { eyebrow: 'Postkarte · Rückseite', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(wn, seite === 'Links' ? 'Weitergeben an rechts' : 'Weiter');
      }

      // Finale: Abspann mit dem HQ der Crew
      const level = li.level;
      const szene = CREW.base && CREW.base.renderScene ? CREW.base.renderScene(level, { owned: (st.hq && st.hq.owned ? st.hq.owned : []).slice() }) : null;
      const gespielteNamen = Object.keys(st.stickers || {}).map((id) => (CREW.games.get(id) || { name: id }).name);
      const crewName = (st.crew && st.crew.name) || 'Crew';
      const wa = ctx.scr([
        h('div', { class: 'jq-abspann' },
          szene ? h('div', { class: 'jq-hq' }, szene) : null,
          h('div', { class: 'jq-roll' }, h('div', { class: 'jq-roll-in' },
            h('span', { class: 'eyebrow' }, 'CREW · Staffel 1'),
            h('b', { class: 'display jq-crew' }, crewName),
            h('span', null, '30 Stunden · 8 Inseln · ' + andenkenZahl + ' Andenken'),
            crewMoment ? h('span', null, 'Crew-Moment: ' + crewMoment.t) : null,
            gespielteNamen.length ? h('span', { class: 'muted' }, 'Gespielt: ' + gespielteNamen.join(' · ')) : null,
            h('span', null, 'Mit: Mika · Yara · Luca · Sam – und euch.'),
            h('b', { class: 'jq-danke' }, 'Danke, Crew. Bis nach dem Sommer.')))),
      ], { eyebrow: 'Abspann', center: true, badge: ctx.stufe(3, LEVELS) });
      CREW.sound.play('great');
      if (!ctx.fast) CREW.ui.confetti(140);
      await ctx.next(wa, 'Zum Sticker');
      return {
        summary: 'Ein Jahr, 30 Stunden, eine Crew. Die Skills kommen mit – auch in den Sommer.',
        stats: [[andenkenZahl, 'Andenken gesammelt'], [karten, 'Postkarten aus 2031']].concat(stickerZahl ? [[stickerZahl, 'Spiele mit Sticker im Jahr']] : []),
      };
    },
  });
})();
