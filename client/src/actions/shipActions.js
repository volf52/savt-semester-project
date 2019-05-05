import axios from 'axios';
import { GET_ERRORS, PRINT_SHIP_LIST, REMOVE_SHIP, ADD_SHIP } from './types';

export const getShipList = () => dispatch => {
    axios
        .get('/api/ships/getShipList')
        .then(res => {
            dispatch({
                type: PRINT_SHIP_LIST,
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

export const removeShipFromUser = shipId => dispatch => {
    axios
        .post('/api/ships/removeShip', { id: shipId })
        .then(res =>
            dispatch({
                type: REMOVE_SHIP,
                payload: { msg: res.data, shipId },
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

export const addShipForUser = shipData => dispatch => {
    axios
        .post('/api/ships/addShip', shipData)
        .then(res => {
            dispatch({
                type: ADD_SHIP,
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
