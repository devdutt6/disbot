const { blockQuote, bold } = require('discord.js');
const { editTasks } = require("../modules/task");
const { getDate } = require("../utils/createDate");

exports.modalSubmissionHandeler = async( interaction ) => {
  try{
    if( interaction.customId === 'totd' ){
      let thoughtString = interaction.fields.getTextInputValue('thought');
      let authorString = interaction.fields.getTextInputValue('author');

      let authString = bold(authorString);
      let quotedString = blockQuote(`${thoughtString}\n- ${authString}`);

      interaction.reply({ content: quotedString });

      return { status: true };
    }
    else if (interaction.customId === "edittask") {
      let tasks = [];
      for(let i=0;i<interaction.fields.components.length;i++){
        let task = interaction.fields.getTextInputValue(`task${i}`);
        tasks.push(task);
      }

      let resp = await editTasks(getDate(), interaction.user.id, tasks);

      if( resp.status ){
        interaction.reply({ content: "Edited the tasks", ephemeral: true });
        return { status: true };
      }
      else{
        return { status: false, error: resp.error };
      }
    }
    else{
      return;
    }
  }
  catch(err){
    return { status: false, error: err };
  }
}