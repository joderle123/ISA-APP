/* Inhalte: „Gefühls-Radar“ – eigene Situationen aus dem Alltag von 12- bis 16-Jährigen.
   Idee: ISA-Materialien zu Gefühlen (Friedenstreppe, „Alles eine Frage der Perspektive“)
   + Party-Mechanik „Wie stark?“ (Wavelength-Prinzip).
   Felder: id, kat, text (kurz, du-Form), gefuehle (typische Gefühle – nur als Anregung,
   es gibt KEINE richtige Antwort), heikel (nur mit Freigabe der Lehrkraft).
   Gefühle nur aus der Antwort-Karte: Wut, Angst, Trauer, Freude, Scham, Stolz, Ekel, Überraschung. */
(function () {
  const C = (window.CREW.content = window.CREW.content || {});
  C.radar = [
    // Schule
    { id: 'ra01', kat: 'schule', text: 'Du bekommst einen Test zurück. Die Note ist viel besser als gedacht.', gefuehle: ['Freude', 'Überraschung', 'Stolz'] },
    { id: 'ra02', kat: 'schule', text: 'Die Lehrkraft sagt: „Morgen schreiben wir einen Test.“ Du hast nichts gelernt.', gefuehle: ['Angst', 'Wut'] },
    { id: 'ra03', kat: 'schule', text: 'Du sollst gleich vor der ganzen Klasse etwas vorlesen.', gefuehle: ['Angst', 'Scham'] },
    { id: 'ra04', kat: 'schule', text: 'Jemand kopiert deine Idee. Und bekommt dafür das Lob.', gefuehle: ['Wut', 'Trauer'] },
    { id: 'ra05', kat: 'schule', text: 'Du stolperst im Flur. Ein paar Leute lachen.', gefuehle: ['Scham', 'Wut'] },
    { id: 'ra06', kat: 'schule', text: 'Die letzte Stunde fällt aus. Ihr dürft früher nach Hause.', gefuehle: ['Freude', 'Überraschung'] },
    { id: 'ra07', kat: 'schule', text: 'Du fasst unter den Tisch. Da klebt ein alter Kaugummi.', gefuehle: ['Ekel', 'Überraschung'] },
    { id: 'ra08', kat: 'schule', text: 'Die Lehrkraft lobt deine Arbeit vor allen.', gefuehle: ['Stolz', 'Freude', 'Scham'] },
    { id: 'ra09', kat: 'schule', text: 'Bei der Gruppenarbeit macht nur eine Person alles. Und das bist du.', gefuehle: ['Wut', 'Stolz'] },

    // Freundschaft
    { id: 'ra10', kat: 'freunde', text: 'Dein bester Kumpel oder deine beste Freundin antwortet seit zwei Tagen nicht.', gefuehle: ['Angst', 'Trauer', 'Wut'] },
    { id: 'ra11', kat: 'freunde', text: 'Deine Freunde treffen sich ohne dich. Du siehst es später in der Story.', gefuehle: ['Trauer', 'Wut'] },
    { id: 'ra12', kat: 'freunde', text: 'Jemand erzählt dein Geheimnis weiter.', gefuehle: ['Wut', 'Scham', 'Trauer'] },
    { id: 'ra13', kat: 'freunde', text: 'Andere lästern über dich. Eine Person aus der Klasse hält zu dir.', gefuehle: ['Freude', 'Überraschung', 'Wut'] },
    { id: 'ra14', kat: 'freunde', text: 'Im Bus triffst du zufällig jemanden, den du lange nicht gesehen hast.', gefuehle: ['Freude', 'Überraschung'] },
    { id: 'ra15', kat: 'freunde', text: 'Deine Freunde lachen über einen Insider. Du verstehst ihn nicht.', gefuehle: ['Scham', 'Trauer'] },
    { id: 'ra16', kat: 'freunde', text: 'Jemand sagt zu dir: „Deine Zeichnung ist echt stark.“', gefuehle: ['Freude', 'Stolz', 'Scham'] },

    // Online & Handy
    { id: 'ra20', kat: 'online', text: 'Dein Akku ist bei 1 %. Du wartest auf eine wichtige Nachricht.', gefuehle: ['Angst', 'Wut'] },
    { id: 'ra21', kat: 'online', text: 'Dein Video bekommt über Nacht 2000 Likes.', gefuehle: ['Freude', 'Überraschung', 'Stolz'] },
    { id: 'ra22', kat: 'online', text: 'Jemand postet ein peinliches Foto von dir in die Klassengruppe.', gefuehle: ['Scham', 'Wut'] },
    { id: 'ra23', kat: 'online', text: 'Du schickst eine Nachricht in die falsche Gruppe.', gefuehle: ['Scham', 'Angst'] },
    { id: 'ra24', kat: 'online', text: 'Das WLAN bricht ab. Bei 99 % Download.', gefuehle: ['Wut'] },
    { id: 'ra25', kat: 'online', text: 'Unter deinem Post steht ein gemeiner Kommentar.', gefuehle: ['Wut', 'Trauer', 'Scham'] },
    { id: 'ra26', kat: 'online', text: 'Deine Nachricht wurde gelesen. Aber seit drei Stunden kommt keine Antwort.', gefuehle: ['Angst', 'Wut', 'Trauer'] },

    // Gaming
    { id: 'ra30', kat: 'gaming', text: 'Du verlierst in der letzten Sekunde. Nach einer Stunde Spiel.', gefuehle: ['Wut', 'Trauer'] },
    { id: 'ra31', kat: 'gaming', text: 'Jemand aus deinem Team schreibt im Chat: „Du bist so schlecht.“', gefuehle: ['Wut', 'Scham'] },
    { id: 'ra32', kat: 'gaming', text: 'Du schaffst endlich das Level, an dem du seit Wochen hängst.', gefuehle: ['Stolz', 'Freude'] },
    { id: 'ra33', kat: 'gaming', text: 'Das Spiel stürzt ab. Dein Spielstand ist weg.', gefuehle: ['Wut', 'Trauer', 'Überraschung'] },
    { id: 'ra34', kat: 'gaming', text: 'Du ziehst im Spiel ein super seltenes Item.', gefuehle: ['Freude', 'Überraschung'] },

    // Sport
    { id: 'ra40', kat: 'sport', text: 'Du schießt in der letzten Minute das Siegtor.', gefuehle: ['Stolz', 'Freude'] },
    { id: 'ra41', kat: 'sport', text: 'Du sitzt das ganze Spiel auf der Ersatzbank.', gefuehle: ['Trauer', 'Wut'] },
    { id: 'ra42', kat: 'sport', text: 'Der Schiri pfeift Foul gegen dich. Du hast den Ball gar nicht berührt.', gefuehle: ['Wut'] },
    { id: 'ra43', kat: 'sport', text: 'In der Umkleide riecht es nach altem Käse. Sehr altem Käse.', gefuehle: ['Ekel'] },
    { id: 'ra44', kat: 'sport', text: 'Ihr verliert haushoch. Das andere Team feiert laut.', gefuehle: ['Wut', 'Trauer', 'Scham'] },

    // Praktikum & Zukunft
    { id: 'ra50', kat: 'praktikum', text: 'Erster Tag im Praktikum. Du kennst dort niemanden.', gefuehle: ['Angst', 'Freude'] },
    { id: 'ra51', kat: 'praktikum', text: 'Die Chefin im Praktikum sagt: „Gute Arbeit. Komm gern wieder.“', gefuehle: ['Stolz', 'Freude'] },
    { id: 'ra52', kat: 'praktikum', text: 'Im Praktikum machst du einen Fehler. Alle schauen zu.', gefuehle: ['Scham', 'Angst'] },
    { id: 'ra53', kat: 'praktikum', text: 'Du bekommst eine Zusage für die Lehrstelle, die du wolltest.', gefuehle: ['Freude', 'Stolz', 'Überraschung'] },

    // Alltag & lustig
    { id: 'ra60', kat: 'alltag', text: 'Du beißt in ein Brötchen. Innen ist es grün.', gefuehle: ['Ekel', 'Überraschung'] },
    { id: 'ra61', kat: 'alltag', text: 'Der Bus fährt dir vor der Nase weg. Es regnet.', gefuehle: ['Wut', 'Trauer'] },
    { id: 'ra62', kat: 'alltag', text: 'Du findest 20 Euro in einer alten Jacke.', gefuehle: ['Freude', 'Überraschung'] },
    { id: 'ra63', kat: 'alltag', text: 'Auf der Schueberfouer bleibt die Achterbahn ganz oben stehen.', gefuehle: ['Angst', 'Überraschung'] },
    { id: 'ra64', kat: 'alltag', text: 'Du singst mit Kopfhörern laut mit. Der ganze Bus schaut dich an.', gefuehle: ['Scham', 'Überraschung'] },
    { id: 'ra65', kat: 'alltag', text: 'Jemand drängelt sich an der Kasse einfach vor.', gefuehle: ['Wut'] },
    { id: 'ra66', kat: 'alltag', text: 'Eine Spinne krabbelt über dein Kissen.', gefuehle: ['Angst', 'Ekel'] },
    { id: 'ra67', kat: 'alltag', text: 'Du wachst auf und denkst: verschlafen! Dann merkst du: Es ist Samstag.', gefuehle: ['Freude', 'Überraschung'] },
    { id: 'ra68', kat: 'alltag', text: 'An Fuesend erkennt dich im Kostüm niemand. Nicht mal deine Freunde.', gefuehle: ['Freude', 'Stolz', 'Überraschung'] },
    { id: 'ra69', kat: 'alltag', text: 'Im Kino tritt jemand die ganze Zeit gegen deinen Sitz.', gefuehle: ['Wut'] },
    { id: 'ra70', kat: 'alltag', text: 'Du öffnest am Montag deine Brotdose vom Freitag.', gefuehle: ['Ekel'] },
    { id: 'ra71', kat: 'alltag', text: 'Du kochst zum ersten Mal allein. Und es schmeckt richtig gut.', gefuehle: ['Stolz', 'Freude', 'Überraschung'] },
    { id: 'ra72', kat: 'alltag', text: 'Jemand am Nebentisch schmatzt extrem laut.', gefuehle: ['Ekel', 'Wut'] },

    // Heikel (nur mit Freigabe der Lehrkraft): Familie, Geld, Aussehen, Herkunft, Verlust
    { id: 'ra80', kat: 'familie', text: 'Zu Hause gibt es Streit. Du hörst alles durch die Wand.', gefuehle: ['Angst', 'Trauer', 'Wut'], heikel: true },
    { id: 'ra81', kat: 'familie', text: 'Zu Hause vergisst man deinen Geburtstag.', gefuehle: ['Trauer', 'Wut'], heikel: true },
    { id: 'ra82', kat: 'familie', text: 'Deine kleine Schwester liest heimlich deine Nachrichten.', gefuehle: ['Wut', 'Scham'], heikel: true },
    { id: 'ra83', kat: 'familie', text: 'Zu Hause sagt jemand: „Ich bin stolz auf dich.“', gefuehle: ['Freude', 'Stolz', 'Scham'], heikel: true },
    { id: 'ra84', kat: 'familie', text: 'Du wartest nach der Schule. Niemand holt dich ab. Alle anderen sind weg.', gefuehle: ['Angst', 'Wut', 'Trauer'], heikel: true },
    { id: 'ra85', kat: 'geld', text: 'Der Klassenausflug ist zu teuer. Du kannst nicht mit.', gefuehle: ['Trauer', 'Scham', 'Wut'], heikel: true },
    { id: 'ra86', kat: 'aussehen', text: 'Jemand macht sich über deine Kleidung lustig.', gefuehle: ['Scham', 'Wut'], heikel: true },
    { id: 'ra87', kat: 'herkunft', text: 'Jemand macht deinen Akzent nach und alle lachen.', gefuehle: ['Wut', 'Scham', 'Trauer'], heikel: true },
    { id: 'ra88', kat: 'verlust', text: 'Dein Haustier ist krank und muss zum Tierarzt.', gefuehle: ['Angst', 'Trauer'], heikel: true },
    { id: 'ra89', kat: 'familie', text: 'Ihr zieht um. In der neuen Stadt kennst du niemanden.', gefuehle: ['Angst', 'Trauer', 'Überraschung'], heikel: true },
  ];
})();
