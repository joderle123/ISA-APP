#!/usr/bin/env node
/* Prüft die Kurs-Inhalte (src/content/kurs-j*.js) gegen das Schema aus SPEC.md.
   Aufruf: node skills/tools/validate-content.cjs [kurs-j1]   (ohne Argument: alle) */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const SRC = path.join(__dirname, '..', 'src');
const only = process.argv[2];
const ctx = { window: {}, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(SRC, 'core', 'registry.js'), 'utf8'), ctx);
const files = fs.readdirSync(path.join(SRC, 'content')).filter((f) => /^kurs-j\d\.js$/.test(f) && (!only || f.startsWith(only)));
for (const f of files) vm.runInContext(fs.readFileSync(path.join(SRC, 'content', f), 'utf8'), ctx, { filename: f });
const SK = ctx.window.SK, D = SK.data;
const errs = [], warn = [];
const E = (m) => errs.push(m), W = (m) => warn.push(m);
const TYP = ['koerper', 'atem', 'sinne', 'kopf', 'menschen'];
const ZON = ['gruen', 'gelb', 'rot'];
const INT = ['atmen', 'sinne-tippen', 'bodyscan', 'anspannen-loslassen', 'gedanken-boot', 'kaelte', 'zaehlen', 'satz', 'bewegen', 'halten', 'wegwischen', 'anker', 'genuss'];
const MIS = ['zonen-sortieren', 'mythos-fakt', 'szene', 'satz-bauen', 'paare', 'detektiv', 'reihenfolge', 'schaetzen'];
const RAR = ['basis', 'selten', 'episch', 'legendaer'];
const BANNED = /\b(Alex|Ben|Chase|Jason)\b/;
const dup = (list, key, label) => { const s = new Set(); list.forEach((x) => { if (s.has(x[key])) E(`${label} doppelt: ${x[key]}`); s.add(x[key]); }); };
dup(D.skills, 'id', 'Skill-ID'); dup(D.units, 'id', 'Einheit-ID'); dup(D.units, 'code', 'Code'); dup(D.situations, 'id', 'Situation-ID');
const words = (s) => String(s || '').split(/\s+/).filter(Boolean).length;
const longSentence = (s) => String(s || '').split(/(?<=[.!?])\s+/).some((x) => words(x) > 18);
const skillIds = new Set(D.skills.map((s) => s.id));
for (const s of D.skills) {
  const p = `Skill ${s.id}`;
  if (!/^[a-z0-9-]+$/.test(s.id || '')) E(`${p}: id nur a-z0-9-`);
  if (!s.name) E(`${p}: name fehlt`);
  if (!TYP.includes(s.typ)) E(`${p}: typ ungültig (${s.typ})`);
  if (!Array.isArray(s.zonen) || !s.zonen.length || s.zonen.some((z) => !ZON.includes(z))) E(`${p}: zonen ungültig`);
  if (s.zonen && s.zonen.includes('rot') && !['koerper', 'atem', 'sinne'].includes(s.typ)) E(`${p}: rot nur für koerper/atem/sinne (Kurs: bei Rot keine Kopf-Skills)`);
  if (!(s.kraft >= 1 && s.kraft <= 3)) E(`${p}: kraft 1–3`);
  if (!INT.includes(s.interaktion)) E(`${p}: interaktion ungültig (${s.interaktion})`);
  if (!Array.isArray(s.schritte) || s.schritte.length < 1 || s.schritte.length > 3) E(`${p}: 1–3 schritte`);
  (s.schritte || []).forEach((t) => { if (words(t) > 15) W(`${p}: Schritt lang (${words(t)} Wörter): ${t}`); });
  if (!s.wann) E(`${p}: wann fehlt`);
  if (!s.flavor) W(`${p}: flavor fehlt`);
  if (!RAR.includes(s.seltenheit)) E(`${p}: seltenheit ungültig`);
  if (!s.einheit) E(`${p}: einheit fehlt`);
  if (BANNED.test(JSON.stringify(s))) E(`${p}: verbotener Name`);
}
for (const u of D.units) {
  const p = `Einheit ${u.id}`;
  if (!/^[A-Z]{4,6}$/.test(u.code || '')) E(`${p}: code 4–6 Großbuchstaben (${u.code})`);
  if (!u.titel || !u.modul || !u.jahr || u.nr == null) E(`${p}: Grunddaten fehlen`);
  if (!Array.isArray(u.skills) || !u.skills.length) W(`${p}: keine skills`);
  (u.skills || []).forEach((id) => { if (!skillIds.has(id)) E(`${p}: unbekannter Skill ${id}`); });
  const m = u.mission;
  if (!m) { E(`${p}: mission fehlt`); continue; }
  if (!MIS.includes(m.typ)) E(`${p}: mission.typ ungültig (${m.typ})`);
  if (!m.titel || !m.intro || !m.daten) E(`${p}: mission titel/intro/daten fehlen`);
  if (longSentence(m.intro)) W(`${p}: intro hat einen langen Satz`);
  const d = m.daten || {};
  const need = { 'zonen-sortieren': () => Array.isArray(d.items) && d.items.length >= 5 && d.items.every((i) => i.text && ZON.includes(i.zone)),
    'mythos-fakt': () => Array.isArray(d.karten) && d.karten.length >= 5 && d.karten.every((k) => k.text && typeof k.fakt === 'boolean' && k.erklaerung),
    'szene': () => d.start && d.knoten && d.knoten[d.start] && Object.values(d.knoten).every((k) => k.text && Array.isArray(k.wahl) && k.wahl.every((w) => w.text && (w.weiter === null || d.knoten[w.weiter]))),
    'satz-bauen': () => Array.isArray(d.aufgaben) && d.aufgaben.length >= 2 && d.aufgaben.every((a) => a.situation && Array.isArray(a.bausteine) && Array.isArray(a.loesungen) && a.loesungen.length),
    'paare': () => Array.isArray(d.paare) && d.paare.length >= 4 && d.paare.every((x) => Array.isArray(x) && x.length === 2),
    'detektiv': () => d.gedanke && d.situation && Array.isArray(d.beweise) && d.beweise.length >= 4 && d.beweise.every((b) => b.text && ['dafuer', 'dagegen'].includes(b.spricht)) && d.fairerGedanke,
    'reihenfolge': () => Array.isArray(d.schritte) && d.schritte.length >= 4,
    'schaetzen': () => Array.isArray(d.fragen) && d.fragen.length >= 2 && d.fragen.every((q) => q.text && q.min != null && q.max != null && q.richtig != null) };
  if (need[m.typ] && !need[m.typ]()) E(`${p}: mission.daten passen nicht zum typ ${m.typ}`);
  if (BANNED.test(JSON.stringify(u))) E(`${p}: verbotener Name`);
}
for (const s of D.situations) {
  const p = `Situation ${s.id}`;
  if (!s.titel || !s.text || !(s.start >= 30 && s.start <= 95)) E(`${p}: titel/text/start (30–95)`);
  if (!Array.isArray(s.wellen) || s.wellen.length < 2) E(`${p}: mind. 2 wellen`);
  if (!Array.isArray(s.handeln) || !s.handeln.some((h) => h.gut)) E(`${p}: handeln mit mind. einer guten Option`);
  if (BANNED.test(JSON.stringify(s))) E(`${p}: verbotener Name`);
}
console.log(`Dateien: ${files.join(', ') || '–'} | Skills: ${D.skills.length} | Einheiten: ${D.units.length} | Situationen: ${D.situations.length}`);
if (warn.length) console.log(`\nHinweise (${warn.length}):\n- ` + warn.slice(0, 60).join('\n- '));
if (errs.length) { console.log(`\nFEHLER (${errs.length}):\n- ` + errs.join('\n- ')); process.exitCode = 1; } else console.log('\nOK: keine Fehler.');
