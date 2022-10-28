const { editTasks } = require("../modules/task");
const { getDate } = require("../utils/createDate");

exports.editTaskHandeler = async (interaction) => {
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