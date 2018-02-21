var socket = io();

    socket.on('connect', function() {
        console.log('Connected to server !');

        socket.emit('createMessage', {
            from: "Seid",
            message: "Hello from client !"
        });
    });

    socket.on('newMessage', function(message){
        console.log("message from server: ", message);
    });


    socket.on('disconnect', function() {
        console.log('Disconnected from server !');
    });