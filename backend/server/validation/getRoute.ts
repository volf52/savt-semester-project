import isEmpty from 'is-empty';
import Validator from 'validator';

export type AddRouteData = {
    fromLat: string;
    fromLng: string;
    toLat: string;
    toLng: string;
    shipId: string;
};

export const validateCoordInput = (data: AddRouteData) => {
    let errors = <AddRouteData>{};

    data.fromLat = !isEmpty(data.fromLat) ? data.fromLat : '';
    data.fromLng = !isEmpty(data.fromLng) ? data.fromLng : '';
    data.toLat = !isEmpty(data.toLat) ? data.toLat : '';
    data.toLng = !isEmpty(data.toLng) ? data.toLng : '';
    data.shipId = !isEmpty(data.shipId) ? data.shipId : '';

    if (Validator.isEmpty(data.shipId)) {
        errors.shipId = 'Ship is required for a journey through the sea';
    }

    if (Validator.isEmpty(data.fromLat)) {
        errors.fromLat = 'Departure Latitude is required';
    } else if (!Validator.isNumeric(data.fromLat, { no_symbols: false })) {
        errors.fromLat = 'Departure Latitude must be a number';
    }

    if (Validator.isEmpty(data.fromLng)) {
        errors.fromLng = 'Departure Longitude is required';
    } else if (!Validator.isNumeric(data.fromLng, { no_symbols: false })) {
        errors.fromLng = 'Departure Longitude must be a number';
    }

    if (Validator.isEmpty(data.toLat)) {
        errors.toLat = 'Arrival Latitude is required';
    } else if (!Validator.isNumeric(data.toLat, { no_symbols: false })) {
        errors.toLat = 'Arrival Latitude must be a number';
    }

    if (Validator.isEmpty(data.toLng)) {
        errors.toLng = 'Arrival Longitude is required';
    } else if (!Validator.isNumeric(data.toLng, { no_symbols: false })) {
        errors.toLng = 'Arrival Longitude must be a number';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
