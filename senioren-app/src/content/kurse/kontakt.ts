import type { Kurs } from '../types';

export const kontakt: Kurs = {
  id: 'kontakt',
  titel: 'In Kontakt bleiben',
  untertitel: 'Telefonieren, E-Mail und Fotos mit der Familie teilen',
  symbol: '👨‍👩‍👧',
  beschreibung: 'Kontakte anlegen, Video-Anrufe führen, Fotos ordnen und E-Mails sicher nutzen.',
  lektionen: [
    {
      id: 'kontakt-kontakte',
      titel: 'Kontakte speichern und anrufen',
      kurz: 'Namen statt Nummern – so rufen Sie mit zwei Fingertipps an.',
      dauerMinuten: 4,
      abschnitte: [
        {
          titel: 'Einen Kontakt anlegen',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Die Telefon-App öffnen (grünes Hörer-Symbol).',
                'Auf „Kontakte“ tippen.',
                'Auf das Plus-Zeichen tippen.',
                'Vorname, Nachname und Telefonnummer eintragen.',
                'Oben rechts auf „Fertig“ oder „Speichern“ tippen.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Ein Foto beim Kontakt hilft beim schnellen Erkennen – besonders praktisch, wenn jemand anruft.',
            },
          ],
        },
        {
          titel: 'Anrufen und Favoriten',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'In der Telefon-App auf „Kontakte“ tippen und den Namen suchen.',
                'Den Namen antippen, dann auf „Anrufen“.',
                'Wichtige Personen als Favoriten speichern: Kontakt öffnen und auf „Zu Favoriten“ tippen.',
              ],
            },
            {
              typ: 'merke',
              text: 'Unbekannte Nummern müssen Sie nicht annehmen. Ist es wichtig, wird zurückgerufen oder eine Nachricht hinterlassen.',
            },
          ],
        },
      ],
    },
    {
      id: 'kontakt-videoanruf',
      titel: 'Video-Anruf mit der Familie',
      kurz: 'Sich sehen, während man spricht – über WhatsApp oder FaceTime.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Welche App wofür?',
          bloecke: [
            {
              typ: 'text',
              text: 'WhatsApp funktioniert auf iPhone und Android-Handys gleichermaßen und ist deshalb der einfachste gemeinsame Nenner. FaceTime gibt es nur zwischen Apple-Geräten, dafür ist es dort schon eingebaut.',
            },
            {
              typ: 'plattform',
              ios: [
                'FaceTime-App öffnen.',
                'Oben auf „Neu“ tippen und den Namen eingeben.',
                'Auf „FaceTime“ tippen, um den Video-Anruf zu starten.',
              ],
              android: [
                'WhatsApp öffnen und die Unterhaltung mit der Person auswählen.',
                'Oben rechts auf das Kamera-Symbol tippen.',
                'Warten, bis angenommen wird.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Stützen Sie das Handy an etwas an oder verwenden Sie einen kleinen Ständer. Das Bild wird ruhiger und Ihr Arm dankt es Ihnen.',
            },
          ],
        },
      ],
    },
    {
      id: 'kontakt-fotos',
      titel: 'Fotos machen, ansehen und sichern',
      kurz: 'Vom Auslöser bis zur Sicherung in der Cloud.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Fotografieren',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Kamera-App öffnen.',
                'Das Handy ruhig halten und auf den großen runden Auslöser tippen.',
                'Zum Vergrößern zwei Finger auf dem Bildschirm auseinanderziehen.',
                'Das kleine Vorschaubild unten öffnet das gerade gemachte Foto.',
              ],
            },
          ],
        },
        {
          titel: 'Fotos sichern',
          bloecke: [
            {
              typ: 'text',
              text: 'Geht ein Handy verloren, sind auch die Fotos weg – es sei denn, sie werden automatisch gesichert. Diese Sicherung („Cloud“) ist ein Speicher im Internet, auf den nur Sie Zugriff haben.',
            },
            {
              typ: 'plattform',
              ios: ['Einstellungen öffnen.', 'Ganz oben auf Ihren Namen tippen, dann „iCloud“.', '„Fotos“ einschalten.'],
              android: ['Die App „Google Fotos“ öffnen.', 'Oben rechts auf das Profilbild tippen.', '„Sicherung“ einschalten.'],
              hinweis: 'Kostenlos ist meist eine begrenzte Menge Speicher. Für mehr Speicher fallen monatliche Kosten an – das ist freiwillig.',
            },
            {
              typ: 'tipp',
              text: 'Zeigen Sie Ihrer Familie einmal, wo Ihre Fotos gesichert sind. Dann kann im Notfall jemand helfen.',
            },
          ],
        },
      ],
    },
    {
      id: 'kontakt-email',
      titel: 'E-Mail: Grundlagen',
      kurz: 'Schreiben, Anhänge öffnen und Spam erkennen.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Eine E-Mail schreiben',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Die Mail-App öffnen.',
                'Auf das Stift-Symbol für eine neue Nachricht tippen.',
                'Bei „An“ die E-Mail-Adresse des Empfängers eintragen.',
                'Bei „Betreff“ ein Stichwort eintragen, worum es geht.',
                'Den Text schreiben und auf den Sende-Pfeil tippen.',
              ],
            },
            {
              typ: 'merke',
              text: 'Eine E-Mail-Adresse enthält immer ein @-Zeichen. Sie erreichen Sie über die Tastatur, meist auf der Zahlen- und Zeichenebene.',
            },
          ],
        },
        {
          titel: 'Anhänge und Spam',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Anhänge (Bilder, PDF-Dateien) erkennen Sie an einer Büroklammer.',
                'Öffnen Sie Anhänge nur, wenn Sie den Absender kennen und die Mail erwartet haben.',
                'Werbe- und Betrugsmails („Spam“) verschieben Sie in den Spam-Ordner, statt zu antworten.',
                'Auf Abmelde-Links in unbekannten Werbemails besser nicht klicken – sie bestätigen dem Absender nur, dass Ihre Adresse aktiv ist.',
              ],
            },
            {
              typ: 'achtung',
              text: 'Eine E-Mail kann jeden beliebigen Absendernamen anzeigen. Der angezeigte Name ist kein Beweis dafür, wer wirklich geschrieben hat.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Sie erhalten eine unerwartete E-Mail mit einer Rechnung im Anhang. Was tun Sie?',
          antworten: [
            'Den Anhang öffnen, um zu sehen, worum es geht',
            'Den Anhang nicht öffnen und beim angeblichen Absender über eine bekannte Nummer nachfragen',
            'Die Mail an Bekannte weiterleiten',
          ],
          richtig: 1,
          erklaerung: 'Unerwartete Anhänge sind ein Hauptweg für Schadsoftware. Nachfragen über einen bekannten Kanal ist immer sicher.',
        },
      ],
    },
  ],
};
