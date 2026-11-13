// RESPAWN – weitere Situationen (13.11.2026): Themen, die im ersten Jahr fehlten – nicht eingeladen sein, jemanden trösten,
// etwas wiedergutmachen, Nähe und ein ehrliches Nein, Abschied. Schreibregeln und Schritt-Format: siehe situationen-1.js.
import { hat, bond } from '../run.js';
import { LEUCHTTURM } from './welt.js';

// Alle sind eingeladen. Du stehst nicht in der Gruppe. Niemand hat es böse gemeint – es tut trotzdem weh.
const einladung = {
  id: 'einladung', titel: 'Nicht eingeladen', zeit: ['herbst', 'winter'], ort: 'dorfplatz', uhr: 17.0, cast: ['jolie', 'maelle'], thema: 'ausgrenzung',
  szene: () => [
    ['t', 'Jolie hält dir ihr Handy hin. Eine Einladung.'],
    ['s', 'jolie', 'Samstag bei Maëlle. Du kommst doch auch?'],
    ['t', 'Elf Namen in der Gruppe. Deiner ist nicht dabei.'],
    ['k', 'trau', 'Klar. Warum sollte dich hier jemand einladen.'],
    ['k', 'voll', 'Du hast die Namen zweimal gezählt.'],
    ['w', [
      { t: 'Hab eh keine Zeit.', art: 'weg', e: { druck: 8, flag: 'einladung.egal' }, dann: [
        ['s', 'jolie', 'Okay. Schade.'],
        ['d', 'Samstag hast du nichts vor. Gar nichts.'],
      ] },
      { t: 'Ich steh nicht drin.', art: 'ruhig', e: { bond: { jolie: 1 }, flag: 'einladung.gesagt' }, dann: [
        ['s', 'jolie', 'Oh. Das wusste ich nicht.', { mimik: 'trauer' }],
        ['s', 'maelle', 'Ich dachte, du magst keine Feiern.'],
        ['w', [
          { t: 'Frag mich nächstes Mal.', art: 'ruhig', e: { bond: { maelle: 2 }, druck: -5, flag: 'einladung.dabei' }, dann: [['s', 'maelle', 'Mach ich. Samstag, sechs Uhr. Komm.']] },
          { t: 'Ist ja deine Feier.', art: 'weg', e: { bond: { maelle: -1 } }, dann: [['d', 'Sie hat nicht mal Nein gesagt.']] },
        ], { ruhe: true }],
      ] },
      { t: 'Maëlle hält sich für was Besseres.', art: 'hart', e: { druck: 5, bond: { maelle: -2, jolie: -1 }, flag: 'einladung.laestern' }, dann: [
        ['s', 'jolie', 'Das sag ich ihr nicht. Gehört hab ich es.'],
      ] },
      { t: 'Wer hat die Liste gemacht?', art: 'ruhig', nur: 'trau', e: { bond: { jolie: 1 }, druck: -5, flag: 'einladung.gesagt' }, dann: [
        ['s', 'jolie', 'Tun. Er hat dich vergessen. Echt nur vergessen.'],
      ] },
    ]],
  ],
  andere: { wer: 'maelle', zeilen: ['Ich lade nur ein, wer sicher Ja sagt.', 'Ein Nein vor allen halte ich nicht aus.', 'Also frage ich manche gar nicht erst.'] },
};

