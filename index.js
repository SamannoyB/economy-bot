const { Client, Intents, MessageEmbed, MessageActionRow, MessageReaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],restRequestTimeout: 60000 });
require("dotenv").config();
const fs = require('fs');
const { parse } = require('path');

client.on('ready', () => {
    console.log(`Logged In As ${client.user.tag}!`);
});



client.on('messageCreate', message => {
    if(message.content.startsWith(`?ping`)) {
        message.reply('Pong!');
    }
});
 
client.on("messageCreate", message => {
    if (message.content.startsWith(`?start`)) {
        let profile;
        
        const userJson = fs.readFileSync(`./DB/users.json`);

         const parsedJson = JSON.parse(userJson);

         parsedJson[message.author.username] = {
            bal: "0"
         }
         fs.writeFileSync(`./DB/users.json`, JSON.stringify(parsedJson));
    }
})

client.on('messageCreate', message => {
    if(message.content.startsWith(`?daily`)) {
        const coinsAmount = ['100','500','700','1000'];

        const amt = coinsAmount[Math.floor(Math.random() * coinsAmount.length)];

        message.reply(`Here You Go @${message.author.username}! You receinved your daily ${amt} coins!!!`);
        const userJson = fs.readFileSync(`./DB/users.json`);

        const parsedJson = JSON.parse(userJson);

        let early = parseInt(parsedJson[message.author.username].bal);
       let newer = parseInt(amt);

       let perf = early + newer;
       parsedJson[message.author.username].bal = perf;

        fs.writeFileSync(`./DB/users.json`, JSON.stringify(parsedJson));
    }
});

client.on("messageCreate", message => {
    if(message.content.startsWith(`?bal`)) {
        var obj;

        fs.readFile('./DB/users.json', 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            const person = `${message.author.username}`;
            var amount = obj[person].bal;
            message.reply('Amount: ' + amount);
        })
    }
})

client.login(process.env.TOKEN)