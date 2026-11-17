// Annexe Junglinster – mit Dingen etwas machen (Auftrag 17.11.: „sich setzen … wirklich mit den Dingen interagieren“).
// In der Nähe eines Gegenstands erscheint der Knopf (E / Finger): hinsetzen (jeder Stuhl, jede Bank, Rundbank,
// Sitzstufen, Tribüne), am eigenen Platz oder im Lesesaal ein Arbeitsblatt bearbeiten, Spind, Snackautomat, Brunnen,
// Klavier, Keyboard, Schlagzeug, Bücher, Pinnwand, Gießkanne, Freiwürfe. Kleine Folgen, keine Bewertung.

const BUECHER = [
  ['„Die Welle“', 'Ein Lehrer startet ein Experiment. Es läuft aus dem Ruder.'],
  ['„Wunder“', 'Auggie kommt zum ersten Mal in eine Schule. Alle schauen.'],
  ['„Tschick“', 'Zwei Jungs, ein geklautes Auto, ein Sommer.'],
  ['Atlas Luxemburg', 'Auf Seite 12 hat jemand Junglinster eingekreist.'],
  ['„Rico, Oskar und die Tieferschatten“', 'Rico denkt anders. Und findet trotzdem alles raus.'],
  ['Kochbuch „Schnell und billig“', 'Eselsohr bei: Nudeln mit Tomatensoße.'],
  ['Comic-Band 7', 'Band 6 fehlt. Seit 2019.'],
  ['„Fußball-Regeln für Anfänger“', 'Abseits wird auf Seite 4 erklärt. Ganz ehrlich: dreimal lesen.'],
  ['Lexikon der Tiere', 'Ein Lesezeichen bei „Axolotl“. Die können Beine nachwachsen lassen.'],
  ['„Mut ist, wenn …“', 'Ein dünnes Heft. Jemand hat Sätze unterstrichen.'],
];
const SNACKS = ['Schokoriegel', 'Chips (Paprika)', 'Gummibärchen', 'Kekse', 'Wasser'];

