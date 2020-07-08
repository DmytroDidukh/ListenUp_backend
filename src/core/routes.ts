import bodyParser from "body-parser";

import {checkAuth, updateLastSeen} from "../middlewares";
import {DialogController, MessageController, UserController} from "../controllers";
import {loginValidation} from "../utils/validations";

export default (app: any) => {
    app.use(bodyParser.json());
    app.use(updateLastSeen);
    app.use(checkAuth);

    app.get('/user/me', UserController.getMe);
    app.get('/user/:id', UserController.show);
    app.delete('/user/:id', UserController.delete);
    app.post('/user/registration', UserController.create);
    app.post('/user/login', loginValidation, UserController.login);

    app.get('/dialogs', DialogController.index);
    app.delete('/dialogs/:id', DialogController.delete);
    app.post('/dialogs', DialogController.create);

    app.get('/messages', MessageController.index);
    app.post('/messages', MessageController.create);
    app.delete('/messages/:id', MessageController.delete);
}
