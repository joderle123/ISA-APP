// Annexe Junglinster – mit Dingen etwas machen (Auftrag 17.11.: „sich setzen … wirklich mit den Dingen interagieren“).
// In der Nähe eines Gegenstands erscheint der Knopf (E / Finger): hinsetzen (jeder Stuhl, jede Bank, Rundbank,
// Sitzstufen, Tribüne), am eigenen Platz oder im Lesesaal ein Arbeitsblatt bearbeiten, Spind, Snackautomat, Brunnen,
// Klavier, Keyboard, Schlagzeug, Bücher, Pinnwand, Gießkanne, Freiwürfe. Kleine Folgen, keine Bewertung.

const BUECHER = [
  ['„Klasse ohne Lehrer“', 'Ein Tag ohne Lehrer. Ab Seite 9 Chaos.'],
  ['„Der Neue“', 'Ein Junge kommt in eine neue Klasse. Alle schauen.'],
  ['„Zwei Wochen Sommer“', 'Zwei Freunde, ein Zelt, kein Plan.'],
  ['Atlas Luxemburg', 'Auf Seite 12 hat jemand Junglinster eingekreist.'],
  ['„Tom findet alles“', 'Tom denkt anders. Und findet trotzdem alles raus.'],
  ['Kochbuch „Schnell und billig“', 'Eselsohr bei: Nudeln mit Tomatensoße.'],
  ['Comic-Band 7', 'Band 6 fehlt. Seit 2019.'],
  ['„Fußball-Regeln für Anfänger“', 'Abseits wird auf Seite 4 erklärt. Ganz ehrlich: dreimal lesen.'],
  ['Lexikon der Tiere', 'Ein Lesezeichen bei „Axolotl“. Die können Beine nachwachsen lassen.'],
  ['„Mut ist, wenn …“', 'Ein dünnes Heft. Jemand hat Sätze unterstrichen.'],
];
import { PINNWAND, PINNWAND_KAPITEL, pinnwandFuerDich, KRITZELEIEN, FUNDKISTE } from './welttexte.js';
import { leseEcke, HEFTE } from './lesestoff.js';
const SNACKS = ['Schokoriegel', 'Chips (Paprika)', 'Gummibärchen', 'Kekse', 'Wasser'];
// Lehrerzimmer (verschlossen): was man durch die Tür hört
const LAUSCHEN = [
  '„Wer hat meinen Joghurt aus dem Kühlschrank genommen?“',
  '„Der Kopierer. Schon wieder. Ich geb auf.“',
  '„Kaffee ist alle! Das ist ein Notfall.“',
  '„Die 7P2 hat heute richtig gut mitgemacht.“',
  '„Herr Kuedes, Ihr Ball liegt schon wieder im Drucker.“',
  'Ein Mikrowellen-Piepen. Dreimal. Dann Lachen.',
  '„Wer übernimmt Freitag die Pausenaufsicht?“ – Stille.',
];
const SPIEGEL = [
  'Im Spiegel: du. Ein bisschen müde. Aber da.',
  'Am Rand klebt ein Zettel: „Du bist mehr als dein Aussehen.“',
  'Du schneidest eine Grimasse. Der Spiegel auch. Unentschieden.',
  'Jemand hat mit Kreide geschrieben: „Schau genau hin. Du bist interessant.“',
];
const DRUCKER = [
  'Brrr … zzz. Ein Ohr ist fertig. Noch 2 Stunden 14 Minuten.',
  'Jetzt hat er zwei Ohren und eine Nase. Sieht aus wie ein Hund. Vielleicht.',
  'Vier Beine! Der Drucker summt zufrieden.',
  'Fertig: ein kleiner Bonbon aus Plastik. Daneben ein Zettel: „Für die SePAS. Anfassen erlaubt. – Tiago“',
];
const ROBOTER = [
  'Piep. Der Roboter fährt zehn Zentimeter nach vorn. Dann: „HALLO MENSCH.“',
  'Piep piep. Er dreht sich einmal im Kreis. Dann bleibt er stehen. Akku leer.',
  '„ICH BIN EIN ROBOTER. ICH HABE KEINE HAUSAUFGABEN.“ Neidisch.',
  'Er blinkt rot, dann grün. Tiago hat „Ampel“ programmiert.',
];

