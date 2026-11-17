# Lycée-Simulator: „Ultimate Modular Women“ (Quaternius, CC0) – die einzelnen glTF-Figuren (je Stil eine Datei, gleiches Skelett
# wie menschen.glb) zu EINER .glb wie menschen.glb: ein Skelett, Bausteine <Stil>_Head|Body|Legs|Feet, Bewegungen ohne Waffen.
# Aufruf: python frauen.py -- <ordner mit .gltf> <ziel.glb>
import bpy, sys, os
quelle, ziel = sys.argv[-2], sys.argv[-1]
bpy.ops.wm.read_factory_settings(use_empty=True)
BEHALTE = ('Idle', 'Idle_Neutral', 'Walk', 'Run', 'Wave', 'Interact', 'HitRecieve', 'Death', 'Roll')
haupt = None
for datei in sorted(os.listdir(quelle)):
    if not datei.endswith('.gltf'): continue
    vorher = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(quelle, datei))
    neu = [o for o in bpy.data.objects if o not in vorher]
    arm = [o for o in neu if o.type == 'ARMATURE'][0]
    if haupt is None:
        haupt = arm; continue
    for o in neu:
        if o.type == 'MESH':
            mw = o.matrix_world.copy()
            o.parent = haupt; o.matrix_world = mw
            for m in o.modifiers:
                if m.type == 'ARMATURE': m.object = haupt
    for o in neu:
        if o.type != 'MESH' and o != haupt: bpy.data.objects.remove(o, do_unlink=True)
# Hilfskugeln ohne Material und Eltern weg; Tippfehler der Quelle („Formad_Head“) richtigstellen
for o in list(bpy.data.objects):
    if o.type == 'MESH' and (not o.data.materials or o.name.startswith('Icosphere')): bpy.data.objects.remove(o, do_unlink=True)
for o in bpy.data.objects:
    if o.name.startswith('Formad_'): o.name = 'Formal_' + o.name[len('Formad_'):]
for a in list(bpy.data.actions):
    basis = a.name.split('|')[-1]
    if basis not in BEHALTE and a.name not in BEHALTE: bpy.data.actions.remove(a)
# Bewegungen des ersten Skeletts gelten für alle Bausteine; doppelte Aktionen (pro Datei) zusammenlegen
gesehen = {}
for a in list(bpy.data.actions):
    k = a.name.split('|')[-1].split('.')[0]
    if k in gesehen: bpy.data.actions.remove(a)
    else: gesehen[k] = a; a.name = k
print('Objekte:', sorted(o.name for o in bpy.data.objects if o.type == 'MESH'))
print('Aktionen:', sorted(a.name for a in bpy.data.actions))
bpy.ops.export_scene.gltf(filepath=ziel, export_format='GLB', export_animations=True, export_animation_mode='ACTIONS',
    export_force_sampling=True, export_optimize_animation_size=True, export_frame_step=2, export_image_format='NONE', export_yup=True, export_skins=True,
    export_morph=False, export_texcoords=False, export_tangents=False, export_vertex_color='NONE', export_all_influences=False, export_cameras=False, export_lights=False, export_apply=False)
print('fertig', os.path.getsize(ziel) // 1024, 'KB')
