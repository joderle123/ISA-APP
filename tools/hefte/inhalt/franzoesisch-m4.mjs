// Français · Module 4 « Médias et stars » (Régime / Voie de préparation, A2.1) – cahier multimodal.
// D’après le « Programme FRANC 7P–5P » (CNES, 20/03/2019), Module 4 « Le monde des médias,
// le monde des stars » : genres de films, séries, journal télévisé, presse écrite et audiovisuelle, professions,
// vacances, transports, météo, camping ; présent et passé composé, interrogatifs, il y a / il manque / aucun,
// ce que / ce qui, avoir envie de / je voudrais / je veux / je vais, comparatif et superlatif (meilleur, mieux),
// pronom y, déjà / jamais / encore, dates et moments, connecteurs de temps, masculin et féminin des métiers,
// pluriel et féminin des noms et adjectifs. Toutes les personnes (aussi les « stars »), médias, films et
// événements sont imaginaires.

export const MODUL = {
  id: 'franzoesisch-m4', kuerzel: 'fr4', nr: 4, sprache: 'fr', niveau: 'A2.1', klasse: 'Voie de préparation',
  dateiname: 'Francais_Module-4',
  fach: { de: 'Französisch', fr: 'Français' },
  titel: { de: 'Medien und Stars', fr: 'Médias et stars' },
  untertitel: { fr: 'Lire et écouter les infos, donner son avis, faire des projets, découvrir une star, parler des métiers, comparer des films et écrire un reportage – en huit unités.', de: 'Nachrichten lesen und hören, seine Meinung sagen, Pläne machen, einen Star kennenlernen, über Berufe sprechen, Filme vergleichen und eine Reportage schreiben – in acht Einheiten.' },
  farben: { tief: '#b0285f', mittel: '#f0a6c3', zart: '#fcedf3', dunkel: '#6e1638' },
  deckbild: ['jana:froh:tanzen', 'sami:froh:laptop', 'chloe:froh:handy'],
  blasen: [{ t: 'Flash info !', x: 14, y: 110 }, { t: 'C’est le meilleur !', x: 112, y: 98 }, { t: 'J’y vais !', x: 162, y: 150 }],
  themen: [
    { titel: { fr: 'Les médias', de: 'Die Medien' }, icon: 'news', lektionen: 3 },
    { titel: { fr: 'Stars et métiers', de: 'Stars und Berufe' }, icon: 'star', lektionen: 3 },
    { titel: { fr: 'Raconter l’actualité', de: 'Aktuelles erzählen' }, icon: 'microphone', lektionen: 2 },
  ],
  anleitung: [
    'Chaque leçon a cinq parties : **Lire**, **Écouter**, **La règle**, **S’entraîner** et **Écrire**. À la fin, il y a un **mini-bilan**.',
    'À côté de chaque texte, il y a un **code QR**. Scanne-le avec ton portable : tu entends le texte. Écoute plusieurs fois pour trouver les informations importantes.',
    'Les points montrent le niveau : ●○○ base · ●●○ moyen · ●●● plus. Commence par la base.',
    'Toutes les personnes de ce cahier sont **imaginaires**, aussi les stars. Tu peux toujours inventer. Un mot inconnu ? Cherche-le dans le dictionnaire.',
  ],
  // seulement pour la voix (Regex Python)
  aussprache: {
    '\\bMme\\b': 'Madame', '\\bM\\. ': 'Monsieur ', '(\\d{1,2}) h (\\d\\d)': '\\1 heures \\2', '(\\d{1,2}) h\\b': '\\1 heures', '\\b1er\\b': 'premier',
    '(\\d+) ?km\\b': '\\1 kilomètres', '\\bCDI\\b': 'cé dé i',
  },
}

