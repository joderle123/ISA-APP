# Kenney-Bausätze (City Kit Suburban/Commercial/Roads, Car Kit; kenney.nl, CC0) → eine GLB-Datei für RESPAWN.
#   python3 -I tools/stadt/stadt.py <ordner mit den entpackten Kits> src/respawn/modelle/stadt.glb
# Die Modelle nutzen eine gemeinsame Farbtafel (colormap.png). Hier wird die Farbe je Eckpunkt aus der Tafel gelesen und
# fest ins Modell geschrieben (COLOR_0) – so brauchen sie keine Textur und nutzen das Material der Insel (Umriss, Schatten).
# Teile eines Modells (Karosserie, Räder) werden zu einem Netz zusammengefasst. Ohne Fremd-Module (eigener PNG-Leser).
import json, struct, sys, zlib, os, math

AUSWAHL = {
    'city-kit-suburban': ['building-type-%s' % c for c in 'abcdefghijklmnop'] + ['fence', 'fence-low', 'fence-1x2', 'fence-1x3', 'planter', 'tree-small', 'tree-large', 'driveway-short', 'path-short', 'path-long'],
    'city-kit-commercial': ['building-%s' % c for c in 'abcdefgh'] + ['detail-awning', 'detail-awning-wide', 'detail-parasol-a', 'detail-parasol-b', 'detail-overhang'],
    'city-kit-roads': ['road-straight', 'road-straight-half', 'road-bend', 'road-crossroad', 'road-intersection', 'road-end', 'road-end-round', 'road-crossing', 'road-square',
                       'road-side', 'light-square', 'light-curved', 'light-square-double', 'traffic-light', 'road-sign-stop', 'road-sign-street', 'road-sign-warning',
                       'construction-cone', 'construction-barrier', 'dumpster', 'electricity-pole', 'tile-low'],
    'car-kit': ['sedan', 'sedan-sports', 'hatchback-sports', 'suv', 'van', 'taxi', 'police', 'ambulance', 'delivery', 'tractor', 'cone', 'box'],
}

def png(pfad):
    b = open(pfad, 'rb').read()
    assert b[:8] == b'\x89PNG\r\n\x1a\n'
    i, idat, plte, trns = 8, b'', None, None
    while i < len(b):
        n, typ = struct.unpack('>I4s', b[i:i + 8]); d = b[i + 8:i + 8 + n]; i += 12 + n
        if typ == b'IHDR': w, h, tiefe, art, _, _, il = struct.unpack('>IIBBBBB', d)
        elif typ == b'IDAT': idat += d
        elif typ == b'PLTE': plte = d
        elif typ == b'tRNS': trns = d
    assert tiefe == 8 and il == 0, 'nur 8 Bit, nicht verschachtelt'
    kan = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[art]
    roh = zlib.decompress(idat); zl = w * kan
    px = bytearray(h * zl); vor = bytearray(zl); p = 0
    for y in range(h):
        f = roh[p]; z = bytearray(roh[p + 1:p + 1 + zl]); p += 1 + zl
        for x in range(zl):
            a = z[x - kan] if x >= kan else 0; bb = vor[x]; c = vor[x - kan] if x >= kan else 0
            if f == 1: z[x] = (z[x] + a) & 255
            elif f == 2: z[x] = (z[x] + bb) & 255
            elif f == 3: z[x] = (z[x] + ((a + bb) >> 1)) & 255
            elif f == 4:
                q = a + bb - c; pa, pb, pc = abs(q - a), abs(q - bb), abs(q - c)
                z[x] = (z[x] + (a if pa <= pb and pa <= pc else bb if pb <= pc else c)) & 255
        px[y * zl:(y + 1) * zl] = z; vor = z
    def farbe(u, v):
        x = min(w - 1, max(0, int(u * w))); y = min(h - 1, max(0, int(v * h))); o = (y * w + x) * kan
        if art == 3: k = px[o]; return plte[k * 3], plte[k * 3 + 1], plte[k * 3 + 2]
        if art in (2, 6): return px[o], px[o + 1], px[o + 2]
        return px[o], px[o], px[o]
    return farbe

def quat_mat(q):
    x, y, z, w = q
    return [[1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)], [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)], [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)]]

def lies_glb(pfad):
    b = open(pfad, 'rb').read()
    n = struct.unpack('<I', b[12:16])[0]; j = json.loads(b[20:20 + n]); o = 20 + n
    m = struct.unpack('<I', b[o:o + 4])[0]; binär = b[o + 8:o + 8 + m]
    def acc(i):
        a = j['accessors'][i]; bv = j['bufferViews'][a['bufferView']]
        start = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
        k = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}[a['type']]
        fmt, gr = {5126: ('f', 4), 5123: ('H', 2), 5125: ('I', 4), 5121: ('B', 1)}[a['componentType']]
        schritt = bv.get('byteStride') or k * gr
        out = []
        for i2 in range(a['count']):
            out.append(struct.unpack_from('<' + fmt * k, binär, start + i2 * schritt))
        return out
    return j, acc

