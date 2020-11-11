const express = require("express");
const bodyParser = require("body-parser");
const mongooseDriver = require("mongoose")
const cors = require("cors");
const http = require('http');
const dotenv = require('dotenv');
const fs = require("fs");


dotenv.config({ path: './.env' });
const app = express();
const port = process.env.PORT || 8000;

const routes = require('./routes/routes.js');

app.use((req, res, next) => {
  var datetime = new Date();
  console.log(`Ip: ${req.headers["x-real-ip"] || req.ip.split(':')[req.ip.split(':').length - 1] || req.ips[0] || req.header('x-forwarded-for')} Method: ${req.method} Url: ${req.url} Time: ${datetime}`);
  fs.appendFile('log.txt', `Ip: '${req.headers["x-real-ip"] || req.ip.split(':')[req.ip.split(':').length - 1] || req.ips[0] || req.header('x-forwarded-for')}' Method: '${req.method}' Url: '${req.url}' Time: '${datetime}',\n`,
    (err) => { if (err) throw err; console.log('Log actualizado! \n'); });
  next();
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api/v1/cakes', routes);

mongooseDriver.connect(`mongodb://localhost:27017/${process.env.DATABASENAME}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Conexión con la base de datos establecida");
  app.listen(port, () => { console.log(`Escuchando sobre el puerto ${port}`); });
  http.get('http://bot.whatismyipaddress.com', (res) => {
    res.setEncoding('utf8');
    res.on('data', (publicIpAdress) => {
      console.log('you public address is:', `${publicIpAdress}:${port} \n`);
    });
  });
}).catch(error => {
  console.log(error);
});
