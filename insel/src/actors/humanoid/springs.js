// Nachschwingen (Stil-Bibel §8.5): Haarschweif, Zopf, Locs und Rucksack hängen an einem Drehpunkt und pendeln nach, wenn
// die Figur anfährt, bremst, dreht oder hüpft. Reine Federn auf zwei Achsen, kein Physik-Körper, deterministisch.
//   const sensor = createMotionSensor(group);      sensor.update(dt) → { ax, ay, az, yawRate } (lokal zur Figur, m/s², rad/s)
//   const swing = createSwing(pivot, { k, damp, gain, limit, idle });   swing.update(dt, sensor.state, t)
import * as THREE from 'three';

const _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _v = new THREE.Vector3();

// Beschleunigung des Objekts in dessen lokalem Raum (Differenzen der Weltposition, geglättet und begrenzt)
export function createMotionSensor(object, { maxAcc = 30 } = {}) {
  const prev = new THREE.Vector3(), vel = new THREE.Vector3(), prevVel = new THREE.Vector3();
  let prevYaw = 0, started = false;
  const state = { ax: 0, ay: 0, az: 0, yawRate: 0, speed: 0 };
  return {
    state,
    update(dt) {
      if (!(dt > 0)) return state;
      object.getWorldPosition(_p);
      object.getWorldQuaternion(_q);
      const yaw = Math.atan2(2 * (_q.w * _q.y + _q.x * _q.z), 1 - 2 * (_q.y * _q.y + _q.z * _q.z));
      if (!started) { started = true; prev.copy(_p); prevYaw = yaw; return state; }
      vel.subVectors(_p, prev).divideScalar(dt);
      prev.copy(_p);
      _v.subVectors(vel, prevVel).divideScalar(dt);
      prevVel.copy(vel);
      // in den lokalen Raum drehen (nur Gier), begrenzen, leicht glätten
      _q.set(0, 0, 0, 1).setFromAxisAngle(new THREE.Vector3(0, 1, 0), -yaw);
      _v.applyQuaternion(_q);
      _v.clampLength(0, maxAcc);
      const k = Math.min(1, dt * 18);
      state.ax += (_v.x - state.ax) * k; state.ay += (_v.y - state.ay) * k; state.az += (_v.z - state.az) * k;
      let dy = yaw - prevYaw; while (dy > Math.PI) dy -= Math.PI * 2; while (dy < -Math.PI) dy += Math.PI * 2;
      prevYaw = yaw;
      state.yawRate += (Math.max(-12, Math.min(12, dy / dt)) - state.yawRate) * k;
      state.speed = vel.length();
      return state;
    },
    reset() { started = false; vel.set(0, 0, 0); prevVel.set(0, 0, 0); state.ax = state.ay = state.az = state.yawRate = 0; },
  };
}

// Pendel an einem Drehpunkt: Nicken (x) aus Vorwärts-/Hüpfbeschleunigung, Rollen (z) aus Seitwärtsbeschleunigung und Drehen
export function createSwing(pivot, { k = 70, damp = 7, gain = 0.012, turnGain = 0.5, limit = 0.55, idle = 0.02, phase = 0 } = {}) {
  const a = { x: 0, z: 0 }, v = { x: 0, z: 0 };
  return {
    update(dt, motion, t = 0) {
      if (!(dt > 0)) return;
      const h = Math.min(dt, 1 / 30);
      const driveX = (motion ? motion.az * gain * 40 - motion.ay * gain * 10 : 0);
      const driveZ = (motion ? -motion.ax * gain * 40 + motion.yawRate * turnGain : 0);
      v.x += (-k * a.x - damp * v.x + driveX) * h;
      v.z += (-k * a.z - damp * v.z + driveZ) * h;
      a.x = Math.max(-limit, Math.min(limit, a.x + v.x * h));
      a.z = Math.max(-limit, Math.min(limit, a.z + v.z * h));
      pivot.rotation.x = a.x + Math.sin(t * 1.3 + phase) * idle;
      pivot.rotation.z = a.z + Math.sin(t * 0.9 + phase * 1.7) * idle * 0.6;
    },
    reset() { a.x = a.z = v.x = v.z = 0; pivot.rotation.set(0, 0, 0); },
  };
}
