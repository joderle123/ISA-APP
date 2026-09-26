/* SKILL DECK – Datenregister. Inhalte (Kursjahre) melden sich hier an.
   Wird VOR allen Inhalts-Dateien geladen. Keine Logik, nur Sammeln und Nachschlagen. */
(function () {
  'use strict';
  const SK = (window.SK = window.SK || {});
  SK.data = SK.data || { skills: [], units: [], situations: [] };
  const byId = (list) => Object.fromEntries(list.map((x) => [x.id, x]));
  SK.addSkills = (arr) => { SK.data.skills.push(...arr); };
  SK.addUnits = (arr) => { SK.data.units.push(...arr); };
  SK.addSituations = (arr) => { SK.data.situations.push(...arr); };
  SK.skill = (id) => byId(SK.data.skills)[id] || null;
  SK.unit = (id) => byId(SK.data.units)[id] || null;
  SK.unitByCode = (code) => SK.data.units.find((u) => u.code === String(code || '').trim().toUpperCase()) || null;
  SK.unitsOfYear = (jahr) => SK.data.units.filter((u) => u.jahr === jahr).sort((a, b) => (a.joker - b.joker) || (a.nr - b.nr));
  SK.TYPEN = [
    { id: 'koerper', label: 'Körper' },
    { id: 'atem', label: 'Atem' },
    { id: 'sinne', label: 'Sinne' },
    { id: 'kopf', label: 'Kopf' },
    { id: 'menschen', label: 'Menschen & Handeln' },
  ];
  SK.ZONEN = [
    { id: 'gruen', label: 'Grün', von: 0, bis: 30 },
    { id: 'gelb', label: 'Gelb', von: 30, bis: 70 },
    { id: 'rot', label: 'Rot', von: 70, bis: 100 },
  ];
})();
