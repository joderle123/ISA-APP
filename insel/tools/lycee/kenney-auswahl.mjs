// Aus stadt.glb nur die Modelle behalten, die das Lycée braucht (Namen als Argumente)
import { NodeIO } from '/tmp/claude-0/gt/node_modules/@gltf-transform/core/dist/index.js';
import { ALL_EXTENSIONS } from '/tmp/claude-0/gt/node_modules/@gltf-transform/extensions/dist/index.js';
import { prune } from '/tmp/claude-0/gt/node_modules/@gltf-transform/functions/dist/index.js';
const [ein, aus, ...namen] = process.argv.slice(2);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(ein);
const keep = new Set(namen);
let n = 0;
for (const scene of doc.getRoot().listScenes()) for (const node of scene.listChildren()) {
  const name = (node.getExtras() && node.getExtras().name) || node.getName();
  if (!keep.has(name)) node.dispose(); else n++;
}
await doc.transform(prune());
await io.write(aus, doc);
console.log('behalten', n, 'von', namen.length);
