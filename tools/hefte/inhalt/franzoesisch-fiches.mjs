// Français · Zusätze für alle Module nach dem Vorbild von Beispiel-Fiches (Auftrag 24.11.2026: „schau dir diese fiches gut an
// und wenn du Aspekte siehst, die besser sind …, passe das an“). Übernommen werden Ideen, keine Texte:
// - Mon parcours : au début de « S’entraîner », quels exercices pour base / standard / plus (heft.tsx, parcours)
// - des points par exercice (…… / n) pour se corriger soi-même avec le cahier des solutions, au stylo vert
// - « Je relis comme un correcteur » : un petit texte avec des erreurs sur la règle de la leçon ; certaines formes sont correctes
// - « Ma checklist » pour la tâche d’écriture : ce que mon texte doit contenir
// - Annexe C « Mon aide-mémoire » : toutes les règles du module, à garder dans le classeur
// Les textes sont nouveaux et imaginaires ; erreurs notées {faux>juste}.
// heft.tsx lädt diese Datei für jedes Modul franzoesisch-mN (anwenden).

import { franzoesischProgramm, mitSprechen } from './sprachen-programm.mjs'

const X = {
  // ================================================================ Module 1 · Moi et mon école (A1.1)
  1: [
    { hilfe: 'Regarde être et avoir, et comment on salue un adulte.',
      text: 'Salut ! Je m’appelle Rui. {Je suis>J’ai} 12 ans. Je suis portugais et j’habite à Esch. Ma copine s’appelle Léa. Elle {a>est} luxembourgeoise et elle a treize ans. Nous {avons>sommes} dans la même classe. Le professeur dit : « Bonjour, Rui ! » Je réponds : « {Salut, Monsieur>Bonjour, Monsieur} ! » Et toi, tu {es>as} quel âge ?',
      kriterien: ['Je m’appelle …', 'J’ai … ans (avec avoir !)', 'Je suis … · J’habite à …', 'un point à la fin de chaque phrase'] },
    { hilfe: 'Regarde les majuscules, masculin ou féminin, et au, en, du.',
      text: 'Je m’appelle Mia. Je suis {Italienne>italienne} et j’habite {en Luxembourg>au Luxembourg}. Ma mère vient {de le Portugal>du Portugal}, mon père vient d’Italie. À la maison, nous parlons {Français>français} et italien. Mon copain Luca est {portugaise>portugais}. Sa sœur est portugaise aussi. J’adore la France !',
      kriterien: ['Il / Elle s’appelle …', 'la nationalité au masculin ou au féminin', 'un pays avec au, en ou à', 'les langues sans majuscule'] },
    { hilfe: 'Regarde quel ou quelle, et les nombres avec « et ».',
      text: 'Bonjour ! Pour la fiche du club, j’ai trois questions. Tu t’appelles comment ? {Quel>Quelle} est ton adresse ? {Quelle>Quel} est ton numéro de téléphone ? Moi, j’habite au {trente-un>trente et un}, rue du Parc. Mon numéro, c’est le 62 15 26 61 : soixante-deux, quinze, {vingt-et-six>vingt-six}, {soixante-un>soixante et un}. Tu as quel âge ?',
      kriterien: ['le jour et l’heure du club', 'ton numéro de téléphone', 'une question avec quel ou quelle', 'À bientôt ! à la fin'] },
    { hilfe: 'Regarde un, une, des · mon, ma, mes · pas de.',
      text: 'Dans mon sac, il y a {un>une} trousse, {une>un} cahier et des crayons. Dans {mon>ma} trousse, j’ai {ma>mon} stylo bleu et {mon>mes} ciseaux. Je n’ai pas {une>de} gomme. Tu as une règle, s’il te plaît ? – Merci ! – De rien.',
      kriterien: ['un, une, des devant les objets', 'mon, ma, mes', 'une phrase avec je n’ai pas de …', 'au moins cinq objets'] },
    { hilfe: 'Regarde il n’y a pas de, tu ou vous, et les mots pour dire où.',
      text: 'Dans mon lycée, il y a une cantine et {un>une} bibliothèque. Il n’y a pas {une>de} piscine. La salle de sport est {derrière de>derrière} le lycée. Le professeur dit à la classe : « {Ouvre>Ouvrez} vos livres ! » Puis il dit à Sami : « {Écoutez>Écoute}, s’il te plaît ! » Je ne comprends pas. Je demande : « Vous pouvez répéter, s’il vous plaît ? »',
      kriterien: ['il y a … (trois fois)', 'il n’y a pas de …', 'un mot pour dire où (devant, derrière, à côté de …)', 'une phrase sur ce que tu aimes'] },
    { hilfe: 'Regarde l’heure et les jours : majuscule ou minuscule ?',
      text: 'Le {Lundi>lundi}, j’ai cours de 8 h à 12 h. Les maths commencent à huit heures et quart. La récréation est à dix heures {moins quart>moins le quart}. À {midi heures>midi}, je mange à la cantine. Le {Mercredi>mercredi} après-midi, je n’ai pas cours. Le sport finit à trois heures {et demi>et demie}.',
      kriterien: ['le jour, en minuscule', 'l’heure en lettres', 'le lieu du rendez-vous', 'Salut … et À bientôt !'] },
    { hilfe: 'Regarde les terminaisons des verbes en -er et l’article après aimer.',
      text: 'J’adore {sport>le sport} ! Le jeudi, nous {jouont>jouons} au foot. Mes copains {aime>aiment} le dessin, mais pas moi. J’aime bien la musique. Je n’aime pas les maths. Et toi ? – Moi {aussi>non plus} ! Tu {parle>parles} anglais avec ta prof ?',
      kriterien: ['j’adore / j’aime bien / je déteste + le, la, les', 'deux verbes en -er bien conjugués', 'moi aussi ou moi non plus', 'combien de fois (tous les jours, le lundi …)'] },
    { hilfe: 'Regarde aller et faire, et à + le = au.',
      text: 'Le matin, je {va>vais} à l’école en bus. À midi, je mange à la cantine. Après l’école, je vais {à le>au} club de foot. Le soir, je {fait>fais} mes devoirs. Mes parents vont au travail à vélo. Le samedi, nous {faisez>faisons} du sport et nous allons à la piscine. Et toi, tu {va>vas} où ?',
      kriterien: ['le matin, à midi, l’après-midi, le soir', 'aller et faire bien conjugués', 'au, à la ou à l’ (je vais au club …)', 'au moins six phrases'] },
  ],
  // ================================================================ Module 2 · Moi et les autres (A1.2)
  2: [
    { hilfe: 'Regarde l’accord : masculin ou féminin, singulier ou pluriel.',
      text: 'Ma cousine Zoé est {grand>grande} et {blond>blonde}. Elle a les cheveux {long>longs} et les yeux {bleu>bleus}. Elle porte des lunettes. Son frère Noah est petit et un peu timide. Il a les cheveux {frisé>frisés}.',
      kriterien: ['Je suis … (grand, petit …)', 'J’ai les cheveux … et les yeux …', 'un peu, assez ou très', 'Je porte …'] },
    { hilfe: 'Regarde l’accord et la place des couleurs, et les nombres.',
      text: 'Aujourd’hui, je porte une veste {vert>verte}, un {bleu pull>pull bleu} et des baskets {noir>noires}. Ma sœur porte une jupe rouge. Le pull coûte 75 euros : {soixante-et-quinze>soixante-quinze} euros. La veste coûte 80 euros : {quatre-vingt>quatre-vingts} euros. Elle coûte combien, ta jupe ?',
      kriterien: ['je porte + trois vêtements', 'la couleur après le nom', 'la couleur accordée (verte, noires …)', 'un prix en lettres'] },
    { hilfe: 'Regarde la négation, au ou à la, parce que, aller et pouvoir.',
      text: '– Salut, Sami ! Ça va ? – Bof, {ça va pas>ça ne va pas}. Je suis fatigué et j’ai mal {à le>au} dos. – Pourquoi ? – Mon frère joue tard le soir, {parce que il>parce qu’il} a un nouveau jeu. – Tu {peut>peux} venir au foot ce soir ? – Non, je ne peux pas. Mais demain, on {vont>va} à la piscine ?',
      kriterien: ['Salut / Bonjour + Ça va ?', 'une réponse (Ça va bien. · Bof …)', 'Pourquoi ? – Parce que …', 'Au revoir ou Salut à la fin'] },
    { hilfe: 'Regarde du ou de la, l’article après aimer et le verbe boire.',
      text: 'Au petit-déjeuner, je mange {de le>du} pain et je {boit>bois} du lait. À midi, à la cantine, j’adore {frites>les frites}, mais je préfère {poisson>le poisson}. Au goûter, je mange {un>une} pomme. Le soir, ma sœur boit de l’eau. Je déteste les épinards !',
      kriterien: ['les quatre repas', 'je mange du / de la … · je bois …', 'j’adore / je préfère / je déteste + le, la, les', 'une phrase sur manger équilibré'] },
    { hilfe: 'Regarde de après une quantité, au / à la / chez, et ça fait.',
      text: 'Le samedi, je vais {à le>au} marché avec mon père. Je voudrais un kilo {des>de} pommes et une bouteille {de l’eau>d’eau}. Ensuite, nous allons {chez la>à la} boulangerie et chez le boucher. Un paquet de biscuits, c’est combien ? – Deux euros cinquante. Deux plus deux, ça {font>fait} quatre.',
      kriterien: ['Bonjour + Je voudrais …', 'deux quantités avec de (un kilo de …)', 'C’est combien ? + un prix', 'Merci, bonne journée !'] },
    { hilfe: 'Regarde du, de la, de · prendre et vouloir · pour lui, pour elle.',
      text: 'Au café, je {prend>prends} un chocolat chaud avec {de le>du} sucre. Mon copain ne prend pas {du>de} sucre : il {veux>veut} une tarte aux pommes. Un thé pour {il>lui} et un jus pour elle, s’il vous plaît ! Mes cousins {prenent>prennent} des frites.',
      kriterien: ['le nom de la recette', 'les ingrédients avec du, de la, des', 'deux quantités (un verre de, 200 grammes de …)', 'les étapes numérotées : 1, 2, 3 …'] },
    { hilfe: 'Regarde les mois, en été, il fait ou il y a, et partir.',
      text: 'Bonjour de Vianden ! Nous sommes le 14 {Juillet>juillet}. {Au été>En été}, il fait chaud ici. Aujourd’hui, {il fait du soleil>il y a du soleil} et il fait 25 degrés. Demain, il pleut. Nous {partont>partons} à la mer le {un août>premier août}. Et toi, tu pars quand ?',
      kriterien: ['la date (le … juillet)', 'le temps (il fait … · il y a … · il pleut)', 'deux activités', 'Bisous ou À bientôt + ton prénom'] },
    { hilfe: 'Regarde mon, ma, mes · son, sa, ses · apprendre.',
      text: 'Samedi, c’est l’anniversaire de {ma>mon} cousin Noah. Il fait une fête avec {son>sa} mère, {sa>son} père et {son>ses} grands-parents. Sa sœur Lina prépare un gâteau. Les enfants {apprenent>apprennent} une chanson pour lui. Moi, j’apprends le refrain. Joyeux anniversaire, Noah !',
      kriterien: ['pour quelle fête ?', 'le jour, l’heure et le lieu', 'une question : Tu viens ?', 'mon, ma, mes ou son, sa, ses'] },
  ],
  // ================================================================ Module 3 · Bien-être et vacances (A1.2 – A2.1)
  3: [
    { hilfe: 'Regarde faire du, jouer au, jouer du, venir et lire.',
      text: 'Le mercredi, je fais {du>de la} danse et mon frère {fait>joue} au basket. Ma sœur joue {de la>du} piano. Nous {venont>venons} souvent au club. Tu fais {quelle>quel} sport ? Et tu {lit>lis} des BD ? Moi, je ne fais pas de sport le dimanche.',
      kriterien: ['faire du / de la …', 'jouer au … ou jouer du …', 'combien de fois (une fois par semaine …)', 'une négation : je ne fais pas de …'] },
    { hilfe: 'Regarde quel ou quelle, les accents de préférer et l’orthographe.',
      text: '{Quel>Quelle} série tu regardes ? Moi, je {préfére>préfère} les films d’aventure. Je trouve ce film {passionant>passionnant}. Ma sœur et moi, nous {préfèrons>préférons} les émissions drôles. {Quelle>Quel} jeu tu aimes ? À mon avis, cette émission est ennuyeuse.',
      kriterien: ['le titre et le genre (film, série, émission)', 'Je trouve … · C’est …', 'À mon avis, …', 'pour quel âge ?'] },
    { hilfe: 'Regarde avoir mal au, à la, à l’, aux.',
      text: 'Aïe ! J’ai mal {à le>au} genou. Hier, au foot, je suis tombé. J’ai aussi mal {à les>aux} pieds et {au>à la} tête. Mon copain a mal {à la épaule>à l’épaule}. Il {est>a} mal au dos aussi. Où est-ce que tu as mal ?',
      kriterien: ['Bonjour + le prénom (ou Monsieur / Madame)', 'J’ai mal au / à la …', 'je ne peux pas venir (quand ?)', 'Merci + ton prénom'] },
    { hilfe: 'Regarde de après une quantité, devoir et il faut + infinitif.',
      text: 'Mon frère ne dort pas assez. Il passe trop {du>de} temps devant l’écran et il boit peu {de l’eau>d’eau}. Avant de {dors>dormir}, il joue sur son portable. Nous {devont>devons} l’aider ! Il faut {bois>boire} beaucoup d’eau et manger beaucoup de fruits.',
      kriterien: ['cinq conseils', 'Tu dois … ou Il faut … + infinitif', 'deux quantités (assez de, peu de, beaucoup de …)', 'avant de … ou après …'] },
    { hilfe: 'Regarde les verbes pronominaux : me, te, se, nous, vous, se.',
      text: 'Le matin, {je lève me>je me lève} à 6 h 30. D’abord, je me lave. Ensuite, je {me habille>m’habille}. Ma sœur {se lèves>se lève} à 7 h. Puis nous {se brossons>nous brossons} les dents. Le week-end, je ne me lève pas avant 9 h ! Et toi, tu {te couche>te couches} à quelle heure ?',
      kriterien: ['d’abord, ensuite, puis, enfin', 'trois verbes pronominaux (je me lève …)', 'des heures', 'une négation : je ne me … pas'] },
    { hilfe: 'Regarde aller + infinitif, en, au, à et les transports.',
      text: 'Cet été, nous {allons partons>allons partir} {à la France>en France}. Nous allons voyager en train, puis {en vélo>à vélo}. Ma tante va aller {en Portugal>au Portugal}, à Lisbonne. Mon cousin {va fait>va faire} du kayak dans les Ardennes. Moi, je ne vais pas partir en avion.',
      kriterien: ['aller + infinitif (trois fois)', 'un pays ou une ville avec en, au, aux ou à', 'un transport (en train, à vélo …)', 'quand ? (cet été, la semaine prochaine …)'] },
    { hilfe: 'Regarde du ou de la, le, la, les avant le verbe, qui et où.',
      text: 'Notre tente est {à côté de le>à côté du} parking, près de la rivière. Tu vois ma lampe ? – Oui, je {vois la>la vois}. Tu prends le sac ? – Oui, je {la>le} prends. C’est un camping {où>qui} est très calme. Voilà le restaurant : c’est l’endroit {qui>où} on mange le soir. Et mes chaussures ? Je ne les vois pas !',
      kriterien: ['quatre prépositions (sur, sous, devant, à côté de …)', 'du ou des (à côté du lit …)', 'une phrase avec qui ou où', 'Il y a … dans ma chambre'] },
    { hilfe: 'Regarde avoir ou être, le participe passé et la négation.',
      text: 'Samedi, {j’ai allé>je suis allé} au cinéma avec Mia. Elle {est arrivé>est arrivée} en retard. Nous avons vu un film d’aventure. Dimanche, {j’ai fais>j’ai fait} du vélo et mes parents sont restés à la maison. Le soir, {j’ai lit>j’ai lu} une BD. Je {n’ai mangé pas>n’ai pas mangé} de dessert.',
      kriterien: ['quand ? (samedi dernier, pendant les vacances …)', 'trois verbes au passé composé avec avoir', 'un verbe avec être (je suis allé(e) …)', 'une négation : je n’ai pas …'] },
  ],
  // ================================================================ Module 4 · Médias et stars (A2.1)
  4: [
    { hilfe: 'Regarde la réponse : elle te dit quel mot interrogatif il faut.',
      text: '– {Qui>Qu’est-ce que} tu lis ? – Un article sur le festival. – Qui a écrit l’article ? – Une journaliste de la radio. – {Quand>Où} est le festival ? – Au parc de la ville. – Le concert commence {où>quand} ? – Samedi, à 20 heures. – {Comment>Combien} de personnes vont venir ? – Cinq cents. – {Pourquoi>Comment} tu y vas ? – En bus !',
      kriterien: ['un titre court', 'qui ? quoi ? où ? quand ? comment ?', 'des phrases courtes', 'vraie ou inventée : écris-le à la fin'] },
    { hilfe: 'Regarde pas de, aucun ou aucune avec ne, ce que et ce qui.',
      text: 'Dans ma commune, il y a un parc, mais il n’y a {pas cinéma>pas de cinéma}. Il n’y a {aucune>aucun} lycée et il manque un endroit pour les jeunes. Le dimanche, il {y a>n’y a} aucun bus. {Ce qui>Ce que} j’aime, c’est le parc. {Ce que>Ce qui} me plaît, c’est le marché du samedi. Un skatepark, c’est une bonne idée !',
      kriterien: ['il y a … et il n’y a pas de …', 'il manque … ou il n’y a aucun …', 'Ce que j’aime, c’est … · Ce qui me plaît, c’est …', 'À mon avis, … + une proposition'] },
    { hilfe: 'Regarde avoir envie de, la place de y, les dates et pas encore.',
      text: 'Ce week-end, j’ai envie {voir>de voir} le concert au parc. – Tu vas au festival ? – Oui, {je vais y>j’y vais} samedi soir. – Et à la piscine ? – Non, je {ne vais y pas>n’y vais pas}. Le concert est {en 19 juin>le 19 juin}, de 18 h à 22 h. Il y a un bus toutes les 30 minutes. – Tu as déjà ton billet ? – Non, {déjà pas>pas encore}.',
      kriterien: ['une proposition : Ça te dit de … ?', 'le jour et l’heure', 'J’ai envie de … ou Je voudrais …', 'le pronom y : On y va ?'] },
    { hilfe: 'Regarde savoir ou connaître, naître au passé composé et en + année.',
      text: '– Tu {sais>connais} Nora ? – Oui ! Elle {connaît>sait} très bien chanter. Elle {est né>est née} à Esch {à 2006>en 2006}. À six ans, elle chantait déjà. Je {connais>sais} où elle habite, mais je ne le dis pas ! Depuis ce jour, je connais toutes ses chansons.',
      kriterien: ['né(e) en … à …', 'trois indications de temps (en 2010, à six ans, depuis …)', 'savoir ou connaître', 'pourquoi tu admires cette personne'] },
    { hilfe: 'Regarde le féminin des métiers et des qualités, et tu ou vous.',
      text: 'Ma tante est {acteur>actrice} et mon oncle est {cuisinière>cuisinier}. Ma cousine veut devenir {chanteur>chanteuse}. Elle est {curieux>curieuse} et très {créatif>créative}. Les journalistes de la radio sont curieux. « Pardon, Madame, est-ce que je peux {te>vous} poser une question ? »',
      kriterien: ['Madame, Monsieur, …', 'trois qualités au bon genre', 'pourquoi ce métier te plaît', 'une formule de politesse à la fin'] },
    { hilfe: 'Regarde bon → meilleur, bien → mieux et l’accord.',
      text: 'À mon avis, ce film est {plus bon>meilleur} que la série. Les acteurs jouent {meilleur>mieux} et la musique est aussi belle. Les dessins sont plus {beau>beaux}. C’est {le plus meilleur>le meilleur} film de l’année ! La série est moins drôle, mais c’est un {bien>bon} début. Les actrices sont les plus {connus>connues} du pays.',
      kriterien: ['plus … que, moins … que, aussi … que', 'meilleur ou mieux', 'un superlatif (le plus …, le meilleur …)', 'l’accord des adjectifs'] },
    { hilfe: 'Regarde avoir ou être, les verbes pronominaux et ne … jamais.',
      text: 'Hier, un chien {a tombé>est tombé} dans la rivière. D’abord, une femme a vu le chien. Elle {est appelé>a appelé} le 112. Ensuite, les voitures {ont arrêté>se sont arrêtées} sur le pont. Un pompier {a arrivé>est arrivé} avec une bouée. Finalement, le chien est sorti de l’eau. Je {ai jamais vu>n’ai jamais vu} ça !',
      kriterien: ['quand ? où ? qui ? quoi ?', 'cinq phrases au passé composé', 'd’abord, ensuite, finalement', 'un verbe avec être'] },
    { hilfe: 'Regarde la météo au passé, être ou avoir, ce qui et ce que.',
      text: 'Le vendredi 11 juin, notre classe {a parti>est partie} au camping de Diekirch. Le matin, il a fait beau, mais l’après-midi, il {a plut>a plu}. Le soir, il y {a été>a eu} un orage. Nous {sommes marché>avons marché} dix kilomètres ! {Ce que>Ce qui} m’a plu, c’est le kayak. Ce que j’ai aimé, c’est le feu de camp.',
      kriterien: ['quand ? où ? qui ?', 'les activités dans l’ordre', 'la météo au passé (il a fait beau, il a plu …)', 'Ce qui m’a plu, c’est …'] },
  ],
  // ================================================================ Module 5 · Hier et aujourd’hui (A2.1 – A2.2)
  5: [
    { hilfe: 'Regarde les terminaisons de l’imparfait : -ais, -ais, -ait, -ions, -iez, -aient.',
      text: 'Avant, mon école {étais>était} petite. Le matin, nous {chantons>chantions} souvent. {J’avait>J’avais} moins de devoirs et je {suis>étais} plus libre. Par contre, j’avais moins d’amis. Mes grands-parents avaient une ferme. Et vous, vous {étaiez>étiez} contents à l’école ?',
      kriterien: ['Avant, … (trois verbes à l’imparfait)', 'Maintenant, … (au présent)', 'par contre', 'être ou avoir à l’imparfait'] },
    { hilfe: 'Regarde il / ils à l’imparfait et le même, la même.',
      text: 'Au 19e siècle, les ouvriers portaient déjà des jeans. Dans les années 1970, les jeunes {adorait>adoraient} le jean. Ils {portait>portaient} des pantalons très larges. On les {appelaient>appelait} « pattes d’éléphant ». Il y a 50 ans, ma grand-mère {porte>portait} des jupes longues. Aujourd’hui, mon père et moi, nous avons {la même>le même} sac !',
      kriterien: ['une époque (dans les années …, au … siècle)', 'trois verbes à l’imparfait', 'Aujourd’hui, … (au présent)', 'le même, la même ou les mêmes'] },
    { hilfe: 'Imparfait pour décrire, passé composé pour une action à un moment précis. Et y ou la ?',
      text: 'Il y a 2000 ans, une famille riche habitait ici, dans une grande villa. Les enfants {jouait>jouaient} aux osselets. Le père {faisiez>faisait} du commerce avec la Gaule. En 1995, un agriculteur {découvrait>a découvert} une mosaïque dans son champ. Les archéologues {sont venu>sont venus} tout de suite. Aujourd’hui, on peut {y>la} voir au musée.',
      kriterien: ['Il y a 2000 ans, …', 'cinq verbes à l’imparfait', 'un verbe au passé composé (Un jour, …)', 'le matin, à midi, le soir'] },
    { hilfe: 'Regarde l’impératif (tu, nous, vous), le trait d’union et ne … pas.',
      text: 'Nouveau ! {Essayes>Essaie} notre jus « Super Fruit » ! {Venir>Venez} au magasin samedi : un jus offert ! Notre appli est gratuite : {télécharge la>télécharge-la} ! {Prendons>Prenons} le temps de goûter ! Mais attention : {ne achète pas>n’achète pas} n’importe quoi !',
      kriterien: ['le nom du produit et un slogan', 'trois verbes à l’impératif', 'pour qui ? (le public cible)', 'une offre (gratuit, – 20 % …)'] },
    { hilfe: 'Regarde l’accord, en bois, ça sert à + infinitif.',
      text: 'C’est une boîte {carré>carrée}. Elle est {de bois>en bois} et elle est très légère. Ça sert {pour>à} ranger les crayons. Avant, mon grand-père avait des disquettes {carré>carrées}. On les utilisait pour {sauvegardé>sauvegarder} des fichiers. Ça servait à garder les photos. Qu’est-ce que c’est ?',
      kriterien: ['la forme et la matière (en bois, en métal …)', 'Ça sert à … + infinitif', 'l’accord (une table ronde …)', 'Qu’est-ce que c’est ? à la fin'] },
    { hilfe: 'Regarde interdit de, il faut + infinitif, les ou leur, le ou lui.',
      text: 'À la piscine, il est interdit {courir>de courir}. Il faut {prends>prendre} une douche avant de nager. Le maître-nageur explique les règles : il {leur>les} explique. Il parle aux enfants : il {les>leur} parle doucement. Ben n’a pas de bonnet : le maître-nageur {le>lui} prête un bonnet. Ne plongez pas ici !',
      kriterien: ['Il est interdit de … (deux fois)', 'Il faut … ou C’est obligatoire', 'un ordre : Ne … pas !', 'Tu peux … (c’est permis)'] },
    { hilfe: 'Imparfait : le décor et les habitudes. Passé composé : les actions.',
      text: '{Il était un fois>Il était une fois} une forêt sombre. Elsa {a été>était} une fille courageuse. Chaque soir, elle {a regardé>regardait} les étoiles. Un soir, tout à coup, elle {voyait>a vu} une lumière. Elle {a sorti>est sortie} de la maison. Quand elle a ouvert la vieille boîte, elle a trouvé des graines. Et depuis ce jour, la forêt est verte.',
      kriterien: ['Il était une fois … ou Il y a très longtemps …', 'le décor à l’imparfait', 'les actions au passé composé (Un jour, tout à coup …)', 'la fin : Et depuis ce jour, …'] },
    { hilfe: 'Regarde la négation, par contre, déplacer + infinitif et ça te dit de.',
      text: 'Salut Inès ! Merci pour ton invitation. Désolée, je {peux pas>ne peux pas} venir samedi, parce que je dois garder mon frère. {Pars contre>Par contre}, vendredi, je suis libre. On peut {déplacé>déplacer} la fête à vendredi ? Ça te dit {aller>d’aller} au cinéma après ? Et en plus, j’apporte des crêpes ! À bientôt !',
      kriterien: ['Tu veux venir … ? ou Ça te dit de … ?', 'le jour, l’heure et le lieu', 'et aussi ou en plus', 'Réponds-moi avant … · À bientôt !'] },
  ],
  // ================================================================ Module 6 · Nature et avenir (A2.1 – A2.2)
  6: [
    { hilfe: 'Regarde à la campagne / en ville, depuis, l’ et parce qu’.',
      text: 'J’habite {en campagne>à la campagne} {pendant>depuis} dix ans. J’aime vivre ici, car j’adore les animaux. {À la ville>En ville}, il y a beaucoup de bruit. L’avantage, c’est que tout est près. {Le inconvénient>L’inconvénient}, c’est le bus : il passe deux fois par jour. Je reste ici {parce que il>parce qu’il} y a la forêt.',
      kriterien: ['en ville, à la campagne, à la mer …', 'deux raisons avec parce que ou car', 'un avantage et un inconvénient', 'D’un côté, … de l’autre, …'] },
    { hilfe: 'Imparfait : la situation. Passé composé : les actions. Et les adverbes en -ment.',
      text: 'Ce jour-là, il {a fait>faisait} beau. J’étais avec Chloé dans la forêt. Nous avons quitté le chemin et, tout à coup, nous {nous avons perdues>nous sommes perdues}. Nous avons marché {rapide>rapidement}. {Heureusment>Heureusement}, j’avais mon portable chargé. {Finalment>Finalement}, un garde forestier nous a trouvées.',
      kriterien: ['la situation à l’imparfait (Il faisait …)', 'les actions au passé composé', 'soudain / tout à coup · enfin', 'un adverbe en -ment'] },
    { hilfe: 'Regarde être en train de + infinitif et le masculin ou le féminin.',
      text: 'Je {suis en train brosser>suis en train de brosser} la chatte. Elle est très {affectueux>affectueuse} et un peu {peureux>peureuse}. Mon chien est {joueuse>joueur} et {douce>doux}. Il a de longues oreilles. Et toi, qu’est-ce que tu es en train de faire ?',
      kriterien: ['le nom, l’âge et l’aspect de l’animal', 'deux mots pour le caractère, au bon genre', 'Il aime … · Il a besoin de …', 'pour qui ? (une famille calme, un jardin …)'] },
    { hilfe: 'Regarde l’impératif avec le ou lui, la négation et il est important de.',
      text: 'Votre chien est fatigué ? {Laissez le>Laissez-le} se reposer. {Donnez-lui pas>Ne lui donnez pas} de chocolat ! Il a soif ? {Donne-le>Donne-lui} de l’eau. Il faut laisser un bol d’eau près de lui. Il est important {jouer>de jouer} avec lui. Il est triste {parce que il>parce qu’il} est seul ? Promenez-le souvent, car il aime courir.',
      kriterien: ['cinq conseils', 'l’impératif avec un pronom (Promène-le !, Donne-lui …)', 'Il faut … ou Il est important de …', 'une explication avec car ou parce que'] },
    { hilfe: 'Regarde des, ressembler à, les adverbes en -ment et si + présent.',
      text: 'La loutre vit près {de les>des} rivières. Elle ressemble {un>à un} petit chien. Elle nage {discrète>discrètement}, la nuit. {Malheureusment>Malheureusement}, elle est rare. Elle est protégée : il est interdit de la chasser. Si vous {reviendrez>revenez} le soir, vous la verrez peut-être.',
      kriterien: ['Il / Elle vit … · Il / Elle mange …', 'Il / Elle ressemble à …', 'un adverbe en -ment', 'un conseil pour la nature'] },
    { hilfe: 'Regarde le participe passé, le pluriel, les verbes en -er, sûr et qu’.',
      text: 'D’abord, les élèves ont trié les déchets. Ensuite, ils {ont réparer>ont réparé} les vieux vélos. Avant, la cantine jetait 40 {kilo>kilos} de pain par semaine. Maintenant, nous {économisont>économisons} l’eau et nous éteignons la lumière. Je {suis sur>suis sûr} que c’est possible ! Je crois {que on>qu’on} peut faire plus.',
      kriterien: ['le projet : D’abord, … Ensuite, …', 'un chiffre (40 kilos par semaine …)', 'Je suis sûr(e) que … ou Je pense que …', 'une proposition pour la classe'] },
    { hilfe: 'Regarde les terminaisons du futur et les futurs irréguliers (je serai, j’irai …).',
      text: 'En 2050, je {serais>serai} médecin. Il y aura des voitures sans conducteur. Nous {allerons>irons} en vacances sur la Lune ! Mon frère {aurai>aura} un robot à la maison. Et toi, tu {fera>feras} quel métier ? Vous {pourez>pourrez} travailler de chez vous.',
      kriterien: ['En 2050, …', 'cinq verbes au futur simple', 'deux futurs irréguliers (sera, aura, ira …)', 'des mots standard, pas familiers'] },
    { hilfe: 'Regarde si + présent, quand + futur, et les temps (avant, maintenant, plus tard).',
      text: 'Au début, je ne {comprends>comprenais} rien en français. Maintenant, je comprends beaucoup mieux. J’ai appris à parler devant la classe. Si {j’aurai>j’ai} de bonnes notes, je ferai une formation de cuisinier. L’année prochaine, je {progresse>progresserai} encore. Si tu {travailleras>travailles} un peu chaque jour, tu réussiras. Quand tu {es>seras} découragé, tu reliras ton journal.',
      kriterien: ['Chère classe, …', 'Au début, … (imparfait) · Maintenant, … (présent)', 'deux conseils avec si + présent → futur', 'une phrase avec quand + futur'] },
  ],
  // ================================================================ Module 7 · Voyages et émotions (A2.2)
  7: [
    { hilfe: 'Regarde le conditionnel (j’aimerais), en ou à, depuis ou il y a.',
      text: 'Pour le voyage de classe, {j’aimerai>j’aimerais} aller à Bruxelles. Nous partirions du 4 au 6 mai, {à train>en train}. Le train est plus confortable que le bus, et c’est {la moins cher>le moins cher}. Nous sommes allés à Vianden {depuis>il y a} deux ans. J’attends ce voyage {il y a>depuis} une semaine !',
      kriterien: ['J’aimerais … · On pourrait …', 'combien de temps ? (pendant, du … au …)', 'une comparaison (plus … que, moins … que)', 'deux raisons (parce que, car)'] },
    { hilfe: 'Regarde la place des adjectifs, bel / nouvel / vieil, il vaut mieux et conseiller de.',
      text: 'Salut Finn ! Pour la classe de neige, prends un {noir grand sac>grand sac noir}. Il vaut mieux {prends>prendre} des chaussures confortables. Tu as un {nouveau>nouvel} anorak ? Mets aussi {des vieilles>de vieilles} baskets pour l’hôtel. C’est un {beau>bel} hôtel ! Je te conseille {mettre>de mettre} ton nom sur tes affaires. Tu devrais vérifier ta liste.',
      kriterien: ['une liste avec des adjectifs bien placés', 'bel, nouvel ou vieil', 'deux conseils (Il vaut mieux …, Tu devrais …)', 'Bon voyage ! à la fin'] },
    { hilfe: 'Regarde le conditionnel, qui / que / où et la fin d’un courriel formel.',
      text: 'Madame, Monsieur, nous visitons Vianden en mai. Pourriez-vous nous envoyer un plan ? {J’aimerai>J’aimerais} savoir à quelle heure ouvre le château. Le château, {que>qui} domine la ville, est-il ouvert le lundi ? Le musée {qui>que} les visiteurs aiment est-il loin ? Nous cherchons aussi un endroit {que>où} dorment les classes. Je vous remercie d’avance. {Bisous>Cordialement}, Yusuf',
      kriterien: ['Madame, Monsieur,', 'deux questions polies (Pourriez-vous … ? J’aimerais savoir …)', 'qui, que ou où', 'Je vous remercie d’avance. Cordialement, + ton nom'] },
    { hilfe: 'Regarde c’est ou il est, le féminin, et qui ou que.',
      text: 'Mon correspondant s’appelle Hugo. {Il est>C’est} un garçon timide, mais il est plutôt drôle. Sa sœur Lou est {bavard>bavarde} et très {généreux>généreuse}. Hugo, c’est quelqu’un {que>qui} aime la musique. C’est un ami {qui>que} je vais visiter en juin. Hugo et Lou ? {Ils sont>Ce sont} mes amis ! Moi, je ne suis pas du tout jaloux.',
      kriterien: ['Je m’appelle … · J’ai … ans', 'trois traits de caractère (un peu, plutôt, très …)', 'C’est quelqu’un qui … ou Je suis …', 'une question pour ton correspondant'] },
    { hilfe: 'Regarde le féminin (fière, déçue), parce qu’, avoir peur de et quand + présent.',
      text: 'Hier, j’étais très {fier>fière} : notre équipe a gagné ! Mais mon amie Lina était {déçu>déçue} {parce que elle>parce qu’elle} n’a pas joué. Demain, j’ai un examen : j’ai peur {rater>de rater}. Je suis stressée depuis des semaines. Quand je {serai>suis} stressée, je fais du sport. Lina m’a dit : « Courage ! »',
      kriterien: ['trois émotions différentes', 'pourquoi ? (parce que, car)', 'Quand …, je suis …', 'Cher journal, … et la date'] },
    { hilfe: 'Regarde le conditionnel, si + imparfait, il vaut mieux + infinitif et conseiller de.',
      text: 'Cher Max, tu es tellement stressé que tu ne dors plus ? Tu {devras>devrais} parler à un adulte de confiance. Si {je serais>j’étais} toi, je {fais>ferais} du sport avec la classe. Il vaut mieux {arrête>arrêter} les écrans le soir. Je te conseille {parler>de parler} à ton prof principal. Et n’hésite pas à appeler le 116 111 !',
      kriterien: ['Cher … / Chère …,', 'trois conseils différents (Tu devrais …, Il vaut mieux …, Je te conseille de …)', 'Si j’étais toi, je …', 'une phrase pour encourager (Courage ! Tu n’es pas seul(e).)'] },
    { hilfe: 'Après si : l’imparfait. Puis le conditionnel (-ais, -ait, -ions …).',
      text: 'Si {j’aurais>j’avais} une baguette magique, je {ferai>ferais} le tour du monde. Si j’étais invisible, {j’irai>j’irais} partout. Avec mes amis, nous {pourions>pourrions} voler au-dessus de la ville. Ce serait génial ! Et toi, si tu {serais>étais} riche, qu’est-ce que tu achèterais ?',
      kriterien: ['Si j’avais … / Si j’étais … (deux fois)', 'quatre verbes au conditionnel', 'un verbe irrégulier (j’irais, je ferais, je serais …)', 'pas de conditionnel après si !'] },
    { hilfe: 'Regarde les paroles rapportées (je → elle, mon → son, si) et le, lui, les, leur.',
      text: 'Zoé m’a écrit. Elle m’a dit {que je venais>qu’elle venait} à Vianden en juin. Elle m’a dit aussi que {mon>son} frère venait. Elle m’a demandé {que>si} j’avais une chambre pour eux. Son frère ? Je {lui>le} connais bien, il est sympa. Mes parents ? Je {les>leur} ai téléphoné hier : ils sont d’accord !',
      kriterien: ['le lieu et la date en haut à droite · Chère Zoé,', 'le voyage au passé composé', 'deux paroles rapportées (Il m’a dit que …)', 'Bisous ou Amitiés + ta signature'] },
  ],
  // ================================================================ Module 8 · Famille et santé (A2.2 – B1.1)
  8: [
    { hilfe: 'Regarde venir de, être en train de, être sur le point de et le gérondif (en + -ant).',
      text: 'Samedi, ménage ! Lina {vient se réveiller>vient de se réveiller}. Papa est en train {passer>de passer} l’aspirateur. Lio est {au point>sur le point} de partir au foot. Je range ma chambre {en chantent>en chantant}. Maman travaille {en écoutons>en écoutant} la radio. Lio crie : « Ce n’est pas juste ! » Puis il dit : « Pardon, je me suis énervé. »',
      kriterien: ['trois personnes de la famille (inventée)', 'deux périphrases (venir de, être en train de …)', 'un gérondif (en rangeant …)', 'une solution : Pardon … · On trouve une solution ?'] },
    { hilfe: 'Regarde sans + infinitif, les adverbes en -ment et s’asseoir.',
      text: 'Chloé sort {sans dit>sans dire} un mot. Mamie parle {calme>calmement}. Léo lève les yeux au ciel et répond {gentilment>gentiment}. Puis il {s’assoie>s’assoit} et mange sans regarder son portable. Le rideau tombe {lentment>lentement}.',
      kriterien: ['6 à 8 répliques avec le nom des personnages', 'deux didascalies, entre parenthèses', 'un adverbe en -ment', 'sans + infinitif'] },
    { hilfe: 'Regarde il faut que + subjonctif (fasse, aille, sois, ait) et tu ou vous.',
      text: 'Pour la fête, il faut que je range le salon. Il faut que tu {fais>fasses} les courses. Il faut que Noah {va>aille} chercher les chaises. Il faut que tu {es>sois} là à 18 h ! Il faut que Léa {a>ait} les clés. Je demande à la voisine : « Madame, {excuse-moi>excusez-moi} de vous déranger. Vous pourriez me prêter une table ? »',
      kriterien: ['il faut que … (deux fois)', 'une demande polie (Tu pourrais … ? Ça te dérange de … ?)', 'tu ou vous, selon la personne', 'Merci d’avance !'] },
    { hilfe: 'Regarde du, de la, de l’, la négation avec de et la place de en.',
      text: 'Le matin, je bois {du eau>de l’eau} et je mange du pain. Je ne mange pas {de la>de} viande. Tu manges des fruits ? – Oui, {je mange en>j’en mange} cinq par jour. Il y a encore du pain ? – Non, il {n’y a plus en>n’y en a plus}. La mousse {à le>au} chocolat ? Un peu de mousse, c’est bon aussi !',
      kriterien: ['les quatre repas de la journée', 'du, de la, des (et pas de …)', 'deux quantités (un peu de, une portion de …)', 'une explication : pour le sport, il faut …'] },
    { hilfe: 'Regarde quantité + de, avant de + infinitif et l’impératif (sans -s).',
      text: 'Les crêpes de Mamie, pour quatre {personne>personnes} : 250 grammes {de la>de} farine, un demi-litre {du>de} lait, trois œufs et une pincée de sel. Mets la farine dans un bol. Mélange bien pour éviter les grumeaux. {Avant cuire>Avant de cuire} la crêpe, mets un peu de beurre dans la poêle. Si la pâte est épaisse, {ajoutes>ajoute} du lait.',
      kriterien: ['les ingrédients avec les quantités (+ de)', 'quatre verbes à l’impératif (mets, verse, mélange …)', 'avant de … ou pour + infinitif', 'pour combien de personnes ?'] },
    { hilfe: 'Regarde l’impératif, le gérondif, sans + infinitif, les adverbes et le passé composé.',
      text: '{Allonges-toi>Allonge-toi} sur le tapis. Plie les genoux. Lève les bras {en respirent>en respirant} profondément. Tends les jambes {sans lever pas>sans lever} les talons. Pose les mains {douce>doucement} sur le ventre. C’est clair ? Tu {as comprendre>as compris} ?',
      kriterien: ['le nom de l’exercice et pour quoi il est bon', 'quatre verbes à l’impératif', 'un gérondif (en respirant …) et un adverbe (lentement …)', 'une question pour vérifier : C’est clair ?'] },
    { hilfe: 'Regarde à, de, en · grâce à ou à cause de · donc ou pourtant.',
      text: 'Hier, j’ai acheté un sweat {de capuche>à capuche} et des chaussures {à sport>de sport}. {Grâce à>À cause de} la pluie, j’ai eu froid au retour. Par contre, {à cause de>grâce à} la capuche, ma tête est restée sèche. Les bottes de pluie étaient très chères, {pourtant>donc} je ne les ai pas achetées.',
      kriterien: ['les deux offres : la matière, le prix, la qualité', 'parce que · grâce à · à cause de', 'donc ou c’est pourquoi', 'ton conseil : À ta place, je …'] },
    { hilfe: 'Regarde le présent pour raconter, ce qui m’a plu et conseiller à.',
      text: 'C’est l’histoire {à>de} trois amis. Au début, ils {partaient>partent} en bateau. Quand la tempête {arrivait>arrive}, ils ont très peur. Je ne dis pas la fin ! J’ai trouvé ça génial. {Ce que>Ce qui} m’a plu, c’est le suspense. Je le conseille {pour>à} mes amis, parce qu’il est drôle aussi.',
      kriterien: ['le titre et le genre', 'l’histoire au présent (Au début, … Ensuite, …)', 'Ce qui m’a plu, c’est … · Ce qui ne m’a pas plu, …', 'Je le conseille à … parce que …'] },
  ],
  // ================================================================ Module 9 · La vie culturelle (B1.1)
  9: [
    { hilfe: 'Regarde l’accord du verbe (la plupart, tout le monde, les gens) et tel / telle.',
      text: 'La plupart des jeunes {écoute>écoutent} du rap. Tout le monde {aiment>aime} la musique, mais les gens {pense>pensent} que le rap est trop dur. Moi, je préfère la pop au rap. Quelle chanteuse ! Une {tel>telle} voix, c’est rare. De {tels>telles} chansons me touchent. Le metal ? Ce n’est pas mon style.',
      kriterien: ['quelle musique et pourquoi', 'À mon avis, … · Je trouve que …', 'la plupart des … ou tout le monde …', 'une réaction polie à un autre message'] },
    { hilfe: 'Regarde si … que, tellement de, donner envie de et avoir les larmes aux yeux.',
      text: 'Cette chanson me touche. Sa voix est si douce {qui>que} j’ai des frissons. Il y a tellement {des émotions>d’émotions} dans les paroles ! Le refrain me donne envie {danser>de danser}. Le soir, ça me {fais>fait} du bien. À la fin, j’ai {des larmes à les yeux>les larmes aux yeux}. Le rythme est tellement doux que je l’écoute partout.',
      kriterien: ['le titre, l’artiste et le style', 'deux mots de la chanson (la mélodie, les paroles, le refrain …)', 'Cette chanson me rend … · Ça me donne envie de …', 'si … que ou tellement … que'] },
    { hilfe: 'Regarde les questions pour faire préciser et la comparaison avec comme.',
      text: '– J’ai aimé ton slam ! Mais qu’est-ce que tu veux dire {pour>par} « Je suis un pont » ? – Je parle deux langues à la maison. – Tu peux {explique>expliquer} plus clairement ? Ça veut dire {quel>quoi}, « racines » ? – Ce sont mes origines. Je suis fort {que>comme} un arbre. – Ah ! Si je comprends {bon>bien}, tu es fier de tes deux cultures ? – Exactement !',
      kriterien: ['6 à 8 vers qui commencent par Je suis …', 'une comparaison avec comme', 'une métaphore', 'deux rimes'] },
    { hilfe: 'Regarde plus de / autant que, et meilleur ou mieux.',
      text: 'Au Japon, l’école commence en avril, alors qu’ici, elle commence en septembre. Les élèves japonais ont {plus des>plus de} cours que nous. Ici, il y a moins d’élèves par classe. Là-bas, les pâtisseries sont {plus bonnes>meilleures} ! Ma correspondante chante {plus bien>mieux} que moi et elle lit {autant de>autant que} moi.',
      kriterien: ['plus … que, moins … que, aussi … que (adjectifs)', 'plus de, moins de, autant de (noms)', 'alors que ou tandis que', 'Chez nous, c’est différent : une phrase sans juger'] },
    { hilfe: 'Regarde est-ce que, quel / quelle, ou, vous pour un adulte et la négation avec devoir.',
      text: '{Est-ce tu joues>Est-ce que tu joues} d’un instrument ? {Quel>Quelle} musique tu écoutes le plus ? Tu préfères le rap {et>ou} la pop ? Combien de temps tu écoutes de la musique par jour ? Madame, quelle musique {écoutes-tu>écoutez-vous} ? Règle de l’enquête : on écoute jusqu’au bout et on ne {doit se moquer pas>doit pas se moquer}.',
      kriterien: ['un sujet et un titre', '5 ou 6 questions : fermées, ouvertes et à choix', 'une version avec vous pour les adultes', 'Excusez-moi … · Merci beaucoup !'] },
    { hilfe: 'Regarde la plupart des + pluriel, des, sur, les ordinaux et pour cent.',
      text: 'Selon notre enquête, la plupart des élèves {écoute>écoutent} du rap. La moitié {de les>des} élèves joue d’un instrument. Un élève {de>sur} cinq chante dans une chorale. Le rap arrive premier, la pop {deuxièmement>deuxième}. Trente-huit {pourcent>pour cent} des élèves écoutent de la musique en faisant leurs devoirs. Source : journal de l’école, mai.',
      kriterien: ['Selon notre enquête, …', 'trois quantités (la plupart des, la moitié des, un sur cinq …)', 'deux pourcentages, en chiffres et en lettres', 'la source à la fin'] },
    { hilfe: 'Regarde à cause du, dû au, grâce au, donc (conséquence) et pour (but).',
      text: 'Beaucoup de jeunes ont un sifflement dans les oreilles {à cause de le>à cause du} bruit. Ce problème est {dû à le>dû au} volume trop fort. {Grâce à le>Grâce au} casque, on n’entend plus le bruit de la rue. Il y a du bruit, {pour>donc} je monte le son. On fait une pause {donc>pour} reposer ses oreilles. L’avantage, c’est que la musique fait du bien. En conclusion, il faut écouter moins fort.',
      kriterien: ['une introduction : le sujet', 'deux avantages et deux inconvénients', 'grâce à, à cause de, donc, pour', 'En conclusion, … + ton avis'] },
    { hilfe: 'Utilise la fiche-guide : les accords, les verbes, les abréviations.',
      text: '{Sam.>Samedi} 14 mai, notre école a organisé la fête des cultures. Il faisait beau et {env.>environ} 200 personnes sont venues. D’abord, les familles {sont arrivé>sont arrivées}. Ensuite, les élèves {ont présentés>ont présenté} des danses. À la fin, nous {avons mangés>avons mangé} des plats du monde entier. C’était une très belle fête !',
      kriterien: ['quand ? où ? qui ? quoi ? dans la première phrase', 'au passé composé (+ imparfait pour décrire)', 'd’abord, ensuite, à la fin', 'pas d’abréviations · ton avis à la fin'] },
  ],
}

