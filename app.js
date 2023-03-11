// Importamos el paquete "express" y creamos una instancia de la aplicación.
var express = require('express'); 
var app = express();

// Establecemos el número de puerto en el que se ejecutará la aplicación.
var port = process.env.PORT || 3000;

// Establecemos el motor de vistas como "ejs" y agregamos una carpeta para archivos estáticos.
app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public')); 

// Middleware que se utiliza para registrar cada solicitud HTTP en la consola de registro.
app.use('/', function(req, res, next) { 
    console.log('Request Url: ' + req.url); 
    next(); 
});

// Definimos una ruta que maneja las solicitudes para la raíz de la aplicación.
app.get('/', function(req, res) { 
    res.render('index');
});

// Definimos una ruta que maneja las solicitudes con un parámetro de ruta dinámico ":id".
// El valor del parámetro ":id" se utiliza para buscar una persona en un objeto de datos y 
// se renderiza una vista con los detalles de la persona.
app.get('/person/:id', (req, res) => {
    const id = req.params.id;
    res.render('person', { id });
  });

// Creamos un objeto de datos "data" que contiene información de personas.
let data = [
    { id: 1, nombre: "Hugo", apellido: "Estrada Ramirez", edad: 20},
    { id: 2, nombre: "Estrella", apellido: "Perez Suarez", edad: 21},
    { id: 1, nombre: "Diana", apellido: "Contreras Morales", edad: 18},
];

// Definimos una ruta que maneja las solicitudes para la URL "/personas".
// Se renderiza una vista que muestra una lista de personas utilizando los datos del objeto "data".
app.get('/personas', function (req, res) {
    res.render('personas', {data});
});

// Iniciamos el servidor de la aplicación en el puerto definido.
app.listen(port);
