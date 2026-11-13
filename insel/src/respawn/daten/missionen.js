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
  { id: 'netz', name: 'Sicher im Netz', bild: '💬', kurz: 'Ein Fremder im Chat. Wem zeige ich was?' },
  { id: 'streit', name: 'Streit klären', bild: '🤝', kurz: 'Zwei Seiten hören. Eine Lösung finden.' },
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

// ---------- Winter: Tun fehlt (suchen, finden, zuhören – und wer es erfahren soll) ----------
const suche = {
  id: 'suche', titel: 'Tun fehlt', bild: '🔦', von: 'jolie', ort: 'brunnen', ab: 1,
  kurz: 'Tun ist seit gestern weg. Sein Handy ist aus.',
  wie: ['Such vier Spuren von Tun, bevor es dunkel wird.', 'Die Spuren führen dich zu ihm.', 'Dann zählt, ob du zuhören kannst.'],
  lohn: 'Tun vergisst das nicht',
  gespraech: ['Zuhören, ohne Tipps zu geben – warum ist das so schwer?', 'Tun will nicht nach Hause. Wem sagst du es?'],
  schritte: [
    { art: 'hin', ort: 'brunnen', text: 'Jolie sucht dich am Brunnen.', cast: ['jolie'],
      szene: (R, M) => [
        ['s', 'jolie', 'Tun war heute nicht da. Gestern auch nicht.'],
        ['s', 'jolie', 'Sein Vater sagt nur: Der kommt schon wieder.'],
        ['w', [
          { t: 'Ich such mit.', art: 'hilfe', e: { bond: { jolie: 1 }, flag: 'suche.mit' }, dann: [['s', 'jolie', 'Ich nehm den Strand. Du das Dorf.']] },
          { t: 'Der taucht schon auf.', art: 'weg', e: { flag: 'suche.gezoegert' }, dann: [['s', 'jolie', 'Und wenn nicht?'], ['d', 'Du gehst trotzdem los.']] },
          { t: 'Wo war er zuletzt?', art: 'ruhig', e: { flag: 'suche.gefragt' }, dann: [['s', 'jolie', 'Am Markt. Mit der Kamera.']] },
        ]],
        ['d', 'Tun filmt alles. Irgendwo liegt etwas von ihm.'],
      ] },
    { art: 'sammeln', text: 'Finde vier Spuren von Tun.', bild: '🎒', name: 'Spuren', faktor: 1.3,
      dinge: [{ ort: 'markt', dx: 4, dz: 3 }, { ort: 'werft', dx: -5, dz: 4 }, { ort: 'steg', dx: -4, dz: 2 }, { ort: 'zuhause', dx: 6, dz: -6 }],
      nach: (R, erg, M) => [
        ['t', erg.geschafft ? 'Mütze. Akku. Stativ. Ein Zettel: Leuchtturm.' : 'Es wird dunkel. Aber ein Zettel sagt: Leuchtturm.'],
        ['e', { flag: erg.geschafft ? 'suche.spuren' : 'suche.spaet' }],
      ] },
    { art: 'hin', ort: 'leuchtturm', text: 'Geh zum Leuchtturm. Leise.', uhr: 18.4, cast: ['tun'],
      szene: (R, M) => [
        ['t', 'Tun sitzt an der Mauer. Die Kamera ist aus.'],
        ['s', 'tun', 'Sag nichts. Bitte. Alle sagen immer was.'],
        ['zuck', { titel: 'Zuhören. Nicht dazwischenreden.' }, (z) => {
          M.sterne.push(sterneTreffer(z.richtig, z.von));
          return z.richtig / z.von >= 0.7
            ? [['s', 'tun', 'Papa hat meine Clips gelöscht. Alle. Drei Jahre.'], ['s', 'tun', 'Er sagt, ich soll endlich still sein.'], ['e', { bond: { tun: 2 }, flag: 'suche.zugehoert' }]]
            : [['t', 'Du redest dazwischen. Tun zieht die Knie an.'], ['s', 'tun', 'Siehst du. Genau wie Papa.'], ['e', { flag: 'suche.geredet', druck: 5 }]];
        }],
        ['s', 'tun', 'Ich geh heute nicht nach Hause.'],
        ['w', [
          { t: 'Ich hol Ilda.', art: 'hilfe', e: { flag: 'suche.ilda', bond: { ilda: 1 } }, dann: [['s', 'tun', 'Ilda? Okay. Die schreit wenigstens nicht.'], ['t', 'Ilda kommt mit einer Decke. Und Tee.']] },
          { t: 'Schlaf heute bei uns.', art: 'ruhig', e: { flag: 'suche.beiuns', bond: { tun: 1 } }, dann: [['s', 'tun', 'Und bei dir zu Hause? Fragt da keiner?'], ['d', 'Doch. Das musst du gleich erklären.']] },
          { t: 'Ich komm mit zu dir.', art: 'mut', e: { flag: 'suche.vater', druck: 8, bond: { tun: 1 } }, dann: [['s', 'tun', 'Du? Zu meinem Vater? Du spinnst.'], ['t', 'Aber er steht auf.']] },
          { t: 'Dann bleib halt hier.', art: 'weg', e: { flag: 'suche.allein', bond: { tun: -1 } }, dann: [['t', 'Du gehst. Das Licht dreht sich über ihm.']] },
        ]],
      ] },
  ],
};

