const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const db = require('./database');
const { client, sendTicketPanel, sendVerifyPanel } = require('./bot'); 

// Passport setup
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID || '',
    clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    callbackURL: process.env.DASHBOARD_URL ? `${process.env.DASHBOARD_URL}/auth/discord/callback` : 'http://localhost:11501/auth/discord/callback',
    scope: ['identify']
}, (accessToken, refreshToken, profile, done) => {
    // Only allow specific users or owner
    const ownerId = process.env.OWNER_ID;
    if (ownerId && profile.id !== ownerId) {
        return done(null, false, { message: 'Unauthorized' });
    }
    return done(null, profile);
}));


const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const expressLayouts = require('express-ejs-layouts');

// Hook console.log to broadcast to dashboard
const originalLog = console.log;
console.log = (...args) => {
    originalLog(...args);
    io.emit('console_log', args.join(' '));
};

io.on('connection', (socket) => {
    socket.emit('console_log', '[System] Dashboard connected. Waiting for logs...');
    console.log(`[Dashboard] New client connected: ${socket.id}`);
});

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // default layout
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Auth middleware
const requireAuth = (req, res, next) => {
    if (req.isAuthenticated() || req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Routes
app.get('/login', (req, res) => {
    res.render('login', { 
        title: 'Login', 
        error: req.query.error || null,
        hasDiscordAuth: !!(process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET)
    });
});

app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === (process.env.ADMIN_PASSWORD || 'admin')) {
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        res.render('login', { title: 'Login', error: 'Invalid password', hasDiscordAuth: false });
    }
});

// Discord Auth Routes
app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/login?error=Unauthorized'
}), (req, res) => {
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy();
        res.redirect('/login');
    });
});

app.get('/', requireAuth, (req, res) => {
    const totalTickets = db.prepare('SELECT COUNT(*) as count FROM tickets').get().count;
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const totalWarns = db.prepare('SELECT COUNT(*) as count FROM warns').get().count;
    
    // Activity data for chart
    const activity = db.prepare('SELECT hour, SUM(count) as total FROM analytics GROUP BY hour').all();
    
    res.render('dashboard', {
        title: 'Dashboard',
        totalTickets,
        totalUsers,
        totalWarns,
        activity,
        botUsername: client.user ? client.user.username : 'Bot Offline'
    });
});

app.get('/tickets', requireAuth, (req, res) => {
    const tickets = db.prepare('SELECT * FROM tickets ORDER BY createdAt DESC').all();
    res.render('tickets', { title: 'Tickets', tickets });
});

app.get('/commands', requireAuth, (req, res) => {
    const commands = db.prepare('SELECT * FROM custom_commands').all();
    res.render('commands', { title: 'Custom Commands', commands });
});

app.post('/commands', requireAuth, (req, res) => {
    const { trigger, response, isEmbed } = req.body;
    db.prepare('INSERT OR REPLACE INTO custom_commands (guildId, trigger, response, isEmbed) VALUES (?, ?, ?, ?)').run('global', trigger.toLowerCase(), response, isEmbed ? 1 : 0);
    res.redirect('/commands');
});

app.get('/commands/delete/:trigger', requireAuth, (req, res) => {
    db.prepare('DELETE FROM custom_commands WHERE trigger = ?').run(req.params.trigger);
    res.redirect('/commands');
});

app.get('/roles', requireAuth, (req, res) => {
    const panels = db.prepare('SELECT panelName FROM reaction_roles GROUP BY panelName').all();
    const roles = db.prepare('SELECT * FROM reaction_roles').all();
    res.render('roles', { title: 'Reaction Roles', panels, roles });
});

app.post('/roles', requireAuth, (req, res) => {
    const { panelName, roleId, emoji, label, style } = req.body;
    db.prepare('INSERT INTO reaction_roles (panelName, roleId, emoji, label, style) VALUES (?, ?, ?, ?, ?)').run(panelName, roleId, emoji, label, style);
    res.redirect('/roles');
});

app.get('/roles/delete/:id', requireAuth, (req, res) => {
    db.prepare('DELETE FROM reaction_roles WHERE id = ?').run(req.params.id);
    res.redirect('/roles');
});

app.get('/api/settings', requireAuth, (req, res) => {
    const settingsRows = db.prepare('SELECT * FROM settings').all();
    const settings = {};
    settingsRows.forEach(row => settings[row.key] = row.value);
    res.json(settings);
});

