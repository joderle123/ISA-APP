// Annexe Junglinster – mit Dingen etwas machen (Auftrag 17.11.: „sich setzen … wirklich mit den Dingen interagieren“).
// In der Nähe eines Gegenstands erscheint der Knopf (E / Finger): hinsetzen (jeder Stuhl, jede Bank, Rundbank,
// Sitzstufen, Tribüne), am eigenen Platz oder im Lesesaal ein Arbeitsblatt bearbeiten, Spind, Snackautomat, Brunnen,
// Klavier, Keyboard, Schlagzeug, Bücher, Pinnwand, Gießkanne, Freiwürfe. Kleine Folgen, keine Bewertung.

const BUECHER = [
  ['„Die Welle“', 'Ein Lehrer startet ein Experiment. Es läuft aus dem Ruder.'],
  ['„Wunder“', 'Auggie kommt zum ersten Mal in eine Schule. Alle schauen.'],
  ['„Tschick“', 'Zwei Jungs, ein geklautes Auto, ein Sommer.'],
  ['Atlas Luxemburg', 'Auf Seite 12 hat jemand Junglinster eingekreist.'],
  ['„Rico, Oskar und die Tieferschatten“', 'Rico denkt anders. Und findet trotzdem alles raus.'],
  ['Kochbuch „Schnell und billig“', 'Eselsohr bei: Nudeln mit Tomatensoße.'],
  ['Comic-Band 7', 'Band 6 fehlt. Seit 2019.'],
  ['„Fußball-Regeln für Anfänger“', 'Abseits wird auf Seite 4 erklärt. Ganz ehrlich: dreimal lesen.'],
  ['Lexikon der Tiere', 'Ein Lesezeichen bei „Axolotl“. Die können Beine nachwachsen lassen.'],
  ['„Mut ist, wenn …“', 'Ein dünnes Heft. Jemand hat Sätze unterstrichen.'],
];
import { PINNWAND, KRITZELEIEN, FUNDKISTE } from './welttexte.js';
import { leseEcke, HEFTE } from './lesestoff.js';
const SNACKS = ['Schokoriegel', 'Chips (Paprika)', 'Gummibärchen', 'Kekse', 'Wasser'];

