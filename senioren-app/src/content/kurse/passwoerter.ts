import type { Kurs } from '../types';

export const passwoerter: Kurs = {
  id: 'passwoerter',
  titel: 'Passwörter und Konten schützen',
  untertitel: 'Einfache Regeln, die wirklich helfen',
  symbol: '🔑',
  beschreibung:
    'Wie ein gutes Passwort aussieht, warum Länge wichtiger ist als Sonderzeichen und wie Sie Ihre Konten zusätzlich absichern. Nach den aktuellen Empfehlungen des Bundesamts für Sicherheit in der Informationstechnik (BSI).',
  lektionen: [
    {
      id: 'passwoerter-gutes-passwort',
      titel: 'Was ein gutes Passwort ausmacht',
      kurz: 'Länge schlägt Kompliziertheit – ein Satz ist besser als ein Kürzel.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Lang und merkbar statt kurz und kryptisch',
          bloecke: [
            {
              typ: 'text',
              text: 'Lange galt: Passwörter müssen kompliziert sein. Heute empfiehlt das BSI vor allem Länge. Ein langes Passwort aus mehreren Wörtern ist sicherer und leichter zu merken als ein kurzes mit vielen Sonderzeichen.',
            },
            {
              typ: 'beispiel',
              titel: 'Ein gutes Passwort bauen',
              text: 'Denken Sie sich drei bis vier Wörter aus, die nichts miteinander zu tun haben, und verbinden Sie sie: „Gießkanne-Trompete-Ahorn-7“. Das sind über 20 Zeichen, gut zu merken und sehr schwer zu erraten.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Mindestens 20 Zeichen, wenn Sie nur Buchstaben verwenden.',
                'Oder mindestens 8 bis 12 Zeichen, wenn Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen vorkommen – dann aber unbedingt zusätzlich mit einem zweiten Faktor absichern.',
                'Keine Namen von Familie, Haustieren oder Ihr Geburtsdatum.',
                'Keine Tastaturmuster wie „qwertz“ oder „123456“.',
                'Kein Passwort mehrfach verwenden.',
              ],
            },
            {
              typ: 'merke',
              text: 'Regelmäßiges Wechseln ist nicht mehr empfohlen: Es führt erfahrungsgemäß zu schwächeren Passwörtern. Wechseln Sie ein Passwort dann, wenn es tatsächlich in falsche Hände geraten sein könnte.',
            },
          ],
        },
        {
          titel: 'Passwörter aufbewahren',
          bloecke: [
            {
              typ: 'text',
              text: 'Ein Passwortheft im Schrank ist besser als überall dasselbe Passwort. Wichtig ist nur: nicht neben dem Gerät, nicht in der Handtasche und ohne Hinweis darauf, zu welchem Konto es gehört.',
            },
            {
              typ: 'tipp',
              text: 'Noch bequemer sind Passwort-Manager. Auf dem iPhone ist die App „Passwörter“ eingebaut, bei Android der Google Passwortmanager. Sie merken sich dann nur noch ein einziges gutes Passwort.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Welches Passwort ist am sichersten?',
          antworten: ['Mü!7x', 'Gießkanne-Trompete-Ahorn-7', 'Sommer2026'],
          richtig: 1,
          erklaerung: 'Die Länge ist entscheidend. Vier zusammenhanglose Wörter sind sehr schwer zu erraten und trotzdem merkbar.',
        },
      ],
    },
    {
      id: 'passwoerter-zwei-faktor',
      titel: 'Der zweite Schlüssel (Zwei-Faktor)',
      kurz: 'Selbst wenn jemand Ihr Passwort kennt, kommt er nicht hinein.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Wie es funktioniert',
          bloecke: [
            {
              typ: 'text',
              text: 'Beim Anmelden brauchen Sie zwei Dinge: Ihr Passwort und einen zweiten Nachweis – zum Beispiel eine Zahl aus einer App, einen Code per SMS oder Ihren Fingerabdruck. Das BSI empfiehlt diesen zweiten Faktor für alle wichtigen Konten.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Aktivieren Sie den zweiten Faktor zuerst dort, wo es wehtut: E-Mail-Konto, Online-Banking, WhatsApp, Apple- oder Google-Konto.',
                'Die Einstellung finden Sie meist unter „Sicherheit“ oder „Konto“.',
                'Notieren Sie sich die Notfall-Codes, die Ihnen dabei angezeigt werden, und bewahren Sie sie zu Hause auf.',
              ],
            },
            {
              typ: 'text',
              text: 'Neu sind sogenannte Passkeys: Statt eines Passworts bestätigen Sie die Anmeldung mit Fingerabdruck oder Gesicht. Das ist bequem und besonders sicher, weil es nichts gibt, was abgefragt oder gestohlen werden könnte.',
            },
            {
              typ: 'achtung',
              text: 'Geben Sie einen zugeschickten Code niemals telefonisch oder per Nachricht weiter. Kein seriöses Unternehmen fragt danach.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Was ist der Vorteil der Zwei-Faktor-Anmeldung?',
          antworten: [
            'Man braucht kein Passwort mehr',
            'Ein gestohlenes Passwort allein reicht Fremden nicht aus',
            'Die Anmeldung geht schneller',
          ],
          richtig: 1,
          erklaerung: 'Der zweite Faktor liegt bei Ihnen – zum Beispiel auf Ihrem Handy. Ohne ihn nützt ein gestohlenes Passwort nichts.',
        },
      ],
    },
    {
      id: 'passwoerter-updates',
      titel: 'Updates: die unterschätzte Sicherheit',
      kurz: 'Aktualisierungen schließen Sicherheitslücken – am besten automatisch.',
      dauerMinuten: 4,
      abschnitte: [
        {
          titel: 'Warum Updates wichtig sind',
          bloecke: [
            {
              typ: 'text',
              text: 'Ein Update ist eine Verbesserung, die der Hersteller nachliefert. Meistens werden damit Sicherheitslücken geschlossen, durch die Schadsoftware sonst auf Ihr Gerät gelangen könnte. Updates sind kostenlos.',
            },
            {
              typ: 'plattform',
              ios: [
                'Einstellungen öffnen.',
                'Auf „Allgemein“ tippen, dann „Softwareupdate“.',
                '„Automatische Updates“ einschalten.',
              ],
              android: [
                'Einstellungen öffnen.',
                'Ganz unten auf „System“ und dann „Softwareupdate“ tippen.',
                'Automatische Updates einschalten. Apps aktualisiert der Play Store selbstständig.',
              ],
              hinweis: 'Updates am besten nachts im WLAN laufen lassen, wenn das Handy am Ladekabel hängt.',
            },
            {
              typ: 'achtung',
              text: 'Update-Aufforderungen, die als Fenster im Internet auftauchen, sind Betrug. Echte Updates kommen ausschließlich aus den Einstellungen Ihres Handys oder aus dem App-Laden.',
            },
          ],
        },
      ],
    },
    {
      id: 'passwoerter-daten',
      titel: 'Sparsam mit persönlichen Daten',
      kurz: 'Was einmal im Internet steht, bleibt dort. Deshalb: weniger ist mehr.',
      dauerMinuten: 4,
      abschnitte: [
        {
          titel: 'Grundregeln',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Geben Sie in Formularen nur die Pflichtfelder an – meist mit einem Sternchen markiert.',
                'Kontonummer, Ausweisnummer und Geburtsdatum gehören nicht in Chats oder soziale Netzwerke.',
                'Veröffentlichen Sie keine Urlaubsfotos, solange Sie verreist sind.',
                'Fotos von Enkelkindern nur mit Einverständnis der Eltern weitergeben.',
                'Bei Gewinnspielen im Internet ist meist Ihre Adresse das eigentliche Ziel.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Legen Sie sich eine zweite, kostenlose E-Mail-Adresse für Bestellungen und Newsletter an. Ihre Haupt-Adresse bleibt so von Werbung verschont.',
            },
          ],
        },
      ],
    },
  ],
};
