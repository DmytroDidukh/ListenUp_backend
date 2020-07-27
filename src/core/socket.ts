import socket from 'socket.io';
import http from 'http'

export default (http: http.Server) => {
    const io = socket(http);

    io.on('connection', (socket: socket.Socket) => {
        // console.log('CONNECTED');
        // socket.emit('test command', 'qwertyQWERTY')
    });

    return io;
}

