// Inhalte-Registry: alle src/content/**/*.js (vom Build eingesammelt, siehe src/_gen/content.js).
//   content.get('quests', 'j1-e11') · content.list('npcs') · content.has(kind, id) · content.kinds()
//   content.register(kind, def, { file, name })  – auch zur Laufzeit (Tests, Fixtures)
//   content.unit('j1-e11') → Einheit aus content/units.js (id, nr, modul, titel, code …); content.units → alle 39
//   content.codes → { demo, teacher, weather:{…}, modules:{…} } (Sonder-Codes, siehe content/units.js)
//   content.resolveSite('strand.muschelbucht' | 'baumhaus' | {x,z} | {site}) → { x, z, y?, region?, name } | null
//   content.siteIds() → alle bekannten Ortsnamen (Insel-SITES + Regions-Sites als 'region.site')

export function createContent({ entries = [], island = null, log = console } = {}) {
  const kinds = new Map(); // kind -> Map(id -> { def, file, name })

  const api = {
    register(kind, def, meta = {}) {
      if (!def || typeof def !== 'object') { log.warn && log.warn(`[content] ${meta.file || kind}: kein Objekt`); return null; }
      const id = def.id || meta.name || meta.file;
      if (!kinds.has(kind)) kinds.set(kind, new Map());
      const map = kinds.get(kind);
      if (map.has(id) && log.warn) log.warn(`[content] ${kind}/${id} doppelt (${meta.file})`);
      map.set(id, { def, file: meta.file || null, name: meta.name || id, id, kind });
      return def;
    },
    get(kind, id) { const m = kinds.get(kind); const e = m && m.get(id); return e ? e.def : null; },
    entry(kind, id) { const m = kinds.get(kind); return (m && m.get(id)) || null; },
    has(kind, id) { const m = kinds.get(kind); return !!(m && m.has(id)); },
    list(kind) { const m = kinds.get(kind); return m ? [...m.values()].map((e) => e.def) : []; },
    entries(kind) { const m = kinds.get(kind); return m ? [...m.values()] : []; },
    ids(kind) { const m = kinds.get(kind); return m ? [...m.keys()] : []; },
    kinds() { return [...kinds.keys()]; },
    count(kind) { const m = kinds.get(kind); return m ? m.size : 0; },
    find(kind, pred) { return api.list(kind).find(pred) || null; },
    filter(kind, pred) { return api.list(kind).filter(pred); },

    // ---- Einheiten und Codes (content/units.js) ----
    get units() { const u = api.get('units', 'units'); return u ? u.units : []; },
    unit(id) { return api.units.find((u) => u.id === id) || null; },
    get codes() { const u = api.get('units', 'units'); return u ? u.codes : {}; },
    // Code-Wort → Einheit/Sonder-Code (Groß/Klein egal, Umlaute vereinfacht). Rückgabe {kind:'unit', unit} | {kind:'demo'|'teacher'|'weather'|'module', id} | null
    lookupCode(word) {
      const w = normCode(word);
      if (!w) return null;
      const u = api.units.find((x) => normCode(x.code) === w);
      if (u) return { kind: 'unit', id: u.id, unit: u };
      const c = api.codes || {};
      if (c.demo && normCode(c.demo) === w) return { kind: 'demo', id: 'demo' };
      if (c.teacher && normCode(c.teacher) === w) return { kind: 'teacher', id: 'teacher' };
      for (const [k, v] of Object.entries(c.weather || {})) if (normCode(v) === w) return { kind: 'weather', id: k };
      for (const [k, v] of Object.entries(c.modules || {})) if (normCode(v) === w) return { kind: 'module', id: k };
      return null;
    },

    // ---- Orte ----
    resolveSite(ref) {
      if (!ref) return null;
      if (typeof ref === 'object' && typeof ref.x === 'number' && typeof ref.z === 'number') return { x: ref.x, z: ref.z, y: ref.y };
      const key = typeof ref === 'string' ? ref : ref.site;
      if (!key) return null;
      const dot = key.indexOf('.');
      if (dot > 0) {
        const region = api.get('regions', key.slice(0, dot));
        const s = region && region.sites && region.sites[key.slice(dot + 1)];
        if (s) return { ...s, region: region.id, name: key };
      }
      if (island && island.SITES && island.SITES[key]) { const s = island.SITES[key]; return { x: s.x, z: s.z, r: s.r, zone: s.zone, name: key }; }
      if (island && island.zoneById && island.zoneById(key)) { const z = island.zoneById(key); return { x: z.spawn.x, z: z.spawn.z, zone: z.id, name: key }; }
      for (const region of api.list('regions')) {
        if (region.sites && region.sites[key]) return { ...region.sites[key], region: region.id, name: region.id + '.' + key };
      }
      return null;
    },
    siteIds() {
      const out = [];
      if (island && island.SITES) out.push(...Object.keys(island.SITES));
      for (const region of api.list('regions')) if (region.sites) out.push(...Object.keys(region.sites).map((s) => region.id + '.' + s));
      return out;
    },
  };
  for (const e of entries) api.register(e.kind, e.def, { file: e.file, name: e.name });
  return api;
}

// Code-Wörter vergleichbar machen: Großschreibung, Umlaute → AE/OE/UE, ß → SS, Leerzeichen/Bindestriche weg
export function normCode(s) {
  return String(s || '').trim().toUpperCase()
    .replace(/Ä/g, 'AE').replace(/Ö/g, 'OE').replace(/Ü/g, 'UE').replace(/ß/g, 'SS')
    .replace(/[\s_-]+/g, '');
}
