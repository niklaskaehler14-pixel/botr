import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSettings } from '@/lib/settings';
import { MaxContentWidth, Spacing } from '@/constants/theme';

type Props = {
  children: ReactNode;
  /** Ohne Scrollen (z. B. für Listen, die selbst scrollen). */
  ohneScroll?: boolean;
};

/** Seitenrahmen mit sicherem Bereich, Hintergrundfarbe und angenehmer Breite. */
export function Screen({ children, ohneScroll }: Props) {
  const { colors } = useSettings();
  const inhalt = <View style={styles.inhalt}>{children}</View>;

  return (
    <SafeAreaView style={[styles.flaeche, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      {ohneScroll ? (
        inhalt
      ) : (
        <ScrollView
          style={styles.flaeche}
          contentContainerStyle={styles.scrollInhalt}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          {inhalt}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flaeche: { flex: 1 },
  scrollInhalt: { paddingBottom: Spacing.xxl },
  inhalt: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: Spacing.md },
});
