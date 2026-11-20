// Français · Module 7 « Voyages et émotions » (Régime / Voie de préparation, A2.2) – cahier multimodal.
// D’après le « Référentiel de compétences – français, régime préparatoire » (MENFP), Module 7 « Les voyages – Les
// problèmes des jeunes » : voyages (lieux, transports, bagages, objets), personnalité et caractère, sentiments,
// donner son avis et le justifier ; place et accord des adjectifs, souhaits et conseils (j’aimerais, il vaut mieux,
// je te conseille de), durée (de … à, pendant, ça fait, il y a, depuis), transports, c’est / il est, qui / que / où,
// conditionnel présent, si + imparfait → conditionnel, pourriez-vous… ?, il m’a dit que + présent, COD / COI.
// Fil rouge : la classe 7P2 prépare et vit un voyage à Vianden. Plan de Vianden simplifié (pas à l’échelle).
// Personnes, offres et prix : imaginaires. Thèmes sensibles traités avec douceur ; numéros d’aide indiqués.

const VIANDEN = {
  titel: 'Vianden (plan simplifié, pas à l’échelle)', breite: 16, hoehe: 10,
  fluss: { d: 'M 124 -4 C 112 30, 130 66, 120 104', b: 1.6, name: 'l’Our', tx: 13.4, ty: 9.3 },
  gruen: [{ x: 0.3, y: 0.3, w: 5.2, h: 2.6 }, { x: 13.4, y: 0.6, w: 2.4, h: 3.4, name: 'la forêt' }],
  strassen: [
    { x1: 11.6, y1: 6.2, x2: 5.0, y2: 3.6, name: 'Grand-Rue', breit: true },
    { x1: 5.0, y1: 3.6, x2: 3.2, y2: 1.8, name: 'rue du Château' },
    { x1: 11.6, y1: 6.2, x2: 11.3, y2: 9.6, name: 'rue de la Gare' },
    { x1: 11.6, y1: 6.2, x2: 11.1, y2: 1.0, name: 'quai' },
    { x1: 11.6, y1: 6.2, x2: 14.2, y2: 6.0, name: 'pont' },
    { x1: 8.2, y1: 4.9, x2: 7.6, y2: 9.6, name: 'rue des Jardins' },
  ],
  orte: [
    { x: 3.2, y: 1.8, icon: 'building-castle', name: 'Château (sur la colline)', farbe: '#6a2d7a', pos: 'r' },
    { x: 5.0, y: 3.6, icon: 'bed', name: 'Auberge de jeunesse', pos: 'l' },
    { x: 8.2, y: 4.9, icon: 'info-circle', name: 'Office de tourisme', farbe: '#1f7a99', pos: 'o' },
    { x: 11.0, y: 6.9, icon: 'home', name: 'Maison de Victor Hugo', farbe: '#6a2d7a', pos: 'l' },
    { x: 11.2, y: 2.2, icon: 'mountain', name: 'Télésiège', pos: 'l' },
    { x: 11.3, y: 9.0, icon: 'bus', name: 'Arrêt de bus', farbe: '#475066', pos: 'l' },
    { x: 14.6, y: 8.2, icon: 'pool', name: 'Piscine', farbe: '#1f7a99', pos: 'u' },
  ],
  legende: [['building-castle', 'monument'], ['info-circle', 'information'], ['bed', 'auberge'], ['bus', 'bus'], ['mountain', 'télésiège'], ['pool', 'piscine']],
}

