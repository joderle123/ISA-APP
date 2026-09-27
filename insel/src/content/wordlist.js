// Wortliste für Codes (WP30, DESIGN §10): genau 256 Wörter, Großschrift, ohne Umlaute und ß, Thema Natur & Meer.
// Aufgaben: (1) Wort-Vorschläge bei der Code-Eingabe (Präfix-Suche – die Liste verrät keine Codes, weil alle
// 39 Code-Wörter der Einheiten darin zwischen 200 anderen Wörtern stehen), (2) Ersatzcodes WORT-WORT-ZZ aus dem
// gesalzenen FNV-Hash (systems/codes/model.js hashCode). Reihenfolge ist Teil des Codes – nie umsortieren!
export default {
  id: 'wordlist',
  words: [
    // Code-Wörter der 39 Einheiten (kurs-j1.js) und Bausteine der Sonder-Codes
    'BOJE', 'DELFIN', 'OTTER', 'QUELLE', 'BRISE', 'EICHE', 'FUCHS', 'KRAKE', 'MOOS', 'LAGUNE',
    'WELLE', 'ROBBE', 'KIESEL', 'BUCHT', 'GIPFEL', 'SEGEL', 'WURZEL', 'LUCHS', 'KNOSPE', 'ORCA',
    'EULE', 'STRAND', 'IGEL', 'BIBER', 'ANKER', 'ADLER', 'INSEL', 'PERLE', 'BAMBUS', 'MEER',
    'KRABBE', 'LACHS', 'FALKE', 'WALD', 'PFAU', 'GEYSIR', 'NEST', 'LINDE', 'LOTUS',
    'HERZGLAS', 'LEUCHTFEUER', 'KOMPASS', 'RUHEWETTER', 'FESTWETTER', 'FRUEHLINGSWETTER',
    // Meer und Kueste
    'HAFEN', 'STEG', 'BOOT', 'RUDER', 'MAST', 'KIEL', 'NETZ', 'HAI', 'WAL', 'QUALLE',
    'SEESTERN', 'MUSCHEL', 'KORALLE', 'RIFF', 'EBBE', 'FLUT', 'GISCHT', 'DUENE', 'SAND', 'KLIPPE',
    'FELSNADEL', 'GROTTE', 'HOEHLE', 'TANG', 'ALGE', 'PLANKTON', 'SCHWAMM', 'TINTENFISCH', 'SEEPFERD', 'HUMMER',
    'GARNELE', 'FORELLE', 'ROCHEN', 'TAUCHER', 'SCHNORCHEL', 'FLOSSE', 'LEUCHTTURM',
    'MOEWE', 'ALBATROS', 'PELIKAN', 'PINGUIN', 'SEEHUND', 'WALROSS', 'STRUDEL', 'SURFBRETT',
    // Wetter und Himmel
    'SONNE', 'MOND', 'STERN', 'WOLKE', 'REGEN', 'NEBEL', 'STURM', 'BLITZ', 'DONNER', 'WIND',
    'BOE', 'HAGEL', 'SCHNEE', 'FROST', 'TAU', 'HITZE', 'SCHATTEN', 'LICHT', 'FUNKE', 'GLUT',
    'MORGEN', 'ABEND', 'NACHT', 'DAEMMERUNG', 'HORIZONT', 'REGENBOGEN', 'AUFWIND',
    // Wald, Berg und Wiese
    'BAUM', 'AST', 'BLATT', 'RINDE', 'ZAPFEN', 'FARN', 'PILZ', 'BEERE', 'BLUETE', 'KLEE',
    'HEIDE', 'SCHILF', 'BIRKE', 'BUCHE', 'TANNE', 'FICHTE', 'AHORN', 'WEIDE',
    'LICHTUNG', 'PFAD', 'BRUECKE', 'HUEGEL', 'BERG', 'TAL', 'FELS', 'STEIN', 'KRISTALL', 'VULKAN',
    'LAVA', 'ASCHE', 'KRATER', 'SCHLUCHT', 'WASSERFALL', 'BACH', 'FLUSS', 'TEICH', 'SEE', 'MOOR',
    'SUMPF', 'TORF', 'WIESE', 'GARTEN', 'HECKE', 'BRUNNEN', 'WINDRAD',
    // Tiere
    'DACHS', 'HIRSCH', 'REH', 'WOLF', 'BAER', 'HASE', 'MAUS', 'MARDER', 'WIESEL', 'EICHHORN',
    'MAULWURF', 'FROSCH', 'KROETE', 'MOLCH', 'LIBELLE', 'BIENE', 'HUMMEL', 'KAEFER', 'AMEISE', 'GRILLE',
    'SPINNE', 'SCHNECKE', 'RAUPE', 'FALTER', 'MOTTE', 'GLUEHWURM', 'SPECHT', 'AMSEL', 'DROSSEL', 'MEISE',
    'FINK', 'ZAUNKOENIG', 'RABE', 'KRAEHE', 'ELSTER', 'HABICHT', 'BUSSARD', 'KRANICH', 'STORCH',
    'REIHER', 'SCHWAN', 'ENTE', 'GANS', 'TAUBE', 'KUCKUCK', 'SCHWALBE', 'LERCHE', 'SPATZ',
    // Dinge auf der Insel
    'LATERNE', 'FACKEL', 'FEUER', 'FLAMME', 'RAUCH', 'GLOCKE', 'TROMMEL', 'FLOETE', 'HORN',
    'HARFE', 'SAITE', 'LIED', 'ECHO', 'KLANG', 'STILLE', 'SEIL', 'KNOTEN', 'LEITER', 'TREPPE',
    'TURM', 'TOR', 'ZELT', 'HUETTE', 'BAUMHAUS', 'KISTE', 'TRUHE', 'SCHLUESSEL', 'KARTE', 'FLASCHE',
    'FEDER', 'FLAGGE', 'WIMPEL', 'DRACHEN', 'RUNE', 'SPLITTER', 'GLIMMER', 'SCHIMMER', 'FLACKERN',
    'GEZEITEN', 'STROEMUNG', 'TIEFE', 'WEITE', 'KANTE', 'SPALT', 'HOEHE', 'FERNE',
  ],
};
