// Français · Module 6 « Nature et avenir » (Régime / Voie de préparation, A2.1 – A2.2) – cahier multimodal.
// D’après le « Programme FRANC 7P–5P » (CNES, 20/03/2019), Module 6 « La vie en société, la
// nature et l’environnement » (socle pour l’accès à la 5e AD) : ville et campagne, espaces naturels, protection de la nature,
// animaux de compagnie et animaux sauvages, avenir de la planète, épanouissement personnel ; futur simple, temps du
// passé (révision), adverbes en -ment, être en train de, connecteurs du récit, si + présent → futur, cause (parce
// que, car), indicateurs de temps, degrés de certitude, registre familier / standard, journal de bord.
// Personnes, refuge, cabinet vétérinaire et projet d’école : imaginaires. Informations sur la nature simplifiées.

export const MODUL = {
  id: 'franzoesisch-m6', kuerzel: 'fr6', nr: 6, sprache: 'fr', niveau: 'A2.1 – A2.2', klasse: 'Voie de préparation',
  dateiname: 'Francais_Module-6',
  fach: { de: 'Französisch', fr: 'Français' },
  titel: { de: 'Natur und Zukunft', fr: 'Nature et avenir' },
  untertitel: { fr: 'Choisir entre ville et campagne, raconter une aventure, adopter et soigner un animal, découvrir la nature, agir pour la planète, imaginer l’avenir et parler de ses rêves – en huit unités.', de: 'Zwischen Stadt und Land wählen, ein Abenteuer erzählen, ein Tier adoptieren und pflegen, die Natur entdecken, etwas für den Planeten tun, die Zukunft ausmalen und über Träume sprechen – in acht Einheiten.' },
  farben: { tief: '#2f7d32', mittel: '#a5d6a7', zart: '#eef7ee', dunkel: '#1b4d1e' },
  deckbild: ['amira:froh:stehen-zeigen', 'finn:froh:laessig', 'nele:froh:stehen'],
  blasen: [{ t: 'Ville ou campagne ?', x: 8, y: 108 }, { t: 'En 2050…', x: 128, y: 98 }, { t: 'Si je veux, je peux !', x: 140, y: 150 }],
  themen: [
    { titel: { fr: 'Ville, campagne, aventures', de: 'Stadt, Land, Abenteuer' }, icon: 'map', lektionen: 2 },
    { titel: { fr: 'Les animaux', de: 'Die Tiere' }, icon: 'paw', lektionen: 3 },
    { titel: { fr: 'Notre planète, notre avenir', de: 'Unser Planet, unsere Zukunft' }, icon: 'plant', lektionen: 3 },
  ],
  anleitung: [
    'Chaque leçon a cinq parties : **Lire**, **Écouter**, **La règle**, **S’entraîner** et **Écrire**. À la fin, il y a un **mini-bilan**.',
    'À côté de chaque texte, il y a un **code QR**. Scanne-le avec ton portable : tu entends le texte. Écoute plusieurs fois pour trouver les informations importantes.',
    'Les points montrent le niveau : ●○○ base · ●●○ moyen · ●●● plus. Commence par la base.',
    'Le module 6 est le socle pour accéder à une classe de **5e AD**. Les personnes du cahier sont imaginaires. Tu parles de toi seulement si tu veux : tu peux toujours inventer.',
  ],
  // seulement pour la voix (Regex Python)
  aussprache: {
    '\\bMme\\b': 'Madame', '\\bM\\. ': 'Monsieur ', '\\bDr\\b': 'docteure', '(\\d{1,2}) h (\\d\\d)': '\\1 heures \\2', '(\\d{1,2}) h\\b': '\\1 heures', '(\\d+) ?%': '\\1 pour cent', '\\b7P2\\b': 'septième P 2',
  },
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Ville et campagne · parce que, car', titel: 'Ville ou campagne ?', untertitel: 'Bus, magasins, forêt, calme : tu lis deux témoignages, tu écoutes un micro-trottoir et tu dis où tu préfères vivre.',
    ziel: { fr: 'Je décris un lieu de vie et j’explique ma préférence.', de: 'Ich beschreibe einen Wohnort und begründe, was ich lieber mag.' },
    bild: ['nele:froh:stehen', 'finn:froh:laessig'],
    start: {
      was: 'En ville ou à la campagne ?',
      aufgaben: [
        { art: 'rf', auftrag: 'En ville ou à la campagne ? Coche.', stufe: 1, spalten: ['en ville', 'à la campagne'], saetze: [['beaucoup de magasins', true], ['des champs et des vaches', false], ['un bus toutes les dix minutes', true], ['le calme et l’air pur', false], ['des embouteillages', true], ['une ferme', false]] },
      ],
    },
    lesen: {
      was: 'Deux témoignages', art: 'dokumente',
      quelle: 'Blog des jeunes (personnes imaginaires)', titel: 'Où est-ce que tu habites ?',
      dokumente: [
        { stil: 'nachricht', stimme: 'w3', kopf: '**Inès, 14 ans** – j’habite en ville', text: ['J’habite à Luxembourg-Ville, au quatrième étage d’un immeuble. Ce que j’adore, c’est que tout est près de chez moi : le cinéma, la piscine, les magasins. Je vais au lycée à pied ou en bus, **car** les bus passent toutes les dix minutes. Par contre, il y a beaucoup de bruit et de voitures. Et je n’ai pas de jardin.'] },
        { stil: 'nachricht', stimme: 'm1', kopf: '**Luca, 14 ans** – j’habite à la campagne', text: ['J’habite dans un petit village des Ardennes, près d’une forêt. Le matin, je vois des chevreuils par ma fenêtre ! C’est calme et l’air est pur. Par contre, le bus pour le lycée part à 6 h 45 et il n’y a pas de cinéma. Pour voir mes copains, je dois prendre le vélo.'] },
      ],
      woerter: [['l’immeuble', 'das Wohnhaus'], ['tout près', 'ganz nah'], ['car', 'denn'], ['le bruit', 'der Lärm'], ['le chevreuil', 'das Reh'], ['calme', 'ruhig'], ['l’air pur', 'saubere Luft'], ['l’embouteillage', 'der Stau']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Avantages et inconvénients : complète.', stufe: 1, kopf: ['', 'Inès (en ville)', 'Luca (à la campagne)'], breiten: [18, 41, 41], zeilen: [['+ avantages', '[tout est près ; un bus toutes les 10 minutes]', '[calme, air pur, forêt, chevreuils]'], ['– inconvénients', '[bruit, voitures, pas de jardin]', '[bus à 6 h 45, pas de cinéma, copains loin]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Inès habite dans une maison avec un jardin.', false], ['Luca voit des chevreuils.', true], ['Le bus de Luca part à 7 h 45.', false]] },
      ],
    },
    hoeren: {
      was: 'Un micro-trottoir', wo: 'Marché de Diekirch · samedi', titel: 'Vous préférez la ville ou la campagne ?',
      situation: 'Pour la radio des jeunes, Yusuf pose une question aux gens au marché : vous préférez vivre en ville ou à la campagne ?',
      bild: ['yusuf:froh:handy', 'oma:froh'], sprecher: { Yusuf: 'm3', 'Une dame': 'w1', 'Un monsieur': 'm2', 'Une jeune fille': 'w2' },
      text: [
        ['Yusuf', 'Bonjour, Madame ! Vous préférez vivre en ville ou à la campagne ?'],
        ['Une dame', 'À la campagne, bien sûr ! J’habite dans une ferme depuis quarante ans. J’adore le calme et mes animaux.'],
        ['Yusuf', 'Et vous, Monsieur ?'],
        ['Un monsieur', 'Moi, je préfère la ville, car je n’ai pas de voiture. En ville, tout est près : le travail, le médecin, le supermarché.'],
        ['Yusuf', 'Et toi ?'],
        ['Une jeune fille', 'Je crois que je préfère la campagne pour vivre… mais la ville pour sortir le week-end ! L’idéal, c’est une petite ville, pas trop loin de la nature.'],
        ['Yusuf', 'Merci à tous !'],
      ],
      vor: [{ art: 'mc', auftrag: 'À la campagne, il y a souvent … Coche.', stufe: 1, fragen: [{ f: '', o: ['des champs', 'des fermes', 'beaucoup d’embouteillages'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'préfère …', 'pourquoi ?'], breiten: [22, 26, 52], zeilen: [['la dame', '[la campagne]', '[le calme, ses animaux ; elle habite dans une ferme]'], ['le monsieur', '[la ville]', '[il n’a pas de voiture ; tout est près]'], ['la jeune fille', '[une petite ville]', '[la campagne pour vivre, la ville pour sortir]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Où est-ce que tu préfères vivre : en ville, à la campagne, à la mer, à la montagne ? Discute avec ton ou ta partenaire.', stufe: 3, karten: [
        { titel: 'Dire sa préférence', text: ['Je préfère … car …', 'Ce que j’aime à …, c’est …', 'Par contre, …'] },
        { titel: 'Réagir', text: ['Moi aussi !', 'Ah non, moi, je …', 'Tu as raison, mais …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'En ville · à la campagne', punkte: ['**en ville** : l’immeuble, la rue, le bus, les magasins, le bruit', '**à la campagne** : le village, la ferme, le champ, la forêt, le calme', '**à la mer** · **à la montagne** · **au bord d’**un lac'] },
         { titel: 'Expliquer : parce que, car', punkte: ['Je préfère la ville **parce que** j’aime sortir.', 'Je préfère la ville, **car** je n’ai pas de voiture.', '**car** s’utilise surtout à l’écrit.', '**Pourquoi** ? – **Parce que** …'] }],
        [{ art: 'tipp', titel: 'Avantages et inconvénients', text: '**L’avantage**, c’est que tout est près. · **L’inconvénient**, c’est le bruit. · **D’un côté**, … **de l’autre**, …' },
         { art: 'achtung', titel: 'depuis', text: 'J’habite ici **depuis** quarante ans. (présent + depuis = seit)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec les mots.', stufe: 1, woerter: ['un immeuble', 'des embouteillages', 'une ferme', 'des vaches', 'le calme'], saetze: ['En ville, j’habite dans [un immeuble].', 'Le matin, il y a [des embouteillages] en ville.', 'À la campagne, mon oncle habite dans [une ferme].', 'Dans le champ, il y a [des vaches].', 'J’aime la campagne pour [le calme].'] },
      { art: 'luecken', auftrag: 'Complète avec car ou depuis.', stufe: 2, saetze: ['Je prends le bus, [car] je n’ai pas de vélo.', 'Elle habite à Wiltz [depuis] trois ans.', 'Il aime la campagne, [car] c’est calme.', 'Nous sommes au lycée [depuis] septembre.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Décris l’endroit où tu aimerais vivre plus tard (en ville, à la campagne, à la mer …).', stufe: 2,
        anfaenge: ['Plus tard, j’aimerais vivre …', 'Là-bas, il y a …', 'L’avantage, c’est que …', 'L’inconvénient, c’est …', 'Je préfère cet endroit car …'], zeilen: 10,
        beispiel: 'Plus tard, j’aimerais vivre dans une petite ville au bord de la mer. Là-bas, il y a une plage, un port et des cafés. L’avantage, c’est que je peux nager tous les jours. L’inconvénient, c’est qu’il y a beaucoup de touristes en été. Je préfère cet endroit car j’adore la mer.' },
    ],
    check: ['Je comprends des témoignages sur la ville et la campagne.', 'Je comprends un micro-trottoir.', 'J’explique avec parce que et car.', 'Je parle des avantages et des inconvénients.', 'Je décris l’endroit où j’aimerais vivre.'],
  },
  // ================================================================ 2
  {
    thema: 'Raconter une aventure · adverbes en -ment', titel: 'Perdues dans la forêt !', untertitel: 'Une balade qui tourne mal : tu remets une histoire dans l’ordre, tu écoutes la version d’une amie et tu racontes une anecdote.',
    ziel: { fr: 'Je comprends et je raconte une anecdote au passé.', de: 'Ich verstehe und erzähle eine kleine Geschichte in der Vergangenheit.' },
    bild: ['lea:aengstlich:gehen', 'chloe:froh:handy'],
    start: {
      was: 'Les adverbes',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['heureusement', 'rapidement', 'doucement', 'soudain', 'finalement'], rechts: ['zum Glück', 'schnell', 'leise, sanft', 'plötzlich', 'schließlich'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Une anecdote', art: 'text', stimme: 'w2', nummern: true,
      quelle: 'Blog de Léa (histoire imaginaire)', titel: 'Une balade qui tourne mal',
      absaetze: [
        'Samedi dernier, j’**étais** avec ma copine Chloé dans le Mullerthal. Il **faisait** beau et nous **voulions** faire une balade de deux heures.',
        '**D’abord**, tout **allait** bien. Nous **marchions** entre les rochers et nous **prenions** des photos. **Mais** une heure plus tard, nous **avons quitté** le chemin pour voir une petite cascade.',
        '**Soudain**, Chloé **a dit** : « Où est le chemin ? » Nous **nous sommes perdues** ! Le soleil **descendait** et mon portable **n’avait plus** que 5 % de batterie.',
        '**Et alors**, j’**ai eu** une idée : nous **avons appelé** le 112 et nous **avons envoyé** notre position. **Heureusement**, le garde forestier **est arrivé** très **rapidement**.',
        '**À la fin**, nous **avons bu** un chocolat chaud au village. Depuis ce jour, je prends toujours une carte et une batterie de secours !',
      ],
      woerter: [['la balade', 'der Spaziergang'], ['quitter', 'verlassen'], ['le chemin', 'der Weg'], ['la cascade', 'der Wasserfall'], ['se perdre', 'sich verirren'], ['la batterie', 'der Akku'], ['le garde forestier', 'der Förster'], ['la carte', 'die Landkarte']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Remets l’histoire dans l’ordre.', stufe: 1, teile: ['Léa et Chloé font une balade dans le Mullerthal.', 'Elles prennent des photos entre les rochers.', 'Elles quittent le chemin pour voir une cascade.', 'Elles se perdent.', 'Elles appellent le 112.', 'Le garde forestier arrive.'], ordnung: [3, 0, 5, 2, 4, 1] },
        { art: 'tabelle', auftrag: 'Paragraphes 3 et 4 : classe les verbes.', stufe: 2, kopf: ['imparfait (la situation)', 'passé composé (les actions)'], breiten: [40, 60], zeilen: [['[descendait, n’avait plus]', '[a dit, nous sommes perdues, ai eu, avons appelé, avons envoyé, est arrivé]']] },
      ],
    },
    hoeren: {
      was: 'Une autre version', wo: 'Radio des jeunes · rubrique « Ça m’est arrivé »', titel: 'J’ai eu très peur !',
      situation: 'À la radio des jeunes, Chloé raconte la même balade. Sa version est un peu différente…',
      bild: ['yusuf:froh:erklaeren', 'chloe:aengstlich'], sprecher: { Yusuf: 'm3', Chloé: 'w2' },
      text: [
        ['Yusuf', 'Chloé, tu as vécu une aventure dans le Mullerthal ?'],
        ['Chloé', 'Oui ! Samedi, j’étais avec Léa. Au début, c’était super. Mais c’est moi qui ai voulu voir la cascade… C’était mon idée, je l’avoue !'],
        ['Yusuf', 'Et qu’est-ce qui s’est passé ?'],
        ['Chloé', 'On a quitté le chemin et, tout à coup, on ne savait plus où on était. Il faisait de plus en plus sombre. J’ai eu très peur, je pleurais un peu.'],
        ['Yusuf', 'Et alors ?'],
        ['Chloé', 'Léa est restée calme. Elle a appelé le 112. Nous avons attendu seulement vingt minutes, mais pour moi, c’était très long !'],
        ['Yusuf', 'Qu’est-ce que tu as appris ?'],
        ['Chloé', 'On ne quitte pas le chemin, on prend une carte… et on reste calme, comme Léa !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Si on se perd en forêt, il faut … Coche.', stufe: 1, fragen: [{ f: '', o: ['rester calme', 'appeler le 112', 'courir dans tous les sens'], r: [0, 1] }] }],
      beim: [
        { art: 'rf', auftrag: 'Écoute. Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['C’était l’idée de Chloé de voir la cascade.', true], ['Chloé est restée très calme.', false], ['Elles ont attendu vingt minutes.', true], ['Chloé a appris à quitter le chemin.', false]] },
        { art: 'mc', auftrag: 'Quelle est la différence entre les deux versions ? Coche.', stufe: 2, fragen: [{ f: '', o: ['Chloé dit que c’était son idée et qu’elle a eu très peur.', 'Chloé dit qu’elles sont restées trois jours dans la forêt.'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Raconte une petite aventure (vraie ou inventée). Ton ou ta partenaire réagit.', stufe: 3, karten: [
        { titel: 'Raconter', text: ['C’était … · Il faisait …', 'D’abord, … Mais soudain, …', 'Et alors, …', 'À la fin, …'] },
        { titel: 'Réagir', text: ['Oh non !', 'Et après ?', 'Heureusement !', 'Tu as eu peur ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Raconter au passé', punkte: ['**Imparfait** : la situation : Il **faisait** beau. J’**étais** avec Chloé.', '**Passé composé** : les actions : Nous **avons quitté** le chemin.', 'Pronominal : nous **nous sommes perdu(e)s**.', 'Les questions du récit : qui ? quoi ? où ? quand ?'] },
         { titel: 'Organiser le récit', punkte: ['**d’abord** · **ensuite** · **après**', '**soudain** · **tout à coup** · **et alors**', '**enfin** · **à la fin** · **finalement**', '**depuis ce jour**, …'] }],
        [{ art: 'tipp', titel: 'Les adverbes en -ment', text: 'rapide → rapide**ment** · heureuse → heureuse**ment** · douce → douce**ment** · finale → finale**ment** (adjectif au féminin + -ment)' },
         { art: 'achtung', titel: 'En sécurité', text: 'En forêt : reste sur le chemin, prends une carte et un portable chargé. Perdu(e) ? Reste calme et appelle le **112**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Forme l’adverbe.', stufe: 1, saetze: ['(rapide) Le garde est arrivé [rapidement].', '(heureux) [Heureusement], il ne pleuvait pas.', '(doux) Il parlait [doucement].', '(final) [Finalement], nous sommes rentrés.'] },
      { art: 'luecken', auftrag: 'Imparfait ou passé composé ? Conjugue.', stufe: 2, saetze: ['(faire) Il [faisait] beau.', '(voir) Soudain, nous [avons vu] un cerf.', '(marcher) Nous [marchions] depuis une heure.', '(crier) Tout à coup, Chloé [a crié].'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Raconte une anecdote (vraie ou inventée) : une sortie, une surprise, une petite aventure.', stufe: 2,
        anfaenge: ['C’était … Il faisait …', 'D’abord, …', 'Soudain, …', 'Heureusement, …', 'À la fin, …'], zeilen: 11,
        beispiel: 'C’était un dimanche d’hiver. Il faisait froid et il neigeait. D’abord, nous avons fait une bataille de boules de neige dans le parc. Soudain, mon frère est tombé dans un gros tas de neige ! Heureusement, il n’avait pas mal. À la fin, nous avons bu un chocolat chaud et nous avons beaucoup ri.' },
    ],
    check: ['Je remets une histoire dans l’ordre.', 'Je comprends deux versions d’une histoire.', 'J’utilise l’imparfait et le passé composé.', 'J’utilise des adverbes en -ment.', 'Je raconte une anecdote.'],
  },
  // ================================================================ 3
  {
    thema: 'Les animaux de compagnie · être en train de', titel: 'Un ami à quatre pattes', untertitel: 'Chien, chatte, lapin : tu lis les portraits d’animaux d’un refuge, tu écoutes un appel et tu écris une annonce.',
    ziel: { fr: 'Je décris un animal : son physique et son caractère.', de: 'Ich beschreibe ein Tier: Aussehen und Charakter.' },
    bild: ['mia:froh:stehen', 'arzthelferin:froh:erklaeren'],
    start: {
      was: 'Les animaux',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Les animaux : relie.', stufe: 1, links: ['le chien', 'le chat', 'le lapin', 'le cheval', 'l’oiseau', 'le poisson rouge'], rechts: ['der Hund', 'die Katze', 'das Kaninchen', 'das Pferd', 'der Vogel', 'der Goldfisch'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Des portraits d’animaux', art: 'dokumente',
      quelle: 'Site d’un refuge (animaux et refuge imaginaires)', titel: 'Ils cherchent une famille',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Caramel** – chien, 3 ans', text: ['Caramel est un grand chien marron avec de longues oreilles. Il est **affectueux** et très **joueur**. Il adore courir : il lui faut une famille sportive et un jardin. Il s’entend bien avec les enfants, mais pas avec les chats !'] },
        { stil: 'karte', stimme: 'w2', kopf: '**Mimi** – chatte, 8 ans', text: ['Mimi est une petite chatte grise aux yeux verts. Elle est **calme** et un peu **timide**. Elle aime dormir au soleil. Elle cherche une personne tranquille, sans enfants trop petits.'] },
        { stil: 'karte', stimme: 'm1', kopf: '**Pistache** – lapin, 1 an', text: ['Pistache est un lapin blanc et noir. Il est **curieux** mais **peureux** : quand il y a du bruit, il se cache. Il mange surtout du foin et des légumes. Il a besoin de beaucoup de place pour sauter.'] },
        { stil: 'nachricht', stimme: 'w1', kopf: '**Refuge Les Amis des Bêtes**', text: ['Adopter un animal, c’est pour toute sa vie. Avant d’adopter, réfléchissez bien : temps, place, argent. Visites : le mercredi et le samedi, de 14 h à 17 h.'] },
      ],
      woerter: [['le refuge', 'das Tierheim'], ['affectueux', 'verschmust'], ['joueur', 'verspielt'], ['s’entendre avec', 'sich verstehen mit'], ['timide', 'schüchtern'], ['peureux', 'ängstlich'], ['se cacher', 'sich verstecken'], ['adopter', 'adoptieren']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète les fiches.', stufe: 1, kopf: ['animal', 'physique', 'caractère'], breiten: [20, 44, 36], zeilen: [['Caramel', '[grand, marron, longues oreilles]', '[affectueux, joueur]'], ['Mimi', '[petite, grise, yeux verts]', '[calme, un peu timide]'], ['Pistache', '[blanc et noir]', '[curieux, peureux]']] },
        { art: 'wer', auftrag: 'Quel animal pour qui ? Coche.', stufe: 2, personen: ['Caramel', 'Mimi', 'Pistache'], saetze: [['une famille sportive avec un jardin', 'Caramel'], ['une dame âgée qui aime le calme', 'Mimi'], ['une personne avec beaucoup de place, sans bruit', 'Pistache']] },
      ],
    },
    hoeren: {
      was: 'Un appel', wo: 'Refuge Les Amis des Bêtes · samedi', titel: 'Qu’est-ce que tu es en train de faire ?',
      situation: 'Mia est au refuge avec sa tante, qui est bénévole. Sami l’appelle au téléphone.',
      bild: ['sami:froh:handy', 'mia:froh:handy'], sprecher: { Sami: 'm3', Mia: 'w3' },
      text: [
        ['Sami', 'Salut Mia ! Tu viens au parc ?'],
        ['Mia', 'Désolée, je ne peux pas. Je suis au refuge avec ma tante. Elle est bénévole ici.'],
        ['Sami', 'Et qu’est-ce que tu es en train de faire ?'],
        ['Mia', 'Je suis en train de brosser Mimi, une vieille chatte très douce. Et ma tante est en train de promener les chiens.'],
        ['Sami', 'Il y a beaucoup d’animaux ?'],
        ['Mia', 'Oui, trente chiens, vingt chats et des lapins. Il y a un chien génial, Caramel. Il est super joueur, mais il a besoin d’un jardin.'],
        ['Sami', 'Nous, on a un jardin ! Je vais demander à la maison…'],
        ['Mia', 'Attention, Sami : un chien, c’est beaucoup de travail. Il faut le promener deux ou trois fois par jour, même quand il pleut !'],
        ['Sami', 'Tu as raison. On va réfléchir. Mais je peux venir le voir mercredi ?'],
        ['Mia', 'Bien sûr ! Les visites sont de quatorze à dix-sept heures.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un refuge, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['un endroit pour les animaux sans famille', 'un magasin d’animaux'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'Mia est en train de …', o: ['brosser une chatte', 'promener un chien'], r: 0 }, { f: 'Sa tante est en train de …', o: ['nourrir les lapins', 'promener les chiens'], r: 1 }, { f: 'Au refuge, il y a …', o: ['30 chiens et 20 chats', '20 chiens et 30 chats'], r: 0 }, { f: 'Un chien, il faut le promener …', o: ['une fois par semaine', 'deux ou trois fois par jour'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jeu de mime : « Qu’est-ce que tu es en train de faire ? » Mime une action, ton ou ta partenaire devine.', stufe: 3, karten: [
        { titel: 'Demander', text: ['Qu’est-ce que tu es en train de faire ?', 'Tu es en train de … ?'] },
        { titel: 'Répondre', text: ['Oui, je suis en train de …', 'Non, je suis en train de …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'être en train de', punkte: ['**être en train de** + infinitif = gerade etwas tun', 'Je **suis en train de** brosser la chatte.', 'Ma tante **est en train de** promener les chiens.', 'Qu’est-ce que tu **es en train de** faire ?'] },
         { titel: 'Le caractère', tabelle: { kopf: ['il est …', 'elle est …'], zeilen: [['affectu**eux**', 'affectu**euse**'], ['peur**eux**', 'peur**euse**'], ['jou**eur**', 'jou**euse**'], ['dou**x**', 'dou**ce**'], ['calme', 'calme'], ['timide', 'timide']] } }],
        [{ art: 'tipp', titel: 'Décrire un animal', text: '**Il est** grand, marron … · **Il a** de longues oreilles, les yeux verts · **Il aime** … · **Il a besoin de** …' },
         { art: 'achtung', titel: 'Adopter', text: 'Un animal, c’est pour **toute sa vie** : il faut du **temps**, de la **place** et de l’**argent** pour le vétérinaire.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec être en train de.', stufe: 1, saetze: ['Mia [est en train de] brosser la chatte.', 'Nous [sommes en train de] nourrir les lapins.', 'Tu [es en train de] faire tes devoirs ?', 'Les chiens [sont en train de] jouer.'] },
      { art: 'luecken', auftrag: 'Accorde l’adjectif.', stufe: 2, saetze: ['(affectueux) Mimi est très [affectueuse].', '(joueur) Ma chienne est [joueuse].', '(peureux) Les lapins sont [peureux].', '(doux) La chatte est [douce].'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris une annonce pour le refuge : le portrait d’un animal (réel ou imaginaire).', stufe: 2,
        anfaenge: ['… cherche une famille !', 'C’est un / une … de … ans.', 'Il / Elle est … et …', 'Il / Elle aime …', 'Il / Elle a besoin de …'], zeilen: 9,
        beispiel: 'Biscotte cherche une famille ! C’est une petite chienne blanche de deux ans. Elle est affectueuse et très douce. Elle aime les promenades et les enfants. Elle a besoin d’une famille qui a du temps pour elle.' },
    ],
    check: ['Je comprends le portrait d’un animal.', 'Je décris le physique et le caractère.', 'J’utilise être en train de.', 'J’accorde les adjectifs.', 'J’écris une annonce.'],
  },
  // ================================================================ 4
  {
    thema: 'Les conseils · l’impératif et les pronoms', titel: 'Chez le vétérinaire', untertitel: 'Un chiot à la maison : tu lis des conseils, tu écoutes une consultation chez la vétérinaire et tu donnes des conseils.',
    ziel: { fr: 'Je comprends des conseils et je donne des conseils.', de: 'Ich verstehe Ratschläge und gebe selbst Ratschläge.' },
    bild: ['aerztin:froh:erklaeren', 'noah:aengstlich:stehen'],
    start: {
      was: 'S’occuper d’un animal',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['nourrir', 'promener', 'brosser', 'soigner', 'vacciner', 'caresser'], rechts: ['füttern', 'Gassi gehen mit', 'bürsten', 'pflegen, behandeln', 'impfen', 'streicheln'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Des conseils', art: 'dokumente',
      quelle: 'Dépliant d’un cabinet vétérinaire (imaginaire)', titel: 'Un chiot à la maison',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Un chiot à la maison : les conseils de la vétérinaire**', text: ['**Nourrissez** votre chiot trois ou quatre fois par jour, toujours à la même heure. **Ne lui donnez pas** de chocolat : c’est du poison pour les chiens !', '**Il faut** toujours laisser de l’eau propre dans sa gamelle.', '**Promenez-le** souvent, **car** il doit apprendre à faire ses besoins dehors.', 'Votre chiot doit être **vacciné**. **Prenez** rendez-vous chez le vétérinaire dès la première semaine.', '**Il est important de** jouer avec lui chaque jour : un chien qui s’ennuie fait des bêtises !'] },
      ],
      woerter: [['le chiot', 'der Welpe'], ['nourrir', 'füttern'], ['le poison', 'das Gift'], ['la gamelle', 'der Napf'], ['faire ses besoins', 'sein Geschäft machen'], ['vacciner', 'impfen'], ['s’ennuyer', 'sich langweilen'], ['la bêtise', 'der Unfug']],
      aufgaben: [
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['On donne à manger au chiot une fois par jour.', false], ['Le chocolat est dangereux pour les chiens.', true], ['Le chiot doit être vacciné.', true], ['Un chien qui s’ennuie est toujours calme.', false]] },
        { art: 'fragen', auftrag: 'Réponds.', stufe: 2, fragen: [{ f: 'Pourquoi faut-il promener le chiot souvent ?', l: 'car il doit apprendre à faire ses besoins dehors' }, { f: 'Qu’est-ce qu’il faut toujours laisser dans la gamelle ?', l: 'de l’eau propre' }] },
      ],
    },
    hoeren: {
      was: 'Une consultation', wo: 'Cabinet vétérinaire · lundi', titel: 'Il ne mange plus !',
      situation: 'Noah amène son chien Rocky chez la vétérinaire, la docteure Klein. Rocky ne va pas bien.',
      bild: ['aerztin:froh:erklaeren', 'noah:traurig'], sprecher: { 'Dr Klein': 'w1', Noah: 'm3' },
      text: [
        ['Dr Klein', 'Bonjour ! Alors, qu’est-ce qui ne va pas avec Rocky ?'],
        ['Noah', 'Il ne mange plus depuis hier. Et il dort tout le temps. Il est triste.'],
        ['Dr Klein', 'Je vais l’examiner. Viens, Rocky… doucement… Est-ce qu’il a mangé quelque chose de bizarre ?'],
        ['Noah', 'Euh… Hier, il était en train de jouer dans la cuisine. Je crois qu’il a mangé un morceau de chocolat.'],
        ['Dr Klein', 'Ah ! Le chocolat, c’est du poison pour les chiens. Heureusement, c’était un petit morceau. Il va guérir.'],
        ['Noah', 'Qu’est-ce qu’on doit faire ?'],
        ['Dr Klein', 'Donnez-lui ces médicaments deux fois par jour, avec un peu de nourriture. Laissez-le se reposer et donnez-lui beaucoup d’eau. Si ça ne va pas mieux dans deux jours, revenez me voir.'],
        ['Noah', 'Merci, docteure ! Désolé, Rocky… Plus de chocolat dans la cuisine !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Chez le vétérinaire, on parle de … Coche.', stufe: 1, fragen: [{ f: '', o: ['la santé de l’animal', 'les médicaments', 'les notes de l’école'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['question', 'réponse'], breiten: [42, 58], zeilen: [['Qu’est-ce qui ne va pas avec Rocky ?', '[il ne mange plus, il dort tout le temps]'], ['Depuis quand ?', '[depuis hier]'], ['Qu’est-ce qu’il a mangé ?', '[un morceau de chocolat]'], ['Les médicaments : combien de fois ?', '[deux fois par jour, avec un peu de nourriture]'], ['Quand revenir ?', '[si ça ne va pas mieux dans deux jours]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jouez une consultation chez le vétérinaire.', stufe: 3, karten: [
        { titel: 'Propriétaire', text: ['Mon chat / chien ne … plus.', 'Depuis …', 'Qu’est-ce qu’on doit faire ?'] },
        { titel: 'Vétérinaire', text: ['Qu’est-ce qui ne va pas ?', 'Donnez-lui …', 'Il faut …', 'Revenez si …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Donner des conseils', punkte: ['Impératif : **Promenez-le** ! · **Ne lui donnez pas** de chocolat !', '**Il faut** + infinitif : Il faut laisser de l’eau.', '**Il est important de** jouer avec lui.', 'Vous **devez** · Tu **dois** prendre rendez-vous.'] },
         { titel: 'Les pronoms avec l’impératif', punkte: ['Promène **le chien** → Promène-**le** !', 'Donne de l’eau **au chien** → Donne-**lui** de l’eau !', 'Négation : **Ne lui** donne **pas** de chocolat.', 'Laissez-**le** se reposer.'] }],
        [{ art: 'tipp', titel: 'Expliquer : car, parce que', text: 'Promenez-le souvent, **car** il doit apprendre. · Il est triste **parce qu’**il est malade.' },
         { art: 'achtung', titel: 'Dangereux pour les chiens', text: 'Le **chocolat**, le **raisin**, l’**oignon** : jamais pour un chien ! En cas de doute, appelle le vétérinaire.' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Donne le conseil à l’impératif (vous).', stufe: 1, kopf: ['il faut …', 'impératif'], saetze: [['Il faut promener le chien.', 'Promenez le chien !'], ['Il faut donner de l’eau au chat.', 'Donnez de l’eau au chat !'], ['Il ne faut pas donner de chocolat.', 'Ne donnez pas de chocolat !']] },
      { art: 'luecken', auftrag: 'Remplace par le, la, les ou lui.', stufe: 2, saetze: ['Promène le chien ! → Promène-[le] !', 'Brosse la chatte ! → Brosse-[la] !', 'Donne de l’eau au lapin ! → Donne-[lui] de l’eau !', 'Caresse les chatons ! → Caresse-[les] !'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris cinq conseils pour s’occuper d’un animal (chat, poisson, cheval …).', stufe: 2,
        anfaenge: ['Pour s’occuper d’un …,', 'Il faut …', 'Donnez-lui …', 'Ne … pas …', 'Il est important de … car …'], zeilen: 9,
        beispiel: 'Pour s’occuper d’un poisson rouge, il faut changer l’eau de l’aquarium chaque semaine. Donnez-lui un peu de nourriture une fois par jour. Ne mettez pas l’aquarium au soleil. Il est important de ne pas lui donner trop à manger, car il peut tomber malade.' },
    ],
    check: ['Je comprends des conseils écrits.', 'Je comprends une consultation.', 'Je donne des conseils à l’impératif.', 'J’utilise le, la, les, lui avec l’impératif.', 'J’explique avec car et parce que.'],
  },
  // ================================================================ 5
  {
    thema: 'Les animaux sauvages · présenter', titel: 'La nature près de chez nous', untertitel: 'Castor, cigogne noire, chat sauvage : tu lis des portraits d’animaux sauvages, tu écoutes une guide nature et tu présentes un animal.',
    ziel: { fr: 'Je comprends un texte informatif sur la nature et je présente un animal.', de: 'Ich verstehe einen Sachtext über die Natur und stelle ein Tier vor.' },
    bild: ['lehrerin:froh:stehen-zeigen', 'yusuf:ueberrascht:stehen'],
    start: {
      was: 'Les animaux sauvages',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['le castor', 'la cigogne noire', 'le chat sauvage', 'le hibou', 'le renard', 'le hérisson'], rechts: ['der Biber', 'der Schwarzstorch', 'die Wildkatze', 'die Eule', 'der Fuchs', 'der Igel'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Des portraits', art: 'dokumente',
      quelle: 'Magazine nature pour les jeunes (textes simplifiés)', titel: 'Trois animaux discrets',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Le castor**', text: ['Le castor est le plus grand rongeur d’Europe. Il vit **près des rivières** et construit des barrages avec du bois. Il travaille surtout la nuit. Pendant longtemps, il n’y avait plus de castors au Luxembourg. Aujourd’hui, ils sont revenus dans le nord du pays.'] },
        { stil: 'karte', stimme: 'm1', kopf: '**La cigogne noire**', text: ['Contrairement à la cigogne blanche, la cigogne noire est très **timide**. Elle vit **cachée** dans les grandes forêts, près des ruisseaux. Elle mange des poissons et des grenouilles. En hiver, elle part en Afrique.'] },
        { stil: 'karte', stimme: 'w2', kopf: '**Le chat sauvage**', text: ['Il ressemble à un gros chat gris, avec une queue épaisse à anneaux noirs. Il vit **discrètement** dans les forêts. Il est **protégé** : il est interdit de le chasser.'] },
      ],
      woerter: [['sauvage', 'wild'], ['le rongeur', 'das Nagetier'], ['le barrage', 'der Damm'], ['revenir', 'zurückkommen'], ['caché', 'versteckt'], ['le ruisseau', 'der Bach'], ['la queue', 'der Schwanz'], ['protégé', 'geschützt']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète le tableau.', stufe: 1, kopf: ['animal', 'où il vit', 'une information'], breiten: [22, 34, 44], zeilen: [['le castor', '[près des rivières]', '[il construit des barrages ; il est revenu au Luxembourg]'], ['la cigogne noire', '[dans les grandes forêts, près des ruisseaux]', '[elle est timide ; en hiver, elle part en Afrique]'], ['le chat sauvage', '[dans les forêts]', '[il est protégé]']] },
        { art: 'mc', auftrag: 'Coche.', stufe: 2, fragen: [{ f: 'Le castor travaille surtout …', o: ['le jour', 'la nuit'], r: 1 }, { f: 'En hiver, la cigogne noire …', o: ['dort', 'part en Afrique'], r: 1 }] },
      ],
    },
    hoeren: {
      was: 'Une balade nature', wo: 'Réserve naturelle · balade guidée', titel: 'Chut ! Écoutez la forêt…',
      situation: 'La classe fait une balade dans une réserve naturelle avec une guide nature, Mme Muller. Yusuf pose des questions.',
      bild: ['lehrerin:froh:stehen-zeigen', 'yusuf:ueberrascht'], sprecher: { 'Mme Muller': 'w1', Yusuf: 'm3' },
      text: [
        ['Mme Muller', 'Chut ! Parlez doucement… Regardez cet arbre, au bord de la rivière. Vous voyez les traces de dents ?'],
        ['Yusuf', 'Oui ! C’est un castor ?'],
        ['Mme Muller', 'Exactement. Le castor coupe les arbres avec ses dents. Il construit un barrage un peu plus loin.'],
        ['Yusuf', 'On peut le voir ?'],
        ['Mme Muller', 'Malheureusement, pas maintenant. Il sort surtout la nuit. Mais si vous revenez le soir, vous le verrez peut-être.'],
        ['Yusuf', 'Et qu’est-ce qu’on doit faire pour protéger les animaux ici ?'],
        ['Mme Muller', 'C’est simple : on reste sur le chemin, on ne fait pas de bruit et on ne laisse pas de déchets. Et les chiens restent en laisse.'],
        ['Yusuf', 'Je reviendrai un soir, c’est sûr !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Dans une réserve naturelle, on … Coche.', stufe: 1, fragen: [{ f: '', o: ['reste sur le chemin', 'fait du bruit', 'garde les chiens en laisse'], r: [0, 2] }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'Sur l’arbre, il y a …', o: ['des traces de dents', 'un nid'], r: 0 }, { f: 'Le castor sort surtout …', o: ['le matin', 'la nuit'], r: 1 }, { f: 'Pour protéger les animaux, on …', o: ['reste sur le chemin et on ne fait pas de bruit', 'court dans la forêt'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Présente un animal sauvage à la classe (une minute). Utilise la fiche-guide.', stufe: 3, karten: [
        { titel: 'Fiche-guide', text: ['Mon animal, c’est …', 'Il vit …', 'Il mange …', 'Ce qui est intéressant, c’est que …', 'Il est protégé / en danger car …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Présenter un animal', punkte: ['Il **vit** près des rivières, dans les forêts.', 'Il **mange** des poissons, des plantes …', 'Il **ressemble à** un gros chat.', 'Il **est protégé** : il est interdit de le chasser.', 'En hiver, il **part** en Afrique.'] },
         { titel: 'Les adverbes en -ment', punkte: ['discret → discrète → discrète**ment**', 'malheureux → malheureuse → malheureuse**ment**', 'exact → exacte → exacte**ment**', 'Attention : vrai → vrai**ment**'] }],
        [{ art: 'tipp', titel: 'si + présent → futur', text: '**Si** vous **revenez** le soir, vous le **verrez** peut-être.' },
         { art: 'achtung', titel: 'Dans la nature', text: 'Reste sur le chemin, ne fais pas de bruit, ne laisse pas de déchets. Les chiens restent **en laisse**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Forme l’adverbe en -ment.', stufe: 1, saetze: ['(discret) Le chat sauvage vit [discrètement].', '(malheureux) [Malheureusement], le castor dort.', '(lent) Le hérisson marche [lentement].', '(vrai) C’est [vraiment] beau !'] },
      { art: 'luecken', auftrag: 'Complète avec vit, mange, ressemble ou part.', stufe: 1, saetze: ['La cigogne noire [part] en Afrique en hiver.', 'Le chat sauvage [ressemble] à un gros chat.', 'Le castor [vit] près des rivières.', 'La cigogne [mange] des grenouilles.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris le portrait d’un animal sauvage (de ta région ou d’un autre pays).', stufe: 2,
        anfaenge: ['… est un animal …', 'Il vit …', 'Il mange …', 'Il ressemble à …', 'Ce qui est intéressant, c’est que …'], zeilen: 10,
        beispiel: 'Le hérisson est un petit animal avec des piquants. Il vit dans les jardins et les forêts. Il mange des insectes et des vers. En hiver, il dort pendant plusieurs mois. Ce qui est intéressant, c’est qu’il se met en boule quand il a peur.' },
    ],
    check: ['Je comprends un texte informatif sur la nature.', 'Je comprends une guide nature.', 'Je présente un animal sauvage.', 'J’utilise des adverbes en -ment.', 'Je connais les règles dans la nature.'],
  },
  // ================================================================ 6
  {
    thema: 'L’environnement · la certitude', titel: 'Notre école, notre planète', untertitel: 'Trier, économiser, réparer : tu lis le projet d’une classe, tu écoutes des éco-délégués et tu proposes des actions.',
    ziel: { fr: 'Je comprends un projet pour l’environnement et je propose des actions.', de: 'Ich verstehe ein Umweltprojekt und schlage Aktionen vor.' },
    bild: ['amira:froh:erklaeren', 'ben:froh:stehen'],
    start: {
      was: 'Bon pour la planète ?',
      aufgaben: [
        { art: 'rf', auftrag: 'Bon ou mauvais pour la planète ? Coche.', stufe: 1, spalten: ['bon', 'mauvais'], saetze: [['trier ses déchets', true], ['laisser la lumière allumée', false], ['aller à l’école à vélo', true], ['jeter une bouteille dans la nature', false], ['réparer un vélo cassé', true], ['prendre un très long bain chaque jour', false]] },
      ],
    },
    lesen: {
      was: 'Un article', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Journal de l’école (projet imaginaire)', titel: 'La 7P2 passe au vert !',
      absaetze: [
        'Depuis septembre, la classe 7P2 a un grand projet : rendre l’école plus verte. **D’abord**, les élèves **ont compté** les déchets de la cantine pendant une semaine : 40 kilos de nourriture à la poubelle !',
        '**Ensuite**, ils **ont proposé** des solutions à la direction. Maintenant, les élèves peuvent choisir une petite ou une grande portion. Résultat : deux fois moins de déchets !',
        'Les éco-délégués, Amira et Ben, vérifient chaque soir que les lumières et les ordinateurs sont éteints. « Au début, on oubliait souvent, explique Ben. Maintenant, c’est automatique. »',
        'Prochain projet : un atelier de réparation. Une fois par mois, un grand-père bricoleur **viendra** aider les élèves à réparer leurs vélos et leurs objets cassés.',
        '« Si chaque classe fait un petit geste, nous **aurons** une école beaucoup plus verte », dit Amira.',
      ],
      woerter: [['passer au vert', 'grüner werden'], ['compter', 'zählen'], ['les déchets', 'der Abfall'], ['la poubelle', 'der Mülleimer'], ['la portion', 'die Portion'], ['vérifier', 'überprüfen'], ['éteint', 'ausgeschaltet'], ['le geste', 'die kleine Tat']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Problème et solution : complète.', stufe: 1, kopf: ['problème', 'solution'], breiten: [50, 50], zeilen: [['[40 kilos de nourriture à la poubelle en une semaine]', '[choisir une petite ou une grande portion]'], ['[les lumières et les ordinateurs restent allumés]', '[les éco-délégués vérifient chaque soir]'], ['[des vélos et des objets cassés]', '[un atelier de réparation une fois par mois]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['La classe a compté les déchets pendant un mois.', false], ['Maintenant, il y a deux fois moins de déchets.', true], ['Le grand-père viendra une fois par semaine.', false]] },
      ],
    },
    hoeren: {
      was: 'Une interview', wo: 'Radio des jeunes · interview', titel: 'Un petit geste, un grand effet',
      situation: 'À la radio des jeunes, Chloé interviewe les éco-délégués Amira et Ben.',
      bild: ['amira:froh:erklaeren', 'ben:froh'], sprecher: { Chloé: 'w2', Amira: 'w3', Ben: 'm3' },
      text: [
        ['Chloé', 'Amira, Ben, pourquoi est-ce que vous êtes devenus éco-délégués ?'],
        ['Amira', 'Parce que je suis inquiète pour la planète. Je crois que nous pouvons changer les choses, même à l’école.'],
        ['Ben', 'Moi, au début, je n’étais pas sûr. Mais j’ai vu les quarante kilos de déchets… Ça m’a choqué !'],
        ['Chloé', 'Qu’est-ce qui est le plus difficile ?'],
        ['Ben', 'Convaincre les autres. Certains disent : « Ça ne sert à rien. » Alors, on explique avec des chiffres.'],
        ['Amira', 'Et on essaie d’être positifs. On ne crie pas, on propose.'],
        ['Chloé', 'Et vos prochaines idées ?'],
        ['Amira', 'Un potager derrière la cantine ! Si la direction est d’accord, nous planterons des tomates et des salades au printemps.'],
        ['Ben', 'Et peut-être une journée sans voiture. Mais ça, je ne sais pas si c’est possible…'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un éco-délégué, c’est un élève qui … Coche.', stufe: 1, fragen: [{ f: '', o: ['s’occupe de l’environnement à l’école', 'vend des produits bio'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'Amira est devenue éco-déléguée parce qu’…', o: ['elle est inquiète pour la planète', 'elle aime la radio'], r: 0 }, { f: 'Ce qui a choqué Ben, ce sont …', o: ['les quarante kilos de déchets', 'les lumières allumées'], r: 0 }, { f: 'Le plus difficile, c’est …', o: ['convaincre les autres', 'trier les déchets'], r: 0 }, { f: 'Leur prochaine idée :', o: ['un potager', 'une piscine'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'En groupe, proposez trois actions pour votre école. Présentez-les à la classe.', stufe: 3, karten: [
        { titel: 'Proposer', text: ['Je propose de …', 'On peut …', 'Si on …, on …'] },
        { titel: 'Discuter', text: ['Bonne idée !', 'Je ne suis pas sûr(e) que ça marche.', '« Ça ne sert à rien. » – Si, parce que …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les gestes pour la planète', punkte: ['**trier** les déchets · **recycler** le papier', '**éteindre** la lumière · **économiser** l’eau', '**réparer** au lieu de jeter', 'aller à l’école **à pied** ou **à vélo**'] },
         { titel: 'Dire si on est sûr', punkte: ['**Je suis sûr(e) que** c’est possible. (100 %)', '**Je crois que** · **Je pense que** … (70 %)', '**Peut-être** · **Sans doute** … (50 %)', '**Je ne suis pas sûr(e)** · **J’en doute.** (20 %)'] }],
        [{ art: 'tipp', titel: 'Résumer un projet', text: '**D’abord**, ils ont … · **Ensuite**, ils ont … · **Maintenant**, … · **Bientôt**, ils + futur …' },
         { art: 'achtung', titel: 'Les chiffres convainquent', text: '« 40 kilos par semaine » est plus fort que « beaucoup ». Utilise des **chiffres** pour expliquer.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec trier, éteindre, réparer ou économiser.', stufe: 1, saetze: ['Il faut [éteindre] la lumière en sortant.', 'On peut [réparer] son vélo au lieu d’en acheter un nouveau.', 'Prends une douche courte pour [économiser] l’eau.', 'À la cantine, il faut [trier] les déchets.'] },
      { art: 'rf', auftrag: 'Sûr ou pas sûr ? Coche.', stufe: 2, spalten: ['sûr', 'pas sûr'], saetze: [['Je suis sûr que c’est possible.', true], ['Peut-être qu’on aura un potager.', false], ['Je ne suis pas sûre que ça marche.', false], ['C’est certain !', true]] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un article pour le journal de l’école : propose un projet vert pour ta classe.', stufe: 2,
        anfaenge: ['Notre projet : …', 'Le problème, c’est que …', 'Nous proposons de …', 'Si tout le monde …, nous …', 'Je crois que …'], zeilen: 10,
        beispiel: 'Notre projet : une boîte d’échange dans le couloir. Le problème, c’est que beaucoup d’élèves jettent des livres et des vêtements. Nous proposons de les déposer dans une boîte : les autres peuvent les prendre. Si tout le monde participe, nous aurons moins de déchets. Je crois que c’est une bonne idée !' },
    ],
    check: ['Je comprends un article sur un projet.', 'Je comprends une interview.', 'Je nomme des gestes pour la planète.', 'Je dis si je suis sûr(e) ou pas.', 'Je propose un projet par écrit.'],
  },
  // ================================================================ 7
  {
    thema: 'L’avenir · le futur simple', titel: 'Le monde de demain', untertitel: 'Voitures autonomes, robots, villes vertes : tu lis des prédictions, tu écoutes un débat et tu imagines ta ville en 2050.',
    ziel: { fr: 'Je parle de l’avenir avec le futur simple.', de: 'Ich spreche im Futur über die Zukunft.' },
    bild: ['lio:froh:laptop', 'chloe:verwirrt:stehen'],
    start: {
      was: 'Présent ou futur ?',
      aufgaben: [
        { art: 'rf', auftrag: 'Présent ou futur ? Coche.', stufe: 1, spalten: ['présent', 'futur'], saetze: [['Je travaille.', true], ['Je travaillerai.', false], ['Nous aurons des robots.', false], ['Nous avons des ordinateurs.', true], ['Il fera chaud.', false], ['Il fait chaud.', true]] },
      ],
    },
    lesen: {
      was: 'Trois prédictions', art: 'profile', stimme: 'w1',
      quelle: 'Magazine des jeunes · « Et en 2050 ? » (personnes imaginaires)', titel: 'Comment vivrons-nous en 2050 ?',
      profile: [
        { name: 'Lio', bild: 'lio:froh:laptop', stimme: 'm1', text: 'Je suis sûr que les voitures **rouleront** toutes seules ! On **ira** à l’école sans chauffeur. Et des robots **feront** le ménage à la maison. Moi, je **serai** ingénieur en robotique.' },
        { name: 'Nele', bild: 'nele:besorgt:stehen', stimme: 'w2', text: 'Je crois qu’il **fera** beaucoup plus chaud en été. Il y **aura** peut-être moins d’eau. C’est pourquoi nous **devrons** changer nos habitudes dès maintenant.' },
        { name: 'Jana', bild: 'jana:froh:erklaeren', stimme: 'w3', text: 'Moi, je suis optimiste. Les villes **seront** plus vertes, avec des jardins sur les toits. On **mangera** moins de viande et on **prendra** le train. Ce **sera** plus calme !' },
      ],
      woerter: [['rouler tout seul', 'von allein fahren (selbstfahrend)'], ['le ménage', 'der Haushalt'], ['l’ingénieur', 'der Ingenieur'], ['c’est pourquoi', 'deshalb'], ['dès maintenant', 'ab jetzt'], ['optimiste', 'optimistisch'], ['le toit', 'das Dach'], ['l’habitude', 'die Gewohnheit']],
      aufgaben: [
        { art: 'wer', auftrag: 'Qui pense ça ? Coche.', stufe: 1, personen: ['Lio', 'Nele', 'Jana'], saetze: [['Les voitures rouleront toutes seules.', 'Lio'], ['Il y aura moins d’eau.', 'Nele'], ['Les villes seront plus vertes.', 'Jana'], ['Des robots feront le ménage.', 'Lio'], ['On mangera moins de viande.', 'Jana']] },
        { art: 'tabelle', auftrag: 'Trouve l’infinitif.', stufe: 2, kopf: ['futur', 'infinitif'], breiten: [50, 50], zeilen: [['on ira', '[aller]'], ['ils feront', '[faire]'], ['je serai', '[être]'], ['il y aura', '[avoir (il y a)]'], ['nous devrons', '[devoir]'], ['on prendra', '[prendre]']] },
      ],
    },
    hoeren: {
      was: 'Un débat', wo: 'Radio des jeunes · débat', titel: 'Optimistes ou pessimistes ?',
      situation: 'À la radio, Sami et Chloé discutent : à quoi ressemblera la vie en 2050 ?',
      bild: ['sami:froh:erklaeren', 'chloe:verwirrt'], sprecher: { Sami: 'm3', Chloé: 'w2' },
      text: [
        ['Sami', 'Moi, je suis optimiste. En 2050, on aura des voitures qui roulent toutes seules. Il y aura beaucoup moins d’accidents !'],
        ['Chloé', 'Peut-être… Mais je ne suis pas sûre. Je crois surtout qu’il fera très chaud en été. Il y aura des canicules.'],
        ['Sami', 'Oui, mais les scientifiques trouveront des solutions. Si on construit plus d’éoliennes, on aura assez d’énergie propre.'],
        ['Chloé', 'D’accord. Et le travail ? Les robots feront peut-être notre boulot…'],
        ['Sami', 'Notre « boulot » ? Tu veux dire notre travail ! Je pense qu’il y aura de nouveaux métiers. Moi, je serai réparateur de robots !'],
        ['Chloé', 'Et moi, je serai médecin. Les robots ne remplaceront jamais un médecin gentil !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un ou une pessimiste pense que … Coche.', stufe: 1, fragen: [{ f: '', o: ['l’avenir sera difficile', 'tout ira bien'], r: 0 }] }],
      beim: [
        { art: 'wer', auftrag: 'Écoute. Qui dit ça ?', stufe: 1, personen: ['Sami', 'Chloé'], saetze: [['Il y aura beaucoup moins d’accidents.', 'Sami'], ['Il fera très chaud en été.', 'Chloé'], ['Les scientifiques trouveront des solutions.', 'Sami'], ['Les robots feront peut-être notre boulot.', 'Chloé'], ['Je serai médecin.', 'Chloé']] },
        { art: 'mc', auftrag: 'Le mot « boulot », c’est … Coche.', stufe: 2, fragen: [{ f: '', o: ['un mot familier pour « travail »', 'un mot anglais'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Discutez : comment sera l’école en 2050 ?', stufe: 3, karten: [
        { titel: 'Prédire', text: ['Je crois qu’il y aura …', 'Les élèves auront …', 'On ira …'] },
        { titel: 'Réagir', text: ['Je suis sûr(e) que …', 'Peut-être, mais …', 'Je ne suis pas sûr(e).'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Le futur simple', punkte: ['infinitif + **-ai, -as, -a, -ons, -ez, -ont**', 'je travailler**ai** · tu manger**as** · il finir**a**', 'nous jouer**ons** · vous partir**ez** · ils aimer**ont**', 'verbes en -re : prendre → je **prendr**ai'] },
         { titel: 'Les futurs irréguliers', tabelle: { kopf: ['infinitif', 'futur'], zeilen: [['être', 'je **ser**ai'], ['avoir', 'j’**aur**ai'], ['aller', 'j’**ir**ai'], ['faire', 'je **fer**ai'], ['pouvoir', 'je **pourr**ai'], ['voir', 'je **verr**ai'], ['venir', 'je **viendr**ai'], ['devoir', 'je **devr**ai']] } }],
        [{ art: 'tipp', titel: 'Familier ou standard ?', text: 'le **boulot** = le travail · la **bagnole** = la voiture · un **bouquin** = un livre · **bosser** = travailler. Avec les copains : familier. À l’école : standard !' },
         { art: 'achtung', titel: 'Futur proche ou futur simple ?', text: '**Futur proche** : bientôt, c’est prévu : Je **vais partir** demain. · **Futur simple** : plus tard, une prédiction : En 2050, je **serai** médecin.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Mets au futur simple.', stufe: 1, saetze: ['(être) En 2050, je [serai] ingénieur.', '(avoir) Nous [aurons] des voitures électriques.', '(faire) Il [fera] très chaud.', '(aller) Tu [iras] sur la Lune ?', '(manger) Ils [mangeront] moins de viande.'] },
      { art: 'abschreiben', auftrag: 'Familier → standard.', stufe: 2, kopf: ['familier', 'standard'], saetze: [['J’ai un boulot.', 'J’ai un travail.'], ['Il a une bagnole.', 'Il a une voiture.'], ['Je lis un bouquin.', 'Je lis un livre.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Imagine ta ville ou ton village en 2050.', stufe: 2,
        anfaenge: ['En 2050, ma ville sera …', 'Il y aura …', 'Les gens iront …', 'Je crois que …', 'Moi, je serai …'], zeilen: 10,
        beispiel: 'En 2050, ma ville sera plus verte. Il y aura des arbres dans toutes les rues et des panneaux solaires sur les toits. Les gens iront au travail en tram ou à vélo. Je crois qu’il fera plus chaud en été. Moi, je serai architecte et je construirai des maisons écologiques.' },
    ],
    check: ['Je comprends des prédictions.', 'Je comprends un débat.', 'J’utilise le futur simple.', 'Je fais la différence entre familier et standard.', 'J’imagine l’avenir par écrit.'],
  },
  // ================================================================ 8
  {
    thema: 'Rêves et projets · si + présent → futur', titel: 'Si je veux, je peux !', untertitel: 'Rêves, projets, progrès : tu lis la lettre d’un ancien élève, tu écoutes des jeunes parler de leurs rêves et tu écris ton journal de bord.',
    ziel: { fr: 'Je parle de mes rêves et de mes projets et je fais le point sur mes progrès.', de: 'Ich spreche über Träume und Pläne und schaue auf meine Fortschritte.' },
    bild: ['finn:froh:stehen-zeigen', 'amira:stolz:stehen'],
    start: {
      was: 'Rêves et projets',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['le rêve', 'le projet', 'le progrès', 'l’objectif', 'réussir', 'abandonner'], rechts: ['der Traum', 'das Vorhaben', 'der Fortschritt', 'das Ziel', 'schaffen', 'aufgeben'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Une lettre', art: 'text', stimme: 'm1', nummern: true,
      quelle: 'Lettre d’un ancien élève (personne imaginaire)', titel: 'Je crois en vous !',
      absaetze: [
        'Chère classe de 7P2, je m’appelle Kevin. Il y a quatre ans, j’**étais** à votre place, dans la même classe. Je n’**aimais** pas l’école et j’**avais** de mauvaises notes en français.',
        'Un jour, mon professeur m’**a dit** : « **Si** tu **trouves** un projet qui te plaît, tu **travailleras** mieux. » Il avait raison. J’**ai fait** un stage dans un garage et j’**ai adoré** !',
        'Aujourd’hui, je **suis** apprenti mécanicien. Pendant la semaine, je répare des voitures et je vais aussi à l’école. J’ai encore des difficultés, mais je **progresse** chaque semaine.',
        'Mon conseil : notez vos progrès dans un petit journal de bord. Quand vous **serez** découragés, vous le **relirez** et vous **verrez** tout le chemin parcouru.',
        'Si vous avez un rêve, ne l’abandonnez pas. Je crois en vous ! Kevin',
      ],
      woerter: [['l’ancien élève', 'der ehemalige Schüler'], ['la note', 'die Note'], ['avoir raison', 'recht haben'], ['le stage', 'das Praktikum'], ['l’apprenti', 'der Auszubildende'], ['progresser', 'Fortschritte machen'], ['découragé', 'entmutigt'], ['le chemin parcouru', 'der zurückgelegte Weg']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète le parcours de Kevin.', stufe: 1, kopf: ['quand ?', 'Kevin …'], breiten: [26, 74], zeilen: [['il y a quatre ans', '[il était en 7P2 ; il n’aimait pas l’école]'], ['un jour', '[son professeur lui a donné un conseil ; il a fait un stage dans un garage]'], ['aujourd’hui', '[il est apprenti mécanicien]']] },
        { art: 'mc', auftrag: 'Coche.', stufe: 2, fragen: [{ f: 'Le conseil de Kevin :', o: ['noter ses progrès dans un journal de bord', 'arrêter l’école'], r: 0 }, { f: 'Quand on est découragé, on …', o: ['relit son journal de bord', 'abandonne'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Des rêves', wo: 'Salle de classe · fin d’année', titel: 'Et toi, ton rêve ?',
      situation: 'C’est la fin de l’année. Mme Nouvelle demande aux élèves : quels sont vos rêves pour l’avenir ?',
      bild: ['lehrerin:froh:erklaeren', 'tom:stolz'], sprecher: { 'Mme Nouvelle': 'w1', Amira: 'w3', Tom: 'm3', Inès: 'w2' },
      text: [
        ['Mme Nouvelle', 'Alors, quels sont vos rêves ? Amira ?'],
        ['Amira', 'Plus tard, je travaillerai avec les animaux. Si j’ai de bonnes notes en sciences, je ferai une formation d’assistante vétérinaire.'],
        ['Tom', 'Moi, je ne sais pas encore. Peut-être cuisinier… Si je trouve un stage dans un restaurant l’année prochaine, je verrai si ça me plaît.'],
        ['Inès', 'Mon rêve, c’est de voyager. Je visiterai le Canada, car au Québec, on parle français ! Et je ferai des vidéos de mes voyages.'],
        ['Mme Nouvelle', 'Ce sont de beaux projets. Et vos progrès en français, cette année ?'],
        ['Tom', 'Au début, je ne comprenais presque rien. Maintenant, je comprends les vidéos simples. Je suis assez fier !'],
        ['Mme Nouvelle', 'Tu peux être fier, Tom. Et l’année prochaine, vous progresserez encore !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un rêve pour l’avenir, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['un projet qu’on aimerait faire plus tard', 'un mauvais souvenir'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'rêve, projet', 'condition (si …)'], breiten: [16, 46, 38], zeilen: [['Amira', '[travailler avec les animaux ; assistante vétérinaire]', '[si elle a de bonnes notes en sciences]'], ['Tom', '[peut-être cuisinier]', '[s’il trouve un stage dans un restaurant]'], ['Inès', '[voyager au Canada ; faire des vidéos]', '—']] },
        { art: 'mc', auftrag: 'Les progrès de Tom : coche.', stufe: 2, fragen: [{ f: '', o: ['Il comprend les vidéos simples.', 'Il ne comprend rien.'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Parle de tes rêves et de tes progrès (vrais ou imaginaires) avec ton ou ta partenaire.', stufe: 3, karten: [
        { titel: 'Mes rêves', text: ['Plus tard, je … (futur)', 'Mon rêve, c’est de …', 'Si …, je …'] },
        { titel: 'Mes progrès', text: ['Au début, je …', 'Maintenant, je …', 'L’année prochaine, je …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'si + présent → futur', punkte: ['**Si** tu **trouves** un projet, tu **travailleras** mieux.', '**Si** j’**ai** de bonnes notes, je **ferai** une formation.', 'Jamais de futur après **si** : si je ~~travaillerai~~', 'Aussi : Je **viendrai si** j’**ai** le temps.'] },
         { titel: 'Parler de ses progrès', punkte: ['**Au début**, je ne comprenais rien. (imparfait)', '**Maintenant**, je comprends … (présent)', '**J’ai appris** à … (passé composé)', '**L’année prochaine**, je **progresserai**. (futur)'] }],
        [{ art: 'tipp', titel: 'Le journal de bord', text: 'Chaque semaine : **Ce que j’ai appris** · **Ce qui est encore difficile** · **Mon prochain objectif**.' },
         { art: 'achtung', titel: 'quand + futur', text: '**Quand** vous **serez** découragés, vous **relirez** votre journal. (futur après **quand** pour l’avenir)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète : si + présent → futur.', stufe: 1, saetze: ['(travailler) Si tu [travailles], tu réussiras.', '(venir) Si j’ai le temps, je [viendrai].', '(trouver) Si nous [trouvons] un stage, nous apprendrons beaucoup.', '(aller) S’il fait beau, on [ira] au parc.'] },
      { art: 'luecken', auftrag: 'Imparfait, présent ou futur ?', stufe: 2, saetze: ['(comprendre) Au début, je ne [comprenais] rien.', '(comprendre) Maintenant, je [comprends] les vidéos simples.', '(parler) L’année prochaine, je [parlerai] mieux.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mon journal de bord : fais le point sur ce module.', stufe: 1, zeilen: 9, zeilenAnfaenge: ['Ce que j’ai appris :', '', '', 'Ce qui est encore difficile :', '', '', 'Mon prochain objectif :', '', ''] },
      { art: 'schreiben', auftrag: 'Écris une lettre à la classe de l’année prochaine : tes conseils et tes rêves.', stufe: 2,
        anfaenge: ['Chère classe, …', 'Cette année, j’ai appris …', 'Mon conseil : …', 'Si vous …, vous …', 'Plus tard, je …'], zeilen: 10,
        beispiel: 'Chère classe, cette année, j’ai appris à parler de moi et à raconter une histoire en français. Mon conseil : écoutez les textes plusieurs fois avec le code QR. Si vous posez des questions, vous comprendrez mieux. Plus tard, je serai électricien. Bonne chance !' },
    ],
    check: ['Je comprends une lettre personnelle.', 'Je comprends des jeunes qui parlent de leurs rêves.', 'J’utilise si + présent → futur.', 'Je parle de mes progrès.', 'J’écris mon journal de bord.'],
  },
]
