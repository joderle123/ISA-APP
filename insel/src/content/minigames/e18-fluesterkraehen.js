// Flüsterkrähen-Duell (DESIGN §12 M4): Krähen bringen Urteile, du konterst mit Fakten – schnell.
export default {
  id: 'e18-fluesterkraehen', template: 'duell', title: 'Flüsterkrähen', icon: 'motte', color: '#b48cff',
  intro: 'Die Krähe flüstert. Tipp schnell die Karte, die stimmt.',
  modes: { entspannt: { rounds: 5, seconds: 6 }, abenteuer: { rounds: 8, seconds: 4 }, profi: { rounds: 10, seconds: 2.8 } },
  medals: { bronze: { hits: 0.5 }, silber: { hits: 0.8 }, gold: { hits: 0.95 }, stern: { hits: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  rounds: [
    { say: 'Alle haben über dich gelacht.', options: [{ t: 'Zwei haben gelacht. Über das Video.', ok: true }, { t: 'Stimmt. Alle.' }, { t: 'Ich bin peinlich.' }] },
    { say: 'Niemand will mit dir reden.', options: [{ t: 'Pit hat mich heute gefragt.', ok: true }, { t: 'Stimmt wohl.' }, { t: 'Alle hassen mich.' }] },
    { say: 'Du schaffst das nie.', options: [{ t: 'Gestern hab ich es fast geschafft.', ok: true }, { t: 'Ich schaff nichts.' }, { t: 'Nie im Leben.' }] },
    { say: 'Sie hat dich absichtlich übersehen.', options: [{ t: 'Sie hatte Kopfhörer auf.', ok: true }, { t: 'Klar, absichtlich.' }, { t: 'Sie mag mich nicht.' }] },
    { say: 'Du bist der Einzige, der das nicht kann.', options: [{ t: 'Drei aus der Gruppe üben noch.', ok: true }, { t: 'Nur ich.' }, { t: 'Ich bin dumm.' }] },
    { say: 'Der Lehrer findet dich blöd.', options: [{ t: 'Er hat mein Bild gelobt.', ok: true }, { t: 'Bestimmt.' }, { t: 'Alle Lehrer.' }] },
    { say: 'Alle reden über dich.', options: [{ t: 'Zwei haben über Fußball geredet.', ok: true }, { t: 'Über mich. Immer.' }, { t: 'Ich wusste es.' }] },
    { say: 'Du bist schuld, dass es regnet.', options: [{ t: 'Wetter. Kein Mensch macht Regen.', ok: true }, { t: 'Ja, ich.' }, { t: 'Wahrscheinlich schon.' }] },
    { say: 'Du hast nie etwas geschafft.', options: [{ t: 'Ich hab die Laterne geschafft.', ok: true }, { t: 'Nie.' }, { t: 'Stimmt genau.' }] },
    { say: 'Keiner sitzt freiwillig neben dir.', options: [{ t: 'Jolie saß heute neben mir.', ok: true }, { t: 'Freiwillig nie.' }, { t: 'Zum Glück nicht.' }] },
  ],
};
