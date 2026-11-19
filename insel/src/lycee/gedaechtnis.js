// Annexe Junglinster – das Gedächtnis der Welt (Auftrag 19.11.: „mit Tiefe“).
// Was du tust, bleibt hängen. Freundinnen und Freunde kommen Wochen später darauf zurück – kurz, im Vorbeigehen,
// so wie Jugendliche das tun (kein Therapie-Ton, keine Moral). Fremde auf dem Hof reden über deinen Ruf.
// Jede Erinnerung kommt höchstens einmal, nur in einem Zeitfenster (ab Kapitel … bis …) und höchstens eine pro
// Person und Abschnitt. Sie ersetzt dann den kleinen Plauder-Satz (spiel.js, plaudern).
// Stil wie faeden.js: höchstens ~12 Wörter pro Sprechblase, nichts aus Familien, ehrlich – auch bei schlechten Entscheidungen.

const m = (f) => (x) => !!x[f];
const und = (...fs) => (x) => fs.every((f) => !!x[f]);

// { id, wer, ab, bis?, wenn: (merke) => bool, g: [...Gespräch] }
export const GEDAECHTNIS = [
  // ---------- aus Kapitel 1 ----------
  { id: 'blindNoahHektik', wer: 'noah', ab: 2, wenn: und('blindNoah', 'blindHektik'), g: [
    ['noah', 'Beim Blind-Parcours warst du wie ein Navi im Tunnel.'],
    ['noah', 'Ich hab’s überlebt. Knapp. Nächstes Mal flüsterst du.'] ] },
  { id: 'blindNoahGut', wer: 'noah', ab: 2, wenn: und('blindNoah', 'blindGut'), g: [
    ['noah', 'Ich denk noch manchmal an den Parcours.'],
    ['noah', 'Ich hab dir einfach vertraut. Mach ich sonst nie.'] ] },
  { id: 'blindMilaGut', wer: 'mila', ab: 2, wenn: und('blindMila', 'blindGut'), g: [
    ['mila', 'Deine Ansagen beim Parcours: präzise. Ich hab sie mir notiert.'],
    ['mila', 'Für den Fall, dass ich mal wieder blind laufen muss.'] ] },
  { id: 'blindBenHektik', wer: 'ben', ab: 2, wenn: und('blindBen', 'blindHektik'), g: [
    ['ben', 'Bruder. Beim Parcours hast du geschrien wie mein Trainer.'],
    ['ben', 'Ich bin trotzdem nicht im Brunnen gelandet. Zählt.'] ] },
  { id: 'linaHeft', wer: 'lina', ab: 2, wenn: m('linaOffen'), g: [
    ['lina', '(zeigt kurz ihr Heft) Gerd hat jetzt einen Hut.'],
    ['lina', 'Du bist die einzige Person, die das Heft kennt.'] ] },
  { id: 'noahAura', wer: 'noah', ab: 2, bis: 4, wenn: m('noahAura'), g: [
    ['noah', '„Minus 200 Aura.“ Ben sagt das jetzt dauernd.'],
    ['noah', 'Deine Schuld. Ich find’s aber lustig.'] ] },
  { id: 'zettelKrimi', wer: 'ben', ab: 2, bis: 4, wenn: m('zettelGut'), g: [
    ['ben', 'Der Zettel-Krimi am ersten Tag. Du hast fast alles erraten.'],
    ['ben', 'Mme Tidderich nennt dich seitdem „Detektiv“. Hab ich gehört.'] ] },
  { id: 'kantineKnall', wer: 'ben', ab: 2, bis: 3, wenn: m('kantineKnall'), g: [
    ['ben', 'Erster Tag, Kantine, du gegen Luca. Die halbe Schule redet noch.'],
    { wahl: [
      { t: '„War nicht meine beste Idee.“', herz: { ben: 1 }, dann: [['ben', 'Nee. Aber jetzt weiß jeder, wie du heißt.']] },
      { t: '„Er hat angefangen.“', dann: [['ben', 'Stimmt. Und du hast weitergemacht. Beides wahr.']] },
    ] } ] },

  // ---------- aus Kapitel 2 ----------
  { id: 'kompliment', wer: 'noah', ab: 3, wenn: m('komplimentKlein'), g: [
    ['noah', 'Du hast meine Karte damals kleingeredet.'],
    ['noah', 'Ich hab sie trotzdem behalten. Für dich. Falls du sie brauchst.'] ] },
  { id: 'komplimentDanke', wer: 'noah', ab: 3, wenn: m('komplimentAngenommen'), g: [
    ['noah', 'Du hast damals einfach „Danke“ gesagt. Nur das.'],
    ['noah', 'Das war … angenehm. Mach ich jetzt auch so.'] ] },
  { id: 'alphabet', wer: 'noah', ab: 3, wenn: m('noahErmutigt'), g: [
    ['noah', 'Alphabet rückwärts. Sechs Sekunden. Ich übe jetzt auf fünf.'],
    ['noah', 'Ohne dich hätt ich’s nie gezeigt.'] ] },
  { id: 'gedraengt', wer: 'noah', ab: 3, wenn: m('noahGedraengt'), g: [
    ['noah', 'Beim Talenttag … das war zu viel Gas. Nur dass du’s weißt.'],
    { wahl: [
      { t: '„Sorry. Nächstes Mal frag ich erst.“', staerke: 'zuhoeren', herz: { noah: 2 }, dann: [['noah', 'Okay. Dann zeig ich dir das Alphabet. Irgendwann.']] },
      { t: '„Ich wollte nur helfen.“', dann: [['noah', 'Weiß ich. Helfen geht nur leiser.']] },
    ] } ] },
  { id: 'ruhmKorb', wer: 'ben', ab: 3, bis: 5, wenn: m('ruhmKorb'), g: [
    ['ben', 'Deine Freiwürfe beim Talenttag. Ich erzähl’s immer noch rum.'],
    ['ben', 'Jedes Mal ein Treffer mehr. Bald bist du Profi.'] ] },
  { id: 'ruhmBand', wer: 'ayla', ab: 3, bis: 6, wenn: m('ruhmBand'), g: [
    ['ayla', 'Seit dem Talenttag fragt Chiara, ob du wieder trommelst.'],
    ['ayla', 'Probe ist donnerstags. Nur so. Kein Druck.'] ] },

  // ---------- aus Kapitel 3 ----------
  { id: 'abgewiegelt', wer: 'mila', ab: 4, wenn: m('milaAbgewiegelt'), g: [
    ['mila', '„Morgen ist es vergessen“, hast du gesagt. Es ist nicht vergessen.'],
    ['mila', 'Aber du bist noch da. Das zählt auch.'] ] },
  { id: 'teamMila', wer: 'mila', ab: 4, wenn: m('teamMila'), g: [
    ['mila', 'Unsere Tabelle hat jetzt 31 Zeilen. Ermittlungsteam, weißt du noch?'],
    ['mila', 'Du bist Zeile eins. Partner.'] ] },
  { id: 'kuedesAngebot', wer: 'mila', ab: 4, wenn: m('kuedesAngeboten'), g: [
    ['mila', 'Du hast mir damals Herrn Kuedes angeboten.'],
    ['mila', 'Ich war dann bei ihm. Hat geholfen. Mehr sag ich nicht.'] ] },
  { id: 'sitzen', wer: 'noah', ab: 4, bis: 6, wenn: m('sitzenGeblieben'), g: [
    ['noah', 'Als Mila aus der Kantine gerannt ist … wir sind beide sitzen geblieben.'],
    ['noah', 'Nächstes Mal stehen wir auf. Abgemacht?'],
    { wahl: [
      { t: '„Abgemacht.“', staerke: 'einbeziehen', herz: { noah: 1 }, dann: [['noah', '(nickt) Gut. Ich merk’s mir.']] },
      { t: '„Wir wussten’s halt nicht.“', dann: [['noah', 'Stimmt. Jetzt wissen wir’s.']] },
    ] } ] },
  { id: 'anonymKlar', wer: 'jo', ab: 4, wenn: m('joAnonymKlar'), g: [
    ['jo', 'Hab den Fragen-Sticker gelöscht. „Feige“ war das richtige Wort.'] ] },
  { id: 'anonymGefragt', wer: 'jo', ab: 4, wenn: m('joAnonymGefragt'), g: [
    ['jo', 'Wegen der anonymen Fragen damals. Du hast nicht gelacht.'],
    ['jo', 'Danke. Sag ich nur einmal. Also: danke.'] ] },
  { id: 'anonymGelacht', wer: 'jo', ab: 4, wenn: m('joAnonymGelacht'), g: [
    ['jo', 'Die anonymen Fragen damals. Du hast mitgelacht.'],
    ['jo', 'War nicht lustig. Für mich jedenfalls.'],
    { wahl: [
      { t: '„Stimmt. Sorry, Jo.“', staerke: 'mut', herz: { jo: 2 }, dann: [['jo', '… Okay. Angenommen.']] },
      { t: '„War doch nur Spaß.“', herz: { jo: -1 }, dann: [['jo', 'Ja. Für dich.']] },
    ] } ] },
  { id: 'synchron', wer: 'ayla', ab: 4, wenn: m('synchronGut'), g: [
    ['ayla', 'Beim Synchronstudio hast du jede Stimme erkannt.'],
    ['ayla', 'Du hast Band-Ohren. Ich sag’s nur.'] ] },

  // ---------- aus Kapitel 4 ----------
  { id: 'blackout', wer: 'noah', ab: 5, wenn: m('auchBlackout'), g: [
    ['noah', 'Team Weißer Bildschirm: Beim letzten Test hab ich geatmet.'],
    ['noah', 'Vier ein, sechs aus. Der Kopf blieb an. Fast ganz.'] ] },
  { id: 'gesehen', wer: 'ben', ab: 5, bis: 6, wenn: m('gesehenPruefen'), g: [
    ['ben', 'Du hast gefragt, warum ich nicht antworte. Akku. Wie immer.'],
    ['ben', 'Gut, dass du gefragt hast. Andere sind dann beleidigt.'] ] },
  { id: 'ernstfallGut', wer: 'mila', ab: 5, wenn: m('ernstfallGut'), g: [
    ['mila', '2.11 ist jetzt mein Lieblingsraum. Klingt komisch.'],
    ['mila', 'Weil du da warst. Mehr Begründung gibt es nicht.'] ] },
  { id: 'ernstfallSchwer', wer: 'mila', ab: 5, wenn: m('ernstfallSchwer'), g: [
    ['mila', 'Freitag im Gang. Du hast Mme Rantini geholt.'],
    ['mila', 'Das war richtig. Auch wenn es sich nicht so angefühlt hat.'] ] },

  // ---------- aus Kapitel 5 ----------
  { id: 'saalHinten', wer: 'ben', ab: 6, bis: 7, wenn: m('saalHinten'), g: [
    ['ben', 'Nach dem Fake saßt du ganz hinten. Allein.'],
    ['ben', 'Nächstes Mal: Platz neben mir. Reserviert. Für immer.'] ] },
  { id: 'lawine', wer: 'mila', ab: 6, wenn: m('lawineGezaehlt'), g: [
    ['mila', 'Ich zähle jetzt bei jedem Shitstorm die Konten.'],
    ['mila', 'Meistens drei. Manchmal zwei. Laut ist nicht viel.'] ] },
  { id: 'sorge', wer: 'ben', ab: 6, bis: 7, wenn: m('sorgeGesagt'), g: [
    ['ben', 'Du hattest Angst, die anderen glauben den Fake.'],
    ['ben', 'Und? Glaubt keiner. Außer Luca. Luca zählt nicht.'] ] },

  // ---------- aus Kapitel 6 ----------
  { id: 'stoppMittel', wer: 'mila', ab: 7, wenn: m('stoppMittel'), g: [
    ['mila', 'Im CDI hast du was gesagt. Leise, aber du hast.'],
    ['mila', 'Nächstes Mal sagen wir’s zusammen. Lauter.'] ] },
  { id: 'verraeter', wer: 'jo', ab: 7, wenn: m('joDuBotschaft'), g: [
    ['jo', '„Verräter.“ Das Wort hängt mir noch nach.'],
    ['jo', 'Ich hab’s ein bisschen verdient. Aber nur ein bisschen.'],
    { wahl: [
      { t: '„Das war hart von mir. Ich war sauer.“', staerke: 'klar', herz: { jo: 2 }, dann: [['jo', 'Ich weiß. Ich wär auch sauer gewesen.']] },
      { t: '(Nichts sagen.)', dann: [['jo', '(nickt) Okay. Auch eine Antwort.']] },
    ] } ] },
  { id: 'eigenerSatz', wer: 'jo', ab: 7, wenn: m('eigenerSatz'), g: [
    ['jo', 'Dein Satz am Korb. Den hab ich mir gemerkt. Wortwörtlich.'],
    ['jo', 'Ich hab ihn sogar bei meinem Bruder benutzt. Hat funktioniert.'] ] },

  // ---------- aus Kapitel 7 ----------
  { id: 'treppe', wer: 'jo', ab: 8, wenn: m('treppeSpaet'), g: [
    ['jo', 'Am Korb mit Luca … fast hätt ich zugeschlagen.'],
    ['jo', 'Du warst da. Spät, aber da.'] ] },
  { id: 'planDazu', wer: 'noah', ab: 8, wenn: m('planDazu'), g: [
    ['noah', 'Du hast gesagt: „Ich setz mich dazu.“ Weißt du noch?'],
    ['noah', 'Ich hab mir das auch vorgenommen. Gestern zum ersten Mal.'] ] },
  { id: 'druckWackel', wer: 'dario', ab: 8, bis: 9, wenn: m('druckWackel'), g: [
    ['dario', 'An der Skate-Ecke hast du nicht Ja gesagt. Aber auch nicht Nein.'],
    ['dario', 'Luca hat das gemerkt. Er merkt so was immer.'] ] },

  // ---------- aus Kapitel 8 ----------
  { id: 'videoGelacht', wer: 'lina', ab: 9, wenn: m('videoGelacht'), g: [
    ['lina', '(leise) Das Video von Mme Tidderich. Du hast gelacht.'],
    ['lina', 'Sie hat es gesehen. Glaub ich.'],
    { wahl: [
      { t: '„Ja. Das war blöd. Ich sag ihr das.“', staerke: 'mut', herz: { lina: 2, hoffmann: 1 }, dann: [['lina', '(nickt) Das ist gut. Wirklich.']] },
      { t: '„Alle haben gelacht.“', dann: [['lina', 'Ich nicht.']] },
    ] } ] },
  { id: 'quelle', wer: 'mila', ab: 9, wenn: m('quelleGeprueft'), g: [
    ['mila', 'Beim Wasserrohr-Post hast du die Quelle geprüft.'],
    ['mila', 'Ich war stolz. Kurz. Jetzt wieder normal.'] ] },
  { id: 'beruhigt', wer: 'noah', ab: 9, wenn: m('noahBeruhigt'), g: [
    ['noah', '„Passiert eh nicht“, hast du gesagt. Es ist passiert.'],
    ['noah', 'Schon okay. Du wolltest mich beruhigen. Hat nur nicht geklappt.'] ] },

  // ---------- aus Kapitel 9 ----------
  { id: 'akku', wer: 'jo', ab: 10, wenn: m('akkuLeer'), g: [
    ['jo', 'Seit dem Akku-Spiel lieg ich um zehn im Bett. Fast immer.'],
    ['jo', 'Ich bin jetzt bei 80 Prozent. Neuer Rekord.'] ] },
  { id: 'darioMensch', wer: 'dario', ab: 10, wenn: m('darioMensch'), g: [
    ['dario', 'Du hast gesagt: „Ich bin da.“ Drei Wörter.'],
    ['dario', 'Ich hab sie nicht vergessen.'] ] },
  { id: 'rucksack', wer: 'dario', ab: 10, wenn: m('rucksackLeichter'), g: [
    ['dario', 'Der Rucksack ist leichter. Ehrlich.'],
    ['dario', 'Ein paar Steine liegen jetzt bei Herrn Kuedes. Da gehören sie hin.'] ] },

  // ---------- aus Kapitel 7 und 8 (spät im Jahr) ----------
  { id: 'spionNein', wer: 'lina', ab: 8, wenn: m('spionNein'), g: [
    ['lina', 'Du wolltest die Screenshots von Lucas Gruppe nicht. Weißt du noch?'],
    ['lina', 'Ich hab sie dann gelöscht. War besser so.'] ] },
  { id: 'spionJa', wer: 'lina', ab: 8, bis: 9, wenn: m('spionJa'), g: [
    ['lina', 'Die Screenshots aus Lucas Gruppe … ich hab mich danach komisch gefühlt.'],
    { wahl: [
      { t: '„Ich auch. Wir hätten es lassen sollen.“', staerke: 'klar', herz: { lina: 2 }, dann: [['lina', '(nickt) Nächstes Mal sagen wir Nein. Beide.']] },
      { t: '„War halt nötig.“', dann: [['lina', 'Vielleicht. Gut fühlt es sich trotzdem nicht an.']] },
    ] } ] },
  { id: 'falleEhrlich', wer: 'mila', ab: 9, wenn: m('falleEhrlich'), g: [
    ['mila', 'Die Mappe für Herrn Kuedes. Nur Sicheres. Das war unser bester Plan.'],
    ['mila', 'Ich hab sie kopiert. Für mein Archiv. Natürlich.'] ] },
  { id: 'falleLuege', wer: 'mila', ab: 9, bis: 10, wenn: m('falleLuege'), g: [
    ['mila', 'Du wolltest Luca eine Falle stellen.'],
    ['mila', 'Ich versteh’s. Aber mit Fakes gegen Fakes gewinnt keiner.'] ] },
  { id: 'noahProfil', wer: 'noah', ab: 9, wenn: m('noahProfil'), g: [
    ['noah', 'Mein Profil ist jetzt privat. Seit wir zusammen geguckt haben.'],
    ['noah', 'Mein Kaktus ist das Profilbild. Kevin ist jetzt berühmt. Für vier Leute.'] ] },
  { id: 'darioWuerfel', wer: 'dario', ab: 10, wenn: m('darioWuerfel'), g: [
    ['dario', 'Bens Würfel damals. Du hast mich mitspielen lassen.'],
    ['dario', 'Da hab ich gedacht: Vielleicht geht das wieder. Mit euch.'] ] },
  { id: 'serie', wer: 'dario', ab: 10, wenn: m('serieGefragt'), g: [
    ['dario', 'Die Flamme ist aus. Meine Serie. 212 Tage.'],
    ['dario', 'Und? Nichts passiert. Hab ich ja selbst gesagt. Damals.'] ] },

  // ---------- Erwachsene erinnern sich auch (trockener Ton, keine Lobrede) ----------
  { id: 'kayaDm', wer: 'kaya', ab: 3, wenn: m('dmErwachsen'), g: [
    ['kaya', 'Die Nachricht von @annexe.cam, die du gezeigt hast …'],
    ['kaya', 'Das war genau richtig. So was trägt man nicht allein.'] ] },
  { id: 'kayaGeholt', wer: 'kaya', ab: 5, wenn: m('kuedesGeholt'), g: [
    ['kaya', 'Du hast mich geholt, als Noah keine Luft bekam.'],
    ['kaya', 'Das war Hilfe holen. Kein Drama. Danke.'] ] },
  { id: 'kayaPlan', wer: 'kaya', ab: 8, wenn: m('planHilfe'), g: [
    ['kaya', 'Du hast gesagt: „Ich hol Hilfe.“ Meine Tür ist offen.'],
    ['kaya', 'Auch für kleine Sachen. Die werden sonst groß.'] ] },
  { id: 'sommerKnall', wer: 'sommer', ab: 4, wenn: m('joKnall'), g: [
    ['sommer', '(pfeift kurz) Sportfest. Du und Jo. Bank, fünf Minuten.'],
    ['sommer', 'Seitdem seid ihr ruhiger. Gut so.'] ] },
  { id: 'sommerVersoehnt', wer: 'sommer', ab: 4, wenn: m('joVersoehnt'), g: [
    ['sommer', 'Du und Jo trainiert zusammen? Hab’s gesehen. Weiter so.'] ] },
  { id: 'hoffmannFrage', wer: 'hoffmann', ab: 2, bis: 4, wenn: m('hoffmannGefragt'), g: [
    ['hoffmann', 'Du hast am ersten Tag nach @annexe.cam gefragt.'],
    ['hoffmann', 'Gute Frage. Ich hab sie weitergegeben. Wie sagt ihr … safe.'] ] },
  // ---------- aus den schwierigen Situationen (situationen.js) – Freunde kommen später darauf zurück ----------
  { id: 'sitWaldNein', wer: 'ben', ab: 5, wenn: (x) => ['nein', 'gegangen', 'umgelenkt', 'ausrede'].includes(x.sit_wald), g: [
    ['ben', 'Gerücht: Du warst an der Lichtung. Und bist einfach gegangen?'],
    ['ben', 'Ich hätte mich das nicht getraut. Ehrlich.'] ] },
  { id: 'sitWaldMit', wer: 'noah', ab: 5, wenn: (x) => x.sit_wald === 'mitgemacht', g: [
    ['noah', 'Ich hab das Video gesehen. Von der Lichtung.'],
    ['noah', 'Du sahst nicht aus, als hättest du Spaß. Alles okay?'] ] },
  { id: 'sitLadenGeklaut', wer: 'mila', ab: 6, wenn: (x) => x.sit_laden === 'geklaut' && !x.zurueckgebracht, g: [
    ['mila', 'Das Épicerie-Video. Ich hab es nicht weitergeschickt.'],
    ['mila', 'Tante Lisette ist nett. Nur so als Info.'] ] },
  { id: 'sitLadenZurueck', wer: 'lina', ab: 6, wenn: m('zurueckgebracht'), g: [
    ['lina', 'Tante Lisette erzählt, jemand kam zurück und hat bezahlt.'],
    ['lina', '(lächelt) Du musst nichts sagen.'] ] },
  { id: 'sitWetteWippe', wer: 'jo', ab: 6, wenn: (x) => x.sit_wette === 'wippe', g: [
    ['jo', 'Wippen-Turnier am Spielplatz? Ohne mich? Verrat!'],
    ['jo', 'Nächstes Mal bin ich dabei. Ich bin Wippen-Profi.'] ] },
  { id: 'sitWetteDosen', wer: 'ayla', ab: 6, wenn: (x) => x.sit_wette === 'getrunken', g: [
    ['ayla', 'Du sahst am Morgen aus wie ein Zombie. Die Dosen?'],
    ['ayla', 'Ich trink so was nicht mehr. Mein Herz hat mal Techno gemacht.'] ] },
  { id: 'sitWandKiesser', wer: 'luca', ab: 7, wenn: (x) => x.sit_graffiti === 'kiesser', g: [
    ['luca', 'Der mit dem D3X malt jetzt die große Wand im Neubau.'],
    ['luca', 'Krass gut. Angeblich wegen dir.'] ] },
  { id: 'sitWandGespruht', wer: 'kenan', ab: 7, wenn: (x) => x.sit_graffiti === 'gespruht', g: [
    ['kenan', 'Gelbe Finger, letzte Woche. Ich sag nix.'],
    ['kenan', 'Fernand hat zwei Stunden geschrubbt. Nur so.'] ] },
  { id: 'sitKisteKuedes', wer: 'chiara', ab: 7, wenn: m('kisteKuedes'), g: [
    ['chiara', 'Rafa spielt jetzt ohne Kisten. Er sagt, du bist schuld.'],
    ['chiara', '(grinst) Im guten Sinn.'] ] },
  { id: 'sitHalleGefilmt', wer: 'dario', ab: 8, wenn: (x) => x.sit_halle === 'gefilmt' && !x.halleGeloescht, g: [
    ['dario', 'Das Video von hinter der Turnhalle. Kam von deinem Handy, oder?'],
    ['dario', 'Sami geht da jetzt nicht mehr lang.'] ] },
  { id: 'sitHalleSami', wer: 'dario', ab: 8, wenn: (x) => x.sit_halle === 'sami', g: [
    ['dario', 'Du hast dich neben Sami gestellt? Vor allen?'],
    ['dario', 'Das hat bei mir damals keiner gemacht.'] ] },
  { id: 'sitHalleHandys', wer: 'ben', ab: 8, wenn: (x) => x.sit_halle === 'handys', g: [
    ['ben', '„Handys runter.“ Hab gehört, das warst du.'],
    ['ben', 'Bruder. Respekt.'] ] },
  { id: 'sitVapeKai', wer: 'noah', ab: 9, wenn: m('vapeKuedes'), g: [
    ['noah', 'Kai sagt, du bist mit ihm zur SePAS. Ohne Show.'],
    ['noah', 'So was merkt man sich.'] ] },
  { id: 'sitLinkGehackt', wer: 'mila', ab: 9, wenn: (x) => x.sit_link === 'eingeloggt', g: [
    ['mila', 'Dein Konto hat mir was Komisches geschrieben. Gehackt, oder?'],
    ['mila', 'Passiert den Klügsten. Mir auch schon.'] ] },
  { id: 'sitVideoLenning', wer: 'lina', ab: 10, wenn: m('lenningGesagt'), g: [
    ['lina', 'Mme Lenning war heute irgendwie anders. Freundlicher.'],
    ['lina', 'Weißt du, warum? … Egal. Schön.'] ] },
];

