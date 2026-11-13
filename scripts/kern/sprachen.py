import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from basis import *

BL = []
JN = lambda saetze: T(['Satz', 'ja', 'nein'], [[s, '', ''] for s in saetze], breiten=[4, 1, 1])
KREUZ = lambda titel, items, spalten=3: {'art': 'ankreuzen', 'titel': titel, 'items': items, 'spalten': spalten}

# ---------------------------------------------------------------- Sprechen (S1–S4)
BL.append(blatt('kk-s1-gut-sprechen', 'sprechen', 'S1', 'Gut miteinander sprechen', 'Das A und O im Gespräch: anschauen, zuhören, deutlich sprechen', 'icon:messages', [
    I('Das A und O', ['Ich schaue die Person an.', 'Ich spreche deutlich und nicht zu schnell.', 'Ich lasse die andere Person ausreden.', 'Ich bleibe beim Thema.']),
    A('Was gehört zu einem guten Gespräch? Kreuze an.', 1, 'ankreuzen'),
    {'art': 'ankreuzen', 'items': ['anschauen', 'dazwischenrufen', 'zuhören', 'wegdrehen', 'deutlich sprechen', 'nachfragen', 'nuscheln', 'ausreden lassen'], 'spalten': 2},
    A('Sprich drei Minuten mit einem Partner. Diese Satzanfänge helfen.', 1, ['sprechen', 'partner']),
    I(punkte=['„Am Wochenende habe ich …“', '„Ich mag gern …“', '„Und du?“', '„Erzähl mal mehr!“'], symbol='hilfe'),
    A('Was hat geklappt? Hake ab.', 2),
    ABH(['Ich habe meinen Partner angeschaut.', 'Ich habe ausreden lassen.', 'Ich habe deutlich gesprochen.', 'Ich habe eine Frage gestellt.']),
], 'Das Kind kennt die Grundregeln eines Gesprächs und wendet sie in einem kurzen Partnergespräch an.',
   ['Zwei Erwachsene oder Kinder spielen ein schlechtes Gespräch vor (wegschauen, unterbrechen). Was fällt auf?', 'Die vier Regeln gemeinsam lesen und mit einer Geste verbinden.', 'Partnergespräch mit Sanduhr; danach abhaken, was geklappt hat.'],
   'Gesprächsregeln lernen Kinder nicht durch Erklären, sondern durch Vormachen, Üben und Rückmeldung. Blickkontakt, Sprecherwechsel und deutliche Artikulation sind einzelne Fertigkeiten, die sich getrennt üben lassen. Ein festes Thema und Satzanfänge entlasten Kinder mit kleinem Wortschatz: Sie können sich auf das Wie konzentrieren. Kurze, häufige Gesprächszeiten (drei Minuten) bringen mehr als seltene lange.',
   ['1) anschauen, zuhören, deutlich sprechen, nachfragen, ausreden lassen'],
   'Nur zwei Regeln auswählen; mit Bildkarten arbeiten.', 'Ein Kind beobachtet das Gespräch und gibt eine Rückmeldung.', 'Sanduhr (3 Minuten)', schlag=['Gespräch', 'Kommunikation', 'Blickkontakt']))

BL.append(blatt('kk-s1-meine-woerter', 'sprechen', 'S1', 'Meine Wörter: in der Schule', 'Wörter zu einem Thema kennen und in Sätzen benutzen', 'icon:school', [
    A('Was ist das? Sag das Wort mit der, die oder das.', 1, 'sprechen'),
    B([('emoji:pencil', 'der Stift'), ('emoji:backpack', 'der Rucksack'), ('emoji:scissors', 'die Schere'), ('emoji:open-book', 'das Buch')], 4, klein=False),
    A('Sag zu jedem Bild einen Satz.', 1, 'sprechen'),
    I(punkte=['Das ist …', 'Ich brauche …', 'Wo ist …?'], symbol='hilfe'),
    A('Welches Wort passt? Schreib es in die Lücke.', 2, 'schreiben'),
    {'art': 'wortspeicher', 'items': ['Stift', 'Schere', 'Buch', 'Rucksack']},
    P(['Ich schneide mit der ____________.', 'Ich schreibe mit dem ____________.', 'Ich lese ein ____________.', 'Ich trage den ____________.'], 1),
    A('Neues Thema: Küche, Sport oder Tiere. Schreib drei Wörter auf.', 3, 'schreiben'),
    LIN(2),
], 'Das Kind benennt Dinge aus einem Themenfeld mit Artikel und verwendet die Wörter in einfachen Sätzen.',
   ['Die echten Gegenstände auf den Tisch legen, benennen und im Chor sprechen.', 'Mit den Satzanfängen kurze Sätze bilden, reihum.', 'Lücken füllen; das neue Thema gemeinsam sammeln (Wortspeicher an der Tafel).'],
   'Ein tragfähiger Basiswortschatz entsteht, wenn Wörter in einem Themenfeld gelernt, mit echten Dingen oder Bildern verbunden und sofort in Sätzen gebraucht werden. Der Artikel gehört von Anfang an zum Wort. Zehn bis zwölf Wörter pro Thema reichen; wichtiger als die Menge ist das häufige Wiederholen in wechselnden Situationen. Für mehrsprachige Kinder hilft es, das Wort auch in der Familiensprache zu nennen.',
   ['3) Schere · Stift · Buch · Rucksack'],
   'Nur vier Wörter, mit den echten Gegenständen.', 'Zu jedem Wort einen eigenen Satz schreiben.', 'Stift, Rucksack, Schere, Buch', schlag=['Wortschatz', 'Artikel', 'Sätze bilden']))

BL.append(blatt('kk-s2-ich-stelle-vor', 'sprechen', 'S2', 'Ich stelle etwas vor', 'Vor anderen sprechen – mit einem Bild als Hilfe', 'icon:podium', [
    I('So stellst du etwas vor', ['Anfang: „Ich stelle euch … vor.“', 'Mitte: Zeig dein Bild. Erzähl drei Dinge.', 'Schluss: „Habt ihr Fragen?“']),
    A('Was stellst du vor? Male es oder klebe ein Bild ein.', 1, 'malen'),
    FELD(hoehe=7),
    A('Schreib drei Stichwörter. Mehr brauchst du nicht.', 1, 'schreiben'),
    P(['1. ____________________', '2. ____________________', '3. ____________________'], 1),
    A('Übe vor einem Partner. Hake ab.', 2, 'partner'),
    ABH(['Ich stehe ruhig.', 'Ich spreche laut genug.', 'Ich schaue die anderen an.', 'Ich zeige auf mein Bild.']),
], 'Das Kind präsentiert etwas Eigenes (Lieblingsding, Tier, Hobby) in drei Schritten vor einer kleinen Gruppe und nutzt dabei ein Bild.',
   ['Selbst eine Mini-Präsentation vormachen (30 Sekunden) – Anfang, Mitte, Schluss benennen.', 'Thema wählen lassen, Bild malen, drei Stichwörter finden.', 'Erst zu zweit üben, dann in der Kleingruppe vortragen; die Gruppe klatscht und stellt eine Frage.'],
   'Vor anderen zu sprechen ist für viele Kinder mit Angst verbunden. Sicherheit geben ein fester Ablauf, ein Bild zum Festhalten und ein Thema, bei dem das Kind Experte ist. Stichwörter statt ganzer Sätze verhindern das Ablesen. Die Gruppe wird schrittweise größer: erst ein Partner, dann drei Kinder, dann die Klasse. Rückmeldung sollte immer mit dem beginnen, was gelungen ist.',
   None, 'Nur einen Satz zum Bild sagen; die Lehrperson steht daneben.', 'Ohne Stichwörter vortragen und eine Frage der Gruppe beantworten.', schlag=['Präsentieren', 'Vortrag', 'freies Sprechen'], sozial=('einzeln', 'gruppe', 'klasse'), dauer='30–40 Min.'))

