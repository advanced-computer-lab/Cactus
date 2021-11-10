import React from 'react'
import { ButtonGroup, Divider, Paper } from '@mui/material'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography'
import UserNavBar from '../../Components/User/UserNavBar'
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PasswordIcon from '@mui/icons-material/Password';
import TextField from '@mui/material/TextField'
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { IconButton } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Link } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import EventNoteIcon from '@mui/icons-material/EventNote'
import Schedule from './Schedule.ts'
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div>
                <UserNavBar />
            </div>
            <Grid container spacing={2}>
                <Grid item sm={7}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Paper
                            elevation={2}
                            square
                            variant="outlined"
                            style={{ padding: '30px', marginTop: '30px', borderRadius: '1rem', width: '700px' }}
                        >
                            <Box >
                                <Grid container spacing={1}>
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
                                                    <Tab icon={<EventNoteIcon />} iconPosition='start' label="Bookings" {...a11yProps(1)} />
                                                    <Tab icon={<EventNoteIcon />} iconPosition='start' label="Upcoming Flights" {...a11yProps(2)} />
                                                </Tabs>
                                            </Box>
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
                                            <TabPanel value={value} index={1}>
                                                {/* <Box>
                                            <Grid container spacing={2}>
                                                <Grid item sm={6}>
                                                    <Timeline position="alternate">
                                                        <TimelineItem>
                                                            <TimelineSeparator>
                                                                <TimelineDot color="secondary" />
                                                                <TimelineConnector />
                                                            </TimelineSeparator>
                                                            <TimelineContent>CAI</TimelineContent>
                                                        </TimelineItem>
                                                        <TimelineItem>
                                                            <TimelineSeparator>
                                                                <TimelineDot color="success" />
                                                            </TimelineSeparator>
                                                            <TimelineContent>LAX</TimelineContent>
                                                        </TimelineItem>
                                                    </Timeline>
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <Button variant="outlined" fullWidth color="error">Cancel</Button>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item sm={6}>
                                                    <Timeline position="alternate">
                                                        <TimelineItem>
                                                            <TimelineSeparator>
                                                                <TimelineDot color="secondary" />
                                                                <TimelineConnector />
                                                            </TimelineSeparator>
                                                            <TimelineContent>CAI</TimelineContent>
                                                        </TimelineItem>
                                                        <TimelineItem>
                                                            <TimelineSeparator>
                                                                <TimelineDot color="success" />
                                                            </TimelineSeparator>
                                                            <TimelineContent>LAX</TimelineContent>
                                                        </TimelineItem>
                                                    </Timeline>
                                                </Grid>
                                                <Grid item sm={6}>
                                                    <Button variant="outlined" fullWidth color="error">Cancel</Button>
                                                </Grid>
                                            </Grid>
                                        </Box> */}
                                                Flight Reservations will go here
                                            </TabPanel>
                                            <TabPanel value={value} index={2}></TabPanel>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </div>
                </Grid>
                <Grid item sm={5}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Schedule />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