// ---------- Frühling: Der Hafenlauf (mit jemandem arbeiten, den man nicht mag – und fair bleiben?) ----------
const staffel = {
  id: 'staffel', titel: 'Der Hafenlauf', bild: '🏃', von: 'fraenz', ort: 'werft', ab: 2,
  kurz: 'Staffel zu zweit. Dein Partner ist ausgerechnet Luc.',
  wie: ['Übt die Übergabe vom Stab.', 'Dann läufst du die letzte Strecke zum Strand.', 'Luc kennt eine Abkürzung. Du entscheidest.'],
  lohn: 'Medaille und 20 Euro',
  gespraech: ['Gewinnen mit Abkürzung – zählt das?', 'Mit jemandem arbeiten, den man nicht mag: Wie geht das?'],
  schritte: [
    { art: 'hin', ort: 'werft', text: 'Fränz lost die Paare aus.', cast: ['fraenz', 'luc'],
      szene: (R, M) => [
        ['s', 'fraenz', 'Hafenlauf. Zwei pro Team. Das Los entscheidet.'],
        ['t', 'Er zieht zwei Zettel. Dein Name. Und Luc.'],
        ['s', 'luc', 'Wir zwei? Dann können wir gleich heimgehen.'],
        ['w', [
          { t: 'Wir müssen keine Freunde sein.', art: 'ruhig', e: { flag: 'staffel.sachlich' }, dann: [['s', 'luc', 'Stimmt. Nur schnell.']] },
          { t: 'Ich will ein anderes Los.', art: 'weg', e: { flag: 'staffel.gemault', bond: { fraenz: -1 } }, dann: [['s', 'fraenz', 'Los ist Los. Auch im Betrieb.']] },
          { t: 'Wie läufst du am liebsten?', art: 'mut', e: { flag: 'staffel.gefragt', bond: { luc: 1 } }, dann: [['s', 'luc', 'Hä? … Erste Strecke. Ich starte gut.']] },
        ]],
        ['spiel', { titel: 'Stab übergeben – tippe im richtigen Moment', bild: '🏃' }, (g) => {
          const sitzt = g.treffer >= g.von - 1;
          M.sterne.push(sterneTreffer(g.treffer, g.von));
          return [
            ['s', 'luc', sitzt ? 'Okay. Das sitzt. Hätte ich nicht gedacht.' : 'Du lässt ihn fallen. Jedes Mal.'],
            ['s', 'luc', 'Hör zu. Durch Lucindas Garten spart man eine Minute.'],
            ['s', 'luc', 'Da steht keiner. Merkt kein Mensch.'],
            ['w', [
              { t: 'Okay. Durch den Garten.', art: 'weg', e: { flag: 'staffel.abkuerzung', bond: { luc: 1 } }, dann: [['s', 'luc', 'Na also. Du kannst ja doch was.']] },
              { t: 'Nein. Ich lauf die Strecke.', art: 'nein', e: { flag: 'staffel.fair', druck: 5 }, dann: [['s', 'luc', 'Dann verlieren wir. Wegen dir.']] },
              { t: 'Wir sind auch so schnell.', art: 'mut', e: { flag: 'staffel.fair', bond: { luc: sitzt ? 1 : 0 } }, dann: [['s', 'luc', sitzt ? 'Hm. Die Übergabe war gut. Okay.' : 'Mit der Übergabe? Träum weiter.']] },
            ]],
          ];
        }],
      ] },
    { art: 'lauf', ort: 'strand', text: 'Letzte Strecke. Lauf zum Strand.', faktor: (R) => (hat(R, 'staffel.abkuerzung') ? 1.4 : 1.02), cast: ['fraenz', 'luc', 'tiago'],
      nach: (R, erg, M) => {
        if (hat(R, 'staffel.abkuerzung')) return erg.geschafft ? [
          ['t', 'Erster. Mit Abstand. Die Leute klatschen.'],
          ['s', 'fraenz', 'Sauber gelaufen. Hier, die Medaille.'],
          ['t', 'Tiago wird Zweiter. Er schaut auf deine Schuhe.'],
          ['d', 'Gartenerde. An beiden Sohlen.'],
          ['w', [
            { t: 'Medaille nehmen. Lächeln.', art: 'weg', e: { flag: 'staffel.behalten', geld: 20, ruf: { hafen: 1 } }, dann: [['s', 'luc', 'Siehst du. Merkt keiner.']] },
            { t: 'Wir haben abgekürzt.', art: 'mut', e: { flag: 'staffel.gestanden', bond: { fraenz: 1, luc: -2, tiago: 1 }, druck: -8 }, dann: [['s', 'fraenz', 'Dann gehört sie Tiago. Danke fürs Sagen.'], ['s', 'luc', 'Du bist so ein Verräter.']] },
            { t: 'Tiago die Medaille geben.', art: 'ruhig', e: { flag: 'staffel.abgegeben', bond: { tiago: 1 } }, dann: [['s', 'tiago', 'Warum? … Ach so. Danke.']] },
          ]],
        ] : [
          ['t', 'Trotz Abkürzung zu langsam. Platz drei.'],
          ['s', 'luc', 'Abgekürzt und trotzdem verloren. Peinlich.'],
          ['e', { flag: 'staffel.umsonst', druck: 5 }],
        ];
        return erg.geschafft ? [
          ['t', 'Du holst auf. Meter für Meter. Erster!'],
          ['s', 'fraenz', 'Sauber gelaufen. Hier, die Medaille.'],
          ['s', 'luc', 'Okay. Ohne Garten. Hätte ich nicht gedacht.'],
          ['e', { flag: 'staffel.sieg', geld: 20, ruf: { hafen: 1 }, bond: { luc: 1 }, druck: -10 }],
        ] : [
          ['t', 'Zweiter. Tiago ist eine Sekunde schneller.'],
          ['s', 'luc', hat(R, 'staffel.gefragt') ? 'Knapp. Nächstes Jahr holen wir sie.' : 'Hab ich doch gesagt.'],
          ['e', { flag: 'staffel.zweiter', druck: hat(R, 'staffel.gefragt') ? -5 : 5 }],
        ];
      } },
  ],
};

