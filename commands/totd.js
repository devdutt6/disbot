const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('totd')
    .setDescription('Send a thought of the day to members'),
  async execute(interaction) {
    let modal = new ModalBuilder()
      .setCustomId('totd')
      .setTitle("Thought Of The Day");

    let input = new TextInputBuilder()
      .setCustomId('thought')
      .setLabel('Share a Thought')
      .setPlaceholder('paste here...')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);
    let author = new TextInputBuilder()
      .setCustomId('author')
      .setLabel('Quoted by')
      .setPlaceholder('author\'s name')
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    let row = new ActionRowBuilder().addComponents(input)
    let row2 = new ActionRowBuilder().addComponents(author)
    modal.addComponents(row, row2);

    await interaction.showModal(modal);
  }
}