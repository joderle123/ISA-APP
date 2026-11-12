/* Inhalte: „Steh auf, wenn …“ – eigene Texte (nach der Mechanik der ISA-Materialien).
   Felder: id, text (vervollständigt „Steh auf, wenn du …“), kat, heikel (nur mit Freigabe). */
(function () {
  const C = (window.CREW.content = window.CREW.content || {});
  C.stehauf = [
    // Spaß
    { id: 'sa01', kat: 'spass', text: '… schon mal nachts um drei noch am Handy warst.' },
    { id: 'sa02', kat: 'spass', text: '… Ananas auf Pizza okay findest.' },
    { id: 'sa03', kat: 'spass', text: '… schon mal im Bus eingeschlafen bist.' },
    { id: 'sa04', kat: 'spass', text: '… schon mal eine Nachricht an die falsche Person geschickt hast.' },
    { id: 'sa05', kat: 'spass', text: '… morgens den Wecker mindestens einmal wegdrückst.' },
    { id: 'sa06', kat: 'spass', text: '… schon mal so gelacht hast, dass du nicht mehr aufhören konntest.' },
    { id: 'sa07', kat: 'spass', text: '… ein Tier richtig gut nachmachen kannst.' },
    { id: 'sa08', kat: 'spass', text: '… lieber eine Serie als einen Film schaust.' },
    { id: 'sa09', kat: 'spass', text: '… findest, dass der Montag abgeschafft werden sollte.' },
    { id: 'sa10', kat: 'spass', text: '… schon mal auf der Schueberfouer Achterbahn gefahren bist.' },
    { id: 'sa11', kat: 'spass', text: '… einen Ohrwurm hast, den du nicht mehr loswirst.' },
    { id: 'sa12', kat: 'spass', text: '… schon mal etwas gekocht hast, das richtig schlecht geschmeckt hat.' },
    { id: 'sa13', kat: 'spass', text: '… mehr als drei Sprachen verstehst.' },
    { id: 'sa14', kat: 'spass', text: '… ein Handyspiel schon mal länger als zwei Stunden am Stück gespielt hast.' },
    { id: 'sa15', kat: 'spass', text: '… TikTok-Tänze eher peinlich findest.' },
    { id: 'sa16', kat: 'spass', text: '… schon mal ein Fußballspiel im Stadion gesehen hast.' },
    { id: 'sa17', kat: 'spass', text: '… lieber früh aufstehst als lange wach bleibst.' },
    { id: 'sa18', kat: 'spass', text: '… schon mal bei einem Horrorfilm die Augen zugemacht hast.' },
    // Gefühle & Erlebnisse
    { id: 'sa20', kat: 'gefuehl', text: '… schon mal richtig nervös warst und es dann trotzdem geschafft hast.' },
    { id: 'sa21', kat: 'gefuehl', text: '… schon mal wütend warst und es später bereut hast.' },
    { id: 'sa22', kat: 'gefuehl', text: '… jemandem geholfen hast, ohne dass es jemand gemerkt hat.' },
    { id: 'sa23', kat: 'gefuehl', text: '… dich schon mal ungerecht behandelt gefühlt hast.' },
    { id: 'sa24', kat: 'gefuehl', text: '… schon mal neu in einer Klasse oder Gruppe warst.' },
    { id: 'sa25', kat: 'gefuehl', text: '… etwas gelernt hast, bei dem du am Anfang dachtest: Das schaffe ich nie.' },
    { id: 'sa26', kat: 'gefuehl', text: '… es hasst, wenn dich jemand unterbricht.' },
    { id: 'sa27', kat: 'gefuehl', text: '… dich schon mal bei jemandem entschuldigt hast.' },
    { id: 'sa28', kat: 'gefuehl', text: '… Musik hörst, wenn es dir nicht gut geht.' },
    { id: 'sa29', kat: 'gefuehl', text: '… diese Woche schon mal richtig stolz auf dich warst.' },
    { id: 'sa30', kat: 'gefuehl', text: '… dich manchmal langweilst, obwohl du dein Handy dabeihast.' },
    { id: 'sa31', kat: 'gefuehl', text: '… lieber mit einer Person redest als mit einer ganzen Gruppe.' },
    { id: 'sa32', kat: 'gefuehl', text: '… schon mal ausgelacht wurdest und so getan hast, als wäre es dir egal.', heikel: true },
    // Stärken
    { id: 'sa40', kat: 'stark', text: '… gut zuhören kannst.' },
    { id: 'sa41', kat: 'stark', text: '… etwas kannst, von dem hier niemand weiß.' },
    { id: 'sa42', kat: 'stark', text: '… schon mal jemanden zum Lachen gebracht hast, der traurig war.' },
    { id: 'sa43', kat: 'stark', text: '… gut mit Tieren oder kleinen Kindern umgehen kannst.' },
    { id: 'sa44', kat: 'stark', text: '… etwas reparieren oder bauen kannst.' },
    { id: 'sa45', kat: 'stark', text: '… in einem Spiel oder Sport richtig gut bist.' },
    { id: 'sa46', kat: 'stark', text: '… findest, dass du dich im letzten Jahr verändert hast.' },
    { id: 'sa47', kat: 'stark', text: '… einem Freund oder einer Freundin schon mal ehrlich die Meinung gesagt hast.' },
    // Zukunft
    { id: 'sa50', kat: 'zukunft', text: '… schon weißt, welchen Beruf du ausprobieren willst.' },
    { id: 'sa51', kat: 'zukunft', text: '… gerne mal ein Praktikum in einer Werkstatt machen würdest.' },
    { id: 'sa52', kat: 'zukunft', text: '… später mal im Ausland leben möchtest.' },
    { id: 'sa53', kat: 'zukunft', text: '… schon mal mit eigenem Geld etwas Großes gekauft hast.' },
    // Heikel (nur mit Freigabe der Lehrkraft)
    { id: 'sa60', kat: 'heikel', text: '… Geschwister hast.', heikel: true },
    { id: 'sa61', kat: 'heikel', text: '… in den letzten Ferien verreist bist.', heikel: true },
    { id: 'sa62', kat: 'heikel', text: '… ein Haustier hast.', heikel: true },
    { id: 'sa63', kat: 'heikel', text: '… schon mal umgezogen bist.', heikel: true },
    { id: 'sa64', kat: 'heikel', text: '… ein eigenes Zimmer hast.', heikel: true },
  ];
})();
