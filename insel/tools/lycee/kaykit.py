#!/usr/bin/env python3
# KayKit-Modelle (glTF + Farbatlas) -> eine GLB mit Eckpunktfarben (sRGB, RGBA8), ein Netz je Modell, Name "kk/<modell>".
# Aufruf: python3 -I kaykit.py AUS.glb ORDNER1 [ORDNER2 ...] -- modell1 modell2 ...
# Die Farbe jedes Eckpunkts wird aus dem Atlas an seiner UV-Koordinate gelesen (KayKit nutzt einfarbige Felder im Atlas).
import sys, os, json, struct, math
import numpy as np
from PIL import Image

args = sys.argv[1:]
aus = args[0]
i = args.index('--')
ordner = args[1:i]
namen = args[i + 1:]

CT = {5120: np.int8, 5121: np.uint8, 5122: np.int16, 5123: np.uint16, 5125: np.uint32, 5126: np.float32}
NK = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}

def finde(name):
    for o in ordner:
        for wurzel, _, dateien in os.walk(o):
            if name + '.gltf' in dateien and 'gltf' in os.path.basename(wurzel):
                return os.path.join(wurzel, name + '.gltf')
    return None

def lese_acc(d, bufs, idx):
    a = d['accessors'][idx]; bv = d['bufferViews'][a['bufferView']]
    dt = CT[a['componentType']]; n = NK[a['type']]
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    stride = bv.get('byteStride', 0)
    raw = bufs[bv['buffer']]
    isz = np.dtype(dt).itemsize
    if stride and stride != isz * n:
        arr = np.zeros((a['count'], n), dtype=dt)
        for k in range(a['count']):
            arr[k] = np.frombuffer(raw, dtype=dt, count=n, offset=off + k * stride)
    else:
        arr = np.frombuffer(raw, dtype=dt, count=a['count'] * n, offset=off).reshape(a['count'], n)
    if a.get('normalized'):
        arr = arr.astype(np.float32) / np.iinfo(dt).max
    return arr.astype(np.float32) if dt == np.float32 or a.get('normalized') else arr

