/* CREW-Hub – Anbindung der CREW-Spiele an die CDSE-Klassebücher (Galileo / Unified).
   QUELLE: integration/src/crew-hub.src.js → tools/hub-gen.js baut daraus integration/crew-hub.js
   (Katalog aus docs/spielekatalog.json, Liste der gebauten Spiele aus src/games/**, QR-Kern aus src/core/qr.js).
   Die fertige Datei integration/crew-hub.js NICHT von Hand ändern.

   Ohne Abhängigkeiten, läuft als <script> (window.CREWHub) oder als CommonJS-Modul (require).
   Alles rechnet im Browser. Es wird NICHTS gesendet: Notizen bleiben im Klassebuch, nach außen gehen nur
   Themen-Stichwörter und Spiel-IDs. Keine Namen in Links.

   API:
     CREWHub.katalog                        Themen, Formate, Spiele (mit gebaut: true/false), Einheiten, ELDiB-Kurznamen
     CREWHub.suggest(opts)                  → Vorschläge [{id, name, grund, …}], sortiert
        opts: { eldib: ['SOZ-32', …], themen: ['wut', …], einheit: 'j1-e04', format: 'zu-zweit',
                max: 3, nurGebaut: true, ohne: ['probelauf'], code: '1234', basis: 'https://…/index.html' }
     CREWHub.themenAusNotizen(text, opts)   → Themen-Tags, nur lokal per Stichwortliste (de/lb/fr); { details: true } → mit Trefferzahl
     CREWHub.qrSvg(url, {size})             → SVG-Markup eines QR-Codes
     CREWHub.spielUrl(id, {rolle, code, platz, basis})  → Deep-Link ohne Personendaten
     CREWHub.tagescode(datumISO)            → 4-stelliger Tagescode wie in CREW (aus dem Datum)
     CREWHub.eldibName(code)                → Kurzname eines ELDiB-Codes
     CREWHub.themenListe()                  → alle bekannten Themen-Tags [{id, name, vorsicht}]
     CREWHub.renderKarte(el, opts)          → fertige Karte (Personal- oder Jugend-Ansicht) in ein Element zeichnen
*/
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.CREWHub = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  /* ---------- Katalog (generiert) ---------- */
  const KATALOG = /*__KATALOG__*/null;

  /* ---------- QR-Code (generiert aus src/core/qr.js, qrcode-generator von Kazuhiko Arase, MIT) ---------- */
  /*__QR__*/

  /* ---------- ELDiB-Kurznamen (für den Grund-Text der Lehrkraft) ---------- */
  const ELDIB = {
    'K-10': 'Gefühle erkennen und benennen',
    'K-16': 'Gefühle begründen, Warnsignale erkennen',
    'K-19': 'Selbstbild und Fremdbild',
    'K-20': 'Stärken wahrnehmen, Rückmeldung geben',
    'K-21': 'Bedürfnisse und Gefühle verstehen',
    'K-23': 'Selbstregulation, sicherer Ort',
    'K-26': 'Zuhören, nachfragen, kooperieren',
    'K-28': 'Rückmeldung annehmen, Selbstwert',
    'K-29': 'Zusammenarbeit, Vielfalt, Vertrauen',
    'K-31': 'Ich-Botschaften, Grenzen ansprechen',
    'K-32': 'Regeln, Mitbestimmung, Verbindlichkeit',
    'KOG-38': 'Ziele zerlegen, planen, Tatsache vs. Urteil',
    'KOG-58': 'Medien durchschauen, Selbstwert ohne Vergleich',
    'SOZ-18': 'Kooperation ohne Worte',
    'SOZ-26': 'Hilfsmittel anwenden, Kritik annehmen',
    'SOZ-31': 'Interesse zeigen, Nachfragen',
    'SOZ-32': 'Regeln und Sicherheit in der Gruppe',
    'SOZ-33': 'Rückmeldung geben, Einwände formulieren',
    'SOZ-34': 'Konflikte lösen, Verantwortung übernehmen',
    'SOZ-37': 'Vertrauen und Grenzen in Beziehungen',
    'SOZ-39': 'Eigene und fremde Grenzen achten',
    'V-20': 'Wut früh bremsen',
    'V-21': 'Warnsignale erkennen, Anspannung einschätzen',
    'V-22': 'Stopp-Recht nutzen',
    'V-24': 'Sinnes-Skills anwenden',
    'V-25': 'Kleine Schritte planen und umsetzen',
    'V-26': 'Konflikte ohne Eskalation austragen',
    'V-27': 'Ampelplan, Alltag und Anspannung',
  };
  const eldibName = (code) => ELDIB[String(code || '').toUpperCase()] || code;

  /* ---------- Themen-Tags mit Stichwortlisten (Deutsch, Lëtzebuergesch, Français) ----------
     Die Listen suchen nur lokal im Text. vorsicht = Thema nur mit Hilfe-Hinweis im Spiel. */
  const THEMEN = [
    { id: 'wut', name: 'Wut & Ausraster', woerter: ['wut', 'wütend', 'ausraster', 'ausgerastet', 'explodiert', 'aggress', 'schreit', 'geschrien', 'tobt', 'rastet', 'rout', 'rosen', 'rosend', 'colère', 'énervé', 'enervé', 'agressi', 'crise'] },
    { id: 'streit', name: 'Streit & Konflikt', woerter: ['streit', 'konflikt', 'zoff', 'auseinandersetzung', 'beleidig', 'provoz', 'prügel', 'geschlagen', 'schlägerei', 'sträit', 'streiden', 'dispute', 'conflit', 'bagarre', 'insult', 'provoc'] },
    { id: 'angst', name: 'Angst & Sorgen', woerter: ['angst', 'ängstlich', 'panik', 'sorge', 'nervös', 'unsicher', 'traut sich nicht', 'fäert', 'angscht', 'peur', 'anxie', 'anxié'] },
    { id: 'mobbing', name: 'Mobbing', woerter: ['mobbing', 'gemobbt', 'mobbt', 'cybermobbing', 'harcèlement', 'harcel', 'bedroht', 'drohung', 'erpress', 'gehänselt', 'hänsel', 'bully'] },
    { id: 'ausgrenzung', name: 'Ausgrenzung', woerter: ['ausgrenz', 'ausgeschlossen', 'allein gelassen', 'einsam', 'außenseiter', 'aussenseiter', 'niemand spielt', 'keine freunde', 'ignoriert', 'zurückgezogen', 'zieht sich zurück', 'eleng', 'exclu', 'exclusion', 'isolé', 'rejet'] },
    { id: 'gruppendruck', name: 'Gruppendruck', woerter: ['gruppendruck', 'druck von', 'mitgemacht', 'mitläufer', 'überredet', 'angestiftet', 'mutprobe', 'clique', 'pression', 'influenc'] },
    { id: 'digital', name: 'Handy & Social Media', woerter: ['handy', 'smartphone', 'tiktok', 'insta', 'snap', 'whatsapp', 'social media', 'soziale medien', 'online', 'chat', 'gaming', 'zockt', 'zocken', 'fortnite', 'screenshot', 'gepostet', 'posten', 'portable', 'réseaux', 'reseaux', 'écran', 'ecran', 'telefon'] },
    { id: 'schlaf', name: 'Schlaf & Energie', woerter: ['schlaf', 'müde', 'muede', 'übermüdet', 'eingeschlafen', 'nachts wach', 'midd', 'schléift', 'sommeil', 'fatigué', 'fatigue', 'dort pas'] },
    { id: 'stress', name: 'Stress & Anspannung', woerter: ['stress', 'anspannung', 'angespannt', 'überfordert', 'ueberfordert', 'unruhig', 'zappelig', 'nervös', 'gereizt', 'tension', 'tendu', 'débordé', 'deborde', 'nervos'] },
    { id: 'selbstwert', name: 'Selbstwert', woerter: ['selbstwert', 'selbstbewusst', 'traut sich', 'kann nichts', 'kann das nicht', 'kann das eh', 'schaff das nicht', 'bin dumm', 'bin blöd', 'minderwertig', 'vergleicht sich', 'schämt', 'scham', 'wertlos', 'estime', 'confiance en', 'nul'] },
    { id: 'trauer', name: 'Trauer & Verlust', woerter: ['trauer', 'trauert', 'gestorben', 'verstorben', 'tod ', 'todesfall', 'verlust', 'verloren', 'beerdigung', 'gestuerwen', 'gestuerf', 'deuil', 'décès', 'deces', 'mort '], vorsicht: true },
    { id: 'familie', name: 'Familie', woerter: ['familie', 'eltern', 'mutter', 'mama', 'vater', 'papa', 'zuhause', 'zu hause', 'scheidung', 'getrennt', 'stiefvater', 'stiefmutter', 'geschwister', 'bruder', 'schwester', 'foyer', 'heim', 'famill', 'doheem', 'elteren', 'parents', 'mère', 'père', 'maison', 'divorce'], vorsicht: true },
    { id: 'grenzen', name: 'Grenzen & Nein sagen', woerter: ['grenze', 'grenzen', 'nein sagen', 'kann nicht nein', 'zu nah', 'abstand', 'distanz', 'übergriff', 'anfassen', 'respektlos', 'limite', 'dire non', 'trop proche'] },
    { id: 'freundschaft', name: 'Freundschaft', woerter: ['freund', 'freundin', 'freundschaft', 'beste freund', 'clique', 'kumpel', 'frënd', 'frëndin', 'kolleg', 'ami ', 'amie', 'amitié', 'copain', 'copine'] },
    { id: 'regeln', name: 'Regeln & Absprachen', woerter: ['regel', 'regeln', 'absprache', 'vereinbarung', 'verspätet', 'zu spät', 'unpünktlich', 'hält sich nicht', 'konsequenz', 'reegel', 'règle', 'regle', 'retard', 'consigne'] },
    { id: 'motivation', name: 'Motivation & Aufschieben', woerter: ['motivation', 'unmotiviert', 'keine lust', 'aufschieb', 'prokrastin', 'hausaufgaben nicht', 'gibt auf', 'aufgegeben', 'null bock', 'keng loscht', 'motivé', 'motive', 'procrastin', 'abandonne'] },
    { id: 'gefuehle', name: 'Gefühle zeigen & verstehen', woerter: ['gefühl', 'gefuehl', 'gefühle', 'traurig', 'weint', 'geweint', 'frustriert', 'enttäuscht', 'enttaeuscht', 'gefill', 'kräischt', 'émotion', 'emotion', 'triste', 'pleure', 'déçu', 'decu'] },
    { id: 'kommunikation', name: 'Kommunikation & Zuhören', woerter: ['zuhör', 'zuhoer', 'unterbricht', 'redet dazwischen', 'missverständnis', 'missverstaendnis', 'ich-botschaft', 'vorwurf', 'nachfragen', 'nolauschter', 'écoute', 'ecoute', 'interrompt', 'malentendu'] },
    { id: 'koerper', name: 'Körper & Bewegung', woerter: ['bewegung', 'sport', 'bewegt sich', 'sitzt nur', 'körper', 'koerper', 'essen', 'ernährung', 'ernaehrung', 'kierper', 'bougé', 'bouge', 'activité physique'] },
    { id: 'entschuldigung', name: 'Entschuldigung & Wiedergutmachung', woerter: ['entschuldig', 'wiedergutmach', 'rechtfertig', 'ausrede', 'schuld', 'verantwortung', 'entschëllegt', 'excuse', 'pardon', 'responsab'] },
  ];
  const THEMEN_BY_ID = {};
  THEMEN.forEach((t) => { THEMEN_BY_ID[t.id] = t; });

  /* Welches Thema passt zu welchem Katalog-Thema (Ordner) besonders gut? Bonus beim Vorschlag. */
  const THEMA_ZU_KATALOG = {
    wut: ['skills', 'gefuehle'], streit: ['konflikt', 'kommunikation'], angst: ['gefuehle', 'skills'],
    mobbing: ['konflikt'], ausgrenzung: ['konflikt', 'ankommen'], gruppendruck: ['konflikt'],
    digital: ['digital'], schlaf: ['digital', 'skills'], stress: ['skills'], selbstwert: ['ich', 'gedanken'],
    trauer: ['gefuehle'], familie: ['kommunikation'], grenzen: ['kommunikation'], freundschaft: ['ankommen', 'kommunikation'],
    regeln: ['ankommen'], motivation: ['digital', 'ich'], gefuehle: ['gefuehle'], kommunikation: ['kommunikation'],
    koerper: ['skills', 'digital'], entschuldigung: ['konflikt'],
  };
  /* Handverlesene Treffer: Thema → Spiele, die genau dazu gebaut sind (zusätzlich zur Stichwortsuche im Katalogtext). */
  const THEMA_SPIELE = {
    wut: ['fruehwarn', 'kipp-punkt', 'gelb-rot', 'pegel-reihe', 'blackout', 'hitzeecken', 'pult-tausch'],
    streit: ['storystaffel', 'sorrywerkstatt', 'leiter-lauf', 'uebersetzer', 'funkstille', 'hitzeecken', 'gerecht-oder-gleich'],
    angst: ['fruehwarn', 'mein-ort', 'sinnesjagd', 'innen-aussen', 'gefuehls-funk'],
    mobbing: ['vier-zeugen', 'wer-fehlt', 'druck-chat', 'geruecht-staffel', 'hundert-prozent', 'red-flag'],
    ausgrenzung: ['wer-fehlt', 'echter-freund', 'erster-eindruck', 'vier-zeugen', 'stummer-aufbau'],
    gruppendruck: ['druck-chat', 'nein-trainer', 'dealoderkein', 'hundert-prozent', 'leiter-lauf'],
    digital: ['trick-erkannt', 'teilen-oder-nicht', 'geruecht-staffel', 'red-flag', 'akku-woche', 'druck-chat', 'vergleichs-falle'],
    schlaf: ['akku-woche', 'spaeter-monster', 'tank-detektiv'],
    stress: ['pegel-reihe', 'innen-aussen', 'undercover', 'sinnesjagd', 'gelb-rot', 'skill-sprechstunde', 'ampel-woche', 'mein-ort', 'blackout'],
    selbstwert: ['vergleichs-falle', 'zwei-brillen', 'staerke-einsatz', 'staerken-spion', 'satz-werkstatt', 'beweis-jaeger', 'woher-satz', 'haltungs-switch'],
    trauer: ['gefuehls-funk', 'mixer', 'mein-ort'],
    familie: ['familienfunk', 'funkstille', 'dahinter'],
    grenzen: ['okayradar', 'naeher-nicht', 'stoppcheck', 'nein-trainer', 'frag-weiter', 'probelauf'],
    freundschaft: ['echter-freund', 'erster-eindruck', 'frag-weiter', 'wer-fehlt', 'sorrywerkstatt'],
    regeln: ['regel-radar', 'probelauf', 'crew-rat', 'pilot-navigator'],
    motivation: ['spaeter-monster', 'kleiner-schritt', 'akku-woche', 'jahres-quest'],
    gefuehle: ['gefuehls-funk', 'pult-tausch', 'fruehwarn', 'mixer', 'dahinter', 'innen-aussen'],
    kommunikation: ['uebersetzer', 'stillepost', 'zuhoerfalle', 'frag-weiter', 'funkstille', 'pilot-navigator'],
    koerper: ['akku-woche', 'sinnesjagd', 'undercover', 'tank-detektiv'],
    entschuldigung: ['sorrywerkstatt', 'storystaffel', 'leiter-lauf'],
  };

  const norm = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ');

  /* themenAusNotizen(text, {details}) → ['wut', 'streit', …] nach Trefferzahl; nur lokale Stichwortsuche. */
  function themenAusNotizen(text, opts) {
    const o = opts || {};
    const t = ' ' + norm(text) + ' ';
    if (!t.trim()) return [];
    const hits = [];
    THEMEN.forEach((th) => {
      let n = 0;
      const gefunden = [];
      th.woerter.forEach((w) => {
        let i = t.indexOf(w);
        while (i >= 0) { n++; if (gefunden.indexOf(w) < 0) gefunden.push(w); i = t.indexOf(w, i + w.length); }
      });
      if (n) hits.push({ id: th.id, name: th.name, treffer: n, woerter: gefunden, vorsicht: !!th.vorsicht });
    });
    hits.sort((a, b) => b.treffer - a.treffer || a.id.localeCompare(b.id));
    const max = o.max || 5;
    const top = hits.slice(0, max);
    return o.details ? top : top.map((x) => x.id);
  }
  const themenListe = () => THEMEN.map((t) => ({ id: t.id, name: t.name, vorsicht: !!t.vorsicht }));

  /* ---------- Tagescode & Deep-Link (identisch zu CREW: src/core/seed.js, src/core/games.js) ---------- */
  function fnv() {
    let hsh = 2166136261;
    const s = Array.prototype.slice.call(arguments).join('|');
    for (let i = 0; i < s.length; i++) { hsh ^= s.charCodeAt(i); hsh = Math.imul(hsh, 16777619); }
    return hsh >>> 0;
  }
  const todayISO = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const tagescode = (iso) => String(1000 + (fnv('crew-tagescode', iso || todayISO()) % 9000));
  const DEFAULT_BASE = 'https://joderle123.github.io/ISA-APP/crew/dist/index.html';
  // spielUrl('frag-weiter', {rolle:'A', code:'1234', platz:3, basis:'…/index.html'}) – keine Personendaten im Link
  function spielUrl(id, o) {
    const oo = o || {};
    if (!/^[a-z0-9-]{1,40}$/.test(String(id || ''))) throw new Error('spielUrl: ungültige Spiel-ID');
    const p = [];
    p.push('spiel=' + id);
    p.push('code=' + (/^\d{4}$/.test(String(oo.code || '')) ? oo.code : tagescode()));
    if (oo.rolle && /^[A-DX]$/i.test(oo.rolle)) p.push('rolle=' + String(oo.rolle).toUpperCase());
    if (oo.platz && /^[1-8]$/.test(String(oo.platz))) p.push('platz=' + oo.platz);
    return (oo.basis || DEFAULT_BASE) + '?' + p.join('&');
  }
  const qrSvg = (url, o) => qrSvgRaw(url, o);

  /* ---------- Vorschläge ---------- */
  function spielText(k) { return norm(k.name + ' ' + k.text + ' ' + k.foerdert); }
  const THEMEN_TEXT_CACHE = {};
  function themenEinesSpiels(k) {
    if (THEMEN_TEXT_CACHE[k.id]) return THEMEN_TEXT_CACHE[k.id];
    const t = ' ' + spielText(k) + ' ';
    const out = {};
    THEMEN.forEach((th) => {
      let n = 0;
      th.woerter.forEach((w) => { if (w.length >= 5 && t.indexOf(w) >= 0) n++; });
      if ((THEMA_SPIELE[th.id] || []).indexOf(k.id) >= 0) n += 3;
      if (n) out[th.id] = n;
    });
    THEMEN_TEXT_CACHE[k.id] = out;
    return out;
  }

  /* suggest({eldib, themen, einheit, format, max, nurGebaut, ohne, code, basis}) → [{id, name, grund, …}] */
  function suggest(opts) {
    const o = opts || {};
    const K = KATALOG;
    const eldib = (o.eldib || []).map((c) => String(c).toUpperCase());
    const themen = (o.themen || []).map((t) => String(t).toLowerCase()).filter((t) => THEMEN_BY_ID[t]);
    const einheit = o.einheit || '';
    const unit = einheit ? K.einheiten.find((e) => e.id === einheit) : null;
    const nurGebaut = o.nurGebaut !== false;
    const ohne = o.ohne || [];
    const max = o.max || 3;
    const out = [];
    Object.keys(K.spiele).forEach((id) => {
      const k = K.spiele[id];
      if (ohne.indexOf(id) >= 0) return;
      if (nurGebaut && !k.gebaut) return;
      if (o.format && k.format !== o.format) return;
      if (o.thema && k.thema !== o.thema) return;
      let score = 0;
      const gruende = [];
      // 1) ELDiB-Ziele (Wochenziel / Förderplan): jeder Treffer zählt
      const eldHits = k.eldib.filter((c) => eldib.indexOf(c) >= 0);
      if (eldHits.length) { score += eldHits.length * 10; gruende.push('ELDiB ' + eldHits.map((c) => c + ' (' + eldibName(c) + ')').join(', ')); }
      // 2) Themen aus den Notizen
      const st = themenEinesSpiels(k);
      const thHits = themen.filter((t) => st[t]);
      thHits.forEach((t) => { score += 4 + Math.min(st[t], 5); });
      themen.forEach((t) => { if ((THEMA_ZU_KATALOG[t] || []).indexOf(k.thema) >= 0) score += 2; });
      if (thHits.length) gruende.push('Thema ' + thHits.map((t) => THEMEN_BY_ID[t].name).join(', '));
      // 3) Einheit des Kurses (Abschlussspiel der Stunde)
      if (unit) {
        if (unit.spiel === id) { score += 25; gruende.push('Abschlussspiel der Einheit ' + unit.id + ' „' + unit.titel + '“'); }
        else if (k.einheiten.indexOf(unit.id) >= 0) { score += 8; gruende.push('passt zur Einheit ' + unit.id); }
        else {
          const u = K.spiele[unit.spiel];
          if (u && !u.gebaut && u.thema === k.thema) {
            // Katalogspiel der Einheit noch nicht gebaut → Ersatz aus demselben Thema, gleiche ELDiB-Codes zählen
            const same = k.eldib.filter((c) => u.eldib.indexOf(c) >= 0).length;
            score += 3 + same * 2;
            gruende.push('Ersatz für „' + u.name + '“ (noch nicht gebaut), gleiches Thema' + (same ? ', gleiche ELDiB-Codes' : ''));
          } else if (u && u.thema === k.thema) score += 3;
        }
      }
      // 4) kleine Zusätze (nur als Zünglein an der Waage): Favorit, Abschluss-tauglich. Ohne echten Treffer kein Vorschlag.
      if (score <= 0) return;
      if (k.top) score += 1.5;
      if (k.abschluss) score += 0.5;
      const themaName = (K.themen.find((t) => t.id === k.thema) || {}).name || k.thema;
      out.push({
        id, name: k.name, thema: k.thema, themaName, format: k.format, formatName: k.formatName, dauer: k.dauer,
        gebaut: !!k.gebaut, top: !!k.top, eldib: k.eldib.slice(), score: Math.round(score * 10) / 10,
        gruende, grund: gruende.join(' · ') || 'passt zum Thema', foerdert: k.foerdert, text: k.text,
        url: spielUrl(id, { code: o.code, basis: o.basis }),
      });
    });
    out.sort((a, b) => b.score - a.score || (b.top - a.top) || a.name.localeCompare(b.name));
    return out.slice(0, max);
  }

  /* ---------- Karte zeichnen (optional, ohne Abhängigkeiten) ----------
     renderKarte(el, { titel, vorschlaege, modus: 'personal' | 'jugend', code, basis, qrSize })
     personal: Spiel + Grund (nur für die Lehrkraft) + Link; jugend: Spiel + QR, KEIN Grund, keine Tags. */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function renderKarte(el, opts) {
    const o = opts || {};
    const modus = o.modus === 'jugend' ? 'jugend' : 'personal';
    const list = o.vorschlaege || [];
    const code = o.code || tagescode();
    const items = list.map((v) => {
      const url = spielUrl(v.id, { code, basis: o.basis });
      const qr = qrSvg(url, { size: o.qrSize || 96 });
      return '<li class="crewhub-item" data-spiel="' + esc(v.id) + '">' +
        '<div class="crewhub-qr">' + qr + '</div>' +
        '<div class="crewhub-body"><b class="crewhub-name">' + esc(v.name) + '</b>' +
        '<span class="crewhub-meta">' + esc(v.themaName || v.thema) + ' · ' + esc(v.formatName || v.format) + ' · ' + esc(v.dauer || '') + '</span>' +
        (modus === 'personal' ? '<span class="crewhub-grund" title="nur für das Personal sichtbar">' + esc(v.grund) + '</span>' : '') +
        '<a class="crewhub-link" href="' + esc(url) + '" target="_blank" rel="noopener">Spiel öffnen</a>' +
        '</div></li>';
    }).join('');
    el.innerHTML = '<section class="crewhub-karte" data-modus="' + modus + '">' +
      '<header class="crewhub-head"><span class="crewhub-logo">CREW</span><b>' + esc(o.titel || 'CREW-Spiele für diese Woche') + '</b>' +
      '<span class="crewhub-code">Tagescode ' + esc(code) + '</span></header>' +
      (list.length ? '<ul class="crewhub-list">' + items + '</ul>' : '<p class="crewhub-leer">Noch kein Vorschlag. Wochenziel oder Einheit wählen.</p>') +
      (modus === 'personal' ? '<p class="crewhub-fuss">Grund und Themen sieht nur das Personal. Die Jugendlichen sehen nur Spiel und QR-Code. Links enthalten keine Namen.</p>' : '') +
      '</section>';
    return el;
  }

  return {
    version: KATALOG.stand, katalog: KATALOG, eldib: ELDIB, eldibName,
    themen: THEMEN, themenListe, themenAusNotizen,
    suggest, spielUrl, qrSvg, tagescode, renderKarte, DEFAULT_BASE,
  };
});
