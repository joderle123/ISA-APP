/* Spiel „Teilen oder nicht?“ (Thema: Digital, Gesundheit & Abschluss) · Vorlage T3 Zu zweit an einem iPad · j1-e28
   Kein weiteres Real-or-Fake: Ein aufregender Post, der Daumen liegt auf Senden. Das Paar kippt die drei Prüffragen
   gemeinsam (Wer sagt das? Gibt’s das woanders? Will mich der Post wütend machen?) – jede Karte dreht sich und zeigt,
   was man bei diesem Post sieht. Dann entscheiden beide mit zwei Fingern: Teilen / Nachfragen / Löschen – und sehen
   die Folge nach 24 Stunden. Post 3 ist immer das gefälschte Bild einer Mitschülerin, aus der Klasse geschickt:
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
  };

  /* Posts: acc = Absender, bg = Bild-Stil, text = Post, hint[frage] = {text, ampel: gruen|gelb|rot},
     folge[zug] = { text, mood }. gut = Züge, die zur Teilen-Bremse passen. */
  const POSTS = [
    {
      id: 'sturm', acc: 'news_lux_blitz', seit: 'seit 2 Wochen · 31 Follower', bg: 'sturm', bild: 'Bild: dunkler Himmel über einem Schulhof', likes: '2.4k',
      text: 'SCHULE MORGEN GESCHLOSSEN!!! Sturmwarnung für ganz Luxemburg. TEILEN, damit es alle wissen!!',
      hint: { wer: { text: 'Unbekannter Account, zwei Wochen alt, kein Name, kein Impressum.', ampel: 'rot' }, wo: { text: 'Auf der Schul-Website steht nichts. RTL meldet nur Wind. Sonst nirgends.', ampel: 'rot' }, wut: { text: 'Großbuchstaben, drei Ausrufezeichen, „TEILEN!!“ – der Post will Aufregung.', ampel: 'rot' } },
      folge: { teilen: { text: 'Die halbe Klasse bleibt zu Hause. Die Schule war offen. Fehlstunden für alle, die dir geglaubt haben.', mood: 'traurig' }, nachfragen: { text: 'Du schreibst dem Sekretariat. Antwort: „Schule ist offen.“ Du warst die erste Person, die nachgefragt hat.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Am nächsten Tag ist die Schule offen. Nichts passiert – das ist das Beste, was passieren konnte.', mood: 'froh' } },
      gut: ['nachfragen', 'loeschen'],
    },
    {
      id: 'besuch', acc: 'lycee_junglinster_official', seit: 'seit 4 Jahren · bestätigt', bg: 'schule', bild: 'Bild: Sporthalle, Schul-Logo', likes: '318',
      text: 'Nächsten Freitag besucht ein Spieler der Nationalmannschaft unsere Schule. Treffpunkt 10 Uhr, Sporthalle.',
      hint: { wer: { text: 'Offizieller Schul-Account, bestätigt, seit vier Jahren aktiv.', ampel: 'gruen' }, wo: { text: 'Steht auch auf der Schul-Website und im Elternbrief.', ampel: 'gruen' }, wut: { text: 'Nein. Sachlich: Datum, Uhrzeit, Ort. Kein Druck.', ampel: 'gruen' } },
      folge: { teilen: { text: 'Alle wissen Bescheid, Freitag ist die Halle voll. Stimmte – weil du vorher geschaut hast, wer das sagt.', mood: 'froh' }, nachfragen: { text: 'Das Sekretariat bestätigt. Etwas langsam, aber sicher. Auch gut.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Du hast nichts falsch gemacht – nur eine echte Info nicht weitergegeben. Kein Drama.', mood: 'neutral' } },
      gut: ['teilen', 'nachfragen'],
    },
    {
      id: 'airpods', acc: 'giveaway_lux_official', seit: 'seit 3 Tagen · 0 Beiträge', bg: 'gift', bild: 'Bild: weiße Kopfhörer, Geschenkband', likes: '9.1k',
      text: 'GRATIS AirPods für die ERSTEN 100, die auf den Link klicken und den Post teilen! Nur heute! 🎧🔥',
      hint: { wer: { text: 'Account ist drei Tage alt, null Beiträge, „official“ im Namen – das macht jeder.', ampel: 'rot' }, wo: { text: 'Der Link führt auf eine Seite, die nach Handynummer und Passwort fragt. Apple verschenkt nichts so.', ampel: 'rot' }, wut: { text: 'Nicht wütend, aber hastig: „ERSTE 100“, „nur heute“. Zeitdruck ist ein Trick.', ampel: 'rot' } },
      folge: { teilen: { text: '14 Leute aus deiner Liste klicken den Link. Zwei geben ihre Nummer ein. Ab morgen bekommen sie Spam-Anrufe.', mood: 'traurig' }, nachfragen: { text: 'Du fragst: „Wer hat schon welche bekommen?“ Niemand. Der Account ist am nächsten Tag weg.', mood: 'neutral' }, loeschen: { text: 'Gelöscht. Keine AirPods – die gab es sowieso nie. Deine Nummer bleibt deine.', mood: 'froh' } },
      gut: ['loeschen', 'nachfragen'],
    },
    {
      id: 'energy', acc: 'wahrheit_jetzt', seit: 'seit 1 Jahr · 12k Follower', bg: 'energy', bild: 'Bild: schwarze Dose, Blitz-Logo', likes: '5.7k',
      text: 'Energy-Drinks machen Jugendliche in Luxemburg KRANK: 300 Fälle in einem Monat – und niemand sagt es euch!',
      hint: { wer: { text: 'Account ohne Namen, ohne Quelle. 12.000 Follower sagen nichts über die Wahrheit.', ampel: 'gelb' }, wo: { text: 'Die Zahl 300 steht nirgends. Es gibt echte Warnungen zu Energy-Drinks – aber mit anderen Zahlen.', ampel: 'gelb' }, wut: { text: '„Niemand sagt es euch“ – der Post will, dass du dich betrogen fühlst. Das ist der Haken.', ampel: 'rot' } },
      folge: { teilen: { text: 'Deine Mitschülerin Nora liest „300 Fälle“ und bekommt Panik wegen eines Drinks. Die Zahl war erfunden.', mood: 'traurig' }, nachfragen: { text: 'Du suchst die Zahl. Es gibt sie nicht. Die echte Info findest du beim Gesundheitsministerium – ohne Panik.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Energy-Drinks sind trotzdem kein Wasser – aber ein Teil Wahrheit macht den Post nicht wahr.', mood: 'neutral' } },
      gut: ['nachfragen', 'loeschen'],
    },
    {
      id: 'hai', acc: 'lux_viral', seit: 'Memes & Fun · 40k Follower', bg: 'hai', bild: 'Bild: Flosse im Fluss, Brücke im Hintergrund', likes: '21k',
      text: 'HAI in der Alzette gesichtet!!! Bei Mersch. Foto von heute Morgen 😱🦈',
      hint: { wer: { text: 'Meme-Account. Steht sogar in der Bio: „Memes & Fun“.', ampel: 'gelb' }, wo: { text: 'Keine Zeitung, kein Radio. Auf dem Bild spiegelt sich der Hai falsch im Wasser – typisch KI.', ampel: 'rot' }, wut: { text: 'Will Aufregung, nicht Wut. Drei Ausrufezeichen und ein 😱.', ampel: 'gelb' } },
      folge: { teilen: { text: 'Deine kleine Cousine traut sich eine Woche nicht an den Fluss. Es war ein KI-Bild.', mood: 'neutral' }, nachfragen: { text: 'Du fragst im Chat: „Echt?“ Luca findet in 20 Sekunden das Original: ein Aquarium in Spanien.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Es gibt keinen Hai in der Alzette. Es gab nie einen.', mood: 'froh' } },
      gut: ['nachfragen', 'loeschen'],
    },
    {
      id: 'lehrer', acc: 'luca', fig: true, seit: 'aus deiner Klasse', bg: 'flur', bild: 'Bild: leerer Schulflur', likes: '6',
      text: 'Hab gehört, Herr Schmit wird gefeuert, weil er eine Schülerin angeschrien hat. Wusstet ihr das??',
      hint: { wer: { text: 'Luca aus der Klasse – kein Fake-Account. Aber: „Hab gehört.“ Von wem?', ampel: 'gelb' }, wo: { text: 'Niemand sonst weiß davon. Keine Mail der Schule, nichts.', ampel: 'rot' }, wut: { text: 'Ein Gerücht über eine echte Person. Es will, dass du es weitererzählst.', ampel: 'rot' } },
      folge: { teilen: { text: 'Am Montag spricht die ganze Stufe darüber. Herr Schmit wurde nicht gefeuert – er war krank. Jetzt weiß er, was über ihn geredet wurde.', mood: 'traurig' }, nachfragen: { text: 'Du fragst Luca: „Von wem?“ Luca: „Von Sam. Der hat’s von jemandem.“ Mehr ist nicht dran. Das Gerücht endet bei dir.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Ein Gerücht über einen echten Menschen geht nicht weiter. Stark.', mood: 'froh' } },
      gut: ['nachfragen', 'loeschen'],
    },
    {
      id: 'fest', acc: 'elternverein_junglinster', seit: 'seit 6 Jahren · bestätigt', bg: 'fest', bild: 'Bild: Waffelstand, Girlanden', likes: '142',
      text: 'Schulfest am 14. Juni ab 15 Uhr. Wir suchen noch Helferinnen und Helfer für den Waffelstand. Meldet euch im Sekretariat!',
      hint: { wer: { text: 'Elternverein, bestätigt, seit sechs Jahren. Man kann anrufen und nachfragen.', ampel: 'gruen' }, wo: { text: 'Steht am Schwarzen Brett und auf der Schul-Website.', ampel: 'gruen' }, wut: { text: 'Nein. Eine Einladung. Kein Druck, keine Angst.', ampel: 'gruen' } },
      folge: { teilen: { text: 'Drei Leute aus deinem Chat melden sich für den Waffelstand. Echte Info, echte Waffeln.', mood: 'froh' }, nachfragen: { text: 'Das Sekretariat bestätigt. Du hast einen Tag verloren – und nichts riskiert.', mood: 'froh' }, loeschen: { text: 'Gelöscht. Nichts kaputt. Nur: Diesen Post hättest du teilen können.', mood: 'neutral' } },
      gut: ['teilen', 'nachfragen'],
    },
  ];
  // Post 3 – immer: gefälschtes Bild einer Mitschülerin, aus der Klasse geschickt
  const POST_FAKE = {
    id: 'fake-bild', acc: 'sam', fig: true, seit: 'aus deiner Klasse · privat an dich', bg: 'party', bild: 'Bild wird nicht gezeigt', likes: '🙈 nur du', fixed: true,
    text: 'omg schau dir Nora an 😂😂 (Bild: Nora auf einer Party, betrunken, mit Jungs) – schick weiter, die Gruppe muss das sehen',
    hint: { wer: { text: 'Sam aus der Klasse. Aber Nora war Samstag beim Handball-Turnier – das weißt du.', ampel: 'rot' }, wo: { text: 'Das Bild gibt es nirgends sonst. Schau genau: sechs Finger an einer Hand, die Schrift im Hintergrund ist Brei. KI-Fälschung.', ampel: 'rot' }, wut: { text: 'Es will, dass du lachst – über eine echte Mitschülerin. Das ist der Haken: Lachen fühlt sich nicht wie Mobbing an. Ist es aber.', ampel: 'rot' } },
    folge: { teilen: { text: 'Nora sieht das Bild am nächsten Tag. Sie kommt drei Tage nicht zur Schule. In der Weiterleitungs-Liste steht auch dein Name.', mood: 'traurig' }, nachfragen: { text: 'Du fragst Sam: „Ist das echt?“ Sam: „Nein lol, KI. Ist nur Spaß.“ Für Nora ist es kein Spaß. Und das Bild ist noch bei Sam.', mood: 'neutral' }, loeschen: { text: 'Gelöscht bei dir. Bei Sam ist es noch. Und Nora weiß von nichts. Löschen allein reicht hier nicht.', mood: 'neutral' } },
    gut: [],
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
        steps: [
          { icon: 'users', title: 'Zu zweit', text: 'Ein iPad in der Mitte. Abwechselnd eine Karte kippen.' },
          { icon: 'eye', title: 'Drei Fragen', text: 'Wer sagt das? Gibt’s das woanders? Will mich der Post wütend machen?' },
          { icon: 'timer', title: '24 Stunden später', text: 'Ihr seht, was aus eurer Entscheidung wird.' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'),
            ctx.say('Probe: Kippt eine Karte. Einfach antippen.', { eyebrow: 'Zum Ausprobieren', small: true }),
            checkCards(ctx, { hint: { wer: { text: 'So sieht die Rückseite aus.', ampel: 'gruen' }, wo: { text: 'Hier steht, was man bei dem Post sieht.', ampel: 'gelb' }, wut: { text: 'Grün, Gelb oder Rot – wie eine Ampel.', ampel: 'rot' } } }, () => {})], { eyebrow: 'Probe' });
          await ctx.next(w, 'Verstanden');
        },
      });

      // Reihenfolge: zwei Posts aus dem Pool, dann IMMER das gefälschte Bild als Post 3, dann noch einer
      const pool = ctx.rshuffle(POSTS);
      const posts = [pool[0], pool[1], POST_FAKE, pool[2]];
      let bremse = 0, gespielt = 0;
      const wahl = [];
      for (let i = 0; i < posts.length; i++) {
        const p = posts[i];
        const flipped = new Set();
        const card = postCard(ctx, p, i + 1, posts.length);
        const checks = checkCards(ctx, p, (id) => { flipped.add(id); if (flipped.size === FRAGEN.length) { btnSlot.classList.add('ready'); decide.disabled = false; CREW.sound.play('unlock'); } });
        // „Entscheiden“ geht erst, wenn alle drei Karten gekippt sind
        let decide;
        const decided = new Promise((res) => { decide = CREW.ui.btn('Entscheiden', () => res(true), { iconRight: 'right', id: 'btn-decide', disabled: true }); });
        const btnSlot = h('div', { class: 'ton-ready row between' }, h('span', { class: 'muted small ton-ready-hint' }, 'Erst alle drei Karten kippen.'), decide);
        const w1 = ctx.scr([
          T3Pair(card, h('div', { class: 'stack' }, ctx.say('Kippt abwechselnd die drei Prüffragen. Dann redet: Senden oder nicht?', { eyebrow: 'Teilen-Bremse', small: true }), checks, btnSlot)),
        ], { eyebrow: 'Post ' + (i + 1) });
        if (ctx.auto) setTimeout(() => { checks.querySelectorAll('.ton-check').forEach((c) => c.click()); decide.click(); }, 40);
        const r = await ctx.waitFor(decided);
        if (r === ctx.SKIP) { wahl.push(null); continue; }

        // Entscheidung: Teilen / Nachfragen / Löschen, dann beide Finger drauf
        const w2 = ctx.scr([
          postCard(ctx, p, i + 1, posts.length),
          ctx.say('Der Daumen liegt auf Senden. Was macht ihr?', { eyebrow: 'Entscheidung', small: true }),
        ], { eyebrow: 'Post ' + (i + 1) + ' · Entscheidung' });
        const z = await ctx.ask(w2, Object.values(ZUEGE).map((x) => ({ label: x.label, value: x.id, icon: x.icon, variant: x.variant, id: 'zug-' + x.id })));
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
        ], { eyebrow: 'Post ' + (i + 1) + ' · Folge' });
        await ctx.next(w4, p.fixed ? 'Weiter' : i + 1 < posts.length ? 'Nächster Post' : 'Fertig');

        // Post 3: die Grenze – Fälschung ist Mobbing und kann strafbar sein
        if (p.fixed) {
          const w5 = ctx.scr([
            h('div', { class: 'ton-redflag' }, CREW.icon('shield', 36), h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Red Flag · klare Grenze'), h('h2', null, 'Gefälschtes Bild = Mobbing. Und es kann strafbar sein.'))),
            h('div', { class: 'grid two' },
              h('div', { class: 'card stack' }, h('b', null, 'Was hier gilt'), h('p', { class: 'muted' }, 'Ein Bild fälschen, das jemanden bloßstellt, und es weiterschicken: Das ist kein Streich. In Luxemburg kann das eine Straftat sein – auch für die, die nur weiterleiten.')),
              h('div', { class: 'card stack' }, h('b', null, 'Der starke Zug'), h('p', { class: 'muted' }, 'Nicht weiterleiten. Screenshot als Beweis behalten. Nora Bescheid sagen. Einer erwachsenen Person zeigen – Lehrkraft oder BEE SECURE.'))),
            ctx.helpCard({ title: 'Wenn so etwas bei euch passiert', text: 'Du musst das nicht allein lösen. Anonym und kostenlos:' }),
          ], { eyebrow: 'Post 3 · Grenze' });
          await ctx.next(w5, 'Verstanden');
        }
      }

      return {
        summary: bremse >= 3 ? 'Teilen-Bremse funktioniert: Drei Fragen, dann erst der Daumen.' : 'Drei Fragen vor dem Senden. Jeder Post, der nicht weitergeht, ist ein Gewinn.',
        stats: [[gespielt, 'Posts geprüft'], [bremse, 'mal Bremse gezogen']],
        help: true,
      };
    },
  });

  // Zwei Spalten für ein iPad in der Mitte (nebeneinander sitzen, nicht gegenüber)
  function T3Pair(left, right) {
    return h('div', { class: 'ton-pair' }, left, right);
  }
})();
