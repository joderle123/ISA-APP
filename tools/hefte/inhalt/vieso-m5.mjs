// Vie et société · Modul 5 (6P) „Dazugehören“ – nach dem MENJE-Rahmenlehrplan „Leben und Gesellschaft“, 8. Klasse:
// Lernfeld „Ich und die Anderen“ (Anerkennung und Ausgrenzung: Stereotypen und Vorurteile, Beeinträchtigung/Behinderung),
// „Lebensformen, Welt und Gesellschaft“ (Demokratie als Teilhabe und Mitgestaltung: Integration und Partizipation in
// Schule und Gesellschaft) und „Große Fragen“ (Begegnungen mit verschiedenen Religionen: Christentum).
// Viele Karten (Schubladen-, Rollen-, Barrieren-, Wertschätzungs-, Kompromiss- und Begriffskarten).
// Mobbing ohne Schuldzuweisung an Betroffene; Hilfe 116 111, BEE SECURE 8002 1234; Religion sachlich; Personen ausgedacht.
import { sachModul } from './sachfach-gemeinsam.mjs'

export const MODUL = sachModul('vieso', 5, {
  titel: 'Dazugehören',
  titelFr: 'Faire partie du groupe',
  unter: 'Schubladen im Kopf, Mobbing stoppen, Barrieren abbauen, Anerkennung schenken, Integration, gute Kompromisse – und das Christentum in der Welt und in Luxemburg. Mit vielen Karten.',
  unterFr: 'Préjugés, harcèlement, inclusion, reconnaissance, intégration, compromis – et le christianisme.',
  farbe: '#4b6cb7',
  deckbild: ['lio:froh:stehen', 'nele:froh:rollstuhl', 'amira:froh:stehen-zeigen'],
  blasen: [{ t: 'Raus aus der Schublade!', x: 8, y: 110 }, { t: 'Du gehörst dazu.', x: 130, y: 96 }, { t: 'Kompromiss?', x: 166, y: 150 }],
  themen: [
    { titel: { de: 'Dazugehören', fr: 'Faire partie' }, icon: 'users-group', lektionen: 4 },
    { titel: { de: 'Mitgestalten', fr: 'Participer' }, icon: 'hand-click', lektionen: 2 },
    { titel: { de: 'Christentum', fr: 'Christianisme' }, icon: 'building-church', lektionen: 2 },
  ],
})

