import type { Kurs } from '../types';

export const grundlagen: Kurs = {
  id: 'grundlagen',
  titel: 'Das Handy verstehen',
  untertitel: 'Die ersten Handgriffe – ganz ohne Vorkenntnisse',
  symbol: '📱',
  beschreibung:
    'Hier lernen Sie, wie Sie Ihr Handy bedienen: tippen, wischen, laden, die Schrift größer machen und Apps installieren.',
  lektionen: [
    {
      id: 'grundlagen-bedienung',
      titel: 'Tippen, Wischen, Zoomen',
      kurz: 'Die vier Handgriffe, mit denen Sie jedes Handy bedienen können.',
      dauerMinuten: 4,
      abschnitte: [
        {
          titel: 'Der Bildschirm reagiert auf Ihre Finger',
          bloecke: [
            {
              typ: 'text',
              text: 'Ein Handy hat fast keine Knöpfe. Fast alles machen Sie, indem Sie den Bildschirm mit dem Finger berühren. Sie können dabei nichts kaputt machen. Es genügt eine leichte Berührung – Drücken hilft nicht.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Tippen: einmal kurz mit der Fingerkuppe berühren. Damit öffnen Sie eine App oder drücken einen Knopf.',
                'Langes Drücken: den Finger etwa zwei Sekunden liegen lassen. Es erscheint ein kleines Menü mit Zusatzfunktionen.',
                'Wischen: den Finger auf den Bildschirm legen und in eine Richtung ziehen. So blättern Sie nach oben und unten.',
                'Zoomen: mit Daumen und Zeigefinger auf dem Bildschirm auseinanderziehen. Alles wird größer.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Wenn Sie sich verirren: Es gibt immer einen Weg zurück. Auf dem iPhone wischen Sie vom unteren Rand nach oben, beim Android-Handy tippen Sie auf den Zurück-Pfeil oder wischen vom linken Rand nach rechts.',
            },
          ],
        },
        {
          titel: 'Die Tastatur',
          bloecke: [
            {
              typ: 'text',
              text: 'Sobald Sie etwas schreiben können, erscheint die Tastatur am unteren Bildschirmrand. Sie verschwindet wieder, wenn Sie auf eine freie Stelle tippen.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Der Pfeil nach oben schaltet zwischen großen und kleinen Buchstaben um.',
                'Die Taste mit „123“ zeigt Zahlen und Satzzeichen.',
                'Die Taste mit dem Mikrofon nimmt gesprochenen Text auf – das ist oft bequemer als Tippen.',
                'Der Pfeil nach links mit dem Kreuz löscht das letzte Zeichen.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Vertippt? Das ist völlig normal und passiert allen. Halten Sie die Löschtaste gedrückt, um mehrere Zeichen zu entfernen.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Was passiert, wenn Sie ein Symbol lange gedrückt halten?',
          antworten: ['Das Handy schaltet sich aus', 'Es erscheint ein kleines Zusatzmenü', 'Die App wird gelöscht'],
          richtig: 1,
          erklaerung:
            'Langes Drücken öffnet ein Menü mit Zusatzfunktionen. Löschen passiert erst, wenn Sie das im Menü ausdrücklich auswählen.',
        },
      ],
    },
    {
      id: 'grundlagen-einschalten',
      titel: 'Einschalten, sperren, laden',
      kurz: 'Damit Ihr Handy immer bereit ist, wenn Sie es brauchen.',
      dauerMinuten: 4,
      abschnitte: [
        {
          titel: 'Ein- und Ausschalten',
          bloecke: [
            {
              typ: 'text',
              text: 'Der längliche Knopf an der rechten Seite ist der wichtigste Knopf am Handy. Ein kurzer Druck schaltet nur den Bildschirm aus – das Handy bleibt an und empfängt weiter Anrufe.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Bildschirm aus: einmal kurz auf den Seitenknopf drücken.',
                'Bildschirm an: erneut kurz drücken oder das Handy anheben.',
                'Ganz ausschalten: den Seitenknopf einige Sekunden gedrückt halten, bis ein Schalter zum Ausschalten erscheint.',
                'Einschalten: den Seitenknopf so lange gedrückt halten, bis das Bild erscheint. Das dauert bis zu einer halben Minute.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Wenn etwas hakt oder eine App nicht mehr reagiert: einfach aus- und wieder einschalten. Das löst erstaunlich viele Probleme.',
            },
          ],
        },
        {
          titel: 'Die Bildschirmsperre',
          bloecke: [
            {
              typ: 'text',
              text: 'Damit niemand an Ihre Daten kommt, sollte das Handy mit einer PIN, einem Fingerabdruck oder Ihrem Gesicht gesperrt sein. Das ist kein Misstrauen gegen die Familie, sondern Schutz für den Fall, dass das Handy verloren geht.',
            },
            {
              typ: 'plattform',
              ios: [
                'Einstellungen öffnen.',
                'Auf „Face ID & Code“ (oder „Touch ID & Code“) tippen.',
                '„Code aktivieren“ wählen und eine sechsstellige Zahl vergeben.',
              ],
              android: [
                'Einstellungen öffnen.',
                'Auf „Sicherheit“ tippen (bei manchen Handys „Sicherheit & Datenschutz“).',
                '„Displaysperre“ wählen und PIN oder Fingerabdruck einrichten.',
              ],
              hinweis: 'Notieren Sie die PIN einmal auf Papier und legen Sie den Zettel an einen sicheren Ort zu Hause – nicht in die Handytasche.',
            },
          ],
        },
        {
          titel: 'Akku und Laden',
          bloecke: [
            {
              typ: 'text',
              text: 'Rechts oben sehen Sie den Ladestand als kleines Batteriesymbol. Laden Sie am besten jeden Abend, dann ist das Handy morgens voll.',
            },
            {
              typ: 'merke',
              text: 'Ein Handy geht vom Laden nicht kaputt. Sie können es über Nacht am Kabel lassen.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Was macht ein kurzer Druck auf den Seitenknopf?',
          antworten: ['Er schaltet das Handy ganz aus', 'Er schaltet nur den Bildschirm aus', 'Er löscht alle Daten'],
          richtig: 1,
          erklaerung: 'Kurz drücken schaltet den Bildschirm aus. Das Handy bleibt an und Sie werden weiter angerufen.',
        },
      ],
    },
    {
      id: 'grundlagen-schrift',
      titel: 'Schrift größer und Bildschirm heller machen',
      kurz: 'Ihr Handy kann alles größer darstellen – Sie müssen es nur einmal einstellen.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Warum das so wichtig ist',
          bloecke: [
            {
              typ: 'text',
              text: 'Handys sind ab Werk klein eingestellt. Fast jedes Gerät kann Schrift und Symbole deutlich vergrößern. Sie brauchen dafür keine neue Brille und keine fremde Hilfe.',
            },
            {
              typ: 'plattform',
              ios: [
                'Einstellungen öffnen.',
                'Auf „Anzeige & Helligkeit“ tippen.',
                '„Textgröße“ wählen und den Regler nach rechts schieben.',
                'Für noch größere Schrift: Einstellungen, „Bedienungshilfen“, „Anzeige & Textgröße“, „Größerer Text“.',
              ],
              android: [
                'Einstellungen öffnen.',
                'Auf „Anzeige“ tippen.',
                '„Schriftgröße“ oder „Anzeigegröße und Text“ wählen.',
                'Den Regler nach rechts schieben, bis Sie alles gut lesen können.',
              ],
              hinweis: 'Die Menüpunkte heißen je nach Hersteller etwas anders (Samsung, Xiaomi, Nokia …). Suchen Sie nach dem Wort „Anzeige“ oder „Display“.',
            },
            {
              typ: 'tipp',
              text: 'In dieser App können Sie die Schrift ebenfalls vergrößern: unten rechts auf „Einstellungen“ tippen und bei „Schriftgröße“ auf „Sehr groß“.',
            },
          ],
        },
        {
          titel: 'Helligkeit anpassen',
          bloecke: [
            {
              typ: 'text',
              text: 'Ist der Bildschirm zu dunkel, hilft der Helligkeitsregler. Sie erreichen ihn schnell über das Schnellmenü.',
            },
            {
              typ: 'plattform',
              ios: ['Von der rechten oberen Ecke nach unten wischen.', 'Den Regler mit dem Sonnensymbol nach oben schieben.'],
              android: ['Vom oberen Bildschirmrand nach unten wischen.', 'Den Regler mit dem Sonnensymbol nach rechts schieben.'],
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Wo stellen Sie die Schriftgröße Ihres Handys ein?',
          antworten: ['In den Einstellungen unter „Anzeige“', 'Beim Handy-Händler', 'Das geht nicht'],
          richtig: 0,
          erklaerung: 'Jedes moderne Handy hat in den Einstellungen unter „Anzeige“ einen Regler für die Schriftgröße.',
        },
      ],
    },
    {
      id: 'grundlagen-wlan',
      titel: 'Mit dem WLAN verbinden',
      kurz: 'So nutzen Sie zu Hause das Internet, ohne Ihr Datenvolumen zu verbrauchen.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Was ist WLAN?',
          bloecke: [
            {
              typ: 'text',
              text: 'WLAN ist Ihr Internet zu Hause, das der Router (die kleine Box vom Telefonanbieter) als Funksignal ausstrahlt. Ist Ihr Handy mit dem WLAN verbunden, kostet die Internetnutzung nichts extra und ist meist schneller.',
            },
            {
              typ: 'plattform',
              ios: [
                'Einstellungen öffnen.',
                'Auf „WLAN“ tippen und den Schalter einschalten.',
                'Den Namen Ihres Netzes antippen (er steht meist auf einem Aufkleber am Router).',
                'Das Passwort vom Aufkleber eingeben und auf „Verbinden“ tippen.',
              ],
              android: [
                'Einstellungen öffnen.',
                'Auf „Netzwerk & Internet“ oder „Verbindungen“ tippen, dann „WLAN“.',
                'Den Namen Ihres Netzes antippen.',
                'Das Passwort vom Aufkleber am Router eingeben und auf „Verbinden“ tippen.',
              ],
              hinweis: 'Das WLAN-Passwort müssen Sie nur einmal eingeben. Danach verbindet sich Ihr Handy zu Hause automatisch.',
            },
          ],
        },
        {
          titel: 'Fremdes WLAN – bitte vorsichtig',
          bloecke: [
            {
              typ: 'achtung',
              text: 'In offenen Netzen (Café, Bahnhof, Hotel) können andere unter Umständen mitlesen. Erledigen Sie dort keine Bankgeschäfte und geben Sie keine Passwörter ein. Nutzen Sie dafür lieber Ihre Mobilfunkverbindung.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Wo finden Sie normalerweise Ihr WLAN-Passwort?',
          antworten: ['Auf einem Aufkleber am Router', 'Im Telefonbuch', 'Das Passwort denkt man sich selbst aus'],
          richtig: 0,
          erklaerung: 'Bei fast allen Routern steht das voreingestellte Passwort auf einem Aufkleber an der Unterseite oder Rückseite.',
        },
      ],
    },
    {
      id: 'grundlagen-apps',
      titel: 'Eine App installieren',
      kurz: 'Apps kommen aus dem offiziellen Laden Ihres Handys – nirgendwo sonst her.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Was ist eine App?',
          bloecke: [
            {
              typ: 'text',
              text: 'Eine App ist ein kleines Programm für eine bestimmte Aufgabe: WhatsApp zum Schreiben, eine Wetter-App für das Wetter, eine Bahn-App für Fahrpläne. Neue Apps holen Sie sich aus dem App-Laden Ihres Handys.',
            },
            {
              typ: 'plattform',
              ios: [
                'Das blaue Symbol „App Store“ öffnen.',
                'Unten rechts auf „Suchen“ tippen.',
                'Den Namen der App eingeben, zum Beispiel „WhatsApp“.',
                'Auf „Laden“ tippen und mit Face ID, Fingerabdruck oder Apple-Passwort bestätigen.',
              ],
              android: [
                'Das bunte Dreieck-Symbol „Play Store“ öffnen.',
                'Oben in die Suchzeile tippen.',
                'Den Namen der App eingeben, zum Beispiel „WhatsApp“.',
                'Auf „Installieren“ tippen.',
              ],
            },
            {
              typ: 'achtung',
              text: 'Installieren Sie Apps ausschließlich über App Store oder Play Store. Apps aus E-Mails, SMS-Links oder Werbeanzeigen können Schadprogramme enthalten.',
            },
            {
              typ: 'tipp',
              text: 'Kostenlose Apps erkennen Sie am Wort „Laden“ oder „Installieren“. Steht dort ein Preis, kostet die App Geld.',
            },
          ],
        },
        {
          titel: 'Apps ordnen und löschen',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Symbol lange gedrückt halten, bis ein Menü erscheint.',
                'Zum Verschieben den Finger liegen lassen und das Symbol an die gewünschte Stelle ziehen.',
                'Zum Löschen im Menü „App entfernen“ beziehungsweise „Deinstallieren“ wählen.',
              ],
            },
            {
              typ: 'merke',
              text: 'Eine gelöschte App können Sie jederzeit kostenlos neu installieren, wenn Sie sie einmal geladen hatten.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Woher sollten Sie neue Apps beziehen?',
          antworten: [
            'Aus einem Link in einer SMS',
            'Nur aus dem App Store (iPhone) oder Play Store (Android)',
            'Von einer beliebigen Internetseite',
          ],
          richtig: 1,
          erklaerung:
            'Nur die offiziellen Läden prüfen Apps auf Schadsoftware. Links aus Nachrichten oder Werbung sind ein häufiger Weg für Betrug.',
        },
      ],
    },
  ],
};
