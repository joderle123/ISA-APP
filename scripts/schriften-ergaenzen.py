"""Ergänzt die eingebetteten PDF-Schriften um Zeichen, die in den Arbeitsblättern
gebraucht werden, aber in der Latein-Auswahl fehlen:

  U+2190–U+2193  Pfeile ← ↑ → ↓ (in der Strichstärke der Schrift gezeichnet)
  U+202F         schmales geschütztes Leerzeichen (Französisch vor ; ! ?)

Andika trägt unter der SIL Open Font License den reservierten Namen „Andika“.
Eine geänderte Fassung darf ihn nicht führen – deshalb heißt sie hier
„CDSE Kinderschrift“ (Dateien Kinderschrift-*.ttf). Copyright und Lizenz
bleiben erhalten (siehe LIZENZEN.txt).

Aufruf (einmalig, braucht fontTools):  python3 scripts/schriften-ergaenzen.py
Das Skript ist wiederholbar: vorhandene Zeichen werden nicht doppelt angelegt.
"""
import math
import os
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont

ORDNER = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'fonts', 'pdf')
UMBENENNEN = {
    'Andika-Regular.ttf': ('Kinderschrift-Regular.ttf', 'CDSE Kinderschrift', 'Regular'),
    'Andika-Bold.ttf': ('Kinderschrift-Bold.ttf', 'CDSE Kinderschrift', 'Bold'),
}


def flaeche(p):
    return sum(p[i][0] * p[(i + 1) % len(p)][1] - p[(i + 1) % len(p)][0] * p[i][1] for i in range(len(p))) / 2


def im_uhrzeigersinn(p):
    """TrueType füllt Außenkonturen im Uhrzeigersinn (y nach oben)."""
    return p if flaeche(p) < 0 else list(reversed(p))


def pfeil(laenge, t):
    """Pfeil nach rechts: Schaft von x=0 bis zur Spitze bei x=laenge, Mitte y=0.
    Winkel als Striche der Dicke t, Gehrung an der Spitze."""
    s = math.sqrt(0.5)
    h = t / 2
    arm = laenge * 0.42
    spitze = laenge
    R = spitze - h * s              # Außenecke der Arme liegt bei x=R
    C = (R - h * s, 0.0)            # Mittellinie der Arme beginnt hier
    kont = []
    kont.append([(0, -h), (C[0], -h), (C[0], h), (0, h)])      # Schaft
    for sy in (1, -1):              # oberer und unterer Arm
        u = (-s, sy * s)
        n = (s, sy * s)
        E = (C[0] + arm * u[0], C[1] + arm * u[1])
        kont.append([(C[0] + h * n[0], C[1] + h * n[1]), (C[0] - h * n[0], C[1] - h * n[1]),
                     (E[0] - h * n[0], E[1] - h * n[1]), (E[0] + h * n[0], E[1] + h * n[1])])
    kont.append([(R, h * s), (spitze, 0.0), (R, -h * s)])       # spitze Gehrung
    return kont


def glyph_aus(konturen):
    pen = TTGlyphPen(None)
    for k in konturen:
        k = im_uhrzeigersinn([(round(x), round(y)) for x, y in k])
        pen.moveTo(k[0])
        for pt in k[1:]:
            pen.lineTo(pt)
        pen.closePath()
    return pen.glyph()


def ergaenzen(pfad):
    f = TTFont(pfad)
    cmap = f.getBestCmap()
    upm = f['head'].unitsPerEm
    glyf = f['glyf']
    hmtx = f['hmtx']
    strich = glyf[cmap[0x2D]]              # Bindestrich: Strichstärke und Höhe
    t = max(0.06 * upm, min(0.15 * upm, strich.yMax - strich.yMin))
    yc = (strich.yMax + strich.yMin) / 2
    h_glyph = glyf[cmap[0x48]]             # „H“: Versalhöhe
    versal = h_glyph.yMax
    leer = hmtx[cmap[0x20]][0]
    breite = round(0.62 * upm)
    rand = round(0.07 * upm)
    laenge = breite - 2 * rand
    senk_breite = round(0.5 * upm)

    def verschiebe(konturen, fn):
        return [[fn(x, y) for x, y in k] for k in konturen]

    neu = {}
    rechts = pfeil(laenge, t)
    neu[0x2192] = ('arrowright', verschiebe(rechts, lambda x, y: (x + rand, y + yc)), breite)
    neu[0x2190] = ('arrowleft', verschiebe(rechts, lambda x, y: (breite - rand - x, y + yc)), breite)
    hoch = pfeil(versal, t)
    neu[0x2191] = ('arrowup', verschiebe(hoch, lambda x, y: (senk_breite / 2 - y, x)), senk_breite)
    neu[0x2193] = ('arrowdown', verschiebe(hoch, lambda x, y: (senk_breite / 2 + y, versal - x)), senk_breite)
    neu[0x202F] = ('uni202F', [], round(leer * 0.6))

    reihenfolge = list(f.getGlyphOrder())
    angelegt = []
    for cp, (name, konturen, vorschub) in sorted(neu.items()):
        if cp in cmap:
            continue
        g = glyph_aus(konturen)
        glyf.glyphs[name] = g
        reihenfolge.append(name)
        f.setGlyphOrder(reihenfolge)
        glyf.glyphOrder = reihenfolge
        if konturen:
            g.recalcBounds(glyf)
            lsb = g.xMin
        else:
            lsb = 0
        hmtx.metrics[name] = (vorschub, lsb)
        for tab in f['cmap'].tables:
            if tab.isUnicode():
                tab.cmap[cp] = name
        angelegt.append('U+%04X' % cp)
    os2 = f['OS/2']
    os2.usLastCharIndex = min(0xFFFF, max(f.getBestCmap()))
    return f, angelegt


def umbenennen(f, familie, stil):
    name = f['name']
    ps = familie.replace(' ', '') + '-' + stil
    voll = familie if stil == 'Regular' else familie + ' ' + stil
    for rec in list(name.names):
        if rec.nameID in (1, 2, 3, 4, 6, 16, 17):
            name.removeNames(nameID=rec.nameID)
    for pid, eid, lid in ((3, 1, 0x409), (1, 0, 0)):
        name.setName(familie, 1, pid, eid, lid)
        name.setName(stil, 2, pid, eid, lid)
        name.setName('CDSE: ' + ps, 3, pid, eid, lid)
        name.setName(voll, 4, pid, eid, lid)
        name.setName(ps, 6, pid, eid, lid)


def main():
    for datei in sorted(os.listdir(ORDNER)):
        if not datei.endswith('.ttf'):
            continue
        pfad = os.path.join(ORDNER, datei)
        f, angelegt = ergaenzen(pfad)
        ziel = pfad
        if datei in UMBENENNEN:
            neu, familie, stil = UMBENENNEN[datei]
            umbenennen(f, familie, stil)
            ziel = os.path.join(ORDNER, neu)
        f.save(ziel)
        if ziel != pfad:
            os.remove(pfad)
        print(datei, '→', os.path.basename(ziel), 'ergänzt:', ', '.join(angelegt) or '–')


if __name__ == '__main__':
    main()
