// Hilfe für scripts/passgenau-ui-test.cjs: plant mit dem echten Kern eine gespeicherte Folge für ein Testprofil
// (wie sie der Hub in profil.verlauf.plaene mitschickt) und markiert die ersten Sitzungen als gehalten.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/passgenau-ui-folge.ts '<json {profil, n, gehalten, id}>'
import type { Plan, Profil } from '../src/passgenau/typen'
import { planen } from '../src/passgenau/kern/planer'
import { ladeKatalogNode } from './passgenau-quellen'

const arg = JSON.parse(process.argv[2] ?? '{}') as { profil: Profil; n: number; gehalten: number; id: string; datum: string }
const k = await ladeKatalogNode()
const p = { ...arg.profil, folge: null }
const plan: Plan = planen(k, p, { weg: 'gruendlich', ziele: p.ziele.map((z) => z.code).slice(0, 2), n: arg.n, dauer: 30, sozialform: 'einzeln', sprache: p.sprache.blatt, datum: arg.datum, blatt: 'mit' }, { kind: p.vorlieben, ich: { v: 1, erkundung: 0.2, z: {} }, team: null }, { plaene: [], ereignisse: [] })
const fertig: Plan = {
  ...plan,
  id: arg.id,
  sitzungen: plan.sitzungen.map((s) => (s.nr <= arg.gehalten ? { ...s, status: 'gehalten', datum: arg.datum, gedruckt: arg.datum + 'T08:00', rueckmeldung: { ergebnis: 'geklappt', am: arg.datum, chips: ['mitgemacht'] } } : s)),
}
process.stdout.write(JSON.stringify(fertig))
