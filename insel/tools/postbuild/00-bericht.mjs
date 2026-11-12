// Postbuild-Hook (Beispiel und Konvention): jede tools/postbuild/*.mjs exportiert default async (ctx) => {}.
// ctx = { root, distDir, files: { 'index.html', 'lumo-vorschau.html' }, content: [{file,kind,name,abs}], plugins: [{file,id,order,deps}], log }
// Dieser Hook meldet nur, was eingebaut wurde (Plugins, Inhaltsarten, Größe) und warnt bei > 3 MB (DESIGN §20).
export default async function bericht({ files, content, plugins, log }) {
  const kinds = {};
  for (const c of content) kinds[c.kind] = (kinds[c.kind] || 0) + 1;
  const mb = Buffer.byteLength(files['index.html']) / (1024 * 1024);
  log(`Plugins: ${plugins.map((p) => `${p.id}(${p.order})`).join(', ') || 'keine'} · Inhalte: ${Object.entries(kinds).map(([k, n]) => `${k} ${n}`).join(', ') || 'keine'} · ${mb.toFixed(2)} MB`);
  if (mb > 3) log('⚠ dist/index.html ist größer als 3 MB');
}
