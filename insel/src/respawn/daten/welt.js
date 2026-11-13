// RESPAWN – offene Welt: was man an Orten und mit Leuten tun kann, und was später daraus wird.
// Man darf Mist bauen. Es gibt kein Gefängnis und keine Strafe vom Spiel – die Folgen kommen von den Menschen:
// Sie merken es sich, reden darüber, ziehen sich zurück oder stehen trotzdem zu dir. Oft erst am nächsten Morgen.
// Aktion: { id, t (≤ 6 Wörter), art, kraft: 0|1, wenn?(R, wer), mist?: true (Zeugen zählen), szene(R, { wer, zeugen }) → Schritte }
// Zeugen sind die Figuren, die in der 3D-Welt gerade wirklich in der Nähe stehen.
// Folge:  { id, wenn(R), text: [Zeilen am Morgen], e: Wirkung }   – jede Folge passiert einmal (R.folgen)
import { hat, bond, wert } from '../run.js';

export const folgeWar = (R, id) => (R.folgen || []).includes(id);

const tag = (R) => R.jz * 3 + (R.tag || 0);
const seit = (R, flag) => tag(R) - wert(R, flag, 99);
const NAME = { ilda: 'Ilda', fraenz: 'Fränz', lucinda: 'Oma Lucinda', jolie: 'Jolie', tun: 'Tun', pit: 'Pit', mika: 'Mika', yara: 'Yara', luc: 'Luc', noor: 'Noor', tiago: 'Tiago', maelle: 'Maëlle' };
export const GROSSE = ['ilda', 'fraenz', 'lucinda'];
export const WICHTIG = Object.keys(NAME);
const zeuge = (z, ausser) => (z || []).find((w) => w !== ausser && WICHTIG.includes(w)) || null;

// Parkplatz von Fränz’ Lieferwagen: neben der Straße, ein Stück vom Kiosk (stadt.js stellt ihn dorthin)
export const LIEFERWAGEN = { x: -11.5, z: 116.0, yaw: 1.69 };

// Am Leuchtturm: oben auf der Kuppe. Die Straße vom Hafen endet unten am Hang (world/island.js → PATHS „hafen-leuchtturm“).
export const LEUCHTTURM = { x: -115.5, z: 122 };   // oben auf der Kuppe, direkt am Turm (vorher am Hang: der Turm war von dort nie zu sehen)

// ---------- Orte ----------
// steh: fester Ankunftsplatz (x, z) mit Blickpunkt (bx, bz), wenn der übliche Platz schlecht aussieht; hoch: Kamera-Neigung (unter 0 = Blick nach oben)
export const ORTE = [
  { id: 'zuhause', name: 'Zuhause', ort: 'bootshaus', bild: '🏠', steh: { x: -6.5, z: 130.5, bx: -6, bz: 141 }, aktionen: ['schlafen', 'zocken'] },
  { id: 'kiosk', name: 'Kiosk', ort: 'snackStand', bild: '🍟', aktionen: ['job', 'kasse'] },
  { id: 'brunnen', name: 'Brunnen', ort: 'dorfplatz', bild: '🛹', aktionen: ['tricks', 'rennen'] },
  { id: 'werft', name: 'Werft', ort: 'werft', bild: '🔨', aktionen: ['sprayen', 'boot'] },
  { id: 'steg', name: 'Steg', ort: 'steg', bild: '🌊', aktionen: ['wasser', 'angeln', 'springen'] },
  { id: 'krater', name: 'Krater', ort: 'kraterRand', bild: '🔥', aktionen: ['abhaengen', 'ziehen'] },
  { id: 'strand', name: 'Strand', ort: 'strandHuette', bild: '🏖️', aktionen: ['schwimmen', 'feuer'] },
  { id: 'leuchtturm', name: 'Leuchtturm', ort: { x: LEUCHTTURM.x, z: LEUCHTTURM.z }, bild: '🗼', steh: { x: -113, z: 120.8, bx: -122, bz: 124, hoch: -0.12 }, aktionen: ['aussicht', 'klettern'] },
  { id: 'buehne', name: 'Bühne', ort: 'buehne', bild: '🎤', aktionen: ['auftreten'] },
  { id: 'garten', name: 'Garten', ort: 'lucindasGarten', bild: '🍅', steh: { x: -109.5, z: 30.3, bx: -119, bz: 27.5 }, aktionen: ['garten'] },
  { id: 'lieferwagen', name: 'Lieferwagen', ort: { x: LIEFERWAGEN.x, z: LIEFERWAGEN.z }, bild: '🚚', steh: { x: -11.5, z: 112.3, bx: -11.5, bz: 116 }, aktionen: ['fahren', 'ueben'] },
  { id: 'markt', name: 'Markt', ort: 'marktplatz', bild: '🛍️', aktionen: ['kaufen', 'roller', 'einstecken'] },
];

