/* Inhalte: „Feed-Check“ – eigene Texte zu Online-Leben, Gerüchten, Gruppendruck und Zivilcourage.
   Erfundene App: „Glimmr“. Keine echten Marken, keine echten Personen.
   Rundentypen (Feld type):
   - fakt:  Post + 3 Kommentare. Jeder Kommentar: fakt (true = kann man nachprüfen) + why (kurze Begründung).
   - tun:   Szene (Post oder Chat) + 4 Wege. p = Punkte (3 stark, 2 gut, 1 okay, 0 riskant),
            n = Zahl danach (zahl.label, z. B. „sehen das Video“), feel = so geht es der Person (0–100), line = Folge.
   - kette: Ein Gerücht in 4 Schritten. Der Text wird immer falscher, views steigt.
            ende = so weit wäre es ohne Stopp gekommen, wahr = was wirklich war, wie = 4 Wege zum Stoppen
            (k: stark | okay | riskant).
   - druck: Gruppenchat mit Druck + 4 Antworten (k: cool = Nein + Gesicht gewahrt, hart = Nein, aber verletzend,
            ausrede = Druck kommt wieder, ja = mitgemacht) + nein = Nein-Sätze zum Mitnehmen.
   heikel: true = nur mit Freigabe der Lehrkraft (Vapes, Familie, Geld).
   Bewusst NICHT enthalten: Sexting, Nacktbilder, Selbstverletzung, Gewaltdetails. */
