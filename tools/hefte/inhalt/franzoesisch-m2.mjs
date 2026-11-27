// Français · Module 2 « Moi et les autres » (Régime / Voie de préparation, A1.2) – cahier multimodal.
// D’après le « Programme FRANC 7P–5P » (CNES, 20/03/2019), Module 2 « Communiquer sur sa
// personne » : description physique, vêtements et couleurs, magasins et produits, nourriture et repas, salutations selon
// la personne (main, bise, tu/vous), mois, fêtes et saisons, météo, famille (aussi recomposée), nombres et prix ;
// adjectifs (masculin, féminin, pluriel), un peu / assez / très / trop, quantités, articles et partitifs, apprendre,
// partir, aller, pouvoir, vouloir, prendre, Qui… ? Pourquoi ?, j’aime / je préfère / je déteste, à / au / chez,
// pour + pronom tonique, on. Tous les textes sont originaux ; personnes, magasins et lieux de rencontre imaginaires.
// Famille : seulement des personnages inventés – on ne pose aucune question sur la famille de l’élève.

export const MODUL = {
  id: 'franzoesisch-m2', kuerzel: 'fr2', nr: 2, sprache: 'fr', niveau: 'A1.2', klasse: 'Voie de préparation',
  dateiname: 'Francais_Module-2',
  fach: { de: 'Französisch', fr: 'Français' },
  titel: { de: 'Ich und die anderen', fr: 'Moi et les autres' },
  untertitel: { fr: 'Décrire une personne, parler de vêtements, saluer, faire les courses, commander au café, parler de la météo, des fêtes et d’une famille – en huit unités.', de: 'Personen beschreiben, über Kleidung sprechen, begrüßen, einkaufen, im Café bestellen, über Wetter, Feste und eine Familie sprechen – in acht Einheiten.' },
  farben: { tief: '#127c74', mittel: '#8fd1c9', zart: '#ecf8f6', dunkel: '#0b4f4a' },
  deckbild: ['chloe:froh:stehen-zeigen', 'yusuf:froh:stehen', 'mia:froh:tasse'],
  blasen: [{ t: 'Ça va ?', x: 16, y: 112 }, { t: 'Bon appétit !', x: 118, y: 100 }, { t: 'Il fait beau !', x: 160, y: 150 }],
  themen: [
    { titel: { fr: 'Qui est-ce ?', de: 'Wer ist das?' }, icon: 'user', lektionen: 3 },
    { titel: { fr: 'Bon appétit !', de: 'Guten Appetit!' }, icon: 'tools-kitchen-2', lektionen: 3 },
    { titel: { fr: 'Au fil de l’année', de: 'Durch das Jahr' }, icon: 'calendar', lektionen: 2 },
  ],
  anleitung: [
    'Chaque leçon a cinq parties : **Lire**, **Écouter**, **La règle**, **S’entraîner** et **Écrire**. À la fin, il y a un **mini-bilan**.',
    'À côté de chaque texte, il y a un **code QR**. Scanne-le avec ton portable : tu entends le texte. Tu peux l’écouter plusieurs fois, aussi plus lentement.',
    'Les points montrent le niveau : ●○○ base · ●●○ moyen · ●●● plus. Commence par la base.',
    'Tu parles de toi seulement si tu veux. Tu peux toujours inventer une personne. Les familles du cahier sont des familles imaginaires.',
  ],
  // seulement pour la voix (Regex Python)
  aussprache: {
    '\\bMme\\b': 'Madame', '\\bM\\. ': 'Monsieur ', '\\b1,(\\d\\d) ?€': 'un euro \\1', '(\\d+),(\\d\\d) ?€': '\\1 euros \\2', '(\\d+) ?€': '\\1 euros', '(\\d+) ?%': '\\1 pour cent',
    '(\\d{1,2}) h (\\d\\d)': '\\1 heures \\2', '(\\d{1,2}) h\\b': '\\1 heures', '\\b1er\\b': 'premier',
  },
}

