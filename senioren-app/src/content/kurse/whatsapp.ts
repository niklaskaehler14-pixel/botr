import type { Kurs } from '../types';

export const whatsapp: Kurs = {
  id: 'whatsapp',
  titel: 'WhatsApp Schritt für Schritt',
  untertitel: 'Schreiben, telefonieren und Fotos teilen mit der Familie',
  symbol: '💬',
  beschreibung:
    'WhatsApp ist der meistgenutzte Weg, um mit Kindern und Enkeln in Kontakt zu bleiben. Hier lernen Sie alles von der Einrichtung bis zum Video-Anruf – und wie Sie WhatsApp sicher einstellen.',
  lektionen: [
    {
      id: 'whatsapp-was-ist-das',
      titel: 'Was ist WhatsApp?',
      kurz: 'Nachrichten, Fotos und Telefonate über das Internet – kostenlos.',
      dauerMinuten: 3,
      abschnitte: [
        {
          titel: 'Kurz erklärt',
          bloecke: [
            {
              typ: 'text',
              text: 'WhatsApp ist eine App zum Schreiben und Telefonieren. Statt über das Telefonnetz laufen die Nachrichten über das Internet. Deshalb kostet eine Nachricht nichts extra – auch nicht ins Ausland. Voraussetzung ist nur, dass Ihr Handy mit WLAN oder mobilem Internet verbunden ist.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Nachrichten schreiben und empfangen, so wie früher SMS.',
                'Sprachnachrichten aufnehmen, wenn Tippen zu mühsam ist.',
                'Fotos und Videos verschicken.',
                'Telefonieren und Video-Anrufe führen – Sie sehen Ihr Gegenüber.',
                'Gruppen für Familie, Verein oder Nachbarschaft.',
              ],
            },
            {
              typ: 'merke',
              text: 'Ihre Gesprächspartner brauchen ebenfalls WhatsApp. Ihre Telefonnummer ist gleichzeitig Ihre WhatsApp-Adresse – eine zusätzliche Anmeldung mit E-Mail brauchen Sie nicht.',
            },
          ],
        },
        {
          titel: 'Was kostet das?',
          bloecke: [
            {
              typ: 'text',
              text: 'Die App selbst ist kostenlos. Es entstehen nur die Kosten für Ihre Internetverbindung, die in fast allen Handyverträgen enthalten ist. Zu Hause im WLAN entstehen gar keine zusätzlichen Kosten.',
            },
            {
              typ: 'achtung',
              text: 'WhatsApp verlangt niemals eine Gebühr und verschickt keine Rechnungen. Nachrichten wie „Ihr WhatsApp-Abo läuft ab, jetzt bezahlen“ sind immer Betrug.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Was kostet eine WhatsApp-Nachricht nach Australien?',
          antworten: ['Nichts außer der Internetverbindung', 'Wie eine Auslands-SMS', 'Einen Euro pro Nachricht'],
          richtig: 0,
          erklaerung: 'WhatsApp läuft über das Internet. Die Entfernung spielt für den Preis keine Rolle.',
        },
      ],
    },
    {
      id: 'whatsapp-einrichten',
      titel: 'WhatsApp einrichten',
      kurz: 'Installieren, Telefonnummer bestätigen, Namen eintragen – einmalig in zehn Minuten.',
      dauerMinuten: 6,
      abschnitte: [
        {
          titel: 'Schritt für Schritt',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'WhatsApp im App Store (iPhone) oder Play Store (Android) suchen und installieren.',
                'App öffnen und den Nutzungsbedingungen zustimmen.',
                'Ihre Handynummer eingeben – mit Vorwahl, ohne die erste Null (Beispiel: 151 12345678 für 0151 12345678).',
                'WhatsApp schickt Ihnen eine SMS mit einem sechsstelligen Code. Diesen Code eingeben.',
                'Ihren Namen eintragen, so wie andere ihn sehen sollen – zum Beispiel „Ingrid Meier“.',
                'Zugriff auf Kontakte erlauben, damit Sie Ihre Bekannten in der Liste sehen.',
              ],
            },
            {
              typ: 'achtung',
              text: 'Geben Sie den sechsstelligen Code NIEMALS an eine andere Person weiter – auch nicht an einen vermeintlichen Verwandten oder Bekannten. Mit diesem Code können Fremde Ihr WhatsApp-Konto übernehmen.',
            },
            {
              typ: 'tipp',
              text: 'Lassen Sie sich beim ersten Einrichten von jemandem aus der Familie begleiten. Danach können Sie alles allein.',
            },
          ],
        },
        {
          titel: 'Profilbild einstellen',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'In WhatsApp auf „Einstellungen“ tippen (iPhone unten rechts, Android oben rechts über die drei Punkte).',
                'Ganz oben auf Ihren Namen tippen.',
                'Auf das Bildsymbol tippen und „Foto aufnehmen“ oder „Aus Galerie wählen“ auswählen.',
              ],
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Jemand schreibt Ihnen: „Ich habe aus Versehen meinen WhatsApp-Code an deine Nummer geschickt, schick ihn mir bitte.“ Was tun Sie?',
          antworten: ['Den Code weiterleiten', 'Den Code niemals weitergeben', 'Erst nachfragen, dann schicken'],
          richtig: 1,
          erklaerung:
            'Das ist eine bekannte Betrugsmasche zur Übernahme von Konten. Der Code gehört nur Ihnen und wird nie an andere weitergegeben.',
        },
      ],
    },
    {
      id: 'whatsapp-nachricht',
      titel: 'Eine Nachricht schreiben',
      kurz: 'Chat öffnen, Text eingeben, senden – und die Häkchen richtig deuten.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'So schreiben Sie',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'WhatsApp öffnen. Sie sehen die Liste Ihrer Unterhaltungen („Chats“).',
                'Auf das Stift- oder Plus-Symbol tippen, um eine neue Unterhaltung zu beginnen.',
                'Den gewünschten Namen aus der Liste antippen.',
                'Unten in das Textfeld tippen – die Tastatur erscheint.',
                'Text schreiben und auf den grünen Pfeil rechts tippen.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Sie müssen nicht tippen: Halten Sie das Mikrofon-Symbol auf der Tastatur gedrückt und sprechen Sie. Das Handy schreibt mit.',
            },
          ],
        },
        {
          titel: 'Was bedeuten die Häkchen?',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Ein graues Häkchen: Die Nachricht wurde verschickt.',
                'Zwei graue Häkchen: Die Nachricht ist beim Empfänger angekommen.',
                'Zwei blaue Häkchen: Die Nachricht wurde gelesen.',
                'Eine Uhr: Die Nachricht wartet noch auf eine Internetverbindung.',
              ],
            },
            {
              typ: 'merke',
              text: 'Blaue Häkchen bedeuten nur „gelesen“, nicht „einverstanden“. Niemand muss sofort antworten – auch Sie nicht.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Was bedeuten zwei blaue Häkchen?',
          antworten: ['Die Nachricht wurde gelesen', 'Die Nachricht wurde gelöscht', 'Die Nachricht kam nicht an'],
          richtig: 0,
          erklaerung: 'Zwei blaue Häkchen zeigen an, dass der Empfänger die Nachricht geöffnet hat.',
        },
      ],
    },
    {
      id: 'whatsapp-sprachnachricht',
      titel: 'Sprachnachricht aufnehmen',
      kurz: 'Einfach sprechen statt tippen – oft der bequemste Weg.',
      dauerMinuten: 4,
      abschnitte: [
        {
          titel: 'So geht es',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Die Unterhaltung öffnen.',
                'Rechts neben dem Textfeld das Mikrofon-Symbol gedrückt halten.',
                'In normaler Lautstärke sprechen, das Handy dabei etwa 20 Zentimeter vom Mund entfernt halten.',
                'Finger loslassen – die Nachricht wird sofort verschickt.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Zum Abbrechen ziehen Sie den Finger nach links, bevor Sie loslassen. Möchten Sie länger sprechen, wischen Sie beim Halten nach oben – die Aufnahme läuft dann weiter, ohne dass Sie den Finger halten müssen.',
            },
          ],
        },
        {
          titel: 'Anhören',
          bloecke: [
            {
              typ: 'text',
              text: 'Erhaltene Sprachnachrichten hören Sie durch Tippen auf den Abspielpfeil. Halten Sie das Handy dabei ans Ohr oder nutzen Sie den Lautsprecher.',
            },
          ],
        },
      ],
    },
    {
      id: 'whatsapp-fotos',
      titel: 'Fotos senden und speichern',
      kurz: 'Bilder verschicken, empfangen und wiederfinden.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Foto verschicken',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Die Unterhaltung öffnen.',
                'Auf das Plus-Zeichen beziehungsweise die Büroklammer neben dem Textfeld tippen.',
                '„Fotomediathek“ oder „Galerie“ wählen, um ein vorhandenes Bild zu nehmen – oder „Kamera“, um ein neues Foto zu machen.',
                'Das Bild antippen und auf den grünen Pfeil zum Senden tippen.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Sie können vor dem Senden noch etwas dazuschreiben, zum Beispiel „Unser Garten heute“.',
            },
          ],
        },
        {
          titel: 'Erhaltene Fotos aufbewahren',
          bloecke: [
            {
              typ: 'text',
              text: 'Fotos, die Sie bekommen, landen in der App. Wenn Sie ein Bild dauerhaft behalten möchten, speichern Sie es in Ihren eigenen Fotos.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Das Foto antippen, damit es groß erscheint.',
                'Auf das Teilen-Symbol tippen (iPhone: Quadrat mit Pfeil nach oben, Android: drei Punkte).',
                '„Speichern“ oder „In Galerie speichern“ wählen.',
              ],
            },
            {
              typ: 'achtung',
              text: 'Öffnen Sie keine Bilder oder Dateien von unbekannten Absendern. Fragen Sie im Zweifel beim vermeintlichen Absender auf dem gewohnten Weg nach.',
            },
          ],
        },
      ],
    },
    {
      id: 'whatsapp-anrufe',
      titel: 'Telefonieren und Video-Anruf',
      kurz: 'Die Enkel sehen, während Sie mit ihnen sprechen.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Anrufen',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Die Unterhaltung mit der Person öffnen.',
                'Oben rechts auf den Telefonhörer tippen (nur Ton) oder auf die Kamera (mit Bild).',
                'Warten, bis die andere Person annimmt.',
                'Zum Beenden auf den roten Hörer tippen.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Für einen Video-Anruf ist gutes Licht wichtig: Setzen Sie sich so, dass das Fenster vor Ihnen liegt und nicht hinter Ihnen.',
            },
            {
              typ: 'merke',
              text: 'Video-Anrufe verbrauchen viel Internet. Führen Sie sie nach Möglichkeit zu Hause im WLAN.',
            },
          ],
        },
        {
          titel: 'Angerufen werden',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Klingelt es, erscheint der Name auf dem Bildschirm.',
                'Zum Annehmen den grünen Knopf antippen oder nach oben wischen.',
                'Zum Ablehnen den roten Knopf antippen. Das ist völlig in Ordnung – Sie müssen nie sofort annehmen.',
              ],
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Was ist bei einem Video-Anruf empfehlenswert?',
          antworten: ['Ihn möglichst im WLAN führen', 'Ihn nur nachts führen', 'Das Handy dabei laden'],
          richtig: 0,
          erklaerung: 'Video-Anrufe verbrauchen viel Datenvolumen. Im WLAN entstehen keine zusätzlichen Kosten.',
        },
      ],
    },
    {
      id: 'whatsapp-gruppen',
      titel: 'Gruppen verstehen',
      kurz: 'In Gruppen lesen alle mit – gut für die Familie, aber mit ein paar Regeln.',
      dauerMinuten: 4,
      abschnitte: [
        {
          titel: 'Was ist eine Gruppe?',
          bloecke: [
            {
              typ: 'text',
              text: 'In einer Gruppe sind mehrere Personen zusammengefasst. Alles, was Sie dort schreiben, lesen alle Mitglieder. Das eignet sich gut für Familienabsprachen, Vereine oder die Nachbarschaft.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Oben in der Unterhaltung sehen Sie den Gruppennamen und die Anzahl der Mitglieder.',
                'Tippen Sie auf den Gruppennamen, um alle Teilnehmer zu sehen.',
                'Stumm schalten: Gruppenname antippen, dann „Stummschalten“ – Sie bekommen dann keine Töne mehr, können aber weiter mitlesen.',
                'Verlassen: Gruppenname antippen, nach unten wischen, „Gruppe verlassen“.',
              ],
            },
            {
              typ: 'achtung',
              text: 'Teilen Sie in Gruppen keine persönlichen Daten wie Adresse, Kontonummer oder Urlaubszeiten. Sie wissen oft nicht, wer alles Mitglied ist.',
            },
            {
              typ: 'tipp',
              text: 'Kettenbriefe („Leite das an 10 Leute weiter“) einfach löschen. Sie sind nie echt und verbreiten oft Falschmeldungen.',
            },
          ],
        },
      ],
    },
    {
      id: 'whatsapp-blockieren',
      titel: 'Störende Kontakte blockieren und melden',
      kurz: 'Sie bestimmen, wer Sie erreicht.',
      dauerMinuten: 4,
      abschnitte: [
        {
          titel: 'Blockieren',
          bloecke: [
            {
              typ: 'text',
              text: 'Blockierte Nummern können Ihnen nicht mehr schreiben und Sie nicht mehr anrufen. Die andere Seite wird darüber nicht informiert.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Die Unterhaltung öffnen.',
                'Oben auf den Namen beziehungsweise die Nummer tippen.',
                'Nach unten wischen bis „Kontakt blockieren“.',
                'Zusätzlich „Melden“ wählen, wenn es sich um Betrug handelt – dann prüft WhatsApp die Nummer.',
              ],
            },
            {
              typ: 'merke',
              text: 'Blockieren ist keine Unhöflichkeit, sondern Selbstschutz. Bei unbekannten Nummern mit Geldforderungen ist es genau das Richtige.',
            },
          ],
        },
      ],
    },
    {
      id: 'whatsapp-sicherheit',
      titel: 'WhatsApp sicher einstellen',
      kurz: 'Zwei-Schritt-Verifizierung und Datenschutz – die wichtigsten 10 Minuten.',
      dauerMinuten: 6,
      abschnitte: [
        {
          titel: 'Bestätigung in zwei Schritten',
          bloecke: [
            {
              typ: 'text',
              text: 'Mit dieser Einstellung vergeben Sie eine eigene sechsstellige PIN. Selbst wenn Fremde an den SMS-Code kommen, können sie Ihr Konto ohne diese PIN nicht übernehmen. Das ist der wirksamste Schutz gegen die Übernahme von WhatsApp-Konten.',
            },
            {
              typ: 'schritte',
              schritte: [
                'In WhatsApp die Einstellungen öffnen.',
                'Auf „Konto“ tippen.',
                '„Verifizierung in zwei Schritten“ wählen und aktivieren.',
                'Eine sechsstellige PIN vergeben, die Sie sich merken können – und diese notieren.',
                'Eine E-Mail-Adresse hinterlegen, damit Sie die PIN zurücksetzen können.',
              ],
            },
          ],
        },
        {
          titel: 'Datenschutz-Einstellungen',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Einstellungen, dann „Datenschutz“ öffnen.',
                '„Profilbild“ auf „Meine Kontakte“ stellen, damit Fremde Ihr Bild nicht sehen.',
                '„Zuletzt online“ auf „Meine Kontakte“ oder „Niemand“ stellen.',
                'Unter „Gruppen“ festlegen, dass nur Ihre Kontakte Sie zu Gruppen hinzufügen dürfen.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Diese Einstellungen können Sie jederzeit ändern. Es geht dabei nichts kaputt und niemand wird benachrichtigt.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Wofür ist die „Verifizierung in zwei Schritten“ gut?',
          antworten: [
            'Damit WhatsApp schneller läuft',
            'Damit Fremde Ihr Konto nicht übernehmen können',
            'Damit Nachrichten länger gespeichert werden',
          ],
          richtig: 1,
          erklaerung:
            'Die eigene PIN verhindert, dass jemand mit einem abgefangenen SMS-Code Ihr Konto auf einem anderen Gerät anmeldet.',
        },
      ],
    },
  ],
};
