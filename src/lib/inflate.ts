// Entpackt beim Start eingebettete, gzip-komprimierte Daten (siehe
// vite.config.ts). So bleibt die Offline-Datei klein und der Browser muss
// nicht Megabytes an JavaScript-Literalen einlesen, bevor etwas erscheint.

function base64ToBytes(b64: string): Uint8Array<ArrayBuffer> {
  const bin = atob(b64)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

function tooOld(): never {
  const root = document.getElementById('root')
  if (root)
    root.innerHTML =
      '<p style="font:15px/1.5 system-ui,sans-serif;color:#7a2a18;padding:72px 16px;text-align:center">' +
      'Dieser Browser ist zu alt für die Toolbox. Bitte in einer aktuellen Version von Microsoft Edge oder Chrome öffnen.</p>'
  throw new Error('DecompressionStream wird nicht unterstützt')
}

export async function inflateText(b64: string): Promise<string> {
  if (typeof DecompressionStream === 'undefined') tooOld()
  const stream = new Blob([base64ToBytes(b64)]).stream().pipeThrough(new DecompressionStream('gzip'))
  return new Response(stream).text()
}

export async function inflateJson<T>(b64: string): Promise<T> {
  return JSON.parse(await inflateText(b64)) as T
}