const ANLEITUNG_NIVEAU = 'Les points montrent le niveau : ●○○ base · ●●○ standard · ●●● plus. Au début de « S’entraîner », l’encadré **Mon parcours** te dit quels exercices tu fais.'
const ANLEITUNG_EXTRA = [
  'Chaque exercice a des points (…… / 6). Corrige avec le **cahier des solutions**, au stylo vert, et compte tes points. Bloqué ? Relis d’abord **La règle**.',
  'À la fin du cahier, il y a ton **aide-mémoire** : toutes les règles du module. Détache-le et garde-le dans ton classeur.',
]

export function anwenden(MODUL0, LEKTIONEN0) {
  const { MODUL, LEKTIONEN } = mitSprechen(MODUL0, LEKTIONEN0)
  const nr = MODUL.nr, extra = X[nr] || []
  const anleitung = []
  for (const z of MODUL.anleitung || []) anleitung.push(/^Les points montrent le niveau/.test(z) ? ANLEITUNG_NIVEAU : z)
  if (!anleitung.includes(ANLEITUNG_NIVEAU)) anleitung.push(ANLEITUNG_NIVEAU)
  anleitung.push(...ANLEITUNG_EXTRA)
  const M = franzoesischProgramm({ ...MODUL, anleitung, parcours: true, punkte: true, aideMemoire: true })
  const L = LEKTIONEN.map((l, i) => {
    const x = extra[i]
    if (!x) return l
    const fehler = (x.text.match(/\{[^{}]*>[^{}]*\}/g) || []).length
    const korrektur = { art: 'korrektur', stufe: 2, text: x.text,
      auftrag: `Je relis comme un correcteur : trouve et corrige les ${fehler} erreurs. Attention : certaines formes sont correctes !`,
      hilfe: 'Barre l’erreur et écris la bonne forme au-dessus. ' + x.hilfe }
    const schreiben = (l.schreiben || []).map((a) => ({ ...a }))
    const ziel = schreiben.find((a) => a.art === 'schreiben' && (a.stufe || 2) >= 2) || schreiben.filter((a) => a.art === 'schreiben').pop()
    if (ziel && x.kriterien) ziel.kriterien = x.kriterien
    return { ...l, ueben: [...(l.ueben || []), korrektur], schreiben }
  })
  return { MODUL: M, LEKTIONEN: L }
}
