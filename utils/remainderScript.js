const { Remainder } = require('../modules/reminder');
const { DateTime } = require('luxon');
const { userMention, bold } = require('discord.js');

exports.remainderScript = async (client) => {
  try{
    let current_time = DateTime.now();

    let remainders = await Remainder.find({ date: {
      $lt: current_time.ts
    } }).lean();

    for( let i=0;i<remainders.length;i++){
      let channel = await client.channels.fetch(remainders[i].channelId);
      await channel.send(`Remainder for ${userMention(remainders[i].userId)}\n${bold('description: ')}${remainders[i].description}`);
    }

    await Remainder.deleteMany({ date: {
      $lt: current_time.ts
    } });
    return;
  }
  catch(err){
    console.error(err);
    return;
  }
}