// LEKTIONSQUELLE (Stand vor der Prüfung am 26.11.2026). Die Module culge-m1 … m9 setzen sich nach dem Programm CULGE VP
// (CNES, 30/06/2026) aus diesen Lektionen zusammen – siehe culge-module.mjs. Das MODUL unten wird nicht mehr benutzt.
// Culture générale · Modul 7 (5P) – Schwerpunkt Geschichte, Demokratie, Arbeitswelt
// (MENJE-Leitfaden Voie de préparation: Module 1, 4, 7). Themen: Stahl und Minett, Einwanderung, Luxemburg im Zweiten
// Weltkrieg (behutsam, ohne Gewaltdetails), Demokratie und Gewaltenteilung, Rechte von Jugendlichen (Stand 2026),
// Regeln in der Arbeitswelt, der erste Lohn (ausgedachte Zahlen), Berufe im Wandel. Personen der Dialoge: ausgedacht.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { luxKarte } from './karten.mjs'
import { balken, gewaltenteilung } from './sach-bilder.mjs'

export const MODUL = sachModul('culge', 7, {
  titel: 'Luxemburg im Wandel – Demokratie und Arbeit',
  titelFr: 'Le Luxembourg en mutation – démocratie et travail',
  unter: 'Vom Stahl im Minett über die Einwanderung und den Zweiten Weltkrieg bis zur Demokratie von heute – und was in der Arbeitswelt gilt: Regeln, Lohn, Berufe von morgen. In acht Lektionen.',
  unterFr: 'De l’acier du Minett à la démocratie d’aujourd’hui – et les règles du monde du travail.',
  farbe: '#7a4b9c',
  karten: true,
  deckbild: ['opa:froh:stehen', 'tom:froh:stehen', 'amira:froh:stehen-zeigen'],
  blasen: [{ t: 'Früher: Hochofen!', x: 10, y: 108 }, { t: '60 Abgeordnete', x: 128, y: 96 }, { t: 'Brutto? Netto?', x: 164, y: 150 }],
  themen: [
    { titel: { de: 'Geschichte Luxemburgs', fr: 'Histoire du Luxembourg' }, icon: 'building-castle', lektionen: 3 },
    { titel: { de: 'Demokratie und Recht', fr: 'Démocratie et droit' }, icon: 'scale', lektionen: 2 },
    { titel: { de: 'Arbeit und Beruf', fr: 'Travail et métier' }, icon: 'briefcase', lektionen: 3 },
  ],
})

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Industrie · Minett · Stahl', titel: 'Das Land von Eisen und Stahl', untertitel: 'Rote Erde, Hochöfen, Schichtarbeit: Du liest, wie der Stahl Luxemburg reich gemacht hat, hörst einen ehemaligen Hüttenarbeiter und baust eine Zeitleiste.',
    ziel: { de: 'Ich erkläre, wie die Stahlindustrie Luxemburg verändert hat.', fr: 'J’explique comment la sidérurgie a transformé le Luxembourg.' },
    bild: ['opa:froh:stehen', 'tom:froh:stehen'],
    start: {
      was: 'Spuren im Süden',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist ein Hochofen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein riesiger Ofen, in dem aus Eisenerz flüssiges Eisen wird', 'ein Backofen in einem Hochhaus', 'ein Kamin in einer Burg'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Karte', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Rote Erde',
      absaetze: [
        'Im Süden Luxemburgs liegt das **Minett**. Der Name kommt vom Eisenerz, der „Minette“. Die Erde ist dort rötlich. Lange war dieses Erz kaum zu gebrauchen, weil es zu viel Phosphor enthielt. **1879** wurde ein neues Verfahren bekannt, das **Thomas-Verfahren**. Damit konnte man aus der Minette guten Stahl machen.',
        '### Vom Bauernland zum Industrieland',
        'Nun entstanden in **Esch-sur-Alzette, Differdingen, Düdelingen** und anderen Orten große **Hüttenwerke** mit **Hochöfen**. Tausende Menschen arbeiteten in den Erzgruben und Hütten, Tag und Nacht in **Schichten**. Viele Arbeiter kamen aus dem Ausland, besonders aus **Italien**. 1911 entstand die Firma **ARBED**. Der Stahl machte Luxemburg reich.',
        '### Krise und Neuanfang',
        'Ab **1975** wurde weniger Stahl gebraucht: die **Stahlkrise**. Regierung, Gewerkschaften und Arbeitgeber suchten gemeinsam Lösungen – das nennt man **Tripartite**. Niemand sollte einfach entlassen werden. Die letzte Erzgrube schloss Anfang der 1980er-Jahre, der letzte Hochofen **1997**. Heute wird Stahl in Elektroöfen aus Schrott gemacht. Auf dem alten Hüttengelände in **Belval** stehen jetzt die Universität und neue Wohnungen – und zwei Hochöfen als Denkmal.',
      ],
      woerter: [['das Eisenerz', 'le minerai de fer'], ['der Hochofen', 'le haut fourneau'], ['das Hüttenwerk', 'l’usine sidérurgique'], ['die Schicht', 'le poste (de travail)'], ['der Stahl', 'l’acier'], ['die Gewerkschaft', 'le syndicat'], ['der Arbeitgeber', 'l’employeur'], ['der Schrott', 'la ferraille']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Die Karte zeigt Orte im Süden und die Hauptstadt. Schreibe die Namen zu den Buchstaben.', stufe: 1,
          html: luxKarte({ kantone: 'keine', orte: ['Luxemburg', 'Esch-sur-Alzette', 'Differdingen', 'Düdelingen', 'Rumelange'], orteArt: 'buchstaben', fluesse: false, breite: 74, massstab: false }),
          liste: [['A', 'Luxemburg'], ['B', 'Esch-sur-Alzette'], ['C', 'Differdingen'], ['D', 'Düdelingen'], ['E', 'Rumelange']], spalten: 2,
          hilfe: 'Orte: Differdingen · Düdelingen · Esch-sur-Alzette · Luxemburg · Rumelange' },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Das Minett liegt im Norden Luxemburgs.', false], ['Durch das Thomas-Verfahren wurde die Minette nützlich.', true], ['Viele Arbeiter kamen aus Italien.', true], ['Der letzte Hochofen schloss 1997.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Belval · vor dem Hochofen A', titel: 'Opa erzählt',
      situation: 'Tom besucht mit seinem Opa das alte Hüttengelände in Belval. Der Opa hat früher in der Hütte gearbeitet.',
      bild: ['opa:froh:stehen', 'tom:ueberrascht:stehen'], sprecher: { Opa: 'm1', Tom: 'm3' },
      text: [
        ['Tom', 'Opa, hast du wirklich hier gearbeitet?'],
        ['Opa', 'Ja, mehr als zwanzig Jahre. Ich war am Hochofen. Da war es so heiß, dass wir dicke Schutzanzüge, Helme und Brillen tragen mussten.'],
        ['Tom', 'Und wann hast du gearbeitet?'],
        ['Opa', 'In drei Schichten: eine Woche morgens, eine Woche nachmittags, eine Woche nachts. Der Hochofen durfte nie ausgehen, auch nicht an Weihnachten.'],
        ['Tom', 'Das klingt anstrengend.'],
        ['Opa', 'Das war es. Aber wir waren eine gute Mannschaft. Meine Kollegen kamen aus Italien, Portugal, Belgien und Luxemburg. In der Pause hat man Französisch, Italienisch und Luxemburgisch durcheinander gesprochen.'],
        ['Tom', 'Und dann kam die Krise?'],
        ['Opa', 'Ja. Viele hatten Angst um ihre Arbeit. Ich wurde zum Glück nicht entlassen, sondern bekam eine Umschulung. Und heute? Heute studieren hier junge Leute, wo früher das Feuer brannte. Das finde ich schön.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine „Umschulung“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man lernt einen neuen Beruf.', 'Man wechselt die Schule wegen Umzug.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wie lange hat der Opa in der Hütte gearbeitet?', l: 'mehr als zwanzig Jahre' }, { f: 'Welche Schutzkleidung trug er?', l: 'dicke Schutzanzüge, Helme und Brillen' }, { f: 'Warum musste nachts gearbeitet werden?', l: 'Der Hochofen durfte nie ausgehen.' }, { f: 'Woher kamen seine Kollegen?', l: 'aus Italien, Portugal, Belgien und Luxemburg' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was hat sich verändert? Vergleicht die Arbeit damals mit heute.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Früher musste man …', 'Heute …', 'Ich finde, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Das Minett', punkte: ['**Eisenerz** „Minette“ im Süden', '**1879** Thomas-Verfahren → guter Stahl', 'Hüttenwerke in **Esch, Differdingen, Düdelingen**', 'viele Arbeiter aus **Italien**'] },
         { titel: 'Krise und Wandel', punkte: ['ab **1975** Stahlkrise', '**Tripartite**: Regierung, Gewerkschaften, Arbeitgeber', '**1997** letzter Hochofen aus', 'heute: **Belval** mit Universität'] }],
      ],
    },
    ueben: [
      { art: 'zeitleiste', auftrag: 'Trage die Ereignisse ein.', stufe: 2, von: 1860, bis: 2030, schritt: 20, hoehe: 100,
        ereignisse: [{ jahr: 1879, text: 'Thomas-Verfahren', leer: true }, { jahr: 1911, text: 'Gründung der ARBED', leer: true }, { jahr: 1975, text: 'Beginn der Stahlkrise', leer: true }, { jahr: 1997, text: 'letzter Hochofen aus', leer: true }, { jahr: 2015, text: 'Universität zieht nach Belval', leer: true }],
        hilfe: 'Ereignisse: Beginn der Stahlkrise · Gründung der ARBED · letzter Hochofen aus · Thomas-Verfahren · Universität zieht nach Belval' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Stell dir vor, du bist 1925 ein junger Arbeiter oder eine junge Arbeiterin in Esch. Schreibe einen Tagebucheintrag.', stufe: 2,
        anfaenge: ['Heute war …', 'In der Hütte …', 'Ich bin müde, weil …', 'Ich wünsche mir …'], zeilen: 8,
        beispiel: 'Heute war meine erste Nachtschicht am Hochofen. In der Hütte ist es laut und unglaublich heiß. Mein Kollege Giuseppe aus Italien hat mir alles gezeigt. Ich bin müde, weil die Schicht acht Stunden gedauert hat. Ich wünsche mir, dass meine Kinder später in die Schule gehen und einen anderen Beruf lernen können.' },
    ],
    check: ['Ich erkläre, was das Minett ist.', 'Ich beschreibe die Arbeit in der Hütte.', 'Ich ordne wichtige Daten der Stahlgeschichte ein.'],
  },
  // ================================================================ 2
  {
    thema: 'Einwanderung · Vielfalt', titel: 'Viele Wurzeln – ein Land', untertitel: 'Italienerinnen, Portugiesen, Menschen aus aller Welt: Du liest, wer nach Luxemburg kam und warum, liest ein Diagramm und hörst drei Lebensgeschichten.',
    ziel: { de: 'Ich erkläre, warum Menschen nach Luxemburg eingewandert sind, und lese Daten aus einem Diagramm.', fr: 'J’explique pourquoi des personnes ont immigré au Luxembourg et je lis un diagramme.' },
    bild: ['amira:froh:stehen', 'finn:froh:stehen'],
    start: {
      was: 'Sprachen im Bus',
      aufgaben: [
        { art: 'fragen', auftrag: 'Welche Sprachen hört man in Luxemburg im Bus, in der Schule, im Supermarkt? Sammle.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Luxemburgisch, Französisch, Deutsch, Portugiesisch, Englisch, Italienisch, Arabisch, Serbisch …' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Diagramm', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen gerundet, etwa 2024', titel: 'Ein Einwanderungsland',
      absaetze: [
        'Vor 150 Jahren war Luxemburg ein armes Land. Viele Luxemburger **wanderten aus**, zum Beispiel nach Amerika. Mit der Stahlindustrie änderte sich das: Jetzt wurden Arbeitskräfte gebraucht. Zuerst kamen viele Menschen aus **Deutschland** und **Italien**.',
        '### Neue Arbeit, neues Zuhause',
        'In den 1960er- und 1970er-Jahren kamen viele Menschen aus **Portugal**. Sie arbeiteten zum Beispiel auf Baustellen, in Restaurants und in der Reinigung. Später kamen Menschen aus vielen Ländern, um bei Banken, bei der EU oder in der Pflege zu arbeiten. Manche kamen auch, weil sie in ihrer Heimat nicht sicher waren und **Schutz** suchten.',
        '### Luxemburg heute',
        'Heute leben fast **700 000 Menschen** in Luxemburg. Fast die Hälfte hat **keinen luxemburgischen Pass**. Viele haben aber zwei Pässe. Dazu kommen jeden Tag über 200 000 **Grenzgänger** aus Frankreich, Belgien und Deutschland. Diese Vielfalt prägt das Land: die vielen Sprachen, das Essen, die Feste.',
      ],
      bildHtml: balken('Einwohner Luxemburgs nach Staatsangehörigkeit (gerundet, etwa 2024)', [['Luxemburg', 53], ['Portugal', 14], ['Frankreich', 8], ['Italien', 4], ['Belgien', 3], ['Deutschland', 2], ['andere Länder', 16]], { einheit: '%', max: 60 }),
      woerter: [['einwandern', 'immigrer'], ['auswandern', 'émigrer'], ['die Arbeitskraft', 'la main-d’œuvre'], ['die Heimat', 'le pays d’origine'], ['der Schutz', 'la protection'], ['der Pass', 'le passeport'], ['die Staatsangehörigkeit', 'la nationalité'], ['die Vielfalt', 'la diversité']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Lies das Diagramm und antworte.', stufe: 1, fragen: [{ f: 'Welche Staatsangehörigkeit ist nach der luxemburgischen am häufigsten?', l: 'die portugiesische (etwa 14 %)' }, { f: 'Wie viel Prozent haben ungefähr keinen luxemburgischen Pass?', l: 'etwa 47 % (100 % − 53 %)' }] },
        { art: 'zuordnen', auftrag: 'Wann kamen viele Menschen? Verbinde.', stufe: 2, links: ['um 1900', 'in den 1960er- und 1970er-Jahren', 'heute'], rechts: ['aus Italien und Deutschland, für die Stahlindustrie', 'aus Portugal, für Baustellen und Dienstleistungen', 'aus vielen Ländern, für Banken, EU, Pflege – oder auf der Suche nach Schutz'] },
      ],
    },
    hoeren: {
      was: 'Eine Radiosendung', wo: 'Radio · Sendung „Meine Wurzeln“', titel: 'Drei Wege nach Luxemburg',
      situation: 'Im Radio erzählen drei Menschen, wie sie oder ihre Familie nach Luxemburg gekommen sind.',
      bild: ['oma:froh:sitzen', 'lehrer:froh:stehen'], sprecher: { Moderatorin: 'w3', Daniela: 'w2', 'Herr Ferreira': 'm1', Selam: 'm3' },
      text: [
        ['Moderatorin', 'Willkommen zu „Meine Wurzeln“. Daniela, Ihre Familie ist schon lange hier.'],
        ['Daniela', 'Ja. Mein Urgroßvater kam 1910 aus einem kleinen Dorf in Italien nach Düdelingen. Er arbeitete in der Hütte. Zu Hause sprechen wir heute Luxemburgisch – aber sonntags gibt es immer noch Pasta wie bei der Uroma!'],
        ['Moderatorin', 'Herr Ferreira, Sie kamen 1974.'],
        ['Herr Ferreira', 'Genau, aus dem Norden von Portugal. Ich war achtzehn und hatte nur einen Koffer. Ich habe auf dem Bau gearbeitet und abends Französisch gelernt. Heute habe ich eine eigene kleine Firma.'],
        ['Moderatorin', 'Und Sie, Selam?'],
        ['Selam', 'Ich bin 2016 aus Eritrea gekommen, als ich fünfzehn war. Die Reise war sehr schwer. In Luxemburg habe ich eine Klasse für Neuankömmlinge besucht. Jetzt mache ich eine Ausbildung als Elektriker.'],
        ['Moderatorin', 'Was wünschen Sie sich?'],
        ['Selam', 'Dass die Leute uns kennenlernen, bevor sie urteilen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „urteilen“ hier? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['sich eine Meinung über jemanden bilden', 'vor Gericht stehen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Woher?', 'Wann?', 'Arbeit / Ausbildung'], breiten: [22, 22, 22, 34], zeilen: [['Danielas Urgroßvater', '[Italien]', '[1910]', '[in der Hütte in Düdelingen]'], ['Herr Ferreira', '[Portugal]', '[1974]', '[auf dem Bau, heute eigene Firma]'], ['Selam', '[Eritrea]', '[2016]', '[Ausbildung als Elektriker]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was bedeutet Selams Wunsch „Kennenlernen, bevor man urteilt“? Sprecht darüber.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich glaube, Selam meint …', 'Manchmal urteilen Leute, weil …', 'Man könnte …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Einwanderung', punkte: ['um **1900**: Stahlindustrie → Italien, Deutschland', '**1960er/70er**: Portugal', 'heute: aus **vielen Ländern**', 'manche suchen **Schutz**'] },
         { titel: 'Luxemburg heute', punkte: ['fast **700 000** Einwohner', 'fast die **Hälfte** ohne luxemburgischen Pass', 'über **200 000** Grenzgänger', 'viele Sprachen, viele Kulturen'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 2, aussagen: ['Die Vielfalt macht Luxemburg reicher.', 'Wer lange in Luxemburg lebt, sollte bei den Parlamentswahlen wählen dürfen – auch ohne luxemburgischen Pass.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe die Geschichte einer ausgedachten Person, die nach Luxemburg kommt. Woher kommt sie? Warum? Was ist am Anfang schwer, was wird besser?', stufe: 2,
        anfaenge: ['… kam im Jahr … nach Luxemburg.', 'Am Anfang war es schwer, weil …', 'Mit der Zeit …', 'Heute …'], zeilen: 8,
        beispiel: 'Ana kam im Jahr 2019 aus Brasilien nach Luxemburg, weil ihre Mutter hier Arbeit in einem Krankenhaus gefunden hatte. Am Anfang war es schwer, weil sie keine der Sprachen sprach und keine Freunde hatte. Mit der Zeit lernte sie Französisch und fand im Fußballverein Freundinnen. Heute spricht sie vier Sprachen und hilft neuen Schülerinnen in ihrer Klasse.' },
    ],
    check: ['Ich erkläre, warum Menschen nach Luxemburg kamen.', 'Ich lese Daten aus einem Diagramm.', 'Ich beschreibe die Vielfalt in Luxemburg.'],
  },
  // ================================================================ 3
  {
    thema: 'Zweiter Weltkrieg · Besatzung · Befreiung', titel: 'Luxemburg 1940–1945', untertitel: 'Besatzung, Widerstand, Befreiung: Du liest, was Luxemburg im Zweiten Weltkrieg erlebte, hörst eine Museumsführung und denkst über Erinnerung nach.',
    ziel: { de: 'Ich beschreibe wichtige Ereignisse in Luxemburg von 1940 bis 1945.', fr: 'Je décris des événements importants au Luxembourg de 1940 à 1945.' },
    bild: ['lehrerin:ruhig:erklaeren', 'noah:froh:stehen'],
    start: {
      was: 'Was weißt du schon?',
      aufgaben: [
        { art: 'fragen', auftrag: 'Schreibe auf, was dir zum Zweiten Weltkrieg einfällt. Du kannst auch Fragen aufschreiben.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Antworten, z. B. 1939–1945, Deutschland, Besatzung, viele Tote, Befreiung.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Besetzt – und doch nicht aufgegeben',
      hinweis: 'In diesem Text geht es um Krieg, Verfolgung und Tod. Wenn dich das traurig macht oder belastet, sprich mit deiner Lehrerin oder deinem Lehrer.',
      absaetze: [
        'Am **10. Mai 1940** marschierte die deutsche Armee in Luxemburg ein, obwohl das Land neutral war. **Großherzogin Charlotte** und die Regierung flohen ins Ausland. Die Regierung arbeitete von London aus. Von dort aus sprach die Großherzogin im Radio zu den Luxemburgern und machte ihnen Mut.',
        '### Luxemburg sollte deutsch werden',
        'Die Besatzer wollten Luxemburg zu einem Teil Deutschlands machen. Französisch wurde verboten, sogar französische Vornamen und Straßennamen. Im **Oktober 1941** sollten die Menschen bei einer Befragung Deutsch als ihre Sprache angeben. Viele schrieben trotzdem dreimal **„Luxemburgisch“**. Die Befragung wurde abgebrochen.',
        '### Streik und Verfolgung',
        'Im **August 1942** wurden junge Luxemburger gezwungen, in der deutschen Armee zu kämpfen: die **Zwangsrekrutierung**. Darauf folgte ein **Generalstreik**: Arbeiter, Schüler und Lehrer legten die Arbeit nieder. Die Besatzer bestraften dies hart; 21 Streikende wurden hingerichtet. Jüdinnen und Juden wurden verfolgt, beraubt und deportiert. Weit über 1000 von ihnen wurden ermordet.',
        '### Befreiung',
        'Im **September 1944** befreiten amerikanische Soldaten den größten Teil des Landes. Im Winter 1944 auf 1945 kam der Krieg noch einmal zurück: In der **Ardennenoffensive** wurden viele Orte im Norden, wie Wiltz, Clerf und Vianden, schwer zerstört. Im Februar 1945 war das ganze Land frei. Im April 1945 kehrte die Großherzogin zurück.',
      ],
      woerter: [['die Besatzung', 'l’occupation'], ['neutral', 'neutre'], ['fliehen', 'fuir'], ['der Streik', 'la grève'], ['verfolgen', 'persécuter'], ['deportieren', 'déporter'], ['die Befreiung', 'la libération'], ['die Erinnerung', 'le souvenir, la mémoire']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Am 10. Mai [1940] marschierte die deutsche Armee ein.', 'Großherzogin Charlotte floh nach [London].', 'Bei der Befragung 1941 schrieben viele dreimal [„Luxemburgisch“].', 'Gegen die Zwangsrekrutierung gab es 1942 einen [Generalstreik].', 'Im September [1944] befreiten amerikanische Soldaten den größten Teil des Landes.'] },
      ],
    },
    hoeren: {
      was: 'Eine Museumsführung', wo: 'Diekirch · Museum für Militärgeschichte', titel: 'Der kalte Winter 1944',
      situation: 'Die Klasse besucht ein Museum in Diekirch. Ein Museumsführer erklärt den Winter der Ardennenoffensive.',
      bild: ['lehrer:ruhig:erklaeren', 'noah:besorgt:stehen'], sprecher: { Museumsführer: 'm1', Noah: 'm3', Lina: 'w3' },
      text: [
        ['Museumsführer', 'Im September 1944 haben die Menschen hier gefeiert. Sie dachten: Der Krieg ist vorbei. Aber im Dezember griff die deutsche Armee in den Ardennen noch einmal an.'],
        ['Noah', 'Was ist mit den Menschen hier passiert?'],
        ['Museumsführer', 'Viele mussten fliehen oder haben wochenlang in Kellern gelebt. Es war einer der kältesten Winter seit Langem, mit viel Schnee. Es gab wenig zu essen und kaum Heizung.'],
        ['Lina', 'Und die Häuser?'],
        ['Museumsführer', 'In manchen Orten im Norden waren danach die meisten Häuser beschädigt oder zerstört. Nach dem Krieg haben die Menschen alles wieder aufgebaut. Das hat viele Jahre gedauert.'],
        ['Noah', 'Warum ist es wichtig, dass wir das heute noch lernen?'],
        ['Museumsführer', 'Weil die Menschen, die das erlebt haben, bald nicht mehr erzählen können. Wir erinnern uns, damit so etwas nie wieder passiert – und um zu verstehen, wie wertvoll Frieden und Freiheit sind.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Zeitzeuge“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Mensch, der eine Zeit selbst erlebt hat und davon erzählt', 'ein Uhrmacher'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Im Dezember 1944 griff die deutsche Armee noch einmal an.', true], ['Der Winter war mild und ohne Schnee.', false], ['Viele Menschen lebten wochenlang in Kellern.', true], ['Nach dem Krieg wurde alles schnell in wenigen Wochen aufgebaut.', false]] },
        { art: 'fragen', auftrag: 'Warum ist Erinnerung wichtig? Was sagt der Museumsführer?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Damit so etwas nie wieder passiert und um zu verstehen, wie wertvoll Frieden und Freiheit sind.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie kann man an die Zeit erinnern? Sammelt Ideen.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Gedenktag (2. Sonntag im Oktober)', 'Denkmäler besuchen', 'Museen', 'Bücher und Filme'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Luxemburg 1940–1945', punkte: ['**10. Mai 1940**: Einmarsch, Besatzung', '**1941**: dreimal „Luxemburgisch“', '**1942**: Zwangsrekrutierung → Generalstreik', 'Verfolgung und Ermordung von **Jüdinnen und Juden**', '**Sept. 1944**: Befreiung · Winter 1944/45: Ardennenoffensive'] },
         { titel: 'Erinnern', punkte: ['**Nationaler Gedenktag**: 2. Sonntag im Oktober', 'Denkmäler, z. B. in **Wiltz**', 'Museen, z. B. in **Diekirch**'] }],
      ],
    },
    ueben: [
      { art: 'zeitleiste', auftrag: 'Ordne die Ereignisse auf der Zeitleiste ein.', stufe: 2, von: 1939, bis: 1946, schritt: 1, hoehe: 100,
        ereignisse: [{ jahr: 1940.36, text: 'Einmarsch der deutschen Armee', leer: true, anzeige: 'Mai 1940' }, { jahr: 1941.78, text: 'Befragung: dreimal „Luxemburgisch“', leer: true, anzeige: 'Okt. 1941' }, { jahr: 1942.66, text: 'Generalstreik', leer: true, anzeige: 'Aug./Sept. 1942' }, { jahr: 1944.7, text: 'Befreiung', leer: true, anzeige: 'Sept. 1944' }, { jahr: 1944.96, text: 'Ardennenoffensive', leer: true, anzeige: 'Dez. 1944' }],
        hilfe: 'Ereignisse: Ardennenoffensive · Befragung („Luxemburgisch“) · Befreiung · Einmarsch · Generalstreik' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Text für eine Gedenktafel in deiner Schule: Woran sollen sich die Menschen erinnern? Was ist die Botschaft?', stufe: 3,
        anfaenge: ['Wir erinnern uns an …', 'Sie haben …', 'Wir wünschen uns …'], zeilen: 6,
        beispiel: 'Wir erinnern uns an die Menschen, die von 1940 bis 1945 unter der Besatzung gelitten haben. Sie haben für ihre Freiheit gestreikt, wurden verfolgt oder haben ihr Zuhause verloren. Wir wünschen uns, dass wir alle in Frieden zusammenleben und niemand ausgegrenzt wird.' },
    ],
    check: ['Ich nenne wichtige Ereignisse von 1940 bis 1945.', 'Ich erkläre den Generalstreik von 1942.', 'Ich erkläre, warum Erinnerung wichtig ist.'],
  },
  // ================================================================ 4
  {
    thema: 'Demokratie · Gewaltenteilung · Wahlen', titel: 'Wer bestimmt in Luxemburg?', untertitel: 'Großherzog, Abgeordnetenkammer, Regierung, Gerichte: Du lernst die Gewaltenteilung kennen, besuchst die Abgeordnetenkammer und verfolgst den Weg eines Gesetzes.',
    ziel: { de: 'Ich erkläre, wie Luxemburg regiert wird und wie ein Gesetz entsteht.', fr: 'J’explique comment le Luxembourg est gouverné et comment naît une loi.' },
    bild: ['yusuf:froh:stehen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Demokratie',
      aufgaben: [
        { art: 'mc', auftrag: 'Was bedeutet „Demokratie“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Das Volk bestimmt, zum Beispiel durch Wahlen.', 'Eine Person bestimmt alles allein.', 'Die Reichsten bestimmen.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Drei Säulen der Macht',
      absaetze: [
        'Luxemburg ist eine **Demokratie** mit einem **Großherzog** als Staatsoberhaupt. Der Großherzog vertritt das Land, aber er regiert nicht allein. Die wichtigsten Regeln stehen in der **Verfassung**.',
        '### Gewaltenteilung',
        'Die Macht im Staat ist auf **drei Bereiche** verteilt. So kann niemand zu viel Macht bekommen. Die **Abgeordnetenkammer** mit **60 Abgeordneten** macht die **Gesetze**. Die **Regierung** mit dem Premierminister oder der Premierministerin und den Ministerinnen und Ministern **führt** die Gesetze **aus**. Die **Gerichte** sprechen **Recht**. Sie sind unabhängig.',
        '### Wählen',
        'Alle **5 Jahre** wählen die Bürgerinnen und Bürger die Abgeordnetenkammer. Wer die luxemburgische Staatsangehörigkeit hat und mindestens 18 Jahre alt ist, **muss** wählen gehen (Wahlpflicht). Bei den **Gemeindewahlen** und den **Europawahlen** dürfen sich auch viele Menschen ohne luxemburgischen Pass eintragen lassen und wählen.',
      ],
      bildHtml: gewaltenteilung({ breite: 132 }),
      woerter: [['die Demokratie', 'la démocratie'], ['das Staatsoberhaupt', 'le chef de l’État'], ['die Verfassung', 'la Constitution'], ['die Abgeordnetenkammer', 'la Chambre des députés'], ['das Gesetz', 'la loi'], ['die Regierung', 'le gouvernement'], ['das Gericht', 'le tribunal'], ['die Wahlpflicht', 'le vote obligatoire']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wer macht was? Verbinde.', stufe: 1, links: ['die Abgeordnetenkammer', 'die Regierung', 'die Gerichte', 'das Volk'], rechts: ['macht die Gesetze', 'führt die Gesetze aus', 'sprechen Recht', 'wählt alle 5 Jahre'] },
      ],
    },
    hoeren: {
      was: 'Eine Führung', wo: 'Abgeordnetenkammer · Plenarsaal', titel: 'Wie ein Gesetz entsteht',
      situation: 'Die Klasse besucht die Abgeordnetenkammer. Eine Mitarbeiterin erklärt den Weg eines Gesetzes.',
      bild: ['lehrerin:froh:zeigen', 'yusuf:froh:stehen'], sprecher: { Mitarbeiterin: 'w1', Yusuf: 'm3' },
      text: [
        ['Mitarbeiterin', 'Hier im Plenarsaal sitzen die sechzig Abgeordneten. Sie diskutieren und stimmen über Gesetze ab.'],
        ['Yusuf', 'Woher kommt die Idee für ein Gesetz?'],
        ['Mitarbeiterin', 'Meistens schreibt die Regierung einen Gesetzentwurf. Auch Abgeordnete dürfen Vorschläge machen. Dann prüft der Staatsrat den Text und gibt seine Meinung ab.'],
        ['Yusuf', 'Und dann wird abgestimmt?'],
        ['Mitarbeiterin', 'Zuerst wird der Text in einem Ausschuss besprochen und verbessert. Dann stimmen alle Abgeordneten im Plenarsaal ab. Wenn die Mehrheit Ja sagt, ist das Gesetz angenommen.'],
        ['Yusuf', 'Gilt es dann sofort?'],
        ['Mitarbeiterin', 'Fast. Der Großherzog unterschreibt das Gesetz, und es wird im Amtsblatt veröffentlicht. Erst dann gilt es für alle.'],
        ['Yusuf', 'Kann ich als Schüler auch mitreden?'],
        ['Mitarbeiterin', 'Ja! Zum Beispiel im Jugendparlament. Und jeder kann eine Petition schreiben. Wenn genug Menschen unterschreiben, wird darüber in der Kammer diskutiert.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine „Petition“? Kreuze an.', stufe: 2, fragen: [{ f: '', o: ['eine Bitte oder Forderung an die Politik, die viele unterschreiben können', 'ein Formular für den Pass'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne den Weg eines Gesetzes.', stufe: 2, teile: ['Die Regierung schreibt einen Gesetzentwurf.', 'Der Staatsrat prüft den Text.', 'Ein Ausschuss bespricht und verbessert ihn.', 'Die Abgeordneten stimmen ab.', 'Der Großherzog unterschreibt.', 'Das Gesetz wird im Amtsblatt veröffentlicht.'], ordnung: [3, 0, 5, 1, 4, 2] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welches Gesetz würdet ihr vorschlagen? Einigt euch in der Gruppe und stellt es vor.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Wir schlagen vor, dass …', 'Das ist wichtig, weil …', 'Dagegen könnte man sagen …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Gewaltenteilung', punkte: ['**Abgeordnetenkammer** (60): Gesetze machen', '**Regierung**: Gesetze ausführen', '**Gerichte**: Recht sprechen', '**Großherzog**: Staatsoberhaupt'] },
         { titel: 'Mitbestimmen', punkte: ['Wahlen alle **5 Jahre**', '**Wahlpflicht** ab 18 (luxemburgische Staatsangehörigkeit)', 'Gemeinde- und Europawahlen auch für viele andere', '**Petition**, Jugendparlament'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Wie heißen die drei Säulen? Schreibe sie zu den Nummern.', stufe: 2, html: gewaltenteilung({ leer: true, breite: 120 }), liste: [['1', 'Gesetze machen (Abgeordnetenkammer)'], ['2', 'Gesetze ausführen (Regierung)'], ['3', 'Recht sprechen (Gerichte)']], spalten: 1 },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine kurze Petition an die Gemeinde oder die Abgeordnetenkammer zu einem Thema, das dir wichtig ist.', stufe: 2,
        anfaenge: ['Sehr geehrte Damen und Herren,', 'wir fordern, dass …', 'Begründung: …', 'Mit freundlichen Grüßen'], zeilen: 8,
        beispiel: 'Sehr geehrte Damen und Herren, wir fordern, dass es in unserer Gemeinde einen sicheren Radweg zur Schule gibt. Begründung: Viele Jugendliche fahren mit dem Fahrrad auf einer gefährlichen Straße mit vielen Lastwagen. Ein Radweg schützt uns und ist gut für das Klima. Mit freundlichen Grüßen, die Klasse 5P2' },
    ],
    check: ['Ich erkläre die Gewaltenteilung.', 'Ich beschreibe den Weg eines Gesetzes.', 'Ich nenne Wege mitzubestimmen.'],
  },
  // ================================================================ 5
  {
    thema: 'Rechte und Pflichten · Volljährigkeit', titel: 'Ab wann darf ich was?', untertitel: 'Ferienjob, Mofa, Führerschein, Volljährigkeit: Du lernst, welche Rechte und Pflichten mit dem Alter kommen, und diskutierst über das Wählen ab 16.',
    ziel: { de: 'Ich nenne Rechte und Pflichten, die mit dem Alter kommen, und begründe meine Meinung.', fr: 'Je cite des droits et des devoirs liés à l’âge et je justifie mon opinion.' },
    bild: ['sami:froh:stehen', 'lea:froh:stehen'],
    start: {
      was: 'Schätze!',
      aufgaben: [
        { art: 'mc', auftrag: 'Mit wie vielen Jahren ist man in Luxemburg volljährig? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['mit 16', 'mit 18', 'mit 21'], r: 1 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026 – Regeln können sich ändern)', titel: 'Schritt für Schritt erwachsen',
      absaetze: [
        'Mit jedem Jahr bekommen Jugendliche mehr **Rechte** – und mehr **Verantwortung**. Hier sind einige Regeln in Luxemburg (vereinfacht).',
        '### Mit 15 und 16',
        'Ab **15 Jahren** dürfen Schülerinnen und Schüler in den **Schulferien jobben**, mit einem besonderen Vertrag und begrenzter Arbeitszeit. Ab **16** kann man den Führerschein für ein **Mofa oder einen kleinen Roller** machen. Ab 16 darf man auch selbst zustimmen, dass Apps die eigenen Daten nutzen.',
        '### Mit 17',
        'Ab **17** darf man mit dem **Autofahren** anfangen – aber nur mit einer erfahrenen Begleitperson im Auto.',
        '### Mit 18: volljährig',
        'Mit **18** ist man **volljährig**. Man darf allein Verträge unterschreiben (zum Beispiel für ein Handy oder eine Wohnung), den Auto-Führerschein allein nutzen, Tabak und E-Zigaretten kaufen und – mit luxemburgischer Staatsangehörigkeit – **wählen**. Man ist aber auch für alles **selbst verantwortlich**: für Schulden, Verträge und Fehler.',
        '### Wählen ab 16?',
        'In manchen Ländern, zum Beispiel in Österreich, darf man schon mit 16 wählen. In Luxemburg wurde 2015 in einer Volksbefragung darüber abgestimmt. Die große Mehrheit sagte Nein.',
      ],
      woerter: [['volljährig', 'majeur'], ['das Recht', 'le droit'], ['die Pflicht', 'le devoir'], ['die Verantwortung', 'la responsabilité'], ['der Ferienjob', 'le job de vacances'], ['der Führerschein', 'le permis de conduire'], ['der Vertrag', 'le contrat'], ['die Schulden', 'les dettes']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ab welchem Alter? Ergänze laut Text.', stufe: 1, kopf: ['Was?', 'Alter'], breiten: [76, 24], zeilen: [['in den Schulferien jobben', '[15]'], ['Mofa- oder Roller-Führerschein', '[16]'], ['Autofahren lernen mit Begleitung', '[17]'], ['allein einen Handyvertrag unterschreiben', '[18]'], ['wählen (mit luxemburgischem Pass)', '[18]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Küche · Geburtstagsfeier', titel: 'Endlich 18!',
      situation: 'Leas ältere Cousine Mila wird 18. Lea fragt sie, was sich jetzt ändert.',
      bild: ['lea:froh:stehen', 'chloe:froh:handy'], sprecher: { Lea: 'w3', Mila: 'w2' },
      text: [
        ['Lea', 'Alles Gute zum Geburtstag, Mila! Wie fühlt es sich an, volljährig zu sein?'],
        ['Mila', 'Danke! Ehrlich gesagt: fast gleich wie gestern. Aber ich habe schon gemerkt, dass sich einiges ändert.'],
        ['Lea', 'Was denn?'],
        ['Mila', 'Ich kann jetzt den Handyvertrag selbst unterschreiben. Aber dann muss ich auch selbst zahlen, wenn die Rechnung zu hoch ist.'],
        ['Lea', 'Und Autofahren?'],
        ['Mila', 'Ich habe ja schon mit siebzehn mit Papa geübt. Nächsten Monat mache ich die Prüfung. Dann darf ich allein fahren.'],
        ['Lea', 'Und im Oktober sind Gemeindewahlen, oder?'],
        ['Mila', 'Nein, die sind erst 2029. Aber wenn es so weit ist, gehe ich hin. Ich finde es wichtig, mitzubestimmen.'],
        ['Lea', 'Ich will auch wählen! Warum erst mit achtzehn?'],
        ['Mila', 'Darüber kann man streiten. Was meinst du denn?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Vertrag“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine verbindliche Abmachung, oft schriftlich', 'ein Geschenk'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Mila fühlt sich ganz anders als gestern.', false], ['Mila muss ihre Handyrechnung jetzt selbst zahlen.', true], ['Mila hat schon mit 17 Autofahren geübt.', true], ['Die nächsten Gemeindewahlen sind im Oktober.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Rechte und welche Pflichten kommen mit 18? Sammelt in zwei Spalten.', stufe: 2, karten: [
        { titel: 'Rechte', text: ['Verträge unterschreiben', 'wählen', 'allein Auto fahren'] },
        { titel: 'Pflichten', text: ['Rechnungen zahlen', 'wählen gehen (Wahlpflicht)', 'für Fehler geradestehen'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ab wann? (vereinfacht, Stand 2026)', punkte: ['**15**: Ferienjob', '**16**: Mofa-/Roller-Führerschein', '**17**: Autofahren lernen mit Begleitung', '**18**: volljährig – Verträge, wählen, Führerschein'] },
         { titel: 'Volljährig heißt auch', punkte: ['**selbst verantwortlich**', 'Schulden und Verträge **selbst** tragen', '**Wahlpflicht** mit luxemburgischem Pass'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 2, aussagen: ['Man sollte schon mit 16 wählen dürfen.', 'Mit 18 ist man erwachsen genug, um alles selbst zu entscheiden.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wählen ab 16 – ja oder nein? Schreibe deine Meinung mit zwei Gründen und einem Gegenargument.', stufe: 3,
        anfaenge: ['Ich bin dafür / dagegen, dass …', 'Ein Grund ist …', 'Außerdem …', 'Manche sagen, …', 'Trotzdem …'], zeilen: 8,
        beispiel: 'Ich bin dafür, dass man ab 16 wählen darf. Ein Grund ist, dass Politik auch über unsere Schule und unsere Zukunft entscheidet. Außerdem arbeiten manche mit 16 schon in einer Ausbildung. Manche sagen, dass Jugendliche zu wenig über Politik wissen. Trotzdem finde ich: Wer wählen darf, interessiert sich auch mehr dafür.' },
    ],
    check: ['Ich nenne Rechte, die mit dem Alter kommen.', 'Ich erkläre, was Volljährigkeit bedeutet.', 'Ich begründe meine Meinung zum Wählen ab 16.'],
  },
  // ================================================================ 6
  {
    thema: 'Arbeitswelt · Rechte und Pflichten in der Ausbildung', titel: 'Arbeit hat Regeln', untertitel: 'Arbeitsvertrag, Arbeitszeit, Urlaub, Sicherheit, krank melden: Du lernst die wichtigsten Regeln in Ausbildung und Beruf kennen.',
    ziel: { de: 'Ich nenne wichtige Rechte und Pflichten in der Ausbildung.', fr: 'Je cite des droits et devoirs importants pendant l’apprentissage.' },
    bild: ['finn:froh:stehen', 'chef:froh:erklaeren'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'rf', auftrag: 'Was glaubst du? Richtig oder falsch? (Die Lösung steht im Text.)', stufe: 1, saetze: [['Ein Lehrling unter 18 darf nachts arbeiten.', false], ['Wer krank ist, muss den Betrieb sofort informieren.', true], ['Schutzkleidung ist freiwillig.', false]] },
      ],
    },
    lesen: {
      was: 'Ein Merkblatt', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Merkblatt (vereinfacht, Stand 2026 – Einzelheiten stehen im Vertrag und im Gesetz)', titel: 'Fit für die Ausbildung',
      absaetze: [
        '### Der Vertrag',
        'Vor dem Start unterschreiben Betrieb und Lehrling einen **Lehrvertrag**. Bei Minderjährigen unterschreiben auch die Erziehungsberechtigten. Darin stehen der Beruf, die Dauer, die **Lehrlingsentschädigung** (der Lohn) und die Probezeit.',
        '### Arbeitszeit und Urlaub',
        'Jugendliche unter 18 dürfen höchstens **8 Stunden am Tag** und **40 Stunden in der Woche** arbeiten. Sie haben Anspruch auf **Pausen** und dürfen grundsätzlich **nicht nachts** arbeiten. Jedes Jahr gibt es mindestens **26 Tage bezahlten Urlaub**. Die Zeit in der Berufsschule zählt als Arbeitszeit.',
        '### Sicherheit',
        'Der Betrieb muss **Schutzkleidung** stellen: Helm, Handschuhe, Sicherheitsschuhe, Brille. Der Lehrling muss sie **tragen**. Bei einem Arbeitsunfall ist man versichert.',
        '### Krank? So geht’s',
        'Wer krank ist, muss den Betrieb **am ersten Tag sofort** informieren, am besten vor Arbeitsbeginn. Spätestens am **dritten Tag** muss eine **ärztliche Bescheinigung** beim Betrieb sein.',
        '### Pflichten des Lehrlings',
        'Pünktlich sein, mitarbeiten, die Berufsschule besuchen, ein **Ausbildungsheft** führen und Betriebsgeheimnisse für sich behalten. Bei Problemen helfen die Ausbildungsberaterinnen und -berater der Kammern.',
      ],
      woerter: [['der Lehrvertrag', 'le contrat d’apprentissage'], ['der Lehrling', 'l’apprenti(e)'], ['die Lehrlingsentschädigung', 'l’indemnité d’apprentissage'], ['die Probezeit', 'la période d’essai'], ['der Urlaub', 'le congé'], ['die Schutzkleidung', 'les vêtements de protection'], ['die ärztliche Bescheinigung', 'le certificat médical'], ['der Arbeitsunfall', 'l’accident de travail']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Wie viele Stunden darf ein 16-jähriger Lehrling höchstens am Tag arbeiten?', l: '8 Stunden' }, { f: 'Wie viele Tage Urlaub gibt es mindestens?', l: '26 Tage' }, { f: 'Bis wann muss die ärztliche Bescheinigung beim Betrieb sein?', l: 'spätestens am dritten Tag' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Elektrobetrieb · erster Tag', titel: 'Willkommen im Team!',
      situation: 'Finn beginnt eine Ausbildung als Elektroinstallateur. Sein Ausbilder Herr Becker erklärt die wichtigsten Regeln.',
      bild: ['chef:froh:erklaeren', 'finn:nervoes:stehen'], sprecher: { 'Herr Becker': 'm2', Finn: 'm3' },
      text: [
        ['Herr Becker', 'Guten Morgen, Finn! Schön, dass du da bist. Wir fangen um halb acht an. Pünktlichkeit ist bei uns wichtig, weil die Kunden auf uns warten.'],
        ['Finn', 'Okay. Wann ist Pause?'],
        ['Herr Becker', 'Um zehn eine Viertelstunde, mittags eine halbe Stunde. Hier ist deine Ausrüstung: Sicherheitsschuhe, Handschuhe, Schutzbrille. Ohne Schuhe und Brille gehst du nicht auf die Baustelle. Das ist Pflicht.'],
        ['Finn', 'Und wenn ich mal krank bin?'],
        ['Herr Becker', 'Dann rufst du mich morgens vor halb acht an. Nicht nur eine Nachricht schicken! Und du bringst spätestens am dritten Tag das Attest vom Arzt.'],
        ['Finn', 'Muss ich am Berufsschultag auch kommen?'],
        ['Herr Becker', 'Nein, an dem Tag bist du in der Schule. Die Schule ist genauso wichtig wie die Arbeit hier. Und noch was: Wenn du etwas nicht verstehst, frag! Fragen ist kein Zeichen von Schwäche.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Attest“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Bescheinigung vom Arzt', 'ein Test in der Schule'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und notiere die Regeln.', stufe: 1, kopf: ['Thema', 'Regel'], breiten: [28, 72], zeilen: [['Arbeitsbeginn', '[7.30 Uhr, pünktlich sein]'], ['Pausen', '[um 10 Uhr 15 Minuten, mittags 30 Minuten]'], ['Ausrüstung', '[Sicherheitsschuhe, Handschuhe, Schutzbrille – Pflicht]'], ['krank', '[vor 7.30 Uhr anrufen, spätestens am 3. Tag Attest bringen]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt das Krankmelden am Telefon. Eine Person ist der Lehrling, eine der Ausbilder.', stufe: 2, karten: [
        { titel: 'So meldest du dich krank', text: ['Guten Morgen, hier ist …', 'Ich bin leider krank und kann heute nicht kommen.', 'Ich gehe heute zum Arzt und bringe das Attest.', 'Auf Wiederhören.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Rechte (unter 18)', punkte: ['höchstens **8 Std./Tag**, **40 Std./Woche**', '**Pausen**, keine Nachtarbeit', 'mind. **26 Tage** Urlaub', '**Schutzkleidung** vom Betrieb'] },
         { titel: 'Pflichten', punkte: ['**pünktlich**, mitarbeiten', 'Schutzkleidung **tragen**', 'krank: **sofort** melden, Attest bis **Tag 3**', '**Berufsschule** besuchen'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Recht oder Pflicht des Lehrlings? Kreuze an.', stufe: 2, kopf: ['', 'Recht', 'Pflicht'], breiten: [64, 18, 18], zeilen: [['Urlaub bekommen', '[x]', ''], ['Sicherheitsschuhe tragen', '', '[x]'], ['eine Lehrlingsentschädigung bekommen', '[x]', ''], ['die Berufsschule besuchen', '', '[x]'], ['Pausen machen', '[x]', ''], ['sich krank melden', '', '[x]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Krankmeldung als SMS an deinen Ausbilder – nachdem du schon angerufen hast, aber niemand abgenommen hat. Sei höflich und klar.', stufe: 2,
        anfaenge: ['Guten Morgen, Herr/Frau …,', 'ich bin heute leider …', 'Ich gehe …', 'Ich melde mich …'], zeilen: 5,
        beispiel: 'Guten Morgen, Herr Becker, ich habe versucht, Sie anzurufen. Ich bin heute leider krank und habe Fieber. Ich gehe heute Vormittag zum Arzt und bringe Ihnen das Attest spätestens übermorgen. Ich melde mich heute Nachmittag noch einmal. Viele Grüße, Finn' },
    ],
    check: ['Ich nenne Rechte von Lehrlingen.', 'Ich nenne Pflichten von Lehrlingen.', 'Ich kann mich richtig krank melden.'],
  },
  // ================================================================ 7
  {
    thema: 'Lohn · Sozialversicherung · Budget', titel: 'Der erste Lohn', untertitel: 'Brutto, netto, Sozialversicherung: Du liest einen Lohnzettel (ausgedachte Zahlen), hörst ein Gespräch über das erste Geld und rechnest ein Monatsbudget.',
    ziel: { de: 'Ich lese einen einfachen Lohnzettel und plane ein Monatsbudget.', fr: 'Je lis une fiche de salaire simple et je planifie un budget mensuel.' },
    bild: ['lio:froh:handy', 'amira:froh:blatt'],
    start: {
      was: 'Brutto oder netto?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist „netto“? Rate!', stufe: 1, fragen: [{ f: '', o: ['das Geld, das man wirklich aufs Konto bekommt', 'das Geld vor allen Abzügen'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Lohnzettel und ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext und Lohnzettel (vereinfacht, ausgedachte Zahlen)', titel: 'Wohin geht mein Geld?',
      absaetze: [
        'Am Ende des Monats bekommt Lio seinen ersten **Lohnzettel**. Ganz oben steht der **Bruttolohn**: Das ist der Lohn vor allen Abzügen. Davon werden Beiträge für die **Sozialversicherung** abgezogen. Übrig bleibt der **Nettolohn**: Das Geld, das auf dem Konto ankommt.',
        '### Wofür sind die Abzüge?',
        'Die **Krankenversicherung** bezahlt Arzt, Medikamente und Krankenhaus. Die **Rentenversicherung** sorgt dafür, dass man im Alter eine Rente bekommt. Die **Pflegeversicherung** hilft, wenn Menschen dauerhaft Pflege brauchen. Wer mehr verdient, zahlt außerdem **Steuern**. Damit bezahlt der Staat zum Beispiel Schulen, Straßen und den Gratis-Bus.',
        '### Einen Plan machen',
        'Mit dem ersten eigenen Geld lohnt sich ein **Budget**: Man schreibt auf, was reinkommt und was rausgeht. Ein Tipp: Zuerst einen festen Betrag **sparen**, dann ausgeben. Und Vorsicht bei Ratenkäufen und Abos – kleine Beträge jeden Monat werden schnell viel.',
      ],
      bildHtml: '<div class="lohnzettel"><b>Lohnzettel – Oktober</b><span>Lio M., Lehrling (2. Lehrjahr) · ausgedachte, vereinfachte Zahlen</span><table><tr><td>Bruttolohn (Lehrlingsentschädigung)</td><td>1 000,00 €</td></tr><tr><td>− Krankenversicherung</td><td>30,50 €</td></tr><tr><td>− Rentenversicherung</td><td>80,00 €</td></tr><tr><td>− Pflegeversicherung</td><td>10,50 €</td></tr><tr class="summe"><td>Nettolohn (auf das Konto)</td><td>879,00 €</td></tr></table></div>',
      woerter: [['der Lohn', 'le salaire'], ['brutto / netto', 'brut / net'], ['der Abzug', 'la retenue'], ['die Sozialversicherung', 'la sécurité sociale'], ['die Rente', 'la pension (de retraite)'], ['die Steuer', 'l’impôt'], ['sparen', 'épargner'], ['das Abo', 'l’abonnement']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Lies den Lohnzettel und antworte.', stufe: 1, fragen: [{ f: 'Wie hoch ist Lios Bruttolohn?', l: '1000 €' }, { f: 'Wie viel wird insgesamt abgezogen?', l: '30,50 € + 80,00 € + 10,50 € = 121 €' }, { f: 'Welcher Abzug ist am größten? Wofür ist er?', l: 'die Rentenversicherung (80 €) – für die Rente im Alter' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pause · Berufsschule', titel: 'Was machst du mit deinem Geld?',
      situation: 'Lio und Amira haben beide ihren ersten Lohn bekommen. Sie vergleichen ihre Pläne.',
      bild: ['lio:froh:handy', 'amira:froh:blatt'], sprecher: { Lio: 'm3', Amira: 'w2' },
      text: [
        ['Lio', 'Endlich Geld! Ich kauf mir die neue Konsole und das Spiel dazu. Und ein Handy-Abo mit unbegrenzten Daten.'],
        ['Amira', 'Wie viel kostet das alles?'],
        ['Lio', 'Die Konsole fünfhundert, das Spiel siebzig, das Abo fünfunddreißig im Monat. Kein Problem, ich verdiene ja jetzt.'],
        ['Amira', 'Dann ist dein ganzer Lohn fast weg. Und was ist mit dem Busabo, dem Essen in der Kantine, Kleidung?'],
        ['Lio', 'Der Bus ist gratis. Aber stimmt, die Kantine kostet etwa vier Euro am Tag.'],
        ['Amira', 'Ich mache es so: Ich lege jeden Monat zweihundert Euro auf ein Sparkonto, für den Führerschein. Den Rest teile ich auf. Und ich schreibe alles in eine App.'],
        ['Lio', 'Hm. Vielleicht warte ich mit der Konsole bis Dezember. Dann habe ich zwei Monate gespart.'],
        ['Amira', 'Gute Idee! Und das Abo: Brauchst du wirklich unbegrenzte Daten? Es gibt billigere.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Sparkonto“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Konto, auf dem man Geld für später sammelt', 'ein Konto nur für Einkäufe'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Lio', 'Amira'], breiten: [24, 38, 38], zeilen: [['Plan am Anfang', '[Konsole, Spiel, Handy-Abo kaufen]', '[200 € im Monat sparen]'], ['Sparen für …', '[noch nichts geplant]', '[den Führerschein]'], ['Am Ende', '[bis Dezember warten, zwei Monate sparen]', '[schreibt alles in eine App, rät zu einem billigeren Abo]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Spartipps kennt ihr? Sammelt.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['zuerst sparen, dann ausgeben', 'Abos prüfen', 'gebraucht kaufen', 'eine Nacht darüber schlafen'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Brutto und netto', punkte: ['**Brutto**: Lohn vor Abzügen', '− **Sozialversicherung** (Kranken-, Renten-, Pflegeversicherung)', '− **Steuern** (bei höherem Lohn)', '= **Netto**: aufs Konto'] },
         { titel: 'Budget-Tipps', punkte: ['Einnahmen und Ausgaben **aufschreiben**', 'zuerst **sparen**', 'Vorsicht bei **Abos** und **Raten**'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Hilf Lio, ein Monatsbudget zu planen. Er bekommt netto 879 €.', stufe: 2, spalten: 2, items: [
        { a: 'Kantine: 20 Arbeitstage zu je 4 €. Wie viel kostet das im Monat?', l: '20 · 4 € = 80 €', raum: 2 },
        { a: 'Handy-Abo 15 €, Fitnessstudio 25 €, Kleidung 60 €, Freizeit 100 €. Wie viel ist das zusammen?', l: '15 + 25 + 60 + 100 = 200 €', raum: 2 },
        { a: 'Lio will 300 € sparen. Wie viel bleibt nach Kantine, festen Ausgaben und Sparen übrig?', l: '879 − 80 − 200 − 300 = 299 €', raum: 2 },
        { a: 'Die Konsole kostet 500 €. Nach wie vielen Monaten Sparen kann Lio sie kaufen?', l: 'nach 2 Monaten (2 · 300 € = 600 €)', raum: 2 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Gib Lio drei Tipps für sein erstes Geld und begründe sie.', stufe: 2,
        anfaenge: ['Lieber Lio,', 'Erstens …', 'Zweitens …', 'Drittens …'], zeilen: 7,
        beispiel: 'Lieber Lio, erstens: Spar jeden Monat zuerst einen festen Betrag, dann hast du Geld für große Wünsche. Zweitens: Prüf deine Abos, weil kleine Beträge jeden Monat schnell viel werden. Drittens: Schreib alles auf, dann weißt du am Monatsende, wohin dein Geld gegangen ist.' },
    ],
    check: ['Ich unterscheide brutto und netto.', 'Ich erkläre, wofür die Sozialversicherung da ist.', 'Ich plane ein einfaches Budget.'],
  },
  // ================================================================ 8
  {
    thema: 'Wirtschaft in Luxemburg · Berufe von morgen', titel: 'Berufe im Wandel', untertitel: 'Banken, Logistik, Weltraum, Handwerk, Pflege: Du lernst, wo in Luxemburg gearbeitet wird, besuchst eine Berufsmesse und denkst über die Arbeit von morgen nach.',
    ziel: { de: 'Ich nenne wichtige Wirtschaftsbereiche in Luxemburg und beschreibe, wie sich Berufe verändern.', fr: 'Je cite des secteurs économiques importants au Luxembourg et je décris l’évolution des métiers.' },
    bild: ['nele:froh:rollstuhl', 'ben:froh:stehen'],
    start: {
      was: 'Berufe gestern und heute',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Beruf ist neu, welcher alt? Verbinde mit einem passenden Beispiel.', stufe: 1, links: ['Hüttenarbeiter', 'App-Entwicklerin', 'Solartechniker'], rechts: ['arbeitete am Hochofen', 'programmiert Apps fürs Handy', 'montiert Solaranlagen auf Dächern'] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Wo Luxemburg arbeitet',
      absaetze: [
        'Früher arbeiteten die meisten Menschen in Luxemburg in der **Landwirtschaft**, später arbeiteten viele in der **Stahlindustrie**. Heute arbeiten die meisten im **Dienstleistungsbereich**: in Banken und Versicherungen, im Handel, in Büros, in Schulen und Krankenhäusern.',
        '### Typisch Luxemburg',
        'Luxemburg ist ein großer **Finanzplatz** mit vielen Banken und Fonds. Wegen seiner Lage mitten in Europa ist auch die **Logistik** wichtig: Waren werden mit Lkw, Zug und Flugzeug weitertransportiert. Luxemburg ist sogar in der **Raumfahrt** aktiv: Von hier aus werden Satelliten gesteuert.',
        '### Gesucht!',
        'Viele Betriebe suchen dringend **Fachkräfte** – besonders im **Handwerk** (Elektrik, Heizung, Bau, Kfz), in der **Pflege** und in der **Informatik**. Auch „**grüne Berufe**“ werden wichtiger: Fachleute für Solaranlagen, Wärmepumpen und Recycling.',
        '### Arbeit von morgen',
        'Computer, Roboter und **künstliche Intelligenz (KI)** verändern viele Berufe. Manche Aufgaben übernehmen Maschinen. Gleichzeitig entstehen neue Berufe. Wichtig bleiben Dinge, die Maschinen schlecht können: mit Menschen umgehen, Probleme kreativ lösen, mit den Händen geschickt arbeiten – und **weiterlernen**, ein Leben lang.',
      ],
      woerter: [['die Dienstleistung', 'le service'], ['der Finanzplatz', 'la place financière'], ['die Logistik', 'la logistique'], ['die Raumfahrt', 'l’industrie spatiale'], ['die Fachkraft', 'le professionnel qualifié'], ['das Handwerk', 'l’artisanat'], ['die künstliche Intelligenz', 'l’intelligence artificielle'], ['weiterlernen', 'continuer à apprendre']],
      aufgaben: [
        { art: 'mc', auftrag: 'Wo werden in Luxemburg besonders Fachkräfte gesucht? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['im Handwerk', 'in der Pflege', 'in der Informatik', 'in der Stahlindustrie am Hochofen'], r: [0, 1, 2] }] },
        { art: 'tabelle', auftrag: 'Zu welchem Bereich gehört der Beruf? Kreuze an.', stufe: 2, kopf: ['Beruf', 'Handwerk', 'Dienst­leistung', 'Logistik'], breiten: [40, 20, 20, 20], zeilen: [['Elektroinstallateurin', '[x]', '', ''], ['Bankkaufmann', '', '[x]', ''], ['Lagerist', '', '', '[x]'], ['Pflegehelferin', '', '[x]', ''], ['Kfz-Mechatroniker', '[x]', '', ''], ['Lkw-Fahrerin', '', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Gespräche an Ständen', wo: 'Berufsmesse in der Schule', titel: 'Drei Stände, drei Berufe',
      situation: 'Nele und Ben gehen über die Berufsmesse. An drei Ständen stellen junge Leute ihren Beruf vor.',
      bild: ['nele:froh:rollstuhl', 'ben:froh:stehen'], sprecher: { Nele: 'w3', Pflegerin: 'w1', Solartechniker: 'm1', Lageristin: 'w2', Ben: 'm3' },
      text: [
        ['Nele', 'Hallo! Was macht man in der Pflege?'],
        ['Pflegerin', 'Ich kümmere mich um ältere Menschen: Körperpflege, Medikamente, Gespräche. Man braucht Geduld und Herz. Und keine Sorge: Diesen Beruf wird kein Roboter ersetzen.'],
        ['Ben', 'Und Sie bauen Solaranlagen?'],
        ['Solartechniker', 'Genau. Ich bin viel auf Dächern unterwegs, darum: schwindelfrei sein! Man lernt Elektrik und arbeitet draußen. Wir finden kaum genug Leute – die Chancen sind super.'],
        ['Nele', 'Was macht eine Lageristin?'],
        ['Lageristin', 'Ich arbeite in einem großen Logistikzentrum. Ich nehme Waren an, prüfe sie und schicke sie weiter. Vieles läuft heute mit Scannern und Computern. Man muss genau sein und gut im Team arbeiten.'],
        ['Ben', 'Hm. Ich mag Technik und draußen sein. Ich glaube, ich mache ein Praktikum bei den Solaranlagen.'],
        ['Nele', 'Und ich schaue mir die Pflege an. Ich rede gern mit Menschen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „schwindelfrei“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['keine Angst vor großer Höhe haben', 'nie lügen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['Beruf', 'Was macht man?', 'Was braucht man?'], breiten: [22, 42, 36], zeilen: [['Pflege', '[kümmert sich um ältere Menschen: Pflege, Medikamente, Gespräche]', '[Geduld und Herz]'], ['Solartechnik', '[baut Solaranlagen auf Dächern, Elektrik]', '[schwindelfrei sein]'], ['Lager', '[Waren annehmen, prüfen, weiterschicken]', '[genau sein, Teamarbeit]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welcher der drei Berufe passt am besten zu einer Person, die gern draußen ist? Gern mit Menschen? Gern genau arbeitet? Begründet.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['… passt gut zu …, weil …', 'Dafür braucht man …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wirtschaft in Luxemburg', punkte: ['vor allem **Dienstleistungen**', '**Finanzplatz**, **Logistik**, **Raumfahrt**', 'Fachkräfte gesucht: **Handwerk, Pflege, Informatik**', '**grüne Berufe**'] },
         { titel: 'Arbeit von morgen', punkte: ['**KI** und Roboter verändern Berufe', 'neue Berufe entstehen', 'wichtig: **Menschen**, **Kreativität**, **geschickte Hände**', '**weiterlernen**'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 2, aussagen: ['Roboter und KI nehmen uns die Arbeit weg.', 'Ein Handwerksberuf hat eine gute Zukunft.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe einen Beruf, der dich interessiert: Was macht man? Was braucht man? Wie wird er sich in Zukunft verändern?', stufe: 2,
        anfaenge: ['Mich interessiert der Beruf …', 'Man …', 'Dafür braucht man …', 'In Zukunft …'], zeilen: 8,
        beispiel: 'Mich interessiert der Beruf Kfz-Mechatronikerin. Man repariert und prüft Autos, sucht Fehler mit dem Computer und wechselt Teile aus. Dafür braucht man technisches Verständnis, geschickte Hände und Geduld. In Zukunft gibt es mehr Elektroautos, darum muss man viel über Batterien und Elektronik lernen.' },
    ],
    check: ['Ich nenne Wirtschaftsbereiche in Luxemburg.', 'Ich nenne Berufe, in denen Fachkräfte gesucht werden.', 'Ich beschreibe, wie sich Berufe verändern.'],
  },
]
