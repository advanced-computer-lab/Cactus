import React from "react";
import GetFlights from "./Components/getFlights";
import AddFlights from "./Components/addFlights";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flights</h1>
        <AddFlights />
        <GetFlights />
      </header>
      
    </div>
  );
}

export default App;
