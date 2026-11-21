// SOLO-Hefte im Modul-Design (Auftrag 21.11., nach dem Muster SOLO #02 „Grenzen“): liest dossiers/solo/sNN.ts und schreibt
// tools/hefte/inhalt/solo-NN.mjs. Inhalt bleibt, wie er ist (von Jugendlichen gegengelesen); nur die Form ändert sich.
// Von Hand ergänzt: der Fall als Bildstreifen (BD), ein kurzes „Mein Ziel“ und fünf Wörter Deutsch–Französisch je Heft.
// Keine Hördateien (in der Bezugszeit liest eine erwachsene Person vor), keine Lösungshefte, keine Schwierigkeitspunkte.
// Aufruf (aus isa-app/): npx tsx --tsconfig tsconfig.scripts.json tools/hefte/solo-umbau.mts [00 01 03 …]
// SOLO #02 ist das von Hand gesetzte Muster (inhalt/solo-02.mjs) und wird hier nicht überschrieben.
import { writeFileSync } from 'node:fs'

function lesbar(hex: string): string {
  const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  const lum = (c: number[]) => c.map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)).reduce((s, x, i) => s + x * [0.2126, 0.7152, 0.0722][i], 0)
  const [r, g, b] = rgb(hex), max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min
  let l = (max + min) / 2
  const sat = Math.min(0.85, d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1)))
  const hue = d === 0 ? 0 : max === r ? (((g - b) / d) % 6 + 6) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  const aus = (l: number) => {
    const c = (1 - Math.abs(2 * l - 1)) * sat, x = c * (1 - Math.abs((hue % 2) - 1)), m = l - c / 2
    const [a, bb, cc] = hue < 1 ? [c, x, 0] : hue < 2 ? [x, c, 0] : hue < 3 ? [0, c, x] : hue < 4 ? [0, x, c] : hue < 5 ? [x, 0, c] : [c, 0, x]
    return [a + m, bb + m, cc + m].map((v) => Math.max(0, Math.min(1, v)))
  }
  while (1.05 / (lum(aus(l)) + 0.05) < 4.2 && l > 0.1) l -= 0.01
  return '#' + aus(l).map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase()
}
const mische = (hex: string, ziel: number, anteil: number) => '#' + [0, 2, 4].map((i) => Math.round(parseInt(hex.slice(1 + i, 3 + i), 16) * (1 - anteil) + ziel * anteil).toString(16).padStart(2, '0')).join('')

// ---------------------------------------------------------------- von Hand: Ziel, Wörter, Bildstreifen
const ZIEL: Record<string, [string, string]> = {
  s00: ['Ich lerne die Bezugszeit kennen und sage, was ich will – und was nicht.', 'Je découvre le temps de référence et je dis ce que je veux – et ce que je ne veux pas.'],
  s01: ['Ich schaue, wo ich gerade stehe, und wähle mein erstes Thema.', 'Je regarde où j’en suis et je choisis mon premier thème.'],
  s03: ['Ich verstehe, was Scrollen mit meiner Stimmung macht, und teste eine kleine Änderung.', 'Je comprends ce que le scroll fait à mon humeur et je teste un petit changement.'],
  s04: ['Ich erkenne, was mir das Spiel gibt – und wo ich das sonst noch finden kann.', 'Je vois ce que le jeu m’apporte – et où je peux le trouver ailleurs.'],
  s05: ['Ich erkenne, was hinter meiner Wut steckt, und finde einen Moment zum Bremsen.', 'Je découvre ce qui se cache derrière ma colère et je trouve un moment pour freiner.'],
  s06: ['Ich verstehe, warum Gedanken nachts größer werden, und probiere etwas gegen das Grübeln.', 'Je comprends pourquoi les pensées grandissent la nuit et j’essaie quelque chose contre les ruminations.'],
  s07: ['Ich höre meiner inneren Stimme zu – und antworte ihr wie jemandem, den ich mag.', 'J’écoute ma voix intérieure – et je lui réponds comme à quelqu’un que j’aime bien.'],
  s08: ['Ich unterscheide allein sein und einsam sein und mache einen kleinen Schritt auf andere zu.', 'Je fais la différence entre être seul·e et me sentir seul·e, et je fais un petit pas vers les autres.'],
  s09: ['Ich schaue ehrlich hin, was mir der Rausch gibt und was er mich kostet.', 'Je regarde honnêtement ce que l’ivresse m’apporte et ce qu’elle me coûte.'],
  s10: ['Ich finde heraus, was hinter „Null Bock“ steckt, und schaffe einen ersten kleinen Schritt.', 'Je découvre ce qui se cache derrière « j’ai pas envie » et je fais un premier petit pas.'],
  s11: ['Ich verstehe, wie Angst wächst, wenn man ausweicht, und übe einen kleinen Schritt hin.', 'Je comprends comment la peur grandit quand on l’évite et je m’entraîne à faire un petit pas vers elle.'],
  s12: ['Ich erkenne den Unterschied zwischen Liebe und Kontrolle.', 'Je reconnais la différence entre l’amour et le contrôle.'],
  s13: ['Ich finde Worte für das, was mit Zuhause zu tun hat – so viel ich will.', 'Je trouve des mots pour ce qui touche à la maison – autant que je veux.'],
  s14: ['Ich nehme meinen Plan für später ernst und sage ihn jemandem.', 'Je prends mon projet d’avenir au sérieux et j’en parle à quelqu’un.'],
  s15: ['Ich erkenne Anzeichen, wenn es sich leer anfühlt, und weiß, wo ich Hilfe bekomme.', 'Je reconnais les signes quand je me sens vide et je sais où trouver de l’aide.'],
  s16: ['Ich übernehme Verantwortung, ohne mich selbst aufzugeben.', 'Je prends mes responsabilités sans me laisser tomber.'],
  s17: ['Ich schaue kritisch auf Körperbilder – und freundlicher auf meinen Körper.', 'Je regarde les images du corps avec un œil critique – et mon corps avec plus de bienveillance.'],
}

