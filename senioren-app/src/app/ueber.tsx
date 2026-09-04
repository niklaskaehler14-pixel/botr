import { Linking, StyleSheet } from 'react-native';

import { Hinweis } from '@/components/hinweis';
import { Knopf } from '@/components/knopf';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';
import { AppText } from '@/components/text';
import { Spacing } from '@/constants/theme';
import { anzahlLektionen, kurse } from '@/content/kurse';

const QUELLEN: { titel: string; url: string }[] = [
  { titel: 'Verbraucherzentrale – Digitale Welt und Phishing-Radar', url: 'https://www.verbraucherzentrale.de' },
  { titel: 'Polizeiliche Kriminalprävention – Betrug und Diebstahl', url: 'https://www.polizei-beratung.de' },
  { titel: 'BSI – Empfehlungen für Verbraucherinnen und Verbraucher', url: 'https://www.bsi.bund.de' },
];

export default function UeberSeite() {
  return (
    <Screen>
      <Kopfzeile titel="Über diese App" zurueck />

      <AppText variante="body" style={styles.absatz}>
        „Digital dabei“ erklärt Technik so, wie man es einem guten Bekannten erklären würde: in ganzen Sätzen, ohne
        Fachwörter und Schritt für Schritt. Die App richtet sich an Menschen, die das Handy erst kennenlernen – und an
        alle, die sich vor Betrug im Internet schützen möchten.
      </AppText>

      <AppText variante="body" style={styles.absatz}>
        Enthalten sind {kurse.length} Kurse mit {anzahlLektionen} Lektionen, ein Betrugs-Check, Notrufnummern und ein
        Begriffslexikon.
      </AppText>

      <Hinweis
        art="info"
        titel="Datenschutz"
        text="Die App funktioniert ohne Anmeldung und ohne Internet. Ihr Lernfortschritt wird nur auf Ihrem eigenen Gerät gespeichert. Es werden keine Daten an uns oder an Dritte übertragen, es gibt keine Werbung und keine Nachverfolgung."
      />

      <AppText variante="heading" style={styles.ueberschrift}>
        Woher die Inhalte stammen
      </AppText>
      <AppText variante="body" style={styles.absatz}>
        Die Sicherheitshinweise folgen den Empfehlungen offizieller Stellen. Dort finden Sie auch aktuelle Warnungen:
      </AppText>
      {QUELLEN.map((quelle) => (
        <Knopf
          key={quelle.url}
          titel={quelle.titel}
          untertitel={quelle.url.replace('https://', '')}
          art="neben"
          symbol="open-in-new"
          onPress={() => {
            void Linking.openURL(quelle.url);
          }}
        />
      ))}

      <Hinweis
        art="achtung"
        titel="Wichtig"
        text="Diese App ersetzt keine Rechts- oder Finanzberatung. Bei einem konkreten Schaden wenden Sie sich bitte an Ihre Bank, die Polizei oder die Verbraucherzentrale."
      />

      <AppText variante="caption" gedaempft style={styles.absatz}>
        Angaben zu Notrufnummern und Beratungsstellen beziehen sich auf Deutschland. Die Bedienschritte können sich je
        nach Handy-Hersteller und Version leicht unterscheiden.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  absatz: { marginBottom: Spacing.md },
  ueberschrift: { marginTop: Spacing.lg, marginBottom: Spacing.sm },
});
