const { Router } = require('express');
var express = require('express');
var router = express.Router();
const { query, validationResult } = require('express-validator');



/* GET home page. */
//router.get('/', function(req, res, next) {

  //res.locals.ejemplo = 'esto es un ejemplo'
//};
  
router.get('/parametroenruta/:dato([0-9])+', (req, res, next) => {
  const dato = req.params.dato;
  console.log(req.params);
  res.send('ok');
})

router.get('/talla/:talla(S|M|L|XL)?/color/:color?', (req, res, next) => {
  const talla = req.params.talla;
  const color = req.params.color;

  console.log(req.params);

  res.send(`ok talla ${talla} y del color ${color}`);
})

router.post('/enelbody', (req, res, next) => {
  const nombre = req.body.nombre;

  console.log(req.body);

  res.send(`Recibido el nombre ${nombre}`);
});

module.exports = router;