(function () {
  const C = (window.CREW.content = window.CREW.content || {});
  C.feed = [
    /* ================= Fakt oder Meinung? ================= */
    {
      id: 'fk01', type: 'fakt',
      post: { von: 'junglinster.news', zeit: 'vor 20 Min', text: 'Der neue Skatepark neben der Sporthalle ist offen!', bild: { art: 'foto', motiv: 'skate' }, likes: 212, cmts: 38 },
      items: [
        { von: 'mia.sk8', text: 'Der Park hat drei Rampen und eine Bowl.', fakt: true, why: 'Kann man zählen. Einfach hingehen und schauen.' },
        { von: 'jeff_lux', text: 'Das ist der beste Skatepark im ganzen Land.', fakt: false, why: '„Der beste“ ist eine Bewertung. Andere finden andere Parks besser.' },
        { von: 'nora.nr', text: 'Er ist jeden Tag bis 22 Uhr offen.', fakt: true, why: 'Steht auf dem Schild am Eingang. Das kann man prüfen.' },
      ],
    },
    {
      id: 'fk02', type: 'fakt',
      post: { von: 'kantine.lycee', zeit: 'vor 1 Std', text: 'Ab Montag gibt es jeden Tag Pizza!', bild: { art: 'foto', motiv: 'pizza' }, likes: 340, cmts: 51 },
      items: [
        { von: 'tiago.10', text: 'Pizza schmeckt einfach besser als Pasta.', fakt: false, why: 'Geschmack ist Geschmack. Da hat jede Person ihre eigene Meinung.' },
        { von: 'amira.a', text: 'Ein Stück kostet 3,50 Euro.', fakt: true, why: 'Der Preis steht auf der Karte. Das kann man prüfen.' },
        { von: 'kevin_k', text: 'Die Kantine ist total überteuert.', fakt: false, why: '„Überteuert“ ist eine Bewertung. Andere finden den Preis okay.' },
      ],
    },
    {
      id: 'fk03', type: 'fakt',
      post: { von: 'pixelpost', zeit: 'vor 2 Std', text: 'Das neue Update für Skyfall Arena ist da.', bild: { art: 'foto', motiv: 'game' }, likes: 980, cmts: 204 },
      items: [
        { von: 'dylan.gg', text: 'Das Update ist 4 Gigabyte groß.', fakt: true, why: 'Steht im App-Store. Das kann man nachprüfen.' },
        { von: 'yara.plays', text: 'Die neuen Skins sind hässlich.', fakt: false, why: '„Hässlich“ ist Geschmack. Andere finden die Skins super.' },
        { von: 'milan_m', text: 'Es gibt jetzt einen Modus für 50 Leute.', fakt: true, why: 'Das kann man im Spiel sehen und testen.' },
      ],
    },
    {
      id: 'fk04', type: 'fakt',
      post: { von: 'fouer.info', zeit: 'vor 3 Std', text: 'Die Schueberfouer startet am Freitag!', bild: { art: 'foto', motiv: 'fouer' }, likes: 1450, cmts: 96 },
      items: [
        { von: 'lena.lux', text: 'Die Fouer geht bis zum 11. September.', fakt: true, why: 'Das Datum steht im Programm. Das kann man prüfen.' },
        { von: 'rui.r', text: 'Die Fouer ist nur was für Kinder.', fakt: false, why: 'Das sieht Rui so. Viele Erwachsene lieben die Fouer.' },
        { von: 'sara.s', text: 'Da gibt es die besten Gromperekichelcher im Land.', fakt: false, why: '„Die besten“ ist Geschmack. Da darf jede Person anders denken.' },
      ],
    },
    {
      id: 'fk05', type: 'fakt',
      post: { von: 'tech.tom', zeit: 'Werbung', text: 'Die neuen Bassline-X-Kopfhörer sind da! #Werbung', bild: { art: 'foto', motiv: 'kopfhoerer' }, likes: 3100, cmts: 412 },
      items: [
        { von: 'elias.e', text: 'Man bekommt sie in Schwarz und in Weiß.', fakt: true, why: 'Das sieht man im Shop. Das kann man prüfen.' },
        { von: 'jana.j', text: 'Die sind viel zu teuer für so einen Sound.', fakt: false, why: 'Ob etwas zu teuer ist, findet jede Person anders.' },
        { von: 'tech.tom', text: 'Das sind die besten Kopfhörer der Welt!', fakt: false, why: 'Werbung klingt oft wie ein Fakt. Ist aber eine Meinung.' },
      ],
    },
    {
      id: 'fk06', type: 'fakt',
      post: { von: 'annexe.news', zeit: 'vor 5 Std', text: 'Praktikumsbörse am Dienstag in der Aula.', bild: { art: 'foto', motiv: 'job' }, likes: 64, cmts: 12 },
      items: [
        { von: 'noah.n', text: 'Es kommen 12 Betriebe aus der Region.', fakt: true, why: 'Die Liste hängt am Eingang. Das kann man zählen.' },
        { von: 'aylin.y', text: 'Ein Praktikum im Büro ist öde.', fakt: false, why: 'Manche lieben Büro-Arbeit. Das ist Geschmackssache.' },
        { von: 'luca.l', text: 'Die Börse geht von 9 bis 12 Uhr.', fakt: true, why: 'Die Uhrzeit steht im Post. Das kann man prüfen.' },
      ],
    },
    {
      id: 'fk07', type: 'fakt',
      post: { von: 'sport.lux', zeit: 'vor 30 Min', text: 'Heute Abend: Luxemburg gegen Portugal!', bild: { art: 'foto', motiv: 'stadion' }, likes: 2200, cmts: 530 },
      items: [
        { von: 'rui.r', text: 'Portugal gewinnt sowieso. Keine Chance.', fakt: false, why: 'Das ist eine Vermutung. Nach dem Spiel weiß man mehr.' },
        { von: 'jeff_lux', text: 'Das Spiel beginnt um 20:45 Uhr.', fakt: true, why: 'Die Uhrzeit steht auf dem Ticket. Das kann man prüfen.' },
        { von: 'emir.e', text: 'Das Stadion hat über 9000 Plätze.', fakt: true, why: 'Das kann man nachlesen oder nachzählen.' },
      ],
    },
    {
      id: 'fk08', type: 'fakt',
      post: { von: 'kirchberg.daily', zeit: 'vor 4 Std', text: 'Im Shopping-Center Kirchberg macht ein neuer Laden auf.', bild: { art: 'foto', motiv: 'shop' }, likes: 410, cmts: 77 },
      items: [
        { von: 'emir.e', text: 'Der Laden öffnet am 3. Oktober.', fakt: true, why: 'Das Datum steht am Schaufenster. Das kann man prüfen.' },
        { von: 'lara.l', text: 'Da wird bestimmt alles voll teuer.', fakt: false, why: 'Das ist eine Vermutung. Man weiß es erst, wenn er offen ist.' },
        { von: 'dylan.gg', text: 'Wir bräuchten eher ein Kino.', fakt: false, why: 'Das wünscht sich Dylan. Andere wollen etwas anderes.' },
      ],
    },

    /* ================= Was machst du? ================= */
    {
      id: 'tu01', type: 'tun', ziel: 'Mia',
      lage: 'Im Klassenchat taucht ein Video von Mia auf.',
      szene: { art: 'chat', name: '9B Chaos', sub: '24 Mitglieder', msgs: [
        { von: 'Kevin', media: { art: 'video', text: 'Mia beim Sport, lol' } },
        { von: 'Kevin', text: 'Wie sie hinfällt, hahaha' },
        { von: 'Dylan', text: 'Schick das mal an die 9A!' },
      ] },
      zahl: { label: 'sehen das Video', start: 24 },
      opts: [
        { t: 'Weiterleiten. Ist doch nur Spaß.', p: 0, n: 380, feel: 8, line: 'Jetzt kennt die halbe Schule das Video. Mia will morgen nicht kommen.' },
        { t: 'Nichts tun und weiterscrollen.', p: 1, n: 150, feel: 28, line: 'Du machst nichts Schlimmes. Aber das Video wandert trotzdem weiter.' },
        { t: 'In den Chat: „Löscht das. Das ist nicht cool.“', p: 3, n: 30, feel: 62, line: 'Zwei andere schreiben „Stimmt“. Kevin löscht das Video.' },
        { t: 'Mia privat: „Hab das Video gesehen. Soll ich wem Bescheid sagen?“', p: 3, n: 60, feel: 74, line: 'Mia fühlt sich nicht allein. Zusammen gehen sie zur Lehrerin.' },
      ],
    },
    {
      id: 'tu02', type: 'tun', ziel: 'Lena',
      lage: 'Jemand hat einen Fake-Account über Lena gemacht.',
      szene: { art: 'post', von: 'lena_ist_peinlich', zeit: 'vor 1 Std', text: 'Lenas peinlichste Momente. Folgt für mehr!', bild: { art: 'meme', text: 'LENA, ABER PEINLICH' }, likes: 41, cmts: 12 },
      zahl: { label: 'folgen dem Account', start: 40 },
      opts: [
        { t: 'Folgen, um zu sehen, was noch kommt.', p: 0, n: 260, feel: 10, line: 'Mehr Follower, mehr Posts. Der Fake-Account wird immer größer.' },
        { t: 'Den Account bei Glimmr melden.', p: 2, n: 120, feel: 45, line: 'Gut! Glimmr prüft den Account. Das kann aber ein paar Tage dauern.' },
        { t: 'Screenshots machen und einer erwachsenen Person zeigen.', p: 3, n: 45, feel: 72, line: 'Die Schule kümmert sich. Nach zwei Tagen ist der Account weg.' },
        { t: 'Kommentieren: „Wer das macht, ist erbärmlich!“', p: 1, n: 200, feel: 35, line: 'Mutig gemeint. Aber jetzt gibt es Streit, und mehr Leute schauen hin.' },
      ],
    },
    {
      id: 'tu03', type: 'tun', ziel: 'Yara',
      lage: 'Im Chat für die Klassenfahrt wird etwas geplant.',
      szene: { art: 'chat', name: 'Klassenfahrt 9B', sub: '19 Mitglieder', msgs: [
        { von: 'Noah', text: 'Machen wir eine neue Gruppe? Ohne Yara.' },
        { von: 'Aylin', text: 'Ja, die nervt eh.' },
        { von: 'Luca', text: 'Wer ist dafür? Daumen hoch!' },
      ] },
      zahl: { label: 'sind dafür', start: 3 },
      opts: [
        { t: 'Daumen hoch. Ist ja nur ein Chat.', p: 0, n: 18, feel: 8, line: 'Yara merkt es am nächsten Tag. Auf der Fahrt sitzt sie allein.' },
        { t: 'Nichts schreiben.', p: 1, n: 12, feel: 28, line: 'Die neue Gruppe kommt trotzdem. Schweigen wirkt hier wie ein Ja.' },
        { t: 'Schreiben: „Nö. Wenn es Stress gibt, redet mit ihr.“', p: 3, n: 4, feel: 60, line: 'Zwei andere sagen auch Nein. Die Idee ist vom Tisch.' },
        { t: 'Yara fragen, ob sie auf der Fahrt neben dir sitzt.', p: 2, n: 12, feel: 70, line: 'Die Gruppe gibt es trotzdem. Aber Yara hat jemanden an ihrer Seite.' },
      ],
    },
    {
      id: 'tu04', type: 'tun', ziel: 'Rui',
      lage: 'Eine anonyme Seite postet etwas über Rui.',
      szene: { art: 'post', von: 'lycee.geheimnisse', zeit: 'vor 12 Min', text: 'Rui hat im Supermarkt geklaut. Echt jetzt!', likes: 64, cmts: 18, kommentare: [
        { von: 'user_4821', text: 'wusste ich schon immer' },
        { von: 'x.shadow.x', text: 'krass, wer noch?' },
      ] },
      zahl: { label: 'sehen den Post', start: 90 },
      opts: [
        { t: 'Liken und kommentieren: „Wusste ich!“', p: 0, n: 420, feel: 6, line: 'Dein Kommentar macht es glaubwürdiger. Jetzt glauben es noch mehr.' },
        { t: 'Rui fragen: „Da geht was über dich rum. Alles okay?“', p: 3, n: 150, feel: 70, line: 'Rui kann es erklären. Er merkt: Jemand hält zu ihm.' },
        { t: 'Den Post melden: Mobbing.', p: 2, n: 160, feel: 45, line: 'Glimmr prüft den Post. Einige haben ihn aber schon gesehen.' },
        { t: 'Nichts machen.', p: 1, n: 300, feel: 22, line: 'Der Post läuft weiter. Keiner stoppt ihn.' },
      ],
    },
    {
      id: 'tu05', type: 'tun', ziel: 'Emir',
      lage: 'Emir hat sein Handy offen liegen lassen.',
      szene: { art: 'chat', name: 'Pause', sub: '6 Mitglieder', msgs: [
        { von: 'Jeff', text: 'Emirs Handy ist offen, haha.' },
        { von: 'Jeff', text: 'Wir posten was Peinliches von seinem Account!' },
        { von: 'Sara', text: 'Ja! Schnell, bevor er zurückkommt.' },
      ] },
      zahl: { label: 'sehen den Fake-Post', start: 0 },
      opts: [
        { t: 'Mitlachen und Ideen geben.', p: 0, n: 310, feel: 8, line: 'Der Post geht online. Emir muss sich vor allen erklären.' },
        { t: 'Sagen: „Lasst das. Das ist sein Account.“', p: 3, n: 0, feel: 70, line: 'Jeff legt das Handy weg. Emir merkt nicht mal was.' },
        { t: 'Emir holen: „Dein Handy liegt offen.“', p: 3, n: 0, feel: 78, line: 'Emir sperrt sein Handy. Er ist dir echt dankbar.' },
        { t: 'Weggehen. Nicht mein Problem.', p: 1, n: 310, feel: 20, line: 'Du bist raus. Aber der Post geht trotzdem online.' },
      ],
    },
    {
      id: 'tu06', type: 'tun', ziel: 'Inês',
      lage: 'Inês hat einen Tanz-Clip gepostet. Die Kommentare sind fies.',
      szene: { art: 'post', von: 'ines.dance', zeit: 'vor 40 Min', text: 'Mein erster Tanz-Clip! Seid nett.', bild: { art: 'video', text: 'Tanz-Clip · 0:21' }, likes: 23, cmts: 9, kommentare: [
        { von: 'user_4821', text: 'cringe' },
        { von: 'x.shadow.x', text: 'Wer schaut sowas?' },
      ] },
      zahl: { label: 'fiese Kommentare', start: 6 },
      opts: [
        { t: 'Auch was Fieses schreiben. Machen ja alle.', p: 0, n: 25, feel: 5, line: 'Noch ein fieser Kommentar mehr. Inês löscht ihr Video.' },
        { t: 'Einen netten Kommentar schreiben.', p: 3, n: 6, feel: 68, line: 'Andere trauen sich jetzt auch. Plötzlich stehen da viele nette Kommentare.' },
        { t: 'Die fiesen Kommentare melden.', p: 2, n: 3, feel: 52, line: 'Ein paar Kommentare werden gelöscht. Gute Sache.' },
        { t: 'Nichts machen, nur mitlesen.', p: 1, n: 15, feel: 25, line: 'Die fiesen Kommentare bleiben stehen. Inês liest sie alle.' },
      ],
    },
    {
      id: 'tu07', type: 'tun', ziel: 'Jana',
      lage: 'Luca teilt einen privaten Chat von Jana.',
      szene: { art: 'chat', name: '9B Chaos', sub: '24 Mitglieder', msgs: [
        { von: 'Luca', text: 'Schaut mal, was Jana mir geschrieben hat.' },
        { von: 'Luca', media: { art: 'screen', text: 'Ich hab voll Angst vor der Prüfung …' } },
        { von: 'Kevin', text: 'Hahaha, Baby.' },
      ] },
      zahl: { label: 'sehen den Screenshot', start: 24 },
      opts: [
        { t: 'Den Screenshot in eine andere Gruppe schicken.', p: 0, n: 140, feel: 6, line: 'Jetzt lachen noch mehr Leute. Jana vertraut niemandem mehr.' },
        { t: 'Luca schreiben: „Das war privat. Lösch das.“', p: 3, n: 24, feel: 62, line: 'Luca löscht es. Ein paar Leute schreiben: „Stimmt.“' },
        { t: 'Jana warnen: „Luca hat deinen Chat geteilt.“', p: 2, n: 40, feel: 48, line: 'Jana ist verletzt. Aber sie weiß Bescheid und ist nicht allein.' },
        { t: 'Nichts sagen.', p: 1, n: 70, feel: 22, line: 'Der Screenshot bleibt im Chat. Jeder kann ihn weiterschicken.' },
      ],
    },
    {
      id: 'tu08', type: 'tun', ziel: 'Milan',
      lage: 'Jemand hat eine Umfrage in die Story gestellt.',
      szene: { art: 'post', von: 'lycee.rankings', zeit: 'Story · vor 2 Std', text: 'Wer ist der nervigste Mensch der 9B? Stimmt ab!', bild: { art: 'umfrage', opts: ['Milan', 'Jeff', 'Nora'] }, likes: 38, cmts: 14 },
      zahl: { label: 'Stimmen', start: 38 },
      opts: [
        { t: 'Mitvoten. Ist nur Spaß.', p: 0, n: 120, feel: 8, line: 'Milan ist auf Platz 1. Er tut so, als wäre es ihm egal.' },
        { t: 'Die Umfrage melden.', p: 2, n: 60, feel: 45, line: 'Die Story verschwindet bald. Einige haben aber schon abgestimmt.' },
        { t: 'Kommentieren: „Voll daneben. Macht das weg.“', p: 3, n: 45, feel: 65, line: 'Andere schreiben das auch. Die Umfrage wird gelöscht.' },
        { t: 'Nicht abstimmen, weiterscrollen.', p: 1, n: 100, feel: 25, line: 'Du machst nicht mit. Aber die Umfrage läuft weiter.' },
      ],
    },
    {
      id: 'tu09', type: 'tun', ziel: 'Sara', heikel: true,
      lage: 'Emir postet ein Foto von Saras Jacke.',
      szene: { art: 'post', von: 'emir.e', zeit: 'vor 8 Min', text: 'Second-Hand-Queen, lol. Wo kauft sie sowas?', bild: { art: 'foto', motiv: 'jacke' }, likes: 19, cmts: 7 },
      zahl: { label: 'Likes', start: 19 },
      opts: [
        { t: 'Liken. Ist halt lustig.', p: 0, n: 80, feel: 8, line: 'Mehr Likes, mehr Kommentare. Sara zieht die Jacke nicht mehr an.' },
        { t: 'Kommentieren: „Die Jacke ist cool. Lass sie in Ruhe.“', p: 3, n: 22, feel: 66, line: 'Andere stimmen zu. Emir löscht den Post.' },
        { t: 'Sara schreiben: „Achte nicht drauf. Du bist top.“', p: 2, n: 40, feel: 60, line: 'Der Post bleibt online. Aber Sara weiß: Du stehst hinter ihr.' },
        { t: 'Einfach nichts machen.', p: 1, n: 50, feel: 25, line: 'Der Post bleibt. Sara liest jeden Kommentar.' },
      ],
    },
    {
      id: 'tu10', type: 'tun', ziel: 'Tiago',
      lage: 'Ein Kettenbrief macht im Team-Chat die Runde.',
      szene: { art: 'chat', name: 'Fussball U15', sub: '16 Mitglieder', msgs: [
        { von: 'Elias', text: 'WARNUNG! Morgen wird jeder Glimmr-Account gehackt!' },
        { von: 'Elias', text: 'Schick das an 10 Leute, sonst ist dein Account weg.' },
        { von: 'Tiago', text: 'Oh nein. Hab es schon weitergeschickt!' },
      ] },
      zahl: { label: 'bekommen die Nachricht', start: 16 },
      opts: [
        { t: 'Schnell an 10 Leute schicken. Sicher ist sicher.', p: 0, n: 900, feel: 20, line: 'Jetzt haben noch mehr Leute Angst. Gehackt wird natürlich niemand.' },
        { t: 'Schreiben: „Das ist ein Fake. Sowas kommt jedes Jahr.“', p: 3, n: 40, feel: 72, line: 'Tiago ist erleichtert. Die Kette endet hier.' },
        { t: 'Einfach löschen.', p: 2, n: 200, feel: 40, line: 'Bei dir endet die Kette. Die anderen haben aber noch Angst.' },
        { t: 'Im Netz suchen, ob das stimmt.', p: 2, n: 120, feel: 50, line: 'Du findest raus: Fake. Gut geprüft! Jetzt noch der Gruppe sagen.' },
      ],
    },

    /* ================= Gerücht-Kette ================= */
    {
      id: 'ke01', type: 'kette', ziel: 'Lara',
      chat: { name: '9B Chaos', sub: '24 Mitglieder' },
      steps: [
        { von: 'Jeff', text: 'Lara hat im Test aufs Handy geschaut.', views: 4 },
        { von: 'Aylin', text: 'Lara hat beim Test geschummelt!', views: 18 },
        { von: 'Dylan', text: 'Lara hat die Lösungen geklaut.', views: 75 },
        { von: 'Kevin', text: 'Lara fliegt von der Schule. Sagen alle.', views: 260 },
      ],
      ende: { text: 'Die Polizei war wegen Lara in der Schule!!', views: 900 },
      wahr: 'Lara hat nur auf die Uhr geschaut. Die Lehrerin hat es erlaubt.',
      wie: [
        { t: 'Nicht weiterleiten.', k: 'okay', line: 'Bei dir endet es. Gut! Aber im Chat läuft es weiter.' },
        { t: 'Im Chat fragen: „Warst du dabei? Woher weißt du das?“', k: 'stark', line: 'Keiner war dabei. Das Gerücht wirkt plötzlich ziemlich dünn.' },
        { t: 'Lara schreiben: „Da geht was rum. Alles okay?“', k: 'stark', line: 'Lara kann es aufklären. Und sie weiß, wer zu ihr hält.' },
        { t: 'Mit „krass lol“ antworten.', k: 'riskant', line: 'Klingt harmlos. Aber es zeigt: Das Thema ist spannend. Es geht weiter.' },
      ],
    },
    {
      id: 'ke02', type: 'kette', ziel: 'Noah',
      chat: { name: 'Jugendhaus Crew', sub: '31 Mitglieder' },
      steps: [
        { von: 'Mia', text: 'Noah hatte Stress im Jugendhaus.', views: 5 },
        { von: 'Tiago', text: 'Noah hat sich im Jugendhaus geprügelt.', views: 20 },
        { von: 'Sara', text: 'Noah hat jemanden verletzt. Voll brutal.', views: 80 },
        { von: 'Elias', text: 'Noah hat jetzt überall Hausverbot.', views: 300 },
      ],
      ende: { text: 'Noah wird angezeigt. Hundert Prozent!', views: 1100 },
      wahr: 'Noah hat mit einem Betreuer laut diskutiert. Am nächsten Tag war alles geklärt.',
      wie: [
        { t: 'Screenshot machen und einer Lehrkraft zeigen.', k: 'stark', line: 'Die Lehrkraft spricht mit der Klasse. Das Gerücht verliert seine Kraft.' },
        { t: 'Mit einem Fragezeichen weiterleiten.', k: 'riskant', line: 'Ein Fragezeichen stoppt nichts. Jetzt ist es in noch einem Chat.' },
        { t: 'Schreiben: „Leute, wir wissen gar nichts. Lasst das.“', k: 'stark', line: 'Ein paar hören auf. Einer schreibt: „Stimmt, war ja keiner dabei.“' },
        { t: 'Den Chat stumm schalten.', k: 'okay', line: 'Du hast deine Ruhe. Das Gerücht läuft aber weiter.' },
      ],
    },
    {
      id: 'ke03', type: 'kette', ziel: 'Elias',
      chat: { name: 'Lycée Junglinster', sub: '58 Mitglieder' },
      steps: [
        { von: 'Nora', text: 'Der Feueralarm heute war kein Test.', views: 6 },
        { von: 'Rui', text: 'Jemand aus der 9B hat den Alarm gedrückt.', views: 25 },
        { von: 'Inês', text: 'Es war Elias. Hat Rui gesagt.', views: 90 },
        { von: 'Luca', text: 'Elias hat es zugegeben. Er fliegt raus.', views: 320 },
      ],
      ende: { text: 'Elias muss 5000 Euro Strafe zahlen!!', views: 1200 },
      wahr: 'Der Alarm war ein Defekt. Das hat der Hausmeister später gesagt.',
      wie: [
        { t: 'Rui fragen: „Hast du das gesehen oder nur gehört?“', k: 'stark', line: 'Rui gibt zu: nur gehört. Die Kette bekommt einen Knick.' },
        { t: 'Nicht weiterleiten.', k: 'okay', line: 'Bei dir endet es. Gut! Aber andere schicken es weiter.' },
        { t: 'Elias warnen: „Da geht was über dich rum.“', k: 'stark', line: 'Elias kann es klarstellen. Er ist froh, dass du Bescheid sagst.' },
        { t: 'Ein Meme dazu posten.', k: 'riskant', line: 'Das Meme wird geteilt. Jetzt glauben es noch mehr Leute.' },
      ],
    },
    {
      id: 'ke04', type: 'kette', ziel: 'Dylan',
      chat: { name: 'Skyfall Squad', sub: '12 Mitglieder' },
      steps: [
        { von: 'Milan', text: 'Dylan war gestern mega gut in Skyfall.', views: 5 },
        { von: 'Yara', text: 'Dylan hat bestimmt einen Cheat.', views: 22 },
        { von: 'Kevin', text: 'Dylan cheatet. Hundert Prozent.', views: 85 },
        { von: 'Jeff', text: 'Dylan wurde gebannt, weil er cheatet.', views: 340 },
      ],
      ende: { text: 'Dylan hackt Accounts! Passt auf!!', views: 1300 },
      wahr: 'Dylan hat einfach viel geübt. Sein Account ist ganz normal.',
      wie: [
        { t: 'Fragen: „Habt ihr Beweise? Oder nur ein Gefühl?“', k: 'stark', line: 'Keiner hat Beweise. Ein paar merken: Das war nur Neid.' },
        { t: 'Mit Dylan zocken und selbst schauen.', k: 'stark', line: 'Du siehst: Er ist einfach gut. Das sagst du auch im Chat.' },
        { t: 'Nicht mehr mitlesen.', k: 'okay', line: 'Du bist raus. Das Gerücht wächst aber weiter.' },
        { t: '„Cheater!“ unter Dylans Clip schreiben.', k: 'riskant', line: 'Jetzt steht es öffentlich da. Noch mehr Leute glauben es.' },
      ],
    },
    {
      id: 'ke05', type: 'kette', ziel: 'Tiago', heikel: true,
      chat: { name: '9B Chaos', sub: '24 Mitglieder' },
      steps: [
        { von: 'Lena', text: 'Tiago war heute voll still.', views: 4 },
        { von: 'Aylin', text: 'Bei Tiago zu Hause gibt es Stress.', views: 18 },
        { von: 'Noah', text: 'Tiagos Eltern trennen sich.', views: 70 },
        { von: 'Mia', text: 'Tiago zieht weg und wechselt die Schule.', views: 250 },
      ],
      ende: { text: 'Tiago kommt nie wieder. Sagen alle.', views: 950 },
      wahr: 'Tiago hatte schlecht geschlafen. Sein Hund war krank.',
      wie: [
        { t: 'Tiago fragen: „Alles okay bei dir?“', k: 'stark', line: 'Tiago erzählt vom Hund. Er freut sich, dass jemand fragt.' },
        { t: 'Schreiben: „Das ist privat. Hört auf zu raten.“', k: 'stark', line: 'Ein paar hören auf. Das Raten wird weniger.' },
        { t: 'Nicht weiterleiten.', k: 'okay', line: 'Bei dir endet es. Gut! Aber andere raten weiter.' },
        { t: 'Fragen: „Echt? Was weißt du noch?“', k: 'riskant', line: 'Neugier ist Futter für Gerüchte. Jetzt wird noch mehr erfunden.' },
      ],
    },
    {
      id: 'ke06', type: 'kette', ziel: 'die Kantine',
      chat: { name: 'Lycée Junglinster', sub: '58 Mitglieder' },
      steps: [
        { von: 'Amira', text: 'In der Kantine war heute eine Maus.', views: 8 },
        { von: 'Emir', text: 'Die Kantine hat Mäuse. Überall!', views: 30 },
        { von: 'Lena', text: 'Die Kantine wird geschlossen.', views: 110 },
        { von: 'Rui', text: 'Ab morgen gibt es kein Essen mehr an der Schule.', views: 400 },
      ],
      ende: { text: 'Die ganze Schule macht zu!!', views: 1500 },
      wahr: 'Die „Maus“ war ein Spielzeug. Jemand hat einen Scherz gemacht.',
      wie: [
        { t: 'In der Kantine nachfragen.', k: 'stark', line: 'Die Köchin lacht. Sie zeigt dir die Spielzeug-Maus.' },
        { t: 'Fragen: „Hat jemand ein Foto? Oder nur gehört?“', k: 'stark', line: 'Kein Foto. Nur gehört. Das Gerücht fällt in sich zusammen.' },
        { t: 'Nicht weiterleiten.', k: 'okay', line: 'Bei dir endet es. Gut! Aber andere schicken es weiter.' },
        { t: 'Schreiben: „Ihhh, ich ess da nie wieder!“', k: 'riskant', line: 'Dein Ekel steckt an. Jetzt glauben es noch mehr.' },
      ],
    },

    /* ================= Gruppendruck ================= */
    {
      id: 'dr01', type: 'druck',
      lage: 'Deine Leute planen eine Mutprobe.',
      chat: { name: 'Squad', sub: '5 Mitglieder' },
      msgs: [
        { von: 'Emir', text: 'Heute 17 Uhr: Challenge aufs Parkhausdach!' },
        { von: 'Luca', text: 'Wer es filmt, wird Glimmr-famous.' },
        { von: 'Dylan', text: 'Du kommst doch, oder? Oder hast du Angst?' },
      ],
      opts: [
        { t: 'Nee, Krankenhaus steht nicht auf meiner Liste. Döner danach?', k: 'cool', antwort: { von: 'Emir', text: 'Haha okay. Döner geht klar.' }, line: 'Klares Nein. Mit Humor. Und beim Döner bist du trotzdem dabei.' },
        { t: 'Seid ihr dumm? Das ist voll gefährlich!', k: 'hart', antwort: { von: 'Dylan', text: 'Chill mal, Mama.' }, line: 'Dein Nein ist klar. Aber jetzt fühlen sich alle angegriffen.' },
        { t: 'Kann heute nicht. Muss zu meiner Oma.', k: 'ausrede', antwort: { von: 'Emir', text: 'Dann machen wir es Samstag!' }, line: 'Heute bist du raus. Aber am Samstag kommt der Druck wieder.' },
        { t: 'Okay … bin dabei.', k: 'ja', antwort: { von: 'Luca', text: 'Legende!' }, line: 'Du bist dabei. Aber willst du das wirklich? Das Risiko trägst du.' },
      ],
      nein: ['Nee, ich bin raus. Viel Spaß, ich bleib unten.', 'Meine Knochen brauch ich noch.', 'Nicht mein Ding. Wir sehen uns danach.'],
    },
    {
      id: 'dr02', type: 'druck',
      lage: 'Im Klassenchat wird Schwänzen geplant.',
      chat: { name: '9B Chaos', sub: '24 Mitglieder' },
      msgs: [
        { von: 'Tiago', text: 'Morgen die ersten zwei Stunden schwänzen? Fouer!' },
        { von: 'Lena', text: 'Alle kommen mit, echt jetzt.' },
        { von: 'Tiago', text: 'Sei kein Langweiler. Du kommst!' },
      ],
      opts: [
        { t: 'Morgen nicht. Aber Samstag Fouer mit allen? Bin dabei!', k: 'cool', antwort: { von: 'Lena', text: 'Samstag ist eh besser. Deal!' }, line: 'Nein zum Schwänzen. Ja zur Fouer. Das kommt gut an.' },
        { t: 'Ihr seid so kindisch. Ohne mich.', k: 'hart', antwort: { von: 'Tiago', text: 'Uff. Dann halt nicht, Streber.' }, line: 'Dein Nein ist klar. Aber „kindisch“ kommt als Angriff an.' },
        { t: 'Mal sehen …', k: 'ausrede', antwort: { von: 'Tiago', text: 'Also ja! 8 Uhr an der Gare.' }, line: '„Mal sehen“ klingt wie Ja. Morgen wird Nein sagen schwerer.' },
        { t: 'Okay, ich komm mit.', k: 'ja', antwort: { von: 'Lena', text: 'Nice!' }, line: 'Du bist dabei. Morgen gibt es wohl Ärger mit der Schule.' },
      ],
      nein: ['Morgen nicht. Samstag gern.', 'Ich bin raus, aber viel Spaß.', 'Nee, auf Stress mit der Schule hab ich keinen Bock.'],
    },
    {
      id: 'dr03', type: 'druck', heikel: true,
      lage: 'In der Pause hinter der Sporthalle.',
      chat: { name: 'Pause hinten', sub: '4 Mitglieder' },
      msgs: [
        { von: 'Aylin', text: 'Komm hinter die Sporthalle. Ich hab eine Vape.' },
        { von: 'Kevin', text: 'Schmeckt nach Mango. Ist nur Dampf, voll harmlos.' },
        { von: 'Aylin', text: 'Alle probieren. Du auch, oder?' },
      ],
      opts: [
        { t: 'Nee danke. Ich bleib bei Mango-Eistee.', k: 'cool', antwort: { von: 'Kevin', text: 'Haha, fair.' }, line: 'Klares Nein. Locker gesagt. Keiner hat ein Problem damit.' },
        { t: 'Ihh, das ist eklig. Ihr seid doch süchtig.', k: 'hart', antwort: { von: 'Aylin', text: 'Okay, dann bleib halt weg.' }, line: 'Dein Nein ist klar. Aber jetzt ist die Stimmung im Keller.' },
        { t: 'Vielleicht später.', k: 'ausrede', antwort: { von: 'Aylin', text: 'Okay, später dann!' }, line: '„Später“ heißt: Die Frage kommt garantiert wieder.' },
        { t: 'Okay, einmal ziehen.', k: 'ja', antwort: { von: 'Kevin', text: 'Siehste, easy.' }, line: 'Einmal bleibt oft nicht einmal. Nikotin macht schnell abhängig.' },
      ],
      nein: ['Nee, nicht mein Ding.', 'Brauch ich nicht. Aber ich chill trotzdem mit euch.', 'Nein danke. Meine Lunge will noch Fußball spielen.'],
    },
    {
      id: 'dr04', type: 'druck', heikel: true,
      lage: 'Deine Freunde wollen, dass du etwas für sie kaufst.',
      chat: { name: 'Wochenende', sub: '3 Mitglieder' },
      msgs: [
        { von: 'Jeff', text: 'Du siehst älter aus. Kauf uns zwei Vapes?' },
        { von: 'Rui', text: 'Wir geben dir das Geld. Easy.' },
        { von: 'Jeff', text: 'Komm schon, sei kein Frosch.' },
      ],
      opts: [
        { t: 'Nee, ich lass mich nicht erwischen. Holen wir lieber Pizza?', k: 'cool', antwort: { von: 'Rui', text: 'Haha, Pizza ist eh besser.' }, line: 'Nein gesagt, Alternative gezeigt. So bleibt die Stimmung gut.' },
        { t: 'Ich bin doch nicht euer Dealer!', k: 'hart', antwort: { von: 'Jeff', text: 'Chill, war nur eine Frage.' }, line: 'Das Nein kommt an. Aber etwas zu laut.' },
        { t: 'Hab grad kein Geld dabei.', k: 'ausrede', antwort: { von: 'Rui', text: 'Wir geben dir doch Geld!' }, line: 'Die Ausrede zieht nicht. Jetzt musst du doch Nein sagen.' },
        { t: 'Na gut, gebt her.', k: 'ja', antwort: { von: 'Jeff', text: 'Yes! Danke dir!' }, line: 'Wenn du erwischt wirst, hast du den Ärger. Nicht die anderen.' },
      ],
      nein: ['Nee, da mach ich nicht mit.', 'Macht das selbst. Ich bin raus.', 'Nee, ich will keinen Stress im Laden.'],
    },
    {
      id: 'dr05', type: 'druck',
      lage: 'Im Bus soll jemand heimlich gefilmt werden.',
      chat: { name: 'Bus nach Hause', sub: '7 Mitglieder' },
      msgs: [
        { von: 'Milan', text: 'Film mal, wie der Busfahrer schimpft. Wird viral!' },
        { von: 'Sara', text: 'Stell es auf Glimmr, bitte!' },
        { von: 'Milan', text: 'Los, du sitzt ganz vorne!' },
      ],
      opts: [
        { t: 'Nee, ich film keine Leute heimlich. Will ich selbst auch nicht.', k: 'cool', antwort: { von: 'Sara', text: 'Hm. Stimmt eigentlich.' }, line: 'Nein mit Begründung. Das bringt die anderen zum Nachdenken.' },
        { t: 'Ihr seid so peinlich.', k: 'hart', antwort: { von: 'Milan', text: 'Und du bist langweilig.' }, line: 'Dein Nein ist klar. Aber jetzt geht es nur noch um Beleidigungen.' },
        { t: 'Mein Akku ist leer.', k: 'ausrede', antwort: { von: 'Milan', text: 'Dann nimm mein Handy!' }, line: 'Die Ausrede ist schnell weg. Jetzt stehst du wieder da.' },
        { t: 'Okay, ich film.', k: 'ja', antwort: { von: 'Sara', text: 'Yesss!' }, line: 'Heimlich filmen und posten ist nicht erlaubt. Das kann richtig Ärger geben.' },
      ],
      nein: ['Nee, heimlich filmen ist nicht mein Ding.', 'Ich will auch nicht gefilmt werden. Also nein.', 'Lass mal. Der hat auch so schon einen schlechten Tag.'],
    },
    {
      id: 'dr06', type: 'druck',
      lage: 'Im Chat soll jemand „geroastet“ werden.',
      chat: { name: '9B Chaos', sub: '24 Mitglieder' },
      msgs: [
        { von: 'Luca', text: 'Heute machen wir einen Roast über Elias.' },
        { von: 'Dylan', text: 'Jeder schreibt was Fieses über ihn.' },
        { von: 'Luca', text: 'Du bist dran. Was richtig Lustiges!' },
      ],
      opts: [
        { t: 'Ich pass. Roasten wir lieber den Montag.', k: 'cool', antwort: { von: 'Dylan', text: 'Haha, der Montag hat es verdient.' }, line: 'Nein gesagt, mit Witz. Und Elias bleibt verschont.' },
        { t: 'Ihr seid voll die Mobber.', k: 'hart', antwort: { von: 'Luca', text: 'Übertreib mal nicht.' }, line: 'Stimmt vielleicht. Aber so machen alle dicht.' },
        { t: 'Mir fällt grad nichts ein.', k: 'ausrede', antwort: { von: 'Luca', text: 'Dann schreib einfach „Loser“.' }, line: 'Die Ausrede hilft nicht. Jetzt hast du sogar einen Vorschlag bekommen.' },
        { t: 'Okay, ich schreib auch was.', k: 'ja', antwort: { von: 'Dylan', text: 'Haha, top!' }, line: 'Elias liest alles. Auch deinen Satz.' },
      ],
      nein: ['Ich pass.', 'Nicht mit mir. Elias hat euch nichts getan.', 'Roasten wir lieber den Montag.'],
    },
    {
      id: 'dr07', type: 'druck',
      lage: 'Nach dem Training gibt es eine Challenge.',
      chat: { name: 'Fussball U15', sub: '16 Mitglieder' },
      msgs: [
        { von: 'Kevin', text: 'Challenge: vier Energy-Drinks in zehn Minuten!' },
        { von: 'Emir', text: 'Wer es nicht schafft, zahlt Pizza.' },
        { von: 'Kevin', text: 'Du bist dabei, oder?' },
      ],
      opts: [
        { t: 'Nee, mein Herz soll heute normal schlagen. Pizza zahl ich selbst.', k: 'cool', antwort: { von: 'Emir', text: 'Haha, fair.' }, line: 'Nein mit Humor. Pizza gibt es trotzdem.' },
        { t: 'Das ist voll dumm. Ihr kriegt einen Herzinfarkt.', k: 'hart', antwort: { von: 'Kevin', text: 'Oh Mann, Spaßbremse.' }, line: 'Dein Nein ist klar. Aber so hört dir keiner zu.' },
        { t: 'Hab Bauchweh.', k: 'ausrede', antwort: { von: 'Kevin', text: 'Dann nächste Woche!' }, line: 'Heute bist du raus. Nächste Woche kommt die Frage wieder.' },
        { t: 'Okay, her damit.', k: 'ja', antwort: { von: 'Emir', text: 'Los geht es!' }, line: 'Nach Dose drei rast dein Herz. Dir wird richtig schlecht.' },
      ],
      nein: ['Nee, mein Herz braucht das nicht.', 'Ich mach nicht mit. Aber zur Pizza bleib ich.', 'Nee danke. Ich will heute Nacht schlafen.'],
    },
    {
      id: 'dr08', type: 'druck',
      lage: 'Jemand will dein Passwort.',
      chat: { name: 'Nora', sub: 'online', privat: true },
      msgs: [
        { von: 'Nora', text: 'Gib mir dein Glimmr-Passwort. Ich hol dir 1000 Follower!' },
        { von: 'Nora', text: 'Hab ich bei Yara auch gemacht. Klappt voll.' },
        { von: 'Nora', text: 'Vertraust du mir etwa nicht?' },
      ],
      opts: [
        { t: 'Mein Passwort kriegt nicht mal meine Katze. Aber danke!', k: 'cool', antwort: { von: 'Nora', text: 'Haha okay, verstehe.' }, line: 'Nein mit Witz. Dein Account bleibt deiner.' },
        { t: 'Hältst du mich für blöd?', k: 'hart', antwort: { von: 'Nora', text: 'Wow. War nur nett gemeint.' }, line: 'Dein Account ist sicher. Aber Nora ist jetzt sauer.' },
        { t: 'Hab es vergessen.', k: 'ausrede', antwort: { von: 'Nora', text: 'Dann setz es neu. Dauert eine Minute!' }, line: 'Die Ausrede ist schnell weg. Und Nora bleibt dran.' },
        { t: 'Okay, hier ist es.', k: 'ja', antwort: { von: 'Nora', text: 'Top! Warte kurz …' }, line: 'Jetzt kann jemand in deinem Namen posten. Ändere es schnell!' },
      ],
      nein: ['Passwörter teile ich mit niemandem.', 'Nee, das bleibt meins.', 'Follower hol ich mir selbst.'],
    },
  ];
})();
