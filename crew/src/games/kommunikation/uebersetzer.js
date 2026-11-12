/* Spiel „Übersetzer“ (Thema: Kommunikation & Grenzen) · Vorlage T3 Zu zweit an einem iPad · j1-e20
   Umgebaut nach der Kritik (kein Daumen-Zählen): Eine Chat-Nachricht einer Figur („ok 👍“, „ja klar.“, „mach doch 🙃“).
   Beide tippen verdeckt nebeneinander, wie sie sie lesen (nett / ironisch / sauer / egal) – Hand drüber, das Feld sperrt sich.
   Reveal: gleich oder verschieden? Bei „verschieden“ sagt jede:r in einem Satz, woran er/sie es erkannt hat. Dann wählt das
   Paar gemeinsam die Rückfrage (zwei Finger), und die Figur antwortet – erst jetzt zeigt sich, wie es gemeint war.
   Zurückspulen wie bei Clash, wenn die Rückfrage alles schlimmer macht. In drei Level:
   1) Lesen – Nachrichten mit Emoji, drei Rückfragen.
   2) Nachfragen – Nachrichten mit Punkt, Kürze oder Ironie, vier Rückfragen (offen, Annahme, Konter, nicht fragen).
   3) Klar schreiben – jetzt ist Mika der Absender: Welche Version lesen Yara, Luca und Sam gleich – und so, wie Mika es meint?
   Variante bei Bewegungsdrang (Lehrer-Hinweis): drei Ecken im Raum. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h, clear } = CREW.util;

  const LESART = {
    nett: { id: 'nett', label: 'nett', emo: '🙂', mood: 'froh' },
    ironisch: { id: 'ironisch', label: 'ironisch', emo: '🙃', mood: 'genervt' },
    sauer: { id: 'sauer', label: 'sauer', emo: '😠', mood: 'wut' },
    egal: { id: 'egal', label: 'egal', emo: '😐', mood: 'neutral' },
  };
  const ORDER = ['nett', 'ironisch', 'sauer', 'egal'];
  const RUECK = {
    offen: { label: 'Offen gefragt', warum: 'Offen gefragt: Die Figur kann einfach sagen, wie es gemeint war.' },
    annahme: { label: 'Annahme', warum: 'Eine Annahme als Frage: Die Figur muss sich erst verteidigen.' },
    konter: { label: 'Konter', warum: 'Ein Konter macht aus einem Missverständnis einen Streit.' },
    still: { label: 'Nicht gefragt', warum: 'Nicht gefragt: Das Rätseln bleibt – auf beiden Seiten.' },
  };
  const LEVELS = ['Lesen', 'Nachfragen', 'Klar schreiben'];

  /* Nachrichten: von (Absender), an (liest), vorher (Chat davor: [wer, Text]), text, gemeint (eine der vier Lesarten),
     hinweis (warum man es so oder so lesen kann), rueck: vier Rückfragen von „an“ mit Antwort (a) und Stimmung von „von“. */
  const NACHRICHTEN = [
    /* Level 1: mit Emoji */
    { id: 'daumen', stufe: 1, von: 'yara', an: 'mika', vorher: [['mika', 'Bin 10 Minuten später da, sorry!']], text: 'ok 👍', gemeint: 'nett',
      hinweis: 'Ein Daumen allein wirkt auf manche kühl. Yara meinte ihn ehrlich.',
      rueck: {
        offen: { t: 'Passt das wirklich, oder nervt’s dich?', a: 'Passt echt! Ich hol mir solange einen Kakao 😄', mood: 'froh' },
        annahme: { t: 'Bist du jetzt sauer auf mich?', a: 'Hä, nein? Wieso denkst du das?', mood: 'ueberrascht' },
        konter: { t: 'Chill mal, sind doch nur 10 Minuten, kein Weltuntergang 🙄', a: 'Hab ich was gesagt?? Jetzt nervt’s mich wirklich.', mood: 'genervt' },
        still: { t: '(Mika schreibt nichts zurück.)', a: '(Mika grübelt die ganze Busfahrt: Ist Yara sauer? Yara ahnt nichts.)', mood: 'neutral' },
      } },
    { id: 'mutig', stufe: 1, von: 'luca', an: 'sam', vorher: [['sam', '(Foto: neuer Haarschnitt) Und?']], text: 'mutig 😂', gemeint: 'nett',
      hinweis: '„mutig“ mit 😂 kann Spott sein – oder Bewunderung. Hier war es Bewunderung.',
      rueck: {
        offen: { t: 'Wie meinst du „mutig“? Gut oder schlimm? 😅', a: 'Gut! Sieht cool aus. Ich würd mich das nie trauen.', mood: 'froh' },
        annahme: { t: 'Lachst du mich gerade aus, oder was soll das heißen?', a: 'Nein! Sorry, so war das gar nicht gemeint.', mood: 'ueberrascht' },
        konter: { t: 'Deine Frisur ist auch kein Kunstwerk 😂', a: 'Wow. Ich wollte eigentlich nett sein.', mood: 'traurig' },
        still: { t: '(Sam löscht das Foto aus dem Status.)', a: '(Luca wundert sich, warum das Foto weg ist.)', mood: 'neutral' },
      } },
    { id: 'allesgut', stufe: 1, von: 'mika', an: 'luca', vorher: [['luca', 'Ich kann doch nicht zu deinem Geburtstag, sorry.']], text: 'alles gut 🙂', gemeint: 'sauer',
      hinweis: 'Das 🙂 sagt „alles gut“. Mika ist aber enttäuscht – das Emoji versteckt es.',
      rueck: {
        offen: { t: 'Echt okay für dich?', a: 'Ehrlich? Ich bin enttäuscht. Du hattest es versprochen.', mood: 'traurig' },
        annahme: { t: 'Bist du beleidigt oder was?', a: 'Nein. Alles gut, hab ich doch gesagt.', mood: 'genervt' },
        konter: { t: 'Wieso schreibst du so komisch?', a: 'Ich schreib gar nicht komisch.', mood: 'genervt' },
        still: { t: 'Cool, dann bis Montag! 👋', a: '(Mika legt das Handy weg. Der Geburtstag fühlt sich etwas leerer an.)', mood: 'traurig' },
      } },
    { id: 'malschauen', stufe: 1, von: 'luca', an: 'mika', vorher: [['mika', 'Kommst du heute zum Training?']], text: 'mal schauen 🙃', gemeint: 'ironisch',
      hinweis: 'Das 🙃 heißt hier: „Die Lage ist blöd.“ Nicht: „Du nervst.“',
      rueck: {
        offen: { t: 'Klingt ironisch – was ist los?', a: 'Nachsitzen bis fünf 🙃 Ich komm danach.', mood: 'genervt' },
        annahme: { t: 'Hast du keinen Bock mehr auf uns?', a: 'Was? Doch! Ich hab Nachsitzen.', mood: 'ueberrascht' },
        konter: { t: 'Dann bleib halt weg 🙄', a: 'Ich kann nichts dafür! Ich hab Nachsitzen.', mood: 'wut' },
        still: { t: '(Mika erzählt dem Team: Luca hat keinen Bock.)', a: '(Am nächsten Tag denkt das halbe Team, Luca drückt sich.)', mood: 'traurig' },
      } },
    { id: 'kabel', stufe: 1, von: 'yara', an: 'sam', vorher: [['sam', 'Ups, hab dein Ladekabel aus Versehen mitgenommen.']], text: '😐', gemeint: 'egal',
      hinweis: 'Ein 😐 ohne Worte kann alles heißen. Hier hieß es: „Kein Ding, ich bin müde.“',
      rueck: {
        offen: { t: 'Ist das schlimm? Ich bring’s morgen mit.', a: 'Kein Ding, hab noch eins. Bin nur müde 😴', mood: 'neutral' },
        annahme: { t: 'Bist du sauer wegen dem Kabel?', a: 'Nö. Aber jetzt fragst du so komisch.', mood: 'ueberrascht' },
        konter: { t: 'Musst nicht gleich so gucken 🙄', a: 'Ich guck gar nicht! Ich bin müde!', mood: 'genervt' },
        still: { t: '(Sam fährt um 22 Uhr noch mit dem Rad quer durch die Stadt.)', a: '(Yara schläft schon. Sam steht im Regen vor der Tür.)', mood: 'neutral' },
      } },
    { id: 'wowdanke', stufe: 1, von: 'sam', an: 'yara', vorher: [['yara', 'Ich hab die Präsi gestern Nacht allein fertig gemacht.']], text: 'wow danke 🙂', gemeint: 'ironisch',
      hinweis: '„wow danke“ mit 🙂 klingt freundlich. Sam ist aber gekränkt – Sam wollte Teil 2 machen.',
      rueck: {
        offen: { t: 'Klingt komisch. Passt dir was nicht?', a: 'Ehrlich? Ich wollte Teil 2 machen. Jetzt steht mein Name drauf, ohne dass ich was gemacht hab.', mood: 'traurig' },
        annahme: { t: 'Freust du dich gar nicht?', a: 'Doch. Toll. Wirklich.', mood: 'genervt' },
        konter: { t: 'Gern geschehen! Hättest ja auch mal früher was machen können 😜', a: 'Früher? Ich durfte ja gar nichts machen!', mood: 'wut' },
        still: { t: '(Yara schickt ein ❤️.)', a: '(Sam sagt bei der Präsi kein Wort.)', mood: 'traurig' },
      } },
    /* Level 2: Punkt, Kürze, Ironie */
    { id: 'jaklar', stufe: 2, von: 'sam', an: 'mika', vorher: [['mika', 'Kann ich mir dein Spiel fürs Wochenende leihen?']], text: 'ja klar.', gemeint: 'nett',
      hinweis: 'Der Punkt am Ende wirkt auf viele streng. Sam hat im Bus nur schnell getippt.',
      rueck: {
        offen: { t: 'Echt okay? Der Punkt klingt so ernst 😅', a: 'Haha, echt okay! Hab im Bus nur schnell getippt.', mood: 'froh' },
        annahme: { t: 'Wenn du eigentlich keinen Bock hast, dann sag’s halt einfach.', a: 'Hä? Ich hab doch Ja gesagt.', mood: 'ueberrascht' },
        konter: { t: 'Schon gut, ich frag wen anders.', a: 'Ich hab doch Ja gesagt?! Jetzt versteh ich gar nichts.', mood: 'ueberrascht' },
        still: { t: '(Mika fragt nicht mehr nach dem Spiel.)', a: '(Sam wundert sich, warum Mika das Spiel nie abholt.)', mood: 'neutral' },
      } },
    { id: 'machdoch', stufe: 2, von: 'yara', an: 'luca', vorher: [['luca', 'Ich geh heute doch mit den anderen ins Kino.']], text: 'mach doch 🙃', gemeint: 'sauer',
      hinweis: '„mach doch“ klingt nach Erlaubnis. Das 🙃 sagt: Yara ist sauer – sie waren verabredet.',
      rueck: {
        offen: { t: 'Klingt nicht, als wär’s okay. Ist es okay?', a: 'Nein. Wir waren verabredet. Ich hab mich gefreut.', mood: 'traurig' },
        annahme: { t: 'Bist du jetzt eifersüchtig, oder was?', a: 'Eifersüchtig?! Wir waren verabredet!', mood: 'wut' },
        konter: { t: 'Werd ich auch 😎', a: '(Yara antwortet zwei Tage lang nicht mehr.)', mood: 'wut' },
        still: { t: 'Cool, danke dir! Dann bis morgen in der Schule 👍', a: '(Luca geht ins Kino. Yara sitzt zu Hause und ist richtig sauer.)', mood: 'traurig' },
      } },
    { id: 'okpunkt', stufe: 2, von: 'mika', an: 'yara', vorher: [['yara', 'Hab dein Foto in die Gruppe gestellt, sieht voll gut aus!']], text: 'ok.', gemeint: 'sauer',
      hinweis: 'Ein „ok.“ mit Punkt kann alles heißen. Hier steckt eine Grenze drin: Mika wurde nicht gefragt.',
      rueck: {
        offen: { t: 'Hm, „ok.“ – passt das Foto für dich?', a: 'Ehrlich gesagt nein. Ich will gefragt werden, bevor ein Foto von mir in die Gruppe kommt.', mood: 'genervt' },
        annahme: { t: 'Freust du dich gar nicht? 😕', a: 'Nicht wirklich.', mood: 'genervt' },
        konter: { t: 'Sei nicht so empfindlich, das Foto ist doch voll schön 🙄', a: 'Empfindlich? Es ist MEIN Foto.', mood: 'wut' },
        still: { t: '(Yara stellt noch zwei Fotos dazu.)', a: '(Mika ist jetzt richtig wütend – und Yara weiß nicht, warum.)', mood: 'wut' },
      } },
    { id: 'k', stufe: 2, von: 'luca', an: 'sam', vorher: [['sam', '… und deshalb war ich gestern so komisch. Sorry, echt.']], text: 'k', gemeint: 'nett',
      hinweis: 'Nach einer langen Entschuldigung wirkt ein „k“ eiskalt. Luca stand nur im vollen Bus.',
      rueck: {
        offen: { t: 'Ist das ein „k, alles gut“ oder ein „k, lass mich“?', a: 'Haha, „alles gut“! War im vollen Bus. Schon vergessen.', mood: 'froh' },
        annahme: { t: 'Bist du immer noch sauer?', a: 'Nein … wieso immer noch?', mood: 'ueberrascht' },
        konter: { t: 'Wow, danke für nichts.', a: 'Hä? Ich hab doch geantwortet!', mood: 'genervt' },
        still: { t: '(Sam schreibt nichts mehr und grübelt.)', a: '(Sam schläft schlecht. Luca hat die Sache längst vergessen.)', mood: 'traurig' },
      } },
    { id: 'schoen', stufe: 2, von: 'sam', an: 'yara', vorher: [['yara', 'Ich hab eine 1 in Mathe!!!']], text: 'Schön für dich.', gemeint: 'ironisch',
      hinweis: '„Schön für dich.“ ohne Ausrufezeichen klingt kühl. Dahinter steckt Sams eigene schlechte Note.',
      rueck: {
        offen: { t: 'Klingt bisschen kühl – alles okay bei dir?', a: 'Sorry. Ich hab ’ne 5. Ich freu mich trotzdem für dich.', mood: 'traurig' },
        annahme: { t: 'Bist du neidisch?', a: 'Nein! … Vielleicht ein bisschen.', mood: 'genervt' },
        konter: { t: 'Tja, manche können’s halt 😎', a: '(Sam schaltet den Chat stumm.)', mood: 'wut' },
        still: { t: '(Yara feiert in der Gruppe weiter.)', a: '(Sam fühlt sich noch schlechter.)', mood: 'traurig' },
      } },
    { id: 'wiedumeinst', stufe: 2, von: 'mika', an: 'luca', vorher: [['luca', 'Dann mach ich die Präsi halt allein.']], text: 'Wie du meinst.', gemeint: 'sauer',
      hinweis: '„Wie du meinst.“ klingt nach Zustimmung – ist aber oft Rückzug mit Ärger.',
      rueck: {
        offen: { t: 'Heißt das „okay“ – oder bist du sauer?', a: 'Ehrlich? Ich will mitmachen. Aber du hörst nie auf meine Ideen.', mood: 'genervt' },
        annahme: { t: 'Du hast doch eh keinen Bock, oder?', a: 'Doch! Aber egal.', mood: 'genervt' },
        konter: { t: 'Gut, dann sag nachher nicht, ich hätte nicht gefragt.', a: 'Mach doch. Ist mir egal.', mood: 'wut' },
        still: { t: 'Ok 👍', a: '(Luca macht alles allein. Mika fühlt sich ausgebootet.)', mood: 'traurig' },
      } },
  ];

  /* Level 3: Mika schreibt. Drei Versionen; lesen = wie Yara, Luca, Sam sie lesen. ziel = so meint Mika es. */
  const SENDEN = [
    { id: 'absage', an: 'yara', ziel: 'nett', lage: 'Mika ist zu platt fürs Kino. Yara freut sich schon. Mika will absagen – ohne dass Yara denkt, Mika hat keinen Bock auf sie.',
      versionen: [
        { k: 'kurz', t: 'kann heute nicht', lesen: { yara: 'sauer', luca: 'egal', sam: 'sauer' }, antwort: 'Aha. Okay. Dann halt nicht.', mood: 'traurig' },
        { k: 'klar', t: 'Sorry, ich bin heute echt platt und schaff das Kino nicht 😩 Morgen? Ich freu mich drauf!', lesen: { yara: 'nett', luca: 'nett', sam: 'nett' }, antwort: 'Schade – aber klar! Morgen 18 Uhr? 😊', mood: 'froh' },
        { k: 'ironisch', t: 'Kino? Heute? Mega Idee 🙃', lesen: { yara: 'ironisch', luca: 'sauer', sam: 'nett' }, antwort: 'Hä? Kommst du jetzt oder nicht?', mood: 'ueberrascht' },
      ] },
    { id: 'foto', an: 'luca', ziel: 'nett', lage: 'Luca hat ein Foto von Mika in die Gruppe gestellt. Mika will, dass es weg ist – freundlich, ohne Streit.',
      versionen: [
        { k: 'kurz', t: 'lösch das.', lesen: { yara: 'sauer', luca: 'sauer', sam: 'sauer' }, antwort: 'Chill. Ist doch nur ein Foto 🙄', mood: 'wut' },
        { k: 'klar', t: 'Hey, ich mag das Foto nicht in der Gruppe. Kannst du es bitte löschen? Danke!', lesen: { yara: 'nett', luca: 'nett', sam: 'nett' }, antwort: 'Oh, sorry! Ist gelöscht.', mood: 'neutral' },
        { k: 'ironisch', t: 'Wow, tolles Foto von mir 😂😂', lesen: { yara: 'nett', luca: 'nett', sam: 'ironisch' }, antwort: 'Haha, oder? Ich stell noch eins rein 😂', mood: 'froh' },
      ] },
    { id: 'danke', an: 'sam', ziel: 'nett', lage: 'Sam hat Mika den ganzen Samstag beim Umzug geholfen. Mika will richtig Danke sagen.',
      versionen: [
        { k: 'kurz', t: 'thx', lesen: { yara: 'egal', luca: 'nett', sam: 'egal' }, antwort: 'np.', mood: 'neutral' },
        { k: 'klar', t: 'Danke, dass du den ganzen Samstag geholfen hast! Ohne dich wär ich nie fertig geworden 🙏', lesen: { yara: 'nett', luca: 'nett', sam: 'nett' }, antwort: 'Gern! Die nächste Pizza geht auf dich 😄', mood: 'froh' },
        { k: 'ironisch', t: 'Na, endlich hast du mal was gemacht 😜', lesen: { yara: 'ironisch', luca: 'nett', sam: 'sauer' }, antwort: 'Endlich?? Ich hab den ganzen Tag geschleppt!', mood: 'wut' },
      ] },
  ];
  const LESER = ['yara', 'luca', 'sam'];

  // Chat im Handy-Look: Zeilen davor, die Nachricht groß, optional die Fortsetzung
  function chatEl(ctx, n, extra) {
    const name = (f) => ctx.figures[f].name;
    return h('div', { class: 'chat-box ue-chat' },
      h('div', { class: 'ue-chat-head' }, ctx.avatar(n.von, 'neutral', 34), h('b', null, name(n.von) + ' und ' + name(n.an)), h('span', { class: 'muted small' }, 'erfundener Chat'),
        ctx.readBtn(() => n.vorher.map(([w, t]) => name(w) + ': ' + t).concat([name(n.von) + ': ' + n.text]).join('. '))),
      n.vorher.map(([w, t]) => ctx.bubble(t, { who: name(w), me: w === n.an })),
      ctx.bubble(n.text, { who: name(n.von), cls: 'ue-msg' }),
      // „(…)“ ist Erzähltext (was passiert), keine Nachricht
      (extra || []).map((l) => (/^\(/.test(l.t) ? h('p', { class: 'ue-narr' }, l.t) : ctx.bubble(l.t, { who: l.who, me: l.me }))));
  }
  // Kompakte Aufgaben-Zeile (statt großer Karte), damit die Wahl sichtbar bleibt
  const hint = (ctx, text, icon) => h('div', { class: 'kg-hint' }, CREW.icon(icon || 'chat', 24), h('span', { class: 'kg-hint-t' }, text), ctx.readBtn(text));
  const lesartChip = (id, cls) => h('span', { class: 'ue-lesart ' + (cls || ''), 'data-read': id }, h('span', { class: 'ue-emo' }, LESART[id].emo), h('b', null, LESART[id].label));

  /* Verdeckt lesen: zwei Felder nebeneinander (Handy: untereinander). Ein Tipp sperrt das Feld und verdeckt die Wahl.
     Liefert { links, rechts } oder SKIP. */
  function geheimLesen(ctx, n, eyebrow, badge) {
    return ctx.waitFor(new Promise((resolve) => {
      const picks = { links: null, rechts: null };
      let done = false;
      const check = () => {
        if (done || !picks.links || !picks.rechts) return;
        done = true;
        CREW.sound.play('unlock');
        setTimeout(() => resolve({ links: picks.links, rechts: picks.rechts }), ctx.auto ? 30 : 500);
      };
      const half = (side, label) => {
        const box = h('div', { class: 'ue-half', 'data-side': side });
        const draw = () => {
          clear(box);
          box.classList.toggle('locked', !!picks[side]);
          box.append(h('div', { class: 'row between ue-half-head' }, h('b', null, label), h('span', { class: 'muted small' }, picks[side] ? 'gesperrt' : 'Hand drüber halten')));
          if (picks[side]) {
            box.append(h('div', { class: 'ue-lock' }, CREW.icon('lock', 30), h('b', null, 'Gesperrt'), h('span', { class: 'muted small' }, picks.links && picks.rechts ? 'Gleich kommt der Vergleich.' : 'Warte auf die andere Person.')));
            return;
          }
          box.append(h('div', { class: 'ue-read-btns' }, ORDER.map((id) => {
            const b = h('button', { type: 'button', class: 'btn ghost ue-read-btn', 'data-read': id }, h('span', { class: 'ue-emo' }, LESART[id].emo), h('span', null, LESART[id].label));
            b.addEventListener('click', () => { if (picks[side]) return; CREW.sound.play('tap'); picks[side] = id; draw(); redrawOther(side); check(); });
            return b;
          })));
        };
        box.draw = draw;
        return box;
      };
      const L = half('links', 'Links'), R = half('rechts', 'Rechts');
      const redrawOther = (side) => { const o = side === 'links' ? R : L; if (picks[side === 'links' ? 'rechts' : 'links']) o.draw(); };
      L.draw(); R.draw();
      const wrap = ctx.scr([
        chatEl(ctx, n),
        hint(ctx, 'Wie liest du das? Jede:r tippt verdeckt – Hand drüber halten.', 'eyeOff'),
        h('div', { class: 'ue-halves' }, L, R),
      ], { eyebrow, badge });
      if (ctx.auto) setTimeout(() => ['links', 'rechts'].forEach((s) => { const bs = wrap.querySelectorAll('.ue-half[data-side="' + s + '"] .ue-read-btn'); if (bs.length) bs[Math.floor(ctx.autoRng() * bs.length)].click(); }), Math.max(40, window.__crewAutoDelay || 0));
    }));
  }

  /* Auswahl als Chips + zwei Finger. Liefert den Schlüssel der gewählten Option, null (nichts gewählt) oder SKIP. */
  async function paarWahl(ctx, wrap, opts, o) {
    const slot = (o && o.slot) || wrap;
    let pick = null;
    const row = h('div', { class: 'stack ue-wahl' }, opts.map((x) => {
      const b = h('button', { type: 'button', class: 'chip ue-wahl-chip', 'data-wahl': x.k }, x.t);
      b.addEventListener('click', () => { CREW.sound.play('tap'); pick = x.k; row.querySelectorAll('.chip').forEach((c) => c.classList.toggle('sel', c === b)); });
      return b;
    }));
    slot.appendChild(h('div', { class: 'card' }, row));
    if (ctx.auto) pick = o.autoPick || opts[Math.floor(ctx.autoRng() * opts.length)].k;
    const r = await ctx.T.twoFinger(wrap, { label: 'Beide einig: Finger drauf', hint: 'Erst eine Antwort antippen, dann zwei Finger.' });
    if (r === ctx.SKIP) return ctx.SKIP;
    return pick;
  }

  /* Eine Lese-Runde: verdeckt lesen, vergleichen, Rückfrage wählen, Antwort – mit Zurückspulen */
  async function leseRunde(ctx, n, nr, total, L) {
    const von = ctx.figures[n.von], an = ctx.figures[n.an];
    const badge = ctx.stufe(L, LEVELS);
    const picks = await geheimLesen(ctx, n, 'Nachricht ' + nr + ' von ' + total, badge);
    if (picks === ctx.SKIP) return null;
    const gleich = picks.links === picks.rechts;
    const w = ctx.scr([
      chatEl(ctx, n),
      h('div', { class: 'ue-reveal' },
        h('div', { class: 'ue-reveal-side' }, h('span', { class: 'muted small' }, 'Links liest'), lesartChip(picks.links, 'big')),
        h('div', { class: 'ue-reveal-mid display' }, gleich ? '=' : '≠'),
        h('div', { class: 'ue-reveal-side' }, h('span', { class: 'muted small' }, 'Rechts liest'), lesartChip(picks.rechts, 'big'))),
      ctx.say(gleich
        ? 'Gleich gelesen. Aber nur ' + von.name + ' weiß, wie es gemeint war. Wie findet ' + an.name + ' es raus?'
        : 'Verschieden gelesen – ganz normal. Jede:r sagt in einem Satz: Woran hast du es erkannt?', { eyebrow: gleich ? 'Gleich gelesen' : 'Verschieden gelesen', small: true }),
      gleich ? null : h('div', { class: 'row ue-clues' }, h('span', { class: 'muted small' }, 'Hilfe zum Reden:'), ['das Emoji', 'der Punkt', 'so kurz', 'der Chat davor'].map((t) => h('span', { class: 'pill' }, t))),
    ], { eyebrow: 'Nachricht ' + nr + ' · Vergleich', badge });
    if ((await ctx.next(w, 'Rückfrage wählen')) === ctx.SKIP) return { gleich, klar: false, erst: false };
    const kinds = ctx.rshuffle(L === 1 ? ['offen', 'annahme', 'konter'] : ['offen', 'annahme', 'konter', 'still']);
    let tries = 0;
    for (;;) {
      const rechts = h('div', { class: 'stack' }, hint(ctx, 'Was schreibt ' + an.name + ' zurück? Einigt euch auf eine Antwort.', 'chat'));
      const w2 = ctx.scr([h('div', { class: 'kg-pair' }, chatEl(ctx, n), rechts)], { eyebrow: 'Nachricht ' + nr + ' · Rückfrage', badge });
      const pick = await paarWahl(ctx, w2, kinds.map((k) => ({ k, t: n.rueck[k].t })), { autoPick: tries >= 1 ? 'offen' : null, slot: rechts });
      if (pick === ctx.SKIP) return { gleich, klar: false, erst: false };
      if (!pick) { CREW.ui.toast('Erst eine Antwort antippen.'); continue; }
      tries++;
      const r = n.rueck[pick];
      const klar = pick === 'offen';
      CREW.sound.play(klar ? 'great' : 'soft');
      const treffer = ['links', 'rechts'].filter((s) => picks[s] === n.gemeint).length;
      const w3 = ctx.scr([h('div', { class: 'kg-pair' },
        chatEl(ctx, n, [{ who: an.name, t: r.t, me: true }, { who: von.name, t: r.a }]),
        h('div', { class: 'ue-gemeint' },
          h('div', { class: 'stack', style: { gap: '4px', alignItems: 'center' } }, h('span', { class: 'eyebrow' }, 'Gemeint war'), lesartChip(n.gemeint, 'big')),
          h('div', { class: 'stack', style: { gap: '6px', minWidth: 0 } },
            h('div', { class: 'row', style: { gap: '8px' } }, h('span', { class: 'pill ' + (klar ? 'good' : '') }, klar ? 'Geklärt' : RUECK[pick].label), h('span', { class: 'muted small' }, treffer === 2 ? 'Ihr habt beide richtig gelesen.' : treffer === 1 ? 'Eine:r von euch lag richtig – ohne Nachfragen weiß man das nie.' : 'Gemeint war etwas anderes, als ihr dachtet.')),
            h('p', { class: 'small', style: { margin: 0 } }, n.hinweis),
            h('p', { class: 'muted small', style: { margin: 0 } }, RUECK[pick].warum)))),
      ], { eyebrow: 'Nachricht ' + nr + ' · Antwort', badge });
      if (klar || tries >= 3) {
        await ctx.next(w3, 'Weiter');
        return { gleich, klar, erst: klar && tries === 1 };
      }
      const z = await ctx.ask(w3, [{ label: 'Zurückspulen', value: 'rewind', variant: 'ghost', icon: 'undo', id: 'ue-rewind' }, { label: 'Weiter', value: 'next', iconRight: 'right', id: 'btn-next' }], { autoPick: () => 'rewind' });
      if (z !== 'rewind') return { gleich, klar: false, erst: false };
      CREW.sound.play('tap');
    }
  }

  /* Level 3: Mika schreibt selbst. Lese-Test mit drei Figuren. */
  async function senden(ctx, s) {
    const an = ctx.figures[s.an];
    const order = ctx.rshuffle(s.versionen);
    let tries = 0;
    for (;;) {
      const rechts = h('div', { class: 'stack' }, hint(ctx, 'Welche Version lesen alle so, wie Mika es meint? Einigt euch.', 'phone'));
      const w = ctx.scr([h('div', { class: 'kg-pair' },
        ctx.figureCard({ fig: 'mika', mood: 'neutral', text: s.lage, eyebrow: 'Mika will ' + an.name + ' schreiben', cls: 'ue-lage' }),
        rechts)], { eyebrow: 'Mika schreibt', badge: ctx.stufe(3, LEVELS) });
      const pick = await paarWahl(ctx, w, order.map((v) => ({ k: v.k, t: v.t })), { autoPick: tries >= 1 ? 'klar' : null, slot: rechts });
      if (pick === ctx.SKIP) return { ok: false };
      if (!pick) { CREW.ui.toast('Erst eine Version antippen.'); continue; }
      tries++;
      const v = s.versionen.find((x) => x.k === pick);
      const reads = LESER.map((f) => v.lesen[f]);
      const anzahl = new Set(reads).size;
      const ok = reads.every((x) => x === s.ziel);
      CREW.sound.play(ok ? 'great' : 'soft');
      const text = ok ? 'Alle drei lesen es so, wie Mika es meint. Das kommt an.'
        : anzahl === 1 ? 'Alle lesen es gleich – aber anders, als Mika es meint.'
          : 'Drei Leute, ' + anzahl + ' Lesarten. Da steckt ein Missverständnis drin.';
      const w2 = ctx.scr([
        h('div', { class: 'chat-box ue-chat' }, ctx.bubble(v.t, { who: 'Mika', me: true })),
        h('div', { class: 'ue-test' }, LESER.map((f) => h('div', { class: 'ue-test-p', 'data-read': v.lesen[f] },
          ctx.avatar(f, LESART[v.lesen[f]].mood, 64), h('b', null, ctx.figures[f].name + ' liest'), lesartChip(v.lesen[f])))),
        ctx.say(text, { eyebrow: 'Lese-Test', small: true }),
        ctx.figureCard({ fig: s.an, mood: v.mood, text: v.antwort, eyebrow: an.name + ' antwortet', chat: true }),
      ], { eyebrow: 'Lese-Test', badge: ctx.stufe(3, LEVELS) });
      if (ok || tries >= 3) {
        await ctx.next(w2, 'Weiter');
        return { ok, erst: ok && tries === 1 };
      }
      const z = await ctx.ask(w2, [{ label: 'Andere Version testen', value: 'rewind', variant: 'ghost', icon: 'undo', id: 'ue-rewind' }, { label: 'So lassen', value: 'next', iconRight: 'right', id: 'btn-next' }], { autoPick: () => 'rewind' });
      if (z !== 'rewind') return { ok: false };
    }
  }

  CREW.registerGame({
    id: 'uebersetzer',
    template: 'T3',
    icon: 'chat',
    themen: ['Chat', 'Emoji', 'Missverständnis', 'Nachfragen'],
    safety: ['figuren', 'freiwillig'],
    help: false,
    nachrichten: NACHRICHTEN, senden: SENDEN, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Zu zweit, nebeneinander. Eine Chat-Nachricht: Jede:r tippt verdeckt, wie er oder sie sie liest. Dann vergleicht ihr und wählt die Rückfrage, die es klärt.',
        levels: LEVELS,
        steps: [
          { icon: 'eyeOff', title: 'Verdeckt lesen', text: 'Hand drüber: nett, ironisch, sauer oder egal?' },
          { icon: 'chat', title: 'Nachfragen', text: 'Gemeinsam die Rückfrage wählen. Die Figur antwortet.' },
          { icon: 'phone', title: 'Klar schreiben', text: 'Welche Nachricht lesen alle gleich?' },
        ],
        probe: ctx.T.probeCard('Probe: Die Nachricht „super.“ – nett oder ironisch? Tippt irgendwas – zählt nicht.', [{ label: '🙂 nett', value: 'nett', variant: 'ghost' }, { label: '🙃 ironisch', value: 'ironisch', variant: 'ghost' }]),
      });
      const l1 = ctx.rshuffle(NACHRICHTEN.filter((n) => n.stufe === 1)).slice(0, 1);
      const l2 = ctx.rshuffle(NACHRICHTEN.filter((n) => n.stufe === 2)).slice(0, 2);
      const plan = l1.map((n) => ({ n, L: 1 })).concat(l2.map((n) => ({ n, L: 2 })));
      let geklaert = 0, gleich = 0, erst = 0, gespielt = 0;
      for (let i = 0; i < plan.length; i++) {
        if (i > 0 && plan[i - 1].L !== plan[i].L) await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt ohne Emoji-Hilfe: Punkt, Kürze, Ironie. Und vier Rückfragen – eine davon klingt wie eine Frage, ist aber eine Annahme.' });
        const r = await leseRunde(ctx, plan[i].n, i + 1, plan.length, plan[i].L);
        if (!r) continue;
        gespielt++;
        if (r.klar) geklaert++;
        if (r.gleich) gleich++;
        if (r.erst) erst++;
      }
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Jetzt seid ihr der Absender: Mika will etwas schreiben. Welche Version lesen Yara, Luca und Sam so, wie Mika es meint?' });
      const s = ctx.rpick(SENDEN);
      const r3 = await senden(ctx, s);
      return {
        summary: geklaert >= 2 ? 'Übersetzt! Im Chat fehlen Stimme und Gesicht – Nachfragen ersetzt beides.' : 'Gleiche Nachricht, verschiedene Köpfe. Nachfragen spart Rätselraten und Streit.',
        stats: [[geklaert, 'Nachrichten geklärt'], [gleich, 'mal gleich gelesen'], [r3.ok ? 1 : 0, 'Nachricht kommt an']],
        extra: gespielt ? h('p', { class: 'muted small' }, erst ? 'Beim ersten Versuch offen nachgefragt: ' + erst + ' mal. Die Zauberfrage: „Wie meinst du das?“' : 'Die Zauberfrage für nächstes Mal: „Wie meinst du das?“') : null,
      };
    },
  });
})();
