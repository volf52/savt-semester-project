import { Document, model, Schema } from 'mongoose';

export interface RoutingDoc extends Document {
    user: string;
    ship: Array<string>;
    departure: {
        lat: string;
        lng: string;
    };
    arrival: {
        lat: string;
        lng: string;
    };
    encodedGeoJson: string;
    geoURL: string;
    date: Date;
    total_length: string;
    seca_length: string;
    hra_length: string;
    arrivalUtc: string;
    durationHours: string;
}

const RouteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    ship: {
        type: Schema.Types.ObjectId,
        ref: 'ships',
    },
    departure: {
        lat: {
            type: String,
        },
        lng: {
            type: String,
        },
    },
    arrival: {
        lat: {
            type: String,
        },
        lng: {
            type: String,
        },
    },
    encodedGeoJson: {
        type: String,
    },
    geoURL: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    total_length: {
        type: String,
    },
    seca_length: {
        type: String,
    },
    hra_length: {
        type: String,
    },
    arrivalUtc: {
        type: String,
    },
    durationHours: {
        type: String,
    },
});

export const RouteObj = model<RoutingDoc>('routes', RouteSchema);
