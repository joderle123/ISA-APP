#!/usr/bin/env python3
# Hördateien für die Modulhefte: liest tmp/hefte/<id>/spuren.json (von heft.tsx), spricht jeden Text mit Piper-Stimmen
# und legt MP3s in h/a/<code>.mp3 ab (h/ = Abspiel-Seite für die QR-Codes, über GitHub Pages erreichbar).
# Danach hört eine Spracherkennung (faster-whisper) jede Datei ab und meldet Stellen, die schlecht verständlich sind.
#
# Aufruf (mit der Python-Umgebung, in der piper-tts und faster-whisper installiert sind):
#   HF_HUB_DISABLE_XET=1 /home/user/tts/venv/bin/python tools/hefte/audio.py deutsch-m1 [--nur de1-01h] [--ohne-pruefung]
# Stimmen (Piper, frei): Ordner TTS_STIMMEN (Standard /home/user/tts/stimmen). Lizenzen stehen im Anhang jedes Hefts.
import sys, os, json, re, wave, subprocess, tempfile
import numpy as np
from piper import PiperVoice, SynthesisConfig

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
STIMMEN = os.environ.get('TTS_STIMMEN', '/home/user/tts/stimmen')
RATE = 22050

# Stimmen je Sprache: w = Frauenstimme, m = Männerstimme. (modell, sprecher-id, länge, tonhöhe) – länge > 1 = langsamer,
# tonhöhe > 1 = höher (für eine weitere, jüngere Stimme aus derselben Stimme; das Tempo bleibt gleich).
BELEGUNG = {
    'de': {'w1': ('de_DE-kerstin-medium', None, 1.12, 1), 'm1': ('de_DE-thorsten-high', None, 1.08, 1), 'm2': ('de_DE-karlsson-low', None, 1.06, 1),
           'w2': ('de_DE-eva_k-x_low', None, 1.08, 1), 'm3': ('de_DE-karlsson-low', None, 1.04, 1.12), 'w3': ('de_DE-kerstin-medium', None, 1.08, 1.07),
           'erz': ('de_DE-kerstin-medium', None, 1.14, 1)},
    'fr': {'w1': ('fr_FR-siwis-medium', None, 1.12, 1), 'm1': ('fr_FR-upmc-medium', 1, 1.1, 1), 'w2': ('fr_FR-upmc-medium', 0, 1.1, 1),
           'm2': ('fr_FR-mls-medium', None, 1.08, 1), 'm3': ('fr_FR-upmc-medium', 1, 1.06, 1.12), 'w3': ('fr_FR-siwis-medium', None, 1.06, 1.07),
           'erz': ('fr_FR-siwis-medium', None, 1.14, 1)},
}
# Wörter, die die Stimmen sonst falsch lesen (gilt für alle Hefte einer Sprache; je Heft ergänzbar über MODUL.aussprache)
AUSSPRACHE = {
    'de': {r'\b7P(\d)\b': r'sieben P \1', r'\b(\d{1,2}):(\d\d)\b': r'\1 Uhr \2', r'\bz\. ?B\.': 'zum Beispiel', r'\bLarochette\b': 'Laroschett', r'\bEttelbrück\b': 'Ettelbrück', r'–': ','},
    'fr': {r'\b7P(\d)\b': r'septième P \1', r'–': ','},
}

_cache = {}
def stimme(modell):
    if modell not in _cache:
        _cache[modell] = PiperVoice.load(os.path.join(STIMMEN, modell + '.onnx'))
    return _cache[modell]

def sprechbar(text, sprache, extra):
    for a, b in {**AUSSPRACHE.get(sprache, {}), **(extra or {})}.items():
        text = re.sub(a, b, text)
    text = re.sub('[\U0001F000-\U0001FAFF\u2600-\u27BF\uFE0F]', '', text)   # Emojis nicht vorlesen
    return re.sub(r'\s+', ' ', text.replace('…', '.')).strip()

def hoeher(a, faktor):
    """Tonhöhe ändern, Tempo behalten (ffmpeg: asetrate + atempo)"""
    if faktor == 1: return a
    r = subprocess.run(['ffmpeg', '-loglevel', 'error', '-f', 's16le', '-ar', str(RATE), '-ac', '1', '-i', 'pipe:0', '-af',
                        f'asetrate={int(RATE * faktor)},aresample={RATE},atempo={1 / faktor:.4f}', '-f', 's16le', '-ac', '1', 'pipe:1'],
                       input=a.tobytes(), capture_output=True, check=True)
    return np.frombuffer(r.stdout, dtype=np.int16)

