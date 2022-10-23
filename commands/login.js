const { SlashCommandBuilder, userMention, bold } = require("discord.js");
const { DateTime } = require('luxon');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('login')
    .setDescription('Login message will be sent by bot')
    .addStringOption(option =>
      option
        .setName('projects')
        .setDescription('List of projects that you will work on for today')
    ),
    async execute(interaction) {
      const time = DateTime.now();
      let boldlogin = bold("Login time:  ");
      let namebold = bold("Name:  ");
      let workingbold = bold("Working On:  ");

      interaction.reply({ content:
        `${boldlogin}${time.hour}:${time.minute}\n${namebold}${userMention(interaction.user.id)}\n${workingbold}${interaction.options.getString('projects')}`
      });
    }
  }
