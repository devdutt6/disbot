const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { getTasks } = require("../modules/task");
const { getDate } = require("../utils/createDate");

module.exports = {
  data: new SlashCommandBuilder()
  .setName('edittask')
  .setDescription('Edit the tasks you added today'),
  async execute( interaction ) {
    let resp = await getTasks( getDate(), interaction.user.id );

    if(resp.status) {
      let editmodal = new ModalBuilder()
        .setCustomId('edittask')
        .setTitle('Edit tasks');
      let rows = [];
      for( let i=0;i<resp.tasks.length;i++ ){
        let input = new TextInputBuilder()
          .setCustomId(`task${i}`)
          .setLabel(`Task ${i}`)
          .setRequired(true)
          .setMinLength(10)
          .setMaxLength(2000)
          .setStyle(TextInputStyle.Short)
          .setValue(resp.tasks[i]);
        let row = new ActionRowBuilder().addComponents(input);
        rows.push(row);
      }
      editmodal.addComponents(rows);

      return interaction.showModal(editmodal);
    }
    else{
      console.error(err);
      return interaction.reply({  content: 'There was an error while executing this command!', ephemeral: true  });
    }
  }
}