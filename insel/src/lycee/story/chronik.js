// „Deine Woche“: am Kapitelende die wichtigsten eigenen Entscheidungen in einfachen Sätzen – ohne Urteil.
// Für das Gespräch in der Klasse (Lehrperson und Schüler schauen gemeinsam drauf). Wird auch im Spielstand gemerkt (S.chronik).
const eins = (m, paare) => { for (const [f, t] of paare) if (typeof f === 'function' ? f(m) : m[f]) return t; return null; };
// Kernzeilen (Runde 5, für schwache Leser): K(n, satz) markiert einen Satz als Kern Nummer n (1–6, Skill-Momente zuerst).
// Je Nummer zählt nur der erste vorhandene Satz – die anderen bleiben im Rest („Alle Sätze“).
const KERN = '\u0001';
const K = (n, t) => (t ? KERN + n + t : null);

const KAP = {
  1: (m) => [
    K(4, ((u) => (u && m.kommentiert ? u + ' Unter das Foto von Rafa hast du „😂“ geschrieben.' : u))(eins(m, [['abgestimmtCool', 'Bei der Umfrage über Rafa hast du „cool“ geklickt. Auch das zählt als Stimme.'], ['abgestimmtCringe', 'Bei der Umfrage über Rafa hast du „cringe“ geklickt.'], ['abgestimmt', 'Bei der Umfrage über Rafa hast du geklickt.'], ['rafaGezeigt', 'Bei der Umfrage hast du Ben und Jo gezeigt: Der Junge sitzt da drüben.'], ['nichtAbgestimmt', 'Bei der Umfrage über Rafa hast du nicht geklickt.']]))),
    eins(m, [['nameStattLinks', 'Ben wollte dich im Klassenchat „hinten links“ nennen. Du hast gesagt: Mein Name reicht.'], ['hintenLinksOk', 'Ben nennt dich im Klassenchat „hinten links“. Du hast gesagt: passt.'], ['nurGelesen', 'Ben nennt dich im Klassenchat „hinten links“. Du hast nichts gesagt.']]),
    eins(m, [['joWeiter', 'Jo hat gefragt, warum du in der P bist. Du hast gesagt: „Weiter.“'], ['joAbgeblockt', 'Jo hat gefragt, warum du in der P bist. Du hast gesagt: „Geht dich nix an.“'], ['joLange', 'Jo hat gefragt, warum du in der P bist. Du hast gesagt: „Lange Geschichte.“']]),
    // Pause und Rafa in einem Satz
    K(5, (() => { const o = m.pauseTT ? 'Tischtennis mit Ayla' : m.pauseKorbOrt ? 'am Korb mit Yusuf' : m.pauseHandy ? 'bei Ben und Jo am Handy' : m.pauseBrunnen ? 'am Brunnen, bei Lina' : null; if (!o) return null;
      const r = m.rafaKuedes ? 'Mit Rafa bist du zu Herrn Kuedes gegangen.' : m.rafaKlar ? 'Rafa hast du gesagt: Das ist nicht okay.' : m.rafaWitz ? 'Rafa hast du mit einem Witz zum Lachen gebracht.' : m.rafaSorry ? 'Rafa hast du gesagt: „Eine war meine. Sorry.“ Er: „Wenigstens sagst du’s.“' : m.rafaDaneben ? 'Du hast dich neben Rafa gesetzt.' : m.pauseBlieb ? 'Als Rafa das Foto sah, bist du geblieben, wo du warst.' : '';
      return ('Große Pause: ' + o + '. ' + r + (m.pauseZuRafa ? ' Dafür hast du jemanden mitten im Spiel stehen lassen.' : '') + (m.rafaSorrySpaet ? ' Am Dienstag hast du ihm „Sorry“ gesagt.' : m.rafaVorbei ? ' Am Dienstag bist du an ihm vorbeigegangen.' : '')).trim(); })()),
    eins(m, [['k1BeiLina', 'Beim Klick von der Treppe bist du bei Lina geblieben. Sie hat dir ihre Zeichnung gezeigt.'], ['k1Hochgeschaut', 'Beim Klick von der Treppe hast du hochgeschaut: groß, Mütze.']]),
    eins(m, [['kantineNoah', 'In der Kantine hast du dich zu Noah gesetzt.'], [(x) => x.tischGerufen, 'In der Kantine hast du gezögert. Ben hat dich gerufen – du saßt bei Ben und Jo.'], ['kantineBen', 'In der Kantine hast du dich zu Ben und Jo gesetzt.'], ['kantineMila', 'In der Kantine hast du dich zu Mila gesetzt.'], ['kantineP1', 'In der Kantine hast du dich zu Dario und Kenan von der 7P1 gesetzt.']]),
    eins(m, [['k1KenanErlaubt', 'Kenan hatte ein Foto von dir, ohne zu fragen. Du hast gefragt – und es ihm dann erlaubt.'], [(x) => x.k1KenanGefragt && x.k1KenanGeloescht, 'Kenan hatte ein Foto von dir, ohne zu fragen. Du hast gefragt: „Hast du mich gefragt?“ Er hat es gelöscht.'], ['k1KenanGeloescht', 'Kenan hatte ein Foto von dir, ohne zu fragen. Du hast gesagt: Lösch das. Er hat es gelöscht.'],
      ['k1KenanKomisch', 'Kenan hatte ein Foto von dir, ohne zu fragen. Du hast gesagt: „Ich seh komisch aus.“ Es ist noch auf seinem Handy.'], ['k1KenanNichts', 'Kenan hatte ein Foto von dir, ohne zu fragen. Du hast nichts gesagt. Es ist noch auf seinem Handy.']]),
    eins(m, [['k1JoGestoppt', 'Am Tisch hat Jo über Rafas Stimmen geredet. Du hast gesagt: „Hör auf, Jo.“'], ['k1AccountGefragt', 'Am Tisch hast du gefragt, wer den Account macht. Ben: „Der weiß immer, wo alle sind.“']]),
    K(1, ((u) => (u ? u + (m.k1RuhigGeklappt ? ' Am Dienstag, in Ruhe: alle drei.' : m.k1DingeRuhig != null ? ' Am Dienstag, in Ruhe: ' + m.k1DingeRuhig + ' von 3.' : '') : null))(eins(m, [['k1Geerdet', 'Als dein Foto kam, hast du drei Dinge gesucht, die nicht lachen. Danach warst du ruhiger.'], [(x) => x.k1Dinge === 0, 'Als dein Foto kam, war es zu laut für die drei Dinge.'], [(x) => x.k1Dinge > 0, 'Als dein Foto kam, hast du nicht alle drei Dinge gefunden.']]))),
    !(m.pauseTT || m.pauseKorbOrt || m.pauseHandy || m.pauseBrunnen) && eins(m, [['rafaSorrySpaet', 'Am Dienstag im Gang hast du Rafa gesagt: „Eine Stimme war meine. Sorry.“'], ['rafaVorbei', 'Am Dienstag im Gang bist du an Rafa vorbeigegangen.']]),
    K(3, eins(m, [['k1DingeBus', 'Drei Dinge suchen willst du diese Woche ausprobieren: im Bus.'], ['k1DingePause', 'Drei Dinge suchen willst du diese Woche ausprobieren: in der Pause.'], ['k1DingeBett', 'Drei Dinge suchen willst du diese Woche ausprobieren: abends im Bett.'], ['k1DingeOffen', 'Wo du drei Dinge suchen willst, weißt du noch nicht.']])),
    K(2, eins(m, [[(x) => x.k1Stopp && x.joWeiter, 'Als alles zu viel war, hast du ein Wort gesagt: „Stopp.“ Ben hat das Handy gesenkt.'], ['k1Stopp', 'Als alles zu viel war, hast du ein Wort gesagt: „Stopp.“ Jo hat das Handy gesenkt.']])),
    K(2, eins(m, [['fotoDario', 'Als das Foto von dir kam, bist du direkt zu Dario gegangen.'], ['fotoTidderich', 'Das Foto von dir hast du Mme Tidderich gezeigt. Jo hat hinter dir „Petze?“ gesagt.'],
      ['fotoWeg', 'Als das Foto von dir kam, hast du das Handy weggesteckt.'], [(x) => x.fotoMitgelacht && x.kantineNoah, 'Als das Foto von dir kam, hast du mitgelacht. Noah ist einen Schritt weggegangen.'], [(x) => x.fotoMitgelacht && x.kantineMila, 'Als das Foto von dir kam, hast du mitgelacht. Mila hat den Hörer zurückgenommen.'], ['fotoMitgelacht', 'Als das Foto von dir kam, hast du mitgelacht.']])),
    K(2, eins(m, [['fotoKlar', 'Als das Foto von dir kam, hast du gesagt: Ja, bin ich. Löscht das.']])),
    eins(m, [['darioKonfrontiert', 'Am Nachmittag hast du Dario gesagt: Heut früh hattest du dein Handy in der Hand.'], ['darioWoher', 'Am Nachmittag hast du Dario gefragt, woher er das alles weiß.']]),
    eins(m, [['lachenZurueck', 'Im Klassenchat stand: „sogar du hast gelacht. also ist es ok“. Du hast geschrieben: „War nicht okay.“'], ['nurSpass', 'Im Klassenchat stand: „sogar du hast gelacht. also ist es ok“. Du hast geschrieben: „Ja. Nur Spaß.“'], [(x) => x.joLachtGesehen && !x.postStumm, 'Im Klassenchat stand: „sogar du hast gelacht. also ist es ok“. Du hast nichts dazu geschrieben.'], ['postKlar', 'Auf das Foto von dir hast du im Chat klar geantwortet.'], ['postWitz', 'Über das Foto von dir hast du einen Witz gemacht.'], ['postFrage', 'Zum Foto von dir hast du eine Frage gestellt.'],
      ['postGemeldet', 'Das Foto von dir hast du gemeldet.'], ['postStumm', 'Den Chat hast du stumm geschaltet.'], ['postStill', 'Zum Foto von dir hast du nichts geschrieben.']]),
    eins(m, [[(x) => x.postScreenshot && x.postMeldet && !x.postGemeldet, 'Im Chat hast du einen Screenshot gemacht und den Beitrag gemeldet.'], [(x) => x.postScreenshot, 'Im Chat hast du einen Screenshot gemacht.'], [(x) => x.postMeldet && !x.postGemeldet, 'Im Chat hast du den Beitrag gemeldet.']]),
    eins(m, [['benLuegeAngesprochen', 'Ben hatte gesagt, er hat nichts geteilt. Im Klassenchat hast du ihn darauf angesprochen. Ben: „hab nur weitergeleitet.“ Mila: „das ist teilen, ben.“']]),
    (() => { const v = m.abendVon; if (v === 'mila' && m.fotoMitgelacht) return 'Abends hat Mila dir nicht geschrieben.'; const S1 = { noah: m.fotoMitgelacht ? 'Noah geschrieben: „ich hab nicht abgestimmt. und nicht gelacht.“' : 'Noah geschrieben: „ich hab nicht abgestimmt.“', mila: 'Mila geschrieben: „regen. 10 std. hilft auch nachts.“', dario: 'Dario geschrieben: „dein foto. geht vorbei. schlaf.“' }[v]; if (!S1) return null;
      if (m.abendNichtGesehen) return null;   // stumm geschaltet, bevor die Nachricht kam: nichts behaupten
      return 'Abends hat dir ' + S1 + ' ' + (m.abendSorry ? 'Du hast geschrieben: „Sorry. Ich hab mitgelacht.“ Noah: „ok. gut, dass du’s sagst.“' : m.abendFrage ? (v === 'noah' ? 'Du hast nachgefragt. Noah: „mich hat letztes jahr auch einer fotografiert.“' : 'Du hast nachgefragt.') : m.abendOkay || m.abendKlar ? 'Du hast geantwortet.' : m.abendGruppe ? 'Du hast lieber in die Gruppe geschrieben.' : m.abendGelesen ? 'Du hast es gelesen und nicht geantwortet.' : 'Du hast nicht geantwortet.'); })(),
    eins(m, [['benNichtGeantwortet', 'Ben hat sich entschuldigt. Du hast nicht geantwortet.'], ['benVerziehen', 'Ben hat sich entschuldigt. Du hast gesagt: Schon okay.'], ['benKlar', 'Ben hat sich entschuldigt. Du hast gesagt, dass es nicht okay war.'], ['benGefragt1', 'Ben hast du gefragt, warum er so was weiterleitet.'], ['benGelesen', 'Bens Entschuldigung hast du auf „gelesen“ gelassen.']]),
    // Deine Spuren (nachts und Dienstag früh) in einer Zeile
    K(6, (() => { const w = { offen: 'An der Wand: noch niemand beschuldigt.', dario: 'An der Wand: auf Dario getippt.', lina: 'An der Wand: auf Lina getippt.', kenan: 'An der Wand: auf Kenan getippt.' }[m.verdacht1] || '';
      const d = m.dmBlockiert ? '@annexe.cam hat dir geschrieben – blockiert.' : m.dmScreenshot ? '@annexe.cam hat dir geschrieben – Screenshot gemacht.' : m.dmKlar ? '@annexe.cam hat dir geschrieben – „Lass mich in Ruhe.“' : '';
      const z = m.erzaehltTidderich ? 'Dienstag früh Mme Tidderich gezeigt.' : m.erzaehltKuedes ? 'Dienstag früh Herrn Kuedes gezeigt.' : m.erzaehltDario ? 'Dienstag Dario gezeigt. Er: „Der klaut meine Sätze.“' : m.erzaehltNiemand ? 'Niemandem gezeigt. Dienstag früh hat Herr Kuedes gesagt: „Das liegt nicht an dir.“' : '';
      const t = [w, d, z].filter(Boolean).join(' '); return t ? 'Nachts: ' + t : null; })()),
    eins(m, [['sportStoppIgnoriert', 'Im Sport hat Yusuf Stopp gesagt – und du hast weiter angesagt.'], ['sportGut', 'Im Sport hast du Yusuf ruhig durch den Parcours geführt.'], ['sportHektik', 'Im Sport hast du Yusuf zu schnell geführt.']]),
    eins(m, [['sportJoNeu', 'Als Noah im Sport fiel, hast du Jo leise an seine eigene Zeit als Neuer erinnert.'], ['sportJoStopp', 'Als Noah im Sport fiel, hast du vor allen gesagt: „Er hat Stopp gesagt.“'], ['sportNoahHand', 'Als Noah im Sport fiel, bist du zu ihm gegangen.'], ['sportGelacht', 'Als Noah im Sport fiel, hast du mitgelacht.']]),
  ],
  2: (m) => [
    eins(m, [['selbstZuhoeren', 'Dario hast du gesagt, was du kannst: zuhören.'], ['selbstMerken', 'Dario hast du gesagt, was du kannst: dir Sachen merken.'],
      ['selbstLachen', 'Dario hast du gesagt, was du kannst: Leute zum Lachen bringen.'], ['selbstOffen', 'Dario hast du gesagt: Was ich kann, weiß ich noch nicht.']]),
    eins(m, [['steckbriefTurm', 'In Noahs Steckbrief hast du geschrieben, was er nur dir erzählt hat. Noah: „Egal.“ Mme Nouvelle: „Egal ist kein Ja.“ Ben hatte es schon gelesen.'], ['steckbriefSelbst', 'Für Noahs Steckbrief hast du gesagt: „Schreib du.“ Die Liste hatte keinen Satz von dir.'], ['steckbriefGenau', 'Für Noahs Steckbrief hast du „misst alles genau“ gewählt. Noah hat genickt. Die Liste hat es trotzdem verdreht: „misst sogar sein essen“.'], ['steckbriefStill', 'Für Noahs Steckbrief hast du „still“ gewählt. Die Liste hat daraus „sagt nie was“ gemacht.']]),
    K(2, ((u) => (u && m.k2NachgehaktTurm ? u + ' Am Turm auch: „Kann man das noch ändern?“ Noah hat weitererzählt.' : u || (m.k2NachgehaktTurm ? 'Am Turm hast du nachgehakt: „Kann man das noch ändern?“ Noah hat weitererzählt.' : null)))(eins(m, [[(x) => x.k2ZweiterVersuch, 'Beim Interview hat Mme Nouvelle gesagt: „Frag nach.“ Beim zweiten Versuch hast du nachgefragt.'], [(x) => x.noahOffen1, 'Beim Interview hast du gleich nachgefragt: „Welche?“']]))),
    eins(m, [['pause2Chiara', 'In der Pause warst du bei Chiara und den Wahlzetteln.'], ['pause2Jo', 'In der Pause warst du bei Jo.'], ['pause2Ben', 'In der Pause warst du bei Ben auf der Bank.'], ['pause2Lina', 'In der Pause warst du bei Lina am Brunnen.']]),
    eins(m, [['linaVertraut', 'Lina hast du gesagt: „Ich schau nicht rein.“'], ['linaGedraengt', 'Lina wolltest du ins Heft schauen. Sie ist gegangen.']]),
    eins(m, [['chiaraSicher', 'Chiara hast du beim Verteilen geholfen. Ihre Stimme wurde langsamer.'], ['chiaraChill', 'Chiara hast du gesagt: Ist doch nur eine Wahl.']]),
    eins(m, [['heftZu', 'Jo hat in Linas Heft geblättert. Du hast es zugeklappt, ohne reinzuschauen, und Lina gebracht.'], ['heftReingeschaut', 'Jo hat in Linas Heft geblättert. Du hast es ihm abgenommen – und dann selbst reingeschaut.'], ['heftZurueck', 'Jo hat in Linas Heft geblättert. Du hast gesagt: „Gib her.“'], ['heftGeschaut', 'Jo hat in Linas Heft geblättert. Du wolltest auch reinschauen.'], ['heftBlieb', 'Jo hat in Linas Heft geblättert. Du bist geblieben, wo du warst.'],
      ['chiaraGeholfen', 'Als Jo Chiara nachgemacht hat, bist du zu ihr gegangen.'], ['chiaraAllein', 'Als Jo Chiara nachgemacht hat, bist du geblieben, wo du warst.']]),
    eins(m, [['benRaus', 'Ben hast du ohne Handy an den Korb geholt.'], ['benGespielt', 'Mit Ben hast du eine Runde gespielt. Danach wollte er noch eine.']]),
    eins(m, [['benSelbst', 'Auf der Bank hast du Ben gesagt: Yusuf wartet. Er hat ihm geantwortet.'], ['benFuerIhn', 'Am Bus hast du für Ben Yusuf geantwortet.'], ['benFrueher', 'Am Bus hast du Ben gefragt: Heut früher pennen?'], ['benAllein', 'Am Bus bist du eingestiegen. Ben blieb mit seinem Level sitzen.']]),
    (() => { const t = eins(m, [['atelierNoah', 'In der Werkstatt hast du Noah gefragt, was er gemessen hat.'], ['atelierPlan', 'In der Werkstatt hast du auf den Plan gezeigt.'], ['atelierSelbst', 'In der Werkstatt hast du selbst gemessen.'], ['atelierJo', 'In der Werkstatt hast du Jo messen lassen.']]); return t ? t + (m.bankWackelt ? ' Die Bank wackelt.' : m.bankGerade ? ' Die Bank steht gerade.' : '') : null; })(),
    K(3, ((u) => (u && m.k2SorrySpaet ? u + ' Auf der Treppe: „Sorry.“ Noah: „Spät. Aber okay.“' : u && m.k2Entschuldigt ? u + ' Danach: „Sorry.“ Noah: „Gut, dass du’s sagst.“' : u))(eins(m, [['listeTankNoah', 'Als die Liste kam, hast du vor allen gesagt: „Ohne Noah würde die Bank wackeln.“'], ['listeBeiNoah', 'Als die Liste kam, bist du zu Noah gegangen.'], ['listeGemeldet', 'Die Liste hast du Mme Tidderich gezeigt.'], ['listeGelacht', 'Als die Liste kam, bist du bei den Lachenden geblieben. Jo: „Du bist okay.“ Mila ist allein zu Mme Tidderich gegangen.'], ['listeWeggeschaut', 'Als die Liste kam, hast du weggeschaut.']]))),
    eins(m, [[(x) => x.noahRausGefragt && x.listeGelacht, 'Noah hat gesagt „ist mir egal“. Du hast ihn gefragt, ob er raus will. Er: „Du hast gelacht. … Nein.“'], ['noahRausGefragt', 'Noah hat gesagt „ist mir egal“. Du hast ihn gefragt, ob er raus will.'], ['noahNichtEgal', 'Noah hat gesagt „ist mir egal“. Du hast gesagt: Mir nicht.'], ['noahEgalGeglaubt', 'Noah hat gesagt „ist mir egal“. Du hast es so stehen lassen. Am Freitag: „War’s nicht.“']]),
    !m.listeGelacht && eins(m, [['k2SorrySpaet', 'Auf der Treppe hast du Noah gesagt: „Sorry. Ich hab mitgelacht.“ Er: „Spät. Aber okay.“'], ['k2Entschuldigt', 'Danach hast du Noah gesagt: „Sorry. Ich hab mitgelacht.“ Er: „Gut, dass du’s sagst.“']]),
    K(4, eins(m, [['gegenlisteGepostet', 'Bens Gegenliste hast du selbst gepostet. @annexe.cam hat sie geteilt. Noah: „Jetzt bin ich auf zwei Listen.“'], ['gegenlisteNoahGefragt', 'Ben hat dir die Gegenliste zum Posten gegeben. Du hast erst Noah gefragt. Er wollte nicht.'], ['gegenlisteGeloescht', 'Ben hat dir die Gegenliste zum Posten gegeben. Du hast sie gelöscht.'], ['gegenlisteBenPostet', 'Ben hat dir die Gegenliste zum Posten gegeben. Du hast gezögert. Er hat selbst gepostet.'], ['gegenlisteDabei', 'Bei Bens Gegenliste hast du mitgemacht.'], ['gegenlisteNein', 'Bens Gegenliste hast du gebremst.'], ['gegenlisteFragen', 'Du wolltest erst Noah fragen.'], [(x) => x.gegenlisteNoahSuchen && x.listeGelacht && x.k2Entschuldigt && !x.k2SorrySpaet, 'Du bist Noah suchen gegangen – nach dem Sorry. Er: „Bleib.“'], [(x) => x.gegenlisteNoahSuchen && x.k2SorrySpaet, 'Du bist Noah suchen gegangen – nach dem Lachen.'], [(x) => x.gegenlisteNoahSuchen && x.listeGelacht, 'Du bist Noah suchen gegangen – nach dem Lachen. Er: „Erst lachen. Dann suchen.“'], ['gegenlisteNoahSuchen', 'Du bist Noah suchen gegangen. Die Gegenliste kam trotzdem – aber du warst bei ihm.']])),
    eins(m, [['turmGeschuetzt', 'Im Jugendhaus wollte Ben Noahs Turm fotografieren. Du hast es verhindert.'], ['turmFoto', 'Im Jugendhaus hat Ben Noahs Turm fotografiert. Du hast gesagt: Ist doch nichts Schlimmes.']]),
    (() => { const a = eins(m, [['k2NoahImBild', 'Für Luca gefilmt: Noah lief hinten durchs Bild, du hast draufgehalten.'], ['k2NoahRausgeschwenkt', 'Für Luca gefilmt: Als Noah durchs Bild lief, hast du weggeschwenkt.']]);
      const b = eins(m, [['lucaWiderspruch', 'Über die Liste hast du ihm widersprochen.'], ['lucaMitgelacht', 'Über die Liste hast du mitgelacht.'], ['lucaStehenGelassen', 'Danach hast du ihm das Handy zurückgegeben, ohne was zu sagen.']]);
      return a || b ? [a, b].filter(Boolean).join(' ') : null; })(),
    K(1, (() => { if (m.staerkeOhne && m.k2DarioSahHalb) return 'Dario wollte einen Beweis für deine Stärke. Du hast keinen genannt. Dario hat einen Anfang gesehen.';
      if (m.staerkeOhne && m.k2DarioSahBeweis) return 'Dario wollte einen Beweis für deine Stärke. Du hast keinen genannt. Dario hat einen gesehen.';
      if (m.staerkeOhne) return 'Dario wollte einen Beweis für deine Stärke. Du hattest keinen. „Dann such einen.“';
      const b = m.beweisNoah ? (m.noahRausGefragt || m.gegenlisteNoahSuchen ? '„Noah. Treppe, Dienstag.“' : '„Noah. Dienstag, mit rein.“') : m.beweisBank ? '„Bank zwei. Zweiundvierzig.“' : m.beweisChiara ? '„Chiara. Der Stapel.“' : m.beweisRafa ? '„Rafa. Er hat gelacht.“' : m.beweisMut ? (m.turmGeschuetzt ? '„Der Turm. Kein Foto.“' : '„Luca. Ich hab widersprochen.“') : null; if (!b) return null;
      return 'Dario wollte einen Beweis für deine Stärke. Du: ' + b + ' – ' + (m.beweisHalb ? '„Zählt halb.“' : m.beweisAnders ? 'Er: „Das ist eine andere Stärke. Auch gut.“' : '„Glaub ich dir.“'); })()),
    eins(m, [['darioListeNein', 'An der Haltestelle hast du gesagt: „War nicht lustig.“ Im Bus stand genau das bei @annexe.cam. Dario und Lina haben es gehört.'], ['darioListeTaube', 'An der Haltestelle hast du gesagt: „Die Taube war gut.“ Im Bus stand genau das bei @annexe.cam. Dario und Lina haben es gehört.'],
      ['darioWarum', 'An der Haltestelle hast du Dario gefragt, warum er fragt. Im Bus stand dein Satz bei @annexe.cam.'], ['darioErtappt', 'Dario hast du gesagt: Du drehst dein Handy immer weg. Im Bus stand dein Satz bei @annexe.cam.']]),
    eins(m, [['k2DingeProbiert', 'Eine Woche später gefragt: Drei Dinge probiert? „Ja. Einmal.“'], ['k2DingeVergessen', 'Eine Woche später gefragt: Drei Dinge probiert? „Nicht dran gedacht.“'], ['k2DingeNichtGeklappt', 'Eine Woche später gefragt: Drei Dinge probiert? „Hat nicht geklappt.“']]),
    eins(m, [['k2DreiDingeTeil', 'Als dein Satz in der Story stand, hast du im Bus drei Dinge gesucht. ' + (m.k2DingeBus || 0) + ' von 3 – ein Anfang.'], [(x) => x.k2DreiDinge && x.k1Dinge === 0, 'Als dein Satz in der Story stand, hast du drei Dinge im Bus gesucht. Am ersten Tag war es zu laut. Diesmal ging es.'], ['k2DreiDinge', 'Als dein Satz in der Story stand, hast du drei Dinge im Bus gesucht – wie am ersten Tag.'], ['k2KuedesZeigen', 'Als dein Satz in der Story stand, hast du dir vorgenommen: Montag Herrn Kuedes zeigen.']]),
    eins(m, [['k2KenanGeloescht', 'Kenan hat gefragt, ob dein Foto von Montag weg soll. Du: „Ja. Lösch es.“ Er hat es gelöscht.'], ['k2KenanBehalten', 'Kenan hat gefragt, ob dein Foto von Montag weg soll. Du hast es ihm gelassen.']]),
    K(5, eins(m, [['k2StaerkeDario', 'Dario hat gefragt, was er kann. Du: „Du merkst dir alles.“' + (m.k2DarioMitBeweis ? ' Beweis: Er wusste deinen Satz vom Montag. Er: „Das hat noch keiner gesagt.“' : ' Einen Beweis hattest du nicht.')], ['k2StaerkeDarioFragen', 'Dario hat gefragt, was er kann. Du: „Du fragst immer nach.“' + (m.k2DarioMitBeweis ? ' Beweis: Er hat dich dreimal gefragt.' : ' Einen Beweis hattest du nicht.')], ['k2StaerkeDarioNicht', 'Dario hat gefragt, was er kann. Du hast mit den Schultern gezuckt.']])),
    K(6, eins(m, [['k2SagenKlasse', 'Dein Plan: jemandem aus der Klasse eine Stärke sagen. Mit Beweis.'], ['k2SagenTraining', 'Dein Plan: jemandem im Training eine Stärke sagen. Mit Beweis.'], ['k2SagenNachricht', 'Dein Plan: jemandem per Nachricht eine Stärke sagen. Mit Beweis.'], ['k2SagenOffen', 'Wem du eine Stärke sagen willst: weißt du noch nicht.']])),
    eins(m, [['k2NoahSorryBild', 'Am Freitag hast du Noah gesagt: „Sorry.“' + (m.turmFoto ? ' Wegen dem Foto.' : m.k2NoahImBild ? ' Wegen dem Video.' : ' Wegen der Gegenliste.') + ' Er: „Okay.“'], ['k2TurmSorry', 'Am Turm hast du Noah gesagt: „Sorry. Das war deins.“ (Der Turm-Satz im Steckbrief.)']]),
    m.k2BusNichts ? 'Als dein Satz in der Story stand, hast du nichts gesagt.' : null,
    eins(m, [['k2JoWeiter', 'Jo wollte die lange Geschichte hören. Du hast „Weiter.“ gesagt. Er: „Okay. Weiter.“']]),
    eins(m, [['k2NoahKuedes', 'Am Freitag ist Noah zu Herrn Kuedes gegangen.']]),
    eins(m, [[(x) => x.chiaraSicher || x.chiaraGefragt || x.chiaraGeholfen, 'Chiara wurde Klassensprecherin. Vierzehn Stimmen.'], [(x) => x.pause2Chiara || x.pause2Jo || x.pause2Ben || x.pause2Lina, 'Chiara wurde knapp Klassensprecherin.']]),
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
    K(1, eins(m, [['k3HalsFrueh', 'Als Yusuf dich anschrie und es heiß wurde, hast du sofort geatmet.'], [(x) => x.k3Team && x.rotGeatmet3, 'Als Yusuf dich anschrie, warst du schnell auf Rot. Dann hast du geatmet.'], [(x) => x.k3Team && (x.k3Uhr || x.k3Zurueck || x.k3Dazwischen || x.k3Sommer), 'Als Yusuf dich anschrie, warst du schnell auf Rot.']])),
    K(4, eins(m, [['k3Uhr', 'Im Gang hast du Yusuf gefragt: „Musst du weg?“'], ['k3Zurueck', 'Im Gang hast du zurückgeschrien.'], ['k3Dazwischen', 'Im Gang hast du dich dazwischengestellt.'], ['k3SommerGeholfen', 'Im Gang hast du Frau Sommer geholt und gesagt: „Er muss um vier weg.“ Sie hat ihn gehen lassen.'], [(x) => x.k3Sommer && (x.k3Eingestiegen || x.k3Geblieben), 'Im Gang hast du Frau Sommer geholt. Warum Yusuf so war, wusstest du nicht. Am Freitag Yusuf: „War nicht deine Schuld.“'], ['k3Sommer', 'Im Gang hast du Frau Sommer geholt. Warum Yusuf so war, wusstest du nicht.']])),
    K(2, (() => { const a = m.k3LeiterGenervt ? 'genervt' : m.k3LeiterSauer ? 'sauer' : m.k3LeiterWuetend ? 'wütend' : m.k3LeiterRasend ? 'rasend' : null; if (!a) return null;
      const d = m.k3DrunterAngst ? ' Drunter: Angst.' : m.k3DrunterScham ? ' Drunter: Scham.' : m.k3DrunterNichts ? ' Drunter: nichts, hast du gesagt.' : ' Was drunter war: weißt du nicht.'; const sg = m.k3SignalHals ? ' Zuerst merkst du es im Hals.' : m.k3SignalBauch ? ' Zuerst merkst du es im Bauch.' : m.k3SignalHaende ? ' Zuerst merkst du es an den Händen.' : m.k3SignalKopf ? ' Zuerst merkst du es im Kopf.' : m.k3SignalBrust ? ' Zuerst merkst du es in der Brust.' : m.k3SignalBeine ? ' Zuerst merkst du es in den Beinen.' : '';
      const gm = m.k3GemessenRot && (m.k3LeiterGenervt || m.k3LeiterSauer) ? ' Gemessen warst du auf Rot.' : '';
      return 'Später gefragt, wie sauer du warst: ' + a + '.' + gm + d + sg; })()),
    K(3, eins(m, [['k3AchtenSport', 'Dein Plan: im Sport auf dein Signal achten.'], ['k3AchtenPause', 'Dein Plan: in der Pause auf dein Signal achten.'], ['k3AchtenZocken', 'Dein Plan: beim Zocken auf dein Signal achten.'], ['k3AchtenOffen', 'Wann du auf dein Signal achtest: weißt du noch nicht.']])),
    eins(m, [['k3YusufGeschickt', m.k3Gewonnen ? 'Du hast Yusuf gehen lassen. Das Finale habt ihr zu viert gespielt – und verloren.' : 'Du hast Yusuf gehen lassen und Frau Sommer Bescheid gesagt.'],
      ['k3YusufGehalten', 'Du hast Yusuf gesagt: „Bleib bis Schluss.“' + (m.k3Gewonnen ? ' Ihr habt den Pokal geholt.' : '') + ' Sein Bruder hat zwölf Minuten allein gewartet.']]),
    eins(m, [['k3DarioGenannt', 'In der Kantine bist du Yusuf hinterher. Du hast ihm den Streifen gezeigt: Darios Hülle.'], ['k3KenanGenannt', 'In der Kantine bist du Yusuf hinterher. Du hast gesagt: „Bissig“ sagt Kenan.'],
      ['k3NichtGewusstK', 'In der Kantine bist du Yusuf hinterher. Du hast gesagt: „Weiß ich nicht.“'], ['k3ErstWeg', 'In der Kantine bist du Yusuf hinterher. Du hast gesagt: „Erst muss das weg.“']]),
    K(5, eins(m, [['k3BruderVerraten', 'In den Klassenchat hast du geschrieben: „Sein Bruder wartete allein!“ Yusuf hat dir geschrieben: „Das war meins.“'], ['k3ChiaraMit', 'Im Klassenchat: Erst hast du Chiara privat gefragt. Dann ihr beide: „Löscht das.“ Der Zähler blieb stehen.'], ['k3ChatStopp', 'In den Klassenchat hast du geschrieben: „Löscht das.“'],
      ['k3ChatGrund', 'In den Klassenchat hast du geschrieben: „Er hatte einen Grund.“ Welchen, hast du nicht verraten.'], ['k3ChatNichts', 'In den Klassenchat hast du nichts geschrieben.']])),
    eins(m, [[(x) => (x.k3Sommer && !x.k3SommerGeholfen) || x.k3Zurueck, 'Yusuf musste bis halb fünf bleiben. Sein Bruder (7) hat so lange allein vor der Grundschule gewartet.']]),
    eins(m, [['k3Eingestiegen', 'Am Freitag kam Yusuf zu dir. „Warte. Ich –“ Dann kam dein Bus. Du bist eingestiegen.'], ['k3Geblieben', 'Am Freitag kam Yusuf zu dir. „Warte. Ich –“ Dann kam dein Bus. Du bist geblieben.']]),
    eins(m, [['k3BusMechant', 'Im Bus hat Manon gefragt, was „bissig“ heißt. Du: „Méchant.“'], ['k3BusFache', 'Im Bus hat Manon gefragt, was „bissig“ heißt. Du: „Fâché. Très fâché.“'], ['k3BusPeur', 'Im Bus hat Manon gefragt, was „bissig“ heißt. Du: „Il avait peur.“ Mehr nicht.'], [(x) => x.k3Eingestiegen, 'Im Bus hat Manon gefragt, was „bissig“ heißt. Du hast ihr das Handy zurückgegeben.']]),
    K(6, eins(m, [[(x) => x.k3VerratEingesehen && x.k3Eingestiegen, 'Im Bus hast du Yusuf geschrieben: „Sorry. Das mit deinem Bruder war nicht meins.“ Er: „ok.“'], [(x) => x.k3VerratStill && x.k3Eingestiegen, 'Im Bus hast du an deinen Satz über Yusufs Bruder gedacht. Geschrieben hast du ihm nicht.'],
      ['k3VerratEingesehen', 'Am Freitag hat Yusuf gefragt: „Das im Chat. Warum?“ Du hast gesagt: „Das war nicht meins.“'],
      ['k3VerratHelfen', 'Am Freitag hat Yusuf gefragt: „Das im Chat. Warum?“ Du hast gesagt: „Wollte dir helfen.“ Er ist gegangen.'],
      ['k3VerratStill', 'Am Freitag hat Yusuf gefragt: „Das im Chat. Warum?“ Du hast nichts gesagt. Er ist gegangen.'],
      ['k3Uebersetzt', 'Am Freitag hat Yusuf sich entschuldigt. Du hast gesagt: „Du hattest Angst um ihn.“'],
      ['k3Heftig', 'Am Freitag hat Yusuf sich entschuldigt. Du: „War heftig. Echt.“'],
      ['k3NichtGewusst', 'Am Freitag hat Yusuf gesagt: „Halb fünf. Er hat geweint.“ Du: „Ich wusste das nicht.“'],
      ['k3Sorry', 'Am Freitag hat Yusuf gesagt: „Halb fünf. Er hat geweint.“ Du hast dich entschuldigt.'],
      ['k3UhrSpaet', 'Am Freitag hat Yusuf gesagt: „Halb fünf. Er hat geweint.“ Du hast nach der Uhr gefragt. Er: „Um vier. Mein Bruder.“'],
      ['k3Angefangen', 'Am Freitag hat Yusuf gesagt: „Halb fünf. Er hat geweint.“ Du: „Du hast angefangen.“'],
      ['k3Aufhoeren', 'Am Freitag hat Yusuf gesagt: „Halb fünf. Er hat geweint.“ Du: „Es sollte aufhören.“'],
      ['k3DazwischenFrage', 'Am Freitag hast du Yusuf gefragt, warum er so war. Er hat es dir gesagt.'],
      ['k3SchonOkay', 'Am Freitag hat Yusuf sich entschuldigt. Du hast gesagt: „Schon okay.“']])),
    eins(m, [['k3Mitgegangen', 'Danach bist du mit Yusuf zur Grundschule gegangen. Sein Bruder kam angerannt.']]),
    ];
  },
  4: (m) => {
    const p = m.k4Plan || {}, W = { atmen: '4 ein, 8 aus', kalt: 'Kälte', sauer: 'saurer Drops', rennen: 'rennen', dinge: 'drei Dinge suchen', zaehlen: 'rückwärts zählen', parken: 'Gedanken parken' };
    const ZU = { mila: 'Mila', kaya: 'Herrn Kuedes', lenning: 'Mme Lenning' };
    const planGenutzt = (p.rot === 'atmen' && (m.k4Geatmet || m.rotGeatmet4)) || (p.rot === 'kalt' && m.k4Brunnen) || (p.rot === 'zaehlen' && m.k4ZaehlenRot) || ((p.rot === 'dinge' || p.gelb === 'dinge') && m.k4DingeRot) || (p.rot === 'parken' && m.k4ParkenRot) || (p.zu && (m.k4ZuPerson === p.zu || (p.zu === 'lenning' && m.k4LenningGeholt)));
    const zone = (m.k4Hoch || 0) >= 7 ? 'Rot' : (m.k4Hoch || 0) >= 3 ? 'Gelb' : 'Grün';
    const gefuehlt = m.k4Gefuehlt30 ? 'zwei Finger' : m.k4Gefuehlt60 ? 'sechs Finger' : m.k4Gefuehlt80 ? 'zehn Finger' : m.k4GefuehltWeiss ? 'Schulterzucken' : '';
    return [
    eins(m, [['k3DarioGenannt', 'Dario hat an der Haltestelle gesagt: Yusuf stand Freitag vor ihm. Wegen dir.']]),
    eins(m, [['k4SignalGemerkt', 'Am Montag gefragt, ob du dein Signal diese Woche gemerkt hast: „Ja. Einmal.“'], ['k4SignalVergessen', 'Am Montag gefragt, ob du dein Signal diese Woche gemerkt hast: „Nicht dran gedacht.“']]),
    eins(m, [['k4DarioGefragt', 'Dario hat dir sein Handy für den Fahrplan gegeben. Oben stand „mittwoch. 8:34.“ Du hast ihn danach gefragt.'], ['k4DarioOkay', 'Dario hat dir sein Handy für den Fahrplan gegeben. Du hast gefragt: „Alles okay bei dir?“'], ['k4NichtGeschaut', 'Dario hat dir sein Handy für den Fahrplan gegeben. Du hast nur den Fahrplan gelesen.']]),
    K(1, p.rot ? 'Dein Ampelplan: Bei Rot – ' + (W[p.rot] || '?') + '. Bei Gelb – ' + (W[p.gelb] || '?') + '. Bei Rot gehe ich zu ' + (ZU[p.zu] || 'niemandem') + '.' : null),
    eins(m, [['chiaraFuesse', 'In der Pause hast du Chiara abgefragt und ihr gezeigt: Füße in den Boden.'], ['chiaraGestaerkt', 'In der Pause hast du Chiara abgefragt und ihr Mut gemacht.'], ['chiaraEasy', 'In der Pause wollte Chiara abgefragt werden. Du: „Ist doch easy. Lern halt.“'], ['chiaraSpaeter', 'In der Pause wollte Chiara abgefragt werden. Du: „Später, okay?“'],
      ['pause4Eis', 'In der Pause warst du mit Ben und Yusuf auf der Eisrutsche.'], ['pause4Mila', 'In der Pause warst du bei Mila am kalten Geländer.'], ['pause4Lina', 'In der Pause warst du mit Lina an der Tür von 1.04.']]),
    eins(m, [['spurZettel', 'Den gelben Zettel mit Loch am Türglas hast du fotografiert.'], ['k4ZettelWeg', 'Den gelben Zettel mit Loch am Türglas hast du abgerissen.'], ['k4ZettelLassen', 'Den gelben Zettel mit Loch hast du hängen lassen. Lina passt auf.']]),
    eins(m, [['k4PlanGeaendert', 'Mila hat dir gezeigt: Bei Rot legt sie die Hände aufs kalte Geländer. Du hast deinen Ampelplan geändert: Bei Rot – Kälte.'], ['k4MilaPlan', 'Mila hat dir gezeigt: Bei Rot legt sie die Hände aufs kalte Geländer.']]),
    K(3, m.k4TestRichtig != null ? 'Im Test: ' + m.k4TestRichtig + ' von 8. ' + ((m.k4TestMax || 0) >= 70 ? 'Du bist dabei auf Rot gekommen.' : 'Du bist dabei nicht auf Rot gekommen.') + (m.k4TestSkills ? ' Deinen Plan hast du ' + m.k4TestSkills + '-mal benutzt.' : (p.gelb === 'parken' || p.rot === 'parken') && m.k4Geparkt ? ' Deinen Plan hast du benutzt: Gedanken geparkt.' : planGenutzt ? ' Im Test lag dein Zettel unten. Beim Foto hast du ihn benutzt.' : ' Deinen Plan hast du nicht benutzt.') + (m.k4Notbremse ? ' Du hast die Notbremse gezogen.' : '') + (m.k4Geparkt ? ' Du hast ' + m.k4Geparkt + ' Gedanken geparkt.' : '') + (m.k4Aufgeschaut ? ' Fürs Aufschauen hast du ' + m.k4Aufgeschaut + ' Sekunden Testzeit gegeben.' : '') : null),
    eins(m, [['k4NoahGeblieben', 'Um 8:29 wollte Noah aufs Klo. Du hast „Bleib.“ geflüstert. Er ist geblieben. Dafür hat Mme Lenning dich ermahnt.'], ['k4Ermahnt', 'Mme Lenning hat dich im Test ermahnt: „Augen aufs Blatt.“']]),
    K(2, m.k4SignalFrueh || m.k4Signal2Frueh || m.k4SignalZone ? 'Dein Signal' + (m.k4SignalZone ? ' (' + m.k4SignalZone + ')' : '') + ': beim Foto am Mittwoch ' + (m.k4SignalFrueh ? 'früh gemerkt' : 'zu spät gemerkt') + ', am Freitag vor der Klasse ' + (m.k4Signal2Frueh ? 'früh gemerkt.' : 'spät gemerkt – aber gemerkt.') : null),
    K(5, m.k4Hoch ? 'Beim Foto von 8:34 warst du gemessen auf ' + zone + '.' + (gefuehlt ? ' Mila hat dir später ihre Finger gezeigt (sieben). Du: ' + gefuehlt + '.' + ((m.k4Gefuehlt30 && (m.k4Hoch || 0) >= 3) || (m.k4Gefuehlt60 && (m.k4Hoch || 0) >= 7) ? ' Gemessen warst du höher.' + (m.k3GemessenRot && (m.k3LeiterGenervt || m.k3LeiterSauer) ? ' Wie in Kapitel 3: gefühlt niedriger als gemessen.' : '') : '') : '') : null),
    K(4, eins(m, [['k4Explodiert', 'Du bist explodiert. Jemand hat gefilmt.'], ['k4FotoGezeigt', 'Du hast gesagt: Der Blitz kam von der Tür. Das Foto ist von draußen.'], ['k4LenningGeholt', 'Du bist zu Mme Lenning gegangen.'],
      [(x) => x.k4ZuPerson === 'mila', 'Du bist zu Mila gegangen.'], [(x) => x.k4ZuPerson === 'kaya', 'Du bist zu Herrn Kuedes gegangen.'], ['k4Brunnen', 'Du bist zum Brunnen gegangen. Kaltes Wasser.'], ['k4DingeRot', 'Du hast drei Dinge gesucht – wie am ersten Tag. Du bist geblieben.'], ['k4Ruhig', 'Du bist stehen geblieben und hast geatmet.'],
      [(x) => x.k4KopfGelb && x.k4Ruhig, 'Auf Gelb hast du dein Kopf-Werkzeug benutzt. Es hat gewirkt.'], [(x) => x.k4Geatmet || x.rotGeatmet4, 'Du hast geatmet. Dann ging es weiter.'], ['k4ZaehlenRot', 'Du hast rückwärts gezählt. Auf Rot kam es nicht an.'], ['k4ParkenRot', 'Du wolltest Gedanken parken. Auf Rot kam es nicht an.']])),
    eins(m, [['k4MilaDrauf', 'Danach hat Mila gefragt, ob du was tauschen willst. Jetzt steht sie auf deinem Zettel.'], ['k4PlanGetauscht', 'Danach hat Mila gefragt, ob du was tauschen willst. Du hast deine Rot-Zeile getauscht.'], ['k4PlanGelassen', 'Danach hat Mila gefragt, ob du was tauschen willst. Du hast den Zettel gelassen.']]),
    eins(m, [[(x) => x.k4Mitgegangen && x.k4Plan && x.k4Plan.zu, 'Die Person von deinem Plan hat den Kreis gesehen und ist gekommen. Du bist mitgegangen.'], [(x) => x.k4Geblieben4, 'Die Person von deinem Plan ist gekommen. Du bist geblieben – sie auch.'], ['k4Niemand', 'Beim Foto ist niemand gekommen. Auf deinem Plan stand niemand.']]),
    eins(m, [[(x) => x.k4JoMontag && x.k4JoBeschuldigt, 'Zu Jo hast du gesagt: „Montag hast du’s gesagt.“ Am Freitag: „Klar war’s Jo.“ Ben: Jo saß um 8:34 im Saal.'], [(x) => x.k4JoMontag && x.k4JoNichtBeschuldigt, 'Zu Jo hast du gesagt: „Montag hast du’s gesagt.“ Am Freitag hat Ben gefragt, ob es Jo war. Du: „Weiß ich nicht.“'], ['k4JoMontag', 'Zu Jo hast du gesagt: „Montag hast du’s gesagt.“ Ein paar haben dann Jo angeschaut.'], ['k4Wut', 'Zu Jo hast du gesagt: „Du gibst doch selbst leer ab.“'], ['k4WutSpaet', 'Du hast mit Worten zurückgeschlagen.']]),
    p.rot && (m.k4Hoch || 0) >= 7 && !planGenutzt && !m.k4FotoGezeigt && !(m.k4Geatmet || m.rotGeatmet4) ? 'Beim Foto warst du auf Rot. Dein Ampelplan stand zur Wahl. Du hast ihn nicht genommen.' : p.rot && (m.k4Hoch || 0) >= 7 && !planGenutzt && (m.k4Geatmet || m.rotGeatmet4) ? 'Beim Foto warst du auf Rot. Du hast geatmet – nicht die Zeile vom Zettel, aber es hat geholfen.' : null,
    eins(m, [['k4NoahVerteidigt', 'Als der Verdacht auf Noah fiel, hast du gesagt: Er saß um 8:34 neben dir.'], ['k4NoahHalb', 'Als der Verdacht auf Noah fiel, hast du gesagt: „Hör auf, Jo.“'], ['k4NoahVerdacht', 'Als der Verdacht auf Noah fiel, hast du nichts gesagt.']]),
    eins(m, [[(x) => x.k4LenningGeholt || x.k4ZuPerson === 'kaya', 'Am Freitag hat Mme Lenning gesagt: „Du hast nicht gespickt.“'], ['k4FotoGezeigt', 'Am Freitag hat Mme Lenning gesagt: „Gut, dass du es gesagt hast.“'],
      ['k4LenningGesagt', 'Am Freitag hat Mme Lenning gefragt, ob du was sagen willst. Du: „Ich hab nicht gespickt.“'], ['k4LenningStill', 'Am Freitag hat Mme Lenning gefragt, ob du was sagen willst. Du hast den Kopf geschüttelt. Sie: „Nicht du.“']]),
    eins(m, [['k4JoDrunterAngst', 'Unter Jos Lachen hast du Angst vermutet. Darunter war: ein leeres Blatt.'], ['k4JoDrunterScham', 'Unter Jos Lachen hast du Scham vermutet. Darunter war: ein leeres Blatt.'],
      ['k4JoDrunterNichts', 'Unter Jos Lachen hast du nichts vermutet. Darunter war: ein leeres Blatt.'], ['k4JoDrunterWeiss', 'Was unter Jos Lachen war, wusstest du nicht. Darunter war: ein leeres Blatt.']]),
    K(6, eins(m, [['k4NaechstMaeppchen', 'Beim nächsten echten Test liegt dein Zettel: im Mäppchen.'], ['k4NaechstTisch', 'Beim nächsten echten Test liegt dein Zettel: oben auf dem Tisch.'], ['k4NaechstKopf', 'Beim nächsten echten Test hast du den Plan im Kopf.'], ['k4NaechstOffen', 'Wo dein Zettel beim nächsten Test liegt: weißt du noch nicht.']])),
    eins(m, [['k4SpaeterAbgefragt', 'Chiara hatte drei von acht. Du hast sie gleich abgefragt.'], ['k4SpaeterVersprochen', 'Chiara hatte drei von acht. Du hast versprochen: nach den Ferien.'], ['k4SpaeterSorry', 'Chiara hatte drei von acht. Du hast dich entschuldigt.']]),
    eins(m, [['k4JoBlattZurueck', 'Ben hat Jos Testblatt hochgehalten. Du hast gesagt: „Gib’s ihm zurück.“'], ['k4JoBlattGelacht', 'Ben hat Jos Testblatt hochgehalten. Du: „Eins? Echt?“'], ['k4JoBlattWeg', 'Ben hat Jos Testblatt hochgehalten. Du bist bei Mme Lenning geblieben.']]),
    eins(m, [['k4JoGerufen', 'In der Schneeballschlacht stand Jo ohne Wall. Du hast ihn reingeholt.'], ['k4JoAllein', 'In der Schneeballschlacht stand Jo ohne Wall. Keiner hat ihn gerufen.'], ['k4JoBlattGelacht', 'In der Schneeballschlacht hat Jo für die 7P1 geworfen. Auf dich.']]),
    eins(m, [['k4DarioZettel', 'An der Haltestelle kam Linas Nachricht: Der Zettel hängt noch. Du hast Dario gefragt. Er wusste, dass er gelb ist.'], ['k4DarioGezeigt', 'An der Haltestelle kam Linas Nachricht: Der Zettel hängt noch. Du hast sie Dario gezeigt.'], ['k4HandyWeg', 'An der Haltestelle kam Linas Nachricht: Der Zettel hängt noch. Du hast das Handy vor Dario weggedreht.']]),
    (() => { const t = eins(m, [['k4DarioWoher', 'Du: „Du wusstest es schon Montag.“'], ['k4DarioDa', 'Du bist einfach neben ihm stehen geblieben.'], ['k4DarioFrage', 'Du hast gefragt, was „zu viel“ heißt.']]); return t ? 'Dario am Freitag: „Das mit 8:34 … das war zu viel.“ ' + t : null; })(),
    ];
  },
  5: (m) => {
    // Kapitel 5 „Admin“ (Heft #04): Kamera-Check – erst was echt ist, dann der Kopf. Kern: freiwillig geprüft? Hilfe geholt? Was im Fenster klar wurde.
    const frei = [m.k5Geprueft ? 'Chat' : null, m.k5EisGeprueft ? 'Eisbahn' : null, m.k5FreitagGeprueft ? 'Freitag (ohne Hilfe)' : null].filter(Boolean);
    const tat = eins(m, [['k5ChatKuedes', 'Screenshot an Herrn Kuedes. Er kam, bevor jemand rausflog.'], ['k5ChatChiara', 'Chiara privat: „Stopp das.“ Sie hat die Umfrage beendet.'],
      ['k5ChatZuZweit', 'Mit Ayla: „Nein.“ Die Umfrage war vorbei.'], ['k5ChatGepostet', 'Das Foto gepostet: „Es ist von draußen.“ Die Umfrage kippte. Dann: „Wer war draußen?“'],
      ['k5ChatVerteidigt', 'Geschrieben: „' + (m.k5ZielDu ? 'Ich' : 'Noah') + ' war’s nicht.“ Danach kamen drei Ja-Stimmen dazu.'], ['k5ChatNein', '„Nein“ gedrückt – mit deinem Namen.'], ['k5ChatGeglaubt', 'Noah privat: „Ich glaub dir.“'],
      ['k5ChatVerlassen', 'Den Chat verlassen.'], ['k5ChatStumm', 'Stumm geschaltet, Handy weg.'], ['k5ChatAbgewartet', 'Abgewartet.']]);
    const lou = eins(m, [['k5LouGefragt', 'Lou privat: „Woher weißt du das?“ – im Chat schrieb Lou dann „hab’s nur gehört“.'], ['k5LouKlar', 'Lou privat: „Klar.“ – im Chat stand dann dein Name: „… sagt das auch 😎“.'],
      ['k5LouKeineAhnung', 'Lou privat: „Keine Ahnung.“'], ['k5LouNein', 'Lou privat: „Nein. War ich nicht.“'], ['k5LouStill', 'Lou privat: nicht geantwortet.']]);
    return [
      K(1, m.k5CheckTuer ? 'Vor der Tür: „Alle denken, ich bin’s.“ Kamera-Check: 2 haben wirklich geschaut' + (m.k5TuerZahl != null && m.k5TuerZahl < 2 ? ' (selbst gefunden: ' + m.k5TuerZahl + ').' : '.') + (m.k5TuerMal ? ' Zweiter Gedanke: „Die können mich mal.“' : m.k5TuerUmfrage ? ' Zweiter Gedanke: „Nur ’ne blöde Umfrage.“' : '') : null),
      K(2, eins(m, [['k5DarioKuedes', 'Dario hatte „zu viel“ gesagt und war weg. Du hast es Herrn Kuedes gesagt.'], ['k5DarioGeschrieben', 'Du hast Dario geschrieben. Herr Kuedes hat trotzdem nachgefragt.'], ['k5DarioNichts', 'Darios Platz war leer. Herr Kuedes hat selbst nachgefragt.']])),
      K(3, (m.k5PostLou ? 'Stille Post: erkannt, wo zuerst etwas dazukam (bei Lou). ' : m.k5PostSpaet ? 'Stille Post: zu spät erkannt, wo etwas dazukam. ' : '') + (lou || '') || null),
      K(4, tat ? 'Bei der Abstimmung: ' + (m.k5Geprueft ? 'erst geprüft (' + (m.k5PruefZahlen ? m.k5PruefZahlen.ja + ' Ja, ' + m.k5PruefZahlen.gs + ' gesehen' : 'ein paar Ja, viele nur gesehen') + (m.k5Ayla ? ', Ayla war nicht dafür' : '') + '). ' : 'nicht geprüft. ') + tat : null),
      K(5, eins(m, [['k5NoahLasst', 'Als sie Noah „Admin!“ nachriefen, hast du gesagt: „Lasst ihn.“ Im Chat hieß es dann: „admin-freund 👀“.'], ['k5NoahDaneben', 'Als sie Noah „Admin!“ nachriefen, hast du dich neben ihn gestellt.'], ['k5AdminWeg', 'Als sie Noah „Admin!“ nachriefen, bist du weitergegangen.']])
        || (m.k5Rausgeflogen === 'du' ? 'Du bist aus dem Chat geflogen. Mme Tidderich hat mit dir geredet. Ayla hat dich zurückgeholt.' : m.k5Rausgeflogen === 'noah' ? 'Noah ist aus dem Chat geflogen.' + (m.k5NoahGeholt ? ' Auf der Eisbahn hast du ihn vom Rand geholt.' : '') : null)),
      K(6, m.k5FensterGesehen != null ? 'Im Busfenster wurde klar, was du selbst gesehen hast: ' + m.k5FensterGesehen + ' von 4. Der Rest blieb beschlagen.' + (m.k5FreitagGeprueft ? ' Am Ende: „Jo lästert über mich.“ – selbst geprüft: „Noch nicht gehört.“' : '') : null),
      eins(m, [['k5BenGefragt', m.k5ZielDu ? 'Ben hat privat gefragt, ob du der Admin bist. Du hast geantwortet. Er hat nicht Ja gedrückt.' : 'Ben hat privat gefragt, ob Noah es war. Du: „Weiß ich nicht.“ Er hat nicht Ja gedrückt.'], ['k5BenGeruecht', 'Ben hat privat gefragt, ob Noah es war. Du: „Bestimmt.“ Er hat Ja gedrückt.'], ['k5BenGemieden', 'Ben hat dir privat geschrieben. Du hast nicht geantwortet.']]),
      frei.length ? '📷 Von selbst geprüft: ' + frei.join(' · ') + '.' : '📷 Von selbst geprüft: nichts (nur die geführten Checks).',
      m.k5Rausgeflogen === 'noah' && (m.k5NoahLasst || m.k5NoahDaneben || m.k5AdminWeg) ? 'Noah ist aus dem Chat geflogen.' + (m.k5NoahGeholt ? ' Auf der Eisbahn hast du ihn vom Rand geholt.' : '') : m.k5NoahGeholt && !m.k5Rausgeflogen ? 'Auf der Eisbahn hast du Noah vom Rand geholt.' : null,
      eins(m, [['k5MilaSorry', 'Milas Handy lag wegen dir bei Mme Rantini. Du: „Sorry. Meine Schuld.“'], ['k5MilaLohnt', 'Milas Handy lag wegen dir bei Mme Rantini. Du: „Hat sich gelohnt.“']]),
      eins(m, [['k5Losgelassen', 'Auf der Eisbahn hast du losgelassen.'], ['k5Bande', 'Auf der Eisbahn bist du an der Bande gefahren.']]),
      eins(m, [['k5DarioAdminFrage', 'Dario am Freitag: „Weißt du, wer der Admin ist?“ – „Nein.“ Zu schnell.'], ['k5DarioBesser', 'Dario am Freitag: „Geht’s dir besser?“ – „Bisschen.“'], ['k5DarioStehen', 'Am Freitag hast du einfach neben Dario gestanden.']]),
      eins(m, [['k5FensterDario', 'Das Fenster-Foto ging an Dario. Er: „meiner wär: zu viel.“'], ['k5FensterNoah', 'Das Fenster-Foto ging an Noah. Er: „meiner: alle starren.“']]),
      eins(m, [['k5ChiaraVersprechen', 'Chiara hat dich an dein Versprechen erinnert. Du hast es gleich eingelöst.'], ['k5ChiaraMorgen', 'Chiara hat dich an dein Versprechen erinnert. Du: „Morgen.“'], ['k5ChiaraHof', 'Chiara hast du gefragt, was sie tippt. „Ich will nicht die Nächste sein.“']]),
      eins(m, [['k5JoSorry', 'Bei Jo hast du dich wegen dem Testblatt entschuldigt.'], ['k5Schneemann', 'Mit Jo hast du den Schneemann gebaut. In der Umfrage hat er nicht Ja gedrückt.']]),
      eins(m, [['k5ManonEis', 'Manon war mit auf der Eisbahn. Du hast ihr die Bande gezeigt.'], ['k5ManonEingeladen', 'Manon hast du zur Eisbahn eingeladen.'], ['k5ManonErklaert', 'Manon hast du erklärt, was „Admin“ heißt.']]),
      eins(m, [['k5YusufSorry', 'Yusuf hast du gesagt: „Das mit deinem Bruder: sorry.“ – „Hat gedauert. Aber okay.“']]),
      eins(m, [['k5KenanGejagt', 'Nach deinem Post hieß es: „Kenan war draußen.“ Jo hat ein Foto von Kenan geteilt.'], ['k5KenanGeschuetzt', 'Nach deinem Post hieß es: „Wer war draußen?“ Du hast es schnell Herrn Kuedes gegeben.']]),
    ];
  },
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

