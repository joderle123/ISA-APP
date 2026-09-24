# Toolbox (ISA-App) – Offline-Version (zum Doppelklicken)

**`ISA-App.html`** ist die komplette Toolbox in **einer einzigen Datei** – alle
613 Materialien, Suche und Filter, der Material-Finder und der PDF-Export sind
eingebettet (auch die Schriften). Es wird **kein Internet und kein Server**
gebraucht; die Datei stellt keine Netzwerkanfragen.

## So benutzt du sie

1. Die Datei **`ISA-App.html`** herunterladen
   (auf GitHub: Datei öffnen → Button **„Download raw file"**).
2. An einen festen Ort speichern (z. B. `Dokumente/ISA Toolbox/` oder auf das
   Netzlaufwerk neben den CDSE Hub).
3. **Doppelklick** → sie öffnet im Browser und funktioniert sofort, auch offline.
   Die Team-Ablage (gemeinsamer Ordner auf O:\) braucht Microsoft Edge oder Chrome.

## Warum nicht die `index.html` aus dem Projektordner?

Die `index.html` im Hauptordner ist nur die **Quelldatei** für Entwickler – sie
lädt den Programmcode separat nach und zeigt beim direkten Öffnen (`file://`) nur
eine **weiße Seite**. Nimm immer diese gebündelte **`ISA-App.html`**.

## Einbindung in den CDSE Hub

### Deep-Links (URL-Hash)

Der Hub öffnet die Toolbox in seinem `<iframe>` und wählt über den Hash hinter
dem Dateinamen Materialien vor:

| Hash | Wirkung |
| --- | --- |
| `#eldib=V-13` | Materialien zum ELDiB-Ziel V-13. Oben erscheint der entfernbare Filter-Chip „ELDiB-Ziel V-13 Aktivitäten“. |
| `#eldib=K-16,SOZ-32` | Materialien zu **einem der** Ziele (kommagetrennt, beliebig viele). Ein Chip je Ziel. |
| `#material=<id>` | Öffnet die Detailansicht dieses Materials (`id` wie in `toolbox-index.js`). |
| `#eldib=SOZ-32&material=<id>` | Beides: Liste gefiltert, Detail offen, das Ziel ist im Detail markiert. |
| `alter=C3` (optional) | Altersstufe(n) vorwählen, z. B. `#eldib=V-13&alter=C3,C4` (C1–C4, ES). |
| `q=<Text>` (optional) | Suchtext vorbelegen (URL-kodiert), z. B. `#q=Wut`. |

- Codes wie im Hub und im ELDiB-Generator: `V-1…33`, `K-1…35`, `SOZ-1…41`,
  `KOG-1…62`. Groß-/Kleinschreibung, fehlender Bindestrich oder führende Nullen
  werden toleriert (`v13`, `SOZ-05`).
- `eldib`, `alter` und `q` starten eine **neue Auswahl** (andere Filter werden
  zurückgesetzt). `material` allein öffnet nur das Detail und lässt die Filter stehen.
- Die Toolbox reagiert auch auf spätere Änderungen (`hashchange`), z. B.
  `iframe.src = 'ISA-App.html#eldib=KOG-5'` – ohne Neuladen.
- Die Toolbox hält den Hash selbst aktuell (ohne Verlaufseinträge, also ohne
  Einfluss auf den Zurück-Knopf des Hubs): Entfernt jemand den Chip oder schließt
  das Detail, verschwindet `eldib`/`material` aus dem Hash. Derselbe Link vom
  Hub greift dadurch beim nächsten Mal wieder.
- Ein leerer Hash (`#`) setzt die Auswahl zurück. Unbekannte Material-IDs zeigen
  einen Hinweis; zu Zielen ohne Material schlägt die Toolbox benachbarte Ziele vor.

### Materialliste für den Hub: `toolbox-index.js`

`toolbox-index.js` liegt neben `ISA-App.html` und wird beim Bauen automatisch
neu geschrieben. Der Hub lädt sie mit
`<script src="…/toolbox-index.js"></script>` (funktioniert auch über `file://`)
und findet danach:

```js
window.CDSE_TOOLBOX_INDEX = {
  stand: '2026-09-24',            // Datum der Erzeugung
  materialien: [
    {
      id: 'maei-glecks-glas',        // für #material=<id>
      titel: 'Mäi Glécks-Glas',
      typ: ['Projekt'],              // Aktivität · Kursstunde · Projekt · Hospitation
      alter: ['C2', 'C3'],           // C1–C4, ES
      themen: ['Ressourcen', 'Achtsamkeit', 'Emotionen'],
      eldib: ['V-13', 'K-15', 'K-16', 'K-18', 'SOZ-24'],
      kurz: 'Die Kinder sammeln über mehrere Wochen schöne Momente …',  // 1. Satz, max. 160 Zeichen
      ab: 1,                         // optional: hat ein druckbares Arbeitsblatt
      ki: 1,                         // optional: KI-Entwurf – vor dem Einsatz prüfen
    },
    // … alle 613 Materialien
  ],
};
```

Beispiel im Hub: passende Materialien zu den Förderzielen eines Kindes

```js
const ziele = ['V-13', 'SOZ-32']
const passend = window.CDSE_TOOLBOX_INDEX.materialien
  .filter((m) => m.eldib.some((z) => ziele.includes(z)))
// Link: 'ISA-App.html#eldib=' + ziele.join(',') + '&material=' + passend[0].id
```

## Aktualisieren (für Entwickler)

Nach Änderungen am Code/an den Materialien neu bauen und hierher kopieren:

```bash
npm install
npm run build                 # erzeugt dist/index.html UND offline/toolbox-index.js
cp dist/index.html offline/ISA-App.html
```

`npm run index` schreibt nur `offline/toolbox-index.js` neu (ohne App-Build).
Beide Dateien gemeinsam einchecken, damit der Hub zum Stand der App passt.

Zur Dateigröße: Beim Bauen werden die Materiallisten und der PDF-Baustein
komprimiert eingebettet (siehe `vite.config.ts`) – die Datei ist dadurch nur
noch etwa halb so groß und startet schneller; der PDF-Baustein wird erst beim
ersten PDF-Download ausgepackt. `npm run dev` arbeitet unverändert mit den
Quelldateien.