export const ORT_AKTIONEN = {
  schlafen: { t: 'Schlafen gehen', art: 'ruhig', kraft: 0, schlaf: true, szene: () => [['t', 'Du machst das Licht aus.']] },
  zocken: { t: 'Zocken bis nachts', art: 'weg', kraft: 1, szene: () => [['t', 'Noch eine Runde. Und noch eine. Halb drei.'], ['e', { druck: -25, spaet: 1 }]] },
  wasser: { t: 'Ans Wasser setzen', art: 'ruhig', kraft: 1, szene: () => [['t', 'Du setzt dich ans Ende vom Steg. Nur Wellen.'],
    ['atem', { zuege: 3 }, (a) => [['t', a.gut >= 2 ? 'Dein Kopf wird leiser. Viel leiser.' : 'Dein Kopf wird ein bisschen leiser.'], ['e', { druck: -(12 + 5 * a.gut) }]]]] },
  tricks: { t: 'Tricks üben', art: 'ruhig', kraft: 1, szene: (R) => (hat(R, 'pit.weg') ? [['t', 'Der Brunnen ist leer. Pit kommt nicht mehr.'], ['e', { druck: -5 }]] : [['t', 'Pit zeigt dir den Kickflip. Jetzt du.'],
    ['spiel', { titel: 'Im richtigen Moment abspringen', bild: '🛹' }, (g) => (g.treffer >= 3 ? [['s', 'pit', 'Dreimal gestanden. Respekt, echt.'], ['e', { druck: -20, bond: { pit: 2 }, ruf: { hafen: 1 } }]]
      : g.treffer >= 1 ? [['t', 'Einmal gestanden, sonst Asphalt. Pit grinst.'], ['e', { druck: -15, bond: { pit: 1 } }]]
      : [['t', 'Du fällst zehnmal. Pit lacht nicht einmal.'], ['e', { druck: -10, bond: { pit: 1 } }]])]]) },
  abhaengen: { t: 'Mit der Crew abhängen', art: 'weg', kraft: 1, szene: () => [['t', 'Musik aus einer Box. Mikas Crew macht dir Platz.'], ['e', { druck: -15, ruf: { krater: 1 }, bond: { yara: 1 }, spaet: 1 }]] },
  // Wettlauf (lauf.js): in 29 Sekunden zum Leuchtturm (bis oben an den Turm). Zu Fuß knapp, mit dem eigenen Roller leicht. Einmal am Tag.
  rennen: { t: 'Rennen gegen Pit', art: 'mut', kraft: 1, lauf: { ziel: LEUCHTTURM, sekunden: 29, name: 'Leuchtturm' },
    wenn: (R) => !hat(R, 'pit.weg') && !hat(R, 'meidet.pit') && wert(R, 'rennen.tag', -1) !== tag(R),
    szene: (R) => [['s', 'pit', 'Bis zum Leuchtturm. Wer verliert, zahlt Pommes.'], ['d', hat(R, 'roller') ? 'Mit dem Roller hat er keine Chance.' : 'Einfach die Straße runter. Los.'], ['e', { flags: { 'lauf.jetzt': true, 'rennen.tag': tag(R) } }]],
    nach: (R, erg) => (erg.geschafft
      ? [['s', 'pit', erg.zeit < 15 ? 'Was war das denn? Du fliegst ja.' : 'Knapp. Aber gewonnen ist gewonnen.'], ['e', { druck: -15, geld: 5, bond: { pit: 1 }, ruf: { hafen: 1 }, flag: 'rennen.gewonnen' }]]
      : [['s', 'pit', 'Ich war schon oben. Pommes gehen auf dich.'], ['e', { druck: -5, geld: -Math.min(5, R.geld), bond: { pit: 1 } }]]) },
  job: { t: 'Jobben', art: 'ruhig', kraft: 1, szene: (R) => (hat(R, 'job.weg') ? [['s', 'fraenz', 'Für dich hab ich keine Arbeit mehr.']] : [['t', 'Vier Stunden Fritteuse. Der Korb muss rechtzeitig raus.'],
    ['spiel', { titel: 'Pommes raus, bevor sie verbrennen', bild: '🍟' }, (g) => {
      const lohn = (R.karten.zuhause === 'allein' ? 25 : 20) + (g.treffer >= 3 ? 5 : g.treffer === 0 ? -5 : 0);
      return [g.treffer >= 3 ? ['s', 'fraenz', 'Nichts verbrannt. Fünf Euro extra.'] : g.treffer === 0 ? ['s', 'fraenz', 'Drei Körbe Kohle. Das zieh ich ab.'] : ['t', 'Fränz zahlt bar. Deine Jacke riecht nach Fett.'],
        ['e', { geld: lohn, druck: 5, bond: { fraenz: 1 }, flag: 'job' }]];
    }]]) },
  kasse: { t: 'In die Kasse greifen', art: 'hart', kraft: 1, mist: true, wenn: (R) => !hat(R, 'kasse.geklaut'),
    szene: (R, { zeugen }) => {
      const z = zeuge(zeugen, 'fraenz');
      return [
        ['t', 'Die Kasse steht offen. Fränz ist hinten.'],
        ['w', [
          { t: 'Zwanzig Euro nehmen.', art: 'hart', e: { geld: 20, druck: 5, flags: { 'kasse.geklaut': true, 'kasse.tag': tag(R), 'kasse.zeuge': z || '' } }, dann: z ? [
            ['s', z, 'Ich hab das gesehen.'],
            ['w', [
              { t: 'Sag es keinem. Bitte.', art: 'ruhig', e: { flag: 'kasse.gebeten' }, dann: [['s', z, bond(R, z) >= 2 ? 'Ich sag nichts. Aber ich weiß es jetzt.' : 'Mal sehen.']] },
              { t: 'Na und?', art: 'hart', e: { bond: { [z]: -1 } }, dann: [['s', z, 'Na und. Okay.']] },
            ], { ruhe: true }],
          ] : [['d', 'Keiner hat es gesehen. Glaubst du.']] },
          { t: 'Die Lade zumachen.', art: 'nein', e: {}, dann: [['d', 'Du schiebst die Lade zu. Sie klemmt.']] },
        ], { ruhe: true }],
      ];
    } },
  sprayen: { t: 'Das Tor besprühen', art: 'hart', kraft: 1, mist: true, wenn: (R) => !hat(R, 'spray'),
    szene: (R, { zeugen }) => {
      const z = zeuge(zeugen);
      return [
        ['t', 'Im Gras liegt eine Sprühdose. Das Werft-Tor ist frisch gestrichen.'],
        ['w', [
          { t: 'Sprühen.', art: 'hart', e: { druck: -15, ruf: { krater: 1 }, flags: { spray: true, 'spray.tag': tag(R), 'spray.zeuge': z || '' } }, dann: [
            ['t', 'Dein Zeichen. Zwei Meter hoch. Es sieht gut aus.'],
            ...(z ? [['s', z, 'Das war gerade frisch gestrichen.']] : [['d', 'Keiner da. Die Dose wirfst du ins Wasser.']]),
          ] },
          { t: 'Die Dose liegen lassen.', art: 'nein', e: {}, dann: [['d', 'Heute nicht.']] },
        ], { ruhe: true }],
      ];
    } },
  boot: { t: 'Ein Boot nehmen', art: 'hart', kraft: 1, mist: true, wenn: (R) => !hat(R, 'boot.genommen'),
    szene: (R, { zeugen }) => {
      const z = zeuge(zeugen);
      return [
        ['t', 'Tiagos Boot liegt am Steg. Der Schlüssel steckt.'],
        ['w', [
          { t: 'Losfahren.', art: 'hart', e: { druck: -20, spaet: 1, flags: { 'boot.genommen': true, 'boot.tag': tag(R), 'boot.zeuge': z || '' } }, dann: [
            ['t', 'Vollgas. Die Insel wird klein. Du schreist vor Freude.'],
            ['t', 'Beim Anlegen kracht es. Ein Riss im Rumpf.'],
            ['d', 'Du machst das Boot fest. Als wäre nichts.'],
          ] },
          { t: 'Den Schlüssel abziehen.', art: 'ruhig', e: { bond: { tiago: 1 }, flag: 'boot.schluessel' }, dann: [['d', 'Du bringst ihn Tiago. Er wundert sich.']] },
          { t: 'Weitergehen.', art: 'weg', e: {}, dann: [] },
        ], { ruhe: true }],
      ];
    } },
  // Fränz’ Lieferwagen: man fährt ihn wirklich (fahrt: true → plugin.js startet die Fahrt nach der Szene, danach `nach`)
  fahren: { t: 'Den Lieferwagen nehmen', art: 'hart', kraft: 1, mist: true, fahrt: true, wenn: (R) => !hat(R, 'auto.genommen'),
    szene: (R, { zeugen }) => {
      const z = zeuge(zeugen, 'fraenz');
      return [
        ['t', 'Fränz’ Lieferwagen. Die Tür ist offen. Der Schlüssel steckt.'],
        ['w', [
          { t: 'Losfahren.', art: 'hart', e: { flags: { 'auto.genommen': true, 'auto.tag': tag(R), 'auto.zeuge': z || '', 'fahrt.jetzt': true } }, dann: [['d', 'Der Motor springt sofort an.']] },
          { t: 'Den Schlüssel zu Fränz bringen.', art: 'ruhig', e: { bond: { fraenz: 1 }, flag: 'auto.schluessel' }, dann: [['s', 'fraenz', 'Steckte der wieder? Danke. Ich werd alt.']] },
          { t: 'Weitergehen.', art: 'weg', e: {}, dann: [] },
        ], { ruhe: true }],
      ];
    },
    // erg = { strecke, vmax, beulen, erschreckt: [id], weit } aus fahren.js
    nach: (R, erg) => {
      const z = wert(R, 'auto.zeuge', ''), s = [];
      if (erg.wasser) s.push(['t', 'Der Wagen rollt ins Wasser. Du kommst gerade noch raus.'], ['e', { druck: 20, flags: { 'auto.wasser': true, 'auto.stehen': true } }]);
      else if (erg.beulen) s.push(['t', 'Es hat gekracht. Vorne links ist alles eingedrückt.'], ['e', { druck: 10, flag: 'auto.beule' }]);
      else if (erg.strecke > 60) s.push(['t', 'Fenster runter. Zum ersten Mal seit Wochen: frei.'], ['e', { druck: -25 }]);
      else s.push(['t', 'Du rollst ein paar Meter. Dein Herz rast.'], ['e', { druck: -5 }]);
      const w = (erg.erschreckt || []).find((x) => WICHTIG.includes(x));
      if (w) s.push(['s', w, 'Spinnst du? Du hättest mich fast erwischt!'], ['e', { bond: { [w]: -1 }, flags: { 'auto.schreck': w } }]);
      if (erg.wasser) s.push(['d', 'Du stehst tropfnass am Ufer. Keiner sagt etwas.']);
      else if (erg.weit > 25) s.push(['d', 'Du lässt den Wagen einfach stehen.'], ['e', { flag: 'auto.stehen' }]);
      else s.push(['d', 'Du stellst ihn zurück. Fast gerade.']);
      if (z) s.push(['s', z, 'Du bist das gerade gefahren? Echt jetzt?']);
      return s;
    } },
  // Wer es zugegeben hat (oder bei Fränz gut steht), darf wieder ans Steuer – diesmal sitzt er daneben. Einmal am Tag.
  ueben: { t: 'Mit Fränz fahren üben', art: 'ruhig', kraft: 1, fahrt: true,
    wenn: (R) => !hat(R, 'auto.wasser') && !hat(R, 'job.weg') && wert(R, 'ueben.tag', -1) !== tag(R) && (hat(R, 'gestanden.auto') || (!hat(R, 'auto.genommen') && bond(R, 'fraenz') >= 3)),
    szene: (R) => [['s', 'fraenz', 'Nur bis zum Leuchtturm. Ich sitz daneben.'], ['e', { flags: { 'fahrt.jetzt': true, 'ueben.tag': tag(R) } }]],
    nach: (R, erg) => (erg.wasser ? [['s', 'fraenz', 'Ins Wasser. Mit mir drin. Bravo.'], ['e', { druck: 15, bond: { fraenz: -2 }, flags: { 'auto.wasser': true } }]]
      : erg.beulen ? [['s', 'fraenz', 'Das war der Zaun. Den flickst du.'], ['e', { druck: 5 }]]
      : erg.strecke > 60 ? [['s', 'fraenz', 'Sauber gefahren. Nächste Woche wieder.'], ['e', { druck: -20, bond: { fraenz: 1 }, flag: 'ueben.gut' }]]
      : [['s', 'fraenz', 'Du darfst ruhig Gas geben.'], ['e', { druck: -5 }]]) },
  // ----- Steg -----
  angeln: { t: 'Angeln', art: 'ruhig', kraft: 1,
    szene: (R) => {
      if (hat(R, 'boot.genommen') && !hat(R, 'gestanden.boot')) return [['t', 'Tiagos Vater angelt jetzt vom Steg. Er nickt dir zu.'], ['d', 'Du kannst ihn nicht lange ansehen.'], ['e', { druck: 5 }]];
      return [['t', 'Du wirfst die Schnur aus. Warten.'],
        ['spiel', { titel: 'Anschlagen, wenn er beißt', bild: '🐟' }, (g) => (g.treffer >= 2
          ? [['t', g.treffer >= 3 ? 'Drei Makrelen. Fränz gibt dir zwölf Euro dafür.' : 'Zwei Makrelen. Fränz gibt dir acht Euro dafür.'], ['e', { druck: -15, geld: g.treffer >= 3 ? 12 : 8 }]]
          : [['t', 'Nichts gefangen. Trotzdem gut, hier zu sitzen.'], ['e', { druck: -15 }]])]];
    } },
  springen: { t: 'Vom Steg springen', art: 'weg', kraft: 0, wenn: (R) => wert(R, 'sprung', -1) !== tag(R),
    szene: (R, { zeugen }) => {
      const z = (zeugen || []).find((w) => ['mika', 'yara', 'luc', 'tiago', 'pit'].includes(w));
      return [
        ['t', R.jz === 1 ? 'Anlauf, Sprung. Das Wasser ist wie Eis.' : 'Anlauf, Sprung, kaltes Wasser. Du tauchst lachend auf.'],
        ...(z ? [['s', z, 'Zehn Punkte! Noch mal!']] : []),
        ['e', { druck: R.jz === 1 ? -5 : -10, flags: { sprung: tag(R) }, ...(z ? { bond: { [z]: 1 } } : {}) }],
      ];
    } },
  // ----- Krater: Die Vape geht rum (nicht im sanften Modus) -----
  ziehen: { t: 'An der Vape ziehen', art: 'weg', kraft: 0, wenn: (R) => !R.sanft && !hat(R, 'meidet.mika') && wert(R, 'vape.tag', -1) !== tag(R),
    szene: (R) => {
      const n = wert(R, 'vape', 0);
      if (!n) return [
        ['s', 'mika', 'Hier. Mango. Zieh mal.'],
        ['w', [
          { t: 'Ziehen.', art: 'weg', e: { druck: -10, ruf: { krater: 1 }, flags: { vape: 1, 'vape.tag': tag(R) } }, dann: [['d', 'Du hustest. Alle lachen. Du auch.']] },
          { t: 'Nein, lass mal.', art: 'nein', e: { flags: { 'vape.tag': tag(R) } }, dann: [['s', 'mika', 'Mehr für mich.'], ['s', 'yara', 'Ich zieh auch nie. Merkt keiner.']] },
        ], { ruhe: true }],
      ];
      if (n >= 2 && R.geld < 5) return [['s', 'mika', 'Erst zahlen. Fünf Euro. Ich bin kein Automat.'], ['e', { druck: 5, flags: { 'vape.tag': tag(R) } }]];
      return [
        ['t', n >= 2 ? 'Fünf Euro an Mika. Süßer Dampf, leichter Kopf.' : 'Die Vape geht rum. Süßer Dampf, leichter Kopf.'],
        ['e', { druck: -15, geld: n >= 2 ? -5 : 0, spaet: 1, flags: { vape: n + 1, 'vape.tag': tag(R) } }],
      ];
    } },
  // ----- Strand -----
  schwimmen: { t: 'Rausschwimmen', art: 'ruhig', kraft: 1,
    szene: (R, { zeugen }) => {
      const t = (zeugen || []).includes('tiago');
      return [
        ['t', R.jz === 1 ? 'Eiskalt. Du schreist. Dann lachst du laut.' : R.jz === 3 ? 'Das Wasser ist warm. Du schwimmst bis zur Boje.' : 'Kalt, aber gut. Dein Kopf ist danach leer.'],
        ...(t ? [['s', 'tiago', 'Wer zuerst an der Boje ist!']] : []),
        ['e', { druck: R.jz === 1 ? -15 : -25, ...(t ? { bond: { tiago: 1 } } : {}) }],
      ];
    } },
  feuer: { t: 'Feuer am Strand machen', art: 'weg', kraft: 1, mist: true, wenn: (R) => !hat(R, 'feuer'),
    szene: (R, { zeugen }) => {
      const z = zeuge(zeugen);
      return [
        ['t', 'Treibholz, ein Feuerzeug. Daneben steht die alte Strandhütte.'],
        ['w', [
          { t: 'Feuer dicht an der Hütte.', art: 'hart', e: { druck: -20, ruf: { krater: 1 }, spaet: 1, flags: { feuer: true, 'feuer.nah': true, 'feuer.tag': tag(R), 'feuer.zeuge': z || '' } }, dann: [
            ['d', 'Es knackt und leuchtet. Funken fliegen bis zum Dach.'],
            ...(z ? [['s', z, 'Das ist zu nah, Mann. Das Dach ist aus Schilf.']] : []),
          ] },
          { t: 'Feuer unten am Wasser.', art: 'ruhig', e: { druck: -20, spaet: 1, flags: { feuer: true, 'feuer.tag': tag(R) }, ...(z ? { bond: { [z]: 1 } } : {}) }, dann: [
            ['d', 'Ein kleines Feuer. Später löscht es die Flut.'],
            ...(z ? [['s', z, 'Darf ich mich dazusetzen?']] : []),
          ] },
          { t: 'Lieber nicht.', art: 'nein', e: {}, dann: [] },
        ], { ruhe: true }],
      ];
    } },
  // ----- Leuchtturm -----
  aussicht: { t: 'Die Aussicht anschauen', art: 'ruhig', kraft: 1,
    szene: (R, { zeugen }) => {
      const j = (zeugen || []).includes('jolie');
      return [
        ['t', '96 Stufen. Von oben sieht die Insel klein aus.'],
        ['d', 'Deine Sorgen auch. Für einen Moment.'],
        ...(j ? [['s', 'jolie', 'Bleib so stehen. Ich zeichne dich gerade.']] : []),
        ['e', { druck: -20, ...(j ? { bond: { jolie: 1 } } : {}) }],
      ];
    } },
  klettern: { t: 'Aufs Geländer klettern', art: 'hart', kraft: 1, mist: true, wenn: (R) => !R.sanft && !hat(R, 'turm'),
    szene: (R, { zeugen }) => {
      const z = zeuge(zeugen);
      const f = { turm: true, 'turm.tag': tag(R), 'turm.zeuge': z || '' };
      return [
        ['t', 'Ganz oben. Das Geländer ist schmal. Unten nur Felsen.'],
        ['w', [
          { t: 'Draufstellen und filmen.', art: 'hart', e: { druck: -15, ruf: { krater: 2 }, flags: { ...f, 'turm.clip': true } }, dann: [['d', 'Dein Herz hämmert. Der Clip ist zwölf Sekunden lang.']] },
          { t: 'Nur draufstellen.', art: 'weg', e: { druck: -15, flags: f }, dann: [['d', 'Der Wind zerrt an dir. Du stehst.'], ...(z ? [['s', z, 'Komm da runter. Bitte.']] : [])] },
          { t: 'Wieder runtergehen.', art: 'nein', e: { druck: -5 }, dann: [['d', 'Deine Knie sind weich. Die Treppe ist lang.']] },
        ], { ruhe: true }],
      ];
    } },
  // ----- Markt: Bühne und Garten -----
  auftreten: { t: 'Auf die Bühne gehen', art: 'mut', kraft: 1, wenn: (R) => wert(R, 'buehne.jz', -1) !== R.jz,
    szene: (R) => [
      ['t', 'Offene Bühne am Markt. Ein Mikro, zwanzig Leute.'],
      ['w', [
        { t: 'Etwas vortragen.', art: 'mut', e: { flags: { 'buehne.jz': R.jz, buehne: true, 'buehne.n': wert(R, 'buehne.n', 0) + 1 } }, dann: [
          ['d', 'Das Mikro pfeift kurz. Alle schauen dich an.'],
          ['spiel', { titel: 'Im Takt bleiben', bild: '🎤' }, (g) => (g.treffer >= 2
            ? [['d', 'Es wird still. Dann klatschen sie. Für dich.'], ['s', 'maelle', 'Nächstes Mal singen wir zusammen.'], ['e', { druck: -20, bond: { maelle: 1 }, ruf: { hafen: 2 } }]]
            : [['d', 'Deine Stimme kippt. Du machst trotzdem weiter.'], ['s', 'noor', 'Das war mutig. Ehrlich.'], ['e', { druck: -10, bond: { noor: 1 }, ruf: { hafen: 1 } }]])],
        ] },
        { t: 'Nur zuschauen.', art: 'ruhig', e: { druck: -10 }, dann: [['t', 'Maëlle singt. Du kennst das Lied von irgendwo.']] },
      ], { ruhe: true }],
    ] },
  garten: { t: 'Im Garten helfen', art: 'ruhig', kraft: 1, wenn: (R) => !hat(R, 'meidet.lucinda'),
    szene: (R) => (hat(R, 'markt.geklaut') && !hat(R, 'gestanden.markt')
      ? [['t', 'Du ziehst Unkraut. Oma Lucinda summt dabei.'], ['s', 'lucinda', 'Mir fehlen Kopfhörer am Stand. Komisch, oder?'], ['e', { geld: 10, druck: 8, bond: { lucinda: 1 } }]]
      // Merkspiel: Oma Lucinda sagt, was sie aus dem Beet braucht. Wer zuhört und behält, dem traut sie mehr zu.
      : [['t', 'Erde unter den Nägeln. Oma Lucinda zeigt aufs Beet.'], ['s', 'lucinda', 'Hol mir das. Genau in der Reihenfolge.'],
        ['merk', { titel: 'Was braucht Oma Lucinda?' }, (m) => (m.richtig >= 3
          ? [['s', 'lucinda', 'Alles richtig. Du hörst zu. Das können wenige.', { mimik: 'freude' }], ['e', { geld: 14, druck: -12, bond: { lucinda: 2 } }]]
          : m.richtig >= 1
            ? [['s', 'lucinda', 'Fast. Zehn Euro. Und nimm Tomaten mit.'], ['e', { geld: 10, druck: -10, bond: { lucinda: 1 } }]]
            : [['s', 'lucinda', 'Macht nichts. Morgen nochmal. Hier, Tomaten.'], ['e', { geld: 6, druck: -6, bond: { lucinda: 1 } }]])]]) },
  // Tretroller: das Einzige, was man mit Geld kaufen kann und danach behält – damit kommt man schneller über die Insel (roller.js)
  roller: { t: 'Tretroller kaufen', art: 'ruhig', kraft: 0, kostet: 35, wenn: (R) => !hat(R, 'roller'),
    szene: () => [['s', 'lucinda', 'Gebraucht, aber er rollt. 35 Euro.'], ['e', { geld: -35, druck: -10, flag: 'roller' }], ['d', 'Dein eigener Roller. Die Insel wird kleiner.']] },
  kaufen: { t: 'Etwas Süßes kaufen', art: 'ruhig', kraft: 0, kostet: 3, wenn: (R) => wert(R, 'gekauft', -1) !== tag(R),
    szene: (R) => [['t', 'Eine Tüte Saures. Der halbe Markt riecht nach Waffeln.'], ['e', { geld: -3, druck: -8, flags: { gekauft: tag(R) } }]] },
  einstecken: { t: 'Kopfhörer einstecken', art: 'hart', kraft: 1, mist: true, wenn: (R) => !hat(R, 'markt.geklaut') && !hat(R, 'kopfhoerer'),
    szene: (R, { zeugen }) => {
      const z = zeuge(zeugen, 'lucinda');
      return [
        ['t', 'Oma Lucindas Stand. Kopfhörer, 25 Euro. Sie sucht Wechselgeld.'],
        ['w', [
          { t: 'Einstecken.', art: 'hart', e: { druck: -5, flags: { 'markt.geklaut': true, 'markt.tag': tag(R), 'markt.zeuge': z || '' } }, dann: z ? [
            ['s', z, 'Ich hab das gesehen. Leg sie zurück.'],
            ['w', [
              { t: 'Zurücklegen.', art: 'ruhig', e: { bond: { [z]: 1 }, flags: { 'markt.geklaut': false } }, dann: [['d', 'Du legst sie zurück. Deine Hand zittert.']] },
              { t: 'Weitergehen.', art: 'hart', e: { bond: { [z]: -1 } }, dann: [['s', z, 'Sie ist siebzig, Mann.']] },
            ], { ruhe: true }],
          ] : [['d', 'Sie merkt nichts. Sie lächelt dich sogar an.']] },
          { t: 'Bezahlen.', art: 'ruhig', kostet: 25, e: { geld: -25, druck: -10, bond: { lucinda: 1 }, flag: 'kopfhoerer' }, dann: [['s', 'lucinda', 'Gute Wahl. Die hat mein Enkel auch.']] },
          { t: 'Weitergehen.', art: 'weg', e: {}, dann: [] },
        ], { ruhe: true }],
      ];
    } },
};

