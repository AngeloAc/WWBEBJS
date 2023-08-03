// create a server 
const app = require('./src/app');
const express = require('express');
const http = require('http');
// require('dotenv').config()


const porta = normalizePort(process.env.PORT || 3000);
app.set('port', porta);

//whatsapp
const fs = require('fs');
const {Client, LocalAuth} = require('whatsapp-web.js');
const { Buttons, List } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


client.on('ready', qr =>{
    console.log('client is ready')
})
 
client.initialize();

const server = http.createServer(app);

server.listen(porta);
console.log("Server is running on port 3000");

let button = new Buttons('*Como posso te ajudar?*',
[{body:'Conta'},
{body:'Suporte técnico'},
{body:'Pagamento'},
],'MENU','Joice, inteligencia artificial');

client.on('message', async message => {
	if(message.body === "!ping") {
		client.sendMessage(message.from, "hello");
        console.log(message)
	}else{
        console.log(message)
    }
})
 


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