BL.append(blatt('kk-s3-zuerst-dann', 'sprechen', 'S3', 'Zuerst – dann – zum Schluss', 'Strukturiert erzählen mit Bildern und Satzanfängen', 'icon:timeline', [
    I('Der rote Faden', ['Zuerst …', 'Dann …', 'Danach …', 'Zum Schluss …']),
    A('Hände waschen: Erzähl in der richtigen Reihenfolge.', 1, 'sprechen'),
    {'art': 'schritte', 'stil': 'kette', 'items': [{'titel': 'Zuerst', 'text': 'Wasser an'}, {'titel': 'Dann', 'text': 'Seife nehmen'}, {'titel': 'Danach', 'text': 'reiben, abspülen'}, {'titel': 'Zum Schluss', 'text': 'abtrocknen'}]},
    A('Ein Brot schmieren: Nummeriere von 1 bis 4.', 2),
    P(['___ Ich esse das Brot.', '___ Ich hole Brot und Butter.', '___ Ich lege Käse darauf.', '___ Ich streiche Butter auf das Brot.'], 1),
    A('Was machst du am Morgen? Schreib oder male.', 2, 'schreiben'),
    {'art': 'satzanfaenge', 'items': ['Zuerst', 'Dann', 'Zum Schluss'], 'linien': 1},
], 'Das Kind erzählt einen bekannten Ablauf in der richtigen Reihenfolge und benutzt dabei Wörter wie zuerst, dann, zum Schluss.',
   ['Einen Ablauf wirklich tun (Hände waschen) und dabei mitsprechen.', 'Die vier Wörter als Karten an die Tafel hängen; Kinder erzählen entlang der Karten.', 'Brot-Aufgabe nummerieren, dann den eigenen Morgen erzählen und aufschreiben.'],
   'Strukturiertes Erzählen braucht eine innere Reihenfolge und die sprachlichen Mittel, sie auszudrücken. Zeitwörter wie zuerst, dann und zum Schluss sind dafür das Gerüst. Am leichtesten gelingt es bei Handlungen, die das Kind selbst ausgeführt hat; Piktogramme halten die Schritte sichtbar. Wer mündlich in drei Schritten erzählen kann, hat die Grundlage für kleine Texte und für das Verstehen von Arbeitsanweisungen.',
   ['2) 4 · 1 · 3 · 2'],
   'Mit drei Bildkarten legen statt schreiben.', 'Einen Ablauf mit fünf Schritten erzählen (z. B. Schulweg).', schlag=['Erzählen', 'Reihenfolge', 'Piktogramme']))

BL.append(blatt('kk-s4-meine-hilfen', 'sprechen', 'S4', 'Meine Hilfen beim Sprechen', 'Hilfen kennen und selbst benutzen', 'icon:lifebuoy', [
    I(text='Hilfen sind erlaubt. Wer eine Hilfe nimmt, ist klug.', symbol='tipp'),
    A('Welche Hilfe ist das? Verbinde.', 1, 'verbinden'),
    Z(['Wortspeicher', 'Satzanfang', 'Bildkarte', 'Nachfragen'], ['Ein Bild zeigt mir das Wort.', '„Kannst du das wiederholen?“', 'Hier stehen Wörter zum Thema.', '„Ich möchte …“ – so fange ich an.']),
    A('Was hilft dir? Kreuze an.', 1, 'ankreuzen'),
    {'art': 'ankreuzen', 'items': ['Bilder', 'Wörter an der Tafel', 'Satzanfänge', 'mehr Zeit', 'ein Partner', 'vorher üben'], 'spalten': 2},
    A('Diese Sätze darfst du immer sagen. Lies sie laut.', 2, 'sprechen'),
    I(punkte=['„Wie heißt das Wort?“', '„Kannst du langsamer sprechen?“', '„Ich brauche kurz Zeit.“', '„Kannst du mir helfen?“'], symbol='hilfe'),
    A('Welcher Satz ist dein Hilfe-Satz? Schreib ihn auf.', 2, 'schreiben'),
    LIN(2),
], 'Das Kind kennt Sprachhilfen (Wortspeicher, Satzanfänge, Bilder, Nachfragen) und greift von sich aus darauf zurück.',
   ['Die Hilfen im Raum zeigen: Wo hängt der Wortspeicher? Wo liegen Bildkarten?', 'Verbinden und ankreuzen; über die eigene Auswahl sprechen.', 'Hilfe-Sätze im Rollenspiel üben; den eigenen Satz auf eine Karte schreiben und auf den Tisch kleben.'],
   'Scaffolding bedeutet ein Gerüst auf Zeit: Hilfen, die das Kind eine Aufgabe schaffen lassen, die allein noch zu schwer wäre. Entscheidend ist, dass das Kind die Hilfen kennt und selbst wählt, statt auf die Lehrperson zu warten. Das stärkt Selbstständigkeit und nimmt Scham. Hilfen werden mit der Zeit abgebaut – zuerst die stärkste. Der Satz „Ich brauche kurz Zeit“ ist besonders wichtig für Kinder, die bei Druck verstummen.',
   ['1) Wortspeicher – Wörter zum Thema · Satzanfang – „Ich möchte …“ · Bildkarte – Bild zeigt das Wort · Nachfragen – „Kannst du das wiederholen?“'],
   'Nur zwei Hilfen einführen und eine Woche lang üben.', 'Das Kind erklärt einem anderen Kind eine Hilfe.', schlag=['Scaffolding', 'Hilfen nutzen', 'Selbstständigkeit']))

