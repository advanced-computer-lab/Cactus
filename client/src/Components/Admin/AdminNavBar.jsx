import React from 'react'
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



function AdminNavBar() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" align="left" sx={{ flexGrow: 1 }}>
              LogoHere
            </Typography>
            <Link to="/AddFlight">
              <Button color="inherit">Add Flight</Button>
            </Link>
            <Link to="/EditFlight">
              <Button color="inherit">Edit Flight</Button>
            </Link>
            <Link to="/FindFlight">
              <Button color="inherit">ind Flight</Button>
            </Link>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default AdminNavBar
