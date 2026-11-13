// RESPAWN – Situationen Herbst und Winter.
// Schreibregeln (Test: tests/unit/respawn-inhalt.test.mjs): Blase ≤ 12 Wörter, Wahl ≤ 6 Wörter, einfache Wörter, ein Gedanke
// pro Blase. Keine Wahl ist „die richtige“: jede kostet etwas. Niemand erklärt eine Lehre.
// Schritte:  ['t', Text] Erzähler · ['s', wer, Text, {mimik, anim, emote}] Figur spricht · ['d', Text] eigener Gedanke
//            ['k', karte, Text] Gedanke nur mit dieser Startkarte · ['e', Wirkung, {reiz}] · ['m', wer, {mimik, anim, emote}]
//            ['weg', wer] Figur geht · ['wenn', (R) => bool, [dann], [sonst]] · ['w', [Wahlen], { frage, ruhe, eil }]
// Wahl:      { t, art: 'ruhig'|'nein'|'hilfe'|'hart'|'weg'|'mut', wer?, nur?, wenn?, kostet?, reiz?, e: Wirkung, dann: [Schritte] }
import { hat } from '../run.js';

const ankunft = {
  id: 'ankunft', titel: 'Neu hier', fest: 'herbst', platz: 'anfang', ort: 'steg', uhr: 17.4, cast: ['ilda', 'tun', 'jolie'],
  szene: () => [
    ['t', 'Die Fähre legt an. Hier wohnst du jetzt.'],
    ['s', 'ilda', 'Du bist also neu. Ich bin Ilda.'],
    ['s', 'ilda', 'Deine Akte war vor dir da.', { anim: 'think' }],
    ['w', [
      { t: 'Was steht drin?', art: 'ruhig', e: { bond: { ilda: 1 } }, dann: [
        ['s', 'ilda', 'Was andere über dich schreiben.'],
        ['s', 'ilda', 'Nicht, wer du bist.'],
      ] },
      { t: 'Die lügt.', art: 'hart', e: { druck: 5, flag: 'ankunft.hart' }, dann: [
        ['s', 'ilda', 'Kann sein. Zeig mir das Gegenteil.'],
      ] },
      { t: 'Nichts sagen.', art: 'weg', e: {}, dann: [
        ['s', 'ilda', 'Auch gut. Reden kommt später.'],
      ] },
      { t: 'Wer hat die gelesen?', art: 'ruhig', nur: 'trau', e: { bond: { ilda: 2 } }, dann: [
        ['s', 'ilda', 'Nur ich. Das bleibt so.'],
      ] },
    ], { ruhe: true }],
    ['t', 'Am Geländer stehen zwei in deinem Alter.'],
    ['s', 'tun', 'Hey, Neu! Lächeln!', { emote: 'winken' }],
    ['k', 'zuendschnur', 'Der filmt dich. Einfach so.'],
    ['k', 'voll', 'Das rote Lämpchen leuchtet. Die Kamera läuft schon.'],
    ['w', [
      { t: 'Grinsen und winken.', art: 'weg', e: { bond: { tun: 1 }, ruf: { hafen: 1 }, flag: 'ankunft.gefilmt' }, dann: [
        ['s', 'tun', 'Stark. Du bist dabei.', { mimik: 'freude' }],
      ] },
      { t: 'Kamera runter.', art: 'nein', e: { druck: 5, bond: { jolie: 1 } }, dann: [
        ['s', 'tun', 'Okay, okay. Entspann dich.'],
        ['s', 'jolie', 'Er meint es nicht böse.'],
      ] },
      { t: 'Hand vor die Linse.', art: 'hart', e: { druck: 10, bond: { tun: -1 }, ruf: { hafen: -1 }, akte: 'ankunft.kamera' }, dann: [
        ['s', 'tun', 'Ey! Die war teuer!', { mimik: 'wut' }],
      ] },
      { t: 'Läuft die schon?', art: 'ruhig', nur: 'voll', e: { bond: { tun: 1, jolie: 1 } }, dann: [
        ['s', 'tun', 'Erwischt.', { mimik: 'ueberraschung' }],
        ['s', 'jolie', 'Das merkt sonst keiner.'],
      ] },
    ], { reiz: true }],
    ['s', 'jolie', 'Ich bin Jolie. Der da ist Tun.'],
    ['s', 'jolie', 'Am Krater hängt Mikas Crew. Pass auf.'],
    ['d', 'Ein Jahr. Mal sehen.'],
    ['e', { chat: { von: 'tun', text: 'Du bist jetzt in der Gruppe Hafen.' } }],
  ],
};