const teile = (kap, m) => {
  const roh = ((KAP[kap] || (() => []))(m) || []).filter((t) => typeof t === 'string' && t);
  const kern = {}, rest = [];
  for (const t of roh) {
    if (t[0] === KERN) { const n = t[1], satz = t.slice(2); if (!kern[n]) kern[n] = satz; else rest.push(satz); } else rest.push(t);
  }
  return { kern: Object.keys(kern).sort().map((n) => kern[n]).slice(0, 6), rest };
};
// Alle Sätze, Kernzeilen zuerst (so steht es auch im Spielstand und im Text zum Teilen)
export const chronik = (kap, m = {}) => { const { kern, rest } = teile(kap, m); return [...kern, ...rest]; };
// Nur die höchstens sechs Kernzeilen (Kapitel ohne Markierung: leer – dann zeigt die Ansicht alles)
export const chronikKern = (kap, m = {}) => teile(kap, m).kern;

// Kopfzeile für die Lehrperson: die Skill-Momente eines Kapitels auf einen Blick (Zahlen statt Sätze)
const SIG = (m) => (m.k3SignalHals ? 'Hals' : m.k3SignalBauch ? 'Bauch' : m.k3SignalHaende ? 'Hände' : m.k3SignalKopf ? 'Kopf' : m.k3SignalBrust ? 'Brust' : m.k3SignalBeine ? 'Beine' : m.k3SignalWeiss ? 'weiß nicht' : '');
export const SKILLKURZ = {
  1: (m) => [
    m.k1Dinge != null ? '🖐 Drei Dinge: ' + m.k1Dinge + '/3' + (m.k1DingeRuhig != null ? ' · Dienstag ' + m.k1DingeRuhig + '/3' : '') : null,
    m.k1Stopp ? '✋ „Stopp.“ gesagt' : null,
    m.joWeiter ? '⏭ „Weiter.“ gesagt' : null,
    m.k1DingeBus ? '📝 Plan: im Bus' : m.k1DingePause ? '📝 Plan: in der Pause' : m.k1DingeBett ? '📝 Plan: abends' : m.k1DingeOffen ? '📝 Plan: offen' : null,
    m.erzaehltTidderich || m.erzaehltKuedes ? '🙋 Nachricht gezeigt' : m.erzaehltNiemand ? '🙋 Nachricht niemandem gezeigt' : null,
  ],
  2: (m) => [
    (() => { const n = (m.noahOffen1 ? 1 : 0) + (m.k2NachgehaktTurm ? 1 : 0); return n ? '💬 Nachgehakt: ' + n + '×' : null; })(),
    m.staerkeOhne ? '💪 Beweis Freitag: keiner' : m.beweisHalb ? '💪 Beweis Freitag: halb' : (m.beweisNoah || m.beweisBank || m.beweisChiara || m.beweisRafa || m.beweisMut) ? '💪 Beweis Freitag: ja' : null,
    m.k2StaerkeDario || m.k2StaerkeDarioFragen ? '🎁 Dario eine Stärke gesagt' + (m.k2DarioMitBeweis ? ' (mit Beweis)' : '') : null,
    m.k2DingeProbiert ? '🖐 Woche: probiert' : m.k2DingeVergessen ? '🖐 Woche: vergessen' : m.k2DingeNichtGeklappt ? '🖐 Woche: klappte nicht' : null,
    m.k2DingeBus != null ? '🖐 Bus: ' + m.k2DingeBus + '/3' : m.k2KuedesZeigen ? '🙋 Bus: will es zeigen' : null,
    m.k2SagenKlasse || m.k2SagenTraining || m.k2SagenNachricht ? '📝 Plan: Stärke sagen' : m.k2SagenOffen ? '📝 Plan: offen' : null,
  ],
  3: (m) => [
    SIG(m) ? '🔥 Signal: ' + SIG(m) : null,
    m.k3HalsFrueh ? '🫁 früh geatmet' : null,
    (() => { const a = m.k3LeiterGenervt ? 'genervt' : m.k3LeiterSauer ? 'sauer' : m.k3LeiterWuetend ? 'wütend' : m.k3LeiterRasend ? 'rasend' : ''; return a ? '🪜 gefühlt: ' + a + (m.k3GemessenRot ? ' · gemessen Rot' : '') : null; })(),
    m.k3DrunterAngst ? '🔎 drunter: Angst' : m.k3DrunterScham ? '🔎 drunter: Scham' : m.k3DrunterNichts ? '🔎 drunter: nichts' : m.k3DrunterWeiss ? '🔎 drunter: weiß nicht' : null,
    m.k3AchtenSport ? '📝 achten: im Sport' : m.k3AchtenPause ? '📝 achten: in der Pause' : m.k3AchtenZocken ? '📝 achten: beim Zocken' : m.k3AchtenOffen ? '📝 achten: offen' : null,
  ],
  4: (m) => [
    m.k4Plan && m.k4Plan.rot ? '🚦 Plan fertig' + (m.k4Plan.zu ? '' : ' · Zeile 3 leer') + (m.k4PlanKopfRot ? ' · Rot-Zeile: Kopf' : '') : null,
    m.k4TestRichtig != null ? '🧪 Test ' + m.k4TestRichtig + '/8 · Plan ' + (m.k4TestSkills || 0) + '× benutzt' : null,
    m.k4SignalFrueh || m.k4Signal2Frueh ? '🟡 früh gemerkt: ' + [m.k4SignalFrueh ? 'Mittwoch' : '', m.k4Signal2Frueh ? 'Freitag' : ''].filter(Boolean).join(' + ') : null,
    m.k4Gefuehlt30 ? '✋ gefühlt: 2' : m.k4Gefuehlt60 ? '✋ gefühlt: 6' : m.k4Gefuehlt80 ? '✋ gefühlt: 10' : null,
    m.k4NaechstMaeppchen || m.k4NaechstTisch || m.k4NaechstKopf ? '📝 nächster Test: Zettel bereit' : m.k4NaechstOffen ? '📝 nächster Test: offen' : null,
  ],
  5: (m) => [
    '📷 von selbst: ' + ([m.k5Geprueft ? 'Chat' : null, m.k5EisGeprueft ? 'Eis' : null, m.k5FreitagGeprueft ? 'Freitag' : null].filter(Boolean).join(' · ') || '–'),
    m.k5LouGefragt ? '🗣 nachgefragt (Lou)' : m.k5LouKlar ? '🗣 Gerücht bestätigt (Lou)' : null,
    m.k5ChatKuedes || m.k5DarioKuedes ? '🙋 Hilfe geholt: ' + [m.k5DarioKuedes ? 'Dario' : null, m.k5ChatKuedes ? 'Chat' : null].filter(Boolean).join(' + ') : '🙋 keine Hilfe geholt',
    m.k5Rausgeflogen === 'du' ? '⚠ Die Umfrage ging über das Kind selbst. Kurz unter vier Augen nachfragen.' : m.k5ZielDu ? '⚠ Die Umfrage ging über das Kind selbst. Kurz unter vier Augen nachfragen.' : null,
  ],
};

