// Passgenau – das Blatt der Sitzung: zusammensetzen (5.5, T-M2, P2, E-M3) und als synthetisches Blatt für den
// vorhandenen Renderer ausgeben (7.5, E-M13). Bausteine aus verschiedenen Blättern, je Quelle höchstens zwei,
// Seiten- und Zeitbudget, Hilfe-Zeile bleibt, kein Etikett („Passgenau“ statt Bereich, „Mein Ziel“ nur auf Wunsch).
import type { Baustein, Blatt, BlattInhalt, Bereich, Sprache as BlattSprache } from '../../blatt/typen'
import type { BlattTeil, Bogen, KatalogEintrag, Layout, MikroBaustein, Plan, Profil, Rolle, Sprache } from '../typen'
import { hash8, hash01, stufeAusAlter, stufenAbstand, istEldib } from './hilfen'
import { bausteinInhalt, intern, merkmaleVon, textVon, zielSatz as zielSatzVon, type Katalog } from './katalog'
import { setzeText, texte } from './inhalt'
import { bewerte, NACHBAR, pruefe, rang, type Bewertet, type Kontext } from './regeln'
import { knapp as umbruchKnapp, seitenMasse, teilHoehe, verteile } from './seiten'
import { BLATT_SYSTEM } from './system'
import { interesseName, SKILLS_BEREICH, type Kompetenz } from './vokabular'

/** Lernbogen des Blatts je Sitzungsphase (5.5 Schritt 1). */
export const BLATT_BOGEN: Record<Bogen, Bogen[]> = {
  wahrnehmen: ['wahrnehmen', 'verstehen', 'reflektieren'],
  verstehen: ['wahrnehmen', 'verstehen', 'ueben', 'reflektieren'],
  ueben: ['verstehen', 'ueben', 'ueben', 'uebertragen'],
  uebertragen: ['ueben', 'uebertragen', 'reflektieren'],
  reflektieren: ['wahrnehmen', 'uebertragen', 'reflektieren'],
}
const MITMACH_ARTEN = new Set(['labyrinth', 'suchbild', 'punkte_verbinden', 'laufweg', 'memory', 'klappbild', 'faedelkarte', 'bastelbogen', 'minibuch', 'anziehpuppe', 'schneiden_kleben', 'geo', 'atmen'])
const BOGEN_REIHE: Bogen[] = ['wahrnehmen', 'verstehen', 'ueben', 'uebertragen', 'reflektieren']

const TITEL: Record<Kompetenz, { kind: [string, string][]; jugend: [string, string][] }> = {
  impulskontrolle: { kind: [['Mein Stopp-Plan', 'Mon plan stop'], ['Erst stoppen, dann handeln', 'D’abord stop, puis j’agis']], jugend: [['Stopp – denken – handeln', 'Stop – réfléchir – agir'], ['Impulse steuern', 'Gérer ses impulsions']] },
  selbstregulation: { kind: [['Ruhig werden', 'Retrouver le calme'], ['Mein Ruhe-Plan', 'Mon plan calme']], jugend: [['Runterkommen', 'Redescendre'], ['Mein Plan für schwierige Momente', 'Mon plan pour les moments difficiles']] },
  'gefuehle-erkennen': { kind: [['Was fühle ich?', 'Qu’est-ce que je ressens ?'], ['Gefühle erkennen', 'Reconnaître les émotions']], jugend: [['Gefühle lesen', 'Lire les émotions']] },
  'gefuehle-ausdruecken': { kind: [['Meine Gefühle zeigen', 'Montrer mes émotions'], ['Sagen, was in mir los ist', 'Dire ce qui se passe en moi']], jugend: [['Gefühle in Worte fassen', 'Mettre des mots sur ses émotions']] },
  aufmerksamkeit: { kind: [['Bei der Sache bleiben', 'Rester dans la tâche'], ['Mein Konzentrations-Plan', 'Mon plan concentration']], jugend: [['Fokus halten', 'Garder le cap']] },
  ausdauer: { kind: [['Schritt für Schritt', 'Pas à pas'], ['Ich bleibe dran', 'Je continue']], jugend: [['Dranbleiben', 'Tenir bon']] },
  kooperation: { kind: [['Gemeinsam geht es', 'Ensemble, ça marche'], ['Zusammen spielen und arbeiten', 'Jouer et travailler ensemble']], jugend: [['Gemeinsam statt allein', 'Ensemble plutôt que chacun pour soi']] },
  konflikte: { kind: [['Streit lösen', 'Résoudre une dispute'], ['Meine Brücke im Streit', 'Mon pont dans la dispute']], jugend: [['Konflikte klären', 'Régler un conflit']] },
  kommunikation: { kind: [['Reden und zuhören', 'Parler et écouter'], ['Ich sage, was ich brauche', 'Je dis ce dont j’ai besoin']], jugend: [['Klar sagen, gut zuhören', 'Dire clairement, bien écouter']] },
  selbstbild: { kind: [['Das kann ich', 'Ce que je sais faire'], ['Meine Stärken', 'Mes forces']], jugend: [['Was mich ausmacht', 'Ce qui me caractérise']] },
  lernstrategien: { kind: [['Mein Lern-Trick', 'Mon astuce pour apprendre']], jugend: [['So lerne ich gut', 'Comment j’apprends bien']] },
  alltag: { kind: [['Ich schaffe das', 'J’y arrive'], ['Mein Alltag', 'Mon quotidien']], jugend: [['Meinen Alltag planen', 'Organiser mon quotidien']] },
}

export function blattTitel(c: Kontext, salz: string, leicht: boolean, teile: KatalogEintrag[] = []): { de: string; fr: string } {
  if (leicht) return c.alter >= 12 ? { de: 'Kurze Pause', fr: 'Petite pause' } : c.alter <= 5 ? { de: 'Spielen und malen', fr: 'Jouer et dessiner' } : { de: 'Heute machen wir es uns leicht', fr: 'Aujourd’hui, on y va doucement' }
  // Titel nach dem, worum es auf dem Blatt wirklich geht: das Kompetenzfeld der meisten Teile (Rückblicke zählen nicht)
  const zaehl = new Map<Kompetenz, number>()
  for (const e of teile) if (!(e.typ === 'baustein' && e.art.includes('rueckblick'))) for (const k of e.kompetenz.slice(0, 1) as Kompetenz[]) if (TITEL[k]) zaehl.set(k, (zaehl.get(k) ?? 0) + e.dauer.typ)
  const haupt = [...zaehl.entries()].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))[0]?.[0]
  const feld = haupt ?? c.ziele.find((z) => z.feld)?.feld ?? 'alltag'
  const liste = TITEL[feld][c.alter >= 12 ? 'jugend' : 'kind']
  const [de, fr] = liste[Math.floor(hash01(salz + '|titel') * liste.length)]
  return { de, fr }
}

export interface BlattErgebnis {
  teile: BlattTeil[]
  titel: string
  hinweise: string[]
  bewertet: Map<string, Bewertet>
}

