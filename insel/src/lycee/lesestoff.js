// Annexe Junglinster – Lese-Ecke im CDI (Open World, Auftrag 18.11.: „in die Biblio lesen“).
// Kurze Comics und Geschichten, alle selbst erfunden. Man blättert Seite für Seite (Tippen, Wischen, E, Pfeiltasten).
// Gelesenes wird gemerkt (✓), nichts wird abgefragt, nichts bewertet. Lesen füllt den Tank „Sicherheit“.

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Comic-Seite: { bild: 'Emoji-Bühne', ort, blasen: [[wer, text]], unten }   Geschichte: { text }
export const HEFTE = [
  { id: 'gerd', titel: 'Gerd, die Taube', von: 'Comic von Lina, 7P2', farbe: '#9b7bc8', art: 'comic', seiten: [
    { ort: 'Schulhof, 10:05', bild: '🕊️🕊️🕊️ · · · 🕊️', blasen: [['Erzähler', 'Das ist Gerd. Gerd steht immer ein bisschen daneben.']] },
    { ort: 'Schulhof, 10:06', bild: '🕊️🕊️🕊️  🧢🕊️', blasen: [['Gerd', 'Ich hab jetzt eine Mütze. Vielleicht hilft das.'], ['Die anderen', 'Gurr.']] },
    { ort: 'Schulhof, 10:07', bild: '🕊️🕊️🕊️      🧢🕊️💧', blasen: [['Gerd', 'Hat nicht geholfen.']] },
    { ort: 'Unter der Bank', bild: '🧢🕊️ 🥖', blasen: [['Gerd', 'Ein ganzes Brötchen. Für mich allein.'], ['Gerd', '…']] },
    { ort: 'Schulhof, 10:09', bild: '🕊️🕊️🕊️🥖🧢🕊️', blasen: [['Gerd', 'Will wer?'], ['Die anderen', 'GURR!!']] },
    { ort: 'Schulhof, 10:10', bild: '🕊️🧢🕊️🕊️🕊️', blasen: [['Erzähler', 'Gerd steht jetzt in der Mitte. Wegen dem Brötchen. Und ein bisschen wegen Gerd.']], unten: 'ENDE. (Gerd behält die Mütze.)' },
  ] },
  { id: 'kevin', titel: 'Kevin, der Kaktus', von: 'Comic von Lina, 7P2', farbe: '#3fa66b', art: 'comic', seiten: [
    { ort: 'Fensterbank, Saal 1.04', bild: '🌵😎', blasen: [['Kevin', 'Ich bin Kevin. Ich mag Menschen. Sehr.']] },
    { ort: 'Fensterbank', bild: '🌵🤗   🧍‍♂️', blasen: [['Kevin', 'Umarmung?'], ['Ben', 'Äh. Nein danke. Du bist … stachelig.']] },
    { ort: 'Fensterbank', bild: '🌵😢', blasen: [['Kevin', 'Keiner will mich umarmen.']] },
    { ort: 'Fensterbank', bild: '🌵  🧤✋', blasen: [['Mila', 'Umarmung nein. High five mit Handschuh: ja.'], ['Kevin', 'Das geht?']] },
    { ort: 'Fensterbank', bild: '🌵✨🧤', blasen: [['Kevin', 'Abstand ist nicht „ich mag dich nicht“.'], ['Mila', 'Genau. Abstand ist „so passt es“.']], unten: 'ENDE. Kevin hat jetzt drei Handschuh-Freunde.' },
  ] },
  { id: 'bus', titel: 'Der Bus', von: 'Comic von Chiara, 7P2', farbe: '#e9734a', art: 'comic', seiten: [
    { ort: 'Haltestelle, 7:31', bild: '🚌💨      🏃', blasen: [['Erzähler', 'Montag. Der Bus fährt weg.']] },
    { ort: 'Haltestelle, 7:31', bild: '🚌💨      🏃', blasen: [['Erzähler', 'Dienstag. Der Bus fährt weg.']] },
    { ort: 'Haltestelle, 7:31', bild: '🚌💨      🏃💦', blasen: [['Erzähler', 'Mittwoch. Er fährt weg. Natürlich.']] },
    { ort: 'Haltestelle, 7:31', bild: '🚌   🏃', blasen: [['Busfahrer', 'Ich warte. Aber nur heute.'], ['Erzähler', 'Donnerstag.']] },
    { ort: 'Im Bus', bild: '🚌🙂', blasen: [['Erzähler', 'Manchmal wartet die Welt. Selten. Aber manchmal.']], unten: 'Freitag fuhr er wieder weg.' },
  ] },
  { id: 'nuggets', titel: 'Ben gegen 40 Nuggets', von: 'Comic von Yusuf, 7P2', farbe: '#d9a21b', art: 'comic', seiten: [
    { ort: 'Kantine', bild: '🍗×40   😤', blasen: [['Ben', 'Heute. Heute schaff ich es.']] },
    { ort: 'Kantine, 12:14', bild: '🍗×31   😋', blasen: [['Ben', 'Neun. Ich fühle nichts.']] },
    { ort: 'Kantine, 12:19', bild: '🍗×12   😐', blasen: [['Ben', 'Achtundzwanzig. Ich fühle … alles.']] },
    { ort: 'Kantine, 12:23', bild: '🍗×12   🫠', blasen: [['Ben', 'Wer will Nuggets? Gratis. Mit Liebe.'], ['Jo', 'Digga, du hast gesagt, das ist dein Talent.']] },
    { ort: 'Kantine, 12:25', bild: '🍗 😋😋😋😋 🫠', blasen: [['Ben', 'Mein Talent ist teilen. Hab ich gerade gemerkt.']], unten: 'ENDE. Rekord: 28. Er sagt 40.' },
  ] },
  { id: 'pause', titel: 'Die Pause, in der nichts passierte', von: 'Kurzgeschichte · Schreibwerkstatt der Annexe', farbe: '#3f78b8', art: 'geschichte', seiten: [
    { text: 'Es war die große Pause. Auf der Bank am Hof saß ein Junge mit einem Buch. Das Buch war zu.' },
    { text: 'Ein Mädchen kam vorbei. Sie hatte keinen Plan. Sie hatte nur ein Brötchen und keine Lust, allein zu stehen.' },
    { text: 'Sie setzte sich ans andere Ende der Bank. Er sagte nichts. Sie sagte nichts. Eine Taube landete.' },
    { text: '„Die hat eine Mütze“, sagte er irgendwann. „Das ist Gerd“, sagte sie. Mehr wurde nicht gesagt.' },
    { text: 'Am nächsten Tag saß sie wieder da. Ein Stück näher. Das Buch war offen.' },
    { text: 'In dieser Pause passierte nichts. Das war das Beste daran.' },
  ] },
  { id: 'zehn', titel: 'Zehn Sekunden', von: 'Kurzgeschichte · Schreibwerkstatt der Annexe', farbe: '#8a7bc8', art: 'geschichte', seiten: [
    { text: 'Vor der Klasse stehen. Zehn Sekunden. Mehr nicht. Mein Herz klopfte, als wäre es eine Stunde.' },
    { text: 'Meine Knie waren Pudding. Meine Hände waren nass. Mein Kopf sagte: Lauf weg. Der Wachhund bellte.' },
    { text: 'Ich hab nicht weggehört. Ich hab zu ihm gesagt: Danke. Ich weiß. Es ist wichtig. Jetzt sei kurz still.' },
    { text: 'Dann hab ich angefangen. Eins. Zwei. Bei fünf war es leichter. Bei acht hat jemand gelächelt.' },
    { text: 'Bei zehn war es vorbei. Der Wachhund hat sich hingelegt. Ich mich auch. Auf meinen Stuhl.' },
    { text: 'Nachher hab ich Ben gesagt: Mein Herz war eine Stunde lang. Er hat gesagt: „Meins zwei.“' },
  ] },
];

