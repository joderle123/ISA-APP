// Passgenau – eigene, feste Schritte (Präfix 'pg:'): der Blatt-Slot, „einfach da sein“ in der Wahl, eine kurze
// Bewegungspause und stille Rituale, die nichts verlangen (Anspruch 0) – als Rückfall, wenn der Katalog für ein Alter
// oder eine Tagesform nichts Passendes hat. Feste Texte, kein Inhalt zur Laufzeit erzeugt.
import type { Stundenschritt } from '../typen'

const basis = {
  thema: [], eldib: [], kompetenz: [], stufen: ['C1', 'C2', 'C3', 'C4', 'ES'] as Stundenschritt['stufen'], alter: { von: 3, bis: 18 },
  sozialform: ['einzeln', 'zu-zweit', 'gruppe'] as Stundenschritt['sozialform'], einzeltauglich: 'ja' as const, belastung: 0 as const, reiz: 0 as const,
  material: [], sprache: { de: true as const, fr: true }, qualitaet: 'geprueft' as const, sicher: {},
}

export const SYSTEM: Stundenschritt[] = [
  {
    ...basis,
    id: 'pg:blatt', h: 'pgblatt1',
    quelle: { art: 'praxis', titel: 'Passgenau' },
    titel: 'Am Blatt arbeiten',
    text: 'Das Blatt hinlegen und die erste Aufgabe gemeinsam lesen. Das Kind arbeitet, die Fachkraft bleibt daneben und hilft beim Anfangen. Aufgaben, die heute nicht passen, dürfen wegbleiben.',
    sagen: ['Wir machen die Aufgaben der Reihe nach. Du sagst mir, wenn du Hilfe brauchst.'],
    wennEsKippt: 'Nicht fertig machen müssen: eine Aufgabe auswählen lassen, den Rest mündlich besprechen oder nächstes Mal weitermachen.',
    rolle: ['uebung'], dauer: { min: 4, typ: 8, max: 20 }, energie: 1, format: ['schreiben'],
    fr: {
      titel: 'Travailler sur la fiche',
      text: 'Poser la fiche et lire ensemble la première consigne. L’enfant travaille, l’adulte reste à côté et l’aide à démarrer. Les consignes qui ne conviennent pas aujourd’hui peuvent être laissées de côté.',
      sagen: ['On fait les exercices dans l’ordre. Tu me dis si tu as besoin d’aide.'],
      wennEsKippt: 'Pas d’obligation de finir : laisser choisir un exercice, discuter le reste à l’oral ou continuer la prochaine fois.',
    },
  },
  {
    ...basis,
    id: 'pg:da-sein', h: 'pgdasein',
    quelle: { art: 'praxis', titel: 'Passgenau' },
    titel: 'Einfach da sein',
    text: 'Nebeneinander sitzen, etwas zu trinken anbieten, ruhig bleiben. Nichts muss gesagt oder gemacht werden. Ein Knetball, ein Tuch oder ein Kuscheltier liegt bereit.',
    sagen: ['Du musst heute nichts machen. Ich bin da.'],
    rolle: ['spiel', 'regulation'], dauer: { min: 3, typ: 7, max: 20 }, energie: 1, format: ['sinne'], material: ['tuecher'],
    ohneZiel: true, anspruch: 0, tagesform: ['traurig', 'rueckzug', 'will-nicht', 'aengstlich', 'muede', 'aufgewuehlt'],
    fr: {
      titel: 'Simplement être là',
      text: 'S’asseoir côte à côte, proposer quelque chose à boire, rester calme. Rien ne doit être dit ni fait. Une balle anti-stress, un foulard ou une peluche sont à portée de main.',
      sagen: ['Aujourd’hui, tu n’as rien à faire. Je suis là.'],
    },
  },
  {
    ...basis,
    id: 'pg:pause', h: 'pgpause1',
    quelle: { art: 'praxis', titel: 'Passgenau' },
    titel: 'Bewegungspause',
    text: 'Kurz aufstehen: zehnmal auf der Stelle gehen, die Arme hoch strecken und ausschütteln, dann wieder hinsetzen.',
    sagen: ['Einmal kurz aufstehen und strecken – dann geht es weiter.'],
    rolle: ['bewegung'], dauer: { min: 1, typ: 2, max: 3 }, energie: 2, format: ['bewegung'], ohneZiel: true,
    fr: {
      titel: 'Pause mouvement',
      text: 'Se lever un instant : dix pas sur place, tendre les bras vers le haut et les secouer, puis se rasseoir.',
      sagen: ['On se lève et on s’étire un instant – puis on continue.'],
    },
  },
  {
    ...basis,
    id: 'pg:ankommen-still', h: 'pgankst1',
    quelle: { art: 'ritual', titel: 'Passgenau' },
    titel: 'Ankommen ohne Worte',
    text: 'Begrüßen, den Platz zeigen, etwas zu trinken anbieten. Ein Knetball oder ein Tuch liegt bereit. Keine Fragen zum Befinden – das Kind darf erst einmal ankommen.',
    sagen: ['Schön, dass du da bist. Setz dich, wo du magst.'],
    rolle: ['ankommen'], dauer: { min: 1, typ: 2, max: 4 }, energie: 1, format: ['sinne'], ohneZiel: true, anspruch: 0,
    tagesform: ['traurig', 'rueckzug', 'will-nicht', 'aengstlich', 'muede', 'aufgewuehlt', 'wuetend', 'aufgedreht'],
    fr: {
      titel: 'Arriver sans paroles',
      text: 'Accueillir, montrer la place, proposer à boire. Une balle à malaxer ou un foulard sont prêts. Pas de questions sur l’humeur – l’enfant peut d’abord arriver.',
      sagen: ['Ça me fait plaisir que tu sois là. Installe-toi où tu veux.'],
    },
  },
  {
    ...basis,
    id: 'pg:abschluss-still', h: 'pgabsst1',
    quelle: { art: 'ritual', titel: 'Passgenau' },
    titel: 'Ruhiger Abschluss',
    text: 'Gemeinsam aufräumen, dann mit dem gewohnten Satz verabschieden. Keine Bewertung der Stunde. Sagen, wann man sich wiedersieht.',
    sagen: ['Danke für heute. Wir sehen uns am … wieder.'],
    rolle: ['abschluss'], dauer: { min: 1, typ: 2, max: 4 }, energie: 1, format: ['gespraech'], ohneZiel: true, anspruch: 0,
    tagesform: ['traurig', 'rueckzug', 'will-nicht', 'aengstlich', 'muede', 'aufgewuehlt', 'wuetend', 'aufgedreht'],
    fr: {
      titel: 'Une fin calme',
      text: 'Ranger ensemble, puis se dire au revoir avec la phrase habituelle. Pas d’évaluation de la séance. Dire quand on se revoit.',
      sagen: ['Merci pour aujourd’hui. On se revoit le …'],
    },
  },
  {
    ...basis,
    id: 'pg:ankommen', h: 'pgank001',
    quelle: { art: 'ritual', titel: 'Passgenau' },
    titel: 'Ankommen mit Zeichen',
    text: 'Begrüßen und den Platz zeigen. Das Kind zeigt mit dem Daumen oder einer Karte, wie der Tag bisher war – ohne Erklärung. Die Fachkraft zeigt auch ein Zeichen und sagt, was heute geplant ist.',
    sagen: ['Zeig mir mit dem Daumen: Wie war dein Tag bis jetzt?', 'Heute machen wir zuerst …, dann …'],
    rolle: ['ankommen'], dauer: { min: 2, typ: 3, max: 5 }, energie: 1, format: ['gespraech', 'karten'], anspruch: 1,
    fr: {
      titel: 'Arriver avec un signe',
      text: 'Accueillir et montrer la place. L’enfant montre avec le pouce ou une carte comment s’est passée sa journée – sans explication. L’adulte montre aussi un signe et annonce le programme du jour.',
      sagen: ['Montre-moi avec le pouce : comment s’est passée ta journée jusqu’ici ?', 'Aujourd’hui, on fait d’abord …, puis …'],
    },
  },
  {
    ...basis,
    id: 'pg:abschluss', h: 'pgabs001',
    quelle: { art: 'ritual', titel: 'Passgenau' },
    titel: 'Abschluss: Was nehme ich mit?',
    text: 'Gemeinsam auf das Blatt oder die Stunde schauen. Das Kind zeigt oder sagt eine Sache, die es mitnimmt. Die Fachkraft nennt eine Sache, die ihr aufgefallen ist, und verabschiedet sich mit dem gewohnten Satz.',
    sagen: ['Was nimmst du heute mit – zeig es mir oder sag ein Wort.', 'Mir ist aufgefallen, dass du …'],
    rolle: ['abschluss', 'reflexion'], dauer: { min: 2, typ: 3, max: 5 }, energie: 1, format: ['gespraech'], anspruch: 1,
    fr: {
      titel: 'Clôture : qu’est-ce que je retiens ?',
      text: 'Regarder ensemble la fiche ou la séance. L’enfant montre ou dit une chose qu’il retient. L’adulte nomme une chose qu’il a remarquée et dit au revoir avec la phrase habituelle.',
      sagen: ['Qu’est-ce que tu retiens aujourd’hui – montre-le ou dis un mot.', 'J’ai remarqué que tu …'],
    },
  },
]

