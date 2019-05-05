import React, { Component } from 'react';

export default class ShipItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.item._id,
        };
    }

    handleRemClick = e => {
        e.preventDefault();
        console.log(this.state.id);
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
