import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import { capitalize } from '../../utils/capitalize';
import { getRouteList } from '../../actions/routeActions';
import { getShipList } from '../../actions/shipActions';

import RouteItem from './RouteItem';

class RouteList extends Component {
    componentDidMount() {
        this.props.getRouteList();
        // if(this.props.shipR.shipList.length === 0)
        this.props.getShipList();
    }

    getTableHeader = head => {
        return head.map((item, index) => {
            return <th key={head + index}>{capitalize(item)}</th>;
        });
    };

    getTableBody = (headers, data) => {
        const { shipList } = this.props.shipR;
        return data.map((item, index) => {
            return (
                <RouteItem
                    headers={headers}
                    item={item}
                    key={item._id}
                    shipList={shipList}
                />
            );
        });
    };

    handleAddRouteButton = e => {
        e.preventDefault();
        this.props.history.push('/addRoute');
    };

    render() {
        const { routeList } = this.props.routeR;
        const headers = [
            'total_length',
            'seca_length',
            'hra_length',
            'arrivalUtc',
            'durationHours',
            'date',
        ];
        let content;
        if (routeList === null) {
            content = <Spinner />;
        } else {
            const thead = this.getTableHeader(headers);
            const tbody = this.getTableBody(headers, routeList);
            content = (
                <table className='highlight centered responsive-table z-depth-1'>
                    <thead>
                        <tr>
                            <th>Ship Name</th>
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
                        onClick={this.handleAddRouteButton}
                        className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                        Add Route
                    </button>
                </div>
            </div>
        );
    }
}

RouteList.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    routeR: PropTypes.object.isRequired,
    shipR: PropTypes.object.isRequired,
    getRouteList: PropTypes.func.isRequired,
    getShipList: PropTypes.func.isRequired,
};

const mapSateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    routeR: state.routeR,
    shipR: state.shipR,
});

export default connect(
    mapSateToProps,
    { getRouteList, getShipList }
)(RouteList);
