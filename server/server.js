require('./config/config'); 

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser'); 
const {ObjectID} = require('mongodb'); 

const {mongoose} = require('./db/mongoose'); 
const {Todo} = require('./models/todo'); 
const {User} = require('./models/user'); 

const app = express(); 
const port = process.env.PORT; 

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
  });
});

// Delete todo 
app.delete('/todos/:id', (req, res) => {
  //Get the id 
  var id = req.params.id; 
  //validate the id return 404 
  if(!ObjectID.isValid(id)) {
    return res.status(404).send(); 
  }
  //remove todo by ID   
  Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo) {
        return res.status(404).send(); 
      }
      res.send({todo}); 
    }).catch((e) => {
      res.status(400).send(); 
    });
});

app.patch(`/todos/:id`, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']); 

  if (!ObjectID.isValid(id)) {
    return res.status(404).send(); 
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime(); 
  } else {
    body.completed = false; 
    body.completedAt = null; 
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      res.status(404).send(); 
    }

    res.send({todo}); 
  }).catch((e) => res.status(400).send())

});

app.listen(port, () => {
  console.log(`Started up at port: ${port}`);
}); 

module.exports = {app}; 