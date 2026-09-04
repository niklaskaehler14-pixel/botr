/** Kurze Tipps für die Startseite. Es wird jeden Tag ein anderer angezeigt. */
export const tagesTipps: string[] = [
  'Legen Sie mit Ihrer Familie ein Kennwort fest. Bei jedem Notruf-Anruf fragen Sie danach – wer es nicht kennt, ist nicht Ihre Familie.',
  'Sie müssen nie sofort antworten. Seriöse Anliegen haben immer Zeit für einen Rückruf.',
  'Legen Sie bei verdächtigen Anrufen einfach auf. Das ist nicht unhöflich, sondern klug.',
  'Ein Passwort aus vier zusammenhanglosen Wörtern ist sicherer als ein kurzes mit Sonderzeichen.',
  'Geben Sie einen zugeschickten Bestätigungscode niemals weiter – an niemanden.',
  'Zu Hause im WLAN verbrauchen Videoanrufe kein Datenvolumen.',
  'Die echte Polizei verlangt niemals Geld, Kaution oder Wertsachen.',
  'Öffnen Sie Bank-Apps immer selbst, nie über einen Link aus einer Nachricht.',
  'Machen Sie einen Screenshot von verdächtigen Nachrichten – das hilft bei der Anzeige.',
  'Wenn ein Fenster vor Viren warnt und zum Anrufen auffordert: Es ist immer Betrug.',
  'Die Schrift auf Ihrem Handy können Sie jederzeit größer stellen – unter Einstellungen, Anzeige.',
  'Bei „Hallo Mama, neue Nummer“ rufen Sie immer unter der alten Nummer an.',
  'Bezahlen Sie in unbekannten Online-Shops nie per Vorkasse-Überweisung.',
  'Updates sind kostenlos und schließen Sicherheitslücken. Am besten automatisch einschalten.',
];

export function tippDesTages(datum = new Date()): string {
  const tagImJahr = Math.floor((datum.getTime() - new Date(datum.getFullYear(), 0, 0).getTime()) / 86400000);
  return tagesTipps[tagImJahr % tagesTipps.length];
}
