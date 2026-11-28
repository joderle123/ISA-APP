// „Deine Woche“: am Kapitelende die wichtigsten eigenen Entscheidungen in einfachen Sätzen – ohne Urteil.
// Für das Gespräch in der Klasse (Lehrperson und Schüler schauen gemeinsam drauf). Wird auch im Spielstand gemerkt (S.chronik).
const eins = (m, paare) => { for (const [f, t] of paare) if (typeof f === 'function' ? f(m) : m[f]) return t; return null; };

const KAP = {
  1: (m) => [
    eins(m, [['abgestimmtCool', 'Bei der Umfrage über Rafa hast du „cool“ geklickt. Auch das zählt als Stimme.'], ['abgestimmtCringe', 'Bei der Umfrage über Rafa hast du „cringe“ geklickt.'], ['abgestimmt', 'Bei der Umfrage über Rafa hast du geklickt.'], ['rafaGezeigt', 'Bei der Umfrage hast du Ben und Jo gezeigt: Der Junge sitzt da drüben.'], ['nichtAbgestimmt', 'Bei der Umfrage über Rafa hast du nicht geklickt.']]),
    eins(m, [['nameStattLinks', 'Ben wollte dich im Klassenchat „hinten links“ nennen. Du hast gesagt: Mein Name reicht.'], ['hintenLinksOk', 'Ben nennt dich im Klassenchat „hinten links“. Du hast gesagt: passt.'], ['nurGelesen', 'Ben nennt dich im Klassenchat „hinten links“. Du hast nichts gesagt.']]),
    eins(m, [['joWeiter', 'Jo hat gefragt, warum du in der P bist. Du hast gesagt: „Weiter.“'], ['joAbgeblockt', 'Jo hat gefragt, warum du in der P bist. Du hast gesagt: „Geht dich nix an.“'], ['joLange', 'Jo hat gefragt, warum du in der P bist. Du hast gesagt: „Lange Geschichte.“']]),
    // Pause und Rafa in einem Satz
    (() => { const o = m.pauseTT ? 'Tischtennis mit Ayla' : m.pauseKorbOrt ? 'am Korb mit Yusuf' : m.pauseHandy ? 'bei Ben und Jo am Handy' : m.pauseBrunnen ? 'am Brunnen, bei Lina' : null; if (!o) return null;
      const r = m.rafaKuedes ? 'Mit Rafa bist du zu Herrn Kuedes gegangen.' : m.rafaKlar ? 'Rafa hast du gesagt: Das ist nicht okay.' : m.rafaWitz ? 'Rafa hast du mit einem Witz zum Lachen gebracht.' : m.rafaDaneben ? 'Du hast dich neben Rafa gesetzt.' : m.pauseBlieb ? 'Als Rafa das Foto sah, bist du geblieben, wo du warst.' : '';
      return ('Große Pause: ' + o + '. ' + r + (m.pauseZuRafa ? ' Dafür hast du jemanden mitten im Spiel stehen lassen.' : '')).trim(); })(),
    eins(m, [['k1BeiLina', 'Beim Klick von der Treppe bist du bei Lina geblieben. Sie hat dir ihre Zeichnung gezeigt.'], ['k1Hochgeschaut', 'Beim Klick von der Treppe hast du hochgeschaut: groß, Mütze.']]),
    eins(m, [['kommentiert', 'Unter dem Foto von Rafa hast du einen Kommentar geschrieben.'], ['nichtKommentiert', 'Unter dem Foto von Rafa hast du nichts geschrieben.']]),
    eins(m, [['kantineNoah', 'In der Kantine hast du dich zu Noah gesetzt.'], [(x) => x.tischGerufen, 'In der Kantine hast du gezögert. Ben hat dich gerufen – du saßt bei Ben und Jo.'], ['kantineBen', 'In der Kantine hast du dich zu Ben und Jo gesetzt.'], ['kantineMila', 'In der Kantine hast du dich zu Mila gesetzt.'], ['kantineP1', 'In der Kantine hast du dich zu Dario und Kenan von der 7P1 gesetzt.']]),
    eins(m, [['k1KenanErlaubt', 'Kenan hatte ein Foto von dir, ohne zu fragen. Du hast gefragt – und es ihm dann erlaubt.'], [(x) => x.k1KenanGefragt && x.k1KenanGeloescht, 'Kenan hatte ein Foto von dir, ohne zu fragen. Du hast gefragt: „Hast du mich gefragt?“ Er hat es gelöscht.'], ['k1KenanGeloescht', 'Kenan hatte ein Foto von dir, ohne zu fragen. Du hast gesagt: Lösch das. Er hat es gelöscht.'],
      ['k1KenanKomisch', 'Kenan hatte ein Foto von dir, ohne zu fragen. Du hast gesagt: „Ich seh komisch aus.“ Es ist noch auf seinem Handy.'], ['k1KenanNichts', 'Kenan hatte ein Foto von dir, ohne zu fragen. Du hast nichts gesagt. Es ist noch auf seinem Handy.']]),
    eins(m, [['k1JoGestoppt', 'Am Tisch hat Jo über Rafas Stimmen geredet. Du hast gesagt: „Hör auf, Jo.“'], ['k1AccountGefragt', 'Am Tisch hast du gefragt, wer den Account macht. Ben: „Der weiß immer, wo alle sind.“']]),
    eins(m, [[(x) => x.k1Geerdet && !x.fotoMitgelacht, 'Als dein Foto kam, hast du drei Dinge gesucht, die nicht lachen. Danach warst du ruhiger.'], [(x) => x.k1Dinge === 0 && !x.fotoMitgelacht, 'Als dein Foto kam, hast du keins der drei Dinge gefunden.'], [(x) => x.k1Dinge > 0 && !x.fotoMitgelacht, 'Als dein Foto kam, hast du nicht alle drei Dinge gefunden.']]),
    eins(m, [[(x) => x.k1Stopp && x.joWeiter, 'Als alles zu viel war, hast du ein Wort gesagt: „Stopp.“ Ben hat das Handy gesenkt.'], ['k1Stopp', 'Als alles zu viel war, hast du ein Wort gesagt: „Stopp.“ Jo hat das Handy gesenkt.']]),
    eins(m, [['fotoDario', 'Als das Foto von dir kam, bist du direkt zu Dario gegangen.'], ['fotoTidderich', 'Das Foto von dir hast du Mme Tidderich gezeigt. Jo hat hinter dir „Petze?“ gesagt.'],
      ['fotoWeg', 'Als das Foto von dir kam, hast du das Handy weggesteckt.'], [(x) => x.fotoMitgelacht && x.kantineNoah, 'Als das Foto von dir kam, hast du mitgelacht. Noah ist einen Schritt weggegangen.'], [(x) => x.fotoMitgelacht && x.kantineMila, 'Als das Foto von dir kam, hast du mitgelacht. Mila hat den Hörer zurückgenommen.'], ['fotoMitgelacht', 'Als das Foto von dir kam, hast du mitgelacht.']]),
    eins(m, [['fotoKlar', 'Als das Foto von dir kam, hast du gesagt: Ja, bin ich. Löscht das.']]),
    eins(m, [['darioKonfrontiert', 'Am Nachmittag hast du Dario gesagt: Heut früh hattest du dein Handy in der Hand.'], ['darioWoher', 'Am Nachmittag hast du Dario gefragt, woher er das alles weiß.']]),
    eins(m, [['lachenZurueck', 'Im Klassenchat stand: „sogar du hast gelacht. also ist es ok“. Du hast geschrieben: „War nicht okay.“'], ['nurSpass', 'Im Klassenchat stand: „sogar du hast gelacht. also ist es ok“. Du hast geschrieben: „Ja. Nur Spaß.“'], [(x) => x.fotoMitgelacht && !x.postStumm, 'Im Klassenchat stand: „sogar du hast gelacht. also ist es ok“. Du hast nichts dazu geschrieben.'], ['postKlar', 'Auf das Foto von dir hast du im Chat klar geantwortet.'], ['postWitz', 'Über das Foto von dir hast du einen Witz gemacht.'], ['postFrage', 'Zum Foto von dir hast du eine Frage gestellt.'],
      ['postGemeldet', 'Das Foto von dir hast du gemeldet.'], ['postStumm', 'Den Chat hast du stumm geschaltet.'], ['postStill', 'Zum Foto von dir hast du nichts geschrieben.']]),
    eins(m, [['benLuegeAngesprochen', 'Ben hatte gesagt, er hat nichts geteilt. Im Klassenchat hast du ihn darauf angesprochen. Ben: „hab nur weitergeleitet.“ Mila: „das ist teilen, ben.“']]),
    (() => { const v = m.abendVon; if (v === 'mila' && m.fotoMitgelacht) return 'Abends hat Mila dir nicht geschrieben.'; const S1 = { noah: m.fotoMitgelacht ? 'Noah geschrieben: „ich hab nicht abgestimmt. und nicht gelacht.“' : 'Noah geschrieben: „ich hab nicht abgestimmt.“', mila: 'Mila geschrieben: „regen. 10 std. hilft auch nachts.“', dario: 'Dario geschrieben: „dein foto. geht vorbei. schlaf.“' }[v]; if (!S1) return null;
      if (m.abendNichtGesehen) return null;   // stumm geschaltet, bevor die Nachricht kam: nichts behaupten
      return 'Abends hat dir ' + S1 + ' ' + (m.abendFrage ? (v === 'noah' ? 'Du hast nachgefragt. Noah: „mich hat letztes jahr auch einer fotografiert.“' : 'Du hast nachgefragt.') : m.abendOkay || m.abendKlar ? 'Du hast geantwortet.' : m.abendGruppe ? 'Du hast lieber in die Gruppe geschrieben.' : m.abendGelesen ? 'Du hast es gelesen und nicht geantwortet.' : 'Du hast nicht geantwortet.'); })(),
    eins(m, [['benNichtGeantwortet', 'Ben hat sich entschuldigt. Du hast nicht geantwortet.'], ['benVerziehen', 'Ben hat sich entschuldigt. Du hast gesagt: Schon okay.'], ['benKlar', 'Ben hat sich entschuldigt. Du hast gesagt, dass es nicht okay war.'], ['benGefragt1', 'Ben hast du gefragt, warum er so was weiterleitet.'], ['benGelesen', 'Bens Entschuldigung hast du auf „gelesen“ gelassen.']]),
    eins(m, [['nummerSanft', 'Die unbekannte Nummer: Du hast gefragt „alles ok bei dir?“. Antwort: „nein. aber danke, dass du fragst.“'], ['nummerFrage', 'Die unbekannte Nummer: Du hast gefragt, was sie gesehen hat. Antwort: „die treppe. eine hand. ein handy.“'],
      ['nummerFordernd', 'Die unbekannte Nummer: Du hast „wer bist du?“ geschrieben. Antwort: „kann ich nicht sagen.“'], ['nummerBlockiert', 'Die unbekannte Nummer hast du blockiert.'], ['nummerStill', null]]),
    // Deine Spuren (nachts und Dienstag früh) in einer Zeile
    (() => { const w = { offen: 'An der Wand: noch niemand beschuldigt.', dario: 'An der Wand: auf Dario getippt.', lina: 'An der Wand: auf Lina getippt.', kenan: 'An der Wand: auf Kenan getippt.' }[m.verdacht1] || '';
      const d = m.dmBlockiert ? '@annexe.cam hat dir geschrieben – blockiert.' : m.dmScreenshot ? '@annexe.cam hat dir geschrieben – Screenshot gemacht.' : m.dmKlar ? '@annexe.cam hat dir geschrieben – „Lass mich in Ruhe.“' : '';
      const z = m.erzaehltTidderich ? 'Dienstag früh Mme Tidderich gezeigt.' : m.erzaehltKuedes ? 'Dienstag früh Herrn Kuedes gezeigt.' : m.erzaehltDario ? 'Dienstag Dario gezeigt. Er: „Der klaut meine Sätze.“' : m.erzaehltNiemand ? 'Niemandem gezeigt. Dienstag früh hat Herr Kuedes gesagt: „Das liegt nicht an dir.“' : '';
      const t = [w, d, z].filter(Boolean).join(' '); return t ? 'Nachts: ' + t : null; })(),
    eins(m, [['sportStoppIgnoriert', 'Im Sport hat Yusuf Stopp gesagt – und du hast weiter angesagt.'], ['sportGut', 'Im Sport hast du Yusuf ruhig durch den Parcours geführt.'], ['sportHektik', 'Im Sport hast du Yusuf zu schnell geführt.']]),
    eins(m, [['sportJoNeu', 'Als Noah im Sport fiel, hast du Jo leise an seine eigene Zeit als Neuer erinnert.'], ['sportJoStopp', 'Als Noah im Sport fiel, hast du vor allen gesagt: „Er hat Stopp gesagt.“'], ['sportNoahHand', 'Als Noah im Sport fiel, bist du zu ihm gegangen.'], ['sportGelacht', 'Als Noah im Sport fiel, hast du mitgelacht.']]),
  ],
  2: (m) => [
    eins(m, [['selbstZuhoeren', 'Dario hast du gesagt, was du kannst: zuhören.'], ['selbstMerken', 'Dario hast du gesagt, was du kannst: dir Sachen merken.'],
      ['selbstLachen', 'Dario hast du gesagt, was du kannst: Leute zum Lachen bringen.'], ['selbstOffen', 'Dario hast du gesagt: Was ich kann, weiß ich noch nicht.']]),
    eins(m, [['steckbriefTurm', 'In Noahs Steckbrief hast du geschrieben, was er nur dir erzählt hat. Noah: „Egal.“ Mme Nouvelle: „Egal ist kein Ja.“ Ben hatte es schon gelesen.'], ['steckbriefSelbst', 'Für Noahs Steckbrief hast du gesagt: „Schreib du.“ Die Liste hatte keinen Satz von dir.'], ['steckbriefGenau', 'Für Noahs Steckbrief hast du „misst alles genau“ gewählt. Die Liste hat daraus „misst sogar sein essen“ gemacht.'], ['steckbriefStill', 'Für Noahs Steckbrief hast du „still“ gewählt. Die Liste hat daraus „sagt nie was“ gemacht.']]),
    eins(m, [[(x) => x.k2ZweiterVersuch, 'Beim Interview hat Mme Nouvelle gesagt: „Frag nach.“ Beim zweiten Versuch hast du nachgefragt.']]),
    eins(m, [['pause2Chiara', 'In der Pause warst du bei Chiara und den Wahlzetteln.'], ['pause2Jo', 'In der Pause warst du bei Jo.'], ['pause2Ben', 'In der Pause warst du bei Ben auf der Bank.'], ['pause2Lina', 'In der Pause warst du bei Lina am Brunnen.']]),
    eins(m, [['linaVertraut', 'Lina hast du gesagt: „Ich schau nicht rein.“'], ['linaGedraengt', 'Lina wolltest du ins Heft schauen. Sie ist gegangen.']]),
    eins(m, [['chiaraSicher', 'Chiara hast du beim Verteilen geholfen. Ihre Stimme wurde langsamer.'], ['chiaraChill', 'Chiara hast du gesagt: Ist doch nur eine Wahl.']]),
    eins(m, [['heftZu', 'Jo hat in Linas Heft geblättert. Du hast es zugeklappt, ohne reinzuschauen, und Lina gebracht.'], ['heftReingeschaut', 'Jo hat in Linas Heft geblättert. Du hast es ihm abgenommen – und dann selbst reingeschaut.'], ['heftZurueck', 'Jo hat in Linas Heft geblättert. Du hast gesagt: „Gib her.“'], ['heftGeschaut', 'Jo hat in Linas Heft geblättert. Du wolltest auch reinschauen.'], ['heftBlieb', 'Jo hat in Linas Heft geblättert. Du bist geblieben, wo du warst.'],
      ['chiaraGeholfen', 'Als Jo Chiara nachgemacht hat, bist du zu ihr gegangen.'], ['chiaraAllein', 'Als Jo Chiara nachgemacht hat, bist du geblieben, wo du warst.']]),
    eins(m, [['benRaus', 'Ben hast du ohne Handy an den Korb geholt.'], ['benGespielt', 'Mit Ben hast du eine Runde gespielt. Danach wollte er noch eine.']]),
    eins(m, [['benSelbst', 'Auf der Bank hast du Ben gesagt: Yusuf wartet. Er hat ihm geantwortet.'], ['benFuerIhn', 'Am Bus hast du für Ben Yusuf geantwortet.'], ['benFrueher', 'Am Bus hast du Ben gefragt: Heut früher pennen?'], ['benAllein', 'Am Bus bist du eingestiegen. Ben blieb mit seinem Level sitzen.']]),
    (() => { const t = eins(m, [['atelierNoah', 'In der Werkstatt hast du Noah gefragt, was er gemessen hat.'], ['atelierPlan', 'In der Werkstatt hast du auf den Plan gezeigt.'], ['atelierSelbst', 'In der Werkstatt hast du selbst gemessen.'], ['atelierJo', 'In der Werkstatt hast du Jo messen lassen.']]); return t ? t + (m.bankWackelt ? ' Die Bank wackelt.' : m.bankGerade ? ' Die Bank steht gerade.' : '') : null; })(),
    eins(m, [['listeTankNoah', 'Als die Liste kam, hast du vor allen gesagt: „Ohne Noah würde die Bank wackeln.“'], ['listeBeiNoah', 'Als die Liste kam, bist du zu Noah gegangen.'], ['listeGemeldet', 'Die Liste hast du Mme Tidderich gezeigt.'], ['listeGelacht', 'Als die Liste kam, bist du bei den Lachenden geblieben. Jo: „Du bist okay.“ Mila ist allein zu Mme Tidderich gegangen.'], ['listeWeggeschaut', 'Als die Liste kam, hast du weggeschaut.']]),
    eins(m, [[(x) => x.noahRausGefragt && x.listeGelacht, 'Noah hat gesagt „ist mir egal“. Du hast ihn gefragt, ob er raus will. Er: „Mit dir? … Nein.“'], ['noahRausGefragt', 'Noah hat gesagt „ist mir egal“. Du hast ihn gefragt, ob er raus will.'], ['noahNichtEgal', 'Noah hat gesagt „ist mir egal“. Du hast gesagt: Mir nicht.'], ['noahEgalGeglaubt', 'Noah hat gesagt „ist mir egal“. Du hast es so stehen lassen. Am Freitag: „War’s nicht.“']]),
    eins(m, [['k2Entschuldigt', 'Danach hast du Noah gesagt: „Sorry. Ich hab mitgelacht.“ Er: „Gut, dass du’s sagst.“']]),
    eins(m, [['gegenlisteGepostet', 'Bens Gegenliste hast du selbst gepostet. @annexe.cam hat sie geteilt. Noah: „Jetzt bin ich auf zwei Listen.“'], ['gegenlisteNoahGefragt', 'Ben hat dir die Gegenliste zum Posten gegeben. Du hast erst Noah gefragt. Er wollte nicht.'], ['gegenlisteGeloescht', 'Ben hat dir die Gegenliste zum Posten gegeben. Du hast sie gelöscht.'], ['gegenlisteBenPostet', 'Ben hat dir die Gegenliste zum Posten gegeben. Du hast gezögert. Er hat selbst gepostet.'], ['gegenlisteDabei', 'Bei Bens Gegenliste hast du mitgemacht.'], ['gegenlisteNein', 'Bens Gegenliste hast du gebremst.'], ['gegenlisteFragen', 'Du wolltest erst Noah fragen.'], [(x) => x.gegenlisteNoahSuchen && x.listeGelacht && x.k2Entschuldigt, 'Du bist Noah suchen gegangen – nach dem Sorry. Er: „Bleib.“'], [(x) => x.gegenlisteNoahSuchen && x.listeGelacht, 'Du bist Noah suchen gegangen – nach dem Lachen. Er: „Erst lachen. Dann suchen.“'], ['gegenlisteNoahSuchen', 'Du bist Noah suchen gegangen. Die Gegenliste kam trotzdem – aber du warst bei ihm.']]),
    eins(m, [['turmGeschuetzt', 'Im Jugendhaus wollte Ben Noahs Turm fotografieren. Du hast es verhindert.'], ['turmFoto', 'Im Jugendhaus hat Ben Noahs Turm fotografiert. Du hast gesagt: Ist doch nichts Schlimmes.']]),
    (() => { const a = eins(m, [['k2NoahImBild', 'Für Luca gefilmt: Noah lief hinten durchs Bild, du hast draufgehalten.'], ['k2NoahRausgeschwenkt', 'Für Luca gefilmt: Als Noah durchs Bild lief, hast du weggeschwenkt.']]);
      const b = eins(m, [['lucaWiderspruch', 'Über die Liste hast du ihm widersprochen.'], ['lucaMitgelacht', 'Über die Liste hast du mitgelacht.'], ['lucaStehenGelassen', 'Danach hast du ihm das Handy zurückgegeben, ohne was zu sagen.']]);
      return a || b ? [a, b].filter(Boolean).join(' ') : null; })(),
    (() => { if (m.staerkeOhne) return 'Dario wollte einen Beweis für deine Stärke. Du hattest keinen. „Dann such einen.“';
      const b = m.beweisNoah ? (m.noahRausGefragt || m.gegenlisteNoahSuchen ? '„Noah. Treppe, Dienstag.“' : '„Noah. Dienstag, mit rein.“') : m.beweisBank ? '„Bank zwei. Zweiundvierzig.“' : m.beweisChiara ? '„Chiara. Der Stapel.“' : m.beweisRafa ? '„Rafa. Er hat gelacht.“' : m.beweisMut ? (m.turmGeschuetzt ? '„Der Turm. Kein Foto.“' : '„Luca. Ich hab widersprochen.“') : null; if (!b) return null;
      return 'Dario wollte einen Beweis für deine Stärke. Du: ' + b + ' – ' + (m.beweisHalb ? '„Zählt halb.“' : m.beweisAnders ? 'Er: „Das ist eine andere Stärke. Auch gut.“' : '„Glaub ich dir.“'); })(),
    eins(m, [['darioListeNein', 'An der Haltestelle hast du gesagt: „War nicht lustig.“ Im Bus stand genau das bei @annexe.cam. Dario und Lina haben es gehört.'], ['darioListeTaube', 'An der Haltestelle hast du gesagt: „Die Taube war gut.“ Im Bus stand genau das bei @annexe.cam. Dario und Lina haben es gehört.'],
      ['darioWarum', 'An der Haltestelle hast du Dario gefragt, warum er fragt. Im Bus stand dein Satz bei @annexe.cam.'], ['darioErtappt', 'Dario hast du gesagt: Du drehst dein Handy immer weg. Im Bus stand dein Satz bei @annexe.cam.']]),
    eins(m, [['k2DreiDinge', 'Als dein Satz in der Story stand, hast du drei Dinge im Bus gesucht – wie am ersten Tag.']]),
    eins(m, [['k2NoahKuedes', 'Am Freitag ist Noah zu Herrn Kuedes gegangen.']]),
    eins(m, [[(x) => x.chiaraSicher || x.chiaraGefragt || x.chiaraGeholfen, 'Folge: Chiara wurde Klassensprecherin.'], [(x) => x.pause2Chiara || x.pause2Jo || x.pause2Ben || x.pause2Lina, 'Folge: Jo wurde Klassensprecher.']]),
    (() => { const a = m.armbandErkannt ? 'Auf der Zeichnung in deiner Jacke: Darios Armband.' : '';
      const w = { offen: 'An der Wand: noch niemand beschuldigt.', dario: 'An der Wand: auf Dario getippt.', lina: 'An der Wand: auf Lina getippt.', kenan: 'An der Wand: auf Kenan getippt.' }[m.verdacht2] || '';
      const t = [a, w].filter(Boolean).join(' '); return t ? 'Spuren: ' + t : null; })(),
  ],
  3: (m) => {
    const name = { noah: 'Noah', lina: 'Lina', manon: 'Manon', mila: 'Mila', ayla: 'Ayla', chiara: 'Chiara', ben: 'Ben', yusuf: 'Yusuf', jo: 'Jo' }[m.k3UebrigId] || 'jemand';
    return [
    eins(m, [['wegDirekt', 'Am Tor hast du Manon geholfen. Du hast sie auf Französisch zur 1.04 gelotst – direkt.'], ['wegUmweg', 'Am Tor hast du Manon geholfen. Du hast sie auf Französisch zur 1.04 gelotst – über die Kantine.'],
      ['wegNicht', 'Am Tor hast du Manon geholfen. Beim Lotsen hat sie sich verlaufen und kam zu spät.'], ['manonSabli', 'Am Tor hast du Manon zu Mme Sabli geschickt.'], ['manonVorbei', 'Am Tor bist du an Manon vorbeigegangen. Sie kam zu spät, die Klasse hat gelacht.']]),
    eins(m, [[(x) => x.manonListeFalsch && (x.manonVorbei || x.manonSabli), 'Im Klassenchat hat Manon nach der alten Liste gefragt. Jo hat schon getippt. Du warst schneller: „vieille liste. méchante.“'], ['manonListeNoah', 'Im Klassenchat hat Manon nach der alten Liste gefragt. Du: „demande à noah.“ Sie hat Noah selbst gefragt.'], ['manonListeFalsch', 'Manon hat die alte Liste im Klassenchat gesehen. Du hast gesagt: „Une vieille liste. Méchante.“'], ['manonListeGeglaubt', 'Manon hat die alte Liste gesehen. Du hast übersetzt: „Er redet nie.“'], ['manonListeNichts', 'Manon hat dich nach der alten Liste gefragt. Du hast nichts erklärt.'], ['manonListeJo', 'Im Klassenchat hat Manon nach der alten Liste gefragt. Jo war schneller: „il est bizarre 😂“.']]),
    eins(m, [['pause3Skate', 'In der Pause warst du an der Skate-Ecke bei der 7P1.'], ['pause3Yusuf', 'In der Pause warst du bei Yusuf am Korb.'], ['pause3Manon', 'In der Pause warst du bei Manon.'], ['pause3Zaun', 'In der Pause warst du an der Mauer. Yusufs kleiner Bruder rief: „Sag ihm: Mittwoch um vier!“']]),
    eins(m, [['k3ZaunVersprochen', 'Du hast gesagt: „Mach ich.“' + (m.k3Uhr ? ' Im Gang hast du es Yusuf gesagt.' : m.k3SommerGeholfen ? ' Im Gang hast du es Frau Sommer gesagt.' : ' Im Gang hast du es Yusuf nicht gesagt.')], ['k3ZaunSelbst', 'Du hast gesagt: „Sag’s ihm selbst.“']]),
    eins(m, [[(x) => x.manonPauseAngebot && !x.pause3Manon, 'Du hast Manon angeboten: „Pause ? Je te montre tout.“ In der Pause warst du woanders. Sie hat gewartet.']]),
    eins(m, [['k3SkateYusuf', 'Als Kenan Yusuf „den Bissigen“ nannte, hast du gesagt: „Lass Yusuf da raus.“'], ['k3SkateGelacht', 'Als Kenan Yusuf „den Bissigen“ nannte, hast du mitgelacht. Yusuf hat es gesehen.'], [(x) => x.pause3Skate, 'Als Kenan Yusuf „den Bissigen“ nannte, hast du nichts gesagt.']]),
    eins(m, [['k3UebrigHin', 'Beim Anpfiff hieß es: „' + name + ' wie immer übrig!“ Du hast deinen Platz abgegeben und die erste Hälfte auf der Bank gesessen.'], ['k3UebrigBlieb', 'Beim Anpfiff hieß es: „' + name + ' wie immer übrig!“ Du hast auf den Anpfiff gewartet.']]),
    eins(m, [['k3HalsFrueh', 'Als Yusuf dich anschrie und dein Hals heiß wurde, hast du sofort geatmet.'], [(x) => x.k3Team && x.rotGeatmet3, 'Als Yusuf dich anschrie, warst du schnell auf Rot. Dann hast du geatmet.'], [(x) => x.k3Team && (x.k3Uhr || x.k3Zurueck || x.k3Dazwischen || x.k3Sommer), 'Als Yusuf dich anschrie, warst du schnell auf Rot.']]),
    eins(m, [['k3Uhr', 'Im Gang hast du Yusuf gefragt: „Musst du weg?“'], ['k3Zurueck', 'Im Gang hast du zurückgeschrien.'], ['k3Dazwischen', 'Im Gang hast du dich dazwischengestellt.'], ['k3SommerGeholfen', 'Im Gang hast du Frau Sommer geholt und gesagt: „Er muss um vier weg.“ Sie hat ihn gehen lassen.'], ['k3Sommer', 'Im Gang hast du Frau Sommer geholt. Warum Yusuf so war, wusstest du nicht.']]),
    (() => { const a = m.k3LeiterGenervt ? 'genervt' : m.k3LeiterSauer ? 'sauer' : m.k3LeiterWuetend ? 'wütend' : m.k3LeiterRasend ? 'rasend' : null; if (!a) return null;
      const d = m.k3DrunterAngst ? ' Drunter: Angst.' : m.k3DrunterScham ? ' Drunter: Scham.' : m.k3DrunterNichts ? ' Drunter: nichts, hast du gesagt.' : ' Was drunter war: weißt du nicht.'; const sg = m.k3SignalHals ? ' Zuerst merkst du es im Hals.' : m.k3SignalBauch ? ' Zuerst merkst du es im Bauch.' : m.k3SignalHaende ? ' Zuerst merkst du es an den Händen.' : '';
      return 'Später gefragt, wie sauer du warst: ' + a + '.' + d + sg; })(),
    eins(m, [['k3YusufGeschickt', m.k3Gewonnen ? 'Du hast Yusuf gehen lassen. Das Finale habt ihr zu viert gespielt – und verloren.' : 'Du hast Yusuf gehen lassen und Frau Sommer Bescheid gesagt.'],
      ['k3YusufGehalten', 'Du hast Yusuf gesagt: „Bleib bis Schluss.“' + (m.k3Gewonnen ? ' Ihr habt den Pokal geholt.' : '') + ' Sein Bruder hat zwölf Minuten allein gewartet.']]),
    eins(m, [['k3DarioGenannt', 'In der Kantine bist du Yusuf hinterher. Du hast ihm den Streifen gezeigt: Darios Hülle.'], ['k3KenanGenannt', 'In der Kantine bist du Yusuf hinterher. Du hast gesagt: „Bissig“ sagt Kenan.'],
      ['k3NichtGewusstK', 'In der Kantine bist du Yusuf hinterher. Du hast gesagt: „Weiß ich nicht.“'], ['k3ErstWeg', 'In der Kantine bist du Yusuf hinterher. Du hast gesagt: „Erst muss das weg.“']]),
    eins(m, [['k3BruderVerraten', 'In den Klassenchat hast du geschrieben: „Sein Bruder wartete allein!“ Yusuf hat dir geschrieben: „Das war meins.“'], ['k3ChiaraMit', 'Im Klassenchat: Erst hast du Chiara privat gefragt. Dann ihr beide: „Löscht das.“ Der Zähler blieb stehen.'], ['k3ChatStopp', 'In den Klassenchat hast du geschrieben: „Löscht das.“'],
      ['k3ChatGrund', 'In den Klassenchat hast du geschrieben: „Er hatte einen Grund.“ Welchen, hast du nicht verraten.'], ['k3ChatNichts', 'In den Klassenchat hast du nichts geschrieben.']]),
    eins(m, [[(x) => (x.k3Sommer && !x.k3SommerGeholfen) || x.k3Zurueck, 'Yusuf musste bis halb fünf bleiben. Sein Bruder (7) hat so lange allein vor der Grundschule gewartet.']]),
    eins(m, [['k3Eingestiegen', 'Am Freitag kam Yusuf zu dir. „Warte. Ich –“ Dann kam dein Bus. Du bist eingestiegen.'], ['k3Geblieben', 'Am Freitag kam Yusuf zu dir. „Warte. Ich –“ Dann kam dein Bus. Du bist geblieben.']]),
    eins(m, [['k3BusMechant', 'Im Bus hat Manon gefragt, was „bissig“ heißt. Du: „Méchant.“'], ['k3BusFache', 'Im Bus hat Manon gefragt, was „bissig“ heißt. Du: „Fâché. Très fâché.“'], ['k3BusPeur', 'Im Bus hat Manon gefragt, was „bissig“ heißt. Du: „Il avait peur.“ Mehr nicht.'], [(x) => x.k3Eingestiegen, 'Im Bus hat Manon gefragt, was „bissig“ heißt. Du hast ihr das Handy zurückgegeben.']]),
    eins(m, [[(x) => x.k3VerratEingesehen && x.k3Eingestiegen, 'Im Bus hast du Yusuf geschrieben: „Sorry. Das mit deinem Bruder war nicht meins.“ Er: „ok.“'], [(x) => x.k3VerratStill && x.k3Eingestiegen, 'Im Bus hast du an deinen Satz über Yusufs Bruder gedacht. Geschrieben hast du ihm nicht.'],
      ['k3VerratEingesehen', 'Am Freitag hat Yusuf gefragt: „Das im Chat. Warum?“ Du hast gesagt: „Das war nicht meins.“'],
      ['k3VerratHelfen', 'Am Freitag hat Yusuf gefragt: „Das im Chat. Warum?“ Du hast gesagt: „Wollte dir helfen.“ Er ist gegangen.'],
      ['k3VerratStill', 'Am Freitag hat Yusuf gefragt: „Das im Chat. Warum?“ Du hast nichts gesagt. Er ist gegangen.'],
      ['k3Uebersetzt', 'Am Freitag hat Yusuf sich entschuldigt. Du hast gesagt: „Du hattest Angst um ihn.“'],
      ['k3NichtGewusst', 'Am Freitag hat Yusuf gesagt: „Halb fünf. Er hat geweint.“ Du: „Ich wusste das nicht.“'],
      ['k3Sorry', 'Am Freitag hat Yusuf gesagt: „Halb fünf. Er hat geweint.“ Du hast dich entschuldigt.'],
      ['k3Angefangen', 'Am Freitag hat Yusuf gesagt: „Halb fünf. Er hat geweint.“ Du: „Du hast angefangen.“'],
      ['k3Aufhoeren', 'Am Freitag hat Yusuf gesagt: „Halb fünf. Er hat geweint.“ Du: „Es sollte aufhören.“'],
      ['k3DazwischenFrage', 'Am Freitag hast du Yusuf gefragt, warum er so war. Er hat es dir gesagt.'],
      ['k3SchonOkay', 'Am Freitag hat Yusuf sich entschuldigt. Du hast gesagt: „Schon okay.“']]),
    eins(m, [['k3Mitgegangen', 'Danach bist du mit Yusuf zur Grundschule gegangen. Sein Bruder kam angerannt.']]),
    ];
  },
  4: (m) => {
    const p = m.k4Plan || {}, W = { atmen: '4 ein, 8 aus', kalt: 'Kälte', sauer: 'saurer Drops', rennen: 'rennen', zaehlen: 'rückwärts zählen', parken: 'Gedanken parken' };
    const ZU = { mila: 'Mila', kaya: 'Herrn Kuedes', lenning: 'Mme Lenning' };
    const planGenutzt = (p.rot === 'atmen' && (m.k4Geatmet || m.rotGeatmet4)) || (p.rot === 'kalt' && m.k4Brunnen) || (p.rot === 'zaehlen' && m.k4ZaehlenRot) || (p.rot === 'parken' && m.k4ParkenRot) || (p.zu && (m.k4ZuPerson === p.zu || (p.zu === 'lenning' && m.k4LenningGeholt)));
    const zone = (m.k4Hoch || 0) >= 7 ? 'Rot' : (m.k4Hoch || 0) >= 3 ? 'Gelb' : 'Grün';
    const gefuehlt = m.k4Gefuehlt30 ? 'drei Finger' : m.k4Gefuehlt60 ? 'sechs Finger' : m.k4Gefuehlt80 ? 'zehn Finger' : m.k4GefuehltWeiss ? 'Schulterzucken' : '';
    return [
    eins(m, [['k3DarioGenannt', 'Dario hat an der Haltestelle gesagt: Yusuf stand Freitag vor ihm. Wegen dir.']]),
    eins(m, [['k4DarioGefragt', 'Dario hat dir sein Handy für den Fahrplan gegeben. Oben stand „mittwoch. 8:34.“ Du hast ihn danach gefragt.'], ['k4DarioOkay', 'Dario hat dir sein Handy für den Fahrplan gegeben. Du hast gefragt: „Alles okay bei dir?“'], ['k4NichtGeschaut', 'Dario hat dir sein Handy für den Fahrplan gegeben. Du hast nur den Fahrplan gelesen.']]),
    p.rot ? 'Dein Ampelplan: Bei Rot – ' + (W[p.rot] || '?') + '. Bei Gelb – ' + (W[p.gelb] || '?') + '. Bei Rot gehe ich zu ' + (ZU[p.zu] || 'niemandem') + '.' : null,
    eins(m, [['chiaraFuesse', 'In der Pause hast du Chiara abgefragt und ihr gezeigt: Füße in den Boden.'], ['chiaraGestaerkt', 'In der Pause hast du Chiara abgefragt und ihr Mut gemacht.'], ['chiaraEasy', 'In der Pause wollte Chiara abgefragt werden. Du: „Ist doch easy. Lern halt.“'], ['chiaraSpaeter', 'In der Pause wollte Chiara abgefragt werden. Du: „Später, okay?“'],
      ['pause4Eis', 'In der Pause warst du mit Ben und Yusuf auf der Eisrutsche.'], ['pause4Mila', 'In der Pause warst du bei Mila am kalten Geländer.'], ['pause4Lina', 'In der Pause warst du mit Lina an der Tür von 1.04.']]),
    eins(m, [['spurZettel', 'Den gelben Zettel mit Loch am Türglas hast du fotografiert.'], ['k4ZettelWeg', 'Den gelben Zettel mit Loch am Türglas hast du abgerissen.'], ['k4ZettelLassen', 'Den gelben Zettel mit Loch hast du hängen lassen. Lina passt auf.']]),
    eins(m, [['k4PlanGeaendert', 'Mila hat dir gezeigt: Bei Rot legt sie die Hände aufs kalte Geländer. Du hast deinen Ampelplan geändert: Bei Rot – Kälte.'], ['k4MilaPlan', 'Mila hat dir gezeigt: Bei Rot legt sie die Hände aufs kalte Geländer.']]),
    m.k4TestRichtig != null ? 'Im Test: ' + m.k4TestRichtig + ' von 8. ' + ((m.k4TestMax || 0) >= 70 ? 'Du bist dabei auf Rot gekommen.' : 'Du bist dabei nicht auf Rot gekommen.') + (m.k4TestSkills ? ' Deinen Plan hast du ' + m.k4TestSkills + '-mal benutzt.' : ' Deinen Plan hast du nicht benutzt.') + (m.k4Notbremse ? ' Du hast die Notbremse gezogen.' : '') + (m.k4Geparkt ? ' Du hast ' + m.k4Geparkt + ' Gedanken geparkt.' : '') + (m.k4Aufgeschaut ? ' Fürs Aufschauen hast du ' + m.k4Aufgeschaut + ' Sekunden Testzeit gegeben.' : '') : null,
    eins(m, [['k4NoahGeblieben', 'Um 8:29 wollte Noah aufs Klo. Du hast „Bleib.“ geflüstert. Er ist geblieben. Dafür hat Mme Lenning dich ermahnt.'], ['k4Ermahnt', 'Mme Lenning hat dich im Test ermahnt: „Augen aufs Blatt.“']]),
    m.k4Hoch ? 'Beim Foto von 8:34 warst du gemessen auf ' + zone + '.' + (gefuehlt ? ' Mila hat dir später ihre Finger gezeigt (sieben). Du: ' + gefuehlt + '.' + (m.k4Gefuehlt30 && (m.k4Hoch || 0) >= 5 ? ' Gemessen warst du höher.' : '') : '') : null,
    eins(m, [['k4Explodiert', 'Du bist explodiert. Jemand hat gefilmt.'], ['k4FotoGezeigt', 'Du hast gesagt: Der Blitz kam von der Tür. Das Foto ist von draußen.'], ['k4LenningGeholt', 'Du bist zu Mme Lenning gegangen.'],
      [(x) => x.k4ZuPerson === 'mila', 'Du bist zu Mila gegangen.'], [(x) => x.k4ZuPerson === 'kaya', 'Du bist zu Herrn Kuedes gegangen.'], ['k4Brunnen', 'Du bist zum Brunnen gegangen. Kaltes Wasser.'], ['k4Ruhig', 'Du bist stehen geblieben und hast geatmet.'],
      [(x) => x.k4KopfGelb && x.k4Ruhig, 'Auf Gelb hast du dein Kopf-Werkzeug benutzt. Es hat gewirkt.'], [(x) => x.k4Geatmet || x.rotGeatmet4, 'Du hast geatmet. Dann ging es weiter.'], ['k4ZaehlenRot', 'Du hast rückwärts gezählt. Auf Rot kam es nicht an.'], ['k4ParkenRot', 'Du wolltest Gedanken parken. Auf Rot kam es nicht an.']]),
    eins(m, [['k4MilaDrauf', 'Danach hat Mila gefragt, ob du was tauschen willst. Jetzt steht sie auf deinem Zettel.'], ['k4PlanGetauscht', 'Danach hat Mila gefragt, ob du was tauschen willst. Du hast deine Rot-Zeile getauscht.'], ['k4PlanGelassen', 'Danach hat Mila gefragt, ob du was tauschen willst. Du hast den Zettel gelassen.']]),
    eins(m, [[(x) => x.k4Mitgegangen && x.k4Plan && x.k4Plan.zu, 'Die Person von deinem Plan hat den Kreis gesehen und ist gekommen. Du bist mitgegangen.'], [(x) => x.k4Geblieben4, 'Die Person von deinem Plan ist gekommen. Du bist geblieben – sie auch.'], ['k4Niemand', 'Beim Foto ist niemand gekommen. Auf deinem Plan stand niemand.']]),
    eins(m, [[(x) => x.k4JoMontag && x.k4JoBeschuldigt, 'Zu Jo hast du gesagt: „Montag hast du’s gesagt.“ Am Freitag: „Klar war’s Jo.“ Ben: Jo saß um 8:34 im Saal.'], [(x) => x.k4JoMontag && x.k4JoNichtBeschuldigt, 'Zu Jo hast du gesagt: „Montag hast du’s gesagt.“ Am Freitag hat Ben gefragt, ob es Jo war. Du: „Weiß ich nicht.“'], ['k4JoMontag', 'Zu Jo hast du gesagt: „Montag hast du’s gesagt.“ Ein paar haben dann Jo angeschaut.'], ['k4Wut', 'Zu Jo hast du gesagt: „Du gibst doch selbst leer ab.“'], ['k4WutSpaet', 'Du hast mit Worten zurückgeschlagen.']]),
    p.rot && (m.k4Hoch || 0) >= 7 && !planGenutzt && !m.k4FotoGezeigt ? 'Beim Foto warst du auf Rot. Dein Ampelplan stand zur Wahl. Du hast ihn nicht genommen.' : null,
    eins(m, [['k4NoahVerteidigt', 'Als der Verdacht auf Noah fiel, hast du gesagt: Er saß um 8:34 neben dir.'], ['k4NoahHalb', 'Als der Verdacht auf Noah fiel, hast du gesagt: „Hör auf, Jo.“'], ['k4NoahVerdacht', 'Als der Verdacht auf Noah fiel, hast du nichts gesagt.']]),
    eins(m, [[(x) => x.k4LenningGeholt || x.k4ZuPerson === 'kaya', 'Am Freitag hat Mme Lenning gesagt: „Du hast nicht gespickt.“'], ['k4FotoGezeigt', 'Am Freitag hat Mme Lenning gesagt: „Gut, dass du es gesagt hast.“'],
      ['k4LenningGesagt', 'Am Freitag hat Mme Lenning gefragt, ob du was sagen willst. Du: „Ich hab nicht gespickt.“'], ['k4LenningStill', 'Am Freitag hat Mme Lenning gefragt, ob du was sagen willst. Du hast den Kopf geschüttelt.']]),
    eins(m, [['k4ParkscheinAbgeholt', 'Deinen Parkschein hast du abgeholt. Du hast Mme Lenning gefragt: „Wer war um 8:34 am Glas?“'], ['k4ParkscheinLiegen', 'Deinen Parkschein hast du liegen lassen.']]),
    eins(m, [['k4SpaeterAbgefragt', 'Chiara hatte drei von acht. Du hast sie gleich abgefragt.'], ['k4SpaeterVersprochen', 'Chiara hatte drei von acht. Du hast versprochen: nach den Ferien.'], ['k4SpaeterSorry', 'Chiara hatte drei von acht. Du hast dich entschuldigt.']]),
    eins(m, [['k4JoBlattZurueck', 'Ben hat Jos Testblatt hochgehalten. Du hast gesagt: „Gib’s ihm zurück.“'], ['k4JoBlattGelacht', 'Ben hat Jos Testblatt hochgehalten. Du: „Eins? Echt?“'], ['k4JoBlattWeg', 'Ben hat Jos Testblatt hochgehalten. Du bist bei Mme Lenning geblieben.']]),
    eins(m, [['k4JoGerufen', 'In der Schneeballschlacht stand Jo ohne Wall. Du hast ihn reingeholt.'], ['k4JoAllein', 'In der Schneeballschlacht stand Jo ohne Wall. Keiner hat ihn gerufen.'], ['k4JoBlattGelacht', 'In der Schneeballschlacht hat Jo für die 7P1 geworfen. Auf dich.']]),
    eins(m, [['k4DarioZettel', 'An der Haltestelle kam Linas Nachricht: Der Zettel hängt noch. Du hast Dario gefragt. Er wusste, dass er gelb ist.'], ['k4DarioGezeigt', 'An der Haltestelle kam Linas Nachricht: Der Zettel hängt noch. Du hast sie Dario gezeigt.'], ['k4HandyWeg', 'An der Haltestelle kam Linas Nachricht: Der Zettel hängt noch. Du hast das Handy vor Dario weggedreht.']]),
    (() => { const t = eins(m, [['k4DarioWoher', 'Du: „Du wusstest es schon Montag.“'], ['k4DarioDa', 'Du bist einfach neben ihm stehen geblieben.'], ['k4DarioFrage', 'Du hast gefragt, was „zu viel“ heißt.']]); return t ? 'Dario am Freitag: „Das mit 8:34 … das war zu viel.“ ' + t : null; })(),
    ];
  },
  5: (m) => [
    eins(m, [['tuerAngst', 'Vor der Tür hast du gedacht: „Alle wissen es.“'], ['tuerKlar', 'Vor der Tür hast du gedacht: „Die reden über den Screenshot. Nicht unbedingt über mich.“'], ['tuerWut', 'Vor der Tür hast du gedacht: „Die können mich alle mal.“']]),
    eins(m, [['spurGebaut', 'Mit Mila hast du gezeigt: Der Screenshot ist gebaut.'], ['spurLowkey', 'Mit Mila hast du ein Wort gefunden: „lowkey“.']]),
    eins(m, [['k5BenBeschuldigt', 'Ben hast du beschuldigt.'], ['k5BenGefragt', 'Ben hast du offen gefragt. Die Spur führt zur Ecke.'], ['k5BenGemieden', 'Ben bist du aus dem Weg gegangen.']]),
    eins(m, [['k5SatzManche', 'Dein Satz für die Woche: „Manche glauben es. Nicht alle.“'], ['k5SatzWissen', 'Dein Satz für die Woche: „Ich weiß, was ich gemacht hab. Und was nicht.“'], ['k5SatzMittwoch', 'Dein Satz für die Woche: „Heute ist Mittwoch. Mehr weiß ich nicht.“']]),
    eins(m, [['k5Kuedes', 'Du bist zu Herrn Kuedes gegangen.'], ['k5Tidderich', 'Du bist zu Mme Tidderich gegangen.'], ['k5Warten', 'Du hast mit Mila gewartet, bis ihr mehr wisst.'], ['k5Niemand', 'Du hast keinem Erwachsenen etwas gesagt.']]),
  ],
  6: (m) => [
    eins(m, [['k6Datei', 'Du hast Dario gedrängt. Er hat dir die Datei geschickt.'], ['k6DarioGeschuetzt', 'Du hast Dario nicht gedrängt.']]),
    eins(m, [['k6JoVerstanden', 'Jo hast du nachgefragt statt ausgefragt. Er hat alles erzählt.'], ['k6JoGehoert', 'Jo hat dir einen Teil erzählt.'], ['k6JoZu', 'Jo hat dichtgemacht.']]),
    eins(m, [['k6DateiGepostet', 'Jos Sprachnachricht hast du in den Klassenchat gestellt.'], ['k6JoSelbst', 'Du hast Jo gebeten, es selbst zu schreiben.'], ['k6KuedesDatei', 'Mit der Sprachnachricht bist du zu Herrn Kuedes gegangen.'], ['k6NurMila', 'Du hast es nur Mila gesagt.']]),
    eins(m, [['k6Stopp', 'Als Luca Mila filmte, hast du Stopp gesagt.'], ['k6Linse', 'Als Luca Mila filmte, hast du dich vor die Linse gestellt.'], ['k6Kenan', 'Als Luca Mila filmte, hast du Kenan angesprochen.'],
      ['k6Rantini', 'Als Luca Mila filmte, hast du Mme Rantini geholt.'], ['k6Komm', 'Als Luca Mila filmte, hast du gefragt: „Komm?“'], ['k6Arm', 'Als Luca Mila filmte, hast du sie am Arm weggezogen. Ohne zu fragen.'], ['k6Weggeschaut', 'Als Luca Mila filmte, hast du weggeschaut.']]),
    (m.k6Fuer && m.k6Fuer.length) ? 'Für dich gestimmt: ' + m.k6Fuer.map((id) => id[0].toUpperCase() + id.slice(1)).join(', ') + '. Es hat trotzdem nicht gereicht.' : 'Bei der Abstimmung hat niemand von deinen Leuten für dich gestimmt.',
  ],
  7: (m) => [
    eins(m, [['k7NeinBleiben', 'Zu Lucas Angebot hast du Nein gesagt. Und bist stehen geblieben.'], ['k7Nein', 'Zu Lucas Angebot hast du Nein gesagt.'], ['k7MalSehen', 'Zu Lucas Angebot hast du „Mal sehen“ gesagt.'], ['k7Okay', 'Zu Lucas Angebot hast du „Okay“ gesagt.']]),
    eins(m, [['k7Gesetzt', 'In der Kantine hast du dich zu Noah gesetzt.'], ['k7Tuete', 'In der Kantine hast du die Tüte weggenommen.'], ['k7Kremer', 'In der Kantine hast du Frau Kremer geholt.'], ['k7Gefilmt', 'In der Kantine hast du gefilmt.'], ['k7Sitzen', 'In der Kantine bist du sitzen geblieben.']]),
    eins(m, [['k7YusufGehalten', 'Yusuf hast du aufgehalten.'], ['k7YusufRetenue', 'Yusuf hast du gehen lassen. Er hat eine Retenue bekommen.']]),
    eins(m, [['spurZwei', 'Mit Mila hast du gesehen: Das sind zwei. Oder einer hat aufgehört.']]),
    eins(m, [['k7Geteilt', 'Das Video von Mme Tidderich hast du weitergeleitet.'], ['k7NichtGeteilt', 'Das Video von Mme Tidderich hast du nicht weitergeleitet.']]),
  ],
  8: (m) => [
    eins(m, [[(x) => x.k8Angesehen >= 2, 'Das Video hast du mehrmals angesehen. Dein Feed zeigte dir mehr davon.'], [(x) => x.k8Angesehen === 1, 'Das Video hast du noch einmal angesehen.'], ['k8Gemeldet', 'Das Video hast du gemeldet.']]),
    eins(m, [['k8Fake', 'Du hast den Fake erkannt: Schrift, Ohrring, Atem.']]),
    eins(m, [['k8Namen', 'In die Mappe hast du Namen geschrieben.'], ['k8NurBeobachtung', 'In die Mappe hast du nur geschrieben, was ihr gesehen habt.'], ['k8KeineNamen', 'In die Mappe hast du keine Namen geschrieben.']]),
    eins(m, [['k8JoGefragt', 'Bevor Jos Sprachnachricht in die Mappe kam, hast du ihn gefragt.'], ['k8JoReingelegt', 'Jos Sprachnachricht hast du ohne zu fragen in die Mappe gelegt.'], ['k8JoWeg', 'Jos Sprachnachricht hast du weggelassen.']]),
    eins(m, [['k8NummerGefragt', 'Die unbekannte Nummer hast du vorher gefragt.'], ['k8NummerReingelegt', 'Die Zeichnung hast du ohne zu fragen in die Mappe gelegt.'], ['k8NummerWeg', 'Die Zeichnung hast du weggelassen.']]),
  ],
  9: (m) => [
    eins(m, [['k9MilaGeschrieben', 'In der Nacht hast du Mila geschrieben.']]),
    eins(m, [['k9Versprochen', 'Dario hast du versprochen, nichts zu sagen.'], ['k9NichtVersprochen', 'Dario hast du nichts versprochen.'], ['k9Mitkommen', 'Dario hast du gesagt: „Komm mit zu Herrn Kuedes.“'], ['k9Gegangen', 'Bei Darios Geständnis bist du aufgestanden und gegangen.']]),
    eins(m, [['k9AtemNicht', 'Vor der Tür zum SePAS hat das gemeinsame Atmen mit Dario noch nicht geklappt.']]),
    eins(m, [['k9Geklopft', 'An der Tür zum SePAS hast du für Dario geklopft.'], ['k9Gewartet', 'An der Tür zum SePAS hast du mit Dario gewartet.'], ['k9Vorgegangen', 'An der Tür zum SePAS bist du vorgegangen.']]),
    eins(m, [['k9LucaRuhig', 'Luca gegenüber bist du ruhig geblieben.'], ['k9LucaHeiss', 'Mit Luca ist es heiß geworden.'], ['k9LucaKnall', 'Mit Luca hat es geknallt.']]),
  ],
  10: (m) => [
    eins(m, [['k10Rutschen', 'An der Haltestelle hast du Dario Platz gemacht.'], ['k10HeuteNicht', 'An der Haltestelle hast du Dario gesagt: „Heute nicht.“'], ['k10Schweigen', 'An der Haltestelle hast du nichts gesagt.']]),
    eins(m, [['k10Bote', 'Du hast für die anderen mit Dario geredet.'], ['k10KeinBote', 'Du bist nicht zum Boten geworden.']]),
    eins(m, [['k10GruppeJa', 'Du bist wieder in den Klassenchat gegangen.'], ['k10GruppeNeu', 'Du wolltest eine neue Gruppe. Mit Ayla.'], ['k10GruppeNochNicht', 'In den Klassenchat wolltest du noch nicht zurück.']]),
    eins(m, [['k10Angestellt', 'Du hast dich zum Löschen angestellt.'], ['k10Sitzen', 'Beim Löschen bist du sitzen geblieben.']]),
    eins(m, [['k10Teil', 'Beim Sommerfest hast du deinen Teil gesagt.'], ['k10NebenBank', 'Beim Sommerfest hast du dich neben die Bank gestellt.'], ['k10Geschwiegen', 'Beim Sommerfest hast du deinen Teil nicht gesagt.']]),
    eins(m, [['k10JoNicht', 'Am Zaun hast du gesagt: „Jo. Nicht.“'], ['k10HandyGedrueckt', 'Am Zaun hast du Jos Handy runtergedrückt.'], ['k10Zaun', 'Am Zaun bist du selbst zu Luca gegangen.'], ['k10Weggedreht', 'Am Zaun hast du dich weggedreht.']]),
  ],
};

