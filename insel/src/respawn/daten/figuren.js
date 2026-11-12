// RESPAWN – Figuren, die es auf der Insel sonst nicht gibt (nur für einzelne Situationen), und Stimmen am Telefon.
export const FIGUREN = {
  kontrolle: { id: 'kontrolle', name: 'Kontrolleur', icon: 'anker', color: '#7f8fb5', ambient: true,
    look: { skin: '#e0b090', hair: '#4a3a2a', hairStyle: 'kurz', top: '#2b3a6b', topStyle: 'jacke', bottoms: '#1d2540', bottomsStyle: 'lang', shoes: '#2a2018', shoesStyle: 'boots', head: 'muetze', headColor: '#1d2540', build: 0.75, height: 0.7 },
    voice: { pitch: 0.85, rate: 0.95 }, schedule: [{ from: 0, to: 24, site: 'steg', hidden: true }] },
  geselle: { id: 'geselle', name: 'Marc', icon: 'hammer', color: '#c9a36b', ambient: true,
    look: { skin: '#c98a5a', hair: '#1a120c', hairStyle: 'kurz', top: '#6b7a4a', topStyle: 'hemd', bottoms: '#3d3a33', bottomsStyle: 'lang', shoes: '#2a2018', shoesStyle: 'boots', build: 0.65, height: 0.7 },
    voice: { pitch: 0.95, rate: 1.0 }, schedule: [{ from: 0, to: 24, site: 'werft', hidden: true }] },
};
// Stimmen ohne Körper (Telefon, Gruppe)
export const STIMMEN = {
  mama: { name: 'Mama', icon: 'sprechblase', color: '#ff8fb1', voice: { pitch: 1.1, rate: 0.95 } },
  papa: { name: 'Papa', icon: 'sprechblase', color: '#8fa3ff', voice: { pitch: 0.85, rate: 0.95 } },
  gruppe: { name: 'Gruppe Hafen', icon: 'sprechblase', color: '#ffd23f' },
};
