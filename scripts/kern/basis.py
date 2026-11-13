# Kernkompetenzen-Blätter: kleine Schreibhilfen, damit die Blätter kurz und einheitlich bleiben.
# Ergebnis sind ganz normale Blatt-Objekte (JSON) für src/data/blaetter/kern*.json.
import json

def A(text, stufe=None, sym=None, hinweis=None):
    d = {'art': 'aufgabe', 'text': text}
    if stufe: d['stufe'] = stufe
    if sym: d['symbole'] = sym if isinstance(sym, list) else [sym]
    if hinweis: d['hinweis'] = hinweis
    return d

def P(items, spalten=2, buchstaben=False):
    d = {'art': 'paeckchen', 'items': items, 'spalten': spalten}
    if buchstaben: d['buchstaben'] = True
    return d

def T(spalten, werte=None, zeilen=0, beispiel=None, breiten=None):
    d = {'art': 'tabelle', 'spalten': spalten, 'zeilen': zeilen}
    if werte is not None: d['werte'] = werte
    if beispiel: d['beispiel'] = beispiel
    if breiten: d['breiten'] = breiten
    return d

def I(titel=None, punkte=None, text=None, symbol='merke'):
    d = {'art': 'info', 'symbol': symbol}
    if titel: d['titel'] = titel
    if punkte: d['punkte'] = punkte
    if text: d['text'] = text
    return d

def TX(text, klein=False):
    d = {'art': 'text', 'text': text}
    if klein: d['klein'] = True
    return d

def B(bilder, spalten=3, modus='nur', klein=True):
    return {'art': 'bilder', 'bilder': [{'bild': b, **({'text': t} if t else {})} for b, t in bilder], 'spalten': spalten, 'modus': modus, **({'klein': True} if klein else {})}

def LIN(n, label=None):
    d = {'art': 'linien', 'anzahl': n}
    if label: d['label'] = label
    return d

def Z(links, rechts, titel=None):
    d = {'art': 'zuordnen', 'links': links, 'rechts': rechts}
    if titel: d['titel'] = titel
    return d

def SP(links, rechts, v='1:1'):
    return {'art': 'spalten', 'links': links, 'rechts': rechts, 'verhaeltnis': v}

def FELD(label=None, hoehe=5, zeichnen=True):
    d = {'art': 'feld', 'hoehe': hoehe}
    if label: d['label'] = label
    if zeichnen: d['zeichnen'] = True
    return d

def ABH(items, titel=None):
    d = {'art': 'abhaken', 'items': items}
    if titel: d['titel'] = titel
    return d

def blatt(id, thema, code, titel, unter, bild, bausteine, ziel, ablauf, hinter, loes=None, leichter=None, schwerer=None,
          material=None, tipps=None, dauer='15–20 Min.', schlag=None, sozial=('einzeln', 'gruppe'), stufen=('C2', 'C3')):
    lehrer = {'ziel': ziel, 'ablauf': ablauf, 'hintergrund': hinter}
    if loes: lehrer['loesungen'] = loes
    if leichter or schwerer:
        lehrer['differenzierung'] = {k: v for k, v in (('leichter', leichter), ('schwerer', schwerer)) if v}
    if material: lehrer['material'] = material
    if tipps: lehrer['tipps'] = tipps
    return {'id': id, 'bereich': 'kern', 'thema': thema, 'stufen': list(stufen), 'sozialform': list(sozial), 'dauer': dauer, 'eldib': [],
            'schlagworte': ['Kernkompetenzen', code] + (schlag or []), 'bild': bild,
            'de': {'titel': titel, 'untertitel': code + ' · ' + unter, 'bausteine': bausteine, 'lehrer': lehrer}}

def schreibe(pfad, blaetter):
    ids = [b['id'] for b in blaetter]
    assert len(ids) == len(set(ids)), 'doppelte id'
    with open(pfad, 'w', encoding='utf-8') as f:
        f.write('[\n' + ',\n'.join('  ' + json.dumps(b, ensure_ascii=False) for b in blaetter) + '\n]\n')
    print(len(blaetter), 'Blätter →', pfad)