export const KABEL = [['cdi', 14, -62.4], ['kantine', 18.6, -8.2], ['gang', -15.5, -15.8], ['innenhof', -17.2, -44.9], ['skate', -36.4, 6.4]];
export function createInteraktionen({ welt, steuerung, ui, zustand, sichern, ton, blattWahl, freiwurf, skate, pausenFussball = null, volley = null, volleyAktiv = () => false, elfmeter = null, elfmeterAktiv = () => false, tt3d = null, kicker = null, billard = null, tanzen = null, dosen = null, dosenAktiv = () => false, botengang = null, spindAuf = null, partner = () => null, bekannte = () => [], freund = () => {}, onKabel = null }) {
  const tt = welt.orte.tischtennis;
  const liste = [];
  let botenFrage = 0;   // Botengang: zweimal drücken = abbrechen
  // Gegner wählen (Kicker, Billard): bis zu drei Freund:innen oder Kim. Wer drei verschiedene schlägt, wird Champion.
  async function gegnerWaehlen(spiel) {
    const liste = bekannte().slice(0, 3);
    if (!liste.length) return null;
    const i = await ui.waehle(liste.map((p) => p.name).concat(['Kim (Jugendhaus)']), spiel + ': Gegen wen spielst du?', { fest: true });
    ui.dialogZu();
    return i < liste.length ? liste[i] : null;
  }
  function besiegt(s, schluessel, wer, preis) {
    const l = s.merke[schluessel] = s.merke[schluessel] || [];
    if (l.includes(wer)) return;
    l.push(wer);
    if (l.length === 3) ui.toast('<b>🏆 ' + preis + '</b><span>Drei verschiedene Leute geschlagen. Neues Teil in der Garderobe!</span>', 'ly-t-ent');
  }
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
  dazu(-15.05, -12.55, 1.0, 'Zettel in den Sorgen-Briefkasten werfen', 'sorgen', { prio: 1 });
  dazu(-40, 99.9, 1.4, 'Am Kiosk etwas holen', 'kiosk', { prio: 1 });   // Park am Weiher
  dazu(20.5, 116.2, 1.7, 'Tischkicker spielen', 'kicker', { prio: 1 });   // Jugendhaus (rund um den Tisch)
  dazu(20.5, 118.2, 1.4, 'Tischkicker spielen', 'kicker', { prio: 1 });
  if (billard) { dazu(24.5, 115.2, 1.3, 'Billard spielen', 'billard', { prio: 1 }); dazu(27.5, 115.2, 1.3, 'Billard spielen', 'billard', { prio: 1 }); }
  dazu(25.5, 112.9, 1.2, 'Musik wechseln', 'jukebox', { prio: 1 });
  dazu(9.4, 125.0, 1.4, 'Tee holen', 'tee', { prio: 1 });
  if (tanzen) dazu(23.4, 123.4, 1.5, 'Tanzfläche: im Takt tanzen', 'tanzen', { prio: 1 });
  if (dosen) dazu(70, 117.4, 1.4, 'Dosenwerfen (3 Bälle)', 'dosen', { prio: 1 });   // Marktplatz
  for (const [x, z] of [[-55, 97.0], [-55, 113.0], [-65, 105]]) dazu(x, z, 1.6, 'Enten beobachten', 'enten', { prio: 0 });
  dazu(-19.3, -11.7, 0.8, 'Ein Bonbon nehmen', 'bonbon', { prio: 1 });   // Sekretariat: Glas auf der Theke
  dazu(45, -1.8, 1.3, 'In die Fundkiste schauen', 'fundkiste', { prio: 1 });
  dazu(-24.5, 42.6, 1.2, 'Kritzeleien lesen', 'kritzelei', { prio: 0, wo: 'bus' });
  dazu(-26.35, -27.2, 0.8, 'Kritzelei auf dem Tisch', 'kritzelei', { prio: 0, wo: 'tisch' });
  dazu(19.4, -44.6, 1.2, 'Pflanzen gießen', 'giessen', { prio: 1 });
  dazu(29, 12.5, 2.2, 'Freiwürfe werfen', 'korb', { prio: 1 });
  dazu(29, 25.5, 2.2, 'Freiwürfe werfen', 'korb', { prio: 1 });
  for (const x of [47.4, 52.6, 57.8]) dazu(x, -43.85, 0.9, 'Am Computer', 'computer', { prio: 1 });
  dazu(3.0, -17.4, 1.0, 'An der Tür lauschen', 'lauschen', { prio: 1 });   // Lehrerzimmer (verschlossen)
  dazu(61.0, -53.0, 1.0, 'In den Spiegel schauen', 'spiegel', { prio: 1 });   // Kunstraum
  dazu(63.0, -43.7, 1.1, 'Dem 3D-Drucker zuschauen', 'drucker', { prio: 1 });   // Informatik
  dazu(61.5, -39.5, 0.9, 'Roboter einschalten', 'roboter', { prio: 1 });
  if (skate) dazu(-29.6, 5.2, 1.5, 'Skateboard fahren', 'skate', { prio: 1 });
  if (volley) dazu(43.6, -18, 1.4, 'Volleyball spielen', 'volley', { prio: 1 });   // Hall des sports, am Netz
  if (elfmeter) dazu(-86, -2.6, 1.4, 'Elfmeterschießen (5 Schüsse)', 'elfmeter', { prio: 1 });
  if (pausenFussball) dazu(-73.5, -14, 1.6, 'Pausenfußball: Teams wählen', 'pausenfussball', { prio: 1 });   // Seitenlinie Stade   // Stade, Elfmeterpunkt vor dem Nordtor
  if (tt) dazu(tt.x - 1.3, tt.z, 1.2, 'Tischtennis spielen', 'tischtennis', { prio: 1 });
  if (botengang) dazu(-8.4, 54.6, 1.4, 'Hilfe gesucht: Botengang holen', 'botengang', { prio: 1 });   // Brett neben der Bäckerei
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
        if (n === 3 && !s.merke.ente) { s.merke.ente = true; sichern(); ui.toast('<b>🦆 Eine Gummiente!</b><span>Sie trägt eine Krawatte. Mit kleinen Enten drauf. Kommt dir bekannt vor.</span>', 'ly-t-ent'); return; }
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
        const satz = pz >= 90 ? 'Okay. Du bist jetzt in der Band. Kein Witz.' : pz >= 70 ? 'Fast tight. Noch zwei Proben, dann Bühne.' : pz >= 40 ? 'Laut warst du. Das ist schon mal was.' : 'Das war kein Takt. Das war ein Unfall. Nochmal?';
        ui.toast('<b>' + pz + ' % im Takt</b><span>Ayla: „' + satz + '“ · ' + (pz > alt ? 'Neuer Rekord!' : 'Dein Rekord: ' + s.merke.bandRekord + ' %') + '</span>', 'ly-t-herz');
        return;
      }
      case 'buch': {
        s.merke.buecher = (s.merke.buecher || 0) + 1;
        const r = await leseEcke(ui, s.merke.gelesen || []); s.merke.gelesen = r.gelesen; sichern();
        if (r.neu) { const h = HEFTE.find((x) => x.id === r.neu); ui.toast('<b>Gelesen: ' + h.titel + '</b><span>' + r.gelesen.length + ' von ' + HEFTE.length + ' Heften in der Lese-Ecke.</span>'); }
        else if (!r.gelesen.length) { const b = BUECHER[(s.merke.buecher * 3) % BUECHER.length]; await ui.bild(b[0], b[1], 3.2); }
        return; }
      case 'pinnwand': {
        // zuerst, was neu ist: der Zettel dieses Kapitels und Zettel, die auf dich reagieren – dann die alten
        const kap = Math.min(10, (s.kapitelFertig || 0) + 1), gesehen = s.merke.pinnGesehen = s.merke.pinnGesehen || [];
        const neu = [PINNWAND_KAPITEL[kap], ...pinnwandFuerDich(s.merke, s)].filter((t) => t && !gesehen.includes(t));
        if (neu.length) { gesehen.push(...neu.slice(0, 2)); sichern(); await ui.bild('📌 Pinnwand · neu', neu.slice(0, 2).join(' · '), 5); return; }
        const n = s.merke.pinnwand = ((s.merke.pinnwand || 0) + 1); sichern(); await ui.bild('Pinnwand', PINNWAND[(n - 1) % PINNWAND.length].join(' · '), 4.5); return; }
      case 'fundkiste': { const n = s.merke.fundkisteBlick = ((s.merke.fundkisteBlick || 0) + 1); sichern(); ui.toast('<b>Fundkiste</b><span>' + FUNDKISTE[(n - 1) % FUNDKISTE.length] + '</span>'); return; }
      case 'kritzelei': { const l = KRITZELEIEN[i.wo] || KRITZELEIEN.tisch; const k = 'kritzel_' + i.wo; const n = s.merke[k] = ((s.merke[k] || 0) + 1); sichern(); ui.toast('<b>Kritzelei</b><span>' + l[(n - 1) % l.length] + '</span>'); return; }
      case 'giessen': s.merke.gegossen = (s.merke.gegossen || 0) + 1; sichern(); ui.toast(s.merke.gegossen > 3 ? '<b>Kevin, der Kaktus</b><span>Schon wieder Wasser? Kevin guckt sehr böse.</span>' : '<b>Gegossen</b><span>Die Tomaten danken. Glaubst du.</span>'); return;
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
        if (tt3d) {   // echtes Spiel an der Platte: bis 11
          const r = await tt3d(pa); if (!r) return;
          s.merke.ttRekord = Math.max(s.merke.ttRekord || 0, r.laengster); s.merke.ttSiege = (s.merke.ttSiege || 0) + (r.sieg ? 1 : 0);
          if (pa) freund(pa.id, r.ich + r.er >= 6 ? 4 : 1, 'spiel');
          sichern();
          ui.toast('<b>' + (r.sieg ? 'Gewonnen ' : r.ich + r.er ? 'Spiel ' : 'Aufgehört ') + r.ich + ':' + r.er + '</b><span>Längster Ballwechsel: ' + r.laengster + (r.laengster && r.laengster >= s.merke.ttRekord ? ' – dein Rekord!' : ' · Rekord: ' + s.merke.ttRekord) + '</span>');
          return;
        }
        const b = await ui.tischtennis({ gegner: pa ? pa.name : '' }); s.merke.ttRekord = Math.max(s.merke.ttRekord || 0, b);
        if (pa) freund(pa.id, 4, 'spiel');
        sichern();
        ui.toast('<b>' + b + ' Ballwechsel</b><span>' + (b && b >= s.merke.ttRekord ? 'Dein bester bisher!' : 'Dein Rekord: ' + s.merke.ttRekord + '.') + '</span>');
        return;
      }
      case 'lauschen': {
        const n = s.merke.lauschen = (s.merke.lauschen || 0) + 1; sichern();
        if (n % 5 === 0) { ui.toast('<b>Die Tür geht auf</b><span>Mme Tidderich schaut raus: „Kann ich helfen?“ Du: „Äh … nein. Schönen Tag!“</span>'); return; }
        ui.toast('<b>Salle des profs</b><span>(von drinnen) ' + LAUSCHEN[(n - 1) % LAUSCHEN.length] + '</span>'); return;
      }
      case 'spiegel': { const n = s.merke.spiegel = (s.merke.spiegel || 0) + 1; sichern(); ui.toast('<b>Spiegel</b><span>' + SPIEGEL[(n - 1) % SPIEGEL.length] + '</span>'); return; }
      case 'drucker': { const n = s.merke.drucker = Math.min(DRUCKER.length, (s.merke.drucker || 0) + 1); sichern(); ton('klack'); ui.toast('<b>3D-Drucker</b><span>' + DRUCKER[n - 1] + '</span>'); return; }
      case 'roboter': { const n = s.merke.roboter = (s.merke.roboter || 0) + 1; sichern(); ton('pling'); ui.toast('<b>Roboter vom Coding-Club</b><span>' + ROBOTER[(n - 1) % ROBOTER.length] + '</span>'); return; }
      case 'sorgen': {   // SePAS: Sorgen-Briefkasten – anonym oder mit Namen; Herr Kuedes antwortet (mit Namen persönlich, sonst für alle)
        if (s.merke.sorgenSchritt === s.schritt) { ui.toast('<b>✉️ Schon eingeworfen</b><span>Herr Kuedes liest alles. Morgen geht wieder.</span>'); return; }
        const t = await ui.waehle(['Mir geht’s gerade nicht gut.', 'Jemand wird gemobbt. Nicht ich.', 'Stress mit Freunden.', 'Danke, dass es die SePAS gibt.', '(Doch nichts einwerfen.)'], 'Was schreibst du auf den Zettel?', { fest: true });
        if (t === 4) return;
        const n = await ui.waehle(['Anonym einwerfen', 'Mit meinem Namen'], 'Mit Namen kann Herr Kuedes dir antworten. Anonym geht auch.', { fest: true });
        s.merke.sorgenSchritt = s.schritt; s.merke.sorgenZettel = (s.merke.sorgenZettel || 0) + 1; ton('klack');
        const PERSOENLICH = ['Danke für deinen Zettel. Du musst damit nicht allein sein. Tür ist offen.', 'Danke für den Hinweis. Ich schau genau hin. Diskret.', 'Danke für deinen Zettel. Streit tut weh. Komm vorbei, wenn du magst.', 'Und danke, dass es dich gibt. 😊'];
        (s.merke.nachrichten = s.merke.nachrichten || []).push(n === 1 ? ['SePAS · Herr Kuedes', PERSOENLICH[t]] : ['SePAS · Aushang', 'An alle mit Zettel: Danke. Ihr seid nicht allein. Tür ist offen.']);
        sichern(); ui.toast('<b>✉️ Eingeworfen</b><span>' + (n === 1 ? 'Mit Namen. Herr Kuedes meldet sich.' : 'Anonym. Herr Kuedes liest alles.') + '</span>');
        return;
      }
      case 'bonbon': {   // Sekretariat: eins pro Person (und Abschnitt) – das Kärtchen hat ein Auge darauf
        if (s.merke.bonbonSchritt === s.schritt) { ui.toast('<b>🍬 Eins pro Person</b><span>Das Kärtchen schaut dich an. Du lässt das Glas zu.</span>'); return; }
        const n = s.merke.bonbons = (s.merke.bonbons || 0) + 1; s.merke.bonbonSchritt = s.schritt; ton('klack'); sichern();
        ui.toast('<b>🍬 ' + ['Zitrone', 'Himbeere', 'Pfefferminz', 'Kirsche', 'Apfel'][(n - 1) % 5] + '</b><span>' + (n === 5 ? 'Auf dem Kärtchen steht jetzt mit Kuli: „Bester Kunde 🙂“' : 'Eins pro Person. Du hältst dich dran.') + '</span>');
        return;
      }
      case 'pausenfussball': await pausenFussball(); return;
      case 'elfmeter': {   // fünf Schüsse, die beste Freundin / der beste Freund im Tor (sonst Ben)
        if (elfmeterAktiv()) return;
        const pa = partner();
        const r = await elfmeter({ keeperId: pa ? pa.id : 'ben', keeperName: pa ? pa.name : 'Ben', rekord: s.merke.elfmeterRekord || 0 });
        s.merke.elfmeterSpiele = (s.merke.elfmeterSpiele || 0) + 1;
        const neu = r.tore > (s.merke.elfmeterRekord || 0); if (neu) s.merke.elfmeterRekord = r.tore; sichern();
        ui.toast('<b>⚽ ' + r.tore + ' von 5</b><span>' + (neu ? 'Neuer Rekord!' : 'Rekord: ' + (s.merke.elfmeterRekord || 0) + ' von 5') + '</span>');
        return;
      }
      case 'volley': {   // Ballwechsel mit der besten Freundin / dem besten Freund (sonst Ben)
        if (volleyAktiv()) return;
        const pa = partner();
        const r = await volley({ partnerId: pa ? pa.id : 'ben', partnerName: pa ? pa.name : 'Ben', rekord: s.merke.volleyRekord || 0 });
        s.merke.volleySpiele = (s.merke.volleySpiele || 0) + 1;
        const neu = r.best > (s.merke.volleyRekord || 0); if (neu) s.merke.volleyRekord = r.best; sichern();
        ui.toast('<b>🏐 ' + r.punkte + ' Punkte</b><span>Längster Ballwechsel: ' + r.best + (neu ? ' – neuer Rekord!' : ' · Rekord ' + (s.merke.volleyRekord || 0)) + '</span>');
        return;
      }
      case 'dosen': {   // Marktplatz: sechs Dosen, drei Bälle; alle sechs = Stoffente (einmal) und Rekord
        if (dosenAktiv()) return;
        const r = await dosen({ rekord: s.merke.dosenRekord || 0 });
        s.merke.dosenSpiele = (s.merke.dosenSpiele || 0) + 1;
        const neu = r.dosen > (s.merke.dosenRekord || 0); if (neu) s.merke.dosenRekord = r.dosen;
        if (r.dosen >= 6 && !s.merke.stoffente) { s.merke.stoffente = true; sichern(); ui.toast('<b>🦆 Gewonnen: eine Stoffente!</b><span>Am Stand: „Die sieht aus wie die echten im Weiher.“</span>', 'ly-t-ent'); return; }
        sichern(); ui.toast('<b>🥫 ' + r.dosen + ' von 6</b><span>' + (r.dosen >= 6 ? 'Abgeräumt! ' : '') + (neu ? 'Neuer Rekord.' : 'Rekord: ' + (s.merke.dosenRekord || 0) + ' von 6') + '</span>');
        return;
      }
      case 'tanzen': {   // Jugendhaus: Rhythmus-Spiel (tanz.js) – Punkte, Combo, Sterne; Kim feiert mit
        const r = await tanzen(); if (!r || r.abbruch) return;
        const alt = s.merke.tanzRekord || 0, neu = r.punkte > alt; if (neu) s.merke.tanzRekord = r.punkte;
        s.merke.tanz = (s.merke.tanz || 0) + 1; s.merke.tanzSterne = Math.max(s.merke.tanzSterne || 0, r.sterne || 0); sichern();
        const KIM = r.sterne >= 3 ? '„Wow. Das war Bühnen-Niveau!“' : r.sterne === 2 ? '„Du hast den Takt. Echt jetzt.“' : r.sterne === 1 ? '„Tanzen heißt Spaß haben. Hat geklappt.“' : '„Mutig, dass du es probiert hast!“';
        ui.toast('<b>💃 ' + r.punkte + ' Punkte' + (neu && alt ? ' – neuer Rekord!' : '') + '</b><span>Kim: ' + KIM + '</span>', r.sterne >= 3 ? 'ly-t-ent' : undefined);
        return;
      }
      case 'billard': {   // Jugendhaus: Billard gegen die beste Freundin / den besten Freund (sonst Kim)
        const pa = await gegnerWaehlen('Billard'); const r = await billard(pa); if (!r || r.abbruch) return;
        if (r.gewonnen) besiegt(s, 'billardBesiegt', pa ? pa.id : 'kim', 'Billard-Profi');
        s.merke.billard = (s.merke.billard || 0) + 1; if (r.gewonnen) s.merke.billardSiege = (s.merke.billardSiege || 0) + 1; sichern();
        ui.toast('<b>🎱 ' + (r.gewonnen ? 'Gewonnen!' : 'Verloren – knapp.') + '</b><span>' + (r.gewonnen ? '„Revanche. Aber erst nach dem Tee.“' : '„Gut gespielt. Nochmal?“') + '</span>', r.gewonnen ? 'ly-t-ent' : undefined);
        return;
      }
      case 'kicker': {   // Jugendhaus: kurzes Duell – Spaß, kein Druck; das Ergebnis ist mal so, mal so
        const pa = kicker ? await gegnerWaehlen('Tischkicker') : null;
        const r = kicker ? await kicker(pa) : { ich: 3 + Math.floor(Math.random() * 4), er: 3 + Math.floor(Math.random() * 4) };
        if (r && r.ich > r.er) besiegt(s, 'kickerBesiegt', pa ? pa.id : 'kim', 'Kicker-Champion');
        if (!r || (!r.ich && !r.er)) return;   // gleich wieder aufgehört
        const { ich, er } = r;
        s.merke.kicker = (s.merke.kicker || 0) + 1; if (ich > er) s.merke.kickerSiege = (s.merke.kickerSiege || 0) + 1; ton('klack'); sichern();
        const SPRUCH = ich > er ? ['„Revanche! Morgen!“', '„Der Kicker klemmt links. Ehrlich!“'] : ich < er ? ['„Gut gespielt. Echt.“', '„Nächstes Mal tauschen wir die Seiten.“'] : ['„Unentschieden. Das Beste.“'];
        ui.toast('<b>⚽ Kicker ' + ich + ':' + er + '</b><span>' + SPRUCH[Math.floor(Math.random() * SPRUCH.length)] + '</span>');
        return;
      }
      case 'jukebox': {   // Musik im Jugendhaus wechseln (eigene synthetische Stücke)
        const LISTE = [['strand', 'Marimba'], ['markt', 'Gezupfte Saiten'], ['glimmer', 'Arpeggios'], ['leuchtturm', 'Alle zusammen']];
        const i = ((s.merke.jugendhausMusik || 0) + 1) % LISTE.length; s.merke.jugendhausMusik = i; sichern();
        ui.toast('<b>🎵 ' + LISTE[i][1] + '</b><span>Jemand nickt im Takt.</span>');
        return;
      }
      case 'tee': ui.toast('<b>🍵 Tee</b><span>' + ['Pfefferminz. Warm in den Händen.', 'Früchtetee. Riecht nach Sommer.', 'Kamille. Kim sagt: „Gute Wahl.“'][Math.floor(Math.random() * 3)] + '</span>'); return;
      case 'botengang': {   // Brett „Hilfe gesucht“ neben der Bäckerei (botengang.js)
        if (botengang.aktiv()) {
          if (performance.now() - botenFrage < 6000) { botengang.abbrechen(); return; }
          botenFrage = performance.now(); ui.toast('<b>📦 Du bist schon unterwegs</b><span>Noch einmal drücken = Auftrag abbrechen.</span>'); return;
        }
        const b = botengang.start(); if (!b) return;
        const m = s.merke.boten || { n: 0 };
        ui.toast('<b>📌 Hilfe gesucht: ' + b.ding + '</b><span>Abholen: ' + b.von.ort + ' → bringen: ' + b.nach.ort + '. Folge dem gelben Pfeil!' + (m.n ? '' : ' Mit Brett (R) oder Trottinette (T) geht es schneller.') + '</span>');
        return;
      }
      case 'kiosk': {   // Park am Weiher: im Herbst und Frühling Eis, im Winter heiße Schokolade – einmal je Abschnitt
        const kap = Math.min(10, (s.kapitelFertig || 0) + 1), winter = kap >= 3 && kap <= 6;
        if (s.merke.kioskSchritt === s.schritt) { ui.toast('<b>' + (winter ? '☕' : '🍦') + ' Schon gehabt</b><span>„Morgen wieder!“, ruft die Frau im Kiosk.</span>'); return; }
        s.merke.kioskSchritt = s.schritt; s.merke.kiosk = (s.merke.kiosk || 0) + 1; ton('pling'); sichern();
        const SORTEN = winter ? ['Heiße Schokolade mit Sahne', 'Heiße Schokolade, extra warm', 'Kinderpunsch mit Zimt'] : ['Erdbeere', 'Stracciatella', 'Zitrone', 'Mango', 'Schoko-Minze'];
        ui.toast('<b>' + (winter ? '☕ ' : '🍦 ') + SORTEN[(s.merke.kiosk - 1) % SORTEN.length] + '</b><span>' + (s.merke.kiosk === 5 ? '„Stammkundschaft!“ Die Frau im Kiosk grinst.' : 'Du setzt dich kurz ans Wasser.') + '</span>');
        return;
      }
      case 'enten': {   // drei kurze Fakten, der Reihe nach – ohne Füttern (Brot macht Enten krank)
        const F = ['Enten schlafen oft mit einem offenen Auge.', 'Brot macht Enten krank. Hier wird nur geschaut.', 'Die Kleinen schwimmen der Mutter in einer Reihe nach.', 'Wasser perlt ab: Enten fetten ihre Federn selbst ein.'];
        s.merke.enten = (s.merke.enten || 0) + 1; sichern();
        ui.toast('<b>🦆 Enten</b><span>' + F[(s.merke.enten - 1) % F.length] + '</span>');
        return;
      }
      case 'computer': ui.toast('<b>Anmelden</b><span>Passwort vergessen. Das Passwort für „Passwort vergessen“ auch.</span>'); return;
    }
  }
  return { liste, naechste, tu };
}
