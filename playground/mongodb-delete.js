// const MongoClient = require('mongodb').MongoClient; 
const {MongoClient, ObjectID} = require('mongodb'); 

var obj = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //deleteMany 
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  //deleteOne 
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })

  //deleteMany -- Challenge
  // db.collection('Users').deleteMany({name: 'Vijay'}).then((result) => {
  //   console.log(result);
  // })

  //deleteItem by object ID 
  db.collection('Users').findOneAndDelete({_id: ObjectID('5ca6558d1adea92a400423e0')}).then((result) => {
    console.log(result);
  })
  // db.close(); 
})