const FRAGE = '#4b6cb7', DILEMMA = '#6d4bc4', MUT = '#d0577b', IDEE = '#2f8a6b', GLAUBE = '#b5651d'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Vorurteile · Stereotype · Schubladen', titel: 'Schubladen im Kopf', untertitel: 'Warum ordnet unser Gehirn Menschen in Schubladen? Du lernst, wie Vorurteile entstehen, hörst ein Experiment und übst, Menschen neu zu sehen.',
    ziel: { de: 'Ich erkläre, wie Vorurteile entstehen, und erkenne sie im Alltag.', fr: 'J’explique comment naissent les préjugés et je les reconnais au quotidien.' },
    bild: ['finn:verwirrt:stehen', 'amira:froh:stehen'],
    start: {
      was: 'Erster Eindruck',
      aufgaben: [
        { art: 'fragen', auftrag: 'Stell dir vor: Ein Jugendlicher mit Kapuze und Kopfhörern steigt in den Bus. Was denken manche Leute vielleicht sofort? Und was weiß man wirklich über ihn?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Manche denken vielleicht: „Der ist unfreundlich / gefährlich.“ Wirklich weiß man nur: Er trägt eine Kapuze und hört Musik.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Warum wir Schubladen brauchen – und warum sie gefährlich sind',
      absaetze: [
        'Unser Gehirn bekommt jede Sekunde sehr viele Informationen. Um schnell zu verstehen, sortiert es: Hund, Katze, Lehrerin, Fußballer. Das ist nützlich. So muss man nicht jede Situation neu durchdenken.',
        '### Stereotype',
        'Wenn wir **Gruppen von Menschen** in Schubladen stecken, entstehen **Stereotype**: vereinfachte Bilder wie „Alle Luxemburger sind reich“ oder „Alle Jugendlichen hängen am Handy“. Stereotype stimmen vielleicht für einige, aber nie für alle.',
        '### Vorurteile',
        'Ein **Vorurteil** ist ein Urteil, bevor man jemanden kennt – oft mit einem negativen Gefühl verbunden. Vorurteile lernen wir von anderen: aus Witzen, Filmen, Kommentaren, manchmal schon als Kinder. Wenn Menschen wegen eines Vorurteils schlechter behandelt werden, nennt man das **Diskriminierung**.',
        '### Was hilft?',
        'Sich die eigenen Schubladen bewusst machen. **Nachfragen** statt urteilen. Menschen **kennenlernen** – wer jemanden persönlich kennt, sieht ihn als Menschen und nicht als „einen von denen“. Und: nicht mitlachen, wenn Witze andere herabsetzen.',
      ],
      woerter: [['die Schublade', 'le tiroir (ici : la case)'], ['sortieren', 'trier'], ['das Stereotyp', 'le stéréotype'], ['das Vorurteil', 'le préjugé'], ['urteilen', 'juger'], ['die Diskriminierung', 'la discrimination'], ['herabsetzen', 'rabaisser'], ['bewusst machen', 'prendre conscience']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was ist was? Verbinde.', stufe: 1, links: ['Stereotyp', 'Vorurteil', 'Diskriminierung'], rechts: ['ein vereinfachtes Bild von einer Gruppe', 'ein Urteil, bevor man jemanden kennt', 'jemand wird wegen eines Vorurteils schlechter behandelt'] },
        { art: 'tabelle', auftrag: 'Stimmt das für alle? Kreuze an.', stufe: 2, kopf: ['Satz', 'stimmt für alle', 'stimmt nicht für alle'], breiten: [60, 20, 20], zeilen: [['„Alle Menschen brauchen Wasser.“', '[x]', ''], ['„Alle Mädchen mögen Pferde.“', '', '[x]'], ['„Alle Menschen haben Gefühle.“', '[x]', ''], ['„Alle Älteren können kein Handy bedienen.“', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klasse 6P2 · nach einem Experiment', titel: 'Das Schubladen-Experiment',
      situation: 'Die Lehrerin hat der Klasse Fotos von Menschen gezeigt. Die Klasse sollte raten, welchen Beruf sie haben. Danach kam die Auflösung.',
      bild: ['lehrerin:froh:zeigen', 'finn:ueberrascht:stehen'], sprecher: { Lehrerin: 'w1', Finn: 'm3', Amira: 'w2' },
      text: [
        ['Lehrerin', 'Ihr habt gesagt: Die Frau mit den Tattoos ist bestimmt Sängerin. Sie ist aber Kinderärztin.'],
        ['Finn', 'Echt? Ich dachte, Ärztinnen sehen anders aus.'],
        ['Lehrerin', 'Und der Mann im Anzug, von dem ihr dachtet, er ist Bankdirektor, ist Pfleger im Altersheim. Er kam gerade von einer Hochzeit.'],
        ['Amira', 'Und der junge Mann mit dem Skateboard?'],
        ['Lehrerin', 'Er studiert Medizin und arbeitet nebenbei bei der Feuerwehr.'],
        ['Finn', 'Wow. Wir lagen fast immer falsch.'],
        ['Lehrerin', 'Genau darum geht es. Unser Gehirn rät blitzschnell aufgrund von Kleidung, Frisur oder Hautfarbe. Das ist normal. Wichtig ist, dass wir unsere schnellen Urteile prüfen.'],
        ['Amira', 'Also: erst kennenlernen, dann urteilen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „erster Eindruck“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['das, was man denkt, wenn man jemanden zum ersten Mal sieht', 'ein Stempel'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was hat die Klasse vermutet – und was stimmt?', stufe: 1, kopf: ['Person', 'Vermutung der Klasse', 'in Wirklichkeit'], breiten: [30, 35, 35], zeilen: [['Frau mit Tattoos', '[Sängerin]', '[Kinderärztin]'], ['Mann im Anzug', '[Bankdirektor]', '[Pfleger im Altersheim]'], ['junger Mann mit Skateboard', '[nicht genannt]', '[Medizinstudent und Feuerwehrmann]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wann wurdet ihr schon einmal falsch eingeschätzt (oder jemand, den ihr kennt)? Erzählt nur, was ihr möchtet.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Manche denken bei mir …', 'In Wirklichkeit …', 'Ich wünsche mir, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Begriffe', punkte: ['**Stereotyp**: vereinfachtes Bild einer Gruppe', '**Vorurteil**: Urteil, bevor man jemanden kennt', '**Diskriminierung**: schlechter behandeln wegen eines Vorurteils'] },
         { titel: 'Was hilft', punkte: ['eigene **Schubladen** bemerken', '**nachfragen** statt urteilen', 'Menschen **kennenlernen**', 'bei herabsetzenden Witzen **nicht mitlachen**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Schubladen-Karten: Lest jede Karte. Welche Schublade steckt dahinter? Schreibt einen Satz, der den Menschen wieder aus der Schublade holt (ein Gegenbeispiel oder eine Frage).', stufe: 2, neueSeite: true, titel: 'Raus aus der Schublade', icon: 'box', farbe: FRAGE, spalten: 2,
        karten: [
          { text: '„Der ist bestimmt dumm, der redet so komisch.“', linien: 2 },
          { text: '„Die mit dem Kopftuch darf sicher nichts selbst entscheiden.“', linien: 2 },
          { text: '„Wer im Rollstuhl sitzt, kann keinen Sport machen.“', linien: 2 },
          { text: '„Der kommt aus dem Ausland, der versteht uns nicht.“', linien: 2 },
          { text: '„Die ist still, die hat nichts zu sagen.“', linien: 2 },
          { text: '„Der ist älter als 70, der versteht nichts vom Internet.“', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Text: Ein Vorurteil, das du oft hörst, und warum es nicht stimmt.', stufe: 2,
        anfaenge: ['Oft hört man: „…“', 'Das stimmt nicht, weil …', 'Ein Beispiel: …', 'Darum …'], zeilen: 7,
        beispiel: 'Oft hört man: „Jugendliche haben keinen Respekt.“ Das stimmt nicht, weil viele Jugendliche helfen, wo sie können. Ein Beispiel: In unserer Klasse hilft Lio jeden Mittwoch im Seniorenheim. Darum sollte man Menschen nach dem beurteilen, was sie tun – und nicht nach ihrem Alter.' },
    ],
    check: ['Ich erkläre Stereotyp, Vorurteil und Diskriminierung.', 'Ich erkenne Vorurteile im Alltag.', 'Ich weiß, was gegen Vorurteile hilft.'],
  },
  // ================================================================ 2
  {
    thema: 'Ausgrenzung · Mobbing · Rollen', titel: 'Mobbing stoppen', untertitel: 'Wer mobbt, wer schaut zu, wer hilft? Du lernst, was Mobbing ist, hörst eine Geschichte aus Sicht einer Zuschauerin und überlegst, was jede Rolle tun kann.',
    ziel: { de: 'Ich erkenne Mobbing und nenne, was ich als Zuschauer oder Zuschauerin tun kann.', fr: 'Je reconnais le harcèlement et je sais ce que je peux faire en tant que témoin.' },
    bild: ['jana:besorgt:stehen', 'noah:froh:stehen'],
    start: {
      was: 'Streit oder Mobbing?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Streit oder Mobbing? Kreuze an.', stufe: 1, kopf: ['Situation', 'Streit', 'Mobbing'], breiten: [60, 20, 20], zeilen: [['Zwei Freunde streiten sich einmal über ein Spiel.', '[x]', ''], ['Eine Gruppe lacht seit Wochen jeden Tag über eine Schülerin.', '', '[x]'], ['Jemand wird immer wieder aus dem Klassenchat geworfen.', '', '[x]'], ['Zwei Mädchen sind sauer aufeinander und vertragen sich am nächsten Tag.', '[x]', '']] },
      ],
    },
    lesen: {
      was: 'Ein Infotext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Infotext (vereinfacht)', titel: 'Was ist Mobbing?',
      absaetze: [
        'Von **Mobbing** spricht man, wenn ein Mensch **immer wieder** und **über längere Zeit** von einer oder mehreren Personen geärgert, ausgeschlossen, beleidigt, bedroht oder angegriffen wird – und sich **allein nicht wehren** kann. Passiert das im Internet, heißt es **Cybermobbing**.',
        '### Viele Rollen',
        'Mobbing ist kein Problem zwischen zwei Personen. Fast immer sind viele beteiligt: Es gibt die, die **mobben**, und die **Betroffenen**. Es gibt **Mitläufer**, die mitlachen oder mitmachen, **Zuschauer**, die nichts tun, und **Verteidiger**, die helfen. Mobbing funktioniert nur, wenn die anderen mitmachen oder wegschauen.',
        '### Die Macht der Zuschauer',
        'Studien zeigen: Wenn mehrere aus der Gruppe sich gegen Mobbing stellen, hört es oft auf. Man muss kein Held sein: Schon nicht mitlachen, mit der betroffenen Person reden oder einen Erwachsenen informieren hilft.',
        '### Wichtig',
        'Wer gemobbt wird, ist **nicht schuld**. Hilfe gibt es bei Lehrkräften, beim SePAS der Schule, beim Kinder- und Jugendtelefon **116 111** und bei Cybermobbing bei der **BEE SECURE Helpline 8002 1234**.',
      ],
      woerter: [['das Mobbing', 'le harcèlement'], ['ausschließen', 'exclure'], ['betroffen', 'concerné, victime'], ['der Mitläufer', 'le suiveur'], ['der Zuschauer', 'le spectateur, le témoin'], ['verteidigen', 'défendre'], ['wegschauen', 'détourner le regard'], ['schuld sein', 'être fautif']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welche Rolle ist das? Verbinde.', stufe: 1, links: ['lacht mit, wenn jemand geärgert wird', 'sieht es, sagt aber nichts', 'sagt: „Hört auf!“ und holt Hilfe', 'wird immer wieder geärgert'], rechts: ['Mitläufer', 'Zuschauer', 'Verteidiger', 'Betroffene'] },
      ],
    },
    hoeren: {
      was: 'Eine Geschichte', wo: 'Erzählung aus Sicht von Jana', titel: 'Ich habe zugeschaut',
      situation: 'Jana erzählt, wie sie zuerst bei Mobbing zugeschaut hat – und was sich dann änderte.',
      bild: ['jana:traurig:stehen', 'noah:froh:stehen'], sprecher: { Jana: 'w2', Noah: 'm3' },
      text: [
        ['Jana', 'In unserer Klasse gab es ein Mädchen, Elisa. Sie war neu und ein bisschen anders. Eine Gruppe hat jeden Tag über ihre Kleidung gelacht und sie im Chat „Oma“ genannt.'],
        ['Jana', 'Ich fand das nicht gut. Aber ich habe nichts gesagt. Ich hatte Angst, dass sie dann über mich lachen.'],
        ['Jana', 'Eines Tages saß Elisa weinend auf der Treppe. Da ist Noah zu ihr gegangen und hat sich neben sie gesetzt.'],
        ['Noah', 'Ich habe zu Jana gesagt: Komm, wir machen das zusammen. Allein traue ich mich auch nicht.'],
        ['Jana', 'Wir haben Elisa gefragt, ob sie mit uns Mittag essen will. Und wir haben es unserer Klassenlehrerin erzählt.'],
        ['Jana', 'Es gab ein Gespräch mit der ganzen Klasse. Nicht alles war sofort gut. Aber das „Oma“ hörte auf. Heute sitzt Elisa neben mir. Und ich wünschte, ich hätte früher etwas gesagt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Warum schauen viele bei Mobbing nur zu? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Angst, selbst gemobbt zu werden', 'Sie wissen nicht, was sie tun sollen.', 'Sie denken, es geht sie nichts an.', 'Sie finden Mobbing gut.'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne, was passiert ist.', stufe: 1, teile: ['Eine Gruppe lacht jeden Tag über Elisa.', 'Jana schaut zu, sagt aber nichts.', 'Noah setzt sich zu Elisa auf die Treppe.', 'Jana und Noah laden Elisa zum Essen ein und informieren die Lehrerin.', 'Es gibt ein Gespräch mit der Klasse.'], ordnung: [2, 4, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Welche Rolle hatte Jana am Anfang, welche am Ende?', stufe: 2, fragen: [{ f: '', l: 'am Anfang Zuschauerin, am Ende Verteidigerin' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was macht es leichter, sich für jemanden einzusetzen? Sammelt.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['zu zweit oder zu dritt', 'einen Erwachsenen einschalten', 'mit der betroffenen Person reden', 'nicht mitlachen'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Mobbing', punkte: ['**immer wieder**, **über längere Zeit**', 'Betroffene können sich **allein nicht wehren**', 'Rollen: Mobbende, Betroffene, **Mitläufer**, **Zuschauer**, **Verteidiger**', 'Betroffene sind **nicht schuld**'] },
         { titel: 'Was ich tun kann', nummern: true, punkte: ['**nicht mitlachen**, nicht weiterleiten', 'mit der betroffenen Person **reden**', '**Verbündete** suchen', '**Erwachsene** informieren – das ist kein Petzen'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Situations-Karten: Zieht eine Karte. Was kann ein Zuschauer oder eine Zuschauerin tun? Sammelt mindestens zwei Ideen.', stufe: 3, neueSeite: true, titel: 'Was kannst du tun?', icon: 'arrows-split-2', farbe: DILEMMA, spalten: 2, typ: 'dilemma',
        karten: [
          { text: 'Im Klassenchat wird ein peinliches Foto von einem Mitschüler geteilt. Alle schicken Lach-Emojis.' },
          { text: 'In der Pause wird ein Junge nie mitspielen gelassen. Er steht immer allein am Rand.' },
          { text: 'Jemand imitiert jeden Tag den Akzent einer Mitschülerin. Viele lachen.' },
          { text: 'Ein Mädchen bekommt anonyme, gemeine Nachrichten. Sie zeigt sie dir und sagt: „Sag es niemandem.“' },
          { text: 'Dein bester Freund macht beim Mobbing mit.' },
          { text: 'Jemand wird beim Sport immer als Letzter gewählt und ausgelacht.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief an Elisa aus der Geschichte – aus Sicht eines Mitschülers oder einer Mitschülerin, der oder die lange zugeschaut hat.', stufe: 3,
        anfaenge: ['Liebe Elisa,', 'ich habe gesehen, dass …', 'Es tut mir leid, dass …', 'Ab jetzt …'], zeilen: 7,
        beispiel: 'Liebe Elisa, ich habe gesehen, dass die anderen dich wochenlang ausgelacht haben. Es tut mir leid, dass ich nichts gesagt habe. Ich hatte Angst, aber das ist keine gute Ausrede. Ab jetzt sage ich etwas, wenn so etwas passiert. Und wenn du magst, kannst du in der Pause zu uns kommen.' },
    ],
    check: ['Ich unterscheide Streit und Mobbing.', 'Ich nenne die Rollen beim Mobbing.', 'Ich nenne, was Zuschauende tun können.'],
  },
  // ================================================================ 3
  {
    thema: 'Behinderung · Barrieren · Inklusion', titel: 'Barrieren abbauen', untertitel: 'Nicht der Mensch ist behindert – oft wird er behindert: Du lernst, was Inklusion heißt, hörst Nele und Lio und spürst Barrieren in deiner Schule auf.',
    ziel: { de: 'Ich erkläre, was Inklusion bedeutet, und erkenne Barrieren in meiner Umgebung.', fr: 'J’explique ce que signifie l’inclusion et je repère les obstacles autour de moi.' },
    bild: ['nele:froh:rollstuhl', 'lio:froh:stehen'],
    start: {
      was: 'Barrieren',
      aufgaben: [
        { art: 'mc', auftrag: 'Was kann für einen Menschen im Rollstuhl eine Barriere sein? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Treppen ohne Aufzug', 'hohe Bordsteine', 'schmale Türen', 'zu hohe Regale', 'ein freundlicher Mensch'], r: [0, 1, 2, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Alle gehören dazu',
      absaetze: [
        'Manche Menschen können nicht oder nur schlecht sehen, hören oder gehen. Andere lernen anders. Man spricht von einer **Beeinträchtigung** oder **Behinderung**. Viele Menschen mit Behinderung sagen: „Ich bin nicht behindert – ich **werde behindert**.“ Gemeint ist: Oft sind es **Barrieren** in der Umgebung, die sie ausschließen: Treppen, fehlende Untertitel, komplizierte Texte, Vorurteile.',
        '### Inklusion',
        '**Inklusion** heißt: Alle Menschen gehören von Anfang an dazu und können überall mitmachen – in der Schule, im Sport, bei der Arbeit, in der Freizeit. Dafür muss man Barrieren abbauen. Die Vereinten Nationen haben 2006 die **Behindertenrechtskonvention** beschlossen. Für Luxemburg gilt sie seit 2011.',
        '### Beispiele',
        'Rampen und Aufzüge, Texte in **Leichter Sprache**, Ampeln mit Tonsignal, Untertitel und **Gebärdensprache**. In Luxemburg ist die Deutsche Gebärdensprache seit 2018 offiziell anerkannt.',
        '### Wie verhalte ich mich?',
        'Ganz normal und freundlich. **Fragen**, ob jemand Hilfe möchte, statt einfach zu helfen. Mit der Person selbst sprechen, nicht mit der Begleitung. Und: Behinderung ist nur **ein Teil** eines Menschen.',
      ],
      woerter: [['die Behinderung', 'le handicap'], ['die Beeinträchtigung', 'la déficience'], ['die Barriere', 'l’obstacle, la barrière'], ['die Inklusion', 'l’inclusion'], ['die Rampe', 'la rampe'], ['die Leichte Sprache', 'le langage facile à lire'], ['die Gebärdensprache', 'la langue des signes'], ['die Begleitung', 'l’accompagnateur']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Was meinen viele mit „Ich werde behindert“?', zeilen: 2, l: 'Oft sind es Barrieren in der Umgebung (Treppen, fehlende Untertitel, Vorurteile), die sie ausschließen.' }, { f: 'Was bedeutet Inklusion?', zeilen: 2, l: 'Alle Menschen gehören von Anfang an dazu und können überall mitmachen.' }, { f: 'Nenne drei Beispiele, wie man Barrieren abbaut.', l: 'Rampen, Aufzüge, Leichte Sprache, Tonsignale, Untertitel, Gebärdensprache' }] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Schulradio', titel: 'Was mich wirklich behindert',
      situation: 'Lio interviewt Nele, die im Rollstuhl sitzt, für das Schulradio.',
      bild: ['nele:froh:rollstuhl', 'lio:froh:handy'], sprecher: { Lio: 'm3', Nele: 'w3' },
      text: [
        ['Lio', 'Nele, was nervt dich im Alltag am meisten?'],
        ['Nele', 'Nicht der Rollstuhl. Der gehört zu mir wie deine Schuhe zu dir. Mich nervt der Aufzug im alten Gebäude. Der ist ständig kaputt. Dann komme ich nicht in den Musiksaal.'],
        ['Lio', 'Und was noch?'],
        ['Nele', 'Wenn Leute über meinen Kopf hinweg mit meiner Mutter reden: „Möchte sie einen Saft?“ Ich bin dreizehn, ich kann selbst sagen, ob ich Saft will!'],
        ['Lio', 'Haha, okay. Hilft man dir gern, ohne zu fragen?'],
        ['Nele', 'Ja, oft. Manche schieben einfach meinen Rollstuhl. Das ist, als würde dich jemand einfach am Arm wegziehen. Bitte erst fragen!'],
        ['Lio', 'Was wünschst du dir von der Schule?'],
        ['Nele', 'Einen Aufzug, der funktioniert. Und dass beim Sportfest auch Spiele dabei sind, bei denen alle mitmachen können. Rollstuhlbasketball zum Beispiel – da habt ihr alle keine Chance gegen mich!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was sollte man tun, bevor man jemandem hilft? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['fragen, ob die Person Hilfe möchte', 'einfach anfangen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was behindert Nele wirklich? Was wünscht sie sich?', stufe: 1, kopf: ['Was behindert Nele?', 'Was wünscht sie sich?'], breiten: [50, 50], zeilen: [['[kaputter Aufzug: kommt nicht in den Musiksaal]', '[einen Aufzug, der funktioniert]'], ['[Leute reden über ihren Kopf hinweg]', '[dass man mit ihr selbst spricht]'], ['[Leute schieben den Rollstuhl ohne zu fragen]', '[erst fragen; Spiele beim Sportfest für alle]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Spiele für ein Sportfest kennt ihr, bei denen alle mitmachen können?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Rollstuhlbasketball', 'Boccia', 'Sitzvolleyball', 'Staffellauf mit Aufgaben'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Inklusion', punkte: ['**alle** gehören von Anfang an dazu', '**Barrieren** abbauen', 'UN-Behindertenrechtskonvention (**2006**), gilt in Luxemburg seit **2011**', 'Deutsche Gebärdensprache in Luxemburg anerkannt (**2018**)'] },
         { titel: 'Respektvoll helfen', punkte: ['erst **fragen**', 'mit der **Person selbst** sprechen', 'Behinderung ist nur **ein Teil** eines Menschen'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Barrieren-Detektive: Nehmt die Karten mit und sucht in eurer Schule. Wo gibt es Barrieren? Wie könnte man sie abbauen? Notiert es auf der Karte.', stufe: 2, neueSeite: true, titel: 'Barrieren-Check', icon: 'search', farbe: IDEE, spalten: 2,
        karten: [
          { text: '**Für Menschen im Rollstuhl:**\nWo kommt man nicht hin?', linien: 3 },
          { text: '**Für Menschen, die schlecht sehen:**\nWas ist schwer zu finden oder zu lesen?', linien: 3 },
          { text: '**Für Menschen, die schlecht hören:**\nWo gibt es nur Durchsagen?', linien: 3 },
          { text: '**Für Menschen, die anders lernen:**\nWelche Texte sind zu schwer?', linien: 3 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief an die Schulleitung: Welche Barriere habt ihr gefunden? Was schlagt ihr vor?', stufe: 2,
        anfaenge: ['Sehr geehrte Schulleitung,', 'bei unserem Barrieren-Check haben wir bemerkt, dass …', 'Wir schlagen vor, …', 'Das wäre gut für alle, weil …', 'Mit freundlichen Grüßen'], zeilen: 8,
        beispiel: 'Sehr geehrte Schulleitung, bei unserem Barrieren-Check haben wir bemerkt, dass der Aufzug im alten Gebäude oft kaputt ist. Dann kommen Schülerinnen und Schüler im Rollstuhl nicht in den Musiksaal. Wir schlagen vor, den Aufzug reparieren zu lassen und bis dahin den Musikunterricht ins Erdgeschoss zu verlegen. Das wäre gut für alle, weil dann niemand ausgeschlossen wird. Mit freundlichen Grüßen, die Klasse 6P2' },
    ],
    check: ['Ich erkläre, was Inklusion bedeutet.', 'Ich erkenne Barrieren.', 'Ich weiß, wie ich respektvoll helfe.'],
  },
  // ================================================================ 4
  {
    thema: 'Anerkennung · Wertschätzung', titel: 'Gesehen werden', untertitel: 'Jeder Mensch möchte gesehen und geschätzt werden. Du denkst über Anerkennung nach – echte Anerkennung und Likes –, hörst eine Lehrerin und verschenkst Wertschätzungs-Karten.',
    ziel: { de: 'Ich erkläre, warum Anerkennung wichtig ist, und zeige anderen Wertschätzung.', fr: 'J’explique pourquoi la reconnaissance est importante et je montre de l’estime aux autres.' },
    bild: ['sami:froh:stehen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Ein gutes Gefühl',
      aufgaben: [
        { art: 'fragen', auftrag: 'Wann hast du dich zuletzt richtig gesehen oder geschätzt gefühlt? (Du kannst auch eine ausgedachte Situation beschreiben.)', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Antworten.' }] },
      ],
    },
    lesen: {
      was: 'Ein Text zum Nachdenken', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Text zum Nachdenken (vereinfacht)', titel: 'Ich sehe dich',
      absaetze: [
        'Menschen brauchen **Anerkennung** fast so sehr wie Essen und Schlaf. Wir möchten, dass andere uns sehen, dass wir ihnen wichtig sind und dass das, was wir tun, etwas zählt.',
        '### Drei Arten von Anerkennung',
        '**Ich werde geliebt, wie ich bin** – zum Beispiel von Familie oder Freunden. **Ich werde respektiert** – meine Rechte und meine Meinung zählen, wie die von allen anderen. **Ich werde für meine Leistung geschätzt** – jemand sieht, was ich kann oder was ich mir erarbeitet habe.',
        '### Wenn Anerkennung fehlt',
        'Wer lange übersehen oder herabgesetzt wird, fühlt sich wertlos oder wird wütend. Manche suchen dann Anerkennung um jeden Preis: durch gefährliche Mutproben, durch Angeberei oder in Gruppen, die anderen schaden.',
        '### Likes sind keine Anerkennung',
        'Likes fühlen sich kurz gut an. Aber echte Anerkennung ist mehr: ein ehrliches „Das hast du gut gemacht“, jemand, der zuhört, ein Danke, das von Herzen kommt. Und das Schöne ist: **Anerkennung kann jeder schenken.**',
      ],
      woerter: [['die Anerkennung', 'la reconnaissance'], ['schätzen', 'apprécier, estimer'], ['die Wertschätzung', 'l’estime'], ['respektieren', 'respecter'], ['die Leistung', 'la performance, le travail'], ['übersehen', 'ignorer, ne pas remarquer'], ['wertlos', 'sans valeur'], ['die Angeberei', 'la vantardise']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welche Art von Anerkennung ist das? Verbinde.', stufe: 2, links: ['„Ich mag dich, egal was passiert.“', '„Deine Meinung zählt genauso wie meine.“', '„Dein Referat war richtig gut vorbereitet.“'], rechts: ['geliebt werden, wie ich bin', 'respektiert werden', 'für Leistung geschätzt werden'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Nach der Stunde', titel: 'Der Satz, der alles änderte',
      situation: 'Sami erzählt seiner Lehrerin, warum er sich in diesem Jahr so verändert hat.',
      bild: ['sami:froh:stehen', 'lehrerin:ruhig:erklaeren'], sprecher: { Sami: 'm3', 'Frau Kremer': 'w1' },
      text: [
        ['Frau Kremer', 'Sami, du bist dieses Jahr wie ausgewechselt. Du arbeitest mit, du hilfst anderen. Was ist passiert?'],
        ['Sami', 'Ehrlich? Es war ein Satz von Ihnen. Am Anfang des Jahres habe ich eine Matheaufgabe an der Tafel falsch gerechnet. Alle haben gelacht.'],
        ['Frau Kremer', 'Daran erinnere ich mich.'],
        ['Sami', 'Und Sie haben gesagt: „Sami hat einen Fehler gemacht, aber schaut mal, wie clever er angefangen hat. Das war mutig.“ Das hat noch nie jemand über mich gesagt.'],
        ['Frau Kremer', 'Das hat dich so verändert?'],
        ['Sami', 'Ich dachte immer, ich bin der Dumme. Und dann hat jemand gesehen, dass ich etwas kann. Seitdem will ich zeigen, dass Sie recht hatten.'],
        ['Frau Kremer', 'Dann bekommst du heute noch einen Satz: Ich bin stolz auf dich.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „wie ausgewechselt“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ganz anders als vorher', 'krank'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was ist Sami am Anfang des Jahres passiert?', l: 'Er hat an der Tafel falsch gerechnet, alle haben gelacht.' }, { f: 'Was hat Frau Kremer damals gesagt?', zeilen: 2, l: '„Sami hat einen Fehler gemacht, aber schaut mal, wie clever er angefangen hat. Das war mutig.“' }, { f: 'Was hat sich danach bei Sami verändert?', l: 'Er arbeitet mit, hilft anderen und will zeigen, dass er etwas kann.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum kann ein einziger Satz so viel bewirken? Sprecht darüber.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich glaube, weil …', 'Manche Menschen hören selten …', 'Ich könnte …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Anerkennung', punkte: ['**geliebt** werden, wie ich bin', '**respektiert** werden', 'für **Leistung** geschätzt werden', 'Fehlt sie, fühlt man sich **wertlos** oder wird **wütend**.'] },
         { titel: 'Anerkennung schenken', punkte: ['**ehrlich** loben', '**zuhören**', '**Danke** sagen', 'auch **Mut** und **Mühe** sehen, nicht nur Ergebnisse'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Wertschätzungs-Karten: Schreibt drei Karten an Menschen in der Schule (Mitschüler, Lehrkräfte, Hausmeister, Kantine …). Schneidet sie aus und verschenkt sie.', stufe: 2, neueSeite: true, titel: 'Danke!', icon: 'heart-handshake', farbe: MUT, spalten: 3,
        karten: [
          { text: 'Danke, dass du / Sie …', linien: 3, frage: 'von: …' }, { text: 'Ich habe gesehen, wie du …', linien: 3, frage: 'von: …' }, { text: 'Das war mutig von dir: …', linien: 3, frage: 'von: …' },
          { text: 'Du hast mir geholfen, als …', linien: 3, frage: 'von: …' }, { text: 'Ohne dich wäre … nicht so schön.', linien: 3, frage: 'von: …' }, { text: 'Ich schätze an dir …', linien: 3, frage: 'von: …' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe über einen Menschen (echt oder ausgedacht), dessen Anerkennung dir viel bedeutet hat. Was hat er oder sie getan oder gesagt?', stufe: 2,
        anfaenge: ['Ein Mensch, der mich gesehen hat, ist …', 'Sie / Er hat …', 'Das hat mir gezeigt, dass …'], zeilen: 7,
        beispiel: 'Ein Mensch, der mich gesehen hat, ist mein Fußballtrainer. Er hat mich nach einem schlechten Spiel nicht angeschrien, sondern gesagt: „Du hast nie aufgegeben, das zählt.“ Das hat mir gezeigt, dass es nicht nur ums Gewinnen geht. Seitdem gebe ich auch nach Niederlagen nicht auf.' },
    ],
    check: ['Ich nenne drei Arten von Anerkennung.', 'Ich erkläre, was passiert, wenn Anerkennung fehlt.', 'Ich schenke anderen Wertschätzung.'],
  },
  // ================================================================ 5
  {
    thema: 'Integration · Teilhabe in der Gesellschaft', titel: 'Ankommen und mitmachen', untertitel: 'Was braucht ein Mensch, um in einem neuen Land richtig dazuzugehören? Du liest über Integration, hörst eine Mentorin und überlegst, was die Gesellschaft und jeder Einzelne beitragen.',
    ziel: { de: 'Ich erkläre, was Integration und Teilhabe bedeuten, und nenne, was dafür nötig ist.', fr: 'J’explique ce que signifient intégration et participation et ce qui est nécessaire pour y arriver.' },
    bild: ['amira:froh:stehen-zeigen', 'yusuf:froh:stehen'],
    start: {
      was: 'Was braucht man?',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was braucht ein Mensch, der neu in ein Land kommt, um gut anzukommen? Sammle.', stufe: 1, mitte: 'Ankommen', aeste: ['Sprache', { l: 'Wohnung' }, { l: 'Arbeit oder Schule' }, { l: 'Freunde' }, { l: 'Rechte' }, { l: 'Respekt' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Integration ist keine Einbahnstraße',
      absaetze: [
        'Fast die Hälfte der Menschen in Luxemburg hat keinen luxemburgischen Pass. Viele kamen, um zu arbeiten, zu studieren oder weil sie Schutz suchten. Damit ein Zusammenleben gut gelingt, braucht es **Integration**.',
        '### Was heißt Integration?',
        'Integration heißt nicht, dass Neue alles aufgeben, was sie mitbringen – ihre Sprache, ihre Religion, ihr Essen. Es heißt: **Alle** können am Leben in der Gesellschaft **teilhaben**: lernen, arbeiten, Freundschaften schließen, mitbestimmen. Dafür braucht es beide Seiten.',
        '### Was Neue beitragen',
        'Eine oder mehrere Landessprachen lernen, die Regeln und Gesetze kennenlernen, sich für die neue Umgebung interessieren.',
        '### Was die Gesellschaft beiträgt',
        'Sprachkurse und Schulen anbieten, gleiche Chancen bei Arbeit und Wohnung geben, Neue einladen. Und: Neue dürfen mitbestimmen, zum Beispiel bei den Gemeindewahlen (ab 18 Jahren, nach Eintragung in die Wählerliste).',
        'Für **beide** gilt: Regeln und Gesetze achten, Vorurteile abbauen und einander zuhören.',
        'Integration ist darum keine Einbahnstraße. Sie gelingt, wenn sich **alle** bewegen.',
      ],
      woerter: [['die Integration', 'l’intégration'], ['teilhaben', 'participer'], ['die Teilhabe', 'la participation'], ['die Landessprache', 'la langue du pays'], ['beitragen', 'contribuer'], ['die Chance', 'la chance, l’opportunité'], ['die Einbahnstraße', 'la rue à sens unique'], ['mitbestimmen', 'participer aux décisions']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wer trägt was bei? Kreuze an.', stufe: 2, kopf: ['', 'Neue', 'Gesellschaft', 'beide'], breiten: [52, 16, 16, 16], zeilen: [['eine Landessprache lernen', '[x]', '', ''], ['Sprachkurse anbieten', '', '[x]', ''], ['Vorurteile abbauen', '', '', '[x]'], ['Regeln und Gesetze achten', '', '', '[x]'], ['gleiche Chancen bei der Arbeit geben', '', '[x]', ''], ['einander zuhören', '', '', '[x]']] },
        { art: 'fragen', auftrag: 'Warum ist Integration „keine Einbahnstraße“?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Weil beide Seiten etwas beitragen müssen: die Neuen und die Gesellschaft, die sie aufnimmt.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Jugendhaus · Projekt „Buddys“', titel: 'Meine Buddy-Zeit',
      situation: 'Im Jugendhaus helfen ältere Jugendliche als „Buddys“ Neuankömmlingen. Yusuf interviewt Amira, die schon zwei Jahre mitmacht.',
      bild: ['amira:froh:stehen-zeigen', 'yusuf:froh:handy'], sprecher: { Yusuf: 'm3', Amira: 'w2' },
      text: [
        ['Yusuf', 'Amira, was macht ein Buddy?'],
        ['Amira', 'Ich treffe mich einmal pro Woche mit Dana. Sie ist vierzehn und vor einem Jahr aus der Ukraine gekommen. Wir gehen zusammen ins Jugendhaus, ich zeige ihr, wie der Bus funktioniert, und wir üben Deutsch und Luxemburgisch.'],
        ['Yusuf', 'Was war am Anfang schwierig?'],
        ['Amira', 'Sie war sehr still. Ich dachte, sie mag mich nicht. Dann habe ich verstanden: Sie war einfach müde. Alles war neu, und sie hat ihre Freunde vermisst.'],
        ['Yusuf', 'Und jetzt?'],
        ['Amira', 'Jetzt spielt sie im Volleyballverein und hat eigene Freunde. Neulich hat sie mir Borschtsch gekocht – eine rote Suppe aus ihrer Heimat. Ich habe ihr dafür Gromperekichelcher gezeigt.'],
        ['Yusuf', 'Was hast du gelernt?'],
        ['Amira', 'Dass Integration nicht heißt, dass Dana so werden muss wie ich. Wir haben beide etwas Neues gelernt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „Buddy“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Kumpel, der hilft und begleitet', 'ein Lehrer'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Amira trifft sich jeden Tag mit Dana.', false], ['Dana war am Anfang still, weil sie Amira nicht mochte.', false], ['Dana spielt jetzt im Volleyballverein.', true], ['Beide haben etwas Neues gelernt.', true]] },
        { art: 'fragen', auftrag: 'Was zeigt das Beispiel mit dem Essen?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Integration geht in beide Richtungen: Beide teilen etwas aus ihrer Kultur und lernen voneinander.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wäre Buddy etwas für euch? Was könntet ihr einer neuen Person zeigen?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich könnte zeigen, wie …', 'Ich würde gern lernen …', 'Schwierig fände ich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Integration', punkte: ['**alle** können teilhaben', 'Neue müssen **nicht alles aufgeben**', '**keine Einbahnstraße**: beide Seiten tragen bei'] },
         { titel: 'Teilhabe heißt …', punkte: ['**lernen** und **arbeiten**', '**Freundschaften** schließen', '**mitbestimmen** (z. B. Gemeindewahlen)', '**gleiche Chancen**'] }],
      ],
    },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Wer in Luxemburg lebt, sollte Luxemburgisch lernen.', 'Jeder Mensch, der lange in einem Land lebt, sollte dort wählen dürfen.'] },
      { art: 'dilemma', auftrag: 'Was würdest du tun? Denk über alle Möglichkeiten nach.', stufe: 3,
        geschichte: ['Eure Klasse plant ein Klassenfest. Die meisten wollen Grillwürstchen. Zwei Schüler essen kein Schweinefleisch, eine Schülerin isst vegetarisch.'],
        frage: 'Wie plant ihr das Essen?',
        optionen: ['Die Mehrheit entscheidet: Würstchen.', 'Jeder bringt sein eigenes Essen mit.', 'Wir suchen ein Buffet, bei dem für alle etwas dabei ist.'],
        hinweis: 'Gute Antworten bedenken Mehrheit und Minderheit. Lösung C bezieht alle ein – oft der beste Kompromiss.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Willkommens-Leitfaden für Jugendliche, die neu in deine Gemeinde kommen: fünf Tipps.', stufe: 2,
        anfaenge: ['Willkommen in …!', 'Tipp 1: …', 'Tipp 2: …', 'Tipp 3: …', 'Tipp 4: …', 'Tipp 5: …'], zeilen: 8,
        beispiel: 'Willkommen in unserer Gemeinde! Tipp 1: Bus und Zug sind gratis – probier sie aus. Tipp 2: Im Jugendhaus kannst du mittwochs Billard spielen und Leute kennenlernen. Tipp 3: Viele sprechen mehrere Sprachen, sprich einfach, wie du kannst. Tipp 4: In den Sportvereinen sind Neue immer willkommen. Tipp 5: Wenn du Hilfe brauchst, frag einen Buddy.' },
    ],
    check: ['Ich erkläre, was Integration und Teilhabe bedeuten.', 'Ich nenne, was beide Seiten beitragen.', 'Ich begründe meine Meinung.'],
  },
  // ================================================================ 6
  {
    thema: 'Demokratie im Kleinen · Kompromisse', titel: 'Gute Kompromisse', untertitel: 'Nicht immer bekommt jeder, was er will. Du lernst, wie man fair verhandelt, spielst ein Kompromiss-Spiel und hörst, wie eine Klasse einen Streit löst.',
    ziel: { de: 'Ich verhandle fair und finde Kompromisse, die viele mittragen können.', fr: 'Je négocie de façon équitable et je trouve des compromis acceptables pour beaucoup.' },
    bild: ['tom:froh:stehen', 'chloe:froh:stehen'],
    start: {
      was: 'Kompromiss?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist ein Kompromiss? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Beide Seiten geben etwas nach und finden eine Lösung.', 'Einer gewinnt, der andere verliert.', 'Man streitet, bis einer aufgibt.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Demokratie beginnt in der Klasse',
      absaetze: [
        'Demokratie bedeutet nicht nur wählen. Sie beginnt im Kleinen: in der Klasse, im Verein, in der Familie, im Jugendhaus. Überall dort, wo Menschen mit **verschiedenen Wünschen** zusammenleben, müssen sie Lösungen finden.',
        '### Mehrheit und Minderheit',
        'Oft entscheidet die **Mehrheit**. Das ist fair, aber nicht immer genug: Wenn die Mehrheit immer gewinnt, fühlen sich die anderen übergangen. Eine gute Demokratie achtet darum auch auf die **Minderheit** und ihre Rechte.',
        '### Kompromisse',
        'Ein **Kompromiss** ist eine Lösung, bei der jede Seite etwas nachgibt. Nicht jeder bekommt alles – aber jeder bekommt etwas, und alle können mit der Lösung leben. Kompromisse sind kein Zeichen von Schwäche, sondern von **Klugheit**.',
        '### So verhandelt man fair',
        '1. Jede Seite sagt, was ihr **wichtig** ist – und warum. 2. Man **hört zu** und fasst zusammen, was der andere will. 3. Man sucht gemeinsam nach **Ideen**. 4. Man prüft: Können alle damit leben? 5. Man hält sich an die **Abmachung**.',
      ],
      woerter: [['die Mehrheit', 'la majorité'], ['die Minderheit', 'la minorité'], ['übergangen werden', 'être laissé de côté'], ['der Kompromiss', 'le compromis'], ['nachgeben', 'céder'], ['verhandeln', 'négocier'], ['die Abmachung', 'l’accord'], ['die Klugheit', 'la sagesse']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'So verhandelt man fair: Ordne.', stufe: 1, teile: ['Jede Seite sagt, was ihr wichtig ist.', 'Man hört zu und fasst zusammen.', 'Man sucht gemeinsam nach Ideen.', 'Man prüft, ob alle damit leben können.', 'Man hält sich an die Abmachung.'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    hoeren: {
      was: 'Ein Klassenrat', wo: 'Klasse 6P1 · Klassenrat', titel: 'Der Streit um die Pausenhalle',
      situation: 'Die Klasse darf in der Pause die Halle nutzen. Die einen wollen Fußball spielen, die anderen Musik hören und tanzen.',
      bild: ['tom:aufgeregt:stehen', 'chloe:froh:stehen'], sprecher: { Tom: 'm3', Chloé: 'w3', Leitung: 'w2' },
      text: [
        ['Leitung', 'Thema heute: die Pausenhalle. Tom, was ist euch wichtig?'],
        ['Tom', 'Wir wollen Fußball spielen. Draußen regnet es so oft, und wir brauchen Bewegung.'],
        ['Leitung', 'Chloé?'],
        ['Chloé', 'Wir wollen Musik hören und tanzen. Wir üben für das Schulfest. Wenn Fußball läuft, haben wir Angst, einen Ball abzubekommen.'],
        ['Leitung', 'Ich fasse zusammen: Tom braucht Bewegung, Chloé braucht Platz und Sicherheit zum Üben. Ideen?'],
        ['Tom', 'Wir könnten die Halle teilen. Eine Hälfte Fußball, eine Hälfte Tanz?'],
        ['Chloé', 'Mit einem Netz dazwischen, ja. Oder wir wechseln uns ab: Montag, Mittwoch, Freitag Fußball, Dienstag und Donnerstag Tanz.'],
        ['Leitung', 'Wir stimmen ab: Wer ist für das Abwechseln? … Fast alle. Und vor dem Schulfest bekommt die Tanzgruppe eine Woche lang jeden Tag die Halle. Einverstanden, Tom?'],
        ['Tom', 'Okay. Das ist fair.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht die Leitung im Klassenrat? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie führt durch das Gespräch und fasst zusammen.', 'Sie entscheidet alles allein.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Tom', 'Chloé'], breiten: [24, 38, 38], zeilen: [['will …', '[Fußball spielen]', '[Musik hören und tanzen]'], ['weil …', '[draußen regnet es oft; Bewegung]', '[Üben für das Schulfest; Angst vor dem Ball]']] },
        { art: 'fragen', auftrag: 'Wie lautet der Kompromiss am Ende?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Montag, Mittwoch, Freitag Fußball; Dienstag und Donnerstag Tanz; vor dem Schulfest eine Woche lang jeden Tag Tanz.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wo gibt es in eurer Klasse oder Schule einen Streit, der einen Kompromiss braucht?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Bei uns streiten wir oft über …', 'Ein Kompromiss könnte sein …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Demokratie im Kleinen', punkte: ['**Mehrheit** entscheidet oft', '**Minderheit** achten', '**Kompromiss**: jede Seite gibt etwas nach'] },
         { titel: 'Fair verhandeln', nummern: true, punkte: ['sagen, was **wichtig** ist', '**zuhören**, zusammenfassen', '**Ideen** sammeln', '**prüfen**: Können alle damit leben?', 'an die **Abmachung** halten'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Kompromiss-Spiel: Zwei Teams ziehen je eine Rollenkarte und verhandeln nach den fünf Schritten. Findet einen Kompromiss und schreibt ihn auf die leere Karte.', stufe: 3, neueSeite: true, titel: 'Verhandelt!', icon: 'scale', farbe: FRAGE, spalten: 2,
        karten: [
          { text: '**Team A:** Ihr wollt beim Klassenausflug in den Freizeitpark.', frage: 'Was ist euch wichtig?' },
          { text: '**Team B:** Ihr wollt beim Klassenausflug wandern und grillen – es soll wenig kosten.', frage: 'Was ist euch wichtig?' },
          { text: '**Team A:** Ihr wollt im Klassenzimmer Musik während der Stillarbeit.', frage: 'Was ist euch wichtig?' },
          { text: '**Team B:** Ihr braucht Ruhe, um euch zu konzentrieren.', frage: 'Was ist euch wichtig?' },
          { text: '**Unser Kompromiss (Ausflug):**', linien: 3 },
          { text: '**Unser Kompromiss (Musik):**', linien: 3 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe einen Kompromiss aus deinem Leben oder einer ausgedachten Situation: Worum ging es? Wer hat was nachgegeben? Warum war es eine gute Lösung?', stufe: 2,
        anfaenge: ['Es ging um …', 'Die eine Seite wollte …, die andere …', 'Unser Kompromiss: …', 'Das war gut, weil …'], zeilen: 7,
        beispiel: 'Es ging um das Fernsehprogramm im Jugendhaus. Die eine Gruppe wollte Fußball schauen, die andere einen Film. Unser Kompromiss: In der ersten Halbzeit läuft Fußball, danach der Film, und das Ergebnis schauen wir am Ende. Das war gut, weil beide etwas bekommen haben und niemand sauer nach Hause gegangen ist.' },
    ],
    check: ['Ich erkläre Mehrheit, Minderheit und Kompromiss.', 'Ich kenne die Schritte fairen Verhandelns.', 'Ich finde Kompromisse.'],
  },
  // ================================================================ 7
  {
    thema: 'Religionen kennenlernen · Christentum', titel: 'Das Christentum', untertitel: 'Jesus, die Bibel, das Kreuz, viele Kirchen: Du lernst die größte Religion der Welt kennen, hörst ein Gespräch über eine Taufe und ordnest das Kirchenjahr.',
    ziel: { de: 'Ich beschreibe wichtige Merkmale des Christentums und begegne ihm mit Respekt.', fr: 'Je décris des caractéristiques importantes du christianisme et je le respecte.' },
    bild: ['lehrerin:froh:erklaeren', 'mia:froh:stehen'],
    start: {
      was: 'Was weißt du schon?',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was fällt dir zum Christentum ein? Sammle.', stufe: 1, mitte: 'Christentum', aeste: ['Jesus', { l: 'Bibel' }, { l: 'Kirche' }, { l: 'Kreuz' }, { l: 'Weihnachten' }, { l: 'Ostern' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht); Zahlen gerundet', titel: 'Die größte Religion der Welt',
      absaetze: [
        'Mit über **2 Milliarden** Menschen ist das **Christentum** die größte Religion der Welt. Christinnen und Christen glauben an **einen Gott** und an **Jesus Christus**. Jesus lebte vor etwa 2000 Jahren in der Gegend des heutigen Israel und Palästina. Er erzählte von Gottes Liebe, half Armen und Kranken und lehrte, wie schon die jüdische Bibel: „Liebe deinen Nächsten wie dich selbst.“',
        '### Kreuz und Ostern',
        'Jesus wurde in Jerusalem am **Kreuz** hingerichtet. Christen glauben, dass er am dritten Tag von den Toten **auferstanden** ist. Daran erinnert **Ostern**, das wichtigste christliche Fest. Das Kreuz ist darum das Zeichen der Christen. Das **Kirchenjahr** beginnt mit dem **Advent** vor **Weihnachten**. Nach Ostern folgen **Pfingsten** und im November **Allerheiligen**.',
        '### Die Bibel',
        'Die heilige Schrift heißt **Bibel**. Sie hat zwei Teile: das **Alte Testament**, das viele Texte mit der jüdischen Bibel gemeinsam hat, und das **Neue Testament** mit den Berichten über Jesus, den **Evangelien**.',
        '### Viele Kirchen',
        'Im Lauf der Geschichte haben sich verschiedene **Konfessionen** entwickelt: die **katholische**, die **evangelische** und die **orthodoxe** Kirche und viele andere. Sie feiern Gottesdienste, beten und taufen. In Luxemburg ist die katholische Kirche traditionell die größte.',
      ],
      woerter: [['das Christentum', 'le christianisme'], ['auferstehen', 'ressusciter'], ['hinrichten', 'exécuter'], ['die Bibel', 'la Bible'], ['das Evangelium', 'l’Évangile'], ['die Konfession', 'la confession'], ['der Gottesdienst', 'l’office religieux, la messe'], ['die Taufe', 'le baptême']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Das Christentum hat über [2 Milliarden] Mitglieder.', 'Jesus lehrte: „Liebe deinen [Nächsten] wie dich selbst.“', 'Das wichtigste christliche Fest ist [Ostern].', 'Die Bibel hat zwei Teile: das Alte und das [Neue] Testament.', 'Drei große Konfessionen sind katholisch, evangelisch und [orthodox].'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pause · Schulhof', titel: 'Die Taufe meiner Cousine',
      situation: 'Mia erzählt Ben von der Taufe ihrer kleinen Cousine. Ben war noch nie in einer Kirche.',
      bild: ['mia:froh:handy', 'ben:verwirrt:stehen'], sprecher: { Mia: 'w3', Ben: 'm3' },
      text: [
        ['Mia', 'Am Sonntag war die Taufe von meiner kleinen Cousine. Meine große Schwester ist ihre Patin, und ich durfte auch mithelfen!'],
        ['Ben', 'Was macht man bei einer Taufe? Ich war noch nie in einer Kirche.'],
        ['Mia', 'Der Pfarrer gießt dem Baby ein bisschen Wasser über den Kopf und sagt: „Ich taufe dich im Namen des Vaters und des Sohnes und des Heiligen Geistes.“ Damit gehört sie zur Kirche.'],
        ['Ben', 'Und warum Wasser?'],
        ['Mia', 'Wasser steht für Leben und für einen neuen Anfang. Ich durfte eine Kerze halten, die Taufkerze. Die erinnert an Jesus, der gesagt hat: „Ich bin das Licht der Welt.“'],
        ['Ben', 'Und was macht eine Patin?'],
        ['Mia', 'Meine Schwester hat versprochen, für die Kleine da zu sein, wenn sie sie braucht – nicht nur beim Glauben. Und ehrlich: Wir sind alle richtig stolz.'],
        ['Ben', 'Klingt schön. Vielleicht komme ich mal mit in eine Kirche, einfach zum Anschauen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Pate oder eine Patin bei einer Taufe? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['jemand, der verspricht, das Kind zu begleiten', 'der Pfarrer'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was macht der Pfarrer bei der Taufe?', l: 'Er gießt dem Baby Wasser über den Kopf und spricht die Taufformel.' }, { f: 'Wofür steht das Wasser?', l: 'für Leben und einen neuen Anfang' }, { f: 'Woran erinnert die Taufkerze?', l: 'an Jesus, der sagte: „Ich bin das Licht der Welt.“' }, { f: 'Was verspricht die Patin?', l: 'für das Kind da zu sein, wenn es sie braucht – nicht nur beim Glauben' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Feiern gibt es in anderen Religionen oder ohne Religion, wenn ein Kind geboren wird? (Nur erzählen, wenn ihr wollt.)', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Bei … feiert man …', 'Ohne Religion kann man …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Christentum', punkte: ['Glaube an **Gott** und **Jesus Christus**', 'Schrift: **Bibel** (Altes und Neues Testament)', 'Zeichen: **Kreuz**', 'Konfessionen: **katholisch, evangelisch, orthodox**'] },
         { titel: 'Kirchenjahr', punkte: ['**Advent** und **Weihnachten**: Geburt Jesu', '**Ostern**: Auferstehung', '**Pfingsten**: Heiliger Geist', 'Rituale: **Taufe**, Kommunion, Hochzeit'] }],
      ],
    },
    ueben: [
      { art: 'ordnen', auftrag: 'Das Kirchenjahr: Ordne die Feste im Jahr, beginnend mit dem Advent.', stufe: 2, teile: ['Advent', 'Weihnachten', 'Ostern', 'Pfingsten', 'Allerheiligen'], ordnung: [2, 4, 0, 3, 1] },
      { art: 'schneidekarten', auftrag: 'Begriffs-Karten: Schneidet die Karten aus. Eine Person zieht eine Karte und erklärt den Begriff, ohne ihn zu sagen. Die anderen raten.', stufe: 2, neueSeite: true, titel: 'Erklär mal!', icon: 'message-circle', farbe: GLAUBE, spalten: 3,
        karten: [
          { text: '**Bibel**' }, { text: '**Kreuz**' }, { text: '**Taufe**' },
          { text: '**Ostern**' }, { text: '**Pfarrer**' }, { text: '**Evangelium**' },
          { text: '**Kirche**' }, { text: '**Advent**' }, { text: '**Nächstenliebe**' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Steckbrief „Das Christentum“ für ein Plakat.', stufe: 2,
        anfaenge: ['Glaube: …', 'Wichtige Person: …', 'Heilige Schrift: …', 'Gotteshaus: …', 'Wichtige Feste: …', 'Symbol: …'], zeilen: 7,
        beispiel: 'Glaube: an einen Gott und an Jesus Christus. Wichtige Person: Jesus, der vor etwa 2000 Jahren lebte und Nächstenliebe lehrte. Heilige Schrift: die Bibel mit Altem und Neuem Testament. Gotteshaus: Kirche. Wichtige Feste: Weihnachten, Ostern, Pfingsten. Symbol: das Kreuz.' },
    ],
    check: ['Ich beschreibe wichtige Merkmale des Christentums.', 'Ich ordne die Feste des Kirchenjahrs.', 'Ich erkläre ein christliches Ritual.'],
  },
  // ================================================================ 8
  {
    thema: 'Christentum in Luxemburg · Spuren im Alltag', titel: 'Spuren des Christentums in Luxemburg', untertitel: 'Feiertage, Wegkreuze, die Oktave, die Springprozession – und ein Schulfach für alle: Du gehst auf Spurensuche und denkst über Religion in einem vielfältigen Land nach.',
    ziel: { de: 'Ich entdecke christliche Spuren in Luxemburg und erkläre, wie Religion und Staat heute zusammenleben.', fr: 'Je découvre des traces chrétiennes au Luxembourg et j’explique comment religion et État coexistent aujourd’hui.' },
    bild: ['oma:froh:stehen', 'noah:froh:stehen'],
    start: {
      was: 'Spuren',
      aufgaben: [
        { art: 'mc', auftrag: 'Welche Feiertage in Luxemburg haben einen christlichen Ursprung? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Weihnachten', 'Ostermontag', 'Allerheiligen', 'Nationalfeiertag', 'Christi Himmelfahrt'], r: [0, 1, 2, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht, Stand 2026)', titel: 'Überall Spuren',
      absaetze: [
        'Wer durch Luxemburg geht, findet viele Spuren des Christentums: Kirchen in fast jedem Dorf, **Wegkreuze** an Feldwegen, Straßen und Orte mit Namen von Heiligen. Viele **Feiertage** sind christlich: Ostern, Christi Himmelfahrt, Pfingsten, Allerheiligen, Weihnachten.',
        '### Die Oktave',
        'Seit dem 17. Jahrhundert pilgern jedes Jahr im Frühling viele Menschen zur **Oktave** in die Kathedrale von Luxemburg. Sie verehren dort Maria als „Trösterin der Betrübten“, die Schutzpatronin der Stadt und des Landes. In der Nähe der Kathedrale gibt es dann auch einen kleinen Markt.',
        '### Die Springprozession',
        'In **Echternach** findet jedes Jahr am Pfingstdienstag die **Springprozession** statt, zu Ehren des heiligen Willibrord. Tausende Menschen springen tanzend durch die Straßen. Sie gehört zum Kulturerbe der UNESCO.',
        '### Religion und Staat heute',
        'Luxemburg ist heute ein Land mit vielen Religionen und vielen Menschen ohne Religion. Staat und Religionsgemeinschaften sind seit 2015 klarer getrennt. Seit 2016 haben alle an den Lyzeen ein gemeinsames Fach: **Vie et société** – genau das Fach, das du gerade hast. Vorher gab es getrennt Religions- oder Moralunterricht.',
      ],
      woerter: [['die Spur', 'la trace'], ['das Wegkreuz', 'le calvaire, la croix de chemin'], ['der Heilige / die Heilige', 'le saint / la sainte'], ['pilgern', 'faire un pèlerinage'], ['die Kathedrale', 'la cathédrale'], ['verehren', 'vénérer'], ['die Prozession', 'la procession'], ['getrennt', 'séparé']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was gehört zusammen? Verbinde.', stufe: 1, links: ['Oktave', 'Springprozession', 'Wegkreuz', 'Vie et société'], rechts: ['Pilgern zur Kathedrale im Frühling', 'Echternach, Pfingstdienstag', 'Kreuz am Feldweg', 'gemeinsames Schulfach seit 2016'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Spaziergang · am Wegkreuz', titel: 'Warum steht hier ein Kreuz?',
      situation: 'Noah wandert mit einer älteren Nachbarin. Am Feldrand steht ein altes Steinkreuz.',
      bild: ['oma:froh:stehen', 'noah:verwirrt:stehen'], sprecher: { Noah: 'm3', Nachbarin: 'w1' },
      text: [
        ['Noah', 'Warum steht hier mitten im Feld ein Kreuz?'],
        ['Nachbarin', 'Solche Wegkreuze gibt es in Luxemburg viele. Manche wurden aus Dankbarkeit gebaut, zum Beispiel nach einer guten Ernte. Andere erinnern an einen Unfall oder an Menschen, die hier gestorben sind.'],
        ['Noah', 'Und dieses?'],
        ['Nachbarin', 'Hier steht eine Jahreszahl: 1866. In diesem Jahr gab es eine schlimme Krankheit im Land, die Cholera. Viele Menschen starben. Vielleicht haben die Menschen gebetet, dass sie aufhört.'],
        ['Noah', 'Ich bin nicht religiös. Ist das dann für mich wichtig?'],
        ['Nachbarin', 'Es ist ein Stück Geschichte. Es erzählt, was den Menschen damals Angst gemacht hat und was ihnen Hoffnung gab. Das kann jeder verstehen – egal, was er glaubt.'],
        ['Noah', 'Dann mache ich ein Foto für unser Projekt „Spuren im Dorf“.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Ernte? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['wenn man reifes Getreide, Obst oder Gemüse einsammelt', 'ein Gewitter'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum wurden Wegkreuze gebaut? Nenne zwei Gründe.', zeilen: 2, l: 'aus Dankbarkeit (z. B. nach einer guten Ernte); zur Erinnerung an einen Unfall oder an Verstorbene' }, { f: 'Welche Jahreszahl steht auf dem Kreuz?', l: '1866' }, { f: 'Warum ist das Kreuz auch für Noah wichtig?', l: 'Es ist ein Stück Geschichte; es zeigt, was den Menschen Angst und Hoffnung gab.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche religiösen oder geschichtlichen Spuren kennt ihr in eurem Ort?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Kirche oder Kapelle', 'Wegkreuz', 'Denkmal', 'Straßenname', 'Friedhof'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Christliche Spuren in Luxemburg', punkte: ['**Kirchen**, **Wegkreuze**, Namen von Heiligen', '**Feiertage**: Ostern, Pfingsten, Allerheiligen, Weihnachten', '**Oktave** (Kathedrale) und **Springprozession** (Echternach)'] },
         { titel: 'Heute', punkte: ['viele Religionen und Menschen **ohne Religion**', 'Staat und Religion **getrennt** (seit 2015 klarer)', '**Vie et société** für alle (seit 2016)'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Spurensuche-Karten: Nehmt die Karten mit auf einen Rundgang durch euren Ort (mit der Klasse). Notiert, was ihr findet, und macht ein Foto oder eine Skizze.', stufe: 2, neueSeite: true, titel: 'Spurensuche', icon: 'map-pin', farbe: IDEE, spalten: 2,
        karten: [
          { text: '**Ein Gebäude mit religiöser Bedeutung:**', linien: 3 }, { text: '**Ein Straßen- oder Ortsname:**', linien: 3 },
          { text: '**Ein Wegkreuz, Denkmal oder Gedenkstein:**', linien: 3 }, { text: '**Etwas aus einer anderen Religion oder Kultur:**', linien: 3 },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Es ist gut, dass alle Schülerinnen und Schüler gemeinsam Vie et société haben.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Bericht über eine Spur, die ihr gefunden habt (oder über das Wegkreuz aus dem Hörtext).', stufe: 2,
        anfaenge: ['Wir haben … gefunden.', 'Es steht …', 'Es erinnert an …', 'Interessant finde ich …'], zeilen: 7,
        beispiel: 'Wir haben ein altes Steinkreuz am Feldweg hinter der Schule gefunden. Es steht neben einem großen Baum und trägt die Jahreszahl 1866. Es erinnert vielleicht an die Cholera, eine schlimme Krankheit von damals. Interessant finde ich, dass es nach über 150 Jahren immer noch dort steht und gepflegt wird.' },
    ],
    check: ['Ich nenne christliche Spuren in Luxemburg.', 'Ich erkläre Oktave und Springprozession.', 'Ich weiß, warum es Vie et société für alle gibt.'],
  },
]
