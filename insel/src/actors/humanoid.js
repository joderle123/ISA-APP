// Prozedurale Figur im Anime-Teen-Stil (Stil-Bibel §8: Cel-Shading, Kontur-Hülle, große Augen, Strähnenhaar) –
// aufgeteilt in src/actors/humanoid/*. Dieser Re-Export bleibt für alle bestehenden Importe gültig:
// createHumanoid(config, { veil, name, detail, quality }) → { group, setAnim, update, setConfig, setExpression, setNameTag, … }
// Siehe Kopf von src/actors/humanoid/index.js für die vollständige API.
export * from './humanoid/index.js';
export { createHumanoid as default } from './humanoid/index.js';
