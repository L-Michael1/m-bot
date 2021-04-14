module.exports = {
    name: 'avatar',
    description: 'gets user avatar',
    execute(message,args){
        message.reply(message.author.displayAvatarURL);
    },
};