// Yara, die Laute vom Krater, sitzt allein am Leuchtturm und weint. Es gibt nichts zu lösen – nur dazubleiben oder nicht.
const trost = {
  id: 'trost', titel: 'Yara am Leuchtturm', zeit: ['winter', 'fruehling', 'sommer'], ort: { x: LEUCHTTURM.x, z: LEUCHTTURM.z }, richtung: -Math.PI / 2, uhr: 20.4, cast: ['yara'], thema: 'trost',
  szene: () => [
    ['t', 'Yara sitzt allein am Leuchtturm. Ihre Schultern zucken.'],
    ['m', 'yara', { mimik: 'trauer' }],
    ['d', 'Sie hat dich noch nicht gesehen.'],
    ['w', [
      { t: 'Leise wieder gehen.', art: 'weg', e: { flag: 'trost.weg' }, dann: [['d', 'Du gehst. Das Bild geht mit.']] },
      { t: 'Daneben setzen. Nichts sagen.', art: 'ruhig', e: { bond: { yara: 2 }, flag: 'trost.da' }, dann: [
        ['t', 'Ihr schaut aufs Wasser. Lange.'],
        ['s', 'yara', 'Mein Hund ist gestern gestorben. Sag es keinem.'],
        ['w', [
          { t: 'Wie hieß er?', art: 'ruhig', e: { bond: { yara: 1 }, druck: -5, flag: 'trost.geheim' }, dann: [
            ['s', 'yara', 'Bruno. Er hat immer meine Socken geklaut.'],
            ['t', 'Sie lacht kurz. Dann weint sie wieder.'],
          ] },
          { t: 'Ich sag nichts. Versprochen.', art: 'ruhig', e: { bond: { yara: 1 }, flag: 'trost.geheim' }, dann: [['s', 'yara', 'Danke. Mika würde nur lachen.']] },
          { t: 'War doch nur ein Hund.', art: 'hart', e: { bond: { yara: -3 }, flag: 'trost.kalt' }, dann: [['m', 'yara', { mimik: 'wut' }], ['s', 'yara', 'Geh einfach.']] },
        ], { ruhe: true }],
      ] },
      { t: 'Alles okay bei dir?', art: 'ruhig', e: { bond: { yara: 1 }, flag: 'trost.da' }, dann: [
        ['s', 'yara', 'Nein. Aber bleib ruhig.'],
        ['t', 'Du bleibst. Mehr braucht es gerade nicht.'],
      ] },
      { t: 'Foto machen. Für Mika.', art: 'hart', e: { ruf: { krater: 1 }, bond: { yara: -3 }, flag: 'trost.foto' }, dann: [
        ['s', 'yara', 'Lösch das. Sofort.', { mimik: 'wut' }],
        ['d', 'Du löschst es nicht.'],
      ] },
    ]],
  ],
  andere: { wer: 'yara', zeilen: ['Am Krater bin ich die Laute.', 'Wenn ich weine, ist von denen keiner da.', 'Bruno war immer da.'] },
};

// Nur wer etwas kaputt gemacht hat: Ilda fragt nicht, wer es war. Sie sagt, wann repariert wird.
const MIST = ['spray', 'kasse.geklaut', 'boot.genommen', 'auto.genommen', 'markt.geklaut', 'feuer'];
const gutmachen = {
  id: 'gutmachen', titel: 'Die zweite Chance', zeit: ['winter', 'fruehling', 'sommer'], ort: 'kapitaenin', uhr: 10.2, cast: ['ilda', 'fraenz'], thema: 'wiedergutmachung',
  wenn: (R) => MIST.some((f) => hat(R, f)),
  gewicht: () => 3,
  szene: () => [
    ['t', 'Ilda steht am Hafenbüro. Fränz hält zwei Pinsel.'],
    ['s', 'ilda', 'Auf der Insel ist einiges kaputtgegangen. Du weißt, was.'],
    ['s', 'fraenz', 'Samstag wird repariert. Wer kommt, kommt.'],
    ['k', 'trau', 'Das ist eine Falle. Oder?'],
    ['w', [
      { t: 'Ich komme.', art: 'ruhig', e: { flag: 'gutmachen.ja', bond: { fraenz: 1 } }, dann: [
        ['t', 'Samstag. Streichen, schleifen, schleppen. Sechs Stunden.'],
        ['spiel', { titel: 'Sauber streichen', bild: '🖌️' }, (g) => (g.treffer >= 2
          ? [['s', 'fraenz', 'Ordentlich. Hätte ich nicht gedacht.'], ['e', { druck: -15, bond: { fraenz: 1, ilda: 1 }, ruf: { gross: 2 }, akte: 'gutmachen' }]]
          : [['s', 'fraenz', 'Krumm und schief. Aber du warst da.'], ['e', { druck: -8, bond: { ilda: 1 }, ruf: { gross: 1 }, akte: 'gutmachen' }]])],
      ] },
      { t: 'Ich war es. Ich komme.', art: 'mut', e: { flag: 'gutmachen.ja', bond: { ilda: 2, fraenz: 1 }, druck: -10, ruf: { gross: 2 }, akte: 'gutmachen' }, dann: [
        ['s', 'ilda', 'Ich hatte nicht gefragt. Gut, dass du es sagst.'],
        ['t', 'Samstag streichst du das Tor. Zweimal.'],
      ] },
      { t: 'Ich war das nicht.', art: 'hart', e: { druck: 8, bond: { ilda: -1 }, flag: 'gutmachen.geleugnet' }, dann: [
        ['s', 'ilda', 'Ich habe nicht gefragt, wer es war.'],
        ['d', 'Sie schaut dich an. Zu lange.'],
      ] },
      { t: 'Mal sehen.', art: 'weg', e: { flag: 'gutmachen.offen' }, dann: [['s', 'fraenz', 'Samstag, acht Uhr. Mal sehen gibt es nicht.']] },
    ]],
  ],
  andere: { wer: 'ilda', zeilen: ['Strafe ändert selten etwas.', 'Wer selbst repariert, schaut das Tor anders an.', 'Ich frage nie, wer es war.'] },
};