def modell(pfad, farbe):
    j, acc = lies_glb(pfad)
    P, N, C, I = [], [], [], []
    def lauf(ni, R, T, S):
        nd = j['nodes'][ni]
        t = nd.get('translation', [0, 0, 0]); r = quat_mat(nd.get('rotation', [0, 0, 0, 1])); s = nd.get('scale', [1, 1, 1])
        # Welt = Eltern(R, T, S) ∘ lokal
        R2 = [[sum(R[a][k] * r[k][b] for k in range(3)) for b in range(3)] for a in range(3)]
        T2 = [T[a] + sum(R[a][k] * S[k] * t[k] for k in range(3)) for a in range(3)]
        S2 = [S[k] * s[k] for k in range(3)]
        if 'mesh' in nd:
            for pr in j['meshes'][nd['mesh']]['primitives']:
                at = pr['attributes']; pos = acc(at['POSITION']); nor = acc(at['NORMAL']); uv = acc(at['TEXCOORD_0']) if 'TEXCOORD_0' in at else None
                idx = [x[0] for x in acc(pr['indices'])] if 'indices' in pr else list(range(len(pos)))
                basis = len(P)
                mat = j['materials'][pr['material']] if 'material' in pr else {}
                fak = mat.get('pbrMetallicRoughness', {}).get('baseColorFactor', [1, 1, 1, 1])
                hat_tex = 'baseColorTexture' in mat.get('pbrMetallicRoughness', {})
                for k, p in enumerate(pos):
                    q = [p[a] * S2[a] for a in range(3)]
                    P.append(tuple(T2[a] + sum(R2[a][b] * q[b] for b in range(3)) for a in range(3)))
                    nn = nor[k]; N.append(tuple(sum(R2[a][b] * nn[b] for b in range(3)) for a in range(3)))
                    c = farbe(uv[k][0], uv[k][1]) if (uv and hat_tex) else (255, 255, 255)
                    C.append(tuple(min(255, int(c[a] * fak[a])) for a in range(3)))
                I.extend(basis + x for x in idx)
        for c in nd.get('children', []): lauf(c, R2, T2, S2)
    eins = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    for ni in j['scenes'][j.get('scene', 0)]['nodes']: lauf(ni, eins, [0, 0, 0], [1, 1, 1])
    return P, N, C, I

def main():
    quelle, ziel = sys.argv[1], sys.argv[2]
    binär = bytearray(); views, accs, meshes, nodes = [], [], [], []
    def puffer(daten, target=None):
        while len(binär) % 4: binär.append(0)
        views.append({'buffer': 0, 'byteOffset': len(binär), 'byteLength': len(daten), **({'target': target} if target else {})})
        binär.extend(daten); return len(views) - 1
    for kit, namen in AUSWAHL.items():
        ordner = os.path.join(quelle, kit, 'Models', 'GLB format')
        farbe = png(os.path.join(ordner, 'Textures', 'colormap.png'))
        kurz = {'city-kit-suburban': 'haus', 'city-kit-commercial': 'laden', 'city-kit-roads': 'strasse', 'car-kit': 'auto'}[kit]
        for nm in namen:
            pfad = os.path.join(ordner, nm + '.glb')
            if not os.path.exists(pfad): print('fehlt', kit, nm); continue
            P, N, C, I = modell(pfad, farbe)
            mn = [min(p[a] for p in P) for a in range(3)]; mx = [max(p[a] for p in P) for a in range(3)]
            vp = puffer(b''.join(struct.pack('<3f', *p) for p in P), 34962)
            vn = puffer(b''.join(struct.pack('<3b', *(max(-127, min(127, round(x * 127))) for x in n)) + b'\0' for n in N), 34962)
            vc = puffer(b''.join(struct.pack('<4B', c[0], c[1], c[2], 255) for c in C), 34962)
            gross = len(P) > 65535
            vi = puffer(b''.join(struct.pack('<I' if gross else '<H', x) for x in I), 34963)
            a0 = len(accs)
            accs += [{'bufferView': vp, 'componentType': 5126, 'count': len(P), 'type': 'VEC3', 'min': mn, 'max': mx},
                     {'bufferView': vn, 'componentType': 5120, 'normalized': True, 'count': len(N), 'type': 'VEC3'},
                     {'bufferView': vc, 'componentType': 5121, 'normalized': True, 'count': len(C), 'type': 'VEC4'},
                     {'bufferView': vi, 'componentType': 5125 if gross else 5123, 'count': len(I), 'type': 'SCALAR'}]
            views[vn]['byteStride'] = 4
            name = kurz + '/' + nm.replace('building-type-', '').replace('building-', '')
            meshes.append({'name': name, 'primitives': [{'attributes': {'POSITION': a0, 'NORMAL': a0 + 1, 'COLOR_0': a0 + 2}, 'indices': a0 + 3}]})
            nodes.append({'name': name, 'mesh': len(meshes) - 1})
    while len(binär) % 4: binär.append(0)
    j = {'asset': {'version': '2.0', 'generator': 'tools/stadt/stadt.py (Kenney CC0)'}, 'extensionsUsed': ['KHR_mesh_quantization'], 'extensionsRequired': ['KHR_mesh_quantization'],
         'scene': 0, 'scenes': [{'nodes': list(range(len(nodes)))}], 'nodes': nodes, 'meshes': meshes, 'accessors': accs, 'bufferViews': views, 'buffers': [{'byteLength': len(binär)}]}
    jb = json.dumps(j, separators=(',', ':')).encode()
    while len(jb) % 4: jb += b' '
    with open(ziel, 'wb') as f:
        f.write(struct.pack('<4sII', b'glTF', 2, 12 + 8 + len(jb) + 8 + len(binär)))
        f.write(struct.pack('<I4s', len(jb), b'JSON')); f.write(jb)
        f.write(struct.pack('<I4s', len(binär), b'BIN\0')); f.write(binär)
    print(len(nodes), 'Modelle →', ziel, round(os.path.getsize(ziel) / 1024), 'KB')
main()
