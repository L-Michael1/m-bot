module.exports = {
    name: 'purge',
    description: 'purge!',
    execute(message, args){
        const deleteCount = parseInt(args[0],10);

        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("**you have no permissions!**");
        }
        if(!deleteCount || deleteCount < 2 || deleteCount > 500) {
            return message.channel.send("Enter the amount of messages you want to clear between 2 and 500!");
        }
        message.channel.bulkDelete(deleteCount).then(() => {
            message.reply(`Cleared ${deleteCount} messages. `).then(message => message.delete(5000)).catch(err => console.log(err));
        })
    },
};