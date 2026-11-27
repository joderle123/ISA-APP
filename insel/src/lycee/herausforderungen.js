// Herausforderungen von Freund:innen aufs Handy (Auftrag 20.11.: „spaßiger“, Wochenplan Tag 2/3: Freizeit mit sozialer Seite).
// Je Abschnitt höchstens eine neue Nachricht („Schaffst du …?“). Wer es schafft, bekommt eine Antwort, Jetons und Freundschaft.
// Kein Druck: Man kann sie ignorieren, nichts verfällt. Ton freundlich-frech, nie Mutprobe mit Risiko.
export const HERAUSFORDERUNGEN = [
  // Jahreszeiten (nur in ihren Kapiteln): kommen zuerst dran; ist die Zeit vorbei, verschwindet eine offene still
  { id: 'h_laub', von: 'luca', ab: 3, bis: 3, text: 'Laubhaufen auf dem Hof! Fünfmal reinrennen. Wetten?', ziel: (m) => (m.laub || 0) >= 5, danke: 'Fünfmal! Du hast jetzt Blätter in den Haaren.' },
  { id: 'h_pfuetze', von: 'yusuf', ab: 7, bis: 8, text: 'Pfützen auf dem Hof! Wer macht den größten Platsch?', ziel: (m) => (m.pfuetzen || 0) >= 3, danke: 'Drei Pfützen! Deine Schuhe sind jetzt Kunst.' },
  { id: 'h_eissorten', von: 'ayla', ab: 9, bis: 10, text: 'Tonio hat sechs Eissorten. Schaffst du drei?', ziel: (m) => (m.eisSorten || []).length >= 3, danke: 'Drei Sorten! Auch Gurke-Minze? Respekt.' },
  { id: 'h_schneemann', von: 'mila', ab: 5, bis: 6, text: 'Es schneit! Baust du einen Schneemann auf dem Hof?', ziel: (m) => (m.schneemann || 0) >= 1, danke: 'Mit Schal! Ich hab ihm „Fernand 2“ getauft.' },
  { id: 'h_eis', von: 'chiara', ab: 5, bis: 6, text: 'Eisbahn auf dem Markt: 300 Meter rutschen ohne Pause. Okay, mit Pause.', ziel: (m) => (m.eisMeter || 0) >= 300, danke: '300 Meter! Nächstes Mal machen wir eine Pirouette.' },
  { id: 'h_dosen', von: 'ben', ab: 1, text: 'Dosenwerfen am Markt: Ich hab fünf. Schaffst du alle sechs?', ziel: (m) => (m.dosenRekord || 0) >= 6, danke: 'Alle sechs! Okay, du bist besser. Diesmal.' },
  { id: 'h_kicker', von: 'dario', ab: 1, text: 'Tischkicker im Jugendhaus: Hast du schon mal gewonnen? Ich nie.', ziel: (m) => (m.kickerSiege || 0) >= 1, danke: 'Gewonnen? Zeig mir den Trick!' },
  { id: 'h_boten', von: 'mila', ab: 2, text: 'Rosa sucht Hilfe im Dorf. Drei Botengänge – ich hab’s geschafft.', ziel: (m) => ((m.boten && m.boten.n) || 0) >= 3, danke: 'Drei! Rosa redet nur noch von dir.' },
  { id: 'h_tanz', von: 'ayla', ab: 2, text: 'Tanzfläche im Jugendhaus: Ich hab 3000 Punkte. Und du?', ziel: (m) => (m.tanzRekord || 0) >= 3000, danke: 'Du hast Rhythmus. Komm mal zur Bandprobe!' },
  { id: 'h_skate5', von: 'yusuf', ab: 2, text: 'S-K-A-T-E im Skatepark: alle fünf Buchstaben. Schon gefunden?', ziel: (m) => (m.skate5 || '').length >= 5, danke: 'Alle fünf! Samstag fahren wir zusammen.' },
  { id: 'h_foto', von: 'lina', ab: 2, text: 'Foto-Bingo im Dorf: fünf Motive. Ich zeichne dann eins ab.', ziel: (m) => (m.fotoBingo || []).length >= 5, danke: 'Fünf Motive! Ich nehme den Kirchturm.' },
  { id: 'h_emotes', von: 'jo', ab: 2, text: 'Öffne das Emote-Rad (X oder 🙌) und zeig drei Emotes!', ziel: (m) => (m.emoteArten || []).length >= 3, danke: 'Drei Emotes! Der Roboter-Tanz kommt als Nächstes, oder?' },
  { id: 'h_tanzparty', von: 'ayla', ab: 3, text: 'Tanz mal auf dem Hof. Wetten, jemand tanzt mit?', ziel: (m) => (m.tanzParty || 0) >= 1, danke: 'Tanzparty auf dem Hof! Morgen bringe ich Musik mit.' },
  { id: 'h_jagd', von: 'yusuf', ab: 3, text: 'Linas Schnitzeljagd: Hast du schon alle sechs Zettel?', ziel: (m) => !!(m.jagd && m.jagd.fertig), danke: 'Alle sechs! Lina plant schon die nächste Runde.' },
  { id: 'h_billard', von: 'kenan', ab: 2, text: 'Billard im Jugendhaus: Ich hab zweimal gewonnen. Du auch?', ziel: (m) => (m.billardSiege || 0) >= 1, danke: 'Sauberer Stoß. Wie beim Hobeln: ruhig bleiben.' },
  { id: 'h_rennen', von: 'jo', ab: 3, text: 'Zeitrennen auf dem Brett unter 60 Sekunden. Wie ein Rennwagen!', ziel: (m) => !!m.renn_brett && m.renn_brett < 60, danke: 'Unter einer Minute! Brumm brumm.' },
  { id: 'h_elfmeter', von: 'luca', ab: 3, text: 'Elfmeter auf dem Stade: vier von fünf. Mehr sag ich nicht.', ziel: (m) => (m.elfmeterRekord || 0) >= 4, danke: 'Vier von fünf. Nicht schlecht. Wirklich.' },
  { id: 'h_volley', von: 'chiara', ab: 3, text: 'Volleyball in der Halle: zehn Ballwechsel am Stück. Mein Rekord.', ziel: (m) => (m.volleyRekord || 0) >= 10, danke: 'Zehn! Jetzt muss ich wieder üben.' },
];

// Was ist zu tun? → { neu } (Nachricht schicken), { geschafft } (Antwort, Belohnung) oder null. Reine Funktion (Tests).
export function herausforderungPruefen(m, kap, schritt) {
  const hf = m.hf || {};
  if (hf.aktiv) {
    const h = HERAUSFORDERUNGEN.find((x) => x.id === hf.aktiv);
    if (h && h.ziel(m)) return { geschafft: h };
    if (!(h && h.bis && kap > h.bis)) return null;   // Winter vorbei: offene Winter-Aufgabe zählt nicht mehr, nächste darf kommen
  }
  if (hf.schritt === schritt) return null;   // je Abschnitt höchstens eine neue
  const h = HERAUSFORDERUNGEN.find((x) => x.ab <= kap && (!x.bis || kap <= x.bis) && !(hf.fertig || []).includes(x.id) && !x.ziel(m));
  return h ? { neu: h } : null;
}
