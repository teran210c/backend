const express = require('express');
const app = express();
const port = 3010;
const {Server} = require("socket.io");
const chatSocket = require("./sockets/chat");

const userRoutes = require('./routes/users');
const {testConnection} = require('./config/db');

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

app.use(express.json())

app.use('',userRoutes)

app.get('/', (req, res)=>{
    res.send('Hola Mundo')
});



testConnection().then((connected) => {
    if(connected){
    app.listen(port, ()=>{
        console.log('Servidor escuchando el puerto', port)
    });
}else {
    console.error("x no jala el mysql")

}

});