const WOERTER: Record<string, [string, string][]> = {
  s03: [['scrollen', 'faire défiler'], ['gestellt', 'mis en scène'], ['vergleichen', 'comparer'], ['die Stimmung', 'l’humeur'], ['der Feed', 'le fil d’actualité']],
  s04: [['zocken', 'jouer aux jeux vidéo'], ['der Rang', 'le rang'], ['sich verlassen auf', 'compter sur'], ['fehlen', 'être absent·e'], ['die Anerkennung', 'la reconnaissance']],
  s05: [['die Wut', 'la colère'], ['schmeißen', 'balancer'], ['enttäuscht', 'déçu·e'], ['die Nachricht', 'le message'], ['bremsen', 'freiner']],
  s06: [['grübeln', 'ruminer'], ['einschlafen', 's’endormir'], ['übertrieben', 'exagéré'], ['die Wahrheit', 'la vérité'], ['der Abschluss', 'le diplôme']],
  s07: [['die Stimme', 'la voix'], ['das Mitleid', 'la pitié'], ['streng', 'sévère'], ['der Fehler', 'l’erreur'], ['freundlich', 'gentil·le']],
  s08: [['einsam', 'qui se sent seul·e'], ['der Kontakt', 'le contact'], ['merken', 'remarquer'], ['sich trauen', 'oser'], ['die Gruppe', 'le groupe']],
  s09: [['der Rausch', 'l’ivresse'], ['im Griff haben', 'maîtriser'], ['aufhören', 'arrêter'], ['anschreien', 'crier sur'], ['die Gewohnheit', 'l’habitude']],
  s10: [['das Referat', 'l’exposé'], ['aufschieben', 'remettre à plus tard'], ['egal', 'pas important'], ['sich vornehmen', 'se promettre de'], ['das Interesse', 'l’intérêt']],
  s11: [['die Angst', 'la peur'], ['ausweichen', 'éviter'], ['das Herz rast', 'le cœur s’emballe'], ['kribbeln', 'picoter'], ['die Haltestelle', 'l’arrêt de bus']],
  s12: [['kontrollieren', 'contrôler'], ['der Standort', 'la localisation'], ['das Passwort', 'le mot de passe'], ['vertrauen', 'faire confiance'], ['beleidigt', 'vexé·e']],
  s13: [['der Besuchstag', 'le jour de visite'], ['versprechen', 'promettre'], ['streiten', 'se disputer'], ['enttäuscht', 'déçu·e'], ['zu Hause', 'à la maison']],
  s14: [['der Berufsberater', 'le conseiller d’orientation'], ['der Plan', 'le projet'], ['die Wohnung', 'l’appartement'], ['auslachen', 'se moquer de'], ['in fünf Jahren', 'dans cinq ans']],
  s15: [['leer', 'vide'], ['müde', 'fatigué·e'], ['die Schublade', 'le tiroir'], ['das Gefühl', 'le sentiment'], ['merken', 'remarquer']],
  s16: [['Mist bauen', 'faire une bêtise'], ['die Anzeige', 'la plainte'], ['der Termin', 'le rendez-vous'], ['die Verantwortung', 'la responsabilité'], ['wiedergutmachen', 'réparer']],
  s17: [['der Körper', 'le corps'], ['der Spiegel', 'le miroir'], ['die Bauchmuskeln', 'les abdos'], ['normal', 'normal'], ['vergleichen', 'comparer']],
}

