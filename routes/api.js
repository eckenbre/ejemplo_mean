var express = require('express')
, router = express.Router()

var mongoose     = require('mongoose');
// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/angular-todo-app');

// Definición de modelos
var Todo = mongoose.model('Todo', {  
    text: String
});



router.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
        if(err) {
            res.send(err);
        }
        res.json(todos);
    });
});

router.post('/api/todos', function(req, res) {
Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo){
        if(err) {
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if(err){
                res.send(err);
            }
            res.json(todos);
        });
    });
});

// DELETE un TODO específico y devuelve todos tras borrarlo.
router.delete('/api/todos/:todo', function(req, res) {  
    Todo.remove({
        _id: req.params.todo
    }, function(err, todo) {
        if(err){
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if(err){
                res.send(err);
            }
            res.json(todos);
        });

    })
});



module.exports = router