const video = {
  id: 'video', titel: 'Das Video', zeit: ['herbst', 'winter'], ort: 'dorfplatz', uhr: 16.2, cast: ['tun', 'pit', 'jolie'], thema: 'netz',
  szene: () => [
    ['t', 'Pit übt am Brunnen einen Trick. Er fällt. Hart.'],
    ['m', 'pit', { mimik: 'trauer', anim: 'sad' }],
    ['s', 'tun', 'Hab ich drauf! Das geht in die Gruppe.', { mimik: 'freude' }],
    ['k', 'zuendschnur', 'Alle lachen. Pit nicht.'],
    ['k', 'trau', 'Tun lacht zu laut. Der hat selbst Angst.'],
    ['w', [
      { t: 'Lachen. Teilen.', art: 'weg', e: { flag: 'video.geteilt', ruf: { hafen: 1 }, bond: { tun: 1, pit: -2 }, chat: { von: 'gruppe', text: 'Tun: Pit fliegt. Schon 40 Aufrufe.' } }, dann: [
        ['weg', 'pit'],
        ['d', '40 Aufrufe in einer Stunde.'],
      ] },
      { t: 'Lösch das.', art: 'nein', e: {}, dann: [
        ['s', 'tun', 'Chill. Ist doch lustig.'],
        ['w', [
          { t: 'Jetzt. Löschen.', art: 'hart', e: { druck: 10, bond: { tun: -1, pit: 2 }, flag: 'video.geloescht' }, dann: [
            ['s', 'tun', 'Mann. Gelöscht. Zufrieden?'],
            ['s', 'pit', 'Danke. Echt.'],
          ] },
          { t: 'Vergiss es.', art: 'weg', e: { flag: 'video.online', bond: { pit: -1 }, chat: { von: 'gruppe', text: 'Tun: Pit fliegt. Schon 40 Aufrufe.' } }, dann: [
            ['weg', 'pit'],
            ['d', 'Du hast es gesagt. Einmal.'],
          ] },
        ]],
      ] },
      { t: 'Zu Pit gehen.', art: 'ruhig', e: { flag: 'video.online', chat: { von: 'gruppe', text: 'Tun: Pit fliegt. Schon 40 Aufrufe.' } }, dann: [
        ['s', 'pit', 'Lass mich.'],
        ['w', [
          { t: 'Bleiben.', art: 'ruhig', e: { bond: { pit: 2, jolie: 1 }, flag: 'pit.geholfen' }, dann: [
            ['s', 'pit', 'Tut weh. Der Arm auch.'],
            ['s', 'jolie', 'Du hast nicht gelacht. Hab ich gesehen.'],
          ] },
          { t: 'Okay. Gehen.', art: 'weg', e: {}, dann: [['d', 'Er wollte allein sein. Oder?']] },
        ], { ruhe: true }],
      ] },
      { t: 'Ihm das Handy wegnehmen.', art: 'mut', nur: 'zuendschnur', e: { druck: 15, bond: { tun: -2, pit: 2 }, ruf: { hafen: -1 }, flag: 'video.geloescht', akte: 'video.handy' }, dann: [
        ['s', 'tun', 'Gib her! Spinnst du?', { mimik: 'wut' }],
        ['s', 'pit', 'Das hat noch keiner für mich gemacht.'],
      ] },
    ], { frage: 'Tun hält dir das Handy hin.' }],
  ],
  andere: { wer: 'pit', zeilen: ['Ich hab drei Wochen geübt.', 'Die drei Wochen sieht keiner.', 'Alle sehen die eine Sekunde.'] },
};

