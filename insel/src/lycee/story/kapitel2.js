// Drei Jahre Annexe – 7ème, Kapitel 2 „Wer bin ich?“ (Kurs Jahr 1, Modul 1: E04 Glas der Bedürfnisse, E05 Zwischen laut
// und leise, E06 Baum der Stärke). Faden @annexe.cam: „Top 5 langweiligste Leute“ – Noah auf Platz 1, Mila auf Platz 2.
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
const AULA = { noah: [-16.2, -54, 1.1], mila: [-11.8, -54.2, -1.1], ben: [-12.6, -52.4, -2.2], jo: [-15.6, -52.2, 2.2], ayla: [-17.2, -56.4, 1.6], lina: [-10.9, -56.6, -1.5], chiara: [-14.4, -51.6, 3.1], yusuf: [-13.0, -57.4, -0.4] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, chiara: { id: 'chiara', name: 'Chiara', farbe: '#3fa66b' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' } };

export const SCHRITTE_N2 = [
  { id: 'k2_post', kap: 2, tag: 'Montag', uhr: 7.6, titel: 'Top 5', ziel: 'Noah sitzt allein auf der Bank am Hof.', marker: 'noah',
    start: { teleport: 'eingangHof', gespraech: 'n2_post' },
    leute: { noah: [-20, 11.6, Math.PI, 'sitzt'], mila: [-14, 11.6, Math.PI, 'sitzt'], ben: [4, 14, 0.6, 'redet'], jo: [5.2, 15.4, -2.4, 'redet'], dario: [-32.6, 10.2, -2], kenan: [-34, 9, 1] },
    fertig: { reden: 'noah', gespraech: 'n2_noah' } },
  { id: 'k2_tanks', kap: 2, tag: 'Montag', uhr: 9.9, titel: 'Skills: Das Glas der Bedürfnisse', ziel: 'Skills-Stunde in der Aula. Herr Kuedes hat sechs Tanks gemalt.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n2_tanks' } },
  { id: 'k2_mittag', kap: 2, tag: 'Montag', uhr: 12.3, titel: 'Projekt #3', ziel: 'Kantine. Ben winkt mit beiden Armen.', marker: 'ben',
    start: { teleport: 'kantineTuer', gespraech: 'n2_mittagChat' },
    leute: { ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], ayla: [10.75, -10.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], mila: [10.75, -11.1, Math.PI / 2, 'sitzt'], dario: [21.4, -13.2, 0.9], kenan: [21.0, -12.0, 1.2] },
    fertig: { reden: 'ben', gespraech: 'n2_mittag' } },
  { id: 'k2_ruhm', kap: 2, tag: 'Donnerstag', uhr: 8.1, titel: 'Talenttag', ziel: 'Saal 1.04. Mme Tidderich hat eine „neue Methode“.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer', gespraech: 'n2_morgen' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n2_ruhm' } },
  { id: 'k2_linie', kap: 2, tag: 'Donnerstag', uhr: 10.0, titel: 'Skills: Laut und leise', ziel: 'Zurück in die Aula. Auf dem Boden kleben Linien.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], mesenberg: [-12.2, -55.8, -2.8], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n2_linie' } },
  { id: 'k2_dario', kap: 2, tag: 'Donnerstag', uhr: 12.4, titel: 'Mittag', ziel: 'Dario winkt dich an der Skate-Ecke rüber.', marker: 'dario',
    start: { teleport: 'eingangHof' },
    leute: { dario: [-33.4, 12, 1.2], kenan: [-35, 10.4, 0.6, 'redet'], luca: [-36.4, 11.6, 1.9, 'redet'], mila: [-20, 11.6, Math.PI, 'sitzt'], noah: [-14, 11.6, Math.PI, 'sitzt'] },
    fertig: { reden: 'dario', gespraech: 'n2_dario' } },
];

// ---------- @annexe.cam: Top 5 langweiligste Leute ----------
const TOP5 = {
  titel: '7P2 😎 (offiziell)', mitglieder: 19, dauer: 34,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Jo hat einen Beitrag von @annexe.cam geteilt.' },
    { nach: 1.4, wer: '@annexe.cam', bild: 'Noah allein am Tisch, Mila zählt Tauben', text: 'TOP 5 LANGWEILIGSTE LEUTE 7P2 😴  #1 noah  #2 mila  #3 …', lacher: { start: 4, proSek: 0.4, stopp: 'gestoppt' } },
    { nach: 3.6, wer: 'Jo', text: 'digga 💀💀' },
    { nach: 5.2, wer: 'Ben', text: 'wer ist #3?? ich hoffe ich. dann bin ich wenigstens auf einer liste' },
    { nach: 7.4, wer: 'Luca', text: 'lowkey stimmt aber' },
    { nach: 9.6, wer: 'Mila', text: 'Die Liste hat keine Kriterien. Sie ist wertlos.' },
    { nach: 11.5, wer: 'Jo', text: 'mila hat sich selbst verteidigt 😭 platz 1 jetzt', wennNicht: 'gestoppt' },
    { nach: 13.2, system: true, text: 'Noah ist online.' },
    { nach: 15.4, system: true, text: 'Noah tippt …', wennNicht: 'gestoppt' },
    { nach: 18.2, system: true, text: 'Noah hat die Gruppe verlassen.', wennNicht: 'gestoppt' },
    { nach: 18.2, wer: 'Noah', text: '… danke', wenn: 'gestoppt' },
    { nach: 21, wer: 'Ayla', text: 'wer auch immer das macht. das ist nicht lustig', wennNicht: 'stumm' },
    { nach: 24, wer: 'Dario', text: 'chillt mal. ist nur ne liste' },
    { nach: 27, wer: 'Chiara', text: 'Ich war nicht auf der Liste. Ich weiß nicht, ob ich mich freuen soll.' },
  ],
  aktionen: [
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Noah ist der Einzige, der mir Platz freihält. Langweilig?“', setzt: ['gestoppt', 'noahVerteidigt'], ich: 'noah hält mir jeden tag nen platz frei. langweilig? ok', folgen: [{ nach: 1.3, wer: 'Ben', text: 'okay das ist real. ehrenmann noah' }, { nach: 2.6, wer: 'Ayla', text: '❤️' }] },
      { t: '„Wer so eine Liste macht, hat selbst Langeweile.“', setzt: ['gestoppt', 'konter'], ich: 'wer so ne liste macht hat selbst langeweile', folgen: [{ nach: 1.2, wer: 'Jo', text: 'OHHH wallah' }, { nach: 2.6, wer: 'Dario', text: 'chill bro' }] },
      { t: '„Ich will auch auf eine Liste. Top 5 mit Hunger.“', setzt: 'witz', ich: 'ich will auch auf ne liste. top 5 mit hunger', folgen: [{ nach: 1.1, wer: 'Ben', text: 'ICH BIN #1 DA' }] },
    ] },
    { id: 'privat', t: 'Noah privat schreiben', symbol: '🔒', setzt: ['noahPrivat'], ich: '(privat an Noah) hey. die liste ist müll. pause zusammen?', folgen: [{ nach: 2.2, wer: 'Noah (privat)', text: 'Ich sitz auf der Bank. Falls du willst.' }] },
    { id: 'lachen', t: 'Mitlachen', symbol: '😂', setzt: 'mitgelacht', ich: '😂', folgen: [{ nach: 1, wer: 'Luca', text: 'siehste. alle lachen' }] },
    { id: 'melden', t: 'Beitrag melden', symbol: '🚩', setzt: 'gemeldet2', sys: 'Gemeldet. Zum zweiten Mal diese Woche.' },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm. Die Liste ist trotzdem da.', ende: true },
  ],
};

