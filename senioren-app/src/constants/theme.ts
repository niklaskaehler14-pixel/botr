/**
 * Farb- und Größenwerte der App.
 *
 * Die Werte sind bewusst auf hohe Lesbarkeit ausgelegt:
 * - starke Kontraste (mindestens WCAG AA für Text)
 * - große Grundschrift (Basis 20 statt der üblichen 14–16)
 * - große Mindest-Klickflächen (mindestens 60 Punkte Höhe)
 */

export type ColorScheme = 'light' | 'dark';

export type Palette = {
  background: string;
  surface: string;
  surfaceStrong: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryPressed: string;
  onPrimary: string;
  border: string;
  borderStrong: string;
  focus: string;
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  danger: string;
  dangerBg: string;
  info: string;
  infoBg: string;
};

export const Colors: Record<ColorScheme, Palette> = {
  light: {
    background: '#FFFFFF',
    surface: '#F1F5F9',
    surfaceStrong: '#E2E8F0',
    text: '#111827',
    textMuted: '#44515F',
    primary: '#0B5FA5',
    primaryPressed: '#08477A',
    onPrimary: '#FFFFFF',
    border: '#C3CEDA',
    borderStrong: '#8A9AAA',
    focus: '#0B5FA5',
    success: '#166534',
    successBg: '#E7F5EC',
    warning: '#8A4B00',
    warningBg: '#FDF3E3',
    danger: '#A11616',
    dangerBg: '#FCEBEA',
    info: '#0B5FA5',
    infoBg: '#E8F1FA',
  },
  dark: {
    background: '#0F141A',
    surface: '#1A222C',
    surfaceStrong: '#26313D',
    text: '#F4F7FA',
    textMuted: '#C3CEDA',
    primary: '#3A8DDB',
    primaryPressed: '#2C6FAE',
    onPrimary: '#FFFFFF',
    border: '#3A4756',
    borderStrong: '#5B6B7C',
    focus: '#8CC2F5',
    success: '#7BD3A0',
    successBg: '#12291D',
    warning: '#F0B357',
    warningBg: '#2E2413',
    danger: '#FF8E85',
    dangerBg: '#2E1614',
    info: '#8CC2F5',
    infoBg: '#132231',
  },
};

/** Basis-Schriftgrößen. Sie werden zusätzlich mit dem Faktor aus den Einstellungen multipliziert. */
export const FontSizes = {
  caption: 16,
  body: 20,
  lead: 22,
  heading: 26,
  title: 32,
  display: 38,
} as const;

export type FontSizeName = keyof typeof FontSizes;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 14,
  lg: 20,
} as const;

/** Mindesthöhe für alles, was angetippt werden kann. */
export const MinTouchSize = 60;

export const MaxContentWidth = 720;
