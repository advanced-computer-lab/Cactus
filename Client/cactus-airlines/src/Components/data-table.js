import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.flightNumber}
                </td>
                <td>
                    {this.props.obj.arrivalTime}
                </td>
                <td>
                    {this.props.obj.departureTime}
                </td>
            </tr>
        );
    }
}

export default DataTable;