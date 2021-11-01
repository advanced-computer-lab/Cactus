import React, {useState, useEffect} from 'react'
import axios from 'axios';
import useAxios from 'axios-hooks';

const AddFlights = () => {
    const initialFlightState = {
      flightNumber: "",
      arrivalTime: "",
      arrivalDate: ""
    };
    const [flight, setflight] = useState(initialFlightState);
    const [submitted, setSubmitted] = useState(false);
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setflight({ ...flight, [name]: value });
    };
  
    const saveFlight = () => {
      var data = {
        flightNumber: flight.flightNumber,
        arrivalTime: flight.arrivalTime
      };
  
      axios.post('http://localhost:3000/addFlight',data)
        .then(response => {
          setflight({
            flightNumber: response.data.flightNumber,
            arrivalTime: response.data.arrivalTime,
            arrivalDate: response.data.arrivalDate
          });
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const newFlight = () => {
      setflight(initialFlightState);
      setSubmitted(false);
    };
  
    return (
        <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newFlight}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="flightNumber">Flight Number</label>
              <input
                type="text"
                className="form-control"
                id="flightNumber"
                required
                value={flight.flightNumber}
                onChange={handleInputChange}
                name="flightNumber"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="arrivalTime">Arrival Time</label>
              <input
                type="text"
                className="form-control"
                id="arrivalTime"
                required
                value={flight.arrivalTime}
                onChange={handleInputChange}
                name="arrivalTime"
              />
            </div>
  
            <button onClick={saveFlight} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    )
  };

  export default AddFlights
