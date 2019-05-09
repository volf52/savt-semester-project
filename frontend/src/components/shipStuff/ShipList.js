import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Spinner from '../common/Spinner';
import { getShipList } from '../../actions/shipActions';
import { capitalize } from '../../utils/capitalize';

import ShipItem from './ShipItem';

class ShipList extends Component {
    componentDidMount() {
        this.props.getShipList();
    }

    getTableHeader = head => {
        return head.map((item, index) => {
            return <th key={head + index}>{capitalize(item)}</th>;
        });
    };

    getTableBody = (headers, data) => {
        return data.map((item, index) => {
            return <ShipItem headers={headers} item={item} key={item._id} />;
        });
    };

    handleAddShipButton = e => {
        e.preventDefault();
        this.props.history.push('/addShip');
    };

    render() {
        const { shipList } = this.props.shipR;
        const headers = ['name', 'length', 'width', 'speed', 'draft'];
        let content;
        if (shipList === null) {
            // content = <Spinner />;
            content = <p>Wait</p>;
        } else {
            const thead = this.getTableHeader(headers);
            const tbody = this.getTableBody(headers, shipList);
            content = (
                <table className='highlight centered responsive-table z-depth-1'>
                    <thead>
                        <tr>
                            {thead}
                            <th>Remove</th>
                        </tr>
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
                <div className='col s12' style={{ paddingLeft: '11.250px' }}>
                    <button
                        style={{
                            width: '150px',
                            borderRadius: '3px',
                            letterSpacing: '1.5px',
                            marginTop: '1rem',
                        }}
                        onClick={this.handleAddShipButton}
                        className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                        Add Ship
                    </button>
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