# ---- Spracherkennung als Ohr: jeder Satz wird bis zu VERSUCHE-mal gesprochen, die deutlichste Fassung bleibt.
VERSUCHE = int(os.environ.get('TTS_VERSUCHE', '3'))
_asr = None
def ohr():
    global _asr
    if _asr is None:
        from faster_whisper import WhisperModel
        _asr = WhisperModel('small', device='cpu', compute_type='int8', download_root=os.environ.get('WHISPER_DIR', '/home/user/tts/whisper'))
    return _asr

def woerter(s, sprache):
    from num2words import num2words
    s = re.sub(r'\d+', lambda m: ' ' + num2words(int(m.group()), lang=sprache) + ' ', s.lower())
    s = s.replace('-', ' ').replace('’', "'")
    return re.sub(r"[^a-zäöüßàâçéèêëîïôûùüÿœ' ]", ' ', s).split()

def treffer(soll, gehoert, sprache):
    a, b = woerter(soll, sprache), set(woerter(gehoert, sprache))
    return sum(1 for w in a if w in b) / max(1, len(a))

def hoere(a, sprache):
    x = a.astype(np.float32) / 32768
    x16 = np.interp(np.linspace(0, len(x), int(len(x) * 16000 / RATE), endpoint=False), np.arange(len(x)), x).astype(np.float32)
    seg, _ = ohr().transcribe(x16, language=sprache, beam_size=5)
    return ' '.join(t.text for t in seg)

def saetze(text):
    return [t for t in re.split(r'(?<=[.!?…])\s+', text.strip()) if t]

STATISTIK = {'saetze': 0, 'wiederholt': 0, 'schwach': []}
def sprich(text, sprache, rolle, extra, pruefen=True):
    modell, sp, laenge, hoch = BELEGUNG[sprache].get(rolle) or BELEGUNG[sprache]['erz']
    v = stimme(modell)
    cfg = SynthesisConfig(speaker_id=sp, length_scale=laenge, noise_scale=0.6, noise_w_scale=0.75)
    teile = []
    for satz in saetze(sprechbar(text, sprache, extra)):
        bestes, beste_q = None, -1
        kurz = len(woerter(satz, sprache)) < 4   # sehr kurze Sätze erkennt die Spracherkennung schlecht – nicht wiederholen
        for versuch in range(VERSUCHE if (pruefen and not kurz) else 1):
            st = []
            for c in v.synthesize(satz, syn_config=cfg):
                a = c.audio_int16_array
                if c.sample_rate != RATE:   # Stimmen mit 16 kHz auf 22,05 kHz bringen
                    a = np.interp(np.linspace(0, len(a), int(len(a) * RATE / c.sample_rate), endpoint=False), np.arange(len(a)), a).astype(np.int16)
                st.append(a)
            a = hoeher(np.concatenate(st), hoch) if st else np.zeros(1, dtype=np.int16)
            q = treffer(satz, hoere(a, sprache), sprache) if (pruefen and not kurz) else 1
            if q > beste_q: bestes, beste_q = a, q
            if q >= 0.85: break
            if versuch == 0: STATISTIK['wiederholt'] += 1
        STATISTIK['saetze'] += 1
        if beste_q < 0.75: STATISTIK['schwach'].append((round(beste_q, 2), satz))
        teile.append(bestes); teile.append(np.zeros(int(RATE * 0.28), dtype=np.int16))
    return np.concatenate(teile) if teile else np.zeros(1, dtype=np.int16)

def pause(sek):
    return np.zeros(int(RATE * sek), dtype=np.int16)

def lautstaerke(a, ziel=0.22):
    x = a.astype(np.float32); r = np.sqrt((x ** 2).mean()) / 32768 or 1e-6
    return np.clip(x * (ziel / r), -32000, 32000).astype(np.int16)

def baue_spur(sp, sprache, extra, pruefen=True):
    stuecke = [pause(0.5)]
    if sp['art'] == 'lesen':
        for i, t in enumerate(sp['teile']):
            rolle = t.get('wer') or sp.get('stimme') or 'erz'
            stuecke += [sprich(t['text'], sprache, rolle, extra, pruefen), pause(0.9 if i == 0 else 0.7)]
    else:
        rollen = sp.get('sprecher') or {}
        vorher = None
        for t in sp['teile']:
            rolle = rollen.get(t['wer'], 'erz')
            stuecke += [pause(0.25 if rolle == vorher else 0.5), sprich(t['text'], sprache, rolle, extra, pruefen)]
            vorher = rolle
    stuecke.append(pause(0.8))
    # leiser Ton am Anfang (Signal: jetzt geht es los)
    t = np.arange(int(RATE * 0.35)) / RATE
    gong = (np.sin(2 * np.pi * 660 * t) * np.exp(-t * 9) * 6000).astype(np.int16)
    return np.concatenate([gong] + [lautstaerke(np.concatenate(stuecke))])

