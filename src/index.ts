import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import {User} from './schemas'

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.post('/create', function (req: any, res: any) {
    const postData = {
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
    };

    const user = new User(postData);
    user.save()
        .then((obj: any) =>  res.json(obj))
        .catch( reason => res.json(reason))
});

app.listen(3005, function () {
    console.log('Listening port 3005')
})

//"start": "json-server --port 3001 --watch db.json"
