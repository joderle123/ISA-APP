// Gefühlsrad-Farben früh anwenden (WP30): Die Lehrkraft stellt die sechs Farben im Lehrer-Panel ein (localStorage
// lumo.teacher.colors). Damit Vögel, Runen und Segel schon beim Weltaufbau die Farben tragen, läuft dieses Mini-Plugin
// vor allen Welt-Plugins; das Codes-Plugin (order 64) übernimmt danach das Umschalten zur Laufzeit.
import { createTeacherSettings } from '../teacher.js';

export default {
  id: 'gefuehlsfarben', order: 2, deps: [],
  install(game) {
    const T = createTeacherSettings({ game, listen: false });
    const colors = T.colors.apply();
    return { colors, custom: T.colors.isCustom() };
  },
};
