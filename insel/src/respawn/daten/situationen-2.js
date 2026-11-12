// RESPAWN – Situationen Frühling und Sommer (Schreibregeln und Schritt-Format: siehe situationen-1.js).
import { hat, bond, verschlaeft, besteBindung } from '../run.js';

const praktikum = {
  id: 'praktikum', titel: 'Drei Tage Werft', fest: 'fruehling', platz: 'anfang', ort: 'werft', uhr: 7.2, cast: ['fraenz', 'geselle'], thema: 'arbeit',
  szene: (R) => [
    ...(verschlaeft(R) ? [
      ['t', 'Du wachst auf. Es ist halb neun.'],
      ['d', 'Die Nächte waren zu lang.'],
      ['s', 'fraenz', 'Halb neun. Wir fangen um sieben an.'],
      ['w', [
        { t: 'Tut mir leid. Kommt nicht mehr vor.', art: 'ruhig', e: { flag: 'prakt.spaet' }, dann: [['s', 'fraenz', 'Zeig es mir morgen.']] },
        { t: 'Mein Wecker war kaputt.', art: 'weg', e: { druck: 5, flag: 'prakt.ausrede' }, dann: [['s', 'fraenz', 'Die Ausreden kenne ich alle.']] },
        { t: 'Dann eben nicht.', art: 'hart', e: { druck: 10, flag: 'prakt.abbruch', akte: 'prakt.abbruch' }, dann: [['t', 'Du drehst um. Das Tor fällt zu.']] },
      ]],
    ] : [
      ['t', 'Erster Tag in der Werft. Sieben Uhr.'],
    ]),
    ['wenn', (r) => !hat(r, 'prakt.abbruch'), [
      ['s', 'fraenz', 'Heute schleifst du. Nur schleifen.'],
      ['t', 'Drei Stunden Schleifen. Der Geselle grinst.'],
      ['s', 'geselle', 'Bei uns holen die Neuen den Kaffee.'],
      ['k', 'zuendschnur', 'Er will sehen, ob du platzt.'],
      ['w', [
        { t: 'Kaffee holen.', art: 'weg', e: { druck: 5, flag: 'prakt.kaffee' }, dann: [['s', 'geselle', 'Brav.']] },
        { t: 'Ich schleife. Hol ihn selbst.', art: 'nein', e: { flag: 'prakt.respekt' }, dann: [['s', 'geselle', 'Oha. Die Neuen haben Biss.', { mimik: 'freude' }]] },
        { t: 'Hol ihn dir, du Depp.', art: 'hart', e: { druck: 10, flag: 'prakt.streit' }, dann: [['s', 'fraenz', 'Nicht in meiner Werft.', { mimik: 'wut' }]] },
        { t: 'Die Planke da ist gerissen.', art: 'ruhig', nur: 'voll', e: { bond: { fraenz: 2 }, flag: 'prakt.auge' }, dann: [
          ['s', 'fraenz', 'Stimmt. Das hat keiner gesehen.', { mimik: 'ueberraschung' }],
        ] },
      ], { reiz: true }],
      ['t', 'Dritter Tag. Fränz schaut dein Stück an.'],
      ['wenn', (r) => hat(r, 'prakt.streit'), [
        ['s', 'fraenz', 'Hände gut. Mund nicht.'],
        ['e', { flag: 'prakt.mittel' }],
      ], [
        ['s', 'fraenz', 'Sauber geschliffen. Du kannst wiederkommen.', { mimik: 'freude' }],
        ['e', { flag: 'prakt.gut', akte: 'prakt.gut', ruf: { gross: 1 }, bond: { fraenz: 1 }, geld: 20 }],
      ]],
    ]],
  ],
  andere: { wer: 'geselle', zeilen: ['Mich haben sie auch Kaffee holen lassen.', 'Ich wollte sehen, was passiert.', 'Ich hab damals den Kaffee geholt. Zwei Jahre lang.'] },
};