export const MODUL = {
  id: 'franzoesisch-m7', kuerzel: 'fr7', nr: 7, sprache: 'fr', niveau: 'A2.2', klasse: 'Voie de préparation',
  dateiname: 'Francais_Module-7',
  fach: { de: 'Französisch', fr: 'Français' },
  titel: { de: 'Reisen und Gefühle', fr: 'Voyages et émotions' },
  untertitel: { fr: 'Choisir une destination, faire sa valise, s’orienter à Vianden, choisir un correspondant, parler de ses émotions, demander et donner des conseils, rêver et rapporter des paroles – en huit leçons.', de: 'Ein Reiseziel wählen, den Koffer packen, sich in Vianden orientieren, einen Brieffreund wählen, über Gefühle sprechen, um Rat fragen und Rat geben, träumen und Gesagtes wiedergeben – in acht Lektionen.' },
  farben: { tief: '#6a2d7a', mittel: '#cfa8da', zart: '#f6eef8', dunkel: '#431b4e' },
  deckbild: ['lea:froh:stehen-zeigen', 'tom:froh:laessig', 'amira:froh:handy'],
  blasen: [{ t: 'On part !', x: 16, y: 110 }, { t: 'Pourriez-vous… ?', x: 116, y: 98 }, { t: 'Si j’avais…', x: 160, y: 150 }],
  themen: [
    { titel: { fr: 'Partir en voyage', de: 'Auf Reisen' }, icon: 'luggage', lektionen: 3 },
    { titel: { fr: 'Caractère et émotions', de: 'Charakter und Gefühle' }, icon: 'mood-happy', lektionen: 2 },
    { titel: { fr: 'Conseils, rêves, messages', de: 'Ratschläge, Träume, Nachrichten' }, icon: 'heart-handshake', lektionen: 3 },
  ],
  anleitung: [
    'Chaque leçon a cinq parties : **Lire**, **Écouter**, **La règle**, **S’entraîner** et **Écrire**. À la fin, il y a un **mini-bilan**.',
    'À côté de chaque texte, il y a un **code QR**. Scanne-le avec ton portable : tu entends le texte. Écoute plusieurs fois pour trouver les informations importantes.',
    'Les points montrent le niveau : ●○○ base · ●●○ moyen · ●●● plus. Commence par la base.',
    'Dans ce cahier, on parle aussi d’émotions et de problèmes. Tu parles de toi seulement si tu veux. Besoin d’aide ? **116 111** (gratuit, anonyme).',
  ],
  // seulement pour la voix (Regex Python)
  aussprache: {
    '\\bMme\\b': 'Madame', '\\bM\\. ': 'Monsieur ', '(\\d{1,2}) h (\\d\\d)': '\\1 heures \\2', '(\\d{1,2}) h\\b': '\\1 heures', '(\\d+) ?€': '\\1 euros', '(\\d+) ?km\\b': '\\1 kilomètres',
    '\\b116 111\\b': 'un un six, un un un', '\\b8002 1234\\b': 'huit zéro zéro deux, douze trente-quatre', '\\bBD\\b': 'bédé',
  },
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Choisir une destination · le conditionnel de souhait · la durée', titel: 'On part où ?', untertitel: 'Bruxelles, Strasbourg ou Vianden ? Tu compares des offres de voyage, tu écoutes un vote en classe et tu proposes ta destination.',
    ziel: { fr: 'Je compare des offres de voyage et j’exprime un souhait.', de: 'Ich vergleiche Reiseangebote und äußere einen Wunsch.' },
    bild: ['lea:froh:stehen-zeigen', 'sami:froh:erklaeren'],
    start: {
      was: 'Les voyages',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['la destination', 'le budget', 'le séjour', 'l’auberge de jeunesse', 'le départ', 'le retour'], rechts: ['das Reiseziel', 'das Budget', 'der Aufenthalt', 'die Jugendherberge', 'die Abfahrt', 'die Rückkehr'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Trois offres et un message', art: 'dokumente',
      quelle: 'Offres d’une agence de voyages scolaires (prix imaginaires)', titel: 'Voyage de classe : trois idées',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Voyage de classe : trois idées**', text: ['**Bruxelles (Belgique)** · 2 jours · en train · 120 € par élève · musée de la bande dessinée, Atomium, chocolaterie.', '**Strasbourg (France)** · 3 jours · en bus · 180 € par élève · Parlement européen, promenade en bateau, cathédrale.', '**Vianden (Luxembourg)** · 2 jours · en bus · 70 € par élève · château, télésiège, randonnée, nuit à l’auberge de jeunesse.'] },
        { stil: 'nachricht', stimme: 'w1', kopf: 'Message de Mme Nouvelle', text: ['Chers élèves, notre budget est de 150 € par élève. Nous pouvons partir **pendant** deux ou trois jours, **du** 4 **au** 6 mai. Lisez les trois idées. On vote vendredi !'] },
      ],
      woerter: [['l’agence de voyages', 'das Reisebüro'], ['par élève', 'pro Schüler'], ['la bande dessinée', 'der Comic'], ['la chocolaterie', 'die Schokoladenfabrik'], ['le Parlement européen', 'das Europäische Parlament'], ['la promenade en bateau', 'die Bootsfahrt'], ['le télésiège', 'der Sessellift'], ['voter', 'abstimmen']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Compare les offres.', stufe: 1, kopf: ['', 'Bruxelles', 'Strasbourg', 'Vianden'], breiten: [16, 28, 28, 28], zeilen: [['durée', '[2 jours]', '[3 jours]', '[2 jours]'], ['transport', '[en train]', '[en bus]', '[en bus]'], ['prix', '[120 €]', '[180 €]', '[70 €]']] },
        { art: 'mc', auftrag: 'Avec un budget de 150 € par élève, quelles destinations sont possibles ? Coche.', stufe: 2, fragen: [{ f: '', o: ['Bruxelles', 'Strasbourg', 'Vianden'], r: [0, 2] }] },
      ],
    },
    hoeren: {
      was: 'Un vote en classe', wo: 'Salle 12 · vendredi', titel: 'J’aimerais aller à…',
      situation: 'Vendredi, la classe discute des trois idées. Ensuite, on vote.',
      bild: ['lehrerin:froh:erklaeren', 'lea:froh'], sprecher: { 'Mme Nouvelle': 'w1', Léa: 'w2', Rui: 'm1', Amira: 'w3' },
      text: [
        ['Mme Nouvelle', 'Alors, qui veut commencer ? Léa ?'],
        ['Léa', 'J’aimerais aller à Bruxelles, parce que j’adore la bande dessinée. Et le train, c’est plus confortable que le bus.'],
        ['Rui', 'Moi, je voudrais aller à Strasbourg. Le Parlement européen, ce serait intéressant… mais c’est trop cher pour notre budget.'],
        ['Amira', 'Je propose Vianden. C’est moins cher et on pourrait faire une randonnée et dormir à l’auberge de jeunesse. Ce serait plus drôle !'],
        ['Mme Nouvelle', 'Merci. On vote ! … Voici le résultat : Vianden, treize voix. Bruxelles, neuf voix. Strasbourg, zéro voix, car c’est trop cher.'],
        ['Léa', 'Dommage pour la BD… Mais d’accord, Vianden, ça me plaît aussi !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour choisir un voyage de classe, on regarde … Coche.', stufe: 1, fragen: [{ f: '', o: ['le prix', 'la durée', 'les activités', 'la couleur du bus'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'destination', 'pourquoi ?'], breiten: [16, 26, 58], zeilen: [['Léa', '[Bruxelles]', '[elle adore la BD ; le train est confortable]'], ['Rui', '[Strasbourg]', '[le Parlement européen ; mais c’est trop cher]'], ['Amira', '[Vianden]', '[moins cher ; randonnée, auberge de jeunesse]']] },
        { art: 'mc', auftrag: 'Le résultat du vote : coche.', stufe: 1, fragen: [{ f: '', o: ['Vianden : 13 voix', 'Bruxelles : 13 voix', 'Strasbourg : 9 voix'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Organisez un vote dans votre groupe : quelle destination pour un voyage de classe ? Chaque personne donne son avis.', stufe: 3, karten: [
        { titel: 'Proposer', text: ['J’aimerais aller à …', 'Je voudrais …', 'On pourrait …', 'Ce serait …'] },
        { titel: 'Justifier', text: ['parce que …', 'C’est moins cher / plus près.', 'Il y a …', 'Par contre, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Exprimer un souhait', punkte: ['**J’aimerais** aller à Bruxelles.', '**Je voudrais** voir le château.', '**On pourrait** faire une randonnée.', '**Ce serait** intéressant / drôle.', '(conditionnel : plus poli, pour un souhait)'] },
         { titel: 'Exprimer la durée', punkte: ['**pendant** deux jours (Dauer)', '**du** 4 **au** 6 mai · **de** 9 h **à** 17 h', '**depuis** une semaine (ça continue)', '**il y a** deux jours (dans le passé)', '**ça fait** un mois que j’attends !'] }],
        [{ art: 'tipp', titel: 'Comparer des offres', text: 'Vianden est **moins cher que** Strasbourg. · Le train est **plus confortable que** le bus. · C’est **le moins cher**.' },
         { art: 'achtung', titel: 'en ou à ?', text: '**en** train · **en** bus · **en** avion · **en** voiture · mais **à** pied · **à** vélo' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec pendant, du … au, depuis ou il y a.', stufe: 2, saetze: ['Nous partons [du] 4 [au] 6 mai.', 'Nous restons à Vianden [pendant] deux jours.', 'J’apprends le français [depuis] deux ans.', 'Je suis allé à Bruxelles [il y a] un an.'] },
      { art: 'luecken', auftrag: 'Complète avec j’aimerais, on pourrait ou ce serait.', stufe: 1, woerter: ['j’aimerais', 'on pourrait', 'ce serait'], saetze: ['[J’aimerais] voir l’Atomium.', 'S’il fait beau, [on pourrait] faire du kayak.', 'Un voyage à Strasbourg ? [Ce serait] super !'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Propose une destination pour un voyage de classe et justifie ton choix.', stufe: 2,
        anfaenge: ['J’aimerais aller à …', 'Le voyage durerait … / On partirait …', 'On pourrait …', 'Ce serait … parce que …', 'Par contre, …'], zeilen: 10,
        beispiel: 'J’aimerais aller à Trèves, en Allemagne. Le voyage durerait deux jours, en train. On pourrait visiter la Porta Nigra et le musée du jouet. Ce serait intéressant parce qu’on parlerait allemand. Par contre, il faut réserver tôt.' },
    ],
    check: ['Je compare des offres de voyage.', 'Je comprends une discussion en classe.', 'J’exprime un souhait avec j’aimerais, je voudrais.', 'J’exprime la durée.', 'Je justifie mon choix.'],
  },
  // ================================================================ 2
  {
    thema: 'Les bagages · la place des adjectifs · les conseils', titel: 'Dans ma valise', untertitel: 'Sac de couchage, lampe de poche, gourde : tu lis une liste et des conseils, tu écoutes un sac perdu et tu donnes des conseils.',
    ziel: { fr: 'Je décris un objet avec des adjectifs bien placés et je donne des conseils.', de: 'Ich beschreibe einen Gegenstand mit richtig gestellten Adjektiven und gebe Ratschläge.' },
    bild: ['tom:verwirrt:stehen', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Les bagages',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['la valise', 'le sac à dos', 'le sac de couchage', 'la lampe de poche', 'la gourde', 'la trousse de toilette'], rechts: ['der Koffer', 'der Rucksack', 'der Schlafsack', 'die Taschenlampe', 'die Trinkflasche', 'der Kulturbeutel'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Une liste et des conseils', art: 'dokumente',
      quelle: 'Documents de la classe (personnes imaginaires)', titel: 'Prêts pour Vianden ?',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Liste : ce qu’il faut emporter**', text: ['un **grand** sac à dos · un sac de couchage · une **petite** lampe de poche', 'des chaussures **confortables** · un imperméable · un pull **chaud**', 'une gourde · une trousse de toilette · la carte d’identité', 'Pas d’objets de valeur, s’il vous plaît !'] },
        { stil: 'nachricht', stimme: 'm2', kopf: 'Forum « Voyageurs en herbe » : les conseils de Max', text: ['**Il vaut mieux** prendre un sac à dos qu’une valise : c’est plus pratique pour marcher. **Je te conseille de** mettre un nom sur tes affaires. Et **ne prends pas** tes **nouvelles** chaussures : prends tes **vieilles** baskets, elles sont plus confortables !'] },
      ],
      woerter: [['emporter', 'mitnehmen'], ['l’imperméable', 'die Regenjacke'], ['la carte d’identité', 'der Personalausweis'], ['l’objet de valeur', 'der Wertgegenstand'], ['il vaut mieux', 'es ist besser'], ['conseiller de', 'raten zu'], ['les affaires', 'die Sachen'], ['vieux, vieille', 'alt']],
      aufgaben: [
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['Il faut emporter un sac de couchage.', true], ['On peut prendre des objets de valeur.', false], ['Max conseille de prendre une valise.', false], ['Max conseille de prendre de vieilles baskets.', true]] },
        { art: 'tabelle', auftrag: 'Trouve les conseils de Max.', stufe: 2, kopf: ['conseil', 'pourquoi ?'], breiten: [55, 45], zeilen: [['[prendre un sac à dos, pas une valise]', '[c’est plus pratique pour marcher]'], ['[mettre un nom sur ses affaires]', '—'], ['[prendre de vieilles baskets]', '[elles sont plus confortables]']] },
      ],
    },
    hoeren: {
      was: 'Un sac perdu', wo: 'Gare routière · objets trouvés', titel: 'J’ai perdu mon sac !',
      situation: 'Au retour, Tom a oublié son sac dans le bus. Il va au bureau des objets trouvés avec M. Laurent.',
      bild: ['tom:verwirrt', 'verkaeuferin:froh:erklaeren'], sprecher: { Employée: 'w1', Tom: 'm3', 'M. Laurent': 'm2' },
      text: [
        ['Employée', 'Bonjour ! Je peux vous aider ?'],
        ['Tom', 'Bonjour, Madame. J’ai oublié mon sac dans le bus de Vianden, il y a une heure.'],
        ['Employée', 'Il est comment, votre sac ?'],
        ['Tom', 'C’est un grand sac à dos noir, avec une petite poche rouge devant.'],
        ['Employée', 'Et qu’est-ce qu’il y a dedans ?'],
        ['Tom', 'Mon vieux pull gris, une gourde bleue et ma nouvelle lampe de poche.'],
        ['Employée', 'Attendez… Un grand sac noir… Voilà ! C’est celui-ci ?'],
        ['Tom', 'Oui ! Merci beaucoup, Madame !'],
        ['M. Laurent', 'Tu vois, Tom : il vaut mieux mettre ton nom sur ton sac. La prochaine fois, je te conseille de vérifier avant de descendre du bus !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Au bureau des objets trouvés, on cherche … Coche.', stufe: 1, fragen: [{ f: '', o: ['des objets perdus', 'un billet de train'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et décris le sac de Tom.', stufe: 1, kopf: ['question', 'réponse'], breiten: [40, 60], zeilen: [['Où est-ce qu’il a oublié son sac ?', '[dans le bus de Vianden]'], ['Quand ?', '[il y a une heure]'], ['Le sac est comment ?', '[un grand sac à dos noir, avec une petite poche rouge]'], ['Qu’est-ce qu’il y a dedans ?', '[un vieux pull gris, une gourde bleue, une nouvelle lampe de poche]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jouez au bureau des objets trouvés. Décrivez un objet perdu (inventé).', stufe: 3, karten: [
        { titel: 'Client(e)', text: ['J’ai perdu mon / ma …', 'C’est un grand / petit … + couleur', 'Dedans, il y a …', 'Je l’ai perdu il y a …'] },
        { titel: 'Employé(e)', text: ['Il est comment ?', 'Qu’est-ce qu’il y a dedans ?', 'C’est celui-ci ?', 'Je vous conseille de …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'La place des adjectifs', punkte: ['En général, **après** le nom : un sac **noir**, des chaussures **confortables**', '**Avant** le nom, des adjectifs courts et fréquents :', '**grand**, **petit**, **beau**, **joli**, **bon**, **mauvais**, **jeune**, **vieux**, **nouveau**', 'un **grand** sac **noir** · une **petite** poche **rouge**'] },
         { titel: 'beau, nouveau, vieux', tabelle: { kopf: ['masculin', 'féminin', 'devant une voyelle'], zeilen: [['beau', 'belle', 'un **bel** hôtel'], ['nouveau', 'nouvelle', 'un **nouvel** ami'], ['vieux', 'vieille', 'un **vieil** ami']] } }],
        [{ art: 'tipp', titel: 'Donner des conseils', text: '**Il vaut mieux** prendre un sac à dos. · **Je te conseille de** mettre ton nom. · **Tu devrais** vérifier. · **Ne prends pas** …' },
         { art: 'achtung', titel: 'des + adjectif', text: 'Avant un adjectif au pluriel : **de** vieilles baskets (à l’écrit). À l’oral, on entend aussi « des ».' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Écris le groupe de mots dans le bon ordre.', stufe: 1, kopf: ['mots', 'groupe correct'], saetze: [['un sac / noir / grand', 'un grand sac noir'], ['une gourde / bleue / petite', 'une petite gourde bleue'], ['des baskets / blanches / vieilles', 'de vieilles baskets blanches']] },
      { art: 'luecken', auftrag: 'Complète avec beau, bel, belle, nouveau, nouvel ou nouvelle.', stufe: 2, saetze: ['C’est un [bel] hôtel.', 'J’ai une [nouvelle] valise.', 'Il a un [nouvel] appareil photo.', 'Quelle [belle] vue !', 'C’est un [beau] voyage.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Un copain part en classe de neige. Écris-lui un message avec ta liste et trois conseils.', stufe: 2,
        anfaenge: ['Salut … !', 'Dans ton sac, mets …', 'Il vaut mieux …', 'Je te conseille de …', 'Ne prends pas …'], zeilen: 9,
        beispiel: 'Salut Ben ! Dans ton sac, mets un gros pull chaud, des gants et un bonnet. Il vaut mieux prendre deux paires de chaussettes. Je te conseille de mettre ton nom sur tes affaires. Ne prends pas ta nouvelle console : tu pourrais la perdre ! Bon séjour !' },
    ],
    check: ['Je comprends une liste et des conseils.', 'Je décris un objet perdu.', 'Je place les adjectifs correctement.', 'J’utilise beau, nouveau, vieux.', 'Je donne des conseils.'],
  },
  // ================================================================ 3
  {
    thema: 'S’informer · s’orienter · pourriez-vous… ?', titel: 'À l’office de tourisme', untertitel: 'Château, télésiège, maison de Victor Hugo : tu lis un dépliant, tu suis un chemin sur le plan et tu écris un courriel poli.',
    ziel: { fr: 'Je demande des renseignements poliment et je comprends un chemin.', de: 'Ich frage höflich nach Auskünften und verstehe eine Wegbeschreibung.' },
    bild: ['verkaeuferin:froh:erklaeren', 'amira:froh:stehen'],
    start: {
      was: 'Indiquer le chemin',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['tournez à gauche', 'tournez à droite', 'allez tout droit', 'traversez le pont', 'montez la rue', 'c’est en face'], rechts: ['biegen Sie links ab', 'biegen Sie rechts ab', 'gehen Sie geradeaus', 'überqueren Sie die Brücke', 'gehen Sie die Straße hinauf', 'es ist gegenüber'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un dépliant touristique', art: 'text', stimme: 'w1', nummern: true, stadtplan: VIANDEN,
      quelle: 'Dépliant touristique (texte simplifié)', titel: 'Bienvenue à Vianden !',
      absaetze: [
        'Vianden est une petite ville au bord de l’Our, au nord du Luxembourg. Son château, **qui** domine la ville, est un des plus beaux de la région.',
        'Le **télésiège** monte sur la colline. En haut, vous avez une vue magnifique sur le château et la vallée. Il fonctionne d’avril à octobre.',
        'Près du pont, vous trouverez la **maison de Victor Hugo**. Le célèbre écrivain français a habité ici en 1871. Aujourd’hui, c’est un petit musée **que** les visiteurs aiment beaucoup.',
        'L’**auberge de jeunesse** se trouve dans la Grand-Rue, au pied du château. C’est l’endroit **où** dorment beaucoup de classes en voyage.',
      ],
      woerter: [['dominer', 'überragen'], ['la vallée', 'das Tal'], ['fonctionner', 'in Betrieb sein'], ['célèbre', 'berühmt'], ['l’écrivain', 'der Schriftsteller'], ['au pied de', 'am Fuß von'], ['le dépliant', 'der Faltprospekt'], ['se trouver', 'sich befinden']],
      aufgaben: [
        { art: 'mc', auftrag: 'Lis et coche.', stufe: 1, fragen: [{ f: 'Vianden est au bord de …', o: ['la Moselle', 'l’Our'], r: 1 }, { f: 'Le télésiège fonctionne …', o: ['toute l’année', 'd’avril à octobre'], r: 1 }, { f: 'Victor Hugo a habité à Vianden en …', o: ['1871', '1971'], r: 0 }] },
        { art: 'fragen', auftrag: 'Regarde le plan. Réponds.', stufe: 2, fragen: [{ f: 'Qu’est-ce qu’il y a près du pont ?', l: 'la maison de Victor Hugo' }, { f: 'La piscine est de quel côté de la rivière ?', l: 'de l’autre côté de l’Our (à droite sur le plan)' }] },
      ],
    },
    hoeren: {
      was: 'À l’office de tourisme', wo: 'Office de tourisme · Grand-Rue', titel: 'Pourriez-vous me dire… ?',
      situation: 'La classe est à Vianden. Amira et Sami vont à l’office de tourisme. Ils demandent des renseignements et le chemin du château.',
      bild: ['verkaeuferin:froh:erklaeren', 'amira:froh'], sprecher: { Employée: 'w1', Amira: 'w3', Sami: 'm3' },
      text: [
        ['Employée', 'Bonjour ! Je peux vous aider ?'],
        ['Amira', 'Bonjour, Madame. Pourriez-vous nous donner un plan de la ville, s’il vous plaît ?'],
        ['Employée', 'Bien sûr, voilà. Vous êtes ici, à l’office de tourisme.'],
        ['Sami', 'Merci. J’aimerais savoir à quelle heure le château ferme.'],
        ['Employée', 'Aujourd’hui, il est ouvert de dix heures à dix-huit heures.'],
        ['Amira', 'Et pour aller au château, s’il vous plaît ?'],
        ['Employée', 'C’est facile. Sortez et tournez à gauche. Montez la Grand-Rue jusqu’à l’auberge de jeunesse. Là, prenez la rue du Château, à droite. Le château est tout en haut.'],
        ['Sami', 'Ça prend combien de temps à pied ?'],
        ['Employée', 'Environ quinze minutes. Ça monte beaucoup !'],
        ['Amira', 'Merci beaucoup, Madame. Bonne journée !'],
      ],
      vor: [{ art: 'mc', auftrag: 'À l’office de tourisme, on peut demander … Coche.', stufe: 1, fragen: [{ f: '', o: ['un plan', 'les horaires d’un musée', 'une note de maths'], r: [0, 1] }] }],
      beim: [
        { art: 'stadtplan', auftrag: 'Écoute. Dessine le chemin de l’office de tourisme au château.', stufe: 1, ...VIANDEN, titel: '', legende: null, start: { x: 8.2, y: 4.9, text: 'Départ' }, weg: [[8.2, 4.9], [5.0, 3.6], [3.2, 1.8]] },
        { art: 'mc', auftrag: 'Écoute encore et coche.', stufe: 2, fragen: [{ f: 'Le château est ouvert …', o: ['de 10 h à 18 h', 'de 9 h à 17 h'], r: 0 }, { f: 'À pied, il faut …', o: ['5 minutes', 'environ 15 minutes'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Regarde le plan. Ton ou ta partenaire choisit un départ et une arrivée. Explique le chemin.', stufe: 3, karten: [
        { titel: 'Demander poliment', text: ['Pourriez-vous me dire … ?', 'Pour aller à …, s’il vous plaît ?', 'J’aimerais savoir …', 'Ça prend combien de temps ?'] },
        { titel: 'Expliquer', text: ['Tournez à gauche / à droite.', 'Allez tout droit.', 'Montez la rue jusqu’à …', 'Traversez le pont.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Demander poliment (conditionnel)', punkte: ['**Pourriez-vous** me donner un plan ?', '**J’aimerais savoir** à quelle heure …', '**Je voudrais** des renseignements sur …', '**Auriez-vous** une brochure ?'] },
         { titel: 'qui, que, où', punkte: ['Le château, **qui** domine la ville, … (qui = sujet)', 'un musée **que** les visiteurs aiment (que = objet)', 'l’endroit **où** dorment les classes (où = lieu)'] }],
        [{ art: 'tipp', titel: 'Indiquer le chemin', text: '**Sortez** · **tournez** à gauche · **montez** la rue · **jusqu’à** l’auberge · **traversez** le pont · c’est **en face de** …' },
         { art: 'achtung', titel: 'Un courriel formel', text: 'Début : **Madame, Monsieur,** · Fin : **Je vous remercie d’avance. Cordialement,** + prénom et nom.' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Écris la question de façon polie.', stufe: 1, kopf: ['direct', 'poli'], saetze: [['Donnez-moi un plan !', 'Pourriez-vous me donner un plan, s’il vous plaît ?'], ['Je veux savoir l’heure d’ouverture.', 'J’aimerais savoir l’heure d’ouverture.'], ['Vous avez une brochure ?', 'Auriez-vous une brochure, s’il vous plaît ?']] },
      { art: 'luecken', auftrag: 'Complète avec qui, que ou où.', stufe: 2, saetze: ['Vianden est une ville [qui] se trouve au bord de l’Our.', 'C’est le musée [que] je préfère.', 'Voici l’auberge [où] nous dormons.', 'C’est un écrivain [que] tout le monde connaît.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un courriel poli à l’office de tourisme : tu demandes des renseignements pour ta classe.', stufe: 2,
        zeilenAnfaenge: ['Objet :', 'Madame, Monsieur,', '', '', '', '', 'Je vous remercie d’avance.', 'Cordialement,', ''], zeilen: 9,
        beispiel: 'Objet : visite d’une classe. Madame, Monsieur, nous sommes une classe de 20 élèves. Nous allons visiter Vianden le 4 mai. Pourriez-vous nous envoyer les horaires du château et du télésiège ? J’aimerais aussi savoir s’il y a un prix pour les groupes. Je vous remercie d’avance. Cordialement, Amira Benali' },
    ],
    check: ['Je comprends un dépliant touristique.', 'Je comprends un chemin et je le suis sur un plan.', 'Je demande des renseignements poliment.', 'J’utilise qui, que, où.', 'J’écris un courriel formel.'],
  },
  // ================================================================ 4
  {
    thema: 'Le caractère · c’est / il est · qui et que', titel: 'Le correspondant idéal', untertitel: 'Bavard, timide, drôle ou sérieux ? Tu lis des profils, tu écoutes deux amis choisir et tu te présentes à ton correspondant.',
    ziel: { fr: 'Je comprends et je décris le caractère d’une personne.', de: 'Ich verstehe und beschreibe den Charakter einer Person.' },
    bild: ['tom:froh:laptop', 'mia:froh:erklaeren'],
    start: {
      was: 'Le caractère',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['bavard', 'timide', 'généreux', 'têtu', 'patient', 'jaloux'], rechts: ['gesprächig', 'schüchtern', 'großzügig', 'stur', 'geduldig', 'eifersüchtig'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Trois profils', art: 'dokumente',
      quelle: 'Programme d’échange scolaire (personnes imaginaires)', titel: 'Choisis ton correspondant !',
      dokumente: [
        { stil: 'karte', stimme: 'm1', kopf: '**Hugo, 13 ans, Lyon**', text: ['Je suis plutôt **calme** et un peu **timide**. J’adore la musique : je joue de la guitare et j’écris des chansons. Je cherche un correspondant **qui** aime la musique et **que** je pourrai inviter à un concert.'] },
        { stil: 'karte', stimme: 'w2', kopf: '**Clara, 14 ans, Bordeaux**', text: ['Mes amis disent que je suis **bavarde** et très **drôle**. Je fais du théâtre et du basket. Je suis un peu **têtue**, mais je suis **généreuse**. Je cherche quelqu’un de **dynamique** !'] },
        { stil: 'karte', stimme: 'm2', kopf: '**Malik, 13 ans, Lille**', text: ['Je suis **sérieux** et **patient**. J’aime les jeux de stratégie, les échecs et la nature. Je n’aime pas beaucoup le bruit. Je cherche un correspondant **avec qui** je peux faire de longues balades.'] },
      ],
      woerter: [['le correspondant', 'der Brieffreund'], ['plutôt', 'eher'], ['bavard', 'gesprächig'], ['drôle', 'lustig'], ['têtu', 'stur'], ['généreux', 'großzügig'], ['dynamique', 'aktiv, lebhaft'], ['la stratégie', 'die Strategie']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète les fiches.', stufe: 1, kopf: ['', 'caractère', 'loisirs'], breiten: [16, 40, 44], zeilen: [['Hugo', '[calme, un peu timide]', '[musique, guitare, chansons]'], ['Clara', '[bavarde, drôle, têtue, généreuse]', '[théâtre, basket]'], ['Malik', '[sérieux, patient]', '[jeux de stratégie, échecs, nature]']] },
        { art: 'wer', auftrag: 'Quel correspondant pour qui ? Coche.', stufe: 2, personen: ['Hugo', 'Clara', 'Malik'], saetze: [['Tom : « Je suis timide et j’adore la musique. »', 'Hugo'], ['Mia : « Je suis très active, je fais du sport et du théâtre. »', 'Clara'], ['Yusuf : « J’aime le calme et les randonnées. »', 'Malik']] },
      ],
    },
    hoeren: {
      was: 'Un choix', wo: 'Salle informatique · récréation', titel: 'C’est quelqu’un qui…',
      situation: 'Tom et Mia regardent les profils sur l’ordinateur. Ils choisissent un correspondant.',
      bild: ['tom:froh:laptop', 'mia:froh'], sprecher: { Tom: 'm3', Mia: 'w3' },
      text: [
        ['Mia', 'Alors, Tom, tu choisis qui ?'],
        ['Tom', 'Je crois que je vais choisir Hugo. C’est quelqu’un qui aime la musique, comme moi. Et il est un peu timide, comme moi aussi !'],
        ['Mia', 'C’est vrai, il a l’air sympa. Moi, je prends Clara. Elle est drôle et elle fait du théâtre. C’est exactement ce que je cherche !'],
        ['Tom', 'Mais elle dit qu’elle est têtue…'],
        ['Mia', 'Moi aussi, je suis têtue ! On va bien s’entendre. Et Malik ? C’est un garçon que Yusuf aimerait bien, non ?'],
        ['Tom', 'Oui ! Yusuf adore les échecs et la nature. Je vais lui envoyer le profil.'],
        ['Mia', 'Super. Maintenant, il faut écrire notre premier message… en français !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un correspondant, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['une personne d’un autre pays ou d’une autre ville avec qui on échange des messages', 'un professeur'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'Tom choisit …', o: ['Hugo', 'Malik'], r: 0 }, { f: 'Pourquoi ?', o: ['Hugo aime la musique et il est timide.', 'Hugo fait du basket.'], r: 0 }, { f: 'Mia choisit Clara parce qu’elle …', o: ['est drôle et fait du théâtre', 'aime les échecs'], r: 0 }, { f: 'Le profil de Malik est pour …', o: ['Yusuf', 'Ben'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Décris le caractère d’une personne (imaginaire ou d’un film). Ton ou ta partenaire devine ou pose des questions.', stufe: 3, karten: [
        { titel: 'Décrire', text: ['C’est quelqu’un qui …', 'Il / Elle est plutôt …', 'Il / Elle est un peu …, mais …'] },
        { titel: 'Demander', text: ['Il / Elle est comment ?', 'C’est quelqu’un de patient ?', 'Qu’est-ce qu’il / elle aime ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Le caractère : masculin et féminin', tabelle: { kopf: ['il est …', 'elle est …'], zeilen: [['bavar**d**', 'bavar**de**'], ['généreu**x**', 'généreu**se**'], ['jalou**x**', 'jalou**se**'], ['sérieu**x**', 'sérieu**se**'], ['drôle', 'drôle'], ['sympa', 'sympa']] } },
         { titel: 'c’est · il est', punkte: ['**C’est** + nom : **C’est** un garçon timide. · **C’est** quelqu’un qui …', '**Il est / Elle est** + adjectif : **Il est** timide.', '**Ce sont** mes amis. · **Ils sont** sympas.', 'Qui est-ce ? – **C’est** Hugo. **Il est** calme.'] }],
        [{ art: 'tipp', titel: 'qui · que', text: 'un garçon **qui** aime la musique (qui + verbe) · un garçon **que** Yusuf aimerait bien (que + sujet + verbe)' },
         { art: 'achtung', titel: 'Nuancer', text: 'Je suis **un peu** têtu(e). · Je suis **plutôt** calme. · Je suis **très** bavard(e). · Je ne suis **pas du tout** jaloux / jalouse.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec c’est ou il / elle est.', stufe: 1, saetze: ['[C’est] Clara. [Elle est] très drôle.', '[C’est] un garçon calme.', 'Malik ? [Il est] sérieux.', '[C’est] quelqu’un de généreux.'] },
      { art: 'luecken', auftrag: 'Complète avec qui ou que.', stufe: 2, saetze: ['Hugo est un garçon [qui] joue de la guitare.', 'C’est une amie [que] je vois souvent.', 'Je cherche quelqu’un [qui] aime la nature.', 'C’est le profil [que] je préfère.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris ton premier message à un correspondant : présente ton caractère et tes loisirs (vrais ou imaginaires).', stufe: 2,
        anfaenge: ['Salut … ! Je m’appelle …', 'Je suis plutôt … et un peu …', 'Mes amis disent que je suis …', 'J’aime … / Je n’aime pas …', 'Je cherche quelqu’un qui …'], zeilen: 10,
        beispiel: 'Salut Hugo ! Je m’appelle Tom et j’ai 13 ans. J’habite au Luxembourg. Je suis plutôt calme et un peu timide. Mes amis disent que je suis gentil et patient. J’aime la musique et les jeux vidéo. Je cherche quelqu’un qui pourrait m’apprendre la guitare ! À bientôt, Tom' },
    ],
    check: ['Je comprends un profil.', 'Je comprends une discussion sur un choix.', 'Je décris un caractère.', 'J’utilise c’est et il / elle est.', 'J’utilise qui et que.'],
  },
  // ================================================================ 5
  {
    thema: 'Les émotions · exprimer ses sentiments', titel: 'Ce que je ressens', untertitel: 'Joie, colère, déception, stress : tu lis un article sur les émotions, tu écoutes des joueurs après un match et tu écris ton journal.',
    ziel: { fr: 'Je comprends et j’exprime des émotions avec des mots simples.', de: 'Ich verstehe Gefühle und drücke sie mit einfachen Worten aus.' },
    bild: ['ben:enttaeuscht:stehen', 'chloe:froh:erklaeren'],
    start: {
      was: 'Les émotions',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['la joie', 'la colère', 'la déception', 'la peur', 'le stress', 'la fierté'], rechts: ['die Freude', 'die Wut', 'die Enttäuschung', 'die Angst', 'der Stress', 'der Stolz'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un article', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Magazine des jeunes · rubrique « Bien dans sa tête »', titel: 'Toutes les émotions sont normales',
      absaetze: [
        'Tu es **content** quand tu gagnes un match. Tu es **déçu** quand tu as une mauvaise note. Tu es **en colère** quand quelqu’un se moque de toi. C’est normal : **toutes** les émotions sont utiles.',
        'La **peur** te protège du danger. La **colère** montre que quelque chose n’est pas juste. La **tristesse** dit : « J’ai besoin de réconfort. »',
        'Mais parfois, une émotion est très forte. **Que faire ?** D’abord, respire lentement : inspire pendant quatre secondes, expire pendant quatre secondes.',
        'Ensuite, mets des mots sur ce que tu ressens : « Je suis en colère **parce que** … » Parler à une personne de confiance aide beaucoup.',
        'Et si une émotion difficile dure longtemps, ne reste pas seul. Tu peux appeler le **116 111** : c’est gratuit et anonyme.',
      ],
      woerter: [['ressentir', 'fühlen'], ['déçu', 'enttäuscht'], ['en colère', 'wütend'], ['se moquer de', 'sich lustig machen über'], ['juste', 'gerecht'], ['le réconfort', 'der Trost'], ['respirer', 'atmen'], ['anonyme', 'anonym']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'À quoi sert l’émotion ?', stufe: 1, kopf: ['émotion', 'elle montre que / elle sert à …'], breiten: [28, 72], zeilen: [['la peur', '[elle protège du danger]'], ['la colère', '[quelque chose n’est pas juste]'], ['la tristesse', '[on a besoin de réconfort]']] },
        { art: 'ordnen', auftrag: 'Une émotion très forte : mets les conseils dans l’ordre du texte.', stufe: 2, teile: ['Respirer lentement.', 'Mettre des mots sur ce qu’on ressent.', 'Parler à une personne de confiance.', 'Appeler le 116 111 si ça dure longtemps.'], ordnung: [2, 0, 3, 1] },
      ],
    },
    hoeren: {
      was: 'Après le match', wo: 'Vestiaire · après le match', titel: 'On a perdu…',
      situation: 'L’équipe de basket de l’école a perdu la finale. Ben, Chloé et l’entraîneur, M. Laurent, parlent dans le vestiaire.',
      bild: ['ben:wuetend', 'lehrer:froh:erklaeren'], sprecher: { Ben: 'm3', Chloé: 'w2', 'M. Laurent': 'm2' },
      text: [
        ['Ben', 'Ce n’est pas juste ! L’arbitre n’a rien vu ! Je suis en colère !'],
        ['Chloé', 'Moi, je suis surtout déçue. On s’entraîne depuis des mois… Et on perd de deux points.'],
        ['M. Laurent', 'Je comprends. Vous avez le droit d’être en colère ou déçus. Respirez un peu.'],
        ['Ben', 'Mais j’ai raté le dernier panier. C’est ma faute…'],
        ['M. Laurent', 'Non, Ben. On gagne ensemble et on perd ensemble. Et tu as marqué douze points ! Moi, je suis fier de vous.'],
        ['Chloé', 'Fier ? Vraiment ?'],
        ['M. Laurent', 'Oui. Il y a un an, on perdait tous les matchs. Aujourd’hui, vous êtes en finale. Ça, c’est une victoire !'],
        ['Ben', 'Bon… Ça va mieux. L’année prochaine, on gagnera !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Après une défaite, on peut être … Coche.', stufe: 1, fragen: [{ f: '', o: ['déçu', 'en colère', 'triste'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute. Qui ressent quoi ? Pourquoi ?', stufe: 1, kopf: ['', 'émotion', 'pourquoi ?'], breiten: [18, 28, 54], zeilen: [['Ben', '[en colère, puis triste]', '[l’arbitre n’a rien vu ; il a raté le dernier panier]'], ['Chloé', '[déçue]', '[ils s’entraînent depuis des mois et perdent de deux points]'], ['M. Laurent', '[fier]', '[il y a un an, ils perdaient tout ; aujourd’hui, ils sont en finale]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Lis une situation à ton ou ta partenaire. Il ou elle dit l’émotion et réagit avec gentillesse.', stufe: 3, karten: [
        { titel: 'Situations', text: ['J’ai eu 18 sur 20 !', 'Mon copain a oublié mon anniversaire.', 'Demain, j’ai un examen.', 'Mon chat est malade.'] },
        { titel: 'Réagir', text: ['Tu dois être content(e) / déçu(e) …', 'Je comprends.', 'Bravo ! · Courage !', 'Tu veux en parler ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Exprimer ses émotions', punkte: ['Je suis **content(e)** · **fier / fière** · **soulagé(e)**', 'Je suis **déçu(e)** · **triste** · **en colère**', 'J’ai **peur de** + infinitif : J’ai peur de rater.', 'Je suis **stressé(e)** · Ça m’**énerve** · J’en ai **marre** (familier)'] },
         { titel: 'Expliquer une émotion', punkte: ['Je suis déçue **parce qu’**on a perdu.', 'Je suis en colère **car** ce n’est pas juste.', '**Quand** je gagne, je suis content.', '**depuis** des mois · **il y a** un an'] }],
        [{ art: 'tipp', titel: 'Réagir avec gentillesse', text: '**Je comprends.** · **Tu veux en parler ?** · **Courage !** · **Bravo !** · **Ce n’est pas grave.**' },
         { art: 'achtung', titel: 'Besoin d’aide ?', text: 'Une émotion difficile qui dure ? Parle à un adulte de confiance ou appelle le **116 111** (gratuit, anonyme).' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Quelle émotion ? Complète.', stufe: 1, woerter: ['fière', 'déçu', 'en colère', 'stressée', 'content'], saetze: ['Lina a réussi son examen : elle est [fière].', 'Tom n’a pas pu aller au concert : il est [déçu].', 'Quelqu’un a pris mon vélo : je suis [en colère] !', 'Demain, Amira a un examen : elle est [stressée].', 'Ben a gagné le tournoi : il est [content].'] },
      { art: 'luecken', auftrag: 'Complète avec parce que, quand ou depuis.', stufe: 2, saetze: ['Je suis content [quand] je joue au basket.', 'Elle est triste [parce que] son chat est malade.', 'Nous nous entraînons [depuis] trois mois.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris une page de journal intime : une journée avec plusieurs émotions (vraie ou imaginaire).', stufe: 2,
        anfaenge: ['Cher journal,', 'Ce matin, j’étais … parce que …', 'À midi, …', 'Quand …, j’ai été …', 'Ce soir, je me sens …'], zeilen: 11,
        beispiel: 'Cher journal, ce matin, j’étais stressée parce que j’avais un exposé. À midi, j’étais soulagée : l’exposé s’est bien passé ! Quand j’ai vu ma note, j’ai été très fière. Mais l’après-midi, j’étais en colère, car quelqu’un a pris mon stylo préféré. Ce soir, je me sens calme.' },
    ],
    check: ['Je comprends un article sur les émotions.', 'Je comprends des émotions à l’oral.', 'J’exprime des émotions.', 'J’explique une émotion avec parce que, quand.', 'J’écris une page de journal.'],
  },
  // ================================================================ 6
  {
    thema: 'Les problèmes des jeunes · donner des conseils', titel: 'Tu devrais…', untertitel: 'Stress, dispute, réseaux sociaux : tu lis le courrier des lecteurs, tu écoutes une émission avec une psychologue et tu réponds à une lettre.',
    ziel: { fr: 'Je comprends un problème et je donne des conseils.', de: 'Ich verstehe ein Problem und gebe Ratschläge.' },
    bild: ['nele:besorgt:handy', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Les conseils',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['Tu devrais …', 'Il vaut mieux …', 'Je te conseille de …', 'Si j’étais toi, je …', 'N’hésite pas à …'], rechts: ['Du solltest …', 'Es ist besser …', 'Ich rate dir …', 'Wenn ich du wäre, würde ich …', 'Zögere nicht …'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Le courrier des lecteurs', art: 'dokumente',
      quelle: 'Magazine des jeunes · courrier des lecteurs (personnes imaginaires)', titel: 'Votre problème, nos conseils',
      dokumente: [
        { stil: 'nachricht', stimme: 'w2', kopf: '**Léna, 13 ans** – « Ma meilleure amie ne me parle plus »', text: ['Depuis une semaine, mon amie Sarah ne me parle plus. Je crois qu’elle est fâchée, mais je ne sais pas pourquoi. Qu’est-ce que je dois faire ?'] },
        { stil: 'karte', stimme: 'w1', kopf: 'Notre réponse', text: ['Chère Léna, **tu devrais** lui parler seule à seule, sans le portable. Demande-lui : « Est-ce que je t’ai fait de la peine ? » Écoute sa réponse sans te fâcher. **Il vaut mieux** parler que deviner.'] },
        { stil: 'nachricht', stimme: 'm1', kopf: '**Noé, 14 ans** – « Je compare ma vie aux photos des autres »', text: ['Sur les réseaux sociaux, tout le monde a l’air heureux et beau. Moi, je me sens nul. Je regarde mon portable trois heures par jour.'] },
        { stil: 'karte', stimme: 'w1', kopf: 'Notre réponse', text: ['Cher Noé, sur les photos, on montre seulement les bons moments. **Si j’étais toi, je ferais** une pause : par exemple, pas de portable après 20 heures. Fais une activité qui te plaît vraiment. Et **n’hésite pas à** parler à un adulte de confiance.'] },
      ],
      woerter: [['fâché', 'verärgert'], ['seule à seule', 'unter vier Augen'], ['faire de la peine', 'wehtun, traurig machen'], ['deviner', 'raten'], ['les réseaux sociaux', 'die sozialen Netzwerke'], ['avoir l’air', 'aussehen, wirken'], ['se sentir nul', 'sich wertlos fühlen'], ['hésiter', 'zögern']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Problème et conseils : complète.', stufe: 1, kopf: ['', 'le problème', 'les conseils'], breiten: [14, 40, 46], zeilen: [['Léna', '[son amie ne lui parle plus]', '[lui parler seule à seule, écouter sans se fâcher]'], ['Noé', '[il compare sa vie aux photos des autres]', '[faire une pause, une activité qui plaît, parler à un adulte]']] },
        { art: 'mc', auftrag: 'Coche.', stufe: 2, fragen: [{ f: 'Sur les réseaux sociaux, on montre souvent …', o: ['seulement les bons moments', 'toute la vraie vie'], r: 0 }, { f: '« Il vaut mieux parler que deviner. » Ça veut dire : …', o: ['il faut poser la question', 'il faut attendre'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Une émission de radio', wo: 'Radio des jeunes · « La ligne des jeunes »', titel: 'Le stress avant les examens',
      situation: 'À la radio, Yusuf présente une émission. La psychologue Mme Arnaud répond aux questions des jeunes. Inès appelle.',
      bild: ['nele:besorgt:handy', 'aerztin:froh:erklaeren'], sprecher: { Yusuf: 'm3', Inès: 'w3', 'Mme Arnaud': 'w1' },
      text: [
        ['Yusuf', 'Bonsoir et bienvenue à « La ligne des jeunes » ! Nous avons une première auditrice : Inès. Bonsoir, Inès !'],
        ['Inès', 'Bonsoir. Voilà : dans deux semaines, j’ai des examens. Je suis tellement stressée que je ne dors plus bien. J’ai peur de tout oublier.'],
        ['Mme Arnaud', 'Merci pour ta question, Inès. Le stress avant un examen, c’est très fréquent. D’abord, tu devrais faire un planning : un peu de révision chaque jour, pas tout la veille.'],
        ['Inès', 'D’accord. Et le soir ?'],
        ['Mme Arnaud', 'Le soir, il vaut mieux arrêter les écrans une heure avant de dormir. Et si j’étais toi, je ferais du sport : ça aide à évacuer le stress.'],
        ['Inès', 'Et si je panique pendant l’examen ?'],
        ['Mme Arnaud', 'Respire lentement, lis d’abord toutes les questions et commence par la plus facile. Et rappelle-toi : une note ne dit pas qui tu es.'],
        ['Inès', 'Merci beaucoup, Madame. Ça me rassure !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Quand on est stressé, on peut … Coche.', stufe: 1, fragen: [{ f: '', o: ['mal dormir', 'avoir mal au ventre', 'voler'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute. Note les conseils de la psychologue.', stufe: 1, kopf: ['moment', 'conseil'], breiten: [30, 70], zeilen: [['avant l’examen', '[faire un planning : un peu chaque jour, pas tout la veille]'], ['le soir', '[arrêter les écrans une heure avant de dormir ; faire du sport]'], ['pendant l’examen', '[respirer lentement ; lire toutes les questions ; commencer par la plus facile]']] },
        { art: 'mc', auftrag: 'Quelle phrase rassure Inès ? Coche.', stufe: 2, fragen: [{ f: '', o: ['Une note ne dit pas qui tu es.', 'Les examens sont faciles.'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Table ronde : choisissez un problème de jeunes (stress, dispute, écrans …). Chaque personne donne un conseil.', stufe: 3, karten: [
        { titel: 'Conseiller', text: ['Tu devrais …', 'Il vaut mieux …', 'Si j’étais toi, je …', 'N’hésite pas à …'] },
        { titel: 'Réagir', text: ['Bonne idée !', 'Je ne suis pas d’accord parce que …', 'Ça peut aider.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Donner un conseil', punkte: ['**Tu devrais** faire un planning. (conditionnel)', '**Il vaut mieux** arrêter les écrans.', '**Je te conseille de** parler à un adulte.', '**Si j’étais toi, je ferais** du sport.', '**N’hésite pas à** demander de l’aide.'] },
         { titel: 'Demander un conseil', punkte: ['Qu’est-ce que **je dois** faire ?', 'Qu’est-ce que **tu ferais** à ma place ?', 'Tu as **un conseil** pour moi ?', '**Pourriez-vous** m’aider ?'] }],
        [{ art: 'tipp', titel: 'tellement … que', text: 'Je suis **tellement** stressée **que** je ne dors plus. (so … dass)' },
         { art: 'achtung', titel: 'Tu n’es pas seul(e)', text: 'Parle à un adulte de confiance. **116 111** : écoute pour les jeunes (gratuit, anonyme). Harcèlement en ligne : **BEE SECURE Helpline 8002 1234**.' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Transforme en conseil.', stufe: 1, kopf: ['Il faut …', 'Tu devrais …'], saetze: [['Il faut dormir plus.', 'Tu devrais dormir plus.'], ['Il faut parler à ton amie.', 'Tu devrais parler à ton amie.'], ['Il faut faire une pause.', 'Tu devrais faire une pause.']] },
      { art: 'luecken', auftrag: 'Complète avec un conseil.', stufe: 2, woerter: ['tu devrais', 'il vaut mieux', 'si j’étais toi', 'n’hésite pas à'], saetze: ['[Tu devrais] te coucher plus tôt.', '[Il vaut mieux] réviser un peu chaque jour.', '[Si j’étais toi], je parlerais à la professeure.', '[N’hésite pas à] demander de l’aide.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Réponds à une lettre du courrier des lecteurs : « Je suis nouveau dans ma classe et je me sens seul. »', stufe: 2,
        anfaenge: ['Cher …,', 'Je comprends que …', 'Tu devrais …', 'Si j’étais toi, je …', 'N’hésite pas à …'], zeilen: 10,
        beispiel: 'Cher Lucas, je comprends que ce n’est pas facile d’arriver dans une nouvelle classe. Tu devrais participer à une activité après l’école, par exemple un club de sport. Si j’étais toi, je dirais bonjour à un ou deux élèves chaque jour. N’hésite pas à parler à ton professeur principal. Courage !' },
    ],
    check: ['Je comprends le courrier des lecteurs.', 'Je comprends les conseils d’une émission.', 'Je donne des conseils avec tu devrais, il vaut mieux.', 'J’utilise si j’étais toi, je …', 'Je réponds à une lettre.'],
  },
  // ================================================================ 7
  {
    thema: 'Les rêves · si + imparfait → conditionnel', titel: 'Si j’avais une baguette magique…', untertitel: 'Voyage de rêve, superpouvoir, une journée à l’envers : tu lis un sondage, tu écoutes un jeu « Et si… ? » et tu imagines.',
    ziel: { fr: 'J’imagine des situations avec si + imparfait et le conditionnel.', de: 'Ich stelle mir Situationen mit „si“ + Imperfekt und Konditional vor.' },
    bild: ['amira:froh:stehen-zeigen', 'finn:verwirrt:stehen'],
    start: {
      was: 'Réel ou imaginaire ?',
      aufgaben: [
        { art: 'rf', auftrag: 'C’est réel ou imaginaire ? Coche.', stufe: 1, spalten: ['réel', 'imaginaire'], saetze: [['Si j’ai le temps, je viendrai.', true], ['Si j’avais des ailes, je volerais.', false], ['S’il pleut, on restera à la maison.', true], ['Si j’étais invisible, j’entrerais partout.', false]] },
      ],
    },
    lesen: {
      was: 'Un sondage', art: 'profile', stimme: 'w1',
      quelle: 'Sondage du journal de l’école (personnes imaginaires)', titel: 'Si tu pouvais partir n’importe où…',
      profile: [
        { name: 'Amira', bild: 'amira:froh:stehen', stimme: 'w3', text: '**Si je pouvais** partir n’importe où, **j’irais** au Japon. **Je visiterais** Tokyo et **je mangerais** des sushis tous les jours. **J’aimerais** aussi voir les cerisiers en fleurs.' },
        { name: 'Finn', bild: 'finn:froh:laessig', stimme: 'm1', text: 'Moi, **si j’avais** beaucoup d’argent, **je ferais** le tour du monde en voilier. **Je partirais** pendant un an avec mes meilleurs amis. Ce **serait** l’aventure !' },
        { name: 'Nele', bild: 'nele:froh:stehen', stimme: 'w2', text: '**Si j’avais** un superpouvoir, **je voyagerais** dans le temps. **J’irais** à Vianden en 1871 et **je parlerais** avec Victor Hugo ! **Je lui demanderais** quels livres il écrit.' },
      ],
      woerter: [['n’importe où', 'irgendwohin'], ['le cerisier', 'der Kirschbaum'], ['en fleurs', 'blühend'], ['le tour du monde', 'die Weltreise'], ['le voilier', 'das Segelboot'], ['le superpouvoir', 'die Superkraft'], ['voyager dans le temps', 'durch die Zeit reisen'], ['l’aventure', 'das Abenteuer']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète.', stufe: 1, kopf: ['', 'si …', 'il / elle …'], breiten: [14, 40, 46], zeilen: [['Amira', '[si elle pouvait partir n’importe où]', '[irait au Japon, visiterait Tokyo]'], ['Finn', '[s’il avait beaucoup d’argent]', '[ferait le tour du monde en voilier]'], ['Nele', '[si elle avait un superpouvoir]', '[voyagerait dans le temps, parlerait avec Victor Hugo]']] },
        { art: 'tabelle', auftrag: 'Trouve l’infinitif.', stufe: 2, kopf: ['conditionnel', 'infinitif'], breiten: [50, 50], zeilen: [['j’irais', '[aller]'], ['je ferais', '[faire]'], ['ce serait', '[être]'], ['je partirais', '[partir]']] },
      ],
    },
    hoeren: {
      was: 'Un jeu', wo: 'Salle de classe · dernier cours', titel: 'Et si… ?',
      situation: 'Pendant le dernier cours, Mme Nouvelle propose un jeu : « Et si… ? » Chacun répond à une question.',
      bild: ['lehrerin:froh:erklaeren', 'finn:froh'], sprecher: { 'Mme Nouvelle': 'w1', Finn: 'm1', Léa: 'w2', Sami: 'm3' },
      text: [
        ['Mme Nouvelle', 'Première question, Finn : si tu étais invisible pendant une journée, qu’est-ce que tu ferais ?'],
        ['Finn', 'Euh… J’irais dans les coulisses d’un grand concert ! Je regarderais les musiciens de près.'],
        ['Mme Nouvelle', 'Bonne idée ! Léa : si tu étais directrice de l’école, qu’est-ce que tu changerais ?'],
        ['Léa', 'Si j’étais directrice, les cours commenceraient à neuf heures. Et il y aurait une grande bibliothèque avec des BD partout !'],
        ['Mme Nouvelle', 'Et toi, Sami : si tu pouvais parler une nouvelle langue tout de suite, laquelle choisirais-tu ?'],
        ['Sami', 'Je choisirais le japonais. Comme ça, je pourrais lire les mangas en version originale !'],
        ['Mme Nouvelle', 'Très bien ! Vous voyez : avec le conditionnel, on peut rêver en français !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour imaginer, on utilise … Coche.', stufe: 1, fragen: [{ f: '', o: ['si + imparfait', 'le conditionnel', 'le passé composé'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'la question', 'la réponse'], breiten: [14, 40, 46], zeilen: [['Finn', '[s’il était invisible]', '[il irait dans les coulisses d’un concert]'], ['Léa', '[si elle était directrice]', '[cours à 9 h ; une grande bibliothèque avec des BD]'], ['Sami', '[s’il pouvait parler une nouvelle langue]', '[le japonais, pour lire les mangas]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jouez au jeu « Et si… ? » : posez-vous des questions à tour de rôle.', stufe: 3, karten: [
        { titel: 'Questions', text: ['Si tu étais un animal, …', 'Si tu gagnais un voyage, …', 'Si tu pouvais rencontrer une star, …', '… qu’est-ce que tu ferais ?'] },
        { titel: 'Répondre', text: ['Si j’étais …, je …', 'J’irais … · Je ferais …', 'Ce serait …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Le conditionnel présent', punkte: ['radical du futur + terminaisons de l’imparfait', 'je parler**ais** · tu finir**ais** · il prendr**ait**', 'nous ir**ions** · vous fer**iez** · ils ser**aient**', 'Irréguliers : j’**ir**ais, je **fer**ais, je **ser**ais, j’**aur**ais, je **pourr**ais'] },
         { titel: 'si + imparfait → conditionnel', punkte: ['**Si** j’**avais** de l’argent, je **ferais** le tour du monde.', '**Si** j’**étais** invisible, j’**irais** partout.', 'Pour imaginer (ce n’est pas réel).', 'Réel : **Si** j’**ai** le temps, je **viendrai**. (présent → futur)'] }],
        [{ art: 'tipp', titel: 'Le conditionnel est aussi poli', text: '**Pourriez-vous** … ? · **J’aimerais** … · **Tu devrais** … : le même temps pour la politesse et les conseils !' },
         { art: 'achtung', titel: 'Jamais de conditionnel après si', text: 'si j’~~aurais~~ → **si j’avais** · si j’~~serais~~ → **si j’étais**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète au conditionnel.', stufe: 1, saetze: ['(aller) Si j’avais un avion, j’[irais] en Australie.', '(faire) Si nous avions le temps, nous [ferions] du vélo.', '(être) Si tu venais, ce [serait] super !', '(acheter) S’il gagnait, il [achèterait] une guitare.'] },
      { art: 'luecken', auftrag: 'Complète avec l’imparfait après si.', stufe: 2, saetze: ['(avoir) Si j’[avais] un chien, je le promènerais.', '(être) Si elle [était] directrice, elle changerait les horaires.', '(pouvoir) Si nous [pouvions] voler, nous irions partout.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un texte : « Si j’avais une baguette magique… »', stufe: 2,
        anfaenge: ['Si j’avais une baguette magique, …', 'D’abord, je …', 'Ensuite, j’irais …', 'Pour mes amis, je …', 'Ce serait …'], zeilen: 10,
        beispiel: 'Si j’avais une baguette magique, je ferais disparaître les devoirs du week-end ! D’abord, je transformerais ma chambre en salle de cinéma. Ensuite, j’irais au Canada en une seconde. Pour mes amis, je créerais un terrain de basket géant. Ce serait génial !' },
    ],
    check: ['Je comprends un sondage avec le conditionnel.', 'Je comprends un jeu « Et si… ? ».', 'Je forme le conditionnel.', 'J’utilise si + imparfait → conditionnel.', 'J’écris un texte imaginaire.'],
  },
  // ================================================================ 8
  {
    thema: 'Rapporter des paroles · les pronoms · raconter un voyage', titel: 'Elle m’a dit que…', untertitel: 'Un courriel, un message vocal, une affiche : tu comprends des nouvelles de voyage, tu rapportes des paroles et tu présentes ta destination préférée.',
    ziel: { fr: 'Je rapporte ce qu’une personne a dit et je présente une destination.', de: 'Ich gebe wieder, was jemand gesagt hat, und stelle ein Reiseziel vor.' },
    bild: ['mia:froh:handy', 'tom:froh:stehen'],
    start: {
      was: 'Les pronoms',
      aufgaben: [
        { art: 'luecken', auftrag: 'Complète avec lui ou leur.', stufe: 1, saetze: ['J’écris à Zoé. → Je [lui] écris.', 'Je téléphone à mes parents. → Je [leur] téléphone.', 'Je parle à Hugo. → Je [lui] parle.', 'J’envoie une photo à mes amis. → Je [leur] envoie une photo.'] },
      ],
    },
    lesen: {
      was: 'Un courriel', art: 'dokumente',
      quelle: 'Courriel d’une correspondante (personne imaginaire)', titel: 'Des nouvelles de Zoé',
      dokumente: [
        { stil: 'nachricht', stimme: 'w3', kopf: '**De :** Zoé · **À :** Mia · **Objet :** Bisous de Bretagne !', text: ['Salut Mia ! Je suis en Bretagne avec ma famille depuis cinq jours. Il fait beau, mais l’eau est froide ! Hier, nous avons fait du kayak de mer et nous avons vu des phoques. Demain, nous allons visiter le Mont-Saint-Michel.', 'Tu m’as demandé si mon correspondant luxembourgeois est sympa : oui, Tom est très gentil ! Je **lui** écris chaque semaine et je **lui** envoie des photos.', 'Et toi, comment s’est passé votre voyage à Vianden ? Raconte-**moi** tout ! Bisous, Zoé'] },
      ],
      woerter: [['les nouvelles', 'die Neuigkeiten'], ['le kayak de mer', 'das Seekajak'], ['le phoque', 'die Robbe'], ['visiter', 'besichtigen'], ['demander si', 'fragen, ob'], ['envoyer', 'schicken'], ['comment s’est passé …', 'wie war …'], ['raconter', 'erzählen']],
      aufgaben: [
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['Zoé est en Bretagne depuis cinq jours.', true], ['L’eau est chaude.', false], ['Hier, ils ont vu des phoques.', true], ['Zoé écrit à Tom chaque mois.', false]] },
        { art: 'tabelle', auftrag: 'Passé, présent ou futur ? Trouve une phrase.', stufe: 2, kopf: ['temps', 'phrase du courriel'], breiten: [24, 76], zeilen: [['passé', '[Hier, nous avons fait du kayak de mer.]'], ['présent', '[Je suis en Bretagne avec ma famille.]'], ['futur', '[Demain, nous allons visiter le Mont-Saint-Michel.]']] },
      ],
    },
    hoeren: {
      was: 'Un message vocal', wo: 'Message vocal sur le portable de Mia', titel: 'Écoute mon message !',
      situation: 'Tom a laissé un message vocal à Mia. Ensuite, Mia raconte le message à Amira.',
      bild: ['tom:froh:handy', 'mia:froh:handy'], sprecher: { Tom: 'm3', Mia: 'w3', Amira: 'w2' },
      text: [
        ['Tom', 'Salut Mia, c’est Tom ! Je t’appelle parce que Hugo, mon correspondant, vient au Luxembourg en juin ! Il arrive le douze juin en train. Il veut visiter Vianden. Tu viens avec nous ? Rappelle-moi ce soir !'],
        ['Amira', 'C’était qui au téléphone ?'],
        ['Mia', 'C’était un message de Tom. Il m’a dit que son correspondant Hugo vient au Luxembourg en juin.'],
        ['Amira', 'Super ! Il arrive quand ?'],
        ['Mia', 'Tom a dit qu’il arrive le douze juin, en train. Il m’a demandé si je venais avec eux à Vianden.'],
        ['Amira', 'Et tu vas lui répondre ?'],
        ['Mia', 'Oui, je vais le rappeler ce soir. Tu veux venir aussi ? Je peux lui demander !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un message vocal, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['un message qu’on écoute sur son portable', 'une lettre'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute le message de Tom et complète.', stufe: 1, kopf: ['question', 'réponse'], breiten: [40, 60], zeilen: [['Qui vient au Luxembourg ?', '[Hugo, le correspondant de Tom]'], ['Quand ?', '[le 12 juin]'], ['Comment ?', '[en train]'], ['Qu’est-ce qu’il veut visiter ?', '[Vianden]'], ['Qu’est-ce que Mia doit faire ?', '[rappeler Tom ce soir]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jeu du téléphone : dis une phrase à ton voisin. Il ou elle la rapporte à la classe : « Il / Elle m’a dit que … »', stufe: 3, karten: [
        { titel: 'Dire', text: ['Je vais au cinéma samedi.', 'J’ai un nouveau chat.', 'Je suis fatigué(e).'] },
        { titel: 'Rapporter', text: ['Il / Elle m’a dit que …', 'Il / Elle dit qu’il / elle …', 'Il / Elle m’a demandé si …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Rapporter des paroles', punkte: ['Tom : « **Je** viens. » → Tom dit qu’**il** vient.', '**Il m’a dit que** son correspondant **vient** en juin.', 'Question oui / non → **Il m’a demandé si** je venais.', 'Attention aux personnes : je → il / elle · mon → son'] },
         { titel: 'Les pronoms', tabelle: { kopf: ['', 'COD (qui ?)', 'COI (à qui ?)'], zeilen: [['moi', '**me**', '**me**'], ['toi', '**te**', '**te**'], ['lui / elle', '**le / la**', '**lui**'], ['nous', '**nous**', '**nous**'], ['vous', '**vous**', '**vous**'], ['eux / elles', '**les**', '**leur**']] } }],
        [{ art: 'tipp', titel: 'Une affiche de voyage', text: 'Un **titre** qui donne envie · 3 ou 4 **photos ou dessins** · des **phrases courtes** : où ? quoi voir ? quoi faire ? · un **slogan**' },
         { art: 'achtung', titel: 'Une lettre', text: 'Lieu et date en haut à droite · **Cher / Chère …** · le texte · **Bisous / Amitiés / À bientôt** · ta signature' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Rapporte les paroles.', stufe: 2, kopf: ['paroles', 'paroles rapportées'], saetze: [['Zoé : « Il fait beau. »', 'Zoé dit qu’il fait beau.'], ['Tom : « Je suis content. »', 'Tom m’a dit qu’il est content.'], ['Hugo : « Tu viens à Vianden ? »', 'Hugo m’a demandé si je viens / venais à Vianden.']] },
      { art: 'luecken', auftrag: 'Complète avec le, la, les, lui ou leur.', stufe: 1, saetze: ['Tu appelles Tom ? – Oui, je [l’]appelle ce soir.', 'Tu écris à Zoé ? – Oui, je [lui] écris.', 'Tu vois tes amis ? – Oui, je [les] vois samedi.', 'Tu réponds à tes parents ? – Oui, je [leur] réponds.'] },
    ],
    schreiben: [
      { art: 'frei', auftrag: 'Fais l’affiche de ta destination de voyage préférée (vraie ou imaginaire).', stufe: 1, html: '<div style="font-size:12.6pt;line-height:1.5;margin-bottom:2.5mm">Écris un titre, dessine trois images et écris trois phrases courtes : où ? quoi voir ? quoi faire ?</div><div style="border:0.6mm dashed var(--f);border-radius:3mm;height:80mm"></div>' },
      { art: 'schreiben', auftrag: 'Réponds à Zoé : raconte le voyage à Vianden (passé composé) et rapporte le message de Tom.', stufe: 3,
        anfaenge: ['Chère Zoé,', 'Le voyage à Vianden, c’était …', 'Nous avons …', 'Tom m’a dit que …', 'Bisous, …'], zeilen: 11,
        beispiel: 'Chère Zoé, merci pour ton courriel ! Le voyage à Vianden, c’était génial. Nous avons dormi à l’auberge de jeunesse et nous avons pris le télésiège. Tom m’a dit que son correspondant Hugo vient au Luxembourg en juin. Il m’a demandé si je viens avec eux à Vianden ! Bisous, Mia' },
    ],
    check: ['Je comprends un courriel avec des nouvelles.', 'Je comprends un message vocal.', 'Je rapporte des paroles.', 'J’utilise les pronoms COD et COI.', 'Je présente une destination et j’écris une lettre.'],
  },
]
