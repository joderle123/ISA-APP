// Drei Jahre Annexe – 7ème, Kapitel 8 „Digitale Welt“ (Kurs Jahr 1, Modul 7: E27 Social Media und ich – Algorithmus,
// Wenn-dann-Satz; E28 Echt oder fake? KI und Fake News – Bilder-Wette, Teilen-Bremse, Grenz-Linie).
// Faden @annexe.cam: Ein KI-Video von Mme Tidderich. Der Account verrät sich selbst („lowkey“); Mila und du legt eine
// Beweis-Mappe an (Fakten rein, Gerüchte und Privates raus) und gebt sie Herrn Kuedes. Kinder ermitteln nicht, niemand ist Köder.
import { S8_KI } from './skills-j1.js';
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
const AULA = { noah: [-16.2, -54, 1.1], mila: [-11.8, -54.2, -1.1], ben: [-12.6, -52.4, -2.2], jo: [-15.6, -52.2, 2.2], ayla: [-17.2, -56.4, 1.6], lina: [-10.9, -56.6, -1.5], chiara: [-14.4, -51.6, 3.1], yusuf: [-13.0, -57.4, -0.4] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' } };

export const SCHRITTE_N8 = [
  { id: 'k8_video', kap: 8, tag: 'Montag', uhr: 7.6, titel: 'Das Video', ziel: 'Mila steht am Eingang. Sie hält ihr Handy hoch.', marker: 'mila',
    start: { teleport: 'eingangHof', gespraech: 'n8_chat' },
    leute: { mila: [0.8, 16.6, 0.4], ben: [2.2, 17.2, -0.4] },
    fertig: { reden: 'mila', gespraech: 'n8_mila' } },
  { id: 'k8_skills', kap: 8, tag: 'Montag', uhr: 9.9, titel: 'Skills: Echt oder KI?', ziel: 'Aula. An der Wand hängen Fotos. Manche sind gar keine.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], mesenberg: [-12.2, -55.8, -2.8], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n8_skills' } },
  { id: 'k8_tidderich', kap: 8, tag: 'Dienstag', uhr: 8.05, titel: 'Mme Tidderich', ziel: 'Saal 1.04. Mme Tidderich ist heute sehr still.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], mesenberg: [-27, -21.6, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n8_tidderich' } },
  { id: 'k8_falle', kap: 8, tag: 'Mittwoch', uhr: 12.4, titel: 'Die Beweis-Mappe', ziel: 'CDI. Mila hat eine Mappe dabei. Ben hat Kekse.', marker: 'mila',
    start: { teleport: 'kantineTuer' },
    leute: { mila: [-6.2, -21.6, 0.4, 'sitzt'], ben: [-4.8, -22.4, -1.2] },
    fertig: { reden: 'mila', gespraech: 'n8_falle' } },
  { id: 'k8_freitag', kap: 8, tag: 'Freitag', uhr: 10.0, titel: 'Der Account wird still', ziel: 'Aula. Herr Kuedes will alle sehen. Dein Handy vibriert.', marker: 'kaya',
    start: { teleport: 'eingangHof', gespraech: 'n8_post' },
    leute: { kaya: [-14, -55.5, Math.PI], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n8_ende' } },
];

// ---------- Das KI-Video im Klassenchat (Teilen-Bremse, E28) ----------
const VIDEO = {
  titel: '7P2 😎 (offiziell)', mitglieder: 18, dauer: 34,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Ayla hat dich wieder zur Gruppe hinzugefügt.' },
    { nach: 1.6, wer: 'Chiara', bild: 'Mme Tidderich tanzt, Enten-Krawatte. KI-Stimme: „7P2 ist meine dümmste Klasse.“', text: 'habt ihr DAS gesehen 😳', lacher: { start: 6, proSek: 0.6, stopp: 'gebremst' } },
    { nach: 4, wer: 'Jo', text: 'wallah das ist so lustig 💀' },
    { nach: 6, wer: 'Ben', text: 'DAS IST KI. in 1.04 steht gar kein pult am fenster!!' },
    { nach: 8.5, wer: 'Yusuf', text: 'echt jetzt? sieht echt aus' },
    { nach: 11, system: true, text: 'Das Video wurde 312-mal geteilt.' },
    { nach: 13.5, wer: 'Lina', text: 'das ist gemein. auch wenn es fake ist.', wennNicht: 'stumm' },
    { nach: 17, wer: 'Jo', text: '… oh. okay. ich lösch mein ❤️' },
    { nach: 20, wer: 'Mila', text: 'Fakt: Das ist KI. Fakt: Sie ist echt. Teilen = mitmachen.' },
    { nach: 23, wer: 'Ayla', text: 'spionin-bericht: luca schrieb samstag „video kommt 🎬“' },
  ],
  aktionen: [
    { id: 'teilen', t: 'Teilen', symbol: '↗️', wahl: [
      { t: '(Trotzdem teilen. Ist doch lustig.)', setzt: 'geteilt', ich: '↗️ geteilt', folgen: [{ nach: 1, system: true, text: 'Geteilt. 313.' }] },
      { t: '(Bremsen. Nicht teilen.)', setzt: ['gebremst', 'bremse'], sys: 'Nicht geteilt. Die Zahl bleibt bei 312. Wegen dir.' },
    ] },
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Das ist KI. Und es ist gemein. Hört auf zu teilen.“', setzt: ['gebremst', 'klartext'], ich: 'das ist ki. und es ist gemein. hört auf zu teilen', folgen: [{ nach: 1.4, wer: 'Ayla', text: 'danke. genau' }, { nach: 2.6, wer: 'Yusuf', text: 'oh. ok. gelöscht' }] },
      { t: '„haha die ente 💀“', setzt: 'mitgelacht', ich: 'haha die ente 💀', folgen: [{ nach: 1.1, wer: 'Jo', text: 'die ENTE' }] },
    ] },
    { id: 'melden', t: 'Video melden', symbol: '🚩', setzt: ['gemeldet', 'gebremst'], sys: 'Gemeldet als „gefälschter Inhalt“.' },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm.', ende: true },
  ],
};

