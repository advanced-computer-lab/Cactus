// ___________MIDDLEWARE____________
import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'

// ___________MATERIAL UI____________
import { Box } from '@mui/system'
import { IconButton, Typography, Tab, Tabs, Button, Grid, ButtonGroup, Divider, Paper, TextField, MenuItem, Menu, Alert } from '@mui/material'

// ___________MATERIAL UI ICONS____________
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PasswordIcon from '@mui/icons-material/Password';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import SaveIcon from '@mui/icons-material/Save';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import InfoIcon from '@mui/icons-material/Info';
import EventNoteIcon from '@mui/icons-material/EventNote'
import CircularProgress from '@mui/material/CircularProgress';

// ___________COMPONENTS____________
import UserNavBar from '../../Components/User/UserNavBar'
import { UserContext } from '../../Context/UserContext';
import { useHistory } from 'react-router'


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
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 1) {
            setFetching(true)
            axios.post('/Users/getAllReservations', { username: loggedUser.username })
                .then((res) => {
                    setReservations(res.data)
                    setFetching(false)
                })
                .catch((error) => { console.log(error.message) })
            console.log(reservations)
        }
    };

    return (
        <>
            <div>
                <UserNavBar />
            </div>
            {loggedUser ?
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Paper
                            elevation={2}
                            square
                            variant="outlined"
                            style={{ padding: '30px', marginTop: '30px', borderRadius: '1rem', width: '700px' }}
                        >
                            <Box >
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
                                        <Typography variant="h4" component="h4" style={{ marginLeft: '-100px' }}>{loggedUser.title} {loggedUser.firstName} {loggedUser.lastName}</Typography>
                                        <ButtonGroup color="secondary" aria-label="navigation" style={{ marginTop: '50px', marginLeft: '20px' }}>
                                                <Button variant="outlined" startIcon={<HomeIcon />} color="secondary" onClick={()=>{history.push("/")}}>
                                                    Home
                                                </Button>
                                                <Button variant="outlined" startIcon={<FlightTakeoffIcon />} color="secondary" onClick={()=>{history.push("/")}}>
                                                    Book Flight
                                                </Button>
                                                <Button variant="outlined" startIcon={<PasswordIcon />} color="secondary" onClick={()=>{history.push("/ChangePassword")}}>
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
                                                            <TextField fullWidth variant="outlined" label="First Name" defaultValue={loggedUser.firstName} type="text" required />
                                                        </Grid>
                                                        <Grid item sm={6}>
                                                            <TextField fullWidth variant="outlined" label="Last Name" defaultValue={loggedUser.lastName} type="text" required />
                                                        </Grid>
                                                        <Grid item sm={12}>
                                                            <TextField fullWidth variant="outlined" label="Email" defaultValue={loggedUser.email} type="email" required />
                                                        </Grid>
                                                        <Grid item sm={3}>
                                                            <TextField fullWidth variant="outlined" label="Area Code" defaultValue="+20" type="text" required />
                                                        </Grid>
                                                        <Grid item sm={9}>
                                                            <TextField fullWidth variant="outlined" label="Phone Number" defaultValue={loggedUser.phoneNumber} type="tel" required />
                                                        </Grid>
                                                        <Grid item sm={12}>
                                                            <TextField fullWidth variant="outlined" label="Country/Region" defaultValue="Egypt" type="text" required />
                                                        </Grid>
                                                        <Grid item sm={12}>
                                                            <TextField fullWidth variant="outlined" label="Passport Number" defaultValue={loggedUser.passportNumber} type="text" required />
                                                        </Grid>
                                                        <Grid item sm={6}></Grid>
                                                        <Grid item sm={6}>
                                                            <Button variant="contained" endIcon={<SaveIcon />} fullWidth>Save Changes</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </TabPanel>
                                            {/* User's booked trips */}
                                            <TabPanel value={value} index={1}>
                                                {isFetching ? <><CircularProgress /> <h4>Just a second, The planes are refueling</h4></> :
                                                    reservations.length === 0 ? <><Alert severity="warning">You don't have any upcoming flights</Alert></> : reservations.map((reservation) =>
                                                        <>
                                                            <Paper elevation={2} variant="outlined" style={{ padding: '30px', marginTop: '30px', borderRadius: '1rem', width: '650px', marginLeft: '-200px' }}>
                                                                <Box>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item sm={10}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item sm={5}>
                                                                                    <Typography variant="h6" component="h6">{reservation.destination}</Typography>
                                                                                </Grid>
                                                                                <Grid item sm={2}>
                                                                                    <CompareArrowsIcon />
                                                                                </Grid>
                                                                                <Grid item sm={5}>
                                                                                    <Typography variant="h6" component="h6">{reservation.return}</Typography>
                                                                                </Grid>
                                                                                <Grid item sm={5}>
                                                                                    <Typography variant="h6" component="h6">{reservation.departureDate} {reservation.departureTime}</Typography>
                                                                                </Grid>
                                                                                <Grid item sm={2}>
                                                                                    <AccessTimeIcon />
                                                                                </Grid>
                                                                                <Grid item sm={5}>
                                                                                    <Typography variant="h6" component="h6">{reservation.returnDate} {reservation.returnTime}</Typography>
                                                                                </Grid>
                                                                                <Grid item sm={4}>
                                                                                    <AirlineSeatReclineNormalIcon />
                                                                                    <Typography variant="h6" component="h6">{reservation.seats} seats</Typography>
                                                                                </Grid>
                                                                                <Grid item sm={4}>
                                                                                    <AttachMoneyIcon />
                                                                                    <Typography variant="h6" component="h6">{(reservation.departurePrice + reservation.returnPrice) * reservation.seats}</Typography>
                                                                                </Grid>
                                                                                <Grid item sm={4}>
                                                                                    <AirlineSeatReclineExtraIcon />
                                                                                    <Typography variant="h6" component="h6">{reservation.cabin}</Typography>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item sm={2}>
                                                                            <IconButton
                                                                                id="basic-button"
                                                                                aria-controls="basic-menu"
                                                                                aria-haspopup="true"
                                                                                aria-expanded={open ? 'true' : undefined}
                                                                                onClick={handleClick}
                                                                            >
                                                                                <MoreVertIcon color="secondary" />
                                                                            </IconButton>
                                                                            <Menu
                                                                                id="basic-menu"
                                                                                anchorEl={anchorEl}
                                                                                open={open}
                                                                                onClose={handleClose}
                                                                                MenuListProps={{
                                                                                    'aria-labelledby': 'basic-button',
                                                                                }}
                                                                            >
                                                                                <MenuItem onClick={handleClose}><Button variant="contained" color="info" fullWidth>View Details</Button></MenuItem>
                                                                                <Divider variant="middle" />
                                                                                <MenuItem onClick={handleClose}><Button variant="contained" color="error">Cancel Booking</Button></MenuItem>
                                                                            </Menu>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Paper>
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
        </>
    )
}
