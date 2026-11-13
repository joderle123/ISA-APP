// RESPAWN – Aufträge (Missionen). Größer als eine freie Aktion: mehrere Schritte, ein Spielteil, der etwas abverlangt
// (Zeit, Geschick, Merken, Ruhe), und mittendrin eine Entscheidung, die bleibt. Kein Auftrag hat „die richtige Antwort“ –
// jeder Weg hat einen Preis und einen Gewinn.
//
// Einen Auftrag bauen (auch für ein neues Skills-Thema): Eintrag unten anhängen, fertig. Felder:
//   id, titel, bild, von (wer ihn gibt), ort (an welchem Ort aus ORTE man ihn bekommt), ab/bis (Kapitel 0–3), wenn(R)
//   thema      nur wenn die Lehrperson dieses Thema eingeschaltet hat (THEMEN unten); ohne thema = gehört zum Spiel
//   kurz       ein Satz für die Liste · wie: drei Sätze für die Erklärkarte (Was? Wo? Worauf kommt es an?)
//   lohn       Text für die Karte · sturm: 0..1 Wetter, solange der Auftrag läuft
//   schritte   siehe ../missionen.js (hin, lauf, sammeln, szene) – jeder Schritt darf `wenn(R)` haben
//   gespraech  zwei, drei offene Fragen für danach (nur für die Lehrperson, im Spiel nicht zu sehen)
// Schreibregeln wie überall: Sprechblase und Erzählzeile höchstens 12 Wörter, Auswahl höchstens 6. Kein Zeigefinger.
import { hat, bond } from '../run.js';
import { sterneTreffer } from '../missionen.js';

// Themen, die eine Lehrperson dazuschalten kann (Start → „Themen“ oder im Link: ?thema=nein,wut)
export const THEMEN = [
  { id: 'nein', name: 'Nein sagen', bild: '✋', kurz: 'Druck in der Gruppe. Bei sich bleiben.' },
  { id: 'wut', name: 'Wut und Stopp', bild: '🚦', kurz: 'Merken, wenn es kocht. Anhalten können.' },
];

