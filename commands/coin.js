const Discord = require("discord.js");
const Money = require("../models/money.js");
const colours = require("../colours.json");
const mongoose = require('mongoose');

module.exports = {
    name: "coins",
    description: "gets user total coins",
    execute(message,args){

        if(!message.mentions.users.size && args.length == 0){
            
            //find the user with coins
            Money.findOne({
                userID: message.author.id,
            }, (err, user) => {
    
                if(err) console.log(err);

                //create message embed
                let coinEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username + "'s wallet", message.author.displayAvatarURL)
                .setThumbnail(message.author.displayAvatarURL)
                .setColor(colours.hot_pink)
                .setFooter('mBot | Michael | github.com/L-Michael1');

                //if user doesn't have money, they have 0
                if(!user){
                    const newMoney = new Money ({
                        _id: mongoose.Types.ObjectId(),
                        userID: message.author.id,
                        serverId: message.guild.id,
                        coins: 100
                    })
    
                    newMoney.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));

                    coinEmbed.addField(`👛 :  ${newMoney.coins} mCoins` , "---------------")
                    return message.channel.send(coinEmbed);
                }else{
                    coinEmbed.addField(`👛 :  ${user.coins} mCoins` , "---------------")
                    return message.channel.send(coinEmbed);
                }
            })

        }else if(message.mentions.users.size && args.length > 0){
        
            //Get mentioned user
            const taggedUser = message.mentions.users.first();
            console.log(taggedUser);
            Money.findOne({
                userID: taggedUser.id,
            }, (err, user) => {
    
                if(err) console.log(err);

                //create message embed
                let coinEmbed = new Discord.RichEmbed()
                .setAuthor(taggedUser.username + "'s wallet", taggedUser.displayAvatarURL)
                .setThumbnail(taggedUser.displayAvatarURL)
                .setColor(colours.hot_pink)
                .setFooter('mBot | Michael | github.com/L-Michael1');

                //if tagged user doesn't have money, create a new Money schema
                if(!user){
                    const newMoney = new Money ({
                        _id: mongoose.Types.ObjectId(),
                        userID: taggedUser.id,
                        serverId: message.guild.id,
                        coins: 100
                    })
                    newMoney.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));

                    coinEmbed.addField(`👛 :  ${newMoney.coins} mCoins` , "---------------")
                    return message.channel.send(coinEmbed);
                }else{
                    coinEmbed.addField(`👛 :  ${user.coins} mCoins` , "---------------")
                    return message.channel.send(coinEmbed);
                }
            })
        }
    }
}
module.exports.help = {
    name: "coins"
}