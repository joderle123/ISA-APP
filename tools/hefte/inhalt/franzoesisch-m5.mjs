// Français · Module 5 « Hier et aujourd’hui » (Régime / Voie de préparation, A2.1 – A2.2) – cahier multimodal.
// D’après le « Référentiel de compétences – français, régime préparatoire » (MENFP), Module 5 « Se situer dans le
// temps et dans son époque » : évolution d’une mode, vocabulaire historique simple (une civilisation passée), sa propre
// évolution (avant / maintenant), publicité, formes, matières et couleurs d’un objet, interdictions ; imparfait
// (comprendre), impératif des slogans et infinitif, passé composé, COD / COI (première approche), connecteurs
// (et aussi, en plus, par contre), quand, pourquoi / parce que, comparaison d’époques, compléments de temps,
// le même / la même / les mêmes. Personnes, produits, marques et légende : imaginaires. Faits historiques simplifiés.

export const MODUL = {
  id: 'franzoesisch-m5', kuerzel: 'fr5', nr: 5, sprache: 'fr', niveau: 'A2.1 – A2.2', klasse: 'Voie de préparation',
  dateiname: 'Francais_Module-5',
  fach: { de: 'Französisch', fr: 'Français' },
  titel: { de: 'Gestern und heute', fr: 'Hier et aujourd’hui' },
  untertitel: { fr: 'Comparer avant et maintenant, découvrir l’histoire d’une mode et les Romains, analyser des publicités, décrire des objets, comprendre des règles, raconter une légende et inviter – en huit leçons.', de: 'Früher und heute vergleichen, die Geschichte einer Mode und die Römer entdecken, Werbung untersuchen, Gegenstände beschreiben, Regeln verstehen, eine Sage erzählen und einladen – in acht Lektionen.' },
  farben: { tief: '#8c5d0b', mittel: '#e9c77f', zart: '#fbf4e4', dunkel: '#5a3b05' },
  deckbild: ['oma:froh:erklaeren', 'noah:froh:stehen', 'chloe:froh:tanzen'],
  blasen: [{ t: 'Avant…', x: 18, y: 110 }, { t: 'C’est interdit !', x: 116, y: 100 }, { t: 'Il était une fois…', x: 150, y: 150 }],
  themen: [
    { titel: { fr: 'Avant et maintenant', de: 'Früher und heute' }, icon: 'history', lektionen: 3 },
    { titel: { fr: 'Pubs, objets et règles', de: 'Werbung, Dinge und Regeln' }, icon: 'alert-triangle', lektionen: 3 },
    { titel: { fr: 'Raconter et inviter', de: 'Erzählen und einladen' }, icon: 'book', lektionen: 2 },
  ],
  anleitung: [
    'Chaque leçon a cinq parties : **Lire**, **Écouter**, **La règle**, **S’entraîner** et **Écrire**. À la fin, il y a un **mini-bilan**.',
    'À côté de chaque texte, il y a un **code QR**. Scanne-le avec ton portable : tu entends le texte. Écoute plusieurs fois pour trouver les informations importantes.',
    'Les points montrent le niveau : ●○○ base · ●●○ moyen · ●●● plus. Commence par la base.',
    'Les personnes, les marques et la légende de ce cahier sont **imaginaires**. Les informations sur l’histoire sont **simplifiées**. Tu peux toujours inventer.',
  ],
  // seulement pour la voix (Regex Python)
  aussprache: {
    '\\bMme\\b': 'Madame', '\\bM\\. ': 'Monsieur ', '(\\d{1,2}) h (\\d\\d)': '\\1 heures \\2', '(\\d{1,2}) h\\b': '\\1 heures', '\\b1er\\b': 'premier',
    '\\b1,(\\d\\d) ?€': 'un euro \\1', '(\\d+),(\\d\\d) ?€': '\\1 euros \\2', '(\\d+) ?€': '\\1 euros', '(\\d+) ?%': '\\1 pour cent', '\\b19e\\b': 'dix-neuvième', '(\\d+) ?km\\b': '\\1 kilomètres',
  },
}

// ---------------------------------------------------------------- frise chronologique
const frise = (eintraege) => `<div style="position:relative;display:grid;grid-template-columns:repeat(${eintraege.length},1fr);gap:3mm;padding-top:1mm"><div style="position:absolute;left:0;right:0;top:9.2mm;height:1.4mm;background:var(--f-mittel);border-radius:1mm"></div>${eintraege
  .map(([j, t]) => `<div style="position:relative;text-align:center"><div style="font-family:Lexend;font-weight:800;font-size:10.5pt;color:var(--f-tief);height:6mm;line-height:6mm">${j}</div><div style="width:4.5mm;height:4.5mm;border-radius:50%;background:var(--f);margin:0.6mm auto 2.5mm;position:relative;z-index:1"></div><div class="uhr-linie" style="height:24mm;border:0.35mm dashed var(--f-mittel);border-radius:2mm;margin:0"><span class="l" style="position:absolute;left:1.5mm;right:1.5mm;top:1.5mm;bottom:auto;font-size:11pt;line-height:1.15">${t}</span></div></div>`)
  .join('')}</div>`
