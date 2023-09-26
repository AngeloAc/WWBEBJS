// const qrcode = require('qrcode-terminal');

// const { Client } = require('whatsapp-web.js');
// const client = new Client();

// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
// });

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.on('loading_screen', (percent, message) => {
//     console.log('Carregando... ', percent, message);
// });

// client.initialize();
const { Client, LocalAuth ,MessageMedia, Buttons } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('loading_screen', (percent, message) => {
    console.log('Carregando... ', percent, message);
});


client.on('message', message => {
    console.log('message from', message.from)
    if (message.body === "!button") {

        let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
        client.sendMessage(message.from, button);

    }
});
 
client.initialize();
 