export interface BlattAuftrag {
  phase: Bogen | 'leicht'
  min: number
  nr: number
  salz: string
  gesperrt: Set<string>
  fokus?: Map<string, number>
  kern?: KatalogEintrag
  /** keine Untergrenze (Weg 3: Mitmach-Seite) */
  optional?: boolean
}

function urheberGruppe(c: Kontext, e: MikroBaustein): 'spielschule' | 'toolbox' {
  return intern(c.k).q.blatt.get(e.quelle.blatt)?.bereich === 'spielschule' ? 'spielschule' : 'toolbox'
}

function relevant(b: Bewertet): boolean {
  return b.f.ziel >= 0.25 || b.f.thema > 0
}

/** Das Blatt einer Sitzung zusammensetzen. null: zu wenig Passendes – lieber ohne Blatt (P2). */
export function baueBlatt(c: Kontext, o: BlattAuftrag): BlattErgebnis | null {
  const k = c.k
  const leicht = o.phase === 'leicht'
  const layout: Layout = c.layout
  const maxSeiten = layout === 'bild' || layout === 'gross' || o.min < 10 ? 1 : 2
  const knapp = c.p.zugang.tempo === 'ruhig' || c.heute.konzentration <= 3
  const maxAufgaben = knapp ? 3 : o.min <= 6 ? 2 : o.min <= 10 ? 4 : c.heute.konzentration >= 6 ? 6 : 5
  const budget = 1.25 * o.min
  const hinweise: string[] = []
  // Blatt-Kohärenz (Testlauf 9.10.: ein Datenschutz-Teil aus der KI-Werkstatt auf einem Blatt zu Gefühlen): jeder Teil
  // teilt ein Ziel oder ein Thema mit dem Kern der Stunde – ELDiB-Code, Thema, oder dasselbe Kompetenzfeld ohne eigenes
  // fremdes Thema – oder gehört zu seinem Blatt; ein Rückblick ohne Thema ist neutral. Ohne Kern (Weg 3) gilt sie nicht.
  const kernCodes = new Set(!leicht && o.kern ? o.kern.eldib.map((x) => x.code) : [])
  const kernThemen = new Set(!leicht && o.kern ? o.kern.thema : [])
  const kernFeld = new Set(!leicht && o.kern ? o.kern.kompetenz : [])
  const kernBlatt = new Set(o.kern?.typ === 'schritt' ? (o.kern.blatt ?? []) : [])
  const kohaerent = (e: MikroBaustein) => blattTeilKohaerent(e, { codes: kernCodes, themen: kernThemen, felder: kernFeld, blatt: kernBlatt, kindThemen: c.themen, streng: !leicht && !!o.kern?.id.startsWith('j:') })
  // alle erlaubten Bausteine einmal bewerten
  const pool: Bewertet[] = []
  const nurAbhaengig = new Map<string, Bewertet>()
  for (const e of k.eintraege.values()) {
    if (e.typ !== 'baustein') continue
    if (!leicht && e.ohneZiel && !e.art.includes('atmen')) continue
    if (!kohaerent(e)) continue
    // Text- und Info-Kästen, Geschichten ohne Frage: nur als Teil eines Pakets, das sie braucht
    // (auch Schrittketten, Spalten und Dialoge ohne Aufgabe: allein stehen sie ohne Auftrag auf dem Blatt – Testlauf 9.10.)
    if (e.art[0] !== 'aufgabe' && ['info', 'text', 'geschichte', 'wortspeicher', 'bild', 'schritte', 'spalten', 'dialog'].includes(e.art[0])) {
      if (pruefe(e, c, { blatt: true, gesperrt: o.gesperrt }) === null) nurAbhaengig.set(e.id, bewerte(e, c, { phase: o.phase, fokus: o.fokus }))
      continue
    }
    if (pruefe(e, c, { blatt: true, gesperrt: o.gesperrt }) !== null) continue
    const bonus =
      (o.kern?.typ === 'schritt' && o.kern.blatt?.includes(e.id) ? 0.1 : 0) +
      (o.kern && o.kern.eldib.some((x) => x.gewicht === 1 && e.eldib.some((y) => y.code === x.code && y.gewicht === 1)) ? 0.08 : 0) +
      (o.kern?.thema[0] && e.thema.includes(o.kern.thema[0]) ? 0.05 : 0) -
      // ein ganz anderes Thema als die des Kindes und des Kerns (Verliebtsein, KI …) passt selten aufs Blatt
      (c.themen.size && e.thema.length && !e.thema.some((t) => c.themen.has(t) || o.kern?.thema.includes(t)) ? 0.06 : 0) +
      // Mitmach-Seite (Weg 3): Rätsel, Labyrinth, Malen, Muster – nicht Schilder oder Formulare
      (leicht ? (e.art.some((a) => MITMACH_ARTEN.has(a)) || e.format.includes('malen') ? 0.15 : 0) - (e.art.includes('karten') || e.schreibmenge >= 2 || /formular|schild|deinen namen/i.test(kurzTitel(k, e)) ? 0.15 : 0) : 0)
    // Ziel ±2 Stufen im selben Bereich mitbewerten (Lockerungsleiter 2) – zählt nur, wenn Engeres fehlt
    pool.push(bewerte(e, c, { phase: o.phase, fokus: o.fokus, bonus, locker: 2 }))
  }
  // Ein Blatt hat mindestens zwei Teile: was allein das Zeit- oder Seitenbudget füllt, kommt nicht in Frage
  const seite = seitenMasse(k, layout)
  const allein = (b: Bewertet) => !leicht && !o.optional && (b.e.dauer.typ > budget - 2 || teilHoehe(k, b.e.id, layout) > 0.8 * seite.erste * maxSeiten)
  // erst das, was klar zum Ziel oder Thema gehört; reicht das nicht für ein Blatt, Stufe für Stufe weiter:
  // klar passend → passend (Ziel ±1, Thema) → weit (Ziel ±2 im Bereich, Kompetenzfeld; mit Hinweis)
  const stark = (b: Bewertet) => b.f.ziel >= 0.5 || b.f.thema >= 0.7
  const weit = (b: Bewertet) => b.f.ziel > 0 || b.f.thema > 0
  const starkPool = pool.filter((b) => !allein(b) && stark(b))
  const stufen: [string, (b: Bewertet) => boolean][] = leicht ? [['alle', () => true]] : [['stark', stark], ['relevant', relevant], ['weit', weit]]
  const stellen: (Bogen | '*')[] = leicht ? ['*', '*'] : BLATT_BOGEN[o.phase as Bogen]
  const gewaehlt: Bewertet[] = []
  const reserve: string[] = []
  if (c.hilft.has('stundenleiste') || c.hilft.has('bildplan') || c.p.zugang.struktur === 'hoch') reserve.push(BLATT_SYSTEM.stundenleiste)
  let gruppe: 'spielschule' | 'toolbox' | null = null
  const notfallNoetig = () => gewaehlt.some((b) => intern(k).notfallBlatt.has((b.e as MikroBaustein).quelle.blatt) || merkmaleVon(k, b.e).has('belastend')) || (c.vorsicht.has('heikel') && c.alter >= 10)
  const refs = (liste: Bewertet[]) => [...reserve, ...liste.map((b) => b.e.id), ...(notfallNoetig() || liste.some((b) => intern(k).notfallBlatt.has((b.e as MikroBaustein).quelle.blatt) || merkmaleVon(k, b.e).has('belastend')) ? [BLATT_SYSTEM.notfall] : [])]
  const passt = (neu: Bewertet[], einQuelle = false): boolean => {
    const alle = [...gewaehlt, ...neu]
    const seiten = verteile(k, refs(alle), layout)
    if (seiten.length > maxSeiten || seiten[seiten.length - 1] > 1) return false
    // Umbruch auf der Kippe: lieber eine andere Zusammenstellung (Vorhersage = PDF)
    if (umbruchKnapp(k, refs(alle), layout)) return false
    if (alle.reduce((s, b) => s + b.e.dauer.typ, 0) > budget && (gewaehlt.length || o.min < 6)) return false
    if (alle.filter((b) => (b.e as MikroBaustein).art[0] === 'aufgabe').length > maxAufgaben) return false
    // ein Rückblick (Smileys, Daumen) je Blatt genügt
    if (alle.filter((b) => (b.e as MikroBaustein).art.includes('rueckblick')).length > 1) return false
    if (einQuelle) return true
    // Karten zum Ausschneiden: eine Sorte je Blatt
    if (alle.filter((b) => (b.e as MikroBaustein).art.some((a) => a === 'karten' || a === 'schneiden_kleben' || a === 'memory')).length > 1) return false
    // höchstens zwei Pakete je Quellblatt; eine Geschichte, die ein Paket braucht, zählt nicht mit
    const abhaengig = new Set(alle.flatMap((b) => (b.e as MikroBaustein).braucht ?? []))
    const jeQuelle = new Map<string, number>()
    for (const b of alle) if (!abhaengig.has(b.e.id)) jeQuelle.set((b.e as MikroBaustein).quelle.blatt, (jeQuelle.get((b.e as MikroBaustein).quelle.blatt) ?? 0) + 1)
    if ([...jeQuelle.values()].some((n) => n > 2)) return false
    return true
  }
  const salz = o.salz + '|blatt'
  const ziel = leicht || o.optional ? (o.min >= 6 && !leicht ? 2 : 1) : o.min >= 12 ? 3 : 2
  const mindest = leicht || o.optional ? 1 : 2
  let passend: Bewertet[] = []
  let stufe = ''
  // Blind-Bewertung 9.10.: Blätter aus Teilen vieler Quellen wirkten zusammengewürfelt (Titel passt nicht, Aufgabe ohne
  // Vorlage, Seite halb leer). Zuerst ein Blatt aus EINER Quelle: deren Teile in ihrer Reihenfolge, so viele, wie Zeit und
  // Seite erlauben – am liebsten das Blatt, das zum Kern gehört. Erst wenn keine Quelle trägt, die Zusammenstellung.
  const ganz = einQuelleBlatt()
  if (ganz) {
    gewaehlt.splice(0, gewaehlt.length, ...ganz.teile)
    stufe = 'quelle'
  }
  function einQuelleBlatt(): { teile: Bewertet[] } | null {
    const jeBlatt = new Map<string, Bewertet[]>()
    for (const b of [...pool, ...nurAbhaengig.values()]) {
      const q = (b.e as MikroBaustein).quelle.blatt
      const l = jeBlatt.get(q)
      if (l) l.push(b)
      else jeBlatt.set(q, [b])
    }
    const reihe = intern(k).bausteineVonBlatt
    const kandidatenBlaetter = [...jeBlatt.entries()]
      .map(([q, liste]) => {
        const tragend = liste.filter((b) => pool.includes(b) && (leicht || relevant(b)))
        if (!tragend.length) return null
        const zumKern = liste.some((b) => kernBlatt.has(b.e.id))
        // Blind-Bewertung 9.10.: Blatt und Kern hatten oft verschiedene Themen – dasselbe Hauptziel wie der Kern zählt viel
        const kernPrimaer = new Set(!leicht && o.kern ? o.kern.eldib.filter((x) => x.gewicht === 1).map((x) => x.code) : [])
        const gleichesZiel = tragend.some((b) => b.e.eldib.some((x) => x.gewicht === 1 && kernPrimaer.has(x.code)))
        const gleichesThema = !!o.kern?.thema.length && tragend.some((b) => b.e.thema.some((t) => o.kern!.thema.includes(t)))
        if (!leicht && o.kern && kernPrimaer.size && !zumKern && !gleichesZiel && !gleichesThema) return null
        const wert = Math.max(...tragend.map((b) => b.s)) + (zumKern ? 0.3 : 0) + (gleichesZiel ? 0.15 : 0) + (gleichesThema ? 0.05 : 0) + 0.03 * Math.min(4, tragend.length)
        return { q, liste, wert }
      })
      .filter((x): x is { q: string; liste: Bewertet[]; wert: number } => !!x)
      .sort((a, b) => b.wert - a.wert || (a.q < b.q ? -1 : 1))
    for (const kand of kandidatenBlaetter.slice(0, 12)) {
      const ordnung = (reihe.get(kand.q) ?? []).map((x) => x.id)
      const nach = new Map(kand.liste.map((b) => [b.e.id, b]))
      const folge = ordnung.filter((id) => nach.has(id)).map((id) => nach.get(id)!)
      gewaehlt.length = 0
      for (const [i, b] of folge.entries()) {
        if (gewaehlt.includes(b)) continue
        const e = b.e as MikroBaustein
        // Text- und Info-Kästen nur, wenn ein späterer gewählter Teil sie braucht (unten über `braucht`)
        if (!pool.includes(b)) continue
        const deps = (e.braucht ?? []).filter((d) => !gewaehlt.some((x) => x.e.id === d)).map((d) => nach.get(d) ?? nurAbhaengig.get(d) ?? pool.find((x) => x.e.id === d))
        if (deps.some((d) => !d)) continue
        // eine reine Arbeitsanweisung („Schneide die Krone aus“) nur mit dem Teil, der danach kommt (Vorlage, Bild)
        const nurAnweisung = e.art.every((a) => a === 'aufgabe')
        const danach = nurAnweisung ? folge[i + 1] : undefined
        if (nurAnweisung && (!danach || !pool.includes(danach))) continue
        const neu = [...(deps as Bewertet[]), b, ...(danach ? [danach] : [])]
        if (!passt(neu, true)) continue
        gewaehlt.push(...neu)
        if (gewaehlt.reduce((x, y) => x + y.e.dauer.typ, 0) >= 0.9 * o.min) break
      }
      const summe = gewaehlt.reduce((x, y) => x + y.e.dauer.typ, 0)
      const aufgaben = gewaehlt.filter((x) => (x.e as MikroBaustein).art.includes('aufgabe') || (x.e as MikroBaustein).art.some((a) => MITMACH_ARTEN.has(a))).length
      // kurzer Slot oder Bild-Layout: ein einziger, ausreichend großer Teil ist auch ein Blatt (Labyrinth, Suchbild)
      const einerGross = gewaehlt.length === 1 && (layout === 'bild' || teilHoehe(k, gewaehlt[0].e.id, layout) >= 0.5 * seite.erste)
      const genug = gewaehlt.length >= mindest || ((o.min <= 8 || layout === 'bild') && einerGross)
      if (genug && aufgaben >= 1 && (leicht || o.optional || summe >= 0.5 * o.min)) return { teile: [...gewaehlt] }
    }
    gewaehlt.length = 0
    return null
  }
  for (const [name, test] of ganz ? [] : stufen) {
    if (name === 'stark' && starkPool.length < 6) continue
    const kernPassend = pool.filter((b) => test(b) && !allein(b))
    if (!leicht && !o.optional && kernPassend.length < 3) continue
    passend = pool.filter((b) => (test(b) || (!leicht && b.e.bogen === 'reflektieren')) && !allein(b))
    // gierig je Stelle; bleibt nach dem ersten Teil kein Platz (große Bildkarte füllt die Seite), ohne ihn neu versuchen
    const verboten = new Set<string>()
    const versuche: { teile: Bewertet[]; gruppe: 'spielschule' | 'toolbox' | null }[] = []
    for (let versuch = 0; versuch < 5; versuch++) {
      gewaehlt.length = 0
      gruppe = null
      for (const [i, stelle] of stellen.entries()) {
        const nachbar = stelle === '*' ? [] : NACHBAR[stelle]
        let kand = passend.filter((b) => !verboten.has(b.e.id) && (stelle === '*' || b.e.bogen === stelle))
        if (stelle !== '*' && kand.filter((b) => !gewaehlt.includes(b)).length < 3) kand = passend.filter((b) => !verboten.has(b.e.id) && (b.e.bogen === stelle || nachbar.includes(b.e.bogen!)))
        kand = kand.filter((b) => !gewaehlt.includes(b) && (!gruppe || urheberGruppe(c, b.e as MikroBaustein) === gruppe))
        // Abwechslung: Format schon auf dem Blatt → weniger; derselbe Bogen wie die Stelle → mehr
        const formate = new Set(gewaehlt.flatMap((b) => b.e.format))
        // auf einer Seite (C1/C2, kurze Slots) zählt der Platz: kleinere Teile lassen Raum für einen dritten
        const mitPlatz = (b: Bewertet) => {
          const x = mitStelle(b, stelle, formate, gewaehlt)
          return maxSeiten === 1 ? { ...x, s: x.s - 0.08 * Math.min(1, teilHoehe(k, b.e.id, layout) / seite.erste) } : x
        }
        kand.sort((a, b) => rang(mitPlatz(a), mitPlatz(b), `${salz}|${i}`))
        for (const b of kand) {
          const e = b.e as MikroBaustein
          // eine reine Arbeitsanweisung ohne ihre Vorlage nie allein (Blind-Bewertung: „Schneide die Maske aus“ ohne Maske)
          if (e.art.every((a) => a === 'aufgabe') && !e.braucht?.length) continue
          const deps = (e.braucht ?? []).filter((d) => !gewaehlt.some((x) => x.e.id === d)).map((d) => nurAbhaengig.get(d) ?? pool.find((x) => x.e.id === d))
          if (deps.some((d) => !d)) continue
          if (!passt([...(deps as Bewertet[]), b])) continue
          gewaehlt.push(...(deps as Bewertet[]), b)
          gruppe ??= urheberGruppe(c, e)
          break
        }
      }
      versuche.push({ teile: [...gewaehlt], gruppe })
      if (gewaehlt.length >= ziel || !gewaehlt.length) break
      verboten.add(gewaehlt[0].e.id)
    }
    // bester Versuch: mindestens zwei Teile, bei längerem Slot lieber drei; dann die höhere Summe der Werte
    const guete = (v: (typeof versuche)[number]) => Math.min(ziel, v.teile.length) * 10 + v.teile.reduce((x, b) => x + b.s, 0)
    const bester = versuche.reduce((a, b) => (guete(b) > guete(a) ? b : a), versuche[0])
    gewaehlt.splice(0, gewaehlt.length, ...bester.teile)
    gruppe = bester.gruppe
    if (gewaehlt.length >= mindest) {
      stufe = name
      break
    }
  }
  if (gewaehlt.length < mindest && stufe !== 'quelle') {
    gewaehlt.length = 0
    hinweise.push('Zu wenig passende Blatt-Teile für diese Sitzung – heute ohne Blatt, oder im Baukasten suchen.')
    return null
  }
  if (stufe === 'weit') hinweise.push('Blatt gelockert: Teile aus dem Bereich des Ziels (nächste Stufen), nicht genau zum Ziel.')
  // zu wenig für den Slot (Σ Minuten < Hälfte): mit passenden Teilen anderer Stellen auffüllen
  if (!leicht && !o.optional && stufe !== 'quelle') {
    const summe = () => gewaehlt.reduce((x, b) => x + b.e.dauer.typ, 0)
    const rest = passend.filter((b) => !gewaehlt.includes(b) && !(b.e as MikroBaustein).braucht?.length && (!gruppe || urheberGruppe(c, b.e as MikroBaustein) === gruppe)).sort((a, b) => rang(a, b, salz + '|auf'))
    for (const b of rest) {
      if (summe() >= 0.5 * o.min) break
      if (passt([b])) gewaehlt.push(b)
    }
  }
  // keine halbleere zweite Seite: noch ein Übungsteil oder auf eine Seite kürzen
  let seiten = verteile(k, refs(gewaehlt), layout)
  if (seiten.length === 2 && seiten[1] < 0.35 && stufe !== 'quelle') {
    const extra = passend
      .filter((b) => !gewaehlt.includes(b) && (b.e.bogen === 'ueben' || b.e.bogen === 'uebertragen') && (!gruppe || urheberGruppe(c, b.e as MikroBaustein) === gruppe) && !(b.e as MikroBaustein).braucht?.length)
      .sort((a, b) => rang(a, b, salz + '|extra'))
      .find((b) => passt([b]) && verteile(k, refs([...gewaehlt, b]), layout)[1] >= 0.35)
    if (extra) gewaehlt.push(extra)
    else {
      // sonst den schwächsten Teil weglassen, ohne den alles auf eine Seite passt (nie eine gebrauchte Geschichte)
      const gebraucht = new Set(gewaehlt.flatMap((b) => (b.e as MikroBaustein).braucht ?? []))
      const weg = gewaehlt
        .filter((b) => !gebraucht.has(b.e.id) && !(b.e as MikroBaustein).braucht?.length)
        .filter((b) => {
          const ohne = gewaehlt.filter((x) => x !== b)
          return ohne.length >= 2 && verteile(k, refs(ohne), layout).length === 1 && !umbruchKnapp(k, refs(ohne), layout)
        })
        .sort((a, b) => a.s - b.s)[0]
      if (weg) gewaehlt.splice(gewaehlt.indexOf(weg), 1)
    }
    seiten = verteile(k, refs(gewaehlt), layout)
  }
  // ein Blatt aus einer Quelle: halbleere zweite Seite → hintere Teile weglassen, solange genug bleibt
  if (stufe === 'quelle') {
    while (seiten.length === 2 && seiten[1] < 0.35 && gewaehlt.length > mindest) {
      const letzter = gewaehlt[gewaehlt.length - 1]
      if (gewaehlt.some((b) => (b.e as MikroBaustein).braucht?.includes(letzter.e.id))) break
      gewaehlt.pop()
      // eine reine Anweisung bleibt nicht ohne ihre Vorlage stehen
      const vorletzt = gewaehlt[gewaehlt.length - 1]
      if (vorletzt && (vorletzt.e as MikroBaustein).art.every((a) => a === 'aufgabe') && gewaehlt.length > mindest) gewaehlt.pop()
      seiten = verteile(k, refs(gewaehlt), layout)
    }
  }
  // Reihenfolge: Lernbogen, Abhängigkeiten vor dem, was sie braucht, innerhalb eines Blatts wie im Blatt (aus einer
  // Quelle: wie in der Quelle)
  const ordnung = new Map<string, number>()
  gewaehlt.forEach((b, i) => ordnung.set(b.e.id, stufe === 'quelle' ? i : BOGEN_REIHE.indexOf(b.e.bogen ?? 'ueben') * 100 + i))
  for (const b of gewaehlt) for (const d of (b.e as MikroBaustein).braucht ?? []) if (ordnung.has(d)) ordnung.set(d, Math.min(ordnung.get(d)!, ordnung.get(b.e.id)! - 1))
  gewaehlt.sort((a, b) => ordnung.get(a.e.id)! - ordnung.get(b.e.id)!)
  const teile: BlattTeil[] = refs(gewaehlt).map((ref) => {
    const e = k.eintraege.get(ref)
    return { ref, h: e?.h ?? ref, ...(e ? { t: kurzTitel(k, e) } : {}) }
  })
  // Titel: kommt fast alles aus einem Blatt, dessen Titel; sonst ein Muster zum Ziel
  const jeQuelle = new Map<string, number>()
  for (const b of gewaehlt) jeQuelle.set((b.e as MikroBaustein).quelle.blatt, (jeQuelle.get((b.e as MikroBaustein).quelle.blatt) ?? 0) + 1)
  const [haupt, n] = [...jeQuelle.entries()].sort((a, b) => b[1] - a[1])[0]
  const quelle = intern(k).q.blatt.get(haupt)!
  const titel = n === gewaehlt.length && !leicht ? (c.sprache === 'fr' && quelle.fr ? quelle.fr.titel : quelle.de.titel) : blattTitel(c, o.salz, leicht, gewaehlt.map((b) => b.e))[c.sprache]
  return { teile, titel, hinweise, bewertet: new Map(gewaehlt.map((b) => [b.e.id, b])) }
}

