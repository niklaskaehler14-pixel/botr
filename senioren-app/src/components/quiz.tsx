import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './text';
import { Knopf } from './knopf';
import { useSettings } from '@/lib/settings';
import { MinTouchSize, Radius, Spacing } from '@/constants/theme';
import type { QuizFrage } from '@/content/types';

type Props = {
  fragen: QuizFrage[];
  onFertig?: () => void;
};

/** Kurzes Verständnis-Quiz am Ende einer Lektion. Fehler sind ausdrücklich erlaubt. */
export function Quiz({ fragen, onFertig }: Props) {
  const { colors, scale } = useSettings();
  const [nummer, setNummer] = useState(0);
  const [gewaehlt, setGewaehlt] = useState<number | null>(null);

  const frage = fragen[nummer];
  if (!frage) return null;

  const beantwortet = gewaehlt !== null;
  const richtig = gewaehlt === frage.richtig;
  const letzteFrage = nummer === fragen.length - 1;

  return (
    <View style={[styles.bereich, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <AppText variante="caption" gedaempft>
        {fragen.length > 1 ? `Frage ${nummer + 1} von ${fragen.length}` : 'Kurze Frage zum Mitdenken'}
      </AppText>
      <AppText variante="heading" style={styles.frage}>
        {frage.frage}
      </AppText>

      {frage.antworten.map((antwort, index) => {
        const istRichtige = index === frage.richtig;
        const istGewaehlte = index === gewaehlt;
        const hintergrund = !beantwortet
          ? colors.background
          : istRichtige
            ? colors.successBg
            : istGewaehlte
              ? colors.dangerBg
              : colors.background;
        const rand = !beantwortet
          ? colors.borderStrong
          : istRichtige
            ? colors.success
            : istGewaehlte
              ? colors.danger
              : colors.border;

        return (
          <Pressable
            key={antwort}
            accessibilityRole="button"
            accessibilityLabel={`Antwort ${index + 1}: ${antwort}`}
            accessibilityState={{ selected: istGewaehlte, disabled: beantwortet }}
            disabled={beantwortet}
            onPress={() => setGewaehlt(index)}
            style={[
              styles.antwort,
              { backgroundColor: hintergrund, borderColor: rand, minHeight: scale(MinTouchSize) },
            ]}>
            <AppText variante="body" style={styles.antwortText}>
              {antwort}
            </AppText>
            {beantwortet && istRichtige ? <MaterialIcons name="check" size={scale(26)} color={colors.success} /> : null}
            {beantwortet && istGewaehlte && !istRichtige ? (
              <MaterialIcons name="close" size={scale(26)} color={colors.danger} />
            ) : null}
          </Pressable>
        );
      })}

      {beantwortet ? (
        <View style={styles.erklaerung}>
          <AppText variante="lead" fett farbe={richtig ? colors.success : colors.warning}>
            {richtig ? 'Richtig!' : 'Nicht ganz – so ist es richtig:'}
          </AppText>
          <AppText variante="body" style={styles.erklaerungText}>
            {frage.erklaerung}
          </AppText>
          <Knopf
            titel={letzteFrage ? 'Quiz beenden' : 'Nächste Frage'}
            art="neben"
            symbol="arrow-forward"
            onPress={() => {
              if (letzteFrage) {
                onFertig?.();
                setNummer(0);
                setGewaehlt(null);
              } else {
                setNummer((n) => n + 1);
                setGewaehlt(null);
              }
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bereich: { borderWidth: 2, borderRadius: Radius.md, padding: Spacing.md, marginTop: Spacing.lg },
  frage: { marginTop: Spacing.xs, marginBottom: Spacing.md },
  antwort: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  antwortText: { flex: 1, marginRight: Spacing.sm },
  erklaerung: { marginTop: Spacing.sm },
  erklaerungText: { marginTop: Spacing.xs, marginBottom: Spacing.md },
});
