// Lazy access to the (heavy) PDF renderer – loaded on the first download only.
export function loadPdfModule() {
  return import('./pdf')
}
