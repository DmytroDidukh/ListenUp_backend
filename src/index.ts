import express from 'express';
import dotenv from 'dotenv';
import {createServer} from 'http';

import './core/db';
import createRoutes from './core/routes';
import createSocket from './core/socket';

const app = express();
const http = createServer(app);
const io = createSocket(http);

//TODO: https://www.youtube.com/watch?v=BvHEFb6W_UE&list=PL0FGkDGJQjJFDr8R3D6dFVa1nhce_2-ly&index=14 41 min

dotenv.config();
createRoutes(app, io)

http.listen(process.env.PORT, () => {
  console.log(`Server: http://localhost:${process.env.PORT}`);
});