// ---------- Leute ----------
const SMALLTALK = {
  ilda: ['Der Wind dreht. Morgen wird es rau.', 'Setz dich. Der Tee ist noch warm.'], fraenz: ['Holz lügt nicht. Menschen schon.', 'Gute Hände hast du. Sag ich nicht oft.'],
  jolie: ['Ich zeichne gerade die Fähre. Guck.', 'Manchmal ist es hier zu still. Heute nicht.'], tun: ['Ich hab neue Clips. Willst du sehen?', 'Mein Vater sagt, ich rede zu viel.'],
  pit: ['Der Trick klappt fast. Fast.', 'Du bist okay. Sag ich einfach so.'], mika: ['Hier oben redet man nicht viel.', 'Du schaust zu viel. Das mag ich.'],
  yara: ['Mika ist nicht so hart, wie er tut.', 'Ich will hier weg. Irgendwann.'], luc: ['Was guckst du?', 'Der Wind ist heute gut. Mehr sag ich nicht.'],
  noor: ['Hier kennt jeder jeden. Komisch.', 'Auf der letzten Insel war ich drei Monate.'], tiago: ['Die Wellen sind heute perfekt.', 'Papa fährt morgen raus. Ich darf mit.'],
  maelle: ['Ich übe für das Fest. Nicht lachen.', 'Hörst du das? Das ist mein Lied.'],
  lucinda: ['Iss was, Kind. Du bist ja nur Haut.', 'Noor redet von dir. Nur Gutes, bis jetzt.'],
};
// Pommes ausgeben: ein Satz, den man sonst nicht hört
const EINLADEN = {
  jolie: 'Zu Hause redet keiner beim Essen. Hier schon.', tun: 'Ich filme alles, damit ich nichts vergesse.', pit: 'Mein Bruder konnte den Trick. Dann zog er weg.',
  mika: 'Sag keinem, dass ich Pommes mit Mayo mag.', yara: 'Mit dir kann man schweigen. Das ist selten.', luc: 'Hat mich noch nie einer eingeladen.',
  noor: 'Auf der letzten Insel hatte ich niemanden.', tiago: 'Papa sagt, das Meer zahlt immer zurück.', maelle: 'Ich singe nur, wenn keiner zuhört. Fast.',
};
// Freundschaft trägt: Wer jemandem nahe ist (Bindung ab 3), wird von der Person eingeladen (Nachricht am Morgen).
// Dann gibt es beim Ansprechen „Zusammen losziehen“ – ein kurzer gemeinsamer Moment, einmal je Person.
const TREFF = {
  jolie: { chat: 'Ich zeichne heute am Steg. Kommst du?', text: ['Ihr sitzt am Steg. Jolie zeichnet dich.', 'Auf dem Bild lachst du. Du erkennst dich kaum.'] },
  tun: { chat: 'Neuer Clip. Du musst mitspielen. Bitte!', text: ['Tun filmt, du spielst den Bösewicht.', 'Ihr lacht, bis der Akku leer ist.'] },
  pit: { chat: 'Hab eine neue Rampe gebaut. Komm testen.', text: ['Pits Rampe wackelt. Ihr fahrt trotzdem.', 'Er zeigt dir, wie man richtig fällt.'] },
  noor: { chat: 'Oma Lucinda kocht. Du bist eingeladen.', text: ['Bei Oma Lucinda riecht es nach Knoblauch.', 'Noor erzählt von den anderen Inseln. Du hörst zu.'] },
  tiago: { chat: 'Papa nimmt uns mit raus. Um sechs!', text: ['Draußen auf dem Meer ist es ganz still.', 'Tiago lässt dich das Netz einholen.'] },
  maelle: { chat: 'Ich hab ein Lied. Hörst du es dir an?', text: ['Maëlle singt nur für dich. Sie zittert.', 'Beim zweiten Mal singst du leise mit.'] },
};
export const TREFF_LEUTE = Object.keys(TREFF);
// Zuhören: Was jemand beim Pommes-Essen erzählt hat, in wenigen Wörtern. Tage später fragt die Person nach –
// wer es noch weiß, hat zugehört (kleines Merkspiel beim Reden, ohne Erklärung).
const MERK = {
  jolie: 'Zu Hause ist es still.', tun: 'Er filmt gegen das Vergessen.', pit: 'Sein Bruder zog weg.', mika: 'Er mag Pommes mit Mayo.', yara: 'Mit dir kann sie schweigen.',
  luc: 'Ihn lädt sonst keiner ein.', noor: 'Dort hatte sie niemanden.', tiago: 'Das Meer zahlt zurück.', maelle: 'Sie singt nur heimlich.',
};
export function merkFrage(R, wer) {
  const namen = Object.keys(MERK).filter((w) => w !== wer), n = tag(R) + wer.length;
  const falsch = [namen[n % namen.length], namen[(n + 3) % namen.length]];
  const liste = [{ t: MERK[wer], gut: true }, { t: MERK[falsch[0]] }, { t: MERK[falsch[1]] }];
  for (let i = 0; i < n % 3; i++) liste.push(liste.shift());   // Reihenfolge wechselt, ist aber je Tag fest
  return [
    ['s', wer, 'Weißt du noch, was ich dir erzählt hab?'],
    ['w', liste.map((x) => ({ t: x.t, art: 'ruhig', e: x.gut ? { bond: { [wer]: 1 }, flags: { ['gemerkt.' + wer]: true } } : { flags: { ['gemerkt.' + wer]: true } },
      dann: [['s', wer, x.gut ? 'Du hörst echt zu. Macht sonst keiner.' : 'Nee. Egal. Vergiss es.']] })), { ruhe: true }],
  ];
}
// Lästern: über wen man bei wem redet (die Person, die dem Zuhörer am nächsten steht – das weiß man vorher nicht)
const LAESTER_ZIEL = { tun: 'jolie', jolie: 'maelle', pit: 'tun', mika: 'luc', yara: 'mika', luc: 'yara', noor: 'jolie', tiago: 'pit', maelle: 'noor' };
// Etwas zugeben: bei wem was (das Erste, das zutrifft)
function beichte(R, wer) {
  if (wer === 'fraenz') {
    if (hat(R, 'kasse.geklaut') && !hat(R, 'gestanden.kasse')) return [
      ['d', 'Die zwanzig Euro aus der Kasse. Das war ich.'],
      ['s', 'fraenz', folgeWar(R, 'kasse.fraenz') ? 'Ich weiß. Ich hab gewartet, ob du kommst.' : 'Du? Und kommst von selbst her.'],
      ['w', [
        { t: 'Das Geld zurückgeben.', art: 'mut', kostet: 20, e: { geld: -20, bond: { fraenz: 3, ...(hat(R, 'kasse.pitverdacht') ? { pit: 2 } : {}) }, akte: 'gestanden', flags: { 'gestanden.kasse': true, 'job.weg': false, 'kasse.pitverdacht': false } }, dann: [['s', 'fraenz', 'Montag um vier. Die Pommes machen sich nicht allein.']] },
        { t: 'Nur sagen, dass es leidtut.', art: 'ruhig', e: { bond: { fraenz: 1, ...(hat(R, 'kasse.pitverdacht') ? { pit: 2 } : {}) }, akte: 'gestanden', flags: { 'gestanden.kasse': true, 'kasse.pitverdacht': false } }, dann: [['s', 'fraenz', 'Worte sind billig. Aber du bist gekommen.']] },
      ], { ruhe: true }],
    ];
    if (hat(R, 'spray') && !hat(R, 'gestanden.spray')) return [
      ['d', 'Das Tor. Das war ich. Nicht Tun.'],
      ['s', 'fraenz', 'Dann streichst du es. Samstag. Sieben Uhr.'],
      ['e', { bond: { fraenz: 1, ...(hat(R, 'spray.tunschuld') ? { tun: 2 } : {}) }, akte: 'gestanden', flags: { 'gestanden.spray': true, 'spray.tunschuld': false } }],
    ];
    if (hat(R, 'auto.genommen') && !hat(R, 'gestanden.auto')) return [
      ['d', 'Der Lieferwagen. Ich bin gefahren.'],
      ['s', 'fraenz', hat(R, 'auto.beule') ? 'Die Beule kostet 400 Euro. Du arbeitest sie ab.' : 'Mit fünfzehn. Ohne Schein. Bist du verrückt?'],
      ['s', 'fraenz', 'Aber du stehst hier. Das zählt bei mir.'],
      ['e', { bond: { fraenz: 2 }, akte: 'gestanden', flags: { 'gestanden.auto': true, 'job.weg': false } }],
    ];
  }
  if (wer === 'tiago' && hat(R, 'boot.genommen') && !hat(R, 'gestanden.boot')) return [
    ['d', 'Das Boot. Der Riss. Das war ich.'],
    ['s', 'tiago', 'Papa dachte, er hat es falsch festgemacht.'],
    ['s', 'tiago', 'Sag es ihm selbst. Ich komm mit.'],
    ['e', { bond: { tiago: 2 }, akte: 'gestanden', flags: { 'gestanden.boot': true, 'meidet.tiago': false } }],
  ];
  if (wer === 'tiago' && hat(R, 'feuer.nah') && !hat(R, 'gestanden.feuer')) return [
    ['d', 'Das Feuer an der Hütte. Das war ich.'],
    ['s', 'tiago', 'Die Netze stinken nach Rauch. Aber sie halten.'],
    ['s', 'tiago', 'Hilf mir Samstag, das Dach zu flicken.'],
    ['e', { bond: { tiago: 2, ...(hat(R, 'feuer.mikaschuld') ? { mika: 1, yara: 1 } : {}) }, akte: 'gestanden', flags: { 'gestanden.feuer': true, 'feuer.mikaschuld': false, 'meidet.tiago': false } }],
  ];
  if (wer === 'lucinda' && hat(R, 'markt.geklaut') && !hat(R, 'gestanden.markt')) return [
    ['d', 'Die Kopfhörer. Ich hab nicht bezahlt.'],
    ['s', 'lucinda', 'Ich weiß, Kind. Ich hab es gesehen.'],
    ['s', 'lucinda', 'Ich wollte wissen, ob du wiederkommst.'],
    ['e', { geld: -Math.min(25, R.geld), bond: { lucinda: 2, noor: 1 }, akte: 'gestanden', flags: { 'gestanden.markt': true, 'markt.noorverdacht': false } }],
  ];
  return null;
}
const SPOTT = {
  jolie: 'Malst du wieder deine Babybilder?', tun: 'Keiner lacht über deine Witze, Tun.', pit: 'Fall doch noch mal. War lustig.', noor: 'Na, Pinguin? Wieder verlaufen?',
  mika: 'Großer Mika. Ohne Crew bist du nichts.', yara: 'Läufst du Mika immer hinterher?', luc: 'Sag mal was Schlaues, Luc. Einmal.', tiago: 'Dein Boot ist ein Witz.', maelle: 'Sing leiser. Tut weh in den Ohren.',
  ilda: 'Sie haben mir gar nichts zu sagen.', fraenz: 'Ihr Kiosk ist der letzte Laden.',
};
const HILFE = {
  pit: ['Pits Brett ist gebrochen. Ihr leimt es zusammen.', 'Hält. Danke. Echt.'], jolie: ['Jolies Mappe ist ins Wasser gefallen. Du trocknest Blätter.', 'Die meisten sind gerettet. Wegen dir.'],
  lucinda: ['Der Stand muss vor dem Regen abgebaut sein.', 'Flinke Hände. Komm Sonntag zum Essen.'],
  fraenz: ['Zwanzig Kisten müssen ins Lager. Du schleppst.', 'Stark. Das vergess ich nicht.'], ilda: ['Ein Netz ist gerissen. Ihr flickt zwei Stunden.', 'Gute Knoten. Wer hat dir das gezeigt?'],
  noor: ['Noor findet den Weg zum Markt nicht. Du gehst mit.', 'Jetzt kenn ich wenigstens einen Weg.'], tun: ['Tuns Kamera spinnt. Ihr sucht den Fehler.', 'Läuft wieder! Du bist ein Genie.'],
};

