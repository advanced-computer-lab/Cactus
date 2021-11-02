import React from "react";
// import './../src/App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}from 'react-router-dom';
//Components
import AddFlights from "./Components/AddFlights";
import GetFlight from "./Components/GetFlight";
import AddFlight from "./Components/AddFlights";
import LoginForm from '../src/Components/LoginForm';
import NavBar from '../src/Components/NavBar';
import EditFlightForm from '../src/Components/EditFlightForm';
import AddFlightForm from '../src/Components/AddFlightForm';


function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <h1>HomePage</h1>
          </Route>
          <Route path="/Flights">
            <GetFlight />
          </Route>
          <Route path="/AddFlights">
            <h1>Add Flight</h1>
            <AddFlightForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
