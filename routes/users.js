const express = require('express');
const router = express.Router();
const controllerClass = require('../utils/DBController.js');
const dbController = new controllerClass("localhost",27017, "", "", "cadastro_simples");

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/create', function (req, res) {
  res.render("users",{title: "Incluir Usuário"});
});

router.post('/create', function(req,res){
  let nome_usuario = req.body.nome;
  let email_usuario = req.body.email;
  let idade_usuario = req.body.idade;
  dbController.connect(()=>{
    dbController.insert(r=>{
      if(r.nInserted > 0)
      {
        res.redirect("index");
      }
    },"users",{nome: nome_usuario, email: email_usuario, idade: idade_usuario});
  });
});

module.exports = router;
