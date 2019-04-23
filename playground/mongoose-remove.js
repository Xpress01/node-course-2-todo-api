const {ObjectID} = require('mongodb'); 

const {mongoose} = require('../server/db/mongoose'); 
const {Todo} = require('../server/models/todo'); 
const {User} = require('../server/models/user'); 

// Todo.remove({}).then((result) => {
//   console.log(result);
// })

// Todo.findOneAndRemove
// Todo.findByIDAndRemove

Todo.findByIdAndRemove('5cbe406e62e1b8760f42898a').then((todo) => {
  console.log(todo);
});