const { SlashCommandBuilder, EmbedBuilder, userMention } = require('discord.js');
const { getTasks } = require('../modules/task');
const { getDate } = require('../utils/createDate');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('list all today\'s added tasks.'),
    // .addStringOption(option =>
    //   option
    //     .setName('description')
    //     .setDescription('Add the task description you performed')
    //     .setRequired(true)
    //     .setMinLength(10)
    //     .setMaxLength(2000)
    // ),
  async execute( interaction ) {
    // let description = interaction.options.getString('description');

    let resp = await getTasks(getDate(), interaction.user.id );
    if( resp.status ){
      let tasks = [];
      for( let i=0;i<resp.tasks.length;i++ ){
        let obj = { name: '\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581', value: resp.tasks[i] };
        tasks.push(obj);
      }

      if( tasks.length === 0 ){
        tasks.push({ name: '\u200B', value: "No task added for today yet!" });
      }

      let authr = userMention(interaction.user.id);
      let embd = new EmbedBuilder()
        .setTitle(`Your tasks`)
        .setColor([30, 50, 230])
        .setFooter({text: `tasks added till now`})
        .setTimestamp(Date.now())
        .setFields(tasks);

      interaction.reply({ content: `${authr}'s todays tasks.`, embeds: [embd], ephemeral: true });

      return;
    }
    else{
      console.error(err);
      return interaction.reply({  content: 'There was an error while executing this command!', ephemeral: true  });
    }
  }
}