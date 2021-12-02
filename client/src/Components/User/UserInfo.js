// ___________MIDDLEWARE____________
import React, { useContext, useEffect } from 'react'
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
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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

    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [reservations, setReservations] = React.useState([])
    const [isFetching, setFetching] = React.useState(false)
    const [email, setEmail] = React.useState(loggedUser.email)
    const [fName, setFName] = React.useState(loggedUser.firstName)
    const [lName, setLName] = React.useState(loggedUser.lastName)
    const [cc1, setCc1] = React.useState(loggedUser.countryCode[0])
    const [cc2, setCc2] = React.useState(() => {
        if (loggedUser.countryCode.length > 1)
            return loggedUser.countryCode[1]
        else
            return ""
    })
    const [cc3, setCc3] = React.useState(() => {
        if (loggedUser.countryCode.length > 2)
            return loggedUser.countryCode[2]
        else
            return ""
    })
    const [phone1, setPhone1] = React.useState(loggedUser.telephones[0])
    const [phone2, setPhone2] = React.useState(() => {
        if (loggedUser.telephones.length > 1)
            return loggedUser.telephones[1]
        else
            return ""
    })
    const [phone3, setPhone3] = React.useState(() => {
        if (loggedUser.telephones.length > 2)
            return loggedUser.telephones[2]
        else
            return ""
    })
    const [passport, setPassport] = React.useState(loggedUser.passportNumber)
    const [country, setCountry] = React.useState(loggedUser.homeAddress.country)
    const [city, setCity] = React.useState(loggedUser.homeAddress.city)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFetching(true)

    };
    useEffect(() => {
        if (!(loggedUser === null)) {
            const fetchReservations = async () => {
                axios.post('/Users/getAllReservations', { username: loggedUser.username })
                    .then((res) => {
                        setReservations(res.data)
                        setFetching(false)
                    })
                    .catch((error) => { console.log(error.message) })
            };
            fetchReservations();
        }
    }, [reservations, loggedUser])
    const [openDialog, setOpenDialog] = React.useState(false);

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
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

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
    const [success, setSuccess] = React.useState(false)
    const [backdropOpen, setBackdropOpen] = React.useState(false);
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
                                                                                                    {reservation.destCountry}, {reservation.destination}</Typography>
                                                                                            </Grid>
                                                                                            <Grid item sm={2}>
                                                                                                <CompareArrowsIcon style={{ marginLeft: '50px' }} />
                                                                                            </Grid>
                                                                                            <Grid item sm={5}>
                                                                                                <Typography variant="h6" component="h6" style={{ marginLeft: '50px' }}>
                                                                                                    {reservation.retCountry}, {reservation.return}</Typography>
                                                                                            </Grid>
                                                                                            <Grid item sm={5}>
                                                                                                <Typography variant="h6" component="h6" style={{ marginLeft: '50px' }}>
                                                                                                    {reservation.departureDate} {reservation.departureTime}</Typography>
                                                                                            </Grid>
                                                                                            <Grid item sm={2}>
                                                                                                <AccessTimeIcon style={{ marginLeft: '50px' }} />
                                                                                            </Grid>
                                                                                            <Grid item sm={5}>
                                                                                                <Typography variant="h6" component="h6" style={{ marginLeft: '50px' }}>
                                                                                                    {reservation.returnDate} {reservation.returnTime}</Typography>
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
                                                                                                    C001*
                                                                                                </TimelineOppositeContent>
                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot variant="outlined" color="secondary" />
                                                                                                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent style={{ fontWeight: 'bold' }} width="500px">
                                                                                                    Country*, {reservation.destination} <br /> {reservation.departureDate} {"-"} {reservation.departureTime}
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                            <TimelineItem>
                                                                                                <TimelineOppositeContent>
                                                                                                    C001*
                                                                                                </TimelineOppositeContent>
                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot variant="outlined" color="secondary" />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent style={{ fontWeight: 'bold' }} width="500px">
                                                                                                    Country*, {reservation.return} <br /> {reservation.returnDate} {"-"} {reservation.returnTime}
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                        </Timeline>
                                                                                    </Grid>
                                                                                    <Grid item sm={6}>
                                                                                        <Timeline style={{ marginLeft: '-200px', marginTop: '-15px' }}>
                                                                                            <TimelineItem>
                                                                                                <TimelineOppositeContent>
                                                                                                    C001*
                                                                                                </TimelineOppositeContent>
                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot variant="outlined" color="secondary" />
                                                                                                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent style={{ fontWeight: 'bold' }} width="500px">
                                                                                                    Country*, {reservation.destination} <br /> {reservation.departureDate} {"-"} {reservation.departureTime}
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                            <TimelineItem>
                                                                                                <TimelineOppositeContent>
                                                                                                    C001*
                                                                                                </TimelineOppositeContent>
                                                                                                <TimelineSeparator>
                                                                                                    <TimelineDot variant="outlined" color="secondary" />
                                                                                                </TimelineSeparator>
                                                                                                <TimelineContent style={{ fontWeight: 'bold' }} width="500px">
                                                                                                    Country*, {reservation.return} <br /> {reservation.returnDate} {"-"} {reservation.returnTime}
                                                                                                </TimelineContent>
                                                                                            </TimelineItem>
                                                                                        </Timeline>
                                                                                    </Grid>
                                                                                    <Grid item={3}>
                                                                                        <Box style={{ display: 'flex', flexDirection: 'column', marginLeft: '50px' }}>
                                                                                            <Box style={{ display: 'flex', }}>
                                                                                                {reservation.depSeatNumbers.map((seat) =>
                                                                                                    <>
                                                                                                        <IconButton color="secondary">
                                                                                                            <AirlineSeatReclineNormalIcon />{seat}
                                                                                                        </IconButton>
                                                                                                    </>
                                                                                                )}
                                                                                                <Tooltip title="Edit Seats">
                                                                                                    <IconButton onClick={()=> setOpenDepSeats(true)}>
                                                                                                        <EditIcon />
                                                                                                    </IconButton>
                                                                                                </Tooltip>
                                                                                            </Box>
                                                                                            <Alert icon={<AttachMoneyIcon />} severity="info">
                                                                                                Total Price: EGP {reservation.departurePrice * reservation.seats}
                                                                                            </Alert>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item sm={3}>
                                                                                        <Box style={{ marginLeft: '50px' }}>
                                                                                            <Typography variant="h6">{(reservation.cabin).toUpperCase()}</Typography>
                                                                                        </Box>
                                                                                    </Grid>
                                                                                    <Grid item={3}>
                                                                                        <Box style={{ display: 'flex', flexDirection: 'column', marginLeft: '50px' }}>
                                                                                            <Box style={{ display: 'flex', }}>
                                                                                                {reservation.retSeatNumbers.map((seat) =>
                                                                                                    <>
                                                                                                        <IconButton color="secondary">
                                                                                                            <AirlineSeatReclineNormalIcon />{seat}
                                                                                                        </IconButton>
                                                                                                    </>
                                                                                                )}
                                                                                                <Tooltip title="Edit Seats">
                                                                                                    <IconButton onClick={()=> setOpenRetSeats(true)}>
                                                                                                        <EditIcon />
                                                                                                    </IconButton>
                                                                                                </Tooltip>
                                                                                            </Box>
                                                                                            <Alert icon={<AttachMoneyIcon />} severity="info">
                                                                                                Total Price: EGP {reservation.returnPrice * reservation.seats}
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
                                                                <Dialog
                                                                    open={openDepSeats}
                                                                    onClose={()=>setOpenDepSeats(false)}
                                                                >
                                                                    <DialogTitle>
                                                                        Change Departure Flight Seats
                                                                    </DialogTitle>
                                                                    <DialogContent>

                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        <Button onClick={()=>setOpenDepSeats(false)}
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