type Fall = { erz?: string; bild: string | string[]; blasen?: [string, string][]; nach?: string }
// Der Fall als Bildstreifen in drei Feldern – der Wortlaut der Geschichte bleibt, Gesagtes und Gedachtes steht in Blasen.
const BD: Record<string, Fall[]> = {
  s03: [
    { erz: 'Mia will um elf nur kurz schauen.', bild: 'mia:neutral:handy' },
    { erz: 'Um zwanzig nach eins hat sie 300 Leute gesehen, die schöner wohnen, besser aussehen und mehr Freunde haben. Sie kennt keinen davon.', bild: 'mia:traurig:handy' },
    { erz: 'Sie weiß, dass das gestellt ist – ihre eigenen Fotos macht sie ja genauso. Es hilft nichts.', bild: 'mia:traurig', nach: 'Sie fühlt sich trotzdem wie der einzige Mensch, bei dem nichts los ist.' },
  ],
  s04: [
    { erz: 'Im Clan ist Noah der, auf den man sich verlässt. 3.000 Stunden, hoher Rang, sein Call entscheidet die Runde.', bild: 'noah:stolz:zocken' },
    { erz: 'In der Schule ist er der, der fehlt. Am Dienstag sagt die Lehrerin:', bild: ['lehrerin:neutral', 'noah:gelangweilt'], blasen: [['Lehrerin', 'Du könntest so viel, wenn du wolltest.'], ['Noah denkt', 'Ich will ja. Nur nicht hier.']] },
    { erz: 'Um vier loggt er sich ein. Drei Leute schreiben:', bild: 'noah:froh:zocken', blasen: [['Chat', 'Endlich.']] },
  ],
  s05: [
    { erz: 'Der Erzieher fragt in ganz normalem Ton:', bild: ['lehrer:neutral', 'finn:wuetend'], blasen: [['Erzieher', 'Kommst du? Wir essen.']] },
    { erz: 'Finn schmeißt den Teller an die Wand. Zehn Minuten später sitzt er auf dem Bett und versteht es selbst nicht.', bild: 'finn:verwirrt' },
    { erz: 'Den ganzen Tag hatte er die Nachricht seiner Mutter im Kopf:', bild: 'finn:traurig:handy', blasen: [['Nachricht', 'Dieses Wochenende klappt es nicht.']], nach: 'Darüber hat er mit keinem geredet. Über den Teller reden jetzt alle.' },
  ],
  s06: [
    { erz: 'Nele liegt seit halb zwölf im Bett. Um eins rechnet sie: noch fünfeinhalb Stunden. Um zwei: noch viereinhalb.', bild: 'nele:muede' },
    { erz: 'Um halb drei ist sie sicher:', bild: 'nele:besorgt', blasen: [['Nele denkt', 'Den Abschluss schaffe ich nie. Meine beste Freundin mag mich eigentlich nicht. Mit mir stimmt etwas grundsätzlich nicht.']] },
    { erz: 'Um zehn Uhr morgens kommt ihr das alles übertrieben vor.', bild: 'nele:ruhig', nach: 'Um halb drei war es die Wahrheit.' },
  ],
  s07: [
    { erz: 'Mia bekommt die Arbeit zurück: 14 von 20.', bild: ['lehrerin:froh', 'mia:neutral'], blasen: [['Lehrerin', 'Gut gemacht.']] },
    { erz: 'Die Stimme in Mias Kopf sagt:', bild: 'mia:traurig', blasen: [['Stimme', 'Sechs Fehler. Bei so einer leichten Arbeit. Die anderen hatten sicher mehr. Die sagt das nur aus Mitleid.']] },
    { erz: 'Mia lächelt und packt das Blatt weg.', bild: 'mia:verlegen', nach: 'Niemand im Raum würde so mit ihr reden. Nur sie selbst.' },
  ],
  s08: [
    { erz: 'Amira hat 212 Kontakte und niemanden, den sie um zwei Uhr nachts anrufen würde.', bild: 'amira:traurig:handy' },
    { erz: 'In der Pause steht sie bei einer Gruppe, lacht an den richtigen Stellen und weiß: Keiner würde merken, wenn sie morgen fehlt.', bild: ['lina:froh', 'amira:froh'] },
    { erz: 'Sara fragt:', bild: ['jana:froh', 'amira:nervoes'], blasen: [['Sara', 'Kommst du Samstag mit?'], ['Amira', 'Mal sehen.']], nach: 'Sie will. Aber wenn sie hingeht und es wird komisch? Dann lieber gleich zu Hause bleiben.' },
  ],
  s09: [
    { erz: 'Yusuf raucht abends einen, „zum Runterkommen“. Seit dem Sommer jeden Abend.', bild: 'yusuf:ruhig', blasen: [['Yusuf', 'Ich hab’s im Griff. Ich kann jederzeit aufhören.']] },
    { erz: 'Letzte Woche gab es drei Tage nichts. Yusuf hat kaum geschlafen, seine kleine Schwester angeschrien und ist nicht zur Arbeit.', bild: 'yusuf:wuetend' },
    { erz: 'Am vierten Tag war alles wieder gut.', bild: 'yusuf:froh', blasen: [['Yusuf', 'Siehst du? Ohne geht es mir schlechter.']] },
  ],
  s10: [
    { erz: 'Lio hat seit drei Wochen ein Referat auf. Jeden Abend nimmt er es sich vor. Jeden Abend ist etwas anderes: erst essen, erst das Video, erst aufräumen – Lio räumt sonst nie auf.', bild: 'lio:gelangweilt:handy' },
    { erz: 'Am Abend davor sagt er:', bild: 'lio:traurig', blasen: [['Lio', 'Ist mir eh egal. Ich bin halt dumm.']] },
    { erz: 'Am Morgen ist ihm schlecht. Er bleibt zu Hause. Die Lehrerin schreibt:', bild: 'lehrerin:neutral', blasen: [['Lehrerin', 'Kein Interesse.']] },
  ],
  s11: [
    { erz: 'Tom steht an der Haltestelle. Der Bus kommt, Tom steigt nicht ein. Drinnen sitzen zu viele, die schauen könnten.', bild: 'tom:aengstlich:stehen' },
    { erz: 'Sein Herz rast, die Hände kribbeln, er bekommt schlecht Luft. Er geht zu Fuß, vierzig Minuten, und kommt zu spät.', bild: 'tom:nervoes:gehen' },
    { erz: 'In der Schule sagt er nur:', bild: 'tom:verlegen', blasen: [['Tom', 'Verschlafen.']], nach: 'Am nächsten Tag ist der Bus noch ein bisschen größer geworden.' },
  ],
  s12: [
    { erz: 'Seit Lina mit Elias zusammen ist, will er wissen, wo sie ist. Erst fand sie es süß. Dann wollte er ihren Standort, dann ihr Passwort.', bild: 'lina:verlegen:handy', blasen: [['Elias', 'In einer Beziehung vertraut man sich.']] },
    { erz: 'Letzte Woche hat er ihre Chats gelesen und war drei Tage beleidigt – wegen einer Nachricht an einen Jungen aus der Klasse.', bild: 'lina:traurig', nach: 'Lina hat sich entschuldigt. Sie weiß nicht genau, wofür.' },
    { erz: 'Ihre Freundin sagt:', bild: ['jana:froh', 'lina:verwirrt'], blasen: [['Freundin', 'Der liebt dich halt.']] },
  ],
  s13: [
    { erz: 'Samstag ist Besuchstag. Janas Mutter hat versprochen zu kommen. Um zwei ist sie nicht da, um drei auch nicht.', bild: 'jana:besorgt:sitzen' },
    { erz: 'Um vier kommt eine Nachricht. Jana schreibt zurück.', bild: 'jana:traurig:handy', blasen: [['Nachricht', 'Schaff es heute nicht, Schatz. Nächstes Mal sicher.'], ['Jana', 'Kein Problem.']] },
    { erz: 'Dann streitet sie mit der Erzieherin wegen eines Joghurts. Am Abend sagt ein Mädchen:', bild: ['lea:neutral', 'jana:wuetend'], blasen: [['Mädchen', 'Deine Mutter ist echt das Letzte.']], nach: 'Jana geht auf sie los.' },
  ],
  s14: [
    { erz: 'Der Meister schickt Yusuf zum Berufsberater. Der fragt:', bild: ['chef:neutral', 'yusuf:neutral'], blasen: [['Berater', 'Wo siehst du dich in fünf Jahren?'], ['Yusuf', 'Keine Ahnung.']] },
    { erz: 'Der Berater seufzt und schreibt etwas auf.', bild: 'chef:enttaeuscht' },
    { erz: 'Was Yusuf nicht sagt: Er hat einen Plan. Mechatroniker, eine eigene Wohnung – und dass seine kleine Schwester bei ihm essen kann, wenn es zu Hause knallt.', bild: 'yusuf:ruhig', nach: 'Er sagt es nicht, weil das letzte Mal jemand gelacht hat.' },
  ],
  s15: [
    { erz: 'Lea steht jeden Morgen auf, geht zur Schule, lacht in der Pause. Niemand merkt etwas.', bild: 'lea:froh:stehen' },
    { erz: 'Nachmittags liegt sie auf dem Bett und schaut an die Decke. Früher hat sie gezeichnet, stundenlang. Die Stifte liegen seit Februar in der Schublade.', bild: 'lea:muede' },
    { erz: 'Wenn jemand fragt, sagt sie:', bild: 'lea:neutral', blasen: [['Lea', 'Bin nur müde.']], nach: 'Traurig ist sie nicht. Das wäre wenigstens ein Gefühl.' },
  ],
  s16: [
    { erz: 'Erst die Kopfhörer, jetzt das: Ben hat mit zwei anderen einen Roller „geliehen“. Die Idee kam nicht von ihm. Gefahren ist er.', bild: 'ben:besorgt:stehen' },
    { erz: 'Jetzt gibt es eine Anzeige, einen Termin, und seine Mutter redet seit vier Tagen nur das Nötigste. Der Erzieher will „darüber sprechen“.', bild: ['lehrer:neutral', 'ben:wuetend'], blasen: [['Ben', 'War halt so.']] },
    { erz: 'Was er denkt:', bild: 'ben:traurig', blasen: [['Ben denkt', 'Jetzt bin ich endgültig der, für den mich alle halten. Dann kann ich auch gleich so weitermachen.']] },
  ],
  s17: [
    { erz: 'Im Schwimmbad ist Sami der Lauteste – und der Einzige im T-Shirt.', bild: 'sami:froh:stehen', blasen: [['Sami', 'Sonnenbrand.']] },
    { erz: 'Zu Hause macht er Liegestütze vor dem Spiegel, schaut Videos von Typen mit Bauchmuskeln und rechnet aus, wie lange es dauert, bis er auch so aussieht.', bild: 'sami:nervoes:handy' },
    { erz: 'Beim Essen ist er als Erster fertig.', bild: 'sami:wuetend', blasen: [['Sami', 'Kein Hunger.'], ['Schwester', 'Du spinnst, du bist doch ganz normal.']], nach: 'Normal ist genau das Wort, das Sami am meisten hasst.' },
  ],
}