const mitfahren = {
  id: 'mitfahren', titel: 'Mitfahren', zeit: ['fruehling', 'sommer'], ort: 'vulkanFuss', uhr: 22.6, cast: ['mika', 'yara'], thema: 'gruppe',
  gewicht: (R) => (R.ruf.krater > 0 ? 3 : 1),
  szene: () => [
    ['t', 'Nachts am Krater. Mika hat ein Boot besorgt.'],
    ['s', 'mika', 'Wir drehen eine Runde. Du kommst mit.'],
    ['w', [
      { t: 'Einsteigen.', art: 'weg', e: { druck: -15, ruf: { krater: 1 }, spaet: 1, flag: 'mitfahren.dabei' }, dann: [
        ['t', 'Das Boot ist schnell. Der Wind ist warm. Alle lachen.'],
        ['t', 'An der Werft stellt Mika den Motor ab.'],
        ['s', 'mika', 'Wir brauchen Sprit. Du passt auf.'],
        ['k', 'trau', 'Besorgt. Klar. Das Boot gehört denen nicht.'],
        ['w', [
          { t: 'Aufpassen.', art: 'weg', e: { druck: 10, ruf: { krater: 2 }, bond: { mika: 1 }, flag: 'mitfahren.schmiere' }, dann: [
            ['t', 'Ein Licht geht an. Fränz steht in der Tür.'],
            ['wenn', (R) => R.druck >= 60, [
              ['t', 'Alle rennen. Du stolperst über ein Seil.'],
              ['s', 'fraenz', 'Du. Ausgerechnet du.', { mimik: 'trauer' }],
              ['e', { flag: 'mitfahren.erwischt', akte: 'mitfahren.erwischt', bond: { fraenz: -2 }, ruf: { gross: -2 } }],
            ], [
              ['t', 'Alle rennen. Du auch. Keiner sieht dein Gesicht.'],
              ['e', { flag: 'mitfahren.entkommen', druck: 10 }],
            ]],
          ] },
          { t: 'Da mach ich nicht mit.', art: 'nein', e: { druck: 5, ruf: { krater: -2 }, flag: 'mitfahren.gegangen', chat: { von: 'yara', text: 'War richtig von dir. Sag es keinem.' } }, dann: [
            ['s', 'mika', 'Dann lauf heim.'],
            ['t', 'Fünf Kilometer. Zu Fuß. Nachts.'],
          ] },
          { t: 'Fränz anrufen.', art: 'hilfe', wer: 'fraenz', e: { ruf: { krater: -3 }, bond: { fraenz: 2 }, flag: 'mitfahren.gemeldet', akte: 'mitfahren.gemeldet', chat: { von: 'mika', text: 'Wir wissen, wer das war.' } }, dann: [
            ['t', 'Du tippst die Nummer. Mika sieht das Licht.'],
            ['s', 'mika', 'Das merk ich mir.'],
          ] },
          { t: 'Mika. Lass die Kanister stehen.', art: 'mut', nur: 'zuendschnur', e: { druck: 10, bond: { yara: 2 }, flag: 'mitfahren.gestoppt' }, dann: [
            ['s', 'mika', 'Oder was?'],
            ['d', 'Oder ich gehe. Und zwar laut.'],
            ['s', 'mika', 'Wir fahren. Für heute.'],
          ] },
        ]],
      ] },
      { t: 'Heute nicht.', art: 'nein', e: { ruf: { krater: -1 }, flag: 'mitfahren.nein' }, dann: [
        ['s', 'mika', 'Deine Wahl. Wir fragen nicht zweimal.'],
      ] },
    ]],
  ],
  andere: { wer: 'yara', zeilen: ['Ich wollte auch nicht.', 'Aber keiner sagt als Erster Nein.', 'Wenn einer geht, gehen zwei.'] },
};

