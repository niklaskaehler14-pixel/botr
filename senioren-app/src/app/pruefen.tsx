import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Hinweis } from '@/components/hinweis';
import { Knopf } from '@/components/knopf';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { Radius, Spacing } from '@/constants/theme';
import { pruefungsfragen, werteAus } from '@/content/pruefung';
import { useSettings } from '@/lib/settings';

export default function PruefenSeite() {
  const { colors } = useSettings();
  const [nummer, setNummer] = useState(0);
  const [antworten, setAntworten] = useState<Record<string, boolean>>({});

  const frage = pruefungsfragen[nummer];
  const fertig = nummer >= pruefungsfragen.length;

  const antworte = (ja: boolean) => {
    setAntworten((bisher) => ({ ...bisher, [frage.id]: ja }));
    setNummer((n) => n + 1);
  };

  const nochmal = () => {
    setAntworten({});
    setNummer(0);
  };

  if (fertig) {
    const ergebnis = werteAus(antworten);
    const farbe =
      ergebnis.ampel === 'rot' ? colors.danger : ergebnis.ampel === 'gelb' ? colors.warning : colors.success;
    const hintergrund =
      ergebnis.ampel === 'rot' ? colors.dangerBg : ergebnis.ampel === 'gelb' ? colors.warningBg : colors.successBg;

    return (
      <Screen>
        <Kopfzeile titel="Ihr Ergebnis" zurueck />

        <View style={[styles.ergebnis, { backgroundColor: hintergrund, borderColor: farbe }]}>
          <AppText variante="title" fett farbe={farbe}>
            {ergebnis.titel}
          </AppText>
          <AppText variante="body" style={styles.ergebnisText}>
            {ergebnis.text}
          </AppText>
        </View>

        <AppText variante="heading" style={styles.ueberschrift}>
          Das empfehlen wir
        </AppText>
        {ergebnis.empfehlungen.map((empfehlung) => (
          <AppText key={empfehlung} variante="body" style={styles.punkt}>
            •  {empfehlung}
          </AppText>
        ))}

        {ergebnis.ampel !== 'gruen' ? (
          <>
            <Knopf titel="Notrufnummern anzeigen" symbol="call" onPress={() => router.push('/notrufnummern')} />
            <Knopf
              titel="Soforthilfe ansehen"
              art="neben"
              symbol="health-and-safety"
              onPress={() => router.push('/hilfe')}
            />
          </>
        ) : null}

        <Knopf titel="Noch einmal prüfen" art="still" symbol="restart-alt" onPress={nochmal} />

        <AppText variante="caption" gedaempft style={styles.fuss}>
          Diese Einschätzung ersetzt keine Beratung. Im Zweifel fragen Sie bei der Polizei oder der Verbraucherzentrale nach.
        </AppText>
      </Screen>
    );
  }

  return (
    <Screen>
      <Kopfzeile titel="Ist das Betrug?" untertitel={`Frage ${nummer + 1} von ${pruefungsfragen.length}`} zurueck />

      <View style={[styles.fragenkasten, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <AppText variante="heading">{frage.frage}</AppText>
        <AppText variante="body" gedaempft style={styles.erlaeuterung}>
          {frage.erlaeuterung}
        </AppText>
      </View>

      <Knopf titel="Ja" symbol="check" onPress={() => antworte(true)} />
      <Knopf titel="Nein" art="neben" symbol="close" onPress={() => antworte(false)} />
      <Knopf titel="Weiß ich nicht" art="still" symbol="help-outline" onPress={() => antworte(false)} />

      {nummer > 0 ? (
        <Knopf titel="Eine Frage zurück" art="still" symbol="arrow-back" onPress={() => setNummer((n) => n - 1)} />
      ) : null}

      <Hinweis
        art="info"
        text="Antworten Sie einfach nach Gefühl. Am Ende sehen Sie, wie gefährlich die Lage ist und was Sie tun können."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  fragenkasten: { borderWidth: 2, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.lg },
  erlaeuterung: { marginTop: Spacing.sm },
  ergebnis: { borderWidth: 2, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.lg },
  ergebnisText: { marginTop: Spacing.sm },
  ueberschrift: { marginBottom: Spacing.sm },
  punkt: { marginBottom: Spacing.sm },
  fuss: { marginTop: Spacing.md },
});
