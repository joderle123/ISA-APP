# Kurzfassung der Einheiten eines Moduls (zum Schreiben der Dossiers).
#   python3 dossiers/kurz.py m5 [zeichen]
import json, sys
m = sys.argv[1]
n = int(sys.argv[2]) if len(sys.argv) > 2 else 330
knapp = len(sys.argv) > 3  # drittes Argument: nur Titel, Spiele, Mission
d = json.load(open(f'src/data/kurs/jahr1-{m}.json'))
for e in d['einheiten']:
    print(f"\n===== E{e['nr']} {e['titel']} =====")
    print('KURZ:', e.get('kurz', ''))
    if not knapp: print('ZIELE:', ' | '.join(e.get('ziele', [])))
    print('BLAETTER:', ', '.join(e.get('blaetter', [])))
    for s in e.get('schritte', []):
        if s.get('phase') == 'pause' or (knapp and s.get('phase') in ('ankommen', 'bruecke', 'abschluss')): continue
        print(f"- [{s.get('phase')} {s.get('dauer')}'] {s['titel']}: {s.get('text', '')[:n]}")
        if s.get('punkte'): print('    PUNKTE:', ' | '.join(x[:150] if knapp else x for x in s['punkte']))
        if s.get('tabelle'):
            tb = s['tabelle']; print('    TAB:', ' / '.join(tb['spalten']), '::', ' || '.join(' / '.join(z) for z in tb['zeilen']))
    print('MISSION:', e.get('mission', ''))
    if knapp:
        print('ACHTUNG:', e.get('achtung', '')[:200]); print('QUELLEN:', ' ; '.join(q[:45] for q in e.get('quellen', []))); continue
    print('ACHTUNG:', e.get('achtung', '')[:260])
    print('HINTERGRUND:', e.get('hintergrund', '')[:420])
    print('QUELLEN:', ' ; '.join(q[:70] for q in e.get('quellen', [])))
