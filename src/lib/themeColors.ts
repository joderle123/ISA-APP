// Per-theme accent colours (deep = foreground, light = tint) — shared by the
// on-screen worksheet view. Mirrors the palette used in the PDF renderer.
export const THEME_COLOR: Record<string, { deep: string; light: string }> = {
  selbstwahrnehmung: { deep: '#2f5597', light: '#dbe5f1' },
  fremdwahrnehmung: { deep: '#2e75b6', light: '#deebf7' },
  selbstwertgefuehl: { deep: '#c55a11', light: '#fbe4d5' },
  identitaet: { deep: '#7030a0', light: '#e7dcf2' },
  kommunikation: { deep: '#548235', light: '#e2efda' },
  beziehungsaufbau: { deep: '#bf8f00', light: '#fff2cc' },
  kooperation: { deep: '#1f8a8a', light: '#d7f0f0' },
  achtsamkeit: { deep: '#4472c4', light: '#dbe5f1' },
  konfliktloesung: { deep: '#7030a0', light: '#e7dcf2' },
  bewegung: { deep: '#548235', light: '#e2efda' },
  'spiel-spass': { deep: '#d18f00', light: '#fff2cc' },
  resilienz: { deep: '#2f6b3c', light: '#dcebe1' },
  impulskontrolle: { deep: '#c55a11', light: '#fbe4d5' },
  emotionen: { deep: '#c00000', light: '#f8dada' },
  stressbewaeltigung: { deep: '#3a8f8f', light: '#d7f0f0' },
  ressourcen: { deep: '#bf8f00', light: '#fff2cc' },
  kreativitaet: { deep: '#9933cc', light: '#efe0f7' },
  grenzen: { deep: '#806000', light: '#f0e6c8' },
  disziplin: { deep: '#44546a', light: '#d6dce5' },
  mobbing: { deep: '#a52a2a', light: '#f3dada' },
  motivation: { deep: '#c55a11', light: '#fbe4d5' },
  gerechtigkeit: { deep: '#44546a', light: '#d6dce5' },
  gewalt: { deep: '#843c0c', light: '#f0dccd' },
  medien: { deep: '#2e75b6', light: '#deebf7' },
  sexualitaet: { deep: '#b0367a', light: '#f6dcea' },
  'etep-epu': { deep: '#2f5597', light: '#dbe5f1' },
  // Jugend-/Sekundar-Themen
  'liebe-beziehungen': { deep: '#d6336c', light: '#fbe0ea' },
  'koerper-selbstbild': { deep: '#c0560f', light: '#fbe4d5' },
  'psychische-gesundheit': { deep: '#2f8f6b', light: '#d7f0e6' },
  'sucht-praevention': { deep: '#9c4221', light: '#f0ddd2' },
  gruppendruck: { deep: '#b08900', light: '#fff2cc' },
  'diskriminierung-vielfalt': { deep: '#7048c4', light: '#e7dcf7' },
  'demokratie-engagement': { deep: '#1f6f8b', light: '#d7eaf0' },
  'zukunft-beruf': { deep: '#2f5597', light: '#dbe5f1' },
  'geld-konsum': { deep: '#3a7d44', light: '#dcefe0' },
}

export const themeColor = (id?: string) =>
  (id && THEME_COLOR[id]) || { deep: '#2f5597', light: '#dbe5f1' }
