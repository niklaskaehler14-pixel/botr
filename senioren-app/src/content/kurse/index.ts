import type { Kurs, Lektion } from '../types';
import { alltag } from './alltag';
import { grundlagen } from './grundlagen';
import { kontakt } from './kontakt';
import { passwoerter } from './passwoerter';
import { sicherheit } from './sicherheit';
import { whatsapp } from './whatsapp';

export const kurse: Kurs[] = [grundlagen, whatsapp, sicherheit, passwoerter, kontakt, alltag];

export function findeKurs(kursId?: string | string[]): Kurs | undefined {
  const id = Array.isArray(kursId) ? kursId[0] : kursId;
  return kurse.find((k) => k.id === id);
}

export type LektionMitKurs = { lektion: Lektion; kurs: Kurs; index: number };

export function findeLektion(lektionId?: string | string[]): LektionMitKurs | undefined {
  const id = Array.isArray(lektionId) ? lektionId[0] : lektionId;
  if (!id) return undefined;
  for (const kurs of kurse) {
    const index = kurs.lektionen.findIndex((l) => l.id === id);
    if (index >= 0) return { lektion: kurs.lektionen[index], kurs, index };
  }
  return undefined;
}

export function alleLektionen(): LektionMitKurs[] {
  return kurse.flatMap((kurs) => kurs.lektionen.map((lektion, index) => ({ lektion, kurs, index })));
}

export const anzahlLektionen = kurse.reduce((summe, kurs) => summe + kurs.lektionen.length, 0);
