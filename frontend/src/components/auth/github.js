import React from 'react';
import queryString from 'query-string';
import Axios from 'axios';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setCurrentUser } from '../../actions/authActions';
import setAuthToken from '../../utils/setAuthToken';

const github = props => {
    const values = queryString.parse(props.location.search);
    console.log(values.code);
    Axios.get(`/social/github/callback?code=${values.code}`)
        .then(res => {
            console.log(res);
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            props.dispatch(setCurrentUser(decoded));
            props.history.push('/dashboard');
        })
        .catch(err => {
            console.error(err);
        });
    // const code = props.match ? props.match.params.code : '';
    return <div />;
};

export default connect()(github);
