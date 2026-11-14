// SOLO AKTION #15 · LEER – acht Aktionen zum Machen und ein Auftrag für die Woche. Ruhig, klein, ohne Aufmunterung.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s15'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a15', nr: '15', datei: 'Solo-15-Leer-Aktion', thema: 'Leer', headline: 'Acht kleine Aktionen. Reden muss keiner.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:lea:muede', sticker: 'Kleinste Schritte',
  start: ['Manchmal zieht nichts mehr. Nicht mal das, was früher sicher ging. **Das ist kein Charakterfehler und keine Faulheit.**', 'Hier ist alles klein. Und alles zählt – auch „hier sitzen“.'],
  aktionen: [
    {
      titel: 'Zehn Minuten', bild: 'peep:lea:muede', icon: 'clock', zeit: '15 Min.', wer: 'zusammen', material: 'je nach Auswahl',
      schritte: [
        'Kreuz **eine** Sache an. Die kleinste reicht.',
        'Macht sie jetzt. **Zehn Minuten. Zusammen.**',
        'Reden ist nicht nötig.',
        'Danach nur ein Kreis: Wie ist es jetzt?',
      ],
      zonen: [
        { art: 'wahl', punkte: [['walk', 'eine Runde rausgehen'], ['headphones', 'ein Lied hören'], ['cup', 'Tee oder Kakao machen'], ['pencil', 'kritzeln'], ['cards', 'ein Spiel spielen'], ['window', 'aus dem Fenster schauen']] },
        { art: 'fragen', fragen: [{ f: 'Danach ist es:', kreis: ['schwerer', 'gleich', 'ein bisschen leichter'] }] },
      ],
      aha: 'Du musst keine Lust haben. **Zehn Minuten reichen.**',
      ziel: 'Gemeinsam etwas Kleines tun – ohne Gespräch, ohne Ergebnis.',
      tipp: 'Tempo halbieren. Nicht aufmuntern, nicht fragen, ob es gutgetan hat. „Gleich“ ist eine gute Antwort.',
    },
    {
      titel: 'Früher – jetzt', icon: 'arrows-exchange', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: ['Mach in jeder Zeile ein Kreuz.', 'Dein Gegenüber kreuzt für eine eigene miese Zeit an.', 'Schaut hin: Was ist bei dir von „früher gut“ zu „jetzt egal“ gerutscht?'],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Wie ist es damit?', raster: { spalten: ['früher gut', 'jetzt noch gut', 'jetzt egal'], zeilen: ['Musik', 'zeichnen oder basteln', 'Sport oder Bewegung', 'Freunde treffen', 'Essen', 'zocken oder Serien', 'draußen sein'] } }] }],
      aha: 'Wenn auch das Sichere keinen Spaß mehr macht, ist das **ein Zeichen. Kein Charakter.**',
      ziel: 'Die Veränderung sehen, ohne sie zu erklären.',
      tipp: 'Viele Kreuze bei „jetzt egal“ über Wochen: siehe Achtung. Keine Diagnose aussprechen.',
    },
    {
      titel: 'Lea', bild: 'peep:lea:traurig', icon: 'pencil-off', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Leas Tag an.', 'Kreuz an: Woran könnte jemand merken, dass etwas nicht stimmt?', 'Kreis ein: Was ist Lea?'],
      zonen: [
        { art: 'comic', bilder: [['school', 'Lea steht auf, geht zur Schule, lacht in der Pause.'], ['bed', 'Nachmittags liegt sie auf dem Bett und schaut an die Decke.'], ['pencil-off', 'Früher hat sie gezeichnet. Die Stifte liegen seit Februar in der Schublade.'], ['message-circle', 'Wenn jemand fragt, sagt sie: „Bin nur müde.“']] },
        { art: 'fragen', fragen: [{ f: 'Daran könnte man es merken:', unter: true, kreuz: ['an den Stiften in der Schublade', 'an „Bin nur müde“ – jeden Tag', 'an ihrem Lachen in der Pause'] }, { f: 'Lea ist:', kreis: ['traurig', 'leer', 'faul'] }] },
      ],
      aha: 'Leer ist nicht traurig. Und nicht faul. **Es sieht von außen nur so aus wie „müde“.**',
      ziel: 'Leere von Faulheit und Traurigkeit unterscheiden.',
      tipp: 'Nicht fragen „Geht es dir auch so?“. Die Frage stellt Aktion 6.',
    },
    {
      titel: 'Was trotzdem ging', icon: 'check', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: ['Kreis ein: Wie voll ist dein Akku heute?', 'Kreis alles ein, was diese Woche **trotzdem ging.**', 'Dein Gegenüber kreist für sich ein.', 'Zählt zusammen. Jeder Kreis zählt gleich viel.'],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Mein Akku (0 leer – 10 voll):', regler: ['heute'] }, { f: 'Das ging diese Woche:', kreis: ['aufstehen', 'duschen', 'essen', 'rausgehen', 'jemandem schreiben', 'Musik hören', 'hierherkommen', 'hier sitzen'] }] }],
      aha: 'An leeren Tagen **zählt alles.** Auch „hier sitzen“.',
      ziel: 'Kleines als geschafft anerkennen.',
      tipp: 'Nicht loben wie bei einem Kind. Nur zählen: „Fünf.“',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut das Video.', 'Jeder darf „Stopp“ sagen.', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Was kennst du – von dir oder von jemand anderem?') },
        { art: 'daumen', saetze: ['So etwas kenne ich – von mir oder von anderen.', 'Das ist ein Zustand, keine Faulheit.', 'Darüber reden macht es schlimmer.', 'Es geht vorbei.'] },
      ],
      aha: 'Hält es wochenlang an, heißt es depressive Verstimmung. **Sie ist häufig. Und sie geht vorbei – mit Hilfe meist schneller.**',
      ziel: 'Einen Namen und eine Aussicht haben.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Satz 3 ist falsch: Reden entlastet.',
    },
    {
      titel: 'Die direkte Frage', icon: 'message-heart', zeit: '10 Min.', wer: 'dein Gegenüber liest vor', material: 'Handy',
      schritte: [
        'Dein Gegenüber liest den Kasten vor.',
        'Es sagt dir, **was es tut, wenn du Ja sagst.**',
        'Kreis ein: Wem würdest du es sagen?',
        'Speichert zusammen zwei Nummern in deinem Handy: **116 111** und **112.**',
      ],
      zonen: [
        { art: 'hinweis', label: 'Zum Vorlesen', titel: 'Dunkle Gedanken', x: 'In so einer Zeit kommen manchmal Gedanken wie „Es wäre besser, wenn ich nicht da wäre“. **Kennst du das? Dann sag es** – jetzt oder später. Dein Gegenüber bleibt ruhig. Für sich behalten darf es das nicht. Aber du erfährst zuerst, mit wem es redet.' },
        { art: 'fragen', fragen: [{ f: 'Wenn es so wäre, würde ich es sagen:', kreis: ['meinem Gegenüber', 'jemand anderem', 'weiß nicht'] }, { f: 'Die Nummern sind gespeichert:', kreis: ['ja', 'später'] }] },
      ],
      aha: 'Darüber reden macht es nicht schlimmer. **Nur weniger einsam.**',
      ziel: 'Die Frage nach Suizidgedanken ist gestellt, und der Weg danach ist bekannt.',
      tipp: 'Die Frage danach selbst direkt stellen: „Kennst du solche Gedanken?“ Bei Ja: ruhig bleiben, danken, nach dem Krisenverfahren handeln – siehe Achtung. Nie Verschwiegenheit zusagen.',
    },
    {
      titel: 'Wenn es dunkel wird', icon: 'bulb', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Das ist dein Zettel für schlechte Stunden.',
        'Kreuz an: Was hilft dir **ein bisschen**? Mehr muss es nicht sein.',
        'Schreib auf, wer dein Mensch ist. Ein Anfangsbuchstabe reicht.',
        'Dein Gegenüber sagt, wann es selbst erreichbar ist.',
      ],
      zonen: [
        { art: 'wahl', punkte: [['users', 'bei jemandem sein'], ['walk', 'rausgehen'], ['headphones', 'Musik'], ['droplet', 'duschen'], ['paw', 'ein Tier'], ['pencil', 'schreiben oder zeichnen']] },
        { art: 'fragen', fragen: [{ f: 'Mein Mensch:', linien: 1 }] },
      ],
      aha: '„Es wird nie besser“ ist **ein Anzeichen. Keine Tatsache.**',
      ziel: 'Ein kleiner Plan für schlechte Stunden.',
      tipp: 'Ehrlich sagen, wann Sie erreichbar sind und wer es sonst ist. Die 116 111 hat feste Zeiten, die 112 ist immer da.',
    },
    {
      titel: 'Dreimal zehn', bild: 'peep:lea:muede', icon: 'calendar-plus', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Such dir **eine sehr kleine Sache** aus, die früher gut war.',
        'Kreis drei Tage ein, an denen du sie machst. Je zehn Minuten.',
        'Kreis ein, wer mitmacht.',
        'Auch ohne Lust. Es wirkt langsam.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Meine Sache:', linien: 1 }, { f: 'An diesen Tagen:', kreis: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] }, { f: 'Dabei ist:', kreis: ['niemand', 'mein Gegenüber', 'jemand anderes'] }] }],
      aha: 'Erst tun, dann fühlen. **Nicht umgekehrt.**',
      ziel: 'Drei feste, sehr kleine Termine.',
      tipp: 'Anbieten, einmal dabei zu sein. Ändert sich nichts, ist das normal – das auch so sagen.',
    },
  ],
  woche: {
    titel: 'Zehn Minuten trotzdem', icon: 'calendar-week', zeit: '1 Woche', wer: 'du – gern mit jemandem', material: 'dieses Blatt',
    schritte: ['Mach deine kleine Sache an drei Tagen. Je zehn Minuten.', 'Mach danach ein Kreuz.', 'Ändert sich nichts? **Das ist normal. Es wirkt langsam.**'],
    zonen: [
      { art: 'woche', zeilen: ['zehn Minuten gemacht', 'ging schwer', 'ging leichter', 'mit jemandem geredet'] },
      { art: 'karten', karten: [
        { titel: 'Wenn es dunkel wird', icon: 'phone', zeilen: ['„Es wird nie besser“ ist ein Anzeichen.', 'Nicht allein bleiben. Jemandem sagen, wie es ist.', 'Kanner-Jugendtelefon **116 111** (feste Zeiten) · Notruf **112** (immer)'] },
        { titel: 'Erst tun', icon: 'player-play', zeilen: ['Nicht auf Lust warten.', 'Zehn Minuten reichen.', 'Ändert sich nichts: normal.'] },
      ] },
    ],
    aha: 'Jedes Kreuz zählt. **Auch das schwere.**',
    ziel: 'Drei kleine Aktivierungen in einer Woche.',
    tipp: 'Beim nächsten Mal nicht fragen „Hat es geholfen?“, sondern „An welchem Tag ging es am leichtesten?“',
  },
  begleitung: { material: 'Handy, Stifte, je nach Auswahl Tee oder ein Spiel', achtung: s.begleitung.achtung, mehr: MEHR(s) },
}
export default d
