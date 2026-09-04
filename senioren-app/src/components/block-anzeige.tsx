import { StyleSheet, View } from 'react-native';

import { AppText } from './text';
import { Hinweis } from './hinweis';
import { useSettings } from '@/lib/settings';
import { Radius, Spacing } from '@/constants/theme';
import type { Block } from '@/content/types';

/** Stellt einen einzelnen Inhaltsbaustein einer Lektion dar. */
export function BlockAnzeige({ block }: { block: Block }) {
  const { colors, scale } = useSettings();

  switch (block.typ) {
    case 'text':
      return (
        <AppText variante="body" style={styles.absatz}>
          {block.text}
        </AppText>
      );

    case 'schritte':
      return (
        <View style={styles.liste}>
          {block.schritte.map((schritt, index) => (
            <View key={schritt} style={styles.schritt}>
              <View style={[styles.nummer, { backgroundColor: colors.primary, width: scale(36), height: scale(36) }]}>
                <AppText variante="body" fett farbe={colors.onPrimary}>
                  {index + 1}
                </AppText>
              </View>
              <AppText variante="body" style={styles.schrittText}>
                {schritt}
              </AppText>
            </View>
          ))}
        </View>
      );

    case 'tipp':
      return <Hinweis art="tipp" text={block.text} />;

    case 'achtung':
      return <Hinweis art="achtung" text={block.text} />;

    case 'merke':
      return <Hinweis art="merke" text={block.text} />;

    case 'beispiel':
      return <Hinweis art="beispiel" titel={block.titel} text={block.text} />;

    case 'plattform':
      return (
        <View style={styles.plattform}>
          <PlattformSpalte titel="Auf dem iPhone" schritte={block.ios} />
          <PlattformSpalte titel="Auf einem Android-Handy" schritte={block.android} />
          {block.hinweis ? <Hinweis art="info" text={block.hinweis} /> : null}
        </View>
      );
  }
}

function PlattformSpalte({ titel, schritte }: { titel: string; schritte: string[] }) {
  const { colors } = useSettings();
  return (
    <View style={[styles.spalte, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <AppText variante="lead" fett style={styles.spaltenTitel}>
        {titel}
      </AppText>
      {schritte.map((schritt, index) => (
        <AppText key={schritt} variante="body" style={styles.spaltenZeile}>
          {index + 1}. {schritt}
        </AppText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  absatz: { marginBottom: Spacing.md },
  liste: { marginBottom: Spacing.sm },
  schritt: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.md },
  nummer: { borderRadius: 999, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  schrittText: { flex: 1, paddingTop: 2 },
  plattform: { marginBottom: Spacing.sm },
  spalte: { borderWidth: 2, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm },
  spaltenTitel: { marginBottom: Spacing.sm },
  spaltenZeile: { marginBottom: Spacing.xs },
});
