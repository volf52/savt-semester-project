import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { removeRouteFromUser } from '../../actions/routeActions';
import { getShipName } from '../../actions/shipActions';

class RouteItem extends Component {
    constructor(props) {
        super(props);
        const shipName = '';
        this.state = {
            id: this.props.item._id,
            shipName,
        };
    }

    componentDidMount() {
        const st = this.state;
        st.shipName = this.findShipName(this.props.item.ship);
        this.setState(st);
    }

    handleRemClick = e => {
        e.preventDefault();
        this.props
            .removeRouteFromUser(this.state.id)
            .then(resp => {
                toast.success(resp.data.msg, {
                    position: toast.POSITION.TOP_CENTER,
                });
            })
            .catch(err => {
                toast.error("Removing route wasn't successful");
            });
    };

    findShipName = shipId => {
        const { shipList } = this.props;
        const ship = shipList.find(x => x._id === shipId);
        if (ship !== undefined) {
            return ship.name;
        } else {
            return 'Not found';
        }
        // this.props.getShipName(shipId);
        // .then(res => {
        //     return res.name;
        // })
        // .catch(err => {
        //     console.log(err);
        //     return 'Not found';
        // });
    };

    render() {
        const { headers, item } = this.props;
        const { shipName } = this.state;
        return (
            <tr key={item._id + ' row'}>
                <td key={item._id + ' ship'}>{shipName}</td>
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

RouteItem.propTypes = {
    removeRouteFromUser: PropTypes.func.isRequired,
    getShipName: PropTypes.func.isRequired,
};

const mapStatesToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStatesToProps,
    { removeRouteFromUser, getShipName }
)(RouteItem);