# ---------------------------------------------------------------- Hörverstehen (S5–S6)
BL.append(blatt('kk-s5-zuhoeren-nachfragen', 'sprechen', 'S5', 'Zuhören und nachfragen', 'Andere verstehen: anschauen, zuhören, nachfragen', 'icon:ear', [
    I('So höre ich zu', ['Ich schaue die Person an.', 'Ich bin still und warte.', 'Ich frage nach, wenn ich etwas nicht verstehe.']),
    A('Du hast etwas nicht verstanden. Was sagst du? Kreuze an.', 1, 'ankreuzen'),
    {'art': 'ankreuzen', 'items': ['„Kannst du das wiederholen?“', '„Egal.“', '„Was heißt das Wort?“', 'Ich sage nichts.', '„Meinst du …?“', 'Ich rate einfach.'], 'spalten': 2},
    A('Hör genau zu. Male, was deine Lehrperson sagt.', 2, ['zuhoeren', 'malen']),
    FELD(hoehe=8),
    A('Hast du nachgefragt? Schreib deine Frage auf.', 2, 'schreiben'),
    LIN(2),
], 'Das Kind wendet sich dem Sprecher zu, setzt mündliche Anweisungen um und fragt nach, wenn etwas unklar ist.',
   ['Zuhör-Regeln mit Gesten einführen (Augen, Mund, Ohr).', 'Mal-Diktat langsam vorlesen, jeden Satz nur einmal: „Male in die Mitte ein Haus. Male links neben das Haus einen Baum. Male über das Haus eine Sonne. Male vor das Haus einen Ball. Male auf das Dach einen Vogel.“', 'Bilder vergleichen. Wer hat nachgefragt? Nachfragen ausdrücklich loben.'],
   'Zuhören ist eine aktive Leistung: Aufmerksamkeit ausrichten, Gehörtes im Gedächtnis halten und mit Bekanntem verbinden. Viele Kinder merken, dass sie etwas nicht verstanden haben, sagen aber nichts – aus Scham oder weil ihnen die Worte fehlen. Feste Nachfrage-Sätze senken diese Hürde. Das Mal-Diktat zeigt sofort, was angekommen ist, und übt nebenbei Raumwörter wie links, über und vor.',
   ['1) „Kannst du das wiederholen?“ · „Was heißt das Wort?“ · „Meinst du …?“', '2) Haus in der Mitte, Baum links, Sonne darüber, Ball davor, Vogel auf dem Dach'],
   'Nur drei Anweisungen; jede zweimal sagen.', 'Ein Kind diktiert einem Partner ein eigenes Bild.', schlag=['Zuhören', 'Nachfragen', 'Hörverstehen']))

BL.append(blatt('kk-s6-durchsage', 'sprechen', 'S6', 'Genau hinhören: die Durchsage', 'Einen gehörten Text verstehen und wiedergeben', 'icon:speakerphone', [
    I('Vor dem Hören', ['Lies zuerst die Fragen.', 'Du hörst den Text zweimal.'], symbol='tipp'),
    A('Hör zu. Kreuze die richtige Antwort an.', 1, ['zuhoeren', 'ankreuzen']),
    KREUZ('Wohin gehen wir?', ['ins Kino', 'ins Schwimmbad', 'in den Zoo']),
    KREUZ('Wann treffen wir uns?', ['um 8 Uhr', 'um 9 Uhr', 'um 10 Uhr']),
    KREUZ('Wo treffen wir uns?', ['am Bus', 'im Hof', 'in der Klasse']),
    A('Was sollst du mitbringen? Schreib zwei Dinge.', 2, 'schreiben'),
    LIN(2),
    A('Erzähl einem Partner, was du gehört hast.', 2, ['sprechen', 'partner']),
    I(punkte=['Am Freitag …', 'Wir treffen uns …', 'Ich bringe … mit.'], symbol='hilfe'),
], 'Das Kind achtet beim Hören auf vorher genannte Informationen (Wohin? Wann? Wo? Was mitbringen?) und gibt sie wieder.',
   ['Die Fragen gemeinsam lesen: Worauf müssen wir achten?', 'Den Hörtext zweimal ruhig vorlesen oder als Aufnahme abspielen: „Achtung, eine Durchsage: Am Freitag gehen wir ins Schwimmbad. Wir treffen uns um 9 Uhr am Bus. Bitte bringt Badesachen und ein Handtuch mit.“', 'Ankreuzen, aufschreiben, dann mit den Satzanfängen wiedergeben.'],
   'Gezieltes Hören gelingt besser, wenn das Kind vorher weiß, worauf es achten soll. Die Fragen vor dem Hören wirken wie ein Filter und entlasten das Arbeitsgedächtnis. Der Text ist kurz und alltagsnah; eine echte Aufnahme (Handy) erhöht den Anspruch, weil Mimik und Mundbild fehlen. Das Wiedergeben mit eigenen Worten zeigt, ob der Inhalt verstanden und nicht nur wiedererkannt wurde.',
   ['1) ins Schwimmbad · um 9 Uhr · am Bus', '2) Badesachen, Handtuch'],
   'Text Satz für Satz vorlesen und nach jedem Satz ankreuzen.', 'Eine eigene Durchsage aufnehmen; die Gruppe beantwortet drei Fragen dazu.', 'Hörtext auf dieser Seite, eventuell Aufnahmegerät', schlag=['Hörverstehen', 'Aufnahme', 'Informationen entnehmen']))

BL.append(blatt('kk-s6-wetterbericht', 'sprechen', 'S6', 'Genau hinhören: das Wetter', 'Einen gehörten Text verstehen und wiedergeben', 'icon:cloud-rain', [
    I('Vor dem Hören', ['Lies zuerst die Aufgaben.', 'Du hörst den Text zweimal.'], symbol='tipp'),
    A('Hör zu. Wie ist das Wetter? Verbinde.', 1, ['zuhoeren', 'verbinden']),
    Z(['am Morgen', 'am Mittag', 'am Abend'], ['Wind', 'Regen', 'Sonne']),
    A('Wie warm wird es? Kreuze an.', 1, 'ankreuzen'),
    {'art': 'ankreuzen', 'items': ['8 Grad', '18 Grad', '28 Grad'], 'spalten': 3},
    A('Was brauchst du morgen früh? Kreise ein.', 2, 'einkreisen'),
    B([('emoji:umbrella', 'Schirm'), ('emoji:sunglasses', 'Sonnenbrille'), ('emoji:coat', 'Jacke'), ('emoji:shorts', 'kurze Hose')], 4, 'einkreisen'),
    A('Sag das Wetter mit eigenen Worten.', 2, 'sprechen'),
    {'art': 'satzanfaenge', 'items': ['Am Morgen', 'Am Mittag'], 'linien': 1},
], 'Das Kind entnimmt einem kurzen Hörtext Informationen zu Tageszeit, Wetter und Temperatur und gibt sie wieder.',
   ['Wetterwörter klären (Regen, Sonne, Wind, Grad).', 'Den Hörtext zweimal vorlesen oder abspielen: „Das Wetter für morgen: Am Morgen regnet es. Am Mittag kommt die Sonne. Es wird 18 Grad warm. Am Abend ist es windig.“', 'Aufgaben lösen und das Wetter mündlich wiedergeben.'],
   'Der Wetterbericht ist ein echter Hörtext mit klarer Struktur: Tageszeit plus Wetter. Er eignet sich gut, um das Mitverfolgen mehrerer Informationen zu üben. Die Aufgabe „Was brauchst du?“ verlangt einen Schluss aus dem Gehörten – das ist eine Stufe schwieriger als reines Wiedererkennen. Wer mag, hört an den folgenden Tagen den echten Wetterbericht und vergleicht ihn mit dem Blick aus dem Fenster.',
   ['1) Morgen – Regen · Mittag – Sonne · Abend – Wind', '2) 18 Grad', '3) Schirm, Jacke'],
   'Vor dem Hören Bildkarten zu den Wetterwörtern zeigen.', 'Selbst einen Wetterbericht für morgen sprechen.', schlag=['Hörverstehen', 'Wetter', 'Informationen entnehmen']))

