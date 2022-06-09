const { Collection, MessageEmbed } = require('discord.js');
module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type === 'dm') return;
  if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

  //---------------HANDLER---------------
  if (!message.content.startsWith(client.config.PREFIX)) return;
  const args = message.content.slice(client.config.PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName));

//---------------BLACKLIST---------------
  const blacklistedUser = client.config.blacklistedUsers.ID
      let listed = false
      blacklistedUser.forEach(id => {
          if (message.author.id === id) listed = true
      })
  
      if (listed === true) return message.channel.sendErrorMessage(`You are blacklisted from ${client.user.username}`)
      
//---------------COOLDOWN---------------
if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  }
  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;
  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;
    if (timeNow < cdExpirationTime && message.author.id != client.config.owner.id) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      const cooldownembed = new MessageEmbed()
        .setAuthor('Slow down there...', '', `${client.config.links.website}`)
        .setDescription(`You need to wait ${timeLeft.toFixed(0)} second(s) before using \`${command.help.name}\` again.`)
        .setFooter(`Join CheatAway Here | ${client.config.links.website}`, `${client.user.displayAvatarURL()}`);
      return message.channel.send(cooldownembed);
    }
  }
  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  //----------------RUN THE COMMAND---------------
  try {
    await command.run(client, message, args);
  } catch (e) {
    console.log(e);
  }
};
