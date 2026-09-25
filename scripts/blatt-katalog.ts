// Bausteinkatalog: Testblätter, die jeden Baustein einmal zeigen – zur
// Sichtprüfung der Gestaltung und als Anschauung für neue Inhalte.
import type { Blatt, Layout } from '../src/blatt/typen'

const lehrer = {
  ziel: 'Testblatt für die Gestaltung.',
  ablauf: ['Blatt ansehen.', 'Fehler notieren.'],
  hintergrund: 'Kein Inhalt – nur Gestaltung.',
}

function blatt(id: string, layout: Layout, titel: string, bausteine: Blatt['de']['bausteine'], extra: { anleitung?: string } = {}): Blatt {
  return {
    id,
    bereich: 'gefuehle',
    thema: 'wut',
    stufen: layout === 'bild' ? ['C1'] : layout === 'gross' ? ['C2'] : layout === 'jugend' ? ['ES'] : ['C3', 'C4'],
    layout,
    sozialform: ['einzeln'],
    dauer: '20 Min.',
    eldib: ['V-21', 'K-26'],
    schlagworte: [],
    de: { titel, untertitel: extra.anleitung ? undefined : 'Untertitel mit einer ruhigen, kurzen Erklärung in einer Zeile.', anleitung: extra.anleitung, bausteine, lehrer },
  }
}

