import * as React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';


export default function FlightTable() {
  const [flights,SetFlights] = useState([]);

    useEffect(()=>{
        const fetchFlights = async () =>{
            const response = await axios.get("/Flight/findFlight")
            SetFlights(response.data)
        };
        fetchFlights();
    },[flights])

  return (
    <React.Fragment>
      <Title>Available Flights</Title>
      <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell>Flight #</TableCell>
            <TableCell>Arrival Date</TableCell>
            <TableCell>Arrival Time</TableCell>
            <TableCell>Departure Date</TableCell>
            <TableCell>Departure Time</TableCell>
            <TableCell>Economy Seats</TableCell>
            <TableCell>Business Seats</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight._id}>
              <TableCell>{flight.flightNumber}</TableCell>
              <TableCell>{flight.arrivalDate}</TableCell>
              <TableCell>{flight.arrivalTime}</TableCell>
              <TableCell>{flight.departureDate}</TableCell>
              <TableCell>{flight.departureTime}</TableCell>
              <TableCell>{flight.economySeats}</TableCell>
              <TableCell>{flight.businessSeats}</TableCell>
              <TableCell>{flight.departureAirport}</TableCell>
              <TableCell>{flight.destinationAirport}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/FindFlight" sx={{ mt: 3 }}>
        See All Flights
      </Link>
    </React.Fragment>
  );
}
