import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from './text';
import { useSettings } from '@/lib/settings';
import { Radius, Spacing } from '@/constants/theme';

export type HinweisArt = 'tipp' | 'achtung' | 'merke' | 'beispiel' | 'info';

type Props = {
  art: HinweisArt;
  text: string;
  titel?: string;
};

/** Farbig hervorgehobener Kasten für Tipps, Warnungen und Merksätze. */
export function Hinweis({ art, text, titel }: Props) {
  const { colors, scale } = useSettings();

  const stil = {
    tipp: { hintergrund: colors.successBg, rand: colors.success, symbol: 'lightbulb' as const, ueberschrift: 'Tipp' },
    achtung: { hintergrund: colors.dangerBg, rand: colors.danger, symbol: 'warning' as const, ueberschrift: 'Achtung' },
    merke: { hintergrund: colors.warningBg, rand: colors.warning, symbol: 'push-pin' as const, ueberschrift: 'Zum Merken' },
    beispiel: { hintergrund: colors.infoBg, rand: colors.info, symbol: 'chat-bubble-outline' as const, ueberschrift: 'Beispiel' },
    info: { hintergrund: colors.infoBg, rand: colors.info, symbol: 'info' as const, ueberschrift: 'Hinweis' },
  }[art];

  return (
    <View
      accessible
      accessibilityLabel={`${titel ?? stil.ueberschrift}: ${text}`}
      style={[styles.kasten, { backgroundColor: stil.hintergrund, borderColor: stil.rand }]}>
      <View style={styles.kopf}>
        <MaterialIcons name={stil.symbol} size={scale(24)} color={stil.rand} />
        <AppText variante="caption" fett farbe={stil.rand} style={styles.ueberschrift}>
          {(titel ?? stil.ueberschrift).toUpperCase()}
        </AppText>
      </View>
      <AppText variante="body">{text}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  kasten: {
    borderRadius: Radius.md,
    borderLeftWidth: 6,
    borderWidth: 1,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
  },
  kopf: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xs },
  ueberschrift: { marginLeft: Spacing.sm, letterSpacing: 1 },
});
