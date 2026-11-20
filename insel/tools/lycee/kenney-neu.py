# Neue Kenney-Bausätze (CC0, vom Nutzer geladen): Furniture Kit, City Kit (Roads), Retro Urban Kit, Fantasy Town Kit 2.0
# → eine GLB mit Eckpunktfarben (wie tools/stadt/stadt.py). Aufruf:
#   python3 -I tools/lycee/kenney-neu.py <ordner mit furniture-kit/ city-kit-roads/ retro-urban-kit/ fantasy-town-kit/> roh.glb
import importlib.util, os, sys
pfad = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'stadt', 'stadt.py')
spec = importlib.util.spec_from_file_location('stadt', pfad); stadt = importlib.util.module_from_spec(spec); spec.loader.exec_module(stadt)
stadt.KURZ.update({'furniture-kit': 'mk', 'city-kit-roads': 'weg', 'retro-urban-kit': 'retro', 'fantasy-town-kit': 'dorf'})
stadt.AUSWAHL = {
    'furniture-kit': ['computerScreen', 'computerKeyboard', 'computerMouse', 'laptop', 'desk', 'deskCorner', 'chairDesk', 'bookcaseOpen', 'bookcaseOpenLow', 'bookcaseClosedWide',
                      'books', 'lampRoundFloor', 'lampSquareTable', 'lampRoundTable', 'plantSmall1', 'plantSmall2', 'plantSmall3', 'pottedPlant', 'loungeSofa', 'loungeChair',
                      'loungeDesignSofa', 'loungeChairRelax', 'tableCoffee', 'rugRounded', 'rugRectangle', 'rugRound', 'trashcan', 'kitchenCoffeeMachine', 'kitchenFridge',
                      'kitchenMicrowave', 'kitchenSink', 'kitchenCabinet', 'kitchenStove', 'toaster', 'kitchenBlender', 'coatRackStanding', 'radio', 'speaker', 'speakerSmall',
                      'televisionModern', 'cardboardBoxClosed', 'cardboardBoxOpen', 'bear', 'pillow', 'pillowBlue', 'benchCushion', 'sideTable', 'sideTableDrawers', 'stoolBar',
                      'tableRound', 'chairCushion', 'chairRounded', 'washer', 'ceilingFan'],
    'city-kit-roads': ['traffic-light', 'light-square', 'light-curved', 'light-square-double', 'construction-cone', 'construction-barrier', 'construction-fence', 'construction-light',
                       'road-sign-stop', 'road-sign-street', 'road-sign-warning', 'dumpster', 'electricity-pole', 'sign-highway'],
    'retro-urban-kit': ['truck-green', 'truck-grey', 'truck-green-cargo', 'detail-bench', 'detail-dumpster-closed', 'detail-light-single', 'detail-light-double', 'detail-light-traffic',
                        'detail-awning-wide', 'detail-awning-small', 'scaffolding-structure', 'scaffolding-poles', 'pallet', 'pallet-small', 'planks', 'detail-barrier-type-a',
                        'tree-park-large', 'tree-park-pine-large', 'tree-shrub', 'tree-pine-small'],
    'fantasy-town-kit': ['fountain-round', 'fountain-round-detail', 'fountain-square-detail', 'stall', 'stall-green', 'stall-red', 'stall-bench', 'stall-stool', 'cart', 'cart-high', 'lantern', 'wheel'],
}
sys.argv = [sys.argv[0]] + sys.argv[1:]
stadt.main()
