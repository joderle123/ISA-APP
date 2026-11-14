// SOLO AKTION #14 · SPÄTER – acht Aktionen zum Machen und ein Auftrag für die Woche.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s14'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a14', nr: '14', datei: 'Solo-14-Spaeter-Aktion', thema: 'Später', headline: 'Acht Aktionen. Ein Dienstag reicht.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:yusuf:neutral:stehen', sticker: 'Ein Dienstag reicht',
  start: ['Niemand muss in deinem Alter wissen, was er wird. **Nur, was er als Nächstes ausprobiert.**', 'Hier wird kein Plan kleingemacht. Auch kein großer.'],
  aktionen: [
    {
      titel: 'Ein Dienstag', icon: 'calendar', zeit: '15 Min.', wer: 'beide', material: 'Stifte',
      schritte: [
        'Stell dir einen Dienstag in ein paar Jahren vor. Es läuft **okay.** Nicht perfekt.',
        'Zeichne vier Bilder. Strichmännchen reichen.',
        'Dein Gegenüber zeichnet auf ein eigenes Blatt: seinen Dienstag, als es so alt war wie du.',
        'Zeigt euch die Bilder. Jeder stellt **zwei Fragen.**',
      ],
      zonen: [{ art: 'felder', titel: ['Ich wache auf in …', 'Tagsüber mache ich …', 'Mittags esse ich mit …', 'Am Abend …'] }],
      aha: 'Du brauchst keinen Lebensplan. **Ein okayer Dienstag ist ein Ziel.**',
      ziel: 'Zukunft greifbar machen: ein einzelner Tag statt „das Leben“.',
      tipp: 'Nichts „realistischer“ machen. Den eigenen echten Dienstag von damals zeichnen, ohne ihn schönzumalen.',
    },
    {
      titel: 'Was gibt es schon?', bild: 'peep:yusuf:neutral:stehen', icon: 'checklist', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: [
        'Kreuz an: Was gehört zu deinem okayen Dienstag?',
        'Zweites Kreuz: Was davon hast du **schon ein bisschen**?',
        'Dein Gegenüber kreuzt an, was es in deinem Alter schon hatte.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Zu meinem Dienstag gehört:', raster: { spalten: ['will ich', 'habe ich schon ein bisschen'], zeilen: ['ein eigenes Zimmer oder eine Wohnung', 'Arbeit oder Ausbildung', 'jemand, mit dem ich esse', 'eigenes Geld', 'etwas, worin ich gut bin', 'ein Tier', 'meine Ruhe'] } }] }],
      aha: 'Ein Stück von später **gibt es schon heute.**',
      ziel: 'Sehen, dass der Weg nicht bei null beginnt.',
      tipp: 'Jedes Kreuz in der zweiten Spalte benennen: „Das hast du schon.“ Mehr nicht.',
    },
    {
      titel: 'Yusuf beim Berater', bild: 'peep:yusuf:neutral', icon: 'briefcase', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Yusufs Termin an.', 'Kreuz an: Warum sagt Yusuf „Keine Ahnung“?', 'Kreis ein: Wem würdest du einen Plan sagen?'],
      zonen: [
        { art: 'comic', bilder: [['briefcase', 'Der Berater fragt: „Wo siehst du dich in fünf Jahren?“'], ['message-circle', 'Yusuf sagt: „Keine Ahnung.“ Der Berater seufzt.'], ['tool', 'Dabei hat Yusuf einen Plan: Mechatroniker. Eine eigene Wohnung.'], ['mood-sad', 'Er sagt ihn nicht. Beim letzten Mal hat jemand gelacht.']] },
        { art: 'fragen', fragen: [{ f: 'Yusuf sagt „Keine Ahnung“, weil:', unter: true, kreuz: ['beim letzten Mal jemand gelacht hat', 'er keinen Plan hat', 'er den Berater nicht mag'] }, { f: 'Einen Plan würde ich sagen:', kreis: ['keinem', 'einer Person', 'mehreren'] }] },
      ],
      aha: 'Wer seinen Plan nicht sagt, **schützt ihn.** Das ist klug – und macht einsam.',
      ziel: 'Verstehen, warum Pläne verschwiegen werden.',
      tipp: 'Nicht nach dem Plan fragen. Wenn er kommt: nicht bewerten, nur „Erzähl mehr“.',
    },
    {
      titel: 'Rückwärts planen', icon: 'arrow-back-up', zeit: '10 Min.', wer: 'zusammen', material: 'Stift',
      schritte: [
        'Yusuf will Mechatroniker werden. Das ist das Ziel.',
        'Schreib Zahlen in die Kästchen: **1** ist das, was er zuerst tun muss.',
        'Kreis ein, was er **diese Woche** schaffen kann.',
        'Dann: Was wäre **dein** nächster Schritt? Nur einer.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Yusufs Schritte – in welcher Reihenfolge?', zahl: ['Ausbildung anfangen', 'Bewerbung abschicken', 'Praktikum in einer Werkstatt', 'den Meister fragen, was man braucht', 'den Abschluss schaffen', 'drei Betriebe heraussuchen'] }, { f: 'Mein nächster Schritt:', linien: 1 }] }],
      aha: 'Vom Ziel rückwärts wird aus einem Traum **eine Liste.**',
      ziel: 'Ein Ziel in Schritte teilen können.',
      tipp: 'Mehrere Reihenfolgen sind richtig. „Den Meister fragen“ ist fast immer der beste erste Schritt.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut die ersten 6 Minuten.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Welche sehr kleine Veränderung traust du dir zu?') },
        { art: 'daumen', saetze: ['Kleine Schritte bringen mehr als große Vorsätze.', 'Ich habe schon mal etwas an mir geändert.', 'Menschen ändern sich nie.', 'Ich weiß, was ich als Nächstes ausprobiere.'] },
      ],
      aha: 'Du musst nicht dein Leben umkrempeln. **Eine sehr kleine Sache reicht für den Anfang.**',
      ziel: 'Veränderung als Folge kleiner Schritte verstehen.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft.',
    },
    {
      titel: 'Drei Berufe', icon: 'search', zeit: '15 Min.', wer: 'zusammen', material: 'Handy oder Computer',
      schritte: [
        'Sucht zusammen im Netz: **drei Berufe**, die du dir ansehen würdest.',
        'Nur ansehen. Du musst keinen davon wollen.',
        'Zu jedem ein kurzes Video oder drei Sätze.',
        'Schreib den Beruf auf. Daumen hoch oder runter.',
      ],
      zonen: [{ art: 'tabelle', kopf: ['', 'Beruf', 'Daumen hoch oder runter?'], zeilen: ['1', '2', '3'] }],
      aha: 'Du musst nicht wissen, was du wirst. **Nur, was du dir als Nächstes ansiehst.**',
      ziel: 'Drei Berufe wirklich angeschaut haben.',
      tipp: 'Der Jugendliche tippt und wählt. Auch „unrealistische“ Berufe ansehen – die Frage „Was braucht man dafür?“ klärt es von selbst.',
    },
    {
      titel: 'Der krumme Weg', bild: 'peep:yusuf:neutral:laessig', icon: 'route', zeit: '10 Min.', wer: 'du fragst', material: 'Stift',
      schritte: [
        'Du interviewst dein Gegenüber. Vier Fragen.',
        'Hak ab, was du gefragt hast.',
        'Zeichne den Weg deines Gegenübers als **Linie**: gerade oder mit Kurven?',
        'Zähl die Umwege.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Meine Fragen:', unter: true, kreuz: ['„Was wolltest du in meinem Alter werden?“', '„Wie bist du da gelandet, wo du jetzt bist?“', '„Wer hat dir dabei geholfen?“', '„Was ist schiefgegangen – und war am Ende gut?“'] }, { f: 'So sah der Weg aus:', feld: 28 }] }],
      aha: 'Fast kein Weg ist gerade. **Umwege sind normal.**',
      ziel: 'Am echten Lebenslauf eines Erwachsenen sehen: Wege haben Kurven.',
      tipp: 'Ehrlich antworten, auch Brüche und Abbrüche nennen. Kein „und trotzdem habe ich es geschafft“-Vortrag.',
    },
    {
      titel: 'Wer hilft mir?', icon: 'users', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Kreuz an: Wer könnte dir beim **nächsten Schritt** helfen?',
        'Kreis **eine** Person ein.',
        'Entscheide: Wann fragst du sie?',
        'Dein Gegenüber sagt, was es selbst für dich tun kann.',
      ],
      zonen: [
        { art: 'wahl', punkte: [['user-check', 'Bezugsperson hier'], ['school', 'Lehrerin oder Lehrer'], ['tool', 'Meister oder Chef'], ['briefcase', 'Berufsberatung'], ['home', 'jemand aus der Familie'], ['users', 'Freundin oder Freund']] },
        { art: 'fragen', fragen: [{ f: 'Ich frage:', kreis: ['diese Woche', 'diesen Monat', 'später'] }] },
      ],
      aha: 'Oft gab es einen Wendepunkt: **ein Mensch, eine Arbeit, ein Ort.**',
      ziel: 'Eine Person für den nächsten Schritt benannt haben.',
      tipp: 'In Schritt 4 nur zusagen, was Sie wirklich tun – und es bis zum nächsten Mal tun.',
    },
  ],
  woche: {
    titel: 'Eine Frage stellen', icon: 'calendar-week', zeit: '1 Woche', wer: 'du allein', material: 'dieses Blatt',
    schritte: ['Frag einen Erwachsenen, dessen Leben du okay findest:', '**„Was wolltest du in meinem Alter werden – und wie bist du hier gelandet?“**', 'Wette vorher: Wie viele Umwege waren es?'],
    zonen: [
      { art: 'woche', zeilen: ['einen Erwachsenen gefragt', 'einen Beruf angeschaut', 'meinen nächsten Schritt gemacht'] },
      { art: 'karten', karten: [
        { titel: 'Nächster Schritt', icon: 'road', zeilen: ['Ich muss nicht wissen, was ich werde.', 'Nur, was ich als Nächstes ausprobiere:', '_Versuch'] },
        { titel: 'Wer mir helfen kann', icon: 'send', zeilen: ['Für den nächsten Schritt brauche ich:', '_Wen', '_Bis wann'] },
      ] },
    ],
    aha: 'Ein Schritt in dieser Woche zählt mehr als ein Plan für zehn Jahre.',
    ziel: 'Ein Gespräch und ein Schritt in einer Woche.',
    tipp: 'Beim nächsten Mal zuerst fragen: „Wen hast du gefragt – und was hat dich überrascht?“',
  },
  begleitung: { material: 'Stifte, Papier, Handy oder Computer', achtung: s.begleitung.achtung, mehr: MEHR(s) },
}
export default d
