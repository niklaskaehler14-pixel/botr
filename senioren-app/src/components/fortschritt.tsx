import { StyleSheet, View } from 'react-native';

import { AppText } from './text';
import { useSettings } from '@/lib/settings';
import { Radius, Spacing } from '@/constants/theme';

type Props = {
  erledigt: number;
  gesamt: number;
  beschriftung?: string;
};

/** Fortschrittsbalken mit Beschriftung in Worten (nicht nur als Grafik). */
export function Fortschritt({ erledigt, gesamt, beschriftung }: Props) {
  const { colors, scale } = useSettings();
  const anteil = gesamt > 0 ? Math.min(1, erledigt / gesamt) : 0;
  const text = beschriftung ?? `${erledigt} von ${gesamt} Lektionen geschafft`;

  return (
    <View accessible accessibilityLabel={text} style={styles.bereich}>
      <AppText variante="body" fett style={styles.text}>
        {text}
      </AppText>
      <View style={[styles.spur, { backgroundColor: colors.surfaceStrong, height: scale(16) }]}>
        <View
          style={[
            styles.balken,
            { backgroundColor: colors.success, width: `${Math.round(anteil * 100)}%`, height: scale(16) },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bereich: { marginBottom: Spacing.md },
  text: { marginBottom: Spacing.xs },
  spur: { borderRadius: Radius.sm, overflow: 'hidden' },
  balken: { borderRadius: Radius.sm },
});
