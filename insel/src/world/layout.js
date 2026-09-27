// Gebäude-Layout der Insel (Stil-Bibel §9.2): Häuser um den Dorfplatz und an der Uferstraße zum Steg, Kiosk, Markt-Häuser
// mit Markisen. Die Vegetation lässt diese Flächen frei (vegetation.js blocked), das Welt-Plugin baut die Häuser daraus.
//   x/z Mitte des Grundrisses · size S/M/L · wall/accent/roof Farben (§2.2) · face [x, z] = Punkt, zu dem die Tür zeigt
//   Sperr-Radius für die Vegetation: r (Standard nach Größe)
export const BUILDINGS = [
  // Hafen-Dorf (goldene Stunde, bunte Holzhäuser)
  { id: 'hafen-1', zone: 'hafen', x: 30, z: 100, size: 'M', wall: '#E8735C', accent: '#FFF3D6', roof: 'ziegel', face: [4, 110] },
  { id: 'hafen-2', zone: 'hafen', x: -21, z: 91, size: 'M', wall: '#F4E9D3', accent: '#2FB8A8', roof: 'schiefer', face: [4, 110] },
  { id: 'hafen-3', zone: 'hafen', x: 34, z: 121, size: 'S', wall: '#6FCFB8', accent: '#FF7A59', roof: 'ziegel', face: [4, 116] },
  { id: 'hafen-4', zone: 'hafen', x: -8, z: 86, size: 'L', wall: '#E9B95C', accent: '#4F88C8', roof: 'ziegel', face: [4, 110] },
  { id: 'hafen-5', zone: 'hafen', x: 22, z: 88, size: 'M', wall: '#4F88C8', accent: '#FFF3D6', roof: 'schiefer', face: [4, 110] },
  { id: 'hafen-6', zone: 'hafen', x: -28, z: 112, size: 'S', wall: '#F4E9D3', accent: '#FF7A59', roof: 'ziegel', face: [4, 112] },
  { id: 'hafen-7', zone: 'hafen', x: 24, z: 132, size: 'S', wall: '#E8735C', accent: '#2FB8A8', roof: 'schiefer', face: [6, 134] },   // Fischerhütte am Ufer
  { id: 'hafen-8', zone: 'hafen', x: -14, z: 130, size: 'S', wall: '#6FCFB8', accent: '#FFD166', roof: 'ziegel', face: [6, 132] },
  { id: 'hafen-9', zone: 'hafen', x: 44, z: 112, size: 'M', wall: '#F4E9D3', accent: '#E8735C', roof: 'ziegel', face: [4, 110] },
  { id: 'hafen-10', zone: 'hafen', x: -32, z: 130, size: 'S', wall: '#E9B95C', accent: '#4F88C8', roof: 'schiefer', face: [-20, 124] },
  { id: 'hafen-kiosk', zone: 'hafen', x: -20, z: 116, type: 'kiosk', face: [-10, 118], r: 2.6 },
  // Markt-Hügel (Gewürzfarben, Markisen)
  { id: 'markt-1', zone: 'markt', x: -132, z: 26, size: 'M', wall: '#E9B95C', accent: '#D94A3A', roof: 'ziegel', face: [-118, 14], markise: true },
  { id: 'markt-2', zone: 'markt', x: -134, z: 2, size: 'S', wall: '#F4E9D3', accent: '#4F88C8', roof: 'ziegel', face: [-118, 14], markise: true },
  { id: 'markt-3', zone: 'markt', x: -104, z: 2, size: 'M', wall: '#E8735C', accent: '#FFF3D6', roof: 'schiefer', face: [-118, 14], markise: true },
  { id: 'markt-4', zone: 'markt', x: -118, z: 33, size: 'L', wall: '#F4E9D3', accent: '#FF6B6B', roof: 'ziegel', face: [-118, 14], markise: true },
  { id: 'markt-5', zone: 'markt', x: -100, z: 14, size: 'S', wall: '#6FCFB8', accent: '#FFD23F', roof: 'ziegel', face: [-118, 14], markise: true },
];
const BLOCK_R = { S: 3.4, M: 4.0, L: 4.8 };
export const blockRadius = (b) => (b.r !== undefined ? b.r : (BLOCK_R[b.size] || 3.5));
// Drehung, mit der die Vorderseite (+z) zum Zielpunkt zeigt
export const buildingYaw = (b) => (b.yaw !== undefined ? b.yaw : (b.face ? Math.atan2(b.face[0] - b.x, b.face[1] - b.z) : 0));
