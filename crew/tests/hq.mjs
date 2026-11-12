/* Test: Crew-HQ (Saison-Belohnung) – Szene für Level 0, 1, 4, 8, 12 in allen drei Looks,
   auf iPad quer, iPad hoch und Handy. Dazu: Level-up-Dialog mit Glanz, lange und
   „gefährliche“ Crew-Namen, reduzierte Bewegung.
   Aufruf:  CREW_DIST=<ordner> CREW_SHOTS=<ordner> node crew/tests/hq.mjs */
import { launch, shot, layoutCheck, fresh, VIEWPORTS } from './lib.mjs';

const problems = [];
const expect = (cond, msg) => { if (!cond) problems.push(msg); };

const LOOKS = ['arena', 'pixel', 'neon'];
const LEVELS = [0, 1, 4, 8, 12];
const RUNS = [
  ['ipadLandscape', VIEWPORTS.ipadLandscape],
  ['ipadPortrait', VIEWPORTS.ipadPortrait],
  ['phone', VIEWPORTS.phone],
];

// Crew-HQ über den Start-Bildschirm öffnen (wie im echten Spiel)
async function openHQ(page, look, level) {
  await page.evaluate(([look, level]) => {
    const C = window.CREW;
    C.state.energy = C.LEVELS[level];
    C.state.crew.look = look;
    C.save();
    C.app.applyLook();
    C.app.renderHome();
  }, [look, level]);
  await page.locator('#tile-base').click();
  await page.locator('.hq-scene').first().waitFor({ state: 'visible', timeout: 5000 });
}

// Maße und Inhalt der Szene prüfen
async function sceneInfo(page) {
  return page.evaluate(() => {
    const svg = document.querySelector('#stage .hq-scene');
    const r = svg.getBoundingClientRect();
    const box = svg.parentElement;
    return {
      w: r.width, h: r.height, boxW: box.clientWidth, boxH: box.clientHeight,
      viewBox: svg.getAttribute('viewBox'),
      len: svg.outerHTML.length,
      items: svg.querySelectorAll('.hq-it').length,
      label: svg.getAttribute('aria-label'),
      pageW: document.documentElement.scrollWidth, winW: window.innerWidth,
      head: document.querySelector('#stage h1') ? document.querySelector('#stage h1').textContent : '',
    };
  });
}

