// Passgenau – Stundenbild (22.10.2026, Rückmeldung: „wenn man eine Stunde plant, steht nur Text da – sehr abschreckend“).
// Die geplante Stunde als Bild: oben eine Zeitleiste der Phasen (Breite nach Minuten, Farbe nach Rolle), daneben „Auf einen
// Blick“ (Ziel, erster Satz, Material zum Abhaken), und jede Karte bekommt ein Bild aus den Motiven der Toolbox, die Sätze zum
// Sagen als Sprechblasen und „Wenn es kippt“ sichtbar. Die Texte kommen aus denselben Druckdaten wie das PDF (kern/druck.ts).
import { useState, type ReactNode } from 'react'
import { ZeichnungSvg } from '../../blatt/ZeichnungSvg'
import { bildZeichnung, palette } from '../../blatt/zeichnung'
import { MOTIV_NAMEN } from '../../blatt/motive'
import { istGefuehl } from '../../blatt/gesichter'
import type { Farben } from '../../blatt/katalog'
import type { KatalogEintrag } from '../typen'
import { Ic } from './zeichen'
import { ROLLE_NAME } from './texte'

/** Farben je Rolle: „tief“ wie die Rollen-Pille (.r-*), dazu ein mittlerer und ein heller Ton für Bild und Fläche */
export const ROLLE_FARBE: Record<string, Farben> = {
  ankommen: { tief: '#1f6b6f', mittel: '#6fbcb7', zart: '#e3f3f1' },
  einstieg: { tief: '#3e6a85', mittel: '#86b6d3', zart: '#e5f0f7' },
  kern: { tief: '#2e3a9c', mittel: '#8f98e2', zart: '#eceefa' },
  uebung: { tief: '#a33b5b', mittel: '#e391a8', zart: '#fbe8ee' },
  blatt: { tief: '#a33b5b', mittel: '#e391a8', zart: '#fbe8ee' },
  bewegung: { tief: '#9a4f0b', mittel: '#eda866', zart: '#fdf0e2' },
  spiel: { tief: '#6e4a7e', mittel: '#bc98cc', zart: '#f3ebf7' },
  regulation: { tief: '#3f6e3a', mittel: '#97c98f', zart: '#e9f4e7' },
  reflexion: { tief: '#7a5810', mittel: '#dbb766', zart: '#faf2df' },
  abschluss: { tief: '#4f5970', mittel: '#a7b0c4', zart: '#eef0f5' },
  transfer: { tief: '#5c4a8a', mittel: '#ac9dd8', zart: '#efebf8' },
  wahl: { tief: '#3f46a8', mittel: '#9da3e2', zart: '#eceefa' },
}
export function rolleFarbe(rolle: string): Farben {
  return ROLLE_FARBE[rolle] ?? ROLLE_FARBE.kern
}

function norm(s: string): string {
  return s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').normalize('NFD').replace(/[̀-ͯ]/g, '')
}

