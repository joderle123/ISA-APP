// Region M0 Hafen-Dorf (DESIGN §11): Demo-Fassung. Schleier 0,55 beim ersten Start (setzt das Hafen-Plugin),
// dann 0,3 (e01), 0,15 (e02), 0 (e03). Orte für die drei Hafen-Quests und die Ankunft.
export default {
  id: 'hafen', module: 'j1-m0', name: 'Hafen-Dorf',
  veil: { zone: 'hafen', start: 0.55, steps: { 'j1-e01': 0.3, 'j1-e02': 0.15, 'j1-e03': 0 } },
  palette: { key: '#ffb347', accent: '#2fb8a8', dyes: ['#ff7a59', '#ffd166', '#2fb8a8', '#4f88c8'] },
  season: 'spaetsommer',
  sites: {
    steg: { x: 6, z: 130, r: 4 },            // Anlegesteg: Ankunft, Möwen-Rennen
    dorfplatz: { x: 4, z: 110, r: 6 },       // Kodex, Laternenfest, Komplimente
    ufer: { x: -4, z: 133, r: 4 },           // Jolies grauer Platz am Wasser
    feuerPlatz: { x: 19.5, z: 96.5, r: 2.5 }, // Funkenkorb neben dem Signalfeuer Dorfplatz (außerhalb dessen Feuer-Menü)
    laternen: { x: 0, z: 120, r: 3.5 },      // Laternenreihe (Funken bringen)
    bruecke: { x: 56, z: 100, r: 5 },        // Ortsrand Richtung Strand
    grotte: { x: -24, z: 124, r: 4 },        // Eingang Hafengrotte
    // Kostprobe „Die Kielpost fährt“ (systems/kielpost, bergen, werft): Liegeplatz am Steg, Werkbank, Schären im Meer
    kielpost: { x: 5.4, z: 145, r: 3 },       // Landepunkt auf dem Steg (Einsteigen/Aussteigen)
    werft: { x: 15.5, z: 131.5, r: 3 },       // Werkbank am Steg
    moewenklippe: { x: -50, z: 176, r: 8 },   // Felsinsel, ein Fund auf dem Vorsprung
    wrackbank: { x: 66, z: 186, r: 6 },       // Wrack hinter der Nebelwand
  },
  // Signalfeuer: die vier Standard-Feuer des Hafens (session/signalfeuer.js) leuchten auf, sobald der Hafen frei ist (< 0,5)
  npcs: ['ilda', 'jolie', 'tun'],
};
