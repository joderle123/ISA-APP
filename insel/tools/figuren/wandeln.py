# Humans_Master.blend → eine GLB-Datei mit Skelett, allen Bausteinen (Kopf/Oberteil/Beine/Füße je Stil) und allen Bewegungen.
# Aufruf: python -I wandeln.py -- <blend> <ziel.glb>
import bpy, sys
quelle, ziel = sys.argv[-2], sys.argv[-1]
bpy.ops.wm.open_mainfile(filepath=quelle)
WEG = ('King_', 'SpaceSuit_', 'Swat_', 'Horse_', 'Pistol', 'Sword')
for o in list(bpy.data.objects):
    if o.name.startswith(WEG): bpy.data.objects.remove(o, do_unlink=True)
# nicht gebrauchte Bewegungen (Waffen) weglassen
for a in list(bpy.data.actions):
    if a.name not in ('Idle', 'Idle_Neutral', 'Walk', 'Run', 'Wave', 'Interact', 'Punch_Right', 'HitRecieve', 'Kick_Right', 'Death'): bpy.data.actions.remove(a)
# WICHTIG: Oberteile, Beine und Füße sind in der Datei nur als HALBE Körper gespeichert und werden gespiegelt (Mirror).
# Ohne diesen Schritt fehlt im Spiel eine Körperhälfte. Spiegelung fest einrechnen, Geometrie-Knoten (nur Blender-Vorschau) entfernen.
for o in bpy.data.objects:
    if o.type != 'MESH': continue
    if o.data.users > 1: o.data = o.data.copy()
    bpy.context.view_layer.objects.active = o
    for m in list(o.modifiers):
        if m.type == 'MIRROR':
            m.use_mirror_vertex_groups = True
            bpy.ops.object.modifier_apply(modifier=m.name)
        elif m.type == 'NODES':
            o.modifiers.remove(m)
    xs = [v.co.x for v in o.data.vertices]
    print('  ', o.name, 'x=%.2f..%.2f' % (min(xs), max(xs)), len(xs))
print('Objekte:', [o.name for o in bpy.data.objects])
print('Aktionen:', [a.name for a in bpy.data.actions])
bpy.ops.export_scene.gltf(filepath=ziel, export_format='GLB', export_animations=True, export_animation_mode='ACTIONS',
    export_force_sampling=True, export_optimize_animation_size=True, export_frame_step=2, export_image_format='NONE', export_yup=True, export_skins=True,
    export_morph=False, export_texcoords=False, export_tangents=False, export_vertex_color='NONE', export_all_influences=False, export_cameras=False, export_lights=False, export_apply=False)
print('fertig')
