import {Request, Response} from 'express';
import * as QueryString from "querystring";

import {MessageModel} from "../models";

class MessageController {
    index(req: Request, res: Response) {
        const dialogId: string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] | undefined = req.query.dialog;

        // @ts-ignore
        MessageModel.find({dialog: dialogId})
            .populate(['dialog'])
            .exec((err, messages) => {
                if (err) {
                    return res.status(404).json({
                        message: 'Messages not found'
                    })
                }
                return res.json(messages)
        })
    }

    create(req: Request, res: Response) {
        const userId = '5ef468aed3be764d54161e41'

        const postData = {
            text: req.body.text,
            user: userId,
            dialog: req.body.dialog_id,
        };

        const message = new MessageModel(postData);
        message.save()
            .then((obj: Object) => res.json(obj))
            .catch(reason => res.json(reason))
    }

    delete(req: Request, res: Response) {
        const id: string = req.params.id
        MessageModel.findByIdAndRemove({_id: id})
            .then(() => res.json({message: `Dialog removed`}))
            .catch(() => res.status(404).json({message: 'Not found'}))
    }
}

export default MessageController;