// ---------- Sommer: Lucindas Garten (Verantwortung tragen, Hilfe holen, ehrlich bleiben) ----------
const hitze = {
  id: 'hitze', titel: 'Lucindas Garten', bild: '🍅', von: 'lucinda', ort: 'garten', ab: 3,
  kurz: 'Lucinda muss aufs Festland. Der Garten verdurstet.',
  wie: ['Merk dir, welche Beete Wasser brauchen.', 'Hol sechs Kannen Wasser, bevor die Sonne brennt.', 'Am Abend steht jemand am Zaun.'],
  lohn: 'bis 25 Euro und Lucindas Vertrauen',
  gespraech: ['Allein schaffen oder um Hilfe bitten – was fällt dir leichter?', 'Mika nimmt Tomaten. Was sagst du Lucinda?'],
  schritte: [
    { art: 'hin', ort: 'garten', text: 'Lucinda wartet im Garten.', cast: ['lucinda'],
      szene: (R, M) => [
        ['s', 'lucinda', 'Ich muss drei Tage aufs Festland. Zum Arzt.'],
        ['s', 'lucinda', 'Bei der Hitze stirbt mir alles. Hilfst du?'],
        ['merk', { titel: 'Merk dir, was Wasser braucht', dinge: ['🍅', '🥒', '🍓', '🌻', '🧅', '🌿'] }, (m) => {
          M.sterne.push(sterneTreffer(m.richtig, m.von));
          return [['s', 'lucinda', m.richtig >= m.von ? 'Genau so. Du hörst zu.' : 'Fast. Ich schreibe es dir auf.']];
        }],
        ['d', 'Sechs Kannen. Jeden Morgen. Vom Brunnen bis hierher.'],
        ['w', [
          { t: 'Das schaffe ich allein.', art: 'ruhig', e: { flag: 'hitze.allein' }, dann: [['s', 'lucinda', 'Stolz bist du. Wie ich früher.']] },
          { t: 'Ich frag Jolie und Pit.', art: 'hilfe', e: { flag: 'hitze.zusammen', bond: { jolie: 1, pit: 1 } }, dann: [['s', 'lucinda', 'Gut. Viele Hände, kurzer Morgen.']] },
          { t: 'Das ist mir zu viel.', art: 'mut', e: { flag: 'hitze.ehrlich', bond: { lucinda: 1 } }, dann: [['s', 'lucinda', 'Danke fürs Sagen. Dann gieß nur das Nötigste.'], ['d', 'Das Nötigste. Das geht.']] },
        ]],
      ] },
    { art: 'sammeln', text: 'Hol Wasser für die Beete.', bild: '💧', name: 'Kannen',
      faktor: (R) => (hat(R, 'hitze.zusammen') ? 1.5 : hat(R, 'hitze.ehrlich') ? 1.45 : 1.12),
      dinge: [{ ort: 'brunnen', dx: 2, dz: 2 }, { ort: 'brunnen', dx: -3, dz: 1 }, { ort: 'markt', dx: 3, dz: -2 }, { ort: 'garten', dx: 6, dz: 4 }, { ort: 'garten', dx: -5, dz: 5 }, { ort: 'garten', dx: 4, dz: -6 }],
      nach: (R, erg, M) => [
        ['t', erg.geschafft ? 'Die Erde ist dunkel und nass. Geschafft.' : 'Die Sonne war schneller. Zwei Beete hängen.'],
        ['e', { flag: erg.geschafft ? 'hitze.gegossen' : 'hitze.trocken' }],
        ...(hat(R, 'hitze.zusammen') ? [['s', 'pit', 'Gießen ist wie Skaten. Nur nasser.']] : []),
      ] },
    { art: 'hin', ort: 'garten', text: 'Abends: Schau nach dem Garten.', uhr: 20.3, cast: ['mika'],
      szene: (R, M) => [
        ['t', 'Jemand steht am Zaun. Eine Tüte in der Hand.'],
        ['s', 'mika', 'Die Alte ist weg. Die merkt nichts.'],
        ['s', 'mika', 'Nimm dir auch welche. Sind reif.'],
        ['w', [
          { t: 'Leg sie zurück.', art: 'nein', e: { druck: 8 }, dann: [
            ['s', 'mika', 'Sonst was? Holst du die Oma?'],
            ['zuck', { titel: 'Stehen bleiben. Nicht zucken.' }, (z) => {
              M.sterne.push(sterneTreffer(z.richtig, z.von));
              return z.richtig / z.von >= 0.7
                ? [['s', 'mika', 'Schon gut. Sind eh nur Tomaten.'], ['t', 'Mika kippt die Tüte ins Beet zurück.'], ['e', { flag: 'hitze.gestoppt', ruf: { hafen: 1 } }]]
                : [['t', 'Du weichst aus. Mika geht mit der Tüte.'], ['e', { flag: 'hitze.geklaut' }]];
            }],
          ] },
          { t: 'Zwei. Mehr nicht.', art: 'ruhig', e: { flag: 'hitze.geteilt', bond: { mika: 1 } }, dann: [['s', 'mika', 'Zwei? Du bist komisch. Okay.'], ['d', 'Zwei Tomaten fehlen. Du weißt es.']] },
          { t: 'Mitnehmen. Merkt keiner.', art: 'weg', e: { flag: 'hitze.mitgenommen', bond: { mika: 1 }, ruf: { krater: 1 } }, dann: [['t', 'Sie schmecken süß. Und ein bisschen falsch.']] },
          { t: 'Hast du Hunger?', art: 'mut', e: { flag: 'hitze.hunger', bond: { mika: 2 } }, dann: [['t', 'Mika sagt lange nichts.'], ['s', 'mika', 'Zu Hause ist der Kühlschrank leer. Schon länger.'], ['d', 'Die Tüte bleibt bei Mika. Du nickst nur.']] },
        ]],
      ] },
    { art: 'hin', ort: 'garten', text: 'Lucinda ist zurück. Geh hin.', uhr: 9.4, cast: ['lucinda'],
      szene: (R, M) => {
        const fehlt = hat(R, 'hitze.geklaut') || hat(R, 'hitze.geteilt') || hat(R, 'hitze.mitgenommen') || hat(R, 'hitze.hunger');
        const gut = hat(R, 'hitze.gegossen');
        return [
          ['s', 'lucinda', gut ? 'Alles lebt. Sogar die Gurken.' : 'Zwei Beete sind hin. Der Rest lebt.'],
          ...(fehlt ? [
            ['s', 'lucinda', 'Aber da fehlen Tomaten. Ich zähle sie.'],
            ['w', [
              { t: 'Mika war da.', art: 'ruhig', e: { flag: 'hitze.gesagt', bond: { mika: -1, lucinda: 1 } }, dann: [['s', 'lucinda', 'Mika. Hm. Dort ist der Tisch oft leer.']] },
              { t: 'Die Hitze, glaub ich.', art: 'weg', e: { flag: 'hitze.gelogen', druck: 6 }, dann: [['s', 'lucinda', 'Hitze frisst keine Tomaten, Kind.']] },
              { t: 'Ich hab welche hergegeben.', art: 'mut', e: { flag: 'hitze.zugegeben', bond: { lucinda: 1 }, druck: -5 }, dann: [['s', 'lucinda', 'Ehrlich bist du. Nächstes Mal fragst du mich.']] },
            ]],
          ] : []),
          ['s', 'lucinda', gut ? 'Hier. Fünfundzwanzig. Und ein Glas Marmelade.' : 'Hier. Fünfzehn. Du hast es versucht.'],
          ['e', { geld: gut ? 25 : 15, bond: { lucinda: gut ? 2 : 1 }, flag: 'hitze.fertig' }],
        ];
      } },
  ],
};

