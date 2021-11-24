import React, { useState } from "react";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Button } from "@mui/material";
import UserFlightTimeLine from "./UserFlightTimeLine";

function FindFlights(flight) {
    const [depSelected, setDepSelected] = useState(false)
    const [returnSelected, setReturnSelected] = useState(false)
    return (
        <div>
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h4" component="h4" color="primary">Select your departure flight from</Typography>
                <Typography variant="h5" component="h5" color="primary">CAIRO to LOS ANGELES</Typography>
                <Typography variant="legend" component="legend" color="primary">Wed, 10 Nov 2021</Typography>
            </Box>
            <Paper elevation={3} square style={{ borderRadius: '1rem', marginTop: '50px', padding: '30px', maxHeight: '300px' }}>
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={5}>
                        <Grid item sx={4}>
                            <Box style={{ display: "flex", flexDirection: "column" }}>
                                <Typography color="secondary" variant="h4" component="h4">02:00 CAI</Typography>
                                <Typography component="legend" >Cairo</Typography>
                                <Typography component="legend" >C001</Typography>
                            </Box>
                        </Grid>
                        <Grid item sx={1} style={{ marginTop: '20px' }}>
                            <ScheduleIcon />
                            <Typography component="legend">14H</Typography>
                        </Grid>
                        <Grid item sx={4}>
                            <Typography color="secondary" variant="h4" component="h4">16:00 LAX</Typography>
                            <Typography component="legend" >Los Angeles</Typography>
                            <Typography component="legend" >C001</Typography>
                        </Grid>
                        <Grid item sx={3}>
                            <Paper elevation={2} square style={{
                                borderRadius: '1rem', padding: '30px', marginLeft: '200px',
                                display: 'flex', flexDirection: 'column', width: '500px'
                            }}>
                                <Typography color="secondary" variant="h3" component="h3">9,000 EGP</Typography>
                                <br />
                                <Button variant="outlined" fullWidth onClick={() => setDepSelected(true)}>Select Flight</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            {depSelected ?
                <>
                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                        <Typography variant="h4" component="h4" color="primary">Select your return flight from</Typography>
                        <Typography variant="h5" component="h5" color="primary">LOS ANGELES to CAIRO</Typography>
                        <Typography variant="legend" component="legend" color="primary">Wed, 17 Nov 2021</Typography>
                    </Box>
                    <Paper elevation={3} square style={{ borderRadius: '1rem', marginTop: '50px', padding: '30px', maxHeight: '300px' }}>
                        <Box sx={{ width: '100%' }}>
                            <Grid container spacing={5}>
                                <Grid item sx={4}>
                                    <Box style={{ display: "flex", flexDirection: "column" }}>
                                        <Typography color="secondary" variant="h4" component="h4">02:00 CAI</Typography>
                                        <Typography component="legend" >Cairo</Typography>
                                        <Typography component="legend" >C001</Typography>
                                    </Box>
                                </Grid>
                                <Grid item sx={1} style={{ marginTop: '20px' }}>
                                    <ScheduleIcon />
                                    <Typography component="legend">14H</Typography>
                                </Grid>
                                <Grid item sx={4}>
                                    <Typography color="secondary" variant="h4" component="h4">16:00 LAX</Typography>
                                    <Typography component="legend" >Los Angeles</Typography>
                                    <Typography component="legend" >C001</Typography>
                                </Grid>
                                <Grid item sx={3}>
                                    <Paper elevation={2} square style={{
                                        borderRadius: '1rem', padding: '30px', marginLeft: '200px',
                                        display: 'flex', flexDirection: 'column', width: '500px'
                                    }}>
                                        <Typography color="secondary" variant="h3" component="h3">9,000 EGP</Typography>
                                        <br />
                                        <Button variant="outlined" fullWidth onClick={()=>setReturnSelected(true)}>Select Flight</Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </>
                :
                <></>
            }
            {returnSelected ?
                <>
                    <UserFlightTimeLine />
                </>
                :
                <></>}
        </div>
    )
}

export default FindFlights
