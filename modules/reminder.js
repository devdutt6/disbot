const mongoose = require('mongoose');

let RemainderSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  date: {
    type: String
  },
  description: {
    type: String
  }
}, { timestamps: true, collection: 'Remainders', versionKey: false });

let Remainder = new mongoose.model( 'Remainder', RemainderSchema );

let createRemainder = async ( userId, date, description ) => {
  try{
    await Remainder.create({userId, date, description});

    return { status: true };
  }
  catch(err){
    console.error(err);
    return {status: false, error: err};
  }
}

module.exports = { Remainder, createRemainder };