// Zusatzfrage je nach Weg (wird an die Gesprächsfrage gehängt)
export const GESPRAECH_ZUSATZ = {
  1: (m) => (m.erzaehltNiemand ? '(Lieber einzeln:) Wem würdest du so eine Nachricht zeigen?' : m.fotoMitgelacht ? '(Lieber einzeln:) Jo schrieb: „Sogar du hast gelacht. Also ist es ok.“ Stimmt das?'
    : m.abgestimmt ? 'Mila sagt: „Cool oder cringe – beides ist mitmachen.“ Warum zählt auch „cool“?' : m.k1KenanNichts || m.k1KenanKomisch ? 'Kenan hat nicht gefragt, ob er dich fotografieren darf. Welcher kurze Satz geht da?' : ''),
  3: (m) => (m.k3LeiterRasend || m.k3Zurueck ? '(Lieber einzeln:) Was bremst dich, bevor es knallt?' : m.k3BruderVerraten || m.k3Uebersetzt || m.k3BusPeur || m.k3SommerGeholfen ? 'Du wusstest vom Bruder. Wer durfte das wissen – und wann?' : m.k3SignalWeiss ? 'Wo merkst du Wut zuerst? (Nur für dich: Hals, Bauch, Hände …?)' : ''),
  5: (m) => (m.k5ZielDu || m.k5Rausgeflogen === 'du' ? '(Lieber einzeln:) Die Umfrage im Spiel ging über dich. Wie war das?' : m.k5ChatAbgewartet || m.k5ChatStumm ? 'Was hätte gefehlt, damit du etwas tust?' : m.k5ChatGepostet ? 'Du hattest den Beweis. Wohin gehört er – Chat oder Erwachsene?'
    : m.k5ChatVerteidigt || m.k5ChatNein ? 'Allein geschrieben – danach kamen drei Ja. Was hätte zu zweit geändert?' : m.k5LouKlar ? 'Ein Wort („Klar.“) – und du standest im Chat. Wie schnell geht das?' : ''),
  4: (m) => (m.k4Explodiert ? '(Lieber einzeln:) Was bremst dich nächstes Mal früher?' : m.k4Niemand || (m.k4Plan && !m.k4Plan.zu) ? '(Lieber einzeln:) Wer aus der Schule kommt auf Zeile drei?' : m.k4ZaehlenRot || m.k4ParkenRot ? 'Was geht bei dir, wenn der Kopf zu ist?' : ''),
  2: (m) => (m.k2BusNichts ? '(Lieber einzeln:) Dein Satz stand in der Story. Wem würdest du das zeigen?' : m.k2DarioSahBeweis ? '(Lieber einzeln:) Dario hat bei dir einen Beweis gesehen. Stimmt er?' : m.listeGelacht ? 'Was hat dir das Mitlachen gegeben – und was eine Stunde später?' : m.gegenlisteGepostet ? 'Noah: „Jetzt bin ich auf zwei Listen.“ War die nette Liste nett?' : ''),
};

