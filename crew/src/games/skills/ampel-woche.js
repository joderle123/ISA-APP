/* Spiel „Ampel-Woche“ (Thema: Anspannung & Skills) · Vorlage T0 Solo · j1-e15 „Mein Skills-Koffer und Ampelplan“
   Vorher packst du deinen Koffer: je ein Skill für Körper, Sinne, Kopf, Reden und eine erwachsene Person – nur auf
   diesem Bildschirm, nichts wird gespeichert. Dann fünf Szenen einer Woche einer Figur (Montag Bus bis Freitagabend):
   Ampel wählen (Grün / Gelb / Rot) und ein Fach aus deinem Koffer. Die Figur reagiert, die Wochenkurve wächst,
   danach Replay mit anderen Entscheidungen. Bei Rot ohne erwachsene Person erinnert das Spiel an die Notfallkarte.
   Level: 1) Ampel lesen (Mo, Di), 2) Skill wählen (Mi, Do: leise Signale, Ort zählt), 3) Rot-Plan (Fr: Drohung im Chat). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h, clear } = CREW.util;
  const K = () => CREW.skillsKit;

  const LEVELS = ['Ampel lesen', 'Skill wählen', 'Rot-Plan'];
  const FAECHER = [
    { id: 'koerper', name: 'Körper', icon: 'bolt', opts: ['Treppe laufen', 'Fäuste ballen und lösen', 'Kaltes Wasser ins Gesicht', 'Wand wegdrücken'] },
    { id: 'sinne', name: 'Sinne', icon: 'eye', opts: ['Pfefferminz', 'Igelball kneten', 'Musik mit Kopfhörern', '5 Dinge sehen'] },
    { id: 'kopf', name: 'Kopf', icon: 'sparkle', opts: ['Gedankenstopp', '„Ist nur ein Gedanke“', 'Freundliche Stimme', 'Rückwärts zählen'] },
    { id: 'reden', name: 'Reden', icon: 'chat', opts: ['Freund:in schreiben', 'Mit Geschwistern reden', 'Sprachnachricht schicken', 'Mit dem Haustier reden'] },
    { id: 'erwachsen', name: 'Erwachsene Person', icon: 'user', opts: ['Mama oder Papa', 'Lehrkraft', 'Trainer:in', 'Jemand, dem ich vertraue'] },
  ];
  const FA = Object.fromEntries(FAECHER.map((f) => [f.id, f]));
  // Die Woche. {n} = Name der Figur. leise = Signale verraten wenig (Level 2), ernst = Gefahr → erwachsene Person
  const TAGE = [
    { tag: 'Montag', kurz: 'Mo', ort: 'Im Bus', text: 'Im Bus lästern zwei hinten laut über {n}s Jacke.', signal: 'Schultern hoch, Gesicht warm', zahl: 45 },
    { tag: 'Dienstag', kurz: 'Di', ort: 'In der Pause', text: '{n} hat das Pausenbrot vergessen. Kein Drama, aber Hunger.', signal: 'Bauch knurrt, ein bisschen genervt', zahl: 25 },
    { tag: 'Mittwoch', kurz: 'Mi', ort: 'Im Unterricht', text: 'Mathe-Arbeit zurück: eine 5. Der Lehrer sagt: „Darüber reden wir noch.“ {n} lächelt.', signal: 'Kloß im Hals, Herz schneller – außen ganz ruhig', zahl: 65, leise: true,
      ortTipp: 'Im Unterricht geht die leise Version: Füße fest in den Boden, Fäuste unterm Tisch.' },
    { tag: 'Donnerstag', kurz: 'Do', ort: 'Beim Training', text: 'Ein Mitspieler schubst {n} absichtlich. Der Trainer sieht es nicht.', signal: 'Fäuste, heißes Gesicht, Kiefer fest', zahl: 80 },
    { tag: 'Freitag', kurz: 'Fr', ort: 'Abends, zu Hause', text: 'Im Klassenchat postet jemand ein Foto von {n} und schreibt: „Montag bist du dran.“', signal: 'Herz rast, Hände zittern, kann nicht klar denken', zahl: 90, ernst: true },
  ];
  const levelOf = (i) => (i < 2 ? 1 : i < 4 ? 2 : 3);

  // Wirkt dieses Fach bei dieser Zahl? → { fit: gut | halb | zufrueh | best, delta, text }
  function wirkung(fach, t, name) {
    const z = t.zahl;
    if (fach === 'erwachsen') {
      if (t.ernst) return { fit: 'best', delta: -45, text: 'Genau richtig. Bei einer Drohung holt sich ' + name + ' eine erwachsene Person dazu – das ist Stärke, kein Petzen.' };
      if (z < 40) return { fit: 'halb', delta: -10, text: 'Geht – bei Grün schafft ' + name + ' das oft auch allein. Aber Reden schadet nie.' };
      return { fit: 'gut', delta: -30, text: 'Passt. Jemand Erwachsenes hilft runter und denkt mit.' };
    }
    if (fach === 'koerper' || fach === 'sinne') {
      if (t.ernst) return { fit: 'halb', delta: -20, text: 'Hilft runter – gut! Aber bei einer Drohung reicht das nicht. Dazu gehört eine erwachsene Person.' };
      return { fit: 'gut', delta: z >= 70 ? -35 : -25, text: z >= 70 ? 'Genau. Bei ' + z + ' holt der Körper den Kopf zurück.' : 'Passt. Bei ' + z + ' wirkt das schnell.' };
    }
    if (fach === 'kopf') {
      if (z >= 70) return { fit: 'zufrueh', delta: +5, text: 'Bei ' + z + ' prallt der Kopf-Skill ab. Erst Körper oder Sinne, dann Kopf.' };
      return { fit: 'gut', delta: -20, text: 'Passt. Unter 70 kann der Kopf mitarbeiten.' };
    }
    // reden
    if (t.ernst) return { fit: 'halb', delta: -10, text: 'Gut, dass ' + name + ' nicht allein bleibt. Bei einer Drohung braucht es aber eine erwachsene Person.' };
    if (z >= 70) return { fit: 'zufrueh', delta: 0, text: 'Bei ' + z + ' wird aus Reden schnell Streit. Erst runter, dann reden.' };
    return { fit: 'gut', delta: -20, text: 'Passt. Darüber reden macht es kleiner.' };
  }

  // Wochenkurve: Bänder Grün/Gelb/Rot, Linie „vorher“ gestrichelt, „nachher“ fest, alte Runde als Geist
  function kurve(punkte, o) {
    const oo = o || {};
    const W = 500, H = 220, padL = 30, padB = 26, n = TAGE.length;
    const x = (i) => padL + 20 + i * ((W - padL - 40) / (n - 1));
    const y = (v) => 10 + (H - padB - 10) * (1 - v / 100);
    const line = (vals, cls) => { const pts = vals.map((v, i) => (v == null ? null : x(i) + ',' + y(v))).filter(Boolean); return pts.length > 1 ? '<polyline class="' + cls + '" points="' + pts.join(' ') + '"/>' : ''; };
    const dots = (vals, cls) => vals.map((v, i) => (v == null ? '' : '<circle class="' + cls + '" cx="' + x(i) + '" cy="' + y(v) + '" r="6"/>')).join('');
    const el = h('div', { class: 'aw-kurve', role: 'img', 'aria-label': 'Wochenkurve' });
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '">'
      + '<rect class="b-rot" x="' + padL + '" y="' + y(100) + '" width="' + (W - padL) + '" height="' + (y(70) - y(100)) + '"/>'
      + '<rect class="b-gelb" x="' + padL + '" y="' + y(70) + '" width="' + (W - padL) + '" height="' + (y(40) - y(70)) + '"/>'
      + '<rect class="b-gruen" x="' + padL + '" y="' + y(40) + '" width="' + (W - padL) + '" height="' + (y(0) - y(40)) + '"/>'
      + [0, 40, 70, 100].map((v) => '<text class="lbl" x="' + (padL - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>').join('')
      + TAGE.map((t, i) => '<text class="lbl" x="' + x(i) + '" y="' + (H - 6) + '" text-anchor="middle">' + t.kurz + '</text>').join('')
      + (oo.geist ? line(oo.geist, 'geist') : '')
      + line(punkte.map((p) => (p ? p.vorher : null)), 'vorher') + line(punkte.map((p) => (p ? p.nachher : null)), 'nachher')
      + dots(punkte.map((p) => (p ? p.vorher : null)), 'dv') + dots(punkte.map((p) => (p ? p.nachher : null)), 'dn')
      + '</svg>';
    return el;
  }

  // Der gepackte Koffer: fünf Fächer mit deinen Skills
  function kofferEl(koffer, o) {
    const oo = o || {};
    return h('div', { class: 'aw-koffer' + (oo.small ? ' small' : '') }, h('span', { class: 'aw-griff' }),
      FAECHER.map((f) => h('div', { class: 'aw-fach' + (koffer[f.id] ? ' voll' : ''), 'data-fach': f.id }, CREW.icon(f.icon, oo.small ? 18 : 22), h('span', { class: 'eyebrow' }, f.name), h('b', null, koffer[f.id] || 'noch leer'))));
  }

  async function kofferPacken(ctx) {
    const koffer = {};
    const rows = FAECHER.map((f) => {
      const row = h('div', { class: 'row', style: { gap: '6px' } }, f.opts.map((t) => {
        const b = h('button', { type: 'button', class: 'chip small', 'data-skill': t }, t);
        b.addEventListener('click', () => { CREW.sound.play('tap'); koffer[f.id] = koffer[f.id] === t ? null : t; row.querySelectorAll('.chip').forEach((x) => x.classList.toggle('sel', x.dataset.skill === koffer[f.id])); });
        return b;
      }));
      if (ctx.auto) row.querySelectorAll('.chip')[Math.floor(ctx.autoRng() * f.opts.length)].click();
      return h('div', { class: 'aw-packrow' }, h('span', { class: 'aw-packlbl' }, CREW.icon(f.icon, 20), h('b', null, f.name)), row);
    });
    const w = ctx.scr([
      ctx.say('Pack deinen echten Koffer: pro Fach ein Skill, der zu dir passt. Nur auf diesem Bildschirm – nichts wird gespeichert.', { eyebrow: 'Dein Koffer', small: true }),
      h('div', { class: 'card stack aw-pack' }, rows),
      ctx.safetyLine('Leere Fächer sind okay. „Erwachsene Person“ ist der Notfall-Platz.'),
    ], { eyebrow: 'Koffer packen' });
    const r = await ctx.next(w, 'Koffer zu', { id: 'aw-koffer-zu' });
    if (r === ctx.SKIP) return null;
    return koffer;
  }

  /* Eine Woche spielen → Liste der Punkte { vorher, nachher, ampelOk, fit } */
  async function woche(ctx, koffer, fig, runde, geist) {
    const name = ctx.figures[fig].name;
    const punkte = [];
    let lastL = 0;
    for (let i = 0; i < TAGE.length; i++) {
      const t = TAGE[i];
      const L = levelOf(i);
      if (runde === 1 && L > lastL && L > 1) await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Jetzt verraten die Signale weniger – und der Ort zählt. Welches Fach passt hier wirklich?' : 'Freitagabend. Rot – und es geht um eine Drohung. Was steht auf deiner Notfallkarte?' });
      lastL = L;
      const text = t.text.replace(/\{n\}/g, name);
      const ey = t.tag + (runde > 1 ? ' · Replay' : '');
      // 1) Ampel wählen
      const w1 = ctx.scr([
        h('div', { class: 'aw-tag' }, h('b', { class: 'display' }, t.kurz), h('span', null, t.tag + ' · ' + t.ort)),
        ctx.figureCard({ fig, mood: t.zahl >= 70 ? (t.ernst ? 'angst' : 'wut') : t.leise ? 'neutral' : t.zahl >= 40 ? 'genervt' : 'neutral', text, eyebrow: t.ort,
          extra: h('p', { class: 'aw-signal' }, CREW.icon('eye', 18), h('span', null, h('b', null, 'Warnsignal: '), t.signal)) }),
        ctx.say('Welche Ampel ist bei ' + name + ' gerade an?', { eyebrow: 'Ampel', small: true }),
      ], { eyebrow: ey + ' · Ampel', badge: ctx.stufe(L, LEVELS) });
      const amp = await ctx.ask(w1, ['gruen', 'gelb', 'rot'].map((a) => ({ label: K().AMPEL[a].name + ' · ' + K().AMPEL[a].bereich, value: a, icon: K().AMPEL[a].icon, variant: 'ghost', id: 'aw-amp-' + a })));
      if (amp === ctx.SKIP) { punkte.push(null); continue; }
      const echt = K().stufe(t.zahl);
      const ampelOk = amp === echt;
      CREW.sound.play(ampelOk ? 'good' : 'tap');
      // 2) Fach aus dem Koffer
      const w2 = ctx.scr([
        h('div', { class: 'aw-ampel-fb', 'data-ampel': echt }, h('b', null, (ampelOk ? 'Ampel stimmt: ' : 'Eher ') + K().AMPEL[echt].name), h('span', null, name + ' steht bei ' + t.zahl + '. ' + K().AMPEL[echt].kurz)),
        kofferEl(koffer, { small: true }),
        ctx.say('Welches Fach aus deinem Koffer nimmt ' + name + ' jetzt?', { eyebrow: 'Skill wählen', small: true }),
      ], { eyebrow: ey + ' · Koffer', badge: ctx.stufe(L, LEVELS) });
      const fach = await ctx.ask(w2, FAECHER.map((f) => ({ label: f.name + (koffer[f.id] ? ': ' + koffer[f.id] : ''), value: f.id, icon: f.icon, variant: 'ghost', id: 'aw-fach-' + f.id })), { autoPick: () => (L === 3 && ctx.autoRng() < 0.5 ? 'erwachsen' : FAECHER[Math.floor(ctx.autoRng() * 5)].id) });
      if (fach === ctx.SKIP) { punkte.push({ vorher: t.zahl, nachher: t.zahl, ampelOk, fit: null }); continue; }
      const wk = wirkung(fach, t, name);
      const nachher = Math.max(5, Math.min(100, t.zahl + wk.delta));
      const p = { vorher: t.zahl, nachher, ampelOk, fit: wk.fit, fach };
      punkte.push(p);
      CREW.sound.play(wk.fit === 'gut' || wk.fit === 'best' ? 'good' : 'soft');
      const meter = ctx.meter({ value: t.zahl, label: name });
      const notfall = t.zahl >= 70 && fach !== 'erwachsen';
      const w3 = ctx.scr([
        h('div', { class: 'grid two' },
          ctx.figureCard({ fig, mood: nachher < 40 ? 'froh' : nachher < 70 ? 'neutral' : t.ernst ? 'angst' : 'wut', text: wk.text, eyebrow: FA[fach].name + (koffer[fach] ? ': ' + koffer[fach] : '') }),
          h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Wochenkurve'), kurve(punkte.concat(Array(TAGE.length - punkte.length).fill(null)), { geist }), meter.el)),
        t.ortTipp && (fach === 'koerper' || fach === 'sinne') ? h('p', { class: 'aw-hinweis' }, CREW.icon('bulb', 18), h('span', null, t.ortTipp)) : null,
        notfall && !t.ernst ? h('p', { class: 'aw-hinweis' }, CREW.icon('heart', 18), h('span', null, 'Und wenn die Zahl nicht runtergeht: Notfallkarte – eine erwachsene Person holen.')) : null,
      ], { eyebrow: ey + ' · So geht es weiter', badge: ctx.stufe(L, LEVELS) });
      setTimeout(() => meter.set(nachher), ctx.fast ? 0 : 350);
      await ctx.next(w3, t.ernst && fach !== 'erwachsen' ? 'Notfallkarte' : i + 1 < TAGE.length ? 'Nächster Tag' : 'Zur Wochenkurve');
      // Rot ohne erwachsene Person bei einer Drohung: Notfallkarte
      if (t.ernst && fach !== 'erwachsen') {
        const wN = ctx.scr([
          ctx.say('Rot und eine Drohung: Hier gehört eine erwachsene Person dazu. ' + (koffer.erwachsen ? 'In deinem Koffer steht: ' + koffer.erwachsen + '.' : 'Dein Fach „Erwachsene Person“ ist noch leer – wer könnte das sein?'), { eyebrow: 'Notfallkarte' }),
          ctx.helpCard({ title: 'Notfallkarte', text: 'Wenn Drohungen, Angst oder Gefahr im Spiel sind: nicht allein lösen. Anonym und kostenlos:' }),
        ], { eyebrow: ey + ' · Notfallkarte', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(wN, 'Verstanden');
      }
    }
    return punkte;
  }

  CREW.registerGame({
    id: 'ampel-woche',
    template: 'T0',
    icon: 'calendar',
    tage: TAGE, faecher: FAECHER, wirkung, // für den Test
    themen: ['Ampelplan', 'Skills-Koffer', 'Warnsignal – Farbe – Skill', 'Hilfe holen bei Rot'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Pack deinen Skills-Koffer. Dann spielst du eine Woche einer Figur: Ampel wählen, Skill aus deinem Koffer, Kurve beobachten.',
        levels: LEVELS,
        steps: [
          { icon: 'base', title: 'Koffer packen', text: 'Fünf Fächer, je ein Skill. Wird nicht gespeichert.' },
          { icon: 'calendar', title: 'Fünf Tage', text: 'Grün, Gelb oder Rot – und welches Fach?' },
          { icon: 'shuffle', title: 'Replay', text: 'Die Woche nochmal, mit anderen Entscheidungen.' },
        ],
        probe: ctx.T.probeCard('Probe: Sam ist bei 20 und gähnt. Welche Ampel? Tipp irgendwas – zählt nicht.', [{ label: 'Grün', value: 'g', variant: 'ghost', icon: 'leaf' }, { label: 'Rot', value: 'r', variant: 'ghost', icon: 'bolt' }]),
      });
      const koffer = await kofferPacken(ctx);
      if (!koffer) return { summary: 'Heute nur reingeschaut. Der Koffer wartet.' };
      const fig = ctx.rpick(['mika', 'yara', 'luca', 'sam']);
      const name = ctx.figures[fig].name;
      const wS = ctx.scr([
        kofferEl(koffer),
        ctx.say('Das ist dein Koffer. Jetzt kommt ' + name + 's Woche: Montag bis Freitag.', { eyebrow: name + 's Woche', small: true }),
      ], { eyebrow: 'Koffer gepackt', badge: ctx.stufe(1, LEVELS) });
      if ((await ctx.next(wS, 'Montag')) === ctx.SKIP) return { summary: 'Heute nur reingeschaut. Der Koffer wartet.' };
      let punkte = await woche(ctx, koffer, fig, 1, null);
      let replay = null;
      const bilanz = (pk) => ({ ampel: pk.filter((p) => p && p.ampelOk).length, skill: pk.filter((p) => p && (p.fit === 'gut' || p.fit === 'best')).length, ende: (pk.filter(Boolean).slice(-1)[0] || {}).nachher });
      for (let runde = 1; runde <= 2; runde++) {
        const b = bilanz(punkte);
        const wK = ctx.scr([
          h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, name + 's Woche' + (runde > 1 ? ' · nach dem Replay' : '')), h('div', { class: 'row', style: { gap: '6px' } }, h('span', { class: 'pill' }, b.ampel + '/5 Ampeln'), h('span', { class: 'pill good' }, b.skill + '/5 Skills passend'))),
            kurve(punkte, { geist: runde > 1 && replay ? replay.map((p) => (p ? p.nachher : null)) : null }),
            h('div', { class: 'row', style: { gap: '14px' } }, h('span', { class: 'aw-leg nachher' }, 'nach dem Skill'), h('span', { class: 'aw-leg vorher' }, 'vorher'), runde > 1 ? h('span', { class: 'aw-leg geist' }, 'erste Runde') : null)),
          ctx.say(runde === 1 ? 'Willst du die Woche nochmal spielen – mit anderen Entscheidungen? Schau, wie sich die Kurve verändert.' : 'Vergleich: Die blasse Linie war deine erste Runde. Was hat den Unterschied gemacht?', { eyebrow: 'Wochenkurve', small: true }),
        ], { eyebrow: 'Wochenkurve', badge: ctx.stufe(3, LEVELS) });
        if (runde === 2) { await ctx.next(wK, 'Weiter'); break; }
        const r = await ctx.ask(wK, [{ label: 'Woche nochmal', value: 'replay', variant: 'ghost', icon: 'shuffle', id: 'aw-replay', auto: false }, { label: 'Fertig', value: 'fertig', iconRight: 'right', id: 'aw-fertig' }]);
        if (r !== 'replay') break;
        replay = punkte;
        punkte = await woche(ctx, koffer, fig, 2, replay.map((p) => (p ? p.nachher : null)));
      }
      const b = bilanz(punkte);
      return {
        summary: 'Warnsignal – Ampel – Skill: Bei Grün und Gelb geht vieles, bei Rot erst Körper – und bei Gefahr eine erwachsene Person.',
        stats: [[b.ampel, 'von 5 Ampeln richtig'], [b.skill, 'passende Skills'], [replay ? 1 : 0, 'Replay']],
      };
    },
  });
})();
