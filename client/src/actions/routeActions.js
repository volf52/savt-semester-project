import axios from 'axios';
import {
    PRINT_ROUTE_LIST,
    REMOVE_ROUTE,
    ADD_ROUTE,
    VALIDATE_ROUTE,
    GET_ERRORS,
} from '../actions/types';

// NOTE working
export const getRouteList = () => dispatch => {
    axios
        .get('/api/routing/getRouteList')
        .then(res => {
            dispatch({
                type: PRINT_ROUTE_LIST,
                payload: res.data,
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            });
        });
};

// NOTE working
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
                let ret = err.response;
                if (ret !== undefined) {
                    ret = ret.data;
                } else {
                    ret = { msg: 'Invalid Inputs' };
                }
                dispatch({
                    type: GET_ERRORS,
                    payload: ret,
                });
                reject(err);
            });
    });
};

// NOTE working
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
                console.log(err);
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                });
                reject(err);
            });
    });
};

export const validateCoordinates = routeData => dispatch => {
    return new Promise((resolve, reject) => {
        axios
            .post('/api/routing/validate', routeData)
            .then(res => {
                dispatch({
                    type: VALIDATE_ROUTE,
                    payload: { msg: res.data },
                });
                resolve(res);
            })
            .catch(err => {
                console.log(err);
                let ret;
                if (err.response !== undefined) {
                    ret = err.response.data;
                } else {
                    ret = { msg: 'Invalid coords' };
                }
                dispatch({
                    type: GET_ERRORS,
                    payload: ret,
                });
                reject(err);
            });
    });
};
