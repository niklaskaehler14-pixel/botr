import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, StyleSheet, Switch, View } from 'react-native';

import { Hinweis } from '@/components/hinweis';
import { Knopf } from '@/components/knopf';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { Radius, Spacing } from '@/constants/theme';
import { useProgress } from '@/lib/progress';
import { TEXT_SIZE_LABELS, THEME_LABELS, useSettings, type TextSizeKey, type ThemeKey } from '@/lib/settings';

export default function EinstellungenSeite() {
  const { settings, setSetting, colors, scale } = useSettings();
  const { state, zuruecksetzen } = useProgress();
  const [bestaetigen, setBestaetigen] = useState(false);

  const fortschrittLoeschen = () => {
    if (Platform.OS === 'web') {
      // Auf dem Web gibt es keinen nativen Bestätigungsdialog von React Native.
      setBestaetigen(true);
      return;
    }
    Alert.alert(
      'Fortschritt löschen?',
      'Alle Häkchen bei den Lektionen werden entfernt. Die Lerninhalte selbst bleiben erhalten.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { text: 'Löschen', style: 'destructive', onPress: zuruecksetzen },
      ]
    );
  };

  return (
    <Screen>
      <Kopfzeile titel="Einstellungen" untertitel="Stellen Sie die App so ein, wie Sie am besten sehen und hören." />

      <AppText variante="heading" style={styles.ueberschrift}>
        Schriftgröße
      </AppText>
      <View style={styles.gruppe}>
        {(Object.keys(TEXT_SIZE_LABELS) as TextSizeKey[]).map((key) => (
          <Knopf
            key={key}
            titel={TEXT_SIZE_LABELS[key]}
            art={settings.textSize === key ? 'haupt' : 'neben'}
            symbol={settings.textSize === key ? 'check' : 'format-size'}
            onPress={() => setSetting('textSize', key)}
          />
        ))}
      </View>

      <AppText variante="heading" style={styles.ueberschrift}>
        Farben
      </AppText>
      <View style={styles.gruppe}>
        {(Object.keys(THEME_LABELS) as ThemeKey[]).map((key) => (
          <Knopf
            key={key}
            titel={THEME_LABELS[key]}
            art={settings.theme === key ? 'haupt' : 'neben'}
            symbol={settings.theme === key ? 'check' : 'brightness-6'}
            onPress={() => setSetting('theme', key)}
          />
        ))}
      </View>

      <AppText variante="heading" style={styles.ueberschrift}>
        Vorlesen
      </AppText>
      <View style={[styles.zeile, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.zeilenText}>
          <AppText variante="lead" fett>
            Vorlese-Knopf anzeigen
          </AppText>
          <AppText variante="caption" gedaempft>
            Lässt sich der Text jeder Lektion laut vorlesen.
          </AppText>
        </View>
        <Switch
          accessibilityLabel="Vorlese-Knopf anzeigen"
          value={settings.vorlesen}
          onValueChange={(wert) => setSetting('vorlesen', wert)}
          trackColor={{ true: colors.primary, false: colors.borderStrong }}
          style={{ transform: [{ scale: scale(1.2) / 1.2 }] }}
        />
      </View>

      <AppText variante="heading" style={styles.ueberschrift}>
        Lernfortschritt
      </AppText>
      <AppText variante="body" gedaempft style={styles.absatz}>
        {state.abgeschlossen.length} Lektionen sind als erledigt markiert.
      </AppText>
      {bestaetigen ? (
        <>
          <Hinweis art="achtung" text="Wirklich alle Häkchen entfernen? Die Lerninhalte bleiben erhalten." />
          <Knopf
            titel="Ja, Fortschritt löschen"
            art="gefahr"
            symbol="delete"
            onPress={() => {
              zuruecksetzen();
              setBestaetigen(false);
            }}
          />
          <Knopf titel="Abbrechen" art="neben" symbol="close" onPress={() => setBestaetigen(false)} />
        </>
      ) : (
        <Knopf titel="Fortschritt zurücksetzen" art="neben" symbol="restart-alt" onPress={fortschrittLoeschen} />
      )}

      <View style={styles.abstand} />
      <Knopf titel="Über diese App" art="still" symbol="info-outline" onPress={() => router.push('/ueber')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  ueberschrift: { marginTop: Spacing.lg, marginBottom: Spacing.sm },
  gruppe: { marginBottom: Spacing.sm },
  absatz: { marginBottom: Spacing.sm },
  zeile: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  zeilenText: { flex: 1, marginRight: Spacing.md },
  abstand: { height: Spacing.lg },
});
