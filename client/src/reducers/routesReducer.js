import { PRINT_ROUTE_LIST, REMOVE_ROUTE, ADD_ROUTE } from '../actions/types';

const initialState = {
    routeList: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case PRINT_ROUTE_LIST:
            return {
                ...state,
                routeList: action.payload,
            };
        case REMOVE_ROUTE:
            return {
                ...state,
                routeList: state.routeList.filter(
                    route => route._id !== action.payload.routeId
                ),
            };
        case ADD_ROUTE:
            return state;
        default:
            return state;
    }
}