const kontrolle = {
  id: 'kontrolle', titel: 'Kontrolle', zeit: ['herbst', 'winter', 'fruehling'], ort: 'steg', uhr: 8.1, cast: ['kontrolle'], thema: 'regeln',
  szene: (R) => [
    ['t', R.geld < 4 ? 'Fähre zum Festland. Für ein Ticket fehlt dir das Geld.' : 'Fähre zum Festland. Dein Ticket ist abgelaufen.'],
    ['s', 'kontrolle', 'Ticket. Na los.'],
    ['k', 'zuendschnur', 'Der redet mit dir wie mit einem Hund.'],
    ['w', [
      { t: 'Abgelaufen. Mein Fehler.', art: 'ruhig', e: { flag: 'kontrolle.ehrlich', ruf: { gross: 1 } }, dann: [
        ['s', 'kontrolle', 'Hm. Ehrlich ist selten.'],
        ['s', 'kontrolle', 'Vier Euro. Oder ich schreibe deinen Namen auf.'],
        ['w', [
          { t: 'Vier Euro zahlen.', art: 'ruhig', kostet: 4, zeigen: true, e: { geld: -4 }, dann: [['s', 'kontrolle', 'Gute Fahrt.']] },
          { t: 'Schreiben Sie.', art: 'weg', e: { akte: 'kontrolle.ohne' }, dann: [['s', 'kontrolle', 'Beim nächsten Mal kostet es mehr.']] },
        ], { ruhe: true }],
      ] },
      { t: 'In den Taschen suchen.', art: 'weg', e: { druck: 10, akte: 'kontrolle.ohne' }, dann: [
        ['s', 'kontrolle', 'Ich hab Zeit. Du auch?'],
        ['d', 'Alle auf der Fähre schauen her.'],
        ['s', 'kontrolle', 'Name. Adresse. Los.'],
      ] },
      { t: 'Was wollen Sie von mir?!', art: 'hart', e: { druck: 15, akte: 'kontrolle.laut', ruf: { gross: -1 }, flag: 'kontrolle.laut' }, dann: [
        ['s', 'kontrolle', 'Aussteigen. Sofort.', { mimik: 'wut' }],
        ['t', 'Die Fähre fährt ohne dich.'],
      ] },
    ], { reiz: true }],
  ],
  andere: { wer: 'kontrolle', zeilen: ['Achtzig Tickets am Tag.', 'Jeder Zweite schreit mich an.', 'Einer sagt: mein Fehler. Den merke ich mir.'] },
};

const fuenfziger = {
  id: 'fuenfziger', titel: 'Der Fünfziger', zeit: ['winter', 'fruehling'], ort: 'snackStand', uhr: 18.6, cast: ['fraenz'], thema: 'verdacht',
  szene: () => [
    ['t', 'Du hilfst Fränz am Kiosk. Abends fehlen 50 Euro.'],
    ['s', 'fraenz', 'Fünfzig fehlen. Du warst an der Kasse.'],
    ['d', 'Du hast nichts genommen.'],
    ['k', 'trau', 'Er schaut zuerst zu dir. Klar.'],
    ['k', 'voll', 'Hinter der Lade klemmt etwas. Eine grüne Ecke.'],
    ['w', [
      { t: 'Ich war das nicht.', art: 'ruhig', e: {}, dann: [
        ['s', 'fraenz', 'Das sagen alle.'],
        ['w', [
          { t: 'Dann zählen wir nach.', art: 'ruhig', e: { bond: { fraenz: 2 }, ruf: { gross: 1 }, flag: 'fuenfziger.geklaert' }, dann: [
            ['t', 'Der Schein klemmt hinter der Lade.'],
            ['s', 'fraenz', 'Tut mir leid. Mein Fehler.', { mimik: 'trauer' }],
          ] },
          { t: 'Glauben Sie, was Sie wollen.', art: 'weg', e: { druck: 10, flag: 'fuenfziger.offen', akte: 'fuenfziger.verdacht' }, dann: [
            ['d', 'Er zählt noch einmal. Ohne dich.'],
          ] },
        ]],
      ] },
      { t: 'Klar. Immer die Neuen.', art: 'hart', e: { druck: 15, bond: { fraenz: -1 }, flag: 'fuenfziger.offen', akte: 'fuenfziger.verdacht' }, dann: [
        ['t', 'Du wirfst die Schürze auf die Theke.'],
        ['s', 'fraenz', 'So redest du nicht mit mir.'],
      ] },
      { t: 'Gehen. Ohne ein Wort.', art: 'weg', e: { druck: 10, flag: 'fuenfziger.offen', akte: 'fuenfziger.verdacht' }, dann: [
        ['d', 'Wer geht, sieht schuldig aus. Weißt du.'],
      ] },
      { t: 'Da. Hinter der Lade.', art: 'ruhig', nur: 'voll', e: { bond: { fraenz: 2 }, ruf: { gross: 1 }, flag: 'fuenfziger.geklaert' }, dann: [
        ['s', 'fraenz', 'Das hab ich nicht gesehen.', { mimik: 'ueberraschung' }],
        ['s', 'fraenz', 'Tut mir leid. Ich hab dich angeschaut.'],
      ] },
    ], { reiz: true }],
  ],
  andere: { wer: 'fraenz', zeilen: ['Letztes Jahr hat mich einer beklaut.', 'Seitdem zähle ich doppelt.', 'Ich hab zuerst die Neuen angeschaut. Das war falsch.'] },
};

