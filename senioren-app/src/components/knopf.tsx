import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from './text';
import { useSettings } from '@/lib/settings';
import { MinTouchSize, Radius, Spacing } from '@/constants/theme';

type Art = 'haupt' | 'neben' | 'gefahr' | 'still';

export type KnopfProps = {
  titel: string;
  /** Zusätzliche Erklärung unter dem Titel. */
  untertitel?: string;
  onPress: () => void;
  art?: Art;
  symbol?: keyof typeof MaterialIcons.glyphMap;
  deaktiviert?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Für Sprachausgabe, falls der sichtbare Text nicht ausreicht. */
  hinweisFuerVorlesen?: string;
};

/** Großer, gut sichtbarer Knopf. Mindesthöhe 60 Punkte, klare Beschriftung. */
export function Knopf({
  titel,
  untertitel,
  onPress,
  art = 'haupt',
  symbol,
  deaktiviert,
  style,
  hinweisFuerVorlesen,
}: KnopfProps) {
  const { colors, scale } = useSettings();

  const farben = {
    haupt: { hintergrund: colors.primary, gedrueckt: colors.primaryPressed, text: colors.onPrimary, rand: colors.primary },
    neben: { hintergrund: colors.surface, gedrueckt: colors.surfaceStrong, text: colors.text, rand: colors.borderStrong },
    gefahr: { hintergrund: colors.danger, gedrueckt: colors.danger, text: '#FFFFFF', rand: colors.danger },
    still: { hintergrund: 'transparent', gedrueckt: colors.surface, text: colors.primary, rand: 'transparent' },
  }[art];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={hinweisFuerVorlesen ?? (untertitel ? `${titel}. ${untertitel}` : titel)}
      accessibilityState={{ disabled: !!deaktiviert }}
      disabled={deaktiviert}
      onPress={onPress}
      style={({ pressed }) => [
        styles.knopf,
        {
          minHeight: scale(MinTouchSize),
          backgroundColor: pressed ? farben.gedrueckt : farben.hintergrund,
          borderColor: farben.rand,
          opacity: deaktiviert ? 0.5 : 1,
        },
        style,
      ]}>
      {symbol ? <MaterialIcons name={symbol} size={scale(30)} color={farben.text} style={styles.symbol} /> : null}
      <View style={styles.beschriftung}>
        <AppText variante="lead" fett farbe={farben.text}>
          {titel}
        </AppText>
        {untertitel ? (
          <AppText variante="caption" farbe={farben.text} style={styles.untertitel}>
            {untertitel}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  knopf: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    borderWidth: 2,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  symbol: { marginRight: Spacing.md },
  beschriftung: { flex: 1 },
  untertitel: { marginTop: 2, opacity: 0.9 },
});