/** Wörter im Titel → Motiv (geht vor allem anderen; Deutsch und Französisch) */
const WORT_MOTIV: Record<string, string> = {
  detektiv: 'lupe', detektive: 'lupe', forscher: 'lupe', forschen: 'lupe', experiment: 'lupe', entdecken: 'lupe', enquete: 'lupe', detective: 'lupe',
  gefuehl: 'herz', gefuehle: 'herz', emotion: 'herz', emotions: 'herz', emotionen: 'herz', coeur: 'herz', herz: 'herz',
  wut: 'vulkan', zorn: 'vulkan', colere: 'vulkan', vulkan: 'vulkan', volcan: 'vulkan',
  angst: 'schutzschild', peur: 'schutzschild', mut: 'rakete', courage: 'rakete', stark: 'schutzschild', staerke: 'schutzschild',
  freund: 'freunde', freunde: 'freunde', freundin: 'freunde', freundschaft: 'freunde', ami: 'freunde', amis: 'freunde', amitie: 'freunde',
  streit: 'stopp-hand', konflikt: 'stopp-hand', dispute: 'stopp-hand', conflit: 'stopp-hand', stopp: 'stopp-hand', stop: 'stopp-hand',
  pause: 'sanduhr', warten: 'sanduhr', attendre: 'sanduhr', geduld: 'sanduhr', patience: 'sanduhr', zeit: 'uhr', temps: 'uhr',
  atem: 'ballon', atmen: 'ballon', atemzug: 'ballon', respirer: 'ballon', respiration: 'ballon', souffle: 'ballon', luftballon: 'ballon',
  ruhe: 'kerze', ruhig: 'kerze', calme: 'kerze', stille: 'kerze', entspannung: 'kissen', entspannen: 'kissen', detente: 'kissen',
  koerper: 'koerper', corps: 'koerper', koerperreise: 'koerper',
  geschichte: 'buch', geschichten: 'buch', erzaehlen: 'buch', histoire: 'buch', conte: 'buch', bilderbuch: 'buch', lesen: 'buch', lire: 'buch', buch: 'buch',
  lied: 'noten', singen: 'noten', chanson: 'noten', chanter: 'noten', musik: 'noten', musique: 'noten', rhythmus: 'trommel', rythme: 'trommel', trommel: 'trommel', tambour: 'trommel', klatschen: 'trommel',
  telefon: 'telefon', interview: 'mikrofon', reporter: 'mikrofon', mikrofon: 'mikrofon', micro: 'mikrofon', nachrichten: 'mikrofon',
  theater: 'theatermasken', theatre: 'theatermasken', rollenspiel: 'theatermasken', szene: 'theatermasken', scene: 'theatermasken', pantomime: 'maske', mime: 'maske', maske: 'maske', masque: 'maske',
  malen: 'palette', zeichnen: 'stift', dessin: 'palette', dessiner: 'palette', peindre: 'palette', farben: 'palette', couleurs: 'palette',
  basteln: 'schere', bricolage: 'schere', bauen: 'bauklotz', construire: 'bauklotz', turm: 'turm-1', tour: 'turm-1', knete: 'knete', kneten: 'knete',
  ziel: 'zielscheibe', ziele: 'zielscheibe', but: 'zielscheibe', objectif: 'zielscheibe', plan: 'kalender', woche: 'kalender', semaine: 'kalender',
  regel: 'tafel', regeln: 'tafel', regle: 'tafel', regles: 'tafel', vertrag: 'notizbuch', abmachung: 'haendedruck', versprechen: 'haendedruck',
  schatz: 'geschenk', tresor: 'geschenk', geschenk: 'geschenk', kompliment: 'geschenk', komplimente: 'geschenk', cadeau: 'geschenk', lob: 'pokal', stolz: 'pokal', fier: 'pokal', fierte: 'pokal',
  brief: 'sprechblase', post: 'paket', fragen: 'sprechblasen', frage: 'sprechblase', gespraech: 'sprechblasen', reden: 'sprechblasen', parler: 'sprechblasen', dialogue: 'sprechblasen', zuhoeren: 'ohr-nah', ecouter: 'ohr-nah', ecoute: 'ohr-nah',
  hand: 'hand-offen', main: 'hand-offen', haende: 'hand-offen', helfen: 'kind-troesten', hilfe: 'rettungsring', aide: 'rettungsring', aider: 'kind-troesten', troesten: 'kind-troesten', consoler: 'kind-troesten',
  teilen: 'teilen', partager: 'teilen', gruppe: 'gruppe', groupe: 'gruppe', team: 'gruppe', equipe: 'gruppe', familie: 'familie', famille: 'familie',
  gedanken: 'gedanken-kopf', denken: 'gedanken-kopf', pensees: 'gedanken-kopf', penser: 'gedanken-kopf', kopf: 'gehirn', cerveau: 'gehirn', gehirn: 'gehirn',
  ampel: 'ampel', feu: 'ampel', thermometer: 'thermometer', waage: 'waage', balance: 'waage', schildkroete: 'schildkroete', tortue: 'schildkroete',
  insel: 'insel', ile: 'insel', bruecke: 'bruecke', pont: 'bruecke', rucksack: 'rucksack', sac: 'rucksack', werkzeug: 'werkzeugkiste', werkzeugkiste: 'werkzeugkiste', outils: 'werkzeugkiste', boite: 'werkzeugkiste',
  ball: 'ball', balle: 'ball', wuerfel: 'wuerfel', memory: 'puzzle', puzzle: 'puzzle', karten: 'puzzle', cartes: 'puzzle', quiz: 'gluehbirne', raetsel: 'gluehbirne', idee: 'gluehbirne', idees: 'gluehbirne',
  spiegel: 'spiegel', miroir: 'spiegel', kerze: 'kerze', bougie: 'kerze', stern: 'stern', etoile: 'stern', sterne: 'sterne', sonne: 'sonne', soleil: 'sonne', wolke: 'wolke', nuage: 'wolke', regen: 'regen', pluie: 'regen', wetter: 'regen', meteo: 'regen',
  baum: 'baum', arbre: 'baum', blume: 'blume', fleur: 'blume', samen: 'samenkorn', wachsen: 'setzling', grandir: 'setzling', garten: 'giesskanne', jardin: 'giesskanne',
  kochen: 'topf', cuisine: 'topf', cuisiner: 'topf', backen: 'ofen', rezept: 'kelle', recette: 'kelle', essen: 'teller', manger: 'teller', obst: 'apfel', fruits: 'apfel',
  draussen: 'baum', natur: 'baum', nature: 'baum', wald: 'baum', foret: 'baum', spaziergang: 'fussspuren', promenade: 'fussspuren', weg: 'fussspuren', chemin: 'fussspuren', schritte: 'fussspuren',
  bewegung: 'laufen', bouger: 'laufen', mouvement: 'laufen', laufen: 'laufen', courir: 'laufen', rennen: 'laufen', springen: 'laufen', sauter: 'laufen', tanzen: 'noten', danse: 'noten', danser: 'noten', yoga: 'turnmatte',
  statue: 'schauspieler', statuen: 'schauspieler', figur: 'teddy', figuren: 'teddy', handpuppe: 'teddy', marionnette: 'teddy', puppe: 'teddy',
  foto: 'kamera', photo: 'kamera', kamera: 'kamera', film: 'kamera', video: 'kamera', handy: 'handy', medien: 'handy', medias: 'handy', internet: 'handy', chat: 'handy-chat',
  geheimnis: 'schluessel', secret: 'schluessel', schluessel: 'schluessel', cle: 'schluessel', tuer: 'tuer', porte: 'tuer', haus: 'haus', maison: 'haus', schule: 'schule', ecole: 'schule',
  feiern: 'konfetti', fete: 'konfetti', feier: 'konfetti', abschluss: 'konfetti', danke: 'herz', merci: 'herz', mag: 'herz', liebe: 'herz',
  krone: 'krone', koenig: 'krone', roi: 'krone', ritter: 'ritter', chevalier: 'ritter', drache: 'drache', dragon: 'drache', burg: 'burg', chateau: 'burg', zauber: 'magier', magie: 'magier', magicien: 'magier',
  rakete: 'rakete', fusee: 'rakete', weltall: 'rakete', espace: 'rakete', reise: 'koffer', voyage: 'koffer', koffer: 'koffer', valise: 'koffer',
  becher: 'becher', gobelet: 'becher', glas: 'wasserglas', verre: 'wasserglas', glocke: 'glocke', cloche: 'glocke', klang: 'klangschale', klangschale: 'klangschale',
  sinne: 'auge-nah', sens: 'auge-nah', riechen: 'nase-nah', sentir: 'nase-nah', hoeren: 'ohr-nah', tasten: 'hand-offen', fuehlen: 'hand-offen', toucher: 'hand-offen', sehen: 'auge-nah', voir: 'auge-nah',
  batterie: 'batterie-voll', energie: 'batterie-voll', akku: 'batterie-voll', mude: 'batterie-leer', muede: 'batterie-leer', fatigue: 'batterie-leer',
  schutz: 'schutzschild', bouclier: 'schutzschild', grenze: 'stopp-hand', grenzen: 'stopp-hand', limite: 'stopp-hand', limites: 'stopp-hand', nein: 'stopp-hand', non: 'stopp-hand',
}

