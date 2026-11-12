/* CREW – Partyspiele zum Reden und Weitergeben (ein iPad wandert): Zündschnur, Geheimauftrag, 2 Wahrheiten 1 Lüge,
   Notfall-Pitch, Sag’s mal so. Reine Spiele: ein Satz Regel, Uhr, Punkte, Crew-Rekord. Kein Lehr-Rahmen.
   Nebenbei geübt (steht nur im Lehrer-Finder): schnell antworten, abwarten, beobachten, sich einigen, vor anderen sprechen. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;
  const P = () => CREW.party;

  /* ---------- Zündschnur ---------- */
  const ZS_THEMEN = ['Etwas, das stinkt', 'Ein Tier mit vier Buchstaben', 'Etwas im Kühlschrank', 'Eine Ausrede fürs Zuspätkommen', 'Etwas, das man im Bus nicht tun sollte',
    'Ein Wort mit Ü', 'Etwas Rundes', 'Etwas, das klebt', 'Ein Promi', 'Etwas, das Eltern ständig sagen', 'Ein Essen, das rot ist', 'Eine Sportart', 'Etwas, das piept',
    'Ein Grund, liegen zu bleiben', 'Etwas in deinem Rucksack', 'Ein Land in Europa', 'Ein Spiel auf dem Handy', 'Etwas, das teurer ist als ein Handy', 'Ein Geräusch – mach es!',
    'Etwas Weiches', 'Ein Lied, das jeder kennt', 'Etwas, das man ständig verliert', 'Ein Beruf mit Uniform', 'Etwas Gelbes', 'Ein Wort auf Luxemburgisch', 'Ein Superheld',
    'Etwas zum Draufsetzen', 'Eine Eissorte', 'Etwas, das man nur im Sommer macht', 'Ein Tier, das fliegt', 'Etwas mit Rädern', 'Eine Automarke', 'Etwas, das im Bad steht',
    'Ein Name mit A', 'Etwas, das man schenkt', 'Ein Wort, das sich auf „Haus“ reimt', 'Etwas Kaltes', 'Eine Stadt', 'Etwas, das kitzelt', 'Ein Gemüse, das keiner mag',
    'Etwas, das man im Kino hört', 'Ein Grund zu lachen', 'Etwas, das immer leer ist', 'Ein Tier im Zoo', 'Etwas, das man auf Pizza legt', 'Ein Schulfach', 'Etwas, das leuchtet',
    'Etwas, das in eine Hosentasche passt', 'Ein Wort mit drei Silben', 'Etwas, das man morgens macht', 'Ein Monster – beschreib es!', 'Etwas, das laut ist', 'Ein Getränk',
    'Etwas, das man sammeln kann', 'Ein Ort zum Verstecken', 'Etwas Grünes', 'Ein Emoji – mach das Gesicht!', 'Etwas, das wächst', 'Ein Fest im Jahr', 'Etwas, das man teilt'];
  CREW.registerGame({
    id: 'zuendschnur', template: 'T5', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Sag etwas Passendes, dann schnell weitergeben. Wer das iPad beim Knall hält, hat verloren.' });
      let best = 0, alle = 0;
      for (let r = 1; r <= 3; r++) {
        const themen = ctx.rshuffle(ZS_THEMEN);
        let zahl = 0, bombe = null;
        const lunte = P().uhr(ctx, 14 + ctx.rng() * 22, { auto: 0.35, onTick: (rest) => { if (bombe) bombe.style.setProperty('--tempo', Math.max(0.16, Math.min(1, rest / 14)).toFixed(2) + 's'); } });
        const knall = lunte.promise.then(() => 'bumm');
        P().runde(r, 3);
        for (let i = 0; ; i++) {
          bombe = h('div', { class: 'p-bombe' });
          const wrap = ctx.scr([P().karte('Sag schnell', themen[i % themen.length], bombe)], { eyebrow: 'Runde ' + r, center: true, badge: P().stand(zahl + ' geschafft') });
          const a = await Promise.race([knall, ctx.ask(wrap, [{ label: 'Gesagt – weiter!', value: 'ok', iconRight: 'right', id: 'btn-weiter' }])]);
          if (a === 'bumm') break;
          if (a === 'ok') { zahl++; CREW.sound.play('tick'); }
        }
        lunte.stop();
        CREW.sound.play('boom'); P().stempel('BUMM!', 'schlecht'); P().wackeln();
        best = Math.max(best, zahl); alle += zahl;
        const w2 = ctx.scr([P().karte('Wer hält das iPad?', 'Brandfleck für dich!', h('p', { class: 'p-mittel' }, zahl + ' Antworten vor dem Knall'))], { eyebrow: 'Runde ' + r, center: true, noPass: true });
        await ctx.next(w2, r < 3 ? 'Nächste Runde' : 'Fertig');
      }
      return P().ergebnis(best, 'Antworten vor dem Knall', { stats: [[best, 'Antworten in der besten Runde'], [alle, 'Antworten insgesamt']] });
    },
  });

  /* ---------- Geheimauftrag ---------- */
  const GA_AUFTRAEGE = ['Fass dir ans Ohr, wenn jemand lacht.', 'Sag dreimal „genau“.', 'Gähne zweimal – richtig groß.', 'Stell zwei Fragen mit „Warum“.', 'Wiederhole das letzte Wort von jemandem.',
    'Trommle heimlich mit den Fingern.', 'Sag einmal „Pizza“ – egal wie.', 'Schau zweimal lange an die Decke.', 'Kratz dich am Kopf, wenn jemand redet.', 'Sag „Moment mal“ – und dann nichts.',
    'Nicke sehr lange, während jemand redet.', 'Verschränke dreimal die Arme.', 'Sag mitten im Satz ein Tier.', 'Flüstere einen ganzen Satz.', 'Lach einmal über gar nichts.',
    'Zieh einen Schuh halb aus.', 'Sag „früher war alles besser“.', 'Zeig auf etwas, das nicht da ist.', 'Sprich einen Satz in Zeitlupe.', 'Summe kurz ein Lied.',
    'Sag zweimal „ehrlich gesagt“.', 'Steh einmal kurz auf und setz dich wieder.', 'Halte dir zweimal die Nase zu.', 'Beginne zwei Sätze mit „Also ich“.'];
  const GA_THEMEN = ['Plant die perfekte Klassenfahrt.', 'Welches Tier wäre der beste Lehrer?', 'Erfindet ein neues Schulfach.', 'Was kommt auf die perfekte Pizza?', 'Plant eine Party mit 10 Euro.',
    'Welche Superkraft ist die nutzloseste?', 'Erfindet einen neuen Feiertag.', 'Was nehmt ihr auf eine einsame Insel mit?', 'Erfindet eine neue Sportart.', 'Was wäre das schlimmste Schulessen?'];
  CREW.registerGame({
    id: 'geheimauftrag', template: 'T5', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Jede Person bekommt einen geheimen Auftrag. Zwei Minuten reden. Danach rät die Crew, wer was hatte.' });
      const n = await P().anzahl(ctx, 3, 8);
      const pool = ctx.rshuffle(GA_AUFTRAEGE);
      for (let i = 0; i < n; i++) {
        const r = await P().geheim(ctx, 'Person ' + (i + 1) + ' schaut allein', P().karte('Dein Geheimauftrag', pool[i], h('p', { class: 'muted' }, 'Mach es mindestens zweimal. Unauffällig.'), { mittel: true }));
        if (r === ctx.SKIP) continue;
        await ctx.T.passOn({ text: i < n - 1 ? 'Gib das iPad weiter. Die nächste Person schaut allein.' : 'Leg das iPad in die Mitte.' });
      }
      const w = ctx.scr([P().karte('Redet 2 Minuten', ctx.rpick(GA_THEMEN), h('p', { class: 'muted' }, 'Alle erledigen dabei ihren Auftrag. Wer wird erwischt?'), { mittel: true })], { eyebrow: 'Los', center: true });
      await P().zeitOderKnopf(ctx, w, 120, [{ label: 'Fertig', value: 'ok', id: 'btn-fertig' }], { auto: 0.3 });
      let erraten = 0;
      for (let i = 0; i < n; i++) {
        const optionen = ctx.rshuffle([pool[i], pool[n + (i * 3) % (pool.length - n)], pool[n + (i * 3 + 1) % (pool.length - n)], pool[n + (i * 3 + 2) % (pool.length - n)]]);
        const w2 = ctx.scr([P().karte('Person ' + (i + 1) + ' sagt nichts', 'Was war der Auftrag?', null, { mittel: true })], { eyebrow: 'Raten ' + (i + 1) + ' / ' + n, center: true, badge: P().stand(erraten + ' erraten') });
        const k = await P().liste(ctx, w2, optionen);
        const richtig = k !== ctx.SKIP && optionen[k] === pool[i];
        if (richtig) erraten++;
        P().stempel(richtig ? 'ERWISCHT!' : 'UNENTDECKT!', richtig ? 'gut' : 'neutral');
        const w3 = ctx.scr([P().karte('Der Auftrag von Person ' + (i + 1), pool[i], null, { mittel: true })], { eyebrow: 'Auflösung', center: true, noPass: true });
        await ctx.next(w3, i < n - 1 ? 'Weiter' : 'Fertig');
      }
      return P().ergebnis(erraten, 'von ' + n + ' Aufträgen erraten');
    },
  });

  /* ---------- 2 Wahrheiten, 1 Lüge ---------- */
  const ZW_THEMEN = ['Essen', 'Tiere', 'Das kann ich', 'Da war ich schon', 'Handy & Zocken', 'Als ich klein war', 'Mein Zimmer', 'Sport', 'Ferien', 'Musik', 'Das hab ich mal gegessen', 'Mein Rekord', 'Auf dem Schulweg', 'Das hab ich gebaut'];
  CREW.registerGame({
    id: 'zwei-wahrheiten', template: 'T5', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Erzähl zwei wahre Sachen und eine Lüge. Die anderen raten, was gelogen ist.' });
      const n = await P().anzahl(ctx, 3, 8);
      const themen = ctx.rshuffle(ZW_THEMEN);
      let summe = 0;
      for (let i = 0; i < n; i++) {
        const r = await P().geheim(ctx, 'Person ' + (i + 1) + ' schaut allein', P().karte('Dein Thema', themen[i % themen.length], h('p', { class: 'muted' }, 'Denk dir 2 wahre Sachen und 1 Lüge aus. Harmlos reicht.')), { label: 'Ich hab drei Sachen' });
        if (r === ctx.SKIP) continue;
        const w = ctx.scr([P().karte('Person ' + (i + 1) + ' erzählt', 'Welche war die Lüge?', h('p', { class: 'p-mittel' }, 'Alle zeigen gleichzeitig: 1, 2 oder 3 Finger.'), { mittel: true })], { eyebrow: 'Runde ' + (i + 1) + ' / ' + n, center: true, badge: P().stand(summe + ' reingelegt') });
        const opts = [];
        for (let k = 0; k < n; k++) opts.push({ label: String(k), value: k, id: 'zw-' + k });
        wrap_hinweis(w, 'Wie viele sind reingefallen?');
        const a = await ctx.ask(w, opts);
        if (a !== ctx.SKIP) { summe += a; if (a === n - 1 && n > 2) P().stempel('ALLE REINGELEGT!', 'gut'); else if (a === 0) P().stempel('DURCHSCHAUT!', 'neutral'); }
        if (i < n - 1) await ctx.T.passOn({ text: 'Gib das iPad weiter.' });
      }
      return P().ergebnis(summe, 'mal reingelegt');
    },
  });
  function wrap_hinweis(wrap, text) { wrap.appendChild(h('p', { class: 'p-mittel', style: { marginTop: '8px' } }, text)); }

  /* ---------- Notfall-Pitch ---------- */
  const NP_NOTFALL = ['Ein Lama blockiert den Schulflur.', 'Der Bus fährt ohne Fahrer los.', 'Im Klassenzimmer regnet es.', 'Alle Handys der Schule sind weg.', 'Der Direktor steckt im Getränkeautomaten fest.',
    'Die Mensa hat nur noch Rosenkohl.', 'Tauben haben die Turnhalle besetzt.', 'Das WLAN ist für immer aus.', 'Der Schulhof ist voller Schaum.', 'Ein Pinguin sitzt auf deinem Platz.',
    'Alle Stühle kleben am Boden.', 'Die Pausenglocke hört nicht mehr auf.', 'Der Hausmeister spricht nur noch rückwärts.', 'In der Schule ist Schwerelosigkeit.', 'Die Tafel ist plötzlich aus Schokolade.'];
  const NP_DING = ['eine Gabel', 'drei Luftballons', 'ein Skateboard', 'eine Rolle Klebeband', 'ein Megafon', 'eine Banane', 'einen Regenschirm', 'eine Taucherbrille', 'einen Eimer Farbe', 'einen Laubbläser',
    'eine Discokugel', 'einen Einkaufswagen', 'eine Angel', 'ein Trampolin', 'eine Tüte Chips', 'einen Feuerlöscher voll Glitzer', 'zwanzig Meter Seil', 'einen sehr lauten Wecker'];
  CREW.registerGame({
    id: 'notfall-pitch', template: 'T5', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Ein verrückter Notfall, ein Gegenstand, 20 Sekunden: Erklär, wie du alle rettest.' });
      const n = await P().anzahl(ctx, 2, 8);
      const nf = ctx.rshuffle(NP_NOTFALL), dg = ctx.rshuffle(NP_DING);
      let gerettet = 0;
      for (let i = 0; i < n; i++) {
        const w = ctx.scr([P().karte('Notfall für Person ' + (i + 1), nf[i % nf.length], h('p', { class: 'p-mittel' }, 'Du hast: ', h('b', null, dg[i % dg.length]), '. Rette die Lage!'), { mittel: true })], { eyebrow: 'Pitch ' + (i + 1) + ' / ' + n, center: true, badge: P().stand(gerettet + ' gerettet') });
        const a = await P().zeitOderKnopf(ctx, w, 20, [{ label: 'Fertig erklärt', value: 'ok', id: 'btn-fertig' }], { auto: 0.3 });
        if (a === ctx.SKIP) { continue; }
        CREW.sound.play('go');
        const w2 = ctx.scr([P().karte('Crew entscheidet', 'Daumen hoch oder runter?', h('p', { class: 'muted' }, 'Alle gleichzeitig. Die Mehrheit zählt.'))], { eyebrow: 'Pitch ' + (i + 1) + ' / ' + n, center: true });
        const v = await ctx.ask(w2, [{ label: 'Gerettet!', value: 1, icon: 'check', id: 'btn-gerettet' }, { label: 'Nicht gerettet', value: 0, variant: 'ghost', id: 'btn-nicht' }]);
        if (v === 1) { gerettet++; P().stempel('GERETTET!', 'gut'); } else if (v === 0) P().stempel('OH NEIN!', 'schlecht');
        if (i < n - 1) await ctx.T.passOn({ text: 'Gib das iPad weiter. Der nächste Notfall wartet.' });
      }
      return P().ergebnis(gerettet, 'von ' + n + ' Notfällen gerettet');
    },
  });

  /* ---------- Sag’s mal so ---------- */
  const SM_SAETZE = ['Ich hätte gern ein Brötchen.', 'Der Bus kommt in fünf Minuten.', 'Morgen ist Dienstag.', 'Ich hab meinen Schlüssel gefunden.', 'Das ist mein Stift.', 'Es gibt heute Nudeln.',
    'Die Tür ist offen.', 'Ich muss kurz telefonieren.', 'Da drüben ist eine Katze.', 'Wir haben noch Milch.', 'Mein Akku ist bei zwölf Prozent.', 'Der Müll muss raus.'];
  const SM_ARTEN = ['wie ein Nachrichtensprecher', 'total verliebt', 'als wärst du drei Tage wach', 'wie ein Fußball-Kommentator', 'als hättest du Angst vor dem Satz', 'wie ein Roboter',
    'als wäre es ein Geheimnis', 'stinksauer', 'wie in einem Horrorfilm', 'als wärst du 90 Jahre alt', 'wie ein Rapper', 'als hättest du gerade gewonnen', 'gelangweilt wie nie',
    'wie eine Durchsage am Bahnhof', 'als müsstest du gleich lachen', 'wie ein Bösewicht im Film'];
  CREW.registerGame({
    id: 'sags-mal-so', template: 'T5', themen: ['party'],
    async run(ctx) {
      await ctx.T.intro({ rule: 'Sag einen ganz normalen Satz – auf eine geheime Art. Die Crew rät, welche.' });
      const RUNDEN = 6;
      const saetze = ctx.rshuffle(SM_SAETZE), arten = ctx.rshuffle(SM_ARTEN);
      let treffer = 0;
      for (let i = 0; i < RUNDEN; i++) {
        const art = arten[i];
        const r = await P().geheim(ctx, 'Wer spricht, schaut allein', P().karte('Sag diesen Satz', '„' + saetze[i % saetze.length] + '“', h('p', { class: 'p-mittel' }, 'Und zwar: ', h('b', null, art)), { mittel: true }), { label: 'Gesagt – iPad zur Crew' });
        if (r === ctx.SKIP) continue;
        const optionen = ctx.rshuffle([art, arten[(i + 6) % arten.length], arten[(i + 9) % arten.length], arten[(i + 12) % arten.length]]);
        const w = ctx.scr([P().karte('Crew rät', 'Wie war das gesagt?', null, { mittel: true })], { eyebrow: 'Runde ' + (i + 1) + ' / ' + RUNDEN, center: true, badge: P().stand(treffer + ' erraten') });
        const k = await P().liste(ctx, w, optionen);
        const richtig = k !== ctx.SKIP && optionen[k] === art;
        if (richtig) treffer++;
        P().stempel(richtig ? 'RICHTIG!' : 'DANEBEN', richtig ? 'gut' : 'schlecht');
        const w2 = ctx.scr([P().karte('Es war', art, null, { mittel: true })], { eyebrow: 'Auflösung', center: true, noPass: true });
        await ctx.next(w2, i < RUNDEN - 1 ? 'Nächste Person' : 'Fertig');
      }
      return P().ergebnis(treffer, 'von ' + RUNDEN + ' erraten');
    },
  });
})();
