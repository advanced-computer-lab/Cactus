import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import UserNavBar from '../../Components/User/UserNavBar'

function Unauthorized() {
    return (
        <div>
            <UserNavBar />
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
                    <Typography variant="h2" color="error">
                        401 Unauthorized - Please Login or Sign up
                    </Typography>
                </Paper>
            </Box>
        </div>
    )
}

export default Unauthorized
