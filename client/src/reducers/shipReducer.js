import { PRINT_SHIP_LIST } from '../actions/types';

const initialState = {
    shipList: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PRINT_SHIP_LIST:
            return {
                ...state,
                shipList: action.payload,
            };
        default:
            return state;
    }
}
