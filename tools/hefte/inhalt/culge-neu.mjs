// Culture générale VP · neue Lektionen für Pflichtkompetenzen, die in den alten Heften fehlten (Prüfung 26.11.2026,
// Programm CULGE, CNES 30/06/2026):
//   koerper       – M1 (Niveau 1.1): Teile und Funktionen des Körpers, Krankheitszeichen erkennen
//   grenzen       – M1 (Niveau 1.1): Grenzen und Sicherheit (mein Körper gehört mir, Nein sagen, Hilfe holen)
//   fortpflanzung – M4 (Niveau 1.2): Fortpflanzung, und wo Jugendliche vertraulich Hilfe finden
//   schutz        – M7 (Niveau 1.3): Einverständnis, Verhütung und Schutz vor sexuell übertragbaren Infektionen
// Sachlich, ruhig, ohne Fragen nach eigenen Erfahrungen. Alle Personen sind erfunden. Hilfe: 112 · 113 · 116 111 ·
// BEE SECURE Helpline 8002 1234 · Planning Familial · Schulärztin/Schulkrankenpfleger · SePAS.

export const NEU = {
  // ================================================================ M1 · Mein Körper
  koerper: {
    thema: 'Körperteile · Organe · Krankheitszeichen', titel: 'Mein Körper – ein starkes Team', untertitel: 'Kopf, Herz, Lunge, Magen, Haut: Jedes Teil hat eine Aufgabe. Du lernst, was dein Körper dir sagt, wenn er krank wird – und was du dann tust.',
    ziel: { de: 'Ich nenne Teile und Organe des Körpers mit ihren Aufgaben und erkenne Zeichen von Krankheit.', fr: 'Je nomme les parties et les organes du corps et je reconnais les signes d’une maladie.' },
    bild: ['yusuf:froh:stehen', 'aerztin:froh:erklaeren'],
    start: {
      was: 'Wo ist das?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wo im Körper liegt das? Verbinde.', stufe: 1, links: ['das Gehirn', 'das Herz', 'die Lunge', 'der Magen'], rechts: ['im Kopf', 'in der Brust, etwas links', 'in der Brust, links und rechts', 'im Bauch, oben links'] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht; bei Fragen: Schulärztin, Arzt)',
      titel: 'Ein Körper, viele Aufgaben',
      absaetze: [
        'Der Körper hat einen **Kopf**, einen **Rumpf**, zwei **Arme** und zwei **Beine**. Innen arbeiten die **Organe** – jedes hat eine Aufgabe, und alle arbeiten zusammen wie ein Team.',
        '### Wer macht was?',
        'Das **Gehirn** steuert alles: Denken, Fühlen, Bewegen. Das **Herz** pumpt das Blut durch den Körper. Die **Lunge** holt Sauerstoff aus der Luft. Der **Magen** und der **Darm** verdauen das Essen. Die **Knochen** stützen den Körper, die **Muskeln** bewegen ihn. Die **Haut** schützt alles wie eine Hülle.',
        '### Wenn der Körper Alarm gibt',
        'Bei einer Krankheit sendet der Körper **Zeichen**: Fieber (ab etwa 38 °C), Husten, Schnupfen, Halsschmerzen, Bauchschmerzen, Durchfall, Erbrechen oder große Müdigkeit. Fieber zeigt, dass der Körper gegen Krankheitserreger kämpft.',
        'Was hilft? **Bescheid sagen** – zu Hause oder in der Schule. Ausruhen, viel trinken, Hände waschen, in die Armbeuge husten. Wenn es nicht besser wird oder sehr stark ist: zum **Arzt**. Bei einem Notfall – zum Beispiel jemand bekommt keine Luft oder ist bewusstlos – sofort **112** anrufen.',
      ],
      woerter: [['der Körper', 'le corps'], ['das Organ', 'l’organe'], ['das Gehirn', 'le cerveau'], ['das Herz', 'le cœur'], ['die Lunge', 'les poumons'], ['der Magen', 'l’estomac'], ['das Fieber', 'la fièvre'], ['der Husten', 'la toux'], ['krank', 'malade']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Organ hat welche Aufgabe? Verbinde.', stufe: 1, links: ['das Gehirn', 'das Herz', 'die Lunge', 'die Haut', 'die Muskeln'], rechts: ['steuert alles', 'pumpt das Blut', 'holt Sauerstoff', 'schützt den Körper', 'bewegen den Körper'] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Fieber beginnt bei etwa 38 °C.', true], ['Wenn ich krank bin, sage ich es lieber niemandem.', false], ['Bei einem Notfall rufe ich 112 an.', true], ['In die Hand husten ist am besten.', false]] },
      ],
    },
    hoeren: {
      was: 'Bei der Schulkrankenpflegerin', wo: 'Krankenzimmer der Schule', titel: 'Mir geht es nicht gut',
      situation: 'Yusuf kommt in der zweiten Stunde ins Krankenzimmer. Die Schulkrankenpflegerin fragt nach.',
      bild: ['yusuf:muede:sitzen', 'aerztin:froh:erklaeren'],
      sprecher: { Pflegerin: 'w1', Yusuf: 'm2' },
      text: [
        ['Pflegerin', 'Hallo Yusuf. Was ist los?'],
        ['Yusuf', 'Mir ist heiß und kalt zugleich. Und mein Hals tut weh, wenn ich schlucke.'],
        ['Pflegerin', 'Seit wann?'],
        ['Yusuf', 'Seit heute Morgen. Ich habe nichts gefrühstückt.'],
        ['Pflegerin', 'Ich messe Fieber … 38,6 Grad. Du hast Fieber. Das ist ein Zeichen, dass dein Körper gegen etwas kämpft.'],
        ['Yusuf', 'Muss ich nach Hause?'],
        ['Pflegerin', 'Ja. Ich rufe jetzt zu Hause an. Leg dich hin und trink ein Glas Wasser. Zu Hause: ausruhen, viel trinken. Wenn das Fieber nach zwei, drei Tagen nicht weggeht, geht ihr zum Arzt.'],
        ['Yusuf', 'Danke. Gut, dass ich gekommen bin.'],
        ['Pflegerin', 'Genau richtig. Wer krank ist, sagt Bescheid – und steckt so auch die anderen nicht an.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wohin gehst du in der Schule, wenn es dir nicht gut geht? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['zur Lehrperson oder ins Krankenzimmer', 'ich warte, bis die Schule aus ist'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was hat Yusuf, was soll er tun?', stufe: 1, kopf: ['Zeichen', 'Was tun?'], breiten: [45, 55], zeilen: [['[Halsschmerzen beim Schlucken]', '[Wasser trinken, sich hinlegen]'], ['[Fieber: 38,6 Grad]', '[nach Hause, ausruhen, viel trinken]'], ['[ihm ist heiß und kalt]', '[wenn es nach 2–3 Tagen nicht besser ist: zum Arzt]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt zu zweit: Eine Person kommt ins Krankenzimmer und beschreibt zwei Zeichen. Die andere fragt nach und gibt einen Rat.', stufe: 2, karten: [{ titel: 'Satzanfänge', text: ['Mir tut … weh.', 'Seit … geht es mir nicht gut.', 'Hast du Fieber?', 'Du solltest …'] }] }],
    },
    regel: { reihen: [[
      { titel: 'Organe und Aufgaben', punkte: ['**Gehirn**: steuert', '**Herz**: pumpt Blut', '**Lunge**: atmet', '**Magen, Darm**: verdauen', '**Haut**: schützt'] },
      { titel: 'Wenn ich krank bin', punkte: ['**Bescheid sagen**', 'ausruhen, **viel trinken**', 'Hände waschen, in die **Armbeuge** husten', 'nicht besser? → **Arzt**', 'Notfall → **112**'] },
    ]] },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Sätze.', stufe: 2, woerter: ['Lunge', 'Fieber', 'Herz', 'Armbeuge', '112'], saetze: ['Das [Herz] pumpt das Blut durch den Körper.', 'Die [Lunge] holt Sauerstoff aus der Luft.', 'Ab etwa 38 °C hat man [Fieber].', 'Ich huste in die [Armbeuge].', 'Bei einem Notfall rufe ich die [112] an.'] },
      { art: 'frei', auftrag: 'Zeichne einen einfachen Umriss eines Körpers. Zeichne Gehirn, Herz, Lunge und Magen ein und beschrifte sie.', stufe: 2, html: '<div style="height:70mm;border:0.35mm dashed #c9cfd8;border-radius:3mm"></div>' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine kurze Nachricht an die Lehrperson: Du bist krank und kommst heute nicht. Nenne zwei Zeichen und was du machst.', stufe: 2,
        anfaenge: ['Guten Morgen Frau / Herr …,', 'ich bin heute krank: …', 'Ich bleibe zu Hause und …', 'Viele Grüße'], zeilen: 6,
        beispiel: 'Guten Morgen Frau Weber, ich bin heute krank: Ich habe Fieber und Halsschmerzen. Ich bleibe zu Hause, ruhe mich aus und trinke viel. Wenn es morgen nicht besser ist, gehe ich zum Arzt. Viele Grüße, Sam' },
    ],
    check: ['Ich nenne fünf Organe und ihre Aufgaben.', 'Ich erkenne Zeichen von Krankheit.', 'Ich weiß, was ich tue, wenn ich krank bin – und wann ich 112 anrufe.'],
  },

  // ================================================================ M1 · Meine Grenzen
  grenzen: {
    thema: 'Grenzen · Sicherheit · Hilfe holen', titel: 'Mein Körper gehört mir', untertitel: 'Niemand darf dich anfassen, wenn du das nicht willst – auch nicht online. Du lernst gute und ungute Gefühle zu unterscheiden, Nein zu sagen und Hilfe zu holen.',
    ziel: { de: 'Ich erkenne, wenn jemand meine Grenze überschreitet, sage Nein und weiß, wo ich Hilfe bekomme.', fr: 'Je reconnais quand quelqu’un dépasse mes limites, je dis non et je sais où trouver de l’aide.' },
    bild: ['mia:ruhig:stehen', 'lea:froh:stehen-zeigen'],
    start: {
      was: 'Gutes oder ungutes Gefühl?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wie fühlt sich das an? Kreuze an. (Du musst deine Antworten nicht zeigen.)', stufe: 1, kopf: ['Situation', 'gutes Gefühl', 'ungutes Gefühl'], breiten: [60, 20, 20], zeilen: [['Eine Freundin umarmt mich zur Begrüßung, ich mag das.', '', ''], ['Jemand will mein Handy-Passwort.', '', ''], ['Ein Fremder im Chat will ein Foto von mir.', '', ''], ['Mein Trainer gibt mir ein High five.', '', '']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht). Hilfe: 116 111 · BEE SECURE Helpline 8002 1234 · Polizei 113 · Notruf 112',
      titel: 'Meine Grenzen – deine Grenzen',
      absaetze: [
        'Jeder Mensch hat **Grenzen**. Du entscheidest selbst, wer dich wie berühren darf. Eine Umarmung kann schön sein – oder unangenehm. Beides ist in Ordnung. Wichtig ist: **Dein Gefühl zählt.** Und genauso respektierst du die Grenzen der anderen.',
        '### Gute und schlechte Geheimnisse',
        'Ein **gutes Geheimnis** macht Freude, zum Beispiel ein Geschenk. Ein **schlechtes Geheimnis** macht Angst oder Bauchweh – zum Beispiel, wenn jemand sagt: „Das bleibt unter uns, sonst …“. Schlechte Geheimnisse darfst und sollst du **weitererzählen**. Das ist kein Petzen.',
        '### Auch online',
        'Im Netz gilt dasselbe. Schick keine Fotos von dir an Menschen, die du nicht wirklich kennst. Wenn dich jemand bedrängt, Bilder verlangt oder dir Angst macht: **nicht antworten, Screenshot machen, blockieren, melden** – und einem Erwachsenen davon erzählen.',
        '### Wer hilft?',
        'Eltern, Lehrpersonen, die Schulärztin, der **SePAS** der Schule. Anonym und kostenlos: **116 111** (Kanner- a Jugendtelefon). Probleme im Netz: **BEE SECURE Helpline 8002 1234**. In Gefahr: Polizei **113** oder Notruf **112**. **Du bist nie schuld**, wenn jemand deine Grenze überschreitet.',
      ],
      woerter: [['die Grenze', 'la limite'], ['berühren', 'toucher'], ['das Geheimnis', 'le secret'], ['Nein sagen', 'dire non'], ['blockieren', 'bloquer'], ['melden', 'signaler'], ['die Hilfe', 'l’aide']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Ich entscheide selbst, wer mich berühren darf.', true], ['Ein schlechtes Geheimnis muss ich immer für mich behalten.', false], ['Wenn mich jemand online bedrängt, mache ich einen Screenshot und erzähle es einem Erwachsenen.', true], ['Wer Hilfe holt, petzt.', false]] },
        { art: 'mc', auftrag: 'Gutes oder schlechtes Geheimnis? Kreuze an.', stufe: 2, fragen: [{ f: 'Wir planen eine Überraschungsparty für Lina.', o: ['gutes Geheimnis', 'schlechtes Geheimnis'], r: 0 }, { f: 'Ein Älterer sagt: „Erzähl niemandem von unseren Fotos.“', o: ['gutes Geheimnis', 'schlechtes Geheimnis'], r: 1 }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch im Hof', wo: 'Schulhof, große Pause', titel: 'Das ist komisch',
      situation: 'Mia zeigt Lea eine Nachricht auf dem Handy. Lea hört zu.',
      bild: ['mia:besorgt:handy', 'lea:ruhig:stehen'],
      sprecher: { Mia: 'w3', Lea: 'w2' },
      text: [
        ['Mia', 'Schau mal. Der schreibt mir seit einer Woche. Er sagt, er ist 15 und findet mich hübsch.'],
        ['Lea', 'Kennst du ihn?'],
        ['Mia', 'Nein, nur aus dem Spiel. Jetzt will er ein Foto. Und ich soll es niemandem sagen.'],
        ['Lea', 'Das ist komisch. Wer wirklich nett ist, verlangt keine Geheimnisse.'],
        ['Mia', 'Ich habe ein ungutes Gefühl. Aber ich will keinen Ärger.'],
        ['Lea', 'Du bekommst keinen Ärger. Du hast nichts falsch gemacht. Mach einen Screenshot und blockier ihn.'],
        ['Mia', 'Und dann?'],
        ['Lea', 'Dann erzählst du es jemandem, dem du vertraust. Wollen wir zusammen zum SePAS gehen?'],
        ['Mia', 'Ja. Zusammen ist leichter.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „ungutes Gefühl“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Mein Bauch sagt mir: Hier stimmt etwas nicht.', 'Ich habe Hunger.'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Was rät Lea? Bring die Schritte in die richtige Reihenfolge.', stufe: 1, teile: ['Screenshot machen', 'den Kontakt blockieren', 'einer Vertrauensperson erzählen', 'zusammen zum SePAS gehen'] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Sammelt in der Klasse: Woran merkt man, dass jemand im Netz nicht ehrlich ist?', stufe: 2, karten: [{ titel: 'Warnzeichen', text: ['will Fotos', 'verlangt Geheimnisse', 'macht sehr viele Komplimente', 'will sich allein treffen'] }] }],
    },
    regel: { reihen: [[
      { titel: 'Meine Grenze', punkte: ['**Mein Gefühl zählt**', 'ich darf **Nein** sagen – laut und klar', 'schlechte Geheimnisse **weitererzählen**', '**Ich bin nie schuld**'] },
      { titel: 'Hilfe holen', punkte: ['Eltern, Lehrperson, **SePAS**', '**116 111** – anonym, kostenlos', 'Netz: **BEE SECURE 8002 1234**', 'Gefahr: **113** / **112**'] },
    ]] },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? (Du musst deine Antworten nicht zeigen.)', stufe: 2, aussagen: ['Auch Freunde und Familie müssen ein Nein respektieren.', 'Wer ein Foto von jemandem ohne Erlaubnis weiterschickt, überschreitet eine Grenze.'] },
      { art: 'fragen', auftrag: 'Schreibe drei Sätze auf, mit denen man klar Nein sagen kann.', stufe: 2, fragen: [{ f: '', zeilen: 3, l: 'z. B. „Nein, das will ich nicht.“ · „Hör auf!“ · „Ich schicke dir kein Foto.“' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mia hat Lea alles erzählt. Schreibe Mia eine Nachricht, die ihr Mut macht.', stufe: 2,
        anfaenge: ['Hey Mia,', 'du hast alles richtig gemacht, weil …', 'Wenn er dir wieder schreibt, …', 'Ich bin für dich da.'], zeilen: 6,
        beispiel: 'Hey Mia, du hast alles richtig gemacht, weil du auf dein Gefühl gehört hast. Es ist nicht deine Schuld. Wenn er dir wieder schreibt, antwortest du nicht und sagst es dem SePAS. Ich bin für dich da.' },
    ],
    check: ['Ich weiß: Mein Körper gehört mir – auch online.', 'Ich unterscheide gute und schlechte Geheimnisse.', 'Ich weiß, wo ich Hilfe bekomme (116 111, BEE SECURE, SePAS).'],
  },

  // ================================================================ M4 · Fortpflanzung und Hilfe
  fortpflanzung: {
    thema: 'Fortpflanzung · Schwangerschaft · Beratung', titel: 'Wie ein Mensch entsteht', untertitel: 'Eizelle und Spermium, neun Monate Schwangerschaft, die Geburt: Du lernst sachlich, wie neues Leben entsteht – und wo Jugendliche vertraulich Fragen stellen können.',
    ziel: { de: 'Ich erkläre, wie ein Mensch entsteht, und kenne Stellen, die Jugendliche vertraulich beraten.', fr: 'J’explique comment un être humain se forme et je connais des services qui conseillent les jeunes en toute confidentialité.' },
    bild: ['aerztin:froh:erklaeren', 'noah:ruhig:sitzen'],
    start: {
      was: 'Fragen sammeln',
      aufgaben: [
        { art: 'fragen', auftrag: 'Schreibe anonym eine Frage zum Thema auf einen Zettel für die Fragebox. (Nur, wenn du willst.)', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Fragen – keine Lösung.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht; bei Fragen: Schulärztin, Planning Familial, 116 111)',
      titel: 'Neues Leben entsteht',
      absaetze: [
        'Ein Mensch entsteht aus zwei Zellen: einer **Eizelle** der Frau und einem **Spermium** (Samenzelle) des Mannes. Ab der Pubertät reift in den **Eierstöcken** etwa einmal im Monat eine Eizelle heran. In den **Hoden** werden ständig Spermien gebildet.',
        '### Befruchtung und Schwangerschaft',
        'Beim Geschlechtsverkehr können Spermien zur Eizelle gelangen. Verschmelzen Eizelle und Spermium, nennt man das **Befruchtung**. Die befruchtete Eizelle nistet sich in der **Gebärmutter** ein und wächst dort etwa **neun Monate** lang zu einem Baby heran. Über die **Nabelschnur** bekommt es Nahrung und Sauerstoff.',
        '### Die Geburt',
        'Am Ende der Schwangerschaft zieht sich die Gebärmutter zusammen (Wehen), und das Baby kommt durch die Scheide zur Welt. Manchmal ist ein **Kaiserschnitt** nötig: Das Baby wird dann durch einen Schnitt im Bauch geboren.',
        '### Fragen? Vertraulich beraten',
        'Beim **Planning Familial** beraten Fachleute auch Jugendliche – vertraulich, zu Körper, Liebe, Verhütung und Schwangerschaft. Weitere Stellen: die Schulärztin, der **SePAS**, das Kanner- a Jugendtelefon **116 111** (anonym, kostenlos) und bei Problemen im Netz **BEE SECURE 8002 1234**.',
      ],
      woerter: [['die Eizelle', 'l’ovule'], ['das Spermium', 'le spermatozoïde'], ['die Befruchtung', 'la fécondation'], ['die Gebärmutter', 'l’utérus'], ['die Schwangerschaft', 'la grossesse'], ['die Nabelschnur', 'le cordon ombilical'], ['die Geburt', 'la naissance'], ['vertraulich', 'confidentiel']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Bring die Schritte in die richtige Reihenfolge.', stufe: 1, teile: ['Eizelle und Spermium treffen sich.', 'Befruchtung: Die beiden Zellen verschmelzen.', 'Die befruchtete Eizelle nistet sich in der Gebärmutter ein.', 'Das Baby wächst etwa neun Monate.', 'Die Geburt.'] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Eine Schwangerschaft dauert etwa neun Monate.', true], ['Über die Nabelschnur bekommt das Baby Nahrung und Sauerstoff.', true], ['Beim Planning Familial werden nur Erwachsene beraten.', false], ['116 111 ist anonym und kostenlos.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Besuch in der Klasse', wo: 'Klassensaal · Besuch einer Beraterin', titel: 'Darf man das fragen?',
      situation: 'Eine Beraterin besucht die Klasse und beantwortet Fragen aus der Fragebox.',
      bild: ['aerztin:froh:erklaeren', 'noah:ruhig:sitzen'],
      sprecher: { Beraterin: 'w1', Lehrer: 'm1' },
      text: [
        ['Lehrer', 'Unsere erste Frage aus der Box: „Ist es peinlich, solche Fragen zu stellen?“'],
        ['Beraterin', 'Überhaupt nicht. Wir hören jeden Tag solche Fragen. Es gibt keine dummen Fragen – nur Fragen, die man sich nicht traut.'],
        ['Lehrer', 'Zweite Frage: „Erzählt ihr meinen Eltern, was ich frage?“'],
        ['Beraterin', 'Nein. Unsere Beratung ist vertraulich. Nur wenn jemand in großer Gefahr ist, suchen wir gemeinsam mit der Person nach Hilfe.'],
        ['Lehrer', 'Dritte Frage: „Woher weiß ich, ob eine Information im Internet stimmt?“'],
        ['Beraterin', 'Gute Frage. Im Netz steht viel Falsches. Seiten von Gesundheitsstellen, die Schulärztin oder eine Beratungsstelle sind verlässlicher als Videos von Unbekannten.'],
        ['Lehrer', 'Und wie erreicht man euch?'],
        ['Beraterin', 'Telefonisch oder direkt in einer Beratungsstelle. Und wer lieber anonym anruft: 116 111.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „vertraulich“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Was ich sage, wird nicht weitererzählt.', 'Alle dürfen es wissen.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was antwortet die Beraterin?', stufe: 1, kopf: ['Frage', 'Antwort'], breiten: [45, 55], zeilen: [['Ist das peinlich?', '[Nein, es gibt keine dummen Fragen.]'], ['Erfahren meine Eltern davon?', '[Nein, die Beratung ist vertraulich.]'], ['Stimmt das im Internet?', '[Nicht immer; Gesundheitsstellen, Schulärztin, Beratung sind verlässlicher.]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wo bekommen Jugendliche verlässliche Antworten? Sammelt in der Klasse und ordnet: persönlich – Telefon – Internet.', stufe: 2, karten: [{ titel: 'Ideen', text: ['Schulärztin, SePAS', 'Planning Familial', '116 111', 'Seiten von Gesundheitsstellen'] }] }],
    },
    regel: { reihen: [[
      { titel: 'So entsteht ein Mensch', punkte: ['**Eizelle** + **Spermium**', '**Befruchtung**', 'Wachstum in der **Gebärmutter**', 'etwa **neun Monate**', '**Geburt**'] },
      { titel: 'Vertraulich fragen', punkte: ['**Planning Familial**', 'Schulärztin, **SePAS**', '**116 111** – anonym', 'Infos im Netz **prüfen**'] },
    ]] },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Sätze.', stufe: 2, woerter: ['Eierstöcken', 'Befruchtung', 'Gebärmutter', 'Nabelschnur', 'neun'], saetze: ['Eizellen reifen in den [Eierstöcken] heran.', 'Verschmelzen Eizelle und Spermium, heißt das [Befruchtung].', 'Das Baby wächst in der [Gebärmutter].', 'Über die [Nabelschnur] bekommt es Nahrung.', 'Eine Schwangerschaft dauert etwa [neun] Monate.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Eine Freundin oder ein Freund hat eine Frage zum Körper, traut sich aber nicht zu fragen. Schreibe eine kurze Nachricht: Wo kann man verlässlich und vertraulich fragen?', stufe: 2,
        anfaenge: ['Hey,', 'du musst dich nicht schämen, weil …', 'Du kannst …', 'Wenn du willst, …'], zeilen: 6,
        beispiel: 'Hey, du musst dich nicht schämen, weil viele dieselben Fragen haben. Du kannst die Schulärztin fragen oder beim Planning Familial anrufen. Dort ist alles vertraulich. Wenn du lieber anonym fragen willst, ruf 116 111 an. Wenn du willst, komme ich mit.' },
    ],
    check: ['Ich erkläre, wie ein Mensch entsteht.', 'Ich kenne die Wörter Befruchtung, Schwangerschaft und Geburt.', 'Ich kenne Stellen, die Jugendliche vertraulich beraten.'],
  },

  // ================================================================ M7 · Einverständnis und Schutz
  schutz: {
    thema: 'Einverständnis · Verhütung · Schutz vor Infektionen', titel: 'Verantwortung füreinander', untertitel: 'Nur Ja heißt Ja – und wer Sex hat, schützt sich und die andere Person. Du lernst sachlich, wie Verhütung funktioniert, wie man sich vor Infektionen schützt und wo man Rat bekommt.',
    ziel: { de: 'Ich erkläre Einverständnis, nenne Verhütungsmittel und weiß, wie man sich vor sexuell übertragbaren Infektionen schützt.', fr: 'J’explique le consentement, je cite des moyens de contraception et je sais comment se protéger des infections sexuellement transmissibles.' },
    bild: ['aerztin:froh:erklaeren', 'lea:ruhig:stehen'],
    start: {
      was: 'Was stimmt?',
      aufgaben: [
        { art: 'rf', auftrag: 'Was glaubst du – richtig oder falsch? (Am Ende der Lektion prüfst du nach.)', stufe: 1, saetze: [['Wer einmal Ja gesagt hat, darf nicht mehr Nein sagen.', false], ['Das Kondom schützt vor Schwangerschaft und vor vielen Infektionen.', true], ['Man sieht immer, ob jemand eine Infektion hat.', false]] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht). Beratung: Planning Familial, Schulärztin, 116 111',
      titel: 'Sich und andere schützen',
      absaetze: [
        '**Einverständnis** heißt: Beide wollen es – freiwillig, klar und jedes Mal neu. Wer schweigt, unsicher ist, schläft oder betrunken ist, hat **nicht** Ja gesagt. Ein Ja darf man jederzeit zurücknehmen. Niemand muss etwas tun, nur weil andere es angeblich schon tun. Viele Jugendliche warten – das ist völlig in Ordnung.',
        '### Verhütung',
        '**Verhütung** heißt: eine Schwangerschaft verhindern. Das **Kondom** wird vor dem Sex über den Penis gezogen. Es ist das einzige Verhütungsmittel, das auch vor vielen Infektionen schützt. Die **Pille** ist ein Medikament mit Hormonen, das eine Ärztin verschreibt; sie schützt nicht vor Infektionen. Es gibt weitere Methoden – eine Ärztin oder das Planning Familial berät dazu.',
        '### Sexuell übertragbare Infektionen',
        'Manche Krankheitserreger werden beim Sex übertragen, zum Beispiel **HIV**, **Chlamydien** oder **HPV**. Oft merkt man lange nichts. Schutz: **Kondom** benutzen und sich bei Fragen testen lassen. Gegen HPV gibt es eine **Impfung**, die für Jugendliche empfohlen wird.',
        '### Wer hilft?',
        'Das **Planning Familial** berät Jugendliche vertraulich. Auch die Schulärztin, der SePAS und anonym das Telefon **116 111** helfen. Wer zu etwas gedrängt oder gezwungen wurde, ist **nicht schuld** und kann sich Hilfe holen – im Notfall bei **113** oder **112**.',
      ],
      woerter: [['das Einverständnis', 'le consentement'], ['freiwillig', 'volontaire'], ['die Verhütung', 'la contraception'], ['das Kondom', 'le préservatif'], ['die Infektion', 'l’infection'], ['die Impfung', 'le vaccin'], ['sich testen lassen', 'se faire dépister']],
      aufgaben: [
        { art: 'mc', auftrag: 'Ist das ein Ja? Kreuze an.', stufe: 1, fragen: [{ f: 'Die andere Person sagt nichts und schaut weg.', o: ['Ja', 'kein Ja'], r: 1 }, { f: 'Die andere Person sagt: „Ja, ich will das auch.“', o: ['Ja', 'kein Ja'], r: 0 }, { f: 'Die andere Person hat viel getrunken.', o: ['Ja', 'kein Ja'], r: 1 }] },
        { art: 'tabelle', auftrag: 'Was schützt wovor? Trag ✓ oder – ein.', stufe: 2, kopf: ['', 'vor Schwangerschaft', 'vor Infektionen'], breiten: [40, 30, 30], zeilen: [['Kondom', '[✓]', '[✓]'], ['Pille', '[✓]', '[–]'], ['HPV-Impfung', '[–]', '[✓ (vor HPV)]']] },
      ],
    },
    hoeren: {
      was: 'Ein Podcast für Jugendliche', wo: 'Podcast · „Frag ruhig“', titel: 'Woher weiß ich, dass die andere Person will?',
      situation: 'Eine Ärztin beantwortet im Podcast Fragen von Jugendlichen.',
      bild: ['aerztin:froh:erklaeren', 'lea:ruhig:handy'],
      sprecher: { Moderator: 'm2', Ärztin: 'w1' },
      text: [
        ['Moderator', 'Erste Frage: „Woher weiß ich, dass die andere Person wirklich will?“'],
        ['Ärztin', 'Fragen! Ganz einfach: „Willst du das?“ Und auf die Antwort achten – auch auf den Körper. Wer zögert oder schweigt, hat nicht Ja gesagt.'],
        ['Moderator', 'Zweite Frage: „Alle in meiner Klasse hatten angeblich schon Sex. Bin ich komisch?“'],
        ['Ärztin', 'Nein. Viele erzählen mehr, als stimmt. Und es gibt kein „zu spät“. Du entscheidest, wann du bereit bist.'],
        ['Moderator', 'Dritte Frage: „Reicht die Pille als Schutz?“'],
        ['Ärztin', 'Vor einer Schwangerschaft schützt sie gut, wenn man sie richtig nimmt. Vor Infektionen schützt nur das Kondom. Darum: am besten beides.'],
        ['Moderator', 'Und wo kann man sich beraten lassen?'],
        ['Ärztin', 'Beim Planning Familial, bei einer Ärztin oder anonym bei 116 111. Alles vertraulich.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Podcast? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Sendung zum Anhören im Internet', 'ein Film im Kino'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was rät die Ärztin?', stufe: 1, kopf: ['Frage', 'Rat'], breiten: [45, 55], zeilen: [['Will die andere Person?', '[nachfragen; Zögern oder Schweigen ist kein Ja]'], ['Bin ich komisch, wenn ich warte?', '[nein; viele übertreiben; ich entscheide selbst]'], ['Reicht die Pille?', '[nur gegen Schwangerschaft; gegen Infektionen nur das Kondom]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Sammelt in der Klasse anonym Mythen, die man oft hört. Prüft gemeinsam: Was stimmt, was nicht? Woher wisst ihr es?', stufe: 3, karten: [{ titel: 'Verlässliche Quellen', text: ['Schulärztin', 'Planning Familial', 'Seiten von Gesundheitsstellen', 'nicht: Gerüchte, Videos von Unbekannten'] }] }],
    },
    regel: { reihen: [[
      { titel: 'Einverständnis', punkte: ['**freiwillig**, klar, jedes Mal neu', 'Schweigen ist **kein Ja**', 'ein Ja darf man **zurücknehmen**', 'warten ist **in Ordnung**'] },
      { titel: 'Schutz', punkte: ['**Kondom**: Schwangerschaft + Infektionen', '**Pille**: nur Schwangerschaft', '**HPV-Impfung**', 'Beratung: **Planning Familial**, 116 111'] },
    ]] },
    ueben: [
      { art: 'meinungslinie', auftrag: 'Was denkst du? (Du musst deine Antworten nicht zeigen.)', stufe: 2, aussagen: ['Über Verhütung sollten beide Partner gemeinsam sprechen.', 'In Filmen und im Netz wird oft ein falsches Bild von Sex gezeigt.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Antwort für den Podcast „Frag ruhig“: Jemand fragt, ob man Nein sagen darf, wenn man vorher Ja gesagt hat.', stufe: 2,
        anfaenge: ['Danke für deine Frage.', 'Ja, du darfst …, weil …', 'Wichtig ist …', 'Wenn du Hilfe brauchst, …'], zeilen: 7,
        beispiel: 'Danke für deine Frage. Ja, du darfst jederzeit Nein sagen, weil Einverständnis freiwillig ist und jedes Mal neu gilt. Wichtig ist, dass beide aufeinander achten und nachfragen. Wenn du Hilfe brauchst, kannst du anonym 116 111 anrufen oder zum Planning Familial gehen.' },
    ],
    check: ['Ich erkläre, was Einverständnis bedeutet.', 'Ich weiß, wovor Kondom, Pille und HPV-Impfung schützen.', 'Ich kenne vertrauliche Beratungsstellen.'],
  },
}
