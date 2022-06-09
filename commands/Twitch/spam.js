const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args) => {
  message.channel.send(new MessageEmbed().setColor(client.color.Default).setDescription('Still work in progress'));
};

module.exports.help = {
  name: 'spam',
  aliases: ['spam', 'twitch-spam'],
  category: 'twitch',
  description: 'Spam a selected message in a twitch streamers chat!',
  cooldown: 300,
  usage: '',
  example: ['raid pewdiepie'],
};
