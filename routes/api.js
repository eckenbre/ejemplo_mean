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


//funcion simple para mockear un servicio
//devuelve el contenido del archivo ./files/personas.json
router.get('/api/personas', function(req, res) {
    console.log(" se invoco /api/personas")
    res.sendFile(__dirname + '/files/personas.json');

})

router.post('/login', function(req, res) {
console.log("/login invocado -> request :"+JSON.stringify(req.body))
var email = req.body.email

console.log(email)

if(email === "eckenbre@gmail.com" )
    {
        var response = { "nombre" : "Alejandro", "apellido": "von Eckenbrecher", "email":"eckenbre@gmail.com", "twitter": "@eckenbre" };
        res.send(response);


    }
    else
    {
        res.status(401).json({
        message: '{ "Status" : "Auth Error" }'
    });
    }
    
   
           
  

})



module.exports = router