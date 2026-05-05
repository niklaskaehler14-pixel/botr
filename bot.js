const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField, AttachmentBuilder } = require('discord.js');
const { createCanvas } = require('canvas');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const play = require('play-dl');
const db = require('./database');

// Gemini Setup
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

// Music Queue
const queues = new Map();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

// Emoji Captcha Mapping
const EMOJI_MAP = {
    'APPLE': '🍎',
    'CAR': '🚗',
    'DOG': '🐶',
    'PIZZA': '🍕',
    'ROCKET': '🚀'
};

client.once('ready', async () => {
    console.log(`Bot logged in as ${client.user.tag}`);
    
    // Register slash commands
    const commands = [
        {
            name: 'setup-ticket-panel',
            description: 'Set up the ticket creation panel in this channel.',
        },
        {
            name: 'setup-verify-panel',
            description: 'Set up the verify panel in this channel.',
        },
        {
            name: 'rank',
            description: 'Check your current level and XP.',
        },
        {
            name: 'leaderboard',
            description: 'See who has the most XP in the server.',
        },
        {
            name: 'warn',
            description: 'Warn a user.',
            options: [
                { name: 'user', type: 6, description: 'The user to warn', required: true },
                { name: 'reason', type: 3, description: 'Reason for the warning', required: true }
            ]
        },
        {
            name: 'warnings',
            description: 'List warnings for a user.',
            options: [{ name: 'user', type: 6, description: 'The user to check', required: true }]
        },
        {
            name: 'setup-role-panel',
            description: 'Send the reaction role panel defined in the database.',
            options: [{ name: 'panel_name', type: 3, description: 'Name of the panel to send', required: true }]
        },
        {
            name: 'play',
            description: 'Play a song from YouTube.',
            options: [{ name: 'query', type: 3, description: 'Song name or URL', required: true }]
        },
        {
            name: 'skip',
            description: 'Skip the current song.'
        },
        {
            name: 'stop',
            description: 'Stop the music and leave the voice channel.'
        }
    ];

    try {
        const guilds = await client.guilds.fetch();
        for (const [id, guildBase] of guilds) {
            const guild = await guildBase.fetch();
            await guild.commands.set(commands);
            console.log(`[Bot] Slash commands registered INSTANTLY for guild: ${guild.name}`);
        }
        
        // Clean up global commands to prevent duplicates
        await client.application.commands.set([]);
        console.log("[Bot] Global commands cleared to prevent duplicates.");
    } catch (e) {
        console.error("[Bot] Failed to register commands:", e);
    }
});

/**
 * Sends the ticket panel to a specific channel.
 * @param {String} channelId 
 */
async function sendTicketPanel(channelId) {
    const channel = await client.channels.fetch(channelId);
    if (!channel) throw new Error("Channel not found");

    const embed = new EmbedBuilder()
        .setTitle('Support Tickets')
        .setDescription('Click the button below to create a new support ticket.')
        .setColor('#2ecc71');

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('create_ticket')
                .setLabel('Create Ticket')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🎫')
        );

    return await channel.send({ embeds: [embed], components: [row] });
}

/**
 * Sends the verify panel to a specific channel.
 * @param {String} channelId 
 */
async function sendVerifyPanel(channelId) {
    const channel = await client.channels.fetch(channelId);
    if (!channel) throw new Error("Channel not found");

    const embed = new EmbedBuilder()
        .setTitle('Server Verification')
        .setDescription('Click the button below to verify yourself and gain access to the server.')
        .setColor('#3498db');

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('start_verify')
                .setLabel('Verify')
                .setStyle(ButtonStyle.Success)
                .setEmoji('✅')
        );

    return await channel.send({ embeds: [embed], components: [row] });
}

/**
 * Sends a Reaction Role panel.
 */
async function sendRolePanel(channelId, panelName) {
    const channel = await client.channels.fetch(channelId);
    const roles = db.prepare('SELECT * FROM reaction_roles WHERE panelName = ?').all(panelName);
    if (roles.length === 0) throw new Error("Panel not found or has no roles");

    const embed = new EmbedBuilder()
        .setTitle(`${panelName} - Rollenwahl`)
        .setDescription('Klicke auf die Buttons, um dir Rollen zuzuweisen oder sie zu entfernen.')
        .setColor('#9b59b6');

    const rows = [];
    let currentRow = new ActionRowBuilder();

    roles.forEach((role, i) => {
        if (i > 0 && i % 5 === 0) {
            rows.push(currentRow);
            currentRow = new ActionRowBuilder();
        }
        
        currentRow.addComponents(
            new ButtonBuilder()
                .setCustomId(`toggle_role_${role.roleId}`)
                .setLabel(role.label)
                .setEmoji(role.emoji || null)
                .setStyle(ButtonStyle[role.style] || ButtonStyle.Secondary)
        );
    });
    rows.push(currentRow);

    return await channel.send({ embeds: [embed], components: rows });
}

