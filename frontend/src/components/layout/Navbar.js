import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { isAuthenticated } = this.props.auth;

        const guestLinks = (
            <ul id='nav-mobile' className='right hide-on-med-and-down'>
                <li>
                    <Link to='/login' className='black-text'>
                        Login
                    </Link>
                </li>
                <li>
                    <Link className='black-text' to='/register'>
                        Register
                    </Link>
                </li>
            </ul>
        );

        const authLinks = (
            <ul id='nav-mobile' className='right hide-on-med-and-down'>
                <li>
                    <Link
                        className='black-text'
                        onClick={this.onLogoutClick}
                        to='/'>
                        Logout
                    </Link>
                </li>
                <li>
                    <Link to='/ships' className='black-text'>
                        Ships
                    </Link>
                </li>
                <li>
                    <Link to='/routes' className='black-text'>
                        Routes
                    </Link>
                </li>
                {/* <li>
                    <Link to='/currentRoute' className='black-text'>
                        Current Route
                    </Link>
                </li> */}
            </ul>
        );

        return (
            <div className='navbar-fixed'>
                <nav className='z-depth-0'>
                    <div className='nav-wrapper white'>
                        <Link
                            to='/'
                            style={{
                                fontFamily: 'monospace',
                            }}
                            className='brand-logo center black-text'>
                            <i className='material-icons'>code</i>
                            Ship Routing and Management
                        </Link>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStatesToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStatesToProps,
    { logoutUser }
)(Navbar);
