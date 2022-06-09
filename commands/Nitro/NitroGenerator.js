const randomstring = require('randomstring');
module.exports.run = async (client, message, args) => {
  if (message.channel.id !== client.channel.nitro) return message.channel.sendErrorMessage(`This command can only be used in <#${client.channel.nitro}>`);
  if (message.author.id !== `${client.config.owner.id}`) return message.channel.send(`Only ${client.config.owner.username} can start the miner`);
  message.delete();
  message.channel.sendSuccessMessage(`Starting the Nitro Miner ${message.author}!`);
  var interval = setInterval(function () {
    message.channel.send('https://discord.gift/' + randomstring.generate(30));
  }, 2000);
};
module.exports.help = {
  name: 'nitrogen',
  aliases: ['nitrogen', 'nitrogenerator', 'startgen', 'startnitrogen'],
  category: 'kahoot',
  description: 'Start the Nitro miner!',
  cooldown: 5,
  usage: '',
  example: [],
};
