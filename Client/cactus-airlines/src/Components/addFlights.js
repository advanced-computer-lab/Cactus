import React, { Component } from 'react'
import axios from 'axios'

 
export class AddFlights extends Component {

    state = {
        flightNumber: ''
        // ,
        // arrivalTime: '',
        // arrivalDate: new Date,
        // departureTime: '',
        // departureDate: new Date,
        // airport:'',
        // economySeats: 0,
        // businessSeats: 0,
    }
    handleChange = event =>{
        this.setState({
            flightNumber: event.target.value
        });
    }
    handleSubmit = event =>{
        event.preventDefault();
        const flight = {
            flightNumber: this.state.flightNumber
            // ,
            // arrivalTime:  this.state.arrivalTime,
            // arrivalDate:  this.state.arrivalDate,
            // departureDate:  this.state.departureDate,
            // departureTime:  this.state.departureTime,
            // airport: this.state.airport,
            // economySeats: this.state.economySeats,
            // businessSeats: this.state.businessSeats
        }
        axios.post('http://localhost:3000/findFlight',{flight})
        .then(res =>{
            console.log(res);
            console.log(res.data);
        })
    }
    
    render(){
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        FlightNumber:
                        <input type="text" name="fightNumber" onChange={this.handleChange}/>
                    </label>
                    <button type="submit">add</button>
                </form>
            </>
        );
    }


}

export default AddFlights
