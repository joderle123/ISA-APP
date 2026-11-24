// REAL TALK #01 · MOI – französische Fassung (Auftrag 24.11.2026). Baut auf der deutschen Ausgabe (m1.ts) auf und ersetzt
// alles, was gedruckt wird. Die Stunden stehen in m1-stunden-fr.ts. Bau: npx tsx … dossiers/bau.tsx m1-fr
// Begriffe wie in m1-stunden-fr.ts (réservoir, station, voix haute/voix basse, dossier). Videos und Film: siehe Hinweise.
import type { Heft } from '../typen'
import de from './m1'
import { stunden } from './m1-stunden-fr'

const d: Heft = structuredClone(de)
d.datei = 'Real-Talk-01-Ich-FR'
d.thema = 'Moi'
d.headline = 'Qui es-tu quand personne ne regarde ?'
d.stand = 'novembre 2026'
d.cover = {
  ...d.cover,
  sticker: 'Pas de dossier',
  zeilen: [
    'Réservoir vide : pourquoi tu t’énerves parfois sans raison',
    'Voix haute ou voix basse – les deux sont une force',
    'Ce que tu sais faire et qui n’est dans aucun dossier',
    'Un film sur quelqu’un qui fait les choses à sa façon',
  ],
}
d.ansage = {
  text: [
    'On a déjà beaucoup écrit sur toi. Bulletins, rapports, dossiers. Souvent par des gens qui te connaissent depuis une heure.',
    'Ce magazine, c’est toi qui l’écris. Il parle de trois questions qui ne figurent dans aucun dossier : **De quoi as-tu vraiment besoin ?** Où te places-tu entre voix haute et voix basse ? Et **qu’est-ce que tu sais faire** – même ce qui n’a pas de note ?',
    'Tu n’as rien à prouver, rien à avouer. Tu regardes, c’est tout. Le reste, c’est toi qui décides.',
  ],
  zitat: 'Tu es plus ==que ton dossier.==',
  so: [
    ['Stations', 'Chaque séance va de la station 1 jusqu’à la fin. En haut de la page, tu vois où vous en êtes.'],
    ['Cas', 'Une personne inventée à qui il arrive quelque chose. Elle revient pendant la séance.'],
    ['Clip', 'Une vidéo par QR code – avec des consignes pour avant, pendant et après.'],
    ['Grande ronde', 'Une activité pour tout le monde, 25 à 30 minutes. Les cartes sont dans le magazine. Personne ne doit jouer une scène devant les autres.'],
  ],
  regeln: [
    '**Tu écris seulement ce que tu veux.** Personne ne ramasse le magazine.',
    '**Aucun côté n’est meilleur.** Ni voix haute, ni voix basse, ni fort, ni faible.',
    '**Ici, on ne dit sur les autres que ce qu’on leur dirait en face.**',
  ],
}
d.hilfeText = 'Si quelque chose dans ce magazine te travaille : parles-en à quelqu’un de confiance. Kanner-Jugendtelefon **116 111** · Urgences **112**'
d.cast = [
  { ...d.cast[0], name: 'Sami, 14 ans', x: 'Le plus bruyant de la salle. À la maison, il dit à peine un mot.' },
  { ...d.cast[1], name: 'Amira, 16 ans', x: 'La discrète. Elle a souvent la phrase la plus importante – et la garde pour elle.' },
  { ...d.cast[2], name: 'Yusuf, 16 ans', x: 'Il connaît son dossier par cœur. Ses forces, non.' },
]
d.warm = {
  titel: 'Pour s’échauffer',
  text: 'Deux questions rapides. Ni vrai ni faux.',
  fragen: [
    { f: 'Trois mots que les autres diraient sur toi. Entoure ou ajoute :', kreis: ['voix haute', 'voix basse', 'drôle', 'tête de mule', 'fidèle', 'chaotique', 'calme', 'cash', 'serviable', 's’énerve vite'] },
    { f: 'L’image est juste ?', kreuz: ['oui', 'à moitié', 'non – ils ne me connaissent pas'] },
  ],
}

