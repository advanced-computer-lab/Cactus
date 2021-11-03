//___________StyleSheets___________
import './App.css';

//___________Middleware___________
import {BrowserRouter as Router, Switch, Route, Link}from 'react-router-dom';


//___________Views___________
import AdminHome from './Views/Admin/AdminHome'
import UserHome from './Views/User/UserHome'
import HomePage from './Views/HomePage'
import AddFlight from './Views/Admin/Flight/AddFlight'
import EditFlight from './Views/Admin/Flight/EditFlight'
import FindFlight from './Views/Admin/Flight/FindFlight'
import Login from './Components/Main/Login/Login'

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
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
          </Switch>
        </Router>
    </div>
  );
}

export default App;