/** Blatt für Jugendliche aus dem Kern der Stunde (Blind-Bewertung 5, 9.10.: die Blätter aus Kurs- und Kindermaterial
 *  passten selten zur Übung oder zum Alter – „Anrede-Übung unter ‚Gefühle lesen‘“, „Debatte per Los“, „Kasse: Tüte“ für
 *  17 Jahre, Verweise auf eine Übung 3 oder ein Wochenprotokoll). Die Gutachter schlugen stattdessen vor, was dieses Blatt
 *  tut: Fragen zur Übung der Stunde, je nach Stelle im Bogen (erkennen, verstehen, üben, übertragen, zurückschauen). */
export function kernBlatt(c: Kontext, o: BlattAuftrag): BlattErgebnis | null {
  if (!o.kern || o.phase === 'leicht') return null
  const eigen = o.kern.typ === 'schritt' ? o.kern.uebungsblatt?.titel : undefined
  const t = eigen ? eigen[c.sprache] : textVon(o.kern, c.sprache).titel
  const notfall = c.vorsicht.has('heikel') || merkmaleVon(c.k, o.kern).has('belastend')
  // Stundenleiste wie beim zusammengesetzten Blatt, wenn sie dem Kind hilft (Blind-Bewertung 6)
  const leiste = c.hilft.has('stundenleiste') || c.hilft.has('bildplan') || c.p.zugang.struktur === 'hoch'
  return {
    teile: [
      ...(leiste ? [{ ref: BLATT_SYSTEM.stundenleiste, h: BLATT_SYSTEM.stundenleiste }] : []),
      { ref: BLATT_SYSTEM.kernblatt, h: BLATT_SYSTEM.kernblatt, t: `Fragen zu „${textVon(o.kern, 'de').titel}“` },
      ...(notfall ? [{ ref: BLATT_SYSTEM.notfall, h: BLATT_SYSTEM.notfall }] : []),
    ],
    titel: t,
    hinweise: [],
    bewertet: new Map(),
  }
}

