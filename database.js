const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'database.sqlite'), { verbose: console.log });

// Initialize database schema
db.pragma('journal_mode = WAL');

db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
    );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        channelId TEXT,
        userId TEXT,
        status TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        userId TEXT,
        guildId TEXT,
        xp INTEGER DEFAULT 0,
        level INTEGER DEFAULT 0,
        lastMessageAt DATETIME,
        PRIMARY KEY (userId, guildId)
    );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS warns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT,
        guildId TEXT,
        reason TEXT,
        moderatorId TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS custom_commands (
        guildId TEXT,
        trigger TEXT,
        response TEXT,
        isEmbed INTEGER DEFAULT 0,
        PRIMARY KEY (guildId, trigger)
    );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS reaction_roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        panelName TEXT,
        roleId TEXT,
        emoji TEXT,
        label TEXT,
        style TEXT DEFAULT 'Secondary'
    );
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS analytics (
        hour INTEGER,
        day INTEGER,
        count INTEGER DEFAULT 0,
        PRIMARY KEY (hour, day)
    );
`);

// Initialize analytics table with 0s if empty
const count = db.prepare('SELECT COUNT(*) as count FROM analytics').get().count;
if (count === 0) {
    for (let d = 0; d < 7; d++) {
        for (let h = 0; h < 24; h++) {
            db.prepare('INSERT INTO analytics (hour, day, count) VALUES (?, ?, 0)').run(h, d);
        }
    }
}

module.exports = db;