// ---------- Thema „Sicher im Netz“: Leo schreibt (ein Fremder im Chat – Geschenk, Geheimnis, Foto) ----------
const chat = {
  id: 'chat', titel: 'Leo schreibt', bild: '💬', von: 'jolie', ort: 'brunnen', ab: 0, thema: 'netz',
  kurz: 'Jolie hat einen neuen Freund. Nur im Chat.',
  wie: ['Lies, was Leo schreibt. Merk dir, was er will.', 'Frag drei Leute, ob jemand Leo kennt.', 'Dann schreibt Leo wieder. Was tut ihr?'],
  lohn: 'Jolie weiß, wem sie trauen kann',
  gespraech: ['Geschenk, Geheimnis, Foto – woran merkt man, dass etwas nicht stimmt?', 'Blockieren, melden, löschen: Was hilft? Was hilft nicht?', 'Wem würdest du so einen Chat zeigen?'],
  schritte: [
    { art: 'hin', ort: 'brunnen', text: 'Jolie will dir etwas zeigen.', cast: ['jolie'],
      szene: (R, M) => [
        ['s', 'jolie', 'Ich hab jemanden kennengelernt. Leo. Er ist siebzehn.'],
        ['s', 'jolie', 'Er hat mir Guthaben fürs Spiel geschenkt.'],
        ['merk', { titel: 'Merk dir, was Leo schreibt', dinge: ['🎁', '🤫', '📸', '❤️', '🏠', '⏰'] }, (m) => {
          M.sterne.push(sterneTreffer(m.richtig, m.von));
          return [['d', m.richtig >= m.von ? 'Geschenk. Geheimnis. Foto. In dieser Reihenfolge.' : 'Viele Herzen. Und irgendwas mit Foto.']];
        }],
        ['s', 'jolie', 'Er will ein Foto. Und ich soll nichts sagen.'],
        ['w', [
          { t: 'Schick halt eins.', art: 'weg', e: { flag: 'chat.foto', bond: { jolie: 1 } }, dann: [['t', 'Jolie tippt. Senden. Zwei blaue Haken.']] },
          { t: 'Zeig mal sein Profil.', art: 'ruhig', e: { flag: 'chat.profil' }, dann: [['d', 'Ein Bild. Kein Nachname. Null gemeinsame Freunde.']] },
          { t: 'Warum soll es geheim sein?', art: 'mut', e: { flag: 'chat.gefragt', bond: { jolie: -1 } }, dann: [['s', 'jolie', 'Du gönnst mir das nur nicht.'], ['d', 'Sie steckt das Handy weg. Aber sie überlegt.']] },
        ]],
        ['d', 'Kennt hier irgendwer einen Leo?'],
      ] },
    { art: 'sammeln', text: 'Frag drei Leute nach Leo.', bild: '🔎', name: 'Nachfragen', faktor: 1.35,
      dinge: [{ ort: 'kiosk', dx: 2, dz: 2 }, { ort: 'markt', dx: -3, dz: 2 }, { ort: 'werft', dx: 3, dz: -3 }],
      nach: (R, erg, M) => [
        ['t', erg.geschafft ? 'Keiner kennt Leo. Nicht mal Fränz.' : 'Zwei kennen ihn nicht. Den Dritten erreichst du nicht.'],
        ['d', 'Sein Profilbild gibt es im Netz. Hundertmal.'],
        ['e', { flag: erg.geschafft ? 'chat.geprueft' : 'chat.halb' }],
      ] },
    { art: 'hin', ort: 'brunnen', text: 'Zurück zu Jolie. Ihr Handy piept.', uhr: 19.2, cast: ['jolie', 'ilda'],
      szene: (R, M) => [
        ['t', hat(R, 'chat.foto') ? 'Leo schreibt: Noch eins. Sonst zeig ich das erste.' : 'Leo schreibt: Wo wohnst du? Ich komm vorbei.'],
        ['s', 'jolie', 'Was mach ich jetzt? Er schreibt und schreibt.'],
        ['w', [
          { t: 'Nicht antworten. Bildschirmfoto. Ilda.', art: 'hilfe', e: { druck: 5 }, dann: [
            ['t', 'Das Handy piept. Und piept. Und piept.'],
            ['zuck', { titel: 'Nicht antworten. Auch wenn es piept.' }, (z) => {
              M.sterne.push(sterneTreffer(z.richtig, z.von));
              return z.richtig / z.von >= 0.7
                ? [['t', 'Ihr antwortet nicht. Ilda liest alles. Ruhig.'], ['s', 'ilda', 'Gut, dass ihr nichts gelöscht habt.'], ['e', { flag: 'chat.gemeldet', bond: { jolie: 2, ilda: 1 }, druck: -10 }]]
                : [['t', 'Jolie tippt doch: Lass mich. Leo antwortet sofort.'], ['s', 'ilda', 'Ab jetzt schreibe nur noch ich. Gebt her.'], ['e', { flag: 'chat.geantwortet', bond: { jolie: 1, ilda: 1 } }]];
            }],
          ] },
          { t: 'Schreib: Lass mich in Ruhe.', art: 'hart', e: { flag: 'chat.gestritten', druck: 8 }, dann: [['t', 'Leo schreibt zurück. Netter als vorher.'], ['d', 'Er hört nicht auf. Er ändert nur den Ton.']] },
          { t: 'Alles löschen. Fertig.', art: 'weg', e: { flag: 'chat.geloescht' }, dann: [['t', 'Chat weg. Bilder weg. Beweise auch.'], ['s', 'jolie', 'Und wenn er einen neuen Namen nimmt?']] },
        ]],
      ] },
  ],
};