export function katalogBlaetter(): Blatt[] {
  return [
    blatt('katalog-text', 'mittel', 'Text, Info und Geschichte', [
      { art: 'geschichte', titel: 'In der Pause', text: 'Noah steht am Rand vom Fußballplatz. Die anderen haben die Mannschaften schon gewählt. Keiner ruft seinen Namen. Noah schiebt die Hände in die Jackentaschen und schaut auf den Boden.', bild: 'figur:noah:traurig' },
      { art: 'aufgabe', text: 'Lies die Geschichte. Wie fühlt sich Noah?', symbole: ['lesen', 'nachdenken'] },
      { art: 'gefuehle', gefuehle: ['traurig', 'wuetend', 'verlegen', 'einsam' as never].filter((x) => x !== ('einsam' as never)), modus: 'einkreisen' },
      { art: 'info', symbol: 'tipp', titel: 'Tipp', text: 'Gefühle haben oft mehrere Farben gleichzeitig.', punkte: ['Man kann traurig und wütend zugleich sein.', 'Beides ist in Ordnung.'] },
      { art: 'aufgabe', text: 'Was könnte Noah tun?', hinweis: 'Schreibe zwei Ideen auf.' },
      { art: 'satzanfaenge', items: ['Noah könnte …', 'Die anderen könnten …'], linien: 2 },
      { art: 'frage', text: 'Ist dir so etwas auch schon passiert?', linien: 2 },
      { art: 'rueckblick' },
    ]),
    blatt('katalog-modelle-1', 'mittel', 'Vulkan, Thermometer, Ampel', [
      { art: 'aufgabe', text: 'Fülle deinen Wutvulkan aus.' },
      { art: 'vulkan' },
      { art: 'aufgabe', text: 'Wie heiß ist deine Wut?' },
      { art: 'thermometer', stufen: [{ titel: 'Ganz ruhig', text: 'Ich kann gut denken.' }, { titel: 'Etwas genervt' }, { titel: 'Sauer' }, { titel: 'Kurz vorm Platzen', text: 'Ich brauche jetzt eine Pause.' }] },
      { art: 'seitenumbruch' },
      { art: 'aufgabe', text: 'Stopp – Denken – Handeln' },
      { art: 'ampel', stufen: [{ titel: 'Stopp', text: 'Ich halte an und atme.' }, { titel: 'Denken', text: 'Was kann ich tun?' }, { titel: 'Handeln', text: 'Ich probiere die beste Idee.' }] },
      { art: 'aufgabe', text: 'Mein Plan' },
      { art: 'wennDann', zeilen: 2, beispiele: [{ wenn: 'Wenn mich jemand auslacht,', dann: 'gehe ich weg und sage es einer Lehrperson.' }] },
    ]),
    blatt('katalog-modelle-2', 'mittel', 'Eisberg, Körper, Batterie, Waage', [
      { art: 'aufgabe', text: 'Was steckt unter der Wut?' },
      { art: 'eisberg', oben: 'Das sehen die anderen', unten: 'Das ist darunter versteckt', beispielOben: 'schreien, Tür knallen', beispielUnten: 'Enttäuschung, Angst' },
      { art: 'aufgabe', text: 'Wo spürst du deine Gefühle?' },
      { art: 'koerper', legende: [{ farbe: 'rot', text: 'Wut' }, { farbe: 'blau', text: 'Traurigkeit' }, { farbe: 'gelb', text: 'Freude' }, { farbe: 'lila', text: 'Angst' }] },
      { art: 'seitenumbruch' },
      { art: 'aufgabe', text: 'Deine Energie-Batterie' },
      { art: 'batterie', laden: 'Das gibt mir Energie', leeren: 'Das kostet mich Energie', linien: 3 },
      { art: 'aufgabe', text: 'Vorteile und Nachteile' },
      { art: 'waage', links: 'Dafür spricht', rechts: 'Dagegen spricht', zeilen: 3 },
    ]),
    blatt('katalog-modelle-3', 'mittel', 'Leiter, Zielscheibe, Hand, Mindmap', [
      { art: 'aufgabe', text: 'Meine Mut-Leiter' },
      { art: 'leiter', stufen: 5, oben: 'am schwersten', unten: 'am leichtesten', beispiele: ['Ich frage eine Freundin nach einem Stift.'] },
      { art: 'aufgabe', text: 'Wer ist mir nah?' },
      { art: 'zielscheibe', ringe: ['Bekannte', 'Freunde', 'Familie'], mitte: 'Ich' },
      { art: 'seitenumbruch' },
      { art: 'aufgabe', text: 'Fünf Menschen, die mir helfen' },
      { art: 'hand', finger: ['Zuhause', 'In der Schule', 'In der Freizeit', 'Am Telefon', 'Noch jemand'] },
      { art: 'aufgabe', text: 'Alles, was mir guttut' },
      { art: 'mindmap', mitte: 'Mir tut gut', aeste: ['Bewegung', '', 'Menschen', '', 'Ruhe', ''] },
    ]),
    blatt('katalog-struktur', 'mittel', 'Schritte, Plan, Tabelle', [
      { art: 'aufgabe', text: 'Vier Schritte zur Lösung' },
      { art: 'schritte', items: [{ titel: 'Problem benennen' }, { titel: 'Ideen sammeln' }, { titel: 'Beste Idee wählen' }, { titel: 'Ausprobieren' }], stil: 'kette' },
      { art: 'aufgabe', text: 'Und senkrecht:' },
      { art: 'schritte', items: [{ titel: 'Ich merke: Es wird zu viel.', text: 'Körper, Gedanken' }, { titel: 'Ich sage Stopp.' }, { titel: 'Ich hole mir Hilfe.' }] },
      { art: 'aufgabe', text: 'Meine Woche' },
      { art: 'plan', ziel: '', zeilen: ['Ich melde mich, bevor ich rede.', 'Ich bleibe bei meiner Aufgabe.', ''], symbol: 'gesicht' },
      { art: 'aufgabe', text: 'Tabelle mit Beispiel' },
      { art: 'tabelle', spalten: ['Situation', 'Gedanke', 'Gefühl', 'Was ich tue'], zeilen: 3, beispiel: ['Test zurück: eine 4', 'Ich kann das nie.', 'enttäuscht', 'Ich zerknülle das Blatt.'] },
    ]),
    blatt('katalog-auswahl', 'gross', 'Ankreuzen, Skala, Wörter', [
      { art: 'aufgabe', text: 'Was hilft dir, wenn du wütend bist?', symbole: ['ankreuzen'] },
      { art: 'ankreuzen', items: ['tief atmen', 'weggehen', 'etwas trinken', 'mit jemandem reden', 'bis zehn zählen', 'ein Kissen drücken'], spalten: 2, frei: 2 },
      { art: 'aufgabe', text: 'Wie geht es dir gerade?' },
      { art: 'skala', von: 'gar nicht gut', bis: 'sehr gut', stufen: 5, gesichter: true },
      { art: 'skala', frage: 'Wie stark ist deine Wut?', von: 'gar nicht', bis: 'riesig', stufen: 11 },
      { art: 'wortspeicher', titel: 'Gefühlswörter', items: ['sauer', 'genervt', 'wütend', 'enttäuscht', 'traurig', 'ruhig', 'froh', 'stolz'] },
      { art: 'aufgabe', text: 'Verbinde.', symbole: ['verbinden'] },
      { art: 'zuordnen', links: ['Ich habe gewonnen.', 'Mein Hase ist krank.', 'Jemand schubst mich.'], rechts: ['wütend', 'froh', 'traurig'], titel: ['Situation', 'Gefühl'] },
    ]),
    blatt('katalog-bild', 'bild', 'Wie geht es dir heute?', [
      { art: 'aufgabe', text: 'Zeige oder male: So geht es mir.', symbole: ['zeigen', 'malen'] },
      { art: 'gefuehle', gefuehle: ['froh', 'traurig', 'wuetend', 'aengstlich', 'ruhig', 'muede'], modus: 'einkreisen' },
      { art: 'aufgabe', text: 'Was hilft mir?', symbole: ['einkreisen'] },
      { art: 'bilder', bilder: [{ bild: 'icon:pillow', text: 'ausruhen' }, { bild: 'motiv:wasserglas', text: 'trinken' }, { bild: 'icon:palette', text: 'malen' }, { bild: 'icon:music', text: 'Musik' }, { bild: 'motiv:ballon', text: 'atmen' }, { bild: 'figur:lehrerin:ruhig', text: 'reden' }], spalten: 3 },
    ], { anleitung: 'Das Kind zeigt auf ein Gesicht oder malt es an. Fragen Sie nach: Was ist passiert? Was hilft dir jetzt?' }),
    blatt('katalog-comic', 'gross', 'Bildgeschichte, Karten, Dialog', [
      { art: 'aufgabe', text: 'Was passiert hier?', symbole: ['lesen', 'schreiben'] },
      { art: 'comic', felder: [
        { figuren: ['figur:mia:froh', 'figur:noah:neutral'], text: 'Darf ich mitspielen?', requisit: 'icon:ball-football' },
        { figuren: ['figur:mia:traurig', 'figur:noah:wuetend:verschraenkt'], text: 'Nein. Wir sind schon genug.', sprecher: 1 },
        { figuren: ['figur:mia:traurig'], blase: 'denken', untertitel: '' },
        { leer: true, untertitel: '' },
      ] },
      { art: 'aufgabe', text: 'Schneide die Karten aus.', symbole: ['schneiden'] },
      { art: 'karten', spalten: 3, karten: [{ titel: 'Stopp', text: 'Ich halte an.', bild: 'motiv:stopp' }, { titel: 'Atmen', text: 'Dreimal tief.', bild: 'motiv:ballon' }, { titel: 'Hilfe', text: 'Ich frage.', bild: 'icon:lifebuoy' }] },
      { art: 'aufgabe', text: 'Übe das Gespräch.' },
      { art: 'dialog', zeilen: [{ wer: 'Mia', text: 'Ich bin traurig, weil ich nicht mitspielen darf.' }, { wer: 'Noah' }, { wer: 'Mia' }] },
    ]),
    blatt('katalog-jugend', 'jugend', 'Aufschieben überlisten', [
      { art: 'text', text: 'Fast alle schieben manchmal Dinge auf. Das ist kein Charakterfehler, sondern oft ein Versuch, unangenehme Gefühle zu vermeiden: Langeweile, Unsicherheit oder die Angst, es nicht gut genug zu machen.' },
      { art: 'aufgabe', text: 'Wie sehr trifft das auf dich zu?' },
      { art: 'einschaetzung', items: ['Ich fange erst an, wenn es knapp wird.', 'Ich weiß oft nicht, womit ich anfangen soll.', 'Das Handy lenkt mich ab.', 'Ich habe Angst, dass es nicht gut wird.'], optionen: ['stimmt', 'teils', 'stimmt nicht'] },
      { art: 'aufgabe', text: 'Dein Wenn-dann-Plan' },
      { art: 'wennDann', zeilen: 2, beispiele: [{ wenn: 'Wenn ich um 16 Uhr nach Hause komme,', dann: 'lege ich das Handy in die Küche und stelle einen Timer auf 25 Minuten.' }] },
      { art: 'atmen', uebung: 'quadrat' },
      { art: 'atmen', uebung: 'fuenf-sinne' },
      { art: 'vertrag', titel: 'Meine Abmachung', text: 'Ich, ___, nehme mir vor, in den nächsten zwei Wochen ___ . Wenn es schwierig wird, hilft mir ___ .', unterschriften: ['Unterschrift', 'Lehrperson'] },
      { art: 'notfall' },
      { art: 'tagesplan', zeilen: [{ zeit: '7:00', text: 'Aufstehen, Frühstück', bild: 'icon:sunrise' }, { zeit: '8:00', text: 'Schule', bild: 'icon:school' }], leer: 2 },
      { art: 'atmen', uebung: 'ballon' },
      { art: 'atmen', uebung: 'blume' },
    ]),
  ]
}
