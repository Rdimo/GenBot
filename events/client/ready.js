module.exports = async (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activity: {
      name: `${client.config.PREFIX}help・${client.config.links.website}`,
      type: 'WATCHING', //PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS
    },
    status: 'online', //online, idle, dnd
  });
};
