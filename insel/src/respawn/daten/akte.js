// RESPAWN – Die Akte. Jeder Eintrag hat zwei Seiten: was die Erwachsenen aufschreiben (amt) und was wirklich war (echt).
// Die Spielerin, der Spieler kennt beide. Die Akte bewertet nicht – sie zeigt, wie etwas von außen aussieht.
export const AKTE = {
  'ankunft.kamera': { amt: 'Greift am ersten Tag in die Kamera eines Jungen.', echt: 'Er hat dich gefilmt, ohne zu fragen.' },
  'video.handy': { amt: 'Nimmt einem Jungen das Handy weg.', echt: 'Damit das Video von Pit nicht in die Gruppe geht.' },
  'kontrolle.ohne': { amt: 'Fährt ohne gültiges Ticket.', echt: 'Das Ticket war abgelaufen.' },
  'kontrolle.laut': { amt: 'Wird auf der Fähre laut. Muss aussteigen.', echt: 'Er hat mit dir geredet wie mit einem Hund.' },
  'fuenfziger.verdacht': { amt: 'Am Kiosk fehlen 50 Euro. War an der Kasse.', echt: 'Du hast nichts genommen. Der Schein klemmte hinter der Lade.' },
  'luege.gedeckt': { amt: 'Macht falsche Angaben zu einem Vorfall an der Werft.', echt: (R) => (R.flags['luege.gestanden'] ? 'Du hast einen Freund gedeckt. Später hast du es zugegeben.' : 'Du hast einen Freund gedeckt.') },
  'gespraech.raus': { amt: 'Verlässt das Gespräch vorzeitig.', echt: 'Sie haben über dich geredet, nicht mit dir.' },
  'gespraech.eigen': { amt: 'Nimmt im Gespräch selbst Stellung.', echt: 'Du hast einen Satz gesagt, der gestimmt hat.' },
  'prakt.abbruch': { amt: 'Bricht das Praktikum am ersten Tag ab.', echt: 'Du kamst zu spät. Dann war es dir zu peinlich.' },
  'prakt.gut': { amt: 'Praktikum in der Werft: pünktlich, genau, ausdauernd.', echt: 'Drei Tage schleifen. Du bist geblieben.' },
  'mitfahren.erwischt': { amt: 'Wird nachts an der Werft angetroffen. Es fehlt Treibstoff.', echt: 'Du solltest nur aufpassen. Dann bist du gestolpert.' },
  'mitfahren.gemeldet': { amt: 'Meldet einen Diebstahl an der Werft.', echt: 'Danach wollte die Krater-Crew nichts mehr von dir wissen.' },
  schlag: { amt: 'Schlägt am Steg einen Jungen. Es gibt Videos.', echt: 'Er hat über dein Zuhause geredet.' },
  tasche: { amt: 'Wird nachts mit einer fremden Tasche gesehen.', echt: 'Du hast nicht gefragt, was drin ist.' },
  'fest.gemeldet': { amt: 'Ruft beim Fest Hilfe für einen Jungen.', echt: 'Tun ging es schlecht. Du hast das Fest beendet.' },
};
export const AKTE_LEER = { amt: 'Keine Einträge.', echt: 'Keiner hat etwas über dich geschrieben. Gut? Oder hat keiner hingeschaut?' };
