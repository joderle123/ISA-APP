// Rohdaten aller Arbeitsblätter (src/data/blaetter/*.json), UNGEFILTERT. Nur für index.ts (filtert die Blätter des
// Skills-Kurses nach kursFrei) und für Passgenau (src/passgenau/quellen.ts, nutzt die Teile für alle Fachkräfte).
// Im Build ersetzt vite.config.ts diese Datei durch eine komprimierte Fassung (einmal entpackt, von beiden geteilt).
import type { Blatt } from '../../blatt/typen'

export const blattDateien: Record<string, Blatt[]> = import.meta.glob<Blatt[]>('./*.json', { eager: true, import: 'default' })
