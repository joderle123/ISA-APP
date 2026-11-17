// Annexe Junglinster – Deutsch-Training, Modul 1–9 der Voie de préparation (Auftrag 17.11.: Module aus öffentlichen Quellen).
// Themen und Grammatik-Schwerpunkte je Modul nach „DEUTSCH – Kompetenzorientierte Bildungsstandards für den
// Modularunterricht“ (MENFP, régime préparatoire, vorläufige Fassung 2009, öffentlich auf men.public.lu). Alle Sätze und
// Aufgaben sind selbst geschrieben. Jedes Blatt zieht 8 Aufgaben aus einem größeren Vorrat – jedes Mal etwas anders.
// Formate wie mathe.js: { t: 'Satz mit ___', a: ['Lösung'] } oder { t: 'Satz mit ◻', wahl: [...], a: 'Lösung' }, optional tipp.

function zufall(seed) { let s = (seed >>> 0) || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
const ziehe = (r, l, n = 8) => { const a = l.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); };
const luecke = (l) => l.map(([t, a, tipp]) => ({ t, a: Array.isArray(a) ? a : [a], ...(tipp ? { tipp } : {}) }));
const auswahl = (wahl, l) => l.map(([t, a, tipp]) => ({ t, wahl, a, ...(tipp ? { tipp } : {}) }));

