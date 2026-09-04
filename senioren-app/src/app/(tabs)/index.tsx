import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Fortschritt } from '@/components/fortschritt';
import { Hinweis } from '@/components/hinweis';
import { Karte } from '@/components/karte';
import { Knopf } from '@/components/knopf';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { Spacing } from '@/constants/theme';
import { anzahlLektionen, findeLektion } from '@/content/kurse';
import { tippDesTages } from '@/content/tipps';
import { useProgress } from '@/lib/progress';

export default function StartSeite() {
  const { state } = useProgress();
  const weiter = findeLektion(state.zuletzt ?? undefined);

  return (
    <Screen>
      <Kopfzeile titel="Digital dabei" untertitel="Ihr Begleiter für Handy, Internet und Sicherheit" />

      <Fortschritt erledigt={state.abgeschlossen.length} gesamt={anzahlLektionen} />

      {weiter ? (
        <View style={styles.abschnitt}>
          <AppText variante="heading" style={styles.ueberschrift}>
            Weitermachen
          </AppText>
          <Karte
            titel={weiter.lektion.titel}
            untertitel={weiter.kurs.titel}
            symbol={weiter.kurs.symbol}
            fussnote={`Etwa ${weiter.lektion.dauerMinuten} Minuten`}
            onPress={() => router.push(`/lektion/${weiter.lektion.id}`)}
          />
        </View>
      ) : null}

      <View style={styles.abschnitt}>
        <AppText variante="heading" style={styles.ueberschrift}>
          Was möchten Sie tun?
        </AppText>
        <Knopf
          titel="Etwas lernen"
          untertitel="Kurse zu Handy, WhatsApp und Sicherheit"
          symbol="menu-book"
          onPress={() => router.push('/lernen')}
        />
        <Knopf
          titel="Ist das Betrug?"
          untertitel="In einer Minute prüfen – Frage für Frage"
          art="neben"
          symbol="help-outline"
          onPress={() => router.push('/pruefen')}
        />
        <Knopf
          titel="Hilfe und Notruf"
          untertitel="Wichtige Nummern und Soforthilfe"
          art="neben"
          symbol="health-and-safety"
          onPress={() => router.push('/hilfe')}
        />
        <Knopf
          titel="Etwas nachschlagen"
          untertitel="Suche in allen Lektionen und Begriffen"
          art="neben"
          symbol="search"
          onPress={() => router.push('/suche')}
        />
      </View>

      <View style={styles.abschnitt}>
        <AppText variante="heading" style={styles.ueberschrift}>
          Tipp des Tages
        </AppText>
        <Hinweis art="tipp" text={tippDesTages()} />
      </View>

      <Hinweis
        art="info"
        titel="Sie können nichts kaputt machen"
        text="Probieren Sie ruhig alles aus. In dieser App wird nichts verschickt und nichts gelöscht. Sie lernt in Ihrem Tempo mit."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  abschnitt: { marginBottom: Spacing.lg },
  ueberschrift: { marginBottom: Spacing.sm },
});
