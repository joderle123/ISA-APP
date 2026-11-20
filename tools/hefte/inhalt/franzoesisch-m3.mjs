// Français · Module 3 « Bien-être et vacances » (Régime / Voie de préparation, A1.2 – A2.1) – cahier multimodal.
// D’après le « Référentiel de compétences – français, régime préparatoire » (MENFP), Module 3 « Le bien-être – Vive les
// vacances ! » : loisirs, émissions de télévision, corps et santé (parties du corps, habitudes, douleurs), vacances ;
// avant de / après, questions (quel, où, est-ce que), aller, venir, lire, verbes pronominaux, futur proche, devoir et
// il faut, repères temporels, expressions idiomatiques, adverbes de quantité, passé composé (avoir et être),
// pronoms COD, qui et où, prépositions de lieu, en / à avec les transports, aller + pays et villes.
// Tous les textes, sondages, émissions, chaînes et lieux sont imaginaires. Santé : conseils simples et prudents.

export const MODUL = {
  id: 'franzoesisch-m3', kuerzel: 'fr3', nr: 3, sprache: 'fr', niveau: 'A1.2 – A2.1', klasse: 'Voie de préparation',
  dateiname: 'Francais_Module-3',
  fach: { de: 'Französisch', fr: 'Français' },
  titel: { de: 'Wohlfühlen und Ferien', fr: 'Bien-être et vacances' },
  untertitel: { fr: 'Parler de ses loisirs et de la télé, dire où on a mal, prendre soin de soi, raconter sa routine, préparer les vacances et raconter au passé – en huit leçons.', de: 'Über Freizeit und Fernsehen sprechen, sagen, wo es weh tut, auf sich achten, den Tagesablauf erzählen, Ferien planen und in der Vergangenheit erzählen – in acht Lektionen.' },
  farben: { tief: '#c2571a', mittel: '#f3b48a', zart: '#fdf1e8', dunkel: '#7a3510' },
  deckbild: ['nele:froh:stehen-zeigen', 'finn:froh:laessig', 'amira:froh:stehen'],
  blasen: [{ t: 'Vive les vacances !', x: 10, y: 108 }, { t: 'J’ai mal…', x: 128, y: 98 }, { t: 'Debout !', x: 162, y: 150 }],
  themen: [
    { titel: { fr: 'Mes loisirs', de: 'Meine Freizeit' }, icon: 'bike', lektionen: 2 },
    { titel: { fr: 'Mon corps, ma santé', de: 'Mein Körper, meine Gesundheit' }, icon: 'heart', lektionen: 3 },
    { titel: { fr: 'Vive les vacances !', de: 'Hurra, Ferien!' }, icon: 'tent', lektionen: 3 },
  ],
  anleitung: [
    'Chaque leçon a cinq parties : **Lire**, **Écouter**, **La règle**, **S’entraîner** et **Écrire**. À la fin, il y a un **mini-bilan**.',
    'À côté de chaque texte, il y a un **code QR**. Scanne-le avec ton portable : tu entends le texte. Tu peux l’écouter plusieurs fois, aussi plus lentement.',
    'Les points montrent le niveau : ●○○ base · ●●○ moyen · ●●● plus. Commence par la base.',
    'Tu parles de toi seulement si tu veux. Tu peux toujours inventer. Les conseils de santé de ce cahier sont simples : pour une vraie question, parle à un adulte de confiance.',
  ],
  // seulement pour la voix (Regex Python)
  aussprache: {
    '\\bMme\\b': 'Madame', '\\bM\\. ': 'Monsieur ', '(\\d{1,2}) h (\\d\\d)': '\\1 heures \\2', '(\\d{1,2}) h\\b': '\\1 heures', '\\b1er\\b': 'premier',
    '\\bTél\\. ': 'Téléphone ', '\\bBD\\b': 'bédé', '(\\d+) ?km\\b': '\\1 kilomètres',
  },
}

