import {Schema, model} from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const UserSchema = new Schema({
        email: {
            type: String,
            required: 'Email address is required',
            validate: [isEmail, 'Invalid email'],
            unique: true
        },
        fullName: {
            type: String,
            required: 'FullName address is required'
        },
        password: {
            type: String,
            required: 'Password is required'
        },
        confirmed: {
            type: Boolean,
            default: false
        },
        avatar: String,
        confirm_hash: String,
        last_seen: Date
    },
    {
        timestamps: true
    }
);

export default model('User', UserSchema);
