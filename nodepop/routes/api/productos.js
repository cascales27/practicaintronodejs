'use strict';

const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const Producto = require('../../models/Producto.js');

router.get('/', async (req, res, next) => {
    try {
 
     const name = req.query.name;
     const precio = req.query.precio;
     const tags = req.query.tags;
     const venta = req.query.venta;
     const imagen = req.query.imagen;
     const skip = req.query.skip;
     const limit = req.query.limit;
     const select = req.query.select;
     const sort = req.query.sort;
     
     
 
     const filtros = {};
 
     if (name) {
         filtros.name = name;
     }
 
     if (precio) {
         filtros.precio = precio;
     }
 
     if (tags) {
         filtros.tags = tags;
     }
 
     if (venta) {
         filtros.venta = venta;
     }

     if (imagen) {
         filtros.imagen = imagen;
     }
 
     const productos = await Producto.lista(filtros, skip, limit, select, sort);
 
     res.render( 'index', { resultSet: productos });
 
     } catch (err) {
         next(err);
     }
 });
 


// localhost:3000/api/productos
router.get('/api/productos', async (req, res, next) => {
   try {

    const name = req.query.name;
    const precio = req.query.precio;
    const tags = req.query.tags;
    const imagen = req.query.imagen;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select;
    const sort = req.query.sort;
    const venta = req.query.venta;

    const filtros = {};

    if (name) {
        filtros.name = name;
    }

    if (precio) {
        filtros.precio = precio;
    }

    if (tags) {
        filtros.tags = tags;
    }

    if (venta) {
        filtros.venta = venta;
    }

    if (imagen) {
        filtros.imagen = imagen;
    }

    const productos = await Producto.lista(filtros, skip, limit, select, sort);

    res.json( { results: productos })

    } catch (err) {
        next(err);
    }
});

// GET /api/productos/:id
// devuelve un producto en concreto

router.get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;

       const producto = await Producto.findOne({ _id: id });

       if (!producto) {
           next(createError(404));
           return;
       }
       res.json({ result: producto });
    } catch (err) {
        next(err);
    }
});

//POST /api/productos

// Crea un nuevo producto

router.post('/', async (req, res, next) => {
    try {
        const productoData = req.body;

        const producto = new Producto(productoData);

        const productoGuardado = await producto.save();

        res.status(201).json({ result : productoGuardado});
    } catch (error) {
        next(err);
        
    }
})

//DELETE api/productos/:id
// Elimina un producto

router.delete('/:id', async (req, res, next) => {
    try {
       const id = req.params.id;
        
        await Producto.deleteOne({ _id: id });

        res.json();
    } catch (error) {
        next(err);
    }
});

// PUT /api/productos:id
// Actualizar un producto

router.put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;

      const productoData = req.body;

      let productoActualizado

      try{

       productoActualizado = await Producto.findByIdAndUpdate(id, productoData, {
          new: true
      });
    }catch (err) {
          next(createError(422, 'invalid id'));
          return;
      }

      if (!productoActualizado) {
          next(createError(404));
          return;
      }

      res.json({ result: productoActualizado });

    } catch (error) {
        next(err);
        
    }
});

module.exports = router;