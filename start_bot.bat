@echo off
title GalaxyBot Starter
cd /d "%~dp0"

echo.
echo =========================================
echo       G A L A X Y B O T   S T A R T E R
echo =========================================
echo.

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b
)

if not exist "node_modules\" (
    echo [WARNING] node_modules not found.
    echo [INFO] Installing dependencies automatically...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install failed. Please check your internet connection.
        pause
        exit /b
    )
    echo.
    echo [SUCCESS] Dependencies installed.
)

echo [INFO] Starting GalaxyBot and Dashboard...
echo.

node index.js

if %errorlevel% neq 0 (
    echo.
    echo [CRITICAL] Bot crashed or stopped with an error.
    echo Please check the log messages above.
)

echo.
echo =========================================
echo.
pause