// Map to keep track of active captchas { userId: 'WORD' }
const activeCaptchas = new Map();

// Helper to log events
async function logEvent(guild, title, description, color = '#7289da') {
    const logSetting = db.prepare('SELECT value FROM settings WHERE key = ?').get('logChannelId');
    if (!logSetting || !logSetting.value) return;

    const channel = guild.channels.cache.get(logSetting.value.trim());
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp();
    
    await channel.send({ embeds: [embed] }).catch(console.error);
}

// XP and Leveling Logic
client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;

    // 0. Analytics Tracking
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    db.prepare('UPDATE analytics SET count = count + 1 WHERE hour = ? AND day = ?').run(hour, day);

    // 1. AI Auto-Mod & Chatbot
    if (model) {
        // A. Auto-Mod (Toxicity Check)
        // We only check if it's a long message or looks suspicious (to save API quota)
        if (message.content.length > 5) {
            try {
                const prompt = `Du bist ein Discord Auto-Moderator. Bewerte die Toxizität (Hassrede, Beleidigung, Spam) der folgenden Nachricht auf einer Skala von 0 bis 100. Antworte NUR mit der Zahl.\nNachricht: "${message.content}"`;
                const result = await model.generateContent(prompt);
                const score = parseInt(result.response.text().trim());
                
                if (score > 80) {
                    await message.delete().catch(() => {});
                    message.channel.send(`⚠️ ${message.author.toString()}, bitte achte auf deine Wortwahl. (KI-Score: ${score})`).then(m => setTimeout(() => m.delete(), 5000));
                    logEvent(message.guild, 'AI Auto-Mod', `Nachricht von ${message.author.tag} gelöscht.\n**Inhalt:** ${message.content}\n**Score:** ${score}`, '#e74c3c');
                    return; // Stop processing if deleted
                }
            } catch (e) { console.error("AI Mod error:", e); }
        }

        // B. AI Chatbot
        const aiChannelSetting = db.prepare('SELECT value FROM settings WHERE key = ?').get('aiChannelId');
        if (aiChannelSetting && aiChannelSetting.value === message.channel.id) {
            message.channel.sendTyping();
            try {
                const prompt = `Du bist GalaxyBot, ein hilfreicher und cooler Discord-Bot. Antworte freundlich auf: ${message.content}`;
                const result = await model.generateContent(prompt);
                return message.reply(result.response.text());
            } catch (e) {
                console.error("AI Chat error:", e);
                return message.reply("Ich habe gerade Kopfschmerzen... frag mich später nochmal.");
            }
        }
    }

    // 1. Custom Commands (Global)
    const cmd = db.prepare('SELECT * FROM custom_commands WHERE guildId = ? AND trigger = ?').get('global', message.content.toLowerCase());
    if (cmd) {
        if (cmd.isEmbed) {
            const embed = new EmbedBuilder().setDescription(cmd.response).setColor('#3498db');
            return message.reply({ embeds: [embed] });
        } else {
            return message.reply(cmd.response);
        }
    }

    // 2. XP Gain
    const userId = message.author.id;
    const guildId = message.guild.id;
    
    const user = db.prepare('SELECT * FROM users WHERE userId = ? AND guildId = ?').get(userId, guildId);

    if (!user) {
        db.prepare('INSERT INTO users (userId, guildId, xp, level, lastMessageAt) VALUES (?, ?, ?, ?, ?)').run(userId, guildId, 10, 0, now.toISOString());
    } else {
        const lastMsg = new Date(user.lastMessageAt);
        if (now - lastMsg > 60000) { // 1 minute cooldown
            const xpGain = Math.floor(Math.random() * 11) + 15; // 15-25 XP
            let newXp = user.xp + xpGain;
            let newLevel = user.level;
            
            const xpNeeded = (newLevel + 1) * 500;
            if (newXp >= xpNeeded) {
                newLevel++;
                message.reply(`🎉 **Glückwunsch!** Du hast Level **${newLevel}** erreicht!`);
                logEvent(message.guild, 'Level Up', `${message.author.toString()} hat Level **${newLevel}** erreicht!`, '#f1c40f');
            }
            
            db.prepare('UPDATE users SET xp = ?, level = ?, lastMessageAt = ? WHERE userId = ? AND guildId = ?').run(newXp, newLevel, now.toISOString(), userId, guildId);
        }
    }
});

