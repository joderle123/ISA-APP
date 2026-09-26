/* Inhalte: „Reframe-Battle“ – Etiketten, die man gesagt bekommt, und Stärken, die darin stecken.
   Idee nach dem ISA-Material „Reframing: Mëch selwer nei gesinn“ (Liss Mathey), alle Texte neu geschrieben.
   Nie über echte Jugendliche: Es sind allgemeine Sprüche („Jemand bekommt gesagt: …“).
   Felder:
     id        eindeutig
     gruppe    Bedeutungs-Gruppe. Im Speed-Match kommen falsche Antworten nur aus weit entfernten Gruppen,
               damit es eindeutig bleibt (siehe NEAR in missions/reframe.js).
     satz      Was jemand zu hören bekommt.
     etikett   Kurzform für die Antwort-Optionen A–D.
     wer       Satzanfang für den Reframe („Wer laut ist, …“).
     staerke   Stärken-Wort für den Stärken-Turm; staerke2 = zweites Wort, falls beide Teams überzeugen.
     reframes  3 Profi-Reframes. Jeder ergänzt „<wer>, …“ zu einem ganzen Satz.
               Sie verraten das Etikett nicht (sie dienen auch als Speed-Match-Karten).
     heikel    nur mit Freigabe der Lehrkraft (Körper, Familie, Geld, Diagnosen). */
