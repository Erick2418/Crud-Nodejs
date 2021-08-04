const express = require('express');
const path = require('path');
const app= express(); //inicializamos express
const morgan= require('morgan');
const mysql= require('mysql');
const myConnection= require('express-myconnection');
//importando rutas
const customersRoutes= require('./routes/customers');
const { urlencoded } = require('express');
// settings
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
//middlewares (ESTO SE EJECUTA ANTES QUE VENGAN LAS PETICIONES DE LOS USAURIOS)
// LOS MIDDLEWARES SON FUNCIONES BASICAMENTE
// en express las peticiones se conocen como rutas.

//perimero rgistramos las peticiones que llegan,, para eso esta morgan
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host:'localhost',
    user: 'root',
    password:'',
    port: '3306',
    database:'crudnodejsmysql'
}, 'single'));
//middleware new 
app.use(express.urlencoded({extended:false}));
//con esta funcion decimos que desde express estamos requiriendo un modulo que permita
// entender los datos que vengan del formulario ejs, con esto recibimos los datos en el controller desde req.body



//routes

app.use('/',customersRoutes); // con esto le decimos oye usuario cuando llegues a esta ruta ejecuta customers rout
//statics files -- estos son complementos... basicamente en public las imagenes, iconos y demas
app.use(express.static(path.join(__dirname,'public')));



// starting server
app.listen(app.get('port'),()=>{ //app escucha el puerto.. y has un clg
    console.log('server on port 3000');
}) 
