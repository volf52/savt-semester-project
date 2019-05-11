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

// export const getShipName = shipId => dispatch => {
//     axios
//         .get('/api/ships/getShipName', { shipId })
//         .then(res => {
//             console.log(res.data);
//             dispatch({
//                 type: GET_SHIP_NAME,
//                 payload: res.data,
//             });
//             // resolve(res);
//         })
//         .catch(err => {
//             console.log(err);
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data,
//             });
//             // reject(err);
//         });
// };

export const getShipName = shipId => dispatch => {
    // console.log({ shipId });
    axios
        .get('/api/ships/getShipName', { shipId })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
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
    return new Promise((resolve, reject) => {
        axios
            .post('/api/ships/addShip', shipData)
            .then(resp => {
                dispatch({
                    type: ADD_SHIP,
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