export const DEUTSCH = [
  { nr: 1, titel: 'Ich und meine Welt', ziele: ['Familie, Hobbys, Schule, Freunde', 'Verben im Präsens', 'W-Fragen stellen', 'Verneinen mit „nicht“'], blaetter: [
    { id: 'd1-praesens', titel: 'Verben im Präsens',
      erkl: { idee: 'Die Endung des Verbs passt zur Person.', schritte: ['ich → -e (ich spiele)', 'du → -st (du spielst)', 'er/sie/es → -t (sie spielt)', 'wir/sie → -en (wir spielen)'], beispiel: 'Mila (lösen) den Würfel. → Mila löst den Würfel.' },
      gen: (r) => luecke(ziehe(r, [
        ['Ich ___ gern Basketball. (spielen)', 'spiele'], ['Du ___ jeden Tag Musik. (hören)', 'hörst'], ['Lina ___ einen Comic. (zeichnen)', 'zeichnet', 'sie → -t; bei -n vorher ein e'],
        ['Wir ___ in Junglinster. (wohnen)', 'wohnen'], ['Ihr ___ zu spät. (kommen)', 'kommt'], ['Ben ___ einen Witz. (machen)', 'macht'],
        ['Die Lehrerin ___ die Tür. (öffnen)', 'öffnet', 'bei -n am Stamm: öffn-e-t'], ['Ich ___ meinen Freund. (fragen)', 'frage'], ['Du ___ sehr schnell. (laufen)', 'läufst', 'a wird ä bei du/er'],
        ['Yusuf ___ Judo. (trainieren)', 'trainiert'], ['Wir ___ Pause. (haben)', 'haben'], ['Er ___ müde. (sein)', 'ist'],
      ])) },
    { id: 'd1-wfragen', titel: 'W-Fragen',
      erkl: { idee: 'Das W-Wort fragt nach etwas Bestimmtem.', schritte: ['Wer? → eine Person', 'Wo? → ein Ort', 'Wann? → eine Zeit', 'Was? → eine Sache', 'Wie? → die Art'], beispiel: '___ wohnst du? – In Junglinster. → Wo' },
      gen: (r) => auswahl(['Wer', 'Wo', 'Wann', 'Was', 'Wie'], ziehe(r, [
        ['◻ ist dein Lieblingsessen? – Pizza.', 'Was'], ['◻ wohnst du? – In Junglinster.', 'Wo'], ['◻ beginnt die Schule? – Um acht.', 'Wann'],
        ['◻ ist deine Lehrerin? – Mme Weber.', 'Wer'], ['◻ geht es dir? – Gut, danke.', 'Wie'], ['◻ spielt Bass? – Ayla.', 'Wer'],
        ['◻ ist der Bus? – An der Haltestelle.', 'Wo'], ['◻ machst du am Samstag? – Ich arbeite.', 'Was'], ['◻ kommst du nach Hause? – Um vier.', 'Wann'],
        ['◻ heißt du? – Sam.', 'Wie'], ['◻ liegt die Kantine? – Im Erdgeschoss.', 'Wo'],
      ])) },
  ] },
  { nr: 2, titel: 'Unterwegs in der Stadt', ziele: ['Wege beschreiben', 'Befehlsform (Imperativ)', 'Perfekt mit haben und sein', 'Zusammengesetzte Nomen'], blaetter: [
    { id: 'd2-perfekt', titel: 'Perfekt: Was ist passiert?',
      erkl: { idee: 'Perfekt = haben/sein + Partizip (ge…t / ge…en).', schritte: ['regelmäßig: spielen → gespielt', 'unregelmäßig: gehen → gegangen', 'Bewegung (gehen, fahren, kommen) → mit sein'], beispiel: 'Ich habe Fußball gespielt. Wir sind nach Hause gegangen.' },
      gen: (r) => luecke(ziehe(r, [
        ['Ich habe Hausaufgaben ___. (machen)', 'gemacht'], ['Wir sind mit dem Bus ___. (fahren)', 'gefahren'], ['Noah hat eine Frage ___. (stellen)', 'gestellt'],
        ['Sie ist zu spät ___. (kommen)', 'gekommen'], ['Ich habe ein Buch ___. (lesen)', 'gelesen'], ['Du hast laut ___. (lachen)', 'gelacht'],
        ['Wir haben Pizza ___. (essen)', 'gegessen'], ['Ben ist schnell ___. (laufen)', 'gelaufen'], ['Ich habe dir ___. (schreiben)', 'geschrieben'],
        ['Mila hat den Würfel ___. (lösen)', 'gelöst'], ['Habt ihr Musik ___? (hören)', 'gehört'], ['Ich bin zur Schule ___. (gehen)', 'gegangen'],
      ])) },
    { id: 'd2-imperativ', titel: 'Den Weg erklären',
      erkl: { idee: 'Mit der Befehlsform sagst du, was jemand tun soll.', schritte: ['du-Form ohne „du“ und ohne -st: du gehst → Geh!', 'Sie-Form: Gehen Sie!', 'Wegwörter: links, rechts, geradeaus, bis zur Ampel'], beispiel: 'Geh geradeaus und dann links!' },
      gen: (r) => auswahl(['links', 'rechts', 'geradeaus', 'Geh', 'Nimm'], ziehe(r, [
        ['◻ den Bus Nummer 110!', 'Nimm'], ['◻ bis zur Ampel!', 'Geh'], ['Die Kantine ist nicht links, sondern ◻.', 'rechts'],
        ['Nicht abbiegen: immer ◻!', 'geradeaus'], ['◻ die Treppe nach oben!', 'Nimm'], ['Das Gegenteil von rechts ist ◻.', 'links'],
        ['◻ langsam, der Boden ist nass!', 'Geh'], ['Die Halle ist vorne – also ◻.', 'geradeaus'], ['◻ den Schlüssel mit!', 'Nimm'],
        ['Die Turnhalle ist auf der rechten Seite: ◻.', 'rechts'],
      ])) },
  ] },
  { nr: 3, titel: 'Essen, Kleidung, andere Länder', ziele: ['Artikel der, die, das', 'Adjektive steigern', 'Zeitangaben', 'müssen und dürfen'], blaetter: [
    { id: 'd3-artikel', titel: 'der, die oder das?',
      erkl: { idee: 'Jedes Nomen hat einen Artikel. Lern ihn immer mit!', schritte: ['der Apfel, die Banane, das Brot', 'Wörter auf -ung, -heit, -keit → die', 'Wörter auf -chen → das'], beispiel: 'die Zeitung · das Mädchen · der Tisch' },
      gen: (r) => auswahl(['der', 'die', 'das'], ziehe(r, [
        ['◻ Apfel', 'der'], ['◻ Banane', 'die'], ['◻ Brot', 'das'], ['◻ Jacke', 'die'], ['◻ Schuh', 'der'], ['◻ T-Shirt', 'das'],
        ['◻ Zeitung', 'die', '-ung → die'], ['◻ Mädchen', 'das', '-chen → das'], ['◻ Freundschaft', 'die', '-schaft → die'], ['◻ Käse', 'der'],
        ['◻ Wasser', 'das'], ['◻ Hose', 'die'], ['◻ Pullover', 'der'], ['◻ Brötchen', 'das', '-chen → das'],
      ])) },
    { id: 'd3-steigerung', titel: 'Größer, am größten',
      erkl: { idee: 'Vergleichen in drei Stufen.', schritte: ['schnell – schneller – am schnellsten', 'oft mit Umlaut: groß – größer – am größten', 'Ausnahmen: gut – besser – am besten'], beispiel: 'Ben ist schnell, Yusuf ist schneller, Jo ist am schnellsten.' },
      gen: (r) => luecke(ziehe(r, [
        ['schnell – ___ – am schnellsten', 'schneller'], ['groß – größer – am ___', 'größten'], ['gut – ___ – am besten', 'besser', 'Ausnahme!'],
        ['alt – älter – am ___', 'ältesten'], ['klein – ___ – am kleinsten', 'kleiner'], ['viel – ___ – am meisten', 'mehr', 'Ausnahme!'],
        ['billig – billiger – am ___', 'billigsten'], ['warm – ___ – am wärmsten', 'wärmer'], ['gern – lieber – am ___', 'liebsten', 'Ausnahme!'],
        ['teuer – ___ – am teuersten', 'teurer'], ['jung – jünger – am ___', 'jüngsten'],
      ])) },
  ] },
  { nr: 4, titel: 'Einkaufen und Taschengeld', ziele: ['Begründen mit weil und denn', 'mein, dein, sein …', 'Präteritum (regelmäßig)', 'Direkte Rede'], blaetter: [
    { id: 'd4-weil', titel: 'weil oder denn?',
      erkl: { idee: 'Beide begründen. Der Unterschied ist die Stelle des Verbs.', schritte: ['weil → Verb am Ende: …, weil ich Hunger habe.', 'denn → Verb an Stelle 2: …, denn ich habe Hunger.'], beispiel: 'Ich spare, weil ich ein Handy kaufen will.' },
      gen: (r) => auswahl(['weil', 'denn'], ziehe(r, [
        ['Ich spare, ◻ ich ein Handy kaufen will.', 'weil'], ['Ich spare, ◻ ich will ein Handy kaufen.', 'denn'], ['Ben lacht, ◻ der Witz gut ist.', 'weil'],
        ['Ben lacht, ◻ der Witz ist gut.', 'denn'], ['Ich bleibe zu Hause, ◻ ich krank bin.', 'weil'], ['Ich bleibe zu Hause, ◻ ich bin krank.', 'denn'],
        ['Wir essen draußen, ◻ es in der Kantine laut ist.', 'weil'], ['Sie kauft nichts, ◻ das Geld ist alle.', 'denn'], ['Er ist müde, ◻ er lange gearbeitet hat.', 'weil'],
        ['Ich nehme den Bus, ◻ es regnet.', 'weil'],
      ])) },
    { id: 'd4-possessiv', titel: 'mein, dein, sein, ihr',
      erkl: { idee: 'Wem gehört es?', schritte: ['ich → mein', 'du → dein', 'er → sein · sie → ihr', 'wir → unser'], beispiel: 'Lina hat ein Heft. Das ist ihr Heft.' },
      gen: (r) => auswahl(['mein', 'dein', 'sein', 'ihr', 'unser'], ziehe(r, [
        ['Ich habe ein Fahrrad. Das ist ◻ Fahrrad.', 'mein'], ['Du hast ein Handy. Ist das ◻ Handy?', 'dein'], ['Ben hat einen Ball. Das ist ◻ Ball.', 'sein'],
        ['Ayla hat einen Bass. Das ist ◻ Bass.', 'ihr'], ['Wir haben einen Klassenraum. Das ist ◻ Raum.', 'unser'], ['Kenan hat einen Hammer. ◻ Hammer ist schwer.', 'sein'],
        ['Mila hat einen Würfel. ◻ Würfel ist bunt.', 'ihr'], ['Ich suche ◻ Schlüssel.', 'mein'], ['Hast du ◻ Ticket?', 'dein'],
      ])) },
  ] },
  { nr: 5, titel: 'Unsere Stadt (Wiederholung 1–4)', ziele: ['Präteritum unregelmäßiger Verben', 'Sätze mit dass', 'mir/mich, dir/dich'], blaetter: [
    { id: 'd5-praeteritum', titel: 'Präteritum: ging, kam, sah',
      erkl: { idee: 'Geschichten schreibt man oft im Präteritum.', schritte: ['regelmäßig: spielen → spielte', 'unregelmäßig: gehen → ging, kommen → kam', 'ich und er/sie haben dieselbe Form'], beispiel: 'Gestern ging ich in die Stadt und sah einen Hund.' },
      gen: (r) => luecke(ziehe(r, [
        ['gehen → ich ___', 'ging'], ['kommen → er ___', 'kam'], ['sehen → sie ___', 'sah'], ['fahren → ich ___', 'fuhr'], ['essen → wir ___', 'aßen'],
        ['schreiben → sie ___', 'schrieb'], ['finden → ich ___', 'fand'], ['geben → er ___', 'gab'], ['spielen → ich ___', 'spielte', 'regelmäßig: -te'],
        ['sein → ich ___', 'war'], ['haben → wir ___', 'hatten'], ['laufen → sie ___', 'lief'],
      ])) },
    { id: 'd5-pronomen', titel: 'mir oder mich?',
      erkl: { idee: 'Dativ (wem?) oder Akkusativ (wen?).', schritte: ['geben, helfen, danken → wem? → mir, dir', 'sehen, fragen, rufen → wen? → mich, dich'], beispiel: 'Hilf mir! · Ruf mich an!' },
      gen: (r) => auswahl(['mir', 'mich', 'dir', 'dich'], ziehe(r, [
        ['Kannst du ◻ helfen? (ich)', 'mir'], ['Ruf ◻ morgen an! (ich)', 'mich'], ['Ich gebe ◻ das Buch. (du)', 'dir'], ['Ich sehe ◻ später. (du)', 'dich'],
        ['Das gehört ◻. (ich)', 'mir'], ['Ich frage ◻ etwas. (du)', 'dich'], ['Ich danke ◻. (du)', 'dir'], ['Er besucht ◻ am Samstag. (ich)', 'mich'],
        ['Schreib ◻ eine Nachricht! (ich)', 'mir'], ['Ich höre ◻ gut. (du)', 'dich'],
      ])) },
  ] },
  { nr: 6, titel: 'Arbeit und Beruf', ziele: ['Berufe und Tätigkeiten', 'Passiv mit werden', 'wenn … dann', 'deshalb'], blaetter: [
    { id: 'd6-berufe', titel: 'Wer macht was?',
      erkl: { idee: 'Ein Beruf – typische Tätigkeiten.', schritte: ['Koch/Köchin → kocht', 'Mechatroniker/in → repariert Autos', 'Verkäufer/in → berät Kunden'], beispiel: 'Ein Tischler baut Möbel aus Holz.' },
      gen: (r) => auswahl(['Koch', 'Mechatroniker', 'Tischler', 'Friseurin', 'Verkäuferin', 'Pflegerin'], ziehe(r, [
        ['Ein ◻ repariert Autos.', 'Mechatroniker'], ['Ein ◻ baut Möbel aus Holz.', 'Tischler'], ['Ein ◻ kocht in der Kantine.', 'Koch'], ['Eine ◻ schneidet Haare.', 'Friseurin'],
        ['Eine ◻ berät Kunden im Laden.', 'Verkäuferin'], ['Eine ◻ hilft kranken Menschen.', 'Pflegerin'], ['Der ◻ braucht Säge und Hobel.', 'Tischler'], ['Die ◻ steht an der Kasse.', 'Verkäuferin'],
      ])) },
    { id: 'd6-passiv', titel: 'Passiv: Es wird gemacht',
      erkl: { idee: 'Wichtig ist, was passiert – nicht wer es macht.', schritte: ['werden + Partizip', 'eins → wird · mehrere → werden'], beispiel: 'Das Auto wird repariert. Die Brötchen werden gebacken.' },
      gen: (r) => auswahl(['wird', 'werden'], ziehe(r, [
        ['Das Auto ◻ repariert.', 'wird'], ['Die Brötchen ◻ gebacken.', 'werden'], ['Der Boden ◻ geputzt.', 'wird'], ['Die Teller ◻ gespült.', 'werden'],
        ['Das Brett ◻ zweimal gemessen.', 'wird'], ['Die Bestellungen ◻ geprüft.', 'werden'], ['Die Tür ◻ abgeschlossen.', 'wird'], ['Die Pakete ◻ geliefert.', 'werden'],
      ])) },
  ] },
  { nr: 7, titel: 'Medien und Werbung', ziele: ['Relativsätze', 'indirekte Fragen mit ob/wann/wo', 'Meinung sagen'], blaetter: [
    { id: 'd7-relativ', titel: 'Der Junge, der …',
      erkl: { idee: 'Ein Relativsatz erklärt ein Nomen genauer.', schritte: ['der Junge → der', 'die App → die', 'das Video → das', 'Verb am Ende'], beispiel: 'Das ist das Video, das alle teilen.' },
      gen: (r) => auswahl(['der', 'die', 'das'], ziehe(r, [
        ['Das ist der Junge, ◻ neben mir sitzt.', 'der'], ['Das ist die App, ◻ ich jeden Tag nutze.', 'die'], ['Das ist das Video, ◻ alle teilen.', 'das'],
        ['Ich kenne die Werbung, ◻ so laut ist.', 'die'], ['Wo ist der Bus, ◻ nach Junglinster fährt?', 'der'], ['Das ist das Handy, ◻ zu teuer ist.', 'das'],
        ['Sie mag die Band, ◻ am Samstag spielt.', 'die'], ['Das ist der Film, ◻ ich gesehen habe.', 'der'],
      ])) },
    { id: 'd7-indirekt', titel: 'Weißt du, ob …?',
      erkl: { idee: 'Höflich fragen: Die Frage steckt in einem Satz.', schritte: ['Ja/Nein-Frage → ob', 'W-Frage → das W-Wort bleibt', 'Verb am Ende'], beispiel: 'Kommt der Bus? → Weißt du, ob der Bus kommt?' },
      gen: (r) => auswahl(['ob', 'wann', 'wo', 'wer'], ziehe(r, [
        ['Weißt du, ◻ der Bus noch kommt? (Ja/Nein)', 'ob'], ['Weißt du, ◻ der Film beginnt? (Uhrzeit)', 'wann'], ['Kannst du mir sagen, ◻ die Kantine ist?', 'wo'],
        ['Ich frage mich, ◻ das geschrieben hat.', 'wer'], ['Sag mir, ◻ du morgen kommst. (Ja/Nein)', 'ob'], ['Weißt du, ◻ die Pause endet?', 'wann'],
        ['Ich weiß nicht, ◻ mein Ladekabel ist.', 'wo'], ['Weißt du, ◻ die Werbung stimmt? (Ja/Nein)', 'ob'],
      ])) },
  ] },
  { nr: 8, titel: 'Umwelt und Zukunft', ziele: ['Futur mit werden', 'würde (Konjunktiv II)', 'wenn … dann'], blaetter: [
    { id: 'd8-futur', titel: 'Morgen wird es …',
      erkl: { idee: 'Über die Zukunft sprechen: werden + Infinitiv.', schritte: ['ich werde, du wirst, er wird', 'wir werden, ihr werdet, sie werden'], beispiel: 'Morgen wird es regnen.' },
      gen: (r) => luecke(ziehe(r, [
        ['Morgen ___ es regnen. (es)', 'wird'], ['Ich ___ Energie sparen.', 'werde'], ['Du ___ das schaffen.', 'wirst'], ['Wir ___ den Müll trennen.', 'werden'],
        ['Ihr ___ mit dem Rad fahren.', 'werdet'], ['Sie ___ weniger Plastik kaufen. (mehrere)', 'werden'], ['Ayla ___ ein Konzert geben.', 'wird'], ['Ich ___ Licht ausmachen.', 'werde'],
      ])) },
    { id: 'd8-wuerde', titel: 'Was würdest du tun?',
      erkl: { idee: 'Mit „würde“ sprichst du über Wünsche und Ideen.', schritte: ['ich würde, du würdest, er würde', 'wir würden, ihr würdet, sie würden', 'Infinitiv am Ende'], beispiel: 'Wenn ich Zeit hätte, würde ich mehr lesen.' },
      gen: (r) => luecke(ziehe(r, [
        ['Wenn ich Geld hätte, ___ ich ein Rad kaufen.', 'würde'], ['Was ___ du an meiner Stelle tun?', 'würdest'], ['Wir ___ gern draußen essen.', 'würden'],
        ['Er ___ lieber Bus fahren.', 'würde'], ['___ ihr mitkommen?', 'Würdet'], ['Sie ___ gern im Garten arbeiten. (mehrere)', 'würden'], ['Ich ___ nie Müll in den Wald werfen.', 'würde'],
        ['Du ___ das sicher gut machen.', 'würdest'],
      ])) },
  ] },
  { nr: 9, titel: 'Arbeitswelt und Sicherheit (Wiederholung 6–8)', ziele: ['Anleitungen und Sicherheitshinweise', 'Plusquamperfekt mit nachdem', 'Sie-Form'], blaetter: [
    { id: 'd9-nachdem', titel: 'Nachdem ich gegessen hatte …',
      erkl: { idee: 'Was vorher passiert ist: hatte/war + Partizip.', schritte: ['nachdem + Plusquamperfekt', 'danach + Präteritum', 'Bewegung → war (gegangen)'], beispiel: 'Nachdem ich gegessen hatte, ging ich los.' },
      gen: (r) => auswahl(['hatte', 'war', 'hatten', 'waren'], ziehe(r, [
        ['Nachdem ich gegessen ◻, ging ich los.', 'hatte'], ['Nachdem sie angekommen ◻, rief sie an.', 'war'], ['Nachdem wir gelernt ◻, spielten wir.', 'hatten'],
        ['Nachdem die Gäste gegangen ◻, räumten wir auf.', 'waren'], ['Nachdem er die Brille aufgesetzt ◻, sägte er.', 'hatte'], ['Nachdem ich eingeschlafen ◻, klingelte das Handy.', 'war'],
        ['Nachdem wir gemessen ◻, schnitten wir das Brett.', 'hatten'], ['Nachdem sie gelaufen ◻, tranken sie Wasser.', 'waren'],
      ])) },
    { id: 'd9-sicherheit', titel: 'Sicher arbeiten',
      erkl: { idee: 'Anleitungen sind kurz und klar. Oft in der Sie-Form.', schritte: ['Tragen Sie … (Pflicht)', 'Nicht … (Verbot)', 'Immer zuerst lesen, dann arbeiten'], beispiel: 'Tragen Sie eine Schutzbrille!' },
      gen: (r) => auswahl(['Tragen', 'Schalten', 'Waschen', 'Melden', 'Lesen'], ziehe(r, [
        ['◻ Sie eine Schutzbrille!', 'Tragen'], ['◻ Sie die Maschine nach der Arbeit aus!', 'Schalten'], ['◻ Sie sich vor dem Kochen die Hände!', 'Waschen'],
        ['◻ Sie Unfälle sofort!', 'Melden'], ['◻ Sie zuerst die Anleitung!', 'Lesen'], ['◻ Sie Handschuhe beim Putzmittel!', 'Tragen'],
        ['◻ Sie das Licht im Lager aus!', 'Schalten'], ['◻ Sie Schäden an Kabeln!', 'Melden'],
      ])) },
  ] },
];

export function deutschBlatt(modul, blattId, seed = Date.now()) {
  const m = DEUTSCH.find((x) => x.nr === modul), b = m && m.blaetter.find((x) => x.id === blattId);
  if (!b) return null;
  return { id: b.id, modul: 'Deutsch · Modul ' + m.nr, titel: b.titel, untertitel: m.titel, erkl: b.erkl, info: [], aufgaben: b.gen(zufall(seed)) };
}