// Welcome Image Logic
client.on('guildMemberAdd', async member => {
    const welcomeSetting = db.prepare('SELECT value FROM settings WHERE key = ?').get('welcomeChannelId');
    if (!welcomeSetting || !welcomeSetting.value) return;

    const channel = member.guild.channels.cache.get(welcomeSetting.value.trim());
    if (!channel) return;

    try {
        const canvas = createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        // Background Gradient
        const grad = ctx.createLinearGradient(0, 0, 700, 0);
        grad.addColorStop(0, '#2c3e50');
        grad.addColorStop(1, '#000000');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Avatar Circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(125, 125, 80, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        
        const avatar = await require('canvas').loadImage(member.user.displayAvatarURL({ extension: 'jpg' }));
        ctx.drawImage(avatar, 45, 45, 160, 160);
        ctx.restore();

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = '35px sans-serif';
        ctx.fillText(`Willkommen,`, 230, 100);
        
        ctx.font = 'bold 50px sans-serif';
        ctx.fillText(member.user.username, 230, 160);
        
        ctx.font = '25px sans-serif';
        ctx.fillText(`Du bist Mitglied #${member.guild.memberCount}`, 230, 210);

        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome.png' });
        await channel.send({ content: `Willkommen auf **${member.guild.name}**, ${member.toString()}!`, files: [attachment] });
    } catch (e) {
        console.error("Welcome image error:", e);
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'setup-ticket-panel') {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({ content: 'You do not have permission.', ephemeral: true });
            }
            try {
                await sendTicketPanel(interaction.channelId);
                await interaction.reply({ content: 'Ticket panel established!', ephemeral: true });
            } catch (e) {
                console.error(e);
                await interaction.reply({ content: 'Failed to send panel.', ephemeral: true });
            }
        } else if (interaction.commandName === 'setup-verify-panel') {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({ content: 'You do not have permission.', ephemeral: true });
            }
            try {
                await sendVerifyPanel(interaction.channelId);
                await interaction.reply({ content: 'Verify panel established!', ephemeral: true });
            } catch (e) {
                console.error(e);
                await interaction.reply({ content: 'Failed to send verify panel.', ephemeral: true });
            }
        } else if (interaction.commandName === 'rank') {
            const user = db.prepare('SELECT * FROM users WHERE userId = ? AND guildId = ?').get(interaction.user.id, interaction.guild.id);
            if (!user) return interaction.reply({ content: 'Du hast noch keine XP gesammelt.', ephemeral: true });

            const xpNeeded = (user.level + 1) * 500;
            const progress = (user.xp / xpNeeded) * 100;

            const canvas = createCanvas(600, 150);
            const ctx = canvas.getContext('2d');

            // BG
            ctx.fillStyle = '#23272a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Progress Bar
            ctx.fillStyle = '#484b4e';
            ctx.fillRect(150, 100, 400, 20);
            ctx.fillStyle = '#3498db';
            ctx.fillRect(150, 100, (user.xp / xpNeeded) * 400, 20);

            // Text
            ctx.fillStyle = '#ffffff';
            ctx.font = '30px sans-serif';
            ctx.fillText(interaction.user.username, 150, 50);
            ctx.font = '20px sans-serif';
            ctx.fillText(`Level: ${user.level} | XP: ${user.xp} / ${xpNeeded}`, 150, 85);

            const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'rank.png' });
            await interaction.reply({ files: [attachment] });

        } else if (interaction.commandName === 'leaderboard') {
            const top = db.prepare('SELECT * FROM users WHERE guildId = ? ORDER BY xp DESC LIMIT 10').all(interaction.guild.id);
            const embed = new EmbedBuilder().setTitle('🏆 Top 10 Leaderboard').setColor('#f1c40f');
            
            let desc = '';
            top.forEach((u, i) => {
                desc += `**${i+1}.** <@${u.userId}> - Level ${u.level} (${u.xp} XP)\n`;
            });
            embed.setDescription(desc || 'Noch niemand auf dem Leaderboard!');
            await interaction.reply({ embeds: [embed] });

        } else if (interaction.commandName === 'warn') {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({ content: 'No permission.', ephemeral: true });
            const target = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason');

            db.prepare('INSERT INTO warns (userId, guildId, reason, moderatorId) VALUES (?, ?, ?, ?)').run(target.id, interaction.guild.id, reason, interaction.user.id);
            
            await logEvent(interaction.guild, 'User Verwarnt', `**Nutzer:** ${target.toString()}\n**Grund:** ${reason}\n**Moderator:** ${interaction.user.toString()}`, '#e67e22');
            await interaction.reply({ content: `${target.toString()} wurde verwarnt.`, ephemeral: true });

        } else if (interaction.commandName === 'warnings') {
            const target = interaction.options.getUser('user');
            const userWarns = db.prepare('SELECT * FROM warns WHERE userId = ? AND guildId = ?').all(target.id, interaction.guild.id);

            const embed = new EmbedBuilder().setTitle(`Warnungen für ${target.username}`).setColor('#e74c3c');
            let desc = '';
            userWarns.forEach((w, i) => {
                desc += `**#${w.id}** - ${w.reason} (Moderator: <@${w.moderatorId}>)\n`;
            });
            embed.setDescription(desc || 'Keine Warnungen gefunden.');
            await interaction.reply({ embeds: [embed] });
        } else if (interaction.commandName === 'setup-role-panel') {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: 'No perm.', ephemeral: true });
            const panelName = interaction.options.getString('panel_name');
            try {
                await sendRolePanel(interaction.channelId, panelName);
                await interaction.reply({ content: 'Role panel sent!', ephemeral: true });
            } catch (e) {
                await interaction.reply({ content: `Error: ${e.message}`, ephemeral: true });
            }
        } else if (interaction.commandName === 'play') {
            await interaction.deferReply();
            const query = interaction.options.getString('query');
            const voiceChannel = interaction.member.voice.channel;
            
            if (!voiceChannel) return interaction.editReply('Du musst in einem Voice-Channel sein!');
            
            let queue = queues.get(interaction.guild.id);
            if (!queue) {
                queue = {
                    connection: joinVoiceChannel({
                        channelId: voiceChannel.id,
                        guildId: interaction.guild.id,
                        adapterCreator: interaction.guild.voiceAdapterCreator,
                    }),
                    player: createAudioPlayer(),
                    songs: [],
                    loop: false
                };
                queue.connection.subscribe(queue.player);
                queues.set(interaction.guild.id, queue);
                
                queue.player.on(AudioPlayerStatus.Idle, () => {
                    queue.songs.shift();
                    if (queue.songs.length > 0) playSong(interaction.guild.id);
                    else {
                        queue.connection.destroy();
                        queues.delete(interaction.guild.id);
                    }
                });
            }

            const searchResult = [];
            if (play.sp_validate(query) !== 'search' && query.includes('spotify.com')) {
                if (play.is_expired()) await play.refreshToken();
                const sp_data = await play.spotify(query);
                const results = await play.search(`${sp_data.name} ${sp_data.artists[0].name}`, { limit: 1 });
                if (results.length > 0) searchResult.push(results[0]);
            } else {
                const results = await play.search(query, { limit: 1 });
                if (results.length > 0) searchResult.push(results[0]);
            }

            if (searchResult.length === 0) return interaction.editReply('Nichts gefunden.');
            
            queue.songs.push(searchResult[0]);
            if (queue.songs.length === 1) playSong(interaction.guild.id);
            
            await interaction.editReply(`🎶 Zu Warteschlange hinzugefügt: **${searchResult[0].title}**`);

        } else if (interaction.commandName === 'skip') {
            const queue = queues.get(interaction.guild.id);
            if (!queue) return interaction.reply({ content: 'Nichts wird abgespielt.', ephemeral: true });
            queue.player.stop();
            await interaction.reply('⏭️ Übersprungen!');
            
        } else if (interaction.commandName === 'stop') {
            const queue = queues.get(interaction.guild.id);
            if (!queue) return interaction.reply({ content: 'Nichts wird abgespielt.', ephemeral: true });
            queue.connection.destroy();
            queues.delete(interaction.guild.id);
            await interaction.reply('🛑 Musik gestoppt.');
        }
    } else if (interaction.isButton()) {
        if (interaction.customId === 'create_ticket') {
            const guild = interaction.guild;
            
            // Generate ticket ID
            const insert = db.prepare(`INSERT INTO tickets (userId, status) VALUES (?, ?)`).run(interaction.user.id, 'open');
            const ticketId = insert.lastInsertRowid;

            const categorySetting = db.prepare(`SELECT value FROM settings WHERE key = ?`).get('categoryId');
            const roleSetting = db.prepare(`SELECT value FROM settings WHERE key = ?`).get('supportRoleId');

            let channelOptions = {
                name: `ticket-${ticketId}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                    { id: guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                    { id: interaction.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] }
                ]
            };

            if (categorySetting && categorySetting.value) channelOptions.parent = categorySetting.value;
            if (roleSetting && roleSetting.value) channelOptions.permissionOverwrites.push({ id: roleSetting.value, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] });

            const channel = await guild.channels.create(channelOptions);
            db.prepare(`UPDATE tickets SET channelId = ? WHERE id = ?`).run(channel.id, ticketId);

            const embed = new EmbedBuilder().setTitle(`Ticket #${ticketId}`).setDescription(`Hello ${interaction.user.toString()}, a support member will be with you shortly.`).setColor('#f1c40f');
            const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('close_ticket').setLabel('Close Ticket').setStyle(ButtonStyle.Danger).setEmoji('🔒'));

            await channel.send({ content: `${interaction.user.toString()}`, embeds: [embed], components: [row] });
            await interaction.reply({ content: `Ticket created: ${channel.toString()}`, ephemeral: true });

        } else if (interaction.customId === 'close_ticket') {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ content: 'Only staff can close tickets.', ephemeral: true });
            
            const channel = interaction.channel;
            db.prepare(`UPDATE tickets SET status = ? WHERE channelId = ?`).run('closed', channel.id);
            const ticketRow = db.prepare(`SELECT * FROM tickets WHERE channelId = ?`).get(channel.id);
            if (ticketRow) channel.permissionOverwrites.edit(ticketRow.userId, { SendMessages: false });

            const embed = new EmbedBuilder().setTitle('Ticket Closed').setDescription('This ticket has been closed.').setColor('#e74c3c');
            const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('delete_ticket').setLabel('Delete Ticket').setStyle(ButtonStyle.Danger).setEmoji('🗑️'));

            await interaction.reply({ embeds: [embed], components: [row] });

        } else if (interaction.customId === 'delete_ticket') {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ content: 'Only staff can delete tickets.', ephemeral: true });
            await interaction.reply('Channel will be deleted in 3 seconds...');
            setTimeout(() => { interaction.channel.delete().catch(console.error); }, 3000);
        } else if (interaction.customId === 'start_verify') {
            await interaction.deferReply({ ephemeral: true });
            
            try {
                // Pick random word
                const words = Object.keys(EMOJI_MAP);
                const targetWord = words[Math.floor(Math.random() * words.length)];
                activeCaptchas.set(interaction.user.id, targetWord);

                // Create Canvas
                const canvas = createCanvas(300, 100);
                const ctx = canvas.getContext('2d');
                
                // Background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Text
                ctx.font = 'bold 40px sans-serif';
                ctx.fillStyle = '#000000';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(targetWord, canvas.width / 2, canvas.height / 2);

                // Add some noise lines
                ctx.strokeStyle = '#aaaaaa';
                for (let i=0; i<5; i++) {
                    ctx.beginPath();
                    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                    ctx.stroke();
                }

                const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'captcha.png' });

                const embed = new EmbedBuilder()
                    .setTitle('Verification')
                    .setDescription('Please click the emoji that matches the word in the image below.')
                    .setImage('attachment://captcha.png')
                    .setColor('#9b59b6');

                // Shuffle emojis
                const row = new ActionRowBuilder();
                const shuffledWords = [...words].sort(() => Math.random() - 0.5);
                
                shuffledWords.forEach(word => {
                    row.addComponents(
                        new ButtonBuilder()
                            .setCustomId(`verify_emoji_${word}`)
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(EMOJI_MAP[word])
                    );
                });

                await interaction.editReply({ embeds: [embed], files: [attachment], components: [row] });
            } catch (e) {
                console.error("Verification error: ", e);
                await interaction.editReply({ content: 'An error occurred while generating the verification. Please try again.' });
            }

        } else if (interaction.customId.startsWith('verify_emoji_')) {
            const chosenWord = interaction.customId.split('_')[2];
            const correctWord = activeCaptchas.get(interaction.user.id);

            if (!correctWord) {
                return interaction.reply({ content: 'Your verification session expired. Please click Verify again.', ephemeral: true });
            }

            if (chosenWord === correctWord) {
                // Success
                const verifyRoleSetting = db.prepare(`SELECT value FROM settings WHERE key = ?`).get('verifyRoleId');
                if (verifyRoleSetting && verifyRoleSetting.value) {
                    const roleId = verifyRoleSetting.value.trim();
                    const role = interaction.guild.roles.cache.get(roleId);
                    if (role) {
                        try {
                            await interaction.member.roles.add(role);
                            await interaction.reply({ content: '✅ Verification successful! You have been given the role.', ephemeral: true });
                        } catch(e) {
                            console.error("Role assignment error:", e);
                            await interaction.reply({ content: 'I do not have permission to assign that role. Please contact an admin.', ephemeral: true });
                        }
                    } else {
                        await interaction.reply({ content: `✅ Verification successful! (Role ID ${roleId} not found on server)`, ephemeral: true });
                    }
                } else {
                    await interaction.reply({ content: '✅ Verification successful! (No role configured)', ephemeral: true });
                }
                activeCaptchas.delete(interaction.user.id);
            } else {
                // Fail
                await interaction.reply({ content: '❌ Incorrect. Please click Verify to try again.', ephemeral: true });
                activeCaptchas.delete(interaction.user.id);
            }
        } else if (interaction.customId.startsWith('toggle_role_')) {
            const roleId = interaction.customId.split('_')[2];
            const role = interaction.guild.roles.cache.get(roleId);
            if (!role) return interaction.reply({ content: 'Rolle nicht gefunden.', ephemeral: true });

            if (interaction.member.roles.cache.has(roleId)) {
                await interaction.member.roles.remove(role);
                await interaction.reply({ content: `Rolle **${role.name}** entfernt.`, ephemeral: true });
            } else {
                await interaction.member.roles.add(role);
                await interaction.reply({ content: `Rolle **${role.name}** zugewiesen.`, ephemeral: true });
            }
        }
    }
});