const zeichenfeld = (text, hoehe = 70) => `<div style="font-size:12.6pt;line-height:1.5;margin-bottom:2.5mm">${text}</div><div style="border:0.6mm dashed var(--f);border-radius:3mm;height:${hoehe}mm"></div>`

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Avant et maintenant · l’imparfait', titel: 'Avant et maintenant', untertitel: 'École primaire ou lycée ? Tu lis un souvenir, tu écoutes une grand-mère parler de son école et tu compares hier et aujourd’hui.',
    ziel: { fr: 'Je comprends quand on parle du passé et je compare avant et maintenant.', de: 'Ich verstehe, wenn jemand von früher erzählt, und vergleiche früher und heute.' },
    bild: ['sami:froh:erklaeren', 'oma:froh:stehen'],
    start: {
      was: 'Avant ou maintenant ?',
      aufgaben: [
        { art: 'rf', auftrag: 'Avant ou maintenant ? Coche.', stufe: 1, spalten: ['avant', 'maintenant'], saetze: [['J’étais petit.', true], ['Je suis grand.', false], ['J’avais une institutrice.', true], ['J’ai beaucoup de professeurs.', false], ['Je jouais beaucoup.', true], ['J’ai plus de devoirs.', false]] },
      ],
    },
    lesen: {
      was: 'Un souvenir', art: 'text', stimme: 'm3', nummern: true,
      quelle: 'Journal de l’école · rubrique « Souvenirs » (personne imaginaire)', titel: 'L’école primaire et le lycée',
      absaetze: [
        'Je m’appelle Rui. **Avant**, j’**allais** à l’école primaire de mon village. L’école **était** petite : il y **avait** seulement quarante élèves.',
        'J’**avais** une seule institutrice, Madame Weber. Elle **était** très gentille. Nous **chantions** souvent et nous **faisions** beaucoup de bricolage.',
        '**Maintenant**, je **vais** au lycée en bus. Le lycée **est** grand : il y **a** six cents élèves ! J’**ai** plusieurs professeurs et une salle différente pour chaque matière.',
        'Avant, j’**étais plus** libre et j’**avais moins** de devoirs. **Par contre**, maintenant, j’ai **plus** d’amis et je **fais** du sport tous les jours.',
        'Ce qui me manque ? La longue récréation et le gâteau de Madame Weber à la fin de l’année !',
      ],
      woerter: [['l’école primaire', 'die Grundschule'], ['l’institutrice', 'die Grundschullehrerin'], ['avant', 'früher'], ['maintenant', 'jetzt'], ['le bricolage', 'das Basteln'], ['plusieurs', 'mehrere'], ['libre', 'frei'], ['par contre', 'dagegen']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Avant ou maintenant ? Complète.', stufe: 1, kopf: ['', 'avant (l’école primaire)', 'maintenant (le lycée)'], breiten: [22, 39, 39], zeilen: [['l’école', '[petite, 40 élèves]', '[grande, 600 élèves]'], ['les professeurs', '[une institutrice, Madame Weber]', '[plusieurs professeurs]'], ['les devoirs', '[moins de devoirs]', '[plus de devoirs]'], ['autre', '[chanter, bricolage]', '[bus, sport tous les jours, plus d’amis]']] },
        { art: 'mc', auftrag: 'Coche.', stufe: 2, fragen: [{ f: '« J’allais à l’école primaire. » C’est …', o: ['le présent', 'le passé (imparfait)'], r: 1 }, { f: 'Qu’est-ce qui manque à Rui ?', o: ['la longue récréation et le gâteau', 'le bus'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Un souvenir', wo: 'Chez Noah · le dimanche', titel: 'Mamie, ton école, c’était comment ?',
      situation: 'Noah prépare un exposé sur l’école d’autrefois. Il pose des questions à sa grand-mère, Mme Pereira.',
      bild: ['noah:froh:handy', 'oma:froh:erklaeren'], sprecher: { Noah: 'm3', 'Mme Pereira': 'w2' },
      text: [
        ['Noah', 'Mamie, tu allais à l’école où, quand tu étais petite ?'],
        ['Mme Pereira', 'J’allais à l’école de mon village, au Portugal. C’était dans les années soixante.'],
        ['Noah', 'Il y avait beaucoup d’élèves ?'],
        ['Mme Pereira', 'Oh non ! Nous étions vingt dans une seule classe, de six à dix ans. Il y avait un seul maître pour tout le monde.'],
        ['Noah', 'Et vous aviez des ordinateurs ?'],
        ['Mme Pereira', 'Des ordinateurs ? Non ! Nous écrivions avec un stylo à plume et de l’encre. Et en hiver, il y avait un grand poêle au milieu de la classe.'],
        ['Noah', 'Tu aimais l’école ?'],
        ['Mme Pereira', 'Oui, beaucoup ! Par contre, le maître était très sévère. Et je marchais trois kilomètres pour aller à l’école, matin et soir.'],
        ['Noah', 'Trois kilomètres à pied ? Moi, je prends le bus !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Dans les années soixante, à l’école, il y avait … Coche.', stufe: 1, fragen: [{ f: '', o: ['des ordinateurs', 'des cahiers et des stylos', 'des tableaux noirs'], r: [1, 2] }] }],
      beim: [
        { art: 'rf', auftrag: 'Écoute. Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['Mme Pereira allait à l’école au Portugal.', true], ['Il y avait deux cents élèves.', false], ['Ils écrivaient avec un stylo à plume.', true], ['Le maître était très gentil.', false], ['Elle allait à l’école en bus.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Interviewe un adulte de l’école sur son école d’autrefois – ou invente l’interview.', stufe: 3, karten: [
        { titel: 'Questions', text: ['Vous alliez à l’école où ?', 'Il y avait combien d’élèves ?', 'C’était comment ?', 'Qu’est-ce que vous faisiez à la récré ?'] },
        { titel: 'Réagir', text: ['Ah bon ?', 'C’est différent d’aujourd’hui !', 'Moi, maintenant, je …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'L’imparfait : décrire le passé', punkte: ['Pour décrire : L’école **était** petite.', 'Pour les habitudes : Nous **chantions** souvent.', 'Formation : nous **all**ons → j’**all**ais', 'Terminaisons : **-ais, -ais, -ait, -ions, -iez, -aient**'] },
         { titel: 'être et avoir à l’imparfait', tabelle: { kopf: ['', 'être', 'avoir'], zeilen: [['je / j’', '**étais**', '**avais**'], ['tu', '**étais**', '**avais**'], ['il / elle', '**était**', '**avait**'], ['nous', '**étions**', '**avions**'], ['vous', '**étiez**', '**aviez**'], ['ils / elles', '**étaient**', '**avaient**']] } }],
        [{ art: 'tipp', titel: 'Avant · maintenant', text: '**Avant**, j’avais **moins** de devoirs. **Maintenant**, j’ai **plus** d’amis. · **À cette époque**, … · **Aujourd’hui**, …' },
         { art: 'achtung', titel: 'par contre', text: 'J’étais plus libre. **Par contre**, j’avais moins d’amis. (= aber, dagegen)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec était, avait, étaient ou avaient.', stufe: 1, saetze: ['L’école [était] petite.', 'Il y [avait] quarante élèves.', 'Les élèves [avaient] moins de devoirs.', 'Les maîtres [étaient] sévères.'] },
      { art: 'rf', auftrag: 'Imparfait ou présent ? Coche.', stufe: 2, spalten: ['imparfait', 'présent'], saetze: [['Nous chantions souvent.', true], ['Je vais au lycée.', false], ['Elle marchait trois kilomètres.', true], ['J’ai plusieurs professeurs.', false], ['Ils écrivaient avec de l’encre.', true]] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Compare avant et maintenant : ta vie ou la vie d’une personne imaginaire.', stufe: 2,
        anfaenge: ['Avant, j’étais …', 'Avant, j’avais …', 'Maintenant, je suis …', 'Maintenant, j’ai …', 'Par contre, …'], zeilen: 9,
        beispiel: 'Avant, j’étais petit et j’avais peur du noir. Avant, j’avais un vélo bleu avec des petites roues. Maintenant, je suis au lycée. Maintenant, j’ai un skateboard et beaucoup d’amis. Par contre, j’ai plus de devoirs !' },
    ],
    check: ['Je comprends un souvenir écrit.', 'Je reconnais l’imparfait.', 'Je comprends une personne qui parle de son passé.', 'Je compare avant et maintenant.', 'J’utilise par contre.'],
  },
  // ================================================================ 2
  {
    thema: 'L’évolution d’une mode · les époques', titel: 'L’histoire du jean', untertitel: 'Des années 1870 à aujourd’hui : tu lis l’histoire d’un vêtement, tu complètes une frise et tu reconnais des époques.',
    ziel: { fr: 'Je comprends l’évolution d’une mode et je place des informations dans le temps.', de: 'Ich verstehe, wie sich eine Mode verändert hat, und ordne Informationen zeitlich ein.' },
    bild: ['jana:froh:stehen', 'finn:froh:laessig'],
    start: {
      was: 'Les époques',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Les époques : relie.', stufe: 1, links: ['le 19e siècle', 'les années 1950', 'les années 1970', 'les années 1990', 'aujourd’hui'], rechts: ['das 19. Jahrhundert', 'die 1950er-Jahre', 'die 1970er-Jahre', 'die 1990er-Jahre', 'heute'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Un article', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Magazine des jeunes · rubrique « Mode » (texte simplifié)', titel: 'Le jean : 150 ans de style',
      absaetze: [
        'Le jean **est né** aux États-Unis vers 1870. **À cette époque**, c’**était** un pantalon de travail pour les ouvriers et les chercheurs d’or. Il **était** très solide, en toile bleue.',
        'Dans les années 1950, des acteurs de cinéma **portaient** des jeans dans les films. Les jeunes les **adoraient** : le jean **devenait** le symbole de la jeunesse.',
        'Dans les années 1970, les jeans **étaient** très larges en bas. On les **appelait** les « pattes d’éléphant ». Les filles et les garçons **portaient les mêmes** jeans.',
        'Dans les années 1990, les jeunes **portaient** des jeans très larges et des baskets énormes. Dans les années 2000, la mode **était** au jean très serré.',
        'Aujourd’hui, il y a toutes les formes : droit, large, serré, troué… **Par contre**, la fabrication d’un jean utilise beaucoup d’eau. Alors, pense à la seconde main !',
      ],
      woerter: [['le siècle', 'das Jahrhundert'], ['l’ouvrier', 'der Arbeiter'], ['le chercheur d’or', 'der Goldsucher'], ['solide', 'robust'], ['la toile', 'der Stoff'], ['large, serré', 'weit, eng'], ['la fabrication', 'die Herstellung'], ['la seconde main', 'gebraucht, Second-Hand']],
      aufgaben: [
        { art: 'frei', auftrag: 'Complète la frise chronologique.', stufe: 1, html: frise([['vers 1870', 'pantalon de travail pour les ouvriers'], ['années 1950', 'les acteurs et les jeunes le portent'], ['années 1970', 'très large en bas : « pattes d’éléphant »'], ['années 1990', 'très large, avec de grosses baskets'], ['aujourd’hui', 'toutes les formes, seconde main']]) },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Le jean est né en France.', false], ['Au début, c’était un pantalon de travail.', true], ['Dans les années 1970, les filles et les garçons portaient les mêmes jeans.', true], ['La fabrication d’un jean utilise peu d’eau.', false]] },
      ],
    },
    hoeren: {
      was: 'Un jeu à la radio', wo: 'Radio des jeunes · jeu « Quelle époque ? »', titel: 'C’était quelle époque ?',
      situation: 'À la radio des jeunes, Chloé présente un jeu : trois invités décrivent la mode de leur jeunesse. Il faut deviner l’époque.',
      bild: ['chloe:froh:handy', 'opa:froh:erklaeren'], sprecher: { Chloé: 'w2', Marc: 'm2', Sylvie: 'w1', Kevin: 'm1' },
      text: [
        ['Chloé', 'Bienvenue au jeu « Quelle époque ? » ! Premier invité : Marc. À vous !'],
        ['Marc', 'Quand j’étais jeune, les garçons avaient les cheveux longs. On portait des pantalons pattes d’éléphant et des chemises à fleurs. On écoutait de la musique sur des disques.'],
        ['Chloé', 'Merci ! Deuxième invitée : Sylvie.'],
        ['Sylvie', 'Moi, je portais des vestes avec de grandes épaules et des couleurs fluo : rose, jaune, vert. On écoutait des cassettes sur un baladeur.'],
        ['Chloé', 'Et pour finir : Kevin.'],
        ['Kevin', 'Quand j’avais quinze ans, tout le monde avait un téléphone à clapet. On portait des jeans très serrés et des casquettes. Et on envoyait des textos sans images !'],
        ['Chloé', 'Alors, chers auditeurs : quelles époques ? Les années 1970, 1980 ou 2000 ?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Une cassette, un disque, un baladeur : c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['pour écouter de la musique', 'pour faire du sport'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'mode', 'objets', 'époque'], breiten: [14, 38, 26, 22], zeilen: [['Marc', '[pattes d’éléphant, chemises à fleurs, cheveux longs]', '[des disques]', '[les années 1970]'], ['Sylvie', '[grandes épaules, couleurs fluo]', '[cassettes, baladeur]', '[les années 1980]'], ['Kevin', '[jeans serrés, casquettes]', '[téléphone à clapet, textos]', '[les années 2000]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Tu es à la radio en 2070. Décris la mode d’aujourd’hui : « Quand j’étais jeune, … »', stufe: 3, karten: [
        { titel: 'Décrire', text: ['Quand j’étais jeune, on portait …', 'On écoutait de la musique sur …', 'Tout le monde avait …'] },
        { titel: 'Deviner', text: ['C’était dans les années … ?', 'C’était au … siècle ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Parler des époques', punkte: ['**au** 19e siècle (dix-neuvième)', '**dans les années** 1970 (soixante-dix)', '**à cette époque**, … · **alors**, …', '**il y a** 50 ans = vor 50 Jahren', '**aujourd’hui** · **de nos jours**'] },
         { titel: 'L’imparfait (il, elle, ils, elles)', punkte: ['il / elle / on **port-ait** · **ét-ait** · **av-ait**', 'ils / elles **port-aient** · **ét-aient** · **av-aient**', 'On les **appelait** « pattes d’éléphant ».', 'Les jeunes **adoraient** le jean.'] }],
        [{ art: 'tipp', titel: 'le même, la même, les mêmes', text: 'Ils portaient **les mêmes** jeans. · Nous avons **le même** sac. · Elle a **la même** casquette que moi.' },
         { art: 'achtung', titel: 'Lire les années', text: '1970 = mille neuf cent soixante-dix · 2000 = deux mille · 2026 = deux mille vingt-six' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec le même, la même ou les mêmes.', stufe: 1, saetze: ['Mia et Chloé ont [la même] veste.', 'Ben et Tom portent [les mêmes] baskets.', 'Nous avons [le même] professeur.', 'Ils écoutent [les mêmes] chansons.'] },
      { art: 'luecken', auftrag: 'Mets le verbe à l’imparfait.', stufe: 2, saetze: ['(porter) Dans les années 1970, on [portait] des pantalons larges.', '(être) Le jean [était] un pantalon de travail.', '(écouter) Les jeunes [écoutaient] des cassettes.', '(avoir) Tout le monde [avait] un téléphone à clapet.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un petit article : la mode d’aujourd’hui et la mode d’une autre époque.', stufe: 2,
        anfaenge: ['Dans les années …, on portait …', 'À cette époque, les jeunes …', 'Aujourd’hui, on porte …', 'Par contre, …', 'Moi, je préfère …'], zeilen: 9,
        beispiel: 'Dans les années 1980, on portait des vestes avec de grandes épaules. À cette époque, les jeunes adoraient les couleurs fluo. Aujourd’hui, on porte des sweats larges et des baskets blanches. Par contre, les couleurs fluo reviennent ! Moi, je préfère le style d’aujourd’hui.' },
    ],
    check: ['Je comprends l’histoire d’une mode.', 'Je place des informations sur une frise.', 'Je reconnais une époque à l’oral.', 'J’utilise le même, la même, les mêmes.', 'Je compare une mode d’hier et d’aujourd’hui.'],
  },
  // ================================================================ 3
  {
    thema: 'Une civilisation passée · imparfait et passé composé', titel: 'Il y a 2000 ans', untertitel: 'Un théâtre, une villa, une mosaïque : tu découvres la vie des Romains dans notre région et tu compares avec aujourd’hui.',
    ziel: { fr: 'Je comprends un texte simple sur une civilisation du passé.', de: 'Ich verstehe einen einfachen Text über eine frühere Kultur.' },
    bild: ['lehrer:froh:erklaeren', 'amira:ueberrascht:stehen'],
    start: {
      was: 'Les mots de l’histoire',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['les Romains', 'la villa', 'le théâtre', 'la mosaïque', 'la tablette de cire', 'le musée'], rechts: ['die Römer', 'das Landgut', 'das Theater', 'das Mosaik', 'die Wachstafel', 'das Museum'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un texte d’histoire', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Site « L’histoire pour les jeunes » (texte simplifié)', titel: 'Les Romains chez nous',
      absaetze: [
        'Il y a environ 2000 ans, les **Romains vivaient** aussi dans notre région. Ils **construisaient** des routes, des villages et de grandes maisons à la campagne : les villas.',
        'À **Dalheim**, il y **avait** un village romain avec un théâtre. Ce théâtre **avait** de la place pour environ 3500 personnes !',
        'À **Echternach**, on **a trouvé** les restes d’une très grande villa romaine. Une famille riche y **habitait** avec beaucoup de serviteurs.',
        'À **Vichten**, en 1995, un agriculteur **a découvert** une grande mosaïque dans son champ. Aujourd’hui, on peut la voir au musée national, à Luxembourg.',
        'Les enfants des familles riches **allaient** à l’école. Ils **écrivaient** sur des tablettes de cire avec un bâton pointu. Les autres enfants **travaillaient** souvent avec leurs parents.',
      ],
      woerter: [['il y a 2000 ans', 'vor 2000 Jahren'], ['vivre (ils vivaient)', 'leben'], ['construire', 'bauen'], ['la campagne', 'das Land'], ['les restes', 'die Überreste'], ['découvrir', 'entdecken'], ['le champ', 'das Feld'], ['la cire', 'das Wachs']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Qu’est-ce qu’il y avait ? Complète.', stufe: 1, kopf: ['lieu', 'qu’est-ce qu’il y avait ? qu’est-ce qu’on a trouvé ?'], breiten: [24, 76], zeilen: [['Dalheim', '[un village romain avec un théâtre pour 3500 personnes]'], ['Echternach', '[les restes d’une très grande villa romaine]'], ['Vichten', '[une grande mosaïque, découverte en 1995]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Les Romains vivaient dans notre région il y a 200 ans.', false], ['La mosaïque de Vichten est au musée.', true], ['Tous les enfants allaient à l’école.', false], ['Ils écrivaient sur des tablettes de cire.', true]] },
      ],
    },
    hoeren: {
      was: 'Au musée', wo: 'Musée · visite de classe', titel: 'La vie d’un enfant romain',
      situation: 'La classe visite le musée. Le guide, M. Simon, parle de la vie des enfants romains. Amira pose des questions.',
      bild: ['lehrer:froh:stehen-zeigen', 'amira:froh'], sprecher: { 'M. Simon': 'm2', Amira: 'w3' },
      text: [
        ['M. Simon', 'Regardez cette petite poupée en os. Elle a presque deux mille ans ! Les enfants romains jouaient aussi, comme vous.'],
        ['Amira', 'À quoi est-ce qu’ils jouaient ?'],
        ['M. Simon', 'Ils jouaient aux osselets, aux billes ou à la balle. Les filles avaient des poupées, et les garçons des petits chevaux en bois.'],
        ['Amira', 'Et ils allaient à l’école ?'],
        ['M. Simon', 'Seulement les enfants des familles riches. Les cours commençaient très tôt, au lever du soleil. Le maître était souvent sévère.'],
        ['Amira', 'Qu’est-ce qu’ils mangeaient ?'],
        ['M. Simon', 'Du pain, des légumes, des fruits, du fromage… Et les riches mangeaient couchés sur des lits !'],
        ['Amira', 'Couchés ? C’est drôle ! Moi, je préfère manger assise.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Dans un musée, il y a … Coche.', stufe: 1, fragen: [{ f: '', o: ['des objets anciens', 'un guide', 'une piscine'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'La poupée a presque …', o: ['200 ans', '2000 ans'], r: 1 }, { f: 'Les enfants jouaient …', o: ['aux osselets et aux billes', 'aux jeux vidéo'], r: 0 }, { f: 'Les cours commençaient …', o: ['très tôt', 'à midi'], r: 0 }, { f: 'Les riches mangeaient …', o: ['debout', 'couchés'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Compare la vie d’un enfant romain et la vie d’un jeune aujourd’hui.', stufe: 3, karten: [
        { titel: 'Avant', text: ['Les enfants romains jouaient …', 'Ils écrivaient …', 'Ils mangeaient …'] },
        { titel: 'Aujourd’hui', text: ['Nous jouons …', 'Nous écrivons …', 'Par contre, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'L’imparfait', tabelle: { kopf: ['', 'jouer', 'faire'], zeilen: [['je', 'jou**ais**', 'fais**ais**'], ['tu', 'jou**ais**', 'fais**ais**'], ['il / elle', 'jou**ait**', 'fais**ait**'], ['nous', 'jou**ions**', 'fais**ions**'], ['vous', 'jou**iez**', 'fais**iez**'], ['ils / elles', 'jou**aient**', 'fais**aient**']] } },
         { titel: 'Imparfait ou passé composé ?', punkte: ['**Imparfait** : décrire, les habitudes', 'Les Romains **vivaient** ici. Ils **jouaient** aux osselets.', '**Passé composé** : une action finie, à un moment précis', 'En 1995, un agriculteur **a découvert** une mosaïque.'] }],
        [{ art: 'tipp', titel: 'Le temps', text: '**il y a** 2000 ans · **à l’époque** romaine · **à cette époque-là** · **alors** · **aujourd’hui**' },
         { art: 'achtung', titel: 'y · la', text: 'Une famille riche **y** habitait. (y = dans la villa) · On peut **la** voir au musée. (la = la mosaïque)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Mets à l’imparfait.', stufe: 1, saetze: ['(jouer) Les enfants [jouaient] aux osselets.', '(habiter) Une famille riche [habitait] à Echternach.', '(écrire) Nous [écrivions] sur des tablettes.', '(manger) Tu [mangeais] couché ?'] },
      { art: 'rf', auftrag: 'Imparfait ou passé composé ? Coche.', stufe: 2, spalten: ['imparfait', 'passé composé'], saetze: [['Les Romains construisaient des routes.', true], ['Un agriculteur a découvert une mosaïque.', false], ['Le maître était sévère.', true], ['La classe a visité le musée.', false]] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Imagine : tu es un enfant romain il y a 2000 ans. Décris une journée.', stufe: 2,
        anfaenge: ['Je m’appelais …', 'J’habitais à …', 'Le matin, je …', 'Je jouais …', 'Le soir, nous mangions …'], zeilen: 10,
        beispiel: 'Je m’appelais Lucius. J’habitais dans une grande villa à Echternach. Le matin, j’allais à l’école très tôt. J’écrivais sur une tablette de cire. Je jouais aux osselets avec mon frère. Le soir, nous mangions du pain, du fromage et des fruits.' },
    ],
    check: ['Je comprends un texte sur une civilisation passée.', 'Je comprends un guide au musée.', 'Je reconnais l’imparfait et le passé composé.', 'Je compare le passé et aujourd’hui.', 'J’imagine une journée au passé.'],
  },
  // ================================================================ 4
  {
    thema: 'La publicité · l’impératif', titel: 'Essayez-moi !', untertitel: 'Produit, marque, slogan, public : tu analyses des publicités, tu écoutes des spots radio et tu inventes ta pub.',
    ziel: { fr: 'Je comprends une publicité et j’invente un slogan.', de: 'Ich verstehe eine Werbung und erfinde einen Slogan.' },
    bild: ['mia:froh:handy', 'yusuf:verwirrt:stehen'],
    start: {
      was: 'Les mots de la pub',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['le produit', 'la marque', 'le slogan', 'le public cible', 'le prix', 'l’offre spéciale'], rechts: ['das Produkt', 'die Marke', 'der Werbespruch', 'die Zielgruppe', 'der Preis', 'das Sonderangebot'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Trois publicités', art: 'dokumente',
      quelle: 'Magazine des jeunes (produits et marques imaginaires)', titel: 'La pub dans le magazine',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**CROQ’FRUITS** – des fruits secs en sachet', text: ['« Croquez la nature ! » 100 % fruits, 0 % sucre ajouté. Parfait pour le goûter. Essayez nos cinq saveurs ! Le sachet : 1,50 €.'] },
        { stil: 'karte', stimme: 'm1', kopf: '**QUIZÉO** – l’appli pour réviser', text: ['« Révisez moins, apprenez mieux ! » Des quiz de cinq minutes pour toutes les matières. Téléchargez-la gratuitement ! Version complète : 2,99 € par mois.'] },
        { stil: 'karte', stimme: 'w2', kopf: '**LES BULLES** – le parc aquatique', text: ['« Plongez dans l’aventure ! » Douze toboggans, une piscine à vagues et une rivière sauvage. Offre spéciale : venez à quatre, payez trois ! Ouvert tous les jours de 10 h à 20 h.'] },
      ],
      woerter: [['croquer', 'knabbern'], ['le sachet', 'die Tüte'], ['la saveur', 'der Geschmack'], ['réviser', 'wiederholen, lernen'], ['télécharger', 'herunterladen'], ['le toboggan', 'die Rutsche'], ['la piscine à vagues', 'das Wellenbad'], ['plonger', 'tauchen']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Analyse les publicités.', stufe: 1, kopf: ['', 'produit', 'slogan', 'public cible'], breiten: [8, 28, 36, 28], zeilen: [['1', '[des fruits secs]', '[« Croquez la nature ! »]', '[les jeunes, pour le goûter]'], ['2', '[une appli pour réviser]', '[« Révisez moins, apprenez mieux ! »]', '[les élèves]'], ['3', '[un parc aquatique]', '[« Plongez dans l’aventure ! »]', '[les familles, les groupes d’amis]']] },
        { art: 'tabelle', auftrag: 'Les slogans sont à l’impératif. Trouve l’infinitif.', stufe: 2, kopf: ['impératif', 'infinitif'], breiten: [50, 50], zeilen: [['Croquez !', '[croquer]'], ['Essayez !', '[essayer]'], ['Téléchargez-la !', '[télécharger]'], ['Plongez !', '[plonger]'], ['Venez !', '[venir]']] },
      ],
    },
    hoeren: {
      was: 'Des spots radio', wo: 'Radio des jeunes · la pub', titel: 'Trois spots, trois produits',
      situation: 'Entre deux chansons, la radio des jeunes passe trois publicités. Écoute : c’est pour quel produit ?',
      bild: ['mia:froh:erklaeren', 'ben:froh:handy'], sprecher: { Annonceuse: 'w1', Annonceur: 'm2', Fille: 'w3' },
      text: [
        ['Annonceuse', 'Tu as faim après l’école ? Ne mange pas n’importe quoi ! Prends un sachet de Croq’Fruits : des fruits, rien que des fruits. Croq’Fruits : croquez la nature !'],
        ['Annonceur', 'Samedi, c’est la grande fête de Quizéo ! Le premier qui réussit cent quiz gagne une tablette. Téléchargez Quizéo maintenant !'],
        ['Fille', 'Moi, cet été, je suis allée aux Bulles avec mes copines. On a glissé sur les toboggans toute la journée ! C’était génial !'],
        ['Annonceuse', 'Les Bulles, le parc aquatique. Venez à quatre, payez trois !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Un spot publicitaire à la radio, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['court', 'long de deux heures', 'fait pour vendre'], r: [0, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute. Quel produit ? Quel détail ?', stufe: 1, kopf: ['spot', 'produit', 'détail'], breiten: [10, 40, 50], zeilen: [['1', '[Croq’Fruits, des fruits secs]', '[pour la faim après l’école]'], ['2', '[Quizéo, l’appli]', '[fête samedi : cent quiz, on gagne une tablette]'], ['3', '[Les Bulles, le parc aquatique]', '[venez à quatre, payez trois]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Inventez un spot radio de 20 secondes pour un produit imaginaire et jouez-le.', stufe: 3, karten: [
        { titel: 'Le spot', text: ['Tu as … ? · Tu veux … ?', 'Essaie … ! · Prends … !', '… , c’est le meilleur !', 'Offre spéciale : …'] },
        { titel: 'Ton avis', text: ['Ce spot est drôle / nul.', 'Il me donne envie de …', 'Je ne crois pas cette pub.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'L’impératif', punkte: ['tu : **Essaie !** · **Prends !** · **Viens !**', 'nous : **Essayons !** · **Prenons !**', 'vous : **Essayez !** · **Prenez !** · **Venez !**', 'Négation : **Ne** mange **pas** n’importe quoi !', 'Avec un pronom : Télécharge-**la** !'] },
         { titel: 'Les mots de la pub', punkte: ['le **produit** · la **marque** · le **slogan**', 'le **public cible** : pour qui ?', 'l’**offre spéciale** · la **promotion** · **gratuit**', '**le meilleur** · **nouveau** · **100 %**'] }],
        [{ art: 'tipp', titel: 'Trouver l’infinitif', text: 'Enlève **-ez**, ajoute **-er** : essay**ez** → essay**er**. Attention : venez → **venir** · prenez → **prendre**.' },
         { art: 'achtung', titel: 'Esprit critique', text: 'La pub veut te faire **acheter**. Pose-toi des questions : Est-ce que j’en ai vraiment besoin ? « 100 % », c’est vrai ?' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Écris l’impératif (vous).', stufe: 1, saetze: ['(essayer) [Essayez] nos nouvelles saveurs !', '(venir) [Venez] au parc aquatique !', '(télécharger) [Téléchargez] l’appli !', '(prendre) [Prenez] un sachet !'] },
      { art: 'abschreiben', auftrag: 'Écris le slogan pour un copain (tu).', stufe: 2, kopf: ['vous', 'tu'], saetze: [['Essayez !', 'Essaie !'], ['Venez avec nous !', 'Viens avec nous !'], ['Prenez un sachet !', 'Prends un sachet !']] },
    ],
    schreiben: [
      { art: 'frei', auftrag: 'Invente un produit et dessine son affiche publicitaire.', stufe: 1, html: zeichenfeld('Écris sur l’affiche : le nom (la marque), le produit, le slogan à l’impératif et une offre spéciale.', 70) },
      { art: 'schreiben', auftrag: 'Présente ta publicité : produit, slogan, public cible, offre.', stufe: 2,
        anfaenge: ['Mon produit s’appelle …', 'C’est …', 'Le slogan : « … ! »', 'C’est pour …', 'Offre spéciale : …'], zeilen: 7,
        beispiel: 'Mon produit s’appelle Rangetout. C’est un sac à dos avec dix poches. Le slogan : « Rangez tout, trouvez tout ! » C’est pour les élèves qui perdent leurs affaires. Offre spéciale : une trousse gratuite !' },
    ],
    check: ['Je trouve le produit, le slogan et le public d’une pub.', 'Je comprends des spots radio.', 'Je trouve l’infinitif d’un impératif.', 'J’utilise l’impératif.', 'J’invente une publicité.'],
  },
  // ================================================================ 5
  {
    thema: 'Décrire un objet · ça sert à', titel: 'Ça sert à quoi ?', untertitel: 'Rond, carré, en bois, en métal : tu découvres des objets d’hier, tu devines des objets et tu écris des devinettes.',
    ziel: { fr: 'Je décris un objet : sa forme, sa matière et son utilisation.', de: 'Ich beschreibe einen Gegenstand: Form, Material und Verwendung.' },
    bild: ['oma:froh:erklaeren', 'noah:verwirrt:stehen'],
    start: {
      was: 'Les matières',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Les matières : relie.', stufe: 1, links: ['en bois', 'en métal', 'en plastique', 'en verre', 'en papier', 'en tissu'], rechts: ['aus Holz', 'aus Metall', 'aus Plastik', 'aus Glas', 'aus Papier', 'aus Stoff'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Des objets au musée', art: 'dokumente',
      quelle: 'Exposition « Objets d’hier » (musée imaginaire)', titel: 'Objets d’hier',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Exposition « Objets d’hier »**', text: ['**Le téléphone à cadran (1960) :** il était lourd, en plastique noir. Pour appeler, on tournait un cadran rond avec le doigt.', '**La machine à écrire (1950) :** elle était en métal. Elle servait à écrire des lettres. Il fallait taper fort sur les touches !', '**Le baladeur à cassettes (1985) :** il était petit et rectangulaire. On l’utilisait pour écouter de la musique dans la rue.', '**La disquette (1995) :** elle était carrée, en plastique. Elle servait à garder des documents d’ordinateur.'] },
      ],
      woerter: [['l’objet', 'der Gegenstand'], ['lourd', 'schwer'], ['le cadran', 'die Wählscheibe'], ['tourner', 'drehen'], ['servir à', 'dienen zu'], ['taper', 'tippen'], ['la touche', 'die Taste'], ['garder', 'aufbewahren']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète la fiche des objets.', stufe: 1, kopf: ['objet', 'forme, matière', 'ça servait à …'], breiten: [30, 34, 36], zeilen: [['le téléphone à cadran', '[en plastique noir, lourd]', '[appeler]'], ['la machine à écrire', '[en métal]', '[écrire des lettres]'], ['le baladeur', '[petit, rectangulaire]', '[écouter de la musique dans la rue]'], ['la disquette', '[carrée, en plastique]', '[garder des documents]']] },
        { art: 'mc', auftrag: 'Et aujourd’hui ? Coche.', stufe: 2, fragen: [{ f: 'À la place de la disquette, on utilise …', o: ['une clé USB ou internet', 'une cassette'], r: 0 }, { f: 'À la place du baladeur, on utilise …', o: ['le portable', 'la machine à écrire'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'Des devinettes', wo: 'Salle de classe · jeu', titel: 'Qu’est-ce que c’est ?',
      situation: 'Mme Nouvelle propose un jeu de devinettes. Elle décrit trois objets. Noah et Léa devinent.',
      bild: ['lehrerin:froh:erklaeren', 'noah:froh'], sprecher: { 'Mme Nouvelle': 'w1', Noah: 'm3', Léa: 'w2' },
      text: [
        ['Mme Nouvelle', 'Première devinette. C’est petit, souvent rectangulaire, en caoutchouc. On l’utilise tous les jours à l’école. Ça sert à effacer les erreurs.'],
        ['Noah', 'C’est une gomme !'],
        ['Mme Nouvelle', 'Bravo, Noah ! Deuxième devinette. C’est long et fin. C’est en bois, avec une mine noire à l’intérieur. Ça sert à écrire ou à dessiner.'],
        ['Léa', 'C’est un crayon !'],
        ['Mme Nouvelle', 'Très bien ! Et la dernière, plus difficile. C’est en plastique, rond, avec une mousse à l’intérieur. On le met sur la tête quand on fait du vélo. Ça sert à protéger.'],
        ['Noah', 'Un casque ! Il faut toujours le mettre !'],
        ['Mme Nouvelle', 'Exactement ! À vous maintenant : écrivez vos devinettes !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Une devinette, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['un petit jeu : il faut trouver la réponse', 'une recette'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['devinette', 'indices', 'réponse'], breiten: [16, 56, 28], zeilen: [['1', '[petit, rectangulaire, en caoutchouc ; pour effacer]', '[une gomme]'], ['2', '[long et fin, en bois ; pour écrire ou dessiner]', '[un crayon]'], ['3', '[en plastique, rond ; sur la tête ; pour protéger]', '[un casque]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Pense à un objet de la classe. Décris-le. Les autres devinent.', stufe: 3, karten: [
        { titel: 'Décrire', text: ['C’est rond / carré / long …', 'C’est en bois / en métal …', 'Ça sert à …', 'On l’utilise pour …'] },
        { titel: 'Deviner', text: ['C’est un … ?', 'C’est grand ?', 'C’est en quoi ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Décrire un objet', punkte: ['La forme : **rond**, **carré**, **rectangulaire**, **long**, **fin**', 'La matière : **en** bois, **en** métal, **en** plastique, **en** verre', 'La taille : **petit**, **grand**, **lourd**, **léger**', 'La couleur : **noir**, **rouge**, **fluo** …'] },
         { titel: 'L’utilisation', punkte: ['**Ça sert à** effacer. (+ infinitif)', '**C’est pour** écrire.', '**On l’utilise pour** protéger la tête.', 'Hier : **ça servait à** … · **on l’utilisait pour** …'] }],
        [{ art: 'tipp', titel: 'Faire une devinette', text: '1. la forme · 2. la matière · 3. **Ça sert à** … · 4. **Qu’est-ce que c’est ?**' },
         { art: 'achtung', titel: 'L’accord', text: 'un objet **rond** · une table **ronde** · une boîte **carrée** · des disquettes **carrées**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec en bois, en métal, en verre ou en tissu.', stufe: 1, saetze: ['Une fenêtre est [en verre].', 'Une chaise d’école est souvent [en bois].', 'Un tee-shirt est [en tissu].', 'Une clé est [en métal].'] },
      { art: 'luecken', auftrag: 'Accorde la forme.', stufe: 2, saetze: ['(rond) une table [ronde]', '(carré) une boîte [carrée]', '(rectangulaire) un écran [rectangulaire]', '(long) des crayons [longs]'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris trois devinettes sur des objets de la vie quotidienne.', stufe: 2,
        anfaenge: ['C’est …', 'C’est en …', 'Ça sert à …', 'Qu’est-ce que c’est ?'], zeilen: 11,
        beispiel: 'C’est rectangulaire et plat. C’est en plastique et en verre. Ça sert à téléphoner, à écrire des messages et à prendre des photos. Qu’est-ce que c’est ? (un portable)' },
    ],
    check: ['Je comprends la description d’un objet.', 'Je décris la forme et la matière.', 'Je dis à quoi sert un objet.', 'Je comprends des devinettes.', 'J’écris des devinettes.'],
  },
  // ================================================================ 6
  {
    thema: 'Les interdictions · les pronoms', titel: 'C’est interdit !', untertitel: 'Panneaux, règlements, sécurité : tu comprends des interdictions dans les lieux publics et tu écris des règles.',
    ziel: { fr: 'Je comprends les panneaux et les règles dans les lieux publics.', de: 'Ich verstehe Schilder und Regeln an öffentlichen Orten.' },
    bild: ['lehrer:froh:stehen-zeigen', 'ben:ueberrascht:stehen'],
    start: {
      was: 'Les panneaux',
      aufgaben: [
        { art: 'symbole', auftrag: 'Que veut dire le panneau ? Écris.', stufe: 1, woerter: ['pas de portable', 'défense de fumer', 'pas de photos', 'pas de vélos', 'silence', 'danger', 'casque obligatoire', 'stop'],
          symbole: [['device-mobile-off', 'pas de portable'], ['smoking-no', 'défense de fumer'], ['camera-off', 'pas de photos'], ['bike-off', 'pas de vélos'], ['volume-off', 'silence'], ['alert-triangle', 'danger'], ['helmet', 'casque obligatoire'], ['hand-stop', 'stop']] },
      ],
    },
    lesen: {
      was: 'Deux règlements', art: 'dokumente',
      quelle: 'Panneaux d’une piscine et d’un musée (imaginaires)', titel: 'Les règles',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Piscine municipale** – Règlement', text: ['Il est **interdit** de courir autour du bassin : le sol est glissant !', 'Il est **interdit** de plonger dans le petit bassin.', 'Douche **obligatoire** avant la baignade. Le bonnet de bain est **conseillé**.', '**Défense de** manger au bord de l’eau.', 'Les enfants de moins de 10 ans **doivent** venir avec un adulte.', 'Photos et vidéos **interdites** : respectez les autres !'] },
        { stil: 'nachricht', stimme: 'm1', kopf: '**Au musée**', text: ['**Ne touchez pas** les objets. Parlez doucement. Les sacs à dos ne sont pas **autorisés** dans les salles : laissez-les au vestiaire.'] },
      ],
      woerter: [['le règlement', 'die Hausordnung'], ['interdit', 'verboten'], ['glissant', 'rutschig'], ['plonger', 'springen, tauchen'], ['obligatoire', 'Pflicht'], ['la baignade', 'das Baden'], ['conseillé', 'empfohlen'], ['autorisé', 'erlaubt']],
      aufgaben: [
        { art: 'rf', auftrag: 'C’est permis ou interdit à la piscine ? Coche.', stufe: 1, spalten: ['permis', 'interdit'], saetze: [['courir autour du bassin', false], ['prendre une douche', true], ['plonger dans le petit bassin', false], ['porter un bonnet de bain', true], ['filmer ses copains', false]] },
        { art: 'fragen', auftrag: 'Réponds.', stufe: 2, fragen: [{ f: 'Pourquoi est-ce qu’il est interdit de courir ?', l: 'parce que le sol est glissant' }, { f: 'Où est-ce qu’on laisse son sac à dos au musée ?', l: 'au vestiaire' }] },
      ],
    },
    hoeren: {
      was: 'À la piscine', wo: 'Piscine · cours de natation', titel: 'Écoutez bien les règles !',
      situation: 'La classe arrive à la piscine. Le maître-nageur explique les règles aux élèves. Ben n’écoute pas très bien…',
      bild: ['lehrer:froh:erklaeren', 'ben:verwirrt'], sprecher: { 'Maître-nageur': 'm2', Ben: 'm3', 'Mme Nouvelle': 'w1' },
      text: [
        ['Maître-nageur', 'Bonjour à tous ! Avant de nager, écoutez-moi bien. D’abord, prenez une douche. C’est obligatoire.'],
        ['Maître-nageur', 'Ensuite, ne courez pas autour du bassin : c’est glissant. Et il est interdit de plonger dans le petit bassin. L’eau n’est pas assez profonde.'],
        ['Ben', 'Et dans le grand bassin, on peut plonger ?'],
        ['Maître-nageur', 'Oui, mais seulement quand je suis là et quand je vous le dis.'],
        ['Mme Nouvelle', 'Ben, tu as ton bonnet ?'],
        ['Ben', 'Euh… non, je l’ai oublié.'],
        ['Maître-nageur', 'Pas de problème, je t’en prête un. Et rappelez-vous : si un copain a un problème dans l’eau, appelez-moi tout de suite. Bonne baignade !'],
      ],
      vor: [{ art: 'mc', auftrag: 'À la piscine, on porte … Coche.', stufe: 1, fragen: [{ f: '', o: ['un maillot de bain', 'un bonnet de bain', 'un manteau'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'D’abord, il faut …', o: ['prendre une douche', 'plonger'], r: 0 }, { f: 'Dans le petit bassin, il est interdit de …', o: ['nager', 'plonger'], r: 1 }, { f: 'Ben a oublié …', o: ['son maillot', 'son bonnet'], r: 1 }, { f: 'Si un copain a un problème, …', o: ['on appelle le maître-nageur', 'on fait une photo'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Choisis un lieu (bibliothèque, cantine, bus, cinéma). Explique les règles à ton ou ta partenaire.', stufe: 3, karten: [
        { titel: 'Interdire', text: ['Il est interdit de …', 'Ne … pas !', 'Défense de …'] },
        { titel: 'Obliger, conseiller', text: ['Il faut …', 'Tu dois …', 'C’est obligatoire.', 'Je te conseille de …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Interdire', punkte: ['**Il est interdit de** courir. (+ infinitif)', '**Défense de** manger.', '**Interdit aux** chiens · Photos **interdites**', '**Ne** courez **pas** ! · **Ne** touchez **pas** !', '**Ne pas** plonger. (sur les panneaux)'] },
         { titel: 'Obliger et permettre', punkte: ['C’est **obligatoire**. · **Il faut** prendre une douche.', 'Tu **dois** venir avec un adulte.', 'C’est **autorisé** / **permis**.', 'C’est **conseillé**. · Je te **conseille de** …'] }],
        [{ art: 'tipp', titel: 'le, la, les · lui, leur', text: 'Il explique **les règles** → il **les** explique. · Il parle **aux élèves** → il **leur** parle. · Il prête un bonnet **à Ben** → il **lui** prête un bonnet.' },
         { art: 'achtung', titel: 'Les formes des panneaux', text: 'Rond avec un bord rouge = **interdit**. Rond bleu = **obligatoire**. Triangle = **attention, danger** !' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec il est interdit de, il faut ou ne … pas.', stufe: 1, saetze: ['À la bibliothèque, [il est interdit de] crier.', 'À la piscine, [il faut] prendre une douche.', 'Au musée : « [Ne] touchez [pas] les objets ! »'] },
      { art: 'luecken', auftrag: 'Remplace par le, la, les, l’, lui ou leur.', stufe: 2, saetze: ['Il explique les règles. → Il [les] explique.', 'Il parle aux élèves. → Il [leur] parle.', 'Il prête un bonnet à Ben. → Il [lui] prête un bonnet.', 'Tu as ton bonnet ? → Oui, je [l’]ai.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris le règlement d’un lieu : la classe, la cantine, le bus scolaire … (cinq règles).', stufe: 2,
        anfaenge: ['Règlement de …', 'Il est interdit de …', 'Il faut …', 'Ne … pas …', 'Il est conseillé de …'], zeilen: 9,
        beispiel: 'Règlement du bus scolaire. Il est interdit de manger dans le bus. Il faut rester assis pendant le trajet. Ne criez pas : le chauffeur doit se concentrer. Mettez votre sac sous le siège. Il est conseillé de dire bonjour au chauffeur !' },
    ],
    check: ['Je comprends des panneaux.', 'Je comprends un règlement.', 'Je comprends des règles à l’oral.', 'J’exprime une interdiction et une obligation.', 'J’utilise le, la, les, lui, leur.'],
  },
  // ================================================================ 7
  {
    thema: 'Une légende · imparfait et passé composé', titel: 'Il était une fois…', untertitel: 'Un château, une forêt, un secret : tu lis le début d’une légende, tu écoutes la fin et tu inventes ta légende.',
    ziel: { fr: 'Je comprends une légende et je reconnais l’imparfait et le passé composé.', de: 'Ich verstehe eine Sage und erkenne Imperfekt und Perfekt.' },
    bild: ['lehrerin:froh:blatt', 'tom:ueberrascht:sitzen'],
    start: {
      was: 'Les mots des légendes',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie.', stufe: 1, links: ['Il était une fois …', 'le château', 'le chevalier', 'le trésor', 'la forêt', 'la grotte'], rechts: ['Es war einmal …', 'die Burg', 'der Ritter', 'der Schatz', 'der Wald', 'die Höhle'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Le début d’une légende', art: 'text', stimme: 'erz', nummern: true,
      quelle: 'Légende inventée pour ce cahier', titel: 'Le trésor du rocher du Hibou (1)',
      absaetze: [
        '**Il était une fois**, dans les Ardennes, un petit château sur un rocher. Au pied du rocher, il y **avait** une grande forêt sombre. Les gens du village **avaient** peur de cette forêt.',
        'Dans le château **vivait** une jeune fille, Elsa. Elle **était** courageuse et très curieuse. Tous les soirs, elle **regardait** la forêt par sa fenêtre.',
        'Un soir d’hiver, Elsa **a vu** une petite lumière bleue entre les arbres. Elle **a pris** sa lanterne et elle **est sortie** du château, sans bruit.',
        'Dans la forêt, un vieux hibou l’**attendait** sur une branche. « Bonsoir, Elsa, **a dit** le hibou. Je **cherchais** quelqu’un de courageux. Suis-moi ! »',
      ],
      woerter: [['il était une fois', 'es war einmal'], ['le rocher', 'der Felsen'], ['sombre', 'dunkel'], ['courageux', 'mutig'], ['la lumière', 'das Licht'], ['la lanterne', 'die Laterne'], ['le hibou', 'die Eule'], ['suivre (suis-moi)', 'folgen']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Trouve les verbes dans le texte et classe-les.', stufe: 2, kopf: ['imparfait (le décor, les habitudes)', 'passé composé (les actions)'], breiten: [55, 45], zeilen: [['[il y avait, avaient, vivait, était, regardait, attendait, cherchais]', '[a vu, a pris, est sortie, a dit]']] },
        { art: 'mc', auftrag: 'Coche.', stufe: 1, fragen: [{ f: 'Les gens du village avaient peur …', o: ['du château', 'de la forêt'], r: 1 }, { f: 'Un soir, Elsa a vu …', o: ['une lumière bleue', 'un chevalier'], r: 0 }, { f: 'Qui attendait Elsa ?', o: ['un vieux hibou', 'sa mère'], r: 0 }] },
      ],
    },
    hoeren: {
      was: 'La fin de la légende', wo: 'Légende · deuxième partie', titel: 'Le trésor du rocher du Hibou (2)',
      situation: 'Écoute la fin de la légende. Qu’est-ce qu’Elsa va trouver ?',
      bild: ['lea:ueberrascht', 'opa:froh:erklaeren'], sprecher: { Narratrice: 'w1', Hibou: 'm2', Elsa: 'w2' },
      text: [
        ['Narratrice', 'Elsa a suivi le hibou. Ils ont marché longtemps. Il faisait froid et la neige tombait doucement.'],
        ['Narratrice', 'Enfin, ils sont arrivés devant une grotte. À l’intérieur, il y avait une vieille boîte en bois.'],
        ['Hibou', 'Ouvre-la, Elsa. Mais attention : ce trésor n’est pas seulement pour toi.'],
        ['Narratrice', 'Elsa a ouvert la boîte. Dedans, il n’y avait pas d’or. Il y avait des graines, des milliers de petites graines.'],
        ['Elsa', 'Des graines ? Mais ce n’est pas un trésor !'],
        ['Hibou', 'Si. Plante-les avec les gens du village, et la forêt ne sera plus sombre.'],
        ['Narratrice', 'Au printemps, Elsa et les gens du village ont planté les graines. Des fleurs et des arbres fruitiers ont poussé partout. Et depuis ce jour, personne n’a peur de la forêt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'À ton avis, qu’est-ce qu’il y a dans le trésor ? Coche.', stufe: 1, fragen: [{ f: '', o: ['de l’or', 'des bijoux', 'autre chose'], r: 2 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Écoute. Mets dans l’ordre.', stufe: 1, teile: ['Elsa suit le hibou.', 'Ils arrivent devant une grotte.', 'Elsa ouvre la boîte.', 'Elle trouve des graines.', 'Les gens du village plantent les graines.', 'Personne n’a peur de la forêt.'], ordnung: [3, 0, 5, 2, 4, 1] },
        { art: 'fragen', auftrag: 'Quel est le vrai trésor ? Explique avec tes mots.', stufe: 3, fragen: [{ f: '', l: 'des graines : des fleurs et des arbres pour tout le village' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Raconte la légende avec tes mots. Utilise d’abord, ensuite, puis, enfin.', stufe: 3, karten: [
        { titel: 'Le décor (imparfait)', text: ['Il était une fois …', 'Il y avait …', 'Elsa était …'] },
        { titel: 'Les actions (passé composé)', text: ['Un soir, elle a vu …', 'Elle est sortie …', 'Elle a trouvé …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Raconter une histoire', punkte: ['**Imparfait** = le décor, les descriptions, les habitudes', 'Il y **avait** une forêt. Elsa **était** courageuse.', '**Passé composé** = les actions, les événements', 'Un soir, elle **a vu** une lumière. Elle **est sortie**.'] },
         { titel: 'quand · les moments', punkte: ['**Quand** Elsa **a ouvert** la boîte, elle **a vu** des graines.', '**Quand** il **faisait** froid, les gens **restaient** chez eux.', '**Un soir**, … · **Tout à coup**, … · **Enfin**, …'] }],
        [{ art: 'tipp', titel: 'Le début et la fin', text: 'Début : **Il était une fois** … · **Il y a très longtemps** … · Fin : **Et depuis ce jour**, … · **C’est pourquoi** aujourd’hui …' },
         { art: 'achtung', titel: 'Légende ou histoire vraie ?', text: 'Une **légende** est une histoire inventée, souvent avec de la magie. Elle parle parfois d’un lieu qui existe vraiment.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Imparfait ou passé composé ? Choisis la bonne forme.', stufe: 2, saetze: ['Il [faisait] froid. (faisait / a fait)', 'Tout à coup, Elsa [a vu] une lumière. (voyait / a vu)', 'Le hibou [était] très vieux. (était / a été)', 'Elle [a ouvert] la boîte. (ouvrait / a ouvert)'] },
      { art: 'luecken', auftrag: 'Complète avec un soir, tout à coup ou enfin.', stufe: 1, saetze: ['[Un soir], Elsa a regardé par la fenêtre.', '[Tout à coup], elle a vu une lumière bleue.', '[Enfin], ils sont arrivés devant la grotte.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Invente une légende sur un lieu de ta région (château, rivière, forêt …).', stufe: 3,
        anfaenge: ['Il était une fois …', 'Il y avait …', 'Un jour, …', 'Tout à coup, …', 'Et depuis ce jour, …'], zeilen: 12,
        beispiel: 'Il était une fois un pont très vieux sur la Sûre. Sous le pont, il y avait un poisson d’argent. Il parlait aux enfants. Un jour, un garçon a perdu sa clé dans l’eau. Tout à coup, le poisson est sorti de l’eau avec la clé ! Et depuis ce jour, les enfants disent bonjour à la rivière.' },
    ],
    check: ['Je comprends une légende.', 'Je comprends la fin d’une histoire à l’oral.', 'Je reconnais l’imparfait et le passé composé.', 'J’utilise quand, un soir, tout à coup.', 'J’invente une légende.'],
  },
  // ================================================================ 8
  {
    thema: 'Inviter · accepter · déplacer', titel: 'Tu viens à la fête ?', untertitel: 'Une soirée années 80 : tu lis une invitation et des réponses, tu écoutes un rendez-vous qu’on déplace et tu écris tes messages.',
    ziel: { fr: 'J’écris une invitation, j’accepte, je refuse ou je déplace un rendez-vous.', de: 'Ich schreibe eine Einladung, sage zu, sage ab oder verschiebe einen Termin.' },
    bild: ['chloe:froh:tanzen', 'sami:froh:handy'],
    start: {
      was: 'Oui ou non ?',
      aufgaben: [
        { art: 'rf', auftrag: 'La personne accepte ou refuse ? Coche.', stufe: 1, spalten: ['accepte', 'refuse'], saetze: [['Avec plaisir !', true], ['Désolé, je ne peux pas.', false], ['Super, je viens !', true], ['Malheureusement, je suis malade.', false], ['C’est d’accord !', true], ['Je n’ai pas le temps, désolée.', false]] },
      ],
    },
    lesen: {
      was: 'Une invitation et deux réponses', art: 'dokumente',
      quelle: 'Affiche et messages sur le portable (personnes imaginaires)', titel: 'Soirée années 80',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Soirée années 80** à la maison des jeunes !', text: ['Samedi 6 mars, de 18 h à 22 h · Entrée : 3 € · Musique, quiz et concours du meilleur costume !', 'Viens avec une tenue des années 80 : couleurs fluo, grandes épaules… **Et en plus**, il y a des crêpes ! Inscription avant le 3 mars : Chloé, au 12 34 56.'] },
        { stil: 'nachricht', stimme: 'm3', kopf: 'Réponse de Sami', text: ['Salut Chloé ! Merci pour l’invitation. J’accepte avec plaisir ! **Et en plus**, ma tante a une veste fluo des années 80 : je vais la porter !'] },
        { stil: 'nachricht', stimme: 'w2', kopf: 'Réponse de Léa', text: ['Coucou Chloé, désolée, je ne peux pas venir samedi : j’ai un match de basket à Wiltz. **Par contre**, je peux t’aider à préparer la salle vendredi. Ça te va ?'] },
      ],
      woerter: [['l’invitation', 'die Einladung'], ['la soirée', 'der Abend, die Party'], ['la tenue', 'das Outfit'], ['le concours', 'der Wettbewerb'], ['accepter', 'zusagen'], ['refuser', 'absagen'], ['désolé(e)', 'es tut mir leid'], ['Ça te va ?', 'Passt dir das?']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Lis l’invitation et complète.', stufe: 1, kopf: ['question', 'réponse'], breiten: [42, 58], zeilen: [['Quand est la soirée ?', '[samedi 6 mars, de 18 h à 22 h]'], ['Où ?', '[à la maison des jeunes]'], ['Qu’est-ce qu’il faut porter ?', '[une tenue des années 80]'], ['On s’inscrit avant quand ?', '[avant le 4 mars]']] },
        { art: 'wer', auftrag: 'Sami ou Léa ? Coche.', stufe: 2, personen: ['Sami', 'Léa'], saetze: [['Elle / Il accepte l’invitation.', 'Sami'], ['Elle / Il refuse l’invitation.', 'Léa'], ['Elle / Il a un match samedi.', 'Léa'], ['Elle / Il va porter une veste fluo.', 'Sami'], ['Elle / Il propose d’aider vendredi.', 'Léa']] },
      ],
    },
    hoeren: {
      was: 'Un rendez-vous', wo: 'Au téléphone · jeudi', titel: 'On peut déplacer le rendez-vous ?',
      situation: 'Jeudi, Chloé appelle Léa. Elles voulaient préparer la salle vendredi à 16 heures, mais il y a un problème.',
      bild: ['chloe:froh:handy', 'lea:froh:handy'], sprecher: { Chloé: 'w2', Léa: 'w3' },
      text: [
        ['Chloé', 'Allô, Léa ? C’est Chloé. Pour vendredi, j’ai un problème : la salle n’est pas libre à seize heures.'],
        ['Léa', 'Ah bon ? Alors on annule ?'],
        ['Chloé', 'Non, on peut déplacer le rendez-vous. La salle est libre à dix-huit heures. Ça te va ?'],
        ['Léa', 'Dix-huit heures… D’accord. Par contre, je dois rentrer à vingt heures. Ça suffit ?'],
        ['Chloé', 'Oui, deux heures, c’est parfait. Et en plus, Sami vient aussi pour nous aider.'],
        ['Léa', 'Super ! J’apporte la musique et les décorations fluo.'],
        ['Chloé', 'Génial ! Alors, à vendredi, dix-huit heures, devant la maison des jeunes.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Déplacer un rendez-vous, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['changer l’heure ou le jour', 'aller à un rendez-vous'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'Le nouveau rendez-vous est à …', o: ['16 heures', '18 heures'], r: 1 }, { f: 'Pourquoi ?', o: ['La salle n’est pas libre à 16 heures.', 'Léa est malade.'], r: 0 }, { f: 'Léa doit rentrer à …', o: ['20 heures', '22 heures'], r: 0 }, { f: 'Léa apporte …', o: ['la musique et les décorations', 'les crêpes'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Au téléphone : invite ton ou ta partenaire. Il ou elle accepte, refuse ou propose un autre jour.', stufe: 3, karten: [
        { titel: 'Inviter', text: ['Tu veux venir … ?', 'Ça te dit de … ?', 'On se retrouve à … ?'] },
        { titel: 'Répondre', text: ['Avec plaisir !', 'Désolé(e), je ne peux pas parce que …', 'On peut le déplacer à … ? Ça te va ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Inviter et répondre', punkte: ['**Inviter** : Tu veux venir … ? · **Ça te dit** de … ?', '**Accepter** : Avec plaisir ! · C’est d’accord !', '**Refuser** : **Désolé(e)**, je ne peux pas **parce que** …', '**Annuler** : Je dois annuler notre rendez-vous.', '**Déplacer** : On peut déplacer le rendez-vous à 18 h ? **Ça te va ?**'] },
         { titel: 'Les connecteurs', punkte: ['**et aussi** : J’ai une veste **et aussi** un bonnet.', '**en plus** : **Et en plus**, il y a des crêpes !', '**par contre** : Je ne peux pas samedi. **Par contre**, vendredi, oui.'] }],
        [{ art: 'tipp', titel: 'Un message poli', text: 'Salut / Bonjour … · **Merci pour** … · ta réponse et **pourquoi** · une **proposition** · À bientôt !' },
         { art: 'achtung', titel: 'Je ne peux pas', text: 'pouvoir : je **peux**, tu **peux** … · Négation : je **ne peux pas** venir. (+ infinitif)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec et aussi, en plus ou par contre.', stufe: 1, saetze: ['Je ne peux pas samedi. [Par contre], dimanche, je suis libre.', 'Il y a de la musique [et aussi] un quiz.', 'La soirée est super. [En plus], l’entrée coûte seulement 3 € !'] },
      { art: 'abschreiben', auftrag: 'Écris une réponse.', stufe: 2, kopf: ['invitation', 'réponse'], saetze: [['Tu viens au cinéma samedi ? (oui)', 'Avec plaisir ! Je viens.'], ['On fait du vélo dimanche ? (non, malade)', 'Désolé(e), je ne peux pas parce que je suis malade.'], ['On se voit à 15 h ? (non, plutôt à 17 h)', 'On peut le déplacer à 17 h ? Ça te va ?']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris une invitation pour une fête (thème de ton choix).', stufe: 2,
        anfaenge: ['Soirée … !', 'C’est le … , de … à …', 'Viens avec …', 'Et en plus, …', 'Réponds avant le …'], zeilen: 7,
        beispiel: 'Soirée pyjama à la maison des jeunes ! C’est le vendredi 21 mai, de 19 h à 22 h. Viens avec ton pyjama et ton oreiller. Et en plus, on regarde un film ! Réponds avant le 15 mai.' },
      { art: 'schreiben', auftrag: 'Écris une réponse : tu refuses et tu proposes autre chose.', stufe: 2,
        anfaenge: ['Salut … !', 'Merci pour …', 'Désolé(e), je ne peux pas …', 'Par contre, …', 'À bientôt !'], zeilen: 5,
        beispiel: 'Salut Inès ! Merci pour l’invitation. Désolé, je ne peux pas venir vendredi : je pars chez ma tante. Par contre, on peut aller au cinéma dimanche. Ça te va ? À bientôt !' },
    ],
    check: ['Je comprends une invitation.', 'J’accepte ou je refuse poliment.', 'Je déplace ou j’annule un rendez-vous.', 'J’utilise et aussi, en plus, par contre.', 'J’écris une invitation et une réponse.'],
  },
]
