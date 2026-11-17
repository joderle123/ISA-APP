// Lycée-Simulator – Phase 2: Aufgaben aus dem Unterricht. Eine Lehrperson legt ein „Aufgabenpaket“ an (Titel + Aufgaben mit
// Frage, 2–4 Antworten, richtige Antwort, kurze Erklärung). Gespielt wird es an der Lernstation im CDI (Mme Laurent) und in
// Lernmomenten der Geschichte (z. B. Kapitel 4, Hausaufgaben-Club). Auf Wunsch geht die Hauptgeschichte dort erst weiter,
// wenn die Aufgaben gelöst sind („pflicht“).
// Nichts wird bewertet oder verschickt: Falsche Antworten bekommen die Erklärung und einen neuen Versuch.
// Speicher nur im Browser: „lycee.aufgaben“ (Paket der Lehrperson). Austausch zwischen Geräten über eine JSON-Datei – das
// Paket enthält nur Aufgaben, nie Namen oder Daten von Jugendlichen.

export const SCHLUESSEL = 'lycee.aufgaben';
export const MAX = { aufgaben: 60, frage: 220, antwort: 90, erklaerung: 260, titel: 60 };

export const GRUNDPAKET = {
  v: 1, titel: 'Grundaufgaben (Beispiel)', pflicht: false, eigen: false,
  aufgaben: [
    { id: 'g1', fach: 'Mathe', frage: '½ + ¼ = ?', antworten: ['¾', '2/6', '1/6'], richtig: 0, erklaerung: 'Eine Hälfte sind zwei Viertel. Zwei Viertel plus ein Viertel sind drei Viertel.' },
    { id: 'g2', fach: 'Mathe', frage: 'Ein T-Shirt kostet 20 €. Es gibt 25 % Rabatt. Was kostet es?', antworten: ['15 €', '5 €', '18 €'], richtig: 0, erklaerung: '25 % von 20 € sind 5 €. 20 € minus 5 € sind 15 €.' },
    { id: 'g3', fach: 'Mathe', frage: 'Der Bus fährt um 8:17. Die Fahrt dauert 25 Minuten. Wann bist du da?', antworten: ['8:42', '8:32', '9:02'], richtig: 0, erklaerung: '8:17 plus 25 Minuten: 8:17 + 3 = 8:20, plus 22 = 8:42.' },
    { id: 'g4', fach: 'Deutsch', frage: 'Welches Wort ist richtig geschrieben?', antworten: ['vielleicht', 'fieleicht', 'vieleicht'], richtig: 0, erklaerung: '„vielleicht“ – mit v und zwei l.' },
    { id: 'g5', fach: 'Deutsch', frage: 'Welcher Satz ist eine Ich-Botschaft?', antworten: ['Ich ärgere mich, wenn ich warten muss.', 'Du bist immer zu spät.', 'Alle finden dich nervig.'], richtig: 0, erklaerung: 'Eine Ich-Botschaft sagt, wie ICH mich fühle – ohne Vorwurf.' },
    { id: 'g6', fach: 'Französisch', frage: '„Je suis en retard.“ heißt …', antworten: ['Ich bin zu spät.', 'Ich bin müde.', 'Ich habe Hunger.'], richtig: 0, erklaerung: '„en retard“ = zu spät.' },
    { id: 'g7', fach: 'Französisch', frage: 'Wie fragst du höflich nach Hilfe?', antworten: ['Vous pouvez m’aider, s’il vous plaît ?', 'Aide-moi !', 'Je sais tout.'], richtig: 0, erklaerung: '„s’il vous plaît“ macht die Frage höflich.' },
    { id: 'g8', fach: 'Werkstatt', frage: 'Was machst du, bevor du sägst?', antworten: ['Schutzbrille auf, zweimal messen', 'Sofort anfangen', 'Handy rausholen'], richtig: 0, erklaerung: 'Erst Sicherheit, dann zweimal messen, einmal sägen.' },
  ],
};

const kurz = (s, n) => String(s == null ? '' : s).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);

// Ein Paket prüfen und bereinigen (aus Datei oder Speicher). Gibt null bei Unbrauchbarem.
export function bereinige(roh) {
  if (!roh || typeof roh !== 'object' || !Array.isArray(roh.aufgaben)) return null;
  const aufgaben = [];
  for (const a of roh.aufgaben.slice(0, MAX.aufgaben)) {
    if (!a || typeof a !== 'object') continue;
    const antworten = (Array.isArray(a.antworten) ? a.antworten : []).map((x) => kurz(x, MAX.antwort)).filter(Boolean).slice(0, 4);
    const frage = kurz(a.frage, MAX.frage);
    const richtig = Number.isInteger(a.richtig) ? a.richtig : 0;
    if (!frage || antworten.length < 2 || richtig < 0 || richtig >= antworten.length) continue;
    aufgaben.push({ id: kurz(a.id, 20) || 'a' + Math.random().toString(36).slice(2, 8), fach: kurz(a.fach, 30) || 'Unterricht', frage, antworten, richtig, erklaerung: kurz(a.erklaerung, MAX.erklaerung) });
  }
  if (!aufgaben.length) return null;
  return { v: 1, titel: kurz(roh.titel, MAX.titel) || 'Aufgaben', pflicht: !!roh.pflicht, eigen: true, aufgaben };
}

export function ladePaket() {
  try { const p = bereinige(JSON.parse(localStorage.getItem(SCHLUESSEL) || 'null')); if (p) return p; } catch (e) { /* kaputt oder privat */ }
  return GRUNDPAKET;
}
export function speicherePaket(p) {
  try { if (!p) localStorage.removeItem(SCHLUESSEL); else localStorage.setItem(SCHLUESSEL, JSON.stringify(p)); return true; } catch (e) { return false; }
}

// Nächste Aufgaben für einen Lernmoment: zuerst die, die die Spielfigur noch nicht gelöst hat
export function waehle(paket, geloest = [], n = 3) {
  // eigene Aufgaben der Lehrperson zuerst, dann die Beispiele
  const eigen = (a) => !/^g\d+$/.test(a.id);
  const offen = paket.aufgaben.filter((a) => !geloest.includes(a.id)).sort((x, y) => (eigen(y) ? 1 : 0) - (eigen(x) ? 1 : 0));
  const rest = paket.aufgaben.filter((a) => geloest.includes(a.id));
  return offen.concat(rest).slice(0, Math.min(n, paket.aufgaben.length));
}
