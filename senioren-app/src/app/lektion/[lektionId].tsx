import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { BlockAnzeige } from '@/components/block-anzeige';
import { Hinweis } from '@/components/hinweis';
import { Knopf } from '@/components/knopf';
import { Kopfzeile } from '@/components/kopfzeile';
import { Quiz } from '@/components/quiz';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { VorlesenKnopf } from '@/components/vorlesen-knopf';
import { Spacing } from '@/constants/theme';
import { findeLektion } from '@/content/kurse';
import { lektionAlsText } from '@/content/types';
import { useProgress } from '@/lib/progress';
import { useVorlesen } from '@/lib/speech';

export default function LektionSeite() {
  const { lektionId } = useLocalSearchParams<{ lektionId: string }>();
  const treffer = findeLektion(lektionId);
  const { istAbgeschlossen, markiereAbgeschlossen, entferneAbgeschlossen, merkeZuletzt } = useProgress();
  const { spricht, umschalten, stop } = useVorlesen();

  const id = treffer?.lektion.id;
  useEffect(() => {
    if (id) merkeZuletzt(id);
  }, [id, merkeZuletzt]);

  const vorlesetext = useMemo(() => (treffer ? lektionAlsText(treffer.lektion) : ''), [treffer]);

  if (!treffer) {
    return (
      <Screen>
        <Kopfzeile titel="Lektion nicht gefunden" zurueck />
        <Knopf titel="Zur Kursübersicht" symbol="menu-book" onPress={() => router.replace('/lernen')} />
      </Screen>
    );
  }

  const { lektion, kurs, index } = treffer;
  const fertig = istAbgeschlossen(lektion.id);
  const naechste = kurs.lektionen[index + 1];

  return (
    <Screen>
      <Kopfzeile titel={lektion.titel} untertitel={`${kurs.titel} · Lektion ${index + 1} von ${kurs.lektionen.length}`} zurueck />

      <VorlesenKnopf spricht={spricht} onPress={() => umschalten(vorlesetext)} />

      <AppText variante="lead" gedaempft style={styles.kurz}>
        {lektion.kurz}
      </AppText>

      {lektion.abschnitte.map((abschnitt) => (
        <View key={abschnitt.titel} style={styles.abschnitt}>
          <AppText variante="heading" accessibilityRole="header" style={styles.abschnittTitel}>
            {abschnitt.titel}
          </AppText>
          {abschnitt.bloecke.map((block, i) => (
            <BlockAnzeige key={`${abschnitt.titel}-${i}`} block={block} />
          ))}
        </View>
      ))}

      {lektion.quiz && lektion.quiz.length > 0 ? <Quiz fragen={lektion.quiz} /> : null}

      <View style={styles.abschluss}>
        {fertig ? (
          <>
            <Hinweis art="tipp" titel="Geschafft" text="Diese Lektion ist als erledigt markiert. Sie können sie jederzeit noch einmal ansehen." />
            <Knopf
              titel="Häkchen wieder entfernen"
              art="still"
              symbol="undo"
              onPress={() => entferneAbgeschlossen(lektion.id)}
            />
          </>
        ) : (
          <Knopf
            titel="Lektion abgeschlossen"
            untertitel="Setzt ein Häkchen in Ihrer Übersicht"
            symbol="check-circle"
            onPress={() => markiereAbgeschlossen(lektion.id)}
          />
        )}

        {naechste ? (
          <Knopf
            titel="Nächste Lektion"
            untertitel={naechste.titel}
            art="neben"
            symbol="arrow-forward"
            onPress={() => {
              stop();
              router.push(`/lektion/${naechste.id}`);
            }}
          />
        ) : (
          <Knopf
            titel="Zurück zur Kursübersicht"
            art="neben"
            symbol="menu-book"
            onPress={() => {
              stop();
              router.push(`/kurs/${kurs.id}`);
            }}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  kurz: { marginBottom: Spacing.lg },
  abschnitt: { marginBottom: Spacing.lg },
  abschnittTitel: { marginBottom: Spacing.sm },
  abschluss: { marginTop: Spacing.lg },
});
