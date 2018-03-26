const express = require('express');
const router = express.Router();
const controllerClass = require('../utils/DBController.js');
const dbController = new controllerClass("localhost",27017, "", "", "cadastro_simples");

/* GET home page. */
router.get('/', function(req, res) {
  dbController.connect(()=>{
      dbController.select(users=> {
          res.render('index', { title: 'Cadastro Simples', users: users});
      },"users",{});
      });

});

module.exports = router;
