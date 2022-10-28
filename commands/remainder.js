const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { DateTime } = require('luxon');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remainder')
    .setDescription('A message will be sent to remind you the thing you specified')
    .addStringOption(option =>
      option
        .setName('remainder_type')
        .setDescription('how will you like to enter your time')
        .setRequired(true)
        .setChoices(
          {name: 'specific', value: 'specific'},
          {name: 'relative', value: 'relative'}
        )
    ),
  async execute(interaction) {
    let type = interaction.options.getString('remainder_type');
    let today_day = DateTime.now().day;
    let today_hour = DateTime.now().hour;
    let today_minute = DateTime.now().minute;

    if( type === 'specific' ){
      let modal = new ModalBuilder()
        .setCustomId('remainder_type_specific')
        .setTitle('Fill Date and Time');
      let date_row = new ActionRowBuilder()
        .addComponents(
          new TextInputBuilder()
            .setCustomId('date')
            .setLabel('day of the month')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(2)
            .setMinLength(1)
            .setPlaceholder("1..31")
            .setValue(`${today_day}`)
        );

      let time_row = new ActionRowBuilder()
        .addComponents(
          new TextInputBuilder()
            .setCustomId('time')
            .setLabel('time')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(5)
            .setMinLength(3)
            .setPlaceholder("follow 24 hour format 14:31")
            .setValue(`${today_hour}:${today_minute}`)
        );

        let description_row = new ActionRowBuilder()
        .addComponents(
          new TextInputBuilder()
            .setCustomId('description')
            .setLabel('description')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(1000)
            .setMinLength(3)
            .setPlaceholder("what to remind..")
        );

      modal.addComponents( date_row, time_row, description_row );

      return interaction.showModal(modal);
    }
    else{ // relative
      let modal = new ModalBuilder()
        .setCustomId('remainder_type_relative')
        .setTitle('Enter details');
      let hour_row = new ActionRowBuilder()
        .addComponents(
          new TextInputBuilder()
            .setCustomId('hour')
            .setLabel('after _? hours')
            .setStyle(TextInputStyle.Short)
            .setMaxLength(3)
            .setMinLength(1)
            .setPlaceholder("After how many hours 0..99")
        );

      let minute_row = new ActionRowBuilder()
        .addComponents(
          new TextInputBuilder()
            .setCustomId('minute')
            .setLabel('after _? minutes')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(4)
            .setMinLength(1)
            .setPlaceholder("after how many minutes")
            .setValue(`${today_minute}`)
        );

        let description_row = new ActionRowBuilder()
        .addComponents(
          new TextInputBuilder()
            .setCustomId('description')
            .setLabel('description')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(1000)
            .setMinLength(3)
            .setPlaceholder("what to remind..")
        );

      modal.addComponents( hour_row, minute_row, description_row );

      return interaction.showModal(modal);
    }
  }
}