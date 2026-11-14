// SOLO #09 · RAUSCH – Kiffen, Vapen, Trinken in der Einzelarbeit: ehrlich, ohne Abschreckung, ohne Anleitung.
import type { Solo } from '../solo-typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Solo = {
  id: 's09', nr: '09', datei: 'Solo-09-Rausch', reihe: 'Thema',
  thema: 'Rausch', headline: 'Wofür brauchst du es?', farbe: '#FFD60A', stand: 'November 2026',
  bild: 'peep:yusuf:neutral:laessig', sticker: 'Erst die Regeln',
  seiten: [
    {
      titel: 'Rausch', unter: '',
      bloecke: [
        { art: 'text', x: [
          'Die Abschreckungsfilme hast du gesehen. Die Lunge im Glas auch. Gewirkt hat es bei den Leuten, die sowieso nichts nehmen.',
          'Hier gibt es keine Predigt. Aber eine Sache zuerst: **Frag dein Gegenüber, was mit dem passiert, was du hier erzählst.** Wer muss was erfahren? Erst wenn du die Antwort kennst, entscheidest du, wie viel du sagst.',
        ] },
        { art: 'kasten', label: 'Bevor es losgeht', titel: 'Die Regeln deines Gegenübers', x: 'Dein Gegenüber schreibt hier ehrlich auf, was es weitersagen **muss** – und was nicht.', linien: 2 },
        { art: 'fragen', titel: 'Schon mal gehört?', band: ['ear', 'Du bist hier der Profi'], wie: 'allein', zeit: '2 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['schon gehört', 'hat geholfen'], zeilen: ['„Drogen sind gefährlich.“', '„Das ist eine Einstiegsdroge.“', '„Davon wirst du dumm.“', '„Sag einfach Nein.“', '„Du landest irgendwann auf der Straße.“'] } }] },
      ],
    },
    {
      titel: 'Der Stoff', unter: 'Was stimmt – ohne Übertreibung und ohne Verharmlosung', sticker: 'Neu?',
      bloecke: [
        { art: 'szene', bild: 'peep:yusuf:neutral', name: 'Yusuf, 16',
          text: 'Yusuf raucht abends einen, „zum Runterkommen“. Seit dem Sommer jeden Abend. Er sagt: „Ich hab’s im Griff, ich kann jederzeit aufhören.“ Letzte Woche gab es drei Tage nichts. Yusuf hat kaum geschlafen, seinen Bruder angeschrien und ist nicht zur Arbeit. Am vierten Tag war alles wieder gut. „Siehst du“, sagt Yusuf, „ohne geht es mir schlechter.“',
          frage: 'Was beweisen die drei Tage – das, was Yusuf sagt, oder das Gegenteil?' },
        { art: 'fakten', titel: 'Was kaum einer sagt', fakten: [
          { t: 'Es wirkt. Deshalb.', x: 'Niemand kifft, trinkt oder vapt, weil es nichts bringt. Es macht ruhig, mutig, lustig, zugehörig. **Die Frage ist: Wofür brauchst du es?**' },
          { t: 'Umbau bis Mitte 20', x: 'So lange wird dein Gehirn noch umgebaut. Wer früh und oft kifft, hat später häufiger Probleme mit Antrieb, Gedächtnis und Psychosen. **Je früher, je öfter, je stärker – desto mehr.**' },
          { t: 'Nikotin ist schnell', x: 'Kaum ein Stoff macht so schnell abhängig. Bei Jugendlichen können **wenige Wochen** reichen. Der süße Geschmack versteckt das nur.' },
        ] },
        { art: 'clip', clip: { titel: 'Wie schädlich ist Cannabis für das Gehirn Jugendlicher?', kanal: 'drugcom.de', url: YT + 'IbjiA_5BZ14', dauer: 'ganz schauen', frage: 'Was davon wusstest du schon – und was glaubst du nicht?' } },
        { art: 'marker', label: 'Die unbequeme Frage', x: 'Was müsstest du ==fühlen==, wenn du es eine Woche weglässt?' },
      ],
    },
    {
      titel: 'Dein Teil', unter: 'Keine Mengen, keine Namen, keine Quellen. Nur: wofür und zu welchem Preis', sticker: 'Beide antworten',
      bloecke: [
        { art: 'fragen', titel: 'Wofür eigentlich?', wie: 'allein', zeit: '5 Min.',
          kontext: 'Für dich – oder für Leute, die du kennst, wenn du selbst nichts nimmst.',
          fragen: [
            { f: 'Kreise ein:', kreis: ['runterkommen', 'einschlafen', 'dazugehören', 'Spaß', 'nichts fühlen', 'mutiger sein', 'Langeweile', 'weil es alle machen', 'weil es ohne nicht mehr geht'] },
            { f: 'Ehrlich:', satz: ['Das erledigt es wirklich gut:', 'Das erledigt es immer schlechter:'] },
          ] },
        { art: 'fragen', titel: 'Yusufs Rechnung', wie: 'zusammen', zeit: '6 Min.',
          fragen: [{ f: 'Jeden Abend einen:', preis: { erste: 'Zeitraum', kopf: ['bringt ihm', 'kostet ihn'], optionen: ['heute Abend', 'in diesem Monat', 'in zwei Jahren'] } }] },
        { art: 'fragen', titel: 'Jeder hat sein Mittel', band: ['swords', 'Duell – beide antworten'], wie: 'beide', zeit: '5 Min.',
          kontext: 'Bei deinem Gegenüber vielleicht Kaffee, Wein, Zigaretten oder das Handy.',
          fragen: [{ f: 'Ehrlich:', preis: { erste: 'Frage', kopf: ['du', 'Gegenüber'], optionen: ['Mein Mittel zum Runterkommen', 'So oft in der Woche', 'Daran würde ich merken, dass es zu viel ist'] } }] },
      ],
    },
    {
      titel: 'Mitnehmen', unter: 'Ein Experiment, zwei Karten, sechs Fragen', sticker: 'Für danach',
      bloecke: [
        { art: 'experiment', titel: 'Drei Tage Pause', x: 'Lass es **drei Tage** weg – oder das, was bei dir an der Stelle steht: Vape, Energy-Drinks. Nicht für immer. Nur als Test. Schreib jeden Abend ein Wort: Wie war der Tag ohne? Wette vorher: Welcher Tag wird der schwerste – und was sagt dir das?' },
        { art: 'karten', karten: [
          { titel: 'Vorher fragen', icon: 'help-circle', zeilen: ['Wofür will ich es gerade?', 'Was wäre die langsamere Lösung?', 'Entscheide ich – oder die Gewohnheit?'] },
          { titel: 'Notfall', icon: 'first-aid-kit', zeilen: ['Jemand ist nicht ansprechbar oder atmet komisch:', '**112.** Dableiben. Auf die Seite legen.', 'Sagen, was genommen wurde. Ärger ist egal – Zeit zählt.'] },
        ] },
        { art: 'tiefe', fragen: [
          ['Was war die dümmste Rausch-Geschichte, die du gehört hast?', 'Wer in deinem Umfeld hat es wirklich im Griff?'],
          ['Wann hast du zuletzt etwas genommen, obwohl du eigentlich nicht wolltest?', 'Was wäre in deinem Leben anders ohne?'],
          ['Wen hast du daran kaputtgehen sehen?', 'Wovor hast du Ruhe, wenn du drauf bist?'],
        ] },
        { art: 'check' },
      ],
    },
  ],
  quiz: [
    { f: 'Bis wann wird das Gehirn noch umgebaut?', o: ['bis 12', 'bis 16', 'bis Mitte 20', 'gar nicht mehr'], r: 2, warum: 'Deshalb wirken Rauschmittel in der Jugend stärker nach.' },
    { f: 'Wie schnell kann Nikotin bei Jugendlichen abhängig machen?', o: ['nach Jahren', 'schon nach wenigen Wochen', 'nie', 'nur bei Zigaretten'], r: 1, warum: 'Auch bei Vapes – der Geschmack ändert nichts am Stoff.' },
    { f: 'Früh und oft kiffen erhöht das Risiko für …', o: ['bessere Noten', 'Psychosen', 'Muskelwachstum', 'nichts'], r: 1, warum: 'Besonders bei starkem Cannabis und frühem Beginn.' },
    { f: '„Ich kann jederzeit aufhören.“ Wie prüft man das?', o: ['gar nicht', 'mit einer Pause von ein paar Tagen', 'indem man es oft sagt', 'mit einem Online-Test'], r: 1, warum: 'Was in der Pause passiert, ist die Antwort.' },
    { f: 'Jemand ist nach dem Trinken nicht mehr ansprechbar. Was tun?', o: ['ausschlafen lassen', 'kalt duschen', '112 rufen und dableiben', 'weggehen'], r: 2, warum: 'Bewusstlose können ersticken. Zeit zählt, nicht der Ärger.' },
    { f: 'Warum nehmen Menschen Rauschmittel?', o: ['weil sie nichts bringen', 'weil sie etwas bewirken, das gerade fehlt', 'nur aus Dummheit', 'nur wegen der Werbung'], r: 1, warum: 'Wer das Wofür kennt, kann nach anderen Wegen suchen.' },
    { f: 'Welches Rauschmittel richtet insgesamt den größten Schaden an?', o: ['Cannabis', 'Alkohol', 'Koffein', 'Nikotin-Kaugummi'], r: 1, warum: 'So das Ergebnis einer bekannten britischen Untersuchung.' },
    { f: 'Ohne das Mittel geht es jemandem deutlich schlechter. Das spricht …', o: ['dafür, dass es ihm guttut', 'für eine Gewöhnung', 'für gar nichts', 'für zu wenig Schlaf'], r: 1, warum: 'Siehe Yusufs drei Tage.' },
  ],
  begleitung: {
    fakten: [['Für wen', '13–17 Jahre, Einzelarbeit'], ['Dauer', '45–50 Min., teilbar'], ['Material', 'Stift, Schere, Gerät fürs Video'], ['Vorher', 'Meldepflichten klären']],
    wann: ['Konsum ist bekannt oder wird vermutet – und Verbote haben nichts verändert.', 'Der Jugendliche spricht das Thema selbst an oder prahlt damit.', 'Rauschmittel dienen erkennbar einem Zweck: schlafen, runterkommen, dazugehören.', 'Auch vorbeugend, wenn das Umfeld konsumiert.'],
    ziel: 'Der Jugendliche benennt, welche Aufgabe das Mittel für ihn erfüllt und was es ihn kostet. Eine Abstinenzzusage ist nicht das Ziel dieser Stunde.',
    ablauf: [
      ['0–8', 'Logbuch. Dann zuerst den Kasten auf Seite 1 ausfüllen: Schreiben Sie selbst hinein, was Sie weitergeben müssen. Ohne diese Klarheit ist der Rest wertlos.'],
      ['8–22', 'Der Fall – die Frage ist eine echte Denkaufgabe. Dann die Kästen und das Video.'],
      ['22–40', '„Wofür eigentlich?“ allein, „Yusufs Rechnung“ gemeinsam (den Gewinn ernsthaft aufschreiben), dann das Duell mit Ihrem eigenen Mittel.'],
      ['40–50', 'Experiment anbieten, nicht verlangen. Karten ausschneiden – die Notfall-Karte in jedem Fall.'],
    ],
    haltung: ['Nicht konfrontieren, nicht überzeugen. Wer argumentiert, bringt den Jugendlichen dazu, den Konsum zu verteidigen.', 'Zwiespalt ist der Normalfall: „Es hilft mir“ und „es nervt mich“ dürfen nebeneinanderstehen.', 'Keine Mengen, Bezugsquellen oder Namen erfragen. Sie brauchen sie nicht, und der Jugendliche prüft genau das.', 'Ihr eigenes Mittel im Duell ehrlich nennen.'],
    hinweise: ['Seite 1: Meldepflichten und Hausregeln vorher mit der zuständigen Leitung klären, damit Ihre Auskunft stimmt.', 'Seite 4: Die Pause ist ein Test, kein Entzug. Bei täglichem starkem Alkohol- oder Beruhigungsmittelkonsum nie ohne ärztliche Begleitung absetzen.', 'Wer nichts nimmt, bearbeitet das Heft über „Leute, die ich kenne“ – oder über Energy-Drinks und Vapes.'],
    achtung: 'Konsum ist oft Selbstbehandlung von Schlafproblemen, Anspannung, ADHS-Beschwerden oder traumatischen Erinnerungen – dann fachliche Abklärung anregen. Sofort ärztlich abklären lassen: Stimmenhören, Verfolgungsgefühle, tagelange Schlaflosigkeit, Mischkonsum, Konsum bis zur Bewusstlosigkeit. Schulden, Dealen und Druck durch Ältere sind Schutzthemen und gehören zur zuständigen Leitung (Responsable). Beratung für Jugendliche und Prävention gibt es in Luxemburg bei spezialisierten Stellen (z. B. Impuls von Solidarité Jeunes, CNAPA) – aktuelle Kontaktdaten prüfen.',
    extra: [{ titel: 'Psychose: Wie gefährlich ist Cannabis?', kanal: 'Quarks', url: YT + 'hc_QTrjhYpo', dauer: 'Reportage', frage: 'Hintergrund zum Zusammenhang von Cannabis und Psychosen.' }],
    hintergrund: 'Regelmäßiger Cannabiskonsum in der Jugend hängt mit Einbußen bei Lernen und Gedächtnis sowie einem erhöhten Psychoserisiko zusammen, vor allem bei frühem Beginn, täglichem Konsum und hohem THC-Gehalt (Volkow et al.; Di Forti et al.). Erste Zeichen von Nikotinabhängigkeit können bei Jugendlichen innerhalb von Wochen nach Beginn gelegentlichen Konsums auftreten (DiFranza et al.). Gemessen am Gesamtschaden steht Alkohol an erster Stelle (Nutt et al.). Viele Menschen konsumieren, um belastende Zustände zu regulieren (Khantzian). Offenes Nachfragen nach eigenen Gründen wirkt besser als Konfrontation (Miller & Rollnick).',
    quellen: 'Volkow et al. (2014) · Di Forti et al. (2019) · DiFranza et al. (2007) · Nutt et al. (2010) · Khantzian (1997) · Miller & Rollnick (2013).',
  },
}
export default d
