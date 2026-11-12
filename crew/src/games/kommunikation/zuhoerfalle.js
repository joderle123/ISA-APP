/* Spiel „Zuhör-Falle“ (Thema: Kommunikation & Grenzen) · Vorlage T1 Solo + Austausch · j1-e21
   Eine Figur erzählt (Untertitel Zeile für Zeile, dazu Vorlese-Knopf). Du wählst die Antwort, bei der sie sich verstanden
   fühlt: Eine trifft Inhalt und Gefühl, eine übersieht das Gefühl, eine gibt sofort einen Ratschlag, eine klaut das Thema
   („Ich auch …“). Das Verstanden-Meter zeigt die Wirkung, die Figur reagiert, Zurückspulen ist erlaubt. In drei Level:
   1) Erkennen – klare Geschichte, vier Antworten.
   2) Gefühl hören – die Figur sagt „egal“ oder „passt schon“. Erst das echte Gefühl wählen, dann die Antwort; dazu die
      Falle „Kleinreden“.
   3) Selbst sagen – du baust deinen eigenen Zuhör-Satz aus Gefühl und Inhalt (nur im Kopf, nichts wird gespeichert).
   Danach Vergleichskarte zu zweit: „Welche Falle passiert dir eher: Ratschlag oder Ich-auch?“ */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const FALLEN = {
    treffer: { id: 'treffer', label: 'Verstanden', kurz: 'Inhalt und Gefühl', meter: 92, mood: 'froh' },
    sachlich: { id: 'sachlich', label: 'Gefühl übersehen', kurz: 'nur der Inhalt', meter: 48, mood: 'neutral', reakt: 'Ja … genau. (Es fühlt sich trotzdem nur halb gehört an.)' },
    ratschlag: { id: 'ratschlag', label: 'Ratschlag-Falle', kurz: 'gleich ein Tipp', meter: 30, mood: 'genervt', reakt: 'Hm. Ich wollte gerade keinen Tipp. Ich wollte nur erzählen.' },
    ichauch: { id: 'ichauch', label: 'Ich-auch-Falle', kurz: 'Thema geklaut', meter: 20, mood: 'traurig', reakt: 'Okay … jetzt reden wir über dich.' },
    kleinreden: { id: 'kleinreden', label: 'Kleinreden', kurz: '„nicht so schlimm“', meter: 12, mood: 'traurig', reakt: 'Für mich ist es aber nicht egal.' },
  };
  const LEVELS = ['Erkennen', 'Gefühl hören', 'Selbst sagen'];

  /* Geschichten: zeilen (Untertitel), gefuehl (was die Figur fühlt), antworten je Falle (ähnlich lang!), danke (Reaktion
     auf „verstanden“). Stufe 2: oberflaeche (was die Figur behauptet) + gefuehle (Auswahl) + satz (für Level 3). */
  const GESCHICHTEN = [
    { id: 'rad', stufe: 1, fig: 'sam', mood: 'traurig', gefuehl: 'frustriert', inhalt: 'durchgefallen wegen einer Kurve',
      zeilen: ['Drei Wochen hab ich für die Fahrradprüfung geübt.', 'Heute bin ich durchgefallen. Wegen einer einzigen Kurve.', 'Alle anderen haben bestanden.'],
      antworten: { treffer: 'Drei Wochen Üben und dann eine Kurve – das ist echt frustrierend.', sachlich: 'Also bist du wegen einer Kurve durchgefallen.', ratschlag: 'Üb die Kurven einfach nochmal auf dem Parkplatz, dann klappt es beim nächsten Mal.', ichauch: 'Ich bin beim Schwimmabzeichen auch mal durchgefallen.' },
      danke: 'Ja! Genau. Drei Wochen. Und dann so was.' },
    { id: 'lohn', stufe: 1, fig: 'yara', mood: 'froh', gefuehl: 'stolz', inhalt: 'der erste eigene Lohn',
      zeilen: ['Ich hab heute meinen ersten Lohn vom Ferienjob bekommen.', '80 Euro! Selbst verdient.', 'Ich hab den ganzen Tag gegrinst.'],
      antworten: { treffer: 'Selbst verdient – du bist richtig stolz, oder? Zu Recht!', sachlich: 'Okay, 80 Euro vom Ferienjob also.', ratschlag: 'Spar das lieber, sonst ist es gleich wieder weg.', ichauch: 'Ich hab letzten Sommer im Supermarkt sogar 120 Euro bekommen, in zwei Wochen.' },
      danke: 'Jaaa! So stolz. Endlich mein eigenes Geld.' },
    { id: 'vorsingen', stufe: 1, fig: 'luca', mood: 'angst', gefuehl: 'nervös', inhalt: 'morgen allein vorsingen',
      zeilen: ['Morgen soll ich beim Schulkonzert allein vorsingen.', 'Ich hab die ganze Nacht nicht geschlafen.', 'Mir ist jetzt schon schlecht.'],
      antworten: { treffer: 'Allein vor allen singen – kein Wunder, dass du so nervös bist.', sachlich: 'Ah, das Konzert ist also schon morgen.', ratschlag: 'Stell dir einfach vor, alle sitzen in Unterhose da. Das hilft immer, echt.', ichauch: 'Ich war beim Referat letzte Woche auch total nervös.' },
      danke: 'Ja. Total nervös. Gut, dass du das verstehst.' },
    { id: 'party', stufe: 2, fig: 'sam', mood: 'neutral', gefuehl: 'verletzt', oberflaeche: 'egal', inhalt: 'nicht zur Party eingeladen',
      zeilen: ['Alle reden über die Party am Samstag.', 'Ich bin nicht eingeladen.', 'Ist mir eigentlich egal.'],
      gefuehle: ['egal', 'verletzt', 'müde', 'gelangweilt'],
      antworten: { treffer: 'Ganz egal ist es dir nicht, oder? Tut weh, nicht eingeladen zu sein.', sachlich: 'Okay, du bist also nicht zur Party eingeladen.', ratschlag: 'Mach doch einfach selbst eine Party, dann kommen alle zu dir.', ichauch: 'Ich war letztes Jahr auch nicht eingeladen, da hab ich den ganzen Abend gezockt.', kleinreden: 'Ach, Partys sind eh überbewertet. Ist doch nicht schlimm.' },
      danke: '… Ja. Es tut weh. Danke, dass du das merkst.',
      satz: { gefuehle: ['verletzt', 'gelangweilt', 'müde', 'gleichgültig'], inhalte: [{ t: 'du zur Party nicht eingeladen bist', ok: true }, { t: 'Partys eh langweilig sind', ok: false }, { t: 'du zu wenig Freunde hast', ok: false }] } },
    { id: 'tor', stufe: 2, fig: 'mika', mood: 'froh', gefuehl: 'stolz und traurig', oberflaeche: 'nur stolz', inhalt: 'Siegtor, aber keiner von zu Hause da', familie: true,
      zeilen: ['Ich hab im Finale das Siegtor geschossen!', 'Alle haben gejubelt.', 'Nur aus meiner Familie war keiner da.'],
      gefuehle: ['nur stolz', 'stolz und traurig', 'nur traurig', 'egal'],
      antworten: { treffer: 'Das Siegtor – mega! Und schade, dass deine Familie es nicht gesehen hat.', sachlich: 'Ihr habt also das Finale gewonnen, durch dein Tor.', ratschlag: 'Lass dein nächstes Spiel einfach filmen, dann kannst du es zu Hause allen zeigen.', ichauch: 'Bei meinem Turnier war auch keiner von meiner Familie da.', kleinreden: 'Ist doch egal, wer zuschaut. Tor ist Tor!' },
      danke: 'Genau das. Beides gleichzeitig. Du hast’s gecheckt.',
      satz: { gefuehle: ['stolz und traurig', 'nur stolz', 'gelangweilt', 'wütend'], inhalte: [{ t: 'du das Siegtor geschossen hast und keiner von zu Hause da war', ok: true }, { t: 'Fußball nicht so wichtig ist', ok: false }, { t: 'deine Familie dich nicht mag', ok: false }] } },
    { id: 'freundin', stufe: 2, fig: 'yara', mood: 'neutral', gefuehl: 'allein gelassen', oberflaeche: 'passt schon', inhalt: 'die Freundin sitzt jetzt woanders',
      zeilen: ['Meine beste Freundin sitzt seit Montag bei den anderen.', 'In der Pause steh ich jetzt allein.', 'Sie sagt, es ist nichts. Passt schon.'],
      gefuehle: ['passt schon', 'allein gelassen', 'wütend auf alle', 'gelangweilt'],
      antworten: { treffer: '„Passt schon“ – aber allein in der Pause stehen fühlt sich mies an, oder?', sachlich: 'Deine Freundin sitzt jetzt also bei den anderen.', ratschlag: 'Setz dich morgen einfach zu den anderen dazu, dann ist das Problem doch gelöst.', ichauch: 'Meine Freundin hat mich letztes Jahr auch sitzen lassen.', kleinreden: 'Ach, die kommt bestimmt wieder. Ist doch nichts.' },
      danke: 'Ja. Mies. Ich wollte nicht, dass es jemand merkt.',
      satz: { gefuehle: ['allein gelassen', 'gelangweilt', 'wütend auf alle', 'ganz okay'], inhalte: [{ t: 'du in der Pause jetzt allein stehst', ok: true }, { t: 'du zu anhänglich bist', ok: false }, { t: 'Pausen eben langweilig sind', ok: false }] } },
    { id: 'bruder', stufe: 2, fig: 'luca', mood: 'genervt', gefuehl: 'ungerecht behandelt', oberflaeche: 'ist halt so', inhalt: 'der Bruder darf mehr', familie: true,
      zeilen: ['Mein Bruder darf alles.', 'Heute wieder: Er darf zur Party, ich muss um acht zu Hause sein.', 'Na ja. Ist halt so.'],
      gefuehle: ['ist halt so', 'ungerecht behandelt', 'froh', 'ängstlich'],
      antworten: { treffer: '„Ist halt so“ – aber es fühlt sich total ungerecht an, oder?', sachlich: 'Dein Bruder darf also länger weg als du.', ratschlag: 'Sag einfach, dass du trotzdem länger bleibst.', ichauch: 'Meine große Schwester darf auch immer viel länger weg als ich, voll nervig.', kleinreden: 'Er ist halt älter, das ist doch klar.' },
      danke: 'Ja! Ungerecht. Endlich sagt das mal jemand.',
      satz: { gefuehle: ['ungerecht behandelt', 'ängstlich', 'froh', 'ganz okay'], inhalte: [{ t: 'dein Bruder länger wegdarf als du', ok: true }, { t: 'du noch zu klein bist', ok: false }, { t: 'Partys sowieso nerven', ok: false }] } },
  ];

  // Erzählen: Figur, Untertitel erscheinen Zeile für Zeile, Vorlese-Knopf
  async function erzaehlen(ctx, g, eyebrow, badge) {
    const fig = ctx.figures[g.fig];
    const sub = h('div', { class: 'zf-sub', 'aria-live': 'polite' });
    const w = ctx.scr([
      h('div', { class: 'zf-erzaehl' },
        h('div', { class: 'zf-erzaehl-side' }, ctx.avatar(g.fig, g.mood, 104), h('b', { class: 'fig-name' }, fig.name)),
        h('div', { class: 'stack', style: { gap: '8px', minWidth: 0 } },
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, fig.name + ' erzählt'), ctx.readBtn(fig.name + ' erzählt: ' + g.zeilen.join(' '), { cls: 'zf-hoeren' })),
          sub)),
      g.familie ? ctx.safetyLine('familie') : null,
    ], { eyebrow, badge });
    for (const z of g.zeilen) {
      sub.appendChild(h('p', { class: 'zf-zeile enter' }, z));
      CREW.sound.play('tick');
      await ctx.hold(1500);
    }
    return ctx.next(w, 'Antworten');
  }

  // Kompakte Aufgaben-Zeile (statt großer Karte), damit die Antworten sichtbar bleiben
  const hint = (ctx, text, icon) => h('div', { class: 'kg-hint' }, CREW.icon(icon || 'chat', 24), h('span', { class: 'kg-hint-t' }, text), ctx.readBtn(text));
  const zitat = (t) => (/^„/.test(t) ? t : '„' + t + '“');
  // Kompakte Geschichte (für die Antwort-Bildschirme)
  const kurzKarte = (ctx, g, eyebrow) => ctx.figureCard({ fig: g.fig, mood: g.mood, text: g.zeilen.join(' '), eyebrow, size: 64, chat: true, cls: 'zf-kurz' });

  /* Eine Geschichte beantworten (mit Zurückspulen). Liefert { erst, falle (erste Wahl), ok } oder null */
  async function antworten(ctx, g, nr, L, badge) {
    const fig = ctx.figures[g.fig];
    const kinds = ctx.rshuffle(Object.keys(g.antworten));
    const meter = ctx.meter({ value: 0, label: 'Verstanden' });
    let tries = 0, erste = null;
    for (;;) {
      const w = ctx.scr([
        kurzKarte(ctx, g, 'Geschichte ' + nr),
        hint(ctx, (tries ? 'Neuer Versuch: ' : '') + 'Bei welcher Antwort fühlt sich ' + fig.name + ' verstanden?', 'heart'),
      ], { eyebrow: 'Geschichte ' + nr + ' · Antwort', badge });
      const r = await ctx.ask(w, kinds.map((k) => ({ label: g.antworten[k], value: k, variant: 'ghost', id: 'zf-a-' + k })), { autoPick: tries >= 1 ? () => 'treffer' : undefined });
      if (r === ctx.SKIP) return erste ? { erst: erste === 'treffer', falle: erste, ok: false } : null;
      tries++;
      if (!erste) erste = r;
      const F = FALLEN[r];
      const ok = r === 'treffer';
      meter.set(F.meter);
      CREW.sound.play(ok ? 'great' : 'soft');
      const w2 = ctx.scr([
        h('div', { class: 'zf-antwort' }, h('span', { class: 'eyebrow' }, 'Du sagst'), h('p', null, zitat(g.antworten[r]))),
        h('div', { class: 'card zf-meter' }, meter.el, h('div', { class: 'row', style: { gap: '8px', marginTop: '8px' } }, h('span', { class: 'pill zf-falle', 'data-falle': r }, F.label), h('span', { class: 'muted small' }, F.kurz))),
        ctx.figureCard({ fig: g.fig, mood: F.mood, text: ok ? g.danke : F.reakt, eyebrow: fig.name + ' reagiert' }),
        ok ? h('p', { class: 'muted small' }, 'Inhalt („' + g.inhalt + '“) und Gefühl („' + g.gefuehl + '“) – beides drin. Mehr braucht es oft nicht.') : null,
      ], { eyebrow: 'Geschichte ' + nr + ' · Wirkung', badge });
      if (ok || tries >= 3) {
        await ctx.next(w2, 'Weiter');
        return { erst: erste === 'treffer', falle: erste, ok };
      }
      const z = await ctx.ask(w2, [{ label: 'Zurückspulen', value: 'rewind', variant: 'ghost', icon: 'undo', id: 'zf-rewind' }, { label: 'Weiter', value: 'next', iconRight: 'right', id: 'btn-next' }], { autoPick: () => 'rewind' });
      if (z !== 'rewind') return { erst: false, falle: erste, ok: false };
    }
  }

  /* Level 2: Erst das echte Gefühl hören. Liefert true (gehört), false, oder SKIP */
  async function gefuehlHoeren(ctx, g, nr, badge) {
    const fig = ctx.figures[g.fig];
    const w = ctx.scr([
      kurzKarte(ctx, g, 'Geschichte ' + nr),
      hint(ctx, fig.name + ' sagt „' + g.oberflaeche + '“. Was fühlt ' + fig.name + ' wirklich?', 'eye'),
    ], { eyebrow: 'Geschichte ' + nr + ' · Gefühl', badge });
    const r = await ctx.ask(w, ctx.rshuffle(g.gefuehle).map((x) => ({ label: x, value: x, variant: 'ghost' })));
    if (r === ctx.SKIP) return ctx.SKIP;
    const ok = r === g.gefuehl;
    const w2 = ctx.scr([
      h('div', { class: 'row center' }, h('span', { class: 'pill ' + (ok ? 'good' : '') }, ok ? 'Gehört: ' + g.gefuehl : 'Hör nochmal hin')),
      ctx.say(ok ? 'Genau. „' + g.oberflaeche + '“ ist die Oberfläche. Darunter: ' + g.gefuehl + '.'
        : r === g.oberflaeche ? 'Das sagt ' + fig.name + ' – aber passt es zum Rest? Darunter steckt: ' + g.gefuehl + '.' : 'Eher nicht. Hör auf das, was passiert ist. Darunter steckt: ' + g.gefuehl + '.', { eyebrow: 'Unter der Oberfläche', small: true }),
    ], { eyebrow: 'Geschichte ' + nr + ' · Gefühl', badge });
    await ctx.next(w2, 'Zu den Antworten');
    return ok;
  }

  /* Level 3: eigenen Zuhör-Satz bauen – Gefühl + Inhalt. Nur im Kopf, nichts wird gespeichert. */
  async function satzBauen(ctx, g) {
    const fig = ctx.figures[g.fig];
    const badge = ctx.stufe(3, LEVELS);
    const e = await erzaehlen(ctx, g, 'Selbst sagen', badge);
    if (e === ctx.SKIP) return null;
    const w = ctx.scr([
      kurzKarte(ctx, g, fig.name + ' erzählt'),
      hint(ctx, 'Bau deinen Satz. Teil 1: „Du fühlst dich …“', 'heart'),
    ], { eyebrow: 'Selbst sagen · Gefühl', badge });
    const gw = await ctx.ask(w, ctx.rshuffle(g.satz.gefuehle).map((x) => ({ label: '… ' + x, value: x, variant: 'ghost' })), { autoPick: () => g.gefuehl });
    if (gw === ctx.SKIP) return null;
    const w2 = ctx.scr([
      kurzKarte(ctx, g, fig.name + ' erzählt'),
      h('div', { class: 'zf-satz' }, h('span', { class: 'eyebrow' }, 'Dein Satz bis jetzt'), h('p', null, '„Du fühlst dich ' + gw + ', weil …“')),
      hint(ctx, 'Teil 2: „… weil …“ – was ist passiert?', 'chat'),
    ], { eyebrow: 'Selbst sagen · Inhalt', badge });
    const opts = ctx.rshuffle(g.satz.inhalte);
    const iw = await ctx.ask(w2, opts.map((x, k) => ({ label: '… weil ' + x.t, value: k, variant: 'ghost' })), { autoPick: () => opts.findIndex((x) => x.ok) });
    if (iw === ctx.SKIP) return null;
    const inhalt = opts[iw];
    const gefOk = gw === g.gefuehl, inhOk = inhalt.ok;
    const satz = 'Du fühlst dich ' + gw + ', weil ' + inhalt.t + '.';
    const meter = ctx.meter({ value: 0, label: 'Verstanden' });
    meter.set(gefOk && inhOk ? 95 : gefOk || inhOk ? 50 : 15);
    CREW.sound.play(gefOk && inhOk ? 'great' : 'soft');
    const w3 = ctx.scr([
      h('div', { class: 'zf-satz big' }, h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Dein Zuhör-Satz'), ctx.readBtn(satz)), h('p', null, '„' + satz + '“')),
      h('div', { class: 'card zf-meter' }, meter.el),
      ctx.figureCard({ fig: g.fig, mood: gefOk && inhOk ? 'froh' : 'neutral', text: gefOk && inhOk ? g.danke : !inhOk ? 'Hm. So war das nicht. Das klingt fast wie ein Urteil über mich.' : 'Das Gefühl stimmt nicht ganz. Unter „' + g.oberflaeche + '“ steckt mehr.', eyebrow: fig.name + ' reagiert' }),
      ctx.say('Sag den Satz einmal leise im Kopf. Oder flüster ihn. Wer mag, hängt eine Frage dran: „Willst du erzählen?“', { eyebrow: 'Nur für dich', small: true }),
      ctx.safetyLine('Nichts wird gespeichert.'),
    ], { eyebrow: 'Selbst sagen · Satz', badge });
    await ctx.ask(w3, [{ label: 'Heute nicht', value: 'pass', variant: 'ghost', icon: 'x', auto: false }, { label: 'Im Kopf gesagt', value: 'ok', iconRight: 'right', id: 'zf-gesagt' }]);
    return { ok: gefOk && inhOk };
  }

  CREW.registerGame({
    id: 'zuhoerfalle',
    template: 'T1',
    icon: 'heart',
    themen: ['Aktives Zuhören', 'Gefühle spiegeln', 'Zuhör-Fallen', 'Freundschaft'],
    safety: ['figuren', 'freiwillig'],
    help: false,
    geschichten: GESCHICHTEN, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Eine Figur erzählt dir etwas. Du wählst die Antwort, bei der sie sich verstanden fühlt. Drei Antworten sind Fallen. Danach vergleichst du zu zweit.',
        levels: LEVELS,
        steps: [
          { icon: 'speaker', title: 'Zuhören', text: 'Lesen oder vorlesen lassen.' },
          { icon: 'heart', title: 'Antworten', text: 'Inhalt und Gefühl? Das Verstanden-Meter zeigt es.' },
          { icon: 'users', title: 'Vergleichen', text: 'Blau findet Blau: Welche Falle passiert dir eher?' },
        ],
        probe: ctx.T.probeCard('Probe: „Mein Handy ist runtergefallen.“ Welche Antwort hört zu? Tipp irgendwas – zählt nicht.', [{ label: '„Oh nein, ärgerlich!“', value: 1, variant: 'ghost' }, { label: '„Kauf dir eine Hülle.“', value: 2, variant: 'ghost' }]),
      });
      await ctx.T.codeCheck();
      const pool1 = ctx.rshuffle(GESCHICHTEN.filter((g) => g.stufe === 1));
      const pool2 = ctx.rshuffle(GESCHICHTEN.filter((g) => g.stufe === 2));
      const plan = [{ g: pool1[0], L: 1 }, { g: pool1[1], L: 1 }, { g: pool2[0], L: 2 }];
      const ergebnisse = [];
      let gehoert = 0;
      for (let i = 0; i < plan.length; i++) {
        const { g, L } = plan[i];
        const badge = ctx.stufe(L, LEVELS);
        if (i > 0 && plan[i - 1].L !== L) await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt sagt die Figur „egal“ oder „passt schon“. Hör, was darunter steckt – und pass auf eine neue Falle auf: Kleinreden.' });
        const e = await erzaehlen(ctx, g, 'Geschichte ' + (i + 1) + ' von ' + plan.length, badge);
        if (e === ctx.SKIP) continue;
        if (L === 2) {
          const gh = await gefuehlHoeren(ctx, g, i + 1, badge);
          if (gh === ctx.SKIP) continue;
          if (gh) gehoert++;
        }
        const r = await antworten(ctx, g, i + 1, L, badge);
        if (r) ergebnisse.push({ g, ...r });
      }
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Keine Auswahl mehr: Du baust deinen eigenen Zuhör-Satz – „Du fühlst dich …, weil …“. Nur im Kopf.' });
      const s3 = await satzBauen(ctx, pool2[1]);

      // Austausch zu zweit: die EINE Vergleichskarte
      await ctx.T.pairScreen();
      await ctx.T.vergleich({
        title: 'Zuhör-Falle',
        items: ergebnisse.map((e) => ({ label: ctx.figures[e.g.fig].name + ': ' + e.g.inhalt, icon: e.erst ? 'heart' : 'help', text: e.erst ? 'Beim ersten Versuch verstanden' : 'Erste Wahl: ' + FALLEN[e.falle].label })),
        questions: ['Welche Falle passiert dir eher: Ratschlag oder Ich-auch?', 'Woran merkst du, dass dir jemand wirklich zuhört?'],
        note: 'Fallen sind menschlich. Es geht um die Figuren, nicht um dich. Pass ist okay.',
      });
      const erst = ergebnisse.filter((e) => e.erst).length;
      return {
        summary: erst >= 2 ? 'Gut zugehört: Inhalt und Gefühl – mehr braucht es oft nicht.' : 'Fallen erkannt. Nächstes Mal: erst das Gefühl hören, dann antworten.',
        stats: [[erst, 'beim ersten Versuch verstanden'], [gehoert, 'verstecktes Gefühl gehört'], [s3 && s3.ok ? 1 : 0, 'eigener Satz passt']],
      };
    },
  });
})();
