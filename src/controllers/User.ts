import {Request, Response} from 'express';

import {UserModel} from "../models";
import {IUser} from "../models/User";
import {createJWTToken} from "../utils";

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

    login(req: Request, res: Response) {
        const postData = {
            email: req.body.login,
            password: req.body.password,
        };

        UserModel.findOne({email: postData.email}, (err, user: IUser) => {
            if (err) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            if (user.password === postData.password) {
                const token = createJWTToken(postData);
                res.json({
                    status: 'success',
                    token
                })
            } else {
                res.json({
                    status: 'error',
                    message: 'incorrect password or email'
                })
            }
        })
    }
}

export default UserController;
