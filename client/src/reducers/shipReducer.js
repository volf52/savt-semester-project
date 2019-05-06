import {
    PRINT_SHIP_LIST,
    REMOVE_SHIP,
    ADD_SHIP,
    GET_SHIP_NAME,
} from '../actions/types';

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
        case REMOVE_SHIP:
            return {
                ...state,
                shipList: state.shipList.filter(
                    ship => ship._id !== action.payload.shipId
                ),
            };
        case ADD_SHIP:
            return state;
        case GET_SHIP_NAME:
            return state;
        default:
            return state;
    }
}
