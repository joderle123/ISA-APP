import { useMemo, useState } from 'react'
import { allMaterials } from './data/materials'
import { applyFilters, emptyFilter, type FilterState } from './lib/filter'
import { FilterPanel } from './components/FilterPanel'
import { MaterialCard } from './components/MaterialCard'
import { MaterialDetail } from './components/MaterialDetail'
import type { Material } from './types/material'

export default function App() {
  const [filter, setFilter] = useState<FilterState>(emptyFilter)
  const [selected, setSelected] = useState<Material | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const update = (partial: Partial<FilterState>) =>
    setFilter((f) => ({ ...f, ...partial }))
  const reset = () => setFilter(emptyFilter)

  const results = useMemo(() => applyFilters(allMaterials, filter), [filter])

  async function handleDownload(m: Material) {
    setDownloadingId(m.id)
    try {
      // Lazy-load the (heavy) PDF renderer only on first download.
      const { downloadMaterialPdf } = await import('./lib/pdf')
      await downloadMaterialPdf(m)
    } catch (err) {
      console.error(err)
      alert('PDF konnte nicht erstellt werden.')
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-isa-blue-deep text-sm font-bold text-white">
              ISA
            </div>
            <div>
              <div className="text-base leading-tight font-bold text-slate-800">
                ISA-App
              </div>
              <div className="text-xs leading-tight text-slate-400">
                Material-Bibliothek
              </div>
            </div>
          </div>

          <div className="order-3 w-full sm:order-2 sm:w-auto sm:flex-1">
            <input
              type="search"
              value={filter.search}
              onChange={(e) => update({ search: e.target.value })}
              placeholder="Suche nach Titel, Inhalt, Tag…"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-isa-blue-deep sm:max-w-md"
            />
          </div>

          <div className="order-2 ml-auto text-sm text-slate-500 sm:order-3">
            <span className="font-semibold text-slate-700">{results.length}</span>{' '}
            Materialien
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
        {/* Sidebar */}
        <div className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] rounded-xl border border-slate-200 bg-white p-4">
            <FilterPanel
              filter={filter}
              update={update}
              reset={reset}
              total={allMaterials.length}
              shown={results.length}
            />
          </div>
        </div>

        {/* Results */}
        <main className="min-w-0 flex-1">
          {results.length === 0 ? (
            <div className="grid place-items-center rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <div>
                <p className="text-slate-500">Keine Materialien gefunden.</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-2 text-sm font-medium text-isa-blue-deep hover:underline"
                >
                  Filter zurücksetzen
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((m) => (
                <MaterialCard
                  key={m.id}
                  material={m}
                  onOpen={setSelected}
                  onDownload={handleDownload}
                  downloading={downloadingId === m.id}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <MaterialDetail
        material={selected}
        onClose={() => setSelected(null)}
        onDownload={handleDownload}
        downloading={downloadingId === selected?.id}
      />
    </div>
  )
}
