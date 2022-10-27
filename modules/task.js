const mongoose = require('mongoose');

let TaskSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  date: {
    type: String
  },
  tasks: [ _id = false ]
}, { timestamps: true, collection: 'tasks', versionKey: false });

let Task = new mongoose.model( 'Task', TaskSchema );

// helper funtions
let addTask = async ( date, userId, taskDescription ) => {
  try{
    let addedtask = await Task.findOne({ userId, date });
    if( !addedtask ){
      await Task.create({ userId, date, tasks: [taskDescription] });
    }
    else{
      let currtasks = addedtask.tasks;
      currtasks.push(taskDescription);
      addedtask.tasks = currtasks;
      await addedtask.save();
    }
    return { status: true };
  }
  catch(err){
    console.error(err);
    return { status: false, error: err };
  }
};

let editTasks = async ( date, userId, tasks ) => {
  try{
    let addedtask = await Task.findOne({ userId, date });
    if( !addedtask ){
      return { status: true };
    }
    else{
      addedtask.tasks = tasks;
      await addedtask.save();
    }
    return { status: true };
  }
  catch(err){
    console.error(err);
    return { status: false, error: err };
  }
};

let getTasks = async ( date, userId ) => {
  try{
    let tasks = await Task.findOne({ userId, date }).lean();

    return { status: true, tasks: tasks.tasks };
  }
  catch(err){
    console.error(err);
    return { status: false, error: err };
  }
}

module.exports = { Task, addTask, editTasks, getTasks };