const CHECK = ['Ich habe heute etwas über mich gemerkt.', 'Ich weiß, was ich bis zum nächsten Mal ausprobiere.', 'Ich weiß, mit wem ich reden kann, wenn es schwer wird.']

// ---------------------------------------------------------------- Umwandeln
const esc = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const md = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/==(.+?)==/g, '<mark>$1</mark>')
const peep = (b: string) => b.replace(/^peep:/, '')
const wieZeit = (b: any) => [b.wie, b.zeit].filter(Boolean).join(' · ')

function fragenBlock(b: any): any[] {
  const out: any[] = []
  const wz = wieZeit(b) ? ` //(${wieZeit(b)})//` : ''
  b.fragen.forEach((f: any, i: number) => {
    const kopf = i === 0 ? [b.titel, b.kontext].filter(Boolean).join(' – ') : ''
    const auftrag = (kopf ? `**${kopf}**${f.f ? ' – ' + f.f : ''}` : f.f || '') + (i === 0 ? wz : '')
    if (f.raster) {
      const n = f.raster.spalten.length, erste = Math.max(36, 100 - n * 15)
      const lang = f.raster.zeilen.length > 10 && n <= 4   // lange Liste (Landkarte): zwei Tabellen nebeneinander
      const ICON: Record<string, string> = { brennt: 'flame', 'geht so': 'temperature', kalt: 'snowflake', Sperrgebiet: 'lock' }
      out.push({ art: 'tabelle', auftrag, kopf: ['', ...f.raster.spalten], breiten: lang ? [48, ...f.raster.spalten.map(() => 52 / n)] : [erste, ...f.raster.spalten.map(() => (100 - erste) / n)], zeilen: f.raster.zeilen.map((z: string) => [z, ...f.raster.spalten.map(() => '')]), ...(lang ? { halbe: true, kopfIcons: ['', ...f.raster.spalten.map((x: string) => ICON[x] || '')] } : {}) })
    } else if (f.regler) {
      out.push({ art: 'skala', auftrag, zeilen: f.regler })
    } else if (f.skala) {
      out.push({ art: 'skala', auftrag, zeilen: f.skala, bis: 10 })
    } else if (f.satz) {
      out.push({ art: 'fragen', auftrag, fragen: f.satz.map((s: string) => ({ f: s, zeilen: 2 })) })
    } else if (f.preis) {
      const kopf = [f.preis.erste || 'Möglichkeit', ...f.preis.kopf]
      out.push({ art: 'tabelle', auftrag, hoch: f.preis.kopf.every((k: string) => !/^(du|ich|dein|Gegenüber|dein Gegenüber)$/i.test(k)), kopf, breiten: [36, 32, 32], zeilen: f.preis.optionen.map((o: string) => [o, '', '']) })
    } else if (f.kreis || f.kreuz) {
      out.push({ art: 'mc', auftrag: auftrag.replace(/Kreise ein/g, 'Kreuze an'), fragen: [{ f: '', o: f.kreis || f.kreuz, r: [] }] })
      if (f.linien) out.push({ art: 'fragen', auftrag: '', fragen: [{ f: '', zeilen: f.linien }] })
    } else if (f.striche) {
      out.push({ art: 'frei', auftrag, html: `<div class="striche">${f.striche.map(([l, r]: [string, string]) => `<div class="st-z"><span>${md(l)}</span><i></i><span>${md(r)}</span></div>`).join('')}</div>` })
    } else if (f.feld) {
      out.push({ art: 'frei', auftrag, html: `<div class="feldbox" style="height:${f.feld}mm"></div>` })
    } else if (f.zahl) {
      out.push({ art: 'tabelle', auftrag, kopf: ['', 'Zahl'], breiten: [80, 20], zeilen: f.zahl.map((z: string) => [z, '']) })
    } else if (f.gitter) {
      out.push({ art: 'tabelle', auftrag, kopf: ['Finde jemanden, der …', 'Name'], breiten: [70, 30], zeilen: f.gitter.map((z: string) => [z, '']) })
    } else {
      out.push({ art: 'fragen', auftrag, fragen: [{ f: '', zeilen: f.linien || 3 }] })
    }
  })
  return out
}

