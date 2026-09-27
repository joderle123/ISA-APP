// Glimms Zeilen (WP33): der Lichtsalamander ist anfangs zynisch und wird von den Levels widerlegt. Jede Zeile ≤ 6 Wörter.
// Stimme (docs/STORY.md §7): zynisch, oft daneben, belehrt nie, verrät nie die Lösung.
// Pools je Anlass; das Puls-Plugin zieht per Zufall (nie dieselbe Zeile zweimal hintereinander). Stumm = keine Zeile.
export default {
  id: 'glimm',
  name: 'Glimm',
  zone: {
    gruen: ['Grün. Langweilig. Gut so.', 'Alles ruhig. Zufrieden?', 'Grün. Das war dein Zug.'],
    gelb: ['Gelb. Wird eng.', 'Gelb. Noch geht was.', 'Merkst du das? Gelb.'],
    rot: ['Rot. Erst runter, dann reden.', 'Rot. Da hört keiner zu.', 'Rot. Windschatten wäre gut.'],
  },
  fail: ['Nochmal. Kostet nur Sekunden.', 'Passiert. Weiter.', 'Zählt nicht. Nochmal.'],
  antiSpiral: ['Da drüben. Windstille.', 'Windschatten. Kurz stehen bleiben.'],
  shelter: ['Windschatten. Endlich.', 'Hier ist es still.'],
  gadget: {
    ok: ['Zahl runter. Hab ich gesehen.', 'Hm. Hat gewirkt.', 'Okay. Das zählt.'],
    verpufft: ['Zählen bei Rot? Puff.', 'Puff. Kopf geht bei Rot nicht.', 'Erst Körper. Dann Kopf.'],
    cooldown: ['Noch nicht wieder.', 'Kurz warten.'],
    leer: ['Koffer leer. Koffer-Stein.', 'Nichts im Fach. Umbauen.'],
    sprint: ['Rennen hilft. Wer hätte das gedacht.', 'Fünf Sekunden voll. Dann schau.'],
    tandem: ['Im Takt. Beide runter.', 'Gleichschritt. Nicht hetzen.'],
  },
  hilfe: ['Geholt. Hätte ich nie gemacht.', 'Jemand kommt. Ungewohnt, was?', 'Nicht allein. Seltsam gut.'],
  sichererOrt: ['Dein Ort. Nur deiner.', 'Hier bleibt der Sturm draußen.', 'Puls zehn. Sagte ich doch.'],
  haengematte: ['Hängematte. Kurz nichts tun.', 'Schaukeln. Zählt auch.'],
  tester: ['Vorher, nachher. Zahlen lügen nicht.', 'Das wirkt bei dir. Merken.'],
  blick: ['Farben. Nutzlos. Angeblich.', 'Ein Wort mehr. Sammelst du?', 'Fäden. Die kennen sich.', 'Grau. Schon wieder. Natürlich.'],
  stopp: {
    licht: ['Ein Licht. Stehen bleiben.', 'Noch eins. Nicht lächeln.'],
    voll: ['Vier Lichter. Das war Stopp.', 'Stopp. Klar wie Glas.'],
    schwach: ['Bewegt. Licht weg.', 'Lächeln schwächt. Ernst bleiben.'],
  },
  crew: ['Crew-Ruf. Jemand kommt.', 'Zeig, wo. Dann kommen sie.', 'Allein? Muss nicht.'],
  gate: ['Zu. Braucht die Kraft da oben.', 'Symbol lesen. Kommt noch.', 'Später. Mit der richtigen Kraft.'],
  kaelte: ['Eingefroren. Sturm steht.', 'Kalt. Still. Geht durch.'],
  klang: ['Ton trägt. Solange er klingt.', 'Lauf, solange es klingt.'],
  zyniker: ['Gefühle? Nutzlos. Angeblich.', 'Regeln. Gähn. Okay, die war gut.', 'Ich war nie grau. Fast nie.', 'Die Insel schweigt. Ich meistens auch.'],
};
