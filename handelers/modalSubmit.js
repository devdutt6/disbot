const { totdHandeler } = require('./totdHandeler');
const { editTaskHandeler } = require('./editTaskHandeler');
const { specificModalHandeler } = require('./specificModalHandeler');
const { relativeModalHandeler } = require('./relativeModalHandeler');

exports.modalSubmissionHandeler = async( interaction ) => {
  try{
    if( interaction.customId === 'totd' ){
      return await totdHandeler(interaction);
    }
    else if (interaction.customId === "edittask") {
      return await editTaskHandeler(interaction);
    }
    else if(interaction.customId === 'remainder_type_specific') {
      return await specificModalHandeler(interaction);
    }
    else if(interaction.customId === 'remainder_type_relative') {
      return await relativeModalHandeler(interaction);
    }
    else{
      return;
    }
  }
  catch(err){
    return { status: false, error: err };
  }
}