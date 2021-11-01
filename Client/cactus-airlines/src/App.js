import React from "react";
// import './../src/App.css'
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
      <header>
        <h1>Flight Data</h1>
        {/* <AddFlights /> */}
        <GetFlight />
        <AddFlight />
      </header>
{/* //         <NavBar/>
//         <LoginForm/>
//         <AddFlightForm/>
//         <EditFlightForm/> */}
    </div>
  );
}

export default App;
