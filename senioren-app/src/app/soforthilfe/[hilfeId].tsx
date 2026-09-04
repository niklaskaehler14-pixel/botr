import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Hinweis } from '@/components/hinweis';
import { Knopf } from '@/components/knopf';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { VorlesenKnopf } from '@/components/vorlesen-knopf';
import { Spacing } from '@/constants/theme';
import { findeSoforthilfe } from '@/content/notfall';
import { useSettings } from '@/lib/settings';
import { useVorlesen } from '@/lib/speech';

export default function SoforthilfeSeite() {
  const { hilfeId } = useLocalSearchParams<{ hilfeId: string }>();
  const hilfe = findeSoforthilfe(hilfeId);
  const { colors, scale } = useSettings();
  const { spricht, umschalten } = useVorlesen();

  if (!hilfe) {
    return (
      <Screen>
        <Kopfzeile titel="Thema nicht gefunden" zurueck />
        <Knopf titel="Zur Hilfe-Übersicht" symbol="health-and-safety" onPress={() => router.replace('/hilfe')} />
      </Screen>
    );
  }

  const vorlesetext = [hilfe.titel, hilfe.wann, ...hilfe.schritte.map((s, i) => `Schritt ${i + 1}: ${s}`), hilfe.hinweis]
    .filter(Boolean)
    .join('\n');

  return (
    <Screen>
      <Kopfzeile titel={`${hilfe.symbol}  ${hilfe.titel}`} untertitel={hilfe.wann} zurueck />

      <VorlesenKnopf spricht={spricht} onPress={() => umschalten(vorlesetext)} />

      <AppText variante="heading" style={styles.ueberschrift}>
        Das tun Sie jetzt – in dieser Reihenfolge
      </AppText>

      {hilfe.schritte.map((schritt, index) => (
        <View key={schritt} style={styles.schritt}>
          <View style={[styles.nummer, { backgroundColor: colors.primary, width: scale(40), height: scale(40) }]}>
            <AppText variante="lead" fett farbe={colors.onPrimary}>
              {index + 1}
            </AppText>
          </View>
          <AppText variante="body" style={styles.schrittText}>
            {schritt}
          </AppText>
        </View>
      ))}

      {hilfe.hinweis ? <Hinweis art="merke" text={hilfe.hinweis} /> : null}

      <Knopf titel="Notrufnummern anzeigen" symbol="call" onPress={() => router.push('/notrufnummern')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  ueberschrift: { marginBottom: Spacing.md },
  schritt: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.md },
  nummer: { borderRadius: 999, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  schrittText: { flex: 1, paddingTop: 4 },
});
