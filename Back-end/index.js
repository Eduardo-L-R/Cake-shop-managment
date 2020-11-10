const express = require("express");
const bodyParser = require("body-parser");
const mongooseDriver = require("mongoose")
const cors = require("cors");
const http = require('http');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const app = express();
const port = process.env.PORT || 8000;
app.set('trust proxy', ['::ffff:200.124.47.201']);

app.use(cors())

//application/json
app.use(bodyParser.json());

app.use((req, res) => {
    console.log(req.header('x-forwarded-for') || req.connection.remoteAddress);
    console.log(req.ip)
    console.log(`ip:${req.ips[0] || req.ip.split(':')[req.ip.split(':').length - 1]} method:${req.method} url:${req.url} port:${req.port}`);
})
//application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded()); 

//app.use('/links', routesDatabaseLinks);

mongooseDriver.connect('mongodb://localhost:27017/Git_data_2_0?readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Conexión con la base de datos establecida");
    http.get('http://bot.whatismyipaddress.com', (res) => {
        res.setEncoding('utf8');
        res.on('data', (publicIpAdress) => {
            console.log('you public address is:', `${publicIpAdress}:${port}`);
        });
    });
    app.listen(port, () => { console.log(`Escuchando sobre el puerto ${port}`); });
}).catch(error => {
    console.log(error);
});