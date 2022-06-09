const fs = require('fs');
module.exports.run = async (client, message, args) => {
  message.channel.send("this command is still in development!")
  // var i;
  // var count = 0;
  // require('fs')
  //   .createReadStream(process.argv[2])
  //   .on('data', function (chunk) {
  //     for (i = 0; i < chunk.length; ++i) if (chunk[i] == 10) count++;
  //   })
  //   .on('end', function () {
  //     console.log(count);
  //   });
};
module.exports.help = {
  name: 'stock',
  aliases: ['stock', 'stocks', 'accounts'],
  category: 'generator',
  description: 'Check the stock for the generator',
  cooldown: 10,
  usage: '',
  example: [],
};
