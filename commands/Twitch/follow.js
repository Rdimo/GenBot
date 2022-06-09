const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const request = require('request');
const fs = require('fs');
var tokens = fs.readFileSync('./commands/Twitch/tokens.txt', 'utf-8');
tokens = tokens.split('\n');

module.exports.run = async (client, message, args) => {
  config = {
    '': 1500, // Owner
    '': 500, // Gen access
    '': 200, // Booster
    '': 50, // Member
  };

  if (message.channel.id !== client.channel.twitch) return message.channel.send(`This command can only be used in <#${client.channel.twitch}>`);
  let twitchID = '';

  if (client.config.owner.id.includes(message.author.id)) {
    if (!args[0]) return message.channel.send(new MessageEmbed().setColor(client.color.red).setDescription('You must specify a twitch username !'));

    var roleID = Object.entries(config).find(([key, value]) => message.member.roles.cache.sort((a, b) => a.position - b.position).find((x) => x.id === key));

    if (!roleID) roleID = [null, 0];

    await getUser(args[0]).then((res) => {
      if (res._total === 0) {
        return message.channel.send(new MessageEmbed().setColor(client.color.red).setDescription('You must specify **valid** a twitch username !'));
      } else {
        twitchID = res.users[0]._id;
      }
    });

    let number = args[1] ? parseInt(args[1]) : roleID[1] + 25;
    follow(twitchID, number).then((cool) => {
      const channel = client.channels.cache.find((c) => c.name === 'Proof');
      if (channel)
        channel
          .send(
            new MessageEmbed()
              .setColor(client.color.Green)
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({
                  format: 'png',
                  dynamic: true,
                  size: 1024,
                }),
              )
              .setFooter(
                message.guild.name,
                message.guild.iconURL({
                  dynamic: true,
                }),
              )
              .setDescription(
                `Successfully added **${number}** followers to \`${args[0]}\` (Twitch ID: \`${twitchID}\`)\n\nCheck out [${args[0]}'s twitch channel](https://twitch.tv/${args[0]}/)`,
              ),
          )
          .then((msg) => {
            msg.react('<a:VoteYes:853347971865116672>');
          });
    });
    message.channel.send(new MessageEmbed().setColor(client.color.Green).setDescription(`Adding **${number}** followers to \`${args[0]}\` !`));
  } else if (!client.config.owner.id.includes(message.author.id)) {
    var roleID = Object.entries(config).find(([key, value]) => message.member.roles.cache.sort((a, b) => a.position - b.position).find((x) => x.id === key));

    if (!args[0]) return message.channel.send(new MessageEmbed().setColor(client.color.red).setDescription('You must specify a twitch username !'));

    let number = 25;

    if (roleID) {
      number = number + roleID[1];
    }

    await getUser(args[0]).then((res) => {
      if (res._total === 0) {
        return message.channel.send(new MessageEmbed().setColor(client.color.red).setDescription('You must specify **valid** a twitch username !'));
      } else {
        twitchID = res.users[0]._id;
      }
    });

    message.channel.send(new MessageEmbed().setColor(client.color.Green).setDescription(`Adding **${number}** followers to \`${args[0]}\` !`));

    follow(twitchID, number).then((cool) => {
      const channel = client.channels.cache.find((c) => c.name === 'twitchfollow-logs');
      if (channel)
        channel
          .send(
            new MessageEmbed()
              .setColor(client.color.Green)
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({
                  format: 'png',
                  dynamic: true,
                  size: 1024,
                }),
              )
              .setFooter(
                message.guild.name,
                message.guild.iconURL({
                  dynamic: true,
                }),
              )
              .setDescription(
                `Successfully added **${number}** followers to \`${args[0]}\` (Twitch ID: \`${twitchID}\`)\n\nCheck out [${args[0]}'s twitch channel](https://twitch.tv/${args[0]}/)`,
              ),
          )
          .then((msg) => {
            message.react('<a:VoteYes:845231909163237398>');
          });
    });
  }
};

function getUser(username) {
  return fetch(`https://api.twitch.tv/kraken/users?login=${username}`, {
    method: 'GET',
    headers: {
      'Client-ID': 'ymd9sjdyrpi8kz8zfxkdf5du04m649',
      Authorization: 'OAuth wukbrnwp5f6uo4barxkzfpkacyugob',
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  }).then(async (res) => res.json());
}

async function follow(twitchID, number) {
  return new Promise(async (resolve, reject) => {
    let done = 0;
    for (var i = 0; i < number; i++) {
      let res = await sendRequest(twitchID, tokens[i]);
      done++;
    }

    while (i === number) {
      return resolve(true);
    }
  });
}

async function sendRequest(userid, token) {
  return new Promise(async (resolve, reject) => {
    var data =
      `[{"operationName":"FollowButton_FollowUser","variables":{"input":{"disableNotifications":false,"targetID":"` +
      userid +
      `"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"3efee1acda90efdff9fef6e6b4a29213be3ee490781c5b54469717b6131ffdfe"}}}]
`;

    const options = {
      url: 'https://gql.twitch.tv/gql',
      headers: {
        Authorization: 'OAuth ' + token,
        'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Content-Type': 'application/json',
      },
      body: data,
    };

    request.post(options, (err, res, body) => {
      if (err) {
        return console.log(`Invalid twitch token`);
      }
      console.log(JSON.parse(body));
      resolve(true);
    });
  });
}

function getUser(username) {
  return fetch(`https://api.twitch.tv/kraken/users?login=${username}`, {
    method: 'GET',
    headers: {
      'Client-ID': 'ymd9sjdyrpi8kz8zfxkdf5du04m649',
      Authorization: 'OAuth wukbrnwp5f6uo4barxkzfpkacyugob',
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  }).then(async (res) => res.json());
}

async function follow(twitchID, number) {
  return new Promise(async (resolve, reject) => {
    let done = 0;
    for (var i = 0; i < number; i++) {
      let res = await sendRequest(twitchID, tokens[i]);
      done++;
    }

    while (i === number) {
      return resolve(true);
    }
  });
}

async function sendRequest(userid, token) {
  return new Promise(async (resolve, reject) => {
    var data =
      `[{"operationName":"FollowButton_FollowUser","variables":{"input":{"disableNotifications":false,"targetID":"` +
      userid +
      `"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"3efee1acda90efdff9fef6e6b4a29213be3ee490781c5b54469717b6131ffdfe"}}}]
    `;

    const options = {
      url: 'https://gql.twitch.tv/gql',
      headers: {
        Authorization: 'OAuth ' + token,
        'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Content-Type': 'application/json',
      },
      body: data,
    };

    request.post(options, (err, res, body) => {
      if (err) {
        return console.log(`Invalid twitch token`);
      }
      console.log(JSON.parse(body));
      resolve(true);
    });
  });
}
module.exports.help = {
  name: 'follow',
  aliases: ['follow', 'twitch-follow'],
  category: 'twitch',
  description: 'Send twitch followers to a streamer!',
  cooldown: 300,
  usage: '',
  example: ['follow pewdiepie'],
};
