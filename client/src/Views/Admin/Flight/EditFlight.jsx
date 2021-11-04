import React, {useState} from 'react';
import { Container, Divider } from '@mui/material';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AdminNavBar from '../../../Components/Admin/AdminNavBar'
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import axios from 'axios';
import AddFlight from './AddFlight';
import FindFlight from './FindFlight';
import {useLocation} from "react-router-dom"

function EditFlight() {
    const location = useLocation()
    const flightData = location.state.detail
    console.log(flightData.id)
    const [arrivalTime, setArrivalTime] = useState(flightData.arrivalTime);
    const [arrivalDate, setArrivalDate] = useState(flightData.arrivalDate);
    const [departureTime, setDepartureTime] = useState(flightData.departureTime);
    const [departureDate, setDepartureDate] = useState(flightData.departureDate);
    const [desAirport, setdesAirport] = useState(flightData.destinationAirport);
    const [depAirport, setdepAirport] = useState(flightData.departureAirport);
    const [economy, setEconomy] = useState(flightData.economySeats);
    const [business, setBusiness] = useState(flightData.businessSeats);
    const [open, setOpen] = React.useState(false);


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
    const DepAirportChange = (e) => {
        setdepAirport(e.target.value)
    }
    const DesAirportChange = (e) => {
        setdesAirport(e.target.value)
    }
    const EconomyChange = (e) => {
        setEconomy(e.target.value)
    }
    const BusinessChange = (e) => {
        setBusiness(e.target.value)
    }
    

    const data = {
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        departureDate: departureDate,
        arrivalDate: arrivalDate,
        destinationAirport: desAirport,
        departureAirport: depAirport,
        economySeats: economy,
        businessSeats: business
    }
    const handleClick = (e) => {
        e.preventDefault()
        axios.put('/Flight/updateFlight/'+flightData.id, data)
            .then((response) => {
                setOpen(true);
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
        setOpen(true);
        
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    return (
        <div>
            <Container>
                <AdminNavBar />
                <br />
                <h1>Edit Flight Info</h1>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Flight Number"
                            fullWidth
                            placeholder="Flight Number"
                            value = {flightData.flightNumber}
                            disabled
                        />
                        <br />
                        <TextField
                            id="outlined-textarea"
                            label="Departure Time"
                            fullWidth
                            placeholder="Departure Time"
                            type="time"
                            value= {flightData.departureTime}
                            onChange = {DepartureTimeChange}
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Departure Date"
                            fullWidth
                            type="date"
                            value={flightData.departureDate}
                            onChange = {DepartureDateChange}
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Arrival Time"
                            fullWidth
                            placeholder="Arrival Time"
                            type="time"
                            value={flightData.arrivalTime}
                            onChange= {ArrivalTimeChange}
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Arrival Date"
                            fullWidth
                            type="date"
                            value={flightData.arrivalDate}
                            onChange= {ArrivalDateChange}
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Number Of Economy Seats"
                            fullWidth
                            placeholder="Number Of Economy Seats"
                            value={flightData.economySeats}
                            onChange={EconomyChange}
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Number Of Business Seats"
                            fullWidth
                            placeholder="Number Of Business Seats"
                            value={flightData.businessSeats}
                            onChange={BusinessChange}
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Departure Airport"
                            fullWidth
                            placeholder="Departure Airport"
                            value = {flightData.departureAirport}
                            onChange = {DepAirportChange}
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Destination Airport"
                            fullWidth
                            placeholder="Destination Airport"
                            value = {flightData.destinationAirport}
                            onChange= {DesAirportChange}
                        />
                    </div>
                </Box>
                <Divider/>
                <br/>
                <Button variant="contained" color="info" size="large" onClick={handleClick}>Save Changes</Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    Flight Has Been Edited Successfully!
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
}

export default EditFlight
