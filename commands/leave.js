const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('shows the leaves in the month')
    .addBooleanOption(option =>
      option
        .setName('yearly')
        .setDescription('if true then returns with the link to yearly leave document')
    ),
  async execute(interaction) {
    try{
      let isYearly = interaction.options.getBoolean('yearly');
      if( isYearly ) {
        let leavebtn = new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel(`🏞️ Leaves`)
          // .setLabel(`:camping: Leaves`)
          .setURL('https://pedaslup.notion.site/2022-Holidays-Pedals-Up-0cd37f43eecb4ba99b5417568cb74848');

        let policiesbtn = new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel('📜 Policies')
          // .setLabel(':scroll: Policies')
          .setURL('https://www.notion.so/Leave-Policy-Pedals-Up-2a046c6dcd104b64937aabe6712e2cdd');

        let row = new ActionRowBuilder()
          .addComponents( leavebtn, policiesbtn );
        return interaction.reply({ components: [row], ephemeral: true });
      }
      else{
        let embd = new EmbedBuilder()
          .setColor([229, 176, 153])
          .setTitle('Leaves')
          .setURL('https://pedaslup.notion.site/2022-Holidays-Pedals-Up-0cd37f43eecb4ba99b5417568cb74848')
          .setDescription('Shows the leaves in the current month')
          .setAuthor({ name: 'Pedalsup | bot', url: 'https://www.pedalsup.com/' })
          .setFields(
            { name: "Mon", value: "day", inline: true },
            { name: "\u200B", value: "\u200B" },
          )
          .setTimestamp()
          .setFooter({text: "leaves in the month"})
        return interaction.reply( { content: "creative try", ephemeral: true, embeds: [embd] } );
      }
    }
    catch(err){
      console.error(err);
      return { status: false, error: err };
    }
  }
}