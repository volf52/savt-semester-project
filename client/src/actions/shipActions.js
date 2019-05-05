import axios from 'axios';
import { GET_ERRORS, PRINT_SHIP_LIST } from './types';

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
