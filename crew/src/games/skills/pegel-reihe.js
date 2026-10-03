/* Spiel „Pegel-Reihe“ (Thema: Anspannung & Skills) · Vorlage T2 Rollen-Puzzle · j1-e11
   Jedes iPad zeigt eine Figur in einer Situation mit versteckter Anspannungszahl 0–100 (Platz-Nummer
   bestimmt die Karte, Tagescode die Mischung). Ohne ein Wort legt die Crew die iPads von niedrig nach hoch –
   wer glaubt, die niedrigste zu haben, legt zuerst. Aufdecken, falsch sortierte iPads leuchten, „2 falsch – trotzdem
   geschafft“. Die Lehrkraft tippt nichts. Variante zu zweit (j1-e11): Innen/Außen mit der ruhigen 85er-Figur. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* 16 Figuren-Situationen aus der „Linie im Raum“: Außen (was man sieht), Innen (versteckte Zahl).
     signal = nonverbales Signal, das die Crew ohne Worte zeigen kann. ruhig = außen ruhig, innen hoch. */
  const KARTEN = [
    { fig: 'sam', mood: 'froh', text: 'Der Trainer sagt vor dem ganzen Team: „Sam, das war heute dein bestes Spiel.“', aussen: 'Grinst, schaut auf den Boden, Hände in den Taschen.', zahl: 10, signal: 'breit grinsen' },
    { fig: 'luca', mood: 'neutral', text: 'Luca liegt am Sonntag auf dem Bett. Musik, Handy aus, nichts zu tun.', aussen: 'Augen halb zu, ein Fuß wippt im Takt.', zahl: 5, signal: 'gähnen, zurücklehnen' },
    { fig: 'yara', mood: 'froh', text: 'Yara wartet auf die Pizza. In zehn Minuten kommt die beste Freundin.', aussen: 'Lächelt, schaut alle zwei Minuten aus dem Fenster.', zahl: 20, signal: 'leicht hin und her wippen' },
    { fig: 'mika', mood: 'neutral', text: 'Mika packt den Rucksack für morgen. Nichts Besonderes, normale Schulwoche.', aussen: 'Ruhig, summt leise, sortiert Hefte.', zahl: 15, signal: 'ruhig nicken' },
    { fig: 'luca', mood: 'neutral', text: 'Luca soll in der Gruppenarbeit die Ergebnisse vorstellen. Noch zehn Minuten.', aussen: 'Liest den Zettel dreimal, trommelt mit dem Stift.', zahl: 45, signal: 'mit den Fingern trommeln' },
    { fig: 'sam', mood: 'genervt', text: 'Sams kleiner Bruder hat zum dritten Mal die Kopfhörer genommen – ohne zu fragen.', aussen: 'Augen verdrehen, laut ausatmen.', zahl: 40, signal: 'Augen verdrehen' },
    { fig: 'yara', mood: 'angst', text: 'Morgen ist der Mathe-Test. Yara hat gelernt, aber Brüche gehen immer noch nicht.', aussen: 'Kaut auf dem Stift, schaut immer wieder auf die Uhr.', zahl: 60, signal: 'auf den Nägeln kauen' },
    { fig: 'mika', mood: 'genervt', text: 'Mikas Mutter nimmt das Handy weg: „Bis morgen früh. Keine Diskussion.“', aussen: 'Tür zu, nicht geknallt. Setzt sich aufs Bett, Arme verschränkt.', zahl: 65, signal: 'Arme verschränken' },
    { fig: 'luca', mood: 'wut', text: 'Im Gruppenchat schreibt jemand über Luca: „Der bringt eh nichts.“ Alle sehen es.', aussen: 'Kiefer fest, tippt schnell, löscht wieder.', zahl: 75, signal: 'Kiefer anspannen, Fäuste' },
    { fig: 'sam', mood: 'angst', text: 'Sam steht vor der Klasse. Der Vortrag beginnt. Der erste Satz ist weg.', aussen: 'Hände zittern leicht, Stimme dünn, schaut auf den Zettel.', zahl: 80, signal: 'zittrige Hände' },
    { fig: 'yara', mood: 'neutral', text: 'Yara sitzt beim Familienessen. Alles wirkt normal. Vor einer Stunde hat sie erfahren, dass die Eltern sich trennen.', aussen: 'Isst ruhig, antwortet kurz, lächelt sogar. Innen: Sturm.', zahl: 85, signal: 'ganz still sitzen, Blick leer', ruhig: true },
    { fig: 'mika', mood: 'wut', text: 'Mika wird beim Fußball gefoult, der Schiri pfeift nicht. Der Gegner grinst.', aussen: 'Rotes Gesicht, geht auf den Gegner zu, Fäuste.', zahl: 90, signal: 'rotes Gesicht, nach vorn gehen' },
    { fig: 'luca', mood: 'angst', text: 'Luca hat den Bus verpasst, das Handy ist leer, es ist dunkel und niemand weiß, wo Luca ist.', aussen: 'Schneller Atem, läuft hin und her, schaut in alle Richtungen.', zahl: 95, signal: 'schnell atmen, hin und her laufen' },
    { fig: 'sam', mood: 'neutral', text: 'Sam hört im Bus, wie zwei Leute über jemand anderen lästern. Geht Sam nichts an.', aussen: 'Kopfhörer rein, aus dem Fenster schauen.', zahl: 30, signal: 'Schultern locker, wegschauen' },
    { fig: 'yara', mood: 'froh', text: 'Yara hat das Bewerbungsgespräch für das Praktikum morgen. Die Sachen liegen bereit.', aussen: 'Aufgeregt, redet schneller, lacht viel.', zahl: 50, signal: 'schnell reden, viel lachen' },
    { fig: 'mika', mood: 'neutral', text: 'Mika wartet beim Zahnarzt. Nur Kontrolle. Der Bohrer ist nebenan zu hören.', aussen: 'Sitzt gerade, Füße fest auf dem Boden, Blick auf das Handy.', zahl: 55, signal: 'Füße fest aufstellen', ruhig: true },
  ];
  const stufe = (z) => (z >= 70 ? 'rot' : z >= 40 ? 'gelb' : 'gruen');
  const STUFEN_TEXT = { gruen: 'Grün: Kopf-Skills ziehen noch.', gelb: 'Gelb: Zeit für einen Skill.', rot: 'Rot: erst Körper, dann Kopf.' };

  /* Karte auf dem eigenen iPad – Zahl verdeckt oder aufgedeckt */
  function karte(ctx, k, o) {
    const oo = o || {};
    const name = CREW.games.figures[k.fig].name;
    const zahl = h('div', { class: 'pegel-zahl', 'data-stufe': stufe(k.zahl) },
      oo.offen ? h('b', { class: 'display' }, String(k.zahl)) : h('span', { class: 'pegel-hidden' }, CREW.icon('eyeOff', 36), h('span', null, '0–100 · verdeckt')));
    return h('div', { class: 'pegel-card' + (oo.offen ? ' offen' : '') },
      ctx.figureCard({ fig: k.fig, mood: k.mood, text: k.text, eyebrow: oo.eyebrow || 'Deine Karte', extra: h('p', { class: 'muted small' }, 'Außen: ' + k.aussen), speakText: k.text + ' Außen: ' + k.aussen }),
      h('div', { class: 'pegel-side' }, h('span', { class: 'eyebrow' }, oo.offen ? name + ' innen' : 'Anspannung'), zahl,
        oo.offen ? h('span', { class: 'muted small' }, STUFEN_TEXT[stufe(k.zahl)] + (k.ruhig ? ' Außen ruhig – innen ' + k.zahl + '.' : '')) : h('span', { class: 'muted small' }, 'Zeig es ohne Worte: ' + k.signal + '.')));
  }

  /* Karte für diesen Platz in dieser Runde: Tagescode mischt, Platz wählt (alle iPads verschieden) */
  function karteFuer(ctx, runde) {
    const pool = CREW.seed.shuffle(KARTEN, CREW.seed.rng(ctx.code, 'pegel-reihe', 'r' + runde));
    const idx = ((ctx.seat || 1) - 1) % pool.length;
    return pool[idx];
  }

  /* Eine Reihe: Karte zeigen, ohne Worte legen, aufdecken, Kipper, zählen */
  async function reihe(ctx, nr, total) {
    const k = karteFuer(ctx, nr);
    const ey = 'Reihe ' + nr + '/' + total;
    const w = ctx.scr([
      karte(ctx, k, { eyebrow: 'Platz ' + ctx.seat + ' · nur du siehst diese Karte' }),
      h('div', { class: 'card stack soft' },
        h('b', null, 'Kein Wort. Legt die iPads in eine Reihe: niedrig links, hoch rechts.'),
        h('p', { class: 'muted small' }, 'Wer glaubt, die niedrigste Zahl zu haben, legt zuerst. Zeigen mit Gesicht und Körper ist erlaubt, Reden nicht. Tippt erst „Aufdecken“, wenn die Reihe liegt.')),
    ], { eyebrow: ey, badge: h('span', { class: 'pill accent' }, 'Platz ' + ctx.seat) });
    const go = await ctx.ask(w, [{ label: 'Aufdecken', value: 'open', iconRight: 'eye', id: 'btn-open' }]);
    if (go === ctx.SKIP) return null;
    CREW.sound.play('unlock');
    // Aufgedeckt: Zahl groß, dann der Kipper-Check gegen links und rechts
    const w2 = ctx.scr([
      karte(ctx, k, { offen: true, eyebrow: 'Aufgedeckt' }),
      h('div', { class: 'card stack soft' }, h('b', null, 'Schaut links und rechts: Ist links kleiner, rechts größer?'), h('p', { class: 'muted small' }, 'Wenn nicht, leuchtet dein iPad: falsch sortiert. Das ist kein Fehler – es zeigt, wo die Zahl schwer zu lesen war.')),
    ], { eyebrow: ey + ' · Aufgedeckt' });
    const kipp = await ctx.ask(w2, [{ label: 'Passt', value: 'ok', variant: 'ghost', icon: 'check' }, { label: 'Falsch sortiert', value: 'kipp', variant: 'ghost', icon: 'bolt' }]);
    if (kipp === ctx.SKIP) return null;
    // Leuchten
    const w3 = ctx.scr([
      h('div', { class: 'pegel-light', 'data-kipp': kipp === 'kipp' ? '1' : '0' }, CREW.icon(kipp === 'kipp' ? 'bolt' : 'check', 64), h('b', { class: 'display' }, kipp === 'kipp' ? 'Falsch sortiert' : 'Sitzt'), h('span', null, CREW.games.figures[k.fig].name + ' · ' + k.zahl)),
      h('p', { class: 'muted' }, 'Haltet die iPads hoch. Wie viele leuchten „falsch sortiert“? Zählt laut, zusammen.'),
    ], { eyebrow: ey + ' · Aufdecken', center: true });
    const st = CREW.ui.stepper({ value: 0, min: 0, max: 8 });
    w3.appendChild(h('div', { class: 'card stack', style: { alignItems: 'center' } }, h('span', { class: 'eyebrow' }, 'Falsch sortiert in der Reihe'), st.el));
    const r = await ctx.next(w3, 'Weiter');
    if (r === ctx.SKIP) return null;
    const n = ctx.auto ? Math.floor(ctx.autoRng() * 3) : st.get();
    const w4 = ctx.scr([
      h('div', { class: 'pegel-result' }, h('b', { class: 'display' }, n === 0 ? 'Alle richtig' : n + ' falsch sortiert'), h('span', null, n === 0 ? 'Die Reihe stimmt. Ohne ein Wort.' : 'trotzdem geschafft. Ohne ein Wort.')),
      ctx.say(k.ruhig ? 'Kurz reden: Eine Figur war außen ruhig und innen hoch. Woran hättet ihr es merken können?' : 'Kurz reden: Welche Karte war am schwersten einzuordnen? Was hat beim Lesen der Zahl geholfen – Gesicht, Hände, Haltung?', { eyebrow: 'Jetzt reden', small: true }),
      ctx.safetyLine('figuren'),
    ], { eyebrow: ey + ' · Ergebnis' });
    await ctx.next(w4, nr < total ? 'Nächste Reihe' : 'Fertig');
    return { kipper: n, zahl: k.zahl };
  }

  /* Variante zu zweit (j1-e11): Innen/Außen – erst die ruhige 85er-Figur, dann zwei weitere */
  async function innenAussen(ctx) {
    const ruhig = KARTEN.find((k) => k.ruhig && k.zahl === 85);
    const rest = ctx.rshuffle(KARTEN.filter((k) => !k.ruhig)).slice(0, 2);
    const liste = [ruhig].concat(rest);
    let treffer = 0;
    const STUFEN = [{ id: 'gruen', label: '0–39 · Grün', icon: 'leaf' }, { id: 'gelb', label: '40–69 · Gelb', icon: 'eye' }, { id: 'rot', label: '70–100 · Rot', icon: 'bolt' }];
    for (let i = 0; i < liste.length; i++) {
      const k = liste[i];
      const name = CREW.games.figures[k.fig].name;
      const w = ctx.scr([
        ctx.figureCard({ fig: k.fig, mood: i === 0 ? 'neutral' : k.mood, text: k.text, eyebrow: 'Außen · was man sieht', extra: h('p', null, h('b', null, 'Außen: '), k.aussen.replace(' Innen: Sturm.', '')) }),
        ctx.say('Ihr seht nur das Außen. Wie hoch steht ' + name + ' innen? Einigt euch auf eine Stufe.', { eyebrow: 'Figur ' + (i + 1) + '/3', small: true }),
      ], { eyebrow: 'Innen/Außen · ' + (i + 1) + '/3' });
      const tipp = await ctx.ask(w, STUFEN.map((s) => ({ label: s.label, value: s.id, icon: s.icon, variant: 'ghost' })));
      if (tipp === ctx.SKIP) continue;
      await ctx.T.twoFinger(w, { label: 'Beide: Finger drauf – das ist euer Tipp' });
      const hit = tipp === stufe(k.zahl);
      if (hit) treffer++;
      const nach = k.ruhig ? 'Außen ruhig, innen ' + k.zahl + ' – das gibt es. Nicht jede Anspannung ist sichtbar.' : 'Kurz reden: Welches Außen-Signal hat euch geholfen – oder in die Irre geführt?';
      const w2 = ctx.scr([
        karte(ctx, k, { offen: true, eyebrow: 'Innen · aufgedeckt' }),
        ctx.say((hit ? 'Euer Tipp passt. ' : 'Innen sieht es anders aus als außen. ') + nach, { eyebrow: hit ? 'Vorhersage stimmt' : 'Anders als gedacht', small: true }),
      ], { eyebrow: 'Innen/Außen · Auflösung' });
      await ctx.next(w2, i + 1 < liste.length ? 'Nächste Figur' : 'Fertig');
    }
    return { summary: 'Außen ruhig heißt nicht innen ruhig. Fragen hilft mehr als raten.', stats: [[treffer, 'von 3 Stufen getroffen']] };
  }

  CREW.registerGame({
    id: 'pegel-reihe',
    template: 'T2',
    icon: 'leaf',
    themen: ['Anspannungsskala 0–100', 'Nonverbale Signale', 'Kooperation ohne Worte', 'Innen/Außen'],
    safety: ['figuren', 'koerper'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Jedes iPad hat eine Figur mit versteckter Anspannungszahl. Ohne ein Wort legt ihr die iPads in eine Reihe: niedrig nach hoch.',
        steps: [
          { icon: 'eyeOff', title: 'Karte lesen', text: 'Nur du siehst deine Zahl.' },
          { icon: 'users', title: 'Reihe legen', text: 'Kein Wort. Gesicht und Körper sind erlaubt. Die niedrigste legt zuerst.' },
          { icon: 'eye', title: 'Aufdecken', text: 'Falsch sortierte iPads leuchten. Zählen, kurz reden.' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), karte(ctx, KARTEN[1], { eyebrow: 'Probe-Karte' }), ctx.say('Zeig ohne Worte, wie hoch Luca steht. Die anderen raten: niedrig oder hoch? Liegt ein iPad später an der falschen Stelle, leuchtet es „falsch sortiert“ – kein Fehler, nur ein Zeichen.', { eyebrow: 'Zum Ausprobieren', small: true })], { eyebrow: 'Probe' });
          await ctx.ask(w, [{ label: 'Niedrig', value: 1, variant: 'ghost' }, { label: 'Hoch', value: 2, variant: 'ghost' }]);
        },
      });
      await ctx.T.codeCheck();
      // Variante: ganze Crew (Reihe) oder zu zweit (Innen/Außen)
      const wm = ctx.scr([ctx.say('Wie spielt ihr heute?', { eyebrow: 'Vorbereitung', small: true }), h('p', { class: 'muted small' }, 'Die Reihe braucht die ganze Crew. Zu zweit: Innen/Außen mit einer Figur, die außen ruhig wirkt.')], { eyebrow: 'Vorbereitung', center: true });
      const modus = await ctx.ask(wm, [{ label: 'Reihe · ganze Crew', value: 'reihe', variant: 'ghost', icon: 'users' }, { label: 'Zu zweit · Innen/Außen', value: 'paar', variant: 'ghost', icon: 'eye' }]);
      if (modus === 'paar') return innenAussen(ctx);
      const total = 2;
      let gespielt = 0, kipper = 0;
      for (let i = 1; i <= total; i++) {
        const r = await reihe(ctx, i, total);
        if (!r) continue;
        gespielt++; kipper += r.kipper;
      }
      return {
        summary: gespielt ? (kipper === 0 ? 'Alle Reihen richtig sortiert. Ihr lest Signale.' : kipper + ' falsch sortiert – trotzdem geschafft. Ohne ein Wort.') : 'Heute nur reingeschaut.',
        stats: [[gespielt, 'Reihen gelegt'], [kipper, 'falsch sortiert']],
      };
    },
  });
})();
