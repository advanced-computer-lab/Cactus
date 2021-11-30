import React, { useState } from 'react';
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios'
import AdminNavBar from '../../../Components/Admin/AdminNavBar'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Grid , FormControl} from '@mui/material';
import { useHistory } from 'react-router';

function AddFlight() {
    const history = useHistory();
    const [flightNum, setFlightNum] = useState();
    const [arrivalTime, setArrivalTime] = useState();
    const [arrivalDate, setArrivalDate] = useState();
    const [departureTime, setDepartureTime] = useState();
    const [departureDate, setDepartureDate] = useState();
    const [depCountry, setDeptCountry] = useState();
    const [desAirport, setdesAirport] = useState();
    const [desCountry, setDesCountry] = useState();
    const [depAirport, setdepAirport] = useState();
    const [economy, setEconomy] = useState('');
    const [business, setBusiness] = useState('');
    const [planeType, setPlaneType] = useState();
    const [priceEco, setPriceEco] = useState();
    const [priceBus, setPriceBus] = useState();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

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
    const DepCountryChange = (e) => {
        setDeptCountry(e.target.value)
    }
    const DesAirportChange = (e) => {
        setdesAirport(e.target.value)
    }
    const DesCountryChange = (e) => {
        setDesCountry(e.target.value)
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
        else{
            setEconomy(50)
            setBusiness(24)
        }
    }
    const PriceEcoChange = (e) =>{
        setPriceEco(e.target.value)
    }
    const PriceBusChange = (e) => {
        setPriceBus(e.target.value)
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
        businessSeats: business,
        depCountry: depCountry,
        destCountry: desCountry,
        planeType: planeType,
        economyPrice: priceEco,
        businessPrice: priceBus
    }
    
    const handleClick = (e) => {

        e.preventDefault()
        setLoading(true)
        axios.post('/Flight/addFlight', data)
            .then((response) => {
                setOpen(true);
                history.goBack();
                setLoading(false)
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
                                href="/FindFlight"
                            >
                                <SearchIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                View All Flights
                            </Link>
                            <Typography
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="secondary"
                            >
                                <AddCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                Add Flight
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
                                placeholder="Flight Number"
                                required
                                onChange={flightNumChange}
                                fullWidth
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
                                locale='sv-sv'
                                onChange={DepartureTimeChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Departure Date"
                                fullWidth
                                type="date"
                                onChange={DepartureDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
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
                                onChange={ArrivalTimeChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Arrival Date"
                                fullWidth
                                type="date"
                                onChange={ArrivalDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
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
                                onChange={DepCountryChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>

                            <TextField
                                id="outlined-textarea"
                                label="Destination Country"
                                fullWidth
                                placeholder="Destination Country"
                                onChange={DesCountryChange}
                                required
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
                                onChange={DepAirportChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>

                            <TextField
                                id="outlined-textarea"
                                label="Destination Airport"
                                fullWidth
                                placeholder="Destination Airport"
                                onChange={DesAirportChange}
                                required
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
                                name = "economy"
                                label="Number Of Economy Seats"
                                fullWidth
                                placeholder="Number Of Economy Seats"
                                type="number"
                                value={economy}
                                disabled
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="outlined-textarea"
                                name = "business"
                                label="Number Of Business Seats"
                                fullWidth
                                placeholder="Number Of Business Seats"
                                type="number"
                                value={business}
                                disabled
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
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
                                onChange={PriceEcoChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>

                            <TextField
                                id="outlined-textarea"
                                label="Business Ticket Price"
                                fullWidth
                                placeholder="Business Price"
                                onChange={PriceBusChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={4}>
                            <LoadingButton
                                color="secondary"
                                onClick={handleClick}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                                style={{ maxHeight: 'inherit' }}
                                fullWidth
                            >
                                Save
                            </LoadingButton>
                        </Grid>
                    </Grid>
                    <br />
                </Paper>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Flight Added Successfully!
                </Alert>
            </Snackbar>

        </div >
    )
}

export default AddFlight
