// Annexe Junglinster – Freundschafts-Bögen (Wochenplan Tag 3: „Streit, Eifersucht, Versöhnung über das Jahr“).
// Vier Freund:innen haben je einen kleinen Bogen in drei Teilen: Riss (Kapitel 3–6), Funkstille oder Klärung (5–8),
// Versöhnung oder offene Tür (7–10). Jeder Teil kommt höchstens einmal je Abschnitt und nur, wenn man sich schon kennt.
// Was man im ersten Teil sagt, verändert die nächsten. Nichts wird bestraft oder schöngeredet: Wer sich entschuldigt,
// bekommt keine Belohnungs-Fanfare, wer ausweicht, keine Moral – nur eine ehrliche Reaktion. Die Tür bleibt immer offen.
// Stil wie faeden.js: höchstens ~12 Wörter pro Sprechblase, Humor zuerst, nichts aus Familien, keine Geschlechts-Annahmen
// über die Spielfigur.
// Format: { titel, ab, bis, g: (merke) => [...Gespräch] }  ·  Antworten setzen Flags (merke: 'bg_…').

const hat = (m, ...f) => f.some((x) => !!m[x]);

export const BOEGEN = {
  // ---------------- Ben: Eifersucht (du spielst plötzlich mit Jo) ----------------
  ben: [
    { titel: 'Neuer Partner?', ab: 3, bis: 6, g: () => [
      ['ben', 'Ah. Du spielst jetzt also mit Jo Korbball.'],
      ['ben', 'Seit wann ist Jo dein Partner? Ich frag nur.'],
      { wahl: [
        { t: 'Jo hat gefragt. Spiel doch mit uns.', staerke: 'einbeziehen', herz: { ben: 1 }, merke: 'bg_ben_offen', dann: [
          ['ben', 'Mitspielen. An meinem eigenen Korb. Na toll.'], ['ben', 'War ein Witz. Halb. Morgen bin ich dabei.']] },
        { t: 'Bist du etwa eifersüchtig?', staerke: 'humor', merke: 'bg_ben_witz', dann: [
          ['ben', 'Ich? Nie. Ich bin nur … leicht beleidigt.'], ['erzaehler', 'Er grinst. Aber nicht ganz.']] },
        { t: 'Ich spiel, mit wem ich will.', herz: { ben: -1 }, merke: 'bg_ben_kalt', dann: [
          ['ben', 'Klar. Kannst du.'], ['erzaehler', 'Ben dreht sich weg und wirft daneben.']] },
      ] },
    ] },
    { titel: 'Zwei gegen zwei', ab: 5, bis: 8, g: (m) => hat(m, 'bg_ben_kalt') ? [
      ['ben', 'Hi.'],
      ['erzaehler', 'Ben schaut aufs Handy. Länger als nötig.'],
      { wahl: [
        { t: 'Ben. Das neulich war blöd von mir.', herz: { ben: 2 }, merke: 'bg_ben_gut', dann: [
          ['ben', 'Ja. War’s.'], ['ben', 'Okay. Angenommen. Aber du schuldest mir einen Freiwurf.']] },
        { t: 'Was ist denn los mit dir?', merke: 'bg_ben_zu', dann: [['ben', 'Nichts. Alles super.']] },
        { t: '(Weitergehen.)', merke: 'bg_ben_zu', dann: [['erzaehler', 'Du gehst weiter. Ben auch.']] },
      ] },
    ] : [
      ['ben', 'Jo und ich haben einen Plan. Zwei gegen zwei.'],
      ['ben', 'Du bist dabei. Noah auch. Er weiß es nur noch nicht.'],
      { wahl: [
        { t: 'Ich sag’s ihm. Ganz vorsichtig.', staerke: 'einbeziehen', herz: { ben: 1, noah: 1 }, merke: 'bg_ben_gut', dann: [
          ['ben', 'Vorsichtig. Gut. Sonst rennt er weg.']] },
        { t: 'Nur wenn ich mit dir im Team bin.', staerke: 'humor', herz: { ben: 1 }, merke: 'bg_ben_gut', dann: [
          ['ben', 'Abgemacht. Jo und Noah gegen uns. Die Armen.']] },
      ] },
    ] },
    { titel: 'Zu dritt', ab: 7, bis: 10, g: (m) => hat(m, 'bg_ben_gut') ? [
      ['ben', 'Weißt du, was mich am Anfang genervt hat?'],
      ['ben', 'Dass du mit Jo gespielt hast. Total dumm von mir.'],
      ['ben', 'Jetzt spielen wir zu dritt. Viel besser. Mehr Leute zum Verlieren.'],
      { wahl: [
        { t: 'Mehr Leute, die du schlägst, meinst du.', staerke: 'humor', herz: { ben: 1 }, dann: [['ben', 'Genau das meinte ich. Du verstehst mich.']] },
        { t: 'Fand ich auch gut, dass du’s gesagt hast.', herz: { ben: 1 }, dann: [['ben', 'Ja, ja. Jetzt werd nicht sentimental.']] },
      ] },
    ] : [
      ['ben', 'Wir haben lange nicht mehr gespielt.'],
      { wahl: [
        { t: 'Heute nach der Schule? Du und ich.', herz: { ben: 2 }, merke: 'bg_ben_gut', dann: [
          ['ben', '…Okay. Aber ich gewinne.'], ['erzaehler', 'Es ist das erste Mal seit Wochen, dass er lacht.']] },
        { t: 'Vielleicht irgendwann.', dann: [['ben', 'Irgendwann. Klar.'], ['erzaehler', 'Der Korb bleibt da. Ben vielleicht auch.']] },
      ] },
    ] },
  ],

  // ---------------- Mila: das Video im Klassenchat ----------------
  mila: [
    { titel: 'Das Video', ab: 3, bis: 6, g: () => [
      ['mila', 'Im Klassenchat ist ein Video. Ich, mit dem Würfel.'],
      ['mila', 'Ich hab die Zunge raus. Beim Konzentrieren. Alle lachen.'],
      ['mila', 'Hast du das gefilmt?'],
      { wahl: [
        { t: 'Nein. Aber ich frag, wer es war.', staerke: 'einbeziehen', herz: { mila: 1 }, merke: 'bg_mila_hilfe', dann: [
          ['mila', 'Danke. Dann sortiere ich meine Wut neu.']] },
        { t: 'Nein. Aber es ist schon ein bisschen lustig.', herz: { mila: -1 }, merke: 'bg_mila_lustig', dann: [
          ['mila', 'Für dich. Ich bin die mit der Zunge.']] },
        { t: 'Nein. Ich hab nur ein Lach-Emoji geschickt.', herz: { mila: -1 }, merke: 'bg_mila_emoji', dann: [
          ['mila', 'Siebzehn Leute haben gelacht. Du warst dabei.'], ['erzaehler', 'Sie dreht den Würfel. Schneller als sonst.']] },
      ] },
    ] },
    { titel: '23 Aufrufe', ab: 5, bis: 8, g: (m) => hat(m, 'bg_mila_hilfe') ? [
      ['mila', 'Dario hat das Video gefilmt. Jetzt ist es weg.'],
      ['mila', 'Gelöscht. Zehn Minuten nach deiner Nachricht. Zufall?'],
      { wahl: [
        { t: 'Ich hab nur nett gefragt. Sehr nett.', staerke: 'humor', herz: { mila: 1 }, merke: 'bg_mila_gut', dann: [['mila', 'Sehr nett. Ich glaub dir kein Wort. Danke.']] },
        { t: 'Er fand’s selbst nicht mehr lustig.', herz: { mila: 1 }, merke: 'bg_mila_gut', dann: [['mila', 'Gut. Dario kann also nachdenken. Notiert.']] },
      ] },
    ] : [
      ['mila', 'Das Video ist immer noch da. 23 Aufrufe.'],
      { wahl: [
        { t: 'Ich schreib Dario, dass er es löscht.', staerke: 'einbeziehen', herz: { mila: 2 }, merke: 'bg_mila_gut', dann: [
          ['erzaehler', 'Du schreibst. Zwei Minuten später: „ok sorry, ist weg“.'], ['mila', 'Weg. Einfach so. Warum hab ich das nicht gemacht?']] },
        { t: 'Ich lösch mein Emoji. Sorry, Mila.', herz: { mila: 1 }, merke: 'bg_mila_gut', dann: [['mila', 'Ein Emoji weniger. Fühlt sich größer an, als es ist.']] },
        { t: 'Ist doch bald vergessen.', merke: 'bg_mila_zu', dann: [['mila', 'Bei mir nicht.'], ['erzaehler', 'Sie geht. Der Würfel bleibt in ihrer Tasche.']] },
      ] },
    ] },
    { titel: '58 Sekunden', ab: 7, bis: 10, g: (m) => hat(m, 'bg_mila_gut') ? [
      ['mila', 'Neuer Rekord. 58 Sekunden.'],
      ['mila', 'Du darfst filmen. Diesmal mit Erlaubnis. Zunge inklusive.'],
      { wahl: [
        { t: 'Nur für uns? Oder für den Klassenchat?', herz: { mila: 1 }, dann: [['mila', 'Nur für uns. Den Klassenchat hab ich stummgeschaltet.']] },
        { t: '(Filmen. Ohne Zunge zu zoomen.)', staerke: 'humor', herz: { mila: 1 }, dann: [['mila', 'Respekt. Du hast nicht gezoomt. Ich hab aufgepasst.']] },
      ] },
    ] : [
      ['mila', 'Neuer Rekord. 58 Sekunden.'],
      ['erzaehler', 'Sie sagt es zu Lina, nicht zu dir. Du hörst es trotzdem.'],
      { wahl: [
        { t: 'Mila? Das mit dem Video tut mir leid.', herz: { mila: 2 }, merke: 'bg_mila_gut', dann: [['mila', 'Ich weiß. Jetzt weiß ich’s auch. Danke.']] },
        { t: '(Nichts sagen.)', dann: [['erzaehler', 'Mila dreht weiter. 58 Sekunden sind schnell.']] },
      ] },
    ] },
  ],

  // ---------------- Noah: vergessene Verabredung ----------------
  noah: [
    { titel: 'Bushaltestelle, 16 Uhr', ab: 3, bis: 6, g: () => [
      ['noah', 'Gestern. 16 Uhr. Bushaltestelle. Klingelt’s?'],
      ['erzaehler', 'Ihr wolltet zusammen in die Stadt. Du hast es vergessen.'],
      ['noah', 'Ich hab vierzig Minuten gewartet. Die Tauben kennen mich jetzt.'],
      { wahl: [
        { t: 'Oh nein. Total vergessen. Sorry.', herz: { noah: 1 }, merke: 'bg_noah_sorry', dann: [
          ['noah', 'Ehrlich ist besser als eine Ausrede. Trotzdem: Mist.']] },
        { t: 'Mein Akku war leer.', herz: { noah: -1 }, merke: 'bg_noah_ausrede', dann: [
          ['noah', 'Den ganzen Tag? Okay.'], ['erzaehler', 'Er glaubt es nicht ganz.']] },
        { t: 'Du hättest ja schreiben können.', herz: { noah: -1 }, merke: 'bg_noah_kalt', dann: [['noah', 'Hab ich. Viermal.']] },
      ] },
    ] },
    { titel: 'Neuer Versuch', ab: 5, bis: 8, g: (m) => hat(m, 'bg_noah_sorry') ? [
      ['noah', 'Neuer Versuch? Samstag, 14 Uhr. Gleiche Haltestelle.'],
      { wahl: [
        { t: 'Ich stell mir drei Wecker.', staerke: 'humor', herz: { noah: 1 }, merke: 'bg_noah_gut', dann: [['noah', 'Vier. Sicher ist sicher.']] },
        { t: 'Ich bin um Viertel vor zwei da.', herz: { noah: 1 }, merke: 'bg_noah_gut', dann: [['noah', 'Dann warte ausnahmsweise du. Gerechtigkeit.']] },
      ] },
    ] : [
      ['erzaehler', 'Noah sitzt in der Pause wieder allein am Fenster.'],
      { wahl: [
        { t: 'Noah, das mit dem Warten tut mir echt leid.', herz: { noah: 2 }, merke: 'bg_noah_gut', dann: [['noah', 'Okay. Danke, dass du’s jetzt sagst.']] },
        { t: 'Setz dich doch zu uns.', staerke: 'einbeziehen', herz: { noah: 1 }, merke: 'bg_noah_gut', dann: [['noah', 'Zu euch? … Okay. Kurz.'], ['erzaehler', 'Er bleibt bis zum Klingeln.']] },
        { t: '(Weitergehen.)', merke: 'bg_noah_zu', dann: [['erzaehler', 'Noah zählt Fenster. Es sind immer noch zwölf.']] },
      ] },
    ] },
    { titel: 'Die Tauben', ab: 7, bis: 10, g: (m) => hat(m, 'bg_noah_gut') ? [
      ['noah', 'Samstag war gut. Du warst sogar zu früh.'],
      ['noah', 'Die Tauben waren enttäuscht. Sie hatten mit mir gerechnet.'],
      { wahl: [
        { t: 'Nächstes Mal bringen wir ihnen Brot mit.', staerke: 'humor', herz: { noah: 1 }, dann: [['noah', 'Nein. Dann wohnen sie bei uns.']] },
        { t: 'Gleicher Plan nächste Woche?', herz: { noah: 1 }, dann: [['noah', 'Gleicher Plan. Ich stell trotzdem vier Wecker. Für dich.']] },
      ] },
    ] : [
      ['noah', 'Ich warte nicht mehr an Bushaltestellen. Lerneffekt.'],
      { wahl: [
        { t: 'Dann warte ich diesmal auf dich. Versprochen.', herz: { noah: 2 }, merke: 'bg_noah_gut', dann: [['noah', '…Okay. Samstag. Ich komme zwei Minuten zu spät. Aus Prinzip.']] },
        { t: 'Verständlich.', dann: [['noah', 'Ja.'], ['erzaehler', 'Er lächelt kurz. Mehr nicht.']] },
      ] },
    ] },
  ],

  // ---------------- Lina: das weitererzählte Geheimnis ----------------
  lina: [
    { titel: 'Der Wettbewerb', ab: 3, bis: 6, g: () => [
      ['lina', 'Ayla fragt mich nach dem Comic-Wettbewerb.'],
      ['lina', 'Davon wusstest nur du.'],
      { wahl: [
        { t: 'Sorry. Ich hab’s erzählt. Ich dachte, das freut dich.', herz: { lina: 1 }, merke: 'bg_lina_ehrlich', dann: [
          ['lina', 'Freut mich ja auch. Aber ich wollt’s selbst sagen.']] },
        { t: 'Keine Ahnung, woher sie das weiß.', herz: { lina: -1 }, merke: 'bg_lina_luege', dann: [
          ['erzaehler', 'Lina schaut dich lange an. Sie weiß es.']] },
        { t: 'Ist doch cool! Jetzt drücken alle die Daumen.', merke: 'bg_lina_egal', dann: [
          ['lina', 'Und wenn ich verliere, wissen es auch alle.']] },
      ] },
    ] },
    { titel: 'Abgegeben', ab: 5, bis: 8, g: (m) => hat(m, 'bg_lina_ehrlich') ? [
      ['lina', 'Ich hab abgegeben. Zwölf Seiten. Jetzt warten.'],
      ['lina', 'Wenn ich gewinne, darfst du’s allen erzählen. Vorher nicht.'],
      { wahl: [
        { t: 'Abgemacht. Mein Mund ist zu.', herz: { lina: 1 }, merke: 'bg_lina_gut', dann: [['lina', 'Gut. Ich zeichne dich mit Reißverschluss.']] },
        { t: 'Und wenn du verlierst, gehen wir Pommes essen.', staerke: 'humor', herz: { lina: 1 }, merke: 'bg_lina_gut', dann: [['lina', 'Dann hoff ich fast aufs Verlieren.']] },
      ] },
    ] : [
      ['erzaehler', 'Lina zeichnet. Sie schaut nicht hoch, als du kommst.'],
      { wahl: [
        { t: 'Das mit Ayla war ich. Tut mir leid.', herz: { lina: 2 }, merke: 'bg_lina_gut', dann: [['lina', 'Ich weiß. Danke, dass du’s jetzt sagst.'], ['lina', 'Zwölf Seiten hab ich abgegeben. Nur dass du’s weißt.']] },
        { t: 'Was zeichnest du?', merke: 'bg_lina_zu', dann: [['lina', 'Nichts Besonderes.'], ['erzaehler', 'Sie dreht das Blatt um.']] },
      ] },
    ] },
    { titel: 'Dritter Platz', ab: 7, bis: 10, g: (m) => hat(m, 'bg_lina_gut') ? [
      ['lina', 'Dritter Platz! Von hundertvierzig!'],
      ['lina', 'Und jetzt darfst du’s allen erzählen. Bitte laut.'],
      { wahl: [
        { t: '(Auf die Bank steigen.) Lina ist Dritte!', staerke: 'humor', herz: { lina: 1 }, dann: [['erzaehler', 'Der halbe Hof klatscht. Lina wird rot und lacht.']] },
        { t: 'Ich wusste es. Glückwunsch!', herz: { lina: 1 }, dann: [['lina', 'Du warst die erste Person, der ich’s sagen wollte.']] },
      ] },
    ] : [
      ['ayla', 'Hast du’s gehört? Lina ist Dritte beim Comic-Wettbewerb!'],
      ['erzaehler', 'Du erfährst es über Ayla. Nicht von Lina.'],
      { wahl: [
        { t: '(Zu Lina gehen.) Glückwunsch. Ehrlich.', herz: { lina: 1 }, merke: 'bg_lina_gut', dann: [['lina', 'Danke. Das mit Ayla … ist vorbei. Okay?']] },
        { t: '(Nichts machen.)', dann: [['erzaehler', 'Lina hält die Urkunde hoch. Sie sieht dich nicht.']] },
      ] },
    ] },
  ],
};
