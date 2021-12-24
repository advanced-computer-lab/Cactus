import React from 'react'
import { Box, Paper, Typography, Grid, Button} from '@mui/material'
import { useHistory } from "react-router"

function Unauthorized() {
    const history = useHistory()
    return (
        <div>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
                <Paper
                    elevation={3}
                    style={{
                        borderRadius: '1rem',
                        height: '200px',
                        padding: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Grid container spacing={2}>
                        <Grid item lg={12}>
                            <Typography variant="h2" color="error">
                                 401 Unauthorized - Please Login or Sign up
                            </Typography>
                        </Grid>
                        <Grid item lg={6}></Grid>
                        <Grid item lg={6}>
                            <Button variant="outlined" onClick={()=>{
                                history.push("/Login")
                            }} color="error" fullWidth>Login</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </div>
    )
}

export default Unauthorized
