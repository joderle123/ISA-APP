// RESPAWN – Oberfläche: Statusleiste (Jahreszeit, Druck, Geld, Handy), Erzähler und Gedanken, Wahl mit Uhr,
// Kartenziehen, freier Nachmittag, Handy (Chats, Leute, Album, Hilfe), Abschluss mit Ausgang und Akte.
// Alles eigenes DOM in #hud (Klasse hud-interactive = anklickbar); die Wahl-Kacheln kommen aus ui.ask (ui/choices.js).
import { KARTEN, KARTEN_ART, AUSGAENGE, STIMMEN, FIGUREN } from './daten/index.js';
import { JAHRESZEIT_NAME, jahreszeit, druckZone, karte, LEUTE, bond } from './run.js';
import { STIL } from './stil.js';

const BILD = { flamme: '🔥', hand: '✋', schloss: '🔒', wirbel: '🌀', schluessel: '🔑', koffer: '🧳', tasse: '☕', muenze: '🪙', muenzen: '💰',
  faehre: '⛴️', hammer: '🔨', schild: '🛡️', herz: '❤️', boot: '⛵', kreis: '🔁', nebel: '🌫️', sonne: '☀️', welle: '🌊', pad: '🎮', brett: '🛹' };
const bild = (n) => BILD[n] || '⭐';
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ART_ZEICHEN = { ruhig: '💬', nein: '✋', hilfe: '🤝', hart: '💥', weg: '🚶', mut: '🛡️' };

