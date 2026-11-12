/* Inhalte: „Clash“ – Streit-Szenen für die Friedenstreppe (eigene Texte nach dem ISA-Material „Friedenstreppe“).
   Pro Szene:
     personA / personB: { name, color (Pulli), haut, haar, frisur, extra?, akzent? } – nur Fantasiefiguren
     intro: 3–4 Sprechblasen { who: 'A'|'B', text }, der Streit schaukelt sich hoch
     steps: Level 1 (Was ist passiert?), 2 (Was geht in dir ab?), 3 (Was willst du?) – je Person 4 Antworten:
       kind 'ich' = Ich-Botschaft, 'du' = Vorwurf/Angriff, 'weg' = Ausweichen,
       'fake' = klingt nach Ich-Botschaft, ist aber ein versteckter Vorwurf
       reaction = was die andere Person darauf sagt, heat = Änderung am Hitze-Meter
     versoehnung (Stufe 4): Angebote { by, text, kind 'echt'|'halb', reaction, heat }
     vereinbarung (Stufe 5): Abmachungen { by, text, kind 'klar'|'vage', reaction, heat }
   Frisuren: kurz, locken, lang, dutt, zopf, buzz, cap, afro. Extras: kopfhoerer, brille, ohrring. */
(function () {
  const C = (window.CREW.content = window.CREW.content || {});
  C.clash = [
    /* ---------- 1. Das Foto ---------- */
    {
      id: 'cl01', title: 'Das Foto', ort: 'Nach der Fouer · Story',
      personA: { name: 'Aylin', color: '#2f8cff', haut: '#d9a27a', haar: '#2b1d16', frisur: 'lang', extra: 'ohrring' },
      personB: { name: 'Noah', color: '#ff5d7a', haut: '#f1c7a1', haar: '#8a5a2b', frisur: 'kurz', extra: 'kopfhoerer' },
      intro: [
        { who: 'A', text: 'Noah! Warum ist mein Foto in deiner Story?' },
        { who: 'B', text: 'Chill. Das ist lustig. Alle feiern es.' },
        { who: 'A', text: 'Alle lachen über mich! Lösch das!' },
        { who: 'B', text: 'Nö. Du bist so empfindlich.' },
      ],
      steps: {
        1: {
          A: [
            { kind: 'ich', text: 'Ich hab heute mein Foto in deiner Story gesehen. Ich wusste nichts davon.', reaction: 'Oh. Ich dachte echt, du kennst es schon.', heat: -12 },
            { kind: 'du', text: 'Du willst mich doch nur vor allen blamieren.', reaction: 'Laber nicht. Du machst aus allem ein Drama.', heat: 14 },
            { kind: 'weg', text: 'Egal. Mach halt.', reaction: 'Na also. Dann bleibt es drin.', heat: 6 },
            { kind: 'fake', text: 'Ich hab halt gesehen, dass du mich mal wieder bloßstellst.', reaction: 'Mal wieder? Was soll das denn heißen?', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich hab das Foto auf der Achterbahn gemacht. Ich fand es einfach witzig.', reaction: 'Okay. Für dich war es also nur Spaß.', heat: -12 },
            { kind: 'du', text: 'Du verstehst halt keinen Spaß.', reaction: 'Und du verstehst gar nichts!', heat: 14 },
            { kind: 'weg', text: 'Keine Ahnung, was dein Problem ist.', reaction: 'Echt jetzt? Du hörst mir nicht mal zu.', heat: 6 },
            { kind: 'fake', text: 'Ich finde, du bist halt empfindlich. Das Foto war witzig.', reaction: 'Ah, jetzt bin ich also das Problem.', heat: 10 },
          ],
        },
        2: {
          A: [
            { kind: 'ich', text: 'Ich hab mich richtig geschämt. Alle haben mich darauf angesprochen.', reaction: 'Oh. Das wollte ich nicht.', heat: -12 },
            { kind: 'du', text: 'Wie soll ich mich fühlen? Du bist einfach nur peinlich.', reaction: 'Ich bin peinlich? Schau mal dein Foto an.', heat: 14 },
            { kind: 'weg', text: 'Gefühlt? Nix. Passt schon.', reaction: 'Okay … dann ist ja alles gut.', heat: 5 },
            { kind: 'fake', text: 'Ich fühl mich schlecht, weil du immer alles kaputt machst.', reaction: 'Immer? Das ist echt unfair.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich war erst überrascht. Jetzt fühl ich mich ein bisschen mies.', reaction: 'Danke, dass du das sagst.', heat: -12 },
            { kind: 'du', text: 'Genervt. Weil du wegen jedem Foto rumheulst.', reaction: 'Wow. Echt nett von dir.', heat: 14 },
            { kind: 'weg', text: 'Weiß nicht. Ist mir egal.', reaction: 'Merkt man.', heat: 6 },
            { kind: 'fake', text: 'Ich fühl mich genervt, weil du aus allem ein Drama machst.', reaction: 'Toll. Jetzt bin ich wieder schuld.', heat: 10 },
          ],
        },
        3: {
          A: [
            { kind: 'ich', text: 'Ich will gefragt werden, bevor ein Foto von mir online geht.', reaction: 'Okay. Das ist fair.', heat: -12 },
            { kind: 'du', text: 'Du musst mal dein Hirn einschalten.', reaction: 'Und du mal deine gute Laune.', heat: 14 },
            { kind: 'weg', text: 'Ich brauch gar nichts. Mach, was du willst.', reaction: 'Dann mach ich das auch.', heat: 6 },
            { kind: 'fake', text: 'Ich will einfach, dass du aufhörst, so rücksichtslos zu sein.', reaction: 'Rücksichtslos? Jetzt reicht es aber.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Mir ist wichtig, dass wir weiter zusammen Spaß haben können.', reaction: 'Will ich ja auch. Aber nicht so.', heat: -10 },
            { kind: 'du', text: 'Du brauchst mal mehr Humor.', reaction: 'Und du mehr Respekt.', heat: 14 },
            { kind: 'weg', text: 'Ich brauch nix. Können wir das lassen?', reaction: 'Nein. Mir ist das wichtig.', heat: 5 },
            { kind: 'fake', text: 'Mir ist wichtig, dass du endlich mal lockerer wirst.', reaction: 'Und mir ist wichtig, dass du mich respektierst.', heat: 10 },
          ],
        },
      },
      versoehnung: [
        { by: 'B', kind: 'echt', text: 'Sorry. Ich lösch das Foto jetzt sofort.', reaction: 'Danke. Das bedeutet mir echt was.', heat: -15 },
        { by: 'A', kind: 'echt', text: 'Sorry, dass ich dich vor allen angeschrien hab.', reaction: 'Passt. Ich hab ja auch Mist gebaut.', heat: -15 },
        { by: 'B', kind: 'echt', text: 'Wir machen ein neues Foto. Du suchst aus, welches.', reaction: 'Haha, okay. Aber ich hab das letzte Wort.', heat: -15 },
        { by: 'B', kind: 'halb', text: 'Sorry. Aber du übertreibst trotzdem.', reaction: 'Das ist keine echte Entschuldigung.', heat: 10 },
        { by: 'B', kind: 'halb', text: 'Tut mir leid, dass du das so schlimm findest.', reaction: 'Das ist kein Sorry. Das ist ein Vorwurf.', heat: 10 },
      ],
      vereinbarung: [
        { by: 'A', kind: 'klar', text: 'Fotos von uns posten wir nur, wenn wir vorher fragen.', reaction: 'Deal. Gilt auch für dich.', heat: -15 },
        { by: 'B', kind: 'klar', text: 'Wenn uns was stört, schreiben wir es uns direkt.', reaction: 'Ja. Und nicht in die Kommentare.', heat: -15 },
        { by: 'A', kind: 'klar', text: 'Wenn wir sauer sind, erst zehn Minuten Pause. Dann reden.', reaction: 'Klingt fair.', heat: -15 },
        { by: 'B', kind: 'vage', text: 'Wir reden einfach nie wieder darüber.', reaction: 'Und beim nächsten Foto knallt es wieder?', heat: 8 },
        { by: 'A', kind: 'vage', text: 'Wir passen einfach besser auf. Irgendwie.', reaction: 'Irgendwie? Das klappt nie.', heat: 8 },
      ],
    },

    /* ---------- 2. Das Ladekabel ---------- */
    {
      id: 'cl02', title: 'Das Ladekabel', ort: 'Klassenraum · 8 Uhr',
      personA: { name: 'Tiago', color: '#19b3a3', haut: '#c68a5a', haar: '#1d1a24', frisur: 'locken' },
      personB: { name: 'Mia', color: '#ff8a3d', haut: '#f3cfb0', haar: '#d9a441', frisur: 'zopf' },
      intro: [
        { who: 'A', text: 'Mia, wo ist mein Ladekabel? Das war vor zwei Wochen!' },
        { who: 'B', text: 'Chill, ich bring’s irgendwann mit.' },
        { who: 'A', text: 'Irgendwann? Mein Handy hat drei Prozent!' },
        { who: 'B', text: 'Dann kauf dir halt ein neues. Nerv nicht.' },
      ],
      steps: {
        1: {
          A: [
            { kind: 'ich', text: 'Ich hab dir mein Kabel vor zwei Wochen geliehen. Ich hab es noch nicht zurück.', reaction: 'Stimmt. Ich hab’s echt vergessen.', heat: -12 },
            { kind: 'du', text: 'Du klaust einfach Sachen und tust dann unschuldig.', reaction: 'Klauen?! Spinnst du? Ich hab’s geliehen!', heat: 16 },
            { kind: 'weg', text: 'Vergiss es. Ist ja nur ein Kabel.', reaction: 'Okay, dann behalt ich es noch.', heat: 6 },
            { kind: 'fake', text: 'Ich hab gemerkt, dass man dir echt nichts leihen kann.', reaction: 'Wow. Einmal vergessen und ich bin unzuverlässig?', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich hab das Kabel mitgenommen. Dann lag es zu Hause, und ich hab’s vergessen.', reaction: 'Okay. Also keine Absicht.', heat: -12 },
            { kind: 'du', text: 'Du machst so einen Stress wegen einem Kabel.', reaction: 'Weil es MEIN Kabel ist!', heat: 14 },
            { kind: 'weg', text: 'Weiß nicht, wo das ist.', reaction: 'Das ist genau das Problem.', heat: 6 },
            { kind: 'fake', text: 'Ich finde, du machst wegen einem Kabel echt Stress.', reaction: 'Weil es mein Kabel ist!', heat: 10 },
          ],
        },
        2: {
          A: [
            { kind: 'ich', text: 'Ich war genervt. Ich hatte das Gefühl, dir ist das egal.', reaction: 'Das ist mir nicht egal. Ehrlich.', heat: -12 },
            { kind: 'du', text: 'Wie ein Idiot. Wegen dir.', reaction: 'Ich hab dich nicht zum Idioten gemacht!', heat: 14 },
            { kind: 'weg', text: 'Passt schon. Bin’s gewohnt.', reaction: 'Okay … wenn du meinst.', heat: 5 },
            { kind: 'fake', text: 'Ich fühl mich verarscht, weil du so egoistisch bist.', reaction: 'Egoistisch? Du kennst mich doch gar nicht.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Es war mir peinlich, dass ich es vergessen hab. Deshalb hab ich blöd reagiert.', reaction: 'Ah. Das erklärt einiges.', heat: -14 },
            { kind: 'du', text: 'Du nervst mich einfach nur.', reaction: 'Und du mich erst!', heat: 14 },
            { kind: 'weg', text: 'Gefühlt? Keine Ahnung.', reaction: 'Toll. Danke für nichts.', heat: 6 },
            { kind: 'fake', text: 'Ich fühl mich angegriffen, weil du immer so rumschreist.', reaction: 'Ich schrei nicht immer! Das ist gemein.', heat: 10 },
          ],
        },
        3: {
          A: [
            { kind: 'ich', text: 'Ich brauche mein Kabel morgen. Und ich will mich auf dich verlassen können.', reaction: 'Kriegst du. Versprochen.', heat: -12 },
            { kind: 'du', text: 'Du musst endlich lernen, Sachen zurückzugeben.', reaction: 'Und du, normal zu reden.', heat: 14 },
            { kind: 'weg', text: 'Ich brauch nix. Ich leih dir halt nie wieder was.', reaction: 'Wow. Okay.', heat: 6 },
            { kind: 'fake', text: 'Ich will, dass du einmal im Leben zuverlässig bist.', reaction: 'Einmal im Leben? Jetzt übertreibst du.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Mir ist wichtig, dass du mir sagst, wenn dich was stört. Ohne gleich zu schreien.', reaction: 'Okay. Das kann ich machen.', heat: -12 },
            { kind: 'du', text: 'Du musst mal chillen.', reaction: 'Ich chill, wenn ich mein Kabel hab!', heat: 14 },
            { kind: 'weg', text: 'Ich brauch nichts. Lass mich einfach.', reaction: 'Und mein Kabel?', heat: 6 },
            { kind: 'fake', text: 'Ich brauche, dass du nicht so ein Theater machst.', reaction: 'Theater? Du hast mein Kabel!', heat: 10 },
          ],
        },
      },
      versoehnung: [
        { by: 'B', kind: 'echt', text: 'Sorry. Ich bring das Kabel morgen früh mit. Als Erstes.', reaction: 'Danke. Dann ist das geklärt.', heat: -15 },
        { by: 'B', kind: 'echt', text: 'Heute kannst du mein Ladegerät benutzen. Bis deins wieder da ist.', reaction: 'Oh, nice. Danke.', heat: -15 },
        { by: 'A', kind: 'echt', text: 'Sorry, dass ich so laut geworden bin.', reaction: 'Schon okay. Ich hätte auch dran denken müssen.', heat: -15 },
        { by: 'B', kind: 'halb', text: 'Sorry, aber du hättest mich auch erinnern können.', reaction: 'Hab ich! Fünfmal!', heat: 10 },
        { by: 'B', kind: 'halb', text: 'Tut mir leid, dass du wegen so was sauer wirst.', reaction: 'Das klingt, als wär ich das Problem.', heat: 10 },
      ],
      vereinbarung: [
        { by: 'A', kind: 'klar', text: 'Wer was leiht, bringt es spätestens nach drei Tagen zurück.', reaction: 'Deal.', heat: -15 },
        { by: 'B', kind: 'klar', text: 'Ich stell mir eine Erinnerung im Handy.', reaction: 'Gute Idee. Dann vergisst du’s nicht.', heat: -15 },
        { by: 'A', kind: 'klar', text: 'Wenn was fehlt, fragen wir erst ruhig nach.', reaction: 'Ja, das ist fair.', heat: -15 },
        { by: 'B', kind: 'vage', text: 'Ab jetzt leiht keiner mehr dem anderen was.', reaction: 'Dann gibt’s keinen Streit. Aber auch keine Hilfe.', heat: 6 },
        { by: 'A', kind: 'vage', text: 'Wir denken einfach beide mehr dran.', reaction: 'Und wer erinnert wen? Das hält nicht.', heat: 8 },
      ],
    },

    /* ---------- 3. Der Platz im Bus ---------- */
    {
      id: 'cl03', title: 'Der Platz im Bus', ort: 'Bus · 7:20 Uhr',
      personA: { name: 'Jeff', color: '#4b5bd6', haut: '#f0c29c', haar: '#b5462e', frisur: 'cap', akzent: '#ffc93c' },
      personB: { name: 'Sara', color: '#e8475f', haut: '#8d5a3b', haar: '#1d1a24', frisur: 'dutt', extra: 'brille' },
      intro: [
        { who: 'A', text: 'Ey, das ist mein Platz. Steh auf.' },
        { who: 'B', text: 'Steht da dein Name drauf? Nein.' },
        { who: 'A', text: 'Ich sitz da jeden Tag! Das weiß jeder!' },
        { who: 'B', text: 'Dann komm halt früher. Pech gehabt.' },
      ],
      steps: {
        1: {
          A: [
            { kind: 'ich', text: 'Ich sitz jeden Morgen hinten links. Heute war der Platz besetzt.', reaction: 'Ah. Das wusste ich nicht.', heat: -12 },
            { kind: 'du', text: 'Du setzt dich extra da hin, um mich zu nerven.', reaction: 'Ich hab Besseres zu tun, als an dich zu denken.', heat: 14 },
            { kind: 'weg', text: 'Egal. Ich steh halt.', reaction: 'Okay. Dein Ding.', heat: 5 },
            { kind: 'fake', text: 'Ich hab gesehen, dass du mir absichtlich den Platz klaust.', reaction: 'Absichtlich? Ich wusste das nicht mal!', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich bin eingestiegen, und der Platz war frei. Also hab ich mich hingesetzt.', reaction: 'Okay. Für dich war er frei.', heat: -12 },
            { kind: 'du', text: 'Du denkst, dir gehört der ganze Bus.', reaction: 'Und du denkst, du kannst dir alles nehmen.', heat: 14 },
            { kind: 'weg', text: 'Kein Plan, wovon du redest.', reaction: 'Tu nicht so.', heat: 6 },
            { kind: 'fake', text: 'Ich finde, du glaubst, dir gehört der ganze Bus.', reaction: 'Jetzt wirst du aber frech.', heat: 10 },
          ],
        },
        2: {
          A: [
            { kind: 'ich', text: 'Ich war eh schon müde. Ohne meinen Platz war ich echt gestresst.', reaction: 'Hm. Morgens gestresst, das kenn ich.', heat: -12 },
            { kind: 'du', text: 'Wie ich mich fühl? Du hast mir den Morgen versaut.', reaction: 'Den hast du dir selbst versaut.', heat: 14 },
            { kind: 'weg', text: 'Nix. Ist mir egal.', reaction: 'Sieht aber nicht so aus.', heat: 5 },
            { kind: 'fake', text: 'Ich fühl mich gestresst, weil du so rücksichtslos bist.', reaction: 'Rücksichtslos? Ich hab mich nur hingesetzt.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich hab mich erschrocken, als du so laut wurdest. Vor allen.', reaction: 'Oh. Das war nicht cool von mir.', heat: -12 },
            { kind: 'du', text: 'Ich bin genervt von Leuten wie dir.', reaction: 'Leute wie ich? Wow.', heat: 14 },
            { kind: 'weg', text: 'Weiß nicht. Mir doch egal.', reaction: 'Mir aber nicht.', heat: 6 },
            { kind: 'fake', text: 'Ich fühl mich mies, weil du dich wie ein Chef aufführst.', reaction: 'Wie ein Chef? Echt jetzt?', heat: 10 },
          ],
        },
        3: {
          A: [
            { kind: 'ich', text: 'Hinten ist es ruhig. Ich brauch morgens einen ruhigen Platz.', reaction: 'Das versteh ich. Brauch ich auch.', heat: -12 },
            { kind: 'du', text: 'Du musst einfach mal Respekt lernen.', reaction: 'Respekt? Du hast mich angeschrien.', heat: 14 },
            { kind: 'weg', text: 'Ich brauch nix. Setz dich doch, wohin du willst.', reaction: 'Mach ich auch.', heat: 6 },
            { kind: 'fake', text: 'Ich brauch einen Platz ohne Leute wie dich.', reaction: 'Leute wie mich? Was soll das heißen?', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Mir ist wichtig, dass mich niemand anschreit. Auch nicht wegen einem Platz.', reaction: 'Ja. Das war zu viel von mir.', heat: -12 },
            { kind: 'du', text: 'Du musst lernen, dass du hier nicht der Chef bist.', reaction: 'Und du musst lernen zu fragen.', heat: 14 },
            { kind: 'weg', text: 'Keine Ahnung. Lass mich in Ruhe.', reaction: 'Gern. Aber der Platz …', heat: 5 },
            { kind: 'fake', text: 'Mir ist wichtig, dass du mal von deinem Thron runterkommst.', reaction: 'Mein Thron? Du machst dich lustig.', heat: 10 },
          ],
        },
      },
      versoehnung: [
        { by: 'A', kind: 'echt', text: 'Sorry, dass ich dich so angemacht hab. Vor allen.', reaction: 'Okay. Danke, dass du das sagst.', heat: -15 },
        { by: 'B', kind: 'echt', text: 'Ich wusste nicht, dass du da immer sitzt. Morgen lass ich ihn frei.', reaction: 'Danke. Voll nett.', heat: -15 },
        { by: 'A', kind: 'echt', text: 'Wir können uns die Bank teilen. Einer Fenster, einer Gang.', reaction: 'Deal. Ich nehm Fenster.', heat: -15 },
        { by: 'A', kind: 'halb', text: 'Sorry, aber das ist halt mein Platz.', reaction: 'Das ist kein Sorry. Das ist ein Befehl.', heat: 10 },
        { by: 'A', kind: 'halb', text: 'Tut mir leid, dass du das nicht wusstest.', reaction: 'Klingt so, als wär ich dumm.', heat: 10 },
      ],
      vereinbarung: [
        { by: 'A', kind: 'klar', text: 'Wenn einer was will, fragen wir normal. Ohne Schreien.', reaction: 'Abgemacht.', heat: -15 },
        { by: 'B', kind: 'klar', text: 'Montag, Mittwoch, Freitag sitzt du am Fenster. Die anderen Tage ich.', reaction: 'Klingt fair. Ich schreib’s mir auf.', heat: -15 },
        { by: 'A', kind: 'klar', text: 'Wenn der Platz besetzt ist, setz ich mich einfach daneben.', reaction: 'Cool. Dann haben wir beide Ruhe.', heat: -15 },
        { by: 'B', kind: 'vage', text: 'Wir gehen uns im Bus einfach aus dem Weg.', reaction: 'Im vollen Bus? Viel Glück.', heat: 6 },
        { by: 'B', kind: 'vage', text: 'Wir sind einfach alle ein bisschen netter.', reaction: 'Und morgen früh? Wer sitzt wo?', heat: 8 },
      ],
    },

    /* ---------- 4. Der Controller ---------- */
    {
      id: 'cl04', title: 'Der Controller', ort: 'Bei Emir · Zocken',
      personA: { name: 'Emir', color: '#2a9df4', haut: '#c9936a', haar: '#1d1a24', frisur: 'buzz', extra: 'kopfhoerer' },
      personB: { name: 'Luca', color: '#c04bd8', haut: '#f1c7a1', haar: '#4a2c1d', frisur: 'locken' },
      intro: [
        { who: 'A', text: 'Luca! Du hast meinen Controller runtergeworfen!' },
        { who: 'B', text: 'Der ist mir runtergefallen. Das ist was anderes.' },
        { who: 'A', text: 'Jetzt klemmt der Knopf. Den bezahlst du!' },
        { who: 'B', text: 'Spinnst du? Der war eh schon alt.' },
      ],
      steps: {
        1: {
          A: [
            { kind: 'ich', text: 'Der Controller ist runtergefallen. Seitdem klemmt der A-Knopf.', reaction: 'Oh. Das hab ich nicht gemerkt.', heat: -12 },
            { kind: 'du', text: 'Du machst immer alles kaputt.', reaction: 'Immer? Das war ein Mal!', heat: 14 },
            { kind: 'weg', text: 'Egal. Dann zocken wir halt nicht mehr.', reaction: 'Okay … dann geh ich eben.', heat: 6 },
            { kind: 'fake', text: 'Ich hab gesehen, wie tollpatschig du mit fremden Sachen bist.', reaction: 'Tollpatschig? Das war ein Unfall!', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich bin nach dem Tor aufgesprungen. Da ist er mir aus der Hand gefallen.', reaction: 'Okay. Also war es keine Absicht.', heat: -12 },
            { kind: 'du', text: 'Du tust so, als hätte ich das extra gemacht.', reaction: 'Vielleicht hast du das ja!', heat: 14 },
            { kind: 'weg', text: 'Keine Ahnung. Ich hab nix gesehen.', reaction: 'Du hattest ihn doch in der Hand!', heat: 8 },
            { kind: 'fake', text: 'Ich finde, du tust so, als hätte ich ihn geworfen.', reaction: 'Weil es genau so aussah!', heat: 10 },
          ],
        },
        2: {
          A: [
            { kind: 'ich', text: 'Ich war sauer. Und traurig, weil ich lange für den gespart hab.', reaction: 'Oh. Das wusste ich nicht.', heat: -12 },
            { kind: 'du', text: 'Wie ich mich fühl? Du bist echt ein Loser.', reaction: 'Und du bist ein Geizhals.', heat: 16 },
            { kind: 'weg', text: 'Nix. Ist ja nur ein Controller.', reaction: 'Sicher? Du guckst aber nicht so.', heat: 5 },
            { kind: 'fake', text: 'Ich fühl mich sauer, weil man dir nichts anvertrauen kann.', reaction: 'Nichts? Jetzt wird es gemein.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich hab mich schlecht gefühlt. Und ich hatte Angst, dass du mich rauswirfst.', reaction: 'Hm. Rauswerfen wollte ich dich nicht.', heat: -12 },
            { kind: 'du', text: 'Genervt, weil du so ein Drama machst.', reaction: 'Drama? Das ist mein Controller!', heat: 14 },
            { kind: 'weg', text: 'Gefühlt? Nichts Besonderes.', reaction: 'Echt jetzt?', heat: 6 },
            { kind: 'fake', text: 'Ich fühl mich mies, weil du sofort komplett ausrastest.', reaction: 'Ich raste aus? Mein Controller ist kaputt!', heat: 10 },
          ],
        },
        3: {
          A: [
            { kind: 'ich', text: 'Mir ist wichtig, dass wir eine Lösung finden. Und dass du nicht einfach abhaust.', reaction: 'Ich hau nicht ab. Versprochen.', heat: -12 },
            { kind: 'du', text: 'Du musst den bezahlen. Punkt.', reaction: 'Ich zahl gar nix, wenn du so redest.', heat: 14 },
            { kind: 'weg', text: 'Ich brauch nix von dir.', reaction: 'Dann halt nicht.', heat: 6 },
            { kind: 'fake', text: 'Ich will, dass du endlich mal Verantwortung übernimmst.', reaction: 'Endlich mal? Das ist unfair.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich brauche, dass du mir glaubst. Es war echt keine Absicht.', reaction: 'Okay. Ich glaub dir.', heat: -12 },
            { kind: 'du', text: 'Du musst mal lernen, locker zu bleiben.', reaction: 'Und du, besser aufzupassen.', heat: 14 },
            { kind: 'weg', text: 'Ich brauch gar nix. Ich geh jetzt.', reaction: 'Toll. Einfach abhauen.', heat: 6 },
            { kind: 'fake', text: 'Ich brauche, dass du nicht so geizig tust wegen einem Knopf.', reaction: 'Geizig? Ich hab lange dafür gespart!', heat: 10 },
          ],
        },
      },
      versoehnung: [
        { by: 'B', kind: 'echt', text: 'Sorry. Ich schau mit dir, ob man den Knopf reparieren kann.', reaction: 'Okay, das wär nice.', heat: -15 },
        { by: 'B', kind: 'echt', text: 'Sorry. Wenn du einen neuen brauchst, geb ich was dazu.', reaction: 'Danke. Das ist fair.', heat: -15 },
        { by: 'A', kind: 'echt', text: 'Sorry, dass ich so rumgeschrien hab. Ich weiß, es war keine Absicht.', reaction: 'Danke. Mir tut’s auch echt leid.', heat: -15 },
        { by: 'B', kind: 'halb', text: 'Sorry, aber der war eh schon alt.', reaction: 'Das macht es nicht besser.', heat: 10 },
        { by: 'B', kind: 'halb', text: 'Tut mir leid, dass dir das so wichtig ist.', reaction: 'Das ist kein Sorry.', heat: 10 },
      ],
      vereinbarung: [
        { by: 'A', kind: 'klar', text: 'Beim Jubeln legen wir die Controller vorher weg.', reaction: 'Haha, okay. Deal.', heat: -15 },
        { by: 'B', kind: 'klar', text: 'Wenn was kaputtgeht, sagen wir es sofort. Und suchen zusammen eine Lösung.', reaction: 'Abgemacht.', heat: -15 },
        { by: 'A', kind: 'klar', text: 'Am Samstag schauen wir zusammen ein Reparatur-Video.', reaction: 'Bin dabei.', heat: -15 },
        { by: 'B', kind: 'vage', text: 'Wir zocken einfach nie mehr zusammen.', reaction: 'Dann haben wir beide verloren.', heat: 6 },
        { by: 'A', kind: 'vage', text: 'Wir sind einfach vorsichtiger. Beide.', reaction: 'Und wer zahlt den Knopf?', heat: 8 },
      ],
    },

    /* ---------- 5. Gepetzt? ---------- */
    {
      id: 'cl05', title: 'Gepetzt?', ort: 'Atelier · Nach der Pause',
      personA: { name: 'Yara', color: '#1fb5a8', haut: '#6b4128', haar: '#1d1a24', frisur: 'afro' },
      personB: { name: 'Dylan', color: '#ff6b3d', haut: '#f3d2b5', haar: '#d9a441', frisur: 'kurz', extra: 'brille' },
      intro: [
        { who: 'A', text: 'Dylan, du hast mich verpetzt, oder?' },
        { who: 'B', text: 'Was? Ich hab gar nichts gemacht.' },
        { who: 'A', text: 'Nur du wusstest, dass ich früher weg bin!' },
        { who: 'B', text: 'Dann hau halt nicht ab. Nicht mein Problem.' },
      ],
      steps: {
        1: {
          A: [
            { kind: 'ich', text: 'Ich bin früher aus dem Atelier gegangen. Danach hatte ich Ärger mit dem Educateur.', reaction: 'Okay. Das ist blöd gelaufen.', heat: -12 },
            { kind: 'du', text: 'Du bist eine Petze. Das weiß jeder.', reaction: 'Und du siehst Gespenster!', heat: 16 },
            { kind: 'weg', text: 'Egal. Mir glaubt eh keiner.', reaction: 'Hä? Was soll das jetzt?', heat: 6 },
            { kind: 'fake', text: 'Ich hab halt gemerkt, dass du gern petzt.', reaction: 'Gern petzen? Du kennst mich null.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Der Educateur hat gefragt, wo du bist. Ich hab nur gesagt, dass du weg bist.', reaction: 'Ah. Du wurdest also gefragt.', heat: -12 },
            { kind: 'du', text: 'Du suchst immer einen Schuldigen. Nur nie bei dir.', reaction: 'Wow. Danke auch.', heat: 14 },
            { kind: 'weg', text: 'Kein Plan. Frag doch wen anders.', reaction: 'Ich frag aber dich.', heat: 6 },
            { kind: 'fake', text: 'Ich finde, du suchst nur einen Schuldigen.', reaction: 'Weil ich Ärger hatte!', heat: 10 },
          ],
        },
        2: {
          A: [
            { kind: 'ich', text: 'Ich hab mich verraten gefühlt. Und ich war echt wütend.', reaction: 'Verstehe. Das ist ein mieses Gefühl.', heat: -12 },
            { kind: 'du', text: 'Wie soll ich mich fühlen? Du hast mich reingeritten.', reaction: 'Du hast dich selbst reingeritten!', heat: 14 },
            { kind: 'weg', text: 'Gefühlt? Nix. Ist halt so.', reaction: 'Na dann.', heat: 5 },
            { kind: 'fake', text: 'Ich fühl mich verraten, weil du eine Petze bist.', reaction: 'Eine Petze? Jetzt reicht es.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich war geschockt, dass du mir so was zutraust. Das hat wehgetan.', reaction: 'Oh. Das wollte ich nicht.', heat: -12 },
            { kind: 'du', text: 'Genervt. Weil du einfach Leute beschuldigst.', reaction: 'Weil du es warst!', heat: 14 },
            { kind: 'weg', text: 'Weiß nicht. Juckt mich nicht.', reaction: 'Merkt man.', heat: 6 },
            { kind: 'fake', text: 'Ich fühl mich schlecht, weil du immer anderen die Schuld gibst.', reaction: 'Immer? Das stimmt nicht.', heat: 10 },
          ],
        },
        3: {
          A: [
            { kind: 'ich', text: 'Ich will dir vertrauen können. Das ist mir wichtig.', reaction: 'Kannst du. Ich sag dir ab jetzt Bescheid.', heat: -12 },
            { kind: 'du', text: 'Du musst lernen, deinen Mund zu halten.', reaction: 'Und du, nicht abzuhauen.', heat: 14 },
            { kind: 'weg', text: 'Ich brauch niemanden.', reaction: 'Okay. Wie du willst.', heat: 6 },
            { kind: 'fake', text: 'Ich will Freunde, die nicht hinter meinem Rücken reden.', reaction: 'Und ich will nicht beschuldigt werden.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Mir ist wichtig, dass du mich erst fragst, bevor du mich beschuldigst.', reaction: 'Okay. Das ist fair.', heat: -12 },
            { kind: 'du', text: 'Du musst mal aufhören, allen die Schuld zu geben.', reaction: 'Und du mal ehrlich sein.', heat: 14 },
            { kind: 'weg', text: 'Ich brauch gar nichts. Lass mich.', reaction: 'Gern.', heat: 6 },
            { kind: 'fake', text: 'Mir ist wichtig, dass du mal über dich selbst nachdenkst.', reaction: 'Wow. Jetzt bin ich wieder schuld.', heat: 10 },
          ],
        },
      },
      versoehnung: [
        { by: 'A', kind: 'echt', text: 'Sorry, dass ich dich einfach beschuldigt hab. Ich hätte fragen sollen.', reaction: 'Danke. Das bedeutet mir was.', heat: -15 },
        { by: 'B', kind: 'echt', text: 'Sorry, dass ich so blöd reagiert hab. Nächstes Mal sag ich dir Bescheid.', reaction: 'Okay. Das wär gut.', heat: -15 },
        { by: 'B', kind: 'echt', text: 'Ich kann mit dir zum Educateur gehen. Dann klären wir das zusammen.', reaction: 'Echt? Danke.', heat: -15 },
        { by: 'A', kind: 'halb', text: 'Sorry, aber irgendwer muss es ja gewesen sein.', reaction: 'Also glaubst du mir immer noch nicht.', heat: 10 },
        { by: 'A', kind: 'halb', text: 'Tut mir leid, dass du dich angegriffen fühlst.', reaction: 'Das ist keine Entschuldigung.', heat: 10 },
      ],
      vereinbarung: [
        { by: 'A', kind: 'klar', text: 'Bevor wir jemanden beschuldigen, fragen wir erst nach.', reaction: 'Deal.', heat: -15 },
        { by: 'B', kind: 'klar', text: 'Wenn mich jemand nach dir fragt, sag ich es dir danach.', reaction: 'Okay. Danke.', heat: -15 },
        { by: 'A', kind: 'klar', text: 'Bei Streit reden wir erst unter vier Augen.', reaction: 'Ja. Nicht vor allen.', heat: -15 },
        { by: 'B', kind: 'vage', text: 'Wir reden einfach nicht mehr miteinander.', reaction: 'Im selben Atelier? Das wird schwer.', heat: 6 },
        { by: 'B', kind: 'vage', text: 'Wir vertrauen uns einfach wieder.', reaction: 'Einfach so? Wie soll das gehen?', heat: 8 },
      ],
    },

    /* ---------- 6. Das Gruppenprojekt ---------- */
    {
      id: 'cl06', title: 'Das Gruppenprojekt', ort: 'Projet · Präsentation morgen',
      personA: { name: 'Inês', color: '#3d7bff', haut: '#d9a27a', haar: '#4a2c1d', frisur: 'dutt', extra: 'brille' },
      personB: { name: 'Milan', color: '#ff5d8f', haut: '#e8b68e', haar: '#2b1d16', frisur: 'cap', akzent: '#2ee6c5' },
      intro: [
        { who: 'A', text: 'Milan, morgen ist die Präsentation. Wo sind deine Folien?' },
        { who: 'B', text: 'Mach ich heute Abend. Chill.' },
        { who: 'A', text: 'Das sagst du seit einer Woche! Ich mach alles allein!' },
        { who: 'B', text: 'Dann mach halt alles. Kannst du ja so gut.' },
      ],
      steps: {
        1: {
          A: [
            { kind: 'ich', text: 'Wir wollten die Folien teilen. Bis jetzt hab ich alle acht gemacht.', reaction: 'Stimmt. Ich hab noch nichts.', heat: -12 },
            { kind: 'du', text: 'Du bist so faul. Echt peinlich.', reaction: 'Und du tust immer so perfekt.', heat: 14 },
            { kind: 'weg', text: 'Vergiss es. Ich mach’s halt allein.', reaction: 'Okay, cool. Danke.', heat: 6 },
            { kind: 'fake', text: 'Ich hab gemerkt, dass du dich immer drückst.', reaction: 'Immer? Du übertreibst total.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich hab die Aufgabe nicht richtig verstanden. Dann hab ich es immer weiter verschoben.', reaction: 'Oh. Warum hast du nichts gesagt?', heat: -12 },
            { kind: 'du', text: 'Du machst eh alles nach deinem Kopf.', reaction: 'Weil du gar nichts machst!', heat: 14 },
            { kind: 'weg', text: 'Keine Ahnung. Mach ich später.', reaction: 'Später ist morgen früh!', heat: 6 },
            { kind: 'fake', text: 'Ich finde, du bist halt ein Kontrollfreak.', reaction: 'Kontrollfreak? Ich mach alles allein!', heat: 10 },
          ],
        },
        2: {
          A: [
            { kind: 'ich', text: 'Ich war gestresst und allein. Ich hatte Angst, dass wir es nicht schaffen.', reaction: 'Das tut mir leid. Echt.', heat: -12 },
            { kind: 'du', text: 'Wie ich mich fühl? Du bist echt das schlechteste Team ever.', reaction: 'Dann such dir doch wen anders.', heat: 14 },
            { kind: 'weg', text: 'Passt schon. Bin’s gewohnt.', reaction: 'Na dann ist ja gut.', heat: 5 },
            { kind: 'fake', text: 'Ich fühl mich allein, weil du einfach faul bist.', reaction: 'Faul? Du weißt gar nicht, was los ist.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich hab mich geschämt, weil ich es nicht kapiert hab. Deshalb hab ich nichts gesagt.', reaction: 'Oh. Das wusste ich nicht.', heat: -14 },
            { kind: 'du', text: 'Genervt. Weil du mir ständig schreibst.', reaction: 'Weil du nie antwortest!', heat: 14 },
            { kind: 'weg', text: 'Weiß nicht. Normal halt.', reaction: 'Normal? Echt jetzt?', heat: 6 },
            { kind: 'fake', text: 'Ich fühl mich gestresst, weil du so perfekt tust.', reaction: 'Ich tu nicht perfekt! Ich will fertig werden.', heat: 10 },
          ],
        },
        3: {
          A: [
            { kind: 'ich', text: 'Ich brauche Hilfe. Ich will, dass wir das als Team schaffen.', reaction: 'Okay. Ich bin dabei.', heat: -12 },
            { kind: 'du', text: 'Du musst endlich mal was machen!', reaction: 'Hör auf, mich rumzukommandieren!', heat: 14 },
            { kind: 'weg', text: 'Ich brauch nix. Ich schaff das auch ohne dich.', reaction: 'Dann halt ohne mich.', heat: 6 },
            { kind: 'fake', text: 'Ich will, dass du dich einmal nicht drückst.', reaction: 'Einmal? Das ist gemein.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich brauche jemanden, der mir die Aufgabe kurz erklärt. Dann mach ich meinen Teil.', reaction: 'Das krieg ich hin. Zehn Minuten?', heat: -14 },
            { kind: 'du', text: 'Du musst mal chillen. Ist nur ein Projekt.', reaction: 'Für dich vielleicht!', heat: 14 },
            { kind: 'weg', text: 'Ich brauch nix. Wird schon irgendwie.', reaction: 'Irgendwie reicht nicht.', heat: 6 },
            { kind: 'fake', text: 'Ich brauche, dass du nicht so rumkommandierst.', reaction: 'Ich kommandiere? Ich mach deine Folien!', heat: 10 },
          ],
        },
      },
      versoehnung: [
        { by: 'B', kind: 'echt', text: 'Sorry, dass ich dich hängen gelassen hab. Heute Abend mach ich drei Folien.', reaction: 'Okay. Danke. Das hilft mir echt.', heat: -15 },
        { by: 'A', kind: 'echt', text: 'Ich erklär dir die Aufgabe in der Pause. Dann schaffen wir das.', reaction: 'Danke. Voll nett.', heat: -15 },
        { by: 'B', kind: 'echt', text: 'Sorry. Morgen übernehm ich das Reden vor der Klasse.', reaction: 'Deal! Das ist genau mein Horror.', heat: -15 },
        { by: 'B', kind: 'halb', text: 'Sorry, aber du hättest mir das auch besser erklären können.', reaction: 'Du hast nie gefragt!', heat: 10 },
        { by: 'B', kind: 'halb', text: 'Tut mir leid, dass du so gestresst bist.', reaction: 'Und wer hat mich gestresst?', heat: 10 },
      ],
      vereinbarung: [
        { by: 'A', kind: 'klar', text: 'Wir machen einen Plan: Wer macht was, bis wann.', reaction: 'Ja. Mit Häkchen im Chat.', heat: -15 },
        { by: 'B', kind: 'klar', text: 'Wenn ich was nicht verstehe, frag ich sofort nach.', reaction: 'Und ich erklär’s ohne Stress.', heat: -15 },
        { by: 'A', kind: 'klar', text: 'Jeden Dienstag schauen wir kurz, wo wir stehen.', reaction: 'Fünf Minuten. Machbar.', heat: -15 },
        { by: 'B', kind: 'vage', text: 'Beim nächsten Projekt machen wir es einfach besser.', reaction: 'Und wie genau?', heat: 6 },
        { by: 'A', kind: 'vage', text: 'Wir strengen uns einfach beide mehr an.', reaction: 'Und wer macht welche Folie?', heat: 8 },
      ],
    },

    /* ---------- 7. Der Gruppenchat (freundlich behandeln) ---------- */
    {
      id: 'cl07', title: 'Der Gruppenchat', ort: 'Handy · Freitagabend',
      personA: { name: 'Lara', color: '#4b5bd6', haut: '#f1c7a1', haar: '#b5462e', frisur: 'lang' },
      personB: { name: 'Rui', color: '#ff8a3d', haut: '#b97a50', haar: '#1d1a24', frisur: 'kurz', extra: 'kopfhoerer' },
      intro: [
        { who: 'A', text: 'Ihr geht Samstag auf die Fouer? Warum bin ich nicht im Chat?' },
        { who: 'B', text: 'Ist halt ein kleiner Chat. Nicht so wichtig.' },
        { who: 'A', text: 'Für mich schon! Alle reden nur davon!' },
        { who: 'B', text: 'Mann, jetzt mach nicht so ein Ding daraus.' },
      ],
      steps: {
        1: {
          A: [
            { kind: 'ich', text: 'Ich hab heute gehört, dass ihr zur Fouer geht. Ich wusste nichts davon.', reaction: 'Oh. So hast du das erfahren? Blöd.', heat: -12 },
            { kind: 'du', text: 'Du machst das extra, damit ich allein bin.', reaction: 'Das stimmt überhaupt nicht!', heat: 14 },
            { kind: 'weg', text: 'Egal. Ich hab eh keine Zeit.', reaction: 'Ah, okay. Dann passt es ja.', heat: 5 },
            { kind: 'fake', text: 'Ich hab gemerkt, dass du mich absichtlich ausschließt.', reaction: 'Absichtlich? Das stimmt nicht!', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich hab den Chat schnell gemacht. Ich hab nicht an alle gedacht.', reaction: 'Okay. Also nicht extra.', heat: -12 },
            { kind: 'du', text: 'Du bist immer so empfindlich.', reaction: 'Und du merkst nie was.', heat: 14 },
            { kind: 'weg', text: 'Keine Ahnung, wer den gemacht hat.', reaction: 'Du. Ich hab’s gesehen.', heat: 6 },
            { kind: 'fake', text: 'Ich finde, du bist beleidigt wegen jedem Chat.', reaction: 'Wegen jedem? Das ist das erste Mal!', heat: 10 },
          ],
        },
        2: {
          A: [
            { kind: 'ich', text: 'Ich hab mich allein gefühlt. Und irgendwie vergessen.', reaction: 'Das tut mir echt leid.', heat: -14 },
            { kind: 'du', text: 'Wie soll ich mich fühlen? Ihr seid alle fake.', reaction: 'Alle? Das ist unfair.', heat: 14 },
            { kind: 'weg', text: 'Gefühlt? Nix. Mir egal.', reaction: 'Okay … sicher?', heat: 5 },
            { kind: 'fake', text: 'Ich fühl mich allein, weil du ein falscher Freund bist.', reaction: 'Ein falscher Freund? Das tut weh.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich fühl mich schlecht. Ich wollte dich nicht verletzen.', reaction: 'Danke, dass du das sagst.', heat: -12 },
            { kind: 'du', text: 'Genervt. Du machst mir voll ein schlechtes Gewissen.', reaction: 'Vielleicht zu Recht?', heat: 12 },
            { kind: 'weg', text: 'Weiß nicht. Ist doch nur ein Chat.', reaction: 'Für dich vielleicht.', heat: 6 },
            { kind: 'fake', text: 'Ich fühl mich schlecht, weil du so eifersüchtig bist.', reaction: 'Eifersüchtig? Ich will nur dabei sein.', heat: 10 },
          ],
        },
        3: {
          A: [
            { kind: 'ich', text: 'Mir ist wichtig, dass ich dazugehöre. Ich will auch gefragt werden.', reaction: 'Versteh ich. Wirklich.', heat: -12 },
            { kind: 'du', text: 'Du musst mal lernen, an andere zu denken.', reaction: 'Und du, nicht gleich alles schlechtzumachen.', heat: 14 },
            { kind: 'weg', text: 'Ich brauch niemanden. Geht doch auch ohne mich.', reaction: 'So war das doch nicht gemeint.', heat: 5 },
            { kind: 'fake', text: 'Ich will Freunde, die nicht so hinterhältig sind.', reaction: 'Hinterhältig? Jetzt reicht es.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Mir ist wichtig, dass du mir sagst, wenn was ist. Nicht erst, wenn du sauer bist.', reaction: 'Okay. Das kann ich versuchen.', heat: -12 },
            { kind: 'du', text: 'Du musst halt selber fragen, ob du mitkannst.', reaction: 'Ich wusste ja nicht mal davon!', heat: 14 },
            { kind: 'weg', text: 'Ich brauch nix. Können wir das lassen?', reaction: 'Mir ist das aber wichtig.', heat: 5 },
            { kind: 'fake', text: 'Mir ist wichtig, dass du nicht aus allem ein Drama machst.', reaction: 'Drama? Ich war nicht eingeladen!', heat: 10 },
          ],
        },
      },
      versoehnung: [
        { by: 'B', kind: 'echt', text: 'Sorry. Ich füg dich jetzt sofort zum Chat hinzu.', reaction: 'Danke. Das freut mich.', heat: -15 },
        { by: 'B', kind: 'echt', text: 'Komm Samstag mit. Wir treffen uns um drei am Glacis.', reaction: 'Echt? Ja, ich komm!', heat: -15 },
        { by: 'A', kind: 'echt', text: 'Sorry, dass ich gleich so laut war. Ich war einfach verletzt.', reaction: 'Ist okay. Ich versteh das jetzt.', heat: -15 },
        { by: 'B', kind: 'halb', text: 'Sorry, aber du hättest ja auch selber fragen können.', reaction: 'Wie denn, wenn ich nichts davon weiß?', heat: 10 },
        { by: 'B', kind: 'halb', text: 'Tut mir leid, dass du dich ausgeschlossen fühlst.', reaction: 'Ich fühl mich nicht nur so. Ich war es.', heat: 10 },
      ],
      vereinbarung: [
        { by: 'A', kind: 'klar', text: 'Wenn wir was planen, fragen wir alle aus der Gruppe.', reaction: 'Ja. Keiner wird vergessen.', heat: -15 },
        { by: 'B', kind: 'klar', text: 'Wenn du dich ausgeschlossen fühlst, schreibst du mir direkt.', reaction: 'Mach ich. Danke.', heat: -15 },
        { by: 'A', kind: 'klar', text: 'Neue Chats machen wir mit allen. Wer nicht will, kann raus.', reaction: 'Fair.', heat: -15 },
        { by: 'B', kind: 'vage', text: 'Wir machen einfach gar keine Chats mehr.', reaction: 'Das löst doch nichts.', heat: 6 },
        { by: 'A', kind: 'vage', text: 'Wir achten einfach mehr aufeinander.', reaction: 'Und beim nächsten Chat? Wie genau?', heat: 8 },
      ],
    },

    /* ---------- 8. Der Screenshot ---------- */
    {
      id: 'cl08', title: 'Der Screenshot', ort: 'Pause · Schulhof',
      personA: { name: 'Nora', color: '#19b3a3', haut: '#5c3a26', haar: '#1d1a24', frisur: 'zopf', extra: 'ohrring' },
      personB: { name: 'Elias', color: '#e8475f', haut: '#e0ac7e', haar: '#8a5a2b', frisur: 'buzz' },
      intro: [
        { who: 'A', text: 'Elias, du hast meine Nachricht weitergeschickt?!' },
        { who: 'B', text: 'Nur ein Screenshot. Ist doch nix.' },
        { who: 'A', text: 'Das war privat! Jetzt hat es die halbe Klasse!' },
        { who: 'B', text: 'Dann schreib halt nicht so peinliches Zeug.' },
      ],
      steps: {
        1: {
          A: [
            { kind: 'ich', text: 'Ich hab dir privat was geschrieben. Jetzt haben es ganz viele gesehen.', reaction: 'Oh. So viele? Das wollte ich nicht.', heat: -12 },
            { kind: 'du', text: 'Du bist so ein Lästermaul.', reaction: 'Und du hast null Humor.', heat: 14 },
            { kind: 'weg', text: 'Egal. Ist eh schon rum.', reaction: 'Siehst du. Halb so wild.', heat: 6 },
            { kind: 'fake', text: 'Ich hab gemerkt, dass man dir nichts erzählen kann.', reaction: 'Nichts? Das ist jetzt zu hart.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Ich hab den Screenshot an zwei Leute geschickt. Die haben ihn weitergeleitet.', reaction: 'Ah. Also nicht an alle. Trotzdem blöd.', heat: -12 },
            { kind: 'du', text: 'Du schreibst halt komisches Zeug. Selbst schuld.', reaction: 'Selbst schuld?! Das war PRIVAT!', heat: 16 },
            { kind: 'weg', text: 'Weiß nicht, wie das rumgekommen ist.', reaction: 'Hör auf, mich anzulügen.', heat: 8 },
            { kind: 'fake', text: 'Ich finde, du schreibst halt komische Sachen.', reaction: 'Das war privat! Das geht dich nichts an.', heat: 10 },
          ],
        },
        2: {
          A: [
            { kind: 'ich', text: 'Ich hab mich bloßgestellt gefühlt. Und ich konnte dir nicht mehr vertrauen.', reaction: 'Das versteh ich. Das ist heftig.', heat: -12 },
            { kind: 'du', text: 'Wie ich mich fühl? Mies. Und du bist schuld.', reaction: 'Ey, übertreib nicht.', heat: 14 },
            { kind: 'weg', text: 'Gefühlt? Ist mir doch egal.', reaction: 'Okay … dann ist ja nix.', heat: 5 },
            { kind: 'fake', text: 'Ich fühl mich bloßgestellt, weil du eine Tratschtante bist.', reaction: 'Tratschtante? Echt jetzt?', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Erst fand ich es lustig. Jetzt schäme ich mich.', reaction: 'Danke, dass du das zugibst.', heat: -14 },
            { kind: 'du', text: 'Genervt, weil du aus allem so ein Ding machst.', reaction: 'Weil es ein Ding IST!', heat: 14 },
            { kind: 'weg', text: 'Keine Ahnung. Nichts.', reaction: 'Echt? Gar nichts?', heat: 6 },
            { kind: 'fake', text: 'Ich fühl mich blöd, weil du so ein Fass aufmachst.', reaction: 'Ein Fass? Die halbe Klasse hat es!', heat: 10 },
          ],
        },
        3: {
          A: [
            { kind: 'ich', text: 'Ich brauche, dass private Sachen bei dir privat bleiben.', reaction: 'Okay. Das ist klar.', heat: -12 },
            { kind: 'du', text: 'Du musst lernen, die Finger vom Handy zu lassen.', reaction: 'Und du, keine peinlichen Sachen zu schreiben.', heat: 14 },
            { kind: 'weg', text: 'Ich brauch nix. Ich schreib dir einfach nie wieder.', reaction: 'Okay … schade.', heat: 6 },
            { kind: 'fake', text: 'Ich will, dass du einmal im Leben die Klappe hältst.', reaction: 'Die Klappe halten? Wow.', heat: 10 },
          ],
          B: [
            { kind: 'ich', text: 'Mir ist wichtig, dass wir wieder normal miteinander reden können.', reaction: 'Will ich auch. Aber erst muss das weg.', heat: -10 },
            { kind: 'du', text: 'Du musst mal lockerer werden.', reaction: 'Und du mal nachdenken!', heat: 14 },
            { kind: 'weg', text: 'Ich brauch nix. Ist doch vorbei.', reaction: 'Für mich nicht.', heat: 6 },
            { kind: 'fake', text: 'Mir ist wichtig, dass du nicht so nachtragend bist.', reaction: 'Nachtragend? Das war gestern!', heat: 10 },
          ],
        },
      },
      versoehnung: [
        { by: 'B', kind: 'echt', text: 'Sorry. Ich schreib den beiden, dass sie den Screenshot löschen.', reaction: 'Danke. Das hilft mir.', heat: -15 },
        { by: 'B', kind: 'echt', text: 'Sorry. Das war mies von mir. Ich mach so was nicht mehr.', reaction: 'Okay. Ich nehm das an.', heat: -15 },
        { by: 'A', kind: 'echt', text: 'Sorry, dass ich dich vor allen angeschrien hab.', reaction: 'Schon gut. Ich hab echt Mist gebaut.', heat: -15 },
        { by: 'B', kind: 'halb', text: 'Sorry, aber du hättest es ja nicht schreiben müssen.', reaction: 'Also bin ich schuld? Nein.', heat: 10 },
        { by: 'B', kind: 'halb', text: 'Tut mir leid, dass es so blöd gelaufen ist.', reaction: 'Gelaufen? Du hast es geschickt.', heat: 10 },
      ],
      vereinbarung: [
        { by: 'A', kind: 'klar', text: 'Private Nachrichten bleiben privat. Keine Screenshots.', reaction: 'Versprochen.', heat: -15 },
        { by: 'B', kind: 'klar', text: 'Wenn ich was weiterschicken will, frag ich vorher.', reaction: 'Deal.', heat: -15 },
        { by: 'A', kind: 'klar', text: 'Wenn was schiefläuft, reden wir erst persönlich. Nicht im Chat.', reaction: 'Ja. Das ist besser.', heat: -15 },
        { by: 'B', kind: 'vage', text: 'Wir schreiben uns einfach nicht mehr.', reaction: 'Dann ist das Problem weg. Und wir auch.', heat: 6 },
        { by: 'A', kind: 'vage', text: 'Wir sind einfach vorsichtiger mit Handys.', reaction: 'Und was ist mit Screenshots?', heat: 8 },
      ],
    },
  ];
})();
