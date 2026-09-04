import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { loadJson, saveJson } from './storage';
import { Colors, FontSizes, type ColorScheme, type FontSizeName, type Palette } from '@/constants/theme';

const STORAGE_KEY = 'senioren-app/einstellungen/v1';

export type TextSizeKey = 'normal' | 'gross' | 'sehrGross';
export type ThemeKey = 'system' | 'hell' | 'dunkel';

export const TEXT_SIZE_FACTORS: Record<TextSizeKey, number> = {
  normal: 1,
  gross: 1.2,
  sehrGross: 1.45,
};

export const TEXT_SIZE_LABELS: Record<TextSizeKey, string> = {
  normal: 'Normal',
  gross: 'Groß',
  sehrGross: 'Sehr groß',
};

export const THEME_LABELS: Record<ThemeKey, string> = {
  system: 'Wie das Handy',
  hell: 'Hell',
  dunkel: 'Dunkel',
};

export type Settings = {
  textSize: TextSizeKey;
  theme: ThemeKey;
  /** Vorlese-Knopf auf den Lernseiten anzeigen. */
  vorlesen: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  textSize: 'gross',
  theme: 'system',
  vorlesen: true,
};

type SettingsContextValue = {
  settings: Settings;
  /** true, solange die gespeicherten Einstellungen noch geladen werden. */
  loading: boolean;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
  /** Aktive Farbpalette (hell oder dunkel). */
  colors: Palette;
  scheme: ColorScheme;
  /** Schriftgröße in Punkten inklusive Vergrößerungsfaktor. */
  fontSize: (name: FontSizeName) => number;
  /** Beliebigen Punktwert mit dem Vergrößerungsfaktor umrechnen. */
  scale: (value: number) => number;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadJson<Partial<Settings>>(STORAGE_KEY, {}).then((stored) => {
      if (!active) return;
      setSettings({ ...DEFAULT_SETTINGS, ...stored });
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const setSetting = useCallback<SettingsContextValue['setSetting']>((key, value) => {
    setSettings((current) => {
      const next = { ...current, [key]: value };
      void saveJson(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    void saveJson(STORAGE_KEY, DEFAULT_SETTINGS);
  }, []);

  const value = useMemo<SettingsContextValue>(() => {
    const scheme: ColorScheme =
      settings.theme === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : settings.theme === 'dunkel' ? 'dark' : 'light';
    const factor = TEXT_SIZE_FACTORS[settings.textSize];
    return {
      settings,
      loading,
      setSetting,
      resetSettings,
      colors: Colors[scheme],
      scheme,
      fontSize: (name) => Math.round(FontSizes[name] * factor),
      scale: (v) => Math.round(v * factor),
    };
  }, [settings, loading, setSetting, resetSettings, systemScheme]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings muss innerhalb von <SettingsProvider> verwendet werden.');
  return ctx;
}
