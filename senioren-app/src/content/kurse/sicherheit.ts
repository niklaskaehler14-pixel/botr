import type { Kurs } from '../types';

export const sicherheit: Kurs = {
  id: 'sicherheit',
  titel: 'Gefahren im Internet erkennen',
  untertitel: 'Betrugsmaschen durchschauen und richtig reagieren',
  symbol: '🛡️',
  beschreibung:
    'Die häufigsten Maschen, mit denen Betrüger es auf ältere Menschen abgesehen haben – erklärt an echten Beispielen, mit klaren Handlungsanweisungen. Inhalte nach Empfehlungen von Verbraucherzentrale, Polizei und BSI.',
  lektionen: [
    {
      id: 'sicherheit-muster',
      titel: 'So gehen Betrüger vor',
      kurz: 'Fünf Warnzeichen, die bei fast jeder Masche auftauchen.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Das Muster ist immer ähnlich',
          bloecke: [
            {
              typ: 'text',
              text: 'Betrüger denken sich ständig neue Geschichten aus. Das Muster dahinter bleibt aber fast immer gleich. Wenn Sie dieses Muster erkennen, erkennen Sie auch neue Maschen, von denen Sie noch nie gehört haben.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Gefühle: Es geht um Angst, Mitleid, Liebe oder Gier. Sie sollen nicht nachdenken, sondern fühlen.',
                'Zeitdruck: „Sofort“, „nur heute“, „sonst passiert etwas Schlimmes“.',
                'Geheimhaltung: Sie sollen mit niemandem darüber sprechen – auch nicht mit der Familie oder der Bank.',
                'Ungewöhnlicher Zahlungsweg: Bargeldübergabe, Gutscheinkarten, Überweisung ins Ausland, Krypto-Geld.',
                'Ungefragter Kontakt: Der Anruf, die SMS oder die E-Mail kommt von sich aus zu Ihnen.',
              ],
            },
            {
              typ: 'merke',
              text: 'Zeitdruck plus Geheimhaltung plus Geld ist immer Betrug. Immer. Legen Sie auf, löschen Sie die Nachricht, sprechen Sie mit jemandem, dem Sie vertrauen.',
            },
          ],
        },
        {
          titel: 'Ihr wichtigstes Recht',
          bloecke: [
            {
              typ: 'text',
              text: 'Sie müssen niemandem Auskunft geben. Sie dürfen jedes Telefonat beenden, jede Nachricht ignorieren und jede Tür geschlossen lassen. Höflichkeit ist kein Grund, Ihr Geld zu riskieren – seriöse Stellen haben Verständnis für Rückfragen.',
            },
            {
              typ: 'tipp',
              text: 'Legen Sie einen Zettel neben das Telefon: „Erst auflegen, dann in Ruhe zurückrufen – bei der Nummer, die ich selbst kenne.“',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Welche Kombination ist das sicherste Erkennungszeichen für Betrug?',
          antworten: [
            'Zeitdruck, Geheimhaltung und eine Geldforderung',
            'Ein Anruf am Vormittag',
            'Eine Nachricht mit Rechtschreibfehlern',
          ],
          richtig: 0,
          erklaerung:
            'Rechtschreibfehler sind nur ein Hinweis. Zeitdruck zusammen mit Geheimhaltung und Geldforderung ist praktisch immer Betrug.',
        },
      ],
    },
    {
      id: 'sicherheit-hallo-mama',
      titel: '„Hallo Mama, ich habe eine neue Nummer“',
      kurz: 'Die bekannteste WhatsApp-Masche – und wie Sie sie in einer Minute entlarven.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'So läuft die Masche ab',
          bloecke: [
            {
              typ: 'text',
              text: 'Sie bekommen eine Nachricht von einer unbekannten Nummer. Angeblich schreibt Ihr Sohn oder Ihre Tochter: Das Handy sei kaputt oder verloren gegangen, dies sei die neue Nummer. Kurz darauf folgt die eigentliche Bitte: Eine Rechnung müsse dringend bezahlt werden, das Online-Banking gehe gerade nicht.',
            },
            {
              typ: 'beispiel',
              titel: 'Typische Nachricht',
              text: '„Hallo Mama, rate mal, wessen Handy in der Waschmaschine gelandet ist 😅 Das ist meine neue Nummer, kannst du die alte löschen?“ – Später: „Kannst du mir kurz 1.850 € überweisen? Ich zahle es dir morgen zurück.“',
            },
            {
              typ: 'text',
              text: 'Die Verbraucherzentrale beobachtet diese Masche seit Jahren. Zeitweise gingen täglich Hunderte solcher Nachrichten ein. Auffällig ist: Die Nachricht spricht Sie nie mit Namen an, weil die Absender Ihren Namen gar nicht kennen.',
            },
          ],
        },
        {
          titel: 'Was Sie tun',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Nicht antworten und auf keinen Fall Geld überweisen.',
                'Rufen Sie Ihr Kind unter der alten, Ihnen bekannten Nummer an. Ist das Handy wirklich kaputt, erreichen Sie jemanden aus der Familie.',
                'Stellen Sie eine Frage, die nur die echte Person beantworten kann („Wie hieß unser erster Hund?“).',
                'Die unbekannte Nummer in WhatsApp blockieren und melden.',
                'Wurde bereits Geld überwiesen: sofort die Bank anrufen und Anzeige bei der Polizei erstatten.',
              ],
            },
            {
              typ: 'achtung',
              text: 'Antworten Sie auch nicht mit „Wer ist da?“. Jede Antwort zeigt den Absendern, dass die Nummer aktiv ist – Sie bekommen dann mehr solcher Nachrichten.',
            },
            {
              typ: 'merke',
              text: 'Neue Nummer plus Geldbitte gleich Betrug. Prüfen Sie immer über die alte Nummer.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Eine unbekannte Nummer schreibt: „Hallo Mama, neue Nummer, kannst du eine Rechnung für mich zahlen?“ Was ist der richtige erste Schritt?',
          antworten: [
            'Auf der neuen Nummer zurückschreiben',
            'Das Kind unter der alten, bekannten Nummer anrufen',
            'Den Betrag überweisen und später klären',
          ],
          richtig: 1,
          erklaerung:
            'Der Rückruf über die bekannte Nummer entlarvt die Masche sofort. Über die neue Nummer erreichen Sie nur die Betrüger.',
        },
      ],
    },
    {
      id: 'sicherheit-schockanruf',
      titel: 'Schockanruf, Enkeltrick und falsche Polizei',
      kurz: 'Am Telefon: Unfall, Haftbefehl, Kaution. Ihr Familien-Kennwort schützt Sie.',
      dauerMinuten: 6,
      abschnitte: [
        {
          titel: 'Die Masche',
          bloecke: [
            {
              typ: 'text',
              text: 'Am Telefon meldet sich eine weinende Stimme oder eine angebliche Amtsperson. Die Tochter habe einen schweren Unfall verursacht, ein Mensch sei gestorben, nur eine sofortige Kaution verhindere die Haft. Andere geben sich als Polizei, Staatsanwaltschaft oder Rechtsanwalt aus. Ziel ist immer, dass Sie Bargeld oder Schmuck an einen Abholer übergeben.',
            },
            {
              typ: 'text',
              text: 'Die Täter arbeiten mit maximalem Gefühlsdruck. Sie halten Sie oft über Stunden am Telefon, damit Sie niemanden fragen können. Manchmal wird sogar behauptet, Sie dürften die örtliche Polizei nicht einschalten, weil höhere Behörden ermitteln.',
            },
            {
              typ: 'achtung',
              text: 'Die echte Polizei verlangt niemals Geld, Kautionen oder Wertgegenstände. Sie holt auch nie Bargeld oder Schmuck zur „sicheren Verwahrung“ ab. Die Rufnummer 110 erscheint bei einem echten Anruf nie im Display.',
            },
          ],
        },
        {
          titel: 'So verhalten Sie sich',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Legen Sie auf. Sie schulden Anrufern keine Erklärung.',
                'Rufen Sie danach selbst zurück – bei der Nummer, die Sie kennen, oder bei der Polizei unter 110. Wählen Sie die Nummer neu, nutzen Sie nicht die Rückruftaste.',
                'Sprechen Sie mit einer Person Ihres Vertrauens, bevor Sie irgendetwas tun.',
                'Übergeben Sie niemals Bargeld oder Wertsachen an Unbekannte an der Haustür.',
                'Notieren Sie sich, was gesagt wurde, und melden Sie den Versuch der Polizei.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Vereinbaren Sie mit Ihrer Familie ein Kennwort – ein Wort, das nur Sie kennen. Bei jedem Notfall-Anruf fragen Sie danach. Wer es nicht weiß, ist nicht Ihre Familie. Die polizeiliche Prävention empfiehlt genau das.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Ein angeblicher Polizist verlangt eine Kaution für Ihre Tochter. Was stimmt?',
          antworten: [
            'Kautionen werden manchmal telefonisch eingesammelt',
            'Die echte Polizei verlangt niemals Geld',
            'Man sollte zahlen und später zurückfordern',
          ],
          richtig: 1,
          erklaerung: 'Polizei und Justiz fordern in Deutschland niemals telefonisch Geld oder Wertsachen. Auflegen und selbst 110 wählen.',
        },
      ],
    },
    {
      id: 'sicherheit-phishing',
      titel: 'Gefälschte E-Mails und SMS (Phishing)',
      kurz: 'Paket-SMS, Bankmails, Kontosperrung – woran Sie Fälschungen erkennen.',
      dauerMinuten: 6,
      abschnitte: [
        {
          titel: 'Was ist Phishing?',
          bloecke: [
            {
              typ: 'text',
              text: 'Phishing bedeutet „Angeln“: Betrüger angeln nach Ihren Passwörtern und Bankdaten. Sie verschicken massenhaft E-Mails oder SMS, die aussehen wie Nachrichten von Bank, Paketdienst, Streamingdienst oder Behörde. Ein Link führt auf eine täuschend echt nachgebaute Seite. Was Sie dort eingeben, landet bei den Tätern.',
            },
            {
              typ: 'beispiel',
              titel: 'Paket-SMS („Smishing“)',
              text: '„Ihr Paket konnte nicht zugestellt werden. Bitte begleichen Sie die Zollgebühr von 2,99 € unter: dhl-paket-service.info“ – Echte Paketdienste verlangen keine Vorauszahlung per SMS-Link, und Einfuhrabgaben werden bei der Zustellung erhoben.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Anrede fehlt oder ist allgemein („Sehr geehrter Kunde“).',
                'Es wird Druck aufgebaut: Konto werde gesperrt, Frist laufe ab.',
                'Die Internetadresse im Link ist seltsam: zusätzliche Wörter, Bindestriche, fremde Endungen.',
                'Es wird nach Passwort, PIN, TAN oder Kartendaten gefragt.',
                'Anhänge, die Sie nicht erwartet haben.',
              ],
            },
          ],
        },
        {
          titel: 'Die einfachste Regel',
          bloecke: [
            {
              typ: 'merke',
              text: 'Klicken Sie nie auf Links in solchen Nachrichten. Öffnen Sie stattdessen die App der Bank oder des Paketdienstes selbst, oder tippen Sie die Ihnen bekannte Internetadresse von Hand ein. Ist die Nachricht echt, finden Sie den Hinweis auch dort.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Nachricht nicht beantworten, Links nicht antippen, Anhänge nicht öffnen.',
                'Im Zweifel bei der echten Stelle anrufen – mit der Nummer von Ihrer Rechnung oder Ihrer Karte, nicht mit der aus der Nachricht.',
                'Nachricht löschen und den Absender blockieren.',
                'Bereits Daten eingegeben? Sofort das Passwort ändern und die Bank informieren.',
              ],
            },
            {
              typ: 'achtung',
              text: 'Keine Bank, kein Paketdienst und keine Behörde fragt per E-Mail oder SMS nach PIN, TAN oder Passwort. Niemals.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Eine SMS meldet ein wartendes Paket und verlangt 2,99 € Zollgebühr über einen Link. Was tun Sie?',
          antworten: [
            'Bezahlen, damit das Paket ankommt',
            'Die SMS löschen und im Zweifel in der offiziellen App des Paketdienstes nachsehen',
            'Auf die SMS antworten und nachfragen',
          ],
          richtig: 1,
          erklaerung:
            'Paketdienste kassieren Einfuhrabgaben bei der Zustellung, nicht vorab per SMS-Link. Solche Nachrichten sind Betrug („Smishing“).',
        },
      ],
    },
    {
      id: 'sicherheit-fakeshops',
      titel: 'Fake-Shops beim Online-Einkauf',
      kurz: 'Unschlagbar günstig, nur Vorkasse – und die Ware kommt nie.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Woran Sie einen Fake-Shop erkennen',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Preise, die weit unter dem üblichen Niveau liegen.',
                'Im letzten Schritt der Bestellung bleibt nur noch Vorkasse per Überweisung übrig.',
                'Ein Impressum fehlt, ist unvollständig oder nennt eine Adresse im Ausland.',
                'Gütesiegel sind nur Bilder und lassen sich nicht anklicken oder prüfen.',
                'Die Internetadresse wirkt seltsam oder passt nicht zum Namen des Geschäfts.',
                'Die Seite wirkt zusammenkopiert, Texte sind fehlerhaft übersetzt.',
              ],
            },
            {
              typ: 'tipp',
              text: 'Die Verbraucherzentrale bietet den kostenlosen „Fakeshop-Finder“ an: Dort geben Sie die Internetadresse des Shops ein und bekommen in Sekunden eine Einschätzung. Suchen Sie dazu im Internet nach „Fakeshop-Finder Verbraucherzentrale“.',
            },
          ],
        },
        {
          titel: 'Sicher bezahlen',
          bloecke: [
            {
              typ: 'text',
              text: 'Bezahlen Sie online möglichst auf Rechnung oder per Lastschrift. Eine Überweisung per Vorkasse lässt sich später kaum zurückholen, eine Lastschrift dagegen innerhalb von acht Wochen widerrufen.',
            },
            {
              typ: 'merke',
              text: 'Kein seriöser Händler besteht auf Vorkasse per Überweisung – und schon gar nicht auf Bezahlung mit Gutscheinkarten.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Welche Zahlungsart ist beim Online-Einkauf bei einem unbekannten Shop am riskantesten?',
          antworten: ['Kauf auf Rechnung', 'Lastschrift', 'Vorkasse per Überweisung'],
          richtig: 2,
          erklaerung: 'Überwiesenes Geld ist praktisch nicht zurückzuholen. Rechnung und Lastschrift lassen sich dagegen rückgängig machen.',
        },
      ],
    },
    {
      id: 'sicherheit-gewinn',
      titel: 'Gewinnversprechen, Abo-Fallen und Werbeanrufe',
      kurz: 'Wenn plötzlich Geld auf Sie wartet – oder eine Rechnung für etwas, das Sie nie bestellt haben.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Gewinnversprechen',
          bloecke: [
            {
              typ: 'text',
              text: 'Sie hätten gewonnen, müssten aber zuerst eine Gebühr zahlen oder eine teure Telefonnummer anrufen. Bei einem echten Gewinn zahlen Sie niemals vorher etwas – das ist in Deutschland sogar gesetzlich verboten.',
            },
            {
              typ: 'merke',
              text: 'Wer nie an einem Gewinnspiel teilgenommen hat, kann auch nichts gewonnen haben.',
            },
          ],
        },
        {
          titel: 'Abo-Fallen',
          bloecke: [
            {
              typ: 'text',
              text: 'Ein angeblich kostenloser Test wird nach kurzer Zeit zum teuren Abonnement. Solche Angebote erkennen Sie am Kleingedruckten und daran, dass sofort Ihre Bankverbindung verlangt wird.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Bei Verträgen im Internet haben Sie in der Regel 14 Tage Widerrufsrecht.',
                'Widerruf schriftlich per E-Mail oder Brief senden und eine Kopie aufbewahren.',
                'Unberechtigte Lastschriften können Sie bei Ihrer Bank innerhalb von acht Wochen zurückgeben.',
                'Bei Drohbriefen von Inkassofirmen: nicht einschüchtern lassen, Beratung bei der Verbraucherzentrale holen.',
              ],
            },
          ],
        },
        {
          titel: 'Unerwünschte Werbeanrufe',
          bloecke: [
            {
              typ: 'text',
              text: 'Werbeanrufe ohne Ihre ausdrückliche Einwilligung sind verboten. Am Telefon geschlossene Verträge über Strom, Gas oder Zeitschriften können Sie widerrufen.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Am Telefon niemals „Ja“ auf Fragen sagen, die Sie nicht verstanden haben.',
                'Keine Vertragsdaten oder Zählernummern durchgeben.',
                'Freundlich beenden: „Ich mache am Telefon grundsätzlich keine Geschäfte.“ Dann auflegen.',
                'Hartnäckige Werbeanrufe können Sie bei der Bundesnetzagentur melden.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'sicherheit-support',
      titel: 'Falsche Virenwarnung und angeblicher Computer-Support',
      kurz: 'Ein blinkendes Fenster warnt vor Viren – und genau das ist die Falle.',
      dauerMinuten: 4,
      abschnitte: [
        {
          titel: 'Die Masche',
          bloecke: [
            {
              typ: 'text',
              text: 'Beim Surfen erscheint plötzlich ein lautes, blinkendes Fenster: Ihr Gerät sei mit Viren infiziert, Sie müssten sofort eine Nummer anrufen oder ein Programm installieren. Manchmal ruft auch jemand an und gibt sich als Mitarbeiter eines bekannten Software-Herstellers aus.',
            },
            {
              typ: 'achtung',
              text: 'Kein Hersteller erkennt aus der Ferne einen Virus auf Ihrem Gerät und ruft Sie deswegen an. Wer Sie zur Installation eines Fernwartungsprogramms drängt, will Zugriff auf Ihr Online-Banking.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Nichts anrufen, nichts installieren, keine Nummer wählen.',
                'Das Fenster schließen. Geht das nicht, die App oder den Browser ganz beenden oder das Gerät neu starten.',
                'Am Telefon: sofort auflegen.',
                'Falls Sie bereits ein Programm installiert haben: Gerät vom Internet trennen, jemanden aus der Familie oder einen Fachbetrieb hinzuziehen, Bank informieren.',
              ],
            },
            {
              typ: 'merke',
              text: 'Ein Handy bekommt praktisch nie einfach so einen Virus. Solche Warnungen sind Werbung oder Betrug.',
            },
          ],
        },
      ],
    },
    {
      id: 'sicherheit-liebesbetrug',
      titel: 'Falsche Freundschaften und Liebesbetrug',
      kurz: 'Wenn ein netter Fremder im Internet nach einiger Zeit um Geld bittet.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Wie es abläuft',
          bloecke: [
            {
              typ: 'text',
              text: 'Über soziale Netzwerke, Partnerbörsen oder auch WhatsApp meldet sich eine freundliche, aufmerksame Person. Über Wochen entsteht Vertrauen, oft mit täglichen Nachrichten. Ein Treffen kommt nie zustande – es gibt immer einen Grund. Irgendwann kommt eine Notlage: Krankenhauskosten, ein festhängendes Paket, Zollgebühren, ein blockiertes Konto.',
            },
            {
              typ: 'schritte',
              schritte: [
                'Warnzeichen: Die Person arbeitet angeblich im Ausland, beim Militär, auf einer Bohrinsel oder als Arzt in einer Krisenregion.',
                'Sie weicht Video-Anrufen immer aus.',
                'Die Gefühle entwickeln sich sehr schnell und sehr stark.',
                'Es wird um Geld, Gutscheinkarten oder die Weiterleitung von Zahlungen gebeten.',
              ],
            },
            {
              typ: 'achtung',
              text: 'Leiten Sie niemals Geld für andere weiter und stellen Sie Ihr Konto nicht zur Verfügung. Das kann für Sie selbst strafbar sein (Geldwäsche).',
            },
            {
              typ: 'tipp',
              text: 'Ein Profilfoto lässt sich prüfen: Bei einer Bildersuche im Internet zeigt sich oft, dass das Bild einer ganz anderen Person gehört. Bitten Sie jemanden aus der Familie, das für Sie zu machen.',
            },
          ],
        },
      ],
    },
    {
      id: 'sicherheit-banking',
      titel: 'Sicheres Online-Banking',
      kurz: 'Die Regeln, an die sich Ihre Bank selbst hält – und die Sie kennen sollten.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Grundregeln',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Die Banking-App immer selbst öffnen, nie über einen Link aus einer Nachricht.',
                'PIN und TAN niemals weitergeben – auch nicht an angebliche Bankmitarbeiter.',
                'Eine TAN gilt immer für genau einen Auftrag: Prüfen Sie Betrag und Empfänger, die in der TAN-Nachricht stehen.',
                'Kein Bankgeschäft in fremdem, offenem WLAN.',
                'Kontobewegungen regelmäßig durchsehen.',
              ],
            },
            {
              typ: 'achtung',
              text: 'Ein häufiger Trick: Angebliche Bankmitarbeiter melden sich wegen eines „verdächtigen Zugriffs“ und bitten Sie, eine TAN zu nennen oder in der App zu bestätigen. Damit geben Sie in Wahrheit eine Überweisung frei. Legen Sie auf und rufen Sie Ihre Bank unter der Nummer auf Ihrer Bankkarte zurück.',
            },
            {
              typ: 'merke',
              text: 'Eine TAN bestätigt immer eine Aktion, die Sie selbst ausgelöst haben. Wenn Sie nichts getan haben, bestätigen Sie nichts.',
            },
          ],
        },
      ],
      quiz: [
        {
          frage: 'Eine Bankmitarbeiterin ruft an und bittet Sie, eine TAN vorzulesen, um Ihr Konto zu schützen. Was tun Sie?',
          antworten: [
            'Die TAN nennen, damit das Konto geschützt wird',
            'Auflegen und die Bank unter der Nummer von der Bankkarte zurückrufen',
            'Die TAN per SMS zurücksenden',
          ],
          richtig: 1,
          erklaerung: 'Banken fragen niemals nach TANs. Eine genannte TAN gibt in aller Regel eine Überweisung der Betrüger frei.',
        },
      ],
    },
    {
      id: 'sicherheit-notfall',
      titel: 'Es ist passiert – was jetzt?',
      kurz: 'Die richtige Reihenfolge in den ersten Stunden. Scham ist hier fehl am Platz.',
      dauerMinuten: 5,
      abschnitte: [
        {
          titel: 'Sofort handeln',
          bloecke: [
            {
              typ: 'schritte',
              schritte: [
                'Bank anrufen und die Überweisung stoppen lassen. Je schneller, desto besser – manchmal gelingt ein Rückruf der Zahlung.',
                'Karten und Online-Banking sperren: Sperr-Notruf 116 116, rund um die Uhr, aus Deutschland kostenfrei.',
                'Passwörter der betroffenen Konten ändern, von einem sicheren Gerät aus.',
                'Anzeige bei der Polizei erstatten – online oder auf jeder Dienststelle, Notruf 110.',
                'Beweise sichern: Bildschirmfotos, Nachrichten, Kontoauszüge, Telefonnummern.',
                'Mit der Familie oder der Verbraucherzentrale sprechen.',
              ],
            },
            {
              typ: 'merke',
              text: 'Betrogen zu werden ist keine Dummheit. Die Täter sind Profis und arbeiten mit den stärksten Gefühlen, die es gibt. Sich schnell Hilfe zu holen, ist das Klügste, was Sie tun können.',
            },
            {
              typ: 'tipp',
              text: 'In dieser App finden Sie unter „Hilfe“ alle Notfallnummern zum direkten Anwählen.',
            },
          ],
        },
      ],
    },
  ],
};
