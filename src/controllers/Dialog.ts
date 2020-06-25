import {Request, Response} from 'express';
import {DialogModel} from "../models";

class DialogController {
    index(req: Request, res: Response) {
        const authorId: string = req.params.id;

        DialogModel.find({author: authorId})
            .populate('dialogs')
            .exec((err, dialogs) => {
                if (err) {
                    return res.status(404).json({
                        message: 'Dialogs not found'
                    })
                }
                return res.json(dialogs)
        })
    }

    create(req: Request, res: Response) {
        const postData = {
            author: req.body.author,
            companion: req.body.companion,
        };

        const dialog = new DialogModel(postData);
        dialog.save()
            .then((obj: Object) => res.json(obj))
            .catch(reason => res.json(reason))
    }

    /*delete(req: Request, res: Response) {
        const id: string = req.params.id
        DialogModel.findByIdAndRemove(id)
            .then((user) => res.json({message: `User ${user && user.fullName} removed`}))
            .catch(() => res.status(404).json({message: 'Not found'}))
    }

    */
}

export default DialogController;
