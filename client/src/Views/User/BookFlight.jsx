import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CountryAirports from '../../Components/User/CountryAirports'
import DateRange from '../../Components/User/DateRange'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button, ButtonGroup, Divider, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import FindFlights from '../../Components/User/FindFlights';
// import UserFlightTimeLine from '../../Components/User/UserFlightTimeLine';

import './BookFlight.css';

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

function BookFlight() {
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [counter, setCounter] = React.useState(1);
    const [search, setSearch] = React.useState(false)

    const [counterChild, setCounterChild] = React.useState(1);

    const handleIncrementChild = () => {
        setCounterChild(counterChild + 1)
    };

    const handleDecrementChild = () => {
        if (counterChild !== 1) {
            setCounterChild(counterChild - 1)
        }
        else {
            setCounterChild(1)
        }
    }

    const handleIncrement = () => {
        setCounter(counter + 1)
    };

    const handleDecrement = () => {
        if (counter !== 1) {
            setCounter(counter - 1)
        }
        else {
            setCounter(1)
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Paper elevation={1} square style={{ borderRadius: '1rem', marginTop: '50px' }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="Booking tabs" indicatorColor="secondary">
                            <Tab icon={<FlightTakeoffIcon />} iconPosition='start' label="BOOK FLIGHT" {...a11yProps(0)} />
                            <Tab icon={<EventNoteIcon />} iconPosition='start' label="MY TRIPS" {...a11yProps(1)} />

                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Grid container spacing={1}>
                            <Grid item lg={3}>
                                <CountryAirports name="From" />
                            </Grid>
                            <Grid item lg={3}>
                                <CountryAirports name="To" />
                            </Grid>
                            <Grid item lg={4}>
                                <DateRange />
                            </Grid>
                            <Grid item lg={2}>
                                <Button variant="outlined" onClick={handleClickOpen} className="button">
                                    Passenger/Cabin
                                </Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogContent>
                                        <Typography component="legend">Passengers</Typography>
                                        <br />
                                        <Grid container spacing={2}>
                                            <Grid item sx={2}>
                                                <Typography variant="h6" component="h6">Adults (12+ years)</Typography>
                                            </Grid>
                                            <Grid item sx={6}>
                                                <ButtonGroup size="small" aria-label="small outlined button group" style={{ marginLeft: '13px' }}>
                                                    <Button onClick={handleDecrement}>-</Button>
                                                    <Button >{counter}</Button>
                                                    <Button onClick={handleIncrement}>+</Button>

                                                </ButtonGroup>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item sx={2}>
                                                <Typography variant="h6" component="h6">Child (2-11 years)</Typography>
                                            </Grid>
                                            <Grid item sx={6}>
                                                <ButtonGroup size="small" aria-label="small outlined button group" style={{ marginLeft: '20px' }}>
                                                    <Button onClick={handleDecrementChild}>-</Button>
                                                    <Button >{counterChild}</Button>
                                                    <Button onClick={handleIncrementChild}>+</Button>

                                                </ButtonGroup>
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Divider variant="middle" />
                                        <br />
                                        <FormControl component="fieldset">
                                            <Typography component="legend">Cabin</Typography>
                                            <br />
                                            <RadioGroup
                                                aria-label="economy"
                                                defaultValue="economy"
                                                name="radio-buttons-group"
                                            >
                                                <FormControlLabel value="economy" control={<Radio />} label="Economy" />
                                                <FormControlLabel value="business" control={<Radio />} label="Business" />
                                            </RadioGroup>
                                        </FormControl>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="success">Confirm</Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            <Grid item lg={10}></Grid>
                            <Grid item lg={2}>
                                <Button variant="contained" endIcon={<FlightTakeoffIcon />} className="searchButton"
                                    onClick={() => setSearch(true)}
                                >
                                    Show Flights
                                </Button>
                            </Grid>
                        </Grid>
                        {search ?
                            <>
                                <FindFlights />
                            </>
                            :
                            <></>
                        }

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                </Box>
            </Paper>
        </>
    );
}
export default BookFlight;