const { Client, Intents, MessageEmbed, MessageActionRow, MessageReaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],restRequestTimeout: 60000 });
require("dotenv").config();
const fs = require('fs');

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
});

client.on('messageCreate', message => {
    if(message.content.startsWith(`?dig`)) {
        message.react('??????');
        const amt = ['50','60'];
        
        const op = amt[Math.floor(Math.random() * amt.length)];

        message.reply(`You received ${op} for digging!`);

        const userJson = fs.readFileSync(`./DB/users.json`);

        const parsedJson = JSON.parse(userJson);

        let early = parseInt(parsedJson[message.author.username].bal);
       let newer = parseInt(op);

       let perf = early + newer;
       parsedJson[message.author.username].bal = perf;

        fs.writeFileSync(`./DB/users.json`, JSON.stringify(parsedJson));
    }
});

client.on('messageCreate', message => {
     if (message.content.startsWith(`?pay`)) {
        let amtPay = message.content.split(" ");
        let paid = amtPay[1];
        let recipient = amtPay[2];

        const userJson = fs.readFileSync(`./DB/users.json`);

        const parsedJson = JSON.parse(userJson);

        // Comments here


       if (isNaN(paid)) {
        message.reply(`The second argument must be a number.`);
       }
       if (parsedJson[message.author.username].bal < paid) 
       {
        message.reply(`You do not have that much coins in your bank.`);
       }
       else {
         message.reply(`Success! You succesfully paid ${paid} to ${amtPay[2]}`);
         let earlye = parseInt(parsedJson[message.author.username].bal);
         let newere = parseInt(paid);
  
         let perfe = earlye - newere;
         let parse = parsedJson[message.author.username].bal = perfe;   
          fs.writeFileSync(`./DB/users.json`, JSON.stringify(parse));

         let early = parseInt(parsedJson[recipient].bal);
       let newer = parseInt(paid);

       let perf = early + newer;
       parsedJson[recipient].bal = perf;   
        fs.writeFileSync(`./DB/users.json`, JSON.stringify(parsedJson));
    }
    }
});




client.login(process.env.TOKEN)
