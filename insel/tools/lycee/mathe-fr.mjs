// Französische Fassung des Mathe-Trainings (Toolbox-Blätter, mathe-toolbox.mjs). Selbst geschrieben.
export const MODUL_FR = {
  1: { titel: 'Les nombres jusqu’à 1000', ziele: ['décomposer les nombres en centaines, dizaines et unités', 'trouver le nombre et la dizaine voisins', 'comparer et arrondir les nombres'] },
  2: { titel: 'Plus et moins', ziele: ['calculer de tête en passant la dizaine', 'compléter jusqu’à la centaine et au millier', 'additionner et soustraire en colonnes'] },
  3: { titel: 'Fois et divisé', ziele: ['connaître les tables de multiplication', 'diviser comme opération inverse', 'multiplier avec des dizaines et des centaines', 'résoudre de petits problèmes'] },
  4: { titel: 'L’argent et la virgule', ziele: ['convertir euros et centimes', 'additionner des prix', 'calculer la monnaie à rendre'] },
  5: { titel: 'Mesures et temps', ziele: ['convertir longueurs et masses', 'calculer des durées', 'lire l’heure'] },
  6: { titel: 'Fractions, pourcentages, aire', ziele: ['la moitié, le quart, le tiers d’une quantité', 'pourcentages simples (10 %, 25 %, 50 %)', 'périmètre et aire du rectangle'] },
}

