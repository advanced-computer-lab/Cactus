import React from 'react'
import axios from "axios";


export const GetFlights = () => {
    const flights = [];

    axios.get("http://localhost:3000/findFlight")
        .then((result)=>{
            const flightData = result.data
            this.setState({ flights: flightData })
            console.log("Data fetched");
        })
        .catch((err)=>{
            console.log(err);
        })
    
    displayFlights = (flights) =>{
        if(!flights.lenght) return null;
        return flights.map((flight, index)=>{
            <div key={index}>
                <h2>{flight.flightNumber}</h2>
                <p>{flight.arrivalTime}</p>
                <p>{flight.departureTime}</p>
            </div>
        })
    }

    return (
        <div>
            {this.displayFlights(this.state.flights)}
        </div>
    )
}
