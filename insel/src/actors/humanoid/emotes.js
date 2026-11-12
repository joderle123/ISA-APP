// Emotes (WP17): kurze Ganzkörper-Clips, die die Grund-Animation ersetzen und danach zurückblenden.
// winken · schulterzucken · stopp (Hand vor) · handHeben · nicken · kopfschuetteln · daumen · sitzenNeben · lachen
// · tanzWelle · tanzStampf · tanzDreh (drei Tänze). Jeder Clip: { seconds, loop?, fn(t, S) } mit
//   S.set(joint, x, y, z) · S.bodyY · S.expr {brows, mouth, raise} · S.hands {L:'open'|'fist'|'thumb', R} · S.wrist {L:[x,y,z], R}
//   S.yaw (Drehung des ganzen Körpers, für den Dreh-Tanz)
export const EMOTE_NAMES = ['winken', 'schulterzucken', 'stopp', 'handHeben', 'nicken', 'kopfschuetteln', 'daumen', 'sitzenNeben', 'lachen', 'tanzWelle', 'tanzStampf', 'tanzDreh'];
export const EMOTE_LABEL = { winken: 'Winken', schulterzucken: 'Schulterzucken', stopp: 'Stopp', handHeben: 'Hand heben', nicken: 'Nicken', kopfschuetteln: 'Kopfschütteln', daumen: 'Daumen hoch', sitzenNeben: 'Dazusetzen', lachen: 'Lachen', tanzWelle: 'Wellen-Tanz', tanzStampf: 'Stampf-Tanz', tanzDreh: 'Dreh-Tanz' };
export const EMOTE_ICON = { winken: 'hand', schulterzucken: 'frage', stopp: 'stopp', handHeben: 'pfeilhoch', nicken: 'check', kopfschuetteln: 'x', daumen: 'haken', sitzenNeben: 'herz', lachen: 'sonne', tanzWelle: 'wirbel', tanzStampf: 'trommel', tanzDreh: 'drehen' };
export const DANCES = ['tanzWelle', 'tanzStampf', 'tanzDreh'];

const ease = (t) => t * t * (3 - 2 * t);
const inout = (t, a = 0.2) => Math.min(1, Math.min(t / a, (1 - t) / a) / 1) ;   // 0→1→0 mit Rampen

function relaxedArms(S) { S.set('shL', 0.05, 0, 0.1); S.set('shR', 0.05, 0, -0.1); S.set('elL', -0.16, 0, 0); S.set('elR', -0.16, 0, 0); }

