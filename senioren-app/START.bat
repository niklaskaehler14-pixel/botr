@echo off
chcp 65001 >nul
title Digital dabei - Senioren-App starten
cd /d "%~dp0"

echo.
echo =========================================
echo    D I G I T A L   D A B E I   -   S T A R T
echo =========================================
echo.

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [FEHLER] Node.js ist nicht installiert oder nicht im PATH.
    echo Bitte Node.js 20 oder neuer installieren: https://nodejs.org/
    echo.
    pause
    exit /b
)

for /f "tokens=*" %%v in ('node -v') do echo [INFO] Node.js %%v gefunden.

if not exist "node_modules\" (
    echo [INFO] Pakete werden installiert. Das dauert beim ersten Mal etwa eine Minute...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [FEHLER] npm install fehlgeschlagen. Bitte Internetverbindung pruefen.
        pause
        exit /b
    )
    echo.
    echo [OK] Pakete installiert.
)

echo.
echo -----------------------------------------
echo  Gleich erscheint ein QR-Code. Dann:
echo.
echo    Taste  w  =  App im Browser oeffnen
echo    Taste  a  =  Android-Emulator (Android Studio noetig)
echo    Taste  i  =  iOS-Simulator (nur auf einem Mac)
echo.
echo    Auf dem Handy: App "Expo Go" installieren,
echo    Handy und PC im gleichen WLAN, QR-Code scannen.
echo.
echo  Beenden mit Strg + C
echo -----------------------------------------
echo.

call npm start

echo.
echo [INFO] Der Entwicklungsserver wurde beendet.
pause
