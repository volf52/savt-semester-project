import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div
                style={{ height: '75vh' }}
                className='container valign-wrapper'>
                <div className='row'>
                    <div className='col s12 center-align'>
                        <h4>
                            <b>Hello</b>{' '}
                        </h4>
                        <p className='flow-text grey-text text-darken-1'>
                            <b>Welcome to Camorr</b>
                        </p>
                        <br />
                        <Link
                            to='/register'
                            style={{
                                width: '150px',
                                borderRadius: '3px',
                                letterSpacing: '1.5px',
                            }}
                            className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                            Register
                        </Link>
                        <Link
                            to='/login'
                            style={{
                                marginLeft: '2rem',
                                width: '150px',
                                borderRadius: '3px',
                                letterSpacing: '1.5px',
                            }}
                            className='btn btn-large waves-effect white hoverable black-text'>
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStatesToProps = state => ({
    auth: state.auth,
});

export default connect(mapStatesToProps)(Landing);
