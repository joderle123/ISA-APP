    /* ---- Eigene Erzeuger der Hefte (23.11.2026): Lektionen, für die das Klassenbuch keinen Erzeuger hat ----
       Wird von mathe-gen-bau.py in den GEN-Block eingefügt (ri, pick, de, grp, fr, termStr und R() sind dort da). */
    // Stellenwert: nur Zahlen, in denen die gefragte Ziffer einmal vorkommt (sonst ist die Frage nicht eindeutig)
    var stellenwertRoh = T.stellenwert;
    T.stellenwert = function (sp, lvl) { var e; for (var i = 0; i < 60; i++) { e = stellenwertRoh(sp, lvl); var m = /Ziffer (\d) in der Zahl ([\d.]+)/.exec(e.a); if (!m || m[2].split(m[1]).length === 2) return e; } return e; };

    // Teilbarkeit: etwa die Hälfte der Zahlen ist teilbar (sonst fast immer „Nein“)
    var teilbarRoh = T.teilbar;
    T.teilbar = function (sp, lvl) { var e, ja = R() < 0.5; for (var i = 0; i < 200; i++) { e = teilbarRoh(sp, lvl); if (ja === /^Ja/.test(e.l)) return e; } return e; };
    // Temperatur: keine Aufgabe ohne Änderung („+0 °C“)
    var tempRoh = T.tempAenderung;
    T.tempAenderung = function (sp, lvl) { var e; for (var i = 0; i < 60; i++) { e = tempRoh(sp, lvl); if (!/^\+0 /.test(e.l)) return e; } return e; };
    // Rechnen mit negativen Zahlen: immer mit einer Minuszahl (Start oder Ergebnis)
    var negRoh = T.negAddSub;
    T.negAddSub = function (sp, lvl) { var e; for (var i = 0; i < 60; i++) { e = negRoh(sp, lvl); if (/-/.test(e.a) || /^-/.test(e.l)) return e; } return e; };

    function lis(o) { return o.map(function (x) { return x[0] + ' ' + x[1]; }).join(', '); }

    // M1 L14 Symmetrie
    var BUCHST = [['A', 'Ja, senkrecht'], ['B', 'Ja, waagerecht'], ['E', 'Ja, waagerecht'], ['F', 'Nein'], ['H', 'Ja, senkrecht und waagerecht'], ['L', 'Nein'], ['M', 'Ja, senkrecht'], ['N', 'Nein'], ['P', 'Nein'], ['R', 'Nein'], ['S', 'Nein'], ['T', 'Ja, senkrecht'], ['U', 'Ja, senkrecht'], ['V', 'Ja, senkrecht'], ['W', 'Ja, senkrecht'], ['X', 'Ja, senkrecht und waagerecht'], ['Y', 'Ja, senkrecht'], ['Z', 'Nein']];
    var ACHSEN = [['ein Quadrat', '4'], ['ein Rechteck (kein Quadrat)', '2'], ['ein gleichseitiges Dreieck', '3'], ['ein gleichschenkliges Dreieck', '1'], ['ein Kreis', 'unendlich viele'], ['eine Raute (kein Quadrat)', '2'], ['ein regelmäßiges Sechseck', '6'], ['ein Parallelogramm (keine Raute, kein Rechteck)', '0']];
    T.symmetrie = function (sp, lvl) {
      var art = pick(lvl === 'basis' ? ['b', 'b', 'k'] : ['b', 'f', 'k', 'k']);
      if (art === 'b') { var b = pick(BUCHST); return { a: 'Hat der Buchstabe ' + b[0] + ' eine Spiegelachse? Wenn ja: welche?', l: b[1] }; }
      if (art === 'f') { var f = pick(ACHSEN); return { a: 'Wie viele Spiegelachsen hat ' + f[0] + '?', l: f[1] }; }
      var k = ri(1, lvl === 'basis' ? 4 : 7), s = pick(['links', 'rechts']);
      return { a: 'Ein Punkt liegt ' + k + ' Kästchen ' + s + ' von der Spiegelachse. Wo liegt sein Spiegelpunkt?', l: k + ' Kästchen ' + (s === 'links' ? 'rechts' : 'links') + ' von der Achse' };
    };

    // M2 L10 Strecken messen und der Mittelpunkt
    T.streckeMitte = function (sp, lvl) {
      var art = pick(['m', 'm', 'u', 'd']);
      if (art === 'm') {
        var mm = lvl === 'basis' ? ri(2, 15) * 10 : ri(10, 80) * 2;
        return { a: 'Die Strecke [AB] ist ' + de(mm / 10) + ' cm lang. Wie weit ist der Mittelpunkt M von A entfernt?', l: de(mm / 20) + ' cm (' + (mm / 2) + ' mm)' };
      }
      if (art === 'u') {
        var x = ri(12, 149), mmCm = function () { return R() < 0.5 ? { a: x + ' mm = ___ cm', l: de(x / 10) + ' cm' } : { a: de(x / 10) + ' cm = ___ mm', l: x + ' mm' }; };
        // Programm M2: Längen mit Komma in beide Richtungen umwandeln (km, m, cm, mm – mit der Umwandlungstabelle)
        return lvl === 'basis' ? mmCm() : umwandeln([['km', 3], ['m', 0], ['cm', -2], ['mm', -3]], lvl, mmCm, sp);
      }
      var c = lvl === 'basis' ? ri(2, 9) : ri(11, 49) / 10;
      return { a: '[AB] = ' + de(c) + ' cm. [AC] ist doppelt so lang. Wie lang ist [AC]?', l: '2 · ' + de(c) + ' = ' + de(2 * c) + ' cm' };
    };

    // M3 L7 Daten in Diagrammen lesen (das Diagramm steht als Liste: Balken und ihre Höhe)
    var THEMEN = [['Lieblingssport', ['Fußball', 'Basketball', 'Tennis', 'Schwimmen', 'Tanzen']], ['Lieblingsfarbe', ['Blau', 'Rot', 'Grün', 'Gelb', 'Schwarz']], ['Lieblingsobst', ['Apfel', 'Banane', 'Erdbeere', 'Kiwi', 'Mango']], ['Weg zur Schule', ['Bus', 'Fahrrad', 'zu Fuß', 'Auto', 'Zug']]];
    function balken(lvl) {
      var t = pick(THEMEN), n = lvl === 'basis' ? 3 : 4, namen = t[1].slice(0, 5).sort(function () { return R() - 0.5; }).slice(0, n), w = [];
      namen.forEach(function () { var x; do { x = ri(2, lvl === 'plus' ? 24 : 12); } while (w.indexOf(x) >= 0); w.push(x); });
      return { titel: t[0], o: namen.map(function (x, i) { return [x, w[i]]; }) };
    }
    T.diagrammLesen = function (sp, lvl) {
      var d = balken(lvl), o = d.o, q = pick(['max', 'zus', 'diff', 'alle']);
      var kopf = 'Balkendiagramm „' + d.titel + '“: ' + lis(o) + '. ';
      if (q === 'max') { var m = o.slice().sort(function (p, r) { return r[1] - p[1]; })[0]; return { a: kopf + 'Was ist am beliebtesten?', l: m[0] + ' (' + m[1] + ')' }; }
      if (q === 'zus') return { a: kopf + 'Wie viele sind es bei ' + o[0][0] + ' und ' + o[1][0] + ' zusammen?', l: o[0][1] + ' + ' + o[1][1] + ' = ' + (o[0][1] + o[1][1]) };
      if (q === 'diff') { var a = o[0], b = o[1]; if (b[1] > a[1]) { var t = a; a = b; b = t; } return { a: kopf + 'Wie viele mehr bei ' + a[0] + ' als bei ' + b[0] + '?', l: a[1] + ' − ' + b[1] + ' = ' + (a[1] - b[1]) }; }
      var s = o.reduce(function (x, y) { return x + y[1]; }, 0);
      return { a: kopf + 'Wie viele wurden insgesamt befragt?', l: o.map(function (x) { return x[1]; }).join(' + ') + ' = ' + s };
    };

    // M3 L8 Häufigkeit und Strichliste
    T.strichliste = function (sp, lvl) {
      var art = pick(['zaehl', 'zeichne', 'wurf']);
      if (art === 'zaehl') { var b = ri(1, lvl === 'basis' ? 3 : 6), s = ri(0, 4); return { a: 'Strichliste: ' + b + (b === 1 ? ' Fünferbündel' : ' Fünferbündel') + ' und ' + s + (s === 1 ? ' Strich' : ' Striche') + '. Wie groß ist die Häufigkeit?', l: b + ' · 5 + ' + s + ' = ' + (b * 5 + s) }; }
      if (art === 'zeichne') { var n = ri(6, lvl === 'basis' ? 19 : 34); return { a: 'Du willst ' + n + ' als Strichliste zeichnen. Wie viele Fünferbündel, wie viele einzelne Striche?', l: Math.floor(n / 5) + ' Bündel und ' + (n % 5) + ' Striche' }; }
      var w = [1, 2, 3, 4, 5, 6].map(function (z) { return [z, ri(1, lvl === 'basis' ? 6 : 9)]; }), sum = w.reduce(function (x, y) { return x + y[1]; }, 0);
      return { a: 'Würfeln – Häufigkeiten: ' + w.map(function (x) { return 'die ' + x[0] + ': ' + x[1]; }).join(', ') + '. Wie oft wurde insgesamt gewürfelt?', l: w.map(function (x) { return x[1]; }).join(' + ') + ' = ' + sum };
    };

    // M4 L15 Die Höhe im Dreieck
    var HOEHE = [['Welchen Winkel bilden die Höhe und die Grundseite?', '90° (rechter Winkel)'], ['Wie viele Höhen hat ein Dreieck?', '3 – zu jeder Seite eine'], ['Von wo nach wo zeichnest du die Höhe?', 'Von der gegenüberliegenden Ecke senkrecht auf die Grundseite'], ['Womit zeichnest du die Höhe genau?', 'Mit dem Geodreieck (Mittellinie auf die Grundseite legen)'], ['Ein Dreieck hat einen stumpfen Winkel. Wo kann die Höhe liegen?', 'Außerhalb – die Grundseite verlängern'], ['In einem rechtwinkligen Dreieck: Welche Seiten sind schon Höhen?', 'Die beiden Seiten am rechten Winkel']];
    T.hoeheDreieck = function (sp, lvl) {
      if (R() < 0.5) { var q = pick(HOEHE); return { a: q[0], l: q[1] }; }
      var k = ri(3, lvl === 'basis' ? 8 : 14), g = pick([0.5, 1]);
      return { a: 'Karopapier: Die Spitze C liegt ' + k + ' Kästchen über der Grundseite. 1 Kästchen = ' + de(g) + ' cm. Wie lang ist die Höhe?', l: k + ' · ' + de(g) + ' = ' + de(k * g) + ' cm' };
    };

    // M5 L4 Proportional oder nicht? – die Tabelle
    T.propTabelle = function (sp, lvl) {
      var k = ri(2, lvl === 'basis' ? 6 : 12), art = pick(['ja', 'nein', 'fuell']);
      if (art === 'fuell') { var n = ri(2, 5), m = n * ri(2, 3); return { a: 'Proportional: ' + n + ' Stück kosten ' + (n * k) + ' €. Was kostet 1 Stück? Was kosten ' + m + ' Stück?', l: '1 Stück: ' + k + ' €, ' + m + ' Stück: ' + (m * k) + ' €' }; }
      var w = [1, 2, 3, 4].map(function (x) { return x * k; });
      if (art === 'ja') return { a: 'Ist die Tabelle proportional?  1 → ' + w[0] + ',  2 → ' + w[1] + ',  3 → ' + w[2] + ',  4 → ' + w[3], l: 'Ja – immer mal ' + k };
      var i = ri(2, 3), f = w[i] + pick([-2, -1, 1, 2]), v = w.slice(); v[i] = f;
      return { a: 'Ist die Tabelle proportional?  1 → ' + v[0] + ',  2 → ' + v[1] + ',  3 → ' + v[2] + ',  4 → ' + v[3], l: 'Nein – bei ' + (i + 1) + ' müsste ' + w[i] + ' stehen, nicht ' + f };
    };

    // M5 L5 Proportionalität im Graph
    T.propGraph = function (sp, lvl) {
      var k = ri(2, lvl === 'basis' ? 5 : 9), art = pick(['ablesen', 'start', 'punkte']);
      if (art === 'ablesen') { var x = ri(3, 8); return { a: 'Eine Gerade geht durch (0;0) und (1;' + k + '). Welcher y-Wert gehört zu x = ' + x + '?', l: 'y = ' + k + ' · ' + x + ' = ' + (k * x) }; }
      if (art === 'start') { var b = ri(1, 6); return R() < 0.5 ? { a: 'Eine Gerade beginnt bei (0;' + b + '). Ist sie proportional?', l: 'Nein – sie geht nicht durch den Nullpunkt (0;0)' } : { a: 'Eine Gerade geht durch (0;0) und (2;' + (2 * k) + '). Ist sie proportional?', l: 'Ja – Gerade durch den Nullpunkt' }; }
      var schief = R() < 0.5, p3 = 3 * k + (schief ? pick([-1, 1]) : 0);
      return { a: 'Liegen diese Punkte auf einer Geraden durch (0;0)?  (1;' + k + '), (2;' + (2 * k) + '), (3;' + p3 + ')', l: schief ? 'Nein – (3;' + (3 * k) + ') wäre richtig' : 'Ja – y ist immer ' + k + '-mal x' };
    };

    // M5 L8 Punkte im Koordinatensystem
    T.koordinaten = function (sp, lvl) {
      var x = ri(1, 9), y = ri(1, 9), art = pick(['lesen', 'setzen', 'achse', 'viereck']);
      if (art === 'lesen') return { a: 'Ein Punkt liegt ' + x + ' nach rechts und ' + y + ' nach oben. Wie heißen seine Koordinaten?', l: '(' + x + ';' + y + ')' };
      if (art === 'setzen') return { a: 'Wie kommst du vom Ursprung zum Punkt P(' + x + ';' + y + ')?', l: x + ' nach rechts, ' + y + ' nach oben' };
      if (art === 'achse') return R() < 0.5 ? { a: 'Welcher Punkt liegt auf der x-Achse: (' + x + ';0) oder (0;' + x + ')?', l: '(' + x + ';0)' } : { a: 'Welcher Punkt liegt auf der y-Achse: (' + y + ';0) oder (0;' + y + ')?', l: '(0;' + y + ')' };
      var a = ri(1, 4), b = ri(1, 4), w = ri(2, 5), h = ri(2, 5);
      return { a: 'Rechteck ABCD: A(' + a + ';' + b + '), B(' + (a + w) + ';' + b + '), C(' + (a + w) + ';' + (b + h) + '). Wo liegt D?', l: 'D(' + a + ';' + (b + h) + ')' };
    };

    // M5 L9 Geraden: parallel, senkrecht, schneidend
    var GERADE = [['Schneiden sich zwei parallele Geraden?', 'Nein, nie'], ['Welchen Winkel bilden zwei senkrechte Geraden?', '90°'], ['Sind die x-Achse und die y-Achse parallel oder senkrecht?', 'Senkrecht'], ['Wie heißt der Punkt, in dem sich zwei Geraden treffen?', 'Schnittpunkt']];
    T.geraden = function (sp, lvl) {
      var art = pick(['waag', 'senk', 'schnitt', 'begriff']), a = ri(1, 8), b = ri(1, 8), c = ri(1, 8);
      while (c === a) c = ri(1, 8);
      if (art === 'waag') return { a: 'Eine Gerade geht durch (' + a + ';' + b + ') und (' + c + ';' + b + '). Wie verläuft sie?', l: 'Waagerecht (parallel zur x-Achse)' };
      if (art === 'senk') return { a: 'Eine Gerade geht durch (' + b + ';' + a + ') und (' + b + ';' + c + '). Wie verläuft sie?', l: 'Senkrecht (parallel zur y-Achse)' };
      if (art === 'schnitt') return { a: 'Eine waagerechte Gerade geht durch (0;' + b + '), eine senkrechte durch (' + a + ';0). Wo schneiden sie sich?', l: '(' + a + ';' + b + ')' };
      var g = pick(GERADE); return { a: g[0], l: g[1] };
    };

    // M5 L13 Zusammengesetzte Figuren
    T.zusammengesetzt = function (sp, lvl) {
      var art = pick(lvl === 'basis' ? ['zwei', 'zwei', 'haus'] : ['zwei', 'haus', 'L', 'loch']);
      if (art === 'zwei') { var a = ri(2, 9), b = ri(2, 6), c = ri(2, 9), d = ri(2, 6); return { a: 'Eine Figur aus zwei Rechtecken: ' + a + ' cm · ' + b + ' cm und ' + c + ' cm · ' + d + ' cm. Gesamtfläche?', l: (a * b) + ' + ' + (c * d) + ' = ' + (a * b + c * d) + ' cm²' }; }
      if (art === 'haus') { var w = ri(2, 6) * 2, h = ri(3, 8), t = ri(2, 5); return { a: 'Ein Haus: Wand ' + w + ' m breit und ' + h + ' m hoch (Rechteck), Dach ' + w + ' m breit und ' + t + ' m hoch (Dreieck). Gesamtfläche?', l: (w * h) + ' + (' + w + ' · ' + t + ') ÷ 2 = ' + (w * h) + ' + ' + (w * t / 2) + ' = ' + (w * h + w * t / 2) + ' m²' }; }
      var A = ri(6, 12), B = ri(4, 9), C = ri(2, A - 3), D = ri(2, B - 2);
      if (art === 'L') return { a: 'L-Form: ein Rechteck ' + A + ' cm · ' + B + ' cm, an einer Ecke fehlt ein Stück ' + C + ' cm · ' + D + ' cm. Fläche?', l: (A * B) + ' − ' + (C * D) + ' = ' + (A * B - C * D) + ' cm²' };
      var q = ri(1, 3); return { a: 'Ein Rechteck ' + A + ' cm · ' + B + ' cm hat ein quadratisches Loch mit ' + q + ' cm Seite. Fläche?', l: (A * B) + ' − ' + (q * q) + ' = ' + (A * B - q * q) + ' cm²' };
    };

    // M6 L5 Terme aufstellen
    T.termAufstellen = function (sp, lvl) {
      var v = pick(['x', 'y', 'a', 'n']), n = ri(2, 9), m = ri(2, 5);
      var V = [
        ['die Summe von ' + v + ' und ' + n, v + ' + ' + n],
        ['die Differenz von ' + v + ' und ' + n, v + ' − ' + n],
        ['das Produkt von ' + n + ' und ' + v, n + v],
        ['das Doppelte von ' + v, '2' + v],
        ['um ' + n + ' weniger als ' + v, v + ' − ' + n],
        ['um ' + n + ' mehr als ' + v, v + ' + ' + n],
        ['das ' + ['Doppelte', 'Dreifache', 'Vierfache', 'Fünffache'][m - 2] + ' von ' + v + ', plus ' + n, m + v + ' + ' + n],
        ['das ' + ['Doppelte', 'Dreifache', 'Vierfache', 'Fünffache'][m - 2] + ' von ' + v + ', minus ' + n, m + v + ' − ' + n],
        ['ein Heft kostet ' + v + ' €. Was kosten ' + n + ' Hefte?', n + v + ' €'],
        ['du hast ' + v + ' € und bekommst ' + n + ' € dazu', v + ' + ' + n + ' €'],
      ];
      var t = pick(lvl === 'basis' ? V.slice(0, 6) : V);
      return { a: 'Schreibe als Term: ' + t[0], l: t[1] };
    };

    // ---- Umwandeln mit der Tabelle (26.11.2026; Programm VP M2/M3/M7: „convertir dans une unité inférieure ou supérieure“) ----
    // „basis“ bleibt wie im Klassenbuch (in die kleinere Einheit, ganze Zahlen). Ab „kern“ auch zurück in die größere Einheit
    // und mit Komma – das geht sicher mit der Umwandlungstabelle. Längen in Modul 1: nur in die kleinere Einheit (Programm M1).
    function umwandeln(E, lvl, roh, sp) {
      if (lvl === 'basis') return roh(sp, lvl);
      var i = ri(0, E.length - 2), j = Math.min(E.length - 1, i + (lvl === 'plus' && R() < 0.4 ? 2 : 1));
      var g = E[i], k = E[j], f = Math.pow(10, g[1] - k[1]), art = pick(['zurueck', 'komma', 'zurueckKomma', 'komma']);
      if (art === 'zurueck') { var n = ri(1, 9); return { a: grp(n * f) + ' ' + k[0] + ' = ___ ' + g[0], l: grp(n) + ' ' + g[0] }; }
      if (art === 'komma') { var z = ri(11, 99); return { a: de(z / 10) + ' ' + g[0] + ' = ___ ' + k[0], l: grp(z * f / 10) + ' ' + k[0] }; }
      var w = ri(11, 99); return { a: grp(w * f / 10) + ' ' + k[0] + ' = ___ ' + g[0], l: de(w / 10) + ' ' + g[0] };
    }
    var kapRoh = T.kapazitaet, masseRoh = T.masse, flRoh = T.flaecheEinheit;
    T.kapazitaet = function (sp, lvl) { return umwandeln([['l', 3], ['dl', 2], ['cl', 1], ['ml', 0]], lvl, kapRoh, sp); };
    T.masse = function (sp, lvl) { return umwandeln([['t', 6], ['kg', 3], ['g', 0]], lvl, masseRoh, sp); };
    T.flaecheEinheit = function (sp, lvl) { return umwandeln([['km²', 6], ['ha', 4], ['a', 2], ['m²', 0], ['dm²', -2], ['cm²', -4], ['mm²', -6]], lvl, flRoh, sp); };
    // Volumen (Modul 7): m³, dm³ = l, cm³ = ml, mm³ – Schritt ×1000
    T.volumen = function (sp, lvl) { return umwandeln([['m³', 9], ['dm³', 6], ['cm³', 3], ['mm³', 0]], lvl === 'basis' ? 'kern' : lvl, function () { var n = ri(1, 9), p = pick([['m³', 'dm³'], ['dm³', 'cm³'], ['cm³', 'mm³']]); return { a: n + ' ' + p[0] + ' = ___ ' + p[1], l: grp(n * 1000) + ' ' + p[1] }; }, sp); };
