const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('back')
    .setDescription('You are back message will be sent by bot'),
  async execute(interaction) {
    let user = userMention(interaction.user.id);

    interaction.reply({ content: `${user}'s back from a break` });
  }
}