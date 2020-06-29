import {NextFunction, Request, Response} from "express";

import {verifyJWTToken} from '../utils'

export default (req, res, next) => {
    const token = req.headers.token;

    verifyJWTToken(token)
        .then((user) => {
            req.user = user;
            next()
        })
        .catch(() => res.status(403).json({message: 'Invalid auth token provided'}))
    next()
}
