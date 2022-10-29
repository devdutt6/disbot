const mongoose = require('mongoose');

let RemainderSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  date: {
    type: Number
  },
  description: {
    type: String
  },
  guildId: {
    type: String
  },
  channelId: {
    type: String
  }
}, { timestamps: true, collection: 'remainders', versionKey: false });

const Remainder = new mongoose.model( 'Remainder', RemainderSchema );

let createRemainder = async ( userId, date, description, guildId, channelId ) => {
  try{
    await Remainder.create({userId, date, description, guildId, channelId});

    return { status: true };
  }
  catch(err){
    console.error(err);
    return {status: false, error: err};
  }
}

module.exports = { Remainder, createRemainder };