const lieferung = {
  id: 'lieferung', titel: 'Die Lieferung', bild: '📦', von: 'fraenz', ort: 'kiosk', ab: 0,
  kurz: 'Drei Pakete. Drei Adressen. Wenig Zeit.',
  wie: ['Hol drei Pakete an der Werft.', 'Bring jedes Paket ans Ziel, bevor die Zeit abläuft.', 'Unterwegs entscheidest du selbst, was wichtiger ist.'],
  lohn: 'bis 30 Euro',
  gespraech: ['Tee trinken oder pünktlich sein – was hättest du gemacht?', 'Niemand ist zu Hause. Was machst du mit dem Paket?'],
  schritte: [
    { art: 'hin', ort: 'werft', text: 'Hol die Pakete an der Werft.', cast: ['geselle'],
      szene: (R, M) => [
        ['s', 'geselle', 'Drei Pakete für Fränz. Pack sie gut.'],
        ['spiel', { titel: 'Pakete stapeln – tippe im richtigen Moment', bild: '📦' }, (g) => {
          M.sterne.push(sterneTreffer(g.treffer, g.von));
          return [['s', 'geselle', g.treffer >= g.von ? 'Sitzt. Los, die Leute warten.' : 'Schief, aber hält. Los jetzt.']];
        }],
      ] },
    { art: 'lauf', ort: 'leuchtturm', text: 'Paket 1: schnell zum Leuchtturm.',
      nach: (R, erg) => (erg.geschafft
        ? [['t', 'Der Mann am Leuchtturm unterschreibt. Pünktlich.']]
        : [['t', 'Zu spät. Der Mann am Leuchtturm tippt auf seine Uhr.'], ['e', { druck: 5 }]]) },
    { art: 'lauf', ort: 'garten', text: 'Paket 2: zum Garten am Markt.', cast: ['lucinda'],
      nach: (R, erg) => [
        ['s', 'lucinda', erg.geschafft ? 'Da bist du ja. Auf die Minute.' : 'Spät. Aber du bist da.'],
        ['s', 'lucinda', 'Bleib kurz. Ich hab Tee gemacht.'],
        ['w', [
          { t: 'Gern. Fünf Minuten.', art: 'ruhig', e: { bond: { lucinda: 1 }, druck: -8, flag: 'liefer.tee' }, dann: [
            ['s', 'lucinda', 'Erzähl. Wie ist es bei Fränz?'],
            ['d', 'Der Tee ist gut. Die Uhr läuft.'],
          ] },
          { t: 'Keine Zeit. Danke.', art: 'weg', e: {}, dann: [['s', 'lucinda', 'Immer in Eile. Lauf schon.']] },
        ]],
      ] },
    { art: 'lauf', ort: 'strand', text: 'Paket 3: zum Strand.', faktor: (R) => (hat(R, 'liefer.tee') ? 0.92 : 1.15),
      nach: (R, erg) => [
        ['t', erg.geschafft ? 'Am Strandhaus ist niemand. Die Tür ist zu.' : 'Zu spät. Am Strandhaus ist niemand mehr.'],
        ['w', [
          { t: 'Vor die Tür legen.', art: 'weg', e: { flag: 'liefer.abgelegt' }, dann: [['d', 'Wird schon keiner nehmen.']] },
          { t: 'Wieder mitnehmen.', art: 'ruhig', e: { flag: 'liefer.zurueck' }, dann: [['d', 'Schwer. Aber sicher.']] },
          { t: 'Aufmachen. Reinschauen.', art: 'hart', e: { druck: 5 }, dann: [
            ['t', 'Kopfhörer. Neu. Noch in der Folie.'],
            ['w', [
              { t: 'Einstecken.', art: 'hart', e: { flag: 'liefer.geklaut', akte: 'paket' }, dann: [['d', 'Passt genau in die Jackentasche.']] },
              { t: 'Zukleben. Mitnehmen.', art: 'ruhig', e: { flag: 'liefer.zurueck' }, dann: [['d', 'Das Klebeband hält. Fast wie vorher.']] },
            ]],
          ] },
        ]],
      ] },
    { art: 'hin', ort: 'kiosk', text: 'Zurück zu Fränz. Abrechnen.', cast: ['fraenz'],
      szene: (R, M) => {
        const gut = M.sterne.filter((s) => s >= 2).length;
        const lohn = 12 + gut * 6;
        if (hat(R, 'liefer.geklaut')) return [
          ['s', 'fraenz', 'Zwei Unterschriften. Wo ist das dritte Paket?'],
          ['w', [
            { t: 'Ich hab es. Hier.', art: 'mut', e: { flag: 'gestanden.paket', bond: { fraenz: 1 }, druck: -5 }, dann: [
              ['s', 'fraenz', 'Aufgemacht. Hm. Aber zurückgebracht.'],
              ['e', { geld: Math.max(6, lohn - 10) }],
            ] },
            { t: 'Abgegeben. Am Strand.', art: 'weg', e: { flag: 'liefer.geleugnet', geld: lohn }, dann: [['s', 'fraenz', 'Gut. Dann stimmt die Kasse.']] },
          ]],
        ];
        return [
          ['s', 'fraenz', hat(R, 'liefer.zurueck') ? 'Mitgebracht? Gut. Ich fahr es morgen selbst.' : 'Vor die Tür? Na gut. Hoffen wir.'],
          ['s', 'fraenz', gut >= 3 ? 'Alles pünktlich. So jemanden brauch ich.' : 'Fürs erste Mal in Ordnung.'],
          ['e', { geld: lohn, bond: { fraenz: hat(R, 'liefer.zurueck') ? 2 : 1 }, flag: 'liefer.fertig' }],
        ];
      } },
  ],
};

