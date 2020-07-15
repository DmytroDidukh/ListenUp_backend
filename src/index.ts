import express from 'express';
import dotenv from 'dotenv';
import socket from 'socket.io';
import {createServer} from 'http';

import './core/db';
import createRoutes from './core/routes';

const app = express();
const http = createServer(app);
const io = socket(http);

//TODO: https://www.youtube.com/watch?v=BvHEFb6W_UE&list=PL0FGkDGJQjJFDr8R3D6dFVa1nhce_2-ly&index=14 41 min

dotenv.config();
createRoutes(app, io)

io.on('connection', (socket: any) => {
  console.log('CONNECTED');
  socket.emit('test command', 'qwertyQWERTY')
});
http.listen(process.env.PORT, () => {
  console.log(`Server: http://localhost:${process.env.PORT}`);
});