// ---------- Feed (E27) ----------
const FEED = {
  wo: 'Aula · Wer bestimmt deinen Feed?', runden: 10,
  arten: { drama: ['Drama', '#d6452f'], lustig: ['Lustiges', '#f2b134'], freunde: ['Freunde', '#3f78b8'], sport: ['Sport', '#3fa66b'], lernen: ['Wissen', '#8a7bc8'] },
  posts: [
    { art: 'drama', sy: '😱', t: 'Wer hat wen entfolgt? Die Liste!' }, { art: 'drama', sy: '🔥', t: 'Streit im Kommentar. 2000 Antworten.' }, { art: 'drama', sy: '😤', t: 'Sie hat WAS gesagt??' },
    { art: 'drama', sy: '🫢', t: 'Exposed: Das hat keiner gewusst.' }, { art: 'lustig', sy: '🐈', t: 'Katze fällt vom Sofa. Elegant.' }, { art: 'lustig', sy: '🦆', t: 'Ente jagt Fahrrad.' },
    { art: 'lustig', sy: '🤣', t: 'Opa versucht Trend-Tanz.' }, { art: 'freunde', sy: '🎸', t: 'Ayla: neuer Song, Treppenhaus-Version.' }, { art: 'freunde', sy: '🧱', t: 'Noah: Glockenturm, Teil 2.' },
    { art: 'sport', sy: '🏀', t: 'Trickwurf von der Mittellinie.' }, { art: 'sport', sy: '🛹', t: 'Kickflip in Zeitlupe.' }, { art: 'lernen', sy: '🧠', t: 'Warum Tauben nicken.' },
    { art: 'lernen', sy: '🌍', t: 'Luxemburg von oben. In 60 Sekunden.' }, { art: 'drama', sy: '💔', t: 'Paar trennt sich live.' }, { art: 'lustig', sy: '🐶', t: 'Hund isst Ladekabel. Keks?' },
  ],
};