// Ruf: Was Fremde auf dem Hof über dich sagen (Statisten-Sprüche). Gute und weniger gute Taten.
// { id, ab, bis, wenn, t: [Sätze] }
export const RUF = [
  { id: 'kantineKnall', ab: 1, bis: 2, wenn: m('kantineKnall'), t: ['Du bist doch die Person aus der Kantine. Mit Luca.', 'Kantinen-Krieg, erster Tag. Legendär. Oder peinlich.'] },
  { id: 'top5Gelacht', ab: 2, bis: 3, wenn: m('top5Gelacht'), t: ['Du hast über die Top-5-Liste gelacht, oder? … Okay.'] },
  { id: 'milaGestoppt', ab: 3, bis: 5, wenn: m('milaGestoppt'), t: ['Du hast im Chat was gegen das Foto geschrieben. Respekt.', 'Das mit dem Mila-Foto … gut, dass das einer gesagt hat.'] },
  { id: 'joKnall', ab: 3, bis: 4, wenn: m('joKnall'), t: ['Sportfest. Du und Jo. Das war laut.'] },
  { id: 'joVersoehnt', ab: 3, bis: 5, wenn: m('joVersoehnt'), t: ['Du und Jo trainiert jetzt zusammen? Krass.'] },
  { id: 'stoppKlar', ab: 6, bis: 8, wenn: m('stoppKlar'), t: ['Das im CDI mit Luca – das warst du? Wie hast du das gemacht?', 'Stopp gesagt. Einfach so. Ich hätt mich das nicht getraut.'] },
  { id: 'druckNein', ab: 7, bis: 9, wenn: m('druckNein'), t: ['Du hast Luca Nein gesagt? Drei gegen einen? Respekt.', 'Sie sagen, du hast an der Skate-Ecke Nein gesagt. Stimmt das?'] },
  { id: 'druckJa', ab: 7, bis: 8, wenn: m('druckJa'), t: ['Hast du wirklich für Luca Fotos gemacht? … Hm.'] },
  { id: 'buehneGekippt', ab: 7, bis: 9, wenn: m('buehneGekippt'), t: ['Du hast dich in der Kantine zu ihm gesetzt. Hab ich gesehen.', 'Nach dir haben sich noch zwei dazugesetzt. Wusstest du das?'] },
  { id: 'videoGeteilt', ab: 8, bis: 9, wenn: m('videoGeteilt'), t: ['Du hattest das Tidderich-Video auch weitergeleitet, oder? Ich auch. Peinlich.'] },
  { id: 'darioBegleitet', ab: 9, bis: 10, wenn: m('darioBegleiten'), t: ['Du warst mit Dario bei Herrn Kuedes? Der wirkt seitdem anders. Besser.'] },
];

