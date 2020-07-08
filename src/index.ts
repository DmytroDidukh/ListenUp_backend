import express from 'express';
import dotenv from 'dotenv';
import socket from 'socket.io';
import {createServer} from 'http';

import './core/db';
import createRoutes from './core/routes';

const app = express();
const http = createServer(app);
const io = socket(http);

dotenv.config();
createRoutes(app)

io.on('connection', (socket: any) => {
  console.log('CONNECTED');
  socket.emit('test command', 'qwertyQWERTY')

  socket.on('222', (msg: any) => {
    console.log('CLIENT SAY:' + msg)
  })
});
http.listen(process.env.PORT, () => {
  console.log(`Server: http://localhost:${process.env.PORT}`);
});
