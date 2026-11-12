# Open Peeps (Pablo Stanley, openpeeps.com, CC0): Sketch-Datei → Formen für die Arbeitsblätter (src/blatt/zeichnung.ts).
# Aufruf:  python3 -I tools/peeps/peeps.py <open-peeps.sketch> src/blatt/bilder/peeps.json
#          (für drei Bausteine mit Schnittmenge wird shapely gebraucht:  pip install --target <ordner> shapely,
#           dann PYTHONPATH weglassen und den Ordner als drittes Argument angeben)
# Ausgabe: { teile: { "kopf/bun-2": { b, h, k:[x0,y0,x1,y1], f:[Formen] }, … },
#            person: { brust|stehen|sitzen: { b, h, plaetze:[{ rolle, x, y, b, h, standard }] } } }
# Farbrollen in den Formen: 'haut', 'haar', 'tinte', 'papier', 'kleid' (wird je Figur gesetzt); sonst #rrggbb.
import json, sys, math, re, zipfile

def pt(s):
    a, b = s.strip('{}').split(','); return float(a), float(b)

def farbe(c):
    r, g, b, a = [c.get(k, 1) for k in ('red', 'green', 'blue', 'alpha')]
    return '#%02x%02x%02x' % (round(r * 255), round(g * 255), round(b * 255)), a

def mat_mul(m, n):   # (a,b,c,d,e,f) wie SVG matrix
    a, b, c, d, e, f = m; A, B, C, D, E, F = n
    return (a * A + c * B, b * A + d * B, a * C + c * D, b * C + d * D, a * E + c * F + e, b * E + d * F + f)

def layer_mat(l):
    fr = l['frame']; w, h = fr['width'], fr['height']
    m = (1, 0, 0, 1, fr['x'], fr['y'])
    rot = l.get('rotation', 0) or 0
    fh, fv = l.get('isFlippedHorizontal'), l.get('isFlippedVertical')
    if rot or fh or fv:
        m = mat_mul(m, (1, 0, 0, 1, w / 2, h / 2))
        if rot:
            r = math.radians(-rot); m = mat_mul(m, (math.cos(r), math.sin(r), -math.sin(r), math.cos(r), 0, 0))
        if fh or fv: m = mat_mul(m, (-1 if fh else 1, 0, 0, -1 if fv else 1, 0, 0))
        m = mat_mul(m, (1, 0, 0, 1, -w / 2, -h / 2))
    return m

def ap(m, x, y):
    a, b, c, d, e, f = m; return a * x + c * y + e, b * x + d * y + f

def n(v):
    return str(int(round(v)))

def pfad(l, m):
    """Pfad einer Form in den Koordinaten, die m liefert (m enthält schon die Ebene selbst)."""
    fr = l['frame']; w, h = fr['width'], fr['height']
    P = l.get('points') or []
    if not P: return ''
    def q(s):
        x, y = pt(s); return ap(m, x * w, y * h)
    d = []
    x0, y0 = q(P[0]['point']); d.append('M%s %s' % (n(x0), n(y0)))
    k = len(P)
    rng = range(k) if l.get('isClosed', True) else range(k - 1)
    for i in rng:
        a, b = P[i], P[(i + 1) % k]
        bx, by = q(b['point'])
        if a.get('hasCurveFrom') or b.get('hasCurveTo'):
            c1 = q(a['curveFrom']) if a.get('hasCurveFrom') else q(a['point'])
            c2 = q(b['curveTo']) if b.get('hasCurveTo') else q(b['point'])
            d.append('C%s %s %s %s %s %s' % (n(c1[0]), n(c1[1]), n(c2[0]), n(c2[1]), n(bx), n(by)))
        else:
            d.append('L%s %s' % (n(bx), n(by)))
    if l.get('isClosed', True): d.append('Z')
    return ''.join(d)

FORM = ('shapePath', 'rectangle', 'oval', 'polygon', 'star', 'triangle')

def sammle(l, m):
    """Alle Teilpfade einer Form oder Formgruppe; liefert (d, hatAbzug)."""
    if l['_class'] in FORM: return pfad(l, m), l.get('booleanOperation', -1) in (1, 3)
    d, abzug = [], False
    for c in l.get('layers', []):
        if not c.get('isVisible', True): continue
        dd, ab = sammle(c, mat_mul(m, layer_mat(c)))
        d.append(dd); abzug = abzug or ab or c.get('booleanOperation', -1) in (1, 3)
    return ''.join(d), abzug


