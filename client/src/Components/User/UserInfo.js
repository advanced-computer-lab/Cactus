// ___________MIDDLEWARE____________
import React from 'react'
import PropTypes from 'prop-types';

// ___________MATERIAL UI____________
import { Box } from '@mui/system'
import { Link, IconButton, Typography, Tab, Tabs, Button, Grid, ButtonGroup, Divider, Paper, TextField, MenuItem, Menu } from '@mui/material'

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

// ___________COMPONENTS____________
import UserNavBar from '../../Components/User/UserNavBar'


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
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div>
                <UserNavBar />
            </div>
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
                            <Grid item sx={6}>
                                <Typography variant="h4" component="h4" style={{ marginLeft: '-220px' }}>Mr. Test User</Typography>
                                <ButtonGroup color="secondary" aria-label="navigation" style={{ marginTop: '50px', marginLeft: '20px' }}>
                                    <Link color="inherit" href="/HomePage" style={{ textDecoration: 'none' }}>
                                        <Button variant="outlined" startIcon={<HomeIcon />} color="secondary">
                                            Home
                                        </Button>
                                    </Link>
                                    <Link color="inherit" href="/HomePage" style={{ textDecoration: 'none' }}>
                                        <Button variant="outlined" startIcon={<FlightTakeoffIcon />} color="secondary">
                                            Book Flight
                                        </Button>
                                    </Link>
                                    <Link color="inherit" href="#" style={{ textDecoration: 'none' }}>
                                        <Button variant="outlined" startIcon={<PasswordIcon />} color="secondary">
                                            Change Password
                                        </Button>
                                    </Link>
                                </ButtonGroup>
                            </Grid>
                            <Grid item sm={2}></Grid>
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
                                                    <TextField fullWidth variant="outlined" disabled value="User_00" label="Username" />
                                                </Grid>
                                                <Grid item sm={8}>
                                                    <TextField fullWidth variant="outlined" disabled value="01/01/2021" label="Date of Birth" />
                                                </Grid>
                                                <Grid item sm={4}>
                                                    <IconButton aria-label="male" style={{ marginRight: '20px' }} color="secondary">
                                                        <MaleIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="female" disabled>
                                                        <FemaleIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <TextField fullWidth variant="outlined" label="First Name" defaultValue="Test" type="text" required />
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <TextField fullWidth variant="outlined" label="Last Name" defaultValue="User" type="text" required />
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <TextField fullWidth variant="outlined" label="Email" defaultValue="usermail@mail.com" type="email" required />
                                                </Grid>
                                                <Grid item sm={3}>
                                                    <TextField fullWidth variant="outlined" label="Area Code" defaultValue="+20" type="text" required />
                                                </Grid>
                                                <Grid item sm={9}>
                                                    <TextField fullWidth variant="outlined" label="Phone Number" defaultValue="0000000000" type="tel" required />
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <TextField fullWidth variant="outlined" label="Country/Region" defaultValue="Egypt" type="text" required />
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <TextField fullWidth variant="outlined" label="Passport Number" defaultValue="123456789" type="text" required />
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
                                        <Paper elevation={2} variant="outlined" style={{ padding: '30px', marginTop: '30px', borderRadius: '1rem', width: '650px', marginLeft: '-200px' }}>
                                            <Box>
                                                <Grid container spacing={2}>
                                                    <Grid item sm={10}>
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={5}>
                                                                <Typography variant="h6" component="h6">Cairo</Typography>
                                                            </Grid>
                                                            <Grid item sm={2}>
                                                                <CompareArrowsIcon />
                                                            </Grid>
                                                            <Grid item sm={5}>
                                                                <Typography variant="h6" component="h6">Los Angeles</Typography>
                                                            </Grid>
                                                            <Grid item sm={5}>
                                                                <Typography variant="h6" component="h6">11/11/2021 5:00AM</Typography>
                                                            </Grid>
                                                            <Grid item sm={2}>
                                                                <AccessTimeIcon />
                                                            </Grid>
                                                            <Grid item sm={5}>
                                                                <Typography variant="h6" component="h6">20/11/2021 7:30PM</Typography>
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <AirlineSeatReclineNormalIcon />
                                                                <Typography variant="h6" component="h6">4 Seats</Typography>
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <AttachMoneyIcon />
                                                                <Typography variant="h6" component="h6">12,000 EGP</Typography>
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <AirlineSeatReclineExtraIcon />
                                                                <Typography variant="h6" component="h6">Business</Typography>
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
                                        <Paper elevation={2} variant="outlined" style={{ padding: '30px', marginTop: '30px', borderRadius: '1rem', width: '650px', marginLeft: '-200px' }}>
                                            <Box>
                                                <Grid container spacing={2}>
                                                    <Grid item sm={10}>
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={5}>
                                                                <Typography variant="h6" component="h6">Cairo</Typography>
                                                            </Grid>
                                                            <Grid item sm={2}>
                                                                <CompareArrowsIcon />
                                                            </Grid>
                                                            <Grid item sm={5}>
                                                                <Typography variant="h6" component="h6">Los Angeles</Typography>
                                                            </Grid>
                                                            <Grid item sm={5}>
                                                                <Typography variant="h6" component="h6">11/11/2021 5:00AM</Typography>
                                                            </Grid>
                                                            <Grid item sm={2}>
                                                                <AccessTimeIcon />
                                                            </Grid>
                                                            <Grid item sm={5}>
                                                                <Typography variant="h6" component="h6">20/11/2021 7:30PM</Typography>
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <AirlineSeatReclineNormalIcon />
                                                                <Typography variant="h6" component="h6">4 Seats</Typography>
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <AttachMoneyIcon />
                                                                <Typography variant="h6" component="h6">12,000 EGP</Typography>
                                                            </Grid>
                                                            <Grid item sm={4}>
                                                                <AirlineSeatReclineExtraIcon />
                                                                <Typography variant="h6" component="h6">Business</Typography>
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
                                    </TabPanel>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </div>
        </>
    )
}
