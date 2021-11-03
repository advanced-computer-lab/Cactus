import React, {useState} from 'react';
import { Container, Divider } from '@mui/material';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AdminNavBar from '../../../Components/Admin/AdminNavBar'
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

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
            <Container>
                <AdminNavBar />
                <br />
                <h1>Edit Flight Info</h1>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
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
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Departure Date"
                            fullWidth
                            type="date"
                            value=""
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Arrival Time"
                            fullWidth
                            placeholder="Arrival Time"
                            type="time"
                            value=""
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Arrival Date"
                            fullWidth
                            type="date"
                            value=""
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Number Of Economy Seats"
                            fullWidth
                            placeholder="Number Of Economy Seats"
                            value=""
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Number Of Business Seats"
                            fullWidth
                            placeholder="Number Of Business Seats"
                            value=""
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
                    </div>
                </Box>
                <Divider/>
                <br/>
                <Button variant="contained" color="info" size="large" onClick={handleClick}>Save Changes</Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    Flight Has Been Edited Successfully!
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
}

export default EditFlight
