const { createRemainder } = require('../modules/reminder');
const { DateTime } = require('luxon');

exports.relativeModalHandeler = async (interaction) => {
  let description = interaction.fields.getTextInputValue('description');
  let hour_row = interaction.fields.getTextInputValue('hour');
  let minute_row = interaction.fields.getTextInputValue('minute');

  let date = DateTime.now().plus({ hours: hour_row, minute: minute_row });
  let resp = await createRemainder( interaction.user.id, date.ts, description, interaction.guildId, interaction.channelId );

  if(resp.status) {
    interaction.reply({ content: 'Remainder scheduled\nhttps://tenor.com/view/done-so-done-im-done-monkey-throw-gif-18638117', ephemeral: true });
    return { status: true };
  }
  else {
    return { status: false, error: resp.error };
  }
}