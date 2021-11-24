import { React, useState } from "react";
import axios from 'axios'

const Search = () => {
    const [value, setValue] = useState(0);
    const [date, setDate] = useState([Date.now(), Date.now()]);
    const [open, setOpen] = useState(false);
    const [counter, setCounter] = useState(1);
    const [search, setSearch] = useState(false)
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [seats, setSeats] = useState()
    const [cabin, setCabin] = useState('economy')
    const [counterChild, setCounterChild] = useState(0);
    const [depSelected, setDepSelected] = useState(false)
    const [returnSelected, setReturnSelected] = useState(false)
    const [departureFlights, setDepartureFlights] = useState([])
    const [returnFlights, setReturnFlights] = useState([])
    const [departureId, setDepartureId] = useState()
    const [isFetching, setFetching] = useState(false)
    const [showCheckout, setShowCheckout] = useState(false)
    const [selectedDepFlight, setSelectedDep] = useState({})
    const [selectedRetFlight, setSelectedRet] = useState({})



    const depDate = new Date(date[0]);
    var depDateFormat = (depDate.getDate()) + "-" + (depDate.getMonth() + 1) + "-" + (depDate.getFullYear())
    if ((depDate.getMonth()) < 10) {
        depDateFormat = (depDate.getDate()) + "-0" + (depDate.getMonth() + 1) + "-" + (depDate.getFullYear())
        if ((depDate.getDate()) < 10) {
            depDateFormat = "0" + (depDate.getDate()) + "-0" + (depDate.getMonth() + 1) + "-" + (depDate.getFullYear())
        }
    }

    const returnDate = new Date(date[1]);
    var returnDateFormat = (returnDate.getDate()) + "-" + (returnDate.getMonth() + 1) + "-" + (returnDate.getFullYear())
    if ((depDate.getMonth()) < 10) {
        returnDateFormat = (returnDate.getDate()) + "-0" + (returnDate.getMonth() + 1) + "-" + (returnDate.getFullYear())
        if ((returnDate.getDate()) < 10) {
            returnDateFormat = "0" + (returnDate.getDate()) + "-0" + (returnDate.getMonth() + 1) + "-" + (returnDate.getFullYear())
        }
    }


    const handleIncrementChild = () => {
        setCounterChild(counterChild + 1)
    };

    const handleDecrementChild = () => {
        if (counterChild !== 0) {
            setCounterChild(counterChild - 1)
        }
        else {
            setCounterChild(1)
        }
    }

    const handleIncrement = () => {
        setCounter(counter + 1)
    };

    const handleDecrement = () => {
        if (counter !== 1) {
            setCounter(counter - 1)
        }
        else {
            setCounter(1)
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSeats(counter + counterChild)
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFromChange = (e) => {
        setFrom(e.target.value)
    }
    const handleToChange = (e) => {
        setTo(e.target.value)
    }
    const data = {
        departureDate: depDateFormat,
        destinationAirport: to,
        departureAirport: from,
        cabin: cabin,
        seats: seats
    }
    const returnData = {
        departureDate: returnDateFormat,
        destinationAirport: from,
        departureAirport: to,
        cabin: cabin,
        seats: seats
    }
    const handleFindFlight = (e) => {
        e.preventDefault()
        console.log(data);
        setFetching(true)
        axios.post('/Users/getFlights', data)
            .then((response) => {
                setSearch(true)
                setFetching(false)
                setDepartureFlights(response.data)
                console.log(departureFlights)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleReturnFlight = (params, e) => {
        e.preventDefault()
        console.log(returnData);
        axios.post('/Users/getFlights', returnData)
            .then((response) => {
                setSearch(false)
                setDepSelected(true)
                setReturnFlights(response.data)
                setSelectedDep(params)
                console.log(returnFlights)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleReturnSelected = (params, e) => {
        e.preventDefault()
        console.log(params)
        setDepSelected(false)
        setReturnSelected(true)
        setSelectedRet(params)
    }
    // Seats, Cabin, 2 Flight ids, username
    const reserveData = {
        seats: seats,
        cabin: cabin,
        departureId: selectedDepFlight._id,
        returnId: selectedRetFlight._id,
        username:"Mazen"
    }
    const handleReserve = (e) => {
        e.preventDefault()
        axios.post('/Users/reserveFlight', reserveData)
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return {
        handleReturnFlight, handleChange, handleClickOpen, handleClose, handleFindFlight,
        handleFromChange, handleToChange, data, returnData, handleDecrement, handleIncrement,
        handleDecrementChild, handleIncrementChild, returnDateFormat, depDateFormat, value, setValue,
        date, setDate, open, setOpen, counter, setCounter, search, setSearch, from, setFrom, to, setTo,
        seats, setSeats, cabin, setCabin, counterChild, setCounterChild, depSelected, setDepSelected,
        returnSelected, setReturnSelected, departureFlights, setDepartureFlights, departureId,
        setDepartureId, isFetching, setFetching, showCheckout, setShowCheckout, returnFlights, setReturnFlights,
        selectedDepFlight, selectedRetFlight, handleReturnSelected, handleReserve
    }
}
export default Search;