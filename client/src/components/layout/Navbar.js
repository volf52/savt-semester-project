import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navbar extends Component {
    render() {
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

                        <ul
                            id='nav-mobile'
                            className='right hide-on-med-and-down'>
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
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar;