const dieNeue = {
  id: 'neue', titel: 'Die Neue', zeit: ['fruehling', 'sommer'], ort: 'dorfplatz', uhr: 15.8, cast: ['tun', 'noor', 'jolie'], thema: 'gruppe',
  szene: () => [
    ['t', 'Noor ist neu. Seit einer Woche.'],
    ['s', 'tun', 'Guck, wie die läuft. Wie ein Pinguin.', { mimik: 'freude' }],
    ['t', 'Alle lachen. Noor hört es.'],
    ['m', 'noor', { mimik: 'trauer' }],
    ['d', 'Im Herbst warst du das.'],
    ['w', [
      { t: 'Mitlachen.', art: 'weg', e: { ruf: { hafen: 1 }, bond: { noor: -2 }, flag: 'neue.gelacht' }, dann: [['weg', 'noor'], ['d', 'Du gehörst dazu. Fühlt sich komisch an.']] },
      { t: 'Lasst sie.', art: 'nein', e: { ruf: { hafen: -1 }, bond: { noor: 2 }, flag: 'neue.geschuetzt' }, dann: [['s', 'tun', 'Seit wann bist du so?']] },
      { t: 'Zu Noor rübergehen.', art: 'ruhig', e: {}, dann: [
        ['s', 'noor', 'Ich brauch kein Mitleid.'],
        ['w', [
          { t: 'Ich war auch neu.', art: 'ruhig', e: { bond: { noor: 2, jolie: 1 }, flag: 'neue.geschuetzt' }, dann: [['s', 'noor', 'Okay. Wo gibt es hier Pommes?']] },
          { t: 'Dann nicht.', art: 'weg', e: {}, dann: [['d', 'Du hast es versucht. Kurz.']] },
        ], { ruhe: true }],
      ] },
      { t: 'Tun. Halt die Klappe.', art: 'mut', nur: 'zuendschnur', e: { druck: 10, bond: { tun: -1, noor: 2 }, ruf: { hafen: 1 }, flag: 'neue.geschuetzt' }, dann: [
        ['t', 'Stille. Keiner lacht mehr.'],
        ['s', 'noor', 'Danke. Glaub ich.'],
      ] },
    ]],
  ],
  andere: { wer: 'noor', zeilen: ['Dritte Insel in zwei Jahren.', 'Ich lerne zuerst, wer lacht.', 'Dann, wer nicht lacht.'] },
};

// Abend am Strand: Die Crew hat ein Feuer. Mika will sehen, wie Pit drüber springt. Alle filmen.
const lagerfeuer = {
  id: 'lagerfeuer', titel: 'Das Feuer am Strand', zeit: ['herbst', 'fruehling', 'sommer'], ort: 'strandHuette', uhr: 21.4, cast: ['mika', 'pit', 'yara', 'luc'], thema: 'gruppe',
  wenn: (R) => !hat(R, 'pit.weg'),
  szene: () => [
    ['t', 'Ein Feuer am Strand. Die Crew, Musik, Pit mittendrin.'],
    ['s', 'mika', 'Skater! Spring drüber. Oder traust du dich nicht?', { mimik: 'freude' }],
    ['t', 'Drei Handys gehen hoch. Pit schaut in die Flammen.'],
    ['m', 'pit', { mimik: 'angst' }],
    ['w', [
      { t: 'Ich spring zuerst.', art: 'hart', e: { ruf: { krater: 2 }, bond: { pit: 1 }, flag: 'lager.sprung' }, dann: [
        ['wenn', (R) => R.druck >= 60,
          [['t', 'Du springst zu kurz. Dein Hosenbein qualmt.'], ['e', { druck: 10 }], ['s', 'yara', 'Zeig mal. Das gibt eine Blase.']],
          [['t', 'Du fliegst drüber. Alle schreien. Du lebst.'], ['e', { druck: -10 }]]],
        ['s', 'mika', 'Okay. Du traust dich. Pit nicht.'],
      ] },
      { t: 'Lass ihn, Mika.', art: 'nein', e: { ruf: { krater: -1 }, bond: { pit: 2 }, flag: 'lager.pitgeschuetzt' }, dann: [
        ['s', 'mika', 'Bist du seine Mutter?'],
        ['s', 'yara', 'Lass gut sein, Mika. Er will nicht.'],
      ] },
      { t: 'Mitfilmen.', art: 'weg', e: { ruf: { krater: 1 }, bond: { pit: -2 }, flag: 'lager.gefilmt' }, dann: [
        ['t', 'Pit springt. Er knickt um. Alle johlen.'],
        ['s', 'pit', 'Hast du das etwa gefilmt?', { mimik: 'trauer' }],
      ] },
      { t: 'Pit, komm. Wir gehen.', art: 'ruhig', e: { ruf: { krater: -1 }, bond: { pit: 2 }, flag: 'lager.pitgeschuetzt' }, dann: [
        ['weg', 'pit'],
        ['s', 'yara', 'Geht ruhig. Ich wär auch gern weg.'],
      ] },
    ]],
  ],
  andere: { wer: 'pit', zeilen: ['Sag ich Nein, bin ich der Feigling.', 'Springe ich, bin ich der Clown.', 'Ich wollte nur am Feuer sitzen.'] },
};

