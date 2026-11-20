// Vie et société · Modul 7 (5P) „Lernen und arbeiten“ – nach dem MENJE-Rahmenlehrplan „Leben und Gesellschaft“, 9. Klasse:
// Themenfeld „Leben, Lernen, Arbeit“ (Bildung und Ausbildung; Einstiege in die Arbeitswelt) und „Begegnungen mit
// verschiedenen Religionen: Islam“.
// Ethische Sicht auf Bildung und Arbeit (Recht auf Bildung, Sinn und Würde der Arbeit, Ehrenamt, gerechter Lohn,
// Arbeitslosigkeit). Praktisches (Bewerbung, Lohnzettel, Rechte in der Lehre) steht in Deutsch M6/M9 und Culture générale M7.
// Keine Fragen nach der eigenen Familie oder dem eigenen Geld; Zahlen gerundet, mit Stand.
import { sachModul } from './sachfach-gemeinsam.mjs'

export const MODUL = sachModul('vieso', 7, {
  titel: 'Lernen und arbeiten',
  titelFr: 'Apprendre et travailler',
  unter: 'Bildung als Recht für alle, wozu wir arbeiten, warum jeder Beruf zählt, Arbeit ohne Lohn, gerechter Lohn, wenn die Arbeit fehlt – und der Islam: Glaube, Moschee und Vielfalt.',
  unterFr: 'Le droit à l’éducation, le sens du travail, le bénévolat, le salaire juste, le chômage – et l’islam.',
  farbe: '#7a4fb0',
  deckbild: ['tom:froh:stehen', 'amira:froh:stehen-zeigen', 'noah:froh:laptop'],
  blasen: [{ t: 'Ich mache eine Lehre!', x: 6, y: 104 }, { t: 'Jeder Beruf zählt.', x: 126, y: 92 }, { t: 'Frag mich!', x: 170, y: 150 }],
  aussprache: { 'Service National de la Jeunesse': 'Sörwiss Nassjonal dö la Schönäss', 'Maison de l’orientation': 'Mäsong dö Lorjangtassjong', '\\bUN-': 'U-N-', '\\bADEM\\b': 'Adem', '\\bDAP\\b': 'De A Pe', '\\bSNJ\\b': 'Es En Jott', 'Yousafzai': 'Jusafsai', '\\bCCP\\b': 'Ze Ze Pe' },
  themen: [
    { titel: { de: 'Lernen', fr: 'Apprendre' }, icon: 'school', lektionen: 1 },
    { titel: { de: 'Arbeiten', fr: 'Travailler' }, icon: 'tool', lektionen: 5 },
    { titel: { de: 'Islam', fr: 'Islam' }, icon: 'building-mosque', lektionen: 2 },
  ],
})