const nachtwache = {
  id: 'nachtwache', titel: 'Nachtwache', bild: '🔦', von: 'ilda', ort: 'steg', ab: 1,
  kurz: 'Jemand klaut nachts Benzin am Steg.',
  wie: ['Geh in der Nacht zum Steg und pass auf.', 'Merk dir genau, was du siehst.', 'Dann sag Ilda, was war. Oder nicht.'],
  lohn: '15 Euro von Ilda',
  gespraech: ['Zwanzig Euro fürs Wegschauen – wer hätte sie genommen?', 'Was ist schwerer: stehen bleiben oder Hilfe holen?'],
  schritte: [
    { art: 'hin', ort: 'steg', text: 'Geh in der Nacht zum Steg.', uhr: 23.3, cast: ['mika', 'luc'],
      szene: (R, M) => [
        ['t', 'Nacht am Steg. Nur das Wasser klatscht.'],
        ['t', 'Dann Schritte. Du duckst dich hinter die Kisten.'],
        ['merk', { titel: 'Merk dir, was sie tragen', dinge: ['⛽', '🔦', '🎒', '🧤', '🪣', '🔧'] }, (m) => {
          M.sterne.push(sterneTreffer(m.richtig, m.von)); M.gemerkt = m.richtig >= m.von;
          return [['d', M.gemerkt ? 'Zwei Kanister. Eine Lampe. Mikas Jacke.' : 'Es ging schnell. Du bist nicht sicher.']];
        }],
        ['s', 'mika', 'Na? Du hast nichts gesehen. Klar?'],
        ['s', 'mika', 'Zwanzig Euro. Für deine Augen.'],
        ['w', [
          { t: 'Geld nehmen. Schweigen.', art: 'weg', e: { geld: 20, ruf: { krater: 1 }, bond: { mika: 1 }, flag: 'wache.geschmiert' }, dann: [
            ['s', 'mika', 'Klug. Wir sehen uns.'],
            ['d', 'Der Schein ist feucht. Deine Hand auch.'],
          ] },
          { t: 'Stellt die Kanister zurück.', art: 'nein', e: { druck: 10 }, dann: [
            ['s', 'luc', 'Sonst was? Hä? Sonst was?'],
            ['t', 'Luc kommt ganz nah. Du bleibst stehen.'],
            ['zuck', { titel: 'Stehen bleiben. Nicht zucken.' }, (z) => {
              M.sterne.push(sterneTreffer(z.richtig, z.von));
              return z.richtig / z.von >= 0.7
                ? [['s', 'mika', 'Lass, Luc. Die Kanister bleiben hier.'], ['e', { flag: 'wache.gestoppt', bond: { mika: -1 }, ruf: { hafen: 1 }, druck: -5 }]]
                : [['s', 'luc', 'Gezuckt! Habt ihr das gesehen?'], ['t', 'Sie lachen. Und nehmen die Kanister mit.'], ['e', { flag: 'wache.gezuckt', druck: 8 }]];
            }],
          ] },
          { t: 'Rennen. Ilda holen.', art: 'mut', e: { flag: 'wache.gerannt' }, dann: [['d', 'Jetzt. Bevor sie weg sind.']] },
        ]],
      ] },
    { art: 'lauf', platz: 'kapitaenin', name: 'Ildas Haus', text: 'Lauf zu Ilda. Schnell.', faktor: 1.05, uhr: 23.5, cast: ['ilda'], wenn: (R) => hat(R, 'wache.gerannt'),
      nach: (R, erg) => (erg.geschafft
        ? [['s', 'ilda', 'Am Steg? Jetzt? Ich komme.'], ['t', 'Ilda erwischt sie mit den Kanistern.'], ['e', { flag: 'wache.geholt', bond: { ilda: 1, mika: -2 }, ruf: { hafen: 1 } }]]
        : [['s', 'ilda', 'Zu spät. Der Steg ist leer.'], ['e', { flag: 'wache.verpasst' }]]) },
    { art: 'hin', platz: 'kapitaenin', name: 'Ildas Haus', text: 'Sag Ilda, was in der Nacht war.', uhr: 9.2, cast: ['ilda'],
      szene: (R, M) => {
        if (hat(R, 'wache.geholt')) return [['s', 'ilda', 'Gut, dass du gerannt bist. Der Tank ist voll.'], ['e', { geld: 15, flag: 'wache.fertig' }]];
        const wahl = [
          { t: 'Mika und Luc. Zwei Kanister.', art: 'ruhig', e: { flag: 'wache.gesagt', bond: { ilda: 1, mika: -2 }, geld: 15 }, dann: [
            ['s', 'ilda', M.gemerkt ? 'Genau beschrieben. Damit kann ich arbeiten.' : 'Ungefähr reicht kaum. Aber danke.'],
          ] },
          { t: 'Ich hab nichts gesehen.', art: 'weg', e: { flag: 'wache.geschwiegen', bond: { ilda: -1 } }, dann: [['s', 'ilda', 'Hm. Der Tank ist trotzdem leer.']] },
        ];
        if (hat(R, 'wache.geschmiert')) wahl.push({ t: 'Sie haben mir Geld gegeben.', art: 'mut', e: { flag: 'wache.gebeichtet', geld: -Math.min(20, R.geld), bond: { ilda: 2, mika: -2 }, druck: -10 }, dann: [
          ['s', 'ilda', 'Das zu sagen kostet mehr als zwanzig Euro.'],
        ] });
        return [['s', 'ilda', 'Und? War jemand am Steg?'], ['w', wahl], ['e', { flag: 'wache.fertig' }]];
      } },
  ],
};

