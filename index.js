const express = require('express')
const http = require('http');
const https = require('https');
const cors = require('cors');

const fs = require('fs');
const socketIO = require('socket.io', {
    allowEI03: true
});


const credentials = {
    key: fs.readFileSync('/Users/boudewijnnoordhuis/localhost-key.pem'),
    cert: fs.readFileSync('/Users/boudewijnnoordhuis/localhost.pem'),

  };
  


let app = express();
// let server = http.createServer(app);
let server = https.createServer(credentials, app).listen(8080);

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


app.use(express.static("./app"), cors(corsOptions));


let io = socketIO(server);




let connections = {};
let slidersAmount;

io.on('connection', (socket) => {
   
    console.log("connnectieee id: " + socket.id )
    let id = socket.id;



    connections[socket.id] = {
        id: socket.id, // dubbele id
        locationReady:  false,
        lat: 0,
        lon: 0
    }

    io.emit("new-connection", "WOOOHO" );
    socket.on("slider-count", (count) => {
        console.log(count)
        slidersAmount = count;
    })


    socket.on('send-slider', (value) => {
        console.log(JSON.stringify(value))

        io.emit("tdevent0", JSON.stringify(value))  
    }); 

   

	function socketDisconnected() {
		delete connections[socket.id];
	}

   

	socket.on('disconnect', socketDisconnected);
	socket.on('message-send', (message) => {
        console.log("noier")
        io.emit("message-receive", message );
    });

  
})