// Jemand, der dich mag, fragt dich. Ja geht, ein ehrliches Nein geht auch. Auslachen bleibt hängen.
const FRAGT = ['jolie', 'pit', 'maelle', 'tiago', 'noor'];
const werFragt = (R) => FRAGT.slice().sort((a, b) => bond(R, b) - bond(R, a))[0];
const frage = {
  id: 'frage', titel: 'Kommst du mit mir?', zeit: ['fruehling', 'sommer'], ort: 'dorfplatz', uhr: 18.3, cast: (R) => [werFragt(R)], thema: 'naehe',
  wenn: (R) => bond(R, werFragt(R)) >= 1,
  szene: (R) => {
    const w = werFragt(R);
    return [
      ['t', 'Am Brunnen wartet jemand auf dich. Schon eine Weile.'],
      ['s', w, 'Samstag ist Kino am Steg. Gehst du mit mir hin?'],
      ['m', w, { mimik: 'angst' }],
      ['d', 'Mit dir. Nicht mit allen. Mit dir.'],
      ['k', 'nein', 'Ein Nein tut weh. Ein Ja macht auch Angst.'],
      ['w', [
        { t: 'Ja. Gern.', art: 'ruhig', e: { bond: { [w]: 2 }, druck: -5, flags: { 'frage.ja': true, 'frage.wer': w } }, dann: [['s', w, 'Echt? Okay. Cool. Okay.', { mimik: 'freude' }]] },
        { t: 'Lieber als Freunde.', art: 'nein', e: { bond: { [w]: 1 }, flags: { 'frage.freunde': true, 'frage.wer': w } }, dann: [
          ['s', w, 'Okay. Das ist ehrlich. Danke.'],
          ['d', 'Leicht war das nicht. Für keinen von euch.'],
        ] },
        { t: 'Lachen.', art: 'hart', e: { bond: { [w]: -3 }, flags: { 'frage.gelacht': true, 'frage.wer': w } }, dann: [
          ['m', w, { mimik: 'trauer' }], ['weg', w],
          ['d', 'Das Lachen kam schneller als dein Kopf.'],
        ] },
        { t: 'Äh. Ich muss los.', art: 'weg', e: { bond: { [w]: -1 }, druck: 5, flags: { 'frage.weg': true, 'frage.wer': w } }, dann: [['d', 'Du gehst schnell. Die Frage bleibt stehen.']] },
      ]],
    ];
  },
  andere: { wer: werFragt, zeilen: ['Drei Tage habe ich den Satz geübt.', 'Ein ehrliches Nein kann ich tragen.', 'Ausgelacht werden nicht.'] },
};

// Letzter Tag: Noor zieht wieder weg. Vierte Insel. Diesmal steht jemand am Steg – oder nicht.
const abschied = {
  id: 'abschied', titel: 'Noor geht', zeit: ['sommer'], platz: 'ende', ort: 'steg', uhr: 7.4, cast: ['noor', 'lucinda'], thema: 'abschied',
  wenn: (R) => bond(R, 'noor') >= 1 || hat(R, 'neue.geschuetzt'),
  gewicht: () => 2,
  szene: () => [
    ['t', 'Früh am Steg. Noor hat zwei Taschen dabei.'],
    ['s', 'noor', 'Papa hat Arbeit auf dem Festland. Wir fahren heute.'],
    ['d', 'Vierte Insel. Sie zählt nicht mehr laut.'],
    ['w', [
      { t: 'Schreib mir. Wirklich.', art: 'ruhig', e: { bond: { noor: 2 }, flag: 'abschied.kontakt' }, dann: [['s', 'noor', 'Mach ich. Du schreibst aber zuerst.']] },
      { t: 'Tragen helfen.', art: 'ruhig', e: { bond: { noor: 1, lucinda: 1 }, flag: 'abschied.geholfen' }, dann: [
        ['t', 'Ihr tragt die Taschen zur Fähre. Keiner redet.'],
        ['s', 'noor', 'Danke. Fürs Tragen. Und so.'],
      ] },
      { t: 'Pommes für die Überfahrt.', art: 'ruhig', kostet: 5, e: { geld: -5, bond: { noor: 2 }, flag: 'abschied.kontakt' }, dann: [
        ['t', 'Du drückst ihr die Tüte in die Hand.'],
        ['s', 'noor', 'Jetzt heule ich doch.', { mimik: 'trauer' }],
      ] },
      { t: 'Tschüss dann.', art: 'weg', e: { flag: 'abschied.kurz' }, dann: [['d', 'Kurz ist leichter. Für dich.']] },
    ]],
  ],
  andere: { wer: 'noor', zeilen: ['Ich packe schnell. Ich habe Übung.', 'Diesmal stand jemand am Steg.', 'Das nehme ich mit.'] },
};

export const SITUATIONEN_3 = [einladung, trost, gutmachen, frage, abschied];
