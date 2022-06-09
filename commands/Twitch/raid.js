const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {

message.channel.send(new MessageEmbed()
        .setColor(client.color.Default)
        .setDescription('Still work in progress')
    )
}
module.exports.help = {
    name: "raid",
    aliases: ['raid', 'twitch-raid'],
    category: 'twitch',
    description: "Raid a twitch streamer!",
    cooldown: 300,
    usage: '',
    example: ["raid pewdiepie"],
};