export const LEUTE_AKTIONEN = {
  gestehen: { t: 'Es zugeben', art: 'mut', kraft: 1, wenn: (R, wer) => !!beichte(R, wer), szene: (R, { wer }) => beichte(R, wer) || [] },
  einladen: { t: 'Pommes ausgeben', art: 'ruhig', kraft: 0, kostet: 5, wenn: (R, wer) => !!EINLADEN[wer] && wert(R, 'eingeladen.' + wer, -9) < tag(R) - 2,
    szene: (R, { wer }) => (hat(R, 'meidet.' + wer) ? [['s', wer, 'Behalt deine Pommes.']] : [
      ['t', 'Ihr sitzt auf der Mauer. Ketchup überall.'],
      ['s', wer, EINLADEN[wer]],
      ['e', { geld: -5, druck: -5, bond: { [wer]: 1 }, flags: { ['eingeladen.' + wer]: tag(R) } }],
    ]) },
  laestern: { t: 'Über jemanden lästern', art: 'hart', kraft: 0, wenn: (R, wer) => !!LAESTER_ZIEL[wer] && !hat(R, 'meidet.' + wer) && !hat(R, 'laester.bei.' + wer),
    szene: (R, { wer }) => {
      const ziel = LAESTER_ZIEL[wer];
      return [
        ['d', '„Hast du gehört, was ' + NAME[ziel] + ' gemacht hat?“'],
        ['s', wer, 'Echt? Erzähl.'],
        ['t', 'Ihr lacht. Zu zweit fühlt es sich gut an.'],
        ['e', { bond: { [wer]: 1 }, ruf: { hafen: 1 }, flags: { ['laester.bei.' + wer]: true, ['laester.' + ziel]: wer, ['laester.tag.' + ziel]: tag(R) } }],
      ];
    } },
  treffen: { t: 'Zusammen losziehen', art: 'ruhig', kraft: 1, wenn: (R, wer) => !!TREFF[wer] && hat(R, 'treff.' + wer) && !hat(R, 'meidet.' + wer),
    szene: (R, { wer }) => [['t', TREFF[wer].text[0]], ['t', TREFF[wer].text[1]], ['e', { druck: -15, bond: { [wer]: 1 }, flags: { ['treff.' + wer]: false, ['getroffen.' + wer]: true } }]] },
  reden: { t: 'Reden', art: 'ruhig', kraft: 0,
    szene: (R, { wer }) => {
      if (hat(R, 'meidet.' + wer)) return [['s', wer, GROSSE.includes(wer) ? 'Nicht jetzt.' : 'Lass mich.']];
      // ab dem Tag nach den Pommes: einmal die Frage, ob man zugehört hat
      if (MERK[wer] && !hat(R, 'gemerkt.' + wer) && wert(R, 'eingeladen.' + wer, 99) < tag(R)) return merkFrage(R, wer);
      const l = SMALLTALK[wer] || ['Moien.'];
      const schon = wert(R, 'geredet.' + wer, -1) === tag(R);
      return [['s', wer, l[(tag(R) + wer.length) % l.length]], ...(schon ? [] : [['e', { bond: bond(R, wer) < 3 ? { [wer]: 1 } : {}, flags: { ['geredet.' + wer]: tag(R) } }]])];
    } },
  helfen: { t: 'Helfen', art: 'mut', kraft: 1, wenn: (R, wer) => !!HILFE[wer] && !hat(R, 'geholfen.' + wer),
    szene: (R, { wer }) => [['t', HILFE[wer][0]], ['s', wer, HILFE[wer][1]], ['e', { bond: { [wer]: 2 }, druck: -5, flags: { ['geholfen.' + wer]: true, ['meidet.' + wer]: false } }]] },
  aufziehen: { t: 'Aufziehen', art: 'hart', kraft: 0, mist: true, wenn: (R, wer) => !!SPOTT[wer],
    szene: (R, { wer, zeugen }) => {
      const z = zeuge(zeugen, wer), n = wert(R, 'spott.' + wer, 0) + 1, gross = GROSSE.includes(wer);
      return [
        ['d', '„' + SPOTT[wer] + '“'],
        ['m', wer, { mimik: gross ? 'wut' : 'trauer' }],
        ...(z && !gross ? [['s', z, 'Haha! Der war gut.'], ['e', { ruf: { hafen: 1 } }]] : []),
        ['s', wer, gross ? 'So redest du nicht mit mir.' : n >= 2 ? 'Hör auf. Bitte.' : 'Sehr witzig.'],
        ['e', { bond: { [wer]: n >= 2 ? -2 : -1 }, flags: { ['spott.' + wer]: n, ['spott.tag.' + wer]: tag(R) }, ...(gross ? { ruf: { gross: -1 } } : {}) }],
      ];
    } },
  filmen: { t: 'Heimlich filmen', art: 'weg', kraft: 0, mist: true, wenn: (R, wer) => !hat(R, 'clip.' + wer),
    szene: (R, { wer }) => [
      ['t', 'Du hältst das Handy tief. ' + NAME[wer] + ' merkt nichts.'],
      ['w', [
        { t: 'In die Gruppe stellen.', art: 'hart', e: { ruf: { hafen: 1 }, flags: { ['clip.' + wer]: 'online', ['clip.tag.' + wer]: tag(R) }, chat: { von: 'gruppe', text: 'Du: Guckt mal. ' + NAME[wer] + '. 31 Aufrufe.' } }, dann: [['d', '31 Aufrufe. Drei lachende Gesichter.']] },
        { t: 'Behalten.', art: 'weg', e: { flags: { ['clip.' + wer]: 'handy' } }, dann: [['d', 'Der Clip liegt in deinem Handy.']] },
        { t: 'Löschen.', art: 'nein', e: {}, dann: [['d', 'Gelöscht. War eh nicht lustig.']] },
      ], { ruhe: true }],
    ] },
  leihen: { t: 'Um Geld bitten', art: 'weg', kraft: 0, wenn: (R, wer) => !hat(R, 'schuld.' + wer) && !GROSSE.includes(wer),
    szene: (R, { wer }) => (bond(R, wer) >= 1 ? [['s', wer, 'Zehn Euro. Aber ich krieg sie wieder.'], ['e', { geld: 10, flags: { ['schuld.' + wer]: true, ['schuld.tag.' + wer]: tag(R) } }]] : [['s', wer, 'Dir? Ich kenn dich kaum.']]) },
  zurueck: { t: 'Geld zurückgeben', art: 'ruhig', kraft: 0, kostet: 10, wenn: (R, wer) => hat(R, 'schuld.' + wer),
    szene: (R, { wer }) => [['s', wer, 'Oh. Hätte ich nicht gedacht. Danke.'], ['e', { geld: -10, bond: { [wer]: 1 }, flags: { ['schuld.' + wer]: false, ['meidet.' + wer]: false } }]] },
  schubsen: { t: 'Schubsen', art: 'hart', kraft: 0, mist: true, wenn: (R, wer) => !R.sanft && !GROSSE.includes(wer),
    szene: (R, { wer, zeugen }) => {
      const z = zeuge(zeugen, wer), crew = ['mika', 'luc', 'yara'].includes(wer);
      return [
        ['t', NAME[wer] + ' fällt hin. Hart.'],
        ['m', wer, { mimik: crew ? 'wut' : 'angst' }],
        ['s', wer, crew ? 'Das wirst du bereuen.' : 'Was hab ich dir getan?'],
        ...(z ? [['s', z, 'Spinnst du?!']] : []),
        ['e', { druck: -5, bond: { [wer]: -2, ...(z ? { [z]: -1 } : {}) }, ruf: crew ? { krater: -2 } : { hafen: -1 }, flags: { ['schubs.' + wer]: true, 'schubs.tag': tag(R), 'schubs.zeuge': z || '', 'schubs.wer': wer } }],
      ];
    } },
  entschuldigen: { t: 'Sich entschuldigen', art: 'ruhig', kraft: 0, wenn: (R, wer) => (hat(R, 'meidet.' + wer) || bond(R, wer) < 0) && !hat(R, 'sorry.' + wer),
    szene: (R, { wer }) => [
      ['d', 'Das war nicht okay von mir.'],
      ['s', wer, bond(R, wer) <= -3 ? 'Zu spät. Lass mich in Ruhe.' : 'Okay. Mal sehen.'],
      ['e', bond(R, wer) <= -3 ? { flags: { ['sorry.' + wer]: true } } : { bond: { [wer]: 1 }, flags: { ['sorry.' + wer]: true, ['meidet.' + wer]: false } }],
    ] },
};
// Leute ohne Namen (Statisten): ein Satz im Vorbeigehen. Zuerst das, was die Insel gerade über dich redet –
// so merkt man, dass sich herumspricht, was man tut. Sonst ein Gruß.
const TRATSCH = [
  [(R) => hat(R, 'feuer.nah') && seit(R, 'feuer.tag') >= 1, 'Die Strandhütte ist halb schwarz. Hast du das gesehen?'],
  [(R) => hat(R, 'spray') && seit(R, 'spray.tag') >= 1, 'Das Tor an der Werft. Wer macht so was?'],
  [(R) => hat(R, 'auto.genommen') && !hat(R, 'gestanden.auto'), 'Fränz sucht den, der seinen Wagen hatte.'],
  [(R) => hat(R, 'turm.tun'), 'Der Junge mit der Kamera. Arm in Gips.'],
  [(R) => folgeWar(R, 'kasse.geruecht'), 'Am Kiosk soll einer klauen. Sagt man.'],
  [(R) => hat(R, 'boot.genommen') && seit(R, 'boot.tag') >= 1, 'Tiagos Vater flickt seit Tagen sein Boot.'],
  [(R) => hat(R, 'buehne'), 'Du warst doch auf der Bühne! Stark.'],
  [(R) => (R.akte || []).includes('gestanden'), 'Du hast was zugegeben, hör ich. Respekt.'],
  [(R) => (R.ruf.gross || 0) >= 2, 'Ilda redet gut von dir. Das tut sie selten.'],
  [(R) => (R.ruf.gross || 0) <= -2, 'Dich kenn ich. Von dir hört man einiges.'],
];
const GRUSS = ['Moien.', 'Schöner Tag heute, oder?', 'Pass auf, die Straße ist neu.', 'Die Fähre hat wieder Verspätung.', 'Am Markt gibt es frische Waffeln.', 'Der Wind kommt heute vom Meer.',
  'Na, auch unterwegs?', 'Bei Fränz gibt es die besten Pommes.'];