# ---------------------------------------------------------------- Leseverstehen (S7–S11)
BL.append(blatt('kk-s7-im-text-finden', 'lesen', 'S7', 'Ich finde es im Text', 'Einen kurzen Text lesen und Informationen wiederfinden', 'icon:search', [
    I('So findest du die Antwort', ['Lies die Frage.', 'Such das wichtige Wort im Text.', 'Unterstreiche die Stelle.'], symbol='tipp'),
    A('Lies den Text.', 1, 'lesen'),
    {'art': 'geschichte', 'titel': 'Im Park', 'text': 'Lina geht mit ihrem Hund Bello in den Park. Dort trifft sie ihren Freund Tom. Tom hat einen roten Ball dabei. Die Kinder werfen den Ball. Bello holt ihn immer wieder zurück.'},
    A('Antworte. Die Antwort steht im Text.', 1, 'schreiben'),
    P(['Wie heißt der Hund? ______________', 'Wohin geht Lina? ______________', 'Wen trifft sie? ______________', 'Welche Farbe hat der Ball? ______________'], 1),
    A('Stimmt das? Kreuze an.', 2, 'ankreuzen'),
    JN(['Lina hat eine Katze.', 'Tom hat einen Ball dabei.', 'Bello holt den Ball zurück.']),
], 'Das Kind liest einen Text aus fünf Sätzen und findet Informationen wieder, nach denen gefragt wird.',
   ['Überschrift lesen: Worum könnte es gehen?', 'Text leise lesen, dann gemeinsam laut. Unbekannte Wörter klären.', 'Fragen beantworten und jede Antwort im Text unterstreichen lassen.'],
   'Beim sinnentnehmenden Lesen geht es zuerst um wörtlich genannte Informationen: wer, wo, was. Das Unterstreichen zwingt zum genauen Zurückgehen in den Text und verhindert Raten aus dem Gedächtnis. Kurze Texte mit bekannten Wörtern halten die Mühe des Erlesens gering, damit Kraft für das Verstehen bleibt. Die Ja-Nein-Sätze prüfen, ob das Kind Aussagen mit dem Text vergleicht.',
   ['2) Bello · in den Park · Tom · rot', '3) nein · ja · ja'],
   'Text vorlesen; das Kind zeigt die Antwort im Text.', 'Selbst eine Frage zum Text schreiben.', schlag=['Leseverstehen', 'Informationen finden', 'Text']))

BL.append(blatt('kk-s7-einladung', 'lesen', 'S7', 'Die Einladung', 'Einen Alltagstext lesen: Wer? Wann? Wo?', 'icon:mail', [
    A('Lies die Einladung.', 1, 'lesen'),
    {'art': 'geschichte', 'titel': 'Einladung', 'text': 'Liebe Mia, ich lade dich zu meinem Geburtstag ein. Wir feiern am Samstag um 15 Uhr. Die Feier ist bei mir zu Hause, Gartenweg 4. Bitte bring Hausschuhe mit. Dein Ben'},
    A('Unterstreiche im Text: den Tag, die Uhrzeit, den Ort.', 1),
    A('Antworte.', 1, 'schreiben'),
    P(['Wer lädt ein? ______________', 'An welchem Tag? ______________', 'Um wie viel Uhr? ______________', 'Wo ist die Feier? ______________', 'Was bringt Mia mit? ______________'], 1),
    A('Schreib Ben eine Antwort.', 2, 'schreiben'),
    LIN(3, 'Lieber Ben,'),
], 'Das Kind entnimmt einem Alltagstext (Einladung) die wichtigen Angaben: wer, wann, wo, was mitbringen.',
   ['Echte Einladungen oder Zettel zeigen: Was muss man daraus wissen?', 'Text lesen, Tag, Uhrzeit und Ort farbig unterstreichen.', 'Fragen beantworten; die Antwort an Ben gemeinsam beginnen.'],
   'Einladungen, Zettel und Nachrichten sind die Texte, die Kinder im Alltag wirklich lesen müssen. Sie enthalten wenige, aber wichtige Angaben. Das gezielte Suchen nach Tag, Uhrzeit und Ort ist eine Lesestrategie, die sich auf Fahrpläne, Aushänge und Formulare übertragen lässt. Die kurze Antwort verbindet Lesen und Schreiben und zeigt, ob der Zweck des Textes verstanden wurde.',
   ['3) Ben · am Samstag · um 15 Uhr · bei Ben zu Hause, Gartenweg 4 · Hausschuhe'],
   'Nur Tag und Uhrzeit suchen.', 'Eine eigene Einladung mit Tag, Uhrzeit und Ort schreiben.', schlag=['Leseverstehen', 'Alltagstext', 'Einladung']))

BL.append(blatt('kk-s8-lesehilfen', 'lesen', 'S8', 'Meine Lesehilfen', 'Lesehilfen kennen und bei verschiedenen Texten benutzen', 'icon:eyeglass', [
    I('Diese Hilfen gibt es', ['Lesefinger: Ich zeige auf jedes Wort.', 'Lesepfeil oder Lineal: Ich sehe nur eine Zeile.', 'Silbenbögen: Ich teile lange Wörter.', 'Schwere Wörter lese ich zweimal.']),
    A('Male Silbenbögen unter die Wörter. Lies sie dann.', 1),
    P(['Scho-ko-la-de', 'Re-gen-bo-gen', 'Ba-de-ho-se', 'Ge-burts-tag', 'Te-le-fon', 'Fuß-ball-platz'], 3),
    A('Lies den Text mit einer Lesehilfe.', 1, 'lesen'),
    {'art': 'geschichte', 'titel': 'Am Kiosk', 'text': 'Heute kaufe ich mir ein Eis. Ich nehme Schokolade und Zitrone. Das Eis kostet zwei Euro. Es schmeckt sehr lecker.'},
    A('Was für ein Text ist das? Verbinde.', 2, 'verbinden'),
    Z(['„Man nehme 2 Eier und Mehl.“', '„Bus 12 – Abfahrt 8:15“', '„Hallo Oma, wie geht es dir?“'], ['Fahrplan', 'Nachricht', 'Rezept']),
], 'Das Kind benutzt Lesehilfen (Finger, Lesepfeil, Silbenbögen) und erkennt verschiedene Textsorten aus dem Alltag.',
   ['Lesepfeil oder Lineal austeilen und an einem Satz zeigen, wie man die Zeile hält.', 'Silbenbögen setzen und Wörter schwingend lesen.', 'Text mit einer selbst gewählten Hilfe lesen; danach Textsorten zuordnen und echte Beispiele zeigen.'],
   'Lesehilfen verringern die Belastung beim Erlesen: Der Finger führt die Augen, der Lesepfeil blendet die übrigen Zeilen aus, Silbenbögen zerlegen lange Wörter in überschaubare Teile. Kinder sollen mehrere Hilfen ausprobieren und merken, welche ihnen nützt. Verschiedene Textsorten (Rezept, Fahrplan, Nachricht) verlangen verschiedenes Lesen – genau oder suchend. Das früh zu erleben, macht Lesen sinnvoll.',
   ['3) Rezept · Fahrplan · Nachricht'],
   'Nur zwei Sätze des Textes; größere Schrift auf Kopie.', 'Einen echten Fahrplan oder ein Rezept mitbringen und eine Angabe heraussuchen.', 'Lesepfeil oder Lineal', schlag=['Lesehilfen', 'Silbenbögen', 'Textsorten']))

