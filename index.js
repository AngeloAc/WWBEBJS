// create a server 
const app = require('./src/app');
const express = require('express');
const http = require('http');
// require('dotenv').config()



//used just for test
// const porta = normalizePort(process.env.PORT || 3000); 
app.set('port', porta);

const server = http.createServer(app);

server.listen(porta);
console.log("Server is running on port 3000");

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return val;
    }
    return false;
}

function error() {

}