const SPRUCH = { oma: 'Wohnst bei Oma, weil dich keiner will.', allein: 'Zuhause wartet eh keiner auf dich.', zwei: 'Zwei Zuhause. Und keins will dich.' };
const provokation = {
  id: 'provokation', titel: 'Am Steg', zeit: ['winter', 'fruehling', 'sommer'], ort: 'steg', uhr: 16.9, cast: ['luc', 'jolie'], thema: 'gewalt',
  szene: (R) => [
    ['t', 'Am Steg. Luc aus Mikas Crew steht dir im Weg.'],
    ['s', 'luc', 'Na, Aktenkind? Liest Ilda dir abends vor?'],
    ['s', 'luc', R.sanft ? 'Dich will hier doch keiner.' : SPRUCH[R.karten.zuhause]],
    ['e', { druck: 20 }, { reiz: true }],
    ['k', 'zuendschnur', 'Deine Faust ist schon zu.'],
    ['k', 'voll', 'Hinter Luc stehen zwei. Einer filmt.'],
    ['w', [
      { t: 'Zuschlagen.', art: 'hart', wenn: (r) => !r.sanft, e: { druck: -10, flag: 'schlag', akte: 'schlag', ruf: { krater: 1, gross: -2 }, bond: { ilda: -1, jolie: -1 }, chat: { von: 'gruppe', text: 'Hast du das Video vom Steg gesehen?' } }, dann: [
        ['t', 'Luc liegt. Drei Handys filmen.'],
        ['s', 'jolie', 'Komm. Weg hier. Sofort.'],
      ] },
      { t: 'Stehen bleiben. Ihn anschauen.', art: 'ruhig', e: { druck: 5, ruf: { hafen: 1 }, flag: 'prov.gehalten' }, dann: [
        ['s', 'luc', 'Was glotzt du?'],
        ['t', 'Du sagst nichts. Lange.'],
        ['s', 'luc', 'Langweilig.'],
        ['weg', 'luc'],
      ] },
      { t: 'Weggehen.', art: 'weg', e: { druck: 10, ruf: { krater: -1 }, flag: 'prov.weg' }, dann: [
        ['s', 'luc', 'Lauf nur!'],
        ['s', 'jolie', 'Der will nur, dass du zuhaust.'],
      ] },
      { t: 'Über seine Familie reden.', art: 'hart', e: { druck: 10, flag: 'prov.verbal' }, dann: [
        ['s', 'luc', 'Sag das noch mal!', { mimik: 'wut' }],
        ['t', 'Er schubst dich. Jolie zieht dich weg.'],
      ] },
      { t: 'Wer hat dir das erzählt?', art: 'ruhig', nur: 'trau', e: { flag: 'prov.quelle', bond: { jolie: 1 } }, dann: [
        ['s', 'luc', 'Mika. Der weiß alles über dich.', { mimik: 'ueberraschung' }],
        ['d', 'Mika kennt deine Akte. Woher?'],
      ] },
    ], { eil: true, reiz: true }],
  ],
  andere: { wer: 'luc', zeilen: ['Mika sagt: Teste die Neuen.', 'Ich sage Sachen, die ich selbst gehört hab.', 'Zu mir. Zuhause.'] },
};