BL.append(blatt('kk-s9-silben-lesen', 'lesen', 'S9', 'Silben lesen', 'Silben lesen und zu Wörtern zusammensetzen', 'icon:alphabet-latin', [
    I('So liest du', ['Lies langsam, Silbe für Silbe.', 'Schwinge jede Silbe mit der Hand.'], symbol='tipp'),
    A('Lies die Silben. Erst jede Zeile, dann jede Spalte.', 1, 'lesen'),
    P(['ma', 'me', 'mi', 'mo', 'la', 'le', 'li', 'lo', 'sa', 'se', 'si', 'so', 'ra', 're', 'ru', 'nu'], 4),
    A('Setz die Silben zusammen. Schreib das Wort.', 1, 'schreiben'),
    P(['Ma + ma = ________', 'Na + se = ________', 'Ro + se = ________', 'La + ma = ________', 'So + fa = ________', 'Li + mo = ________']),
    A('Lies die Wörter. Welches Bild passt? Verbinde.', 2, 'verbinden'),
    B([('emoji:nose', None), ('emoji:rose', None), ('emoji:tomato', None), ('emoji:banana', None)], 4),
    {'art': 'wortspeicher', 'items': ['To-ma-te', 'Na-se', 'Ba-na-ne', 'Ro-se']},
], 'Das Kind liest offene Silben (Konsonant + Vokal) sicher und setzt sie zu einfachen Wörtern zusammen.',
   ['Silben gemeinsam schwingen: Die Hand macht bei jeder Silbe einen Bogen.', 'Die Silben im Chor lesen, dann einzeln – auch durcheinander zeigen.', 'Wörter zusammensetzen und laut lesen; zum Schluss Wort und Bild verbinden.'],
   'Die Silbe ist die kleinste Sprecheinheit und für viele Kinder der Schlüssel zum Lesen: Wer Silben als Ganzes erkennt, muss nicht mehr Buchstabe für Buchstabe zusammenziehen. Begonnen wird mit offenen Silben aus Dauerkonsonant und Vokal (ma, la, so), weil sie sich gut dehnen lassen. Regelmäßiges kurzes Üben (täglich fünf Minuten) wirkt besser als lange Einheiten. Das Schwingen verbindet Sprechen, Bewegung und Schrift.',
   ['2) Mama · Nase · Rose · Lama · Sofa · Limo', '3) Tomate, Nase, Banane, Rose – jeweils zum passenden Bild'],
   'Nur zwei Zeilen; Silben mit Silbenkarten legen.', 'Eigene Wörter aus den Silben bauen (Lu-pe, Sa-la-mi).', 'Silbenkarten (optional)', schlag=['Silben', 'Lesen', 'Silbenschwingen']))

BL.append(blatt('kk-s9-silben-klatschen', 'lesen', 'S9', 'Silben klatschen', 'Wörter in Silben gliedern und Silben zählen', 'icon:hand-stop', [
    A('Sprich das Wort. Klatsche die Silben. Wie viele sind es?', 1, 'sprechen'),
    B([('emoji:banana', 'Banane'), ('emoji:dog', 'Hund'), ('emoji:tomato', 'Tomate'), ('emoji:sun', 'Sonne')], 4),
    P(['Banane: ___', 'Hund: ___', 'Tomate: ___', 'Sonne: ___', 'Schokolade: ___', 'Bus: ___', 'Telefon: ___', 'Regenschirm: ___'], 4),
    A('Male unter jede Silbe einen Bogen.', 1),
    P(['Nase', 'Tomate', 'Schokolade', 'Ball', 'Melone', 'Hose', 'Kamera', 'Maus'], 4),
    A('Sortiere die Wörter in die Tabelle.', 2, 'schreiben'),
    {'art': 'wortspeicher', 'items': ['Haus', 'Blume', 'Banane', 'Maus', 'Tomate', 'Sonne', 'Ball', 'Hose', 'Melone']},
    T(['1 Silbe', '2 Silben', '3 Silben'], zeilen=3),
], 'Das Kind gliedert gesprochene und geschriebene Wörter in Silben und bestimmt die Anzahl der Silben.',
   ['Namen der Kinder klatschen: Wer hat den längsten Namen?', 'Bildwörter sprechen, klatschen, Zahl aufschreiben.', 'Silbenbögen malen und die Wörter in die Tabelle sortieren.'],
   'Das Gliedern in Silben ist eine Grundfertigkeit der phonologischen Bewusstheit. Kinder, die Silben hören und klatschen können, lesen und schreiben lange Wörter leichter, weil sie sie in Teile zerlegen. Bewegung (klatschen, schwingen, hüpfen) macht die Silbe spürbar. Einsilbige Wörter sind für manche Kinder die Überraschung: Auch „Bus“ ist ein Wort, obwohl man nur einmal klatscht.',
   ['1) 3 · 1 · 3 · 2 · 4 · 1 · 3 · 3', '3) 1 Silbe: Haus, Maus, Ball · 2 Silben: Blume, Sonne, Hose · 3 Silben: Banane, Tomate, Melone'],
   'Nur klatschen und mit Plättchen legen, ohne Schreiben.', 'Eigene Wörter mit vier Silben finden.', schlag=['Silben', 'phonologische Bewusstheit', 'klatschen']))

BL.append(blatt('kk-s9-woerter-bauen', 'lesen', 'S9', 'Wörter aus Silben bauen', 'Silben verbinden, fehlende Silben finden', 'icon:puzzle', [
    A('Welche Silben gehören zusammen? Verbinde und lies das Wort.', 1, 'verbinden'),
    Z(['Son', 'Blu', 'Ho', 'Ta', 'Tü'], ['se', 'sche', 'ne', 're', 'me']),
    A('Welche Silbe fehlt? Schreib sie in die Lücke.', 2, 'schreiben'),
    {'art': 'wortspeicher', 'items': ['ne', 'ma', 'Me', 'de', 'fon', 'fant']},
    P(['Ba-na-____', 'To-____-te', '____-lo-ne', 'Scho-ko-la-____', 'Te-le-____', 'E-le-____']),
    A('Bau drei Wörter aus den Silben. Schreib sie auf.', 2, 'schreiben'),
    {'art': 'wortspeicher', 'items': ['Na', 'Ro', 'Do', 'se', 'se', 'se']},
    P(['____________', '____________', '____________'], 3),
], 'Das Kind setzt Silben zu Wörtern zusammen und ergänzt fehlende Silben in bekannten Wörtern.',
   ['Silbenkarten an die Tafel hängen und gemeinsam zwei Wörter bauen.', 'Verbinden und jedes Wort laut lesen.', 'Fehlende Silben ergänzen; die drei Wörter am Schluss vorlesen lassen.'],
   'Beim Zusammensetzen von Silben erlebt das Kind, dass Wörter aus Bausteinen bestehen, die sich wiederholen: Die Silbe „se“ steckt in Nase, Rose, Dose und Hose. Dieses Wiedererkennen beschleunigt das Lesen. Fehlende Silben zu ergänzen verlangt, das ganze Wort im Kopf zu sprechen – eine gute Übung für das innere Mitsprechen beim Schreiben. Bekannte, bildhafte Wörter halten die Aufgabe leicht.',
   ['1) Sonne · Blume · Hose · Tasche · Türe', '2) Banane · Tomate · Melone · Schokolade · Telefon · Elefant', '3) Nase · Rose · Dose'],
   'Mit Silbenkarten legen statt schreiben.', 'Eigene Silbenrätsel für einen Partner schreiben.', 'Silbenkarten (optional)', schlag=['Silben', 'Wortaufbau', 'Lesen']))

