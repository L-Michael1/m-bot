const Discord = require('discord.js');
const fs = require('fs');
const Money = require("./models/money.js");
const colours = require(`./colours.json`);

//Create an instance of the discord client
const client = new Discord.Client({ disableEveryone: true }); // creating a bot

//connect mongodb
client.mongoose = require('./utils/mongoose.js');
const mongoose = require('mongoose');

//Make a new discord collection
client.commands = new Discord.Collection();

//fs.readdirSync will return an array of all the file names in commands file that ends with .js
//ex. ['help.js', 'serverinfo.js']
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Loop over array and set commands to the collection made above
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// This is a ready event and is vital meaning it will only after this runs, the bot will start reacting to information
// received from Discord
// will only run once hence the .once function
client.once('ready', () => {
    console.log(`I am now online! My name is ${client.user.username}!`);

    //Sets status on discord
    client.user.setPresence({
        status: "online",
        game: {
            name: "Getting developed",
            type: "PLAYING"
        }
    })
});

// Create an event listener for when a guild member is added
client.on('guildMemberAdd', (member) => {
    //Send the message to a designated channel on the server
    const channel = member.guild.channels.find(channel => channel.name === 'welcome');
    //Do nothing if the channel wasn't found on the server
    if (!channel) return;

    //Send message to new mentioned member
    channel.send(`Welcome to the server, ${member}`);
});

// Event listener when a guild member leaves or is kicked or banned
client.on('guildMemberRemove', (member) => {
    const channel = member.guild.channels.find(channel => channel.name === 'welcome');

    if (!channel) return;

    channel.send(`${member} has left the server :(`);
});

//bot.on will run over and over again if messages are constantly sent
//takes in a message and will output commands based on those messages
//Event listener for messages
client.on('message', async (message) => {

    //ignore messages from bots/own bot
    if (message.author.bot || message.channel.type === "dm") return;

    //Get random coins for messaging
    let coinAmt = Math.floor(Math.random() * 5) + 1;
    let baseAmt = Math.floor(Math.random() * 5) + 1;
    console.log(`${coinAmt} ; ${baseAmt}`);

    if (coinAmt === baseAmt) {

        coinAmt += 5;

        //Search for user in mongo
        Money.findOne({
            userID: message.author.id,
        }, (err, user) => {

            if (err) console.log(err);

            //if user doesn't exist, create a new Money schema for user
            if (!user) {
                const newMoney = new Money({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: 100 + coinAmt
                })

                newMoney.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));

                //append to user's money
            } else {
                user.coins += coinAmt;
                user.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
            }

            let coinEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username)
                .setThumbnail(message.author.displayAvatarURL)
                .setColor(colours.purple_light)
                .addField(":moneybag:", `${coinAmt} coins added!`)
                .setFooter('mBot | Michael | github.com/L-Michael1');

            message.channel.send(coinEmbed).then(msg => { msg.delete(2500) });
        })
    }

    //message.content will read in the whole message from the user (ex. burglar: !ping me im talking) message.content = !ping me im talking
    //split will read the message.content up until the space
    // / +/ will read only one space in between words, not multiple, so arguments will be easy to read
    // let messageArray = message.content.split(/ +/);

    //stores arguments starting after the first argument
    let args = message.content.split(/ +/).slice(1);

    //stores command name and args, stored in array
    let cmdName = message.content.slice(1).split(' ');

    //stores command name (!coins)
    let CMD = cmdName.shift().toLowerCase();

    //logs messages into terminal from discord server to keep a chat log
    console.log(`${message.createdAt}: ${message.author.username}: ${message.content}`);

    //Dynamically load and runs commands
    if (!client.commands.has(CMD)) return;

    const command = client.commands.get(CMD);

    //execute command
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

//initialize mongoose client
client.mongoose.init();

//Login to the bot using token
client.login(process.env.TOKEN);