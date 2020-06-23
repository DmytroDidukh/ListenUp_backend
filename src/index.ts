import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import {UserController} from './controllers'

const app = express();
app.use(bodyParser.json());

const User = new UserController()

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.get('/user/:id', User.show);
app.delete('/user/:id', User.delete);
app.post('/user/registration', User.create);

app.listen(5000, function () {
    console.log('Listening port 5000')
})

//"start": "json-server --port 3001 --watch db.json"
