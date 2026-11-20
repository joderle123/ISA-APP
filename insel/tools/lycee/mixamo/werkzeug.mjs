// Aufruf: FBX-Dateien (Mixamo, „Without Skin“) neben diese Datei legen (skaten.fbx, elfmeter.fbx, sitzenreden.fbx, jubeln.fbx, tanzen.fbx),
// mit esbuild bündeln (loader .glb/.fbx = binary), im Browser window.LOS() aufrufen, window.ERGEBNIS als src/lycee/bewegungen.json speichern.
// Prinzip: je Knochen Welt-Drehung der Quelle × Ruhelagen-Versatz (Quelle→Ziel), dann in lokale Drehung des Ziels umrechnen; 15 Bilder/s.
// Mixamo → Quaternius: Bewegungen übertragen (im Browser), Ergebnis als kompakte JSON-Clips
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import menschen from '/home/user/isa-app/insel/src/lycee/modelle/menschen.glb';
import skaten from './skaten.fbx'; import elfmeter from './elfmeter.fbx'; import sitzenreden from './sitzenreden.fbx'; import jubeln from './jubeln.fbx'; import tanzen from './tanzen.fbx';
const FBX = { Skaten: skaten, Elfmeter: elfmeter, SitzenReden: sitzenreden, Jubeln: jubeln, Tanzen: tanzen };
const NAMEN = { Hips: 'Hips', Abdomen: 'Spine', Torso: 'Spine1', Chest: 'Spine2', Neck: 'Neck', Head: 'Head',
  ShoulderL: 'LeftShoulder', UpperArmL: 'LeftArm', LowerArmL: 'LeftForeArm', WristL: 'LeftHand',
  ShoulderR: 'RightShoulder', UpperArmR: 'RightArm', LowerArmR: 'RightForeArm', WristR: 'RightHand',
  UpperLegL: 'LeftUpLeg', LowerLegL: 'LeftLeg', FootL: 'LeftFoot', UpperLegR: 'RightUpLeg', LowerLegR: 'RightLeg', FootR: 'RightFoot' };
const puffer = (u8) => u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
const wq = (o) => o.getWorldQuaternion(new THREE.Quaternion());
window.LOS = async () => {
  const gltf = await new Promise((ok, nein) => new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parse(puffer(menschen), '', ok, nein));
  const ziel = gltf.scene; let skin = null; ziel.traverse((o) => { if (!skin && o.isSkinnedMesh) skin = o; });
  skin.skeleton.pose(); ziel.updateMatrixWorld(true);
  const zk = {}; ziel.traverse((o) => { if (o.isBone) zk[o.name] = o; });
  const ergebnis = {};
  for (const [name, daten] of Object.entries(FBX)) {
    const quelle = new FBXLoader().parse(puffer(daten), '');
    const clip = quelle.animations.reduce((a, b) => (b.duration > a.duration ? b : a));
    const KAPPE = { SitzenReden: 12, Tanzen: 10 }, dauer = Math.min(clip.duration, KAPPE[name] || 99);
    const qk = {}; quelle.traverse((o) => { if (o.isBone || o.type === 'Bone' || /mixamorig/.test(o.name)) qk[o.name.replace(/^mixamorig[:_]?/, '')] = o; });
    quelle.updateMatrixWorld(true);
    // Ruhelage: Versatz je Knochen (Welt-Drehung Quelle → Ziel)
    const versatz = {}, paare = [];
    for (const [z, q] of Object.entries(NAMEN)) { if (!zk[z] || !qk[q]) continue; versatz[z] = wq(qk[q]).invert().multiply(wq(zk[z])); paare.push([z, q]); }
    const hipRuheQ = qk.Hips.getWorldPosition(new THREE.Vector3()), hipRuheZ = zk.Hips.getWorldPosition(new THREE.Vector3());
    const skala = hipRuheZ.y / Math.max(1e-3, hipRuheQ.y);
    const mixer = new THREE.AnimationMixer(quelle); mixer.clipAction(clip).play();
    const fps = 15, n = Math.max(2, Math.round(dauer * fps) + 1);
    const spuren = {}; for (const [z] of paare) spuren[z] = []; const hipY = [];
    // Ziel-Knochen in Eltern-Reihenfolge (Eltern zuerst)
    const reihe = paare.map(([z]) => z).sort((a, b) => { let da = 0, db = 0; for (let o = zk[a]; o; o = o.parent) da++; for (let o = zk[b]; o; o = o.parent) db++; return da - db; });
    for (let f = 0; f < n; f++) {
      mixer.setTime(Math.min(dauer, f / fps)); quelle.updateMatrixWorld(true);
      for (const z of reihe) {
        const q = NAMEN[z], soll = wq(qk[q]).multiply(versatz[z]);
        const eltern = zk[z].parent; eltern.updateMatrixWorld(true);
        const lokal = wq(eltern).invert().multiply(soll); zk[z].quaternion.copy(lokal); zk[z].updateMatrixWorld(true);
        spuren[z].push(+lokal.x.toFixed(4), +lokal.y.toFixed(4), +lokal.z.toFixed(4), +lokal.w.toFixed(4));
      }
      const hq = qk.Hips.getWorldPosition(new THREE.Vector3());
      hipY.push(+((hq.y - hipRuheQ.y) * skala).toFixed(4));
    }
    skin.skeleton.pose(); ziel.updateMatrixWorld(true);
    ergebnis[name] = { name, dauer: +dauer.toFixed(3), fps, knochen: reihe, q: reihe.map((z) => spuren[z]), hipY };
  }
  window.ERGEBNIS = ergebnis;
  return Object.fromEntries(Object.entries(ergebnis).map(([k, v]) => [k, v.dauer + ' s, ' + v.knochen.length + ' Knochen']));
};
window.INFO = (name) => { const q = new FBXLoader().parse(puffer(FBX[name]), ''); return q.animations.map((a) => a.name + ':' + a.duration.toFixed(2) + ':' + a.tracks.length + ':' + (a.tracks[0] ? a.tracks[0].times.length : 0)); };
