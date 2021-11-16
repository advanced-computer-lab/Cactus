import { React, useState} from 'react'
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Paper } from '@mui/material';
import FlightSearch from './FlightSearch';
import DepartureFlights from './DepartureFlights';
import ReturnFlights from './ReturnFlights'
import FlightSummary from './FlightSummary'
import Search from './Logic/Search'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventNoteIcon from '@mui/icons-material/EventNote';

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



export default function NavigationTabs() {
    const [value, setValue] = useState(0);
    const { flightsFound, departureFlightSelected, depFlights, retFlights} = Search()
    // const [returnFlightSelected, setReturnFlightSelected] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Paper elevation={1} square style={{ borderRadius: '1rem', marginTop: '50px' }}>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="Booking tabs" indicatorColor="secondary">
                            <Tab icon={<FlightTakeoffIcon />} iconPosition='start' label="BOOK FLIGHT" {...a11yProps(0)} />
                            <Tab icon={<EventNoteIcon />} iconPosition='start' label="MY TRIPS" {...a11yProps(1)} />

                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <FlightSearch />
                        {flightsFound ?
                            <>
                                <DepartureFlights flight={depFlights}/>
                            </>
                            :
                            <></>
                        }
                        {departureFlightSelected ?
                            <>
                                <ReturnFlights flight={retFlights}/>
                            </>
                            :
                            <></>
                        }
                        {/* {returnFlightSelected ?
                            <>
                                <FlightSummary />
                            </>
                            :
                            <></>
                        } */}

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        User Flights?
                    </TabPanel>

                </Box>

            </Paper>
        </div>
    )
}
