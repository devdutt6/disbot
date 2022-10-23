exports.taskHandeler = async (taskList, interaction) => {
  try{
    let description = interaction.options.getString('description');

    let userId = interaction.user.id;
    console.log({ taskList });
    if(taskList[userId]){
      taskList[userId].push(description);
    }
    else{
      taskList[userId] = [];
      taskList[userId].push(description);
    }

    interaction.reply({ content: "task added successfully", ephemeral: true });

    return { status: true, taskList };
  }
  catch(err){
    console.error(err);
    return { status: false, error: err }};
}