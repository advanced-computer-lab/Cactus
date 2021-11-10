//___________StyleSheets___________
import './App.css';

//___________Middleware___________
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


//___________Views___________
import AdminHome from './Views/Admin/AdminHome'
import UserHome from './Views/User/UserHome'
// import HomePage from './Views/HomePage'
import AddFlight from './Views/Admin/Flight/AddFlight'
import EditFlight from './Views/Admin/Flight/EditFlight'
import FindFlight from './Views/Admin/Flight/FindFlight'
import Login from './Components/Main/Login/Login'
import Register from './Views/User/Register'
import UserProfile from './Views/User/UserProfile'


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
      main: '#800000'
    },
    info: {
      main: '#b8d52d'
    },
    success: {
      main: '#008040'
    }
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
              {/* <HomePage /> */}
            </Route>
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/homepage">
              <UserHome />
            </Route>
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
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/UserProfile">
              <UserProfile />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
