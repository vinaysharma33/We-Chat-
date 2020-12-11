//Node server which will handle Socket.io connections

const io=require('socket.io') (8000);

const users={}

io.on('connection',socket=>{
    //If any new user joins,let other users connected to server know!
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
     
    //If someone sends message,broadcast it to other users which are connected to server
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    
    //if someone leaves the chat other users let know which are connected to server
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});
