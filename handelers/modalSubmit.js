const { blockQuote, bold } = require('discord.js');

exports.modalSubmissionHandeler = async( interaction ) => {
  try{
    if( interaction.customId !== 'totd' ) return;

    let thoughtString = interaction.fields.getTextInputValue('thought');
    let authorString = interaction.fields.getTextInputValue('author');

    let authString = bold(authorString);
    let quotedString = blockQuote(`${thoughtString}\n- ${authString}`);

    interaction.reply({ content: quotedString });

    return { status: true };
  }
  catch(err){
    return { status: false, error: err };
  }
}