// Français · Module 9 « La vie culturelle » (Régime / Voie de préparation, B1.1) – cahier multimodal.
// D’après le « Programme FRANC 7P–5P » (CNES, 20/03/2019), Module 9 « Participer à la vie
// culturelle » : sociétés différentes, la chanson, la poésie, exprimer son opinion et ses émotions, des goûts et des
// couleurs ; projet d’enquête (questions, interview, résultats, exposé) ; collectifs (la plupart, beaucoup de, les gens,
// on), obligation (devoir, falloir + infinitif), quantité (la majorité des, un grand nombre de, une minorité de),
// cause et but (parce que, à cause de, dû à, grâce à), comparaison (adjectifs et noms), tel, si / tellement… que,
// opposition (alors que, tandis que, par contre), ordinaux et pourcentages ; citer ses sources (selon, d’après),
// faire préciser, corriger son texte avec une fiche-guide.
// Chanson, slam, artistes, enquêtes et chiffres de l’école : imaginaires. Faits sur les pays et la santé : simplifiés.

const balken = (titel, daten, einheit) => {
  const max = Math.max(...daten.map((d) => d[1]))
  return `<div style="font-family:Lexend;font-weight:700;font-size:11.5pt;margin-bottom:2.5mm">${titel}</div><div style="display:grid;gap:2.2mm">${daten
    .map(([l, v]) => `<div style="display:grid;grid-template-columns:44mm 1fr;gap:3mm;align-items:center"><span style="font-size:11.5pt">${l}</span><div style="display:flex;align-items:center;gap:2mm"><div style="height:7mm;width:${(v / max) * 90}mm;background:var(--f);border-radius:1.5mm"></div><b style="font-family:Lexend">${v}</b><span style="font-size:10.5pt;color:var(--leise)">${einheit}</span></div></div>`)
    .join('')}</div>`
}

