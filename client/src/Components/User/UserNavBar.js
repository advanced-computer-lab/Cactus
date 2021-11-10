import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from '@mui/material';


export default function MenuAppBar() {

  return (
    <Box >
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cactus Airlines
          </Typography>
            <div>
            <Link color="inherit" href="/Login" style={{ textDecoration: 'none' }}>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                startIcon={<AccountCircle />}
              >
                Login|Sign up
              </Button>
              </Link>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
