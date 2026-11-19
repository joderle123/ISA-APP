#!/bin/bash
# Freies itch.io-Paket laden (nur kostenlose Pakete, min_price 0): itch.sh SPIEL-URL ZIELORDNER [Filter für den Dateinamen]
# Ablauf wie im Browser: Seite → csrf_token → Liste der Dateien → Datei-Link (CDN) → Download.
set -e
URL="$1"; ZIEL="$2"; FILTER="${3:-}"
mkdir -p "$ZIEL"; cd "$ZIEL"
curl -s -m 30 -c jar.txt -b jar.txt "$URL" -o seite.html
T=$(grep -oE 'name="csrf_token" value="[^"]+"' seite.html | head -1 | sed 's/.*value="//;s/"$//')
curl -s -m 30 -c jar.txt -b jar.txt -X POST --data-urlencode "csrf_token=$T" "$URL/download_url" -o dl.json
DL=$(python3 -I -c "import json;print(json.load(open('dl.json'))['url'])")
curl -s -m 30 -c jar.txt -b jar.txt "$DL" -o dlseite.html
python3 -I - "$FILTER" > uploads.txt <<'PY'
import re, sys, html
s = open('dlseite.html', encoding='utf-8', errors='replace').read()
f = sys.argv[1].lower()
for m in re.finditer(r'data-upload_id="(\d+)".{0,2000}?class="upload_name".{0,400}?<strong[^>]*>([^<]+)</strong>', s, re.S):
    name = html.unescape(m.group(2)).strip()
    if f in name.lower():
        print(m.group(1) + '\t' + name)
PY
cat uploads.txt
T2=$(grep -oE 'name="csrf_token" value="[^"]+"' dlseite.html | head -1 | sed 's/.*value="//;s/"$//')
while IFS=$'\t' read -r ID NAME; do
  curl -s -m 30 -c jar.txt -b jar.txt -X POST --data-urlencode "csrf_token=$T2" "$URL/file/$ID?source=view_game&as_props=1&after_download_lightbox=true" -o file.json
  F=$(python3 -I -c "import json;print(json.load(open('file.json'))['url'])")
  SAFE=$(echo "$NAME" | tr -c 'A-Za-z0-9._-' '_')
  curl -s -m 1200 -L "$F" -o "$SAFE"
  echo "geladen: $SAFE $(du -h "$SAFE" | cut -f1)"
done < uploads.txt
