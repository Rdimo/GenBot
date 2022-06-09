module.exports.run = (client, message, args) => {
  message.channel.send('Pinging...').then((msgs) => {
    const ping = msgs.createdTimestamp - message.createdTimestamp;
    msgs.edit(`${client.emoji.pingpong} Response ping is: \`${ping}\`ms | Discord API latency is: \`${client.ws.ping}\`ms`);
  });
};
module.exports.help = {
  name: 'ping',
  aliases: ['ping', 'latency'],
  category: 'other',
  description: 'get the bots latancy',
  cooldown: 3,
  usage: '',
  example: [],
};