export function createOberflaeche({ game }) {
  const { ui } = game;
  const test = game.params && game.params.has('test');
  const root = document.getElementById('hud');
  const style = document.createElement('style');
  style.dataset.rs = '1';
  style.textContent = STIL;
  document.head.appendChild(style);
  const el = (cls, html = '', tag = 'div') => { const d = document.createElement(tag); d.className = cls; d.innerHTML = html; return d; };
  const nameVon = (id) => (game.npcs && game.npcs.get(id) && game.npcs.nameOf ? game.npcs.nameOf(id) : (FIGUREN[id] || STIMMEN[id] || {}).name) || id;

  // ---------- Statusleiste ----------
  const leiste = el('rs-leiste hud-interactive is-hidden', `
    <span class="rs-jz" data-jz></span><span class="rs-kraft" data-kraft title="Kraft für heute"></span>
    <span class="rs-druck" title="Druck"><b>Druck</b><i><u data-druck></u></i></span>
    <span class="rs-geld" data-geld></span>
    <button class="rs-handy" type="button" data-handy aria-label="Handy">📱<em data-neu hidden></em></button>`);
  root.appendChild(leiste);
  const rot = el('rs-rot'); root.appendChild(rot);
  const meld = el('rs-meld'); root.appendChild(meld);
  let handyAuf = () => {};
  leiste.querySelector('[data-handy]').addEventListener('click', () => handyAuf());

  function status(R) {
    if (!R) { leiste.classList.add('is-hidden'); rot.className = 'rs-rot'; return; }
    leiste.classList.remove('is-hidden');
    leiste.querySelector('[data-jz]').textContent = JAHRESZEIT_NAME[jahreszeit(R)] + ' · Tag ' + ((R.tag || 0) + 1);
    leiste.querySelector('[data-kraft]').textContent = '⚡'.repeat(Math.max(0, R.kraft || 0)) + '·'.repeat(Math.max(0, 3 - (R.kraft || 0)));
    const u = leiste.querySelector('[data-druck]');
    u.style.width = Math.max(3, R.druck) + '%';
    const z = druckZone(R.druck);
    leiste.dataset.zone = z;
    rot.className = 'rs-rot' + (z === 'rot' ? ' is-rot' : z === 'gelb' ? ' is-gelb' : '');
    leiste.querySelector('[data-geld]').textContent = R.geld + ' €';
    leiste.querySelector('[data-neu]').hidden = !(R.chats || []).some((c) => !c.gelesen);
  }
  function melde(text, cls = '') {
    const m = el('rs-m ' + cls, esc(text));
    meld.appendChild(m);
    setTimeout(() => m.classList.add('is-weg'), 2200);
    setTimeout(() => m.remove(), 2700);
  }
  // Was eine Wahl ausgelöst hat – ohne Zahlen: Pfeile und „merkt sich das“
  function wirkung(a, R) {
    if (!a) return;
    if (a.druck >= 5) melde('Druck steigt', 'ist-hoch'); else if (a.druck <= -5) melde('Druck sinkt', 'ist-runter');
    if (a.geld) melde((a.geld > 0 ? '+' : '') + a.geld + ' Euro', a.geld > 0 ? 'ist-runter' : 'ist-hoch');
    for (const [wer, d] of Object.entries(a.bond || {})) if (d) melde(nameVon(wer) + (d > 0 ? ' merkt sich das.' : ' vergisst das nicht.'), d > 0 ? 'ist-gut' : 'ist-schlecht');
    status(R);
    game.events.emit('respawn:wirkung', a);
  }

  // ---------- Erzähler und Gedanken (antippen = weiter) ----------
  function zeile(cls, html, { kurz = false } = {}) {
    return new Promise((resolve) => {
      const z = el('rs-zeile hud-interactive ' + cls, html + '<span class="rs-weiter">▸</span>');
      root.appendChild(z);
      requestAnimationFrame(() => z.classList.add('is-da'));
      let fertig = false;
      const zu = () => { if (fertig) return; fertig = true; z.classList.remove('is-da'); window.removeEventListener('keydown', taste, true); game.events.off('respawn:weiter', zu); setTimeout(() => { z.remove(); resolve(); }, test ? 0 : 160); };
      const taste = (e) => { if (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyE') { e.preventDefault(); e.stopPropagation(); zu(); } };
      z.addEventListener('click', zu);
      game.events.on('respawn:weiter', zu);
      setTimeout(() => window.addEventListener('keydown', taste, true), 250);
      if (test) setTimeout(zu, 20); else if (kurz) setTimeout(zu, 1500);
    });
  }
  const erzaehler = (text, o) => zeile('ist-erz', `<p>${esc(text)}</p>`, o);
  const gedanke = (text, k) => zeile('ist-ged' + (k ? ' hat-karte' : ''), (k ? `<small style="color:${k.farbe}">${bild(k.bild)} ${esc(k.name)}</small>` : '<small>Du denkst</small>') + `<p>${esc(text)}</p>`);

  // ---------- Wahl ----------
  async function wahl({ frage, items, sekunden = 0, standard = 0 }) {
    const p = ui.ask({
      prompt: frage || undefined, system: { rueckzug: false, hilfe: false }, read: false,
      items: items.map((it, i) => ({
        id: 'w' + i, label: it.label, icon: 'sprechblase', tone: 'rs-' + it.art + (it.karte ? ' rs-karte' : ''), disabled: it.gesperrt,
        sub: it.gesperrt ? '🔒 ' + it.sub : (it.karte ? bild(it.karte.bild) + ' ' + it.karte.name : it.sub || ''), color: it.karte ? it.karte.farbe : undefined,
      })),
    });
    const cur = ui.choices.current;
    if (cur && cur.el) {
      cur.el.classList.add('rs-wahl');
      cur.el.querySelectorAll('.choice').forEach((b, i) => { const ic = b.querySelector('.choice-icon'); if (ic && items[i]) ic.textContent = ART_ZEICHEN[items[i].art] || '💬'; });
    }
    let uhr = false, timer = 0;
    if (sekunden > 0 && !test && cur && cur.el) {
      const bar = el('rs-uhr', '<i></i>');
      cur.el.insertBefore(bar, cur.el.firstChild);
      bar.firstChild.style.animationDuration = sekunden + 's';
      timer = setTimeout(() => { uhr = true; ui.choices.cancel('uhr'); }, sekunden * 1000);
    }
    const r = await p;
    clearTimeout(timer);
    if (uhr || r.cancelled) return { index: standard, uhr: uhr };
    return { index: r.index, uhr: false };
  }

  // ---------- Vollbild-Karten (Jahreszeit, Kartenziehen, Freizeit, Abschluss) ----------
  function voll(cls, html) {
    const v = el('rs-voll hud-interactive ' + cls, html);
    root.appendChild(v);
    requestAnimationFrame(() => v.classList.add('is-da'));
    ui.lock.acquire('rs-voll');
    return { el: v, zu() { v.classList.remove('is-da'); ui.lock.release('rs-voll'); setTimeout(() => v.remove(), test ? 0 : 320); } };
  }
  function titelkarte(gross, klein) {
    return new Promise((resolve) => {
      const v = voll('ist-titel', `<div class="rs-tk"><small>${esc(klein || '')}</small><h2>${esc(gross)}</h2></div>`);
      const zu = () => { v.zu(); resolve(); };
      v.el.addEventListener('click', zu);
      setTimeout(zu, test ? 10 : 2200);
    });
  }
  const karteHtml = (art, k, extra = '') => `
    <div class="rs-karte" style="--kf:${k.farbe}" data-art="${art}" data-id="${k.id}">
      <small>${esc(KARTEN_ART[art])}</small><span class="rs-kb">${bild(k.bild)}</span><h3>${esc(k.name)}</h3>
      <p class="rs-schwer">${esc(k.schwer)}</p><p class="rs-stark">${esc(k.stark)}</p>${extra}</div>`;

  function kartenZiehen({ ziehe }) {
    return new Promise((resolve) => {
      let k = ziehe(), selbst = false;
      const v = voll('ist-karten', '');
      const zeichne = () => {
        v.el.innerHTML = `<div class="rs-kz"><h2>Deine Karten</h2><p class="rs-lead">${selbst ? 'Tippe eine Karte an, um sie zu wechseln.' : 'Damit startest du. Ausgesucht hast du es dir nicht.'}</p>
          <div class="rs-reihe">${['kopf', 'zuhause', 'tasche'].map((art) => karteHtml(art, karte(art, k[art]))).join('')}</div>
          <div class="rs-knoepfe"><button type="button" data-k="neu">Neu ziehen</button><button type="button" data-k="selbst">${selbst ? 'Fertig gewählt' : 'Selbst wählen'}</button><button type="button" class="ist-haupt" data-k="los">So spiele ich</button></div></div>`;
        v.el.querySelector('.rs-kz').classList.toggle('ist-selbst', selbst);
      };
      zeichne();
      v.el.addEventListener('click', (e) => {
        const b = e.target.closest('[data-k]'), c = e.target.closest('.rs-karte');
        if (b) {
          if (b.dataset.k === 'neu') { k = ziehe(); zeichne(); }
          else if (b.dataset.k === 'selbst') { selbst = !selbst; zeichne(); }
          else { v.zu(); resolve(k); }
        } else if (c && selbst) {
          const art = c.dataset.art, l = KARTEN[art], i = l.findIndex((x) => x.id === k[art]);
          k = { ...k, [art]: l[(i + 1) % l.length].id }; zeichne();
        }
      });
      const ab = game.events.on('respawn:karten', (wahl) => { ab(); if (wahl) k = { ...k, ...wahl }; v.zu(); resolve(k); });
      v.el.addEventListener('click', (e) => { if (e.target.closest('[data-k="los"]')) ab(); });
    });
  }

  function freizeit(angebote, R) {
    return new Promise((resolve) => {
      const v = voll('ist-frei', `<div class="rs-kz"><h2>Freier Nachmittag</h2><p class="rs-lead">${esc(JAHRESZEIT_NAME[jahreszeit(R)])}. Was machst du?</p>
        <div class="rs-reihe">${angebote.map((a) => `<button type="button" class="rs-frei" data-f="${a.id}"><span class="rs-kb">${bild(a.bild)}</span><b>${esc(a.titel)}</b></button>`).join('')}</div></div>`);
      const nimm = (id) => { ab(); v.zu(); resolve(id); };
      const ab = game.events.on('respawn:frei', (id) => nimm(id || angebote[0].id));
      v.el.addEventListener('click', (e) => { const b = e.target.closest('[data-f]'); if (b) nimm(b.dataset.f); });
    });
  }

  // ---------- Album ----------
  const albumHtml = (meta) => `<div class="rs-album">${AUSGAENGE.map((a) => {
    const da = (meta.ausgaenge || {})[a.id];
    return `<div class="rs-aus${da ? ' ist-da' : ''}" style="--kf:${a.farbe}"><span class="rs-kb">${da ? bild(a.bild) : '❔'}</span><b>${da ? esc(a.titel) : '???'}</b><small>${da ? da + '×' : esc(a.hinweis)}</small></div>`;
  }).join('')}</div><p class="rs-lead">${Object.keys(meta.ausgaenge || {}).length} von ${AUSGAENGE.length} Ausgängen gefunden.</p>`;

  // ---------- Abschluss ----------
  function abschluss({ ausgang, akte, leer, andere, meta, neu }) {
    return new Promise((resolve) => {
      const zeilen = akte.length ? akte.map((a) => `<tr><td>${esc(a.amt)}</td><td>${esc(a.echt)}</td></tr>`).join('') : `<tr><td>${esc(leer.amt)}</td><td>${esc(leer.echt)}</td></tr>`;
      const v = voll('ist-ende', `<div class="rs-ende">
        <div class="rs-ausgang" style="--kf:${ausgang.farbe}"><small>${neu ? 'Neuer Ausgang' : 'Ausgang'}</small><span class="rs-kb">${bild(ausgang.bild)}</span><h2>${esc(ausgang.titel)}</h2>${ausgang.text.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
        <div class="rs-akte"><h3>Deine Akte</h3><table><thead><tr><th>Das steht drin</th><th>Das war wirklich</th></tr></thead><tbody>${zeilen}</tbody></table></div>
        ${andere.length ? `<div class="rs-andere"><h3>Die andere Seite</h3>${andere.map((a) => `<details><summary>${esc(a.name)} · ${esc(a.titel)}</summary>${a.zeilen.map((z) => `<p>„${esc(z)}“</p>`).join('')}</details>`).join('')}</div>` : ''}
        <div class="rs-knoepfe"><button type="button" data-e="album">Album</button><button type="button" class="ist-haupt" data-e="nochmal">Nochmal – andere Karten</button></div></div>`);
      v.el.addEventListener('click', (e) => {
        const b = e.target.closest('[data-e]'); if (!b) return;
        if (b.dataset.e === 'album') { ui.overlay.open({ id: 'rs-album', title: 'Album', kind: 'panel', content: albumHtml(meta) }); return; }
        ab(); v.zu(); resolve('nochmal');
      });
      const ab = game.events.on('respawn:ende', () => { ab(); v.zu(); resolve('nochmal'); });
    });
  }

  // ---------- Start ----------
  function start({ meta, laufend }) {
    return new Promise((resolve) => {
      const v = voll('ist-start', `<div class="rs-start"><h1>RESPAWN</h1><p class="rs-lead">Ein Jahr auf der Insel. Dann nochmal. Anders.</p>
        <div class="rs-knoepfe ist-spalte">${laufend ? '<button type="button" class="ist-haupt" data-s="weiter">Weiterspielen</button>' : ''}
          <button type="button" class="${laufend ? '' : 'ist-haupt'}" data-s="neu">Neue Runde</button>
          <button type="button" data-s="aussehen">Aussehen</button><button type="button" data-s="album">Album (${Object.keys(meta.ausgaenge || {}).length}/${AUSGAENGE.length})</button></div>
        <p class="rs-klein">Du darfst alles ausprobieren. Nichts hier wird bewertet oder gespeichert, außer auf diesem Gerät.</p></div>`);
      v.el.addEventListener('click', (e) => {
        const b = e.target.closest('[data-s]'); if (!b) return;
        if (b.dataset.s === 'album') { ui.overlay.open({ id: 'rs-album', title: 'Album', kind: 'panel', content: albumHtml(meta) }); return; }
        ab(); v.zu(); resolve(b.dataset.s);
      });
      const ab = game.events.on('respawn:start', (was) => { ab(); v.zu(); resolve(was || 'neu'); });
    });
  }

  // ---------- Handy ----------
  function handy(R, meta, welt) {
    const seiten = {
      heute: () => {
        const w = welt ? welt() : { ereignisse: [], orte: [] };
        return (w.ereignisse.length ? '<h4>Heute los</h4>' + w.ereignisse.map((x) => `<button type="button" class="rs-hin" data-hin="e:${x.id}"><b>❗ ${esc(x.titel)}</b><small>${esc(x.wo)} · hinbringen</small></button>`).join('') : '<p class="rs-lead">Heute steht nichts an. Mach, was du willst.</p>')
          + '<h4>Orte</h4>' + w.orte.map((x) => `<button type="button" class="rs-hin" data-hin="o:${x.id}"><b>${x.bild} ${esc(x.name)}</b><small>hinbringen</small></button>`).join('');
      },
      chats: () => ((R.chats || []).length ? (R.chats || []).slice().reverse().map((c) => `<div class="rs-chat"><b>${esc(nameVon(c.von))}</b><p>${esc(c.text)}</p></div>`).join('') : '<p class="rs-lead">Noch keine Nachrichten.</p>'),
      leute: () => LEUTE.concat(['yara', 'maelle', 'tiago']).filter((w) => R.bond[w] !== undefined).map((w) => { const b = bond(R, w); return `<div class="rs-leut"><b>${esc(nameVon(w))}</b><i class="${b < 0 ? 'ist-minus' : ''}">${'●'.repeat(Math.min(5, Math.abs(b)))}${'○'.repeat(5 - Math.min(5, Math.abs(b)))}</i><small>${b >= 3 ? 'steht zu dir' : b >= 1 ? 'mag dich' : b < 0 ? 'ist sauer' : 'kennt dich kaum'}</small></div>`; }).join('') || '<p class="rs-lead">Du kennst hier noch niemanden.</p>',
      karten: () => `<div class="rs-reihe ist-klein">${['kopf', 'zuhause', 'tasche'].map((art) => karteHtml(art, karte(art, R.karten[art]))).join('')}</div>`,
      album: () => albumHtml(meta),
      hilfe: () => `<div class="rs-hilfe"><p>Das hier ist ein Spiel. Geht es dir im echten Leben nicht gut?</p><p><b>116 111</b> – Kanner-Jugendtelefon. Kostenlos, anonym.</p><p><b>112</b> – Notfall.</p><p>Oder sprich mit einem Erwachsenen, dem du traust.</p></div>`,
    };
    const namen = { heute: 'Heute', chats: 'Chats', leute: 'Leute', karten: 'Karten', album: 'Album', hilfe: 'Hilfe' };
    ui.overlay.open({
      id: 'rs-handy', title: 'Handy', kind: 'panel', cls: 'rs-handy-ov',
      content: (body, griff) => {
        let seite = (R.chats || []).some((c) => !c.gelesen) ? 'chats' : 'heute';
        body.addEventListener('click', (e) => { const h = e.target.closest('[data-hin]'); if (h && welt) { griff.close('hin'); welt().hin(h.dataset.hin); } });
        const z = () => {
          body.innerHTML = `<div class="rs-tabs">${Object.keys(seiten).map((s) => `<button type="button" data-t="${s}" class="${s === seite ? 'ist-an' : ''}">${namen[s]}</button>`).join('')}</div><div class="rs-seite">${seiten[seite]()}</div>`;
        };
        body.addEventListener('click', (e) => { const b = e.target.closest('[data-t]'); if (b) { seite = b.dataset.t; z(); } });
        z();
        (R.chats || []).forEach((c) => { c.gelesen = true; });
        status(R);
      },
    });
  }

  return {
    status, wirkung, melde, erzaehler, gedanke, wahl, titelkarte, kartenZiehen, freizeit, abschluss, start,
    handy(R, meta, welt) { handy(R, meta, welt); },
    setzeHandy(fn) { handyAuf = fn; },
  };
}
