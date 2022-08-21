/**
 * Astro Buddy Discord Bot.
 * By Anas Arkawi, 2022
 */


// Configure dotenv
require('dotenv').config();


// Import modules
const Discord = require('discord.js');

// Import own modules
const apiReqs = require('./apiReqs.js');


// Configure Discord.js
const dcPrefix = '~';
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent]});


// Bot
client.on('messageCreate', async (msg) => {
    // Check if the message contains the prefix, if not return false
    if (!msg.content.startsWith(dcPrefix)) return false;

    // Extract message content
    let content = msg.content.substring(1); // Remove the prefix
    let command = content.split(' ')[0]; // Extract the command from the message
    let input = content.split(' ')[1]; // Extract command input, if any

    switch(command) {
        case 'help':
            let embed = new Discord.EmbedBuilder()
                .setTitle('Help')
                .addFields(
                    { name: '`~help`', value: 'Shows this message.' },
                    { name: '`~today`', value: 'Shows today\'s picture of the day.' },
                    { name: '`~date YYYY-MM-DD`', value: 'Shows the picture of the day of a specific day in the given date format.' }
                );
            msg.reply({embeds: [embed]});
            break;
        case 'today':
            console.log('today');
            apiReqs.today((res) => {
                let embed = new Discord.EmbedBuilder()
                    .setTitle(`Today\'s image: ${res.title}`)
                    .addFields(
                        { name: 'Date', value: res.date }
                    )
                    .setImage(res.url);
                msg.reply({embeds: [embed]});
                msg.channel.send(res.explanation);
            });
            break;
        case 'date':
            apiReqs.date(input, (res) => {
                if (res == false) {
                    msg.reply('Something went wrong... I\'d say we should blame discord not the developer :kissing_smiling_eyes: :v:');
                    return false;
                }
                let embed = new Discord.EmbedBuilder()
                    .setTitle(`Pidtuce of the day of ${input}: ${res.title}`)
                    .setImage(res.url);
                msg.reply({embeds: [embed]});
                msg.channel.send(res.explanation);
            });
            break;
    }
});


// Login to discord
client.login(process.env.DISCORD_TOKEN);
client.on('ready', () => {
    console.log('[INFO] Bot is onliine!');
});