import GetFlightsTest from "./Views/GetFlightsTest";

import './../src/App.css'
//Components

import LoginForm from '../src/Components/LoginForm';
import NavBar from '../src/Components/NavBar';
import EditFlightForm from '../src/Components/EditFlightForm';
import AddFlightForm from '../src/Components/AddFlightForm';

function App() {
  return (
    <div className="App">
      
        <NavBar/>
        <LoginForm/> 
        <AddFlightForm/>
        <EditFlightForm/>

    </div>
  );
}

export default App;
