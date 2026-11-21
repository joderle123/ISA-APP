// Annexe Junglinster – Muster im Journal (Wochenplan Tag 4: „Journal zeigt Muster“).
// Aus den Entscheidungen in den schwierigen Situationen (sit_…) und den Freundschafts-Bögen (bg_…) wird abgelesen,
// was jemand OFT tut – frühestens ab zwei gleichen Entscheidungen, Hilfe holen schon ab einer.
// Ton: beobachten, nicht bewerten. Kein Punktestand, keine Moral, keine Diagnose. Wer oft mitmacht, bekommt einen
// Satz zum Üben, keinen Vorwurf. Höchstens vier Sätze, die häufigsten zuerst.

const ART = {
  mitgemacht: ['sit_wald:mitgemacht', 'sit_laden:geklaut', 'sit_graffiti:gespruht', 'sit_halle:gefilmt', 'sit_wette:getrunken', 'sit_kiste:geliehen',
    'sit_vape:gezogen', 'sit_link:eingeloggt', 'sit_video:gelacht', 'sit_fest:getrunken', 'sit_zaun:mitgegangen', 'sit_roller:mitgefahren', 'sit_witz:mitgelacht'],
  nein: ['sit_wald:nein', 'sit_laden:gesagt', 'sit_vape:nein', 'sit_fundkiste:gesagt', 'sit_roller:gesagt'],
  gefragt: ['sit_vape:gelesen', 'sit_wette:gelesen', 'sit_link:geprueft', 'sit_kiste:gefragt', 'sit_kiste:erklaert', 'sit_fest:gefragt', 'sit_video:gefragt', 'sit_witz:gefragt'],
  hilfe: ['sit_halle:hilfe', 'sit_zaun:mesenberg', 'sit_fundkiste:kuedes', 'sit_spiel:gezeigt', 'sit_graffiti:kiesser', 'sit_dach:leiter'],
  andere: ['sit_halle:handys', 'sit_witz:geholfen', 'sit_zaun:begleitet', 'sit_fest:mitgenommen', 'sit_graffiti:weggemacht', 'sit_graffiti:reden', 'sit_halle:sami'],
  weg: ['sit_wald:gegangen', 'sit_laden:weiter', 'sit_vape:raus', 'sit_fest:zurueck', 'sit_zaun:zurueck', 'sit_video:weiter', 'sit_witz:weiter', 'sit_graffiti:gegangen', 'sit_halle:zurueck'],
};

const SATZ = {
  mitgemacht: (n) => `Wenn andere drängen, machst du manchmal mit (${n}-mal). Das passiert vielen. Ein Satz zum Üben: „Nee, heute nicht.“`,
  nein: (n) => `Du sagst klar Nein, wenn dir etwas nicht passt (${n}-mal).`,
  gefragt: (n) => `Du fragst nach, bevor du entscheidest (${n}-mal). Wer fragt, fällt seltener rein.`,
  hilfe: (n) => n > 1 ? `Wenn es ernst wird, holst du Hilfe (${n}-mal).` : 'Einmal hast du eine erwachsene Person geholt, als es ernst wurde.',
  andere: (n) => `Du setzt dich für andere ein (${n}-mal).`,
  weg: (n) => `Du gehst lieber weg, als mitzumachen (${n}-mal). Weggehen ist auch eine Entscheidung.`,
  versoehnt: (n) => `Nach einem Streit findest du den Weg zurück (${n}-mal).`,
  zu: (n) => `Nach einem Streit lässt du die Sache manchmal liegen (${n}-mal). Ein „Sorry“ geht auch später noch.`,
};

export function muster(merke = {}) {
  const zahl = {};
  for (const [art, liste] of Object.entries(ART)) zahl[art] = liste.filter((x) => { const [k, v] = x.split(':'); return merke[k] === v; }).length;
  const bg = Object.keys(merke).filter((k) => /^bg_[a-z]+_(gut|zu)$/.test(k) && merke[k]);
  const freunde = new Set(bg.map((k) => k.split('_')[1]));
  zahl.versoehnt = [...freunde].filter((f) => merke['bg_' + f + '_gut']).length;
  zahl.zu = [...freunde].filter((f) => merke['bg_' + f + '_zu'] && !merke['bg_' + f + '_gut']).length;
  const reihe = ['nein', 'gefragt', 'hilfe', 'andere', 'versoehnt', 'weg', 'mitgemacht', 'zu'];   // bei Gleichstand zuerst das Gelungene
  return reihe.map((art) => [art, zahl[art]])
    .filter(([art, n]) => n >= (art === 'hilfe' || art === 'zu' ? 1 : 2))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([art, n]) => ({ art, t: SATZ[art](n) }));
}