// Die drei Stunden
const TITEL = ['Réservoir vide', 'Voix haute, voix basse', 'Ce que tu sais faire']
const KURZ = [
  'Ce dont tu as vraiment besoin – et ce qui se passe quand ça manque.',
  'Où tu te places entre voix haute et voix basse – et pourquoi les deux comptent.',
  'Tes forces – même celles qui ne sont dans aucun dossier.',
]
d.tracks.forEach((e, i) => { e.titel = TITEL[i]; e.kurz = KURZ[i]; e.stunde = stunden[i] })
d.tracks[0].clip = { titel: 'Mehr als lebenswichtig: Darum schlafen wir!', kanal: 'Quarks · vidéo en allemand', url: 'https://www.youtube.com/watch?v=sdH-fEEh1uY', dauer: '00:00 à 05:09 (en entier)', frage: 'Que fait ton cerveau pendant que tu dors ?' }
if (d.tracks[1].clip) d.tracks[1].clip = { ...d.tracks[1].clip, kanal: d.tracks[1].clip.kanal + ' · vidéo en allemand', dauer: '04:07 à 07:45 (un peu plus de 3 min)', frage: 'Un côté est-il meilleur ?' }
if (d.tracks[2].clip) d.tracks[2].clip = { ...d.tracks[2].clip, kanal: d.tracks[2].clip.kanal + ' · vidéo en allemand', dauer: 'SEULEMENT 02:42 à 04:42 (2 min)', frage: 'Qu’est-ce qui aide quand on a peu confiance en soi ?' }

