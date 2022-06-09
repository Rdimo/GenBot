const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args) => {
  if (message.channel.id !== client.channel.generator) return message.channel.sendErrorMessage(`This command can only be used in <#${client.channel.generator}>`);
  fs.readFile('./accounts/netflix.txt', (err, file) => {
    if (file.length == 0) {
      message.channel.send(new MessageEmbed().setDescription(`Sorry we are out of stock on \`${message.content.slice(client.config.PREFIX.length).split(/ +/)}\` Accounts`));
    } else {
      fs.readFile('./accounts/netflix.txt', 'utf8', function (err, data) {
        if (err) throw err;

        data = data + '';
        var lines = data.split('\n');
        let account = lines[Math.floor(Math.random() * 1)];

        fs.writeFile('./accounts/netflix.txt', lines.slice(1).join('\n'), function (err) {
          if (err) throw err;
        });
        const acc = account.split(':');
        message.author.send({
          embed: {
            title: 'Netflix Account',
            color: `${client.color.LightGreen}`,
            fields: [
              {
                name: 'Username/Email',
                value: acc[0],
              },
              {
                name: 'Password',
                value: acc[1],
              },
              {
                name: 'Copy:Paste',
                value: account,
              },
            ],
          },
        });

        const genembed = new MessageEmbed()
          .setAuthor('Account Generator', `${client.config.links.GenIcon}`, `${client.config.links.HandlerInvite}`)
          .setTitle('Account Generated!')
          .setDescription(`${client.emoji.success}Check your dm for the account's information!`)
          .setColor(client.color.Green)
          .setFooter(`Join CheatAway Here | ${client.config.links.website} | https://github.com/Rdimo/GenBot`, `${client.user.displayAvatarURL()}`)
          .setTimestamp();

        message.channel.send(genembed);
      });
    }
  });
};

module.exports.help = {
  name: 'netflix',
  aliases: ['netflix', 'netflix'],
  category: 'generator',
  description: 'generate a netflix account',
  cooldown: 900,
  usage: '',
  example: [],
};
