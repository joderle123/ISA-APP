/* Spiel „Innen/Außen“ (Thema: Anspannung & Skills) · Vorlage T3 Zu zweit an einem iPad · j1-e11
   Hand-drauf-Modus: Das iPad liegt zwischen zwei Personen. Die untere Hälfte zeigt nur das AUSSEN der Figur (was sie
   tut und sagt), die obere (gedreht, für die Person gegenüber) nur das INNEN (Herz, Gedankentempo, Gedanke).
   Die Infos erscheinen nur, solange die Hand auf dem eigenen Feld liegt. Jede Seite tippt verdeckt eine Zahl 0–100
   und „Deckel drauf / Deckel ab“ (Handmodell). Dann Aufdecken, Einigung mit zwei Fingern, Auflösung.
   Level: 1) Einschätzen (innen und außen passen – oder laut heißt nicht hoch), 2) Abgleichen (die ruhige
   85er-Figur: Welche kleinen Zeichen hätten es verraten?), 3) Deckel (Deckel ab – was hilft zuerst?). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h, clear } = CREW.util;
  const K = () => CREW.skillsKit;

  const LEVELS = ['Einschätzen', 'Abgleichen', 'Deckel'];
  const HERZ = [{ t: 'ruhig', bpm: 70 }, { t: 'etwas schneller', bpm: 90 }, { t: 'schnell', bpm: 115 }, { t: 'rast', bpm: 145 }];
  const TEMPO = ['langsam, ein Gedanke', 'normal', 'schnell, springt hin und her', 'rast, alles gleichzeitig'];

  /* typ: ehrlich (innen ≈ außen), laut (außen wild, innen niedrig), versteckt (außen ruhig, innen hoch).
     zeichen = kleine Außen-Zeichen, die es verraten hätten (Level 2), falsch = ein Zeichen, das nichts verrät. */
  const FIGUREN = [
    { id: 'vorstellen', typ: 'ehrlich', fig: 'luca', mood: 'angst', titel: 'Gruppenarbeit', lage: 'Luca soll gleich die Ergebnisse der Gruppe vor der Klasse vorstellen.',
      tut: 'Liest den Zettel dreimal. Trommelt mit dem Stift.', sagt: '„Ja, ja, gleich.“',
      herz: 2, tempo: 2, gedanke: 'Hoffentlich verhasple ich mich nicht.', koerper: 'Bauch flau', zahl: 50 },
    { id: 'warten', typ: 'ehrlich', fig: 'yara', mood: 'froh', titel: 'Bushaltestelle', lage: 'Yara wartet auf den Bus. Musik im Ohr. Ein ganz normaler Nachmittag.',
      tut: 'Wippt mit dem Fuß im Takt, schaut in die Gegend.', sagt: 'Summt leise mit.',
      herz: 0, tempo: 0, gedanke: 'Heute Abend Pizza. Nice.', koerper: 'Schultern locker', zahl: 15 },
    { id: 'zahnarzt', typ: 'ehrlich', fig: 'sam', mood: 'angst', titel: 'Wartezimmer', lage: 'Sam wartet beim Zahnarzt. Nebenan hört man den Bohrer.',
      tut: 'Rutscht auf dem Stuhl hin und her, schaut immer wieder zur Tür.', sagt: '„Dauert das noch lange?“',
      herz: 2, tempo: 2, gedanke: 'Hoffentlich ist da kein Loch.', koerper: 'Hände feucht', zahl: 55 },
    { id: 'abfahrt', typ: 'laut', fig: 'sam', mood: 'froh', titel: 'Klassenfahrt', lage: 'Der Bus zur Klassenfahrt fährt gleich los.',
      tut: 'Springt herum, macht Witze, ist richtig laut.', sagt: '„Leute! LEUTE! Fünf Tage ohne Eltern!“',
      herz: 1, tempo: 2, gedanke: 'Endlich. Das wird richtig gut.', koerper: 'Kribbeln – aber ein gutes', zahl: 30 },
    { id: 'probe', typ: 'laut', fig: 'mika', mood: 'genervt', titel: 'Theaterprobe', lage: 'Mika hat bei der Theaterprobe den Text vergessen.',
      tut: 'Schimpft laut und wirft das Textbuch auf den Stuhl.', sagt: '„So ein Mist! Ich hab das hundertmal geübt!“',
      herz: 1, tempo: 1, gedanke: 'Ärgerlich. Morgen klappt das. Erst mal was essen.', koerper: 'Schon wieder locker', zahl: 35 },
    { id: 'chat85', typ: 'versteckt', fig: 'mika', mood: 'neutral', titel: 'Mathestunde', lage: 'Mika sitzt in Mathe. Vor zehn Minuten hat Mika im Chat gelesen, dass alle über Mika lachen.',
      tut: 'Rechnet mit, nickt, lächelt sogar einmal.', sagt: '„Klar, mach ich.“',
      herz: 3, tempo: 3, gedanke: 'Alle lachen. Alle. Was hab ich gemacht?', koerper: 'Fäuste unter dem Tisch', zahl: 85,
      zeichen: ['Antwortet ganz kurz', 'Lächelt nur mit dem Mund', 'Hände bleiben unter dem Tisch'], falsch: 'Rechnet mit' },
    { id: 'englisch', typ: 'versteckt', fig: 'yara', mood: 'neutral', titel: 'Die Note', lage: 'Yara bekommt eine 5 in Englisch zurück. Die Freundin fragt: „Und?“',
      tut: 'Steckt die Arbeit weg und schaut aufs Handy.', sagt: '„Mir egal. Englisch ist eh unwichtig.“',
      herz: 2, tempo: 3, gedanke: 'Mama kriegt die Krise. Was, wenn ich sitzen bleibe?', koerper: 'Kloß im Hals', zahl: 70,
      zeichen: ['Schaut schnell weg', 'Wechselt sofort das Thema', 'Stimme ein bisschen zu laut'], falsch: 'Hat ein Handy' },
    { id: 'bank', typ: 'versteckt', fig: 'luca', mood: 'neutral', titel: 'Ausgewechselt', lage: 'Luca wird beim Fußball nach zehn Minuten ausgewechselt. Vor allen.',
      tut: 'Setzt sich ruhig auf die Bank und trinkt.', sagt: 'Sagt nichts.',
      herz: 3, tempo: 3, gedanke: 'Vor allen. Ich bin raus. Der Trainer hasst mich.', koerper: 'Kiefer fest, Gesicht heiß', zahl: 80,
      zeichen: ['Kiefer ist fest', 'Trinkt ganz hastig', 'Schaut niemanden an'], falsch: 'Sitzt auf der Bank' },
  ];
  const deckelAb = (z) => z >= 70;
  const HILFE = [
    { k: 'koerper', t: 'Körper: Fäuste lösen, Füße fest, ausatmen', icon: 'bolt' },
    { k: 'sinne', t: 'Sinne: kaltes Wasser, 5 Dinge sehen', icon: 'eye' },
    { k: 'kopf', t: 'Kopf: „Ist nur ein Gedanke“', icon: 'sparkle' },
    { k: 'reden', t: 'Reden: jemandem sofort alles erzählen', icon: 'chat' },
  ];

  /* Zahl 0–100 als Regler (startet leer, damit niemand an einer Vorgabe klebt). → { el, get(), set(n) } */
  function zahlRegler(onSet) {
    let v = null;
    const range = h('input', { type: 'range', min: '0', max: '100', step: '5', value: '50', class: 'ia-range', 'aria-label': 'Zahl von 0 bis 100' });
    const val = h('b', { class: 'ia-val display' }, '–');
    const el = h('div', { class: 'ia-regler empty' }, h('span', { class: 'small muted' }, '0'), range, h('span', { class: 'small muted' }, '100'), val);
    const set = (n) => { v = Math.max(0, Math.min(100, Math.round(n / 5) * 5)); range.value = String(v); val.textContent = String(v); el.classList.remove('empty'); el.dataset.ampel = CREW.skillsKit.stufe(v); if (onSet) onSet(v); };
    range.addEventListener('input', () => set(Number(range.value)));
    return { el, get: () => v, set, range };
  }

  /* Handmodell als kleines Bild: Deckel drauf = Faust, Daumen innen. Deckel ab = Finger hoch. */
  function hand(ab, size) {
    const s = size || 44;
    const el = h('span', { class: 'ia-hand' + (ab ? ' ab' : ''), 'aria-hidden': 'true' });
    el.innerHTML = ab
      ? `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><rect x="11" y="24" width="24" height="18" rx="6"/><rect x="12" y="6" width="5" height="20" rx="2.5"/><rect x="18.5" y="3" width="5" height="22" rx="2.5"/><rect x="25" y="4" width="5" height="21" rx="2.5"/><rect x="31.5" y="8" width="5" height="18" rx="2.5"/><path d="M11 30 Q18 27 24 32" class="d"/></svg>`
      : `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><rect x="11" y="18" width="26" height="24" rx="8"/><path d="M13 22 Q24 12 35 22" class="d"/><path d="M17 26 Q24 22 31 26" class="d"/><path d="M14 33 Q21 29 27 34" class="d"/></svg>`;
    return el;
  }
  const deckelText = (ab) => (ab ? 'Deckel ab' : 'Deckel drauf');

  // Herz, das im Takt pulsiert, und Gedanken-Blasen im Tempo
  function innenBild(f) {
    const hz = HERZ[f.herz];
    return h('div', { class: 'ia-innen' },
      h('div', { class: 'ia-innen-row' },
        h('div', { class: 'ia-herz', style: { '--puls': (60 / hz.bpm).toFixed(2) + 's' } }, CREW.icon('heart', 30), h('span', null, h('b', null, 'Herz: '), hz.t)),
        h('div', { class: 'ia-tempo', 'data-tempo': String(f.tempo) }, h('span', { class: 'ia-blasen' }, h('i'), h('i'), h('i')), h('span', null, h('b', null, 'Gedanken: '), TEMPO[f.tempo]))),
      h('div', { class: 'ia-gedanke' }, '„' + f.gedanke + '“'),
      h('span', { class: 'muted small' }, 'Körper innen: ' + f.koerper));
  }
  function aussenBild(ctx, f) {
    return h('div', { class: 'ia-aussen' },
      h('div', { class: 'ia-aussen-fig' }, ctx.avatar(f.fig, f.mood, 74)),
      h('div', { class: 'stack', style: { gap: '4px', minWidth: 0 } },
        h('span', null, h('b', null, 'Tut: '), f.tut),
        h('span', null, h('b', null, 'Sagt: '), f.sagt)));
  }

  /* Eine Hälfte: Hand-drauf-Feld (Info erscheint nur beim Halten), Zahl, Deckel, Fertig. → { el, done: Promise } */
  function haelfte(ctx, titel, bild, autoZahl) {
    let zahl = null, ab = null, locked = false, resolveDone;
    const done = new Promise((r) => { resolveDone = r; });
    const info = h('div', { class: 'ia-info' }, bild);
    const halten = h('div', { class: 'ia-halten', role: 'button', tabindex: '0', 'aria-label': 'Halten zum Anschauen' }, CREW.icon('eye', 22), h('b', null, 'Hand drauf: halten zum Anschauen'));
    const peek = h('div', { class: 'ia-peek' + (ctx.auto ? ' offen' : '') }, info, halten);
    const open = (e) => { if (e) e.preventDefault(); peek.classList.add('offen'); };
    const close = () => { if (!ctx.auto) peek.classList.remove('offen'); };
    halten.addEventListener('pointerdown', (e) => { open(e); try { halten.setPointerCapture(e.pointerId); } catch (x) { /* egal */ } });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => halten.addEventListener(ev, close));
    halten.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); peek.classList.toggle('offen'); } });
    const zRow = zahlRegler((v) => { if (!locked) zahl = v; });
    const dRow = h('div', { class: 'row', style: { gap: '8px' } }, [false, true].map((v) => {
      const b = h('button', { type: 'button', class: 'chip small ia-d', 'data-ab': v ? '1' : '0' }, hand(v, 26), deckelText(v));
      b.addEventListener('click', () => { if (locked) return; CREW.sound.play('tap'); ab = v; dRow.querySelectorAll('.ia-d').forEach((x) => x.classList.toggle('sel', x === b)); });
      return b;
    }));
    const tipp = h('div', { class: 'stack ia-tipp', style: { gap: '8px' } }, zRow.el, dRow);
    const status = h('div', { class: 'ia-status' });
    const fertig = CREW.ui.btn('Fertig – verdecken', () => {
      if (locked) return;
      if (zahl == null || ab == null) { CREW.ui.toast('Erst eine Zahl und den Deckel antippen.'); return; }
      locked = true;
      tipp.replaceWith(h('div', { class: 'ia-zu' }, CREW.icon('lock', 26), h('b', null, 'Tipp verdeckt')));
      clear(status); status.append(CREW.icon('check', 20), h('b', null, 'Verdeckt. Warte auf die andere Seite.'));
      fertig.style.visibility = 'hidden';
      fertig.disabled = true;
      CREW.sound.play('unlock');
      resolveDone({ zahl, ab });
    }, { small: true, icon: 'lock', cls: 'ia-fertig' });
    dRow.appendChild(fertig);
    const el = h('div', { class: 'stack ia-half', style: { gap: '8px' } }, h('div', { class: 'row between', style: { gap: '8px' } }, h('span', { class: 'eyebrow' }, titel + ' · nur du · Tipp verdeckt: wie hoch innen?'), status), peek, tipp);
    if (ctx.auto) {
      setTimeout(() => {
        const z = Math.max(0, Math.min(100, Math.round(((autoZahl != null ? autoZahl : 50) + (ctx.autoRng() * 40 - 20)) / 5) * 5));
        zRow.set(z);
        dRow.querySelectorAll('.ia-d')[z >= 70 ? 1 : 0].click();
        fertig.click();
      }, 40);
    }
    return { el, done };
  }

  // Skala 0–100 mit Markern (A = außen, I = innen, E = Einigung, ★ = echt)
  function skala(marker) {
    return h('div', { class: 'ia-skala' },
      h('div', { class: 'ia-skala-bar' }, h('i', { class: 'g' }), h('i', { class: 'y' }), h('i', { class: 'r' })),
      marker.map((m) => h('span', { class: 'ia-mark ' + m.k, style: { left: m.z + '%' } }, h('b', null, m.t), h('span', null, String(m.z)))),
      h('div', { class: 'ia-skala-lbl' }, h('span', null, '0'), h('span', null, '40'), h('span', null, '70'), h('span', null, '100')));
  }

  /* Eine Figur: Lage → geteilter Bildschirm → Aufdecken → Einigung → Auflösung (+ Level 2/3 Extra) */
  async function runde(ctx, f, L, nr, total) {
    const name = ctx.figures[f.fig].name;
    const ey = 'Figur ' + nr + '/' + total;
    const w0 = ctx.scr([
      ctx.figureCard({ fig: f.fig, mood: 'neutral', text: f.lage, eyebrow: ey + ' · ' + f.titel }),
      h('div', { class: 'card stack soft' }, h('b', null, 'Legt das iPad zwischen euch. Unten sieht nur das Außen, oben (gedreht) nur das Innen.'), h('p', { class: 'muted small' }, 'Hand aufs eigene Feld legen und halten – dann erscheint die Info. Nicht auf die andere Hälfte schauen.')),
    ], { eyebrow: ey, badge: ctx.stufe(L, LEVELS) });
    if ((await ctx.next(w0, 'Hälften zeigen', { id: 'ia-start' })) === ctx.SKIP) return null;
    const innenH = haelfte(ctx, 'Innen · ' + name, innenBild(f), f.zahl);
    const aussenH = haelfte(ctx, 'Außen · ' + name, aussenBild(ctx, f), f.typ === 'versteckt' ? 35 : f.typ === 'laut' ? 75 : f.zahl);
    const w1 = ctx.scr([ctx.T.split({ top: innenH.el, bottom: aussenH.el })], { eyebrow: ey + ' · Verdeckt tippen', badge: ctx.stufe(L, LEVELS) });
    const both = await ctx.waitFor(Promise.all([innenH.done, aussenH.done]));
    if (both === ctx.SKIP) return null;
    const [ti, ta] = both;
    void w1;
    CREW.sound.play('reveal');
    const diff = Math.abs(ti.zahl - ta.zahl);
    // Aufdecken: beide Tipps nebeneinander, dann Einigung mit zwei Fingern
    let einig = null;
    const eRow = zahlRegler((v) => { einig = v; });
    if (ctx.auto) eRow.set(Math.round((ti.zahl + ta.zahl) / 10) * 5);
    const w2 = ctx.scr([
      h('div', { class: 'ia-reveal' },
        h('div', { class: 'ia-tippcard' }, h('span', { class: 'eyebrow' }, 'Außen-Tipp'), h('b', { class: 'display' }, String(ta.zahl)), h('span', { class: 'row', style: { gap: '6px' } }, hand(ta.ab, 28), deckelText(ta.ab))),
        h('div', { class: 'ia-gap' }, h('b', { class: 'display' }, String(diff)), h('span', null, 'Punkte auseinander')),
        h('div', { class: 'ia-tippcard' }, h('span', { class: 'eyebrow' }, 'Innen-Tipp'), h('b', { class: 'display' }, String(ti.zahl)), h('span', { class: 'row', style: { gap: '6px' } }, hand(ti.ab, 28), deckelText(ti.ab)))),
      skala([{ k: 'a', t: 'A', z: ta.zahl }, { k: 'i', t: 'I', z: ti.zahl }]),
      ctx.say(diff >= 30 ? 'Weit auseinander! Erzählt euch, was ihr gesehen habt – dann einigt euch auf eine Zahl.' : 'Ziemlich nah. Erzählt euch kurz, was ihr gesehen habt, und einigt euch.', { eyebrow: 'Jetzt reden', small: true }),
      h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Eure gemeinsame Zahl'), eRow.el),
    ], { eyebrow: ey + ' · Aufdecken', badge: ctx.stufe(L, LEVELS) });
    for (;;) {
      const tf = await ctx.T.twoFinger(w2, { label: 'Beide: Finger drauf – das ist unsere Zahl', hint: 'Erst eine Zahl antippen, dann zwei Finger.' });
      if (tf === ctx.SKIP) return null;
      if (einig != null) break;
      CREW.ui.toast('Erst eine gemeinsame Zahl antippen.');
      w2.querySelectorAll('.two-finger').forEach((z) => z.remove());
    }
    // Auflösung
    const abst = Math.abs(einig - f.zahl);
    const treffer = abst <= 10 ? 'treffer' : abst <= 20 ? 'nah' : 'weit';
    CREW.sound.play(treffer === 'weit' ? 'soft' : 'good');
    const lehre = f.typ === 'versteckt' ? 'Außen ruhig, innen ' + f.zahl + ' – das gibt es. Nicht jede Anspannung ist sichtbar.'
      : f.typ === 'laut' ? 'Außen laut, innen nur ' + f.zahl + '. Laut heißt nicht hoch – manches verfliegt schnell.'
        : 'Hier passen innen und außen zusammen. Das ist der leichte Fall.';
    const w3 = ctx.scr([
      h('div', { class: 'grid two' },
        ctx.figureCard({ fig: f.fig, mood: f.zahl >= 70 ? (f.typ === 'versteckt' ? 'traurig' : 'wut') : f.mood, text: name + ' steht innen bei ' + f.zahl + '. ' + deckelText(deckelAb(f.zahl)) + '.', eyebrow: 'Aufgelöst', extra: h('div', { class: 'row', style: { gap: '8px' } }, hand(deckelAb(f.zahl), 40), h('span', { class: 'amp-pill', 'data-ampel': K().stufe(f.zahl) }, K().AMPEL[K().stufe(f.zahl)].name)) }),
        h('div', { class: 'card stack ia-result', 'data-t': treffer }, h('span', { class: 'eyebrow' }, 'Eure Zahl: ' + einig), h('b', { class: 'display' }, treffer === 'treffer' ? 'Volltreffer' : treffer === 'nah' ? 'Nah dran' : 'Anders als gedacht'), h('span', { class: 'muted small' }, abst + ' daneben'))),
      skala([{ k: 'a', t: 'A', z: ta.zahl }, { k: 'i', t: 'I', z: ti.zahl }, { k: 'e', t: 'Wir', z: einig }, { k: 's', t: '★', z: f.zahl }]),
      ctx.say(lehre, { eyebrow: f.typ === 'versteckt' ? 'Innen ≠ außen' : f.typ === 'laut' ? 'Laut ≠ hoch' : 'Passt zusammen', small: true }),
    ], { eyebrow: ey + ' · Auflösung', badge: ctx.stufe(L, LEVELS) });
    await ctx.next(w3, 'Weiter');
    // Level 2: Welche kleinen Zeichen hätten es außen verraten?
    let zeichenOk = null;
    if (L === 2 && f.zeichen) {
      const optsZ = ctx.rshuffle(f.zeichen.slice(0, 2).concat([f.falsch]));
      const wz = ctx.scr([
        ctx.figureCard({ fig: f.fig, mood: 'neutral', text: 'Außen sah ' + name + ' ruhig aus. Welches kleine Zeichen hätte es verraten können?', eyebrow: 'Woran merken?' }),
        h('p', { class: 'muted small' }, 'Die Person mit dem Außen erinnert sich: Was stand da genau?'),
      ], { eyebrow: ey + ' · Abgleichen', badge: ctx.stufe(2, LEVELS) });
      const z = await ctx.ask(wz, optsZ.map((t) => ({ label: t, value: t, variant: 'ghost' })));
      if (z !== ctx.SKIP) {
        zeichenOk = z !== f.falsch;
        const wzf = ctx.scr([ctx.say(zeichenOk ? 'Ja. ' + z + ' – so ein kleines Zeichen sieht man nur, wenn man genau hinschaut. Noch sicherer: nachfragen.' : z + ' – das machen viele, das verrät nichts. Kleine Zeichen waren: ' + f.zeichen.join(', ') + '.', { eyebrow: zeichenOk ? 'Gut gesehen' : 'Schaut nochmal', small: true }),
          h('div', { class: 'row' }, f.zeichen.map((t) => h('span', { class: 'chip small' }, CREW.icon('eye', 16), t)))], { eyebrow: ey + ' · Abgleichen', center: true, badge: ctx.stufe(2, LEVELS) });
        await ctx.next(wzf, 'Weiter');
      }
    }
    // Level 3: Deckel ab – was hilft zuerst?
    let hilfeOk = null;
    if (L === 3) {
      const wh = ctx.scr([
        h('div', { class: 'row', style: { gap: '14px', alignItems: 'center' } }, hand(deckelAb(f.zahl), 64), ctx.say(name + ' ist bei ' + f.zahl + ': ' + deckelText(deckelAb(f.zahl)) + '. Was hilft zuerst? Einigt euch.', { eyebrow: 'Handmodell', small: true })),
      ], { eyebrow: ey + ' · Deckel', badge: ctx.stufe(3, LEVELS) });
      const k = await ctx.ask(wh, HILFE.map((x) => ({ label: x.t, value: x.k, icon: x.icon, variant: 'ghost', id: 'ia-hilfe-' + x.k })));
      if (k !== ctx.SKIP) {
        const ab = deckelAb(f.zahl);
        hilfeOk = ab ? (k === 'koerper' || k === 'sinne') : true;
        CREW.sound.play(hilfeOk ? 'good' : 'soft');
        const wf = ctx.scr([
          ctx.figureCard({ fig: f.fig, mood: hilfeOk ? 'neutral' : 'traurig', text: hilfeOk ? (ab ? 'Genau. Mit Deckel ab ist der Denk-Teil offline. Körper oder Sinne bringen ihn zurück – dann reden.' : 'Passt. Mit Deckel drauf gehen Kopf und Reden noch gut.') : 'Mit Deckel ab kommt ' + (k === 'kopf' ? 'ein Gedanke' : 'langes Reden') + ' kaum an. Erst Körper oder Sinne – runter unter 70 – dann ' + (k === 'kopf' ? 'Kopf.' : 'reden.'), eyebrow: hilfeOk ? 'Deckel wieder drauf' : 'Fast' }),
          h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('star', 14), 'Skill-Karte „Runter unter 70“')),
        ], { eyebrow: ey + ' · Deckel', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(wf, 'Weiter');
      }
    }
    return { diff, treffer, zeichenOk, hilfeOk, deckelOk: (ti.ab === deckelAb(f.zahl)) + (ta.ab === deckelAb(f.zahl)) };
  }

  CREW.registerGame({
    id: 'innen-aussen',
    template: 'T3',
    icon: 'eye',
    figuren: FIGUREN, // für den Test
    themen: ['Handmodell', 'Anspannung 0–100', 'Innen und außen', 'Perspektivwechsel'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Einer sieht nur das Außen der Figur, der andere nur das Innen. Jede Seite tippt verdeckt, wie hoch die Figur innen steht. Dann aufdecken und einigen.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Hand drauf', text: 'Infos erscheinen nur, solange deine Hand auf deinem Feld liegt.' },
          { icon: 'lock', title: 'Verdeckt tippen', text: 'Zahl 0–100 und Deckel drauf oder ab.' },
          { icon: 'users', title: 'Einigen', text: 'Aufdecken, reden, zwei Finger auf eure Zahl.' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'),
            h('div', { class: 'row', style: { gap: '16px', alignItems: 'center' } }, h('div', { class: 'stack', style: { alignItems: 'center', gap: '4px' } }, hand(false, 64), h('b', null, 'Deckel drauf')), h('div', { class: 'stack', style: { alignItems: 'center', gap: '4px' } }, hand(true, 64), h('b', null, 'Deckel ab'))),
            ctx.say('Probe: Macht beide das Handmodell. Faust mit Daumen drin = Deckel drauf. Finger hoch = Deckel ab, ab etwa 70.', { eyebrow: 'Zum Ausprobieren', small: true })], { eyebrow: 'Probe' });
          await ctx.ask(w, [{ label: 'Deckel drauf', value: 0, variant: 'ghost' }, { label: 'Deckel ab', value: 1, variant: 'ghost' }]);
        },
      });
      // Level 1: ehrlich oder laut, Level 2: die ruhige 85er-Figur, Level 3: noch eine versteckte Figur
      const liste = [ctx.rpick(FIGUREN.filter((f) => f.typ !== 'versteckt')), FIGUREN.find((f) => f.id === 'chat85'), ctx.rpick(FIGUREN.filter((f) => f.typ === 'versteckt' && f.id !== 'chat85'))];
      let gespielt = 0, nah = 0, maxDiff = 0, deckel = 0, hilfe = 0;
      for (let i = 0; i < liste.length; i++) {
        const L = i + 1;
        if (i > 0) await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Diese Figur wirkt außen völlig ruhig. Danach: Welche kleinen Zeichen hätten es verraten?' : 'Jetzt zählt der Deckel: Bei Deckel ab ist Denken schwer. Was hilft der Figur zuerst?' });
        const r = await runde(ctx, liste[i], L, i + 1, liste.length);
        if (!r) continue;
        gespielt++; if (r.treffer !== 'weit') nah++; maxDiff = Math.max(maxDiff, r.diff); deckel += r.deckelOk; if (r.hilfeOk) hilfe++;
      }
      return {
        summary: gespielt ? 'Außen ruhig heißt nicht innen ruhig – und laut heißt nicht hoch. Nachfragen schlägt raten.' : 'Heute nur reingeschaut.',
        stats: [[nah, 'von ' + gespielt + ' Einigungen nah dran'], [maxDiff, 'Punkte größte Lücke innen/außen'], [deckel, 'Deckel richtig getippt']].concat(hilfe ? [[hilfe, 'passender erster Skill']] : []),
      };
    },
  });
})();