/** Formate (Katalog) → Motiv */
const FORMAT_MOTIV: Record<string, string> = {
  schreiben: 'stift', ankreuzen: 'stift', malen: 'palette', basteln: 'schere', lesen: 'buch', geschichte: 'buch', comic: 'sprechblasen', gespraech: 'sprechblasen',
  rollenspiel: 'theatermasken', bewegung: 'laufen', spiel: 'wuerfel', musik: 'noten', sinne: 'auge-nah', atmen: 'ballon', denkmodell: 'ampel', plan: 'kalender',
  karten: 'puzzle', digital: 'handy', experiment: 'lupe', bauen: 'bauklotz', quiz: 'gluehbirne', figuren: 'teddy', interview: 'mikrofon', wuerfelspiel: 'wuerfel',
  ballspiel: 'ball', statuen: 'schauspieler', pantomime: 'maske', kochen: 'topf', draussen: 'baum', theater: 'theatermasken', kunst: 'palette', philosophieren: 'gedanken-kopf',
  achtsamkeit: 'klangschale', projekt: 'werkzeugkiste', stationen: 'fussspuren', kreis: 'gruppe',
}

/** Material-Schlüssel (inhalte/material.json) → Motiv */
export const MATERIAL_MOTIV: Record<string, string> = {
  alltagsdinge: 'korb', ball: 'ball', becher: 'becher', buecher: 'buch', decke: 'kissen', glas: 'wasserglas', heft: 'notizbuch', kissen: 'kissen', klebeband: 'paket',
  kleber: 'stiftebecher', korb: 'korb', lampe: 'taschenlampe', lineal: 'lineal', loeffel: 'loeffel', papier: 'notizbuch', radiergummi: 'radiergummi', schere: 'schere',
  schuhkarton: 'paket', socke: 'socke', spielkarten: 'puzzle', stifte: 'stift', stuhl: 'stuhl', tuch: 'schal', uhr: 'uhr', wuerfel: 'wuerfel', zeitschrift: 'buch',
  zeitung: 'buch', karopapier: 'lineal', buntstifte: 'stiftebecher', karten: 'puzzle', knete: 'knete', handpuppe: 'teddy', bausteine: 'bauklotz', sanduhr: 'sanduhr',
  tuecher: 'schal', musik: 'kopfhoerer', matten: 'turnmatte', seil: 'fussspuren', klangschale: 'klangschale', spiegel: 'spiegel', wolle: 'schal', mappe: 'notizbuch',
  'blatt-druck': 'stift',
}