export const EMOTES = {
  winken: {
    seconds: 2.2,
    fn(t, S) {
      const u = Math.min(1, t / 2.2), r = ease(inout(u, 0.18));
      relaxedArms(S);
      S.set('shR', -0.2 * r, 0, -2.55 * r); S.set('elR', (-0.5 + Math.sin(t * 9) * 0.45) * r, 0, 0);
      S.set('head', -0.08 * r, 0.1 * r, -0.1 * r); S.set('spine', 0, 0.1 * r, 0.05 * r);
      S.bodyY = Math.sin(t * 1.8) * 0.008;
      S.expr = { brows: 0, mouth: 0.8 * r, raise: 0.4 * r };
    },
  },
  schulterzucken: {
    seconds: 1.6,
    fn(t, S) {
      const u = Math.min(1, t / 1.6), r = ease(inout(u, 0.3));
      S.set('shL', -0.35 * r, 0.35 * r, 0.55 * r); S.set('shR', -0.35 * r, -0.35 * r, -0.55 * r);
      S.set('elL', -1.6 * r, 0, 0.6 * r); S.set('elR', -1.6 * r, 0, -0.6 * r);
      S.wrist.L = [0, 0, -0.9 * r]; S.wrist.R = [0, 0, 0.9 * r];
      S.set('head', 0.05 * r, 0, 0.18 * r); S.set('spine', 0, 0, -0.04 * r);
      S.lift = 0.04 * r;
      S.expr = { brows: 0.6 * r, mouth: -0.1 * r, raise: 0.5 * r };
    },
  },
  // Stopp-Schild (DESIGN e23): fester Stand, Blick, Hand, kein Lächeln
  stopp: {
    seconds: 2.4,
    fn(t, S) {
      const u = Math.min(1, t / 2.4), r = ease(inout(u, 0.14));
      relaxedArms(S);
      S.set('shR', -1.55 * r, 0, -0.12 * r); S.set('elR', -0.08 * r, 0, 0);
      S.wrist.R = [-1.25 * r, 0, 0];
      S.set('hipL', 0, 0, 0.14 * r); S.set('hipR', 0, 0, -0.14 * r);
      S.set('spine', -0.06 * r, 0, 0); S.set('head', -0.04 * r, 0, 0);
      S.hands.R = 'stop';
      S.expr = { brows: -0.35 * r, mouth: -0.05, raise: 0 };
    },
  },
  handHeben: {
    seconds: 2.4,
    fn(t, S) {
      const u = Math.min(1, t / 2.4), r = ease(inout(u, 0.16));
      relaxedArms(S);
      S.set('shR', -0.4 * r, 0, -2.9 * r); S.set('elR', -0.2 * r, 0, 0);
      S.set('spine', 0, 0.06 * r, 0.08 * r); S.set('head', -0.12 * r, 0.1 * r, -0.06 * r);
      S.expr = { brows: 0.15 * r, mouth: 0.25 * r, raise: 0.5 * r };
    },
  },
  nicken: {
    seconds: 1.4,
    fn(t, S) {
      const u = Math.min(1, t / 1.4), r = inout(u, 0.15);
      relaxedArms(S);
      S.set('head', Math.max(0, Math.sin(t * 9)) * 0.35 * r, 0, 0);
      S.bodyY = Math.sin(t * 1.8) * 0.006;
      S.expr = { brows: 0, mouth: 0.4 * r, raise: 0.1 };
    },
  },
  kopfschuetteln: {
    seconds: 1.4,
    fn(t, S) {
      const u = Math.min(1, t / 1.4), r = inout(u, 0.15);
      relaxedArms(S);
      S.set('head', 0.04 * r, Math.sin(t * 10) * 0.45 * r, 0);
      S.expr = { brows: 0.1, mouth: -0.3 * r, raise: 0 };
    },
  },
  daumen: {
    seconds: 2.0,
    fn(t, S) {
      const u = Math.min(1, t / 2.0), r = ease(inout(u, 0.2));
      relaxedArms(S);
      S.set('shR', -0.75 * r, 0.25 * r, -0.35 * r); S.set('elR', -1.55 * r, 0, 0);
      S.wrist.R = [0, 0, 1.1 * r];
      S.hands.R = 'thumb';
      S.set('head', -0.06 * r, -0.1 * r, 0.08 * r);
      S.bodyY = Math.max(0, Math.sin(t * 5)) * 0.02 * r;
      S.expr = { brows: 0, mouth: 0.9 * r, raise: 0.3 * r };
    },
  },
  // Dazusetzen: Sitzen, Kopf leicht zur Seite (zur Person daneben), Hände ruhig
  sitzenNeben: {
    seconds: 8, loop: true,
    fn(t, S) {
      S.bodyY = -0.46;
      S.set('hipL', -1.5, 0, 0.1); S.set('hipR', -1.5, 0, -0.1);
      S.set('kneeL', 1.5, 0, 0); S.set('kneeR', 1.5, 0, 0);
      S.set('shL', -0.35, 0, 0.15); S.set('shR', -0.35, 0, -0.15); S.set('elL', -0.7, 0, 0); S.set('elR', -0.7, 0, 0);
      S.set('spine', 0.08, 0, 0);
      S.set('head', 0.06 + Math.sin(t * 0.5) * 0.04, 0.45 + Math.sin(t * 0.3) * 0.08, 0.1);
      S.expr = { brows: 0.15, mouth: 0.15, raise: 0.1 };
    },
  },
  lachen: {
    seconds: 2.4,
    fn(t, S) {
      const u = Math.min(1, t / 2.4), r = ease(inout(u, 0.2));
      const sh = Math.abs(Math.sin(t * 11)) * r;
      S.set('spine', -0.12 * r + sh * 0.05, 0, 0); S.set('head', -0.32 * r + sh * 0.06, 0, 0);
      S.set('shL', 0.1, 0, 0.12 + sh * 0.08); S.set('shR', -0.6 * r, 0.3 * r, -0.4 * r);
      S.set('elL', -0.2, 0, 0); S.set('elR', -1.7 * r, 0, 0);
      S.lift = sh * 0.02;
      S.bodyY = sh * 0.015;
      S.expr = { brows: 0.1, mouth: 1 * r, raise: 0.6 * r };
    },
  },
  // Tanz 1: die Welle – Arme laufen als Welle durch, Hüfte wippt
  tanzWelle: {
    seconds: 2.4, loop: true,
    fn(t, S) {
      const w = t * 2.6;
      S.set('shL', -1.45, 0, 1.2 + Math.sin(w) * 0.5); S.set('shR', -1.45, 0, -1.2 - Math.sin(w + Math.PI) * 0.5);
      S.set('elL', -0.5 + Math.sin(w + 1.2) * 0.6, 0, 0); S.set('elR', -0.5 + Math.sin(w + 1.2 + Math.PI) * 0.6, 0, 0);
      S.wrist.L = [Math.sin(w + 2.4) * 0.8, 0, 0]; S.wrist.R = [Math.sin(w + 2.4 + Math.PI) * 0.8, 0, 0];
      S.set('spine', 0.05, 0, Math.sin(w) * 0.12); S.set('head', 0.05, Math.sin(w * 0.5) * 0.2, -Math.sin(w) * 0.1);
      S.set('hipL', 0, 0, 0.06); S.set('hipR', 0, 0, -0.06);
      S.set('kneeL', Math.max(0, Math.sin(w)) * 0.25, 0, 0); S.set('kneeR', Math.max(0, -Math.sin(w)) * 0.25, 0, 0);
      S.bodyY = -0.03 + Math.abs(Math.sin(w)) * 0.03;
      S.expr = { brows: 0, mouth: 0.7, raise: 0.3 };
    },
  },
  // Tanz 2: Stampfen – Fäuste, Knie hoch, kräftig
  tanzStampf: {
    seconds: 1.6, loop: true,
    fn(t, S) {
      const w = t * 4.2, s = Math.sin(w), left = s > 0;
      S.set('hipL', left ? -0.9 * s : 0, 0, 0.1); S.set('hipR', left ? 0 : 0.9 * s, 0, -0.1);
      S.set('kneeL', left ? 1.2 * s : 0.15, 0, 0); S.set('kneeR', left ? 0.15 : -1.2 * s, 0, 0);
      S.set('shL', -0.6 + (left ? -0.9 * s : 0), 0.3, 0.35); S.set('shR', -0.6 + (left ? 0 : 0.9 * s), -0.3, -0.35);
      S.set('elL', -1.7, 0, 0); S.set('elR', -1.7, 0, 0);
      S.hands.L = 'fist'; S.hands.R = 'fist';
      S.set('spine', 0.15, 0, s * 0.08); S.set('head', 0.1, 0, 0);
      S.bodyY = -0.04 + Math.abs(Math.cos(w)) * 0.05;
      S.expr = { brows: -0.4, mouth: 0.5, raise: 0 };
    },
  },
  // Tanz 3: Drehen – ganze Figur dreht sich, Arme offen
  tanzDreh: {
    seconds: 2.4, loop: true,
    fn(t, S) {
      const w = (t / 2.4) * Math.PI * 2;
      S.yaw = w;
      S.set('shL', -0.4, 0, 1.5 + Math.sin(w * 2) * 0.3); S.set('shR', -0.4, 0, -1.5 - Math.sin(w * 2) * 0.3);
      S.set('elL', -0.3, 0, 0); S.set('elR', -0.3, 0, 0);
      S.set('spine', -0.05, 0, Math.sin(w) * 0.1); S.set('head', -0.15, 0, 0);
      S.set('hipL', 0, 0, 0.12); S.set('hipR', 0, 0, -0.12);
      S.set('kneeL', Math.max(0, Math.sin(w * 2)) * 0.5, 0, 0); S.set('kneeR', Math.max(0, -Math.sin(w * 2)) * 0.5, 0, 0);
      S.bodyY = Math.abs(Math.sin(w * 2)) * 0.05;
      S.expr = { brows: 0, mouth: 0.9, raise: 0.5 };
    },
  },
};
