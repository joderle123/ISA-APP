// REAL TALK #05 · GRENZEN – Modul 5 (Kommunikation & Grenzen, Einheiten 20–23).
import type { Heft } from '../typen'

const d: Heft = {
  id: 'm5', nr: '05', datei: 'Real-Talk-05-Grenzen',
  thema: 'Grenzen', headline: 'Sag, was ist.', farbe: '#FF5A36', stand: 'November 2026',
  cover: {
    bild: 'peep:yusuf:neutral:stehen-verschraenkt', sticker: 'Ohne Predigt',
    zeilen: ['Warum „ok.“ nie einfach ok ist', 'Streiten ohne Krieg: der Satz mit Ich', 'Wo bei dir Schluss ist – und bei den anderen', 'Nein sagen. Ohne Lächeln. Ohne Entschuldigung.'],
  },
  ansage: {
    text: [
      'Niemand hier will dir erzählen, wie du zu leben hast. Dafür gibt es genug andere.',
      'In diesem Heft geht es um zwei Dinge, die fast jeden Ärger größer oder kleiner machen: **wie du etwas sagst** – und **wo bei dir Schluss ist**. Wer beides draufhat, muss seltener brüllen, zuschlagen oder abhauen. Und bekommt öfter, was er will.',
      'Die Szenen im Heft sind erfunden. Aber so oder so ähnlich ist alles schon passiert. Vielleicht erkennst du jemanden. Vielleicht dich.',
    ],
    zitat: 'Kein Kinderkram. ==Kein Zeigefinger.==',
    so: [['Szene', 'Eine kurze Geschichte. Lies sie und sag, was du siehst.'], ['Fakten', 'Drei Dinge, die dahinterstecken. Mehr nicht.'], ['Mythos / Real', 'Was alle sagen – und was stimmt.'], ['Dein Move', 'Jetzt du: testen, entscheiden, eine Line schreiben.']],
    regeln: [
      '**Du schreibst nur, was du willst.** Niemand sammelt das Heft ein. Niemand liest mit.',
      '**Stopp heißt Stopp.** In jeder Übung. Für jeden.',
      '**Lachen ja, auslachen nein.** Was hier gesagt wird, bleibt hier.',
    ],
  },
  cast: [
    { bild: 'peep:yusuf:neutral', name: 'Yusuf, 16', x: 'Zweite Verwarnung im Betrieb. Wird laut, bevor er nachdenkt.' },
    { bild: 'peep:jana:froh', name: 'Jana, 15', x: 'Wohngruppe seit dem Sommer. Redet viel, damit keiner fragt.' },
    { bild: 'peep:tom:muede', name: 'Tom, 14', x: 'Dritte Schule in zwei Jahren. Antwortet am liebsten mit „ok.“' },
    { bild: 'peep:chloe:verlegen', name: 'Chloé, 16', x: 'War im Frühling ein paar Wochen in der Klinik. Sagt Ja, wenn sie Nein meint.' },
  ],
  warm: {
    titel: 'Soundcheck', text: 'Zwei schnelle Fragen. Kein Richtig, kein Falsch. Kreise ein.',
    fragen: [
      { f: 'Wenn mich etwas stört, dann …', kreis: ['sage ich es direkt', 'schreibe ich es', 'sieht man es mir an', 'schlucke ich es runter', 'knallt es irgendwann'] },
      { f: 'Nein sagen fällt mir am schwersten bei …', kreis: ['Freunden', 'Familie', 'Erwachsenen', 'Fremden', 'niemandem'] },
    ],
  },
  tracks: [
    {
      nr: 20, titel: 'Dein Körper redet mit', unter: 'Worte, Stimme, Körper – und wem man am Ende glaubt',
      kurz: 'Warum „Alles gut“ selten alles gut heißt.',
      szene: {
        bild: 'peep:tom:muede', name: 'Tom, 14',
        text: 'Der Erzieher fragt: „Alles klar bei dir?“ Tom sagt: „Ja.“ Kapuze auf, Blick am Boden, Kiefer fest. Der Erzieher nickt und geht weiter. Am Abend fliegt ein Stuhl. Alle sagen: „Aus dem Nichts.“ War es nicht. Tom hat den ganzen Tag gesendet. Nur nicht mit Worten.',
        frage: 'Was hat Toms Körper gesagt?',
      },
      fakten: [
        { t: 'Drei Kanäle', x: 'Du sendest immer dreifach: **Worte**, **Stimme**, **Körper**. Auch wenn du nur „passt schon“ sagst.' },
        { t: 'Der Körper gewinnt', x: 'Passen die drei nicht zusammen, glaubt man dem Körper. Fast immer. Fast jeder.' },
        { t: 'Chat = ein Kanal', x: 'Im Chat fehlen Stimme und Körper. Der andere füllt die Lücke – mit **seiner** Laune.' },
      ],
      mythen: [
        ['Wenn ich nichts sage, sage ich nichts.', 'Schweigen sendet auch. Der andere muss nur raten, was.'],
        ['„ok.“ heißt ok.', 'Kann heißen: passt. Oder: bin sauer. Oder: keine Zeit.'],
        ['Verschränkte Arme heißen: aggressiv.', 'Oder kalt. Oder unsicher. Ein Signal allein beweist nichts.'],
      ],
      merk: 'Wenn Worte und Körper streiten, ==gewinnt der Körper.==',
      moveUnter: 'Lesen lernen, was keiner sagt',
      moves: [
        {
          titel: 'Wem glaubst du?', wie: 'allein, dann zu zweit', zeit: '5 Min.',
          kontext: 'Chloé sagt: „Mir geht’s super.“ Leise Stimme. Schultern unten. Blick am Handy.',
          fragen: [
            { f: 'Wie geht es ihr wirklich? Kreise ein:', kreis: ['super', 'okay', 'traurig', 'müde', 'wütend', 'leer'] },
            { f: 'Was sagst du zu ihr – ohne dass sie dichtmacht?', linien: 1 },
          ],
        },
        {
          titel: 'Zwei Buchstaben', wie: 'allein, dann vergleichen', zeit: '6 Min.',
          kontext: 'Du schreibst: „Kommst du Samstag?“ Die Antwort: **ok.** Mit Punkt.',
          fragen: [
            { f: 'Was heißt das?', kreuz: ['passt', 'ist sauer', 'hat keine Zeit', 'keine Ahnung'] },
            { f: 'Du bist unsicher. Jeder Weg hat einen Preis:', preis: { kopf: ['kostet mich', 'bringt mir'], optionen: ['nachfragen', '„ok.“ zurückschreiben', 'nichts tun'] } },
          ],
        },
      ],
      challenge: { titel: 'Ein Satz, sechs Stimmungen', wie: 'zu zweit · Würfel', x: 'Sag „Klar, mach ruhig.“ – so, wie der Würfel es will: **1** fröhlich · **2** genervt · **3** traurig · **4** ängstlich · **5** drohend · **6** verliebt. Dein Gegenüber rät die Zahl.' },
      line: { titel: 'Alles klar?', x: 'Die ehrlichste Antwort, die du heute geben könntest. Höchstens fünf Wörter.', linien: 1 },
      woche: 'Schick einmal eine **Sprachnachricht** statt Text. Oder frag bei einem „ok.“ nach: Wie meinst du das?',
      leitung: {
        einsatz: 'Szene nach dem Drei-Runden-Spiel lesen. Move A statt des Tests beim Stimmungs-Würfel; die Challenge ist der Stimmungs-Würfel. Move B statt „Chat-Check auf dem Blatt“.',
        loesungen: [
          'Szene: Kapuze, Blick am Boden, fester Kiefer – Rückzug und hohe Anspannung. „Aus dem Nichts“ gibt es selten.',
          'Move A: meist „traurig“, „müde“ oder „leer“. Gute Sätze fragen, ohne zu drängen: „Du klingst nicht so. Ich bin da, wenn du reden willst.“',
          'Move B: Alle Deutungen kommen vor. Die Rechnung zeigt: Nachfragen kostet kurz Überwindung, spart aber Stunden Grübeln.',
        ],
        impulse: ['Wann hat jemand an eurem Körper gemerkt, was los ist – bevor ihr etwas gesagt habt?', 'Welche Nachricht habt ihr schon einmal völlig falsch verstanden? Ohne Namen.'],
        material: '1 Würfel je Paar', blaetter: 'Gefühlsrad, Drei-Runden-Karten, Skills-Pass. „Mehr als Worte“ kann entfallen.',
      },
    },
    {
      nr: 21, titel: 'Streiten ohne Krieg', unter: 'Sagen, was stört – so, dass der andere nicht sofort zurückschießt',
      kurz: 'Der Satz mit Ich. Und warum Zuhören keine Schwäche ist.',
      szene: {
        bild: 'peep:yusuf:wuetend', name: 'Yusuf, 16',
        text: 'Yusuf kommt zu spät in den Betrieb. Der Meister, vor allen: „Schon wieder.“ Yusuf: „Sie haben mich doch eh auf dem Kieker!“ Der Meister: „So redest du nicht mit mir.“ Zwei Minuten später steht Yusuf draußen. Dabei wollte er nur sagen: Der Bus ist ausgefallen. Und dass es ihm peinlich ist.',
        frage: 'An welchem Satz ist es gekippt?',
      },
      fakten: [
        { t: 'Du-Satz = Angriff', x: '„Du bist …“, „Immer machst du …“ Der andere hört nur: **Angriff**. Und schießt zurück.' },
        { t: 'Ich-Satz = Info', x: '**Ich bin** genervt, **wenn** … **Ich will,** dass … Du redest über dich. Dagegen kann keiner argumentieren.' },
        { t: 'Zuhören = Macht', x: 'Wer zuhört und zusammenfasst, nimmt Tempo raus: „Du bist also sauer, weil …?“' },
      ],
      mythen: [
        ['Ich-Sätze sind was für Weichgespülte.', 'Braucht mehr Mut als Brüllen. Du zeigst, was wirklich los ist.'],
        ['Wer zuhört, gibt dem anderen recht.', 'Zuhören heißt verstehen. Nicht zustimmen.'],
        ['Wenn ich es richtig sage, kriege ich, was ich will.', 'Der andere darf trotzdem Nein sagen. Aber er hört dich.'],
      ],
      merk: 'Sag, was mit dir ist. ==Nicht, was der andere ist.==',
      moveUnter: 'Aus Vorwurf wird Ansage',
      moves: [
        {
          titel: 'Finde den Angriff', wie: 'allein', zeit: '5 Min.',
          fragen: [
            { f: 'Welche Sätze sind **echte** Ich-Sätze? Kreuze an:', unter: true, kreuz: ['Ich bin genervt, wenn ich unterbrochen werde. Lass mich ausreden.', 'Ich finde, du bist ein Egoist.', 'Ich ärgere mich, wenn mein Ladekabel weg ist. Frag vorher.', 'Ich fühle mich, als wärst du unfair.'] },
            { f: 'Welche Wörter machen jeden Satz zum Angriff? Kreise ein:', kreis: ['immer', 'nie', 'bitte', 'typisch', 'ich will', 'schon wieder'] },
          ],
        },
        {
          titel: 'Yusufs zweiter Versuch', wie: 'zu zweit', zeit: '8 Min.',
          kontext: 'Gleiche Szene. Der Meister sagt: „Schon wieder.“ Bau Yusufs Antwort neu – in drei Teilen:',
          fragen: [
            { f: 'Yusuf sagt:', satz: ['Ich bin', 'weil', 'Ich will, dass'] },
            { f: 'Lies es vor. Dein Partner ist der Meister. Was passiert jetzt eher?', kreis: ['ein Gespräch', 'eine Ansage, aber fair', 'Rauswurf'] },
          ],
        },
      ],
      challenge: { titel: 'Vorwurf-Battle', wie: 'zwei Teams', x: 'Team A wirft einen Vorwurf rüber – so genervt wie möglich. Team B hat 30 Sekunden und kontert mit einem Ich-Satz. Steckt noch ein Angriff drin? **Kein Punkt.**' },
      line: { titel: 'Der Satz, der fehlt', x: 'Ein Satz, den du jemandem schon lange sagen willst – als Ich-Satz. Niemand liest ihn.', linien: 2 },
      woche: 'Ein Ich-Satz im echten Leben. Zwei Teile reichen: **was los ist** und **was du willst**.',
      leitung: {
        einsatz: 'Szene als Einstieg vor oder nach „Schritt vor, Schritt zurück“. Move A und B im Schritt „Ich-Botschaften würfeln“. Die Challenge ist das Umwandler-Spiel. Die Line bleibt privat.',
        loesungen: [
          'Szene: Es kippt bei „Sie haben mich eh auf dem Kieker“ – ein Du-Satz als Gegenangriff. Auch „Schon wieder“ vor allen ist ein Angriff: Beide Seiten haben Anteil.',
          'Move A: Satz 1 und 3. Satz 2 ist ein Urteil, Satz 4 ein versteckter Vorwurf. Angriffswörter: immer, nie, typisch, schon wieder.',
          'Move B: z. B. „Ich bin gestresst, weil der Bus ausgefallen ist. Ich will, dass Sie wissen: Es war keine Absicht.“',
        ],
        impulse: ['Wann habt ihr zuletzt zurückgeschossen – und was wolltet ihr eigentlich sagen?', 'Was ist schwerer: den Satz bauen oder ihn laut sagen?'],
        material: '–', blaetter: 'Gefühlsrad, Vorwurf-Karten, „Richtig zuhören“, Skills-Pass.',
      },
    },
    {
      nr: 22, titel: 'Bis hierhin', unter: 'Grenzen sieht man nicht. Man spürt sie – wenn man hinhört',
      kurz: 'Wo bei dir Schluss ist. Und woran du es merkst.',
      szene: {
        bild: 'peep:chloe:verlegen', name: 'Chloé, 16',
        text: 'Neue Gruppe. Jemand legt Chloé den Arm um die Schulter. Nett gemeint. Chloé lacht. Ihr Bauch zieht sich zusammen. Sie sagt nichts – sie ist ja neu. Am Abend ist sie völlig fertig und weiß nicht, warum.',
        frage: 'Woran hätte Chloé ihre Grenze merken können?',
      },
      fakten: [
        { t: 'Drei Sorten', x: '**Körper:** mein Raum, meine Sachen. **Inneres:** meine Gefühle, mein Privates. **Digital:** meine Fotos, meine Chats, mein Standort.' },
        { t: 'Der Körper meldet zuerst', x: 'Knoten im Bauch. Kiefer fest. Ein Schritt zurück. Oder: **Lachen, obwohl nichts lustig ist.**' },
        { t: 'Grenzen wandern', x: 'Je nach Person, Tag und Stimmung. Was gestern okay war, kann heute zu viel sein.' },
      ],
      mythen: [
        ['Wer Grenzen hat, ist empfindlich.', 'Jeder hat welche. Wer oft übergangen wurde, spürt sie nur später. Das lässt sich wieder lernen.'],
        ['War doch nett gemeint – dann darf es nicht stören.', 'Gemeint und angekommen sind zwei Dinge. Dein Bauch entscheidet.'],
        ['Meine Grenzen zählen. Deine sind dein Problem.', 'Gilt in beide Richtungen. Online wie offline.'],
      ],
      merk: 'Dein Bauch weiß es ==vor deinem Kopf.==',
      moveUnter: 'Wo ist bei dir Schluss?',
      moves: [
        {
          titel: 'Welche Grenze ist das?', wie: 'zu zweit', zeit: '6 Min.',
          fragen: [
            { f: 'Kreuze an. Manchmal passen zwei – dann sag, warum.', raster: { spalten: ['Körper', 'Inneres', 'Digital'], zeilen: ['Jemand nimmt dein Ladekabel, ohne zu fragen.', 'Jemand postet ein Foto von dir.', 'Jemand fragt vor allen, warum du in der Klinik warst.', 'Jemand setzt sich im leeren Bus direkt neben dich.', 'Jemand liest deine Chats mit.', 'Jemand lacht über das, was dir wichtig ist.'] } },
            { f: 'Unterstreiche, was **dich** am meisten stören würde.' },
          ],
        },
        {
          titel: 'Signale lesen', wie: 'allein', zeit: '5 Min.',
          fragen: [
            { f: 'Woran merkt **dein** Körper „zu viel“? Kreise ein:', kreis: ['Knoten im Bauch', 'Herz klopft', 'Kiefer fest', 'Schritt zurück', 'werde still', 'lache komisch', 'werde laut', 'will weg'] },
            { f: 'Und woran merkst du es bei **anderen**?', kreis: ['wird still', 'weicht zurück', 'lacht komisch', 'schaut weg', 'antwortet kurz', 'wird laut'] },
          ],
        },
      ],
      challenge: { titel: 'Stopp-Abstand', wie: 'zwei Reihen', x: 'Eine Reihe geht langsam auf die andere zu. Wer steht, sagt Stopp, sobald es zu nah wird. Wer Stopp hört, bleibt stehen. **Sofort.** Danach: Abstände vergleichen.' },
      line: { titel: 'Dein Türschild', x: 'Was steht an deiner Tür? Schreib oder zeichne es.', feld: 19 },
      woche: 'Achte einmal darauf, wann dein Körper „zu viel“ meldet. **Nur merken.** Mehr nicht.',
      leitung: {
        einsatz: 'Szene nach der Karten-Staffel. Move A sichert die Staffel, Move B statt oder neben dem Blatt „Meine Grenzen“ (privat). Die Challenge ist „Zwei Linien“.',
        loesungen: [
          'Szene: am Bauch, am Lachen ohne Grund, an der Erschöpfung danach. Niemand hat Schuld – aber Chloé darf beim nächsten Mal etwas sagen.',
          'Move A: Ladekabel – Körper (Sachen) · Foto – Digital · Klinik-Frage – Inneres · Bus – Körper (Raum) · Chats – Digital, auch Inneres · Auslachen – Inneres.',
          'Move B: offen und privat. Wichtig ist der zweite Teil: die Grenzen anderer lesen lernen.',
        ],
        impulse: ['Was hat euch überrascht, als die Abstände so verschieden waren?', 'Wann merkt man erst hinterher, dass etwas zu viel war?'],
        material: 'Klebeband für zwei Linien', blaetter: 'Gefühlsrad, Grenz-Karten, Signal-Karten, „Mein sicherer Ort“, Skills-Pass.',
      },
    },
    {
      nr: 23, titel: 'Stopp.', unter: 'Nein sagen, sodass es ankommt. Und Nein hören, ohne auszurasten',
      kurz: 'Ein Nein, das ankommt. Und was du tust, wenn du eins hörst.',
      szene: {
        bild: 'peep:jana:neutral', name: 'Jana, 15',
        text: 'Ein Typ aus der Parallelklasse stellt ein Foto von Jana in die Gruppe. Jana schreibt: „haha lösch das mal bitte“. Er löscht es nicht. Am nächsten Tag steht sie vor ihm. Gerade. Kein Lächeln. „Lösch das Foto. Jetzt.“ Er löscht es. Gleiche Bitte. Anderes Ergebnis.',
        frage: 'Was war beim zweiten Mal anders?',
      },
      fakten: [
        { t: 'Körper', x: 'Gerade stehen. Beide Füße am Boden. **Blick zur Person.** Kein Lächeln.' },
        { t: 'Stimme', x: 'Ruhig und fest. Nicht fragend, nicht lachend. **Laut heißt nicht klar.**' },
        { t: 'Worte', x: 'Kurz. „Stopp.“ „Nein.“ „Lass das.“ **Keine Entschuldigung.** Keine Begründung.' },
      ],
      mythen: [
        ['Ein gutes Stopp ist laut.', 'Ein gutes Stopp ist klar. Brüllen klingt nach Kontrollverlust.'],
        ['Wenn ich erstarre, bin ich selbst schuld.', 'Erstarren ist ein Schutzprogramm. Schuld hat, wer die Grenze überschreitet.'],
        ['Ein Nein muss man begründen.', 'Muss man nicht. Und wenn du eins hörst: Okay. Ohne Diskussion.'],
      ],
      merk: '==Nein== ist ein ganzer Satz.',
      moveUnter: 'Kurz. Klar. Ohne Lächeln.',
      moves: [
        {
          titel: 'Die Jury', wie: 'alle zusammen', zeit: '5 Min.',
          kontext: 'Deine Leitung zeigt drei Stopps. Gib Punkte von **0 bis 10**: Wie ernst nimmst du es?',
          fragen: [
            { f: 'Deine Wertung:', zahl: ['**Stopp 1**\nleise, mit Lächeln', '**Stopp 2**\nlaut, mit Grinsen', '**Stopp 3**\nruhig, klar, mit Hand'] },
            { f: 'Was hat den Unterschied gemacht? Kreise ein:', kreis: ['Worte', 'Stimme', 'Gesicht', 'Hand', 'Haltung'] },
          ],
        },
        {
          titel: 'Du hörst ein Nein', wie: 'allein, dann zu zweit', zeit: '6 Min.',
          kontext: 'Du willst etwas. Der andere sagt: „Nein. Lass das.“ In dir kocht es.',
          fragen: [{ f: 'Drei Wege. Mach die Rechnung auf:', preis: { kopf: ['kostet mich', 'bringt mir'], optionen: ['„Okay.“ sagen und gehen', 'diskutieren', 'weitermachen'] } }],
        },
      ],
      challenge: { titel: 'Der Garten', wie: 'alle · Seil', x: 'Leg mit einem Seil einen Kreis um dich: dein Garten. Die anderen wollen rein – **nur mit Worten**, auch mit netten. Du hältst die Grenze. Wer Stopp hört, bleibt stehen.' },
      line: { titel: 'Dein Stopp-Satz', x: 'Kurz und deins. Schreib ihn so, wie er aussehen soll: als Tag, als Tattoo, als Schild.', feld: 24 },
      woche: 'Sag einmal klar **Nein**. Ohne Entschuldigung. Und hörst du eins: **Okay.**',
      hilfe: true,
      leitung: {
        einsatz: 'Move A läuft während der Stopp-Jury mit. Szene und Fakten danach. Die Line ersetzt „Mein Stopp-Satz“ auf dem Blatt; vorgelesen wird erst in der Abschlussrunde. Move B nach der Garten-Übung (Challenge): die andere Seite der Grenze.',
        loesungen: [
          'Szene: Beim ersten Mal lachen die Worte mit („haha“, „mal bitte“). Beim zweiten Mal sagen Körper, Stimme und Worte dasselbe.',
          'Move A: Stopp 3 bekommt fast immer die meisten Punkte. Die Worte waren dreimal gleich.',
          'Move B: Kein Weg ist umsonst. „Okay“ kostet Stolz und bringt Ruhe und Respekt. Weitermachen bringt kurz, was man will, und kostet Vertrauen – manchmal viel mehr. Die Rechnung machen die Jugendlichen selbst.',
        ],
        impulse: ['Was hat euch gestoppt – die Worte, die Stimme oder der Blick?', 'Was ist schwerer: Nein sagen oder ein Nein schlucken?'],
        material: '1 Würfel je Kleingruppe, Seil oder Kreide', blaetter: 'Gefühlsrad, „Mein Stopp“ (Würfel-Liste), Grenz-Karten, Skills-Pass.',
      },
    },
  ],
  hot: {
    unter: 'Sechs Sätze zum Streiten – nach Regeln',
    regeln: 'Mach auf jeder Linie ein Kreuz: Wie sehr stimmt der Satz für dich? Dann stellt euch im Raum auf – eine Wand heißt „nie“, die andere „immer“. Wer mag, sagt einen Satz dazu. **Niemand muss sich rechtfertigen. Platz wechseln ist erlaubt.**',
    takes: ['Wer zuerst laut wird, hat verloren.', 'Manche Leute verstehen nur Ansagen.', 'Hilfe holen ist dasselbe wie petzen.', 'Online darf man mehr als im echten Leben.', 'Ein echter Freund sagt nie Nein.', 'Respekt bekommt nur, wer Angst macht.'],
  },
  quiz: {
    unter: 'Acht Fragen. Acht Buchstaben. Ein Wort.', wort: 'KLARTEXT',
    fragen: [
      { f: 'Worte und Körper passen nicht zusammen. Wem glaubt man?', o: ['dem Körper', 'den Worten', 'keinem'], r: 0 },
      { f: 'Was fehlt in einer Textnachricht?', o: ['die Worte', 'Stimme und Körper', 'der Absender'], r: 1 },
      { f: 'Womit beginnt ein Ich-Satz?', o: ['mit „Du bist …“', 'mit „immer“', 'mit dem, was bei mir los ist'], r: 2 },
      { f: '„Ich finde, du bist ein Egoist.“ Was ist das?', o: ['ein Urteil', 'ein Wunsch', 'ein Gefühl'], r: 0 },
      { f: 'Was gehört zum Zuhören?', o: ['sofort Tipps geben', 'zusammenfassen', 'von sich erzählen'], r: 1 },
      { f: 'Jemand postet ein Foto von dir, ohne zu fragen. Welche Grenze?', o: ['keine', 'eine digitale', 'eine Landesgrenze'], r: 1 },
      { f: 'Grenzen sind bei Menschen …', o: ['überall gleich', 'egal', 'bei jedem anders'], r: 2 },
      { f: 'Was macht ein Stopp schwach?', o: ['ein Lächeln dabei', 'eine feste Stimme', 'der Blick zur Person'], r: 0 },
    ],
  },
  karten: [
    { titel: 'Ich-Satz', icon: 'message-2', zeilen: ['**Ich bin** … (was bei mir los ist)', '**wenn / weil** … (was passiert ist – ohne „immer“ und „nie“)', '**Ich will, dass** … (klein und machbar)'] },
    { titel: 'Stopp', icon: 'hand-stop', zeilen: ['Gerade stehen. Blick zur Person. Kein Lächeln.', 'Ruhig und fest. Kurz. Keine Entschuldigung.', 'Wiederholen. Gleicher Satz, gleiche Stimme.'], eigen: 'Mein Satz:' },
    { titel: 'Chat-Check', icon: 'device-mobile-message', zeilen: ['Anspannung über 70? **Nicht senden.**', 'Lies es so, als wärst du genervt. Klingt es noch gut?', 'Wichtig oder Streit? Sprachnachricht oder persönlich.', 'Unklar? „Wie meinst du das?“'] },
    { titel: 'Zuhören', icon: 'ear', zeilen: ['Zuwenden. Handy weg.', 'Ausreden lassen. Keine Tipps, um die keiner gebeten hat.', 'Nachfragen: „Wie war das genau?“', 'Zusammenfassen: „Du bist also …, weil …?“'] },
    { titel: 'Zu viel', icon: 'activity-heartbeat', zeilen: ['Dein Körper meldet es zuerst: Bauch, Kiefer, Schritt zurück.', 'Dann: lang ausatmen. Abstand nehmen.', 'Sagen, was ist: „Mir ist das gerade zu viel.“'], eigen: 'Mein Signal:' },
    { titel: 'Wenn Stopp nicht reicht', icon: 'lifebuoy', zeilen: ['Weggehen ist erlaubt. Hilfe holen ist kein Petzen.', 'Online: Screenshot, blockieren, melden.', 'Kanner-Jugendtelefon **116 111** · Notruf **112**'], eigen: 'Mein Mensch:' },
  ],
  abspann: {
    posten: ['Körper lesen', 'Ich-Satz bauen', 'Grenze merken', 'Stopp sagen', 'Stopp annehmen'],
    saetze: ['Das nehme ich mit:', 'Das war Quatsch:', 'Das soll im Kurs anders werden:'],
  },
  leitung: {
    fakten: [['Zielgruppe', '12–16 Jahre, 4–8 Jugendliche'], ['Dauer', '4 Einheiten à 100 Min. (E20–E23)'], ['Sozialform', 'allein, zu zweit, ganze Gruppe'], ['Material', 'Stifte, Würfel, Seil oder Kreide, Schere']],
    wozu: 'REAL TALK ist das Heft der Jugendlichen zu Modul 5 – gemacht wie ein Magazin, nicht wie ein Arbeitsblatt. Es ersetzt die Spiele der Einheiten nicht. Pro Einheit liefert es eine Szene zum Einsteigen, drei Fakten, drei Mythen und Aufgaben. Die Schülerblätter des Kurses können Sie weiter nutzen oder durch die Doppelseite ersetzen.',
    lernziele: [
      'Die Jugendlichen unterscheiden Worte, Stimme und Körper und wissen, warum Textnachrichten leicht falsch ankommen.',
      'Sie bauen einen Ich-Satz aus dem, was los ist, und dem, was sie wollen – und fassen Gehörtes zusammen.',
      'Sie unterscheiden körperliche, innere und digitale Grenzen und kennen Signale bei sich und anderen.',
      'Sie setzen eine Grenze mit Körper, Stimme und kurzem Satz – und nehmen ein Nein anderer ohne Diskussion an.',
    ],
    start: 'Titel, Ansage (vorlesen – der Ton ist Absicht), Tracklist und Soundcheck. Etwa 10 Minuten, z. B. in der Brücke von Einheit 20.',
    schluss: 'Hot Takes im Stehen (15 Min.) am Ende von Einheit 23 oder als Einstieg in Einheit 24. „Knack den Code“ als Wiederholung, Karten ausschneiden, Abspann in der Abschlussrunde.',
    hilfe: ['Szene und Fakten vorlesen oder reihum lesen lassen.', 'Bei Schreibaufgaben reicht ein Stichwort. Wer nicht schreiben mag, diktiert oder zeichnet.', 'Moves zu zweit lösen lassen, auch wenn „allein“ dasteht.', 'Bei hoher Anspannung: nur Challenge und Line.'],
    forder: ['Eine eigene Szene schreiben (fünf Sätze, erfundene Person).', 'Einen eigenen Hot Take formulieren und zur Abstimmung stellen.', 'Die „Rechnung“ (kostet mich / bringt mir) für eine echte Situation aufmachen.', 'Bei der Garten-Übung als Schiedsrichter/in Rückmeldung geben.'],
    gespraech: 'Die Szenen sind nah am Alltag der Jugendlichen (Betrieb, Wohngruppe, Klinik). Das ist gewollt: Wer sich wiedererkennt, hört zu. Niemand muss sagen, ob er etwas kennt. Fragen Sie nach der Figur („Was braucht Tom?“), nicht nach der Person im Raum. Erzählt jemand von Übergriff, Gewalt oder Bedrohung: freundlich unterbrechen, ein Gespräch unter vier Augen direkt nach der Einheit anbieten und die zuständige Leitung (Responsable) informieren.',
    druck: ['A4, doppelseitig, an der langen Seite gewendet. So liegen Szene (links) und „Dein Move“ (rechts) nebeneinander.', 'Seiten 1–15 für die Jugendlichen, Seiten 16–18 nur für Sie.', 'Schwarz-Weiß ist möglich; das Titelblatt braucht viel Toner.', 'Seite 14 (Karten) einzeln und einseitig drucken, am besten auf festerem Papier.'],
    hot: 'Es gibt keine richtige Position. Ziel ist, dass Meinungen nebeneinander stehen dürfen und begründet werden. Nachfragen statt korrigieren: „Was hast du erlebt, dass du dort stehst?“ Bei Take 6 lohnt die Unterscheidung von Respekt und Angst: Vor wem habe ich Respekt – und warum? Abwertung einzelner sofort stoppen.',
    achtung: 'Beim Thema Chat können aktuelle Konflikte oder Cybermobbing zur Sprache kommen: nicht in der Gruppe auswerten, keine echten Chats zeigen lassen. In allen Übungen gilt das Stopp-Recht; niemand wird angefasst. „Du hörst ein Nein“ (Track 04) kann eigene Grenzüberschreitungen berühren – ohne Beschämung besprechen: Es geht um den nächsten Moment, nicht um Schuld.',
    hintergrund: 'Jede Nachricht hat einen Inhalts- und einen Beziehungsaspekt; die Beziehung wird vor allem über Stimme, Blick und Haltung vermittelt (Watzlawick). Ich-Botschaft und aktives Zuhören gehören zusammen (Gordon). Menschen halten je nach Beziehung unterschiedliche Abstände ein; die Werte schwanken mit Kultur, Situation und Stimmung (Hall). Das Skillstraining für Jugendliche übt, ein Anliegen klar zu sagen, zu wiederholen und dabei sicher aufzutreten (Rathus & Miller). Die Kosten-Nutzen-Rechnung („kostet mich / bringt mir“) folgt der Pro-und-Contra-Technik desselben Trainings: Sie ersetzt die Moral durch eine eigene Abwägung.',
    quellen: 'Watzlawick, Beavin & Jackson (1967) · Schulz von Thun (1981) · Gordon (1972) · Hall (1966) · Rathus & Miller (2015) – vollständige Angaben in den Einheiten 20–23 der Toolbox.',
  },
}
export default d