const schulden = {
  id: 'schulden', titel: 'Unter Freunden', zeit: ['winter', 'fruehling'], ort: 'marktplatz', uhr: 13.3, cast: ['mika'], thema: 'geld',
  szene: () => [
    ['t', 'Dein Handy ist gefallen. Das Display ist gesprungen.'],
    ['t', 'Die Reparatur kostet 30 Euro.'],
    ['s', 'mika', 'Ich leih dir was. Unter Freunden.'],
    ['k', 'trau', 'Mika verschenkt nichts.'],
    ['w', [
      { t: 'Das Geld nehmen.', art: 'weg', e: { flag: 'schulden', bond: { mika: 1 } }, dann: [['s', 'mika', 'Kein Stress. Du gibst es mir irgendwann zurück.']] },
      { t: 'Was willst du dafür?', art: 'ruhig', e: {}, dann: [
        ['s', 'mika', 'Schlau. Einen Gefallen. Irgendwann.'],
        ['w', [
          { t: 'Okay. Abgemacht.', art: 'weg', e: { flag: 'schulden', bond: { mika: 1 } }, dann: [['s', 'mika', 'Gut. Ich melde mich.']] },
          { t: 'Dann lieber nicht.', art: 'nein', e: { druck: 5, flag: 'display.kaputt' }, dann: [['s', 'mika', 'Wie du willst.']] },
        ], { ruhe: true }],
      ] },
      { t: 'Nein danke.', art: 'nein', e: { druck: 5, flag: 'display.kaputt' }, dann: [['d', 'Der Sprung bleibt. Mitten durch jedes Foto.']] },
      { t: 'Selbst zahlen.', art: 'ruhig', kostet: 30, e: { geld: -30 }, dann: [['d', '30 Euro weg. Aber deine.']] },
    ], { ruhe: true }],
  ],
};

// Die Nachricht: jemand, den du magst – am Morgen kennt die Gruppe deinen Text
const nachricht = {
  id: 'nachricht', titel: 'Die Nachricht', zeit: ['fruehling', 'sommer'], ort: 'dorfplatz', uhr: 8.4, cast: ['tun', 'maelle', 'tiago'], thema: 'netz',
  szene: (R) => [
    ['t', 'Gestern Abend hast du jemandem geschrieben. Ehrlich.'],
    ['w', [
      { t: 'An Maëlle.', art: 'ruhig', e: { flags: { 'nachricht.an': 'maelle' } }, dann: [] },
      { t: 'An Tiago.', art: 'ruhig', e: { flags: { 'nachricht.an': 'tiago' } }, dann: [] },
    ], { ruhe: true, frage: 'Wem hast du geschrieben?' }],
    ['t', 'Am Morgen kennt die ganze Gruppe deinen Text.'],
    ['s', 'tun', 'Ich denk oft an dich. Wie süß!', { mimik: 'freude' }],
    ['e', { druck: 20, chat: { von: 'gruppe', text: 'Bild: deine Nachricht. 23 Leute haben es gesehen.' } }, { reiz: true }],
    ['w', [
      { t: 'Lachen. War nur ein Witz.', art: 'weg', e: { druck: 5, flag: 'nachricht.witz' }, dann: [['d', 'War es nicht.']] },
      { t: 'Wer hat das geschickt?!', art: 'hart', e: { druck: 10, flag: 'nachricht.laut' }, dann: [
        ['s', (r) => r.flags['nachricht.an'], 'Ich hab es nur Yara gezeigt. Ehrlich.', { mimik: 'angst' }],
        ['d', 'Nur einer. So fängt es immer an.'],
      ] },
      { t: 'Allein mit ihr reden.', art: 'ruhig', wenn: (r) => r.flags['nachricht.an'] === 'maelle', e: { druck: -15, bond: { maelle: 2 }, flag: 'nachricht.geredet' }, dann: [
        ['s', 'maelle', 'Ich wollte das nicht. Tut mir leid.'],
        ['s', 'maelle', 'Und ich fand es schön.'],
      ] },
      { t: 'Allein mit ihm reden.', art: 'ruhig', wenn: (r) => r.flags['nachricht.an'] === 'tiago', e: { druck: -15, bond: { tiago: 2 }, flag: 'nachricht.geredet' }, dann: [
        ['s', 'tiago', 'Ich wollte das nicht. Tut mir leid.'],
        ['s', 'tiago', 'Und ich fand es schön.'],
      ] },
      { t: 'Handy aus. Drei Tage.', art: 'weg', e: { druck: -5, flag: 'nachricht.abgetaucht' }, dann: [['d', 'Drei Tage Ruhe. Die Nachricht bleibt.']] },
    ], { reiz: true }],
  ],
  andere: { wer: (R) => R.flags['nachricht.an'] || 'maelle', zeilen: ['Ich hab mich so gefreut.', 'Ich wollte es einer Person zeigen.', 'Jetzt denkt die ganze Insel, ich lache darüber.'] },
};

