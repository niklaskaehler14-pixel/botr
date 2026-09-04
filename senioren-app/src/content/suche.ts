import { alleLektionen } from './kurse';
import { glossar } from './glossar';
import { soforthilfen } from './notfall';
import { lektionAlsText } from './types';

export type Treffer = {
  id: string;
  titel: string;
  untertitel: string;
  art: 'Lektion' | 'Begriff' | 'Soforthilfe';
  /** Ziel innerhalb der App. */
  pfad: string;
};

type IndexEintrag = Treffer & { suchtext: string };

const index: IndexEintrag[] = [
  ...alleLektionen().map(({ lektion, kurs }) => ({
    id: `lektion-${lektion.id}`,
    titel: lektion.titel,
    untertitel: kurs.titel,
    art: 'Lektion' as const,
    pfad: `/lektion/${lektion.id}`,
    suchtext: `${lektion.titel} ${kurs.titel} ${lektionAlsText(lektion)}`.toLowerCase(),
  })),
  ...glossar.map((eintrag) => ({
    id: `begriff-${eintrag.begriff}`,
    titel: eintrag.begriff,
    untertitel: eintrag.erklaerung,
    art: 'Begriff' as const,
    pfad: '/glossar',
    suchtext: `${eintrag.begriff} ${eintrag.erklaerung}`.toLowerCase(),
  })),
  ...soforthilfen.map((hilfe) => ({
    id: `hilfe-${hilfe.id}`,
    titel: hilfe.titel,
    untertitel: hilfe.wann,
    art: 'Soforthilfe' as const,
    pfad: `/soforthilfe/${hilfe.id}`,
    suchtext: `${hilfe.titel} ${hilfe.wann} ${hilfe.schritte.join(' ')}`.toLowerCase(),
  })),
];

/** Sucht nach allen eingegebenen Wörtern. Groß- und Kleinschreibung spielt keine Rolle. */
export function suche(begriff: string): Treffer[] {
  const woerter = begriff.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (woerter.length === 0) return [];
  return index
    .filter((eintrag) => woerter.every((wort) => eintrag.suchtext.includes(wort)))
    .slice(0, 40)
    .map(({ suchtext: _suchtext, ...treffer }) => treffer);
}
