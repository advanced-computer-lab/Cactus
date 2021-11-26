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
// import logo from '../../logo5.png'


export default function MenuAppBar() {
  const { loggedUser, setLoggedUser } = useContext(UserContext)
  const history = useHistory()
  
  const handleClick = (e) =>{
    e.preventDefault()
    history.push("/UserProfile")
  }
  return (
    <Box >
      <AppBar 
      position="static" 
      style={{ boxShadow: "0px 0px 0px 0px" }} color="secondary">
        <Toolbar>
          {/* <Box 
            component="img"
            sx={{
              height: 64,
            }}
            alt="logo"
            src={logo}
            /> */}
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="inherit">
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
                  style={{marginRight: '10px'}}
                >
                  Hello {loggedUser.firstName}
                </Button>
                <Button variant="outlined" color="error" onClick={()=>{setLoggedUser(null)}}>Logout</Button>
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
                    variant="outlined"
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
