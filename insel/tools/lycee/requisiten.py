# Lycée-Simulator: Requisiten aus Blender-Dateien (Quaternius-Pakete, CC0) in EINE .glb für das Spiel.
# Je Datei ein Modell: alle Netze zusammengefügt, Transformationen angewandt, Materialfarbe je Fläche in die Eckpunktfarben
# (COLOR_0, sRGB), Ursprung unten in der Mitte, Name = <präfix>/<dateiname>. Keine Texturen, keine Materialien nötig.
# Aufruf (Blender als Python-Modul): python wandeln.py -- <ziel.glb> <präfix>=<ordner mit .blend> [<präfix>=<ordner> …]
#   optional „+muster“ hinter dem Ordner: nur Dateien, deren Name das Muster enthält (Komma-getrennt), z. B. moebel=/pfad+Desk,Chair
import bpy, sys, os, bmesh
args = sys.argv[sys.argv.index('--') + 1:]
ziel, quellen = args[0], args[1:]
bpy.ops.wm.read_factory_settings(use_empty=True)
ausgabe = bpy.data.scenes[0]
gesammelt = []
for q in quellen:
    praefix, rest = q.split('=', 1)
    ordner, _, muster = rest.partition('+')
    muster = [m.strip().lower() for m in muster.split(',') if m.strip()]
    for datei in sorted(os.listdir(ordner)):
        if not datei.endswith('.blend'): continue
        name = datei[:-6]
        if muster and not any(m in name.lower() for m in muster): continue
        with bpy.data.libraries.load(os.path.join(ordner, datei), link=False) as (src, dst):
            dst.objects = list(src.objects)
        objs = [o for o in dst.objects if o is not None and o.type == 'MESH']
        if not objs: continue
        for o in objs: ausgabe.collection.objects.link(o)
        # Modifikatoren und Transformationen fest einrechnen, dann zu einem Netz zusammenfügen
        bpy.ops.object.select_all(action='DESELECT')
        for o in objs:
            o.select_set(True)
            bpy.context.view_layer.objects.active = o
            for m in list(o.modifiers):
                try: bpy.ops.object.modifier_apply(modifier=m.name)
                except Exception: pass
        bpy.ops.object.select_all(action='DESELECT')
        for o in objs: o.select_set(True)
        bpy.context.view_layer.objects.active = objs[0]
        bpy.ops.object.make_single_user(object=True, obdata=True)
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
        if len(objs) > 1: bpy.ops.object.join()
        o = bpy.context.view_layer.objects.active
        me = o.data
        # Farbe je Fläche aus dem Material (Grundfarbe des Principled BSDF oder diffuse_color)
        farben = []
        for slot in o.material_slots:
            m = slot.material; c = (0.8, 0.8, 0.8, 1)
            if m:
                c = tuple(m.diffuse_color)
                if m.use_nodes:
                    for n in m.node_tree.nodes:
                        if n.type == 'BSDF_PRINCIPLED':
                            c = tuple(n.inputs['Base Color'].default_value); break
            farben.append(c)
        if not farben: farben = [(0.8, 0.8, 0.8, 1)]
        attr = me.color_attributes.new(name='Col', type='FLOAT_COLOR', domain='CORNER')
        for poly in me.polygons:
            c = farben[min(poly.material_index, len(farben) - 1)]
            for li in poly.loop_indices: attr.data[li].color = (c[0], c[1], c[2], 1.0)
        me.color_attributes.active_color = attr
        me.materials.clear()
        # Ursprung: unten in der Mitte
        xs = [v.co.x for v in me.vertices]; ys = [v.co.y for v in me.vertices]; zs = [v.co.z for v in me.vertices]
        cx, cy, cz = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2, min(zs)
        for v in me.vertices: v.co.x -= cx; v.co.y -= cy; v.co.z -= cz
        o.location = (0, 0, 0)
        o.name = praefix + '/' + name; me.name = o.name
        gesammelt.append(o.name)
        print('·', o.name, len(me.polygons), 'Flächen', flush=True)
# ein gemeinsames weißes Material (glTF braucht eines, damit die Eckpunktfarben mitkommen)
mat = bpy.data.materials.new('vc')
for o in ausgabe.objects:
    if o.type == 'MESH': o.data.materials.append(mat)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=ziel, export_format='GLB', use_selection=True, export_apply=True, export_materials='EXPORT',
                          export_vertex_color='ACTIVE', export_normals=True, export_yup=True)
print('fertig:', len(gesammelt), 'Modelle →', ziel, os.path.getsize(ziel) // 1024, 'KB')