BL.append(blatt('kk-s10-wort-und-bild', 'lesen', 'S10', 'Wort und Bild', 'Häufige Wörter lesen und verstehen', 'icon:photo', [
    A('Lies das Wort. Kreise das passende Bild ein.', 1, ['lesen', 'einkreisen']),
    TX('Haus'),
    B([('emoji:deciduous-tree', None), ('emoji:house', None), ('emoji:door', None)], 3, 'einkreisen'),
    TX('Auto'),
    B([('emoji:bus', None), ('emoji:bicycle', None), ('emoji:automobile', None)], 3, 'einkreisen'),
    A('Schreib das Wort unter das Bild.', 1, 'schreiben'),
    {'art': 'wortspeicher', 'items': ['Sonne', 'Maus', 'Bett', 'Fisch']},
    B([('emoji:bed', '________'), ('emoji:sun', '________'), ('emoji:fish', '________'), ('emoji:mouse', '________')], 4),
    A('Lies schnell. Wie viele Wörter schaffst du in einer Minute?', 2, 'lesen'),
    P(['Mama', 'Papa', 'Hund', 'Haus', 'Ball', 'Baum', 'Auto', 'Buch', 'Hand', 'Fuß', 'Tisch', 'Stuhl', 'Brot', 'Milch', 'Apfel', 'Schule'], 4),
], 'Das Kind liest häufige Namenwörter aus dem Grundwortschatz und ordnet ihnen die Bedeutung zu.',
   ['Wortkarten mit Bildern zeigen, benennen, lesen.', 'Wort lesen, Bild einkreisen; dann die Wörter unter die Bilder schreiben.', 'Blitzlesen mit Sanduhr: Zahl der gelesenen Wörter notieren und in einigen Tagen wiederholen.'],
   'Ein Grundwortschatz aus häufigen Wörtern trägt einen großen Teil aller Texte. Werden diese Wörter als Ganzes wiedererkannt, wird das Lesen flüssiger und es bleibt Aufmerksamkeit für den Sinn. Wichtig ist die Verbindung von Schriftbild, Klang und Bedeutung – deshalb Wort und Bild zusammen. Wiederholtes Lesen derselben Liste mit Zeitmessung zeigt dem Kind seinen eigenen Fortschritt.',
   ['1) Haus · Auto', '2) Bett · Sonne · Fisch · Maus'],
   'Nur acht Wörter der Liste; ohne Zeit.', 'Zu drei Wörtern einen Satz schreiben.', 'Sanduhr (1 Minute)', schlag=['Grundwortschatz', 'Wortlesen', 'Blitzlesen']))

BL.append(blatt('kk-s10-kleine-woerter', 'lesen', 'S10', 'Kleine Wörter – schnell gelesen', 'Die häufigsten kleinen Wörter auf einen Blick erkennen', 'icon:bolt', [
    A('Lies die kleinen Wörter. Jeden Tag ein bisschen schneller.', 1, 'lesen'),
    P(['der', 'die', 'das', 'und', 'ist', 'ein', 'eine', 'ich', 'du', 'er', 'sie', 'wir', 'in', 'mit', 'nicht', 'auch'], 4),
    A('Kreise in jeder Zeile das Wort „und“ ein.', 1, 'einkreisen'),
    P(['um   und   uns   nun   und', 'rund   und   Hund   an   und', 'und   bunt   und   unten   und'], 1),
    A('Der, die oder das? Schreib das kleine Wort davor.', 2, 'schreiben'),
    P(['____ Hund', '____ Katze', '____ Auto', '____ Schule', '____ Ball', '____ Buch'], 3),
    A('Würfle. Lies die Zeile so schnell du kannst.', 2, 'partner'),
    {'art': 'wuerfel', 'zeilen': ['ich – bin – und – der', 'du – hast – ein – das', 'er – ist – nicht – im', 'sie – hat – eine – die', 'wir – sind – auch – mit', 'es – ist – auf – in']},
], 'Das Kind erkennt die häufigsten Funktionswörter (der, und, ist, ein …) auf einen Blick.',
   ['Wörter als Karten kurz zeigen (Blitzkarten): eine Sekunde, dann nennen.', 'Liste lesen, „und“ suchen, Artikel einsetzen.', 'Würfelspiel zu zweit; nach einer Woche wiederholen.'],
   'Wenige kleine Wörter machen einen großen Teil jedes Textes aus. Sie haben kaum eigene Bedeutung und lassen sich schlecht mit Bildern verbinden – deshalb müssen sie als Sichtwörter automatisiert werden. Kurzes tägliches Blitzlesen ist dafür wirksamer als langes Üben. Ähnliche Wörter (um, uns, und) nebeneinander zwingen zum genauen Hinsehen und beugen dem Raten nach dem Wortanfang vor.',
   ['2) je dreimal „und“', '3) der Hund · die Katze · das Auto · die Schule · der Ball · das Buch'],
   'Nur die ersten zwei Zeilen der Liste.', 'Mit fünf kleinen Wörtern eigene Sätze bilden.', 'Würfel', schlag=['Sichtwörter', 'Grundwortschatz', 'Blitzlesen']))

BL.append(blatt('kk-s11-satz-und-bild', 'lesen', 'S11', 'Satz und Bild', 'Kleine Sätze lesen und verstehen', 'icon:book', [
    A('Lies den Satz. Kreise das passende Bild ein.', 1, ['lesen', 'einkreisen']),
    TX('Die Katze schläft.'),
    B([('emoji:dog', None), ('emoji:cat', None), ('emoji:fish', None)], 3, 'einkreisen'),
    TX('Ich esse einen Apfel.'),
    B([('emoji:red-apple', None), ('emoji:pizza', None), ('emoji:banana', None)], 3, 'einkreisen'),
    TX('Der Bus ist da.'),
    B([('emoji:bicycle', None), ('emoji:automobile', None), ('emoji:bus', None)], 3, 'einkreisen'),
    A('Stimmt das? Kreuze an.', 2, ['lesen', 'ankreuzen']),
    JN(['Ein Hund hat vier Beine.', 'Die Banane ist blau.', 'Im Winter ist es kalt.', 'Ein Fisch kann laufen.']),
], 'Das Kind liest kurze Sätze aus bekannten Wörtern und zeigt, dass es den Inhalt verstanden hat.',
   ['Den ersten Satz gemeinsam lesen: erst leise mit dem Finger, dann laut.', 'Die Bilder benennen, dann das passende einkreisen lassen.', 'Bei „Stimmt das?“ jeden Satz vorlesen lassen und begründen: „Warum nicht?“'],
   'Lesen heißt verstehen. Kurze Sätze mit drei bis fünf Wörtern verbinden das Erlesen einzelner Wörter mit dem Sinn. Die Auswahl zwischen Bildern zeigt ohne Schreiben, ob der Satz verstanden wurde. Unsinn-Sätze („Die Banane ist blau“) sind besonders wertvoll: Das Kind muss genau lesen und mit seinem Weltwissen vergleichen. Wichtig ist, dass der Wortschatz mündlich bekannt ist – sonst wird das Lesen zum Raten.',
   ['1) Katze · Apfel · Bus', '2) ja · nein · ja · nein'],
   'Sätze vorlesen und mitzeigen lassen; nur Aufgabe 1.', 'Einen eigenen Unsinn-Satz schreiben und vorlesen.', schlag=['Sätze lesen', 'Leseverstehen', 'Satz-Bild-Zuordnung']))