// ---------- Freitag: Die Mappe liegt bei der Direktion. Der Account wird still. ----------
const BDAY = {
  titel: '@annexe.cam · Story', mitglieder: 0, dauer: 18,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Freitag, 9:48. @annexe.cam hat eine Story gepostet.' },
    { nach: 1.8, wer: '@annexe.cam', text: 'bin dann mal weg 👋 war eh nur spaß' },
    { nach: 4.5, system: true, text: 'Das Profil ist jetzt privat. 0 Beiträge sichtbar.' },
    { nach: 7, wer: 'Mila (privat)', text: 'Herr Kuedes war gestern mit der Mappe bei der Direktion. Heute früh: das.' },
    { nach: 10, wer: 'Ben (privat)', text: 'ich hab heute geburtstag und der account ist weg. bestes geschenk 🎂' },
    { nach: 13, wer: 'Mila (privat)', text: 'Weg heißt nicht gelöscht. Nicht posten. Nicht drohen. Aula.' },
  ],
  aktionen: [
    { id: 'laut', t: 'In den Klassenchat: LUCA IST ES', symbol: '📣', setzt: 'chatLuca', ich: 'LUCA IST ES. beweis kommt', folgen: [{ nach: 1.6, wer: 'Mila (privat)', text: 'Lösch das. Die Direktion ist dran. Sonst bist du jetzt der Pranger.' }] },
    { id: 'luca', t: 'Luca privat schreiben', symbol: '✉️', setzt: 'lucaPrivat', ich: 'ich weiß, dass du es bist', folgen: [{ nach: 1.6, wer: 'Luca (privat)', text: 'beweis es 😇' }] },
    { id: 'weg', t: 'Zu Herrn Kuedes', symbol: '🚪', setzt: 'zuKuedes', sys: 'Du steckst das Handy ein. Dein Herz klopft. Aber du weißt, wohin.', ende: true }],
};

// ---------- Mittwoch: Die Beweis-Mappe mit Mila (Spuren-Wand von Kapitel 3, jetzt mit Privatsphäre) ----------
const MAPPE = (m) => ({
  wo: 'CDI · Leseecke', helfer: F.mila,
  frage: 'Mila legt eine Mappe auf den Tisch. „Nur, was wir belegen können. Und nichts Privates von Leuten, die nichts damit zu tun haben.“',
  spuren: [
    { id: 'lowkey', sy: '💬', t: 'Der Account kommentiert selbst: „lowkey stimmt“. Mila hat einen Screenshot mit Uhrzeit.', kurz: '„lowkey“ vom Account', echt: true,
      kommentar: ['Fakt. Mit Uhrzeit. Allein kein Beweis – „lowkey“ sagen viele.', 'Doch, das kommt rein. Mit Uhrzeit ist es ein Fakt.'] },
    { id: 'uhr', sy: '🕐', t: 'Der Fake-Screenshot aus dem Herbst zeigt die Uhrzeit 25:14.', kurz: 'Fake: 25:14', echt: true,
      kommentar: ['Fakt. Die Uhrzeit gibt es nicht. Das Bild ist gebaut.', 'Doch. 25:14 gibt es nicht. Das zeigt: gefälscht.'] },
    { id: 'geraet', sy: '📱', t: 'In der Bild-Info vom Video steht: „Handy von L.“', kurz: '„Handy von L.“', echt: true,
      kommentar: ['Fakt. Ein Gerätename. Wer L. ist, klärt die Schule.', 'Doch, rein damit. Das ist eine echte Angabe im Bild.'] },
    { id: 'grinsen', sy: '😏', t: 'Luca grinst immer, wenn jemand über das Video redet.', kurz: 'Luca grinst', echt: false,
      kommentar: ['Grinsen ist ein Gefühl von uns. Kein Fakt.', 'Raus. Grinsen beweist nichts.'] },
    { id: 'gehoert', sy: '👂', t: 'Jo hat gehört, dass Luca zu Hause zwei Handys hat.', kurz: 'Jo hat gehört …', echt: false,
      kommentar: ['Gehört ist Gerücht. Raus.', 'Raus. Das ist Hörensagen.'] },
    { id: 'privat', sy: '🖼️', t: 'Ben hat ein Foto von Lucas kleinem Bruder. „Für die Mappe?“', kurz: 'Foto vom Bruder', echt: false,
      kommentar: ['Nein. Der Bruder hat damit nichts zu tun. Privates bleibt raus.', 'Richtig, raus. Unbeteiligte schützen wir. Auch hier.'] },
  ],
  frageEnde: 'Drei Blätter in der Mappe. Und jetzt?',
  schluesse: [
    { key: 'kuedes', t: 'Die Mappe geht zu Herrn Kuedes. Er und die Direktion entscheiden.', braucht: ['lowkey', 'uhr', 'geraet'], antwort: 'Genau. Wir sammeln. Erwachsene entscheiden. Nicht wir.' },
    { key: 'chat', t: 'Wir posten die Mappe in den Klassenchat. Dann wissen es alle.', braucht: [], antwort: 'Dann ist es ein Pranger. Auch wenn es stimmt. Nein.' },
    { key: 'luca', t: 'Wir zeigen sie Luca. Mal sehen, was er sagt.', braucht: [], antwort: 'Dann löscht er alles. Und wir haben nichts mehr.' },
    { key: 'offen', t: 'Noch nicht genug. Wir warten.', braucht: [], antwort: 'Für ein Urteil ist es nie genug – das machen wir auch nicht. Für einen Erwachsenen reicht es.' },
  ],
});

