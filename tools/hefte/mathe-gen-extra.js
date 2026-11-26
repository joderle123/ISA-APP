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

    // ---- Module 7–9 (Programm VP Mathematik, 26.11.2026): Gleichungen, Bank und Zinsen, Volumen, Teiler, Potenzen,
    // Wurzeln, Brüche, rationale Zahlen, Polynome, Pythagoras. Zahlen so gewählt, dass die Lösungen „schön“ sind.
    function sg(n) { return n < 0 ? '− ' + Math.abs(n) : '+ ' + n; }   // „+ 3“ / „− 3“ im Term
    function mz(n) { return n < 0 ? '−' + Math.abs(n) : String(n); }
    function vz() { return R() < 0.5 ? -1 : 1; }
    // Term ohne „1x“ / „−1x²“: Koeffizient 1 wird bei jedem Buchstaben weggelassen
    function tS(list) {
      var s = '', first = true;
      list.forEach(function (t) { var c = t.coef; if (c === 0) return; var sym = t.sym || '', ab = Math.abs(c), disp = (sym && ab === 1) ? sym : (ab + sym);
        if (first) { s += (c < 0 ? '−' : '') + disp; first = false; } else s += (c < 0 ? ' − ' : ' + ') + disp; });
      return s === '' ? '0' : s;
    }
    var HOCH = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
    function hoch(n) { return String(n).split('').map(function (z) { return HOCH[z]; }).join(''); }
    // gekürzter Bruch als [[z/n]] – ganze Zahlen ohne Bruchstrich
    function frK(z, n) { var r = red(z, n); return r[1] === 1 ? String(r[0]) : fr(r[0], r[1]); }
    function zaehler(n) { var z; do { z = ri(1, n - 1); } while (gcd(z, n) !== 1); return z; }
    var NAMEN = ['Lou', 'Sami', 'Finn', 'Lea', 'Yusuf', 'Lina', 'Ben', 'Mia'];
    // M7 L1–L2 Gleichungen mit einer Unbekannten (sp.art: 'einfach' = ein Schritt)
    T.gleichung = function (sp, lvl) {
      var einfach = sp.art === 'einfach' || (lvl === 'basis' && sp.art !== 'zwei');
      var x = ri(einfach && lvl === 'basis' ? 1 : -6, 12); if (x === 0) x = 4;
      if (einfach) { var b = ri(2, lvl === 'basis' ? 15 : 40), op = pick(['+', '−', '·', ':']);
        if (op === '+') return { a: 'x + ' + b + ' = ' + mz(x + b), l: 'x = ' + mz(x) };
        if (op === '−') return { a: 'x − ' + b + ' = ' + mz(x - b), l: 'x = ' + mz(x) };
        if (op === ':') { var q = ri(2, 6), xx = Math.abs(x) * q; return { a: 'x : ' + q + ' = ' + Math.abs(x), l: 'x = ' + xx }; }
        var k = ri(2, 9); return { a: k + 'x = ' + mz(k * x), l: 'x = ' + mz(x) }; }
      var a = ri(2, 9), c = vz() * ri(1, 15);
      if (lvl !== 'plus' || R() < 0.35) return { a: a + 'x ' + sg(c) + ' = ' + mz(a * x + c), l: 'x = ' + mz(x) };
      if (R() < 0.4) { var m = ri(2, 4), n = vz() * ri(1, 6); return { a: m + '(x ' + sg(n) + ') = ' + mz(m * (x + n)), l: 'x = ' + mz(x) }; }
      var d = ri(1, a - 1), e = (a - d) * x + c;   // ax + c = dx + e
      return { a: a + 'x ' + sg(c) + ' = ' + tS([{ coef: d, sym: 'x' }, { coef: e, sym: '' }]), l: 'x = ' + mz(x) };
    };
    // M7 L3 Sachaufgaben: Gleichung aufstellen und lösen
    T.gleichungSach = function (sp, lvl) {
      var N = pick(NAMEN);
      var t = pick(lvl === 'basis' ? ['spar', 'pack', 'denk1', 'rest'] : lvl === 'kern' ? ['kauf', 'denk2', 'taxi', 'kino', 'abo'] : ['alter', 'umfang', 'tarif', 'folge', 'kauf']);
      if (t === 'spar') { var x = ri(12, 60), b = ri(5, 30); return { a: N + ' hat x € gespart. Mit ' + b + ' € Taschengeld dazu sind es ' + (x + b) + ' €. Gleichung und x?', l: 'x + ' + b + ' = ' + (x + b) + ' → x = ' + x + ' €' }; }
      if (t === 'pack') { var f = pick([4, 6, 8, 12]), k = ri(2, 6); return { a: 'In einer Kiste sind x Flaschen. ' + k + ' Kisten haben zusammen ' + (k * f) + ' Flaschen. Gleichung und x?', l: k + 'x = ' + (k * f) + ' → x = ' + f }; }
      if (t === 'denk1') { var z = ri(5, 40), s = ri(3, 20); return { a: 'Ich denke mir eine Zahl und ziehe ' + s + ' ab. Ich erhalte ' + (z - s) + '. Gleichung und Zahl?', l: 'x − ' + s + ' = ' + (z - s) + ' → x = ' + z }; }
      if (t === 'rest') { var y = ri(20, 80), g = ri(5, 15); return { a: N + ' kauft ein Spiel für x €. Von ' + (y + g) + ' € bleiben ' + g + ' € übrig. Gleichung und Preis?', l: (y + g) + ' − x = ' + g + ' → x = ' + y + ' €' }; }
      if (t === 'kauf') { var n = ri(3, 8), p = ri(2, 9), f2 = ri(3, 12); return { a: n + ' Hefte zu je x € und eine Mappe zu ' + f2 + ' € kosten zusammen ' + (n * p + f2) + ' €. Wie teuer ist ein Heft?', l: n + 'x + ' + f2 + ' = ' + (n * p + f2) + ' → x = ' + p + ' €' }; }
      if (t === 'denk2') { var z2 = ri(2, 20), k2 = ri(2, 5), s2 = ri(1, 15); return { a: 'Ich denke mir eine Zahl, nehme sie mal ' + k2 + ' und addiere ' + s2 + '. Ich erhalte ' + (k2 * z2 + s2) + '. Welche Zahl?', l: k2 + 'x + ' + s2 + ' = ' + (k2 * z2 + s2) + ' → x = ' + z2 }; }
      if (t === 'taxi') { var g2 = ri(3, 5), km = ri(4, 18), pr = ri(1, 3); return { a: 'Ein Taxi kostet ' + g2 + ' € Grundpreis und ' + pr + ' € pro km. Die Fahrt kostet ' + (g2 + pr * km) + ' €. Wie viele km?', l: g2 + ' + ' + pr + 'x = ' + (g2 + pr * km) + ' → x = ' + km + ' km' }; }
      if (t === 'kino') { var pers = ri(3, 6), ein = ri(6, 11), pop = ri(4, 9); return { a: pers + ' Freunde gehen ins Kino. Sie zahlen ' + pers + ' Karten zu je x € und ein großes Popcorn zu ' + pop + ' €, zusammen ' + (pers * ein + pop) + ' €. Was kostet eine Karte?', l: pers + 'x + ' + pop + ' = ' + (pers * ein + pop) + ' → x = ' + ein + ' €' }; }
      if (t === 'abo') { var gb = pick([10, 15, 20, 25]), mon = ri(3, 12), pm = ri(5, 12); return { a: 'Ein Fitness-Abo kostet ' + gb + ' € Anmeldung und x € im Monat. Nach ' + mon + ' Monaten hat ' + N + ' ' + (gb + mon * pm) + ' € bezahlt. Monatspreis?', l: gb + ' + ' + mon + 'x = ' + (gb + mon * pm) + ' → x = ' + pm + ' €' }; }
      if (t === 'alter') { var xa = ri(9, 16), d = ri(20, 32); return { a: N + ' ist x Jahre alt. Die Tante ist ' + d + ' Jahre älter. Zusammen sind beide ' + (2 * xa + d) + ' Jahre alt. Gleichung und x?', l: 'x + x + ' + d + ' = ' + (2 * xa + d) + ' → 2x = ' + (2 * xa) + ' → x = ' + xa }; }
      if (t === 'umfang') { var br = ri(3, 12), mehr = ri(2, 8), U = 2 * br + 2 * (br + mehr); return { a: 'Ein Rechteck ist ' + mehr + ' cm länger als breit. Der Umfang ist ' + U + ' cm. Wie breit ist es?', l: '2x + 2(x + ' + mehr + ') = ' + U + ' → 4x + ' + (2 * mehr) + ' = ' + U + ' → x = ' + br + ' cm' }; }
      if (t === 'tarif') { var h = ri(3, 9), pa = ri(1, 3), pb = pa + ri(1, 3), ga = (pb - pa) * h; return { a: 'Tarif A: ' + ga + ' € Grundgebühr und ' + pa + ' € pro Stunde. Tarif B: ' + pb + ' € pro Stunde, keine Grundgebühr. Bei wie vielen Stunden kosten beide gleich viel?', l: ga + ' + ' + (pa === 1 ? '' : pa) + 'x = ' + pb + 'x → ' + ga + ' = ' + (pb - pa === 1 ? '' : pb - pa) + 'x → x = ' + h + ' Stunden' }; }
      var st = ri(5, 30); return { a: 'Die Summe von drei aufeinanderfolgenden Zahlen ist ' + (3 * st + 3) + '. Welche Zahlen sind es?', l: 'x + (x + 1) + (x + 2) = ' + (3 * st + 3) + ' → 3x + 3 = ' + (3 * st + 3) + ' → x = ' + st + ': ' + st + ', ' + (st + 1) + ', ' + (st + 2) };
    };
    // M7 L4 Bankkonto: Haben (+) und Soll (−)
    T.bankkonto = function (sp, lvl) {
      if (lvl === 'plus' && R() < 0.4) { var s0 = -ri(2, 30) * 10, ziel = ri(5, 30) * 10; return { a: 'Kontostand ' + mz(s0) + ' €. Wie viel muss eingezahlt werden, damit ' + ziel + ' € auf dem Konto sind?', l: ziel + ' − (' + mz(s0) + ') = ' + (ziel - s0) + ' €' }; }
      var start = (lvl === 'basis' ? 1 : vz()) * ri(2, 40) * 10, n = lvl === 'basis' ? 2 : 3, k = start, txt = [];
      for (var i = 0; i < n; i++) { var b = vz() * ri(1, 30) * 5; k += b; txt.push(b > 0 ? 'Eingang ' + b + ' €' : 'Ausgabe ' + (-b) + ' €'); }
      return { a: 'Kontostand ' + mz(start) + ' €. ' + txt.join(', ') + '. Neuer Kontostand?', l: mz(k) + ' €' + (k < 0 ? ' (im Soll / débit)' : k > 0 ? ' (im Haben / crédit)' : '') };
    };
    // M7 L5 Zinsen (einfache Zinsen: jedes Jahr gleich viel)
    T.zinsen = function (sp, lvl) {
      var K = pick([200, 400, 500, 800, 1000, 1200, 1500, 2000, 2500, 5000]), p = pick(lvl === 'basis' ? [1, 2, 5, 10] : [1, 1.5, 2, 2.5, 3, 4]);
      var z = K * p / 100;
      if (lvl === 'basis') return { a: K + ' € auf dem Sparbuch, ' + de(p) + ' % Zinsen im Jahr. Wie viele Zinsen nach 1 Jahr?', l: K + ' · ' + de(p) + ' : 100 = ' + de(z) + ' €' };
      var w = lvl === 'kern' ? pick(['jahre', 'jahre', 'kredit']) : pick(['monate', 'satz', 'jahre', 'kredit']);
      if (w === 'jahre') { var j = ri(2, 4); return { a: K + ' € zu ' + de(p) + ' % im Jahr (einfache Zinsen). Zinsen nach ' + j + ' Jahren? Kontostand?', l: de(z) + ' € · ' + j + ' = ' + de(z * j) + ' € Zinsen; ' + de(K + z * j) + ' €' }; }
      if (w === 'kredit') { var kp = pick([4, 5, 6, 8]); return { a: N2() + ' leiht sich ' + K + ' € für ein Jahr. Die Bank verlangt ' + kp + ' % Zinsen. Wie viel muss zurückgezahlt werden?', l: K + ' + ' + de(K * kp / 100) + ' = ' + de(K + K * kp / 100) + ' €' }; }
      if (w === 'satz') { return { a: K + ' € werden in einem Jahr zu ' + de(K + z) + ' €. Wie viel Prozent Zinsen sind das?', l: de(z) + ' : ' + K + ' · 100 = ' + de(p) + ' %' }; }
      var m = pick([3, 6, 9]); return { a: K + ' € zu ' + de(p) + ' % im Jahr. Wie viele Zinsen in ' + m + ' Monaten?', l: de(z) + ' € · ' + m + '/12 = ' + de(z * m / 12) + ' €' };
    };
    function N2() { return pick(NAMEN); }
    // M7 L7 Quader und Würfel
    T.quader = function (sp, lvl) {
      if (lvl === 'plus' && R() < 0.3) { var k = ri(2, 6); return { a: 'Ein Würfel hat ein Volumen von ' + (k * k * k) + ' cm³. Wie lang ist eine Kante?', l: k + ' cm (weil ' + k + ' · ' + k + ' · ' + k + ' = ' + (k * k * k) + ')' }; }
      if (lvl === 'basis' || R() < 0.3) { var s = ri(2, 10); if (R() < 0.5) return { a: 'Würfel mit Kante ' + s + ' cm. Volumen?', l: s + ' · ' + s + ' · ' + s + ' = ' + (s * s * s) + ' cm³' }; }
      var a = ri(2, 12), b = ri(2, 10), c = ri(2, 9);
      if (lvl === 'plus' && R() < 0.6) { return { a: 'Ein Aquarium ist ' + (a * 10) + ' cm lang, ' + (b * 5) + ' cm breit und ' + (c * 5) + ' cm hoch. Wie viele Liter passen hinein?', l: grp(a * 10 * b * 5 * c * 5) + ' cm³ = ' + de(a * 10 * b * 5 * c * 5 / 1000) + ' l' }; }
      if (lvl === 'kern' && R() < 0.3) { var V = a * b * c; return { a: 'Ein Quader hat V = ' + V + ' cm³, ist ' + a + ' cm lang und ' + b + ' cm breit. Wie hoch ist er?', l: V + ' : (' + a + ' · ' + b + ') = ' + c + ' cm' }; }
      return { a: 'Quader: ' + a + ' cm × ' + b + ' cm × ' + c + ' cm. Volumen?', l: a + ' · ' + b + ' · ' + c + ' = ' + (a * b * c) + ' cm³' };
    };
    // M7 L8 Prisma und Zylinder
    T.prismaZylinder = function (sp, lvl) {
      if (R() < 0.5) { var g = ri(2, 10) * 2, h = ri(2, 9), H = ri(3, 15); return { a: 'Prisma mit dreieckiger Grundfläche: g = ' + g + ' cm, h = ' + h + ' cm, Höhe des Prismas ' + H + ' cm. Volumen?', l: 'G = ' + g + ' · ' + h + ' : 2 = ' + (g * h / 2) + ' cm²; V = ' + (g * h / 2) + ' · ' + H + ' = ' + (g * h / 2 * H) + ' cm³' }; }
      if (lvl === 'plus') { var d = pick([6, 8, 10]), hh = ri(8, 15), r0 = d / 2, v0 = Math.round(3.14 * r0 * r0 * hh * 100) / 100; return { a: 'Eine Dose ist ' + hh + ' cm hoch und hat ' + d + ' cm Durchmesser. Wie viel ml passen hinein (π ≈ 3,14)?', l: 'r = ' + r0 + ' cm; 3,14 · ' + r0 + ' · ' + r0 + ' · ' + hh + ' = ' + de(v0) + ' cm³ ≈ ' + Math.round(v0) + ' ml' }; }
      var r = ri(1, lvl === 'basis' ? 5 : 10), H2 = ri(2, 20);
      return { a: 'Zylinder: r = ' + r + ' cm, h = ' + H2 + ' cm. Volumen (π ≈ 3,14)?', l: '3,14 · ' + r + ' · ' + r + ' · ' + H2 + ' = ' + de(Math.round(3.14 * r * r * H2 * 100) / 100) + ' cm³' };
    };
    // M8 L1 Vielfache und Teiler
    function teiler(n) { var t = []; for (var i = 1; i <= n; i++) if (n % i === 0) t.push(i); return t; }
    T.teilerVielfache = function (sp, lvl) {
      if (lvl === 'plus' && R() < 0.5) { var p = pick([[12, 18], [16, 24], [15, 25], [20, 30], [18, 27], [24, 36]]), ta = teiler(p[0]), tb = teiler(p[1]); return { a: 'Gemeinsame Teiler von ' + p[0] + ' und ' + p[1] + '?', l: '{' + ta.filter(function (x) { return tb.indexOf(x) >= 0; }).join('; ') + '}' }; }
      if (lvl !== 'basis' && R() < 0.25) { var q = ri(3, 9), z = q * ri(3, 12) + (R() < 0.5 ? 0 : ri(1, q - 1)); return { a: 'Ist ' + z + ' ein Vielfaches von ' + q + '?', l: z % q === 0 ? 'Ja: ' + q + ' · ' + (z / q) + ' = ' + z : 'Nein: ' + z + ' : ' + q + ' geht nicht auf' }; }
      if (R() < 0.5) { var n = pick(lvl === 'basis' ? [6, 8, 10, 12, 15] : [18, 20, 24, 28, 30, 36, 40, 42, 48]); return { a: 'Alle Teiler von ' + n + '?', l: 'T(' + n + ') = {' + teiler(n).join('; ') + '}' }; }
      var m = ri(3, lvl === 'basis' ? 9 : 15), v = []; for (var j = 1; j <= 5; j++) v.push(m * j);
      return { a: 'Die ersten 5 Vielfachen von ' + m + '?', l: 'V(' + m + ') = {' + v.join('; ') + '; …}' };
    };
    // M8 L2 kgV und ggT von zwei (plus: drei) verschiedenen Zahlen
    T.kgvGgt = function (sp, lvl) {
      if (lvl === 'plus' && R() < 0.35) { var bus = pick([[10, 15], [12, 18], [15, 20], [8, 12], [20, 30]]), kg = bus[0] * bus[1] / gcd(bus[0], bus[1]); return { a: 'Bus A fährt alle ' + bus[0] + ' min, Bus B alle ' + bus[1] + ' min. Um 8:00 Uhr fahren beide zusammen ab. Wann wieder?', l: 'kgV = ' + kg + ' → ' + (8 + Math.floor(kg / 60)) + ':' + String(kg % 60).padStart(2, '0') + ' Uhr' }; }
      var g = pick(lvl === 'basis' ? [2, 3, 4, 5] : [2, 3, 4, 5, 6]), fs = [], anz = lvl === 'plus' ? 3 : 2;
      while (fs.length < anz) { var f = ri(2, lvl === 'basis' ? 5 : 7); if (fs.indexOf(f) < 0) fs.push(f); }
      var zahlen = fs.map(function (f) { return g * f; });
      var G = zahlen.reduce(function (x, y) { return gcd(x, y); }), K = zahlen.reduce(function (x, y) { return x * y / gcd(x, y); });
      return pick([0, 1]) ? { a: 'ggT (pgcd) von ' + zahlen.join(', ') + '?', l: String(G) } : { a: 'kgV (ppcm) von ' + zahlen.join(', ') + '?', l: String(K) };
    };
    // M8 L3 Potenzen: Quadrat, Kubik, Zehnerpotenzen
    T.potenz = function (sp, lvl) {
      var t = pick(lvl === 'basis' ? ['q', 'q', 'k', 'schreib'] : lvl === 'kern' ? ['q', 'k', 'z', 'z', 'schreib'] : ['hoch', 'vergl', 'z', 'schreib']);
      if (t === 'q') { var a = ri(2, lvl === 'basis' ? 10 : 15); return { a: a + '² = ?', l: a + ' · ' + a + ' = ' + (a * a) }; }
      if (t === 'k') { var b = ri(2, 6); return { a: b + '³ = ?', l: b + ' · ' + b + ' · ' + b + ' = ' + (b * b * b) }; }
      if (t === 'schreib') { var c = ri(2, 9), e0 = ri(2, lvl === 'basis' ? 3 : 5), f = []; for (var i = 0; i < e0; i++) f.push(c); return { a: 'Schreibe als Potenz: ' + f.join(' · '), l: c + hoch(e0) }; }
      if (t === 'hoch') { var bb = pick([2, 3]), ee = bb === 2 ? ri(4, 7) : ri(3, 4); return { a: bb + hoch(ee) + ' = ?', l: Array(ee + 1).join(bb + ' · ').slice(0, -3) + ' = ' + Math.pow(bb, ee) }; }
      if (t === 'vergl') { var pr = pick([[2, 5, 5, 2], [2, 4, 4, 2], [3, 4, 4, 3], [2, 6, 6, 2], [10, 2, 2, 10]]), v1 = Math.pow(pr[0], pr[1]), v2 = Math.pow(pr[2], pr[3]); return { a: 'Was ist größer: ' + pr[0] + hoch(pr[1]) + ' oder ' + pr[2] + hoch(pr[3]) + '?', l: v1 + (v1 > v2 ? ' > ' : v1 < v2 ? ' < ' : ' = ') + v2 }; }
      var e = ri(2, 6); return R() < 0.5 ? { a: '10' + hoch(e) + ' als Zahl?', l: grp(Math.pow(10, e)) } : { a: grp(Math.pow(10, e)) + ' als Zehnerpotenz?', l: '10' + hoch(e) };
    };
    // M8 L4 / M9 Quadratwurzel
    T.wurzel = function (sp, lvl) {
      if (lvl === 'basis' && R() < 0.35) { var q = ri(2, 10), ein = pick(['cm', 'm']); return { a: 'Ein Quadrat hat ' + (q * q) + ' ' + ein + '² Fläche. Wie lang ist eine Seite?', l: '√' + (q * q) + ' = ' + q + ' ' + ein }; }
      if (lvl === 'basis' || R() < 0.4) { var a = ri(2, lvl === 'basis' ? 12 : 20); return { a: '√' + (a * a) + ' = ?', l: String(a) + ' (weil ' + a + '² = ' + (a * a) + ')' }; }
      var w = pick(['flaeche', 'tr', 'zwischen']);
      if (w === 'flaeche') { var s = ri(3, 15); return { a: 'Ein quadratischer Garten hat ' + (s * s) + ' m² Fläche. Wie lang ist eine Seite?', l: '√' + (s * s) + ' = ' + s + ' m' }; }
      if (w === 'zwischen') { var k = ri(3, 11), n0 = k * k + ri(1, 2 * k); return { a: 'Zwischen welchen ganzen Zahlen liegt √' + n0 + '?', l: k + ' < √' + n0 + ' < ' + (k + 1) + ' (weil ' + (k * k) + ' < ' + n0 + ' < ' + ((k + 1) * (k + 1)) + ')' }; }
      var n = pick([2, 3, 5, 7, 10, 20, 50]); return { a: '√' + n + ' mit dem Taschenrechner, auf 2 Stellen gerundet?', l: '≈ ' + de(Math.round(Math.sqrt(n) * 100) / 100) };
    };
    // M8 L5 Brüche mit verschiedenen Nennern (Nenner höchstens 100)
    T.bruchUngleich = function (sp, lvl) {
      var paare = lvl === 'basis' ? [[2, 4], [3, 6], [4, 8], [5, 10], [2, 6], [3, 9], [2, 8], [4, 12]] : lvl === 'kern' ? [[2, 3], [3, 4], [4, 6], [5, 6], [6, 8], [4, 10], [3, 5], [8, 12], [2, 5]] : [[6, 9], [4, 15], [10, 12], [6, 10], [9, 12], [8, 20], [12, 15]];
      var p = pick(paare), n1 = p[0], n2 = p[1], z1 = zaehler(n1), z2 = zaehler(n2), K = n1 * n2 / gcd(n1, n2);
      var a1 = z1 * (K / n1), a2 = z2 * (K / n2), plus = R() < 0.55 || a1 <= a2;
      var Z = plus ? a1 + a2 : a1 - a2, r = red(Z, K);
      return { a: fr(z1, n1) + (plus ? ' + ' : ' − ') + fr(z2, n2) + ' = ?', l: fr(a1, K) + (plus ? ' + ' : ' − ') + fr(a2, K) + ' = ' + fr(Z, K) + (r[1] !== K ? ' = ' + frK(Z, K) : '') };
    };
    // M8 L6 Bruchteil einer Zahl; gleichnamige Brüche mal und geteilt
    T.bruchteilZahl = function (sp, lvl) {
      if (lvl === 'plus' && R() < 0.6) { var n = pick([4, 5, 6, 8, 10]), a = zaehler(n), b = zaehler(n);
        if (R() < 0.5) return { a: fr(a, n) + ' · ' + fr(b, n) + ' = ?', l: fr(a * b, n * n) + (gcd(a * b, n * n) > 1 ? ' = ' + frK(a * b, n * n) : '') };
        return { a: fr(a, n) + ' : ' + fr(b, n) + ' = ?', l: (a === b ? '1' : frK(a, b)) + ' (gleiche Nenner: Zähler durch Zähler)' }; }
      var d = pick([2, 3, 4, 5, 6, 8, 10]), z = zaehler(d), x = d * ri(2, lvl === 'basis' ? 10 : 30);
      if (lvl === 'kern' && R() < 0.35) { var gr = pick(['der Klasse (' + x + ' Personen) fährt mit dem Bus', 'von ' + x + ' € gibt ' + N2() + ' für Kleidung aus', 'von ' + x + ' km fährt der Zug durch Tunnel']); return { a: fr(z, d) + ' ' + gr + '. Wie viel ist das?', l: x + ' : ' + d + ' · ' + z + ' = ' + (x / d * z) }; }
      return { a: fr(z, d) + ' von ' + x + ' = ?', l: x + ' : ' + d + ' · ' + z + ' = ' + (x / d * z) };
    };
    // M8 L7 Bruch ↔ Dezimalzahl ↔ Prozent
    var BDP = [[1, 2, '0,5', '50 %'], [1, 4, '0,25', '25 %'], [3, 4, '0,75', '75 %'], [1, 5, '0,2', '20 %'], [2, 5, '0,4', '40 %'], [3, 5, '0,6', '60 %'], [1, 10, '0,1', '10 %'], [3, 10, '0,3', '30 %'], [7, 10, '0,7', '70 %'], [1, 20, '0,05', '5 %'], [1, 8, '0,125', '12,5 %'], [3, 20, '0,15', '15 %'], [9, 25, '0,36', '36 %']];
    T.bruchDezProz = function (sp, lvl) {
      var e = pick(lvl === 'basis' ? BDP.slice(0, 9) : BDP), w = pick([0, 1, 2]);
      if (w === 0) return { a: fr(e[0], e[1]) + ' als Dezimalzahl und in Prozent?', l: e[2] + ' = ' + e[3] };
      if (w === 1) return { a: e[3] + ' als Bruch (gekürzt) und als Dezimalzahl?', l: fr(e[0], e[1]) + ' = ' + e[2] };
      return { a: e[2] + ' als Bruch (gekürzt) und in Prozent?', l: fr(e[0], e[1]) + ' = ' + e[3] };
    };
    // M9 L1 Rationale Zahlen vergleichen und ordnen (plus: auch Brüche)
    T.rational = function (sp, lvl) {
      var w = [], n = lvl === 'basis' ? 3 : 4, txt = {};
      while (w.length < n) {
        var v, t;
        if (lvl === 'plus' && R() < 0.4) { var p = pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 10]]), s = vz(); v = s * p[0] / p[1]; t = (s < 0 ? '−' : '') + fr(p[0], p[1]); }
        else { v = vz() * ri(1, 40) / pick([1, 2, 4, 10]); t = v < 0 ? '−' + de(-v) : de(v); }
        if (w.indexOf(v) < 0) { w.push(v); txt[v] = t; }
      }
      if (lvl === 'basis' && R() < 0.4) { var a = w[0], b = w[1]; return { a: 'Setze <, > oder = : ' + txt[a] + ' ☐ ' + txt[b], l: txt[a] + (a < b ? ' < ' : ' > ') + txt[b] }; }
      var s2 = w.slice().sort(function (a, b) { return a - b; });
      return { a: 'Ordne von klein nach groß: ' + w.map(function (v) { return txt[v]; }).join('; '), l: s2.map(function (v) { return txt[v]; }).join(' < ') };
    };
    // M9 L3 Monome und Polynome addieren/subtrahieren
    T.polynomAdd = function (sp, lvl) {
      var a = vz() * ri(1, 9), b = vz() * ri(1, 9), c = vz() * ri(1, 9), d = vz() * ri(1, 9);
      if (lvl === 'basis') { if (R() < 0.5) return { a: 'Fasse zusammen: ' + tS([{ coef: a, sym: 'x' }, { coef: b, sym: 'x' }]), l: tS([{ coef: a + b, sym: 'x' }]) };
        return { a: 'Fasse zusammen: ' + tS([{ coef: Math.abs(a), sym: 'x' }, { coef: c, sym: '' }, { coef: b, sym: 'x' }, { coef: d, sym: '' }]), l: tS([{ coef: Math.abs(a) + b, sym: 'x' }, { coef: c + d, sym: '' }]) }; }
      var e = vz() * ri(1, 5), f = vz() * ri(1, 5), minus = lvl === 'plus' ? R() < 0.7 : R() < 0.35;
      var p1 = '(' + tS([{ coef: e, sym: 'x²' }, { coef: a, sym: 'x' }, { coef: b, sym: '' }]) + ')', p2 = '(' + tS([{ coef: f, sym: 'x²' }, { coef: c, sym: 'x' }, { coef: d, sym: '' }]) + ')';
      var s = minus ? -1 : 1;
      return { a: p1 + (minus ? ' − ' : ' + ') + p2, l: tS([{ coef: e + s * f, sym: 'x²' }, { coef: a + s * c, sym: 'x' }, { coef: b + s * d, sym: '' }]) };
    };
    // M9 L4 Ausmultiplizieren (développer): Monom · Monom, Monom · Polynom
    T.ausmultiplizieren = function (sp, lvl) {
      var k = ri(2, 6), b = vz() * ri(1, 9), c = ri(1, 5);
      if (lvl === 'basis') return R() < 0.75 ? { a: k + ' · (x ' + sg(b) + ')', l: tS([{ coef: k, sym: 'x' }, { coef: k * b, sym: '' }]) } : { a: k + 'x · ' + c + 'x', l: (k * c) + 'x²' };
      if (lvl === 'kern' || R() < 0.4) return { a: k + 'x · (' + tS([{ coef: c, sym: 'x' }, { coef: b, sym: '' }]) + ')', l: tS([{ coef: k * c, sym: 'x²' }, { coef: k * b, sym: 'x' }]) };
      if (R() < 0.5) { var m = ri(2, 5); return { a: '−' + k + ' · (' + tS([{ coef: m, sym: 'x' }, { coef: b, sym: '' }]) + ')', l: tS([{ coef: -k * m, sym: 'x' }, { coef: -k * b, sym: '' }]) }; }
      var m2 = ri(2, 5), d = vz() * ri(1, 6); return { a: k + 'x · (' + tS([{ coef: m2, sym: 'x²' }, { coef: c, sym: 'x' }, { coef: d, sym: '' }]) + ')', l: tS([{ coef: k * m2, sym: 'x³' }, { coef: k * c, sym: 'x²' }, { coef: k * d, sym: 'x' }]) };
    };
    // M9 L5 Ausklammern (factoriser)
    T.ausklammern = function (sp, lvl) {
      var g = ri(2, 6), a = ri(1, 7), b = vz() * ri(1, 7); while (gcd(a, Math.abs(b)) !== 1) b = b > 0 ? b + 1 : b - 1;
      if (lvl === 'basis') return { a: 'Klammere aus: ' + tS([{ coef: g * a, sym: 'x' }, { coef: g * b, sym: '' }]), l: g + '(' + tS([{ coef: a, sym: 'x' }, { coef: b, sym: '' }]) + ')' };
      if (lvl === 'plus' && R() < 0.5) { var c = vz() * ri(1, 5); while (gcd(gcd(a, Math.abs(b)), Math.abs(c)) !== 1) c = c > 0 ? c + 1 : c - 1;
        return { a: 'Klammere aus: ' + tS([{ coef: g * a, sym: 'x²' }, { coef: g * b, sym: 'x' }, { coef: g * c, sym: '' }]), l: g + '(' + tS([{ coef: a, sym: 'x²' }, { coef: b, sym: 'x' }, { coef: c, sym: '' }]) + ')' }; }
      return { a: 'Klammere aus: ' + tS([{ coef: g * a, sym: 'x²' }, { coef: g * b, sym: 'x' }]), l: g + 'x(' + tS([{ coef: a, sym: 'x' }, { coef: b, sym: '' }]) + ')' };
    };
    // M9 L7 Pythagoras und Umkehrung (pythagoreische Tripel, damit die Ergebnisse ganz sind)
    var TRIPEL = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25], [20, 21, 29]];
    T.pythagoras = function (sp, lvl) {
      var t = pick(lvl === 'basis' ? TRIPEL.slice(0, 5) : TRIPEL), w = lvl === 'basis' ? pick(['c', 'c', 'a']) : pick(['c', 'a', 'pruef', 'pruef']), e = pick(['cm', 'cm', 'm', 'dm']);
      if (w === 'c') return { a: 'Rechtwinkliges Dreieck: a = ' + t[0] + ' ' + e + ', b = ' + t[1] + ' ' + e + '. Wie lang ist die Hypotenuse c?', l: 'c² = ' + (t[0] * t[0]) + ' + ' + (t[1] * t[1]) + ' = ' + (t[2] * t[2]) + ' → c = ' + t[2] + ' ' + e };
      if (w === 'a') return { a: 'Hypotenuse c = ' + t[2] + ' ' + e + ', Kathete b = ' + t[1] + ' ' + e + '. Wie lang ist a?', l: 'a² = ' + (t[2] * t[2]) + ' − ' + (t[1] * t[1]) + ' = ' + (t[0] * t[0]) + ' → a = ' + t[0] + ' ' + e };
      var ok = R() < 0.5, c2 = ok ? t[2] : t[2] + 1; return { a: 'Ist ein Dreieck mit ' + t[0] + ' cm, ' + t[1] + ' cm und ' + c2 + ' cm rechtwinklig?', l: (t[0] * t[0]) + ' + ' + (t[1] * t[1]) + ' = ' + (t[2] * t[2]) + (ok ? ' = ' : ' ≠ ') + (c2 * c2) + ' → ' + (ok ? 'ja' : 'nein') };
    };
    // M9 L8 Pythagoras im Alltag und in Körpern
    T.pythagorasAlltag = function (sp, lvl) {
      var t = pick(TRIPEL.slice(0, 6)), w = pick(lvl === 'basis' ? ['leiter', 'bildschirm', 'feld'] : lvl === 'kern' ? ['leiter', 'rampe', 'bildschirm', 'feld', 'drachen'] : ['raum', 'raum', 'rampe', 'drachen']);
      if (w === 'leiter') return { a: 'Eine Leiter lehnt an der Wand. Ihr Fuß steht ' + t[0] + ' dm von der Wand, oben berührt sie die Wand in ' + t[1] + ' dm Höhe. Wie lang ist die Leiter?', l: '√(' + (t[0] * t[0]) + ' + ' + (t[1] * t[1]) + ') = √' + (t[2] * t[2]) + ' = ' + t[2] + ' dm' };
      if (w === 'bildschirm') return { a: 'Ein Bildschirm ist ' + (t[1] * 2) + ' cm breit und ' + (t[0] * 2) + ' cm hoch. Wie lang ist die Diagonale?', l: '√(' + (4 * t[1] * t[1]) + ' + ' + (4 * t[0] * t[0]) + ') = ' + (2 * t[2]) + ' cm' };
      if (w === 'feld') return { a: 'Ein rechteckiges Feld ist ' + (t[1] * 10) + ' m lang und ' + (t[0] * 10) + ' m breit. Wie lang ist der Weg quer über das Feld?', l: '√(' + grp(100 * t[1] * t[1]) + ' + ' + grp(100 * t[0] * t[0]) + ') = ' + (10 * t[2]) + ' m' };
      if (w === 'rampe') return { a: 'Eine Rampe ist ' + t[2] + ' m lang und überwindet ' + t[0] + ' m Höhe. Wie weit reicht sie waagerecht?', l: '√(' + (t[2] * t[2]) + ' − ' + (t[0] * t[0]) + ') = ' + t[1] + ' m' };
      if (w === 'drachen') return { a: 'Die Schnur eines Drachens ist ' + (t[2] * 5) + ' m lang. ' + N2() + ' steht ' + (t[0] * 5) + ' m vom Punkt genau unter dem Drachen entfernt. Wie hoch fliegt der Drachen?', l: '√(' + (25 * t[2] * t[2]) + ' − ' + (25 * t[0] * t[0]) + ') = ' + (5 * t[1]) + ' m' };
      // Raumdiagonale im Quader: erst Bodendiagonale, dann Raumdiagonale (zweimal Pythagoras)
      var q = pick([[3, 4, 12, 5, 13], [6, 8, 24, 10, 26], [2, 3, 6, 0, 7], [1, 2, 2, 0, 3], [4, 4, 7, 0, 9]]);
      var boden = q[0] * q[0] + q[1] * q[1];
      return { a: 'Quader: ' + q[0] + ' cm × ' + q[1] + ' cm × ' + q[2] + ' cm. Wie lang ist die Raumdiagonale?', l: 'Boden: d² = ' + (q[0] * q[0]) + ' + ' + (q[1] * q[1]) + ' = ' + boden + '; Raum: ' + boden + ' + ' + (q[2] * q[2]) + ' = ' + (q[4] * q[4]) + ' → ' + q[4] + ' cm' };
    };
    // M8 L8 Dreiecke konstruieren: geht das überhaupt? (Dreiecksungleichung) und dritter Winkel
    T.dreieckMoeglich = function (sp, lvl) {
      if (R() < 0.4) { var w1 = ri(25, 80), w2 = ri(25, 150 - w1); return { a: 'Ein Dreieck hat die Winkel ' + w1 + '° und ' + w2 + '°. Wie groß ist der dritte Winkel?', l: '180° − ' + w1 + '° − ' + w2 + '° = ' + (180 - w1 - w2) + '°' }; }
      var a = ri(2, 9), b = ri(2, 9), geht = R() < 0.5, c = geht ? ri(Math.abs(a - b) + 1, a + b - 1) : a + b + ri(0, 3);
      var s3 = [a, b, c].sort(function (x, y) { return x - y; }), k2 = s3[0] + s3[1];
      return { a: 'Kann man ein Dreieck mit ' + a + ' cm, ' + b + ' cm und ' + c + ' cm zeichnen?', l: (k2 > s3[2] ? 'Ja: ' : 'Nein: ') + s3[0] + ' + ' + s3[1] + ' = ' + k2 + (k2 > s3[2] ? ' > ' : k2 === s3[2] ? ' = ' : ' < ') + s3[2] + (k2 > s3[2] ? '' : ' (die zwei kürzeren Seiten sind zusammen nicht länger als die längste)') };
    };
    // M8 L9 Höhen, Mittelsenkrechte, Winkelhalbierende: Fragen, die man ohne Zeichnung beantworten kann
    T.geoLinien = function (sp, lvl) {
      var w = pick(lvl === 'basis' ? ['mitte', 'halb', 'pmitte', 'abstand'] : ['mitte', 'halb', 'halb2', 'pmitte', 'innen', 'innen', 'dritte']);
      if (w === 'mitte') { var l = ri(5, 15); return { a: 'Eine Strecke AB ist ' + l + ' cm lang. Wo schneidet die Mittelsenkrechte die Strecke?', l: 'in der Mitte, ' + de(l / 2) + ' cm von A' }; }
      if (w === 'halb') { var a = ri(10, 85) * 2; return { a: 'Ein Winkel hat ' + a + '°. Wie groß sind die beiden Teile nach der Winkelhalbierenden?', l: 'je ' + (a / 2) + '°' }; }
      if (w === 'halb2') { var h = ri(15, 80); return { a: 'Die Winkelhalbierende teilt einen Winkel in zwei Teile zu je ' + h + '°. Wie groß ist der ganze Winkel?', l: (2 * h) + '°' }; }
      if (w === 'pmitte') { var d = de(ri(20, 90) / 10); return { a: 'P liegt auf der Mittelsenkrechten von AB und ist ' + d + ' cm von A entfernt. Wie weit ist P von B entfernt?', l: d + ' cm (gleich weit)' }; }
      if (w === 'abstand') { var e = ri(2, 9); return { a: 'Ein Punkt P liegt ' + e + ' cm über der Geraden g. Wie lang ist die Senkrechte von P auf g?', l: e + ' cm (der Abstand von P zu g)' }; }
      if (w === 'innen') { var stumpf = R() < 0.5, x = stumpf ? ri(95, 140) : ri(30, 85), y = stumpf ? ri(15, 175 - x - 10) : ri(30, Math.min(85, 170 - x));
        return { a: 'Im Dreieck ABC sind α = ' + x + '° und β = ' + y + '°. Liegt die Höhe h_c innerhalb oder außerhalb des Dreiecks?', l: (x > 90 || y > 90 ? 'außerhalb (α ist stumpf – die Seite c verlängern)' : 'innerhalb (α und β sind spitz)') }; }
      var al = ri(4, 9) * 10, be = ri(3, 8) * 10; if (al + be >= 170) be = 40; var ga = 180 - al - be;
      return { a: 'Im Dreieck sind α = ' + al + '° und β = ' + be + '°. Die Winkelhalbierende von γ teilt γ in zwei Teile. Wie groß ist jeder Teil?', l: 'γ = ' + ga + '°; je ' + de(ga / 2) + '°' };
    };
