import React, { Component } from 'react';
import axios from 'axios';
import DataTable from '../Components/data-table'

export default class Flights extends Component {

    constructor(props) {
        super(props);
        this.state = { flightsCollection: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/findFlight')
            .then(res => {
                this.setState({ flightsCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    dataTable() {
        return this.state.flightsCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <div className="wrapper-Flights">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>Flight Number</td>
                                <td>Arrival Time</td>
                                <td>Departure Time</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}