const sturm = {
  id: 'sturm', titel: 'Sturmwarnung', bild: '⛈️', von: 'lucinda', ort: 'garten', ab: 1, bis: 1, sturm: 0.85,
  kurz: 'Ein Sturm kommt. Der Hafen ist nicht fertig.',
  wie: ['Mach fünf Boote am Hafen fest, bevor der Sturm da ist.', 'Dann fehlt jemand. Finde ihn.', 'Wer Angst hat, braucht keine Befehle.'],
  lohn: 'Die Insel merkt sich das',
  gespraech: ['Tiago kann nicht aufstehen. Was hilft – und was nicht?', 'Wann hat dir jemand geholfen, ruhig zu werden?'],
  schritte: [
    { art: 'sammeln', text: 'Mach fünf Boote am Hafen fest.', bild: '⚓', name: 'Boote fest', faktor: 1.25,
      dinge: [{ ort: 'steg', dx: 0, dz: 0 }, { ort: 'steg', dx: 9, dz: -5 }, { ort: 'werft', dx: 0, dz: 0 }, { ort: 'werft', dx: -8, dz: 6 }, { ort: 'zuhause', dx: 6, dz: -8 }],
      nach: (R, erg, M) => [
        ['t', erg.geschafft ? 'Fünf Knoten. Alle halten.' : 'Der Wind ist schneller. Ein Boot treibt ab.'],
        ['e', { ruf: { hafen: erg.geschafft ? 1 : 0 }, chat: { von: 'noor', text: 'Tiago ist nicht da. Er wollte zum Leuchtturm.' } }],
        ['d', 'Dein Handy summt. Noor. Tiago fehlt.'],
      ] },
    { art: 'lauf', ort: 'leuchtturm', text: 'Tiago ist am Leuchtturm. Lauf.', faktor: 1.1, cast: ['tiago'],
      nach: (R, erg, M) => {
        const atmen = (zuege, dann) => ['atem', { zuege }, dann];
        return [
          ['t', 'Tiago sitzt an der Mauer. Er zittert.'],
          ['s', 'tiago', 'Ich kann nicht. Der Wind. Ich kann nicht.', { mimik: 'trauer' }],
          ['w', [
            { t: 'Atme mit mir. Langsam.', art: 'ruhig', e: {}, dann: [atmen(3, (a) => {
              M.sterne.push(a.gut ? 3 : 1);
              return a.gut
                ? [['s', 'tiago', 'Okay. Okay. Es geht.'], ['e', { flag: 'sturm.ruhig', bond: { tiago: 2 } }]]
                : [['s', 'tiago', 'Zu schnell. Nochmal. Bitte.'], atmen(2, () => [['s', 'tiago', 'Besser. Gehen wir.'], ['e', { flag: 'sturm.ruhig', bond: { tiago: 1 } }]])];
            })] },
            { t: 'Steh auf. Wir müssen los.', art: 'hart', e: { bond: { tiago: -1 }, flag: 'sturm.gezerrt' }, dann: [
              ['s', 'tiago', 'Lass mich! Fass mich nicht an!'],
              ['d', 'So wird das nichts.'],
              atmen(3, (a) => { M.sterne.push(a.gut ? 2 : 0); return [['s', 'tiago', a.gut ? 'Jetzt geht es. Langsam.' : 'Ich versuch es. Bleib da.'], ['e', { flag: 'sturm.ruhig' }]]; }),
            ] },
            { t: 'Bleib hier. Ich hol Hilfe.', art: 'weg', e: { flag: 'sturm.allein' }, dann: [['t', 'Tiago bleibt allein im Wind.'], ['e', {}]] },
          ]],
        ];
      } },
    { art: 'lauf', ort: 'garten', text: 'Bring Tiago ins Trockene. Zum Garten.', faktor: 1.35, cast: ['lucinda', 'tiago'], wenn: (R) => !hat(R, 'sturm.allein'),
      nach: (R, erg) => [
        ['s', 'lucinda', erg.geschafft ? 'Rein mit euch. Der Tee ist heiß.' : 'Nass bis auf die Haut. Aber da.'],
        ['s', 'tiago', 'Sag es keinem. Dass ich nicht konnte.'],
        ['w', [
          { t: 'Versprochen.', art: 'ruhig', e: { bond: { tiago: 1 }, flag: 'sturm.geheim' }, dann: [['s', 'tiago', 'Danke.']] },
          { t: 'Da ist nichts peinlich.', art: 'ruhig', e: { bond: { tiago: 1 }, flag: 'sturm.normal' }, dann: [['s', 'tiago', 'Sagst du. Du hattest keine Angst.'], ['d', 'Doch. Hattest du.']] },
        ]],
        ['e', { druck: -10, bond: { lucinda: 1 }, ruf: { hafen: 1 }, flag: 'sturm.fertig' }],
      ] },
    { art: 'hin', ort: 'garten', text: 'Sag Oma Lucinda, wo Tiago ist.', cast: ['lucinda'], wenn: (R) => hat(R, 'sturm.allein'),
      szene: () => [
        ['s', 'lucinda', 'Allein? Am Turm? Bei dem Wind?'],
        ['t', 'Sie greift ihre Jacke. Ihr geht zusammen.'],
        ['t', 'Tiago sitzt noch da. Kleiner als vorher.'],
        ['e', { bond: { tiago: -1, lucinda: 1 }, druck: 8, flag: 'sturm.fertig' }],
      ] },
  ],
};

