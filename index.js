// create a server 
const express = require('express');
const app = express();
const http = require('http');
// require('dotenv').config()
const cors = require('cors')
const body_parser = require('body-parser');
const WebSocket = require('ws');
const { OpenAIModel } = require('./src/openAiModel');
const mongo = require('mongoose');
const dotenv = require('dotenv').config();
const User = require('./src/models/user')











//used just for test
// const porta = normalizePort(process.env.PORT || 3000);
// const id = "64e6287e4f688c06d462f4f8";


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(cors({
    origin: '*',
}))
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));


//whatsapp
const fs = require('fs');
const QRCODE = require('qrcode');
const {Client, LocalAuth} = require('whatsapp-web.js');
let qrCode = "www.oinet.ao";
let percentual = '0';
let message = "Whatsapp";
let auth = false;
let auth_error = "Erro ao se autenticar.";
let clientOn = "black"



const mongoose = require('mongoose');

// mongo.connect(process.env.MONGO_CONNECT_URI).
mongo.connect(process.env.MONGO_CONNECT_URI).
    then(() => console.log("Connected to db")).catch(error => console.log("Ocorreu um erro ao criar o banco de dados!" + error.message));




const SESSION_FILE_PATH = './session.json';

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    puppeteer: {
        executablePath: '/usr/bin/brave-browser-stable',
      },
      authStrategy: new LocalAuth({
        clientId: "client-one"
      }),
      puppeteer: {
        headless: true,
      }
});

    wss.on('connection', (ws) => {
        console.log('Novo cliente conectado');


        client.on('qr', qr => {
            //qrcode.generate(qr, {small: true});
            // qrCode = qr;
            console.log("QR. CODE IS RUNNING");

            QRCODE.toDataURL(qr, (err, url) => {
                if (err) {
                    console.error('Erro ao gerar o código QR:', err);
                    res.status(500).send('Erro ao gerar o código QR');
                } else {
                    ws.send(JSON.stringify({
                        qrCode: url,
                        percentual: percentual,
                        message: message,
                        auth: auth,
                        auth_error: auth_error,
                        clientOn: clientOn

                    }));

                }
            });

        });

        client.on('authenticated', () => {
            console.log('Autenticado');
            auth = true;

            ws.send(JSON.stringify({
                qrCode: null,
                percentual: percentual,
                message: message,
                auth: auth,
                auth_error: auth_error,
                clientOn: clientOn

            }));
        });

        ws.on('close', () => {
            //   clearInterval(sendInterval);
            console.log('Cliente desconectado');
        });
    });

    client.on('loading_screen', (percent, message) => {
        console.log('Carregando... ', percent, message);
        percentual = percent;
        message = message;
    });

    client.on('authenticated', (session) => {
        console.log('Autenticado com sucesso');
        auth = true;
        
      });

    client.on('ready', async () => {
        console.log('Cliente pronto');
        const ownInfo = client.info.me
        const user = await User.findByIdAndUpdate({_id: id},
            {$set: {
                addons: {
                    userNumber: ownInfo.user
                    }
                }
            }
        );
        
        console.log('Meu nome:', ownInfo.user);
        console.log('Battery status:', await client.info.getBatteryStatus);
        console.log('--------');
        clientOn = "red";
    });

    client.initialize();

    //CREATING WHATSAPP GPT...
    client.on('message', async msg => {
        const newOpenAiModel = new OpenAIModel(id);
        const response = await newOpenAiModel.generateMessage(msg.body);
        client.sendMessage(msg.from, response);

    });

    app.get('/client/logout', (req, res, next) => {
        client.logout();
        console.log('cliente whatsapp desconectado com sucess.')
        res.status(200).json({
            message: 'Client disconnected from whatsapp.'
        });
    });







app.get('/qrcode', (req, res, next) => {

    res.status(200).json({
        message: 'obaaa'
    })

});

app.get('/mongo', async (req, res, next) => {
    const user = await User.find();


    res.status(200).json({
        message: user
    })

});


app.set('port', porta);




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