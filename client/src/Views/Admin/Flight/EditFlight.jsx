import React, { useState } from 'react';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import AdminNavBar from '../../../Components/Admin/AdminNavBar'
import Alert from '@mui/material/Alert';
import { Snackbar, Typography, Divider } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import { Grid, Paper, FormControl } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import {useLocation} from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router';

function EditFlight() {
    const history = useHistory()
    const location = useLocation()
    const flightData = location.state.detail
    console.log(flightData)
    const [arrivalTime, setArrivalTime] = useState(flightData.arrivalTime);
    const [arrivalDate, setArrivalDate] = useState(flightData.arrivalDate);
    const [departureTime, setDepartureTime] = useState(flightData.departureTime);
    const [departureDate, setDepartureDate] = useState(flightData.departureDate);
    const [depCountry, setDepCountry] = useState(flightData.depCountry);
    const [destCountry, setDestCountry] = useState(flightData.destCountry);
    const [planeType, setPlaneType] = useState(flightData.planeType);
    const [desAirport, setdesAirport] = useState(flightData.destinationAirport);
    const [depAirport, setdepAirport] = useState(flightData.departureAirport);
    const [economy, setEconomy] = useState(flightData.economySeats);
    const [priceEco, setPriceEco] = useState(flightData.economyPrice);
    const [business, setBusiness] = useState(flightData.businessSeats);
    const [priceBus, setPriceBus] = useState(flightData.businessPrice);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] =React.useState(false);

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
    const DepCountryChange = (e) => {
        setDepCountry(e.target.value)
    }
    const DestCountryChange = (e) => {
        setDestCountry(e.target.value)
    }
    const DepAirportChange = (e) => {
        setdepAirport(e.target.value)
    }
    const DesAirportChange = (e) => {
        setdesAirport(e.target.value)
    }
    const PlaneChange = (e) => {
        setPlaneType(e.target.value)
        if(e.target.value === "Small"){
            setEconomy(20)
            setBusiness(9)
        }
        else if(e.target.value === "Medium"){
            setEconomy(30)
            setBusiness(15)
        }
        else if(e.target.value === "Large"){
            setEconomy(50)
            setBusiness(24)
        }
        else{
            setEconomy('')
            setBusiness('')
        }
    }
    const EcoPriceChange = (e) => {
        setPriceEco(e.target.value)
    }
    const BusPriceChange = (e) => {
        setPriceBus(e.target.value)
    }
    const data = {
        flightNumber: flightData.flightNumber,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        departureDate: departureDate,
        arrivalDate: arrivalDate,
        destinationAirport: desAirport,
        departureAirport: depAirport,
        economySeats: economy,
        businessSeats: business,
        destCountry: destCountry,
        depCountry: depCountry,
        economyPrice: priceEco,
        businessPrice: priceBus,
        planeType: planeType,
        economyMap: flightData.economyMap,
        businessMap: flightData.businessMap
    }
    const handleClick = (e) => {
        e.preventDefault()
        setLoading(true);
        console.log(data)
        axios.put('/Flight/updateFlight/'+flightData.id, data)
            .then((response) => {
                setOpen(true);
                setLoading(false);
                history.goBack();
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setLoading(false)
            return;
        }
        setLoading(false)
        setOpen(false);
    };
    return (
        <div>
            <AdminNavBar />
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <br />
                <Paper
                    elevation={3}
                    variant="outlined"
                    square
                    style={{ borderRadius: '2rem' }}>
                    <br />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            marginLeft: '25px',
                            marginBottom: '10px'
                        }}
                    >
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                href="/adminHome"
                            >
                                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                Home
                            </Link>
                            <Link
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                href="/AddFlight"
                            >
                                <AddCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                Add Flight
                            </Link>
                            <Link
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                href="/FindFlight"
                            >
                                <SearchIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                View All Flights
                            </Link>
                            <Typography
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="secondary"
                            >
                                <EditIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                Edit Flight
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                    <Divider variant="middle" />
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Flight Number"
                                fullWidth
                                placeholder="Flight Number"
                                value = {flightData.flightNumber}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Departure Time"
                                fullWidth
                                placeholder="Departure Time"
                                type="time"
                                defaultValue= {flightData.departureTime}
                                onChange = {DepartureTimeChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Departure Date"
                                fullWidth
                                type="date"
                                defaultValue={flightData.departureDate}
                                onChange = {DepartureDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Arrival Time"
                                fullWidth
                                placeholder="Arrival Time"
                                type="time"
                                defaultValue={flightData.arrivalTime}
                                onChange= {ArrivalTimeChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Arrival Date"
                                fullWidth
                                type="date"
                                defaultValue={flightData.arrivalDate}
                                onChange= {ArrivalDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                        <FormControl sm={{ m: 1 }} fullWidth>
                             <InputLabel id="demo-simple-select-helper-label">Plane</InputLabel>
                             <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={planeType}
                                label="Plane Type"
                                onChange={PlaneChange}
                                required 
                             >
                                    <MenuItem value="">
                                     <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Small">Small</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Large">Large</MenuItem>
                                    </Select>
                                    </FormControl>
                                               
                        </Grid> 
                        <Grid item xs={2}>
                            <TextField
                                id="outlined-textarea"
                                label="Number Of Economy Seats"
                                fullWidth
                                placeholder="Number Of Economy Seats"
                                value={economy}
                                disabled
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="outlined-textarea"
                                label="Number Of Business Seats"
                                fullWidth
                                placeholder="Number Of Business Seats"
                                value={business} 
                                disabled
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Economy Ticket Price"
                                fullWidth
                                placeholder="Economy Price"
                                value = {priceEco}
                                onChange = {EcoPriceChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Business Ticket Price"
                                fullWidth
                                placeholder="Business Price"
                                value = {priceBus}
                                onChange= {BusPriceChange}
                            />

                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Departure Country"
                                fullWidth
                                placeholder="Departure Country"
                                value = {depCountry}
                                onChange = {DepCountryChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Destination Country"
                                fullWidth
                                placeholder="Destination Country"
                                value = { destCountry}
                                onChange= {DestCountryChange}
                            />

                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Departure Airport"
                                fullWidth
                                placeholder="Departure Airport"
                                defaultValue = {flightData.departureAirport}
                                onChange = {DepAirportChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Destination Airport"
                                fullWidth
                                placeholder="Destination Airport"
                                defaultValue = {flightData.destinationAirport}
                                onChange= {DesAirportChange}
                            />

                        </Grid>
                        
                        <Grid item xs={2}></Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={4}>
                            <LoadingButton
                                color="info"
                                onClick={handleClick}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                                style={{ maxHeight: 'inherit' }}
                                fullWidth
                            >
                                Save Changes
                            </LoadingButton>
                        </Grid>
                    </Grid>
                    <br />
                </Paper>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    Flight Has Been Edited Successfully!
                </Alert>
            </Snackbar>
        </div >
    )
}

export default EditFlight
