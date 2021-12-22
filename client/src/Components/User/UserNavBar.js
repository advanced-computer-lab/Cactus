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
import logo from '../../Images/logo5.png'
import { deleteLoacalStorage } from '../../Authentication/LocalStorage'
import { deleteCookie } from '../../Authentication/Cookies'


export default function MenuAppBar() {
  const { loggedUser, setLoggedUser } = useContext(UserContext)
  const history = useHistory()

  const handleClick = (e) => {
    e.preventDefault()
    history.push("/UserProfile")
  }
  return (
    <Box >
      <AppBar
        position="static"
        style={{ boxShadow: "0px 0px 0px 0px" }} color="white">
        <Toolbar>
          <Box
            component="img"
            style={{ marginTop: '-20px' }}
            sx={{
              height: 64,
            }}
            alt="logo"
            src={logo}
          />
            <Typography variant="h6" style={{ fontWeight: 'bold' }} component="div" sx={{ flexGrow: 1 }} color="secondary">
              Cactus Airlines
            </Typography>
          <div>
            {loggedUser.user ?
              <>
                <Button
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="secondary"
                  startIcon={<AccountCircle />}
                  onClick={handleClick}
                  style={{ marginRight: '10px' }}
                >
                  Hello {loggedUser.user.firstName}
                </Button>
                <Button variant="contained" color="error" onClick={() => { 
                  setLoggedUser({user: "", token: ""}) 
                  deleteLoacalStorage('user')
                  deleteCookie('token')
                  history.push("/")
                  }}>Logout</Button>
              </>
              :
              <>
                <Link color="inherit" href="/Login" style={{ textDecoration: 'none' }}>
                  <Button
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="secondary"
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
