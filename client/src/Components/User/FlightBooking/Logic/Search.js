import { useState } from "react";
import axios from 'axios'

const Search = () => {
    const [depDate, setDepDate] = useState(Date.now())
    const [retDate, setRetDate] = useState(Date.now())
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [seats, setSeats] = useState()
    const [cabin, setCabin] = useState()
    const [flightsFound, setFlightsFound] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [depFlights, setDepFlights] = useState({})
    const [retFlights, setRetFlights] = useState({})
    const [departureFlightSelected, setDepartureFlightSelected] = useState(false)

    const data = {
        departureDate: depDate,
        destinationAirport: to,
        departureAirport: from,
        cabin: cabin,
        seats: seats
    }
    const returnData = {
        departureDate: retDate,
        destinationAirport: from,
        departureAirport: to,
        cabin: cabin,
        seats: seats
    }
    const handleSearch = (e) => {
        e.preventDefault()
        setIsFetching(true)
        axios.post('/Users/getFlights', data)
            .then((response) => {
                setFlightsFound(true)
                setIsFetching(false)
                setDepFlights(response.data)
                console.log(depFlights)
            })
            .catch((err) => {
                console.log(err)
            })

    }
    const handleDepartureFlight = (e) => {
        e.preventDefault()
        console.log(returnData);
        axios.post('/Users/getFlights', returnData)
            .then((response) => {
                setFlightsFound(false)
                setDepartureFlightSelected(true)
                setRetFlights(response.data)
                console.log(retFlights)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return {
        setDepDate, setRetDate, setFrom, setTo, setCabin, setSeats,
        flightsFound, isFetching, depFlights, retFlights, departureFlightSelected,
        handleSearch, handleDepartureFlight, cabin
    }

}
export default Search;