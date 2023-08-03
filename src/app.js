const express = require('express');
// const mongo = require('mongoose');
// require('dotenv').config()
const app = express();
// const body_parser = require('body-parser');
// const index = require('./router/index');
// const produto = require('./router/produts');
// const user = require('./router/user')

// conexao com banco de dado
// mongo.connect(process.env.MONGO_CONNECT_URI).
//     then(() => console.log("Connected to db")).catch(error => console.log("Ocorreu um erro ao criar o banco de dados!" + error.message));

// app.use(body_parser.json());
// app.use(body_parser.urlencoded({ extended: false }))

app.use('/', (req, res, next)=>{
    res.json({mess: "im on"});
});
// app.use('/produto', produto);
// app.use('/user', user);



module.exports = app;





