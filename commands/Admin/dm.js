module.exports.run = async (client, message, args) => {
  if (message.author.id != client.config.owner.id) return;
  message.delete();
  const user = message.mentions.users.first();

  if (!user) return message.channel.send('You need to mention someone to dm!').then((m) => m.delete({ timeout: 1000 }));
  user.send(args.slice(1).join(' '));
};
module.exports.help = {
  name: 'dm',
  aliases: ['dm'],
  category: 'admin',
  description: 'dm someone',
  cooldown: 3,
  usage: '',
  example: [],
};
