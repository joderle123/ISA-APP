// REAL TALK #01 · MOI – französische Fassung der drei Stunden (Auftrag 24.11.2026: „übersetze das REAL TALK 01 auch auf
// Französisch“). Gleicher Aufbau wie m1-stunden.ts, Station für Station. Begriffe: Tank = réservoir, Tankstelle = station,
// laut/leise = voix haute/voix basse (ohne männliche/weibliche Endungen), Akte = dossier, Leitung = l’adulte.
// Die Tank-Karten tragen beide Wörter (Auftrag 24.11.2026). Die Videos sind deutschsprachig (Hinweis an der Station).
// Alle Personen und Situationen sind erfunden.
import type { Stunde } from '../typen'

const VIDEO_DE = 'Vidéo en allemand (sous-titres FR possibles). '

/* ---------- Séance 1 · Réservoir vide ---------- */
const tank: Stunde = {
  frage: 'Pourquoi tu t’énerves parfois – alors que personne ne t’a rien fait ?',
  dauer: 'environ 90 minutes',
  kannst: ['dire à quel point tes réservoirs sont pleins', 'remarquer ce qui te manque en ce moment', 'remplir à nouveau un réservoir vide'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Arriver : ta batterie aujourd’hui', zeit: '5 min', wie: 'solo', icon: 'door-enter',
          leitung: 'En silence. Personne ne montre sa feuille. Le mot de la question 2 servira à tout le monde à la fin.',
          bausteine: [
            { art: 'fragen', kontext: 'Juste pour toi.', fragen: [
              { f: 'Ta batterie est pleine comment, là ? Colorie-la.', akku: 'vide' },
              { f: 'Qu’est-ce qui était déjà agaçant aujourd’hui ? Un mot suffit.', linien: 1 },
            ] },
          ],
        },
        {
          titel: 'Ça te parle ?', zeit: '12 min', wie: 'solo · puis tous', icon: 'hand-finger',
          leitung: 'D’abord cocher en silence. Puis lire chaque phrase, tout le monde montre le pouce en même temps – vous aussi. Seulement compter, pas de questions.',
          bausteine: [
            { art: 'text', x: ['Six phrases. Coche ce que tu connais de toi. Ensuite, l’adulte lit chaque phrase – tout le monde montre le pouce en même temps : **en haut** = je connais, **en bas** = je ne connais pas.'] },
            { art: 'fragen', fragen: [{ f: 'Ça te parle ?', raster: { spalten: ['je connais', 'un peu', 'je ne connais pas'], zeilen: [
              'A · Quand j’ai faim, tout m’énerve.',
              'B · Quand je ne sais pas ce qui va se passer demain, je deviens nerveux ou nerveuse.',
              'C · Quand tout le monde prévoit quelque chose sans moi, ma journée est fichue.',
              'D · Quand personne ne m’écoute, je hausse le ton – ou je ne dis plus rien.',
              'E · Quand quelqu’un me dit sans arrêt quoi faire, je fais exprès le contraire.',
              'F · Quand il ne se passe rien, je fais des bêtises.',
            ] } }] },
            { art: 'reden', x: ['Quelle phrase presque tout le monde connaissait ?', 'Qui veut : c’était quand, la dernière fois, chez toi ?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Clip : ce que la nuit fait de toi', zeit: '15 min', wie: 'tous', icon: 'player-play',
          leitung: VIDEO_DE + 'Plutôt difficile : expliquer avant « mémoire » et « sommeil profond ». Montre comment le cerveau range la nuit, pas l’effet sur l’humeur – pour « C’est vrai ? », on devine puis on corrige.',
          bausteine: [
            {
              art: 'clip',
              clip: { titel: 'Mehr als lebenswichtig: Darum schlafen wir!', kanal: 'Quarks · vidéo en allemand', url: 'https://www.youtube.com/watch?v=sdH-fEEh1uY', dauer: '00:00 à 05:09 (en entier)', frage: 'Que fait ton cerveau pendant que tu dors ?' },
              vorher: [
                { f: 'Ton pronostic : que fait ton cerveau pendant que tu dors ?', kreuz: ['Il est éteint.', 'Il continue de travailler.'], unter: true },
                { f: 'Combien d’heures as-tu dormi cette nuit – à peu près ? (Juste pour toi.)', zahl: ['heures'] },
              ],
              dabei: ['Voilà ce que fait le cerveau la nuit (une chose suffit) :', 'Ce qui était surprenant :'],
              nachher: [
                { f: 'Pourquoi le sommeil aide avant un contrôle ?', kreuz: ['Le cerveau garde ce que tu as appris.', 'On a meilleure mine quand on est reposé.', 'Ça n’aide pas.'], unter: true },
                { f: 'Qu’est-ce que tu essaies cette semaine ? (C’est ok aussi : « Rien – ça va comme ça. »)', linien: 1 },
              ],
            },
            { art: 'fragen', fragen: [{ f: 'C’est vrai ? Certaines choses ne sont pas dans la vidéo – alors devine. On corrige après.', raster: { spalten: ['vrai', 'faux'], zeilen: [
              'Pendant le sommeil, le cerveau range et garde ce que tu as appris.',
              'Quand on dort trop peu, on s’énerve plus vite.',
              'Le sommeil perdu se rattrape entièrement le week-end.',
              'Le téléphone au lit aide la plupart du temps à s’endormir.',
              'Une boisson énergisante remplace une heure de sommeil.',
            ] } }] },
            { art: 'reden', x: ['Qu’est-ce qui vous empêche de dormir le soir ?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Le modèle : tes six réservoirs', zeit: '12 min', wie: 'tous · puis solo', icon: 'gauge',
          leitung: 'Lire les six réservoirs, un exemple du groupe pour chacun. Puis relier et colorier – en silence. Personne ne doit montrer ses réservoirs.',
          bausteine: [
            { art: 'text', x: ['Le sommeil n’est qu’**un** réservoir sur six. Chaque personne fonctionne avec eux – comme les jauges dans un jeu vidéo. Si l’un est vide, tu t’énerves plus vite, tu te fatigues plus vite ou tu deviens triste. Ce qui remplit un réservoir s’appelle une **station**.'] },
            {
              art: 'modell', warnTitel: 'Vide ? Alors souvent', anzeige: 'moi',
              punkte: [
                { icon: 'bed', t: 'Le corps', x: 'Sommeil, manger, boire, bouger.', warn: 'à cran, fatigue, mal de tête' },
                { icon: 'shield', t: 'La sécurité', x: 'Savoir ce qui arrive et qui est là.', warn: 'nervosité, méfiance' },
                { icon: 'users', t: 'Faire partie', x: 'Des gens avec qui tu es.', warn: 'tristesse, jalousie, solitude' },
                { icon: 'ear', t: 'Être pris au sérieux', x: 'Quelqu’un t’écoute.', warn: 'se vexe, crie, se ferme' },
                { icon: 'steering-wheel', t: 'Décider soi-même', x: 'Avoir le droit de choisir quelque chose.', warn: 'fait la tête, « je m’en fiche »' },
                { icon: 'confetti', t: 'Plaisir et nouveauté', x: 'Vivre quelque chose de nouveau.', warn: 'ennui, ne tient pas en place' },
              ],
            },
            { art: 'fragen', fragen: [
              { f: 'Colorie chaque réservoir : il est plein comment chez toi aujourd’hui ?' },
              { f: 'Les six phrases de la station 2 : quel réservoir est vide à chaque fois ? Relie.', verbinden: [['A · faim', 'B · demain pas clair', 'C · pas dans le plan', 'D · personne n’écoute', 'E · on me dit toujours quoi faire', 'F · rien ne se passe'], ['Être pris au sérieux', 'Plaisir et nouveauté', 'Le corps', 'Décider soi-même', 'La sécurité', 'Faire partie']] },
            ] },
            { art: 'reden', x: ['Quel réservoir est le plus vide chez vous le lundi matin – et lequel le vendredi soir ?', 'Qu’est-ce qui vous remplit le plus vite ?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'La grande ronde : Je connais !', zeit: '20 min', wie: 'tous · à la table', icon: 'cards',
          leitung: 'Découper les cartes avant. Vous jouez aussi. Pas de points : reconnaître et raconter. Qui ne veut rien dire montre le pouce.',
          bausteine: [
            {
              art: 'aktion',
              ziel: 'Relier des situations du quotidien aux réservoirs – et entendre ce que les autres en pensent.',
              material: 'les 6 cartes réservoirs et les 18 cartes situations de la page suivante (à découper)',
              schritte: [
                'Posez les 6 cartes réservoirs au milieu.',
                'Une personne tire une carte situation et la lit à voix haute.',
                'Tout le monde montre le pouce en même temps : **en haut** = je connais, **sur le côté** = un peu, **en bas** = je ne connais pas.',
                'Décidez ensemble : quel réservoir est vide ici ? Posez la carte à côté.',
                'Qui veut dit : qu’est-ce qui aide dans ce cas ? Ensuite, la personne suivante tire.',
              ],
              regeln: ['Il n’y a ni vrai ni faux. Si deux réservoirs vont, posez la carte entre les deux.', 'Personne ne doit raconter quelque chose. Montrer le pouce suffit.'],
              zu3: 'Pareil – l’adulte tire et montre aussi.',
              notiz: { titel: 'La meilleure station que j’ai entendue aujourd’hui :', linien: 1 },
              auswertung: ['À côté de quel réservoir y a-t-il le plus de cartes ?', 'Quelle carte presque tout le monde connaissait ?'],
            },
            {
              art: 'chat', titel: 'Voilà à quoi ressemble un tour',
              zeilen: [
                { wer: 'Mia lit :', x: '« Dimanche, pluie, plus de wifi. »' },
                { wer: '', x: 'Tout le monde montre le pouce : trois en haut, un sur le côté.', art: 'tut' },
                { wer: 'Ben dit :', x: 'C’est plaisir et nouveauté, non ?' },
                { wer: 'Mia dit :', x: 'Moi, ça m’aide de sortir ou d’appeler quelqu’un.' },
                { wer: '', x: 'La carte va au réservoir 6. Maintenant, c’est Ben qui tire.', art: 'tut' },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Matériel : 6 réservoirs et 18 situations', zeit: '', wie: 'pour la station 5', icon: 'scissors', fort: true,
          bausteine: [
            // Zweisprachig (Auftrag 24.11.2026): französisch groß, deutsch klein – auf der deutschen Fassung umgekehrt
            { art: 'karten', wort: true, spalten: 6, hoehe: 26, hinweis: 'Les six réservoirs : découpe-les et pose-les au milieu. En français et en allemand.', karten: [
              { t: 'Le corps', x: 'Körper' }, { t: 'La sécurité', x: 'Sicherheit' }, { t: 'Faire partie', x: 'Dazugehören' },
              { t: 'Être pris au sérieux', x: 'Ernst genommen' }, { t: 'Décider soi‑même', x: 'Selbst entscheiden' }, { t: 'Plaisir et nouveauté', x: 'Spaß und Neues' }] },
            {
              art: 'karten', spalten: 3, hoehe: 28, hinweis: 'Les situations : découpe, mélange, empile face cachée.',
              karten: [
                { t: 'Tu as joué jusqu’à trois heures du matin. Première heure : contrôle.' },
                { t: 'Pas de petit-déjeuner, pas de goûter. Il est midi.' },
                { t: 'Six heures sur une chaise. Et maintenant les devoirs.' },
                { t: 'Nouvel horaire. Personne ne te dit dans quelle salle aller.' },
                { t: 'Ton éducatrice est malade. Personne ne sait qui vient aujourd’hui.' },
                { t: 'Demain, il y a un rendez-vous important. Tu ne sais pas ce qui va se passer.' },
                { t: 'Récré. Tout le monde est en groupe. Toi, tu es à côté.' },
                { t: 'Dans le groupe de discussion, on organise quelque chose. Personne ne t’a demandé.' },
                { t: 'En sport, on forme les équipes. On te choisit en dernier.' },
                { t: 'Tu racontes quelque chose. L’autre regarde son téléphone.' },
                { t: 'Tu donnes ton idée. Tout le monde rit – ce n’était pas une blague.' },
                { t: 'Tu dis non. Personne n’écoute.' },
                { t: 'Toute la journée, quelqu’un te dit ce que tu dois faire.' },
                { t: 'On décide de ton week-end. Personne ne t’a demandé ton avis.' },
                { t: 'Tu veux le faire à ta façon. Tu n’as pas le droit.' },
                { t: 'Dimanche, pluie, plus de wifi.' },
                { t: 'Chaque semaine, le même programme. Rien de nouveau.' },
                { t: 'Tout le monde raconte son week-end. Chez toi, il ne s’est rien passé.' },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Faire le plein – mais bien', zeit: '10 min', wie: 'solo · puis tous', icon: 'gas-station',
          leitung: 'D’abord chacun pour soi, puis corriger. Pas de morale : c’est la quantité qui compte. Demander : que donne la fausse station – et que prend-elle après ?',
          bausteine: [
            { art: 'text', x: ['Quand un réservoir est vide, tu veux le remplir vite. Mais tout ce qui fait du bien ne remplit pas vraiment. Certaines choses sont une **fausse station** : ça fait du bien sur le moment – après, tu es plus vide qu’avant.', '**Le test de la station – trois questions :**\n1. Je me sens mieux après – même encore une heure plus tard ?\n2. Est-ce que ça me fait du mal, à moi ou aux autres ?\n3. Est-ce que je peux arrêter quand je veux ?'] },
            { art: 'fragen', fragen: [{ f: 'Vraie station ou fausse ? Une croix par ligne.', raster: { spalten: ['vraie : remplit', 'fausse : bien juste un moment'], zeilen: [
              'une boisson énergisante',
              'faire le tour du pâté de maisons',
              'jouer jusqu’à trois heures du matin',
              'jouer une heure avec des amis',
              'appeler quelqu’un qui te fait du bien',
              'faire défiler des vidéos pendant des heures',
              'écouter ta chanson préférée à fond',
              'commencer une dispute pour qu’enfin il se passe quelque chose',
              'manger un vrai repas',
            ] } }] },
            { art: 'reden', x: ['Jouer est deux fois dans la liste. Pourquoi c’est une fois vrai et une fois faux ?', 'Quelle fausse station connaissez-vous chez vous – et pourquoi elle est si tentante ?'] },
            { art: 'fragen', kontext: 'Juste pour toi.', fragen: [{ f: 'Quelle fausse station tu utilises parfois ? Et qu’est-ce que tu pourrais faire à la place ?', satz: ['Ma fausse station :', 'À la place, j’essaie :'] }] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Pour toi : mon plan réservoir', zeit: '12 min', wie: 'solo · puis tous', icon: 'user',
          leitung: 'D’abord en silence. La station doit être petite : dix minutes maximum. Pour l’échange, vous écrivez aussi un papier.',
          bausteine: [
            {
              art: 'menue', titel: 'Vraies stations express – dix minutes maximum. Coche-en deux que tu veux essayer.',
              gruppen: [
                { t: 'Le corps', punkte: ['manger un vrai repas, boire de l’eau', 'dix minutes dehors à l’air', 'poser le téléphone à 22 heures'] },
                { t: 'La sécurité', punkte: ['demander : « Qu’est-ce qui se passe demain ? »', 'écrire le plan pour demain', 'aller dans un endroit que tu aimes'] },
                { t: 'Faire partie', punkte: ['écrire à quelqu’un qui te fait du bien', 'aller t’asseoir à côté de quelqu’un', 'rejoindre quelque chose qui a déjà commencé'] },
                { t: 'Être pris au sérieux', punkte: ['dire : « Écoute-moi une minute. »', 'écrire ce que tu veux dire', 'le dire à la personne qui écoute vraiment'] },
                { t: 'Décider soi-même', punkte: ['décider toi-même d’une chose aujourd’hui', 'demander : « Je peux le faire à ma façon ? »', 'choisir entre deux possibilités'] },
                { t: 'Plaisir et nouveauté', punkte: ['prendre un nouveau chemin', 'essayer quelque chose pour la première fois', 'écouter ta chanson préférée à fond'] },
              ],
            },
            { art: 'fragen', fragen: [
              { f: 'Retourne à la station 1 : qu’est-ce qui était agaçant aujourd’hui ? Quel réservoir était vide ?', kreis: ['Le corps', 'La sécurité', 'Faire partie', 'Être pris au sérieux', 'Décider soi-même', 'Plaisir et nouveauté'] },
              { f: 'Ton plan réservoir. Exemple : quand je rentre de l’école à cran, je mange d’abord quelque chose.', satz: ['Quand je remarque que …', 'alors je fais le plein comme ça :'] },
            ] },
            { art: 'reden', titel: 'Échange de stations', x: ['Écris ta meilleure vraie station sur un papier. Tous les papiers vont au milieu. Chaque personne prend une idée qu’elle ne connaissait pas encore.'] },
            { art: 'fragen', fragen: [{ f: 'Ma nouvelle idée grâce à l’échange :', linien: 1 }] },
          ],
        },
        {
          titel: 'Fin : ton conseil', zeit: '5 min', wie: 'tous', icon: 'flag',
          leitung: 'Qui veut lit son conseil. À la prochaine séance, demander où en sont les trois croix.',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Ta meilleure amie ou ton meilleur ami n’a pas le moral depuis des jours. Quelle question tu poses ?', linien: 1 }] },
            { art: 'merk', x: 'D’abord faire le plein. ==Ensuite discuter.==' },
            { art: 'woche', x: 'Remplis ton réservoir le plus vide – **trois fois cette semaine.** Une croix par fois.', kaestchen: ['1', '2', '3'] },
          ],
        },
      ],
    },
  ],
}

/* ---------- Séance 2 · Voix haute, voix basse ---------- */
const lautLeise: Stunde = {
  frage: 'Qu’est-ce qui manque à un groupe quand seules les voix hautes parlent ?',
  dauer: 'environ 90 minutes',
  kannst: ['dire si tu es plutôt voix haute ou voix basse', 'dire ce que les deux côtés savent bien faire', 'faire en sorte que tout le monde ait la parole'],
  seiten: [
    {
      stationen: [
        {
          titel: 'D’abord faire : l’expérience', zeit: '10 min', wie: 'tous · à la table', icon: 'flask',
          leitung: 'Chronométrer. Vous comptez et écrivez les nombres au tableau. Ne pas juger, seulement comparer.',
          bausteine: [
            { art: 'text', x: ['La question : **Qu’est-ce qu’on peut faire avec une feuille de papier ?**', '**Ronde A · à voix haute :** deux minutes. Tout le monde lance ses idées dans le groupe.', '**Ronde B · en silence :** deux minutes. Chaque personne écrit seule, sans parler. Ensuite, vous comptez ensemble.'] },
            { art: 'tabelle', breiten: '34mm auto auto', kopf: ['Ronde', 'Combien d’idées ?', 'De combien de personnes ?'], zeilen: [['A · à voix haute', '', ''], ['B · en silence', '', '']], hoehe: 10 },
            { art: 'fragen', fragen: [{ f: 'Dans quelle ronde **toi**, tu as eu plus d’idées ?', kreuz: ['A · à voix haute', 'B · en silence', 'pareil'] }] },
          ],
        },
        {
          titel: 'La ligne : où te places-tu ?', zeit: '8 min', wie: 'solo · puis qui veut', icon: 'ruler-measure',
          leitung: 'D’abord dans le magazine. Se placer dans la salle est facultatif. Qui se place dit une phrase : qu’est-ce qui est bien de mon côté ?',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Fais une croix sur chaque ligne. Le milieu est permis.', striche: [['voix haute', 'voix basse'], ['j’aime parler', 'j’aime écouter'], ['j’essaie tout de suite', 'je regarde d’abord'], ['j’aime être avec du monde', 'j’aime être tranquille']] }] },
            { art: 'reden', x: ['Qui veut se place dans la salle sur une ligne : un bout, c’est voix haute, l’autre voix basse.', 'Qu’est-ce qui est bien de ton côté ?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Le cas : Sami parle, Amira se tait', zeit: '12 min', wie: 'lire · à deux', icon: 'file-text',
          leitung: 'Lire à tour de rôle. Les questions à deux. Pour la bulle, rassembler deux ou trois idées.',
          bausteine: [
            { art: 'text', x: ['Quatre personnes doivent faire une affiche ensemble. **Elle doit être prête demain.**'] },
            {
              art: 'chat',
              zeilen: [
                { wer: 'Sami dit :', x: 'J’ai trouvé ! On tourne une vidéo !' },
                { wer: 'Le prof dit :', x: 'Bien, Sami, tu commences.' },
                { wer: 'Amira pense :', x: 'Une vidéo pour demain ? On n’y arrivera jamais.', art: 'denkt' },
                { wer: '', x: 'Amira veut le dire. Mais Sami parle et parle.', art: 'tut' },
                { wer: 'Le prof dit :', x: 'Amira, tu dois participer davantage.' },
                { wer: '', x: 'Le lendemain : la vidéo n’est pas prête.', art: 'tut' },
              ],
              fragen: [
                { f: 'Qui a remarqué que le plan ne marchait pas ?', kreuz: ['Sami', 'Amira', 'le prof'] },
                { f: 'Et toi – tu es plutôt comme Sami ou plutôt comme Amira ?', strich: ['Sami', 'Amira'] },
              ],
            },
            { art: 'reden', x: ['Qu’est-ce que le groupe aurait pu faire pour qu’Amira dise quelque chose ?', 'Et qu’est-ce que Sami sait très bien faire ?'] },
          ],
        },
        {
          titel: 'Clip : voix haute, voix basse, heureux ?', zeit: '10 min', wie: 'tous', icon: 'player-play',
          leitung: VIDEO_DE + 'Seulement 04:07 à 07:45 (avant : un gros mot). Aucun côté n’est meilleur ; beaucoup ont un peu des deux.',
          bausteine: [
            {
              art: 'clip',
              clip: { titel: 'Introvertiert | extrovertiert: Wer ist glücklicher?', kanal: 'Terra Xplore · vidéo en allemand', url: 'https://www.youtube.com/watch?v=x_un3Ojno7Y', dauer: '04:07 à 07:45 (un peu plus de 3 min)', frage: 'Introverti veut dire : plutôt voix basse. Extraverti veut dire : plutôt voix haute. Un côté est-il meilleur ?' },
              vorher: [{ f: 'Ton pronostic : un côté est-il meilleur ?', kreuz: ['les voix hautes', 'les voix basses', 'aucun'], unter: true }, { f: 'Tu es plutôt … ?', kreuz: ['voix haute', 'voix basse', 'les deux'] }],
              dabei: ['Ce que les voix basses savent bien faire :', 'Ce que les voix hautes savent bien faire :', 'Ce qui était surprenant :'],
              nachher: [{ f: 'Que dit la psychologue : peut-on être voix haute et voix basse en même temps ?', kreuz: ['oui', 'non'], unter: true }, { f: 'Que devrait savoir le prof d’Amira sur les voix basses ?', linien: 1 }],
            },
            { art: 'reden', x: ['Vous vous reconnaissez dans le clip ? Où oui, où non ?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Le modèle : ta batterie', zeit: '8 min', wie: 'solo · puis à deux', icon: 'battery-charging',
          leitung: 'Lire, puis cocher chacun pour soi. Comparer à deux. Insister : les deux sont normaux, beaucoup sont un mélange.',
          bausteine: [
            { art: 'text', x: ['Certaines personnes rechargent leur batterie **avec du monde**. D’autres la rechargent **seules**. Les deux sont normaux.'] },
            { art: 'fragen', fragen: [{ f: 'Qu’est-ce que ça fait à ta batterie ? Une croix par ligne.', raster: { spalten: ['recharge', 'vide'], zeilen: ['une fête avec beaucoup de monde', 'écouter de la musique dans son coin', 'parler avec une seule personne', 'jouer avec des amis', 'une longue journée d’école', 'dessiner ou bricoler dans son coin'] } }] },
            { art: 'reden', x: ['Comparez à deux : où êtes-vous pareils – et où complètement différents ?'] },
          ],
        },
        {
          titel: 'La grande ronde : le pont', zeit: '25 min', wie: 'tous · avec des rôles', icon: 'building-bridge',
          leitung: 'Les rôles sont des tâches, pas du théâtre. Chronométrer les deux minutes de silence. Ne pas construire – observer de qui vient l’idée construite.',
          bausteine: [
            {
              art: 'aktion',
              ziel: 'Construire quelque chose ensemble – avec des rôles voix haute et voix basse.',
              material: '20 feuilles de papier, ruban adhésif, une bouteille en plastique pleine, deux chaises, les cartes rôles ci-dessous',
              schritte: [
                'Construisez en papier un pont entre deux chaises (40 cm). Il doit porter la bouteille pleine **dix secondes**.',
                'Chaque personne tire une carte rôle.',
                '**Deux minutes en silence :** chaque personne dessine son idée. Puis tout le monde montre sa feuille.',
                '**Dix minutes de construction.** Puis le test avec la bouteille.',
              ],
              regeln: ['Personne ne se moque d’une idée.', 'Qui ne veut pas construire garde le temps.'],
              zu3: 'Chaque personne prend deux rôles.',
              auswertung: ['De qui venait l’idée que vous avez construite ?', 'Quel rôle a le plus aidé ?'],
            },
            {
              art: 'karten', spalten: 3, hoehe: 22, hinweis: 'Cartes rôles : découpe et tire face cachée.',
              karten: [
                { t: 'Démarrage', x: 'Tu dis : « Allez, première idée ! »', marke: 'voix haute' },
                { t: 'Encouragement', x: 'Tu dis ce qui marche déjà bien.', marke: 'voix haute' },
                { t: 'Porte-parole', x: 'À la fin, tu dis pourquoi il tient.', marke: 'voix haute' },
                { t: 'Écoute', x: 'Tu dis : « Jusqu’ici, on a … »', marke: 'voix basse' },
                { t: 'Contrôle', x: 'Tu demandes : « Attends – ça tient ? »', marke: 'voix basse' },
                { t: 'Questions', x: 'Tu demandes à quelqu’un qui n’a encore rien dit : « Tu en penses quoi ? »', marke: 'voix basse' },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Pour toi : l’autre côté', zeit: '8 min', wie: 'solo', icon: 'user',
          leitung: 'Travail en silence. Les réponses sont privées.',
          bausteine: [
            { art: 'fragen', fragen: [
              { f: 'Qu’est-ce que tu aimerais savoir faire plus souvent ?', kreuz: ['dire quelque chose plus souvent', 'écouter plus souvent', 'ça va comme ça'] },
              { f: 'Où veux-tu l’essayer cette semaine ?', kreuz: ['à l’école', 'avec des amis', 'au club', 'à la maison', 'en ligne'] },
              { f: 'Où recharges-tu le mieux ta batterie ? Écris ou dessine ton endroit préféré.', feld: 42 },
            ] },
          ],
        },
        {
          titel: 'Fin : la phrase d’Amira', zeit: '5 min', wie: 'tous', icon: 'flag',
          leitung: 'Écouter deux ou trois phrases. Annoncer le défi de la semaine.',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Demain, le groupe travaille de nouveau ensemble. Que dit Amira cette fois ?', satz: ['Amira dit :'] }] },
            { art: 'merk', x: 'Les deux voix ==comptent.==' },
            { art: 'woche', x: 'Essaie l’autre côté : si tu es plutôt voix basse, dis une fois quelque chose **en premier**. Si tu es plutôt voix haute, une fois, **écoute seulement**.', kaestchen: ['fait'] },
          ],
        },
      ],
    },
  ],
}

/* ---------- Séance 3 · Ce que tu sais faire ---------- */
const kannst: Stunde = {
  frage: 'Qu’est-ce qui n’est écrit dans aucun dossier sur toi ?',
  dauer: 'environ 90 minutes',
  kannst: ['voir des forces chez toi et chez les autres', 'dire une force avec un exemple', 'dire à quelqu’un quelque chose de bien qui est vrai'],
  seiten: [
    {
      stationen: [
        {
          titel: 'Ce qu’il y a dans cette salle', zeit: '8 min', wie: 'solo · puis tous', icon: 'checklist',
          leitung: 'Lire la liste, compter les mains, ne pas commenter.',
          bausteine: [
            { art: 'fragen', fragen: [
              { f: 'Coche ce que tu sais faire – même si ça te paraît petit.', kreuz: ['siffler', 'réparer quelque chose', 'cuisiner ou faire un gâteau', 's’occuper d’animaux', 'retenir un chemin', 'faire rire quelqu’un', 'écouter longtemps', 'calculer vite', 'dessiner', 's’occuper de petits enfants', 'jouer vraiment bien à un jeu', 'parler deux langues ou plus'] },
            ] },
            { art: 'reden', titel: 'Main levée !', x: ['L’adulte lit la liste. Main levée si tu sais le faire. Qu’est-ce qu’une seule personne sait faire ici ?'] },
          ],
        },
        {
          titel: 'Le cas : le dossier de Yusuf', zeit: '12 min', wie: 'lire · à deux', icon: 'folder',
          leitung: 'Lire le dossier comme une administration, « Ce qui n’y est pas » tout à fait normalement. Pour la bulle, ne laisser raconter que qui veut.',
          bausteine: [
            {
              art: 'akte', titel: 'Dossier · page 1', kopf: 'Yusuf, 16 ans', stempel: 'incomplet',
              eintraege: ['bruyant en classe', 'répond aux adultes', 'deux avertissements', 'À la question « Qu’est-ce que tu sais bien faire ? » : « Rien de spécial. »'],
              daneben: { titel: 'Ce qui n’y est pas', punkte: ['Emmène sa petite sœur à l’école tous les matins.', 'Explique tout deux fois au nouveau à l’atelier.', 'N’a jamais balancé un ami.'] },
              fragen: [
                { f: 'Qu’est-ce que Yusuf sait bien faire ? Coche tout ce qui va.', kreuz: ['fiable', 'serviable', 'fidèle', 'paresseux', 'patient'] },
                { f: 'Yusuf dit : « Rien de spécial. » Pourquoi ?', kreuz: ['Pour lui, c’est normal.', 'Personne ne le lui a jamais dit.', 'Il ne veut pas se vanter.'], unter: true },
              ],
            },
            { art: 'reden', x: ['Vous connaissez ça : les autres ne voient que ce qui ne va pas ?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Le modèle : la force et son revers', zeit: '8 min', wie: 'solo', icon: 'contrast',
          leitung: 'Lire, relier chacun pour soi, puis corriger. Exemple Yusuf : bruyant en classe peut aussi vouloir dire : il ose.',
          bausteine: [
            { art: 'text', x: ['Chaque force a un **revers**. Quand il y en a trop, ça devient difficile. Et l’inverse aussi : dans certains problèmes se cache une force.'] },
            { art: 'fragen', fragen: [
              { f: 'Qu’est-ce qui arrive quand il y en a trop ? Relie.', verbinden: [['courage', 'franchise', 'aider les autres', 'humour'], ['rien n’est sérieux', 'prendre des risques bêtes', 'ne jamais savoir dire non', 'blesser']] },
              { f: 'Yusuf est bruyant en classe. Quelle force pourrait se cacher derrière ?', kreuz: ['il ose', 'il a beaucoup d’énergie', 'il dit ce qu’il pense'] },
            ] },
          ],
        },
        {
          titel: 'Clip : je vaux quoi ?', zeit: '10 min', wie: 'tous', icon: 'player-play',
          leitung: VIDEO_DE + 'Seulement 02:42 à 04:42 – avant et après : idées suicidaires, troubles alimentaires. Conseils : parler · petites réussites · musique. Aide : 116 111.',
          bausteine: [
            {
              art: 'clip',
              clip: { titel: 'Ich bin nichts wert – so steigerst du dein Selbstwertgefühl', kanal: 'BUBBLES · vidéo en allemand', url: 'https://www.youtube.com/watch?v=XZzcGOxqBy8', dauer: 'SEULEMENT 02:42 à 04:42 (2 min)', frage: 'Qu’est-ce qui aide quand on a peu confiance en soi ?' },
              vorher: [{ f: 'Qu’est-ce qui compte le plus dans ce que tu penses de toi ?', kreuz: ['les notes', 'ce que disent les autres', 'ce que je pense moi-même'], unter: true }, { f: 'Tu te rabaisses souvent dans ta tête ?', kreuz: ['souvent', 'parfois', 'rarement'] }],
              dabei: ['Conseil 1 du clip :', 'Conseil 2 du clip :', 'Conseil 3 du clip :'],
              nachher: [{ f: 'Quel conseil essaies-tu cette semaine ?', linien: 1 }, { f: 'Quel conseil aide Yusuf ?', linien: 1 }],
            },
            { art: 'reden', x: ['D’où ça vient qu’on ait parfois si peu confiance en soi ?'] },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'La grande ronde : le marché des forces', zeit: '25 min', wie: 'tous', icon: 'building-store',
          leitung: 'Découper les cartes avant. Participer et veiller à ce que personne ne reparte les mains vides – vous aussi, vous recevez des cartes.',
          bausteine: [
            {
              art: 'aktion',
              ziel: 'Voir des forces chez les autres – et les leur dire.',
              material: 'les 24 cartes forces de la page suivante (à découper), une table comme marché',
              schritte: [
                'Toutes les cartes sont posées face visible sur la table.',
                'Choisis pour chaque personne du groupe une carte qui lui va.',
                'Va la lui donner – avec la phrase : « Celle-là te va, parce que … »',
                'Chaque personne pose ses cartes devant elle. Laquelle était une surprise ?',
              ],
              regeln: ['Les cartes sont seulement offertes, jamais rendues. Un « merci » suffit.', 'Personne ne repart les mains vides.'],
              zu3: 'Chaque personne reçoit deux cartes de chacune des autres – l’adulte aussi.',
              notiz: { titel: 'Cette carte, je l’ai reçue – et voilà ce que la personne a dit :', linien: 1 },
              auswertung: ['Quelle carte était une surprise pour toi ?', 'Quelle carte tu ne te serais jamais donnée toi-même ?'],
            },
            {
              art: 'chat', titel: 'Ça peut sonner comme ça',
              zeilen: [
                { wer: 'Lea à Tom :', x: '« Sait écouter » te va, parce que tu m’as écoutée la semaine dernière quand j’étais stressée.' },
                { wer: 'Tom :', x: 'Merci.' },
                { wer: 'Tom à Sara :', x: '« N’abandonne pas » – parce que tu as reconstruit le pont trois fois.' },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Matériel : 24 forces', zeit: '', wie: 'pour la station 5', icon: 'scissors', fort: true,
          bausteine: [
            {
              art: 'karten', wort: true, spalten: 4, hoehe: 30, hinweis: 'Découpe le long des pointillés. Les cartes vides sont pour les forces qui manquent.',
              karten: [
                { t: 'fidèle' }, { t: 'courage' }, { t: 'drôle' }, { t: 'patience' },
                { t: 'franchise' }, { t: 'serviable' }, { t: 'créativité' }, { t: 'tenace' },
                { t: 'juste' }, { t: 'curiosité' }, { t: 'rapide dans sa tête' }, { t: 'habile de ses mains' },
                { t: 'reste calme' }, { t: 'sait écouter' }, { t: 'tient parole' }, { t: 'n’abandonne pas' },
                { t: 'met l’ambiance' }, { t: 'voit quand quelqu’un ne va pas bien' }, { t: 'sait bien expliquer' }, { t: 'défend les autres' },
                { t: 'à l’aise avec les animaux' }, { t: 'à l’aise avec les enfants' }, { t: '________' }, { t: '________' },
              ],
            },
          ],
        },
      ],
    },
    {
      stationen: [
        {
          titel: 'Pour toi : mon arbre', zeit: '10 min', wie: 'solo', icon: 'tree',
          leitung: 'Travail en silence. Qui ne veut pas écrire dessine. On ne montre rien.',
          bausteine: [
            { art: 'text', x: ['Un arbre tient debout parce qu’en bas, quelque chose le tient. N’écris que ce que tu veux partager.'] },
            { art: 'fragen', fragen: [
              { f: 'Mon arbre :', satz: ['Les fruits – ce dont je suis fier ou fière :', 'Le tronc – ce que je sais faire :', 'Les racines – ce qui me tient (des personnes, des endroits, de la musique, des animaux …) :'] },
              { f: 'Qui veut le dessine. Tordu, c’est permis.', feld: 50 },
            ] },
          ],
        },
        {
          titel: 'Fin : l’autre dossier', zeit: '5 min', wie: 'tous', icon: 'flag',
          leitung: 'Qui veut lit sa phrase. Annoncer le défi de la semaine.',
          bausteine: [
            { art: 'fragen', fragen: [{ f: 'Quelqu’un te demande : « Qu’est-ce que tu sais bien faire ? » Tu réponds quoi maintenant ?', satz: ['Je sais bien …'] }] },
            { art: 'merk', x: 'Tu es plus ==que ton dossier.==' },
            { art: 'woche', x: 'Dis à une personne une force que tu vois chez elle – **et à quoi tu l’as remarquée.**', kaestchen: ['dit'] },
          ],
        },
      ],
    },
  ],
}

export const stunden: Stunde[] = [tank, lautLeise, kannst]
