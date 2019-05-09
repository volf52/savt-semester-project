import React, { Component } from 'react';

export default class DTable extends Component {
    getTableHeader = head => {
        return head.map(item => {
            return <th>{item}</th>;
        });
    };

    getTableBody = (headers, data) => {
        return data.map((item, index) => {
            return (
                <tr key={index}>
                    {headers.map(header => {
                        return <td>{item[header]}</td>;
                    })}
                </tr>
            );
        });
    };

    render() {
        const { headers, data } = this.props;
        const thead = this.getTableHeader(headers);
        const tbody = this.getTableBody(headers, data);
        console.log(tbody);
        return (
            <div>
                <table className='highlight centered responsive-table z-depth-1'>
                    <thead>
                        <tr>{thead}</tr>
                    </thead>
                    <tbody>{tbody}</tbody>
                </table>
            </div>
        );
    }
}
