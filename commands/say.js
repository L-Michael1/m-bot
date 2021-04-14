module.exports = {
    name: 'say',
    description: 'say!',
    execute(message, args){
        //.join will join the messages in the array starting from the first word seperating by the paramter (which is " " in this case)
        const sayMessage = args.join(" ");
        message.delete().catch(); 
        message.channel.send(sayMessage);
    },
};