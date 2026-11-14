// SOLO #16 · MIST GEBAUT – Regeln, Ärger, Anzeige in der Einzelarbeit: Schuld statt Scham, Wiedergutmachen statt Abstempeln.
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's16', nr: '16', datei: 'Solo-16-Mist-gebaut', reihe: 'Thema',
  thema: 'Mist gebaut', headline: 'Du hast etwas getan. Du bist es nicht.', farbe: '#FF5A36', stand: 'November 2026',
  bild: 'peep:ben:besorgt:verschraenkt', sticker: 'Dein Anteil',
  seiten: [
    {
      titel: 'Mist gebaut', unter: '',
      bloecke: [
        { art: 'text', x: [
          '„Was hast du dir dabei gedacht?“ Die ehrliche Antwort ist meistens: nichts. Und genau das will keiner hören.',
          'Dieses Heft ist keine Strafe und kein Verhör. Es geht um zwei Fragen, die nach dem Ärger übrig bleiben: **Was davon war wirklich deins?** Und: **Wer bist du jetzt – der, für den dich alle halten, oder jemand, der etwas wieder in Ordnung bringt?**',
        ] },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Was hast du dir dabei gedacht?“', '„Du verbaust dir deine Zukunft.“', '„Mit denen solltest du dich nicht abgeben.“', '„Das hat Konsequenzen.“', '„Ich bin enttäuscht von dir.“'] } }] },
        { art: 'fragen', titel: 'Standort', band: ['map-pin', 'Bevor wir anfangen'], wie: 'allein', zeit: '1 Min.',
          fragen: [{ f: '0 = gar nicht, 10 = extrem. Kreise ein:', regler: ['So viel Ärger habe ich gerade', 'So sehr glaube ich, dass ich da wieder rauskomme'] }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Drei Dinge, die im Gespräch nach dem Vorfall nie vorkommen', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:ben:besorgt', name: 'Ben, 15',
          text: 'Ben hat mit zwei anderen einen Roller „geliehen“. Die Idee kam nicht von ihm. Gefahren ist er. Jetzt gibt es eine Anzeige, einen Termin, und seine Mutter redet seit vier Tagen nur das Nötigste. Der Erzieher will „darüber sprechen“. Ben sagt: „War halt so.“ Was er denkt: Jetzt bin ich endgültig der, für den mich alle halten. Dann kann ich auch gleich so weitermachen.',
          frage: 'Was ist an Bens letztem Gedanken gefährlich?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Schuld ist nicht Scham', x: 'Schuld sagt: **Ich habe etwas Schlechtes getan.** Scham sagt: **Ich bin schlecht.** Mit Schuld kann man etwas machen. Scham versteckt sich – oder schlägt zu.' },
          { t: 'Zusammen anders als allein', x: 'Mit anderen dabei gehen Jugendliche viel mehr Risiko ein. **Das meiste, was schiefgeht, passiert in der Gruppe.** Das erklärt es. Es entschuldigt es nicht.' },
          { t: 'Die meisten hören auf', x: 'Fast alle, die mit 15 Mist bauen, lassen es, bevor sie 25 sind. **Wer du heute bist, legt nicht fest, wer du dann bist.**' },
        ] },
        { art: 'clip', clip: { titel: 'Das Asch-Experiment: So manipuliert uns die Gruppe', kanal: 'Quarks', url: YT + 'I40g6U3K7hc', dauer: 'die ersten 5 Min.', frage: 'Wie viel von deinem Mist hättest du auch allein gemacht?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Wer hat den Schaden – und ==weißt du, wie es dem geht==?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Erst aufteilen, was wem gehört. Dann den Unterschied zwischen Schuld und Scham finden', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Was war meins?', wie: 'allein', zeit: '5 Min.',
          kontext: 'Nimm eine Sache, die schiefgegangen ist. Verteil **zehn Punkte** Verantwortung. Ehrlich – nicht zu viel, nicht zu wenig.',
          fragen: [{ f: 'Zusammen zehn:', preis: { erste: 'Wer', kopf: ['Punkte', 'warum'], optionen: ['ich', 'die anderen', 'die Umstände'] } }] },
        { art: 'fragen', titel: 'Schuld oder Scham?', wie: 'zusammen', zeit: '6 Min.',
          fragen: [
            { f: 'Was für ein Satz ist das?', raster: { spalten: ['Schuld', 'Scham'], zeilen: ['„Das war falsch von mir.“', '„Ich bin halt ein Krimineller.“', '„Ich will das wieder in Ordnung bringen.“', '„Aus mir wird eh nichts.“', '„Alle wissen jetzt, was ich für einer bin.“'] } },
            { f: 'Mein Satz über mich nach dem letzten Ärger:', linien: 1 },
          ] },
        { art: 'fragen', titel: 'Auch Erwachsene', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '5 Min.',
          fragen: [{ f: 'So viel, wie jeder sagen will:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Ein Mist, den ich gebaut habe', 'So habe ich es wieder hingekriegt – oder nicht'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Ein Stück zurück', x: 'Such dir **eine Sache** aus, die du kaputtgemacht hast – ein Ding, ein Vertrauen, einen Tag. Mach diese Woche einen einzigen kleinen Schritt, um sie zu reparieren. Kein großes Geständnis. Wette vorher: Wie reagiert die andere Person?' },
        { art: 'karten', karten: [
          { titel: 'Schuld statt Scham', icon: 'scale', zeilen: ['Ich habe etwas Schlechtes getan.', 'Ich **bin** nicht schlecht.', 'Was kann ich wieder in Ordnung bringen?'] },
          { titel: 'Drei Sekunden', icon: 'player-pause', zeilen: ['Würde ich das auch allein machen?', 'Wer zahlt, wenn es schiefgeht?', 'Mein Satz zum Aussteigen: „Ich bin raus.“'] },
        ] },
        { art: 'tiefe', fragen: [
          ['Welche Regel hier findest du wirklich sinnlos?', 'Wofür hast du Ärger bekommen, obwohl du es nicht warst?'],
          ['Bei wem müsstest du dich eigentlich entschuldigen?', 'Was hat dich der letzte Ärger wirklich gekostet?'],
          ['Wem hast du wehgetan – und weißt du, wie es dieser Person heute geht?', 'Was müsste passieren, damit du dir selbst verzeihst?'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Was ist der Unterschied zwischen Schuld und Scham?', o: ['Es gibt keinen.', 'Schuld: Ich habe etwas getan. Scham: Ich bin so.', 'Scham ist schlimmer bestraft.', 'Schuld haben nur Erwachsene.'], r: 1, warum: 'Mit Schuld kann man etwas tun. Scham lähmt.' },
    { f: 'Wann gehen Jugendliche mehr Risiko ein?', o: ['allein', 'wenn Gleichaltrige dabei sind', 'morgens', 'nie'], r: 1, warum: 'Die Gruppe verschiebt, was sich normal anfühlt.' },
    { f: 'Die meisten, die mit 15 Mist bauen, …', o: ['bleiben für immer dabei', 'hören bis Mitte 20 damit auf', 'werden Verbrecher', 'haben Pech'], r: 1, warum: 'Die Kurve fällt bei fast allen.' },
    { f: '„Ich bin halt so einer“ führt meistens zu …', o: ['Besserung', 'mehr vom Gleichen', 'Ruhe', 'nichts'], r: 1, warum: 'Wer sich abstempelt, hat nichts mehr zu verlieren.' },
    { f: 'Die Idee kam von anderen, gemacht hast du es. Wer trägt Verantwortung?', o: ['nur die anderen', 'alle – jeder seinen Teil', 'niemand', 'nur du'], r: 1, warum: 'Erklären ist nicht dasselbe wie entschuldigen.' },
    { f: 'Was hilft nach einem Fehler am meisten?', o: ['sich verstecken', 'einen Schritt zum Wiedergutmachen gehen', 'alles abstreiten', 'sich selbst fertigmachen'], r: 1, warum: 'Reparieren verändert, wie andere und du selbst dich sehen.' },
    { f: 'Was ist ein guter Satz zum Aussteigen?', o: ['„Ihr seid alle dumm.“', '„Ich bin raus.“', 'gar keiner', '„Macht ihr mal.“'], r: 1, warum: 'Kurz, ohne Vorwurf, ohne Erklärung.' },
    { f: 'Heißt verstehen, warum etwas passiert ist, dass es okay war?', o: ['ja', 'nein', 'manchmal', 'nur bei Kleinigkeiten'], r: 1, warum: 'Gründe erklären – die Verantwortung bleibt.' },
  ],
  begleitung: {
    fakten: [['Für wen', '13–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Gerät fürs Video'], ['Vorher', 'Eigene Pflichten klären']],
    wann: ['Nach einem Vorfall mit Folgen: Anzeige, Ausschluss, Schaden – wenn die erste Aufregung vorbei ist.', 'Der Jugendliche stempelt sich selbst ab („Bin halt kriminell“).', 'Regelverstöße in der Gruppe, bei denen er mitzieht.', 'Vor einem Termin bei Polizei, Gericht oder Jugendschutz, um die eigene Haltung zu klären.'],
    ziel: 'Der Jugendliche trennt, was er getan hat, von dem, was er ist, übernimmt seinen Anteil – nicht mehr und nicht weniger – und macht einen ersten Schritt zur Wiedergutmachung.',
    anschluss: 'Gruppendruck und Nein-Sätze stehen in REAL TALK #06.',
    ablauf: [
      ['0–8', 'Logbuch. Vor Seite 1 klarstellen: „Das ist keine Konsequenz. Und ich sage dir jetzt, was ich mit neuen Informationen tun muss.“'],
      ['8–22', 'Der Fall – Bens letzter Gedanke ist der Kern. Dann die Kästen und das Video.'],
      ['22–40', '„Was war meins?“ allein; die Punktzahl nicht korrigieren, nur nachfragen. „Schuld oder Scham?“ gemeinsam. Dann das Duell mit einer echten eigenen Geschichte.'],
      ['40–50', 'Experiment vereinbaren – der Schritt muss klein und sicher sein. Karten ausschneiden.'],
    ],
    haltung: ['Keine Empörung, keine Enttäuschung. Beides hat er schon bekommen, beides nährt die Scham.', 'Verantwortung ja, Abstempeln nein: „Das war nicht okay – und du bist mehr als das.“', 'Die Gründe ernst nehmen, ohne sie als Ausrede gelten zu lassen.', 'Ihre eigene Geschichte im Duell zeigt: Man kann Mist bauen und trotzdem jemand werden.'],
    hinweise: ['Seite 3: Zehn Punkte bei „ich“ sind genauso verdächtig wie null. Nachfragen: „Was hätten die anderen anders machen können?“', 'Seite 4: Wiedergutmachung ist ein Angebot. Die geschädigte Person muss sie nicht annehmen – das vorher besprechen.', 'Rechtliche Fragen beantwortet eine Rechtsberatung, nicht dieses Heft.'],
    achtung: 'Klären Sie vor der Stunde, was Sie mit neuen Informationen über Straftaten tun müssen, und sagen Sie es dem Jugendlichen, bevor er erzählt. In laufenden Verfahren keine Einzelheiten der Tat erfragen. Lebt die geschädigte Person im selben Haus, geht deren Schutz vor; ein Kontakt wird nur mit ihr und der zuständigen Leitung (Responsable) vorbereitet. Wird der Jugendliche von Älteren unter Druck gesetzt oder für Taten benutzt, ist das ein Schutzthema. Starke Scham kann in Selbstverletzung oder Suizidgedanken umschlagen – nachfragen.',
    hintergrund: 'Schuldgefühle gehen mit Wiedergutmachung und weniger Rückfällen einher, Scham dagegen mit Ärger, Rückzug und erneutem Fehlverhalten (Tangney et al.). In Anwesenheit Gleichaltriger gehen Jugendliche deutlich höhere Risiken ein (Gardner & Steinberg). Der größte Teil jugendlicher Regelverstöße bleibt auf die Jugend begrenzt (Moffitt). Wer als Person verurteilt statt für die Tat verantwortlich gemacht wird, übernimmt das Etikett eher; Verantwortung mit Wiederaufnahme wirkt besser (Braithwaite). Menschen, die aufhören, erzählen sich selbst als jemand, der mehr ist als seine Taten (Maruna).',
    quellen: 'Tangney, Stuewig & Mashek (2007) · Gardner & Steinberg (2005) · Moffitt (1993) · Braithwaite (1989) · Maruna (2001).',
  },
}
export default d
