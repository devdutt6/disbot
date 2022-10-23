const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('break')
    .setDescription('Lunch break message will be sent by bot')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('Kind of break you are taking')
        .addChoices(
          {name: 'Lunch', value: 'lunch'},
          {name: 'Short', value: 'short'}
        )
    ),
  async execute(interaction) {
    console.log({interaction});
    let type = interaction.options.getString('type');

    interaction.reply(`Devdutt took a ${type} break`);
  }
}