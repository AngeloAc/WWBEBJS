// const express = require('express');
// // const mongo = require('mongoose');
// // require('dotenv').config()
// const app = express();
// const cors = require('cors')
// const body_parser = require('body-parser');





// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.use(cors({
//     origin: '*',
// }))
// app.use(body_parser.json());
// app.use(body_parser.urlencoded({ extended: false }))

// //whatsapp
// const fs = require('fs');
// const { Client, LocalAuth } = require('whatsapp-web.js');
// const { Buttons, List } = require('whatsapp-web.js');
// const QRCODE = require('qrcode')
// let qrCode = "www.oinet.ao";
// let percentual = '0';
// let message = "Whatsapp";
// let auth = false;
// let auth_error = "Erro ao se autenticar.";
// let clientOn = "black"

// const SESSION_FILE_PATH = './session.json';

// let sessionData;
// if (fs.existsSync(SESSION_FILE_PATH)) {
//     sessionData = require(SESSION_FILE_PATH);
// }

// const client = new Client({
//     puppeteer: {
//         executablePath: '/usr/bin/brave-browser-stable',
//     },
//     authStrategy: new LocalAuth({
//         clientId: "client-one"
//     }),
//     puppeteer: {
//         headless: true,
//     }
// });

// client.on('qr', qr => {
//     //qrcode.generate(qr, {small: true});
//     qrCode = qr;
//     console.log("QR. CODE IS RUNNING")
// });

// client.on('loading_screen', (percent, message) => {
//     console.log('Carregando... ', percent, message);
//     percentual = percent;
//     message = message;
// });

// client.on('authenticated', () => {
//     console.log('Autenticado');
//     auth = true;
// });

// client.on('auth_failure', msg => {
//     // Fired if session restore was unsuccessful
//     console.error('Falha ao autenticar ', msg);
// });

// client.on('ready', () => {
//     console.log('Cliente pronto');
//     clientOn = "red";
// });

// client.initialize();

// app.get('/qrcode', (req, res, next) => {

//     //Gerar o conteúdo do QR Code
//     const qrCodeContent = qrCode;

//     // Gerar o código QR baseado no conteúdo
//     QRCODE.toDataURL(qrCodeContent, (err, url) => {
//         if (err) {
//             console.error('Erro ao gerar o código QR:', err);
//             res.status(500).send('Erro ao gerar o código QR');
//         } else {
//             // console.log("url: " + url);
//             // Exibir o código QR no navegador
    
//             // res.send(qrCodeHtml);
//             res.status(200).json({
//                 qrCode: url,
//                 percentual: percentual,
//                 message: message,
//                 auth: auth,
//                 auth_error: auth_error,
//                 clientOn: clientOn

//             })
//         }
//     });

// });


// module.exports = app;





