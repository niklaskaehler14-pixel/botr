import { Text, type TextProps, type TextStyle } from 'react-native';

import { useSettings } from '@/lib/settings';
import type { FontSizeName } from '@/constants/theme';

type Variante = FontSizeName;

export type AppTextProps = TextProps & {
  variante?: Variante;
  /** Gedämpfte Farbe für Nebeninformationen. */
  gedaempft?: boolean;
  fett?: boolean;
  farbe?: string;
  zentriert?: boolean;
};

const GEWICHT: Record<Variante, TextStyle['fontWeight']> = {
  caption: '500',
  body: '400',
  lead: '400',
  heading: '700',
  title: '700',
  display: '800',
};

/** Textbaustein der App. Berücksichtigt automatisch die eingestellte Schriftgröße. */
export function AppText({ variante = 'body', gedaempft, fett, farbe, zentriert, style, ...props }: AppTextProps) {
  const { colors, fontSize } = useSettings();
  const groesse = fontSize(variante);
  return (
    <Text
      {...props}
      style={[
        {
          color: farbe ?? (gedaempft ? colors.textMuted : colors.text),
          fontSize: groesse,
          lineHeight: Math.round(groesse * 1.45),
          fontWeight: fett ? '700' : GEWICHT[variante],
          textAlign: zentriert ? 'center' : 'left',
        },
        style,
      ]}
    />
  );
}
