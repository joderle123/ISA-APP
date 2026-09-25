// Wer benutzt die Toolbox? Der CDSE Hub legt beim Anmelden Name und Rolle ab
// (localStorage „cdse-nutzer“, beim Abmelden wieder entfernt). Ohne Hub gilt
// der in der Team-Ablage eingetragene Name.

export interface Nutzer {
  id: string
  name: string
  rolle: 'admin' | 'responsable' | 'mitarbeiter' | 'unbekannt'
  /** true = Angaben kommen aus dem Hub-Konto */
  ausHub: boolean
}

const NAME_KEY = 'isa_team_user'

export function aktuellerNutzer(): Nutzer {
  try {
    const roh = localStorage.getItem('cdse-nutzer')
    if (roh) {
      const j = JSON.parse(roh) as { id?: string; name?: string; rolle?: string }
      if (j && j.id && j.name) {
        const r = j.rolle === 'admin' || j.rolle === 'responsable' || j.rolle === 'mitarbeiter' ? j.rolle : 'unbekannt'
        return { id: 'hub:' + j.id, name: j.name, rolle: r, ausHub: true }
      }
    }
  } catch {
    /* ignorieren */
  }
  let name = ''
  try {
    name = localStorage.getItem(NAME_KEY) || ''
  } catch {
    /* ignorieren */
  }
  return { id: 'geraet:' + geraeteId(), name: name === 'Unbekannt' ? '' : name, rolle: 'unbekannt', ausHub: false }
}

export function nameMerken(name: string): void {
  try {
    localStorage.setItem(NAME_KEY, name.trim() || 'Unbekannt')
  } catch {
    /* ignorieren */
  }
}

/** Zufällige, dauerhafte Kennung dieses Browsers (für Bewertungen ohne Hub). */
export function geraeteId(): string {
  try {
    let id = localStorage.getItem('isa-geraet')
    if (!id) {
      id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
      localStorage.setItem('isa-geraet', id)
    }
    return id
  } catch {
    return 'unbekannt'
  }
}

export function darfVerwalten(n: Nutzer): boolean {
  return n.rolle === 'admin' || n.rolle === 'responsable'
}
