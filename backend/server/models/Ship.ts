import { Document, model, Schema } from 'mongoose';

export interface ShipDoc extends Document {
    name: string;
    length: string;
    width: string;
    speed: string;
    draft: string;
    owner: string;
}

const ShipSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    length: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        required: true,
    },
    speed: {
        type: String,
        required: true,
    },
    draft: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

export const Ship = model<ShipDoc>('ships', ShipSchema);