BL.append(blatt('kk-s11-lies-und-tu', 'lesen', 'S11', 'Lies und tu es', 'Kleine Sätze lesen und ausführen', 'icon:run', [
    A('Lies den Satz. Tu, was da steht. Hake ab.', 1, ['lesen', 'bewegen']),
    ABH(['Steh auf.', 'Klatsche zweimal.', 'Zeig auf die Tür.', 'Setz dich wieder hin.']),
    A('Lies den Satz. Male, was da steht.', 1, ['lesen', 'malen']),
    SP([TX('Die Sonne ist gelb.'), FELD(hoehe=4)], [TX('Der Ball ist rot.'), FELD(hoehe=4)]),
    SP([TX('Das Haus hat eine Tür.'), FELD(hoehe=4)], [TX('Am Baum hängen drei Äpfel.'), FELD(hoehe=4)]),
    A('Welches Wort passt? Kreise ein.', 2, 'einkreisen'),
    P(['Der Hund   bellt / fliegt.', 'Das Baby   weint / fährt.', 'Der Vogel   singt / schwimmt.', 'Ich trinke   Brot / Wasser.'], 2),
], 'Das Kind liest kurze Aufträge und Sätze und setzt sie in eine Handlung oder ein Bild um.',
   ['Einen Auftrag an die Tafel schreiben, still lesen lassen, alle führen ihn aus.', 'Aufträge einzeln lesen und tun; Partner kontrolliert.', 'Mal-Sätze lesen und zeichnen; beim Einkreisen den ganzen Satz vorlesen lassen.'],
   'Lese-Mal- und Lese-Tu-Aufgaben zeigen unmittelbar, ob ein Satz verstanden wurde – ohne dass das Kind schreiben oder viel sprechen muss. Die Bewegung lockert und motiviert auch Kinder, die Lesen mit Misserfolg verbinden. Details wie die Zahl der Äpfel oder die Farbe verlangen genaues Lesen bis zum Satzende. Die Auswahl zwischen zwei Verben schult das Mitdenken: Welches Wort ergibt Sinn?',
   ['3) bellt · weint · singt · Wasser'],
   'Aufträge mit Bildkarten unterstützen.', 'Selbst drei Aufträge für einen Partner schreiben.', 'Buntstifte', schlag=['Sätze lesen', 'Lese-Mal-Aufgabe', 'Leseverstehen']))

# ---------------------------------------------------------------- Schreiben (S12–S13)
BL.append(blatt('kk-s12-schreib-checkliste', 'schreiben', 'S12', 'Meine Schreib-Checkliste', 'Eigene Sätze mit einer Checkliste prüfen', 'icon:checklist', [
    A('Lies die Checkliste. Sie liegt beim Schreiben immer neben dir.', 1, 'lesen'),
    ABH(['Satzanfang groß?', 'Namenwörter groß? (der Hund, die Schule)', 'Punkt am Ende?', 'Fehlt ein Wort? Ich lese den Satz laut.'], 'Checkliste'),
    A('In jedem Satz sind Fehler. Schreib den Satz richtig.', 1, 'schreiben'),
    {'art': 'frage', 'text': 'der hund bellt laut', 'linien': 1},
    {'art': 'frage', 'text': 'ich gehe in die schule', 'linien': 1},
    {'art': 'frage', 'text': 'Am Montag spiele ich fußball', 'linien': 1},
    A('Schreib einen eigenen Satz. Prüfe ihn mit der Checkliste.', 2, 'schreiben'),
    LIN(2),
], 'Das Kind überprüft eigene Sätze selbstständig mit einer Checkliste (Großschreibung, Punkt, Vollständigkeit).',
   ['Die Checkliste gemeinsam lesen; zu jedem Punkt ein Beispiel an der Tafel.', 'Fehlersätze verbessern: Punkt für Punkt der Liste durchgehen.', 'Eigenen Satz schreiben und mit der Liste prüfen; die Liste ausschneiden und ins Heft kleben.'],
   'Kinder finden Fehler in eigenen Texten schwerer als in fremden, weil sie lesen, was sie meinten. Eine kurze Checkliste lenkt die Aufmerksamkeit nacheinander auf je ein Merkmal und macht das Überarbeiten zu einer überschaubaren Aufgabe. Wichtig ist, dass das Kind die Liste selbst zur Hand nimmt – erst mit Erinnerung, dann von sich aus. Drei bis vier Punkte reichen; die Liste wächst mit dem Können.',
   ['2) Der Hund bellt laut. · Ich gehe in die Schule. · Am Montag spiele ich Fußball.'],
   'Nur zwei Punkte der Liste: Satzanfang und Punkt.', 'Einen Text aus drei Sätzen schreiben und mit einem Partner tauschen.', schlag=['Checkliste', 'Überarbeiten', 'Großschreibung']))

BL.append(blatt('kk-s12-gross-klein-punkt', 'schreiben', 'S12', 'Groß, klein und Punkt', 'Großschreibung und Satzzeichen sicher setzen', 'icon:pencil-check', [
    I('Das merke ich mir', ['Am Satzanfang schreibe ich groß.', 'Namenwörter schreibe ich groß. Probe: der, die, das.', 'Am Satzende steht ein Punkt.']),
    A('Groß oder klein? Kreise den richtigen Buchstaben ein.', 1, 'einkreisen'),
    P(['D / d er   H / h und schläft.', 'I / i ch esse einen   A / a pfel.', 'M / m eine   M / m ama kocht.', 'W / w ir gehen in den   P / p ark.'], 1),
    A('Welche Wörter sind Namenwörter? Kreise sie ein.', 1, 'einkreisen'),
    {'art': 'wortspeicher', 'items': ['haus', 'laufen', 'ball', 'schön', 'katze', 'und', 'schule', 'rot']},
    A('Hier fehlen drei Punkte. Setz sie ein. Schreib den Text dann richtig ab.', 2, 'schreiben'),
    TX('Tim hat einen Hund der Hund heißt Rex Rex spielt gern im Garten'),
    LIN(3),
], 'Das Kind schreibt Satzanfänge und Namenwörter groß und setzt den Punkt am Satzende.',
   ['Artikelprobe üben: Passt der, die oder das davor? Dann groß.', 'Buchstaben einkreisen, Namenwörter suchen.', 'Text laut lesen: Wo macht die Stimme eine Pause? Dort steht der Punkt.'],
   'Die Großschreibung ist im Deutschen eine der häufigsten Fehlerquellen. Für den Anfang genügen zwei Regeln: Satzanfang und Namenwörter (Dinge, Tiere, Menschen), geprüft mit der Artikelprobe. Satzgrenzen hören Kinder am besten beim lauten Lesen – die Stimme senkt sich und macht eine Pause. Wer Punkte setzt, gliedert seine Gedanken; das hilft später auch beim Lesen längerer Texte.',
   ['1) Der Hund · Ich, Apfel · Meine Mama · Wir, Park', '2) Haus, Ball, Katze, Schule', '3) Tim hat einen Hund. Der Hund heißt Rex. Rex spielt gern im Garten.'],
   'Nur Satzanfänge und Punkte, noch ohne Namenwörter.', 'Einen Text aus vier Sätzen ohne Punkte für einen Partner schreiben.', schlag=['Großschreibung', 'Punkt', 'Namenwörter']))