const fest = {
  id: 'fest', titel: 'Das Fest am Krater', fest: 'sommer', platz: 'anfang', ort: 'kraterRand', uhr: 23.1, cast: ['yara', 'mika', 'tun'], thema: 'rausch',
  szene: (R) => [
    ['t', 'Sommerfest am Krater. Musik. Feuer.'],
    ...(R.sanft ? [] : [
      ['s', 'yara', 'Trink. Ist nur Bowle. Fast.'],
      ['w', [
        { t: 'Einen Becher. Mehr nicht.', art: 'weg', e: { druck: -10, flag: 'fest.eins' }, dann: [['d', 'Warm im Bauch. Reicht.']] },
        { t: 'Her damit. Noch einen.', art: 'weg', e: { druck: -20, spaet: 1, flag: 'fest.viel' }, dann: [['d', 'Der Boden ist weich. Alles ist lustig.']] },
        { t: 'Ich bleib bei Cola.', art: 'nein', e: { flag: 'fest.cola' }, dann: [
          ['s', 'yara', bond(R, 'yara') >= 2 ? 'Auch okay. Mehr für mich.' : 'Langweilig. Aber gut.'],
        ] },
      ], { ruhe: true }],
    ]),
    ['wenn', (r) => hat(r, 'schulden'), [
      ['s', 'mika', 'Dein Gefallen. Heute. Trag die Tasche zum Steg.'],
      ['w', [
        { t: 'Was ist da drin?', art: 'ruhig', e: {}, dann: [
          ['s', 'mika', 'Frag nicht.'],
          ['w', [
            { t: 'Tragen.', art: 'weg', e: { ruf: { krater: 2 }, flag: 'tasche', akte: 'tasche' }, dann: [['d', 'Die Tasche ist schwer. Sie klirrt.']] },
            { t: 'Dann trag ich sie nicht.', art: 'nein', e: { ruf: { krater: -2 }, bond: { mika: -2 }, flag: 'tasche.nein' }, dann: [['s', 'mika', 'Dann schuldest du mir immer noch.']] },
          ]],
        ] },
        { t: 'Tragen.', art: 'weg', e: { ruf: { krater: 2 }, flag: 'tasche', akte: 'tasche' }, dann: [['d', 'Die Tasche ist schwer. Sie klirrt.']] },
        { t: 'Hier. Dreißig Euro. Wir sind quitt.', art: 'nein', kostet: 30, e: { geld: -30, flag: 'tasche.bezahlt', bond: { mika: -1 } }, dann: [['s', 'mika', 'Geld. Wie langweilig.']] },
      ]],
    ]],
    ['t', 'Hinter dem Felsen sitzt Tun. Allein.'],
    ['s', 'tun', R.sanft ? 'Mir ist schwindlig. Vom Feuer. Glaub ich.' : 'Mir ist schlecht. Sag es keinem.', { mimik: 'angst', anim: 'sad' }],
    ['w', [
      { t: 'Bei ihm bleiben.', art: 'ruhig', wenn: (r) => !hat(r, 'fest.viel'), e: { bond: { tun: 2 }, flag: 'fest.geblieben' }, dann: [
        ['t', 'Du sitzt neben ihm. Eine Stunde.'],
        ['s', 'tun', 'Du verpasst das ganze Fest.'],
      ] },
      { t: 'Jolie holen.', art: 'hilfe', wer: 'jolie', e: { bond: { tun: 1, jolie: 1 }, flag: 'fest.hilfe' }, dann: [['s', 'jolie', 'Ich bleib bei ihm. Hol Wasser.']] },
      { t: 'Ilda anrufen.', art: 'hilfe', wer: 'ilda', e: { ruf: { krater: -2 }, bond: { ilda: 1, tun: 1 }, flag: 'fest.gemeldet', akte: 'fest.gemeldet', chat: { von: 'tun', text: 'Du hast mich verpfiffen. Und gerettet. Danke.' } }, dann: [
        ['t', 'Ilda kommt mit dem Boot. Das Fest ist aus.'],
        ['s', 'mika', 'Wer hat die gerufen?'],
      ] },
      { t: 'Weiterfeiern.', art: 'weg', e: { bond: { tun: -2 }, flag: 'fest.allein' }, dann: [['d', 'Er sitzt noch da, als du gehst.']] },
    ]],
  ],
  andere: { wer: 'tun', zeilen: ['Ich wollte nur so cool sein wie die anderen.', 'Dann lag ich hinter dem Felsen.', 'Ich weiß noch, wer gekommen ist.'] },
};