d.tracks[0].leitung = {
  ...d.tracks[0].leitung,
  einsatz: 'Proche du quotidien, sans personnage principal inventé : colorier la batterie → « Ça te parle ? » (cocher six phrases, puis montrer le pouce en même temps) → clip sur le sommeil avec des questions avant, pendant et après, plus « C’est vrai ? » → les six réservoirs : colorier ses propres réservoirs et relier les six phrases → grande ronde « Je connais ! » sans points → Faire le plein – mais bien (vraies et fausses stations) → mon plan réservoir avec échange de stations → un conseil pour un ami ou une amie.',
  loesungen: [
    'Ça te parle ? Ni vrai ni faux. Les phrases vont ensuite avec les réservoirs : A le corps · B la sécurité · C faire partie · D être pris au sérieux · E décider soi-même · F plaisir et nouveauté.',
    'Clip : les jeunes ont besoin d’environ 8 à 10 heures de sommeil. Après 1 : le cerveau garde ce que tu as appris. C’est vrai ? – Le cerveau range et garde : vrai (dans la vidéo) · on s’énerve plus vite : vrai (pas dans la vidéo, savoir du quotidien) · rattraper entièrement le week-end : faux (seulement en partie) · le téléphone aide à s’endormir : faux (la lumière et les contenus tiennent éveillé) · la boisson énergisante remplace le sommeil : faux (elle réveille un moment, elle ne remplace rien). Regarder l’extrait avant, s’il vous plaît. Vidéo en allemand.',
    'Modèle : A – le corps, B – la sécurité, C – faire partie, D – être pris au sérieux, E – décider soi-même, F – plaisir et nouveauté.',
    'Grande ronde : il n’y a pas de bonne solution. Si deux réservoirs vont (p. ex. choix des équipes : faire partie et être pris au sérieux), la carte est posée entre les deux.',
    'Faire le plein – mais bien : vraies – tour du pâté de maisons, une heure de jeu avec des amis, appeler quelqu’un, chanson préférée, un vrai repas · fausses – boisson énergisante, jouer jusqu’à trois heures, faire défiler pendant des heures, commencer une dispute. Jouer : c’est la quantité qui fait la différence – limité et avec des amis, ça remplit ; jusqu’à trois heures, ça vide le réservoir « corps ».',
    'Fin : les bonnes questions sont ouvertes et sans reproche : « Qu’est-ce qui te manque en ce moment ? », « Tu dors comment ? », « Tu veux que je sois juste là ? »',
  ],
  impulse: ['Quel réservoir est le plus souvent vide chez les jeunes ?', 'Quelle est la différence entre « vouloir » et « avoir besoin » ?'],
  material: '6 cartes réservoirs et 18 cartes situations (dans le magazine, à découper), crayons de couleur, papiers pour l’échange de stations, appareil pour le clip',
  blaetter: 'Roue des émotions, cartes voyants, « Mes réservoirs », passeport Skills.',
}
d.tracks[1].leitung = {
  ...d.tracks[1].leitung,
  einsatz: 'D’abord l’expérience (à voix haute et en silence), puis la ligne : où est-ce que je me place ? Le cas Sami et Amira est court – avec la question « Tu es plutôt comme Sami ou comme Amira ? » et une bulle pour parler. Après le clip, chaque personne coche ce qui recharge sa batterie. Le pont est une tâche commune avec des rôles voix haute et voix basse.',
  loesungen: [
    'Expérience : souvent, la ronde A donne beaucoup d’idées de peu de personnes, la ronde B des idées de tout le monde. Si c’est différent, demander : à quoi ça tenait ?',
    'Cas : Amira l’a remarqué. Pour qu’elle dise quelque chose : lui demander directement (« Tu en penses quoi ? »), faire d’abord écrire tout le monde en silence, parler à tour de rôle. Sami sait bien démarrer et avoir des idées.',
    'Clip : les réponses dépendent de l’extrait – à regarder avant. Vidéo en allemand.',
    'Batterie : pas de bonnes réponses – les deux façons sont normales.',
    'Pont : souvent, l’idée qui porte (rouler, plier) est sur une feuille de la phase silencieuse.',
  ],
  impulse: ['Où êtes-vous plus « voix haute » que vous ne l’êtes vraiment – et pourquoi ?', 'Comment un groupe remarque-t-il ce que savent les voix basses ?'],
  material: 'papier et crayons, ruban adhésif pour la ligne, 20 feuilles de papier, ruban adhésif pour construire, une bouteille en plastique pleine, deux chaises, cartes rôles (dans le magazine), appareil pour le clip',
  blaetter: 'Roue des émotions, « Voix haute et voix basse », passeport Skills.',
}
d.tracks[2].leitung = {
  ...d.tracks[2].leitung,
  einsatz: 'La séance commence par une liste : qu’est-ce qu’il y a dans cette salle ? Le dossier de Yusuf montre ce qui manque dans les dossiers. Dans le modèle, les jeunes relient des forces à leur revers. Après le clip, tout le monde offre des cartes avec une phrase sur le marché des forces. L’arbre rassemble à la fin ce qui reste.',
  loesungen: [
    'Dossier : fiable, serviable, fidèle, patient – seul « paresseux » ne va pas. « Rien de spécial » : pour Yusuf, c’est normal, et personne ne le lui a dit. Les trois croix peuvent être justes.',
    'Modèle : courage – prendre des risques bêtes · franchise – blesser · aider les autres – ne jamais savoir dire non · humour – rien n’est sérieux. Bruyant en classe : les trois forces sont possibles.',
    'Clip : les réponses dépendent de l’extrait – à regarder avant. Vidéo en allemand.',
    'Marché : qui reçoit peu de cartes en reçoit de l’adulte.',
    'Arbre : pour les racines, accepter aussi expressément des endroits, des animaux, de la musique et des souvenirs – pas seulement des personnes.',
  ],
  impulse: ['Quelle force faut-il dans votre vie que personne ne voit à l’école ?', 'Qu’est-ce que ça fait de recevoir une carte force ?'],
  material: '24 cartes forces (dans le magazine, à découper), crayons, appareil pour le clip',
  blaetter: 'Roue des émotions, « L’arbre de vie », cartes forces, passeport Skills.',
}

