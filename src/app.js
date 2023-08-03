const express = require('express');
// const mongo = require('mongoose');
// require('dotenv').config()
const app = express();

//whatsapp
const fs = require('fs');
const {Client, LocalAuth} = require('whatsapp-web.js');
const { Buttons, List } = require('whatsapp-web.js');
const QRCODE = require('qrcode')
let qrCode = "www.oinet.ao";
let percentual = '0';
let message = "Whatsapp";
let auth = false;
let auth_error = "Erro ao se autenticar.";
let clientOn = "black"

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
    //qrcode.generate(qr, {small: true});
    qrCode = qr;
    console.log("QR. CODE IS RUNNING")
});

client.on('loading_screen', (percent, message) => {
    console.log('Carregando... ', percent, message);
    percentual = percent;
    message = message;
});

client.on('authenticated', () => {
    console.log('Autenticado');
    auth = true;
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('Falha ao autenticar ', msg);
});

client.on('ready', () => {
    console.log('Cliente pronto');
    clientOn = "red";
});

client.initialize();
 
app.get('/', (req, res, next) => {

    //Gerar o conteúdo do QR Code
    const qrCodeContent = qrCode;

    // Gerar o código QR baseado no conteúdo
    QRCODE.toDataURL(qrCodeContent, (err, url) => {
        if (err) {
            console.error('Erro ao gerar o código QR:', err);
            res.status(500).send('Erro ao gerar o código QR');
        } else {
            // Exibir o código QR no navegador
            const qrCodeHtml =
                `
      <head>

      <!-- p5 -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/addons/p5.sound.min.js"></script>
        <style>
        .btn {
          margin-top: 15px;
          margin-bottom: 15px;
          padding: 10px 20px;
          background-color: transparent;
          color: black;
          border: 1px solid gray;
          border-radius: 20px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          text-decoration: none;
        }
        .btn:hover{
          background-color: gray;
          color: white;
          text-decoration: none;
        }
        .qrcodeImg{
          border: none; 
          border-radius: 10px; 
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
        }
        .qrcodeImg.transparente{
          opacity: 0.2;
        }
        </style>
      </head>
      <body style=" font-family: Arial, sans-serif; padding-top: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <div style="width: 400px; height: 500px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: none; border-radius: 10px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);">
      <h2>OINET CRM BOT AI</h2>
      <p id="resfreshme">Carregando ${percentual} ${message}</p>
      <img id="qrcode" src="${url}" alt="QR Code" class="qrcodeImg">
      
      <div style="width: 100px; padding-top: 20px; display: flex; align-items: center; justify-content: center;">
      
      <div style="background-color: ${clientOn}; width: 15px; height: 15px;border: 1.5px solid black; border-radius: 50%; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);"></div>
      </div >
      <a class="btn" onclick="abrirNovaPagina()" href="" >Configurar</a>
      </div>

      
      <footer>
      <div style="display: flex; align-items: center; justify-content: center;" style="height: 75px;">
          <p style="margin: 5px;">&copy; <a style="color:gray; text-decoration: none;" href="#"> OINET
                  2023 Todos os direitos reservados
          </p>
          <p style="font-size: 14px;">
              <!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
               Designed by <a style="text-decoration: none; color: blue;"
                  href="">startic</a>
          </p>
      </div>
  </footer>


      <script>
      var intervalo = 5000;
      function atualizarPagina() {
        location.reload();
      }
      setInterval(atualizarPagina, intervalo);
        function callMe (){
          console.log("call me on console.");
        }
        const qrcode = document.getElementById('qrcode');
        if(${auth} === true){
          qrcode.classList.add('transparente');
          console.log("autenticado");
        }else{
          qrcode.classList.remove('transparente');
          console.log("none user");
        }

        function abrirNovaPagina() {
          window.open(' ', '_blank');
        }
      </script>
        
    

      </body>
      `;
            res.send(qrCodeHtml);
        }
    });

});


module.exports = app;





