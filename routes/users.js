const express = require('express');
const router = express.Router();
const controllerClass = require('../utils/DBController.js');
const dbController = new controllerClass("localhost",27017, "", "", "cadastro_simples");

/* GET users listing. */
router.get('/', function(req, res) {
  res.redirect("index.ejs");
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
        console.log(r);
        res.redirect("");
    },"users",{nome: nome_usuario, email: email_usuario, idade: idade_usuario});
  });
});

router.get(/update\/([\w]+)/, function (req, res) {
    let userid = req.params[0];
    userid = "ObjectId(\""+userid+"\")";
    console.log(userid);
    let filter = {"_id": userid};
    dbController.connect(()=>{
        dbController.selectOne(user=>{
            res.render("update", {title:"Editar Usuário", user:user});
        }, "users", filter);
    });
});

router.post(/update\/([\w]+)/, function(req,res){
    let id = req.params[0];
    let nome_usuario = req.body.nome;
    let email_usuario = req.body.email;
    let idade_usuario = req.body.idade;
    dbController.connect(()=>{
        dbController.update(r=>{

        },"users",{'_id':id},{nome: nome_usuario, email:email_usuario, idade:idade_usuario})
    })
});

router.get(/delete\/([\w]+)/, function(req,res){
    let id = req.params[0];
    dbController.connect(()=>{
       dbController.delete(r=>{
            if(r.deletedCount>0)
            {

            }
            res.redirect("/");
       },"users",{"_id":`ObjectId('${id}')`});
    });
});

module.exports = router;
