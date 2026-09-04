import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Hinweis } from '@/components/hinweis';
import { Karte } from '@/components/karte';
import { Knopf } from '@/components/knopf';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { Spacing } from '@/constants/theme';
import { soforthilfen } from '@/content/notfall';

export default function HilfeSeite() {
  return (
    <Screen>
      <Kopfzeile titel="Hilfe" untertitel="Schnelle Unterstützung, wenn etwas passiert ist oder Ihnen etwas verdächtig vorkommt." />

      <Knopf
        titel="Notrufnummern"
        untertitel="110, 112, Karten sperren und mehr – direkt anrufen"
        symbol="call"
        onPress={() => router.push('/notrufnummern')}
      />
      <Knopf
        titel="Ist das Betrug?"
        untertitel="Acht Fragen, dann wissen Sie mehr"
        art="neben"
        symbol="help-outline"
        onPress={() => router.push('/pruefen')}
      />
      <Knopf
        titel="Begriffe nachschlagen"
        untertitel="Fachwörter in einfacher Sprache"
        art="neben"
        symbol="menu-book"
        onPress={() => router.push('/glossar')}
      />

      <View style={styles.abschnitt}>
        <AppText variante="heading" style={styles.ueberschrift}>
          Soforthilfe
        </AppText>
        <AppText variante="body" gedaempft style={styles.ueberschrift}>
          Was ist passiert? Tippen Sie auf den zutreffenden Fall.
        </AppText>
        {soforthilfen.map((hilfe) => (
          <Karte
            key={hilfe.id}
            titel={hilfe.titel}
            untertitel={hilfe.wann}
            symbol={hilfe.symbol}
            onPress={() => router.push(`/soforthilfe/${hilfe.id}`)}
          />
        ))}
      </View>

      <Hinweis
        art="merke"
        text="Betrogen zu werden ist keine Dummheit. Die Täter sind Profis. Sprechen Sie darüber – mit der Familie, der Polizei oder der Verbraucherzentrale."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  abschnitt: { marginTop: Spacing.lg },
  ueberschrift: { marginBottom: Spacing.sm },
});
