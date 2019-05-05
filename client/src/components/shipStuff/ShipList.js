import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Spinner from '../common/Spinner';
import DTable from '../common/DTable';
import { getShipList } from '../../actions/shipActions';

class ShipList extends Component {
    componentDidMount() {
        this.props.getShipList();
    }

    render() {
        const { shipList } = this.props.shipR;
        let content;
        if (shipList === null) {
            content = <Spinner />;
        } else {
            content = (
                <DTable
                    headers={['name', 'length', 'width', 'speed', 'draft']}
                    data={shipList}
                />
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
