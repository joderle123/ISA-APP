// Français · Module 1 « Moi et mon école » (Régime / Voie de préparation, A1.1) – cahier multimodal.
// Thèmes, lexique et grammaire d’après le « Référentiel de compétences – français, régime préparatoire » (MENFP),
// Module 1 : se présenter, parler de soi, de son entourage et de sa vie à l’école ; formules de politesse, nombres,
// nationalités, pays, identité, matières et matériel scolaires, moments de la journée, jours, heure et emploi du
// temps, fréquence, tutoiement et vouvoiement ; être, avoir, aller, verbes en -er, négation, articles, pronoms
// sujets et toniques, singulier/pluriel, masculin/féminin des nationalités, consignes, aimer/ne pas aimer,
// articles indéfinis et possessifs, majuscules. Tous les textes sont originaux ; personnes, écoles et clubs imaginaires.

export const MODUL = {
  id: 'franzoesisch-m1', kuerzel: 'fr1', nr: 1, sprache: 'fr', niveau: 'A1.1', klasse: 'Voie de préparation',
  dateiname: 'Francais_Module-1',
  fach: { de: 'Französisch', fr: 'Français' },
  titel: { de: 'Ich und meine Schule', fr: 'Moi et mon école' },
  untertitel: { fr: 'Se présenter, dire d’où on vient, compter, parler de son sac, de son école, de son emploi du temps et de sa journée – en huit leçons.', de: 'Sich vorstellen, sagen, woher man kommt, zählen, über Schultasche, Schule, Stundenplan und Tag sprechen – in acht Lektionen.' },
  farben: { tief: '#2457a6', mittel: '#9db8e6', zart: '#eef3fb', dunkel: '#173a70' },
  deckbild: ['lea:froh:stehen-zeigen', 'sami:froh:stehen', 'amira:froh:laessig'],
  blasen: [{ t: 'Salut !', x: 16, y: 112 }, { t: 'Je m’appelle…', x: 122, y: 100 }, { t: 'Bonjour !', x: 160, y: 150 }],
  themen: [
    { titel: { fr: 'Moi', de: 'Ich' }, icon: 'user', lektionen: 3 },
    { titel: { fr: 'Mon école', de: 'Meine Schule' }, icon: 'school', lektionen: 3 },
    { titel: { fr: 'Mes goûts et ma journée', de: 'Was ich mag, mein Tag' }, icon: 'clock', lektionen: 2 },
  ],
  anleitung: [
    'Chaque leçon a cinq parties : **Lire**, **Écouter**, **La règle**, **S’entraîner** et **Écrire**. À la fin, il y a un **mini-bilan**.',
    'À côté de chaque texte, il y a un **code QR**. Scanne-le avec ton portable : tu entends le texte. Tu peux l’écouter plusieurs fois, aussi plus lentement.',
    'Les points montrent le niveau : ●○○ base · ●●○ moyen · ●●● plus. Commence par la base.',
    'Les **consignes** sont en français. Les plus importantes sont expliquées au début de la leçon 1. Tu parles de toi seulement si tu veux – tu peux aussi inventer une personne.',
  ],
  // seulement pour la voix (Regex Python)
  aussprache: {
    '\\bMme\\b': 'Madame', '\\bM\\. ': 'Monsieur ', '(\\d{1,2}) h (\\d\\d)': '\\1 heures \\2', '(\\d{1,2}) h\\b': '\\1 heures', '(\\d+) ?€': '\\1 euros',
    'noah\\.pereira@exemple\\.lu': 'noah point pereira arobase exemple point lu', '\\bn°': 'numéro',
  },
}