/** Rolle → Motiv, wenn nichts Besseres passt */
const ROLLE_MOTIV: Record<string, string> = {
  ankommen: 'tuer', einstieg: 'gluehbirne', kern: 'zielscheibe', uebung: 'stift', blatt: 'stift', bewegung: 'laufen', spiel: 'wuerfel', regulation: 'ballon',
  reflexion: 'gedanken-kopf', abschluss: 'stern', transfer: 'bruecke', wahl: 'wuerfel',
}

const NAMEN = new Set(MOTIV_NAMEN)
/** Motivnamen ab fünf Buchstaben ohne Nummer: für zusammengesetzte Wörter („Gefühlsthermometer“ → thermometer) */
const LANGE_NAMEN = MOTIV_NAMEN.filter((n) => n.length >= 5 && !/-\d$/.test(n) && !/^(platzhalter|schild-|geste-|ampel-|batterie-)/.test(n)).sort((a, b) => b.length - a.length)

/** Gefühlswort im Titel → Gesicht */
const GEFUEHL_WOERTER: Record<string, string> = {
  froh: 'froh', freude: 'froh', gluecklich: 'froh', joie: 'froh', heureux: 'froh', traurig: 'traurig', trauer: 'traurig', tristesse: 'traurig', triste: 'traurig',
  aengstlich: 'aengstlich', nervoes: 'nervoes', stolz: 'stolz', enttaeuscht: 'enttaeuscht', verlegen: 'verlegen', ueberrascht: 'ueberrascht', aufgeregt: 'aufgeregt', besorgt: 'besorgt',
}

