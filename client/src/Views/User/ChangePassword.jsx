import React from 'react'
import UserNavBar from '../../Components/User/UserNavBar'
import { Box, Button, ButtonGroup, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import { useHistory } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios'
const crypto=require('crypto')

function ChangePassword() {
    const history = useHistory();
    const [password, setPassword] = React.useState({
        password: '',
        showPassword: false,
        retypePassword: '',
        showRetypePassword: false
    });
    const {loggedUser, setLoggedUser} = React.useContext(UserContext)
    const decipher = crypto.createDecipher('aes192','a password');

    var encrypted = loggedUser.password;//Write Here Encrypted password to be Decrypted

    var decrypted = decipher.update(encrypted,'hex','utf8');
    decrypted = decrypted + decipher.final('utf8');
    const oldPass = decrypted
    const handlePasswordChange = (prop) => (event) => {
        setPassword({ ...password, [prop]: event.target.value });
    };
    const handleRetypePasswordChange = (prop) => (event) => {
        setPassword({ ...password, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setPassword({
            ...password,
            showPassword: !password.showPassword,
        });
    };
    const handleClickShowRetypePassword = () => {
        setPassword({
            ...password,
            showRetypePassword: !password.showRetypePassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    const handleMouseDownRetypePassword = (event) => {
        event.preventDefault();
    }
    const handleChangePassword = () => {
        const data = {"password": password.password, "id":loggedUser._id}
        console.log(data)
        axios.post('/Authentication/changePassword',data)
        .then((res) => {if(res.data === "good")console.log("good")} )
    }

    return (
        <div>
            <UserNavBar />
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paper elevation={3} style={{ borderRadius: '1rem', padding: '30px', marginTop: '30px', width: '800px' }}>
                    <Grid container spacing={5}>
                        <Grid item lg={12}>
                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h3">
                                    Change Password
                                </Typography>
                                <Divider variant="middle" />
                            </Box>
                        </Grid>
                        <Grid item lg={12}>
                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ButtonGroup
                                    color="secondary"
                                    aria-label="navigation"
                                >
                                    <Button
                                        variant="outlined"
                                        startIcon={<HomeIcon />}
                                        color="secondary"
                                        onClick={() => {
                                            history.push("/");
                                        }}
                                    >
                                        Home
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<PersonIcon />}
                                        color="secondary"
                                        onClick={() => {
                                            history.push("/UserProfile");
                                        }}
                                    >
                                        My Profile
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<FlightTakeoffIcon />}
                                        color="secondary"
                                        onClick={() => {
                                            history.push("/BookFlight");
                                        }}
                                    >
                                        Book Flight
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<PasswordIcon />}
                                        disabled
                                    >
                                        Change Password
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        </Grid>
                        <Grid item lg={12}>
                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TextField
                                    variant="outlined"
                                    value={oldPass}
                                    label="Old Password"
                                    fullWidth
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={12}>
                            <FormControl sm={{ m: 1 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={password.showPassword ? 'text' : 'password'}
                                    fullWidth
                                    value={password.password}
                                    onChange={handlePasswordChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {password.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item lg={12}>
                            <FormControl sm={{ m: 1 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Retype Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={password.showRetypePassword ? 'text' : 'password'}
                                    fullWidth
                                    value={password.retypePassword}
                                    onChange={handleRetypePasswordChange('retypePassword')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowRetypePassword}
                                                onMouseDown={handleMouseDownRetypePassword}
                                                edge="end"
                                            >
                                                {password.showRetypePassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Retype Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item lg={6}></Grid>
                        <Grid item lg={6}>
                            <Button variant="outlined" color="success" 
                            onClick={handleChangePassword}
                            fullWidth>Confirm</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </div>
    )
}

export default ChangePassword