export const chronik = (kap, m = {}) => ((KAP[kap] || (() => []))(m) || []).filter(Boolean);

// Zusatzfrage je nach Weg (wird an die Gesprächsfrage gehängt)
export const GESPRAECH_ZUSATZ = {
  1: (m) => (m.fotoMitgelacht ? 'Jo schrieb: „Sogar du hast gelacht. Also ist es ok.“ Stimmt das?' : m.k1KenanNichts || m.k1KenanKomisch ? 'Kenans Foto von dir ist noch auf seinem Handy. Was hättest du sagen können?'
    : m.erzaehltNiemand ? '(Lieber einzeln:) Wem würdest du so eine Nachricht zeigen?' : m.k1Geerdet || m.k1Stopp ? 'Was hat dich um 13:31 runtergebracht? Wo brauchst du das diese Woche?' : ''),
  3: (m) => (m.k3BruderVerraten || m.k3Uebersetzt || m.k3BusPeur || m.k3SommerGeholfen ? 'Du wusstest vom Bruder. Wer durfte das wissen – und wann?' : m.k3SignalWeiss ? 'Wo merkst du Wut zuerst? (Nur für dich: Hals, Bauch, Hände …?)' : ''),
  4: (m) => (m.k4Niemand ? '(Lieber einzeln:) Wer in der Schule könnte auf Zeile drei stehen?' : m.k4ZaehlenRot || m.k4ParkenRot ? 'Was geht bei dir, wenn der Kopf zu ist?' : ''),
  2: (m) => (m.listeGelacht ? 'Was hat dir das Mitlachen gegeben – und was eine Stunde später?' : m.gegenlisteGepostet ? 'Noah: „Jetzt bin ich auf zwei Listen.“ War die nette Liste nett?' : ''),
};

