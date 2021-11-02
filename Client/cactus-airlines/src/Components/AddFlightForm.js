import React,{Component, useRef, useState} from 'react';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import { Container, dividerClasses } from '@mui/material';
import { Box } from '@mui/system';
import  TextField  from '@mui/material/TextField';
import  Button from '@mui/material/Button'; 
import axios from 'axios';

export function AddFlightForm() {
   const [flightNum, setFlightNum] = useState();
   const [arrivalTime, setArrivalTime] = useState();
   const [arrivalDate, setArrivalDate] = useState();
   const [departureTime, setDepartureTime] = useState();
   const [departureDate, setDepartureDate] = useState();
   const [airport, setAirport] = useState();
   const [economy, setEconomy] = useState();
   const [business, setBusiness] = useState();
   
    const flightNumChange = (e) => {
    setFlightNum(e.target.value)
    }
    const ArrivalTimeChange = (e) => {
      setArrivalTime(e.target.value)
    }
    const DepartureTimeChange = (e) => {
      setDepartureTime(e.target.value)
    }
    const ArrivalDateChange = (e) => {
      setArrivalDate(e.target.value)
    }
    const DepartureDateChange = (e) => {
      setDepartureDate(e.target.value)
    }
    const AirportChange = (e) => {
      setAirport(e.target.value)
    }
    const EconomyChange = (e) => {
      setEconomy(e.target.value)
    }
    const BusinessChange = (e) => {
      setBusiness(e.target.value)
    }
  const data = {
    flightNumber: flightNum,
    departureTime: departureTime,
    arrivalTime: arrivalTime,
    departureDate: departureDate,
    arrivalDate: arrivalDate,
    airport: airport,
    economySeats: economy,
    businessSeats: business
  }
   const handleClick = (e) =>{
     e.preventDefault()
     axios.post('/addFlight',data)
      .then((response)=>{
        console.log(response)
      })
      .catch((err)=>{
        console.log(err)
      })
      console.log(data)
   }
    return (
      <Container>
          <h1>Add Flight Info</h1>
          <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '50%' },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        id="outlined-multiline-flexible"
        label="Flight Number"
        //Can Added Pre added value with Value Attribute
        fullWidth
        placeholder="Flight Number"
        required
        onChange={flightNumChange}
      />
      <TextField
        id="outlined-textarea"
        label="Departure Time"
        fullWidth
        placeholder="Departure Time"
        type="time"
        onChange={DepartureTimeChange}
      />
      <TextField
        id="outlined-textarea"
        label="Departure Date"
        fullWidth
        type="date"
        onChange={DepartureDateChange}
      />
      <TextField
        id="outlined-textarea"
        label="Arrival Time"
        fullWidth
        placeholder="Arrival Time"
        type="time"
        onChange={ArrivalTimeChange}
      />

      <TextField
        id="outlined-textarea"
        label="Arrival Date"
        fullWidth
        type="date"
        onChange={ArrivalDateChange}
      />
      <TextField
        id="outlined-textarea"
        label="Number Of Economy Seats"
        fullWidth
        placeholder="Number Of Economy Seats"
        onChange={EconomyChange}
      />
      <TextField
        id="outlined-textarea"
        label="Number Of Business Seats"
        fullWidth
        placeholder="Number Of Business Seats"
        onChange={BusinessChange}
      />
      <TextField
        id="outlined-textarea"
        label="Airport"
        fullWidth
        placeholder="Airport"
        onChange={AirportChange}
      />

      
      
    </div>
    
    <Button variant="contained" color="primary" onClick={handleClick}>Add Flight</Button>
    
  </Box>
      </Container>
      );

 }
 export default AddFlightForm;