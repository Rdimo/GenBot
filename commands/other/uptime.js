const { MessageEmbed } = require('discord.js');
module.exports.run = (client, message, args) => {
  let seconds = parseInt((client.uptime / 1000) & 60),
    minutes = parseInt((client.uptime / (1000 * 60)) % 60),
    hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const Timeembed = new MessageEmbed().setColor(client.color.Default).setDescription(`⌛𝘏𝘰𝘶𝘳: ${hours}\n\n⏱𝘔𝘪𝘯𝘶𝘵𝘦𝘴: ${minutes}\n\n⌚𝘚𝘦𝘤𝘰𝘯𝘥𝘴: ${seconds}`);
  message.channel.send(Timeembed);
};
module.exports.help = {
  name: 'uptime',
  aliases: ['uptime', 'ut'],
  category: 'other',
  description: 'get the bots uptime',
  cooldown: 3,
  usage: '',
  example: [],
};
