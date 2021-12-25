import React, { useContext, useState, useEffect } from 'react'
import { Button, Grid, Paper, Typography, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { Box } from '@mui/system'
import MasksIcon from '@mui/icons-material/Masks';
import './UserHomepage.css'
import WifiIcon from '@mui/icons-material/Wifi';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useLocation } from 'react-router-dom'
import { useHistory } from "react-router";
import suitcase from '../../Images/whiteSuitcase.png'
import { UserContext } from '../../Context/UserContext';

function UserHomepage() {
    const [open, setOpen] = useState(false);
    const location = useLocation()
    const history = useHistory()
    useEffect(() => {
        const checker = () => {
            if (location.state) {
                setOpen(location.state.finished)
            }
        }
        checker()
    }, [location.state])
    
    const handleClose = () => {
        setOpen(false);
    };
    const {loggedUser } = useContext(UserContext)

    const handleRegisterProfile = (e) =>{
        if(loggedUser.user){
            history.push("/UserProfile")
        }
        else{
            history.push("/Register")
        }
    }
    return (
        <div>
            <Paper elevation={4} style={{
                backgroundImage: 'linear-gradient(to bottom right, #004080, purple)',
                borderBottomRightRadius: "10rem", borderTopLeftRadius: "2rem",
                borderTopRightRadius: "2rem", borderBottomLeftRadius: "2rem",
                height: "350px", marginTop: "50px"
            }}
            >
                <Grid container spacing={3}>
                    <Grid item sm={8}>
                        <Box style={{ display: 'flex', flexDirection: 'column', padding: '50px' }}>
                            <Typography variant="h2" style={{ color: "white" }}>
                                Cactus Airlines
                            </Typography>
                            <Typography variant="subtitle1" style={{ color: 'white' }}>
                                Explore The Sky
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item sm={4}>
                        <img src={suitcase} alt="plane" style={{marginLeft: '-300px'}}/>
                    </Grid>
                    <Grid item sm={6}>
                        <Box style={{ padding: '50px', marginTop: '-200px' }}>
                            <Button
                                variant="contained"
                                color="white"
                                style={{ height: '60px', width: '150px' }}
                                onClick={() => {
                                    history.push("/BookFlight")
                                }}
                            >
                                Book a Flight
                            </Button>

                            <Button
                                variant="outlined"
                                color="white"
                                style={{ height: '60px', width: '150px', marginLeft: '30px' }}
                                onClick={handleRegisterProfile}
                            >
                                {loggedUser.user ? "My Profile" : "Sign Up"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <Box style={{ padding: '50px' }}>
                <Grid container spacing={3}>
                    <Grid item sm={3}>
                        <Box >
                            <Typography variant="h3">
                                Why we <br /> are better <br /> than others
                            </Typography>
                            <Typography variant="subtitle1">
                                {"Cactus Airlines offers you premium flights all around the world for affordable prices"}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item sm={3}>
                        <Paper elevation={6} style={{ height: '250px', width: '200px', borderRadius: '2rem', marginLeft: '40px', padding: '20px' }}>
                            <MasksIcon style={{ width: '150px', height: '150px', marginLeft: '20px' }} color="secondary" />
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                Your safety is our number one priority
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={3}>
                        <Paper elevation={6} style={{ height: '250px', width: '200px', borderRadius: '2rem', marginTop: '50px', padding: '20px' }}>
                            <WifiIcon style={{ width: '150px', height: '150px', marginLeft: '20px' }} color="secondary" />
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                Stay connected while 38,000 feet in the air
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={3}>
                        <Paper elevation={6} style={{ height: '250px', width: '200px', borderRadius: '2rem', marginLeft: '-40px', padding: '20px' }}>
                            <TravelExploreIcon style={{ width: '150px', height: '150px', marginLeft: '20px' }} color="secondary" />
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                Just pick one of 195 countries and we will take you there
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Registeration Process Incomplete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        It looks like there's some information missing about you.
                        Please finish your registeration process by filling them out.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}color="warning">Later</Button>
                    <Button onClick={()=>history.push("/UserInfo")} autoFocus color="success">
                       Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UserHomepage
