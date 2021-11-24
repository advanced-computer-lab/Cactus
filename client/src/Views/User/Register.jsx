import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Avatar } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CountryBox from '../../Components/User/CountryBox'
import AreaCodeBox from '../../Components/User/AreaCodeBox'
import UserNavBar from '../../Components/User/UserNavBar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



let index = 0;

function Register() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [title, setTitle] = React.useState('');
    // const [date, setDate] = React.useState(new Date());
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        retypePassword: '',
        showRetypePassword: false
    });

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleRetypePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleClickShowRetypePassword = () => {
        setValues({
            ...values,
            showRetypePassword: !values.showRetypePassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    const handleMouseDownRetypePassword = (event) => {
        event.preventDefault();
    }

    const handleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleNext = () => {
        index++;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        index--;
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        index = 0;
        setActiveStep(0);
    };
    return (
        <div >
            <UserNavBar />
            <div style={{ display: "flex", justifyContent: "center", marginTop: '30px' }}>

                <Paper elevation={3}
                    variant="outlined"
                    square
                    style={{ borderRadius: '1rem', width: '1000px', padding: '30px' }}
                >
                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                    </Box>
                    <Box sx={{ maxWidth: 800 }} style={{ marginLeft: '70px' }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            <Step key="credentials">
                                <StepLabel>
                                    <Typography variant="caption">Your Credentials</Typography>
                                </StepLabel>
                                {/* credentials */}
                                <StepContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={6}>
                                            <TextField
                                                required
                                                id="username"
                                                label="Username"
                                                placeholder="Username"
                                                type="text"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={6}></Grid>
                                        <Grid item lg={12}>
                                            <TextField
                                                required
                                                id="email"
                                                label="Email Address"
                                                placeholder="user@email.com"
                                                type="email"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={6}>
                                            <FormControl sm={{ m: 1 }} variant="outlined" fullWidth>
                                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    type={values.showPassword ? 'text' : 'password'}
                                                    fullWidth
                                                    value={values.password}
                                                    onChange={handlePasswordChange('password')}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <FormControl sm={{ m: 1 }} variant="outlined" fullWidth>
                                                <InputLabel htmlFor="outlined-adornment-password">Retype Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    type={values.showRetypePassword ? 'text' : 'password'}
                                                    fullWidth
                                                    value={values.retypePassword}
                                                    onChange={handleRetypePasswordChange('retypePassword')}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowRetypePassword}
                                                                onMouseDown={handleMouseDownRetypePassword}
                                                                edge="end"
                                                            >
                                                                {values.showRetypePassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Retype Password"
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4}>
                                            <AreaCodeBox />
                                        </Grid>
                                        <Grid item lg={8}>
                                            <TextField
                                                required
                                                id="phoneNumber"
                                                label="Phone Number"
                                                placeholder="XXXXXXXX"
                                                type="tel"
                                                fullWidth
                                            />
                                        </Grid>

                                    </Grid>
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === 2 ? 'Finish' : 'Continue'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                            <Step key="personalDetails">
                                <StepLabel>
                                    <Typography variant="caption">Your Personal Information</Typography>
                                </StepLabel>
                                {/* Personal Info */}
                                <StepContent>
                                    <Box>
                                        <Grid container spacing={2}>
                                            <Grid item lg={2}>
                                                <FormControl sm={{ m: 1 }} fullWidth>
                                                    <InputLabel id="demo-simple-select-helper-label">Title</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-helper-label"
                                                        id="demo-simple-select-helper"
                                                        value={title}
                                                        label="Title"
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value="MR">MR</MenuItem>
                                                        <MenuItem value="MISS">MISS</MenuItem>
                                                        <MenuItem value="MRS">MRS</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item lg={5}>
                                                <TextField
                                                    required
                                                    id="firstName"
                                                    label="First Name"
                                                    placeholder="First Name (as per passport)"
                                                    type="text"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item lg={5}>
                                                <TextField
                                                    required
                                                    id="lastName"
                                                    label="Last Name"
                                                    placeholder="Last Name (as per passport)"
                                                    type="text"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item lg={12}>
                                                <TextField
                                                    id="outlined-textarea"
                                                    label="Passport Number"
                                                    fullWidth
                                                    type="text"
                                                    required
                                                />
                                            </Grid>
                                            <Grid item lg={12}>
                                                <CountryBox />
                                            </Grid>
                                            <Grid item lg={7}>
                                                <TextField
                                                    id="outlined-textarea"
                                                    label="Date of Birth"
                                                    fullWidth
                                                    type="date"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item lg={4}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend" style={{ textAlign: 'start' }}>Gender</FormLabel>
                                                    <RadioGroup row-aria-label="gender" name="row-radio-button-group" row>
                                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === 1 ? 'Finish' : 'Continue'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        </Stepper>
                        {activeStep === 1 && (
                            <Paper square elevation={0} lg={{ p: 3 }}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                    Reset
                                </Button>
                            </Paper>
                        )}
                    </Box>
                </Paper>
            </div>
        </div>
    )
}

export default Register