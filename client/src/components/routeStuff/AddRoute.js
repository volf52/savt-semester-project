import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { addRouteForUser } from '../../actions/routeActions';

class AddRoute extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitState();
    }

    getInitState = () => {
        return {
            fromLat: '',
            fromLng: '',
            toLat: '',
            toLng: '',
            shipId: '',
            errors: {},
        };
    };

    makeShipMenu = () => {};

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }

    handleShipSelect = selectedShip => {
        this.setState({ shipId: selectedShip.value });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { fromLat, fromLng, toLat, toLng, shipId } = this.state;
        const routeData = {
            fromLat,
            fromLng,
            toLat,
            toLng,
            shipId,
        };
        this.props
            .addRouteForUser(routeData)
            .then(res => {
                this.setState(this.getInitState());
                toast.success(res.data.msg, {
                    position: toast.POSITION.TOP_CENTER,
                });
            })
            .catch(err => {
                toast.error("Route couldn't be added");
            });
    };

    render() {
        let { errors } = this.state;

        const options = [
            { value: '5ccff8625bc6642ed4e811fc', label: 'ship2' },
            // { value: 'strawberry', label: 'Strawberry' },
            // { value: 'vanilla', label: 'Vanilla' },
        ];
        return (
            <div className='container'>
                <div style={{ marginTop: '4rem' }} className='row'>
                    <div className='col s10 offset-s1'>
                        <Link to='/routes' className='btn-flat waves-effect'>
                            <i className='material-icons left'>
                                keyboard_backspace
                            </i>{' '}
                            Back to Route List
                        </Link>
                        <div
                            className='col s12'
                            style={{ paddingLeft: '11.250px' }}>
                            <h4>Add Route</h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='input-field col s12'>
                                <Select
                                    value={this.state.shipID}
                                    onChange={this.handleShipSelect}
                                    options={options}
                                    placeholder='Select ship...'
                                />
                                <span className='red-text'>{errors.ship}</span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.fromLat}
                                    error={errors.fromLat}
                                    id='fromLat'
                                    type='text'
                                    className={classnames('', {
                                        invalid: errors.fromLat,
                                    })}
                                />
                                <label htmlFor='fromLat'>
                                    Depature Latitude
                                </label>
                                <span className='red-text'>
                                    {errors.fromLat}
                                </span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.fromLng}
                                    error={errors.fromLng}
                                    id='fromLng'
                                    type='text'
                                    className={classnames('', {
                                        invalid: errors.fromLng,
                                    })}
                                />
                                <label htmlFor='fromLng'>
                                    Departure Longitude
                                </label>
                                <span className='red-text'>
                                    {errors.fromLng}
                                </span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.toLat}
                                    error={errors.toLat}
                                    id='toLat'
                                    type='text'
                                    className={classnames('', {
                                        invalid: errors.toLat,
                                    })}
                                />
                                <label htmlFor='witoLatdth'>
                                    Arrival Latitude
                                </label>
                                <span className='red-text'>{errors.toLat}</span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.toLng}
                                    error={errors.toLng}
                                    id='toLng'
                                    type='text'
                                    className={classnames('', {
                                        invalid: errors.toLng,
                                    })}
                                />
                                <label htmlFor='toLng'>Arrival Longitude</label>
                                <span className='red-text'>{errors.toLng}</span>
                            </div>
                            <div
                                className='col s12'
                                style={{
                                    paddingLeft: '11.250px',
                                    marginTop: '10px',
                                    marginBottom: '20px',
                                }}>
                                <button
                                    style={{
                                        borderRadius: '3px',
                                        letterSpacing: '1.5px',
                                        marginTop: '1rem',
                                    }}
                                    type='submit'
                                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                                    Add Route
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AddRoute.propTypes = {
    addRouteForUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    shipR: PropTypes.object.isRequired,
};

const mapSateToProps = state => ({
    errors: state.errors,
    shipR: state.shipR,
});

export default connect(
    mapSateToProps,
    { addRouteForUser }
)(AddRoute);
