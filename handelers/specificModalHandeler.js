const { createRemainder } = require('../modules/reminder');
const { DateTime } = require('luxon');

exports.specificModalHandeler = async (interaction) => {
  let specified_date = interaction.fields.getTextInputValue('date');
  let specified_time = interaction.fields.getTextInputValue('time');
  let description = interaction.fields.getTextInputValue('description');

  let current_time = DateTime.now();

  if( specified_date < current_time.day || specified_date > current_time.daysInMonth ){
    interaction.reply({ content: `Day of the month must be greater than day today and smaller than number of days in month!\nhttps://tenor.com/view/minions-bleh-tongue-out-despicable-me-annoyed-gif-10096244`, ephemeral: true});
    return { status: true };
  }

  let parsed_time = specified_time.split(':');
  if( parsed_time.length <= 1 ){
    interaction.reply({ content: `please enter time in proper time format!\nhttps://tenor.com/view/minions-bleh-tongue-out-despicable-me-annoyed-gif-10096244`, ephemeral: true});
    return { status: true };
  }

  if( parsed_time[0]<0 || parsed_time[0]>24 ){
    interaction.reply({ content: `hour value can only reside between 0 to 23!\nhttps://tenor.com/view/minions-bleh-tongue-out-despicable-me-annoyed-gif-10096244`, ephemeral: true});
    return { status: true };
  }

  if( parsed_time[1]<0 || parsed_time[1]>59 ){
    interaction.reply({ content: `minute value can only reside between 0 to 59!\nhttps://tenor.com/view/minions-bleh-tongue-out-despicable-me-annoyed-gif-10096244`, ephemeral: true});
    return { status: true };
  }

  let date_string = `${specified_date}-${current_time.month}-${current_time.year} ${parsed_time[0]}:${parsed_time[1]}`;
  let specificdatetime = DateTime.fromFormat(date_string, 'dd-MM-yyyy HH:mm');


  let resp = await createRemainder(interaction.user.id, specificdatetime.ts, description, interaction.guildId, interaction.channelId);

  if(resp.status) {
    interaction.reply({ content: 'Remainder scheduled\nhttps://tenor.com/view/done-so-done-im-done-monkey-throw-gif-18638117', ephemeral: true });
    return { status: true };
  }
  else {
    return { status: false, error: resp.error };
  }
}