const Discord = require("discord.js");
const Schedule = require("../models/todo.js");
const colours = require("../colours.json");
const mongoose = require('mongoose');

printTodo = () => {
    
}

module.exports = {
    name: "todo",
    description: "adds a task to the user's todo list",
    execute(message,args){

        //Find a user with a schedule
        Schedule.findOne({
            userID: message.author.id,
        }, (err, user) => {

            if(err) console.log(err);

            //create new schedule for user if doesnt exist
            if(!user){
                const newSchedule = new Schedule({
                    _id: mongoose.Types.ObjectId(),
                    username: message.author.username,
                    userID: message.author.id, 
                    serverID: message.guild.id,
                    tasks: undefined,
                })

                newSchedule.save()
                .then(result => console.log(result))
                .catch(err => console.log(err))

                try{
                    message.reply(`**to-do list** (to finish a task, type remove <task #>)`);
                    message.channel.send(user.tasks);
                }catch(error){
                    return message.channel.send("No tasks!")
                    console.log(error);
                }

            }else{
                console.log(args);
                if(args.length != 0){
                    //append to user's tasks
                    let splitMsg = message.content.trim().replace("!todo", "").substring(1);
                    user.tasks.push(splitMsg);

                    //update query
                    user.save()
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
                }
                try{
                    message.reply(`**to-do list** (to finish a task, type !remove <task #>)`);
                    return message.channel.send(user.tasks);
                }catch(error){
                    console.error(error);
                    message.channel.send("No tasks!");
                }
            }
        })
    }
}