// ---------- Warnlicht-Raten: Welcher Tank ist leer? (Kurs E04) ----------
const TANK_FAELLE = {
  wo: 'Aula · Skills-Stunde',
  faelle: [
    { wer: F.ben, tank: 'koerper', szene: 'Ben ist heute komisch. Keine Witze. Keine Wetten.', zeichen: ['legt den Kopf auf den Tisch', 'Magen knurrt laut', 'kein Frühstück'],
      falsch: 'Ben: „Nee, Bruder. Ich hab einfach Hunger. Seit sechs Uhr.“',
      tankstellen: [{ t: 'Ihm dein Pausenbrot halb geben.', passt: true, antwort: 'Du … du teilst? Sein Vater. Ehrlich.' }, { t: 'Ihn in die Gruppe holen.', antwort: 'Gruppe ist gut. Aber zuerst: Essen. Bitte.' }, { t: 'Ihm einen Witz erzählen.', antwort: 'Haha. Ich lach später. Wenn ich gegessen hab.' }] },
    { wer: F.jo, tank: 'ernst', szene: 'Jo redet in Mathe dauernd rein. Wird lauter, als Mme Lenning ihn ignoriert.', zeichen: ['meldet sich fünfmal', 'sagt „hört mir eh keiner zu“', 'knallt das Heft zu'],
      falsch: 'Jo: „Ich bin nicht müde, digga. Mir hört nur keiner zu.“',
      tankstellen: [{ t: '„Was wolltest du vorhin sagen?“', passt: true, antwort: '(überrascht) … Dass die Aufgabe falsch ist. Ist sie auch.' }, { t: '„Psst, Jo. Chill.“', antwort: 'Siehste. Genau das.' }, { t: 'Ihn ignorieren wie alle.', antwort: '(redet noch lauter)' }] },
    { wer: F.mila, tank: 'sicherheit', szene: 'Mila steht vor Saal 1.04. Sie geht nicht rein. Der Raum ist heute ein anderer.', zeichen: ['dreht den Würfel sehr schnell', 'guckt immer auf den Plan', 'atmet flach'],
      falsch: 'Mila: „Nein. Ich weiß nur nicht, wo ich heute sitze.“',
      tankstellen: [{ t: '„Ich zeig dir unseren Platz. Gleich wie immer, nur anderer Raum.“', passt: true, antwort: 'Gleicher Platz. Okay. Das geht.' }, { t: '„Ist doch egal, wo man sitzt.“', antwort: 'Für dich.' }, { t: '„Komm, wir setzen uns ganz vorn. Neu ist gut.“', antwort: 'Neu ist das Problem. Nicht die Lösung.' }] },
    { wer: F.noah, tank: 'dazu', szene: 'Noah sitzt seit der Liste in jeder Pause allein. Er sagt, er liest. Das Buch ist zu.', zeichen: ['Buch ist zu', 'guckt zu den anderen', 'sagt „alles gut“ – zu schnell'],
      falsch: 'Noah: „Ich lese. Seite eins. Seit Montag.“',
      tankstellen: [{ t: 'Fragen, ob er mit zum Korb kommt.', passt: true, antwort: 'Ich kann nicht werfen. Aber ich komm mit. Ja.' }, { t: '„Lies ruhig weiter.“', antwort: 'Okay. (liest nicht weiter)' }, { t: 'Ihm ein Video schicken.', antwort: 'Danke. (Er guckt es allein.)' }] },
  ],
};

