/* Spiel „Gefühls-Funk“ (Thema: Gefühle verstehen) · Vorlage T2 Rollen-Puzzle · j1-e07
   A sieht die Szene, B das Gefühls-Lexikon (sechs Familien, höchstens vier Wörter), C die Körper-Signale,
   D die Botschafts-Karte („Angst sagt: pass auf“). Nur zusammen finden sie Gefühl, genaueres Wort,
   Botschaft und Handlung. „Noch nicht – fragt nochmal nach“ statt falsch. Beobachter-Rolle für 5–6 Leute. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* Sechs Gefühls-Familien mit je höchstens vier Wörtern, Körper-Signalen und Botschaft */
  const FAMILIEN = {
    angst: { name: 'Angst', icon: 'shield', words: ['nervös', 'unsicher', 'besorgt', 'panisch'], body: ['Herzklopfen', 'Bauch kribbelt', 'Hände schwitzen'], message: 'Angst sagt: Pass auf. Hier ist etwas wichtig.' },
    wut: { name: 'Wut', icon: 'bolt', words: ['genervt', 'sauer', 'wütend', 'rasend'], body: ['Hitze im Gesicht', 'Fäuste', 'laute Stimme'], message: 'Wut sagt: Eine Grenze wurde überschritten.' },
    trauer: { name: 'Trauer', icon: 'heart', words: ['enttäuscht', 'traurig', 'einsam', 'leer'], body: ['Kloß im Hals', 'schwere Arme', 'Tränen'], message: 'Trauer sagt: Du hast etwas verloren, das dir wichtig war.' },
    freude: { name: 'Freude', icon: 'star', words: ['froh', 'stolz', 'aufgeregt', 'begeistert'], body: ['Kribbeln', 'leicht im Bauch', 'Grinsen'], message: 'Freude sagt: Mehr davon. Das tut dir gut.' },
    scham: { name: 'Scham', icon: 'eyeOff', words: ['peinlich', 'bloßgestellt', 'verlegen', 'klein'], body: ['rotes Gesicht', 'Blick nach unten', 'am liebsten weg'], message: 'Scham sagt: Du willst dazugehören.' },
    ekel: { name: 'Ekel', icon: 'x', words: ['angewidert', 'abgestoßen', 'igitt', 'unwohl'], body: ['Nase rümpfen', 'Würgen', 'zurückweichen'], message: 'Ekel sagt: Das will ich nicht nah an mir.' },
  };
  /* Szenen: Figur, Situation, passende Familie, bestes Wort, Handlungen (eine passt am besten) */
  const SZENEN = [
    { fig: 'mika', mood: 'angst', text: 'Mika muss morgen vor der Klasse den Vortrag halten. Heute Abend klopft das Herz, der Zettel ist weg.', family: 'angst', best: 'nervös', actions: [{ id: 'a', label: 'Zettel neu schreiben, kurz üben', best: true }, { id: 'b', label: 'Krank melden', best: false }, { id: 'c', label: 'So tun, als wär nichts', best: false }], feedback: 'Angst heißt: wichtig. Vorbereiten nimmt ihr die Spitze.' },
    { fig: 'yara', mood: 'wut', text: 'Yara hat die Gruppenarbeit fast allein gemacht. Im Chat schreibt Luca: „Wir haben das super hingekriegt.“', family: 'wut', best: 'sauer', actions: [{ id: 'a', label: 'Luca direkt sagen: „Ich hab das meiste gemacht, das stimmt so nicht.“', best: true }, { id: 'b', label: 'Im Gruppenchat alle anmachen', best: false }, { id: 'c', label: 'Nichts sagen, nächstes Mal auch nichts tun', best: false }], feedback: 'Wut zeigt eine Grenze. Klartext an die richtige Person wirkt.' },
    { fig: 'luca', mood: 'traurig', text: 'Lucas bester Kumpel zieht in eine andere Stadt. Beim Abschied sagt Luca nur „Tschau“ und geht schnell.', family: 'trauer', best: 'traurig', actions: [{ id: 'a', label: 'Später schreiben: „Ich vermiss dich jetzt schon.“', best: true }, { id: 'b', label: 'Den Kumpel blockieren, damit es nicht wehtut', best: false }, { id: 'c', label: 'Allen erzählen, dass es egal ist', best: false }], feedback: 'Trauer heißt: Das war wichtig. Es darf wehtun, und man darf es sagen.' },
    { fig: 'sam', mood: 'froh', text: 'Sam hat beim Turnier das erste Tor der Saison geschossen. Im Bus nach Hause grinst Sam die ganze Zeit.', family: 'freude', best: 'stolz', actions: [{ id: 'a', label: 'Es jemandem erzählen, der sich mitfreut', best: true }, { id: 'b', label: 'Es runterspielen: „War nur Glück.“', best: false }, { id: 'c', label: 'Allen im Chat zeigen, dass die anderen schlechter sind', best: false }], feedback: 'Freude sagt: Mehr davon. Teilen macht sie größer.' },
    { fig: 'mika', mood: 'genervt', text: 'Mika stolpert vor der ganzen Klasse über die Tasche. Alle lachen. Mika wird rot und schaut auf den Boden.', family: 'scham', best: 'peinlich', actions: [{ id: 'a', label: 'Mitlachen und „Elegant, oder?“ sagen', best: true }, { id: 'b', label: 'Jemanden anschreien, der lacht', best: false }, { id: 'c', label: 'Den Rest des Tages nicht mehr reden', best: false }], feedback: 'Scham will dazugehören. Ein lockerer Spruch holt dich zurück in die Gruppe.' },
  ];

  /* Kniffliger (Level 2): Außen zeigt die Figur ein anderes Gefühl als innen. family = innen, aussen = was man sieht. */
  const VERSTECKT = [
    { fig: 'luca', mood: 'wut', text: 'Luca verschießt den Elfmeter. Der Vater steht am Rand. Luca brüllt den Schiri an. Die Ohren sind knallrot, Luca schaut keinen an.', family: 'scham', aussen: 'wut', best: 'bloßgestellt',
      actions: [{ id: 'a', label: 'Kurz rausgehen, durchatmen, später mit dem Vater reden', best: true }, { id: 'b', label: 'Weiter den Schiri anbrüllen', best: false }, { id: 'c', label: 'Nie wieder einen Elfmeter schießen', best: false }],
      feedback: 'Die Wut war der Schutz. Darunter war Scham: Alle haben es gesehen. Wer das merkt, kann ruhiger werden.' },
    { fig: 'yara', mood: 'neutral', text: 'Alle reden über die Party am Samstag. Yara wurde nicht eingeladen. Yara lacht laut: „Partys sind eh langweilig.“ Später scrollt Yara eine Stunde durch die Fotos.', family: 'trauer', aussen: 'freude', best: 'enttäuscht',
      actions: [{ id: 'a', label: 'Einer vertrauten Person sagen: „Das hat mich getroffen.“', best: true }, { id: 'b', label: 'Weiter so tun, als wär es egal', best: false }, { id: 'c', label: 'Unter die Fotos was Fieses schreiben', best: false }],
      feedback: 'Das Lachen war die Maske. Innen: enttäuscht. Wer es ausspricht, muss es nicht allein tragen.' },
    { fig: 'sam', mood: 'froh', text: 'Morgen gibt es Zeugnisse. Sam macht heute ständig Witze, lauter als sonst. Unter dem Tisch zittern Sams Hände.', family: 'angst', aussen: 'freude', best: 'besorgt',
      actions: [{ id: 'a', label: 'Jemandem sagen: „Ich hab Schiss vor morgen.“ und einen Plan machen', best: true }, { id: 'b', label: 'Noch mehr Witze machen, bis es vorbei ist', best: false }, { id: 'c', label: 'Das Zeugnis verstecken', best: false }],
      feedback: 'Die Witze waren Ablenkung. Innen war Angst. Angst wird kleiner, wenn man sie ausspricht und plant.' },
    { fig: 'mika', mood: 'genervt', text: 'Mikas Oma ist im Krankenhaus. In der Schule ist Mika nur genervt, rollt die Augen bei allem. Abends kann Mika nicht schlafen.', family: 'angst', aussen: 'wut', best: 'besorgt',
      actions: [{ id: 'a', label: 'Der Lehrkraft sagen: „Bei mir ist gerade was los.“', best: true }, { id: 'b', label: 'Alle anmotzen, damit keiner fragt', best: false }, { id: 'c', label: 'Nachts heimlich zocken, bis man müde ist', best: false }],
      feedback: 'Genervt war die Oberfläche. Darunter: Sorge um die Oma. Wer es sagt, bekommt Rücksicht statt Ärger.' },
  ];
  const LEVELS = ['Klares Gefühl', 'Verstecktes Gefühl'];
  const SCHRITTE = ['Erkennen', 'Genau benennen', 'Handeln'];
  const schritt = (n) => h('span', { class: 'stufe-pill' }, CREW.icon('steps', 14), 'Schritt ' + n + ' · ' + SCHRITTE[n - 1]);

  const iconCard = (icon, title, text) => h('div', { class: 'icon-card' }, CREW.icon(icon, 32), h('b', null, title), text ? h('span', { class: 'muted small' }, text) : null);

  /* Was zeigt dieses iPad? Nur den eigenen Teil – der Rest kommt von den anderen. */
  function slice(ctx, role, sz) {
    const fam = FAMILIEN[sz.family];
    if (role === 'A') return ctx.figureCard({ fig: sz.fig, mood: sz.mood, text: sz.text, eyebrow: 'Nur du siehst die Szene. Erzähl sie den anderen.', extra: sz.aussen ? h('span', { class: 'pill accent' }, 'Achtung: Außen zeigt die Figur ein anderes Gefühl als innen.') : null });
    if (role === 'B') return h('div', { class: 'slice' }, h('div', { class: 'row between' }, h('b', null, 'Gefühls-Lexikon'), ctx.readBtn('Gefühls-Lexikon: ' + Object.values(FAMILIEN).map((f) => f.name + ': ' + f.words.join(', ')).join('. '))),
      h('p', { class: 'muted small' }, 'Sechs Familien. Frag A nach der Szene und such das genaue Wort.'),
      h('div', { class: 'icon-cards' }, Object.values(FAMILIEN).map((f) => iconCard(f.icon, f.name, f.words.join(' · ')))));
    if (role === 'C') return h('div', { class: 'slice' }, h('div', { class: 'row between' }, h('b', null, 'Körper-Signale'), ctx.readBtn('Körper-Signale: ' + Object.values(FAMILIEN).map((f) => f.name + ': ' + f.body.join(', ')).join('. '))),
      h('p', { class: 'muted small' }, 'Welche Signale passen zur Szene? Frag A, was die Figur im Körper spürt.'),
      h('div', { class: 'icon-cards' }, Object.values(FAMILIEN).map((f) => iconCard(f.icon, f.name, f.body.join(' · ')))));
    if (role === 'D') return h('div', { class: 'slice' }, h('div', { class: 'row between' }, h('b', null, 'Botschafts-Karte'), ctx.readBtn('Botschaften: ' + Object.values(FAMILIEN).map((f) => f.message).join(' '))),
      h('p', { class: 'muted small' }, 'Jedes Gefühl hat eine Botschaft. Lies die passende vor, wenn ihr das Gefühl habt.'),
      h('div', { class: 'stack' }, Object.values(FAMILIEN).map((f) => h('div', { class: 'vk-item' }, h('span', { class: 'vk-ic', style: { background: 'var(--yellow)' } }, CREW.icon(f.icon, 22)), h('span', null, f.message)))));
    // Beobachter:in
    return h('div', { class: 'slice' }, h('b', null, 'Beobachter:in'), h('p', null, 'Du hast kein Puzzle-Teil. Deine Aufgabe:'),
      h('ul', { class: 'stack', style: { margin: 0, paddingLeft: '1.2em' } }, h('li', null, 'Achte, dass jede Rolle einmal dran war.'), h('li', null, 'Sag „Stopp“, wenn jemand nur rät statt zu fragen.'), h('li', null, 'Am Ende: Was hat beim Zusammenlegen geholfen?')),
      h('span', { class: 'muted small' }, 'Damit das Gefühl nicht verraten wird, bleibt die Szene für dich verdeckt. Fam.: ' + fam.name.slice(0, 1) + '…'));
  }

  CREW.registerGame({
    id: 'gefuehls-funk',
    template: 'T2',
    icon: 'heart',
    themen: ['Gefühlswörter', 'Botschaft', 'Nachfragen'],
    safety: ['figuren'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Jedes iPad hat ein Puzzle-Teil. Redet, fragt nach, legt zusammen: Gefühl, genaues Wort, Botschaft, Handlung.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'A: Szene', text: 'sieht, was passiert' },
          { icon: 'chat', title: 'B: Lexikon', text: 'kennt die Wörter' },
          { icon: 'heart', title: 'C + D', text: 'Körper und Botschaft' },
        ],
        probe: ctx.T.probeCard('Probe: A sagt „Die Figur hat Herzklopfen“. Was fragt B nach? Tippt irgendwas – zählt nicht.', [{ label: '„Wovor denn?“', value: 1, variant: 'ghost' }, { label: '„Ist sie krank?“', value: 2, variant: 'ghost' }]),
      });
      await ctx.T.codeCheck();
      const role = await ctx.T.roleSetup({
        roles: { A: { name: 'Szene', desc: 'Du siehst, was der Figur passiert. Erzähl es – ohne das Gefühl zu nennen.' }, B: { name: 'Lexikon', desc: 'Du hast die Gefühlswörter. Frag nach und such das genaue Wort.' }, C: { name: 'Körper', desc: 'Du kennst die Körper-Signale. Frag, was die Figur spürt.' }, D: { name: 'Botschaft', desc: 'Du weißt, was jedes Gefühl sagen will. Lies die passende vor.' } },
        observer: { name: 'Beobachter:in', desc: 'Du passt auf, dass alle drankommen. Kein Puzzle-Teil, dafür der Überblick.' },
      });
      // Fall 1: klares Gefühl. Fall 2: verstecktes Gefühl (außen anders als innen).
      const szenen = [ctx.rpick(SZENEN), ctx.rpick(VERSTECKT)];
      let solved = 0, tries = 0, entdeckt = 0;
      for (let i = 0; i < szenen.length; i++) {
        const sz = szenen[i];
        const fam = FAMILIEN[sz.family];
        if (i === 1) await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt versteckt sich das Gefühl: Außen sieht man ein anderes als innen. Fragt genau nach: Was spürt die Figur wirklich?' });
        const w = ctx.scr([slice(ctx, role, sz), h('p', { class: 'muted small' }, 'Redet, bis ihr euch einig seid. Dann tippt EINE Person „Lösung prüfen“ (jedes iPad prüft für sich).')],
          { eyebrow: 'Fall ' + (i + 1) + '/' + szenen.length + ' · ' + LEVELS[i], badge: h('span', { class: 'pill accent' }, role === 'X' ? 'Beobachter:in' : 'Rolle ' + role) });
        const go = await ctx.next(w, 'Lösung prüfen');
        if (go === ctx.SKIP) continue;
        // 1) Gefühls-Familie
        const r1 = await ctx.T.checkSolution({ eyebrow: 'Fall ' + (i + 1) + ' · Schritt 1 · Erkennen', prompt: sz.aussen ? 'Welches Gefühl ist INNEN – unter dem, was man sieht?' : 'Welche Gefühls-Familie?', options: Object.entries(FAMILIEN).map(([id, f]) => ({ id, label: f.name, icon: f.icon })), correct: [sz.family], notYet: sz.aussen ? 'Noch nicht. Das ist vielleicht das Gefühl außen. A: Was macht die Figur, wenn keiner hinschaut? C: Welche Signale passen?' : 'Noch nicht. A: Erzähl die Szene nochmal. C: Welche Signale passen?', maxTries: 3 });
        tries += r1.tries;
        if (r1.skipped) continue;
        if (r1.ok && sz.aussen) entdeckt++;
        if (!r1.ok) { const w0 = ctx.scr([ctx.say('Die Familie war: ' + fam.name + '. Alles gut – weiter zum nächsten Teil.', { eyebrow: 'Auflösung' })], { eyebrow: 'Fall ' + (i + 1), center: true }); await ctx.next(w0); }
        if (sz.aussen) {
          const name = CREW.games.figures[sz.fig].name;
          const wv = ctx.scr([
            h('div', { class: 'grid two' },
              h('div', { class: 'card stack' }, h('span', { class: 'eyebrow' }, 'Außen sieht es aus wie'), h('div', { class: 'row' }, CREW.icon(FAMILIEN[sz.aussen].icon, 26), h('b', { class: 'lead' }, FAMILIEN[sz.aussen].name)), h('p', { class: 'muted small' }, 'Das sehen die anderen.')),
              h('div', { class: 'card stack regel-plakat' }, h('span', { class: 'eyebrow' }, 'Innen'), h('div', { class: 'row' }, CREW.icon(fam.icon, 26), h('b', { class: 'lead' }, fam.name)), h('p', { class: 'muted small' }, 'Das spürt ' + name + ' wirklich.'))),
            ctx.say('Gefühle verstecken sich oft hinter anderen. Wer nur auf außen reagiert, versteht ' + name + ' falsch.', { eyebrow: 'Versteckt', small: true }),
          ], { eyebrow: 'Fall ' + (i + 1), badge: schritt(1) });
          await ctx.next(wv, 'Weiter');
        }
        // 2) Genaueres Wort (alle Wörter der Familie gelten, das beste bekommt ein Extra)
        const w2 = ctx.scr([ctx.say('Welches Wort passt am genauesten zu ' + CREW.games.figures[sz.fig].name + '?', { eyebrow: 'Fall ' + (i + 1) + ' · Schritt 2' })], { eyebrow: 'Wort', badge: schritt(2) });
        const word = await ctx.ask(w2, fam.words.map((x) => ({ label: x, value: x, variant: 'ghost' })));
        // 3) Botschaft + Handlung
        const w3 = ctx.scr([
          ctx.figureCard({ fig: sz.fig, mood: sz.mood, text: word === ctx.SKIP ? fam.message : CREW.games.figures[sz.fig].name + ' ist ' + word + '. ' + fam.message, eyebrow: 'Die Botschaft' }),
          ctx.say('Was tut ' + CREW.games.figures[sz.fig].name + ' jetzt am besten?', { eyebrow: 'Schritt 3 · Handlung', small: true }),
        ], { eyebrow: 'Handlung', badge: schritt(3) });
        const act = await ctx.ask(w3, sz.actions.map((a) => ({ label: a.label, value: a.id, variant: 'ghost' })));
        const chosen = sz.actions.find((a) => a.id === act);
        const good = chosen && chosen.best;
        if (good) solved++;
        const w4 = ctx.scr([
          ctx.figureCard({ fig: sz.fig, mood: good ? 'froh' : 'neutral', text: good ? sz.feedback : 'Hm. ' + sz.feedback, eyebrow: good ? 'Das kommt an' : 'Geht besser' }),
          h('p', { class: 'muted' }, word === sz.best ? 'Und „' + word + '“ war das genaueste Wort. Stark.' : word !== ctx.SKIP ? 'Genaueres Wort wäre „' + sz.best + '“. „' + word + '“ gehört aber zur selben Familie.' : ''),
        ], { eyebrow: 'Fall ' + (i + 1), badge: schritt(3) });
        await ctx.next(w4, i + 1 < szenen.length ? 'Nächster Fall' : 'Weiter');
      }
      return { summary: solved === szenen.length ? 'Alle Teile zusammengelegt. Funk steht!' : 'Zusammengelegt. Nachfragen war die Mechanik.', stats: [[solved, 'gute Handlungen'], [entdeckt, 'verstecktes Gefühl gefunden'], [tries, 'Lösungs-Versuche']] };
    },
  });
})();