// Fragen für das Gespräch mit der Lehrperson oder in der Klasse (offen, kein richtig/falsch). Erst die Entscheidungen ansehen, dann fragen.
export const GESPRAECH = {
  1: 'Mila sagt: „Cool, cringe – zählt beides.“ Stimmt das? Und: Was hilft, wenn plötzlich alle auf dich schauen?',
  2: 'Noah sagt: „Ist mir egal. Echt.“ Woran merkst du, ob das stimmt? Und: Was hast du diese Woche gut gemacht – mit Beweis?',
  3: 'Yusuf schreit: „Wer stellt denn so auf?!“ Übersetz den Satz: Was wollte er eigentlich sagen?',
  4: 'Mila hat sieben Finger gezeigt. Wie viele zeigst du für Mittwoch? Welche Zeile auf deinem Zettel hat gehalten – welche tauschst du?',
  5: 'Welcher Gedanke hat sich wie eine Tatsache angefühlt? Was hat die Kamera wirklich gezeigt?',
  6: 'Warum kann man fair abstimmen und trotzdem unfair sein?',
  7: 'Was hat es gekostet, sich zu Noah zu setzen? Was hat es gekostet, sitzen zu bleiben?',
  8: 'Woran hast du den Fake erkannt? Was hat Teilen „zum Prüfen“ trotzdem gemacht?',
  9: 'Welches Geheimnis darf man brechen? Woran merkst du es?',
  10: 'Was war „dein Teil“? Was ist eine kleine, echte Wiedergutmachung?',
};
