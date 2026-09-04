import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from './text';
import { useSettings } from '@/lib/settings';
import { Radius, Spacing } from '@/constants/theme';

type Props = {
  spricht: boolean;
  onPress: () => void;
};

/** Knopf zum Vorlesen des Seiteninhalts. Wird nur angezeigt, wenn in den Einstellungen aktiviert. */
export function VorlesenKnopf({ spricht, onPress }: Props) {
  const { colors, scale, settings } = useSettings();
  if (!settings.vorlesen) return null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spricht ? 'Vorlesen beenden' : 'Text vorlesen lassen'}
      onPress={onPress}
      style={({ pressed }) => [
        styles.knopf,
        {
          minHeight: scale(52),
          backgroundColor: pressed || spricht ? colors.surfaceStrong : colors.surface,
          borderColor: colors.borderStrong,
        },
      ]}>
      <MaterialIcons name={spricht ? 'stop-circle' : 'volume-up'} size={scale(26)} color={colors.text} />
      <AppText variante="lead" fett style={styles.text}>
        {spricht ? 'Vorlesen beenden' : 'Vorlesen'}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  knopf: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
  },
  text: { marginLeft: Spacing.sm },
});
