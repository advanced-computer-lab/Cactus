import { useState, useEffect } from "react";
import axios from 'axios'
import { set } from "date-fns";
import { useHistory } from 'react-router'

var recentlyReservedDepB = []
var recentlyReservedDepE = []

var economySplicedDep = []

var recentlyReservedRetB = []
var recentlyReservedRetE = []

var economySplicedRet = []

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
    const [selectedDepFlight, setSelectedDep] = useState()
    const [selectedRetFlight, setSelectedRet] = useState()
    const [loginOpen, setLoginOpen] = useState(false);
    const [openConfirmDialog, setConfirmDialog] = useState(false)
    const [showDepSeats, setShowDepSeats] = useState(false)
    const [showRetSeats, setShowRetSeats] = useState(false)
    const [economyDepSeats, setEconomyDepSeats] = useState([])
    const [businessDepSeats, setBusinessDepSeats] = useState([])
    const [economyRetSeats, setEconomyRetSeats] = useState([])
    const [businessRetSeats, setBusinessRetSeats] = useState([])
    const [numberOfSeats, setNumberOfSeats] = useState(0);
    const [depSeat, setDepSeat] = useState([])
    const [retSeat, setRetSeat] = useState([])
    const [depFlightMaps, setDepFlightMaps] = useState([])
    const [retFlightMaps, setRetFlightMaps] = useState([])
    const [changeDepSummary, setChangeDepSummary] = useState(false)

    // Splicing economy seats
    useEffect(() => {
        // Departure Seats
        let temp1 = []
        let temp2 = []
        let temp3 = []
        for (let i = 0; i < economyDepSeats.length; i += 10) {
            temp1 = []
            temp2 = []
            temp3 = []
            for (let j = i; j < i + 3; j++) {
                temp1.push(economyDepSeats[j])
                console.log("temp1: ", temp1)
            }
            for (let k = i + 3; k < (i + 3) + 4; k++) {
                temp2.push(economyDepSeats[k])
                console.log("temp2: ", temp2)
            }
            for (let l = i + 7; l < (i + 7) + 3; l++) {
                temp3.push(economyDepSeats[l])
                console.log("temp3: ", temp3)
            }
            economySplicedDep.push(temp1)
            economySplicedDep.push(temp2)
            economySplicedDep.push(temp3)
            console.log("economySpliced: ", economySplicedDep)
        }
        let temp4 = []
        let temp5 = []
        let temp6 = []
        for (let i = 0; i < economyRetSeats.length; i += 10) {
            temp4 = []
            temp5 = []
            temp6 = []
            for (let j = i; j < i + 3; j++) {
                temp4.push(economyRetSeats[j])
                console.log("temp1: ", temp4)
            }
            for (let k = i + 3; k < (i + 3) + 4; k++) {
                temp5.push(economyRetSeats[k])
                console.log("temp2: ", temp5)
            }
            for (let l = i + 7; l < (i + 7) + 3; l++) {
                temp6.push(economyRetSeats[l])
                console.log("temp3: ", temp6)
            }
            economySplicedRet.push(temp4)
            economySplicedRet.push(temp5)
            economySplicedRet.push(temp6)
        }
    }, [economyRetSeats, economyDepSeats])

    const depDate = new Date(date[0]);
    var depDateFormat = (depDate.getFullYear()) + "-" + (depDate.getMonth() + 1) + "-" + (depDate.getDate())
    if ((depDate.getMonth() + 1) < 10) {
        depDateFormat = (depDate.getFullYear()) + "-0" + (depDate.getMonth() + 1) + "-" + (depDate.getDate())
        if ((depDate.getDate()) < 10) {
            depDateFormat = (depDate.getFullYear()) + "-0" + (depDate.getMonth() + 1) + "-0" + (depDate.getDate())
        }
    } else {
        if ((depDate.getDate()) < 10) {
            depDateFormat = (depDate.getFullYear()) + "-" + (depDate.getMonth() + 1) + "-0" + (depDate.getDate())
        }
    }


    const returnDate = new Date(date[1]);
    var returnDateFormat = (returnDate.getFullYear()) + '-' + (returnDate.getMonth() + 1) + "-" + (returnDate.getDate())
    if ((depDate.getMonth() + 1) < 10) {
        returnDateFormat = (returnDate.getFullYear()) + '-0' + (returnDate.getMonth() + 1) + "-" + (returnDate.getDate())
        if ((returnDate.getDate()) < 10) {
            returnDateFormat = (returnDate.getFullYear()) + '-0' + (returnDate.getMonth() + 1) + "-0" + (returnDate.getDate())
        }
    } else {
        if ((returnDate.getDate()) < 10) {
            returnDateFormat = (returnDate.getFullYear()) + '-' + (returnDate.getMonth() + 1) + "-0" + (returnDate.getDate())
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
            setCounterChild(0)
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
        setFetching(true)
        if (search) {
            setSearch(false)
        }
        if (depSelected) {
            setDepSelected(false)
        }
        if (returnSelected) {
            setReturnSelected(false)
        }
        axios.post('/Users/getFlights', data)
            .then((response) => {
                setSearch(true)
                setFetching(false)
                setDepartureFlights(response.data)
                console.log("response: ", response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log("dep flights: ", departureFlights)
    }

    const handleReturnFlight = (params, e) => {
        e.preventDefault()
        console.log(returnData);
        axios.post('/Users/getFlights', returnData)
            .then((response) => {
                setSearch(false)
                // setDepSelected(true)
                setReturnFlights(response.data)
                setSelectedDep(params)
                setEconomyDepSeats(params.economyMap)
                setBusinessDepSeats(params.businessMap)
                setNumberOfSeats(seats)
                setShowDepSeats(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    var depSeats = []
    var depFlightMap = []
    const handleDepSeatsSelected = () => {
        if (!changeDepSummary) {
            setDepSelected(true)
        }
        else {
            setDepSelected(false)
            setReturnSelected(true)
        }
        setNumberOfSeats(seats)
        setShowDepSeats(false)
        if (cabin === "economy") {
            depFlightMap = economySplicedDep.flat(1)
            for (let i = 0; i < recentlyReservedDepE.length; i++) {
                depSeats.push((recentlyReservedDepE[i] + 1))
            }
            setDepSeat(depSeats)
            setDepFlightMaps(depFlightMap)
            console.log("rn:", depSeats)
            console.log("rm:", depFlightMap)
        }
        else {
            console.log("wrong entry")
            depFlightMap = businessDepSeats
            for (let i = 0; i < recentlyReservedDepB.length; i++) {
                depSeats.push((recentlyReservedDepB[i] + 1))
            }
            setDepSeat(depSeats)
            setDepFlightMaps(depFlightMap)
        }
        console.log("rb:", recentlyReservedDepB)
        console.log("re:", recentlyReservedDepE)
    }
    const handleSelectedRetSeat = (e, params) => {
        e.preventDefault()
        if (!(numberOfSeats === 0)) {
            setNumberOfSeats(numberOfSeats - 1);
            if (cabin === "business") {
                let seat = businessRetSeats.find((o, i) => {
                    if (o.number === params) {
                        businessRetSeats[i] = { number: params, reserved: true, _id: o._id };
                        recentlyReservedRetB.push(i)
                        setBusinessRetSeats(businessRetSeats)
                        return true;
                    }
                })
            }
            else {
                const flatArray = economySplicedRet.flat(1)
                let seat = flatArray.find((o, i) => {
                    if (o.number === params) {
                        flatArray[i] = { number: params, reserved: true, _id: o._id };
                        recentlyReservedRetE.push(i)
                        return true;
                    }
                })
                economySplicedRet = []
                let temp1 = []
                let temp2 = []
                let temp3 = []
                for (let i = 0; i < flatArray.length; i += 10) {
                    temp1 = []
                    temp2 = []
                    temp3 = []
                    for (let j = i; j < i + 3; j++) {
                        temp1.push(flatArray[j])
                        console.log("temp1: ", temp1)
                    }
                    for (let k = i + 3; k < (i + 3) + 4; k++) {
                        temp2.push(flatArray[k])
                        console.log("temp2: ", temp2)
                    }
                    for (let l = i + 7; l < (i + 7) + 3; l++) {
                        temp3.push(flatArray[l])
                        console.log("temp3: ", temp3)
                    }
                    economySplicedRet.push(temp1)
                    economySplicedRet.push(temp2)
                    economySplicedRet.push(temp3)
                }
                console.log("new: ", economySplicedRet)
                // setEconomyDepSeats([])
                // setEconomyDepSeats(economySplicedDep)
            }
        }
    }
    const handleSelectedDepSeat = (e, params) => {
        e.preventDefault()
        if (!(numberOfSeats === 0)) {
            setNumberOfSeats(numberOfSeats - 1);
            if (cabin === "business") {
                let seat = businessDepSeats.find((o, i) => {
                    if (o.number === params) {
                        businessDepSeats[i] = { number: params, reserved: true, _id: o._id };
                        recentlyReservedDepB.push(i)
                        setBusinessDepSeats(businessDepSeats)
                        return true;
                    }
                })
            }
            else {
                const flatArray = economySplicedDep.flat(1)
                let seat = flatArray.find((o, i) => {
                    if (o.number === params) {
                        flatArray[i] = { number: params, reserved: true, _id: o._id };
                        recentlyReservedDepE.push(i)
                        return true;
                    }
                })
                economySplicedDep = []
                let temp1 = []
                let temp2 = []
                let temp3 = []
                for (let i = 0; i < flatArray.length; i += 10) {
                    temp1 = []
                    temp2 = []
                    temp3 = []
                    for (let j = i; j < i + 3; j++) {
                        temp1.push(flatArray[j])
                        console.log("temp1: ", temp1)
                    }
                    for (let k = i + 3; k < (i + 3) + 4; k++) {
                        temp2.push(flatArray[k])
                        console.log("temp2: ", temp2)
                    }
                    for (let l = i + 7; l < (i + 7) + 3; l++) {
                        temp3.push(flatArray[l])
                        console.log("temp3: ", temp3)
                    }
                    economySplicedDep.push(temp1)
                    economySplicedDep.push(temp2)
                    economySplicedDep.push(temp3)
                }
                console.log("new: ", economySplicedDep)
                // setEconomyDepSeats([])
                // setEconomyDepSeats(economySplicedDep)
            }
        }
    }
    const handleResetRetSeats = (e) => {
        e.preventDefault()
        if (cabin === "business") {
            for (let index = 0; index < recentlyReservedRetB.length; index++) {
                businessRetSeats[recentlyReservedRetB[index]].reserved = false
                setBusinessRetSeats(businessRetSeats)
            }
            recentlyReservedRetB = []
            console.log(businessRetSeats)
        }
        else {
            const flatArray = economySplicedRet.flat(1)
            for (let index = 0; index < recentlyReservedRetE.length; index++) {
                flatArray[recentlyReservedRetE[index]].reserved = false
            }
            recentlyReservedRetE = []
            economySplicedRet = []
            let temp1 = []
            let temp2 = []
            let temp3 = []
            for (let i = 0; i < flatArray.length; i += 10) {
                temp1 = []
                temp2 = []
                temp3 = []
                for (let j = i; j < i + 3; j++) {
                    temp1.push(flatArray[j])
                    console.log("temp1: ", temp1)
                }
                for (let k = i + 3; k < (i + 3) + 4; k++) {
                    temp2.push(flatArray[k])
                    console.log("temp2: ", temp2)
                }
                for (let l = i + 7; l < (i + 7) + 3; l++) {
                    temp3.push(flatArray[l])
                    console.log("temp3: ", temp3)
                }
                economySplicedRet.push(temp1)
                economySplicedRet.push(temp2)
                economySplicedRet.push(temp3)
            }
            // setEconomyDepSeats(economySplicedDep)
            console.log(economyRetSeats)
        }
        setNumberOfSeats(seats)
    }
    const handleResetDepSeats = (e) => {
        e.preventDefault()
        if (cabin === "business") {
            for (let index = 0; index < recentlyReservedDepB.length; index++) {
                businessDepSeats[recentlyReservedDepB[index]].reserved = false
                setBusinessDepSeats(businessDepSeats)
            }
            recentlyReservedDepB = []
            console.log(businessDepSeats)
        }
        else {
            const flatArray = economySplicedDep.flat(1)
            for (let index = 0; index < recentlyReservedDepE.length; index++) {
                flatArray[recentlyReservedDepE[index]].reserved = false
            }
            recentlyReservedDepE = []
            economySplicedDep = []
            let temp1 = []
            let temp2 = []
            let temp3 = []
            for (let i = 0; i < flatArray.length; i += 10) {
                temp1 = []
                temp2 = []
                temp3 = []
                for (let j = i; j < i + 3; j++) {
                    temp1.push(flatArray[j])
                    console.log("temp1: ", temp1)
                }
                for (let k = i + 3; k < (i + 3) + 4; k++) {
                    temp2.push(flatArray[k])
                    console.log("temp2: ", temp2)
                }
                for (let l = i + 7; l < (i + 7) + 3; l++) {
                    temp3.push(flatArray[l])
                    console.log("temp3: ", temp3)
                }
                economySplicedDep.push(temp1)
                economySplicedDep.push(temp2)
                economySplicedDep.push(temp3)
            }
            // setEconomyDepSeats(economySplicedDep)
            console.log(economyDepSeats)
        }
        setNumberOfSeats(seats)
    }

    const handleReturnSelected = (params, e) => {
        e.preventDefault()
        setDepSelected(false)
        setSelectedRet(params)
        setEconomyRetSeats(params.economyMap)
        setBusinessRetSeats(params.businessMap)
        setShowRetSeats(true)
    }
    var retSeats = []
    var retFlightMap = []
    const handleRetSeatsSelected = () => {
        setReturnSelected(true)
        setShowRetSeats(false)

        if (cabin === "economy") {
            retFlightMap = economySplicedRet.flat(1)
            for (let i = 0; i < recentlyReservedRetE.length; i++) {
                retSeats.push((recentlyReservedRetE[i] + 1))
            }
            setRetSeat(retSeats)
            setRetFlightMaps(retFlightMap)
        }
        else {
            retFlightMap = businessRetSeats
            for (let i = 0; i < recentlyReservedRetB.length; i++) {
                retSeats.push((recentlyReservedRetB[i] + 1))
            }
            setRetSeat(retSeats)
            setRetFlightMaps(retFlightMap)
        }
    }
    const history = useHistory()

    const handleCloseConfirm = () => {
        setConfirmDialog(false)
        history.push("/")
    }
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChangeDepFlight = (e) => {
        e.preventDefault()
        setSearch(true)
        setReturnSelected(false)
        setChangeDepSummary(true)
        handleResetDepSeats(e)
    }
    const handleChangeRetFlight = (e) => {
        e.preventDefault()
        setDepSelected(true)
        setReturnSelected(false)
        handleResetRetSeats(e)
    }

    return {
        handleReturnFlight, handleChange, handleClickOpen, handleClose, handleFindFlight,
        handleFromChange, handleToChange, data, returnData, handleDecrement, handleIncrement,
        handleDecrementChild, handleIncrementChild, returnDateFormat, depDateFormat, value, setValue,
        date, setDate, open, setOpen, counter, setCounter, search, setSearch, from, setFrom, to, setTo,
        seats, setSeats, cabin, setCabin, counterChild, setCounterChild, depSelected, setDepSelected,
        returnSelected, setReturnSelected, departureFlights, setDepartureFlights, departureId,
        setDepartureId, isFetching, setFetching, showCheckout, setShowCheckout, returnFlights, setReturnFlights,
        selectedDepFlight, selectedRetFlight, handleReturnSelected, loginOpen, setLoginOpen,
        success, setSuccess, loading, setLoading, openConfirmDialog, handleCloseConfirm, setConfirmDialog,
        showDepSeats, showRetSeats, handleDepSeatsSelected, handleRetSeatsSelected, economyDepSeats, economyRetSeats,
        businessDepSeats, businessRetSeats, handleSelectedDepSeat, handleResetDepSeats, economySplicedDep, economySplicedRet,
        handleSelectedRetSeat, handleResetRetSeats, depSeat, depFlightMaps, retSeat, retFlightMaps, handleChangeDepFlight, handleChangeRetFlight
    }
}
export default Search;