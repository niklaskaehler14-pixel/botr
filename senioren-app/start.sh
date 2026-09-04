#!/usr/bin/env bash
# Startet die Senioren-App lokal (macOS und Linux).
# Windows-Nutzer verwenden stattdessen START.bat per Doppelklick.
set -e

cd "$(dirname "$0")"

echo
echo "========================================="
echo "   D I G I T A L   D A B E I   -   S T A R T"
echo "========================================="
echo

if ! command -v node >/dev/null 2>&1; then
  echo "[FEHLER] Node.js ist nicht installiert."
  echo "Bitte Node.js 20 oder neuer installieren: https://nodejs.org/"
  exit 1
fi

echo "[INFO] Node.js $(node -v) gefunden."

version=$(node -p "process.versions.node.split('.')[0]")
if [ "$version" -lt 20 ]; then
  echo "[FEHLER] Node.js 20 oder neuer wird benötigt, gefunden: $(node -v)."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "[INFO] Pakete werden installiert. Das dauert beim ersten Mal etwa eine Minute ..."
  npm install
  echo "[OK] Pakete installiert."
fi

cat <<'HINWEIS'

-----------------------------------------
 Gleich erscheint ein QR-Code. Dann:

   Taste  w  =  App im Browser öffnen
   Taste  a  =  Android-Emulator (Android Studio nötig)
   Taste  i  =  iOS-Simulator (nur auf einem Mac)

   Auf dem Handy: App "Expo Go" installieren,
   Handy und Rechner im gleichen WLAN, QR-Code scannen.

 Beenden mit Strg + C
-----------------------------------------

HINWEIS

npm start
