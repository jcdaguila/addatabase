const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

/*Https settings */
var fs = require('fs');
var http = require('http');
var https = require('https');
/*var privateKey  = fs.readFileSync(path.join(__dirname, 'sslcert', 'key.pem'));
var certificate = fs.readFileSync(path.join(__dirname, 'sslcert', 'cert.pem'));*/

var privateKey  = fs.readFileSync('sslcert/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('sslcert/selfsigned.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
/*End Https settings */
const express = require("express");
const app=express();

var corsOptions={
    origin: ["http://localhost:8081", "http://sgethereum:8081", "http://192.168.1.65:8081", "http://10.1.10.213:8081", "http://10.1.10.132:8081",
    "https://localhost:8081", "https://sgethereum:8081", "https://192.168.1.65:8081", "https://10.1.10.213:8081", "https://10.1.10.132:8081"],
    default: "https://sgehtereum:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//simple route
app.get("/", (req, res)=>{
    res.json({message: "Welcome to Jcdaguila Application - Jungle"});
});


require("./routes/table.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
/*app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
});*/

/* */
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
/* */