const {ObjectID} = require('mongodb'); 

const {mongoose} = require('./../server/db/mongoose'); 
const {Todo} = require('./../server/models/todo'); 
const {User} = require('../server/models/user'); 

var id = "5cb64250eb60d9b8162cb98311"; 

// if (!ObjectID.isValid(id)) {
//   console.log(`Id is not valid`);
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log(`Todos ${todos}`);
// }); 

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log(`Todo ${todo}`);
// }); 


// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log(`ID not found`);
//   }
//   console.log(`Todo by id ${todo}`);
// }).catch((e) => {
//   console.log(e);
// })


//User.findbyID handle queries error, not found, is found 
const userId = '5caf6f8b5142e6d04c2f4fce'; 

User.findById({
  _id: userId
}).then((user) => {
  if(!user) {
    return console.log(`Unable to find user`);
  }
  console.log(`Your user email is: ${user}`);
}).catch((e) => {
  console.log(e);
})