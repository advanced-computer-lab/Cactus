import React, { useState } from 'react';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AdminNavBar from '../../../Components/Admin/AdminNavBar'
import Alert from '@mui/material/Alert';
import { Snackbar, Typography, Container, Divider } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

function EditFlight() {
    const [open, setOpen] = React.useState(false);
    const handleClick = (e) => {
        e.preventDefault()
        setOpen(true);

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <div>
            <AdminNavBar />
            <Container>

                <br />
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
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
                    <br/>
                    <Typography component="h1" variant="h5">
                        Edit Flight
                    </Typography>

                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <TextField
                            id="outlined-multiline-flexible"
                            label="Flight Number"
                            fullWidth
                            placeholder="Flight Number"
                            value=""
                            disabled
                        />
                        <br />
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
                        <TextField
                            id="outlined-textarea"
                            label="Departure Airport"
                            fullWidth
                            placeholder="Departure Airport"
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Destination Airport"
                            fullWidth
                            placeholder="Destination Airport"
                        />
                    </Box>
                    <Divider />
                    <br />
                    <Button variant="contained" color="info" size="large" onClick={handleClick}>Save Changes</Button>
                </Box>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                        Flight Has Been Edited Successfully!
                    </Alert>
                </Snackbar>
            </Container>
        </div >
    )
}

export default EditFlight
