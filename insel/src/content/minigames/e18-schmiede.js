// Satz-Schmiede (DESIGN §12 M4): sechs Regeln werden Brettphysik – Glas bricht (unrealistisch), Zukunft zu spät,
// nicht/passiv trägt nicht, „Ich lerne …“ wächst. Nur ein Brett, das trägt, führt über die Schlucht.
export default {
  id: 'e18-schmiede', template: 'satzbau', ruleset: 'schmiede', title: 'Die Satz-Schmiede', icon: 'hammer', color: '#6fae5a',
  intro: 'Schmiede einen Satz, der dich trägt.',
  slots: [
    { id: 'anfang', label: 'Der Satz beginnt …', tiles: [
      { t: 'Ich lerne', rules: { wachstum: true } },
      { t: 'Ich kann', rules: {} },
      { t: 'Ich werde irgendwann', rules: { gegenwart: false } },
      { t: 'Ich bin nicht', rules: { ohneNicht: false } },
    ] },
    { id: 'mitte', label: '… und dann …', tiles: [
      { t: 'vor der Klasse zu reden', rules: {} },
      { t: 'alles perfekt zu machen', rules: { realistisch: false } },
      { t: 'dass alle mich mögen', rules: { beeinflussbar: false } },
      { t: 'mich nicht zu blamieren', rules: { ohneNicht: false } },
    ] },
    { id: 'ende', label: '… Schritt für Schritt.', tiles: [
      { t: 'einen Satz nach dem anderen', rules: { aktiv: true } },
      { t: 'wenn andere es machen', rules: { aktiv: false } },
      { t: 'und übe es heute', rules: { gegenwart: true } },
    ] },
  ],
  medals: { bronze: { score: 0.6 }, silber: { score: 0.9 }, gold: { score: 1 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  outcome: { traegt: [{ flag: 'e18.brett', set: true }], glas: [{ puls: 5 }], bricht: [{ puls: 5 }], spaet: [{ puls: 3 }] },
};
