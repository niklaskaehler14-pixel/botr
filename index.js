require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log("Starting GalaxyBot...");

// 1. Check for node_modules
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.error("\nFATAL ERROR: 'node_modules' folder not found!");
    console.error("Please run 'npm install' in this folder before starting.");
    console.log("\nPress any key to exit...");
    process.exit(1);
}

// 2. Check for critical environment variables
const requiredEnv = ['DISCORD_TOKEN', 'ADMIN_PASSWORD', 'SYNC_SECRET'];
const missingEnv = requiredEnv.filter(key => !process.env[key]);

if (missingEnv.length > 0) {
    console.error(`\nFATAL ERROR: Missing variables in .env: ${missingEnv.join(', ')}`);
    console.error("Ensure your .env file exists and contains these values.");
    process.exit(1);
}

const { client } = require('./bot');
const { server } = require('./server');

const PORT = process.env.PORT || 11501;

// 3. Start Server
server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n=========================================`);
    console.log(`🚀 Dashboard: http://localhost:${PORT}`);
    console.log(`🔐 Sync active on port: ${PORT}`);
    console.log(`=========================================\n`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\nFATAL ERROR: Port ${PORT} is already in use!`);
        console.error(`Please close any other GalaxyBot windows or change the PORT in .env.`);
        process.exit(1);
    } else {
        console.error("\nServer Startup Error:", err);
    }
});

// 4. Start Discord Bot
console.log("Connecting to Discord...");
client.login(process.env.DISCORD_TOKEN.trim()).catch(err => {
    console.error("\nFATAL ERROR: Discord Login Failed.");
    console.error("Reason:", err.message);
    console.error("Please verify your DISCORD_TOKEN in the .env file.");
    process.exit(1);
});

