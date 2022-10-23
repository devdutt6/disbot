const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('task')
    .setDescription('Add a task you finished today')
    .addStringOption(option =>
      option
        .setName('description')
        .setDescription('Add the task description you performed')
        .setRequired(true)
        .setMinLength(10)
        .setMaxLength(2000)
    )
}