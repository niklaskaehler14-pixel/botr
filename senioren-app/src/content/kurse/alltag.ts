import type { Kurs } from '../types';

export const alltag: Kurs = {
  id: 'alltag',
  titel: 'Alltagshelfer im Handy',
  untertitel: 'Suchen, Weg finden, erinnern lassen, Notruf',
  symbol: '🧭',
  beschreibung: 'Praktische Funktionen, die den Alltag leichter machen – vom Wecker bis zum Notruf.',
  lektionen: [
    {
      id: 'alltag-suchen',
      titel: 'Im Internet etwas suchen',
      kurz: 'Die richtige Frage stellen und Werbung von Ergebnissen unterscheiden.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'So suchen Sie',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Den Browser öffnen (Safari auf dem iPhone, Chrome auf Android).',
                'Oben in die Adresszeile tippen.',
                'Ihre Frage in normalen Worten eingeben, zum Beispiel „Öffnungszeiten Bürgeramt Kiel“.',
                'Auf der Tastatur auf „Suchen“ oder die Lupe tippen.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Sie können auch sprechen: Tippen Sie in der Suche auf das Mikrofon und stellen Sie Ihre Frage laut.',
            },
          ],
        },
        {
          titel: 'Werbung erkennen',
          bloecke: [
            {
              typ: 'text',
              text: 'Die obersten Treffer sind oft bezahlte Anzeigen. Sie erkennen sie an dem kleinen Wort „Anzeige“ oder „Gesponsert“. Diese Treffer sind nicht die besten Ergebnisse, sondern die teuersten Werbeplätze.',
            },
            {
              typ: 'achtung',
              text: 'Suchen Sie nie nach Telefonnummern für Bank, Behörde oder Support und rufen dann die erstbeste Nummer an. Betrüger schalten dort gezielt Werbung. Nehmen Sie die Nummer von Ihrer Karte, Rechnung oder dem offiziellen Schreiben.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Woran erkennen Sie bezahlte Werbung in den Suchergebnissen?',
          antworten: ['An der Farbe der Schrift', 'Am Wort „Anzeige“ oder „Gesponsert“', 'Gar nicht'],
          richtig: 1,
          erklaerung: 'Suchmaschinen müssen Werbung kennzeichnen – meist mit „Anzeige“ oder „Gesponsert“ direkt über dem Treffer.',
        },
      ],
    },
    {
      id: 'alltag-karten',
      titel: 'Den Weg finden',
      kurz: 'Karten-App: Adresse eingeben und sich führen lassen.',
      dauerMinuten: 4,
      abschnitte: [
        {
          titel: 'Route planen',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Die Karten-App öffnen (Apple Karten oder Google Maps).',
                'Oben in das Suchfeld die Adresse oder den Namen eingeben, zum Beispiel „Rathaus Lüneburg“.',
                'Auf „Route“ tippen.',
                'Die Art wählen: Auto, Bus und Bahn oder zu Fuß.',
                'Auf „Los“ tippen – das Handy sagt Ihnen jede Abbiegung an.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Bei Bus und Bahn zeigt die App auch die Abfahrtszeiten der nächsten Verbindungen an.',
            },
            {
              typ: 'merke',
              text: 'Die Navigation verbraucht Datenvolumen und Akku. Für längere Fahrten das Ladekabel mitnehmen.',
            },
          ],
        },
      ],
    },
    {
      id: 'alltag-erinnerungen',
      titel: 'Wecker, Erinnerungen und Termine',
      kurz: 'Das Handy denkt für Sie mit – auch an die Tabletten.',
      dauerMinuten: 4,
      abschnitte: [
        {
          titel: 'Wecker und Erinnerung stellen',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Die Uhr-App öffnen und auf „Wecker“ tippen.',
                'Mit dem Plus-Zeichen einen neuen Wecker anlegen.',
                'Zeit einstellen und bei Bedarf „Wiederholen“ für bestimmte Wochentage wählen.',
                'Für Erinnerungen die Erinnerungen-App verwenden oder einfach sagen: „Hey Siri, erinnere mich um 8 Uhr an die Tabletten“ beziehungsweise „Hey Google, …“.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Wiederkehrende Termine wie Arztbesuche im Kalender eintragen und eine Erinnerung einen Tag vorher einstellen.',
            },
          ],
        },
      ],
    },
    {
      id: 'alltag-notruf',
      titel: 'Notruf und Notfallpass',
      kurz: 'Wie Sie im Ernstfall schnell Hilfe holen – auch bei gesperrtem Bildschirm.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Notruf absetzen',
          bloecke: [
            {
              typ: 'text',
              text: 'Der Notruf 112 funktioniert auf jedem Handy – auch wenn der Bildschirm gesperrt ist und selbst ohne eigene Karte im Gerät.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Auf dem gesperrten Bildschirm auf „Notruf“ tippen.',
                '112 wählen (Feuerwehr und Rettungsdienst) oder 110 (Polizei).',
                'Ruhig sagen: Wo ist es passiert, was ist passiert, wie viele Betroffene, welche Verletzungen.',
                'Warten Sie auf Rückfragen und legen Sie erst auf, wenn die Leitstelle es sagt.',
              ],
            },
            {
              typ: 'plattform',
              ios: [
                'Notfall-SOS: Seitenknopf und eine Lautstärketaste gleichzeitig gedrückt halten, bis der Regler erscheint.',
                'Notfallpass anlegen: App „Health“ öffnen, auf das Profilbild tippen, dann „Notfallpass“ – dort Erkrankungen, Medikamente und Notfallkontakte eintragen.',
              ],
              android: [
                'Notruf: Ein-/Aus-Knopf mehrmals schnell drücken (je nach Hersteller) oder auf dem Sperrbildschirm „Notruf“ antippen.',
                'Notfallinformationen: Einstellungen, „Sicherheit und Notfälle“, dort medizinische Daten und Notfallkontakte eintragen.',
              ],
              hinweis: 'Notfallinformationen sind auch bei gesperrtem Handy sichtbar – Rettungskräfte können sie so lesen.',
            },
            {
              typ: 'merke',
              text: 'Tragen Sie unbedingt eine Notfallkontakt-Person ein. Das kostet fünf Minuten und kann im Ernstfall entscheidend sein.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Welche Nummer wählen Sie bei einem medizinischen Notfall?',
          antworten: ['110', '112', '116 117'],
          richtig: 1,
          erklaerung:
            '112 ist der Notruf für Rettungsdienst und Feuerwehr. 110 ist die Polizei, 116 117 der ärztliche Bereitschaftsdienst für nicht lebensbedrohliche Fälle.',
        },
      ],
    },
  ],
};
