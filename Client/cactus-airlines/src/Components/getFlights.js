import React, { Component } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'flightNumber', headerName: 'Flight Number', width: 130 }];

export class GetFlights extends Component {
    state = {
        flights: []
    }

    componentDidMount(){
        axios.get('http://localhost:3000/findFlight')
        .then(res =>{
            this.setState({flights: res.data});
            console.log(res);
        })
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.flights.map(flight => 
                    <li key={flight._id}>{flight.flightNumber}</li>)}
                </ul>
                {/* <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={this.state.flights} //add result of db here
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
                </div> */}
            </div>
        )
    }
}

export default GetFlights
