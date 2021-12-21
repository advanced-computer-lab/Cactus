//___________StyleSheets___________
import './App.css';

//___________Middleware___________
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from './Context/UserContext';
import axios from 'axios'
import { getLocalStorage } from './Authentication/LocalStorage'
import { getCookie } from './Authentication/Cookies'



//___________Views___________
import AdminHome from './Views/Admin/AdminHome'
import UserHome from './Views/User/UserHome'
import LandingPage from './Views/LandingPage';
import AddFlight from './Views/Admin/Flight/AddFlight'
import EditFlight from './Views/Admin/Flight/EditFlight'
import FindFlight from './Views/Admin/Flight/FindFlight'
import Login from './Components/Main/Login/Login'
import Register from './Views/User/Register'
import UserProfile from './Views/User/UserProfile'
import ChangePassword from './Views/User/ChangePassword';
import Unauthorized from './Views/Error/Unauthorized'

//___________Theme__________
import { createTheme, ThemeProvider } from '@mui/material';




const theme = createTheme({
  palette: {
    primary: {
      main: '#804000'
    },
    secondary: {
      main: '#004080'
    },
    error: {
      main: '#DF0000'
    },
    info: {
      main: '#72C6ED'
    },
    success: {
      main: '#008040'
    },
    white: {
      main: '#ffffff',
      contrastText: '#000',
    }
  },
});

function App() {
  const [loggedUser, setLoggedUser] = useState({user: "", token: ""})

  useEffect(() => {
    if(getCookie('token')){
      const token = getCookie('token')
      const user = getLocalStorage('user')
      setLoggedUser({user: user, token: token})
    }
    else{
      setLoggedUser({user: "", token: ""})
    }
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/adminHome">
              <AdminHome />
            </Route>
            <Route path="/addFlight">
              <AddFlight />
            </Route>
            <Route path="/editFlight">
              <EditFlight />
            </Route>
            <Route path="/findFlight">
              <FindFlight />
            </Route>
            <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
              <Route exact path="/" component={LandingPage} />
              <Route path={"/BookFlight"} component={UserHome} />
              <Route path="/Register">
                <Register />
              </Route>
              <Route path="/login">
               {loggedUser.user ? <UserHome /> : <Login />}
              </Route>
              <Route path="/UserProfile">
                {loggedUser.user ? <UserProfile /> : <Unauthorized />}
              </Route>
              <Route path={"/ChangePassword"} component={ChangePassword} />
            </UserContext.Provider>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