// ---------- Thema „Streit klären“: Das kaputte Board (zwei Seiten hören, nicht richten, eine Lösung finden) ----------
const board = {
  id: 'board', titel: 'Das kaputte Board', bild: '🛹', von: 'pit', ort: 'brunnen', ab: 0, thema: 'streit',
  kurz: 'Pits Board ist gebrochen. Er gibt Tiago die Schuld.',
  wie: ['Hör beide Seiten an. Merk dir, was sie sagen.', 'Such die Teile vom Board.', 'Dann sitzen beide vor dir. Du leitest das Gespräch.'],
  lohn: 'Zwei, die wieder reden',
  gespraech: ['Zwei erzählen dieselbe Sache verschieden. Wer hat recht?', 'Was braucht ein Streit, damit er aufhört?'],
  schritte: [
    { art: 'hin', ort: 'brunnen', text: 'Pit ist sauer. Hör ihn an.', cast: ['pit'],
      szene: (R, M) => [
        ['s', 'pit', 'Tiago hat mein Board genommen. Ohne zu fragen.'],
        ['s', 'pit', 'Jetzt ist es durch. Mitten durch.'],
        ['w', [
          { t: 'So ein Idiot.', art: 'hart', e: { flag: 'board.partei', bond: { pit: 1 } }, dann: [['s', 'pit', 'Sag ich doch. Der zahlt das.']] },
          { t: 'Was sagt Tiago dazu?', art: 'ruhig', e: { flag: 'board.beide' }, dann: [['s', 'pit', 'Keine Ahnung. Ich red nicht mit dem.']] },
          { t: 'Wo ist es passiert?', art: 'ruhig', e: { flag: 'board.wo' }, dann: [['s', 'pit', 'An der Rampe bei der Werft.']] },
        ]],
      ] },
    { art: 'hin', ort: 'strand', text: 'Tiago ist am Strand. Frag ihn.', cast: ['tiago'],
      szene: (R, M) => [
        ['s', 'tiago', 'Pit hat gesagt: Nimm es ruhig. Letzte Woche.'],
        ['s', 'tiago', 'Und die Achse war schon locker. Ich schwör.'],
        ['merk', { titel: 'Merk dir, was beide gesagt haben', dinge: ['🛹', '🙋', '📅', '🔩', '🤝', '💶'] }, (m) => {
          const klar = m.richtig >= m.von;
          M.sterne.push(sterneTreffer(m.richtig, m.von));
          return [['d', klar ? 'Gefragt? Letzte Woche. Achse locker? Mal sehen.' : 'Zwei Geschichten. Du bringst sie durcheinander.'], ['e', { flag: klar ? 'board.gemerkt' : 'board.wirr' }]];
        }],
      ] },
    { art: 'sammeln', text: 'Such die Teile vom Board.', bild: '🔩', name: 'Teile', faktor: 1.3,
      dinge: [{ ort: 'werft', dx: 5, dz: 3 }, { ort: 'werft', dx: -4, dz: -4 }, { ort: 'steg', dx: 3, dz: 3 }],
      nach: (R, erg, M) => [
        ['t', erg.geschafft ? 'Zwei Hälften. Und eine Achse. Die Schraube fehlt.' : 'Eine Hälfte. Die Achse findest du nicht.'],
        ['e', { flag: erg.geschafft ? 'board.achse' : 'board.ohne' }],
      ] },
    { art: 'hin', ort: 'brunnen', text: 'Bring beide an den Brunnen.', uhr: 17.5, cast: ['pit', 'tiago'],
      szene: (R, M) => {
        const beweis = hat(R, 'board.achse') ? [['d', 'Du legst die Achse hin. Die Schraube fehlt.'], ['s', 'pit', 'Die war locker. Stimmt. Schon länger.']] : [];
        const loesung = ['w', [
          { t: 'Teilt euch ein neues Deck.', art: 'ruhig', e: { flag: 'board.geteilt', bond: { pit: 1, tiago: 1 }, ruf: { hafen: 1 } }, dann: [['s', 'tiago', 'Halbe-halbe. Okay.'], ['s', 'pit', 'Und du fragst nächstes Mal.']] },
          { t: 'Repariert es zusammen.', art: 'hilfe', e: { flag: 'board.werft', bond: { pit: 1, tiago: 1 } }, dann: [['s', 'pit', 'Marc hat Leim. Und Schrauben.'], ['t', 'Zu zweit tragen sie es zur Werft.']] },
          { t: 'Was braucht ihr jetzt?', art: 'mut', e: { flag: 'board.gefragt', bond: { pit: 1, tiago: 1 } }, dann: [['s', 'tiago', 'Dass er aufhört, mich Dieb zu nennen.'], ['s', 'pit', 'Und mein Board. Irgendwie.']] },
        ]];
        return [
          ['t', 'Pit links. Tiago rechts. Keiner schaut hin.'],
          ['w', [
            { t: 'Jeder erzählt. Keiner unterbricht.', art: 'ruhig', e: { flag: 'board.regel' }, dann: [
              ['zuck', { titel: 'Ausreden lassen. Nicht dazwischengehen.' }, (z) => {
                M.sterne.push(sterneTreffer(z.richtig, z.von));
                return z.richtig / z.von >= 0.7
                  ? [['s', 'pit', 'Okay. Ich hab mal gesagt: Nimm es ruhig.'], ['s', 'tiago', 'Und ich hätte heute fragen müssen.'], ['e', { flag: 'board.gehoert', bond: { pit: 1, tiago: 1 }, druck: -8 }], ...beweis, loesung]
                  : [['t', 'Du gehst dazwischen. Jetzt schreien drei.'], ['e', { flag: 'board.laut', druck: 8 }], ...beweis, loesung];
              }],
            ] },
            { t: 'Tiago zahlt. Fertig.', art: 'hart', e: { flag: 'board.urteil', bond: { tiago: -2, pit: 1 } }, dann: [['s', 'tiago', 'Du warst nicht mal dabei.']] },
            { t: 'Klärt das selber.', art: 'weg', e: { flag: 'board.raus' }, dann: [['t', 'Du gehst. Hinter dir wird es laut.']] },
          ]],
        ];
      } },
  ],
};