/** Bild für einen Schritt: zuerst ein Wort im Titel, dann das Format, dann das erste Material, zuletzt die Rolle */
export function bildFuer(e: KatalogEintrag | undefined, titel: string, rolle: string): string {
  const woerter = norm(titel).split(/[^a-z0-9]+/).filter(Boolean)
  for (const w of woerter) {
    if (GEFUEHL_WOERTER[w] && istGefuehl(GEFUEHL_WOERTER[w])) return 'gesicht:' + GEFUEHL_WOERTER[w]
    const m = WORT_MOTIV[w]
    if (m && NAMEN.has(m)) return 'motiv:' + m
  }
  for (const w of woerter) {
    if (w.length >= 4 && NAMEN.has(w) && !/^(blatt|hand|auge|ohr|nase|mund)$/.test(w)) return 'motiv:' + w
    if (w.length >= 8) {
      const teil = LANGE_NAMEN.find((n) => !n.includes('-') && (w.endsWith(n) || w.startsWith(n)))
      if (teil) return 'motiv:' + teil
    }
  }
  if (e && e.typ === 'schritt') {
    for (const f of e.format ?? []) if (FORMAT_MOTIV[f] && NAMEN.has(FORMAT_MOTIV[f])) return 'motiv:' + FORMAT_MOTIV[f]
    for (const m of e.material ?? []) if (MATERIAL_MOTIV[m] && NAMEN.has(MATERIAL_MOTIV[m])) return 'motiv:' + MATERIAL_MOTIV[m]
  }
  return 'motiv:' + (ROLLE_MOTIV[rolle] ?? 'stern')
}

