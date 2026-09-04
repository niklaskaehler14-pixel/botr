import { router } from 'expo-router';

import { Hinweis } from '@/components/hinweis';
import { Knopf } from '@/components/knopf';
import { Kopfzeile } from '@/components/kopfzeile';
import { Screen } from '@/components/screen';

export default function NichtGefunden() {
  return (
    <Screen>
      <Kopfzeile titel="Seite nicht gefunden" untertitel="Diese Seite gibt es nicht (mehr)." />
      <Hinweis art="info" text="Sie haben nichts falsch gemacht. Tippen Sie einfach auf den Knopf, um zur Startseite zurückzukehren." />
      <Knopf titel="Zur Startseite" symbol="home" onPress={() => router.replace('/')} />
    </Screen>
  );
}