// ---------- Die Linie: Selbstbild und Fremdbild (Kurs E05) – das Fremdbild kommt aus deinen bisherigen Entscheidungen ----------
const PAARE = [['leise', 'laut'], ['allein', 'Gruppe'], ['vorsichtig', 'mutig'], ['ernst', 'witzig'], ['spontan', 'plant alles']];
const fremdbild = (S) => {
  const st = S.staerken || {}, n = (k) => st[k] || 0, klemm = (v) => Math.max(0, Math.min(4, Math.round(v)));
  const basis = [2 + (n('humor') + n('mut') + n('klar')) * 0.5 - (n('ruhig') + n('warten') + n('abstand')) * 0.6,
    2 + (n('kontakt') + n('einbeziehen')) * 0.6 - (n('abstand') + n('warten')) * 0.4,
    2 + (n('mut') + n('klar') + n('fuehren')) * 0.6 - (n('ruhig') + n('abstand')) * 0.4,
    2 + n('humor') * 0.8 - (n('lesen') + n('zuhoeren')) * 0.3,
    2 + (n('warten') + n('lesen') + n('vertrauen')) * 0.5 - n('humor') * 0.3];
  const freunde = Object.entries(S.freund || {}).filter(([id]) => F[id]).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => F[id]);
  while (freunde.length < 3) freunde.push([F.ben, F.mila, F.noah].find((f) => !freunde.includes(f)));
  const schief = { ben: [1, 1, 0, 1, -1], mila: [0, -1, 0, -1, 1], noah: [-1, 0, 1, 0, 0], jo: [1, 1, 1, 1, -1], lina: [-1, -1, 0, 0, 1], ayla: [0, 0, 1, 0, -1], chiara: [0, 0, 0, -1, 1], yusuf: [-1, 0, 0, 0, 0] };
  return { paare: PAARE, fremd: freunde.map((f) => ({ wer: f, werte: basis.map((v, i) => klemm(v + (schief[f.id] || [])[i] * 0.6)) })) };
};

// ---------- Stärken verschenken (Kurs E06): die konkrete Karte kennt, was im Spiel passiert ist ----------
const staerkenDef = (m) => ({
  an: [
    { wer: F.noah, karten: [
      { t: m.noahGerettet || m.noahVerteidigt ? 'Du hältst Leuten Plätze frei. Jeden Tag. Das macht sonst keiner.' : 'Du sagst zweimal Hallo. Du meinst es ernst. Das merkt man.', konkret: true, antwort: '(liest es dreimal) … Darf ich die behalten? Für immer?' },
      { t: 'Du bist nett.', antwort: 'Danke. Glaub ich.' },
      { t: 'Du bist nicht langweilig.', antwort: 'Also … ein bisschen schon. Oder?' } ] },
    { wer: F.mila, karten: [
      { t: m.spurDario || m.milaAura ? 'Du merkst Sachen, die keiner merkt. Den Winkel. Die Regeln.' : 'Du kannst den Würfel in 41 Sekunden. Und du sagst ehrlich, was du denkst.', konkret: true, antwort: 'Das ist präzise formuliert. Danke.' },
      { t: 'Du bist schlau.', antwort: 'Das sagen alle. Das ist keine Beobachtung.' },
      { t: 'Du bist voll anders.', antwort: 'Anders als wer?' } ] },
    m.blindLina ? { wer: F.lina, karten: [
      { t: 'Beim Blind-Parcours bist du einfach losgegangen. Mit mir. Das war mutig.', konkret: true, antwort: '(ganz leise) … Okay. Die kleb ich ins Heft.' },
      { t: 'Du zeichnest gut.', antwort: '(nickt) Danke.' },
      { t: 'Du bist so ruhig.', antwort: '…' } ] }
      : { wer: F.ben, karten: [
        { t: 'Du machst, dass die Pause lustig ist. Auch wenn du Hunger hast.', konkret: true, antwort: 'Bruder. Ich wein nicht. Das ist Aura, die rausläuft.' },
        { t: 'Du bist witzig.', antwort: 'Ich weiß. Aber danke.' },
        { t: 'Du schuldest mir Geld.', antwort: 'Das ist keine Stärke! … Okay, Ehrlichkeit ist eine.' } ] },
  ],
  bekommen: [
    { wer: F.noah, t: m.noahVerteidigt ? 'Du hast im Chat was gesagt. Für mich. Hab’s gesehen.' : 'Du redest mit mir, auch wenn andere gucken.' },
    { wer: F.ben, t: m.auraWitz ? 'Du hast im Chat 9000 gesagt. Mutig.' : 'Du lachst über meine Witze. Auch über die schlechten.' },
    { wer: F.mila, t: m.milaStill ? 'Du kannst still sitzen, ohne dass es komisch wird.' : 'Du stellst Fragen. Echte.' },
  ],
});

// ---------- Bedürfnis oder Wunsch? (Kurs E04) – Bens Liste ----------
const BRAUCHEN = {
  wo: 'Aula · Sortier-Sprint', titel: 'Bedürfnis oder Wunsch?', zeit: 6,
  info: 'Herr Kuedes liest Bens Liste vor. Brauchst du das – oder willst du das?',
  faecher: [{ id: 'beduerfnis', t: 'Brauche ich', sy: '🫙', f: '#3f78b8' }, { id: 'wunsch', t: 'Will ich', sy: '✨', f: '#e85d75' }],
  karten: [
    { t: 'Schlafen', ziel: 'beduerfnis' },
    { t: '40 Nuggets', ziel: 'wunsch', wer: F.ben, sagt: 'Einspruch! Das ist Körper-Tank!' },
    { t: 'Freunde', ziel: 'beduerfnis' },
    { t: 'Ein Handy mit drei Kameras', ziel: 'wunsch', wer: F.ben, sagt: 'Für Selfies aus drei Winkeln. Das ist Kunst.' },
    { t: 'Dass mir jemand zuhört', ziel: 'beduerfnis', wer: F.noah, sagt: '(leise) Das wär schon gut.' },
    { t: 'Die neuen Sneaker, die alle haben', ziel: null, wer: F.jo, sagt: 'Wenn ALLE die haben … fühlt sich wie brauchen an.' },
    { t: 'WLAN', ziel: null, wer: F.ben, sagt: 'WLAN ist ein Menschenrecht. Hab ich gegoogelt. Mit WLAN.' },
    { t: 'Sich sicher fühlen', ziel: 'beduerfnis' },
    { t: 'Ein Hund, der Skateboard fährt', ziel: 'wunsch', wer: F.ben, sagt: 'Ich BRAUCHE den. Schreibt das auf.' },
    { t: 'Gewinnen', ziel: null, wer: F.jo, sagt: 'Bedürfnis. Fragt meinen Puls.' },
    { t: 'Etwas selbst entscheiden', ziel: 'beduerfnis', wer: F.mila, sagt: 'Tank fünf. Logisch.' },
    { t: 'Berühmt werden', ziel: null, wer: F.ayla, sagt: 'Nicht berühmt. Gehört werden. Das ist was anderes.' },
  ],
  ende: 'Strittig ist gut. Hinter vielen Wünschen steckt ein Bedürfnis.',
};

