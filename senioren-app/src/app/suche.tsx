import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Karte } from '@/components/karte';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { MinTouchSize, Radius, Spacing } from '@/constants/theme';
import { suche } from '@/content/suche';
import { useSettings } from '@/lib/settings';

const VORSCHLAEGE = ['WhatsApp', 'Betrug', 'Passwort', 'Enkeltrick', 'WLAN', 'Foto'];

export default function SucheSeite() {
  const { colors, fontSize, scale } = useSettings();
  const [begriff, setBegriff] = useState('');
  const treffer = useMemo(() => suche(begriff), [begriff]);

  return (
    <Screen>
      <Kopfzeile titel="Suchen" untertitel="Suchen Sie in allen Lektionen, Begriffen und Hilfe-Themen." zurueck />

      <TextInput
        accessibilityLabel="Suchbegriff eingeben"
        placeholder="Wonach suchen Sie?"
        placeholderTextColor={colors.textMuted}
        value={begriff}
        onChangeText={setBegriff}
        autoCorrect={false}
        style={[
          styles.feld,
          {
            backgroundColor: colors.surface,
            borderColor: colors.borderStrong,
            color: colors.text,
            fontSize: fontSize('lead'),
            minHeight: scale(MinTouchSize),
          },
        ]}
      />

      {begriff.trim().length === 0 ? (
        <View>
          <AppText variante="body" gedaempft style={styles.hinweis}>
            Zum Beispiel:
          </AppText>
          {VORSCHLAEGE.map((vorschlag) => (
            <Karte key={vorschlag} titel={vorschlag} symbol="🔎" onPress={() => setBegriff(vorschlag)} />
          ))}
        </View>
      ) : treffer.length === 0 ? (
        <AppText variante="body" gedaempft style={styles.hinweis}>
          Zu „{begriff}“ wurde nichts gefunden. Versuchen Sie ein einzelnes, kürzeres Wort.
        </AppText>
      ) : (
        <>
          <AppText variante="body" gedaempft style={styles.hinweis}>
            {treffer.length === 1 ? '1 Ergebnis' : `${treffer.length} Ergebnisse`}
          </AppText>
          {treffer.map((eintrag) => (
            <Karte
              key={eintrag.id}
              titel={eintrag.titel}
              untertitel={eintrag.untertitel}
              fussnote={eintrag.art}
              onPress={() => router.push(eintrag.pfad)}
            />
          ))}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  feld: { borderWidth: 2, borderRadius: Radius.md, paddingHorizontal: Spacing.md, marginBottom: Spacing.md },
  hinweis: { marginBottom: Spacing.sm },
});