app.get('/settings', requireAuth, (req, res) => {
    const settingsRows = db.prepare('SELECT * FROM settings').all();
    const settings = {};
    settingsRows.forEach(row => settings[row.key] = row.value);
    
    let roles = [];
    let textChannels = [];
    let voiceChannels = [];
    let categories = [];
    
    if (client.isReady()) {
        const guild = client.guilds.cache.first();
        if (guild) {
            roles = guild.roles.cache.filter(r => r.name !== '@everyone').map(r => ({ id: r.id, name: r.name }));
            const allChannels = guild.channels.cache;
            textChannels = allChannels.filter(c => c.type === 0).map(c => ({ id: c.id, name: c.name }));
            voiceChannels = allChannels.filter(c => c.type === 2).map(c => ({ id: c.id, name: c.name }));
            categories = allChannels.filter(c => c.type === 4).map(c => ({ id: c.id, name: c.name }));
        }
    }
    
    res.render('settings', { title: 'Settings', settings, roles, textChannels, voiceChannels, categories });
});

app.post('/settings', requireAuth, (req, res) => {
    const settings = req.body;
    const insert = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
    
    for (const key in settings) {
        insert.run(key, settings[key]);
    }
    
    res.redirect('/settings?success=true');
});

app.get('/broadcast', requireAuth, (req, res) => {
    let roles = [];
    let channels = [];
    if (client.isReady()) {
        const guild = client.guilds.cache.first();
        if (guild) {
            roles = guild.roles.cache.filter(r => r.name !== '@everyone').map(r => ({ id: r.id, name: r.name }));
            channels = guild.channels.cache.filter(c => c.type === 0).map(c => ({ id: c.id, name: c.name })); // Text channels only
        }
    }
    res.render('broadcast', { title: 'Broadcast', roles, channels, success: req.query.success === 'true' });
});

app.post('/broadcast', requireAuth, async (req, res) => {
    const { channelId, roleId, message } = req.body;
    if (!channelId || !message) return res.redirect('/broadcast?error=Missing fields');

    try {
        const channel = await client.channels.fetch(channelId);
        if (channel) {
            let content = message;
            if (roleId) content = `<@&${roleId}>\n${message}`;
            await channel.send(content);
            res.redirect('/broadcast?success=true');
        } else {
            res.redirect('/broadcast?error=Channel not found');
        }
    } catch (e) {
        console.error(e);
        res.redirect(`/broadcast?error=${encodeURIComponent(e.message)}`);
    }
});

app.get('/setup', requireAuth, (req, res) => {
    let channels = [];
    if (client.isReady()) {
        channels = client.channels.cache
            .filter(c => c.type === 0) 
            .map(c => ({
                id: c.id,
                name: c.name,
                guildName: c.guild.name
            }));
    }
    
    res.render('setup', { 
        title: 'Setup Panel', 
        channels,
        success: req.query.success === 'true',
        error: req.query.error
    });
});

app.post('/setup', requireAuth, async (req, res) => {
    const { channelId, panelType } = req.body;
    
    if (!channelId) {
        return res.redirect('/setup?error=Please select a channel');
    }

    try {
        if (panelType === 'verify') {
            await sendVerifyPanel(channelId);
        } else {
            await sendTicketPanel(channelId);
        }
        res.redirect('/setup?success=true');
    } catch (e) {
        console.error(e);
        res.redirect(`/setup?error=${encodeURIComponent(e.message)}`);
    }
});

// File Sync Endpoint
app.post('/api/sync', (req, res) => {
    const secret = req.headers['x-sync-secret'];
    const filePath = req.headers['x-file-path'];

    if (secret !== process.env.SYNC_SECRET) {
        console.log(`[Sync] Unauthorized access attempt from ${req.ip}`);
        return res.status(403).send('Forbidden');
    }

    if (!filePath) {
        return res.status(400).send('No file path provided');
    }

    const safePath = path.resolve(__dirname, filePath);
    if (!safePath.startsWith(__dirname)) {
        return res.status(400).send('Invalid path');
    }

    const dir = path.dirname(safePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const fileStream = fs.createWriteStream(safePath);
    req.pipe(fileStream);

    fileStream.on('finish', () => {
        console.log(`[Sync] Updated: ${filePath}`);
        res.send('OK');

        const criticalExtensions = ['.js', '.ejs', '.json', '.env'];
        if (criticalExtensions.some(ext => filePath.endsWith(ext))) {
            console.log(`[Sync] ${filePath} changed. Restarting server in 1s...`);
            setTimeout(() => { process.exit(0); }, 1000);
        }
    });

    fileStream.on('error', (err) => {
        console.error(`[Sync] Error writing ${filePath}:`, err);
        res.status(500).send('Error writing file');
    });
});


module.exports = { app, server };
