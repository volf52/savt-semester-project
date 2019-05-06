import axios from 'axios';
import {
    PRINT_ROUTE_LIST,
    REMOVE_ROUTE,
    ADD_ROUTE,
    GET_ERRORS,
} from '../actions/types';

export const getRouteList = () => dispatch => {
    axios
        .get('/api/routing/getRouteList')
        .then(res => {
            dispatch({
                type: PRINT_ROUTE_LIST,
                payload: res.data,
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

export const addRouteForUser = routeData => dispatch => {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/routing/getRoute', routeData)
            .then(resp => {
                dispatch({
                    type: ADD_ROUTE,
                    payload: resp.data,
                });
                resolve(resp);
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
                reject(err);
            });
    });
};

export const removeRouteFromUser = routeId => dispatch => {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/routing/removeRoute', { id: routeId })
            .then(res => {
                dispatch({
                    type: REMOVE_ROUTE,
                    payload: { msg: res.data, routeId },
                });
                resolve(res);
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
                reject(err);
            });
    });
};
