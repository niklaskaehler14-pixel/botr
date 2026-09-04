import { Alert, Linking, Platform, StyleSheet, View } from 'react-native';

import { Hinweis } from '@/components/hinweis';
import { Knopf } from '@/components/knopf';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { Radius, Spacing } from '@/constants/theme';
import { notrufnummern, type Notrufnummer } from '@/content/notfall';
import { useSettings } from '@/lib/settings';

export default function NotrufnummernSeite() {
  const { colors } = useSettings();

  const anrufen = async (eintrag: Notrufnummer) => {
    const url = `tel:${eintrag.waehlen}`;
    try {
      const moeglich = await Linking.canOpenURL(url);
      if (!moeglich) {
        Alert.alert('Anruf nicht möglich', `Bitte wählen Sie ${eintrag.nummer} von Hand.`);
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert('Anruf nicht möglich', `Bitte wählen Sie ${eintrag.nummer} von Hand.`);
    }
  };

  return (
    <Screen>
      <Kopfzeile titel="Notrufnummern" untertitel="Tippen Sie auf eine Nummer, um sie direkt anzurufen." zurueck />

      {notrufnummern.map((eintrag) => (
        <View
          key={eintrag.id}
          style={[styles.block, { backgroundColor: colors.surface, borderColor: eintrag.dringend ? colors.danger : colors.border }]}>
          <AppText variante="heading">
            {eintrag.symbol}  {eintrag.titel}
          </AppText>
          <AppText variante="display" fett style={styles.nummer}>
            {eintrag.nummer}
          </AppText>
          <AppText variante="body" gedaempft style={styles.beschreibung}>
            {eintrag.beschreibung}
          </AppText>
          <Knopf
            titel={`${eintrag.nummer} anrufen`}
            art={eintrag.dringend ? 'gefahr' : 'haupt'}
            symbol="call"
            onPress={() => anrufen(eintrag)}
            hinweisFuerVorlesen={`${eintrag.titel} unter ${eintrag.nummer} anrufen`}
          />
        </View>
      ))}

      <Hinweis
        art="info"
        titel="Weitere Anlaufstellen"
        text="Die Verbraucherzentrale Ihres Bundeslandes berät bei Betrug und untergeschobenen Verträgen. Verdächtige Nummern und unerlaubte Werbeanrufe nimmt die Bundesnetzagentur entgegen. Die Adressen finden Sie im Internet oder erfragen Sie bei Ihrer Stadtverwaltung."
      />

      {Platform.OS === 'web' ? (
        <Hinweis art="info" text="Im Browser funktioniert das direkte Anrufen nicht immer. Wählen Sie die Nummer dann bitte am Telefon." />
      ) : null}

      <AppText variante="caption" gedaempft style={styles.fuss}>
        Angaben für Deutschland. 112 und 110 sind kostenfrei und funktionieren auch bei gesperrtem Bildschirm.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { borderWidth: 2, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md },
  nummer: { marginVertical: Spacing.xs },
  beschreibung: { marginBottom: Spacing.md },
  fuss: { marginTop: Spacing.sm },
});
