//___________StyleSheets___________
import './App.css';

//___________Middleware___________
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from './Context/UserContext';


//___________Views___________
import AdminHome from './Views/Admin/AdminHome'
import UserHome from './Views/User/UserHome'
import AddFlight from './Views/Admin/Flight/AddFlight'
import EditFlight from './Views/Admin/Flight/EditFlight'
import FindFlight from './Views/Admin/Flight/FindFlight'
import Login from './Components/Main/Login/Login'
import Register from './Views/User/Register'
import UserProfile from './Views/User/UserProfile'


//___________Theme__________
import { createTheme, ThemeProvider } from '@mui/material';
import { useState } from 'react';



const theme = createTheme({
  palette: {
    primary: {
      main: '#804000'
    },
    secondary: {
      main: '#004080'
    },
    error: {
      main: '#800000'
    },
    info: {
      main: '#FFD700'
    },
    success: {
      main: '#008040'
    }
  },
});

function App() {
  const [loggedUser, setLoggedUser] = useState()
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
              <Route exact path="/" component={UserHome} />
              <Route path="/Register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/UserProfile" component={UserProfile} />
            </UserContext.Provider>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