const emploiDuTemps = () => {
  const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']
  const lignes = [
    ['8 h 00', ['français', 'maths', 'allemand', 'maths', 'sciences']],
    ['8 h 50', ['maths', 'allemand', 'français', 'sport', 'maths']],
    ['9 h 40', 'récréation'],
    ['9 h 55', ['allemand', 'musique', 'maths', 'sport', 'français']],
    ['10 h 45', ['sciences', 'français', 'dessin', 'allemand', 'informatique']],
    ['11 h 35', 'pause de midi'],
    ['13 h 30', ['sport', 'histoire', '—', 'français', 'allemand']],
    ['14 h 20', ['éducation civique', 'maths', '—', 'dessin', '—']],
  ]
  const td = 'border:0.3mm solid var(--rahmen);padding:1.6mm 1.4mm;text-align:center'
  return `<div style="font-family:Lexend;font-weight:700;font-size:11.5pt;margin-bottom:2mm">Emploi du temps – classe 7P2</div><table style="width:100%;border-collapse:collapse;font-size:10.5pt"><tr><th style="${td};background:var(--f-zart)"></th>${jours.map((j) => `<th style="${td};background:var(--f-zart);color:var(--f-tief)">${j}</th>`).join('')}</tr>${lignes
    .map(([h, z]) => typeof z === 'string' ? `<tr><td style="${td};font-weight:700">${h}</td><td colspan="5" style="${td};background:#f5f7fa;font-style:italic">${z}</td></tr>` : `<tr><td style="${td};font-weight:700">${h}</td>${z.map((c) => `<td style="${td}">${c}</td>`).join('')}</tr>`)
    .join('')}</table>`
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Saluer · se présenter', titel: 'Bonjour, je m’appelle…', untertitel: 'Tu salues, tu dis ton nom et ton âge – et tu sais quand on dit « tu » et quand on dit « vous ».',
    ziel: { fr: 'Je salue, je me présente et je comprends quand quelqu’un se présente.', de: 'Ich begrüße, stelle mich vor und verstehe, wenn sich jemand vorstellt.' },
    bild: ['lea:froh:stehen-zeigen', 'noah:froh:stehen'],
    start: {
      was: 'Les consignes',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Les consignes de ce cahier : relie.', stufe: 1, links: ['Lis.', 'Écoute.', 'Coche.', 'Relie.', 'Complète.', 'Écris.'], rechts: ['Lies.', 'Hör zu.', 'Kreuze an.', 'Verbinde.', 'Ergänze.', 'Schreib.'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Trois présentations', art: 'profile', stimme: 'w1',
      quelle: 'Page web de la classe 7P2 (personnes imaginaires)', titel: 'Nouveaux dans la classe',
      profile: [
        { name: 'Léa', bild: 'lea:froh:stehen', stimme: 'w2', text: 'Salut ! Je m’appelle **Léa**. J’**ai** 12 ans. J’habite à Esch-sur-Alzette. J’aime la musique et le basket.' },
        { name: 'Rui', bild: 'sami:froh:stehen', stimme: 'm3', text: 'Bonjour ! Moi, c’est **Rui**. J’**ai** 13 ans. Je **suis** portugais et luxembourgeois. Je parle portugais, luxembourgeois et un peu français.' },
        { name: 'Amira', bild: 'amira:froh:stehen', stimme: 'w3', text: 'Coucou ! Je **suis** Amira. J’**ai** 12 ans. J’habite à Luxembourg depuis deux ans. J’adore dessiner.' },
      ],
      woerter: [['je m’appelle', 'ich heiße'], ['j’ai … ans', 'ich bin … Jahre alt'], ['j’habite à', 'ich wohne in'], ['je suis', 'ich bin'], ['je parle', 'ich spreche'], ['un peu', 'ein bisschen'], ['j’aime, j’adore', 'ich mag, ich liebe'], ['dessiner', 'zeichnen']],
      aufgaben: [
        { art: 'wer', auftrag: 'Qui dit ça ? Coche.', stufe: 1, personen: ['Léa', 'Rui', 'Amira'], saetze: [['J’ai 13 ans.', 'Rui'], ['J’aime le basket.', 'Léa'], ['J’adore dessiner.', 'Amira'], ['J’ai 12 ans.', ['Léa', 'Amira']], ['Je parle portugais.', 'Rui']] },
        { art: 'tabelle', auftrag: 'Complète la fiche de Léa.', stufe: 2, kopf: ['', 'Léa'], breiten: [35, 65], zeilen: [['Âge', '[12 ans]'], ['Ville', '[Esch-sur-Alzette]'], ['Elle aime …', '[la musique et le basket]']] },
      ],
    },
    hoeren: {
      was: 'Le premier jour', wo: 'Premier jour · salle de classe', titel: 'Bonjour, Madame !',
      situation: 'C’est le premier jour. Mme Nouvelle, la professeure de français, accueille la classe. Elle parle avec Léa et Rui.',
      bild: ['lehrerin:froh:erklaeren', 'lea:froh'], sprecher: { 'Mme Nouvelle': 'w1', Léa: 'w2', Rui: 'm3' },
      text: [
        ['Mme Nouvelle', 'Bonjour à tous ! Je m’appelle Madame Nouvelle. Je suis votre professeure de français.'],
        ['Léa', 'Bonjour, Madame !'],
        ['Mme Nouvelle', 'Bonjour ! Comment tu t’appelles ?'],
        ['Léa', 'Je m’appelle Léa.'],
        ['Mme Nouvelle', 'Et tu as quel âge, Léa ?'],
        ['Léa', 'J’ai douze ans.'],
        ['Mme Nouvelle', 'Merci, Léa. Et toi ?'],
        ['Rui', 'Moi, c’est Rui. J’ai treize ans.'],
        ['Mme Nouvelle', 'Enchantée, Rui ! Bienvenue dans la classe.'],
        ['Rui', 'Merci, Madame. Excusez-moi, vous pouvez répéter votre nom, s’il vous plaît ?'],
        ['Mme Nouvelle', 'Bien sûr : Nouvelle. Madame Nouvelle.'],
      ],
      vor: [{ art: 'rf', auftrag: 'Pour dire bonjour ou pour dire au revoir ? Coche.', stufe: 1, spalten: ['bonjour', 'au revoir'], saetze: [['Bonjour !', true], ['Au revoir !', false], ['Coucou !', true], ['À demain !', false], ['Bonne journée !', false]] }],
      beim: [
        { art: 'mc', auftrag: 'Écoute et coche.', stufe: 1, fragen: [{ f: 'Mme Nouvelle est professeure de …', o: ['maths', 'français', 'sport'], r: 1 }, { f: 'Léa a …', o: ['douze ans', 'treize ans'], r: 0 }, { f: 'Rui a …', o: ['douze ans', 'treize ans'], r: 1 }, { f: 'Rui demande …', o: ['de répéter le nom', 'l’heure'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Présentez-vous à deux. Ensuite, présente ton ou ta partenaire à la classe.', stufe: 3, karten: [
        { titel: 'Se présenter', text: ['Bonjour ! Je m’appelle …', 'J’ai … ans.', 'J’habite à …'] },
        { titel: 'Demander', text: ['Comment tu t’appelles ?', 'Tu as quel âge ?', 'Tu habites où ?'] },
        { titel: 'Pas compris ?', text: ['Pardon ?', 'Tu peux répéter, s’il te plaît ?', 'Vous pouvez répéter, s’il vous plaît ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'être et avoir', tabelle: { kopf: ['', 'être', 'avoir'], zeilen: [['je / j’', '**suis**', '**ai**'], ['tu', '**es**', '**as**'], ['il / elle', '**est**', '**a**'], ['nous', '**sommes**', '**avons**'], ['vous', '**êtes**', '**avez**'], ['ils / elles', '**sont**', '**ont**']] } },
         { titel: 'Se présenter', punkte: ['Je **m’appelle** Léa. · Moi, **c’est** Rui.', 'J’**ai** 12 ans. (avec **avoir** !)', 'Je **suis** portugais.', 'J’**habite à** Esch.'] }],
        [{ titel: 'Les nombres de 0 à 20', punkte: ['0 zéro · 1 un · 2 deux · 3 trois · 4 quatre · 5 cinq', '6 six · 7 sept · 8 huit · 9 neuf · 10 dix', '11 onze · 12 douze · 13 treize · 14 quatorze · 15 quinze', '16 seize · 17 dix-sept · 18 dix-huit · 19 dix-neuf · 20 vingt'] }],
        [{ art: 'tipp', titel: 'tu ou vous ?', text: '**tu** : copains, famille, enfants. **vous** : professeurs, adultes qu’on ne connaît pas – ou plusieurs personnes. Bonjour, **Madame** ! · Bonjour, **Monsieur** !' },
         { art: 'achtung', titel: 'Attention !', text: 'Allemand : Ich **bin** 12. Français : J’**ai** 12 ans. (avec **avoir**)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec être ou avoir.', stufe: 1, saetze: ['Je [suis] Rui.', 'J’[ai] treize ans.', 'Tu [as] quel âge ?', 'Elle [est] professeure.', 'Vous [êtes] Madame Nouvelle ?', 'Il [a] douze ans.'] },
      { art: 'luecken', auftrag: 'Écris les nombres en lettres.', stufe: 1, saetze: ['5 = [cinq]', '8 = [huit]', '11 = [onze]', '12 = [douze]', '15 = [quinze]', '20 = [vingt]'] },
      { art: 'abschreiben', auftrag: 'tu ou vous ? Écris la question pour la professeure.', stufe: 2, kopf: ['à un copain (tu)', 'à la professeure (vous)'], saetze: [['Comment tu t’appelles ?', 'Comment vous vous appelez ?'], ['Tu peux répéter ?', 'Vous pouvez répéter ?'], ['Tu as quel âge ?', 'Vous avez quel âge ?']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un petit texte pour la page web de la classe : présente-toi (ou une personne imaginaire).', stufe: 2,
        anfaenge: ['Salut ! Je m’appelle …', 'J’ai … ans.', 'J’habite à …', 'Je parle …', 'J’aime …'], zeilen: 8,
        beispiel: 'Salut ! Je m’appelle Tom. J’ai douze ans. J’habite à Mersch. Je parle luxembourgeois, allemand et un peu français. J’aime le foot et les jeux vidéo.' },
    ],
    check: ['Je salue et je dis au revoir.', 'Je dis mon nom et mon âge.', 'Je comprends quand quelqu’un se présente.', 'Je sais quand je dis tu ou vous.', 'Je compte jusqu’à 20.'],
  },
  // ================================================================ 2
  {
    thema: 'Pays · nationalités · langues', titel: 'Tu viens d’où ?', untertitel: 'Le Luxembourg, le Portugal, la France… : tu dis d’où viennent des personnes, quelles langues elles parlent – et tu accordes les nationalités.',
    ziel: { fr: 'Je dis d’où viennent des personnes et quelles langues elles parlent.', de: 'Ich sage, woher Personen kommen und welche Sprachen sie sprechen.' },
    bild: ['amira:froh:blatt', 'yusuf:froh:erklaeren'],
    start: {
      was: 'Les pays',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Relie le pays et le mot allemand.', stufe: 1, links: ['le Luxembourg', 'la France', 'l’Allemagne', 'la Belgique', 'le Portugal', 'l’Italie'], rechts: ['Luxemburg', 'Frankreich', 'Deutschland', 'Belgien', 'Portugal', 'Italien'], ordnung: [3, 0, 5, 2, 4, 1] },
        { art: 'mc', auftrag: 'Quels pays sont voisins du Luxembourg ? Coche.', stufe: 1, fragen: [{ f: '', o: ['la France', 'l’Allemagne', 'la Belgique', 'le Portugal'], r: [0, 1, 2] }] },
      ],
    },
    lesen: {
      was: 'Trois fiches', art: 'dokumente',
      quelle: 'Club « Langues du monde » (personnes imaginaires)', titel: 'Les membres du club',
      dokumente: [
        { stil: 'nachricht', stimme: 'm3', kopf: '**Fiche** – Yusuf Demir', text: ['**Âge :** 13 ans · **Né à :** Istanbul (Turquie) · **Nationalité :** turc', '**Habite à :** Differdange', '**Langues :** turc, luxembourgeois, allemand, français'] },
        { stil: 'nachricht', stimme: 'w2', kopf: '**Fiche** – Inès Ferreira', text: ['**Âge :** 12 ans · **Née à :** Luxembourg · **Nationalités :** portugaise et luxembourgeoise', '**Habite à :** Ettelbruck', '**Langues :** portugais, luxembourgeois, allemand, français'] },
        { stil: 'nachricht', stimme: 'm1', kopf: '**Fiche** – Luca Bianchi', text: ['**Âge :** 14 ans · **Né à :** Arlon (Belgique) · **Nationalité :** belge', '**Habite à :** Steinfort', '**Langues :** français, anglais, un peu luxembourgeois'] },
      ],
      woerter: [['la fiche', 'das Formular, die Karte'], ['né / née à', 'geboren in'], ['la nationalité', 'die Staatsangehörigkeit'], ['la langue', 'die Sprache'], ['le pays', 'das Land'], ['la ville', 'die Stadt'], ['le monde', 'die Welt'], ['habiter', 'wohnen']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète le tableau.', stufe: 1, kopf: ['', 'Yusuf', 'Inès', 'Luca'], breiten: [22, 26, 26, 26], zeilen: [['Âge', '[13 ans]', '[12 ans]', '[14 ans]'], ['Nationalité', '[turc]', '[portugaise et luxembourgeoise]', '[belge]'], ['Habite à', '[Differdange]', '[Ettelbruck]', '[Steinfort]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Inès est née à Luxembourg.', true], ['Luca parle très bien luxembourgeois.', false], ['Yusuf parle quatre langues.', true], ['Luca habite en Belgique.', false]] },
      ],
    },
    hoeren: {
      was: 'Une interview', wo: 'Radio de l’école · interview', titel: 'Ici, on parle combien de langues ?',
      situation: 'Pour la radio de l’école, Chloé interviewe Yusuf et Inès sur leurs pays et leurs langues.',
      bild: ['chloe:froh:handy', 'yusuf:froh'], sprecher: { Chloé: 'w2', Yusuf: 'm3', Inès: 'w3' },
      text: [
        ['Chloé', 'Bonjour ! Aujourd’hui, à la radio de l’école : les langues de notre classe. Yusuf, tu viens d’où ?'],
        ['Yusuf', 'Je viens de Turquie. Je suis né à Istanbul. Maintenant, j’habite à Differdange.'],
        ['Chloé', 'Et tu parles quelles langues ?'],
        ['Yusuf', 'Je parle turc à la maison, luxembourgeois avec mes copains et français à l’école.'],
        ['Chloé', 'Super ! Et toi, Inès ?'],
        ['Inès', 'Moi, je suis portugaise et luxembourgeoise. Je suis née ici, à Luxembourg.'],
        ['Chloé', 'Tu parles portugais ?'],
        ['Inès', 'Oui, bien sûr ! Et je parle aussi luxembourgeois, allemand et français. Et j’apprends l’anglais.'],
        ['Chloé', 'Waouh, cinq langues ! Merci à vous deux !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Au Luxembourg, on parle quelles langues ? Coche.', stufe: 1, fragen: [{ f: '', o: ['le luxembourgeois', 'le français', 'l’allemand', 'le japonais'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'Yusuf', 'Inès'], breiten: [30, 35, 35], zeilen: [['Né(e) à …', '[Istanbul]', '[Luxembourg]'], ['Langues', '[turc, luxembourgeois, français]', '[portugais, luxembourgeois, allemand, français, anglais]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Faites une interview pour la radio de l’école : pays, ville, langues. Tu peux aussi jouer un personnage imaginaire.', stufe: 3, karten: [
        { titel: 'Demander', text: ['Tu viens d’où ?', 'Tu habites où ?', 'Tu parles quelles langues ?'] },
        { titel: 'Répondre', text: ['Je viens de … / du …', 'J’habite à …', 'Je parle … et un peu …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les nationalités : masculin et féminin', tabelle: { kopf: ['il', 'elle'], zeilen: [['français', 'français**e**'], ['luxembourgeois', 'luxembourgeois**e**'], ['portugais', 'portugais**e**'], ['allemand', 'allemand**e**'], ['italien', 'italien**ne**'], ['belge', 'belge']] } },
         { titel: 'Les pays avec article', punkte: ['**le** Luxembourg, **le** Portugal', '**la** France, **la** Belgique (souvent en **-e**)', '**l’**Allemagne, **l’**Italie (voyelle)', 'J’habite **au** Portugal · **en** France · **à** Luxembourg (ville)'] }],
        [{ art: 'tipp', titel: 'Les majuscules', text: 'Les **pays** ont une majuscule : la **F**rance. Les **langues** et les **nationalités** non : je parle **f**rançais, il est **p**ortugais.' },
         { art: 'achtung', titel: 'Je viens de …', text: 'Je viens **de** France · **du** Portugal · **d’**Italie · **des** Pays-Bas.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec la nationalité au féminin.', stufe: 1, saetze: ['Rui est portugais. Inès est [portugaise].', 'Luca est belge. Son amie Julie est [belge].', 'Yusuf est turc. Son amie Elif est [turque].', 'Tom est luxembourgeois. Mia est [luxembourgeoise].', 'Lucas est français. Chloé est [française].'] },
      { art: 'luecken', auftrag: 'Complète avec le, la ou l’.', stufe: 1, saetze: ['[la] France', '[le] Portugal', '[l’] Allemagne', '[la] Belgique', '[le] Luxembourg', '[l’] Italie'] },
    ],
    schreiben: [
      { art: 'steckbrief', auftrag: 'Complète une fiche pour le club « Langues du monde » – pour toi ou pour une personne imaginaire.', stufe: 1, bildText: 'Dessine un drapeau ou un symbole.', felder: ['Nom', 'Âge', 'Né(e) à', 'Nationalité', 'Habite à', 'Langues'] },
      { art: 'schreiben', auftrag: 'Écris quatre phrases sur la personne de ta fiche.', stufe: 2,
        anfaenge: ['Il / Elle s’appelle …', 'Il / Elle vient de …', 'Il / Elle habite à …', 'Il / Elle parle …'], zeilen: 6,
        beispiel: 'Elle s’appelle Sofia. Elle vient d’Italie. Elle habite à Dudelange. Elle parle italien, français et un peu luxembourgeois.' },
    ],
    check: ['Je dis d’où je viens et où j’habite.', 'Je comprends une fiche sur une personne.', 'Je connais des pays avec le bon article.', 'J’accorde les nationalités (masculin, féminin).', 'Je remplis une fiche.'],
  },
  // ================================================================ 3
  {
    thema: 'Les nombres · l’alphabet', titel: 'Ton numéro, s’il te plaît !', untertitel: 'Tu t’inscris au club de foot : tu donnes ton adresse et ton numéro de téléphone, et tu épelles ton nom.',
    ziel: { fr: 'Je comprends et je dis des nombres, j’épelle mon nom et je remplis un formulaire.', de: 'Ich verstehe und sage Zahlen, buchstabiere meinen Namen und fülle ein Formular aus.' },
    bild: ['noah:froh:handy', 'lehrer:froh:blatt'],
    start: {
      was: 'Les nombres',
      aufgaben: [
        { art: 'luecken', auftrag: 'Complète la suite.', stufe: 1, saetze: ['dix, vingt, [trente], quarante', 'vingt et un, vingt-deux, [vingt-trois]', 'trente, [quarante], cinquante, soixante', 'onze, douze, treize, [quatorze]'] },
      ],
    },
    lesen: {
      was: 'Une affiche et un formulaire', art: 'dokumente',
      quelle: 'Club de foot (imaginaire)', titel: 'On cherche des joueurs !',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**FC Les Étoiles** – Nouveaux joueurs et joueuses !', text: ['Pour les jeunes de 11 à 14 ans · Entraînement : mercredi et vendredi, de 17 h à 18 h 30', 'Lieu : stade municipal, rue du Parc · Prix : 40 € par an', 'Inscription : samedi matin, de 10 h à 12 h, au club'] },
        { stil: 'nachricht', stimme: 'm1', kopf: '**Formulaire d’inscription**', text: ['Nom : Pereira · Prénom : Noah', 'Date de naissance : 12 mars 2014 · Âge : 12 ans', 'Adresse : 7, rue des Lilas, Ettelbruck', 'Téléphone : 12 34 56 · Courriel : noah.pereira@exemple.lu'] },
      ],
      woerter: [['le club', 'der Verein'], ['l’entraînement', 'das Training'], ['le joueur, la joueuse', 'der Spieler, die Spielerin'], ['l’inscription', 'die Anmeldung'], ['le prénom', 'der Vorname'], ['la date de naissance', 'das Geburtsdatum'], ['l’adresse', 'die Adresse'], ['le courriel', 'die E-Mail']],
      aufgaben: [
        { art: 'mc', auftrag: 'Lis l’affiche et coche.', stufe: 1, fragen: [{ f: 'L’entraînement, c’est quand ?', o: ['lundi et mardi', 'mercredi et vendredi'], r: 1 }, { f: 'Ça coûte combien ?', o: ['14 €', '40 €', '400 €'], r: 1 }, { f: 'Le club est pour les jeunes de …', o: ['8 à 10 ans', '11 à 14 ans'], r: 1 }] },
        { art: 'fragen', auftrag: 'Lis le formulaire et réponds.', stufe: 2, fragen: [{ f: 'Quel est le prénom du garçon ?', l: 'Noah' }, { f: 'Il habite où ?', l: '7, rue des Lilas, à Ettelbruck' }, { f: 'Quelle est sa date de naissance ?', l: 'le 12 mars 2014' }] },
      ],
    },
    hoeren: {
      was: 'Une inscription', wo: 'Au club de foot · inscription', titel: 'Tu peux épeler, s’il te plaît ?',
      situation: 'Noah s’inscrit au club de foot. L’entraîneur, M. Laurent, remplit le formulaire avec lui.',
      bild: ['lehrer:froh:blatt', 'noah:froh'], sprecher: { 'M. Laurent': 'm2', Noah: 'm3' },
      text: [
        ['M. Laurent', 'Bonjour ! Tu veux t’inscrire au club ?'],
        ['Noah', 'Oui, s’il vous plaît.'],
        ['M. Laurent', 'Très bien. Tu t’appelles comment ?'],
        ['Noah', 'Noah Pereira.'],
        ['M. Laurent', 'Tu peux épeler ton nom de famille ?'],
        ['Noah', 'Oui : P, E, R, E, I, R, A.'],
        ['M. Laurent', 'Merci. Tu as quel âge ?'],
        ['Noah', 'J’ai douze ans.'],
        ['M. Laurent', 'Et ton adresse ?'],
        ['Noah', 'Sept, rue des Lilas, à Ettelbruck.'],
        ['M. Laurent', 'Et ton numéro de téléphone ?'],
        ['Noah', 'C’est le douze, trente-quatre, cinquante-six.'],
        ['M. Laurent', 'Parfait. L’entraînement commence mercredi à dix-sept heures. À mercredi !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour s’inscrire dans un club, on donne … Coche.', stufe: 1, fragen: [{ f: '', o: ['son nom', 'son adresse', 'son numéro de téléphone', 'sa note de maths'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète le formulaire.', stufe: 1, kopf: ['Formulaire', ''], breiten: [36, 64], zeilen: [['Nom', '[Pereira]'], ['Prénom', '[Noah]'], ['Âge', '[12 ans]'], ['Adresse', '[7, rue des Lilas, Ettelbruck]'], ['Téléphone', '[12 34 56]'], ['Premier entraînement', '[mercredi, 17 h]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jouez l’inscription au club à deux. Inventez un nom, une adresse et un numéro.', stufe: 3, karten: [
        { titel: 'Entraîneur / Entraîneuse', text: ['Tu t’appelles comment ?', 'Tu peux épeler ?', 'Quelle est ton adresse ?', 'Quel est ton numéro de téléphone ?'] },
        { titel: 'Jeune', text: ['Je m’appelle …', 'Ça s’écrit …', 'J’habite …', 'C’est le …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les nombres de 20 à 69', punkte: ['20 vingt · 21 vingt **et** un · 22 vingt-deux', '30 trente · 31 trente **et** un · 35 trente-cinq', '40 quarante · 50 cinquante · 60 soixante', '61 soixante **et** un · 69 soixante-neuf', 'Au téléphone, on dit les chiffres **par deux** : 12 34 56 = douze, trente-quatre, cinquante-six.'] },
         { titel: 'L’alphabet', punkte: ['A a · B bé · C cé · D dé · E e · F effe · G gé', 'H ache · I i · J ji · K ka · L elle · M emme · N enne', 'O o · P pé · Q ku · R erre · S esse · T té · U u', 'V vé · W double vé · X ixe · Y i grec · Z zède'] }],
        [{ art: 'tipp', titel: 'Les questions', text: 'Tu t’appelles **comment** ? · Tu as **quel** âge ? · **Quelle** est ton adresse ? · **Quel** est ton numéro de téléphone ?' },
         { art: 'achtung', titel: 'E et I', text: 'En français, le **E** se dit presque comme « ö » en allemand, et le **I** comme « i ». Écoute bien la différence !' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Écris les nombres en lettres.', stufe: 1, saetze: ['21 = [vingt et un]', '34 = [trente-quatre]', '47 = [quarante-sept]', '56 = [cinquante-six]', '68 = [soixante-huit]'] },
      { art: 'abschreiben', auftrag: 'Écris la question.', stufe: 2, kopf: ['réponse', 'question'], saetze: [['Je m’appelle Noah.', 'Tu t’appelles comment ?'], ['J’ai douze ans.', 'Tu as quel âge ?'], ['J’habite à Ettelbruck.', 'Tu habites où ?'], ['C’est le 12 34 56.', 'Quel est ton numéro de téléphone ?']] },
    ],
    schreiben: [
      { art: 'steckbrief', auftrag: 'Remplis le formulaire pour une personne imaginaire (nom, adresse et numéro inventés).', stufe: 1, bildText: 'Dessine la personne.', felder: ['Nom', 'Prénom', 'Âge', 'Adresse', 'Téléphone', 'Sport préféré'] },
      { art: 'schreiben', auftrag: 'Écris un SMS à un copain : tu t’inscris au club. Donne le jour et l’heure de l’entraînement.', stufe: 2,
        anfaenge: ['Salut … !', 'Je m’inscris au club de …', 'L’entraînement, c’est le … à …', 'Tu viens avec moi ?'], zeilen: 5,
        beispiel: 'Salut Tom ! Je m’inscris au club de foot. L’entraînement, c’est le mercredi à 17 heures. Tu viens avec moi ? À plus !' },
    ],
    check: ['Je compte jusqu’à 69.', 'J’épelle mon nom.', 'Je comprends un numéro de téléphone.', 'Je remplis un formulaire.', 'Je pose des questions avec comment, quel, où.'],
  },
  // ================================================================ 4
  {
    thema: 'Le matériel scolaire · un, une, des · mon, ma, mes', titel: 'Dans mon sac, il y a…', untertitel: 'Stylo, cahier, trousse : tu dis ce qu’il y a dans ton sac, tu demandes quelque chose à un copain – et tu fais ta liste.',
    ziel: { fr: 'Je nomme mon matériel scolaire et je demande quelque chose poliment.', de: 'Ich nenne mein Schulmaterial und bitte höflich um etwas.' },
    bild: ['chloe:froh:blatt', 'tom:verwirrt'],
    start: {
      was: 'Le matériel',
      aufgaben: [
        { art: 'symbole', auftrag: 'Qu’est-ce que c’est ? Écris le mot.', stufe: 1, woerter: ['un stylo', 'un crayon', 'une gomme', 'une règle', 'des ciseaux', 'un livre', 'un cahier', 'une calculatrice'],
          symbole: [['ballpen', 'un stylo'], ['pencil', 'un crayon'], ['eraser', 'une gomme'], ['ruler', 'une règle'], ['scissors', 'des ciseaux'], ['book', 'un livre'], ['notebook', 'un cahier'], ['calculator', 'une calculatrice']] },
      ],
    },
    lesen: {
      was: 'Une liste et un message', art: 'dokumente',
      quelle: 'Liste de la classe et message sur le portable (personnes imaginaires)', titel: 'Le matériel pour l’école',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Liste de matériel** – classe 7P2', text: ['**Pour tous les cours :** une trousse avec deux stylos bleus, un crayon, une gomme, une règle et des ciseaux.', '**Pour le français :** un cahier rouge et un dictionnaire.', '**Pour les maths :** une calculatrice et un cahier à carreaux.', '**Pour le sport, il faut :** des baskets, un short, un tee-shirt et une bouteille d’eau.'] },
        { stil: 'nachricht', stimme: 'w2', kopf: 'Message de Chloé à Tom', text: ['Salut Tom ! Demain, on a sport. N’oublie pas tes baskets ! Et tu as mon cahier de maths ? C’est le cahier vert avec un chat. Il est dans ton sac ? Merci !'] },
      ],
      woerter: [['la trousse', 'das Mäppchen'], ['le stylo', 'der Kuli'], ['la gomme', 'der Radiergummi'], ['la règle', 'das Lineal'], ['les ciseaux', 'die Schere'], ['à carreaux', 'kariert'], ['il faut', 'man braucht'], ['oublier', 'vergessen']],
      aufgaben: [
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['Pour tous les cours, il faut deux stylos bleus.', true], ['Pour le français, il faut une calculatrice.', false], ['Pour le sport, il faut des baskets.', true], ['Le cahier de maths de Chloé est rouge.', false]] },
        { art: 'tabelle', auftrag: 'Quel cours ? Écris le matériel.', stufe: 2, kopf: ['cours', 'matériel'], breiten: [25, 75], zeilen: [['français', '[un cahier rouge, un dictionnaire]'], ['maths', '[une calculatrice, un cahier à carreaux]'], ['sport', '[des baskets, un short, un tee-shirt, une bouteille d’eau]']] },
      ],
    },
    hoeren: {
      was: 'Avant le cours', wo: 'Salle de classe · avant le cours', titel: 'Tu as un stylo ?',
      situation: 'Le cours commence. Tom cherche son matériel. Il demande à Chloé et à Mme Nouvelle.',
      bild: ['tom:verwirrt', 'chloe:froh'], sprecher: { Tom: 'm3', Chloé: 'w2', 'Mme Nouvelle': 'w1' },
      text: [
        ['Tom', 'Oh non ! Je n’ai pas mon stylo. Chloé, tu as un stylo pour moi, s’il te plaît ?'],
        ['Chloé', 'Oui, voilà. Un stylo bleu.'],
        ['Tom', 'Merci ! Et est-ce que je peux prendre ta règle ?'],
        ['Chloé', 'Désolée, je n’ai pas de règle aujourd’hui.'],
        ['Mme Nouvelle', 'Tom, tu as ton cahier de français ?'],
        ['Tom', 'Euh… non, Madame. Il est à la maison. Est-ce que je peux écrire sur une feuille ?'],
        ['Mme Nouvelle', 'D’accord, pour aujourd’hui. Mais demain, tu apportes ton cahier, s’il te plaît.'],
        ['Tom', 'Oui, Madame. Promis !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Pour demander quelque chose poliment, on dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['Est-ce que je peux …, s’il te plaît ?', 'Donne !', 'Tu as …, s’il te plaît ?'], r: [0, 2] }] }],
      beim: [
        { art: 'rf', auftrag: 'Écoute. Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['Tom n’a pas de stylo.', true], ['Chloé donne un stylo rouge à Tom.', false], ['Chloé n’a pas de règle aujourd’hui.', true], ['Le cahier de Tom est dans son sac.', false], ['Tom écrit sur une feuille.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jouez à deux : demandez du matériel. Répondez oui ou non.', stufe: 3, karten: [
        { titel: 'Demander', text: ['Tu as …, s’il te plaît ?', 'Est-ce que je peux prendre ton / ta … ?'] },
        { titel: 'Répondre', text: ['Oui, voilà !', 'Désolé(e), je n’ai pas de …', 'Bien sûr !'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'un, une, des · mon, ma, mes · ton, ta, tes', tabelle: { kopf: ['', 'masculin', 'féminin', 'pluriel'], zeilen: [['article indéfini', '**un** stylo', '**une** règle', '**des** ciseaux'], ['à moi', '**mon** stylo', '**ma** règle', '**mes** ciseaux'], ['à toi', '**ton** stylo', '**ta** règle', '**tes** ciseaux']] } }],
        [{ titel: 'La négation', punkte: ['J’ai **un** stylo. → Je **n’**ai **pas de** stylo.', 'Il y a **une** règle. → Il **n’**y a **pas de** règle.', 'Après **pas**, un / une / des → **de** (d’).', 'Pluriel : un stylo → deux stylo**s**'] },
         { art: 'tipp', titel: 'Demander poliment', text: 'Tu as un stylo, **s’il te plaît** ? · **Est-ce que je peux** prendre ta gomme ? · Merci ! – **De rien.**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec un, une ou des.', stufe: 1, saetze: ['[un] stylo', '[une] trousse', '[des] ciseaux', '[une] calculatrice', '[un] cahier', '[des] baskets'] },
      { art: 'luecken', auftrag: 'Complète avec mon, ma ou mes.', stufe: 1, saetze: ['[mon] sac', '[ma] gomme', '[mes] crayons', '[ma] trousse', '[mon] livre'] },
      { art: 'abschreiben', auftrag: 'Écris la phrase négative.', stufe: 2, kopf: ['phrase', 'négation'], saetze: [['J’ai une règle.', 'Je n’ai pas de règle.'], ['J’ai des ciseaux.', 'Je n’ai pas de ciseaux.'], ['Il y a un dictionnaire.', 'Il n’y a pas de dictionnaire.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Qu’est-ce qu’il y a dans ton sac (ou dans un sac imaginaire) ? Écris quatre phrases.', stufe: 2,
        anfaenge: ['Dans mon sac, il y a …', 'J’ai … et …', 'Je n’ai pas de …', 'Ma trousse est …'], zeilen: 7,
        beispiel: 'Dans mon sac, il y a deux cahiers, un livre et ma trousse. J’ai un stylo bleu et un crayon. Je n’ai pas de calculatrice. Ma trousse est verte.' },
    ],
    check: ['Je nomme mon matériel scolaire.', 'J’utilise un, une, des.', 'J’utilise mon, ma, mes.', 'Je fais une phrase négative avec pas de.', 'Je demande poliment quelque chose.'],
  },
  // ================================================================ 5
  {
    thema: 'L’école · il y a · les consignes', titel: 'Bienvenue au lycée !', untertitel: 'Salles, cantine, cour : tu comprends la présentation d’une école et les consignes en classe – et tu décris ton école.',
    ziel: { fr: 'Je décris mon école et je comprends les consignes en classe.', de: 'Ich beschreibe meine Schule und verstehe Anweisungen im Unterricht.' },
    bild: ['lehrerin:froh:stehen-zeigen', 'amira:froh:stehen'],
    start: {
      was: 'Les lieux de l’école',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Qu’est-ce qu’on fait où ? Relie.', stufe: 1, links: ['la cantine', 'la bibliothèque', 'la salle de sport', 'la cour', 'le secrétariat'], rechts: ['On mange.', 'On lit et on emprunte des livres.', 'On fait du sport.', 'On joue pendant la récréation.', 'On demande des informations.'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'La présentation d’une école', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Site internet d’un lycée (imaginaire)', titel: 'Notre lycée',
      absaetze: [
        'Bienvenue au Lycée des Trois Rivières ! Notre lycée **est** grand et moderne. **Il y a** 600 élèves et 70 professeurs.',
        'Au rez-de-chaussée, **il y a** la cantine, le secrétariat et une grande bibliothèque. À la cantine, on mange à midi.',
        'Au premier étage, **il y a** les salles de classe et deux salles d’informatique. Au deuxième étage, **il y a** les salles de sciences et une salle de musique.',
        'Derrière le lycée, **il y a** une salle de sport et un terrain de foot. Dans la cour, **il y a** des bancs et des tables de ping-pong.',
        '**Il n’y a pas de** piscine. Pour la natation, les élèves vont à la piscine de la ville en bus.',
      ],
      woerter: [['le lycée', 'die Sekundarschule'], ['l’élève', 'der Schüler, die Schülerin'], ['le rez-de-chaussée', 'das Erdgeschoss'], ['le premier étage', 'der erste Stock'], ['la cantine', 'die Kantine'], ['derrière', 'hinter'], ['la cour', 'der Schulhof'], ['la piscine', 'das Schwimmbad']],
      aufgaben: [
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 1, spalten: ['vrai', 'faux'], saetze: [['Il y a 600 élèves.', true], ['La bibliothèque est au premier étage.', false], ['Il y a deux salles d’informatique.', true], ['Il y a une piscine au lycée.', false]] },
        { art: 'tabelle', auftrag: 'Où est … ? Complète.', stufe: 2, kopf: ['', 'où ?'], breiten: [40, 60], zeilen: [['la cantine', '[au rez-de-chaussée]'], ['les salles de classe', '[au premier étage]'], ['la salle de musique', '[au deuxième étage]'], ['la salle de sport', '[derrière le lycée]']] },
      ],
    },
    hoeren: {
      was: 'Des consignes en classe', wo: 'Salle de classe · début du cours', titel: 'Ouvrez vos livres !',
      situation: 'Mme Nouvelle commence le cours. Elle donne des consignes à la classe. Écoute et fais les gestes !',
      bild: ['lehrerin:froh:erklaeren', 'sami:verwirrt'], sprecher: { 'Mme Nouvelle': 'w1', Sami: 'm3' },
      text: [
        ['Mme Nouvelle', 'Bonjour tout le monde ! Asseyez-vous, s’il vous plaît.'],
        ['Mme Nouvelle', 'Sami, ferme la porte, s’il te plaît.'],
        ['Sami', 'Oui, Madame.'],
        ['Mme Nouvelle', 'Merci. Maintenant, ouvrez vos livres à la page douze.'],
        ['Mme Nouvelle', 'Lisez le texte en silence. Ensuite, soulignez les mots nouveaux.'],
        ['Sami', 'Madame, je ne comprends pas. Vous pouvez répéter, s’il vous plaît ?'],
        ['Mme Nouvelle', 'Bien sûr. Page douze. Lisez le texte et soulignez les mots nouveaux.'],
        ['Mme Nouvelle', 'Très bien. Maintenant, rangez vos affaires. C’est la récréation !'],
      ],
      vor: [{ art: 'mc', auftrag: 'Une consigne, c’est … Coche.', stufe: 1, fragen: [{ f: '', o: ['une phrase qui dit ce qu’il faut faire', 'une note'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Écoute. Mets les consignes dans l’ordre.', stufe: 1, teile: ['Asseyez-vous.', 'Ferme la porte.', 'Ouvrez vos livres à la page 12.', 'Lisez le texte en silence.', 'Soulignez les mots nouveaux.', 'Rangez vos affaires.'], ordnung: [3, 0, 5, 2, 4, 1] },
        { art: 'fragen', auftrag: 'Sami ne comprend pas. Qu’est-ce qu’il dit ?', stufe: 2, fragen: [{ f: '', l: 'Vous pouvez répéter, s’il vous plaît ?' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Jeu « Jacques a dit » : une personne donne des consignes, les autres font les gestes.', stufe: 3, karten: [
        { titel: 'Consignes', text: ['Lève-toi ! · Levez-vous !', 'Assieds-toi ! · Asseyez-vous !', 'Ouvre ton livre ! · Fermez vos livres !', 'Lève la main !', 'Viens au tableau !'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'il y a · il n’y a pas de', punkte: ['Dans mon école, **il y a** une cantine.', '**Il y a** des tables de ping-pong.', '**Il n’y a pas de** piscine.', 'Question : Est-ce qu’**il y a** une bibliothèque ?'] },
         { titel: 'Les consignes : tu et vous', tabelle: { kopf: ['tu', 'vous'], zeilen: [['Écoute !', 'Écoutez !'], ['Lis !', 'Lisez !'], ['Écris !', 'Écrivez !'], ['Ouvre ton livre !', 'Ouvrez vos livres !'], ['Assieds-toi !', 'Asseyez-vous !']] } }],
        [{ art: 'tipp', titel: 'Où ?', text: '**au** rez-de-chaussée · **au** premier étage · **derrière** le lycée · **devant** la cantine · **à côté de** la bibliothèque' },
         { art: 'achtung', titel: 'Je ne comprends pas', text: 'C’est normal ! Dis : **Je ne comprends pas.** · **Vous pouvez répéter, s’il vous plaît ?** · **Comment on dit … en français ?**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Complète avec il y a ou il n’y a pas de.', stufe: 1, saetze: ['✓ Dans notre école, [il y a] une cantine.', '✗ Dans notre école, [il n’y a pas de] piscine.', '✓ Dans la cour, [il y a] des bancs.', '✗ Dans la classe, [il n’y a pas de] télévision.'] },
      { art: 'abschreiben', auftrag: 'Écris la consigne pour toute la classe (vous).', stufe: 2, kopf: ['à un élève (tu)', 'à la classe (vous)'], saetze: [['Écoute !', 'Écoutez !'], ['Ferme la porte !', 'Fermez la porte !'], ['Lis le texte !', 'Lisez le texte !']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Décris ton école (ou une école de rêve) : qu’est-ce qu’il y a ? Qu’est-ce qu’il n’y a pas ?', stufe: 2,
        anfaenge: ['Mon école s’appelle …', 'Il y a … élèves.', 'Au rez-de-chaussée, il y a …', 'Il n’y a pas de …', 'J’aime …'], zeilen: 8,
        beispiel: 'Mon école s’appelle le Lycée du Parc. Il y a 400 élèves. Au rez-de-chaussée, il y a la cantine et la bibliothèque. Il n’y a pas de piscine. J’aime la cour avec les tables de ping-pong.' },
    ],
    check: ['Je comprends la présentation d’une école.', 'Je décris mon école avec il y a.', 'Je dis ce qu’il n’y a pas.', 'Je comprends les consignes en classe.', 'Je dis quand je ne comprends pas.'],
  },
  // ================================================================ 6
  {
    thema: 'L’heure · l’emploi du temps', titel: 'Quelle heure est-il ?', untertitel: 'L’horloge, les jours, l’emploi du temps et une annonce au haut-parleur : tu t’organises à l’école.',
    ziel: { fr: 'Je dis l’heure, je lis un emploi du temps et je comprends une annonce.', de: 'Ich sage die Uhrzeit, lese einen Stundenplan und verstehe eine Durchsage.' },
    bild: ['yusuf:verwirrt:handy', 'amira:froh:stehen'],
    start: {
      was: 'Les jours de la semaine',
      aufgaben: [
        { art: 'ordnen', auftrag: 'Mets les jours dans l’ordre.', stufe: 1, teile: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'], ordnung: [3, 0, 5, 2, 6, 4, 1] },
      ],
    },
    lesen: {
      was: 'Un emploi du temps et des affiches', art: 'dokumente',
      quelle: 'Tableau d’affichage de l’école (imaginaire)', titel: 'Au tableau d’affichage',
      dokumente: [
        { stil: 'nachricht', stimme: 'w1', kopf: '**Information** – classe 7P2', text: ['Attention ! Mardi, le cours de musique n’a pas lieu dans la salle 105, mais dans la **salle 210**, au deuxième étage.'] },
        { stil: 'karte', stimme: 'm1', kopf: '**Sortie au musée**', text: ['**Jeudi après-midi :** visite du musée d’histoire naturelle.', 'Rendez-vous **à 13 h 15** devant le secrétariat. Retour à l’école **à 16 h**.', 'N’oubliez pas votre autorisation signée !'] },
      ],
      woerter: [['l’emploi du temps', 'der Stundenplan'], ['avoir lieu', 'stattfinden'], ['la salle', 'der Raum'], ['la sortie', 'der Ausflug'], ['le rendez-vous', 'der Treffpunkt'], ['le retour', 'die Rückkehr'], ['l’autorisation', 'die Erlaubnis'], ['signé', 'unterschrieben']],
      aufgaben: [
        { art: 'frei', auftrag: 'Lis l’emploi du temps de la classe 7P2.', stufe: 1, html: emploiDuTemps() },
        { art: 'mc', auftrag: 'Lis l’emploi du temps et les affiches. Coche.', stufe: 1, fragen: [{ f: 'Le lundi, à 8 h, il y a …', o: ['maths', 'français', 'sport'], r: 1 }, { f: 'Le sport, c’est quel jour ?', o: ['lundi et jeudi', 'mardi et vendredi'], r: 0 }, { f: 'Le mercredi après-midi, il y a cours ?', o: ['oui', 'non'], r: 1 }, { f: 'Mardi, la musique est dans la salle …', o: ['105', '210'], r: 1 }] },
        { art: 'fragen', auftrag: 'Réponds sur la sortie au musée.', stufe: 2, fragen: [{ f: 'Le rendez-vous est à quelle heure ? Où ?', l: 'à 13 h 15, devant le secrétariat' }, { f: 'Qu’est-ce qu’il ne faut pas oublier ?', l: 'l’autorisation signée' }] },
      ],
    },
    hoeren: {
      was: 'Une annonce et une conversation', wo: 'École · haut-parleur', titel: 'Votre attention, s’il vous plaît !',
      situation: 'Pendant la récréation, il y a une annonce au haut-parleur. Ensuite, Yusuf parle avec Amira.',
      bild: ['yusuf:verwirrt:handy', 'amira:froh'], sprecher: { Annonce: 'm1', Yusuf: 'm3', Amira: 'w3' },
      text: [
        ['Annonce', 'Votre attention, s’il vous plaît. Aujourd’hui, la cantine ferme à treize heures. Les élèves de septième mangent à midi et quart.'],
        ['Annonce', 'Attention aussi : le bus numéro cinq part à seize heures dix, et pas à seize heures.'],
        ['Yusuf', 'Amira, il est quelle heure ?'],
        ['Amira', 'Il est dix heures moins dix. La récréation finit dans cinq minutes.'],
        ['Yusuf', 'Et après, on a quoi ?'],
        ['Amira', 'Allemand ! Et cet après-midi, on a sport à treize heures trente.'],
        ['Yusuf', 'Super ! J’adore le sport.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Où est-ce qu’on entend des annonces ? Coche.', stufe: 1, fragen: [{ f: '', o: ['à l’école', 'à la gare', 'dans un magasin', 'dans un livre'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète.', stufe: 1, kopf: ['', 'Info'], breiten: [52, 48], zeilen: [['La cantine ferme à …', '[13 h]'], ['Les élèves de septième mangent à …', '[midi et quart (12 h 15)]'], ['Le bus numéro 5 part à …', '[16 h 10]'], ['Il est …', '[dix heures moins dix]'], ['Le sport cet après-midi', '[à 13 h 30]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Comparez vos emplois du temps à deux.', stufe: 3, karten: [
        { titel: 'Demander', text: ['Il est quelle heure ?', 'Tu as quoi le mardi ?', 'À quelle heure tu finis ?'] },
        { titel: 'Répondre', text: ['Il est …', 'Le mardi, à 8 heures, j’ai …', 'Je finis à …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'L’heure', punkte: ['Il est **huit heures**. (8 h 00)', 'Il est huit heures **et quart**. (8 h 15)', 'Il est huit heures **et demie**. (8 h 30)', 'Il est neuf heures **moins le quart**. (8 h 45)', 'Il est **midi** · Il est **minuit**.', 'Officiel : Il est **quatorze heures trente**. (14 h 30)'] },
         { titel: 'Les jours et les moments', punkte: ['lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche', 'le matin · à midi · l’après-midi · le soir', '**le** lundi = tous les lundis', '**à** 8 heures · **de** 8 h **à** 9 h'] }],
        [{ art: 'tipp', titel: 'Demander l’heure', text: 'Il est **quelle heure** ? · **Quelle heure est-il** ? · Tu as cours **à quelle heure** ?' },
         { art: 'achtung', titel: 'Pas de majuscule', text: 'Les jours et les mois s’écrivent en **minuscules** : **l**undi, **j**anvier.' }],
      ],
    },
    ueben: [
      { art: 'uhren', auftrag: 'Quelle heure est-il ? Écris l’heure.', stufe: 1, hilfe: 'Par exemple : neuf heures et quart · minuit et demi · deux heures moins le quart', zeiten: ['7:15', '12:30', '4:45', '8:00'], loesungen: ['sept heures et quart', 'midi et demi', 'cinq heures moins le quart', 'huit heures'] },
      { art: 'luecken', auftrag: 'Complète.', stufe: 2, saetze: ['7 h 30 : Il est sept heures [et demie].', '10 h 15 : Il est dix heures [et quart].', '11 h 45 : Il est [midi] moins le quart.', '14 h 00 : C’est l’[après-midi].'] },
    ],
    schreiben: [
      { art: 'tabelle', auftrag: 'Note tes devoirs et tes rendez-vous de la semaine (vrais ou imaginaires).', stufe: 1, kopf: ['jour', 'devoirs et rendez-vous'], breiten: [24, 76], zeilen: [['lundi', ''], ['mardi', ''], ['mercredi', ''], ['jeudi', ''], ['vendredi', '']] },
      { art: 'schreiben', auftrag: 'Écris un SMS : rappelle à un copain la sortie au musée (jour, heure, lieu).', stufe: 2,
        anfaenge: ['Salut … !', 'N’oublie pas : …', 'Rendez-vous à … devant …', 'À …'], zeilen: 5,
        beispiel: 'Salut Rui ! N’oublie pas : jeudi, on va au musée. Rendez-vous à 13 h 15 devant le secrétariat. Et ton autorisation ! À jeudi !' },
    ],
    check: ['Je dis et je comprends l’heure.', 'Je connais les jours de la semaine.', 'Je lis un emploi du temps.', 'Je comprends une annonce au haut-parleur.', 'Je note mes devoirs et mes rendez-vous.'],
  },
  // ================================================================ 7
  {
    thema: 'Les matières · aimer · la fréquence', titel: 'J’adore le sport !', untertitel: 'Matières préférées, goûts et « combien de fois par semaine ? » : tu dis ce que tu aimes et tu écris des SMS.',
    ziel: { fr: 'Je dis ce que j’aime et ce que je n’aime pas, et combien de fois je fais quelque chose.', de: 'Ich sage, was ich mag und was nicht, und wie oft ich etwas mache.' },
    bild: ['mia:froh:handy', 'ben:froh'],
    start: {
      was: 'Les matières',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Les matières : relie.', stufe: 1, links: ['les maths', 'le français', 'l’allemand', 'les sciences', 'le sport', 'le dessin'], rechts: ['Mathe', 'Französisch', 'Deutsch', 'Naturwissenschaften', 'Sport', 'Kunst'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Des SMS', art: 'chat', stimmen: { Mia: 'w2', Ben: 'm3' }, ich: 'Mia',
      quelle: 'Conversation sur le portable (personnes imaginaires)', titel: 'Le nouvel emploi du temps',
      nachrichten: [
        ['Ben', 'Salut Mia ! Tu as vu le nouvel emploi du temps ? 😮'],
        ['Mia', 'Oui ! Super : on a sport trois fois par semaine ! J’adore le sport. ⚽'],
        ['Ben', 'Moi aussi. Mais on a maths tous les jours… Je n’aime pas les maths. 😩'],
        ['Mia', 'Moi, j’aime bien les maths. Mais je n’aime pas beaucoup le français.'],
        ['Ben', 'Moi non plus ! Mais j’adore le dessin. On a dessin deux fois par semaine, le mercredi et le jeudi.'],
        ['Mia', 'Moi aussi, j’aime le dessin. À demain ! 👋'],
      ],
      woerter: [['l’emploi du temps', 'der Stundenplan'], ['trois fois par semaine', 'dreimal pro Woche'], ['tous les jours', 'jeden Tag'], ['j’adore', 'ich liebe'], ['j’aime bien', 'ich mag gern'], ['beaucoup', 'viel, sehr'], ['moi aussi', 'ich auch'], ['moi non plus', 'ich auch nicht']],
      aufgaben: [
        { art: 'wer', auftrag: 'Qui écrit ça ? Coche.', stufe: 1, personen: ['Mia', 'Ben'], saetze: [['J’adore le sport.', ['Mia', 'Ben']], ['Je n’aime pas les maths.', 'Ben'], ['J’aime bien les maths.', 'Mia'], ['Je n’aime pas beaucoup le français.', ['Mia', 'Ben']], ['J’adore le dessin.', 'Ben']] },
        { art: 'tabelle', auftrag: 'Combien de fois par semaine ?', stufe: 2, kopf: ['matière', 'fréquence'], breiten: [30, 70], zeilen: [['le sport', '[trois fois par semaine]'], ['les maths', '[tous les jours]'], ['le dessin', '[deux fois par semaine, le mercredi et le jeudi]']] },
      ],
    },
    hoeren: {
      was: 'Un micro-trottoir', wo: 'Radio de l’école · dans la cour', titel: 'Ta matière préférée, c’est quoi ?',
      situation: 'Pour la radio de l’école, Amira pose une question à trois élèves dans la cour.',
      bild: ['amira:froh:handy', 'noah:froh'], sprecher: { Amira: 'w3', Noah: 'm3', Léa: 'w2', Tom: 'm1' },
      text: [
        ['Amira', 'Bonjour ! C’est la radio de l’école. Ta matière préférée, c’est quoi ?'],
        ['Noah', 'Moi, c’est le sport ! On joue au foot, au basket… J’adore ça.'],
        ['Amira', 'Et tu fais du sport combien de fois par semaine ?'],
        ['Noah', 'À l’école, trois fois. Et au club, deux fois. Alors… cinq fois par semaine !'],
        ['Amira', 'Waouh ! Et toi ?'],
        ['Léa', 'Moi, j’aime beaucoup la musique. Je chante dans la chorale, le mercredi. Je n’aime pas les sciences.'],
        ['Amira', 'Et toi, Tom ?'],
        ['Tom', 'Euh… je préfère la récréation ! Non, je rigole. J’aime bien l’informatique.'],
        ['Amira', 'Merci à vous ! Et vous, votre matière préférée, c’est quoi ?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Comment on dit « Lieblingsfach » ? Coche.', stufe: 1, fragen: [{ f: '', o: ['la matière préférée', 'la matière difficile'], r: 0 }] }],
      beim: [
        { art: 'wer', auftrag: 'Écoute. Qui dit ça ?', stufe: 1, personen: ['Noah', 'Léa', 'Tom'], saetze: [['J’adore le sport.', 'Noah'], ['Je fais du sport cinq fois par semaine.', 'Noah'], ['Je chante dans la chorale.', 'Léa'], ['Je n’aime pas les sciences.', 'Léa'], ['J’aime bien l’informatique.', 'Tom']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Faites un micro-trottoir dans la classe : matière préférée, matière moins aimée, combien de fois par semaine.', stufe: 3, karten: [
        { titel: 'Demander', text: ['Ta matière préférée, c’est quoi ?', 'Tu as … combien de fois par semaine ?'] },
        { titel: 'Réagir', text: ['Moi aussi !', 'Moi non plus !', 'Moi, je préfère …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Les verbes en -er au présent', tabelle: { kopf: ['', 'aimer', 'parler'], zeilen: [['je / j’', 'aim**e**', 'parl**e**'], ['tu', 'aim**es**', 'parl**es**'], ['il / elle / on', 'aim**e**', 'parl**e**'], ['nous', 'aim**ons**', 'parl**ons**'], ['vous', 'aim**ez**', 'parl**ez**'], ['ils / elles', 'aim**ent**', 'parl**ent**']] } },
         { titel: 'Dire ce qu’on aime', punkte: ['♥♥ J’**adore** le sport.', '♥ J’**aime bien** les maths.', '✗ Je **n’aime pas** le français.', '✗✗ Je **déteste** les sciences.', 'Toujours avec l’article : j’aime **le** sport, **la** musique, **les** maths.'] }],
        [{ art: 'tipp', titel: 'Moi aussi · moi non plus', text: 'J’aime le dessin. – **Moi aussi** ! · Je n’aime pas les maths. – **Moi non plus** !' },
         { art: 'achtung', titel: 'Combien de fois ?', text: '**tous les jours** · **une fois par semaine** · **deux fois par semaine** · **le** jeudi (= tous les jeudis) · **jamais**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Conjugue le verbe.', stufe: 1, saetze: ['(aimer) J’[aime] la musique.', '(parler) Tu [parles] français ?', '(adorer) Elle [adore] le sport.', '(détester) Nous [détestons] les devoirs.', '(préférer) Vous [préférez] le foot ?'] },
      { art: 'luecken', auftrag: 'Réponds avec moi aussi ou moi non plus.', stufe: 2, saetze: ['J’aime le sport. – [Moi aussi] !', 'Je n’aime pas les maths. – [Moi non plus] !', 'J’adore le dessin. – [Moi aussi] !', 'Je ne parle pas italien. – [Moi non plus] !'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris un SMS à un copain ou à une copine : tes matières préférées et ce que tu n’aimes pas (vrai ou imaginaire).', stufe: 2,
        anfaenge: ['Salut … !', 'Ma matière préférée, c’est …', 'J’adore …', 'Je n’aime pas …', 'On a … fois par semaine.'], zeilen: 7,
        beispiel: 'Salut Léa ! Ma matière préférée, c’est l’informatique. J’adore aussi le sport. On a sport trois fois par semaine, c’est super ! Je n’aime pas les sciences. Et toi ?' },
    ],
    check: ['Je nomme les matières.', 'Je dis ce que j’aime et ce que je n’aime pas.', 'Je conjugue les verbes en -er.', 'Je réponds avec moi aussi ou moi non plus.', 'Je dis combien de fois par semaine.'],
  },
  // ================================================================ 8
  {
    thema: 'Ma journée · aller et faire', titel: 'Ma journée', untertitel: 'Le matin, le midi, le soir : tu lis et tu écoutes la journée de deux jeunes – et tu te présentes devant la classe.',
    ziel: { fr: 'Je raconte ma journée et je me présente devant la classe.', de: 'Ich erzähle von meinem Tag und stelle mich vor der Klasse vor.' },
    bild: ['amira:froh:stehen-zeigen', 'sami:froh:stehen'],
    start: {
      was: 'Une journée',
      aufgaben: [
        { art: 'ordnen', auftrag: 'La journée d’Amira : mets dans l’ordre.', stufe: 1, teile: ['Je me lève.', 'Je prends le petit-déjeuner.', 'Je vais à l’école en bus.', 'Je mange à la cantine.', 'Je fais mes devoirs.', 'Je vais au lit.'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'La journée d’une élève', art: 'text', stimme: 'w3', nummern: true,
      quelle: 'Magazine de l’école · rubrique « Ma journée »', titel: 'Une journée avec Amira',
      absaetze: [
        'Je m’appelle Amira, j’ai 12 ans. Le matin, je me lève à **six heures quarante-cinq**. Je prends mon petit-déjeuner avec mon petit frère.',
        'À **sept heures et demie**, je **vais** à l’arrêt de bus. Le bus arrive à l’école à huit heures moins dix.',
        'Les cours commencent à **huit heures**. À midi, je **mange** à la cantine avec mes copines. J’**aime** bien la cantine, mais pas le poisson !',
        'L’après-midi, nous **avons** cours jusqu’à trois heures dix. Le mardi et le jeudi, je **vais** au club de dessin.',
        'Le soir, je **fais** mes devoirs et je **regarde** une série. À **neuf heures et demie**, je **vais** au lit. Bonne nuit !',
      ],
      woerter: [['se lever (je me lève)', 'aufstehen'], ['le petit-déjeuner', 'das Frühstück'], ['l’arrêt de bus', 'die Bushaltestelle'], ['commencer', 'anfangen'], ['le poisson', 'der Fisch'], ['jusqu’à', 'bis'], ['les devoirs', 'die Hausaufgaben'], ['aller au lit', 'ins Bett gehen']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Complète la journée d’Amira.', stufe: 1, kopf: ['heure', 'activité'], breiten: [25, 75], zeilen: [['6 h 45', '[Elle se lève.]'], ['7 h 30', '[Elle va à l’arrêt de bus.]'], ['8 h 00', '[Les cours commencent.]'], ['à midi', '[Elle mange à la cantine.]'], ['21 h 30', '[Elle va au lit.]']] },
        { art: 'rf', auftrag: 'Vrai ou faux ?', stufe: 2, spalten: ['vrai', 'faux'], saetze: [['Amira n’aime pas le poisson.', true], ['Elle va au club de dessin le lundi.', false], ['Le soir, elle fait ses devoirs.', true]] },
      ],
    },
    hoeren: {
      was: 'Une présentation', wo: 'Salle de classe · présentation', titel: 'Je me présente !',
      situation: 'À la fin du module, Sami se présente devant la classe. Il suit sa fiche-guide.',
      bild: ['sami:froh:erklaeren', 'lehrerin:froh'], sprecher: { Sami: 'm3', 'Mme Nouvelle': 'w1' },
      text: [
        ['Sami', 'Bonjour à tous ! Je m’appelle Sami. J’ai treize ans. Je suis luxembourgeois et marocain. J’habite à Wiltz.'],
        ['Sami', 'Je parle arabe, luxembourgeois, allemand et un peu français.'],
        ['Sami', 'Le matin, je vais à l’école à vélo. Les cours commencent à huit heures.'],
        ['Sami', 'Ma matière préférée, c’est l’informatique. Je n’aime pas beaucoup l’histoire.'],
        ['Sami', 'Après l’école, je vais au club de boxe deux fois par semaine. Le soir, je joue aux jeux vidéo avec mes copains.'],
        ['Sami', 'Merci de votre attention ! Vous avez des questions ?'],
        ['Mme Nouvelle', 'Bravo, Sami ! C’est très clair. Une question : tu vas au club quels jours ?'],
        ['Sami', 'Le mardi et le vendredi.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Dans une présentation, on dit … Coche.', stufe: 1, fragen: [{ f: '', o: ['son nom et son âge', 'où on habite', 'ce qu’on aime', 'son mot de passe'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Écoute et complète la fiche de Sami.', stufe: 1, kopf: ['', 'Sami'], breiten: [34, 66], zeilen: [['Âge', '[13 ans]'], ['Nationalités', '[luxembourgeois et marocain]'], ['Ville', '[Wiltz]'], ['Langues', '[arabe, luxembourgeois, allemand, un peu français]'], ['Matière préférée', '[l’informatique]'], ['Club', '[boxe, le mardi et le vendredi]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Présente-toi devant la classe (une minute). Tu peux aussi présenter une personne imaginaire.', stufe: 3, karten: [
        { titel: 'Fiche-guide', text: ['Je m’appelle … J’ai … ans.', 'Je suis … J’habite à …', 'Je parle …', 'Le matin, je … · Le soir, je …', 'Ma matière préférée, c’est …', 'Merci ! Vous avez des questions ?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'aller et faire au présent', tabelle: { kopf: ['', 'aller', 'faire'], zeilen: [['je', '**vais**', '**fais**'], ['tu', '**vas**', '**fais**'], ['il / elle / on', '**va**', '**fait**'], ['nous', '**allons**', '**faisons**'], ['vous', '**allez**', '**faites**'], ['ils / elles', '**vont**', '**font**']] } },
         { titel: 'Raconter sa journée', punkte: ['**Le matin**, je me lève à …', '**À midi**, je mange …', '**L’après-midi**, j’ai cours jusqu’à …', '**Le soir**, je fais mes devoirs.', 'Je vais **à l’**école · **au** club · **à la** piscine'] }],
        [{ art: 'tipp', titel: 'Bien présenter', text: 'Regarde la classe. Parle **lentement** et **fort**. Utilise une **fiche-guide** avec des mots-clés.' },
         { art: 'achtung', titel: 'à + le = au', text: 'Je vais **au** club (à + le) · **à la** piscine · **à l’**école · **aux** toilettes (à + les).' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Conjugue aller.', stufe: 1, saetze: ['Je [vais] à l’école en bus.', 'Tu [vas] au club ?', 'Elle [va] à la piscine.', 'Nous [allons] à la cantine.', 'Ils [vont] au lit à 21 heures.'] },
      { art: 'luecken', auftrag: 'Complète avec au, à la ou à l’.', stufe: 2, saetze: ['Je vais [à l’] école.', 'Il va [au] club de foot.', 'Nous allons [à la] bibliothèque.', 'Tu vas [au] cinéma ?'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Écris ta journée (vraie ou imaginaire) pour le magazine de l’école.', stufe: 2,
        anfaenge: ['Le matin, je me lève à …', 'À … heures, je vais …', 'À midi, …', 'L’après-midi, …', 'Le soir, …'], zeilen: 10,
        beispiel: 'Le matin, je me lève à sept heures. À sept heures et demie, je vais à l’école à pied. À midi, je mange à la cantine. L’après-midi, j’ai sport. Le soir, je fais mes devoirs et je joue avec mon chat. Je vais au lit à neuf heures et demie.' },
    ],
    check: ['Je comprends la journée de quelqu’un.', 'Je raconte ma journée.', 'Je conjugue aller et faire.', 'J’utilise au, à la, à l’.', 'Je me présente devant la classe.'],
  },
]
