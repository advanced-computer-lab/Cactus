import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { useHistory } from 'react-router';


export default function MenuAppBar() {
  const { loggedUser, setLoggedUser } = useContext(UserContext)
  const history = useHistory()
  
  const handleClick = (e) =>{
    e.preventDefault()
    history.push("/UserProfile")
  }
  return (
    <Box >
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cactus Airlines
          </Typography>
          <div>
            {loggedUser ?
              <>
                <Button
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  startIcon={<AccountCircle />}
                  onClick={handleClick}
                >
                  Hello {loggedUser.firstName}
                </Button>
                <Button variant="contained" color="error" onClick={()=>{setLoggedUser(null)}}>Logout</Button>
              </>
              :
              <>
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
              </>
            }
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
