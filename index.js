//Exporto express
const express = require('express');

//Creo el servidor
const app = express();

//Conecto a BD
const mysql = require('mysql2');

//Libreria motor de plantillas
const hbs = require('hbs');

// Para encontrar los archivos
const path = require ('path');

//Para enviar mail al cliente
const nodemailer = require('nodemailer');
const { Console } = require('console');

//necesitamos la configuracion/ variables de entorno (variables en otro alrchivo)
require('dotenv').config();

//Configuramos el Puerto
const PORT = process.env.PORT || 9000; 
//console.log(PORT);
//console.log(process.env.USER);
//console.log(process.env.EMAIL);

//MIDDELWARE son funciones que dan info a la aplicacion 
//al backend para saber que tiene que saber leer json 
// o decodificar lo que viene a traves de una url
app.use(express.json()); // aca estoy diciendo que interpreta .json 
app.use(express.urlencoded({ extended: true }));
// aca le estoy diciendo 
// que active la decodificacion de datos que recibe  

app.use(express.static(path.join(__dirname, 'public')));
//para que encuntre los archivos


//Configuramos el motor de plantillas de HBS
//estamos definiendo que tipo de front va a tener a aplicacion
app.set('view engine', 'hbs');

//Configuramos la hubicacion de las plantilla 
app.set('views', path.join(__dirname, 'views'));

//Configuramos los parciales de los motores de plantilla
hbs.registerPartials(path.join(__dirname, 'views/partials'));



//Conexion da la Base de Datos
// LO VAMOS HACER CON NUESTRAS VARIABLES DE ENTORNO QUE YA TENEMOS DECLARADAS
const conexion = mysql.createConnection({
    host:process.env.HOST, 
    user: process.env.USER,
    database: process.env.DATABASE, //creo en workbench BD
    port:process.env.DBPORT,

})
//  Compruebo que esta conectado, aca me tiene que decri
// a que base de datos estoy conectada
conexion.connect((err) =>{
    if(err) throw err;
    console.log(`Conectado a la Database ${process.env.DATABASE}`)
    
})

//Rutas de la Aplicación
app.get('/', (req, res) => {
    res.send('Bienvenido a la App Completa')
})

//Servidor a la escucha de las peticiones
app.listen(PORT, ()=>{
    console.log(`Servidor trabajando en el Puerto: ${PORT}`);
})








