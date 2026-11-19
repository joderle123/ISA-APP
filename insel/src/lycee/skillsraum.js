// Annexe Junglinster – der Skills-Raum: eine Skills-Stunde als eigener, ruhiger Vollbild-Raum (die 3D-Welt tritt zurück).
// Fester Ablauf (annexe/LERNBOGEN.md): 1 Anlass · 2 Verstehen · 3 Üben · 4 Ich · 5 Merken (+ Kann-Satz-Check).
// Grundsätze: erst verstehen, dann üben; jede Rückmeldung erklärt das Warum; beim „Ich“ immer „Weiß ich nicht“ und
// „Möchte ich nicht sagen“ (nie etwas Falsches über sich anklicken müssen); keine Zwischenrufe während des Lernens.
//
// def = {
//   kap, titel, lehrer: { name, farbe },
//   anlass: 'Text' ,                                   // Situation aus der Geschichte als Frage
//   karten: [{ titel, text, punkte?: [..], beispiel?, gegen?, sy? }],   // Verstehen (blätterbar, vor und zurück)
//   uebung: { art: 'unterscheiden' | 'koerperkarte' | 'satzbau' | 'skala' | 'zuordnen', einleitung?, ... } oder eine Liste davon
//     unterscheiden: { frage, kategorien: [{ id, t, sy, f }], faelle: [{ wer, text, ziel, warum, wennDu?: { id: 'Text' }, hilfe?: [{ t, gut, warum }] }], hilfeFrage? }
//   ich: { frage, optionen: [..], mehrfach?, antwort?: (gewaehlt) => 'Text' },
//   merk: { titel, punkte: [..] },
//   check: { frage, optionen: [{ t, ok, warum }] },
// }
// → { richtig, gesamt, ich: [..] | null, check: true|false, merkkarte: { kap, titel, punkte } }

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const PHASEN = ['Anlass', 'Verstehen', 'Üben', 'Ich', 'Merken'];
// Antworten mischen: Die richtige steht nicht immer an derselben Stelle (sonst lernt man die Position, nicht den Inhalt)
const misch = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

// Körper-Silhouette mit antippbaren Zonen (für Körperkarte)
const ZONEN = {
  kopf: { t: 'Kopf', d: '<path d="M45 24 A15 16 0 0 1 75 24 Z"/>' },
  gesicht: { t: 'Gesicht', d: '<path d="M45 24 L75 24 A15 15 0 0 1 45 24 Z"/>' },
  hals: { t: 'Hals', d: '<rect x="54" y="39" width="12" height="9" rx="3"/>' },
  schultern: { t: 'Schultern / Nacken', d: '<path d="M30 57 Q36 48 54 47 L66 47 Q84 48 90 57 L88 62 L32 62 Z"/>' },
  brust: { t: 'Brust / Herz', d: '<rect x="35" y="63" width="50" height="27" rx="8"/>' },
  bauch: { t: 'Bauch', d: '<rect x="37" y="91" width="46" height="28" rx="10"/>' },
  haende: { t: 'Hände / Arme', d: '<path d="M29 59 Q21 80 19 111 Q18 120 24 121 Q30 120 30 111 L34 73 Z M91 59 Q99 80 101 111 Q102 120 96 121 Q90 120 90 111 L86 73 Z"/>' },
  beine: { t: 'Beine / Füße', d: '<path d="M40 120 L38 179 Q38 185 46 185 L52 185 L57 124 Z M80 120 L82 179 Q82 185 74 185 L68 185 L63 124 Z"/>' },
};
const koerperSvg = (aktiv = [], typisch = []) => '<svg class="sr-koerper" viewBox="0 0 120 190" role="img" aria-label="Körper">' +
  Object.entries(ZONEN).map(([id, z]) => '<g data-z="' + id + '" class="sr-zone' + (aktiv.includes(id) ? ' an' : '') + (typisch.includes(id) ? ' typ' : '') + '"><title>' + z.t + '</title>' + z.d + '</g>').join('') + '</svg>';