def flach(l, m, schritte=10):
    """Form als Vielecke (für die Schnittmenge): Kurven in kurze Strecken zerlegt."""
    if l['_class'] not in FORM:
        out = []
        for c in l.get('layers', []):
            if c.get('isVisible', True): out += flach(c, mat_mul(m, layer_mat(c)), schritte)
        return out
    fr = l['frame']; w, h = fr['width'], fr['height']
    P = l.get('points') or []
    if len(P) < 2: return []
    def q(s):
        x, y = pt(s); return ap(m, x * w, y * h)
    pts = [q(P[0]['point'])]; k = len(P)
    for i in range(k):
        a, b = P[i], P[(i + 1) % k]
        p0, p3 = q(a['point']), q(b['point'])
        if a.get('hasCurveFrom') or b.get('hasCurveTo'):
            c1 = q(a['curveFrom']) if a.get('hasCurveFrom') else p0
            c2 = q(b['curveTo']) if b.get('hasCurveTo') else p3
            for s in range(1, schritte + 1):
                t = s / schritte; u = 1 - t
                pts.append((u*u*u*p0[0] + 3*u*u*t*c1[0] + 3*u*t*t*c2[0] + t*t*t*p3[0], u*u*u*p0[1] + 3*u*u*t*c1[1] + 3*u*t*t*c2[1] + t*t*t*p3[1]))
        else: pts.append(p3)
    return [pts]

SLUG = lambda s: re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
GRUPPE = {'head': 'kopf', 'face': 'gesicht', 'body': 'koerper', 'facial-hair': 'bart', 'accessories': 'brille'}
WEG = {'face/Cyclops', 'face/Monster', 'body/Killer', 'accessories/Eyepatch', 'head/Bear'}

def neuer_name(nm):
    if nm.startswith('pose/standing/'): return 'stehen/' + SLUG(nm[14:])
    if nm.startswith('pose/sitting/'): return 'sitzen/' + SLUG(nm[13:])
    g, rest = nm.split('/', 1)
    if '*' in rest: return GRUPPE.get(g, g) + '/ohne'
    return GRUPPE.get(g, g) + '/' + SLUG(rest)

class Wandler:
    def __init__(self, seite, doc):
        self.master = {l['symbolID']: l for l in seite['layers'] if l['_class'] == 'symbolMaster'}
        self.stil = {o['do_objectID']: o['name'] for o in doc.get('layerStyles', {}).get('objects', [])}
        self.kasten = None

    def rolle(self, l, hexv):
        name = self.stil.get(l.get('sharedStyleID', ''), '')
        g = name.split('/')[0].lower() if name else ''
        if g == 'skin': return 'haut'
        if g == 'hair': return 'haar'
        if g == 'chromatic': return 'papier' if name.endswith('white') else 'kleid'
        if name == 'Mono/01-Ink': return 'tinte'
        if name == 'Mono/02-Background': return 'papier'
        if hexv in ('#000000', '#010101'): return 'tinte'
        if hexv == '#ffffff': return 'papier'
        return hexv

    def merke(self, d):
        z = [float(v) for v in re.findall(r'-?\d+(?:\.\d+)?', d)]
        xs, ys = z[0::2], z[1::2]
        if not xs: return
        k = self.kasten
        b = [min(xs), min(ys), max(xs), max(ys)]
        self.kasten = b if k is None else [min(k[0], b[0]), min(k[1], b[1]), max(k[2], b[2]), max(k[3], b[3])]

    def form(self, l, d, mehrteilig):
        s = l.get('style', {})
        fills = [f for f in s.get('fills', []) if f.get('isEnabled')]
        bords = [b for b in s.get('borders', []) if b.get('isEnabled')]
        if not d or (not fills and not bords): return None
        self.merke(d)
        o = {'t': 'path', 'd': d}
        if fills:
            f = fills[-1]
            c = f['color'] if f.get('fillType', 0) == 0 else (f.get('gradient', {}).get('stops', [{}])[0].get('color') or f['color'])
            hx, a = farbe(c); o['f'] = self.rolle(l, hx)
            if a < 0.999: o['o'] = round(a, 2)
            if mehrteilig: o['er'] = True
        if bords:
            b = bords[0]; hx, a = farbe(b['color'])
            o['s'] = self.rolle(l, hx) if not fills else ('tinte' if hx == '#000000' else hx); o['w'] = round(b.get('thickness', 1), 1)
        op = s.get('contextSettings', {}).get('opacity', 1)
        if op < 0.999: o['o'] = round(op * o.get('o', 1), 2)
        return o

    def zeichne(self, l, m):
        if not l.get('isVisible', True): return []
        k = l['_class']
        if k == 'shapeGroup' and any(c.get('booleanOperation', -1) == 2 for c in l.get('layers', [])[1:]):
            from shapely.geometry import Polygon
            from shapely.ops import unary_union
            ks = [c for c in l.get('layers', []) if c.get('isVisible', True)]
            geo = None
            for c in ks:
                g = unary_union([Polygon(p).buffer(0) for p in flach(c, mat_mul(m, layer_mat(c))) if len(p) > 2])
                geo = g if geo is None else geo.intersection(g)
            polys = [geo] if geo.geom_type == 'Polygon' else [g for g in getattr(geo, 'geoms', []) if g.geom_type == 'Polygon']
            d = ''.join('M' + 'L'.join('%s %s' % (n(x), n(y)) for x, y in p.exterior.coords[:-1]) + 'Z' for p in polys if not p.is_empty)
            f = self.form(l, d, False)
            return [f] if f else []
        if k in FORM or k == 'shapeGroup':
            d, _ = sammle(l, m)
            f = self.form(l, d, d.count('M') > 1)
            return [f] if f else []
        if k in ('group', 'symbolMaster'):
            out = []
            for c in l.get('layers', []): out += self.zeichne(c, mat_mul(m, layer_mat(c)))
            return out
        if k == 'symbolInstance':
            ms = self.master.get(l['symbolID'])
            if not ms: return []
            fr, mf = l['frame'], ms['frame']
            mm = mat_mul(m, (fr['width'] / mf['width'], 0, 0, fr['height'] / mf['height'], 0, 0))
            out = []
            for c in ms.get('layers', []): out += self.zeichne(c, mat_mul(mm, layer_mat(c)))
            return out
        return []

