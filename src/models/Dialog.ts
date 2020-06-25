import {Schema, model, Document} from 'mongoose';

export interface IDialog extends Document {
    author: {
        type: Schema.Types.ObjectId,
        ref: string,
        require: true
    },
    companion: {
        type: Schema.Types.ObjectId,
        ref: string,
        require: true
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: string,
        }
    ]
}

const DialogSchema = new Schema({
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        companion: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        }
    },
    {
        timestamps: true
    }
);

export default model<IDialog>('Dialog', DialogSchema);

