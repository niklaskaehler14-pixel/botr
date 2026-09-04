/** Notfallnummern und Erste-Hilfe-Anleitungen bei Betrug. Angaben für Deutschland. */

export type Notrufnummer = {
  id: string;
  nummer: string;
  /** Nummer ohne Leerzeichen, für die Wählfunktion. */
  waehlen: string;
  titel: string;
  beschreibung: string;
  symbol: string;
  dringend?: boolean;
};

export const notrufnummern: Notrufnummer[] = [
  {
    id: 'rettung',
    nummer: '112',
    waehlen: '112',
    titel: 'Notruf – Rettungsdienst und Feuerwehr',
    beschreibung: 'Bei Lebensgefahr, Unfall, Herzbeschwerden, Atemnot oder Feuer. Rund um die Uhr, kostenfrei.',
    symbol: '🚑',
    dringend: true,
  },
  {
    id: 'polizei',
    nummer: '110',
    waehlen: '110',
    titel: 'Polizei',
    beschreibung: 'Bei Straftaten, Bedrohung, verdächtigen Personen an der Tür und für Anzeigen nach Betrug.',
    symbol: '👮',
    dringend: true,
  },
  {
    id: 'sperrnotruf',
    nummer: '116 116',
    waehlen: '116116',
    titel: 'Sperr-Notruf für Karten',
    beschreibung:
      'Sperrt Bankkarte, Kreditkarte und Online-Banking. Sofort anrufen, wenn Karte oder Daten in falsche Hände geraten sind. Rund um die Uhr, aus Deutschland kostenfrei.',
    symbol: '💳',
    dringend: true,
  },
  {
    id: 'bereitschaft',
    nummer: '116 117',
    waehlen: '116117',
    titel: 'Ärztlicher Bereitschaftsdienst',
    beschreibung: 'Wenn die Praxis geschlossen hat und es kein lebensbedrohlicher Notfall ist.',
    symbol: '🩺',
  },
  {
    id: 'seelsorge',
    nummer: '0800 111 0 111',
    waehlen: '08001110111',
    titel: 'Telefonseelsorge',
    beschreibung:
      'Wenn Sie jemanden zum Reden brauchen – auch nach einem Betrug, bei Scham oder Sorgen. Kostenfrei, rund um die Uhr, vertraulich. Alternativ: 0800 111 0 222.',
    symbol: '🫂',
  },
];

export type Soforthilfe = {
  id: string;
  titel: string;
  symbol: string;
  wann: string;
  schritte: string[];
  hinweis?: string;
};