function umbau(h: any) {
  const tief = lesbar(h.farbe)   // Leuchtfarbe der App, für Druck so weit abgedunkelt, dass weiße Schrift lesbar ist (Kontrast ≥ 4,2)
  const L: any = {
    thema: h.thema, titel: h.headline,
    untertitel: '', ziel: { de: ZIEL[h.id][0], fr: ZIEL[h.id][1] }, bild: [peep(h.bild).split(':').slice(0, 2).join(':')],
    start: { was: '', aufgaben: [] as any[] }, ueben: [] as any[], sprechen: [] as any[], schreiben: [] as any[], check: CHECK,
  }
  h.seiten.forEach((s: any, si: number) => {
    const bloecke = s.bloecke.flatMap((b: any) => (b.art === 'zwei' ? [...b.links, ...b.rechts] : [b]))
    bloecke.forEach((b: any, bi: number) => {
      switch (b.art) {
        case 'text':
          if (bloecke[bi + 1]?.art === 'logbuch') break   // Erklärung wandert in den Auftrag des Logbuchs
          if (si === 0 && !L.untertitel) L.untertitel = b.x.join(' ')
          else (si === 0 ? L.start.aufgaben : L.ueben).push({ art: 'frei', auftrag: '', html: b.x.map((x: string) => `<p class="solo-text">${md(x)}</p>`).join('') })
          break
        case 'regeln':
          L.regel = { was: '', reihen: [[{ titel: b.titel, punkte: b.punkte, nummern: true }]] }
          break
        case 'fragen': {
          const ziel = si === 0 ? L.start.aufgaben : L.ueben
          ziel.push(...fragenBlock(b))
          break
        }
        case 'szene': {
          const bd = BD[h.id]
          L.lesen = bd
            ? { was: s.unter || 'Der Fall', art: 'bd', ohneAudio: true, spalten: 3, titel: b.name, nummern: false, cases: bd, woerter: WOERTER[h.id] || [], aufgaben: [] }
            : { was: s.unter || 'Der Fall', art: 'profile', ohneAudio: true, titel: b.name, profile: [{ bild: peep(b.bild), name: b.name, text: b.text }], woerter: WOERTER[h.id] || [], aufgaben: [] }
          L.lesen.aufgaben.push({ art: 'fragen', auftrag: 'Überleg zuerst allein. Dann redet ihr.', fragen: [{ f: b.frage, zeilen: 3 }] })
          break
        }
        case 'fakten':
          L.regel = { was: b.titel, reihen: b.fakten.length === 3 ? [[b.fakten[0], b.fakten[1]].map((x: any) => ({ titel: x.t, text: x.x })), [{ titel: b.fakten[2].t, text: b.fakten[2].x }]] : [b.fakten.map((x: any) => ({ titel: x.t, text: x.x }))] }
          break
        case 'clip':
          ;(L.lesen ? L.lesen.aufgaben : L.ueben).push({ art: 'clip', auftrag: `Video zusammen schauen${b.clip.dauer ? ': ' + b.clip.dauer : ''}.`, titel: b.clip.titel, kanal: b.clip.kanal, dauer: b.clip.dauer, url: b.clip.url, frage: b.clip.frage, zeilen: 2 })
          break
        case 'marker':
          ;(L.lesen ? L.lesen.aufgaben : si === 0 ? L.start.aufgaben : L.ueben).push({ art: 'frei', auftrag: '', html: `<div class="unbequem"><span class="u-l">${esc(b.label)}</span><p>${md(b.x)}</p></div>` + (b.linien ? `<div class="linien">${'<div class="zeile"></div>'.repeat(b.linien)}</div>` : '') })
          break
        case 'kasten':
          ;(L.lesen ? L.lesen.aufgaben : L.ueben).push({ art: 'frei', auftrag: '', html: `<div class="regelkasten eins"><div class="merke"><h4>${md(b.titel || b.label || '')}</h4><p>${md(b.x)}</p>${b.linien ? `<div class="linien">${'<div class="zeile"></div>'.repeat(b.linien)}</div>` : ''}</div></div>` })
          break
        case 'experiment':
          L.schreiben.push({ art: 'schreiben', auftrag: `Experiment bis zum nächsten Mal: **${b.titel}.** ${b.x}`, zeilen: 5, zeilenAnfaenge: ['Meine Wette:', '', 'Was passiert ist (nächstes Mal):', '', ''] })
          break
        case 'karten':
          L.schreiben.push({ art: 'schneidekarten', auftrag: 'Für die Tasche: Schneide die Karten aus.', spalten: 2, farbe: tief,
            karten: b.karten.map((k: any) => ({ titel: k.titel, icon: k.icon, text: k.zeilen.join('\n') + (k.eigen ? '\n' + k.eigen : ''), ...(k.eigen ? { linien: 1 } : {}) })) })
          break
        case 'tiefe':
          L.sprechen.push({ art: 'sprechen', auftrag: 'Sechs Fragen, von leicht bis tief. Du suchst die Stufe aus. Jede Frage darfst du zurückgeben – „Weiter“ gilt immer.', karten: [
            { titel: 'Stufe 1 · leicht', text: b.fragen[0] }, { titel: 'Stufe 2 · ehrlich', text: b.fragen[1] }, { titel: 'Stufe 3 · tief', text: b.fragen[2] }] })
          break
        case 'logbuch':
          ;(L.nachCheck ||= []).push({ art: 'tabelle', auftrag: 'Logbuch: eine Zeile je Bezugszeit. ' + (bloecke[bi - 1]?.art === 'text' ? bloecke[bi - 1].x.join(' ') : ''), kopf: ['Datum', 'Thema', 'Akku 0–10', 'Experiment: geklappt?'], breiten: [18, 40, 16, 26], zeilen: Array.from({ length: Math.max(b.zeilen, 16) }, () => ['', '', '', '']) })
          break
        case 'check':
          break
        default:
          throw new Error(`${h.id}: unbekannter Baustein ${b.art}`)
      }
    })
  })
  if (!L.start.aufgaben.length) delete L.start
  for (const k of ['ueben', 'sprechen', 'schreiben']) if (!L[k].length) delete L[k]
  const b = h.begleitung
  const videos = [
    ...h.seiten.flatMap((s: any) => s.bloecke).filter((x: any) => x.art === 'clip').map((x: any) => ({ fuer: 'die Stunde', titel: x.clip.titel, kanal: x.clip.kanal, dauer: x.clip.dauer, url: x.clip.url })),
    ...(b.extra || []).map((x: any) => ({ fuer: 'Sie selbst', titel: x.titel, kanal: x.kanal, dauer: x.dauer, url: x.url, notiz: x.frage })),
  ]
  const MODUL = {
    id: 'solo-' + h.nr, kuerzel: 'so' + Number(h.nr), nr: Number(h.nr), nrText: '#' + h.nr, sprache: 'de',
    kompakt: true, ohneLoesungen: true, ablage: 'offline/solo', deckH1: 'SOLO #' + h.nr, fuss: `SOLO #${h.nr} · ${h.thema}`, stand: h.stand,
    klasse: 'Einzelarbeit', niveau: '12–17 Jahre · 45–50 Minuten', dateiname: h.datei,
    fach: { de: 'Bezugszeit', fr: 'Temps de référence' }, titel: { de: h.thema, fr: '' }, untertitel: { de: h.headline, fr: '' },
    farben: { tief, mittel: h.farbe, zart: mische(h.farbe, 255, 0.88), dunkel: mische(tief, 0, 0.35) },
    deckbild: [peep(h.bild).split(':').slice(0, 2).join(':') + ':stehen'], blasen: h.sticker ? [{ t: h.sticker, x: 120, y: 92 }] : [],
    medien: [['message-circle', 'var(--sprechen)', 'Reden', 'zu zweit, in Ruhe'], L.lesen ? ['book', 'var(--lesen)', 'Der Fall', 'eine kurze Geschichte'] : ['map-pin', 'var(--lesen)', 'Ankommen', 'wo stehst du?'],
      ['pencil', 'var(--ueben)', 'Dein Teil', 'ankreuzen, schreiben, vergleichen'], ['backpack', 'var(--regel)', 'Mitnehmen', 'ein Experiment für die Woche']],
    teile: { start: { de: 'Ankommen', icon: 'door-enter' }, lesen: { de: 'Der Fall', icon: 'book' }, regel: { de: L.lesen ? 'Gut zu wissen' : 'Der Deal', icon: L.lesen ? 'bulb' : 'heart-handshake' },
      ueben: { de: 'Dein Teil', icon: 'pencil' }, sprechen: { de: 'Reden', icon: 'messages' }, schreiben: { de: 'Mitnehmen', icon: 'backpack' }, check: { de: 'Wie war es?', icon: 'mood-smile' } },
    checkKopf: ['Heute …', 'stimmt', 'teils', 'noch nicht'], namensfelder: ['Name', 'Datum', 'mit wem'],
    quiz: h.quiz || [],
    begleitung: { fakten: b.fakten, wann: b.wann, ziel: b.ziel, anschluss: b.anschluss, ablauf: b.ablauf, haltung: b.haltung, hinweise: b.hinweise, achtung: b.achtung, videos, hintergrund: b.hintergrund, quellen: b.quellen },
  }
  return `// SOLO #${h.nr} · ${h.thema} – erzeugt mit tools/hefte/solo-umbau.mts aus dossiers/solo/${h.id}.ts. Bitte dort ändern und neu erzeugen.\n` +
    `export const MODUL = ${JSON.stringify(MODUL, null, 1)}\n\nexport const LEKTIONEN = [${JSON.stringify(L, null, 1)}]\n`
}

const wahl = process.argv.slice(2)
const ids = (wahl.length ? wahl : ['00', '01', ...Array.from({ length: 15 }, (_, i) => String(i + 3).padStart(2, '0'))]).filter((x) => x !== '02')
for (const nr of ids) {
  const h = (await import(`../../dossiers/solo/s${nr}.ts`)).default
  writeFileSync(new URL(`./inhalt/solo-${nr}.mjs`, import.meta.url), umbau(h))
  console.log('✓ solo-' + nr)
}