async function playSong(guildId) {
    const queue = queues.get(guildId);
    if (!queue || queue.songs.length === 0) return;

    const song = queue.songs[0];
    const stream = await play.stream(song.url);
    const resource = createAudioResource(stream.stream, { inputType: stream.type });
    queue.player.play(resource);
}

// Join to Create Logic
client.on('voiceStateUpdate', async (oldState, newState) => {
    // Check if joined a channel (even if switching from another voice channel)
    if (newState.channelId && oldState.channelId !== newState.channelId) {
        const joinToCreateSetting = db.prepare(`SELECT value FROM settings WHERE key = ?`).get('joinToCreateVoiceId');
        if (joinToCreateSetting && joinToCreateSetting.value.trim() === newState.channelId) {
            const guild = newState.guild;
            const categorySetting = db.prepare(`SELECT value FROM settings WHERE key = ?`).get('joinToCreateCategoryId');
            
            try {
                const newChannel = await guild.channels.create({
                    name: `${newState.member.user.username}'s Channel`,
                    type: ChannelType.GuildVoice,
                    parent: categorySetting && categorySetting.value ? categorySetting.value.trim() : null
                });
                
                await newState.setChannel(newChannel);
            } catch(e) {
                console.error("Failed to create voice channel: ", e);
            }
        }
    }

    // Check if left a channel and it should be deleted
    if (oldState.channelId && oldState.channelId !== newState.channelId) {
        // Find if old channel was a dynamically created one (we can identify them by checking if they are empty and not the master join channel)
        const joinToCreateSetting = db.prepare(`SELECT value FROM settings WHERE key = ?`).get('joinToCreateVoiceId');
        if (oldState.channelId !== (joinToCreateSetting ? joinToCreateSetting.value.trim() : null)) {
            const oldChannel = oldState.guild.channels.cache.get(oldState.channelId);
            // Delete if it's a voice channel, has 0 members, and name ends with 's Channel (basic check)
            if (oldChannel && oldChannel.type === ChannelType.GuildVoice && oldChannel.members.size === 0) {
                if (oldChannel.name.endsWith("'s Channel")) {
                    try {
                        await oldChannel.delete();
                    } catch(e) {
                        console.error("Failed to delete empty voice channel: ", e);
                    }
                }
            }
        }
    }
});

module.exports = { client, sendTicketPanel, sendVerifyPanel };
