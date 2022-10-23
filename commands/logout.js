const { SlashCommandBuilder, bold, userMention } = require('discord.js');
const { DateTime } = require('luxon');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('logout')
    .setDescription('Logout message will be sent by bot')
    .addStringOption(option =>
      option
        .setName('projects')
        .setDescription('List of projects that you worked on today')
    ),
    async execute(interaction) {
      let boldlogout = bold("Logout Time:  ");
      let boldname = bold("Name:  ");
      let boldworked = bold("Worked On:  ");

      const time = DateTime.now();

      interaction.reply({ content:
        `${boldlogout}${time.hour}:${time.minute}\n${boldname}${userMention(interaction.user.id)}\n${boldworked}${interaction.options.getString('projects')}`
      });
    }
}