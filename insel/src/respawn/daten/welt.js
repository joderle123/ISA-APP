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
const NAME = { ilda: 'Ilda', fraenz: 'Fränz', jolie: 'Jolie', tun: 'Tun', pit: 'Pit', mika: 'Mika', yara: 'Yara', luc: 'Luc', noor: 'Noor', tiago: 'Tiago', maelle: 'Maëlle' };
export const GROSSE = ['ilda', 'fraenz', 'lucinda'];
export const WICHTIG = Object.keys(NAME);
const zeuge = (z, ausser) => (z || []).find((w) => w !== ausser && WICHTIG.includes(w)) || null;

// ---------- Orte ----------
export const ORTE = [
  { id: 'zuhause', name: 'Zuhause', ort: 'bootshaus', bild: '🏠', aktionen: ['schlafen', 'zocken'] },
  { id: 'kiosk', name: 'Kiosk', ort: 'snackStand', bild: '🍟', aktionen: ['job', 'kasse'] },
  { id: 'brunnen', name: 'Brunnen', ort: 'dorfplatz', bild: '🛹', aktionen: ['tricks'] },
  { id: 'werft', name: 'Werft', ort: 'werft', bild: '🔨', aktionen: ['sprayen', 'boot'] },
  { id: 'steg', name: 'Steg', ort: 'steg', bild: '🌊', aktionen: ['wasser'] },
  { id: 'krater', name: 'Krater', ort: 'kraterRand', bild: '🔥', aktionen: ['abhaengen'] },
];

export const ORT_AKTIONEN = {
  schlafen: { t: 'Schlafen gehen', art: 'ruhig', kraft: 0, schlaf: true, szene: () => [['t', 'Du machst das Licht aus.']] },
  zocken: { t: 'Zocken bis nachts', art: 'weg', kraft: 1, szene: () => [['t', 'Noch eine Runde. Und noch eine. Halb drei.'], ['e', { druck: -25, spaet: 1 }]] },
  wasser: { t: 'Ans Wasser setzen', art: 'ruhig', kraft: 1, szene: () => [['t', 'Wellen. Sonst nichts. Dein Kopf wird leiser.'], ['e', { druck: -20 }]] },
  tricks: { t: 'Tricks üben', art: 'ruhig', kraft: 1, szene: (R) => (hat(R, 'pit.weg') ? [['t', 'Der Brunnen ist leer. Pit kommt nicht mehr.'], ['e', { druck: -5 }]] : [['t', 'Du fällst zehnmal. Pit lacht nicht einmal.'], ['e', { druck: -15, bond: { pit: 1 } }]]) },
  abhaengen: { t: 'Mit der Crew abhängen', art: 'weg', kraft: 1, szene: () => [['t', 'Musik aus einer Box. Mikas Crew macht dir Platz.'], ['e', { druck: -15, ruf: { krater: 1 }, bond: { yara: 1 }, spaet: 1 }]] },
  job: { t: 'Jobben', art: 'ruhig', kraft: 1, szene: (R) => (hat(R, 'job.weg') ? [['s', 'fraenz', 'Für dich hab ich keine Arbeit mehr.']] : [['t', 'Vier Stunden Pommes. Fränz zahlt bar.'], ['e', { geld: R.karten.zuhause === 'allein' ? 25 : 20, druck: 5, bond: { fraenz: 1 }, flag: 'job' }]]) },
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
};