const luege = {
  id: 'luege', titel: 'Die Lüge für Tun', zeit: ['winter', 'fruehling'], ort: 'bootshaus', versatz: { x: 2.6, z: -5.5 }, uhr: 15.4, cast: ['tun', 'ilda'], thema: 'freundschaft',
  szene: () => [
    ['t', 'Nachts hat jemand das Werft-Tor besprüht.'],
    ['m', 'ilda', { versteckt: true }],
    ['s', 'tun', 'Wenn Ilda fragt: Ich war bei dir.'],
    ['s', 'tun', 'Bitte. Mein Vater dreht sonst durch.', { mimik: 'angst' }],
    ['k', 'trau', 'Er lügt nicht mal gut.'],
    ['k', 'nein', 'Er schaut dich so an. Wie sagt man da Nein?'],
    ['w', [
      { t: 'Okay. Du warst bei mir.', art: 'weg', e: { flag: 'luege.ja', bond: { tun: 2 } }, dann: [['s', 'tun', 'Du bist der Beste. Ehrlich.']] },
      { t: 'Nein. Lüg selbst.', art: 'nein', e: { flag: 'luege.nein', bond: { tun: -1 } }, dann: [['s', 'tun', 'Toller Freund.', { mimik: 'wut' }]] },
      { t: 'Was hast du gemacht?', art: 'ruhig', e: {}, dann: [
        ['s', 'tun', 'Nur Farbe. Mika sagt, ich trau mich nie.'],
        ['w', [
          { t: 'Sag es Ilda. Ich komm mit.', art: 'mut', e: { flag: 'luege.begleitet', bond: { tun: 1, ilda: 1 } }, dann: [['s', 'tun', 'Du kommst echt mit?']] },
          { t: 'Okay. Ich decke dich.', art: 'weg', e: { flag: 'luege.ja', bond: { tun: 2 } }, dann: [['s', 'tun', 'Danke. Das vergess ich nicht.']] },
        ], { ruhe: true }],
      ] },
    ]],
    ['m', 'ilda', { versteckt: false }],
    ['t', 'Ilda kommt über den Steg.'],
    ['wenn', (R) => hat(R, 'luege.begleitet'), [
      ['s', 'tun', 'Ich war das. Das Tor.'],
      ['s', 'ilda', 'Du streichst es neu. Samstag.'],
      ['s', 'ilda', 'Und du bist mitgekommen. Merk ich mir.'],
    ], [
      ['s', 'ilda', 'Tun war gestern Abend bei dir?'],
      ['w', [
        { t: 'Ja. Den ganzen Abend.', art: 'weg', wenn: (R) => hat(R, 'luege.ja'), e: { flag: 'luege.gelogen', akte: 'luege.gedeckt', bond: { ilda: -1 } }, dann: [
          ['s', 'ilda', 'Hm.'],
          ['d', 'Sie glaubt dir nicht. Sie sagt nichts.'],
        ] },
        { t: 'Nein. War er nicht.', art: 'ruhig', e: { flag: 'luege.wahrheit', bond: { tun: -2, ilda: 1 } }, dann: [
          ['s', 'tun', 'Danke für nichts.'],
          ['s', 'ilda', 'Tun. Mitkommen.'],
        ] },
        { t: 'Frag ihn selbst.', art: 'weg', e: { flag: 'luege.raus' }, dann: [
          ['s', 'ilda', 'Das mach ich.'],
        ] },
      ]],
    ]],
  ],
  andere: { wer: 'tun', zeilen: ['Mika hat gesagt: Du traust dich nie.', 'Ich wollte einmal nicht der Clown sein.', 'Jetzt bin ich der Clown mit Farbe an den Händen.'] },
};

