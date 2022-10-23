const { SlashCommandBuilder, bold } = require('discord.js');
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
    console.log({interaction});
      const time = DateTime.now();

      let boldlogout = bold("Logout Time: ");
      let boldname = bold("Name: ");
      let boldworked = bold("Worked On: ");

      interaction.reply({ content:
        `${boldlogout}${time.hour}:${time.minute} \n
        ${boldname} Devdutt \n
        ${boldworked}${interaction.options.getString('projects')}`
      });
    }
}