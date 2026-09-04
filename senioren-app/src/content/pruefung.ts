/**
 * „Ist das Betrug?“ – ein einfacher Frage-Assistent.
 *
 * Der Nutzer beantwortet nacheinander Ja/Nein-Fragen. Manche Antworten sind
 * allein schon ein sicheres Warnzeichen (`sofortRot`), andere zählen als Punkte.
 */

export type Pruefungsfrage = {
  id: string;
  frage: string;
  erlaeuterung: string;
  /** Punkte, wenn mit „Ja“ geantwortet wird. */
  punkte: number;
  /** Ein „Ja“ bedeutet unabhängig von der Punktzahl höchste Warnstufe. */
  sofortRot?: boolean;
};

export const pruefungsfragen: Pruefungsfrage[] = [
  {
    id: 'unerwartet',
    frage: 'Kam der Kontakt unerwartet auf Sie zu?',
    erlaeuterung: 'Ein Anruf, eine SMS, eine E-Mail oder eine Nachricht, mit der Sie nicht gerechnet haben.',
    punkte: 1,
  },
  {
    id: 'eile',
    frage: 'Werden Sie zur Eile gedrängt?',
    erlaeuterung: '„Sofort“, „nur heute“, „sonst wird das Konto gesperrt“, „sonst kommt sie in Haft“.',
    punkte: 2,
  },
  {
    id: 'geheim',
    frage: 'Sollen Sie mit niemandem darüber sprechen?',
    erlaeuterung: 'Betrüger wollen verhindern, dass Familie oder Bankmitarbeiter Sie warnen.',
    punkte: 3,
    sofortRot: true,
  },
  {
    id: 'geld',
    frage: 'Geht es um Geld, Gutscheinkarten, Bargeld oder Schmuck?',
    erlaeuterung: 'Auch: eine Zahlung weiterleiten oder das eigene Konto zur Verfügung stellen.',
    punkte: 2,
  },
  {
    id: 'zugangsdaten',
    frage: 'Wird nach PIN, TAN, Passwort oder einem zugeschickten Code gefragt?',
    erlaeuterung: 'Keine Bank, kein Unternehmen und keine Behörde fragt danach. Wirklich keine.',
    punkte: 3,
    sofortRot: true,
  },
  {
    id: 'neue-nummer',
    frage: 'Schreibt jemand von einer neuen oder unbekannten Nummer und gibt sich als Verwandter aus?',
    erlaeuterung: 'Die bekannteste Masche überhaupt: „Hallo Mama, ich habe eine neue Nummer.“',
    punkte: 3,
    sofortRot: true,
  },
  {
    id: 'link',
    frage: 'Sollen Sie auf einen Link tippen oder ein Programm installieren?',
    erlaeuterung: 'Besonders bei angeblichen Paketen, Kontosperrungen oder Virenwarnungen.',
    punkte: 2,
  },
  {
    id: 'gewinn',
    frage: 'Werden Ihnen ein Gewinn, eine Erbschaft oder hohe Gewinne mit Geldanlagen versprochen?',
    erlaeuterung: 'Vor allem, wenn Sie vorher eine Gebühr zahlen oder Daten angeben sollen.',
    punkte: 2,
  },
];

export type Ampel = 'gruen' | 'gelb' | 'rot';

export type Auswertung = {
  ampel: Ampel;
  titel: string;
  text: string;
  empfehlungen: string[];
};

export function werteAus(antworten: Record<string, boolean>): Auswertung {
  let punkte = 0;
  let sofortRot = false;
  for (const frage of pruefungsfragen) {
    if (antworten[frage.id]) {
      punkte += frage.punkte;
      if (frage.sofortRot) sofortRot = true;
    }
  }

  if (sofortRot || punkte >= 6) {
    return {
      ampel: 'rot',
      titel: 'Sehr wahrscheinlich Betrug',
      text: 'Ihre Angaben passen genau auf bekannte Betrugsmaschen. Gehen Sie auf keinen Fall auf die Forderung ein.',
      empfehlungen: [
        'Nichts überweisen, nichts bestätigen, keine Daten nennen.',
        'Kontakt beenden: auflegen, Nachricht nicht beantworten.',
        'Über eine Ihnen bekannte Nummer bei der echten Person oder Stelle nachfragen.',
        'Mit einer Vertrauensperson sprechen.',
        'Den Vorfall der Polizei melden – Notruf 110.',
      ],
    };
  }

  if (punkte >= 3) {
    return {
      ampel: 'gelb',
      titel: 'Vorsicht geboten',
      text: 'Einiges spricht für einen Betrugsversuch. Lassen Sie sich Zeit und prüfen Sie in Ruhe nach.',
      empfehlungen: [
        'Nichts unter Zeitdruck entscheiden – seriöse Anliegen haben Zeit.',
        'Rückfrage über einen Weg, den Sie selbst kennen (bekannte Nummer, offizielle App).',
        'Keine Links antippen und keine Daten eingeben, bevor das geklärt ist.',
        'Jemanden aus der Familie um eine zweite Meinung bitten.',
      ],
    };
  }

  return {
    ampel: 'gruen',
    titel: 'Keine typischen Warnzeichen',
    text: 'Nach Ihren Angaben liegen keine klaren Betrugsmerkmale vor. Aufmerksam bleiben schadet trotzdem nie.',
    empfehlungen: [
      'Geben Sie Zugangsdaten grundsätzlich niemals weiter.',
      'Prüfen Sie Absender und Internetadressen genau.',
      'Bei einem unguten Gefühl: nachfragen, bevor Sie handeln.',
    ],
  };
}