// Missions-Tickets am Ende jeder Stunde (gleiche Codes; das Spiel selbst ist auf Deutsch)
d.missionen = [
  { code: 'TANK-6', titel: 'Mission réservoirs', ort: 'Village et boulangerie', kurz: 'Trois personnes du village sont à cran aujourd’hui. Trouve quel réservoir est vide chez qui – et apporte à chacune une vraie station. Attention : l’une d’elles veut une fausse station.', belohnung: 'Casquette de la station', skill: 'Réservoirs et stations' },
  { code: 'LEISE-4', titel: 'L’idée discrète', ort: 'Maison des jeunes', kurz: 'À la maison des jeunes, on prépare la fête d’été. La meilleure idée vient de quelqu’un qui ne dit rien. Fais en sorte qu’elle soit entendue.', belohnung: 'Casque « Voix basse »', skill: 'Tout le monde a la parole' },
  { code: 'STARK-24', titel: 'Courrier des forces', ort: 'Campus', kurz: 'Observe quatre personnes sur le campus. Trouve chez chacune une force avec une preuve – et apporte-lui la bonne carte.', belohnung: 'Veste des forces', skill: 'Voir les forces' },
]

if (d.kino) {
  d.kino = {
    ...d.kino,
    filme: [{
      ...d.kino.filme[0],
      titel: 'Spider-Man : New Generation',
      laenge: '117 min',
      worum: 'Miles, 13 ans, est nouveau dans une école d’élite. Il sait graffer, mais pas trouver sa place. Puis une araignée le mord – et soudain, cinq autres Spider-personnes venues d’autres mondes apparaissent. Elles savent toutes faire ce qu’il ne sait pas faire. Pas encore.',
      achte: ['Quel réservoir est vide chez Miles au début ?', 'Qu’est-ce que Miles sait faire que les autres ne savent pas faire ?', 'Que veut dire : « Tout le monde peut porter le masque » ?'],
      achtung: 'Violence d’action ; un personnage important meurt.',
    }],
    bingo: ['Miles n’est pas à sa place', 'Quelqu’un croit en lui', 'Miles se compare aux autres', 'Un réservoir est vide', 'Ça me parle', 'Une force discrète se montre', 'Miles fait à sa façon', 'Quelqu’un dit enfin la vérité', 'Le saut'],
    nachher: ['Qu’est-ce qui manque à Miles au début – et qu’est-ce qu’il a à la fin ?', 'Quelle Spider-personne te ressemble le plus ?', 'Quand as-tu fait quelque chose à ta façon pour la dernière fois ?'],
  }
}

d.hot = {
  unter: 'Six phrases pour débattre – avec des règles',
  regeln: 'Fais une croix sur chaque ligne : à quel point la phrase est vraie pour toi ? Puis placez-vous dans la salle – un mur veut dire « jamais », l’autre « toujours ». Qui veut dit une phrase. **Personne ne doit se justifier. On peut changer de place.**',
  takes: [
    'Qui parle beaucoup a plus de choses à dire.',
    'Sans amis, ça va aussi.',
    'On reste comme on est à la naissance.',
    'Être fier ou fière de soi, c’est gênant.',
    'L’argent règle la plupart des problèmes.',
    'Sur Internet, les gens montrent leur vrai moi.',
  ],
}