// Zuhause meldet sich – je nach Zuhause-Karte eine andere Szene
const zuhause = {
  id: 'zuhause', titel: 'Zuhause', zeit: ['winter'], uhr: 19.6, thema: 'familie',
  ort: (R) => (R.karten.zuhause === 'oma' ? 'lucindasGarten' : 'bootshaus'),
  // vor dem Haus statt an der Wand (die Kamera stand sonst im Bootshaus: dunkles Bild); bei Oma neben den Beeten statt auf der Straße
  versatz: (R) => (R.karten.zuhause === 'oma' ? { x: -4, z: 2 } : { x: 2.6, z: -5.5 }),
  cast: (R) => (R.karten.zuhause === 'oma' ? ['lucinda'] : []),
  szene: (R) => (R.karten.zuhause === 'oma' ? [
    ['t', 'Du kommst spät heim. In der Küche brennt Licht.'],
    ['s', 'lucinda', 'Ich hab gewartet. Die Suppe ist kalt.'],
    ['w', [
      { t: 'Tut mir leid, Oma.', art: 'ruhig', e: { druck: -10, flag: 'zuhause.nah' }, dann: [['s', 'lucinda', 'Setz dich. Erzähl mir von deinem Tag.']] },
      { t: 'Ich bin kein Kind mehr.', art: 'hart', e: { druck: 5 }, dann: [['s', 'lucinda', 'Nein. Aber meins.']] },
      { t: 'Ich hab keinen Hunger.', art: 'weg', e: { druck: 5 }, dann: [['d', 'Sie stellt den Teller trotzdem hin.']] },
    ], { ruhe: true }],
  ] : R.karten.zuhause === 'zwei' ? [
    ['t', 'Dein Handy klingelt. Papa. Vom Festland.'],
    ['s', 'papa', 'Kommst du am Wochenende zu mir?'],
    ['s', 'mama', 'Sag ihm, er soll pünktlich zahlen.'],
    ['d', 'Du stehst zwischen den beiden. Wieder.'],
    ['w', [
      { t: 'Ich bin nicht euer Briefträger.', art: 'nein', e: { druck: -10, flag: 'zuhause.grenze' }, dann: [['s', 'papa', 'Hast recht. Das war nicht fair.']] },
      { t: 'Ja. Ich sag es ihm.', art: 'weg', e: { druck: 10 }, dann: [['d', 'Du sagst es. Wort für Wort.']] },
      { t: 'Auflegen.', art: 'hart', e: { druck: 5 }, dann: [['d', 'Stille. Das Handy leuchtet noch.']] },
    ]],
  ] : [
    ['t', 'Dein Handy klingelt. Mama. Aus der Nachtschicht.'],
    ['s', 'mama', 'Ich schaff es heute nicht. Essen steht im Kühlschrank.'],
    ['w', [
      { t: 'Passt schon.', art: 'weg', e: { druck: 5 }, dann: [['d', 'Passt schon. Sagst du immer.']] },
      { t: 'Du bist nie da.', art: 'hart', e: { druck: 5, flag: 'zuhause.gesagt' }, dann: [['s', 'mama', 'Ich weiß. Sonntag. Versprochen.']] },
      { t: 'Hast du Sonntag Zeit?', art: 'ruhig', e: { druck: -10, flag: 'zuhause.nah' }, dann: [['s', 'mama', 'Sonntag. Ich koche. Du suchst aus.']] },
    ], { ruhe: true }],
  ]),
};

