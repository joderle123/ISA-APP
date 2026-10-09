/* Spiel „Teilen oder nicht?“ (Thema: Digital, Gesundheit & Abschluss) · Vorlage T3 Zu zweit an einem iPad · j1-e28
   Kein weiteres Real-or-Fake: Ein aufregender Post, der Daumen liegt auf Senden. Das Paar kippt die drei Prüffragen
   gemeinsam (Wer sagt das? Gibt’s das woanders? Will mich der Post wütend machen?) – jede Karte dreht sich und zeigt,
   was man bei diesem Post sieht. Dann entscheiden beide mit zwei Fingern: Teilen / Nachfragen / Löschen – und sehen
   die Folge nach 24 Stunden. Der letzte Post (4) ist immer das gefälschte Bild einer Mitschülerin, aus der Klasse geschickt:
   klare Grenze Mobbing / kann strafbar sein, plus Hilfe. Es geht um Figuren, nie um echte Personen. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const FRAGEN = [
    { id: 'wer', frage: 'Wer sagt das?', icon: 'user' },
    { id: 'wo', frage: 'Gibt’s das woanders?', icon: 'eye' },
    { id: 'wut', frage: 'Will mich der Post wütend machen?', icon: 'bolt' },
  ];
  const ZUEGE = {
    teilen: { id: 'teilen', label: 'Teilen', icon: 'right', variant: 'ghost' },
    nachfragen: { id: 'nachfragen', label: 'Nachfragen', icon: 'chat', variant: 'ghost' },
    loeschen: { id: 'loeschen', label: 'Löschen', icon: 'x', variant: 'ghost' },
    eingreifen: { id: 'eingreifen', label: 'Stoppen und eingreifen', icon: 'shield', variant: 'ghost' },
  };
  const LEVELS = ['Prüfen', 'Vorhersagen', 'Eingreifen'];
  const AMPEL = { gruen: 'Grün · passt', gelb: 'Gelb · unklar', rot: 'Rot · Stopp' };
  const gesamtAmpel = (p) => { const a = Object.values(p.hint).map((x) => x.ampel); return a.includes('rot') ? 'rot' : a.includes('gelb') ? 'gelb' : 'gruen'; };
  /* Level 3: Eingreifen – was hilft wirklich? (vier helfen, zwei klingen gut, machen es aber schlimmer) */
  const SCHRITTE = [
    { k: 'stopp', t: 'Nicht weiterleiten', ok: true },
    { k: 'beweis', t: 'Screenshot als Beweis behalten', ok: true },
    { k: 'yara', t: 'Yara Bescheid sagen', ok: true },
    { k: 'hilfe', t: 'Einer erwachsenen Person zeigen', ok: true },
    { k: 'gruppe', t: 'In die Gruppe schicken: „Ist fake!“', ok: false, warum: 'Dann sehen noch mehr Leute das Bild.' },
    { k: 'zurueck', t: 'Ein peinliches Bild von Sam posten', ok: false, warum: 'Rache macht aus einem Mobbing zwei.' },
  ];

  /* Posts: acc = Absender, bg = Bild-Stil, text = Post, hint[frage] = {text, ampel: gruen|gelb|rot},
     folge[zug] = { text, mood }. gut = Züge, die zur Teilen-Bremse passen. */
  const POSTS = [
    {
      id: 'sturm', acc: 'news_lux_blitz', seit: 'seit 2 Wochen · 31 Follower', bg: 'sturm', bild: 'Bild: dunkler Himmel über einem Schulhof', likes: '2.4k',
      text: 'SCHULE MORGEN GESCHLOSSEN!!! Sturmwarnung für ganz Luxemburg. TEILEN, damit es alle wissen!!',
      hint: { wer: { text: 'Unbekannter Account, zwei Wochen alt, kein Name, kein Impressum.', ampel: 'rot' }, wo: { text: 'Auf der Schul-Website steht nichts. RTL meldet nur Wind. Sonst nirgends.', ampel: 'rot' }, wut: { text: 'Großbuchstaben, drei Ausrufezeichen, „TEILEN!!“ – der Post will Aufregung.', ampel: 'rot' } },
      folge: { teilen: { text: 'Die halbe Klasse bleibt zu Hause. Die Schule war offen. Fehlstunden für alle, die Mika geglaubt haben.', mood: 'traurig' }, nachfragen: { text: 'Mika schreibt dem Sekretariat. Antwort: „Schule ist offen.“ Mika war die erste Person, die nachgefragt hat.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Am nächsten Tag ist die Schule offen. Nichts passiert – das ist das Beste, was passieren konnte.', mood: 'froh' } },
      gut: ['nachfragen', 'loeschen'],
    },
    {
      id: 'besuch', acc: 'lycee_junglinster_official', seit: 'seit 4 Jahren · bestätigt', bg: 'schule', bild: 'Bild: Sporthalle, Schul-Logo', likes: '318',
      text: 'Nächsten Freitag besucht ein Spieler der Nationalmannschaft unsere Schule. Treffpunkt 10 Uhr, Sporthalle.',
      hint: { wer: { text: 'Offizieller Schul-Account, bestätigt, seit vier Jahren aktiv.', ampel: 'gruen' }, wo: { text: 'Steht auch auf der Schul-Website und im Elternbrief.', ampel: 'gruen' }, wut: { text: 'Nein. Sachlich: Datum, Uhrzeit, Ort. Kein Druck.', ampel: 'gruen' } },
      folge: { teilen: { text: 'Alle wissen Bescheid, Freitag ist die Halle voll. Stimmte – weil Mika vorher geschaut hat, wer das sagt.', mood: 'froh' }, nachfragen: { text: 'Das Sekretariat bestätigt. Etwas langsam, aber sicher. Auch gut.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Mika hat nichts falsch gemacht – nur eine echte Info nicht weitergegeben. Kein Drama.', mood: 'neutral' } },
      gut: ['teilen', 'nachfragen'],
    },
    {
      id: 'airpods', acc: 'giveaway_lux_official', seit: 'seit 3 Tagen · 0 Beiträge', bg: 'gift', bild: 'Bild: weiße Kopfhörer, Geschenkband', likes: '9.1k',
      text: 'GRATIS AirPods für die ERSTEN 100, die auf den Link klicken und den Post teilen! Nur heute! 🎧🔥',
      hint: { wer: { text: 'Account ist drei Tage alt, null Beiträge, „official“ im Namen – das macht jeder.', ampel: 'rot' }, wo: { text: 'Der Link führt auf eine Seite, die nach Handynummer und Passwort fragt. Apple verschenkt nichts so.', ampel: 'rot' }, wut: { text: 'Nicht wütend, aber hastig: „ERSTE 100“, „nur heute“. Zeitdruck ist ein Trick.', ampel: 'rot' } },
      folge: { teilen: { text: '14 Leute aus Mikas Liste klicken den Link. Zwei geben ihre Nummer ein. Ab morgen bekommen sie Spam-Anrufe.', mood: 'traurig' }, nachfragen: { text: 'Mika fragt: „Wer hat schon welche bekommen?“ Niemand. Der Account ist am nächsten Tag weg.', mood: 'neutral' }, loeschen: { text: 'Gelöscht. Keine AirPods – die gab es sowieso nie. Mikas Nummer bleibt Mikas.', mood: 'froh' } },
      gut: ['loeschen', 'nachfragen'],
    },
    {
      id: 'energy', acc: 'wahrheit_jetzt', seit: 'seit 1 Jahr · 12k Follower', bg: 'energy', bild: 'Bild: schwarze Dose, Blitz-Logo', likes: '5.7k',
      text: 'Energy-Drinks machen Jugendliche in Luxemburg KRANK: 300 Fälle in einem Monat – und niemand sagt es euch!',
      hint: { wer: { text: 'Account ohne Namen, ohne Quelle. 12.000 Follower sagen nichts über die Wahrheit.', ampel: 'gelb' }, wo: { text: 'Die Zahl 300 steht nirgends. Es gibt echte Warnungen zu Energy-Drinks – aber mit anderen Zahlen.', ampel: 'gelb' }, wut: { text: '„Niemand sagt es euch“ – der Post will, dass du dich betrogen fühlst. Das ist der Haken.', ampel: 'rot' } },
      folge: { teilen: { text: 'Yara liest „300 Fälle“ und bekommt Panik wegen eines Drinks. Die Zahl war erfunden.', mood: 'traurig' }, nachfragen: { text: 'Mika sucht die Zahl. Es gibt sie nicht. Die echte Info gibt es beim Gesundheitsministerium – ohne Panik.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Energy-Drinks sind trotzdem kein Wasser – aber ein Teil Wahrheit macht den Post nicht wahr.', mood: 'neutral' } },
      gut: ['nachfragen', 'loeschen'],
    },
    {
      id: 'hai', acc: 'lux_viral', seit: 'Memes & Fun · 40k Follower', bg: 'hai', bild: 'Bild: Flosse im Fluss, Brücke im Hintergrund', likes: '21k',
      text: 'HAI in der Alzette gesichtet!!! Bei Mersch. Foto von heute Morgen 😱🦈',
      hint: { wer: { text: 'Meme-Account. Steht sogar in der Bio: „Memes & Fun“.', ampel: 'gelb' }, wo: { text: 'Keine Zeitung, kein Radio. Auf dem Bild spiegelt sich der Hai falsch im Wasser – typisch KI.', ampel: 'rot' }, wut: { text: 'Will Aufregung, nicht Wut. Drei Ausrufezeichen und ein 😱.', ampel: 'gelb' } },
      folge: { teilen: { text: 'Lucas kleine Cousine traut sich eine Woche nicht an den Fluss. Es war ein KI-Bild.', mood: 'neutral' }, nachfragen: { text: 'Mika fragt im Chat: „Echt?“ Luca findet in 20 Sekunden das Original: ein Aquarium in Spanien.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Es gibt keinen Hai in der Alzette. Es gab nie einen.', mood: 'froh' } },
      gut: ['nachfragen', 'loeschen'],
    },
    {
      id: 'lehrer', acc: 'luca', fig: true, seit: 'aus Mikas Klasse', bg: 'flur', bild: 'Bild: leerer Schulflur', likes: '6',
      text: 'Hab gehört, unsere Lehrkraft wird gefeuert, weil sie jemanden angeschrien hat. Wusstet ihr das??',
      hint: { wer: { text: 'Luca aus der Klasse – kein Fake-Account. Aber: „Hab gehört.“ Von wem?', ampel: 'gelb' }, wo: { text: 'Niemand sonst weiß davon. Keine Mail der Schule, nichts.', ampel: 'rot' }, wut: { text: 'Ein Gerücht über eine echte Person. Es will, dass du es weitererzählst.', ampel: 'rot' } },
      folge: { teilen: { text: 'Am Montag spricht die ganze Stufe darüber. Die Lehrkraft wurde nicht gefeuert – sie war krank. Jetzt weiß sie, was geredet wurde.', mood: 'traurig' }, nachfragen: { text: 'Mika fragt Luca: „Von wem?“ Luca: „Von Sam. Der hat’s von jemandem.“ Mehr ist nicht dran. Das Gerücht endet bei Mika.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Ein Gerücht über einen echten Menschen geht nicht weiter. Stark.', mood: 'froh' } },
      gut: ['nachfragen', 'loeschen'],
    },
    {
      id: 'fest', acc: 'elternverein_junglinster', seit: 'seit 6 Jahren · bestätigt', bg: 'fest', bild: 'Bild: Waffelstand, Girlanden', likes: '142',
      text: 'Schulfest am 14. Juni ab 15 Uhr. Wir suchen noch Helferinnen und Helfer für den Waffelstand. Meldet euch im Sekretariat!',
      hint: { wer: { text: 'Elternverein, bestätigt, seit sechs Jahren. Man kann anrufen und nachfragen.', ampel: 'gruen' }, wo: { text: 'Steht am Schwarzen Brett und auf der Schul-Website.', ampel: 'gruen' }, wut: { text: 'Nein. Eine Einladung. Kein Druck, keine Angst.', ampel: 'gruen' } },
      folge: { teilen: { text: 'Drei Leute aus Mikas Chat melden sich für den Waffelstand. Echte Info, echte Waffeln.', mood: 'froh' }, nachfragen: { text: 'Das Sekretariat bestätigt. Mika hat einen Tag verloren – und nichts riskiert.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Nichts kaputt. Nur: Diesen Post hätte Mika teilen können.', mood: 'neutral' } },
      gut: ['teilen', 'nachfragen'],
    },
  ];
  // Letzter Post – immer: gefälschtes Bild einer Mitschülerin, aus der Klasse geschickt
  const POST_FAKE = {
    id: 'fake-bild', acc: 'sam', fig: true, seit: 'Sam an Mika · privat', bg: 'party', bild: 'Bild wird nicht gezeigt', likes: '🙈 nur Mika', fixed: true,
    text: 'omg schau dir Yara an 😂😂 (Bild: ein peinliches Sportfoto von Yara) – schick weiter, die Gruppe muss das sehen',
    hint: { wer: { text: 'Sam aus der Klasse. Aber Yara war an dem Tag gar nicht beim Sport – das weiß Mika.', ampel: 'rot' }, wo: { text: 'Das Bild gibt es nirgends sonst. Schau genau: sechs Finger an einer Hand, die Schrift im Hintergrund ist Brei. KI-Fälschung.', ampel: 'rot' }, wut: { text: 'Es will, dass Mika lacht – über Yara. Das ist der Haken: Lachen fühlt sich nicht wie Mobbing an. Ist es aber.', ampel: 'rot' } },
    folge: { eingreifen: { text: 'Mika leitet nicht weiter, behält einen Screenshot, sagt Yara Bescheid und zeigt es der Klassenlehrerin. Zwei Tage später ist das Bild überall gelöscht.', mood: 'froh' }, teilen: { text: 'Yara sieht das Bild am nächsten Tag. Yara kommt drei Tage nicht zur Schule. In der Weiterleitungs-Liste steht auch Mika.', mood: 'traurig' }, nachfragen: { text: 'Mika fragt Sam: „Ist das echt?“ Sam: „Nein lol, KI. Ist nur Spaß.“ Für Yara ist es kein Spaß. Und das Bild ist noch bei Sam.', mood: 'neutral' }, loeschen: { text: 'Gelöscht bei Mika. Bei Sam ist es noch. Und Yara weiß von nichts. Löschen allein reicht hier nicht.', mood: 'neutral' } },
    gut: ['eingreifen'],
  };

  // Post-Karte im Glimmr-Look: Absender, Bild, Text, Daumen auf Senden
  function postCard(ctx, p, nr, total) {
    const absender = p.fig ? ctx.figures[p.acc].name : '@' + p.acc;
    return h('div', { class: 'ton-post', 'data-bg': p.bg },
      h('div', { class: 'ton-head' },
        p.fig ? ctx.avatar(p.acc, 'froh', 44) : h('span', { class: 'ton-ava' }),
        h('div', { class: 'stack', style: { gap: '0' } }, h('b', null, absender), h('span', { class: 'muted small' }, p.seit)),
        h('span', { class: 'pill', style: { marginLeft: 'auto' } }, 'Post ' + nr + ' von ' + total),
        ctx.readBtn(absender + ' postet: ' + p.text)),
      h('div', { class: 'ton-img' }, p.fixed ? h('span', { class: 'ton-img-note' }, 'Bild wird nicht gezeigt. Es ist erfunden – und es wäre trotzdem nicht okay.') : h('span', { class: 'ton-img-cap' }, p.bild || '')),
      h('p', { class: 'ton-text' }, p.text),
      h('div', { class: 'ton-bar' }, h('span', { class: 'ton-likes' }, CREW.icon('heart', 16), ' ' + p.likes), h('span', { class: 'ton-send' }, CREW.icon('right', 18), 'Senden', h('i', { class: 'ton-thumb' }, '👍'))));
  }

  // Die drei Prüffragen als Kipp-Karten: Vorderseite Frage, Rückseite das, was man bei diesem Post sieht
  function checkCards(ctx, p, onFlip) {
    const cards = FRAGEN.map((f, i) => {
      const hint = p.hint[f.id];
      const c = h('div', { class: 'ton-check', role: 'button', tabindex: '0', 'data-ampel': hint.ampel, 'data-check': f.id, 'aria-label': f.frage },
        h('div', { class: 'ton-front' }, CREW.icon(f.icon, 28), h('b', null, f.frage), h('span', { class: 'muted small' }, 'Zum Kippen tippen')),
        h('div', { class: 'ton-back' }, h('span', { class: 'ton-ampel' }, hint.ampel === 'gruen' ? 'Passt' : hint.ampel === 'gelb' ? 'Unklar' : 'Stopp'), h('p', null, hint.text), ctx.readBtn(f.frage + ' ' + hint.text)));
      const flip = () => { if (c.classList.contains('flipped')) return; c.classList.add('flipped'); CREW.sound.play('tap'); onFlip(f.id); };
      c.addEventListener('click', (e) => { if (e.target.closest('.read-btn')) return; flip(); });
      c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
      return c;
    });
    return h('div', { class: 'ton-checks' }, cards);
  }

  CREW.registerGame({
    id: 'teilen-oder-nicht',
    template: 'T3',
    icon: 'phone',
    themen: ['Fake News', 'Teilen-Bremse', 'KI-Bilder', 'Cybermobbing'],
    safety: ['figuren', 'freiwillig'],
    help: true,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Ein Post, der Daumen liegt auf Senden. Kippt zu zweit die drei Prüffragen – dann entscheidet ihr mit zwei Fingern: Teilen, Nachfragen, Löschen.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Prüfen', text: 'Wer sagt das? Gibt’s das woanders? Will mich der Post wütend machen?' },
          { icon: 'bolt', title: 'Vorhersagen', text: 'Erst schätzen: Grün, Gelb oder Rot? Dann kippen.' },
          { icon: 'shield', title: 'Eingreifen', text: 'Beim letzten Post reicht Löschen nicht. Was hilft wirklich?' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'),
            ctx.say('Probe: Kippt eine Karte. Einfach antippen.', { eyebrow: 'Zum Ausprobieren', small: true }),
            checkCards(ctx, { hint: { wer: { text: 'So sieht die Rückseite aus.', ampel: 'gruen' }, wo: { text: 'Hier steht, was man bei dem Post sieht.', ampel: 'gelb' }, wut: { text: 'Grün, Gelb oder Rot – wie eine Ampel.', ampel: 'rot' } } }, () => {})], { eyebrow: 'Probe' });
          await ctx.next(w, 'Verstanden');
        },
      });

      // Reihenfolge: Level 1 ein Post, Level 2 zwei Posts mit Vorhersage, Level 3 IMMER das gefälschte Bild
      const pool = ctx.rshuffle(POSTS);
      const posts = [pool[0], pool[1], pool[2], POST_FAKE];
      const lvlOf = (i) => (i === 0 ? 1 : posts[i].fixed ? 3 : 2);
      let bremse = 0, gespielt = 0, treffer = 0, geholfen = 0;
      const wahl = [];
      for (let i = 0; i < posts.length; i++) {
        const p = posts[i];
        const L = lvlOf(i);
        if (i > 0 && lvlOf(i - 1) !== L) await ctx.T.level({ n: L, names: LEVELS, text: L === 2 ? 'Jetzt schätzt ihr zuerst: Ist der Post grün, gelb oder rot? Dann kippt ihr die Karten und vergleicht.' : 'Letzter Post. Er kommt aus der Klasse – und hier reicht Löschen nicht. Ihr greift ein.' });
        // Level 2: Vorhersage vor dem Kippen
        let tipp = null;
        if (L === 2) {
          const wV = ctx.scr([
            postCard(ctx, p, i + 1, posts.length),
            ctx.say('Erst schätzen, ohne Karten: Grün, Gelb oder Rot? Einigt euch.', { eyebrow: 'Vorhersage', small: true }),
          ], { eyebrow: 'Post ' + (i + 1) + ' · Vorhersage', badge: ctx.stufe(2, LEVELS) });
          tipp = await ctx.ask(wV, ['gruen', 'gelb', 'rot'].map((a) => ({ label: AMPEL[a], value: a, variant: 'ghost', id: 'ton-tipp-' + a })));
          if (tipp === ctx.SKIP) tipp = null;
        }
        const flipped = new Set();
        const card = postCard(ctx, p, i + 1, posts.length);
        const checks = checkCards(ctx, p, (id) => { flipped.add(id); if (flipped.size === FRAGEN.length) { btnSlot.classList.add('ready'); decide.disabled = false; CREW.sound.play('unlock'); } });
        // „Entscheiden“ geht erst, wenn alle drei Karten gekippt sind
        let decide;
        const decided = new Promise((res) => { decide = CREW.ui.btn('Entscheiden', () => res(true), { iconRight: 'right', id: 'btn-decide', disabled: true }); });
        const btnSlot = h('div', { class: 'ton-ready row between' }, h('span', { class: 'muted small ton-ready-hint' }, 'Erst alle drei Karten kippen.'), decide);
        const w1 = ctx.scr([
          T3Pair(card, h('div', { class: 'stack' }, ctx.say('Kippt abwechselnd die drei Prüffragen. Dann redet: Senden oder nicht?', { eyebrow: 'Teilen-Bremse', small: true }), tipp ? h('div', { class: 'row' }, h('span', { class: 'pill' }, 'Eure Vorhersage: ' + AMPEL[tipp])) : null, checks, btnSlot)),
        ], { eyebrow: 'Post ' + (i + 1), badge: ctx.stufe(L, LEVELS) });
        if (ctx.auto) setTimeout(() => { checks.querySelectorAll('.ton-check').forEach((c) => c.click()); decide.click(); }, 40);
        const r = await ctx.waitFor(decided);
        if (r === ctx.SKIP) { wahl.push(null); continue; }

        // Entscheidung: Teilen / Nachfragen / Löschen, dann beide Finger drauf
        const ist = gesamtAmpel(p);
        if (tipp && tipp === ist) treffer++;
        const w2 = ctx.scr([
          postCard(ctx, p, i + 1, posts.length),
          tipp ? h('div', { class: 'card row', style: { gap: '10px', alignItems: 'center' } }, CREW.icon(tipp === ist ? 'check' : 'shuffle', 22), h('span', null, 'Vorhersage: ' + AMPEL[tipp] + ' · Karten: ' + AMPEL[ist] + (tipp === ist ? ' – Vorhersage stimmt.' : ' – anders als gedacht.'))) : null,
          ctx.say('Der Daumen liegt auf Senden. Was macht ihr?', { eyebrow: 'Entscheidung', small: true }),
        ], { eyebrow: 'Post ' + (i + 1) + ' · Entscheidung', badge: ctx.stufe(L, LEVELS) });
        const zuege = Object.values(ZUEGE).filter((x) => x.id !== 'eingreifen' || p.fixed);
        const z = await ctx.ask(w2, zuege.map((x) => ({ label: x.label, value: x.id, icon: x.icon, variant: x.variant, id: 'zug-' + x.id })), p.fixed ? { autoPick: () => 'eingreifen' } : undefined);
        if (z === ctx.SKIP) { wahl.push(null); continue; }
        const w3 = ctx.scr([
          h('div', { class: 'ton-decision' }, CREW.icon(ZUEGE[z].icon, 28), h('b', null, ZUEGE[z].label)),
          ctx.say('Seid ihr euch einig? Beide Finger drauf. Wenn nicht: zurück und reden.', { eyebrow: 'Zwei Finger', small: true }),
        ], { eyebrow: 'Post ' + (i + 1) + ' · Bestätigen', center: true });
        await ctx.T.twoFinger(w3, { label: 'Beide: Finger drauf = ' + ZUEGE[z].label });
        gespielt++;
        wahl.push(z);
        if (p.gut.includes(z)) bremse++;

        // 24 Stunden später
        const f = p.folge[z];
        const w4 = ctx.scr([
          h('div', { class: 'ton-later' }, CREW.icon('timer', 22), h('b', null, '24 Stunden später')),
          ctx.figureCard({ fig: p.fig ? 'yara' : 'mika', mood: f.mood, text: f.text, eyebrow: ZUEGE[z].label + ' · die Folge' }),
          p.fixed ? null : h('p', { class: 'muted small' }, p.gut.includes(z) ? 'Teilen-Bremse gezogen. Prüfen vor Senden – das war’s.' : 'Kein „falsch“. Schaut nochmal auf die drei Karten: Welche hätte euch gebremst?'),
        ], { eyebrow: 'Post ' + (i + 1) + ' · Folge', badge: ctx.stufe(L, LEVELS) });
        await ctx.next(w4, p.fixed ? 'Weiter' : i + 1 < posts.length ? 'Nächster Post' : 'Weiter');

        // Letzter Post: die Grenze – Fälschung ist Mobbing und kann strafbar sein
        if (p.fixed) {
          const w5 = ctx.scr([
            h('div', { class: 'ton-redflag' }, CREW.icon('shield', 36), h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Red Flag · klare Grenze'), h('h2', null, 'Gefälschtes Bild = Mobbing. Und es kann strafbar sein.'))),
            h('div', { class: 'grid two' },
              h('div', { class: 'card stack' }, h('b', null, 'Was hier gilt'), h('p', { class: 'muted' }, 'Ein Bild fälschen, das jemanden bloßstellt, und es weiterschicken: Das ist kein Streich. Das kann ernste Folgen haben – auch für die, die weiterleiten. Frag eine erwachsene Person.')),
              h('div', { class: 'card stack' }, h('b', null, 'Der starke Zug'), h('p', { class: 'muted' }, 'Nicht weiterleiten. Screenshot als Beweis behalten. Yara Bescheid sagen. Einer erwachsenen Person zeigen – Lehrkraft oder BEE SECURE.'))),
            h('p', { class: 'muted small' }, 'Wenn dich das gerade selbst betrifft: X-Karte oder Hilfe oben. Erfundener Post, echte Hilfe.'),
            ctx.helpCard({ title: 'Wenn so etwas bei euch passiert', text: 'Du musst das nicht allein lösen. Anonym und kostenlos:' }),
          ], { eyebrow: 'Post ' + (i + 1) + ' · Grenze', badge: ctx.stufe(3, LEVELS) });
          await ctx.next(w5, 'Verstanden');
          geholfen = await eingreifen(ctx);
        }
      }

      return {
        summary: bremse >= 3 ? 'Teilen-Bremse funktioniert: Drei Fragen, dann erst der Daumen.' : 'Drei Fragen vor dem Senden. Jeder Post, der nicht weitergeht, ist ein Gewinn.',
        stats: [[gespielt, 'Posts geprüft'], [bremse, 'mal Bremse gezogen'], [treffer, 'Vorhersagen stimmten'], [geholfen, 'von 4 Hilfe-Schritten gefunden']],
        help: true,
      };
    },
  });

  /* Level 3: Was hilft Yara wirklich? Mehrfach wählen, zwei Finger, dann Auflösung */
  async function eingreifen(ctx) {
    const sel = new Set();
    const row = h('div', { class: 'row', style: { gap: '8px' } }, ctx.rshuffle(SCHRITTE).map((x) => {
      const b = h('button', { type: 'button', class: 'chip', 'data-eingreifen': x.k }, x.t);
      b.addEventListener('click', () => { CREW.sound.play('tap'); if (sel.has(x.k)) sel.delete(x.k); else sel.add(x.k); b.classList.toggle('sel', sel.has(x.k)); });
      return b;
    }));
    const w = ctx.scr([
      ctx.say('Mika will Yara helfen. Was hilft wirklich? Wählt alles, was passt.', { eyebrow: 'Eingreifen', small: true }),
      h('div', { class: 'card stack' }, row, h('p', { class: 'muted small' }, 'Redet kurz: Was macht es besser – und was nur lauter?')),
    ], { eyebrow: 'Eingreifen', badge: ctx.stufe(3, LEVELS) });
    if (ctx.auto) SCHRITTE.filter((x) => x.ok).forEach((x) => row.querySelector('[data-eingreifen="' + x.k + '"]').click());
    if ((await ctx.T.twoFinger(w, { label: 'Beide: Finger drauf', hint: 'Erst wählen, dann zwei Finger.' })) === ctx.SKIP) return 0;
    const gut = SCHRITTE.filter((x) => x.ok && sel.has(x.k)).length;
    const w2 = ctx.scr([
      h('div', { class: 'stack' }, SCHRITTE.map((x) => h('div', { class: 'card row', style: { gap: '10px', alignItems: 'center' } },
        CREW.icon(x.ok ? 'check' : 'x', 22),
        h('span', null, h('b', null, x.t), x.ok ? (sel.has(x.k) ? ' – gewählt. Stark.' : ' – hilft auch.') : ' – ' + x.warum)))),
      h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Teilen-Bremse“')),
    ], { eyebrow: 'Eingreifen', badge: ctx.stufe(3, LEVELS) });
    CREW.sound.play(gut >= 3 ? 'great' : 'good');
    await ctx.next(w2, 'Weiter');
    return gut;
  }

  // Zwei Spalten für ein iPad in der Mitte (nebeneinander sitzen, nicht gegenüber)
  function T3Pair(left, right) {
    return h('div', { class: 'ton-pair' }, left, right);
  }
})();
