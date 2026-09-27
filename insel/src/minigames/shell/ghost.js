// Geist der Bestzeit (WP36): eine durchscheinende Figur aus Licht läuft die aufgezeichnete Bestzeit noch einmal ab.
//   const ghost = createGhost({ THREE, scene }); ghost.show() · ghost.set({ x, y, z, yaw }) · ghost.hide() · ghost.update(dt)
//   ghost.dispose()
export function createGhost({ THREE, scene, color = 0x2de2c9 }) {
  const g = new THREE.Group();
  g.name = 'geist-bestzeit';
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.38, depthWrite: false });
  const matBright = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, depthWrite: false });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.7, 3, 8), mat);
  body.position.y = 1.0;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), matBright);
  head.position.y = 1.72;
  const legL = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.5, 2, 6), mat); legL.position.set(-0.14, 0.38, 0);
  const legR = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.5, 2, 6), mat); legR.position.set(0.14, 0.38, 0);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.35, 0.55, 20), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.04;
  g.add(body, head, legL, legR, ring);
  g.visible = false;
  scene.add(g);
  let t = 0, moving = 0;
  const last = { x: 0, z: 0 };
  return {
    group: g,
    show() { g.visible = true; },
    hide() { g.visible = false; },
    set({ x, y, z, yaw }) {
      moving = Math.hypot(x - last.x, z - last.z) > 0.01 ? 1 : moving * 0.9;
      last.x = x; last.z = z;
      g.position.set(x, y, z);
      if (typeof yaw === 'number' && moving > 0.5) g.rotation.y = yaw;
    },
    update(dt) {
      if (!g.visible) return;
      t += dt;
      const s = Math.sin(t * 9) * 0.35 * moving;
      legL.rotation.x = s; legR.rotation.x = -s;
      body.position.y = 1.0 + Math.sin(t * 4) * 0.03;
      mat.opacity = 0.3 + Math.sin(t * 3) * 0.06;
    },
    dispose() { scene.remove(g); g.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); mat.dispose(); matBright.dispose(); },
  };
}
