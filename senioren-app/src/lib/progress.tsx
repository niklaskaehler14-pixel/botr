import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { loadJson, saveJson } from './storage';

const STORAGE_KEY = 'senioren-app/fortschritt/v1';

export type ProgressState = {
  /** IDs der abgeschlossenen Lektionen. */
  abgeschlossen: string[];
  /** IDs der gemerkten Lektionen. */
  merkliste: string[];
  /** Zuletzt geöffnete Lektion, für "Weitermachen" auf der Startseite. */
  zuletzt: string | null;
};

const DEFAULT_STATE: ProgressState = { abgeschlossen: [], merkliste: [], zuletzt: null };

type ProgressContextValue = {
  state: ProgressState;
  loading: boolean;
  istAbgeschlossen: (lessonId: string) => boolean;
  istGemerkt: (lessonId: string) => boolean;
  markiereAbgeschlossen: (lessonId: string) => void;
  entferneAbgeschlossen: (lessonId: string) => void;
  toggleMerkliste: (lessonId: string) => void;
  merkeZuletzt: (lessonId: string) => void;
  zuruecksetzen: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadJson<Partial<ProgressState>>(STORAGE_KEY, {}).then((stored) => {
      if (!active) return;
      setState({ ...DEFAULT_STATE, ...stored });
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const update = useCallback((change: (current: ProgressState) => ProgressState) => {
    setState((current) => {
      const next = change(current);
      // Unveränderte Zustände nicht erneut speichern (spart Schreibvorgänge).
      if (next === current) return current;
      void saveJson(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      loading,
      istAbgeschlossen: (id) => state.abgeschlossen.includes(id),
      istGemerkt: (id) => state.merkliste.includes(id),
      markiereAbgeschlossen: (id) =>
        update((c) => (c.abgeschlossen.includes(id) ? c : { ...c, abgeschlossen: [...c.abgeschlossen, id] })),
      entferneAbgeschlossen: (id) =>
        update((c) => ({ ...c, abgeschlossen: c.abgeschlossen.filter((x) => x !== id) })),
      toggleMerkliste: (id) =>
        update((c) => ({
          ...c,
          merkliste: c.merkliste.includes(id) ? c.merkliste.filter((x) => x !== id) : [...c.merkliste, id],
        })),
      merkeZuletzt: (id) => update((c) => (c.zuletzt === id ? c : { ...c, zuletzt: id })),
      zuruecksetzen: () => update(() => DEFAULT_STATE),
    }),
    [state, loading, update]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress muss innerhalb von <ProgressProvider> verwendet werden.');
  return ctx;
}
