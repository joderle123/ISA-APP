// Prozedurale Low-Poly-Figur (WP16/WP17) – aufgeteilt in src/actors/humanoid/*. Dieser Re-Export bleibt für alle
// bestehenden Importe gültig: createHumanoid(config, { veil, name, detail }) → { group, setAnim, update, setConfig, … }
// Siehe Kopf von src/actors/humanoid/index.js für die vollständige API.
export * from './humanoid/index.js';
export { createHumanoid as default } from './humanoid/index.js';