// ---------------------------------------------------------------- petits portraits (A–H) pour « Qui est-ce ? »
const HAUT = { a: '#f3d3b8', b: '#d9a77c', c: '#a86f4c', d: '#6e4630' }
const HAAR = { brun: '#5b3a21', blond: '#e8c25a', roux: '#c45f27', noir: '#24222a', gris: '#b4b4bb' }
const AUGEN = { bleus: '#3a7bd5', marron: '#6b4423', verts: '#3f9450' }
const Z = '#1f2430'
const portrait = ({ haar = 'kurz', farbe = 'brun', augen = 'marron', brille = false, haut = 'a', kleid = '#9db8e6', bart = false }) => {
  const h = HAAR[farbe], s = HAUT[haut], a = AUGEN[augen], st = `stroke="${Z}" stroke-width="1.4" stroke-linejoin="round"`
  const hinten = haar === 'lang' ? `<path d="M23 54 Q20 16 50 15 Q80 16 77 54 L81 100 Q50 108 19 100 Z" fill="${h}" ${st}/>`
    : haar === 'zopf' ? `<path d="M74 40 Q92 46 86 74 Q84 84 78 88 Q80 70 72 56 Z" fill="${h}" ${st}/>` : ''
  const oben = haar === 'locken'
    ? [[27, 50], [28, 38], [35, 28], [45, 23], [55, 23], [65, 28], [72, 38], [73, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${h}" ${st}/>`).join('')
    : `<path d="M27 56 Q22 21 50 21 Q78 21 73 56 Q71 37 50 35 Q30 37 27 56 Z" fill="${h}" ${st}/>`
  const auge = (x) => `<ellipse cx="${x}" cy="57" rx="5.6" ry="4.2" fill="#fff" stroke="${Z}" stroke-width="0.9"/><circle cx="${x}" cy="57" r="3.3" fill="${a}"/><circle cx="${x}" cy="57" r="1.3" fill="${Z}"/>`
  return `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${hinten}<path d="M13 120 Q13 93 50 91 Q87 93 87 120 Z" fill="${kleid}" ${st}/><path d="M43 76 L43 92 Q50 96 57 92 L57 76 Z" fill="${s}" ${st}/><ellipse cx="50" cy="57" rx="22" ry="25" fill="${s}" ${st}/>${oben}${auge(41)}${auge(59)}<path d="M35 49 Q41 46 46 49 M54 49 Q59 46 65 49" stroke="${Z}" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M50 61 Q48 66 51.5 67" stroke="${Z}" stroke-width="1.2" fill="none" stroke-linecap="round"/>${bart ? `<path d="M30 62 Q32 86 50 87 Q68 86 70 62 Q64 74 50 74 Q36 74 30 62 Z" fill="${h}" ${st}/>` : ''}<path d="M44 72 Q50 76 56 72" stroke="${Z}" stroke-width="1.7" fill="none" stroke-linecap="round"/>${brille ? `<g fill="none" stroke="${Z}" stroke-width="1.8"><circle cx="41" cy="57" r="7.6"/><circle cx="59" cy="57" r="7.6"/><path d="M48.6 56 Q50 54.5 51.4 56"/></g>` : ''}</svg>`
}
const portraits = (liste, start = 0, richtig = -1) => `<div style="display:grid;grid-template-columns:repeat(${liste.length},1fr);gap:4mm;margin:1mm 0 2mm">${liste
  .map((p, i) => `<div style="text-align:center"><div style="background:var(--f-zart);border-radius:3mm;padding:2mm 4mm 0;height:37mm;display:flex;align-items:flex-end;justify-content:center"><div style="width:29mm">${portrait(p)}</div></div><div style="display:flex;align-items:center;justify-content:center;gap:2mm;font-family:Lexend;font-weight:800;font-size:13pt;color:var(--f-tief);margin-top:1.5mm"><span class="kaestchen ${i === richtig ? 'x' : ''}"></span>${'ABCDEFGH'[start + i]}</div></div>`)
  .join('')}</div>`
const zeichenfeld = (text, hoehe = 62) => `<div style="font-size:12.6pt;line-height:1.5;margin-bottom:2.5mm">${text}</div><div style="border:0.6mm dashed var(--f);border-radius:3mm;height:${hoehe}mm"></div>`

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'La description physique', titel: 'Je te reconnais !', untertitel: 'Taille, cheveux, yeux, lunettes : tu comprends la description d’une personne et tu fais un portrait.',
    ziel: { fr: 'Je comprends et je fais la description physique d’une personne.', de: 'Ich verstehe eine Personenbeschreibung und mache selbst eine.' },
    bild: ['chloe:froh:handy', 'lina:froh:stehen'],
    start: {
      was: 'Les mots du portrait',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Les mots du portrait : relie.', stufe: 1, links: ['les cheveux', 'les yeux', 'grand / grande', 'petit / petite', 'les lunettes', 'la barbe'], rechts: ['die Haare', 'die Augen', 'groß', 'klein', 'die Brille', 'der Bart'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un courriel', art: 'dokumente',
      quelle: 'Courriel d’une correspondante (personnes imaginaires)', titel: 'Samedi, à la gare !',
      dokumente: [
        { stil: 'nachricht', stimme: 'w3', kopf: '**De :** Zoé · **À :** Emma · **Objet :** Samedi, à la gare !', text: ['Salut Emma ! Samedi, ma classe arrive à Luxembourg pour l’échange scolaire. Je suis super contente !', 'Pour me reconnaître à la gare : je suis **assez grande**, j’**ai les cheveux longs et roux** et **les yeux verts**. Je **porte des lunettes**.', 'Notre professeur, M. Girard, est **très grand**. Il **a une barbe** et **les cheveux gris**. Ma copine Lou est **petite** et elle **a les cheveux frisés**.', 'Et toi ? Tu es comment ? Envoie-moi ta description ! À samedi ! Zoé'] },
      ],
      woerter: [['reconnaître', 'erkennen'], ['assez', 'ziemlich'], ['les cheveux longs / courts', 'lange / kurze Haare'], ['roux', 'rot (Haare)'], ['les yeux verts', 'grüne Augen'], ['porter des lunettes', 'eine Brille tragen'], ['la barbe', 'der Bart'], ['frisé', 'lockig']],
      aufgaben: [
        { art: 'frei', auftrag: 'Lis le courriel. Qui est Zoé ? Coche.', stufe: 1, html: portraits([{ haar: 'kurz', farbe: 'roux', augen: 'verts', brille: true, kleid: '#f2b45a' }, { haar: 'lang', farbe: 'roux', augen: 'verts', kleid: '#9fd6a0' }, { haar: 'lang', farbe: 'roux', augen: 'verts', brille: true, kleid: '#b9a6e6' }, { haar: 'lang', farbe: 'noir', augen: 'marron', brille: true, haut: 'c', kleid: '#f29aa6' }], 0, 2) },
        { art: 'tabelle', auftrag: 'Complète le tableau.', stufe: 2, kopf: ['', 'Zoé', 'M. Girard', 'Lou'], breiten: [19, 27, 27, 27], zeilen: [['taille', '[assez grande]', '[très grand]', '[petite]'], ['cheveux', '[longs et roux]', '[gris]', '[frisés]'], ['autre', '[yeux verts, lunettes]', '[une barbe]', '—']] },
      ],
    },
    hoeren: {
      was: 'Au téléphone', wo: 'Gare de Luxembourg · au téléphone', titel: 'Tu es où ?',
      situation: 'Samedi, à la gare. Il y a beaucoup de monde. Emma cherche Zoé. Elle lui téléphone.',
      bild: ['lina:froh:handy', 'chloe:froh:handy'], sprecher: { Emma: 'w2', Zoé: 'w3' },
      text: [
        ['Emma', 'Allô, Zoé ? C’est Emma ! Tu es où ?'],
        ['Zoé', 'Salut Emma ! Je suis devant la boulangerie, avec ma classe.'],
        ['Emma', 'Il y a beaucoup de monde ! Tu portes quoi ?'],
        ['Zoé', 'Je porte un manteau vert et un bonnet. Et toi, tu es comment ?'],
        ['Emma', 'Moi, je suis petite. J’ai les cheveux courts et bruns. Je porte un pull jaune.'],
        ['Zoé', 'Un pull jaune… Attends… Tu as un sac à dos noir ?'],
        ['Emma', 'Oui !'],
        ['Zoé', 'Je te vois ! Je lève la main. Tu me vois ?'],
        ['Emma', 'Oui ! Une fille rousse avec des lunettes… C’est toi ! J’arrive !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour reconnaître une personne, on donne … Coche.', stufe: 1, fragen: [{ f: '', o: ['sa taille', 'la couleur de ses cheveux', 'ses vêtements', 'sa date de naissance'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'frei', auftrag: 'Écoute. Qui est Emma ? Coche.', stufe: 1, html: portraits([{ haar: 'kurz', farbe: 'blond', augen: 'bleus', kleid: '#f5d547' }, { haar: 'lang', farbe: 'brun', augen: 'marron', haut: 'b', kleid: '#f5d547' }, { haar: 'kurz', farbe: 'brun', augen: 'marron', haut: 'b', kleid: '#f5d547' }, { haar: 'kurz', farbe: 'brun', augen: 'marron', haut: 'b', kleid: '#5b8fd6' }], 4, 2) },
        { art: 'rf', auftrag: 'Écoute encore. Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Zoé est devant la boulangerie.', true], ['Zoé porte un manteau rouge.', false], ['Emma a un sac à dos noir.', true], ['Zoé lève la main.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jeu « Qui est-ce ? » : choisis une personne dessinée dans ce cahier. Décris-la. Les autres devinent.', stufe: 3, karten: [
        { titel: 'Décrire', text: ['Il / Elle est grand(e) / petit(e).', 'Il / Elle a les cheveux …', 'Il / Elle porte …'] },
        { titel: 'Deviner', text: ['C’est qui ?', 'Il / Elle a des lunettes ?', 'C’est … ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Décrire une personne', punkte: ['Il / Elle **est** grand(e), petit(e).', 'Il / Elle **a** les cheveux longs, courts, frisés.', 'Il / Elle **a** les yeux bleus, verts, marron.', 'Il / Elle **porte** des lunettes, un pull.', '**Qui** est-ce ? – **C’est** Zoé.'] },
         { titel: 'Masculin et féminin', tabelle: { kopf: ['il', 'elle'], zeilen: [['grand', 'grand**e**'], ['petit', 'petit**e**'], ['brun', 'brun**e**'], ['blond', 'blond**e**'], ['content', 'content**e**'], ['timide', 'timide']] } }],
        [{ art: 'tipp', titel: 'un peu, assez, très, trop', text: 'Il est **un peu** timide. · Elle est **assez** grande. · Il est **très** grand. · Le pull est **trop** petit.' },
         { art: 'achtung', titel: 'Avec respect !', text: 'On décrit une personne **gentiment**. On ne se moque **jamais** du physique de quelqu’un.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec la bonne forme.', stufe: 1, saetze: ['(grand) Zoé est assez [grande].', '(petit) Lou est [petite].', '(blond) Tom est [blond].', '(brun) Emma est [brune].', '(content) Elle est très [contente].'] },
      { art: 'luecken', auftrag: 'Complète avec est, a ou porte.', stufe: 1, saetze: ['Le professeur [est] très grand.', 'Il [a] une barbe.', 'Zoé [porte] des lunettes.', 'Elle [a] les yeux verts.', 'Emma [porte] un pull jaune.'] },
      { art: 'frei', auftrag: 'Lis et dessine la personne.', stufe: 2, html: zeichenfeld('Il est grand. Il a les cheveux courts et frisés. Il a une petite barbe. Il porte des lunettes rondes et un tee-shirt avec une étoile.', 80) },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Réponds à Zoé : écris ta description (ou la description d’une personne imaginaire).', stufe: 2,
        anfaenge: ['Salut Zoé !', 'Je suis …', 'J’ai les cheveux …', 'J’ai les yeux …', 'Samedi, je porte …', 'À samedi !'], zeilen: 8,
        beispiel: 'Salut Zoé ! Je suis assez grand. J’ai les cheveux courts et noirs. J’ai les yeux marron. Samedi, je porte une veste bleue et une casquette. À samedi ! Rui' },
    ],
    check: ['Je comprends une description physique.', 'Je décris une personne (taille, cheveux, yeux).', 'J’accorde les adjectifs (masculin, féminin).', 'J’utilise un peu, assez, très, trop.', 'Je décris avec respect.'],
  },
  // ================================================================ 2
  {
    thema: 'Les vêtements · les couleurs · les prix', titel: 'Qu’est-ce que tu portes ?', untertitel: 'Sweat, jean, baskets : tu lis une publicité, tu achètes un vêtement dans une boutique et tu décris une tenue.',
    ziel: { fr: 'Je nomme des vêtements et des couleurs et je comprends des prix.', de: 'Ich nenne Kleidung und Farben und verstehe Preise.' },
    bild: ['verkaeuferin:froh:erklaeren', 'yusuf:froh:stehen'],
    start: {
      was: 'Les vêtements',
      aufgaben: [
        { art: 'symbole', auftrag: 'Qu’est-ce que c’est ? Écris le mot.', stufe: 1, woerter: ['un tee-shirt', 'un maillot', 'une veste', 'une chaussure', 'une chaussette', 'une cravate', 'des lunettes', 'un parapluie'],
          symbole: [['shirt', 'un tee-shirt'], ['shirt-sport', 'un maillot'], ['jacket', 'une veste'], ['shoe', 'une chaussure'], ['sock', 'une chaussette'], ['tie', 'une cravate'], ['eyeglass', 'des lunettes'], ['umbrella', 'un parapluie']] },
      ],
    },
    lesen: {
      was: 'Une publicité et un message', art: 'dokumente',
      quelle: 'Publicité d’une boutique et message sur le portable (imaginaires)', titel: 'C’est les soldes !',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Boutique Arc-en-ciel** – Soldes d’hiver : jusqu’à 30 % de réduction !', text: ['Sweat à capuche, bleu ou gris : **25 €** (avant : 35 €)', 'Jean noir, tailles 36 à 44 : **39 €** · Baskets blanches : **49,90 €**', 'Veste d’hiver rouge : **79 €** · Bonnet : **15 €** · Écharpe : **12 €**', 'Du lundi au samedi, de 9 h à 19 h · 12, Grand-Rue, Dudelange'] },
        { stil: 'nachricht', stimme: 'w2', kopf: 'Message de Mia à Ben', text: ['Regarde la pub ! Le sweat bleu est super beau. J’aime aussi les baskets blanches, mais elles coûtent 49,90 €. C’est trop cher pour moi ! On va à la boutique samedi ?'] },
      ],
      woerter: [['les soldes', 'der Schlussverkauf'], ['le sweat à capuche', 'der Kapuzenpulli'], ['le jean', 'die Jeans'], ['les baskets', 'die Turnschuhe'], ['la veste, le bonnet', 'die Jacke, die Mütze'], ['l’écharpe', 'der Schal'], ['la taille', 'die Größe'], ['cher, chère', 'teuer']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète les prix.', stufe: 1, kopf: ['vêtement', 'prix'], breiten: [60, 40], zeilen: [['le sweat à capuche', '[25 €]'], ['le jean noir', '[39 €]'], ['les baskets blanches', '[49,90 €]'], ['la veste d’hiver', '[79 €]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Le sweat existe en bleu et en gris.', true], ['Avant les soldes, le sweat coûte 25 €.', false], ['La boutique est ouverte le dimanche.', false], ['Pour Mia, les baskets sont trop chères.', true]] },
      ],
    },
    hoeren: {
      was: 'Dans une boutique', wo: 'Boutique Arc-en-ciel · samedi', titel: 'Je peux l’essayer ?',
      situation: 'Samedi, Yusuf est dans la boutique. Il cherche un sweat. Il parle avec la vendeuse.',
      bild: ['verkaeuferin:froh:erklaeren', 'yusuf:froh'], sprecher: { Vendeuse: 'w1', Yusuf: 'm3' },
      text: [
        ['Vendeuse', 'Bonjour ! Je peux vous aider ?'],
        ['Yusuf', 'Bonjour, Madame. Je cherche un sweat à capuche.'],
        ['Vendeuse', 'Nous avons des sweats bleus et des sweats gris. Quelle couleur vous préférez ?'],
        ['Yusuf', 'Le bleu, s’il vous plaît. En taille M.'],
        ['Vendeuse', 'Voilà. Vous pouvez l’essayer. La cabine est là-bas.'],
        ['Yusuf', 'Hmm, il est un peu trop grand. Vous avez la taille S ?'],
        ['Vendeuse', 'Oui, voilà, en taille S.'],
        ['Yusuf', 'Parfait, il me va bien ! Il coûte combien ?'],
        ['Vendeuse', 'Avec les soldes, il coûte vingt-cinq euros.'],
        ['Yusuf', 'Et le bonnet noir, là ?'],
        ['Vendeuse', 'Quinze euros. Vingt-cinq plus quinze, ça fait quarante euros en tout.'],
        ['Yusuf', 'D’accord, je prends les deux. Merci !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Dans une boutique, la vendeuse dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['Je peux vous aider ?', 'Tu as quel âge ?', 'Vous cherchez quelque chose ?'], r: [0, 2] }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'Yusuf cherche …', o: ['un jean', 'un sweat à capuche', 'des baskets'], r: 1 }, { f: 'Il préfère la couleur …', o: ['grise', 'bleue'], r: 1 }, { f: 'La taille M est …', o: ['trop petite', 'un peu trop grande'], r: 1 }, { f: 'Yusuf paie …', o: ['15 €', '25 €', '40 €'], r: 2 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jouez à deux dans une boutique : un client ou une cliente et un vendeur ou une vendeuse.', stufe: 3, karten: [
        { titel: 'Client(e)', text: ['Je cherche …', 'Je peux l’essayer ?', 'Il est trop grand / petit.', 'Il coûte combien ?'] },
        { titel: 'Vendeur / Vendeuse', text: ['Je peux vous aider ?', 'Quelle taille ? Quelle couleur ?', 'La cabine est là-bas.', 'Ça fait … euros.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les couleurs : masculin, féminin, pluriel', tabelle: { kopf: ['masculin', 'féminin', 'pluriel'], zeilen: [['un pull vert', 'une veste vert**e**', 'des baskets vert**es**'], ['un pull noir', 'une veste noir**e**', 'des baskets noir**es**'], ['un pull bleu', 'une veste bleu**e**', 'des baskets bleu**es**'], ['un pull gris', 'une veste gris**e**', 'des baskets gris**es**'], ['un pull rouge', 'une veste rouge', 'des baskets rouge**s**']] } }],
        [{ titel: 'Les nombres de 70 à 100', punkte: ['70 soixante-dix · 71 soixante **et** onze', '75 soixante-quinze · 79 soixante-dix-neuf', '80 quatre-vingt**s** · 81 quatre-vingt-un', '90 quatre-vingt-dix · 99 quatre-vingt-dix-neuf', '100 cent', 'En Belgique et en Suisse : **septante** (70), **nonante** (90).'] },
         { art: 'tipp', titel: 'Demander le prix', text: 'Il coûte combien ? · Elle coûte combien ? · **Ça fait** combien ? · 25 **plus** 15, ça fait 40.' }],
        [{ art: 'achtung', titel: 'La place de la couleur', text: 'En français, la couleur vient **après** le nom : un pull **bleu**. (allemand : ein **blauer** Pulli)' },
         { art: 'tipp', titel: 'porter', text: 'Je **porte** un jean. · Tu **portes** un bonnet ? · Elle **porte** une veste rouge.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Accorde la couleur.', stufe: 1, saetze: ['(vert) une veste [verte]', '(noir) des chaussures [noires]', '(bleu) une casquette [bleue]', '(gris) des pulls [gris]', '(jaune) une écharpe [jaune]'] },
      { art: 'luecken', auftrag: 'Écris les prix en lettres.', stufe: 1, saetze: ['72 € = [soixante-douze] euros', '80 € = [quatre-vingts] euros', '95 € = [quatre-vingt-quinze] euros', '100 € = [cent] euros'] },
      { art: 'luecken', auftrag: 'Calcule. Écris le résultat en lettres.', stufe: 2, saetze: ['25 + 15 = [quarante]', '39 + 39 = [soixante-dix-huit]', '100 – 20 = [quatre-vingts]'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Tu vas à une fête. Décris ta tenue (vraie ou imaginaire).', stufe: 2,
        anfaenge: ['Pour la fête, je porte …', 'Mon pantalon est …', 'Mes chaussures sont …', 'J’adore …', 'Je ne porte pas de …'], zeilen: 8,
        beispiel: 'Pour la fête, je porte un jean noir et un sweat rouge. Mes baskets sont blanches. J’adore ma casquette verte. Je ne porte pas de veste.' },
    ],
    check: ['Je nomme des vêtements.', 'J’accorde les couleurs.', 'Je comprends des prix jusqu’à 100.', 'J’achète un vêtement dans une boutique.', 'Je décris une tenue.'],
  },
  // ================================================================ 3
  {
    thema: 'Saluer · demander comment ça va', titel: 'Ça va ?', untertitel: 'Bise, main ou « salut » ? Tu salues des jeunes et des adultes, tu demandes comment ça va – et tu réponds.',
    ziel: { fr: 'Je salue des personnes différentes et je demande comment elles vont.', de: 'Ich begrüße verschiedene Personen und frage, wie es ihnen geht.' },
    bild: ['ben:froh:stehen-zeigen', 'oma:froh:stehen'],
    start: {
      was: 'Comment ça va ?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Comment ça va ? Relie.', stufe: 1, links: ['Ça va très bien !', 'Ça va.', 'Pas très bien.', 'Je suis fatigué.', 'Je suis malade.'], rechts: ['Mir geht es sehr gut!', 'Gut. / Es geht mir gut.', 'Nicht so gut.', 'Ich bin müde.', 'Ich bin krank.'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Un article', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Magazine des jeunes · rubrique « Vivre ensemble »', titel: 'Bise, main ou « salut » ?',
      absaetze: [
        'Au Luxembourg, il y a des gens de beaucoup de pays. Alors, comment est-ce qu’**on** se dit bonjour ? Ça dépend des personnes !',
        'Entre **copains et copines**, on dit souvent « Salut ! » ou « Coucou ! ». Beaucoup de jeunes se font **la bise** sur les joues. D’autres préfèrent un **check** avec la main.',
        'Avec les **adultes**, on dit « Bonjour, Madame » ou « Bonjour, Monsieur ». On **se serre la main** et on **vouvoie** : « Comment allez-vous ? »',
        'Combien de bises ? Ça change selon le pays et la région : une, deux, trois … Au Luxembourg, on fait souvent **trois** bises.',
        'Et si tu n’aimes pas la bise ? Pas de problème ! Tu peux dire : « Je préfère te dire bonjour avec la main. » **Chacun choisit.**',
      ],
      woerter: [['se dire bonjour', 'sich begrüßen'], ['ça dépend', 'es kommt darauf an'], ['la bise', 'das Begrüßungsküsschen'], ['la joue', 'die Wange'], ['se serrer la main', 'sich die Hand geben'], ['vouvoyer', 'siezen'], ['selon', 'je nach'], ['chacun', 'jeder']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète le tableau.', stufe: 1, kopf: ['', 'avec des copains', 'avec des adultes'], breiten: [22, 39, 39], zeilen: [['on dit …', '[Salut ! Coucou !]', '[Bonjour, Madame / Monsieur]'], ['le geste', '[la bise ou un check]', '[on se serre la main]'], ['tu ou vous ?', '[tu]', '[vous]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Au Luxembourg, on fait souvent trois bises.', true], ['Avec les adultes, on dit « Salut ! ».', false], ['Il faut toujours faire la bise.', false], ['On peut dire bonjour avec la main.', true]] },
      ],
    },
    hoeren: {
      was: 'Trois rencontres', wo: 'Dans la rue · samedi matin', titel: 'Bonjour, comment allez-vous ?',
      situation: 'Samedi matin, Ben va au marché. Il rencontre son copain Sami, sa professeure et la grand-mère de son copain Noah.',
      bild: ['ben:froh:stehen-zeigen', 'oma:froh'], sprecher: { Ben: 'm3', Sami: 'm2', 'Mme Nouvelle': 'w1', 'Mme Pereira': 'w2' },
      text: [
        ['Ben', 'Salut Sami ! Ça va ?'],
        ['Sami', 'Salut Ben ! Ça va bien, et toi ?'],
        ['Ben', 'Bof, je suis un peu fatigué. Je joue trop aux jeux vidéo le soir !'],
        ['Sami', 'Moi aussi ! Tu viens au foot cet après-midi ?'],
        ['Ben', 'Oui ! À tout à l’heure !'],
        ['Ben', 'Oh ! Bonjour, Madame Nouvelle !'],
        ['Mme Nouvelle', 'Bonjour, Ben ! Comment vas-tu ?'],
        ['Ben', 'Très bien, merci. Et vous, comment allez-vous ?'],
        ['Mme Nouvelle', 'Ça va bien, merci. Bon week-end, Ben !'],
        ['Ben', 'Merci, à vous aussi. Au revoir, Madame !'],
        ['Ben', 'Bonjour, Madame Pereira !'],
        ['Mme Pereira', 'Bonjour, Ben ! Tu vas bien ?'],
        ['Ben', 'Oui, merci. Et vous ?'],
        ['Mme Pereira', 'Oh, pas très bien. J’ai mal au dos. Mais ce n’est pas grave.'],
        ['Ben', 'Oh, je suis désolé. Bon rétablissement, Madame !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Avec un adulte, on dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['Salut, ça va ?', 'Bonjour, comment allez-vous ?'], r: 1 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'Sami', 'Mme Nouvelle', 'Mme Pereira'], breiten: [28, 24, 24, 24], zeilen: [['Ça va ?', '[bien]', '[bien]', '[pas très bien]'], ['Ben dit tu ou vous ?', '[tu]', '[vous]', '[vous]']] },
        { art: 'mc', auftrag: 'Écoute encore et coche.', stufe: 2, fragen: [{ f: 'Ben est …', o: ['malade', 'un peu fatigué', 'très content'], r: 1 }, { f: 'Mme Pereira a mal …', o: ['à la tête', 'au dos', 'au ventre'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jouez des rencontres : avec un copain, une copine, une professeure, un voisin …', stufe: 3, karten: [
        { titel: 'Avec un copain, une copine', text: ['Salut ! Ça va ?', 'Ça va bien, et toi ?', 'Bof … / Super !', 'À plus ! · À tout à l’heure !'] },
        { titel: 'Avec un adulte', text: ['Bonjour, Madame / Monsieur.', 'Comment allez-vous ?', 'Très bien, merci. Et vous ?', 'Au revoir, bonne journée !'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Comment ça va ?', punkte: ['++ Ça va très bien ! · Super !', '+ Ça va bien. · Ça va.', '+/– Comme ci, comme ça. · Bof.', '– Ça ne va pas. · Pas très bien.', 'Je suis fatigué(e) / malade. · J’ai mal **à la** tête, **au** dos, **au** ventre.'] },
         { titel: 'aller et pouvoir', tabelle: { kopf: ['', 'aller', 'pouvoir'], zeilen: [['je', '**vais**', '**peux**'], ['tu', '**vas**', '**peux**'], ['il / elle / on', '**va**', '**peut**'], ['nous', '**allons**', '**pouvons**'], ['vous', '**allez**', '**pouvez**'], ['ils / elles', '**vont**', '**peuvent**']] } }],
        [{ art: 'tipp', titel: 'on', text: '**on** = les gens, nous. Au Luxembourg, **on** fait souvent trois bises. · **On** va au foot ?' },
         { art: 'achtung', titel: 'Pourquoi ? – Parce que …', text: '**Pourquoi** tu es fatigué ? – **Parce que** je joue trop le soir. · Devant une voyelle : **parce qu’**il …' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'tu ou vous ? Écris la phrase pour un adulte.', stufe: 1, kopf: ['à un copain (tu)', 'à un adulte (vous)'], saetze: [['Salut ! Ça va ?', 'Bonjour ! Comment allez-vous ?'], ['Comment vas-tu ?', 'Comment allez-vous ?'], ['Tu peux m’aider ?', 'Vous pouvez m’aider ?']] },
      { art: 'luecken', auftrag: 'Conjugue pouvoir.', stufe: 1, saetze: ['Je [peux] venir avec toi.', 'Tu [peux] répéter ?', 'On [peut] aller au parc.', 'Vous [pouvez] m’aider, Madame ?', 'Ils [peuvent] jouer au foot.'] },
      { art: 'fragen', auftrag: 'Pourquoi ? Réponds avec parce que.', stufe: 2, fragen: [{ f: 'Pourquoi Ben est fatigué ?', l: 'Parce qu’il joue trop aux jeux vidéo le soir.' }, { f: 'Pourquoi Mme Pereira ne va pas très bien ?', l: 'Parce qu’elle a mal au dos.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un petit dialogue : deux personnes se rencontrent (deux copains, ou un jeune et un adulte).', stufe: 2,
        anfaenge: ['A : Bonjour / Salut …', 'B : …', 'A : Comment … ?', 'B : …, et toi / et vous ?', 'A : Au revoir / À plus !'], zeilen: 9,
        beispiel: 'A : Bonjour, Monsieur Laurent ! B : Bonjour, Léa ! Comment vas-tu ? A : Très bien, merci. Et vous, comment allez-vous ? B : Ça va, merci. Bonne journée ! A : Merci, au revoir !' },
    ],
    check: ['Je salue un copain et un adulte.', 'Je demande comment ça va et je réponds.', 'Je connais des gestes pour dire bonjour.', 'Je conjugue aller et pouvoir.', 'J’utilise pourquoi et parce que.'],
  },
  // ================================================================ 4
  {
    thema: 'Les aliments · les repas · les goûts', titel: 'J’ai faim !', untertitel: 'Petit-déjeuner, déjeuner, goûter, dîner : tu parles des repas, tu composes un menu et tu dis ce que tu aimes manger.',
    ziel: { fr: 'Je nomme des aliments et je dis ce que j’aime manger.', de: 'Ich nenne Lebensmittel und sage, was ich gern esse.' },
    bild: ['amira:froh:tasse', 'noah:froh:stehen'],
    start: {
      was: 'Les aliments',
      aufgaben: [
        { art: 'symbole', auftrag: 'Qu’est-ce que c’est ? Écris le mot.', stufe: 1, woerter: ['une pomme', 'du pain', 'du lait', 'un œuf', 'du fromage', 'une carotte', 'du poisson', 'une glace'],
          symbole: [['apple', 'une pomme'], ['bread', 'du pain'], ['milk', 'du lait'], ['egg', 'un œuf'], ['cheese', 'du fromage'], ['carrot', 'une carotte'], ['fish', 'du poisson'], ['ice-cream', 'une glace']] },
      ],
    },
    lesen: {
      was: 'Trois messages', art: 'profile', stimme: 'w1',
      quelle: 'Blog de la classe 7P2 (personnes imaginaires)', titel: 'Qu’est-ce que tu manges ?',
      profile: [
        { name: 'Noah', bild: 'noah:froh:stehen', stimme: 'm3', text: 'Le matin, je **prends** un bol de céréales avec du lait. À midi, je **mange** à la cantine. J’**adore** les frites, mais je **déteste** les épinards !' },
        { name: 'Amira', bild: 'amira:froh:tasse', stimme: 'w3', text: 'Au petit-déjeuner, je **bois** un chocolat chaud et je **mange** du pain avec de la confiture. Le soir, on **dîne** à sept heures. Mon plat préféré, c’est le couscous.' },
        { name: 'Tom', bild: 'tom:froh:stehen', stimme: 'm1', text: 'Je n’ai pas faim le matin. Je **prends** juste un jus d’orange. À seize heures, je **prends** un goûter : une pomme et des biscuits. J’**aime** beaucoup les pâtes.' },
      ],
      woerter: [['le petit-déjeuner', 'das Frühstück'], ['le déjeuner', 'das Mittagessen'], ['le goûter', 'der Nachmittagsimbiss'], ['le dîner', 'das Abendessen'], ['le bol', 'die Schüssel'], ['la confiture', 'die Marmelade'], ['le plat préféré', 'das Lieblingsgericht'], ['avoir faim', 'Hunger haben']],
      aufgaben: [
        { art: 'wer', auftrag: 'Qui dit ça ? Coche.', stufe: 1, personen: ['Noah', 'Amira', 'Tom'], saetze: [['Je mange à la cantine.', 'Noah'], ['Je bois un chocolat chaud.', 'Amira'], ['Je n’ai pas faim le matin.', 'Tom'], ['J’adore les frites.', 'Noah'], ['Je prends un goûter.', 'Tom']] },
        { art: 'tabelle', auftrag: 'Qu’est-ce qu’ils prennent le matin ?', stufe: 2, kopf: ['', 'le matin, il / elle prend …'], breiten: [24, 76], zeilen: [['Noah', '[un bol de céréales avec du lait]'], ['Amira', '[un chocolat chaud, du pain avec de la confiture]'], ['Tom', '[juste un jus d’orange]']] },
      ],
    },
    hoeren: {
      was: 'À la cantine', wo: 'Cantine du lycée · à midi', titel: 'Qu’est-ce qu’on mange aujourd’hui ?',
      situation: 'À midi, Noah et Amira sont à la cantine. Le cuisinier présente le menu du jour. Ils choisissent leur repas.',
      bild: ['lehrer:froh:erklaeren', 'amira:froh'], sprecher: { Cuisinier: 'm2', Noah: 'm3', Amira: 'w3' },
      text: [
        ['Cuisinier', 'Bonjour ! Aujourd’hui, il y a du poulet avec des frites, ou des pâtes aux légumes.'],
        ['Noah', 'Du poulet avec des frites, s’il vous plaît !'],
        ['Cuisinier', 'Et comme entrée ? Une salade de carottes ou une soupe ?'],
        ['Noah', 'Une soupe, merci.'],
        ['Amira', 'Moi, je voudrais les pâtes aux légumes et une salade de carottes, s’il vous plaît. Je ne mange pas de poulet.'],
        ['Cuisinier', 'Pas de problème. Et comme dessert ? Il y a un yaourt ou une pomme.'],
        ['Amira', 'Une pomme, s’il vous plaît.'],
        ['Noah', 'Pour moi, un yaourt !'],
        ['Cuisinier', 'Voilà. Bon appétit !'],
      ],
      vor: [{ art: 'mc', auftrag: 'À la cantine, il y a souvent … Coche.', stufe: 1, fragen: [{ f: '', o: ['une entrée', 'un plat', 'un dessert', 'un film'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète les plateaux.', stufe: 1, kopf: ['', 'Noah', 'Amira'], breiten: [22, 39, 39], zeilen: [['entrée', '[une soupe]', '[une salade de carottes]'], ['plat', '[du poulet avec des frites]', '[des pâtes aux légumes]'], ['dessert', '[un yaourt]', '[une pomme]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Compose le menu de rêve de la cantine. Présente-le à ton ou ta partenaire.', stufe: 3, karten: [
        { titel: 'Mon menu', text: ['Comme entrée, il y a …', 'Comme plat, …', 'Comme dessert, …', 'Comme boisson, …'] },
        { titel: 'Réagir', text: ['Miam, j’adore !', 'Bof, je préfère …', 'Je ne mange pas de …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les repas', punkte: ['le **petit-déjeuner** (le matin)', 'le **déjeuner** (à midi)', 'le **goûter** (vers 16 heures)', 'le **dîner** (le soir)', 'comme **entrée** · comme **plat** · comme **dessert**'] },
         { titel: 'aimer, adorer, préférer, détester', punkte: ['J’**adore** les frites. (+ nom)', 'Je **préfère** le poisson.', 'Je **déteste** les épinards.', 'J’**aime** cuisiner. (+ infinitif)', 'Toujours avec l’article : **le** pain, **la** soupe, **les** pâtes'] }],
        [{ art: 'tipp', titel: 'Manger équilibré', text: '**Souvent** : fruits, légumes, pain, eau. **Parfois** : viande, poisson, œufs, fromage. **Rarement** : bonbons, chips, sodas.' },
         { art: 'achtung', titel: 'manger et boire', text: 'Je **mange** du pain. · Je **bois** du lait. (boire : je bois, tu bois, il / elle boit)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Classe les aliments : souvent, parfois ou rarement ?', stufe: 1, woerter: ['les pommes', 'les bonbons', 'le poisson', 'les carottes', 'les chips', 'le fromage'], saetze: ['On mange **souvent** : [les pommes], [les carottes]', 'On mange **parfois** : [le poisson], [le fromage]', 'On mange **rarement** : [les bonbons], [les chips]'] },
      { art: 'luecken', auftrag: 'Complète avec le, la, l’ ou les.', stufe: 1, saetze: ['J’adore [les] frites.', 'Je déteste [la] soupe.', 'Elle préfère [le] poisson.', 'Tu aimes [les] pâtes ?', 'Il adore [l’]eau gazeuse.'] },
      { art: 'luecken', auftrag: 'Quel repas ? Complète.', stufe: 2, saetze: ['Le matin, je prends le [petit-déjeuner].', 'À midi, c’est le [déjeuner].', 'Vers 16 heures, je prends un [goûter].', 'Le soir, c’est le [dîner].'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un message pour le blog de la classe : tes repas d’une journée (vrais ou imaginaires).', stufe: 2,
        anfaenge: ['Le matin, je prends …', 'À midi, je mange …', 'Comme goûter, …', 'Mon plat préféré, c’est …', 'Je déteste …'], zeilen: 8,
        beispiel: 'Le matin, je prends du pain avec du fromage et un verre de lait. À midi, je mange à la cantine. Comme goûter, je prends une banane. Mon plat préféré, c’est la pizza. Je déteste les champignons !' },
    ],
    check: ['Je nomme des aliments et des boissons.', 'Je connais les repas de la journée.', 'Je dis ce que j’aime et ce que je déteste.', 'Je compose un menu.', 'J’écris sur mes repas.'],
  },
  // ================================================================ 5
  {
    thema: 'Les magasins · les quantités · les prix', titel: 'Au marché', untertitel: 'Un kilo de pommes, une bouteille d’eau : tu lis une liste de courses, tu achètes au marché et tu comptes.',
    ziel: { fr: 'Je fais des courses : je demande des quantités et je comprends les prix.', de: 'Ich kaufe ein: Ich frage nach Mengen und verstehe Preise.' },
    bild: ['verkaeuferin:froh:stehen', 'mia:froh:stehen'],
    start: {
      was: 'Les magasins',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Où est-ce qu’on achète … ? Relie.', stufe: 1, links: ['du pain', 'de la viande', 'des médicaments', 'des fruits et des légumes', 'des gâteaux'], rechts: ['à la boulangerie', 'à la boucherie', 'à la pharmacie', 'au marché', 'à la pâtisserie'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Une liste, un message et des prix', art: 'dokumente',
      quelle: 'Documents de la classe 7P2 (imaginaires)', titel: 'Le pique-nique de la classe',
      dokumente: [
        { stil: 'nachricht', stimme: 'w1', kopf: 'Message de Mme Nouvelle', text: ['Bonjour à tous ! Vendredi, nous faisons un pique-nique. Mia et Ben font les courses au marché jeudi, à 10 h, avec moi. Le marché a lieu sur la place de l’Église. Notre budget : 30 €.'] },
        { stil: 'karte', stimme: 'w2', kopf: '**Liste de courses**', text: ['1 kilo de pommes · 500 grammes de raisin · 2 baguettes', '1 paquet de biscuits · 3 bouteilles d’eau · 1 bouteille de jus d’orange', '200 grammes de fromage · 1 boîte de thon'] },
        { stil: 'karte', stimme: 'm2', kopf: '**Stand de Tonio** – fruits, légumes, fromages', text: ['Pommes : 2,50 € le kilo · Raisin : 3 € le kilo', 'Carottes : 1,80 € le kilo · Fromage : 2 € les 100 grammes'] },
      ],
      woerter: [['les courses', 'der Einkauf'], ['le pique-nique', 'das Picknick'], ['le kilo', 'das Kilo'], ['le paquet', 'die Packung'], ['la bouteille', 'die Flasche'], ['la boîte', 'die Dose'], ['le raisin', 'die Weintrauben'], ['le stand', 'der Stand']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète la liste.', stufe: 1, kopf: ['quantité', 'produit'], breiten: [50, 50], zeilen: [['[1 kilo de]', 'pommes'], ['[2]', 'baguettes'], ['[3 bouteilles d’]', 'eau'], ['[200 grammes de]', 'fromage']] },
        { art: 'fragen', auftrag: 'Lis et réponds.', stufe: 2, fragen: [{ f: 'Le marché a lieu où ?', l: 'sur la place de l’Église' }, { f: 'Les pommes coûtent combien ?', l: '2,50 € le kilo' }, { f: 'Le budget du pique-nique, c’est combien ?', l: '30 €' }] },
      ],
    },
    hoeren: {
      was: 'Au marché', wo: 'Marché · place de l’Église', titel: 'Et avec ceci ?',
      situation: 'Jeudi, Mia et Ben font les courses pour le pique-nique de la classe. Ils sont au stand de Tonio.',
      bild: ['verkaeuferin:froh:erklaeren', 'ben:froh'], sprecher: { Tonio: 'm2', Mia: 'w2', Ben: 'm3' },
      text: [
        ['Tonio', 'Bonjour, les jeunes ! Qu’est-ce que je vous donne ?'],
        ['Mia', 'Bonjour ! Je voudrais un kilo de pommes, s’il vous plaît.'],
        ['Tonio', 'Voilà, un kilo de pommes. Et avec ceci ?'],
        ['Ben', 'Cinq cents grammes de raisin, s’il vous plaît.'],
        ['Tonio', 'Voilà. C’est tout ?'],
        ['Mia', 'Non, nous voudrions aussi deux cents grammes de fromage.'],
        ['Tonio', 'Très bien. Alors : deux euros cinquante pour les pommes, un euro cinquante pour le raisin et quatre euros pour le fromage. Ça fait huit euros.'],
        ['Ben', 'Voilà dix euros.'],
        ['Tonio', 'Dix moins huit, ça fait deux. Voilà deux euros. Merci et bon pique-nique !'],
        ['Mia', 'Merci, au revoir !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Au marché, le vendeur dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['Et avec ceci ?', 'C’est tout ?', 'Tu as quel âge ?'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['produit', 'quantité', 'prix'], breiten: [30, 35, 35], zeilen: [['pommes', '[1 kilo]', '[2,50 €]'], ['raisin', '[500 grammes]', '[1,50 €]'], ['fromage', '[200 grammes]', '[4 €]'], ['**total**', '', '[8 €]']] },
        { art: 'mc', auftrag: 'Écoute encore et coche.', stufe: 2, fragen: [{ f: 'Ben donne …', o: ['8 €', '10 €', '20 €'], r: 1 }, { f: 'Tonio rend …', o: ['2 €', '3 €'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jouez au marché : un client ou une cliente et un vendeur ou une vendeuse. Utilisez la liste de courses.', stufe: 3, karten: [
        { titel: 'Client(e)', text: ['Je voudrais …, s’il vous plaît.', 'Un kilo de … · Une bouteille de …', 'C’est combien ?', 'C’est tout, merci.'] },
        { titel: 'Vendeur / Vendeuse', text: ['Qu’est-ce que je vous donne ?', 'Et avec ceci ?', 'Ça fait … euros.', 'Voilà votre monnaie.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les quantités', punkte: ['un kilo **de** pommes · 500 grammes **de** raisin', 'une bouteille **d’**eau · un verre **de** lait', 'un paquet **de** biscuits · une boîte **de** thon', 'une tasse **de** thé · un peu **de** sucre', 'Après une quantité : toujours **de** / **d’**'] },
         { titel: 'Les magasins : à, au, chez', punkte: ['Je vais **au** marché (à + le).', 'Je vais **à la** boulangerie · **à l’**épicerie.', 'Je vais **chez** le boulanger · **chez** le boucher.', '**aux** = à + les : **aux** toilettes'] }],
        [{ art: 'tipp', titel: 'Être poli', text: 'Je **voudrais** … (plus poli que « je veux ») · Nous **voudrions** … · C’est combien ? · Merci, bonne journée !' },
         { art: 'achtung', titel: 'Les prix et les calculs', text: '2,50 € = deux euros **cinquante** · 10 **moins** 8, ça fait 2 · 2 **plus** 2, ça fait 4 · 3 **fois** 2, ça fait 6.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec la quantité.', stufe: 1, woerter: ['un kilo', 'une bouteille', 'un paquet', 'une boîte', 'un verre'], saetze: ['[une bouteille] d’eau', '[un paquet] de biscuits', '[un kilo] de carottes', '[une boîte] de thon', '[un verre] de lait'] },
      { art: 'luecken', auftrag: 'Complète avec au, à la, à l’ ou chez.', stufe: 1, saetze: ['Je vais [au] marché.', 'Il va [à la] boulangerie.', 'Nous allons [chez] le boucher.', 'Tu vas [à l’] épicerie ?', 'Elle va [à la] pharmacie.'] },
      { art: 'luecken', auftrag: 'Calcule.', stufe: 2, saetze: ['2,50 € + 1,50 € = [4 €]', '10 € – 8 € = [2 €]', '3 × 2 € = [6 €]', '20 € – 12,50 € = [7,50 €]'] },
    ],
    schreiben: [
      { art: 'tabelle', auftrag: 'Écris une liste de courses pour un pique-nique : cinq produits avec la quantité.', stufe: 1, kopf: ['quantité', 'produit'], breiten: [45, 55], zeilen: [['', ''], ['', ''], ['', ''], ['', ''], ['', '']] },
      { art: 'schreiben', auftrag: 'Écris un petit dialogue au marché.', stufe: 2,
        anfaenge: ['Vendeur : Bonjour ! Qu’est-ce que je vous donne ?', 'Client : Je voudrais …', 'Vendeur : Et avec ceci ?', 'Client : …', 'Vendeur : Ça fait …'], zeilen: 7,
        beispiel: 'Vendeur : Bonjour ! Qu’est-ce que je vous donne ? Cliente : Je voudrais deux kilos de carottes, s’il vous plaît. Vendeur : Et avec ceci ? Cliente : Un paquet de biscuits. C’est tout. Vendeur : Ça fait cinq euros soixante.' },
    ],
    check: ['Je connais des magasins.', 'Je demande des quantités.', 'Je comprends des prix.', 'Je calcule avec plus et moins.', 'J’écris une liste de courses.'],
  },
  // ================================================================ 6
  {
    thema: 'Au café · du, de la, des · prendre, vouloir', titel: 'Au café', untertitel: 'Chocolat chaud, crêpes, salade de fruits : tu lis une carte et une recette, tu commandes au café et tu écris ta recette.',
    ziel: { fr: 'Je lis une carte et je commande à boire et à manger.', de: 'Ich lese eine Karte und bestelle etwas zu trinken und zu essen.' },
    bild: ['verkaeuferin:froh:erklaeren', 'ben:froh:stehen'],
    start: {
      was: 'Boire ou manger ?',
      aufgaben: [
        { art: 'rf', auftrag: 'À boire ou à manger ? Coche.', stufe: 1, spalten: ['à boire', 'à manger'], saetze: [['un chocolat chaud', true], ['une crêpe', false], ['un jus d’orange', true], ['un croque-monsieur', false], ['de l’eau', true], ['une salade de fruits', false]] },
      ],
    },
    lesen: {
      was: 'Une carte et une recette', art: 'dokumente',
      quelle: 'Café des Amis (imaginaire)', titel: 'Au Café des Amis',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Café des Amis** – La carte', text: ['**Boissons :** chocolat chaud 3,20 € · thé 2,50 € · jus d’orange 3 € · eau minérale 2 €', '**À manger :** croque-monsieur 5,50 € · crêpe au sucre 3 € · crêpe au chocolat 4 € · tarte aux pommes (une part) 3,50 €', '**Offre jeunes :** une boisson + une crêpe au sucre = 5 €', 'Ouvert du mardi au dimanche, de 8 h à 20 h'] },
        { stil: 'nachricht', stimme: 'm2', kopf: '**Notre recette** : la salade de fruits', text: ['**Pour 4 personnes :** 2 pommes, 2 bananes, 1 orange, 200 grammes de raisin, un citron, un peu de sucre.', 'Lave les fruits. Coupe les fruits en petits morceaux. Mets les morceaux dans un saladier. Ajoute le jus du citron et un peu de sucre. Bon appétit !'] },
      ],
      woerter: [['la carte', 'die Speisekarte'], ['la boisson', 'das Getränk'], ['le croque-monsieur', 'der Schinken-Käse-Toast'], ['une part de tarte', 'ein Stück Kuchen'], ['l’offre', 'das Angebot'], ['la recette', 'das Rezept'], ['couper', 'schneiden'], ['ajouter', 'hinzufügen']],
      aufgaben: [
        { art: 'mc', auftrag: 'Lis la carte et coche.', stufe: 1, fragen: [{ f: 'Un chocolat chaud coûte …', o: ['2,50 €', '3,20 €', '4 €'], r: 1 }, { f: 'Le café est fermé …', o: ['le lundi', 'le dimanche'], r: 0 }, { f: 'L’offre jeunes, c’est …', o: ['une boisson et une crêpe au sucre', 'une salade et un thé'], r: 0 }] },
        { art: 'mc', auftrag: 'Lis la recette. Coche les ingrédients.', stufe: 2, fragen: [{ f: '', o: ['des pommes', 'des carottes', 'des bananes', 'du fromage', 'une orange', 'un citron'], r: [0, 2, 4, 5] }] },
      ],
    },
    hoeren: {
      was: 'Au café', wo: 'Café des Amis · mercredi après-midi', titel: 'Vous avez choisi ?',
      situation: 'Mercredi après-midi, Mia et Ben vont au café. Le serveur prend la commande.',
      bild: ['lehrer:froh:blatt', 'mia:froh:tasse'], sprecher: { Serveur: 'm2', Mia: 'w2', Ben: 'm3' },
      text: [
        ['Serveur', 'Bonjour ! Vous avez choisi ?'],
        ['Mia', 'Oui. Pour moi, un chocolat chaud et une crêpe au sucre, s’il vous plaît.'],
        ['Serveur', 'C’est l’offre jeunes : cinq euros. Et pour vous ?'],
        ['Ben', 'Je voudrais un jus d’orange et… euh… un croque-monsieur.'],
        ['Serveur', 'Désolé, il n’y a plus de croque-monsieur aujourd’hui.'],
        ['Ben', 'Dommage ! Alors, je prends une part de tarte aux pommes.'],
        ['Serveur', 'Très bien. Vous voulez de l’eau aussi ?'],
        ['Mia', 'Oui, une carafe d’eau, s’il vous plaît.'],
        ['Ben', 'Monsieur ! L’addition, s’il vous plaît !'],
        ['Serveur', 'Alors, cinq euros pour elle, et six euros cinquante pour lui. Ça fait onze euros cinquante en tout.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Au café, on dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['Je voudrais …, s’il vous plaît.', 'L’addition, s’il vous plaît !', 'Donne-moi ça !'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète la commande.', stufe: 1, kopf: ['', 'Mia', 'Ben'], breiten: [22, 39, 39], zeilen: [['boisson', '[un chocolat chaud]', '[un jus d’orange]'], ['à manger', '[une crêpe au sucre]', '[une part de tarte aux pommes]'], ['prix', '[5 €]', '[6,50 €]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Il n’y a plus de croque-monsieur.', true], ['Ben et Mia prennent une bouteille d’eau.', false], ['L’addition fait 11,50 €.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jouez au café à trois. Utilisez la carte du Café des Amis.', stufe: 3, karten: [
        { titel: 'Client(e)', text: ['Pour moi, …, s’il vous plaît.', 'Je voudrais … · Je prends …', 'Vous avez … ?', 'L’addition, s’il vous plaît !'] },
        { titel: 'Serveur / Serveuse', text: ['Vous avez choisi ?', 'Et pour vous ?', 'Désolé(e), il n’y a plus de …', 'Ça fait … euros.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'du, de la, de l’, des', tabelle: { kopf: ['', 'oui', 'non'], zeilen: [['masculin', '**du** sucre', 'pas **de** sucre'], ['féminin', '**de la** confiture', 'pas **de** confiture'], ['voyelle', '**de l’**eau', 'pas **d’**eau'], ['pluriel', '**des** frites', 'pas **de** frites']] } },
         { titel: 'prendre et vouloir', tabelle: { kopf: ['', 'prendre', 'vouloir'], zeilen: [['je', '**prends**', '**veux**'], ['tu', '**prends**', '**veux**'], ['il / elle / on', '**prend**', '**veut**'], ['nous', '**prenons**', '**voulons**'], ['vous', '**prenez**', '**voulez**'], ['ils / elles', '**prennent**', '**veulent**']] } }],
        [{ art: 'tipp', titel: 'pour + moi, toi, lui, elle', text: 'Un chocolat **pour moi** ! · Et **pour toi** ? · Une tarte **pour lui**. · Un thé **pour elle**.' },
         { art: 'achtung', titel: 'Je veux · je voudrais', text: '« Je **veux** » est très direct. Au café, dis plutôt : « Je **voudrais** … » ou « Je **prends** … ».' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec du, de la, de l’ ou des.', stufe: 1, saetze: ['Je prends [du] jus d’orange.', 'Tu veux [de la] confiture ?', 'Il boit [de l’]eau.', 'Nous mangeons [des] crêpes.', 'Elle prend [du] fromage.'] },
      { art: 'luecken', auftrag: 'Conjugue prendre ou vouloir.', stufe: 1, saetze: ['(prendre) Je [prends] une crêpe.', '(vouloir) Tu [veux] un thé ?', '(prendre) Nous [prenons] le menu.', '(vouloir) Vous [voulez] de l’eau ?', '(prendre) Ils [prennent] le bus.'] },
      { art: 'luecken', auftrag: 'Complète avec moi, toi, lui ou elle.', stufe: 2, saetze: ['Mia : « Un chocolat chaud pour [moi] ! »', 'Mia à Ben : « Et pour [toi] ? »', 'Ben paie pour [lui].', 'Mia paie pour [elle].'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris la recette de ton plat ou de ton dessert préféré (vrai ou imaginaire).', stufe: 2,
        anfaenge: ['Ingrédients : …', 'Lave … · Coupe …', 'Mets … · Ajoute …', 'Bon appétit !'], zeilen: 9,
        beispiel: 'Les crêpes. Ingrédients : 250 grammes de farine, 3 œufs, un demi-litre de lait, un peu de sucre. Mets la farine dans un saladier. Ajoute les œufs et le lait. Mélange bien. Fais cuire les crêpes dans une poêle avec un adulte. Bon appétit !' },
    ],
    check: ['Je lis une carte de café.', 'Je commande à boire et à manger.', 'J’utilise du, de la, de l’, des.', 'Je conjugue prendre et vouloir.', 'J’écris une recette simple.'],
  },
  // ================================================================ 7
  {
    thema: 'Les mois · les saisons · la météo · les fêtes', titel: 'Quel temps fait-il ?', untertitel: 'Les mois, les saisons, la météo et les fêtes de l’année : tu lis un calendrier, tu écoutes la météo et tu écris une carte postale.',
    ziel: { fr: 'Je parle des saisons, de la météo et des fêtes de l’année.', de: 'Ich spreche über Jahreszeiten, Wetter und Feste im Jahr.' },
    bild: ['noah:froh:laessig', 'mia:froh:stehen'],
    start: {
      was: 'Les mois et les saisons',
      aufgaben: [
        { art: 'luecken', auftrag: 'Complète les mois.', stufe: 1, saetze: ['janvier, [février], mars', 'avril, mai, [juin]', '[juillet], août, septembre', 'octobre, [novembre], décembre'] },
        { art: 'zuordnen', auftrag: 'Les saisons : relie.', stufe: 1, links: ['le printemps', 'l’été', 'l’automne', 'l’hiver'], rechts: ['der Frühling', 'der Sommer', 'der Herbst', 'der Winter'], ordnung: [2, 0, 3, 1] },
      ],
    },
    lesen: {
      was: 'Un calendrier et une carte postale', art: 'dokumente',
      quelle: 'Calendrier de la classe et carte postale (personnes imaginaires)', titel: 'Les fêtes et les vacances',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Les fêtes de l’année au Luxembourg** (un choix)', text: ['**Janvier :** le Nouvel An, le 1er janvier. On dit : « Bonne année ! »', '**Février ou mars :** le Carnaval. Les enfants se déguisent.', '**Juin :** la Fête nationale, le 23 juin. Le soir du 22 juin, il y a un grand feu d’artifice à Luxembourg-Ville.', '**Décembre :** la Saint-Nicolas, le 6 décembre, et Noël, le 25 décembre.', 'On fête aussi beaucoup d’autres fêtes : Pâques, l’Aïd, Diwali, le Nouvel An chinois …'] },
        { stil: 'nachricht', stimme: 'm3', kopf: 'Carte postale de Rui', text: ['Coucou la classe ! Je suis en vacances au Portugal, chez mes grands-parents. Il fait beau et chaud : 30 degrés ! Le matin, je vais à la plage. Le soir, on mange des sardines. Je pars le 28 juillet. À bientôt ! Rui'] },
      ],
      woerter: [['la fête', 'das Fest'], ['se déguiser', 'sich verkleiden'], ['le feu d’artifice', 'das Feuerwerk'], ['Noël', 'Weihnachten'], ['les vacances', 'die Ferien'], ['il fait beau', 'es ist schönes Wetter'], ['chaud', 'warm, heiß'], ['la plage', 'der Strand']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Quelle fête ? Quand ?', stufe: 1, kopf: ['fête', 'date ou mois'], breiten: [45, 55], zeilen: [['le Nouvel An', '[le 1er janvier]'], ['le Carnaval', '[en février ou en mars]'], ['la Fête nationale', '[le 23 juin]'], ['la Saint-Nicolas', '[le 6 décembre]']] },
        { art: 'rf', auftrag: 'Lis la carte postale. Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Rui est en vacances en Espagne.', false], ['Il fait 30 degrés.', true], ['Le soir, il va à la plage.', false], ['Il part le 28 juillet.', true]] },
      ],
    },
    hoeren: {
      was: 'La météo', wo: 'Radio · bulletin météo', titel: 'La météo du week-end',
      situation: 'À la radio, une présentatrice donne la météo du week-end. Ensuite, Noah et Mia font des projets.',
      bild: ['noah:froh', 'mia:froh'], sprecher: { 'Météo': 'w1', Noah: 'm3', Mia: 'w2' },
      text: [
        ['Météo', 'Bonjour à tous ! Voici la météo du week-end. Samedi, il fait beau dans tout le pays. Il y a du soleil et il fait chaud : vingt-quatre degrés l’après-midi.'],
        ['Météo', 'Dimanche, attention : il pleut le matin et il y a du vent. L’après-midi, il fait plus frais : seulement seize degrés.'],
        ['Noah', 'Tu as entendu ? Samedi, il fait beau ! On va à la piscine ?'],
        ['Mia', 'Oui, super idée ! Et dimanche, il pleut… On va au cinéma ?'],
        ['Noah', 'D’accord ! Samedi, piscine, et dimanche, cinéma !'],
      ],
      vor: [{ art: 'mc', auftrag: 'En hiver, au Luxembourg … Coche.', stufe: 1, fragen: [{ f: '', o: ['il fait froid', 'il neige parfois', 'il fait 35 degrés'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'samedi', 'dimanche'], breiten: [30, 35, 35], zeilen: [['le temps', '[il fait beau, du soleil]', '[il pleut, du vent]'], ['la température', '[24 degrés]', '[16 degrés]'], ['Noah et Mia vont …', '[à la piscine]', '[au cinéma]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Présente la météo de demain à la classe, comme à la radio. Tu peux l’inventer.', stufe: 3, karten: [
        { titel: 'La météo', text: ['Bonjour ! Voici la météo de …', 'Il fait beau / mauvais.', 'Il pleut. · Il neige. · Il y a du vent.', 'Il fait … degrés.'] },
        { titel: 'Faire des projets', text: ['On va … ?', 'Super idée !', 'Non, je préfère …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Le temps qu’il fait', punkte: ['**Il fait** beau / mauvais / chaud / froid.', '**Il pleut.** · **Il neige.**', '**Il y a** du soleil / du vent / des nuages.', '**Il fait** 20 degrés.'] },
         { titel: 'Les saisons et les mois', punkte: ['**au** printemps : mars, avril, mai', '**en** été : juin, juillet, août', '**en** automne : septembre, octobre, novembre', '**en** hiver : décembre, janvier, février', '**en** janvier · **le** 6 décembre'] }],
        [{ titel: 'partir', punkte: ['je **pars** · tu **pars** · il / elle **part**', 'nous **partons** · vous **partez** · ils / elles **partent**', 'Je pars **en** vacances **le** 28 juillet.'] },
         { art: 'achtung', titel: 'Les dates', text: 'On dit **le 1er** (premier) janvier, mais **le 2** (deux), **le 3** (trois) … Les mois s’écrivent en **minuscules**.' }],
      ],
    },
    ueben: [
      { art: 'symbole', auftrag: 'Quel temps fait-il ? Écris.', stufe: 1, woerter: ['il fait beau', 'il pleut', 'il neige', 'il y a du vent'], symbole: [['sun', 'il fait beau'], ['cloud-rain', 'il pleut'], ['snowflake', 'il neige'], ['wind', 'il y a du vent']] },
      { art: 'luecken', auftrag: 'Complète avec au ou en.', stufe: 1, saetze: ['[en] été', '[au] printemps', '[en] hiver', '[en] automne', '[en] juillet'] },
      { art: 'luecken', auftrag: 'Conjugue partir.', stufe: 2, saetze: ['Je [pars] en vacances.', 'Tu [pars] quand ?', 'Elle [part] le 3 août.', 'Nous [partons] en train.', 'Ils [partent] à la mer.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris une carte postale à la classe : tu es en vacances. Tu peux inventer.', stufe: 2,
        anfaenge: ['Coucou la classe !', 'Je suis à …', 'Il fait …', 'Le matin, je …', 'À bientôt !'], zeilen: 8,
        beispiel: 'Coucou la classe ! Je suis à la montagne, en Suisse. Il fait froid, mais il y a du soleil. Le matin, je fais du ski. Le soir, je joue aux cartes. Je pars le 2 mars. À bientôt ! Amira' },
    ],
    check: ['Je connais les mois et les saisons.', 'Je comprends la météo.', 'Je dis quel temps il fait.', 'Je connais des fêtes de l’année.', 'J’écris une carte postale.'],
  },
  // ================================================================ 8
  {
    thema: 'Une famille · une fête · les vœux', titel: 'Joyeux anniversaire !', untertitel: 'Une famille, une fête, une carte de vœux : tu comprends quand on présente une famille et tu écris une invitation.',
    ziel: { fr: 'Je comprends quand on présente une famille et j’écris une invitation ou une carte de vœux.', de: 'Ich verstehe, wenn jemand eine Familie vorstellt, und schreibe eine Einladung oder Glückwunschkarte.' },
    bild: ['noah:froh:stehen-zeigen', 'oma:froh:stehen'],
    start: {
      was: 'La famille',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'La famille : relie.', stufe: 1, links: ['la mère', 'le père', 'le frère', 'la sœur', 'les grands-parents', 'le cousin, la cousine'], rechts: ['die Mutter', 'der Vater', 'der Bruder', 'die Schwester', 'die Großeltern', 'der Cousin, die Cousine'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Le blog de Noah', art: 'text', stimme: 'm3', nummern: true,
      quelle: 'Blog de la classe · personnage et famille imaginaires', titel: 'La famille de Noah',
      absaetze: [
        'Salut ! C’est Noah. Samedi, c’est mon **anniversaire** : j’ai treize ans ! Il y a une grande fête chez nous. Toute la famille vient.',
        'J’habite avec ma **mère**, mon **beau-père** Marc et ma **petite sœur** Lina. Elle a six ans. Mon beau-père est très drôle : il **apprend** le portugais avec moi !',
        'Le week-end, je vais souvent chez mon **père**. Il habite à Diekirch avec mon **demi-frère** Hugo. Hugo a deux ans. Il est trop mignon !',
        'Mes **grands-parents** habitent à Ettelbruck. Ma **grand-mère** fait le meilleur gâteau au chocolat du monde. Mon **cousin** Rafael vient aussi à la fête. On joue toujours ensemble.',
        'Une grande famille, c’est parfois compliqué. Mais j’adore les fêtes avec tout le monde !',
      ],
      woerter: [['l’anniversaire', 'der Geburtstag'], ['le beau-père', 'der Stiefvater'], ['la petite sœur', 'die kleine Schwester'], ['le demi-frère', 'der Halbbruder'], ['drôle', 'lustig'], ['mignon', 'süß'], ['les grands-parents', 'die Großeltern'], ['compliqué', 'kompliziert']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Qui est-ce ? Complète.', stufe: 1, kopf: ['personne', 'c’est … de Noah'], breiten: [35, 65], zeilen: [['Marc', '[son beau-père]'], ['Lina', '[sa petite sœur]'], ['Hugo', '[son demi-frère]'], ['Rafael', '[son cousin]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Samedi, Noah a treize ans.', true], ['Lina a deux ans.', false], ['Le père de Noah habite à Diekirch.', true], ['Marc apprend le portugais.', true]] },
      ],
    },
    hoeren: {
      was: 'La fête', wo: 'Chez Noah · samedi soir', titel: 'Je te présente ma famille',
      situation: 'Samedi soir, c’est la fête chez Noah. Son copain Sami arrive. Noah lui présente sa famille.',
      bild: ['sami:froh:stehen', 'noah:froh'], sprecher: { Sami: 'm2', Noah: 'm3', 'Grand-mère': 'w2' },
      text: [
        ['Sami', 'Joyeux anniversaire, Noah ! Voilà, c’est pour toi.'],
        ['Noah', 'Merci, Sami ! Oh, un ballon de basket ! Super ! Viens, je te présente ma famille.'],
        ['Noah', 'Là, c’est ma grand-mère. Mamie, c’est Sami, mon copain du foot.'],
        ['Grand-mère', 'Enchantée, Sami ! Tu veux un morceau de gâteau ?'],
        ['Sami', 'Oui, avec plaisir. Merci, Madame !'],
        ['Noah', 'Le grand monsieur avec les lunettes, c’est mon beau-père, Marc. Et la dame à côté, avec les cheveux longs, c’est ma mère.'],
        ['Sami', 'Et le petit garçon qui court partout ?'],
        ['Noah', 'C’est mon demi-frère, Hugo. Il a deux ans. Attention, il adore les ballons !'],
        ['Sami', 'Ha ha ! Il est trop mignon !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour un anniversaire, on dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['Joyeux anniversaire !', 'Bonne année !', 'Bon anniversaire !'], r: [0, 2] }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'Sami offre …', o: ['un livre', 'un ballon de basket', 'un jeu'], r: 1 }, { f: 'Le beau-père porte …', o: ['des lunettes', 'une casquette'], r: 0 }, { f: 'La mère de Noah a …', o: ['les cheveux courts', 'les cheveux longs'], r: 1 }, { f: 'Hugo adore …', o: ['les ballons', 'les gâteaux'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Invente une famille. Dessine-la et présente-la à ton ou ta partenaire.', stufe: 3, karten: [
        { titel: 'Présenter', text: ['Voilà la famille de …', 'Il / Elle habite avec …', 'Son frère s’appelle …', 'Il / Elle a … ans.'] },
        { titel: 'Demander', text: ['C’est qui ?', 'Il / Elle a quel âge ?', 'Il / Elle habite où ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'La famille', punkte: ['la **mère**, le **père** · les **parents**', 'le **frère**, la **sœur** · le **demi-frère**, la **demi-sœur**', 'le **beau-père**, la **belle-mère** (familles recomposées)', 'la **grand-mère**, le **grand-père**', 'l’**oncle**, la **tante** · le **cousin**, la **cousine**'] },
         { titel: 'apprendre', punkte: ['j’**apprends** · tu **apprends** · il / elle **apprend**', 'nous **apprenons** · vous **apprenez**', 'ils / elles **apprennent**', 'Comme **prendre** !'] }],
        [{ titel: 'mon, ma, mes · son, sa, ses', tabelle: { kopf: ['', 'masculin', 'féminin', 'pluriel'], zeilen: [['à moi', '**mon** père', '**ma** mère', '**mes** cousins'], ['à lui, à elle', '**son** père', '**sa** mère', '**ses** cousins']] } }],
        [{ art: 'tipp', titel: 'Les vœux', text: '**Joyeux anniversaire !** · **Joyeux Noël !** · **Bonne année !** · **Bonne fête !** · **Félicitations !**' },
         { art: 'achtung', titel: 'son ou sa ?', text: '**sa** mère = die Mutter von Noah **oder** von Lina. **son / sa** dépend du **mot** (la mère → **sa**), pas de la personne.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec son, sa ou ses.', stufe: 1, saetze: ['Noah présente [sa] grand-mère.', 'Il parle avec [son] beau-père.', 'Lina joue avec [ses] cousins.', 'Hugo adore [son] ballon.', 'Noah aime [sa] famille.'] },
      { art: 'luecken', auftrag: 'Qui est-ce ? Complète.', stufe: 2, saetze: ['La mère de la mère de Noah, c’est sa [grand-mère].', 'Le fils de l’oncle de Noah, c’est son [cousin].', 'La sœur du père de Noah, c’est sa [tante].', 'Le frère de la mère de Noah, c’est son [oncle].'] },
      { art: 'luecken', auftrag: 'Conjugue apprendre.', stufe: 1, saetze: ['J’[apprends] le français.', 'Tu [apprends] l’anglais ?', 'Marc [apprend] le portugais.', 'Nous [apprenons] une chanson.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris une invitation pour une fête (anniversaire, fête de classe … – tu peux l’inventer).', stufe: 2,
        anfaenge: ['Salut … !', 'Je fais une fête pour …', 'C’est le … à … heures.', 'C’est à …', 'Réponds-moi avant le …'], zeilen: 7,
        beispiel: 'Salut Yusuf ! Je fais une fête pour mon anniversaire. C’est le samedi 13 mars à 15 heures. C’est à la maison des jeunes. Il y a des crêpes et de la musique ! Réponds-moi avant le 10 mars. Inès' },
      { art: 'schreiben', auftrag: 'Écris une carte de vœux courte à un copain ou à une copine.', stufe: 1,
        anfaenge: ['Joyeux … !', 'Je te souhaite …', 'Bisous · À bientôt'], zeilen: 4,
        beispiel: 'Joyeux anniversaire, Tom ! Je te souhaite une super journée et beaucoup de cadeaux. À bientôt ! Mia' },
      { art: 'frei', auftrag: 'BD « La fête surprise » : dessine l’histoire en 6 cases. Écris dans chaque case une phrase ou une bulle (ce que les personnes disent). Tu peux suivre les idées ou inventer ta fête.', stufe: 3, neueSeite: true,
        html: '<div class="bd"><div class="case"><div class="cap">1 · On prépare en secret.</div><div style="height:30mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div></div><div class="case"><div class="cap">2 · On décore la salle.</div><div style="height:30mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div></div><div class="case"><div class="cap">3 · Tout le monde se cache.</div><div style="height:30mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div></div><div class="case"><div class="cap">4 · La personne arrive.</div><div style="height:30mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div></div><div class="case"><div class="cap">5 · « Surprise ! »</div><div style="height:30mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div></div><div class="case"><div class="cap">6 · On fait la fête.</div><div style="height:30mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div><div style="border-top:0.3mm solid #c9cfd8;height:8mm"></div></div></div>' },
      { art: 'schreiben', auftrag: 'Après la fête : écris une carte de remerciement à la personne qui a tout organisé (personne inventée).', stufe: 1,
        anfaenge: ['Chère … / Cher …,', 'Merci beaucoup pour …', 'J’ai adoré …', 'C’était …', 'À bientôt ·'], zeilen: 5,
        beispiel: 'Chère Lina,\nmerci beaucoup pour la fête surprise ! J’ai adoré le gâteau au chocolat et la musique. C’était génial.\nÀ bientôt,\nSami' },
    ],
    check: ['Je nomme les membres d’une famille.', 'Je comprends quand on présente une famille.', 'J’utilise son, sa, ses.', 'Je conjugue apprendre.', 'J’écris une invitation et une carte de vœux.', 'Je raconte une fête en BD et j’écris une carte de remerciement.'],
  },
]
