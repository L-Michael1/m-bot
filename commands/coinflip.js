const Discord = require("discord.js");
const fs = require("fs");
const Money = require("../models/money.js");
const colours = require("../colours.json");

module.exports = {
    name: "coinflip",
    description: "game to coinflip your coins",
    execute(message, args){

        if(args.length === 0 || args.length === 1){
            return message.reply("**command: !coinflip <heads or tails> <bet amount>**");
        }else if (args.length === 2){
            // userCoinFlip can be heads, head, h, etc.
            let userCoinFlip = args[0].toLowerCase();

            //userBetAmount can be all, a, half, h, and any number
            let userBetAmount = args[1];

            //random coinflip
            let gameCoinFlip = Math.floor(Math.random()*2) + 1;

            console.log("User coin flip: " + userCoinFlip);
            console.log("User bet amount: " + userBetAmount);

            //Check if valid coin flip
            if((userCoinFlip !== 'h' && userCoinFlip !== 'head' && userCoinFlip !== 'heads') &&
               (userCoinFlip !== 't' && userCoinFlip !== 'tail' && userCoinFlip !== 'tails')){
                   return message.reply("**invalid coinflip**");
            }else if(userCoinFlip === 'h' || userCoinFlip === 'head' || userCoinFlip === 'heads'){
                //heads = 1
                userCoinFlip = 1;
            }else{
                //tails = 2
                userCoinFlip = 2;
            }

            //get user coins
            Money.findOne({
                userID: message.author.id
            }, (err, user) => {

                if(err) console.log(err);

                if(user.coins > 0){
                    if(typeof userBetAmount === 'string' || userBetAmount instanceof String){
                        if(userBetAmount === 'h' || userBetAmount === 'half'){
                            userBetAmount = Math.floor((user.coins)/2);
                            //floors userBetAmount to 0 if it was 1, so set back to 1
                            if(userBetAmount === 0){
                                userBetAmount = 1;
                            }
                        }else if(userBetAmount === 'a' || userBetAmount === 'all'){
                            userBetAmount = user.coins;
                        }else{
                            //Change the bet amount to an int if it is a number
                            userBetAmount = parseInt(userBetAmount);
                            if(Number.isNaN(userBetAmount)){
                                return message.reply("**invalid bet amount**");
                            }
                        }
    
                        console.log(userBetAmount);
    
                        //play coinflip
                        if (userBetAmount <= user.coins){
                            //checks win
                            if(gameCoinFlip === 1 && userCoinFlip === 1 || gameCoinFlip === 2 && userCoinFlip === 2){
                                
                                //update coin amount
                                user.coins += Math.floor(userBetAmount);
    
                                //save/write to query
                                user.save()
                                .then(result => console.log(result))
                                .catch(err => console.log(err));
    
                                //check if heads or tails win
                                if(gameCoinFlip === 1){
                                    let coinFlipEmbed = new Discord.RichEmbed()
                                    .setTitle("Coinflip")
                                    .setColor(colours.coral)
                                    .setThumbnail('https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Quarter_Obverse_2010.png/220px-Quarter_Obverse_2010.png')
                                    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
                                    .setDescription(`
                                    It's **heads**
                                    **${message.author.username} won ${userBetAmount} mCoins!**
                                    👛  **wallet: ${user.coins} mCoins\n**`)
                                    .setFooter('mBot | Michael | github.com/L-Michael1');
    
                                    message.channel.send(coinFlipEmbed);
    
                                }else if(gameCoinFlip === 2){
                                    let coinFlipEmbed = new Discord.RichEmbed()
                                    .setTitle("Coinflip")
                                    .setColor(colours.coral)
                                    .setThumbnail(`https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Quarter_Reverse_2010.png/220px-Quarter_Reverse_2010.png`)
                                    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
                                    .setDescription(`
                                    It's **tails**
                                    **${message.author.username} won ${userBetAmount} mCoins!**
                                    👛  **wallet: ${user.coins} mCoins\n**`)
                                    .setFooter('mBot | Michael | github.com/L-Michael1');
    
                                    message.channel.send(coinFlipEmbed);
                                }
    
                            //checks lose
                            }else{
                                
                                //update coin amount
                                user.coins -= userBetAmount;
    
                                //write to json file
                                user.save()
                                .then(result => console.log(result))
                                .catch(err => console.log(err));
    
                                if(gameCoinFlip === 1){
                                    let coinFlipEmbed = new Discord.RichEmbed()
                                    .setTitle("Coinflip")
                                    .setColor(colours.coral)
                                    .setThumbnail('https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Quarter_Obverse_2010.png/220px-Quarter_Obverse_2010.png')
                                    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
                                    .setDescription(`
                                    It's **heads**
                                    **${message.author.username} lost ${userBetAmount} mCoins!**
                                    👛  **wallet: ${user.coins} mCoins\n**`)
                                    .setFooter('mBot | Michael | github.com/L-Michael1');
    
                                    message.channel.send(coinFlipEmbed);
    
                                }else if(gameCoinFlip === 2){
                                    let coinFlipEmbed = new Discord.RichEmbed()
                                    .setTitle("Coinflip")
                                    .setColor(colours.coral)
                                    .setThumbnail(`https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Quarter_Reverse_2010.png/220px-Quarter_Reverse_2010.png`)
                                    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
                                    .setDescription(`
                                    It's **tails**
                                    **${message.author.username} lost ${userBetAmount} mCoins!**
                                    👛  **wallet: ${user.coins} mCoins\n**`)
                                    .setFooter('mBot | Michael | github.com/L-Michael1');
    
                                    message.channel.send(coinFlipEmbed);
                                }
                            }
    
                        }else{
                            return message.reply("**you don't have enough mCoins!**");
                        }
                    }
                }else{
                    return message.reply("**you don't have enough mCoins!**");
                }
            })
        }else{
            return message.reply("**too many arguments!**");
        }
    }
}