// Mitgehört: Zwei auf dem Hof reden miteinander (abwechselnd, 2–4 Sätze) – über das, was gerade in der Schule los ist.
export const BELAUSCHT = {
  1: [['Hast du die Neuen in der 7P2 gesehen?', 'Die mit dem Kantinen-Ding? Ja.', 'Mutig. Oder lebensmüde.'],
    ['Wer ist eigentlich @annexe.cam?', 'Keine Ahnung. Aber der Account folgt mir.', 'Entfolgen. Sofort.']],
  2: [['Hast du die Top-5-Liste gesehen?', 'Ja. Voll gemein.', 'Und trotzdem hast du sie geliked.'],
    ['Talenttag in der 7P2. Was würdest du zeigen?', 'Schlafen. Darin bin ich Profi.', 'Zehn Sekunden reichen dafür nicht.']],
  3: [['Sportfest Freitag. Läufst du Staffel?', 'Nur, wenn ich nicht Letzter werde.', 'Dann lauf lieber nicht.'],
    ['Das Foto von Mila … wer macht so was?', 'Jemand, der sich langweilt.', 'Oder jemand, der selbst Angst hat.']],
  4: [['Wie viel bist du heute? Von 0 bis 100?', 'Wegen dem Test? Achtzig.', 'Ich zwanzig. Ich hab ihn vergessen.'],
    ['Raumwechsel ohne Ansage. Schon wieder.', 'Ich stand zehn Minuten im falschen Stock.', 'Jetzt weißt du, wo der falsche ist.']],
  5: [['Glaubst du den Screenshot?', 'Da stand 25:14. Die Uhrzeit gibt’s nicht.', 'Detektiv-Modus. Respekt.'],
    ['Dreißig Kommentare unter dem Fake.', 'Von drei Konten.', 'Laut ist nicht viel.']],
  6: [['Klassenfoto. Ich hab die Augen zu.', 'Du hast immer die Augen zu.', 'Dann ist es wenigstens echt.'],
    ['Hast du schon mal laut Stopp gesagt?', 'Einmal. Zu meinem Bruder.', 'Und?', 'Er hat gelacht. Aber aufgehört.']],
  7: [['Luca hat eine neue Gruppe. Bist du drin?', 'Bin raus. Freiwillig.', 'Und? Wie ist es?', 'Leiser. Besser.'],
    ['Hast du das in der Kantine gesehen?', 'Ja. Keiner hat was gemacht.', 'Doch. Eine Person.']],
  8: [['Das Tidderich-Video ist KI, oder?', 'Hundert Prozent. Die Hände sind komisch.', 'Und trotzdem 300 Herzen.'],
    ['Ich hab mein Konto auf privat gestellt.', 'Warum?', 'Weil ich es kann.']],
  9: [['Ich schlaf so schlecht in letzter Zeit.', 'Handy bis zwei?', '… Vielleicht.'],
    ['Ben hat einen Würfel aus Pappe gebaut.', 'Wofür?', 'Für Gesundheit. Frag nicht.']],
  10: [['Letzte Woche. Kannst du das glauben?', 'Nein. Gestern war doch Rentrée.', 'Nächstes Jahr sind wir die Großen.'],
    ['Kommst du zum Sommerfest?', 'Wenn es Lampions gibt.', 'Es gibt immer Lampions.']],
};
