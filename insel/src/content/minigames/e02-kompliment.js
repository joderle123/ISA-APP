// Komplimente beim Laternenfest (DESIGN §12 e02): Lob für Taten fliegt, Lob fürs Aussehen kippt um; „Danke“ lässt die
// Laterne steigen, „Ach, war nix“ sinken. Die Taten-Kacheln kommen aus dem eigenen Taten-Log.
export default {
  id: 'e02-kompliment', template: 'satzbau', ruleset: 'kompliment', title: 'Die Laterne steigt', icon: 'laterne', color: '#ffd23f',
  intro: 'Lob eine Tat. Und nimm ein Lob einfach an.',
  slots: [
    { id: 'person', label: 'Für …', tiles: [{ t: 'Jolie', icon: 'muschel' }, { t: 'Tun', icon: 'kamera' }] },
    { id: 'lob', label: '… dein Lob:', tiles: [
      { t: 'Eine Tat aus deinem Log', fromDeeds: true, max: 2, fallback: [{ t: 'Du hast auf mich gewartet.' }] },
      { t: 'Du hast die Kiste geschoben.', kind: 'tat' },
      { t: 'Dein Hoodie ist cool.', kind: 'aussehen' },
      { t: 'Du bist halt nett.', kind: 'leer' },
    ] },
    { id: 'antwort', label: 'Sie lobt dich zurück. Du:', tiles: [{ t: 'Danke.', ok: true }, { t: 'Ach, war nix.', ok: false }, { t: 'Danke. Das freut mich.', ok: true }] },
  ],
  medals: { bronze: { score: 0.5 }, silber: { score: 0.75 }, gold: { score: 1 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  outcome: { clean: [{ flag: 'e02.laterne', set: true }] },
};
