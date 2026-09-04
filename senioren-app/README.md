# Digital dabei – Senioren-App für iOS und Android

Eine Lern- und Sicherheits-App, die älteren Menschen die heutige Technik in einfacher Sprache
erklärt: Handy-Grundlagen, WhatsApp, Gefahren im Internet, Passwörter, Kontakt zur Familie und
praktische Alltagshelfer. Dazu ein Betrugs-Check, Notrufnummern zum direkten Anwählen und ein
Lexikon der Fachbegriffe.

Die App läuft aus einer gemeinsamen Codebasis auf **iPhone (iOS)** und **Android-Handys**
(zusätzlich als Web-App im Browser).

## Schnellstart – lokal ausprobieren

Voraussetzung: **Node.js 20 oder neuer** ([nodejs.org](https://nodejs.org)). Sonst nichts.

```bash
git clone -b claude/seniors-app-ios-android-16ao1k https://github.com/niklaskaehler14-pixel/botr.git
cd botr/senioren-app
npm install       # einmalig, dauert ca. 30 Sekunden
npm start
```

Wichtig ist der Branch `claude/seniors-app-ios-android-16ao1k` – auf `main` gibt es den Ordner
`senioren-app/` noch nicht. In einer bereits vorhandenen Kopie des Repositorys genügt
`git checkout claude/seniors-app-ios-android-16ao1k`.

Danach steht im Terminal ein QR-Code. Von dort aus geht es auf drei Wegen weiter:

| Taste im Terminal | Was passiert | Voraussetzung |
| --- | --- | --- |
| `w` | Die App öffnet sich im Browser | nichts |
| `a` | Start im Android-Emulator | Android Studio |
| `i` | Start im iOS-Simulator | macOS mit Xcode |

**Auf dem eigenen Handy** – der schnellste Weg zum echten Eindruck: Die App **Expo Go**
aus dem App Store oder Play Store installieren, Handy und Rechner ins selbe WLAN, dann den
QR-Code aus dem Terminal scannen (iPhone: mit der Kamera-App, Android: in Expo Go über
„Scan QR code“). Klappt das WLAN nicht, hilft `npm start -- --tunnel`.

Einzelne Zielplattform direkt starten:

```bash
npm run web       # Browser
npm run android   # Android-Emulator oder angeschlossenes Gerät
npm run ios       # iOS-Simulator (nur macOS)
```

Beenden mit `Strg + C` im Terminal.

## Warum die App so aussieht, wie sie aussieht

Der gesamte Entwurf folgt den Bedürfnissen der Zielgruppe:

| Entscheidung | Grund |
| --- | --- |
| Grundschrift 20 pt statt der üblichen 14–16 pt, dazu drei Stufen bis „Sehr groß“ | Nachlassende Sehkraft |
| Mindestens 60 pt hohe Bedienflächen | Weniger Zielgenauigkeit beim Tippen |
| Starke Kontraste, hell und dunkel wählbar | Blendempfindlichkeit, Grauer Star |
| Kein Wisch- oder Gestensteuerung nötig, überall ein beschrifteter „Zurück“-Knopf | Gesten sind die häufigste Hürde |
| Beschriftete Knöpfe statt reiner Symbole | Symbole sind ohne Vorerfahrung mehrdeutig |
| Vorlesefunktion auf jeder Lektion (`expo-speech`, Deutsch) | Alternative zum Lesen |
| Ganze Sätze, Siezen, keine Anglizismen ohne Erklärung | Verständlichkeit |
| Alles offline, ohne Anmeldung, ohne Werbung, ohne Tracking | Vertrauen und Datenschutz |

## Inhalte

**6 Kurse mit 36 Lektionen**

1. **Das Handy verstehen** – Tippen und Wischen, Ein- und Ausschalten, Schrift vergrößern, WLAN, Apps installieren
2. **WhatsApp Schritt für Schritt** – Einrichten, Nachrichten, Sprachnachrichten, Fotos, Video-Anruf, Gruppen, Blockieren, Zwei-Schritt-Verifizierung
3. **Gefahren im Internet erkennen** – Betrugsmuster, „Hallo Mama“, Schockanruf und falsche Polizei, Phishing und Paket-SMS, Fake-Shops, Gewinnversprechen, falscher Support, Liebesbetrug, Online-Banking, Verhalten im Schadensfall
4. **Passwörter und Konten schützen** – gute Passwörter, Zwei-Faktor, Updates, Datensparsamkeit
5. **In Kontakt bleiben** – Kontakte, Video-Anruf, Fotos sichern, E-Mail
6. **Alltagshelfer im Handy** – suchen, Weg finden, Erinnerungen, Notruf und Notfallpass

**Weitere Bereiche**

- **Ist das Betrug?** – acht Fragen, danach eine Einschätzung als Ampel mit konkreten Handlungsempfehlungen
- **Hilfe** – sechs Soforthilfe-Anleitungen (Geld überwiesen, Karte weg, Daten verraten, WhatsApp-Konto übernommen, verdächtige Nachricht, verdächtiger Anruf)
- **Notrufnummern** – 112, 110, Sperr-Notruf 116 116, ärztlicher Bereitschaftsdienst 116 117, Telefonseelsorge; jeweils mit Knopf zum direkten Anrufen
- **Begriffe erklärt** – 30 Fachwörter in einfacher Sprache
- **Suche** über alle Lektionen, Begriffe und Hilfe-Themen

Die Sicherheitsinhalte folgen den Empfehlungen von Verbraucherzentrale, polizeilicher
Kriminalprävention und dem Bundesamt für Sicherheit in der Informationstechnik (BSI).
Notrufnummern und Beratungsstellen beziehen sich auf Deutschland.

## Technik

- **Expo SDK 57** mit React Native 0.86 und React 19 – eine Codebasis für iOS, Android und Web
- **expo-router** (dateibasierte Navigation), Tab-Navigation mit vier Bereichen
- **TypeScript** durchgängig, `strict` aktiviert
- **AsyncStorage** für Einstellungen und Lernfortschritt (nur lokal auf dem Gerät)
- **expo-speech** für die Vorlesefunktion
- Keine Netzwerkaufrufe, keine Konten, keine Berechtigungen außer dem Öffnen der Telefon-App

### Aufbau

```
senioren-app/
├── src/app/              Bildschirme (expo-router)
│   ├── (tabs)/           Start, Lernen, Hilfe, Einstellungen
│   ├── kurs/[kursId]     Lektionsübersicht eines Kurses
│   ├── lektion/[…]       einzelne Lektion mit Quiz
│   └── soforthilfe/[…]   Notfall-Anleitungen
├── src/components/       Wiederverwendbare Bausteine (Knopf, Karte, Hinweis, Quiz …)
├── src/content/          Alle Inhalte als typisierte Daten (Kurse, Glossar, Notfall, Betrugs-Check)
├── src/lib/              Einstellungen, Fortschritt, Speicher, Sprachausgabe
└── src/constants/        Farben, Schriftgrößen, Abstände
```

Inhalte sind strikt von der Darstellung getrennt: Neue Lektionen entstehen durch Ergänzen einer
Datei in `src/content/kurse/` – ohne Änderung an der Oberfläche.

## Entwicklung

Der Start ist oben unter „Schnellstart" beschrieben. Änderungen im Code erscheinen sofort
im laufenden Programm (Fast Refresh) – ein Neustart ist nicht nötig.

Prüfungen:

```bash
npm run typecheck   # TypeScript
npm run lint        # ESLint
npx expo export --platform all   # Bundles für iOS, Android und Web erzeugen
```

## Fertige Apps für iOS und Android bauen

Die Builds laufen über **EAS Build** (Expo Application Services); die Profile stehen in `eas.json`.

```bash
npm install -g eas-cli
eas login
eas build:configure

# Testversionen
eas build --platform android --profile preview   # APK zum direkten Installieren
eas build --platform ios --profile preview       # für registrierte Testgeräte

# Veröffentlichungsversionen
eas build --platform android --profile production   # AAB für Google Play
eas build --platform ios --profile production       # für den App Store
```

Einreichen in die Stores:

```bash
eas submit --platform android
eas submit --platform ios
```

Voraussetzungen: Für iOS ein Apple-Developer-Konto (99 USD/Jahr), für Android ein
Google-Play-Entwicklerkonto (25 USD einmalig). Der iOS-Build läuft auf den Servern von Expo –
ein Mac ist dafür nicht erforderlich.

Alternativ ohne EAS, mit eigenen nativen Projekten:

```bash
npx expo prebuild            # erzeugt die Ordner ios/ und android/
npx expo run:android         # benötigt Android Studio
npx expo run:ios             # benötigt macOS und Xcode
```

App-Kennungen: `de.digitaldabei.app` (iOS `bundleIdentifier` und Android `package`) – vor der
Veröffentlichung auf die eigene Domain anpassen.

## Hinweis

Die App ersetzt keine Rechts- oder Finanzberatung. Bei einem konkreten Schaden sind Bank,
Polizei und Verbraucherzentrale die richtigen Ansprechpartner.