// Lese-Ecke: Auswahl der Hefte, dann Blättern. → Promise<{ gelesen: [ids], neu: id|null }>
export function leseEcke(ui, gelesen = []) {
  return new Promise((ok) => {
    let neu = null, taste = null;
    const k = ui.ebeneAuf('spiel', '<div class="le"><h2>📚 Lese-Ecke</h2><p class="ly-leer">Kurze Comics und Geschichten. Aus der Klasse und aus der Schreibwerkstatt.</p><div class="le-box"></div></div>');
    const box = k.querySelector('.le-box');
    const weg = () => { if (taste) document.removeEventListener('keydown', taste, true); taste = null; };
    const zu = () => { weg(); ui.ebeneZu(); ok({ gelesen, neu }); };
    const regal = () => {
      weg();
      box.innerHTML = '<div class="le-regal ly-d-optionen">' + HEFTE.map((h, i) => '<button type="button" data-h="' + i + '" style="--f:' + h.farbe + '"><b>' + esc(h.titel) + (gelesen.includes(h.id) ? ' ✓' : '') + '</b><small>' + esc(h.von) + ' · ' + h.seiten.length + ' Seiten</small></button>').join('') + '</div>' +
        '<button type="button" class="ly-btn le-zu" data-a="weg">Zurück ins CDI</button>';
      box.querySelectorAll('[data-h]').forEach((b) => { b.onclick = () => lies(HEFTE[+b.dataset.h]); });
      box.querySelector('[data-a="weg"]').onclick = zu;
      taste = (e) => { if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); zu(); } else if (e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); lies(HEFTE.find((h) => !gelesen.includes(h.id)) || HEFTE[0]); } };
      document.addEventListener('keydown', taste, true);
    };
    const lies = (h) => {
      weg(); let n = 0;
      const seite = () => {
        const s = h.seiten[n], letzte = n === h.seiten.length - 1;
        box.innerHTML = '<div class="le-heft" style="--f:' + h.farbe + '"><div class="le-kopf"><b>' + esc(h.titel) + '</b><span>' + (n + 1) + ' / ' + h.seiten.length + ' <button type="button" class="le-x" data-a="regal">✕ Regal</button></span></div>' +
          (h.art === 'comic'
            ? '<div class="le-panel"><small>' + esc(s.ort || '') + '</small><div class="le-bild">' + esc(s.bild) + '</div>' + (s.blasen || []).map(([w, t]) => '<div class="le-blase' + (w === 'Erzähler' ? ' erz' : '') + '">' + (w === 'Erzähler' ? '' : '<b>' + esc(w) + '</b>') + esc(t) + '</div>').join('') + '</div>' + (s.unten ? '<p class="le-unten">' + esc(s.unten) + '</p>' : '')
            : '<div class="le-text">' + esc(s.text) + '</div>') +
          '<div class="le-nav">' + (n ? '<button type="button" class="ly-btn" data-a="z">← Zurück</button>' : '<span></span>') +
          '<button type="button" class="ly-btn ly-primaer" data-a="w">' + (letzte ? 'Fertig ✓' : 'Weiter →') + ' <kbd>E</kbd></button></div></div>';
        const vor = () => { if (letzte) { if (!gelesen.includes(h.id)) { gelesen = gelesen.concat(h.id); neu = neu || h.id; } regal(); } else { n++; seite(); } };
        const zur = () => { if (n) { n--; seite(); } };
        box.querySelector('[data-a="w"]').onclick = vor;
        const z = box.querySelector('[data-a="z"]'); if (z) z.onclick = zur;
        box.querySelector('[data-a="regal"]').onclick = () => regal();
        const heft = box.querySelector('.le-heft'); let x0 = null;
        heft.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
        heft.addEventListener('pointerup', (e) => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (dx < -60) vor(); else if (dx > 60) zur(); });
        weg();
        taste = (e) => {
          if (['KeyE', 'Enter', 'ArrowRight', 'Space'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); vor(); }
          else if (e.code === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); zur(); }
          else if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); regal(); }
        };
        document.addEventListener('keydown', taste, true);
      };
      seite();
    };
    regal();
  });
}