/** Leichte Aktivitäten ohne Ziel (Weg 3) – Rückfall, bis „Freude & Beziehung“ im Katalog ist. Kein Wettbewerb, kein Körperkontakt. */
const leichtBasis = { ...basis, quelle: { art: 'freude' as const, titel: 'Passgenau' }, ohneZiel: true, belastung: 0 as const }
SYSTEM.push(
  {
    ...leichtBasis,
    id: 'pg:kneten', h: 'pgknete1', alter: { von: 3, bis: 12 }, stufen: ['C1', 'C2', 'C3', 'C4'],
    titel: 'Kneten und formen',
    text: 'Jede und jeder bekommt ein Stück Knete. Einfach kneten, rollen, drücken – wer mag, formt etwas daraus. Die Fachkraft knetet mit, ohne zu bewerten.',
    sagen: ['Du kannst einfach kneten. Wenn du magst, wird etwas daraus.'],
    rolle: ['spiel', 'regulation'], dauer: { min: 3, typ: 7, max: 15 }, energie: 1, format: ['basteln', 'sinne'], material: ['knete'],
    tagesform: ['muede', 'traurig', 'rueckzug', 'aengstlich', 'will-nicht', 'aufgewuehlt'],
    fr: { titel: 'Pâte à modeler', text: 'Chacun reçoit un morceau de pâte à modeler. Simplement malaxer, rouler, presser – qui veut façonne quelque chose. L’adulte malaxe aussi, sans juger.', sagen: ['Tu peux juste malaxer. Si tu veux, quelque chose va naître.'] },
  },
  {
    ...leichtBasis,
    id: 'pg:nebeneinander-malen', h: 'pgmalen1',
    titel: 'Nebeneinander malen',
    text: 'Zwei Blätter, Stifte oder Wachsmalkreiden in die Mitte. Jede und jeder malt für sich – ein Muster, Kritzeln, ein Bild. Reden ist erlaubt, muss aber nicht sein.',
    sagen: ['Wir malen beide ein bisschen. Du entscheidest, was.'],
    rolle: ['spiel', 'regulation'], dauer: { min: 4, typ: 8, max: 15 }, energie: 1, format: ['malen'], material: ['papier', 'buntstifte'],
    tagesform: ['muede', 'traurig', 'rueckzug', 'will-nicht', 'aengstlich'],
    fr: { titel: 'Dessiner côte à côte', text: 'Deux feuilles, des crayons ou des craies au milieu. Chacun dessine pour soi – un motif, des gribouillis, une image. On peut parler, mais ce n’est pas obligatoire.', sagen: ['On dessine tous les deux un peu. C’est toi qui décides quoi.'] },
  },
  {
    ...leichtBasis,
    id: 'pg:ball-zuwerfen', h: 'pgball01',
    titel: 'Ball zuwerfen',
    text: 'Im Stehen einen weichen Ball hin- und herwerfen: erst ruhig, dann ein bisschen schneller, dann mit der anderen Hand. Zum Schluss den Ball nur noch langsam rollen und hinsetzen.',
    sagen: ['Wir werfen erst langsam, dann schneller – und am Ende wieder ganz langsam.'],
    rolle: ['spiel', 'bewegung'], dauer: { min: 3, typ: 5, max: 10 }, energie: 2, format: ['bewegung', 'spiel'], material: ['ball'],
    tagesform: ['aufgedreht', 'wuetend', 'aufgewuehlt', 'muede'],
    fr: { titel: 'Se lancer la balle', text: 'Debout, se lancer une balle souple : d’abord calmement, puis un peu plus vite, puis avec l’autre main. Pour finir, la faire rouler lentement et s’asseoir.', sagen: ['On lance d’abord doucement, puis plus vite – et à la fin, de nouveau tout doucement.'] },
  },
  {
    ...leichtBasis,
    id: 'pg:wand-schieben', h: 'pgwand01', alter: { von: 5, bis: 18 }, stufen: ['C1', 'C2', 'C3', 'C4', 'ES'],
    titel: 'Wand schieben, dann ausatmen',
    text: 'Beide Hände an die Wand und fest drücken, als wollten wir sie verschieben – bis fünf zählen. Loslassen, Arme ausschütteln, einmal lange ausatmen. Dreimal wiederholen, dann hinsetzen.',
    sagen: ['Drück fest gegen die Wand … und jetzt loslassen und lang ausatmen.'],
    rolle: ['bewegung', 'regulation', 'spiel'], dauer: { min: 2, typ: 3, max: 5 }, energie: 2, format: ['bewegung', 'atmen'],
    tagesform: ['wuetend', 'aufgewuehlt', 'aufgedreht'],
    fr: { titel: 'Pousser le mur, puis expirer', text: 'Les deux mains contre le mur, pousser fort comme pour le déplacer – compter jusqu’à cinq. Relâcher, secouer les bras, expirer longuement. Répéter trois fois, puis s’asseoir.', sagen: ['Pousse fort contre le mur … et maintenant relâche et expire longuement.'] },
  },
  {
    ...leichtBasis,
    id: 'pg:atem-ballon', h: 'pgatem01', alter: { von: 4, bis: 18 },
    titel: 'Atem-Ballon',
    text: 'Hände auf den Bauch legen. Beim Einatmen wird der Bauch rund wie ein Ballon, beim Ausatmen lässt er langsam die Luft heraus. Fünfmal, im eigenen Tempo; die Fachkraft atmet mit.',
    sagen: ['Atme ein – der Ballon wird rund. Atme aus – die Luft geht langsam raus.'],
    rolle: ['regulation'], dauer: { min: 2, typ: 3, max: 5 }, energie: 1, format: ['atmen', 'sinne'],
    tagesform: ['aengstlich', 'aufgewuehlt', 'wuetend', 'aufgedreht', 'muede'],
    fr: { titel: 'Le ballon de respiration', text: 'Poser les mains sur le ventre. À l’inspiration, le ventre s’arrondit comme un ballon ; à l’expiration, l’air sort lentement. Cinq fois, à son rythme ; l’adulte respire avec l’enfant.', sagen: ['Inspire – le ballon s’arrondit. Expire – l’air sort doucement.'] },
  },
  {
    ...leichtBasis,
    id: 'pg:lied-hoeren', h: 'pglied01', alter: { von: 8, bis: 18 }, stufen: ['C3', 'C4', 'ES'],
    titel: 'Ein Lied zusammen hören',
    text: 'Das Kind oder der Jugendliche sucht ein Lied aus (Lautsprecher oder Handy der Fachkraft). Gemeinsam anhören, ohne Aufgabe. Danach darf, wer mag, sagen, was ihm daran gefällt.',
    sagen: ['Such dir ein Lied aus – wir hören es einfach zusammen.'],
    rolle: ['spiel', 'regulation'], dauer: { min: 3, typ: 5, max: 8 }, energie: 1, format: ['musik'], material: ['musik'],
    tagesform: ['muede', 'traurig', 'rueckzug', 'will-nicht', 'aufgewuehlt'],
    fr: { titel: 'Écouter une chanson ensemble', text: 'L’enfant ou le jeune choisit une chanson (haut-parleur ou téléphone de l’adulte). L’écouter ensemble, sans consigne. Ensuite, qui veut peut dire ce qui lui plaît.', sagen: ['Choisis une chanson – on l’écoute simplement ensemble.'] },
  },
)

export const SYSTEM_BY_ID = new Map(SYSTEM.map((s) => [s.id, s]))

/** Blatt-Teile, die keine Katalogeinträge sind: Hilfe-Zeile (E-M3) und Stundenleiste (P11). */
export const BLATT_SYSTEM = { notfall: 'pg:notfall', stundenleiste: 'pg:stundenleiste' } as const
