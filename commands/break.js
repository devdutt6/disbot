const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('break')
    .setDescription('Lunch break message will be sent by bot')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('Kind of break you are taking')
        .setRequired(true)
        .addChoices(
          {name: 'lunch', value: 'lunch'},
          {name: 'short', value: 'short'}
        )
    ),
  async execute(interaction) {
    let type = interaction.options.getString('type');
    let user = userMention(interaction.user.id);

    interaction.reply(`${user} took a ${type} break`);
  }
}