export const MODUL = {
  id: 'franzoesisch-m9', kuerzel: 'fr9', nr: 9, sprache: 'fr', niveau: 'B1.1', klasse: 'Voie de préparation',
  dateiname: 'Francais_Module-9',
  fach: { de: 'Französisch', fr: 'Français' },
  titel: { de: 'Kultur erleben', fr: 'La vie culturelle' },
  untertitel: { fr: 'Parler de ses goûts, comprendre une chanson et un slam, découvrir d’autres pays, mener une enquête, présenter des résultats et protéger ses oreilles – en huit unités.', de: 'Über Vorlieben sprechen, ein Lied und einen Slam verstehen, andere Länder entdecken, eine Umfrage machen, Ergebnisse vorstellen und die Ohren schützen – in acht Einheiten.' },
  farben: { tief: '#4a3fb0', mittel: '#b8b0ec', zart: '#f0eefb', dunkel: '#2d2575' },
  deckbild: ['amira:froh:tanzen', 'yusuf:froh:erklaeren', 'mia:froh:handy'],
  blasen: [{ t: 'À mon avis…', x: 14, y: 110 }, { t: 'Selon l’enquête…', x: 114, y: 98 }, { t: 'Bravo !', x: 166, y: 150 }],
  themen: [
    { titel: { fr: 'Goûts, chansons, poésie', de: 'Vorlieben, Lieder, Gedichte' }, icon: 'music', lektionen: 3 },
    { titel: { fr: 'Ici et ailleurs', de: 'Hier und anderswo' }, icon: 'world', lektionen: 1 },
    { titel: { fr: 'Notre grande enquête', de: 'Unsere große Umfrage' }, icon: 'chart-bar', lektionen: 4 },
  ],
  anleitung: [
    'Chaque leçon a cinq parties : **Lire**, **Écouter**, **La règle**, **S’entraîner** et **Écrire**. À la fin, il y a un **mini-bilan**.',
    'À côté de chaque texte, il y a un **code QR**. Scanne-le avec ton portable : tu entends le texte. Écoute plusieurs fois pour vérifier le sens.',
    'Dans ce module, la classe 7P2 mène une **grande enquête** : « Les jeunes et la musique ». Tu peux faire ta propre enquête, leçon après leçon.',
    'On parle aussi d’émotions. Tu parles de toi seulement si tu veux. Besoin d’aide ? **116 111** (gratuit, anonyme).',
  ],
  // seulement pour la voix (Regex Python)
  aussprache: {
    '\\bMme\\b': 'Madame', '\\bM\\. ': 'Monsieur ', '(\\d{1,2}) h (\\d\\d)': '\\1 heures \\2', '(\\d{1,2}) h\\b': '\\1 heures',
    '(\\d+) ?€': '\\1 euros', '\\b60/60\\b': 'soixante, soixante', '(\\d+) ?%': '\\1 pour cent', '\\bOMS\\b': 'O M S',
    '\\b1er\\b': 'premier', '\\b2e\\b': 'deuxième', '\\b3e\\b': 'troisième', '\\b4e\\b': 'quatrième',
    '\\bsam\\.': 'samedi', '\\bmer\\.': 'mercredi', '\\blun\\.': 'lundi', 'Répét\\.': 'Répétitions', '\\bEnv\\.': 'Environ', '\\bRdv\\b': 'Rendez-vous',
    'rockados@exemple\\.lu': 'rock ados, arobase, exemple, point, lu', '\\b[Mm]oien\\b': 'moïenne', '\\b116 111\\b': 'un un six, un un un',
  },
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Des goûts et des couleurs · donner son avis · les collectifs', titel: 'Chacun ses goûts !', untertitel: 'Un forum sur la musique, une discussion entre amis : tu donnes ton opinion, tu demandes l’avis des autres et tu compares des styles.',
    ziel: { fr: 'Je donne mon opinion sur la musique et je demande l’avis des autres.', de: 'Ich sage meine Meinung zur Musik und frage andere nach ihrer Meinung.' },
    bild: ['lina:froh:handy', 'ben:froh:verschraenkt'],
    start: {
      was: 'Les mots de la musique',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['la batterie', 'les paroles', 'le refrain', 'la voix', 'le rythme', 'le morceau'], rechts: ['das Schlagzeug', 'der Liedtext', 'der Refrain', 'die Stimme', 'der Rhythmus', 'das Musikstück'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un forum sur Internet', art: 'profile', stimme: 'w1',
      quelle: 'Forum « Ados & musique » (pseudos et personnes imaginaires)', titel: 'Quelle musique écoutez-vous ?',
      profile: [
        { name: 'Lina_rap', bild: 'lina:froh:handy', stimme: 'w2', text: 'Moi, j’écoute surtout du rap. **La plupart de** mes copains aussi ! Ce qui me plaît, ce sont les paroles : les rappeurs parlent de **la vie des gens**, de leurs problèmes. **Et vous, qu’est-ce que vous en pensez ?**' },
        { name: 'Ben_rock', bild: 'ben:froh:verschraenkt', stimme: 'm3', text: 'Je ne suis pas d’accord, Lina. Le rap, c’est souvent répétitif ! Moi, je préfère le rock : la guitare, la batterie, l’énergie… **On** ne peut pas rester assis. **Une telle énergie**, je ne la trouve nulle part ailleurs !' },
        { name: 'Mia.chante', bild: 'mia:froh:tanzen', stimme: 'w3', text: 'Moi, j’écoute **un peu de tout** : de la pop, de l’électro, et même de la musique classique. **Beaucoup de gens** disent que le classique, c’est ennuyeux. À mon avis, c’est faux. Des goûts et des couleurs, on ne discute pas !' },
        { name: 'Yusuf_beats', bild: 'yusuf:froh:laptop', stimme: 'm1', text: 'Moi, je fais de la musique sur l’ordinateur. **Les gens** pensent que c’est facile, mais **on** travaille des heures pour un seul morceau ! **Qui veut écouter** mon nouveau morceau ? Dites-moi franchement ce que vous en pensez.' },
      ],
      woerter: [['le pseudo', 'der Benutzername'], ['les paroles', 'der Liedtext'], ['répétitif / répétitive', 'sich wiederholend, eintönig'], ['nulle part ailleurs', 'nirgendwo sonst'], ['ennuyeux / ennuyeuse', 'langweilig'], ['Des goûts et des couleurs, on ne discute pas.', 'Über Geschmack lässt sich nicht streiten.'], ['le morceau', 'das Musikstück'], ['franchement', 'ehrlich']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète.', stufe: 1, kopf: ['pseudo', 'style préféré', 'pourquoi ?'], breiten: [22, 26, 52], zeilen: [['Lina_rap', '[le rap]', '[les paroles : la vie des gens]'], ['Ben_rock', '[le rock]', '[la guitare, la batterie, l’énergie]'], ['Mia.chante', '[un peu de tout]', '[pop, électro, classique]'], ['Yusuf_beats', '[sa propre musique]', '[il fait de la musique sur l’ordinateur]']] },
        { art: 'mc', auftrag: 'Qui demande l’avis des autres ? Coche.', stufe: 2, fragen: [{ f: '', o: ['Lina', 'Ben', 'Mia', 'Yusuf'], r: [0, 3] }] },
      ],
    },
    hoeren: {
      was: 'Une discussion entre amis', wo: 'Dans la cour · à la récré', titel: 'Tu en penses quoi ?',
      situation: 'Amira, Noah et Chloé parlent du nouvel album de la chanteuse Nour et du groupe Les Ondes (artistes imaginaires).',
      bild: ['amira:froh:handy', 'noah:froh:verschraenkt'], sprecher: { Amira: 'w2', Noah: 'm3', Chloé: 'w3' },
      text: [
        ['Amira', 'Vous avez écouté le nouvel album de Nour ?'],
        ['Noah', 'Oui, mais franchement, je préfère Les Ondes. Leurs chansons sont plus rythmées.'],
        ['Chloé', 'Ah bon ? Moi, je trouve que Nour chante mieux. Sa voix est tellement belle ! Et toi, Amira, tu en penses quoi ?'],
        ['Amira', 'Moi, j’aime les deux. Les Ondes, c’est parfait pour faire du sport. Nour, c’est plutôt pour le soir, quand je suis fatiguée.'],
        ['Noah', 'Les chansons de Nour sont un peu tristes, non ?'],
        ['Chloé', 'Pas du tout ! Elles sont émouvantes, c’est différent. Elles parlent de la vie, de l’amitié…'],
        ['Noah', 'D’accord, d’accord. Mais avoue que Les Ondes, en concert, c’est autre chose !'],
        ['Amira', 'Ça, c’est vrai. Vous savez quoi ? Nour donne un concert le mois prochain. On y va ensemble ? Comme ça, Noah pourra changer d’avis !'],
        ['Noah', 'Bon… Si vous m’invitez, je viens !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour demander l’avis de quelqu’un, on dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['Tu en penses quoi ?', 'Qu’est-ce que tu en penses ?', 'Tu as quel âge ?'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'préfère …', 'pourquoi ?'], breiten: [16, 28, 56], zeilen: [['Noah', '[Les Ondes]', '[plus rythmées ; super en concert]'], ['Chloé', '[Nour]', '[sa voix est belle ; chansons émouvantes]'], ['Amira', '[les deux]', '[Les Ondes pour le sport, Nour pour le soir]']] },
        { art: 'mc', auftrag: 'Coche la bonne réponse.', stufe: 2, fragen: [{ f: 'Qu’est-ce qu’Amira propose à la fin ?', o: ['d’aller au concert de Nour ensemble', 'd’écouter Les Ondes', 'de faire du sport'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Comparez deux styles de musique, deux chanteurs ou deux groupes. Donnez votre avis et demandez l’avis des autres.', stufe: 3, karten: [
        { titel: 'Donner son avis', text: ['À mon avis, …', 'Je trouve que …', 'Ce qui me plaît, c’est …', 'Je préfère … parce que …'] },
        { titel: 'Demander l’avis', text: ['Tu en penses quoi ?', 'Et toi, tu préfères … ou … ?', 'Tu es d’accord ?', 'Pourquoi ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les collectifs', punkte: ['**la plupart des** jeunes écout**ent** (pluriel)', '**beaucoup de** gens · **beaucoup d’**élèves', '**les gens** pensent que … (= die Leute)', '**on** écout**e** (singulier) = les gens / nous', '**tout le monde** aime … (singulier)'] },
         { titel: 'Donner son avis', punkte: ['**À mon avis**, … · **Je trouve que** …', '**Ce qui me plaît, c’est** …', '**Je préfère** A **à** B.', 'Demander : **Tu en penses quoi ?** · **Qu’est-ce que vous en pensez ?**', 'Réagir : **Je suis d’accord.** · **Pas du tout !**'] }],
        [{ art: 'tipp', titel: 'tel, telle, tels, telles', text: '**Une telle** voix ! (= so eine) · **Un tel** concert ! · **De tels** morceaux · **De telles** chansons. L’adjectif s’accorde avec le nom.' },
         { art: 'achtung', titel: 'Respecter les goûts', text: 'On peut ne pas être d’accord **sans** se moquer. Dis : « **Ce n’est pas mon style.** » plutôt que « C’est nul. »' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec la plupart des, beaucoup de, les gens, on ou tout le monde.', stufe: 1, woerter: ['la plupart des', 'beaucoup de', 'les gens', 'on', 'tout le monde'], saetze: ['[La plupart des] élèves écoutent de la musique le soir.', 'Il y a [beaucoup de] monde au concert.', 'À la fin du concert, [tout le monde] chante.', 'En Belgique, [on] parle français, néerlandais et allemand.', 'Dans le bus, [les gens] écoutent souvent de la musique.'] },
      { art: 'luecken', auftrag: 'Complète avec tel, telle, tels ou telles.', stufe: 2, saetze: ['Je n’ai jamais entendu une [telle] voix !', 'Un [tel] concert, c’est magique.', 'De [tels] morceaux, j’en écoute tous les jours.', 'Avec de [telles] paroles, la chanson me touche.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Réponds sur le forum : quelle musique écoutes-tu ? Pourquoi ? Réagis à un message et demande l’avis des autres.', stufe: 2,
        anfaenge: ['Salut tout le monde !', 'Moi, j’écoute surtout …', 'Ce qui me plaît, c’est …', '… (pseudo), je suis / je ne suis pas d’accord avec toi : …', 'Et vous, qu’est-ce que vous en pensez ?'], zeilen: 10,
        beispiel: 'Salut tout le monde ! Moi, j’écoute surtout de la musique de films. Ce qui me plaît, c’est l’émotion : les violons me donnent des frissons. Ben_rock, je suis d’accord avec toi : le rock, c’est plein d’énergie. Mais pour faire mes devoirs, je préfère quelque chose de calme. Et vous, qu’est-ce que vous en pensez ?' },
    ],
    check: ['Je comprends des opinions sur un forum.', 'Je comprends une discussion entre amis.', 'Je donne mon avis et je demande l’avis des autres.', 'J’utilise la plupart des, beaucoup de, les gens, on.', 'J’utilise tel, telle, tels, telles.'],
  },
  // ================================================================ 2
  {
    thema: 'La chanson · exprimer ses émotions · si / tellement … que', titel: 'Une chanson qui fait du bien', untertitel: 'Les paroles d’une chanson, une interview à la radio, un programme de concert : tu comprends une chanson et tu dis ce qu’elle te fait ressentir.',
    ziel: { fr: 'Je comprends les paroles d’une chanson et je dis ce qui me plaît et ce que je ressens.', de: 'Ich verstehe einen Liedtext und sage, was mir gefällt und was ich fühle.' },
    bild: ['mia:ruhig:handy', 'amira:froh:tanzen'],
    start: {
      was: 'Les émotions',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['Ça me rend triste.', 'Ça me donne envie de danser.', 'Ça me touche.', 'J’ai des frissons.', 'Ça me fait du bien.', 'J’ai les larmes aux yeux.'], rechts: ['Das macht mich traurig.', 'Das macht mir Lust zu tanzen.', 'Das berührt mich.', 'Ich habe Gänsehaut.', 'Das tut mir gut.', 'Ich habe Tränen in den Augen.'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Les paroles d’une chanson', art: 'gedicht', stimme: 'w3',
      quelle: 'Paroles de la chanson « Quand la ville dort » · Nour (chanteuse imaginaire)', titel: 'Quand la ville dort',
      strophen: [
        ['Le soir, quand la ville dort,', 'je mets mon casque, je sors.', 'J’ai **tellement de** choses dans la tête', '**que** mon cœur est en tempête.'],
        { refrain: true, zeilen: ['On n’est jamais tout seuls', 'quand on chante à plusieurs.', 'On allume nos portables', 'et la nuit devient meilleure.'] },
        ['Les gens passent, pressés, gris,', 'personne ne voit mes soucis.', 'Mais ma musique est **si** forte', '**qu’**elle ouvre toutes les portes.'],
        ['Si tu es triste ce soir,', 'regarde par la fenêtre :', 'il y a **tellement d’**étoiles', '**que** la nuit n’est plus si noire.'],
        { refrain: true, zeilen: ['On n’est jamais tout seuls', 'quand on chante à plusieurs.', 'On allume nos portables', 'et la nuit devient meilleure.'] },
      ],
      woerter: [['le casque', 'der Kopfhörer'], ['la tempête', 'der Sturm'], ['à plusieurs', 'zu mehreren'], ['allumer', 'anmachen'], ['pressé(e)', 'in Eile'], ['le souci', 'die Sorge'], ['l’étoile', 'der Stern'], ['noir(e)', 'schwarz, dunkel']],
      aufgaben: [
        { art: 'mc', auftrag: 'Coche la bonne réponse.', stufe: 1, fragen: [
          { f: 'Au début de la chanson, la personne se sent …', o: ['seule et pleine de soucis', 'très en colère', 'fatiguée de danser'], r: 0 },
          { f: 'Qu’est-ce qui l’aide ?', o: ['la musique et chanter avec les autres', 'dormir', 'regarder la télé'], r: 0 }] },
        { art: 'tabelle', auftrag: 'Trouve les rimes dans la chanson.', stufe: 2, kopf: ['mot', 'rime avec …'], breiten: [40, 60], zeilen: [['dort', '[sors]'], ['tête', '[tempête]'], ['gris', '[soucis]'], ['forte', '[portes]'], ['soir', '[noire]']] },
      ],
    },
    hoeren: {
      was: 'Une interview à la radio', wo: 'Radio « Musique Ados » · le soir', titel: 'Pourquoi cette chanson ?',
      situation: 'À la radio, une animatrice parle avec la chanteuse Nour de sa chanson « Quand la ville dort ». À la fin, elle annonce un concert.',
      bild: ['lehrerin:froh:erklaeren', 'mia:froh:stehen'], sprecher: { Animatrice: 'w1', Nour: 'w3' },
      text: [
        ['Animatrice', 'Vous venez d’écouter « Quand la ville dort », le nouveau titre de Nour. Nour, bonsoir !'],
        ['Nour', 'Bonsoir, et merci de m’inviter !'],
        ['Animatrice', 'Pourquoi avez-vous écrit cette chanson ?'],
        ['Nour', 'Quand j’avais quatorze ans, je me sentais souvent seule. Le soir, je mettais mon casque et je regardais la ville par la fenêtre. La musique m’a beaucoup aidée. Je voulais dire aux jeunes : vous n’êtes pas seuls.'],
        ['Animatrice', 'Dans le refrain, on allume les portables…'],
        ['Nour', 'Oui ! En concert, le public allume les portables pendant le refrain. C’est tellement beau que j’ai parfois les larmes aux yeux.'],
        ['Animatrice', 'Qu’est-ce que vous conseillez aux jeunes qui se sentent seuls ?'],
        ['Nour', 'De parler à quelqu’un : un ami, un prof, un adulte de confiance. Et si c’est difficile, on peut appeler le 116 111. C’est gratuit et anonyme.'],
        ['Animatrice', 'Merci, Nour ! Et pour nos auditeurs : Nour est en concert le samedi 13 mars, à 20 heures, au centre culturel. Les billets coûtent 15 euros, et 10 euros pour les moins de 18 ans.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Dans une interview, il y a … Coche.', stufe: 1, fragen: [{ f: '', o: ['des questions et des réponses', 'seulement de la musique'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Écoute et réponds.', stufe: 2, fragen: [{ f: 'Pourquoi Nour a-t-elle écrit cette chanson ?', l: 'À 14 ans, elle se sentait souvent seule ; elle veut dire aux jeunes qu’ils ne sont pas seuls.' }, { f: 'Qu’est-ce qu’elle conseille aux jeunes qui se sentent seuls ?', l: 'Parler à quelqu’un (ami, prof, adulte de confiance) ou appeler le 116 111.' }] },
        { art: 'tabelle', auftrag: 'Le concert : complète.', stufe: 1, kopf: ['', ''], breiten: [36, 64], zeilen: [['date', '[samedi 13 mars]'], ['heure', '[20 heures]'], ['lieu', '[au centre culturel]'], ['prix (moins de 18 ans)', '[10 euros]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Fais écouter une chanson que tu aimes à ton groupe (ou présente-la). Dis ce qui te plaît et ce que tu ressens.', stufe: 3, karten: [
        { titel: 'Présenter', text: ['C’est une chanson de …', 'Elle parle de …', 'Le refrain dit : …'] },
        { titel: 'Ce qui me plaît', text: ['la mélodie · le rythme', 'les paroles · la voix', 'Ce qui me plaît, c’est …'] },
        { titel: 'Ce que je ressens', text: ['Ça me donne envie de …', 'Ça me fait du bien.', 'C’est si … que …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Exprimer ses émotions', punkte: ['Cette chanson **me rend** triste / heureux / heureuse.', 'Ça **me donne envie de** danser.', 'Ça **me touche**. · Ça **me fait du bien**.', 'J’ai **des frissons**. · J’ai **les larmes aux yeux**.', 'Je **me sens** seul(e) / mieux.'] },
         { titel: 'si / tellement … que', punkte: ['**si** + adjectif : Sa voix est **si** belle **que** je pleure.', '**tellement** + adjectif : C’est **tellement** beau **que** …', '**tellement de** + nom : Il y a **tellement d’**étoiles **que** …', 'verbe + **tellement** : Je l’aime **tellement** !'] }],
        [{ art: 'tipp', titel: 'Parler d’une chanson', text: 'la **mélodie** · le **rythme** · les **paroles** · la **voix** · le **refrain** · le **couplet** · l’**artiste** · l’**album** · le **titre**' },
         { art: 'achtung', titel: 'Tu te sens seul(e) ?', text: 'Parle à quelqu’un de confiance : un ami, un prof, un adulte. Ou appelle le **116 111** : c’est **gratuit** et **anonyme**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec si, tellement ou tellement de.', stufe: 1, saetze: ['Il y a [tellement de] monde que je ne vois pas la scène.', 'La chanson est [si / tellement] triste que j’ai les larmes aux yeux.', 'J’aime [tellement] ce groupe !', 'Il a [tellement de] chansons que je ne les connais pas toutes.'] },
      { art: 'abschreiben', auftrag: 'Fais une seule phrase avec si … que ou tellement de … que.', stufe: 2, kopf: ['deux phrases', 'une phrase'], saetze: [['Le concert était beau. J’ai pleuré.', 'Le concert était si beau que j’ai pleuré.'], ['Il y a beaucoup de bruit. Je n’entends rien.', 'Il y a tellement de bruit que je n’entends rien.'], ['Le rythme est rapide. Tout le monde danse.', 'Le rythme est si rapide que tout le monde danse.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Présente une chanson que tu aimes (ou une chanson imaginaire) pour la page « Coup de cœur » du journal de l’école.', stufe: 2,
        anfaenge: ['Mon coup de cœur : « … » de …', 'Cette chanson parle de …', 'Ce qui me plaît, c’est …', 'Quand je l’écoute, …', 'Elle est si … que …'], zeilen: 10,
        beispiel: 'Mon coup de cœur : « Quand la ville dort » de Nour. Cette chanson parle d’une personne qui se sent seule le soir. Ce qui me plaît, c’est le refrain : tout le monde chante ensemble. Quand je l’écoute, ça me fait du bien. Elle est si douce que je l’écoute avant de dormir.' },
    ],
    check: ['Je comprends les paroles d’une chanson.', 'Je trouve des rimes.', 'Je comprends une interview à la radio.', 'J’exprime mes émotions.', 'J’utilise si / tellement … que.'],
  },
  // ================================================================ 3
  {
    thema: 'La poésie · le slam · faire préciser', titel: 'Je suis un pont', untertitel: 'Un slam, un atelier avec une slameuse : tu comprends les images d’un poème, tu demandes des explications et tu écris ton propre slam.',
    ziel: { fr: 'Je comprends les images d’un poème et je demande à quelqu’un d’expliquer plus clairement.', de: 'Ich verstehe die Bilder in einem Gedicht und bitte jemanden, etwas genauer zu erklären.' },
    bild: ['yusuf:ruhig:stehen', 'lea:froh:erklaeren'],
    start: {
      was: 'Les mots de la poésie',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Quels mots riment ? Relie.', stufe: 1, links: ['le cœur', 'le soir', 'l’ami', 'la chanson', 'l’étoile', 'le rêve'], rechts: ['la peur', 'noir', 'la nuit', 'la maison', 'la voile', 'il se lève'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un slam', art: 'gedicht', stimme: 'm1',
      quelle: 'Slam de Malik, 15 ans · concours de slam de l’école (texte imaginaire)', titel: 'Je suis un pont',
      strophen: [
        ['Je suis un pont entre deux rives,', 'entre deux langues, deux façons de vivre.', 'Le matin, je dis « moien »,', 'à midi, je dis « bonjour »,', 'et le soir, chez ma grand-mère,', 'on parle créole, avec amour.'],
        ['Quand on me demande : « Tu viens d’où ? »', 'je réponds : « De loin… et de chez nous. »', 'Mes racines sont **si** longues', '**qu’**elles traversent la mer.'],
        ['Certains disent : « Choisis ton camp ! »', 'Moi, je dis : « Pourquoi choisir ? »', 'Un arbre a besoin de racines', '**et** de branches pour grandir.'],
        ['Je suis un pont, pas un mur.', 'Viens, traverse, n’aie pas peur :', 'de l’autre côté, il y a', 'les mêmes rêves que les tiens.'],
      ],
      woerter: [['le pont', 'die Brücke'], ['la rive', 'das Ufer'], ['« moien »', '« hallo » (luxemburgisch)'], ['le créole', 'das Kreolische'], ['la racine', 'die Wurzel'], ['traverser', 'überqueren'], ['choisir son camp', 'sich für eine Seite entscheiden'], ['la branche', 'der Ast'], ['le mur', 'die Mauer']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Que veulent dire les images ? Explique avec tes mots.', stufe: 2, kopf: ['image', 'sens'], breiten: [30, 70], zeilen: [['un pont', '[relie deux rives = deux cultures, deux langues]'], ['un mur', '[sépare les gens]'], ['les racines', '[d’où on vient, sa famille, son histoire]'], ['les branches', '[ce qu’on devient, grandir]']] },
        { art: 'mc', auftrag: 'Coche la bonne réponse.', stufe: 1, fragen: [
          { f: 'Combien de langues sont citées dans la première strophe ?', o: ['une', 'deux', 'trois'], r: 2 },
          { f: 'Le message du slam, c’est …', o: ['On n’a pas besoin de choisir : on peut avoir plusieurs cultures.', 'Il faut choisir une seule langue.', 'Les murs, c’est bien.'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Un atelier de slam', wo: 'La bibliothèque de l’école · mercredi', titel: 'Tu peux expliquer ?',
      situation: 'Kenza, une slameuse, anime un atelier à l’école. Sami et Léa posent des questions.',
      bild: ['amira:froh:erklaeren', 'sami:verwirrt:stehen'], sprecher: { Kenza: 'w2', Sami: 'm3', Léa: 'w3' },
      text: [
        ['Kenza', 'Bonjour tout le monde ! Je m’appelle Kenza, je suis slameuse. Qui sait ce que c’est, le slam ?'],
        ['Sami', 'C’est du rap sans musique ?'],
        ['Kenza', 'Pas tout à fait. Le slam, c’est de la poésie orale.'],
        ['Léa', 'Qu’est-ce que tu veux dire par « orale » ?'],
        ['Kenza', 'Ça veut dire qu’on dit son texte devant un public. On ne le lit pas seulement sur une feuille. Le slam est né à Chicago, aux États-Unis, dans les années 1980.'],
        ['Sami', 'Et il y a des règles ?'],
        ['Kenza', 'Oui, trois règles simples : pas de musique, pas de costume, et trois minutes maximum. Tout le monde peut participer !'],
        ['Léa', 'Mais comment on écrit un slam ? Tu peux expliquer plus clairement ?'],
        ['Kenza', 'Bien sûr. D’abord, tu choisis un sujet qui te touche. Ensuite, tu cherches des images, par exemple « je suis un pont ». Enfin, tu joues avec les sons : des rimes, des répétitions. Et surtout, tu parles avec ton cœur !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un poème qu’on dit devant un public, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['un slam', 'un roman', 'une recette'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', ''], breiten: [36, 64], zeilen: [['Le slam, c’est …', '[de la poésie orale]'], ['Né où ? Quand ?', '[à Chicago (États-Unis), dans les années 1980]'], ['Les trois règles', '[pas de musique, pas de costume, 3 minutes maximum]'], ['Écrire un slam', '[un sujet qui touche, des images, des rimes et des répétitions]']] },
        { art: 'mc', auftrag: 'Avec quelles phrases Léa demande-t-elle des explications ? Coche.', stufe: 2, fragen: [{ f: '', o: ['Qu’est-ce que tu veux dire par … ?', 'Tu peux expliquer plus clairement ?', 'C’est du rap sans musique ?'], r: [0, 1] }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Lis le slam de Malik (ou ton slam) devant ton groupe. Le groupe pose des questions pour mieux comprendre.', stufe: 3, karten: [
        { titel: 'Dire un slam', text: ['regarder le public', 'faire des pauses', 'parler fort et lentement', 'insister sur les mots importants'] },
        { titel: 'Faire préciser', text: ['Qu’est-ce que tu veux dire par … ?', 'Tu peux expliquer plus clairement ?', 'Tu peux donner un exemple ?', 'Si je comprends bien, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les outils du poète', punkte: ['la **rime** : dort – sors · soir – noire', 'la **comparaison** : fort **comme** un arbre', 'la **métaphore** : **Je suis un pont.**', 'la **répétition** : Je suis … je suis …', 'le **vers** (une ligne) · la **strophe** (un groupe de vers)'] },
         { titel: 'Faire préciser', punkte: ['**Qu’est-ce que tu veux dire par** « orale » ?', '**Tu peux expliquer plus clairement ?**', '**Tu peux donner un exemple ?**', '**Ça veut dire quoi**, « racines » ?', '**Si je comprends bien**, … ?'] }],
        [{ art: 'tipp', titel: 'Dire un poème', text: 'Respire avant de commencer. Fais une **pause** à la fin de chaque vers. Regarde le **public**. Parle **lentement** et **fort**.' },
         { art: 'achtung', titel: 'Le slam : trois règles', text: '**Pas de musique** · **pas de costume** · **trois minutes maximum**. Et on applaudit tout le monde !' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec comme pour faire une comparaison.', stufe: 1, woerter: ['comme un lion', 'comme la nuit', 'comme une plume', 'comme un oiseau'], saetze: ['Je suis léger / légère [comme une plume].', 'Il est courageux [comme un lion].', 'Ses cheveux sont noirs [comme la nuit].', 'Elle chante [comme un oiseau].'] },
      { art: 'abschreiben', auftrag: 'Tu ne comprends pas. Fais préciser.', stufe: 2, kopf: ['on te dit …', 'tu demandes …'], saetze: [['« Le slam, c’est de la poésie orale. »', 'Qu’est-ce que tu veux dire par « orale » ?'], ['« Il faut des images. »', 'Tu peux donner un exemple ?'], ['« Mes racines traversent la mer. »', 'Ça veut dire quoi, « racines » ?']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un petit slam « Je suis … » (6 à 8 vers). Tu peux parler de toi ou inventer une personne.', stufe: 3,
        anfaenge: ['Je suis …', 'entre … et …', 'Le matin, …', 'Le soir, …', 'On me dit : « … »', 'Je suis …, pas …'], zeilen: 10,
        beispiel: 'Je suis une vague / entre la mer et le sable. / Le matin, je suis calme, / le soir, je danse avec le vent. / On me dit : « Reste tranquille ! » / Moi, je réponds : « Je bouge, donc je vis. » / Je suis une vague, pas un mur.' },
    ],
    check: ['Je comprends les images d’un poème.', 'Je reconnais une rime, une comparaison, une métaphore.', 'Je comprends un atelier de slam.', 'Je demande à quelqu’un d’expliquer plus clairement.', 'J’écris un petit slam.'],
  },
  // ================================================================ 4
  {
    thema: 'D’autres sociétés · la comparaison · alors que, tandis que', titel: 'Ailleurs, c’est comment ?', untertitel: 'Quatre jeunes de quatre pays, un invité du Québec : tu découvres d’autres façons de vivre et tu compares avec le Luxembourg.',
    ziel: { fr: 'Je compare la vie des jeunes dans différents pays.', de: 'Ich vergleiche das Leben von Jugendlichen in verschiedenen Ländern.' },
    bild: ['finn:froh:stehen-zeigen', 'amira:froh:laessig'],
    start: {
      was: 'Les pays et les langues',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Dans quel pays parle-t-on … ? Relie.', stufe: 1, links: ['le japonais', 'le wolof et le français', 'le français (avec l’accent québécois)', 'le portugais', 'le luxembourgeois', 'le néerlandais'], rechts: ['au Japon', 'au Sénégal', 'au Québec (Canada)', 'au Brésil', 'au Luxembourg', 'aux Pays-Bas'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un reportage dans un magazine', art: 'profile', stimme: 'w1',
      quelle: 'Magazine « Jeunes du monde » (personnes imaginaires, informations simplifiées)', titel: 'Une journée d’école ailleurs',
      profile: [
        { name: 'Haruto, 13 ans, Japon', bild: 'sami:froh:stehen', stimme: 'm3', text: 'Chez nous, l’année scolaire commence **en avril**, **alors qu’**au Luxembourg, elle commence en septembre. Après les cours, nous nettoyons la classe nous-mêmes : c’est normal ! Ensuite, **la plupart des** élèves vont à un club. Moi, je fais du kendo.' },
        { name: 'Aminata, 14 ans, Sénégal', bild: 'amira:froh:erklaeren', stimme: 'w2', text: 'À l’école, on parle français, **mais** à la maison et avec mes copines, on parle wolof. Dans les classes, il y a souvent **plus d’**élèves **que** chez vous : parfois plus de quarante ! Le samedi, je vais au marché avec ma tante. Il y a **tellement de** couleurs !' },
        { name: 'Félix, 13 ans, Québec (Canada)', bild: 'finn:froh:laessig', stimme: 'm1', text: 'Ici aussi, on parle français, mais avec un accent ! L’hiver est **beaucoup plus** froid **qu’**au Luxembourg : parfois moins vingt-cinq degrés. Il y a une patinoire dans la cour de mon école : à la récré, on joue au hockey !' },
        { name: 'Luana, 12 ans, Brésil', bild: 'lea:froh:stehen', stimme: 'w3', text: 'Dans mon école, il y a deux groupes : un groupe vient le matin, **tandis que** l’autre vient l’après-midi. Moi, j’ai cours de 7 h à midi. Chez nous, on parle portugais, comme **beaucoup de gens** au Luxembourg !' },
      ],
      woerter: [['ailleurs', 'anderswo'], ['l’année scolaire', 'das Schuljahr'], ['nettoyer', 'putzen'], ['nous-mêmes', 'wir selbst'], ['le marché', 'der Markt'], ['l’accent', 'der Akzent'], ['la patinoire', 'die Eisbahn'], ['tandis que', 'während (Gegensatz)']],
      aufgaben: [
        { art: 'wer', auftrag: 'Qui dit ça ? Coche.', stufe: 1, personen: ['Haruto', 'Aminata', 'Félix', 'Luana'], saetze: [['On joue au hockey à la récré.', 'Félix'], ['On nettoie la classe après les cours.', 'Haruto'], ['On parle deux langues.', 'Aminata'], ['Je vais à l’école seulement le matin.', 'Luana'], ['On parle français à l’école.', ['Aminata', 'Félix']]] },
        { art: 'fragen', auftrag: 'Qu’est-ce qui est différent au Luxembourg ? Écris une phrase avec alors que.', stufe: 3, fragen: [{ f: 'Haruto (l’année scolaire)', l: 'Au Japon, l’année scolaire commence en avril, alors qu’au Luxembourg, elle commence en septembre.' }, { f: 'Félix (l’hiver)', l: 'Au Québec, il fait parfois moins vingt-cinq degrés, alors qu’au Luxembourg, il fait moins froid.' }] },
      ],
    },
    hoeren: {
      was: 'Un invité en classe', wo: 'Salle 12 · cours de français', titel: 'Chez moi, au Québec…',
      situation: 'Félix est en échange scolaire au Luxembourg pendant deux semaines. Il répond aux questions de la classe.',
      bild: ['finn:froh:erklaeren', 'yusuf:froh:stehen'], sprecher: { 'Mme Nouvelle': 'w1', Félix: 'm3', Yusuf: 'm1' },
      text: [
        ['Mme Nouvelle', 'Aujourd’hui, nous avons un invité : Félix, qui vient de Montréal. Félix, tu peux te présenter ?'],
        ['Félix', 'Bonjour ! J’ai treize ans et je suis ici pendant deux semaines, pour un échange scolaire.'],
        ['Yusuf', 'Qu’est-ce qui est différent ici, par rapport au Québec ?'],
        ['Félix', 'D’abord, les langues ! Ici, vous parlez luxembourgeois, français, allemand, anglais… Vous parlez plus de langues que nous. Chez moi, on parle surtout français, et un peu anglais.'],
        ['Yusuf', 'Et l’école ?'],
        ['Félix', 'Les journées sont aussi longues qu’au Québec. Par contre, il fait moins froid ici ! Chez nous, en hiver, il fait parfois moins vingt-cinq degrés.'],
        ['Yusuf', 'Moins vingt-cinq ? Tu vas à l’école quand même ?'],
        ['Félix', 'Oui, bien sûr ! On met des vêtements très chauds. Et on joue au hockey sur la patinoire de l’école.'],
        ['Mme Nouvelle', 'Et qu’est-ce que tu préfères ici ?'],
        ['Félix', 'Les boulangeries ! Il y a autant de pâtisseries que chez nous, mais elles sont tellement bonnes… Par contre, je ne comprends pas encore pourquoi tout le monde me dit « moien » !'],
        ['Mme Nouvelle', 'C’est « bonjour » en luxembourgeois, Félix !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un échange scolaire, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['aller à l’école dans un autre pays pendant un moment', 'changer de classe'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute. Compare le Luxembourg et le Québec.', stufe: 2, kopf: ['', 'Luxembourg / Québec'], breiten: [24, 76], zeilen: [['les langues', '[plus de langues au Luxembourg ; au Québec, surtout français]'], ['les journées', '[aussi longues]'], ['l’hiver', '[plus froid au Québec (parfois –25 °C)]'], ['les pâtisseries', '[autant de pâtisseries ; très bonnes au Luxembourg]']] },
        { art: 'mc', auftrag: 'Que veut dire « moien » ?', stufe: 1, fragen: [{ f: '', o: ['bonjour', 'merci', 'au revoir'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Interviewez une personne qui connaît un autre pays (ou imaginez). Comparez avec le Luxembourg.', stufe: 3, karten: [
        { titel: 'Demander', text: ['Qu’est-ce qui est différent ?', 'Comment ça se passe à l’école ?', 'Qu’est-ce que tu préfères ?'] },
        { titel: 'Comparer', text: ['plus / moins / aussi … que', 'plus de / moins de / autant de … que', '… alors que … · par contre, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'La comparaison', tabelle: { kopf: ['', 'plus (+)', 'égalité (=)', 'moins (–)'], zeilen: [['adjectif', '**plus** froid **que**', '**aussi** long **que**', '**moins** cher **que**'], ['nom', '**plus de** langues **que**', '**autant de** pâtisseries **que**', '**moins d’**élèves **que**'], ['verbe', 'il parle **plus que** moi', 'il lit **autant que** moi', 'il dort **moins que** moi']] } }],
        [{ titel: 'L’opposition', punkte: ['**alors que** : Au Japon, l’école commence en avril, **alors qu’**ici, elle commence en septembre.', '**tandis que** : Un groupe vient le matin, **tandis que** l’autre vient l’après-midi.', '**par contre** : Il fait froid. **Par contre**, l’école est chauffée.', '**mais** : On parle français, **mais** aussi wolof.'] },
         { art: 'achtung', titel: 'Attention !', text: '**bon** → **meilleur** (Les pâtisseries sont **meilleures**.) · **bien** → **mieux** (Elle chante **mieux**.)' }],
        [{ art: 'tipp', titel: 'D’autres cultures', text: 'Pose des questions et ne juge pas trop vite. Dis plutôt « **Chez nous, c’est différent.** » que « C’est bizarre ! »' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète la comparaison.', stufe: 1, saetze: ['Le Québec est [plus] froid [que] le Luxembourg. (+)', 'Au Sénégal, il y a souvent [plus d’] élèves par classe [qu’]ici. (+)', 'Les journées au Québec sont [aussi] longues [qu’]au Luxembourg. (=)', 'Le Luxembourg a [moins d’] habitants [que] le Brésil. (–)'] },
      { art: 'abschreiben', auftrag: 'Relie les deux phrases avec alors que.', stufe: 2, kopf: ['deux phrases', 'avec alors que'], saetze: [['Au Japon, on nettoie la classe. Ici, il y a des agents de nettoyage.', 'Au Japon, on nettoie la classe, alors qu’ici, il y a des agents de nettoyage.'], ['Félix parle deux langues. Yusuf en parle cinq.', 'Félix parle deux langues, alors que Yusuf en parle cinq.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Compare l’école au Luxembourg avec l’école d’un autre pays (du texte ou un pays que tu connais).', stufe: 2,
        anfaenge: ['Au Luxembourg, …', 'alors qu’au / en …, …', 'Il y a plus de / moins de … que …', 'Par contre, …', 'Ce qui me plaît le plus, c’est …'], zeilen: 10,
        beispiel: 'Au Luxembourg, l’année scolaire commence en septembre, alors qu’au Japon, elle commence en avril. Au Japon, les élèves nettoient leur classe. Il y a aussi plus de clubs après l’école qu’ici. Par contre, au Luxembourg, on parle plus de langues. Ce qui me plaît le plus au Japon, c’est le kendo.' },
    ],
    check: ['Je comprends un reportage sur des jeunes d’autres pays.', 'Je comprends un invité qui compare deux pays.', 'Je compare avec plus, moins, aussi, autant.', 'J’utilise alors que, tandis que, par contre.', 'J’écris une comparaison.'],
  },
  // ================================================================ 5
  {
    thema: 'Le projet d’enquête · l’interview · poser des questions', titel: 'On fait une enquête !', untertitel: 'Une interview dans le journal de l’école, un micro-trottoir : tu comprends une interview, tu prépares tes questions et tu fais préciser les réponses.',
    ziel: { fr: 'Je comprends une interview et je prépare les questions d’une enquête.', de: 'Ich verstehe ein Interview und bereite die Fragen einer Umfrage vor.' },
    bild: ['amira:froh:handy', 'ben:froh:erklaeren'],
    start: {
      was: 'Les mots de l’enquête',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['l’enquête', 'le questionnaire', 'interroger', 'la réponse', 'le résultat', 'le micro-trottoir'], rechts: ['die Umfrage', 'der Fragebogen', 'befragen', 'die Antwort', 'das Ergebnis', 'die Straßenumfrage'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Une interview', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Journal de l’école · rubrique « Rencontre » (personne imaginaire)', titel: '« Écrivez sur ce que vous connaissez ! »',
      absaetze: [
        '**Journal :** Yanis, tu as 19 ans et tu animes l’atelier rap de la Maison des jeunes. Comment as-tu commencé ?',
        '**Yanis :** À 13 ans, j’écrivais des textes dans mon cahier, en cachette. J’étais très timide. Un jour, un animateur m’a dit : « Tu dois les partager ! » J’ai participé à mon premier atelier… et je n’ai jamais arrêté.',
        '**Journal :** Qu’est-ce qu’on fait dans ton atelier ?',
        '**Yanis :** D’abord, on écoute des morceaux et on discute des paroles. Ensuite, chacun écrit. À la fin, on enregistre dans un petit studio. **La plupart des** participants n’ont jamais écrit avant !',
        '**Journal :** Il y a des règles ?',
        '**Yanis :** Oui, deux : **on doit** respecter les autres, et **il faut** écouter jusqu’au bout. Pas d’insultes, pas de moqueries. Chez nous, chacun peut s’exprimer.',
        '**Journal :** Un conseil pour les débutants ?',
        '**Yanis :** Écrivez sur ce que vous connaissez : votre quartier, vos amis, vos émotions. Et n’ayez pas peur de vous tromper ! L’atelier est gratuit, le mercredi de 14 h à 16 h.',
      ],
      woerter: [['animer un atelier', 'einen Workshop leiten'], ['en cachette', 'heimlich'], ['timide', 'schüchtern'], ['partager', 'teilen'], ['enregistrer', 'aufnehmen'], ['jusqu’au bout', 'bis zum Ende'], ['la moquerie', 'der Spott, das Auslachen'], ['se tromper', 'sich irren']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Quelle réponse va avec quelle question ? Relie.', stufe: 1, links: ['Comment as-tu commencé ?', 'Qu’est-ce qu’on fait dans l’atelier ?', 'Il y a des règles ?', 'Un conseil pour les débutants ?'], rechts: ['textes en cachette, puis un premier atelier', 'écouter, écrire, enregistrer', 'respecter les autres, écouter jusqu’au bout', 'écrire sur ce qu’on connaît'], ordnung: [2, 0, 3, 1] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['À 13 ans, Yanis était très timide.', true], ['La plupart des participants ont déjà écrit des textes avant l’atelier.', false], ['Dans l’atelier, on peut se moquer des autres.', false], ['L’atelier coûte 10 euros.', false]] },
      ],
    },
    hoeren: {
      was: 'Un micro-trottoir', wo: 'Dans l’école · pendant la récré', titel: 'Vous avez une minute ?',
      situation: 'Amira et Ben font leur enquête « Les jeunes et la musique ». Ils interrogent la secrétaire, puis un élève.',
      bild: ['amira:froh:handy', 'ben:froh:stehen'], sprecher: { Amira: 'w2', Ben: 'm3', Secrétaire: 'w1', Finn: 'm1' },
      text: [
        ['Amira', 'Excusez-moi, madame. On fait une enquête pour le journal de l’école. Vous avez une minute ?'],
        ['Secrétaire', 'Oui, bien sûr.'],
        ['Ben', 'Quelle musique écoutez-vous ?'],
        ['Secrétaire', 'Oh, un peu de tout.'],
        ['Amira', 'Qu’est-ce que vous voulez dire par « un peu de tout » ? Vous pouvez donner un exemple ?'],
        ['Secrétaire', 'Eh bien, de la chanson française le matin, à la radio, et du jazz le soir.'],
        ['Ben', 'Et combien de temps par jour ?'],
        ['Secrétaire', 'Environ une heure. Dans la voiture, surtout.'],
        ['Ben', 'Merci beaucoup ! … Salut, Finn ! Tu peux répondre à notre enquête ?'],
        ['Finn', 'Vas-y.'],
        ['Amira', 'Tu écoutes quelle musique ?'],
        ['Finn', 'De la drill, surtout.'],
        ['Ben', 'De la drill ? Tu peux expliquer plus clairement ? Je ne connais pas.'],
        ['Finn', 'C’est un style de rap, avec des basses très fortes et une ambiance sombre.'],
        ['Amira', 'Et tu écoutes combien de temps par jour ?'],
        ['Finn', 'Trois ou quatre heures, avec mon casque. Trop longtemps, d’après ma mère !'],
        ['Amira', 'Merci ! Bon, Ben, on a déjà interrogé vingt élèves. Il en reste encore cent !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour commencer une enquête poliment, on dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['Excusez-moi, vous avez une minute ?', 'Réponds vite !'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et note les réponses.', stufe: 1, kopf: ['', 'quelle musique ?', 'combien de temps ?'], breiten: [20, 44, 36], zeilen: [['la secrétaire', '[chanson française, jazz]', '[environ une heure]'], ['Finn', '[de la drill (un style de rap)]', '[trois ou quatre heures]']] },
        { art: 'fragen', auftrag: 'Écris les deux questions qu’Amira et Ben posent pour faire préciser.', stufe: 2, fragen: [{ f: '', l: 'Qu’est-ce que vous voulez dire par « un peu de tout » ? / Vous pouvez donner un exemple ?' }, { f: '', l: 'Tu peux expliquer plus clairement ?' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Micro-trottoir : posez vos questions à trois personnes de la classe. Faites préciser les réponses. Notez tout.', stufe: 3, karten: [
        { titel: 'Commencer', text: ['Excusez-moi, on fait une enquête.', 'Tu as / Vous avez une minute ?'] },
        { titel: 'Faire préciser', text: ['Tu peux donner un exemple ?', 'Qu’est-ce que tu veux dire par … ?', 'Si je comprends bien, …'] },
        { titel: 'Finir', text: ['Merci beaucoup !', 'Bonne journée !'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Poser des questions', punkte: ['question **fermée** (oui / non) : **Est-ce que** tu joues d’un instrument ?', 'question **ouverte** : **Quelle** musique … ? **Combien de** temps … ? **Pourquoi** … ?', 'question **à choix** : Tu préfères le rap **ou** la pop ?', 'avec **vous** (adultes) : Quelle musique **écoutez-vous** ?'] },
         { titel: 'L’obligation', punkte: ['**devoir** + infinitif : **On doit** respecter les autres.', 'je dois · tu dois · il **doit** · nous devons · ils **doivent**', '**il faut** + infinitif : **Il faut** écouter jusqu’au bout.', 'négation : **On ne doit pas** / **Il ne faut pas** se moquer.'] }],
        [{ art: 'tipp', titel: 'Une enquête en 5 étapes', text: '1. Choisir un **sujet** · 2. Préparer 5 ou 6 **questions** · 3. **Interroger** au moins dix personnes · 4. **Noter** les réponses · 5. **Compter** et **résumer** les résultats' },
         { art: 'achtung', titel: 'Poliment !', text: 'Commence par **Excusez-moi** · **Vous avez une minute ?** Termine par **Merci beaucoup !** Les réponses sont **anonymes** : on n’écrit pas les noms.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec quel / quelle, combien de, pourquoi, où ou est-ce que.', stufe: 1, saetze: ['[Quelle] musique écoutes-tu ?', '[Combien de] temps écoutes-tu de la musique par jour ?', '[Où] écoutes-tu de la musique ?', '[Est-ce que] tu joues d’un instrument ?', '[Pourquoi] aimes-tu ce groupe ?'] },
      { art: 'luecken', auftrag: 'Complète avec devoir (au présent) ou il faut.', stufe: 2, saetze: ['Dans l’atelier, on [doit] respecter les autres.', 'Pour une bonne enquête, [il faut] poser des questions claires.', 'Nous [devons] interroger cent vingt élèves.', 'Les élèves [doivent] répondre honnêtement.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Prépare le questionnaire de ton enquête : choisis un sujet (la musique, le sport, les écrans, les livres…) et écris cinq questions.', stufe: 2, zeilen: 9, zeilenAnfaenge: ['Sujet de l’enquête :', 'Question 1 (fermée) :', 'Question 2 (ouverte) :', 'Question 3 (à choix) :', 'Question 4 :', 'Question 5 :', 'Je vais interroger … personnes.', '', ''] },
    ],
    check: ['Je comprends une interview dans un journal.', 'Je comprends un micro-trottoir.', 'Je pose des questions fermées, ouvertes et à choix.', 'Je fais préciser une réponse.', 'J’exprime l’obligation avec devoir et il faut.'],
  },
  // ================================================================ 6
  {
    thema: 'Les résultats · les quantités et les pourcentages · citer ses sources', titel: 'Les chiffres parlent', untertitel: 'Un article avec un graphique, un journal à la radio : tu comprends des résultats, tu utilises les pourcentages et tu cites tes sources.',
    ziel: { fr: 'Je comprends et je résume les résultats d’une enquête.', de: 'Ich verstehe die Ergebnisse einer Umfrage und fasse sie zusammen.' },
    bild: ['yusuf:froh:laptop', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Les pourcentages',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['100 %', '50 %', '25 %', '75 %', '20 %', '10 %'], rechts: ['tout le monde', 'la moitié', 'un quart', 'trois quarts', 'un sur cinq', 'un sur dix'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un article avec des chiffres', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Journal de l’école (enquête et chiffres imaginaires)', titel: 'Les jeunes et la musique : les résultats',
      absaetze: [
        'Le mois dernier, la classe 7P2 a fait une grande enquête : « Les jeunes et la musique ». **Cent vingt élèves** de l’école ont répondu à nos questions. Voici les résultats.',
        '**Presque tous** les élèves (95 %) écoutent de la musique tous les jours. **La plupart** écoutent avec leur portable et un casque. En moyenne, ils écoutent **deux heures par jour**, c’est **plus que** les adultes de l’école (une heure).',
        'Quel style arrive **premier** ? C’est le rap, avec 38 %. La pop est **deuxième** (27 %), devant l’électro (15 %) et le rock (10 %). **Un petit groupe** (10 %) préfère d’autres styles : le jazz, le classique, la musique de films…',
        '**Un élève sur cinq** joue d’un instrument : surtout la guitare, le piano et la batterie. **Une minorité** (12 %) va à des concerts plus de deux fois par an. **Selon** les élèves, les billets sont souvent trop chers.',
        '**D’après** Mme Rantini, la prof de musique, ces résultats sont intéressants : « **Un grand nombre d’**élèves aimeraient apprendre un instrument. Nous allons ouvrir un atelier guitare l’année prochaine ! »',
      ],
      woerter: [['le résultat', 'das Ergebnis'], ['presque', 'fast'], ['en moyenne', 'im Durchschnitt'], ['arriver premier', 'auf Platz 1 kommen'], ['devant', 'vor'], ['un sur cinq', 'jeder Fünfte'], ['une minorité', 'eine Minderheit'], ['selon / d’après', 'laut, nach']],
      aufgaben: [
        { art: 'frei', auftrag: 'Regarde le graphique. Il montre les styles préférés.', stufe: 1, html: balken('Le style préféré des élèves (en %)', [['le rap', 38], ['la pop', 27], ['l’électro', 15], ['le rock', 10], ['autres styles', 10]], '%') },
        { art: 'tabelle', auftrag: 'Complète avec les chiffres de l’article.', stufe: 2, kopf: ['expression', 'chiffre'], breiten: [60, 40], zeilen: [['presque tous les élèves écoutent de la musique', '[95 %]'], ['le style qui arrive deuxième', '[la pop, 27 %]'], ['un élève sur cinq joue d’un instrument', '[20 %]'], ['une minorité va souvent au concert', '[12 %]']] },
      ],
    },
    hoeren: {
      was: 'Le journal à la radio', wo: 'Radio « Ados Info » · 17 h', titel: 'Le journal des jeunes',
      situation: 'À la radio, le présentateur donne les résultats d’une grande enquête, puis l’agenda culturel du week-end.',
      bild: ['tom:froh:erklaeren', 'mia:froh:handy'], sprecher: { Présentateur: 'm1' },
      text: [
        ['Présentateur', 'Bonjour, il est 17 heures, voici le journal des jeunes. D’abord, une enquête sur les jeunes et la culture. Selon une enquête auprès de mille jeunes de 12 à 18 ans, la majorité des jeunes, 64 %, écoutent de la musique plus de deux heures par jour.'],
        ['Présentateur', 'Un tiers des jeunes lisent au moins un livre par mois. Par contre, seulement 15 % vont au théâtre au moins une fois par an. D’après les chercheurs, c’est dû au prix des billets, mais aussi au manque d’information.'],
        ['Présentateur', 'Deuxième information : la Fête de la musique. Le 21 juin, il y aura des concerts gratuits dans beaucoup de villes et de villages.'],
        ['Présentateur', 'Et pour finir, l’agenda du week-end : samedi, concert de Nour au centre culturel, à 20 heures. Dimanche, à 15 heures, atelier slam gratuit à la bibliothèque. Bon week-end à tous !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un tiers, c’est environ … Coche.', stufe: 1, fragen: [{ f: '', o: ['33 %', '3 %', '75 %'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['les jeunes …', 'combien ?'], breiten: [64, 36], zeilen: [['écoutent de la musique plus de deux heures par jour', '[64 % (la majorité)]'], ['lisent au moins un livre par mois', '[un tiers]'], ['vont au théâtre au moins une fois par an', '[15 %]']] },
        { art: 'fragen', auftrag: 'Réponds.', stufe: 2, fragen: [{ f: 'Selon les chercheurs, pourquoi les jeunes vont-ils peu au théâtre ?', l: 'À cause du prix des billets et du manque d’information.' }, { f: 'Quand a lieu l’atelier slam ?', l: 'Dimanche, à 15 heures, à la bibliothèque.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Comparez les résultats de l’école (article) et de la radio. Qu’est-ce qui vous surprend ? Citez la source.', stufe: 3, karten: [
        { titel: 'Citer', text: ['Selon l’article, …', 'D’après la radio, …', 'D’après Mme Rantini, …'] },
        { titel: 'Réagir', text: ['Ce qui me surprend, c’est que …', 'Je trouve ça normal, parce que …', 'Chez nous, c’est pareil.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les quantités', tabelle: { kopf: ['expression', 'environ'], zeilen: [['**tous** les élèves · **tout le monde**', '100 %'], ['**presque tous** · **la grande majorité des**', '90 – 99 %'], ['**la majorité des** · **la plupart des**', 'plus de 50 %'], ['**la moitié des**', '50 %'], ['**une minorité de**', 'moins de 50 %'], ['**un tiers des** · **un quart des**', '33 % · 25 %'], ['**un petit groupe de**', 'environ 10 %'], ['**personne** (ne)', '0 %']] } }],
        [{ titel: 'Les pourcentages et les ordinaux', punkte: ['38 % = trente-huit **pour cent**', '**un élève sur cinq** = 20 %', '**premier** (1er) / **première** (1re) · **deuxième** (2e) · **troisième** (3e)', 'Le rap arrive **premier**, la pop **deuxième**.'] },
         { art: 'tipp', titel: 'Citer ses sources', text: '**Selon** l’enquête, … · **D’après** Mme Rantini, … · **D’après** les chercheurs, … · Source : journal de l’école, mai.' }],
        [{ art: 'achtung', titel: 'Accord du verbe', text: '**La plupart des** élèves écout**ent** (toujours pluriel). · **La majorité des** élèves écout**e** / écout**ent** (les deux sont possibles).' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec une expression de quantité.', stufe: 1, woerter: ['la moitié des', 'presque tous les', 'un quart des', 'une minorité d’'], saetze: ['50 % : [la moitié des] élèves font du sport.', '96 % : [presque tous les] élèves ont un portable.', '25 % : [un quart des] élèves vont à pied à l’école.', '8 % : [une minorité d’] élèves jouent du violon.'] },
      { art: 'luecken', auftrag: 'Complète avec premier, première, deuxième, troisième ou dernier.', stufe: 2, saetze: ['Le rap arrive [premier] : il a 38 %.', 'La pop est [deuxième] avec 27 %.', 'L’électro arrive [troisième].', 'Le rock et les autres styles sont [derniers] avec 10 %.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Résume les résultats de ton enquête (ou invente des résultats) pour le journal de l’école. Cite tes sources.', stufe: 3,
        anfaenge: ['Nous avons interrogé … personnes.', 'Presque tous / La plupart …', 'En premier, …, en deuxième, …', 'Un petit groupe …', 'Selon …, …', 'En conclusion, …'], zeilen: 11,
        beispiel: 'Nous avons interrogé trente élèves de l’école. La plupart font du sport après l’école. En premier, il y a le foot (40 %), en deuxième, la danse (20 %). Un petit groupe ne fait pas de sport. Selon eux, ils n’ont pas le temps. En conclusion, le sport est très important pour les jeunes de notre école.' },
    ],
    check: ['Je comprends un article avec des chiffres.', 'Je lis un graphique.', 'Je comprends un journal à la radio.', 'J’utilise les quantités, les pourcentages et les ordinaux.', 'Je cite mes sources avec selon et d’après.'],
  },
  // ================================================================ 7
  {
    thema: 'Un reportage santé · cause, conséquence, but · avantages et inconvénients', titel: 'Attention à tes oreilles !', untertitel: 'Un reportage et des lettres de lecteurs, une visite à l’infirmerie : tu identifies un problème, ses causes et ses conséquences, et tu pèses le pour et le contre.',
    ziel: { fr: 'Je repère un problème, ses causes et ses conséquences. J’écris les avantages et les inconvénients.', de: 'Ich erkenne ein Problem, seine Ursachen und Folgen. Ich schreibe Vor- und Nachteile auf.' },
    bild: ['finn:besorgt:stehen', 'aerztin:froh:erklaeren'],
    start: {
      was: 'Le son et les oreilles',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['l’oreille', 'l’audition', 'le volume', 'le bruit', 'le bouchon d’oreille', 'l’enceinte'], rechts: ['das Ohr', 'das Gehör', 'die Lautstärke', 'der Lärm', 'der Ohrstöpsel', 'der Lautsprecher'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un reportage et deux lettres', art: 'dokumente',
      quelle: 'Magazine « Ados Santé » (reportage et lettres imaginaires, informations simplifiées)', titel: 'Casque sur les oreilles : attention !',
      dokumente: [
        { stil: 'karte', stimme: 'w1', text: [
          'Dans le bus, dans la rue, à la récré : beaucoup de jeunes ont toujours un casque sur les oreilles. C’est pratique… mais attention ! **Selon** l’Organisation mondiale de la santé (OMS), plus d’un milliard de jeunes de 12 à 35 ans dans le monde risquent d’abîmer leur audition **à cause du** bruit.',
          '**Le problème :** on écoute souvent la musique trop fort et trop longtemps. Dans un bus bruyant, on monte le son pour couvrir le bruit. À un concert, on est tout près des enceintes.',
          '**Les conséquences :** après un concert, on entend parfois des sifflements dans les oreilles. Ce sont des **acouphènes**. Souvent, ils disparaissent après quelques heures. Mais si on abîme ses oreilles trop souvent, on peut perdre une partie de son audition. Et ça, c’est **pour toujours**.',
          '**Les solutions :** les spécialistes conseillent la **règle des 60/60** : maximum 60 % du volume, et une pause après 60 minutes. À un concert, **il faut** mettre des bouchons d’oreilles. **Grâce à** un casque qui réduit le bruit extérieur, on n’a pas besoin de monter le son.'] },
        { stil: 'nachricht', stimme: 'w3', kopf: 'Courrier des lecteurs · Léa, 14 ans', text: ['Merci pour cet article ! Après un concert, j’ai eu des sifflements dans les oreilles pendant toute une nuit. J’ai eu tellement peur ! Maintenant, je mets toujours des bouchons. Ils existent même en couleur !'] },
        { stil: 'nachricht', stimme: 'm3', kopf: 'Courrier des lecteurs · Tom, 15 ans', text: ['Je ne suis pas tout à fait d’accord. Dans le bus, il y a tellement de bruit que je dois monter le son ! Par contre, la pause toutes les heures, c’est une bonne idée. Je vais essayer.'] },
      ],
      woerter: [['abîmer', 'beschädigen'], ['bruyant(e)', 'laut'], ['monter le son', 'lauter machen'], ['couvrir', 'übertönen'], ['le sifflement', 'das Pfeifen'], ['les acouphènes', 'der Tinnitus'], ['disparaître', 'verschwinden'], ['pour toujours', 'für immer'], ['réduire', 'verringern']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète avec le reportage.', stufe: 1, kopf: ['', ''], breiten: [26, 74], zeilen: [['le problème', '[on écoute trop fort et trop longtemps]'], ['les causes', '[bus bruyant → on monte le son ; être près des enceintes au concert]'], ['les conséquences', '[sifflements (acouphènes) ; perte d’audition pour toujours]'], ['les solutions', '[règle des 60/60 ; bouchons d’oreilles ; casque qui réduit le bruit]']] },
        { art: 'wer', auftrag: 'Léa ou Tom ? Coche.', stufe: 2, personen: ['Léa', 'Tom'], saetze: [['J’ai eu très peur après un concert.', 'Léa'], ['Je ne suis pas tout à fait d’accord.', 'Tom'], ['Je mets toujours des bouchons.', 'Léa'], ['Je vais essayer la pause.', 'Tom']] },
      ],
    },
    hoeren: {
      was: 'À l’infirmerie', wo: 'L’infirmerie de l’école · lundi matin', titel: 'Un quoi ?',
      situation: 'Depuis ce matin, Finn entend un sifflement dans l’oreille. Il va voir l’infirmière de l’école.',
      bild: ['aerztin:froh:erklaeren', 'finn:besorgt:stehen'], sprecher: { Infirmière: 'w1', Finn: 'm3' },
      text: [
        ['Infirmière', 'Bonjour, Finn. Qu’est-ce qui t’arrive ?'],
        ['Finn', 'Depuis ce matin, j’entends un sifflement dans l’oreille droite.'],
        ['Infirmière', 'Hier, tu as écouté de la musique très fort ?'],
        ['Finn', 'Euh… oui. J’étais à un concert, tout près des enceintes. Et après, dans le bus, j’ai mis mon casque à fond.'],
        ['Infirmière', 'D’accord. Ce sifflement est probablement dû au bruit. On appelle ça un acouphène.'],
        ['Finn', 'Un quoi ? Vous pouvez expliquer plus clairement ?'],
        ['Infirmière', 'Un acouphène, c’est un bruit que tu entends dans l’oreille, alors qu’il n’y a pas de bruit autour de toi. Souvent, ça passe après quelques heures. Mais si ça ne passe pas d’ici demain, tu dois aller chez le médecin.'],
        ['Finn', 'C’est grave ?'],
        ['Infirmière', 'Pas forcément. Mais c’est un signal : tes oreilles sont fatiguées. Pendant quelques jours, il faut éviter le bruit. Et au prochain concert, mets des bouchons d’oreilles. J’en ai ici, je t’en donne une paire.'],
        ['Finn', 'Merci ! Je ne savais pas que c’était si important.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Tu as un problème de santé à l’école. Tu vas … Coche.', stufe: 1, fragen: [{ f: '', o: ['à l’infirmerie', 'à la cantine', 'au gymnase'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', ''], breiten: [26, 74], zeilen: [['le problème de Finn', '[un sifflement dans l’oreille droite]'], ['la cause', '[le concert près des enceintes ; le casque à fond dans le bus]'], ['les conseils', '[éviter le bruit ; mettre des bouchons ; aller chez le médecin si ça ne passe pas]']] },
        { art: 'mc', auftrag: 'Un acouphène, c’est … Coche.', stufe: 2, fragen: [{ f: '', o: ['un bruit qu’on entend dans l’oreille, alors qu’il n’y a pas de bruit autour', 'un médicament pour les oreilles', 'un casque très fort'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Débat : « Il faut interdire les casques dans la cour de l’école. » Donnez des arguments pour et contre.', stufe: 3, karten: [
        { titel: 'Pour', text: ['à cause du bruit, …', 'il faut protéger …', 'on doit parler ensemble à la récré'] },
        { titel: 'Contre', text: ['grâce à la musique, je me détends', 'on peut écouter moins fort', 'chacun est responsable'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'La cause', punkte: ['**parce que** + phrase : … **parce qu’**il y a du bruit.', '**à cause de** + nom (–) : **à cause du** bruit', '**grâce à** + nom (+) : **grâce au** casque', '**dû / due à** + nom : Le sifflement est **dû au** bruit.'] },
         { titel: 'Le but et la conséquence', punkte: ['but : **pour** + infinitif · **pour** + nom', 'On fait une pause **pour** reposer ses oreilles.', 'conséquence : **donc** · **alors** · **c’est pourquoi**', 'Il y a du bruit, **donc** je monte le son.'] }],
        [{ art: 'tipp', titel: 'Avantages et inconvénients', text: '**L’avantage, c’est que** … · **L’inconvénient, c’est que** … · **D’un côté** …, **de l’autre côté** … · **Pourtant**, … · **En conclusion**, …' },
         { art: 'achtung', titel: 'à + le = au · de + le = du', text: 'grâce **au** casque · dû **au** bruit · à cause **du** bruit · à cause **des** concerts' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec parce que, à cause du / de la, grâce au / à la / aux ou dû au.', stufe: 2, saetze: ['Je n’entends rien [à cause du] bruit.', '[Grâce aux] bouchons, je protège mes oreilles.', 'Le sifflement est [dû au] concert d’hier.', 'Je fais une pause [parce que] mes oreilles sont fatiguées.', '[Grâce à la] règle des 60/60, j’écoute moins fort.'] },
      { art: 'abschreiben', auftrag: 'Écris un conseil avec il faut ou on doit.', stufe: 1, kopf: ['situation', 'conseil'], saetze: [['Je vais à un concert.', 'Il faut mettre des bouchons d’oreilles.'], ['J’écoute de la musique depuis une heure.', 'On doit faire une pause.'], ['J’ai un sifflement depuis deux jours.', 'Il faut aller chez le médecin.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écouter de la musique avec un casque : quels sont les avantages et les inconvénients ? Donne ton opinion.', stufe: 3,
        anfaenge: ['L’avantage, c’est que …', 'Grâce au casque, …', 'L’inconvénient, c’est que …', 'À cause de …', 'En conclusion, à mon avis, il faut …'], zeilen: 11,
        beispiel: 'L’avantage, c’est que je peux écouter ma musique partout sans déranger les autres. Grâce au casque, le trajet en bus passe plus vite. L’inconvénient, c’est que j’écoute souvent trop fort. À cause du bruit dans le bus, je monte le son. En conclusion, à mon avis, il faut écouter moins fort et faire des pauses.' },
    ],
    check: ['Je repère un problème, ses causes et ses conséquences.', 'Je comprends des lettres de lecteurs.', 'Je comprends une conversation à l’infirmerie.', 'J’utilise à cause de, grâce à, dû à, pour.', 'J’écris les avantages et les inconvénients.'],
  },
  // ================================================================ 8
  {
    thema: 'Les annonces · l’exposé · le rapport', titel: 'La fête des cultures', untertitel: 'Un programme et des petites annonces, l’exposé de la 7P2 : tu repères les informations importantes, tu présentes tes résultats et tu écris un rapport.',
    ziel: { fr: 'Je fais un petit exposé préparé et j’écris un bref rapport sur un événement.', de: 'Ich halte ein kurzes, vorbereitetes Referat und schreibe einen kurzen Bericht über ein Ereignis.' },
    bild: ['amira:froh:erklaeren', 'ben:froh:stehen-zeigen'],
    start: {
      was: 'Les abréviations',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['sam.', 'mer.', 'lun.', 'env.', 'Rdv', 'répét.'], rechts: ['samedi', 'mercredi', 'lundi', 'environ', 'rendez-vous', 'répétition'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un programme et des petites annonces', art: 'dokumente',
      quelle: 'Journal de l’école · numéro de juin (personnes et annonces imaginaires)', titel: 'Fête des cultures et petites annonces',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Fête des cultures** · sam. 5 juin · de 14 h à 22 h · cour de l’école · entrée libre', text: ['**14 h :** ouverture – stands de cuisine du monde (Portugal, Cap-Vert, Italie, Syrie, Luxembourg…)', '**15 h 30 :** la 7P2 présente son enquête « Les jeunes et la musique »', '**17 h :** concours de slam (inscription sur place)', '**20 h :** concert de Nour'] },
        { stil: 'nachricht', stimme: 'm1', kopf: 'Petite annonce', text: ['**Groupe de rock cherche batteur ou batteuse** (13–16 ans). Répét. le mer. après-midi à la Maison des jeunes. Contact : rockados@exemple.lu'] },
        { stil: 'nachricht', stimme: 'w2', kopf: 'Petite annonce', text: ['**Vends guitare acoustique**, très bon état, avec housse. 60 € (prix neuf : 150 €). Contact : secrétariat, salle 4.'] },
        { stil: 'nachricht', stimme: 'w3', kopf: 'Petite annonce', text: ['**Atelier slam gratuit** avec Kenza. Tous les sam. de 10 h à 12 h, à la bibliothèque. Débutants bienvenus ! Env. 12 places.'] },
        { stil: 'nachricht', stimme: 'w1', kopf: 'Petite annonce', text: ['**La chorale des jeunes cherche des voix !** Pas besoin de savoir lire la musique. Rdv le lun. à 17 h, salle de musique.'] },
      ],
      woerter: [['l’entrée libre', 'freier Eintritt'], ['le stand', 'der Stand'], ['l’inscription', 'die Anmeldung'], ['sur place', 'vor Ort'], ['la petite annonce', 'die Kleinanzeige'], ['la housse', 'die Hülle'], ['bienvenu(e)', 'willkommen'], ['la chorale', 'der Chor']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Quelle annonce pour qui ? Relie.', stufe: 1, links: ['Ben joue de la batterie.', 'Yusuf cherche une guitare pas chère.', 'Malik veut écrire des poèmes.', 'Mia adore chanter.'], rechts: ['le groupe de rock', 'la guitare à vendre', 'l’atelier slam', 'la chorale'], ordnung: [2, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Réponds.', stufe: 2, fragen: [{ f: 'À quelle heure la 7P2 présente-t-elle son enquête ?', l: 'À 15 h 30.' }, { f: 'Combien coûte la guitare ? Est-ce une bonne affaire ?', l: '60 € ; oui, le prix neuf est 150 €.' }] },
      ],
    },
    hoeren: {
      was: 'Un exposé', wo: 'Fête des cultures · 15 h 30', titel: 'Merci de votre attention !',
      situation: 'Amira et Ben présentent les résultats de l’enquête de la 7P2. À la fin, Mme Nouvelle pose une question.',
      bild: ['amira:froh:erklaeren', 'ben:froh:stehen-zeigen'], sprecher: { Amira: 'w2', Ben: 'm3', 'Mme Nouvelle': 'w1' },
      text: [
        ['Amira', 'Bonjour à tous ! Nous allons vous présenter les résultats de notre enquête : « Les jeunes et la musique ».'],
        ['Ben', 'Notre exposé a trois parties. D’abord, nos questions. Ensuite, les résultats. Enfin, notre conclusion.'],
        ['Amira', 'Nous avons interrogé cent vingt élèves de l’école. Nous avons posé cinq questions, par exemple : « Combien de temps écoutes-tu de la musique par jour ? »'],
        ['Ben', 'Voici les résultats. Presque tous les élèves écoutent de la musique tous les jours. Le rap arrive premier, avec 38 %. La pop est deuxième.'],
        ['Amira', 'Ce qui nous a surpris : beaucoup d’élèves écoutent plus de deux heures par jour, souvent trop fort. C’est pourquoi nous avons aussi parlé de la santé des oreilles.'],
        ['Ben', 'En conclusion : la musique est très importante pour les jeunes. Mais il faut protéger ses oreilles ! Merci de votre attention. Vous avez des questions ?'],
        ['Mme Nouvelle', 'Bravo ! Vous pouvez expliquer plus précisément comment vous avez choisi les élèves ?'],
        ['Amira', 'Bien sûr. Nous avons interrogé quinze élèves dans chaque classe, au hasard, pendant la récré.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un bon exposé a … Coche.', stufe: 1, fragen: [{ f: '', o: ['une introduction, un développement et une conclusion', 'seulement des chiffres'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Écoute. Mets les parties de l’exposé dans l’ordre.', stufe: 1, teile: ['On annonce le sujet.', 'On présente le plan en trois parties.', 'On explique les questions.', 'On donne les résultats.', 'On conclut et on remercie le public.', 'On répond aux questions.'], ordnung: [3, 0, 5, 2, 4, 1] },
        { art: 'fragen', auftrag: 'Réponds.', stufe: 2, fragen: [{ f: 'Qu’est-ce qui a surpris Amira et Ben ?', l: 'Beaucoup d’élèves écoutent plus de deux heures par jour, souvent trop fort.' }, { f: 'Comment ont-ils choisi les élèves ?', l: 'Quinze élèves par classe, au hasard, pendant la récré.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Fais un exposé de deux minutes : les résultats de ton enquête, ou un sujet que tu connais bien (un pays, un groupe, un sport…). Prépare-le avec un plan.', stufe: 3, karten: [
        { titel: 'Introduction', text: ['Je vais vous présenter …', 'Mon exposé a trois parties.'] },
        { titel: 'Développement', text: ['D’abord, …', 'Ensuite, …', 'Enfin, …', 'Selon …, …'] },
        { titel: 'Conclusion', text: ['En conclusion, …', 'Merci de votre attention.', 'Vous avez des questions ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Faire un exposé', punkte: ['**Introduction** : Je vais vous présenter … · Mon exposé a trois parties.', '**Développement** : D’abord, … Ensuite, … Enfin, …', '**Conclusion** : En conclusion, … · Merci de votre attention.', 'Parle **lentement**, regarde le **public**, montre une **image** ou un **graphique**.'] },
         { titel: 'Écrire un rapport', punkte: ['**Quand ? Où ? Qui ? Quoi ?** dans la première phrase', 'des **phrases courtes**, dans l’**ordre**', 'au **passé composé** (+ imparfait pour décrire)', '**d’abord**, **ensuite**, **à la fin** · ton **avis** à la fin'] }],
        [{ art: 'tipp', titel: 'Je corrige mon texte (fiche-guide)', text: '☐ Les **accords** : -s, -e, -es ? · ☐ Les **verbes** : bonne personne, bon temps ? · ☐ **Majuscules** et **points** ? · ☐ Un mot difficile ? → **dictionnaire** · ☐ Je **relis** mon texte à voix basse.' },
         { art: 'achtung', titel: 'Les abréviations', text: 'Dans les annonces, on écrit court : **sam.** = samedi · **env.** = environ · **Rdv** = rendez-vous. Mais dans un texte, on écrit les mots **en entier**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète le rapport avec le passé composé.', stufe: 2, saetze: ['Samedi, la fête des cultures (commencer) [a commencé] à 14 heures.', 'Nous (goûter) [avons goûté] des plats du monde entier.', 'À 15 h 30, Amira et Ben (présenter) [ont présenté] notre enquête.', 'Le soir, Nour (chanter) [a chanté] devant trois cents personnes.', 'Je (rentrer) [suis rentré(e)] à la maison très tard.'] },
      { art: 'abschreiben', auftrag: 'Corrige les fautes avec la fiche-guide.', stufe: 3, kopf: ['avec des fautes', 'corrigé'], saetze: [['les élève ont aimé la fête.', 'Les élèves ont aimé la fête.'], ['Nous avons chanter ensemble.', 'Nous avons chanté ensemble.'], ['La musique était très belles', 'La musique était très belle.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un bref rapport sur la fête des cultures (ou sur un événement que tu as vécu ou imaginé) pour le site de l’école. Corrige-le ensuite avec la fiche-guide.', stufe: 3,
        anfaenge: ['Samedi …, … a eu lieu …', 'D’abord, …', 'Ensuite, …', 'Le meilleur moment, c’était …', 'À la fin, …', 'À mon avis, …'], zeilen: 11,
        beispiel: 'Samedi 5 juin, la fête des cultures a eu lieu dans la cour de l’école. D’abord, nous avons goûté des plats du Portugal et de Syrie. Ensuite, Amira et Ben ont présenté notre enquête. Le meilleur moment, c’était le concours de slam : Malik a gagné ! À la fin, Nour a chanté et tout le monde a allumé son portable. À mon avis, c’était une journée magnifique.' },
      { art: 'schreiben', auftrag: 'Mon journal de bord : fais le point sur ce module… et sur ton année de français !', stufe: 1, zeilen: 9, zeilenAnfaenge: ['Ce que j’ai appris :', '', '', 'Ce qui est encore difficile :', '', '', 'Mon prochain objectif :', '', ''] },
    ],
    check: ['Je repère les informations importantes dans des annonces.', 'Je comprends un exposé.', 'Je fais un petit exposé préparé.', 'J’écris un bref rapport sur un événement.', 'Je corrige mon texte avec une fiche-guide.'],
  },
]
