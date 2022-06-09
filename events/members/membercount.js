module.exports = (client) => {
  const myGuild = client.guilds.cache.get(client.config.owner.guild);
  const memberCountChannel = myGuild.channels.cache.get(client.channel.memberCounter);

  setInterval(() => {
    const memberCount = myGuild.members.cache.filter((member) => !member.user.bot).size.toLocaleString();

    memberCountChannel.setName(`👥〢${memberCount}`); //change this to whatever you want | ${memberCount} is the member amount
  }, 30000); // every 30 seconds | can be lower/higher but the lower the interval is the more chance you have of getting your bot ratelimited
};