const FRAGE = '#7a4fb0', DILEMMA = '#6d4bc4', IDEE = '#2f8a6b', ARBEIT = '#c26a2e', GLAUBE = '#2f8a6b'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Bildung · Recht auf Bildung', titel: 'Bildung öffnet Türen', untertitel: 'Lernen ist ein Recht – aber nicht für alle Kinder selbstverständlich. Du liest, warum Bildung so wichtig ist, lernst Malala kennen und hörst einen Mann, der mit 40 Jahren lesen gelernt hat.',
    ziel: { de: 'Ich erkläre, warum Bildung ein Menschenrecht ist und was Bildung möglich macht.', fr: 'J’explique pourquoi l’éducation est un droit humain et ce qu’elle rend possible.' },
    bild: ['noah:froh:stehen', 'lina:froh:blatt'],
    start: {
      was: 'Was kann man lernen?',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was kann man alles lernen – in der Schule und außerhalb? Sammle.', stufe: 1, mitte: 'Lernen', aeste: ['lesen und schreiben', { l: 'ein Handwerk' }, { l: 'Sprachen' }, { l: 'kochen' }, { l: 'Streit lösen' }, { l: 'ein Instrument' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen gerundet, Stand 2025', titel: 'Ein Recht für alle',
      absaetze: [
        'Jedes Kind hat ein **Recht auf Bildung**. So steht es in der Allgemeinen Erklärung der Menschenrechte und in der UN-Kinderrechtskonvention. Bildung heißt nicht nur Schule: Man lernt in der Familie, im Verein, in der Lehre, im Internet – ein ganzes Leben lang.',
        '### Warum ist Bildung so wichtig?',
        'Wer lesen, schreiben und rechnen kann, findet leichter eine **Arbeit**, versteht Verträge und Nachrichten und kann bei Wahlen **mitbestimmen**. Gebildete Menschen sind im Durchschnitt **gesünder**. Bildung hilft, Armut zu überwinden.',
        '### Nicht für alle selbstverständlich',
        'Trotzdem gehen weltweit **mehr als 250 Millionen** Kinder und Jugendliche nicht zur Schule. Die Gründe: Armut, Krieg, Kinderarbeit, zu weite Wege. Oft trifft es **Mädchen** besonders.',
        '### Malala',
        'Das Mädchen **Malala Yousafzai** aus Pakistan setzte sich dafür ein, dass Mädchen zur Schule gehen dürfen. 2012, mit 15 Jahren, wurde sie deshalb angeschossen. Sie überlebte und kämpfte weiter. 2014 bekam sie als jüngster Mensch den **Friedensnobelpreis**. Ihr bekanntester Satz: „Ein Kind, ein Lehrer, ein Buch und ein Stift können die Welt verändern.“',
      ],
      woerter: [['die Bildung', 'l’éducation'], ['das Recht', 'le droit'], ['der Durchschnitt', 'la moyenne'], ['überwinden', 'surmonter'], ['selbstverständlich', 'évident, normal'], ['sich einsetzen für', 's’engager pour'], ['anschießen', 'tirer sur qn'], ['der Friedensnobelpreis', 'le prix Nobel de la paix']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Wo steht, dass jedes Kind ein Recht auf Bildung hat?', l: 'in der Allgemeinen Erklärung der Menschenrechte und in der UN-Kinderrechtskonvention' }, { f: 'Nenne drei Dinge, die Bildung möglich macht.', zeilen: 2, l: 'leichter Arbeit finden, Verträge und Nachrichten verstehen, mitbestimmen, gesünder leben, Armut überwinden' }, { f: 'Warum gehen viele Kinder nicht zur Schule?', l: 'Armut, Krieg, Kinderarbeit, zu weite Wege' }] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Malala setzte sich für die Bildung von Mädchen ein.', true], ['Sie gab nach dem Angriff auf.', false], ['Sie bekam 2014 den Friedensnobelpreis.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Schulradio', titel: 'Lesen lernen mit 40',
      situation: 'Noah interviewt Herrn Faber. Er hat erst als Erwachsener richtig lesen und schreiben gelernt.',
      bild: ['noah:froh:handy', 'vater:froh:stehen'], sprecher: { Noah: 'm3', 'Herr Faber': 'm1' },
      text: [
        ['Noah', 'Herr Faber, Sie haben erst mit 40 richtig lesen gelernt. Wie kam das?'],
        ['Herr Faber', 'Als Kind war ich oft krank und habe viel verpasst. Irgendwann habe ich mich nicht mehr getraut zu sagen, dass ich es nicht kann. Ich habe mich durchgemogelt.'],
        ['Noah', 'Wie geht das?'],
        ['Herr Faber', 'Ich habe gesagt: „Ich habe meine Brille vergessen.“ Formulare hat meine Frau ausgefüllt. Auf der Baustelle habe ich mir alles gemerkt. Aber ich hatte immer Angst, dass es jemand merkt.'],
        ['Noah', 'Und was hat sich geändert?'],
        ['Herr Faber', 'Meine Tochter kam in die Schule. Sie wollte, dass ich ihr vorlese. Da habe ich mich bei einem Kurs für Erwachsene angemeldet. Es war schwer, aber die Lehrerin hat mich nie ausgelacht.'],
        ['Noah', 'Und heute?'],
        ['Herr Faber', 'Heute lese ich ihr jeden Abend vor. Und ich lese Zeitung! Ich habe gelernt: Für Lernen ist es nie zu spät. Und man muss sich nicht schämen, wenn man Hilfe braucht.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „sich durchmogeln“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['mit kleinen Tricks so tun, als könnte man etwas', 'sehr fleißig lernen'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne Herrn Fabers Geschichte.', stufe: 1, teile: ['Als Kind war er oft krank und hat viel verpasst.', 'Er hat sich mit Tricks durchgemogelt.', 'Seine Tochter wollte, dass er ihr vorliest.', 'Er hat einen Kurs für Erwachsene gemacht.', 'Heute liest er vor und liest Zeitung.'], ordnung: [3, 0, 4, 1, 2] },
        { art: 'fragen', auftrag: 'Was hat Herr Faber gelernt?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Für Lernen ist es nie zu spät, und man muss sich nicht schämen, wenn man Hilfe braucht.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was hat Herrn Faber Mut gemacht? Was macht euch Mut, etwas Neues zu lernen?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ihm hat geholfen, dass …', 'Mir hilft beim Lernen …', 'Ich würde gern noch lernen …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Recht auf Bildung', punkte: ['steht in den **Menschenrechten** und **Kinderrechten**', 'Bildung hilft bei **Arbeit**, **Gesundheit**, **Mitbestimmen**', 'weltweit **über 250 Millionen** Kinder ohne Schule'] },
         { titel: 'Lernen', punkte: ['nicht nur in der **Schule**', 'ein **ganzes Leben** lang', 'für Lernen ist es **nie zu spät**', 'Hilfe holen ist **keine Schande**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Hindernis-Karten: Jede Karte zeigt, warum ein Kind nicht zur Schule geht. Überlegt in Gruppen: Was könnte helfen? Schreibt es auf die Karte.', stufe: 3, neueSeite: true, titel: 'Was hilft?', icon: 'door-enter', farbe: FRAGE, spalten: 2,
        karten: [
          { text: 'Aisha muss jeden Morgen zwei Stunden Wasser holen.', linien: 2 },
          { text: 'Pedros Familie braucht sein Geld aus der Arbeit auf dem Feld.', linien: 2 },
          { text: 'Die Schule in Leylas Stadt wurde im Krieg zerstört.', linien: 2 },
          { text: 'Ravi spricht die Sprache nicht, in der unterrichtet wird.', linien: 2 },
          { text: 'Grace soll nicht zur Schule, „weil Mädchen sowieso heiraten“.', linien: 2 },
          { text: 'Die Schule ist zwei Stunden zu Fuß entfernt.', linien: 2 },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Das Wichtigste fürs Leben lernt man nicht in der Schule.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe Malala einen kurzen Brief: Was beeindruckt dich an ihr? Was bedeutet Bildung für dich?', stufe: 2,
        anfaenge: ['Liebe Malala,', 'mich beeindruckt, dass …', 'Für mich bedeutet Bildung …', 'Ich wünsche mir, dass …'], zeilen: 7,
        beispiel: 'Liebe Malala, mich beeindruckt, dass du nach dem Angriff nicht aufgegeben hast. Ich hätte wahrscheinlich große Angst gehabt. Für mich bedeutet Bildung, dass ich später einen Beruf lernen kann, der mir Spaß macht. Ich wünsche mir, dass alle Kinder auf der Welt in eine Schule gehen können.' },
    ],
    check: ['Ich erkläre das Recht auf Bildung.', 'Ich nenne Gründe, warum Kinder nicht zur Schule gehen.', 'Ich weiß: Für Lernen ist es nie zu spät.'],
  },
  // ================================================================ 2
  {
    thema: 'Arbeit · Sinn · Motivation', titel: 'Wozu arbeiten wir?', untertitel: 'Nur fürs Geld? Du denkst darüber nach, was Arbeit Menschen gibt, hörst drei Menschen von ihrem Job erzählen und findest heraus, was dir bei der Arbeit wichtig ist.',
    ziel: { de: 'Ich erkläre, was Arbeit Menschen gibt, und nenne, was mir bei einer Arbeit wichtig ist.', fr: 'J’explique ce que le travail apporte aux gens et ce qui est important pour moi dans un travail.' },
    bild: ['lio:froh:handy', 'aerztin:froh:stehen'],
    start: {
      was: 'Warum arbeiten?',
      aufgaben: [
        { art: 'mc', auftrag: 'Warum arbeiten Menschen? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['um Geld zu verdienen', 'weil es Spaß machen kann', 'um andere Menschen zu treffen', 'um etwas Sinnvolles zu tun', 'weil sie gelobt werden wollen'], r: [0, 1, 2, 3, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Text zum Nachdenken', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Text zum Nachdenken (vereinfacht)', titel: 'Mehr als Geld',
      absaetze: [
        'Erwachsene verbringen einen großen Teil ihres Lebens bei der Arbeit. Natürlich arbeiten die meisten, um **Geld** zu verdienen: für Wohnung, Essen, Freizeit. Aber Arbeit gibt noch mehr.',
        '### Was Arbeit gibt',
        '**Struktur**: Der Tag hat einen festen Rhythmus. **Kontakte**: Man trifft Kolleginnen und Kollegen, oft entstehen Freundschaften. **Anerkennung**: Andere sehen, was man kann. **Sinn**: Man spürt, dass man gebraucht wird – zum Beispiel, wenn ein Patient sich bedankt oder ein Haus fertig ist, an dem man mitgebaut hat.',
        '### Last oder Freude?',
        'Arbeit kann auch **anstrengend** sein: früh aufstehen, Stress, ein schwieriger Chef. Ob Arbeit eher Last oder Freude ist, hängt oft von den **Bedingungen** ab: Ist der Lohn fair? Ist man sicher? Wird man respektvoll behandelt?',
        '### Zur Arbeit passen',
        'Menschen sind verschieden. Die eine arbeitet gern draußen, der andere am Computer. Manche wollen anderen helfen, andere lieber etwas bauen. Wer weiß, was ihm wichtig ist, findet leichter eine Arbeit, die **zu ihm passt**.',
      ],
      woerter: [['verdienen', 'gagner (de l’argent)'], ['die Struktur', 'la structure'], ['der Rhythmus', 'le rythme'], ['der Kollege', 'le collègue'], ['gebraucht werden', 'être utile'], ['anstrengend', 'fatigant'], ['die Last', 'la charge, le fardeau'], ['passen zu', 'convenir à']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was gibt die Arbeit hier? Verbinde.', stufe: 2, links: ['„Ich stehe jeden Tag um 6 Uhr auf, dann weiß ich, was zu tun ist.“', '„Mit meinen Kollegen gehe ich auch am Wochenende Fußball spielen.“', '„Mein Chef hat gesagt, ohne mich würde es nicht laufen.“', '„Wenn eine alte Dame lächelt, weiß ich, wofür ich das mache.“'], rechts: ['Struktur', 'Kontakte', 'Anerkennung', 'Sinn'] },
      ],
    },
    hoeren: {
      was: 'Ein Podcast', wo: 'Podcast „Mein Job“', titel: 'Drei Menschen, drei Jobs',
      situation: 'Lio macht einen Podcast. Er fragt drei Menschen, was sie an ihrer Arbeit mögen – und was schwer ist.',
      bild: ['lio:froh:handy', 'verkaeuferin:froh:stehen'], sprecher: { Lio: 'm3', Bäckerin: 'w1', Pfleger: 'm1', Informatikerin: 'w2' },
      text: [
        ['Lio', 'Erste Frage an die Bäckerin: Was mögen Sie an Ihrer Arbeit?'],
        ['Bäckerin', 'Den Duft am frühen Morgen! Und wenn Stammkunden sagen: „Ihr Brot ist das beste.“ Schwer ist das Aufstehen um drei Uhr. Ich gehe abends sehr früh schlafen.'],
        ['Lio', 'Und Sie, als Pfleger im Krankenhaus?'],
        ['Pfleger', 'Ich mag, dass ich jeden Tag gebraucht werde. Wenn jemand nach einer Operation wieder lacht, ist das ein tolles Gefühl. Schwer sind die Nachtschichten. Und wenn jemand stirbt, nehme ich das manchmal mit nach Hause.'],
        ['Lio', 'Und zum Schluss die Informatikerin.'],
        ['Informatikerin', 'Ich löse gern knifflige Probleme. Und ich kann oft von zu Hause aus arbeiten. Aber genau das ist manchmal auch schwer: Ich vermisse meine Kollegen. Darum gehe ich zweimal pro Woche ins Büro.'],
        ['Lio', 'Spannend: Alle drei mögen etwas anderes. Aber alle wissen genau, warum sie ihren Job machen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine „Nachtschicht“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Arbeit in der Nacht', 'eine Schicht im Kuchen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Das mag sie oder er', 'Das ist schwer'], breiten: [24, 38, 38], zeilen: [['Bäckerin', '[Duft am Morgen; Lob der Stammkunden]', '[Aufstehen um drei Uhr]'], ['Pfleger', '[jeden Tag gebraucht werden]', '[Nachtschichten; wenn jemand stirbt]'], ['Informatikerin', '[knifflige Probleme lösen; von zu Hause arbeiten]', '[vermisst die Kollegen]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welcher der drei Jobs würde euch am ehesten gefallen? Warum?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mir würde … gefallen, weil …', 'Für mich wäre schwer, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Was Arbeit gibt', punkte: ['**Geld**', '**Struktur** (fester Tagesablauf)', '**Kontakte**', '**Anerkennung**', '**Sinn**: gebraucht werden'] },
         { titel: 'Gute Arbeit', punkte: ['**fairer Lohn**', '**Sicherheit**', '**Respekt**', 'eine Arbeit, die **zu mir passt**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Werte-Karten: Was ist dir bei einer Arbeit am wichtigsten? Schneide die Karten aus, wähle deine Top 3 und lege sie in eine Reihenfolge. Vergleiche mit deinem Nachbarn.', stufe: 2, neueSeite: true, titel: 'Mir ist wichtig …', icon: 'star', farbe: ARBEIT, spalten: 4,
        karten: [
          { text: '**viel Geld verdienen**' }, { text: '**nette Kollegen**' }, { text: '**mit den Händen arbeiten**' }, { text: '**draußen arbeiten**' },
          { text: '**anderen helfen**' }, { text: '**eine sichere Stelle**' }, { text: '**kreativ sein**' }, { text: '**feste Arbeitszeiten**' },
          { text: '**Verantwortung tragen**' }, { text: '**Abwechslung**' }, { text: '**gelobt werden**' }, { text: '**kurzer Arbeitsweg**' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Was ist für dich eine gute Arbeit? Beschreibe sie mit deinen Top-3-Werten.', stufe: 2,
        anfaenge: ['Eine gute Arbeit ist für mich …', 'Am wichtigsten ist mir …, weil …', 'Außerdem …', 'Nicht so wichtig ist mir …'], zeilen: 7,
        beispiel: 'Eine gute Arbeit ist für mich eine Arbeit, bei der ich mit den Händen etwas schaffe. Am wichtigsten ist mir, dass ich nette Kollegen habe, weil man gemeinsam alles leichter schafft. Außerdem möchte ich eine sichere Stelle. Nicht so wichtig ist mir, ob ich sehr viel verdiene.' },
    ],
    check: ['Ich nenne, was Arbeit Menschen gibt.', 'Ich erkläre, was eine gute Arbeit ausmacht.', 'Ich kenne meine eigenen Werte für die Arbeit.'],
  },
  // ================================================================ 3
  {
    thema: 'Berufe · Würde · Vorurteile', titel: 'Jeder Beruf zählt', untertitel: 'Ohne Müllabfuhr, Pflegekräfte und Handwerk läuft nichts. Du denkst über die Würde aller Berufe nach, prüfst Vorurteile über die Lehre und hörst Tom, der stolz auf seine Ausbildung ist.',
    ziel: { de: 'Ich erkläre, warum alle Berufe wichtig sind, und widerspreche Vorurteilen über Berufe.', fr: 'J’explique pourquoi tous les métiers sont importants et je réfute les préjugés sur les métiers.' },
    bild: ['tom:stolz:stehen', 'chloe:ueberrascht:stehen'],
    start: {
      was: 'Eine Woche ohne …',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Stell dir vor: Eine Woche lang kommt keine Müllabfuhr. Was passiert?', stufe: 1, mitte: 'keine Müllabfuhr', aeste: ['Mülltonnen quellen über', { l: 'es stinkt' }, { l: 'Ratten' }, { l: 'Krankheiten' }, { l: 'Müll auf der Straße' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Die unsichtbaren Heldinnen und Helden',
      absaetze: [
        'Im Frühling 2020, während der Corona-Pandemie, blieben viele Menschen zu Hause. Doch manche mussten weiterarbeiten: Kassiererinnen, Pflegekräfte, Müllwerker, Lkw-Fahrer, Reinigungskräfte. Plötzlich sahen alle: **Ohne sie läuft nichts.** Menschen klatschten auf ihren Balkonen Beifall.',
        '### Wenig Ansehen, wenig Lohn',
        'Trotzdem haben gerade diese Berufe oft wenig **Ansehen** und keinen hohen Lohn. Manche Menschen schauen auf sie herab. Dabei hat **jede ehrliche Arbeit ihre Würde**.',
        '### Ein Vorurteil: „Nur eine Lehre“',
        'Manche sagen: „Eine Lehre machen nur die, die nicht studieren können.“ Das stimmt nicht. Handwerkerinnen, Mechatroniker oder Köche werden in Luxemburg dringend gesucht. Nach einer Lehre mit **DAP** kann man sich weiterbilden, zum Beispiel zum **Meister** oder zur Meisterin, und sogar einen eigenen Betrieb führen. Viele Wege stehen offen.',
        '### Was zählt',
        'Ob jemand Ärztin ist oder Bäcker: Wichtig ist, dass man seine Arbeit **gut** und **gewissenhaft** macht. Darauf kann man stolz sein.',
      ],
      woerter: [['unsichtbar', 'invisible'], ['der Beifall', 'les applaudissements'], ['das Ansehen', 'le prestige'], ['herabschauen auf', 'mépriser'], ['die Würde', 'la dignité'], ['die Lehre', 'l’apprentissage'], ['der Meister', 'le maître artisan'], ['gewissenhaft', 'consciencieux']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 2, fragen: [{ f: 'Was haben viele Menschen während der Corona-Pandemie gemerkt?', zeilen: 2, l: 'Dass ohne Kassiererinnen, Pflegekräfte, Müllwerker und andere nichts läuft.' }, { f: 'Warum stimmt das Vorurteil „nur eine Lehre“ nicht?', zeilen: 2, l: 'Handwerker werden dringend gesucht; nach der Lehre kann man sich weiterbilden, Meister werden und einen eigenen Betrieb führen.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Bushaltestelle', titel: '„Nur“ eine Lehre?',
      situation: 'Chloé trifft Tom, der seit September eine Lehre als Mechatroniker macht.',
      bild: ['tom:stolz:stehen', 'chloe:verwirrt:stehen'], sprecher: { Chloé: 'w3', Tom: 'm3' },
      text: [
        ['Chloé', 'Tom! Ich habe gehört, du gehst nicht mehr aufs Lyzeum? Du machst nur eine Lehre?'],
        ['Tom', 'Nur? Ich mache eine Lehre als Mechatroniker. Ich bin drei Tage im Betrieb und zwei Tage in der Schule.'],
        ['Chloé', 'Sorry, so habe ich das nicht gemeint. Und, gefällt es dir?'],
        ['Tom', 'Total. Gestern habe ich mit meinem Ausbilder eine Maschine repariert, die die ganze Fabrik lahmgelegt hatte. Als sie wieder lief, haben alle geklatscht.'],
        ['Chloé', 'Cool. Aber verdienst du da schon was?'],
        ['Tom', 'Ja, eine Lehrlingsentschädigung. Und mein Ausbilder sagt, Mechatroniker werden überall gesucht. Später will ich den Meister machen.'],
        ['Chloé', 'Mein Onkel ist Elektriker-Meister. Er hat eine eigene Firma mit zwölf Leuten.'],
        ['Tom', 'Siehst du. Und weißt du was? In der Schule war ich oft unsicher. Im Betrieb merke ich jeden Tag: Ich kann was.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Lehrlingsentschädigung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['das Geld, das man während der Lehre bekommt', 'eine Strafe'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Tom ist zwei Tage im Betrieb und drei Tage in der Schule.', false], ['Tom hat eine Maschine repariert, die die Fabrik lahmgelegt hatte.', true], ['Tom bekommt kein Geld für seine Lehre.', false], ['Tom will später den Meister machen.', true], ['Im Betrieb merkt Tom, dass er etwas kann.', true]] },
        { art: 'fragen', auftrag: 'Warum ärgert sich Tom über das Wort „nur“?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Weil es so klingt, als wäre eine Lehre weniger wert. Er ist stolz auf seine Ausbildung.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Vorurteile über Berufe habt ihr schon gehört? Was antwortet ihr darauf?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Manche sagen: „…“', 'Ich antworte: …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Jeder Beruf zählt', punkte: ['viele wichtige Berufe sind **unsichtbar**', 'jede ehrliche Arbeit hat **Würde**', 'stolz sein auf **gute** und **gewissenhafte** Arbeit'] },
         { titel: 'Die Lehre', punkte: ['Betrieb **und** Schule', '**Lehrlingsentschädigung**', 'Abschluss: **DAP** (oder CCP)', 'danach weiterbilden: z. B. **Meister**, eigener Betrieb'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Ohne sie läuft nichts: Schreibt auf jede Karte, was ohne diesen Beruf passieren würde. Hängt die Karten im Klassenraum auf.', stufe: 2, neueSeite: true, titel: 'Ohne sie …', icon: 'tool', farbe: ARBEIT, spalten: 3,
        karten: [
          { text: '**Ohne Müllwerker …**', linien: 2 }, { text: '**Ohne Pflegekräfte …**', linien: 2 }, { text: '**Ohne Busfahrerinnen …**', linien: 2 },
          { text: '**Ohne Bäcker …**', linien: 2 }, { text: '**Ohne Reinigungskräfte …**', linien: 2 }, { text: '**Ohne Elektrikerinnen …**', linien: 2 },
          { text: '**Ohne Landwirte …**', linien: 2 }, { text: '**Ohne Erzieherinnen …**', linien: 2 }, { text: '**Ohne Mechatroniker …**', linien: 2 },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Ein Studium ist mehr wert als eine Lehre.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Dankesbrief an eine Berufsgruppe, die oft übersehen wird.', stufe: 2,
        anfaenge: ['Liebe …,', 'jeden Tag sorgt ihr dafür, dass …', 'Ohne euch …', 'Danke, dass …'], zeilen: 7,
        beispiel: 'Liebe Reinigungskräfte unserer Schule, jeden Tag sorgt ihr dafür, dass wir in sauberen Klassen sitzen. Ihr kommt, wenn wir schon weg sind, und deshalb sehen wir euch fast nie. Ohne euch würde es hier schnell schmutzig und ungemütlich. Danke, dass ihr so gute Arbeit macht. Wir versuchen ab jetzt, weniger Dreck zu machen!' },
    ],
    check: ['Ich erkläre, warum jeder Beruf zählt.', 'Ich widerspreche Vorurteilen über die Lehre.', 'Ich kenne Wege nach der Lehre.'],
  },
  // ================================================================ 4
  {
    thema: 'Ehrenamt · Engagement', titel: 'Arbeit ohne Lohn', untertitel: 'Feuerwehr, Fußballtrainer, Pfadfinder: Viele Menschen arbeiten freiwillig und ohne Geld. Du lernst, was ein Ehrenamt ist, hörst Yusuf von der Jugendfeuerwehr und überlegst, wo du dich engagieren könntest.',
    ziel: { de: 'Ich erkläre, was ein Ehrenamt ist und was es Menschen und der Gesellschaft bringt.', fr: 'J’explique ce qu’est le bénévolat et ce qu’il apporte aux gens et à la société.' },
    bild: ['yusuf:stolz:stehen', 'lina:froh:stehen'],
    start: {
      was: 'Wer bekommt keinen Lohn?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wer arbeitet oft ohne Lohn? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['die freiwillige Feuerwehrfrau', 'der Trainer im Fußballverein', 'die Leiterin bei den Pfadfindern', 'der Kassierer im Supermarkt', 'die Helferin im Tierheim'], r: [0, 1, 2, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Unbezahlt – aber unbezahlbar',
      absaetze: [
        'Ein **Ehrenamt** ist eine Arbeit, die man **freiwillig** und **ohne Lohn** macht – für andere oder für eine gute Sache. In Luxemburg engagieren sich sehr viele Menschen: in Sport- und Musikvereinen, bei den Pfadfindern, beim Roten Kreuz, im Tierheim oder in der Gemeinde.',
        '### Ohne Freiwillige ginge es nicht',
        'Die **meisten Feuerwehrleute** in Luxemburg sind Freiwillige. Wenn der Alarm kommt, lassen sie alles stehen und helfen. Schon Kinder und Jugendliche können bei der **Jugendfeuerwehr** mitmachen. Auch viele Vereine gäbe es ohne Ehrenamtliche nicht.',
        '### Was bringt ein Ehrenamt?',
        'Man **hilft** anderen und erlebt **Gemeinschaft**. Man lernt Neues: Verantwortung tragen, im Team arbeiten, Erste Hilfe. Man bekommt **Anerkennung** – und Erfahrungen, die auch bei einer Bewerbung gut aussehen.',
        '### Auch für Jugendliche',
        'Über den **Service National de la Jeunesse (SNJ)** können Jugendliche und junge Erwachsene einen **Freiwilligendienst** machen, in Luxemburg oder im Ausland. Aber auch kleine Dinge zählen: einem Nachbarn beim Einkaufen helfen, Nachhilfe geben, beim Schulfest mithelfen.',
      ],
      woerter: [['das Ehrenamt', 'le bénévolat'], ['freiwillig', 'volontaire, bénévole'], ['sich engagieren', 's’engager'], ['der Verein', 'l’association, le club'], ['die Pfadfinder', 'les scouts'], ['der Alarm', 'l’alarme'], ['die Gemeinschaft', 'la communauté'], ['der Freiwilligendienst', 'le service volontaire']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Was ist ein Ehrenamt?', l: 'eine Arbeit, die man freiwillig und ohne Lohn für andere oder eine gute Sache macht' }, { f: 'Nenne drei Dinge, die ein Ehrenamt einem selbst bringt.', zeilen: 2, l: 'Gemeinschaft, Neues lernen (Verantwortung, Teamarbeit, Erste Hilfe), Anerkennung, Erfahrungen für die Bewerbung' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pause · Schulhof', titel: 'Wenn der Pieper geht',
      situation: 'Yusuf ist seit drei Jahren bei der Jugendfeuerwehr. Lina will wissen, was er dort macht.',
      bild: ['yusuf:stolz:stehen', 'lina:aufgeregt:stehen'], sprecher: { Lina: 'w3', Yusuf: 'm3' },
      text: [
        ['Lina', 'Yusuf, was macht ihr eigentlich bei der Jugendfeuerwehr? Löscht ihr echte Brände?'],
        ['Yusuf', 'Nein, zu echten Einsätzen dürfen wir noch nicht. Wir üben: Schläuche ausrollen, Knoten, Erste Hilfe. Und wir lernen, wie man sich im Notfall richtig verhält.'],
        ['Lina', 'Klingt nach viel Arbeit. Und du bekommst kein Geld dafür?'],
        ['Yusuf', 'Nein. Aber ich bekomme etwas anderes. Letzten Monat ist im Bus ein Mann umgekippt. Ich wusste sofort, was zu tun ist: 112 anrufen, stabile Seitenlage. Der Busfahrer hat mir danach die Hand geschüttelt.'],
        ['Lina', 'Wow. Hattest du keine Angst?'],
        ['Yusuf', 'Doch, mein Herz hat gerast. Aber das Üben hilft. Und in der Gruppe sind wir wie eine zweite Familie. Wir zelten im Sommer zusammen.'],
        ['Lina', 'Darf man da einfach mitmachen?'],
        ['Yusuf', 'Klar. Komm am Samstag mit zur Übung. Mädchen sind bei uns genauso willkommen. Unsere beste Knotenmacherin ist ein Mädchen!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Einsatz“ bei der Feuerwehr? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['wenn die Feuerwehr zu einem echten Notfall fährt', 'eine Pause'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu. Was übt die Jugendfeuerwehr? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Schläuche ausrollen', 'Knoten', 'Erste Hilfe', 'echte Brände löschen', 'richtig verhalten im Notfall'], r: [0, 1, 2, 4] }] },
        { art: 'fragen', auftrag: 'Was hat Yusuf im Bus gemacht? Was bekommt er statt Geld?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Er hat 112 angerufen und den Mann in die stabile Seitenlage gebracht. Er bekommt Anerkennung, Können, Mut und eine Gemeinschaft.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Kennt ihr Vereine oder Gruppen in eurer Gemeinde, bei denen man mitmachen kann?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Jugendfeuerwehr', 'Pfadfinder', 'Sportverein', 'Musikverein', 'Jugendhaus', 'Tierheim'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ehrenamt', punkte: ['**freiwillig**, **ohne Lohn**', 'für andere oder eine **gute Sache**', 'in Luxemburg z. B. **Feuerwehr**, Vereine, Pfadfinder, Rotes Kreuz'] },
         { titel: 'Was es bringt', punkte: ['anderen **helfen**', '**Gemeinschaft**', 'Neues **lernen**', '**Anerkennung** und Erfahrung', 'Freiwilligendienst über den **SNJ**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Engagement-Börse: Jede Karte ist ein Angebot. Notiert: Was bringt es anderen? Was bringt es mir? Welches Angebot würdet ihr wählen?', stufe: 2, neueSeite: true, titel: 'Mitmachen!', icon: 'heart-handshake', farbe: IDEE, spalten: 2,
        karten: [
          { text: '**Jugendfeuerwehr:** Samstags üben, im Sommer Zeltlager.', linien: 2, frage: 'Bringt anderen / mir: …' },
          { text: '**Tierheim:** Mit Hunden spazieren gehen, Käfige sauber machen.', linien: 2, frage: 'Bringt anderen / mir: …' },
          { text: '**Lern-Buddy:** Einmal pro Woche einem jüngeren Schüler bei den Hausaufgaben helfen.', linien: 2, frage: 'Bringt anderen / mir: …' },
          { text: '**Seniorenheim:** Mit alten Menschen Karten spielen und erzählen.', linien: 2, frage: 'Bringt anderen / mir: …' },
          { text: '**Müllsammelaktion:** Mit der Gemeinde den Bach und den Wald sauber machen.', linien: 2, frage: 'Bringt anderen / mir: …' },
          { text: '**Sportverein:** Beim Training der Kleinen helfen.', linien: 2, frage: 'Bringt anderen / mir: …' },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Alle Jugendlichen sollten ein Jahr lang einen Freiwilligendienst machen.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Anzeige für ein Ehrenamt, das du dir ausdenkst: Was sucht ihr? Was macht man? Was bekommt man dafür (außer Geld)?', stufe: 2,
        anfaenge: ['Wir suchen …', 'Du hilfst …', 'Dafür bekommst du …', 'Melde dich bei …'], zeilen: 7,
        beispiel: 'Wir suchen Jugendliche, die gern mit Tieren arbeiten! Du hilfst uns im Tierheim jeden Samstagmorgen: Hunde ausführen, Futter verteilen, Katzen streicheln. Dafür bekommst du ein tolles Team, viel Tierliebe und eine Bescheinigung für deine Bewerbung. Melde dich bei Frau Ricci im Tierheim.' },
    ],
    check: ['Ich erkläre, was ein Ehrenamt ist.', 'Ich nenne, was ein Ehrenamt bringt.', 'Ich kenne Möglichkeiten, mich zu engagieren.'],
  },
  // ================================================================ 5
  {
    thema: 'Lohn · Gerechtigkeit', titel: 'Was ist gerecht bezahlt?', untertitel: 'Warum verdient ein Fußballstar mehr als eine Pflegerin? Du lernst, wovon Löhne abhängen, denkst über Gerechtigkeit nach und ordnest Berufe danach, wer am meisten verdienen sollte.',
    ziel: { de: 'Ich erkläre, wovon Löhne abhängen, und begründe meine Meinung zu gerechten Löhnen.', fr: 'J’explique de quoi dépendent les salaires et je justifie mon opinion sur un salaire juste.' },
    bild: ['noah:verwirrt:stehen', 'lea:froh:erklaeren'],
    start: {
      was: 'Schätzfrage',
      aufgaben: [
        { art: 'mc', auftrag: 'Wer verdient in Luxemburg im Durchschnitt mehr? Kreuze an.', stufe: 1, fragen: [{ f: 'eine Bankdirektorin oder ein Krankenpfleger?', o: ['die Bankdirektorin', 'der Krankenpfleger'], r: 0 }, { f: 'Sollte das so sein?', o: ['ja', 'nein', 'weiß nicht'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Wer verdient was – und warum?',
      absaetze: [
        'Löhne sind sehr verschieden. Wovon hängen sie ab?',
        '### Was den Lohn bestimmt',
        '**Ausbildung**: Wer lange gelernt hat, verdient oft mehr. **Verantwortung**: Wer viele Menschen führt oder große Entscheidungen trifft, bekommt meist mehr. **Angebot und Nachfrage**: Wenn viele Firmen dringend jemanden suchen, steigt der Lohn. **Verhandlungen**: Gewerkschaften handeln für viele Berufe Löhne aus, die in einem **Kollektivvertrag** festgeschrieben werden.',
        '### Regeln in Luxemburg',
        'Luxemburg hat einen der höchsten **Mindestlöhne** in Europa. Niemand darf weniger bezahlen. Wer eine abgeschlossene Ausbildung hat, bekommt einen höheren Mindestlohn. Und es gilt: **Gleicher Lohn für gleiche Arbeit** – egal ob Frau oder Mann.',
        '### Ist das gerecht?',
        'Viele finden es ungerecht, dass Pflegekräfte, die Leben retten, viel weniger verdienen als manche Fußballstars. Man kann Gerechtigkeit unterschiedlich sehen: Soll bekommen, wer **viel leistet**? Wer **viel braucht**? Oder sollen **alle gleich** viel bekommen? Darüber streiten Menschen seit Jahrhunderten.',
      ],
      woerter: [['der Lohn', 'le salaire'], ['die Verantwortung', 'la responsabilité'], ['die Nachfrage', 'la demande'], ['die Gewerkschaft', 'le syndicat'], ['aushandeln', 'négocier'], ['der Kollektivvertrag', 'la convention collective'], ['der Mindestlohn', 'le salaire minimum'], ['leisten', 'accomplir, fournir']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Warum verdient sie oder er mehr? Verbinde.', stufe: 2, links: ['Die Ärztin hat sechs Jahre studiert.', 'Der Chef führt 200 Mitarbeiter.', 'Elektriker werden dringend gesucht.', 'Die Gewerkschaft hat höhere Löhne ausgehandelt.'], rechts: ['Ausbildung', 'Verantwortung', 'Angebot und Nachfrage', 'Verhandlungen'] },
        { art: 'tabelle', auftrag: 'Welche Sicht auf Gerechtigkeit ist das? Kreuze an.', stufe: 3, kopf: ['', 'Leistung', 'Bedarf', 'Gleichheit'], breiten: [52, 16, 16, 16], zeilen: [['„Wer härter arbeitet, soll mehr bekommen.“', '[x]', '', ''], ['„Eine Mutter mit vier Kindern braucht mehr.“', '', '[x]', ''], ['„Jede Stunde Arbeit ist gleich viel wert.“', '', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Eine Diskussion', wo: 'Klasse 5P2 · Gehalts-Spiel', titel: 'Wer soll am meisten verdienen?',
      situation: 'Die Klasse hat Berufskarten nach dem Lohn geordnet. Noah und Lea sind sich nicht einig.',
      bild: ['noah:wuetend:verschraenkt', 'lea:froh:erklaeren'], sprecher: { Noah: 'm3', Lea: 'w3', Lehrerin: 'w1' },
      text: [
        ['Noah', 'Ich finde, der Fußballprofi soll am meisten verdienen. Er hat jahrelang trainiert, und Millionen Menschen schauen ihm zu.'],
        ['Lea', 'Und die Pflegerin? Sie arbeitet nachts, rettet Leben und trägt riesige Verantwortung.'],
        ['Noah', 'Aber Pflegerin kann fast jeder werden. So gut Fußball spielen können nur ganz wenige.'],
        ['Lea', 'Fast jeder? Das ist eine harte Ausbildung! Und ohne Pflegekräfte bricht das Krankenhaus zusammen. Ohne Fußball nicht.'],
        ['Lehrerin', 'Ihr argumentiert beide mit Gerechtigkeit – aber mit verschiedenen Maßstäben. Noah sagt: seltenes Können und Leistung. Lea sagt: Wichtigkeit für die Gesellschaft.'],
        ['Noah', 'Okay. Vielleicht sollte die Pflegerin mehr verdienen als jetzt. Aber nicht mehr als der Fußballer.'],
        ['Lea', 'Damit kann ich leben. Ein Kompromiss!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Maßstab“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas, womit man misst oder bewertet', 'ein Stab im Garten'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Argumente bringen Noah und Lea?', stufe: 1, kopf: ['Noah', 'Lea'], breiten: [50, 50], zeilen: [['[jahrelang trainiert]', '[arbeitet nachts, rettet Leben]'], ['[Millionen schauen zu]', '[riesige Verantwortung]'], ['[nur wenige können so gut Fußball spielen]', '[ohne Pflege bricht das Krankenhaus zusammen]']] },
        { art: 'fragen', auftrag: 'Worauf einigen sich Noah und Lea am Ende?', stufe: 2, fragen: [{ f: '', l: 'Die Pflegerin soll mehr verdienen als jetzt, aber nicht mehr als der Fußballer.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welcher Maßstab ist euch wichtiger: Leistung, Bedarf, Gleichheit oder Wichtigkeit für die Gesellschaft?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Mir ist … am wichtigsten, weil …', 'Ein Problem dabei ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Der Lohn hängt ab von …', punkte: ['**Ausbildung**', '**Verantwortung**', '**Angebot und Nachfrage**', '**Verhandlungen** (Gewerkschaft, Kollektivvertrag)'] },
         { titel: 'Gerechtigkeit', punkte: ['**Mindestlohn** in Luxemburg', '**gleicher Lohn** für gleiche Arbeit', 'Maßstäbe: **Leistung**, **Bedarf**, **Gleichheit**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Gehalts-Spiel: Schneidet die Berufskarten aus. Legt sie in eine Reihe: Wer sollte am meisten verdienen, wer am wenigsten? Begründet mit einem Maßstab. Vergleicht dann mit der Wirklichkeit (Lehrperson).', stufe: 3, neueSeite: true, titel: 'Wer soll was verdienen?', icon: 'coins', farbe: ARBEIT, spalten: 3,
        karten: [
          { text: '**Pflegerin**' }, { text: '**Fußballprofi**' }, { text: '**Bankdirektorin**' },
          { text: '**Müllwerker**' }, { text: '**Lehrer**' }, { text: '**Influencerin**' },
          { text: '**Bäcker**' }, { text: '**Ärztin**' }, { text: '**Bauarbeiter**' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Sollten Pflegekräfte mehr verdienen? Schreibe deine Meinung mit zwei Argumenten und einem Gegenargument.', stufe: 3,
        anfaenge: ['Ich finde, …', 'Erstens …', 'Zweitens …', 'Manche sagen …, aber …', 'Deshalb …'], zeilen: 8,
        beispiel: 'Ich finde, Pflegekräfte sollten mehr verdienen. Erstens tragen sie große Verantwortung für das Leben von Menschen. Zweitens arbeiten sie nachts, am Wochenende und an Feiertagen. Manche sagen, dafür ist kein Geld da, aber die Gesundheit sollte uns das wert sein. Deshalb sollten die Löhne in der Pflege steigen, damit mehr junge Menschen diesen Beruf lernen.' },
    ],
    check: ['Ich nenne, wovon Löhne abhängen.', 'Ich kenne Mindestlohn und „gleicher Lohn für gleiche Arbeit“.', 'Ich begründe meine Meinung mit einem Maßstab.'],
  },
  // ================================================================ 6
  {
    thema: 'Arbeitslosigkeit · Abbruch · Hilfe', titel: 'Wenn die Arbeit fehlt', untertitel: 'Arbeit verlieren oder die Lehre abbrechen kann jedem passieren. Du lernst, was Arbeitslosigkeit für Menschen bedeutet, wer hilft, und hörst Marc, der nach einem Abbruch neu angefangen hat.',
    ziel: { de: 'Ich beschreibe, was Arbeitslosigkeit bedeutet, und kenne Stellen, die helfen.', fr: 'Je décris ce que signifie le chômage et je connais des services qui aident.' },
    bild: ['vater:besorgt:stehen', 'lehrerin:ruhig:erklaeren'],
    start: {
      was: 'Was ändert sich?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was kann sich ändern, wenn jemand seine Arbeit verliert? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['weniger Geld', 'Sorgen', 'kein fester Tagesablauf mehr', 'weniger Kontakt zu Kollegen', 'man schämt sich vielleicht'], r: [0, 1, 2, 3, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen gerundet, Stand 2025', titel: 'Ohne Arbeit',
      absaetze: [
        'In Luxemburg sind etwa **6 von 100** Menschen, die arbeiten möchten, **arbeitslos**. Bei jungen Menschen sind es deutlich mehr. Die Gründe sind verschieden: Eine Firma schließt, Maschinen ersetzen Arbeit, jemand wird krank, oder es fehlt ein passender Abschluss.',
        '### Mehr als Geld',
        'Arbeitslos zu sein ist **nicht nur** ein Geldproblem. Viele Menschen verlieren ihren Tagesrhythmus, ihre Kollegen und das Gefühl, gebraucht zu werden. Manche schämen sich oder werden traurig. Dabei gilt: **Arbeitslosigkeit kann jedem passieren.** Wer arbeitslos ist, ist nicht „faul“.',
        '### Wer hilft?',
        'Die **ADEM**, die Arbeitsagentur in Luxemburg, hilft bei der Suche nach einer Stelle und bietet Kurse an. Für eine bestimmte Zeit gibt es **Arbeitslosengeld**. Für Jugendliche gibt es besondere Hilfe: In der **Maison de l’orientation** bekommt man Beratung zu Schule, Ausbildung und Beruf.',
        '### Abbrechen ist kein Ende',
        'Manche Jugendliche brechen die Schule oder die Lehre ab. Das ist schwer, aber **kein Ende**. Wichtig ist, nicht allein zu bleiben und schnell **Hilfe zu holen**: bei Lehrkräften, beim SePAS, beim SNJ oder in der Maison de l’orientation.',
      ],
      woerter: [['arbeitslos', 'au chômage'], ['die Arbeitslosigkeit', 'le chômage'], ['ersetzen', 'remplacer'], ['der Abschluss', 'le diplôme'], ['die Arbeitsagentur', 'l’agence pour l’emploi'], ['das Arbeitslosengeld', 'les indemnités de chômage'], ['die Beratung', 'le conseil'], ['abbrechen', 'abandonner, interrompre']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Nenne drei Gründe für Arbeitslosigkeit.', zeilen: 2, l: 'Firma schließt, Maschinen ersetzen Arbeit, Krankheit, kein passender Abschluss' }, { f: 'Warum ist Arbeitslosigkeit mehr als ein Geldproblem?', zeilen: 2, l: 'Man verliert Tagesrhythmus, Kollegen und das Gefühl, gebraucht zu werden; manche schämen sich oder werden traurig.' }] },
        { art: 'zuordnen', auftrag: 'Wer hilft wobei? Verbinde.', stufe: 1, links: ['ADEM', 'Maison de l’orientation', 'SePAS'], rechts: ['Stellensuche, Kurse, Arbeitslosengeld', 'Beratung zu Schule, Ausbildung und Beruf', 'psychosozialer Dienst in der Schule'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Beratungsstelle', titel: 'Zweiter Anlauf',
      situation: 'Marc ist 19. Er hat seine erste Lehre abgebrochen. Heute spricht er mit seiner Beraterin über das letzte Jahr.',
      bild: ['vater:froh:stehen', 'lehrerin:froh:erklaeren'], sprecher: { Beraterin: 'w1', Marc: 'm2' },
      text: [
        ['Beraterin', 'Marc, vor einem Jahr saßt du hier und hast gesagt: „Ich bin ein Versager.“ Erinnerst du dich?'],
        ['Marc', 'Ja. Ich hatte die Lehre als Koch abgebrochen. Ich bin morgens nicht mehr aufgestanden. Meine Freunde hatten alle Arbeit, nur ich nicht. Ich habe mich total geschämt.'],
        ['Beraterin', 'Was hat dir geholfen?'],
        ['Marc', 'Dass Sie mich gefragt haben, was ich eigentlich gut kann – und nicht, was schiefgelaufen ist. Mir ist aufgefallen: Ich arbeite gern mit Holz.'],
        ['Beraterin', 'Und dann?'],
        ['Marc', 'Dann habe ich ein Praktikum bei einem Schreiner gemacht. Zwei Wochen. Der Chef hat mich danach gefragt, ob ich die Lehre bei ihm machen will.'],
        ['Beraterin', 'Und jetzt bist du im zweiten Lehrjahr.'],
        ['Marc', 'Ja. Und ich stehe jeden Morgen um sechs auf – freiwillig! Ich habe gelernt: Ein Abbruch ist kein Ende. Man braucht nur jemanden, der einem hilft, den richtigen Weg zu finden.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Versager“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['jemand, der denkt, er schafft nichts', 'ein Gewinner'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne Marcs Weg.', stufe: 1, teile: ['Marc bricht die Lehre als Koch ab.', 'Er schämt sich und steht morgens nicht mehr auf.', 'Die Beraterin fragt, was er gut kann.', 'Er macht ein Praktikum bei einem Schreiner.', 'Er beginnt eine Lehre als Schreiner.'], ordnung: [2, 4, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Was hat Marc am meisten geholfen?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Dass die Beraterin gefragt hat, was er gut kann, und nicht, was schiefgelaufen ist.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was würdet ihr einem Freund sagen, der die Lehre abbrechen will?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Bevor du abbrichst, …', 'Rede doch mal mit …', 'Was genau ist schwierig?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Arbeitslosigkeit', punkte: ['in Luxemburg etwa **6 von 100** (Stand 2025)', 'mehr als ein Geldproblem: **Rhythmus**, **Kontakte**, **Selbstwert**', 'kann **jedem** passieren'] },
         { titel: 'Hilfe', punkte: ['**ADEM**: Stellensuche, Kurse, Arbeitslosengeld', '**Maison de l’orientation**: Beratung', 'in der Schule: **SePAS**', 'ein Abbruch ist **kein Ende**'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Wer arbeitslos ist, ist selbst schuld.'] },
      { art: 'dilemma', auftrag: 'Was würdest du tun? Denk über alle Möglichkeiten nach.', stufe: 3,
        geschichte: ['Dein bester Freund macht eine Lehre als Maurer. Er sagt: „Mein Chef schreit dauernd, und mir tut alles weh. Ich höre morgen auf.“'],
        frage: 'Was rätst du ihm?',
        optionen: ['„Hör auf, du findest schon was anderes.“', '„Halt durch, das gehört dazu.“', '„Lass uns erst mit jemandem reden – dem Lehrer in der Berufsschule oder einer Beratung.“'],
        hinweis: 'Gute Antworten nehmen die Probleme ernst und suchen Hilfe, bevor man etwas beendet. Schreien und Schmerzen sind nicht normal – darüber muss man reden.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe Marc vor einem Jahr eine Nachricht: Was hättest du ihm gesagt, als er sich als „Versager“ fühlte?', stufe: 2,
        anfaenge: ['Hey Marc,', 'du bist kein Versager, weil …', 'Ich glaube, du kannst gut …', 'Rede doch mal mit …'], zeilen: 7,
        beispiel: 'Hey Marc, du bist kein Versager, nur weil die erste Lehre nicht gepasst hat. Viele Menschen brauchen mehrere Anläufe. Ich glaube, du kannst gut mit den Händen arbeiten, das habe ich bei dir schon oft gesehen. Rede doch mal mit der Maison de l’orientation. Die helfen dir, etwas Neues zu finden. Ich komme mit, wenn du willst.' },
    ],
    check: ['Ich beschreibe, was Arbeitslosigkeit bedeutet.', 'Ich kenne Stellen, die helfen.', 'Ich weiß: Ein Abbruch ist kein Ende.'],
  },
  // ================================================================ 7
  {
    thema: 'Religionen kennenlernen · Islam', titel: 'Der Islam', untertitel: 'Ein Gott, ein Prophet, ein heiliges Buch, fünf Säulen: Du lernst die zweitgrößte Religion der Welt kennen und besuchst mit einer Klasse eine Moschee.',
    ziel: { de: 'Ich beschreibe wichtige Merkmale des Islam und begegne ihm mit Respekt.', fr: 'Je décris des caractéristiques importantes de l’islam et je le respecte.' },
    bild: ['sami:froh:stehen-zeigen', 'lina:froh:stehen'],
    start: {
      was: 'Was weißt du schon?',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was weißt du schon über den Islam? Sammle.', stufe: 1, mitte: 'Islam', aeste: ['Moschee', { l: 'Koran' }, { l: 'Ramadan' }, { l: 'Mekka' }, { l: 'beten' }, { l: 'Zuckerfest' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen gerundet', titel: 'Hingabe an Gott',
      absaetze: [
        'Das arabische Wort **Islam** bedeutet „Hingabe an Gott“. Mit rund **2 Milliarden** Gläubigen ist der Islam die zweitgrößte Religion der Welt. Musliminnen und Muslime glauben an **einen Gott**, auf Arabisch **Allah**.',
        '### Der Prophet und der Koran',
        'Der Prophet **Mohammed** lebte etwa von 570 bis 632 in **Mekka** und Medina, im heutigen Saudi-Arabien. Muslime glauben, dass Gott ihm durch den Engel Gabriel seine Botschaft offenbart hat. Diese steht im **Koran**, dem heiligen Buch des Islam. Auch Abraham, Mose und Jesus sind im Islam wichtige Propheten.',
        '### Die fünf Säulen',
        'Fünf Pflichten tragen den Glauben wie Säulen ein Haus. Die erste ist das **Glaubensbekenntnis**: „Es gibt keinen Gott außer Gott, und Mohammed ist sein Gesandter.“ Dazu kommen das **Gebet** fünfmal am Tag in Richtung Mekka, die **Abgabe** für Arme (Zakat) und das **Fasten** im Monat **Ramadan**, von der Morgendämmerung bis zum Sonnenuntergang. Die fünfte Säule ist die **Pilgerfahrt** nach Mekka, einmal im Leben, wenn man gesund ist und es sich leisten kann.',
        '### Die Moschee',
        'Das Gotteshaus heißt **Moschee**. Am Freitagmittag treffen sich viele zum gemeinsamen Gebet. Der **Imam** leitet das Gebet.',
      ],
      woerter: [['die Hingabe', 'la soumission, le dévouement'], ['der Prophet', 'le prophète'], ['offenbaren', 'révéler'], ['die Säule', 'le pilier'], ['das Glaubensbekenntnis', 'la profession de foi'], ['fasten', 'jeûner'], ['die Pilgerfahrt', 'le pèlerinage'], ['die Moschee', 'la mosquée']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Die fünf Säulen: Verbinde.', stufe: 1, links: ['Glaubensbekenntnis', 'Gebet', 'Zakat', 'Fasten', 'Pilgerfahrt'], rechts: ['„Es gibt keinen Gott außer Gott …“', 'fünfmal am Tag in Richtung Mekka', 'Abgabe für Arme', 'im Ramadan bis zum Sonnenuntergang', 'einmal im Leben nach Mekka'] },
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Islam bedeutet „[Hingabe] an Gott“.', 'Der Prophet des Islam heißt [Mohammed].', 'Das heilige Buch heißt [Koran].', 'Das Gotteshaus heißt [Moschee].'] },
      ],
    },
    hoeren: {
      was: 'Eine Führung', wo: 'Besuch in einer Moschee in Luxemburg', titel: 'Schuhe aus, bitte!',
      situation: 'Die Klasse besucht eine Moschee. Der Imam führt sie herum. Sami war schon oft hier, Lina zum ersten Mal.',
      bild: ['lehrer:froh:erklaeren', 'lina:ueberrascht:stehen'], sprecher: { Imam: 'm1', Lina: 'w3', Sami: 'm3' },
      text: [
        ['Imam', 'Herzlich willkommen! Bevor wir in den Gebetsraum gehen, ziehen wir bitte die Schuhe aus. Hier wird auf dem Teppich gebetet, er soll sauber bleiben.'],
        ['Lina', 'Warum gibt es hier keine Bilder an den Wänden?'],
        ['Imam', 'In Moscheen gibt es keine Bilder von Menschen oder Tieren. Niemand soll beim Beten abgelenkt werden. Stattdessen seht ihr Muster und schöne Schrift: Verse aus dem Koran auf Arabisch.'],
        ['Lina', 'Und was ist diese Nische in der Wand?'],
        ['Imam', 'Das ist der Mihrab. Er zeigt die Richtung nach Mekka. Dorthin wenden sich alle beim Gebet.'],
        ['Sami', 'Und vor dem Gebet waschen wir uns: Hände, Mund, Nase, Gesicht, Arme und Füße. Dafür gibt es den Waschraum.'],
        ['Lina', 'Darf ich beim Gebet zuschauen?'],
        ['Imam', 'Gern, wenn ihr leise seid. Und ihr dürft auch Fragen stellen. Fragen ist immer besser als Vorurteile.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine „Nische“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Vertiefung in einer Wand', 'ein Fenster'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum zieht man die Schuhe aus?', l: 'Man betet auf dem Teppich, er soll sauber bleiben.' }, { f: 'Warum gibt es keine Bilder von Menschen oder Tieren?', l: 'Niemand soll beim Beten abgelenkt werden.' }, { f: 'Was zeigt der Mihrab?', l: 'die Richtung nach Mekka' }, { f: 'Was waschen Muslime vor dem Gebet?', l: 'Hände, Mund, Nase, Gesicht, Arme und Füße' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Vergleicht: Was ist in einer Moschee ähnlich wie in einer Kirche oder Synagoge, was ist anders?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['In beiden …', 'In der Moschee …, in der Kirche …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Islam', punkte: ['Glaube an **einen Gott** (Allah)', 'Prophet **Mohammed**, Stadt **Mekka**', 'heiliges Buch: **Koran**', 'Gotteshaus: **Moschee**, Leiter des Gebets: **Imam**'] },
         { titel: 'Die fünf Säulen', nummern: true, punkte: ['**Glaubensbekenntnis**', '**Gebet** (fünfmal am Tag)', '**Abgabe** für Arme (Zakat)', '**Fasten** im Ramadan', '**Pilgerfahrt** nach Mekka'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Begriffs-Karten: Schneidet die Karten aus. Eine Person zieht eine Karte und erklärt den Begriff, ohne ihn zu sagen. Die anderen raten.', stufe: 2, neueSeite: true, titel: 'Erklär mal!', icon: 'message-circle', farbe: GLAUBE, spalten: 3,
        karten: [
          { text: '**Koran**' }, { text: '**Moschee**' }, { text: '**Ramadan**' },
          { text: '**Mekka**' }, { text: '**Imam**' }, { text: '**Gebetsteppich**' },
          { text: '**Zuckerfest**' }, { text: '**Minarett**' }, { text: '**Prophet**' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Steckbrief „Der Islam“ für ein Plakat, wie beim Christentum und Judentum.', stufe: 2,
        anfaenge: ['Glaube: …', 'Wichtige Person: …', 'Heilige Schrift: …', 'Gotteshaus: …', 'Wichtige Feste: …', 'Fünf Säulen: …'], zeilen: 7,
        beispiel: 'Glaube: an einen Gott (Allah). Wichtige Person: der Prophet Mohammed, der von etwa 570 bis 632 lebte. Heilige Schrift: der Koran. Gotteshaus: Moschee. Wichtige Feste: Zuckerfest am Ende des Ramadan und Opferfest. Fünf Säulen: Glaubensbekenntnis, Gebet, Abgabe für Arme, Fasten, Pilgerfahrt.' },
    ],
    check: ['Ich beschreibe wichtige Merkmale des Islam.', 'Ich nenne die fünf Säulen.', 'Ich weiß, wie man sich in einer Moschee verhält.'],
  },
  // ================================================================ 8
  {
    thema: 'Islam heute · Vielfalt · Vorurteile', titel: 'Viele Wege, ein Glaube', untertitel: 'Nicht alle Muslime sind gleich – so wenig wie alle Christen. Du prüfst Vorurteile, lernst die Vielfalt im Islam kennen und hörst zwei Jugendliche, die auf die Fragen antworten, die man ihnen oft stellt.',
    ziel: { de: 'Ich beschreibe die Vielfalt im Islam, unterscheide Islam und Islamismus und frage respektvoll.', fr: 'Je décris la diversité de l’islam, je distingue islam et islamisme et je pose des questions avec respect.' },
    bild: ['amira:froh:stehen', 'yusuf:froh:laessig'],
    start: {
      was: 'Stimmt das?',
      aufgaben: [
        { art: 'rf', auftrag: 'Was stimmt? Kreuze an.', stufe: 1, saetze: [['Alle Muslime sind Araber.', false], ['Das Land mit den meisten Muslimen ist Indonesien.', true], ['Alle muslimischen Frauen tragen ein Kopftuch.', false], ['Auch in Luxemburg leben viele Musliminnen und Muslime.', true]] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen gerundet, Stand 2026', titel: 'Vielfalt statt Vorurteil',
      absaetze: [
        'Muslime leben auf allen Kontinenten. Die meisten leben in **Asien**, das Land mit den meisten Muslimen ist **Indonesien**. Nur etwa **jeder fünfte** Muslim ist Araber.',
        '### Viele Richtungen',
        'Wie im Christentum gibt es im Islam verschiedene **Richtungen**. Die meisten Muslime sind **Sunniten**, eine kleinere Gruppe sind **Schiiten**. Und auch innerhalb dieser Gruppen leben Menschen ihren Glauben sehr unterschiedlich: Manche beten fünfmal am Tag, andere selten. Manche Frauen tragen ein Kopftuch, viele nicht.',
        '### Islam in Luxemburg',
        'Auch in Luxemburg leben viele Musliminnen und Muslime, zum Beispiel mit Wurzeln in Bosnien, Montenegro, Nordafrika oder der Türkei. Seit 2015 hat der Staat eine **Vereinbarung** mit der muslimischen Gemeinschaft, wie mit anderen Religionsgemeinschaften auch.',
        '### Islam ist nicht Islamismus',
        '**Islamismus** ist eine politische Ideologie. Kleine extremistische Gruppen missbrauchen die Religion und rechtfertigen damit sogar Gewalt und Terror. Die **allermeisten** Muslime lehnen das ab – und sind selbst oft Opfer dieser Gewalt. Wer alle Muslime wegen dieser Gruppen verurteilt, handelt **ungerecht** und **diskriminierend**.',
      ],
      woerter: [['die Richtung', 'le courant, la branche'], ['der Sunnit / der Schiit', 'le sunnite / le chiite'], ['die Wurzeln', 'les racines'], ['die Vereinbarung', 'la convention'], ['die Ideologie', 'l’idéologie'], ['missbrauchen', 'abuser de, détourner'], ['rechtfertigen', 'justifier'], ['ablehnen', 'rejeter']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 2, fragen: [{ f: 'Wo leben die meisten Muslime?', l: 'in Asien (das Land mit den meisten Muslimen ist Indonesien)' }, { f: 'Nenne zwei Richtungen im Islam.', l: 'Sunniten und Schiiten' }, { f: 'Was ist der Unterschied zwischen Islam und Islamismus?', zeilen: 2, l: 'Islam ist eine Religion. Islamismus ist eine politische Ideologie kleiner Gruppen, die die Religion missbrauchen; die allermeisten Muslime lehnen sie ab.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Podcast', wo: 'Schulpodcast „Frag uns!“', titel: 'Fragen, die man uns oft stellt',
      situation: 'Amira und Yusuf sind beide Muslime. In ihrem Podcast beantworten sie Fragen, die sie oft hören – mit Humor.',
      bild: ['amira:froh:handy', 'yusuf:froh:laessig'], sprecher: { Amira: 'w2', Yusuf: 'm3' },
      text: [
        ['Amira', 'Frage eins: „Ist dir unter dem Kopftuch im Sommer nicht heiß?“ Ehrlich? Manchmal schon. Aber euch ist in Jeans auch heiß, oder?'],
        ['Yusuf', 'Frage zwei an mich: „Darfst du Weihnachten feiern?“ Also: Ich feiere nicht religiös. Aber ich gehe gern auf den Weihnachtsmarkt, und mit meinen Freunden wichteln wir. Das mache ich sehr gern!'],
        ['Amira', 'Frage drei: „Seid ihr alle gleich streng?“ Nein! Yusuf und ich sind beide Muslime, aber ganz verschieden. Ich bete fünfmal am Tag. Yusuf …'],
        ['Yusuf', '… eher am Freitag und wenn meine Oma zu Besuch ist. Und Amira trägt Kopftuch, meine Schwester nicht. Unser Glaube ist trotzdem echt.'],
        ['Amira', 'Frage vier, die nervigste: „Warum zwingen dich deine Eltern dazu?“ Niemand zwingt mich. Das habe ich selbst entschieden.'],
        ['Yusuf', 'Unser Tipp: Fragt ruhig! Aber fragt mit echtem Interesse, nicht mit einem fertigen Urteil im Kopf.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „wichteln“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['sich gegenseitig kleine, geheime Geschenke machen', 'zusammen beten'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wer ist das: Amira oder Yusuf? Kreuze an.', stufe: 1, kopf: ['', 'Amira', 'Yusuf'], breiten: [64, 18, 18], zeilen: [['betet fünfmal am Tag', '[x]', ''], ['geht gern auf den Weihnachtsmarkt', '', '[x]'], ['trägt ein Kopftuch', '[x]', ''], ['betet eher am Freitag', '', '[x]']] },
        { art: 'fragen', auftrag: 'Was ist der Tipp von Amira und Yusuf?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Ruhig fragen – aber mit echtem Interesse, nicht mit einem fertigen Urteil im Kopf.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Fragen hört ihr oft über euch (über eure Sprache, Herkunft, Hobbys, Religion …)? Welche nerven, welche sind okay? Nur erzählen, wenn ihr wollt.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mich fragt man oft …', 'Das nervt, weil …', 'Okay finde ich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Vielfalt im Islam', punkte: ['die meisten Muslime leben in **Asien**', 'Richtungen: **Sunniten**, **Schiiten**', 'Glauben wird **verschieden** gelebt', 'in Luxemburg: **Vereinbarung** mit dem Staat seit 2015'] },
         { titel: 'Islam ≠ Islamismus', punkte: ['**Islamismus**: politische Ideologie kleiner Gruppen', 'die **allermeisten** Muslime lehnen Gewalt ab', 'alle verurteilen = **Diskriminierung**', '**fragen** statt verurteilen'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Respektvoll fragen: Auf jeder Karte steht eine Frage mit Vorurteil. Schreibt sie so um, dass sie respektvoll und offen ist.', stufe: 3, neueSeite: true, titel: 'Frag mich – aber richtig', icon: 'message-question', farbe: FRAGE, spalten: 2,
        karten: [
          { text: '„Warum zwingen dich deine Eltern zum Kopftuch?“', linien: 2, frage: 'Besser: …' },
          { text: '„Ihr Muslime feiert ja kein Weihnachten, oder?“', linien: 2, frage: 'Besser: …' },
          { text: '„Hungerst du im Ramadan nicht total? Das ist doch ungesund.“', linien: 2, frage: 'Besser: …' },
          { text: '„Woher kommst du wirklich?“', linien: 2, frage: 'Besser: …' },
          { text: '„Darfst du überhaupt einen Freund haben?“', linien: 2, frage: 'Besser: …' },
          { text: '„Ihr seid doch alle gleich.“', linien: 2, frage: 'Besser: …' },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Religion ist Privatsache.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Was hast du in diesen zwei Lektionen über den Islam gelernt? Was hat dich überrascht? Welche Frage hast du noch?', stufe: 2,
        anfaenge: ['Ich habe gelernt, dass …', 'Überrascht hat mich, dass …', 'Ich würde gern noch wissen, …'], zeilen: 7,
        beispiel: 'Ich habe gelernt, dass die meisten Muslime in Asien leben und nicht in Arabien. Überrascht hat mich, dass Amira und Yusuf beide Muslime sind und ihren Glauben ganz unterschiedlich leben. Ich habe auch verstanden, dass Islam und Islamismus nicht dasselbe sind. Ich würde gern noch wissen, wie das Zuckerfest gefeiert wird.' },
    ],
    check: ['Ich beschreibe die Vielfalt im Islam.', 'Ich unterscheide Islam und Islamismus.', 'Ich stelle Fragen respektvoll.'],
  },
]
