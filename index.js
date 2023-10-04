// create a server 
const express = require('express');
const app = express();
const http = require('http');
const multer = require('multer');
const cors = require('cors')
const body_parser = require('body-parser');
const WebSocket = require('ws');
const { OpenAIModel } = require('./src/openAiModel');
const mongo = require('mongoose');
const dotenv = require('dotenv').config();
const User = require('./src/models/user')








//used just for test
// const porta = normalizePort(process.env.PORT || 3000);
// const id = "64f3201a1b19a7078c5639e7";


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(cors({
    origin: '*',
}))
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));


// Configuração do Multer para o upload de arquivos
const storage = multer.diskStorage({
    destination: 'uploads/', // Pasta onde os arquivos serão salvos
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        cb(null, Date.now() + extname); // Nome do arquivo será o timestamp atual + extensão
    },
});

const upload = multer({ storage });


//whatsapp
const fs = require('fs');
const QRCODE = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');
let qrCode = "www.oinet.ao";
let percentual = '0';
let message = "Whatsapp";
let auth = false;
let auth_error = "Erro ao se autenticar.";
let clientOn = "black"



const mongoose = require('mongoose');


mongo.connect(process.env.MONGO_CONNECT_URI).
    then(() => console.log("Connected to db")).catch(error => console.log("Ocorreu um erro ao criar o banco de dados!" + error.message));




const SESSION_FILE_PATH = './session.json';

let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    puppeteer: {
        executablePath: '/usr/bin/brave-browser-stable',
        args: ['--no-sandbox'],
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
    const user = await User.findByIdAndUpdate({ _id: id },
        {
            $set: {
                addons: {
                    userNumber: ownInfo.user,
                    status: 'edit',

                }
            }
        }
    );

});

client.initialize();

//CREATING WHATSAPP GPT...
client.on('message', async msg => {
    const newOpenAiModel = new OpenAIModel(id);
    // const response = await newOpenAiModel.generateMessage(msg.body);
    const response = await newOpenAiModel.generateDirectFromOpenAI(msg.body)
    client.sendMessage(msg.from, response);

});

app.get('/client/logout', (req, res, next) => {
    // client.logout();
    console.log('cliente whatsapp desconectado com sucess.')
    res.status(200).json({
        message: 'Client disconnected from whatsapp.'
    });
    return process.exit();
});





app.post('/sendMessage', (req, res, next) => {
    console.log("estou recebendo a message...");
    try {
        // console.log(req.body);
        const phone = req.body.phone_invite;
        const sender = req.body.sender;
        const message_invite = "Foste convidado pelo seu amigo(a) " + sender + " juntar-te a família Startic, com a melhor Inteligencia Artificial. Acesse também: https://startic.ao. Para saber mais podemos conversar aqui.";
        client.sendMessage(`${req.body.index}${phone}@c.us`, message_invite).then((message) => {
            // console.log(`Message sent successfully. Message ID: `);
  
        })
            .catch((error) => {
                console.error('Error sending message:', error);
                return res.status(400).json({ error: "Não conseguimos enviara a sua mensagem." });
            });
  
        return res.status(200).json({
            message: "Mensagem enviada."
        });
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
  
  });


app.post('/verificationcode', (req, res) => {
    client.sendMessage(`${req.body.index}${req.body.telefone}@c.us`, `O codigo *${req.body.randomNumber}* será utilizado na app Chat.Startic `);
    return res.status(200).json({
        data: req.body
    })
});


// Rota para receber o upload de imagens
app.post('/upload', upload.single('file'), (req, res) => {

    client.sendMessage("244935407576@c.us", "Novo pagamento do cliente de 2.000,00 kz");
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    res.send('Arquivo enviado com sucesso!');
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