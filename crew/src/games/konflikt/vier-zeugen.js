/* Spiel „Vier Zeugen“ (Thema: Konflikt, Druck & Mobbing) · Vorlage T2 Rollen-Puzzle · j1-e26, j1-e28
   Dieselbe Pausenhof- oder Chat-Szene aus vier Sichten (A Betroffen, B Clique, C Zuschauer:in, D Lehrkraft) auf vier
   iPads: je zwei Sätze mit Vorlese-Knopf und ein Detail, das nur diese Sicht kennt („zum vierten Mal diese Woche“).
   Erst wenn jede Sicht gesprochen hat, nimmt der Beamer die Antwort an: vier Merkmale als Ampel-Checkliste
   (immer wieder · ungleiche Kraft · mit Absicht · kann sich nicht wehren), dann Spaß, Konflikt oder Mobbing.
   „Noch nicht“ nennt nur die Sicht, die man nochmal fragen sollte. Danach: Welche Leiter-Stufe wäre für die
   Zuschauer-Figur sicher? Hilfenummern am Ende des Falls.
   Sicherheit: Die Sichten werden ausgelost (Tagescode + Platz) und gehören immer Figuren (Mika, Yara, Luca, Sam).
   Niemand spielt sich selbst oder eine:n Mitschüler:in; wer eine Sicht nicht lesen mag, wird Beobachter:in, und
   die Lehrkraft liest diese Sicht am Beamer vor. Nicht jeder Fall ist Mobbing – auch Spaß und Konflikt kommen vor.
   In drei Level: 1) Hören (vier Sichten, Details erfragen), 2) Prüfen (Ampel + Urteil), 3) Handeln (Leiter-Stufe). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const SICHTEN = {
    A: { name: 'Betroffen', icon: 'heart', desc: 'Du liest vor, wie es die Figur erlebt, mit der etwas gemacht wird.' },
    B: { name: 'Clique', icon: 'users', desc: 'Du liest vor, wie es die Figur sieht, die mitmacht.' },
    C: { name: 'Zuschauer:in', icon: 'eye', desc: 'Du liest vor, was eine Figur gesehen hat, die daneben stand.' },
    D: { name: 'Lehrkraft', icon: 'user', desc: 'Du liest vor, was die Lehrkraft weiß.' },
  };
  const MERKMALE = [
    { id: 'oft', label: 'Immer wieder', frage: 'Passiert das öfter, über längere Zeit?' },
    { id: 'macht', label: 'Ungleiche Kraft', frage: 'Mehrere gegen eine:n – oder Stärkere gegen Schwächere?' },
    { id: 'absicht', label: 'Mit Absicht', frage: 'Soll es weh tun oder bloßstellen?' },
    { id: 'wehrlos', label: 'Kann sich nicht wehren', frage: 'Kommt die Person allein raus – oder leidet sie still?' },
  ];
  const URTEILE = {
    spass: { label: 'Spaß', icon: 'sparkle', text: 'Alle lachen, es geht hin und her, ein Stopp wirkt sofort.' },
    konflikt: { label: 'Konflikt', icon: 'bolt', text: 'Zwei Seiten auf Augenhöhe streiten um etwas – beide können sich wehren.' },
    mobbing: { label: 'Mobbing', icon: 'shield', text: 'Immer wieder, ungleiche Kraft, mit Absicht – und die Person kommt allein nicht raus.' },
  };
  const STUFEN = [
    { n: 1, id: 's1', label: 'Hinschauen' }, { n: 2, id: 's2', label: 'Nicht mitlachen' }, { n: 3, id: 's3', label: 'Mit Betroffenen weggehen' },
    { n: 4, id: 's4', label: 'Erwachsene holen' }, { n: 5, id: 's5', label: 'Direkt was sagen' },
  ];
  const BEWERTUNG = { top: 'Passt hier am besten', gut: 'Hilft – sicher', mutig: 'Mutig – besser zu zweit', reicht: 'Reicht hier völlig' };

  /* Fälle: alle = was jede:r sieht. sichten[A–D] = { fig (D: Lehrkraft ohne Figur), sagt, detail, merkmal }.
     Jedes Detail gehört zu genau einem Merkmal (so muss jede Sicht gefragt werden). ja = Merkmale, die zutreffen.
     leiter = was jede Stufe für die Zuschauer-Figur (C) in diesem Fall bedeutet. */
  const FAELLE = [
    {
      id: 'muetze', titel: 'Die Mütze', ort: 'Pausenhof', urteil: 'mobbing', ja: ['oft', 'macht', 'absicht', 'wehrlos'],
      alle: 'Große Pause. Sams Mütze fliegt von Hand zu Hand. Luca und Mika werfen, ein paar andere lachen. Sam steht in der Mitte.',
      sichten: {
        A: { fig: 'sam', sagt: 'Sam sagt: „Ich hab mitgelacht, damit es schneller vorbei ist. Ich will einfach meine Mütze.“', detail: 'Es ist das vierte Mal diese Woche. Gestern war es der Rucksack.', merkmal: 'oft' },
        B: { fig: 'luca', sagt: 'Luca sagt: „Ist doch nur Spaß, Sam lacht ja mit. Wir machen das mit jedem.“', detail: 'Die Idee kam aus einem Chat namens „Sam-Show“. Sam ist da nicht drin.', merkmal: 'absicht' },
        C: { fig: 'yara', sagt: 'Yara sagt: „Ich stand daneben. Ich hab nicht mitgelacht, aber auch nichts gesagt.“', detail: 'Sam wollte weggehen. Mika hat sich in den Weg gestellt.', merkmal: 'wehrlos' },
        D: { fig: null, sagt: 'Die Pausenaufsicht sagt: „Von Weitem sah es aus wie ein Spiel. Alle haben gelacht.“', detail: 'Es sind immer dieselben gegen Sam. Und Sam hat sich diese Woche zweimal krankgemeldet.', merkmal: 'macht' },
      },
      leiter: {
        s1: ['gut', 'Hinschauen ist der Anfang: Yara kann später genau erzählen, was war.'],
        s2: ['gut', 'Nicht mitlachen nimmt der Clique das Publikum.'],
        s3: ['gut', 'Yara holt Sam raus: „Komm, wir gehen zum Kiosk.“ Sam ist nicht mehr allein.'],
        s4: ['top', 'Bei Mobbing gehört eine erwachsene Person dazu. Das ist kein Petzen – das schützt Sam.'],
        s5: ['mutig', 'Allein gegen eine Gruppe ist riskant. Zu zweit oder mit Erwachsenen im Rücken: ja.'],
      },
    },
    {
      id: 'platz', titel: 'Der Fußballplatz', ort: 'Pausenhof', urteil: 'konflikt', ja: [],
      alle: 'Große Pause. Mika und Luca schreien sich auf dem Fußballplatz an. Luca hat den Ball unterm Arm. Ein paar schauen zu.',
      sichten: {
        A: { fig: 'mika', sagt: 'Mika sagt: „Luca hat einfach unseren Ball genommen. Wir waren zuerst da!“', detail: 'Mika hat zurückgeschrien – und Luca am Ärmel gezogen.', merkmal: 'wehrlos' },
        B: { fig: 'luca', sagt: 'Luca sagt: „Die haben jeden Tag den Platz. Wir wollen auch mal spielen.“', detail: 'Laut Plan an der Tür ist heute Lucas Klasse dran. Es geht nur um den Platz.', merkmal: 'absicht' },
        C: { fig: 'sam', sagt: 'Sam sagt: „Beide haben geschrien. Keiner hat nachgegeben.“', detail: 'Auf beiden Seiten stehen gleich viele. Keiner ist allein.', merkmal: 'macht' },
        D: { fig: null, sagt: 'Die Pausenaufsicht sagt: „Ich kenne die beiden. Sonst spielen sie oft zusammen.“', detail: 'Es ist das erste Mal, dass es zwischen den beiden so knallt.', merkmal: 'oft' },
      },
      leiter: {
        s1: ['gut', 'Hinschauen hilft: Wird es körperlich, merkt Sam es sofort.'],
        s2: ['gut', 'Keiner lacht – gut so. Ein Streit braucht kein Publikum.'],
        s3: ['gut', 'Sam kann einen der beiden kurz rausholen: „Komm, erst mal Luft holen.“'],
        s4: ['gut', 'Wenn es körperlich wird: sofort die Pausenaufsicht holen.'],
        s5: ['top', 'Bei einem Streit auf Augenhöhe kann ein Satz von außen helfen: „Schaut doch auf den Plan an der Tür.“'],
      },
    },
    {
      id: 'meme', titel: 'Das Meme', ort: 'Klassenchat', urteil: 'mobbing', ja: ['oft', 'macht', 'absicht', 'wehrlos'], online: true,
      alle: 'Im Klassenchat taucht ein Bild auf: Yaras Gesicht auf einem Hundekörper, mit einer App gemacht. Darunter 23 Lach-Emojis.',
      sichten: {
        A: { fig: 'yara', sagt: 'Yara sagt: „Ich hab auch ein 😂 drunter gesetzt, damit keiner merkt, wie sehr es mich trifft.“', detail: 'Es gab schon drei andere Bilder. Seitdem schreibt Yara nichts mehr im Chat.', merkmal: 'oft' },
        B: { fig: 'mika', sagt: 'Mika sagt: „Das ist ein Meme. Memes macht man über alle.“', detail: 'Die Bilder kommen alle aus derselben kleinen Gruppe – und es geht immer um Yara.', merkmal: 'absicht' },
        C: { fig: 'luca', sagt: 'Luca sagt: „Ich hab’s gesehen und weitergescrollt. Was soll ich da machen?“', detail: 'Yara hat einmal „Lasst das“ geschrieben. Antwort: „Humor ist nicht deins, oder?“ – mit 12 Likes.', merkmal: 'wehrlos' },
        D: { fig: null, sagt: 'Die Lehrkraft sagt: „Ich bin nicht im Klassenchat. Ich sehe nur, dass Yara sehr still geworden ist.“', detail: '23 Leute im Chat, Yara allein dagegen. Yara hat gefragt, ob sie die Gruppe für Projekte wechseln darf.', merkmal: 'macht' },
      },
      leiter: {
        s1: ['gut', 'Hinschauen heißt hier: Screenshot als Beweis sichern – nicht weiterleiten.'],
        s2: ['gut', 'Kein Emoji drunter. Jedes Lachen macht das Bild größer.'],
        s3: ['gut', 'Luca schreibt Yara privat: „Ich find das nicht okay. Bist du okay?“'],
        s4: ['top', 'Bei Mobbing im Chat: Screenshot einer erwachsenen Person zeigen. Bilder wie dieses können sogar strafbar sein.'],
        s5: ['mutig', '„Hört auf“ in den Chat schreiben ist stark – zu zweit noch stärker, sonst wird Luca selbst zum Ziel.'],
      },
    },
    {
      id: 'keks', titel: 'Keks und Krümel', ort: 'Pausenhof', urteil: 'spass', ja: ['oft'],
      alle: 'Pause. Sam und Luca nennen sich gegenseitig „Keks“ und „Krümel“. Beide lachen, Mika und Yara auch.',
      sichten: {
        A: { fig: 'sam', sagt: 'Sam sagt: „Ich bin Keks, Luca ist Krümel. Das ist unser Ding.“', detail: 'Als Sam letzten Monat „heute nicht“ gesagt hat, hat Luca sofort aufgehört.', merkmal: 'wehrlos' },
        B: { fig: 'luca', sagt: 'Luca sagt: „Sam hat sich Keks selbst ausgesucht. Ich bin der Krümel.“', detail: 'Sam nennt Luca genauso oft „Krümel“. Es geht hin und her.', merkmal: 'macht' },
        C: { fig: 'mika', sagt: 'Mika sagt: „Alle lachen. Auch Sam – richtig, nicht gezwungen.“', detail: 'Als ein Neuer „Keks“ zu Sam sagen wollte, haben beide gesagt: „Nur wir.“', merkmal: 'absicht' },
        D: { fig: null, sagt: 'Die Lehrkraft sagt: „Die beiden sitzen nebeneinander und helfen sich oft.“', detail: 'Das geht schon seit der Grundschule so. Immer wieder – und immer gegenseitig.', merkmal: 'oft' },
      },
      leiter: {
        s1: ['reicht', 'Hinschauen reicht hier völlig. Ein Spaß, bei dem alle lachen und ein Stopp wirkt.'],
        s2: ['reicht', 'Mitlachen ist hier okay – alle lachen gern.'],
        s3: ['reicht', 'Nicht nötig. Niemand will hier weg.'],
        s4: ['reicht', 'Nicht nötig – solange keiner aufhört zu lachen.'],
        s5: ['reicht', 'Nicht nötig. Aber: Wenn einer nicht mehr lacht, wird es ein anderes Spiel.'],
      },
    },
  ];

  const LEVELS = ['Hören', 'Prüfen', 'Handeln'];
  // Fall per Tagescode: Beamer und Sicht-iPads sehen denselben (j1-e28: der Chat-Fall)
  const fallFuer = (ctx) => {
    const unit = (CREW.games.FILTER && CREW.games.FILTER.einheit) || '';
    if (unit === 'j1-e28') return FAELLE.find((f) => f.online);
    return CREW.seed.pick(FAELLE, CREW.seed.rng(ctx.code, 'vier-zeugen', 'fall'));
  };
  const lehrkraftBild = () => h('span', { class: 'vz-lk', 'aria-label': 'Lehrkraft' }, CREW.icon('user', 34));

  // Eine Sicht: was die Figur sagt + Detail, das nur diese Sicht kennt
  function sichtKarte(ctx, fall, r, o) {
    const oo = o || {};
    const S = fall.sichten[r], Z = SICHTEN[r];
    return h('div', { class: 'card stack vz-sicht', 'data-role': r },
      h('div', { class: 'row between', style: { flexWrap: 'nowrap', gap: '8px' } },
        h('div', { class: 'row', style: { gap: '10px', flexWrap: 'nowrap' } }, S.fig ? ctx.avatar(S.fig, r === 'A' ? 'traurig' : 'neutral', 56) : lehrkraftBild(), h('div', { class: 'stack', style: { gap: 0 } }, h('span', { class: 'eyebrow' }, 'Sicht ' + r + ' · ' + Z.name), h('b', null, fall.titel))),
        ctx.readBtn(S.sagt + ' ' + (oo.detail === false ? '' : 'Nur diese Sicht weiß: ' + S.detail))),
      h('p', { class: 'lead', style: { margin: 0 } }, S.sagt),
      oo.detail === false ? null : h('div', { class: 'vz-detail' }, h('span', { class: 'eyebrow' }, 'Nur diese Sicht weiß'), h('b', null, S.detail)),
      oo.hinweis ? h('p', { class: 'muted small', style: { margin: 0 } }, 'Lies vor wie eine Reporterin: „' + (S.fig ? ctx.figures[S.fig].name : 'Die Lehrkraft') + ' sagt …“ Du bist nicht diese Figur. Das Detail sagst du, wenn jemand fragt.') : null);
  }

  // Sicht per Los (Tagescode + Platz). Wer nicht mag: Beobachter:in – ohne Begründung.
  async function sichtLos(ctx) {
    let role = ctx.role && 'ABCDX'.includes(ctx.role) ? ctx.role : CREW.seed.roleOf(ctx.code, ctx.n, ctx.seat);
    if (ctx.auto && !ctx.role) role = 'ABCDX'[Math.floor(ctx.autoRng() * 5)];
    const info = role === 'X' ? { name: 'Beobachter:in', desc: 'Keine Sicht. Du achtest darauf, dass alle vier Sichten gehört werden.' } : SICHTEN[role];
    const w = ctx.scr([
      h('div', { class: 'role-card', 'data-role': role }, h('span', { class: 'role-letter display' }, role === 'X' ? '👁' : role), h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Ausgelost'), h('h2', null, role === 'X' ? info.name : 'Sicht ' + role + ' · ' + info.name), h('p', { class: 'muted' }, info.desc)), ctx.readBtn('Ausgelost: ' + info.name + '. ' + info.desc)),
      h('div', { class: 'card stack soft' }, h('b', null, 'Ausgelost über Tagescode und Platz ' + ctx.seat + '. Jede Sicht gehört einer Figur – niemand spielt sich selbst.'), h('p', { class: 'muted small', style: { margin: 0 } }, 'Diese Sicht ist dir zu nah? Dann wirst du Beobachter:in. Kein Grund nötig – die Lehrkraft liest die Sicht vor.')),
    ], { eyebrow: 'Sicht per Los', badge: h('span', { class: 'pill accent' }, 'Platz ' + ctx.seat) });
    const r = await ctx.ask(w, role === 'X' ? [{ label: 'Okay, los', value: 'ok', iconRight: 'right', id: 'vz-los-ok' }] : [{ label: 'Lieber Beobachter:in', value: 'X', variant: 'ghost', icon: 'eye', id: 'vz-los-x', auto: false }, { label: 'Okay, los', value: 'ok', iconRight: 'right', id: 'vz-los-ok' }]);
    return r === 'X' ? 'X' : role;
  }

  CREW.registerGame({
    id: 'vier-zeugen',
    template: 'T2',
    icon: 'eye',
    themen: ['Mobbing erkennen', 'Spaß, Konflikt, Mobbing', 'Perspektivenwechsel', 'Zuschauende'],
    safety: ['figuren', 'freiwillig'],
    help: true,
    // für den Test
    faelle: FAELLE, merkmale: MERKMALE,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Eine Szene, vier Sichten auf vier iPads. Erst wenn alle erzählt haben, prüft ihr: Spaß, Konflikt oder Mobbing? Und was kann die Zuschauer-Figur tun?',
        levels: LEVELS,
        steps: [
          { icon: 'users', title: 'Hören', text: 'Vier Sichten erzählen. Jede kennt ein Detail.' },
          { icon: 'shield', title: 'Prüfen', text: 'Ampel mit vier Merkmalen, dann das Urteil.' },
          { icon: 'steps', title: 'Handeln', text: 'Welche Leiter-Stufe wäre sicher?' },
        ],
        probe: ctx.T.probeCard('Probe: Zwei Freunde ärgern sich gegenseitig, beide lachen, einer sagt „Stopp“ und es hört auf. Was ist das? Tippt eins – zählt nicht.', [{ label: 'Spaß', value: 's', variant: 'ghost', icon: 'sparkle' }, { label: 'Mobbing', value: 'm', variant: 'ghost', icon: 'shield' }]),
      });

      let geraet = ctx.role ? 'sicht' : null;
      if (!geraet) {
        const wG = ctx.scr([ctx.say('Ist das hier der Beamer oder ein Sicht-iPad?', { eyebrow: 'Welches Gerät?', small: true }), h('p', { class: 'muted small' }, 'Der Beamer zeigt die Szene und die Ampel. Die Sicht-iPads zeigen je eine Sicht.')], { eyebrow: 'Vorbereitung', center: true });
        const g = await ctx.ask(wG, [{ label: 'Beamer · Lehrkraft', value: 'beamer', icon: 'eye', id: 'vz-beamer' }, { label: 'Sicht-iPad · Platz ' + ctx.seat, value: 'sicht', variant: 'ghost', icon: 'phone', id: 'vz-sicht' }], { autoPick: () => 'beamer' });
        geraet = g === 'sicht' ? 'sicht' : 'beamer';
      }

      /* ---------- Sicht-iPad: nur die eigene Sicht ---------- */
      if (geraet === 'sicht') {
        await ctx.T.codeCheck();
        const fall = fallFuer(ctx);
        const role = await sichtLos(ctx);
        const w = role === 'X'
          ? ctx.scr([h('div', { class: 'slice' }, h('b', null, 'Beobachter:in'), h('p', null, 'Szene: ' + fall.alle),
            h('ul', { class: 'stack', style: { margin: 0, paddingLeft: '1.2em' } }, h('li', null, 'Achte, dass alle vier Sichten erzählen – auch das Detail.'), h('li', null, 'Frag bei der Ampel: „Welche Sicht weiß dazu was?“'), h('li', null, 'Am Ende: Welche Sicht hat das Bild am meisten verändert?')))], { eyebrow: 'Vier Zeugen', badge: h('span', { class: 'pill accent' }, 'Beobachter:in') })
          : ctx.scr([sichtKarte(ctx, fall, role, { hinweis: true })], { eyebrow: 'Sicht ' + role, badge: h('span', { class: 'pill accent' }, 'Sicht ' + role) });
        await ctx.next(w, 'Erzählt – zum Beamer schauen');
        return { summary: 'Deine Sicht ist erzählt. Der Rest läuft am Beamer.', noSticker: true, help: true };
      }

      /* ---------- Beamer ---------- */
      const fall = fallFuer(ctx);
      const C = fall.sichten.C, CF = ctx.figures[C.fig];
      const wQ = ctx.scr([
        ctx.say('Vier Sicht-iPads: scannen – oder im Spiel „Sicht-iPad“ wählen. Die Sichten werden ausgelost. Tagescode am Beamer: ' + ctx.code + '.', { eyebrow: 'Sichten verteilen', small: true }),
        h('div', { class: 'card' }, CREW.games.qrPanel('vier-zeugen', { size: 130 })),
        h('p', { class: 'muted small' }, 'Ohne Sicht-iPads: „Am Lehrer-iPad zeigen“ – jede Sicht schaut nacheinander allein. Wer nicht lesen mag: Die Lehrkraft liest vor.'),
      ], { eyebrow: 'Vorbereitung', badge: ctx.stufe(1, LEVELS) });
      const how = await ctx.ask(wQ, [{ label: 'Am Lehrer-iPad zeigen', value: 'here', variant: 'ghost', icon: 'eyeOff', id: 'vz-here' }, { label: 'Sicht-iPads sind bereit', value: 'qr', iconRight: 'right', id: 'vz-qr' }]);
      if (how === ctx.SKIP) return { summary: 'Heute kein Fall. Nächstes Mal.', help: true };
      if (how === 'here') {
        for (const r of ['A', 'B', 'C', 'D']) {
          const c = await ctx.T.cover({ who: 'Nur Sicht ' + r + ' schaut', hint: 'Die anderen schauen weg. Sicht ' + r + ': ' + SICHTEN[r].name + '.', eyebrow: 'Sicht ' + r });
          if (c === ctx.SKIP) continue;
          const w = ctx.scr([sichtKarte(ctx, fall, r, { hinweis: true })], { eyebrow: 'Sicht ' + r, badge: h('span', { class: 'pill accent' }, 'Sicht ' + r) });
          await ctx.next(w, 'Gelesen, wegdrehen');
        }
      }

      // Level 1: Hören. Erst wenn alle vier gesprochen haben, nimmt der Beamer die Antwort an.
      const gehoert = new Set();
      const weiterId = 'vz-zur-ampel';
      let weiterBtn = null;
      const pruefeWeiter = () => { if (weiterBtn) weiterBtn.disabled = gehoert.size < 4; };
      const tiles = ['A', 'B', 'C', 'D'].map((r) => {
        const S = fall.sichten[r];
        const ok = CREW.ui.btn('Hat erzählt', () => { gehoert.add(r); ok.classList.add('good'); ok.disabled = true; pruefeWeiter(); }, { small: true, variant: 'ghost', icon: 'check', id: 'vz-gehoert-' + r });
        const vor = CREW.ui.btn('Lehrkraft liest vor', () => { CREW.ui.modal({ title: 'Sicht ' + r + ' · ' + SICHTEN[r].name, body: sichtKarte(ctx, fall, r), actions: [{ label: 'Vorgelesen', value: true, icon: 'check' }] }).then(() => ok.click()); }, { small: true, variant: 'ghost', icon: 'speaker', id: 'vz-vorlesen-' + r });
        return h('div', { class: 'vz-tile', 'data-role': r }, h('div', { class: 'row', style: { gap: '8px', flexWrap: 'nowrap' } }, S.fig ? ctx.avatar(S.fig, 'neutral', 44) : lehrkraftBild(), h('div', { class: 'stack', style: { gap: 0 } }, h('b', null, 'Sicht ' + r), h('span', { class: 'muted small' }, SICHTEN[r].name))), ok, vor);
      });
      const w1 = ctx.scr([
        h('div', { class: 'vz-szene' }, CREW.icon(fall.online ? 'phone' : 'users', 36), h('div', { class: 'stack', style: { gap: '4px', flex: '1', minWidth: 0 } }, h('span', { class: 'eyebrow' }, fall.ort + ' · Das sehen alle'), h('b', { class: 'lead' }, fall.alle)), ctx.readBtn(fall.alle)),
        h('div', { class: 'vz-tiles' }, tiles),
        ctx.say('Jede Sicht erzählt in zwei Sätzen. Jede kennt ein Detail – fragt: „Weißt du noch was, das wir nicht wissen?“', { eyebrow: 'Vier Sichten', small: true }),
        CREW.ui.teacherLine('„Hat erzählt“ antippen. Fehlt eine Sicht: „Lehrkraft liest vor“. Erst dann geht es zur Ampel.'),
      ], { eyebrow: fall.titel + ' · Hören', badge: ctx.stufe(1, LEVELS) });
      const p1 = ctx.next(w1, 'Zur Ampel', { id: weiterId });
      weiterBtn = w1.querySelector('#' + weiterId);
      pruefeWeiter();
      if (ctx.auto) ['A', 'B', 'C', 'D'].forEach((r) => w1.querySelector('#vz-gehoert-' + r).click());
      if ((await p1) === ctx.SKIP) return { summary: 'Heute nur reingeschaut.', help: true };

      // Level 2: Prüfen – Ampel mit vier Merkmalen, dann das Urteil
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt prüft ihr: Vier Merkmale als Ampel. Rot heißt „trifft zu“. Dann euer Urteil: Spaß, Konflikt oder Mobbing?' });
      const ampel = {};
      let versuche = 0, richtig = false;
      for (;;) {
        versuche++;
        const urteilId = 'vz-urteil';
        const rows = MERKMALE.map((m) => {
          const btns = [['ja', 'trifft zu'], ['unklar', 'unklar'], ['nein', 'trifft nicht zu']].map(([v, l]) => {
            const b = h('button', { type: 'button', class: 'vz-licht', 'data-licht': v, 'data-merkmal': m.id, 'aria-pressed': ampel[m.id] === v ? 'true' : 'false' }, l);
            b.addEventListener('click', () => { CREW.sound.play('tap'); ampel[m.id] = v; row.querySelectorAll('.vz-licht').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false')); pruefeAmpel(); });
            return b;
          });
          const row = h('div', { class: 'vz-merkmal' }, h('div', { class: 'stack', style: { gap: '2px', minWidth: 0 } }, h('b', null, m.label), h('span', { class: 'muted small' }, m.frage)), h('div', { class: 'vz-lichter' }, btns));
          return row;
        });
        const w2 = ctx.scr([
          h('div', { class: 'vz-ampel' }, rows),
          ctx.say('Erst die Ampel, dann das Urteil: Was ist das?', { eyebrow: 'Versuch ' + versuche, small: true }),
        ], { eyebrow: fall.titel + ' · Prüfen', badge: ctx.stufe(2, LEVELS) });
        const p2 = ctx.ask(w2, Object.keys(URTEILE).map((k) => ({ label: URTEILE[k].label, value: k, icon: URTEILE[k].icon, variant: k === 'mobbing' ? 'teamB' : k === 'konflikt' ? 'yellow' : 'good', id: urteilId + '-' + k })), { autoPick: ctx.auto && versuche >= 2 ? () => fall.urteil : undefined });
        const urteilBtns = Object.keys(URTEILE).map((k) => w2.querySelector('#' + urteilId + '-' + k));
        function pruefeAmpel() { const voll = MERKMALE.every((m) => ampel[m.id]); urteilBtns.forEach((b) => { if (b) b.disabled = !voll; }); }
        pruefeAmpel();
        if (ctx.auto) rows.forEach((row) => { const ls = row.querySelectorAll('.vz-licht'); ls[Math.floor(ctx.autoRng() * 3)].click(); });
        const u = await p2;
        if (u === ctx.SKIP) break;
        if (u === fall.urteil) { richtig = true; CREW.sound.play('great'); break; }
        // Noch nicht: nur die Sicht nennen, die man nochmal fragen sollte
        CREW.sound.play('soft');
        const falsch = MERKMALE.filter((m) => (fall.ja.includes(m.id) ? 'ja' : 'nein') !== ampel[m.id]);
        const m = falsch[0] || MERKMALE.find((x) => fall.ja.includes(x.id)) || MERKMALE[0];
        const wer = Object.keys(fall.sichten).find((r) => fall.sichten[r].merkmal === m.id);
        const wN = ctx.scr([ctx.say('Noch nicht. Fragt nochmal Sicht ' + wer + ' (' + SICHTEN[wer].name + '): Was weißt du zu „' + m.label + '“?', { eyebrow: 'Fragt nochmal nach' }), versuche >= 3 ? h('p', { class: 'muted small' }, 'Dritter Versuch – gleich kommt die Auflösung.') : null], { eyebrow: fall.titel + ' · Prüfen', center: true, badge: ctx.stufe(2, LEVELS) });
        await ctx.next(wN, versuche >= 3 ? 'Auflösung' : 'Nochmal prüfen');
        if (versuche >= 3) break;
      }

      // Auflösung: Urteil, Merkmale und welche Sicht was wusste
      const U = URTEILE[fall.urteil];
      const w3 = ctx.scr([
        h('div', { class: 'vz-urteil', 'data-urteil': fall.urteil }, CREW.icon(U.icon, 40), h('div', { class: 'stack', style: { gap: '2px' } }, h('span', { class: 'eyebrow' }, richtig ? 'Richtig erkannt' : 'Auflösung'), h('b', { class: 'display' }, U.label), h('span', null, U.text))),
        h('div', { class: 'stack vz-aufl' }, MERKMALE.map((m) => {
          const r = Object.keys(fall.sichten).find((k) => fall.sichten[k].merkmal === m.id);
          const ja = fall.ja.includes(m.id);
          return h('div', { class: 'vz-aufl-z', 'data-ja': ja ? '1' : '0' }, h('span', { class: 'vz-dot', 'aria-hidden': 'true' }), h('div', { class: 'stack', style: { gap: '2px', minWidth: 0 } }, h('b', null, m.label + ': ' + (ja ? 'trifft zu' : 'trifft nicht zu')), h('span', { class: 'small' }, 'Das wusste nur Sicht ' + r + ' (' + SICHTEN[r].name + '): ' + fall.sichten[r].detail)));
        })),
        fall.urteil === 'spass' ? h('p', { class: 'muted small' }, '„Immer wieder“ allein ist noch kein Mobbing. Es kommt auf alle vier Merkmale an.') : fall.urteil === 'konflikt' ? h('p', { class: 'muted small' }, 'Ein Konflikt ist laut – aber beide stehen auf Augenhöhe. Nicht jeder Streit ist Mobbing.') : h('p', { class: 'muted small' }, 'Von außen sah es nach Spaß aus. Erst alle vier Sichten zusammen zeigen: Das ist Mobbing.'),
      ], { eyebrow: fall.titel + ' · Auflösung', badge: ctx.stufe(2, LEVELS) });
      await ctx.next(w3, 'Was kann ' + CF.name + ' tun?');

      // Level 3: Handeln – welche Leiter-Stufe wäre für die Zuschauer-Figur sicher?
      await ctx.T.level({ n: 3, names: LEVELS, text: CF.name + ' hat zugeschaut. Welche Stufe der Leiter wäre für ' + CF.name + ' sicher – und hilft am meisten?' });
      const wL = ctx.scr([
        ctx.figureCard({ fig: C.fig, mood: 'ueberrascht', text: 'Was kann ich tun – ohne mich selbst in Gefahr zu bringen?', eyebrow: CF.name + ' · Zuschauer:in', size: 72 }),
        h('p', { class: 'muted small' }, 'Jede Stufe hilft. Stufe 1 ist keine Null. Redet kurz, dann tippt eine Person.'),
      ], { eyebrow: fall.titel + ' · Handeln', badge: ctx.stufe(3, LEVELS) });
      const st = await ctx.ask(wL, STUFEN.map((s) => ({ label: s.n + ' · ' + s.label, value: s.id, variant: 'ghost', id: 'vz-stufe-' + s.id })), { autoPick: () => Object.keys(fall.leiter).find((k) => fall.leiter[k][0] === 'top') || 's1' });
      let stufeTop = false;
      if (st !== ctx.SKIP) {
        const [wert, text] = fall.leiter[st];
        stufeTop = wert === 'top' || wert === 'reicht';
        const top = Object.keys(fall.leiter).find((k) => fall.leiter[k][0] === 'top');
        const wF = ctx.scr([
          h('div', { class: 'vz-stufe', 'data-wert': wert }, h('span', { class: 'pill' }, BEWERTUNG[wert]), h('b', { class: 'lead' }, 'Stufe ' + st.slice(1) + ' · ' + STUFEN.find((s) => s.id === st).label), h('span', null, text)),
          top && top !== st ? h('div', { class: 'card stack soft' }, h('span', { class: 'eyebrow' }, 'Hier am stärksten'), h('b', null, 'Stufe ' + top.slice(1) + ' · ' + STUFEN.find((s) => s.id === top).label), h('span', { class: 'small' }, fall.leiter[top][1])) : null,
          ctx.helpCard({ title: 'Wenn du so etwas erlebst oder siehst', text: 'Erfundener Fall – echte Hilfe. Anonym und kostenlos:' }),
        ], { eyebrow: fall.titel + ' · Handeln', badge: ctx.stufe(3, LEVELS) });
        if (stufeTop) CREW.sound.play('good');
        await ctx.next(wF, 'Weiter');
      }
      return {
        summary: richtig ? U.label + ' – erkannt mit allen vier Sichten. Erst zusammen sieht man das ganze Bild.' : 'Erst alle vier Sichten zeigen das ganze Bild. Spaß, Konflikt und Mobbing sehen von außen oft gleich aus.',
        stats: [[gehoert.size, 'Sichten gehört'], [versuche, versuche === 1 ? 'Versuch' : 'Versuche'], [stufeTop ? 1 : 0, 'starke Leiter-Stufe']],
        help: true,
      };
    },
  });
})();
