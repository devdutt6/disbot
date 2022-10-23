exports.slashCommandHandeler = async (client, interaction) => {
  try{
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    await command.execute(interaction);

    return { status: true };
  }
  catch(err){
    console.error(err);
    return { status: false, error: err }};
}