export function statistSagt(R, wer) {
  const t = TRATSCH.filter(([wenn]) => wenn(R)), n = tag(R) + String(wer || '').length;
  return t.length && n % 3 !== 0 ? t[n % t.length][1] : GRUSS[n % GRUSS.length];
}
export const TRATSCH_ZEILEN = TRATSCH.map((x) => x[1]).concat(GRUSS);

// ---------- Ideen für heute (Handy → „Heute“) ----------
// Ein freier Tag ohne Termin wirkte leer („Heute steht nichts an“). Jetzt stehen im Handy bis zu drei Hinweise, wo gerade
// etwas los ist – nur auf Dinge, die es heute wirklich gibt, nie auf Mist. Kein Auftrag, kein Lohn fürs Hingehen.
const IDEEN = [
  { ort: 'zuhause', akt: 'schlafen', text: 'Du bist müde. Dein Bett wartet.', wenn: (R) => (R.kraft || 0) <= 0, vor: true },
  { ort: 'steg', akt: 'wasser', text: 'Dein Kopf ist voll. Am Steg ist es still.', wenn: (R) => R.druck >= 60, vor: true },
  { ort: 'kiosk', akt: 'job', text: 'Fränz braucht heute jemanden am Kiosk.', wenn: (R) => !hat(R, 'job.weg') },
  { ort: 'brunnen', akt: 'tricks', text: 'Pit übt Tricks am Brunnen.', wenn: (R) => !hat(R, 'pit.weg') },
  { ort: 'brunnen', akt: 'rennen', text: 'Pit wettet: Du bist zu langsam.', wenn: (R) => !hat(R, 'pit.weg') },
  { ort: 'steg', akt: 'angeln', text: 'Am Steg beißen heute die Fische.' },
  { ort: 'garten', akt: 'garten', text: 'Oma Lucinda schafft den Garten nicht allein.' },
  { ort: 'buehne', akt: 'auftreten', text: 'Die Bühne am Markt ist heute frei.' },
  { ort: 'leuchtturm', akt: 'aussicht', text: 'Vom Leuchtturm sieht man heute weit.' },
  { ort: 'strand', akt: 'schwimmen', text: 'Das Wasser am Strand ist ruhig.' },
  { ort: 'krater', akt: 'abhaengen', text: 'Mikas Crew hängt am Krater.', wenn: (R) => !hat(R, 'meidet.mika') },
  { ort: 'markt', akt: 'roller', text: 'Am Markt steht ein Tretroller. 35 Euro.', wenn: (R) => R.geld >= 35 },
  { ort: 'lieferwagen', akt: 'ueben', text: 'Fränz hat Zeit. Fahren üben?' },
];
export function ideenFuerHeute(R, max = 3) {
  const geht = (i) => { const a = ORT_AKTIONEN[i.akt]; return !!a && !a.mist && (a.kraft || 0) <= (R.kraft || 0) && (a.kostet || 0) <= R.geld && (!a.wenn || a.wenn(R)) && (!i.wenn || i.wenn(R)); };
  const vor = IDEEN.filter((i) => i.vor && geht(i)), rest = IDEEN.filter((i) => !i.vor && geht(i));
  const n = tag(R) * 5 + (R.seed || 0), aus = vor.slice(0, max), orte = new Set(aus.map((i) => i.ort));
  // jeden Tag andere Hinweise, höchstens einer je Ort
  for (let k = 0; k < rest.length && aus.length < max; k++) { const i = rest[(n + k * 3) % rest.length]; if (!orte.has(i.ort) && !aus.includes(i)) { aus.push(i); orte.add(i.ort); } }
  return aus.map((i) => ({ ort: i.ort, text: i.text }));
}
export const IDEEN_ZEILEN = IDEEN.map((i) => i.text);

