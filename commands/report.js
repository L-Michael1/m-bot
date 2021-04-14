const Discord = require('discord.js');
const mongoose = require('mongoose');

//require our report schema/model
const Report = require("../models/report.js");

module.exports = {
    name: "report",
    description: "test database",
    execute(message,args){
        let rUser = message.mentions.users.first();
        if(!rUser) return message.reply("can't find that member.");
        let rreason = args.slice(1).join(" ");
        if(!rreason) return message.reply("please supply a reason.")

        //create the new report
        const report = new Report({
            _id: mongoose.Types.ObjectId(),
            username: rUser.username,
            userID: rUser.id,
            reason: rreason,
            rUsername: message.author.username,
            rID: message.author.id,
            time: message.createdAt
        });

        report.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    
        message.reply("report has been saved, we will look into this case!");
    },
}