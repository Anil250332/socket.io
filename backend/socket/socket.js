import {Server} from 'socket.io';



// io -- send message to all clients
// socket -- send message to specific client

export const setupSocketServer = (httpServer) =>{
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('A user connected : ' + socket.id);
       
        socket.on('message', (data) => {
            socket.broadcast.emit('message', data);
        
            // socket.broadcast.emit('message', data); // send message to all clients except the sender
            // io.emit('message', data); // send message to all clients including the sender
            // socket.emit('message', data); // send message to the sender only


        });

           
        socket.on('join-room', (roomName) => {
           const roomName= messageInput2.value;
            socket.join(roomName);
  
        });


           
        socket.on('leave-room', (roomName) => {
           const roomName= messageInput2.value;
            socket.leave(roomName);
        });




 socket.on('disconnect', () => {
            console.log('A user disconnected : ' + socket.id);
        });

    });
   

}