// Lösungswort bleibt ORIGINAL (gleich auf Deutsch und Französisch), Reihenfolge der Antworten wie im Original
d.quiz = {
  unter: 'Huit questions. Huit lettres. C’est toi.',
  wort: 'ORIGINAL',
  fragen: [
    { f: 'Sur combien de réservoirs fonctionne une personne (d’après le magazine) ?', o: ['six', 'deux', 'vingt'], r: 0 },
    { f: 'Tu t’énerves sans raison – qu’est-ce qui clignote souvent ?', o: ['le téléphone', 'le réservoir « corps »', 'rien du tout'], r: 1 },
    { f: 'Une station express dure au maximum …', o: ['une journée', 'une heure', 'dix minutes'], r: 2 },
    { f: 'Voix haute et voix basse sont …', o: ['les deux bouts d’une ligne', 'le bien et le mal', 'fixées pour toujours'], r: 0 },
    { f: 'Qu’est-ce que les voix basses savent souvent très bien faire ?', o: ['frimer', 'écouter et bien observer', 'rien'], r: 1 },
    { f: 'Qu’est-ce qui fait partie des racines ?', o: ['tes notes', 'tes erreurs', 'ce qui te tient'], r: 2 },
    { f: 'Laquelle est une force ?', o: ['être fidèle', 'toujours gagner', 'ne jamais avoir besoin d’aide'], r: 0 },
    { f: 'Qu’est-ce qui ne figure pas dans le dossier de Yusuf ?', o: ['ses avertissements', 'ce qu’il sait bien faire', 'son nom'], r: 1 },
  ],
}

d.karten = [
  { titel: 'Check réservoirs', icon: 'gauge', zeilen: ['Agacement ? Fatigue ? Jalousie ? **Quel réservoir clignote ?**', 'Corps · Sécurité · Faire partie', 'Sérieux · Décider · Plaisir'], eigen: 'Clignote souvent :' },
  { titel: 'Stations express', icon: 'gas-station', zeilen: ['dix minutes dehors', 'un vrai repas', 'écrire à quelqu’un qui fait du bien', 'une chanson à fond'], eigen: 'Les miennes :' },
  { titel: 'Mes forces', icon: 'star', zeilen: ['Trois choses que je sais faire :', '_1', '_2', '_3'] },
  { titel: 'Voix haute & basse', icon: 'volume', zeilen: ['Voix haute sait : démarrer, mettre l’ambiance.', 'Voix basse sait : écouter, bien observer.', 'Aujourd’hui, j’essaie l’autre côté.'] },
  { titel: 'Mes racines', icon: 'tree', zeilen: ['Ce qui me tient quand ça vacille :', '_', '_'], eigen: 'Mon endroit :' },
  { titel: 'Compliment', icon: 'gift', zeilen: ['Dis une force à quelqu’un.', 'Dis **à quoi** tu l’as remarquée.', 'N’attends pas le bon moment.'] },
]

d.abspann = {
  ...d.abspann,
  posten: ['Check réservoirs', 'Trouver une station', 'Connaître mon côté', 'Tester l’autre côté', 'Nommer des forces'],
  saetze: ['Ce que je sais maintenant sur moi :', 'Ça, c’était nul :', 'Ce qui doit changer dans le cours :'],
}