const KERNBLATT_BEREICH: Record<string, Bereich> = {
  'gefuehle-erkennen': 'gefuehle', 'gefuehle-ausdruecken': 'gefuehle', impulskontrolle: 'verhalten', selbstregulation: 'verhalten',
  kooperation: 'miteinander', konflikte: 'miteinander', kommunikation: 'miteinander', aufmerksamkeit: 'lernen', ausdauer: 'lernen',
  lernstrategien: 'lernen', selbstbild: 'selbstreflexion', alltag: 'alltag',
}

/** Inhalt des Blatts zur Übung (kernBlatt): kurz, ohne Pflicht, Persönliches aufzuschreiben. */
function kernBlattInhalt(kern: KatalogEintrag, phase: Bogen | 'leicht', sprache: Sprache, o: { wenigSchreiben: boolean; nr: number }): Baustein[] {
  const fr = sprache === 'fr'
  const t = textVon(kern, sprache)
  const frage = (t.sagen ?? []).find((x) => /\?\s*[»“"]?$/.test(x.trim()) && x.length <= 140)
  const liste: Baustein[] = [
    { art: 'text', klein: true, text: fr ? `Pour l’exercice « ${t.titel} ». Rien n’est obligatoire : tu peux aussi prendre un exemple inventé.` : `Zur Übung „${t.titel}“. Nichts davon ist Pflicht: Ein erfundenes Beispiel geht auch.` },
  ]
  // eigenes Blatt der Übung (Blind-Bewertung 6: „das Blatt setzt den Kern nicht fort“); bei wenig Schreiben oder schwerem
  // Tag nur der Text-Kasten und die ersten zwei Aufgaben (die brauchen wenig Schreiben)
  const eigen = kern.typ === 'schritt' ? kern.uebungsblatt : undefined
  if (eigen) {
    const teile = (fr ? eigen.fr : eigen.de) ?? []
    let aufgaben = 0
    for (const b of teile) {
      if (b.art !== 'text') aufgaben++
      if (o.wenigSchreiben && aufgaben > 2) break
      liste.push(o.wenigSchreiben && b.art === 'frage' ? { ...b, linien: Math.min(b.linien ?? 2, 2) } : b)
    }
    return liste
  }
  const F = (de: string, f: string, linien = 2): Baustein => ({ art: 'frage', text: fr ? f : de, linien })
  const sicher: Baustein = { art: 'skala', frage: fr ? 'Je me sens …' : 'Damit fühle ich mich …', von: fr ? 'pas encore sûr·e' : 'noch unsicher', bis: fr ? 'tout à fait sûr·e' : 'ganz sicher', stufen: 5 }
  // wenig Lesen und Schreiben oder ruhiges Tempo (Blind-Bewertung 6: „drei bis vier offene Schreibfragen bei Schreiben 1“):
  // zwei kurze Teile, je eine Zeile, eine Skala zum Ankreuzen
  if (o.wenigSchreiben) {
    switch (phase) {
      case 'wahrnehmen':
        liste.push({ art: 'skala', frage: fr ? 'Je le remarque déjà …' : 'Ich merke es schon …', von: fr ? 'rarement' : 'selten', bis: fr ? 'tout de suite' : 'sofort', stufen: 5 }, F('Woran merke ich es als Erstes?', 'À quoi je le remarque en premier ?', 1))
        break
      case 'uebertragen':
        liste.push(F('Wo probiere ich es aus?', 'Où est-ce que je l’essaie ?', 1), F('Wann?', 'Quand ?', 1))
        break
      case 'reflektieren':
        liste.push(F('Am meisten geholfen hat mir:', 'Ce qui m’a le plus aidé :', 1), { art: 'skala', frage: fr ? 'Maintenant, ça marche …' : 'Jetzt klappt es …', von: fr ? 'pas encore' : 'noch nicht', bis: fr ? 'bien' : 'gut', stufen: 5 })
        break
      default:
        liste.push(F('Mein Satz für das nächste Mal:', 'Ma phrase pour la prochaine fois :', 1), sicher)
    }
    return liste
  }
  switch (phase) {
    case 'wahrnehmen':
      liste.push(
        F('Eine Situation, in der das vorkommt (echt oder erfunden):', 'Une situation où ça arrive (vraie ou inventée) :'),
        F('Woran merke ich es als Erstes?', 'À quoi je le remarque en premier ?'),
        { art: 'skala', frage: fr ? 'Je le remarque déjà …' : 'Ich merke es schon …', von: fr ? 'rarement' : 'selten', bis: fr ? 'tout de suite' : 'sofort', stufen: 5 },
      )
      break
    case 'verstehen':
      liste.push(
        { art: 'tabelle', spalten: fr ? ['Situation', 'Ce que je pense', 'Ce que je fais'] : ['Situation', 'Was ich denke', 'Was ich tue'], zeilen: 2 },
        F('Was würde mir in so einem Moment helfen?', 'Qu’est-ce qui m’aiderait dans un moment pareil ?'),
      )
      break
    case 'uebertragen':
      liste.push(
        { art: 'wennDann', zeilen: 2, wenn: fr ? 'Si … (où, quand, avec qui)' : 'Wenn … (wo, wann, mit wem)', dann: fr ? 'alors j’essaie …' : 'dann probiere ich …' },
        F('Mein kleiner Versuch bis zum nächsten Mal:', 'Mon petit essai d’ici la prochaine fois :'),
        F('Und wenn es nicht klappt?', 'Et si ça ne marche pas ?', 1),
      )
      break
    case 'reflektieren':
      liste.push(
        F('Was hat sich seit der ersten Sitzung verändert?', 'Qu’est-ce qui a changé depuis la première séance ?', 3),
        { art: 'satzanfaenge', items: fr ? ['Ce qui m’a le plus aidé :', 'Ce à quoi je veux continuer à faire attention :'] : ['Am meisten geholfen hat mir:', 'Darauf will ich weiter achten:'], linien: 2 },
      )
      break
    default:
      // zwei Üben-Sitzungen hintereinander: nicht zweimal dasselbe Blatt (Blind-Bewertung 6)
      if (o.nr % 2 === 0) {
        liste.push(
          F('Was war in der Übung leicht, was schwer?', 'Qu’est-ce qui était facile dans l’exercice, qu’est-ce qui était difficile ?'),
          { art: 'wennDann', zeilen: 1, wenn: fr ? 'Si ça m’arrive …' : 'Wenn mir das passiert …', dann: fr ? 'alors je dis ou je fais …' : 'dann sage oder tue ich …' },
          F('Wer oder was kann mir dabei helfen?', 'Qui ou quoi peut m’aider ?', 1),
          sicher,
        )
        break
      }
      liste.push(
        ...(frage ? [F(frage, frage)] : []),
        { art: 'satzanfaenge', items: fr ? ['Ma phrase (ou mon pas) pour la prochaine fois :', 'Ce qui rendrait ça plus facile :'] : ['Mein Satz (oder mein Schritt) für das nächste Mal:', 'Leichter würde es, wenn …'], linien: 2 },
        F('Wo könnte mir das begegnen (Schule, Freunde, online …)?', 'Où est-ce que ça pourrait m’arriver (école, amis, en ligne …) ?'),
        sicher,
      )
  }
  return liste
}

/** Teilt ein Blatt-Teil Ziel oder Thema mit dem Kern? (auch für Tests und Testlauf) */
export function blattTeilKohaerent(e: MikroBaustein, kern: { codes: Set<string>; themen: Set<string>; felder: Set<string>; blatt: Set<string>; kindThemen: { has(k: string): boolean }; streng?: boolean }): boolean {
  if (!kern.codes.size && !kern.themen.size) return true
  // streng (Einzelübung für Jugendliche als Kern): das Hauptziel oder das Hauptthema des Teils gehört zum Kern – dritte
  // Blind-Bewertung: „das Blatt zu Prüfungsstress hat mit dem Kern nichts zu tun“ (ein Nebenziel oder dasselbe
  // Kompetenzfeld mit einem Thema des Kindes reichte bisher)
  if (kern.streng) return kern.blatt.has(e.id) || e.eldib.some((x) => x.gewicht === 1 && kern.codes.has(x.code)) || (!!e.thema[0] && kern.themen.has(e.thema[0])) || (e.art.includes('rueckblick') && !e.thema.length)
  if (kern.blatt.has(e.id) || e.eldib.some((x) => kern.codes.has(x.code)) || e.thema.some((t) => kern.themen.has(t))) return true
  if (e.kompetenz.some((x) => kern.felder.has(x)) && (!e.thema.length || e.thema.some((t) => kern.kindThemen.has(t)))) return true
  return e.art.includes('rueckblick') && !e.thema.length
}

function mitStelle(b: Bewertet, stelle: Bogen | '*', formate: Set<string>, gewaehlt: Bewertet[]): Bewertet {
  let s = b.s
  if (stelle !== '*' && b.e.bogen === stelle) s += 0.05
  if (b.e.format.some((f) => formate.has(f))) s -= 0.04
  // roter Faden auf dem Blatt: gleiches Thema wie die schon gewählten Teile, lieber aus einem Blatt, das schon dabei ist
  const themen = new Set(gewaehlt.flatMap((x) => x.e.thema.slice(0, 1)))
  if (gewaehlt.length && b.e.thema.some((t) => themen.has(t))) s += 0.08
  const quellen = new Set(gewaehlt.map((x) => (x.e as MikroBaustein).quelle.blatt))
  if (gewaehlt.length && !quellen.has((b.e as MikroBaustein).quelle.blatt)) s -= 0.04
  return { ...b, s }
}

function kurzTitel(k: Katalog, e: KatalogEintrag): string {
  if (e.typ === 'schritt') return e.titel.slice(0, 60)
  const liste = bausteinInhalt(k, e, 'de')
  const a = liste.find((x): x is Extract<Baustein, { art: 'aufgabe' }> => x.art === 'aufgabe')
  const t = a?.text ?? texte(liste)[0]?.text ?? e.art.join(', ')
  return t.length > 60 ? t.slice(0, 59).replace(/\s+\S*$/, '') + ' …' : t
}

// ---------------------------------------------------------------------------------------------------------------------
// Synthetisches Blatt für den Renderer (7.5)
// ---------------------------------------------------------------------------------------------------------------------

const STUNDE_WORT: Record<Rolle, { de: string; fr: string; bild: string }> = {
  ankommen: { de: 'Ankommen', fr: 'Arriver', bild: 'icon:door-enter' },
  einstieg: { de: 'Anfangen', fr: 'Commencer', bild: 'icon:bulb' },
  kern: { de: 'Üben', fr: 'S’entraîner', bild: 'icon:target' },
  uebung: { de: 'Blatt', fr: 'Fiche', bild: 'icon:pencil' },
  bewegung: { de: 'Bewegen', fr: 'Bouger', bild: 'icon:run' },
  spiel: { de: 'Spielen', fr: 'Jouer', bild: 'icon:dice-5' },
  regulation: { de: 'Ruhe', fr: 'Calme', bild: 'icon:leaf' },
  reflexion: { de: 'Zurückschauen', fr: 'Revenir', bild: 'icon:eye' },
  abschluss: { de: 'Tschüss', fr: 'Au revoir', bild: 'icon:door-exit' },
  transfer: { de: 'Mitnehmen', fr: 'Emporter', bild: 'icon:star' },
}

function ersetzePlatzhalter(liste: Baustein[], p: Profil, sprache: Sprache): Baustein[] {
  const werte: Record<string, string> = {
    NAME: p.anrede ?? '',
    INTERESSE: p.interessen[0] ? interesseName(p.interessen[0], sprache) : '',
    WOCHENZIEL: p.wochenziel ?? '',
  }
  const tausche = (x: unknown): unknown => {
    if (typeof x === 'string') return x.replace(/\{(NAME|INTERESSE|WOCHENZIEL)\}/g, (_, k: string) => werte[k] ?? '').replace(/\s{2,}/g, ' ')
    if (Array.isArray(x)) return x.map(tausche)
    if (x && typeof x === 'object') return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, tausche(v)]))
    return x
  }
  return tausche(liste) as Baustein[]
}

