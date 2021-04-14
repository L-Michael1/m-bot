const Discord = require("discord.js");
const colours = require("../colours.json");
const Money = require("../models/money.js");
const fs = require('fs');

module.exports = {
    name: "dice",
    description: "gamble with dice roll that gives you 6x payout the amount you bet if you win",
    execute(message, args){

        //Check for enough arguments to play dice
        if(args.length === 0 || args.length === 1){
            return message.reply("**command: !dice <dice #> <bet amount>**");
        }else if(args.length === 2){
            //get user dice roll and bet amount
            let userDiceRoll = parseInt(args[0]);
            let userBetAmount = args[1];
            let gameDiceRoll = Math.floor(Math.random()* 6) + 1;
            
            console.log("User dice roll " + userDiceRoll);
            console.log("User bet amount " +userBetAmount);
            console.log("Game dice roll " + gameDiceRoll);

            if(userDiceRoll < 1 || userDiceRoll > 6 || Number.isNaN(userDiceRoll)){
                return message.reply("**invalid dice roll!**");
            }

            Money.findOne({
                userID: message.author.id
            }, (err, user) => {

                if(err) console.log (err);
                //if user inputs 'h' or 'half' or 'a' or 'all'
                //parse the string as an int
                if(user.coins > 0){
                    if (typeof userBetAmount === 'string' || userBetAmount instanceof String){
                        userBetAmount = userBetAmount.toLowerCase();
                        if(userBetAmount === 'h' || userBetAmount === 'half'){
                            userBetAmount = Math.floor((user.coins)/2);
                            if(userBetAmount === 0){
                                userBetAmount = 1;
                            }
                        }else if(userBetAmount === 'a' || userBetAmount === 'all'){
                            userBetAmount = user.coins;
                        }else{
                            userBetAmount = parseInt(userBetAmount);
                            if(Number.isNaN(userBetAmount)){
                                return message.reply("**invalid bet amount**");
                            }
                        }
                    }

                    console.log(userBetAmount);
                    if(userBetAmount <= user.coins){
                            
                        //play dice
                        if(userDiceRoll === gameDiceRoll){

                            //update coin amount in query
                            user.coins += Math.floor(userBetAmount*6);

                            //update query
                            user.save()
                            .then(result => console.log(result))
                            .catch(err => console.log(err));

                            //win
                            let diceEmbed = new Discord.RichEmbed()
                            .setTitle("Dice")
                            .setThumbnail(message.author.displayAvatarURL)
                            .setColor(colours.turqoise)
                            .addField(`you rolled: ${userDiceRoll}`, "---------------")
                            .addField(`:game_die:  roll: ${gameDiceRoll}`, "---------------"  )
                            .addField(`:partying_face:  you won ${Math.floor(userBetAmount*6)} mCoins!`, "---------------")
                            .addField(`👛  wallet: ${user.coins}`, "---------------")
                            .setFooter('mBot | Michael | github.com/L-Michael1');

                            message.channel.send(diceEmbed);

                        }else{
                            //update coin amount in query
                            user.coins -= userBetAmount;

                            //update query
                            user.save()
                            .then(result => console.log(result))
                            .catch(err => console.log(err));

                            //loss
                            let diceEmbed = new Discord.RichEmbed()
                            .setTitle("Dice")
                            .setThumbnail(message.author.displayAvatarURL)
                            .setColor(colours.hot_pink)
                            .addField(`you rolled: ${userDiceRoll}`, "---------------")
                            .addField(`:game_die:  roll: ${gameDiceRoll}`, "---------------") 
                            .addField(`:pleading_face:  you lost ${userBetAmount} mCoins!`, "---------------")
                            .addField(`👛  wallet: ${user.coins}`, "---------------")
                            .setFooter('mBot | Michael | github.com/L-Michael1');

                            message.channel.send(diceEmbed);
                        }

                    }else{
                        return message.reply("**you don't have enough mCoins!**");
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