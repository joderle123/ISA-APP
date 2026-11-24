// Französisch-Stunden fürs Spiel (Mme Sabli). Rückmeldung der Schüler 24.11.2026: „wechselnde Lehrpersonen, Fach + Modul
// spielerisch, zwischenmenschliche Übungen“. Format wie lektionen.js (Rollenspiel mit der Klasse, Paare, Übungsblatt,
// Lernkarte), von Hand geschrieben – Themen nach den Modulheften Französisch 1–3 (tools/hefte/inhalt/franzoesisch-m*.mjs):
// M1 „Bonjour, je m’appelle…“ (Name, Alter, tu/vous), M2 „Je te reconnais !“ (Personen beschreiben), M3 „Tu fais quel sport ?“.
// Erklärungen auf Deutsch (das Spiel ist deutsch), Beispiele auf Französisch. Übungen fast nur zum Ankreuzen (keine Akzente tippen).
// Ab Modul 4 macht Mme Sabli ehrlich angesagt eine Wiederholung (spiel.js, fachStunde).
const L = (id, x) => ({ id, lehrer: 'sabli', ablauf: [{ art: 'rollenspiel' }, { art: 'blatt' }], ...x });

export const FR_LEKTIONEN = [
  {
    nr: 1, titel: 'Bonjour, je m’appelle …', ziele: ['Bonjour, je m’appelle …', 'Tu ou vous ?'],
    lektionen: [
      L('fr-m1-bonjour', {
        titel: 'Bonjour, je m’appelle …', ziel: 'Ich begrüße jemanden auf Französisch und sage Name und Alter.',
        merke: { titel: 'So stellst du dich vor', punkte: ['Bonjour ! / Salut ! – Hallo!', 'Je m’appelle … – Ich heiße …', 'J’ai … ans. – Ich bin … Jahre alt.', 'Et toi ? – Und du?'] },
        intro: ['Bonjour la classe ! Heute: sich vorstellen.', 'Je m’appelle Madame Sabli. Et toi ?', 'Achtung: Das Alter sagt man mit „avoir“ – j’ai 13 ans.'],
        ablauf: [{ art: 'paare', frage: 'Was passt zusammen?', paare: [['Bonjour !', 'Hallo! / Guten Tag!'], ['Je m’appelle …', 'Ich heiße …'], ['J’ai 13 ans.', 'Ich bin 13.'], ['Et toi ?', 'Und du?'], ['Au revoir !', 'Tschüss!'], ['Merci !', 'Danke!']] }, { art: 'rollenspiel' }, { art: 'blatt' }],
        rolle: [
          { wer: 'noah', sagt: 'Salut ! Je m’appelle Noah. Et toi ?', optionen: ['Je m’appelle {name}.', 'Je suis appelle {name}.', 'Moi appelle {name}.'], richtig: 0, korrektur: 'Je m’appelle … – mit m’ davor.' },
          { wer: 'mila', sagt: 'Tu as quel âge ?', optionen: ['Je suis 13 ans.', 'J’ai 13 ans.', 'J’ai 13.'], richtig: 1, korrektur: 'Alter mit avoir: j’ai 13 ans – und „ans“ nicht vergessen.' },
          { wer: 'ben', sagt: 'Ça va ?', optionen: ['Oui, ça va. Et toi ?', 'Oui, je m’appelle.', 'Non, j’ai 13 ans.'], richtig: 0, korrektur: '„Ça va ?“ – „Ça va, et toi ?“' },
          { wer: 'lina', sagt: '(leise) Au revoir !', optionen: ['Bonjour !', 'Au revoir ! À demain !', 'Merci !'], richtig: 1, korrektur: 'Zum Abschied: Au revoir ! – À demain !' },
        ],
        uebung: [
          ['Je ◻ Noah.', ['m’appelle', 'appelle', 'suis'], 'm’appelle'],
          ['J’◻ 13 ans.', ['ai', 'suis', 'as'], 'ai'],
          ['Tu ◻ quel âge ?', ['as', 'es', 'ai'], 'as'],
          ['◻ ! – Hallo!', ['Bonjour', 'Merci', 'Au revoir'], 'Bonjour'],
          ['Au ◻ ! – Tschüss!', ['revoir', 'bonjour', 'merci'], 'revoir'],
          ['Il ◻ 14 ans.', ['a', 'est', 'ai'], 'a'],
          ['Comment tu t’◻ ?', ['appelles', 'appelle', 'appeler'], 'appelles'],
          ['Elle s’◻ Mila.', ['appelle', 'appelles', 'appelons'], 'appelle'],
          ['Ça ◻ ? – Wie geht’s?', ['va', 'vas', 'est'], 'va'],
          ['◻ toi ? – Und du?', ['Et', 'Est', 'Es'], 'Et'],
          ['J’ai douze ◻.', ['ans', 'années', 'an'], 'ans'],
          ['Zur Lehrerin: Bonjour, ◻ !', ['Madame', 'toi', 'salut'], 'Madame'],
        ],
        karte: 'Je m’appelle … · J’ai … ans (mit avoir!) · Et toi ?',
      }),
      L('fr-m1-tu-vous', {
        titel: 'Tu ou vous ?', ziel: 'Ich weiß, wann ich „tu“ und wann ich „vous“ sage.',
        merke: { titel: 'Tu oder vous?', punkte: ['tu: Freunde, Familie, Kinder', 'vous: Erwachsene, die du nicht gut kennst – und Lehrpersonen', 'vous: auch für mehrere Personen', 'höflich: Bonjour, Madame / Monsieur'] },
        intro: ['Question importante : tu ou vous ?', 'Zu Freunden sagt man „tu“. Zu mir … vous, s’il vous plaît.', 'Ben, das heißt: nicht „Salut, Sabli“.'],
        rolle: [
          { wer: 'noah', sagt: 'Je dis „tu“ ou „vous“ à Madame Sabli ?', optionen: ['Vous.', 'Tu.', 'Les deux.'], richtig: 0, korrektur: 'Zu Lehrpersonen: vous.' },
          { wer: 'mila', sagt: 'Et à moi ?', optionen: ['Tu.', 'Vous, Madame.', 'Rien.'], richtig: 0, korrektur: 'Zu Mitschülern: tu.' },
          { wer: 'ben', sagt: 'Comment je demande à la dame de la cantine ?', optionen: ['Tu as du pain ?', 'Vous avez du pain, s’il vous plaît ?', 'Pain !'], richtig: 1, korrektur: 'Erwachsene, die man nicht gut kennt: vous + s’il vous plaît.' },
        ],
        uebung: [
          ['(zur Lehrerin) ◻ avez un stylo ?', ['Vous', 'Tu', 'Il'], 'Vous'],
          ['(zu Noah) ◻ as un stylo ?', ['Tu', 'Vous', 'Je'], 'Tu'],
          ['Bonjour, ◻ ! (zu einem Lehrer)', ['Monsieur', 'toi', 'salut'], 'Monsieur'],
          ['(zu zwei Freunden) ◻ venez ?', ['Vous', 'Tu', 'Je'], 'Vous'],
          ['S’il ◻ plaît. (höflich)', ['vous', 'te', 'tu'], 'vous'],
          ['S’il ◻ plaît. (zu einem Freund)', ['te', 'vous', 'tu'], 'te'],
          ['Tu ◻ quel âge ?', ['as', 'avez', 'a'], 'as'],
          ['Vous ◻ quel âge, Madame ?', ['avez', 'as', 'ai'], 'avez'],
          ['Comment ◻ vous appelez ?', ['vous', 'tu', 'te'], 'vous'],
          ['Comment tu ◻’appelles ?', ['t', 'v', 'm'], 't'],
          ['„Salut !“ sagst du …', ['zu Freunden', 'zur Direktorin', 'zum Busfahrer'], 'zu Freunden'],
          ['Merci, ◻ ! (zur Frau in der Kantine)', ['Madame', 'toi', 'copine'], 'Madame'],
        ],
        karte: 'tu = Freunde · vous = Erwachsene und mehrere · s’il vous plaît / s’il te plaît',
      }),
    ],
  },
  {
    nr: 2, titel: 'Je te reconnais !', ziele: ['Il est comment ?'],
    lektionen: [
      L('fr-m2-portrait', {
        titel: 'Il est comment ?', ziel: 'Ich beschreibe eine Person: Größe, Haare, Augen, Brille.',
        merke: { titel: 'Eine Person beschreiben', punkte: ['Il / Elle est grand(e) – petit(e).', 'Il / Elle a les cheveux courts – longs – bruns – blonds.', 'Il / Elle a les yeux bleus – marron – verts.', 'Il / Elle porte des lunettes.'] },
        intro: ['Aujourd’hui : Je te reconnais ! Wir beschreiben Personen.', 'Größe mit être, Haare und Augen mit avoir.', 'Und nur Neutrales oder Nettes, bitte. Wir beschreiben – wir lästern nicht.'],
        ablauf: [{ art: 'paare', frage: 'Was passt zusammen?', paare: [['grand', 'groß'], ['petit', 'klein'], ['les cheveux', 'die Haare'], ['les yeux', 'die Augen'], ['des lunettes', 'eine Brille'], ['longs', 'lang']] }, { art: 'rollenspiel' }, { art: 'blatt' }],
        rolle: [
          { wer: 'ayla', sagt: 'Décris Ben !', optionen: ['Il est grand. Il a les cheveux courts.', 'Il a grand. Il est les cheveux courts.', 'Il grand cheveux.'], richtig: 0, korrektur: 'Größe mit être, Haare mit avoir.' },
          { wer: 'noah', sagt: 'Et Mila, elle a les yeux comment ?', optionen: ['Elle est les yeux verts.', 'Elle a les yeux verts.', 'Elle a vert.'], richtig: 1, korrektur: 'Augen mit avoir: elle a les yeux verts.' },
          { wer: 'jo', sagt: 'Qui porte des lunettes ?', optionen: ['Madame Lenning porte des lunettes.', 'Madame Lenning a lunettes.', 'Madame Lenning est lunettes.'], richtig: 0, korrektur: 'Brille: porter des lunettes.' },
        ],
        uebung: [
          ['Ben ◻ grand.', ['est', 'a', 'ai'], 'est'],
          ['Mila ◻ les yeux verts.', ['a', 'est', 'as'], 'a'],
          ['Il a les cheveux ◻. (kurz)', ['courts', 'petits', 'grands'], 'courts'],
          ['Elle est ◻. (klein)', ['petite', 'petit', 'courte'], 'petite'],
          ['Il est ◻. (groß)', ['grand', 'grande', 'long'], 'grand'],
          ['Elle a les cheveux ◻. (lang)', ['longs', 'grands', 'hauts'], 'longs'],
          ['Il ◻ des lunettes.', ['porte', 'est', 'fait'], 'porte'],
          ['Tu ◻ les yeux bleus.', ['as', 'es', 'a'], 'as'],
          ['Je ◻ petit.', ['suis', 'ai', 'es'], 'suis'],
          ['les cheveux ◻ (braun)', ['bruns', 'blancs', 'bleus'], 'bruns'],
          ['les yeux ◻ (braun)', ['marron', 'blonds', 'verts'], 'marron'],
          ['Elle est ◻. (groß)', ['grande', 'grand', 'longue'], 'grande'],
        ],
        karte: 'être: grand(e), petit(e) · avoir: les cheveux …, les yeux … · porter des lunettes',
      }),
    ],
  },
  {
    nr: 3, titel: 'Tu fais quel sport ?', ziele: ['Mes loisirs'],
    lektionen: [
      L('fr-m3-loisirs', {
        titel: 'Tu fais quel sport ?', ziel: 'Ich sage, was ich in meiner Freizeit mache und was ich mag.',
        merke: { titel: 'Freizeit auf Französisch', punkte: ['Ballspiele: Je joue au foot / au basket.', 'Andere Sportarten: Je fais du vélo / de la natation.', 'J’aime + Grundform: J’aime danser.', 'Je n’aime pas … – Ich mag … nicht.'] },
        intro: ['Le week-end, vous faites quoi ?', 'Ballspiele: jouer au. Andere Sportarten: faire du oder de la.', 'Ben, „dormir“ ist kein Sport. Bien essayé.'],
        ablauf: [{ art: 'paare', frage: 'Was passt zusammen?', paare: [['jouer au foot', 'Fußball spielen'], ['faire du vélo', 'Rad fahren'], ['nager', 'schwimmen'], ['danser', 'tanzen'], ['dessiner', 'zeichnen'], ['jouer aux jeux vidéo', 'zocken']] }, { art: 'rollenspiel' }, { art: 'blatt' }],
        rolle: [
          { wer: 'ben', sagt: 'Tu fais quel sport ?', optionen: ['Je joue au basket.', 'Je fais au basket.', 'Je joue du basket.'], richtig: 0, korrektur: 'Ballspiele: jouer au basket.' },
          { wer: 'chiara', sagt: 'Et le week-end ?', optionen: ['Je fais du vélo.', 'Je joue du vélo.', 'Je fais au vélo.'], richtig: 0, korrektur: 'Rad fahren: faire du vélo.' },
          { wer: 'lina', sagt: '(leise) Tu aimes la musique ?', optionen: ['Oui, j’aime écouter de la musique.', 'Oui, j’aime écoute musique.', 'Oui, je musique.'], richtig: 0, korrektur: 'J’aime + Grundform: j’aime écouter …' },
          { wer: 'yusuf', sagt: 'Tu aimes le judo ?', optionen: ['Non, je n’aime pas le judo.', 'Non, je aime pas le judo.', 'Non, j’aime le judo pas.'], richtig: 0, korrektur: 'Verneinung: je n’aime pas …' },
        ],
        uebung: [
          ['Je joue ◻ foot.', ['au', 'du', 'de la'], 'au'],
          ['Je fais ◻ vélo.', ['du', 'au', 'à la'], 'du'],
          ['Elle fait ◻ natation.', ['de la', 'du', 'au'], 'de la'],
          ['Il joue ◻ basket.', ['au', 'du', 'de'], 'au'],
          ['J’aime ◻. (tanzen)', ['danser', 'danse', 'dansé'], 'danser'],
          ['Je ◻ aime pas le foot.', ['n’', 'ne', 'pas'], 'n’'],
          ['Tu fais ◻ sport ?', ['quel', 'quelle', 'qui'], 'quel'],
          ['Nous jouons ◻ jeux vidéo.', ['aux', 'au', 'des'], 'aux'],
          ['Je fais ◻ judo.', ['du', 'au', 'de la'], 'du'],
          ['Elle aime ◻. (zeichnen)', ['dessiner', 'dessine', 'dessin'], 'dessiner'],
          ['Le week-end, je ◻ du skate.', ['fais', 'joue', 'suis'], 'fais'],
          ['Tu ◻ au tennis ?', ['joues', 'fais', 'es'], 'joues'],
        ],
        karte: 'jouer au + Ballspiel · faire du / de la + Sport · j’aime + Grundform',
      }),
    ],
  },
];
