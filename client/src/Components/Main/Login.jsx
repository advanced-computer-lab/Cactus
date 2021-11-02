import React from 'react'
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Login() {
    return (
        <div>
            <Container>
                <h1>Login</h1>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Username"

                            fullWidth
                            placeholder="Please Enter Your User Name"
                        />
                        <TextField
                            id="outlined-textarea"
                            label="Password"
                            fullWidth
                            placeholder="Please Enter Your Password"
                            type="password"
                        />
                    </div>

                    <Button variant="contained" color="primary">Don't Have an account? Register</Button>
                    <Button variant="outlined">Login</Button>
                </Box>
            </Container>
        </div>
    )
}

export default Login
