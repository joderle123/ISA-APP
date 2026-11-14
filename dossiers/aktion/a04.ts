// SOLO AKTION #04 · ZOCKEN – acht Aktionen zum Machen und ein Auftrag für die Woche.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s04'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a04', nr: '04', datei: 'Solo-04-Zocken-Aktion', thema: 'Zocken', headline: 'Acht Aktionen. Du bist der Profi.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:noah:ruhig:zocken', sticker: 'Du erklärst',
  start: ['Die meisten Erwachsenen haben dein Spiel nie gespielt. **Heute lernt dein Gegenüber von dir.**', 'Jede Aktion dauert 10 bis 15 Minuten.'],
  aktionen: [
    {
      titel: 'Du bist der Coach', bild: 'peep:noah:neutral:zeigen', icon: 'school', zeit: '12 Min.', wer: 'du erklärst', material: 'Handy, Konsole oder Stift',
      schritte: [
        'Zeig dein Spiel: am Handy, in einem Video oder als Zeichnung.',
        'Erklär es in **3 Minuten**. Der Timer läuft.',
        'Stell deinem Gegenüber **drei Testfragen**.',
        'Gib eine Note.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Mein Spiel:', linien: 1 }, { f: 'Richtige Antworten von meinem Gegenüber:', kreis: ['0', '1', '2', '3'] }, { f: 'Meine Note für mein Gegenüber:', kreis: ['Anfänger', 'geht so', 'hat es kapiert'] }] }],
      aha: 'Wer etwas erklären kann, **kann etwas.**',
      ziel: 'Der Jugendliche ist der Experte, Sie sind der Anfänger.',
      tipp: 'Wirklich dumme Fragen stellen. Nicht nach Stunden fragen.',
    },
    {
      titel: 'Eine Runde zusammen', bild: 'peep:noah:ruhig:zocken', icon: 'device-gamepad-2', zeit: '15 Min.', wer: 'beide', material: 'das Spiel – oder ein Video davon',
      schritte: [
        'Dein Gegenüber spielt. **Du bist der Coach.**',
        'Sag, was es tun soll. Ohne ihm das Gerät wegzunehmen.',
        'Geht Spielen hier nicht: Schaut zusammen eine Runde im Video.',
        'Danach kreuzt jeder an.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Mein Gegenüber war:', kreis: ['hoffnungslos', 'lernt schnell', 'besser als gedacht'] }, { f: 'Coach sein war für mich:', kreis: ['nervig', 'okay', 'gut'] }, { f: 'Das sagt mein Gegenüber über das Spiel:', kreis: ['zu schwer', 'verstehe, warum es zieht', 'will noch eine Runde'] }] }],
      aha: 'Hier bist du gut in etwas – und jemand hört dir zu. **Das Gefühl gehört dir.**',
      ziel: 'Gemeinsam erleben, was das Spiel gibt.',
      tipp: 'Sich wirklich coachen lassen. Frust zeigen ist erlaubt. Hausregeln zu Geräten vorher klären.',
    },
    {
      titel: 'Was gibt es mir?', icon: 'gift', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: [
        'Kreuz an: Was bekommst du **im Spiel**?',
        'Zweites Kreuz: Bekommst du das **auch woanders**?',
        'Dein Gegenüber kreuzt für sein Ding an: Serien, Handy, Arbeit.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Das bekomme ich …', raster: { spalten: ['im Spiel', 'auch woanders'], zeilen: ['Ich werde besser.', 'Ich entscheide selbst.', 'Leute brauchen mich.', 'Ich habe meine Ruhe.', 'Ich gewinne.', 'Ich treffe Freunde.', 'Ich kann abschalten.'] } }] }],
      aha: 'Das Spiel gibt dir etwas Echtes. Die Frage ist: **Bekommst du es nur dort?**',
      ziel: 'Sehen, welches Bedürfnis das Spiel erfüllt.',
      tipp: 'Leere Kästchen bei „auch woanders“ sind die Information – nicht kommentieren, merken.',
    },
    {
      titel: 'Tricks finden', icon: 'search', zeit: '10 Min.', wer: 'beide', material: 'Spiel und eine App vom Gegenüber',
      schritte: [
        'Öffne dein Spiel. Dein Gegenüber öffnet seine Lieblings-App.',
        'Sucht: Mit welchen **Tricks** hält es euch?',
        'Kreuzt an, was ihr findet.',
        'Wer mehr Tricks findet, gewinnt.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Gefunden:', raster: { spalten: ['mein Spiel', 'App vom Gegenüber'], zeilen: ['tägliche Belohnung', 'Serie, die reißt, wenn ich fehle', 'Angebot mit Uhr, die abläuft', 'Rangliste', 'Kisten mit Zufall', 'Leute, die auf mich warten', 'kein Ende'] } }] }],
      aha: 'Das ist kein Zufall. **Das ist Absicht – und ein Geschäft.**',
      ziel: 'Die Bindungs-Mechaniken selbst entdecken.',
      tipp: 'Die eigene App ehrlich durchsuchen. Meist findet der Erwachsene genauso viele Tricks.',
    },
    {
      titel: 'Noah, 16 Uhr', bild: 'peep:noah:gelangweilt', icon: 'users-group', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Noahs Tag an.', 'Kreuz an: Was bekommt Noah im Spiel?', 'Kreis ein: Wie ist das bei dir?'],
      zonen: [
        { art: 'comic', bilder: [['school', 'In der Schule ist Noah der, der fehlt.'], ['message-circle', 'Die Lehrerin sagt: „Du könntest, wenn du wolltest.“'], ['device-gamepad-2', 'Um vier loggt er sich ein.'], ['users', 'Drei Leute schreiben: „Endlich.“']] },
        { art: 'fragen', fragen: [{ f: 'Das bekommt Noah im Spiel:', kreuz: ['Leute, die ihn brauchen', 'Er ist gut in etwas', 'Er entscheidet selbst', 'Geld'] }, { f: 'Bei mir ist es:', kreis: ['genauso', 'ein bisschen so', 'anders'] }] },
      ],
      aha: 'Im Clan ist Noah wichtig. **Wo bist du wichtig?**',
      ziel: 'Über Noah sehen, was das Spiel ersetzt.',
      tipp: 'Den Satz der Lehrerin nicht selbst sagen – auch nicht nett gemeint.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut die ersten 6 Minuten.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Was stimmt für dich – und was ist schöngeredet?') },
        { art: 'daumen', saetze: ['Zocken tut mir gut.', 'Zocken macht mir manchmal Ärger.', 'Erwachsene verstehen das nicht.', 'Ich kann aufhören, wenn ich will.'] },
      ],
      aha: 'Spielen kann guttun **und** Ärger machen. Beides stimmt.',
      ziel: 'Ein Bild vom Spielen, das weder verteufelt noch schönredet.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft.',
    },
    {
      titel: 'Sechs Sätze', icon: 'checklist', zeit: '10 Min.', wer: 'allein', material: '',
      schritte: ['Diese Sätze fragen auch Ärzte.', 'Kreuz an. **Keiner schaut mit.**', 'Du wertest selbst aus: Wie viele „oft“?', 'Du entscheidest, ob du etwas davon sagst.'],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Wie oft stimmt das?', raster: { spalten: ['nie', 'manchmal', 'oft'], zeilen: ['Ich spiele länger, als ich wollte.', 'Ich lasse anderes liegen: Schlaf, Leute, Schule.', 'Ich spiele weiter, obwohl es Ärger gibt.', 'Ich spiele, um etwas nicht zu fühlen.', 'Ohne Spiel bin ich gereizt oder leer.', 'Ich sage nicht ehrlich, wie viel ich spiele.'] } }] }],
      aha: 'Nicht die Stunden zählen. **Es zählt: Kannst du aufhören, wenn du willst?**',
      ziel: 'Eine ehrliche Selbsteinschätzung ohne Publikum.',
      tipp: 'Wirklich wegschauen. Nicht nachfragen. Erzählt er von selbst mehrere „oft“: siehe Achtung.',
    },
    {
      titel: 'Stopp-Test', bild: 'peep:noah:neutral', icon: 'alarm', zeit: '15 Min.', wer: 'beide', material: 'Spiel oder Handy, Timer',
      schritte: [
        'Leg **vorher** fest: Schluss nach einer Runde – oder nach 8 Minuten.',
        'Sag es laut. Timer an. Spiel.',
        'Dein Gegenüber macht dasselbe mit seinem Handy.',
        'Der Timer klingelt: **aufhören.** Mitten drin.',
        'Kreis ein: Wie schwer war das?',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Aufhören war (0 leicht – 10 fast unmöglich):', regler: ['für mich', 'für mein Gegenüber'] }, { f: 'Am schwersten ist Aufhören:', kreis: ['mitten in der Runde', 'nach einer Niederlage', 'wenn Leute warten', 'nie'] }] }],
      aha: 'Die Entscheidung fällt **vor dem Einloggen.** Nicht mittendrin.',
      ziel: 'Aufhören einmal wirklich üben.',
      tipp: 'Selbst pünktlich aufhören – auch mitten in einer Nachricht. Geht Spielen hier nicht: mit einem Handyspiel oder Video üben.',
    },
  ],
  woche: {
    titel: 'Dreimal Stopp', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt',
    schritte: ['Leg dreimal diese Woche **vor dem Einloggen** fest, wann Schluss ist.', 'Sag es jemandem, den du aussuchst.', 'Mach danach ein Kreuz.'],
    zonen: [
      { art: 'woche', zeilen: ['Vorher festgelegt', 'Hat geklappt', 'Hat nicht geklappt'] },
      { art: 'karten', karten: [
        { titel: 'Vor dem Einloggen', icon: 'device-gamepad-2', zeilen: ['Wie voll ist mein Akku? (0–10)', 'Wann ist Schluss? Laut sagen.', 'Was mache ich direkt danach?'] },
        { titel: 'Drei Fragen', icon: 'help-circle', zeilen: ['Kann ich aufhören, wenn ich will?', 'Was bleibt gerade liegen?', 'Will ich spielen – oder etwas nicht fühlen?'] },
      ] },
    ],
    aha: 'Jedes „Hat geklappt“ zeigt: **Du steuerst. Nicht das Spiel.**',
    ziel: 'Drei geplante Enden in einer Woche.',
    tipp: 'Nicht kontrollieren. Beim nächsten Mal fragen: In welchem Moment ist es gekippt?',
  },
  begleitung: { material: 'Handy oder Konsole, Timer, Stifte', achtung: s.begleitung.achtung, mehr: MEHR(s) },
}
export default d
