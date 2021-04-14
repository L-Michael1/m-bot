const colours = require(`../colours.json`);
const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'serverinfo!',
    execute(message, args){
        let myEmbed = new Discord.RichEmbed()
        .setColor(colours.pink)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`,true)
        .addField("**Guild Owner:**", `${message.guild.owner.user.username}`,true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.size}`, true)
        .setFooter('mBot | Michael Lam | github.com/L-Michael1');
    
        message.channel.send({embed: myEmbed});
    },
};