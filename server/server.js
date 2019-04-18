var express = require('express');
var bodyParser = require('body-parser'); 
const {ObjectID} = require('mongodb'); 

var {mongoose} = require('./db/mongoose'); 
var {Todo} = require('./models/todo'); 
var {User} = require('./models/user'); 

const app = express(); 
const port = process.env.PORT || 3000; 

app.use(bodyParser.json()); 

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  }); 

  todo.save().then((doc) => {
    res.send(doc); 
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/123456
app.get('/todos/:id', (req, res) => {
  var id = req.params.id; 

  //Valid id using isValid
    // 404 if todo not found send back empty send
  if(!ObjectID.isValid(id)) {
    return res.status(404).send(); 
  }

  // findByID
  Todo.findById(id).then((todo) => {
    //success
    // if no todo - send back 404 with empy body 
    if(!todo) {
      res.status(404); 
    }
    
    // if todo - send it back
    res.send(todo); 
  }).catch((e) => {
    res.status(404).send(); 
  })
    
      
    //error 
      //400 - send empty body back
})

app.listen(port, () => {
  console.log(`Started up at port: ${port}`);
}); 

module.exports = {app}; 