// Baumhaus (WP40, DESIGN §8): Innenraum im Feigenbaum am Hafen (Raum-Baukasten, Kit 'baumhaus') und Außenpodest.
// Der Raum ersetzt den Platzhalter aus world/roomkit (gleiche ID). Die Stationen bauen src/systems/baumhaus/stations.js
// dynamisch (Bonsai wächst, Glas füllt sich, Trophäen, Möbel); hier stehen nur Hülle, Spawns, Ausgang und die
// Positionen der Stationen (lokale Koordinaten: Ursprung Bodenmitte, x nach rechts, z nach vorn = zur Tür).
export const ROOM_ID = 'baumhaus';
export const ROOM_SIZE = [14, 5.2, 14];

// Stationen: id, Position, Interaktions-Label (≤ 2 Wörter), Icon, Radius, Blickrichtung, gesperrte Möbelzellen (block)
export const STATIONS = [
  { id: 'haengematte', at: [-3.6, 0, -1.2], yaw: 0.35, label: 'Ausruhen', icon: 'haengematte', radius: 2.4, block: 1 },
  { id: 'glas', at: [3.9, 0, -3.0], yaw: 0, label: 'Glas', icon: 'glas', radius: 2.1, block: 0 },
  { id: 'jukebox', at: [5.0, 0, 1.0], yaw: -Math.PI / 2, label: 'Jukebox', icon: 'lautsprecher', radius: 2.2, block: 1 },
  { id: 'spiegel', at: [-5.2, 0, 1.8], yaw: Math.PI / 2, label: 'Stil', icon: 'stil', radius: 2.2, block: 0 },
  { id: 'pinnwand', at: [0, 0, -5.9], yaw: 0, label: 'Chronik', icon: 'chronik', radius: 2.6, block: 1 },
  { id: 'bonsai', at: [1.6, 0, -4.6], yaw: 0, label: 'Bonsai', icon: 'bonsai', radius: 2.0, block: 0 },
  { id: 'tisch', at: [0.4, 0, 1.4], yaw: 0, label: 'Mäxchen', icon: 'muschel', radius: 2.3, block: 1 },
  { id: 'trophaeen', at: [-4.6, 0, -3.8], yaw: Math.PI * 0.75, label: 'Trophäen', icon: 'medaille', radius: 2.3, block: 1 },
  { id: 'tuer', at: [-2.4, 0, 5.4], yaw: Math.PI, label: 'Sicherer Ort', icon: 'schluessel', radius: 2.0, block: 0 },
  { id: 'kiste', at: [2.6, 0, 5.0], yaw: Math.PI, label: 'Einrichten', icon: 'hammer', radius: 2.0, block: 0 },
];
export const STATION_IDS = STATIONS.map((s) => s.id);
export const stationById = (id) => STATIONS.find((s) => s.id === id) || null;

// RoomDef (CONTENT-SCHEMA): die feste Einrichtung des Kits (Fenster, Balken, Lichterkette) plus wenige feste Features;
// alles Wachsende kommt aus stations.js. Der Ausgang führt aufs Podest (Ort 'baumhaus').
export const BAUMHAUS_ROOM = {
  id: ROOM_ID, kit: 'baumhaus', size: ROOM_SIZE, light: 'baumhaus', camera: { dist: 6.2 },
  spawns: { eingang: [0, 0, 3.4], mitte: [0, 0, 0], haengematte: [-2.2, 0, -0.6] },
  exits: [{ at: [0, 0, 6.5], r: 1.5, to: { site: 'baumhaus' }, label: 'Hinaus', kind: 'tuer' }],
  features: [
    { type: 'haengematte', at: [-3.6, 0, -1.2], yaw: 0.35, color: '#ff9a6a' },
    { type: 'spiegel', at: [-5.2, 0, 1.8], yaw: Math.PI / 2 },
    { type: 'jukebox', at: [5.0, 0, 1.0], yaw: -Math.PI / 2 },
    { type: 'tisch', at: [0.4, 0, 1.4], width: 1.9 },
    { type: 'kiste', at: [2.6, 0, 5.0], size: 0.9, color: '#8a6a48' },
  ],
};

// Außenpodest: Tür ins Baumhaus (Interaktion nur oben, y > Boden + DECK.minAbove), Laterne, Schild
export const DECK = { height: 12, minAbove: 9.5, door: { dx: 0.0, dz: -0.9 }, lantern: { dx: 2.2, dz: -1.6 }, sign: { dx: -2.2, dz: -1.4 } };