const gespraech = {
  id: 'gespraech', titel: 'Das Gespräch über dich', fest: 'winter', platz: 'ende', ort: 'kapitaenin', uhr: 14.2, cast: ['ilda', 'fraenz'], thema: 'akte',
  szene: (R) => [
    ['t', 'Halbzeit. Ilda und Fränz reden. Über dich.'],
    ['s', 'ilda', 'Wir schauen, wie es mit dir läuft.'],
    ['wenn', (r) => r.akte.includes('ankunft.kamera'), [['s', 'ilda', 'Am ersten Tag: Griff in eine Kamera.']]],
    ['wenn', (r) => r.akte.includes('kontrolle.laut'), [['s', 'ilda', 'Auf der Fähre: laut geworden.']]],
    ['wenn', (r) => r.akte.includes('video.handy'), [['s', 'ilda', 'Einem Jungen das Handy weggenommen.']]],
    ['wenn', (r) => hat(r, 'fuenfziger.offen'), [['s', 'fraenz', 'Bei mir fehlte Geld.']]],
    ['wenn', (r) => hat(r, 'fuenfziger.geklaert'), [['s', 'fraenz', 'Bei mir fehlte Geld. War mein Fehler.']]],
    ['wenn', (r) => !r.akte.length, [['s', 'ilda', 'Die Akte ist dünn geblieben. Bisher.']]],
    ['k', 'trau', 'Sie reden, als wärst du nicht im Raum.'],
    ['w', [
      { t: 'Zuhören. Nichts sagen.', art: 'weg', e: {}, dann: [
        ['s', 'ilda', 'Du sagst nichts dazu?'],
        ['d', 'Was sollst du sagen. Steht ja alles da.'],
      ] },
      { t: 'Darf ich was sagen?', art: 'ruhig', e: {}, dann: [
        ['s', 'ilda', 'Dafür sitzen wir hier.'],
        ['w', [
          { t: 'Ich wollte keinen Ärger.', art: 'ruhig', e: { flag: 'gespraech.eigen', akte: 'gespraech.eigen', ruf: { gross: 1 }, bond: { ilda: 1 } }, dann: [['s', 'ilda', 'Das schreibe ich dazu. Wort für Wort.']] },
          { t: 'Das war nicht alles ich.', art: 'ruhig', e: { flag: 'gespraech.eigen', akte: 'gespraech.eigen', ruf: { gross: 1 }, bond: { ilda: 1 } }, dann: [['s', 'ilda', 'Dann erzähl. Ich schreibe mit.']] },
          { t: 'Vergesst es.', art: 'weg', e: {}, dann: [['s', 'fraenz', 'Schade. Ich hätte zugehört.']] },
        ], { ruhe: true }],
      ] },
      { t: 'Ihr kennt mich nicht.', art: 'hart', e: { druck: 10, flag: 'gespraech.raus', akte: 'gespraech.raus' }, dann: [
        ['t', 'Du stehst auf. Der Stuhl fällt um.'],
        ['s', 'ilda', 'Die Tür bleibt offen.'],
      ] },
    ]],
    ['wenn', (r) => hat(r, 'luege.gelogen') && !hat(r, 'gespraech.raus'), [
      ['s', 'ilda', 'Noch etwas. Tun war bei dir. Sagst du.'],
      ['w', [
        { t: 'Das war gelogen.', art: 'ruhig', e: { flag: 'luege.gestanden', bond: { ilda: 2 } }, dann: [['s', 'ilda', 'Das hat Mut gekostet. Danke.']] },
        { t: 'Ja. War er.', art: 'weg', e: { bond: { ilda: -1 } }, dann: [['s', 'ilda', 'Gut. Dann steht es so da.']] },
      ], { ruhe: true }],
    ]],
  ],
  andere: { wer: 'ilda', zeilen: ['Ich hab hundert Akten gelesen.', 'In keiner steht, was jemand kann.', 'Ich warte immer auf den einen eigenen Satz.'] },
};

export const SITUATIONEN_1 = [ankunft, video, kontrolle, fuenfziger, luege, zuhause, gespraech];