export const BLATT_FR = {
  'm1-stellen': { titel: 'Centaines, dizaines, unités', idee: 'Chaque chiffre a sa place. La place dit combien il vaut.', schritte: ['C = centaines (100)', 'D = dizaines (10)', 'U = unités (1)'], beispiel: '472 = 4 C + 7 D + 2 U = 400 + 70 + 2' },
  'm1-nachbarn': { titel: 'Nombres voisins et dizaines voisines', idee: 'Les voisins sont juste avant et juste après.', schritte: ['Le précédent : 1 de moins', 'Le suivant : 1 de plus', 'Dizaines voisines : la dizaine avant et après'], beispiel: '346 → voisins 345 et 347 · dizaines voisines 340 et 350' },
  'm1-vergleichen': { titel: 'Plus grand, plus petit, égal', idee: 'Le signe est une bouche affamée. Elle mange toujours le plus grand nombre.', schritte: ['D’abord comparer les centaines', 'Égales ? Alors les dizaines', 'Encore égales ? Alors les unités'], beispiel: '468 > 459, car 6 dizaines, c’est plus que 5 dizaines.' },
  'm1-runden': { titel: 'Arrondir à la dizaine et à la centaine', idee: 'Arrondir, c’est aller au nombre « rond » le plus proche.', schritte: ['Regarde le chiffre juste à droite', '0 à 4 : on arrondit vers le bas', '5 à 9 : on arrondit vers le haut'], beispiel: '347 à la dizaine : 350 (7 → vers le haut) · 347 à la centaine : 300 (4 → vers le bas)' },
  'm2-plus': { titel: 'Plus en passant la dizaine', idee: 'D’abord jusqu’à la dizaine suivante, puis le reste.', schritte: ['Combien manque-t-il jusqu’à la dizaine ?', 'Ajoute d’abord cette partie', 'Puis ajoute le reste'], beispiel: '47 + 8 → 47 + 3 = 50 → 50 + 5 = 55' },
  'm2-minus': { titel: 'Moins en passant la dizaine', idee: 'D’abord revenir à la dizaine, puis enlever le reste.', schritte: ['Reviens jusqu’à la dizaine', 'Puis enlève le reste'], beispiel: '53 − 7 → 53 − 3 = 50 → 50 − 4 = 46' },
  'm2-ergaenzen': { titel: 'Compléter jusqu’à 100 et 1000', idee: 'Combien manque-t-il ? Compte en montant depuis le petit nombre.', schritte: ['D’abord jusqu’à la dizaine suivante', 'Puis jusqu’à la centaine', 'Additionne tout'], beispiel: '37 + ___ = 100 → 37 + 3 = 40 → 40 + 60 = 100 → 63' },
  'm2-schriftlich': { titel: 'Calculer en colonnes', idee: 'Écris les nombres l’un sous l’autre : unités sous unités, dizaines sous dizaines.', schritte: ['Commence à droite, par les unités', 'Plus de 9 ? Retiens la dizaine (la retenue)', 'Pour moins : pas assez ? « Emprunte » une dizaine'], beispiel: '386 + 247 : 6+7=13 (3, retenue 1) · 8+4+1=13 (3, retenue 1) · 3+2+1=6 → 633' },
  'm3-einmaleins': { titel: 'Les tables de multiplication', idee: 'Multiplier, c’est prendre plusieurs fois la même chose.', schritte: ['Tables clés : ×1, ×2, ×5, ×10', 'Continue à partir de là', '7 × 6 = 5 × 6 + 2 × 6 = 30 + 12'], beispiel: '8 × 7 → 10 × 7 = 70 → moins 2 × 7 = 14 → 56' },
  'm3-geteilt': { titel: 'Divisé par', idee: 'Diviser, c’est multiplier à l’envers.', schritte: ['Demande-toi : quel nombre fois … donne … ?', '56 : 8 = ? → ? × 8 = 56'], beispiel: '42 : 6 = 7, car 7 × 6 = 42' },
  'm3-zehner': { titel: 'Multiplier avec des dizaines et des centaines', idee: 'Calcule sans les zéros, puis ajoute les zéros.', schritte: ['30 × 4 → 3 × 4 = 12', 'Il y avait un zéro → 120'], beispiel: '20 × 70 → 2 × 7 = 14 → deux zéros → 1400' },
  'm3-sach': { titel: 'Petits problèmes', idee: 'Lis deux fois. Que demande-t-on ? De quels nombres as-tu besoin ?', schritte: ['Souligne les nombres importants', 'Fois, divisé, plus ou moins ?', 'Réponds avec l’unité'], beispiel: '4 amis partagent 24 biscuits → 24 : 4 = 6 biscuits chacun' },
  'm4-euro': { titel: 'Euros et centimes', idee: '1 euro = 100 centimes. La virgule sépare les euros et les centimes.', schritte: ['3,45 € = 3 € et 45 ct', 'En centimes : 3 × 100 + 45 = 345 ct', 'Attention : 3,05 € = 305 ct'], beispiel: '250 ct = 2,50 €' },
  'm4-einkaufen': { titel: 'Faire les courses : additionner', idee: 'Les euros avec les euros, les centimes avec les centimes.', schritte: ['D’abord les euros', 'Puis les centimes', 'Plus de 100 ct ? Cela fait 1 euro de plus'], beispiel: '2,80 € + 1,50 € → 3 € et 130 ct → 4,30 €' },
  'm4-rueckgeld': { titel: 'La monnaie à rendre', idee: 'Monnaie = payé moins prix. Ou : compter en montant à partir du prix.', schritte: ['Prix 6,40 €, payé 10 €', 'Jusqu’à 7 € il manque 0,60 €', 'Jusqu’à 10 € il manque 3 € → 3,60 €'], beispiel: 'Tu paies 20 € pour 13,25 € → on te rend 6,75 €' },
  'm5-laengen': { titel: 'Longueurs : km, m, cm', idee: 'Les unités sont comme les marches d’un escalier.', schritte: ['1 m = 100 cm', '1 km = 1000 m', 'Grande unité → petite : fois', 'Petite unité → grande : divisé'], beispiel: '3 m = 300 cm · 2500 m = 2,5 km' },
  'm5-zeit': { titel: 'Durées', idee: 'Calcule par étapes jusqu’à l’heure pleine.', schritte: ['De 8:40 à 9:00 = 20 min', 'De 9:00 à 9:15 = 15 min', 'Ensemble 35 min'], beispiel: 'Le bus part à 7:48 et arrive à 8:10 → 22 minutes' },
  'm5-stunden': { titel: 'Heures et minutes', idee: '1 heure = 60 minutes. 1 minute = 60 secondes.', schritte: ['Une demi-heure = 30 min', 'Un quart d’heure = 15 min', 'Trois quarts d’heure = 45 min'], beispiel: '2 h 15 min = 120 + 15 = 135 min' },
  'm6-brueche': { titel: 'Fraction d’une quantité', idee: 'Un quart de 20, c’est 20 en 4 parts égales.', schritte: ['Dénominateur (en bas) : en combien de parts on partage', 'Numérateur (en haut) : combien de parts on prend'], beispiel: '3/4 de 20 → 20 : 4 = 5 → 3 × 5 = 15' },
  'm6-prozent': { titel: 'Pourcentages : 10 %, 25 %, 50 %', idee: 'Pour cent veut dire « sur cent ».', schritte: ['50 % = la moitié', '25 % = un quart', '10 % = divisé par 10'], beispiel: 'Veste 60 €, 25 % de réduction → 60 : 4 = 15 € de moins → 45 €' },
  'm6-flaeche': { titel: 'Périmètre et aire (rectangle)', idee: 'Périmètre = faire le tour une fois. Aire = combien de carrés entrent dedans.', schritte: ['Périmètre = 2 × longueur + 2 × largeur', 'Aire = longueur × largeur', 'L’aire a un « au carré » : m²'], beispiel: 'Chambre 5 m × 4 m → périmètre 18 m · aire 20 m²' },
}