export function createInteraktionen({ welt, steuerung, ui, zustand, sichern, ton, blattWahl, freiwurf, skate, partner = () => null, freund = () => {} }) {
  const tt = welt.orte.tischtennis;
  const liste = [];
  const dazu = (x, z, r, text, tu, extra = {}) => liste.push({ x, z, r, text, tu, ...extra });
  // Sitzen: alle Stühle und Bänke
  for (const s of welt.sitze || []) dazu(s.x, s.z, s.bank ? 0.85 : 0.75, 'Hinsetzen', 'sitzen', { yaw: s.rot });
  // Arbeiten: eigener Platz in Saal 1.04, Lesesaal, CDI
  const platz = welt.orte.meinPlatz;
  if (platz) dazu(platz.x, platz.z, 1.0, 'Arbeitsblatt bearbeiten', 'arbeiten', { prio: 2, sitz: { x: platz.x, z: platz.z, yaw: -Math.PI / 2 } });
  for (const [x, z] of [[9, -64.5], [19, -64.5], [9, -59.5], [19, -59.5]]) dazu(x, z - 1.15, 0.9, 'Hier lernen', 'arbeiten', { prio: 2, sitz: { x, z: z - 1.15, yaw: 0 } });
  // Dinge
  dazu(-7.4, -3.1, 1.3, 'Snack ziehen (50 Cent)', 'automat', { prio: 1 });
  dazu(-8, 18, 2.5, 'Hand ins Wasser', 'brunnen', { prio: 1 });
  dazu(-25.3, -17.2, 1.0, 'Deinen Spind öffnen', 'spind', { prio: 1 });
  dazu(-7.3, -65.6, 1.6, 'Klavier spielen', 'klavier', { prio: 1 });
  dazu(49.3, -60.0, 1.3, 'Keyboard spielen', 'keyboard', { prio: 1 });
  dazu(58, -58.8, 1.4, 'Schlagzeug spielen', 'schlagzeug', { prio: 1 });
  for (let x = 4; x < 28; x += 4) dazu(x, -71.0, 1.2, 'Ein Buch nehmen', 'buch', { prio: 1 });
  for (let z = -70; z < -58; z += 4) dazu(29.0, z, 1.2, 'Ein Buch nehmen', 'buch', { prio: 1 });
  dazu(-6.8, -9, 1.4, 'Pinnwand lesen', 'pinnwand', { prio: 1 });
  dazu(19.4, -44.6, 1.2, 'Pflanzen gießen', 'giessen', { prio: 1 });
  dazu(29, 12.5, 2.2, 'Freiwürfe werfen', 'korb', { prio: 1 });
  dazu(29, 25.5, 2.2, 'Freiwürfe werfen', 'korb', { prio: 1 });
  for (const x of [47.4, 52.6, 57.8]) dazu(x, -43.85, 0.9, 'Am Computer', 'computer', { prio: 1 });
  if (skate) dazu(-29.6, 5.2, 1.5, 'Skateboard fahren', 'skate', { prio: 1 });
  if (tt) dazu(tt.x - 1.3, tt.z, 1.2, 'Tischtennis spielen', 'tischtennis', { prio: 1 });

  function naechste(p) {
    if (steuerung.sitzt) return null;
    let best = null, bd = Infinity;
    for (const i of liste) {
      const d = Math.hypot(i.x - p.x, i.z - p.z);
      if (d > i.r) continue;
      const w = d - (i.prio || 0) * 0.4;   // Dinge mit Vorrang (Arbeitsblatt, Automat) vor dem Stuhl daneben
      if (w < bd) { bd = w; best = i; }
    }
    return best;
  }

  const S = () => zustand();
  async function tu(i) {
    const s = S(); s.merke = s.merke || {};
    switch (i.tu) {
      case 'sitzen': steuerung.setzen(i.x, i.z, i.yaw); return;
      case 'arbeiten': steuerung.setzen(i.sitz.x, i.sitz.z, i.sitz.yaw); await blattWahl(); return;
      case 'automat': {
        s.merke.automat = (s.merke.automat || 0) + 1; sichern();
        if ((s.merke.automat * 7) % 10 < 4) { ton('klack'); ui.toast('<b>Klack.</b><span>Die Münze ist weg. Der Automat brummt zufrieden.</span>'); }
        else { ton('pling'); ui.toast('<b>' + SNACKS[s.merke.automat % SNACKS.length] + '</b><span>Fällt. Gerettet.</span>'); }
        return;
      }
      case 'brunnen': ton('platsch'); ui.toast('<b>Kalt!</b><span>Kurz wach. Jemand hinter dir lacht – nicht über dich, über den Spritzer.</span>'); return;
      case 'spind': if (!s.stundenplan && !(s.frei && s.frei.spind)) { ton('klack'); ui.toast('<b>Spind 117</b><span>Zahlenschloss. Den Code gibt’s im Sekretariat.</span>'); return; }
        ui.toast('<b>Spind 117</b><span>Turnbeutel, Mathebuch, dein Stundenplan mit Kaffeefleck. Und eine sehr alte Banane.</span>'); return;
      case 'klavier': ton('melodie'); ui.toast('<b>Klavier</b><span>Drei Töne. Dann noch drei. Im Saal klingt alles größer.</span>'); return;
      case 'keyboard': ton('melodie2'); ui.toast('<b>Keyboard</b><span>Du findest den Knopf „Demo“. Jetzt spielt es Samba.</span>'); return;
      case 'schlagzeug': ton('trommel'); ui.toast('<b>Bumm-tschak</b><span>Laut. Sehr laut. Es fühlt sich gut an.</span>'); return;
      case 'buch': { s.merke.buecher = (s.merke.buecher || 0) + 1; sichern(); const b = BUECHER[(s.merke.buecher * 3) % BUECHER.length]; await ui.bild(b[0], b[1], 3.2); return; }
      case 'pinnwand': await ui.bild('Pinnwand', 'Theater-AG sucht Leute. · Fundsache: blaue Jacke. · „Wer hat mein Ladekabel?“ · Sportfest am 12. Juni.', 4); return;
      case 'giessen': s.merke.gegossen = (s.merke.gegossen || 0) + 1; sichern(); ui.toast(s.merke.gegossen > 3 ? '<b>Kevin, der Kaktus</b><span>Braucht kein Wasser. Er schaut dich vorwurfsvoll an.</span>' : '<b>Gegossen</b><span>Die Tomaten danken. Glaubst du.</span>'); return;
      case 'korb': { const t = await freiwurf(); s.merke.korbRekord = Math.max(s.merke.korbRekord || 0, t); sichern(); ui.toast('<b>' + t + ' von 5</b><span>Dein Rekord: ' + s.merke.korbRekord + ' von 5.</span>'); return; }
      case 'skate': {
        const p = await skate(); s.merke.skateRekord = Math.max(s.merke.skateRekord || 0, p); sichern();
        ui.toast('<b>' + p + (p === 1 ? ' Punkt' : ' Punkte') + '</b><span>' + (p && p >= s.merke.skateRekord ? 'Neuer Rekord!' : 'Dein Rekord: ' + s.merke.skateRekord + ' Punkte.') + '</span>');
        return;
      }
      case 'tischtennis': {
        const pa = partner();   // spielt mit dir: am liebsten dein bester Freund / deine beste Freundin
        const b = await ui.tischtennis({ gegner: pa ? pa.name : '' }); s.merke.ttRekord = Math.max(s.merke.ttRekord || 0, b);
        if (pa) freund(pa.id, 4, 'spiel');
        sichern();
        ui.toast('<b>' + b + ' Ballwechsel</b><span>' + (b && b >= s.merke.ttRekord ? 'Dein bester bisher!' : 'Dein Rekord: ' + s.merke.ttRekord + '.') + '</span>');
        return;
      }
      case 'computer': ui.toast('<b>Anmelden</b><span>Passwort vergessen. Das Passwort für „Passwort vergessen“ auch.</span>'); return;
    }
  }
  return { liste, naechste, tu };
}
