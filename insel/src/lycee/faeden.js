// Annexe Junglinster – Gesprächsfäden (Auftrag 17.11.: „deepe Conversations … coolere NPCs“).
// Jede Mitschülerin, jeder Mitschüler hat drei tiefere Gespräche. Sie öffnen sich nacheinander, wenn die Freundschaft
// wächst (herz) – höchstens eins pro Abschnitt der Geschichte, damit sie sich über die Wochen verteilen.
// Inhalt: Hobbys, Sorgen um Schule und Zukunft, Gefühle im Alltag (Lampenfieber, Wut, zu laut, neu sein). Niemand erzählt
// Privates aus der Familie. Keine Moral. Höchstens ~12 Wörter pro Sprechblase. Gute Antworten: zuhören, nicht drängen.
// Format wie GESPRAECHE: ['wer', 'Text'] · { wahl: [{ t, staerke?, herz?, dann: [...] }] }.

const nett = (id, n = 1) => ({ [id]: n });

export const FAEDEN = {
  noah: [
    { herz: 2, titel: 'Neu sein', g: [
      ['noah', 'Darf ich was fragen? Wie lange ist man „der Neue“?'],
      { wahl: [
        { t: 'Bis jemand Neueres kommt. Also: bald.', herz: nett('noah'), dann: [['noah', 'Haha. Okay. Das ist ein Plan.']] },
        { t: 'Fühlst du dich noch neu?', staerke: 'zuhoeren', herz: nett('noah', 2), dann: [['noah', 'Manchmal. Im Gang geht’s. In der Kantine nicht.'], ['noah', 'Da weiß ich nie, wo ich sitzen soll.']] },
        { t: 'Keine Ahnung.', dann: [['noah', 'Ja. Ich auch nicht.']] },
      ] },
    ] },
    { herz: 3, titel: 'Die Kantine', g: [
      ['noah', 'Ich hab heute einfach gefragt: „Ist da frei?“'],
      ['noah', 'Und es war frei. Einfach so.'],
      { wahl: [
        { t: 'Wie war das für dich?', staerke: 'zuhoeren', herz: nett('noah'), dann: [['noah', 'Vorher: Herz rast. Nachher: Warum hab ich so lange gewartet?']] },
        { t: 'Siehst du. War doch easy.', dann: [['noah', 'Für dich vielleicht. Für mich war das ein Berg.']] },
      ] },
    ] },
    { herz: 4, titel: 'Was hilft', g: [
      ['noah', 'Weißt du, was mir hilft? Ich zähl Fenster.'],
      ['noah', 'Wenn alles zu viel ist. Zwölf Fenster in der Halle.'],
      { wahl: [
        { t: 'Ich mach so was mit Atmen.', herz: nett('noah'), dann: [['noah', 'Zeig mal. Vier ein, vier halten?'], ['noah', 'Okay. Fenster plus Atmen. Doppelt hält besser.']] },
        { t: 'Gut, dass du was gefunden hast.', staerke: 'zuhoeren', herz: nett('noah'), dann: [['noah', 'Ja. Hätte ich nie gedacht, dass ich das jemandem sag.']] },
      ] },
    ] },
  ],
  mila: [
    { herz: 2, titel: 'Der Würfel', g: [
      ['mila', 'Willst du wissen, wie der Würfel geht? Ehrlich?'],
      { wahl: [
        { t: 'Ja, zeig mal.', staerke: 'zuhoeren', herz: nett('mila', 2), dann: [['mila', 'Erst ein Kreuz oben. Immer erst das Kreuz.'], ['mila', 'Der Rest sind Regeln. Regeln mag ich.']] },
        { t: 'Später vielleicht.', dann: [['mila', 'Okay. Das Angebot gilt.']] },
      ] },
    ] },
    { herz: 3, titel: 'Zu laut', g: [
      ['mila', 'Die Kantine ist mir zu laut. Wie ein Föhn im Kopf.'],
      ['mila', 'Darum ess ich manchmal draußen.'],
      { wahl: [
        { t: 'Soll ich mal mitkommen?', staerke: 'einbeziehen', herz: nett('mila', 2), dann: [['mila', 'Wenn du nicht so viel redest. Dann ja.']] },
        { t: 'Kopfhörer helfen manchmal.', herz: nett('mila'), dann: [['mila', 'Hab ich. Darf ich hier aber nicht. Mal fragen.']] },
        { t: 'Ist doch nicht so laut.', dann: [['mila', 'Für dich. Ich hör auch das Brummen vom Kühlschrank.']] },
      ] },
    ] },
    { herz: 4, titel: 'Anders denken', g: [
      ['mila', 'Ich hab Mme Laurent gefragt, ob ich anders lerne.'],
      ['mila', 'Sie hat gesagt: „Anders ist kein Fehler. Nur ein anderer Weg.“'],
      { wahl: [
        { t: 'Was ist dein Weg?', staerke: 'zuhoeren', herz: nett('mila'), dann: [['mila', 'Bilder statt Text. Und Pausen. Kurze, viele.']] },
        { t: 'Find ich auch.', herz: nett('mila'), dann: [['mila', 'Gut. Dann sind wir schon zwei.']] },
      ] },
    ] },
  ],
  lina: [
    { herz: 2, titel: 'Das Heft', g: [
      ['lina', '(klappt schnell ihr Heft zu)'],
      { wahl: [
        { t: 'Du musst es nicht zeigen.', staerke: 'warten', herz: nett('lina', 2), dann: [['lina', '…Danke.'], ['lina', '(macht es wieder ein Stück auf)']] },
        { t: 'Was malst du?', herz: nett('lina'), dann: [['lina', 'Nichts. Also … Comics. Keine guten.']] },
      ] },
    ] },
    { herz: 3, titel: 'Der Comic', g: [
      ['lina', 'Okay. Du darfst eine Seite sehen.'],
      ['erzaehler', 'Ein Mädchen mit Rucksack. Ein riesiger Gang. Die Spinde haben Augen.'],
      { wahl: [
        { t: 'Die Spinde mit Augen sind genial.', herz: nett('lina', 2), dann: [['lina', 'So fühlt sich der erste Tag an. Fand ich.']] },
        { t: 'Wie lange brauchst du für eine Seite?', staerke: 'zuhoeren', herz: nett('lina'), dann: [['lina', 'Zwei Tage. Wenn keiner guckt.']] },
      ] },
    ] },
    { herz: 4, titel: 'Laut werden', g: [
      ['lina', 'Ich hab heute im Unterricht was gesagt. Einen ganzen Satz.'],
      ['lina', 'Meine Stimme hat gezittert. Aber er war draußen.'],
      { wahl: [
        { t: 'Ich hab’s gehört. Er war gut.', herz: nett('lina', 2), dann: [['lina', 'Echt? … Morgen vielleicht zwei Sätze.']] },
        { t: 'Zittern ist okay. Gesagt ist gesagt.', staerke: 'zuhoeren', herz: nett('lina'), dann: [['lina', 'Gesagt ist gesagt. Schreib ich mir auf.']] },
      ] },
    ] },
  ],
  jo: [
    { herz: 2, titel: 'Samstag', g: [
      ['jo', 'Samstags helf ich in der Werkstatt. Reifen wechseln.'],
      { wahl: [
        { t: 'Macht dir das Spaß?', staerke: 'zuhoeren', herz: nett('jo', 2), dann: [['jo', 'Ja. Da sagt keiner, ich bin zu laut.'], ['jo', 'Da bin ich einfach schnell. Und gut.']] },
        { t: 'Klingt anstrengend.', herz: nett('jo'), dann: [['jo', 'Ist es. Aber ehrlich anstrengend. Nicht Schule-anstrengend.']] },
      ] },
    ] },
    { herz: 3, titel: 'Wut', g: [
      ['jo', 'Ich bin heute fast wieder explodiert. Wegen nichts.'],
      { wahl: [
        { t: 'Was war los?', staerke: 'zuhoeren', herz: nett('jo', 2), dann: [['jo', 'Einer hat gelacht. Ich dachte, über mich.'], ['jo', 'War nicht so. Hab ich dann gemerkt.']] },
        { t: 'Fast ist besser als ganz.', herz: nett('jo'), dann: [['jo', 'Hm. Stimmt eigentlich. Fast.']] },
        { t: 'Du musst dich halt beherrschen.', dann: [['jo', 'Danke. Wär ich nie drauf gekommen.']] },
      ] },
    ] },
    { herz: 4, titel: 'Der Trick', g: [
      ['jo', 'M. Becker hat gesagt: „Erst Hände in die Taschen. Dann reden.“'],
      ['jo', 'Klingt dumm. Hat aber zweimal geklappt.'],
      { wahl: [
        { t: 'Zweimal ist ein Anfang.', staerke: 'ruhig', herz: nett('jo'), dann: [['jo', 'Nächste Woche drei. Wetten?']] },
        { t: 'Was machst du danach?', staerke: 'zuhoeren', herz: nett('jo'), dann: [['jo', 'Rausgehen. Eine Runde um die Turnhalle. Dann geht’s.']] },
      ] },
    ] },
  ],
  ben: [
    { herz: 2, titel: 'Der Klassenclown', g: [
      ['ben', 'Weißt du, warum ich immer Witze mach?'],
      { wahl: [
        { t: 'Weil du witzig bist?', herz: nett('ben'), dann: [['ben', 'Auch. Aber vor allem vor Tests.']] },
        { t: 'Sag du es mir.', staerke: 'zuhoeren', herz: nett('ben', 2), dann: [['ben', 'Wenn alle lachen, merkt keiner, dass ich nervös bin.']] },
      ] },
    ] },
    { herz: 3, titel: 'Vor dem Test', g: [
      ['ben', 'Morgen ist Mathe. Mein Bauch weiß es schon.'],
      { wahl: [
        { t: 'Wollen wir zusammen üben?', staerke: 'fair', herz: nett('ben', 2), dann: [['ben', 'Zehn Minuten. Dann Korbball. Deal.'], ['erzaehler', 'Ihr rechnet drei Aufgaben. Die dritte schafft Ben allein.']] },
        { t: 'Ich bin auch nervös.', herz: nett('ben'), dann: [['ben', 'Echt? Gut. Also … nicht gut. Aber gut zu wissen.']] },
      ] },
    ] },
    { herz: 4, titel: 'Ohne Witz', g: [
      ['ben', 'Heute im Test hab ich keinen Witz gemacht.'],
      ['ben', 'Ich hab einfach angefangen. Mit der leichtesten Aufgabe.'],
      { wahl: [
        { t: 'Und?', staerke: 'zuhoeren', herz: nett('ben'), dann: [['ben', 'Hat geklappt. Bauch war trotzdem da. Aber leiser.']] },
        { t: 'Witze sind trotzdem gut. Nur nicht als Versteck.', herz: nett('ben'), dann: [['ben', 'Das klau ich. Das ist gut.']] },
      ] },
    ] },
  ],
  chiara: [
    { herz: 2, titel: 'Perfekt', g: [
      ['chiara', 'Ich hab eine 48 von 60. Ich ärgere mich total.'],
      { wahl: [
        { t: '48 ist richtig gut.', herz: nett('chiara'), dann: [['chiara', 'Sagen alle. In meinem Kopf zählt nur die 60.']] },
        { t: 'Was sagt dein Kopf genau?', staerke: 'zuhoeren', herz: nett('chiara', 2), dann: [['chiara', '„Du hättest mehr lernen müssen.“ Immer derselbe Satz.']] },
      ] },
    ] },
    { herz: 3, titel: 'Was ich will', g: [
      ['chiara', 'Darf ich dir was sagen? Ich bau gern Sachen.'],
      ['chiara', 'Regale. Lampen. Ich hab eine Lampe aus einem Glas gebaut.'],
      { wahl: [
        { t: 'Wie ging das?', staerke: 'zuhoeren', herz: nett('chiara', 2), dann: [['chiara', 'Fassung, Kabel, Glas. Und viel YouTube.'], ['chiara', 'Sie leuchtet. Ich hab’s selbst gemacht.']] },
        { t: 'Das klingt nach Werkstatt.', herz: nett('chiara'), dann: [['chiara', 'Vielleicht. Ich hab mal ins Atelier geschaut. Heimlich.']] },
      ] },
    ] },
    { herz: 4, titel: 'Gut genug', g: [
      ['chiara', 'Ich hab heute was abgegeben, das nicht perfekt war.'],
      ['chiara', 'Absichtlich. Als Übung.'],
      { wahl: [
        { t: 'Wie war das?', staerke: 'zuhoeren', herz: nett('chiara'), dann: [['chiara', 'Schrecklich. Dann okay. Dann fast egal.']] },
        { t: 'Mutig.', herz: nett('chiara'), dann: [['chiara', 'Klingt komisch. Aber ja. Für mich war’s mutig.']] },
      ] },
    ] },
  ],
  yusuf: [
    { herz: 2, titel: 'Judo', g: [
      ['yusuf', 'Hm. Du fragst nach Judo?'],
      { wahl: [
        { t: 'Ja. Was magst du daran?', staerke: 'zuhoeren', herz: nett('yusuf', 2), dann: [['yusuf', 'Man fällt. Und lernt, wie man richtig fällt.'], ['yusuf', 'Dann tut es nicht weh.']] },
        { t: 'Ist das nicht gefährlich?', herz: nett('yusuf'), dann: [['yusuf', 'Nicht, wenn man die Regeln kennt. Wie überall.']] },
      ] },
    ] },
    { herz: 3, titel: 'Wenig reden', g: [
      ['yusuf', 'Die Leute denken, ich bin unfreundlich. Weil ich wenig rede.'],
      { wahl: [
        { t: 'Ich find dich nicht unfreundlich.', herz: nett('yusuf', 2), dann: [['yusuf', 'Gut. Ich überlege nur lange. Bevor ich was sage.']] },
        { t: 'Was würdest du ihnen gern sagen?', staerke: 'zuhoeren', herz: nett('yusuf'), dann: [['yusuf', '„Wartet kurz. Ich bin noch beim Denken.“']] },
      ] },
    ] },
    { herz: 4, titel: 'Der Wettkampf', g: [
      ['yusuf', 'Samstag ist Wettkampf. Ich hab zum ersten Mal Lampenfieber.'],
      { wahl: [
        { t: 'Was machst du dagegen?', staerke: 'zuhoeren', herz: nett('yusuf'), dann: [['yusuf', 'Der Trainer sagt: Atme in den Bauch. Dann die Füße spüren.']] },
        { t: 'Lampenfieber heißt: Es ist dir wichtig.', herz: nett('yusuf'), dann: [['yusuf', '… So hab ich das nie gesehen.']] },
      ] },
    ] },
  ],
  ayla: [
    { herz: 2, titel: 'Die Band', g: [
      ['ayla', 'Wir haben einen Namen für die Band. Fast.'],
      { wahl: [
        { t: 'Sag schon!', herz: nett('ayla', 2), dann: [['ayla', '„Kein WLAN“. Oder „Pausenklingel“. Wir streiten noch.']] },
        { t: 'Was spielst du?', staerke: 'zuhoeren', herz: nett('ayla'), dann: [['ayla', 'Bass. Man hört ihn nicht. Aber ohne ihn fällt alles um.']] },
      ] },
    ] },
    { herz: 3, titel: 'Nie schreiben', g: [
      ['ayla', 'In der Klassengruppe les ich alles. Ich schreib nie.'],
      ['ayla', 'Ich hab Angst, dass es komisch klingt.'],
      { wahl: [
        { t: 'Fang mit einem Emoji an.', herz: nett('ayla', 2), dann: [['ayla', 'Ein Daumen? Das schaff ich. Vielleicht.']] },
        { t: 'Was wäre das Schlimmste?', staerke: 'zuhoeren', herz: nett('ayla'), dann: [['ayla', 'Dass keiner antwortet. … Das passiert ja eh oft.']] },
      ] },
    ] },
    { herz: 4, titel: 'Die Probe', g: [
      ['ayla', 'Wir haben vor Leuten geprobt. Fünf Leute. Mein Bein hat gezittert.'],
      ['ayla', 'Aber der Bass war da. Die ganze Zeit.'],
      { wahl: [
        { t: 'Beim nächsten Mal komm ich.', staerke: 'einbeziehen', herz: nett('ayla', 2), dann: [['ayla', 'Dann sind es sechs. Okay. Sechs geht.']] },
        { t: 'Zittern und spielen. Beides geht.', herz: nett('ayla'), dann: [['ayla', 'Ja. Das hab ich heute gelernt.']] },
      ] },
    ] },
  ],
  luca: [
    { herz: 2, titel: 'Hart tun', g: [
      ['luca', 'Was willst du? … Sorry. Gewohnheit.'],
      { wahl: [
        { t: 'Schon okay. Wie geht’s?', staerke: 'klar', herz: nett('luca', 2), dann: [['luca', 'Fragt keiner. … Müde. Lange Woche.']] },
        { t: 'Gewohnheit von was?', staerke: 'zuhoeren', herz: nett('luca'), dann: [['luca', 'Wenn man hart tut, lassen einen alle in Ruhe.']] },
      ] },
    ] },
    { herz: 3, titel: 'Kochen', g: [
      ['luca', 'Sag’s keinem. Ich koch gern.'],
      ['luca', 'Frau Kremer hat mich mal das Curry abschmecken lassen.'],
      { wahl: [
        { t: 'Warum soll das keiner wissen?', staerke: 'zuhoeren', herz: nett('luca', 2), dann: [['luca', 'Passt nicht zu mir. Denken die. Vielleicht passt es doch.']] },
        { t: 'Was kochst du am liebsten?', herz: nett('luca'), dann: [['luca', 'Nudeln mit Tomatensoße. Aber richtig. Mit Basilikum.']] },
      ] },
    ] },
    { herz: 4, titel: 'Praktikum', g: [
      ['luca', 'Ich will ein Praktikum in einer Küche. Ehrlich.'],
      { wahl: [
        { t: 'Frag Frau Kremer, wie man anfängt.', staerke: 'hilfe', herz: nett('luca'), dann: [['luca', 'Hab ich schon. Sie hat gelacht. Freundlich gelacht.']] },
        { t: 'Das passt zu dir.', herz: nett('luca', 2), dann: [['luca', '… Danke. Das hat noch keiner gesagt.']] },
      ] },
    ] },
  ],
  kenan: [
    { herz: 2, titel: 'Zweimal abgelehnt', g: [
      ['kenan', 'Zweimal hab ich mich beworben. Zweimal nein.'],
      { wahl: [
        { t: 'Und jetzt?', staerke: 'zuhoeren', herz: nett('kenan', 2), dann: [['kenan', 'Jetzt das dritte Mal. Becker hilft mit dem Brief.']] },
        { t: 'Die wissen nicht, was sie verpassen.', herz: nett('kenan'), dann: [['kenan', 'Haha. Schreib ich so in den Brief.']] },
      ] },
    ] },
    { herz: 3, titel: 'Das Holz', g: [
      ['kenan', 'Weißt du, was ich an Holz mag? Es verzeiht nichts.'],
      ['kenan', 'Falsch gesägt ist falsch gesägt. Da kann man nicht reden.'],
      { wahl: [
        { t: 'Und das magst du?', staerke: 'zuhoeren', herz: nett('kenan', 2), dann: [['kenan', 'Ja. Es ist ehrlich. Wie Becker.']] },
        { t: 'Zweimal messen, einmal sägen.', herz: nett('kenan'), dann: [['kenan', 'Du hast aufgepasst. Respekt.']] },
      ] },
    ] },
    { herz: 4, titel: 'Aufhören', g: [
      ['kenan', 'Dario nervt. Ich soll aufhören zu rauchen.'],
      { wahl: [
        { t: 'Er mag dich halt.', herz: nett('kenan'), dann: [['kenan', '… Ja. Weiß ich. Deshalb nervt es ja.']] },
        { t: 'Was denkst du selbst?', staerke: 'zuhoeren', herz: nett('kenan', 2), dann: [['kenan', 'Treppe zur Werkstatt. Ich keuche. Mit siebzehn.'], ['kenan', 'Ich überleg’s mir. Sag’s ihm noch nicht.']] },
      ] },
    ] },
  ],
  dario: [
    { herz: 2, titel: 'Alles gut', g: [
      ['dario', 'Ich sag immer „alles gut“. Ist es nicht immer.'],
      { wahl: [
        { t: 'Heute auch nicht?', staerke: 'zuhoeren', herz: nett('dario', 2), dann: [['dario', 'Heute so mittel. Zu wenig geschlafen. Zu viel Handy.']] },
        { t: 'Musst du ja nicht immer sagen.', herz: nett('dario'), dann: [['dario', 'Stimmt. Ist nur einfacher als die lange Version.']] },
      ] },
    ] },
    { herz: 3, titel: 'Der Freund', g: [
      ['dario', 'Kenan ist mein bester Freund. Seit der Grundschule.'],
      ['dario', 'Ich mach mir Sorgen. Wegen dem Rauchen.'],
      { wahl: [
        { t: 'Hast du ihm das gesagt?', staerke: 'klar', herz: nett('dario', 2), dann: [['dario', 'Hundertmal. Vielleicht sag ich es mal ohne zu nerven.']] },
        { t: 'Das zeigt, dass er dir wichtig ist.', herz: nett('dario'), dann: [['dario', 'Ja. Aber er soll das nicht wissen. Zu peinlich.']] },
      ] },
    ] },
    { herz: 4, titel: 'Handy weg', g: [
      ['dario', 'Ich hab das Handy nachts in die Küche gelegt. Drei Nächte.'],
      { wahl: [
        { t: 'Und?', staerke: 'zuhoeren', herz: nett('dario'), dann: [['dario', 'Erste Nacht: schrecklich. Dritte Nacht: geschlafen wie ein Stein.']] },
        { t: 'Das probier ich auch.', herz: nett('dario', 2), dann: [['dario', 'Dann machen wir das zusammen. Wer’s zuerst bricht, zahlt Kakao.']] },
      ] },
    ] },
  ],
};