// Aufgabentexte: feste Muster aus mathe.js → Französisch. Unbekanntes Muster → Fehler (das Skript bricht ab).
const MUSTER = [
  [/^(\d+) H \+ (\d+) Z \+ (\d+) E = ___$/, '$1 C + $2 D + $3 U = ___'],
  [/^(\d+) = ___ H \+ ___ Z \+ ___ E$/, '$1 = ___ C + ___ D + ___ U'],
  [/^Zehner: (.*)$/, 'Dizaines : $1'],
  [/^(\d+) gerundet auf Zehner: ___$/, '$1 arrondi à la dizaine : ___'],
  [/^(\d+) gerundet auf Hunderter: ___$/, '$1 arrondi à la centaine : ___'],
  [/^Ein Heft kostet (\d+) €\. Du kaufst (\d+) Hefte\. Du zahlst ___ €\.$/, 'Un cahier coûte $1 €. Tu achètes $2 cahiers. Tu paies ___ €.'],
  [/^(\d+) Bonbons für (\d+) Kinder, gerecht verteilt\. Jedes Kind bekommt ___\.$/, '$1 bonbons pour $2 enfants, partagés équitablement. Chaque enfant reçoit ___ bonbons.'],
  [/^Ein Bus hat (\d+) Reihen mit je (\d+) Plätzen\. Das sind ___ Plätze\.$/, 'Un bus a $1 rangées de $2 places. Cela fait ___ places.'],
  [/^(\d+) Wochen sind ___ Tage\.$/, '$1 semaines font ___ jours.'],
  [/^Eine Kiste hat (\d+) Flaschen in (\d+) Reihen\. In jeder Reihe stehen ___\.$/, 'Une caisse contient $1 bouteilles en $2 rangées. Chaque rangée a ___ bouteilles.'],
  [/^Du sparst jede Woche (\d+) €\. Nach (\d+) Wochen hast du ___ €\.$/, 'Tu économises $1 € par semaine. Après $2 semaines, tu as ___ €.'],
  [/^Preis ([\d,]+) €, du zahlst (\d+) €\. Zurück: ___ €$/, 'Prix $1 €, tu paies $2 €. On te rend : ___ €'],
  [/^Von ([\d:]+) bis ([\d:]+) sind es ___ Minuten\.$/, 'De $1 à $2, il y a ___ minutes.'],
  [/^(#\d+\/\d+#) von (\d+) = ___$/, '$1 de $2 = ___'],
  [/^(\d+) % von (\d+) € = ___ €$/, '$1 % de $2 € = ___ €'],
  [/^Preis (\d+) €, (\d+) % Rabatt\. Neuer Preis: ___ €$/, 'Prix $1 €, $2 % de réduction. Nouveau prix : ___ €'],
  [/^Rechteck (\d+) m × (\d+) m: Umfang = ___ m$/, 'Rectangle $1 m × $2 m : périmètre = ___ m'],
  [/^Rechteck (\d+) m × (\d+) m: Fläche = ___ m²$/, 'Rectangle $1 m × $2 m : aire = ___ m²'],
]
const OHNE_WORT = /^[\d\s,.:·+–\-=<>\[\]_#/%€×²]*(ct|cm|km|kg|g|m|h|min|s|€)?[\d\s,.:·+–\-=<>\[\]_#/%€×²a-z]*$/

export function aufgabeFr(t) {
  for (const [re, neu] of MUSTER) if (re.test(t)) return t.replace(re, neu).replace(/ · /g, ' × ')
  if (OHNE_WORT.test(t)) return t.replace(/ · /g, ' × ')
  throw new Error('Keine französische Fassung für: ' + t)
}
