// Licht-Presets der Innenräume (WP18): Nebel, Hemisphärenlicht, Sonne, Punktlichter (Anteile der Raumgröße), Farbkorrektur.
// at: [x, y, z] als Anteile: x, z in -1..1 (Wand zu Wand), y in 0..1 (Boden bis Decke).
export const LIGHT_PRESETS = {
  biolumineszenz: {
    fog: ['#0b2b48', 8, 60], clear: '#0b2b48', hemi: ['#3fd8c8', '#10263f', 1.7], sun: 0,
    points: [{ color: '#5ef0d8', intensity: 83, distance: 22, at: [0, 0.35, 0] }, { color: '#7a5cff', intensity: 45, distance: 18, at: [-0.6, 0.5, -0.5] }, { color: '#2de2c9', intensity: 38, distance: 16, at: [0.6, 0.25, 0.5] }],
    grade: { sat: 1.08, contrast: 1.06 },
  },
  fackeln: {
    fog: ['#1a1208', 8, 60], clear: '#150f07', hemi: ['#ffb06a', '#2a1a10', 0.95], sun: 0,
    points: [{ color: '#ffa040', intensity: 115, distance: 24, at: [-0.7, 0.45, -0.7] }, { color: '#ffa040', intensity: 115, distance: 24, at: [0.7, 0.45, -0.7] }, { color: '#ff8c2a', intensity: 70, distance: 20, at: [0, 0.4, 0.7] }],
    grade: { sat: 1.1, contrast: 1.08 },
  },
  fenster: {
    fog: ['#3a3f52', 10, 70], clear: '#2c3040', hemi: ['#cfe0ff', '#3a3040', 1.3], sun: 0.6,
    points: [{ color: '#ffe6b8', intensity: 58, distance: 20, at: [0, 0.6, 0] }],
    grade: { sat: 1.02, contrast: 1.04 },
  },
  lampe: {
    fog: ['#2a1e14', 8, 50], clear: '#221810', hemi: ['#ffd9a8', '#3a2a1a', 1.2], sun: 0,
    points: [{ color: '#ffd28a', intensity: 128, distance: 26, at: [0, 0.75, 0] }, { color: '#ffb070', intensity: 45, distance: 14, at: [0.6, 0.35, -0.6] }],
    grade: { sat: 1.06, contrast: 1.05 },
  },
  unterwasser: {
    fog: ['#0d3358', 5, 40], clear: '#0a2a4a', hemi: ['#4aa8d8', '#0a2a48', 1.5], sun: 0.15,
    points: [{ color: '#7fd8ff', intensity: 70, distance: 26, at: [0, 0.9, 0] }, { color: '#5ef0d8', intensity: 38, distance: 18, at: [-0.5, 0.2, 0.4] }],
    grade: { sat: 0.98, contrast: 1.02 },
  },
  baumhaus: {
    fog: ['#3d5a2e', 12, 70], clear: '#5a8f3a', hemi: ['#fff1c8', '#4a6a2a', 1.4], sun: 1.1,
    points: [{ color: '#ffe0a0', intensity: 70, distance: 22, at: [0, 0.7, 0] }],
    grade: { sat: 1.12, contrast: 1.05 },
  },
  daemmerung: {
    fog: ['#2a2848', 8, 56], clear: '#221f3c', hemi: ['#8a90d8', '#1e1a30', 1.0], sun: 0,
    points: [{ color: '#b48cff', intensity: 64, distance: 22, at: [0, 0.5, 0] }],
    grade: { sat: 0.95, contrast: 1.04 },
  },
  kerzen: {
    fog: ['#1e140c', 6, 44], clear: '#170f08', hemi: ['#ffc890', '#2a1a10', 0.9], sun: 0,
    points: [{ color: '#ffb860', intensity: 83, distance: 18, at: [0, 0.3, 0] }, { color: '#ff9a50', intensity: 38, distance: 12, at: [-0.6, 0.25, 0.6] }],
    grade: { sat: 1.08, contrast: 1.08 },
  },
};
export const KIT_DEFAULT_LIGHT = { hoehle: 'biolumineszenz', tempel: 'fackeln', turmetage: 'fenster', werkstatt: 'lampe', unterwasser: 'unterwasser', baumhaus: 'baumhaus', kugel: 'daemmerung', lichtkammer: 'daemmerung' };