const Z = '#1f2430'
// ---------------------------------------------------------------- le corps (leçon 3)
const koerper = () => {
  const dx = 10, haut = '#e9b48f'
  const P = (pts) => 'M' + pts.map(([x, y]) => `${x + dx} ${y}`).join(' L')
  const glied = (pts) => `<path d="${P(pts)}" stroke="${Z}" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${P(pts)}" stroke="${haut}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  const marken = [[1, 70, 22, 0, 18], [2, 91, 62, 140, 52], [3, 29, 94, 0, 84], [4, 117, 132, 140, 132], [5, 70, 104, 0, 116], [6, 85, 192, 140, 184], [7, 55, 172, 0, 160], [8, 92, 215, 140, 216]]
  const svg = `<svg viewBox="0 0 160 228" xmlns="http://www.w3.org/2000/svg">
    ${glied([[57, 126], [56, 172], [54, 208]])}${glied([[83, 126], [84, 172], [86, 208]])}
    <ellipse cx="${50 + dx}" cy="214" rx="11" ry="5.5" fill="#5b5f6b" stroke="${Z}" stroke-width="1.5"/><ellipse cx="${90 + dx}" cy="214" rx="11" ry="5.5" fill="#5b5f6b" stroke="${Z}" stroke-width="1.5"/>
    ${glied([[47, 64], [31, 94], [24, 126]])}${glied([[93, 64], [109, 94], [116, 126]])}
    <circle cx="${23 + dx}" cy="132" r="6.5" fill="${haut}" stroke="${Z}" stroke-width="1.5"/><circle cx="${117 + dx}" cy="132" r="6.5" fill="${haut}" stroke="${Z}" stroke-width="1.5"/>
    <path d="M${64 + dx} 46 L${64 + dx} 58 L${76 + dx} 58 L${76 + dx} 46 Z" fill="${haut}" stroke="${Z}" stroke-width="1.5"/>
    <path d="M${40 + dx} 64 Q${70 + dx} 50 ${100 + dx} 64 L${104 + dx} 78 L${93 + dx} 82 L${92 + dx} 126 L${48 + dx} 126 L${47 + dx} 82 L${36 + dx} 78 Z" fill="#f3b48a" stroke="${Z}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M${47 + dx} 124 L${93 + dx} 124 L${95 + dx} 150 L${73 + dx} 152 L${70 + dx} 138 L${67 + dx} 152 L${45 + dx} 150 Z" fill="#2457a6" stroke="${Z}" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="${70 + dx}" cy="28" r="19" fill="${haut}" stroke="${Z}" stroke-width="1.6"/>
    <path d="M${52 + dx} 24 Q${54 + dx} 6 ${70 + dx} 8 Q${88 + dx} 6 ${89 + dx} 24 Q${80 + dx} 15 ${70 + dx} 16 Q${60 + dx} 15 ${52 + dx} 24 Z" fill="#5b3a21" stroke="${Z}" stroke-width="1.4"/>
    <circle cx="${63 + dx}" cy="28" r="2" fill="${Z}"/><circle cx="${77 + dx}" cy="28" r="2" fill="${Z}"/><path d="M${64 + dx} 37 Q${70 + dx} 41 ${76 + dx} 37" stroke="${Z}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    ${marken.map(([n, px, py, lx, ly]) => `<path d="M${lx + dx} ${ly} L${px + dx} ${py}" stroke="#c2571a" stroke-width="1.3"/><circle cx="${px + dx}" cy="${py}" r="2.2" fill="#c2571a"/><circle cx="${lx + dx}" cy="${ly}" r="7.5" fill="#c2571a"/><text x="${lx + dx}" y="${ly + 3.6}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="10" fill="#fff">${n}</text>`).join('')}
  </svg>`
  const woerter = ['la tête', 'l’épaule', 'le bras', 'la main', 'le ventre', 'la jambe', 'le genou', 'le pied']
  const misch = [6, 2, 0, 4, 7, 1, 5, 3]
  return `<div class="wortspeicher">${misch.map((i) => `<span>${woerter[i]}</span>`).join('')}</div><div style="display:grid;grid-template-columns:62mm 1fr;gap:8mm;align-items:center"><div>${svg}</div><div style="display:grid;gap:1.5mm">${woerter.map((w, i) => `<div style="display:flex;align-items:flex-end;gap:3mm"><span style="font-family:Lexend;font-weight:800;color:var(--f);width:5mm">${i + 1}</span><div class="uhr-linie" style="flex:1"><span class="l">${w}</span></div></div>`).join('')}</div></div>`
}

// ---------------------------------------------------------------- petit graphique (leçon 4)
const balken = (titel, daten, einheit) => {
  const max = Math.max(...daten.map((d) => d[1]))
  return `<div style="font-family:Lexend;font-weight:700;font-size:11.5pt;margin-bottom:2.5mm">${titel}</div><div style="display:grid;gap:2.2mm">${daten
    .map(([l, v]) => `<div style="display:grid;grid-template-columns:34mm 1fr;gap:3mm;align-items:center"><span style="font-size:11.5pt">${l}</span><div style="display:flex;align-items:center;gap:2mm"><div style="height:7mm;width:${(v / max) * 100}mm;background:var(--f);border-radius:1.5mm"></div><b style="font-family:Lexend">${v}</b><span style="font-size:10.5pt;color:var(--leise)">${einheit}</span></div></div>`)
    .join('')}</div>`
}

// ---------------------------------------------------------------- où est la balle ? (leçon 7)
const praepositionen = () => {
  const tisch = `<rect x="20" y="40" width="60" height="6" rx="2" fill="#c98d5b" stroke="${Z}" stroke-width="1.4"/><path d="M26 46 L26 72 M74 46 L74 72" stroke="${Z}" stroke-width="3"/>`
  const kiste = (vorne = true) => `<rect x="30" y="34" width="40" height="34" rx="2" fill="#f3b48a" stroke="${Z}" stroke-width="1.5"/>${vorne ? '' : ''}`
  const ball = (x, y) => `<circle cx="${x}" cy="${y}" r="8" fill="#2457a6" stroke="${Z}" stroke-width="1.4"/><path d="M${x - 8} ${y} Q${x} ${y - 5} ${x + 8} ${y}" stroke="#fff" stroke-width="1.4" fill="none"/>`
  const bilder = [
    ['sur', `${tisch}${ball(50, 31)}`],
    ['sous', `${tisch}${ball(50, 63)}`],
    ['dans', `<path d="M28 36 L28 70 L72 70 L72 36" fill="#fdf1e8" stroke="${Z}" stroke-width="1.5"/>${ball(50, 58)}<path d="M28 36 L72 36" stroke="${Z}" stroke-width="1.5" stroke-dasharray="3 3"/>`],
    ['devant', `${kiste()}${ball(52, 62)}`],
    ['derrière', `${ball(69, 37)}${kiste()}`],
    ['à côté de', `<rect x="18" y="34" width="40" height="34" rx="2" fill="#f3b48a" stroke="${Z}" stroke-width="1.5"/>${ball(72, 60)}`],
  ]
  return `<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:3mm">${bilder
    .map(([w, s], i) => `<div style="text-align:center"><div style="background:var(--f-zart);border-radius:3mm;padding:1mm"><svg viewBox="12 20 76 56" xmlns="http://www.w3.org/2000/svg"><path d="M12 72 L88 72" stroke="#d9c3b0" stroke-width="1.2"/>${s}</svg></div><div style="display:flex;align-items:flex-end;gap:1.5mm"><b style="font-family:Lexend;color:var(--f)">${i + 1}</b><div class="uhr-linie" style="flex:1"><span class="l">${w}</span></div></div></div>`)
    .join('')}</div>`
}

// ---------------------------------------------------------------- plan du camping (leçon 7)
const campingPlan = () => {
  const zone = (x, y, w, h, t, fill = '#ffffff') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${Z}" stroke-width="1.2"/><text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="14" fill="#c2571a">${t}</text>`
  const baum = (x, y) => `<circle cx="${x}" cy="${y}" r="5" fill="#7cc48a" stroke="${Z}" stroke-width="0.8"/>`
  const svg = `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="200" height="16" fill="#9fd0f2"/><text x="100" y="11.5" text-anchor="middle" font-family="Lexend" font-size="8" fill="#173a70">la Sûre (la rivière)</text>
    <rect x="0" y="124" width="200" height="16" fill="#c7cbd3"/><text x="160" y="135" text-anchor="middle" font-family="Lexend" font-size="8" fill="#333">la route</text>
    <path d="M78 136 L78 127 M74.5 130.5 L78 127 L81.5 130.5" stroke="#333" stroke-width="1.2" fill="none"/><text x="86" y="135" font-family="Lexend" font-size="7" fill="#333">entrée</text>
    ${zone(6, 22, 92, 34, 'E', '#fdf1e8')}${zone(104, 22, 44, 34, 'F')}
    ${baum(18, 70)}${baum(30, 76)}${baum(60, 68)}${baum(80, 78)}${baum(168, 30)}${baum(182, 44)}${baum(172, 62)}${baum(186, 80)}
    ${zone(104, 62, 44, 22, 'D', '#fdf1e8')}
    <rect x="6" y="90" width="44" height="28" rx="3" fill="#e4e6ea" stroke="${Z}" stroke-width="1.2"/><text x="28" y="104" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="13" fill="#2457a6">P</text><text x="28" y="113" text-anchor="middle" font-family="Lexend" font-size="7" fill="#333">parking</text>
    ${zone(56, 90, 44, 28, 'A')}${zone(104, 90, 44, 28, 'B', '#e3f2fb')}${zone(152, 90, 44, 28, 'C')}
  </svg>`
  const orte = [['A', 'l’accueil'], ['B', 'la piscine'], ['C', 'le restaurant'], ['D', 'le terrain de jeux'], ['E', 'les tentes'], ['F', 'les douches']]
  return `<div style="display:grid;grid-template-columns:1.35fr 1fr;gap:7mm;align-items:center"><div>${svg}</div><div style="display:grid;gap:1.2mm">${orte.map(([b, w]) => `<div style="display:flex;align-items:flex-end;gap:3mm"><b style="font-family:Lexend;color:var(--f);width:5mm">${b}</b><div class="uhr-linie" style="flex:1"><span class="l">${w}</span></div></div>`).join('')}</div></div>`
}
const zeichenfeld = (text, hoehe = 70) => `<div style="font-size:12.6pt;line-height:1.5;margin-bottom:2.5mm">${text}</div><div style="border:0.6mm dashed var(--f);border-radius:3mm;height:${hoehe}mm"></div>`

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Les loisirs · faire et jouer', titel: 'Tu fais quel sport ?', untertitel: 'Basket, danse, échecs : tu lis le programme d’une maison des jeunes, tu écoutes des jeunes parler de leurs loisirs et tu présentes tes passe-temps.',
    ziel: { fr: 'Je parle de mes loisirs et je comprends un programme d’activités.', de: 'Ich spreche über meine Freizeit und verstehe ein Freizeitprogramm.' },
    bild: ['sami:froh:laessig', 'nele:froh:stehen'],
    start: {
      was: 'Les loisirs',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Quel loisir ? Relie.', stufe: 1, links: ['jouer au foot', 'faire du vélo', 'faire de la natation', 'jouer de la guitare', 'lire des BD', 'faire de la danse'], rechts: ['Fußball spielen', 'Rad fahren', 'schwimmen', 'Gitarre spielen', 'Comics lesen', 'tanzen'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un programme et deux messages', art: 'dokumente',
      quelle: 'Maison des jeunes et messages sur le portable (imaginaires)', titel: 'Qu’est-ce qu’on fait cette année ?',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Maison des jeunes** – Nos activités de l’année', text: ['**Basket :** mardi, de 17 h à 18 h 30, au gymnase.', '**Danse hip-hop :** mercredi, de 14 h à 15 h 30, salle 2.', '**Échecs :** jeudi, de 16 h à 17 h, à la bibliothèque. Pour débutants.', '**Atelier vidéo :** samedi, de 10 h à 12 h. On fait de petits films.', 'Inscription gratuite à l’accueil · Tél. 23 45 67'] },
        { stil: 'nachricht', stimme: 'm3', kopf: 'Message de Sami à Inès', text: ['Salut ! Tu as vu le programme ? Moi, je vais faire de la danse hip-hop le mercredi. Tu viens avec moi ? Ou tu préfères les échecs ?'] },
        { stil: 'nachricht', stimme: 'w3', kopf: 'Réponse d’Inès', text: ['Bonne idée, mais le mercredi, je fais de la natation au club. Je préfère l’atelier vidéo le samedi. J’adore faire des films avec mon portable !'] },
      ],
      woerter: [['la maison des jeunes', 'das Jugendhaus'], ['l’activité', 'die Aktivität'], ['le gymnase', 'die Turnhalle'], ['les échecs', 'das Schach'], ['le débutant', 'der Anfänger'], ['l’atelier', 'der Workshop'], ['gratuit', 'kostenlos'], ['le loisir', 'das Hobby']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète le programme.', stufe: 1, kopf: ['activité', 'jour', 'heure'], breiten: [38, 26, 36], zeilen: [['basket', '[mardi]', '[17 h – 18 h 30]'], ['danse hip-hop', '[mercredi]', '[14 h – 15 h 30]'], ['échecs', '[jeudi]', '[16 h – 17 h]'], ['atelier vidéo', '[samedi]', '[10 h – 12 h]']] },
        { art: 'mc', auftrag: 'Lis les messages et coche.', stufe: 2, fragen: [{ f: 'Sami va faire …', o: ['du basket', 'de la danse hip-hop', 'des échecs'], r: 1 }, { f: 'Le mercredi, Inès …', o: ['fait de la natation', 'fait de la danse'], r: 0 }, { f: 'Inès préfère …', o: ['les échecs', 'l’atelier vidéo'], r: 1 }] },
      ],
    },
    hoeren: {
      was: 'Une interview', wo: 'Radio de l’école · les loisirs', titel: 'Et toi, qu’est-ce que tu fais ?',
      situation: 'Pour la radio de l’école, Chloé pose des questions à Luca, à Mia et à Yusuf sur leurs loisirs.',
      bild: ['chloe:froh:handy', 'finn:froh'], sprecher: { Chloé: 'w2', Luca: 'm1', Mia: 'w3', Yusuf: 'm3' },
      text: [
        ['Chloé', 'Bonjour ! Aujourd’hui, on parle des loisirs. Luca, tu fais quel sport ?'],
        ['Luca', 'Je fais de l’escalade. Je vais à la salle d’escalade deux fois par semaine, le lundi et le vendredi.'],
        ['Chloé', 'Ce n’est pas trop difficile ?'],
        ['Luca', 'Si, un peu ! Mais j’adore ça.'],
        ['Chloé', 'Et toi, Mia ?'],
        ['Mia', 'Moi, je ne fais pas de sport. Je joue du piano et je lis beaucoup. Le week-end, je lis des bandes dessinées dans mon lit !'],
        ['Chloé', 'Et toi, Yusuf, où est-ce que tu joues au foot ?'],
        ['Yusuf', 'Je joue au club de Differdange. On s’entraîne le mercredi et on a des matchs le dimanche.'],
        ['Chloé', 'Merci à vous ! Et vous, chers auditeurs, quel est votre loisir préféré ?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un loisir, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['une activité pour le temps libre', 'un cours obligatoire'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'Luca', 'Mia', 'Yusuf'], breiten: [16, 28, 28, 28], zeilen: [['loisir', '[l’escalade]', '[le piano, la lecture]', '[le foot]'], ['quand ?', '[le lundi et le vendredi]', '[le week-end]', '[le mercredi et le dimanche]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Interviewe deux personnes de la classe sur leurs loisirs. Note les réponses.', stufe: 3, karten: [
        { titel: 'Demander', text: ['Tu fais quel sport ?', 'Où est-ce que tu joues ?', 'Tu fais ça quand ?', 'Est-ce que tu joues d’un instrument ?'] },
        { titel: 'Répondre', text: ['Je fais du / de la …', 'Je joue au / à la …', 'Je joue du / de la …', 'Je ne fais pas de sport, mais …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'faire du … · jouer au …', punkte: ['**faire du** vélo · **de la** danse · **de l’**escalade', '**jouer au** foot · **à la** pétanque · **aux** cartes', '**jouer du** piano · **de la** guitare (instrument)', 'Négation : je ne fais **pas de** sport.'] },
         { titel: 'Poser une question', punkte: ['Tu fais **quel** sport ?', 'Tu préfères **quelle** activité ?', '**Où est-ce que** tu joues ?', '**Est-ce que** tu aimes la danse ?', 'Avec l’intonation : Tu viens ?'] }],
        [{ titel: 'venir et lire', tabelle: { kopf: ['', 'venir', 'lire'], zeilen: [['je', '**viens**', '**lis**'], ['tu', '**viens**', '**lis**'], ['il / elle / on', '**vient**', '**lit**'], ['nous', '**venons**', '**lisons**'], ['vous', '**venez**', '**lisez**'], ['ils / elles', '**viennent**', '**lisent**']] } },
         { art: 'tipp', titel: 'Combien de fois ?', text: '**une fois** par semaine · **deux fois** par mois · **tous les** samedis · **le** mercredi = tous les mercredis' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec du, de la, de l’, au, à la ou aux.', stufe: 1, saetze: ['Je fais [du] vélo.', 'Elle joue [au] basket.', 'Tu fais [de la] danse ?', 'Nous jouons [aux] cartes.', 'Il fait [de l’] escalade.', 'Je joue [du] piano.'] },
      { art: 'luecken', auftrag: 'Conjugue venir ou lire.', stufe: 1, saetze: ['(venir) Tu [viens] avec moi ?', '(lire) Je [lis] une BD.', '(venir) Ils [viennent] au club.', '(lire) Nous [lisons] le programme.', '(venir) Vous [venez] samedi ?'] },
      { art: 'abschreiben', auftrag: 'Écris la question.', stufe: 2, kopf: ['réponse', 'question'], saetze: [['Je fais de l’escalade.', 'Tu fais quel sport ?'], ['Je joue au club de Differdange.', 'Où est-ce que tu joues ?'], ['Oui, j’aime la danse.', 'Est-ce que tu aimes la danse ?']] },
    ],
    schreiben: [
      { art: 'tabelle', auftrag: 'Fais la liste de tes passe-temps préférés (ou de ceux d’une personne imaginaire).', stufe: 1, kopf: ['passe-temps', 'quand ?', 'où ?'], breiten: [40, 30, 30], zeilen: [['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']] },
      { art: 'schreiben', auftrag: 'Présente tes loisirs pour le site de la maison des jeunes.', stufe: 2,
        anfaenge: ['Mon loisir préféré, c’est …', 'Je fais … fois par semaine.', 'Je joue au / du …', 'Je ne fais pas de …', 'Je voudrais essayer …'], zeilen: 8,
        beispiel: 'Mon loisir préféré, c’est le basket. Je joue deux fois par semaine, le mardi et le jeudi. Je joue aussi de la guitare. Je ne fais pas de natation. Je voudrais essayer l’escalade !' },
    ],
    check: ['Je nomme des loisirs et des sports.', 'J’utilise faire du et jouer au / du.', 'Je pose des questions avec quel, où, est-ce que.', 'Je conjugue venir et lire.', 'Je présente mes loisirs.'],
  },
  // ================================================================ 2
  {
    thema: 'La télévision · donner son avis', titel: 'Qu’est-ce qu’on regarde ?', untertitel: 'Documentaire, série, dessin animé : tu lis un programme télé, tu écoutes des amis choisir une émission et tu donnes ton avis.',
    ziel: { fr: 'Je comprends un programme télé et je donne mon avis sur un film ou une émission.', de: 'Ich verstehe ein Fernsehprogramm und sage meine Meinung zu einem Film oder einer Sendung.' },
    bild: ['mia:froh:sitzen', 'ben:ueberrascht:sitzen'],
    start: {
      was: 'Les émissions',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Les émissions : relie.', stufe: 1, links: ['un documentaire', 'un dessin animé', 'une série', 'le journal télévisé', 'un jeu', 'un film'], rechts: ['eine Dokumentation', 'ein Zeichentrickfilm', 'eine Serie', 'die Nachrichten', 'eine Spielshow', 'ein Film'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un programme télé et un avis', art: 'dokumente',
      quelle: 'Magazine des jeunes (émissions et chaînes imaginaires)', titel: 'Ce soir à la télé',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Ce soir à la télé** – vendredi', text: ['**18 h 30 · TV Jeunes :** « Les Petits Pirates », dessin animé.', '**19 h 00 · Info 24 :** le journal télévisé.', '**19 h 30 · Monde Nature :** « La vie des loups », documentaire.', '**20 h 15 · TV Jeunes :** « Qui sera le champion ? », jeu.', '**20 h 30 · Ciné Soir :** « Le Phare des étoiles », film d’aventure, à partir de 10 ans.'] },
        { stil: 'nachricht', stimme: 'w2', kopf: 'Courrier des lecteurs – l’avis de Léa', text: ['J’ai vu « Le Phare des étoiles » au cinéma. C’est l’histoire de deux enfants qui cherchent un trésor. Le film est **passionnant** et un peu **triste** à la fin. Les images sont **magnifiques** ! Je le conseille à tout le monde. Ma note : 4 étoiles sur 5.'] },
      ],
      woerter: [['ce soir', 'heute Abend'], ['la chaîne', 'der Sender'], ['le loup', 'der Wolf'], ['le phare', 'der Leuchtturm'], ['à partir de 10 ans', 'ab 10 Jahren'], ['le trésor', 'der Schatz'], ['passionnant', 'spannend'], ['conseiller', 'empfehlen']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète le programme.', stufe: 1, kopf: ['émission', 'genre', 'heure'], breiten: [42, 34, 24], zeilen: [['« Les Petits Pirates »', '[dessin animé]', '[18 h 30]'], ['« La vie des loups »', '[documentaire]', '[19 h 30]'], ['« Qui sera le champion ? »', '[jeu]', '[20 h 15]'], ['« Le Phare des étoiles »', '[film d’aventure]', '[20 h 30]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Le journal télévisé commence à 19 heures.', true], ['Le film est pour les enfants de 6 ans.', false], ['Pour Léa, le film est passionnant.', true], ['Léa donne 5 étoiles au film.', false]] },
      ],
    },
    hoeren: {
      was: 'Une soirée télé', wo: 'Chez Chloé · vendredi soir', titel: 'Tu préfères quelle émission ?',
      situation: 'Vendredi soir, Mia et Ben sont chez Chloé. Ils regardent le programme et choisissent une émission.',
      bild: ['chloe:froh:sitzen', 'ben:froh:sitzen'], sprecher: { Chloé: 'w2', Ben: 'm3', Mia: 'w3' },
      text: [
        ['Chloé', 'Alors, on regarde quoi ce soir ?'],
        ['Ben', 'Il y a un documentaire sur les loups à sept heures et demie. J’adore les animaux !'],
        ['Mia', 'Bof, les documentaires, c’est ennuyeux. Moi, je préfère les jeux. « Qui sera le champion ? », c’est drôle !'],
        ['Chloé', 'Et le film, « Le Phare des étoiles » ? Léa dit qu’il est passionnant.'],
        ['Ben', 'Il commence à quelle heure ?'],
        ['Chloé', 'À huit heures et demie.'],
        ['Mia', 'D’accord, mais je ne veux pas regarder un film qui fait peur !'],
        ['Chloé', 'Non, ce n’est pas un film d’horreur. C’est un film d’aventure.'],
        ['Ben', 'Alors, on regarde le documentaire, et après, le film ?'],
        ['Mia', 'D’accord ! Et on fait du pop-corn !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un film d’aventure, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['un film avec beaucoup d’action', 'les informations du jour'], r: 0 }] }],
      beim: [
        { art: 'wer', auftrag: 'Écoute. Qui dit ça ?', stufe: 1, personen: ['Chloé', 'Ben', 'Mia'], saetze: [['J’adore les animaux.', 'Ben'], ['Les documentaires, c’est ennuyeux.', 'Mia'], ['Je préfère les jeux.', 'Mia'], ['Le film commence à huit heures et demie.', 'Chloé'], ['Ce n’est pas un film d’horreur.', 'Chloé']] },
        { art: 'mc', auftrag: 'Écoute encore. Qu’est-ce qu’ils regardent ?', stufe: 2, fragen: [{ f: '', o: ['le documentaire et le film', 'le jeu et le journal télévisé'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Parle d’un film ou d’une émission que tu aimes. Ton ou ta partenaire pose des questions.', stufe: 3, karten: [
        { titel: 'Présenter', text: ['C’est un film / une série …', 'C’est l’histoire de …', 'Je trouve ça drôle / passionnant …', 'Ma note : … sur 5'] },
        { titel: 'Réagir', text: ['Ça a l’air super !', 'Moi, je préfère …', 'Ce n’est pas mon genre.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Donner son avis', punkte: ['Je trouve ce film **passionnant**.', 'C’est **drôle** · **génial** · **magnifique**.', 'C’est **ennuyeux** · **triste** · **nul**.', '**À mon avis**, c’est un bon film.', 'J’adore ! · Je n’aime pas du tout.'] },
         { titel: 'préférer', punkte: ['je préf**è**re · tu préf**è**res', 'il / elle préf**è**re', 'nous préf**é**rons · vous préf**é**rez', 'ils / elles préf**è**rent'] }],
        [{ art: 'tipp', titel: 'L’âge conseillé', text: 'Regarde l’âge conseillé : **à partir de** 10 ans, 12 ans … Un film qui fait peur ? Tu peux dire non !' },
         { art: 'achtung', titel: 'quel ou quelle ?', text: '**quel** film · **quel** jeu (masculin) · **quelle** série · **quelle** émission (féminin)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec quel ou quelle.', stufe: 1, saetze: ['Tu regardes [quel] film ?', 'Tu préfères [quelle] série ?', 'Le jeu commence à [quelle] heure ?', 'C’est sur [quelle] chaîne ?', '[Quel] documentaire tu conseilles ?'] },
      { art: 'luecken', auftrag: 'Conjugue préférer.', stufe: 1, saetze: ['Je [préfère] les jeux.', 'Tu [préfères] les séries ?', 'Mia [préfère] le pop-corn.', 'Nous [préférons] le film.', 'Ils [préfèrent] les documentaires.'] },
      { art: 'rf', auftrag: 'Avis positif ou négatif ? Coche.', stufe: 1, spalten: ['positif', 'négatif'], saetze: [['C’est génial !', true], ['C’est ennuyeux.', false], ['Je trouve ça drôle.', true], ['C’est nul.', false], ['Les images sont magnifiques.', true]] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris ton avis sur un film, une série ou une émission pour le courrier des lecteurs.', stufe: 2,
        anfaenge: ['J’aime … / J’ai vu …', 'C’est un film / une série …', 'C’est l’histoire de …', 'Je trouve …', 'Ma note : …'], zeilen: 9,
        beispiel: 'J’aime la série « La Classe des Inventeurs ». C’est une série pour les jeunes. C’est l’histoire de quatre élèves qui construisent des robots. Je trouve les personnages très drôles. Ma note : 4 sur 5.' },
    ],
    check: ['Je connais les émissions de télévision.', 'Je comprends un programme télé.', 'Je donne mon avis avec des mots simples.', 'J’utilise quel et quelle.', 'J’écris un avis.'],
  },
  // ================================================================ 3
  {
    thema: 'Le corps · avoir mal', titel: 'Aïe, j’ai mal !', untertitel: 'La tête, le bras, le genou : tu nommes les parties du corps, tu dis où tu as mal et tu comprends des conseils de santé.',
    ziel: { fr: 'Je nomme les parties du corps et je dis où j’ai mal.', de: 'Ich nenne Körperteile und sage, wo es mir weh tut.' },
    bild: ['yusuf:traurig:sitzen', 'arzthelferin:froh:erklaeren'],
    start: {
      was: 'Le corps',
      aufgaben: [
        { art: 'frei', auftrag: 'Les parties du corps : écris le mot.', stufe: 1, html: koerper() },
      ],
    },
    lesen: {
      was: 'Une question et une réponse', art: 'dokumente',
      quelle: 'Courrier des lecteurs d’un magazine (personnes imaginaires)', titel: 'J’ai souvent mal à la tête',
      dokumente: [
        { stil: 'nachricht', stimme: 'w2', kopf: '**Question de Nina, 12 ans**', text: ['Bonjour ! J’ai souvent mal à la tête, surtout le soir. Et je suis souvent fatiguée à l’école. Qu’est-ce que je dois faire ?'] },
        { stil: 'karte', stimme: 'w1', kopf: '**La réponse de l’infirmière, Mme Morel**', text: ['Chère Nina, le mal de tête a beaucoup de causes. Voici quelques conseils.', 'Bois **assez d’eau** pendant la journée. Dors **environ neuf heures** par nuit. Le soir, ne regarde **pas trop** ton portable.', 'Fais des pauses et **bouge** : marche, cours, fais du vélo.', 'Si tu as **souvent** mal, parle à un adulte de confiance et va **chez le médecin**.'] },
      ],
      woerter: [['avoir mal à', 'Schmerzen haben in'], ['souvent', 'oft'], ['surtout', 'vor allem'], ['l’infirmière', 'die Krankenschwester'], ['la cause', 'die Ursache'], ['bouger', 'sich bewegen'], ['le médecin', 'der Arzt, die Ärztin'], ['un adulte de confiance', 'ein Erwachsener, dem man vertraut']],
      aufgaben: [
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['Nina a souvent mal au ventre.', false], ['Elle est souvent fatiguée.', true], ['L’infirmière dit : « Bois assez d’eau. »', true], ['Il faut regarder le portable le soir.', false]] },
        { art: 'fragen', auftrag: 'Réponds.', stufe: 2, fragen: [{ f: 'Combien d’heures faut-il dormir, selon l’infirmière ?', l: 'environ neuf heures' }, { f: 'Si Nina a souvent mal, qu’est-ce qu’elle doit faire ?', l: 'parler à un adulte de confiance et aller chez le médecin' }] },
      ],
    },
    hoeren: {
      was: 'À l’infirmerie', wo: 'Infirmerie de l’école · cours de sport', titel: 'Où est-ce que tu as mal ?',
      situation: 'Pendant le cours de sport, Yusuf tombe. Il va à l’infirmerie avec Sami. L’infirmière, Mme Morel, l’examine.',
      bild: ['arzthelferin:froh:erklaeren', 'yusuf:traurig'], sprecher: { Sami: 'm2', 'Mme Morel': 'w1', Yusuf: 'm3' },
      text: [
        ['Sami', 'Bonjour, Madame. Mon copain est tombé pendant le basket.'],
        ['Mme Morel', 'Oh ! Assieds-toi ici. Qu’est-ce qui ne va pas ? Où est-ce que tu as mal ?'],
        ['Yusuf', 'J’ai mal au genou. Et un peu à la main.'],
        ['Mme Morel', 'Tu peux bouger la jambe ? Plie le genou… doucement.'],
        ['Yusuf', 'Aïe ! Ça fait mal, mais ça va.'],
        ['Mme Morel', 'Bon, ce n’est pas grave. Je mets de la glace sur ton genou. Reste assis quinze minutes.'],
        ['Yusuf', 'Et le match de vendredi ?'],
        ['Mme Morel', 'Tu dois te reposer deux ou trois jours. Pas de sport cette semaine ! Et si tu as encore mal, va chez le médecin.'],
        ['Sami', 'Je préviens le professeur de sport !'],
        ['Yusuf', 'Merci, Sami.'],
      ],
      vor: [{ art: 'mc', auftrag: 'À l’infirmerie, on peut dire … Coche.', stufe: 1, fragen: [{ f: '', o: ['J’ai mal au genou.', 'J’ai faim.', 'Je suis tombé.'], r: [0, 2] }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'Yusuf a mal …', o: ['à la tête', 'au genou et à la main', 'au ventre'], r: 1 }, { f: 'L’infirmière met …', o: ['de la glace', 'une crème'], r: 0 }, { f: 'Yusuf reste assis …', o: ['cinq minutes', 'quinze minutes'], r: 1 }, { f: 'Cette semaine, Yusuf …', o: ['joue le match', 'ne fait pas de sport'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jouez à l’infirmerie : un ou une élève a mal, l’infirmier ou l’infirmière pose des questions.', stufe: 3, karten: [
        { titel: 'Élève', text: ['J’ai mal à la tête / au ventre …', 'Je suis tombé(e).', 'Je suis fatigué(e).', 'Aïe, ça fait mal !'] },
        { titel: 'Infirmier / Infirmière', text: ['Qu’est-ce qui ne va pas ?', 'Où est-ce que tu as mal ?', 'Tu dois te reposer.', 'Va chez le médecin.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'avoir mal à', punkte: ['J’ai mal **au** genou · **au** ventre · **au** dos', 'J’ai mal **à la** tête · **à la** main · **à la** gorge', 'J’ai mal **à l’**épaule · **à l’**oreille', 'J’ai mal **aux** dents · **aux** pieds', 'Où est-ce que tu as mal ?'] },
         { titel: 'Les parties du corps', punkte: ['la tête · les yeux · les oreilles · le nez · la bouche · les dents', 'le cou · la gorge · l’épaule · le bras · la main · le doigt', 'le dos · le ventre · la jambe · le genou · le pied'] }],
        [{ art: 'tipp', titel: 'Expressions avec le corps', text: '**avoir un poil dans la main** = être paresseux · **coûter les yeux de la tête** = coûter très cher · **casser les pieds** à quelqu’un = l’énerver' },
         { art: 'achtung', titel: 'Urgence', text: 'Accident grave : appelle le **112**. Tu ne vas pas bien et tu veux parler à quelqu’un ? **116 111** (gratuit et anonyme).' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec au, à la, à l’ ou aux.', stufe: 1, saetze: ['J’ai mal [à la] tête.', 'Il a mal [au] dos.', 'Elle a mal [aux] dents.', 'Tu as mal [à l’] épaule ?', 'J’ai mal [au] ventre.'] },
      { art: 'luecken', auftrag: 'Quelle expression ? Complète.', stufe: 2, woerter: ['un poil dans la main', 'les yeux de la tête', 'les pieds'], saetze: ['Ces baskets coûtent [les yeux de la tête] !', 'Il ne fait jamais ses devoirs : il a [un poil dans la main] !', 'Arrête de me casser [les pieds] !'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Tu es malade (pour de faux !). Écris un message à ton entraîneur ou à ton entraîneuse : tu ne viens pas à l’entraînement.', stufe: 2,
        anfaenge: ['Bonjour …,', 'Je suis désolé(e), mais …', 'J’ai mal …', 'Je dois …', 'À la semaine prochaine !'], zeilen: 8,
        beispiel: 'Bonjour Monsieur Laurent, je suis désolé, mais je ne viens pas à l’entraînement ce soir. J’ai mal à la gorge et j’ai de la fièvre. Je dois rester au lit. À la semaine prochaine ! Noah' },
    ],
    check: ['Je nomme les parties du corps.', 'Je dis où j’ai mal.', 'Je comprends des conseils de santé.', 'Je connais des expressions avec le corps.', 'J’écris un message d’excuse.'],
  },
  // ================================================================ 4
  {
    thema: 'Les habitudes · devoir · les quantités', titel: 'Bien dans ma peau', untertitel: 'Sommeil, sport, écrans : tu lis un sondage et un graphique, tu écoutes des conseils et tu fais ton plan bien-être.',
    ziel: { fr: 'Je parle d’habitudes de santé et je donne des conseils.', de: 'Ich spreche über Gesundheitsgewohnheiten und gebe Ratschläge.' },
    bild: ['tom:muede:handy', 'nele:froh:erklaeren'],
    start: {
      was: 'Bon pour la santé ?',
      aufgaben: [
        { art: 'rf', auftrag: 'Bon pour la santé ? Coche.', stufe: 1, spalten: ['oui', 'non'], saetze: [['dormir neuf heures', true], ['jouer sur le portable toute la nuit', false], ['boire de l’eau', true], ['faire du sport', true], ['ne jamais faire de pause', false]] },
      ],
    },
    lesen: {
      was: 'Un sondage et un conseil', art: 'dokumente',
      quelle: 'Journal de l’école (sondage imaginaire)', titel: 'Nos habitudes',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Sondage de la classe 7P2** – 22 élèves', text: ['**Le sommeil :** 9 élèves dorment assez, 13 élèves ne dorment pas assez.', '**Le sport :** 15 élèves font du sport une fois par semaine ou plus.', '**Les écrans :** 5 élèves passent plus de trois heures par jour devant un écran.', '**L’eau :** beaucoup d’élèves boivent peu d’eau à l’école.'] },
        { stil: 'nachricht', stimme: 'w2', kopf: 'Le conseil de la semaine', text: ['**Avant de** dormir, éteins ton portable : la lumière de l’écran réveille ton cerveau. **Après** l’école, bouge un peu : une demi-heure de vélo ou de marche, c’est super ! Et n’oublie pas ta bouteille d’eau.'] },
      ],
      woerter: [['le sondage', 'die Umfrage'], ['l’habitude', 'die Gewohnheit'], ['le sommeil', 'der Schlaf'], ['dormir', 'schlafen'], ['passer du temps', 'Zeit verbringen'], ['l’écran', 'der Bildschirm'], ['éteindre', 'ausschalten'], ['le cerveau', 'das Gehirn']],
      aufgaben: [
        { art: 'frei', auftrag: 'Regarde le graphique du sondage.', stufe: 1, html: balken('Combien de temps par jour devant un écran ? (22 élèves)', [['moins d’1 heure', 3], ['1 à 2 heures', 8], ['2 à 3 heures', 6], ['plus de 3 heures', 5]], 'élèves') },
        { art: 'fragen', auftrag: 'Lis le sondage, le graphique et le conseil. Réponds.', stufe: 2, fragen: [{ f: 'Combien d’élèves passent 1 à 2 heures par jour devant un écran ?', l: '8 élèves' }, { f: 'Combien d’élèves ne dorment pas assez ?', l: '13 élèves' }, { f: 'Qu’est-ce qu’il faut faire avant de dormir ?', l: 'éteindre son portable' }] },
      ],
    },
    hoeren: {
      was: 'Des conseils', wo: 'Dans la cour · le matin', titel: 'Tu dois dormir plus !',
      situation: 'Le matin, Tom est très fatigué. Il parle avec son amie Inès.',
      bild: ['tom:muede', 'nele:froh:erklaeren'], sprecher: { Inès: 'w3', Tom: 'm3' },
      text: [
        ['Inès', 'Salut Tom ! Ça va ? Tu as l’air fatigué.'],
        ['Tom', 'Je suis super fatigué. Hier, je me suis couché à minuit.'],
        ['Inès', 'À minuit ? Pourquoi ?'],
        ['Tom', 'Je joue en ligne avec mes copains. Après le dîner, je joue deux ou trois heures.'],
        ['Inès', 'C’est trop ! Tu dois dormir plus. Il faut environ neuf heures de sommeil.'],
        ['Tom', 'Oui, je sais… Mais c’est difficile d’arrêter.'],
        ['Inès', 'Moi, avant de dormir, je laisse mon portable dans la cuisine. Et je lis un peu.'],
        ['Tom', 'Dans la cuisine ? Bonne idée… Et le matin, je n’ai pas faim. Je ne mange rien.'],
        ['Inès', 'Il faut prendre un petit-déjeuner ! Un fruit, du pain… Et après l’école, viens au basket avec moi. Ça fait du bien !'],
        ['Tom', 'D’accord. Je vais essayer.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour bien dormir, il faut … Coche.', stufe: 1, fragen: [{ f: '', o: ['éteindre les écrans', 'boire un café le soir', 'se coucher à la même heure'], r: [0, 2] }] }],
      beim: [
        { art: 'rf', auftrag: 'Écoute. Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['Tom s’est couché à minuit.', true], ['Il joue en ligne avec ses copains.', true], ['Inès laisse son portable dans sa chambre.', false], ['Le matin, Tom mange beaucoup.', false], ['Inès invite Tom au basket.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Donnez des conseils à un ou une camarade qui est toujours fatigué(e).', stufe: 3, karten: [
        { titel: 'Le problème', text: ['Je suis toujours fatigué(e).', 'Je joue tard le soir.', 'Je ne bouge pas beaucoup.'] },
        { titel: 'Les conseils', text: ['Tu dois …', 'Il faut …', 'Avant de dormir, …', 'Après l’école, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les quantités', punkte: ['Il **ne** dort **pas assez**.', 'Il boit **peu d’**eau.', 'Elle fait **assez de** sport.', 'Tu manges **beaucoup de** fruits.', 'Il passe **trop de** temps devant l’écran.'] },
         { titel: 'devoir et il faut', punkte: ['je **dois** · tu **dois** · il / elle **doit**', 'nous **devons** · vous **devez**', 'ils / elles **doivent**', 'Tu **dois** dormir plus. (+ infinitif)', '**Il faut** boire de l’eau. (pour tout le monde)'] }],
        [{ art: 'tipp', titel: 'avant de · après', text: '**Avant de** dormir, j’éteins mon portable. (+ infinitif) · **Après** l’école, je fais du vélo. (+ nom)' },
         { art: 'achtung', titel: 'beaucoup de, trop de …', text: 'Après une quantité : toujours **de** / **d’** : beaucoup **de** sport, peu **d’**eau, trop **de** temps.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec la bonne quantité.', stufe: 1, woerter: ['pas assez', 'peu d’', 'beaucoup de', 'trop de', 'assez'], saetze: ['Tom dort cinq heures : il ne dort [pas assez].', 'Amira boit un verre par jour : elle boit [peu d’] eau.', 'Luca fait de l’escalade et du vélo : il fait [beaucoup de] sport.', 'Ben joue six heures par jour : il passe [trop de] temps devant l’écran.', 'Inès dort neuf heures : elle dort [assez].'] },
      { art: 'luecken', auftrag: 'Conjugue devoir.', stufe: 1, saetze: ['Je [dois] faire mes devoirs.', 'Tu [dois] dormir plus.', 'Il [doit] se reposer.', 'Nous [devons] partir.', 'Vous [devez] boire de l’eau.'] },
      { art: 'luecken', auftrag: 'Complète avec avant de ou après.', stufe: 2, saetze: ['[Avant de] manger, je me lave les mains.', '[Après] le sport, je bois de l’eau.', '[Avant de] dormir, je lis un peu.', '[Après] l’école, je fais une pause.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un plan bien-être : cinq conseils pour toi ou pour une personne imaginaire.', stufe: 2,
        anfaenge: ['Il faut …', 'Je dois …', 'Avant de dormir, …', 'Après l’école, …', 'Je vais essayer de …'], zeilen: 9,
        beispiel: 'Il faut boire de l’eau. Je dois me coucher à neuf heures et demie. Avant de dormir, je laisse mon portable dans la cuisine. Après l’école, je fais du vélo. Je vais essayer de manger un fruit le matin.' },
    ],
    check: ['Je comprends un sondage et un graphique simples.', 'Je parle d’habitudes de santé.', 'J’utilise peu de, assez de, beaucoup de, trop de.', 'Je donne des conseils avec devoir et il faut.', 'J’utilise avant de et après.'],
  },
  // ================================================================ 5
  {
    thema: 'La routine · les verbes pronominaux', titel: 'Debout !', untertitel: 'Se réveiller, se lever, s’habiller : tu lis l’histoire d’un matin difficile, tu écoutes un réveil en classe verte et tu racontes une routine.',
    ziel: { fr: 'Je raconte une routine avec des verbes pronominaux.', de: 'Ich erzähle einen Tagesablauf mit reflexiven Verben.' },
    bild: ['finn:muede:stehen', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Les verbes du matin',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['se réveiller', 'se lever', 'se laver', 's’habiller', 'se brosser les dents', 'se coucher'], rechts: ['aufwachen', 'aufstehen', 'sich waschen', 'sich anziehen', 'sich die Zähne putzen', 'ins Bett gehen'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Une histoire courte', art: 'text', stimme: 'm1', nummern: true,
      quelle: 'Histoire courte (personnage imaginaire)', titel: 'Le matin de Luca',
      absaetze: [
        'Le réveil sonne à six heures et demie. Luca **se réveille**, mais il **ne se lève pas**. Il est trop fatigué. « Encore cinq minutes… », pense-t-il.',
        'À sept heures, Luca ouvre les yeux. Oh non ! Il est en retard ! Il **se lève** très vite. Il **se lave** en deux minutes et il **s’habille**. Mais il met son pull à l’envers !',
        'D’abord, il cherche son sac. Ensuite, il boit un verre de jus dans la cuisine. Il n’a pas le temps de **se brosser les dents**… alors il mâche un chewing-gum.',
        'À sept heures vingt, il court à l’arrêt de bus. Le bus part… sans lui ! Luca **s’assoit** sur le banc et soupire.',
        'Ce soir, il **se couche** à neuf heures. Et demain, il **se lève** à la première sonnerie. Promis !',
      ],
      woerter: [['le réveil', 'der Wecker'], ['sonner', 'klingeln'], ['en retard', 'zu spät'], ['à l’envers', 'verkehrt herum'], ['d’abord, ensuite', 'zuerst, dann'], ['le temps', 'die Zeit'], ['s’asseoir', 'sich setzen'], ['soupirer', 'seufzen']],
      aufgaben: [
        { art: 'personen', auftrag: 'Quelle image va avec quelle phrase ? Écris la lettre.', stufe: 1, bilder: ['finn:muede:sitzen', 'finn:froh:tasse', 'finn:nervoes:gehen', 'finn:traurig:sitzen'], saetze: [['Luca court à l’arrêt de bus.', 'C'], ['Luca est fatigué. Il ne se lève pas.', 'A'], ['Luca s’assoit sur le banc. Le bus est parti.', 'D'], ['Luca boit un verre de jus.', 'B']] },
        { art: 'ordnen', auftrag: 'Mets l’histoire dans l’ordre.', stufe: 2, teile: ['Le réveil sonne.', 'Luca se lève très vite.', 'Il s’habille.', 'Il boit un verre de jus.', 'Il court à l’arrêt de bus.', 'Il s’assoit sur le banc.'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    hoeren: {
      was: 'Le réveil en classe verte', wo: 'Classe verte · chambre des garçons · 7 heures', titel: 'Debout, tout le monde !',
      situation: 'La classe est en classe verte dans les Ardennes. À sept heures, le professeur de sport, M. Laurent, réveille les garçons de la chambre 4.',
      bild: ['lehrer:froh:erklaeren', 'tom:muede'], sprecher: { 'M. Laurent': 'm2', Tom: 'm3', Sami: 'm1' },
      text: [
        ['M. Laurent', 'Bonjour, les garçons ! Debout ! Il est sept heures !'],
        ['Tom', 'Encore cinq minutes, s’il vous plaît…'],
        ['M. Laurent', 'Non, Tom ! Tu te lèves maintenant. Le petit-déjeuner est à sept heures et demie.'],
        ['Sami', 'Je me lève ! Je vais à la salle de bains en premier.'],
        ['M. Laurent', 'D’accord. D’abord, vous vous lavez. Ensuite, vous vous habillez. Et n’oubliez pas : vous vous brossez les dents !'],
        ['Tom', 'On s’habille comment ? Il fait froid dehors ?'],
        ['M. Laurent', 'Oui, il fait froid. Mettez un pull et des chaussures de marche. Aujourd’hui, on fait une randonnée de dix kilomètres.'],
        ['Sami', 'Dix kilomètres ? Waouh !'],
        ['M. Laurent', 'Et ce soir, tout le monde se couche à neuf heures et demie !'],
      ],
      vor: [{ art: 'mc', auftrag: 'En classe verte, on … Coche.', stufe: 1, fragen: [{ f: '', o: ['dort avec sa classe', 'fait des activités dehors', 'reste à la maison'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète le programme.', stufe: 1, kopf: ['quand ?', 'activité'], breiten: [32, 68], zeilen: [['7 h 00', '[se réveiller, se lever]'], ['d’abord', '[se laver]'], ['ensuite', '[s’habiller : un pull, des chaussures de marche]'], ['7 h 30', '[le petit-déjeuner]'], ['aujourd’hui', '[une randonnée de 10 kilomètres]'], ['ce soir, 21 h 30', '[se coucher]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Mime une routine du matin. Les autres disent ce que tu fais.', stufe: 3, karten: [
        { titel: 'Deviner', text: ['Tu te réveilles !', 'Tu te brosses les dents !', 'Tu t’habilles !'] },
        { titel: 'Raconter', text: ['D’abord, je …', 'Ensuite, je …', 'Puis, je …', 'Enfin, je …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les verbes pronominaux', tabelle: { kopf: ['', 'se lever'], zeilen: [['je', '**me** lève'], ['tu', '**te** lèves'], ['il / elle / on', '**se** lève'], ['nous', '**nous** levons'], ['vous', '**vous** levez'], ['ils / elles', '**se** lèvent']] } },
         { titel: 'La routine', punkte: ['je **me** réveille · je **me** lave', 'je **m’**habille (voyelle : m’)', 'je **me** brosse les dents', 'je **me** couche', 'Négation : je **ne me** lève **pas**.'] }],
        [{ art: 'tipp', titel: 'Raconter dans l’ordre', text: '**D’abord**, … · **Ensuite**, … · **Puis**, … · **Après**, … · **Enfin**, …' },
         { art: 'achtung', titel: 's’asseoir', text: 'Assieds-toi ! · Asseyez-vous ! · Il **s’assoit** sur le banc.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec me, te, se, nous ou vous.', stufe: 1, saetze: ['Je [me] lève à sept heures.', 'Tu [te] laves les mains ?', 'Il [se] couche tard.', 'Nous [nous] habillons vite.', 'Vous [vous] brossez les dents ?'] },
      { art: 'luecken', auftrag: 'Conjugue le verbe.', stufe: 2, saetze: ['(se réveiller) Elle [se réveille] à six heures.', '(s’habiller) Je [m’habille] dans ma chambre.', '(se coucher) Ils [se couchent] à dix heures.', '(se lever) Tu [te lèves] tôt ?'] },
      { art: 'luecken', auftrag: 'Complète avec d’abord, ensuite ou enfin.', stufe: 1, saetze: ['[D’abord], je me réveille.', '[Ensuite], je me lave.', '[Enfin], je prends le bus.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Raconte une routine du matin (vraie ou imaginaire) avec d’abord, ensuite, puis et enfin.', stufe: 2,
        anfaenge: ['Le matin, je me réveille à …', 'D’abord, …', 'Ensuite, …', 'Puis, …', 'Enfin, …'], zeilen: 9,
        beispiel: 'Le matin, je me réveille à six heures et quart. D’abord, je me lève et je me lave. Ensuite, je m’habille et je prends mon petit-déjeuner. Puis, je me brosse les dents. Enfin, je prends le bus à sept heures dix.' },
    ],
    check: ['Je comprends une histoire courte.', 'J’utilise les verbes pronominaux.', 'Je comprends un programme à l’oral.', 'Je raconte dans l’ordre.', 'J’écris une routine.'],
  },
  // ================================================================ 6
  {
    thema: 'Les projets · le futur proche · les transports', titel: 'Vive les vacances !', untertitel: 'Camp, mer, montagne : tu lis des offres de vacances, tu écoutes des projets et tu dis ce que tu vas faire.',
    ziel: { fr: 'Je parle de projets de vacances avec le futur proche.', de: 'Ich spreche mit dem futur proche über Ferienpläne.' },
    bild: ['nele:froh:stehen', 'yusuf:froh:laessig'],
    start: {
      was: 'Les transports',
      aufgaben: [
        { art: 'symbole', auftrag: 'Comment on voyage ? Écris.', stufe: 1, woerter: ['en bus', 'en train', 'en avion', 'à vélo', 'en voiture', 'à pied', 'en bateau', 'à moto'], symbole: [['bus', 'en bus'], ['train', 'en train'], ['plane', 'en avion'], ['bike', 'à vélo'], ['car', 'en voiture'], ['walk', 'à pied'], ['ship', 'en bateau'], ['motorbike', 'à moto']] },
      ],
    },
    lesen: {
      was: 'Des offres de vacances et un message', art: 'dokumente',
      quelle: 'Dépliant de camps d’été et message sur le portable (imaginaires)', titel: 'Où partir cet été ?',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Camps d’été pour les 11–14 ans**', text: ['**Camp nature dans les Ardennes** · du 15 au 22 juillet. On dort sous la tente, on fait du kayak et des randonnées. Départ en bus de Luxembourg.', '**Stage de voile en Bretagne (France)** · du 1er au 8 août. On apprend à faire de la voile sur la mer. Voyage en train.', '**Semaine sport et jeux à Luxembourg-Ville** · du 18 au 22 août, de 9 h à 17 h. Foot, basket, escalade. Le soir, on rentre à la maison.'] },
        { stil: 'nachricht', stimme: 'w3', kopf: 'Message d’Inès à Léa', text: ['Coucou ! En août, je **vais aller** au Portugal en avion. Mais avant, je **vais faire** le camp nature dans les Ardennes ! Tu viens avec moi ? On **va dormir** sous la tente !'] },
      ],
      woerter: [['le camp', 'das Ferienlager'], ['la tente', 'das Zelt'], ['la randonnée', 'die Wanderung'], ['le stage de voile', 'der Segelkurs'], ['la mer', 'das Meer'], ['le départ', 'die Abfahrt'], ['rentrer', 'nach Hause gehen'], ['cet été', 'diesen Sommer']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète le tableau.', stufe: 1, kopf: ['camp', 'où ?', 'quand ?', 'transport'], breiten: [24, 27, 27, 22], zeilen: [['camp nature', '[dans les Ardennes]', '[du 15 au 22 juillet]', '[en bus]'], ['stage de voile', '[en Bretagne]', '[du 1er au 8 août]', '[en train]'], ['sport et jeux', '[à Luxembourg-Ville]', '[du 18 au 22 août]', '[on rentre le soir]']] },
        { art: 'mc', auftrag: 'Lis le message d’Inès et coche.', stufe: 2, fragen: [{ f: 'Inès va au Portugal …', o: ['en train', 'en avion', 'en voiture'], r: 1 }, { f: 'Avant, elle va …', o: ['au camp nature', 'au stage de voile'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Des projets', wo: 'Cour de l’école · dernier jour avant les vacances', titel: 'Qu’est-ce que tu vas faire cet été ?',
      situation: 'C’est le dernier jour avant les grandes vacances. Léa, Yusuf et Ben parlent de leurs projets.',
      bild: ['lea:froh:stehen', 'yusuf:froh'], sprecher: { Léa: 'w2', Yusuf: 'm3', Ben: 'm1' },
      text: [
        ['Léa', 'Enfin les vacances ! Yusuf, qu’est-ce que tu vas faire cet été ?'],
        ['Yusuf', 'Je vais aller en Turquie, chez mes grands-parents. On va partir en voiture. C’est très long : trois jours de voyage !'],
        ['Léa', 'Trois jours ? Waouh ! Et toi, Ben ?'],
        ['Ben', 'Moi, je reste au Luxembourg. Je vais faire la semaine sport et jeux. Et je vais aller à la piscine avec mes copains.'],
        ['Léa', 'C’est cool aussi ! Moi, je vais faire le camp nature dans les Ardennes avec Inès. On va dormir sous la tente et faire du kayak.'],
        ['Ben', 'Sous la tente ? Et s’il pleut ?'],
        ['Léa', 'Ce n’est pas grave. On va prendre des imperméables !'],
        ['Yusuf', 'Bonnes vacances à tous ! On s’envoie des photos !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour voyager loin, on prend souvent … Coche.', stufe: 1, fragen: [{ f: '', o: ['l’avion', 'le train', 'le vélo'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'Yusuf', 'Ben', 'Léa'], breiten: [16, 28, 28, 28], zeilen: [['où ?', '[en Turquie]', '[au Luxembourg]', '[dans les Ardennes]'], ['quoi ? comment ?', '[en voiture, trois jours de voyage]', '[semaine sport et jeux, piscine]', '[camp nature : tente, kayak]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Parle de tes projets pour les vacances ou pour le week-end (vrais ou imaginaires).', stufe: 3, karten: [
        { titel: 'Demander', text: ['Qu’est-ce que tu vas faire ?', 'Tu vas où ?', 'Tu vas partir comment ?'] },
        { titel: 'Répondre', text: ['Je vais aller en / au / à …', 'Je vais partir en train / en bus …', 'Je vais rester à la maison et …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Le futur proche', punkte: ['**aller** + infinitif', 'Je **vais partir** en train.', 'Tu **vas faire** du kayak ?', 'Nous **allons dormir** sous la tente.', 'Négation : je **ne vais pas** partir.'] },
         { titel: 'aller + pays et villes', punkte: ['**en** France, **en** Italie (pays féminins)', '**au** Portugal, **au** Japon (pays masculins)', '**aux** États-Unis, **aux** Pays-Bas', '**à** Paris, **à** Lisbonne (villes)', '**dans** les Ardennes, **dans** les Alpes'] }],
        [{ titel: 'Les transports', punkte: ['**en** bus · **en** train · **en** avion', '**en** voiture · **en** bateau', '**à** vélo · **à** pied'] },
         { art: 'tipp', titel: 'Parler du futur', text: 'demain · ce week-end · la semaine **prochaine** · cet été · l’année **prochaine**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec en, au, aux ou à.', stufe: 1, saetze: ['Je vais [en] Italie.', 'Il va [au] Portugal.', 'Nous allons [à] Paris.', 'Elle va [aux] États-Unis.', 'Tu vas [en] Espagne ?'] },
      { art: 'luecken', auftrag: 'Complète avec en ou à.', stufe: 1, saetze: ['Je vais à l’école [à] pied.', 'Nous partons [en] train.', 'Il va au club [à] vélo.', 'Elles voyagent [en] avion.'] },
      { art: 'abschreiben', auftrag: 'Écris au futur proche.', stufe: 2, kopf: ['présent', 'futur proche'], saetze: [['Je pars en vacances.', 'Je vais partir en vacances.'], ['Nous dormons sous la tente.', 'Nous allons dormir sous la tente.'], ['Il fait du kayak.', 'Il va faire du kayak.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un message : tes projets pour les vacances (vrais ou imaginaires).', stufe: 2,
        anfaenge: ['Cet été, je vais …', 'Je vais aller en / au / à …', 'Je vais partir le … en …', 'Là-bas, je vais …', 'Et toi ?'], zeilen: 9,
        beispiel: 'Cet été, je vais rester au Luxembourg. En juillet, je vais aller au camp nature dans les Ardennes. Je vais partir le 15 juillet en bus. Là-bas, je vais faire du kayak et dormir sous la tente. Et toi ?' },
    ],
    check: ['Je comprends des offres de vacances.', 'J’utilise le futur proche.', 'J’utilise en, au, aux, à avec les pays et les villes.', 'Je dis comment je voyage.', 'J’écris mes projets.'],
  },
  // ================================================================ 7
  {
    thema: 'Situer · qui et où · le, la, les', titel: 'Au camping', untertitel: 'Devant la tente, près de la rivière : tu lis la description d’un camping, tu complètes un plan et tu retrouves des affaires.',
    ziel: { fr: 'Je décris un lieu et je dis où sont les choses.', de: 'Ich beschreibe einen Ort und sage, wo die Dinge sind.' },
    bild: ['lea:froh:stehen-zeigen', 'chloe:verwirrt:stehen'],
    start: {
      was: 'Où est le ballon ?',
      aufgaben: [
        { art: 'frei', auftrag: 'Où est le ballon ? Écris : sur, sous, dans, devant, derrière, à côté de.', stufe: 1, html: praepositionen() },
      ],
    },
    lesen: {
      was: 'La description d’un camping', art: 'dokumente',
      quelle: 'Dépliant d’un camping (imaginaire)', titel: 'Bienvenue au camping !',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Camping Les Trois Sapins**', text: ['Notre camping est un endroit **où** on se repose, au bord de la Sûre, **près du** village.', 'L’accueil est à l’entrée, **à côté du** parking. La piscine est **entre** l’accueil et le restaurant.', '**Derrière** la piscine, il y a le terrain de jeux.', 'Les tentes sont **près de** la rivière, **loin de** la route. Les douches sont **à côté des** tentes, juste **derrière** le terrain de jeux.'] },
      ],
      woerter: [['l’endroit', 'der Ort'], ['au bord de', 'am Ufer von'], ['l’accueil', 'die Rezeption'], ['l’entrée', 'der Eingang'], ['entre', 'zwischen'], ['derrière', 'hinter'], ['près de, loin de', 'nah bei, weit weg von'], ['la douche', 'die Dusche']],
      aufgaben: [
        { art: 'frei', auftrag: 'Lis le texte. Qu’est-ce que c’est : A, B, C, D, E, F ? Écris.', stufe: 2, html: campingPlan() },
      ],
    },
    hoeren: {
      was: 'Des affaires perdues', wo: 'Camping · devant la tente · le soir', titel: 'Tu la vois ?',
      situation: 'Le soir, au camping. Léa et Chloé cherchent les affaires de Léa.',
      bild: ['lea:verwirrt', 'chloe:froh'], sprecher: { Léa: 'w2', Chloé: 'w3' },
      text: [
        ['Léa', 'Chloé, tu vois ma lampe de poche ? Je la cherche partout !'],
        ['Chloé', 'Elle n’est pas dans ton sac ?'],
        ['Léa', 'Non… Et elle n’est pas sous mon sac de couchage.'],
        ['Chloé', 'Attends… Ah, je la vois ! Elle est sur la table, devant la tente, à côté des assiettes.'],
        ['Léa', 'Super, merci ! Et mes chaussures de marche ? Tu les vois ?'],
        ['Chloé', 'Tes chaussures ? Elles sont derrière la tente. Il pleut un peu, prends-les !'],
        ['Léa', 'Oh non, elles sont mouillées ! Et mon livre ? Je le mets où ?'],
        ['Chloé', 'Mets-le dans la tente, entre nos sacs.'],
        ['Léa', 'D’accord. Bon, on va aux douches ? Elles sont près de la rivière.'],
        ['Chloé', 'Oui, on y va !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Au camping, on dort … Coche.', stufe: 1, fragen: [{ f: '', o: ['sous la tente', 'dans un sac de couchage', 'dans une salle de classe'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute. Où sont les affaires de Léa ?', stufe: 1, kopf: ['objet', 'où ?'], breiten: [32, 68], zeilen: [['la lampe de poche', '[sur la table, devant la tente, à côté des assiettes]'], ['les chaussures de marche', '[derrière la tente]'], ['le livre', '[dans la tente, entre les sacs]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jeu : cache un objet dans la classe. Ton ou ta partenaire pose des questions pour le trouver.', stufe: 3, karten: [
        { titel: 'Chercher', text: ['Il est sous la table ?', 'Elle est dans le sac ?', 'Tu le / la vois ?'] },
        { titel: 'Répondre', text: ['Non, il n’est pas …', 'Tu chauffes ! · Tu refroidis !', 'Oui, il est derrière …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Où ? Les prépositions', punkte: ['**sur** · **sous** · **dans** la tente', '**devant** · **derrière** la tente', '**entre** l’accueil **et** le restaurant', '**à côté du** parking · **près de** la rivière · **loin de** la route', 'de + le = **du** · de + les = **des**'] },
         { titel: 'le, la, les', punkte: ['Tu vois **ma lampe** ? – Oui, je **la** vois.', 'Tu prends **le livre** ? – Oui, je **le** prends.', 'Tu vois **mes chaussures** ? – Je **les** vois.', 'Devant une voyelle : je **l’**aime.', 'Impératif : prends-**les** ! · mets-**le** !'] }],
        [{ art: 'tipp', titel: 'qui et où', text: 'C’est un camping **qui** est près de la rivière. (qui = sujet) · C’est l’endroit **où** on mange. (où = lieu)' },
         { art: 'achtung', titel: 'La place du pronom', text: 'Le pronom vient **avant** le verbe : je **la** vois. · Je ne **la** vois pas.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Réponds avec le, la, l’ ou les.', stufe: 1, saetze: ['Tu vois la piscine ? – Oui, je [la] vois.', 'Tu prends le bus ? – Oui, je [le] prends.', 'Tu cherches tes clés ? – Oui, je [les] cherche.', 'Tu aimes le camping ? – Oui, je [l’] aime.'] },
      { art: 'luecken', auftrag: 'Complète avec qui ou où.', stufe: 2, saetze: ['C’est une rivière [qui] traverse le village.', 'C’est le restaurant [où] on mange.', 'C’est une fille [qui] aime le kayak.', 'C’est la tente [où] je dors.'] },
      { art: 'luecken', auftrag: 'Regarde le plan du camping. Complète.', stufe: 2, saetze: ['La piscine est [entre] l’accueil et le restaurant.', 'Le parking est [à côté de] l’accueil.', 'Les tentes sont [près de] la rivière.', 'Le terrain de jeux est [derrière] la piscine.'] },
    ],
    schreiben: [
      { art: 'frei', auftrag: 'Dessine le plan d’une chambre de rêve.', stufe: 1, html: zeichenfeld('Mets un lit, un bureau, une étagère et une fenêtre.', 66) },
      { art: 'schreiben', auftrag: 'Décris cette chambre de rêve avec des prépositions.', stufe: 2,
        anfaenge: ['Dans ma chambre de rêve, il y a …', 'Le lit est …', 'Devant la fenêtre, …', 'À côté du bureau, …', 'C’est un endroit où …'], zeilen: 8,
        beispiel: 'Dans ma chambre de rêve, il y a un grand lit et un bureau. Le lit est sous la fenêtre. Devant le bureau, il y a une chaise rouge. À côté du lit, il y a une étagère avec des livres. C’est un endroit où je lis et je me repose.' },
    ],
    check: ['Je comprends la description d’un lieu.', 'Je dis où sont les choses.', 'J’utilise le, la, les pour ne pas répéter.', 'J’utilise qui et où.', 'Je décris un lieu.'],
  },
  // ================================================================ 8
  {
    thema: 'Raconter au passé · le passé composé', titel: 'Qu’est-ce que tu as fait ?', untertitel: 'Hier, la semaine dernière, pendant les vacances : tu reconnais le passé, tu comprends des récits et tu écris une carte postale au passé composé.',
    ziel: { fr: 'Je comprends et je raconte des événements passés.', de: 'Ich verstehe und erzähle, was passiert ist.' },
    bild: ['amira:froh:stehen-zeigen', 'sami:froh:stehen'],
    start: {
      was: 'Présent ou passé ?',
      aufgaben: [
        { art: 'rf', auftrag: 'Présent ou passé ? Coche.', stufe: 1, spalten: ['présent', 'passé'], saetze: [['Je mange une glace.', true], ['J’ai mangé une glace.', false], ['Nous allons à la plage.', true], ['Nous sommes allés à la plage.', false], ['Il a pris le train.', false], ['Il prend le train.', true]] },
      ],
    },
    lesen: {
      was: 'Deux cartes postales', art: 'dokumente',
      quelle: 'Cartes postales (personnes imaginaires)', titel: 'Nouvelles de vacances',
      dokumente: [
        { stil: 'nachricht', stimme: 'w2', kopf: 'Carte de Léa – au camp, le 18 juillet', text: ['Coucou Ben ! Je **suis** au camp nature dans les Ardennes. Il **fait** beau. Aujourd’hui, nous **faisons** du kayak sur la rivière. Le soir, nous **chantons** autour du feu. C’est super ! Bisous, Léa'] },
        { stil: 'nachricht', stimme: 'w3', kopf: 'Carte d’Amira – le 10 août', text: ['Salut la classe ! Je **suis rentrée** de Bretagne hier. La semaine dernière, j’**ai fait** un stage de voile. Le premier jour, je **suis tombée** dans l’eau ! Jeudi, nous **avons vu** des dauphins. Et vendredi, j’**ai mangé** des crêpes au caramel. C’était génial ! À bientôt, Amira'] },
      ],
      woerter: [['rentrer', 'zurückkommen'], ['hier', 'gestern'], ['la semaine dernière', 'letzte Woche'], ['tomber', 'fallen'], ['voir (j’ai vu)', 'sehen (ich habe gesehen)'], ['le dauphin', 'der Delfin'], ['autour du feu', 'um das Feuer'], ['c’était', 'es war']],
      aufgaben: [
        { art: 'wer', auftrag: 'Léa ou Amira ? Coche.', stufe: 1, personen: ['Léa', 'Amira'], saetze: [['Elle fait du kayak aujourd’hui.', 'Léa'], ['Elle est tombée dans l’eau.', 'Amira'], ['Elle a vu des dauphins.', 'Amira'], ['Elle chante autour du feu.', 'Léa'], ['Elle a mangé des crêpes.', 'Amira']] },
        { art: 'mc', auftrag: 'Quelle carte raconte des faits passés ? Coche.', stufe: 1, fragen: [{ f: '', o: ['la carte de Léa', 'la carte d’Amira'], r: 1 }] },
        { art: 'tabelle', auftrag: 'Trouve les verbes au passé composé dans la carte d’Amira.', stufe: 2, kopf: ['passé composé', 'infinitif'], breiten: [55, 45], zeilen: [['[je suis rentrée]', 'rentrer'], ['[j’ai fait]', 'faire'], ['[je suis tombée]', 'tomber'], ['[nous avons vu]', 'voir'], ['[j’ai mangé]', 'manger']] },
      ],
    },
    hoeren: {
      was: 'La rentrée', wo: 'Cour de l’école · premier jour', titel: 'Tu as passé de bonnes vacances ?',
      situation: 'C’est la rentrée. Sami et Amira racontent leurs vacances.',
      bild: ['sami:froh:erklaeren', 'amira:froh'], sprecher: { Sami: 'm3', Amira: 'w3' },
      text: [
        ['Sami', 'Salut Amira ! Tu as passé de bonnes vacances ?'],
        ['Amira', 'Oui, super ! J’ai fait un stage de voile en Bretagne. Je suis tombée dans l’eau le premier jour !'],
        ['Sami', 'Ha ha ! Et l’eau était froide ?'],
        ['Amira', 'Très froide ! Mais après, j’ai appris à faire de la voile. Et toi, qu’est-ce que tu as fait ?'],
        ['Sami', 'Moi, je suis resté au Luxembourg. J’ai joué au foot tous les jours. Et en août, je suis allé à Paris en train avec mon oncle.'],
        ['Amira', 'À Paris ? Qu’est-ce que vous avez visité ?'],
        ['Sami', 'Nous avons vu la tour Eiffel et nous avons mangé dans un petit restaurant. Le soir, nous avons pris un bateau sur la Seine.'],
        ['Amira', 'Génial ! Et maintenant… l’école recommence !'],
        ['Sami', 'Oui… Mais je suis content de te voir !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour parler du passé, on dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['hier', 'la semaine dernière', 'demain'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'Amira', 'Sami'], breiten: [24, 38, 38], zeilen: [['où ?', '[en Bretagne]', '[au Luxembourg et à Paris]'], ['qu’est-ce qu’il / elle a fait ?', '[un stage de voile ; elle est tombée dans l’eau]', '[du foot ; la tour Eiffel ; un bateau sur la Seine]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Amira est tombée dans l’eau le premier jour.', true], ['Sami est allé à Paris en avion.', false], ['Sami a pris un bateau sur la Seine.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Raconte un week-end ou des vacances (vrais ou imaginaires). Ton ou ta partenaire pose des questions.', stufe: 3, karten: [
        { titel: 'Demander', text: ['Qu’est-ce que tu as fait ?', 'Tu es allé(e) où ?', 'C’était comment ?'] },
        { titel: 'Raconter', text: ['J’ai joué / mangé / visité …', 'Je suis allé(e) à …', 'C’était génial / bien / nul.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Le passé composé avec avoir', punkte: ['**avoir** + participe passé', '-er → **-é** : j’ai mang**é**, tu as jou**é**', 'faire → j’ai **fait** · voir → j’ai **vu**', 'prendre → j’ai **pris** · lire → j’ai **lu**', 'apprendre → j’ai **appris**'] },
         { titel: 'Le passé composé avec être', punkte: ['aller → je **suis allé(e)**', 'aussi : venir, partir, arriver, rester, tomber, rentrer', 'Il est allé. · Elle est allé**e**.', 'Ils sont allé**s**. · Elles sont allé**es**.'] }],
        [{ titel: 'avoir et être', tabelle: { kopf: ['', 'avoir', 'être'], zeilen: [['je / j’', '**ai** joué', '**suis** allé(e)'], ['tu', '**as** joué', '**es** allé(e)'], ['il / elle', '**a** joué', '**est** allé(e)'], ['nous', '**avons** joué', '**sommes** allé(e)s'], ['vous', '**avez** joué', '**êtes** allé(e)s'], ['ils / elles', '**ont** joué', '**sont** allé(e)s']] } },
         { art: 'tipp', titel: 'Passé ou présent ?', text: 'Passé : **hier**, **la semaine dernière**, **l’été dernier**, **pendant les vacances**. Présent : **aujourd’hui**, **maintenant**. Négation : je **n’**ai **pas** mangé.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec ai, as, a, avons, avez ou ont.', stufe: 1, saetze: ['J’[ai] mangé une crêpe.', 'Tu [as] vu le film ?', 'Elle [a] fait du kayak.', 'Nous [avons] joué au foot.', 'Ils [ont] pris le train.'] },
      { art: 'luecken', auftrag: 'avoir ou être ? Complète.', stufe: 2, saetze: ['Je [suis] allé à Paris.', 'Nous [avons] visité un musée.', 'Elle [est] tombée dans l’eau.', 'Tu [es] resté à la maison ?', 'Ils [ont] mangé des glaces.'] },
      { art: 'abschreiben', auftrag: 'Écris au passé composé.', stufe: 2, kopf: ['présent', 'passé composé'], saetze: [['Je joue au basket.', 'J’ai joué au basket.'], ['Nous faisons du vélo.', 'Nous avons fait du vélo.'], ['Elle va à la plage.', 'Elle est allée à la plage.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris une carte postale au passé composé : un week-end ou des vacances (vrais ou imaginaires).', stufe: 2,
        anfaenge: ['Salut … !', 'Hier / La semaine dernière, je suis allé(e) …', 'J’ai vu …', 'J’ai mangé …', 'C’était …'], zeilen: 10,
        beispiel: 'Salut Tom ! La semaine dernière, je suis allée à Echternach avec ma classe. Nous avons fait une randonnée dans la forêt. J’ai vu des rochers énormes ! À midi, nous avons pique-niqué. C’était génial ! À bientôt, Inès' },
    ],
    check: ['Je reconnais si un texte parle du présent ou du passé.', 'Je comprends un récit au passé.', 'J’utilise le passé composé avec avoir.', 'J’utilise le passé composé avec être.', 'J’écris une carte postale au passé.'],
  },
]
