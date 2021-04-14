const Discord = require("discord.js");
const fs = require("fs");
const colours = require("../colours.json");
const Money = require("../models/money.js");
const mongoose = require('mongoose');

module.exports = {
    name: "donate",
    description: "allows user to donate coins to others in the guild",
    execute(message,args){

        Money.findOne({userID: message.author.id}, (err,user) => {

            if(err) console.log (err);
            
            //if user doesnt exist, create a query
            if(!user){
                const newMoney = new Money ({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    serverID: message.guild.id,
                    coins: 100 + coinAmt
                })

                newMoney.save()
                .then(result => console.log(result))
                .catch(err => console.log(err));
            }

            if(user.coins > 0){
                if(!message.mentions.users.size){
                    return message.reply("**usage: !donate <@user>**");
                }else{
                    const taggedUser = message.mentions.users.first();
                    const donateAmount = parseInt(args[1]);
        
                    if(Number.isNaN(donateAmount)){
                        return message.reply("**invalid amount**");
                    }
        
                    if(taggedUser.id === message.author.id){
                        return message.reply("*why are you trying to donate to yourself...?*");
                    }
        
                    console.log(user.coins);
                    console.log("donate amount: " + donateAmount);
                    //if donate amount is within range of amount in wallet
                    if(donateAmount > 0 && donateAmount < user.coins){

                        //update user's coins
                        user.coins -= donateAmount;

                        //save user's new coin amount
                        user.save()
                        .then(result => console.log(result))
                        .catch(err => console.log(err));

                        Money.findOne({
                            userID: taggedUser.id
                        }, (err, user) => {

                            if(err) console.log(err);

                            //if no user found, create new query and add to their amount
                            if(!user){
                                const newMoney = new Money ({
                                    _id: mongoose.Types.ObjectId(),
                                    userID: message.author.id,
                                    serverID: message.guild.id,
                                    coins: 100 + donateAmount
                                })

                                newMoney.save()
                                .then(result => console.log(result))
                                .catch(err => console.log(err));
                            }else{
                                //update donatee's coins
                                user.coins += donateAmount;
                                
                                //save to query
                                user.save()
                                .then(result => console.log(result))
                                .catch(err => console.log(err));
                            }
                        })
        
                        let donateEmbed = new Discord.RichEmbed()
                        .setTitle("🎉  Donation  🎉")
                        .setColor(colours.light_green)
                        .setThumbnail(message.author.displayAvatarURL)
                        .addField(`🥳  ${message.author.username} donated ${donateAmount} mCoin(s) to ${taggedUser.username}!`, "--------------------------------------------")
                        .setDescription("\t\t\tThanks for donating! \n--------------------------------------------")
                        .setFooter('mBot | Michael | github.com/L-Michael1');
        
                        message.channel.send(donateEmbed);
        
                    }else{
                        return message.reply("**invalid donation amount!**");
                    }
                }
            }else{
                return message.reply("**you don't have enough mCoins to donate :(**");
            }
        })
    }
}