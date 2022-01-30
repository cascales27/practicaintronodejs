'use strict';

const mongoose = require('mongoose');

//definir un esquema de producto
const productoSchema = mongoose.Schema({
    name: { type: String, index: true},
    venta: Boolean,
    precio: { type: Number, index: true},
    tags: [String],
    imagen: String

});

productoSchema.statics.lista = function(filtros, skip, limit, select, sort) {
    const query = Producto.find(filtros);
    query.skip(skip);
    query.limit(limit);
    query.select(select);
    query.sort(sort);
    return query.exec();
}

productoSchema.methods.nproducto = function() {
    console.log('Soy un nuevo', this.name)
}

const Producto = mongoose.model('Producto', productoSchema);



module.exports = Producto;