import {
    Button,
    Grid,
    Paper,
    Typography
} from '@mui/material'
import {
    Box
} from '@mui/system'
import ScheduleIcon from '@mui/icons-material/Schedule';
import Search from './Logic/Search'
import React from 'react';

export default function DepartureFlights(props) {
    const { handleDepartureFlight } = Search()
    return ( 
        <div>
        {props.flight.length === 0 ? <div><h2>No available flights</h2></div> : props.flight.map((flight) =>
            <>
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h4" component="h4" color="primary">Select your departure flight from</Typography>
                    <Typography variant="h5" component="h5" color="primary">{props.flight.departureAirport} to {props.flight.destinationAirport}</Typography>
                    <Typography variant="legend" component="legend" color="primary">{props.flight.departureDate}</Typography>
                </Box>
                <Paper elevation={3} square style={{ borderRadius: '1rem', marginTop: '50px', padding: '30px', maxHeight: '300px' }}>
                    <Box sx={{ width: '100%' }}>
                        <Grid container spacing={5}>
                            <Grid item sx={4}>
                                <Box style={{ display: "flex", flexDirection: "column" }}>
                                    <Typography color="secondary" variant="h4" component="h4">{props.flight.departureTime} {props.flight.departureAirport}</Typography>
                                    <Typography component="legend" >{props.flight.flightNumber}</Typography>
                                </Box>
                            </Grid>
                            <Grid item sx={1} style={{ marginTop: '20px' }}>
                                <ScheduleIcon />
                                <Typography component="legend">14H</Typography>
                            </Grid>
                            <Grid item sx={4}>
                                <Typography color="secondary" variant="h4" component="h4">{props.flight.arrivalTime} {props.flight.destinationAirport}</Typography>
                                <Typography component="legend" >{flight.flightNumber}</Typography>
                            </Grid>
                            <Grid item sx={3}>
                                <Paper elevation={2} square style={{
                                    borderRadius: '1rem', padding: '30px', marginLeft: '200px',
                                    display: 'flex', flexDirection: 'column', width: '500px'
                                }}>
                                    <Typography color="secondary" variant="h3" component="h3">{cabin === "economy" ? props.flight.economyPrice : props.flight.businessPrice} EGP <span>/person</span></Typography>
                                    <br />
                                    <Button variant="outlined" fullWidth onClick={handleReturnFlight}>Select Flight</Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </>
        )}  
        </div>
    )
}