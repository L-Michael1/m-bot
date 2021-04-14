module.exports = {
    name: 'kick',
    description: 'kick!',
    execute(message, args){
        //Check if user has permissions
        if(!message.member.hasPermission(["ADMINISTRATOR", "KICK_MEMBERS"])){
            return message.reply("you don't have permissions for this command!");
        }

        //Check if no mentioned user
        if(!message.mentions.users.size){
            return message.reply('error getting user!');
        }

        //Grabs first mentioned user in the text
        //Returns a 'User' object
        const taggedUser = message.mentions.users.first();

        //Check if bot has permissions
        if(!message.guild.me.hasPermission(["ADMINISTRATOR", "KICK_MEMBERS"])){
            return message.reply("sorry I don't have permissions to kick the user...");
        }

        if(taggedUser){
            //Get member from the user
            //Member is a member in the server, user is a global Discord user, we must get the 'member' to kick the 'member' from the 'guild'
            const member = message.guild.member(taggedUser);
            //If member is in guild
            if(member){
                member.kick('Kicked member').then(() => {
                    message.reply(`Successfully kicked ${taggedUser.tag}`);
                })
                .catch(err => {
                    message.reply(`I was unable to kick ${taggedUser.tag}`);
                    console.error(err);
                })
            //if not member in guild
            }else{
                message.reply("This user isn't in the guild!");
            }
        //User doesn't exist/no mention
        }else{
            message.reply("You didn't mention the user to kick!");
        }

        // message.channel.send(`You wanted to kick: ${taggedUser}`);
    },
};