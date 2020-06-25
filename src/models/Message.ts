import {Schema, model, Document} from 'mongoose';

export interface IMessage extends Document {
    dialog: {
        type: Schema.Types.ObjectId,
        ref: string,
        require: true
    };
    text: {
        type: string,
        require: boolean
    };
    unread: {
        type: boolean,
        default: boolean
    };
}

const MessageSchema = new Schema({
        text: {
            type: String,
            require: Boolean
        },
        dialog: {
            type: Schema.Types.ObjectId,
            ref: 'Dialog',
            require: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        unread: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

export default model<IMessage>('Message', MessageSchema);

