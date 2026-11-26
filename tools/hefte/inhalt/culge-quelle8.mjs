// LEKTIONSQUELLE (Stand vor der Prüfung am 26.11.2026). Die Module culge-m1 … m9 setzen sich nach dem Programm CULGE VP
// (CNES, 30/06/2026) aus diesen Lektionen zusammen – siehe culge-module.mjs. Das MODUL unten wird nicht mehr benutzt.
// Culture générale · Modul 8 (5P) – Schwerpunkt Gesundheit, Beziehungen, nachhaltige Entwicklung
// (MENJE-Leitfaden Voie de préparation: Module 2, 5, 8). Themen: Stress und Entspannung (Atemübung zum Anhören),
// Freundschaft, Liebe und Grenzen, Alkohol und andere Drogen (Stand 2026), Folgen des Klimawandels, Trinkwasser
// (Versuch Filter), Bienen und Artenvielfalt, die Reise eines T-Shirts, Lebensmittel retten.
// Sensible Themen behutsam, ohne Zuschreibungen; Hilfe: 112, 116 111, BEE SECURE 8002 1234. Personen: ausgedacht.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { luxKarte, weltKarte } from './karten.mjs'
import { balken } from './sach-bilder.mjs'

export const MODUL = sachModul('culge', 8, {
  titel: 'Gut leben – fair leben',
  titelFr: 'Bien vivre – vivre de façon équitable',
  unter: 'Stress und Entspannung, Freundschaft und Grenzen, Risiken von Alkohol und Drogen – und wie Klima, Wasser, Bienen, Kleidung und Essen zusammenhängen. In acht Lektionen.',
  unterFr: 'Stress et détente, amitié et limites, alcool et drogues, climat, eau, abeilles, vêtements et alimentation.',
  farbe: '#2f8a6b',
  karten: true,
  deckbild: ['nele:froh:rollstuhl', 'yusuf:froh:stehen', 'mia:froh:stehen'],
  blasen: [{ t: 'Einatmen …', x: 12, y: 108 }, { t: 'Nur Ja heißt Ja!', x: 126, y: 96 }, { t: 'Rette die Banane!', x: 160, y: 150 }],
  themen: [
    { titel: { de: 'Ich und die anderen', fr: 'Moi et les autres' }, icon: 'users', lektionen: 3 },
    { titel: { de: 'Natur schützen', fr: 'Protéger la nature' }, icon: 'leaf', lektionen: 3 },
    { titel: { de: 'Fair konsumieren', fr: 'Consommer de façon équitable' }, icon: 'shopping-bag', lektionen: 2 },
  ],
})

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Stress · Entspannung · Atemübung', titel: 'Wenn alles zu viel wird', untertitel: 'Herzklopfen vor der Prüfung? Du lernst, was Stress im Körper macht, probierst eine Atemübung zum Anhören aus und findest deine eigenen Strategien.',
    ziel: { de: 'Ich erkenne Stress und kenne Wege, mich zu entspannen.', fr: 'Je reconnais le stress et je connais des moyens de me détendre.' },
    bild: ['yusuf:nervoes:stehen', 'lehrerin:ruhig:erklaeren'],
    start: {
      was: 'Stress-Barometer',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie merkt man Stress im Körper? Kreuze an (mehrere möglich). Du musst nicht von dir erzählen.', stufe: 1, fragen: [{ f: '', o: ['Herzklopfen', 'schwitzige Hände', 'Bauchweh', 'schlecht schlafen', 'Kopfschmerzen'], r: [0, 1, 2, 3, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Alarm im Körper',
      absaetze: [
        'Stell dir vor, du bist ein Steinzeitmensch und plötzlich steht ein Bär vor dir. Dein Körper schaltet blitzschnell auf **Alarm**: Das Herz schlägt schneller, du atmest schneller, die Muskeln spannen sich an. Du kannst kämpfen oder weglaufen. Diese **Stressreaktion** hat den Menschen das Leben gerettet.',
        '### Stress heute',
        'Heute stehen selten Bären vor uns. Aber der Körper reagiert genauso auf **Prüfungen**, Streit, Zeitdruck, Ärger in der Familie oder viele Nachrichten auf dem Handy. Kurzer Stress ist normal und kann sogar helfen, sich zu konzentrieren. Wenn der Stress aber **lange** dauert, wird man müde, gereizt oder krank.',
        '### Was hilft?',
        'Der Körper braucht nach dem Alarm eine **Pause**. Hilfreich sind: ruhig und tief **atmen**, **Bewegung** an der frischen Luft, genug **Schlaf**, Musik, mit jemandem **reden** und Aufgaben in kleine Schritte teilen. Was hilft, ist bei jedem Menschen anders. Wenn der Stress nicht mehr aufhört, sollte man sich Hilfe holen, zum Beispiel bei der Schulpsychologin oder bei **116 111**.',
      ],
      woerter: [['der Stress', 'le stress'], ['die Stressreaktion', 'la réaction de stress'], ['sich anspannen', 'se contracter'], ['der Zeitdruck', 'la pression du temps'], ['gereizt', 'irritable'], ['sich entspannen', 'se détendre'], ['tief atmen', 'respirer profondément'], ['die Strategie', 'la stratégie']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Kurzer Stress oder langer Stress? Ordne zu.', stufe: 1, kopf: ['', 'kurzer Stress', 'langer Stress'], breiten: [52, 24, 24], zeilen: [['Herzklopfen vor dem Referat', '[x]', ''], ['wochenlang schlecht schlafen', '', '[x]'], ['schnell zum Bus rennen', '[x]', ''], ['immer müde und gereizt', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Eine Atemübung zum Mitmachen', wo: 'Schulpsychologischer Dienst', titel: 'Die Kasten-Atmung',
      situation: 'Die Schulpsychologin leitet eine kurze Atemübung an. Mach mit, wenn du möchtest – im Sitzen, mit offenen oder geschlossenen Augen. Zähle in Gedanken langsam mit.',
      bild: ['lehrerin:ruhig:erklaeren', 'nele:ruhig:rollstuhl'], sprecher: { Schulpsychologin: 'w1' },
      text: [
        ['Schulpsychologin', 'Setz dich bequem hin. Stell die Füße auf den Boden. Wenn du magst, schließ die Augen. Sonst schau auf einen Punkt vor dir.'],
        ['Schulpsychologin', 'Wir atmen in einem Kasten. Ein Kasten hat vier Seiten. Jede Seite dauert vier Sekunden.'],
        ['Schulpsychologin', 'Atme ein durch die Nase … zwei … drei … vier. Halte die Luft an … zwei … drei … vier.'],
        ['Schulpsychologin', 'Atme langsam aus durch den Mund … zwei … drei … vier. Warte … zwei … drei … vier.'],
        ['Schulpsychologin', 'Noch einmal. Einatmen … zwei … drei … vier. Halten … zwei … drei … vier. Ausatmen … zwei … drei … vier. Warten … zwei … drei … vier.'],
        ['Schulpsychologin', 'Und ein letztes Mal, ganz in deinem Tempo. … Spür, wie deine Schultern locker werden.'],
        ['Schulpsychologin', 'Öffne langsam die Augen. Diese Übung kannst du überall machen: vor einer Prüfung, im Bus oder abends im Bett. Niemand merkt es.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Warum hilft langsames Atmen? Rate!', stufe: 1, fragen: [{ f: '', o: ['Es sagt dem Körper: Alarm vorbei, du kannst dich beruhigen.', 'Es macht schneller.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu (und mach mit). Beantworte dann.', stufe: 1, fragen: [{ f: 'Wie viele Seiten hat der Kasten? Wie lange dauert jede Seite?', l: 'vier Seiten, je vier Sekunden' }, { f: 'Welche vier Schritte gibt es?', l: 'einatmen – halten – ausatmen – warten' }, { f: 'Wo kann man die Übung machen?', l: 'überall: vor einer Prüfung, im Bus, abends im Bett' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie hast du dich nach der Übung gefühlt? Wer möchte, erzählt. Welche anderen Wege zur Entspannung kennt ihr?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Musik hören', 'spazieren gehen', 'Sport', 'malen', 'mit jemandem reden'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Stress', punkte: ['**Alarm** im Körper: Herz, Atmung, Muskeln', 'kurz: normal, kann helfen', 'lang: macht **müde und krank**'] },
         { titel: 'Kasten-Atmung', nummern: true, punkte: ['**einatmen** (4 Sekunden)', '**halten** (4)', '**ausatmen** (4)', '**warten** (4)'] }],
        [{ art: 'tipp', titel: 'Hilfe holen ist stark', text: 'Wenn der Stress nicht aufhört: Sprich mit einer Vertrauensperson, der Schulpsychologin oder ruf **116 111** an (anonym und kostenlos).' }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Stress-Plan (freiwillig): Was stresst eine Person in der Prüfungswoche, und was könnte helfen? Du kannst auch eine ausgedachte Person nehmen.', stufe: 2, kopf: ['Stress-Situation', 'Was hilft?'], breiten: [50, 50], zeilen: [['[z. B. drei Prüfungen in einer Woche]', '[z. B. Lernplan machen, jeden Tag ein bisschen]'], ['[z. B. Angst vor dem Referat]', '[z. B. vorher üben, Kasten-Atmung]'], ['[z. B. abends nicht einschlafen]', '[z. B. Handy eine Stunde vorher weglegen]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Nachricht an eine Freundin oder einen Freund, die oder der vor einer Prüfung sehr gestresst ist. Gib zwei Tipps.', stufe: 2,
        anfaenge: ['Hey …,', 'ich merke, dass …', 'Mir hilft …', 'Du schaffst das, weil …'], zeilen: 6,
        beispiel: 'Hey Sami, ich merke, dass du wegen der Mathe-Prüfung total gestresst bist. Mir hilft es, den Stoff in kleine Teile aufzuteilen und jeden Tag nur einen Teil zu lernen. Und vor der Prüfung mache ich die Kasten-Atmung. Du schaffst das, weil du in den letzten Wochen viel geübt hast!' },
    ],
    check: ['Ich erkläre, was Stress im Körper macht.', 'Ich kann die Kasten-Atmung.', 'Ich nenne Strategien gegen Stress.'],
  },
  // ================================================================ 2
  {
    thema: 'Freundschaft · Liebe · Grenzen', titel: 'Nur Ja heißt Ja', untertitel: 'Verliebt sein, Grenzen spüren, Grenzen achten – auch online: Du liest, hörst ein Gespräch über ein Foto und übst, Nein zu sagen und Nein zu akzeptieren.',
    ziel: { de: 'Ich erkläre, warum Respekt und Einverständnis in Beziehungen wichtig sind, und weiß, wo ich Hilfe finde.', fr: 'J’explique l’importance du respect et du consentement dans les relations et je sais où trouver de l’aide.' },
    bild: ['mia:ruhig:stehen', 'noah:froh:stehen'],
    start: {
      was: 'Was gehört dazu?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist in einer guten Beziehung oder Freundschaft wichtig? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Vertrauen', 'Respekt', 'das Handy des anderen kontrollieren', 'ehrlich reden', 'Eifersucht als Liebesbeweis'], r: [0, 1, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Liebe braucht Respekt',
      absaetze: [
        'Sich zu **verlieben** ist ein starkes Gefühl. Manche verlieben sich früh, manche später, manche in ein Mädchen, manche in einen Jungen. Alles ist in Ordnung. Niemand muss eine Beziehung haben, nur weil andere eine haben.',
        '### Grenzen',
        'Jeder Mensch hat **Grenzen**: Wie nah darf mir jemand kommen? Möchte ich umarmt oder geküsst werden? Diese Grenzen können sich ändern – auch von einem Tag zum nächsten. Wichtig ist: **Nur Ja heißt Ja.** Wer schweigt, unsicher ist oder Nein sagt, sagt nicht Ja. Ein Nein muss man **akzeptieren**, ohne Druck und ohne Beleidigung.',
        '### Gesund oder nicht?',
        'In einer guten Beziehung fühlen sich beide **sicher** und **frei**. Warnzeichen sind: Einer kontrolliert das Handy des anderen, verbietet Freundschaften, droht oder macht ständig eifersüchtige Szenen.',
        '### Online',
        'Nacktbilder von Jugendlichen **weiterzuleiten** oder zu verbreiten ist **strafbar** – auch wenn es nur „Spaß“ sein soll (Stand 2026). Wer unter Druck gesetzt wird, ein Bild zu schicken, ist **nicht schuld**. Wer so ein Bild bekommt: nicht weiterleiten, einer Vertrauensperson Bescheid sagen und es dann löschen. Hilfe gibt es bei **BEE SECURE (8002 1234)** und bei **116 111**.',
      ],
      woerter: [['sich verlieben', 'tomber amoureux'], ['die Beziehung', 'la relation'], ['die Grenze', 'la limite'], ['das Einverständnis', 'le consentement'], ['akzeptieren', 'accepter'], ['die Eifersucht', 'la jalousie'], ['kontrollieren', 'contrôler'], ['weiterleiten', 'transférer']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Gesund oder Warnzeichen? Kreuze an.', stufe: 1, kopf: ['', 'gesund', 'Warnzeichen'], breiten: [60, 20, 20], zeilen: [['Wir treffen beide auch andere Freunde.', '[x]', ''], ['Er will immer wissen, mit wem sie schreibt.', '', '[x]'], ['Sie sagt Nein, und er sagt: „Okay, kein Problem.“', '[x]', ''], ['Er droht: „Wenn du gehst, erzähle ich allen …“', '', '[x]'], ['Wir reden ehrlich, auch wenn wir streiten.', '[x]', '']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Schulhof · nach der Schule', titel: 'Das Foto',
      situation: 'Noah zeigt Mia sein Handy. Jemand hat ihm ein peinliches Foto einer Mitschülerin geschickt.',
      bild: ['noah:verwirrt:handy', 'mia:besorgt:stehen'], sprecher: { Noah: 'm3', Mia: 'w3' },
      text: [
        ['Noah', 'Mia, schau mal. Das hat mir jemand aus der Parallelklasse geschickt. Ein Foto von Elif in der Umkleide. Alle schicken es weiter.'],
        ['Mia', 'Was? Mach das sofort weg! Hat Elif das erlaubt?'],
        ['Noah', 'Bestimmt nicht. Das wurde heimlich gemacht.'],
        ['Mia', 'Dann ist das richtig schlimm. Stell dir vor, das wärst du. Und weiterleiten ist sogar verboten.'],
        ['Noah', 'Ich habe es ja nicht gemacht. Ich hab es nur bekommen.'],
        ['Mia', 'Dann leite es auf keinen Fall weiter. Wir sagen es Frau Sommer. Sie weiß, was zu tun ist. Und dann löschst du es.'],
        ['Noah', 'Und Elif?'],
        ['Mia', 'Ich schreib ihr, dass wir zu ihr halten. Sie soll wissen, dass sie nicht allein ist.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „heimlich“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ohne dass die Person es weiß', 'mit Erlaubnis'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Was schlägt Mia vor? Ordne.', stufe: 1, teile: ['das Foto nicht weiterleiten', 'Frau Sommer Bescheid sagen', 'das Foto löschen', 'Elif schreiben, dass sie nicht allein ist'], ordnung: [2, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Warum ist das Foto „richtig schlimm“?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Es wurde heimlich ohne Erlaubnis gemacht und wird weitergeschickt; das verletzt Elif, und Weiterleiten ist verboten.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was kann die ganze Klasse tun, damit so etwas nicht passiert oder Betroffene Hilfe bekommen?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Wir könnten …', 'Wichtig ist, dass …', 'Hilfe gibt es bei …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Respekt in Beziehungen', punkte: ['**Nur Ja heißt Ja.**', 'Ein **Nein** akzeptieren', 'Warnzeichen: **Kontrolle**, **Drohungen**, Verbote', 'jeder darf lieben, wen er oder sie liebt'] },
         { titel: 'Intime Bilder', punkte: ['**nicht** machen, schicken, **weiterleiten**', 'einer **Vertrauensperson** Bescheid sagen, dann löschen', 'Hilfe: **BEE SECURE 8002 1234**, **116 111**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Wie kann man Nein sagen – und wie ein Nein gut annehmen? Ergänze.', stufe: 2, kopf: ['Situation', 'Nein sagen', 'Nein annehmen'], breiten: [34, 33, 33], zeilen: [['Jemand will dich zur Begrüßung umarmen, du willst nicht.', '[z. B. „Lieber nur ein Hallo, okay?“]', '[z. B. „Klar, kein Problem.“]'], ['Jemand will ein Foto von dir posten.', '[z. B. „Bitte nicht, das möchte ich nicht.“]', '[z. B. „Okay, ich lösche es.“]'], ['Jemand will deine Hand halten, du bist unsicher.', '[z. B. „Ich weiß noch nicht. Lass mir Zeit.“]', '[z. B. „Okay, ich warte.“]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine kurze Nachricht an Elif aus der Geschichte: Zeig ihr, dass du zu ihr hältst, und sag ihr, wo sie Hilfe bekommt.', stufe: 2,
        anfaenge: ['Hey Elif,', 'wir haben gesehen, dass …', 'Das ist nicht deine Schuld.', 'Du kannst …'], zeilen: 6,
        beispiel: 'Hey Elif, wir haben gesehen, dass ein Foto von dir herumgeschickt wird. Wir haben es nicht weitergeleitet und Frau Sommer Bescheid gesagt. Das ist nicht deine Schuld. Du kannst auch bei BEE SECURE anrufen, die helfen, solche Bilder zu löschen. Wir sind für dich da.' },
    ],
    check: ['Ich erkläre „Nur Ja heißt Ja“.', 'Ich erkenne Warnzeichen in Beziehungen.', 'Ich weiß, was ich bei intimen Bildern tun muss.'],
  },
  // ================================================================ 3
  {
    thema: 'Alkohol · Cannabis · Gruppendruck', titel: 'Party ohne Absturz', untertitel: 'Was Alkohol und Cannabis mit dem jungen Gehirn machen, was im Notfall zu tun ist – und eine schwierige Entscheidung auf einer Party.',
    ziel: { de: 'Ich nenne Risiken von Alkohol und Cannabis und weiß, was ich im Notfall tue.', fr: 'Je cite les risques de l’alcool et du cannabis et je sais quoi faire en cas d’urgence.' },
    bild: ['ben:besorgt:stehen', 'jana:froh:stehen'],
    start: {
      was: 'Mythos oder Fakt?',
      aufgaben: [
        { art: 'rf', auftrag: 'Was glaubst du? (Die Lösung steht im Text.)', stufe: 1, saetze: [['Kalt duschen macht schnell wieder nüchtern.', false], ['Das Gehirn entwickelt sich bis etwa 25.', true], ['Wer betrunken ist und nicht mehr reagiert, braucht sofort Hilfe.', true]] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Was Drogen mit dem Körper machen',
      absaetze: [
        '**Alkohol** und **Cannabis** sind **Drogen**: Sie verändern, wie wir denken, fühlen und handeln. Bei Jugendlichen ist das Risiko besonders groß, denn das **Gehirn** entwickelt sich bis etwa zum 25. Lebensjahr. Wer früh und viel konsumiert, kann sich schlechter konzentrieren, schlechter lernen und wird leichter **abhängig**.',
        '### Alkohol',
        'Alkohol macht zuerst locker, dann unsicher: Man redet laut, schwankt, sieht verschwommen und schätzt Gefahren falsch ein. Viel Alkohol in kurzer Zeit kann zu einer **Alkoholvergiftung** führen. Man wird bewusstlos und kann an Erbrochenem ersticken. Kaffee oder kalt duschen helfen **nicht** – nur Zeit.',
        '### Cannabis',
        'Seit 2023 dürfen Erwachsene in Luxemburg zu Hause eine kleine Menge Cannabis für sich selbst anbauen und dort konsumieren. Für Jugendliche unter 18 bleibt Cannabis **verboten**. Verkauf und Konsum in der Öffentlichkeit sind auch für Erwachsene verboten. Cannabis kann Gedächtnis und Motivation schwächen und bei manchen Menschen **Angst** oder **Psychosen** auslösen.',
        '### Im Notfall',
        'Wenn jemand nicht mehr reagiert: **112** anrufen. Atmet die Person normal, kommt sie in die **stabile Seitenlage**. Atmet sie nicht normal, erklärt die Leitstelle am Telefon die Herzdruckmassage. Die Person nie allein lassen. Hilfe holen ist immer richtig – ein Leben ist wichtiger als Ärger.',
      ],
      woerter: [['die Droge', 'la drogue'], ['konsumieren', 'consommer'], ['nüchtern', 'sobre'], ['betrunken', 'ivre, saoul'], ['die Alkoholvergiftung', 'l’intoxication alcoolique'], ['ersticken', 's’étouffer'], ['der Gruppendruck', 'la pression du groupe'], ['die Psychose', 'la psychose']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Warum sind Drogen für Jugendliche besonders riskant?', l: 'Das Gehirn entwickelt sich bis etwa 25; man wird leichter abhängig und lernt schlechter.' }, { f: 'Was hilft bei zu viel Alkohol wirklich?', l: 'nur Zeit (nicht Kaffee oder kalt duschen)' }, { f: 'Was tust du, wenn jemand nicht mehr reagiert?', zeilen: 2, l: '112 anrufen, stabile Seitenlage, nicht allein lassen' }] },
      ],
    },
    hoeren: {
      was: 'Eine Geschichte', wo: 'Geburtstagsparty · Samstagabend', titel: 'Jana trifft eine Entscheidung',
      situation: 'Jana ist auf einer Party. Ihr Freund Ben hat zu viel getrunken.',
      bild: ['jana:besorgt:handy', 'ben:muede:sitzen'], sprecher: { Erzählerin: 'w1', Jana: 'w2', Ben: 'm3', Mädchen: 'w3' },
      text: [
        ['Erzählerin', 'Es ist elf Uhr. Die Musik ist laut. Jana sucht Ben und findet ihn draußen auf einer Bank.'],
        ['Jana', 'Ben? Alles okay?'],
        ['Ben', 'Mir ist … total schlecht. Alles dreht sich.'],
        ['Erzählerin', 'Ein Mädchen kommt dazu.'],
        ['Mädchen', 'Lass ihn, der schläft das aus. Wenn du die Eltern anrufst, gibt es nur Ärger für alle.'],
        ['Erzählerin', 'Ben antwortet nicht mehr. Er hat die Augen zu. Jana rüttelt ihn an der Schulter. Er reagiert kaum.'],
        ['Jana', 'Nein. Das ist mir egal. Er reagiert nicht richtig. Ich rufe die 112 an.'],
        ['Erzählerin', 'Jana dreht Ben mit Hilfe eines Freundes in die stabile Seitenlage und bleibt bei ihm. Zehn Minuten später ist der Rettungswagen da. Am nächsten Tag schreibt Ben: „Danke. Die Ärztin hat gesagt, das war knapp.“'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „das war knapp“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Es hätte fast schlimm ausgehen können.', 'Es ging sehr schnell.'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Ben sitzt drinnen auf dem Sofa.', false], ['Das Mädchen rät, Ben schlafen zu lassen.', true], ['Jana ruft die 112 an.', true], ['Jana lässt Ben allein, bis die Hilfe kommt.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum war Janas Entscheidung richtig, obwohl sie Ärger befürchten musste?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Jana hat richtig gehandelt, weil …', 'Das Mädchen hatte unrecht, weil …', 'Ich hätte …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Risiken', punkte: ['junges **Gehirn** reagiert empfindlich', 'schneller **abhängig**', 'Unfälle, Streit, **Alkoholvergiftung**', 'Cannabis: unter 18 **verboten**'] },
         { titel: 'Notfall', nummern: true, punkte: ['ansprechen, **rütteln**', 'reagiert nicht? **112** anrufen', 'atmet normal? **stabile Seitenlage**', '**nicht allein lassen**'] }],
      ],
    },
    ueben: [
      { art: 'dilemma', auftrag: 'Was würdest du tun? Denk über alle Möglichkeiten nach.', stufe: 3,
        geschichte: ['Nach einer Party will dein Kumpel Yusuf mit seinem Roller nach Hause fahren. Er hat zwei Bier getrunken und sagt: „Ich bin voll fit, ist doch nur ein Kilometer!“', 'Der letzte Bus ist schon weg.'],
        frage: 'Was machst du?',
        optionen: ['Ich lasse ihn fahren – es ist ja nur ein Kilometer.', 'Ich nehme ihm den Schlüssel weg und wir gehen zu Fuß.', 'Ich rufe jemanden an, der uns abholt.'],
        hinweis: 'Gut begründete Entscheidungen zählen. Fahren unter Alkohol ist gefährlich und verboten – B oder C schützen Yusuf und andere.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe für die Schülerzeitung fünf Regeln für eine sichere Party.', stufe: 2,
        anfaenge: ['1.', '2.', '3.', '4.', '5.'], zeilen: 7,
        beispiel: '1. Wir passen aufeinander auf und gehen zusammen nach Hause. 2. Niemand wird zu etwas gedrängt – ein Nein ist ein Nein. 3. Es gibt genug Wasser und Essen. 4. Wenn es jemandem schlecht geht, holen wir Hilfe und rufen im Notfall die 112. 5. Niemand fährt nach Alkohol Auto oder Roller.' },
    ],
    check: ['Ich nenne Risiken von Alkohol und Cannabis.', 'Ich weiß, was ich im Notfall tue.', 'Ich treffe eine begründete Entscheidung.'],
  },
  // ================================================================ 4
  {
    thema: 'Klimawandel · Folgen · Anpassung', titel: 'Wenn das Wetter extrem wird', untertitel: 'Hochwasser, Hitze, trockene Wälder: Du liest, welche Folgen der Klimawandel in Luxemburg und weltweit hat, hörst eine Feuerwehrfrau und überlegst, was hilft.',
    ziel: { de: 'Ich beschreibe Folgen des Klimawandels und nenne Wege, das Klima zu schützen und sich anzupassen.', fr: 'Je décris les conséquences du changement climatique et je cite des moyens de protection et d’adaptation.' },
    bild: ['tom:besorgt:stehen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Erinnerst du dich?',
      aufgaben: [
        { art: 'fragen', auftrag: 'Was ist der Treibhauseffekt? Erkläre in einem Satz (siehe Modul 5).', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Gase wie CO₂ halten Wärme in der Atmosphäre; mehr CO₂ macht die Erde wärmer.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Folgen – auch bei uns',
      absaetze: [
        'Die Erde ist heute im Durchschnitt deutlich wärmer als vor 150 Jahren, ungefähr um 1,2 bis 1,5 Grad. Das klingt wenig, verändert aber das **Wetter**: Es gibt mehr **Hitzewellen**, längere **Trockenzeiten** und mehr **Starkregen**.',
        '### Luxemburg',
        'Im **Juli 2016** überschwemmte ein Unwetter in kurzer Zeit Orte im **Müllerthal**. Im **Juli 2021** traten nach tagelangem Regen viele Flüsse über die Ufer, zum Beispiel die Sauer in **Echternach** und die Alzette. Viele Keller und Häuser standen unter Wasser. In heißen, trockenen Sommern leiden die **Wälder**: Fichten werden schwach und von Käfern befallen.',
        '### Weltweit',
        '**Gletscher** schmelzen, der **Meeresspiegel** steigt. Inseln und Küsten sind bedroht. In manchen Gegenden fehlt Wasser für Felder, und Menschen müssen ihre Heimat verlassen.',
        '### Schützen und anpassen',
        'Zwei Dinge sind wichtig: **Klimaschutz** heißt, weniger CO₂ ausstoßen (Strom aus Sonne und Wind, weniger Auto, gut dämmen). **Anpassung** heißt, sich auf die Folgen vorzubereiten: Flüssen mehr Platz geben, Bäume in der Stadt pflanzen, Warnsysteme für Hochwasser bauen. Die EU und Luxemburg wollen bis **2050 klimaneutral** sein.',
      ],
      woerter: [['der Klimawandel', 'le changement climatique'], ['die Hitzewelle', 'la vague de chaleur'], ['die Trockenheit', 'la sécheresse'], ['der Starkregen', 'les pluies torrentielles'], ['das Hochwasser', 'l’inondation, la crue'], ['der Gletscher', 'le glacier'], ['der Meeresspiegel', 'le niveau de la mer'], ['klimaneutral', 'neutre en carbone']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Klimaschutz oder Anpassung? Kreuze an.', stufe: 2, kopf: ['Maßnahme', 'Klimaschutz', 'Anpassung'], breiten: [60, 20, 20], zeilen: [['Solaranlagen aufs Dach', '[x]', ''], ['Bäume in der Stadt für Schatten', '', '[x]'], ['mit dem Zug statt mit dem Auto', '[x]', ''], ['Hochwasser-Warnsystem', '', '[x]'], ['Häuser besser dämmen', '[x]', '']] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Schulradio', titel: 'Die Nacht, als das Wasser kam',
      situation: 'Tom interviewt eine Feuerwehrfrau, die 2021 beim Hochwasser im Einsatz war.',
      bild: ['tom:froh:handy', 'mutter:ruhig:erklaeren'], sprecher: { Tom: 'm3', Feuerwehrfrau: 'w1' },
      text: [
        ['Tom', 'Sie waren im Juli 2021 im Einsatz. Wie war das?'],
        ['Feuerwehrfrau', 'Es hatte tagelang geregnet. In der Nacht stieg das Wasser sehr schnell. Wir haben Keller leer gepumpt, Sandsäcke gelegt und Menschen aus ihren Häusern geholt.'],
        ['Tom', 'Hatten Sie Angst?'],
        ['Feuerwehrfrau', 'Respekt, ja. Strömendes Wasser ist gefährlich. Schon dreißig Zentimeter können ein Auto wegschieben.'],
        ['Tom', 'Was sollen Menschen bei Hochwasser tun?'],
        ['Feuerwehrfrau', 'Warnungen im Radio und auf dem Handy ernst nehmen. Nicht in überflutete Keller oder Unterführungen gehen – da gibt es Strom und Strömung. Lieber nach oben gehen und im Notfall 112 anrufen.'],
        ['Tom', 'Wird so etwas wieder passieren?'],
        ['Feuerwehrfrau', 'Starkregen wird mit dem Klimawandel häufiger. Darum bereiten wir uns besser vor: mit Warnsystemen, Übungen und mehr Platz für die Flüsse.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wozu dienen Sandsäcke? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie halten Wasser von Häusern fern.', 'Sie sind für den Spielplatz.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was hat die Feuerwehr in der Nacht gemacht?', zeilen: 2, l: 'Keller leer gepumpt, Sandsäcke gelegt, Menschen aus Häusern geholt' }, { f: 'Wie viel strömendes Wasser kann ein Auto wegschieben?', l: 'schon 30 Zentimeter' }, { f: 'Nenne zwei Verhaltensregeln bei Hochwasser.', zeilen: 2, l: 'Warnungen ernst nehmen; nicht in Keller oder Unterführungen gehen; nach oben gehen; im Notfall 112' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie kann sich eure Gemeinde auf Hitze oder Hochwasser vorbereiten? Sammelt Ideen.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Bäume pflanzen', 'Trinkbrunnen', 'Flächen entsiegeln', 'Warn-App'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Folgen des Klimawandels', punkte: ['mehr **Hitze** und **Trockenheit**', 'mehr **Starkregen** und **Hochwasser**', '**Gletscher** schmelzen, **Meeresspiegel** steigt', 'Luxemburg: Hochwasser **2016** und **2021**'] },
         { titel: 'Was hilft?', punkte: ['**Klimaschutz**: weniger CO₂', '**Anpassung**: auf Folgen vorbereiten', 'Ziel: **klimaneutral bis 2050**'] }],
      ],
    },
    ueben: [
      { art: 'mindmap', auftrag: 'Folgen des Klimawandels: Ergänze die Mindmap.', stufe: 2, mitte: 'Klimawandel', hoehe: 82, aeste: ['Hitzewellen', { l: 'Trockenheit' }, { l: 'Starkregen, Hochwasser' }, 'Gletscher schmelzen', { l: 'Meeresspiegel steigt' }, { l: 'Wälder leiden' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief an den Gemeinderat: Was soll die Gemeinde tun, um Klima zu schützen oder sich anzupassen? Nenne zwei Vorschläge mit Begründung.', stufe: 3,
        anfaenge: ['Sehr geehrte Damen und Herren,', 'wir machen uns Sorgen, weil …', 'Wir schlagen vor, …', 'Das hilft, weil …', 'Mit freundlichen Grüßen'], zeilen: 8,
        beispiel: 'Sehr geehrte Damen und Herren, wir machen uns Sorgen, weil es im Sommer auf dem Schulhof sehr heiß wird. Wir schlagen vor, Bäume zu pflanzen und einen Trinkbrunnen aufzustellen. Außerdem könnte die Gemeinde Solaranlagen auf das Schuldach bauen. Das hilft, weil Bäume Schatten spenden und Solarstrom kein CO₂ ausstößt. Mit freundlichen Grüßen, die Klasse 5P1' },
    ],
    check: ['Ich nenne Folgen des Klimawandels.', 'Ich unterscheide Klimaschutz und Anpassung.', 'Ich weiß, wie ich mich bei Hochwasser verhalte.'],
  },
  // ================================================================ 5
  {
    thema: 'Trinkwasser · Obersauer-Stausee · Wasserfilter (Versuch)', titel: 'Woher kommt unser Wasser?', untertitel: 'Vom Stausee bis zum Wasserhahn: Du liest, woher das Trinkwasser in Luxemburg kommt, baust einen Wasserfilter und rechnest deinen Wasserverbrauch.',
    ziel: { de: 'Ich erkläre den Weg des Trinkwassers und warum wir Wasser schützen müssen.', fr: 'J’explique le trajet de l’eau potable et pourquoi il faut protéger l’eau.' },
    bild: ['lio:froh:stehen', 'lea:froh:stehen'],
    start: {
      was: 'Schätze!',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie viel Wasser verbraucht ein Mensch in Luxemburg ungefähr pro Tag im Haushalt?', stufe: 1, fragen: [{ f: '', o: ['etwa 13 Liter', 'etwa 130 Liter', 'etwa 1300 Liter'], r: 1 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Karte', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Vom See in den Wasserhahn',
      absaetze: [
        'Etwa die Hälfte des Trinkwassers in Luxemburg kommt aus dem **Obersauer-Stausee** bei **Esch-sur-Sûre** im Norden. Das Wasser wird in einer großen Anlage **gereinigt**: Schmutz setzt sich ab, das Wasser wird gefiltert und kontrolliert. Dann fließt es durch lange **Leitungen** in die Gemeinden. Der andere Teil kommt aus **Quellen** und **Grundwasser**, vor allem aus dem Luxemburger Sandstein.',
        '### Wasser schützen',
        'Rund um den Stausee gibt es eine **Schutzzone**: Dort dürfen keine Schadstoffe in den Boden. Auch Dünger und Pflanzenschutzmittel von Feldern können das Grundwasser belasten. Darum ist es wichtig, keine Medikamente, Öle oder Farben in die Toilette oder den Abfluss zu kippen.',
        '### Nach dem Benutzen',
        'Das schmutzige Wasser aus Küche, Bad und Toilette heißt **Abwasser**. Es fließt durch die Kanalisation in eine **Kläranlage**. Dort wird es gereinigt und dann in einen Fluss geleitet.',
        '### Wie viel?',
        'Im Haushalt verbraucht ein Mensch in Luxemburg ungefähr **130 Liter** Wasser pro Tag – das meiste für Toilette, Duschen und Waschen. Zum Trinken und Kochen braucht man nur ein paar Liter.',
      ],
      bildHtml: luxKarte({ kantone: 'keine', orte: ['Luxemburg', 'Esch-sur-Sûre', 'Wiltz', 'Ettelbrück'], marken: [{ ort: 'Esch-sur-Sûre', text: 'Obersauer-Stausee', farbe: '#1f6aa0' }], fluesse: true, breite: 70, massstab: false }),
      woerter: [['das Trinkwasser', 'l’eau potable'], ['der Stausee', 'le lac de barrage'], ['reinigen', 'purifier'], ['die Leitung', 'la conduite'], ['das Grundwasser', 'les eaux souterraines'], ['die Quelle', 'la source'], ['das Abwasser', 'les eaux usées'], ['die Kläranlage', 'la station d’épuration']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Der Weg des Wassers: Ordne.', stufe: 1, teile: ['Wasser im Obersauer-Stausee', 'Reinigung in der Wasseranlage', 'Leitungen bis in die Gemeinde', 'Wasserhahn zu Hause', 'Abwasser in die Kläranlage', 'gereinigtes Wasser in den Fluss'], ordnung: [4, 1, 5, 0, 3, 2] },
      ],
    },
    hoeren: {
      was: 'Eine Führung', wo: 'Kläranlage', titel: 'Was passiert mit dem Abwasser?',
      situation: 'Lio und Lea besuchen mit der Klasse eine Kläranlage. Ein Mitarbeiter erklärt.',
      bild: ['lio:verwirrt:stehen', 'lea:froh:stehen'], sprecher: { Mitarbeiter: 'm1', Lea: 'w3', Lio: 'm3' },
      text: [
        ['Mitarbeiter', 'Hier kommt das Abwasser von etwa zwanzigtausend Menschen an. Zuerst hält ein Rechen große Dinge zurück.'],
        ['Lea', 'Was für Dinge?'],
        ['Mitarbeiter', 'Feuchttücher, Wattestäbchen, Binden, sogar Spielzeug. Das gehört alles in den Müll, nicht in die Toilette! Feuchttücher verstopfen unsere Pumpen.'],
        ['Lio', 'Und dann?'],
        ['Mitarbeiter', 'In großen Becken setzen sich Sand und Schlamm ab. Danach arbeiten winzige Lebewesen für uns: Bakterien fressen den Schmutz im Wasser.'],
        ['Lea', 'Kann man das Wasser danach trinken?'],
        ['Mitarbeiter', 'Nein. Es ist sauber genug für den Fluss, aber kein Trinkwasser. Und manche Stoffe, zum Beispiel Reste von Medikamenten, bekommen wir schwer heraus. Darum: alte Medikamente zurück in die Apotheke, nicht in die Toilette!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was gehört NICHT in die Toilette? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Feuchttücher', 'alte Medikamente', 'Speiseöl', 'Toilettenpapier'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne die Schritte in der Kläranlage.', stufe: 1, teile: ['Ein Rechen hält große Dinge zurück.', 'Sand und Schlamm setzen sich in Becken ab.', 'Bakterien fressen den Schmutz.', 'Das gereinigte Wasser fließt in den Fluss.'], ordnung: [2, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Wohin gehören alte Medikamente?', stufe: 1, fragen: [{ f: '', l: 'zurück in die Apotheke' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Gestaltet zu zweit ein Schild für die Schultoiletten: Was darf hinein, was nicht?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Nur Papier!', 'Feuchttücher → Mülleimer', 'Danke für deine Hilfe!'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Trinkwasser in Luxemburg', punkte: ['etwa die **Hälfte** aus dem **Obersauer-Stausee**', 'der Rest aus **Quellen** und **Grundwasser**', 'wird **gereinigt** und kontrolliert'] },
         { titel: 'Wasser schützen', punkte: ['Toilette: **nur** Toilettenpapier', 'Medikamente → **Apotheke**', 'Öl, Farben → **Recyclinghof**', 'Wasser **sparen**'] }],
      ],
    },
    ueben: [
      { art: 'versuch', auftrag: 'Baut in der Gruppe einen Wasserfilter. Achtung: Das gefilterte Wasser ist NICHT trinkbar!', stufe: 2,
        frage: 'Kann man schmutziges Wasser mit Kies, Sand und Watte sauberer machen?',
        material: ['eine abgeschnittene Plastikflasche (Hals nach unten)', 'Watte, feiner Sand, Kies', 'ein Glas', 'schmutziges Wasser (Wasser mit Erde)'],
        schritte: ['Stopf Watte in den Flaschenhals.', 'Füll eine Schicht Sand und darüber eine Schicht Kies ein.', 'Stell die Flasche umgedreht auf das Glas.', 'Gieß das schmutzige Wasser langsam hinein.', 'Vergleiche das Wasser vorher und nachher.'],
        loesung: { vermutung: 'z. B. Das Wasser wird ganz sauber.', beobachtung: 'Das Wasser ist klarer und weniger braun, aber nicht ganz klar.', ergebnis: 'Ein Filter hält Schmutzteile zurück. Bakterien und gelöste Stoffe bleiben aber im Wasser. Darum braucht Trinkwasser eine viel bessere Reinigung.' } },
      { art: 'rechnen', auftrag: 'Wasser im Haushalt (ungefähre Werte).', stufe: 2, spalten: 2, items: [
        { a: 'Eine Dusche von 8 Minuten. Pro Minute fließen etwa 10 Liter. Wie viel Wasser ist das?', l: '8 · 10 = 80 Liter', raum: 2 },
        { a: 'Eine Toilettenspülung braucht etwa 6 Liter. Wie viel sind 5 Spülungen am Tag?', l: '5 · 6 = 30 Liter', raum: 2 },
        { a: 'Wie viel spart man, wenn man nur 4 statt 8 Minuten duscht?', l: '4 · 10 = 40 Liter pro Dusche', raum: 2 },
        { a: 'Wie viel spart man so in einem Monat (30 Tage), wenn man jeden Tag duscht?', l: '30 · 40 = 1200 Liter', raum: 2 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre einem Kind aus der Grundschule in einfachen Worten, woher unser Trinkwasser kommt und wie man es schützt.', stufe: 2,
        anfaenge: ['Unser Wasser kommt …', 'Bevor es aus dem Hahn kommt, …', 'Du kannst helfen, wenn du …'], zeilen: 7,
        beispiel: 'Unser Wasser kommt zum großen Teil aus einem großen See im Norden, dem Obersauer-Stausee, und aus Quellen im Boden. Bevor es aus dem Hahn kommt, wird es gereinigt und kontrolliert. Du kannst helfen, wenn du nichts außer Toilettenpapier in die Toilette wirfst und beim Zähneputzen das Wasser zudrehst.' },
    ],
    check: ['Ich erkläre, woher unser Trinkwasser kommt.', 'Ich beschreibe, was in einer Kläranlage passiert.', 'Ich nenne Wege, Wasser zu schützen und zu sparen.'],
  },
  // ================================================================ 6
  {
    thema: 'Artenvielfalt · Bienen · Insekten', titel: 'Ohne Bienen keine Äpfel', untertitel: 'Wildbienen, Hummeln, Schmetterlinge: Du lernst, warum Insekten so wichtig sind, hörst eine Imkerin und planst eine bienenfreundliche Ecke.',
    ziel: { de: 'Ich erkläre, warum Insekten wichtig sind, und nenne Wege, sie zu schützen.', fr: 'J’explique pourquoi les insectes sont importants et je cite des moyens de les protéger.' },
    bild: ['amira:froh:stehen-zeigen', 'oma:froh:stehen'],
    start: {
      was: 'Was wäre, wenn …?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was würde ohne Bienen und andere Bestäuber fehlen? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['viele Äpfel und Kirschen', 'Erdbeeren', 'Kürbisse', 'Salz'], r: [0, 1, 2] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Kleine Tiere, große Arbeit',
      absaetze: [
        'Wenn eine Biene Nektar aus einer Blüte trinkt, bleibt **Blütenstaub** (Pollen) an ihr hängen. In der nächsten Blüte streift sie ihn ab. So wird die Blüte **bestäubt**, und es kann eine Frucht wachsen. Etwa **drei Viertel** unserer Nutzpflanzen profitieren von Bestäubern – zum Beispiel Äpfel, Kirschen, Erdbeeren und Kürbisse.',
        '### Nicht nur Honigbienen',
        'Die Honigbiene kennen alle. Aber in Europa gibt es rund **2000 Arten von Wildbienen**, dazu Hummeln, Schwebfliegen, Schmetterlinge und Käfer. Viele Wildbienen leben allein und nisten in Erdlöchern, hohlen Stängeln oder Totholz.',
        '### Insekten in Gefahr',
        'In den letzten Jahrzehnten sind viele Insekten **seltener** geworden. Gründe sind: Es gibt weniger **Blumenwiesen**, viele Flächen sind **versiegelt** (Beton, Asphalt, Schottergärten), und **Pflanzenschutzmittel** schaden ihnen. Wenn Insekten fehlen, fehlt auch Futter für Vögel, Igel und Fledermäuse. Das nennt man den Verlust der **Artenvielfalt**.',
        '### Was hilft?',
        'Heimische **Wildblumen** säen, Rasen nicht so oft mähen, Laub und Totholz liegen lassen, auf Gift im Garten verzichten und **Nisthilfen** aufstellen.',
      ],
      woerter: [['die Biene', 'l’abeille'], ['die Hummel', 'le bourdon'], ['bestäuben', 'polliniser'], ['der Blütenstaub (Pollen)', 'le pollen'], ['die Artenvielfalt', 'la biodiversité'], ['versiegelt', 'imperméabilisé, bétonné'], ['das Totholz', 'le bois mort'], ['die Nisthilfe', 'le nichoir']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Wie entsteht ein Apfel? Ordne.', stufe: 1, teile: ['Die Biene trinkt Nektar aus einer Apfelblüte.', 'Pollen bleibt an ihr hängen.', 'In der nächsten Blüte streift sie den Pollen ab.', 'Die Blüte ist bestäubt.', 'Ein Apfel wächst.'], ordnung: [2, 4, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Nenne drei Gründe, warum Insekten seltener werden.', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'weniger Blumenwiesen, versiegelte Flächen (Beton, Schottergärten), Pflanzenschutzmittel' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Garten mit Bienenstöcken', titel: 'Bei der Imkerin',
      situation: 'Amira besucht eine Imkerin, die am Dorfrand Bienen hält.',
      bild: ['oma:froh:stehen', 'amira:ueberrascht:stehen'], sprecher: { Imkerin: 'w1', Amira: 'w2' },
      text: [
        ['Imkerin', 'In einem Bienenstock leben im Sommer bis zu fünfzigtausend Bienen. Es gibt eine Königin, die Eier legt, und viele Arbeiterinnen.'],
        ['Amira', 'Was machen die Arbeiterinnen?'],
        ['Imkerin', 'Alles! Putzen, Larven füttern, Waben bauen, den Stock bewachen und Nektar sammeln. Für ein Glas Honig fliegen sie zusammen eine Strecke, die mehrmals um die Erde reicht.'],
        ['Amira', 'Sticht die Biene nicht?'],
        ['Imkerin', 'Nur, wenn sie sich bedroht fühlt. Ruhig bleiben, nicht schlagen. Wildbienen stechen übrigens fast nie.'],
        ['Amira', 'Wie kann ich den Bienen helfen? Wir haben keinen Garten.'],
        ['Imkerin', 'Ein Blumenkasten auf dem Balkon reicht schon: Lavendel, Thymian, Ringelblumen. Und an der Schule könntet ihr eine Ecke mit Wildblumen anlegen und ein Insektenhotel bauen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Imkerin? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Person, die Bienen hält', 'eine Person, die Insekten bekämpft'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Im Sommer leben bis zu 50 000 Bienen in einem Stock.', true], ['Die Königin sammelt den Nektar.', false], ['Bienen stechen nur, wenn sie sich bedroht fühlen.', true], ['Ohne Garten kann man Bienen nicht helfen.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Plant eine bienenfreundliche Ecke für eure Schule: Wo? Was pflanzt ihr? Wer kümmert sich?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Wildblumenwiese', 'Kräuter im Topf', 'Insektenhotel', 'Wasserschale mit Steinen'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Warum Insekten wichtig sind', punkte: ['**bestäuben** Blüten → Früchte', 'etwa **3/4** der Nutzpflanzen profitieren von Bestäubern', '**Futter** für Vögel, Igel, Fledermäuse'] },
         { titel: 'So helfen wir', punkte: ['heimische **Wildblumen**', 'weniger mähen, **Totholz** liegen lassen', '**kein Gift** im Garten', '**Nisthilfen**, Insektenhotel'] }],
      ],
    },
    ueben: [
      { art: 'mindmap', auftrag: 'Was hilft Bienen und anderen Insekten? Ergänze die Mindmap.', stufe: 2, mitte: 'Insekten schützen', hoehe: 82, aeste: ['Wildblumen säen', { l: 'weniger mähen' }, { l: 'Totholz und Laub liegen lassen' }, 'kein Gift', { l: 'Insektenhotel bauen' }, { l: 'keine Schottergärten' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Aufruf für die Schülerzeitung: „Rettet die Bienen!“ Erkläre, warum, und gib drei konkrete Tipps.', stufe: 2,
        anfaenge: ['Ohne Bienen …', 'Leider …', 'Du kannst helfen: …'], zeilen: 8,
        beispiel: 'Ohne Bienen gäbe es viel weniger Äpfel, Kirschen und Erdbeeren. Leider werden Bienen und andere Insekten immer seltener, weil Blumenwiesen fehlen und Gift gespritzt wird. Du kannst helfen: Säe Wildblumen in einen Blumenkasten, lass im Garten eine wilde Ecke stehen und bau mit uns ein Insektenhotel für den Schulhof!' },
    ],
    check: ['Ich erkläre, was Bestäubung ist.', 'Ich nenne Gründe für das Insektensterben.', 'Ich nenne Wege, Insekten zu helfen.'],
  },
  // ================================================================ 7
  {
    thema: 'Kleidung · Globalisierung · fairer Handel', titel: 'Die Reise eines T-Shirts', untertitel: 'Baumwolle aus Indien, genäht in Bangladesch, gekauft in Luxemburg: Du verfolgst ein T-Shirt um die Welt, hörst eine Näherin und denkst über faire Mode nach.',
    ziel: { de: 'Ich beschreibe den Weg eines T-Shirts und nenne Probleme und Lösungen bei der Herstellung von Kleidung.', fr: 'Je décris le parcours d’un t-shirt et je cite des problèmes et des solutions dans la fabrication des vêtements.' },
    bild: ['chloe:froh:stehen', 'sami:froh:stehen'],
    start: {
      was: 'Schau aufs Etikett',
      aufgaben: [
        { art: 'fragen', auftrag: 'Schau (wenn du magst) auf das Etikett deines Pullis oder T-Shirts. Wo wurde es hergestellt?', stufe: 1, fragen: [{ f: '', l: 'z. B. Bangladesch, China, Türkei, Indien, Vietnam, Portugal …' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Einmal um die Welt',
      absaetze: [
        '**1. Baumwolle:** Unser T-Shirt beginnt auf einem Baumwollfeld, zum Beispiel in **Indien**. Baumwolle braucht viel Sonne und sehr viel **Wasser**: für ein einziges T-Shirt bis zu 2700 Liter. Oft werden viele Pflanzenschutzmittel gespritzt.',
        '**2. Nähen:** Die Baumwolle wird zu Garn gesponnen, zu Stoff gewebt und gefärbt. Genäht wird das T-Shirt zum Beispiel in einer Fabrik in **Bangladesch**. Die Näherinnen arbeiten oft sehr lange für einen **niedrigen Lohn**. 2013 stürzte dort ein Fabrikgebäude ein; über 1000 Menschen starben. Seitdem wird mehr über Sicherheit in Fabriken gesprochen.',
        '**3. Verkauf:** Mit dem Schiff und dem Lkw kommt das T-Shirt nach **Luxemburg** und kostet im Laden vielleicht nur 5 Euro. Viele Menschen kaufen viel und tragen wenig: **Fast Fashion**.',
        '**4. Und danach?** Aussortierte Kleidung landet oft in Altkleidercontainern. Ein Teil wird weiterverkauft, zum Beispiel nach **Ghana** in Westafrika. Vieles ist aber so schlecht, dass es auf Müllbergen landet.',
        '### Was kann ich tun?',
        'Weniger, aber bessere Kleidung kaufen. **Second Hand** und Tauschbörsen nutzen. Kleidung reparieren. Auf **Siegel** für fairen Handel und Bio-Baumwolle achten.',
      ],
      woerter: [['die Baumwolle', 'le coton'], ['das Garn', 'le fil'], ['nähen', 'coudre'], ['die Näherin', 'la couturière'], ['der Lohn', 'le salaire'], ['die Altkleider', 'les vêtements usagés'], ['das Siegel', 'le label'], ['fairer Handel', 'le commerce équitable']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Die Karte zeigt die Reise des T-Shirts. Welches Land ist es, und was passiert dort? Schreibe zu den Nummern.', stufe: 1,
          html: weltKarte({ kontinente: 'grau', kontinentNamen: false, punktGroesse: 11, punktText: 30, punkte: [{ lon: 78, lat: 21, text: '1', farbe: '#2f8a6b', links: true }, { lon: 90.4, lat: 23.8, text: '2', farbe: '#b4432e' }, { lon: 6.1, lat: 49.6, text: '3', farbe: '#1f6aa0' }, { lon: -1.0, lat: 7.9, text: '4', farbe: '#7a4b9c' }], breite: 160 }),
          liste: [['1', 'Indien: Baumwolle wächst auf Feldern.'], ['2', 'Bangladesch: Das T-Shirt wird genäht.'], ['3', 'Luxemburg: Das T-Shirt wird verkauft und getragen.'], ['4', 'Ghana: Altkleider werden verkauft oder landen auf dem Müll.']], spalten: 1 },
      ],
    },
    hoeren: {
      was: 'Eine Sprachnachricht (übersetzt)', wo: 'Projekt „Wer näht unsere Kleidung?“', titel: 'Rupas Tag',
      situation: 'Eine Schulklasse hat Kontakt zu einer Hilfsorganisation. Eine junge Näherin aus Bangladesch erzählt von ihrem Alltag (übersetzt).',
      bild: ['chloe:besorgt:handy', 'sami:ruhig:stehen'], sprecher: { Übersetzerin: 'w1', Chloé: 'w3', Sami: 'm3' },
      text: [
        ['Übersetzerin', 'Hallo, ich heiße Rupa. Ich bin neunzehn und arbeite in einer Kleiderfabrik in Dhaka. Ich fange um acht Uhr an und höre oft erst um acht Uhr abends auf – sechs Tage in der Woche.'],
        ['Übersetzerin', 'Ich nähe Ärmel an T-Shirts. Hunderte jeden Tag. Wenn wir zu langsam sind, schimpft der Chef. Mein Lohn reicht für ein Zimmer und Essen, aber nicht für viel mehr.'],
        ['Übersetzerin', 'Seit unsere Fabrik bei einem Programm für faire Arbeit mitmacht, gibt es Notausgänge und eine Pause am Mittag. Das ist besser. Ich wünsche mir, dass die Leute in Europa wissen, wer ihre Kleidung macht.'],
        ['Chloé', 'Wow. Zwölf Stunden am Tag, sechs Tage in der Woche.'],
        ['Sami', 'Und das T-Shirt kostet hier fünf Euro. Wie kann das gehen?'],
        ['Chloé', 'Weil an allen Stellen gespart wird – vor allem am Lohn.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Notausgang“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Tür, durch die man bei Gefahr schnell hinauskommt', 'der Haupteingang'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wie lange arbeitet Rupa am Tag? Wie viele Tage pro Woche?', l: 'oft von 8 bis 20 Uhr (12 Stunden), sechs Tage' }, { f: 'Was näht sie?', l: 'Ärmel an T-Shirts, Hunderte am Tag' }, { f: 'Was hat sich durch das Programm für faire Arbeit verbessert?', l: 'Es gibt Notausgänge und eine Mittagspause.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Würdet ihr für ein faires T-Shirt mehr bezahlen? Wie viel? Diskutiert.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich würde … mehr bezahlen, weil …', 'Das Problem ist …', 'Statt neu zu kaufen, könnte man …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Die Reise eines T-Shirts', nummern: true, punkte: ['**Baumwolle** (z. B. Indien): viel Wasser', '**Nähen** (z. B. Bangladesch): lange Arbeit, wenig Lohn', '**Verkauf** (z. B. Luxemburg): billig, Fast Fashion', '**Altkleider** (z. B. Ghana): Weiterverkauf oder Müll'] },
         { titel: 'Faire Mode', punkte: ['**weniger**, aber besser kaufen', '**Second Hand**, tauschen, reparieren', 'auf **Siegel** für fairen Handel achten'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 2, aussagen: ['Modefirmen müssen dafür sorgen, dass ihre Näherinnen faire Löhne bekommen.', 'Second-Hand-Kleidung ist cool.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Antwort an Rupa. Was hast du von ihr gelernt? Was willst du ändern?', stufe: 2,
        anfaenge: ['Liebe Rupa,', 'danke, dass …', 'Ich wusste nicht, dass …', 'Ab jetzt will ich …'], zeilen: 7,
        beispiel: 'Liebe Rupa, danke, dass du uns von deinem Alltag erzählt hast. Ich wusste nicht, dass du zwölf Stunden am Tag arbeitest und so wenig verdienst. Ab jetzt will ich weniger Kleidung kaufen, öfter Second Hand kaufen und auf faire Siegel achten. Ich wünsche dir, dass deine Arbeit noch besser wird.' },
    ],
    check: ['Ich beschreibe den Weg eines T-Shirts.', 'Ich nenne Probleme in der Kleiderindustrie.', 'Ich nenne Wege zu fairer Mode.'],
  },
  // ================================================================ 8
  {
    thema: 'Lebensmittel · Verschwendung · Haltbarkeit', titel: 'Rette die Banane!', untertitel: 'Wie viel Essen im Müll landet, was das Haltbarkeitsdatum wirklich bedeutet und wie man Reste lecker verwertet – mit einem Rechen-Check.',
    ziel: { de: 'Ich erkläre, warum Lebensmittel verschwendet werden, und nenne Wege, das zu vermeiden.', fr: 'J’explique pourquoi la nourriture est gaspillée et je cite des moyens de l’éviter.' },
    bild: ['finn:froh:tasse', 'mia:froh:stehen'],
    start: {
      was: 'Braune Banane',
      aufgaben: [
        { art: 'mc', auftrag: 'Eine Banane hat braune Punkte. Was machst du? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['wegwerfen', 'essen – sie ist jetzt besonders süß', 'einen Bananen-Shake oder Kuchen machen'], r: [1, 2] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Diagramm', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen gerundet für die EU', titel: 'Zu gut für die Tonne',
      absaetze: [
        'In der EU werden pro Person und Jahr etwa **130 Kilogramm** Lebensmittel weggeworfen – zusammengerechnet von Feldern, Fabriken, Läden, Restaurants und Haushalten. Mehr als die Hälfte davon fällt in den **Haushalten** an, also bei uns zu Hause.',
        '### Warum ist das ein Problem?',
        'Für jedes Lebensmittel braucht man **Wasser**, **Boden**, **Energie** und Arbeit. Wer Essen wegwirft, wirft das alles mit weg. Verrottende Lebensmittel auf dem Müll erzeugen außerdem klimaschädliche Gase.',
        '### Zwei Daten auf der Packung',
        'Das **Mindesthaltbarkeitsdatum** („mindestens haltbar bis …“) sagt: Bis dahin ist das Produkt sicher gut. Danach ist es oft noch lange essbar. **Anschauen, riechen, probieren!** Das **Verbrauchsdatum** („zu verbrauchen bis …“) steht auf leicht verderblichen Dingen wie frischem Hackfleisch oder Fisch. Nach diesem Datum soll man sie **nicht mehr essen**.',
        '### Tipps',
        'Mit Einkaufszettel einkaufen, nicht hungrig einkaufen, Reste einfrieren oder am nächsten Tag essen, „krummes“ Gemüse kaufen und alte Lebensmittel im Kühlschrank nach vorne stellen.',
      ],
      bildHtml: balken('Wo werden Lebensmittel weggeworfen? (EU, gerundet)', [['Haushalte', 54], ['Verarbeitung (Fabriken)', 19], ['Restaurants, Kantinen', 11], ['Landwirtschaft', 9], ['Handel (Läden)', 7]], { einheit: '%', max: 60 }),
      woerter: [['die Lebensmittel', 'les aliments'], ['verschwenden', 'gaspiller'], ['wegwerfen', 'jeter'], ['das Mindesthaltbarkeitsdatum', 'la date de durabilité minimale'], ['das Verbrauchsdatum', 'la date limite de consommation'], ['verderblich', 'périssable'], ['einfrieren', 'congeler'], ['die Reste', 'les restes']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Lies Text und Diagramm. Antworte.', stufe: 1, fragen: [{ f: 'Wo werden die meisten Lebensmittel weggeworfen?', l: 'in den Haushalten (etwa 54 %)' }, { f: 'Wie viel Kilogramm Lebensmittel wirft man in der EU pro Person und Jahr weg?', l: 'etwa 130 kg' }] },
        { art: 'tabelle', auftrag: 'Darf man es noch essen? Kreuze an.', stufe: 2, kopf: ['', 'meist ja (prüfen)', 'nein'], breiten: [60, 22, 18], zeilen: [['Joghurt, Mindesthaltbarkeitsdatum seit 3 Tagen vorbei, riecht normal', '[x]', ''], ['frisches Hackfleisch, Verbrauchsdatum gestern', '', '[x]'], ['Nudeln, Mindesthaltbarkeitsdatum seit 2 Monaten vorbei', '[x]', ''], ['Brot mit Schimmel', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Eine Koch-Show', wo: 'Schulküche · Reste-Challenge', titel: 'Kochen mit Resten',
      situation: 'Finn und Mia machen bei der „Reste-Challenge“ der Schule mit. Sie müssen aus Resten ein Gericht kochen.',
      bild: ['finn:froh:tasse', 'mia:aufgeregt:stehen'], sprecher: { Moderator: 'm1', Finn: 'm3', Mia: 'w3' },
      text: [
        ['Moderator', 'Willkommen zur Reste-Challenge! Finn und Mia, was habt ihr im Korb?'],
        ['Mia', 'Altes Brot von gestern, zwei Eier, eine halbe Zucchini, ein Stück Käse und Tomaten, die schon ein bisschen weich sind.'],
        ['Finn', 'Und drei braune Bananen!'],
        ['Moderator', 'Was kocht ihr daraus?'],
        ['Mia', 'Aus dem Brot, den Eiern, der Zucchini und dem Käse machen wir einen Brotauflauf. Die weichen Tomaten werden eine Soße.'],
        ['Finn', 'Und die Bananen zerdrücken wir mit Milch zu einem Shake. Braune Bananen sind am süßesten – da braucht man keinen Zucker.'],
        ['Moderator', 'Super! Wie viel habt ihr gerettet?'],
        ['Mia', 'Wir haben alles gewogen: fast zwei Kilo Lebensmittel, die sonst im Müll gelandet wären.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Auflauf“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Gericht, das im Ofen gebacken wird', 'ein Getränk'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was machen Finn und Mia aus den Resten?', stufe: 1, kopf: ['Reste', 'Gericht'], breiten: [50, 50], zeilen: [['Brot, Eier, Zucchini, Käse', '[Brotauflauf]'], ['weiche Tomaten', '[Soße]'], ['braune Bananen', '[Bananen-Shake mit Milch]']] },
        { art: 'fragen', auftrag: 'Wie viel haben sie gerettet?', stufe: 1, fragen: [{ f: '', l: 'fast zwei Kilo Lebensmittel' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Reste-Rezepte kennt ihr? Sammelt eure besten Ideen.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Arme Ritter aus altem Brot', 'Gemüsesuppe', 'Bananenbrot', 'Bratreis'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Zwei Daten', punkte: ['**Mindesthaltbarkeitsdatum**: danach oft noch gut – **anschauen, riechen, probieren**', '**Verbrauchsdatum**: danach **nicht** mehr essen (Fleisch, Fisch)'] },
         { titel: 'Essen retten', punkte: ['**Einkaufszettel**, nicht hungrig einkaufen', 'Reste **einfrieren** oder verwerten', 'Altes **nach vorne** im Kühlschrank', '**krummes** Gemüse kaufen'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Rechne (gerundete Werte).', stufe: 2, spalten: 2, items: [
        { a: 'Eine Person wirft im Jahr etwa 130 kg Lebensmittel weg. Wie viel ist das ungefähr pro Woche? (1 Jahr = 52 Wochen)', l: '130 : 52 ≈ 2,5 kg', raum: 2 },
        { a: 'Eine Familie mit 4 Personen: Wie viel werfen sie zusammen in einem Jahr weg?', l: '4 · 130 = 520 kg', raum: 2 },
        { a: 'Die Klasse rettet bei der Challenge 2 kg pro Woche. Wie viel sind das in 30 Schulwochen?', l: '30 · 2 = 60 kg', raum: 2 },
        { a: 'Ein Brot kostet 3 €. Eine Familie wirft jede Woche ein halbes Brot weg. Wie viel Geld ist das in 52 Wochen?', l: '52 · 1,50 € = 78 €', raum: 2 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe ein Rezept für ein Reste-Gericht: Zutaten und Zubereitung in Schritten.', stufe: 2,
        anfaenge: ['Name des Gerichts: …', 'Zutaten: …', '1. …', '2. …', '3. …'], zeilen: 8,
        beispiel: 'Name des Gerichts: Arme Ritter. Zutaten: 4 Scheiben altes Brot, 2 Eier, 200 ml Milch, etwas Zimt, Butter. 1. Eier, Milch und Zimt verquirlen. 2. Die Brotscheiben kurz darin einweichen. 3. In der Pfanne mit etwas Butter von beiden Seiten goldbraun braten. 4. Mit Obst servieren.' },
    ],
    check: ['Ich erkläre, warum Verschwendung ein Problem ist.', 'Ich unterscheide Mindesthaltbarkeits- und Verbrauchsdatum.', 'Ich nenne Wege, Lebensmittel zu retten.'],
  },
]
