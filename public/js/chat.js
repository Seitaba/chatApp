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
        var params = $.deparam(window.location.search);
    
        socket.emit('join', params, function(err){
            if(err){
                alert(err);
                window.location.href = '/';
            } else {
                console.log("No error");
            }
        });
    });

    socket.on('disconnect', function() {
        console.log('Disconnected from server !');
    });

    socket.on('updateUserList', function(users) {
        var ol = $('<ol></ol>');

        users.forEach(function(user){
            ol.append($('<li></li>').text(user));
        });

        $('#users').html(ol);
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