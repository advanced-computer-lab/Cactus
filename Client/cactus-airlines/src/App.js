import React from "react";
import GetFlights from "./Components/getFlights";
import AddFlights from "./Components/addFlights";

import './../src/App.css'
//Components

import LoginForm from '../src/Components/LoginForm';
import NavBar from '../src/Components/NavBar';
import EditFlightForm from '../src/Components/EditFlightForm';
import AddFlightForm from '../src/Components/AddFlightForm';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flights</h1>
        <AddFlights />
        <GetFlights />
      </header>
//         <NavBar/>
//         <LoginForm/> 
//         <AddFlightForm/>
//         <EditFlightForm/>
    </div>
  );
}

export default App;