const balken = (titel, daten, einheit) => {
  const max = Math.max(...daten.map((d) => d[1]))
  return `<div style="font-family:Lexend;font-weight:700;font-size:11.5pt;margin-bottom:2.5mm">${titel}</div><div style="display:grid;gap:2.2mm">${daten
    .map(([l, v]) => `<div style="display:grid;grid-template-columns:50mm 1fr;gap:3mm;align-items:center"><span style="font-size:11.5pt">${l}</span><div style="display:flex;align-items:center;gap:2mm"><div style="height:7mm;width:${(v / max) * 85}mm;background:var(--f);border-radius:1.5mm"></div><b style="font-family:Lexend">${v}</b><span style="font-size:10.5pt;color:var(--leise)">${einheit}</span></div></div>`)
    .join('')}</div>`
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Les médias · les questions', titel: 'Les nouvelles des jeunes', untertitel: 'Journal, radio, site internet : tu lis des nouvelles brèves, tu écoutes un flash info et tu écris une nouvelle pour la classe.',
    ziel: { fr: 'Je comprends l’essentiel de nouvelles courtes et je pose des questions : qui, quoi, où, quand ?', de: 'Ich verstehe das Wichtigste aus kurzen Nachrichten und stelle W-Fragen.' },
    bild: ['chloe:froh:laptop', 'sami:froh:handy'],
    start: {
      was: 'Les médias',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Les médias : relie.', stufe: 1, links: ['le journal', 'la radio', 'la télévision', 'le magazine', 'le site internet', 'le podcast'], rechts: ['die Zeitung', 'das Radio', 'das Fernsehen', 'die Zeitschrift', 'die Webseite', 'der Podcast'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Trois nouvelles brèves', art: 'dokumente',
      quelle: 'Journal des jeunes (nouvelles imaginaires)', titel: 'En bref',
      dokumente: [
        { stil: 'nachricht', stimme: 'w1', kopf: '**Ettelbruck : 200 arbres pour l’école**', text: ['Mardi dernier, 60 élèves du lycée ont planté 200 arbres derrière leur école. « Nous voulons plus de nature », explique Léo, 13 ans. Le projet a duré toute la journée.'] },
        { stil: 'nachricht', stimme: 'm1', kopf: '**Concert : record pour Nora Valen**', text: ['Samedi soir, 3000 personnes sont venues au concert de la jeune chanteuse à Esch-sur-Alzette. Nora Valen a 20 ans. Elle a chanté pendant deux heures.'] },
        { stil: 'nachricht', stimme: 'w2', kopf: '**Météo : la neige arrive !**', text: ['Demain matin, il va neiger dans le nord du pays. Les bus vont rouler plus lentement. Attention sur le chemin de l’école !'] },
      ],
      woerter: [['la nouvelle', 'die Nachricht'], ['planter', 'pflanzen'], ['l’arbre', 'der Baum'], ['expliquer', 'erklären'], ['durer', 'dauern'], ['la chanteuse', 'die Sängerin'], ['le nord', 'der Norden'], ['rouler', 'fahren']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Nouvelles 1 et 2 : complète le tableau.', stufe: 1, kopf: ['', 'nouvelle 1', 'nouvelle 2'], breiten: [18, 41, 41], zeilen: [['qui ?', '[60 élèves du lycée]', '[Nora Valen, 3000 personnes]'], ['quoi ?', '[ils ont planté 200 arbres]', '[un concert, un record]'], ['où ?', '[à Ettelbruck, derrière l’école]', '[à Esch-sur-Alzette]'], ['quand ?', '[mardi dernier]', '[samedi soir]']] },
        { art: 'mc', auftrag: 'Nouvelle 3 : coche.', stufe: 1, fragen: [{ f: 'Demain matin, …', o: ['il va pleuvoir', 'il va neiger'], r: 1 }, { f: 'Les bus vont rouler …', o: ['plus vite', 'plus lentement'], r: 1 }] },
      ],
    },
    hoeren: {
      was: 'Un flash info', wo: 'Radio des jeunes · 7 h 30', titel: 'Le flash info',
      situation: 'Le matin, à la radio des jeunes, Mia et Yusuf présentent le flash info : trois nouvelles.',
      bild: ['mia:froh:erklaeren', 'yusuf:froh:laptop'], sprecher: { Mia: 'w3', Yusuf: 'm3' },
      text: [
        ['Mia', 'Bonjour à tous, il est sept heures et demie. Voici le flash info des jeunes !'],
        ['Yusuf', 'D’abord, la circulation. Ce matin, un camion est en panne sur la route entre Mersch et Ettelbruck. Il n’y a pas de blessés, mais les bus ont vingt minutes de retard.'],
        ['Mia', 'Ensuite, le sport. Hier soir, l’équipe de basket des filles de Wiltz a gagné la finale : soixante-deux à cinquante-huit ! Bravo !'],
        ['Yusuf', 'Et enfin, une bonne nouvelle pour les lecteurs : à partir de lundi, la bibliothèque de la ville ouvre aussi le samedi après-midi.'],
        ['Mia', 'C’était le flash info. Bonne journée et à demain !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Dans un flash info, on entend … Coche.', stufe: 1, fragen: [{ f: '', o: ['des nouvelles courtes', 'un long film', 'des infos sur la circulation'], r: [0, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['nouvelle', 'quoi ?', 'détail'], breiten: [22, 42, 36], zeilen: [['la circulation', '[un camion en panne entre Mersch et Ettelbruck]', '[pas de blessés ; bus : 20 minutes de retard]'], ['le sport', '[les filles de Wiltz ont gagné la finale de basket]', '[62 à 58]'], ['la bibliothèque', '[elle ouvre aussi le samedi après-midi]', '[à partir de lundi]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Résume une nouvelle à ton ou ta partenaire avec des mots-clés. Il ou elle pose des questions.', stufe: 3, karten: [
        { titel: 'Résumer', text: ['C’est une nouvelle sur …', 'Ça s’est passé à … · le …', 'Il y a …'] },
        { titel: 'Demander', text: ['Qui ? · Quoi ?', 'Où ? · Quand ?', 'Comment ? · Pourquoi ?', 'Combien ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les mots interrogatifs', tabelle: { kopf: ['question', 'exemple'], zeilen: [['**qui ?**', 'Qui a gagné ?'], ['**qu’est-ce que ?**', 'Qu’est-ce que tu lis ?'], ['**où ?**', 'Où est le camion ?'], ['**quand ?**', 'Le concert est quand ?'], ['**comment ?**', 'Comment tu viens ?'], ['**pourquoi ?**', 'Pourquoi le bus est en retard ?'], ['**combien ?**', 'Combien de personnes ?']] } },
         { titel: 'Les médias', punkte: ['la **presse écrite** : le journal, le magazine, l’article', 'la **presse audiovisuelle** : la radio, la télévision', 'sur **internet** : le site, le blog, le podcast', 'le titre · la nouvelle · le flash info · le ou la journaliste'] }],
        [{ art: 'tipp', titel: 'Une bonne nouvelle', text: 'Elle répond à cinq questions : **qui ? quoi ? où ? quand ? comment ?** Le titre est **court**.' },
         { art: 'achtung', titel: 'Vrai ou faux ?', text: 'Sur internet, il y a aussi des **fausses nouvelles**. Vérifie : qui a écrit ? Est-ce que d’autres médias donnent la même information ?' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec le bon mot interrogatif.', stufe: 1, saetze: ['[Qui] a chanté samedi ? – Nora Valen.', '[Où] est le concert ? – À Esch-sur-Alzette.', 'Il va neiger [quand] ? – Demain matin.', 'Ils ont planté [combien] d’arbres ? – 200.', '[Pourquoi] les bus sont en retard ? – Parce qu’un camion est en panne.'] },
      { art: 'abschreiben', auftrag: 'Écris la question.', stufe: 2, kopf: ['réponse', 'question'], saetze: [['Les élèves ont planté des arbres.', 'Qu’est-ce que les élèves ont planté ?'], ['Le concert a duré deux heures.', 'Combien de temps a duré le concert ?'], ['Je lis le journal sur mon portable.', 'Comment tu lis le journal ?']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris une nouvelle brève pour le site de la classe (vraie ou inventée). Réponds à : qui ? quoi ? où ? quand ?', stufe: 2,
        anfaenge: ['Titre : …', 'Le … (quand), …', 'à … (où), …', 'ils / elles ont …', '« … », explique …'], zeilen: 9,
        beispiel: 'Notre classe gagne le quiz ! Vendredi dernier, à la bibliothèque de Mersch, notre classe a participé au grand quiz des écoles. Nous avons répondu à 18 questions sur 20 et nous avons gagné ! « C’était super », explique Sami.' },
    ],
    check: ['Je connais les médias.', 'Je comprends l’essentiel d’une nouvelle courte.', 'Je pose des questions avec qui, quoi, où, quand, comment, pourquoi, combien.', 'Je comprends un flash info.', 'J’écris une nouvelle brève.'],
  },
  // ================================================================ 2
  {
    thema: 'Donner son avis · il manque · ce que, ce qui', titel: 'Et toi, tu en penses quoi ?', untertitel: 'Pour ou contre ? Tu lis l’avis de jeunes sur leur commune, tu écoutes un débat et tu donnes ton opinion.',
    ziel: { fr: 'Je comprends une opinion et je dis si je suis pour ou contre.', de: 'Ich verstehe Meinungen und sage, ob ich dafür oder dagegen bin.' },
    bild: ['tom:verwirrt:verschraenkt', 'amira:froh:erklaeren'],
    start: {
      was: 'Pour ou contre ?',
      aufgaben: [
        { art: 'rf', auftrag: 'La personne est pour ou contre ? Coche.', stufe: 1, spalten: ['pour', 'contre'], saetze: [['Je suis d’accord.', true], ['Je ne suis pas d’accord.', false], ['C’est une bonne idée !', true], ['À mon avis, c’est nul.', false], ['J’adore cette idée.', true], ['Je trouve ça mauvais.', false]] },
      ],
    },
    lesen: {
      was: 'Un forum', art: 'profile', stimme: 'w1',
      quelle: 'Forum du journal des jeunes (personnes imaginaires)', titel: 'Ma commune, mon avis',
      profile: [
        { name: 'Ana', bild: 'lina:froh:erklaeren', stimme: 'w2', text: '**Ce que j’aime** dans ma commune, c’est le grand parc. Il y a beaucoup d’arbres et une piscine en plein air. Mais **il manque** un endroit pour les jeunes le soir.' },
        { name: 'Tom', bild: 'tom:verwirrt:stehen', stimme: 'm3', text: 'Je ne suis pas content. **Il y a trop de** voitures et de bruit dans la rue principale. **Il n’y a aucune** piste cyclable pour aller au lycée. Je suis **pour** une rue sans voitures le samedi !' },
        { name: 'Sofia', bild: 'jana:froh:stehen', stimme: 'w3', text: 'Moi, je suis **contre** une rue sans voitures : les magasins vont perdre des clients. **Ce qui** me plaît, c’est le nouveau cinéma. Mais les places coûtent trop cher.' },
      ],
      woerter: [['la commune', 'die Gemeinde'], ['en plein air', 'im Freien'], ['il manque', 'es fehlt'], ['le bruit', 'der Lärm'], ['la rue principale', 'die Hauptstraße'], ['la piste cyclable', 'der Radweg'], ['être pour / contre', 'dafür / dagegen sein'], ['perdre', 'verlieren']],
      aufgaben: [
        { art: 'wer', auftrag: 'Qui dit ça ? Coche.', stufe: 1, personen: ['Ana', 'Tom', 'Sofia'], saetze: [['Il y a trop de bruit.', 'Tom'], ['Il manque un endroit pour les jeunes.', 'Ana'], ['Je suis contre une rue sans voitures.', 'Sofia'], ['J’aime le grand parc.', 'Ana'], ['Je suis pour une rue sans voitures.', 'Tom']] },
        { art: 'tabelle', auftrag: 'Positif ou négatif ? Complète.', stufe: 2, kopf: ['', '+ positif', '– négatif'], breiten: [16, 42, 42], zeilen: [['Ana', '[le grand parc, la piscine en plein air]', '[il manque un endroit pour les jeunes]'], ['Tom', '—', '[trop de voitures et de bruit, aucune piste cyclable]'], ['Sofia', '[le nouveau cinéma]', '[les places coûtent trop cher]']] },
      ],
    },
    hoeren: {
      was: 'Un débat', wo: 'Conseil de classe · salle 12', titel: 'Le portable à la récré : pour ou contre ?',
      situation: 'Au conseil de classe, les délégués discutent avec Mme Nouvelle : est-ce qu’on peut utiliser le portable pendant la récréation ?',
      bild: ['lehrerin:froh:erklaeren', 'ben:froh:stehen'], sprecher: { 'Mme Nouvelle': 'w1', Ben: 'm3', Inès: 'w3', Rui: 'm1' },
      text: [
        ['Mme Nouvelle', 'Bonjour à tous. Aujourd’hui, une question : le portable pendant la récréation, vous êtes pour ou contre ? Ben ?'],
        ['Ben', 'Moi, je suis pour. Pendant la récré, on peut écouter de la musique ou envoyer un message. Ce n’est pas grave.'],
        ['Inès', 'Je ne suis pas d’accord. Avec le portable, personne ne parle. Tout le monde regarde son écran. Ce que je préfère, c’est jouer dehors avec les copains.'],
        ['Rui', 'Moi, je suis d’accord avec Inès. Et parfois, il y a des photos ou des vidéos de la cour sur internet. Ça, ce n’est pas bien.'],
        ['Ben', 'Bon… Peut-être le portable seulement dans un coin de la cour ?'],
        ['Mme Nouvelle', 'C’est un bon compromis ! On vote la semaine prochaine.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Les délégués de classe … Coche.', stufe: 1, fragen: [{ f: '', o: ['parlent pour les élèves de la classe', 'donnent les notes'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute. Pour ou contre ? Pourquoi ?', stufe: 1, kopf: ['', 'pour ou contre ?', 'pourquoi ?'], breiten: [16, 24, 60], zeilen: [['Ben', '[pour]', '[on peut écouter de la musique, envoyer un message]'], ['Inès', '[contre]', '[personne ne parle ; elle préfère jouer dehors]'], ['Rui', '[contre]', '[des photos ou des vidéos de la cour sur internet]']] },
        { art: 'mc', auftrag: 'Quelle est l’idée de compromis ? Coche.', stufe: 2, fragen: [{ f: '', o: ['le portable seulement dans un coin de la cour', 'le portable partout'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Faites un petit débat : « Des devoirs le week-end : pour ou contre ? »', stufe: 3, karten: [
        { titel: 'Donner son avis', text: ['Je suis pour / contre …', 'À mon avis, …', 'Ce que je préfère, c’est …'] },
        { titel: 'Réagir', text: ['Je suis d’accord avec …', 'Je ne suis pas d’accord.', 'C’est une bonne idée, mais …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ce qui va et ce qui ne va pas', punkte: ['**Il y a** un parc. · Il y a **trop de** bruit.', '**Il n’y a pas de** cinéma.', '**Il n’y a aucun** lycée.', '**Il manque** un endroit pour les jeunes.', 'Il y a **assez de** / **peu de** places.'] },
         { titel: 'Donner son opinion', punkte: ['Je suis **pour** / **contre** …', 'Je suis **d’accord** avec toi.', 'Je **ne** suis **pas d’accord**.', '**À mon avis**, … · **Je pense que** …', 'C’est une **bonne** / **mauvaise** idée.'] }],
        [{ art: 'tipp', titel: 'ce que · ce qui', text: '**Ce que** j’aime, c’est le parc. (j’aime → ce **que**) · **Ce qui** me plaît, c’est le cinéma. (… me plaît → ce **qui**)' },
         { art: 'achtung', titel: 'aucun, aucune', text: '**aucun** lycée (masculin) · **aucune** piste (féminin) · toujours avec **ne** : Il **n’**y a **aucun** bus.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec il y a trop de, il manque, il n’y a aucun ou il n’y a aucune.', stufe: 1, saetze: ['La rue est très bruyante : [il y a trop de] voitures.', 'Les jeunes n’ont pas d’endroit pour se rencontrer : [il manque] une maison des jeunes.', 'Pas un seul bus le dimanche : [il n’y a aucun] bus.', 'Pas une seule piste cyclable : [il n’y a aucune] piste cyclable.'] },
      { art: 'luecken', auftrag: 'Complète avec ce que ou ce qui.', stufe: 2, saetze: ['[Ce que] j’aime, c’est la piscine.', '[Ce qui] me plaît, c’est le parc.', '[Ce que] je déteste, c’est le bruit.', '[Ce qui] est super, c’est le cinéma.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris ton avis sur ta commune (ou sur une commune imaginaire) pour le forum.', stufe: 2,
        anfaenge: ['Ce que j’aime dans ma commune, c’est …', 'Il y a … · Il y a trop de …', 'Il manque …', 'Je suis pour / contre …', 'À mon avis, …'], zeilen: 9,
        beispiel: 'Ce que j’aime dans ma commune, c’est le terrain de basket. Il y a aussi une belle forêt. Mais il y a trop de voitures devant l’école. Il manque un passage pour piétons. Je suis pour un bus le dimanche. À mon avis, c’est une bonne idée pour les jeunes.' },
    ],
    check: ['Je comprends l’avis de jeunes.', 'Je reconnais si une personne est pour ou contre.', 'J’utilise il y a trop de, il manque, il n’y a aucun.', 'J’utilise ce que et ce qui.', 'Je donne mon opinion par écrit.'],
  },
  // ================================================================ 3
  {
    thema: 'Les envies · les projets · le pronom y', titel: 'Ce week-end, on y va !', untertitel: 'Concert, cinéma, ateliers : tu lis le programme d’un festival, tu écoutes des amis faire des projets et tu écris ton programme.',
    ziel: { fr: 'Je dis ce que j’ai envie de faire et j’écris un programme.', de: 'Ich sage, was ich machen möchte, und schreibe ein Programm.' },
    bild: ['mia:froh:handy', 'ben:froh:laessig'],
    start: {
      was: 'Les envies',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['J’ai envie de danser.', 'J’ai faim.', 'Je voudrais un billet.', 'Je vais au concert.', 'J’ai peur.'], rechts: ['Ich habe Lust zu tanzen.', 'Ich habe Hunger.', 'Ich hätte gern eine Karte.', 'Ich gehe ins Konzert.', 'Ich habe Angst.'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Un programme et un message', art: 'dokumente',
      quelle: 'Affiche d’un festival et message sur le portable (imaginaires)', titel: 'Le Festival des Jeunes',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Festival des Jeunes** – Parc de la Ville, Mersch · 19 et 20 juin · entrée gratuite', text: ['**Samedi 19 juin :** 14 h atelier graffiti (sur inscription) · 16 h tournoi de basket · 20 h concert de Nora Valen', '**Dimanche 20 juin :** 10 h course de 5 km · 14 h atelier radio : fais ton émission ! · 21 h 30 cinéma en plein air : « Le Phare des étoiles »', 'Stands de nourriture · Bus gratuits de la gare de Mersch toutes les 30 minutes'] },
        { stil: 'nachricht', stimme: 'w3', kopf: 'Message de Mia à Ben', text: ['Ben ! Tu as vu le programme du festival ? J’ai trop envie de voir Nora Valen ! Tu **y** vas samedi ? On prend le bus ensemble ?'] },
      ],
      woerter: [['l’entrée gratuite', 'freier Eintritt'], ['sur inscription', 'mit Anmeldung'], ['le tournoi', 'das Turnier'], ['la course', 'der Lauf'], ['en plein air', 'im Freien'], ['le stand', 'der Stand'], ['toutes les 30 minutes', 'alle 30 Minuten'], ['avoir envie de', 'Lust haben auf']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète le programme.', stufe: 1, kopf: ['jour', 'heure', 'activité'], breiten: [24, 20, 56], zeilen: [['samedi', '[14 h]', '[atelier graffiti]'], ['samedi', '[16 h]', '[tournoi de basket]'], ['samedi', '20 h', '[concert de Nora Valen]'], ['dimanche', '[10 h]', '[course de 5 km]'], ['dimanche', '[21 h 30]', '[cinéma en plein air]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['L’entrée du festival est gratuite.', true], ['Pour l’atelier graffiti, il faut s’inscrire.', true], ['Le film est le samedi soir.', false], ['Il y a des bus gratuits de la gare.', true]] },
      ],
    },
    hoeren: {
      was: 'Des projets', wo: 'Au téléphone · vendredi soir', titel: 'Tu y vas ?',
      situation: 'Vendredi soir, Ben appelle Mia. Ils organisent leur week-end au festival.',
      bild: ['ben:froh:handy', 'mia:froh:handy'], sprecher: { Ben: 'm3', Mia: 'w3' },
      text: [
        ['Ben', 'Salut Mia ! Alors, le festival, tu y vas samedi ?'],
        ['Mia', 'Oui, j’y vais ! J’ai envie de voir le concert de Nora Valen à vingt heures.'],
        ['Ben', 'Moi aussi ! Mais avant, je voudrais faire le tournoi de basket à seize heures. Tu viens avec moi ?'],
        ['Mia', 'Le basket ? Bof… Je vais plutôt à l’atelier graffiti à quatorze heures. Je me suis déjà inscrite.'],
        ['Ben', 'D’accord. Alors on se retrouve à dix-neuf heures trente devant la scène ?'],
        ['Mia', 'Parfait. Et dimanche, tu fais la course ?'],
        ['Ben', 'Non, je n’ai pas envie de courir cinq kilomètres ! Mais je vais au cinéma en plein air.'],
        ['Mia', 'Super, moi aussi ! À demain !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour dire ce qu’on veut faire, on dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['J’ai envie de …', 'Je voudrais …', 'Je déteste …'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète l’agenda.', stufe: 1, kopf: ['', 'Mia', 'Ben'], breiten: [26, 37, 37], zeilen: [['samedi, 14 h', '[atelier graffiti]', '—'], ['samedi, 16 h', '—', '[tournoi de basket]'], ['samedi, 19 h 30', '[rendez-vous devant la scène]', '[rendez-vous devant la scène]'], ['dimanche, 21 h 30', '[cinéma en plein air]', '[cinéma en plein air]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Organisez votre week-end au festival à deux. Choisissez trois activités.', stufe: 3, karten: [
        { titel: 'Proposer', text: ['J’ai envie de …', 'Tu viens avec moi ?', 'On se retrouve à … devant …'] },
        { titel: 'Répondre', text: ['Oui, j’y vais !', 'Non, je n’ai pas envie de …', 'Je préfère …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Dire ce qu’on veut', punkte: ['**J’ai envie de** voir le concert. (+ infinitif)', '**Je voudrais** faire du basket. (poli)', '**Je veux** un billet ! (direct)', '**Je vais** aller au festival. (futur proche)', 'Négation : je **n’ai pas envie de** courir.'] },
         { titel: 'Le pronom y', punkte: ['**y** = là-bas (un lieu)', 'Tu vas au festival ? – Oui, j’**y** vais.', 'Tu vas à la piscine ? – Non, je **n’y** vais **pas**.', 'On **y** va ! = Allons-y !'] }],
        [{ art: 'tipp', titel: 'Les moments', text: '**à** 14 heures · **de** 14 h **à** 16 h · **le** 19 juin · **ce** week-end · **samedi** soir · **toutes les** 30 minutes' },
         { art: 'achtung', titel: 'déjà · pas encore', text: 'Tu t’es inscrite ? – Oui, je me suis **déjà** inscrite. · Non, **pas encore**.' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Réponds avec y.', stufe: 1, kopf: ['question', 'réponse'], saetze: [['Tu vas au festival ? (oui)', 'Oui, j’y vais.'], ['Tu vas à la course ? (non)', 'Non, je n’y vais pas.'], ['Vous allez au cinéma ? (oui)', 'Oui, nous y allons.']] },
      { art: 'luecken', auftrag: 'Complète avec j’ai envie de, je voudrais ou je vais.', stufe: 2, woerter: ['j’ai envie de', 'je voudrais', 'je vais'], saetze: ['Il fait chaud : [j’ai envie de] manger une glace !', 'Au guichet : « Bonjour, [je voudrais] deux billets, s’il vous plaît. »', 'Demain, [je vais] aller au festival.'] },
    ],
    schreiben: [
      { art: 'tabelle', auftrag: 'Écris ton programme pour un week-end (vrai ou imaginaire).', stufe: 1, kopf: ['jour', 'heure', 'activité'], breiten: [24, 20, 56], zeilen: [['samedi', '', ''], ['samedi', '', ''], ['dimanche', '', ''], ['dimanche', '', '']] },
      { art: 'schreiben', auftrag: 'Écris un message à un copain ou à une copine : propose ton programme.', stufe: 2,
        anfaenge: ['Salut … !', 'Ce week-end, j’ai envie de …', 'Samedi à …, je vais …', 'Tu viens avec moi ?', 'On se retrouve à … devant …'], zeilen: 7,
        beispiel: 'Salut Rui ! Ce week-end, j’ai envie d’aller au festival. Samedi à 16 heures, je vais faire le tournoi de basket. Tu viens avec moi ? On se retrouve à 15 h 30 devant la gare !' },
    ],
    check: ['Je comprends le programme d’un festival.', 'Je dis ce que j’ai envie de faire.', 'J’utilise le pronom y.', 'Je comprends des projets à l’oral.', 'J’écris un programme.'],
  },
  // ================================================================ 4
  {
    thema: 'Le portrait · les dates · savoir et connaître', titel: 'Une star d’ici', untertitel: 'Née à Esch, chanteuse à vingt ans : tu lis le portrait d’une star, tu écoutes son interview et tu écris une biographie.',
    ziel: { fr: 'Je comprends le portrait d’une personne et j’écris une petite biographie.', de: 'Ich verstehe das Porträt einer Person und schreibe eine kurze Biografie.' },
    bild: ['jana:froh:tanzen', 'chloe:froh:handy'],
    start: {
      was: 'Les verbes d’une vie',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['naître', 'grandir', 'commencer', 'gagner', 'devenir', 'connaître'], rechts: ['geboren werden', 'aufwachsen', 'anfangen', 'gewinnen', 'werden', 'kennen'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un portrait', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Magazine des jeunes · rubrique « Portrait » (personne imaginaire)', titel: 'Nora Valen, la voix d’Esch',
      absaetze: [
        'Nora Valen **est née en 2006** à Esch-sur-Alzette. Elle a **grandi** dans une famille de musiciens : sa mère joue du violon et son grand-père chante dans une chorale.',
        '**À six ans**, elle a commencé le piano. **Pendant** son enfance, elle a chanté dans la chorale de l’école. Elle a écrit sa première chanson **à douze ans**.',
        '**En 2022**, elle a gagné un concours de jeunes talents à la télévision. **Depuis** ce jour, beaucoup de gens **connaissent** son nom.',
        '**Entre 2023 et 2025**, elle a donné plus de cent concerts au Luxembourg, en France et en Belgique. Elle chante en français, en anglais et en luxembourgeois.',
        'Aujourd’hui, Nora a vingt ans. **Ce qu’**elle aime le plus ? « Les concerts dans les petites salles, tout près du public. » Son nouvel album sort en mars.',
      ],
      woerter: [['naître (elle est née)', 'geboren werden'], ['grandir', 'aufwachsen'], ['l’enfance', 'die Kindheit'], ['la chanson', 'das Lied'], ['le concours', 'der Wettbewerb'], ['connaître', 'kennen'], ['le public', 'das Publikum'], ['sortir (un album)', 'erscheinen']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète la fiche biographique.', stufe: 1, kopf: ['quand ?', 'quoi ?'], breiten: [32, 68], zeilen: [['[en 2006]', 'Nora est née à Esch-sur-Alzette.'], ['à six ans', '[elle a commencé le piano]'], ['[à douze ans]', 'elle a écrit sa première chanson'], ['[en 2022]', 'elle a gagné un concours de jeunes talents'], ['entre 2023 et 2025', '[elle a donné plus de cent concerts]']] },
        { art: 'mc', auftrag: 'Coche.', stufe: 2, fragen: [{ f: 'Nora chante en …', o: ['français, anglais et luxembourgeois', 'allemand et portugais'], r: 0 }, { f: 'Elle préfère …', o: ['les grands stades', 'les petites salles'], r: 1 }] },
      ],
    },
    hoeren: {
      was: 'Une interview', wo: 'Radio des jeunes · studio', titel: 'Trois questions à Nora Valen',
      situation: 'À la radio des jeunes, Chloé interviewe la chanteuse Nora Valen avant son concert au festival.',
      bild: ['chloe:froh:handy', 'jana:froh:stehen'], sprecher: { Chloé: 'w2', Nora: 'w1' },
      text: [
        ['Chloé', 'Bonjour Nora, merci d’être là ! Comment est-ce que vous avez commencé la musique ?'],
        ['Nora', 'Bonjour ! J’ai commencé le piano à six ans. Mais je chante depuis toujours !'],
        ['Chloé', 'Quel a été le plus beau moment de votre carrière ?'],
        ['Nora', 'Le concours à la télévision, en 2022. J’ai eu très peur, mais j’ai gagné !'],
        ['Chloé', 'Vous connaissez beaucoup de stars ?'],
        ['Nora', 'Je connais quelques chanteurs, oui. Mais mes vrais amis, ce sont mes copains d’école à Esch.'],
        ['Chloé', 'Et vos projets ?'],
        ['Nora', 'Ce soir, je vais chanter au festival ! Et en mars, mon nouvel album va sortir. Je ne sais pas encore le titre… C’est un secret !'],
        ['Chloé', 'Merci, Nora, et bon concert !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Dans une interview, le ou la journaliste … Coche.', stufe: 1, fragen: [{ f: '', o: ['pose des questions', 'répond aux questions'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'Nora a commencé le piano …', o: ['à six ans', 'à douze ans'], r: 0 }, { f: 'Le plus beau moment : …', o: ['le concours à la télévision', 'son premier concert'], r: 0 }, { f: 'Ses vrais amis sont …', o: ['des stars', 'ses copains d’école'], r: 1 }, { f: 'Le titre du nouvel album, …', o: ['elle le sait déjà', 'elle ne le sait pas encore'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Préparez l’interview d’une star imaginaire et jouez-la.', stufe: 3, karten: [
        { titel: 'Journaliste', text: ['Comment avez-vous commencé ?', 'Quel a été le plus beau moment ?', 'Qu’est-ce que vous aimez ?', 'Quels sont vos projets ?'] },
        { titel: 'Star', text: ['J’ai commencé à … ans.', 'Le plus beau moment, c’est …', 'Ce que j’aime, c’est …', 'Je vais …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les dates et le temps', punkte: ['**en** 2006 · **en** mars', '**à** six ans', '**pendant** son enfance', '**depuis** ce jour · **à partir de** lundi', '**entre** 2023 **et** 2025 · **jusqu’en** 2025'] },
         { titel: 'savoir et connaître', tabelle: { kopf: ['', 'savoir', 'connaître'], zeilen: [['je', '**sais**', '**connais**'], ['tu', '**sais**', '**connais**'], ['il / elle', '**sait**', '**connaît**'], ['nous', '**savons**', '**connaissons**'], ['vous', '**savez**', '**connaissez**'], ['ils / elles', '**savent**', '**connaissent**']] } }],
        [{ art: 'tipp', titel: 'savoir ou connaître ?', text: '**savoir** + infinitif ou une information : Je **sais** chanter. Je **sais** où elle habite. · **connaître** + personne ou lieu : Je **connais** Nora. Je **connais** Esch.' },
         { art: 'achtung', titel: 'naître', text: 'Elle **est née** en 2006. · Il **est né** à Esch. (passé composé avec **être**)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec savoir ou connaître.', stufe: 1, saetze: ['Je [sais] jouer du piano.', 'Tu [connais] cette chanson ?', 'Elle [connaît] bien Esch.', 'Nous [savons] où est la salle.', 'Vous [connaissez] Nora Valen ?'] },
      { art: 'luecken', auftrag: 'Complète avec en, à, pendant ou entre.', stufe: 1, saetze: ['Elle est née [en] 2006.', '[À] six ans, elle a commencé le piano.', '[Pendant] son enfance, elle a chanté dans une chorale.', '[Entre] 2023 et 2025, elle a donné cent concerts.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris la biographie d’une personne que tu admires (réelle ou imaginaire).', stufe: 2,
        anfaenge: ['… est né(e) en … à …', 'À … ans, il / elle a commencé …', 'En …, il / elle a …', 'Aujourd’hui, il / elle …', 'Ce que j’admire, c’est …'], zeilen: 10,
        beispiel: 'Kevin Diallo est né en 2004 à Differdange. À sept ans, il a commencé le foot dans le club de sa ville. En 2021, il a joué son premier match en équipe nationale. Aujourd’hui, il joue en France. Ce que j’admire, c’est son courage.' },
    ],
    check: ['Je comprends le portrait d’une personne.', 'Je comprends une interview.', 'J’utilise en, à, pendant, entre, depuis.', 'Je fais la différence entre savoir et connaître.', 'J’écris une petite biographie.'],
  },
  // ================================================================ 5
  {
    thema: 'Les métiers · les qualités', titel: 'On cherche des talents !', untertitel: 'Présentatrice, caméraman, journaliste : tu lis des petites annonces, tu écoutes une interview sur un métier et tu prépares tes questions.',
    ziel: { fr: 'Je comprends une petite annonce et je parle des métiers et des qualités.', de: 'Ich verstehe eine Kleinanzeige und spreche über Berufe und Eigenschaften.' },
    bild: ['sami:froh:laptop', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Les métiers',
      aufgaben: [
        { art: 'luecken', auftrag: 'Écris le métier au féminin.', stufe: 1, saetze: ['un acteur → une [actrice]', 'un chanteur → une [chanteuse]', 'un journaliste → une [journaliste]', 'un présentateur → une [présentatrice]', 'un cuisinier → une [cuisinière]'] },
      ],
    },
    lesen: {
      was: 'Des petites annonces', art: 'dokumente',
      quelle: 'Panneau d’affichage de l’école (annonces imaginaires)', titel: 'Petites annonces',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**La radio des jeunes cherche…**', text: ['… des **présentateurs** et des **présentatrices** de 12 à 16 ans pour l’émission du mercredi. Tu es **curieux** ou **curieuse**, tu parles **clairement** et tu n’as pas peur du micro ? Écris-nous !'] },
        { stil: 'karte', stimme: 'm1', kopf: '**Le club vidéo cherche…**', text: ['… un **caméraman** ou une **camérawoman** pour filmer les matchs du samedi. Tu dois être **patient(e)**, **sérieux / sérieuse** et **organisé(e)**. Pas d’expérience ? Pas de problème : on t’apprend !'] },
        { stil: 'karte', stimme: 'w2', kopf: '**Le journal de l’école cherche…**', text: ['… des **journalistes** et des **photographes**. Tu aimes écrire, tu es **créatif** ou **créative** ? Rendez-vous lundi à 13 h, salle 108.'] },
      ],
      woerter: [['chercher', 'suchen'], ['le présentateur', 'der Moderator'], ['curieux, curieuse', 'neugierig'], ['clairement', 'deutlich'], ['filmer', 'filmen'], ['patient', 'geduldig'], ['sérieux, sérieuse', 'zuverlässig'], ['créatif, créative', 'kreativ']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Quelles qualités faut-il ?', stufe: 1, kopf: ['annonce', 'qualités'], breiten: [26, 74], zeilen: [['la radio', '[curieux ou curieuse, parler clairement, pas peur du micro]'], ['le club vidéo', '[patient, sérieux, organisé]'], ['le journal', '[aimer écrire, créatif ou créative]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Pour le club vidéo, il faut de l’expérience.', false], ['La radio cherche des jeunes de 12 à 16 ans.', true], ['Le rendez-vous du journal est lundi à 13 h.', true]] },
      ],
    },
    hoeren: {
      was: 'Une interview', wo: 'CDI du lycée · journal de l’école', titel: 'Votre métier, c’est comment ?',
      situation: 'Pour le journal de l’école, Sami interviewe Mme Duval, la documentaliste du lycée. Avant, elle a été journaliste.',
      bild: ['sami:froh:handy', 'lehrerin:froh:erklaeren'], sprecher: { Sami: 'm3', 'Mme Duval': 'w1' },
      text: [
        ['Sami', 'Bonjour, Madame Duval. Merci pour l’interview ! Quel est votre métier ?'],
        ['Mme Duval', 'Bonjour, Sami. Je suis documentaliste : je travaille au CDI, la bibliothèque du lycée. Je conseille les élèves et je commande les livres.'],
        ['Sami', 'Et avant, vous avez fait quoi ?'],
        ['Mme Duval', 'Avant, j’ai été journaliste pendant dix ans. J’ai écrit des articles pour un journal de Luxembourg.'],
        ['Sami', 'Pourquoi est-ce que vous avez changé de métier ?'],
        ['Mme Duval', 'Parce que j’aime travailler avec les jeunes. Et j’adore les livres !'],
        ['Sami', 'Quelles qualités faut-il pour ce métier ?'],
        ['Mme Duval', 'Il faut être curieux, patient et organisé. Et il faut aimer lire, bien sûr !'],
        ['Sami', 'Merci beaucoup, Madame.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour une interview, on prépare … Coche.', stufe: 1, fragen: [{ f: '', o: ['les questions', 'un micro ou un portable', 'un costume'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'Mme Duval est …', o: ['professeure de français', 'documentaliste'], r: 1 }, { f: 'Avant, elle a été …', o: ['journaliste', 'actrice'], r: 0 }, { f: 'Elle a changé de métier parce qu’…', o: ['elle aime travailler avec les jeunes', 'elle n’aime pas écrire'], r: 0 }] },
        { art: 'fragen', auftrag: 'Quelles qualités faut-il pour ce métier ?', stufe: 2, fragen: [{ f: '', l: 'être curieux, patient et organisé, aimer lire' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Préparez l’interview d’une personne de l’école (cuisinier, secrétaire, concierge …) et faites-la.', stufe: 3, karten: [
        { titel: 'Questions', text: ['Quel est votre métier ?', 'Qu’est-ce que vous faites le matin ?', 'Vous travaillez ici depuis quand ?', 'Qu’est-ce que vous aimez dans votre métier ?'] },
        { titel: 'Politesse', text: ['Bonjour, Madame / Monsieur.', 'Est-ce que je peux vous poser des questions ?', 'Pardon, vous pouvez répéter ?', 'Merci beaucoup !'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les métiers', tabelle: { kopf: ['masculin', 'féminin'], zeilen: [['un act**eur**', 'une act**rice**'], ['un chant**eur**', 'une chant**euse**'], ['un présentat**eur**', 'une présentat**rice**'], ['un cuisin**ier**', 'une cuisin**ière**'], ['un journaliste', 'une journaliste'], ['un photographe', 'une photographe']] } },
         { titel: 'Les qualités', tabelle: { kopf: ['il est …', 'elle est …'], zeilen: [['curieu**x**', 'curieu**se**'], ['sérieu**x**', 'sérieu**se**'], ['créat**if**', 'créat**ive**'], ['patient', 'patient**e**'], ['organisé', 'organisé**e**']] } }],
        [{ art: 'tipp', titel: 'Interviewer poliment', text: 'Dis **vous** à un adulte. · **Est-ce que je peux** vous poser une question ? · **Pardon, je n’ai pas compris. Vous pouvez répéter ?**' },
         { art: 'achtung', titel: 'Le pluriel', text: 'un journal → des journ**aux** · un métier → des métier**s** · il est curieux → ils sont curieu**x** (même forme)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Accorde la qualité.', stufe: 1, saetze: ['(créatif) Elle est très [créative].', '(sérieux) Ils sont [sérieux].', '(curieux) Mia est [curieuse].', '(patient) Les présentatrices sont [patientes].'] },
      { art: 'abschreiben', auftrag: 'Écris la question pour un adulte (vous).', stufe: 2, kopf: ['à un copain', 'à un adulte'], saetze: [['Tu fais quel métier ?', 'Vous faites quel métier ?'], ['Tu travailles ici depuis quand ?', 'Vous travaillez ici depuis quand ?'], ['Qu’est-ce que tu aimes ?', 'Qu’est-ce que vous aimez ?']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Réponds à une annonce : présente-toi et explique tes qualités (vraies ou imaginaires).', stufe: 2,
        anfaenge: ['Bonjour,', 'Je m’appelle … et j’ai … ans.', 'Je voudrais être … parce que …', 'Je suis … et …', 'Merci et à bientôt,'], zeilen: 9,
        beispiel: 'Bonjour, je m’appelle Inès et j’ai 13 ans. Je voudrais être présentatrice à la radio des jeunes parce que j’adore parler et écouter de la musique. Je suis curieuse et organisée. Je n’ai pas peur du micro ! Merci et à bientôt, Inès' },
    ],
    check: ['Je comprends une petite annonce.', 'Je connais des métiers au masculin et au féminin.', 'Je décris des qualités.', 'Je pose des questions polies avec vous.', 'J’écris une réponse à une annonce.'],
  },
  // ================================================================ 6
  {
    thema: 'Les films · comparer', titel: 'C’est le meilleur !', untertitel: 'Comédie, film d’action, film d’animation : tu lis un classement, tu écoutes deux amis comparer des films et tu compares toi-même.',
    ziel: { fr: 'Je compare des films et des séries et je dis ce que je préfère.', de: 'Ich vergleiche Filme und Serien und sage, was mir am besten gefällt.' },
    bild: ['ben:froh:sitzen', 'chloe:froh:sitzen'],
    start: {
      was: 'Les genres de films',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Les genres : relie.', stufe: 1, links: ['une comédie', 'un film d’action', 'un film d’horreur', 'un film d’animation', 'un film de science-fiction', 'une série policière'], rechts: ['eine Komödie', 'ein Actionfilm', 'ein Horrorfilm', 'ein Animationsfilm', 'ein Science-Fiction-Film', 'eine Krimiserie'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un classement et un avis', art: 'dokumente',
      quelle: 'Journal de la classe (films et sondage imaginaires)', titel: 'Le top 5 de la classe',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Nos films préférés** – sondage de la classe 7P2, 22 élèves', text: ['Numéro 1 : « Le Phare des étoiles », film d’aventure, 8 voix.', 'Numéro 2 : « Robots en vacances », film d’animation, 6 voix.', 'Numéro 3 : « Rire au collège », comédie, 4 voix.', 'Numéro 4 : « Planète Zéro », film de science-fiction, 3 voix.', 'Numéro 5 : « L’Ombre du port », série policière, 1 voix.'] },
        { stil: 'nachricht', stimme: 'm3', kopf: 'L’avis de Yusuf', text: ['« Robots en vacances » est **plus drôle que** « Le Phare des étoiles ». Les dessins sont **plus beaux** et l’histoire est **moins triste**. Pour moi, c’est **le meilleur** film de l’année ! Mais « Planète Zéro » est **aussi bien** : les effets spéciaux sont **les plus impressionnants**.'] },
      ],
      woerter: [['le classement', 'die Rangliste'], ['la voix', 'die Stimme'], ['la comédie', 'die Komödie'], ['plus … que', 'mehr … als'], ['moins … que', 'weniger … als'], ['aussi … que', 'genauso … wie'], ['le meilleur', 'der beste'], ['les effets spéciaux', 'die Spezialeffekte']],
      aufgaben: [
        { art: 'frei', auftrag: 'Regarde le graphique du sondage.', stufe: 1, html: balken('Nos films préférés (22 élèves)', [['« Le Phare des étoiles »', 8], ['« Robots en vacances »', 6], ['« Rire au collège »', 4], ['« Planète Zéro »', 3], ['« L’Ombre du port »', 1]], 'voix') },
        { art: 'mc', auftrag: 'Lis et coche.', stufe: 2, fragen: [{ f: 'Le film préféré de la classe, c’est …', o: ['« Robots en vacances »', '« Le Phare des étoiles »'], r: 1 }, { f: 'Combien d’élèves ont voté pour la comédie ?', o: ['3', '4', '6'], r: 1 }, { f: 'Pour Yusuf, le meilleur film, c’est …', o: ['« Robots en vacances »', '« Planète Zéro »'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Une discussion', wo: 'Dans le bus · après l’école', titel: 'Lequel est le meilleur ?',
      situation: 'Dans le bus, Ben et Chloé parlent de films et de séries.',
      bild: ['ben:froh:sitzen', 'chloe:froh:sitzen'], sprecher: { Ben: 'm3', Chloé: 'w2' },
      text: [
        ['Ben', 'Tu as vu « Planète Zéro » ? C’est le meilleur film de science-fiction de l’année !'],
        ['Chloé', 'Oui, je l’ai vu. Les effets spéciaux sont super, mais l’histoire est moins intéressante que dans « Le Phare des étoiles ».'],
        ['Ben', 'Pas d’accord ! « Le Phare des étoiles » est plus lent. Moi, je préfère l’action.'],
        ['Chloé', 'Et les séries ? Tu regardes « L’Ombre du port » ?'],
        ['Ben', 'Oui, mais la deuxième saison est moins bien que la première. Les acteurs jouent plus mal.'],
        ['Chloé', 'Moi, je trouve que l’actrice principale joue mieux que dans la première saison !'],
        ['Ben', 'Bon, on n’est jamais d’accord, nous deux !'],
        ['Chloé', 'C’est vrai ! Mais on est d’accord sur une chose : « Robots en vacances » est aussi drôle que « Rire au collège » !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour comparer, on dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['plus … que', 'moins … que', 'avec … et'], r: [0, 1] }] }],
      beim: [
        { art: 'wer', auftrag: 'Écoute. Qui pense ça ?', stufe: 1, personen: ['Ben', 'Chloé'], saetze: [['« Planète Zéro » est le meilleur film de science-fiction.', 'Ben'], ['L’histoire de « Planète Zéro » est moins intéressante.', 'Chloé'], ['« Le Phare des étoiles » est plus lent.', 'Ben'], ['L’actrice principale joue mieux.', 'Chloé'], ['« Robots en vacances » est aussi drôle que « Rire au collège ».', ['Ben', 'Chloé']]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Comparez deux films, séries ou jeux. Êtes-vous d’accord ?', stufe: 3, karten: [
        { titel: 'Comparer', text: ['… est plus … que …', '… est moins … que …', '… est aussi … que …', 'C’est le meilleur ! · C’est le pire !'] },
        { titel: 'Réagir', text: ['Je suis d’accord.', 'Pas d’accord !', 'Pour moi, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Le comparatif', punkte: ['**plus** drôle **que** (+)', '**moins** triste **que** (–)', '**aussi** bien **que** (=)', 'bon → **meilleur** (pas « plus bon » !)', 'bien → **mieux** : Elle joue **mieux**.'] },
         { titel: 'Le superlatif', punkte: ['**le plus** drôle · **la plus** belle', '**les plus** impressionnants', '**le moins** cher', '**le meilleur** film · **la meilleure** série', '**le pire** = le plus mauvais'] }],
        [{ art: 'tipp', titel: 'bien, mal · bon, mauvais', text: 'Il joue **bien** / **mal** (avec un verbe). · C’est un **bon** / **mauvais** film (avec un nom).' },
         { art: 'achtung', titel: 'L’accord', text: 'Les dessins sont plus **beaux**. · La série est plus **drôle**. · Les actrices sont les plus **connues**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Regarde les notes. Complète avec plus, moins ou aussi.', stufe: 1, saetze: ['« Robots en vacances » (8/10) est [plus] drôle que « L’Ombre du port » (4/10).', 'Une série policière (6/10) est [moins] drôle qu’une comédie (9/10).', 'Ce film (7/10) est [aussi] bien que l’autre (7/10).'] },
      { art: 'luecken', auftrag: 'Complète avec meilleur, meilleure ou mieux.', stufe: 2, saetze: ['C’est le [meilleur] film de l’année !', 'Elle chante [mieux] que moi.', 'La [meilleure] série, c’est « L’Ombre du port ».', 'Tu joues [mieux] au basket maintenant.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Compare deux films, séries ou jeux que tu connais (ou des titres inventés).', stufe: 2,
        anfaenge: ['… est un film / une série …', '… est plus … que …', '… est moins … que …', 'Pour moi, le meilleur, c’est … parce que …'], zeilen: 9,
        beispiel: '« Rire au collège » est une comédie et « Planète Zéro » est un film de science-fiction. « Rire au collège » est plus drôle que « Planète Zéro ». Mais les effets spéciaux de « Planète Zéro » sont plus impressionnants. Pour moi, le meilleur, c’est « Planète Zéro » parce que j’adore l’espace.' },
    ],
    check: ['Je connais des genres de films.', 'Je comprends un classement.', 'J’utilise plus, moins, aussi … que.', 'J’utilise meilleur et mieux.', 'Je compare par écrit.'],
  },
  // ================================================================ 7
  {
    thema: 'Les faits divers · raconter au passé', titel: 'Incroyable mais vrai !', untertitel: 'Une vache sur la route, un chien dans la rivière : tu lis un fait divers, tu écoutes un reportage et tu racontes un événement.',
    ziel: { fr: 'Je comprends et je raconte un fait divers au passé.', de: 'Ich verstehe eine Kurzmeldung und erzähle ein Ereignis in der Vergangenheit.' },
    bild: ['noah:ueberrascht:handy', 'oma:froh:stehen'],
    start: {
      was: 'Raconter dans l’ordre',
      aufgaben: [
        { art: 'ordnen', auftrag: 'Mets les mots dans l’ordre d’une histoire.', stufe: 1, teile: ['D’abord', 'Ensuite', 'Finalement'], ordnung: [2, 0, 1] },
      ],
    },
    lesen: {
      was: 'Un fait divers', art: 'text', stimme: 'm1', nummern: true,
      quelle: 'Journal régional · rubrique « Faits divers » (histoire imaginaire)', titel: 'Une vache en promenade',
      absaetze: [
        'Mardi matin, à Hosingen, une vache **est sortie** de son pré. Elle **a marché** tranquillement sur la route nationale.',
        '**D’abord**, un automobiliste **a vu** l’animal et **a appelé** la police. **Ensuite**, les voitures **se sont arrêtées** pendant vingt minutes.',
        '**Puis**, un jeune agriculteur de 17 ans **est arrivé** avec un seau de pommes. La vache l’**a suivi** jusqu’au pré !',
        '**Finalement**, tout le monde **a applaudi**. « Je n’ai **jamais** vu ça ! », raconte une conductrice. Il n’y a pas eu de blessés.',
      ],
      woerter: [['le fait divers', 'die Kurzmeldung'], ['le pré', 'die Weide'], ['tranquillement', 'ruhig'], ['l’automobiliste', 'der Autofahrer'], ['s’arrêter', 'anhalten'], ['l’agriculteur', 'der Landwirt'], ['le seau', 'der Eimer'], ['suivre (il a suivi)', 'folgen']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Mets l’histoire dans l’ordre.', stufe: 1, teile: ['Une vache est sortie de son pré.', 'Un automobiliste a appelé la police.', 'Les voitures se sont arrêtées.', 'Un jeune agriculteur est arrivé avec des pommes.', 'La vache l’a suivi jusqu’au pré.', 'Tout le monde a applaudi.'], ordnung: [3, 0, 5, 2, 4, 1] },
        { art: 'tabelle', auftrag: 'Réponds aux questions.', stufe: 2, kopf: ['question', 'réponse'], breiten: [32, 68], zeilen: [['Quand ?', '[mardi matin]'], ['Où ?', '[à Hosingen, sur la route nationale]'], ['Qui ?', '[une vache, un automobiliste, un jeune agriculteur]'], ['Combien de temps ?', '[vingt minutes]']] },
      ],
    },
    hoeren: {
      was: 'Un reportage', wo: 'Journal télévisé des jeunes', titel: 'Un chien sauvé de la Moselle',
      situation: 'Au journal télévisé des jeunes, une journaliste raconte un fait divers. Ensuite, elle interviewe un témoin.',
      bild: ['lehrerin:froh:erklaeren', 'opa:froh'], sprecher: { Journaliste: 'w1', Témoin: 'm2' },
      text: [
        ['Journaliste', 'Bonsoir ! Hier après-midi, à Remich, un petit chien est tombé dans la Moselle. Le courant était fort.'],
        ['Journaliste', 'Un jeune homme de 19 ans, Kevin, a vu le chien. Il n’a pas sauté dans l’eau : il a appelé les pompiers et il a lancé une bouée. Les pompiers sont arrivés dix minutes plus tard et ils ont sorti le chien de l’eau.'],
        ['Journaliste', 'Monsieur, vous avez vu la scène ?'],
        ['Témoin', 'Oui ! D’abord, j’ai entendu la propriétaire crier. Puis j’ai vu le jeune homme courir avec la bouée. Il est resté très calme !'],
        ['Journaliste', 'Et le chien ?'],
        ['Témoin', 'Il va bien. Il a un peu froid, mais il a déjà mangé ! Je n’ai jamais vu un chien aussi content.'],
        ['Journaliste', 'Une belle histoire pour finir la semaine. Bonne soirée !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un témoin, c’est une personne qui … Coche.', stufe: 1, fragen: [{ f: '', o: ['a vu quelque chose', 'écrit un journal'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['question', 'réponse'], breiten: [36, 64], zeilen: [['Quand ?', '[hier après-midi]'], ['Où ?', '[à Remich, dans la Moselle]'], ['Qu’est-ce qui s’est passé ?', '[un petit chien est tombé dans l’eau]'], ['Qu’est-ce que Kevin a fait ?', '[il a appelé les pompiers et il a lancé une bouée]'], ['Comment va le chien ?', '[il va bien, il a déjà mangé]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Raconte un petit événement (vrai ou inventé) : un jour incroyable, un moment drôle …', stufe: 3, karten: [
        { titel: 'Raconter', text: ['D’abord, …', 'Ensuite, …', 'Puis, …', 'Finalement, …'] },
        { titel: 'Réagir', text: ['Incroyable !', 'Et après ?', 'Je n’ai jamais vu ça !'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Raconter au passé composé', punkte: ['**avoir** : il **a vu** · il **a appelé** · il **a suivi**', '**être** : elle **est sortie** · il **est arrivé**', 'pronominal : les voitures **se sont arrêtées**', 'Les connecteurs : **d’abord**, **ensuite**, **puis**, **après**, **finalement**'] },
         { titel: 'déjà · jamais · encore', punkte: ['J’ai **déjà** vu ça. ≠ Je **n’**ai **jamais** vu ça.', 'Tu as **déjà** mangé ? – Non, **pas encore**.', 'Il est **encore** là ? – Non, il **n’**est **plus** là.', '**avant** l’accident · **après** le reportage'] }],
        [{ art: 'tipp', titel: 'Un bon résumé', text: 'Note des **mots-clés** : quand ? où ? qui ? quoi ? Puis écris des phrases **courtes** au passé composé.' },
         { art: 'achtung', titel: 'Sécurité', text: 'Une personne ou un animal dans l’eau ? Ne saute pas ! Appelle le **112** et cherche une **bouée**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète au passé composé.', stufe: 1, saetze: ['(voir) Un automobiliste [a vu] la vache.', '(arriver) L’agriculteur [est arrivé] avec des pommes.', '(tomber) Le chien [est tombé] dans l’eau.', '(appeler) Kevin [a appelé] les pompiers.', '(applaudir) Les gens [ont applaudi].'] },
      { art: 'luecken', auftrag: 'Complète avec déjà, jamais ou pas encore.', stufe: 2, saetze: ['Je n’ai [jamais] vu une vache sur la route.', 'Tu as [déjà] fini ton article ? – Oui !', 'Le film n’a [pas encore] commencé.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Résume l’histoire du chien (ou invente un fait divers) en cinq phrases.', stufe: 2,
        anfaenge: ['Hier, à …,', 'D’abord, …', 'Ensuite, …', 'Puis, …', 'Finalement, …'], zeilen: 9,
        beispiel: 'Hier, à Remich, un petit chien est tombé dans la Moselle. D’abord, Kevin a vu le chien. Ensuite, il a appelé les pompiers et il a lancé une bouée. Puis, les pompiers ont sorti le chien de l’eau. Finalement, le chien a mangé et il va bien.' },
    ],
    check: ['Je comprends un fait divers.', 'Je comprends un reportage à l’oral.', 'J’utilise d’abord, ensuite, puis, finalement.', 'J’utilise déjà, jamais, pas encore.', 'Je raconte un événement au passé.'],
  },
  // ================================================================ 8
  {
    thema: 'Le reportage · la météo · les transports', titel: 'Envoyé spécial', untertitel: 'Un week-end au camping, la météo, le voyage : tu lis le reportage d’une classe, tu écoutes la radio et tu écris ton reportage.',
    ziel: { fr: 'Je décris un événement : ce qui s’est passé, où et quand.', de: 'Ich beschreibe ein Ereignis: was passiert ist, wo und wann.' },
    bild: ['lea:froh:laptop', 'yusuf:froh:handy'],
    start: {
      was: 'La météo',
      aufgaben: [
        { art: 'rf', auftrag: 'Présent ou passé ? Coche.', stufe: 1, spalten: ['présent', 'passé'], saetze: [['Il fait beau.', true], ['Il a fait beau.', false], ['Il pleut.', true], ['Il a plu.', false], ['Il y a eu du vent.', false], ['Il neige.', true]] },
      ],
    },
    lesen: {
      was: 'Un reportage', art: 'text', stimme: 'w2', nummern: true,
      quelle: 'Site internet de la classe 7P2 · reportage (personnes imaginaires)', titel: 'Notre week-end au camping',
      absaetze: [
        'Le vendredi 11 juin, notre classe **est partie** en train à Diekirch. **D’abord**, nous **avons marché** trois kilomètres jusqu’au camping Les Trois Sapins, au bord de la Sûre.',
        '**Ensuite**, nous **avons monté** les tentes. Ce n’était pas facile ! **Puis**, Mme Nouvelle **a préparé** des pâtes sur le réchaud.',
        'Samedi, il **a fait** très beau : 26 degrés ! Nous **avons fait** du kayak sur la rivière et nous **avons joué** au foot. Le soir, nous **avons chanté** autour du feu.',
        'Dimanche matin, il **a plu**. Nous **sommes restés** sous la grande tente et nous **avons joué** aux cartes. À midi et quart, nous **sommes rentrés** en bus.',
        '**Ce qui** nous a plu le plus ? Le kayak ! **Ce qui** nous a moins plu ? La pluie… et les moustiques ! Reportage : Léa et Yusuf',
      ],
      woerter: [['le reportage', 'die Reportage'], ['monter une tente', 'ein Zelt aufbauen'], ['le réchaud', 'der Campingkocher'], ['il a plu', 'es hat geregnet'], ['rester', 'bleiben'], ['rentrer', 'zurückfahren'], ['le moustique', 'die Mücke'], ['ça m’a plu', 'das hat mir gefallen']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète le week-end.', stufe: 1, kopf: ['jour', 'le temps', 'activités'], breiten: [18, 28, 54], zeilen: [['vendredi', '—', '[train, marche de 3 km, tentes, pâtes]'], ['samedi', '[très beau, 26 degrés]', '[kayak, foot, chansons autour du feu]'], ['dimanche', '[il a plu]', '[cartes sous la grande tente, retour en bus]']] },
        { art: 'mc', auftrag: 'Coche.', stufe: 2, fragen: [{ f: 'La classe est allée au camping …', o: ['en train, puis à pied', 'en voiture'], r: 0 }, { f: 'Ce qui a plu le plus, c’est …', o: ['le kayak', 'la pluie'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'La radio', wo: 'Camping · dimanche matin', titel: 'Météo et circulation',
      situation: 'Dimanche matin, au camping, Yusuf écoute la radio sur son portable : la météo et les infos sur la circulation.',
      bild: ['yusuf:froh:handy', 'lehrerin:froh'], sprecher: { Radio: 'm2', Yusuf: 'm3', 'Mme Nouvelle': 'w1' },
      text: [
        ['Radio', 'Bonjour, il est huit heures. La météo d’aujourd’hui : ce matin, il pleut dans tout le pays. Cet après-midi, le soleil va revenir, avec dix-neuf degrés.'],
        ['Radio', 'La circulation : attention, à cause de la pluie, la route entre Diekirch et Ettelbruck est fermée jusqu’à midi. Les bus prennent une autre route. Les trains roulent normalement.'],
        ['Yusuf', 'Madame Nouvelle ! La route pour Ettelbruck est fermée jusqu’à midi !'],
        ['Mme Nouvelle', 'Merci, Yusuf ! Ce n’est pas grave : notre bus part à midi et quart. Et cet après-midi, il va faire beau.'],
        ['Yusuf', 'Super ! Alors, on a encore le temps de jouer aux cartes !'],
      ],
      vor: [{ art: 'mc', auftrag: 'À la radio, après les nouvelles, on entend souvent … Coche.', stufe: 1, fragen: [{ f: '', o: ['la météo', 'la circulation', 'une recette de cuisine'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'info'], breiten: [44, 56], zeilen: [['ce matin', '[il pleut]'], ['cet après-midi', '[le soleil revient, 19 degrés]'], ['la route Diekirch – Ettelbruck', '[fermée jusqu’à midi]'], ['les trains', '[ils roulent normalement]'], ['le bus de la classe part à …', '[midi et quart]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Présentez la météo et la circulation comme à la radio (vous pouvez inventer).', stufe: 3, karten: [
        { titel: 'La météo', text: ['Ce matin, il …', 'Cet après-midi, il va …', 'Il fait … degrés.'] },
        { titel: 'La circulation', text: ['La route … est fermée.', 'Le train a … minutes de retard.', 'Les bus roulent normalement.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'La météo au passé et au futur', punkte: ['Il **a fait** beau / froid.', 'Il **a plu**. · Il **a neigé**.', 'Il **y a eu** du vent / un orage.', 'Futur proche : il **va faire** beau. · il **va pleuvoir**.'] },
         { titel: 'Écrire un reportage', punkte: ['**Quand ?** le vendredi 11 juin', '**Où ?** au camping, à Diekirch', '**Qui ?** notre classe', '**Quoi ?** les activités, dans l’ordre', '**Ton avis :** ce qui t’a plu ou moins plu'] }],
        [{ art: 'tipp', titel: 'Ce qui m’a plu', text: '**Ce qui** m’a plu, c’est le kayak. · **Ce que** j’ai aimé, c’est le feu de camp.' },
         { art: 'achtung', titel: 'être ou avoir ?', text: 'Nous **sommes** partis · restés · rentrés. · Nous **avons** marché · joué · chanté.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète au passé composé.', stufe: 1, saetze: ['(partir) Notre classe [est partie] en train.', '(monter) Nous [avons monté] les tentes.', '(faire) Samedi, il [a fait] très beau.', '(pleuvoir) Dimanche, il [a plu].', '(rester) Nous [sommes restés] sous la tente.'] },
      { art: 'luecken', auftrag: 'Complète avec en ou à.', stufe: 1, saetze: ['Nous sommes partis [en] train.', 'Nous sommes allés au camping [à] pied.', 'Nous sommes rentrés [en] bus.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un reportage pour le site de la classe : une sortie, une fête ou un voyage (vrai ou imaginaire).', stufe: 2,
        anfaenge: ['Le … (date), notre classe …', 'D’abord, …', 'Ensuite, …', 'Il a fait …', 'Ce qui nous a plu, c’est …'], zeilen: 11,
        beispiel: 'Le jeudi 4 mars, notre classe est allée au musée d’histoire naturelle à Luxembourg. Nous sommes partis en bus à 13 heures. D’abord, nous avons vu des squelettes de dinosaures. Ensuite, nous avons fait un atelier sur les insectes. Il a fait froid dehors, mais dans le musée, il faisait chaud ! Ce qui nous a plu, c’est l’atelier.' },
    ],
    check: ['Je comprends un reportage écrit.', 'Je comprends la météo et la circulation à la radio.', 'Je parle de la météo au passé.', 'J’organise un récit : quand, où, qui, quoi.', 'J’écris un reportage.'],
  },
]
