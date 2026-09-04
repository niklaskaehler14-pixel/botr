import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Fortschritt } from '@/components/fortschritt';
import { Karte } from '@/components/karte';
import { Knopf } from '@/components/knopf';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { Spacing } from '@/constants/theme';
import { findeKurs } from '@/content/kurse';
import { useProgress } from '@/lib/progress';

export default function KursSeite() {
  const { kursId } = useLocalSearchParams<{ kursId: string }>();
  const kurs = findeKurs(kursId);
  const { state } = useProgress();

  if (!kurs) {
    return (
      <Screen>
        <Kopfzeile titel="Kurs nicht gefunden" zurueck />
        <Knopf titel="Zur Kursübersicht" symbol="menu-book" onPress={() => router.replace('/lernen')} />
      </Screen>
    );
  }

  const erledigt = kurs.lektionen.filter((l) => state.abgeschlossen.includes(l.id)).length;

  return (
    <Screen>
      <Kopfzeile titel={`${kurs.symbol}  ${kurs.titel}`} untertitel={kurs.untertitel} zurueck />

      <AppText variante="body" style={styles.beschreibung}>
        {kurs.beschreibung}
      </AppText>

      <Fortschritt erledigt={erledigt} gesamt={kurs.lektionen.length} />

      {kurs.lektionen.map((lektion, index) => (
        <Karte
          key={lektion.id}
          titel={`${index + 1}. ${lektion.titel}`}
          untertitel={lektion.kurz}
          abgeschlossen={state.abgeschlossen.includes(lektion.id)}
          fussnote={`Etwa ${lektion.dauerMinuten} Minuten`}
          onPress={() => router.push(`/lektion/${lektion.id}`)}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  beschreibung: { marginBottom: Spacing.md },
});
