import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { toast } from 'react-toastify';

import { addShipForUser } from '../../actions/shipActions';

class AddShip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            length: '',
            width: '',
            speed: '',
            draft: '',
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, length, width, speed, draft } = this.state;
        const shipData = {
            name,
            length,
            width,
            speed,
            draft,
        };

        this.props.addShipForUser(shipData);
        toast.success('Ship added successfuly', {
            position: toast.POSITION.TOP_CENTER,
        });
        // this.props.history.push('/ships');
    };

    render() {
        const { errors } = this.state;
        return (
            <div className='container'>
                <div style={{ marginTop: '4rem' }} className='row'>
                    <div className='col s8 offset-s2'>
                        <Link to='/ships' className='btn-flat waves-effect'>
                            <i className='material-icons left'>
                                keyboard_backspace
                            </i>{' '}
                            Back to Ship List
                        </Link>
                        <div
                            className='col s12'
                            style={{ paddingLeft: '11.250px' }}>
                            <h4>Add Ship</h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id='name'
                                    type='text'
                                    className={classnames('', {
                                        invalid: errors.name,
                                    })}
                                />
                                <label htmlFor='name'>Name</label>
                                <span className='red-text'>{errors.name}</span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.length}
                                    error={errors.length}
                                    id='length'
                                    type='text'
                                    className={classnames('', {
                                        invalid: errors.length,
                                    })}
                                />
                                <label htmlFor='length'>Length</label>
                                <span className='red-text'>
                                    {errors.length}
                                </span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.width}
                                    error={errors.width}
                                    id='width'
                                    type='text'
                                    className={classnames('', {
                                        invalid: errors.width,
                                    })}
                                />
                                <label htmlFor='width'>Width</label>
                                <span className='red-text'>{errors.width}</span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.speed}
                                    error={errors.speed}
                                    id='speed'
                                    type='text'
                                    className={classnames('', {
                                        invalid: errors.speed,
                                    })}
                                />
                                <label htmlFor='speed'>Speed</label>
                                <span className='red-text'>{errors.speed}</span>
                            </div>
                            <div className='input-field col s12'>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.draft}
                                    error={errors.draft}
                                    id='draft'
                                    type='text'
                                    className={classnames('', {
                                        invalid: errors.draft,
                                    })}
                                />
                                <label htmlFor='draft'>Draft</label>
                                <span className='red-text'>{errors.draft}</span>
                            </div>
                            <div
                                className='col s12'
                                style={{ paddingLeft: '11.250px' }}>
                                <button
                                    style={{
                                        width: '150px',
                                        borderRadius: '3px',
                                        letterSpacing: '1.5px',
                                        marginTop: '1rem',
                                    }}
                                    type='submit'
                                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                                    Add Ship
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AddShip.propTypes = {
    addShipForUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapSateToProps = state => ({
    errors: state.errors,
});

export default connect(
    mapSateToProps,
    { addShipForUser }
)(AddShip);
