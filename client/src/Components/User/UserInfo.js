// ___________MIDDLEWARE____________
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import { useHistory } from 'react-router'


// ___________MATERIAL UI____________
import { Box } from '@mui/system'
import {
    IconButton, Typography, Tab, Tabs, Button, Grid, ButtonGroup, Divider,
    Paper, TextField, MenuItem, Menu, Alert, Dialog, DialogTitle, DialogContent, DialogActions,
    DialogContentText, Collapse, Backdrop, Accordion, AccordionDetails, AccordionSummary, Tooltip
} from '@mui/material'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

// ___________MATERIAL UI ICONS____________
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PasswordIcon from '@mui/icons-material/Password';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WcIcon from '@mui/icons-material/Wc';
import RestoreIcon from '@mui/icons-material/Restore';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import EventNoteIcon from '@mui/icons-material/EventNote'
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

// ___________COMPONENTS____________
import UserNavBar from '../../Components/User/UserNavBar'
import { UserContext } from '../../Context/UserContext';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

var recentlyReservedDepB = []
var recentlyReservedDepE = []

var economySplicedDep = []

var recentlyReservedRetB = []
var recentlyReservedRetE = []

var economySplicedRet = []

export default function UserInfo() {
    const history = useHistory()
    // user context
    const { loggedUser } = useContext(UserContext)
    var maleDisabled = false
    var femaleDisabled = true
    if (loggedUser) {
        if (loggedUser.gender === "Male") {
            maleDisabled = false
            femaleDisabled = true
        }
        else {
            maleDisabled = true
            femaleDisabled = false
        }
    }

    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [reservations, setReservations] = useState([])
    const [isFetching, setFetching] = useState(false)
    const [openDepSeats, setOpenDepSeats] = useState(false)
    const [openRetSeats, setOpenRetSeats] = useState(false)
    const [email, setEmail] = useState(loggedUser.email)
    const [fName, setFName] = useState(loggedUser.firstName)
    const [lName, setLName] = useState(loggedUser.lastName)
    const [cc1, setCc1] = useState(loggedUser.countryCode[0])
    const [cc2, setCc2] = useState(() => {
        if (loggedUser.countryCode.length > 1)
            return loggedUser.countryCode[1]
        else
            return ""
    })
    const [cc3, setCc3] = useState(() => {
        if (loggedUser.countryCode.length > 2)
            return loggedUser.countryCode[2]
        else
            return ""
    })
    const [phone1, setPhone1] = useState(loggedUser.telephones[0])
    const [phone2, setPhone2] = useState(() => {
        if (loggedUser.telephones.length > 1)
            return loggedUser.telephones[1]
        else
            return ""
    })
    const [phone3, setPhone3] = useState(() => {
        if (loggedUser.telephones.length > 2)
            return loggedUser.telephones[2]
        else
            return ""
    })
    const [passport, setPassport] = useState(loggedUser.passportNumber)
    const [country, setCountry] = useState(loggedUser.homeAddress.country)
    const [city, setCity] = useState(loggedUser.homeAddress.city)
    const open = Boolean(anchorEl);
    const [economyRetSeats, setEconomyRetSeats] = useState([])
    const [businessRetSeats, setBusinessRetSeats] = useState([])
    const [economyDepSeats, setEconomyDepSeats] = useState([])
    const [businessDepSeats, setBusinessDepSeats] = useState([])
    const [numberOfSeats, setNumberOfSeats] = useState(0);
    const [seats, setSeats] = useState(0)
    const [cabin, setCabin] = useState('')
    const [depSeat, setDepSeat] = useState([])
    const [retSeat, setRetSeat] = useState([])
    const [depFlightMaps, setDepFlightMaps] = useState([])
    const [retFlightMaps, setRetFlightMaps] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFetching(true)

    };
    useEffect(() => {
        if (!(loggedUser === null)) {
            const fetchReservations = async () => {
                const res = await axios.post('/Users/getAllReservations', { username: loggedUser.username })
                    setReservations(res.data)
                    setNumberOfSeats(res.data[0].reservation.seats)
                    setSeats(res.data[0].reservation.seats)
                    setCabin(res.data[0].reservation.cabin)
                    setFetching(false)
            };
            console.log("I fetched")
            fetchReservations();
        }
    }, [])

    const [openDialog, setOpenDialog] = useState(false);

    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const fnameChange = (e) => {
        setFName(e.target.value)
    }
    const lnameChange = (e) => {
        setLName(e.target.value)
    }
    const passportChange = (e) => {
        setPassport(e.target.value)
    }
    const countryChange = (e) => {
        setCountry(e.target.value)
    }
    const cityChange = (e) => {
        setCity(e.target.value)
    }
    const p1Change = (e) => {
        setPhone1(e.target.value)
    }
    const cc1Change = (e) => {
        setCc1(e.target.value)
    }
    const p2Change = (e) => {
        setPhone2(e.target.value)
    }
    const cc2Change = (e) => {
        setCc2(e.target.value)
    }
    const p3Change = (e) => {
        setPhone3(e.target.value)
    }
    const cc3Change = (e) => {
        setCc3(e.target.value)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const UpdateUser = () => {
        const phones = [phone1]
        const codes = [cc1]
        if (phone2 !== "" && cc2 !== "") {
            phones.push(phone2)
            codes.push(cc2)
        }
        if (phone3 !== "" && cc3 !== "") {
            phones.push(phone3)
            codes.push(cc3)
        }
        const data = {
            'email': email,
            'firstName': fName,
            'lastName': lName,
            'passportNumber': passport,
            'telephones': phones,
            'countryCode': codes,
            'country': country,
            'city': city,
            'password': loggedUser.password,
            '_id': loggedUser._id,
            'reservations': loggedUser.reservations
        }
        console.log(data)
        axios.put('/Users/updateUser', data)
            .then((response) => { console.log(response) })
            .catch((err) => {
                console.log(err)
            })
    }
    const [success, setSuccess] = useState(false)
    const [backdropOpen, setBackdropOpen] = useState(false);

    const handleCancleBooking = (e, params) => {
        e.preventDefault()
        const data = {
            username: loggedUser.username,
            reservationId: params._id,
            title: loggedUser.title,
            refundedAmount: (params.departurePrice + params.returnPrice) * params.seats,
            email: loggedUser.email,
            firstName: loggedUser.firstName
        }
        console.log(data)
        setOpenDialog(false);
        setBackdropOpen(true)
        axios.post("/Users/cancelReservation", data)
            .then((res) => {
                console.log(res.data)
                setSuccess(true)
                setBackdropOpen(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    var depSeats = []
    var depFlightMap = []
    var retSeats = []
    var retFlightMap = []

    const handleOpenDepSeats = (e, depSeatsB, depSeatsE, reserved) => {
        setOpenDepSeats(true)
        setEconomyDepSeats(depSeatsE)
        setBusinessDepSeats(depSeatsB)
        if (cabin === 'economy') {
            const reservedSeats = []
            for (let i = 0; i < reserved.length; i++) {
                const found = depSeatsE.find((seat) => {
                    return seat.number === reserved[i]
                })
                reservedSeats.push(found.number - 1)
            }
            recentlyReservedDepE = reservedSeats
            for (let i = 0; i < recentlyReservedDepE; i++){
                depSeatsE[recentlyReservedDepE[i]].reserved = false
                console.log("depSeatsEReset: ", depSeatsE)

            }
            recentlyReservedDepE = []
            economySplicedDep = []
            for (let i = 0; i < depSeatsE.length; i += 10) {
                let temp1 = []
                let temp2 = []
                let temp3 = []
                for (let j = i; j < i + 3; j++) {
                    temp1.push(depSeatsE[j])
                    console.log("temp1: ", temp1)
                }
                for (let k = i + 3; k < (i + 3) + 4; k++) {
                    temp2.push(depSeatsE[k])
                    console.log("temp2: ", temp2)
                }
                for (let l = i + 7; l < (i + 7) + 3; l++) {
                    temp3.push(depSeatsE[l])
                    console.log("temp3: ", temp3)
                }
                economySplicedDep.push(temp1)
                economySplicedDep.push(temp2)
                economySplicedDep.push(temp3)
                console.log("economySpliced: ", economySplicedDep)
            }
        }
        else {
            const reservedSeats = []
            for (let i = 0; i < reserved.length; i++) {
                const found = depSeatsB.find((seat) => {
                    return seat.number === reserved[i]
                })
                reservedSeats.push(found)
            }
            recentlyReservedDepB = reservedSeats
        }

        console.log("depSeatsE: ", depSeatsE)

    }
    const handleDepSeatsChanged = (e) => {
        setOpenDepSeats(false)
    }

    const handleSelectedDepSeat = (e, params) => {
        e.preventDefault()
        if (!(numberOfSeats === 0)) {
            setNumberOfSeats(numberOfSeats - 1);
            if (cabin === "business") {
                let seat = businessDepSeats.find((o, i) => {
                    if (o.number === params) {
                        businessDepSeats[i] = { number: params, reserved: true, _id: o._id };
                        recentlyReservedDepB.push(i)
                        setBusinessDepSeats(businessDepSeats)
                        return true;
                    }
                })
            }
            else {
                const flatArray = economySplicedDep.flat(1)
                let seat = flatArray.find((o, i) => {
                    if (o.number === params) {
                        flatArray[i] = { number: params, reserved: true, _id: o._id };
                        recentlyReservedDepE.push(i)
                        return true;
                    }
                })
                economySplicedDep = []
                let temp1 = []
                let temp2 = []
                let temp3 = []
                for (let i = 0; i < flatArray.length; i += 10) {
                    temp1 = []
                    temp2 = []
                    temp3 = []
                    for (let j = i; j < i + 3; j++) {
                        temp1.push(flatArray[j])
                        console.log("temp1: ", temp1)
                    }
                    for (let k = i + 3; k < (i + 3) + 4; k++) {
                        temp2.push(flatArray[k])
                        console.log("temp2: ", temp2)
                    }
                    for (let l = i + 7; l < (i + 7) + 3; l++) {
                        temp3.push(flatArray[l])
                        console.log("temp3: ", temp3)
                    }
                    economySplicedDep.push(temp1)
                    economySplicedDep.push(temp2)
                    economySplicedDep.push(temp3)
                }
            }
        }
    }
    const handleResetRetSeats = (e) => {
        e.preventDefault()
        if (cabin === "business") {
            for (let index = 0; index < recentlyReservedRetB.length; index++) {
                businessRetSeats[recentlyReservedRetB[index]].reserved = false
                setBusinessRetSeats(businessRetSeats)
            }
            recentlyReservedRetB = []
            console.log(businessRetSeats)
        }
        else {
            const flatArray = economySplicedRet.flat(1)
            for (let index = 0; index < recentlyReservedRetE.length; index++) {
                flatArray[recentlyReservedRetE[index]].reserved = false
            }
            recentlyReservedRetE = []
            economySplicedRet = []
            let temp1 = []
            let temp2 = []
            let temp3 = []
            for (let i = 0; i < flatArray.length; i += 10) {
                temp1 = []
                temp2 = []
                temp3 = []
                for (let j = i; j < i + 3; j++) {
                    temp1.push(flatArray[j])
                    console.log("temp1: ", temp1)
                }
                for (let k = i + 3; k < (i + 3) + 4; k++) {
                    temp2.push(flatArray[k])
                    console.log("temp2: ", temp2)
                }
                for (let l = i + 7; l < (i + 7) + 3; l++) {
                    temp3.push(flatArray[l])
                    console.log("temp3: ", temp3)
                }
                economySplicedRet.push(temp1)
                economySplicedRet.push(temp2)
                economySplicedRet.push(temp3)
            }
            // setEconomyDepSeats(economySplicedDep)
            console.log(economyRetSeats)
        }
        setNumberOfSeats(seats)
    }
    const handleResetDepSeats = (e) => {
        e.preventDefault()
        if (cabin === "business") {
            for (let index = 0; index < recentlyReservedDepB.length; index++) {
                businessDepSeats[recentlyReservedDepB[index]].reserved = false
                setBusinessDepSeats(businessDepSeats)
            }
            recentlyReservedDepB = []
        }
        else {
            const flatArray = economySplicedDep.flat(1)
            for (let index = 0; index < recentlyReservedDepE.length; index++) {
                flatArray[recentlyReservedDepE[index]].reserved = false
            }
            recentlyReservedDepE = []
            economySplicedDep = []
            let temp1 = []
            let temp2 = []
            let temp3 = []
            for (let i = 0; i < flatArray.length; i += 10) {
                temp1 = []
                temp2 = []
                temp3 = []
                for (let j = i; j < i + 3; j++) {
                    temp1.push(flatArray[j])
                    console.log("temp1: ", temp1)
                }
                for (let k = i + 3; k < (i + 3) + 4; k++) {
                    temp2.push(flatArray[k])
                    console.log("temp2: ", temp2)
                }
                for (let l = i + 7; l < (i + 7) + 3; l++) {
                    temp3.push(flatArray[l])
                    console.log("temp3: ", temp3)
                }
                economySplicedDep.push(temp1)
                economySplicedDep.push(temp2)
                economySplicedDep.push(temp3)
            }
        }
        setNumberOfSeats(seats)
    }

    const handleRetSeatsChanged = (e) => {

    }
    return (
        <>
            <div>
                <UserNavBar />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loggedUser ?
                    <>
                        <div>
                            <Paper
                                elevation={2}
                                square
                                variant="outlined"
                                style={{ padding: '30px', marginTop: '30px', borderRadius: '1rem', width: '1000px' }}
                            >
                                <Box >
                                    <Box sx={{ width: '100%' }}>
                                        <Collapse in={success}>
                                            <Alert
                                                action={
                                                    <IconButton
                                                        aria-label="close"
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => {
                                                            setSuccess(false);
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                }
                                                sx={{ mb: 2 }}
                                            >
                                                You have received an email confirming your cancellation
                                            </Alert>
                                        </Collapse>
                                    </Box>
                                    <Grid container spacing={1}>
                                        {/* User profile pic */}
                                        <Grid item sx={4}>
                                            <Paper elvation={3} square
                                                style={{
                                                    width: '150px', height: '150px', borderRadius: '25px',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}
                                            >
                                                <PersonIcon sx={{ fontSize: 100 }} />
                                            </Paper>
                                        </Grid>
                                        {/* Navigation */}
                                        <Grid item sx={5}>
                                            <Typography variant="h4" component="h4" >{loggedUser.title} {loggedUser.firstName} {loggedUser.lastName}</Typography>
                                            <ButtonGroup color="secondary" aria-label="navigation" style={{ marginTop: '50px', marginLeft: '20px' }}>
                                                <Button variant="outlined" startIcon={<HomeIcon />} color="secondary" onClick={() => { history.push("/") }}>
                                                    Home
                                                </Button>
                                                <Button variant="outlined" startIcon={<FlightTakeoffIcon />} color="secondary" onClick={() => { history.push("/") }}>
                                                    Book Flight
                                                </Button>
                                                <Button variant="outlined" startIcon={<PasswordIcon />} color="secondary" onClick={() => { history.push("/ChangePassword") }}>
                                                    Change Password
                                                </Button>
                                            </ButtonGroup>
                                        </Grid>
                                        <Grid item sm={3}></Grid>
                                    </Grid>
                                    <br />
                                    <Divider variant="middle"></Divider>
                                    <Grid container spacing={2}>
                                        <Grid item sm={3}></Grid>
                                        <Grid item sm={9}>
                                            <Box sx={{ width: '100%' }}>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                        <Tab icon={<InfoIcon />} iconPosition='start' label="About" {...a11yProps(0)} />
                                                        <Tab icon={<EventNoteIcon />} iconPosition='start' label="My Flights" {...a11yProps(1)} />
                                                    </Tabs>
                                                </Box>
                                                {/* User personal info */}
                                                <TabPanel value={value} index={0}>
                                                    <Box>
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={12}>
                                                                <TextField fullWidth variant="outlined" disabled value={loggedUser.username} label="Username" />
                                                            </Grid>
                                                            <Grid item sm={8}>
                                                                <TextField fullWidth variant="outlined" disabled value={loggedUser.dateOfBirth} label="Date of Birth" />
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <IconButton aria-label="male" style={{ marginRight: '20px' }} color={!maleDisabled ? "secondary" : "inherit"} disabled={maleDisabled}>
                                                                    <MaleIcon />
                                                                </IconButton>
                                                                <IconButton aria-label="female" disabled={femaleDisabled} color={!femaleDisabled ? "secondary" : "inherit"}>
                                                                    <FemaleIcon />
                                                                </IconButton>
                                                            </Grid>
                                                            <Grid item sm={6}>
                                                                <TextField fullWidth variant="outlined" label="First Name" defaultValue={fName} onChange={fnameChange} type="text" required />
                                                            </Grid>
                                                            <Grid item sm={6}>
                                                                <TextField fullWidth variant="outlined" label="Last Name" defaultValue={lName} onChange={lnameChange} type="text" required />
                                                            </Grid>
                                                            <Grid item sm={12}>
                                                                <TextField fullWidth variant="outlined" label="Email" defaultValue={email} onChange={emailChange} type="email" required />
                                                            </Grid>
                                                            <Grid item lg={4}>
                                                                <TextField fullWidth variant="outlined" label="Area Code 1" defaultValue={cc1} onChange={cc1Change} type="text" />
                                                            </Grid>
                                                            <Grid item sm={8}>
                                                                <TextField fullWidth variant="outlined" label="Phone Number 1" defaultValue={phone1} onChange={p1Change} type="tel" required />
                                                            </Grid>
                                                            <Grid item lg={4}>
                                                                <TextField fullWidth variant="outlined" label="Area Code 2" defaultValue={cc2} onChange={cc2Change} type="text" />
                                                            </Grid>
                                                            <Grid item sm={8}>
                                                                <TextField fullWidth variant="outlined" label="Phone Number 2" defaultValue={phone2} onChange={p2Change} type="tel" />
                                                            </Grid>
                                                            <Grid item lg={4}>
                                                                <TextField fullWidth variant="outlined" label="Area Code 3" defaultValue={cc3} onChange={cc3Change} type="text" />
                                                            </Grid>
                                                            <Grid item sm={8}>
                                                                <TextField fullWidth variant="outlined" label="Phone Number 3" defaultValue={phone3} onChange={p3Change} type="tel" />
                                                            </Grid>
                                                            <Grid item sm={6}>
                                                                <TextField fullWidth variant="outlined" label="Country/Region" defaultValue={country} onChange={countryChange} type="text" required />
                                                            </Grid>
                                                            <Grid item sm={6}>
                                                                <TextField fullWidth variant="outlined" label="City" defaultValue={city} onChange={cityChange} type="text" required />
                                                            </Grid>
                                                            <Grid item sm={12}>
                                                                <TextField fullWidth variant="outlined" label="Passport Number" defaultValue={passport} onChange={passportChange} type="text" required />
                                                            </Grid>
                                                            <Grid item sm={6}></Grid>
                                                            <Grid item sm={6}>
                                                                <Button variant="contained" onClick={UpdateUser} endIcon={<SaveIcon />} fullWidth>Save Changes</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </TabPanel>
                                                {/* User's booked trips */}
                                                <TabPanel value={value} index={1}>
                                                    {isFetching ? <><CircularProgress /> <h4>Just a second, The planes are refueling</h4></> :
                                                        reservations.length === 0 ? <><Alert severity="warning">You don't have any upcoming flights</Alert></> : reservations.map((reservation) =>
                                                            <>
                                                                <Paper
                                                                    elevation={0}
                                                                    variant="outlined"
                                                                    style={{
                                                                        padding: '30px', marginTop: '30px', borderRadius: '1rem', width: '650px',
                                                                        boxShadow: '0px 0px 0px 0px', border: 'none'
                                                                    }}
                                                                >
                                                                    <Box>
                                                                        <Accordion style={{ borderRadius: '8px', width: '900px', padding: '30px', marginLeft: '-250px' }}>
                                                                            <AccordionSummary
                                                                                expandIcon={<ExpandMoreIcon />}
                                                                                aria-controls="panel1a-content"
                                                                                id="panel1a-header"

                                                                            >
                                                                                <Grid container spacing={2}>
                                                                                    <Grid item sm={10}>
                                                                                        <Grid container spacing={2}>

                                                                                            <Grid item sm={5}>
                                                                                                <Typography variant="h6" component="h6" style={{ marginLeft: '50px' }}>
                                                                                                    {reservation.departureFlight.depCountry}, {reservation.departureFlight.departureAirport}</Typography>
                                                                                            </Grid>
                                                                                            <Grid item sm={2}>
                                                                                                <CompareArrowsIcon style={{ marginLeft: '50px' }} />
                                                                                            </Grid>
                                                                                            <Grid item sm={5}>
                                                                                                <Typography variant="h6" component="h6" style={{ marginLeft: '50px' }}>
                                                                                                    {reservation.returnFlight.depCountry}, {reservation.returnFlight.departureAirport}</Typography>
                                                                                            </Grid>
                                                                                            <Grid item sm={5}>
                                                                                                <Typography variant="h6" component="h6" style={{ marginLeft: '50px' }}>
                                                                                                    {reservation.reservation.departureDate} {reservation.reservation.departureTime}</Typography>
                                                                                            </Grid>
                                                                                            <Grid item sm={2}>
                                                                                                <AccessTimeIcon style={{ marginLeft: '50px' }} />
                                                                                            </Grid>
                                                                                            <Grid item sm={5}>
                                                                                                <Typography variant="h6" component="h6" style={{ marginLeft: '50px' }}>
                                                                                                    {reservation.reservation.returnDate} {reservation.reservation.returnTime}</Typography>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </AccordionSummary>
                                                                            <AccordionDetails>
                                                                                <Grid container spacing={2} >
                                                                                    <Grid item sm={6}>
                                                                                        <Timeline style={{ marginLeft: '-200px', marginTop: '-15px' }}>
                                                                                            <TimelineItem>
                                                                                                <TimelineOppositeContent>
                                                                                                    {reservation.departureFlight.flightNumber}
                                                                                                </TimelineOppositeContent>
                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot variant="outlined" color="secondary" />
                                                                                                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent style={{ fontWeight: 'bold' }} width="500px">
                                                                                                    {reservation.departureFlight.depCountry}, {reservation.departureFlight.departureAirport} <br /> {reservation.departureFlight.departureDate} {"-"} {reservation.departureFlight.departureTime}
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                            <TimelineItem>
                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot variant="outlined" color="secondary" />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent style={{ fontWeight: 'bold' }} width="500px">
                                                                                                    {reservation.departureFlight.destCountry}, {reservation.departureFlight.destinationAirport} <br /> {reservation.departureFlight.arrivalDate} {"-"} {reservation.departureFlight.arrivalTime}
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                        </Timeline>
                                                                                    </Grid>
                                                                                    <Grid item sm={6}>
                                                                                        <Timeline style={{ marginLeft: '-200px', marginTop: '-15px' }}>
                                                                                            <TimelineItem>
                                                                                                <TimelineOppositeContent>
                                                                                                    {reservation.returnFlight.flightNumber}
                                                                                                </TimelineOppositeContent>
                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot variant="outlined" color="secondary" />
                                                                                                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent style={{ fontWeight: 'bold' }} width="500px">
                                                                                                    {reservation.returnFlight.depCountry}, {reservation.returnFlight.departureAirport} <br /> {reservation.returnFlight.departureDate} {"-"} {reservation.returnFlight.departureTime}
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                            <TimelineItem>

                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot variant="outlined" color="secondary" />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent style={{ fontWeight: 'bold' }} width="500px">
                                                                                                    {reservation.returnFlight.destCountry}, {reservation.returnFlight.destinationAirport} <br /> {reservation.returnFlight.arrivalDate} {"-"} {reservation.returnFlight.arrivalTime}
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                        </Timeline>
                                                                                    </Grid>
                                                                                    <Grid item={3}>
                                                                                        <Box style={{ display: 'flex', flexDirection: 'column', marginLeft: '50px' }}>
                                                                                            <Box style={{ display: 'flex', }}>
                                                                                                {reservation.reservation.depSeatNumbers.map((seat) =>
                                                                                                    <>
                                                                                                        <IconButton color="secondary">
                                                                                                            <AirlineSeatReclineNormalIcon />{seat}
                                                                                                        </IconButton>
                                                                                                    </>
                                                                                                )}
                                                                                                <Tooltip title="Edit Seats">
                                                                                                    <IconButton
                                                                                                        onClick={
                                                                                                            (e) => handleOpenDepSeats(e, reservation.departureFlight.businessMap, reservation.departureFlight.economyMap, reservation.reservation.depSeatNumbers)
                                                                                                        }>
                                                                                                        <EditIcon />
                                                                                                    </IconButton>
                                                                                                </Tooltip>
                                                                                            </Box>
                                                                                            <Alert icon={<AttachMoneyIcon />} severity="info">
                                                                                                Total Price: EGP {reservation.reservation.departurePrice * reservation.reservation.seats}
                                                                                            </Alert>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item sm={3}>
                                                                                        <Box style={{ marginLeft: '50px' }}>
                                                                                            <Typography variant="h6">{(reservation.reservation.cabin).toUpperCase()}</Typography>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item={3}>
                                                                                        <Box style={{ display: 'flex', flexDirection: 'column', marginLeft: '50px' }}>
                                                                                            <Box style={{ display: 'flex', }}>
                                                                                                {reservation.reservation.retSeatNumbers.map((seat) =>
                                                                                                    <>
                                                                                                        <IconButton color="secondary">
                                                                                                            <AirlineSeatReclineNormalIcon />{seat}
                                                                                                        </IconButton>
                                                                                                    </>
                                                                                                )}
                                                                                                <Tooltip title="Edit Seats">
                                                                                                    <IconButton onClick={() => setOpenRetSeats(true)}>
                                                                                                        <EditIcon />
                                                                                                    </IconButton>
                                                                                                </Tooltip>
                                                                                            </Box>
                                                                                            <Alert icon={<AttachMoneyIcon />} severity="info">
                                                                                                Total Price: EGP {reservation.reservation.returnPrice * reservation.reservation.seats}
                                                                                            </Alert>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </AccordionDetails>
                                                                        </Accordion>
                                                                    </Box>
                                                                </Paper>
                                                                <Dialog
                                                                    open={openDialog}
                                                                    onClose={handleCloseDialog}
                                                                    aria-labelledby="alert-dialog-title"
                                                                    aria-describedby="alert-dialog-description"
                                                                >
                                                                    <DialogTitle id="alert-dialog-title">
                                                                        Cancel Booking
                                                                    </DialogTitle>
                                                                    <DialogContent>
                                                                        <DialogContentText id="alert-dialog-description">
                                                                            Are you sure you want to cancel this booking?
                                                                        </DialogContentText>
                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        <Button onClick={handleCloseDialog} color="warning" variant="outlined">Close</Button>
                                                                        <Button onClick={(e) => { handleCancleBooking(e, reservation) }} autoFocus color="error" variant="contained">
                                                                            Cancel Booking
                                                                        </Button>
                                                                    </DialogActions>
                                                                </Dialog>
                                                                <Backdrop
                                                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                                    open={backdropOpen}
                                                                >
                                                                    <CircularProgress color="inherit" />
                                                                </Backdrop>
                                                                {/* dep seats */}
                                                                <Dialog
                                                                    open={openDepSeats}
                                                                    onClose={() => setOpenDepSeats(false)}
                                                                    maxWidth="xl"
                                                                >
                                                                    <DialogTitle>
                                                                        Change Departure Flight Seats
                                                                    </DialogTitle>
                                                                    <DialogContent>
                                                                        <>
                                                                            <Paper elevation={3} variant="outlined" style={{ borderRadius: '1rem', marginLeft: '150px', marginTop: '50px', padding: '30px', width: '1000px' }}>
                                                                                <Box>
                                                                                    <Grid container spacing={3}>

                                                                                        <Grid item sm={12}>
                                                                                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                                                <Typography variant="h4" color="secondary">Pick Your Seats</Typography>
                                                                                            </Box>
                                                                                            <br />
                                                                                            <Divider varaint="middle" />
                                                                                            <br />
                                                                                        </Grid>
                                                                                        <Grid item sm={10}></Grid>
                                                                                        <Grid item sm={2}>
                                                                                            <Tooltip title="Reset Seats">
                                                                                                <IconButton color="error" onClick={handleResetDepSeats} aria-label="reset">
                                                                                                    <RestoreIcon />
                                                                                                </IconButton>
                                                                                            </Tooltip>
                                                                                        </Grid>
                                                                                        <Grid item sm={3}>
                                                                                            <Button variant="contained" endIcon={<ExitToAppIcon />} fullWidth color="error">Exit</Button>
                                                                                        </Grid>
                                                                                        <Grid item sm={6}>
                                                                                            <Box style={{ display: 'flex', marginLeft: '600px' }}>
                                                                                                <IconButton variant="contained" fullWidth color="primary">
                                                                                                    <CoffeeIcon />
                                                                                                </IconButton>
                                                                                                <IconButton variant="contained" fullWidth color="primary">
                                                                                                    <WcIcon />
                                                                                                </IconButton>
                                                                                            </Box>
                                                                                            <br />
                                                                                            <Divider varaint="middle" />
                                                                                            <br />
                                                                                        </Grid>


                                                                                        {cabin === 'economy' ?
                                                                                            <>
                                                                                                <Grid item sm={4}>
                                                                                                    <Box style={{ display: 'flex' }}>
                                                                                                        <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>A</Typography>
                                                                                                        <Typography variant="h5" style={{ marginRight: '50px' }}>B</Typography>
                                                                                                        <Typography variant="h5">C</Typography>
                                                                                                    </Box>
                                                                                                </Grid>
                                                                                                <Grid item sm={4}>
                                                                                                    <Box style={{ display: 'flex' }}>
                                                                                                        <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>D</Typography>
                                                                                                        <Typography variant="h5" style={{ marginRight: '50px' }}>E</Typography>
                                                                                                        <Typography variant="h5" style={{ marginRight: '50px' }}>F</Typography>
                                                                                                        <Typography variant="h5">G</Typography>
                                                                                                    </Box>
                                                                                                </Grid>
                                                                                                <Grid item sm={4}>
                                                                                                    <Box style={{ display: 'flex' }}>
                                                                                                        <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '50px' }}>H</Typography>
                                                                                                        <Typography variant="h5" style={{ marginRight: '50px' }}>I</Typography>
                                                                                                        <Typography variant="h5">J</Typography>
                                                                                                    </Box>
                                                                                                </Grid>
                                                                                            </>
                                                                                            :
                                                                                            <>
                                                                                                <Grid item sm={4}>
                                                                                                    <Box style={{ display: 'flex' }}>
                                                                                                        <Typography variant="h5" style={{ marginLeft: '25px', marginRight: '320px' }}>A</Typography>
                                                                                                        <Typography variant="h5" style={{ marginRight: '320px' }}>B</Typography>
                                                                                                        <Typography variant="h5">C</Typography>
                                                                                                    </Box>
                                                                                                </Grid>
                                                                                                <Grid item sm={8}></Grid>
                                                                                            </>
                                                                                        }
                                                                                        {cabin === "business" ? businessDepSeats.map((seat) =>
                                                                                            <>
                                                                                                <Grid item sm={4}>
                                                                                                    <Button color="info" disabled={seat.reserved}
                                                                                                        onClick={(e) => { handleSelectedDepSeat(e, seat.number) }} variant="contained" key={seat.number}
                                                                                                    >{seat.number}</Button>
                                                                                                </Grid>
                                                                                            </>
                                                                                        )
                                                                                            :
                                                                                            economySplicedDep.map((seat) =>
                                                                                                <>
                                                                                                    <Grid item sm={4}>
                                                                                                        {seat.map((eseat) =>
                                                                                                            <Button color="info"
                                                                                                                disabled={eseat.reserved}
                                                                                                                onClick={(e) => { handleSelectedDepSeat(e, eseat.number) }}
                                                                                                                variant="contained"
                                                                                                                size="medium"
                                                                                                                style={{ marginRight: '5px' }}
                                                                                                            >
                                                                                                                {eseat.number}
                                                                                                            </Button>
                                                                                                        )
                                                                                                        }
                                                                                                    </Grid>
                                                                                                </>
                                                                                            )
                                                                                        }
                                                                                        <Grid item sm={3}>
                                                                                            <br />
                                                                                            <Box style={{ marginLeft: '80px' }}>
                                                                                                <IconButton variant="contained" fullWidth color="primary"><WcIcon /></IconButton>
                                                                                            </Box>
                                                                                        </Grid>
                                                                                        <Grid item sm={6}></Grid>
                                                                                        <Grid item sm={3}>
                                                                                            <br />
                                                                                            <Box>
                                                                                                <IconButton variant="contained" fullWidth color="primary"><WcIcon /></IconButton>
                                                                                            </Box>
                                                                                        </Grid>
                                                                                        <Grid item sm={3}>
                                                                                            <Button variant="contained" endIcon={<ExitToAppIcon />} fullWidth color="error">Exit</Button>
                                                                                        </Grid>
                                                                                        <Grid item sm={9}></Grid>
                                                                                        <Grid item sm={9}></Grid>
                                                                                    </Grid>
                                                                                </Box>
                                                                            </Paper>
                                                                        </>
                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        <Button onClick={() => setOpenDepSeats(false)}
                                                                            variant="outlined"
                                                                            color="warning"
                                                                        >
                                                                            Cancel

                                                                        </Button>
                                                                        <Button
                                                                            onClick={handleDepSeatsChanged}
                                                                            variant="outlined"
                                                                            color="success"
                                                                        >
                                                                            Confirm
                                                                        </Button>
                                                                    </DialogActions>
                                                                </Dialog>

                                                            </>
                                                        )
                                                    }

                                                </TabPanel>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </div>
                    </>
                    :
                    <><h1>User isn't logged in</h1></>
                }
            </div>
        </>
    )
}