function ausblenden(liste: Baustein[], pfade: string[]): Baustein[] {
  if (!pfade.length) return liste
  const kopie = JSON.parse(JSON.stringify(liste)) as Baustein[]
  // Pfad wie '1.items.2': Element aus einer Liste nehmen (von hinten, damit die Stellen stimmen)
  for (const pfad of [...pfade].sort().reverse()) {
    const teile = pfad.split('.')
    const letzter = Number(teile.pop())
    let ziel: unknown = kopie
    for (const t of teile) ziel = (ziel as Record<string, unknown>)?.[t]
    if (Array.isArray(ziel) && Number.isInteger(letzter)) ziel.splice(letzter, 1)
  }
  return kopie
}

function bereichFuer(blatt: { bereich: Bereich; thema: string }): { bereich: Bereich; thema: string } {
  if (blatt.bereich === 'skills') {
    const [b, t] = SKILLS_BEREICH[blatt.thema] ?? ['alltag', 'wohlbefinden']
    return { bereich: b as Bereich, thema: t }
  }
  return { bereich: blatt.bereich, thema: blatt.thema }
}

/** Das Blatt einer Sitzung als synthetisches `Blatt` (für BlattDokument, Vorschau und PDF). */
export function kinderblatt(k: Katalog, p: Profil, plan: Plan, nr: number, sprache: Sprache): Blatt {
  const s = plan.sitzungen.find((x) => x.nr === nr)
  const alter = p.alterJahre
  const stufe = stufenAbstand(stufeAusAlter(alter), [p.stufen[0] ?? stufeAusAlter(alter)]) >= 2 ? stufeAusAlter(alter) : (p.stufen[0] ?? stufeAusAlter(alter))
  let layout: Layout = p.layout
  if (alter >= 12 && (layout === 'bild' || layout === 'gross')) layout = 'jugend'
  const sp: BlattSprache = sprache
  const bausteine: Baustein[] = []
  const herkunft: string[] = []
  const quellen: string[] = []
  let lehrerQuelle: BlattInhalt['lehrer'] | null = null
  const teileIds: (string | null)[] = []
  // jeden Baustein eines Teils mit der Kennung des Teils markieren: die Vorschau vereinigt ihre Rechtecke (T-M8)
  const markiere = (idx: number, n: number, id: string) => {
    while (teileIds.length < bausteine.length) teileIds.push(null)
    for (let i = idx; i < idx + n; i++) teileIds[i] = id
  }
  for (const [ti, t] of (s?.blatt?.bausteine ?? []).entries()) {
    const start = bausteine.length
    const teilId = `pg-teil:${nr}:blatt:${ti}`
    if (t.ref === BLATT_SYSTEM.notfall) {
      bausteine.push({ art: 'notfall' })
      markiere(start, 1, teilId)
      continue
    }
    if (t.ref === BLATT_SYSTEM.kernblatt) {
      const kr = (s?.schritte ?? []).find((x) => x.rolle === 'kern')?.ref
      const kern = kr ? k.eintraege.get(kr) : undefined
      const h = plan.auftrag?.heute
      // schwerer Tag (Stimmung oder Konzentration ≤ 2): kurzes Blatt wie bei wenig Schreiben (Blind-Bewertung 6)
      const schwer = !!h && (h.stimmung <= 2 || h.konzentration <= 2)
      if (kern) bausteine.push(...kernBlattInhalt(kern, s!.phase === 'reflektieren' && plan.n < 2 ? 'ueben' : s!.phase, sprache, { wenigSchreiben: schwer || p.zugang.schreiben <= 1 || p.zugang.lesen <= 1 || p.zugang.tempo === 'ruhig', nr }))
      markiere(start, bausteine.length - start, teilId)
      continue
    }
    if (t.ref === BLATT_SYSTEM.stundenleiste) {
      const schritte = (s?.schritte ?? []).filter((x) => x.min > 0).slice(0, 7)
      if (schritte.length >= 2) bausteine.push({ art: 'stundenleiste', schritte: schritte.map((x) => ({ text: STUNDE_WORT[x.rolle][sprache], bild: STUNDE_WORT[x.rolle].bild, min: x.min })) })
      markiere(start, bausteine.length - start, teilId)
      continue
    }
    const e = k.eintraege.get(t.ref) ?? intern(k).nachH.get(t.h)
    if (!e || e.typ !== 'baustein') continue
    let liste = bausteinInhalt(k, e, sprache)
    for (const [pfad, text] of Object.entries(t.ueber ?? {})) liste = setzeText(liste, pfad, text)
    liste = ausblenden(liste, t.ausgeblendet ?? [])
    bausteine.push(...ersetzePlatzhalter(liste, p, sprache))
    markiere(start, bausteine.length - start, teilId)
    const quelle = intern(k).q.blatt.get(e.quelle.blatt)
    if (quelle) {
      if (!herkunft.includes(quelle.nr)) herkunft.push(quelle.nr)
      quellen.push(quelle.id)
      const inhalt = (sprache === 'fr' && quelle.fr) || quelle.de
      lehrerQuelle ??= inhalt.lehrer
    }
  }
  const blaetter = quellen.map((id) => intern(k).q.blatt.get(id)!).filter(Boolean)
  // Anleitung des Quellblatts nur, wenn das ganze Blatt dabei ist – sonst spricht sie von Seiten und Aufgaben, die hier
  // fehlen („Seite 2: … in Vierergruppen“, Testlauf 9.10.)
  const einQuellblatt = blaetter.length > 0 && new Set(quellen).size === 1 ? blaetter[0] : null
  const allesDabei = !!einQuellblatt && (intern(k).bausteineVonBlatt.get(einQuellblatt.id) ?? []).every((b) => (s?.blatt?.bausteine ?? []).some((t) => t.ref === b.id))
  const anleitung = allesDabei ? ((sprache === 'fr' && einQuellblatt!.fr) || einQuellblatt!.de).anleitung : undefined
  // Bereich (Farbe) nach dem Blatt mit den meisten Teilen; Spielschule nur, wenn alles aus der Spielschule kommt
  const zaehl = new Map<string, number>()
  for (const b of blaetter) zaehl.set(b.id, (zaehl.get(b.id) ?? 0) + 1)
  const haupt = blaetter.length ? intern(k).q.blatt.get([...zaehl.entries()].sort((a, b) => b[1] - a[1])[0][0])! : null
  const alleSpielschule = blaetter.length > 0 && blaetter.every((b) => b.bereich === 'spielschule')
  // Blatt zur Übung (Jugendliche): Farbe und Zeichen nach dem Kompetenzfeld des Kerns (nicht immer das Herz)
  const kernFeld = !haupt && (s?.blatt?.bausteine ?? []).some((t) => t.ref === BLATT_SYSTEM.kernblatt) ? k.eintraege.get((s?.schritte ?? []).find((x) => x.rolle === 'kern')?.ref ?? '')?.kompetenz[0] : undefined
  const { bereich, thema } = kernFeld ? { bereich: KERNBLATT_BEREICH[kernFeld] ?? ('selbstreflexion' as Bereich), thema: 'erkennen' } : haupt ? (alleSpielschule ? { bereich: 'spielschule' as Bereich, thema: haupt.thema } : bereichFuer(haupt.bereich === 'spielschule' ? { bereich: 'gefuehle', thema: 'erkennen' } : haupt)) : { bereich: 'gefuehle' as Bereich, thema: 'erkennen' }
  const titel = s?.blatt?.titel ?? 'Mein Blatt'
  const zielCode = plan.ziele.find(istEldib)
  const zielSatz = zielCode ? zielSatzVon(k, p, zielCode, sprache) : undefined
  // „Mein Ziel“ nur auf Wunsch und nie bei Jugendlichen (E-M13); ohne Ziel keine Zeile (T-M5)
  const mitZiel = !!s?.blatt?.ziel && alter < 12 && !!zielSatz
  const inhalt: BlattInhalt = {
    titel,
    ...(layout === 'bild' ? { anleitung: anleitung ?? (sprache === 'fr' ? 'Lire les consignes à voix haute et montrer les images.' : 'Aufgaben vorlesen und die Bilder zeigen.') } : {}),
    bausteine,
    lehrer: {
      ziel: zielSatz ?? lehrerQuelle?.ziel ?? '',
      ablauf: lehrerQuelle?.ablauf ?? [],
      hintergrund: lehrerQuelle?.hintergrund ?? '',
      ...(lehrerQuelle?.quellen ? { quellen: lehrerQuelle.quellen } : {}),
      ...(lehrerQuelle?.achtung ? { achtung: lehrerQuelle.achtung } : {}),
    },
  }
  const blatt: Blatt = {
    id: `pg-${hash8(plan.id + '|' + nr + '|' + (s?.blatt?.bausteine.map((b) => b.ref + (b.ueber ? JSON.stringify(b.ueber) : '')).join(',') ?? ''))}`,
    bereich,
    thema,
    stufen: [stufe],
    layout,
    sozialform: ['einzeln'],
    dauer: `${(s?.schritte ?? []).find((x) => x.rolle === 'uebung')?.min ?? 10} Min.`,
    // keine ELDiB-Codes auf dem Blatt des Kindes (9.6 Punkt 2)
    eldib: [],
    schlagworte: [],
    passgenau: {
      ...(mitZiel ? { ziel: { [sp]: zielSatz! } } : {}),
      // ohne Blattnummern: „V-12“ sähe auf dem Blatt des Kindes aus wie ein ELDiB-Code (9.6) – die Quellen stehen im Planblatt
      herkunft: herkunft.length ? (sprache === 'fr' ? `Passgenau · ${herkunft.length > 1 ? `éléments de ${herkunft.length} fiches` : 'éléments d’une fiche'} de la Toolbox` : `Passgenau · ${herkunft.length > 1 ? `Bausteine aus ${herkunft.length} Blättern` : 'Bausteine aus einem Blatt'} der Toolbox`) : undefined,
      teile: [...teileIds, ...Array(Math.max(0, bausteine.length - teileIds.length)).fill(null)],
    },
    de: sprache === 'de' ? inhalt : { ...inhalt },
    ...(sprache === 'fr' ? { fr: inhalt } : {}),
  }
  return blatt
}