BL.append(blatt('kk-s12-fresch', 'schreiben', 'S12', 'Richtig schreiben mit FRESCH', 'Vier Strategien: schwingen, verlängern, ableiten, merken', 'icon:bulb', [
    I('Vier Strategien', ['Schwingen: Ich spreche in Silben. To-ma-te', 'Verlängern: Hund oder Hunt? Viele Hunde – also Hund.', 'Ableiten: Bäume kommt von Baum – also äu.', 'Merken: Manche Wörter merke ich mir. Vater, Fahrrad']),
    A('Schwingen: Schreib das Wort in Silben.', 1, 'schreiben'),
    P(['Banane: ____________', 'Melone: ____________', 'Tomate: ____________', 'Kamera: ____________']),
    A('Verlängern: Welcher Buchstabe steht am Ende?', 2, 'schreiben'),
    P(['Hun___  (viele Hunde)', 'Zel___  (viele Zelte)', 'Ber___  (viele Berge)', 'Wal___  (viele Wälder)']),
    A('Ableiten: a oder ä? au oder äu?', 2, 'schreiben'),
    P(['H___nde  (die Hand)', 'B___me  (der Baum)', 'M___se  (die Maus)', 'B___lle  (der Ball)']),
    A('Merken: Schreib jedes Wort zweimal.', 3, 'schreiben'),
    P(['Vater ________ ________', 'Fahrrad ________ ________', 'sehr ________ ________'], 1),
], 'Das Kind kennt die vier FRESCH-Strategien und wendet sie bei einzelnen Wörtern an.',
   ['Jede Strategie mit ihrer Geste einführen (Schwungbogen, Verlängerungs-Arm, Ableitungs-Dach, Merk-Stern).', 'Je Aufgabe ein Beispiel gemeinsam lösen und die Strategie laut benennen.', 'Beim nächsten Schreiben fragen: „Welche Strategie hilft dir hier?“'],
   'FRESCH (Freiburger Rechtschreibschule) fasst die deutsche Rechtschreibung in vier Strategien zusammen. Schwingen deckt die lautgetreuen Wörter ab, Verlängern klärt Auslaute (d/t, g/k, b/p), Ableiten erklärt ä und äu aus dem Wortstamm, und nur der kleine Rest muss gemerkt werden. Der Gewinn: Das Kind hat für jeden Zweifel eine Handlung statt einer Regel. Strategien einzeln einführen und über Wochen festigen.',
   ['1) Ba-na-ne · Me-lo-ne · To-ma-te · Ka-me-ra', '2) Hund · Zelt · Berg · Wald', '3) Hände · Bäume · Mäuse · Bälle'],
   'Nur Schwingen und Verlängern.', 'Zu jeder Strategie zwei eigene Wörter finden.', schlag=['FRESCH', 'Rechtschreibung', 'Strategien']))

BL.append(blatt('kk-s13-fuenf-saetze', 'schreiben', 'S13', 'Meine 5-Satz-Geschichte', 'Eine kleine Geschichte in fünf Sätzen schreiben', 'icon:writing', [
    I('Fünf Sätze – eine Geschichte', ['1. Wer? Wo?', '2. Was passiert zuerst?', '3. Was passiert dann?', '4. Was ist die Überraschung?', '5. Wie endet es?']),
    A('Diese drei Dinge kommen in deiner Geschichte vor. Erzähl sie zuerst mündlich.', 1, 'sprechen'),
    B([('emoji:dog', None), ('emoji:soccer-ball', None), ('emoji:cloud-with-rain', None)], 3),
    A('Schreib deine Geschichte. Jeder Satz bekommt eine Zeile.', 2, 'schreiben'),
    {'art': 'satzanfaenge', 'items': ['1. Eines Tages', '2. Zuerst', '3. Dann', '4. Plötzlich', '5. Am Ende'], 'linien': 1},
    A('Prüfe deine Geschichte.', 2),
    ABH(['Fünf Sätze?', 'Satzanfänge groß?', 'Punkte gesetzt?']),
], 'Das Kind schreibt eine zusammenhängende Geschichte aus fünf Sätzen mit Anfang, Mitte und Schluss.',
   ['Eine 5-Satz-Geschichte gemeinsam an der Tafel erfinden – ein Finger pro Satz.', 'Die drei Bilder besprechen; jedes Kind erzählt seine Idee einem Partner.', 'Schreiben, prüfen, in der Gruppe vorlesen.'],
   'Die 5-Satz-Geschichte gibt dem Schreiben eine feste, überschaubare Form: Einleitung, drei Schritte der Handlung, Schluss. Die Satzanfänge nehmen die Angst vor dem leeren Blatt und sorgen für eine Reihenfolge. Mündliches Erzählen vor dem Schreiben ist entscheidend – wer nicht erzählen kann, kann nicht schreiben. Die fünf Finger einer Hand sind eine einfache Merkhilfe für die fünf Sätze.',
   None, 'Drei Sätze schreiben (Anfang, Mitte, Schluss); die Lehrperson schreibt mit.', 'Ohne Satzanfänge schreiben und eine Überschrift finden.', schlag=['5-Satz-Geschichte', 'Texte schreiben', 'Erzählen'], dauer='30–40 Min.'))

BL.append(blatt('kk-s13-geschichte-ordnen', 'schreiben', 'S13', 'Eine Geschichte ordnen', 'Fünf Sätze in die richtige Reihenfolge bringen', 'icon:arrows-shuffle', [
    A('Die Sätze sind durcheinander. Nummeriere von 1 bis 5.', 1, 'lesen'),
    P(['___ Dann putzt er die Zähne.', '___ Am Morgen klingelt der Wecker.', '___ Zum Schluss fährt er mit dem Bus zur Schule.', '___ Zuerst steht Sam auf und frühstückt.', '___ Danach packt er seine Tasche.'], 1),
    A('Unterstreiche die Wörter, die die Reihenfolge zeigen.', 1),
    {'art': 'wortspeicher', 'items': ['Am Morgen', 'Zuerst', 'Dann', 'Danach', 'Zum Schluss']},
    A('Schreib die Geschichte in der richtigen Reihenfolge ab.', 2, 'schreiben'),
    LIN(5),
], 'Das Kind erkennt die Reihenfolge einer kleinen Geschichte an Inhalt und Signalwörtern und schreibt sie geordnet auf.',
   ['Die Sätze als Streifen austeilen und auf dem Tisch ordnen lassen.', 'Signalwörter suchen und unterstreichen.', 'Nummerieren und sauber abschreiben; zum Schluss vorlesen.'],
   'Wer Sätze ordnet, übt den Aufbau einer Geschichte, ohne selbst formulieren zu müssen. Signalwörter wie zuerst, dann und zum Schluss sind die Wegweiser; sie tauchen danach in den eigenen Texten der Kinder auf. Das Abschreiben in der richtigen Reihenfolge verbindet Lesen, Planen und Schreiben. Satzstreifen zum Schieben machen die Aufgabe für Kinder leichter, die sich mit Nummern schwertun.',
   ['1) 3 · 1 · 5 · 2 · 4'],
   'Nur drei Sätze ordnen (Anfang, Mitte, Schluss).', 'Einen sechsten Satz erfinden, der in die Geschichte passt.', 'Satzstreifen (optional)', schlag=['Reihenfolge', 'Signalwörter', '5-Satz-Geschichte']))

schreibe(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'src', 'data', 'blaetter', 'kern.json'), BL)