// ---------- Thema „Nein sagen“ ----------
const mutprobe = {
  id: 'mutprobe', titel: 'Die Mutprobe', bild: '✋', von: 'mika', ort: 'krater', ab: 0, thema: 'nein',
  kurz: 'Die Crew will, dass du über die Kante läufst.',
  wie: ['Geh zum Krater. Die Crew wartet.', 'Sie drängen dreimal. Jedes Mal stärker.', 'Finde deinen Weg. Es gibt mehr als einen.'],
  lohn: 'Alle reden darüber',
  gespraech: ['Welches Nein hat am besten gehalten? Warum?', 'Was macht es schwer, bei einem Nein zu bleiben?', 'Wer mitgemacht hat: Was hat dich überzeugt?'],
  schritte: [
    { art: 'hin', ort: 'krater', text: 'Geh zum Krater. Die Crew wartet.', uhr: 20.6, cast: ['mika', 'luc', 'yara'],
      szene: (R, M) => {
        // Wer mitmacht: Balance am Rand
        const kante = [
          ['t', 'Der Rand ist schmal. Unten glüht es.'],
          ['spiel', { titel: 'Balance halten – tippe im richtigen Moment', bild: '🔥', runden: 4 }, (g) => {
            M.sterne.push(sterneTreffer(g.treffer, g.von));
            return g.treffer >= g.von - 1
              ? [['s', 'mika', 'Respekt. Du gehörst dazu.'], ['e', { flag: 'mut.geschafft', ruf: { krater: 2 }, bond: { mika: 1 }, druck: -10 }]]
              : [['t', 'Dein Fuß rutscht. Yara reißt dich zurück.'], ['s', 'yara', 'Bist du irre? Dein Knie blutet.'], ['e', { flag: 'mut.gestuerzt', druck: 15, spaet: 1, bond: { yara: 1 } }]];
          }],
        ];
        // Wer Nein sagt: Der Druck kommt wieder. Halten heißt: nicht zucken.
        const halten = (titel, dann) => ['zuck', { titel }, (z) => { const fest = z.richtig / z.von >= 0.7; M.sterne.push(sterneTreffer(z.richtig, z.von)); return dann(fest); }];
        const ende = [
          ['s', 'mika', 'Letzte Chance. Sonst bist du raus.'],
          ['w', [
            { t: 'Dann bin ich raus.', art: 'nein', e: { flag: 'mut.raus', bond: { mika: -1, yara: 1 }, druck: -5 }, dann: [
              ['t', 'Keiner sagt etwas. Du gehst.'],
              ['s', 'yara', 'Ich wär gern so. Ehrlich.'],
            ] },
            { t: 'Na gut. Einmal.', art: 'weg', e: { flag: 'mut.gemacht' }, dann: kante },
          ]],
        ];
        const runde2 = [
          ['s', 'luc', 'Angsthase. Alle schauen zu.'],
          halten('Bleib bei deinem Nein. Nicht zucken.', (fest) => (fest
            ? [['d', 'Dein Nein steht noch. Lauter als vorher.'], ...ende]
            : [['d', 'Deine Stimme war leise. Zu leise.'], ['e', { druck: 10 }], ...ende])),
        ];
        return [
          ['s', 'mika', 'Jeder hier ist über die Kante gelaufen.'],
          ['s', 'mika', 'Jetzt du.'],
          ['w', [
            { t: 'Nein. Mach ich nicht.', art: 'nein', e: { flag: 'mut.klar' }, dann: runde2 },
            { t: 'Nein. Mir ist das zu hoch.', art: 'ruhig', e: { flag: 'mut.grund' }, dann: [['s', 'luc', 'Zu hoch? Meine Schwester war oben.'], ...runde2] },
            { t: 'Lass uns was anderes machen.', art: 'ruhig', e: { flag: 'mut.anders' }, dann: [['s', 'mika', 'Was anderes. Klar. Nach der Kante.'], ...runde2] },
            { t: 'Okay. Ich mach es.', art: 'weg', e: { flag: 'mut.gemacht' }, dann: kante },
          ]],
        ];
      } },
    { art: 'hin', ort: 'brunnen', text: 'Geh zum Brunnen. Es spricht sich herum.', cast: ['jolie', 'pit'],
      szene: (R) => {
        if (hat(R, 'mut.raus')) return [
          ['s', 'jolie', 'Du hast Mika Nein gesagt? Vor allen?'],
          ['s', 'pit', 'Ich hab mich das nie getraut.'],
          ['e', { ruf: { hafen: 1 }, bond: { jolie: 1, pit: 1 }, flag: 'mut.fertig' }],
        ];
        if (hat(R, 'mut.geschafft')) return [
          ['s', 'pit', 'Stimmt das? Über die Kante?'],
          ['s', 'jolie', 'Und wenn du gefallen wärst?'],
          ['w', [
            { t: 'War halb so wild.', art: 'weg', e: { bond: { jolie: -1 } }, dann: [['s', 'jolie', 'Sagt jeder. Bis einer fällt.']] },
            { t: 'Ich hatte Angst. Ehrlich.', art: 'mut', e: { bond: { jolie: 1, pit: 1 }, druck: -5 }, dann: [['s', 'pit', 'Dann sind wir schon zwei.']] },
          ]],
          ['e', { flag: 'mut.fertig' }],
        ];
        return [
          ['s', 'jolie', 'Dein Knie. Was ist passiert?'],
          ['w', [
            { t: 'Hingefallen. Nichts weiter.', art: 'weg', e: {}, dann: [['s', 'jolie', 'Am Krater fällt keiner einfach hin.']] },
            { t: 'Mutprobe. Ging schief.', art: 'mut', e: { bond: { jolie: 1 }, druck: -5 }, dann: [['s', 'jolie', 'Komm. Ich hab Pflaster.']] },
          ]],
          ['e', { flag: 'mut.fertig' }],
        ];
      } },
  ],
};

