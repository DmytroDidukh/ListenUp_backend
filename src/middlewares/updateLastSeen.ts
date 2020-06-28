import {NextFunction, Request, Response} from "express";

import {UserModel} from "../models";

export default (_: Request, __: Response, next: NextFunction) => {
    UserModel.findOneAndUpdate(
        {
            _id: '5ef468aed3be764d54161e41'
        },
        {
            $set: {
                last_seen: new Date()
            }
        },
        {new : true},
        () => {}
    );
    next()
}
