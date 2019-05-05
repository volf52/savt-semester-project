import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeShipFromUser } from '../../actions/shipActions';

class ShipItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.item._id,
        };
    }

    handleRemClick = e => {
        e.preventDefault();
        console.log(this.state.id);
        this.props.removeShipFromUser(this.state.id);
    };

    render() {
        const { headers, item } = this.props;
        return (
            <tr key={item._id + ' row'}>
                {headers.map(header => {
                    return (
                        <td key={item._id + ' ' + header}>{item[header]}</td>
                    );
                })}
                <td>
                    <button
                        className='btn-floating'
                        onClick={this.handleRemClick}>
                        <i className='material-icons red'>remove</i>
                    </button>
                </td>
            </tr>
        );
    }
}

ShipItem.propTypes = {
    removeShipFromUser: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
};

const mapStatesToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStatesToProps,
    { removeShipFromUser }
)(ShipItem);
