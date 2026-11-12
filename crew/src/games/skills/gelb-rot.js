/* Spiel „Gelb oder Rot?“ (Thema: Anspannung & Skills) · Vorlage T4 Bewegung im Raum · j1-e14
   Umgebaut nach der Kritik: kein Handzeichen-Zählen. Zwei Wände: Gelb („der Kopf-Skill zieht noch“) und Rot
   („erst der Körper“). Der Beamer zeigt eine Figur mit Zahl, Ort und einem Kopf-Skill aus der Stunde (Gedankenstopp,
   „Ist nur ein Gedanke“, Gedankenschiffchen …). Gehen, Stopp, die kleinere Wand erklärt zuerst, die Folge-Szene zeigt,
   was passiert. Level: 1) Zahl lesen, 2) Ohne Zahl (nur Körper-Signale), 3) Körper, dann Kopf: Bei Rot baut die Crew
   per Zuruf die Reihenfolge, die Lehrkraft tippt sie ein, die Zahl sinkt Stufe für Stufe. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;
  const K = () => CREW.skillsKit;

  const LEVELS = ['Zahl lesen', 'Ohne Zahl', 'Körper, dann Kopf'];
  // Kopf-Skills (j1-e14 Achtsamkeit und Kopf-Skills)
  const KOPF = {
    stopp: { name: 'Gedankenstopp', text: 'Innerlich laut „Stopp!“ sagen und an ein Stoppschild denken.' },
    nurgedanke: { name: '„Ist nur ein Gedanke“', text: 'Sich sagen: Das ist ein Gedanke, keine Tatsache.' },
    schiffchen: { name: 'Gedankenschiffchen', text: 'Den Gedanken auf ein Schiffchen setzen und wegfahren lassen.' },
    stimme: { name: 'Freundliche Stimme', text: 'Was würde ich jetzt einer Freundin sagen?' },
    zaehlen: { name: 'Rückwärts zählen', text: 'Von 100 in Siebener-Schritten rückwärts zählen.' },
    benennen: { name: 'Benennen', text: '„Ich bemerke, dass ich gerade … denke.“' },
  };
  // Körper-Skills für die Reihenfolge in Level 3
  const KOERPER = [
    { id: 'fuss', t: 'Füße fest in den Boden', icon: 'bolt' },
    { id: 'wasser', t: 'Kaltes Wasser, Hände ins Waschbecken', icon: 'leaf' },
    { id: 'raus', t: 'Kurz raus, einmal Treppe hoch und runter', icon: 'right' },
    { id: 'faust', t: 'Fäuste ballen, 5 Sekunden, lösen', icon: 'bolt' },
  ];
  /* Situationen: zahl, Ort, Kopf-Skill, Signale (für Level 2), was passiert bei Gelb (Skill zieht) bzw. bei Rot (prallt ab) */
  const LAGEN = [
    { id: 'hausaufgaben', fig: 'luca', mood: 'genervt', zahl: 45, ort: 'Schreibtisch, zu Hause', text: 'Luca sitzt an den Hausaufgaben. Im Kopf kreist: „Ich schaff das eh nicht.“', skill: 'nurgedanke', signale: 'Seufzt, kaut am Stift, Schultern etwas hoch',
      folge: 'Luca sagt sich: „Ist nur ein Gedanke.“ Der Satz wird leiser. Luca macht die erste Aufgabe.' },
    { id: 'handy', fig: 'yara', mood: 'wut', zahl: 85, ort: 'Pausenhof', text: 'Jemand hat Yaras Handy vom Tisch gestoßen. Das Display ist gesprungen. Der andere lacht.', skill: 'stopp', signale: 'Gesicht rot, Fäuste, schneller Atem, Kiefer fest',
      folge: 'Yara denkt „Stopp!“ – aber das Wort prallt ab. Der Kopf ist im Alarm.', danach: 'Erst Füße fest und raus aus der Situation. Dann klappt auch „Stopp“. Danach: Aufsicht holen.' },
    { id: 'referat', fig: 'mika', mood: 'angst', zahl: 60, ort: 'Im Bett, abends', text: 'Morgen ist Mikas Referat. Mika liegt im Bett, die Gedanken drehen sich.', skill: 'schiffchen', signale: 'Wälzt sich hin und her, Herz etwas schneller',
      folge: 'Mika setzt den Gedanken „Ich blamier mich“ aufs Schiffchen. Nach ein paar Runden wird es ruhiger.' },
    { id: 'chat', fig: 'sam', mood: 'wut', zahl: 75, ort: 'Gruppenchat', text: 'Im Chat wird Sam ausgelacht. Zehn Lach-Emojis in einer Minute.', skill: 'stimme', signale: 'Heißes Gesicht, Hände zittern, tippt schon zurück',
      folge: 'Sam fragt sich: „Was würde ich einer Freundin sagen?“ – aber es kommt nichts. Nur Wut.', danach: 'Erst Handy weg, kaltes Wasser. Dann geht die freundliche Stimme – und Sam schreibt nichts Dummes.' },
    { id: 'antwort', fig: 'yara', mood: 'neutral', zahl: 35, ort: 'Im Bus', text: 'Yaras Freundin hat seit dem Morgen nicht zurückgeschrieben. Yara grübelt ein bisschen.', skill: 'benennen', signale: 'Schaut öfter aufs Handy, sonst ruhig',
      folge: 'Yara bemerkt: „Ich denke gerade, sie mag mich nicht mehr.“ Schon wirkt der Gedanke kleiner.' },
    { id: 'elfer', fig: 'luca', mood: 'wut', zahl: 90, ort: 'Fußballplatz', text: 'Der Schiri gibt Elfmeter gegen Luca. Luca hat den Ball gar nicht berührt.', skill: 'zaehlen', signale: 'Brüllt schon, Fäuste, läuft auf den Schiri zu',
      folge: 'Rückwärts zählen? Luca kommt nicht mal bis 93. Der Kopf ist voll Wut.', danach: 'Erst zehn Schritte weg, Fäuste lösen, ausatmen. Danach schafft Luca das Zählen – und bleibt im Spiel.' },
    { id: 'arbeit', fig: 'mika', mood: 'angst', zahl: 68, ort: 'Vor der Mathe-Arbeit', text: 'Gleich wird die Mathe-Arbeit ausgeteilt. Mika ist nervös, aber noch ansprechbar.', skill: 'zaehlen', signale: 'Fuß wippt, Hände kalt, redet noch mit der Nachbarin',
      folge: 'Knapp unter 70: Mika zählt 100, 93, 86 … Als das Blatt kommt, ist der Kopf ruhiger. Mika fängt an.' },
    { id: 'schwester', fig: 'sam', mood: 'genervt', zahl: 72, ort: 'Abendessen', text: 'Sams Schwester macht sich zum dritten Mal über Sams Frisur lustig. Alle lachen.', skill: 'nurgedanke', signale: 'Kiefer fest, Gabel fest in der Hand, Gesicht warm',
      folge: 'Knapp über 70: „Ist nur ein Gedanke“ hilft nur ein bisschen. Der Ärger brodelt weiter.', danach: 'Erst unterm Tisch die Füße fest drücken, zweimal lang ausatmen. Dann wirkt der Satz – und Sam sagt ruhig: „Lass das.“' },
  ];
  const istRot = (l) => l.zahl >= 70;

  function lageKarte(ctx, l, o) {
    const oo = o || {};
    const name = ctx.figures[l.fig].name;
    const sk = KOPF[l.skill];
    const zahl = oo.verdeckt
      ? h('div', { class: 'gr-zahl verdeckt' }, CREW.icon('eyeOff', 26), h('span', null, 'Zahl verdeckt'))
      : h('div', { class: 'gr-zahl', 'data-ampel': K().stufe(l.zahl) }, h('span', { class: 'eyebrow' }, 'Anspannung'), h('b', { class: 'display' }, String(l.zahl)));
    return h('div', { class: 'gr-karte' },
      ctx.figureCard({ fig: l.fig, mood: oo.verdeckt ? 'neutral' : l.mood, text: l.text, eyebrow: (oo.eyebrow ? oo.eyebrow + ' · ' : '') + l.ort,
        extra: oo.verdeckt ? h('p', { class: 'gr-signale' }, CREW.icon('eye', 18), h('span', null, h('b', null, 'Körper: '), l.signale)) : null }),
      h('div', { class: 'gr-seite' }, zahl,
        h('div', { class: 'gr-skill' }, h('span', { class: 'eyebrow' }, 'Kopf-Skill'), h('b', null, sk.name), h('span', { class: 'muted small' }, sk.text))));
  }

  CREW.registerGame({
    id: 'gelb-rot',
    template: 'T4',
    icon: 'sparkle',
    lagen: LAGEN, kopf: KOPF, // für den Test
    themen: ['Kopf-Skills', 'Körper vor Kopf', 'Ampelplan', 'Entscheidungen begründen'],
    safety: ['figuren', 'koerper', 'raum'],
    async run(ctx) {
      const POS = [{ id: 'gelb', label: 'Gelb', where: 'Wand links · Kopf-Skill zieht' }, { id: 'rot', label: 'Rot', where: 'Wand rechts · erst Körper' }];
      await ctx.T.intro({
        rule: 'Eine Figur, eine Zahl, ein Kopf-Skill. Zieht der Skill hier noch – dann zur gelben Wand. Braucht es erst den Körper – zur roten Wand.',
        levels: LEVELS,
        steps: [
          { icon: 'sparkle', title: 'Zahl lesen', text: 'Unter 70 zieht der Kopf. Ab 70 ist er im Alarm.' },
          { icon: 'eyeOff', title: 'Ohne Zahl', text: 'Nur der Körper verrät, wie hoch es ist.' },
          { icon: 'steps', title: 'Körper, dann Kopf', text: 'Bei Rot baut ihr die Reihenfolge per Zuruf.' },
        ],
        probe: async () => {
          await ctx.T.walk({ card: ctx.say('Probe: Sam ist bei 20 und denkt „Ich hab keine Lust“. Zieht „Ist nur ein Gedanke“? Kurz hingehen – zählt nicht.', { eyebrow: 'PROBE · zählt nicht' }), positions: POS, seconds: 10, step: 'Probe', question: 'Probe vorbei: Gelb – bei 20 zieht der Kopf locker. Kurz nicken reicht.', minorityFirst: false });
        },
      });
      // Die Wände einmal zeigen
      const wW = ctx.scr([
        h('div', { class: 'gr-waende' },
          h('div', { class: 'gr-wand', 'data-ampel': 'gelb' }, h('b', { class: 'display' }, 'Gelb'), h('span', null, 'Wand links'), h('p', null, 'Der Kopf-Skill zieht noch. Unter 70 kann der Kopf mitarbeiten.')),
          h('div', { class: 'gr-wand', 'data-ampel': 'rot' }, h('b', { class: 'display' }, 'Rot'), h('span', null, 'Wand rechts'), h('p', null, 'Erst der Körper. Ab 70 ist der Kopf im Alarm – Denken prallt ab.'))),
        h('div', { class: 'row' }, ctx.safetyLine('koerper'), ctx.safetyLine('raum')),
      ], { eyebrow: 'Die Wände' });
      if ((await ctx.next(wW, 'Los')) === ctx.SKIP) return { summary: 'Heute keine Wände. Nächstes Mal.' };

      // Plan: Level 1 zwei Lagen mit Zahl (eine gelb, eine rot), Level 2 zwei ohne Zahl (knapp an 70), Level 3 eine rote mit Reihenfolge
      const gelb = ctx.rshuffle(LAGEN.filter((l) => !istRot(l)));
      const rot = ctx.rshuffle(LAGEN.filter(istRot));
      const knapp = (l) => Math.abs(l.zahl - 70) <= 8;
      const l1 = ctx.rshuffle([gelb.find((l) => !knapp(l)), rot.find((l) => !knapp(l))]);
      const used = new Set(l1);
      const l2 = ctx.rshuffle([gelb.find((l) => !used.has(l) && knapp(l)) || gelb.find((l) => !used.has(l)), rot.find((l) => !used.has(l) && knapp(l)) || rot.find((l) => !used.has(l))]);
      l2.forEach((l) => used.add(l));
      const l3 = rot.find((l) => !used.has(l)) || rot[0];
      const plan = l1.map((l) => ({ l, L: 1 })).concat(l2.map((l) => ({ l, L: 2 })), [{ l: l3, L: 3 }]);
      let gegangen = 0, reihenfolge = 0;
      for (let i = 0; i < plan.length; i++) {
        const { l, L } = plan[i];
        const name = ctx.figures[l.fig].name;
        if (i > 0 && plan[i - 1].L !== L) await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Jetzt ist die Zahl verdeckt. Nur der Körper der Figur verrät, ob es Gelb oder Rot ist. Woran erkennt ihr es?' : 'Letzte Lage: Danach baut ihr bei Rot per Zuruf die Reihenfolge – erst Körper, dann Kopf.' });
        const ey = 'Lage ' + (i + 1) + '/' + plan.length;
        const r = await ctx.T.walk({
          card: lageKarte(ctx, l, { verdeckt: L === 2, eyebrow: ey }),
          positions: POS, seconds: 10, step: ey, badge: ctx.stufe(L, LEVELS),
          question: L === 2 ? 'Die kleinere Wand erklärt zuerst: Woran im Körper habt ihr erkannt, wie hoch es ist?' : 'Die kleinere Wand erklärt zuerst: Warum zieht der Skill – oder warum nicht?',
          nextLabel: 'Folge-Szene',
        });
        if (r === ctx.SKIP) continue;
        gegangen++;
        const rotJa = istRot(l);
        CREW.sound.play('reveal');
        const wF = ctx.scr([
          h('div', { class: 'row center', style: { gap: '10px' } }, h('span', { class: 'amp-pill gr-big', 'data-ampel': rotJa ? 'rot' : 'gelb' }, rotJa ? 'Rot' : 'Gelb'), L === 2 ? h('span', { class: 'amp-pill', 'data-ampel': K().stufe(l.zahl) }, name + ' stand bei ' + l.zahl) : null, knapp(l) ? h('span', { class: 'muted small' }, 'Knapp an 70 – beide Wände hatten gute Gründe.') : null),
          ctx.figureCard({ fig: l.fig, mood: rotJa ? l.mood : 'neutral', text: l.folge, eyebrow: 'So geht es weiter: ' + KOPF[l.skill].name }),
          rotJa && L < 3 ? ctx.say(l.danach, { eyebrow: 'Erst Körper, dann Kopf', small: true }) : null,
          CREW.ui.teacherLine('Wände fragen, nicht Einzelne. Nicht zählen, wer wo stand.'),
        ], { eyebrow: ey + ' · Folge-Szene', badge: ctx.stufe(L, LEVELS) });
        await ctx.next(wF, L === 3 && rotJa ? 'Reihenfolge bauen' : i + 1 < plan.length ? 'Nächste Lage' : 'Weiter');
        // Level 3: Reihenfolge per Zuruf – erst Körper, dann Kopf
        if (L === 3 && rotJa) {
          const meter = ctx.meter({ value: l.zahl, label: name });
          const wK = ctx.scr([
            ctx.say('Ruft rein: Was macht ' + name + ' ZUERST mit dem Körper? Die Lehrkraft tippt, was die Crew sagt.', { eyebrow: 'Schritt 1 · Körper', small: true }),
            meter.el,
          ], { eyebrow: ey + ' · Körper, dann Kopf', badge: ctx.stufe(3, LEVELS) });
          const k1 = await ctx.ask(wK, KOERPER.map((k) => ({ label: k.t, value: k.id, icon: k.icon, variant: 'ghost', id: 'gr-koerper-' + k.id })).concat([{ label: 'Doch erst den Kopf-Skill', value: 'kopf', variant: 'ghost', icon: 'sparkle', id: 'gr-erstkopf', auto: false }]));
          if (k1 === ctx.SKIP) continue;
          if (k1 === 'kopf') {
            CREW.sound.play('soft');
            const wX = ctx.scr([ctx.figureCard({ fig: l.fig, mood: l.mood, text: KOPF[l.skill].name + ' bei ' + l.zahl + '? Prallt ab – wie in der Szene. Die Zahl bleibt oben. Nochmal: erst der Körper.', eyebrow: 'Zurückspulen' }), meter.el], { eyebrow: ey + ' · Körper, dann Kopf', badge: ctx.stufe(3, LEVELS) });
            await ctx.next(wX, 'Körper wählen');
          }
          const kWahl = k1 === 'kopf' ? KOERPER[0] : KOERPER.find((k) => k.id === k1);
          const nachKoerper = Math.max(45, l.zahl - 30);
          meter.set(nachKoerper);
          CREW.sound.play('good');
          const wK2 = ctx.scr([
            h('div', { class: 'gr-treppe' }, h('div', { class: 'gr-stufe', 'data-ampel': 'rot' }, h('b', null, String(l.zahl)), h('span', null, 'Start')), CREW.icon('right', 26), h('div', { class: 'gr-stufe', 'data-ampel': K().stufe(nachKoerper) }, h('b', null, String(nachKoerper)), h('span', null, kWahl.t))),
            meter.el,
            ctx.say('Unter 70! Jetzt zieht der Kopf wieder. Welcher Kopf-Skill kommt als Zweites?', { eyebrow: 'Schritt 2 · Kopf', small: true }),
          ], { eyebrow: ey + ' · Körper, dann Kopf', badge: ctx.stufe(3, LEVELS) });
          const kopfOpts = ctx.rshuffle(Object.keys(KOPF)).filter((k) => k !== l.skill).slice(0, 2).concat([l.skill]);
          const k2 = await ctx.ask(wK2, ctx.rshuffle(kopfOpts).map((k) => ({ label: KOPF[k].name, value: k, variant: 'ghost', icon: 'sparkle', id: 'gr-kopf-' + k })));
          if (k2 === ctx.SKIP) continue;
          const ende = Math.max(15, nachKoerper - 25);
          meter.set(ende);
          reihenfolge++;
          CREW.sound.play('great');
          const wK3 = ctx.scr([
            h('div', { class: 'gr-treppe' },
              h('div', { class: 'gr-stufe', 'data-ampel': 'rot' }, h('b', null, String(l.zahl)), h('span', null, 'Start')), CREW.icon('right', 26),
              h('div', { class: 'gr-stufe', 'data-ampel': K().stufe(nachKoerper) }, h('b', null, String(nachKoerper)), h('span', null, kWahl.t)), CREW.icon('right', 26),
              h('div', { class: 'gr-stufe', 'data-ampel': K().stufe(ende) }, h('b', null, String(ende)), h('span', null, KOPF[k2].name))),
            ctx.figureCard({ fig: l.fig, mood: 'neutral', text: l.danach, eyebrow: 'Erst Körper, dann Kopf' }),
            h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('star', 14), 'Skill-Karte „Gedankenschiffchen“'), h('span', { class: 'skill-chip karte' }, CREW.icon('star', 14), 'Skill-Karte „Runter unter 70“')),
          ], { eyebrow: ey + ' · Körper, dann Kopf', badge: ctx.stufe(3, LEVELS) });
          await ctx.next(wK3, 'Weiter');
        }
      }
      return {
        summary: gegangen ? 'Unter 70 hilft der Kopf. Ab 70 erst der Körper – dann der Kopf.' : 'Heute nur reingeschaut.',
        stats: [[gegangen, 'Lagen gegangen'], [reihenfolge, 'Reihenfolge gebaut']],
      };
    },
  });
})();
