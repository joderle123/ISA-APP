// Kosmetik-Grundausstattung (WP41, CONTENT-SCHEMA CosmeticDef). Alles kommt aus der Welt, nie für Wohlverhalten,
// kein Shop, kein Geld (DESIGN §8/§14). Frisuren, Kleidung, Farben und Muster sind immer frei – hier stehen nur die
// Extras: Tiermasken (e24), Emotes (wachsen mit den Einheiten), Segelmuster, Glimm-Skins, Farbsets aus befreiten
// Regionen, besondere Kopfsachen, die Crew-Jacke (Finale). name ≤ 6 Wörter, icon aus ui/icons.js, params = Wirkung.
export default {
  id: 'basis',
  items: [
    // ---- Emotes: vier von Anfang an, der Rest kommt mit den Einheiten ----
    { id: 'emote-winken', slot: 'emote', source: { start: true }, name: 'Winken', icon: 'hand', params: { emote: 'winken' } },
    { id: 'emote-nicken', slot: 'emote', source: { start: true }, name: 'Nicken', icon: 'check', params: { emote: 'nicken' } },
    { id: 'emote-kopfschuetteln', slot: 'emote', source: { start: true }, name: 'Kopfschütteln', icon: 'x', params: { emote: 'kopfschuetteln' } },
    { id: 'emote-schulterzucken', slot: 'emote', source: { start: true }, name: 'Schulterzucken', icon: 'frage', params: { emote: 'schulterzucken' } },
    { id: 'emote-sitzen', slot: 'emote', source: { unitDone: 'j1-e01' }, name: 'Dazusetzen', icon: 'herz', params: { emote: 'sitzenNeben' } },
    { id: 'emote-daumen', slot: 'emote', source: { unitDone: 'j1-e02' }, name: 'Daumen hoch', icon: 'haken', params: { emote: 'daumen' } },
    { id: 'emote-hand-heben', slot: 'emote', source: { unitDone: 'j1-e03' }, name: 'Hand heben', icon: 'pfeilhoch', params: { emote: 'handHeben' } },
    { id: 'emote-lachen', slot: 'emote', source: { unitDone: 'j1-e05' }, name: 'Lachen', icon: 'sonne', params: { emote: 'lachen' } },
    { id: 'emote-trommeltanz', slot: 'emote', source: { unitDone: 'j1-e09' }, name: 'Stampf-Tanz', icon: 'trommel', params: { emote: 'tanzStampf' } },
    { id: 'emote-wellentanz', slot: 'emote', source: { regionFreed: 'strand' }, name: 'Wellen-Tanz', icon: 'wirbel', params: { emote: 'tanzWelle' } },
    { id: 'emote-stopp', slot: 'emote', source: { unitDone: 'j1-e23' }, name: 'Stopp-Hand', icon: 'stopp', params: { emote: 'stopp' } },
    { id: 'emote-drehtanz', slot: 'emote', source: { regionFreed: 'dschungel' }, name: 'Dreh-Tanz', icon: 'drehen', params: { emote: 'tanzDreh' } },
    // ---- Tiermasken (Streit-Tiere, e24) ----
    { id: 'maske-fuchs', slot: 'maske', source: { unitDone: 'j1-e24' }, name: 'Fuchs-Maske', icon: 'stern', color: '#ff7a2f', params: { mask: 'fuchs' } },
    { id: 'maske-eule', slot: 'maske', source: { unitDone: 'j1-e24' }, name: 'Eulen-Maske', icon: 'augen', color: '#8a6a4a', params: { mask: 'eule' } },
    { id: 'maske-hai', slot: 'maske', source: { unitDone: 'j1-e24' }, name: 'Hai-Maske', icon: 'zickzack', color: '#5e7a99', params: { mask: 'hai' } },
    { id: 'maske-schildkroete', slot: 'maske', source: { unitDone: 'j1-e24' }, name: 'Schildkröten-Maske', icon: 'stein', color: '#3f9e5e', params: { mask: 'schildkroete' } },
    { id: 'maske-teddy', slot: 'maske', source: { unitDone: 'j1-e24' }, name: 'Teddy-Maske', icon: 'herz', color: '#a5643c', params: { mask: 'teddy' } },
    // ---- Besondere Kopfsachen ----
    { id: 'kopf-crew-bandana', slot: 'kopf', source: { unitDone: 'j1-e25' }, name: 'Crew-Bandana', icon: 'flamme', color: '#ff3b3b', params: { head: 'bandana', headColor: '#ff3b3b' } },
    { id: 'kopf-blumenkranz', slot: 'kopf', source: { unitDone: 'j1-j04' }, name: 'Blütenband', icon: 'bonsai', color: '#ff8ccf', params: { head: 'stirnband', headColor: '#ff8ccf' } },
    { id: 'kopf-sturmhaube', slot: 'kopf', source: { unitDone: 'j1-e15' }, name: 'Sturm-Kapuze', icon: 'blitz', color: '#8fa3ff', params: { head: 'kapuze' } },
    // ---- Farbsets aus befreiten Regionen (zusätzliche Farbfelder im Stil-Studio) ----
    { id: 'farbe-hafen', slot: 'farbset', source: { regionFreed: 'hafen' }, name: 'Hafen-Farben', icon: 'anker', color: '#ffb347', params: { dyes: ['#ffb347', '#ff6b6b', '#f4e3c1', '#2b6cb0'] } },
    { id: 'farbe-lagune', slot: 'farbset', source: { regionFreed: 'strand' }, name: 'Lagunen-Farben', icon: 'muschel', color: '#2de2c9', params: { dyes: ['#2de2c9', '#ffe29a', '#ff7a59', '#0b6e79'] } },
    { id: 'farbe-dschungel', slot: 'farbset', source: { regionFreed: 'dschungel' }, name: 'Dschungel-Farben', icon: 'trommel', color: '#4cd964', params: { dyes: ['#4cd964', '#ff4f8b', '#ffd23f', '#1b5e3b'] } },
    { id: 'farbe-sturm', slot: 'farbset', source: { regionFreed: 'klippen' }, name: 'Sturm-Farben', icon: 'windrad', color: '#8fa3ff', params: { dyes: ['#8fa3ff', '#2b2f4a', '#dfe6ff', '#ffd23f'] } },
    { id: 'farbe-moor', slot: 'farbset', source: { regionFreed: 'moor' }, name: 'Moor-Farben', icon: 'stein', color: '#b06bff', params: { dyes: ['#b06bff', '#3a2a4a', '#9be3a0', '#6a5040'] } },
    { id: 'farbe-markt', slot: 'farbset', source: { regionFreed: 'markt' }, name: 'Markt-Farben', icon: 'spraydose', color: '#ffd166', params: { dyes: ['#ffd166', '#c2185b', '#00897b', '#ef6c00'] } },
    { id: 'farbe-vulkan', slot: 'farbset', source: { regionFreed: 'vulkan' }, name: 'Vulkan-Farben', icon: 'flamme', color: '#ff6b3d', params: { dyes: ['#ff6b3d', '#1a1a22', '#ffb347', '#5a1f1f'] } },
    { id: 'farbe-glimmer', slot: 'farbset', source: { regionFreed: 'glimmer' }, name: 'Glimmer-Farben', icon: 'stern', color: '#ff8ccf', params: { dyes: ['#ff8ccf', '#7cf3ff', '#c8a2ff', '#0d1440'] } },
    { id: 'farbe-quellen', slot: 'farbset', source: { regionFreed: 'quellen' }, name: 'Quellen-Farben', icon: 'giesskanne', color: '#8fd18b', params: { dyes: ['#8fd18b', '#ffe9a8', '#5b8c5a', '#f6f0e6'] } },
    { id: 'farbe-leuchtfeuer', slot: 'farbset', source: { regionFreed: 'leuchtturm' }, name: 'Leuchtfeuer-Farben', icon: 'laterne', color: '#fff3a0', params: { dyes: ['#fff3a0', '#ff4d4d', '#ffffff', '#1b1033'] } },
    // ---- Segelmuster (Segel-Federn), Glimm-Skins, Spuren ----
    { id: 'segel-regenbogen', slot: 'segel', source: { minigame: 'e10-kronen-segeln', medal: 'gold' }, name: 'Regenbogen-Segel', icon: 'segel', builder: 'segelMuster', params: { stripes: 6 } },
    { id: 'segel-lagune', slot: 'segel', source: { nebelkern: 'nk-strand' }, name: 'Lagunen-Segel', icon: 'segel', builder: 'segelMuster', params: { tint: '#2de2c9' } },
    { id: 'segel-sturm', slot: 'segel', source: { nebelkern: 'nk-klippen' }, name: 'Sturm-Segel', icon: 'segel', builder: 'segelMuster', params: { tint: '#8fa3ff' } },
    { id: 'glimm-axolotl', slot: 'glimm', source: { nebelkern: 'nk-strand' }, name: 'Axolotl-Glimm', icon: 'glimm', color: '#ff8ccf' },
    { id: 'glimm-fledermaus', slot: 'glimm', source: { nebelkern: 'nk-vulkan' }, name: 'Funkenfledermaus-Glimm', icon: 'glimm', color: '#ff6b3d' },
    { id: 'spur-funken', slot: 'spur', source: { minigame: 'hafen-daecher', medal: 'gold' }, name: 'Funken-Spur', icon: 'stern', color: '#ffd166' },
    { id: 'spur-blueten', slot: 'spur', source: { unitDone: 'j1-j04' }, name: 'Blüten-Spur', icon: 'bonsai', color: '#ff8ccf' },
    // ---- Crew-Jacke (Finale): Futter mit den Stärken der Crew (Bindung ≥ 2) ----
    { id: 'jacke-crew', slot: 'jacke', source: { unitDone: 'j1-e30' }, name: 'Crew-Jacke', icon: 'team', color: '#1d1d26', params: { topStyle: 'crewjacke' } },
  ],
};
