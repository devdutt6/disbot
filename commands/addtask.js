const { SlashCommandBuilder } = require('discord.js');
const { addTask } = require('../modules/task');
const { getDate } = require('../utils/createDate');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addtask')
    .setDescription('Add a task you finished today')
    .addStringOption(option =>
      option
        .setName('description')
        .setDescription('Add the task description you performed')
        .setRequired(true)
        .setMinLength(10)
        .setMaxLength(2000)
    ),
  async execute( interaction ) {
    let description = interaction.options.getString('description');

    let resp = await addTask(getDate(), interaction.user.id, description);
    if( resp.status ){
      interaction.reply({ content: "task added successfully", ephemeral: true });

      return;
    }
    else{
      console.error(err);
      return interaction.reply({  content: 'There was an error while executing this command!', ephemeral: true  });
    }
  }
}