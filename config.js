module.exports = {
  PREFIX: '!', //prefix for the bot here
  owner: {
    id: '956976561234513990', //put your owner Id in here so you can bypass cooldown for the generator commands and use the nitrogen command
    username: 'Rdimo#6969', // ur username here but this is just for display, doesn't actually have a function
    guild: '956980103525564497', //put your guild/server id here
  },

  channels: {
    generator: '', //ID of the generator channel
    nitro: '', //ID of the nitro generator channel
    twitch: '', //ID of the Twitch follows channel
    memberCounter: '', //ID of the member count channel
  },

  links: {
    HandlerInvite: 'https://discord.com/api/oauth2/authorize?client_id=881558367687032832&permissions=1551363318&scope=bot',
    website: 'https://Cheataway.com',
    GenIcon: 'https://img.icons8.com/color/48/000000/in-progress--v3.gif', //G.I.F icon for the generator embed here
  },

  colors: {
    //keep these colors like this too make it look clean but feel free to change if  you feel like it
    Default: '#18191c',
    Red: '#ff0000',
    Yellow: '#daff00',
    Orange: '#ff8400',
    Green: '#71fd71',
    LightGreen: '#5ac18e',
  },

  emojis: {
    success: '<:check:853347980824281128>', //Emoji when succeding
    error: '<a:VoteNo:853347975257260033>', //Emoji when wrong
    loading: '<a:Loading:853348009235578940>', //Emoji when loading
    arrow: '<:Arrow:853348016979181598>', //Arrow Emoji
    pingpong: '<:PingPong:853622606199652363>', //Pingpong racket Emoji

    Generator: '<a:Management:853347999086149692>', //Generator emoji for !help embed
    Twitch: '<:Twitch:853376736695156757>', //Twitch emoji for !help embed
    Other: '<:Other:853347989699166208>', //Other emoji for !help embed
    Nitro: '<a:Booster:853683721734193182>', //Nitro emoji for !help embed
  },

  Token: {
    Discord: 'Your_discord_bot_token',
  },

  blacklistedUsers: {
    ID: ['ID', 'ID2', 'ID3'], //Blacklist any users from the bot by putting their Id's in here
  }, //Just copy the pattern if you want to blacklist more people
};
