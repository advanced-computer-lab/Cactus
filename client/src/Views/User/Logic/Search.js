import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import { useHistory } from 'react-router'
import { UserContext } from "../../../Context/UserContext"


var recentlyReservedDepB = []
var recentlyReservedDepE = []

var economySplicedDep = []

var recentlyReservedRetB = []
var recentlyReservedRetE = []

var economySplicedRet = []

const Search = () => {
    const [value, setValue] = useState(0);
    const [date, setDate] = useState(["", ""]);
    const [depDateValidation, setDepDateValidation] = useState({ error: false, label: '' })
    const [retDateValidation, setRetDateValidation] = useState({ error: false, label: '' })
    const [open, setOpen] = useState(false);
    const [counter, setCounter] = useState(1);
    const [search, setSearch] = useState(false)
    const [from, setFrom] = useState("")
    const [fromValidation, setFromValidation] = useState({ error: false, label: '' })
    const [to, setTo] = useState("")
    const [toValidation, setToValidation] = useState({ error: false, label: '' })
    const [seats, setSeats] = useState(1)
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
    const { loggedUser, setLoggedUser } = useContext(UserContext)
    const [depSeat, setDepSeat] = useState([])
    const [retSeat, setRetSeat] = useState([])
    const [depFlightMaps, setDepFlightMaps] = useState([])
    const [retFlightMaps, setRetFlightMaps] = useState([])
    const [changeDepSummary, setChangeDepSummary] = useState(false)
    const [allDepSeatsSelected, setAllDepSeatsSelected] = useState(false)
    const [allRetSeatsSelected, setAllRetSeatsSelected] = useState(false)
    const [getFlights, setGetFlights] = useState(false)
    const [change, setChange] = useState(false)
    const [items, setItems] = useState({totalPrice: 0, reservationId: ""})

    // Splicing economy seats
    useEffect(() => {
        // Departure Seats
        economySplicedDep = []
        //setEconomyDepSeats([])
        let temp1 = []
        let temp2 = []
        let temp3 = []
        console.log("depMap: ", economyDepSeats)
        for (let i = 0; i < economyDepSeats.length; i += 10) {
            temp1 = []
            temp2 = []
            temp3 = []
            for (let j = i; j < i + 3; j++) {
                temp1.push(economyDepSeats[j])
            }
            for (let k = i + 3; k < (i + 3) + 4; k++) {
                temp2.push(economyDepSeats[k])
            }
            for (let l = i + 7; l < (i + 7) + 3; l++) {
                temp3.push(economyDepSeats[l])
            }
            economySplicedDep.push(temp1)
            economySplicedDep.push(temp2)
            economySplicedDep.push(temp3)
        }
        console.log("spliced1:  ", economySplicedDep)
        let temp4 = []
        let temp5 = []
        let temp6 = []
        economySplicedRet = []
        for (let i = 0; i < economyRetSeats.length; i += 10) {
            temp4 = []
            temp5 = []
            temp6 = []
            for (let j = i; j < i + 3; j++) {
                temp4.push(economyRetSeats[j])
            }
            for (let k = i + 3; k < (i + 3) + 4; k++) {
                temp5.push(economyRetSeats[k])
            }
            for (let l = i + 7; l < (i + 7) + 3; l++) {
                temp6.push(economyRetSeats[l])
            }
            economySplicedRet.push(temp4)
            economySplicedRet.push(temp5)
            economySplicedRet.push(temp6)
        }
    }, [getFlights])

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
    if ((returnDate.getMonth() + 1) < 10) {
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
        setSearch(false)
        setDepSelected(false)
        setReturnSelected(false)
        setShowDepSeats(false)
        setShowRetSeats(false)
        setShowCheckout(false)
        let isError = false
        if (from === "") {
            setFromValidation({ error: true, label: "This field is required" })
            isError = true
        } else {
            setFromValidation({ error: false, label: "" })
        }
        if (to === "") {
            setToValidation({ error: true, label: "This field is required" })
            isError = true
        } else {
            setToValidation({ error: false, label: "" })
        }
        if (date[0] === "") {
            setDepDateValidation({ error: true, label: "This field is required" })
            isError = true
        } else {
            setDepDateValidation({ error: false, label: "" })
        }
        if (date[1] === "") {
            setRetDateValidation({ error: true, label: "This field is required" })
            isError = true
        } else {
            setRetDateValidation({ error: false, label: "" })
        }
        if (isError) {
            setFetching(false)
            return
        }
        console.log("data: ",data)
        axios.post('/Users/getFlights', data)
            .then((response) => {
                setSearch(true)
                setFetching(false)
                setDepartureFlights(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleReturnFlight = (params, e) => {
        e.preventDefault()
        if (changeDepSummary) {
            console.log("entered")
            setSearch(false)
            setSelectedDep(params)
            setEconomyDepSeats(params.economyMap)
            setBusinessDepSeats(params.businessMap)
            setNumberOfSeats(seats)
            setShowDepSeats(true)
            setGetFlights((prevState) => !prevState);
        }
        else {
            axios.post('/Users/getFlights', returnData)
                .then((response) => {
                    setSearch(false)
                    setReturnFlights(response.data)
                    setSelectedDep(params)
                    economySplicedDep = []
                    setEconomyDepSeats(params.economyMap)
                    setBusinessDepSeats(params.businessMap)
                    setNumberOfSeats(seats)
                    setShowDepSeats(true)
                    setGetFlights((prevState) => !prevState);

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    var depSeats = []
    var depFlightMap = []
    const handleDepSeatsSelected = () => {
        depSeats = []
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
        }
        else {
            depFlightMap = businessDepSeats
            for (let i = 0; i < recentlyReservedDepB.length; i++) {
                depSeats.push((recentlyReservedDepB[i] + 1))
            }
            setDepSeat(depSeats)
            setDepFlightMaps(depFlightMap)
        }
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
                    }
                    for (let k = i + 3; k < (i + 3) + 4; k++) {
                        temp2.push(flatArray[k])
                    }
                    for (let l = i + 7; l < (i + 7) + 3; l++) {
                        temp3.push(flatArray[l])
                    }
                    economySplicedRet.push(temp1)
                    economySplicedRet.push(temp2)
                    economySplicedRet.push(temp3)
                }
            }
        }
        if (numberOfSeats === 1) {
            setAllRetSeatsSelected(true)
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
                    }
                    for (let k = i + 3; k < (i + 3) + 4; k++) {
                        temp2.push(flatArray[k])
                    }
                    for (let l = i + 7; l < (i + 7) + 3; l++) {
                        temp3.push(flatArray[l])
                    }
                    economySplicedDep.push(temp1)
                    economySplicedDep.push(temp2)
                    economySplicedDep.push(temp3)
                }
            }
        }
        if (numberOfSeats === 1) {
            setAllDepSeatsSelected(true)
        }
        console.log("retFlightTest: ",selectedRetFlight)
    }
    const handleResetRetSeats = (e) => {
        e.preventDefault()
        if (cabin === "business") {
            for (let index = 0; index < recentlyReservedRetB.length; index++) {
                businessRetSeats[recentlyReservedRetB[index]].reserved = false
                setBusinessRetSeats(businessRetSeats)
            }
            recentlyReservedRetB = []
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
                }
                for (let k = i + 3; k < (i + 3) + 4; k++) {
                    temp2.push(flatArray[k])
                }
                for (let l = i + 7; l < (i + 7) + 3; l++) {
                    temp3.push(flatArray[l])
                }
                economySplicedRet.push(temp1)
                economySplicedRet.push(temp2)
                economySplicedRet.push(temp3)
            }
        }
        setNumberOfSeats(seats)
        setAllRetSeatsSelected(false)
    }
    const handleResetDepSeats = (e) => {
        e.preventDefault()
        if (cabin === "business") {
            for (let index = 0; index < recentlyReservedDepB.length; index++) {
                businessDepSeats[recentlyReservedDepB[index]].reserved = false
                setBusinessDepSeats(businessDepSeats)
            }
            recentlyReservedDepB = []
        }
        else {
            const flatArray = economySplicedDep.flat(1)
            economySplicedDep = []
            for (let index = 0; index < recentlyReservedDepE.length; index++) {
                flatArray[recentlyReservedDepE[index]].reserved = false
            }
            recentlyReservedDepE = []
            let temp1 = []
            let temp2 = []
            let temp3 = []
            for (let i = 0; i < flatArray.length; i += 10) {
                temp1 = []
                temp2 = []
                temp3 = []
                for (let j = i; j < i + 3; j++) {
                    temp1.push(flatArray[j])
                }
                for (let k = i + 3; k < (i + 3) + 4; k++) {
                    temp2.push(flatArray[k])
                }
                for (let l = i + 7; l < (i + 7) + 3; l++) {
                    temp3.push(flatArray[l])
                }
                economySplicedDep.push(temp1)
                economySplicedDep.push(temp2)
                economySplicedDep.push(temp3)
            }
        }
        setNumberOfSeats(seats)
        setAllDepSeatsSelected(false)
    }

    const handleReturnSelected = (params, e) => {
        e.preventDefault()
        setDepSelected(false)
        setSelectedRet(params)
        setEconomyRetSeats(params.economyMap)
        setBusinessRetSeats(params.businessMap)
        setShowRetSeats(true)
        setGetFlights((prevState) => !prevState);
    }
    var retSeats = []
    var retFlightMap = []
    const handleRetSeatsSelected = () => {
        retSeats = []
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
        if(loggedUser.user.homeAddress){
            history.push("/")
        }
        else{
        history.push(
            {
                pathname: "/",
                search: '?query=abc',
                state: {
                    finished: true
                }
            }
        )
        }
    }
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChangeDepFlight = (e) => {
        e.preventDefault()
        handleResetDepSeats(e)
        setSearch(true)
        setReturnSelected(false)
        setChangeDepSummary(true)
    }
    const handleChangeRetFlight = (e) => {
        e.preventDefault()
        handleResetRetSeats(e)
        setDepSelected(true)
        setReturnSelected(false)
    }
    const handleCancelSeatsDep = (e) => {
        e.preventDefault()
        handleResetDepSeats(e)
        setShowDepSeats(false)
        setSearch(true)
    }
    const handleCancelSeatsRet = (e) => {
        e.preventDefault()
        handleResetRetSeats(e)
        setShowRetSeats(false)
        setDepSelected(true)
    } 
    const handleEditDepFlight = (e, reserve,depFlight,retFlight) => {
        e.preventDefault()
        history.push(
            {
                pathname: "/BookFlight",
                search: '?query=abc',
                state: {
                    change: true,
                    departure: true,
                    reservation: reserve,
                    flight: depFlight,
                    other: retFlight
                }
            }
        )
    }
    const handleEditRetFlight = (e, reserve,depFlight,retFlight) => {
        e.preventDefault()
        history.push(
            {
                pathname: "/BookFlight",
                search: '?query=abc',
                state: {
                    change: true,
                    departure: false,
                    reservation: reserve,
                    flight: retFlight,
                    other: depFlight
                }
            }
        )
    }
    const handleEditSearch = (e,depCountry,destCountry,cabin,seats,depEditDate,retEditDate,dep,other, reservation) => {
        const depDate = new Date(depEditDate);
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
        const returnDate = new Date(retEditDate);
        var returnDateFormat = (returnDate.getFullYear()) + '-' + (returnDate.getMonth() + 1) + "-" + (returnDate.getDate())
        if ((returnDate.getMonth() + 1) < 10) {
            returnDateFormat = (returnDate.getFullYear()) + '-0' + (returnDate.getMonth() + 1) + "-" + (returnDate.getDate())
            if ((returnDate.getDate()) < 10) {
                returnDateFormat = (returnDate.getFullYear()) + '-0' + (returnDate.getMonth() + 1) + "-0" + (returnDate.getDate())
            }
        } else {
            if ((returnDate.getDate()) < 10) {
                returnDateFormat = (returnDate.getFullYear()) + '-' + (returnDate.getMonth() + 1) + "-0" + (returnDate.getDate())
            }
        }
        let isError = false
        if(depEditDate === "" && dep)
        {
            setDepDateValidation({error:true, label:"This field is required"})
            isError= true
        }
        else{
            setDepDateValidation({error:false, label:""})
        }
        if(retEditDate === "" && !dep)
        {
            setRetDateValidation({error:true, label:"This field is required"})
            isError= true
        }
        else{
            setRetDateValidation({error:false, label:""})
        }
        if(isError){
            setFetching(false)
            return
        }
        e.preventDefault();
        var data = {}
        if(dep){
            data.departureDate= depDateFormat
            data.destinationAirport= destCountry
            data.departureAirport= depCountry
            data.cabin= cabin
            data.seats= seats
            setSelectedRet(other)
            setDepSeat([])
            setRetSeat(reservation.retSeatNumbers)
            setNumberOfSeats(seats)
            console.log("return flight edit: ", selectedRetFlight)
            }
        else{
            data.departureDate= returnDateFormat
            data.destinationAirport= destCountry
            data.departureAirport= depCountry
            data.cabin= cabin
            data.seats= seats
            setDepSeat(reservation.depSeatNumbers)
            setSelectedDep(other)
            setNumberOfSeats(seats)
            setRetSeat([])
        }
        console.log("data: ",data)
        axios.post('/Users/getFlights', data)
            .then((response) => {
                setCabin(cabin)
                setSeats(seats)
                if(dep){
                    setSearch(true)
                    setFetching(false)
                    setDepartureFlights(response.data)
                    setSelectedRet(other)
                    setChangeDepSummary(true)
                }
                else{
                    setSearch(false)
                    setFetching(false)
                    setDepSelected(true)
                    setSelectedDep(other)
                    setReturnFlights(response.data)
                }
                console.log("selectssssss: ",selectedRetFlight)
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
        selectedDepFlight, selectedRetFlight, handleReturnSelected, loginOpen, setLoginOpen,
        success, setSuccess, loading, setLoading, openConfirmDialog, handleCloseConfirm, setConfirmDialog,
        showDepSeats, showRetSeats, handleDepSeatsSelected, handleRetSeatsSelected, economyDepSeats, economyRetSeats,
        businessDepSeats, businessRetSeats, handleSelectedDepSeat, handleResetDepSeats, economySplicedDep, economySplicedRet,
        handleSelectedRetSeat, handleResetRetSeats, depSeat, depFlightMaps, retSeat, retFlightMaps,
        handleChangeDepFlight, handleChangeRetFlight, allDepSeatsSelected, allRetSeatsSelected, handleCancelSeatsDep,
        handleCancelSeatsRet, fromValidation, toValidation, depDateValidation, retDateValidation, change, setChange,
        handleEditDepFlight,handleEditSearch, handleEditRetFlight, items, setItems
    }
}
export default Search;