export const soforthilfen: Soforthilfe[] = [
  {
    id: 'geld-ueberwiesen',
    titel: 'Ich habe Geld an Betrüger überwiesen',
    symbol: '💸',
    wann: 'Überweisung, Echtzeitüberweisung oder Bargeldübergabe ist bereits erfolgt.',
    schritte: [
      'Sofort die Bank anrufen (Nummer auf Ihrer Bankkarte oder Ihrem Kontoauszug) und die Überweisung stoppen oder zurückrufen lassen. Jede Minute zählt.',
      'Bankkarte und Online-Banking sperren lassen: Sperr-Notruf 116 116.',
      'Anzeige bei der Polizei erstatten – Notruf 110 oder jede Dienststelle. Auch online über die Internetwache Ihres Bundeslandes möglich.',
      'Alle Beweise sichern: Bildschirmfotos der Nachrichten, Telefonnummern, Kontodaten des Empfängers, Überweisungsbeleg.',
      'Falls Sie Zugangsdaten verraten haben: Passwörter von einem anderen, sicheren Gerät aus ändern.',
      'Jemandem aus der Familie Bescheid geben und sich Unterstützung holen.',
    ],
    hinweis:
      'Sie haben keinen Fehler aus Dummheit gemacht. Die Täter sind Profis. Schnelles Handeln ist jetzt das Wichtigste.',
  },
  {
    id: 'karte-weg',
    titel: 'Karte, Handy oder Ausweis verloren',
    symbol: '📇',
    wann: 'Etwas ist weg oder wurde gestohlen.',
    schritte: [
      'Karten sofort sperren: Sperr-Notruf 116 116 (rund um die Uhr).',
      'Bei gestohlenem Handy zusätzlich die SIM-Karte beim Mobilfunkanbieter sperren lassen.',
      'Handy aus der Ferne sperren oder orten: iPhone über iCloud „Wo ist?“, Android über „Mein Gerät finden“ im Google-Konto.',
      'Diebstahl bei der Polizei anzeigen – für Versicherung und zum Nachweis.',
      'Passwörter der wichtigsten Konten ändern, allen voran das E-Mail-Konto.',
    ],
  },
  {
    id: 'verdaechtige-nachricht',
    titel: 'Ich habe eine verdächtige Nachricht bekommen',
    symbol: '✉️',
    wann: 'SMS, WhatsApp oder E-Mail mit Link, Geldforderung oder seltsamem Absender.',
    schritte: [
      'Nicht antworten, nicht auf Links tippen, keine Anhänge öffnen.',
      'Handelt es sich angeblich um Familie: unter der bekannten alten Nummer anrufen.',
      'Handelt es sich angeblich um Bank, Paketdienst oder Behörde: die offizielle App öffnen oder die Nummer von Rechnung beziehungsweise Karte anrufen.',
      'Absender blockieren und die Nachricht melden (in WhatsApp: Nummer antippen, „Melden und blockieren“).',
      'Nachricht anschließend löschen.',
    ],
    hinweis: 'Im Zweifel ist es immer richtig, nichts zu tun und jemanden zu fragen.',
  },
  {
    id: 'daten-verraten',
    titel: 'Ich habe Passwort, PIN oder TAN verraten',
    symbol: '🔓',
    wann: 'Daten auf einer Internetseite eingegeben oder am Telefon genannt.',
    schritte: [
      'Handelt es sich um Bankdaten: sofort Bank anrufen und Konto beziehungsweise Karte sperren lassen (116 116).',
      'Passwort des betroffenen Kontos sofort ändern – von einem Gerät aus, das sicher ist.',
      'Dasselbe Passwort überall dort ändern, wo Sie es ebenfalls benutzt haben.',
      'Zwei-Faktor-Anmeldung für das Konto einschalten.',
      'Kontobewegungen und E-Mail-Postfach die nächsten Wochen aufmerksam durchsehen.',
      'Anzeige bei der Polizei erstatten.',
    ],
  },
  {
    id: 'whatsapp-uebernommen',
    titel: 'Mein WhatsApp-Konto wurde übernommen',
    symbol: '💬',
    wann: 'Sie wurden aus WhatsApp abgemeldet oder Bekannte erhalten seltsame Nachrichten von Ihnen.',
    schritte: [
      'WhatsApp erneut öffnen und Ihre Telefonnummer neu bestätigen. Damit werden Fremde automatisch abgemeldet.',
      'Sofort die „Verifizierung in zwei Schritten“ einschalten (Einstellungen, Konto) und eine eigene PIN vergeben.',
      'Familie und Bekannte warnen, dass in Ihrem Namen Nachrichten verschickt wurden.',
      'Falls jemand bereits Geld überwiesen hat: Diese Person soll sofort ihre Bank anrufen und Anzeige erstatten.',
    ],
  },
  {
    id: 'anruf-laeuft',
    titel: 'Gerade ruft jemand Verdächtiges an',
    symbol: '📞',
    wann: 'Angeblicher Notfall in der Familie, Polizei, Bank oder Gewinnmitteilung am Telefon.',
    schritte: [
      'Legen Sie auf. Sie müssen sich nicht rechtfertigen und nicht höflich bleiben.',
      'Nichts bestätigen, keine Namen nennen, keine Daten durchgeben, kein „Ja“ sagen.',
      'Rufen Sie danach selbst zurück – bei der Nummer, die Sie kennen. Wählen Sie neu, benutzen Sie nicht die Rückruftaste.',
      'Sprechen Sie mit einer Vertrauensperson, bevor Sie irgendetwas unternehmen.',
      'Melden Sie den Anruf der Polizei unter 110, auch wenn nichts passiert ist.',
    ],
    hinweis: 'Die echte Polizei fordert niemals Geld oder Wertsachen. 110 erscheint bei echten Anrufen nie im Display.',
  },
];

export function findeSoforthilfe(id?: string | string[]): Soforthilfe | undefined {
  const key = Array.isArray(id) ? id[0] : id;
  return soforthilfen.find((s) => s.id === key);
}
