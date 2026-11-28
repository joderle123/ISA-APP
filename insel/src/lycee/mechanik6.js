// Annexe Junglinster – Mechanik für Kapitel 6 „Die Sprachnachricht“ (Heft #05 Kommunikation und Grenzen).
// Freitag 12:00: Lucas Video von Mila geht herum. Kein Abstimmen, kein Rauswurf – ein Zähler. 👁 zeigt, wie oft es gesehen wird,
// oben sieht man, wohin es wandert (7P2 → Ecke → U14). Was früh gestoppt wird, sehen wenige. Was weitergeleitet ist, sehen alle.
// Die Frage hinter allem: Was will Mila? Auch Helfen braucht ein Ja – wer zuerst fragt, weiß, was hilft.
//   ui.videoTeilen(def) → { flags, jetzt, gruppen: { id: { v, n, da, aktiv } }, wie, weg, helfer: [ids] }
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function mechanikenK6(ui, { ersetze = (t) => t, ton = () => {} } = {}) {
  const tasten = new Set();
  const halte = (f) => { const h = (e) => f(e); document.addEventListener('keydown', h, true); tasten.add(h); return h; };
  const loesche = () => { tasten.forEach((h) => document.removeEventListener('keydown', h, true)); tasten.clear(); };

  // def: {
  //   gruppe, mitglieder, post: { wer, text, bild, laenge }, untertitel: [..], duDrin,
  //   gruppen: [ { id, t, n, ab? } ]   – die erste ist der Klassenchat (von Anfang an da), die anderen kommen zur Zeit ab dazu,
  //                                      solange die vorige noch aktiv ist (gelöscht = wandert nicht weiter)
  //   nachrichten: [ { nach, wer?, text?, system?, gruppe?, wennNicht? } ],   gruppe: diese Nachricht bringt die Gruppe dazu
  //   regel: Chiara hat „Regel 2: Keine Videos ohne Ja“ (Donnerstag) – dann löscht sie sofort
  //   helfer: [ { id, wer, text } ]    – wer nach deinem Satz im Chat mitzieht (hängt an dem, was du vorher getan hast)
  //   mila: { antwort: [..] }, dauer }
  ui.videoTeilen = (def) => new Promise((ok) => {
    const G = def.gruppen.map((g, i) => ({ ...g, v: i === 0 ? 3 : 0, da: i === 0, aktiv: true }));
    const k = ui.ebeneAuf('szene', '<div class="sz sz-chat k6-video"><div class="sz-handy"><div class="ly-h-kopf">' + esc(def.gruppe) + '<small>' + esc(def.mitglieder) + ' Mitglieder · online</small></div>' +
      '<div class="k6-weg" aria-label="Wo das Video gerade ist">' + G.map((g) => '<span data-g="' + g.id + '"><b>' + esc(g.t) + '</b><small>' + g.n + '</small></span>').join('<i>→</i>') + '<strong class="k6-auge" aria-live="off" title="So oft gesehen">👁 <b>3</b></strong></div>' +
      '<div class="sz-verlauf-wrap"><div class="ly-h-verlauf sz-verlauf" aria-live="polite"></div></div><div class="ly-h-tippt" hidden></div>' +
      '<div class="sz-aktionen ly-d-optionen"></div><div class="sz-unten"><span>Lucas Video · Freitag 12:00</span><button type="button" class="ly-link" data-x="weg">Handy weg <kbd>Esc</kbd></button></div></div></div>');
    const verlauf = k.querySelector('.sz-verlauf'), leiste = k.querySelector('.sz-aktionen'), tippt = k.querySelector('.ly-h-tippt'), auge = k.querySelector('.k6-auge b');
    const flags = {}, gemacht = new Set(), schlange = [], helferDa = [];
    let t = 0, zu = false, endet = false, sheet = false, wie = null, lacher = 2, lacherAn = true, beginn = performance.now(), letzt = beginn, spielt = false;
    const tempo = (ui.ruhig ? 0.75 : 1) * (ui.zeitlos ? 0.6 : 1) * (ui.einstellungen && ui.einstellungen().text !== 'normal' ? 0.85 : 1);
    const plan = (n, ab) => schlange.push({ ...n, at: ab + (n.nach || 0) * (1 / tempo) });
    def.nachrichten.forEach((n) => plan(n, 0));

    // ---- Anzeige ----
    const summe = () => Math.round(G.reduce((s, g) => s + g.v, 0));
    const wegNeu = () => G.forEach((g) => { const el = k.querySelector('[data-g="' + g.id + '"]'); el.className = !g.da ? '' : g.aktiv ? 'da' : 'stopp'; el.querySelector('small').textContent = g.da ? Math.round(g.v) + ' / ' + g.n : g.n; });
    const unten = () => verlauf.scrollHeight - verlauf.scrollTop - verlauf.clientHeight < 60;
    const zeig = (n) => {
      if (n.wennNicht && [].concat(n.wennNicht).some((f) => flags[f])) return;
      if (n.wenn && ![].concat(n.wenn).every((f) => flags[f])) return;
      if (n.wennDa && !(G.find((x) => x.id === n.wennDa) || {}).da) return;   // nur, wenn das Video dort schon angekommen ist
      if (n.stoppGruppe) { const g = G.find((x) => x.id === n.stoppGruppe); if (g) { g.aktiv = false; wegNeu(); } }
      if (n.gruppe) { const g = G.find((x) => x.id === n.gruppe), i = G.indexOf(g); if (!g || g.da || !G[i - 1].da || !G[i - 1].aktiv) return; g.da = true; g.v = 1; ton('pling'); wegNeu(); }
      if (n.tu) n.tu();
      if (n.setzt) [].concat(n.setzt).forEach((f) => { flags[f] = true; });
      const warUnten = unten() || n.ich;
      const html = n.system ? '<div class="ly-h-sys">' + esc(ersetze(n.system)) + '</div>'
        : n.privat ? '<div class="ly-h-msg k6-privat' + (n.ich ? ' ich' : '') + '"><b>' + esc(n.ich ? 'Du → ' + n.privat : n.privat) + ' · privat</b><span>' + esc(ersetze(n.text)) + '</span></div>'
        : '<div class="ly-h-msg' + (n.ich ? ' ich' : '') + '"><b>' + esc(n.ich ? 'Du' : n.wer) + '</b><span>' + esc(ersetze(n.text)) + '</span></div>';
      if (html) verlauf.insertAdjacentHTML('beforeend', html);
      if (warUnten) verlauf.scrollTop = verlauf.scrollHeight;
      if (!n.system && !n.ich) ton('pling');
      leisteNeu();
    };
    // Das Video selbst: Vorschau, antippen = ansehen (einmal, du zählst mit)
    const P = def.post;
    verlauf.insertAdjacentHTML('beforeend', '<div class="ly-h-msg k6-post"><b>' + esc(P.wer) + '</b><button type="button" class="k6-clip" aria-label="Video ansehen"><span class="k6-clip-bild">' + esc(ersetze(P.bild)) + '</span><span class="k6-play">▶</span><small>' + esc(P.laenge) + '</small><em class="k6-ut"></em></button>' +
      '<span>' + esc(ersetze(P.text)) + '</span><i class="ly-h-reakt k6-lach">😂 2</i></div>');
    const post = verlauf.lastElementChild, clip = post.querySelector('.k6-clip'), lachEl = post.querySelector('.k6-lach');
    clip.onclick = async () => {
      if (spielt || flags.angesehen || !G[0].aktiv || endet) return;
      spielt = true; flags.angesehen = true; clip.classList.add('spielt'); const ut = clip.querySelector('.k6-ut');
      for (const z of def.untertitel || []) { ut.textContent = ersetze(z); await new Promise((r) => setTimeout(r, 1300 / tempo)); if (zu) return; }
      ut.textContent = ''; clip.classList.remove('spielt'); clip.classList.add('gesehen'); spielt = false;
      G[0].v = Math.min(G[0].n, G[0].v + 1); wegNeu(); zeig({ system: 'Gesehen von: … und dir.' });
    };
    const geloescht = (durch) => {
      if (!G[0].aktiv) return; G[0].aktiv = false; wie = wie || durch; flags.geloescht = true; lacherAn = false;
      post.classList.add('weg'); post.innerHTML = '<b>' + esc(P.wer) + '</b><span class="k6-geloescht">🚫 Dieses Video wurde gelöscht.</span>'; wegNeu();
      const weiter = G.filter((g) => g.da && g.aktiv && g !== G[0]);
      if (weiter.length) zeig({ system: 'In „' + weiter.map((g) => g.t).join('“, „') + '“ läuft es weiter.' });
    };
    const quelleStopp = () => { G.forEach((g) => { g.aktiv = false; }); wegNeu(); };

    // ---- Was man tun kann ----
    const helferLos = (ab) => {   // nach deinem Satz ziehen die mit, die dir diese Woche vertraut haben
      let tt = ab; (def.helfer || []).forEach((h) => { tt += 1.1; plan({ nach: 0, wer: h.wer, text: h.text, tu: () => { if (!helferDa.includes(h.id)) helferDa.push(h.id); } }, t + tt); });
      return tt;
    };
    const A = [
      { id: 'schreiben', sy: '✍️', t: 'Schreiben', wahl: () => [
        { t: '„Löscht das. Sie hat Nein gesagt.“', tu: () => {
          flags.kommentar = true; lacherAn = false; zeig({ ich: true, text: 'löscht das. sie hat nein gesagt.' }); G[0].v = Math.min(G[0].n, G[0].v + 1.5);
          plan({ nach: 1.4, wer: P.wer, text: 'chill. ist doch nur ein video' }, t);
          const ende = helferLos(2.2), n = (def.helfer || []).length;
          if (n >= 2) { plan({ nach: 0, wer: P.wer, text: 'ok ok 🙄' }, t + ende + 1.2); plan({ nach: 0, system: P.wer + ' hat das Video gelöscht.', tu: () => geloescht('tom') }, t + ende + 2); }
          else plan({ nach: 0, wer: P.wer, text: 'ihr seid so empfindlich 😂' }, t + ende + 1.2);
        } },
        { t: '„Luca ist so ekelhaft.“', tu: () => {
          flags.lucaBeleidigt = true; zeig({ ich: true, text: 'luca ist so ekelhaft.' }); G[0].v = Math.min(G[0].n, G[0].v + 3); lacher += 4;
          plan({ nach: 1.2, wer: P.wer, text: 'sagt hinten links 😂' }, t); plan({ nach: 2.4, wer: 'sami.lu', text: 'drama 🍿 wer hat das video, ich will’s sehen' }, t);
        } },
        { t: '„@Mila alles okay?“', tu: () => {
          flags.oeffentlichMila = true; zeig({ ich: true, text: '@Mila alles okay?' }); G[0].v = Math.min(G[0].n, G[0].v + 2);
          plan({ nach: 1.6, wer: 'unbekannt_09', text: 'mila ist eh online 👀' }, t); plan({ nach: 3.2, privat: 'Mila', text: 'bitte nicht im chat.', setzt: 'milaNein' }, t);
        } },
      ] },
      { id: 'teilen', sy: '↗️', t: 'Teilen', wennNicht: 'milaWill', wahl: () => [
        { t: 'Ecke 🔥: „Luca ist fies!“', tu: () => {
          flags.geteilt = true; const e = G[1]; zeig({ system: 'Du hast das Video weitergeleitet: ' + e.t });
          if (!e.da) { e.da = true; e.v = 0; } e.aktiv = true; e.v = Math.min(e.n, e.v + 6); wegNeu(); ton('pling');
          plan({ nach: 2.8, privat: 'Mila', text: '{name}?? bitte nicht.', setzt: 'milaNein' }, t);
        } },
        { t: 'An Mila: „Hast du das gesehen?“', tu: () => {
          flags.anMila = true; zeig({ system: 'An Mila geschickt.' });
          plan({ nach: 2.4, privat: 'Mila', text: 'ja.' }, t); plan({ nach: 4.2, privat: 'Mila', text: 'jetzt hab ich’s zweimal.', setzt: 'milaNein' }, t);
        } },
      ] },
      { id: 'melden', sy: '🚩', t: 'Melden', wahl: () => [
        { t: 'An Chiara (Admin)', tu: () => {
          flags.chiara = true; zeig({ system: '🚩 An Chiara gemeldet.' });
          if (def.regel) { plan({ nach: 1.8, wer: 'Chiara', text: 'regel 2.', wennNicht: 'geloescht' }, t); plan({ nach: 2.6, system: 'Chiara hat das Video gelöscht.', wennNicht: 'geloescht', tu: () => geloescht('chiara') }, t); }
          else { plan({ nach: 2.2, wer: 'Chiara', text: 'ist das so schlimm? 🤔', wennNicht: 'geloescht' }, t); plan({ nach: flags.noahHilft || flags.kommentar ? 6 : 10, wer: 'Chiara', text: 'ok. gelöscht.', wennNicht: 'geloescht', tu: () => geloescht('chiara') }, t); }
        } },
        { t: 'In der App: „Ohne Einverständnis“', tu: () => { flags.app = true; zeig({ system: '🚩 Gemeldet. Danke. Wir prüfen das.' }); } },
        { t: '📸 Screenshot für Herrn Kuedes', tu: () => { flags.beleg = true; ton('kamera'); zeig({ system: '📸 Screenshot gespeichert. Nur für dich.' }); } },
      ] },
      { id: 'privat', sy: '💬', t: 'Privat', wahl: () => [
        { t: 'Mila: „Was brauchst du?“', tu: () => {
          flags.gefragt = true; zeig({ privat: 'Mila', ich: true, text: 'was brauchst du?' });
          (def.mila.antwort || []).forEach((a, i) => plan({ nach: 2.2 + i * 1.9, privat: 'Mila', text: a, setzt: i === def.mila.antwort.length - 1 ? 'milaWill' : null }, t));
        } },
        { t: 'Noah: „Hilfst du mit?“', tu: () => {
          flags.noahGefragt = true; zeig({ privat: 'Noah', ich: true, text: 'hilfst du mit?' });
          plan({ nach: 2, privat: 'Noah', text: 'ja. ich meld es bei chiara.' }, t);
          plan({ nach: 3.6, system: '🚩 Noah hat das Video gemeldet.', setzt: 'noahHilft', tu: () => { if (!helferDa.includes('noah')) helferDa.push('noah'); } }, t);
          if (def.regel) { plan({ nach: 5, wer: 'Chiara', text: 'regel 2.', wennNicht: 'geloescht' }, t); plan({ nach: 5.8, system: 'Chiara hat das Video gelöscht.', wennNicht: 'geloescht', tu: () => geloescht('noah') }, t); }
          else plan({ nach: 6.2, wer: 'Chiara', text: 'noah auch? ok …', wennNicht: 'geloescht' }, t);
        } },
        { t: 'Luca: „Lösch das. Sofort.“', tu: () => {
          flags.lucaDm = true; zeig({ privat: 'Luca', ich: true, text: 'lösch das. sofort.' });
          plan({ nach: 2.4, privat: 'Luca', text: 'lol nein 😂' }, t); plan({ nach: 3.8, privat: 'Luca', text: 'ist mein video' }, t);
        } },
        // Fach-Panel K6 R1: Auf Milas Nein gibt es ein „Okay“ – mit Wirkung (die eigene Weiterleitung ist weg; was schon in U14 ist, läuft weiter)
        ...(flags.milaNein && (flags.geteilt || flags.anMila || flags.oeffentlichMila) ? [{ t: 'Mila: „Okay. Lösch ich.“', tu: () => {
          flags.okayMila = true; zeig({ privat: 'Mila', ich: true, text: 'okay. lösch ich.' });
          if (flags.geteilt && G[1].aktiv) { G[1].aktiv = false; wegNeu(); zeig({ system: 'Deine Weiterleitung in „' + G[1].t + '“ ist gelöscht.' }); }
          else zeig({ system: 'Gelöscht.' });
          plan({ nach: 2, privat: 'Mila', text: 'danke.' }, t);
        } }] : []),
      ] },
      { id: 'mitMila', sy: '🚶', t: 'Mit Mila zu Herrn Kuedes', wenn: 'milaWill', ende: true, tu: () => {
        flags.mitMila = true; zeig({ system: 'Du steckst das Handy ein. Mila steht schon auf.' }); quelleStopp();
      } },
    ];
    const leisteNeu = () => {
      if (sheet) return;
      if (endet) { leiste.innerHTML = ''; return; }
      const da = A.filter((a) => !gemacht.has(a.id) && (!a.wenn || flags[a.wenn]) && (!a.wennNicht || !flags[a.wennNicht]));
      leiste.innerHTML = da.map((a) => '<button type="button" data-ak="' + a.id + '"' + (a.ende ? ' class="k6-los"' : '') + '><kbd>' + a.sy + '</kbd><span>' + esc(a.t) + '</span></button>').join('');
      leiste.querySelectorAll('[data-ak]').forEach((b) => { b.onclick = () => aktion(A.find((a) => a.id === b.dataset.ak)); });
    };
    const aktion = (a) => {
      if (zu || endet || !a) return;
      if (a.ende) { gemacht.add(a.id); a.tu(); endet = true; schlange.length = 0; leisteNeu(); setTimeout(fertig, 1400); return; }
      const opts = a.wahl().map((w, i) => ({ ...w, i })).filter((w) => !gemacht.has(a.id + ':' + w.i));
      if (!opts.length) { gemacht.add(a.id); leisteNeu(); return; }
      sheet = true;   // Auswahl offen: die Uhr steht (wer langsam liest, verliert nichts)
      leiste.innerHTML = '<p class="k6-sheet">' + esc(a.sy + ' ' + a.t) + '</p>' + opts.map((w, n) => '<button type="button" data-w="' + w.i + '"><kbd>' + (n + 1) + '</kbd><span>' + esc(ersetze(w.t)) + '</span></button>').join('') + '<button type="button" data-w="-1"><kbd>✕</kbd><span>Doch nicht</span></button>';
      leiste.querySelectorAll('[data-w]').forEach((b) => { b.onclick = () => {
        sheet = false; const i = +b.dataset.w;
        if (i >= 0) { gemacht.add(a.id + ':' + i); const w = a.wahl()[i]; w.tu(); if (a.wahl().every((_, j) => gemacht.has(a.id + ':' + j))) gemacht.add(a.id); }
        leisteNeu();
      }; });
    };
    const fertig = () => {
      if (zu) return; zu = true; loesche();
      ui.ebeneZu();
      ok({ flags, jetzt: summe(), gruppen: Object.fromEntries(G.map((g) => [g.id, { v: Math.round(g.v), n: g.n, da: g.da, aktiv: g.aktiv }])), wie, weg: !!flags.weg, helfer: helferDa.slice() });
    };
    halte((e) => {
      if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); flags.weg = true; fertig(); }
      else if (/^Digit[1-4]$/.test(e.code) && sheet) { const b = leiste.querySelectorAll('[data-w]')[+e.code.slice(5) - 1]; if (b) { e.preventDefault(); e.stopPropagation(); b.click(); } }
    });
    k.querySelector('[data-x="weg"]').onclick = () => { flags.weg = true; fertig(); };
    wegNeu(); leisteNeu();

    const dauer = (def.dauer || 30) / tempo;
    const loop = () => {
      if (zu) return;
      const jetzt = performance.now(), roh = jetzt - letzt, dt = Math.min(0.25, roh / 1000); letzt = jetzt;
      if (sheet || spielt) { beginn += roh; requestAnimationFrame(loop); return; }
      t = (jetzt - beginn) / 1000;
      // Wachsen: jede aktive Gruppe füllt sich (große Gruppen schneller – es sind mehr Daumen)
      G.forEach((g) => { if (g.da && g.aktiv && g.v < g.n) g.v = Math.min(g.n, g.v + dt * tempo * (0.55 + g.n / 30)); });
      if (lacherAn) { lacher += dt * tempo * (0.4 + summe() / 40); lachEl.textContent = '😂 ' + Math.round(lacher); }
      auge.textContent = summe(); wegNeu();
      schlange.sort((a, b) => a.at - b.at);
      const n0 = schlange[0];
      if (n0 && (n0.wer || (n0.privat && !n0.ich)) && n0.at - 1 <= t) { tippt.hidden = false; tippt.textContent = (n0.wer || n0.privat) + ' tippt …'; } else tippt.hidden = true;
      while (schlange.length && schlange[0].at <= t) zeig(schlange.shift());
      if (!endet && t > dauer && !schlange.length) { fertig(); return; }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
}
