import React, { useContext } from 'react'
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { UserContext } from '../../Context/UserContext'
import { deleteLoacalStorage } from '../../Authentication/LocalStorage'
import { deleteCookie } from '../../Authentication/Cookies'
import { useHistory } from "react-router"


function AdminNavBar() {
  const { loggedUser, setLoggedUser } = useContext(UserContext)
  const history = useHistory()
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link color="inherit" href="/AdminHome" style={{ textDecoration: 'none', flexGrow: 1 }}>
              <Typography variant="h6" component="div" align="left">
                Cactus Airlines
              </Typography>
            </Link>
              <Button color="inherit" variant="outlined" align="right" onClick={()=>{
                setLoggedUser({user: "", token: ""}) 
                deleteLoacalStorage('user')
                deleteCookie('token')
                history.push("/")
              }}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default AdminNavBar
