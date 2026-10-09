/* Spiel „100 Prozent“ (Thema: Konflikt, Druck & Mobbing) · Vorlage T2 Rollen-Puzzle · j1-e26, j1-e24
   Etwas ist schiefgelaufen (Gruppenarbeit ohne Teil 3, Screenshot bei der Lehrkraft, Fenster kaputt). Jedes
   Rollen-iPad zeigt, was EINE der vier Figuren getan und gedacht hat – plus ein Detail, das nur diese Rolle kennt
   und erst sagt, wenn jemand fragt. Der Beamer (Lehrer-iPad) nimmt erst Antworten an, wenn alle vier erzählt haben.
   Dann verteilt die Crew 100 % Verantwortung mit Reglern – niemand 0, niemand 100. Beim Aufdecken zeigt sich:
   Jede Figur rechnet sich selbst klein, zusammen fehlt ein großer Rest. Danach wählt die Crew pro Figur einen
   Wiedergutmach-Zug (passt / zu klein / zu groß). Kein „Wer war’s?“, sondern „Wie viel war’s?“.
   Ohne Rollen-iPads: „Am Lehrer-iPad zeigen“ – jede Rolle schaut nacheinander allein.
   In drei Level: 1) Hören (jede Rolle erzählt, Details erfragen), 2) Verteilen (100 %, dann Selbstsicht aufdecken),
   3) Wiedergutmachen (pro Figur der Zug, der zum eigenen Anteil passt). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h, clear } = CREW.util;

  const MIN = 5, STEP = 5;
  const ROLLEN = ['A', 'B', 'C', 'D'];

  /* Fälle: rollen A–D = vier Figuren (getan, gedacht, detail = nur diese Rolle kennt es, selbst = so viel % gibt
     sich die Figur selbst). zuege: passt (zum eigenen Anteil) / klein (Ausrede) / gross (übernimmt alles oder
     bestraft sich). Die Selbstsicht ergibt zusammen deutlich unter 100 %. */
  const FAELLE = [
    {
      id: 'gruppe', titel: 'Teil 3 fehlt', icon: 'users',
      was: 'Die Präsentation wurde ohne Teil 3 abgegeben. Die ganze Gruppe bekommt eine 4.',
      rollen: {
        A: { fig: 'mika', getan: 'Mika hat die Gruppe geleitet und am Montag die Teile verteilt – in einer Chat-Nachricht zwischen vielen Memes.', gedacht: 'Ich hab’s doch klar geschrieben. Wer nicht liest, ist selbst schuld.', detail: 'Mika hat am Donnerstag gemerkt, dass Teil 3 fehlt – und nichts gesagt, um keinen Stress zu machen.', selbst: 10,
          zuege: { passt: 'Mika fragt die Lehrkraft, ob die Gruppe Teil 3 nachreichen darf, und verteilt Aufgaben ab jetzt mit Namen und Rückfrage.', klein: 'Mika schreibt: „Nächstes Mal lest halt den Chat.“', gross: 'Mika macht Teil 3 heute Nacht ganz allein und sagt niemandem etwas.' } },
        B: { fig: 'yara', getan: 'Yara sollte Teil 3 machen. Yara hat die Nachricht nie gesehen – der Gruppenchat war stumm geschaltet.', gedacht: 'Woher soll ich das wissen? Mir hat das keiner direkt gesagt.', detail: 'Yara hat am Freitag früh gesehen, dass alle anderen ihre Teile hochgeladen hatten – und gedacht: passt schon.', selbst: 15,
          zuege: { passt: 'Yara macht Teil 3 bis morgen und stellt den Gruppenchat für Projekte auf laut.', klein: 'Yara sagt: „Hat mir ja keiner gesagt.“', gross: 'Yara steigt aus der Gruppe aus, damit die anderen eine bessere Note bekommen.' } },
        C: { fig: 'luca', getan: 'Luca hat die Folien zusammengefügt und abgegeben – ohne sie einmal durchzuklicken.', gedacht: 'Ich hab nur hochgeladen. Ich bin doch nicht der Kontrolleur.', detail: 'Luca hat gesehen, dass die Folien nur bis 8 gingen statt bis 12 – und gedacht: kurz und knackig.', selbst: 5,
          zuege: { passt: 'Luca hilft Yara, Teil 3 einzufügen, und klickt vor jeder Abgabe alle Folien einmal durch.', klein: 'Luca sagt: „Ich hab nur hochgeladen.“', gross: 'Luca übernimmt ab jetzt jede Abgabe für die ganze Klasse.' } },
        D: { fig: 'sam', getan: 'Sam hat den eigenen Teil fertig gemacht und Yara gefragt: „Alles klar bei dir?“ Yara hat mit 👍 geantwortet.', gedacht: 'Ich hab ja nachgefragt. Mehr geht nicht.', detail: 'Sam wusste, dass Yara den Gruppenchat stumm hat – und hat trotzdem nur dort geschrieben.', selbst: 5,
          zuege: { passt: 'Sam fragt nächstes Mal direkt nach, was fertig ist – statt sich mit einem 👍 zufriedenzugeben.', klein: 'Sam sagt: „Mein Teil war fertig. Rest ist nicht mein Problem.“', gross: 'Sam bietet an, die 4 allein auf die eigene Kappe zu nehmen.' } },
      },
    },
    {
      id: 'screenshot', titel: 'Der Screenshot', icon: 'phone',
      was: 'Ein Screenshot aus einem privaten Chat zu viert ist bei der Mathe-Lehrkraft gelandet. Darauf: ein fieser Witz über sie und ein Meme mit ihrem Gesicht.',
      rollen: {
        A: { fig: 'luca', getan: 'Luca hat im Chat zu viert den fiesen Witz über die Mathe-Lehrkraft geschrieben.', gedacht: 'War ein Witz unter Freunden. Privat ist privat.', detail: 'Luca hat den Witz geschrieben, kurz nachdem die Lehrkraft Luca vor der Klasse ermahnt hatte – Luca war richtig sauer.', selbst: 30,
          zuege: { passt: 'Luca entschuldigt sich bei der Lehrkraft persönlich und sagt ehrlich, was Luca geärgert hat – ohne Witz.', klein: 'Luca sagt: „War doch privat.“', gross: 'Luca behauptet, alles allein gemacht zu haben, damit die anderen raus sind.' } },
        B: { fig: 'mika', getan: 'Mika hat 😂 drunter gesetzt und noch einen draufgelegt: ein Meme mit dem Gesicht der Lehrkraft.', gedacht: 'Ich hab nur mitgemacht. Angefangen hat Luca.', detail: 'Das Meme hat Mika selbst gebastelt – mit einem Foto von der Schul-Website.', selbst: 10,
          zuege: { passt: 'Mika löscht das Meme überall und sagt der Lehrkraft, dass das Meme von Mika war.', klein: 'Mika sagt: „Ich hab ja nur ein Emoji gemacht.“', gross: 'Mika verlässt alle Gruppenchats für immer.' } },
        C: { fig: 'sam', getan: 'Sam hat einen Screenshot gemacht und ihn dem eigenen Cousin geschickt, „weil der das lustig findet“.', gedacht: 'Mein Cousin kennt die doch gar nicht. Was soll da passieren?', detail: 'Sams Cousin geht in die Parallelklasse – und hat den Screenshot in seine Klassengruppe gestellt.', selbst: 10,
          zuege: { passt: 'Sam bittet den Cousin, den Screenshot überall zu löschen, und fragt nach, wem er ihn gezeigt hat.', klein: 'Sam sagt: „Ich hab nur einen Screenshot gemacht, das ist ja nicht verboten.“', gross: 'Sam gibt freiwillig das Handy für einen ganzen Monat ab.' } },
        D: { fig: 'yara', getan: 'Yara hat alles gelesen und nichts geschrieben.', gedacht: 'Ich hab ja nichts gemacht. Ich war nur in der Gruppe.', detail: 'Yara hat kurz überlegt, „Leute, lasst das“ zu schreiben – und es gelassen, um nicht die Spaßbremse zu sein.', selbst: 0,
          zuege: { passt: 'Yara sagt im Gespräch ehrlich, dass Yara „Lasst das“ schreiben wollte – und es nächstes Mal tut.', klein: 'Yara sagt: „Ich hab gar nichts gemacht.“', gross: 'Yara entschuldigt sich für alle und sagt, Yara hätte alles verhindern müssen.' } },
      },
    },
    {
      id: 'fenster', titel: 'Das Fenster', icon: 'base',
      was: 'In der Regenpause ist im Klassenraum ein Fenster kaputtgegangen. Ein Ball ist durchgeflogen.',
      rollen: {
        A: { fig: 'sam', getan: 'Sam hat den Ball geschossen – fest, in Richtung Mika.', gedacht: 'Mika hätte halt fangen müssen. Ich hab nur gepasst.', detail: 'Sam hat vorher gesehen, dass das Fenster gekippt war, und gedacht: trifft eh nicht.', selbst: 30,
          zuege: { passt: 'Sam geht zum Hausmeister, sagt, dass Sam geschossen hat, und fragt, was jetzt zu tun ist.', klein: 'Sam sagt: „Mika hätte fangen müssen.“', gross: 'Sam verspricht, das ganze Fenster allein zu bezahlen – mit Geld, das Sam nicht hat.' } },
        B: { fig: 'mika', getan: 'Mika hat sich weggeduckt, statt zu fangen.', gedacht: 'Ich duck mich doch nicht in einen Ball rein. Das ist ein Reflex.', detail: 'Mika hatte vorher gerufen: „Schieß ruhig fest, ich krieg den!“', selbst: 5,
          zuege: { passt: 'Mika sagt ehrlich, dass Mika „Schieß fest!“ gerufen hat.', klein: 'Mika sagt: „Ich hab mich nur geduckt.“', gross: 'Mika sagt, Mika hätte geschossen, damit Sam keinen Ärger kriegt.' } },
        C: { fig: 'luca', getan: 'Luca hat den Ball mitgebracht und vorgeschlagen, drinnen zu spielen, weil es regnet.', gedacht: 'Ich hab ja nicht geschossen.', detail: 'An der Tür hängt die Regel „Kein Ball im Klassenraum“. Luca hat gesagt: „Merkt eh keiner.“', selbst: 5,
          zuege: { passt: 'Luca sagt, dass Ball und Idee von Luca waren – und lässt den Ball ab jetzt im Spind.', klein: 'Luca sagt: „Ich hab ja nicht geschossen.“', gross: 'Luca verspricht, nie wieder Fußball zu spielen.' } },
        D: { fig: 'yara', getan: 'Yara stand an der Tür Schmiere und hat „Lehrer kommt!“ gerufen.', gedacht: 'Ich hab nur aufgepasst. Ich hab den Ball nicht mal angefasst.', detail: 'Genau beim Schuss kam Yaras Ruf. Sam hat sich erschrocken umgedreht und schief geschossen.', selbst: 5,
          zuege: { passt: 'Yara erzählt, dass Yara genau beim Schuss „Lehrer kommt!“ gerufen hat.', klein: 'Yara sagt: „Ich stand nur an der Tür.“', gross: 'Yara sagt, an allem sei nur Yara schuld, weil Yara gerufen hat.' } },
      },
    },
  ];

  const LEVELS = ['Hören', 'Verteilen', 'Wiedergutmachen'];
  const ZUG = {
    passt: { label: 'passt zum Anteil', fb: 'Macht den eigenen Teil wieder gut – nicht mehr, nicht weniger.', mood: 'froh' },
    klein: { label: 'zu klein', fb: 'Eine Ausrede. Der eigene Anteil bleibt liegen – und landet bei den anderen.', mood: 'genervt' },
    gross: { label: 'zu groß', fb: 'Nimmt alles auf sich. Klingt edel, nimmt den anderen aber ihren Teil weg.', mood: 'traurig' },
  };
  const verteilOk = (w) => w.reduce((a, b) => a + b, 0) === 100 && w.every((x) => x >= MIN && x < 100);
  const fallFuer = (ctx) => CREW.seed.pick(FAELLE, CREW.seed.rng(ctx.code, 'hundert-prozent', 'fall'));

  // Rollen-Karte: was die Figur getan und gedacht hat, plus „Nur du weißt“
  function rolleKarte(ctx, fall, r, o) {
    const oo = o || {};
    const R = fall.rollen[r], F = ctx.figures[R.fig];
    return h('div', { class: 'stack hp-rolle', 'data-role': r },
      ctx.figureCard({ fig: R.fig, mood: 'neutral', text: R.getan, eyebrow: 'Rolle ' + r + ' · Das hat ' + F.name + ' getan', speakText: R.getan + ' ' + F.name + ' denkt: ' + R.gedacht, size: 80,
        extra: h('div', { class: 'hp-gedacht' }, CREW.icon('chat', 18), h('span', null, h('b', null, F.name + ' denkt: '), '„' + R.gedacht + '“')) }),
      h('div', { class: 'card stack hp-detail' }, h('div', { class: 'row between', style: { flexWrap: 'nowrap', gap: '8px' } }, h('span', { class: 'eyebrow' }, 'Nur du weißt'), ctx.readBtn(R.detail)), h('b', null, R.detail), h('span', { class: 'muted small' }, 'Sag das erst, wenn jemand fragt: „Gibt’s noch was, das wir nicht wissen?“')),
      oo.hinweis === false ? null : h('p', { class: 'muted small' }, 'Erzähl mit deinen Worten, was ' + F.name + ' getan und gedacht hat. Du bist nicht ' + F.name + ' – du erzählst nur.'));
  }

  CREW.registerGame({
    id: 'hundert-prozent',
    template: 'T2',
    icon: 'target',
    themen: ['Verantwortung', 'Schuld schieben', 'Fairness', 'Wiedergutmachung'],
    safety: ['figuren', 'freiwillig'],
    help: false,
    // für den Test
    faelle: FAELLE, verteilOk,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Etwas ist schiefgelaufen. Jedes Rollen-iPad kennt eine Figur. Erzählt, fragt nach, dann verteilt ihr 100 % – niemand 0, niemand 100.',
        levels: LEVELS,
        steps: [
          { icon: 'users', title: 'Hören', text: 'Jede Rolle erzählt. Ein Detail kommt nur auf Nachfrage.' },
          { icon: 'target', title: '100 % verteilen', text: 'Nicht „Wer war’s?“, sondern „Wie viel war’s?“' },
          { icon: 'heart', title: 'Wiedergutmachen', text: 'Pro Figur ein Zug, der zum Anteil passt.' },
        ],
        probe: ctx.T.probeCard('Probe: Zwei haben einen Kuchen fallen lassen. Wie viel ist fair, wenn beide gerannt sind? Tippt eins – zählt nicht.', [{ label: '50 / 50', value: 1, variant: 'ghost' }, { label: '100 / 0', value: 2, variant: 'ghost' }]),
      });

      // Welches Gerät? Rollen-iPad (per QR mit Rolle, oder im Spiel wählen) – oder Beamer
      let geraet = ctx.role ? 'rolle' : null;
      if (!geraet) {
        const wG = ctx.scr([ctx.say('Ist das hier der Beamer oder ein Rollen-iPad?', { eyebrow: 'Welches Gerät?', small: true }), h('p', { class: 'muted small' }, 'Der Beamer zeigt den Fall und die Regler. Die Rollen-iPads zeigen je eine Figur.')], { eyebrow: 'Vorbereitung', center: true });
        const g = await ctx.ask(wG, [{ label: 'Beamer · Lehrkraft', value: 'beamer', icon: 'eye', id: 'hp-beamer' }, { label: 'Rollen-iPad · Platz ' + ctx.seat, value: 'rolle', variant: 'ghost', icon: 'phone', id: 'hp-rolle' }], { autoPick: () => 'beamer' });
        geraet = g === 'rolle' ? 'rolle' : 'beamer';
      }

      /* ---------- Rollen-iPad: nur die eigene Figur ---------- */
      if (geraet === 'rolle') {
        await ctx.T.codeCheck();
        const fall = fallFuer(ctx);
        const roles = {};
        ROLLEN.forEach((r) => { const R = fall.rollen[r]; roles[r] = { name: ctx.figures[R.fig].name, desc: 'Du erzählst, was ' + ctx.figures[R.fig].name + ' getan und gedacht hat.' }; });
        const role = await ctx.T.roleSetup({ roles, observer: { name: 'Beobachter:in', desc: 'Keine Figur. Du achtest darauf, dass alle vier erzählen – und dass niemand 0 oder 100 % bekommt.' } });
        const w = role === 'X'
          ? ctx.scr([h('div', { class: 'slice' }, h('b', null, 'Beobachter:in'), h('p', null, 'Fall: ' + fall.was),
            h('ul', { class: 'stack', style: { margin: 0, paddingLeft: '1.2em' } }, h('li', null, 'Achte, dass jede Rolle erzählt – auch das Detail.'), h('li', null, 'Frag beim Verteilen: „Warum so viel? Warum so wenig?“'), h('li', null, 'Am Ende: Wer hat sich selbst am kleinsten gemacht?')))], { eyebrow: fall.titel, badge: h('span', { class: 'pill accent' }, 'Beobachter:in') })
          : ctx.scr([h('div', { class: 'card soft' }, h('b', null, fall.was)), rolleKarte(ctx, fall, role)], { eyebrow: fall.titel, badge: h('span', { class: 'pill accent' }, 'Rolle ' + role) });
        await ctx.next(w, 'Erzählt – zum Beamer schauen');
        return { summary: 'Deine Rolle ist erzählt. Der Rest läuft am Beamer.', noSticker: true };
      }

      /* ---------- Beamer ---------- */
      const fall = fallFuer(ctx);
      const figs = ROLLEN.map((r) => fall.rollen[r].fig);
      const F = (r) => ctx.figures[fall.rollen[r].fig];
      // Rollen verteilen: QR (je Rolle) oder nacheinander am Lehrer-iPad
      const wQ = ctx.scr([
        ctx.say('Vier Rollen-iPads, je eine Figur. Scannen – oder im Spiel „Rollen-iPad“ wählen. Tagescode am Beamer: ' + ctx.code + '.', { eyebrow: 'Rollen verteilen', small: true }),
        h('div', { class: 'card' }, CREW.games.qrPanel('hundert-prozent', { size: 130 })),
        h('p', { class: 'muted small' }, 'Ohne Rollen-iPads: „Am Lehrer-iPad zeigen“ – jede Rolle schaut nacheinander allein.'),
      ], { eyebrow: 'Vorbereitung', badge: ctx.stufe(1, LEVELS) });
      const how = await ctx.ask(wQ, [{ label: 'Am Lehrer-iPad zeigen', value: 'here', variant: 'ghost', icon: 'eyeOff', id: 'hp-here' }, { label: 'Rollen-iPads sind bereit', value: 'qr', iconRight: 'right', id: 'hp-qr' }]);
      if (how === ctx.SKIP) return { summary: 'Heute kein Fall. Nächstes Mal.' };
      if (how === 'here') {
        for (const r of ROLLEN) {
          const c = await ctx.T.cover({ who: 'Nur Rolle ' + r + ' schaut', hint: 'Die anderen schauen weg. Rolle ' + r + ' erzählt gleich von ' + F(r).name + '.', eyebrow: 'Rolle ' + r });
          if (c === ctx.SKIP) continue;
          const w = ctx.scr([rolleKarte(ctx, fall, r)], { eyebrow: 'Rolle ' + r + ' · ' + fall.titel, badge: h('span', { class: 'pill accent' }, 'Rolle ' + r) });
          await ctx.next(w, 'Gelesen, wegdrehen');
        }
      }

      // Level 1: Hören – erst wenn alle vier erzählt haben, geht es weiter
      const erzaehlt = new Set(), details = new Set();
      const weiterId = 'hp-zum-verteilen';
      const tile = (r) => {
        const b1 = CREW.ui.btn('Erzählt', () => { erzaehlt.add(r); b1.classList.add('good'); b1.disabled = true; check(); }, { small: true, variant: 'ghost', icon: 'check', id: 'hp-erzaehlt-' + r });
        const b2 = CREW.ui.btn('Detail gefragt', () => { details.add(r); b2.classList.add('good'); b2.disabled = true; }, { small: true, variant: 'ghost', icon: 'bulb', id: 'hp-detail-' + r });
        return h('div', { class: 'hp-tile', style: { '--fc': F(r).colour } }, h('div', { class: 'row', style: { gap: '8px', flexWrap: 'nowrap' } }, ctx.avatar(fall.rollen[r].fig, 'neutral', 52), h('div', { class: 'stack', style: { gap: 0 } }, h('b', null, F(r).name), h('span', { class: 'muted small' }, 'Rolle ' + r))), b1, b2);
      };
      const w1 = ctx.scr([
        h('div', { class: 'hp-fall' }, CREW.icon(fall.icon, 40), h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Was ist passiert?'), h('b', { class: 'lead' }, fall.was)), ctx.readBtn(fall.was)),
        h('div', { class: 'hp-tiles' }, ROLLEN.map(tile)),
        ctx.say('Jede Rolle erzählt, was ihre Figur getan und gedacht hat. Jede Rolle kennt noch ein Detail – fragt: „Gibt’s noch was, das wir nicht wissen?“', { eyebrow: 'Erzählrunde', small: true }),
        CREW.ui.teacherLine('„Erzählt“ antippen, wenn eine Rolle gesprochen hat. Erst dann geht es zum Verteilen.'),
      ], { eyebrow: fall.titel + ' · Hören', badge: ctx.stufe(1, LEVELS) });
      const p1 = ctx.next(w1, 'Zum Verteilen', { id: weiterId });
      const weiterBtn = w1.querySelector('#' + weiterId);
      function check() { if (weiterBtn) weiterBtn.disabled = erzaehlt.size < ROLLEN.length; }
      check();
      if (ctx.auto) ROLLEN.forEach((r) => { w1.querySelector('#hp-erzaehlt-' + r).click(); if (ctx.autoRng() < 0.6) w1.querySelector('#hp-detail-' + r).click(); });
      if ((await p1) === ctx.SKIP) return { summary: 'Heute nur reingeschaut.' };

      // Level 2: Verteilen – 100 %, niemand 0, niemand 100
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Verteilt 100 % Verantwortung auf die vier. Niemand bekommt 0, niemand 100. Wer mehr bekommt, nimmt es jemand anderem weg.' });
      const werte = [25, 25, 25, 25];
      const rows = h('div', { class: 'stack hp-regler' });
      const summe = h('span', { class: 'pill' });
      const doneId = 'hp-verteilt';
      let doneBtn = null;
      const rest = () => 100 - werte.reduce((a, b) => a + b, 0);
      const zeichne = () => {
        clear(rows);
        ROLLEN.forEach((r, i) => {
          const minus = CREW.ui.iconBtn('minus', () => { if (werte[i] > MIN) { werte[i] -= STEP; zeichne(); } }, { label: F(r).name + ' weniger', id: 'hp-minus-' + r });
          const plus = CREW.ui.iconBtn('plus', () => { if (rest() >= STEP) { werte[i] += STEP; zeichne(); } }, { label: F(r).name + ' mehr', id: 'hp-plus-' + r });
          minus.disabled = werte[i] <= MIN;
          plus.disabled = rest() < STEP;
          rows.appendChild(h('div', { class: 'hp-reg', style: { '--fc': F(r).colour } },
            h('div', { class: 'row', style: { gap: '8px', flexWrap: 'nowrap', minWidth: 0 } }, ctx.avatar(figs[i], 'neutral', 40), h('b', null, F(r).name)),
            h('div', { class: 'hp-bar' }, h('i', { style: { width: werte[i] + '%' } })),
            h('b', { class: 'hp-wert display' }, werte[i] + ' %'),
            h('div', { class: 'row', style: { gap: '6px', flexWrap: 'nowrap' } }, minus, plus)));
        });
        const r = rest();
        summe.textContent = r === 0 ? '100 % verteilt' : 'Noch ' + r + ' % zu verteilen';
        summe.className = 'pill ' + (r === 0 ? 'good' : 'accent');
        if (doneBtn) doneBtn.disabled = r !== 0;
      };
      zeichne();
      const w2 = ctx.scr([
        h('div', { class: 'row between' }, h('b', null, 'Wie viel war’s? Erst reden, dann Regler.'), summe),
        rows,
        h('p', { class: 'muted small' }, 'Startet bei 25 % für alle. Wer mehr bekommen soll: erst bei jemand anderem runter. Minimum 5 % – niemand ist ganz raus.'),
      ], { eyebrow: fall.titel + ' · Verteilen', badge: ctx.stufe(2, LEVELS) });
      if (ctx.auto) for (let k = 0; k < 4; k++) { const a = Math.floor(ctx.autoRng() * 4), b = Math.floor(ctx.autoRng() * 4); if (a !== b && werte[a] > MIN + STEP) { werte[a] -= STEP * 2; werte[b] += STEP * 2; } }
      zeichne();
      const p2 = ctx.next(w2, 'Verteilt – aufdecken', { id: doneId });
      doneBtn = w2.querySelector('#' + doneId);
      zeichne();
      if ((await p2) === ctx.SKIP) return { summary: 'Heute nur reingeschaut.' };
      const ok = verteilOk(werte);

      // Aufdecken: So sieht sich jede Figur selbst – zusammen fehlt ein großer Rest
      const selbstSumme = ROLLEN.reduce((a, r) => a + fall.rollen[r].selbst, 0);
      const w3 = ctx.scr([
        h('div', { class: 'hp-aufdeck' }, ROLLEN.map((r, i) => {
          const R = fall.rollen[r];
          return h('div', { class: 'hp-auf', style: { '--fc': F(r).colour } },
            h('div', { class: 'row', style: { gap: '8px', flexWrap: 'nowrap' } }, ctx.avatar(R.fig, R.selbst < werte[i] ? 'ueberrascht' : 'neutral', 44), h('b', null, F(r).name)),
            h('div', { class: 'hp-vgl' },
              h('span', { class: 'hp-vgl-z' }, h('span', { class: 'small muted' }, 'Crew'), h('b', { class: 'display' }, werte[i] + ' %')),
              h('span', { class: 'hp-vgl-z selbst' }, h('span', { class: 'small muted' }, 'sieht sich selbst bei'), h('b', { class: 'display' }, R.selbst + ' %'))),
            h('span', { class: 'small' }, h('b', null, 'Nur ' + F(r).name + ' wusste: '), R.detail));
        })),
        h('div', { class: 'hp-rest' }, h('b', { class: 'display' }, 'Selbstsicht zusammen: ' + selbstSumme + ' %'), h('span', null, 'Es fehlen ' + (100 - selbstSumme) + ' %. Wenn jede:r sich klein rechnet, landet der Rest beim Streit.')),
        ctx.say('Wer hat sich selbst am kleinsten gemacht? Wo lag die Crew weit drüber – und warum?', { eyebrow: 'Kurz reden', small: true }),
      ], { eyebrow: fall.titel + ' · Aufdecken', badge: ctx.stufe(2, LEVELS) });
      CREW.sound.play('reveal');
      await ctx.next(w3, 'Weiter');

      // Level 3: Wiedergutmachen – pro Figur ein Zug
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Jede Figur macht ihren Teil wieder gut. Wählt pro Figur den Zug, der zum Anteil passt – nicht zu klein, nicht zu groß.' });
      const wahl = {};
      const zugRows = ROLLEN.map((r) => {
        const R = fall.rollen[r];
        const opts = ctx.rshuffle(['passt', 'klein', 'gross']);
        const chips = h('div', { class: 'hp-zuege' }, opts.map((k) => {
          const c = h('button', { type: 'button', class: 'chip hp-zug', 'data-zug': k, 'data-role': r }, R.zuege[k]);
          c.addEventListener('click', () => { CREW.sound.play('tap'); wahl[r] = k; chips.querySelectorAll('.chip').forEach((x) => x.classList.toggle('sel', x === c)); pruefe(); });
          return c;
        }));
        return h('div', { class: 'hp-zugrow', style: { '--fc': F(r).colour } }, h('div', { class: 'row', style: { gap: '8px', flexWrap: 'nowrap' } }, ctx.avatar(R.fig, 'neutral', 40), h('b', null, F(r).name), h('span', { class: 'pill' }, werte[ROLLEN.indexOf(r)] + ' %')), chips);
      });
      const zugId = 'hp-zuege-fertig';
      const w4 = ctx.scr([
        ctx.say('Was macht jede Figur jetzt? Redet kurz, dann tippt die Lehrkraft pro Figur einen Zug.', { eyebrow: 'Wiedergutmachen', small: true }),
        h('div', { class: 'stack' }, zugRows),
      ], { eyebrow: fall.titel + ' · Wiedergutmachen', badge: ctx.stufe(3, LEVELS) });
      const p4 = ctx.next(w4, 'Züge stehen', { id: zugId });
      const zugBtn = w4.querySelector('#' + zugId);
      function pruefe() { if (zugBtn) zugBtn.disabled = Object.keys(wahl).length < ROLLEN.length; }
      pruefe();
      if (ctx.auto) w4.querySelectorAll('.hp-zuege').forEach((row) => { const cs = row.querySelectorAll('.chip'); cs[Math.floor(ctx.autoRng() * cs.length)].click(); });
      const z = await p4;
      let passend = 0;
      if (z !== ctx.SKIP) {
        passend = ROLLEN.filter((r) => wahl[r] === 'passt').length;
        if (passend === ROLLEN.length) CREW.sound.play('great');
        const w5 = ctx.scr([
          passend === ROLLEN.length ? h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, '100 % repariert!') : null,
          h('div', { class: 'stack' }, ROLLEN.map((r) => {
            const R = fall.rollen[r], k = wahl[r];
            return h('div', { class: 'hp-ergebnis', 'data-zug': k, style: { '--fc': F(r).colour } },
              ctx.avatar(R.fig, ZUG[k].mood, 48),
              h('div', { class: 'stack', style: { gap: '2px', minWidth: 0 } },
                h('div', { class: 'row', style: { gap: '8px' } }, h('b', null, F(r).name), h('span', { class: 'pill hp-zugtag', 'data-zug': k }, ZUG[k].label)),
                h('span', null, R.zuege[k]),
                k === 'passt' ? null : h('span', { class: 'small muted' }, ZUG[k].fb + ' Passender: ' + R.zuege.passt)));
          })),
          h('p', { class: 'muted small' }, 'Kein „Wer war’s?“, sondern „Wie viel war’s?“. Jede:r macht den eigenen Teil wieder gut.'),
        ], { eyebrow: fall.titel + ' · Ergebnis', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(w5, 'Weiter');
      }
      return {
        summary: passend === ROLLEN.length ? '100 % verteilt und 100 % repariert. Jede:r hat den eigenen Teil getragen.' : 'Verantwortung teilen statt Schuld schieben: Jede Figur hatte einen Anteil – keine 0, keine 100.',
        stats: [[erzaehlt.size, 'Rollen erzählt'], [details.size, 'Details erfragt'], [ok ? 100 : 100 - rest(), '% verteilt'], [passend, 'passende Züge']],
      };
    },
  });
})();
