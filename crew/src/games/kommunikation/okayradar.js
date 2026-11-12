/* Spiel „Okay-Radar“ (Thema: Kommunikation & Grenzen) · Vorlage T1 Solo + Austausch · j1-e22 · Top
   Kurze Szenen, je ein Satz plus Bild (Umarmung zur Begrüßung, Spitzname vor der Klasse, Foto ohne Fragen gepostet …).
   Jede:r stellt heimlich das eigene Radar: okay / kommt drauf an (worauf?) / nicht okay. Dann zeigen Mika, Yara, Luca
   und Sam ihr Radar – fast nie gleich: „Bei Mika okay, bei Yara nicht. Beides gilt.“ In drei Level:
   1) Spüren – drei Szenen: körperlich, emotional, digital (Einheit j1-e22).
   2) Signale lesen – eine Figur sagt nichts, aber ihr Körper sagt es. Okay für sie? Was tut die andere Figur jetzt?
   3) Fragen – eine Figur will etwas (Foto posten, umarmen, aufs Handy schauen): Wie fragt sie – und was tut sie mit
      einem Nein? Ein halbes Ja ist kein Ja.
   Danach Vergleichskarte zu zweit. Körper-Szenen bleiben altersgerecht (Begrüßung, Haare, Abstand), keine Berührungs-
   aufgaben im Raum, alles über Figuren und Skalen. Die eigene Einstellung wird nicht gespeichert. Hilfenummern am Ende. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const RADAR = {
    ok: { id: 'ok', label: 'okay', winkel: -60 },
    kommt: { id: 'kommt', label: 'kommt drauf an', winkel: 0 },
    nein: { id: 'nein', label: 'nicht okay', winkel: 60 },
  };
  const ART = { koerper: 'Körper', gefuehl: 'Gefühl', digital: 'Digital' };
  const WORAUF = ['Wer es ist', 'Ob vorher gefragt wird', 'Wo es passiert', 'Wie ich gerade drauf bin'];
  const LEVELS = ['Spüren', 'Signale lesen', 'Fragen'];

  /* Level 1: Szenen. figs = Radar der vier Figuren [Einstellung, Grund]. Jede Szene hat mindestens zwei verschiedene. */
  const SZENEN = [
    { id: 'umarmung', art: 'koerper', bild: '🤗', kurz: 'Umarmung zur Begrüßung', text: 'Zur Begrüßung umarmt dich jemand – einfach so.',
      figs: { mika: ['ok', 'Bei Freunden voll okay.'], yara: ['nein', 'Ich geb lieber die Faust.'], luca: ['kommt', 'Nur bei Leuten, die ich gut kenne.'], sam: ['ok', 'Ich umarm selbst gern.'] } },
    { id: 'haare', art: 'koerper', bild: '💇', kurz: 'Durch die Haare wuscheln', text: 'Jemand wuschelt dir zum Spaß durch die Haare.',
      figs: { mika: ['kommt', 'Bei meiner Schwester ja, sonst nein.'], yara: ['nein', 'Meine Haare sind tabu.'], luca: ['ok', 'Ist mir egal.'], sam: ['nein', 'Die Cap bleibt, wo sie ist.'] } },
    { id: 'bus', art: 'koerper', bild: '🚌', kurz: 'Ganz dicht im leeren Bus', text: 'Im fast leeren Bus setzt sich jemand ganz dicht neben dich.',
      figs: { mika: ['nein', 'Da ist doch überall Platz.'], yara: ['nein', 'Zu nah. Ich steh auf.'], luca: ['kommt', 'Wenn es mein Kumpel ist, okay.'], sam: ['kommt', 'Kommt drauf an, wer.'] } },
    { id: 'spitzname', art: 'gefuehl', bild: '📢', kurz: 'Spitzname vor der Klasse', text: 'Vor der ganzen Klasse ruft dich jemand mit einem Spitznamen.',
      figs: { mika: ['ok', '„Mikki“ find ich gut.'], yara: ['kommt', 'Kommt auf den Namen an.'], luca: ['nein', 'Vor allen? Nein.'], sam: ['kommt', 'Nur, wenn ich ihn mag.'] } },
    { id: 'note', art: 'gefuehl', bild: '📝', kurz: 'Note laut vor allen', text: 'Jemand fragt laut vor allen nach deiner Note.',
      figs: { mika: ['nein', 'Das geht nur mich was an.'], yara: ['ok', 'Ich sag’s eh jedem.'], luca: ['kommt', 'Bei einer guten Note okay.'], sam: ['nein', 'Nicht vor allen.'] } },
    { id: 'peinlich', art: 'gefuehl', bild: '🤭', kurz: 'Peinliches weitererzählt', text: 'Ein Freund erzählt anderen, was dir gestern Peinliches passiert ist.',
      figs: { mika: ['nein', 'Das war unter uns.'], yara: ['kommt', 'Wenn ich selbst drüber lache, okay.'], luca: ['ok', 'Ich find so was lustig.'], sam: ['nein', 'Erst fragen!'] } },
    { id: 'foto', art: 'digital', bild: '📸', kurz: 'Foto ohne Fragen gepostet', text: 'Jemand postet ein Foto von dir, ohne zu fragen.',
      figs: { mika: ['kommt', 'Wenn ich gut aussehe … trotzdem lieber gefragt.'], yara: ['nein', 'Fotos von mir nur mit Okay.'], luca: ['ok', 'Mir egal.'], sam: ['nein', 'Gar nicht.'] } },
    { id: 'handy', art: 'digital', bild: '📱', kurz: 'Jemand scrollt durch dein Handy', text: 'Jemand nimmt dein Handy und scrollt durch deine Bilder.',
      figs: { mika: ['nein', 'Mein Handy ist privat.'], yara: ['nein', 'Niemals.'], luca: ['kommt', 'Wenn ich daneben sitze und es zeige, ja.'], sam: ['nein', 'Stopp, sofort.'] } },
    { id: 'gruppe', art: 'digital', bild: '👥', kurz: 'Ungefragt in eine Gruppe', text: 'Du wirst ohne Fragen in eine neue Chat-Gruppe gepackt.',
      figs: { mika: ['ok', 'Ich kann ja wieder raus.'], yara: ['kommt', 'Kommt auf die Gruppe an.'], luca: ['nein', 'Erst fragen, dann adden.'], sam: ['ok', 'Mehr Leute, mehr Spaß.'] } },
  ];

  /* Level 2: Signale ohne Worte. zuege: was tut die andere Figur jetzt? */
  const SIGNALE = [
    { id: 'umarmung', fig: 'yara', von: 'sam', mood: 'angst', text: 'Sam umarmt Yara zur Begrüßung. Yara macht sich steif, die Arme bleiben unten. Ein kurzes Lächeln.',
      signale: ['macht sich steif', 'Arme bleiben unten', 'nur ein kurzes Lächeln'],
      zuege: { fragen: { t: 'Sam fragt: „Lieber Faust statt Umarmung?“', a: 'Yara: „Ja, Faust ist besser!“ 👊', mood: 'froh' }, weiter: { t: 'Sam umarmt Yara beim nächsten Mal wieder.', a: 'Yara geht Sam ab jetzt lieber aus dem Weg.', mood: 'traurig' }, witz: { t: 'Sam: „Komm schon, sei nicht so steif!“', a: 'Yara lacht gequält – und fühlt sich doppelt blöd.', mood: 'genervt' } } },
    { id: 'spitzname', fig: 'luca', von: 'mika', mood: 'traurig', text: 'Mika nennt Luca vor allen „Zwerg“. Luca lacht mit – und schaut dann lange auf den Boden.',
      signale: ['lacht nur kurz mit', 'Blick auf den Boden', 'wird still'],
      zuege: { fragen: { t: 'Mika fragt später allein: „Nervt dich der Name?“', a: 'Luca: „Ehrlich? Ja. Vor allen schon.“', mood: 'neutral' }, weiter: { t: 'Mika ruft morgen wieder „Zwerg“.', a: 'Luca lacht wieder mit. Innen wird es jeden Tag schlimmer.', mood: 'traurig' }, witz: { t: 'Mika: „Ist doch Spaß, du lachst ja selbst!“', a: 'Luca: „… ja. Klar.“', mood: 'traurig' } } },
    { id: 'schulter', fig: 'mika', von: 'yara', mood: 'genervt', text: 'Yara liest Mika beim Tippen über die Schulter mit. Mika dreht das Handy weg und hört auf zu tippen.',
      signale: ['dreht das Handy weg', 'hört auf zu tippen', 'sagt kein Wort'],
      zuege: { fragen: { t: 'Yara: „Oh, sorry – willst du das lieber allein?“', a: 'Mika: „Ja, danke. Ist privat.“', mood: 'neutral' }, weiter: { t: 'Yara beugt sich noch weiter rüber.', a: 'Mika steckt das Handy weg und ist sauer.', mood: 'wut' }, witz: { t: 'Yara: „Uiii, wem schreibst du denn? 😏“', a: 'Mika wird rot und steht auf.', mood: 'genervt' } } },
    { id: 'foto', fig: 'sam', von: 'luca', mood: 'neutral', text: 'Luca will ein Foto von Sam posten. Sam sagt: „Ähm … ja … wenn’s sein muss.“',
      signale: ['„ähm“', '„wenn’s sein muss“', 'zögert lange'],
      zuege: { fragen: { t: 'Luca: „Klingt nach eher nicht. Lieber nicht posten?“', a: 'Sam: „Ja, lieber nicht. Danke, dass du fragst.“', mood: 'froh' }, weiter: { t: 'Luca postet das Foto.', a: 'Sam sieht es online und fühlt sich übergangen.', mood: 'traurig' }, witz: { t: 'Luca: „Super, dann poste ich gleich zwei!“', a: 'Sam: „… okay.“ (Es ist nicht okay.)', mood: 'genervt' } } },
  ];
  const ZUG_LABEL = { fragen: 'Nachgefragt', weiter: 'Weitergemacht', witz: 'Weggelacht' };

  /* Level 3: Fragen statt raten – und ein Nein annehmen */
  const FRAGEN = [
    { id: 'foto', wer: 'sam', an: 'yara', lage: 'Sam will ein Gruppenfoto in den Klassenchat stellen. Yara ist drauf.',
      wie: { echt: { t: '„Darf ich das Foto posten? Du kannst auch Nein sagen.“' }, druck: { t: '„Ich poste das jetzt, okay? Ist doch gut geworden.“', a: 'Yara: „Ähm … okay …“ – ein halbes Ja. Sam hat nicht wirklich gefragt.', mood: 'neutral' }, suggestiv: { t: '„Du hast doch nichts dagegen, oder?“', a: 'Yara: „Na ja … nein …?“ – Nein sagen ist jetzt schwer.', mood: 'neutral' }, gar: { t: '(Sam postet einfach.)', a: 'Yara sieht das Foto in der Gruppe. Niemand hat gefragt.', mood: 'wut' } },
      nein: 'Lieber nicht. Ich seh da komisch aus.',
      reakt: { annehmen: { t: '„Okay, kein Ding. Ich nehm ein anderes.“', a: 'Yara: „Danke! Das mit dem Baum ist gut, nimm das.“', mood: 'froh' }, ueberreden: { t: '„Ach komm, du siehst doch gut aus!“', a: 'Yara: „Ich hab Nein gesagt.“ Die Stimmung kippt.', mood: 'genervt' }, beleidigt: { t: '„Mann, mit dir kann man echt nichts machen.“', a: 'Yara fühlt sich schuldig – obwohl sie nur Nein gesagt hat.', mood: 'traurig' }, heimlich: { t: '(Sam postet es abends trotzdem.)', a: 'Yara sieht es. Das Vertrauen ist kaputt.', mood: 'wut' } } },
    { id: 'umarmen', wer: 'mika', an: 'sam', lage: 'Sam hat Geburtstag. Mika will Sam zum Gratulieren umarmen.',
      wie: { echt: { t: '„Umarmung oder lieber High Five?“' }, druck: { t: '„Komm her, Geburtstagskind!“ (Mika hat die Arme schon offen.)', a: 'Sam lässt es geschehen – und steht steif da.', mood: 'neutral' }, suggestiv: { t: '„Eine Umarmung ist doch okay, oder?“', a: 'Sam: „Ähm … ja …“ – das klingt nicht nach Ja.', mood: 'neutral' }, gar: { t: '(Mika umarmt Sam einfach.)', a: 'Sam zuckt zusammen.', mood: 'ueberrascht' } },
      nein: 'High Five! Umarmen ist nicht so meins.',
      reakt: { annehmen: { t: '„High Five! Alles Gute!“ ✋', a: 'Sam grinst: „Danke, Mika!“', mood: 'froh' }, ueberreden: { t: '„Ach komm, heute ist doch dein Geburtstag!“', a: 'Sam: „Nein, echt nicht.“ Peinliche Pause.', mood: 'genervt' }, beleidigt: { t: '„Wow. Okay. Dann halt nicht.“', a: 'Sam fühlt sich am eigenen Geburtstag blöd.', mood: 'traurig' }, heimlich: { t: '(Mika umarmt Sam später trotzdem, „aus Spaß“.)', a: 'Sam geht Mika auf der Feier aus dem Weg.', mood: 'wut' } } },
    { id: 'handy', wer: 'luca', an: 'mika', lage: 'Luca will auf Mikas Handy die Fotos vom Ausflug anschauen.',
      wie: { echt: { t: '„Darf ich die Ausflugs-Fotos anschauen? Du kannst auch Nein sagen.“' }, druck: { t: '„Gib mal her, ich will die Fotos sehen.“ (Luca greift schon zu.)', a: 'Mika lässt los – und schaut nervös zu.', mood: 'angst' }, suggestiv: { t: '„Ich darf doch kurz, oder?“', a: 'Mika: „Ähm … kurz …“ – ein halbes Ja.', mood: 'neutral' }, gar: { t: '(Luca nimmt das Handy vom Tisch.)', a: 'Mika: „Hey! Gib her!“', mood: 'wut' } },
      nein: 'Lieber nicht. Ich schick dir die vom Ausflug.',
      reakt: { annehmen: { t: '„Okay, schick sie mir, danke!“', a: 'Mika schickt fünf Fotos. Alles entspannt.', mood: 'froh' }, ueberreden: { t: '„Ach komm, ich schau nur die vom Ausflug!“', a: 'Mika: „Ich hab Nein gesagt.“ Luca rollt mit den Augen.', mood: 'genervt' }, beleidigt: { t: '„Was hast du denn zu verstecken?“', a: 'Mika fühlt sich ertappt – obwohl gar nichts ist.', mood: 'traurig' }, heimlich: { t: '(Luca schaut, als Mika kurz weg ist.)', a: 'Mika merkt es. Das war’s mit dem Vertrauen.', mood: 'wut' } } },
  ];
  const WIE_LABEL = { echt: 'Echt gefragt', druck: 'Mit Druck', suggestiv: 'Ja vorgegeben', gar: 'Nicht gefragt' };
  const REAKT_LABEL = { annehmen: 'Nein angenommen', ueberreden: 'Überredet', beleidigt: 'Beleidigt', heimlich: 'Heimlich trotzdem' };

  // Radar-Anzeige: Halbkreis grün / gelb / rot, die Nadel zeigt auf die Einstellung
  function dial(sel, size) {
    const el = h('div', { class: 'okr-dial' + (size === 'mini' ? ' mini' : ''), 'data-sel': sel || '' });
    const w = sel ? RADAR[sel].winkel : 0;
    el.innerHTML = '<svg viewBox="0 0 200 112" aria-hidden="true">'
      + '<path class="okr-arc ok" d="M20 100 A80 80 0 0 1 60 30.72"/>'
      + '<path class="okr-arc kommt" d="M60 30.72 A80 80 0 0 1 140 30.72"/>'
      + '<path class="okr-arc nein" d="M140 30.72 A80 80 0 0 1 180 100"/>'
      + '<g class="okr-needle" style="transform: rotate(' + (size === 'start' ? 0 : w) + 'deg)"><line x1="100" y1="100" x2="100" y2="36"/><circle cx="100" cy="100" r="9"/></g></svg>';
    if (size !== 'mini') el.appendChild(h('div', { class: 'okr-dial-labels' }, h('span', null, 'okay'), h('span', null, 'kommt drauf an'), h('span', null, 'nicht okay')));
    // Nadel einschwingen lassen
    if (size === 'start' && sel) requestAnimationFrame(() => requestAnimationFrame(() => { const n = el.querySelector('.okr-needle'); if (n) n.style.transform = 'rotate(' + w + 'deg)'; }));
    return el;
  }
  // Kompakte Aufgaben-Zeile (statt großer Karte), damit die Antworten sichtbar bleiben
  const hint = (ctx, text, icon) => h('div', { class: 'kg-hint' }, CREW.icon(icon || 'chat', 24), h('span', { class: 'kg-hint-t' }, text), ctx.readBtn(text));
  const szeneKarte = (ctx, s, eyebrow) => h('div', { class: 'okr-szene' },
    h('span', { class: 'okr-bild', 'aria-hidden': 'true' }, s.bild),
    h('div', { class: 'stack', style: { gap: '6px', minWidth: 0 } },
      h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, eyebrow + ' · ' + ART[s.art]), ctx.readBtn(s.text)),
      h('p', { class: 'okr-text' }, s.text)));

  /* Level 1: eine Szene spüren. Liefert { s, wahl, worauf } oder null */
  async function spueren(ctx, s, nr, total) {
    const badge = ctx.stufe(1, LEVELS);
    const w = ctx.scr([
      szeneKarte(ctx, s, 'Szene ' + nr + ' von ' + total),
      h('div', { class: 'okr-frage' }, dial(null), hint(ctx, 'Wenn dir das passiert: Wo steht dein Radar? Nur für dich.', 'target')),
      ctx.safetyLine('Deine Einstellung bleibt auf diesem iPad. Nichts wird gespeichert.'),
    ], { eyebrow: 'Szene ' + nr + ' · Spüren', badge });
    const r = await ctx.ask(w, [
      { label: 'okay', value: 'ok', variant: 'good', icon: 'check', id: 'okr-ok' },
      { label: 'kommt drauf an', value: 'kommt', variant: 'yellow', icon: 'help', id: 'okr-kommt' },
      { label: 'nicht okay', value: 'nein', variant: 'teamB', icon: 'x', id: 'okr-nein' },
    ]);
    if (r === ctx.SKIP) return null;
    let worauf = null;
    if (r === 'kommt') {
      const w2 = ctx.scr([szeneKarte(ctx, s, 'Szene ' + nr), hint(ctx, 'Kommt drauf an – worauf kommt es für dich an?', 'help')], { eyebrow: 'Szene ' + nr + ' · Spüren', badge });
      const r2 = await ctx.ask(w2, WORAUF.map((x) => ({ label: x, value: x, variant: 'ghost' })));
      if (r2 !== ctx.SKIP) worauf = r2;
    }
    // Die Figuren zeigen ihr Radar
    const figs = Object.keys(s.figs);
    const arten = new Set(figs.map((f) => s.figs[f][0]));
    const okF = figs.find((f) => s.figs[f][0] === 'ok'), neinF = figs.find((f) => s.figs[f][0] === 'nein');
    const satz = okF && neinF ? 'Bei ' + ctx.figures[okF].name + ' okay, bei ' + ctx.figures[neinF].name + ' nicht. Beides gilt.' : 'Vier Figuren, ' + arten.size + ' Einstellungen. Alle gelten.';
    const w3 = ctx.scr([
      h('div', { class: 'okr-mein' }, dial(r, 'start'), h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Dein Radar'), h('b', { class: 'okr-mein-t' }, RADAR[r].label + (worauf ? ' – ' + worauf : '')), h('span', { class: 'muted small' }, s.kurz))),
      h('div', { class: 'okr-figs' }, figs.map((f) => h('div', { class: 'okr-fig', 'data-sel': s.figs[f][0] },
        ctx.avatar(f, s.figs[f][0] === 'nein' ? 'genervt' : s.figs[f][0] === 'ok' ? 'froh' : 'neutral', 56),
        h('div', { class: 'stack', style: { gap: '2px', minWidth: 0 } }, h('b', null, ctx.figures[f].name + ': ' + RADAR[s.figs[f][0]].label), h('span', { class: 'small' }, s.figs[f][1]))))),
      ctx.say(satz, { eyebrow: 'Die Figuren', small: true }),
    ], { eyebrow: 'Szene ' + nr + ' · Radar', badge });
    await ctx.next(w3, nr < total ? 'Nächste Szene' : 'Weiter');
    return { s, wahl: r, worauf };
  }

  /* Level 2: Signale lesen – okay für die Figur? Was tut die andere? */
  async function signale(ctx, sg) {
    const badge = ctx.stufe(2, LEVELS);
    const fig = ctx.figures[sg.fig], von = ctx.figures[sg.von];
    const karte = () => ctx.figureCard({ fig: sg.fig, mood: sg.mood, text: sg.text, eyebrow: fig.name + ' sagt kein Wort' });
    const w = ctx.scr([karte(), hint(ctx, 'Ist das für ' + fig.name + ' okay? Achtet auf den Körper.', 'eye')], { eyebrow: 'Signale lesen', badge });
    const r = await ctx.ask(w, [{ label: 'Sieht okay aus', value: 'ok', variant: 'ghost', icon: 'check' }, { label: 'Unklar', value: 'kommt', variant: 'ghost', icon: 'help' }, { label: 'Sieht nicht okay aus', value: 'nein', variant: 'ghost', icon: 'x' }]);
    if (r === ctx.SKIP) return null;
    const gut = r !== 'ok';
    const w2 = ctx.scr([
      karte(),
      h('div', { class: 'okr-signale' }, h('span', { class: 'eyebrow' }, 'Das sagt der Körper'), h('div', { class: 'row', style: { gap: '8px' } }, sg.signale.map((x) => h('span', { class: 'pill okr-signal' }, CREW.icon('eye', 14), x)))),
      ctx.say(r === 'ok' ? 'Das Lächeln täuscht. Kein Nein heißt nicht Ja – schau auf die Signale.' : r === 'kommt' ? 'Unsicher? Genau dann hilft eins: fragen.' : 'Gut gelesen. Kein Wort – aber der Körper sagt: nicht okay.', { eyebrow: gut ? 'Gut hingeschaut' : 'Nochmal hinschauen', small: true }),
    ], { eyebrow: 'Signale lesen', badge });
    if ((await ctx.next(w2, 'Was macht ' + von.name + ' jetzt?')) === ctx.SKIP) return { gut, zug: null };
    const order = ctx.rshuffle(Object.keys(sg.zuege));
    let tries = 0, erster = null;
    for (;;) {
      const w3 = ctx.scr([karte(), hint(ctx, 'Und jetzt: Was macht ' + von.name + '?', 'chat')], { eyebrow: 'Signale lesen', badge });
      const z = await ctx.ask(w3, order.map((k) => ({ label: sg.zuege[k].t, value: k, variant: 'ghost', id: 'okr-zug-' + k })), { autoPick: tries ? () => 'fragen' : undefined });
      if (z === ctx.SKIP) return { gut, zug: erster };
      tries++;
      if (!erster) erster = z;
      const Z = sg.zuege[z];
      CREW.sound.play(z === 'fragen' ? 'great' : 'soft');
      const w4 = ctx.scr([
        h('div', { class: 'grid two' },
          ctx.figureCard({ fig: sg.von, mood: z === 'fragen' ? 'neutral' : z === 'witz' ? 'froh' : 'neutral', text: Z.t, eyebrow: von.name + ' · ' + ZUG_LABEL[z] }),
          ctx.figureCard({ fig: sg.fig, mood: Z.mood, text: Z.a, eyebrow: fig.name })),
        h('div', { class: 'card stack soft' }, h('b', null, z === 'fragen' ? 'Nachfragen ist die sichere Seite: Jetzt weiß ' + von.name + ' Bescheid.' : 'Signale übergehen kostet Vertrauen – auch wenn es „nur Spaß“ war.'), h('p', { class: 'muted small', style: { margin: 0 } }, 'Wenn du unsicher bist, ob etwas okay ist: fragen. Am besten allein, nicht vor allen.')),
      ], { eyebrow: 'Signale lesen · Folge', badge });
      if (z === 'fragen' || tries >= 3) { await ctx.next(w4, 'Weiter'); return { gut, zug: erster }; }
      const rr = await ctx.ask(w4, [{ label: 'Zurückspulen', value: 'rewind', variant: 'ghost', icon: 'undo', id: 'okr-rewind' }, { label: 'Weiter', value: 'next', iconRight: 'right', id: 'btn-next' }], { autoPick: () => 'rewind' });
      if (rr !== 'rewind') return { gut, zug: erster };
    }
  }

  /* Level 3: Wie fragt die Figur – und was tut sie mit dem Nein? */
  async function fragen(ctx, f) {
    const badge = ctx.stufe(3, LEVELS);
    const wer = ctx.figures[f.wer], an = ctx.figures[f.an];
    const lageKarte = () => ctx.figureCard({ fig: f.wer, mood: 'neutral', text: f.lage, eyebrow: wer.name + ' will etwas' });
    const wieOrder = ctx.rshuffle(Object.keys(f.wie));
    let wieErst = null;
    for (let t = 0; ; t++) {
      const w = ctx.scr([lageKarte(), hint(ctx, 'Schritt 1: Wie fragt ' + wer.name + '?', 'chat')], { eyebrow: 'Fragen', badge });
      const r = await ctx.ask(w, wieOrder.map((k) => ({ label: f.wie[k].t, value: k, variant: 'ghost', id: 'okr-wie-' + k })), { autoPick: t ? () => 'echt' : undefined });
      if (r === ctx.SKIP) return null;
      if (!wieErst) wieErst = r;
      if (r === 'echt') { CREW.sound.play('good'); break; }
      CREW.sound.play('soft');
      const W = f.wie[r];
      const w2 = ctx.scr([
        ctx.figureCard({ fig: f.an, mood: W.mood, text: W.a, eyebrow: an.name + ' · ' + WIE_LABEL[r] }),
        h('div', { class: 'card stack soft' }, h('b', null, 'Ein halbes Ja ist kein Ja.'), h('p', { class: 'muted small', style: { margin: 0 } }, 'Echt fragen heißt: vorher fragen – und Nein ist erlaubt. Spulen wir zurück.')),
      ], { eyebrow: 'Fragen · Folge', badge });
      if ((await ctx.next(w2, 'Zurückspulen', { id: 'okr-rewind' })) === ctx.SKIP) return null;
    }
    // Schritt 2: Die andere Figur sagt Nein
    const reaktOrder = ctx.rshuffle(Object.keys(f.reakt));
    let reaktErst = null;
    for (let t = 0; ; t++) {
      const w3 = ctx.scr([
        h('div', { class: 'grid two' },
          ctx.figureCard({ fig: f.wer, mood: 'neutral', text: f.wie.echt.t, eyebrow: wer.name + ' fragt', chat: true }),
          ctx.figureCard({ fig: f.an, mood: 'neutral', text: '„' + f.nein + '“', eyebrow: an.name + ' sagt Nein', chat: true })),
        hint(ctx, 'Schritt 2: Was macht ' + wer.name + ' mit dem Nein?', 'shield'),
      ], { eyebrow: 'Fragen', badge });
      const r = await ctx.ask(w3, reaktOrder.map((k) => ({ label: f.reakt[k].t, value: k, variant: 'ghost', id: 'okr-reakt-' + k })), { autoPick: t ? () => 'annehmen' : undefined });
      if (r === ctx.SKIP) return { wie: wieErst, reakt: reaktErst };
      if (!reaktErst) reaktErst = r;
      const R = f.reakt[r];
      const ok = r === 'annehmen';
      CREW.sound.play(ok ? 'great' : 'soft');
      const w4 = ctx.scr([
        ctx.figureCard({ fig: f.an, mood: R.mood, text: R.a, eyebrow: an.name + ' · ' + REAKT_LABEL[r] }),
        h('div', { class: 'card stack soft' }, h('b', null, ok ? 'Fragen heißt auch: das Nein annehmen. Ohne Diskussion.' : 'Wer fragt, muss mit einem Nein rechnen – und es stehen lassen.'), h('p', { class: 'muted small', style: { margin: 0 } }, ok ? 'Genau so bleibt Vertrauen. Und ' + an.name + ' sagt beim nächsten Mal ehrlich Ja oder Nein.' : 'Überreden, beleidigt sein oder heimlich trotzdem – das macht aus dem Nein ein Problem für ' + an.name + '.')),
      ], { eyebrow: 'Fragen · Folge', badge });
      if (ok || t >= 2) { await ctx.next(w4, 'Weiter'); return { wie: wieErst, reakt: reaktErst }; }
      const rr = await ctx.ask(w4, [{ label: 'Zurückspulen', value: 'rewind', variant: 'ghost', icon: 'undo', id: 'okr-rewind2' }, { label: 'Weiter', value: 'next', iconRight: 'right', id: 'btn-next' }], { autoPick: () => 'rewind' });
      if (rr !== 'rewind') return { wie: wieErst, reakt: reaktErst };
    }
  }

  CREW.registerGame({
    id: 'okayradar',
    template: 'T1',
    icon: 'target',
    themen: ['Grenzen', 'Einverständnis', 'Signale lesen', 'Unterschiede'],
    safety: ['figuren', 'freiwillig'],
    help: true,
    szenen: SZENEN, signale: SIGNALE, fragen: FRAGEN, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Kurze Szenen. Du stellst heimlich dein Radar: okay, kommt drauf an oder nicht okay. Dann zeigen die Figuren ihres. Am Ende vergleicht ihr zu zweit.',
        levels: LEVELS,
        steps: [
          { icon: 'target', title: 'Radar stellen', text: 'Allein, nur für dich. Nichts wird gespeichert.' },
          { icon: 'eye', title: 'Signale lesen', text: 'Ohne Worte: Ist es für die Figur okay?' },
          { icon: 'chat', title: 'Fragen', text: 'Wie fragt man – und was tut man mit einem Nein?' },
        ],
        probe: ctx.T.probeCard('Probe: Jemand leiht sich deinen Stift, ohne zu fragen. Wo steht dein Radar? Tipp irgendwas – zählt nicht.', [{ label: 'okay', value: 'ok', variant: 'ghost' }, { label: 'kommt drauf an', value: 'kommt', variant: 'ghost' }, { label: 'nicht okay', value: 'nein', variant: 'ghost' }]),
      });
      await ctx.T.codeCheck();
      // Level 1: je eine Szene Körper, Gefühl, Digital (Einheit j1-e22), gleiche Auswahl auf allen iPads
      const l1 = ['koerper', 'gefuehl', 'digital'].map((a) => ctx.rpick(SZENEN.filter((s) => s.art === a)));
      const wahl = [];
      for (let i = 0; i < l1.length; i++) {
        const r = await spueren(ctx, l1[i], i + 1, l1.length);
        if (r) wahl.push(r);
      }
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt geht es um die Grenzen der anderen. Eine Figur sagt kein Wort – aber ihr Körper sagt etwas. Ist es für sie okay?' });
      const sg = ctx.rpick(SIGNALE.filter((x) => !l1.some((s) => s.id === x.id))) || SIGNALE[0];
      const r2 = await signale(ctx, sg);
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Raten ist riskant. Eine Figur will etwas – wie fragt sie richtig? Und was macht sie, wenn die Antwort Nein ist?' });
      const r3 = await fragen(ctx, ctx.rpick(FRAGEN));

      // Austausch zu zweit
      await ctx.T.pairScreen();
      await ctx.T.vergleich({
        title: 'Okay-Radar',
        items: wahl.map((x) => ({ label: x.s.kurz, el: dial(x.wahl, 'mini'), text: 'Mein Radar: ' + RADAR[x.wahl].label + (x.worauf ? ' – ' + x.worauf : '') })),
        questions: ['Bei dir okay, bei mir nicht? Sucht eine Szene, wo ihr verschieden seid.', 'Woran merkst du, dass etwas für andere nicht okay ist?'],
        note: 'Bei dir okay, bei mir nicht. Beides gilt. Erzählen ist freiwillig.',
      });
      const gefragt = (r2 && r2.zug === 'fragen' ? 1 : 0) + (r3 && r3.wie === 'echt' ? 1 : 0);
      return {
        summary: 'Jede:r hat ein eigenes Radar. Bei dir okay, bei mir nicht – beides gilt. Und wer unsicher ist, fragt.',
        stats: [[wahl.length, 'Radar gestellt'], [gefragt, 'mal gleich gefragt'], [r3 && r3.reakt === 'annehmen' ? 1 : 0, 'Nein angenommen']],
        help: true,
        extra: h('p', { class: 'muted small' }, 'War etwas für dich nicht okay? Skill-Karte „Mein sicherer Ort“: kurz im Kopf an deinen sicheren Ort – und dann mit jemandem reden, dem du vertraust.'),
      };
    },
  });
})();
