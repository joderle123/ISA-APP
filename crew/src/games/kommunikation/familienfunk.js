/* Spiel „Familien-Funk“ (Thema: Kommunikation & Grenzen) · Vorlage T0 Solo · j1-e21, j1-e24
   Eine Figur will zu Hause etwas aushandeln (Handy nach 22 Uhr, länger wegbleiben, Freunde einladen, Training in der
   Papa-Woche). Die Erwachsenen reagieren, du wählst die Antwort: Klartext mit Vorschlag, Vorwurf, Türknall – ab Level 2
   auch der getarnte Angriff und Klartext ohne Vorschlag. Vertrauens- und Hitze-Meter zeigen die Rechnung; ab Hitze 80
   knallt es, dann heißt es Zurückspulen wie bei Clash. Jede Szene hat zwei Schritte: den Wunsch sagen – und auf das
   erste Nein mit einem Gegenvorschlag antworten. In drei Level:
   1) Ruhig bleiben – drei Antworten.
   2) Vorschlag machen – vier Antworten, darunter getarnter Angriff und Klartext ohne Vorschlag.
   3) Kompromiss – vier Antworten auf das Nein; am Ende die Deal-Karte.
   Nur erfundene Familien in verschiedenen Formen (mit Mama, mit zwei Papas, bei Oma, zwei Zuhause) – keine gilt als
   „normal“, keine wird kommentiert. Bewusst ohne Vergleichskarte. Am Ende „Mit jemandem drüber reden“ mit 116 111. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  // Erwachsene als eigene Figuren-Objekte (gleicher Zeichenstil, erfunden)
  const ERW = {
    mama: { id: 'mama', name: 'Mama', colour: '#b48bff', hair: '#2b1d14', skin: '#e0ac7e', style: 'lang' },
    papa: { id: 'papa', name: 'Papa', colour: '#3d7bff', hair: '#140f1a', skin: '#b87b4f', style: 'kurz' },
    papi: { id: 'papi', name: 'Papi', colour: '#ffb020', hair: '#5b4636', skin: '#e8c19c', style: 'cap' },
    oma: { id: 'oma', name: 'Oma', colour: '#2ee6c5', hair: '#d9d4cc', skin: '#f1c9a5', style: 'locken' },
    papaSam: { id: 'papa-sam', name: 'Papa', colour: '#ff8a5c', hair: '#1d1a24', skin: '#8d5a3a', style: 'kurz' },
  };
  const ART = {
    ich: { label: 'Klartext + Vorschlag', v: 15, hz: -10 },
    ichohne: { label: 'Klartext ohne Vorschlag', v: 5, hz: 0 },
    getarnt: { label: 'Getarnter Angriff', v: -8, hz: 12 },
    vorwurf: { label: 'Vorwurf', v: -12, hz: 18 },
    tuer: { label: 'Türknall', v: -20, hz: 40 },
    kompromiss: { label: 'Gegenvorschlag', v: 15, hz: -15 },
    schmollen: { label: 'Schmollen', v: -5, hz: 6 },
  };
  const KNALL = 80;
  const START = { v: 50, hz: 40 };

  /* Familien: kind (Figur), erw (wer redet), wer (Satz, wie die Familie ist – ohne Kommentar), lage, auf (erste Antwort
     der Erwachsenen), a (Antworten Schritt 1), nein (das erste Nein), b (Antworten Schritt 2), deal. */
  const FAMILIEN = [
    { id: 'mika', kind: 'mika', erw: ['mama'], wer: 'Mika wohnt mit Mama.', thema: 'Handy nach 22 Uhr',
      lage: 'Es ist 22 Uhr. Mika spielt noch online mit Yara.',
      auf: { von: 'mama', t: 'Mika, 22 Uhr. Handy in den Flur, wie abgemacht.' },
      a: {
        ich: { t: 'Mir ist das Level mit Yara wichtig. Bis 22:15 – dann leg ich’s raus?', r: 'Okay, 15 Minuten. Danke, dass du fragst, statt zu motzen.', mood: 'froh' },
        ichohne: { t: 'Ich bin echt noch nicht müde. Das nervt mich gerade.', r: 'Kann sein. Trotzdem 22 Uhr. Oder hast du einen Vorschlag?', mood: 'neutral' },
        getarnt: { t: 'Ich finde halt, du bist die strengste Mutter der Welt.', r: 'Aha. Dann ist die strengste Mutter jetzt auch müde.', mood: 'genervt' },
        vorwurf: { t: 'Alle anderen in meiner Klasse dürfen bis Mitternacht! Nur ich nicht, wie immer!', r: 'Ich rede mit dir, nicht mit allen anderen.', mood: 'genervt' },
        tuer: { t: '(Mika knallt die Tür zu und spielt weiter.)', r: '(Mama nimmt das Handy. Bis morgen Abend.)', mood: 'wut' },
      },
      nein: { von: 'mama', vorher: 'Am nächsten Tag will Mika eine neue Regel: am Wochenende länger.', t: 'Am Wochenende bis Mitternacht? Nein. Das ist zu spät.' },
      b: {
        kompromiss: { t: 'Und Freitag und Samstag bis 22:30? Unter der Woche bleibt 22 Uhr.', r: 'Das klingt fair. Deal.', mood: 'froh' },
        schmollen: { t: 'Na toll. Dann halt nie.', r: 'Wenn du einen Vorschlag hast, hör ich zu.', mood: 'neutral' },
        vorwurf: { t: 'Du willst doch nur, dass ich keine Freunde mehr hab und jeden Abend allein bin!', r: 'Das ist unfair. Jetzt hab ich keine Lust mehr zu reden.', mood: 'traurig' },
        tuer: { t: '(Mika rennt raus. Tür knallt.)', r: '(Die Regel bleibt, wie sie ist. Für lange.)', mood: 'traurig' },
      },
      deal: 'Freitag und Samstag bis 22:30. Unter der Woche 22 Uhr – Handy im Flur.' },
    { id: 'yara', kind: 'yara', erw: ['papa', 'papi'], wer: 'Yara wohnt mit Papa und Papi.', thema: 'Samstag länger bleiben',
      lage: 'Yara ist am Samstag zu einem Geburtstag eingeladen. Abgemacht ist 21 Uhr.',
      auf: { von: 'papa', t: 'Samstag? Du bist um 21 Uhr zu Hause, wie immer.' },
      a: {
        ich: { t: 'Der Geburtstag ist mir wichtig. Bis 22:30? Ich schreib, wenn ich losgehe.', r: 'Hm. Mit Nachricht? Darüber können wir reden.', mood: 'neutral' },
        ichohne: { t: 'Ich bin traurig, wenn ich als Erste gehen muss.', r: 'Verstehe ich. Aber was schlägst du vor?', mood: 'neutral' },
        getarnt: { t: 'Ich finde ja nur, dass ihr bei mir immer voll übertreibt – bei allem, was ich mache.', r: 'Übertreiben. Aha.', mood: 'genervt' },
        vorwurf: { t: 'Ihr behandelt mich wie ein Baby!', r: 'Babys gehen um 19 Uhr ins Bett. Du um 21.', mood: 'genervt' },
        tuer: { t: '(Yara stapft in ihr Zimmer. Tür knallt.)', r: '(Papa seufzt. Am Samstag gilt 21 Uhr – ohne Gespräch.)', mood: 'traurig' },
      },
      nein: { von: 'papi', vorher: 'Papi kommt dazu.', t: '22:30 ist uns zu spät. Der Weg ist dunkel.' },
      b: {
        kompromiss: { t: 'Und wenn ich bis 22 Uhr bleibe und Papi mich abholt?', r: 'Abholen um 22 Uhr – Deal.', mood: 'froh' },
        schmollen: { t: 'Okay. Dann geh ich halt gar nicht hin.', r: 'Das wollten wir nicht. Überleg dir einen Vorschlag.', mood: 'traurig' },
        vorwurf: { t: 'Ihr habt doch gar keine Angst um mich, ihr wollt einfach nur eure Ruhe!', r: 'Doch. Wir haben Angst um dich.', mood: 'traurig' },
        tuer: { t: '(Yara schreibt der Freundin: „Darf nicht.“ Tür zu.)', r: '(Samstag bleibt Yara zu Hause. Keiner ist froh.)', mood: 'traurig' },
      },
      deal: 'Yara bleibt bis 22 Uhr, Papi holt sie ab.' },
    { id: 'luca', kind: 'luca', erw: ['oma'], wer: 'Luca wohnt bei Oma.', thema: 'Freunde zum Zocken einladen',
      lage: 'Am Freitag will Luca drei Leute zum Zocken einladen.',
      auf: { von: 'oma', t: 'Drei Leute bis spät? Das wird mir zu laut, Luca.' },
      a: {
        ich: { t: 'Ich wünsch mir den Abend. Mit Kopfhörern – und um 21 Uhr sind alle weg?', r: 'Mit Kopfhörern? Hm. Das klingt schon besser.', mood: 'neutral' },
        ichohne: { t: 'Ich fühl mich allein, wenn nie jemand kommen darf.', r: 'Das wusste ich nicht. Wie stellst du dir das vor?', mood: 'traurig' },
        getarnt: { t: 'Ich finde, du gönnst mir einfach nichts.', r: 'Ich gönne dir eine Menge, Luca.', mood: 'traurig' },
        vorwurf: { t: 'Bei dir darf man ja gar nichts! Andere dürfen jedes Wochenende Leute einladen!', r: 'So redest du nicht mit mir.', mood: 'genervt' },
        tuer: { t: '(Luca schlägt die Tür zu.)', r: '(Oma erschrickt. Am Freitag ist es still im Haus.)', mood: 'traurig' },
      },
      nein: { von: 'oma', vorher: 'Oma überlegt.', t: 'Freitag nicht. Da kommt meine Freundin zum Kartenspielen.' },
      b: {
        kompromiss: { t: 'Und Samstagnachmittag? Dann hast du abends deine Ruhe.', r: 'Samstag bis 18 Uhr – abgemacht!', mood: 'froh' },
        schmollen: { t: 'Okay. Dann frag ich halt nie wieder, ist ja eh immer dasselbe.', r: 'Sag nicht nie. Gibt’s einen anderen Tag?', mood: 'traurig' },
        vorwurf: { t: 'Deine Freundin ist dir immer wichtiger als ich!', r: 'Das stimmt nicht, und das weißt du.', mood: 'traurig' },
        tuer: { t: '(Luca geht raus und kommt erst spät zurück.)', r: '(Oma wartet am Fenster. Kein Zocken, kein Kartenspiel.)', mood: 'traurig' },
      },
      deal: 'Samstag 14 bis 18 Uhr zocken – mit Kopfhörern.' },
    { id: 'sam', kind: 'sam', erw: ['papaSam'], wer: 'Sam hat zwei Zuhause. Diese Woche ist Papa-Woche.', thema: 'Training am Mittwoch',
      lage: 'Am Mittwoch ist Training – weit weg von Papas Wohnung. Samstag ist das große Spiel.',
      auf: { von: 'papaSam', t: 'Mittwoch kann ich dich nicht fahren. Dann fällt das Training diese Woche aus.' },
      a: {
        ich: { t: 'Das Training ist mir wichtig. Ich fahr mit dem Bus und schreib dir, okay?', r: 'Mit dem Bus? Zeig mir mal die Verbindung.', mood: 'neutral' },
        ichohne: { t: 'Ich bin echt enttäuscht. Ich will nicht fehlen.', r: 'Verstehe ich. Hast du eine Idee?', mood: 'neutral' },
        getarnt: { t: 'Ich merk halt schon länger, dass dir mein Sport total egal ist, Papa.', r: 'Das ist er nicht. Aber so mag ich nicht reden.', mood: 'traurig' },
        vorwurf: { t: 'Bei Mama klappt das immer, da fährt mich jeder hin! Nur bei dir klappt nie was!', r: 'Hier ist nicht bei Mama.', mood: 'genervt' },
        tuer: { t: '(Sam verschwindet im Zimmer. Tür zu.)', r: '(Papa sitzt allein in der Küche. Das Training fällt aus.)', mood: 'traurig' },
      },
      nein: { von: 'papaSam', vorher: 'Papa schaut die Busverbindung an.', t: 'Allein mit dem Bus, abends? Das ist mir nicht sicher genug.' },
      b: {
        kompromiss: { t: 'Und wenn ich mit Luca hinfahre und du uns um 19 Uhr an der Halle abholst?', r: 'Das krieg ich hin. Deal.', mood: 'froh' },
        schmollen: { t: 'Dann sag ich dem Trainer halt ab. Toll.', r: 'Warte. Lass uns noch was überlegen.', mood: 'traurig' },
        vorwurf: { t: 'Du findest wirklich immer irgendeinen Grund, warum bei dir etwas nicht geht!', r: 'Und du hörst gar nicht zu.', mood: 'genervt' },
        tuer: { t: '(Sam knallt die Tür.)', r: '(Sam fehlt beim Training. Und am Samstag sitzt Sam auf der Bank.)', mood: 'traurig' },
      },
      deal: 'Sam fährt mit Luca hin, Papa holt beide um 19 Uhr ab.' },
  ];
  /* Welche Antworten pro Level und Schritt (die beste ist immer dabei, aber nicht immer die längste) */
  const OPTS = {
    1: { a: ['ich', 'vorwurf', 'tuer'], b: ['kompromiss', 'vorwurf', 'tuer'] },
    2: { a: ['ich', 'ichohne', 'getarnt', 'tuer'], b: ['kompromiss', 'schmollen', 'vorwurf'] },
    3: { a: ['ich', 'ichohne', 'getarnt', 'vorwurf'], b: ['kompromiss', 'schmollen', 'vorwurf', 'tuer'] },
  };
  const LEVELS = ['Ruhig bleiben', 'Vorschlag machen', 'Kompromiss'];

  // Kompakte Aufgaben-Zeile (statt großer Karte), damit die Antworten sichtbar bleiben
  const hint = (ctx, text, icon) => h('div', { class: 'kg-hint' }, CREW.icon(icon || 'chat', 24), h('span', { class: 'kg-hint-t' }, text), ctx.readBtn(text));
  const erwFig = (k) => ERW[k];
  // Familien-Karte: die Figur und ihre Erwachsenen nebeneinander, ein neutraler Satz
  function familieKarte(ctx, f) {
    return h('div', { class: 'ff-familie' },
      h('div', { class: 'ff-leute' }, [ctx.avatar(f.kind, 'neutral', 72)].concat(f.erw.map((k) => ctx.avatar(erwFig(k), 'neutral', 72)))),
      h('div', { class: 'stack', style: { gap: '4px', minWidth: 0 } },
        h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Erfundene Familie · ' + f.thema), ctx.readBtn(f.wer + ' ' + f.lage)),
        h('b', { class: 'ff-wer' }, f.wer), h('span', { class: 'muted' }, f.lage)));
  }
  function meters(ctx, st) {
    const v = ctx.meter({ value: st.v, label: 'Vertrauen' });
    const hz = ctx.meter({ value: st.hz, label: 'Hitze' });
    v.el.classList.add('ff-vertrauen');
    return { el: h('div', { class: 'ff-meters' }, v.el, hz.el), v, hz };
  }

  /* Ein Schritt (a = Wunsch sagen, b = Antwort auf das Nein). Zurückspulen: freiwillig, ab Hitze 80 Pflicht. */
  async function schritt(ctx, f, L, key, st, nr) {
    const badge = ctx.stufe(L, LEVELS);
    const kind = ctx.figures[f.kind];
    const satz = key === 'a' ? f.auf : f.nein;
    const erw = erwFig(satz.von);
    const order = ctx.rshuffle(OPTS[L][key]);
    const best = key === 'a' ? 'ich' : 'kompromiss';
    let tries = 0, erste = null;
    for (;;) {
      const m = meters(ctx, st);
      const w = ctx.scr([
        key === 'b' && satz.vorher ? h('p', { class: 'muted', style: { margin: 0 } }, satz.vorher) : null,
        h('div', { class: 'kg-pair ff-pair' }, ctx.figureCard({ fig: erw, mood: key === 'b' ? 'neutral' : 'genervt', text: satz.t, eyebrow: erw.name + (key === 'b' ? ' sagt Nein' : ' sagt'), cls: 'ff-erw' }), m.el),
        hint(ctx, (key === 'a' ? 'Den Wunsch sagen: ' : 'Auf das Nein antworten: ') + 'Was sagt ' + kind.name + '?', 'chat'),
      ], { eyebrow: 'Szene ' + nr + ' · ' + (key === 'a' ? 'Schritt 1' : 'Schritt 2'), badge });
      const r = await ctx.ask(w, order.map((k) => ({ label: f[key][k].t, value: k, variant: 'ghost', id: 'ff-' + k })), { autoPick: tries >= 1 ? () => best : undefined });
      if (r === ctx.SKIP) return { erste, ok: false };
      tries++;
      if (!erste) erste = r;
      const A = ART[r], R = f[key][r];
      const vorher = { v: st.v, hz: st.hz };
      st.v = Math.max(0, Math.min(100, st.v + A.v));
      st.hz = Math.max(0, Math.min(100, st.hz + A.hz));
      const knall = st.hz >= KNALL;
      const ok = r === best;
      CREW.sound.play(ok ? 'great' : knall ? 'soft' : 'tap');
      const m2 = meters(ctx, vorher);
      const w2 = ctx.scr([
        knall ? h('div', { class: 'stop-big display ff-knall' }, 'Knall!') : null,
        h('div', { class: 'grid two' },
          ctx.figureCard({ fig: f.kind, mood: r === 'tuer' ? 'wut' : ok ? 'neutral' : 'genervt', text: R.t, eyebrow: kind.name + ' · ' + A.label, chat: !/^\(/.test(R.t) }),
          ctx.figureCard({ fig: erw, mood: R.mood, text: R.r, eyebrow: erw.name })),
        m2.el,
        h('div', { class: 'card stack soft' }, h('b', null, ok ? (key === 'a' ? 'Wunsch, Grund, Vorschlag – das öffnet die Tür.' : 'Gegenvorschlag statt Ende: So entsteht ein Deal.') : knall ? 'Die Hitze ist über 80. Jetzt redet niemand mehr – erst runterkommen, dann zurückspulen.' : A.label + ': ' + (r === 'ichohne' ? 'Das Gefühl ist gut – aber ohne Vorschlag weiß niemand, was jetzt passieren soll.' : r === 'getarnt' ? 'Klingt nach „Ich“, ist aber ein Vorwurf.' : r === 'schmollen' ? 'Das Gespräch ist zu – aber die Tür noch nicht.' : 'Das treibt die Hitze hoch und kostet Vertrauen.')),
          knall ? h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Runter unter 70“')) : null),
      ], { eyebrow: 'Szene ' + nr + ' · Folge', badge });
      // Meter mit kurzer Verzögerung bewegen (sichtbare Rechnung)
      setTimeout(() => { m2.v.set(st.v); m2.hz.set(st.hz); }, ctx.auto ? 0 : 350);
      if (ok || tries >= 3) { await ctx.next(w2, 'Weiter'); return { erste, ok }; }
      const opts = knall
        ? [{ label: 'Zurückspulen', value: 'rewind', variant: 'teamB', icon: 'undo', id: 'ff-rewind' }]
        : [{ label: 'Zurückspulen', value: 'rewind', variant: 'ghost', icon: 'undo', id: 'ff-rewind' }, { label: 'So lassen', value: 'keep', iconRight: 'right', id: 'btn-next' }];
      const z = await ctx.ask(w2, opts, { autoPick: () => 'rewind' });
      if (z === 'rewind' || knall) { st.v = vorher.v; st.hz = vorher.hz; CREW.sound.play('tap'); continue; }
      return { erste, ok: false };
    }
  }

  /* Eine Szene: Familie zeigen, Schritt 1, Schritt 2, Ergebnis */
  async function szene(ctx, f, L, nr) {
    const badge = ctx.stufe(L, LEVELS);
    const w = ctx.scr([familieKarte(ctx, f), ctx.safetyLine('familie')], { eyebrow: 'Szene ' + nr + ' von 3', badge });
    if ((await ctx.next(w, 'Los')) === ctx.SKIP) return null;
    const st = { v: START.v, hz: START.hz };
    const a = await schritt(ctx, f, L, 'a', st, nr);
    const b = await schritt(ctx, f, L, 'b', st, nr);
    const deal = b.ok;
    const kind = ctx.figures[f.kind];
    const m = meters(ctx, st);
    const w2 = ctx.scr([
      h('div', { class: 'ff-ende' + (deal ? ' deal' : '') }, CREW.icon(deal ? 'check' : 'timer', 34),
        h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, deal ? 'Deal' : 'Kein Deal heute'), h('b', { class: 'ff-deal' }, deal ? f.deal : 'Morgen in Ruhe nochmal – mit einem Vorschlag.'))),
      m.el,
      L === 3 && deal ? h('div', { class: 'grid two' },
        h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, kind.name + ' bekommt'), h('b', null, 'einen Teil vom Wunsch')),
        h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, kind.name + ' gibt'), h('b', null, 'Zeit, Sicherheit oder Ruhe für die anderen'))) : null,
      h('p', { class: 'muted small' }, deal ? 'Nicht alles bekommen – aber mehr als mit Türknall. Und das Vertrauen ist gestiegen.' : 'Kein Weltuntergang. Ein guter Moment und ein Vorschlag helfen beim nächsten Versuch.'),
    ], { eyebrow: 'Szene ' + nr + ' · Ergebnis', badge });
    CREW.sound.play(deal ? 'good' : 'soft');
    await ctx.next(w2, nr < 3 ? 'Nächste Familie' : 'Weiter');
    return { deal, erstA: a.erste, erstB: b.erste, v: st.v };
  }

  CREW.registerGame({
    id: 'familienfunk',
    template: 'T0',
    icon: 'home',
    themen: ['Aushandeln', 'Familie', 'Klartext', 'Kompromiss'],
    safety: ['figuren', 'familie'],
    help: false,
    familien: FAMILIEN, art: ART, opts: OPTS, knall: KNALL, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Drei erfundene Familien, drei Wünsche. Du wählst, was die Figur sagt. Vertrauen und Hitze zeigen die Rechnung. Ab Hitze 80 knallt es – dann spulst du zurück.',
        levels: LEVELS,
        steps: [
          { icon: 'chat', title: 'Wunsch sagen', text: 'Klartext, Vorwurf oder Türknall?' },
          { icon: 'heart', title: 'Vertrauen und Hitze', text: 'Jede Antwort bewegt beide Meter.' },
          { icon: 'check', title: 'Deal', text: 'Auf das Nein mit einem Gegenvorschlag antworten.' },
        ],
        probe: ctx.T.probeCard('Probe: „Räum dein Zimmer auf!“ Was bringt mehr? Tipp irgendwas – zählt nicht.', [{ label: '„Mach ich nach dem Essen, okay?“', value: 1, variant: 'ghost' }, { label: '„Immer ich!“', value: 2, variant: 'ghost' }]),
      });
      const fams = ctx.rshuffle(FAMILIEN).slice(0, 3);
      const res = [];
      for (let i = 0; i < fams.length; i++) {
        if (i > 0) await ctx.T.level({ n: i + 1, names: LEVELS, text: i === 1 ? 'Jetzt gibt es mehr Antworten: Eine klingt nach Klartext, ist aber ein getarnter Angriff. Und Klartext ohne Vorschlag reicht nicht ganz.' : 'Letzte Familie. Die Erwachsenen sagen erst Nein. Jetzt zählt der Gegenvorschlag – ein Deal, mit dem beide leben können.' });
        const r = await szene(ctx, fams[i], i + 1, i + 1);
        if (r) res.push(r);
      }
      const deals = res.filter((r) => r.deal).length;
      return {
        summary: deals >= 2 ? 'Ausgehandelt! Klartext plus Vorschlag bringt mehr als jeder Türknall.' : res.length ? 'Aushandeln ist schwer. Ein Vorschlag öffnet die Tür – ein Türknall schließt sie.' : 'Heute nur reingeschaut. Auch okay.',
        stats: [[deals, 'Deals'], [res.filter((r) => r.erstA === 'ich').length, 'mal gleich mit Vorschlag'], [res.length ? Math.round(res.reduce((s, r) => s + r.v, 0) / res.length) : 0, 'Vertrauen im Schnitt']],
        extra: ctx.helpCard({ title: 'Mit jemandem drüber reden', text: 'Zu Hause läuft es nicht immer gut. Du musst das nicht allein lösen. Anonym und kostenlos:' }),
      };
    },
  });
})();
