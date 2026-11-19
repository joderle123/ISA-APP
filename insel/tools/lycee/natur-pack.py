#!/usr/bin/env python3
# Quaternius „Stylized Nature MegaKit“ (glTF, CC0) -> natur.glb: ausgewählte Modelle mit eingebetteten, verkleinerten Texturen.
# Aufruf: python -I natur-pack.py AUS.glb GLTF-ORDNER Modell1 Modell2 ...
# Je Modell ein Knoten "natur/<Name>" mit einem Netz (Primitive je Material). Normalen int8 (KHR_mesh_quantization).
import sys, os, json, struct, io
import numpy as np
from PIL import Image

aus, ordner, namen = sys.argv[1], sys.argv[2], sys.argv[3:]
CT = {5120: np.int8, 5121: np.uint8, 5122: np.int16, 5123: np.uint16, 5125: np.uint32, 5126: np.float32}
NK = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}
GROESSE = {'Leaves': 512, 'Leaf': 512, 'Bark': 256, 'Flowers': 256, 'Grass': 256, 'Rocks': 256, 'Mushrooms': 256, 'PathRocks': 256}

def acc(d, bufs, i):
    a = d['accessors'][i]; bv = d['bufferViews'][a['bufferView']]; dt = CT[a['componentType']]; n = NK[a['type']]
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0); st = bv.get('byteStride', 0); isz = np.dtype(dt).itemsize
    raw = bufs[bv['buffer']]
    if st and st != isz * n:
        arr = np.stack([np.frombuffer(raw, dtype=dt, count=n, offset=off + k * st) for k in range(a['count'])])
    else:
        arr = np.frombuffer(raw, dtype=dt, count=a['count'] * n, offset=off).reshape(a['count'], n)
    if a.get('normalized'): arr = arr.astype(np.float32) / np.iinfo(dt).max
    return arr

def trs(nd):
    if 'matrix' in nd: return np.array(nd['matrix'], dtype=np.float64).reshape(4, 4).T
    t = nd.get('translation', [0, 0, 0]); x, y, z, w = nd.get('rotation', [0, 0, 0, 1]); s = nd.get('scale', [1, 1, 1])
    R = np.array([[1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)], [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)], [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)]])
    M = np.eye(4); M[:3, :3] = R * np.array(s); M[:3, 3] = t; return M

blob = bytearray(); views = []; accs = []; meshes = []; nodes = []; mats = []; texs = []; imgs = []
mat_index = {}; img_index = {}
def view(b, target=None):
    while len(blob) % 4: blob.append(0)
    v = {'buffer': 0, 'byteOffset': len(blob), 'byteLength': len(b)}
    if target: v['target'] = target
    views.append(v); blob.extend(b); return len(views) - 1

def bild(pfad, name):
    if name in img_index: return img_index[name]
    im = Image.open(pfad); alpha = im.mode in ('RGBA', 'LA') or 'transparency' in im.info
    im = im.convert('RGBA' if alpha else 'RGB')
    g = next((v for k, v in GROESSE.items() if name.startswith(k)), 256)
    im = im.resize((g, g), Image.LANCZOS)
    b = io.BytesIO()
    if alpha: im.save(b, 'PNG', optimize=True); mime = 'image/png'
    else: im.save(b, 'JPEG', quality=85); mime = 'image/jpeg'
    imgs.append({'bufferView': view(b.getvalue()), 'mimeType': mime, 'name': name})
    texs.append({'source': len(imgs) - 1, 'sampler': 0})
    img_index[name] = len(texs) - 1
    return img_index[name]

