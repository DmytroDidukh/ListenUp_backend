import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import {
    UserController,
    DialogController,
    MessageController
} from './controllers'
import {updateLastSeen} from './middlewares'

const app = express();
app.use(bodyParser.json());
app.use(updateLastSeen);

const User = new UserController();
const Dialog = new DialogController();
const Messages = new MessageController();

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.get('/user/:id', User.show);
app.post('/user/registration', User.create);
app.delete('/user/:id', User.delete);

app.get('/dialogs/:id', Dialog.index);
app.post('/dialogs', Dialog.create);
app.delete('/dialogs/:id', Dialog.delete);

app.get('/messages', Messages.index);
app.post('/messages', Messages.create);
app.delete('/messages/:id', Messages.delete);

app.listen(5000, function () {
    console.log('Listening port 5000')
})

//"start": "json-server --port 3001 --watch db.json"
