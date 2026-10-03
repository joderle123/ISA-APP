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

  const iconCard = (icon, title, text) => h('div', { class: 'icon-card' }, CREW.icon(icon, 32), h('b', null, title), text ? h('span', { class: 'muted small' }, text) : null);

  /* Was zeigt dieses iPad? Nur den eigenen Teil – der Rest kommt von den anderen. */
  function slice(ctx, role, sz) {
    const fam = FAMILIEN[sz.family];
    if (role === 'A') return ctx.figureCard({ fig: sz.fig, mood: sz.mood, text: sz.text, eyebrow: 'Nur du siehst die Szene. Erzähl sie den anderen.' });
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
      const szenen = ctx.rshuffle(SZENEN).slice(0, 2);
      let solved = 0, tries = 0;
      for (let i = 0; i < szenen.length; i++) {
        const sz = szenen[i];
        const fam = FAMILIEN[sz.family];
        const w = ctx.scr([slice(ctx, role, sz), h('p', { class: 'muted small' }, 'Redet, bis ihr euch einig seid. Dann tippt EINE Person „Lösung prüfen“ (jedes iPad prüft für sich).')],
          { eyebrow: 'Fall ' + (i + 1) + '/' + szenen.length, badge: h('span', { class: 'pill accent' }, role === 'X' ? 'Beobachter:in' : 'Rolle ' + role) });
        const go = await ctx.next(w, 'Lösung prüfen');
        if (go === ctx.SKIP) continue;
        // 1) Gefühls-Familie
        const r1 = await ctx.T.checkSolution({ eyebrow: 'Fall ' + (i + 1) + ' · Schritt 1', prompt: 'Welche Gefühls-Familie?', options: Object.entries(FAMILIEN).map(([id, f]) => ({ id, label: f.name, icon: f.icon })), correct: [sz.family], notYet: 'Noch nicht. A: Erzähl die Szene nochmal. C: Welche Signale passen?', maxTries: 3 });
        tries += r1.tries;
        if (r1.skipped) continue;
        if (!r1.ok) { const w0 = ctx.scr([ctx.say('Die Familie war: ' + fam.name + '. Alles gut – weiter zum nächsten Teil.', { eyebrow: 'Auflösung' })], { eyebrow: 'Fall ' + (i + 1), center: true }); await ctx.next(w0); }
        // 2) Genaueres Wort (alle Wörter der Familie gelten, das beste bekommt ein Extra)
        const w2 = ctx.scr([ctx.say('Welches Wort passt am genauesten zu ' + CREW.games.figures[sz.fig].name + '?', { eyebrow: 'Fall ' + (i + 1) + ' · Schritt 2' })], { eyebrow: 'Wort' });
        const word = await ctx.ask(w2, fam.words.map((x) => ({ label: x, value: x, variant: 'ghost' })));
        // 3) Botschaft + Handlung
        const w3 = ctx.scr([
          ctx.figureCard({ fig: sz.fig, mood: sz.mood, text: word === ctx.SKIP ? fam.message : CREW.games.figures[sz.fig].name + ' ist ' + word + '. ' + fam.message, eyebrow: 'Die Botschaft' }),
          ctx.say('Was tut ' + CREW.games.figures[sz.fig].name + ' jetzt am besten?', { eyebrow: 'Schritt 3 · Handlung', small: true }),
        ], { eyebrow: 'Handlung' });
        const act = await ctx.ask(w3, sz.actions.map((a) => ({ label: a.label, value: a.id, variant: 'ghost' })));
        const chosen = sz.actions.find((a) => a.id === act);
        const good = chosen && chosen.best;
        if (good) solved++;
        const w4 = ctx.scr([
          ctx.figureCard({ fig: sz.fig, mood: good ? 'froh' : 'neutral', text: good ? sz.feedback : 'Hm. ' + sz.feedback, eyebrow: good ? 'Das kommt an' : 'Geht besser' }),
          h('p', { class: 'muted' }, word === sz.best ? 'Und „' + word + '“ war das genaueste Wort. Stark.' : word !== ctx.SKIP ? 'Genaueres Wort wäre „' + sz.best + '“. „' + word + '“ gehört aber zur selben Familie.' : ''),
        ], { eyebrow: 'Fall ' + (i + 1) });
        await ctx.next(w4, i + 1 < szenen.length ? 'Nächster Fall' : 'Fertig');
      }
      // Beobachter:innen-Frage zum Schluss (ohne Zählen, freiwillig)
      const w5 = ctx.scr([ctx.say('Beobachter:in zuerst, dann wer will: Was hat beim Zusammenlegen geholfen?', { eyebrow: 'Kurz reden' }), ctx.safetyLine('freiwillig')], { eyebrow: 'Abschluss' });
      await ctx.next(w5, 'Fertig');
      return { summary: solved === szenen.length ? 'Alle Teile zusammengelegt. Funk steht!' : 'Zusammengelegt. Nachfragen war die Mechanik.', stats: [[solved, 'gute Handlungen'], [tries, 'Lösungs-Versuche']] };
    },
  });
})();
