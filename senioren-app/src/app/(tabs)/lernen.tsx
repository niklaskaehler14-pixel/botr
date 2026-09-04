import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Karte } from '@/components/karte';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { Spacing } from '@/constants/theme';
import { kurse } from '@/content/kurse';
import { useProgress } from '@/lib/progress';

export default function LernenSeite() {
  const { state } = useProgress();

  return (
    <Screen>
      <Kopfzeile titel="Lernen" untertitel="Wählen Sie ein Thema. Sie können jederzeit aufhören und später weitermachen." />

      {kurse.map((kurs) => {
        const erledigt = kurs.lektionen.filter((l) => state.abgeschlossen.includes(l.id)).length;
        const fertig = erledigt === kurs.lektionen.length;
        return (
          <Karte
            key={kurs.id}
            titel={kurs.titel}
            untertitel={kurs.untertitel}
            symbol={kurs.symbol}
            abgeschlossen={fertig}
            fussnote={`${erledigt} von ${kurs.lektionen.length} Lektionen geschafft`}
            onPress={() => router.push(`/kurs/${kurs.id}`)}
          />
        );
      })}

      <AppText variante="caption" gedaempft style={styles.fuss}>
        Alle Inhalte funktionieren ohne Internet und ohne Anmeldung. Es werden keine Daten von Ihnen übertragen.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  fuss: { marginTop: Spacing.md },
});
