import React from 'react'
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';




function AdminNavBar() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link color="inherit" href="/AdminHome" style={{ textDecoration: 'none', flexGrow: 1 }}>
              {/* <img src="../../../public/logo5.png" width="30" height="30" /> */}
              <Typography variant="h6" component="div" align="left">
                Cactus Airlines
              </Typography>
            </Link>
            <Link color="inherit" href="/Login" style={{ textDecoration: 'none' }}>
              <Button color="inherit" variant="outlined" align="right">Logout</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default AdminNavBar