// ---------- Leute ----------
const SMALLTALK = {
  ilda: ['Der Wind dreht. Morgen wird es rau.', 'Setz dich. Der Tee ist noch warm.'], fraenz: ['Holz lügt nicht. Menschen schon.', 'Gute Hände hast du. Sag ich nicht oft.'],
  jolie: ['Ich zeichne gerade die Fähre. Guck.', 'Manchmal ist es hier zu still. Heute nicht.'], tun: ['Ich hab neue Clips. Willst du sehen?', 'Mein Vater sagt, ich rede zu viel.'],
  pit: ['Der Trick klappt fast. Fast.', 'Du bist okay. Sag ich einfach so.'], mika: ['Hier oben redet man nicht viel.', 'Du schaust zu viel. Das mag ich.'],
  yara: ['Mika ist nicht so hart, wie er tut.', 'Ich will hier weg. Irgendwann.'], luc: ['Was guckst du?', 'Der Wind ist heute gut. Mehr sag ich nicht.'],
  noor: ['Hier kennt jeder jeden. Komisch.', 'Auf der letzten Insel war ich drei Monate.'], tiago: ['Die Wellen sind heute perfekt.', 'Papa fährt morgen raus. Ich darf mit.'],
  maelle: ['Ich übe für das Fest. Nicht lachen.', 'Hörst du das? Das ist mein Lied.'],
};
const SPOTT = {
  jolie: 'Malst du wieder deine Babybilder?', tun: 'Keiner lacht über deine Witze, Tun.', pit: 'Fall doch noch mal. War lustig.', noor: 'Na, Pinguin? Wieder verlaufen?',
  mika: 'Großer Mika. Ohne Crew bist du nichts.', yara: 'Läufst du Mika immer hinterher?', luc: 'Sag mal was Schlaues, Luc. Einmal.', tiago: 'Dein Boot ist ein Witz.', maelle: 'Sing leiser. Tut weh in den Ohren.',
  ilda: 'Sie haben mir gar nichts zu sagen.', fraenz: 'Ihr Kiosk ist der letzte Laden.',
};
const HILFE = {
  pit: ['Pits Brett ist gebrochen. Ihr leimt es zusammen.', 'Hält. Danke. Echt.'], jolie: ['Jolies Mappe ist ins Wasser gefallen. Du trocknest Blätter.', 'Die meisten sind gerettet. Wegen dir.'],
  fraenz: ['Zwanzig Kisten müssen ins Lager. Du schleppst.', 'Stark. Das vergess ich nicht.'], ilda: ['Ein Netz ist gerissen. Ihr flickt zwei Stunden.', 'Gute Knoten. Wer hat dir das gezeigt?'],
  noor: ['Noor findet den Weg zum Markt nicht. Du gehst mit.', 'Jetzt kenn ich wenigstens einen Weg.'], tun: ['Tuns Kamera spinnt. Ihr sucht den Fehler.', 'Läuft wieder! Du bist ein Genie.'],
};

export const LEUTE_AKTIONEN = {
  reden: { t: 'Reden', art: 'ruhig', kraft: 0,
    szene: (R, { wer }) => {
      if (hat(R, 'meidet.' + wer)) return [['s', wer, GROSSE.includes(wer) ? 'Nicht jetzt.' : 'Lass mich.']];
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
export const LEUTE_REIHE = ['reden', 'helfen', 'entschuldigen', 'zurueck', 'leihen', 'filmen', 'aufziehen', 'schubsen'];

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
];
// Ereignisse, die man an ihrem Tag links liegen lässt, laufen ohne einen weiter
export const VERPASST = {
  video: { text: 'Pits Video ging in die Gruppe. Du warst nicht da.', e: { flag: 'video.online', bond: { pit: -1 } } },
  neue: { text: 'Alle haben über Noor gelacht. Keiner hat etwas gesagt.', e: { flag: 'neue.allein', bond: { noor: -1 } } },
  gespraech: { text: 'Ilda und Fränz haben gewartet. Du bist nicht gekommen.', e: { akte: 'gespraech.fehlt', ruf: { gross: -1 }, bond: { ilda: -1 }, flag: 'gespraech.raus' } },
  praktikum: { text: 'Die Werft hat um sieben angefangen. Ohne dich.', e: { akte: 'prakt.fehlt', flag: 'prakt.abbruch', bond: { fraenz: -2 }, ruf: { gross: -1 } } },
  fest: { text: 'Beim Fest lag Tun allein hinter dem Felsen. Bis morgens.', e: { flag: 'fest.allein', bond: { tun: -1 } } },
  luege: { text: 'Ilda hat Tun allein gefragt. Er hat deinen Namen gesagt.', e: { flag: 'luege.raus', bond: { ilda: -1 } } },
};