// ---------- Thema „Wut und Stopp“ ----------
const platzen = {
  id: 'platzen', titel: 'Kurz vorm Platzen', bild: '🚦', von: 'geselle', ort: 'werft', ab: 0, thema: 'wut',
  kurz: 'Arbeit in der Werft. Und Luc, der stört.',
  wie: ['Hol sechs Kisten und stapel sie in der Werft.', 'Luc wirft deinen Stapel um. Mehr als einmal.', 'Dein Druck steigt. Was machst du damit?'],
  lohn: 'bis 25 Euro',
  gespraech: ['Woran hast du gemerkt, dass der Druck steigt?', 'Was hat den Druck gesenkt – und was nur kurz?', 'Wann ist Hilfe holen stark?'],
  schritte: [
    { art: 'sammeln', text: 'Hol sechs Kisten zur Werft.', bild: '📦', name: 'Kisten', faktor: 1.2,
      dinge: [{ ort: 'werft', dx: 7, dz: 4 }, { ort: 'werft', dx: -7, dz: -5 }, { ort: 'steg', dx: 4, dz: 4 }, { ort: 'steg', dx: -6, dz: -3 }, { ort: 'kiosk', dx: 5, dz: 0 }, { ort: 'zuhause', dx: 5, dz: -7 }],
      nach: (R, erg, M) => [['t', erg.geschafft ? 'Sechs Kisten. Deine Arme brennen.' : 'Nicht alle geschafft. Marc holt den Rest.']] },
    { art: 'hin', ort: 'werft', text: 'Stapel die Kisten in der Werft.', cast: ['geselle', 'luc'],
      szene: (R, M) => {
        const stapeln = (dann) => ['spiel', { titel: 'Kisten stapeln – tippe im richtigen Moment', bild: '📦' }, (g) => { M.sterne.push(sterneTreffer(g.treffer, g.von)); return dann(g); }];
        const raus = [['s', 'geselle', 'Raus. Beide. Sofort.'], ['e', { flag: 'platz.raus', bond: { fraenz: -1 }, akte: 'werftstreit' }]];
        const schluss = [
          stapeln((g) => [['s', 'geselle', g.treffer >= g.von ? 'Sauber. Trotz allem. Hier, dein Geld.' : 'Steht. Hier, dein Geld.']]),
          ['e', { geld: 25, flag: 'platz.fertig' }],
        ];
        const zweitesMal = [
          ['t', 'Der Stapel steht wieder. Luc kommt zurück.'],
          ['s', 'luc', 'Ups. Schon wieder.', { mimik: 'freude' }],
          ['e', { druck: 15 }, { reiz: true }],
          ['k', 'zuendschnur', 'Deine Hände sind Fäuste. Schon lange.'],
          ['w', [
            { t: 'Zu Marc gehen. Es sagen.', art: 'ruhig', e: { flag: 'platz.gesagt', druck: -10 }, dann: [['s', 'geselle', 'Luc! Du stapelst jetzt mit.'], ['s', 'luc', 'Petze.'], ...schluss] },
            { t: 'Luc ansprechen. Ruhig bleiben.', art: 'mut', e: {}, dann: [
              ['s', 'luc', 'Was willst du? Hm?'],
              ['zuck', { titel: 'Ruhig bleiben. Er will, dass du zuckst.' }, (z) => {
                M.sterne.push(sterneTreffer(z.richtig, z.von));
                return z.richtig / z.von >= 0.7
                  ? [['t', 'Luc zuckt die Schultern. Er geht.'], ['e', { flag: 'platz.ruhig', druck: -15, ruf: { hafen: 1 } }], ...schluss]
                  : [['s', 'luc', 'Na also. Geht doch.'], ['t', 'Du hast gebrüllt. Alle haben es gehört.'], ['e', { flag: 'platz.gebruellt', druck: 5 }], ...schluss];
              }],
            ] },
            { t: 'Kiste gegen die Wand.', art: 'hart', e: { flag: 'platz.getreten', druck: -10 }, dann: [['t', 'Holz splittert. Kurz ist es still im Kopf.'], ['s', 'geselle', 'Die Kiste zahlst du.'], stapeln(() => []), ['e', { geld: 12, flag: 'platz.fertig' }]] },
            { t: 'Luc schubsen.', art: 'hart', e: { flag: 'platz.geschubst', bond: { luc: -1 } }, dann: raus },
          ]],
        ];
        return [
          ['s', 'geselle', 'Sechs Kisten. Sauber gestapelt. Dann Geld.'],
          stapeln(() => [['t', 'Luc läuft vorbei. Sein Fuß trifft den Stapel.']]),
          ['s', 'luc', 'Ups. Stand im Weg.'],
          ['e', { druck: 15 }, { reiz: true }],
          ['w', [
            { t: 'Stopp. Erst atmen.', art: 'ruhig', e: { flag: 'platz.stopp' }, dann: [
              ['atem', { zuege: 3 }, (a) => { M.sterne.push(a.gut ? 3 : 1); return [['e', { druck: a.gut ? -18 : -6 }], ['d', a.gut ? 'Der Kopf wird klarer. Der Stapel wartet.' : 'Ein bisschen besser. Reicht fürs Erste.']]; }],
              stapeln(() => []), ...zweitesMal,
            ] },
            { t: 'Einfach weitermachen.', art: 'weg', e: {}, dann: [['d', 'Es brodelt. Du stapelst trotzdem.'], stapeln(() => []), ...zweitesMal] },
            { t: 'Luc schubsen.', art: 'hart', e: { flag: 'platz.geschubst', bond: { luc: -1 } }, dann: raus },
          ]],
        ];
      } },
  ],
};