export function installSkillsRaum(ui, { vorlesen = () => {}, ton = () => {} } = {}) {
  ui.skillsStunde = (def) => new Promise((ok) => {
    const L = def.lehrer || { name: 'Herr Kuedes', farbe: '#3fa66b' };
    const erg = { richtig: 0, gesamt: 0, ich: null, check: false, merkkarte: def.merk ? { kap: def.kap, titel: def.merk.titel, punkte: def.merk.punkte } : null };
    const k = ui.ebeneAuf('skills', '<div class="sr"><div class="sr-kopf"><span class="sr-kicker">Skills-Stunde · Kapitel ' + esc(def.kap) + '</span><h2>' + esc(def.titel) + '</h2>' +
      '<ol class="sr-phasen">' + PHASEN.map((p, i) => '<li data-p="' + i + '">' + p + '</li>').join('') + '</ol></div><div class="sr-buehne" aria-live="polite"></div><div class="sr-fuss"></div></div>');
    const buehne = k.querySelector('.sr-buehne'), fuss = k.querySelector('.sr-fuss');
    const phase = (i) => k.querySelectorAll('.sr-phasen li').forEach((li) => { const n = +li.dataset.p; li.className = n < i ? 'fertig' : n === i ? 'jetzt' : ''; });
    const lehrer = (html) => '<div class="sr-lehrer" style="--f:' + esc(L.farbe) + '"><i>' + esc(L.name.replace(/^(Herr|Frau|Mme|M\.)\s*/, '')[0]) + '</i><div><b>' + esc(L.name) + '</b><p>' + html + '</p></div></div>';
    const knopf = (t, cls = 'ly-primaer') => new Promise((weiter) => {
      fuss.innerHTML = '<button type="button" class="ly-btn ' + cls + '" data-a="w">' + t + ' <kbd>E</kbd></button>';
      const b = fuss.querySelector('[data-a="w"]'); let aus = false;
      const los = () => { if (aus) return; aus = true; document.removeEventListener('keydown', taste, true); fuss.innerHTML = ''; weiter(); };
      const taste = (e) => { if (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) los(); } };
      document.addEventListener('keydown', taste, true); b.onclick = los; setTimeout(() => b.focus(), 50);
    });
    const wahl = (html, n, tasten = null) => new Promise((fertig) => {   // Knöpfe mit data-i; Ziffern 1–9 wählen; tasten: { Code: index }
      fuss.innerHTML = html; let aus = false;
      const los = (i) => { if (aus) return; aus = true; document.removeEventListener('keydown', taste, true); fertig(i); };
      const taste = (e) => {
        const m = /^Digit([1-9])$/.exec(e.code);
        if (m && +m[1] <= n) { e.preventDefault(); e.stopPropagation(); los(+m[1] - 1); }
        else if (tasten && e.code in tasten) { e.preventDefault(); e.stopPropagation(); if (!e.repeat) los(tasten[e.code]); }
      };
      document.addEventListener('keydown', taste, true);
      fuss.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => los(+b.dataset.i); });
    });
    const vor = (t) => { if (ui.autoVorlesen) vorlesen(t); };
    const du = (t) => '<div class="sr-du"><span>Deine Antwort</span> ' + t + '</div>';

    (async () => {
      // 1 · Anlass
      phase(0);
      buehne.innerHTML = '<div class="sr-anlass">' + lehrer(esc(def.anlass)) + '</div>';
      vor(def.anlass); await knopf('Los geht’s');

      // 2 · Verstehen: Karten, vor- und zurückblättern
      phase(1);
      for (let i = 0; i < def.karten.length;) {
        const c = def.karten[i];
        buehne.innerHTML = '<div class="sr-karte">' + (c.sy ? '<div class="sr-sy">' + c.sy + '</div>' : '') + '<h3>' + esc(c.titel) + '</h3><p>' + esc(c.text) + '</p>' +
          (c.punkte ? '<ul class="sr-punkte">' + c.punkte.map((p) => '<li>' + (Array.isArray(p) ? '<b>' + esc(p[0]) + '</b> ' + esc(p[1]) : esc(p)) + '</li>').join('') + '</ul>' : '') +
          (c.beispiel ? '<div class="sr-bsp"><b>Beispiel</b> ' + esc(c.beispiel) + '</div>' : '') + (c.gegen ? '<div class="sr-bsp sr-gegen"><b>Nicht verwechseln</b> ' + esc(c.gegen) + '</div>' : '') +
          '<div class="sr-seite">' + (i + 1) + ' / ' + def.karten.length + '</div></div>';
        vor(c.titel + '. ' + c.text);
        const r = await wahl((i > 0 ? '<button type="button" class="ly-btn" data-i="0">← Zurück</button>' : '<span></span>') + '<button type="button" class="ly-btn ly-primaer" data-i="1">' + (i + 1 < def.karten.length ? 'Weiter →' : 'Verstanden – üben') + ' <kbd>E</kbd></button>', 2,
          { KeyE: 1, Enter: 1, Space: 1, ArrowRight: 1, ArrowLeft: 0 });
        i += r === 1 ? 1 : -1; if (i < 0) i = 0;
      }

      // 3 · Üben
      phase(2);
      const u = def.uebung;
      for (const u1 of [].concat(u || [])) {
        if (u1.einleitung) { buehne.innerHTML = '<div class="sr-anlass">' + lehrer(esc(u1.einleitung)) + '</div>'; vor(u1.einleitung); await knopf('Los'); }
        await (UEBUNG[u1.art] || (async () => {}))({ u: u1, buehne, fuss, wahl, knopf, lehrer, erg, ton, vor, du });
      }

      // 4 · Ich (freiwillig, ehrlich, privat)
      if (def.ich) {
        phase(3);
        const opt = def.ich.optionen.concat(['Weiß ich nicht', 'Möchte ich nicht sagen']);
        buehne.innerHTML = '<div class="sr-ich">' + lehrer(esc(def.ich.frage) + '<small>Nur für dich. Es bleibt auf diesem Gerät. Es gibt kein Richtig oder Falsch.</small>') + '</div>';
        vor(def.ich.frage);
        if (def.ich.mehrfach) {
          const gew = new Set();
          await new Promise((fertig) => {
            fuss.innerHTML = '<div class="sr-chips">' + opt.map((o, i) => '<button type="button" class="sr-chip" data-c="' + i + '">' + esc(o) + '</button>').join('') + '</div><button type="button" class="ly-btn ly-primaer" data-a="f">Fertig</button>';
            fuss.querySelectorAll('[data-c]').forEach((b) => { b.onclick = () => { const i = +b.dataset.c; if (i >= def.ich.optionen.length) { gew.clear(); gew.add(i); } else { gew.delete(opt.length - 1); gew.delete(opt.length - 2); gew.has(i) ? gew.delete(i) : gew.add(i); } fuss.querySelectorAll('[data-c]').forEach((x) => x.classList.toggle('an', gew.has(+x.dataset.c))); }; });
            fuss.querySelector('[data-a="f"]').onclick = () => fertig();
          });
          erg.ich = [...gew].map((i) => opt[i]);
        } else {
          const i = await wahl('<div class="sr-optionen">' + opt.map((o, n) => '<button type="button" class="ly-btn" data-i="' + n + '"><kbd>' + (n + 1) + '</kbd> ' + esc(o) + '</button>').join('') + '</div>', opt.length);
          erg.ich = [opt[i]];
        }
        const keins = !erg.ich.length || /^(Weiß ich nicht|Möchte ich nicht sagen)$/.test(erg.ich[0]);
        const antwort = keins ? (erg.ich[0] === 'Möchte ich nicht sagen' ? 'In Ordnung. Du entscheidest, was du teilst. Das ist auch eine Grenze.' : 'Auch gut. Manchmal merkt man es erst später. Achte diese Woche einmal darauf.') : (def.ich.antwort ? def.ich.antwort(erg.ich) : 'Danke. Das zu wissen, ist schon ein Skill.');
        buehne.innerHTML = '<div class="sr-ich">' + lehrer(esc(antwort)) + '</div>'; vor(antwort);
        await knopf('Weiter');
      }

      // 5 · Merken + Kann-Satz-Check
      phase(4);
      if (def.merk) {
        buehne.innerHTML = '<div class="sr-merk"><span>📒 Neue Karte im Skills-Heft</span><h3>' + esc(def.merk.titel) + '</h3><ul>' + def.merk.punkte.map((p) => '<li>' + esc(p) + '</li>').join('') + '</ul></div>';
        vor(def.merk.titel + '. ' + def.merk.punkte.join('. ')); ton('pling');
        await knopf('Gemerkt');
      }
      if (def.check) {
        const c = { ...def.check, optionen: misch(def.check.optionen) };
        buehne.innerHTML = '<div class="sr-check"><span>Kann ich das?</span><h3>' + esc(c.frage) + '</h3></div>';
        const i = await wahl('<div class="sr-optionen">' + c.optionen.map((o, n) => '<button type="button" class="ly-btn" data-i="' + n + '"><kbd>' + (n + 1) + '</kbd> ' + esc(o.t) + '</button>').join('') + '</div>', c.optionen.length);
        const o = c.optionen[i], gut = c.optionen.find((x) => x.ok);
        erg.check = !!o.ok;
        buehne.innerHTML = '<div class="sr-check ' + (o.ok ? 'gut' : 'nochmal') + '"><span>' + (o.ok ? '✓ Sitzt.' : 'Fast. Schau noch einmal:') + '</span>' + (o.ok ? '' : du(esc(o.t))) + '<h3>' + esc(gut.t) + '</h3><p>' + esc(o.ok ? o.warum : (o.warum ? o.warum + ' ' : '') + gut.warum) + '</p></div>';
        vor((o.ok ? 'Sitzt. ' : '') + gut.warum);
        await knopf('Zurück in die Annexe');
      }
      ui.ebeneZu();
      ok(erg);
    })();
  });

  // ---------- Übungsarten ----------
  const UEBUNG = {
    // Fälle einer Kategorie zuordnen; jede Antwort wird erklärt (auch die richtige)
    async unterscheiden({ u, buehne, wahl, knopf, lehrer, erg, ton, vor, du }) {
      for (const [n, f] of u.faelle.entries()) {
        buehne.innerHTML = '<div class="sr-fall"><span class="sr-kicker">' + esc(u.frage) + ' · ' + (n + 1) + '/' + u.faelle.length + '</span>' + (f.wer ? '<b class="sr-wer">' + esc(f.wer) + '</b>' : '') + '<p>' + esc(f.text) + '</p></div>';
        vor(f.text);
        const i = await wahl('<div class="sr-kat">' + u.kategorien.map((c, j) => '<button type="button" class="ly-btn" data-i="' + j + '" style="--f:' + esc(c.f || '#5b6472') + '"><kbd>' + (j + 1) + '</kbd> ' + (c.sy || '') + ' ' + esc(c.t) + '</button>').join('') + '</div>', u.kategorien.length);
        const wahlK = u.kategorien[i], ziel = u.kategorien.find((c) => c.id === f.ziel), treffer = wahlK.id === f.ziel;
        erg.gesamt++; if (treffer) erg.richtig++;
        ton(treffer ? 'pling' : 'click');
        const text = (treffer ? '✓ Genau, ' + ziel.t + '. ' : 'Eher ' + ziel.t + '. ') + f.warum + (!treffer && f.wennDu && f.wennDu[wahlK.id] ? ' (' + wahlK.t + ' wäre es, ' + f.wennDu[wahlK.id] + ')' : '');
        buehne.insertAdjacentHTML('beforeend', du((wahlK.sy || '') + ' ' + esc(wahlK.t)) + '<div class="sr-rueck ' + (treffer ? 'gut' : 'eher') + '">' + lehrer(esc(text)) + '</div>');
        vor(text);
        if (f.hilfe) {   // zweiter Schritt: Was würde helfen? (auch diese Wahl wird erklärt)
          await knopf(u.hilfeFrage || 'Was würde helfen?');
          buehne.innerHTML = '<div class="sr-fall"><span class="sr-kicker">' + esc(u.hilfeFrage || 'Was würde helfen?') + '</span>' + (f.wer ? '<b class="sr-wer">' + esc(f.wer) + '</b>' : '') + '<p>' + esc(f.text) + '</p></div>';
          const hilfe = misch(f.hilfe);
          const h = hilfe[await wahl('<div class="sr-optionen">' + hilfe.map((o, j) => '<button type="button" class="ly-btn" data-i="' + j + '"><kbd>' + (j + 1) + '</kbd> ' + esc(o.t) + '</button>').join('') + '</div>', hilfe.length)];
          erg.gesamt++; if (h.gut) erg.richtig++; ton(h.gut ? 'pling' : 'click');
          const t2 = (h.gut ? '✓ ' : '') + h.warum;
          const besser = h.gut ? '' : ' Besser: „' + (f.hilfe.find((x) => x.gut) || {}).t + '“';
          buehne.insertAdjacentHTML('beforeend', du(esc(h.t)) + '<div class="sr-rueck ' + (h.gut ? 'gut' : 'eher') + '">' + lehrer(esc(t2 + besser)) + '</div>'); vor(t2);
        }
        await knopf(n + 1 < u.faelle.length ? 'Nächster Fall' : 'Weiter');
      }
    },
    // Körperkarte: je Gefühl die eigenen Zonen antippen (oder „weiß nicht“), danach die typischen Orte sehen
    async koerperkarte({ u, buehne, fuss, knopf, lehrer, erg }) {
      erg.koerper = {};
      for (const g of u.gefuehle) {
        const an = new Set();
        const zeichne = (typ = []) => {
          buehne.innerHTML = '<div class="sr-kk"><div class="sr-kk-links">' + koerperSvg([...an], typ) + '</div><div class="sr-kk-rechts"><span class="sr-kicker">Körperkarte</span><h3 style="color:' + esc(g.f || '#2b3a55') + '">' + esc(g.t) + '</h3><p>' + esc(typ.length ? g.erklaerung : u.frage.replace('{g}', g.t)) + '</p>' +
            (typ.length ? '<p class="sr-klein">Gelb umrandet: wo es viele spüren. Dein Körper darf anders sein.</p>' : '<p class="sr-klein">Tippe die Stellen an. Mehrere gehen.</p>') + '</div></div>';
          buehne.querySelectorAll('[data-z]').forEach((z) => { z.onclick = () => { if (typ.length) return; const id = z.dataset.z; an.has(id) ? an.delete(id) : an.add(id); z.classList.toggle('an', an.has(id)); }; });
        };
        zeichne();
        await new Promise((fertig) => {
          fuss.innerHTML = '<button type="button" class="ly-btn" data-a="n">Weiß ich nicht</button><button type="button" class="ly-btn ly-primaer" data-a="f">Fertig</button>';
          fuss.querySelector('[data-a="n"]').onclick = () => { an.clear(); fertig(); };
          fuss.querySelector('[data-a="f"]').onclick = () => fertig();
        });
        fuss.innerHTML = '';
        erg.koerper[g.id] = [...an];
        zeichne(g.typisch);
        await knopf('Weiter');
      }
    },
    // Satz bauen: je Lücke eine Wahl, jede Wahl bekommt einen Kommentar; am Ende der ganze Satz
    async satzbau({ u, buehne, wahl, knopf, lehrer, erg, ton, vor, du }) {
      for (const [n, s] of u.saetze.entries()) {
        const teile = [];
        for (const l0 of s.luecken) {
          const l = { ...l0, optionen: misch(l0.optionen) };
          buehne.innerHTML = '<div class="sr-fall"><span class="sr-kicker">' + esc(u.frage) + ' · ' + (n + 1) + '/' + u.saetze.length + '</span><p>' + esc(s.situation) + '</p><div class="sr-satz">' + teile.map((t) => '<span>' + esc(t) + '</span>').join(' ') + ' <i>' + esc(l.t) + ' …</i></div></div>';
          const i = await wahl('<div class="sr-optionen">' + l.optionen.map((o, j) => '<button type="button" class="ly-btn" data-i="' + j + '"><kbd>' + (j + 1) + '</kbd> ' + esc(o.t) + '</button>').join('') + '</div>', l.optionen.length);
          const o = l.optionen[i]; teile.push(o.t); erg.gesamt++; if (o.gut) erg.richtig++;
          ton(o.gut ? 'pling' : 'click');
          buehne.insertAdjacentHTML('beforeend', du(esc(o.t)) + '<div class="sr-rueck ' + (o.gut ? 'gut' : 'eher') + '">' + lehrer(esc(o.warum)) + '</div>'); vor(o.warum);
          await knopf('Weiter');
        }
        buehne.innerHTML = '<div class="sr-merk"><span>Dein Satz</span><h3>„' + esc(teile.join(' ')) + '“</h3><p>' + esc(s.schluss || '') + '</p></div>';
        await knopf(n + 1 < u.saetze.length ? 'Nächste Situation' : 'Weiter');
      }
    },
    // Skala 0–100: Situation einschätzen, dann passenden Skill wählen (Zone bestimmt, was hilft)
    async skala({ u, buehne, fuss, wahl, knopf, lehrer, erg, ton, vor, du }) {
      for (const [n, f] of u.faelle.entries()) {
        let wert = 50;
        buehne.innerHTML = '<div class="sr-fall"><span class="sr-kicker">' + esc(u.frage) + ' · ' + (n + 1) + '/' + u.faelle.length + '</span><p>' + esc(f.text) + '</p><div class="sr-skala"><input type="range" min="0" max="100" step="5" value="50"><b>50</b></div></div>';
        const r = buehne.querySelector('input'), z = buehne.querySelector('.sr-skala b');
        r.addEventListener('keydown', (e) => e.stopPropagation());
        r.oninput = () => { wert = +r.value; z.textContent = wert; z.style.color = wert < 30 ? '#3fa66b' : wert < 70 ? '#e9a23b' : '#d6452f'; };
        await knopf('So stark');
        const zone = (v) => (v < 30 ? 'gruen' : v < 70 ? 'gelb' : 'rot'), passt = zone(wert) === zone(f.wert) || Math.abs(wert - f.wert) <= 15;
        erg.gesamt++; if (passt) erg.richtig++;
        const t1 = (passt ? 'Passt gut. ' : 'Viele würden eher etwa ' + f.wert + ' sagen. ') + f.warum;
        buehne.insertAdjacentHTML('beforeend', '<div class="sr-rueck ' + (passt ? 'gut' : 'eher') + '">' + lehrer(esc(t1)) + '</div>'); vor(t1);
        const skills = misch(f.skills);
        const i = await wahl('<div class="sr-optionen">' + skills.map((s, j) => '<button type="button" class="ly-btn" data-i="' + j + '"><kbd>' + (j + 1) + '</kbd> ' + esc(s.t) + '</button>').join('') + '</div>', skills.length);
        const s = skills[i]; erg.gesamt++; if (s.gut) erg.richtig++; ton(s.gut ? 'pling' : 'click');
        buehne.insertAdjacentHTML('beforeend', du(esc(s.t)) + '<div class="sr-rueck ' + (s.gut ? 'gut' : 'eher') + '">' + lehrer(esc(s.warum)) + '</div>'); vor(s.warum);
        await knopf(n + 1 < u.faelle.length ? 'Nächster Fall' : 'Weiter');
      }
    },
    // Quiz: verschiedene Fragen mit je eigenen Antworten; jede Antwort wird erklärt (Wiederholung, ohne Noten)
    async quiz({ u, buehne, wahl, knopf, lehrer, erg, ton, vor, du }) {
      for (const [n, q0] of u.fragen.entries()) {
        const q = { ...q0, optionen: misch(q0.optionen) };
        buehne.innerHTML = '<div class="sr-fall"><span class="sr-kicker">' + esc(u.frage || 'Weißt du noch?') + ' · ' + (n + 1) + '/' + u.fragen.length + (q.kap ? ' · aus Kapitel ' + q.kap : '') + '</span><p>' + esc(q.frage) + '</p></div>';
        vor(q.frage);
        const o = q.optionen[await wahl('<div class="sr-optionen">' + q.optionen.map((x, j) => '<button type="button" class="ly-btn" data-i="' + j + '"><kbd>' + (j + 1) + '</kbd> ' + esc(x.t) + '</button>').join('') + '</div>', q.optionen.length)];
        const gut = q.optionen.find((x) => x.ok);
        erg.gesamt++; if (o.ok) erg.richtig++; ton(o.ok ? 'pling' : 'click');
        const t = (o.ok ? '✓ ' : 'Fast. Richtig ist: „' + gut.t + '“ ') + (o.ok ? o.warum || gut.warum : gut.warum);
        buehne.insertAdjacentHTML('beforeend', du(esc(o.t)) + '<div class="sr-rueck ' + (o.ok ? 'gut' : 'eher') + '">' + lehrer(esc(t)) + '</div>'); vor(t);
        await knopf(n + 1 < u.fragen.length ? 'Nächste Frage' : 'Weiter');
      }
    },
    // Geführte Übung (z. B. Bodyscan): Schritte mit ruhigem Atemkreis; läuft von selbst weiter, „Weiter“ geht schneller
    async gefuehrt({ u, buehne, fuss, vor }) {
      for (const [n, st] of u.schritte.entries()) {
        buehne.innerHTML = '<div class="sr-gef"><span class="sr-kicker">' + esc(u.titel || 'Geführte Übung') + ' · ' + (n + 1) + '/' + u.schritte.length + '</span><div class="sr-atem" style="--d:' + (u.atem || 10) + 's"><i></i></div><p>' + esc(st.t) + '</p></div>';
        vor(st.t);
        await new Promise((weiter) => {   // eigener Knopf: Zeit ODER Klick/Taste, danach alles aufräumen
          fuss.innerHTML = '<button type="button" class="ly-btn ly-primaer" data-a="w">' + (n + 1 < u.schritte.length ? 'Weiter' : 'Fertig') + ' <kbd>E</kbd></button>';
          let uhr = 0;
          const los = () => { clearTimeout(uhr); document.removeEventListener('keydown', taste, true); fuss.innerHTML = ''; weiter(); };
          const taste = (e) => { if (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); e.stopPropagation(); if (!e.repeat) los(); } };
          document.addEventListener('keydown', taste, true); fuss.querySelector('[data-a="w"]').onclick = los;
          uhr = setTimeout(los, (st.sek || 12) * 1000);
        });
      }
    },
  };
  UEBUNG.zuordnen = UEBUNG.unterscheiden;   // gleiche Mechanik, anderer Text
}