(function () {
  const C = (window.CREW.content = window.CREW.content || {});
  C.reframe = [
    /* ---------- Power: laut, wild, viel Energie ---------- */
    { id: 'rf01', gruppe: 'power', satz: 'Du bist zu laut.', etikett: 'zu laut', wer: 'Wer laut ist', staerke: 'Mut', staerke2: 'Präsenz',
      reframes: ['traut sich, die eigene Meinung zu sagen.', 'wird in jeder Gruppe gehört.', 'bringt Stimmung in den Raum.'] },
    { id: 'rf02', gruppe: 'power', satz: 'Du redest zu viel.', etikett: 'redet zu viel', wer: 'Wer viel redet', staerke: 'Kontaktfreude', staerke2: 'Erzähltalent',
      reframes: ['findet schnell Kontakt zu neuen Leuten.', 'kann Geschichten spannend erzählen.', 'lässt keine peinliche Stille aufkommen.'] },
    { id: 'rf03', gruppe: 'power', satz: 'Du bist zu zappelig.', etikett: 'zu zappelig', wer: 'Wer zappelig ist', staerke: 'Energie', staerke2: 'Tatkraft',
      reframes: ['hat Energie für drei.', 'ist immer in Bewegung.', 'wird nicht so schnell müde.'] },
    { id: 'rf04', gruppe: 'power', satz: 'Du bist zu wild.', etikett: 'zu wild', wer: 'Wer wild ist', staerke: 'Abenteuerlust', staerke2: 'Power',
      reframes: ['traut sich auf jede Achterbahn.', 'hat richtig viel Power.', 'bringt Action in langweilige Tage.'] },
    { id: 'rf05', gruppe: 'power', satz: 'Du bist zu aufgedreht.', etikett: 'zu aufgedreht', wer: 'Wer aufgedreht ist', staerke: 'Begeisterung', staerke2: 'Schwung',
      reframes: ['kann andere mitreißen.', 'steckt andere mit guter Laune an.', 'bringt Schwung in jede Gruppe.'] },
    { id: 'rf06', gruppe: 'power', satz: 'Du machst zu viel Quatsch.', etikett: 'macht zu viel Quatsch', wer: 'Wer viel Quatsch macht', staerke: 'Humor', staerke2: 'Lockerheit',
      reframes: ['bringt andere zum Lachen.', 'lockert schwierige Momente auf.', 'sorgt für gute Stimmung in der Pause.'] },

    /* ---------- Still: ruhig, schüchtern, gelassen ---------- */
    { id: 'rf07', gruppe: 'still', satz: 'Du bist zu ruhig.', etikett: 'zu ruhig', wer: 'Wer ruhig ist', staerke: 'Zuhören', staerke2: 'Ruhe',
      reframes: ['kann gut zuhören.', 'bleibt cool, wenn es stressig wird.', 'denkt erst nach und redet dann.'] },
    { id: 'rf08', gruppe: 'still', satz: 'Du bist zu schüchtern.', etikett: 'zu schüchtern', wer: 'Wer schüchtern ist', staerke: 'Beobachtung', staerke2: 'Rücksicht',
      reframes: ['schaut erst genau hin.', 'merkt, wie es anderen geht.', 'drängt sich nicht in den Vordergrund.'] },
    { id: 'rf09', gruppe: 'still', satz: 'Du bist zu gern allein.', etikett: 'zu gern allein', wer: 'Wer gern allein ist', staerke: 'Selbstständigkeit', staerke2: 'Konzentration',
      reframes: ['kommt gut mit sich selbst klar.', 'braucht keine Gruppe, um etwas zu schaffen.', 'kann sich gut konzentrieren.'] },
    { id: 'rf10', gruppe: 'still', satz: 'Du bist zu bescheiden.', etikett: 'zu bescheiden', wer: 'Wer bescheiden ist', staerke: 'Teamgeist', staerke2: 'Großzügigkeit',
      reframes: ['gönnt anderen ihren Erfolg.', 'gibt nicht mit Sachen an.', 'teilt das Lob mit dem Team.'] },
    { id: 'rf11', gruppe: 'still', satz: 'Du nimmst alles zu locker.', etikett: 'zu locker', wer: 'Wer alles locker nimmt', staerke: 'Gelassenheit', staerke2: 'Coolness',
      reframes: ['macht aus einer Mücke keinen Elefanten.', 'bleibt entspannt, wenn andere Panik schieben.', 'lässt sich nicht so schnell stressen.'] },

    /* ---------- Sorgfalt: langsam, vorsichtig, genau ---------- */
    { id: 'rf12', gruppe: 'sorgfalt', satz: 'Du bist zu langsam.', etikett: 'zu langsam', wer: 'Wer langsam ist', staerke: 'Sorgfalt', staerke2: 'Geduld',
      reframes: ['arbeitet gründlich.', 'macht weniger Flüchtigkeitsfehler.', 'lässt sich nicht hetzen.'] },
    { id: 'rf13', gruppe: 'sorgfalt', satz: 'Du bist zu vorsichtig.', etikett: 'zu vorsichtig', wer: 'Wer vorsichtig ist', staerke: 'Umsicht', staerke2: 'Weitsicht',
      reframes: ['sieht Gefahren früh.', 'passt auf sich und andere auf.', 'überlegt, bevor es riskant wird.'] },
    { id: 'rf14', gruppe: 'sorgfalt', satz: 'Du bist zu pingelig.', etikett: 'zu pingelig', wer: 'Wer pingelig ist', staerke: 'Genauigkeit', staerke2: 'Ordnung',
      reframes: ['achtet auf Details.', 'liefert saubere Arbeit ab.', 'merkt kleine Fehler sofort.'] },
    { id: 'rf15', gruppe: 'sorgfalt', satz: 'Bei dir muss alles perfekt sein.', etikett: 'will alles perfekt', wer: 'Wer alles perfekt will', staerke: 'Qualität', staerke2: 'Fleiß',
      reframes: ['gibt sich richtig Mühe.', 'macht keine halben Sachen.', 'liefert Arbeit ab, auf die man stolz sein kann.'] },
    { id: 'rf16', gruppe: 'sorgfalt', satz: 'Du denkst zu viel nach.', etikett: 'denkt zu viel nach', wer: 'Wer viel nachdenkt', staerke: 'Tiefgang', staerke2: 'Planung',
      reframes: ['hat für fast alles einen Plan B.', 'trifft überlegte Entscheidungen.', 'sieht Dinge, die andere übersehen.'] },

    /* ---------- Kopf: neugierig, kritisch, schlau ---------- */
    { id: 'rf17', gruppe: 'kopf', satz: 'Du bist zu neugierig.', etikett: 'zu neugierig', wer: 'Wer neugierig ist', staerke: 'Wissensdurst', staerke2: 'Interesse',
      reframes: ['lernt ständig etwas Neues.', 'stellt die Fragen, die sich keiner traut.', 'interessiert sich für andere Menschen.'] },
    { id: 'rf18', gruppe: 'kopf', satz: 'Du fragst zu viel.', etikett: 'fragt zu viel', wer: 'Wer viel fragt', staerke: 'Lernwille', staerke2: 'Gründlichkeit',
      reframes: ['versteht die Dinge am Ende richtig.', 'bohrt nach, bis alles klar ist.', 'hilft auch den anderen, die still bleiben.'] },
    { id: 'rf19', gruppe: 'kopf', satz: 'Du weißt immer alles besser.', etikett: 'weiß alles besser', wer: 'Wer alles besser weiß', staerke: 'Fachwissen', staerke2: 'Erklärtalent',
      reframes: ['kennt sich richtig gut aus.', 'kann anderen Dinge gut erklären.', 'hat bei Quizfragen oft die Antwort.'] },
    { id: 'rf20', gruppe: 'kopf', satz: 'Du bist zu kritisch.', etikett: 'zu kritisch', wer: 'Wer kritisch ist', staerke: 'Scharfblick', staerke2: 'Durchblick',
      reframes: ['findet Fehler, bevor sie Probleme machen.', 'glaubt nicht alles, was im Netz steht.', 'prüft Dinge lieber zweimal.'] },
    { id: 'rf21', gruppe: 'kopf', satz: 'Du bist zu misstrauisch.', etikett: 'zu misstrauisch', wer: 'Wer misstrauisch ist', staerke: 'Wachsamkeit', staerke2: 'Selbstschutz',
      reframes: ['fällt nicht auf Fake-Nachrichten rein.', 'wird nicht so leicht reingelegt.', 'passt gut auf die eigenen Daten auf.'] },

    /* ---------- Gefühl: empfindlich, emotional, nervös ---------- */
    { id: 'rf22', gruppe: 'gefuehl', satz: 'Du bist zu empfindlich.', etikett: 'zu empfindlich', wer: 'Wer empfindlich ist', staerke: 'Feingefühl', staerke2: 'Mitgefühl',
      reframes: ['spürt, wenn die Stimmung kippt.', 'geht sanft mit anderen um.', 'nimmt Gefühle ernst.'] },
    { id: 'rf23', gruppe: 'gefuehl', satz: 'Du bist zu emotional.', etikett: 'zu emotional', wer: 'Wer emotional ist', staerke: 'Echtheit', staerke2: 'Lebendigkeit',
      reframes: ['zeigt echte Gefühle.', 'kann sich richtig für etwas begeistern.', 'versteckt sich nicht hinter einer Maske.'] },
    { id: 'rf24', gruppe: 'gefuehl', satz: 'Du nimmst alles zu ernst.', etikett: 'nimmt alles zu ernst', wer: 'Wer alles ernst nimmt', staerke: 'Verantwortung', staerke2: 'Zuverlässigkeit',
      reframes: ['hält Versprechen.', 'kümmert sich um wichtige Sachen.', 'hört anderen wirklich zu.'] },
    { id: 'rf25', gruppe: 'gefuehl', satz: 'Du bist zu anhänglich.', etikett: 'zu anhänglich', wer: 'Wer anhänglich ist', staerke: 'Treue', staerke2: 'Freundschaft',
      reframes: ['bleibt Freunden treu.', 'zeigt anderen, dass sie wichtig sind.', 'lässt niemanden allein.'] },
    { id: 'rf26', gruppe: 'gefuehl', satz: 'Du weinst zu schnell.', etikett: 'weint zu schnell', wer: 'Wer schnell weint', staerke: 'Offenheit', staerke2: 'Gefühlsstärke',
      reframes: ['lässt Gefühle raus, statt sie runterzuschlucken.', 'hat keine Angst vor echten Gefühlen.', 'kann gut mit anderen mitfühlen.'] },
    { id: 'rf27', gruppe: 'gefuehl', satz: 'Du bist zu nervös.', etikett: 'zu nervös', wer: 'Wer nervös ist', staerke: 'Einsatz', staerke2: 'Wachheit',
      reframes: ['zeigt, dass die Sache wichtig ist.', 'ist hellwach, wenn es drauf ankommt.', 'kennt Lampenfieber und macht trotzdem mit.'] },

    /* ---------- Klartext: direkt, frech, widerspricht ---------- */
    { id: 'rf28', gruppe: 'klartext', satz: 'Du bist zu direkt.', etikett: 'zu direkt', wer: 'Wer direkt ist', staerke: 'Ehrlichkeit', staerke2: 'Klarheit',
      reframes: ['sagt ehrlich, was Sache ist.', 'redet nicht hinter dem Rücken.', 'macht klare Ansagen.'] },
    { id: 'rf29', gruppe: 'klartext', satz: 'Du bist zu frech.', etikett: 'zu frech', wer: 'Wer frech ist', staerke: 'Schlagfertigkeit', staerke2: 'Selbstbewusstsein',
      reframes: ['ist schlagfertig.', 'lässt sich nicht einschüchtern.', 'hat immer einen Spruch parat.'] },
    { id: 'rf30', gruppe: 'klartext', satz: 'Du widersprichst zu viel.', etikett: 'widerspricht zu viel', wer: 'Wer oft widerspricht', staerke: 'Rückgrat', staerke2: 'Meinungsstärke',
      reframes: ['traut sich, Nein zu sagen.', 'sagt etwas, wenn etwas schiefläuft.', 'bringt Diskussionen in Gang.'] },
    { id: 'rf31', gruppe: 'klartext', satz: 'Du regst dich zu schnell auf.', etikett: 'regt sich zu schnell auf', wer: 'Wer sich schnell aufregt', staerke: 'Gerechtigkeitssinn', staerke2: 'Haltung',
      reframes: ['merkt sofort, wenn etwas unfair ist.', 'steht für wichtige Dinge ein.', 'ist nicht gleichgültig.'] },
    { id: 'rf32', gruppe: 'klartext', satz: 'Du bist zu nachtragend.', etikett: 'zu nachtragend', wer: 'Wer nachtragend ist', staerke: 'Selbstachtung', staerke2: 'Grenzen setzen',
      reframes: ['zeigt klar, wo die eigenen Grenzen sind.', 'lässt sich nicht alles gefallen.', 'vergisst nicht, was wichtig war.'] },

    /* ---------- Boss: bestimmen, Ziele, eigener Kopf ---------- */
    { id: 'rf33', gruppe: 'boss', satz: 'Du willst immer bestimmen.', etikett: 'will immer bestimmen', wer: 'Wer gern bestimmt', staerke: 'Führung', staerke2: 'Überblick',
      reframes: ['kann eine Gruppe anführen.', 'bringt die Gruppe zu einer Entscheidung.', 'behält den Überblick.'] },
    { id: 'rf34', gruppe: 'boss', satz: 'Du bist zu ehrgeizig.', etikett: 'zu ehrgeizig', wer: 'Wer ehrgeizig ist', staerke: 'Zielstrebigkeit', staerke2: 'Disziplin',
      reframes: ['hat klare Ziele.', 'übt, bis es klappt.', 'zieht andere mit nach oben.'] },
    { id: 'rf35', gruppe: 'boss', satz: 'Du bist zu stur.', etikett: 'zu stur', wer: 'Wer stur ist', staerke: 'Ausdauer', staerke2: 'Standfestigkeit',
      reframes: ['gibt nicht so schnell auf.', 'lässt sich nicht so leicht umstimmen.', 'lässt sich nicht zu Blödsinn überreden.'] },
    { id: 'rf36', gruppe: 'boss', satz: 'Du bist zu wählerisch.', etikett: 'zu wählerisch', wer: 'Wer wählerisch ist', staerke: 'Geschmack', staerke2: 'Stilgefühl',
      reframes: ['weiß genau, was gefällt.', 'hat einen guten Geschmack.', 'gibt sich nicht mit allem zufrieden.'] },
    { id: 'rf37', gruppe: 'boss', satz: 'Du mischst dich überall ein.', etikett: 'mischt sich überall ein', wer: 'Wer sich überall einmischt', staerke: 'Zivilcourage', staerke2: 'Engagement',
      reframes: ['schaut nicht weg, wenn jemand Hilfe braucht.', 'kümmert sich um die Gruppe.', 'bringt Dinge in Bewegung.'] },

    /* ---------- Herz: nett, gutgläubig, brav ---------- */
    { id: 'rf38', gruppe: 'herz', satz: 'Du bist zu nett.', etikett: 'zu nett', wer: 'Wer nett ist', staerke: 'Freundlichkeit', staerke2: 'Wärme',
      reframes: ['macht anderen den Tag besser.', 'hilft, ohne lange zu fragen.', 'ist bei allen gern gesehen.'] },
    { id: 'rf39', gruppe: 'herz', satz: 'Du bist zu gutgläubig.', etikett: 'zu gutgläubig', wer: 'Wer gutgläubig ist', staerke: 'Vertrauen', staerke2: 'Optimismus',
      reframes: ['glaubt an das Gute in Menschen.', 'gibt anderen eine zweite Chance.', 'kann anderen vertrauen.'] },
    { id: 'rf40', gruppe: 'herz', satz: 'Du bist zu brav.', etikett: 'zu brav', wer: 'Wer brav ist', staerke: 'Verlässlichkeit', staerke2: 'Fairness',
      reframes: ['hält sich an Abmachungen.', 'ist fair zu anderen.', 'ist einfach verlässlich.'] },
    { id: 'rf41', gruppe: 'herz', satz: 'Du bist zu kindisch.', etikett: 'zu kindisch', wer: 'Wer kindisch ist', staerke: 'Spielfreude', staerke2: 'Leichtigkeit',
      reframes: ['kann sich über kleine Dinge freuen.', 'kann super mit kleinen Kindern umgehen.', 'bleibt verspielt, auch wenn andere cool tun.'] },

    /* ---------- Freizeit: Handy, Zocken, Fußball ---------- */
    { id: 'rf42', gruppe: 'freizeit', satz: 'Du hängst zu viel am Handy.', etikett: 'hängt zu viel am Handy', wer: 'Wer viel am Handy hängt', staerke: 'Technik-Wissen', staerke2: 'Recherche',
      reframes: ['kennt sich mit Apps richtig gut aus.', 'weiß immer, was gerade los ist.', 'findet schnell Infos, wenn man sie braucht.'] },
    { id: 'rf43', gruppe: 'freizeit', satz: 'Du zockst zu viel.', etikett: 'zockt zu viel', wer: 'Wer viel zockt', staerke: 'Strategie', staerke2: 'Nervenstärke',
      reframes: ['kennt jede Abkürzung auf der Map.', 'kann online im Team spielen.', 'hat die Nerven, wenn das Match knapp wird.'] },
    { id: 'rf44', gruppe: 'freizeit', satz: 'Du denkst nur an Fußball.', etikett: 'denkt nur an Fußball', wer: 'Wer nur an Fußball denkt', staerke: 'Leidenschaft', staerke2: 'Teamplay',
      reframes: ['kennt alle Spieler und Statistiken.', 'weiß, wie Teamplay funktioniert.', 'geht auch bei Regen zum Training.'] },

    /* ---------- Frei: chaotisch, verträumt, anders ---------- */
    { id: 'rf45', gruppe: 'frei', satz: 'Du bist zu chaotisch.', etikett: 'zu chaotisch', wer: 'Wer chaotisch ist', staerke: 'Flexibilität', staerke2: 'Improvisation',
      reframes: ['kann gut improvisieren.', 'kommt klar, wenn Pläne platzen.', 'findet ungewöhnliche Lösungen.'] },
    { id: 'rf46', gruppe: 'frei', satz: 'Du bist zu vergesslich.', etikett: 'zu vergesslich', wer: 'Wer vergesslich ist', staerke: 'Im Moment leben', staerke2: 'Erfindergeist',
      reframes: ['lebt im Hier und Jetzt.', 'hat den Kopf frei für neue Dinge.', 'findet clevere Tricks, um sich Dinge zu merken.'] },
    { id: 'rf47', gruppe: 'frei', satz: 'Du bist zu faul.', etikett: 'zu faul', wer: 'Wer faul ist', staerke: 'Cleverness', staerke2: 'Effizienz',
      reframes: ['findet den kürzesten Weg zum Ziel.', 'verschwendet keine Energie.', 'weiß, wann eine Pause wichtig ist.'] },
    { id: 'rf48', gruppe: 'frei', satz: 'Du bist zu anders.', etikett: 'zu anders', wer: 'Wer anders ist', staerke: 'Einzigartigkeit', staerke2: 'Originalität',
      reframes: ['bringt neue Ideen in die Gruppe.', 'muss nicht jedem Trend folgen.', 'ist ein echtes Original.'] },
    { id: 'rf49', gruppe: 'frei', satz: 'Du bist zu verträumt.', etikett: 'zu verträumt', wer: 'Wer verträumt ist', staerke: 'Fantasie', staerke2: 'Kreativität',
      reframes: ['hat viel Fantasie.', 'hat oft Ideen, auf die sonst keiner kommt.', 'kann sich Dinge gut vorstellen.'] },

    /* ---------- Tempo: hektisch, ungeduldig, spontan ---------- */
    { id: 'rf50', gruppe: 'tempo', satz: 'Du bist immer so hektisch.', etikett: 'zu hektisch', wer: 'Wer hektisch ist', staerke: 'Tempo', staerke2: 'Reaktion',
      reframes: ['schafft viel in kurzer Zeit.', 'ist sofort da, wenn es brennt.', 'wartet nicht, bis andere anfangen.'] },
    { id: 'rf51', gruppe: 'tempo', satz: 'Du bist zu ungeduldig.', etikett: 'zu ungeduldig', wer: 'Wer ungeduldig ist', staerke: 'Tatendrang', staerke2: 'Motivation',
      reframes: ['will Dinge sofort anpacken.', 'handelt lieber, statt lange zu warten.', 'bringt Projekte schnell ins Rollen.'] },
    { id: 'rf52', gruppe: 'tempo', satz: 'Du bist zu spontan.', etikett: 'zu spontan', wer: 'Wer spontan ist', staerke: 'Mut zu Neuem', staerke2: 'Beweglichkeit',
      reframes: ['sagt schnell Ja zu neuen Ideen.', 'kann sich schnell umstellen.', 'erlebt mehr Abenteuer.'] },

    /* ---------- Heikel (nur mit Freigabe der Lehrkraft) ---------- */
    { id: 'rf60', gruppe: 'koerper', heikel: true, satz: 'Du bist zu klein.', etikett: 'zu klein', wer: 'Wer klein ist', staerke: 'Wendigkeit', staerke2: 'Überraschung',
      reframes: ['ist schnell und wendig.', 'wird unterschätzt und überrascht dann alle.', 'zeigt, dass Größe nicht alles ist.'] },
    { id: 'rf61', gruppe: 'familie', heikel: true, satz: 'Du bist das Sorgenkind.', etikett: 'das Sorgenkind', wer: 'Wer das Sorgenkind ist', staerke: 'Durchhaltevermögen', staerke2: 'Stehaufkraft',
      reframes: ['hat schon viel durchgestanden.', 'steht nach schweren Zeiten wieder auf.', 'weiß, wie es sich anfühlt, Hilfe zu brauchen.'] },
    { id: 'rf62', gruppe: 'geld', heikel: true, satz: 'Du bist zu geizig.', etikett: 'zu geizig', wer: 'Wer geizig ist', staerke: 'Sparsamkeit', staerke2: 'Weitblick',
      reframes: ['kann gut mit Geld umgehen.', 'spart für große Ziele.', 'fällt nicht auf teure Werbung rein.'] },
    { id: 'rf63', gruppe: 'power', heikel: true, satz: 'Du bist zu hyperaktiv.', etikett: 'zu hyperaktiv', wer: 'Wer hyperaktiv ist', staerke: 'Ideenreichtum', staerke2: 'Action',
      reframes: ['hat Energie ohne Ende.', 'denkt an viele Dinge gleichzeitig.', 'ist bei Action ganz vorne dabei.'] },
  ];
})();