export const MISSIONEN = [lieferung, nachtwache, sturm, mutprobe, platzen];

// Was am Morgen danach davon übrig ist (hängt an FOLGEN in welt.js)
export const MISSION_FOLGEN = [
  { id: 'liefer.abgelegt', wenn: (R) => hat(R, 'liefer.abgelegt'), text: ['Das Paket am Strand ist weg.', 'Fränz zahlt es aus seiner Kasse.'], e: () => ({ bond: { fraenz: -1 }, druck: 5 }) },
  { id: 'liefer.geleugnet', wenn: (R) => hat(R, 'liefer.geleugnet'), text: ['Der Kunde vom Strand ruft bei Fränz an.', 'Fränz schaut dich lange an.'], e: () => ({ bond: { fraenz: -2 }, druck: 10 }) },
  { id: 'wache.geschmiert', wenn: (R) => hat(R, 'wache.geschmiert') && !hat(R, 'wache.gebeichtet'), text: ['Mika grüßt dich jetzt. Vor allen.'], e: () => ({ ruf: { hafen: -1 } }) },
  { id: 'wache.gestoppt', wenn: (R) => hat(R, 'wache.gestoppt'), text: ['Am Hafen heißt es: Du bist stehen geblieben.'], e: () => ({ ruf: { hafen: 1 }, druck: -5 }) },
  { id: 'sturm.ruhig', wenn: (R) => hat(R, 'sturm.ruhig') && hat(R, 'sturm.fertig'), text: ['Tiago winkt dir vom Markt aus zu.'], e: () => ({ bond: { tiago: 1 }, chat: { von: 'tiago', text: 'Danke wegen gestern. Echt.' } }) },
  { id: 'mut.raus', wenn: (R) => hat(R, 'mut.raus'), text: ['Die Crew ignoriert dich. Yara nicht.'], e: () => ({ bond: { yara: 1 } }) },
  { id: 'platz.geschubst', wenn: (R) => hat(R, 'platz.geschubst'), text: ['Fränz hat von der Werft gehört.', 'Er sagt nichts. Das ist schlimmer.'], e: () => ({ druck: 8 }) },
];

// Einträge für die Akte (hängen an AKTE in akte.js)
export const MISSION_AKTE = {
  paket: { amt: 'Unterschlägt eine Sendung aus einer Lieferung.', echt: (R) => (R.flags['gestanden.paket'] ? 'Niemand war da. Du hast es geöffnet – und zurückgebracht.' : 'Niemand war da. Das Paket war offen.') },
  werftstreit: { amt: 'Schubst einen Jugendlichen in der Werft. Arbeit abgebrochen.', echt: 'Er hat deinen Stapel umgeworfen. Zweimal.' },
};
