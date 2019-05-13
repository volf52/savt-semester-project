import { Document, model, Schema } from 'mongoose';

export interface UserDoc extends Document {
    name: string;
    email: string;
    password: string;
    date: Date;
    ships: Array<string>;
    routes: Array<string>;
}

// Create the schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    ships: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ships',
        },
    ],
    routes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'routes',
        },
    ],
});

export const User = model<UserDoc>('users', UserSchema);