/** Anführungszeichen außen weg – die Blase setzt eigene */
export function ohneAnfuehrung(t: string): string {
  return t.trim().replace(/^[„"«»“‚']+\s*/, '').replace(/\s*[“"«»”‘']+$/, '').trim()
}

/** Das Bild in den Farben der Rolle (rund hinterlegt) */
export function SchrittBild({ id, rolle, className }: { id: string; rolle: string; className?: string }) {
  const z = bildZeichnung(id as Parameters<typeof bildZeichnung>[0])
  if (!z.formen.length) return null
  const f = rolleFarbe(rolle)
  return (
    <span className={'pg-sb-bild ' + (className ?? '')} style={{ background: f.zart, borderColor: f.mittel }} aria-hidden="true">
      <ZeichnungSvg z={id.startsWith('icon:') ? { ...z, w: 1.6 } : z} p={palette(f)} />
    </span>
  )
}

export interface LeistenTeil {
  rolle: string
  min: number
  titel: string
  bild: string
}

/** Zeitleiste der Stunde: jede Phase so breit wie ihre Minuten, ein Klick springt zur Karte */
export function StundenLeiste({ teile, onSprung }: { teile: LeistenTeil[]; onSprung: (i: number) => void }) {
  const gesamt = teile.reduce((a, t) => a + t.min, 0)
  let ab = 0
  return (
    <nav className="pg-sb-leiste" aria-label={`Ablauf auf einen Blick: ${gesamt} Minuten`}>
      <div className="pg-sb-spur">
        {teile.map((t, i) => {
          const start = ab
          ab += t.min
          const f = rolleFarbe(t.rolle)
          const name = ROLLE_NAME[t.rolle as keyof typeof ROLLE_NAME] ?? (t.rolle === 'blatt' ? 'Blatt' : t.rolle)
          return (
            <button
              key={i}
              type="button"
              className="pg-sb-seg"
              style={{ flexGrow: Math.max(t.min, 3), background: f.zart, borderColor: f.tief, color: f.tief }}
              onClick={() => onSprung(i)}
              title={`${name}: ${t.titel} · ${t.min} Min. (ab Minute ${start})`}
              aria-label={`${name}: ${t.titel}, ${t.min} Minuten, ab Minute ${start}`}
            >
              <SchrittBild id={t.bild} rolle={t.rolle} className="klein" />
              <span className="seg-txt">
                <b>{name}</b>
                <small>{t.min > 0 ? `${t.min} Min.` : 'optional'}</small>
              </span>
            </button>
          )
        })}
      </div>
      <div className="pg-sb-skala" aria-hidden="true">
        <span>0</span>
        <span>{Math.round(gesamt / 2)} Min.</span>
        <span>{gesamt} Min.</span>
      </div>
    </nav>
  )
}

export interface MaterialPunkt {
  schluessel: string
  name: string
}

/** „Auf einen Blick“: Ziel, erster Satz, Material zum Abhaken, Vorbereitung */
export function AufEinenBlick({ ziel, einstieg, werkzeug, material, vorbereitung, minuten, leiste }: { ziel?: string; einstieg?: string; werkzeug?: string; material: MaterialPunkt[]; vorbereitung: string[]; minuten: number; leiste?: ReactNode }) {
  const [hab, setHab] = useState<Record<string, boolean>>({})
  if (!ziel && !einstieg && !material.length && !vorbereitung.length) return null
  const fertig = material.length > 0 && material.every((m) => hab[m.schluessel])
  return (
    <section className="pg-sb-blick" aria-label="Auf einen Blick">
      <div className="pg-sb-blick-haupt">
        {ziel && (
          <div className="pg-sb-ziel">
            <SchrittBild id="motiv:zielscheibe" rolle="kern" className="mittel" />
            <div>
              <span className="pg-sb-etikett">Ziel der Stunde · {minuten} Min.</span>
              <p>{ziel}</p>
              {werkzeug && (
                <p className="pg-sb-werkzeug">
                  <Ic n="werkzeug" />
                  <span>
                    Werkzeug: <b>{werkzeug}</b>
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
        {einstieg && (
          <div className="pg-sb-einstieg">
            <span className="pg-sb-etikett">So fängst du an</span>
            <p className="pg-sb-blase gross">„{ohneAnfuehrung(einstieg)}“</p>
          </div>
        )}
      </div>
      {leiste}
      {(material.length > 0 || vorbereitung.length > 0) && (
        <div className="pg-sb-material">
          <span className="pg-sb-etikett">
            Das brauchst du{fertig ? ' – alles bereit' : ''}
            {fertig && <Ic n="check" />}
          </span>
          {material.length > 0 && (
            <ul className="pg-sb-mliste">
              {material.map((m) => (
                <li key={m.schluessel}>
                  <label className={hab[m.schluessel] ? 'hab' : ''}>
                    <input type="checkbox" checked={!!hab[m.schluessel]} onChange={(ev) => setHab((h) => ({ ...h, [m.schluessel]: ev.target.checked }))} />
                    <SchrittBild id={'motiv:' + (MATERIAL_MOTIV[m.schluessel] ?? 'korb')} rolle="abschluss" className="mini" />
                    <span>{m.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
          {vorbereitung.length > 0 && (
            <ul className="pg-sb-vorb">
              {vorbereitung.map((v) => (
                <li key={v}>
                  <Ic n="liste" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}

/** Die Sätze zum Sagen als Sprechblasen (die ersten zwei; der Rest mit „Ganzer Text“) */
export function SagenBlasen({ sagen, alle, rolle }: { sagen: string[]; alle: boolean; rolle: string }) {
  const l = sagen.filter((x) => x && x.trim())
  if (!l.length) return null
  const f = rolleFarbe(rolle)
  const zeigen = alle ? l : l.slice(0, 2)
  return (
    <span className="pg-sb-sagen">
      {zeigen.map((t, i) => (
        <span key={i} className="pg-sb-blase" style={{ background: f.zart, borderColor: f.mittel }}>
          <Ic n="sprechblase" />
          <span>„{ohneAnfuehrung(t)}“</span>
        </span>
      ))}
      {!alle && l.length > 2 && <span className="pg-sb-mehrsaetze">+ {l.length - 2} weitere Sätze unter „Ganzer Text“</span>}
    </span>
  )
}
