## EXPRESS

Se genera la app con express

npx express-generator --ejs nodepop(o como quieres que se llame la app)

Para acceder y usar la base de datos (en este caso MongoDB) ejecutar:

npm install mongoose

# Nodepop

Para arrancar la app usar:

```sh
npm install
```
En producción:

Cpoia .env.example en .env y establecer valores de configuracion

```sh
cp .env.example .env
```

```sh
npm start
```

En desarrollo:

```sh
npm run dev
```

## Métodos del API

El api se accede en: /api

Lista de productos:

- /api/productos

Filtros:

Para filtrar por tags:

http://localhost:3000/api/productos/?sort=work

Para filtrar por tipo de anuncio(venta o busqueda):

http://localhost:3000/api/productos/?sort=venta

Para filtrar siempre utilizamos el metodo sort:

http://localhost:3000/api/productos/?sort=aquiloquequierasbuscar

Crear un producto nuevo:

-POST /api/productos

Eliminar un producto:

-DELETE /api/productos/:id


## Inicializar la BD

Para inicializar la BD al estado inicial, se puede usar el comando:
 
```sh
npm run initdb
```

* ATENCION * Esto borrará todos los datos de la BD y cargará el estado inicial.


## Rutas del api:

http://localhost:3000/api/productos

Devolverá un JSON ya sea en el navegador o en PosstMan(aqui se pueden hacer las demás peticiones:GET, POST, PUT, DELETE...)

## Ruta del frontdent

http://localhost:3000/

Renderiza y muestra los productos en un sitio web

