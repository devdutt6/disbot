const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('back')
    .setDescription('You are back message will be sent by bot'),
  async execute(interaction) {
    console.log({interaction});

    interaction.reply(`Devdutt's back from a break`);
  }
}