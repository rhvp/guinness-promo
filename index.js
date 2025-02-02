require('dotenv').config();
const app = require('./app');
const mongoose = require('./config/mongoose');
const port = process.env.PORT || 1759;


Error.stackTraceLimit = 2;

process.on('uncaughtException', err => {
    console.log('Uncaught Exception!! Shutting down process..', err.name, err.message, err.stack);
    process.exit(1);
});

app.listen(port,()=>{
    console.log('App running on Port:', port)
});

process.on('unhandledRejection', err=>{
    console.log('Unhandled Rejection!!',err.code, err.name, err.message, err.stack);
});