export const LEUTE_REIHE = ['gestehen', 'treffen', 'reden', 'einladen', 'helfen', 'entschuldigen', 'zurueck', 'leihen', 'laestern', 'filmen', 'aufziehen', 'schubsen'];

// ---------- Folgen (jeden Morgen geprüft) ----------
const freund = (R, z) => !!z && bond(R, z) >= 2;
export const FOLGEN = [
  // Kasse: Fränz zählt abends. Mit Zeuge, der nicht dein Freund ist, weiß es bald der ganze Hafen.
  { id: 'kasse.fraenz', wenn: (R) => hat(R, 'kasse.geklaut') && seit(R, 'kasse.tag') >= 1,
    text: ['Fränz hat abends die Kasse gezählt.', 'Zwanzig Euro fehlen. Er hat lange dagesessen.'],
    e: (R) => ({ bond: { fraenz: -2 }, flag: 'job.weg', akte: 'kasse', chat: { von: 'fraenz', text: 'Mir fehlen zwanzig Euro. Du warst der Letzte an der Kasse. Komm vorbei.' } }) },
  { id: 'kasse.geruecht', wenn: (R) => folgeWar(R, 'kasse.fraenz') && wert(R, 'kasse.zeuge', '') && !freund(R, wert(R, 'kasse.zeuge', '')),
    text: ['In der Gruppe steht: Jemand klaut bei Fränz.', 'Dein Name steht nicht da. Alle wissen es trotzdem.'],
    e: () => ({ ruf: { hafen: -2, gross: -1 }, bond: { jolie: -1, ilda: -1 }, chat: { von: 'gruppe', text: 'Jemand hat bei Fränz in die Kasse gegriffen. Ratet, wer.' } }) },
  { id: 'kasse.pit', wenn: (R) => folgeWar(R, 'kasse.fraenz') && !wert(R, 'kasse.zeuge', '') && seit(R, 'kasse.tag') >= 2,
    text: ['Fränz verdächtigt jetzt Pit. Der war auch am Kiosk.', 'Pit darf dort nicht mehr hin.'],
    e: () => ({ flag: 'kasse.pitverdacht', chat: { von: 'pit', text: 'Fränz denkt, ich hab geklaut. Ich war das nicht. Glaubst du mir?' } }) },
  // Sprayen: Ohne Zeuge bekommt Tun den Ärger – er hat schon einmal gesprüht.
  { id: 'spray.tun', wenn: (R) => hat(R, 'spray') && seit(R, 'spray.tag') >= 1 && !wert(R, 'spray.zeuge', ''),
    text: ['Alle denken, Tun hat das Tor besprüht.', 'Sein Vater hat ihm das Handy weggenommen. Vier Wochen.'],
    e: () => ({ flag: 'spray.tunschuld', chat: { von: 'jolie', text: 'Tun sagt, er war es nicht. Keiner glaubt ihm. Weißt du was?' } }) },
  { id: 'spray.gesehen', wenn: (R) => hat(R, 'spray') && seit(R, 'spray.tag') >= 1 && !!wert(R, 'spray.zeuge', ''),
    text: ['Fränz weiß, wer das Tor besprüht hat.', 'Er hat es allein neu gestrichen. Bis Mitternacht.'],
    e: () => ({ bond: { fraenz: -2 }, ruf: { gross: -1 }, akte: 'spray' }) },
  // Feuer an der Hütte: Mit Zeuge weiß es Tiagos Familie. Ohne Zeuge bekommt die Krater-Crew den Ärger.
  { id: 'feuer.huette', wenn: (R) => hat(R, 'feuer.nah') && seit(R, 'feuer.tag') >= 1 && !!wert(R, 'feuer.zeuge', ''),
    text: ['Das Dach der Strandhütte ist halb verkohlt.', 'Tiagos Familie lagert dort ihre Netze. Sie wissen, wer es war.'],
    e: () => ({ bond: { tiago: -2 }, ruf: { gross: -1 }, akte: 'feuer', chat: { von: 'tiago', text: 'Unsere Hütte. Im Ernst? Die Netze sind fast verbrannt.' } }) },
  { id: 'feuer.crew', wenn: (R) => hat(R, 'feuer.nah') && seit(R, 'feuer.tag') >= 1 && !wert(R, 'feuer.zeuge', ''),
    text: ['Das Dach der Strandhütte ist halb verkohlt.', 'Alle sagen: Das war die Crew vom Krater.'],
    e: () => ({ flag: 'feuer.mikaschuld', chat: { von: 'yara', text: 'Alle denken, wir haben am Strand gezündelt. Waren wir nicht. Weißt du was?' } }) },
  // Leuchtturm: Ein Clip findet Nachahmer. Ohne Clip erfährt es nur Ilda.
  { id: 'turm.clip', wenn: (R) => hat(R, 'turm.clip') && seit(R, 'turm.tag') >= 1,
    text: ['Dein Clip vom Leuchtturm hat 400 Aufrufe.', 'Tun wollte es nachmachen. Er ist abgerutscht. Arm gebrochen.'],
    e: () => ({ flag: 'turm.tun', bond: { jolie: -1, ilda: -1 }, ruf: { gross: -1 }, akte: 'turm', chat: { von: 'jolie', text: 'Tun liegt im Krankenhaus. Er sagt, er wollte es machen wie du.' } }) },
  { id: 'turm.gesehen', wenn: (R) => hat(R, 'turm') && !hat(R, 'turm.clip') && seit(R, 'turm.tag') >= 1 && !!wert(R, 'turm.zeuge', ''),
    text: ['Jemand hat Ilda vom Leuchtturm erzählt.', 'Sie hat die Tür oben abgeschlossen.'],
    e: () => ({ bond: { ilda: -1 }, chat: { von: 'ilda', text: 'Ich war auch mal fünfzehn. Komm trotzdem vorbei.' } }) },
  // Vape: erst lustig, dann fehlt etwas. Mika rechnet mit.
  { id: 'vape.ilda', wenn: (R) => wert(R, 'vape', 0) >= 2 && seit(R, 'vape.tag') >= 1,
    text: ['Ilda riecht an deiner Jacke. Mango.', 'Sie sagt nichts. Sie schaut nur lange.'],
    e: () => ({ chat: { von: 'ilda', text: 'Ich frag nicht. Aber ich bin da, wenn was ist.' } }) },
  { id: 'vape.gewohnt', wenn: (R) => wert(R, 'vape', 0) >= 4 && seit(R, 'vape.tag') >= 1,
    text: ['Abends bist du unruhig, bis du am Krater warst.', 'Mika sagt: Ab jetzt zahlst du die Pods.'],
    e: () => ({ druck: 10, flag: 'vape.gewohnt', chat: { von: 'mika', text: 'Du schuldest mir 15. Für die Pods. Bis Freitag.' } }) },
  // Bühne: Wer sich getraut hat, wird gefragt
  { id: 'buehne.fest', wenn: (R) => hat(R, 'buehne') && wert(R, 'buehne.jz', -1) !== R.jz,
    text: ['Maëlle hat dich für das Fest eingetragen.', 'Dein Name steht auf dem Plakat am Markt.'],
    e: () => ({ bond: { maelle: 1 }, chat: { von: 'maelle', text: 'Ich hab dich einfach eingetragen. Sag nicht Nein.' } }) },
  // Freundschaft: Wer jemandem nahe ist, wird eingeladen (einmal je Person)
  ...TREFF_LEUTE.map((w) => ({ id: 'freund.' + w, wenn: (R) => bond(R, w) >= 3 && !hat(R, 'meidet.' + w),
    text: [NAME[w] + ' hat dir geschrieben.', 'Seit wann schreibt dir hier jemand zuerst?'],
    e: () => ({ flag: 'treff.' + w, chat: { von: w, text: TREFF[w].chat } }) })),
  // Lagerfeuer: Wer mitgefilmt hat, dessen Clip geht rum
  { id: 'lager.clip', wenn: (R) => hat(R, 'lager.gefilmt'),
    text: ['Dein Video von Pits Sturz geht durch die Gruppe.', 'Er war heute nicht am Brunnen.'],
    e: () => ({ bond: { jolie: -1 }, chat: { von: 'jolie', text: 'Du hast gefilmt, wie Pit fällt? Im Ernst?' } }) },
  // Boot: Tiagos Vater kann nicht rausfahren
  { id: 'boot.tiago', wenn: (R) => hat(R, 'boot.genommen') && seit(R, 'boot.tag') >= 1,
    text: ['Tiagos Vater wollte heute fischen fahren.', 'Das Boot zieht Wasser. Eine Woche ohne Fang.'],
    e: (R) => ({ bond: { tiago: wert(R, 'boot.zeuge', '') ? -3 : -1 }, ...(wert(R, 'boot.zeuge', '') ? { akte: 'boot', ruf: { gross: -1 } } : {}), chat: { von: 'tiago', text: wert(R, 'boot.zeuge', '') ? 'Du warst das. Papa hat geweint. Ich hab ihn noch nie weinen sehen.' : 'Jemand hat unser Boot kaputt gemacht. Papa kann nicht raus. Hast du was gesehen?' } }) },
  // Spott: Wer zweimal dran war, zieht sich zurück. Bei Pit merkt es Jolie.
  ...['pit', 'jolie', 'tun', 'noor', 'maelle', 'tiago'].map((w) => ({ id: 'spott.' + w, wenn: (R) => wert(R, 'spott.' + w, 0) >= 2 && seit(R, 'spott.tag.' + w) >= 1,
    text: w === 'pit' ? ['Pit kommt nicht mehr zum Brunnen.', 'Jolie sagt: Er geht gar nicht mehr raus.'] : [NAME[w] + ' wechselt die Seite, wenn du kommst.'],
    e: () => ({ flags: { ['meidet.' + w]: true, ...(w === 'pit' ? { 'pit.weg': true } : {}) }, ...(w === 'pit' ? { bond: { jolie: -2 }, chat: { von: 'jolie', text: 'Pit geht nicht mehr raus. Wegen dir. Ich dachte, du bist anders.' } } : {}) }) })),
  // Clip: am nächsten Tag hat ihn die Person gesehen – und er ist nicht mehr zurückzuholen
  ...WICHTIG.map((w) => ({ id: 'clip.' + w, wenn: (R) => wert(R, 'clip.' + w, '') === 'online' && seit(R, 'clip.tag.' + w) >= 1,
    text: [NAME[w] + ' hat den Clip gesehen. Alle haben ihn gesehen.', 'Jemand hat ihn weitergeschickt. Aufs Festland.'],
    e: () => ({ bond: { [w]: -2 }, flags: { ['meidet.' + w]: !GROSSE.includes(w) }, ...(GROSSE.includes(w) ? { akte: 'clip', ruf: { gross: -2 } } : {}), chat: { von: w, text: GROSSE.includes(w) ? 'Wir müssen reden. Heute.' : 'Warum? Ich hab dir nichts getan.' } }) })),
  // Schulden: nach zwei Tagen fragt die Person nach
  ...['jolie', 'tun', 'pit', 'noor', 'yara', 'tiago', 'maelle', 'mika', 'luc'].map((w) => ({ id: 'schuld.' + w, wenn: (R) => hat(R, 'schuld.' + w) && seit(R, 'schuld.tag.' + w) >= 2,
    text: [NAME[w] + ' wartet noch auf zehn Euro.'],
    e: () => ({ bond: { [w]: -1 }, chat: { von: w, text: 'Zehn Euro. Mehr war ich dir nicht wert?' } }) })),
  // Schubsen: mit Zeuge erfährt es Ilda
  { id: 'schubs.ilda', wenn: (R) => !!wert(R, 'schubs.zeuge', '') && seit(R, 'schubs.tag') >= 1,
    text: ['Ilda weiß von gestern.', 'Sie hat es in die Akte geschrieben. Ohne zu fragen.'],
    e: () => ({ bond: { ilda: -1 }, ruf: { gross: -1 }, akte: 'schubsen' }) },
  { id: 'schubs.crew', wenn: (R) => ['mika', 'luc', 'yara'].some((w) => hat(R, 'schubs.' + w)) && seit(R, 'schubs.tag') >= 1,
    text: ['Mikas Crew wartet abends am Steg. Auf dich.', 'Du nimmst den langen Weg. Jeden Abend.'],
    e: () => ({ druck: 15, flag: 'crew.feind' }) },
  // Lieferwagen: Blechschaden ist Fränz’ Monat. Ohne Zeuge fragt er dich – als Einzigen, dem er traut.
  { id: 'auto.wasser', wenn: (R) => hat(R, 'auto.wasser') && seit(R, 'auto.tag') >= 1 && !hat(R, 'gestanden.auto'),
    text: ['Fränz’ Lieferwagen liegt im Hafenbecken.', 'Ein Kran muss kommen. Der Kiosk bleibt zu.'],
    e: (R) => (wert(R, 'auto.zeuge', '')
      ? { bond: { fraenz: -3 }, ruf: { gross: -2, hafen: -1 }, akte: 'auto', flag: 'job.weg', chat: { von: 'fraenz', text: 'Mein Wagen liegt im Wasser. Und du warst am Steuer.' } }
      : { bond: { fraenz: -1 }, ruf: { hafen: -1 }, chat: { von: 'fraenz', text: 'Der Wagen ist weg. Dreißig Jahre Arbeit. Hast du was gesehen?' } }) },
  { id: 'auto.beule', wenn: (R) => hat(R, 'auto.beule') && seit(R, 'auto.tag') >= 1 && !hat(R, 'gestanden.auto'),
    text: ['Fränz steht vor seinem Lieferwagen. Lange.', 'Die Werkstatt will 400 Euro. Das ist sein Monat.'],
    e: (R) => (wert(R, 'auto.zeuge', '')
      ? { bond: { fraenz: -3 }, ruf: { gross: -2 }, akte: 'auto', flag: 'job.weg', chat: { von: 'fraenz', text: 'Du bist meinen Wagen gefahren. Komm her. Sofort.' } }
      : { bond: { fraenz: -1 }, chat: { von: 'fraenz', text: 'Jemand hat meinen Wagen kaputt gefahren. Hast du was gesehen? Dir trau ich.' } }) },
  { id: 'auto.lieferung', wenn: (R) => hat(R, 'auto.genommen') && (hat(R, 'auto.stehen') || hat(R, 'auto.beule')) && seit(R, 'auto.tag') >= 1,
    text: ['Heute kam keine Lieferung zum Kiosk.', 'Maëlles Mutter wartet seit sechs Uhr auf Brot.'],
    e: () => ({ ruf: { hafen: -1 }, chat: { von: 'gruppe', text: 'Kiosk zu. Fränz sucht seinen Wagen. Wer war das??' } }) },
  { id: 'auto.schreck', wenn: (R) => !!wert(R, 'auto.schreck', '') && seit(R, 'auto.tag') >= 1,
    text: ['Gestern wäre fast jemand überfahren worden.', 'Alle reden davon. Einer kennt dein Gesicht.'],
    e: (R) => ({ bond: { [wert(R, 'auto.schreck', '')]: -1 }, ruf: { hafen: -1 }, chat: { von: wert(R, 'auto.schreck', ''), text: 'Ich hab dich gesehen. Hinter der Scheibe. Du hast gelacht.' } }) },
  { id: 'auto.still', wenn: (R) => hat(R, 'auto.genommen') && !hat(R, 'auto.beule') && !hat(R, 'auto.stehen') && !wert(R, 'auto.zeuge', '') && seit(R, 'auto.tag') >= 1,
    text: ['Fränz wundert sich über den leeren Tank.', 'Er schließt den Wagen jetzt ab. Zum ersten Mal.'],
    e: () => ({}) },
  // Markt: Oma Lucinda legt das Geld aus ihrer Rente dazu. Später fällt der Verdacht auf Noor, die Neue.
  { id: 'markt.lucinda', wenn: (R) => hat(R, 'markt.geklaut') && seit(R, 'markt.tag') >= 1 && !hat(R, 'gestanden.markt'),
    text: ['Oma Lucinda zählt abends ihre Kasse.', 'Sie legt 25 Euro aus ihrer Rente dazu.'],
    e: (R) => ({ chat: { von: 'noor', text: 'Oma sagt, sie hat sich verrechnet. Sie verrechnet sich nie.' },
      ...(wert(R, 'markt.zeuge', '') ? { bond: { noor: -2, [wert(R, 'markt.zeuge', '')]: -1 }, ruf: { hafen: -1 } } : {}) }) },
  { id: 'markt.noor', wenn: (R) => folgeWar(R, 'markt.lucinda') && seit(R, 'markt.tag') >= 3 && !hat(R, 'gestanden.markt'),
    text: ['Am Markt heißt es: Seit die Neue da ist, fehlt Ware.', 'Noor darf nicht mehr hinter den Stand.'],
    e: () => ({ flag: 'markt.noorverdacht', bond: { noor: -1 }, chat: { von: 'noor', text: 'Die denken, ich klaue. Ich hab hier noch nie was genommen.' } }) },
  // Lästern: Nach zwei Tagen weiß es die Person – wörtlich. Und wer zugehört hat, traut dir weniger.
  ...Object.values(LAESTER_ZIEL).filter((z, i, a) => a.indexOf(z) === i).map((z) => ({ id: 'laester.' + z, wenn: (R) => !!wert(R, 'laester.' + z, '') && seit(R, 'laester.tag.' + z) >= 2,
    text: [NAME[z] + ' weiß, was du erzählt hast. Wörtlich.', 'Wer bei dir lacht, fragt sich jetzt: Und über mich?'],
    e: (R) => ({ bond: { [z]: -2, [wert(R, 'laester.' + z, '')]: -1 }, chat: { von: z, text: 'Ich dachte, wir sind okay. Dann hör ich das.' } }) })),
];
// Ereignisse, die man an ihrem Tag links liegen lässt, laufen ohne einen weiter
export const VERPASST = {
  video: { text: 'Pits Video ging in die Gruppe. Du warst nicht da.', e: { flag: 'video.online', bond: { pit: -1 } } },
  neue: { text: 'Alle haben über Noor gelacht. Keiner hat etwas gesagt.', e: { flag: 'neue.allein', bond: { noor: -1 } } },
  gespraech: { text: 'Ilda und Fränz haben gewartet. Du bist nicht gekommen.', e: { akte: 'gespraech.fehlt', ruf: { gross: -1 }, bond: { ilda: -1 }, flag: 'gespraech.raus' } },
  praktikum: { text: 'Die Werft hat um sieben angefangen. Ohne dich.', e: { akte: 'prakt.fehlt', flag: 'prakt.abbruch', bond: { fraenz: -2 }, ruf: { gross: -1 } } },
  lagerfeuer: { text: 'Pit ist am Strand über das Feuer gesprungen. Fuß verstaucht.', e: { flag: 'lager.pitallein', bond: { pit: -1 } } },
  fest: { text: 'Beim Fest lag Tun allein hinter dem Felsen. Bis morgens.', e: { flag: 'fest.allein', bond: { tun: -1 } } },
  luege: { text: 'Ilda hat Tun allein gefragt. Er hat deinen Namen gesagt.', e: { flag: 'luege.raus', bond: { ilda: -1 } } },
};
