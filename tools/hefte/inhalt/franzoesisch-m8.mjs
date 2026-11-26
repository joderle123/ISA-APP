// Français · Module 8 « Famille et santé » (Régime / Voie de préparation, A2.2 – B1.1) – cahier multimodal.
// D’après le « Programme FRANC 7P–5P » (CNES, 20/03/2019), Module 8 « La vie de famille –
// La santé » : vie en famille, sentiments (colère, désaccord), mouvements et positions du corps, vêtements, caractère
// et humeur, théâtre, alimentation, sport, santé, poids et mesures ; roman-photo, scène de théâtre, recette, programme
// de spectacles ; périphrases verbales, gérondif, sans + infinitif, adverbes en -ment, à / de / en (vêtements),
// partitifs et articles contractés, cause / conséquence / but / opposition, il faut que (quelques formes du subjonctif),
// pronom en, marqueurs temporels (chaque fois que, quand, si + indicatif, avant de, après, pour + infinitif).
// Personnes, familles, produits, prix et spectacles : imaginaires. On ne demande rien sur la famille de l’élève.

const Z = '#1f2430'

// Pyramide alimentaire (6 étages, de haut en bas) : numéros dans le dessin, mots à écrire à droite
const pyramide = () => {
  const woerter = ['les sucreries et les graisses', 'la viande, le poisson, les œufs', 'les produits laitiers', 'le pain, les pâtes, le riz', 'les fruits et les légumes', 'l’eau']
  const misch = [3, 0, 5, 2, 4, 1]
  const farben = ['#f2a7a7', '#f3c08f', '#cfe3f7', '#f5dd8a', '#b9e0a5', '#a9d8ef']
  const hw = (y) => ((y - 2) * 58) / 96
  let s = ''
  for (let i = 0; i < 6; i++) {
    const y0 = 2 + i * 16, y1 = y0 + 16
    s += `<polygon points="${60 - hw(y0)},${y0} ${60 + hw(y0)},${y0} ${60 + hw(y1)},${y1} ${60 - hw(y1)},${y1}" fill="${farben[i]}" stroke="${Z}" stroke-width="0.8" stroke-linejoin="round"/>`
    s += `<text x="60" y="${y0 + (i === 0 ? 13.5 : 11)}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="8" fill="${Z}">${i + 1}</text>`
  }
  const svg = `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">${s}</svg>`
  return `<div class="wortspeicher">${misch.map((i) => `<span>${woerter[i]}</span>`).join('')}</div><div style="display:grid;grid-template-columns:78mm 1fr;gap:7mm;align-items:center"><div>${svg}</div><div style="display:grid;gap:2mm">${woerter.map((w, i) => `<div style="display:flex;align-items:flex-end;gap:3mm"><span style="font-family:Lexend;font-weight:800;color:var(--f);width:5mm">${i + 1}</span><div class="uhr-linie" style="flex:1"><span class="l">${w}</span></div></div>`).join('')}</div></div>`
}