// ---------- Projekt #3: Gruppenchat mit Ben, Ayla, Jo, Mila ----------
const PROJEKT3 = (m) => {
  const raus = !(m.noahVerteidigt || m.campKonter);
  return {
    titel: 'Projekt #3 🔍', mitglieder: 5, dauer: 36,
    nachrichten: [
      { nach: 0.4, system: true, text: 'Ben hat dich zur Gruppe „Projekt #3 🔍“ hinzugefügt.' },
      { nach: 1.4, wer: 'Ben', text: 'okay team. @annexe.cam sagt: #3 kommt heute abend' },
      { nach: 3.2, wer: 'Ben', text: 'wir finden raus wer #3 ist BEVOR es kommt. wie detektive. mit nuggets' },
      { nach: 5.4, wer: 'Ayla', text: 'oder wir finden raus wer den account macht. das wär sinnvoller' },
      { nach: 7.2, wer: 'Ben', text: 'auch gut. projekt 2' },
      { nach: 9.4, wer: 'Jo', text: 'ich wette #3 ist chiara. die redet nie', setzt: 'joRaet' },
      { nach: 12.6, wer: 'Ayla', text: 'jo. genau SO entstehen solche listen', wennNicht: 'joGestoppt' },
      { nach: 14.6, wer: 'Jo', text: 'war nur spaß digga 😭', wennNicht: 'joGestoppt' },
      raus ? { nach: 17, wer: 'Ben', text: 'btw noah ist aus dem klassenchat raus. sollen wir ihn wieder adden?' }
        : { nach: 17, wer: 'Ben', text: 'btw noah hat mir ein foto von seinem lego-turm geschickt. MIT GLOCKE' },
      { nach: 20.5, wer: 'Mila', text: 'Fakt: Das Noah-Foto ist von links unten. Sitzhöhe. Jemand am Nachbartisch.' },
      { nach: 23.5, wer: 'Mila', text: 'Ich mache eine Tabelle. Niemand verdächtigt jemanden ohne Beweis. Auch Jo nicht.' },
      { nach: 26, wer: 'Jo', text: 'warum „auch jo nicht“ 💀' },
      { nach: 29, wer: 'Ben', text: 'ok tabelle. ich mach die nuggets' },
    ],
    aktionen: [
      { id: 'jo', t: 'Jo stoppen', symbol: '✋', setzt: 'joGestoppt', ich: 'jo raten wir nicht. so fängt das an', folgen: [{ nach: 1.4, wer: 'Jo', text: 'ok ok. sorry. chiara ist eigentlich lustig' }, { nach: 2.8, wer: 'Ayla', text: '👏' }] },
      ...(raus ? [
        { id: 'fragen', t: 'Noah privat fragen', symbol: '🔒', setzt: 'noahGefragt', ich: '(privat an Noah) willst du wieder in den klassenchat? nur wenn du willst', folgen: [{ nach: 2.6, wer: 'Noah (privat)', text: 'Wenn ihr da seid … ja. Danke, dass du fragst.' }, { nach: 4.2, system: true, text: 'Ben hat Noah zum Klassenchat hinzugefügt.' }] },
        { id: 'adden', t: 'Einfach adden', symbol: '➕', setzt: 'noahGeaddet', sys: 'Du hast Noah zum Klassenchat hinzugefügt.', folgen: [{ nach: 2, wer: 'Noah (privat)', text: '?? wer hat mich geaddet. ok … danke? glaub ich' }] },
      ] : []),
      { id: 'witz', t: 'Schreiben', symbol: '💬', wahl: [
        { t: '„Tabelle ja. Namen raten nein.“', setzt: 'regel', ich: 'tabelle ja. namen raten nein', folgen: [{ nach: 1.2, wer: 'Mila', text: 'Genau meine Regel. Ich übernehme sie.' }] },
        { t: '„Ich bring Snacks zur Ermittlung.“', setzt: 'snacks', ich: 'ich bring snacks zur ermittlung', folgen: [{ nach: 1.1, wer: 'Ben', text: 'DU BIST BEFÖRDERT' }] },
      ] },
      { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm. Die Gruppe läuft weiter.', ende: true },
    ],
  };
};

// ---------- Platzwechsel „Alle, die …“ (Kurs E05 Aufwärmen) ----------
const PLATZ = {
  wo: 'Aula · Aufwärmen mit Herrn Mesenberg', zeit: 5,
  leute: { noah: F.noah, mila: F.mila, ben: F.ben, jo: F.jo, ayla: F.ayla, lina: F.lina, chiara: F.chiara, yusuf: F.yusuf },
  saetze: [
    { t: 'heute schon mal gelacht haben.', stehen: ['ben', 'ayla', 'yusuf', 'chiara'] },
    { t: 'lieber allein lernen.', stehen: ['mila', 'noah', 'lina'], sagt: ['mila', 'Allein ist effizient. Nicht traurig.'] },
    { t: 'schon mal etwas gebaut haben, auf das sie stolz sind.', stehen: ['noah', 'yusuf', 'chiara'], sagt: ['noah', '(steht. Setzt sich fast wieder. Bleibt stehen.)'] },
    { t: 'vor Prüfungen schlecht schlafen.', stehen: ['mila', 'jo', 'lina', 'noah'], sagt: ['jo', 'Was? Ich steh nur so. Für die Beine.'] },
    { t: 'Musik machen, wenn keiner zuhört.', stehen: ['ayla', 'lina'] },
    { t: 'manchmal lauter sind, als sie wollen.', stehen: ['jo', 'ben', 'ayla'], sagt: ['ben', 'Das bin ich. Das ist mein ganzer Charakter.'] },
  ],
  eigene: [
    { t: 'Tauben besser finden als Menschen.', stehen: ['mila', 'lina'], sagt: ['lina', 'Gerd zählt als Mensch. Ehrenhalber.'] },
    { t: 'heimlich gerne zeichnen.', stehen: ['lina', 'chiara', 'noah'], sagt: ['chiara', 'Heimlich? Ich zeichne in Mathe. Offen.'] },
    { t: 'schon mal etwas Wichtiges vergessen haben.', stehen: ['ben', 'jo', 'yusuf', 'ayla', 'noah'], sagt: ['ben', 'Ich hab vergessen, warum ich stehe.'] },
  ],
};

export const GESPRAECHE_N2 = {
  n2_post: [
    ['erzaehler', 'Montag, 7:36. Das Handy vibriert, bevor du aus dem Bus bist.'],
    { szene: 'chat', id: 'top5', def: TOP5,
      ausgang: (r) => (r.flags.noahVerteidigt ? 'verteidigt' : r.flags.konter ? 'konter' : r.flags.noahPrivat ? 'privat' : r.flags.mitgelacht ? 'gelacht' : r.flags.witz ? 'witz' : 'still'),
      folgen: {
        verteidigt: { staerke: 'mut', herz: { noah: 3, ayla: 1, ben: 1, dario: -1 }, merke: 'noahVerteidigt' },
        konter: { staerke: 'mut', herz: { jo: 1, noah: 1, dario: -2 }, merke: ['campKonter', 'campFeind'] },
        privat: { staerke: 'zuhoeren', herz: { noah: 2 }, merke: 'noahPrivat' },
        gelacht: { herz: { noah: -3, mila: -2, luca: 1 }, merke: 'top5Gelacht' },
        witz: { staerke: 'humor', herz: { ben: 1 } },
        still: { merke: 'top5Still' },
      } },
    ['erzaehler', 'Auf dem Hof. Noah sitzt allein auf der Bank. Das Buch ist zu.'],
  ],
  n2_noah: [
    ['noah', 'Hey. Ich lese. Also … das Buch ist zu. Aber ich lese.'],
    { tu: 'n2_noahChat' },
    { wahl: [
      { t: '„Die Liste ist Müll. Wer macht so was?“', staerke: 'klar', herz: { noah: 1 }, dann: [
        ['noah', 'Jemand, der mich kennt. Das ist das Schlimme.'],
        ['noah', 'Ich dachte, ich bin hier neu. Jetzt bin ich langweilig neu.'] ] },
      { t: '(Hinsetzen. Nichts sagen. Neben ihm.)', staerke: 'warten', herz: { noah: 2 }, dann: [
        ['erzaehler', 'Eine Minute. Zwei. Eine Taube landet vor euch.'],
        ['noah', 'Mila würde die jetzt zählen.'], ['erzaehler', 'Noah schiebt dir sein halbes Brötchen rüber.'] ] },
      { t: '„Was machst du eigentlich gern?“', staerke: 'zuhoeren', herz: { noah: 2 }, merke: 'noahHobby', dann: [
        ['noah', 'Ich bau Sachen aus Lego. Riesig. Sag’s keinem.'],
        ['noah', 'Ich hab den Glockenturm nachgebaut. Mit Glocke.'], ['noah', 'Das klingt langweilig, oder?'],
        { wahl: [
          { t: '„Nein. Das klingt nach Talenttag.“', herz: { noah: 2 }, merke: 'noahTalent', dann: [['noah', 'Talenttag? … Oh nein. Oh doch. Vielleicht.']] },
          { t: '„Ein bisschen. Aber cool langweilig.“', staerke: 'humor', herz: { noah: 1 }, dann: [['noah', 'Cool langweilig. Das schreib ich mir auf.']] },
        ] } ] },
      { t: '„Komm, wir gehen zu den anderen.“', staerke: 'einbeziehen', herz: { noah: 1, ben: 1 }, dann: [
        ['noah', 'Zu Ben? Er hat Platz drei geraten. Für sich selbst.'], ['ben', '(von weitem) NOAH! Du bist auf einer Liste! Ich nicht! Neid!'] ] },
    ] },
  ],
  n2_tanks: [
    ['kaya', 'Wéi geet et? Heute: Tanks. Jeder Mensch hat sechs.'],
    ['kaya', 'Körper. Sicherheit. Dazugehören. Ernst genommen werden. Selbst entscheiden. Spaß und Neues.'],
    ['ben', 'Mein Körper-Tank ist leer. Ich sag’s gleich.'],
    ['kaya', 'Gut erkannt, Ben. Und genau darum geht’s. Spiel: Warnlicht-Raten.'],
    { szene: 'tanks', id: 'tanks', def: TANK_FAELLE,
      ausgang: (r) => (r.geholfen.length >= 3 ? 'top' : r.richtig.length >= 2 ? 'gut' : 'schwer'),
      folgen: {
        top: { staerke: 'lesen', herz: { ben: 1, jo: 1, mila: 1, noah: 1 }, merke: 'tankProfi', dann: [['kaya', 'Ihr hättet in zehn Minuten vier Tanks gefüllt. Ohne Geld.']] },
        gut: { staerke: 'lesen', dann: [['kaya', 'Warnlichter sind schwer zu lesen. Ihr wart nah dran.']] },
        schwer: { dann: [['kaya', 'Von außen sieht man nicht alles. Darum fragen wir.']] },
      } },
    ['ben', 'Darf ich meine Wunschliste vorlesen? Ich hab sie seit der 3. Klasse.'],
    ['kaya', 'Gut. Wir machen ein Spiel daraus. Brauchen oder wollen?'],
    { szene: 'sort', id: 'brauchen', def: BRAUCHEN,
      ausgang: (r) => (r.strittig >= 3 ? 'diskutiert' : r.offen >= 4 ? 'langsam' : 'klar'),
      folgen: {
        diskutiert: { staerke: 'lesen', herz: { ayla: 1, mila: 1 }, dann: [['kaya', 'Bei den Sneakern steckt oft ein Tank dahinter: Dazugehören.'], ['jo', '… Okay. Das ist unangenehm wahr.']] },
        langsam: { dann: [['ben', 'Zu schnell? Ich auch. Ich hab bei „Schlafen“ eingeschlafen.']] },
        klar: { dann: [['kaya', 'Klar sortiert. Und trotzdem: Wünsche sind erlaubt. Auch der Hund.'], ['ben', 'DANKE.']] },
      } },
    ['kaya', 'Jetzt still. Jeder schätzt seine eigenen Tanks. Privat. Ich sammel nichts ein.'],
    { szene: 'meinetanks', id: 'meinetanks', def: {}, ausgang: (r) => r.blinkt, folgen: {
      koerper: { merke: 'blinktKoerper' }, sicherheit: { merke: 'blinktSicherheit' }, dazu: { merke: 'blinktDazu' }, ernst: { merke: 'blinktErnst' }, selbst: { merke: 'blinktSelbst' }, spass: { merke: 'blinktSpass' } } },
    { tu: 'n2_tankMission' },
    ['mila', '(flüstert) Welcher Tank ist es, wenn man auf einer Liste steht?'],
    { wahl: [
      { t: '„Dazugehören. Und Ernst genommen werden.“', staerke: 'lesen', herz: { mila: 2 }, dann: [['mila', 'Zwei Tanks gleichzeitig. Das erklärt einiges.']] },
      { t: '„Keiner. Die Liste ist es nicht wert.“', herz: { mila: 1 }, dann: [['mila', 'Logisch richtig. Fühlt sich trotzdem falsch an.']] },
    ] },
  ],
  n2_mittagChat: [
    ['erzaehler', 'Montag, Mittag. Curry. Dein Handy brummt dreimal hintereinander.'],
    { szene: 'chat', id: 'projekt3', def: (m) => PROJEKT3(m),
      ausgang: (r) => (r.flags.noahGefragt ? 'gefragt' : r.flags.noahGeaddet ? 'geaddet' : r.flags.joGestoppt || r.flags.regel ? 'regel' : r.flags.stumm ? 'stumm' : 'dabei'),
      folgen: {
        gefragt: { staerke: 'einbeziehen', herz: { noah: 3, ben: 1 }, merke: ['noahZurueck', 'noahGefragt'] },
        geaddet: { herz: { noah: 1 }, merke: 'noahZurueck', dann: [['erzaehler', 'Noah ist wieder drin. Er schreibt nichts. Aber er ist drin.']] },
        regel: { staerke: 'klar', herz: { mila: 2, ayla: 1, jo: -1 }, merke: 'regelKeinRaten' },
        stumm: { merke: 'projektStumm' },
        dabei: { herz: { ben: 1 } },
      } },
  ],
  n2_mittag: [
    ['ben', 'Detektiv! Setz dich. Wir haben einen Plan. Also: Mila hat einen Plan.'],
    ['mila', 'Kein Plan. Eine Beobachtung. Wer sitzt beim Essen links von Noah?'],
    ['erzaehler', 'Am Nachbartisch: Dario und Kenan. Dario hält sein Handy sehr tief.'],
    { wahl: [
      { t: '(Hinschauen. Nichts sagen. Merken.)', staerke: 'lesen', merke: 'darioTief', dann: [['mila', 'Du hast es auch gesehen. Gut. Kein Wort. Noch nicht.']] },
      { t: '„Leute, wir starren. Das ist auch komisch.“', staerke: 'klar', herz: { ayla: 1 }, dann: [['ayla', 'Stimmt. Wir sind gerade selbst @annexe.cam. Nur ohne Handy.'], ['ben', '(guckt sofort auf sein Curry)']] },
      { t: '„Dario, was fotografierst du?“ (laut)', staerke: 'mut', herz: { dario: -2, mila: -1 }, merke: 'darioLaut', dann: [
        ['dario', '(steckt das Handy weg) Mein Essen, bro. Für meine Oma.'], ['mila', '(zischt) Jetzt weiß er, dass wir gucken.'] ] },
    ] },
    ['jo', 'Ich sag ja nur: Ich war’s nicht. Falls wer fragt.'],
    ['ben', 'Keiner hat gefragt, Jo.'],
    ['jo', 'Eben. Darum sag ich’s.'],
  ],
  n2_morgen: [
    ['erzaehler', 'Donnerstag. An der Tafel steht: „TALENTTAG – 10 Sekunden Ruhm!“'],
    ['jo', 'Was ist das wieder für eine Methode.'],
  ],
  n2_ruhm: [
    ['hoffmann', 'Neue Methode! Zehn Sekunden Ruhm. Jeder zeigt was. Klein reicht.'],
    ['hoffmann', 'Kein Applaus-Zwang. Aber Applaus ist erlaubt.'],
    ['ben', 'Ich kann 40 Nuggets essen. Hab ich heute nicht dabei.'],
    { tu: 'n2_noahTalent' },
    ['hoffmann', '{name}? Was zeigst du?'],
    { wahl: [
      { t: 'Freiwürfe. (Rüber zum Korb im Hof.)', merke: 'ruhmKorb', dann: [{ tu: 'n2_ruhmKorb' }] },
      { t: 'Ein Beat mit Ayla. (Bandprobe, kurz.)', herz: { ayla: 1 }, merke: 'ruhmBand', dann: [{ tu: 'n2_ruhmBand' }] },
      { t: '„Ich kann gut zuhören.“ (Nichts vorführen.)', staerke: 'klar', merke: 'ruhmZuhoeren', dann: [
        ['hoffmann', 'Wie zeigt man das?'], ['du', 'Jo, erzähl was. Zehn Sekunden.'],
        ['jo', '… Mein Nachbar hat ein Auto ohne Rückwärtsgang. Er parkt nur vorwärts.'],
        ['du', 'Also fährt er immer im Kreis um den Block?'], ['jo', 'DIGGA. JA. Du hast zugehört.'] ] },
      { t: '„Ich zeig nichts.“', merke: 'ruhmNein', dann: [
        ['hoffmann', 'Darf man. Steht im Vertrag.'], ['ben', 'Mysteriös. Respekt.'] ] },
    ] },
    ['hoffmann', 'Das war … wie sagt ihr … ein Slay.'],
    ['erzaehler', 'Die ganze Klasse stöhnt. Diesmal lacht sogar Mila.'],
  ],
  n2_linie: [
    ['kaya', 'Das ist Herr Mesenberg. Er ist auch vom SePAS.'],
    ['mesenberg', 'Moien. Ich klebe heute Linien auf den Boden. Mein Lieblingsjob.'],
    ['mesenberg', 'Erst aufwärmen. Ihr kennt das: Alle, die … stehen auf.'],
    { szene: 'platz', id: 'platz', def: PLATZ,
      ausgang: (r) => (r.aufgestanden >= 3 ? 'offen' : 'vorsichtig'),
      folgen: {
        offen: { staerke: 'mut', herz: { noah: 1, ben: 1 }, merke: 'platzOffen' },
        vorsichtig: { dann: [['mesenberg', 'Sitzen bleiben ist auch eine Antwort. Keiner muss.']] },
      } },
    { tu: 'n2_platzTop' },
    ['kaya', 'Stellt euch auf jede Linie. Laut oder leise. Es gibt kein Besser.'],
    { szene: 'linie', id: 'linie', def: (m, S) => fremdbild(S),
      ausgang: (r) => (r.abweichung.length >= 3 ? 'ueberrascht' : r.abweichung.length ? 'etwas' : 'gleich'),
      folgen: {
        ueberrascht: { staerke: 'lesen', dann: [['mesenberg', 'Überrascht? Das geht fast allen so.'], ['ben', 'Ich dachte, ich bin leise. Alle sagen: nein. Hart.']] },
        etwas: { dann: [['kaya', 'Ein, zwei Punkte anders. Je nach Ort ist man anders.']] },
        gleich: { dann: [['mila', 'Statistisch auffällig. Du kennst dich gut.']] },
      } },
    ['kaya', 'Letzte Übung heute. Baum der Stärke. Jeder verschenkt Karten.'],
    { szene: 'staerken', id: 'staerken', def: (m) => staerkenDef(m),
      ausgang: (r) => (r.konkret.length >= 2 ? 'konkret' : 'allgemein'),
      folgen: {
        konkret: { staerke: 'einbeziehen', herz: { noah: 2, mila: 2, lina: 1, ben: 1 }, merke: 'staerkenKonkret', dann: [['kaya', 'Das war genau. „Gesehen“ ist mehr wert als „nett“.']] },
        allgemein: { herz: { noah: 1, mila: 1 }, dann: [['mesenberg', 'Nächstes Mal: Was hast du genau gesehen? Das wirkt doppelt.']] },
      } },
    ['kaya', 'Und jetzt der schwerste Teil. Eine Karte für dich. Von Noah.'],
    { tu: 'n2_karteFuerDich' },
    { wahl: [
      { t: '„Danke.“ (Nur das.)', staerke: 'ruhig', herz: { noah: 2 }, merke: 'komplimentAngenommen', dann: [['kaya', 'Nur „Danke“. Das ist schwerer, als es aussieht.'], ['noah', '(grinst) Gern.']] },
      { t: '„Stimmt gar nicht.“', merke: 'komplimentKlein', dann: [['ben', 'Einspruch. Kleinreden gilt nicht. Steht im Vertrag.'], ['noah', 'Ich hab’s aber gesehen. Also stimmt es.']] },
      { t: '„Danke. Du bist auch …“ (Schnell zurückgeben.)', herz: { noah: 1 }, dann: [['mesenberg', 'Nett. Aber erst mal ankommen lassen. Das war deins.']] },
    ] },
  ],
  n2_dario: [
    ['dario', 'Yo. Skills-Stunde überlebt? Real talk, das ist so cringe.'],
    ['dario', 'Guck mal, was ich hab. Lustig, oder?'],
    ['erzaehler', 'Er zeigt dir sein Handy. Ein Foto. Noah am Tisch. Von links unten.'],
    ['erzaehler', 'Genau das Foto von der Liste. Nur ohne Text.'],
    ['dario', '(zieht das Handy schnell weg) … Hat mir wer geschickt. Egal.'],
    { wahl: [
      { t: '„Wer hat dir das geschickt?“', staerke: 'mut', herz: { dario: -1 }, merke: 'darioGefragt', dann: [
        ['dario', 'Weiß nicht mehr, bro. Ist doch egal.'], ['erzaehler', 'Kenan guckt zu Dario. Lange. Dario guckt aufs Handy.'] ] },
      { t: '„Lustig? Noah sitzt seitdem allein.“', staerke: 'klar', herz: { dario: -1, noah: 1 }, merke: 'darioKonfrontiert', dann: [
        ['dario', '(leiser) … Hab ich nicht gewusst.'], ['dario', 'Ich hab das nicht gepostet. Okay? Real.'] ] },
      { t: '(Nichts sagen. Merken. Später Mila erzählen.)', staerke: 'lesen', merke: ['spurFoto', 'milaErzaehlen'], dann: [
        ['erzaehler', 'Du nickst. Dario grinst. Sein Daumen zittert ein bisschen.'] ] },
      { t: '„Haha. Schick mal.“', herz: { dario: 2, luca: 1, noah: -2 }, merke: 'fotoGeschickt', dann: [
        ['dario', 'Safe. Kommt.'], ['erzaehler', 'Jetzt ist es auf deinem Handy. Von links unten.'] ] },
    ] },
    { tu: 'n2_ende' },
  ],
};

// TUN für Kapitel 2 (in spiel.js eingehängt: tunN2)
export const tunN2 = (c) => ({
  n2_noahChat: () => (c.S.merke.noahVerteidigt ? [['noah', 'Du hast im Chat was geschrieben. Für mich. Ich hab’s zwölfmal gelesen.']]
    : c.S.merke.top5Gelacht ? [['noah', 'Du hast gelacht. Hab ich gesehen. Ist okay.'], ['erzaehler', 'Noah rückt ein Stück zur Seite. Nicht viel.']]
    : c.S.merke.noahPrivat ? [['noah', 'Danke für die Nachricht. Ich hab sie gelesen. Zweimal.']] : []),
  n2_platzTop: () => {
    const top = (((c.S.sz || {}).platz) || {}).top; const N = { noah: 'Noah', mila: 'Mila', ben: 'Ben', jo: 'Jo', ayla: 'Ayla', lina: 'Lina', chiara: 'Chiara', yusuf: 'Yusuf' };
    if (!top) return [];
    if (top === 'jo') return [['jo', 'Ich und du? Am meisten gemeinsam? … Sag’s keinem.']];
    if (top === 'mila') return [['mila', 'Wir haben die meisten Übereinstimmungen. Statistisch sind wir jetzt ein Team.']];
    if (top === 'noah') return [['noah', 'Wir sind zusammen aufgestanden. Oft. Das ist … schön.']];
    return [['erzaehler', N[top] + ' guckt zu dir rüber und nickt. Das hättest du nicht gedacht.']];
  },
  n2_karteFuerDich: () => {
    const m = c.S.merke;
    const t = m.noahVerteidigt ? 'Du hast im Chat was für mich geschrieben. Vor allen. Das war mutig.' : m.noahGefragt ? 'Du hast gefragt, bevor du mich geaddet hast. Das macht fast keiner.'
      : m.noahHobby ? 'Du hast gefragt, was ich gern mache. Und zugehört.' : 'Du hast dich auf die Bank gesetzt. Neben mich. Einfach so.';
    return [['erzaehler', 'Noah gibt dir eine Karte. Darauf steht:'], ['noah', '„' + t + '“']];
  },
  n2_tankMission: () => {
    const T = { koerper: 'Körper: was essen, Korbball, raus', sicherheit: 'Sicherheit: Bank im Hof, Bibliothek, Spind', dazu: 'Dazugehören: Pause mit jemandem, Bandprobe', ernst: 'Ernst genommen: mit Herrn Kuedes reden', selbst: 'Selbst entscheiden: Spind, Spiegel, eigene Pause', spass: 'Spaß und Neues: Skaten, Tischtennis, Bücher' };
    const b = Object.keys(T).find((k) => c.S.merke['blinkt' + k.charAt(0).toUpperCase() + k.slice(1)]) || 'spass';
    c.S.mission = { kap: 2, tank: b, mal: 0 };
    c.ui.toast('<b>Mission: Tank auffüllen</b><span>' + T[b] + ' – dreimal, je zehn Minuten.</span>', 'ly-t-ent');
  },
  n2_noahTalent: () => (c.S.merke.noahTalent ? [['noah', '(steht auf) Ich … hab Fotos. Von meinem Lego-Glockenturm.'], ['ben', 'Mit GLOCKE? Bruder. Das ist Aura.'], ['erzaehler', 'Die Klasse guckt. Wirklich. Noah wird rot. Diesmal gut rot.']]
    : [['noah', '(zeigt nichts. Guckt auf den Tisch.)']]),
  n2_ruhmKorb: async () => {
    const t = await c.ui.freiwurf(); c.S.merke.ruhmTreffer = t;
    return t >= 3 ? [['ben', t + ' von 5! Vor allen! Aura plus 1000.'], ['jo', 'Okay. Respekt.']] : [['ben', t + ' von 5. Aber mit Stil. Das zählt auch.'], ['hoffmann', 'Zehn Sekunden Ruhm. Erfüllt.']];
  },
  n2_ruhmBand: async () => {
    const r = await c.ui.bandprobe(); const pz = Math.round(r.treffer / Math.max(1, r.gesamt) * 100);
    return pz >= 60 ? [['ayla', 'Digga. Du bist in der Band. Nicht diskutieren.']] : [['ayla', 'Das war kein Takt. Das war Mut. Zählt auch.']];
  },
  n2_ende: () => [{ szene: 'stempel', def: { modul: 'Modul 1 · Wer bin ich?', titel: 'Ich weiß mehr',
      gelernt: ['Sechs Tanks und was sie füllt', 'Warnlichter bei anderen gelesen', 'Selbstbild und Fremdbild verglichen', 'Stärken verschenkt – mit dem, was du gesehen hast'],
      mission: 'Füll deinen blinkenden Tank dreimal diese Woche. Und sag jemandem eine Stärke, die du wirklich gesehen hast.' }, folgen: {} },
    ['erzaehler', 'Abends. @annexe.cam postet eine Story: „Sportfest Freitag 🏃 ich bin dabei 📷“'], { tu: 'kapitelEnde' }],
});
