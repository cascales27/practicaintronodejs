'use strict';

const   loadEnv =  require('./Lib/loadEnv.js'); 
// conexion a la base de datos
const dbConection = require('./lib/connectMongoose');
const productoData = require('./productosiniciales.json');

// cargar modelos
const Producto = require('./models/Producto');

const Usuario = require('./models/Usuario');

async function main() {

// inicializar productos
    await initProductos();

    await initUsuarios();

    // desconectar la BD
    dbConection.close();
}

main().catch(err => console.log('Hubo un error', err));


async function initUsuarios () {
    const deleted = await Usuario.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} usuarios`);

    const usuarios = await Usuario.insertMany([
        {
            email: 'admin@example.com',
            password: await Usuario.hashPassword('1234'),
            rol: 'admin'
        },
        {
            email: 'user1@example.com',
            password:await Usuario.hashPassword('1234'), 
            rol: 'user'
        },
    ]);
    console.log(`Creados ${usuarios.lenght} usuarios.`);
}
async function initProductos () {
    // borrar todos los datos de la BD
    const deleted = await Producto.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} productos`);

    //crear productos iniciales
    const productos = await Producto.insertMany(productoData);
    console.log(`Creados ${productos.length} productos`);
}