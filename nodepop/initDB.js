'use strict';

// conexion a la base de datos
const dbConection = require('./lib/connectMongoose');
const productoData = require('./productosiniciales.json');

// cargar modelos
const Producto = require('./models/Producto');

async function main() {

// inicializar productos
    await initProductos();

    // desconectar la BD
    dbConection.close();
}

main().catch(err => console.log('Hubo un error', err));

async function initProductos () {
    // borrar todos los datos de la BD
    const deleted = await Producto.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} productos`);

    //crear productos iniciales
    const productos = await Producto.insertMany(productoData);
    console.log(`Creados ${productos.length} productos`);
}