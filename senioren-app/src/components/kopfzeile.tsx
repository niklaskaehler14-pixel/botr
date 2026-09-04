import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './text';
import { useSettings } from '@/lib/settings';
import { Radius, Spacing } from '@/constants/theme';

type Props = {
  titel: string;
  untertitel?: string;
  /** Zurück-Knopf anzeigen (auf Unterseiten). */
  zurueck?: boolean;
};

/** Große Überschrift mit deutlich beschriftetem Zurück-Knopf. */
export function Kopfzeile({ titel, untertitel, zurueck }: Props) {
  const { colors, scale } = useSettings();

  return (
    <View style={styles.bereich}>
      {zurueck ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Zurück zur vorherigen Seite"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          style={({ pressed }) => [
            styles.zurueck,
            {
              backgroundColor: pressed ? colors.surfaceStrong : colors.surface,
              borderColor: colors.borderStrong,
              minHeight: scale(52),
            },
          ]}>
          <MaterialIcons name="arrow-back" size={scale(26)} color={colors.text} />
          <AppText variante="lead" fett style={styles.zurueckText}>
            Zurück
          </AppText>
        </Pressable>
      ) : null}
      <AppText variante="title" accessibilityRole="header" style={styles.titel}>
        {titel}
      </AppText>
      {untertitel ? (
        <AppText variante="body" gedaempft style={styles.untertitel}>
          {untertitel}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bereich: { paddingTop: Spacing.md, marginBottom: Spacing.md },
  zurueck: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
  },
  zurueckText: { marginLeft: Spacing.sm },
  titel: { marginBottom: Spacing.xs },
  untertitel: { marginBottom: Spacing.xs },
});
