// SOLO AKTION #12 · NÄHE – acht Aktionen zum Machen und ein Auftrag für die Woche. Alles läuft über Lina, nichts über eigene Erlebnisse.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s12'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a12', nr: '12', datei: 'Solo-12-Naehe-Aktion', thema: 'Nähe', headline: 'Acht Aktionen. Dein Tempo.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:lina:verlegen', sticker: 'Dein Tempo',
  start: ['Woran erkennst du, ob dir jemand guttut? **Das probierst du hier aus – an Lina, nicht an dir.**', 'Von dir erzählst du nur, was du willst. Jede Aktion dauert 10 bis 15 Minuten.'],
  aktionen: [
    {
      titel: 'Liebe oder Kontrolle?', bild: 'peep:lina:verlegen', icon: 'heart-question', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Dein Gegenüber liest einen Satz vor.',
        'Beide zeigen gleichzeitig mit den Fingern: **1** okay. **2** kommt drauf an. **3** geht nicht.',
        'Kreuz an, was du gezeigt hast.',
        'Bei „kommt drauf an“: Worauf? Ein Satz reicht.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Jemand, mit dem du zusammen bist …', raster: { spalten: ['okay', 'kommt drauf an', 'geht nicht'], zeilen: ['will immer wissen, wo ich bin', 'liest meine Nachrichten', 'will mein Passwort', 'schreibt 30-mal, wenn ich nicht antworte', 'sagt: „Wenn du mich liebst, dann …“', 'ist beleidigt, wenn ich Nein sage'] } }] }],
      aha: 'Eifersucht ist kein Beweis für Liebe. **Sie zeigt nur, dass jemand Angst hat.**',
      ziel: 'Kontrolle erkennen, auch wenn sie als Liebe verkauft wird.',
      tipp: 'Ehrlich mitzeigen. „Kommt drauf an“ nicht wegdiskutieren – nachfragen, worauf.',
    },
    {
      titel: 'Lina und Elias', bild: 'peep:lina:verlegen', icon: 'lock', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch an, was bei Lina passiert.', 'Die Freundin sagt: „Der liebt dich halt.“ Kreis ein: Stimmt das?', 'Kreuz an: Was könnte Lina jetzt tun?'],
      zonen: [
        { art: 'comic', bilder: [['map-pin', 'Elias will immer wissen, wo Lina ist. Erst fand sie es süß.'], ['lock', 'Dann will er ihren Standort. Dann ihr Passwort.'], ['message-off', 'Er liest ihre Chats. Drei Tage ist er beleidigt.'], ['mood-sad', 'Lina entschuldigt sich. Sie weiß nicht, wofür.']] },
        { art: 'fragen', fragen: [{ f: '„Der liebt dich halt.“ Stimmt das?', kreis: ['ja', 'nein', 'beides ein bisschen'] }, { f: 'Das könnte Lina tun:', unter: true, kreuz: ['sich wieder entschuldigen', 'sagen: „Mein Handy bleibt meins.“', 'erst mit jemandem reden, dem sie vertraut'] }] },
      ],
      aha: 'Wer sich entschuldigt und nicht weiß wofür, **steht unter Druck.**',
      ziel: 'An Lina sehen, wie Kontrolle Schritt für Schritt wächst.',
      tipp: 'Nicht fragen, ob er das kennt. Wer will, erzählt von selbst.',
    },
    {
      titel: 'Größer oder kleiner?', icon: 'arrows-maximize', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: ['Dein Gegenüber liest vor, was jemand in einer Beziehung macht.', 'Arme weit auseinander: **Das Leben wird größer.** Arme eng zusammen: **Es wird kleiner.**', 'Beide zeigen gleichzeitig. Kreuz an.'],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Die Person …', raster: { spalten: ['größer', 'kleiner'], zeilen: ['freut sich, wenn ich Freunde treffe', 'will nicht, dass ich allein rausgehe', 'fragt, bevor ein Foto von mir gepostet wird', 'macht meine Freunde schlecht', 'hört zu, wenn ich Nein sage', 'ist tagelang beleidigt', 'lässt mir mein Handy'] } }] }],
      aha: 'Wer dir guttut, **macht dein Leben größer – nicht kleiner.**',
      ziel: 'Einen einfachen Maßstab für Beziehungen haben.',
      tipp: 'Die Arme wirklich benutzen. Der Maßstab gilt auch für Freundschaften.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '10 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Der Clip dauert etwa 3 Minuten.', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.', 'Wo wird es im echten Leben schwieriger als im Clip? Ein Satz.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Wo wird es im echten Leben schwieriger?') },
        { art: 'daumen', saetze: ['Ein Ja zählt nur, wenn ein Nein auch ginge.', 'Ein Ja darf man zurücknehmen.', 'Wer nichts sagt, ist einverstanden.', 'Wer weggetreten ist, kann nicht Ja sagen.'] },
      ],
      aha: 'Ein Ja zählt nur, wenn ein Nein auch ginge. **Und jedes Ja darf man zurücknehmen.**',
      ziel: 'Einverständnis in vier klaren Sätzen.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Satz 3 ist falsch: Schweigen ist kein Ja.',
    },
    {
      titel: 'Ja, Nein, unsicher', icon: 'eye', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Dein Gegenüber fragt dich etwas Kleines: „Darf ich deinen Stift nehmen?“',
        'Du antwortest **ohne Worte.** Nur mit Gesicht und Körper.',
        'Dein Gegenüber rät: Ja, Nein oder unsicher?',
        'Fünf Fragen. Dann tauschen.',
      ],
      zonen: [
        { art: 'tabelle', kopf: ['', 'richtig geraten von 5'], zeilen: ['Du', 'Dein Gegenüber'] },
        { art: 'fragen', fragen: [{ f: 'Am schwersten zu erkennen war:', kreis: ['Ja', 'Nein', 'unsicher'] }] },
      ],
      aha: 'Nicht sicher, ob es ein Ja ist? **Dann frag. Ein unsicheres Ja ist ein Nein.**',
      ziel: 'Erleben, wie schwer ein Ja ohne Worte zu lesen ist.',
      tipp: 'Nur harmlose Alltagsfragen: Stift, Fenster, Platz, Musik. Keine Berührung.',
    },
    {
      titel: 'Der Druck-Test', icon: 'hand-stop', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Dein Gegenüber spielt jemanden, der an dein Handy will.',
        'Du bleibst bei **einem Satz.** Such ihn dir unten aus.',
        'Es wird in drei Stufen schwerer. Kreuz an, wie es war.',
        'Tauschen: Jetzt drängst du – und dein Gegenüber bleibt bei seinem Satz.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Dein Gegenüber sagt …', raster: { spalten: ['leicht', 'schwer'], zeilen: ['„Zeig mal dein Handy.“', '„Wenn du nichts versteckst, kannst du es ja zeigen.“', '„Wenn du mich magst, dann zeigst du es.“'] } }, { f: 'Mein Satz:', unter: true, kreuz: ['„Mein Handy bleibt meins.“', '„Nein. Und ich mag dich trotzdem.“', '„Unter Druck entscheide ich nichts.“'] }] }],
      aha: 'Wer Druck macht, will kein Ja. **Er will, dass du aufgibst.**',
      ziel: 'Unter Druck bei einem Satz bleiben können.',
      tipp: 'Sie spielen „jemanden“, keinen Partner. Es geht nur ums Handy. Nach Stufe 3 sofort aus der Rolle gehen.',
    },
    {
      titel: 'Mein Maßstab', bild: 'peep:lina:froh', icon: 'list-check', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: [
        'Kreuz an: Was muss jemand können, damit er dir guttut? **Höchstens drei.**',
        'Dein Gegenüber wählt seine drei.',
        'Jetzt die Rückseite: Kreis ein, was **du selbst** gut kannst.',
      ],
      zonen: [{ art: 'wahl', punkte: [['ear', 'zuhören'], ['hand-stop', 'ein Nein hören können'], ['users', 'mir meine Freunde lassen'], ['check', 'halten, was man sagt'], ['mood-happy', 'mit mir lachen'], ['shield', 'vor anderen zu mir stehen'], ['clock', 'mir Zeit lassen'], ['message-circle', 'ehrlich sein']] }],
      aha: 'Dein Maßstab gilt **in beide Richtungen.**',
      ziel: 'Eigene Kriterien haben – und sie an sich selbst anlegen.',
      tipp: 'Die eigenen drei ehrlich wählen. Nicht fragen, an wen er denkt.',
    },
    {
      titel: 'Wem sage ich es?', icon: 'lifebuoy', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Manchmal fühlt sich etwas falsch an – und man weiß nicht genau, warum.',
        'Kreuz an: Mit wem könntest du dann reden?',
        'Kreis **eine** Person ein, die es am ehesten wäre.',
        'Dein Gegenüber sagt dir, was es weitersagen müsste – und was nicht.',
      ],
      zonen: [{ art: 'wahl', punkte: [['users', 'Freundin oder Freund'], ['user-check', 'Bezugsperson hier'], ['home', 'jemand aus der Familie'], ['school', 'Lehrerin oder Lehrer'], ['phone', 'Kanner-Jugendtelefon 116 111'], ['user-question', 'weiß ich noch nicht']] }],
      aha: 'Wenn sich etwas falsch anfühlt: **Du musst das nicht allein sortieren.**',
      ziel: 'Eine Ansprechperson benannt haben, bevor sie gebraucht wird.',
      tipp: 'Schritt 4 ernst nehmen: klar sagen, was Sie melden müssten. „Weiß ich noch nicht“ ist eine ehrliche Antwort.',
    },
  ],
  woche: {
    titel: 'Drei Paare', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt',
    schritte: ['Schau dir diese Woche **drei Paare** an: echt, in einer Serie oder im Netz.', 'Wo siehst du Respekt? Wo Kontrolle, die wie Liebe aussieht?', 'Mach einen Strich. Wette vorher: Wovon findest du mehr?'],
    zonen: [
      { art: 'woche', zeilen: ['Respekt gesehen', 'Kontrolle gesehen', 'ein Nein wurde gehalten', 'ein Nein wurde übergangen'] },
      { art: 'karten', karten: [
        { titel: 'Tee-Regel', icon: 'heart', zeilen: ['Ein Ja zählt nur, wenn Nein auch ginge.', 'Bedrängt, weggetreten, eingeschlafen: kein Ja.', 'Ein Ja darf man zurücknehmen.'] },
        { titel: 'Tut mir das gut?', icon: 'user-heart', zeilen: ['Wird mein Leben größer oder kleiner?', 'Darf ich Nein sagen, ohne bestraft zu werden?', 'Kann ich so sein, wie ich bin?'] },
      ] },
    ],
    aha: 'Wer hinschaut, erkennt den Unterschied **schneller – auch bei sich.**',
    ziel: 'Eine Woche lang den Blick schärfen.',
    tipp: 'Nur über die beobachteten Paare sprechen, nicht über das eigene.',
  },
  begleitung: { material: 'Handy, Stifte', achtung: s.begleitung.achtung + ' In keiner Aktion wird nach eigenen sexuellen Erfahrungen gefragt; Rollenspiele bleiben beim Handy und bei Alltagsfragen.', mehr: MEHR(s) },
}
export default d
