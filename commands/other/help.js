const { MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports.run = (client, message, args) => {
  if (!args.length) {
    const embed = new MessageEmbed()
      .setColor(`${client.color.Default}`)
      .addField(`${client.user.username}\'s Help Page`, `\nFor more information on a Specific command, run \`${client.config.PREFIX}help [command name | alias]\`\n**[Invite](${client.config.links.HandlerInvite})・[Website](${client.config.links.website})**`)
      .setFooter(`Total Commands・${client.commands.size - 1}`, `${client.user.displayAvatarURL()}`);
      let twitchCmds = '';
      let NitroCmds = '';
      let generatorCmds = '';
      let otherCmds = '';
      fs.readdirSync('./commands/Generator').forEach((file) => generatorCmds += `${client.config.PREFIX}${file.slice(0, file.lastIndexOf('.'))} `);
      fs.readdirSync('./commands/Twitch').forEach((file) => twitchCmds += `${client.config.PREFIX}${file.slice(0, file.lastIndexOf('.'))} `);
      fs.readdirSync('./commands/Nitro').forEach((file) => NitroCmds += `${client.config.PREFIX}${file.slice(0, file.lastIndexOf('.'))} `);
      fs.readdirSync('./commands/other').forEach((file) => otherCmds += `${client.config.PREFIX}${file.slice(0, file.lastIndexOf('.'))} `);
      embed.addFields(
        { name: `${client.emoji.Generator}・Generator`, value: `${'`' +  generatorCmds + '`'}`},
        { name: `${client.emoji.Twitch}・Twitch`, value: `${'`' +  twitchCmds + '`'}`},
        { name: `${client.emoji.Nitro}・Nitro`, value: `${'`' +  NitroCmds + '`'}`},
        { name: `${client.emoji.Other}・Other`, value: `${'`' +  otherCmds + '`'}`})
    return message.channel.send(embed);
  } else {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0])); 
    if (!command) {
      return message.channel.sendErrorMessage('Command not found')
    }
    const embed = new MessageEmbed()
      .setColor(`${client.color.Default}`)
      .setAuthor(`${client.config.PREFIX}${command.help.name}`, `${client.user.displayAvatarURL()}`)
      .addField("**__Description:__**", `${command.help.description} | \`${command.help.cooldown}s\` Cooldown`)
      .addField("**__Usage:__**", command.help.usage ? `${client.config.PREFIX}${command.help.name} ${command.help.usage}` : `${client.config.PREFIX}${command.help.name}`, true)
      .setTimestamp()
      .setFooter(`${message.guild.name}・https://github.com/Rdimo/GenBot`, `${message.guild.iconURL({ dynamic: true }) ? message.guild.iconURL({ dynamic: true }) : ''}`);
    if (command.help.aliases.length > 1) embed.addField("**__Alias :__**", `${command.help.aliases.join(`, `)}`);
    if (command.help.exemple && command.help.exemple.length > 0) embed.addField("**__Examples :__**", `${client.config.PREFIX}${command.help.exemple.join(`\r\n${client.config.PREFIX}`)}`);
    if (command.help.subcommands && command.help.subcommands.length > 0) embed.addField("**__Subcommands :__**", command.help.subcommands.map(cmd => `**${client.config.PREFIX}${command.help.name} ${cmd.name}** ${cmd.description} ${cmd.usage ? '\`' + cmd.usage + '\`' : ''}`));
    return message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  aliases: ['help'],
  category: 'other',
  description: "List of bot commands.",
  cooldown: 7,
  usage: '[command_name]',
  example: ["help", "help ping"],
};