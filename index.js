const { Client, Collection, TextChannel, Intents } = require('discord.js');
const { loadCommands, loadEvents } = require('./util/loader');
const client = new Client({
  disableMentions: 'everyone',
  ws: { intents: Intents.ALL },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  fetchAllMembers: true,
});
['commands', 'cooldowns'].forEach((x) => (client[x] = new Collection()));
loadCommands(client);
loadEvents(client);
require('./util/anti-crash');

client.config = require('./config');
client.emoji = client.config.emojis;
client.color = client.config.colors;
client.channel = client.config.channels;

TextChannel.prototype.sendSuccessMessage = function (content, file) {
  return this.send(`${client.emoji.success} ${content}`, file);
};
TextChannel.prototype.sendErrorMessage = function (content, file) {
  return this.send(`${client.emoji.error} ${content}`, file);
};

client.login(client.config.Token.Discord);
