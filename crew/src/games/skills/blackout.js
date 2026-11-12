/* Spiel „Blackout“ (Thema: Anspannung & Skills) · Vorlage T1 Solo + Austausch · j1-e11, j1-e12, j1-e14
   Lücke Prüfungsangst: Sam sitzt vor dem Test, der Pegel steigt, die Buchstaben auf dem Blatt verschwimmen – Blackout.
   An vier Stellen wählst du einen Zug (Fußdruck unter dem Tisch, leichteste Aufgabe zuerst, Hand heben und Wasser
   holen, „Ich kann nichts“ zu Ende denken) und siehst, wie viel Sam noch lesen kann. Welcher Zug wirkt, hängt von der
   Zahl ab: Kopf-Züge bei Gelb, Körper und Pause bei Rot.
   Level: 1) Merken (Gelb: Signal und Gedanke erkennen), 2) Gegensteuern (Rot: erst Körper), 3) Blackout lösen
   (zwei Züge in der richtigen Reihenfolge). Danach Vergleichskarte zu zweit:
   „Was machst du vor einem Test – und was hat dir noch nie geholfen?“ Pass erlaubt. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h, clear } = CREW.util;
  const K = () => CREW.skillsKit;

  const LEVELS = ['Merken', 'Gegensteuern', 'Blackout lösen'];
  const AUFGABEN = [
    '1) Berechne: 3/4 + 1/8 = ?',
    '2) Ein Fahrrad kostet 240 €. Es gibt 15 % Rabatt. Wie viel kostet es jetzt?',
    '3) Löse die Gleichung: 2x + 6 = 14',
    '4) Zeichne ein Dreieck mit a = 5 cm, b = 4 cm und γ = 60°.',
    '5) Erkläre in einem Satz, was ein rechter Winkel ist.',
  ];
  /* Vier Stellen: wie viel der Druck draufpackt, Signal, Gedanke. Die vierte ist immer der Blackout. */
  const STELLEN = [
    { plus: 0, start: 50, t: 'Die Lehrerin teilt die Tests aus. Sam liest Aufgabe 1 – und versteht sie nicht sofort.', sig: 'Bauch flau, Hände kalt', gedanke: 'Oh nein. Das kann ich nicht.', min: 50, uhr: 5, aufgabe: 0 },
    { plus: 12, t: 'Die Nachbarin schreibt schon. Sam sitzt seit drei Minuten bei Aufgabe 1.', sig: 'Herz schneller, Fuß wippt', gedanke: 'Alle können das, nur ich nicht.', min: 56, uhr: 13, aufgabe: 2 },
    { plus: 18, t: 'Die Uhr tickt laut. Die Buchstaben fangen an zu schwimmen.', sig: 'Atem flach, Hände feucht', gedanke: 'Ich krieg eine 6. Ich bin so dumm.', min: 74, uhr: 20, aufgabe: 1 },
    { plus: 22, t: 'Aufgabe 4, ganz viel Text. Plötzlich: alles weiß. Sogar das, was Sam gestern noch konnte.', sig: 'Kopf leer, Ohren rauschen', gedanke: '…', blackout: true, min: 88, uhr: 30, aufgabe: 3 },
  ];
  const ZUEGE = [
    { id: 'fuss', label: 'Fußdruck unter dem Tisch', icon: 'bolt', art: 'Körper' },
    { id: 'leicht', label: 'Leichteste Aufgabe zuerst', icon: 'check', art: 'Plan' },
    { id: 'wasser', label: 'Hand heben, Wasser holen', icon: 'right', art: 'Pause' },
    { id: 'zuende', label: '„Ich kann nichts“ zu Ende denken', icon: 'sparkle', art: 'Kopf' },
  ];
  const ZZ = Object.fromEntries(ZUEGE.map((z) => [z.id, z]));
  // Wirkung je Zug und Pegel: d = Änderung, min = Minuten, die es kostet, t = was passiert
  function wirkung(id, p) {
    if (id === 'fuss') return p < 85 ? { d: -15, min: 0, t: 'Sam drückt die Füße fest in den Boden, fünf Sekunden, dreimal. Der Körper merkt: Der Boden ist da.' } : { d: -12, min: 0, t: 'Füße fest in den Boden. Bei diesem Pegel hilft es – nur langsamer.' };
    if (id === 'leicht') return p < 70 ? { d: -12, min: 0, t: 'Sam springt zu Aufgabe 3: 2x + 6 = 14. x = 4. Geschafft! Ein kleiner Erfolg beruhigt.' } : { d: -2, min: 1, t: 'Sam blättert zur leichtesten Aufgabe – aber kann gerade gar nichts lesen. Erst runter, dann planen.' };
    if (id === 'wasser') return p >= 70 ? { d: -22, min: 3, t: 'Sam hebt die Hand und holt Wasser. Kühles Wasser, kurz Flur, zurück. Der Kopf ist wieder da.' } : { d: -8, min: 3, t: 'Wasser holen geht – kostet aber drei Minuten. Bei Gelb reicht oft ein Skill am Platz.' };
    // zuende: „Und dann? Dann eine 5. Und dann? Dann lerne ich mit Yara.“
    if (p >= 75) return { d: +3, min: 0, t: 'Bei so hohem Pegel dreht sich der Gedanke nur schneller: „Und dann? Dann … alles schlimm.“ Erst Körper.' };
    if (p < 50) return { d: -8, min: 0, t: 'Sam denkt es zu Ende: „Und dann? Dann eine schlechte Note. Und dann? Dann übe ich.“ Passt – es war aber noch kaum nötig.' };
    return { d: -15, min: 0, t: 'Sam denkt es zu Ende: „Und dann? Dann eine 5. Und dann? Dann lerne ich mit Yara. Weltuntergang? Nein.“' };
  }
  const lesbar = (p) => Math.max(0, Math.min(100, Math.round(100 - (p - 35) * 1.6)));

  // Das Testblatt: verschwimmt mit dem Pegel
  function blatt(p, o) {
    const oo = o || {};
    const l = lesbar(p);
    const blur = ((100 - l) / 100) * 6.5;
    return h('div', { class: 'bo-blatt' + (l < 30 ? ' schwimmt' : '') + (oo.small ? ' small' : ''), role: 'img', 'aria-label': 'Testblatt, lesbar zu ' + l + ' Prozent', style: { '--blur': blur.toFixed(1) + 'px', '--weg': (Math.max(0, 40 - l) / 40).toFixed(2) } },
      h('div', { class: 'bo-kopf' }, h('b', null, 'Mathe-Test'), h('span', null, 'Name: Sam')),
      h('div', { class: 'bo-inhalt' }, AUFGABEN.map((a, i) => h('p', { 'data-geloest': oo.geloest && oo.geloest.includes(i) ? '1' : '0' }, a))),
      h('div', { class: 'bo-les', 'data-ampel': l >= 60 ? 'gruen' : l >= 30 ? 'gelb' : 'rot' }, CREW.icon(l >= 30 ? 'eye' : 'eyeOff', 18), 'Sam kann noch ' + l + ' % lesen'));
  }
  function samKarte(ctx, st, p) {
    return ctx.figureCard({ fig: 'sam', mood: p >= 70 ? 'angst' : 'neutral', text: st.t, eyebrow: 'Pegel ' + p,
      extra: h('div', { class: 'stack', style: { gap: '6px' } },
        h('p', { class: 'bo-sig' }, CREW.icon('eye', 18), h('span', null, h('b', null, 'Körper: '), st.sig)),
        h('div', { class: 'bo-gedanke' }, '„' + st.gedanke + '“')) });
  }

  CREW.registerGame({
    id: 'blackout',
    template: 'T1',
    icon: 'eyeOff',
    stellen: STELLEN, wirkung, lesbar, // für den Test
    themen: ['Prüfungsangst', 'Skills unter Druck', 'Kopf-Skills bei Gelb', 'Körper bei Rot'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Sam schreibt einen Test. Der Pegel steigt, das Blatt verschwimmt. An vier Stellen wählst du einen Zug – und siehst, wie viel Sam noch lesen kann.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Merken', text: 'Signal und Gedanke: Gelb oder schon Rot?' },
          { icon: 'bolt', title: 'Gegensteuern', text: 'Bei Rot hilft erst der Körper.' },
          { icon: 'users', title: 'Vergleichen', text: 'Zu zweit: Was hilft dir vor einem Test?' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), blatt(80, { small: true }), ctx.say('So sieht ein Blatt bei 80 aus. Wie viel könntest du da lesen?', { eyebrow: 'Zum Ausprobieren', small: true })], { eyebrow: 'Probe' });
          await ctx.ask(w, [{ label: 'Fast nichts', value: 1, variant: 'ghost' }, { label: 'Alles', value: 2, variant: 'ghost' }]);
        },
      });
      await ctx.T.codeCheck();
      let p = STELLEN[0].start;
      let minuten = 45;
      let pause = 0; // Minuten fürs Wasserholen
      const log = [];
      const geloest = [];
      let lastL = 1;
      for (let i = 0; i < STELLEN.length; i++) {
        const st = STELLEN[i];
        const L = i < 2 ? 1 : i === 2 ? 2 : 3;
        if (L !== lastL) { lastL = L; await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Jetzt wird es rot. Die Buchstaben schwimmen. Welcher Zug wirkt bei über 70 noch?' : 'Blackout. Ein Zug reicht nicht: Was zuerst – und was danach?' }); }
        // Der Druck steigt im Test sowieso: mindestens st.min (Gelb, Gelb, Rot, Blackout)
        p = Math.min(100, Math.max(p + st.plus, st.min));
        minuten = 45 - st.uhr - pause;
        const ey = 'Stelle ' + (i + 1) + '/4';
        const w = ctx.scr([
          h('div', { class: 'bo-buehne' }, blatt(p, { geloest }), samKarte(ctx, st, p)),
          h('div', { class: 'row between' }, ctx.meter({ value: p, label: 'Sam' }).el, h('span', { class: 'pill' }, CREW.icon('timer', 14), 'noch ' + Math.max(0, minuten) + ' Min.')),
          ctx.say(st.blackout ? 'Blackout. Was macht Sam ZUERST?' : 'Welcher Zug hilft Sam jetzt?', { eyebrow: K().AMPEL[K().stufe(p)].name + ' · ' + p, small: true }),
        ], { eyebrow: ey, badge: ctx.stufe(L, LEVELS) });
        const z = await ctx.ask(w, ZUEGE.map((x) => ({ label: x.label, value: x.id, icon: x.icon, variant: 'ghost', id: 'bo-zug-' + x.id })));
        if (z === ctx.SKIP) continue;
        let wk = wirkung(z, p);
        const vorher = p;
        p = Math.max(20, Math.min(100, p + wk.d));
        pause += wk.min; minuten -= wk.min;
        const passt = wk.d <= -12;
        log.push({ i, z, vorher, nachher: p, passt });
        if (p < 70 && !geloest.includes(st.aufgabe)) geloest.push(st.aufgabe);
        CREW.sound.play(passt ? 'good' : 'soft');
        let zweiter = null;
        const wR = ctx.scr([
          h('div', { class: 'bo-buehne' }, blatt(p, { geloest }), ctx.figureCard({ fig: 'sam', mood: p < 60 ? 'neutral' : 'angst', text: wk.t, eyebrow: ZZ[z].label + ' · ' + ZZ[z].art })),
          h('div', { class: 'row between' }, h('span', { class: 'amp-pill', 'data-ampel': K().stufe(p) }, vorher + ' → ' + p), h('span', { class: 'pill' + (passt ? ' good' : '') }, passt ? 'Wirkt' : 'Wirkt kaum')),
        ], { eyebrow: ey + ' · Wirkung', badge: ctx.stufe(L, LEVELS) });
        await ctx.next(wR, st.blackout ? 'Und danach?' : i + 1 < STELLEN.length ? 'Weiter im Test' : 'Weiter');
        // Level 3: zweiter Zug nach dem Blackout – erst Körper, dann Kopf oder Plan
        if (st.blackout) {
          const w2 = ctx.scr([
            h('div', { class: 'bo-buehne' }, blatt(p, { geloest }), ctx.figureCard({ fig: 'sam', mood: p < 70 ? 'neutral' : 'angst', text: p < 70 ? 'Der Kopf ist wieder da. Was macht Sam jetzt, damit es weitergeht?' : 'Immer noch ziemlich weiß. Was macht Sam als Nächstes?', eyebrow: 'Pegel ' + p })),
          ], { eyebrow: ey + ' · Und danach?', badge: ctx.stufe(3, LEVELS) });
          const z2 = await ctx.ask(w2, ZUEGE.filter((x) => x.id !== z).map((x) => ({ label: x.label, value: x.id, icon: x.icon, variant: 'ghost', id: 'bo-zug2-' + x.id })));
          if (z2 !== ctx.SKIP) {
            const wk2 = wirkung(z2, p);
            const v2 = p;
            p = Math.max(20, Math.min(100, p + wk2.d));
            pause += wk2.min; minuten -= wk2.min;
            zweiter = { z: z2, passt: wk2.d <= -12 };
            log.push({ i, z: z2, vorher: v2, nachher: p, passt: zweiter.passt });
            if (p < 70 && !geloest.includes(st.aufgabe)) geloest.push(st.aufgabe);
            const reihenfolgeOk = (z === 'fuss' || z === 'wasser') && (z2 === 'leicht' || z2 === 'zuende');
            CREW.sound.play(p < 60 ? 'great' : 'soft');
            const w3 = ctx.scr([
              h('div', { class: 'bo-buehne' }, blatt(p, { geloest }), ctx.figureCard({ fig: 'sam', mood: p < 60 ? 'froh' : 'angst', text: wk2.t, eyebrow: ZZ[z2].label })),
              ctx.say(reihenfolgeOk ? 'Starke Reihenfolge: erst den Körper runterholen, dann mit Kopf oder Plan weiter. So kommt man aus einem Blackout.' : p < 60 ? 'Sam ist wieder da. Merke: Bei Rot zuerst Körper oder Pause, danach Kopf und Plan.' : 'Noch nicht ganz. Bei einem Blackout hilft zuerst der Körper oder eine kurze Pause – danach Kopf und Plan.', { eyebrow: 'Blackout lösen', small: true }),
              h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('star', 14), 'Skill-Karte „Fester Stand“')),
            ], { eyebrow: ey + ' · Blackout lösen', badge: ctx.stufe(3, LEVELS) });
            await ctx.next(w3, 'Abgabe');
          }
        }
      }
      // Abgabe: wie viele Aufgaben schafft Sam?
      if (p < 60 && !geloest.includes(4)) geloest.push(4); // ruhig genug für die letzte Aufgabe
      const geschafft = geloest.length;
      const wA = ctx.scr([
        h('div', { class: 'bo-buehne' }, blatt(Math.min(p, 60), { geloest }),
          h('div', { class: 'stack', style: { gap: '10px' } },
            h('div', { class: 'bo-abgabe' }, h('b', { class: 'display' }, geschafft + ' von 5'), h('span', null, 'Aufgaben geschafft')),
            h('div', { class: 'bo-log' }, log.map((x) => h('span', { class: 'chip small bo-logchip' + (x.passt ? ' ok' : '') }, CREW.icon(ZZ[x.z].icon, 16), ZZ[x.z].label + ' · ' + x.vorher + '→' + x.nachher))))),
        ctx.say(geschafft >= 4 ? 'Sam hat den Blackout gelöst. Nicht perfekt – aber Sam hat weitergeschrieben.' : 'Sam hat abgegeben. Beim nächsten Test: früher merken, bei Rot erst Körper.', { eyebrow: 'Abgabe', small: true }),
      ], { eyebrow: 'Abgabe', badge: ctx.stufe(3, LEVELS) });
      await ctx.next(wA, 'Zum Austausch');
      // Austausch zu zweit
      await ctx.T.pairScreen({});
      await ctx.T.vergleich({
        title: 'Blackout – Vergleichskarte',
        items: log.map((x) => ({ label: ZZ[x.z].label, icon: ZZ[x.z].icon, text: 'bei ' + x.vorher + ' · ' + (x.passt ? 'hat gewirkt' : 'wirkte kaum') })),
        questions: ['Was machst du vor einem Test, das dir hilft?', 'Und was hat dir noch nie geholfen?'],
        note: 'Über dich nur, wenn du willst. Pass ist okay. Sams Züge stehen links.',
      });
      return {
        summary: 'Prüfungsangst ist ein Pegel: Bei Gelb helfen Kopf und Plan, bei Rot zuerst Körper oder eine kurze Pause.',
        stats: [[geschafft, 'von 5 Aufgaben'], [log.filter((x) => x.passt).length, 'Züge, die wirkten'], [Math.max(0, minuten), 'Minuten übrig']],
      };
    },
  });
})();