const SATZ = {
  jolie: 'Ich hab dich gezeichnet. Am ersten Tag.', tun: 'Ohne dich wär das Jahr langweilig gewesen.', pit: 'Du hast damals nicht gelacht.',
  noor: 'Du warst die erste Person, die nett war.', mika: 'Am Krater ist immer Platz für dich.', fraenz: 'In der Werft ist ein Platz frei.',
  ilda: 'Du hast mir das Gegenteil gezeigt.',
};
const finale = {
  id: 'finale', titel: 'Die Fähre', fest: 'sommer', platz: 'ende', ort: 'steg', uhr: 18.2,
  cast: (R) => { const b = besteBindung(R); return ['ilda'].concat(b && b !== 'ilda' ? [b] : []); },
  szene: (R) => {
    const b = besteBindung(R);
    return [
      ['t', 'Ein Jahr ist um. Am Steg wartet die Fähre.'],
      ...(b && b !== 'ilda' ? [['s', b, SATZ[b] || 'Schön, dass du da warst.']] : [['d', 'Keiner ist gekommen. Nur Ilda.']]),
      ['wenn', (r) => hat(r, 'kontrolle.ehrlich'), [['t', 'Der Kontrolleur nickt dir zu. Er kennt dich noch.']]],
      ['wenn', (r) => hat(r, 'kontrolle.laut'), [['t', 'Der Kontrolleur sieht dich. Er schaut weg.']]],
      ['s', 'ilda', 'Deine Akte. Sie ist dicker geworden.'],
      ['s', 'ilda', 'Willst du lesen, was drinsteht?'],
      ['w', [
        { t: 'Ja. Zeig her.', art: 'ruhig', e: { flag: 'finale.lesen' }, dann: [['s', 'ilda', 'Lies. Und sag mir, was fehlt.']] },
        { t: 'Nein. Ich weiß, was war.', art: 'weg', e: { flag: 'finale.nichtlesen' }, dann: [['s', 'ilda', 'Das ist auch eine Antwort.']] },
      ], { ruhe: true }],
    ];
  },
};

export const SITUATIONEN_2 = [praktikum, mitfahren, dieNeue, lagerfeuer, provokation, schulden, nachricht, fest, finale];