export const GESPRAECHE_N8 = {
  n8_chat: [
    ['erzaehler', 'Montag, 7:31. Du bist wieder in der Klassengruppe. Ayla hat dich zurückgeholt.'],
    { szene: 'chat', id: 'video', def: VIDEO,
      ausgang: (r) => (r.flags.geteilt ? 'geteilt' : r.flags.klartext ? 'klartext' : r.flags.bremse || r.flags.gemeldet ? 'gebremst' : r.flags.mitgelacht ? 'gelacht' : 'still'),
      folgen: {
        geteilt: { herz: { ayla: -1, lina: -1 }, merke: 'videoGeteilt' },
        klartext: { staerke: 'mut', herz: { ayla: 1, lina: 1, ben: 1 }, merke: 'videoKlartext' },
        gebremst: { staerke: 'lesen', herz: { mila: 1 }, merke: 'videoGebremst' },
        gelacht: { herz: { lina: -1 }, merke: 'videoGelacht' },
        still: {},
      } },
  ],
  n8_mila: [
    ['mila', 'Ich hab das Video Bild für Bild angeschaut. Es ist KI. Eindeutig.'],
    ['ben', 'Kein Pult am Fenster! Und die Ente blinzelt komisch.'],
    ['mila', 'Enten blinzeln anders. Aber ja.'],
    { tu: 'n8_milaStart' },
    // Jugendwelt heute: KI-Angst. Nicht wegreden – etwas tun, das man selbst in der Hand hat.
    ['noah', '(sehr leise) Wenn die das mit der Ente können …'],
    ['noah', '… können die das auch mit meinem Gesicht?'],
    ['noah', 'Ich hab Fotos online. Vom Glockenturm. Mit mir drauf.'],
    { wahl: [
      { t: '„Schauen wir nach der Stunde deine Einstellungen an? Zusammen.“', staerke: 'einbeziehen', herz: { noah: 2 }, merke: 'noahProfil', dann: [
        ['erzaehler', 'Informatikraum. Noah tippt. Du liest vor.'],
        ['erzaehler', 'Konto auf privat. ✔ Wer darf mich markieren? Niemand. ✔'],
        ['erzaehler', 'Alte Fotos mit Gesicht: archiviert. Der Glockenturm bleibt. Ohne Noah.'],
        ['noah', 'Fühlt sich an wie Fenster zumachen. Bei Sturm.']] },
      { t: '„Können sie. Aber dann ist es deren Schuld. Nicht deine.“', staerke: 'klar', herz: { noah: 1 }, merke: 'noahSchuld', dann: [
        ['noah', '… Und dann?'], ['mila', 'Screenshot, melden, Herr Kuedes. Und BEE SECURE: 8002 1234.']] },
      { t: '„Mach dir keinen Kopf. Passiert eh nicht.“', merke: 'noahBeruhigt', dann: [['erzaehler', 'Noah nickt. Er glaubt es nicht.']] },
    ] },
  ],
  n8_skills: [
    ['kaya', 'Wéi geet et? Heute: Was ist echt?'],
    ['kaya', 'Und wer entscheidet, was ihr seht?'],
    // „Quellen-Detektiv“ (statt Fehlersuche im Bild): Man sieht einem Bild oft nicht an, ob es echt ist – aber man kann
    // immer prüfen, woher es kommt, und bremsen. Am Ende: teilen, nicht teilen oder nachfragen.
    ['mesenberg', 'Echt oder KI? Ehrlich: Oft sieht man es nicht.'],
    ['mesenberg', 'Aber man kann prüfen, woher etwas kommt.'],
    ['mesenberg', 'Drei Posts. Ihr seid die Detektive.'],
    ['erzaehler', 'Post 1: „Schule morgen zu! Wasserrohrbruch!“ Konto: @annexe_news2. Seit gestern.'],
    { wahl: [
      { t: '(Woanders nachschauen: Schul-Website, Mme Weber.)', staerke: 'lesen', merke: 'quelleGeprueft', dann: [
        ['erzaehler', 'Schul-Website: nichts. Mme Weber am Telefon: „Wasserrohr? Hier ist alles trocken.“'],
        { wahl: [
          { t: '(Nicht teilen.)', staerke: 'lesen', dann: [['mesenberg', 'Genau. Ein Konto von gestern ist keine Quelle.']] },
          { t: '(Trotzdem teilen. Sicher ist sicher.)', dann: [['mesenberg', 'Dann bleiben morgen fünf Leute zu Hause. Wegen nichts.']] },
        ] }] },
      { t: '(Sofort teilen. Alle sollen es wissen!)', dann: [['mesenberg', 'Schnell geteilt, schnell falsch. Am nächsten Tag war ganz normal Schule.']] },
    ] },
    ['erzaehler', 'Post 2: Gerd die Taube. Mit einer goldenen Krone. Sehr glänzend.'],
    { wahl: [
      { t: '(Teilen – mit dem Satz „bearbeitet, nur Spaß“.)', staerke: 'humor', dann: [['ben', 'Ehrlich UND lustig. Geht also doch.'], ['mesenberg', 'Wer sagt, dass es bearbeitet ist, lügt niemanden an.']] },
      { t: '(Teilen, als wäre es echt.)', dann: [['lina', 'Meine kleine Schwester glaubt jetzt, Gerd ist ein König.'], ['mesenberg', 'Harmlos. Diesmal. Bei Menschen ist es das nicht.']] },
      { t: '(Nicht teilen. Einfach lachen.)', dann: [['mesenberg', 'Auch gut. Nicht alles muss weiter.']] },
    ] },
    ['erzaehler', 'Post 3: Ein Video, 8 Sekunden. „Lehrerin schreit Schüler an!!“ Ohne Anfang. Ohne Ende.'],
    { wahl: [
      { t: '(Nachfragen: Wer hat das gefilmt? Was war davor?)', staerke: 'lesen', merke: 'quelleNachgefragt', dann: [
        ['erzaehler', 'Antwort vom Konto: „egal was davor war 😂“.'],
        ['mesenberg', 'Wenn jemand den Anfang nicht zeigen will, gibt es einen Grund.'] ] },
      { t: '(Nicht teilen. Es ist eine echte Person.)', staerke: 'klar', dann: [['mesenberg', 'Genau. Acht Sekunden sind kein Mensch. Und kein Urteil.']] },
      { t: '(Teilen. Ist doch krass.)', dann: [['mila', 'Krass ist, dass sie das nie wieder löschen kann.'], ['mesenberg', 'Bremsen heißt: erst fragen, wem es schadet.']] },
    ] },
    ['mesenberg', 'Drei Fragen vor dem Teilen: Wer? Woher? Wem schadet es?'],
    ['mesenberg', 'Fake über euch? BEE SECURE Helpline: 8002 1234. Gratis.'],
    ['kaya', 'Und jetzt euer Feed. Wer bestimmt eigentlich, was ihr seht?'],
    ['ben', 'Ich. Ich drück einfach auf Katzen.'],
    { szene: 'feed', id: 'feed', def: FEED, ausgang: (r) => (r.top === 'drama' ? 'drama' : 'anders'),
      folgen: {
        drama: { merke: 'feedDrama', dann: [['kaya', 'Drama hält uns am längsten fest.'], ['kaya', 'Darum zeigt der Feed so viel davon.'], ['jo', 'Digga, mein Feed ist ein einziger Streit.']] },
        anders: { merke: 'feedAnders', dann: [['kaya', 'Gut gesteuert. Der Feed folgt dir.'], ['kaya', 'Aber er schubst auch. Merkt euch das.']] },
      } },
    ['kaya', 'Mission: ein Wenn-dann-Satz. „Wenn ich Drama sehe, dann wische ich weiter.“'],
  ],
  n8_tidderich: [
    ['hoffmann', 'Ça va? Das Video ist gefälscht. Die Schule kümmert sich.'],
    ['hoffmann', 'Wer es geteilt hat: löschen. Mehr müsst ihr nicht tun.'],
    ['erzaehler', 'Ihre Stimme ist normal. Ihre Augen nicht ganz. Jo guckt auf seinen Tisch.'],
    { wahl: [
      { t: '„Es tut mir leid. Ich hab’s nicht geteilt. Aber gesehen.“', wenn: (m) => !m.videoGeteilt, staerke: 'zuhoeren', herz: { hoffmann: 2 }, dann: [['hoffmann', '(nickt) Sehen ist nicht schlimm. Weiterschicken schon.']] },
      { t: '„Ich hab’s geteilt. Sorry. Ist gelöscht.“', wenn: (m) => !!m.videoGeteilt, staerke: 'mut', herz: { hoffmann: 2 }, dann: [['hoffmann', '(nickt) Gut. Danke, dass du’s sagst.']] },
      { t: '„Wir wissen, dass es KI ist. Alle hier.“', staerke: 'klar', herz: { hoffmann: 1 }, dann: [['hoffmann', 'Die hier vielleicht. Die 300 da draußen nicht.']] },
      { t: '(Nichts sagen. Zuhören.)', staerke: 'warten', herz: { hoffmann: 1 }, dann: [['hoffmann', '(nickt dir zu) Danke, dass ihr zuhört.']] },
    ] },
    { tu: 'n8_joSorry' },
    ['hoffmann', 'Herr Mesenberg ist heute dabei. Er macht eine Stunde zu KI.'],
    { szene: 'skillsStunde', id: 's8_ki', def: S8_KI, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'klar', merke: 's8Ki' }, weiter: { merke: 's8Ki' } } },
  ],
  n8_falle: [
    ['mila', 'Gestern Abend. Unter dem Video. Der Account hat selbst kommentiert.'],
    ['mila', '„lowkey stimmt“. Nach 40 Sekunden gelöscht. Ich hab einen Screenshot.'],
    ['ben', 'Lowkey. Wer sagt lowkey? … Okay, ich sag lowkey. Aber ich war’s nicht.'],
    ['mila', 'Eben. Ein Wort ist kein Beweis. Mehrere Fakten zusammen: vielleicht.'],
    { wahl: [
      { t: '„Wir stellen Luca eine Falle.“', merke: 'falleLuege', dann: [['mila', 'Nein. Wir fangen keine Fakes mit Fakes.'], ['mila', 'Und niemand von uns spielt Köder. Auch Ben nicht.']] },
      { t: '„Wir sammeln, was wir sicher wissen. Und geben es ab.“', staerke: 'lesen', herz: { mila: 1 }, merke: 'falleEhrlich', dann: [['mila', 'Genau das. Eine Mappe. Für Herrn Kuedes.']] },
      { t: '„Das ist Sache von Herrn Kuedes.“', staerke: 'hilfe', merke: 'falleKuedes', dann: [['mila', 'Ja. Aber er braucht Fakten, keine Gerüchte. Wir sortieren nur. Er entscheidet.']] },
    ] },
    { szene: 'spuren', id: 'mappe', def: (m) => MAPPE(m), ausgang: (r) => r.schluss,
      folgen: {
        kuedes: { staerke: 'hilfe', herz: { mila: 2 }, merke: ['mappeKuedes', 'falleKuedes'], dann: [['erzaehler', 'Nach der Stunde. Ihr klopft an die Bürotür. Herr Kuedes nimmt die Mappe.'], ['kaya', 'Danke. Ab hier ist das meine Aufgabe. Und eure Pause ist eure.']] },
        chat: { herz: { mila: -1 }, merke: 'mappeChat', dann: [['mila', 'Ich bring sie trotzdem zu Herrn Kuedes. Kommst du mit?'], ['erzaehler', 'Du gehst mit. Die Mappe ist schwerer, als sie aussieht.']] },
        luca: { herz: { mila: -1 }, merke: 'mappeLuca', dann: [['mila', 'Nein. Herr Kuedes. Heute.'], ['erzaehler', 'Ihr bringt die Mappe ins Büro.']] },
        offen: { merke: 'mappeOffen', dann: [['mila', 'Ich bring sie trotzdem hin. Er entscheidet, nicht wir.'], ['erzaehler', 'Ihr geht zusammen. Du klopfst.']] },
      } },
    ['ben', 'Übrigens. Freitag hab ich Geburtstag. Die Kekse sind schon Teil davon.'],
    { wahl: [
      { t: '„Freitag bring ich was mit.“', herz: { ben: 2 }, merke: 'benGefragt', dann: [['ben', 'Echt jetzt? … Okay. Ich tu so, als wär ich nicht gerührt.']] },
      { t: '„Wie alt wirst du? Hundert?“', herz: { ben: 1 }, dann: [['ben', 'Innerlich: ja. Äußerlich: dreizehn. Und schuldenfrei. Fast.']] },
    ] },
  ],
  n8_post: [
    ['erzaehler', 'Freitag. 9:48. Auf dem Weg in die Aula. Dein Handy vibriert.'],
    { szene: 'chat', id: 'bday', def: BDAY, ausgang: (r) => (r.flags.chatLuca ? 'laut' : r.flags.lucaPrivat ? 'privat' : 'zu'),
      folgen: { zu: { merke: 'falleZu' }, privat: { merke: ['falleZu', 'lucaPrivat'] }, laut: { merke: ['falleZu', 'chatLuca'], dann: [['mila', '(an der Tür) Lösch es. Jetzt. Die Mappe ist bei Erwachsenen.']] } } },
  ],
  n8_ende: [
    ['kaya', '(leise zu dir, Ben und Mila) Ich hab’s gesehen.'],
    ['kaya', 'Danke, dass ihr gekommen seid.'],
    { tu: 'n8_kuedesFolge' },
    ['kaya', 'Ab jetzt ist das meine Aufgabe. Mit der Direktion.'],
    ['kaya', 'Ihr macht jetzt Pause. Wirklich.'],
    { tu: 'n8_schluss' },
  ],
};