d.leitung = {
  fakten: [['Public', '12–16 ans, 3–6 jeunes'], ['Durée', '3 séances d’environ 90 min (U4–U6)'], ['Forme', 'individuel, à deux, en équipe'], ['Matériel', 'ciseaux, chronomètre, papier, ruban adhésif, bouteille']],
  wozu: 'REAL TALK est le magazine des jeunes pour le module 1. Chacune des trois unités est une **séance continue** avec des stations. Pensé pour le juste milieu : **personnel** (situations du quotidien, « Ça te parle ? »), **pour réfléchir** (une bonne question plutôt que beaucoup d’exercices), **facile pour parler** (bulle « Parlez-en » – facultatif), **fun** (colorier, poser, construire – sans points, sans équipes les unes contre les autres) et **facile à comprendre** (consignes courtes, d’abord cocher). **Personne ne doit jouer une scène devant les autres.** Fil rouge : les jeunes connaissent leur « dossier » – ici, ils en découvrent l’autre côté.',
  lernziele: [
    'Les jeunes nomment six besoins de base (« réservoirs ») et reconnaissent, à leurs émotions, quel réservoir est vide.',
    'Ils choisissent une petite « station » faisable seul pour leur quotidien.',
    'Ils se placent entre des contraires comme voix haute et voix basse et nomment des forces des deux côtés.',
    'Ils nomment leurs propres forces et les « racines » qui les tiennent, et donnent aux autres un retour concret sur une force.',
  ],
  start: 'Titre, message (à lire à voix haute – le ton est voulu), « Au programme » et les deux questions pour s’échauffer. Environ 10 minutes avant la station 1 de la séance 01.',
  schluss: 'Cinéma – le film du trimestre – à part. Débats : deux phrases pour commencer une unité – ou les six debout à la fin. « Craque le code » comme révision, découper les cartes, « Pour finir » lors du bilan de l’unité 6.',
  hilfe: [
    'Lire les consignes à voix haute ; d’abord cocher, ensuite parler.',
    'Expliquer les réservoirs une fois avec un exemple du groupe ; ensuite, chaque jeune colorie en silence.',
    'Pour les forces, donner des exemples du quotidien du groupe.',
    'Qui ne veut pas écrire dessine l’arbre.',
  ],
  forder: [
    'Évaluer les six réservoirs d’un personnage de série.',
    'Pendant une semaine, noter le soir le réservoir qui clignote.',
    'Interviewer une personne de confiance : « Qu’est-ce que je sais bien faire ? »',
    'Faire l’arbre en grand sur A3 et l’accrocher (si on veut).',
  ],
  gespraech: 'Le thème des besoins peut rendre visible un manque : pas de foyer sûr, pas assez à manger, personne qui tient à soi. Rien de cela n’est approfondi dans le groupe ; les signes de négligence ou de violence vont à la direction compétente (responsable). Les regards des autres (marché des forces) peuvent blesser – veiller à ce que personne ne reparte les mains vides. La question des racines peut faire mal quand des personnes importantes manquent : accepter expressément aussi des endroits, des animaux, de la musique et des souvenirs.',
  druck: [
    'A4, recto verso, retourné sur le grand côté. Imprimer les pages matériel (ciseaux) une fois en plus en recto seul et découper dans celles-ci – dans le magazine des jeunes, la station suivante est au verso.',
    'Pages 1–{J} pour les jeunes, pages {L} seulement pour vous.',
    'Le noir et blanc est possible ; la couverture demande beaucoup d’encre.',
    'Page {K} (cartes) à imprimer seule et en recto, de préférence sur du papier plus épais.',
  ],
  hot: 'Il n’y a pas de bonne position. Poser des questions plutôt que corriger : « Qu’est-ce que tu as vécu pour te placer là ? » La phrase 2 (« Sans amis, ça va aussi ») est souvent une protection – ne pas la contredire, mais demander ce qu’elle coûte. La phrase 5 vaut un regard sur les réservoirs : lesquels l’argent remplit-il, lesquels non ?',
  achtung: 'Sur le marché des forces, veiller à ce que personne ne reparte les mains vides. Le mot « dossier » est lourd pour certains jeunes – il est retourné exprès ici ; si ça touche quelqu’un, en parler. Les vidéos sont en allemand : sous-titres automatiques en français possibles, ou résumer l’essentiel à voix haute.',
  hintergrund: 'Les besoins psychologiques de base – attachement, contrôle et orientation, estime de soi, plaisir – sont bien établis (Grawe ; Deci & Ryan) ; quand ils sont blessés, cela se voit d’abord dans les émotions. Introversion et extraversion forment un continuum, chacune avec ses forces (Cain). « L’arbre de vie » vient du travail narratif avec des enfants et des jeunes en difficulté (Ncube) : qui parle de ses forces et de ce qui le tient avant de parler des problèmes est plus solide. La résilience naît le plus souvent de facteurs de protection ordinaires – une personne fiable, une capacité dont on est fier ou fière (Masten).',
  quellen: 'Grawe (2004) · Deci & Ryan (2000) · Maslow (1943) · Cain (2012) · Ncube (2006) · Masten (2014). Détails sur les unités 4–6 dans la Toolbox.',
}

export default d