def mat_trs(nd):
    if 'matrix' in nd:
        return np.array(nd['matrix'], dtype=np.float64).reshape(4, 4).T
    t = nd.get('translation', [0, 0, 0]); r = nd.get('rotation', [0, 0, 0, 1]); s = nd.get('scale', [1, 1, 1])
    x, y, z, w = r
    R = np.array([[1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
                  [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
                  [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)]])
    M = np.eye(4); M[:3, :3] = R * np.array(s); M[:3, 3] = t
    return M

atlas_cache = {}
def atlas(pfad):
    if pfad not in atlas_cache:
        atlas_cache[pfad] = np.asarray(Image.open(pfad).convert('RGBA'))
    return atlas_cache[pfad]

modelle = []
for name in namen:
    f = finde(name)
    if not f:
        print('fehlt', name); continue
    d = json.load(open(f))
    basis = os.path.dirname(f)
    bufs = [open(os.path.join(basis, b['uri']), 'rb').read() for b in d['buffers']]
    img = None
    if d.get('images'):
        img = atlas(os.path.join(basis, d['images'][0]['uri']))
    P, N, C, I = [], [], [], []
    base = 0
    def geh(ni, M):
        global base
        nd = d['nodes'][ni]; W = M @ mat_trs(nd)
        if 'mesh' in nd:
            for pr in d['meshes'][nd['mesh']]['primitives']:
                at = pr['attributes']
                p = lese_acc(d, bufs, at['POSITION'])
                n = lese_acc(d, bufs, at['NORMAL']) if 'NORMAL' in at else np.zeros_like(p)
                p4 = np.c_[p, np.ones(len(p))] @ W.T
                nm = n @ np.linalg.inv(W[:3, :3]).T
                nm /= np.maximum(np.linalg.norm(nm, axis=1, keepdims=True), 1e-9)
                farbe = np.full((len(p), 4), 200, dtype=np.uint8); farbe[:, 3] = 255
                mat = d['materials'][pr['material']] if 'material' in pr else {}
                fak = mat.get('pbrMetallicRoughness', {}).get('baseColorFactor', [1, 1, 1, 1])
                if img is not None and 'TEXCOORD_0' in at:
                    uv = lese_acc(d, bufs, at['TEXCOORD_0'])
                    H, Wd = img.shape[:2]
                    px = np.clip((uv[:, 0] % 1.0) * Wd, 0, Wd - 1).astype(int)
                    py = np.clip((uv[:, 1] % 1.0) * H, 0, H - 1).astype(int)
                    farbe = img[py, px].copy()
                # Faktor (linear) grob auf sRGB anwenden
                for k in range(3):
                    farbe[:, k] = np.clip(farbe[:, k] * (fak[k] ** (1 / 2.2)), 0, 255).astype(np.uint8)
                idx = lese_acc(d, bufs, pr['indices']).reshape(-1).astype(np.uint32) if 'indices' in pr else np.arange(len(p), dtype=np.uint32)
                P.append(p4[:, :3]); N.append(nm); C.append(farbe); I.append(idx + base); base += len(p)
        for c in nd.get('children', []):
            geh(c, W)
    base = 0
    for ni in d['scenes'][d.get('scene', 0)]['nodes']:
        geh(ni, np.eye(4))
    if not P:
        print('leer', name); continue
    P = np.vstack(P).astype(np.float32); N = np.vstack(N).astype(np.float32); C = np.vstack(C).astype(np.uint8); I = np.concatenate(I).astype(np.uint32)
    modelle.append(('kk/' + name, P, N, C, I))

# GLB schreiben
blob = bytearray(); views = []; accs = []; meshes = []; nodes = []
def add_view(b, target):
    while len(blob) % 4: blob.append(0)
    views.append({'buffer': 0, 'byteOffset': len(blob), 'byteLength': len(b), 'target': target}); blob.extend(b); return len(views) - 1
for name, P, N, C, I in modelle:
    a0 = len(accs)
    accs.append({'bufferView': add_view(P.tobytes(), 34962), 'componentType': 5126, 'count': len(P), 'type': 'VEC3', 'min': P.min(0).tolist(), 'max': P.max(0).tolist()})
    n8 = np.zeros((len(N), 4), dtype=np.int8); n8[:, :3] = np.clip(np.round(N * 127), -127, 127)
    accs.append({'bufferView': add_view(n8.tobytes(), 34962), 'componentType': 5120, 'normalized': True, 'count': len(N), 'type': 'VEC3'}); views[-1]['byteStride'] = 4
    accs.append({'bufferView': add_view(C.tobytes(), 34962), 'componentType': 5121, 'normalized': True, 'count': len(C), 'type': 'VEC4'})
    small = I.max() < 65535
    ib = I.astype(np.uint16 if small else np.uint32)
    accs.append({'bufferView': add_view(ib.tobytes(), 34963), 'componentType': 5123 if small else 5125, 'count': len(I), 'type': 'SCALAR'})
    meshes.append({'name': name, 'primitives': [{'attributes': {'POSITION': a0, 'NORMAL': a0 + 1, 'COLOR_0': a0 + 2}, 'indices': a0 + 3}]})
    nodes.append({'name': name, 'mesh': len(meshes) - 1})
while len(blob) % 4: blob.append(0)
gltf = {'asset': {'version': '2.0', 'generator': 'kaykit.py (Annexe Junglinster)'}, 'extensionsUsed': ['KHR_mesh_quantization'], 'extensionsRequired': ['KHR_mesh_quantization'], 'scene': 0, 'scenes': [{'nodes': list(range(len(nodes)))}],
        'nodes': nodes, 'meshes': meshes, 'accessors': accs, 'bufferViews': views, 'buffers': [{'byteLength': len(blob)}]}
js = json.dumps(gltf, separators=(',', ':')).encode()
while len(js) % 4: js += b' '
with open(aus, 'wb') as f:
    f.write(struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(blob)))
    f.write(struct.pack('<II', len(js), 0x4E4F534A)); f.write(js)
    f.write(struct.pack('<II', len(blob), 0x004E4942)); f.write(bytes(blob))
print('modelle', len(modelle), 'bytes', os.path.getsize(aus), 'ecken', sum(len(m[1]) for m in modelle))
