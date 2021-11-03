import React, { useState } from 'react';
import { Container, Divider } from '@mui/material';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import AdminNavBar from '../../../Components/Admin/AdminNavBar'
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

function AddFlight() {
    const [flightNum, setFlightNum] = useState();
    const [arrivalTime, setArrivalTime] = useState();
    const [arrivalDate, setArrivalDate] = useState();
    const [departureTime, setDepartureTime] = useState();
    const [departureDate, setDepartureDate] = useState();
    const [desAirport, setdesAirport] = useState();
    const [depAirport, setdepAirport] = useState();
    const [economy, setEconomy] = useState();
    const [business, setBusiness] = useState();
    const [open, setOpen] = React.useState(false);

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
        flightNumber: flightNum,
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
        axios.post('/Flight/addFlight', data)
            .then((response) => {
                setOpen(true);
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log(data)
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
                <br/>
                <h1>Add Flight Info</h1>
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
                            placeholder="Flight Number"
                            required
                            onChange={flightNumChange}
                        />
                        <br />
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
                            label="Departure Airport"
                            fullWidth
                            placeholder="Departure Airport"
                            onChange={DepAirportChange}
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Destination Airport"
                            fullWidth
                            placeholder="Destination Airport"
                            onChange={DesAirportChange}
                        />
                    </div>
                </Box>
                <Divider />
                <br/>
                <Button variant="contained" color="secondary" onClick={handleClick} size="large">Add Flight</Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Flight Added Successfully!
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
}

export default AddFlight