export const MODUL = {
  id: 'franzoesisch-m8', kuerzel: 'fr8', nr: 8, sprache: 'fr', niveau: 'A2.2 – B1.1', klasse: 'Voie de préparation',
  dateiname: 'Francais_Module-8',
  fach: { de: 'Französisch', fr: 'Français' },
  titel: { de: 'Familie und Gesundheit', fr: 'Famille et santé' },
  untertitel: { fr: 'Lire un roman-photo, jouer une scène de théâtre, demander un service, manger équilibré, suivre une recette, s’échauffer, acheter malin et choisir un spectacle – en huit unités.', de: 'Einen Fotoroman lesen, eine Theaterszene spielen, um einen Gefallen bitten, ausgewogen essen, einem Rezept folgen, sich aufwärmen, klug einkaufen und eine Vorstellung auswählen – in acht Einheiten.' },
  farben: { tief: '#b8392f', mittel: '#f1aaa2', zart: '#fdefed', dunkel: '#74211a' },
  deckbild: ['oma:froh:tasse', 'chloe:froh:tanzen', 'sami:froh:laessig'],
  blasen: [{ t: 'À table !', x: 16, y: 110 }, { t: 'Tu peux m’aider ?', x: 112, y: 98 }, { t: 'En forme !', x: 160, y: 150 }],
  themen: [
    { titel: { fr: 'La vie en famille', de: 'Familienleben' }, icon: 'home-heart', lektionen: 3 },
    { titel: { fr: 'Manger et bouger', de: 'Essen und Bewegung' }, icon: 'salad', lektionen: 3 },
    { titel: { fr: 'Choisir et donner son avis', de: 'Auswählen und seine Meinung sagen' }, icon: 'thumb-up', lektionen: 2 },
  ],
  anleitung: [
    'Chaque leçon a cinq parties : **Lire**, **Écouter**, **La règle**, **S’entraîner** et **Écrire**. À la fin, il y a un **mini-bilan**.',
    'À côté de chaque texte, il y a un **code QR**. Scanne-le avec ton portable : tu entends le texte. Écoute plusieurs fois pour vérifier le sens.',
    'Les points montrent le niveau : ●○○ base · ●●○ moyen · ●●● plus. Commence par la base.',
    'Dans ce cahier, on parle de familles **imaginaires**. Chaque famille est différente. Tu parles de toi seulement si tu veux. Besoin d’aide ? **116 111** (gratuit, anonyme).',
  ],
  // seulement pour la voix (Regex Python)
  aussprache: {
    '\\bMme\\b': 'Madame', '\\bM\\. ': 'Monsieur ', '(\\d{1,2}) h (\\d\\d)': '\\1 heures \\2', '(\\d{1,2}) h\\b': '\\1 heures',
    '(\\d+),(\\d\\d) ?€': '\\1 euros \\2', '(\\d+) ?€': '\\1 euros', '(\\d+) ?g\\b': '\\1 grammes', '(\\d+) ?kg\\b': '\\1 kilos', '(\\d+) ?%': '\\1 pour cent',
    '\\b116 111\\b': 'un un six, un un un',
  },
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'La vie en famille · les périphrases verbales · le gérondif', titel: 'Samedi, ménage !', untertitel: 'Un roman-photo, une émission de radio, un débat : tu comprends une dispute en famille et tu dis ce que les personnes sont en train de faire.',
    ziel: { fr: 'Je comprends ce qui se passe dans un roman-photo et je dis ce qu’une personne est en train de faire.', de: 'Ich verstehe, was in einem Fotoroman passiert, und sage, was jemand gerade tut.' },
    bild: ['vater:wuetend:verschraenkt', 'lina:muede:handy'],
    start: {
      was: 'Les tâches ménagères',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['passer l’aspirateur', 'faire la vaisselle', 'ranger sa chambre', 'sortir la poubelle', 'faire les courses', 'mettre la table'], rechts: ['staubsaugen', 'abwaschen', 'sein Zimmer aufräumen', 'den Müll rausbringen', 'einkaufen', 'den Tisch decken'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un roman-photo', art: 'bd', stimme: 'w1', erzaehler: 'erz', stimmen: { Papa: 'm2', Lina: 'w3', Lio: 'm3' },
      quelle: 'Roman-photo · magazine des jeunes (histoire imaginaire)', titel: 'Samedi, ménage !',
      cases: [
        { erz: 'Samedi, 10 heures. Papa **est en train de** passer l’aspirateur.', bild: 'vater:froh:stehen-zeigen', blasen: [['Papa', 'Lina ! Lio ! Venez m’aider, s’il vous plaît !']] },
        { erz: 'Dans sa chambre, Lina **vient de** se réveiller.', bild: 'lina:muede:handy', blasen: [['Lina', 'Pas maintenant, Papa… Je viens de me réveiller !']] },
        { erz: 'Lio, lui, **est sur le point de** partir.', bild: ['lio:aufgeregt:gehen', 'vater:ueberrascht:stehen'], blasen: [['Lio', 'Désolé, j’ai foot dans dix minutes !'], ['Papa', 'Encore ? Et ta chambre ?']] },
        { erz: 'Papa **se met en colère**.', bild: ['vater:wuetend:verschraenkt', 'lina:wuetend:stehen-verschraenkt'], blasen: [['Papa', 'Ça suffit ! Chaque samedi, je fais tout, tout seul !'], ['Lina', 'Ce n’est pas juste ! Moi, je travaille toute la semaine pour l’école !']] },
        { erz: 'Lina réfléchit… Puis elle **se met à** ranger, **en écoutant** de la musique.', bild: 'lina:froh:tanzen', blasen: [['Lina', 'Bon… Pardon, Papa. On fait un planning pour toute la famille ?']] },
        { erz: 'Le soir, tout le monde est content.', bild: ['vater:froh:tasse', 'lina:froh:laessig', 'lio:froh:stehen'], blasen: [['Papa', 'Merci ! **En travaillant** ensemble, on va plus vite.'], ['Lio', 'Et demain, c’est moi qui fais la vaisselle !']] },
      ],
      woerter: [['le ménage', 'der Hausputz'], ['passer l’aspirateur', 'staubsaugen'], ['se réveiller', 'aufwachen'], ['se mettre en colère', 'wütend werden'], ['Ça suffit !', 'Jetzt reicht’s!'], ['juste', 'gerecht'], ['réfléchir', 'nachdenken'], ['le planning', 'der Plan']],
      aufgaben: [
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['Papa est en train de faire la vaisselle.', false], ['Lina vient de se réveiller.', true], ['Lio part au foot.', true], ['À la fin, Lina propose un planning.', true], ['Le soir, Papa est encore en colère.', false]] },
        { art: 'tabelle', auftrag: 'Comment sont les personnages ? Coche.', stufe: 2, kopf: ['', 'Papa', 'Lina', 'Lio'], breiten: [46, 18, 18, 18], zeilen: [['fait tout le ménage seul(e)', '[x]', '', ''], ['fatigué(e) le matin', '', '[x]', ''], ['pressé(e)', '', '', '[x]'], ['en colère', '[x]', '[x]', ''], ['prêt(e) à s’excuser', '', '[x]', ''], ['content(e) à la fin', '[x]', '[x]', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Une émission de radio', wo: 'Radio « Allô Ados » · le soir', titel: 'Aider à la maison ?',
      situation: 'Dans l’émission « Allô Ados », trois jeunes donnent leur opinion : est-ce que les jeunes doivent aider à la maison ?',
      bild: ['jana:froh:handy', 'ben:muede:stehen'], sprecher: { Animateur: 'm1', Jana: 'w2', Ben: 'm3', Nele: 'w3' },
      text: [
        ['Animateur', 'Bonsoir et bienvenue dans « Allô Ados » ! Ce soir, notre question : est-ce que les jeunes doivent aider à la maison ? Premier appel : Jana, quatorze ans.'],
        ['Jana', 'Bonsoir ! Moi, je trouve que oui. Chez nous, tout le monde aide. Je mets la table et je fais la vaisselle en écoutant de la musique. Comme ça, c’est moins ennuyeux !'],
        ['Animateur', 'Merci, Jana ! Ben, tu es d’accord avec elle ?'],
        ['Ben', 'Pas vraiment. J’ai beaucoup de devoirs et je fais du foot trois fois par semaine. Le soir, je suis fatigué. Je range ma chambre, mais c’est tout.'],
        ['Animateur', 'Et toi, Nele ?'],
        ['Nele', 'Avant, on se disputait souvent à cause du ménage. Maintenant, on a un planning sur le frigo. Et le samedi, on se met à ranger tous ensemble pendant une heure. Après, on mange une pizza !'],
        ['Animateur', 'Bonne idée ! Alors, chers auditeurs : un planning, c’est la solution ? Envoyez-nous vos messages !'],
      ],
      vor: [{ art: 'mc', auftrag: 'À la radio, une émission où les gens téléphonent, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['une émission avec des appels d’auditeurs', 'un film', 'une publicité'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'D’accord ?', 'Qu’est-ce qu’il / elle fait à la maison ?'], breiten: [16, 24, 60], zeilen: [['Jana', '[oui]', '[Elle met la table et fait la vaisselle.]'], ['Ben', '[pas vraiment]', '[Il range sa chambre.]'], ['Nele', '[oui]', '[planning ; le samedi, une heure de rangement]']] },
        { art: 'wer', auftrag: 'Qui dit ça ? Coche.', stufe: 2, personen: ['Jana', 'Ben', 'Nele'], saetze: [['Je travaille en écoutant de la musique.', 'Jana'], ['Le soir, je suis fatigué.', 'Ben'], ['Avant, on se disputait souvent.', 'Nele'], ['Après, on mange une pizza.', 'Nele']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Petit débat : lisez une phrase. Chaque personne dit si elle est d’accord ou pas, et pourquoi.', stufe: 3, karten: [
        { titel: 'Les phrases', text: ['Les jeunes doivent aider à la maison.', 'Pas de portable pendant le repas !', 'Le ménage, c’est l’affaire de tout le monde.'] },
        { titel: 'Approuver', text: ['Je suis d’accord, parce que …', 'Tu as raison.', 'C’est vrai, …'] },
        { titel: 'Désapprouver', text: ['Je ne suis pas d’accord.', 'Au contraire, …', 'Pas du tout ! …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les périphrases verbales', tabelle: { kopf: ['', 'quand ?', 'exemple'], zeilen: [['**venir de** + infinitif', 'il y a un instant', 'Lina **vient de** se réveiller.'], ['**être en train de** + infinitif', 'maintenant', 'Papa **est en train de** passer l’aspirateur.'], ['**être sur le point de** + infinitif', 'dans un instant', 'Lio **est sur le point de** partir.'], ['**se mettre à** + infinitif', 'commencer', 'Lina **se met à** ranger.']] } }],
        [{ titel: 'Le gérondif', punkte: ['**en** + verbe en **-ant** : deux actions en même temps', 'nous écout~~ons~~ → **en écoutant**', 'nous fais~~ons~~ → **en faisant**', 'Je range **en chantant**.', 'Exceptions : **en étant** · **en ayant** · **en sachant**'] },
         { art: 'tipp', titel: 'Colère et désaccord', text: '**Ça suffit !** · **Ce n’est pas juste !** · **J’en ai marre !** (familier) · **Je ne suis pas d’accord !** · **Calme-toi !**' }],
        [{ art: 'achtung', titel: 'Se calmer, s’excuser', text: '**Pardon, je me suis énervé(e).** · **Je suis désolé(e).** · **On trouve une solution ?** · **D’accord, on fait comme ça.**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète.', stufe: 1, woerter: ['vient de', 'est en train de', 'est sur le point de', 'se met à'], saetze: ['Le film commence dans une minute : il [est sur le point de] commencer.', 'Chut ! Mon frère [est en train de] dormir.', 'Ma sœur a fini ses devoirs il y a deux minutes : elle [vient de] finir.', 'Il pleut. Tout à coup, le chien [se met à] aboyer.'] },
      { art: 'abschreiben', auftrag: 'Fais une phrase avec le gérondif.', stufe: 2, kopf: ['deux actions', 'avec le gérondif'], saetze: [['Je fais la vaisselle. J’écoute de la musique.', 'Je fais la vaisselle en écoutant de la musique.'], ['Lina range sa chambre. Elle chante.', 'Lina range sa chambre en chantant.'], ['Papa prépare le repas. Il téléphone.', 'Papa prépare le repas en téléphonant.']] },
      { art: 'personen', auftrag: 'Quelle image va avec quelle phrase ? Écris la lettre.', stufe: 2, bilder: ['finn:muede:sitzen', 'finn:froh:tanzen', 'finn:aufgeregt:gehen', 'finn:froh:tasse'], saetze: [['Il est sur le point de partir.', 'C'], ['Il vient de se lever. Il est encore fatigué.', 'A'], ['Il est en train de boire un chocolat chaud.', 'D'], ['Il range en dansant.', 'B']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Imagine une famille (inventée). Il y a une petite dispute à cause du ménage. Écris le dialogue, avec une solution à la fin.', stufe: 2,
        anfaenge: ['A : Tu peux … , s’il te plaît ?', 'B : Pas maintenant, je suis en train de …', 'A : Ce n’est pas juste ! …', 'B : Bon, d’accord. …', 'A : Merci ! En …'], zeilen: 10,
        beispiel: 'A : Tu peux sortir la poubelle, s’il te plaît ? – B : Pas maintenant, je suis en train de regarder un film. – A : Ce n’est pas juste ! Je viens de faire la vaisselle. – B : Bon, d’accord. Je la sors après le film, promis. – A : Merci ! En faisant tout ensemble, on va plus vite.' },
    ],
    check: ['Je comprends un roman-photo.', 'Je décris le caractère des personnages.', 'Je comprends des opinions à la radio.', 'J’utilise venir de, être en train de, être sur le point de, se mettre à.', 'J’utilise le gérondif.'],
  },
  // ================================================================ 2
  {
    thema: 'Le théâtre · les mouvements du corps · sans + infinitif · les adverbes en -ment', titel: 'Le portable de la discorde', untertitel: 'Une scène de théâtre, une répétition avec la metteuse en scène : tu comprends une petite pièce et tu la joues avec des gestes.',
    ziel: { fr: 'Je lis une courte scène de théâtre et je la joue avec des gestes.', de: 'Ich lese eine kurze Theaterszene und spiele sie mit Gesten.' },
    bild: ['oma:besorgt:stehen', 'chloe:traurig:handy'],
    start: {
      was: 'Le théâtre',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['la scène', 'le personnage', 'la réplique', 'la didascalie', 'le décor', 'le rideau'], rechts: ['die Bühne', 'die Figur', 'der Satz einer Figur', 'die Regieanweisung', 'das Bühnenbild', 'der Vorhang'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Une scène de théâtre', art: 'theater', stimme: 'w1', erzaehler: 'erz', stimmen: { MAMIE: 'w1', CHLOÉ: 'w3', SAMI: 'm3' },
      quelle: 'Club théâtre de la 7P2 · pièce écrite par la classe (imaginaire)', titel: 'Le portable de la discorde – scène 1',
      personen: '**Personnages :** Mamie · Chloé, 13 ans · Sami, son frère, 11 ans',
      zeilen: [
        ['', 'La cuisine de Mamie, dimanche midi. Chloé est assise. Elle regarde son portable.'],
        ['MAMIE', 'À table, les enfants ! J’ai fait des lasagnes.', 'joyeusement'],
        ['SAMI', 'Super ! J’ai une faim de loup !', 'en s’asseyant'],
        ['MAMIE', 'Chloé, tu poses ton portable, s’il te plaît ?'],
        ['CHLOÉ', 'Oui, oui… Une seconde, je suis en train d’écrire à Léa.', 'sans lever les yeux'],
        ['SAMI', 'Elle est toujours en train d’écrire à quelqu’un…', 'en levant les yeux au ciel'],
        ['CHLOÉ', 'Toi, on ne t’a rien demandé !', 'énervée'],
        ['MAMIE', 'Ça suffit, vous deux ! Chloé, chez moi, on mange sans téléphone. C’est la règle.', 'calmement, mais fermement'],
        ['CHLOÉ', 'Mais Mamie, c’est important ! Tu ne comprends rien !', 'Elle se lève brusquement.'],
        ['', 'Chloé sort sans dire un mot. Silence. Mamie s’assoit lentement.'],
        ['SAMI', 'Elle exagère…', 'à voix basse'],
        ['MAMIE', 'Attends, Sami. Elle avait l’air triste, tu ne trouves pas ?', 'pensive'],
        ['', 'Chloé revient doucement. Elle a les yeux rouges.'],
        ['CHLOÉ', 'Pardon, Mamie. Léa vient de se disputer avec sa meilleure amie. Elle pleurait. Je voulais l’aider.', 'en baissant la tête'],
        ['MAMIE', 'Oh, ma chérie… Tu es une bonne copine. La prochaine fois, dis-le-moi, tout simplement !', 'en lui prenant la main'],
        ['CHLOÉ', 'Tu as raison. J’écris juste à Léa : « Je t’appelle après le repas. » D’accord ?'],
        ['MAMIE', 'D’accord. Et après, tous les portables vont dans la corbeille !', 'en souriant'],
        ['SAMI', 'Même le tien, Mamie ?', 'en riant'],
        ['MAMIE', 'Même le mien ! Allez, bon appétit !'],
        ['', 'Rideau.'],
      ],
      woerter: [['la discorde', 'der Streit'], ['avoir une faim de loup', 'einen Bärenhunger haben'], ['lever les yeux au ciel', 'die Augen verdrehen'], ['énervé(e)', 'genervt'], ['brusquement', 'plötzlich, heftig'], ['à voix basse', 'leise'], ['avoir l’air triste', 'traurig aussehen'], ['la corbeille', 'der Korb']],
      aufgaben: [
        { art: 'wer', auftrag: 'Qui dit ça ? Coche.', stufe: 1, personen: ['Mamie', 'Chloé', 'Sami'], saetze: [['J’ai une faim de loup !', 'Sami'], ['Chez moi, on mange sans téléphone.', 'Mamie'], ['Tu ne comprends rien !', 'Chloé'], ['Elle avait l’air triste.', 'Mamie'], ['Même le tien ?', 'Sami']] },
        { art: 'mc', auftrag: 'Coche la bonne réponse.', stufe: 2, fragen: [
          { f: 'Pourquoi Chloé écrit-elle à Léa ?', o: ['Elle joue à un jeu avec elle.', 'Léa est triste. Chloé veut l’aider.', 'Elle veut aller au cinéma.'], r: 1 },
          { f: 'Quelle est la solution à la fin ?', o: ['Chloé n’a plus de portable.', 'Pendant le repas, les portables vont dans la corbeille.', 'Mamie se met en colère.'], r: 1 }] },
      ],
    },
    hoeren: {
      was: 'Une répétition', wo: 'Club théâtre · la salle des fêtes', titel: 'On répète !',
      situation: 'Le club théâtre répète la scène. Mme Nouvelle est la metteuse en scène. Elle explique les mouvements.',
      bild: ['lehrerin:froh:erklaeren', 'chloe:froh:stehen'], sprecher: { 'Mme Nouvelle': 'w1', Chloé: 'w3', Sami: 'm3' },
      text: [
        ['Mme Nouvelle', 'Bien, on répète la scène du portable. Chloé, tu es prête ?'],
        ['Chloé', 'Oui, mais je ne sais pas où je dois me mettre.'],
        ['Mme Nouvelle', 'Au début, tu es assise à droite, près de la fenêtre. Tu regardes ton portable, sans regarder Mamie.'],
        ['Sami', 'Et moi ?'],
        ['Mme Nouvelle', 'Sami, quand tu dis ta réplique « Elle est toujours en train d’écrire », il faut que tu regardes le public. Et lève les yeux au ciel, en faisant un grand geste avec la main.'],
        ['Sami', 'Comme ça ?'],
        ['Mme Nouvelle', 'Oui, très bien ! On voit que tu es agacé. Chloé, quand tu sors, ne cours pas. Lève-toi brusquement et sors sans dire un mot. Le public doit sentir ta colère.'],
        ['Chloé', 'Et quand je reviens ?'],
        ['Mme Nouvelle', 'Tu reviens lentement, la tête baissée. Parle doucement, mais assez fort pour le public ! Allez, on reprend depuis le début. Silence… Action !'],
      ],
      vor: [{ art: 'mc', auftrag: 'La personne qui dirige les acteurs, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['le metteur en scène / la metteuse en scène', 'le public', 'le décor'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute. Qu’est-ce que Mme Nouvelle demande ? Complète.', stufe: 2, kopf: ['moment', 'mouvements et gestes'], breiten: [34, 66], zeilen: [['Chloé, au début', '[assise à droite, près de la fenêtre ; regarde son portable]'], ['Sami, pendant sa réplique', '[regarde le public ; lève les yeux au ciel ; fait un grand geste]'], ['Chloé sort', '[se lève brusquement ; ne court pas ; sans dire un mot]'], ['Chloé revient', '[lentement, la tête baissée ; parle doucement, mais assez fort]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jouez la scène à trois. Faites des gestes pour accompagner vos répliques. Ensuite, changez les rôles.', stufe: 3, karten: [
        { titel: 'Les gestes', text: ['lever les yeux au ciel', 'croiser les bras', 'hausser les épaules', 'baisser la tête'] },
        { titel: 'La voix', text: ['parler fort / doucement', 'parler lentement', 'à voix basse', 'en souriant / en riant'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Sans + infinitif', punkte: ['Elle sort **sans dire** un mot.', 'Il mange **sans parler**.', 'Tu regardes ton portable **sans regarder** Mamie.', '(Elle sort. Elle ne dit rien. → Elle sort **sans dire** un mot.)'] },
         { titel: 'Les adverbes en -ment', punkte: ['calme → **calmement** · brusque → **brusquement**', 'lent → lente → **lentement**', 'doux → douce → **doucement**', 'joyeux → joyeuse → **joyeusement**', 'Attention : vrai → **vraiment** · gentil → **gentiment**'] }],
        [{ art: 'tipp', titel: 'Le vocabulaire du théâtre', text: 'la **scène** · l’**acteur** / l’**actrice** · le **personnage** · la **réplique** · la **didascalie** (en italique, entre parenthèses) · le **décor** · le **rideau** · la **répétition** · le **public**' },
         { art: 'achtung', titel: 'Les mouvements du corps', text: '**se lever** · **s’asseoir** · **se retourner** · **lever / baisser la tête** · **croiser les bras** · **hausser les épaules** · **lever les yeux au ciel**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Forme l’adverbe.', stufe: 1, saetze: ['Mamie parle (calme) [calmement].', 'Chloé revient (lent) [lentement].', 'Elle ferme la porte (doux) [doucement].', 'Sami se lève (brusque) [brusquement].', 'Mamie sourit (gentil) [gentiment].'] },
      { art: 'abschreiben', auftrag: 'Fais une phrase avec sans + infinitif.', stufe: 2, kopf: ['deux phrases', 'une phrase'], saetze: [['Il entre dans la classe. Il ne dit pas un mot.', 'Il entre dans la classe sans dire un mot.'], ['Elle part. Elle ne ferme pas la porte.', 'Elle part sans fermer la porte.'], ['Sami mange. Il ne regarde pas son portable.', 'Sami mange sans regarder son portable.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris la scène 2 : après le repas, Chloé appelle Léa. Écris 6 à 8 répliques avec des didascalies.', stufe: 3,
        anfaenge: ['CHLOÉ (en souriant) : …', 'LÉA (à voix basse) : …', 'CHLOÉ : …', 'LÉA (…) : …', 'MAMIE (…) : …'], zeilen: 11,
        beispiel: 'CHLOÉ (en souriant) : Allô, Léa ? Ça va mieux ? – LÉA (à voix basse) : Un peu… Zoé ne me parle plus. – CHLOÉ : Tu veux venir chez Mamie ? On peut parler tranquillement. – LÉA (surprise) : Vraiment ? – MAMIE (en entrant) : Bien sûr ! Il reste des lasagnes !' },
    ],
    check: ['Je lis une courte scène de théâtre.', 'Je comprends les didascalies.', 'Je comprends les conseils d’une metteuse en scène.', 'J’utilise sans + infinitif et les adverbes en -ment.', 'Je joue une scène avec des gestes.'],
  },
  // ================================================================ 3
  {
    thema: 'Demander un service · il faut que · tu ou vous ?', titel: 'Tu peux m’aider ?', untertitel: 'Une fête surprise pour les 80 ans de Mamie ! Tu lis un chat de famille, tu écoutes un appel à la voisine et tu demandes poliment un service.',
    ziel: { fr: 'Je demande un service et je réagis quand quelqu’un me demande un service.', de: 'Ich bitte um einen Gefallen und reagiere, wenn mich jemand um einen Gefallen bittet.' },
    bild: ['chloe:froh:handy', 'sami:froh:stehen'],
    start: {
      was: 'Demander poliment',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['Tu pourrais m’aider ?', 'Ça te dérange de fermer la fenêtre ?', 'Excusez-moi de vous déranger.', 'Avec plaisir !', 'Désolé(e), je ne peux pas.', 'Pas de problème !'], rechts: ['Könntest du mir helfen?', 'Stört es dich, das Fenster zu schließen?', 'Entschuldigen Sie die Störung.', 'Gern!', 'Tut mir leid, ich kann nicht.', 'Kein Problem!'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un chat de famille', art: 'chat', ich: 'Chloé', stimme: 'w1', stimmen: { Papa: 'm2', Chloé: 'w3', Sami: 'm3', 'Tante Lou': 'w2' },
      quelle: 'Groupe « Surprise pour Mamie » (famille imaginaire)', titel: 'Surprise pour Mamie !',
      nachrichten: [
        ['Papa', 'Bonjour à tous ! Samedi, Mamie a 80 ans. On lui fait une fête surprise à la maison ? Il faut que tout **soit** prêt à 15 heures !'],
        ['Chloé', 'Trop bien ! Je peux faire des crêpes avec sa recette.'],
        ['Papa', 'Merci, Chloé ! Sami, est-ce que tu **pourrais** décorer le salon ?'],
        ['Sami', 'D’accord, mais il faut que quelqu’un m’**aide** à gonfler les ballons…'],
        ['Tante Lou', 'Je **veux bien** t’aider ! Et à 14 h 30, je vais chercher Mamie en voiture, sans lui dire pourquoi.'],
        ['Papa', 'Parfait. Mais il y a un problème : nous avons douze invités et seulement huit chaises… Il faut que quelqu’un **aille** demander des chaises à Mme Dubois, la voisine.'],
        ['Chloé', 'Je m’en occupe. Je l’appelle ce soir !'],
        ['Papa', 'Merci ! Et Sami, il faut que tu **fasses** tes devoirs vendredi, pas samedi matin !'],
        ['Sami', 'Oui, oui… Promis !'],
        ['Tante Lou', 'Vous êtes une super équipe ! Mamie va être tellement contente.'],
      ],
      woerter: [['la fête surprise', 'die Überraschungsparty'], ['prêt(e)', 'fertig, bereit'], ['décorer', 'schmücken'], ['gonfler les ballons', 'Luftballons aufblasen'], ['l’invité(e)', 'der Gast'], ['la voisine', 'die Nachbarin'], ['s’occuper de', 'sich kümmern um'], ['promis !', 'versprochen!']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Qui fait quoi ? Complète.', stufe: 1, kopf: ['', 'les tâches'], breiten: [24, 76], zeilen: [['Chloé', '[Elle fait des crêpes. Elle appelle la voisine.]'], ['Sami', '[Il décore le salon et gonfle les ballons.]'], ['Tante Lou', '[Elle aide Sami. Elle va chercher Mamie en voiture.]']] },
        { art: 'fragen', auftrag: 'Réponds.', stufe: 2, fragen: [{ f: 'Pourquoi faut-il des chaises ?', l: 'Il y a douze invités et seulement huit chaises.' }, { f: 'Qu’est-ce que Sami doit faire vendredi ?', l: 'Il doit faire ses devoirs.' }] },
      ],
    },
    hoeren: {
      was: 'Un appel à la voisine', wo: 'Au téléphone · le soir', titel: 'Excusez-moi de vous déranger…',
      situation: 'Chloé appelle Mme Dubois, la voisine. Elle lui demande un service. Et Mme Dubois aussi a une question…',
      bild: ['chloe:froh:handy', 'oma:froh:tasse'], sprecher: { 'Mme Dubois': 'w2', Chloé: 'w3' },
      text: [
        ['Mme Dubois', 'Allô ?'],
        ['Chloé', 'Bonsoir, Madame Dubois, c’est Chloé, votre voisine. Excusez-moi de vous déranger.'],
        ['Mme Dubois', 'Bonsoir, Chloé ! Tu ne me déranges pas du tout. Qu’est-ce qui se passe ?'],
        ['Chloé', 'Samedi, nous faisons une fête surprise pour les 80 ans de ma grand-mère. Est-ce que vous pourriez nous prêter quatre chaises ?'],
        ['Mme Dubois', 'Bien sûr, avec plaisir ! Mais il faut que quelqu’un vienne les chercher. Moi, je ne peux pas les porter, j’ai mal au dos.'],
        ['Chloé', 'Pas de problème. Mon frère et moi, nous venons vendredi soir, vers 18 heures. Ça vous va ?'],
        ['Mme Dubois', 'Parfait. Et toi, Chloé, est-ce que je peux te demander un petit service ?'],
        ['Chloé', 'Oui, bien sûr !'],
        ['Mme Dubois', 'La semaine prochaine, je pars chez ma sœur. Est-ce que tu pourrais arroser mes plantes ?'],
        ['Chloé', 'Je veux bien ! Il faut que je les arrose tous les jours ?'],
        ['Mme Dubois', 'Non, deux fois, ça suffit : lundi et jeudi. Merci, tu es un ange !'],
        ['Chloé', 'Merci à vous ! Bonne soirée, Madame Dubois !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Tu parles à une voisine adulte. Tu dis … Coche.', stufe: 1, fragen: [{ f: '', o: ['vous', 'tu'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'le service', 'quand ?'], breiten: [26, 44, 30], zeilen: [['Chloé demande …', '[de prêter quatre chaises]', '[vendredi, vers 18 h]'], ['Mme Dubois demande …', '[d’arroser ses plantes]', '[la semaine prochaine, lundi et jeudi]']] },
        { art: 'fragen', auftrag: 'Pourquoi Mme Dubois ne peut-elle pas porter les chaises ?', stufe: 2, fragen: [{ f: '', l: 'Elle a mal au dos.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jeu de rôle : demandez-vous des services. Une fois avec tu, une fois avec vous. Acceptez ou refusez poliment.', stufe: 3, karten: [
        { titel: 'Demander', text: ['Est-ce que tu pourrais … ?', 'Vous pourriez … ?', 'Ça te dérange de … ?', 'Excusez-moi de vous déranger.'] },
        { titel: 'Accepter', text: ['Oui, bien sûr !', 'Avec plaisir !', 'Je veux bien.', 'Pas de problème.'] },
        { titel: 'Refuser', text: ['Désolé(e), je ne peux pas, parce que …', 'Je regrette, mais …', 'Peut-être demain ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'L’obligation : il faut que …', tabelle: { kopf: ['', 'je', 'tu', 'il / elle / on'], zeilen: [['ranger (-er)', 'que je **range**', 'que tu **ranges**', 'qu’il **range**'], ['faire', 'que je **fasse**', 'que tu **fasses**', 'qu’il **fasse**'], ['aller', 'que j’**aille**', 'que tu **ailles**', 'qu’il **aille**'], ['être', 'que je **sois**', 'que tu **sois**', 'qu’il **soit**'], ['avoir', 'que j’**aie**', 'que tu **aies**', 'qu’il **ait**']] } }],
        [{ titel: 'Demander un service', punkte: ['Est-ce que **tu pourrais** m’aider ?', '**Vous pourriez** me prêter … ?', '**Ça te dérange de** … ?', 'Réponses : **Avec plaisir !** · **Je veux bien.**', '**Désolé(e), je ne peux pas, parce que …**'] },
         { art: 'achtung', titel: 'tu ou vous ?', text: 'Amis, famille, enfants : **tu**. Adultes qu’on ne connaît pas bien, profs, voisins : **vous**. → Excusez-**moi** de **vous** déranger.' }],
        [{ art: 'tipp', titel: 'Plus facile', text: 'Sans personne précise : **il faut + infinitif**. → **Il faut ranger** le salon. **Il faut acheter** du pain.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec il faut que.', stufe: 2, woerter: ['fasses', 'ailles', 'sois', 'aies', 'ranges'], saetze: ['Il faut que tu [ranges] ta chambre avant la fête.', 'Il faut que tu [fasses] tes devoirs vendredi.', 'Il faut que tu [ailles] chercher les chaises.', 'Il faut que tu [sois] là à 15 heures.', 'Il faut que tu [aies] ton portable avec toi.'] },
      { art: 'abschreiben', auftrag: 'Demande plus poliment.', stufe: 1, kopf: ['pas très poli', 'poli'], saetze: [['Aide-moi !', 'Est-ce que tu pourrais m’aider ?'], ['Prêtez-moi un stylo !', 'Vous pourriez me prêter un stylo, s’il vous plaît ?'], ['Ferme la fenêtre !', 'Ça te dérange de fermer la fenêtre ?']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Tu organises une fête (un anniversaire, la fin de l’année…). Écris un message à ton groupe : qui fait quoi ?', stufe: 2,
        anfaenge: ['Salut tout le monde !', 'Samedi, … Il faut que …', '…, est-ce que tu pourrais … ?', 'Moi, je …', 'Merci et à samedi !'], zeilen: 10,
        beispiel: 'Salut tout le monde ! Samedi, c’est l’anniversaire de Noah. Il faut que tout soit prêt à 16 heures. Mia, est-ce que tu pourrais faire un gâteau ? Ben, il faut que tu ailles chercher les boissons. Moi, je décore la salle. Merci et à samedi !' },
    ],
    check: ['Je comprends un chat d’organisation.', 'Je comprends un appel téléphonique poli.', 'Je demande un service avec tu et avec vous.', 'J’accepte ou je refuse poliment.', 'J’utilise il faut que + quelques formes du subjonctif.'],
  },
  // ================================================================ 4
  {
    thema: 'L’alimentation · les partitifs · le pronom en', titel: 'La pyramide qui fait du bien', untertitel: 'Un article sur la pyramide alimentaire, une scène à la cantine : tu comprends des conseils de santé et tu composes un menu équilibré.',
    ziel: { fr: 'Je comprends des conseils pour manger équilibré et j’utilise le pronom en.', de: 'Ich verstehe Tipps für ausgewogenes Essen und benutze das Pronomen « en ».' },
    bild: ['aerztin:froh:erklaeren', 'amira:froh:stehen'],
    start: {
      was: 'Les aliments',
      aufgaben: [
        { art: 'symbole', auftrag: 'Qu’est-ce que c’est ? Écris le mot.', stufe: 1, woerter: ['une pomme', 'une carotte', 'le pain', 'le lait', 'le fromage', 'le poisson', 'un œuf', 'un bonbon'],
          symbole: [['apple', 'une pomme'], ['carrot', 'une carotte'], ['baguette', 'le pain'], ['milk', 'le lait'], ['cheese', 'le fromage'], ['fish', 'le poisson'], ['egg', 'un œuf'], ['candy', 'un bonbon']] },
      ],
    },
    lesen: {
      was: 'Un article santé', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Journal de l’école · Semaine de la santé (personne imaginaire)', titel: 'Manger équilibré ? C’est facile !',
      absaetze: [
        'Cette semaine, c’est la Semaine de la santé à l’école. Mme Moreau, diététicienne, explique la **pyramide alimentaire** aux élèves de la 7P2.',
        '**Tout en bas** de la pyramide, il y a **l’eau**. C’est la boisson la plus importante. Il faut **en** boire environ un litre et demi par jour, et encore plus quand on fait du sport.',
        '**Juste au-dessus**, on trouve **les fruits et les légumes**. Ils donnent des vitamines. Il faut **en** manger au moins cinq portions par jour : une pomme à la récré, des carottes à midi… **Au milieu**, il y a **le pain, les pâtes, le riz** et les pommes de terre. Ils donnent de l’énergie, alors on **en** mange à chaque repas.',
        '**Plus haut**, il y a **les produits laitiers** : le lait, le yaourt, le fromage. Ils sont bons pour les os. **Encore plus haut**, on trouve **la viande, le poisson, les œufs** – ou le tofu et les lentilles. On **en** mange une portion par jour.',
        'Et **tout en haut** ? **Les sucreries et les graisses** : les bonbons, les chips, le soda… « Ce n’est pas interdit ! dit Mme Moreau. Un petit plaisir, c’est bon pour le moral. Mais on **en** mange un peu, pas tous les jours. »',
        'Son dernier conseil : « Mangez lentement, avec des copains, et sans écran. Manger, c’est aussi un moment de plaisir ! »',
      ],
      woerter: [['équilibré(e)', 'ausgewogen'], ['la diététicienne', 'die Ernährungsberaterin'], ['la boisson', 'das Getränk'], ['la portion', 'die Portion'], ['donner de l’énergie', 'Energie geben'], ['les produits laitiers', 'die Milchprodukte'], ['les os', 'die Knochen'], ['les sucreries', 'die Süßigkeiten'], ['les graisses', 'die Fette'], ['le moral', 'die Laune']],
      aufgaben: [
        { art: 'frei', auftrag: 'Reconstitue la pyramide. Écris les mots au bon étage.', stufe: 1, html: pyramide() },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['L’eau est la boisson la plus importante.', true], ['On mange cinq portions de viande par jour.', false], ['Le pain et les pâtes donnent de l’énergie.', true], ['Les bonbons sont interdits.', false], ['Mme Moreau conseille de manger sans écran.', true]] },
      ],
    },
    hoeren: {
      was: 'À la cantine', wo: 'Le self de l’école · midi', titel: 'Il n’y en a plus !',
      situation: 'À la cantine, Finn et Amira choisissent leur repas. Le cuisinier leur explique le menu.',
      bild: ['finn:froh:stehen', 'amira:froh:stehen-zeigen'], sprecher: { Cuisinier: 'm2', Finn: 'm3', Amira: 'w2' },
      text: [
        ['Cuisinier', 'Bonjour ! Aujourd’hui, il y a du poisson ou du poulet, avec du riz ou des frites.'],
        ['Finn', 'Je voudrais du poulet avec des frites, s’il vous plaît.'],
        ['Cuisinier', 'Et des légumes ? Il y a des haricots verts.'],
        ['Finn', 'Non merci, je n’en veux pas. Je n’aime pas les haricots.'],
        ['Amira', 'Moi, j’en prends ! Et du poisson avec du riz, s’il vous plaît.'],
        ['Cuisinier', 'Voilà. Les desserts sont au bout.'],
        ['Finn', 'Il y a encore de la mousse au chocolat ?'],
        ['Cuisinier', 'Non, désolé, il n’y en a plus. Il reste des pommes et des yaourts.'],
        ['Finn', 'Bon… Je prends un yaourt.'],
        ['Amira', 'Et moi, une pomme. Tu sais, Finn, la diététicienne a dit qu’il faut manger au moins cinq fruits et légumes par jour !'],
        ['Finn', 'Je sais, je sais… J’en mange ce soir, promis !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Au self, on … Coche.', stufe: 1, fragen: [{ f: '', o: ['prend un plateau et choisit son repas', 'commande au téléphone'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute. Qu’est-ce qu’ils prennent ?', stufe: 1, kopf: ['', 'plat', 'avec', 'légumes', 'dessert'], breiten: [16, 22, 20, 20, 22], zeilen: [['Finn', '[du poulet]', '[des frites]', '[non]', '[un yaourt]'], ['Amira', '[du poisson]', '[du riz]', '[des haricots]', '[une pomme]']] },
        { art: 'mc', auftrag: 'Il n’y a plus de … Coche.', stufe: 1, fragen: [{ f: '', o: ['mousse au chocolat', 'yaourts', 'pommes'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jeu de rôle au self : une personne est cuisinier ou cuisinière, l’autre choisit son repas. Utilisez du, de la, des et en.', stufe: 2, karten: [
        { titel: 'Cuisinier / cuisinière', text: ['Aujourd’hui, il y a …', 'Vous en voulez ?', 'Désolé(e), il n’y en a plus.', 'Il reste …'] },
        { titel: 'Élève', text: ['Je voudrais du / de la / des …', 'Oui, j’en prends.', 'Non merci, je n’en veux pas.', 'Il y a encore … ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les articles partitifs', punkte: ['**du** pain · **de la** viande · **de l’**eau · **des** fruits', 'Négation : je ne mange **pas de** viande.', 'Quantité : **beaucoup de** · **un peu de** · **une portion de**', 'Rappel : **du** = de + le · **des** = de + les', '**au** = à + le · **aux** = à + les → la mousse **au** chocolat'] },
         { titel: 'Le pronom en', punkte: ['**en** remplace **du / de la / des + nom**.', 'Tu bois **de l’eau** ? – Oui, j’**en** bois.', 'Tu manges **des fruits** ? – J’**en** mange **cinq**.', 'Négation : Je **n’en** veux **pas**.', 'Il **n’y en a plus**. (= es gibt keine mehr)'] }],
        [{ art: 'tipp', titel: 'Où dans la pyramide ?', text: '**tout en bas** · **juste au-dessus** · **au milieu** · **plus haut** · **encore plus haut** · **tout en haut**' },
         { art: 'achtung', titel: 'Bien manger', text: 'Il n’y a pas d’aliment « interdit ». Ce qui compte : **varier**, **boire de l’eau**, **manger lentement** et **bouger**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec du, de la, de l’, des ou de.', stufe: 1, saetze: ['Au petit-déjeuner, je mange [du] pain et je bois [du] lait.', 'À midi, il y a [de la] viande et [des] légumes.', 'Je bois [de l’]eau après le sport.', 'Je ne mange pas [de] poisson.'] },
      { art: 'abschreiben', auftrag: 'Réponds avec en.', stufe: 2, kopf: ['question', 'réponse'], saetze: [['Tu manges des légumes ? (oui, tous les jours)', 'Oui, j’en mange tous les jours.'], ['Tu bois du soda ? (non)', 'Non, je n’en bois pas.'], ['Il y a encore des pommes ? (oui, trois)', 'Oui, il y en a trois.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Compose un menu équilibré pour une journée pour Noah, 13 ans. Il joue au foot. Utilise la pyramide.', stufe: 2,
        anfaenge: ['Au petit-déjeuner, Noah mange …', 'À midi, …', 'Au goûter, …', 'Le soir, …', 'Il boit …, parce que …'], zeilen: 10,
        beispiel: 'Au petit-déjeuner, Noah mange du pain avec du fromage et une pomme. À midi, il prend du poisson, du riz et des légumes. Au goûter, il mange un yaourt et une banane. Le soir, il mange des pâtes avec de la sauce tomate. Il boit beaucoup d’eau, parce qu’il fait du sport.' },
    ],
    check: ['Je comprends un article sur la santé.', 'Je reconstitue la pyramide alimentaire.', 'Je comprends une scène à la cantine.', 'J’utilise du, de la, des, pas de.', 'J’utilise le pronom en.'],
  },
  // ================================================================ 5
  {
    thema: 'Une recette · les poids et les mesures · avant de, après, pour', titel: 'Les crêpes de Mamie', untertitel: 'Une recette de grand-mère, une liste de courses, un achat à l’épicerie : tu comprends une recette et tu fais tes courses.',
    ziel: { fr: 'Je comprends une recette, j’écris une liste de courses et je fais des achats.', de: 'Ich verstehe ein Rezept, schreibe eine Einkaufsliste und kaufe ein.' },
    bild: ['oma:froh:erklaeren', 'chloe:froh:stehen'],
    start: {
      was: 'Les quantités',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['un kilo de', 'un litre de', 'un paquet de', 'une bouteille d’', 'un pot de', 'une pincée de'], rechts: ['pommes de terre', 'lait', 'pâtes', 'eau', 'confiture', 'sel'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Une recette de grand-mère', art: 'anleitung', stimme: 'w1',
      quelle: 'Carnet de recettes de Mamie (personne imaginaire)', titel: 'Les crêpes de Mamie (pour 4 personnes)',
      material: ['250 g de farine', '4 œufs', 'un demi-litre de lait', '2 cuillères à soupe de sucre', 'une pincée de sel', '50 g de beurre fondu'],
      schritte: [
        { icon: 'droplet', text: '**Avant de** commencer, lave-toi les mains. Prépare un grand saladier et un fouet.' },
        { icon: 'wheat', text: 'Mets la farine, le sucre et le sel dans le saladier. Fais un trou au milieu **pour** ajouter les œufs.' },
        { icon: 'egg', text: 'Casse les œufs dans le trou. Mélange doucement avec le fouet.' },
        { icon: 'milk', text: 'Verse le lait petit à petit **pour** éviter les grumeaux. Ajoute le beurre fondu.' },
        { icon: 'clock-hour-3', text: '**Après** le mélange, laisse reposer la pâte une heure **avant de** faire cuire les crêpes.' },
        { icon: 'flame', text: 'Fais chauffer une poêle avec un peu de beurre. Verse une petite louche de pâte. **Après** une minute, retourne la crêpe. Attention : un adulte doit être là !' },
      ],
      danach: ['**Le secret de Mamie :** « **Chaque fois que** je fais des crêpes, j’ajoute un peu de vanille. Et **si** la pâte est trop épaisse, j’ajoute un peu de lait. »', 'Avec de la confiture, du sucre ou du chocolat : c’est délicieux ! Pour 4 personnes, on fait environ 15 crêpes.'],
      woerter: [['la farine', 'das Mehl'], ['le beurre fondu', 'die geschmolzene Butter'], ['le saladier', 'die Schüssel'], ['le fouet', 'der Schneebesen'], ['verser', 'gießen'], ['les grumeaux', 'die Klümpchen'], ['laisser reposer', 'ruhen lassen'], ['la poêle', 'die Pfanne'], ['la louche', 'die Schöpfkelle'], ['retourner', 'wenden'], ['épais(se)', 'dick(flüssig)']],
      aufgaben: [
        { art: 'mc', auftrag: 'Coche la bonne réponse.', stufe: 1, fragen: [
          { f: 'Pourquoi verse-t-on le lait petit à petit ?', o: ['pour éviter les grumeaux', 'pour aller plus vite', 'pour faire de grandes crêpes'], r: 0 },
          { f: 'Combien de temps la pâte repose-t-elle ?', o: ['une minute', 'une heure', 'une nuit'], r: 1 }] },
        { art: 'tabelle', auftrag: 'Chloé veut faire les crêpes. Regarde ce qu’il y a à la maison. Qu’est-ce qu’elle doit acheter ?', stufe: 2, kopf: ['ingrédient', 'dans la recette', 'à la maison', 'à acheter'], breiten: [22, 26, 22, 30], zeilen: [['farine', '250 g', '1 kg', '[rien]'], ['œufs', '4', '2', '[des œufs (au moins 2)]'], ['lait', 'un demi-litre', 'un litre', '[rien]'], ['sucre', '2 cuillères', 'pas de sucre', '[un paquet de sucre]'], ['beurre', '50 g', 'pas de beurre', '[du beurre]']] },
      ],
    },
    hoeren: {
      was: 'À l’épicerie', wo: 'L’épicerie du quartier · samedi matin', titel: 'Vous en voulez combien ?',
      situation: 'Chloé va à l’épicerie avec sa liste de courses.',
      bild: ['verkaeuferin:froh:stehen', 'chloe:froh:stehen'], sprecher: { Épicière: 'w2', Chloé: 'w3' },
      text: [
        ['Épicière', 'Bonjour ! Qu’est-ce que je vous sers ?'],
        ['Chloé', 'Bonjour ! Je voudrais des œufs, s’il vous plaît.'],
        ['Épicière', 'Vous en voulez combien ? Une boîte de six ou de douze ?'],
        ['Chloé', 'Une boîte de six, ça suffit. Et un paquet de sucre.'],
        ['Épicière', 'Voilà. Et avec ça ?'],
        ['Chloé', 'Il me faut aussi du beurre. Une plaquette de 250 grammes.'],
        ['Épicière', 'Désolée, je n’en ai plus en 250 grammes. J’en ai en 500 grammes.'],
        ['Chloé', 'Bon, je prends 500 grammes. Ah, et vous avez de la confiture de fraises ?'],
        ['Épicière', 'Oui, voilà un pot. C’est tout ?'],
        ['Chloé', 'Oui, c’est tout. Ça fait combien ?'],
        ['Épicière', 'Alors… les œufs, le sucre, le beurre et la confiture… Ça fait 9,80 €.'],
        ['Chloé', 'Voilà 10 euros.'],
        ['Épicière', 'Et voilà 20 centimes. Bonne journée !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Dans une épicerie, on achète … Coche.', stufe: 1, fragen: [{ f: '', o: ['de la nourriture', 'des vêtements', 'des médicaments'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute. Qu’est-ce que Chloé achète ? Complète.', stufe: 1, kopf: ['produit', 'quantité'], breiten: [40, 60], zeilen: [['des œufs', '[une boîte de six]'], ['du sucre', '[un paquet]'], ['du beurre', '[500 grammes]'], ['de la confiture', '[un pot (de fraises)]']] },
        { art: 'fragen', auftrag: 'Réponds.', stufe: 2, fragen: [{ f: 'Combien coûtent les courses ?', l: '9,80 €' }, { f: 'Pourquoi Chloé ne prend-elle pas 250 grammes de beurre ?', l: 'Il n’y en a plus en 250 grammes.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jeu de rôle à l’épicerie : écrivez une liste de courses, puis achetez. Changez les rôles.', stufe: 2, karten: [
        { titel: 'Client(e)', text: ['Je voudrais …', 'Il me faut …', 'Vous avez … ?', 'Ça fait combien ?'] },
        { titel: 'Vendeur / vendeuse', text: ['Qu’est-ce que je vous sers ?', 'Vous en voulez combien ?', 'Et avec ça ?', 'Ça fait … euros.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les poids et les mesures', punkte: ['**un kilo** (kg) = 1000 **grammes** (g) · **un demi-kilo** = 500 g', '**un litre** (l) · **un demi-litre**', '**une cuillère à soupe** · **une cuillère à café** · **une pincée**', '**un paquet** · **une bouteille** · **un pot** · **une boîte** · **une plaquette** · **une tranche**'] },
         { titel: 'Les marqueurs de temps', punkte: ['**avant** + nom : **avant** le repas', '**avant de** + infinitif : **avant de** cuire', '**après** + nom : **après** le mélange', '**pour** + infinitif : **pour** éviter les grumeaux · **pour** + nom : **pour** 4 personnes', '**chaque fois que** … · **si** + présent : **si** la pâte est épaisse, j’ajoute du lait.'] }],
        [{ art: 'tipp', titel: 'Une recette', text: 'D’abord les **ingrédients** (avec les quantités), ensuite les **étapes**. Les verbes sont souvent à l’**impératif** : **mets**, **verse**, **mélange**, **ajoute**.' },
         { art: 'achtung', titel: 'Quantité + de', text: 'Après une quantité, on met **de** : un kilo **de** farine · beaucoup **de** lait · un pot **de** confiture. (pas : un kilo ~~de la~~ farine)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec la bonne quantité.', stufe: 1, woerter: ['une bouteille', 'un paquet', 'une pincée', 'un pot', 'une tranche'], saetze: ['[Une bouteille] d’eau, s’il vous plaît.', 'Je voudrais [un paquet] de pâtes.', 'Ajoute [une pincée] de sel.', 'Il me faut [un pot] de miel.', 'Je mange [une tranche] de pain.'] },
      { art: 'luecken', auftrag: 'Complète avec avant, avant de, après ou pour.', stufe: 2, woerter: ['avant', 'avant de', 'après', 'pour'], saetze: ['[Avant de] cuisiner, je me lave les mains.', '[Après] le repas, on fait la vaisselle.', 'Je mets un tablier [pour] protéger mes vêtements.', 'Les enfants mangent un fruit [avant] le sport.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris la recette d’un plat que tu aimes ou d’un plat inventé (une salade, une boisson, un dessert…).', stufe: 2,
        anfaenge: ['Pour … personnes, il te faut : …', 'Avant de commencer, …', 'D’abord, …', 'Ensuite, … pour …', 'Après …', 'Bon appétit !'], zeilen: 11,
        beispiel: 'Pour 2 personnes, il te faut : 2 bananes, un demi-litre de lait, 2 cuillères de miel. Avant de commencer, lave-toi les mains. D’abord, coupe les bananes en morceaux. Ensuite, mets tout dans le mixeur pour faire un milk-shake. Après une minute, verse dans deux verres. Bon appétit !' },
    ],
    check: ['Je comprends une recette.', 'J’écris une liste de courses à partir d’une recette.', 'Je fais des achats à l’épicerie.', 'J’utilise les poids et les mesures.', 'J’utilise avant de, après, pour.'],
  },
  // ================================================================ 6
  {
    thema: 'Le sport · les mouvements · vérifier si l’autre a compris', titel: 'Échauffement !', untertitel: 'Une affiche d’échauffement, un cours de sport : tu comprends des instructions pour bouger et tu vérifies si ton partenaire a compris.',
    ziel: { fr: 'Je comprends et je donne des instructions pour bouger. Je vérifie si l’autre a compris.', de: 'Ich verstehe und gebe Bewegungsanweisungen. Ich prüfe, ob der andere verstanden hat.' },
    bild: ['lehrerin:froh:erklaeren', 'noah:froh:stehen'],
    start: {
      was: 'Le corps qui bouge',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['plier les genoux', 'tendre les bras', 'lever la jambe', 'tourner la tête', 's’allonger sur le dos', 'sauter'], rechts: ['die Knie beugen', 'die Arme strecken', 'das Bein heben', 'den Kopf drehen', 'sich auf den Rücken legen', 'springen'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Une affiche au gymnase', art: 'anleitung', stimme: 'w1',
      quelle: 'Affiche du gymnase de l’école', titel: 'Échauffement : 5 minutes pour être en forme',
      material: ['des baskets', 'une bouteille d’eau', 'de la bonne humeur'],
      schritte: [
        { icon: 'walk', text: 'Marche **tranquillement** sur place pendant 30 secondes. Respire **profondément**.' },
        { icon: 'run', text: 'Cours **lentement** autour du terrain. Petit à petit, cours un peu plus vite.' },
        { icon: 'rotate-clockwise', text: 'Fais des cercles avec les bras, **en respirant calmement** : dix fois en avant, dix fois en arrière.' },
        { icon: 'arrow-big-up', text: 'Cours sur place **en levant** les genoux, puis **en touchant** tes fesses avec tes talons.' },
        { icon: 'stretching', text: 'Plie **doucement** les jambes, le dos bien droit, **sans** lever les talons. Tends les bras devant toi. Dix fois.' },
        { icon: 'droplet', text: 'Bravo, tu **viens de** finir ton échauffement ! Bois un peu d’eau. Maintenant, tu peux **te mettre à** jouer.' },
      ],
      danach: ['**Pourquoi s’échauffer ?** Le cœur se met à battre plus vite et les muscles se réchauffent. Comme ça, on risque moins de se blesser.', '**Attention :** si tu as mal, arrête-toi et parle à ton prof.'],
      woerter: [['l’échauffement', 'das Aufwärmen'], ['sur place', 'auf der Stelle'], ['respirer', 'atmen'], ['profondément', 'tief'], ['le genou', 'das Knie'], ['le talon', 'die Ferse'], ['plier', 'beugen'], ['tendre', 'strecken'], ['battre', 'schlagen'], ['se blesser', 'sich verletzen']],
      aufgaben: [
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['On commence par courir très vite.', false], ['On fait des cercles avec les bras.', true], ['Quand on plie les jambes, le dos reste droit.', true], ['L’échauffement dure une heure.', false], ['Si on a mal, on continue.', false]] },
        { art: 'fragen', auftrag: 'Réponds.', stufe: 2, fragen: [{ f: 'Pourquoi est-ce qu’on s’échauffe ?', l: 'Les muscles se réchauffent, comme ça on risque moins de se blesser.' }, { f: 'Qu’est-ce qu’on fait à la fin de l’échauffement ?', l: 'On boit un peu d’eau.' }] },
      ],
    },
    hoeren: {
      was: 'Un cours de sport', wo: 'Le gymnase · cours de sport', titel: 'C’est clair ?',
      situation: 'La classe vient de faire l’échauffement. Mme Sabli, la prof de sport, explique un nouvel exercice : la planche.',
      bild: ['lehrerin:froh:erklaeren', 'noah:verwirrt:stehen'], sprecher: { 'Mme Sabli': 'w1', Noah: 'm3', Léa: 'w2' },
      text: [
        ['Mme Sabli', 'Bon, vous venez de faire l’échauffement. Maintenant, on passe à un nouvel exercice : la planche. Écoutez bien.'],
        ['Mme Sabli', 'Allongez-vous sur le ventre. Posez les avant-bras par terre, sous les épaules. Levez le corps en poussant sur les pieds. Le dos reste bien droit, comme une planche ! Restez comme ça pendant vingt secondes, en respirant normalement. C’est clair ?'],
        ['Noah', 'Euh… pas vraiment. On pose les mains ou les bras ?'],
        ['Mme Sabli', 'Les avant-bras, Noah. De la main jusqu’au coude. Tu vois ce que je veux dire ?'],
        ['Noah', 'Ah oui, d’accord !'],
        ['Mme Sabli', 'Léa, tu peux répéter ce que je viens de dire ?'],
        ['Léa', 'On s’allonge sur le ventre, on pose les avant-bras par terre, on lève le corps et on reste droit pendant vingt secondes.'],
        ['Mme Sabli', 'Parfait ! Et on respire tranquillement. Vous avez des questions ? Non ? Alors… Prêts ? Partez !'],
        ['Mme Sabli', 'Dix secondes… Très bien, Noah, tu es en train de réussir ! Encore cinq secondes… Et stop ! Bravo à tous !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Tu ne comprends pas une consigne. Tu dis … Coche.', stufe: 1, fragen: [{ f: '', o: ['Vous pouvez répéter, s’il vous plaît ?', 'Je m’en fiche.'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Écoute. Mets les étapes de la planche dans l’ordre.', stufe: 1, teile: ['S’allonger sur le ventre.', 'Poser les avant-bras par terre.', 'Lever le corps en poussant sur les pieds.', 'Rester droit pendant vingt secondes.'], ordnung: [2, 0, 3, 1] },
        { art: 'mc', auftrag: 'Avec quelles phrases Mme Sabli vérifie-t-elle que les élèves ont compris ? Coche.', stufe: 2, fragen: [{ f: '', o: ['C’est clair ?', 'Tu vois ce que je veux dire ?', 'Tu peux répéter ce que je viens de dire ?', 'Tu as faim ?'], r: [0, 1, 2] }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Explique un exercice à ton / ta partenaire (pompes, saut, étirement…). Vérifie qu’il / elle a compris. Ensuite, il / elle le fait.', stufe: 3, karten: [
        { titel: 'Expliquer', text: ['D’abord, …', 'Ensuite, … en …', 'Le dos reste droit.', 'Pendant … secondes.'] },
        { titel: 'Vérifier', text: ['C’est clair ?', 'Tu vois ce que je veux dire ?', 'Tu peux répéter ?', 'Montre-moi !'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Vérifier si l’autre a compris', punkte: ['**C’est clair ?** · **Tu as compris ?**', '**Tu vois ce que je veux dire ?**', '**Tu peux répéter ce que je viens de dire ?**', '**Montre-moi !**', 'Réponses : **Oui, c’est clair.** · **Pas vraiment. Tu peux répéter ?**'] },
         { titel: 'Décrire un mouvement', punkte: ['impératif : **plie** · **tends** · **lève** · **pose** · **allonge-toi**', 'adverbe : **lentement** · **doucement** · **calmement** · **profondément**', 'gérondif : **en respirant** · **en levant** les genoux', 'sans + infinitif : **sans lever** les talons'] }],
        [{ art: 'tipp', titel: 'Révision : les périphrases', text: 'Tu **viens de** finir. · Tu **es en train de** réussir. · On **se met à** jouer. · Le match **est sur le point de** commencer.' },
         { art: 'achtung', titel: 'Bouger, c’est bon pour la santé', text: 'On conseille aux jeunes de **bouger au moins une heure par jour** : marcher, faire du vélo, danser, jouer… Tout compte !' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec l’adverbe.', stufe: 1, woerter: ['lentement', 'profondément', 'doucement', 'rapidement'], saetze: ['Respire [profondément] par le nez.', 'Au début, cours [lentement].', 'Plie [doucement] les genoux.', 'À la fin, cours [rapidement] jusqu’au mur.'] },
      { art: 'luecken', auftrag: 'Complète avec venir de, être en train de ou se mettre à.', stufe: 2, saetze: ['Le match finit à 16 h. Il est 16 h 01 : le match [vient de] finir.', 'Chut ! Les joueurs [sont en train de] parler avec le coach.', 'Tout à coup, le public [se met à] chanter.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris une fiche pour un exercice de sport ou de détente. Utilise l’impératif, des adverbes et le gérondif.', stufe: 2,
        anfaenge: ['Nom de l’exercice : …', 'D’abord, …', 'Ensuite, … en …', 'Attention : … sans …', 'Répète … fois.'], zeilen: 10,
        beispiel: 'Nom de l’exercice : le pont. D’abord, allonge-toi sur le dos et plie les genoux. Ensuite, lève lentement les fesses en poussant sur les pieds. Attention : garde la tête par terre, sans tourner le cou. Reste cinq secondes, puis descends doucement. Répète dix fois.' },
    ],
    check: ['Je comprends des instructions pour un échauffement.', 'Je comprends une prof de sport.', 'Je vérifie si l’autre a compris.', 'Je décris un mouvement avec des adverbes et le gérondif.', 'J’écris une fiche d’exercice.'],
  },
  // ================================================================ 7
  {
    thema: 'Les vêtements · à, de, en · cause, conséquence, but, opposition', titel: 'Acheter malin', untertitel: 'Trois vestes, deux avis de clients, un magasin de chaussures : tu compares des produits et tu choisis selon tes besoins, la qualité et le prix.',
    ziel: { fr: 'Je compare des produits et je justifie un achat.', de: 'Ich vergleiche Produkte und begründe einen Kauf.' },
    bild: ['sami:verwirrt:stehen', 'verkaeuferin:froh:erklaeren'],
    start: {
      was: 'Décrire un vêtement',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['en cuir', 'en laine', 'en coton', 'à capuche', 'à lacets', 'de ski'], rechts: ['aus Leder', 'aus Wolle', 'aus Baumwolle', 'mit Kapuze', 'mit Schnürsenkeln', 'zum Skifahren'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Des produits et des avis', art: 'dokumente',
      quelle: 'Site d’un magasin de sport (produits, prix et avis imaginaires)', titel: 'Quelle veste pour la classe de neige ?',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Modèle A** · Veste de pluie', text: ['Veste **en** nylon, **à** capuche. Légère et imperméable, mais pas très chaude.', 'Prix : **35 €**'] },
        { stil: 'karte', stimme: 'w1', kopf: '**Modèle B** · Doudoune', text: ['Veste **en** polyester, **à** fermeture éclair. Très chaude, mais pas imperméable.', 'Prix : **59 €**'] },
        { stil: 'karte', stimme: 'w1', kopf: '**Modèle C** · Veste **de** ski', text: ['Veste **en** tissu technique, **à** capuche et **à** poches. Chaude et imperméable. Garantie deux ans.', 'Prix : ~~89 €~~ **65 €** (en soldes cette semaine)'] },
        { stil: 'nachricht', stimme: 'w3', kopf: 'Avis de Lou · 4 étoiles sur 5', text: ['J’ai acheté le modèle C **parce qu’**il est chaud et imperméable. **Grâce à** la capuche, je n’ai jamais froid aux oreilles. **Par contre**, il est un peu lourd.'] },
        { stil: 'nachricht', stimme: 'm1', kopf: 'Avis de Max · 2 étoiles sur 5', text: ['J’ai pris le modèle A **car** il n’était pas cher. **Pourtant**, je le regrette : à la montagne, j’avais froid, **donc** j’ai dû mettre deux pulls !'] },
      ],
      woerter: [['imperméable', 'wasserdicht'], ['léger / légère', 'leicht'], ['la doudoune', 'die Daunenjacke'], ['la fermeture éclair', 'der Reißverschluss'], ['la poche', 'die Tasche'], ['la garantie', 'die Garantie'], ['en soldes', 'reduziert, im Schlussverkauf'], ['l’avis', 'die Bewertung'], ['lourd(e)', 'schwer'], ['regretter', 'bereuen']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Compare les vestes.', stufe: 1, kopf: ['', 'en quoi ?', 'chaude ?', 'imperméable ?', 'prix'], breiten: [16, 30, 16, 20, 18], zeilen: [['A', '[en nylon]', '[non]', '[oui]', '[35 €]'], ['B', '[en polyester]', '[oui]', '[non]', '[59 €]'], ['C', '[en tissu technique]', '[oui]', '[oui]', '[65 €]']] },
        { art: 'mc', auftrag: 'Sami a 70 € (cadeau d’anniversaire). Il veut une veste chaude et imperméable pour la classe de neige. Quel modèle ?', stufe: 2, fragen: [{ f: '', o: ['Modèle A', 'Modèle B', 'Modèle C'], r: 2 }] },
      ],
    },
    hoeren: {
      was: 'Au magasin de chaussures', wo: 'Un magasin de sport · mercredi après-midi', titel: 'Vous les avez en 42 ?',
      situation: 'Sami cherche des chaussures pour la classe de neige. Une vendeuse l’aide.',
      bild: ['verkaeuferin:froh:erklaeren', 'sami:froh:stehen'], sprecher: { Vendeuse: 'w1', Sami: 'm3' },
      text: [
        ['Vendeuse', 'Bonjour ! Je peux vous aider ?'],
        ['Sami', 'Oui, je cherche des chaussures de montagne pour la classe de neige.'],
        ['Vendeuse', 'Alors, regardez ces chaussures en cuir, à lacets. Elles sont très solides.'],
        ['Sami', 'Elles coûtent combien ?'],
        ['Vendeuse', '85 €.'],
        ['Sami', 'Ah, c’est trop cher pour moi. Vous en avez des moins chères ?'],
        ['Vendeuse', 'Oui, ce modèle en tissu, à 45 €. Il est moins solide. Par contre, il est imperméable et très léger.'],
        ['Sami', 'Je peux les essayer ?'],
        ['Vendeuse', 'Bien sûr. Vous faites quelle pointure ?'],
        ['Sami', 'Du 41.'],
        ['Vendeuse', 'Voilà… Alors ?'],
        ['Sami', 'Elles sont un peu petites. Vous les avez en 42 ?'],
        ['Vendeuse', 'Oui, attendez… Voilà.'],
        ['Sami', 'Parfait, elles sont confortables. Je les prends ! Comme ça, j’aurai les pieds au sec.'],
      ],
      vor: [{ art: 'mc', auftrag: 'La pointure, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['la taille des chaussures', 'le prix', 'la couleur'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'en quoi ?', 'prix', '+ / –'], breiten: [20, 22, 16, 42], zeilen: [['modèle 1', '[en cuir]', '[85 €]', '[très solide ; trop cher]'], ['modèle 2', '[en tissu]', '[45 €]', '[moins solide ; imperméable, léger]']] },
        { art: 'mc', auftrag: 'Coche la bonne réponse.', stufe: 2, fragen: [
          { f: 'Pourquoi Sami ne prend-il pas le modèle 1 ?', o: ['Il est trop cher.', 'Il est trop petit.', 'Il n’est pas solide.'], r: 0 },
          { f: 'Quelle pointure achète-t-il ?', o: ['41', '42', '43'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jeu de rôle dans un magasin : achetez un vêtement ou des chaussures. Le client / la cliente explique ses besoins.', stufe: 2, karten: [
        { titel: 'Client(e)', text: ['Je cherche … pour …', 'Vous en avez des moins chers ?', 'Je peux l’essayer ?', 'Je le / la / les prends.'] },
        { titel: 'Vendeur / vendeuse', text: ['Je peux vous aider ?', 'Quelle taille / pointure ?', 'Ce modèle est en …, à …', 'Il est moins cher, pourtant …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Décrire un vêtement : à, de, en', punkte: ['**en** + matière : **en** cuir · **en** laine · **en** coton · **en** jean', '**à** + détail : **à** capuche · **à** lacets · **à** talons · **à** manches courtes', '**de** + fonction : veste **de** ski · chaussures **de** sport · bottes **de** pluie'] },
         { art: 'achtung', titel: 'grâce à ou à cause de ?', text: '**Grâce à** la capuche, je n’ai pas froid. (positif) · **À cause de** la pluie, j’ai froid. (négatif)' }],
        [{ titel: 'Relier ses idées', tabelle: { kopf: ['', 'mots'], zeilen: [['la cause', '**parce que** · **car** · **grâce à** (+) · **à cause de** (–)'], ['la conséquence', '**donc** · **alors** · **c’est pourquoi**'], ['le but', '**pour** + infinitif · **pour** + nom'], ['l’opposition', '**mais** · **par contre** · **pourtant**']] } }],
        [{ art: 'tipp', titel: 'Acheter malin', text: '1. Mes **besoins** : pour quoi faire ? 2. La **qualité** : solide ? chaud ? 3. Le **prix** : dans mon budget ? Lis aussi les **avis** et compare avant d’acheter !' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec à, de ou en.', stufe: 1, saetze: ['Un pull [en] laine.', 'Une veste [à] capuche.', 'Des chaussures [de] sport.', 'Un sac [en] cuir.', 'Une robe [à] manches courtes.', 'Des bottes [de] pluie.'] },
      { art: 'luecken', auftrag: 'Complète avec parce que, donc, pour, pourtant ou grâce à.', stufe: 2, woerter: ['parce que', 'donc', 'pour', 'pourtant', 'grâce à'], saetze: ['Je prends le modèle C [parce que] cette veste est chaude.', 'Max a une veste neuve. [Pourtant], il avait froid à la montagne.', 'Il pleut, [donc] je mets ma veste de pluie.', 'J’achète des baskets [pour] courir.', '[Grâce à] la garantie, je peux échanger la veste.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Un ami / Une amie hésite : baskets A (en cuir, 70 €, très solides) ou baskets B (en tissu, 40 €, légères, moins solides) ? Écris-lui un message pour le / la conseiller.', stufe: 3,
        anfaenge: ['Salut …, à mon avis, tu devrais prendre …', '… parce que …', 'Par contre, …', 'Donc …', 'Pour …'], zeilen: 10,
        beispiel: 'Salut Mia, à mon avis, tu devrais prendre les baskets B, parce qu’elles sont légères et pas chères. Par contre, elles sont moins solides. Tu fais beaucoup de sport, donc elles vont peut-être s’abîmer vite. Mais avec les 30 € économisés, tu peux t’acheter un ballon pour jouer !' },
    ],
    check: ['Je compare des produits.', 'Je comprends des avis de clients.', 'J’achète des chaussures dans un magasin.', 'Je décris un vêtement avec à, de, en.', 'J’exprime la cause, la conséquence, le but et l’opposition.'],
  },
  // ================================================================ 8
  {
    thema: 'Les spectacles · raconter un film · donner son avis', titel: 'On va voir quoi ?', untertitel: 'Un programme de spectacles, une discussion après le cinéma : tu choisis une sortie, tu racontes un film et tu dis ce que tu en penses.',
    ziel: { fr: 'Je choisis un spectacle, je raconte brièvement un film et je donne mon avis.', de: 'Ich wähle eine Vorstellung, erzähle kurz einen Film und sage meine Meinung.' },
    bild: ['lea:froh:erklaeren', 'noah:gelangweilt:verschraenkt'],
    start: {
      was: 'Les spectacles',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['une comédie', 'un film d’aventure', 'un documentaire', 'un film d’horreur', 'un dessin animé', 'une pièce de théâtre'], rechts: ['ein lustiger Film', 'ein Abenteuerfilm', 'ein Dokumentarfilm', 'ein Horrorfilm', 'ein Zeichentrickfilm', 'ein Theaterstück'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un programme de spectacles', art: 'dokumente',
      quelle: 'Agenda culturel du journal local (spectacles imaginaires)', titel: 'Que faire ce week-end ?',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Cinéma** · « Cap sur l’île aux Brumes » · aventure · à partir de 12 ans · samedi 20 h', text: ['Trois amis partent en bateau pour retrouver un grand-père disparu. Mais une tempête arrive… Beaucoup de suspense et des images magnifiques.'] },
        { stil: 'karte', stimme: 'w1', kopf: '**Cinéma** · « Un robot à la cave » · comédie · tous publics · dimanche 15 h', text: ['Léo, 12 ans, trouve un vieux robot dans la cave. Le robot veut aider la famille… mais il fait tout de travers ! Très drôle.'] },
        { stil: 'karte', stimme: 'w1', kopf: '**Théâtre** · « Le portable de la discorde » · club théâtre de la 7P2 · vendredi 18 h · entrée libre', text: ['Une grand-mère, deux ados et un portable : une comédie sur la vie de famille… et sur les écrans.'] },
        { stil: 'karte', stimme: 'w1', kopf: '**Télévision** · « Mystères des grands fonds » · documentaire · samedi 19 h, chaîne 3', text: ['Comment vivent les animaux au fond de la mer ? Un voyage incroyable avec des images jamais vues.'] },
      ],
      woerter: [['le centre culturel', 'das Kulturzentrum'], ['à partir de 12 ans', 'ab 12 Jahren'], ['disparu(e)', 'verschwunden'], ['la tempête', 'der Sturm'], ['tous publics', 'für alle'], ['de travers', 'schief, falsch'], ['l’entrée libre', 'freier Eintritt'], ['la chaîne', 'der (Fernseh-)Sender'], ['le fond de la mer', 'der Meeresboden']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Quel spectacle pour qui ? Relie.', stufe: 1, links: ['Lina adore rire. Elle est libre dimanche.', 'Noah, 13 ans, aime le suspense.', 'Mamie veut voir ses petits-enfants sur scène.', 'Amira aime les animaux. Samedi soir, elle reste à la maison.'], rechts: ['« Un robot à la cave »', '« Cap sur l’île aux Brumes »', '« Le portable de la discorde »', '« Mystères des grands fonds »'], ordnung: [2, 0, 3, 1] },
        { art: 'mc', auftrag: 'Coche la bonne réponse.', stufe: 2, fragen: [
          { f: 'Quel spectacle est gratuit ?', o: ['le film d’aventure', 'la pièce de théâtre', 'la comédie'], r: 1 },
          { f: 'Un enfant de 9 ans peut voir …', o: ['« Cap sur l’île aux Brumes »', '« Un robot à la cave »'], r: 1 }] },
      ],
    },
    hoeren: {
      was: 'Après le cinéma', wo: 'Lundi matin · dans la cour', titel: 'Ça parle de quoi ?',
      situation: 'Lundi matin, Léa raconte à Noah le film qu’elle a vu samedi. Mais Noah aussi a vu le film…',
      bild: ['lea:froh:erklaeren', 'noah:gelangweilt:verschraenkt'], sprecher: { Léa: 'w2', Noah: 'm3' },
      text: [
        ['Léa', 'Samedi, je suis allée voir « Cap sur l’île aux Brumes » !'],
        ['Noah', 'Ah oui ? Ça parle de quoi ?'],
        ['Léa', 'Au début, trois amis trouvent une vieille carte dans un grenier. Sur la carte, il y a une île mystérieuse. Ensuite, ils partent en bateau pour chercher le grand-père de Tim, qui a disparu là-bas. Mais en pleine mer, une tempête se met à souffler…'],
        ['Noah', 'Et à la fin ? Ils le retrouvent ?'],
        ['Léa', 'Je ne te dis pas la fin ! Mais c’était génial. Ce qui m’a plu, c’est le suspense. Et les images de la mer sont magnifiques.'],
        ['Noah', 'Moi aussi, je l’ai vu, avec mon cousin. Mais je ne suis pas d’accord avec toi : je trouve que c’était trop long. Le début est vraiment lent.'],
        ['Léa', 'Trop long ? Tu exagères ! Par contre, tu as raison : le début est un peu lent.'],
        ['Noah', 'Bon. « Un robot à la cave » passe encore dimanche prochain. Tu viens ? Il paraît que c’est très drôle.'],
        ['Léa', 'D’accord, bonne idée !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Raconter la fin d’un film à quelqu’un qui ne l’a pas vu, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['gentil', 'pas très sympa : on dit « un spoiler »'], r: 1 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Écoute. Mets l’histoire du film dans l’ordre.', stufe: 1, teile: ['Trois amis trouvent une vieille carte.', 'Sur la carte, il y a une île mystérieuse.', 'Ils partent en bateau.', 'Une tempête se met à souffler.'], ordnung: [2, 0, 3, 1] },
        { art: 'tabelle', auftrag: 'Qu’est-ce qu’ils pensent du film ?', stufe: 2, kopf: ['', 'avis', 'pourquoi ?'], breiten: [16, 24, 60], zeilen: [['Léa', '[génial]', '[le suspense ; les images de la mer]'], ['Noah', '[trop long]', '[le début est un peu lent]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Raconte un film, une série ou un livre (vrai ou inventé) en une minute. Ne dis pas la fin ! Ton / ta partenaire réagit.', stufe: 3, karten: [
        { titel: 'Raconter', text: ['Ça parle de …', 'Au début, …', 'Ensuite, …', 'Je ne te dis pas la fin !'] },
        { titel: 'Donner son avis', text: ['C’était génial / nul / trop long.', 'Ce qui m’a plu, c’est …', 'À mon avis, …'] },
        { titel: 'Réagir', text: ['Je suis d’accord.', 'Tu exagères !', 'Tu as raison.', 'Je ne trouve pas.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Raconter une histoire', punkte: ['**Ça parle de …** · **C’est l’histoire de …**', '**Au début**, … · **Ensuite** / **Puis**, …', '**Quand** …, … · **Chaque fois que** …, …', '**À la fin**, … (ou : Je ne dis pas la fin !)', 'On raconte au **présent** : Trois amis **partent** en bateau.'] },
         { titel: 'Donner son avis', punkte: ['**J’ai trouvé ça** génial / drôle / nul / trop long.', '**Ce qui m’a plu, c’est** le suspense.', '**Ce qui ne m’a pas plu, c’est** …', '**À mon avis**, … · **Je trouve que** …', '**Je le conseille à** … **parce que** …'] }],
        [{ art: 'tipp', titel: 'Approuver ou désapprouver', text: '**Je suis d’accord avec toi.** · **Tu as raison.** · **C’est vrai.** – **Je ne suis pas d’accord.** · **Je ne trouve pas.** · **Tu exagères !**' },
         { art: 'achtung', titel: 'Un résumé', text: 'Un résumé est **court** : seulement les **événements importants**, dans l’**ordre**. Pas de détails, pas de dialogues.' }],
      ],
    },
    ueben: [
      { art: 'ordnen', auftrag: 'Un conte connu : mets le résumé du « Petit Chaperon rouge » (version des frères Grimm) dans l’ordre.', stufe: 1, teile: ['Au début, une petite fille apporte un gâteau à sa grand-mère.', 'Dans la forêt, elle rencontre un loup.', 'Ensuite, le loup court chez la grand-mère et la mange.', 'Quand la petite fille arrive, le loup la mange aussi.', 'À la fin, un chasseur sauve la fille et la grand-mère.'], ordnung: [2, 4, 0, 3, 1] },
      { art: 'luecken', auftrag: 'Complète l’avis.', stufe: 2, woerter: ['Ça parle', 'Au début', 'Ce qui m’a plu', 'À mon avis', 'Je le conseille'], saetze: ['[Ça parle] d’un garçon qui trouve un robot.', '[Au début], le robot fait tout de travers.', '[Ce qui m’a plu], c’est l’humour.', '[À mon avis], la fin est un peu triste.', '[Je le conseille] aux familles.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris une petite critique d’un film, d’une série ou d’un livre (vrai ou inventé) pour le journal de l’école.', stufe: 3,
        anfaenge: ['Titre : …', 'Ça parle de …', 'Au début, …', 'Ensuite, …', 'À mon avis, … parce que …', 'Je le conseille à …'], zeilen: 11,
        beispiel: 'Titre : « Un robot à la cave ». Ça parle de Léo, un garçon de 12 ans, qui trouve un vieux robot dans la cave. Au début, le robot veut aider la famille, mais il casse tout ! Ensuite, Léo lui apprend à faire la cuisine. À mon avis, c’est très drôle parce que le robot fait des erreurs incroyables. Je le conseille à toute la famille.' },
      { art: 'schreiben', auftrag: 'Mon journal de bord : fais le point sur ce module.', stufe: 1, zeilen: 9, zeilenAnfaenge: ['Ce que j’ai appris :', '', '', 'Ce qui est encore difficile :', '', '', 'Mon prochain objectif :', '', ''] },
    ],
    check: ['Je choisis un spectacle à partir d’un programme.', 'Je comprends une discussion sur un film.', 'Je raconte brièvement un film.', 'Je donne mon avis et je réagis à l’avis des autres.', 'J’écris un petit résumé avec mon opinion.'],
  },
]