export const MISSIONEN = [lieferung, nachtwache, sturm, mutprobe, platzen, suche, staffel, hitze, chat, board];

// Was am Morgen danach davon übrig ist (hängt an FOLGEN in welt.js)
export const MISSION_FOLGEN = [
  { id: 'liefer.abgelegt', wenn: (R) => hat(R, 'liefer.abgelegt'), text: ['Das Paket am Strand ist weg.', 'Fränz zahlt es aus seiner Kasse.'], e: () => ({ bond: { fraenz: -1 }, druck: 5 }) },
  { id: 'liefer.geleugnet', wenn: (R) => hat(R, 'liefer.geleugnet'), text: ['Der Kunde vom Strand ruft bei Fränz an.', 'Fränz schaut dich lange an.'], e: () => ({ bond: { fraenz: -2 }, druck: 10 }) },
  { id: 'wache.geschmiert', wenn: (R) => hat(R, 'wache.geschmiert') && !hat(R, 'wache.gebeichtet'), text: ['Mika grüßt dich jetzt. Vor allen.'], e: () => ({ ruf: { hafen: -1 } }) },
  { id: 'wache.gestoppt', wenn: (R) => hat(R, 'wache.gestoppt'), text: ['Am Hafen heißt es: Du bist stehen geblieben.'], e: () => ({ ruf: { hafen: 1 }, druck: -5 }) },
  { id: 'sturm.ruhig', wenn: (R) => hat(R, 'sturm.ruhig') && hat(R, 'sturm.fertig'), text: ['Tiago winkt dir vom Markt aus zu.'], e: () => ({ bond: { tiago: 1 }, chat: { von: 'tiago', text: 'Danke wegen gestern. Echt.' } }) },
  { id: 'mut.raus', wenn: (R) => hat(R, 'mut.raus'), text: ['Die Crew ignoriert dich. Yara nicht.'], e: () => ({ bond: { yara: 1 } }) },
  { id: 'suche.allein', wenn: (R) => hat(R, 'suche.allein'), text: ['Ilda hat Tun am Morgen gefunden. Durchgefroren.', 'Sie fragt, wer davon wusste.'], e: () => ({ bond: { ilda: -1 }, druck: 10 }) },
  { id: 'suche.ilda', wenn: (R) => hat(R, 'suche.ilda'), text: ['Ilda hat mit Tuns Vater geredet. Lange.'], e: () => ({ chat: { von: 'tun', text: 'Papa hat mir die Kamera zurückgegeben.' } }) },
  { id: 'suche.vater', wenn: (R) => hat(R, 'suche.vater'), text: ['Tuns Vater hat zugehört. Zehn Minuten immerhin.'], e: () => ({ bond: { tun: 1 }, ruf: { hafen: 1 } }) },
  { id: 'suche.beiuns', wenn: (R) => hat(R, 'suche.beiuns'), text: ['Tun schläft noch. Seine Kamera lädt bei dir.'], e: () => ({ bond: { tun: 1 } }) },
  { id: 'staffel.behalten', wenn: (R) => hat(R, 'staffel.behalten'), text: ['Lucinda findet Fußspuren im Beet.', 'Sie fragt am Markt, wer gelaufen ist.'], e: () => ({ druck: 8 }) },
  { id: 'staffel.gestanden', wenn: (R) => hat(R, 'staffel.gestanden'), text: ['Tiago trägt die Medaille. Er nickt dir zu.'], e: () => ({ ruf: { hafen: 1 } }) },
  { id: 'staffel.sieg', wenn: (R) => hat(R, 'staffel.sieg'), text: ['Deine Medaille hängt in der Werft. Fränz wollte das.'], e: () => ({ bond: { fraenz: 1 } }) },
  { id: 'hitze.gelogen', wenn: (R) => hat(R, 'hitze.gelogen'), text: ['Lucinda zählt die Tomaten jetzt jeden Abend.'], e: () => ({ bond: { lucinda: -1 } }) },
  { id: 'hitze.hunger', wenn: (R) => hat(R, 'hitze.hunger') && (hat(R, 'hitze.gesagt') || hat(R, 'hitze.zugegeben')), text: ['Vor Mikas Tür steht ein Korb. Ohne Zettel.'], e: () => ({ bond: { mika: 1 } }) },
  { id: 'hitze.gestoppt', wenn: (R) => hat(R, 'hitze.gestoppt'), text: ['Mika grüßt nicht. Aber die Tomaten hängen noch.'], e: () => ({ druck: -3 }) },
  { id: 'chat.geloescht', wenn: (R) => hat(R, 'chat.geloescht'), text: ['Ein neuer Name schreibt Jolie. Gleiches Bild.'], e: () => ({ druck: 5, chat: { von: 'jolie', text: 'Er ist wieder da. Anderer Name.' } }) },
  { id: 'chat.gemeldet', wenn: (R) => hat(R, 'chat.gemeldet') || hat(R, 'chat.geantwortet'), text: ['Ilda hat die Bilder zur Polizei gebracht.', 'Leos Profil ist gesperrt.'], e: () => ({ ruf: { hafen: 1 } }) },
  { id: 'chat.foto', wenn: (R) => hat(R, 'chat.foto') && !hat(R, 'chat.gemeldet') && !hat(R, 'chat.geantwortet'), text: ['Jolie kommt nicht zum Brunnen. Zwei Tage schon.'], e: () => ({ bond: { jolie: -1 }, druck: 8 }) },
  { id: 'board.urteil', wenn: (R) => hat(R, 'board.urteil'), text: ['Tiago hat bezahlt. Er grüßt dich nicht mehr.'], e: () => ({ druck: 5 }) },
  { id: 'board.werft', wenn: (R) => hat(R, 'board.werft'), text: ['An der Werft trocknet ein Board. Zwei Namen drauf.'], e: () => ({ ruf: { hafen: 1 } }) },
  { id: 'board.raus', wenn: (R) => hat(R, 'board.raus'), text: ['Pit und Tiago gehen sich aus dem Weg.'], e: () => ({ bond: { pit: -1 } }) },
  { id: 'platz.geschubst', wenn: (R) => hat(R, 'platz.geschubst'), text: ['Fränz hat von der Werft gehört.', 'Er sagt nichts. Das ist schlimmer.'], e: () => ({ druck: 8 }) },
];

