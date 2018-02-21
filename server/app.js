const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected !');

    socket.on('createMessage',  (message) => {
         console.log('Message from client : ', message);
    });

    socket.emit('newMessage', {
        from: "Admin",
        message: "Hello from server !"
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected !');
    });
});

server.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});