// Fragen für das Gespräch mit der Lehrperson oder in der Klasse (offen, kein richtig/falsch). Erst die Entscheidungen ansehen, dann fragen.
export const GESPRAECH = {
  1: '13:31. Alle lachen über das Foto von „hinten links“. Was hilft hinten links? 1 drei Dinge · 2 „Stopp.“ · 3 Handy weg · 4 mitlachen. Was können die anderen tun? 5 daneben bleiben · 6 Hilfe holen. Auf drei zeigen alle Finger. Hilft 4 – auch noch eine Stunde später? Still auf einen Zettel: Wenn es mir zu laut wird, dann ___. Wo: ___.',
  2: 'Dario fragt: „Und ich? Was kann ich?“ Was hättest du gesagt – und woran sieht man es? Dann zu zweit: A sagt eine Sache, die A kann. B hakt einmal nach („Welche?“ · „Wie war das?“). Tauschen. „Weiter.“ gilt. Still: Wem sag ich diese Woche eine Stärke? Woran hab ich sie gesehen?',
  3: 'Yusuf schreit: „Was glotzt ihr alle so?!“ Was war drunter – und woran hätte man es sehen können? Auf drei zeigt jede Person, wo sie Wut zuerst merkt (Faust = sag ich nicht). Still auf einen Zettel: Mein lauter Satz … – drunter war …',
  4: 'Auf drei zeigen alle gleichzeitig Finger: Wie hoch warst du beim Foto? (Mila: sieben.) Passt die Farbe im Rückblick dazu? Nur Daumen. Dann sammeln: Was hilft im Test, ohne dass es einer merkt? Still auf einen Zettel: Bei Rot hilft mir … – mein Zettel liegt …',
  5: 'Gerd hasst keinen. Gerd hat Hunger. – „Zeigen oder fühlen?“: Finger auf den Tisch = hätte eine Kamera gesehen · Hand aufs Herz = Gefühl oder Gerücht. Sätze: „Gesehen von 9.“ · „Alle wissen, wer’s war.“ · „Chiara hat eine Umfrage gestartet.“ (Kamera – und trotzdem nicht okay) · „Jemand lacht, als ich reinkomme.“ · „Noah hat das Foto gemacht.“ Dann Chiaras Satz: „Wenn ich nichts mache, bin ich die Nächste.“ – Stimmt das? Still auf einen Zettel: Wenn ich „alle“ denke, zähl ich nach – wo? Niemand liest vor. Wenn es echt fies ist: Screenshot, zu einer Lehrperson oder ins SePAS.',
  6: 'Warum kann man fair abstimmen und trotzdem unfair sein?',
  7: 'Was hat es gekostet, sich zu Noah zu setzen? Was hat es gekostet, sitzen zu bleiben?',
  8: 'Woran hast du den Fake erkannt? Was hat Teilen „zum Prüfen“ trotzdem gemacht?',
  9: 'Welches Geheimnis darf man brechen? Woran merkst du es?',
  10: 'Was war „dein Teil“? Was ist eine kleine, echte Wiedergutmachung?',
};
