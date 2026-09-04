import { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Karte } from '@/components/karte';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { MinTouchSize, Radius, Spacing } from '@/constants/theme';
import { glossar } from '@/content/glossar';
import { useSettings } from '@/lib/settings';

export default function GlossarSeite() {
  const { colors, fontSize, scale } = useSettings();
  const [filter, setFilter] = useState('');

  const treffer = useMemo(() => {
    const begriff = filter.trim().toLowerCase();
    if (!begriff) return glossar;
    return glossar.filter(
      (eintrag) =>
        eintrag.begriff.toLowerCase().includes(begriff) || eintrag.erklaerung.toLowerCase().includes(begriff)
    );
  }, [filter]);

  return (
    <Screen>
      <Kopfzeile titel="Begriffe erklärt" untertitel="Fachwörter aus der Technik – in einfacher Sprache." zurueck />

      <TextInput
        accessibilityLabel="Begriff suchen"
        placeholder="Begriff suchen …"
        placeholderTextColor={colors.textMuted}
        value={filter}
        onChangeText={setFilter}
        style={[
          styles.suche,
          {
            backgroundColor: colors.surface,
            borderColor: colors.borderStrong,
            color: colors.text,
            fontSize: fontSize('lead'),
            minHeight: scale(MinTouchSize),
          },
        ]}
      />

      {treffer.length === 0 ? (
        <View style={styles.leer}>
          <AppText variante="body" gedaempft>
            Zu „{filter}“ wurde nichts gefunden. Versuchen Sie ein kürzeres Wort.
          </AppText>
        </View>
      ) : (
        treffer.map((eintrag) => <Karte key={eintrag.begriff} titel={eintrag.begriff} untertitel={eintrag.erklaerung} />)
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  suche: { borderWidth: 2, borderRadius: Radius.md, paddingHorizontal: Spacing.md, marginBottom: Spacing.md },
  leer: { paddingVertical: Spacing.lg },
});
