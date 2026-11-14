// SOLO AKTION #09 · RAUSCH – acht Aktionen zum Machen und ein Auftrag für die Woche. Keine Mengen, keine Namen, keine Quellen.
import type { AktionsHeft } from '../aktion-typen'
import s from '../solo/s09'
import { clipVon, MEHR } from './hilfe'

const d: AktionsHeft = {
  id: 'a09', nr: '09', datei: 'Solo-09-Rausch-Aktion', thema: 'Rausch', headline: 'Acht Aktionen. Keine Predigt.', farbe: s.farbe, stand: 'November 2026',
  bild: 'peep:yusuf:neutral:laessig', sticker: 'Erst die Regeln',
  start: ['Hier fragt dich keiner nach Mengen, Namen oder woher. **Fang mit Aktion 1 an – das sind die Regeln.**', 'Alles geht auch über „Leute, die ich kenne“.'],
  aktionen: [
    {
      titel: 'Erst die Regeln', bild: 'peep:yusuf:neutral', icon: 'shield-check', zeit: '10 Min.', wer: 'dein Gegenüber schreibt', material: 'Stift',
      schritte: [
        '**Bevor du etwas erzählst:** Dein Gegenüber schreibt auf, was es weitersagen **muss.**',
        'Und was hier bleibt.',
        'Frag nach, bis es klar ist.',
        'Erst dann entscheidest du, wie viel du sagst.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Das muss mein Gegenüber weitersagen:', linien: 2 }, { f: 'Das bleibt hier:', linien: 2 }, { f: 'Für mich ist es:', kreis: ['klar', 'noch mal erklären'] }] }],
      aha: 'Erst die Regeln, dann das Reden. **Das ist dein Recht.**',
      ziel: 'Der Jugendliche weiß vor jedem Wort, was mit seinen Angaben passiert.',
      tipp: 'Vorher die Meldepflichten der Einrichtung klären. Ehrlich aufschreiben – auch, wenn es das Gespräch kleiner macht.',
    },
    {
      titel: 'Wofür?', icon: 'help-circle', zeit: '10 Min.', wer: 'beide', material: 'zwei Farben',
      schritte: [
        'Für dich – oder für Leute, die du kennst.',
        'Kreuz an: **Wofür** nehmen sie es?',
        'Dein Gegenüber kreuzt für sein Mittel an: Kaffee, Wein, Zigaretten, Handy.',
        'Kreis ein, was es **immer schlechter** erledigt.',
      ],
      zonen: [{ art: 'wahl', punkte: [['wind', 'runterkommen'], ['moon', 'einschlafen'], ['users', 'dazugehören'], ['mood-happy', 'Spaß'], ['mood-empty', 'nichts fühlen'], ['flame', 'mutiger sein'], ['hourglass', 'Langeweile'], ['repeat', 'ohne geht es nicht mehr']] }],
      aha: 'Niemand nimmt etwas, weil es nichts bringt. **Die Frage ist: Wofür brauchst du es?**',
      ziel: 'Die Funktion des Mittels erkennen.',
      tipp: 'Das eigene Mittel ehrlich nennen. Keine Mengen erfragen.',
    },
    {
      titel: 'Yusufs drei Tage', bild: 'peep:yusuf:wuetend', icon: 'calendar-x', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Schaut euch Yusufs Woche an.', 'Kreuz an: Welcher Satz von Yusuf stimmt?', 'Kreis ein: Was zeigen die drei Tage?'],
      zonen: [
        { art: 'comic', bilder: [['moon', 'Yusuf raucht jeden Abend einen. „Zum Runterkommen.“'], ['message-circle', 'Er sagt: „Ich kann jederzeit aufhören.“'], ['calendar-x', 'Drei Tage gibt es nichts. Kaum Schlaf. Streit. Nicht zur Arbeit.'], ['arrow-back-up', 'Tag vier: „Siehst du. Ohne geht es mir schlechter.“']] },
        { art: 'fragen', fragen: [{ f: 'Dieser Satz stimmt:', unter: true, kreuz: ['„Ich kann jederzeit aufhören.“', '„Ohne geht es mir schlechter.“'] }, { f: 'Die drei Tage zeigen:', kreis: ['Er hat es im Griff.', 'Sein Körper hat sich gewöhnt.', 'gar nichts'] }] },
      ],
      aha: '„Ohne geht es mir schlechter“ stimmt. **Genau das ist das Zeichen.**',
      ziel: 'Gewöhnung an einem Beispiel erkennen.',
      tipp: 'Nicht fragen „Und bei dir?“. Wer will, sagt es von selbst.',
    },
    {
      titel: 'Yusufs Rechnung', icon: 'scale', zeit: '10 Min.', wer: 'zusammen', material: '',
      schritte: ['Jeden Abend einen: Was **bringt** es Yusuf? Was **kostet** es ihn?', 'Mach in jeder Zeile ein Kreuz.', 'Zählt die Kreuze in beiden Spalten.'],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Jeden Abend einen:', raster: { spalten: ['bringt ihm', 'kostet ihn'], zeilen: ['schneller einschlafen', 'Ruhe im Kopf', 'Geld', 'Streit mit der kleinen Schwester', 'Ärger auf der Arbeit', 'Schlafen geht nur noch damit', 'dazugehören'] } }, { f: 'In zwei Jahren ist die Rechnung:', kreis: ['besser', 'gleich', 'schlechter'] }] }],
      aha: 'Am Anfang bringt es viel und kostet wenig. **Später dreht es sich um.**',
      ziel: 'Nutzen und Preis nebeneinander sehen – ohne Urteil.',
      tipp: 'Den Nutzen ernst nehmen. Wer nur die Kosten gelten lässt, hält eine Predigt.',
    },
    {
      titel: 'Video-Check', icon: 'player-play', zeit: '12 Min.', wer: 'zusammen', material: 'Handy oder Tablet',
      schritte: ['Scannt den Code. Schaut das Video.', 'Jeder darf „Stopp“ sagen. Dann kurz: Was war das gerade?', 'Danach: Daumen hoch oder runter. Beide gleichzeitig – auf drei.'],
      zonen: [
        { art: 'clip', clip: clipVon(s, 'Was wusstest du schon – und was glaubst du nicht?') },
        { art: 'daumen', saetze: ['Das wusste ich alles schon.', 'Manches davon glaube ich nicht.', 'Je früher man anfängt, desto mehr schadet es.', 'Erwachsene übertreiben bei dem Thema.'] },
      ],
      aha: 'Dein Gehirn wird bis Mitte 20 umgebaut. **Je früher, je öfter, je stärker – desto mehr Schaden.**',
      ziel: 'Sachwissen ohne Abschreckung.',
      tipp: 'Das Video vorher selbst ansehen – wir haben nur Titel und Kanal geprüft. Zweifel des Jugendlichen stehen lassen.',
    },
    {
      titel: 'Stimmt’s oder Quatsch?', icon: 'bulb', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: ['Dein Gegenüber liest einen Satz vor.', 'Beide zeigen gleichzeitig: Daumen hoch = stimmt. Daumen runter = Quatsch.', 'Kreuz an. Die Lösung hat dein Gegenüber.', 'Wer mehr richtig hat, gewinnt.'],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Der Satz:', raster: { spalten: ['stimmt', 'Quatsch'], zeilen: ['Das Gehirn wird bis Mitte 20 umgebaut.', 'Vapes machen nicht abhängig.', 'Kaffee macht Betrunkene wieder nüchtern.', 'Wer früh und oft kifft, hat später öfter Probleme mit dem Gedächtnis.', 'Wer bewusstlos ist, soll ausschlafen.', 'Nikotin kann schon nach Wochen abhängig machen.'] } }] }],
      aha: 'Wer Bescheid weiß, **entscheidet selbst.**',
      ziel: 'Sechs Fakten sicher kennen.',
      tipp: 'Lösung: 1 stimmt · 2 Quatsch · 3 Quatsch (nur die Zeit baut Alkohol ab) · 4 stimmt · 5 Quatsch (Seitenlage, 112, dableiben) · 6 stimmt.',
    },
    {
      titel: 'Notfall üben', bild: 'peep:yusuf:neutral:stehen', icon: 'first-aid-kit', zeit: '15 Min.', wer: 'beide', material: 'Decke oder Jacke als Unterlage',
      schritte: [
        'Dein Gegenüber zeigt dir die **stabile Seitenlage.**',
        'Dann spielt es „nicht ansprechbar“. Sprich es laut an.',
        'Leg es auf die Seite. **Nur, wenn beide einverstanden sind.**',
        'Spiel den Anruf bei der **112**: Wo bin ich? Was ist passiert? Was wurde genommen?',
        'Tauschen.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Das habe ich gemacht:', unter: true, kreuz: ['laut angesprochen', 'auf die Seite gelegt', '112 gewählt (gespielt)', 'gesagt, was genommen wurde', 'dageblieben'] }] }],
      aha: 'Ärger ist egal. **Zeit zählt. Bleib da.**',
      ziel: 'Im Ernstfall handeln können – einmal mit den Händen geübt.',
      tipp: 'Die Seitenlage vorher selbst auffrischen. Wer nicht angefasst werden will, übt nur den Anruf. Nie wirklich die 112 wählen.',
    },
    {
      titel: '„Heute nicht.“', icon: 'hand-stop', zeit: '10 Min.', wer: 'beide', material: '',
      schritte: [
        'Dein Gegenüber spielt jemanden, der dir etwas anbietet.',
        'Du sagst **„Heute nicht.“** oder **„Lass mal.“** Ohne Erklärung.',
        'Es wird in drei Stufen schwerer. Kreuz an, wie es war.',
        'Tauschen: Du bietest an. Dein Gegenüber lehnt ab.',
      ],
      zonen: [{ art: 'fragen', fragen: [{ f: 'Dein Gegenüber …', raster: { spalten: ['leicht', 'schwer'], zeilen: ['… fragt nett.', '… fragt dreimal hintereinander.', '… sagt: „Stell dich nicht so an.“'] } }, { f: 'Mein Satz:', kreis: ['„Heute nicht.“', '„Lass mal.“', '„Nein.“', '„Ich bin raus.“'] }] }],
      aha: 'Du musst nichts erklären. **„Heute nicht“ ist ein ganzer Satz.**',
      ziel: 'Ablehnen üben – auch unter leichtem Druck.',
      tipp: 'Angeboten wird im Spiel „etwas“ – keine Stoffe benennen. Bei Stufe 3 nur den einen Satz sagen, nichts Persönliches.',
    },
  ],
  woche: {
    titel: 'Drei Tage Pause', icon: 'calendar-week', zeit: '3 Tage', wer: 'du – mit Ansage', material: 'dieses Blatt',
    schritte: [
      'Lass es **drei Tage** weg. Oder dein anderes Mittel: Vape, Energy-Drinks.',
      '**Sag deinem Gegenüber, an welchen Tagen.**',
      'Wer täglich trinkt oder Tabletten nimmt: **nicht allein. Erst zum Arzt.**',
      'Mach jeden Abend ein Kreuz.',
    ],
    zonen: [
      { art: 'woche', zeilen: ['Tag ohne', 'war schwer', 'ging so', 'okay geschlafen'] },
      { art: 'karten', karten: [
        { titel: 'Vorher fragen', icon: 'help-circle', zeilen: ['Wofür will ich es gerade?', 'Was hilft auch – nur langsamer?', 'Entscheide ich – oder die Gewohnheit?'] },
        { titel: 'Notfall', icon: 'first-aid-kit', zeilen: ['Nicht ansprechbar oder atmet komisch:', '**112.** Dableiben. Auf die Seite legen.', 'Sagen, was genommen wurde.'] },
      ] },
    ],
    aha: 'Was in der Pause passiert, **ist die Antwort.**',
    ziel: 'Ein eigener Test, begleitet und angekündigt.',
    tipp: 'Die Tage notieren und im Haus Rückendeckung geben: Gereiztheit in diesen Tagen ist kein Regelverstoß.',
  },
  begleitung: { material: 'Stifte, Handy, Decke', achtung: s.begleitung.achtung, mehr: MEHR(s) },
}
export default d
