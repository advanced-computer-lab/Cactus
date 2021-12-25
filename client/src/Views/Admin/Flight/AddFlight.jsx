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
import { Snackbar, FormHelperText } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, FormControl } from '@mui/material';
import { useHistory } from 'react-router';

function AddFlight() {
    const history = useHistory();
    const [flightNum, setFlightNum] = useState("");
    const [flightNumVal, setFlightNumVal] = useState({ error: false, message: "" })
    const [arrivalTime, setArrivalTime] = useState("");
    const [arrivalTimeVal, setArrivalTimeVal] = useState({ error: false, message: "" })
    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalDateVal, setArrivalDateVal] = useState({ error: false, message: "" })
    const [departureTime, setDepartureTime] = useState("");
    const [departureTimeVal, setDepartureTimeVal] = useState({ error: false, message: "" })
    const [departureDate, setDepartureDate] = useState("");
    const [departureDateVal, setDepartureDateVal] = useState({ error: false, message: "" })
    const [depCountry, setDeptCountry] = useState("");
    const [depCountryVal, setDepCountryVal] = useState({ error: false, message: "" })
    const [desAirport, setdesAirport] = useState("");
    const [desAirportVal, setDesAirportVal] = useState({ error: false, message: "" })
    const [desCountry, setDesCountry] = useState("");
    const [desCountryVal, setDesCountryVal] = useState({ error: false, message: "" })
    const [depAirport, setdepAirport] = useState("");
    const [depAirportVal, setDepAirportVal] = useState({ error: false, message: "" })
    const [economy, setEconomy] = useState('');
    const [business, setBusiness] = useState('');
    const [planeType, setPlaneType] = useState("None");
    const [planeTypeVal, setPlaneTypeVal] = useState({ error: false, message: "" })
    const [priceEco, setPriceEco] = useState("");
    const [priceEcoVal, setPriceEcoVal] = useState({ error: false, message: "" })
    const [priceBus, setPriceBus] = useState("");
    const [priceBusVal, setPriceBusVal] = useState({ error: false, message: "" })
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const flightNumChange = (e) => {
        setFlightNum(e.target.value)
        if (e.target.value === "") {
            setFlightNumVal({ error: true, message: "This Field is Required" })
        }
        else {
            setFlightNumVal({ error: false, message: "" })
        }
    }
    const ArrivalTimeChange = (e) => {
        setArrivalTime(e.target.value)
        if (e.target.value === "") {
            setArrivalTimeVal({ error: true, message: "This Field is Required" })
        }
        else {
            setArrivalTimeVal({ error: false, message: "" })
        }
    }
    const DepartureTimeChange = (e) => {
        setDepartureTime(e.target.value)
        if (e.target.value === "") {
            setDepartureTimeVal({ error: true, message: "This Field is Required" })
        }
        else {
            setDepartureTimeVal({ error: false, message: "" })
        }
    }
    const ArrivalDateChange = (e) => {
        setArrivalDate(e.target.value)
        if (e.target.value === "") {
            setArrivalDateVal({ error: true, message: "This Field is Required" })
        }
        else {
            setArrivalDateVal({ error: false, message: "" })
        }
    }
    const DepartureDateChange = (e) => {
        setDepartureDate(e.target.value)
        if (e.target.value === "") {
            setDepartureDateVal({ error: true, message: "This Field is Required" })
        }
        else {
            setDepartureDateVal({ error: false, message: "" })
        }
    }
    const DepAirportChange = (e) => {
        setdepAirport(e.target.value)
        if (e.target.value === "") {
            setDepAirportVal({ error: true, message: "This Field is Required" })
        }
        else {
            setDepAirportVal({ error: false, message: "" })
        }
    }
    const DepCountryChange = (e) => {
        setDeptCountry(e.target.value)
        if (e.target.value === "") {
            setDepCountryVal({ error: true, message: "This Field is Required" })
        }
        else {
            setDepCountryVal({ error: false, message: "" })
        }
    }
    const DesAirportChange = (e) => {
        setdesAirport(e.target.value)
        if (e.target.value === "") {
            setDesAirportVal({ error: true, message: "This Field is Required" })
        }
        else {
            setDesAirportVal({ error: false, message: "" })
        }
    }
    const DesCountryChange = (e) => {
        setDesCountry(e.target.value)
        if (e.target.value === "") {
            setDesCountryVal({ error: true, message: "This Field is Required" })
        }
        else {
            setDesCountryVal({ error: false, message: "" })
        }
    }
    const PlaneChange = (e) => {
        setPlaneType(e.target.value)
        if (e.target.value == "None") {
            setPlaneTypeVal({ error: true, message: "This Field is Required" })
        }
        else {
            setPlaneTypeVal({ error: false, message: "" })
        }
        if (e.target.value === "Small") {
            setEconomy(20)
            setBusiness(9)
        }
        else if (e.target.value === "Medium") {
            setEconomy(30)
            setBusiness(15)
        }
        else if (e.target.value === "Large") {
            setEconomy(50)
            setBusiness(24)
        }
        else {
            setEconomy('')
            setBusiness('')
        }
    }
    const PriceEcoChange = (e) => {
        setPriceEco(e.target.value)
        if (e.target.value === "") {
            setPriceEcoVal({ error: true, message: "This Field is required" })
        }
        else {
            setPriceEcoVal({ error: false, message: "" })
        }
    }
    const PriceBusChange = (e) => {
        setPriceBus(e.target.value)
        if (e.target.value === "") {
            setPriceBusVal({ error: true, message: "This Field is required" })
        }
        else {
            setPriceBusVal({ error: false, message: "" })
        }
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

    function checkError (e, data) {
        e.preventDefault()
        let error = false
        if (data.flightNumber === "") {
            setFlightNumVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setFlightNumVal({ error: false, message: "" })
        }
        if (data.departureTime === "") {
            setDepartureTimeVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setDepartureTimeVal({ error: false, message: "" })
        }
        if (data.departureDate === "") {
            setDepartureDateVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setDepartureDateVal({ error: false, message: "" })
        }
        if (data.arrivalTime === "") {
            setArrivalTimeVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setArrivalTimeVal({ error: false, message: "" })
        }
        if (data.arrivalDate === "") {
            setArrivalDateVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setArrivalDateVal({ error: false, message: "" })
        }
        if (data.departureAirport === "") {
            setDepAirportVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setDepAirportVal({ error: false, message: "" })
        }
        if (data.destinationAirport === "") {
            setDesAirportVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setDesAirportVal({ error: false, message: "" })
        }
        if (data.depCountry === "") {
            setDepCountryVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setDepCountryVal({ error: false, message: "" })
        }
        if (data.destCountry === "") {
            setDesCountryVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setDesCountryVal({ error: false, message: "" })
        }
        if (data.economyPrice === "") {
            setPriceEcoVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setPriceEcoVal({ error: false, message: "" })
        }
        if (data.businessPrice === "") {
            setPriceBusVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
            setPriceBusVal({ error: false, message: "" }) 
        }
        if (data.planeType === "" || data.planeType === "None") {
            setPlaneTypeVal({ error: true, message: "This Field is Required" })
            error = true
        }
        else {
        setPlaneTypeVal({ error: false, message: "" })
        }
    if (error) return true
    return false
}

const handleClick = (e) => {
    const errorFound = checkError(e, data)
    if (errorFound) return
    else {
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
        console.log("added data: ", data)
    }
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
                            error={flightNumVal.error}
                            helperText={flightNumVal.message}
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
                            onChange={DepartureTimeChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                            error={departureTimeVal.error}
                            helperText={departureTimeVal.message}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-textarea"
                            label="Departure Date"
                            error={departureDateVal.error}
                            helperText={departureDateVal.message}
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
                            error={arrivalTimeVal.error}
                            helperText={arrivalTimeVal.message}
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
                            error={arrivalDateVal.error}
                            helperText={arrivalDateVal.message}
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
                            error={depCountryVal.error}
                            helperText={depCountryVal.message}
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
                            error={desCountryVal.error}
                            helperText={desCountryVal.message}
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
                            error={depAirportVal.error}
                            helperText={depAirportVal.message}
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
                            error={desAirportVal.error}
                            helperText={desAirportVal.message}
                            placeholder="Destination Airport"
                            onChange={DesAirportChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                        <FormControl sm={{ m: 1 }} fullWidth>
                            <InputLabel id="demo-simple-select-helper-label" error={planeTypeVal.error}>Plane</InputLabel>
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
                            <FormHelperText>{planeTypeVal.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="outlined-textarea"
                            name="economy"
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
                            name="business"
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
                            error={priceEcoVal.error}
                            helperText={priceEcoVal.message}
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
                            error={priceBusVal.error}
                            helperText={priceBusVal.message}
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
