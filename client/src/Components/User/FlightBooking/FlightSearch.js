import { React } from 'react'
import { Grid, Button, CircularProgress } from '@mui/material';
import FlightTakeoff from '@mui/icons-material/FlightTakeoff';
import FromCountrySelect from './FromCountrySelect';
import ToCountrySelect from './ToCountrySelect';
import DateRangePicker from './DateRangePicker';
import PassengerCabin from './PassengerCabin';
import './FlightSearch.css'
import Search from './Logic/Search'

export default function FlightSearch() {
    const { isFetching, handleSearch } = Search()

    return (
        <div>
            <Grid container spacing={1}>
                {/* From */}
                <Grid item lg={3}>
                    <FromCountrySelect name="From"/>
                </Grid>
                {/* To */}
                <Grid item lg={3}>
                    <ToCountrySelect name="To" />
                </Grid>
                {/* Dates */}
                <Grid item lg={4}>
                    <DateRangePicker />
                </Grid>
                {/* Cabin and Seats */}
                <Grid item lg={2}>
                    <PassengerCabin />
                </Grid>
                <Grid item lg={10}></Grid>
                <Grid item lg={2}>
                    <Button variant="contained" endIcon={<FlightTakeoff />} className="searchButton"
                        onClick={handleSearch}
                    >
                        {isFetching ? <CircularProgress color="primary" /> : "Show Flights"}
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