for (const [vpName, vp] of RUNS) {
  const { browser, page, errors } = await launch(vp);
  const tag = (n) => `hq-${vpName}-${n}`;
  try {
    await fresh(page, 'arena');

    /* ---------- Daten: 12 Teile mit Name und kurzer Beschreibung ---------- */
    const data = await page.evaluate(() => {
      const B = window.CREW.base;
      const items = (B && B.items) || [];
      return {
        ok: !!(B && typeof B.renderScene === 'function'),
        n: items.length,
        bad: items.filter((it) => !it.name || !it.desc).map((it) => it.name || '?'),
        long: items.filter((it) => it.desc.split(/[.!?]\s*/).some((s) => s.split(/\s+/).filter(Boolean).length > 15)).map((it) => it.name),
        names: items.filter((it) => /\b(Alex|Ben|Chase|Jason)\b/.test(it.name + ' ' + it.desc)).map((it) => it.name),
        levels: window.CREW.LEVELS.length,
      };
    });
    expect(data.ok, 'CREW.base.renderScene fehlt');
    expect(data.n === 12, `12 Teile erwartet, gefunden: ${data.n}`);
    expect(data.levels === 13, 'CREW.LEVELS hat nicht 13 Stufen (0–12)');
    expect(!data.bad.length, 'Teile ohne Name/Beschreibung: ' + data.bad.join(','));
    expect(!data.long.length, 'Beschreibung mit Sätzen über 15 Wörtern: ' + data.long.join(','));
    expect(!data.names.length, 'Verbotene Namen: ' + data.names.join(','));

    /* ---------- Jede Stufe einmal bauen (auch mit Glanz) ---------- */
    const all = await page.evaluate(() => {
      const res = [];
      for (let lv = 0; lv <= 12; lv++) {
        const a = window.CREW.base.renderScene(lv);
        const b = lv ? window.CREW.base.renderScene(lv, { highlight: lv }) : null;
        res.push({
          lv, len: a.outerHTML.length, tag: a.tagName.toLowerCase(), vb: a.getAttribute('viewBox'),
          items: a.querySelectorAll('.hq-it').length,
          newCount: b ? b.querySelectorAll('.hq-new').length : 1,
          badge: b ? /NEU/.test(b.textContent) : true,
        });
      }
      // Unsinnige Eingaben dürfen nichts kaputt machen
      const odd = [-3, 99, 'x', null, 4.7].map((v) => window.CREW.base.renderScene(v).tagName.toLowerCase());
      // Glanz für ein noch nicht freigeschaltetes Teil wird ignoriert
      const noHl = window.CREW.base.renderScene(2, { highlight: 9 }).querySelectorAll('.hq-new').length;
      return { res, odd, noHl };
    });
    for (const r of all.res) {
      expect(r.tag === 'svg' && r.vb === '0 0 1600 900', `Level ${r.lv}: kein 16:9-SVG`);
      expect(r.len < 60000, `Level ${r.lv}: SVG zu groß (${r.len} Zeichen)`);
      expect(r.newCount >= 1 && r.badge, `Level ${r.lv}: Glanz für das neue Teil fehlt`);
    }
    for (let i = 1; i < all.res.length; i++) expect(all.res[i].items >= all.res[i - 1].items, `Level ${i}: weniger Teile als Level ${i - 1}`);
    expect(all.odd.every((t) => t === 'svg'), 'Unsinnige Level-Werte führen zu Fehlern');
    expect(all.noHl === 0, 'Glanz erscheint für ein Teil, das noch gar nicht da ist');
    if (vpName === 'ipadLandscape') console.log('Markup-Größen:', all.res.map((r) => r.lv + ':' + Math.round(r.len / 1024) + 'KB').join(' '));

    /* ---------- HQ-Bildschirm: jede Stufe, jeder Look ---------- */
    for (const look of LOOKS) {
      for (const lv of LEVELS) {
        await openHQ(page, look, lv);
        const info = await sceneInfo(page);
        const name = `${look}-L${String(lv).padStart(2, '0')}`;
        expect(Math.abs(info.h - info.w * 9 / 16) < 3, `${tag(name)}: Szene nicht 16:9 (${Math.round(info.w)}×${Math.round(info.h)})`);
        expect(Math.abs(info.w - info.boxW) < 2, `${tag(name)}: Szene füllt den Rahmen nicht (${Math.round(info.w)} von ${Math.round(info.boxW)})`);
        expect(info.pageW <= info.winW + 1, `${tag(name)}: Seite scrollt seitlich`);
        expect(info.items >= lv, `${tag(name)}: nur ${info.items} Teile sichtbar`);
        expect(info.label && info.label.includes('Level ' + lv), `${tag(name)}: aria-label fehlt`);
        await shot(page, tag(name), lv === 12 ? 900 : 500);
        problems.push(...await layoutCheck(page, tag(name)));
      }
    }

    // Unterer Teil des HQ-Bildschirms (Fortschritt + Liste der Teile)
    await openHQ(page, 'arena', 4);
    await page.evaluate(() => { const st = document.getElementById('stage'); st.scrollTop = st.scrollHeight; });
    await shot(page, tag('arena-L04-liste'));
    problems.push(...await layoutCheck(page, tag('liste')));

    /* ---------- Level-up-Dialog mit Glanz (wie in app.js showUnlock) ---------- */
    for (const [look, lv] of [['arena', 3], ['neon', 12], ['pixel', 7]]) {
      await openHQ(page, look, lv);
      await page.evaluate((level) => {
        const C = window.CREW, h = C.util.h;
        const item = C.base.items[level - 1];
        const preview = C.base.renderScene(level, { highlight: level });
        C.ui.modal({
          title: 'Level ' + level + ' freigeschaltet!',
          body: h('div', { class: 'stack' },
            h('div', { style: { borderRadius: 'var(--radius)', overflow: 'hidden', border: 'var(--bw) solid var(--line)' } }, preview),
            h('p', { class: 'lead' }, 'Neu im Crew-HQ: ' + item.name + '. ' + item.desc)),
          actions: [{ label: 'Stark!', value: true, icon: 'star' }],
          dismissable: false,
        });
      }, lv);
      const m = page.locator('.modal .hq-scene');
      await m.waitFor({ state: 'visible' });
      const mi = await page.evaluate(() => {
        const svg = document.querySelector('.modal .hq-scene');
        const r = svg.getBoundingClientRect();
        const modal = document.querySelector('.modal').getBoundingClientRect();
        return { w: r.width, h: r.height, newN: svg.querySelectorAll('.hq-new').length, inModal: r.right <= modal.right + 1 && r.left >= modal.left - 1 };
      });
      expect(mi.newN >= 1, `Level-up ${lv}: kein Glanz`);
      expect(mi.inModal && Math.abs(mi.h - mi.w * 9 / 16) < 3, `Level-up ${lv}: Vorschau passt nicht in den Dialog`);
      await shot(page, tag(`levelup-${look}-L${lv}`), 1300);
      problems.push(...await layoutCheck(page, tag('levelup-' + lv)));
      await page.locator('.modal button', { hasText: 'Stark' }).click();
    }

    /* ---------- Echter Level-up über eine Session (app.js showUnlock) ---------- */
    // Winzige Test-Mission nur im Browser dieses Tests: bringt 6 Energie und überschreitet Level 5.
    await page.evaluate(() => {
      const C = window.CREW;
      if (!C.missions.find((m) => m.id === 'hqtest')) {
        C.registerMission({ id: 'hqtest', title: 'HQ-Test', minutes: 1, debrief: ['Wie gefällt euch das HQ?'], async run() { return { energy: 6, summary: 'Stark gespielt!' }; } });
      }
      C.state.energy = C.LEVELS[5] - 3; C.state.crew.look = 'arena'; C.save(); C.app.applyLook();
      C.debug.startMission('hqtest');
    });
    await page.getByText('Wie viele spielen heute mit?').first().waitFor();
    await page.locator('button:visible', { hasText: 'Los geht' }).first().click();
    await page.locator('button:visible', { hasText: 'Überspringen' }).first().click();
    await page.locator('button:visible', { hasText: 'Fertig' }).first().click();
    // Die Crew wählt zwischen zwei Teilen (A = Musikbox, B = Pflanzen)
    const pickA = page.locator('.modal button', { hasText: 'A: Musikbox' });
    await pickA.waitFor({ state: 'visible', timeout: 8000 });
    await shot(page, tag('levelup-wahl'), 300);
    problems.push(...await layoutCheck(page, tag('levelup-wahl')));
    await pickA.click();
    await page.locator('.modal .hq-scene').waitFor({ state: 'visible', timeout: 8000 });
    const up = await page.evaluate(() => ({
      text: document.querySelector('.modal').textContent,
      newN: document.querySelectorAll('.modal .hq-new').length,
    }));
    expect(/Level 5 freigeschaltet/.test(up.text) && /Musikbox/.test(up.text), 'Echter Level-up: falscher Text – ' + up.text.slice(0, 80));
    expect(up.newN >= 1, 'Echter Level-up: Musikbox glänzt nicht');
    await shot(page, tag('levelup-echt-L5'), 1300);
    problems.push(...await layoutCheck(page, tag('levelup-echt')));
    await page.locator('.modal button', { hasText: 'Stark' }).click();
    await page.locator('button:visible', { hasText: 'Crew-HQ ansehen' }).first().click();
    await page.locator('#stage .hq-scene').first().waitFor();
    const lv5 = await page.evaluate(() => document.querySelector('#stage .hq-scene').getAttribute('aria-label'));
    expect(/Level 5/.test(lv5), 'Nach dem Level-up zeigt das HQ nicht Level 5: ' + lv5);

    /* ---------- Crew-Namen: lang, kurz, mit Sonderzeichen ---------- */
    if (vpName === 'ipadLandscape') {
      const names = ['Die Unaufhaltbaren', 'SUPERMEGAWUNDERBARECREW', 'Squad 404', 'Nø', 'Crew <3 & "Co"', 'Die Nachtfalken von Junglinster'];
      for (const look of LOOKS) for (const [i, nm] of names.entries()) {
        const r = await page.evaluate(([nm, look]) => {
          const C = window.CREW;
          C.state.crew.look = look; C.app.applyLook();
          C.state.crew.name = nm; C.save();
          const svg = C.base.renderScene(12);
          svg.style.width = '1600px';
          document.body.appendChild(svg);
          const texts = [...svg.querySelectorAll('.hq-g3')];
          const boxes = texts.map((t) => t.getBBox());
          const minX = Math.min(...boxes.map((b) => b.x)), maxX = Math.max(...boxes.map((b) => b.x + b.width));
          const minY = Math.min(...boxes.map((b) => b.y)), maxY = Math.max(...boxes.map((b) => b.y + b.height));
          const txt = texts.map((t) => t.textContent).join(' ');
          const injected = !!svg.querySelector('b, script');
          svg.remove();
          return { minX, maxX, minY, maxY, txt, injected };
        }, [nm, look]);
        expect(r.minX >= 262 && r.maxX <= 712, `${look}: Name „${nm}“ ragt aus der Graffiti-Wand (${Math.round(r.minX)}–${Math.round(r.maxX)})`);
        expect(r.minY >= 100 && r.maxY <= 400, `${look}: Name „${nm}“ zu hoch/tief (${Math.round(r.minY)}–${Math.round(r.maxY)})`);
        const plain = (x) => x.replace(/[\s-]+/g, '');
        expect(plain(r.txt) === plain(nm.toUpperCase()), `Name „${nm}“ falsch geschrieben: ${r.txt}`);
        expect(!r.injected, `Name „${nm}“ wird als HTML eingebaut`);
        if ((look === 'arena' && (i === 0 || i === 1)) || (look === 'neon' && i === 4) || (look === 'pixel' && i === 5)) {
          await page.evaluate(() => window.CREW.app.renderBase());
          await page.locator('.hq-scene').first().waitFor();
          await shot(page, tag(`name-${look}-${i}`), 600);
        }
      }
      await page.evaluate(() => { window.CREW.state.crew.name = 'Test Crew'; window.CREW.save(); });
    }

    /* ---------- Reduzierte Bewegung: keine Endlos-Animationen ---------- */
    if (vpName === 'phone') {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await openHQ(page, 'neon', 12);
      const anim = await page.evaluate(() => [...document.querySelectorAll('.hq-scene .hq-tw, .hq-scene .hq-woof, .hq-scene .hq-dots ellipse')].map((e) => getComputedStyle(e).animationName).filter((n) => n && n !== 'none').length);
      expect(anim === 0, `Reduzierte Bewegung: noch ${anim} Animationen aktiv`);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
    }
  } catch (e) {
    problems.push(`${vpName}: Abbruch – ${e.message}`);
    try { await shot(page, tag('FEHLER'), 100); } catch (e2) { /* egal */ }
  }
  problems.push(...errors.map((e) => `${vpName}: ${e}`));
  await browser.close();
}

if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Crew-HQ-Test OK – alle Stufen, Looks und Größen ohne Fehler.');
}
