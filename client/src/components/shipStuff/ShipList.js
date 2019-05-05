import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import classnames from 'classnames';

import Spinner from '../common/Spinner';
import { getShipList } from '../../actions/shipActions';

import ShipItem from './ShipItem';

class ShipList extends Component {
    componentDidMount() {
        this.props.getShipList();
    }

    getTableHeader = head => {
        return head.map((item, index) => {
            return <th key={head + index}>{item}</th>;
        });
    };

    getTableBody = (headers, data) => {
        return data.map((item, index) => {
            return <ShipItem headers={headers} item={item} key={item._id} />;
        });
    };

    render() {
        const { shipList } = this.props.shipR;
        const headers = ['name', 'length', 'width', 'speed', 'draft'];
        let content;
        if (shipList === null) {
            content = <Spinner />;
        } else {
            const thead = this.getTableHeader(headers);
            const tbody = this.getTableBody(headers, shipList);
            content = (
                <table className='highlight centered responsive-table z-depth-1'>
                    <thead>
                        <tr>{thead}</tr>
                    </thead>
                    <tbody>{tbody}</tbody>
                </table>
            );
        }
        return (
            <div className='container'>
                <div style={{ marginTop: '4rem' }} className='row'>
                    <div className='col s12'>{content}</div>
                </div>
            </div>
        );
    }
}

ShipList.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    shipR: PropTypes.object.isRequired,
    getShipList: PropTypes.func.isRequired,
};

const mapSateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    shipR: state.shipR,
});

export default connect(
    mapSateToProps,
    { getShipList }
)(ShipList);