def main():
    if len(sys.argv) > 3: sys.path.insert(0, sys.argv[3])
    z = zipfile.ZipFile(sys.argv[1])
    doc = json.loads(z.read('document.json'))
    seite = next(p for p in (json.loads(z.read(nm)) for nm in z.namelist() if nm.startswith('pages/')) if p.get('name') == 'Symbols')
    W = Wandler(seite, doc)
    teile = {}
    for sid, ms in W.master.items():
        nm = ms['name']
        if nm.startswith('a person/') or nm.startswith('mask/') or 'With_Mask' in nm or nm in WEG: continue
        W.kasten = None
        f = []
        for c in ms.get('layers', []): f += W.zeichne(c, layer_mat(c))
        key = neuer_name(nm)
        if key in teile and f: key += '-b'
        k = [int(v) for v in (W.kasten or [0, 0, 0, 0])]
        teile[key] = {'b': round(ms['frame']['width']), 'h': round(ms['frame']['height']), 'k': k, 'f': f}
    person = {}
    ART = {'bust': 'brust', 'standing': 'stehen', 'sitting': 'sitzen'}
    ROLLE = {'BODY': 'koerper', 'HEAD': 'kopf', 'FACE': 'gesicht', 'FACIAL HAIR': 'bart', 'ACCESORIES': 'brille'}
    for sid, ms in W.master.items():
        nm = ms['name']
        if not nm.startswith('a person/'): continue
        pl = []
        def lauf(ls, ox, oy):
            for c in ls:
                fr = c['frame']
                if c['_class'] == 'group': lauf(c.get('layers', []), ox + fr['x'], oy + fr['y'])
                elif c['_class'] == 'symbolInstance' and c['name'] in ROLLE:
                    pl.append({'rolle': ROLLE[c['name']], 'x': round(ox + fr['x']), 'y': round(oy + fr['y']), 'b': round(fr['width']), 'h': round(fr['height']), 'standard': neuer_name(W.master[c['symbolID']]['name'])})
        lauf(ms.get('layers', []), 0, 0)
        # Reihenfolge wie im Original: Körper, Kopf, Gesicht, Bart, Brille
        pl.sort(key=lambda p: ['koerper', 'kopf', 'gesicht', 'bart', 'brille'].index(p['rolle']))
        person[ART[nm.split('/')[1]]] = {'b': round(ms['frame']['width']), 'h': round(ms['frame']['height']), 'plaetze': pl}
    json.dump({'quelle': 'Open Peeps von Pablo Stanley (openpeeps.com), CC0', 'teile': teile, 'person': person}, open(sys.argv[2], 'w'), ensure_ascii=False, separators=(',', ':'))
    import collections
    print(len(teile), 'Teile', dict(collections.Counter(k.split('/')[0] for k in teile)))

main()
