import React, { useState } from 'react';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import AdminNavBar from '../../../Components/Admin/AdminNavBar'
import Alert from '@mui/material/Alert';
import { Snackbar, Typography, Divider } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, Paper } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

function EditFlight() {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] =React.useState(false);
    const handleClick = (e) => {
        e.preventDefault()
        setOpen(true);
        setLoading(true);

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setLoading(false)
            return;
        }
        setLoading(false)
        setOpen(false);
    };
    return (
        <div>
            <AdminNavBar />
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <br />
                <Paper
                    elevation={3}
                    variant="outlined"
                    square
                    style={{ borderRadius: '2rem' }}>
                    <br />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            marginLeft: '25px',
                            marginBottom: '10px'
                        }}
                    >
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                href="/adminHome"
                            >
                                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                Home
                            </Link>
                            <Link
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                href="/AddFlight"
                            >
                                <AddCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                Add Flight
                            </Link>
                            <Link
                                underline="hover"
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="inherit"
                                href="/FindFlight"
                            >
                                <SearchIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                View All Flights
                            </Link>
                            <Typography
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color="secondary"
                            >
                                <EditIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                                Edit Flight
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                    <Divider variant="middle" />
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Flight Number"
                                fullWidth
                                placeholder="Flight Number"
                                value=""
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Departure Time"
                                fullWidth
                                placeholder="Departure Time"
                                type="time"
                                value=""
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Departure Date"
                                fullWidth
                                type="date"
                                value=""
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Arrival Time"
                                fullWidth
                                placeholder="Arrival Time"
                                type="time"
                                value=""
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Arrival Date"
                                fullWidth
                                type="date"
                                value=""
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Number Of Economy Seats"
                                fullWidth
                                placeholder="Number Of Economy Seats"
                                value=""
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Number Of Business Seats"
                                fullWidth
                                placeholder="Number Of Business Seats"
                                value=""
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Departure Airport"
                                fullWidth
                                placeholder="Departure Airport"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="outlined-textarea"
                                label="Destination Airport"
                                fullWidth
                                placeholder="Destination Airport"
                            />

                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={4}>
                            <LoadingButton
                                color="info"
                                onClick={handleClick}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                                style={{ maxHeight: 'inherit' }}
                                fullWidth
                            >
                                Save Changes
                            </LoadingButton>
                        </Grid>
                    </Grid>
                    <br />
                </Paper>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    Flight Has Been Edited Successfully!
                </Alert>
            </Snackbar>
        </div >
    )
}

export default EditFlight
