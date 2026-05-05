# GalaxyBot Deployment Guide

Follow these steps to successfully deploy the bot to your server.

## 1. Prepare the Upload
Run the `prepare_upload.ps1` script in your local project folder. This will create a folder named `UPLOAD_ME` containing only the necessary files.

## 2. Zip and Upload
1.  Open the `UPLOAD_ME` folder.
2.  Select all files inside it.
3.  Right-click and select **Compress to ZIP file**.
4.  Upload this ZIP file to your server.

## 3. Extraction
On your server, extract the ZIP file. Since it no longer contains the `node_modules` folder, the extraction should be instant and error-free.

## 4. Install Dependencies
Once the files are on the server, open the terminal in the project directory and run:
```bash
npm install
```
This will install all required packages (including `discord.js`, `canvas`, `better-sqlite3`, etc.) specifically for the server's operating system.

## 5. Environment Variables
Ensure your `.env` file is present on the server and contains the correct values (Bot Token, Database path, etc.).

## 6. Start the Bot
Run the following command to start the bot:
```bash
node index.js
```
(Recommended: Use a process manager like **pm2** to keep the bot running 24/7).
```bash
npm install -g pm2
pm2 start index.js --name galaxy-bot
```

## Troubleshooting
- **Canvas errors**: If you get errors related to `canvas`, your server might be missing system dependencies. On Linux (Ubuntu/Debian), run:
  `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`
- **SQLite errors**: If `better-sqlite3` fails to install, ensure you have Python and a C++ compiler installed on the server.