for name in namen:
    f = os.path.join(ordner, name + '.gltf')
    d = json.load(open(f)); basis = os.path.dirname(f)
    bufs = [open(os.path.join(basis, b['uri']), 'rb').read() for b in d['buffers']]
    prims = []
    def geh(ni, M):
        nd = d['nodes'][ni]; W = M @ trs(nd)
        if 'mesh' in nd:
            for pr in d['meshes'][nd['mesh']]['primitives']:
                at = pr['attributes']
                p = acc(d, bufs, at['POSITION']).astype(np.float64)
                p = (np.c_[p, np.ones(len(p))] @ W.T)[:, :3].astype(np.float32)
                n = acc(d, bufs, at['NORMAL']).astype(np.float64) @ np.linalg.inv(W[:3, :3]).T
                n /= np.maximum(np.linalg.norm(n, axis=1, keepdims=True), 1e-9)
                uv = acc(d, bufs, at['TEXCOORD_0']).astype(np.float32)
                ix = acc(d, bufs, pr['indices']).reshape(-1).astype(np.uint32)
                m = d['materials'][pr['material']]
                if m['name'] not in mat_index:
                    pbr = m.get('pbrMetallicRoughness', {}); bct = pbr.get('baseColorTexture')
                    nm = {'name': m['name'], 'pbrMetallicRoughness': {'metallicFactor': 0, 'roughnessFactor': 1}}
                    if bct:
                        im = d['images'][d['textures'][bct['index']]['source']]
                        nm['pbrMetallicRoughness']['baseColorTexture'] = {'index': bild(os.path.join(basis, im['uri']), im['name'])}
                    if 'baseColorFactor' in pbr: nm['pbrMetallicRoughness']['baseColorFactor'] = pbr['baseColorFactor']
                    if m.get('alphaMode') == 'MASK': nm['alphaMode'] = 'MASK'; nm['alphaCutoff'] = m.get('alphaCutoff', 0.5)
                    if m.get('doubleSided'): nm['doubleSided'] = True
                    mats.append(nm); mat_index[m['name']] = len(mats) - 1
                prims.append((p, n, uv, ix, mat_index[m['name']]))
        for c in nd.get('children', []): geh(c, W)
    for ni in d['scenes'][d.get('scene', 0)]['nodes']: geh(ni, np.eye(4))
    # Ursprung unten in der Mitte
    allp = np.vstack([q[0] for q in prims]); mn, mx = allp.min(0), allp.max(0)
    off = np.array([(mn[0] + mx[0]) / 2, mn[1], (mn[2] + mx[2]) / 2], dtype=np.float32)
    out = []
    for p, n, uv, ix, mi in prims:
        p = p - off
        a0 = len(accs)
        accs.append({'bufferView': view(p.tobytes(), 34962), 'componentType': 5126, 'count': len(p), 'type': 'VEC3', 'min': p.min(0).tolist(), 'max': p.max(0).tolist()})
        n8 = np.zeros((len(n), 4), dtype=np.int8); n8[:, :3] = np.clip(np.round(n * 127), -127, 127)
        accs.append({'bufferView': view(n8.tobytes(), 34962), 'byteOffset': 0, 'componentType': 5120, 'normalized': True, 'count': len(n), 'type': 'VEC3'})
        views[-1]['byteStride'] = 4
        if uv.min() >= 0 and uv.max() <= 1:
            u16 = np.round(uv * 65535).astype(np.uint16)
            accs.append({'bufferView': view(u16.tobytes(), 34962), 'componentType': 5123, 'normalized': True, 'count': len(uv), 'type': 'VEC2'})
        else:
            accs.append({'bufferView': view(uv.tobytes(), 34962), 'componentType': 5126, 'count': len(uv), 'type': 'VEC2'})
        small = ix.max() < 65535
        accs.append({'bufferView': view(ix.astype(np.uint16 if small else np.uint32).tobytes(), 34963), 'componentType': 5123 if small else 5125, 'count': len(ix), 'type': 'SCALAR'})
        out.append({'attributes': {'POSITION': a0, 'NORMAL': a0 + 1, 'TEXCOORD_0': a0 + 2}, 'indices': a0 + 3, 'material': mi})
    meshes.append({'name': 'natur/' + name, 'primitives': out}); nodes.append({'name': 'natur/' + name, 'mesh': len(meshes) - 1})
    print(name, sum(len(q[0]) for q in prims), 'Ecken', 'Höhe %.2f' % (mx[1] - mn[1]))

while len(blob) % 4: blob.append(0)
g = {'asset': {'version': '2.0', 'generator': 'natur-pack.py (Annexe Junglinster)'}, 'extensionsUsed': ['KHR_mesh_quantization'], 'extensionsRequired': ['KHR_mesh_quantization'],
     'scene': 0, 'scenes': [{'nodes': list(range(len(nodes)))}], 'nodes': nodes, 'meshes': meshes, 'materials': mats, 'textures': texs, 'images': imgs,
     'samplers': [{'magFilter': 9729, 'minFilter': 9987, 'wrapS': 10497, 'wrapT': 10497}], 'accessors': accs, 'bufferViews': views, 'buffers': [{'byteLength': len(blob)}]}
js = json.dumps(g, separators=(',', ':')).encode()
while len(js) % 4: js += b' '
with open(aus, 'wb') as f:
    f.write(struct.pack('<III', 0x46546C67, 2, 28 + len(js) + len(blob)))
    f.write(struct.pack('<II', len(js), 0x4E4F534A)); f.write(js)
    f.write(struct.pack('<II', len(blob), 0x004E4942)); f.write(bytes(blob))
print('Datei', os.path.getsize(aus), 'Bytes')
