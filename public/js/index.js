var socket = io();

    function scrollToBottom(){
        var message = $('#messages');
        var newMessage = message.children('li:last-child');
        var clientHeight = message.prop('clientHeight');
        var scrollTop = message.prop('scrollTop');
        var scrollHeight = message.prop('scrollHeight');
        var newMessageHeight = newMessage.innerHeight();
        var lastMessageHeight = newMessage.prev().innerHeight();

        if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
            message.scrollTop(scrollHeight);
        }
    }

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
        scrollToBottom();
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