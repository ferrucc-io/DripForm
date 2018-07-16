const express = require('express');
const httpServer = require('http');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const Tgfancy = require('tgfancy');

// Import Local Dependencies
const config = require('./config');
const generator = require('./utility/genMSG');

// Initialise APP
const app = express();
const http = httpServer.Server(app);

// CONFIGURATION
const port = process.env.PORT || config.port;
app.set('port', process.env.PORT || config.port);
// mongoose.connect(config.database);
app.set('superSecret', config.secret);

// Set up Body Parser [for POST/GET requests]
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// log requests with morgan
app.use(morgan('dev'));

// bot TOKEN
const token = config.prodToken;
// local
// const token = config.localToken;

// Options for sendMessage
const options = {
  parse_mode: 'Markdown',
  reply_markup: {
    ReplyKeyboardMarkup: {
      keyboard: [
        ['Yes'],
        ['No'],
      ],
    },
  },
};

const bot = new Tgfancy(token, {
  tgfancy: {
    chatIdResolution: true,
  },
  polling: true,
});

bot.on('message', (msg) => {
  bot.sendMessage(msg.chat.id, `Hello, welcome to Dripform!\nYour user-id is ${msg.chat.id}\nCopy and paste this code to your website to start receiving forms as messages here:`);
  bot.sendMessage(msg.chat.id, `<script src="https://dripform.ml/js/dripform.js" tguser="${msg.chat.id}" > </script>`);
});

// ------------------------------ //
//           ROUTES               //
// ------------------------------ //


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/success.html'));
});

// ------------------------------ //
//          API ROUTES            //
// ------------------------------ //

const apiRoutes = express.Router();

apiRoutes.post('/send-message', (req, res) => {
  const myMessage = generator.message(req.body.email, req.body.message);
  bot.sendMessage(req.body.user, myMessage, options).catch(err => console.log(err));
  console.log(req.originalUrl);
  res.redirect('../success');
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
