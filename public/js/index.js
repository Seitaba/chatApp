var socket = io();

    socket.on('connect', function() {
        console.log('Connected to server !');
    });

    socket.on('disconnect', function() {
        console.log('Disconnected from server !');
    });

    socket.on('newMessage', function(message){
        var formatTime = moment(message.createdAt).format('k:mm');
        var template = $('#message__template').html();
        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formatTime
        });
        $('#messages').append(html);
    });

    $('#message-form').on('submit', function(event){
        event.preventDefault();

        var messageTextBox = $('[name=message]');

        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val()
        }, function(){
            messageTextBox.val('');
        });
    });