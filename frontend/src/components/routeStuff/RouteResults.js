import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from 'is-empty';

class RouteResults extends Component {
    getResultContent = routeRes => {
        let res = [];
        let url = (
            <a href={routeRes.geoURL} target='_blank' rel='noopener noreferrer'>
                Click here to go to the map.
            </a>
        );
        res.push(
            <li className='collection-item' key='total_length'>
                <b>Total Length (Nautical miles):</b> {routeRes.total_length}
            </li>
        );
        res.push(
            <li className='collection-item' key='seca_length'>
                <b>SECA Length:</b> {routeRes.seca_length}{' '}
            </li>
        );
        res.push(
            <li className='collection-item' key='hra_length'>
                <b>HRA Length:</b> {routeRes.hra_length}{' '}
            </li>
        );
        res.push(
            <li className='collection-item' key='durationHours'>
                <b>Duration(hours):</b> {routeRes.durationHours}{' '}
            </li>
        );
        res.push(
            <li className='collection-item' key='arrivalUtc'>
                <b>Arrival Time(UTC):</b> {routeRes.arrivalUtc}
            </li>
        );
        res.push(
            <li className='collection-item' key='geoURL'>
                <b>Link to route map:</b> {url}{' '}
            </li>
        );

        return res;
    };

    handleAddRouteButton = e => {
        e.preventDefault();
        this.props.history.push('/addRoute');
    };

    render() {
        let content, button;
        const { currentRoute } = this.props.routeR;
        if (isEmpty(currentRoute)) {
            content = (
                <li className='collection-item'>
                    Click the button below to add a route or go{' '}
                    <Link to='/routes'>here</Link> to print one
                </li>
            );
            button = (
                <button
                    style={{
                        width: '150px',
                        borderRadius: '3px',
                        letterSpacing: '1.5px',
                        marginTop: '1rem',
                    }}
                    onClick={this.handleAddRouteButton}
                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                    Add Route
                </button>
            );
        } else {
            content = this.getResultContent(currentRoute);
        }
        return (
            <div className='container'>
                <div style={{ marginTop: '4rem' }} className='row'>
                    <div className='col s10 offset-s1'>
                        <ul className='highlight collection with-header z-depth-2'>
                            <li className='collection-header'>
                                <Link
                                    to='/routes'
                                    className='btn-flat waves-effect'>
                                    <i className='material-icons left'>
                                        keyboard_backspace
                                    </i>{' '}
                                    Route History
                                </Link>
                            </li>
                            <li className='collection-header'>
                                <h4>Result</h4>
                            </li>
                            {content}
                        </ul>
                    </div>
                </div>
                <div style={{ marginTop: '4rem' }} className='row'>
                    <div
                        className='col s12'
                        style={{ paddingLeft: '11.250px' }}>
                        {button}
                    </div>
                </div>
            </div>
        );
    }
}

RouteResults.propTypes = {
    errors: PropTypes.object.isRequired,
    routeR: PropTypes.object.isRequired,
};

const mapSateToProps = state => ({
    errors: state.errors,
    routeR: state.routeR,
});

export default connect(
    mapSateToProps,
    {}
)(RouteResults);