export const KABEL = [['cdi', 14, -62.4], ['kantine', 18.6, -8.2], ['gang', -15.5, -15.8], ['innenhof', -17.2, -44.9], ['skate', -36.4, 6.4]];
export function createInteraktionen({ welt, steuerung, ui, zustand, sichern, ton, blattWahl, freiwurf, skate, spindAuf = null, partner = () => null, freund = () => {}, onKabel = null }) {
  const tt = welt.orte.tischtennis;
  const liste = [];
  const dazu = (x, z, r, text, tu, extra = {}) => liste.push({ x, z, r, text, tu, ...extra });
  // Sitzen: alle Stühle und Bänke
  for (const s of welt.sitze || []) dazu(s.x, s.z, s.bank ? 0.85 : 0.75, 'Hinsetzen', 'sitzen', { yaw: s.rot });
  // Arbeiten: eigener Platz in Saal 1.04, Lesesaal, CDI
  const platz = welt.orte.meinPlatz;
  if (platz) dazu(platz.x, platz.z, 1.0, 'Arbeitsblatt bearbeiten', 'arbeiten', { prio: 2, sitz: { x: platz.x, z: platz.z, yaw: -Math.PI / 2 } });
  for (const [x, z] of [[9, -64.5], [19, -64.5], [9, -59.5], [19, -59.5]]) dazu(x, z - 1.15, 0.9, 'Hier lernen', 'arbeiten', { prio: 2, sitz: { x, z: z - 1.15, yaw: 0 } });
  // Dinge
  dazu(-7.4, -3.1, 1.3, 'Snack ziehen (50 Cent)', 'automat', { prio: 1 });
  dazu(-8, 18, 2.5, 'Hand ins Wasser', 'brunnen', { prio: 1 });
  dazu(-25.3, -17.2, 1.0, 'Deinen Spind öffnen', 'spind', { prio: 1 });
  dazu(-7.3, -65.6, 1.6, 'Klavier spielen', 'klavier', { prio: 1 });
  dazu(49.3, -60.0, 1.3, 'Keyboard spielen', 'keyboard', { prio: 1 });
  dazu(58, -58.8, 1.4, 'Bandprobe mit Ayla', 'schlagzeug', { prio: 1 });
  for (let x = 4; x < 28; x += 4) dazu(x, -71.0, 1.2, 'Lese-Ecke: Comics und Geschichten', 'buch', { prio: 1 });
  for (let z = -70; z < -58; z += 4) dazu(29.0, z, 1.2, 'Lese-Ecke: Comics und Geschichten', 'buch', { prio: 1 });
  dazu(-6.8, -9, 1.4, 'Pinnwand lesen', 'pinnwand', { prio: 1 });
  dazu(45, -1.8, 1.3, 'In die Fundkiste schauen', 'fundkiste', { prio: 1 });
  dazu(-24.5, 42.6, 1.2, 'Kritzeleien lesen', 'kritzelei', { prio: 0, wo: 'bus' });
  dazu(-26.35, -27.2, 0.8, 'Kritzelei auf dem Tisch', 'kritzelei', { prio: 0, wo: 'tisch' });
  dazu(19.4, -44.6, 1.2, 'Pflanzen gießen', 'giessen', { prio: 1 });
  dazu(29, 12.5, 2.2, 'Freiwürfe werfen', 'korb', { prio: 1 });
  dazu(29, 25.5, 2.2, 'Freiwürfe werfen', 'korb', { prio: 1 });
  for (const x of [47.4, 52.6, 57.8]) dazu(x, -43.85, 0.9, 'Am Computer', 'computer', { prio: 1 });
  if (skate) dazu(-29.6, 5.2, 1.5, 'Skateboard fahren', 'skate', { prio: 1 });
  if (tt) dazu(tt.x - 1.3, tt.z, 1.2, 'Tischtennis spielen', 'tischtennis', { prio: 1 });
  // Easter Eggs: Herrn Mesenbergs verlorene Ladekabel (5 Stück), Kritzeleien im WC, die Ente im Brunnen
  for (const [id, x, z] of KABEL) dazu(x, z, 1.0, 'Ein Ladekabel? Aufheben', 'kabel', { prio: 2, kabel: id });
  dazu(25.2, -26.4, 1.1, 'Kritzeleien an der Wand', 'kritzelei', { prio: 0, wo: 'wc' });

  function naechste(p) {
    if (steuerung.sitzt) return null;
    let best = null, bd = Infinity;
    for (const i of liste) {
      if (i.tu === 'sitzen' && steuerung.tempo > 1.2) continue;
      if (i.tu === 'kabel' && ((zustand().merke || {}).kabel || []).includes(i.kabel)) continue;   // beim Laufen kein Flackern von „Hinsetzen“ an jedem Stuhl
      const d = Math.hypot(i.x - p.x, i.z - p.z);
      if (d > i.r) continue;
      const w = d - (i.prio || 0) * 0.4;   // Dinge mit Vorrang (Arbeitsblatt, Automat) vor dem Stuhl daneben
      if (w < bd) { bd = w; best = i; }
    }
    return best;
  }

  const S = () => zustand();
  async function tu(i) {
    const s = S(); s.merke = s.merke || {};
    switch (i.tu) {
      case 'sitzen': steuerung.setzen(i.x, i.z, i.yaw); return;
      case 'arbeiten': steuerung.setzen(i.sitz.x, i.sitz.z, i.sitz.yaw); await blattWahl(); return;
      case 'kabel': {
        const k = s.merke.kabel = (s.merke.kabel || []); if (!k.includes(i.kabel)) k.push(i.kabel); sichern(); ton('pling'); onKabel && onKabel(i.kabel);
        ui.toast('<b>🔌 Ladekabel ' + k.length + ' von ' + KABEL.length + '</b><span>' + (k.length >= KABEL.length ? 'Alle! Herr Mesenberg wird weinen. Vor Freude.' : 'Auf dem Kabel steht: „Eigentum M.“ Schon wieder.') + '</span>', 'ly-t-ent');
        return;
      }
      case 'automat': {
        s.merke.automat = (s.merke.automat || 0) + 1; sichern();
        if (s.merke.automat % 7 === 0) { ton('pling'); setTimeout(() => ton('pling'), 250); ui.toast('<b>🎰 Doppelt!</b><span>Zwei Snacks auf einmal. Der Automat mag dich heute.</span>', 'ly-t-ent'); return; }
        if ((s.merke.automat * 7) % 10 < 4) { ton('klack'); ui.toast('<b>Klack.</b><span>Die Münze ist weg. Der Automat brummt zufrieden.</span>'); }
        else { ton('pling'); ui.toast('<b>' + SNACKS[s.merke.automat % SNACKS.length] + '</b><span>Fällt. Gerettet.</span>'); }
        return;
      }
      case 'brunnen': {
        ton('platsch'); const n = s.merke.brunnen = (s.merke.brunnen || 0) + 1;
        if (n === 3 && !s.merke.ente) { s.merke.ente = true; sichern(); ui.toast('<b>🦆 Eine Gummiente!</b><span>Sie trägt eine Krawatte. Mit Punkten. Kommt dir bekannt vor.</span>', 'ly-t-ent'); return; }
        sichern(); ui.toast(n > 3 ? '<b>Die Ente nickt dir zu.</b><span>Sie schwimmt weiter ihre Runden. Würdevoll.</span>' : '<b>Kalt!</b><span>Kurz wach. Jemand hinter dir lacht – nicht über dich, über den Spritzer.</span>'); return;
      }
      case 'spind': if (!s.stundenplan && !(s.frei && s.frei.spind)) { ton('klack'); ui.toast('<b>Spind 117</b><span>Zahlenschloss. Den Code gibt’s im Sekretariat.</span>'); return; }
        if (spindAuf) { ton('klack'); await spindAuf(); return; }
        ui.toast('<b>Spind 117</b><span>Turnbeutel, Mathebuch, dein Stundenplan mit Kaffeefleck. Und eine sehr alte Banane.</span>'); return;
      case 'klavier': ton('melodie'); ui.toast('<b>Klavier</b><span>Drei Töne. Dann noch drei. Im Saal klingt alles größer.</span>'); return;
      case 'keyboard': ton('melodie2'); ui.toast('<b>Keyboard</b><span>Du findest den Knopf „Demo“. Jetzt spielt es Samba.</span>'); return;
      case 'schlagzeug': {
        if (!ui.bandprobe) { ton('trommel'); return; }
        const r = await ui.bandprobe(); const pz = Math.round(r.treffer / Math.max(1, r.gesamt) * 100);
        const alt = s.merke.bandRekord || 0; s.merke.bandRekord = Math.max(alt, pz); s.merke.bandMal = (s.merke.bandMal || 0) + 1; sichern();
        freund('ayla', 4, 'spiel');
        const satz = pz >= 90 ? 'Okay. Du bist jetzt in der Band. Kein Witz.' : pz >= 70 ? 'Fast tight. Noch zwei Proben, dann Bühne.' : pz >= 40 ? 'Laut warst du. Das ist schon mal was.' : 'Wir nennen es Jazz. Nochmal?';
        ui.toast('<b>' + pz + ' % im Takt</b><span>Ayla: „' + satz + '“ · ' + (pz > alt ? 'Neuer Rekord!' : 'Dein Rekord: ' + s.merke.bandRekord + ' %') + '</span>', 'ly-t-herz');
        return;
      }
      case 'buch': {
        s.merke.buecher = (s.merke.buecher || 0) + 1;
        const r = await leseEcke(ui, s.merke.gelesen || []); s.merke.gelesen = r.gelesen; sichern();
        if (r.neu) { const h = HEFTE.find((x) => x.id === r.neu); ui.toast('<b>Gelesen: ' + h.titel + '</b><span>' + r.gelesen.length + ' von ' + HEFTE.length + ' Heften in der Lese-Ecke.</span>'); }
        else if (!r.gelesen.length) { const b = BUECHER[(s.merke.buecher * 3) % BUECHER.length]; await ui.bild(b[0], b[1], 3.2); }
        return; }
      case 'pinnwand': { const n = s.merke.pinnwand = ((s.merke.pinnwand || 0) + 1); sichern(); await ui.bild('Pinnwand', PINNWAND[(n - 1) % PINNWAND.length].join(' · '), 4.5); return; }
      case 'fundkiste': { const n = s.merke.fundkisteBlick = ((s.merke.fundkisteBlick || 0) + 1); sichern(); ui.toast('<b>Fundkiste</b><span>' + FUNDKISTE[(n - 1) % FUNDKISTE.length] + '</span>'); return; }
      case 'kritzelei': { const l = KRITZELEIEN[i.wo] || KRITZELEIEN.tisch; const k = 'kritzel_' + i.wo; const n = s.merke[k] = ((s.merke[k] || 0) + 1); sichern(); ui.toast('<b>Kritzelei</b><span>' + l[(n - 1) % l.length] + '</span>'); return; }
      case 'giessen': s.merke.gegossen = (s.merke.gegossen || 0) + 1; sichern(); ui.toast(s.merke.gegossen > 3 ? '<b>Kevin, der Kaktus</b><span>Braucht kein Wasser. Er schaut dich vorwurfsvoll an.</span>' : '<b>Gegossen</b><span>Die Tomaten danken. Glaubst du.</span>'); return;
      case 'korb': {
        const modus = await new Promise((fertig) => {
          const k = ui.ebeneAuf('spiel', '<h2>🏀 Korb am Hof</h2><p class="ly-leer">Was spielst du?</p><div class="ly-d-optionen ly-bb-wahl">' +
            '<button type="button" data-m="frei"><b>Freiwürfe</b><small>5 Würfe · Rekord: ' + (s.merke.korbRekord || 0) + ' von 5</small></button>' +
            '<button type="button" data-m="dreier"><b>Dreier</b><small>weiter weg, grüner Streifen schmaler · Rekord: ' + (s.merke.dreierRekord || 0) + ' von 5</small></button>' +
            '<button type="button" data-m="horse"><b>H-O-R-S-E gegen Ben</b><small>Wer trifft, wenn der andere verfehlt, gibt einen Buchstaben · ' + (s.merke.horseSiege || 0) + ' Siege</small></button></div>' +
            '<button type="button" class="ly-link" data-m="">✕ Doch nicht</button>');
          const zu = (m) => { document.removeEventListener('keydown', esc, true); ui.ebeneZu(); fertig(m); };
          const esc = (e) => { if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); zu(''); } };
          document.addEventListener('keydown', esc, true);
          k.querySelectorAll('[data-m]').forEach((b) => { b.onclick = () => zu(b.dataset.m); });
        });
        if (!modus) return;
        const t = await freiwurf({ modus, gegner: 'Ben' });
        if (modus === 'horse') { const r = ui.letzteRunde || {}; if (r.sieg) s.merke.horseSiege = (s.merke.horseSiege || 0) + 1; sichern(); freund('ben', 3, 'spiel');
          ui.toast('<b>' + (r.sieg ? 'Du gewinnst H-O-R-S-E!' : 'Ben gewinnt H-O-R-S-E') + '</b><span>Ben: „' + (r.sieg ? 'Revanche. Morgen. Gleiche Zeit.' : 'Ich bin einfach zu gut. Sagt mein Bauch.') + '“</span>', 'ly-t-herz'); return; }
        const key = modus === 'dreier' ? 'dreierRekord' : 'korbRekord';
        s.merke[key] = Math.max(s.merke[key] || 0, t); sichern(); ui.toast('<b>' + t + ' von 5' + (modus === 'dreier' ? ' Dreier' : '') + '</b><span>Dein Rekord: ' + s.merke[key] + ' von 5.</span>'); return; }
      case 'skate': {
        const p = await skate(); s.merke.skateRekord = Math.max(s.merke.skateRekord || 0, p); sichern();
        ui.toast('<b>' + p + (p === 1 ? ' Punkt' : ' Punkte') + '</b><span>' + (p && p >= s.merke.skateRekord ? 'Neuer Rekord!' : 'Dein Rekord: ' + s.merke.skateRekord + ' Punkte.') + '</span>');
        return;
      }
      case 'tischtennis': {
        const pa = partner();   // spielt mit dir: am liebsten dein bester Freund / deine beste Freundin
        const b = await ui.tischtennis({ gegner: pa ? pa.name : '' }); s.merke.ttRekord = Math.max(s.merke.ttRekord || 0, b);
        if (pa) freund(pa.id, 4, 'spiel');
        sichern();
        ui.toast('<b>' + b + ' Ballwechsel</b><span>' + (b && b >= s.merke.ttRekord ? 'Dein bester bisher!' : 'Dein Rekord: ' + s.merke.ttRekord + '.') + '</span>');
        return;
      }
      case 'computer': ui.toast('<b>Anmelden</b><span>Passwort vergessen. Das Passwort für „Passwort vergessen“ auch.</span>'); return;
    }
  }
  return { liste, naechste, tu };
}
