/** Datenmodell für alle Lerninhalte der App. */

export type Block =
  | { typ: 'text'; text: string }
  | { typ: 'schritte'; schritte: string[] }
  | { typ: 'tipp'; text: string }
  | { typ: 'achtung'; text: string }
  | { typ: 'merke'; text: string }
  | { typ: 'beispiel'; titel: string; text: string }
  /** Anleitung, die sich auf iPhone und Android-Handy unterscheidet. */
  | { typ: 'plattform'; ios: string[]; android: string[]; hinweis?: string };

export type QuizFrage = {
  frage: string;
  antworten: string[];
  /** Index der richtigen Antwort in `antworten`. */
  richtig: number;
  erklaerung: string;
};

export type Abschnitt = {
  titel: string;
  bloecke: Block[];
};

export type Lektion = {
  id: string;
  titel: string;
  kurz: string;
  dauerMinuten: number;
  abschnitte: Abschnitt[];
  quiz?: QuizFrage[];
};

export type Kurs = {
  id: string;
  titel: string;
  untertitel: string;
  symbol: string;
  beschreibung: string;
  lektionen: Lektion[];
};

/** Wandelt eine Lektion in reinen Text um – für die Vorlesefunktion und die Suche. */
export function lektionAlsText(lektion: Lektion): string {
  const teile: string[] = [lektion.titel, lektion.kurz];
  for (const abschnitt of lektion.abschnitte) {
    teile.push(abschnitt.titel);
    for (const block of abschnitt.bloecke) {
      switch (block.typ) {
        case 'text':
          teile.push(block.text);
          break;
        case 'schritte':
          block.schritte.forEach((s, i) => teile.push(`Schritt ${i + 1}: ${s}`));
          break;
        case 'tipp':
          teile.push(`Tipp: ${block.text}`);
          break;
        case 'achtung':
          teile.push(`Achtung: ${block.text}`);
          break;
        case 'merke':
          teile.push(`Merken Sie sich: ${block.text}`);
          break;
        case 'beispiel':
          teile.push(`Beispiel, ${block.titel}: ${block.text}`);
          break;
        case 'plattform':
          teile.push('Auf dem iPhone: ' + block.ios.join(' '));
          teile.push('Auf einem Android-Handy: ' + block.android.join(' '));
          if (block.hinweis) teile.push(block.hinweis);
          break;
      }
    }
  }
  return teile.join('\n');
}
