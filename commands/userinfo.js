const colours = require('../colours.json');
const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'userinfo!',
    execute(message, args){
        
        if(!message.mentions.users.size && args.length == 0){
            let myEmbed = new Discord.RichEmbed()
            .setColor(colours.purple_light)
            .setTitle("User Info")
            .setThumbnail(message.author.displayAvatarURL)
            .setAuthor(`${message.author.username}'s Info`, message.author.displayAvatarURL)
            .addField("**Username:**", `${message.author.username}`,true)
            .addField("**Discriminator:**", `${message.author.discriminator}`,true)
            .addField("**ID:**", `${message.author.id}`,true)
            .addField("**Status:**", `${message.author.presence.status}`,true)
            .addField("**Created at:**", `${message.author.createdAt}`,true)
            .setFooter('mBot | Michael | github.com/L-Michael1');

            message.channel.send({embed: myEmbed});

        //Check if member mentioned exists
        }else if(message.mentions.users.size && args.length > 0){
            //Get mentioned user
            const taggedUser = message.mentions.users.first();

            //if user exists
            if(taggedUser){
                //get member of guild
                const member = message.guild.member(taggedUser);
                
                //check if member in guild
                if(member){
                    let myEmbed = new Discord.RichEmbed()
                    .setColor(colours.purple_light)
                    .setTitle("User Info")
                    .setThumbnail(taggedUser.displayAvatarURL)
                    .setAuthor(`${taggedUser.username}'s Info`, taggedUser.displayAvatarURL)
                    .addField("**Username:**", `${taggedUser.username}`,true)
                    .addField("**Discriminator:**", `${taggedUser.discriminator}`,true)
                    .addField("**ID::**", `${taggedUser.id}`,true)
                    .addField("**Status:**", `${taggedUser.presence.status}`,true)
                    .addField("**Created at:**", `${taggedUser.createdAt}`,true)
                    .setFooter('mBot | Michael | github.com/L-Michael1');
                    message.channel.send({embed: myEmbed});
                    
                }else{
                    message.reply("This user isn't in the guild!");
                }
            }
        }else{
            message.reply("I cannot find the user in the guild!");
        }
    },
};