// „Dein Weg“ auf der Karte nach dem Auftrag: was du getan hast, in einem Satz – ohne Urteil. Höchstens drei Zeilen
// (die letzten zählen). Hilft beim Gespräch danach: Jede und jeder hat einen anderen Weg auf der Karte stehen.
export const MISSION_WEG = {
  lieferung: [['liefer.tee', 'Du hast Tee getrunken. Fünf Minuten.'], ['liefer.abgelegt', 'Du hast das Paket vor die Tür gelegt.'], ['liefer.zurueck', 'Du hast das Paket wieder mitgenommen.'], ['liefer.geklaut', 'Du hast das Paket eingesteckt.'], ['liefer.geleugnet', 'Du hast gesagt: abgegeben.']],
  nachtwache: [['wache.geschmiert', 'Du hast das Geld genommen.'], ['wache.gestoppt', 'Du bist stehen geblieben.'], ['wache.gezuckt', 'Du bist zurückgewichen.'], ['wache.geholt', 'Du hast Ilda rechtzeitig geholt.'], ['wache.verpasst', 'Du bist gerannt. Der Steg war leer.'], ['wache.gesagt', 'Du hast Ilda gesagt, wer es war.'], ['wache.geschwiegen', 'Du hast gesagt: nichts gesehen.'], ['wache.gebeichtet', 'Du hast das Geld zugegeben.']],
  sturm: [['sturm.ruhig', 'Du hast mit Tiago geatmet.'], ['sturm.gezerrt', 'Du hast Tiago hochgezogen.'], ['sturm.allein', 'Du bist Hilfe holen gegangen.'], ['sturm.geheim', 'Du behältst es für dich.'], ['sturm.normal', 'Du hast gesagt: Da ist nichts peinlich.']],
  mutprobe: [['mut.geschafft', 'Du hast es gemacht. Es ging gut.'], ['mut.gestuerzt', 'Du hast es gemacht. Es ging schief.'], ['mut.raus', 'Du bist gegangen.'], ['mut.klar', 'Du hast Nein gesagt. Ohne Grund.'], ['mut.grund', 'Du hast Nein gesagt. Mit Grund.'], ['mut.anders', 'Du hast etwas anderes vorgeschlagen.']],
  platzen: [['platz.gesagt', 'Du bist zu Marc gegangen.'], ['platz.ruhig', 'Du bist ruhig geblieben.'], ['platz.gebruellt', 'Du hast gebrüllt.'], ['platz.getreten', 'Du hast die Kiste getreten.'], ['platz.geschubst', 'Du hast Luc geschubst.'], ['platz.stopp', 'Du hast gestoppt und geatmet.']],
  suche: [['suche.zugehoert', 'Du hast zugehört.'], ['suche.geredet', 'Du hast dazwischengeredet.'], ['suche.ilda', 'Du hast Ilda geholt.'], ['suche.beiuns', 'Tun schläft heute bei dir.'], ['suche.vater', 'Du gehst mit zu Tuns Vater.'], ['suche.allein', 'Du hast Tun am Leuchtturm gelassen.']],
  staffel: [['staffel.gefragt', 'Du hast Luc gefragt, wie er läuft.'], ['staffel.gemault', 'Du wolltest ein anderes Los.'], ['staffel.abkuerzung', 'Du bist durch den Garten gelaufen.'], ['staffel.fair', 'Du bist die ganze Strecke gelaufen.'], ['staffel.behalten', 'Du hast die Medaille behalten.'], ['staffel.gestanden', 'Du hast die Abkürzung zugegeben.'], ['staffel.abgegeben', 'Du hast Tiago die Medaille gegeben.']],
  chat: [['chat.foto', 'Du hast gesagt: Schick halt eins.'], ['chat.profil', 'Du hast dir das Profil angesehen.'], ['chat.gefragt', 'Du hast gefragt, warum es geheim ist.'], ['chat.gemeldet', 'Ihr habt nicht geantwortet und Ilda geholt.'], ['chat.geantwortet', 'Ihr habt Ilda geholt. Jolie hat geantwortet.'], ['chat.gestritten', 'Ihr habt Leo zurückgeschrieben.'], ['chat.geloescht', 'Ihr habt alles gelöscht.']],
  board: [['board.partei', 'Du hast dich auf Pits Seite gestellt.'], ['board.beide', 'Du hast nach Tiagos Seite gefragt.'], ['board.gehoert', 'Beide haben ausgeredet.'], ['board.laut', 'Du bist dazwischengegangen.'], ['board.urteil', 'Du hast entschieden: Tiago zahlt.'], ['board.raus', 'Du hast sie allein gelassen.'], ['board.geteilt', 'Sie teilen sich ein neues Deck.'], ['board.werft', 'Sie reparieren das Board zusammen.'], ['board.gefragt', 'Du hast gefragt, was sie brauchen.']],
  hitze: [['hitze.allein', 'Du hast es allein gemacht.'], ['hitze.zusammen', 'Du hast Jolie und Pit gefragt.'], ['hitze.ehrlich', 'Du hast gesagt: Das ist zu viel.'], ['hitze.gestoppt', 'Mika hat die Tomaten zurückgelegt.'], ['hitze.geklaut', 'Mika ist mit den Tomaten gegangen.'], ['hitze.geteilt', 'Du hast Mika zwei Tomaten gelassen.'], ['hitze.mitgenommen', 'Du hast selbst Tomaten genommen.'], ['hitze.hunger', 'Du hast Mika nach Hunger gefragt.'], ['hitze.gesagt', 'Du hast Lucinda von Mika erzählt.'], ['hitze.gelogen', 'Du hast gesagt: die Hitze.'], ['hitze.zugegeben', 'Du hast es Lucinda gesagt.']],
};
export const wegVon = (R, id) => (MISSION_WEG[id] || []).filter(([f]) => R.flags[f]).map(([, t]) => t).slice(-3);

// Einträge für die Akte (hängen an AKTE in akte.js)
export const MISSION_AKTE = {
  paket: { amt: 'Unterschlägt eine Sendung aus einer Lieferung.', echt: (R) => (R.flags['gestanden.paket'] ? 'Niemand war da. Du hast es geöffnet – und zurückgebracht.' : 'Niemand war da. Das Paket war offen.') },
  werftstreit: { amt: 'Schubst einen Jugendlichen in der Werft. Arbeit abgebrochen.', echt: 'Er hat deinen Stapel umgeworfen. Zweimal.' },
};