def speichern(a, ziel):
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        tmp = f.name
    with wave.open(tmp, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(a.tobytes())
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-ac', '1', '-ar', '22050', '-b:a', '40k', ziel], check=True)
    os.unlink(tmp)

def pruefen(dateien, sprache):
    asr = ohr()
    norm = lambda s: woerter(s, sprache)
    bericht = []
    for code, text, datei in dateien:
        seg, _ = asr.transcribe(datei, language=sprache, beam_size=5)
        gehoert = ' '.join(s.text for s in seg)
        soll, ist = norm(text), set(norm(gehoert))
        fehlt = [w for w in soll if w not in ist]
        quote = 1 - len(fehlt) / max(1, len(soll))
        bericht.append({'code': code, 'verstanden': round(quote, 3), 'fehlt': fehlt[:25], 'gehoert': gehoert.strip()})
        print(f"  {code}: {round(quote * 100)} % verstanden" + (f" – fehlt: {', '.join(fehlt[:12])}" if fehlt else ''))
    return bericht

def main():
    args = sys.argv[1:]
    hid = [a for a in args if not a.startswith('--')][0]
    nur = args[args.index('--nur') + 1].split(',') if '--nur' in args else None
    daten = json.load(open(os.path.join(ROOT, 'tmp/hefte', hid, 'spuren.json')))
    sprache, extra = daten['sprache'], daten.get('aussprache') or {}
    ziel = os.path.join(ROOT, 'h', 'a'); os.makedirs(ziel, exist_ok=True)
    os.makedirs(os.path.join(ROOT, 'h', 'spuren'), exist_ok=True)
    fertig = []
    for sp in daten['spuren']:
        if nur and sp['code'] not in nur:
            continue
        datei = os.path.join(ziel, sp['code'] + '.mp3')
        speichern(baue_spur(sp, sprache, extra, '--ohne-pruefung' not in args), datei)
        dauer = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', datei], capture_output=True, text=True).stdout or 0)
        sp['dauer'] = round(dauer, 1)
        print(f"✓ {sp['code']}.mp3  {round(dauer)} s  {os.path.getsize(datei) // 1024} KB")
        fertig.append((sp['code'], ' '.join(t['text'] for t in sp['teile']), datei))
    # Liste für die Abspiel-Seite: Titel und Text je Code (der Text erscheint dort erst auf Knopfdruck)
    liste = {'modul': daten['modul'], 'titel': daten['titel'], 'sprache': sprache, 'spuren': {
        sp['code']: {'titel': sp['titel'], 'art': sp['art'], 'lektion': sp['lektion'], 'dauer': sp.get('dauer'),
                     'text': [[('' if sp['art'] == 'lesen' else t['wer']), t['text']] for t in sp['teile']]} for sp in daten['spuren']}}
    alt = os.path.join(ROOT, 'h', 'spuren', daten['modul'] + '.json')
    if nur and os.path.exists(alt):   # Dauer der nicht neu gebauten Spuren behalten
        for c, v in json.load(open(alt))['spuren'].items():
            if c in liste['spuren'] and not liste['spuren'][c].get('dauer'): liste['spuren'][c]['dauer'] = v.get('dauer')
    json.dump(liste, open(alt, 'w'), ensure_ascii=False, indent=1)
    ix_datei = os.path.join(ROOT, 'h', 'spuren', 'index.json')
    ix = json.load(open(ix_datei)) if os.path.exists(ix_datei) else {'module': []}
    if daten['modul'] not in ix['module']: ix['module'] = sorted(ix['module'] + [daten['modul']])
    json.dump(ix, open(ix_datei, 'w'), ensure_ascii=False, indent=1)
    print(f"Sätze: {STATISTIK['saetze']} · neu gesprochen: {STATISTIK['wiederholt']} · weiter undeutlich: {len(STATISTIK['schwach'])}")
    for q, satz in STATISTIK['schwach']: print(f"  ⚠ {int(q * 100)} %: {satz}")
    if '--ohne-pruefung' not in args:
        print('Prüfung der ganzen Dateien:')
        bericht = pruefen(fertig, sprache)
        json.dump(bericht, open(os.path.join(ROOT, 'tmp/hefte', hid, 'audio-pruefung.json'), 'w'), ensure_ascii=False, indent=1)

if __name__ == '__main__':
    main()
