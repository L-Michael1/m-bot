const colours = require(`../colours.json`);
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'help',
    execute(message,args){
        let myEmbed = new Discord.RichEmbed()
        .setColor(colours.pink)
        .setTitle("**Bot commands**")
        .setThumbnail(message.guild.iconURL)
        .setDescription(`
        \n__**General commands**__\n
        **!help** -- Gives command list\n
        **!serverinfo** -- Displays server info\n
        **!userinfo** -- Displays own profile info\n
        **!avatar** -- Displays user's profile picture\n
        **!say <text>** -- Gives the bot something to say\n
        __**Game commands**__\n
        **!rps** -- Play rock paper scissors against the bot\n
        **!dice <dice #> <bet amount>** -- Gamble with dice roll (6x payout)\n
        **!cf <h or t> <bet amount>** -- Gamble with coin flip (2x payout)\n 
        __**Economy commands**__\n
        **!coins** -- Check how many coins you have for your profile\n
        **!coins <@user>** -- Check how many coins another member has\n
        **!donate <@user> <amount>** -- Donate to other members in the server!\n
        __**Moderation commands**__\n
        **!report <@user> <reason>** -- Reports a user for a certain action and stores the report\n
        **!kick <@user>** -- Kicks user from the server\n
        **!ban <@user>** -- Bans user from the server\n
        **!purge <# msgs to be cleared>** -- Clears certain # of msgs\n
        `)
        .setFooter('mBot | Michael Lam | github.com/L-Michael1');
    
        message.author.send({embed: myEmbed});
        message.reply("I sent you a DM for a list of commands!");
    },
};