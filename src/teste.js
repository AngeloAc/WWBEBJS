const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3036;
const cors = require('cors')
const body_parser = require('body-parser');


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


// client.on('message',async message => {
//     console.log('message from', message.from)
//     console.log(message)
    
//                                 if (message.hasMedia) {
//                             const time = new Date(message.timestamp * 1000).toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[1].replaceAll(':', '-')
//                             const date = new Date(message.timestamp * 1000).toISOString().substring(0, 10);
//                             const person = message['_data']['notifyName'];
//                             const phoneNumber = message.from.replaceAll('@c.us', '');
//                             const media = await message.downloadMedia();
//                             console.log(media)
//                             // do something with the media data here
//                             const folder = process.cwd() + '/img/' + phoneNumber + '_' + person + '/' + date + '/';
//                             const filename = folder + time + '_' + message.id.id + '.' + media.mimetype.split('/')[1];
//                             fs.mkdirSync(folder, { recursive: true });
//                             fs.writeFileSync(filename, Buffer.from(media.data, 'base64').toString('binary'), 'binary');
//                             if (media.mimetype === 'audio/ogg; codecs=opus') {
//                                 console.log('AUDIO SENT: ');

//                             } else if (media.mimetype === 'image/jpeg') {
//                                 console.log("IMAGE SENT: ");
//                             }
                     
        

//     }
// });

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


// Rota para receber o upload de imagens
app.post('/upload', upload.single('file'), (req, res) => {

    client.sendMessage("244935407576@c.us", "Novo pagamento do cliente de 2.000,00 kz");
    if (!req.file) {
      return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    res.send('Arquivo enviado com sucesso!');
  });

  app.post('/verificationcode', (req, res) => {
    client.sendMessage(`${req.body.index}${req.body.telefone}@c.us`, `O codigo *${req.body.randomNumber}* será utilizado na app Chat.Startic `);
    return res.status(200).json({
      data: req.body
    })
  });

 
client.initialize();
 
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
