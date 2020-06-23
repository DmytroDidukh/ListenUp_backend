import {Request, Response} from 'express';
import {UserModel} from "../schemas";

class UserController {
    show(req: Request, res: Response) {
        const id: string = req.params.id
        UserModel.findById(id)
            .then((user) => res.json(user))
            .catch(() => res.status(404).json({message: 'Not found'}))
    }

    delete(req: Request, res: Response) {
        const id: string = req.params.id
        UserModel.findByIdAndRemove(id)
            .then((user) => res.json({message: `User ${user && user.fullName} removed`}))
            .catch(() => res.status(404).json({message: 'Not found'}))
    }

    create(req: Request, res: Response) {
        const postData = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password,
        };

        const user = new UserModel(postData);
        user.save()
            .then((obj: Object) => res.json(obj))
            .catch(reason => res.json(reason))
    }
}

export default UserController;
