import {Request, Response} from "express";
import {validationResult} from 'express-validator';
import bcrypt from 'bcrypt';
import socket from 'socket.io';

import {UserModel} from '../models';
import {createJWToken} from '../utils';

class UserController {
    io: socket.Server

    constructor(io: socket.Server) {
        this.io = io
    }

    show = (req: Request, res: Response) => {
        const id: string = req.params.id;
        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            res.json(user);
        });
    }

    getMe = (req: Request, res: Response) => {
        // @ts-ignore
        const id: string = req.user._id;
        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            res.json(user);
        });
    }

    create = (req: Request, res: Response) => {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
        };
        const user = new UserModel(postData);
        user
            .save()
            .then((obj: any) => {
                res.json(obj);
            })
            .catch(reason => {
                res.json(reason);
            });
    }

    delete = (req: Request, res: Response) => {
        const id: string = req.params.id;
        UserModel.findOneAndRemove({_id: id})
            .then(user => {
                if (user) {
                    res.json({
                        message: `User ${user.fullname} deleted`,
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: `User not found`,
                });
            });
    }

    login = (req: Request, res: Response) => {
        const postData = {
            email: req.body.email,
            password: req.body.password,
        };

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }

        UserModel.findOne({email: postData.email}, (err, user: any) => {
            if (err) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            if (bcrypt.compareSync(postData.password, user.password)) {
                const token = createJWToken(user);
                res.json({
                    status: 'success',
                    token,
                });
            } else {
                res.json({
                    status: 'error',
                    message: 'Incorrect password or email',
                });
            }
        });
    }
}

export default UserController;