export const tunN8 = (c) => ({
  n8_kuedesFolge: () => [...(c.S.merke.lucaPrivat ? [['kaya', 'Schreib ihm nicht mehr. Ab jetzt machen wir das.']] : []),
    ...(c.S.merke.mappeKuedes || c.S.merke.falleKuedes ? [['kaya', 'Eure Mappe von Mittwoch. Sauber. Keine Gerüchte, nichts Privates. Das hat geholfen.']] : [])],
  n8_milaStart: () => (c.S.merke.videoGeteilt ? [['mila', '(guckt dich an) Du hast es geteilt. Ich hab’s gesehen.'], ['mila', 'Du kannst es noch löschen. Jetzt.']] : []),
  n8_joSorry: () => (c.S.merke.joIchBotschaft || c.S.merke.joGehoert ? [['jo', '(steht auf) Mme Tidderich … ich hab’s geliked. Sorry. Echt.'], ['hoffmann', 'Okay, Jo. Angekommen.']] : []),
  n8_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 7 · Digitale Welt', titel: 'Erst bremsen',
      gelernt: ['Echt oder KI? Erst die Quelle prüfen', 'Die Teilen-Bremse: Wer? Echt? Wem schadet es?', 'Der Feed folgt dir – und schubst dich', 'KI: geht klar oder gar nicht', 'Fakes fängt man nicht mit Fakes – Fakten gehören zu Erwachsenen'],
      mission: 'Ein Wenn-dann-Satz für dein Handy. Und einmal bremsen, bevor du teilst.' }, folgen: {} },
    ['erzaehler', 'Sonntag, 23:14 Uhr. Eine Nachricht von Dario.'],
    ['dario', '(Nachricht) bist du wach? ich kann nicht schlafen. seit wochen nicht.'],
    ['dario', '(Nachricht) kann ich dir was erzählen? morgen? bitte'],
    { wahl: [
      { t: '„Morgen früh. Haltestelle. Ich bin da.“', herz: { dario: 1 }, dann: [['dario', '(Nachricht) ok. danke 🙏']] },
      { t: '„Morgen früh, Haltestelle. Wenn’s jetzt gefährlich ist: 112.“', staerke: 'hilfe', herz: { dario: 1 }, dann: [['dario', '(Nachricht) nicht gefährlich. nur laut im kopf. bis morgen']] },
    ] },
    { tu: 'kapitelEnde' },
  ],
});
